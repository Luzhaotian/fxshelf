import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

// GitHub project Pages: https://<user>.github.io/<repo>/
// Repo should be named `fxshelf` so basePath is `/fxshelf`.
// Override with BASE_PATH if needed.
const basePath =
  process.env.BASE_PATH?.replace(/\/$/, '') ||
  (process.env.GITHUB_PAGES === 'true' ? '/fxshelf' : '')

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  transpilePackages: [
    '@fxshelf/button-kit',
    '@fxshelf/card-orbit',
    '@fxshelf/glyph-rain',
    '@fxshelf/starfield',
    '@fxshelf/word-tunnel',
  ],
  turbopack: {
    resolveAlias: {
      '@fxshelf/button-kit': '../../packages/button-kit/src/index.ts',
      '@fxshelf/button-kit/styles.css': '../../packages/button-kit/src/core/styles.css',
      '@fxshelf/card-orbit': '../../packages/card-orbit/src/index.ts',
      '@fxshelf/card-orbit/styles.css': '../../packages/card-orbit/src/core/styles.css',
      '@fxshelf/glyph-rain': '../../packages/glyph-rain/src/index.ts',
      '@fxshelf/starfield': '../../packages/starfield/src/index.ts',
      '@fxshelf/word-tunnel': '../../packages/word-tunnel/src/index.ts',
      '@fxshelf/word-tunnel/styles.css': '../../packages/word-tunnel/src/core/styles.css',
    },
  },
}

export default withMDX(config)
