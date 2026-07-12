/**
 * MCP Server setup with Streamable HTTP transport.
 *
 * Uses a factory pattern: each MCP session gets its own McpServer instance,
 * while all sessions share a single DockhandClient (and its auth cookie).
 * This fixes the multi-session bug where a second connection would fail with
 * "Already connected to a transport".
 */

import { readFileSync } from 'node:fs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import type { Request, Response } from 'express';
import { DockhandClient } from './client/dockhand-client.js';
import { registerAllTools } from './tools/index.js';
import type { DockhandConfig } from './types/dockhand.js';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { version: string };

/** Inactivity timeout before a session is cleaned up (30 minutes). */
const SESSION_INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

/** Interval for checking expired sessions (5 minutes). */
const SESSION_CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

export interface ServerConfig {
  dockhand: DockhandConfig;
  port: number;
  host?: string;
}

export interface SessionEntry {
  server: McpServer;
  transport: StreamableHTTPServerTransport;
  lastActivity: number;
  /**
   * Serializes concurrent POST/DELETE calls against this session's transport.
   *
   * Fix: two parallel tool calls on the same MCP session (e.g. list_containers +
   * list_stacks fired back-to-back by a client) each invoked
   * transport.handleRequest() concurrently on the *same* StreamableHTTPServerTransport
   * instance. That corrupted the transport's internal request-routing state, after
   * which every subsequent call on the session failed with a generic error and the
   * session never recovered (observed as "Tool execution failed" on all following
   * calls, including simple sequential ones, until the client disconnected and
   * reconnected with a fresh session). The GET stream (server->client SSE) is
   * intentionally left out of this queue since it is long-lived by design and must
   * stay concurrent with POST request/response cycles.
   */
  queue: Promise<void>;
}

/**
 * Create a new McpServer instance with all tools registered.
 * Each MCP session gets its own server instance, sharing the DockhandClient.
 */
function createMcpServer(client: DockhandClient): McpServer {
  const server = new McpServer({
    name: 'mcp-dockhand',
    version: pkg.version,
  });
  registerAllTools(server, client);
  return server;
}

/**
 * Runs `task` only after all previously enqueued tasks for this session have
 * settled (success or failure), so at most one handleRequest() call is ever
 * in flight per session/transport at a time. See SessionEntry.queue.
 */
export function runSerialized(entry: SessionEntry, task: () => Promise<void>): Promise<void> {
  const run = entry.queue.then(task, task);
  // Keep the queue alive even if `run` rejects, so later requests aren't stuck
  // behind a permanently-rejected promise.
  entry.queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export async function createServer(config: ServerConfig): Promise<void> {
  // Single shared Dockhand client — auth cookie is shared across all sessions
  const client = new DockhandClient(config.dockhand);

  const app = express();

  // Parse JSON request bodies (required for MCP Streamable HTTP)
  app.use(express.json());

  // Health endpoint (no auth required)
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', server: 'mcp-dockhand', version: pkg.version });
  });

  // Store sessions by session ID
  const sessions = new Map<string, SessionEntry>();

  /**
   * Remove a session and close its transport.
   */
  function removeSession(sessionId: string): void {
    const entry = sessions.get(sessionId);
    if (entry) {
      sessions.delete(sessionId);
      // Close transport (async, fire-and-forget)
      entry.transport.close?.().catch(() => {});
      console.error(`[session] Removed session ${sessionId} (${sessions.size} active)`);
    }
  }

  /**
   * Periodic cleanup of inactive sessions to prevent memory leaks.
   */
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [sessionId, entry] of sessions) {
      if (now - entry.lastActivity > SESSION_INACTIVITY_TIMEOUT_MS) {
        console.error(`[session] Session ${sessionId} timed out after inactivity`);
        removeSession(sessionId);
      }
    }
  }, SESSION_CLEANUP_INTERVAL_MS);
  cleanupInterval.unref(); // Don't prevent process exit

  // MCP Streamable HTTP endpoint
  app.post('/mcp', async (req: Request, res: Response) => {
    try {
      const sessionId = req.headers['mcp-session-id'] as string | undefined;

      // Existing session — reuse transport
      if (sessionId && sessions.has(sessionId)) {
        const entry = sessions.get(sessionId)!;
        entry.lastActivity = Date.now();
        // Serialized: see SessionEntry.queue for why concurrent tool calls on the
        // same session must not call handleRequest() on the shared transport at once.
        await runSerialized(entry, () => entry.transport.handleRequest(req, res, req.body));
        return;
      }

      // New session — create dedicated McpServer + Transport
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => crypto.randomUUID(),
        onsessioninitialized: (id) => {
          sessions.set(id, { server, transport, lastActivity: Date.now(), queue: Promise.resolve() });
          console.error(`[session] New session ${id} (${sessions.size} active)`);
        },
      });

      transport.onclose = () => {
        const sid = [...sessions.entries()].find(([, e]) => e.transport === transport)?.[0];
        if (sid) {
          sessions.delete(sid);
          console.error(`[session] Session ${sid} closed (${sessions.size} active)`);
        }
      };

      const server = createMcpServer(client);
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error('[server] Error handling MCP request:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

  // Handle GET for SSE streams (session-based)
  app.get('/mcp', async (req: Request, res: Response) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    if (!sessionId || !sessions.has(sessionId)) {
      res.status(400).json({ error: 'Invalid or missing session ID' });
      return;
    }

    const entry = sessions.get(sessionId)!;
    entry.lastActivity = Date.now();
    await entry.transport.handleRequest(req, res);
  });

  // Handle DELETE for session cleanup
  app.delete('/mcp', async (req: Request, res: Response) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    if (!sessionId || !sessions.has(sessionId)) {
      res.status(400).json({ error: 'Invalid or missing session ID' });
      return;
    }

    const entry = sessions.get(sessionId)!;
    await runSerialized(entry, () => entry.transport.handleRequest(req, res));
    removeSession(sessionId);
  });

  const host = config.host || '0.0.0.0';
  app.listen(config.port, host, () => {
    console.error(`[server] MCP Dockhand server v${pkg.version} listening on ${host}:${config.port}`);
    console.error(`[server] Dockhand URL: ${config.dockhand.url}`);
    console.error(`[server] Health: http://localhost:${config.port}/health`);
    console.error(`[server] MCP endpoint: http://localhost:${config.port}/mcp`);
  });
}
