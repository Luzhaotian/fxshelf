declare module '*.css'

declare module '*.jsx' {
  import type { ComponentType, ReactNode } from 'react'
  export const SwarmExperience: ComponentType<Record<string, unknown>>
  export const IntroMark: ComponentType<{ className?: string }>
  export const ContentCanvas: ComponentType<Record<string, unknown>>
  export const StickyNavigation: ComponentType<Record<string, unknown>>
  export const IntroLogo: ComponentType<{
    started: boolean
    onAction: (action: unknown) => void
    introMark?: ReactNode
  }>
  export const CursorLayer: ComponentType<Record<string, unknown>>
  export const ConstructionOverlay: ComponentType<Record<string, unknown>>
  export const Rulers: ComponentType<Record<string, unknown>>
  export const InteractionDialog: ComponentType<Record<string, unknown>>
  export const SceneElements: ComponentType<Record<string, unknown>>
  export const SceneInteractions: ComponentType<Record<string, unknown>>
}

declare module '*.js' {
  export const SceneBuilder: unknown
  export const createScene: unknown
  export const PAGE_HEIGHT: number
  export const createDemoScene: unknown
  export const DEMO_PAGE_HEIGHT: number
  export const ElementKind: Record<string, string>
  export const TaskType: Record<string, string>
  export const COLORS: Record<string, string>
  export const TEXT_STYLES: Record<string, unknown>
  export const PAGE_WIDTH: number
  export function sansStyle(...args: unknown[]): unknown
  export function monoStyle(...args: unknown[]): unknown
  export const ActionType: Record<string, string>
  export const DialogKind: Record<string, string>
  export const InteractionStyle: Record<string, string>
  export const PlanName: Record<string, string>
  export const PAGE_INTERACTIONS: object[]
  export const START_ACTION: object
  export const SwarmEngine: unknown
  export function useSwarm(...args: unknown[]): unknown
  export function usePageInteractions(...args: unknown[]): unknown
  export const SwarmExperience: unknown
}
