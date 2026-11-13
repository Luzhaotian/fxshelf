import { effects } from '@/lib/effects'

export const effectDemoIds = effects.map((effect) => effect.id)

export type EffectDemoId = (typeof effectDemoIds)[number]

export function isEffectDemoId(id: string): id is EffectDemoId {
  return effectDemoIds.includes(id)
}
