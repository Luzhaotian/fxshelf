# @fxshelf/site

[English](./README.md) · [中文](./README.zh-CN.md)

Fumadocs documentation site for **fxshelf** (Next.js static export).

The docs UI is **Chinese-first**. Package-level docs are bilingual (`README.md` + `README.zh-CN.md` in each `packages/*`).

```bash
# from repo root
npm run dev
```

- Homepage cards: `lib/effects.ts`
- Docs content: `content/docs`
- Live demos: `components/effects/*`
- Preview map: `app/(home)/page.tsx` → `previews`（与 `effects.ts` 的 id 对齐）
- GitHub Pages output: `out/` with `basePath=/fxshelf` when `GITHUB_PAGES=true`
- Published packages (e.g. CDN demos in docs) use npm / unpkg — not GitHub `dist/` links

## Packages on the shelf

| id | package |
|----|---------|
| `card-orbit` | `@fxshelf/card-orbit` |
| `glyph-rain` | `@fxshelf/glyph-rain` |
| `starfield` | `@fxshelf/starfield` |
| `button-kit` | `@fxshelf/button-kit` |
| `word-tunnel` | `@fxshelf/word-tunnel` |
