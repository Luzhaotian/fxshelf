import { useEffect, useRef, useState } from 'react'
import { SwarmEngine } from '../animation/SwarmEngine.js'
import { PAGE_WIDTH } from '../scene/theme.js'
import { createScene } from '../scene/create-scene.js'

const FONT_REQUESTS = [
  '400 16px "Space Grotesk"',
  '500 16px "Space Grotesk"',
  '600 16px "Space Grotesk"',
  '400 16px "Source Sans 3"',
  '400 16px "IBM Plex Mono"',
  '500 16px "IBM Plex Mono"',
]

/**
 * Map browser (or embed root) size onto the 1280px design canvas.
 * @param {SwarmEngine} engine
 * @param {HTMLElement|null} root
 * @returns {void}
 */
function updateViewport(engine, root) {
  const width = root ? root.clientWidth : document.documentElement.clientWidth
  const height = root ? root.clientHeight : window.innerHeight
  const scale = Math.min(1, width / PAGE_WIDTH)
  Object.assign(engine.vp, {
    vw: width,
    vh: height,
    s: scale,
    left: (width - PAGE_WIDTH * scale) / 2,
  })
}

/**
 * @param {HTMLElement|null} root
 * @returns {number}
 */
function readScrollY(root) {
  return root ? root.scrollTop : window.scrollY
}

/**
 * Manage scene lifecycle, fonts, scroll listeners, and the animation loop.
 * When `rootRef` points at a scrollable element, embed mode uses that root
 * instead of the window (for shelf cards / docs demos).
 *
 * @param {{
 *   sceneFactory?: Function,
 *   autoStart?: boolean,
 *   onEngine?: Function,
 *   rootRef?: {current: HTMLElement|null}|null,
 * }} options
 * @returns {import("../animation/SwarmEngine.js").SwarmEngine|null}
 */
export function useSwarm({
  sceneFactory = createScene,
  autoStart = false,
  onEngine,
  rootRef = null,
} = {}) {
  const [engine, setEngine] = useState(null)
  const [, renderFrame] = useState(0)
  const initialOptions = useRef({ sceneFactory, autoStart })
  const onEngineRef = useRef(onEngine)
  onEngineRef.current = onEngine

  useEffect(() => {
    let cancelled = false
    let timeout
    const root = rootRef?.current ?? null
    const previousRestoration =
      !root && 'scrollRestoration' in history ? history.scrollRestoration : null
    if (!root && 'scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (root) root.scrollTop = 0
    else window.scrollTo(0, 0)

    const fonts = document.fonts
      ? Promise.all(FONT_REQUESTS.map((font) => document.fonts.load(font))).catch(() => undefined)
      : Promise.resolve()
    const deadline = new Promise((resolve) => {
      timeout = setTimeout(resolve, 2500)
    })
    Promise.race([fonts, deadline]).then(() => {
      if (cancelled) return
      clearTimeout(timeout)
      const scene = new SwarmEngine({
        sceneFactory: initialOptions.current.sceneFactory,
      })
      updateViewport(scene, rootRef?.current ?? null)
      if (initialOptions.current.autoStart) scene.start()
      setEngine(scene)
      onEngineRef.current?.(scene)
    })
    return () => {
      cancelled = true
      clearTimeout(timeout)
      onEngineRef.current?.(null)
      if (previousRestoration != null) history.scrollRestoration = previousRestoration
    }
  }, [rootRef])

  useEffect(() => {
    if (!engine) return undefined
    const root = rootRef?.current ?? null

    function onResize() {
      updateViewport(engine, root)
    }
    function onScroll() {
      engine.setScroll(readScrollY(root))
    }
    function onWheel() {
      if (readScrollY(root) > 0) engine.start()
    }
    function onPointerMove(event) {
      if (root) {
        const rect = root.getBoundingClientRect()
        engine.mouse = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        }
      } else {
        engine.mouse = { x: event.clientX, y: event.clientY }
      }
    }
    function onPointerLeave() {
      engine.mouse = null
    }

    onResize()
    onScroll()

    const scrollTarget = root ?? window
    const resizeTarget = root ?? window
    const pointerTarget = root ?? window
    const leaveTarget = root ?? document.documentElement

    const resizeObserver =
      root && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => onResize()) : null
    if (resizeObserver && root) resizeObserver.observe(root)
    else resizeTarget.addEventListener('resize', onResize)

    scrollTarget.addEventListener('scroll', onScroll, { passive: true })
    pointerTarget.addEventListener('wheel', onWheel, { passive: true })
    pointerTarget.addEventListener('pointermove', onPointerMove, { passive: true })
    leaveTarget.addEventListener('pointerleave', onPointerLeave)

    let frameId
    let lastTime = performance.now()
    function tick(now) {
      engine.step((now - lastTime) / 1000)
      lastTime = now
      renderFrame((frame) => frame + 1)
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      if (!resizeObserver) resizeTarget.removeEventListener('resize', onResize)
      scrollTarget.removeEventListener('scroll', onScroll)
      pointerTarget.removeEventListener('wheel', onWheel)
      pointerTarget.removeEventListener('pointermove', onPointerMove)
      leaveTarget.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [engine, rootRef])

  return engine
}
