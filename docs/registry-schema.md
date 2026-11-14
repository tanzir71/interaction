# Registry schema

`registry/index.json` lists component metadata without source payloads. Category
groups and live counts are in `registry/categories.json`. Full items are in
`registry/c/<id>.json` and use `registry/schema.json`.

Each item has its ID, title, category/group, trigger, tags, use cases, tier, stage
geometry, accessibility, libraries, portable files, HTML/CSS/JS parts, prompt,
notes, related IDs, source credits and version. Pro items expose `locked: true`,
an empty files array and null parts; prompts remain available.

`registry/tokens.json` provides CSS, JSON tokens and a Tailwind extension.
`registry/stage-contract.json` provides sizes and contributor rules.
`r/<id>.json` is a shadcn registry block with the portable HTML as a file.

Regenerate with `node tools/build-registry.js`. CI runs the same command with
`--check` and fails on changed or orphaned generated artifacts.
