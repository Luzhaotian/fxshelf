#!/usr/bin/env node
/**
 * Scan packages/*, compare with npm registry, interactively publish new or updated packages.
 * Design: docs/superpowers/specs/2026-09-13-publish-packages-design.md
 *
 * Usage (repo root): npm run publish:packages
 */
import { spawn, spawnSync } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const packagesDir = path.join(root, 'packages')

function log(msg = '') {
  console.log(msg)
}

function fail(msg) {
  console.error(`\n✖ ${msg}`)
  process.exit(1)
}

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

function run(command, args, { cwd = root, inherit = true } = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      stdio: inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'],
      shell: false,
      env: process.env,
    })
    let stdout = ''
    let stderr = ''
    if (!inherit) {
      child.stdout?.on('data', (chunk) => {
        stdout += chunk
      })
      child.stderr?.on('data', (chunk) => {
        stderr += chunk
      })
    }
    child.on('close', (code) => {
      resolve({ code: code ?? 1, stdout, stderr })
    })
  })
}

function runCapture(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    env: process.env,
  })
  return {
    code: result.status ?? 1,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
  }
}

async function ensureLogin() {
  log('→ 检查 npm 登录状态…')
  let who = runCapture('npm', ['whoami'])
  if (who.code === 0 && who.stdout) {
    log(`✓ 已登录：${who.stdout}`)
    return who.stdout
  }

  log('未登录或 token 失效。')
  const go = await ask('现在执行 npm login？[y/N] ')
  if (go.toLowerCase() !== 'y') {
    fail('需要登录后才能发布。请先 npm login，再重跑本脚本。')
  }

  const login = await run('npm', ['login'])
  if (login.code !== 0) {
    fail('npm login 失败。请手动登录后再试。')
  }

  who = runCapture('npm', ['whoami'])
  if (who.code !== 0 || !who.stdout) {
    fail('登录后仍无法 whoami，请检查凭证 / 2FA。')
  }
  log(`✓ 已登录：${who.stdout}`)
  return who.stdout
}

async function listLocalPackages() {
  const entries = await readdir(packagesDir, { withFileTypes: true })
  const pkgs = []
  for (const ent of entries) {
    if (!ent.isDirectory()) continue
    const pkgPath = path.join(packagesDir, ent.name, 'package.json')
    let raw
    try {
      raw = await readFile(pkgPath, 'utf8')
    } catch {
      continue
    }
    const pkg = JSON.parse(raw)
    if (pkg.private) {
      log(`· 跳过 private：${ent.name}`)
      continue
    }
    if (!pkg.name || !pkg.version) {
      log(`· 跳过无效 package.json：${ent.name}`)
      continue
    }
    pkgs.push({
      dir: ent.name,
      name: pkg.name,
      version: pkg.version,
      pkgPath,
    })
  }
  return pkgs.sort((a, b) => a.name.localeCompare(b.name))
}

function npmViewVersion(name) {
  const result = runCapture('npm', ['view', name, 'version', '--json'])
  if (result.code === 0 && result.stdout) {
    try {
      const parsed = JSON.parse(result.stdout)
      return { ok: true, version: typeof parsed === 'string' ? parsed : String(parsed) }
    } catch {
      return { ok: true, version: result.stdout.replace(/^"|"$/g, '') }
    }
  }
  const err = `${result.stderr}\n${result.stdout}`
  if (/E404|404 Not Found|not found/i.test(err)) {
    return { ok: false, missing: true }
  }
  return { ok: false, missing: false, error: err.trim() || `npm view failed (${result.code})` }
}

