'use client'

import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from 'react'
import {
  BUTTON_VARIANTS,
  type ButtonVariant,
  variantClassName,
} from '../core/variants'
import '../core/styles.css'

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'style' | 'children'
> & {
  /** Switch look by name: solid | outline | soft | glow | neon | shimmer | chroma | liquid | wipe | glass. */
  variant?: ButtonVariant | (string & {})
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export function Button({
  variant = 'solid',
  children,
  className,
  style,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [variantClassName(variant), className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} style={style} {...rest}>
      {children}
    </button>
  )
}

export { BUTTON_VARIANTS, type ButtonVariant }
export default Button
