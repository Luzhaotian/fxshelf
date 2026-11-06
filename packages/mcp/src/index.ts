#!/usr/bin/env node
/**
 * @fxshelf/mcp — MCP server exposing the fxshelf effect shelf.
 *
 * Tools let AI assistants (Claude Code, Cursor, ...) discover effects, read
 * docs, fetch copy-as-source code, and get version-locked CDN snippets.
 * All data is baked into the package at build time (src/data/snapshot.json),
 * so the server needs no network access and no API key.
 */
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import pkg from '../package.json' with { type: 'json' }
import { z } from 'zod'

import { data, effects, findEffect, formatCdn, formatSource } from './catalog.js'

const CHARACTER_LIMIT = 60_000

const server = new McpServer(
  {
    name: 'fxshelf-mcp-server',
    version: pkg.version,
  },
  {
    instructions: [
      'fxshelf is a shelf of micro animation packages for React and Vue with zero animation-library deps.',
      'Workflow: list_effects → get_effect_docs (usage/API) → get_effect_source (copy core + react/vue files into the user project) or get_cdn_snippet (no-build <script> usage).',
      'When adding an effect to a user project, prefer get_effect_source output verbatim (copy-as-source) and keep the package README link.',
    ].join('\n'),
  },
)

server.registerTool(
  'list_effects',
  {
    title: 'List fxshelf effects',
    description: `List every animation effect on the fxshelf shelf with its npm package, version, one-line blurb and docUrl. Call this first to discover what is available. Returns markdown + structured JSON. Example question it answers: "what effects does fxshelf have?"`,
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async () => {
    const lines = [
      `# fxshelf effects (${effects.length})`,
      '',
      ...effects.map(
        (e) =>
          `- **${e.id}** — ${e.title}（${e.npm}@${e.version}）\n  ${e.blurb}\n  docs: ${e.docUrl}`,
      ),
    ]
    const structured = {
      total: effects.length,
      generated_at: data.generatedAt,
      effects: effects.map(({ id, title, blurb, npm, version, docUrl }) => ({
        id,
        title,
        blurb,
        npm,
        version,
        docUrl,
      })),
    }
    return {
      content: [{ type: 'text' as const, text: lines.join('\n') }],
      structuredContent: structured,
    }
  },
)

const effectNameSchema = z
  .string()
  .describe(`Effect id (or npm package name), e.g. "starfield" or "@fxshelf/starfield". One of: ${effects.map((e) => e.id).join(', ')}`)

server.registerTool(
  'get_effect_docs',
  {
    title: 'Get effect documentation',
    description: `Fetch the full documentation for one fxshelf effect as markdown: overview, install, React and Vue usage examples, prop/API tables, and CDN notes. Use before writing code against a package. Args: effect — id like "starfield". Returns markdown text.`,
    inputSchema: z.object({ effect: effectNameSchema }).strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ effect: name }) => {
    const found = findEffect(name)
    if ('error' in found) {
      return { isError: true, content: [{ type: 'text' as const, text: found.error }] }
    }
    const e = found.effect
    const parts = [
      `# ${e.title} (${e.npm}@${e.version})`,
      '',
      `Docs site: ${e.docUrl}`,
      '',
      e.markdown.slice(0, CHARACTER_LIMIT),
    ]
    for (const extra of e.extraDocs) {
      parts.push('', `---`, '', `# ${extra.id}`, '', `Docs site: ${extra.docUrl}`, '', extra.markdown.slice(0, CHARACTER_LIMIT))
    }
    return { content: [{ type: 'text' as const, text: parts.join('\n') }] }
  },
)

