# @fxshelf/button-kit

[English](./README.md) · [中文](./README.zh-CN.md)

Animated button shelf for **React** and **Vue** — switch looks with a `variant` string. Zero Framer / GSAP.

Part of the [fxshelf](https://github.com/Luzhaotian/fxshelf) effect shelf — install independently.

| | |
|--|--|
| **Docs / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/button-kit) |
| **npm** | [`@fxshelf/button-kit@0.1.0`](https://www.npmjs.com/package/@fxshelf/button-kit) |
| **CDN** | [unpkg](https://unpkg.com/@fxshelf/button-kit/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/button-kit/) |

Supports **npm**, **CDN `<script>`**, and **copy-as-source**. Details: site docs or [docs/使用说明.md](./docs/使用说明.md).

## Install

```bash
npm install @fxshelf/button-kit
```

Import styles once:

```ts
import '@fxshelf/button-kit/styles.css'
```

| Consumer | Peer |
|----------|------|
| React | `react` / `react-dom` ≥ 18 |
| Vue | `vue` ≥ 3.3, with `.vue` compilation (e.g. Vite) |

## Usage — React

```tsx
import { Button } from '@fxshelf/button-kit'
import '@fxshelf/button-kit/styles.css'

export function Example() {
  return <Button variant="glow">Continue</Button>
}
```

## Usage — Vue

Entry is source SFC: `@fxshelf/button-kit/vue`.

```vue
<script setup lang="ts">
import { Button } from '@fxshelf/button-kit/vue'
import '@fxshelf/button-kit/styles.css'
</script>

<template>
  <Button variant="neon">Continue</Button>
</template>
```

## Variants

| Value | Effect |
|-------|--------|
| `solid` | Solid dark |
| `outline` | Outline, fill on hover |
| `soft` | Soft light fill |
| `glow` | Breathing glow |
| `neon` | Neon outline |
| `shimmer` | Sweep light on hover |
| `chroma` | Chroma shift; edge glow on hover |
| `liquid` | Liquid rise fill |
| `wipe` | Diagonal wipe fill |
| `glass` | Frosted glass |

Unknown strings fall back to `solid`.

## Usage — CDN (React 18 UMD)

Self-contained build `dist/button-kit.iife.js`, global `ButtonKit`. Full example: [docs/CDN示例.html](./docs/CDN示例.html).

```html
<link rel="stylesheet" href="https://unpkg.com/@fxshelf/button-kit/dist/index.css" />

<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@fxshelf/button-kit/dist/button-kit.iife.js"></script>

<div id="app"></div>
<script>
  ReactDOM.createRoot(document.getElementById('app')).render(
    React.createElement(ButtonKit.Button, { variant: 'glow' }, 'Continue'),
  )
</script>
```

Pin the version in production, e.g. `@fxshelf/button-kit@0.1.0/...`.  
Do not use jsDelivr GitHub `gh/.../dist` links (`dist/` is not committed).

## Copy as source

Skip npm and copy from this package’s `src/` (or `node_modules/@fxshelf/button-kit/`):

```
core/     # required (includes styles.css)
react/    # React projects
vue/      # Vue projects
```

Keep `core` next to `react` / `vue`, then:

```tsx
// React
import { Button } from './components/button-kit/react'
import './components/button-kit/core/styles.css'
```

```ts
// Vue
import { Button } from './components/button-kit/vue'
import './components/button-kit/core/styles.css'
```

## License

MIT
