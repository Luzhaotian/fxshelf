# @fxshelf/word-tunnel

[English](./README.md) · [中文](./README.zh-CN.md)

3D 词云隧道 —— 文字朝灭点飞来。纯 CSS transform，零动画库。

| | |
|--|--|
| **文档 / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/word-tunnel) |
| **npm** | [`@fxshelf/word-tunnel`](https://www.npmjs.com/package/@fxshelf/word-tunnel) |

## 安装

```bash
npm install @fxshelf/word-tunnel
```

## 用法

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

自定义词条：

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

## 参考文章

- [我用 CSS 3D 做了个星空隧道 Loading，没有 Three.js](https://juejin.cn/post/7684547172777246766)（掘金）
- [知乎专栏 · 星空隧道词云 Loading](https://zhuanlan.zhihu.com/p/2082492419061330179)
- [CSDN · 星空隧道词云 Loading](https://blog.csdn.net/paopao_pop/article/details/165232859)

## License

MIT
