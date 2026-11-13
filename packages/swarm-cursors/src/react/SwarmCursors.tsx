'use client'

import type { CSSProperties, ReactElement, ReactNode } from 'react'
import { SwarmExperience } from '../core/SwarmExperience.jsx'

export type SceneFactory = (getWorkerCount: () => number) => {
  els: object[]
  tasks: object[]
  groups: object[]
  height: number
}

export type SwarmAction = {
  type: string
  target?: string
  kind?: string
  title?: string
  plan?: string
  [key: string]: unknown
}

export type SwarmCursorsProps = {
  sceneFactory?: SceneFactory
  interactions?: object[]
  onAction?: (action: SwarmAction, engine: object) => boolean | void
  autoStart?: boolean
  onEngine?: (engine: object | null) => void
  navLabel?: string
  /** Use root as scroll container — for cards / docs embeds. */
  embed?: boolean
  showOverlay?: boolean
  showRulers?: boolean
  showDialog?: boolean
  introMark?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Multi-cursor page builder — workers draw the scene as you scroll.
 * React-only in v0.1 (engine is DOM + React).
 */
export function SwarmCursors({ style, className, ...props }: SwarmCursorsProps) {
  // Core JSX is untyped; cast keeps the public API strict.
  const Core = SwarmExperience as unknown as (p: SwarmCursorsProps) => ReactElement

  if (style) {
    return (
      <div className={className} style={style}>
        <Core {...props} />
      </div>
    )
  }
  return <Core {...props} className={className} />
}

export default SwarmCursors
