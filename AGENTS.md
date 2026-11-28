# AGENTS.md — INTRX

Current work order: **`docs/DECISIONS-2026-11-28.md`** (owner decisions) and the roadmap in
**`reports/INTRX aesthetic audit and roadmap.md`**. The previous 2,600-line instructions file is
archived at `docs/archive/AGENTS-v3-2026-11-28.md`; read it only for history. The fully verified
pre-upgrade state is git tag `v3-verified`.

## Owner rules (binding)
- Commit and push directly to `main`; do not open PRs.
- GitHub Actions stay **disabled** (account budget $0, "stop usage" on). Never enable or re-run
  workflows. Verify locally.
- Never activate the Pro launch flag, take payments or change the Pricing SOON state.
- Photo slots: real, licensed dark abstract images by human creators. **No procedural or
  AI-generated imagery.** Credits live in `assets/photo-credits.json`.
- Third-party code only from MIT/BSD/ISC/Apache-2.0/CC0/Unlicense sources, with notices in
  `THIRD_PARTY_NOTICES.md`. Never port React Bits, Aceternity, transitions.dev, Animate UI,
  21st.dev marketplace or paid tiers (see the decision record for the full list).

## Repo in one minute
- Zero-build static site. `index.html` loads `css/foundations.css`, `js/demo-runtime.js` and the
  plain scripts in `js/shell/`. The shell fetches `registry/index.json`, then lazily loads each
  demo module. Bump the `?v=` query in `index.html` when you change a shell file.
- A demo is one `INTRX.register({ id, title, cat, rootClass, tags, libs, desc, html, css, js, prompt })`
  object; every class is prefixed with `rootClass`. Stage metadata (`designSize`, `stage`, `trigger`,
  `controls`, `a11y`) lives in `js/meta.stage.js`. Source modules are listed in `js/registry-files.json`.
- `js/shell/stage.js` owns fit, `ctx`, the Dock and LiveTiles. `css/style.css` and `css/fonts.css`
  are legacy inputs; active shared styles are in `css/foundations.css`.
- `tools/build-registry.js` generates `registry/`, `r/`, `llms*.txt` and `js/export-data.js`. Never
  hand-edit generated files; regenerate after changing demos, metadata, tokens, runtime or exporter.
- Posters (`assets/posters/`) are static previews; refresh with `tools/build-posters.js` after
  changing compositions or Stage visuals.
- `packages/intrx` is the `@tanziro/intrx` CLI/MCP package (unpublished until the owner publishes).

## Design rules
- Figma v4 tiles are a **reference**, not a pixel oracle. Aim for the quality bar in the report.
- Product UI: neutral greys plus one accent. Effect categories may use the accent as a ramp of light.
- Rendered text ≥ 11px. Every demo needs a reduced-motion branch.
- Demos never draw their own outer panel or replay/reset buttons; expose actions via `controls`
  (at most three). Keep motion on the tokens in `MOTION_SYSTEM.md`.
- Use real, specific content instead of grey placeholder bars.

## Fast verification loop (run before each push)
```bash
node tools/verify-registry.js
node tools/verify-stage.js
node tools/build-registry.js --check
node tools/verify-motion.js --strict
node --test tools/runtime.test.js tools/shell.test.js
node tools/serve.js 4173   # then, with PLAYWRIGHT_MODULE pointing at an external Playwright:
node tools/verify-library.js http://127.0.0.1:4173
```
`tools/audit-stage-fit.js` is advisory after the Stage unfreeze. The ~330 per-family suites
(`tools/verify-*-ext*.js`, `verify-*-new*.js`, profilers and their fixtures) certify `v3-verified`;
they pin pixels and hashes and are expected to fail after visual changes. Do not treat them as
gates and do not create new frozen evidence archives.
