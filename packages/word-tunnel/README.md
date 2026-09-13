# @fxshelf/word-tunnel

[English](./README.md) · [中文](./README.zh-CN.md)

3D keyword tunnel — words fly toward the vanishing point. Pure CSS transforms. No Framer / GSAP.

| | |
|--|--|
| **Docs / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/word-tunnel) |
| **npm** | [`@fxshelf/word-tunnel`](https://www.npmjs.com/package/@fxshelf/word-tunnel) |

## Install

```bash
npm install @fxshelf/word-tunnel
```

## Usage

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

Pass custom words:

```tsx
<WordTunnel words={['喵', '汪', '咕咕咕']} />
```

## Vue

```vue
<script setup lang="ts">
import { WordTunnel } from '@fxshelf/word-tunnel/vue'
import '@fxshelf/word-tunnel/styles.css'
</script>

<template>
  <WordTunnel :style="{ height: '420px', background: '#0c081e' }" />
</template>
```

## Related articles

- [CSS 3D starfield tunnel Loading (no Three.js)](https://juejin.cn/post/7684547172777246766) — Juejin
- [Zhihu column](https://zhuanlan.zhihu.com/p/2082492419061330179)
- [CSDN post](https://blog.csdn.net/paopao_pop/article/details/165232859)

## License

MIT
