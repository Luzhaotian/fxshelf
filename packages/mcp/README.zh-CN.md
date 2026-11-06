# @fxshelf/mcp

[English](./README.md)

fxshelf 的 MCP server —— 让 AI 助手（Claude Code、Cursor 或任何 MCP 客户端）
发现书架上的动效、阅读文档、获取可复制源码与锁定版本的 CDN 片段。

所有数据（各 `@fxshelf/*` 动效的文档 + 源码）在构建时内嵌进包内。server 本地以
**stdio** 运行，**无需 API key，无需联网**。

## 覆盖的动效

| 动效 | npm |
|------|-----|
| Card Orbit | `@fxshelf/card-orbit` |
| Glyph Rain | `@fxshelf/glyph-rain` |
| Starfield | `@fxshelf/starfield` |
| Button Kit | `@fxshelf/button-kit` |
| Word Tunnel | `@fxshelf/word-tunnel` |

## 配置

写入 MCP 客户端配置（如 `~/.claude.json` 的 `mcpServers`，或 Cursor 的 `mcp.json`）：

```json
{
  "mcpServers": {
    "fxshelf": {
      "command": "npx",
      "args": ["-y", "@fxshelf/mcp"]
    }
  }
}
```

然后直接对 AI 助手说：

- 「给我的 hero 区加一个星空隧道背景」→ 它会发现动效、读文档、安装或复制源码
- 「把 word-tunnel 的 Vue 源码给我」
- 「给我一个 card-orbit 免构建 CDN 示例」

## 工具

| 工具 | 返回内容 |
|------|----------|
| `ping` | 连通性检查：ok 标志、服务名/版本、动效数量、快照生成时间、服务器时间（可选回显） |
| `list_effects` | 全部动效：id、标题、简介、npm 包名、版本、文档链接 |
| `get_effect_docs` | 单个动效的完整文档 Markdown（安装、React/Vue 用法、API） |
| `get_effect_source` | 真实源码文件（`core` / `react` / `vue` 三组），带路径，可直接复制 |
| `get_cdn_snippet` | 锁定版本的 `<script>` 片段（unpkg / jsDelivr、React UMD 前置、CSS 链接、可运行 HTML 示例） |

Resources：`fxshelf://effects`（JSON 索引）、`fxshelf://effects/{id}/docs`（单包文档）。

## 开发（本仓库内）

```bash
npm run gen        # 从 monorepo 各包重新生成 src/data/snapshot.json
npm run build      # gen + tsup → dist/index.js
npm run typecheck
npm run inspector  # 用 MCP Inspector 调试
```

`scripts/gen-data.mjs` 读取 `apps/site/lib/effects.ts`、站点 MDX 文档与各包 `src/`，
保证快照与发布时的书架一致。**新增或修改动效后重新构建即可，快照自动更新。**

## License

MIT © Lu Zhaotian
