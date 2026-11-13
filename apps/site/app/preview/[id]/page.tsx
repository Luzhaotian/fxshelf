import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EffectFullscreenDemo } from '@/components/effects/effect-fullscreen-demo'
import { isEffectDemoId } from '@/lib/effect-demo-ids'
import { effects } from '@/lib/effects'

export function generateStaticParams() {
  return effects.map((effect) => ({ id: effect.id }))
}

export async function generateMetadata(
  props: PageProps<'/preview/[id]'>,
): Promise<Metadata> {
  const { id } = await props.params
  const effect = effects.find((item) => item.id === id)
  return {
    title: effect ? `${effect.title} 预览` : '预览',
    robots: { index: false, follow: false },
  }
}

export default async function PreviewPage(props: PageProps<'/preview/[id]'>) {
  const { id } = await props.params
  if (!isEffectDemoId(id)) notFound()

  return <EffectFullscreenDemo id={id} />
}
