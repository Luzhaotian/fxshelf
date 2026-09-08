'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import {
  createStarfield,
  type StarfieldInstance,
  type StarfieldOptions,
} from '../core/createStarfield'

export type StarfieldProps = StarfieldOptions & {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  /** Accessible label for the canvas. */
  ariaLabel?: string
}

export function Starfield({
  children,
  className,
  style,
  ariaLabel = 'Starfield background',
  ...options
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const instanceRef = useRef<StarfieldInstance | null>(null)
  const [initialOptions] = useState(options)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    instanceRef.current = createStarfield(canvas, initialOptions)
    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [initialOptions])

  useEffect(() => {
    instanceRef.current?.setOptions(options)
  })

  return (
    <div
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      <canvas
        ref={canvasRef}
        aria-label={ariaLabel}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
      {children != null ? (
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
          {children}
        </div>
      ) : null}
    </div>
  )
}

export default Starfield
