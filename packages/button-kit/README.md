# @fxshelf/button-kit

[English](./README.md) · [中文](./README.zh-CN.md)

Animated button shelf — switch looks with a `variant` string. No Framer Motion / GSAP.

| | |
|--|--|
| **Docs / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/button-kit) |
| **npm** | [`@fxshelf/button-kit`](https://www.npmjs.com/package/@fxshelf/button-kit) |

## Install

```bash
npm install @fxshelf/button-kit
```

## Usage

```tsx
import { Button } from '@fxshelf/button-kit'
import '@fxshelf/button-kit/styles.css'

export function Example() {
  return <Button variant="glow">Continue</Button>
}
```

Built-in variants: `solid` · `outline` · `soft` · `glow` · `neon` · `shimmer` · `chroma` · `liquid` · `wipe` · `glass`

## Vue

```vue
<script setup lang="ts">
import { Button } from '@fxshelf/button-kit/vue'
import '@fxshelf/button-kit/styles.css'
</script>

<template>
  <Button variant="neon">Continue</Button>
</template>
```

## License

MIT
