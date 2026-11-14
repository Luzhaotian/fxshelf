# Changelog

All notable changes to this monorepo are documented here.  
Published packages keep independent semver; entries below are grouped by package when relevant.

## Unreleased

## 2026-11 — packages snapshot

| Package                  | Version |
| ------------------------ | ------- |
| `@fxshelf/card-orbit`    | `0.1.8` |
| `@fxshelf/glyph-rain`    | `0.1.3` |
| `@fxshelf/starfield`     | `0.1.3` |
| `@fxshelf/button-kit`    | `0.1.2` |
| `@fxshelf/word-tunnel`   | `0.1.2` |
| `@fxshelf/swarm-cursors` | `0.1.1` |
| `@fxshelf/mcp`           | `0.1.1` |

### Patch bumps

- `card-orbit` `0.1.7` → `0.1.8`
- `glyph-rain` `0.1.2` → `0.1.3`
- `starfield` `0.1.2` → `0.1.3`
- `button-kit` `0.1.1` → `0.1.2`
- `word-tunnel` `0.1.1` → `0.1.2`
- `swarm-cursors` `0.1.0` → `0.1.1`
- `mcp` `0.1.0` → `0.1.1`

说明：接入 `oxfmt` 全仓格式化、站点 Demo 全屏预览 / Replay、根脚本自动化后同步文档锁定版本。

### Earlier patch bumps

- `card-orbit` `0.1.6` → `0.1.7`
- `glyph-rain` `0.1.1` → `0.1.2`
- `starfield` `0.1.1` → `0.1.2`
- `button-kit` `0.1.0` → `0.1.1`
- `word-tunnel` `0.1.0` → `0.1.1`

### `@fxshelf/mcp` — 0.1.0 → 0.1.1

- 初版发布：MCP server，供 Claude Code / Cursor 浏览书架、读文档、复制源码
- `0.1.1`：同步书架版本与格式化产物

### `@fxshelf/swarm-cursors` — 0.1.0 → 0.1.1

- 初版发布：多光标 swarm 页面共建（React-only），`embed` / `createDemoScene` / `createScene`
- 站点：文档 Demo、首页预览、全屏预览页 Replay
- `0.1.1`：清理上游作者残留、格式化

### Site / Tooling

- Docs Demo 统一 `DemoFrame`：右上角全屏图标 → `/preview/<id>` 新标签页
- 预览布局锁定视口，避免整页滚动条；swarm 全屏预览支持 Replay 重挂载
- 根脚本改为自动扫 workspace：`build`（`scripts/run-packages.mjs`）、`typecheck` / `pack:check`（`--workspaces --if-present`）、`lint`（`packages/*/src` 通配）
- 新增动效不再需要改根 `package.json` 的 build/typecheck/pack:check/lint 列表
- 接入 `oxfmt`：提交时 `lint-staged` 自动格式化 + `oxlint`

### Earlier (carried forward)

- Chore: 补齐站点五包 `transpilePackages` / tsconfig paths / turbopack alias
- Chore: 删除空 Changeset；CI 增加 `pack:check` 与 site build；Deploy / Release 统一 `.nvmrc`
- Docs: glyph-rain / starfield CDN 锁定版本示例；button-kit / word-tunnel 动效说明加厚
- Docs: `apps/site` 双语 README；CONTRIBUTING 列出当前包与新增 checklist
- Meta: 首页预览改为 `previews` 映射；新增手动 `release.yml`（需 `NPM_TOKEN`）
- Tooling: 新增 `npm run publish:packages`（扫描 packages/*、登录校验、确认后发布）

后续包级变更记录以 `packages/*/CHANGELOG.md` 为准（由 `npm run version-packages` 生成）；本文件保留 monorepo 总览。

## 2026-03 — packages snapshot

| Package                | Version |
| ---------------------- | ------- |
| `@fxshelf/card-orbit`  | `0.1.6` |
| `@fxshelf/glyph-rain`  | `0.1.1` |
| `@fxshelf/starfield`   | `0.1.1` |
| `@fxshelf/button-kit`  | `0.1.0` |
| `@fxshelf/word-tunnel` | `0.1.0` |

### `@fxshelf/button-kit` / `@fxshelf/word-tunnel` — 0.1.0

- 初版发布：React / Vue、npm / CDN IIFE / 复制源码

### `@fxshelf/starfield` — 0.1.1

- Canvas 2D 星空隧道

### `@fxshelf/glyph-rain` — 0.1.1

- Matrix 风格字符雨

### `@fxshelf/card-orbit` — 0.1.6

- 路径约束 3D 卡片轨道
