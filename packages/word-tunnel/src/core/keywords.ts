/**
 * 词云隧道 — 经典 3D 星空隧道布局
 *
 * xy：环外随机 + 最小间距拒绝采样
 * z：只沿深度飞，perspective 汇向灭点
 * 词数：1440→80、1920→120、2560→160
 */

export type TunnelWord = {
  label: string
  x: string
  y: string
  z0: number
  z1: number
  opacity: number
  duration: number
  delay: number
}

/** 默认搞笑词条（可被 props.words 覆盖） */
export const DEFAULT_WORDS = [
  '我本地是好的',
  '先上线再说',
  '这不是 bug',
  '是 feature',
  '需求又改了',
  '估计半小时',
  '今天不加班',
  '已读不回',
  '在吗急',
  '线上炸了',
  '回滚回滚',
  '能跑就行',
  'LGTM',
  '先 merge',
  '文档？不存在',
  '临时方案永久用',
  '谁写的破代码',
  '哦是我写的',
  '只有上帝懂了',
  '神秘空指针',
  '依赖地狱',
  '周五上线快乐',
  '产品说随便改改',
  '后端说前端的锅',
  '前端说后端的锅',
  '测过了吗',
  '没测但感觉没问题',
  '复制粘贴工程师',
  'Ctrl+C Ctrl+V',
  '热更新一下',
  '没事没事',
  '绝对没问题',
  '大概也许可能',
  '重构？下次一定',
  '注释写给鬼看的',
  'npm install 三小时',
  '冲突自己解决',
  '下班了吗',
  '有空帮看下',
  '又是一个小需求',
] as const

export const DEFAULTS = {
  seed: 20250913,
  perspective: 900,
  /** 中心空洞半径（越小词越靠近灭点） */
  innerRadius: 8,
  /** 外圈采样半径 */
  outerRadius: 52,
  /** z 轴最短飞行距离 */
  travelMin: 480,
  /** z 轴额外随机飞行距离 */
  travelRange: 560,
  /** 淡入完成进度 0–100 */
  fadeIn: 10,
  /** 开始淡出进度 0–100（越大越晚消失、越贴中心） */
  fadeOut: 88,
} as const