async function planPublishes(locals) {
  const plan = []
  for (const pkg of locals) {
    process.stdout.write(`· 查询 ${pkg.name} … `)
    const remote = npmViewVersion(pkg.name)
    if (remote.ok) {
      if (remote.version === pkg.version) {
        log(`已是最新 ${pkg.version}`)
        plan.push({ ...pkg, action: 'skip', remote: remote.version })
      } else {
        log(`${remote.version} → ${pkg.version}（更新）`)
        plan.push({ ...pkg, action: 'update', remote: remote.version })
      }
      continue
    }
    if (remote.missing) {
      log(`registry 无此包 → 首次发布 ${pkg.version}`)
      plan.push({ ...pkg, action: 'new', remote: null })
      continue
    }
    log('查询失败')
    const choice = await ask(
      `无法查询 ${pkg.name}：\n${remote.error}\n[r]重试 / [s]跳过 / [a]中止？ `,
    )
    const c = choice.toLowerCase()
    if (c === 'a') fail('已中止。')
    if (c === 'r') {
      process.stdout.write(`· 重试 ${pkg.name} … `)
      const again = npmViewVersion(pkg.name)
      if (again.ok) {
        if (again.version === pkg.version) {
          log(`已是最新 ${pkg.version}`)
          plan.push({ ...pkg, action: 'skip', remote: again.version })
        } else {
          log(`${again.version} → ${pkg.version}（更新）`)
          plan.push({ ...pkg, action: 'update', remote: again.version })
        }
      } else if (again.missing) {
        log(`registry 无此包 → 首次发布 ${pkg.version}`)
        plan.push({ ...pkg, action: 'new', remote: null })
      } else {
        log(`仍失败，跳过：${again.error}`)
        plan.push({ ...pkg, action: 'error', error: again.error })
      }
      continue
    }
    plan.push({ ...pkg, action: 'error', error: remote.error })
  }
  return plan
}

async function publishOne(pkg) {
  log(`\n── ${pkg.name}@${pkg.version}（${pkg.action === 'new' ? '新包' : '更新'}）──`)
  log('→ pack:check …')
  let check = await run('npm', ['run', 'pack:check', '-w', pkg.name])
  if (check.code !== 0) {
    return { ok: false, step: 'pack:check' }
  }
  log('→ npm publish --access public …')
  let pub = await run('npm', ['publish', '-w', pkg.name, '--access', 'public'])
  if (pub.code !== 0) {
    return { ok: false, step: 'publish' }
  }
  return { ok: true }
}

async function publishWithRetry(pkg) {
  for (;;) {
    const result = await publishOne(pkg)
    if (result.ok) {
      log(`✓ 已发布 ${pkg.name}@${pkg.version}`)
      return 'ok'
    }
    const choice = await ask(
      `\n${pkg.name} 在 ${result.step} 失败。\n若是 OTP/2FA，请在浏览器完成认证后重试。\n[r]重试 / [s]跳过 / [a]中止？ `,
    )
    const c = choice.toLowerCase()
    if (c === 'a') return 'abort'
    if (c === 's') {
      log(`↷ 已跳过 ${pkg.name}`)
      return 'skip'
    }
    log('重新尝试…')
  }
}

async function main() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    fail('本脚本需要交互终端（登录 / 确认 / OTP）。请在本地终端运行。')
  }

  log('fxshelf · publish:packages\n')
  await ensureLogin()

  log('\n→ 扫描 packages/ …')
  const locals = await listLocalPackages()
  if (locals.length === 0) fail('未找到可发布包。')

  log('\n→ 对比 npm registry …')
  const plan = await planPublishes(locals)
  const todo = plan.filter((p) => p.action === 'new' || p.action === 'update')
  const skipped = plan.filter((p) => p.action === 'skip')
  const errored = plan.filter((p) => p.action === 'error')

  log('\n======== 待发布 ========')
  if (todo.length === 0) {
    log('（无）')
  } else {
    for (const p of todo) {
      const tag = p.action === 'new' ? '新包' : '更新'
      const from = p.remote ? `${p.remote} → ` : ''
      log(`  [${tag}] ${p.name}  ${from}${p.version}`)
    }
  }
  if (skipped.length) {
    log('\n已对齐（跳过）：')
    for (const p of skipped) log(`  ${p.name}@${p.version}`)
  }
  if (errored.length) {
    log('\n查询失败（未列入发布）：')
    for (const p of errored) log(`  ${p.name}: ${p.error}`)
  }

  if (todo.length === 0) {
    log('\n没有需要发布的包。')
    if (errored.length) process.exit(1)
    process.exit(0)
  }

  const confirm = await ask('\n确认发布以上包？[y/N] ')
  if (confirm.toLowerCase() !== 'y') {
    log('已取消。')
    process.exit(0)
  }

  const okList = []
  const skipList = []
  for (const pkg of todo) {
    const status = await publishWithRetry(pkg)
    if (status === 'abort') {
      log('\n已中止后续发布。')
      break
    }
    if (status === 'ok') okList.push(pkg)
    else skipList.push(pkg)
  }

  log('\n======== 汇总 ========')
  log(`成功：${okList.length}`)
  for (const p of okList) log(`  ✓ ${p.name}@${p.version}`)
  log(`跳过：${skipList.length}`)
  for (const p of skipList) log(`  ↷ ${p.name}@${p.version}`)
  if (okList.length === 0 && todo.length > 0) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
