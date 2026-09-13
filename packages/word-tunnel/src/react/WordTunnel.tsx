'use client'

import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import {
  DEFAULTS,
  buildConvergeKeyframes,
  buildWords,
  wordCountForWidth,
  type TunnelWord,
} from '../core/keywords'
import '../core/styles.css'

export type WordTunnelProps = {
  /** 词条列表；不传则用内置搞笑默认词。 */
  words?: readonly string[]
  /** 固定词数；不传则按视口宽度自适应。 */
  count?: number
  /** 布局随机种子：同值可复现，换值换分布。默认 `20250913`。 */
  seed?: number
  /** CSS perspective，默认 900。 */
  perspective?: number
  /** 中心空洞半径，越小词越靠近灭点。默认 8。 */
  innerRadius?: number
  /** 外圈采样半径。默认 52。 */
  outerRadius?: number
  /** z 轴最短飞行距离，越大消隐越靠近中心。默认 480。 */
  travelMin?: number
  /** z 轴额外随机飞行距离。默认 560。 */
  travelRange?: number
  /** 淡入完成进度 0–100。默认 10。 */
  fadeIn?: number
  /** 开始淡出进度 0–100，越大越晚消失。默认 88。 */
  fadeOut?: number
  /** 文字颜色。 */
  color?: string
  /** 字号，默认 24px。 */
  fontSize?: number | string
  className?: string
  style?: CSSProperties
  children?: ReactNode
  ariaHidden?: boolean
}

export function WordTunnel({
  words,
  count,
  seed = DEFAULTS.seed,
  perspective = DEFAULTS.perspective,
  innerRadius = DEFAULTS.innerRadius,
  outerRadius = DEFAULTS.outerRadius,
  travelMin = DEFAULTS.travelMin,
  travelRange = DEFAULTS.travelRange,
  fadeIn = DEFAULTS.fadeIn,
  fadeOut = DEFAULTS.fadeOut,
  color,
  fontSize,
  className,
  style,
  children,
  ariaHidden = true,
}: WordTunnelProps) {
  const uid = useId().replace(/:/g, '')
  const animName = `fx-wt-converge-${uid}`

  const layout = useMemo(
    () => ({
      seed,
      words,
      innerRadius,
      outerRadius,
      travelMin,
      travelRange,
    }),
    [seed, words, innerRadius, outerRadius, travelMin, travelRange],
  )

  const [items, setItems] = useState<TunnelWord[]>(() =>
    buildWords({
      count: count ?? 80,
      ...layout,
    }),
  )

  useEffect(() => {
    function rebuild() {
      const nextCount = count ?? wordCountForWidth(window.innerWidth)
      setItems(buildWords({ count: nextCount, ...layout }))
    }

    rebuild()

    if (count != null) return

    let timer: ReturnType<typeof setTimeout> | undefined
    function onResize() {
      if (timer) clearTimeout(timer)
      timer = setTimeout(rebuild, 150)
    }

    window.addEventListener('resize', onResize)
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [count, layout])

  const keyframesCss = useMemo(
    () => buildConvergeKeyframes(animName, fadeIn, fadeOut),
    [animName, fadeIn, fadeOut],
  )

  const rootStyle: CSSProperties = {
    ...style,
    ['--fx-wt-perspective' as string]: `${perspective}px`,
    ['--fx-wt-anim' as string]: animName,
    ...(color ? { ['--fx-wt-color' as string]: color } : null),
    ...(fontSize != null
      ? {
          ['--fx-wt-font-size' as string]:
            typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        }
      : null),
  }

  return (
    <div className={['fx-wt', className].filter(Boolean).join(' ')} style={rootStyle}>
      <style>{keyframesCss}</style>
      <div className="fx-wt__stage" aria-hidden={ariaHidden}>
        <div className="fx-wt__space">
          {items.map((item, i) => (
            <span
              key={`${items.length}-${i}-${item.label}`}
              className="fx-wt__word"
              style={{
                ['--fx-wt-x' as string]: item.x,
                ['--fx-wt-y' as string]: item.y,
                ['--fx-wt-z0' as string]: `${item.z0}px`,
                ['--fx-wt-z1' as string]: `${item.z1}px`,
                ['--fx-wt-op' as string]: String(item.opacity),
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
      {children != null ? <div className="fx-wt__content">{children}</div> : null}
    </div>
  )
}

export default WordTunnel
