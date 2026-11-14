// Public entry — host must import styles explicitly:
//   import '@fxshelf/swarm-cursors/styles.css'
export { SwarmExperience } from './SwarmExperience.jsx'
export { SceneBuilder } from './scene/scene-builder.js'
export { createScene, PAGE_HEIGHT } from './scene/create-scene.js'
export { createDemoScene, DEMO_PAGE_HEIGHT } from './scene/create-demo-scene.js'
export { ElementKind, TaskType } from './scene/types.js'
export { COLORS, TEXT_STYLES, PAGE_WIDTH, sansStyle, monoStyle } from './scene/theme.js'
export {
  ActionType,
  DialogKind,
  InteractionStyle,
  PlanName,
  PAGE_INTERACTIONS,
  START_ACTION,
} from './interactions/actions.js'
export { SwarmEngine } from './animation/SwarmEngine.js'
export { useSwarm } from './hooks/useSwarm.js'
export { usePageInteractions } from './hooks/usePageInteractions.js'
