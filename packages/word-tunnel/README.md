# @fxshelf/word-tunnel

[English](./README.md) · [中文](./README.zh-CN.md)

3D keyword tunnel for **React** and **Vue** — words fly toward the vanishing point with pure CSS transforms. Zero Framer / GSAP.

Part of the [fxshelf](https://github.com/Luzhaotian/fxshelf) effect shelf — install independently.

| | |
|--|--|
| **Docs / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/word-tunnel) |
| **npm** | [`@fxshelf/word-tunnel@0.1.0`](https://www.npmjs.com/package/@fxshelf/word-tunnel) |
| **CDN** | [unpkg](https://unpkg.com/@fxshelf/word-tunnel/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/word-tunnel/) |

Supports **npm**, **CDN `<script>`**, and **copy-as-source**. Details: site docs or [docs/使用说明.md](./docs/使用说明.md).

## Install

```bash
npm install @fxshelf/word-tunnel
```

Import styles once:

```ts
import '@fxshelf/word-tunnel/styles.css'
```

| Consumer | Peer |
|----------|------|
| React | `react` / `react-dom` ≥ 18 |
| Vue | `vue` ≥ 3.3, with `.vue` compilation (e.g. Vite) |

## Usage — React

```tsx
import { WordTunnel } from '@fxshelf/word-tunnel'
import '@fxshelf/word-tunnel/styles.css'

export function Hero() {
  return (
    <WordTunnel style={{ height: 420, background: '#0c081e' }}>
      <h1 style={{ color: '#fff', padding: 32 }}>Hello</h1>
    </WordTunnel>
  )
}
```

Custom words:

```tsx
<WordTunnel words={['喵', '汪', '咕咕咕']} />
```

## Usage — Vue

Entry is source SFC: `@fxshelf/word-tunnel/vue`.

```vue
<script setup lang="ts">
import { WordTunnel } from '@fxshelf/word-tunnel/vue'
import '@fxshelf/word-tunnel/styles.css'
</script>

<template>
  <WordTunnel :style="{ height: '420px', background: '#0c081e' }" />
</template>
```

## Common props

| Prop | Default | Description |
|------|---------|-------------|
| `words` | built-in | Keyword list |
| `count` | width-based | Fixed word count |
| `seed` | `20250913` | Layout seed (same seed → same layout) |
| `perspective` | `900` | CSS perspective |
| `innerRadius` | `8` | Center hollow radius |
| `outerRadius` | `52` | Outer sample radius |
| `travelMin` / `travelRange` | `480` / `560` | Z travel distance |
| `fadeIn` / `fadeOut` | `10` / `88` | Fade progress 0–100 |
| `color` / `fontSize` | `#fff` / `24` | Text style |

## Copy as source

Skip npm and copy from this package’s `src/` (or `node_modules/@fxshelf/word-tunnel/`):

```
core/     # required (includes styles.css)
react/    # React projects
vue/      # Vue projects
```

## Related articles

- [CSS 3D starfield tunnel Loading (no Three.js)](https://juejin.cn/post/7684547172777246766) — Juejin
- [Zhihu column](https://zhuanlan.zhihu.com/p/2082492419061330179)
- [CSDN post](https://blog.csdn.net/paopao_pop/article/details/165232859)

## License

MIT