server.registerTool(
  'get_effect_source',
  {
    title: 'Get copy-as-source code',
    description: `Return the actual source files of an fxshelf effect so they can be copied verbatim into the user's project (the "copy-as-source" workflow). Files are grouped: "core" (framework-agnostic engine + styles + entry, always needed), "react", "vue". Copy core + the group matching the user's framework into their project and fix relative imports. Args: effect id, groups (default ["core","react","vue"]), max_chars (default 60000). Returns markdown with fenced code blocks per file, path in the heading.`,
    inputSchema: z
      .object({
        effect: effectNameSchema,
        groups: z
          .array(z.enum(['core', 'react', 'vue']))
          .default(['core', 'react', 'vue'])
          .describe('Which source groups to return. Omit user-irrelevant frameworks to save context.'),
        max_chars: z
          .number()
          .int()
          .min(1_000)
          .max(400_000)
          .default(60_000)
          .describe('Truncate output at this many characters (default 60000).'),
      })
      .strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ effect: name, groups, max_chars }) => {
    const found = findEffect(name)
    if ('error' in found) {
      return { isError: true, content: [{ type: 'text' as const, text: found.error }] }
    }
    const unique = [...new Set(groups)]
    if (unique.length === 0) {
      return {
        isError: true,
        content: [
          {
            type: 'text' as const,
            text: 'groups must contain at least one of "core", "react", "vue" (core is always required for copy-as-source).',
          },
        ],
      }
    }
    const text = formatSource(found.effect, unique, max_chars)
    const fileCount = unique.reduce((n, g) => n + found.effect.source[g].length, 0)
    return {
      content: [{ type: 'text' as const, text }],
      structuredContent: {
        effect: found.effect.id,
        version: found.effect.version,
        groups: unique,
        file_count: fileCount,
        truncated: text.includes('⚠️ Output truncated'),
      },
    }
  },
)

server.registerTool(
  'get_cdn_snippet',
  {
    title: 'Get CDN <script> snippet',
    description: `Return a version-locked CDN <script> snippet (unpkg + jsDelivr URLs, React UMD prerequisites, stylesheet link if the package ships CSS, plus a full runnable HTML sample). Use for no-build usage in plain HTML. Args: effect id, max_chars. For Vue via CDN, docs explain SFC source copying.`,
    inputSchema: z
      .object({
        effect: effectNameSchema,
        max_chars: z
          .number()
          .int()
          .min(2_000)
          .max(100_000)
          .default(20_000)
          .describe('Max length of the embedded HTML sample (default 20000).'),
      })
      .strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ effect: name, max_chars }) => {
    const found = findEffect(name)
    if ('error' in found) {
      return { isError: true, content: [{ type: 'text' as const, text: found.error }] }
    }
    const { globalName, iifeFile, unpkg, jsdelivr, css } = found.effect.cdn
    return {
      content: [{ type: 'text' as const, text: formatCdn(found.effect, max_chars) }],
      structuredContent: {
        effect: found.effect.id,
        version: found.effect.version,
        cdn: { globalName, iifeFile, unpkg, jsdelivr, css },
      },
    }
  },
)

// —— Resources：文档与源码按 URI 直接读取 ——
server.registerResource(
  'effect-index',
  'fxshelf://effects',
  {
    title: 'fxshelf effect index',
    description: 'JSON list of all effects with npm name, version, docUrl.',
    mimeType: 'application/json',
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(
          effects.map(({ id, title, blurb, npm, version, docUrl }) => ({ id, title, blurb, npm, version, docUrl })),
          null,
          2,
        ),
      },
    ],
  }),
)

server.registerResource(
  'effect-docs',
  new ResourceTemplate('fxshelf://effects/{id}/docs', { list: undefined }),
  {
    title: 'Effect documentation',
    description: 'Full docs markdown for one effect (id from fxshelf://effects).',
    mimeType: 'text/markdown',
  },
  async (uri, variables) => {
    const found = findEffect(String(variables.id))
    if ('error' in found) throw new Error(found.error)
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: 'text/markdown',
          text: found.effect.markdown,
        },
      ],
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error(`fxshelf-mcp: serving ${effects.length} effects via stdio`)
}

main().catch((err) => {
  console.error('fxshelf-mcp failed to start:', err)
  process.exit(1)
})
