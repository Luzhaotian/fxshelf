# @fxshelf/word-tunnel

[English](./README.md) · [中文](./README.zh-CN.md)

面向 **React** / **Vue** 的 3D 词云隧道 —— 文字朝灭点飞来，纯 CSS transform。零 Framer / GSAP 依赖。

属于 [fxshelf](https://github.com/Luzhaotian/fxshelf) 动效书架中的一个可独立安装包。

| | |
|--|--|
| **文档 / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/word-tunnel) |
| **npm** | [`@fxshelf/word-tunnel@0.1.0`](https://www.npmjs.com/package/@fxshelf/word-tunnel) |
| **CDN** | [unpkg](https://unpkg.com/@fxshelf/word-tunnel/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/word-tunnel/) |

支持 **npm**、**CDN `<script>`**、**复制源码**。详细用法见站点文档或 [docs/使用说明.md](./docs/使用说明.md)。

## 安装

```bash
npm install @fxshelf/word-tunnel
```

记得引入样式：

```ts
import '@fxshelf/word-tunnel/styles.css'
```

| 使用方 | Peer |
|--------|------|
| React | `react` / `react-dom` ≥ 18 |
| Vue | `vue` ≥ 3.3，且能编译 `.vue`（如 Vite） |

## 用法 — React

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

## 用法 — Vue

入口为源码 SFC：`@fxshelf/word-tunnel/vue`。

```vue
<script setup lang="ts">
import { WordTunnel } from '@fxshelf/word-tunnel/vue'
import '@fxshelf/word-tunnel/styles.css'
</script>

<template>
  <WordTunnel :style="{ height: '420px', background: '#0c081e' }" />
</template>
```

## 常用 props

| prop | 默认 | 说明 |
|------|------|------|
| `words` | 内置词条 | 词条数组 |
| `count` | 按宽度自适应 | 固定词数 |
| `seed` | `20250913` | 随机种子（同值布局可复现） |
| `perspective` | `900` | CSS perspective |
| `innerRadius` | `8` | 中心空洞半径 |
| `outerRadius` | `52` | 外圈采样半径 |
| `travelMin` / `travelRange` | `480` / `560` | z 飞行距离 |
| `fadeIn` / `fadeOut` | `10` / `88` | 淡入/淡出进度 0–100 |
| `color` / `fontSize` | `#fff` / `24` | 文字样式 |

## 用法 — CDN（React 18 UMD）

自包含产物 `dist/word-tunnel.iife.js`，全局 `WordTunnel`。完整示例：[docs/CDN示例.html](./docs/CDN示例.html)。

```html
<link rel="stylesheet" href="https://unpkg.com/@fxshelf/word-tunnel/dist/index.css" />

<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@fxshelf/word-tunnel/dist/word-tunnel.iife.js"></script>

<div id="app" style="height:420px;background:#0c081e"></div>
<script>
  ReactDOM.createRoot(document.getElementById('app')).render(
    React.createElement(WordTunnel.WordTunnel, {
      style: { height: '100%', background: '#0c081e' },
    }),
  )
</script>
```

生产环境建议锁定版本，如 `@fxshelf/word-tunnel@0.1.0/...`。  
不要用 jsDelivr GitHub `gh/.../dist` 直链（`dist/` 不进 Git）。

## 复制源码

不经过 npm 时，从本包 `src/`（或 `node_modules/@fxshelf/word-tunnel/`）拷贝：

```
core/     # 必拷（含 styles.css）
react/    # React 项目
vue/      # Vue 项目
```

保持 `core` 与 `react` / `vue` 同级，然后：

```tsx
// React
import { WordTunnel } from './components/word-tunnel/react'
import './components/word-tunnel/core/styles.css'
```

```ts
// Vue
import { WordTunnel } from './components/word-tunnel/vue'
import './components/word-tunnel/core/styles.css'
```

## 参考文章

- [我用 CSS 3D 做了个星空隧道 Loading，没有 Three.js](https://juejin.cn/post/7684547172777246766)（掘金）
- [知乎专栏 · 星空隧道词云 Loading](https://zhuanlan.zhihu.com/p/2082492419061330179)
- [CSDN · 星空隧道词云 Loading](https://blog.csdn.net/paopao_pop/article/details/165232859)

## License

MIT
