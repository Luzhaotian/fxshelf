'use client'

import { ButtonKitDemo } from '@/components/effects/button-kit-demo'
import { CardOrbitDemo } from '@/components/effects/card-orbit-demo'
import { GlyphRainDemo } from '@/components/effects/glyph-rain-demo'
import { StarfieldDemo } from '@/components/effects/starfield-demo'
import { SwarmCursorsDemo } from '@/components/effects/swarm-cursors-demo'
import { WordTunnelDemo } from '@/components/effects/word-tunnel-demo'
import type { EffectDemoId } from '@/lib/effect-demo-ids'

const demos: Record<EffectDemoId, (props: { fill?: boolean }) => React.ReactNode> = {
  'button-kit': ButtonKitDemo,
  'card-orbit': CardOrbitDemo,
  'glyph-rain': GlyphRainDemo,
  starfield: StarfieldDemo,
  'swarm-cursors': SwarmCursorsDemo,
  'word-tunnel': WordTunnelDemo,
}

export function EffectFullscreenDemo({ id }: { id: EffectDemoId }) {
  const Demo = demos[id]
  return <Demo fill />
}
