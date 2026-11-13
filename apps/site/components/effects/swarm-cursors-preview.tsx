'use client'

import { SwarmCursors, createDemoScene } from '@fxshelf/swarm-cursors'
import '@fxshelf/swarm-cursors/styles.css'

export function SwarmCursorsPreview() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#e8ecf1]">
      <SwarmCursors
        embed
        autoStart
        sceneFactory={createDemoScene}
        showDialog={false}
        showRulers={false}
        className="absolute inset-0 h-full w-full"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#e8ecf1]/90 to-transparent px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-[11px] font-medium tracking-[0.16em] text-[#1a2332]/50 uppercase">
          Swarm Cursors
        </p>
        <p className="mt-1 max-w-[16rem] text-sm leading-snug font-medium text-[#1a2332]/85 sm:text-[15px]">
          多光标共建，边滚边画。
        </p>
      </div>
    </div>
  )
}
