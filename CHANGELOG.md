# MCP-Dockhand Changelog

All notable changes to **MCP-Dockhand** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2](https://github.com/thuer-it/mcp-dockhand/compare/v1.0.1...v1.0.2) (2026-07-12)

### Bug Fixes

* **release:** actually bump package.json version on release ([0ae1577](https://github.com/thuer-it/mcp-dockhand/commit/0ae1577dec1faf9c9eafdeacac16c33146389f02))

## [1.0.1](https://github.com/thuer-it/mcp-dockhand/compare/v1.0.0...v1.0.1) (2026-07-12)

### Bug Fixes

* **release:** don't let 'set -e' swallow semantic-release's own error output ([9295e52](https://github.com/thuer-it/mcp-dockhand/commit/9295e52eb7cbdf65e68f05d7bf90e918e9983df2))

## 1.0.0 (2026-07-12)

### Features

* add download_container_file and upload_container_file tools ([#23](https://github.com/thuer-it/mcp-dockhand/issues/23)) ([2c9c001](https://github.com/thuer-it/mcp-dockhand/commit/2c9c0018a1061c094e9fb5e8caefe876e3935ecd)), closes [#18](https://github.com/thuer-it/mcp-dockhand/issues/18)
* add semantic-release with auto CHANGELOG, GitHub Release, and GHCR Docker build\n\nReplaces manual tag-based release.yml workflow.\nOn every push to main, semantic-release analyzes commits and:\n- Determines version bump (feat→minor, fix→patch)\n- Generates CHANGELOG.md\n- Creates GitHub Release with tag\n- Triggers Docker build + push to GHCR\n\nBased on dockhand-guardian release configuration." ([0e3fd26](https://github.com/thuer-it/mcp-dockhand/commit/0e3fd262179009cd1667098da88095e327eab4d1))
* add Vitest test suite with path encoding and tool registration tests ([#24](https://github.com/thuer-it/mcp-dockhand/issues/24)) ([b075694](https://github.com/thuer-it/mcp-dockhand/commit/b075694d609938a4ae50cc779d5947c7cee11256)), closes [#19](https://github.com/thuer-it/mcp-dockhand/issues/19)
* automated Dockhand API schema sync and MCP tool validation ([#25](https://github.com/thuer-it/mcp-dockhand/issues/25)) ([20abdea](https://github.com/thuer-it/mcp-dockhand/commit/20abdea99178f3c9bee8c40533370027d0ef998c))
* **ci:** publish multi-arch (amd64 + arm64) Docker images on release ([#59](https://github.com/thuer-it/mcp-dockhand/issues/59)) ([7390d6a](https://github.com/thuer-it/mcp-dockhand/commit/7390d6af9b74cb32e545ec5d42ac58376b21b081)), closes [#54](https://github.com/thuer-it/mcp-dockhand/issues/54) [#54](https://github.com/thuer-it/mcp-dockhand/issues/54)
* initial MCP server for Dockhand with 130+ tools ([d11dba0](https://github.com/thuer-it/mcp-dockhand/commit/d11dba09be10696bea8bb5cd49283425b96447fc))
* Issue-Templates, Label-Struktur und API-Change-Detection Workflow ([411e856](https://github.com/thuer-it/mcp-dockhand/commit/411e85649e2c5e184185fbf6eb7f24f1c73f4802))
* migrate to Zod v4 and TypeScript 6 ([#34](https://github.com/thuer-it/mcp-dockhand/issues/34)) ([9efda1b](https://github.com/thuer-it/mcp-dockhand/commit/9efda1b8d676cb9e7e58044fad36c9c5aa0f029d)), closes [#13](https://github.com/thuer-it/mcp-dockhand/issues/13)
* **stacks:** add update_stack_env_raw + remove non-functional rawContent param ([#58](https://github.com/thuer-it/mcp-dockhand/issues/58)) ([9166310](https://github.com/thuer-it/mcp-dockhand/commit/9166310690dc30fdc42a9919d1dc0a11642b2986)), closes [#57](https://github.com/thuer-it/mcp-dockhand/issues/57) [#56](https://github.com/thuer-it/mcp-dockhand/issues/56) [#25](https://github.com/thuer-it/mcp-dockhand/issues/25)
* **tools:** audit and expand all 222 MCP tool descriptions for AI disambiguation ([#63](https://github.com/thuer-it/mcp-dockhand/issues/63)) ([b337e4c](https://github.com/thuer-it/mcp-dockhand/commit/b337e4c05adb4087d4683d610832ad6504b7d59e)), closes [#60](https://github.com/thuer-it/mcp-dockhand/issues/60) [#58](https://github.com/thuer-it/mcp-dockhand/issues/58)
* **tools:** close MCP API coverage gap — 44 new tools ([#64](https://github.com/thuer-it/mcp-dockhand/issues/64)) ([e0e7057](https://github.com/thuer-it/mcp-dockhand/commit/e0e70572d079bb3fd1bf73803f2bd203e36b430c)), closes [#58](https://github.com/thuer-it/mcp-dockhand/issues/58) [#62](https://github.com/thuer-it/mcp-dockhand/issues/62)

### Bug Fixes

* add host/port parameters to create/update/test environment for hawser-standard mode ([#15](https://github.com/thuer-it/mcp-dockhand/issues/15)) ([feaa186](https://github.com/thuer-it/mcp-dockhand/commit/feaa186dee76292180610e0ae4e2ce80ce862236)), closes [#4](https://github.com/thuer-it/mcp-dockhand/issues/4)
* address consolidated review findings ([#30](https://github.com/thuer-it/mcp-dockhand/issues/30)) ([#32](https://github.com/thuer-it/mcp-dockhand/issues/32)) ([0962f39](https://github.com/thuer-it/mcp-dockhand/commit/0962f398d9bef45fe872aa9e5fdaf41a45c246f5)), closes [21-#29](https://github.com/thuer-it/21-/issues/29) [#33](https://github.com/thuer-it/mcp-dockhand/issues/33)
* **api:** serialize per-session MCP requests to stop transport corruption ([56d2605](https://github.com/thuer-it/mcp-dockhand/commit/56d260524ed32ea5dfe0c2d8d08cac4a95f33901))
* apply encodeURIComponent consistently on all path parameters ([#22](https://github.com/thuer-it/mcp-dockhand/issues/22)) ([7321953](https://github.com/thuer-it/mcp-dockhand/commit/7321953a3c827fb1e3bb0721d075ed2003e176c5)), closes [#16](https://github.com/thuer-it/mcp-dockhand/issues/16)
* **ci:** add Husky + commitlint for commit message validation ([ed6ef6f](https://github.com/thuer-it/mcp-dockhand/commit/ed6ef6f79e61831ce7efd8457cf3b22f04730d6d))
* **ci:** add semantic-release dependencies and fix configuration ([35a7825](https://github.com/thuer-it/mcp-dockhand/commit/35a7825f063964177412c936a28e048f9ad6dca8))
* code review findings — helper utils, error handling, security, missing endpoints ([5696d82](https://github.com/thuer-it/mcp-dockhand/commit/5696d82604ac39f0975c7a81d2a0613f13fcca9c))
* correct HTTP methods for 21 MCP tools to match Dockhand API ([#31](https://github.com/thuer-it/mcp-dockhand/issues/31)) ([ae032f2](https://github.com/thuer-it/mcp-dockhand/commit/ae032f229d6c98c9ae4b75a64c5dfe0d6e5854f4)), closes [#27](https://github.com/thuer-it/mcp-dockhand/issues/27)
* Docker production build, URL encoding, logout tool ([9800bd3](https://github.com/thuer-it/mcp-dockhand/commit/9800bd35394393624ba449a9f0c8eabba7954374))
* extract resolveHostPort helper, add connectionType gate, fix port defaults ([#21](https://github.com/thuer-it/mcp-dockhand/issues/21)) ([22ea0b3](https://github.com/thuer-it/mcp-dockhand/commit/22ea0b3b4a7008dc2c16c5a23282ea24bd585324)), closes [#15](https://github.com/thuer-it/mcp-dockhand/issues/15) [#20](https://github.com/thuer-it/mcp-dockhand/issues/20)
* improve test precision for tool registration and environment scope ([#28](https://github.com/thuer-it/mcp-dockhand/issues/28)) ([332a7f3](https://github.com/thuer-it/mcp-dockhand/commit/332a7f344348abed01f2de78b0e86ecdcca7832d)), closes [#26](https://github.com/thuer-it/mcp-dockhand/issues/26)
* Multi-Session Support — Factory Pattern fuer McpServer-Instanzen ([d9e6934](https://github.com/thuer-it/mcp-dockhand/commit/d9e6934b5133b75ce259d2d884b0a644be078cce)), closes [#1](https://github.com/thuer-it/mcp-dockhand/issues/1)
* replace generic config/settings with typed parameters ([#29](https://github.com/thuer-it/mcp-dockhand/issues/29)) ([dec8cd4](https://github.com/thuer-it/mcp-dockhand/commit/dec8cd45faf6ed4fbeb3207bc52a95881682c210)), closes [#17](https://github.com/thuer-it/mcp-dockhand/issues/17)
* **stacks:** send explicit JSON body on SSE stack/git-stack actions ([06ac97b](https://github.com/thuer-it/mcp-dockhand/commit/06ac97b82868f98e45db1571147efe52c723af52))
* **system:** use 127.0.0.1 instead of localhost in HEALTHCHECK ([24d41e1](https://github.com/thuer-it/mcp-dockhand/commit/24d41e1b5418e471e7945ad25d61deb45cbd8b34))

### Documentation

* Add CHANGELOG.md ([30b8eff](https://github.com/thuer-it/mcp-dockhand/commit/30b8eff7c1e9d884364943fec2500b69db493fb1))
* Add CLAUDE.md, Copilot instructions, and test suite issue template ([c005bcd](https://github.com/thuer-it/mcp-dockhand/commit/c005bcde3b5c6b70557255f04013f4c5855d5071))
* update review instructions — verify against upstream Dockhand/Hawser source ([094762b](https://github.com/thuer-it/mcp-dockhand/commit/094762b62fab02ef32bf0e73c11bced572d2046a))

### Build System

* **deps:** bump path-to-regexp from 8.3.0 to 8.4.0 ([27335a5](https://github.com/thuer-it/mcp-dockhand/commit/27335a5f600094e434f9934d8d018dabd3cfa305))

### CI/CD

* **release:** trigger release workflow on the fork ([665cdb0](https://github.com/thuer-it/mcp-dockhand/commit/665cdb0761c471e121bcc49792547512dc926805))

## [1.6.0](https://github.com/strausmann/mcp-dockhand/compare/v1.5.0...v1.6.0) (2026-05-16)

### Features

* **tools:** close MCP API coverage gap — 44 new tools ([#64](https://github.com/strausmann/mcp-dockhand/issues/64)) ([e0e7057](https://github.com/strausmann/mcp-dockhand/commit/e0e70572d079bb3fd1bf73803f2bd203e36b430c)), closes [#58](https://github.com/strausmann/mcp-dockhand/issues/58) [#62](https://github.com/strausmann/mcp-dockhand/issues/62)

## [1.5.0](https://github.com/strausmann/mcp-dockhand/compare/v1.4.0...v1.5.0) (2026-05-16)

### Features

* **tools:** audit and expand all 222 MCP tool descriptions for AI disambiguation ([#63](https://github.com/strausmann/mcp-dockhand/issues/63)) ([b337e4c](https://github.com/strausmann/mcp-dockhand/commit/b337e4c05adb4087d4683d610832ad6504b7d59e)), closes [#60](https://github.com/strausmann/mcp-dockhand/issues/60) [#58](https://github.com/strausmann/mcp-dockhand/issues/58)

## [1.4.0](https://github.com/strausmann/mcp-dockhand/compare/v1.3.0...v1.4.0) (2026-05-16)

### Features

* **ci:** publish multi-arch (amd64 + arm64) Docker images on release ([#59](https://github.com/strausmann/mcp-dockhand/issues/59)) ([7390d6a](https://github.com/strausmann/mcp-dockhand/commit/7390d6af9b74cb32e545ec5d42ac58376b21b081)), closes [#54](https://github.com/strausmann/mcp-dockhand/issues/54) [#54](https://github.com/strausmann/mcp-dockhand/issues/54)

## [1.3.0](https://github.com/strausmann/mcp-dockhand/compare/v1.2.0...v1.3.0) (2026-05-16)

### Features

* **stacks:** add update_stack_env_raw + remove non-functional rawContent param ([#58](https://github.com/strausmann/mcp-dockhand/issues/58)) ([9166310](https://github.com/strausmann/mcp-dockhand/commit/9166310690dc30fdc42a9919d1dc0a11642b2986)), closes [#57](https://github.com/strausmann/mcp-dockhand/issues/57) [#56](https://github.com/strausmann/mcp-dockhand/issues/56) [#25](https://github.com/strausmann/mcp-dockhand/issues/25)

## [1.2.0](https://github.com/strausmann/mcp-dockhand/compare/v1.1.1...v1.2.0) (2026-03-29)

### Features

* migrate to Zod v4 and TypeScript 6 ([#34](https://github.com/strausmann/mcp-dockhand/issues/34)) ([9efda1b](https://github.com/strausmann/mcp-dockhand/commit/9efda1b8d676cb9e7e58044fad36c9c5aa0f029d)), closes [#13](https://github.com/strausmann/mcp-dockhand/issues/13)

## [1.1.1](https://github.com/strausmann/mcp-dockhand/compare/v1.1.0...v1.1.1) (2026-03-29)

### Bug Fixes

* **ci:** add Husky + commitlint for commit message validation ([ed6ef6f](https://github.com/strausmann/mcp-dockhand/commit/ed6ef6f79e61831ce7efd8457cf3b22f04730d6d))

## [1.1.0](https://github.com/strausmann/mcp-dockhand/compare/v1.0.0...v1.1.0) (2026-03-29)

### Features

* **containers:** add download_container_file and upload_container_file tools ([#23](https://github.com/strausmann/mcp-dockhand/issues/23)), closes [#18](https://github.com/strausmann/mcp-dockhand/issues/18)
* **tests:** add Vitest test suite with path encoding and tool registration tests ([#24](https://github.com/strausmann/mcp-dockhand/issues/24)), closes [#19](https://github.com/strausmann/mcp-dockhand/issues/19)
* **ci:** automated Dockhand API schema sync and MCP tool validation ([#25](https://github.com/strausmann/mcp-dockhand/issues/25))
* **ci:** add semantic-release with auto CHANGELOG, GitHub Release, and GHCR Docker build

### Bug Fixes

* **environments:** add host/port parameters for hawser-standard mode ([#15](https://github.com/strausmann/mcp-dockhand/issues/15)), closes [#4](https://github.com/strausmann/mcp-dockhand/issues/4)
* **environments:** extract resolveHostPort helper, add connectionType gate, fix port defaults ([#21](https://github.com/strausmann/mcp-dockhand/issues/21)), closes [#20](https://github.com/strausmann/mcp-dockhand/issues/20)
* **security:** apply encodePath consistently on all 128 path parameters ([#22](https://github.com/strausmann/mcp-dockhand/issues/22)), closes [#16](https://github.com/strausmann/mcp-dockhand/issues/16)
* **api:** correct HTTP methods for 21 MCP tools to match Dockhand API ([#31](https://github.com/strausmann/mcp-dockhand/issues/31)), closes [#27](https://github.com/strausmann/mcp-dockhand/issues/27)
* **tools:** replace generic config/settings with typed parameters ([#29](https://github.com/strausmann/mcp-dockhand/issues/29)), closes [#17](https://github.com/strausmann/mcp-dockhand/issues/17)
* **tests:** improve test precision for tool registration and environment scope ([#28](https://github.com/strausmann/mcp-dockhand/issues/28)), closes [#26](https://github.com/strausmann/mcp-dockhand/issues/26)
* **review:** address consolidated review findings from PRs #21-#29 ([#32](https://github.com/strausmann/mcp-dockhand/issues/32)), closes [#30](https://github.com/strausmann/mcp-dockhand/issues/30)

### Documentation

* add CLAUDE.md, Copilot and Gemini review instructions
* update review instructions — verify against upstream Dockhand/Hawser source

## [1.0.0](https://github.com/strausmann/mcp-dockhand/releases/tag/v1.0.0) (2026-03-29)

### Features

* Initial release with 130+ MCP tools for Dockhand Docker Management
* **Container Management** (27 tools): list, inspect, logs, stats, files, updates, pause, rename
* **Stack Management** (21 tools): compose, env, scanning, deploy, relocate, adopt
* **Image Management** (9 tools): pull, push, tag, scan, export, history
* **Network Management** (7 tools): create, inspect, connect/disconnect, prune
* **Volume Management** (9 tools): browse, clone, export, file content
* **Git Stack Management** (15 tools): deploy, sync, webhooks, credentials, repositories
* **Environment Management** (18 tools): connection test, timezone, notifications, pruning
* **Auth & Hawser** (12 tools): OIDC, LDAP, session, tokens
* **Audit** (4 tools): logging, events, export
* **Notifications** (8 tools): create, test, trigger
* **Registry** (10 tools): catalog, search, tags
* **System** (19 tools): health, disk, license, Prometheus metrics
* **Users & Roles** (20 tools): MFA, profiles, favorites, roles, RBAC
* **Schedules** (9 tools): execution, automation
* **Auto-Update** (3 tools): container update policies
* Streamable HTTP transport (MCP Spec 2025-03-26)
* Multi-session support with Factory Pattern and automatic cleanup
* Session-based authentication with auto-relogin on 401
* Environment filter on all endpoints for security
* Docker image with multi-stage build, non-root user, healthcheck

### Bug Fixes

* Multi-session bug "Already connected to a transport" ([#1](https://github.com/strausmann/mcp-dockhand/issues/1))