export type WordTunnelLayout = {
  innerRadius: number
  outerRadius: number
  travelMin: number
  travelRange: number
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Placed = { px: number; py: number; nearness: number; weight: number }

/** 1440→80、1920→120、2560→160；每约 480px 一档 +40 */
export function wordCountForWidth(width: number): number {
  const steps = Math.round((width - 1440) / 480)
  return Math.min(280, Math.max(40, 80 + steps * 40))
}

function baseMinDistance(
  count: number,
  innerRadius: number,
  outerRadius: number,
): number {
  const area =
    Math.PI * (outerRadius * 1.12) ** 2 - Math.PI * innerRadius ** 2
  return Math.min(13, Math.max(5.5, Math.sqrt(Math.max(area, 1) / count) * 0.92))
}

function tooClose(a: Placed, b: Placed, baseMin: number): boolean {
  const scale = 0.65 + 0.55 * ((a.nearness + b.nearness) / 2)
  const weight = (a.weight + b.weight) / 2
  const min = baseMin * scale * weight
  const dx = a.px - b.px
  const dy = a.py - b.py
  return dx * dx + dy * dy < min * min
}

function samplePoint(
  rnd: () => number,
  innerRadius: number,
  outerRadius: number,
): { px: number; py: number } {
  const span = Math.max(0.01, outerRadius - innerRadius)
  for (let tryN = 0; tryN < 32; tryN++) {
    const angle = rnd() * Math.PI * 2
    const r = innerRadius + Math.sqrt(rnd()) * span
    const px = Math.cos(angle) * r * 1.18
    const py = Math.sin(angle) * r * 0.9
    if (Math.hypot(px, py) >= innerRadius) return { px, py }
  }
  return { px: innerRadius * 1.2, py: 0 }
}

function labelWeight(label: string): number {
  const len = [...label].length
  return Math.min(1.35, Math.max(0.9, 0.85 + len * 0.035))
}

function clampPct(n: number): number {
  return Math.min(99, Math.max(1, Math.round(n)))
}

/** 生成可配置淡入淡出的 keyframes CSS */
export function buildConvergeKeyframes(
  name: string,
  fadeIn: number = DEFAULTS.fadeIn,
  fadeOut: number = DEFAULTS.fadeOut,
): string {
  let inn = clampPct(fadeIn)
  let out = clampPct(fadeOut)
  if (out <= inn) out = Math.min(99, inn + 1)

  return `@keyframes ${name} {
  0% {
    opacity: 0;
    transform: translate3d(
      calc(-50% + var(--fx-wt-x)),
      calc(-50% + var(--fx-wt-y)),
      var(--fx-wt-z0)
    );
  }
  ${inn}% {
    opacity: var(--fx-wt-op);
  }
  ${out}% {
    opacity: calc(var(--fx-wt-op) * 0.7);
  }
  100% {
    opacity: 0;
    transform: translate3d(
      calc(-50% + var(--fx-wt-x)),
      calc(-50% + var(--fx-wt-y)),
      var(--fx-wt-z1)
    );
  }
}`
}

export type BuildWordsOptions = {
  count?: number
  seed?: number
  words?: readonly string[]
  innerRadius?: number
  outerRadius?: number
  travelMin?: number
  travelRange?: number
}

export function buildWords(options: BuildWordsOptions = {}): TunnelWord[] {
  const words = options.words?.length ? options.words : DEFAULT_WORDS
  const count = options.count ?? 80
  const seed = options.seed ?? DEFAULTS.seed
  const innerRadius = options.innerRadius ?? DEFAULTS.innerRadius
  const outerRadius = Math.max(
    innerRadius + 1,
    options.outerRadius ?? DEFAULTS.outerRadius,
  )
  const travelMin = options.travelMin ?? DEFAULTS.travelMin
  const travelRange = Math.max(0, options.travelRange ?? DEFAULTS.travelRange)

  const rnd = mulberry32(seed + count * 997)
  const list: TunnelWord[] = []
  const placed: Placed[] = []
  const baseMin = baseMinDistance(count, innerRadius, outerRadius)

  for (let i = 0; i < count; i++) {
    const label = words[Math.floor(rnd() * words.length)]!
    const weight = labelWeight(label)

    const z0 = Math.round(-80 + rnd() * 280)
    const nearness = Math.min(1, Math.max(0, (z0 + 80) / 280))

    let px = 0
    let py = 0
    let ok = false

    for (let relax = 0; relax < 6 && !ok; relax++) {
      const minFactor = 1 - relax * 0.12
      const tries = 40 + relax * 20
      for (let t = 0; t < tries; t++) {
        const p = samplePoint(rnd, innerRadius, outerRadius)
        const candidate: Placed = { px: p.px, py: p.py, nearness, weight }
        if (
          placed.every((o) => !tooClose(candidate, o, baseMin * minFactor))
        ) {
          px = p.px
          py = p.py
          ok = true
          break
        }
      }
    }

    if (!ok) {
      const p = samplePoint(rnd, innerRadius, outerRadius)
      px = p.px
      py = p.py
    }

    placed.push({ px, py, nearness, weight })

    const travel = travelMin + rnd() * travelRange
    const z1 = Math.round(z0 - travel)
    const opacity =
      Math.round((0.18 + nearness * 0.72 + rnd() * 0.08) * 100) / 100
    const duration =
      Math.round((5.5 + (1 - nearness) * 6 + rnd() * 5) * 100) / 100
    const delay = Math.round(-rnd() * duration * 100) / 100

    list.push({
      label,
      x: `${Math.round(px * 100) / 100}vw`,
      y: `${Math.round(py * 100) / 100}vh`,
      z0,
      z1,
      opacity,
      duration,
      delay,
    })
  }

  return list
}
