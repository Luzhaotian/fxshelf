<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type CSSProperties,
  type StyleValue,
} from 'vue'
import {
  createStarfield,
  type StarfieldInstance,
  type StarfieldOptions,
} from '../core/createStarfield'

const props = withDefaults(
  defineProps<{
    particleCount?: number
    color1?: string
    color2?: string
    color3?: string
    speed?: number
    density?: number
    starSize?: number
    focalDepth?: number
    turbulence?: number
    brightness?: number
    glitterIntensity?: number
    trailAmount?: number
    reverse?: boolean
    className?: string
    style?: CSSProperties
    ariaLabel?: string
  }>(),
  {
    ariaLabel: 'Starfield background',
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
let instance: StarfieldInstance | null = null

const rootClass = computed(() => props.className ?? '')
const rootStyle = computed(
  (): StyleValue => ({
    position: 'relative',
    overflow: 'hidden',
    ...props.style,
  }),
)

function optionPayload(): StarfieldOptions {
  return {
    particleCount: props.particleCount,
    color1: props.color1,
    color2: props.color2,
    color3: props.color3,
    speed: props.speed,
    density: props.density,
    starSize: props.starSize,
    focalDepth: props.focalDepth,
    turbulence: props.turbulence,
    brightness: props.brightness,
    glitterIntensity: props.glitterIntensity,
    trailAmount: props.trailAmount,
    reverse: props.reverse,
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  instance = createStarfield(canvas, optionPayload())
})

onBeforeUnmount(() => {
  instance?.destroy()
  instance = null
})

watch(
  () => optionPayload(),
  (next) => {
    instance?.setOptions(next)
  },
  { deep: true },
)
</script>

<template>
  <div :class="rootClass" :style="rootStyle">
    <canvas
      ref="canvasRef"
      :aria-label="ariaLabel"
      style="
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
      "
    />
    <div v-if="$slots.default" style="position: relative; z-index: 1; height: 100%">
      <slot />
    </div>
  </div>
</template>
