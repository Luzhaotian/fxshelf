'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { SwarmCursors, createDemoScene } from '@fxshelf/swarm-cursors'
import '@fxshelf/swarm-cursors/styles.css'
import { DemoFrame } from '@/components/effects/demo-frame'
import { cn } from '@/lib/cn'

function ReplayButton({
  onReplay,
  className,
}: {
  onReplay: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onReplay}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-[#e9efd9] px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-[#394c1d] shadow-[0_6px_24px_rgba(26,40,8,0.07)] transition hover:bg-[#dde6c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#394c1d]/40',
        className,
      )}
      aria-label="重新播放"
      title="Replay"
    >
      <RotateCcw className="size-3" strokeWidth={2.25} aria-hidden />
      Replay
    </button>
  )
}

export function SwarmCursorsDemo({ fill = false }: { fill?: boolean }) {
  const [replayKey, setReplayKey] = useState(0)
  const replay = () => setReplayKey((key) => key + 1)

  const stage = (
    <div
      className={cn(
        'relative w-full bg-[#e8ecf1]',
        fill ? 'h-full' : 'h-[min(56vh,480px)]',
      )}
    >
      <SwarmCursors
        key={replayKey}
        embed
        autoStart
        sceneFactory={createDemoScene}
        showDialog={false}
        className="h-full w-full"
      />
      <div
        className={cn(
          'pointer-events-none absolute z-20 flex justify-end',
          fill ? 'inset-x-0 bottom-5 px-6' : 'right-3 bottom-3',
        )}
      >
        <div className="pointer-events-auto rounded-full bg-[rgba(250,251,246,0.95)] p-1.5 pl-1.5 shadow-[0_6px_24px_rgba(26,40,8,0.07)]">
          <ReplayButton onReplay={replay} />
        </div>
      </div>
    </div>
  )

  if (fill) {
    return <div className="h-full w-full">{stage}</div>
  }

  return (
    <DemoFrame effectId="swarm-cursors">
      {stage}
      <p className="border-t border-fd-border bg-fd-background px-4 py-3 text-xs text-fd-muted-foreground">
        嵌入模式 · 在框内滚动继续施工 · 点击 intro 也可开工
      </p>
    </DemoFrame>
  )
}
