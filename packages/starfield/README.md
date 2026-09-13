# @fxshelf/starfield

[English](./README.md) · [中文](./README.zh-CN.md)

Canvas 2D starfield tunnel for **React** and **Vue** — stars fly toward the camera with perspective projection, glitter flashes, and additive trails. Zero Framer / GSAP / particles.js.

Part of the [fxshelf](https://github.com/Luzhaotian/fxshelf) effect shelf — install independently.

| | |
|--|--|
| **Docs / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/starfield) |
| **npm** | [`@fxshelf/starfield@0.1.1`](https://www.npmjs.com/package/@fxshelf/starfield) |
| **CDN** | [unpkg](https://unpkg.com/@fxshelf/starfield/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/starfield/) |

Supports **npm**, **CDN `<script>`**, and **copy-as-source**. Details: site docs or [docs/使用说明.md](./docs/使用说明.md).

## Install

```bash
npm install @fxshelf/starfield
```

| Consumer | Peer |
|----------|------|
| React | `react` / `react-dom` ≥ 18 |
| Vue | `vue` ≥ 3.3, with `.vue` compilation (e.g. Vite) |

## Usage — React

```tsx
import { Starfield } from '@fxshelf/starfield'

export function Hero() {
  return (
    <Starfield
      style={{ height: 420, background: '#0f0f12' }}
      particleCount={263}
      brightness={73}
    >
      <h1 style={{ color: '#fff', padding: 32 }}>Hello</h1>
    </Starfield>
  )
}
```

## Usage — Vue

Entry is source SFC: `@fxshelf/starfield/vue`.

```vue
<script setup lang="ts">
import { Starfield } from '@fxshelf/starfield/vue'
</script>

<template>
  <Starfield
    :style="{ height: '420px', background: '#0f0f12' }"
    :particle-count="263"
    :brightness="73"
  >
    <h1 style="color:#fff;padding:32px">Hello</h1>
  </Starfield>
</template>
```

## Common props

| Prop | Default | Description |
|------|---------|-------------|
| `particleCount` | `263` | Number of stars |
| `speed` | `1` | Fly-toward speed |
| `density` | `48` | Radial density |
| `starSize` | `8` | Base size |
| `brightness` | `73` | Brightness 0–100 |
| `glitterIntensity` | `4` | Flash intensity |
| `trailAmount` | `26` | Trail persistence |
| `color1` / `color2` / `color3` | `#ffffff` | Palette |
| `reverse` | `false` | Fly away instead |

## Usage — CDN (React 18 UMD)

Self-contained build `dist/starfield.iife.js`, global `Starfield`. Full example: [docs/CDN示例.html](./docs/CDN示例.html).

```html
<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@fxshelf/starfield/dist/starfield.iife.js"></script>

<div id="app" style="height:420px;background:#0f0f12"></div>
<script>
  ReactDOM.createRoot(document.getElementById('app')).render(
    React.createElement(Starfield.Starfield, {
      style: { height: 420, background: '#0f0f12' },
      particleCount: 263,
    }),
  )
</script>
```

Pin the version in production, e.g. `https://unpkg.com/@fxshelf/starfield@0.1.1/dist/starfield.iife.js`.  
Do not use jsDelivr GitHub `gh/.../dist` links.

## Copy as source

Skip npm and copy from this package’s `src/` (or `node_modules/@fxshelf/starfield/`):

```
core/     # required
react/    # React projects
vue/      # Vue projects
```

## License

MIT
