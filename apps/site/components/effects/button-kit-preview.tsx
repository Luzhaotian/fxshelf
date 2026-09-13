'use client'

import { Button } from '@fxshelf/button-kit'
import '@fxshelf/button-kit/styles.css'

export function ButtonKitPreview() {
  return (
    <div className="relative flex aspect-[16/10] flex-wrap items-center justify-center gap-3 overflow-hidden bg-[#040d15] px-4 py-6">
      <Button variant="chroma">chroma</Button>
      <Button variant="liquid">liquid</Button>
      <Button variant="neon">neon</Button>
    </div>
  )
}
