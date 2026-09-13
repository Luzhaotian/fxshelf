/** Built-in button looks. Pass any of these as `variant`. */
export const BUTTON_VARIANTS = [
  'solid',
  'outline',
  'soft',
  'glow',
  'neon',
  'shimmer',
  'chroma',
  'liquid',
  'wipe',
  'glass',
] as const

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number]

export const DEFAULT_VARIANT: ButtonVariant = 'solid'

export function resolveVariant(variant?: string): ButtonVariant {
  if (
    variant != null &&
    (BUTTON_VARIANTS as readonly string[]).includes(variant)
  ) {
    return variant as ButtonVariant
  }
  return DEFAULT_VARIANT
}

export function variantClassName(variant?: string): string {
  return `fx-btn fx-btn--${resolveVariant(variant)}`
}
