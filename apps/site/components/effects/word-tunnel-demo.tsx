'use client'

import { WordTunnel } from '@fxshelf/word-tunnel'
import '@fxshelf/word-tunnel/styles.css'

export function WordTunnelDemo() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border bg-[#0c081e]">
      <WordTunnel className="h-[min(52vh,440px)] w-full">
        <div className="flex h-full min-h-[min(52vh,440px)] flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl">
            词云隧道
          </p>
          <p className="max-w-sm text-sm text-white/50">
            文字朝灭点飞来 · 纯 CSS 3D · 零动画库
          </p>
        </div>
      </WordTunnel>
    </div>
  )
}
