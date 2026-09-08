'use client'

import { Starfield } from '@fxshelf/starfield'

export function StarfieldDemo() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border bg-[#0a0a0f]">
      <Starfield
        className="h-[min(52vh,440px)] w-full"
        particleCount={263}
        speed={1}
        density={48}
        starSize={8}
        brightness={73}
        glitterIntensity={4}
        trailAmount={26}
        color1="#ffffff"
        color2="#e8eeff"
        color3="#cfd8ff"
      >
        <div className="flex h-full min-h-[min(52vh,440px)] flex-col justify-end gap-3 bg-[radial-gradient(ellipse_at_50%_40%,rgba(88,76,255,0.18)_0%,transparent_55%)] px-6 py-8 sm:px-10">
          <p className="max-w-md font-serif text-2xl leading-snug tracking-tight text-white/90 sm:text-3xl">
            Stars rush past the viewport.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
            Canvas 2D tunnel · glitter flashes · additive trails · zero Framer /
            GSAP.
          </p>
        </div>
      </Starfield>
    </div>
  )
}
