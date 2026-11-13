'use client'

import Link from 'next/link'
import { Maximize2 } from 'lucide-react'
import { cn } from '@/lib/cn'

type DemoFrameProps = {
  effectId: string
  className?: string
  children: React.ReactNode
}

export function DemoFrame({ effectId, className, children }: DemoFrameProps) {
  return (
    <div
      className={cn(
        'not-prose group relative my-6 overflow-hidden rounded-2xl border border-fd-border',
        className,
      )}
    >
      <Link
        href={`/preview/${effectId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 z-20 inline-flex size-8 items-center justify-center rounded-lg border border-fd-border bg-fd-background/85 text-fd-foreground/80 shadow-sm backdrop-blur-sm transition hover:bg-fd-background hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary"
        aria-label="在新标签页全屏预览"
        title="全屏预览"
      >
        <Maximize2 className="size-3.5" strokeWidth={2} aria-hidden />
      </Link>
      {children}
    </div>
  )
}
