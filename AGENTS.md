# AGENTS.md — INTRX

Current work order: **`CODEX_HANDOFF_3.md`**. Read it before changing anything. Design source: the Figma file linked at the top of that handoff. Motion: **`MOTION_SYSTEM.md`**. Per-component lookup (Figma node, trigger, recipes): **`manifest/components.json`**.

## Repo in one minute
- Zero-build static site. `index.html` loads `css/`, `js/demo-runtime.js`, every `js/demos.*.js` registry file, then `js/app.js` (being split into `js/shell/*` in Handoff 3 Phase 3).
- A demo is one `INTRX.register({ id, title, cat, rootClass, tags, libs, desc, seen, hint, html, css, js, prompt })` object. All classes are prefixed with `rootClass`.
- Stage metadata (`designSize`, `stage`, `trigger`, `controls`, `a11y`, `tier`) lives in `js/meta.stage.js` once Phase 1 lands.

## Rules
- One handoff phase (or one remediation bucket) per PR, in the order of Handoff 3 §9.
- No bundler, no framework, no runtime dependencies in the site. Only `packages/intrx` may have npm dependencies.
- Demos never draw their own outer panel or replay/reset buttons; expose actions and list them in `controls`.
- Rendered thumbnail text ≥ 11px; neutral greys + one accent per demo (no decorative hues); reduced-motion branch required.
- Build what the v4 tile in Figma shows; the tile wins over older art and older demos.
- Never copy code or assets from reference sites; new components are original implementations.

## Verify before every PR
```bash
node tools/verify-registry.js
node tools/verify-stage.js            # from Phase 1
node tools/build-registry.js --check  # from Phase 2
node tools/verify-library.js http://127.0.0.1:4173
node tools/audit-stage-fit.js http://127.0.0.1:4173
node tools/verify-motion.js           # baseline mode until §5b is done, then --strict
```
