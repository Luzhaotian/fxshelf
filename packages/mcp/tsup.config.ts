import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node22',
  platform: 'node',
  clean: true,
  sourcemap: true,
  // JSON snapshot 内联进产物，发包后运行时零文件依赖
  noExternal: [/\.(json)$/],
})
