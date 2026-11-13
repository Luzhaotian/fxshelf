import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsup'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
        '.jsx': 'jsx',
      }
    },
  },
  {
    entry: { 'swarm-cursors.iife': 'src/index.ts' },
    format: ['iife'],
    globalName: 'SwarmCursors',
    sourcemap: true,
    clean: false,
    outExtension: () => ({ js: '.js' }),
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
        '.jsx': 'jsx',
      }
      options.alias = {
        react: join(root, 'src/browser/react.ts'),
        'react/jsx-runtime': join(root, 'src/browser/jsx-runtime.ts'),
      }
    },
  },
])
