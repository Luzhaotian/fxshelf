# @fxshelf/swarm-cursors

[English](./README.md) · [中文](./README.zh-CN.md)

Multi-cursor **swarm page builder** for **React** — workers draw guides, shapes, and copy as you scroll. Zero Framer / GSAP. Inspired by Joel Califa’s Swarm; engine vendored from [swarm-cursors-skills](https://github.com/cxyax/swarm-cursors-skills) (MIT). See [SOURCE.md](./SOURCE.md).

Part of the [fxshelf](https://github.com/Luzhaotian/fxshelf) effect shelf — install independently.

| | |
|--|--|
| **Docs / Demo** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/docs/effects/swarm-cursors) |
| **npm** | [`@fxshelf/swarm-cursors@0.1.0`](https://www.npmjs.com/package/@fxshelf/swarm-cursors) |
| **CDN** | [unpkg](https://unpkg.com/@fxshelf/swarm-cursors/) · [jsDelivr](https://cdn.jsdelivr.net/npm/@fxshelf/swarm-cursors/) |

**React-only** in v0.1 (DOM construction engine). Vue is not shipped yet.

## Install

```bash
npm install @fxshelf/swarm-cursors
```

Peer: `react` / `react-dom` ≥ 18. Load display fonts when possible (`Space Grotesk`, `Source Sans 3`, `IBM Plex Mono`).

## Usage

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

- **Full page:** omit `embed` — uses window scroll (default `createScene`).
- **Card / docs:** `embed` + fixed-height parent; prefer `createDemoScene`.
- Remount with a new `key` when changing `sceneFactory` / `autoStart`.

Author custom layouts with `SceneBuilder` (see docs).

## Copy-as-source

Copy `src/core` + `src/react` and keep the relative CSS import.

## License

MIT
