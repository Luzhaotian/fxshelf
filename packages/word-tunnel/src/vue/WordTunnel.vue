<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import {
  DEFAULTS,
  buildConvergeKeyframes,
  buildWords,
  wordCountForWidth,
  type TunnelWord,
} from '../core/keywords'
import '../core/styles.css'

const props = withDefaults(
  defineProps<{
    words?: readonly string[]
    count?: number
    seed?: number
    perspective?: number
    innerRadius?: number
    outerRadius?: number
    travelMin?: number
    travelRange?: number
    fadeIn?: number
    fadeOut?: number
    color?: string
    fontSize?: number | string
    className?: string
    style?: Record<string, string | number>
  }>(),
  {
    seed: DEFAULTS.seed,
    perspective: DEFAULTS.perspective,
    innerRadius: DEFAULTS.innerRadius,
    outerRadius: DEFAULTS.outerRadius,
    travelMin: DEFAULTS.travelMin,
    travelRange: DEFAULTS.travelRange,
    fadeIn: DEFAULTS.fadeIn,
    fadeOut: DEFAULTS.fadeOut,
  },
)

const uid = useId().replace(/:/g, '')
const animName = `fx-wt-converge-${uid}`

const items = ref<TunnelWord[]>(
  buildWords({
    count: props.count ?? 80,
    seed: props.seed,
    words: props.words,
    innerRadius: props.innerRadius,
    outerRadius: props.outerRadius,
    travelMin: props.travelMin,
    travelRange: props.travelRange,
  }),
)

let resizeTimer: ReturnType<typeof setTimeout> | undefined

function rebuild() {
  const nextCount =
    props.count ??
    (typeof window !== 'undefined' ? wordCountForWidth(window.innerWidth) : 80)
  items.value = buildWords({
    count: nextCount,
    seed: props.seed,
    words: props.words,
    innerRadius: props.innerRadius,
    outerRadius: props.outerRadius,
    travelMin: props.travelMin,
    travelRange: props.travelRange,
  })
}

function onResize() {
  if (props.count != null) return
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(rebuild, 150)
}

onMounted(() => {
  rebuild()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (resizeTimer) clearTimeout(resizeTimer)
  window.removeEventListener('resize', onResize)
})

watch(
  () =>
    [
      props.count,
      props.seed,
      props.words,
      props.innerRadius,
      props.outerRadius,
      props.travelMin,
      props.travelRange,
    ] as const,
  () => rebuild(),
  { deep: true },
)

const keyframesCss = computed(() =>
  buildConvergeKeyframes(animName, props.fadeIn, props.fadeOut),
)

const rootClass = computed(() =>
  ['fx-wt', props.className].filter(Boolean).join(' '),
)

const rootStyle = computed(() => ({
  ...props.style,
  '--fx-wt-perspective': `${props.perspective}px`,
  '--fx-wt-anim': animName,
  ...(props.color ? { '--fx-wt-color': props.color } : null),
  ...(props.fontSize != null
    ? {
        '--fx-wt-font-size':
          typeof props.fontSize === 'number'
            ? `${props.fontSize}px`
            : props.fontSize,
      }
    : null),
}))
</script>

<template>
  <div :class="rootClass" :style="rootStyle">
    <component :is="'style'">{{ keyframesCss }}</component>
    <div class="fx-wt__stage" aria-hidden="true">
      <div class="fx-wt__space">
        <span
          v-for="(item, i) in items"
          :key="`${items.length}-${i}-${item.label}`"
          class="fx-wt__word"
          :style="{
            '--fx-wt-x': item.x,
            '--fx-wt-y': item.y,
            '--fx-wt-z0': `${item.z0}px`,
            '--fx-wt-z1': `${item.z1}px`,
            '--fx-wt-op': String(item.opacity),
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
    <div v-if="$slots.default" class="fx-wt__content">
      <slot />
    </div>
  </div>
</template>
