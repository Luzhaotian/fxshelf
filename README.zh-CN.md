# fxshelf

[English](./README.md) · [中文](./README.zh-CN.md)

面向 **React** / **Vue** 的可复制微动效包书架。  
浏览站点、按需安装 —— 也可以把源码直接拷进项目。不依赖 Framer Motion / GSAP。

| | |
|--|--|
| **站点 / 文档** | [luzhaotian.github.io/fxshelf](https://luzhaotian.github.io/fxshelf/) |
| **包作用域** | `@fxshelf/*` |
| **部署** | GitHub Actions → Pages（`main` 推送） |

## 包列表

| 包名 | 版本 | 说明 |
|------|------|------|
| [`@fxshelf/card-orbit`](https://www.npmjs.com/package/@fxshelf/card-orbit) | [`0.1.6`](./packages/card-orbit) | 路径约束的 3D 卡片轨道 —— 升起、弧线、飞出 |
| [`@fxshelf/glyph-rain`](https://www.npmjs.com/package/@fxshelf/glyph-rain) | [`0.1.1`](./packages/glyph-rain) | Matrix 风格字符雨 —— 光标搅动，可选内容照明 |
| [`@fxshelf/starfield`](./packages/starfield) | [`0.1.1`](./packages/starfield) | Canvas 2D 星空隧道 —— 透视飞近、闪烁与拖尾 |
| [`@fxshelf/button-kit`](./packages/button-kit) | [`0.1.0`](./packages/button-kit) | 按钮动效书架 —— 用 `variant` 字符串切换样式 |
| [`@fxshelf/word-tunnel`](./packages/word-tunnel) | [`0.1.0`](./packages/word-tunnel) | 3D 词云隧道 —— 文字朝灭点飞来 |

```bash
npm install @fxshelf/card-orbit
npm install @fxshelf/glyph-rain
npm install @fxshelf/starfield
npm install @fxshelf/button-kit
npm install @fxshelf/word-tunnel
```

每个包支持 **npm**、**CDN `<script>`**（React，经 unpkg / jsDelivr）、**复制 `src/core` + `react` / `vue` 源码**。详见 [站点文档](https://luzhaotian.github.io/fxshelf/docs)。

## 本地开发

```bash
npm install
npm run dev              # 文档站 → http://localhost:3001
npm run build            # 构建 @fxshelf/* 包
npm run build:site       # 静态导出 → apps/site/out
npm run build:site:pages # GitHub Pages 构建（basePath=/fxshelf）
npm run lint
npm run typecheck
```

```
packages/<id>/     可发布的 @fxshelf/<id>
apps/site/         Fumadocs + Next.js 静态导出
.github/workflows/ 站点部署到 Pages
```

## 提交规范

提交由 husky 拦截：

- **pre-commit** — 对暂存的 JS/TS/Vue 跑 oxlint
- **commit-msg** — commitlint（Conventional Commits）

格式：`type(scope?): 中文说明` — **subject 必须含中文**。

```bash
feat(starfield): 新增星空隧道动效包
fix(site): 修复路径演示页返回链接
docs: 更新 README 包列表
chore: 接入 husky 与 commitlint
```

允许的 type：`feat` · `fix` · `docs` · `style` · `refactor` · `perf` · `test` · `build` · `ci` · `chore` · `revert`

配置见 [`commitlint.config.js`](./commitlint.config.js)。

## 新增一个动效

1. 创建 `packages/<id>/`，`"name"` 设为 `@fxshelf/<id>`
2. 在 [`apps/site/lib/effects.ts`](./apps/site/lib/effects.ts) 追加条目
3. 添加 `apps/site/content/docs/effects/<id>.mdx`
4. 更新 [`apps/site/content/docs/effects/meta.json`](./apps/site/content/docs/effects/meta.json)
5. 如需，更新根目录 `package.json` 脚本（`build` / `typecheck` / `pack:check` / `lint`）以及 `apps/site` 依赖
6. 首页卡片会从 registry 自动带上

## 发布包

需要 npm 组织 **`fxshelf`**（scoped 包发布权限）。

```bash
npm whoami
cd packages/<id>
# 先改 package.json 里的 version，然后：
npm run pack:check
npm publish --access public
```

## License

MIT
