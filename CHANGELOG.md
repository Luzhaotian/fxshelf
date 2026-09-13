# Changelog

All notable changes to this monorepo are documented here.  
Published packages keep independent semver; entries below are grouped by package when relevant.

## Unreleased

- Docs: 文档页补齐 button-kit / word-tunnel；各包 CDN / 复制源码说明与 `CDN示例.html` 对齐
- Docs: 根 README 说明 Cursor 生成中文 commit message（`.cursorrules`）
- CI: 新增 PR / `main` 上的 lint · typecheck · build 工作流
- Meta: 新增 `CONTRIBUTING.md`、`.nvmrc`；坐标演示页仅从 Card Orbit 文内链接进入（不进侧栏）
- Tooling: 接入 [Changesets](./.changeset)（`changeset` / `version-packages` / `release`）
- Nav: 侧栏文档首页标题为「文档」；npm 链到 fxshelf 搜索结果；首页去掉「打开 Card Orbit」

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
