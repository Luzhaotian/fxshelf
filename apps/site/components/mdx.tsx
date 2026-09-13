import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { ButtonKitDemo } from '@/components/effects/button-kit-demo'
import { CardOrbitDemo } from '@/components/effects/card-orbit-demo'
import { CardOrbitPathLab } from '@/components/effects/card-orbit-path'
import { GlyphRainDemo } from '@/components/effects/glyph-rain-demo'
import { StarfieldDemo } from '@/components/effects/starfield-demo'
import { WordTunnelDemo } from '@/components/effects/word-tunnel-demo'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ButtonKitDemo,
    CardOrbitDemo,
    CardOrbitPathLab,
    GlyphRainDemo,
    StarfieldDemo,
    WordTunnelDemo,
    ...components,
  } as MDXComponents
}

export const useMDXComponents = getMDXComponents
