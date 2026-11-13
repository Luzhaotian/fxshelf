# @fxshelf/swarm-cursors

[English](./README.md) · [中文](./README.zh-CN.md)

多光标 **swarm 页面共建**（React）——滚动时工人光标画出参考线、形状与文案。零 Framer / GSAP。灵感来自 Joel Califa 的 Swarm；引擎源自 [swarm-cursors-skills](https://github.com/cxyax/swarm-cursors-skills)（MIT）。详见 [SOURCE.md](./SOURCE.md)。

属于 [fxshelf](https://github.com/Luzhaotian/fxshelf) 动效书架，可单独安装。

| | |
|--|--|
| **文档 / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/swarm-cursors) |
| **npm** | [`@fxshelf/swarm-cursors@0.1.0`](https://www.npmjs.com/package/@fxshelf/swarm-cursors) |

**v0.1 仅 React**（DOM 施工引擎），暂无 Vue。

## 安装

```bash
npm install @fxshelf/swarm-cursors
```

Peer：`react` / `react-dom` ≥ 18。建议加载 `Space Grotesk`、`Source Sans 3`、`IBM Plex Mono`。

## 用法

```tsx
import { SwarmCursors, createDemoScene } from '@fxshelf/swarm-cursors'
import '@fxshelf/swarm-cursors/styles.css'

export function Demo() {
  return (
    <div style={{ height: 480 }}>
      <SwarmCursors
        embed
        autoStart
        sceneFactory={createDemoScene}
        showDialog={false}
        style={{ height: '100%' }}
      />
    </div>
  )
}
```

- **整页：** 不设 `embed`，跟 window 滚动（默认 `createScene`）。
- **卡片 / 文档：** `embed` + 固定高度父级，推荐 `createDemoScene`。
- 更换 `sceneFactory` / `autoStart` 时用新 `key` 重新挂载。

自定义场景用 `SceneBuilder`（见文档）。

## 复制源码

拷贝 `src/core` + `src/react`，保持相对 CSS 引用即可。

## License

MIT
