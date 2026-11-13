# Changelog

All notable changes to this monorepo are documented here.  
Published packages keep independent semver; entries below are grouped by package when relevant.

## Unreleased

## 2026-11 — packages snapshot

| Package | Version |
|---------|---------|
| `@fxshelf/card-orbit` | `0.1.6` |
| `@fxshelf/glyph-rain` | `0.1.1` |
| `@fxshelf/starfield` | `0.1.1` |
| `@fxshelf/button-kit` | `0.1.0` |
| `@fxshelf/word-tunnel` | `0.1.0` |
| `@fxshelf/swarm-cursors` | `0.1.0` |
| `@fxshelf/mcp` | `0.1.0` |

### `@fxshelf/swarm-cursors` — 0.1.0

- 初版发布：多光标 swarm 页面共建（React-only），`embed` / `createDemoScene` / `createScene`
- 站点：文档 Demo、首页预览、全屏预览页 Replay

### Site / Tooling

- Docs Demo 统一 `DemoFrame`：右上角全屏图标 → `/preview/<id>` 新标签页
- 预览布局锁定视口，避免整页滚动条；swarm 全屏预览支持 Replay 重挂载
- 根脚本改为自动扫 workspace：`build`（`scripts/run-packages.mjs`）、`typecheck` / `pack:check`（`--workspaces --if-present`）、`lint`（`packages/*/src` 通配）
- 新增动效不再需要改根 `package.json` 的 build/typecheck/pack:check/lint 列表

### Earlier (carried forward)

- Chore: 补齐站点五包 `transpilePackages` / tsconfig paths / turbopack alias
- Chore: 删除空 Changeset；CI 增加 `pack:check` 与 site build；Deploy / Release 统一 `.nvmrc`
- Docs: glyph-rain / starfield CDN 锁定版本示例；button-kit / word-tunnel 动效说明加厚
- Docs: `apps/site` 双语 README；CONTRIBUTING 列出当前包与新增 checklist
- Meta: 首页预览改为 `previews` 映射；新增手动 `release.yml`（需 `NPM_TOKEN`）
- Tooling: 新增 `npm run publish:packages`（扫描 packages/*、登录校验、确认后发布）

后续包级变更记录以 `packages/*/CHANGELOG.md` 为准（由 `npm run version-packages` 生成）；本文件保留 monorepo 总览。

## 2026-03 — packages snapshot

| Package | Version |
|---------|---------|
| `@fxshelf/card-orbit` | `0.1.6` |
| `@fxshelf/glyph-rain` | `0.1.1` |
| `@fxshelf/starfield` | `0.1.1` |
| `@fxshelf/button-kit` | `0.1.0` |
| `@fxshelf/word-tunnel` | `0.1.0` |

### `@fxshelf/button-kit` / `@fxshelf/word-tunnel` — 0.1.0

- 初版发布：React / Vue、npm / CDN IIFE / 复制源码

### `@fxshelf/starfield` — 0.1.1

- Canvas 2D 星空隧道

### `@fxshelf/glyph-rain` — 0.1.1

- Matrix 风格字符雨

### `@fxshelf/card-orbit` — 0.1.6

- 路径约束 3D 卡片轨道
