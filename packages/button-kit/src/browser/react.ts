// Browser (<script>) build only.
import type * as ReactModule from 'react'

type ReactGlobal = typeof ReactModule

const globalReact = (globalThis as { React?: ReactGlobal }).React

if (!globalReact) {
  throw new Error(
    '[button-kit] browser build: global "React" not found. ' +
      'Load a UMD build of React (react@18.3.x) before button-kit.',
  )
}

export const Fragment = globalReact.Fragment
export const createElement = globalReact.createElement
