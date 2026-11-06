# @fxshelf/mcp

[中文](./README.zh-CN.md)

MCP server for [fxshelf](https://github.com/Luzhaotian/fxshelf) — let AI assistants
(Claude Code, Cursor, any MCP client) discover the effect shelf, read docs, pull
copy-as-source code, and get version-locked CDN snippets.

All data (docs + source of every `@fxshelf/*` effect) is baked into the package at
build time. The server runs locally over **stdio**, needs **no API key and no network**.

## Effects covered

| Effect | npm |
|--------|-----|
| Card Orbit | `@fxshelf/card-orbit` |
| Glyph Rain | `@fxshelf/glyph-rain` |
| Starfield | `@fxshelf/starfield` |
| Button Kit | `@fxshelf/button-kit` |
| Word Tunnel | `@fxshelf/word-tunnel` |

## Setup

Add to your MCP client config (e.g. `~/.claude.json` → `mcpServers`, or Cursor
`mcp.json`):

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

Then ask your assistant things like:

- "Add a starfield background to my hero section" → it discovers the effect,
  reads docs, and installs or copies the source.
- "Show me the Vue source of word-tunnel"
- "Give me a no-build CDN example for card-orbit"

## Tools

| Tool | What it returns |
|------|-----------------|
| `list_effects` | Every effect: id, title, blurb, npm name, version, docs URL |
| `get_effect_docs` | Full docs markdown for one effect (install, React/Vue usage, API) |
| `get_effect_source` | Actual source files (`core` / `react` / `vue` groups) for copy-as-source, with paths |
| `get_cdn_snippet` | Version-locked `<script>` snippet (unpkg / jsDelivr, React UMD prereqs, CSS link, runnable HTML sample) |

Resources: `fxshelf://effects` (JSON index) and `fxshelf://effects/{id}/docs`
(markdown per effect).

## Development (in this repo)

```bash
npm run gen      # regenerate src/data/snapshot.json from monorepo sources
npm run build    # gen + tsup → dist/index.js
npm run typecheck
npm run inspector  # test with MCP Inspector
```

`scripts/gen-data.mjs` reads `apps/site/lib/effects.ts`, the site MDX docs and
each package's `src/`, so the snapshot always matches the shelf at release time.
**When you add or change an effect, just rebuild — the snapshot updates automatically.**

## License

MIT © Lu Zhaotian
