'use client'

import { WordTunnel } from '@fxshelf/word-tunnel'
import '@fxshelf/word-tunnel/styles.css'
import { DemoFrame } from '@/components/effects/demo-frame'
import { cn } from '@/lib/cn'

export function WordTunnelDemo({ fill = false }: { fill?: boolean }) {
  const stage = (
    <WordTunnel className={cn('w-full', fill ? 'h-full min-h-dvh' : 'h-[min(52vh,440px)]')}>
      <div
        className={cn(
          'flex h-full flex-col items-center justify-center gap-2 px-6 text-center',
          fill ? 'min-h-dvh' : 'min-h-[min(52vh,440px)]',
        )}
      >
        <p className="text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl">
          词云隧道
        </p>
        <p className="max-w-sm text-sm text-white/50">
          文字朝灭点飞来 · 纯 CSS 3D · 零动画库
        </p>
      </div>
    </WordTunnel>
  )

  if (fill) {
    return <div className="min-h-dvh w-full bg-[#0c081e]">{stage}</div>
  }

  return <DemoFrame effectId="word-tunnel" className="bg-[#0c081e]">{stage}</DemoFrame>
}
