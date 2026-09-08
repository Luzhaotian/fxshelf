# @fxshelf/glyph-rain

[English](./README.md) · [中文](./README.zh-CN.md)

面向 **React** / **Vue** 的 Matrix 风格字符雨，支持光标搅动。  
在 Chrome 实验性 **html-in-canvas** API 可用时，雨滴头部可照亮页面内容；否则仍以 WebGL2 叠加层渲染。零动画库依赖。

灵感来自 [Canvas UI Glyph Rain](https://canvasui.dev/docs/components/glyph-rain)。  
属于 [fxshelf](https://github.com/Luzhaotian/fxshelf) 动效书架中的一个可独立安装包。

| | |
|--|--|
| **文档 / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/glyph-rain) |
| **npm** | [`@fxshelf/glyph-rain@0.1.1`](https://www.npmjs.com/package/@fxshelf/glyph-rain) |
| **CDN** | [unpkg](https://unpkg.com/@fxshelf/glyph-rain/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/glyph-rain/) |

支持 **npm**、**CDN `<script>`**、**复制源码**。详细用法见站点文档或 [docs/使用说明.md](./docs/使用说明.md)。

## 安装

```bash
npm install @fxshelf/glyph-rain
```

| 使用方 | Peer |
|--------|------|
| React | `react` / `react-dom` ≥ 18 |
| Vue | `vue` ≥ 3.3，且能编译 `.vue`（如 Vite） |

## 用法 — React

```tsx
import { GlyphRain } from '@fxshelf/glyph-rain'

export function Demo() {
  return (
    <GlyphRain style={{ height: 420 }} density={0.18} stir={0.8}>
      <img src="/photo.jpg" alt="" style={{ width: '100%', display: 'block' }} />
    </GlyphRain>
  )
}
```

## 用法 — Vue

入口为源码 SFC：`@fxshelf/glyph-rain/vue`。

```vue
<script setup lang="ts">
import { GlyphRain } from '@fxshelf/glyph-rain/vue'
</script>

<template>
  <GlyphRain :style="{ height: '420px' }" :density="0.18" :stir="0.8">
    <img src="/photo.jpg" alt="" style="width: 100%; display: block" />
  </GlyphRain>
</template>
```

## 浏览器说明

| 能力 | 要求 |
|------|------|
| 字符雨叠加层 | WebGL2 |
| 内容照明 / 压暗 | Chrome 实验性 `drawElementImage` + `layoutsubtree`（html-in-canvas） |
| 光标搅动 | 容器上的指针事件 |

## 复制源码

不经过 npm 时，从本包 `src/`（或 `node_modules/@fxshelf/glyph-rain/`）拷贝：

```
core/     # 必拷
react/    # React 项目
vue/      # Vue 项目
```

## License

MIT
