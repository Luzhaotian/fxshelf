# @fxshelf/starfield

[English](./README.md) · [中文](./README.zh-CN.md)

面向 **React** / **Vue** 的 Canvas 2D 星空隧道 —— 星星以透视投影飞向镜头，带闪烁与叠加拖尾。零 Framer / GSAP / particles.js 依赖。

属于 [fxshelf](https://github.com/Luzhaotian/fxshelf) 动效书架中的一个可独立安装包。

| | |
|--|--|
| **文档 / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/starfield) |
| **npm** | [`@fxshelf/starfield@0.1.1`](https://www.npmjs.com/package/@fxshelf/starfield) |
| **CDN** | [unpkg](https://unpkg.com/@fxshelf/starfield/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/starfield/) |

支持 **npm**、**CDN `<script>`**、**复制源码**。详细用法见站点文档或 [docs/使用说明.md](./docs/使用说明.md)。

## 安装

```bash
npm install @fxshelf/starfield
```

| 使用方 | Peer |
|--------|------|
| React | `react` / `react-dom` ≥ 18 |
| Vue | `vue` ≥ 3.3，且能编译 `.vue`（如 Vite） |

## 用法 — React

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

## 用法 — Vue

入口为源码 SFC：`@fxshelf/starfield/vue`。

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

## 常用 props

| prop | 默认 | 说明 |
|------|------|------|
| `particleCount` | `263` | 星星数量 |
| `speed` | `1` | 飞近速度 |
| `density` | `48` | 径向疏密 |
| `starSize` | `8` | 基础尺寸 |
| `brightness` | `73` | 亮度 0–100 |
| `glitterIntensity` | `4` | 闪烁强度 |
| `trailAmount` | `26` | 尾迹残留 |
| `color1` / `color2` / `color3` | `#ffffff` | 三色调色板 |
| `reverse` | `false` | 反向飞离 |

## 用法 — CDN（React 18 UMD）

自包含产物 `dist/starfield.iife.js`，全局 `Starfield`。完整示例：[docs/CDN示例.html](./docs/CDN示例.html)。

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

生产环境建议锁定版本。不要用 jsDelivr GitHub `gh/.../dist` 直链。

## 复制源码

不经过 npm 时，从本包 `src/`（或 `node_modules/@fxshelf/starfield/`）拷贝：

```
core/     # 必拷
react/    # React 项目
vue/      # Vue 项目
```

## License

MIT
