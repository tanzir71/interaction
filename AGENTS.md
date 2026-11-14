# AGENTS.md — INTRX

Current work order: **`CODEX_HANDOFF_3.md`**. Read it before changing anything. Design source: the Figma file linked at the top of that handoff. Motion: **`MOTION_SYSTEM.md`**. Per-component lookup (Figma node, trigger, recipes): **`manifest/components.json`**.

## Repo in one minute
- Zero-build static site. `index.html` loads `css/`, `js/demo-runtime.js`, every `js/demos.*.js` registry file, then `js/app.js` (being split into `js/shell/*` in Handoff 3 Phase 3).
- A demo is one `INTRX.register({ id, title, cat, rootClass, tags, libs, desc, seen, hint, html, css, js, prompt })` object. All classes are prefixed with `rootClass`.
- Stage metadata (`designSize`, `stage`, `trigger`, `controls`, `a11y`, `tier`) lives in `js/meta.stage.js` once Phase 1 lands.

## Rules
- Work in the order of Handoff 3 §9. Per the owner's instruction on 15 Nov 2026,
  commit and push phases directly; do not open PRs.
- No bundler, no framework, no runtime dependencies in the site. Only `packages/intrx` may have npm dependencies.
- Demos never draw their own outer panel or replay/reset buttons; expose actions and list them in `controls`.
- Rendered thumbnail text ≥ 11px; neutral greys + one accent per demo (no decorative hues); reduced-motion branch required.
- Build what the v4 tile in Figma shows; the tile wins over older art and older demos.
- Never copy code or assets from reference sites; new components are original implementations.

## Verify before each phase commit
```bash
node tools/verify-registry.js
node tools/verify-stage.js            # from Phase 1
node tools/build-registry.js --check  # from Phase 2
node tools/verify-library.js http://127.0.0.1:4173
node tools/audit-stage-fit.js http://127.0.0.1:4173
node tools/verify-motion.js           # baseline mode until §5b is done, then --strict
```

## Stage migration (Phase 1)
- `js/shell/registry.js` supplies `INTRX.meta` and merges sidecar defaults beneath
  inline demo fields. `js/meta.stage.js` covers every published demo.
- `js/shell/stage.js` owns deterministic fit, `ctx`, dock actions and LiveTiles.
  `js/demo-runtime.js` freezes timers, frames and animations while suspended;
  cleanup also disconnects runtime-created observers.
- Existing chrome/control violations are enumerated in
  `tools/stage-baseline.json`. `verify-stage.js` rejects new violations;
  `--strict` requires the debt to be removed in Phase 4. Do not grow the baseline
  when adding or remediating a component. Root exceptions require a written
  reason in `tools/stage-allowlist.json`.
- Run `node --test tools/runtime.test.js` when changing lifecycle behavior.
- Run `node tools/verify-stage-runtime.js http://127.0.0.1:4173` for browser
  action, live-cap, touch and keyboard checks.

## Registry and agent tooling (Phase 2)
- `tools/build-registry.js` generates `registry/`, `r/`, both llms files and
  `js/export-data.js`. Do not hand-edit generated files. Regenerate after changes
  to demos, metadata, tokens, runtime or exporter.
- `js/shell/export.js` is the shared portable HTML exporter used by the site and
  registry builder. `tools/build-demo-assets.js` embeds portable photos/fonts.
- `packages/intrx` is `@tanziro/intrx` (the unscoped npm name was occupied).
  Run `npm ci --prefix packages/intrx` and `npm test --prefix packages/intrx`.
  Local CLI: `node packages/intrx/bin/intrx.js ... --registry ./registry`.
- Agent instructions are in `skills/intrx`; setup and contributor docs are in
  `docs/`. npm publication is separate from implementing and pushing this repo.
- CI validates generated output and the CLI/MCP handshake, then stages only
  static public files with `tools/prepare-site.js`.
