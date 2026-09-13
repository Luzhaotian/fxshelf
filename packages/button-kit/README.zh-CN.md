# @fxshelf/button-kit

[English](./README.md) · [中文](./README.zh-CN.md)

按钮动效书架 —— 用 `variant` 字符串切换样式。不依赖 Framer Motion / GSAP。

| | |
|--|--|
| **文档 / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/button-kit) |
| **npm** | [`@fxshelf/button-kit`](https://www.npmjs.com/package/@fxshelf/button-kit) |

## 安装

```bash
npm install @fxshelf/button-kit
```

## 用法

```tsx
import { Button } from '@fxshelf/button-kit'
import '@fxshelf/button-kit/styles.css'

export function Example() {
  return <Button variant="glow">继续</Button>
}
```

内置样式：`solid` · `outline` · `soft` · `glow` · `neon` · `shimmer` · `chroma` · `liquid` · `wipe` · `glass`

## Vue

```vue
<script setup lang="ts">
import { Button } from '@fxshelf/button-kit/vue'
import '@fxshelf/button-kit/styles.css'
</script>

<template>
  <Button variant="neon">继续</Button>
</template>
```

## License

MIT
