# Changelog

All notable changes to this monorepo are documented here.  
Published packages keep independent semver; entries below are grouped by package when relevant.

## Unreleased

- Chore: 补齐站点五包 `transpilePackages` / tsconfig paths / turbopack alias
- Chore: 删除空 Changeset；CI 增加 `pack:check` 与 site build；Deploy / Release 统一 `.nvmrc`
- Docs: glyph-rain / starfield CDN 锁定版本示例；button-kit / word-tunnel 动效说明加厚
- Docs: `apps/site` 双语 README；CONTRIBUTING 列出当前五包与新增 checklist
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
