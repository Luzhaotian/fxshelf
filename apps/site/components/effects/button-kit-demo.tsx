'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Button, BUTTON_VARIANTS, type ButtonVariant } from '@fxshelf/button-kit'
import '@fxshelf/button-kit/styles.css'

export function ButtonKitDemo() {
  const [variant, setVariant] = useState<ButtonVariant>('chroma')
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  const measureOverflow = useCallback(() => {
    const el = tabsRef.current
    if (!el) return
    // Compare full wrap height against a single line (~chip height + gap).
    const singleLine = 36
    setOverflows(el.scrollHeight > singleLine + 4)
  }, [])

  useLayoutEffect(() => {
    measureOverflow()
  }, [measureOverflow, expanded])

  useEffect(() => {
    const el = tabsRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => measureOverflow())
    ro.observe(el)
    return () => ro.disconnect()
  }, [measureOverflow])

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border bg-[#040d15]">
      <div className="flex items-start gap-2 border-b border-white/10 px-4 py-3 sm:px-6">
        <div
          ref={tabsRef}
          className={`flex min-w-0 flex-1 flex-wrap gap-2 ${
            expanded ? '' : 'max-h-8 overflow-hidden'
          }`}
        >
          {BUTTON_VARIANTS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setVariant(name)}
              className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                variant === name
                  ? 'bg-white text-[#040d15]'
                  : 'bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        {overflows || expanded ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-white/55 transition hover:bg-white/10 hover:text-white"
          >
            {expanded ? '收起' : '展开'}
          </button>
        ) : null}
      </div>
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 overflow-visible px-6 py-12">
        <Button variant={variant}>Continue with {variant}</Button>
        <code className="text-xs text-white/45">
          {`<Button variant="${variant}" />`}
        </code>
      </div>
    </div>
  )
}
