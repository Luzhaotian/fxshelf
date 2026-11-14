# Contributing

Thanks for helping improve fxshelf.

## Setup

- Node.js **22**（见 [`.nvmrc`](./.nvmrc)）
- `npm install`

```bash
npm run dev          # docs site → http://localhost:3001
npm run lint
npm run typecheck
npm run build
npm run pack:check
```

## Packages（当前书架）

| Package                  | 路径                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `@fxshelf/card-orbit`    | [`packages/card-orbit`](./packages/card-orbit)                                                     |
| `@fxshelf/glyph-rain`    | [`packages/glyph-rain`](./packages/glyph-rain)                                                     |
| `@fxshelf/starfield`     | [`packages/starfield`](./packages/starfield)                                                       |
| `@fxshelf/button-kit`    | [`packages/button-kit`](./packages/button-kit)                                                     |
| `@fxshelf/word-tunnel`   | [`packages/word-tunnel`](./packages/word-tunnel)                                                   |
| `@fxshelf/swarm-cursors` | [`packages/swarm-cursors`](./packages/swarm-cursors)（v0.1 React-only）                            |
| `@fxshelf/mcp`           | [`packages/mcp`](./packages/mcp)（MCP server，非动效包；数据由 `scripts/gen-data.mjs` 构建时生成） |

文档站：[`apps/site`](./apps/site)（中文为主；包级 README 双语）。

## Commit messages

Format: `type(scope?): 中文说明` — **subject must include Chinese**.

Husky hooks:

- **pre-commit** — `lint-staged`：`oxfmt` 格式化暂存文件，再对 JS/TS/Vue 跑 `oxlint`
- **commit-msg** — commitlint（Conventional Commits）

手动格式化：`npm run fmt`（检查：`npm run fmt:check`）。配置见 [`.oxfmtrc.json`](./.oxfmtrc.json)。  
Cursor「Generate Commit Message」 follows [`.cursorrules`](./.cursorrules).

See root [README](./README.md#commit-convention) for allowed types.

## Add a new effect

1. Create `packages/<id>/` with `"name": "@fxshelf/<id>"`（建议初版 `0.1.0`）
2. Append an entry in [`apps/site/lib/effects.ts`](./apps/site/lib/effects.ts)
3. Add `apps/site/components/effects/<id>-demo.tsx`（用 [`DemoFrame`](./apps/site/components/effects/demo-frame.tsx) 包一层）与 `<id>-preview.tsx`
4. Register demo in [`apps/site/components/mdx.tsx`](./apps/site/components/mdx.tsx)，preview in [`apps/site/app/(home)/page.tsx`](<./apps/site/app/(home)/page.tsx>) `previews`，fullscreen in [`effect-fullscreen-demo.tsx`](./apps/site/components/effects/effect-fullscreen-demo.tsx)（`/preview/<id>` 静态参数来自 `effects.ts`）
5. Add `apps/site/content/docs/effects/<id>.mdx`（含 npm / CDN / 复制源码；CDN 写清 `@pkg@x.y.z` 锁定示例）
6. Update [`apps/site/content/docs/effects/meta.json`](./apps/site/content/docs/effects/meta.json)
7. Update [`apps/site/content/docs/index.mdx`](./apps/site/content/docs/index.mdx) Cards
8. Add `apps/site` dependency（根脚本会自动扫 `packages/*`，无需再改 `build` / `typecheck` / `pack:check` / `lint`）
9. Update `apps/site/tsconfig.json` `paths` 与 `next.config.mjs`（`transpilePackages` + turbopack `resolveAlias`）
10. Prefer `README.md` + `README.zh-CN.md` + `docs/使用说明.md` + `docs/CDN示例.html`（若提供 IIFE）；同步根 [CHANGELOG.md](./CHANGELOG.md) 版本快照

新增动效后 `@fxshelf/mcp` 无需改动：`packages/mcp/scripts/gen-data.mjs` 在 build/typecheck 时会自动从 `effects.ts`、站点 MDX 与各包 `src/` 重新生成快照。

## Publish a package

Requires npm org **`fxshelf`** publish rights. Version bumps use [Changesets](https://github.com/changesets/changesets)（先改好各包 `version`，本仓库不自动 bump）。

### 推荐：扫描发布脚本

```bash
# 对比 packages/* 与 npm：新包 / 版本差异 → 确认后 pack:check + publish
npm run publish:packages
```

设计说明：[docs/superpowers/specs/2026-09-13-publish-packages-design.md](./docs/superpowers/specs/2026-09-13-publish-packages-design.md)

### Changesets 流程（写 CHANGELOG 时）

```bash
# 1. 记录变更（选包 + major/minor/patch + 说明）
npm run changeset

# 2. 合并 PR 后，在 main 上 bump 版本并写各包 CHANGELOG
npm run version-packages

# 3. 构建并发布未发布版本（本地，或 Actions → Release packages）
npm whoami
npm run release
# 或：npm run publish:packages
```

也可在 GitHub Actions 手动触发 [`.github/workflows/release.yml`](./.github/workflows/release.yml)（需仓库 Secret `NPM_TOKEN`）。

单包本地校验仍可用：

```bash
cd packages/<id>
npm run pack:check
```

Per-package changelogs live in `packages/*/CHANGELOG.md`（由 `changeset version` 生成）。仓库总览见根 [CHANGELOG.md](./CHANGELOG.md)。

## Pull requests

- Keep PRs focused; prefer one effect or one concern per PR.
- CI runs lint、build packages、typecheck、`pack:check`、build site（[`.github/workflows/ci.yml`](./.github/workflows/ci.yml)）.
- Site deploy to Pages happens on `main` push（[`deploy-site.yml`](./.github/workflows/deploy-site.yml)）.
