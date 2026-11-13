// Browser (<script>) build only — host must load React UMD first.
import type * as ReactModule from 'react'

type ReactGlobal = typeof ReactModule

const globalReact = (globalThis as { React?: ReactGlobal }).React

if (!globalReact) {
  throw new Error(
    '[swarm-cursors] browser build: global "React" not found. ' +
      'Load a UMD build of React (react@18.3.x) before swarm-cursors.',
  )
}

export default globalReact
export const Fragment = globalReact.Fragment
export const createElement = globalReact.createElement
export const memo = globalReact.memo
export const useEffect = globalReact.useEffect
export const useRef = globalReact.useRef
export const useState = globalReact.useState
export const useCallback = globalReact.useCallback
