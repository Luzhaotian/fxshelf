'use client'

import { GlyphRain } from '@fxshelf/glyph-rain'
import { DemoFrame } from '@/components/effects/demo-frame'
import { cn } from '@/lib/cn'

export function GlyphRainDemo({ fill = false }: { fill?: boolean }) {
  const stage = (
    <GlyphRain
      className={cn('w-full', fill ? 'h-full min-h-dvh' : 'h-[min(52vh,440px)]')}
      density={0.18}
      glow={1.9}
      stir={0.85}
      layers={2}
      color={[0.267, 0.455, 1]}
      headColor={[0.55, 0.78, 1]}
    >
      <div
        className={cn(
          'flex h-full flex-col justify-end gap-3 bg-[radial-gradient(ellipse_at_30%_20%,#1a2744_0%,#07090f_55%)] px-6 py-8 sm:px-10',
          fill ? 'min-h-dvh' : 'min-h-[min(52vh,440px)]',
        )}
      >
        <p className="max-w-md font-serif text-2xl leading-snug tracking-tight text-white/90 sm:text-3xl">
          Glyphs rain. Cursor stirs the stream.
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-white/55">
          WebGL2 overlay · optional html-in-canvas lighting · zero Framer / GSAP.
        </p>
      </div>
    </GlyphRain>
  )

  if (fill) {
    return <div className="min-h-dvh w-full bg-[#07090f]">{stage}</div>
  }

  return (
    <DemoFrame effectId="glyph-rain" className="bg-[#07090f]">
      {stage}
    </DemoFrame>
  )
}
