# @fxshelf/card-orbit

[English](./README.md) · [中文](./README.zh-CN.md)

Path-constrained 3D card orbit for **React** and **Vue** — rise → arc → exit.  
Hand-written `requestAnimationFrame` + math paths. **No** Framer Motion / GSAP.

Inspired by [tasteskill.dev](https://tasteskill.dev).  
Part of the [fxshelf](https://github.com/Luzhaotian/fxshelf) effect shelf — install independently.

|                 |                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| **Docs / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/card-orbit)                    |
| **Path demo**   | [card-orbit-path](https://luzhaotian.github.io/fxshelf/docs/effects/card-orbit-path)                            |
| **npm**         | [`@fxshelf/card-orbit@0.1.8`](https://www.npmjs.com/package/@fxshelf/card-orbit)                                |
| **CDN**         | [unpkg](https://unpkg.com/@fxshelf/card-orbit/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/card-orbit/) |

Supports **npm**, **CDN `<script>`**, and **copy-as-source**. Details: site docs or [docs/使用说明.md](./docs/使用说明.md).

## Install

```bash
npm install @fxshelf/card-orbit
```

| Consumer | Peer                                                       |
| -------- | ---------------------------------------------------------- |
| React    | `react` / `react-dom` ≥ 18                                 |
| Vue      | `vue` ≥ 3.3, with `.vue` compilation (e.g. Vite)           |
| CDN      | Load **React 18 UMD** first (React 19 has no official UMD) |

## Usage — React

```tsx
import { CardOrbit, CardOrbitMobile } from '@fxshelf/card-orbit'
import '@fxshelf/card-orbit/styles.css'

const images = ['/a.webp', '/b.webp', '/c.webp']

export function Hero() {
  return (
    <>
      <CardOrbitMobile images={images} />
      <CardOrbit images={images} />
    </>
  )
}
```

## Usage — Vue

Entry is source SFC: `@fxshelf/card-orbit/vue`.

```vue
<script setup lang="ts">
import { CardOrbit, CardOrbitMobile } from '@fxshelf/card-orbit/vue'
import '@fxshelf/card-orbit/styles.css'

const images = ['/a.webp', '/b.webp', '/c.webp']
</script>

<template>
  <CardOrbitMobile :images="images" />
  <CardOrbit :images="images" />
</template>
```

## Usage — CDN (React 18 UMD)

Self-contained build `dist/card-orbit.iife.js`, global `CardOrbit`. Full example: [docs/CDN示例.html](./docs/CDN示例.html).

```html
<link rel="stylesheet" href="https://unpkg.com/@fxshelf/card-orbit/dist/index.css" />

<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"
></script>
<script src="https://unpkg.com/@fxshelf/card-orbit/dist/card-orbit.iife.js"></script>

<div id="hero"></div>
<script>
  var images = ['/a.webp', '/b.webp', '/c.webp']
  ReactDOM.createRoot(document.getElementById('hero')).render(
    React.createElement(
      React.Fragment,
      null,
      React.createElement(CardOrbit.CardOrbitMobile, { images: images }),
      React.createElement(CardOrbit.CardOrbit, { images: images }),
    ),
  )
</script>
```

Pin the version in production, e.g. `https://unpkg.com/@fxshelf/card-orbit@0.1.8/dist/card-orbit.iife.js`.  
Do not use jsDelivr GitHub `gh/.../dist` links (`dist/` is not committed).

## Copy as source

Skip npm and copy from this package’s `src/` (or `node_modules/@fxshelf/card-orbit/`):

```
core/     # required
react/    # React projects
vue/      # Vue projects
```

Keep `core` next to `react` / `vue`, then:

```tsx
// React
import { CardOrbit, CardOrbitMobile } from './components/card-orbit/react'
import './components/card-orbit/core/styles.css'
```

```ts
// Vue
import { CardOrbit, CardOrbitMobile } from './components/card-orbit/vue'
import './components/card-orbit/core/styles.css'
```

## License

MIT
