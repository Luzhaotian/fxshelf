import { DEFAULTS, type StarfieldInstance, type StarfieldOptions } from './types'

type Star = {
  x: number
  y: number
  z: number
  px: number
  py: number
  seed: number
  vmul: number
  colorIdx: number
  flashUntil: number
  nextFlash: number
}

type ParsedColor = [number, number, number, number]

function parseColor(input: string | null | undefined): ParsedColor {
  if (!input) return [255, 255, 255, 1]
  const s = input.trim()
  if (s.charAt(0) === '#') {
    let hex = s.slice(1)
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('')
    }
    const num = parseInt(hex, 16)
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255, 1]
  }
  const m = s.match(/rgba?\(([^)]+)\)/i)
  if (m?.[1]) {
    const parts = m[1].split(',').map((p) => parseFloat(p.trim()))
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0, parts[3] == null ? 1 : parts[3]]
  }
  return [255, 255, 255, 1]
}

type RuntimeConfig = {
  reverse: boolean
  density: number
  stepZ: number
  focalDepth: number
  starScale: number
  turbulence: number
  glitter: number
  brightness: number
  trail: number
}

function toRuntime(options: Required<StarfieldOptions>): RuntimeConfig {
  return {
    reverse: options.reverse,
    density: options.density,
    stepZ: options.speed * 0.0008,
    focalDepth: options.focalDepth / 100,
    starScale: options.starSize * 0.15,
    turbulence: options.turbulence * 0.2,
    glitter: options.glitterIntensity * 0.1,
    brightness: Math.min(1, options.brightness / 100),
    trail: options.trailAmount / 100,
  }
}

/**
 * Canvas 2D starfield tunnel: stars fly toward (or away from) the camera
 * with perspective projection, optional glitter flashes, and additive trails.
 */
