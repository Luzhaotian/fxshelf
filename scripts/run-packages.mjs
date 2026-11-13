#!/usr/bin/env node
/**
 * Run an npm script in every packages/* workspace (skips missing scripts).
 * Usage (repo root): node scripts/run-packages.mjs <script>
 */
import { spawnSync } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const packagesDir = path.join(root, 'packages')
const script = process.argv[2]

if (!script) {
  console.error('Usage: node scripts/run-packages.mjs <script>')
  process.exit(1)
}

const entries = await readdir(packagesDir, { withFileTypes: true })
const packageNames = []

for (const entry of entries) {
  if (!entry.isDirectory()) continue
  const pkgPath = path.join(packagesDir, entry.name, 'package.json')
  try {
    const pkg = JSON.parse(await readFile(pkgPath, 'utf8'))
    if (pkg.name) packageNames.push(pkg.name)
  } catch {
    // skip dirs without a readable package.json
  }
}

packageNames.sort()

for (const name of packageNames) {
  const result = spawnSync('npm', ['run', script, '-w', name, '--if-present'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
