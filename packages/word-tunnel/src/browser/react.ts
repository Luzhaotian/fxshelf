import type * as ReactModule from 'react'

type ReactGlobal = typeof ReactModule

const globalReact = (globalThis as { React?: ReactGlobal }).React

if (!globalReact) {
  throw new Error(
    '[word-tunnel] browser build: global "React" not found. ' +
      'Load a UMD build of React (react@18.3.x) before word-tunnel.',
  )
}

export const Fragment = globalReact.Fragment
export const createElement = globalReact.createElement
export const useEffect = globalReact.useEffect
export const useState = globalReact.useState
export const useId = globalReact.useId
export const useMemo = globalReact.useMemo
