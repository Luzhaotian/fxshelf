import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { CardOrbitDemo } from '@/components/effects/card-orbit-demo'
import { CardOrbitPathLab } from '@/components/effects/card-orbit-path'
import { GlyphRainDemo } from '@/components/effects/glyph-rain-demo'
import { StarfieldDemo } from '@/components/effects/starfield-demo'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    CardOrbitDemo,
    CardOrbitPathLab,
    GlyphRainDemo,
    StarfieldDemo,
    ...components,
  } as MDXComponents
}

export const useMDXComponents = getMDXComponents
