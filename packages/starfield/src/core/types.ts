export type StarfieldOptions = {
  /** Number of stars. Default `263`. */
  particleCount?: number
  /** Palette slot 1. Default `#ffffff`. */
  color1?: string
  /** Palette slot 2. Default `#ffffff`. */
  color2?: string
  /** Palette slot 3. Default `#ffffff`. */
  color3?: string
  /** Fly-toward speed multiplier. Default `1`. */
  speed?: number
  /** Radial spread (higher = wider field). Default `48`. */
  density?: number
  /** Base star size. Default `8`. */
  starSize?: number
  /** Perspective near clip (0–100 scale). Default `13`. */
  focalDepth?: number
  /** Lateral wobble. Default `0`. */
  turbulence?: number
  /** Overall brightness (0–100). Default `73`. */
  brightness?: number
  /** Twinkle intensity (0–10). Default `4`. */
  glitterIntensity?: number
  /** Trail persistence (0–100). Default `26`. */
  trailAmount?: number
  /** Fly away from camera instead of toward. Default `false`. */
  reverse?: boolean
}

export type StarfieldInstance = {
  setOptions(partial: StarfieldOptions): void
  resize(): void
  destroy(): void
}

export const DEFAULTS = {
  particleCount: 263,
  color1: '#ffffff',
  color2: '#ffffff',
  color3: '#ffffff',
  speed: 1,
  density: 48,
  starSize: 8,
  focalDepth: 13,
  turbulence: 0,
  brightness: 73,
  glitterIntensity: 4,
  trailAmount: 26,
  reverse: false,
} as const satisfies Required<StarfieldOptions>
