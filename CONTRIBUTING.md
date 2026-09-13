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

| Package | 路径 |
|---------|------|
| `@fxshelf/card-orbit` | [`packages/card-orbit`](./packages/card-orbit) |
| `@fxshelf/glyph-rain` | [`packages/glyph-rain`](./packages/glyph-rain) |
| `@fxshelf/starfield` | [`packages/starfield`](./packages/starfield) |
| `@fxshelf/button-kit` | [`packages/button-kit`](./packages/button-kit) |
| `@fxshelf/word-tunnel` | [`packages/word-tunnel`](./packages/word-tunnel) |

文档站：[`apps/site`](./apps/site)（中文为主；包级 README 双语）。

## Commit messages

Format: `type(scope?): 中文说明` — **subject must include Chinese**.

Husky runs oxlint (pre-commit) and commitlint (commit-msg).  
Cursor「Generate Commit Message」 follows [`.cursorrules`](./.cursorrules).

See root [README](./README.md#commit-convention) for allowed types.

## Add a new effect

1. Create `packages/<id>/` with `"name": "@fxshelf/<id>"`
2. Append an entry in [`apps/site/lib/effects.ts`](./apps/site/lib/effects.ts)
3. Add homepage preview in [`apps/site/app/(home)/page.tsx`](./apps/site/app/(home)/page.tsx) `previews` map
4. Add `apps/site/content/docs/effects/<id>.mdx`（含 npm / CDN / 复制源码；CDN 写清 `@pkg@x.y.z` 锁定示例）
5. Update [`apps/site/content/docs/effects/meta.json`](./apps/site/content/docs/effects/meta.json)
6. Update [`apps/site/content/docs/index.mdx`](./apps/site/content/docs/index.mdx) Cards
7. Wire root `package.json` scripts (`build` / `typecheck` / `pack:check` / `lint`) and `apps/site` dependency
8. Update `apps/site/tsconfig.json` `paths` 与 `next.config.mjs`（`transpilePackages` + turbopack `resolveAlias`）
9. Prefer `README.md` + `README.zh-CN.md` + `docs/使用说明.md` + `docs/CDN示例.html`（若提供 IIFE）

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
