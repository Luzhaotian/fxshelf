'use client'

import React, { useRef } from 'react'
import { useSwarm } from './hooks/useSwarm.js'
import { usePageInteractions } from './hooks/usePageInteractions.js'
import { ContentCanvas, IntroLogo, StickyNavigation } from './components/Stage.jsx'
import { CursorLayer } from './components/Cursor.jsx'
import { ConstructionOverlay } from './components/ConstructionOverlay.jsx'
import { Rulers } from './components/Rulers.jsx'
import { InteractionDialog } from './components/InteractionDialog.jsx'
import { createScene } from './scene/create-scene.js'
import { PAGE_INTERACTIONS } from './interactions/actions.js'
import './styles/index.css'

/**
 * Full-page (or embeddable) swarm construction experience.
 * `sceneFactory` / `autoStart` are read on mount — remount with a new `key` to change them.
 *
 * @param {object} props
 * @param {Function} [props.sceneFactory]
 * @param {object[]} [props.interactions]
 * @param {(action:object,engine:object)=>boolean|void} [props.onAction]
 * @param {boolean} [props.autoStart=false]
 * @param {(engine:object|null)=>void} [props.onEngine]
 * @param {string} [props.navLabel]
 * @param {boolean} [props.embed=false] Use the root as scroll container (shelf cards / docs).
 * @param {boolean} [props.showOverlay=true]
 * @param {boolean} [props.showRulers=true]
 * @param {boolean} [props.showDialog=true]
 * @param {import("react").ReactNode} [props.introMark]
 * @param {string} [props.className]
 * @returns {React.ReactElement}
 */
export function SwarmExperience({
  sceneFactory = createScene,
  interactions = PAGE_INTERACTIONS,
  onAction: onExternalAction,
  autoStart = false,
  onEngine,
  navLabel = 'Main navigation',
  embed = false,
  showOverlay = true,
  showRulers = true,
  showDialog = true,
  introMark,
  className = '',
}) {
  const rootRef = useRef(null)
  const engine = useSwarm({
    sceneFactory,
    autoStart,
    onEngine,
    rootRef: embed ? rootRef : null,
  })
  const { dialog, onAction, closeDialog } = usePageInteractions(
    engine,
    onExternalAction,
    embed ? rootRef : null,
  )

  const rootClass = ['swarm-experience', embed ? 'swarm-experience--embed' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={rootRef} className={rootClass}>
      {engine && (
        <>
          <main className="page" style={{ height: engine.height * engine.vp.s }}>
            <StickyNavigation
              engine={engine}
              interactions={interactions}
              onAction={onAction}
              label={navLabel}
            />
            <ContentCanvas engine={engine} interactions={interactions} onAction={onAction} />
            <IntroLogo started={engine.started} onAction={onAction} introMark={introMark} />
            {showOverlay ? <ConstructionOverlay engine={engine} /> : null}
            <CursorLayer engine={engine} />
          </main>
          {showRulers ? <Rulers engine={engine} /> : null}
          {showDialog ? <InteractionDialog dialog={dialog} onClose={closeDialog} /> : null}
        </>
      )}
    </div>
  )
}
