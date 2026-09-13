# @fxshelf/button-kit

[English](./README.md) · [中文](./README.zh-CN.md)

面向 **React** / **Vue** 的按钮动效书架 —— 用 `variant` 字符串切换样式。零 Framer / GSAP 依赖。

属于 [fxshelf](https://github.com/Luzhaotian/fxshelf) 动效书架中的一个可独立安装包。

| | |
|--|--|
| **文档 / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/button-kit) |
| **npm** | [`@fxshelf/button-kit@0.1.0`](https://www.npmjs.com/package/@fxshelf/button-kit) |
| **CDN** | [unpkg](https://unpkg.com/@fxshelf/button-kit/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/button-kit/) |

支持 **npm**、**CDN `<script>`**、**复制源码**。详细用法见站点文档或 [docs/使用说明.md](./docs/使用说明.md)。

## 安装

```bash
npm install @fxshelf/button-kit
```

记得引入样式：

```ts
import '@fxshelf/button-kit/styles.css'
```

| 使用方 | Peer |
|--------|------|
| React | `react` / `react-dom` ≥ 18 |
| Vue | `vue` ≥ 3.3，且能编译 `.vue`（如 Vite） |

## 用法 — React

```tsx
import { Button } from '@fxshelf/button-kit'
import '@fxshelf/button-kit/styles.css'

export function Example() {
  return <Button variant="glow">继续</Button>
}
```

## 用法 — Vue

入口为源码 SFC：`@fxshelf/button-kit/vue`。

```vue
<script setup lang="ts">
import { Button } from '@fxshelf/button-kit/vue'
import '@fxshelf/button-kit/styles.css'
</script>

<template>
  <Button variant="neon">继续</Button>
</template>
```

## variant

| 值 | 效果 |
|----|------|
| `solid` | 实心深色 |
| `outline` | 描边，悬停填实 |
| `soft` | 浅色软按钮 |
| `glow` | 呼吸光晕 |
| `neon` | 霓虹描边 |
| `shimmer` | 悬停扫光 |
| `chroma` | 炫彩流光；hover 贴边高斯光晕 |
| `liquid` | 底部液体升起填充 |
| `wipe` | 斜向擦除填充 |
| `glass` | 毛玻璃半透明 |

未知字符串会回退到 `solid`。

## 用法 — CDN（React 18 UMD）

自包含产物 `dist/button-kit.iife.js`，全局 `ButtonKit`。完整示例：[docs/CDN示例.html](./docs/CDN示例.html)。

```html
<link rel="stylesheet" href="https://unpkg.com/@fxshelf/button-kit/dist/index.css" />

<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@fxshelf/button-kit/dist/button-kit.iife.js"></script>

<div id="app"></div>
<script>
  ReactDOM.createRoot(document.getElementById('app')).render(
    React.createElement(ButtonKit.Button, { variant: 'glow' }, '继续'),
  )
</script>
```

生产环境建议锁定版本，如 `@fxshelf/button-kit@0.1.0/...`。  
不要用 jsDelivr GitHub `gh/.../dist` 直链（`dist/` 不进 Git）。

## 复制源码

不经过 npm 时，从本包 `src/`（或 `node_modules/@fxshelf/button-kit/`）拷贝：

```
core/     # 必拷（含 styles.css）
react/    # React 项目
vue/      # Vue 项目
```

保持 `core` 与 `react` / `vue` 同级，然后：

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
