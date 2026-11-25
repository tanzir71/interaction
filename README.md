# INTRX — The Interaction Library

Native web interactions with live previews, portable HTML and prompts for your
agent. The site uses plain HTML, CSS and JavaScript with no build step or runtime
package dependencies.

- [Live library](https://tanzir71.github.io/interaction/)
- [Agent-readable index](https://tanzir71.github.io/interaction/llms.txt)
- [Public registry](https://tanzir71.github.io/interaction/registry/index.json)

Handoff 3 is in progress. The [implementation ledger](IMPLEMENTATION_PROGRESS.md)
records completed phases, verification evidence and remaining design gates.
The [generated catalog](registry/index.json) is the source of truth for current
component counts. The supplied v4 design covers 520.

## Run locally

```bash
node tools/serve.js 4173
```

Open [localhost:4173](http://127.0.0.1:4173). This dependency-free static server
compresses text assets. Any other static server also works.

## Browse and copy

Home features selected components. Library pages offer grouped categories,
gesture and stack filters, sorting, grid/row density and batches of twelve.
Open a tile's caption to visit its detail page. Back restores filters, batches
and scroll position.

Detail pages include a full preview, replay, animation speed, stage theme,
viewport widths and fullscreen. Source tabs show a complete single-file document,
individual HTML/CSS/JS parts and an LLM prompt. Copy actions export the full source,
including portable fonts and imagery. React ports are planned.
Collapsed source cards use generated previews of the first eighteen displayed
lines. Expand and Copy load the complete document, with preparation feedback
while portable assets are loaded.

Press `⌘K` / `Ctrl+K` for fuzzy search. Arrow keys select a result, Enter opens it,
Escape closes the palette, and `⌘C` / `Ctrl+C` and `⌘P` / `Ctrl+P` copy code or a
prompt. On touch screens, hover and drag previews require tap-to-play.

## Architecture

```text
index.html                static entry and ordered shell scripts
css/foundations.css       semantic tokens, shared kit, stages and shell layouts
css/style.css             frozen v1 reference for preserved component fixtures
css/fonts.css             locally hosted shell and demo fonts
js/demo-runtime.js        timers, frames, cleanup, suspension and speed
js/shell/                 registry, exporter, stages, router, palette and UI
js/shell/views/           home, library, detail, docs and agent views
js/registry-files.json    ordered demo-source manifest for Node tooling
js/demos.*.js             self-contained registered demo definitions
js/meta.stage.js          declared geometry, controls, gestures and accessibility
js/demo-assets.js         portable imagery/fonts, loaded on demand
registry/                 generated catalog, complete items, schema and tokens
r/                        generated shadcn registry items
assets/posters/           native static frames for search and related results
packages/intrx/           CLI/MCP package; the only npm dependencies
```

The shell fetches the lightweight catalog, then loads source modules on demand.
All published demos run without runtime libraries. At most six desktop previews or one
touch preview runs at once. Demos are isolated by class prefixes and receive the
shared [stage context](docs/stage-contract.md). Hash routes work on static hosts;
legacy component/category links redirect to their current routes.

## Agent tools

The CLI/MCP package is implemented as `@tanziro/intrx`; npm publication is pending.
These local commands work now:

```bash
npm ci --prefix packages/intrx
node packages/intrx/bin/intrx.js search "elastic tabs" --registry ./registry
node packages/intrx/bin/intrx.js add elastic-tabs --registry ./registry
node packages/intrx/bin/intrx.js mcp --registry ./registry
```

See [MCP setup](docs/mcp-setup.md), [CLI usage](docs/cli.md) and the
[agent skill](skills/intrx/SKILL.md). The default registry client retries GitHub
Pages if the Vercel mirror is unavailable.

## Verify and maintain

```bash
node tools/verify-registry.js
node tools/verify-stage.js
node tools/build-registry.js --check
node tools/verify-motion.js
node --test tools/runtime.test.js tools/shell.test.js
npm test --prefix packages/intrx
```

With the local server running and Playwright available as a development tool:

```bash
node tools/verify-library.js http://127.0.0.1:4173
node tools/verify-stage-runtime.js http://127.0.0.1:4173
node tools/verify-aesthetic.js http://127.0.0.1:4173
node tools/verify-exemplars.js http://127.0.0.1:4173
node tools/audit-stage-fit.js http://127.0.0.1:4173
```

`PLAYWRIGHT_MODULE` may point to an existing Playwright installation and
`CHROME_PATH` to Chromium. Browser reports and screenshots go to ignored
`.artifacts/`. Stage and motion baseline modes reject regressions while the
existing demos undergo Phase 4 remediation; the final strict and rendered-fit
gates remain required.

After editing demos, metadata, tokens, runtime or exporter, run
`node tools/build-registry.js`. After changing photos or fonts, first regenerate
`node tools/build-demo-assets.js`. Refresh native search previews with
`node tools/build-posters.js http://127.0.0.1:4173` after composition changes.
Generated files must pass `--check` before committing.
Poster generation accepts `--ids=elastic-tabs,toast-stack` for a focused refresh.
The fit audit reports documented Figma size exceptions for sparse controls;
all other rendered gates remain enforced.

## Add a pattern

Register a unique, prefixed demo in a `js/demos.*.js` file. Add new source files to
`js/registry-files.json`, declare stage metadata in `js/meta.stage.js`, and follow
the [stage contract](docs/stage-contract.md), [motion system](MOTION_SYSTEM.md) and
current [work order](CODEX_HANDOFF_3.md). Expose replay/reset actions through the
shared dock, use readable thumbnail text and provide reduced-motion behavior.
Regenerate the registry and run the checks above.

## Hosting and licence

GitHub Actions is disabled at the owner's request. Run verification locally and
commit/push directly; keep workflows and branch publishing disabled. The stored
Pages workflow describes the static publishing setup. The site works under a
path prefix and requires no backend.

MIT. Third-party font and image licences and source acknowledgements are in
[credits](docs/license-credits.md), [asset notes](ASSET_ART_DIRECTION.md),
[DRAMS mapping](DRAMS_IMPLEMENTATION.md) and [showcase sources](SHOWCASE_SOURCES.md).
