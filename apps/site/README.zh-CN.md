# @fxshelf/site

[English](./README.md) · [中文](./README.zh-CN.md)

**fxshelf** 的 Fumadocs 文档站（Next.js 静态导出）。

站点文案以 **中文为主**。各动效包自带双语 README（`packages/*/README.md` + `README.zh-CN.md`）。

```bash
# 在仓库根目录
npm run dev
```

- 首页卡片：`lib/effects.ts`
- 文档内容：`content/docs`
- Live demo：`components/effects/*`
- 预览映射：`app/(home)/page.tsx` → `previews`（与 `effects.ts` 的 id 对齐）
- GitHub Pages 产物：`out/`，当 `GITHUB_PAGES=true` 时 `basePath=/fxshelf`
- 已发布包的 CDN 示例走 npm / unpkg，不要用 GitHub `dist/` 直链

## 书架上的包

| id | 包名 |
|----|------|
| `card-orbit` | `@fxshelf/card-orbit` |
| `glyph-rain` | `@fxshelf/glyph-rain` |
| `starfield` | `@fxshelf/starfield` |
| `button-kit` | `@fxshelf/button-kit` |
| `word-tunnel` | `@fxshelf/word-tunnel` |
