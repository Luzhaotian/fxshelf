# fxshelf

[English](./README.md) · [中文](./README.zh-CN.md)

A shelf of copy-friendly micro animation packages for **React** and **Vue**.  
Browse the site, install only what you need — or copy the source. No Framer Motion / GSAP.

| | |
|--|--|
| **Site / Docs** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/) |
| **Scope** | `@fxshelf/*` |
| **Deploy** | GitHub Actions → Pages（`main` push） |

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@fxshelf/card-orbit`](https://www.npmjs.com/package/@fxshelf/card-orbit) | [`0.1.6`](./packages/card-orbit) | Path-constrained 3D card orbit — rise, arc, exit |
| [`@fxshelf/glyph-rain`](https://www.npmjs.com/package/@fxshelf/glyph-rain) | [`0.1.1`](./packages/glyph-rain) | Matrix-style glyph rain — cursor stir, optional content lighting |
| [`@fxshelf/starfield`](./packages/starfield) | [`0.1.1`](./packages/starfield) | Canvas 2D starfield tunnel — perspective fly-through, glitter, trails |
| [`@fxshelf/button-kit`](./packages/button-kit) | [`0.1.0`](./packages/button-kit) | Animated button shelf — switch styles by `variant` string |
| [`@fxshelf/word-tunnel`](./packages/word-tunnel) | [`0.1.0`](./packages/word-tunnel) | 3D keyword tunnel — words fly to the vanishing point |

```bash
npm install @fxshelf/card-orbit
npm install @fxshelf/glyph-rain
npm install @fxshelf/starfield
npm install @fxshelf/button-kit
npm install @fxshelf/word-tunnel
```

Each package supports **npm**, **CDN `<script>`** (React via unpkg / jsDelivr), and **copying `src/core` + `react` / `vue`**. See [docs](https://luzhaotian.github.io/fxshelf/docs).

## Local development

```bash
npm install
npm run dev              # docs site → http://localhost:3001
npm run build            # build @fxshelf/* packages
npm run build:site       # static export → apps/site/out
npm run build:site:pages # GitHub Pages build (basePath=/fxshelf)
npm run lint
npm run typecheck
```

```
packages/<id>/     publishable @fxshelf/<id>
apps/site/         Fumadocs + Next.js static export
.github/workflows/ site deploy to Pages
```

## Commit convention

Husky gates commits:

- **pre-commit** — oxlint on staged JS/TS/Vue
- **commit-msg** — commitlint（Conventional Commits）

Format: `type(scope?): 中文说明` — **subject must include Chinese**.

```bash
feat(starfield): 新增星空隧道动效包
fix(site): 修复路径演示页返回链接
docs: 更新 README 包列表
chore: 接入 husky 与 commitlint
```

Allowed types: `feat` · `fix` · `docs` · `style` · `refactor` · `perf` · `test` · `build` · `ci` · `chore` · `revert`

Config: [`commitlint.config.js`](./commitlint.config.js)

## Add a new effect

1. Create `packages/<id>/` with `"name": "@fxshelf/<id>"`
2. Append an entry in [`apps/site/lib/effects.ts`](./apps/site/lib/effects.ts)
3. Add `apps/site/content/docs/effects/<id>.mdx`
4. Update [`apps/site/content/docs/effects/meta.json`](./apps/site/content/docs/effects/meta.json)
5. Wire root `package.json` scripts (`build` / `typecheck` / `pack:check` / `lint`) and `apps/site` dependency if needed
6. Homepage cards pick it up from the registry

## Publish a package

Requires npm org **`fxshelf`** (scoped publish rights).

```bash
npm whoami
cd packages/<id>
# bump version in package.json, then:
npm run pack:check
npm publish --access public
```

## License

MIT
