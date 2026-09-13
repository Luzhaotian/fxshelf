'use client'

import { WordTunnel } from '@fxshelf/word-tunnel'
import '@fxshelf/word-tunnel/styles.css'

export function WordTunnelPreview() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#0c081e]">
      <WordTunnel className="absolute inset-0 h-full w-full" count={48} fontSize={18}>
        <div className="flex h-full flex-col justify-end gap-1.5 px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">
            Word Tunnel
          </p>
          <p className="max-w-[14rem] text-sm leading-snug font-medium text-white/85 sm:text-[15px]">
            吐槽词朝你飞来。
          </p>
        </div>
      </WordTunnel>
    </div>
  )
}
