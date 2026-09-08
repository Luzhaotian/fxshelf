# @fxshelf/starfield

Canvas 2D starfield tunnel — stars fly toward the camera with perspective projection, glitter flashes, and additive trails. Zero Framer / GSAP / particles.js.

## Install

```bash
npm install @fxshelf/starfield
```

## React

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

## Vue

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

## License

MIT
