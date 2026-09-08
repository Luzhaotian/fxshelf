'use client'

import Link from 'next/link'
import type { BreadcrumbProps } from 'fumadocs-ui/layouts/docs/page'

/** Replaces the default folder breadcrumb on the Card Orbit path lab page. */
export function CardOrbitPathBreadcrumb(_props: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-fd-muted-foreground">
      <Link
        href="/docs/effects/card-orbit"
        className="inline-flex items-center rounded-lg border border-fd-border bg-fd-background px-2.5 py-1 text-[13px] font-medium text-fd-foreground/80 transition hover:bg-fd-accent hover:text-fd-foreground"
      >
        ← 返回 Card Orbit
      </Link>
    </div>
  )
}
