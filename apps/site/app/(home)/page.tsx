import Link from 'next/link'
import type { ReactNode } from 'react'
import { effects } from '@/lib/effects'
import { ButtonKitPreview } from '@/components/effects/button-kit-preview'
import { CardOrbitPreview } from '@/components/effects/card-orbit-preview'
import { GlyphRainPreview } from '@/components/effects/glyph-rain-preview'
import { StarfieldPreview } from '@/components/effects/starfield-preview'
import { WordTunnelPreview } from '@/components/effects/word-tunnel-preview'

const previews: Record<string, () => ReactNode> = {
  'card-orbit': () => <CardOrbitPreview />,
  'glyph-rain': () => <GlyphRainPreview />,
  starfield: () => <StarfieldPreview />,
  'button-kit': () => <ButtonKitPreview />,
  'word-tunnel': () => <WordTunnelPreview />,
}

function EffectPreview({ id }: { id: string }) {
  const render = previews[id]
  if (render) return render()
  return (
    <div className="flex aspect-[16/10] items-center justify-center bg-fd-muted text-sm text-fd-muted-foreground">
      预览
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="fx-grid flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 lg:py-20">
        <header className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--fx-accent-deep)] uppercase">
            fxshelf
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl">
            动效书架
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
            浏览可直接使用的动效包。每张卡片都有 live demo、简介与安装说明 —— 按需安装，不必整包引入。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-lg bg-fd-foreground px-4 py-2 text-sm font-medium text-fd-background transition hover:opacity-90"
            >
              阅读文档
            </Link>
          </div>
        </header>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {effects.map((effect) => (
            <li key={effect.id}>
              <Link
                href={effect.docPath}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-background/80 shadow-sm transition hover:border-fd-foreground/20 hover:shadow-md"
              >
                <div className="overflow-hidden border-b border-fd-border">
                  <EffectPreview id={effect.id} />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-tight">{effect.title}</h2>
                    <span className="text-xs font-medium text-[var(--fx-accent)] opacity-0 transition group-hover:opacity-100">
                      查看 →
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-fd-muted-foreground">{effect.blurb}</p>
                  <code className="mt-auto pt-2 text-[11px] text-fd-muted-foreground">
                    {effect.packageName}
                  </code>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-12 rounded-2xl border border-fd-border bg-fd-background/80 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">在 AI 助手里使用（MCP）</h2>
          <p className="mt-3 text-sm leading-relaxed text-fd-muted-foreground">
            安装 <code className="rounded bg-fd-muted px-1.5 py-0.5 text-xs">@fxshelf/mcp</code>{' '}
            后，Claude Code、Cursor 等 MCP 客户端可以直接发现动效、读取文档、获取可复制源码与锁定版本的
            CDN 片段 —— 本地 stdio 运行，无需 API key、无需联网。
          </p>
          <p className="mt-5 text-sm font-medium">写入 MCP 客户端配置（如 <code className="text-xs">~/.claude.json</code> 的 <code className="text-xs">mcpServers</code>）：</p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-fd-muted p-4 text-xs leading-relaxed"><code>{`{
  "mcpServers": {
    "fxshelf": {
      "command": "npx",
      "args": ["-y", "@fxshelf/mcp"]
    }
  }
}`}</code></pre>
          <p className="mt-5 text-sm font-medium">然后直接对 AI 助手说：</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-fd-muted-foreground">
            <li>「给我的 hero 区加一个星空隧道背景」→ 它会自动发现动效、读文档、安装或复制源码</li>
            <li>「把 word-tunnel 的 Vue 源码给我」</li>
            <li>「给我一个 card-orbit 免构建 CDN 示例」</li>
            <li>「测试一下 fxshelf MCP 是否连通」→ 调用 <code className="text-xs">ping</code> 工具检查</li>
          </ul>
          <p className="mt-5 text-xs text-fd-muted-foreground">
            共 5 个工具：<code>ping</code> · <code>list_effects</code> · <code>get_effect_docs</code> ·{' '}
            <code>get_effect_source</code> · <code>get_cdn_snippet</code>，详见{' '}
            <Link href="/docs#mcp" className="font-medium text-[var(--fx-accent)] hover:underline">
              文档说明
            </Link>{' '}
            或{' '}
            <Link
              href="https://github.com/Luzhaotian/fxshelf/tree/main/packages/mcp"
              className="font-medium text-[var(--fx-accent)] hover:underline"
            >
              @fxshelf/mcp
            </Link>
            。
          </p>
        </section>
      </div>
    </main>
  )
}
