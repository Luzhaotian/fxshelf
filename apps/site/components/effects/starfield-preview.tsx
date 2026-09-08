'use client'

import { Starfield } from '@fxshelf/starfield'

export function StarfieldPreview() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0f]">
      <Starfield
        className="absolute inset-0 h-full w-full"
        particleCount={180}
        speed={1}
        density={48}
        starSize={7}
        brightness={78}
        glitterIntensity={5}
        trailAmount={28}
        color1="#ffffff"
        color2="#c8d4ff"
        color3="#a8b8ff"
      >
        <div className="flex h-full flex-col justify-end gap-1.5 px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">
            Starfield
          </p>
          <p className="max-w-[14rem] text-sm leading-snug font-medium text-white/85 sm:text-[15px]">
            透视星海，向你飞来。
          </p>
        </div>
      </Starfield>
    </div>
  )
}
