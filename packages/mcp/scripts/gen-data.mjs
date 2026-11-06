#!/usr/bin/env node
/**
 * 构建时数据快照生成器：扫描 fxshelf monorepo，把各动效包的
 * 元数据 / 站点 MDX 文档 / CDN 示例 / src 源码打包成
 * src/data/snapshot.json，供 MCP server 运行时直接 import（零网络依赖）。
 *
 * 用法（任意目录）：node packages/mcp/scripts/gen-data.mjs
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..', '..', '..')
const siteDocsDir = path.join(repoRoot, 'apps/site/content/docs/effects')
const registryFile = path.join(repoRoot, 'apps/site/lib/effects.ts')
const outFile = path.join(repoRoot, 'packages/mcp/src/data/snapshot.json')

const SITE_BASE = 'https://luzhaotian.github.io/fxshelf'
const SOURCE_EXTS = new Set(['.ts', '.tsx', '.vue', '.css'])

function fail(msg) {
  console.error(`✖ gen-data: ${msg}`)
  process.exit(1)
}

/** 解析 effects.ts 中的 EffectMeta 数组（每个 {} 对象单独提取字段）。 */
function parseRegistry(text) {
  const objects = text.match(/\{[^{}]*\}/g) ?? []
  const field = (block, key) => {
    const m = block.match(new RegExp(`${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`))
    if (!m) return null
    return m[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\')
  }
  const entries = []
  for (const block of objects) {
    const id = field(block, 'id')
    if (!id) continue
    entries.push({
      id,
      title: field(block, 'title') ?? id,
      blurb: field(block, 'blurb') ?? '',
      packageName: field(block, 'packageName'),
      docPath: field(block, 'docPath') ?? `/docs/effects/${id}`,
    })
  }
  return entries.filter((e) => e.packageName)
}

/** 去掉围栏代码块后，把 <XxxDemo /> 之类的 JSX 演示标签替换为文档站链接。 */
function cleanMdx(text, docUrl) {
  const lines = text.split('\n')
  let inFence = false
  const out = []
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    const m = !inFence && line.match(/^(\s*)<([A-Z][A-Za-z0-9]*)\s*\/>\s*$/)
    if (m) {
      out.push(`${m[1]}> 交互演示：${docUrl}`)
      continue
    }
    out.push(line)
  }
  return out.join('\n')
}

/** 收集源码文件；recursive=false 时只取目录直属文件。 */
async function collectSourceFiles(dir, prefix, recursive = true) {
  const files = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return files
  }
  entries.sort((a, b) => a.name.localeCompare(b.name))
  for (const ent of entries) {
    const abs = path.join(dir, ent.name)
    const rel = `${prefix}/${ent.name}`
    if (ent.isDirectory()) {
      if (recursive) files.push(...(await collectSourceFiles(abs, rel)))
    } else if (SOURCE_EXTS.has(path.extname(ent.name))) {
      files.push({ path: rel, content: await readFile(abs, 'utf8') })
    }
  }
  return files
}

async function readJson(abs) {
  return JSON.parse(await readFile(abs, 'utf8'))
}

async function buildEffect(entry) {
  const pkgDirName = entry.packageName.replace(/^@fxshelf\//, '')
  const pkgDir = path.join(repoRoot, 'packages', pkgDirName)
  let pkg
  try {
    pkg = await readJson(path.join(pkgDir, 'package.json'))
  } catch {
    fail(`effects.ts 引用了 ${entry.packageName}，但 packages/${pkgDirName} 不存在`)
  }

  // 站点 MDX 主文档
  const mainMdx = path.join(siteDocsDir, `${entry.id}.mdx`)
  let doc = ''
  try {
    doc = await readFile(mainMdx, 'utf8')
  } catch {
    fail(`缺少文档 ${entry.id}.mdx（${mainMdx}）`)
  }
  const docUrl = `${SITE_BASE}${entry.docPath}`

  // 附属文档，如 card-orbit-path.mdx
  const extras = []
  const allFiles = await readdir(siteDocsDir)
  for (const f of allFiles.sort()) {
    if (!f.endsWith('.mdx') || f === `${entry.id}.mdx`) continue
    if (!f.startsWith(`${entry.id}-`)) continue
    const slug = f.slice(0, -'.mdx'.length)
    const text = await readFile(path.join(siteDocsDir, f), 'utf8')
    extras.push({
      id: slug,
      docUrl: `${SITE_BASE}/docs/effects/${slug}`,
      markdown: cleanMdx(text, `${SITE_BASE}/docs/effects/${slug}`),
    })
  }

  // 源码（core 组额外带上 src/ 根下的入口 index.ts、vue-shim.d.ts 等，方便复制）
  const core = [
    ...(await collectSourceFiles(path.join(pkgDir, 'src'), 'src', false)),
    ...(await collectSourceFiles(path.join(pkgDir, 'src/core'), 'src/core')),
  ]
  const react = await collectSourceFiles(path.join(pkgDir, 'src/react'), 'src/react')
  const vue = await collectSourceFiles(path.join(pkgDir, 'src/vue'), 'src/vue')

  // CDN 信息
  let globalName = null
  try {
    const tsup = await readFile(path.join(pkgDir, 'tsup.config.ts'), 'utf8')
    globalName = tsup.match(/globalName:\s*'([^']+)'/)?.[1] ?? null
  } catch {
    /* 无 tsup 配置则视为无 IIFE */
  }
  const iifeFile = pkg.unpkg ? pkg.unpkg.replace(/^\.\//, '') : null
  const cssFile =
    pkg.exports && pkg.exports['./styles.css']
      ? String(pkg.exports['./styles.css']).replace(/^\.\//, '')
      : null

  let sampleHtml = null
  try {
    sampleHtml = await readFile(path.join(pkgDir, 'docs/CDN示例.html'), 'utf8')
  } catch {
    /* 可选 */
  }

  return {
    id: entry.id,
    title: entry.title,
    blurb: entry.blurb,
    npm: entry.packageName,
    version: pkg.version,
    description: pkg.description ?? '',
    keywords: pkg.keywords ?? [],
    docUrl,
    markdown: cleanMdx(doc, docUrl),
    extraDocs: extras,
    cdn: {
      globalName,
      iifeFile,
      unpkg: iifeFile ? `https://unpkg.com/${pkg.name}@${pkg.version}/${iifeFile}` : null,
      jsdelivr: iifeFile
        ? `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/${iifeFile}`
        : null,
      css: cssFile ? `https://unpkg.com/${pkg.name}@${pkg.version}/${cssFile}` : null,
      sampleHtml,
    },
    source: { core, react, vue },
  }
}

async function main() {
  const registryText = await readFile(registryFile, 'utf8')
  const entries = parseRegistry(registryText)
  if (entries.length === 0) fail('未能从 apps/site/lib/effects.ts 解析出任何 effect')

  const effects = []
  for (const entry of entries) effects.push(await buildEffect(entry))

  const snapshot = {
    generatedAt: new Date().toISOString(),
    siteBase: SITE_BASE,
    effects,
  }
  const json = JSON.stringify(snapshot, null, 1)
  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, json, 'utf8')
  console.log(
    `✓ gen-data: ${effects.length} effects → ${path.relative(repoRoot, outFile)} (${(json.length / 1024).toFixed(0)} KB)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
