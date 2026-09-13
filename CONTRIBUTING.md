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
```

## Commit messages

Format: `type(scope?): 中文说明` — **subject must include Chinese**.

Husky runs oxlint (pre-commit) and commitlint (commit-msg).  
Cursor「Generate Commit Message」 follows [`.cursorrules`](./.cursorrules).

See root [README](./README.md#commit-convention) for allowed types.

## Add a new effect

1. Create `packages/<id>/` with `"name": "@fxshelf/<id>"`
2. Append an entry in [`apps/site/lib/effects.ts`](./apps/site/lib/effects.ts)
3. Add `apps/site/content/docs/effects/<id>.mdx`（含 npm / CDN / 复制源码）
4. Update [`apps/site/content/docs/effects/meta.json`](./apps/site/content/docs/effects/meta.json)
5. Update [`apps/site/content/docs/index.mdx`](./apps/site/content/docs/index.mdx) Cards
6. Wire root `package.json` scripts (`build` / `typecheck` / `pack:check` / `lint`) and `apps/site` dependency
7. Prefer `README.md` + `README.zh-CN.md` + `docs/使用说明.md` + `docs/CDN示例.html`（若提供 IIFE）

## Publish a package

Requires npm org **`fxshelf`** publish rights. Version bumps use [Changesets](https://github.com/changesets/changesets).

```bash
# 1. 记录变更（选包 + major/minor/patch + 说明）
npm run changeset

# 2. 合并 PR 后，在 main 上 bump 版本并写各包 CHANGELOG
npm run version-packages

# 3. 构建并发布未发布版本
npm whoami
npm run release
```

单包本地校验仍可用：

```bash
cd packages/<id>
npm run pack:check
```

Per-package changelogs live in `packages/*/CHANGELOG.md`（由 `changeset version` 生成）。仓库总览见根 [CHANGELOG.md](./CHANGELOG.md)。

## Pull requests

- Keep PRs focused; prefer one effect or one concern per PR.
- CI runs lint, typecheck, and package build on every PR（[`.github/workflows/ci.yml`](./.github/workflows/ci.yml)）.
- Site deploy to Pages happens on `main` push（[`deploy-site.yml`](./.github/workflows/deploy-site.yml)）.
