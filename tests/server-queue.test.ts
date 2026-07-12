import { describe, it, expect, vi } from 'vitest';
import { runSerialized, type SessionEntry } from '../src/server.js';

/**
 * Regression coverage for the session-transport concurrency fix.
 *
 * Reproduced bug: two MCP tool calls fired back-to-back on the same session
 * each called transport.handleRequest() concurrently on the same
 * StreamableHTTPServerTransport instance, corrupting its internal state so
 * every following call on that session failed until the client reconnected
 * with a brand-new session. runSerialized() makes sure at most one
 * handleRequest()-equivalent task is ever in flight per session.
 */
describe('runSerialized', () => {
  function makeEntry(): SessionEntry {
    return {
      server: {} as SessionEntry['server'],
      transport: {} as SessionEntry['transport'],
      lastActivity: Date.now(),
      queue: Promise.resolve(),
    };
  }

  it('runs queued tasks one at a time, in submission order', async () => {
    const entry = makeEntry();
    const order: number[] = [];
    let active = 0;
    let maxActive = 0;

    function makeTask(id: number, delayMs: number) {
      return async () => {
        active++;
        maxActive = Math.max(maxActive, active);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        order.push(id);
        active--;
      };
    }

    // Fire three "concurrent" requests against the same session, like two
    // parallel tool calls would.
    const p1 = runSerialized(entry, makeTask(1, 15));
    const p2 = runSerialized(entry, makeTask(2, 5));
    const p3 = runSerialized(entry, makeTask(3, 1));

    await Promise.all([p1, p2, p3]);

    expect(maxActive).toBe(1); // never more than one task in flight
    expect(order).toEqual([1, 2, 3]); // ran in submission order, not completion order
  });

  it('keeps the queue alive even if a task rejects', async () => {
    const entry = makeEntry();
    const good = vi.fn(async () => {});

    const failing = runSerialized(entry, async () => {
      throw new Error('handleRequest blew up');
    });
    const next = runSerialized(entry, good);

    await expect(failing).rejects.toThrow('handleRequest blew up');
    await next;

    expect(good).toHaveBeenCalledTimes(1);
  });
});
