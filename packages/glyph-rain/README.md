# @fxshelf/glyph-rain

[English](./README.md) · [中文](./README.zh-CN.md)

Matrix-style glyph rain with cursor stir for **React** and **Vue**.  
Drop heads cast light onto page content when Chrome’s experimental **html-in-canvas** APIs are available; otherwise the rain still renders as a WebGL2 overlay. Zero animation-lib deps.

Inspired by [Canvas UI Glyph Rain](https://canvasui.dev/docs/components/glyph-rain).  
Part of the [fxshelf](https://github.com/Luzhaotian/fxshelf) effect shelf — install independently.

| | |
|--|--|
| **Docs / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/glyph-rain) |
| **npm** | [`@fxshelf/glyph-rain@0.1.1`](https://www.npmjs.com/package/@fxshelf/glyph-rain) |
| **CDN** | [unpkg](https://unpkg.com/@fxshelf/glyph-rain/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/glyph-rain/) |

Supports **npm**, **CDN `<script>`**, and **copy-as-source**. Details: site docs or [docs/使用说明.md](./docs/使用说明.md).

## Install

```bash
npm install @fxshelf/glyph-rain
```

| Consumer | Peer |
|----------|------|
| React | `react` / `react-dom` ≥ 18 |
| Vue | `vue` ≥ 3.3, with `.vue` compilation (e.g. Vite) |

## Usage — React

```tsx
import { GlyphRain } from '@fxshelf/glyph-rain'

export function Demo() {
  return (
    <GlyphRain style={{ height: 420 }} density={0.18} stir={0.8}>
      <img src="/photo.jpg" alt="" style={{ width: '100%', display: 'block' }} />
    </GlyphRain>
  )
}
```

## Usage — Vue

Entry is source SFC: `@fxshelf/glyph-rain/vue`.

```vue
<script setup lang="ts">
import { GlyphRain } from '@fxshelf/glyph-rain/vue'
</script>

<template>
  <GlyphRain :style="{ height: '420px' }" :density="0.18" :stir="0.8">
    <img src="/photo.jpg" alt="" style="width: 100%; display: block" />
  </GlyphRain>
</template>
```

## Browser notes

| Capability | Requirement |
|------------|-------------|
| Glyph rain overlay | WebGL2 |
| Content lighting / dim | Chrome experimental `drawElementImage` + `layoutsubtree` (html-in-canvas) |
| Cursor stir | Pointer events on the wrapper |

## Copy as source

Skip npm and copy from this package’s `src/` (or `node_modules/@fxshelf/glyph-rain/`):

```
core/     # required
react/    # React projects
vue/      # Vue projects
```

## License

MIT