export function createStarfield(
  canvas: HTMLCanvasElement,
  options: StarfieldOptions = {},
): StarfieldInstance {
  let config: Required<StarfieldOptions> = { ...DEFAULTS, ...options }
  const maybeCtx = canvas.getContext('2d')
  if (!maybeCtx) {
    return {
      setOptions() {},
      resize() {},
      destroy() {},
    }
  }
  const ctx = maybeCtx

  const container = canvas.parentElement
  let w = 0
  let h = 0
  let dpr = 1
  let stars: Star[] = []
  let elapsed = 0
  let lastT = performance.now()
  let raf: number | null = null
  let destroyed = false

  const colorCache = {
    color1: '',
    color2: '',
    color3: '',
    parsed1: [255, 255, 255, 1] as ParsedColor,
    parsed2: [255, 255, 255, 1] as ParsedColor,
    parsed3: [255, 255, 255, 1] as ParsedColor,
  }

  function getCachedColors() {
    if (config.color1 !== colorCache.color1) {
      colorCache.color1 = config.color1
      colorCache.parsed1 = parseColor(config.color1)
    }
    if (config.color2 !== colorCache.color2) {
      colorCache.color2 = config.color2
      colorCache.parsed2 = parseColor(config.color2)
    }
    if (config.color3 !== colorCache.color3) {
      colorCache.color3 = config.color3
      colorCache.parsed3 = parseColor(config.color3)
    }
    return colorCache
  }

  function makeStar(): Star {
    return {
      x: 0,
      y: 0,
      z: 0,
      px: NaN,
      py: NaN,
      seed: 0,
      vmul: 1,
      colorIdx: 0,
      flashUntil: 0,
      nextFlash: 0,
    }
  }

  function resetStar(s: Star, initial = false) {
    const c = toRuntime(config)
    const angle = Math.random() * Math.PI * 2
    const radius = (0.2 + Math.random() * 0.8) * (c.density / 15)
    s.x = Math.cos(angle) * radius
    s.y = Math.sin(angle) * radius
    if (c.reverse) {
      s.z = initial ? c.focalDepth + Math.random() * (1 - c.focalDepth) : c.focalDepth
    } else {
      s.z = initial ? Math.random() : 1.0
    }
    s.px = NaN
    s.py = NaN
    s.seed = Math.random() * 1000
    s.vmul = 0.6 + Math.random() * 0.8
    s.colorIdx = Math.floor(Math.random() * 3)
    s.flashUntil = 0
    s.nextFlash = elapsed + 1 + Math.random() * 4 * (1 / Math.max(0.0001, c.glitter))
  }

  function syncCount() {
    const count = Math.max(1, Math.floor(config.particleCount))
    if (stars.length === count) return
    if (stars.length > count) {
      stars.length = count
      return
    }
    while (stars.length < count) {
      const s = makeStar()
      resetStar(s, true)
      stars.push(s)
    }
  }

  function resize() {
    if (destroyed) return
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2)
    const rectW =
      container?.clientWidth || container?.getBoundingClientRect().width || canvas.clientWidth
    const rectH =
      container?.clientHeight || container?.getBoundingClientRect().height || canvas.clientHeight
    const nextW = Math.max(1, Math.floor(rectW) || 600)
    const nextH = Math.max(1, Math.floor(rectH) || 400)
    if (w === nextW && h === nextH && dpr === nextDpr) return
    w = nextW
    h = nextH
    dpr = nextDpr
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
  }

  function drawFrame(deltaSec: number) {
    const c = toRuntime(config)
    syncCount()
    const colors = getCachedColors()
    const palette = [colors.parsed1, colors.parsed2, colors.parsed3]
    const rgbStrs = [
      'rgb(' + palette[0]![0] + ', ' + palette[0]![1] + ', ' + palette[0]![2] + ')',
      'rgb(' + palette[1]![0] + ', ' + palette[1]![1] + ', ' + palette[1]![2] + ')',
      'rgb(' + palette[2]![0] + ', ' + palette[2]![1] + ', ' + palette[2]![2] + ')',
    ]
    const cx = w / 2
    const cy = h / 2
    const projScale = Math.min(w, h) * 0.9
    const dt = Math.max(0.001, Math.min(0.1, deltaSec)) * 60
    const keep = Math.pow(Math.min(0.98, Math.max(0, c.trail)), dt)
    const trailAlpha = Math.max(0.02, 1 - keep)
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0, 0, 0, ' + trailAlpha + ')'
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i]!
      const vz = c.stepZ * s.vmul * dt
      if (c.reverse) {
        s.z += vz
        if (s.z >= 1.0) {
          resetStar(s)
          continue
        }
      } else {
        s.z -= vz
        if (s.z <= c.focalDepth) {
          resetStar(s)
          continue
        }
      }
      let tx = s.x
      let ty = s.y
      if (c.turbulence > 0) {
        const tVal = elapsed * 1.2 + s.seed
        const amp = c.turbulence * (1 - s.z) * 0.25
        tx += Math.sin(tVal + s.seed) * amp
        ty += Math.cos(tVal * 1.13 + s.seed * 0.7) * amp
      }
      const persp = c.focalDepth / Math.max(s.z, 0.0001)
      const sx = cx + tx * persp * projScale
      const sy = cy + ty * persp * projScale
      if (!c.reverse && (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20)) {
        resetStar(s)
        continue
      }
      let flashMult = 1
      if (c.glitter > 0) {
        if (elapsed >= s.nextFlash && s.flashUntil < elapsed) {
          s.flashUntil = elapsed + 0.04 + Math.random() * 0.07
          s.nextFlash = elapsed + 1 + Math.random() * 4 * (1 / Math.max(0.0001, c.glitter))
        }
        if (elapsed <= s.flashUntil) {
          flashMult = 1 + 2.5 * c.glitter
        }
      }
      const sizePersp = Math.min(2.5, (c.focalDepth / Math.max(s.z, 0.0001)) * 0.6)
      const baseR = Math.max(0.25, c.starScale * (0.4 + sizePersp))
      const maxR = 1 + c.starScale * 2.5
      const r = Math.min(baseR * flashMult, maxR)
      const lifeT = c.reverse ? s.z : 1 - s.z
      const fadeIn = c.reverse
        ? Math.min(1, (s.z - c.focalDepth) / (1 - c.focalDepth) / 0.12)
        : 1
      const a =
        Math.min(1, c.reverse ? 0.85 - lifeT * 0.6 : lifeT * 0.9 + 0.05) *
        fadeIn *
        c.brightness *
        (flashMult > 1 ? 1 : 0.85)
      const colStr = rgbStrs[s.colorIdx]!
      if (!Number.isNaN(s.px) && !Number.isNaN(s.py)) {
        ctx.globalAlpha = a * 0.5
        ctx.strokeStyle = colStr
        ctx.lineWidth = Math.max(0.4, r * 0.4)
        ctx.beginPath()
        ctx.moveTo(s.px, s.py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }
      ctx.globalAlpha = a
      ctx.fillStyle = colStr
      ctx.fillRect(sx - r, sy - r, r * 2, r * 2)
      if (flashMult > 1) {
        const rf = Math.min(r * 1.4, maxR * 1.4)
        ctx.globalAlpha = a * 0.5
        ctx.fillRect(sx - rf, sy - rf, rf * 2, rf * 2)
      }
      s.px = sx
      s.py = sy
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
    elapsed += Math.min(0.1, Math.max(0, deltaSec))
  }

  function loop(t: number) {
    if (destroyed) return
    const deltaSec = (t - lastT) / 1000
    lastT = t
    drawFrame(deltaSec)
    raf = requestAnimationFrame(loop)
  }

  syncCount()
  resize()
  raf = requestAnimationFrame(loop)

  let resizeObserver: ResizeObserver | null = null
  if (container && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(container)
  }

  return {
    setOptions(partial) {
      config = { ...config, ...partial }
      syncCount()
    },
    resize,
    destroy() {
      destroyed = true
      if (raf != null) cancelAnimationFrame(raf)
      raf = null
      resizeObserver?.disconnect()
      resizeObserver = null
      stars = []
    },
  }
}

export { DEFAULTS }
export type { StarfieldInstance, StarfieldOptions }
