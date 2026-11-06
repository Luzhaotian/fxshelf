import snapshot from './data/snapshot.json'

export type SourceFile = { path: string; content: string }

export type CdnInfo = {
  globalName: string | null
  iifeFile: string | null
  unpkg: string | null
  jsdelivr: string | null
  css: string | null
  sampleHtml: string | null
}

export type ExtraDoc = { id: string; docUrl: string; markdown: string }

export type EffectEntry = {
  id: string
  title: string
  blurb: string
  npm: string
  version: string
  description: string
  keywords: string[]
  docUrl: string
  markdown: string
  extraDocs: ExtraDoc[]
  cdn: CdnInfo
  source: { core: SourceFile[]; react: SourceFile[]; vue: SourceFile[] }
}

export type Snapshot = {
  generatedAt: string
  siteBase: string
  effects: EffectEntry[]
}

export const data = snapshot as Snapshot

export const effects = data.effects

/** 按 id 查找；未找到时返回列出可用 id 的错误文本（null 表示命中）。 */
export function findEffect(id: string): { effect: EffectEntry } | { error: string } {
  const wanted = id.trim().replace(/^@fxshelf\//, '').toLowerCase()
  const effect = effects.find((e) => e.id === id || e.id.toLowerCase() === wanted || e.npm === id)
  if (effect) return { effect }
  const fuzzy = effects.find(
    (e) => e.id.includes(wanted) || wanted.includes(e.id) || e.title.toLowerCase().includes(wanted),
  )
  const ids = effects.map((e) => e.id).join(', ')
  const hint = fuzzy ? ` Did you mean "${fuzzy.id}"?` : ''
  return { error: `Unknown effect "${id}". Available effects: ${ids}.${hint}` }
}

const SOURCE_GROUP_LABELS: Record<string, string> = {
  core: 'core (framework-agnostic)',
  react: 'react',
  vue: 'vue',
}

export function formatSource(
  effect: EffectEntry,
  groups: Array<'core' | 'react' | 'vue'>,
  maxChars: number,
): string {
  const parts: string[] = []
  let truncated = false
  parts.push(`# ${effect.title} — copy-as-source (${effect.npm}@${effect.version})`)
  parts.push('')
  for (const group of groups) {
    const files = effect.source[group]
    parts.push(`## src group: ${SOURCE_GROUP_LABELS[group]}`)
    parts.push('')
    for (const file of files) {
      const block = `### ${file.path}\n\n\`\`\`\n${file.content}\n\`\`\`\n`
      const next = parts.join('\n') + block
      if (next.length > maxChars) {
        truncated = true
        break
      }
      parts.push(block)
    }
    if (truncated) break
  }
  if (truncated) {
    parts.push(
      `> ⚠️ Output truncated at ${maxChars} chars. Request fewer groups (e.g. groups=["vue"]) or raise max_chars.`,
    )
  }
  return parts.join('\n')
}

export function formatCdn(effect: EffectEntry, maxChars: number): string {
  const { cdn } = effect
  if (!cdn.iifeFile || !cdn.globalName) {
    return `${effect.npm} has no browser IIFE build. Use npm install or copy-as-source (see get_source).`
  }
  const head = [
    `# ${effect.title} via CDN <script> (${effect.npm}@${effect.version})`,
    '',
    `React packages load via the browser IIFE build — global \`${cdn.globalName}\`.`,
    'React UMD (18.x — React 19 dropped official UMD builds) must be loaded first:',
    '',
    '```html',
  ]
  if (cdn.css) head.push(`<link rel="stylesheet" href="${cdn.css}">`)
  const lines = [
    ...head,
    '<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>',
    '<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>',
    `<script src="${cdn.unpkg}"></script>`,
    '```',
    '',
    `jsDelivr alternative: \`${cdn.jsdelivr}\``,
  ]
  if (cdn.sampleHtml) {
    lines.push('', '## Full runnable sample (from the package repo)', '', '```html', cdn.sampleHtml.slice(0, maxChars), '```')
    if (cdn.sampleHtml.length > maxChars) {
      lines.push(`> ⚠️ Sample truncated at ${maxChars} chars; raise max_chars for the full file.`)
    }
  }
  return lines.join('\n')
}
