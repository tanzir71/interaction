# Registry schema

`registry/index.json` lists component metadata without source payloads. Category
groups and live counts are in `registry/categories.json`. Full items are in
`registry/c/<id>.json` and use `registry/schema.json`.

Catalog items also declare a content-hashed source `module`, `assetBundle` and
`exportBundle`, plus `assetRefs` mapping portable asset names to local preview
paths. The browser uses local files for previews and the versioned bundles for
embedded portable exports. These fields do not introduce runtime dependencies.
`sourcePreview` points to a small generated `registry/p/<id>.json` containing the
actual first 18 displayed lines and the complete source's line count. Copy and
Expand load the complete portable document; locked entries contain no preview
source. Previews are versioned and generated alongside complete registry items.

Hero entries may include `thumbDesignSize`, paired with `thumb: 'hero'`. This
declares the compact preview plane; `designSize` still describes the full
composition. The catalog, complete component and MCP response preserve both.
`thumbDesignSize: 'bleed'` uses the full stage for native artwork while retaining
the separate full composition's geometry.
Standalone HTML always mounts the full composition, including criteria or
workflow panels omitted from the hero.

Each item has its ID, title, category/group, trigger, tags, use cases, tier, stage
geometry, accessibility, libraries, portable files, HTML/CSS/JS parts, prompt,
notes, related IDs, source credits and version. Pro items expose `locked: true`,
an empty files array and null parts; prompts remain available.

`registry/tokens.json` provides CSS, JSON tokens and a Tailwind extension.
`registry/stage-contract.json` provides sizes and contributor rules.
`r/<id>.json` is a shadcn registry block with the portable HTML as a file.

Regenerate with `node tools/build-registry.js`. CI runs the same command with
`--check` and fails on changed or orphaned generated artifacts.
