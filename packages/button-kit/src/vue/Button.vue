<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { type ButtonVariant, variantClassName } from '../core/variants'
import '../core/styles.css'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant | string
    className?: string
    style?: CSSProperties
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'solid',
    type: 'button',
  },
)

defineEmits<{
  click: [event: MouseEvent]
}>()

const rootClass = computed(() =>
  [variantClassName(props.variant), props.className].filter(Boolean).join(' '),
)
</script>

<template>
  <button
    :type="type"
    :class="rootClass"
    :style="style"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
