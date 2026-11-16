# AGENTS.md — INTRX

Current work order: **`CODEX_HANDOFF_3.md`**. Read it before changing anything. Design source: the Figma file linked at the top of that handoff. Motion: **`MOTION_SYSTEM.md`**. Per-component lookup (Figma node, trigger, recipes): **`INTRX-handover/manifest/components.json`**.

## Repo in one minute
- Zero-build static site. `index.html` loads `css/`, `js/demo-runtime.js` and the plain scripts in `js/shell/`. The shell fetches `registry/index.json`, then lazily loads each demo's module and dependencies.
- A demo is one `INTRX.register({ id, title, cat, rootClass, tags, libs, desc, seen, hint, html, css, js, prompt })` object. All classes are prefixed with `rootClass`.
- Stage metadata (`designSize`, `stage`, `trigger`, `controls`, `a11y`, `tier`) lives in `js/meta.stage.js`. `js/registry-files.json` is the ordered source-module manifest used by Node tooling; add new modules there.
- A `thumb: 'hero'` demo may declare `thumbDesignSize` for its compact plane.
  `designSize` remains the complete composition used by detail and exports.

## Rules
- Work in the order of Handoff 3 §9. Per the owner's instruction on 15 Nov 2026,
  commit and push phases directly; do not open PRs.
- No bundler, no framework, no runtime dependencies in the site. Only `packages/intrx` may have npm dependencies.
- Demos never draw their own outer panel or replay/reset buttons; expose actions and list them in `controls`.
- Rendered thumbnail text ≥ 11px; neutral greys + one accent per demo (no decorative hues); reduced-motion branch required.
- Build what the v4 tile in Figma shows; the tile wins over older art and older demos.
- Owner clarification, 15 Nov 2026: sparse controls keep the exact Figma size
  when it conflicts with the 12% fill heuristic. Document each exception and its
  reference geometry in `tools/stage-fit-allowlist.json`. This changes only the
  low-fill gate; overflow, horizontal scroll and text-size gates still apply.
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
  cleanup also disconnects runtime-created observers. Full previews pause
  offscreen through a separate viewport hold that preserves caller pauses;
  LiveTiles alone owns thumbnail visibility.
- Existing chrome/control violations are enumerated in
  `tools/stage-baseline.json`. `verify-stage.js` rejects new violations;
  `--strict` requires the debt to be removed in Phase 4. Do not grow the baseline
  when adding or remediating a component. Root exceptions require a written
  reason in `tools/stage-allowlist.json`.
- Run `node --test tools/runtime.test.js tools/shell.test.js` when changing lifecycle or shell behavior.
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
  static public files with `tools/prepare-site.js`. GitHub Pages uses the custom
  workflow publishing source; branch publishing must stay disabled.

## Routed shell (Phase 3)
- Run `node tools/serve.js 4173` for the gzip-enabled local static server.
- Views live in `js/shell/views/`; router, palette and shared UI are separate
  plain scripts. Preserve route scroll/filter/batch state on Back navigation.
- `registry/index.json` supplies catalog metadata without eagerly booting demos.
  Module URLs carry a content hash; regenerate after changing a demo module.
- `assets/posters/` contains native static previews used by palette and related
  results. Refresh with `node tools/build-posters.js http://127.0.0.1:4173`
  after changing demo compositions. Never use a Figma screenshot as tile art.
- `assets/demo-assets.json` maps portable names to original local assets.
  Previews use their local paths; copy/export loads the content-hashed portable
  bundles declared in the generated catalog. Regenerate assets before registry.
- `node tools/verify-exemplars.js http://127.0.0.1:4173` covers the remediated
  control set. Keep its behavior and optical-size checks current as it grows.
- `node tools/verify-forms.js http://127.0.0.1:4173` covers native form behavior,
  hero/full sizing, keyboard input, reduced motion and portable form exports.
- `node tools/verify-layout.js http://127.0.0.1:4173` covers layout drag/snap,
  menus, reflow, navigation, touch, interruption, geometry and portable exports.
- `node tools/verify-layout-controls.js http://127.0.0.1:4173` covers the v4
  inspector, popover, spotlight, window/dock, accordion, dialog, directional
  fill, local page transitions and marquee, including offline and compact views.
- `node tools/verify-layout-photos.js http://127.0.0.1:4173` covers masonry,
  image-table previews, masked captions, shared expansion and inertial dragging;
  it checks native touch, exact photo slots, attribution and offline resolution.
- Add verified photo provenance and both file hashes to `assets/photo-credits.json`.
  Portable `photo-*` assets map to the 800px file in `assets/demo-assets.json`.
  The builder derives `photoCredits` and `fullAssetRefs`; detail uses 1600px
  paths while thumbnails and exports use 800px. Keep licence comments in exports.
- `node tools/verify-navigation.js http://127.0.0.1:4173` covers all 13 v4
  navigation demos, native focus/keys, interrupted transitions, scroll lifecycle,
  exact asset slots, portable source and 390px/375px/360px full typography.
- `node tools/verify-loaders.js http://127.0.0.1:4173` covers the ten v4
  loaders, original progress/geometry models, state cancellation, native input,
  exact SVG slots, runtime suspension, compact typography and offline exports.
- `node tools/verify-data.js http://127.0.0.1:4173` covers all six v4 data
  demos, original datasets, changed-digit fades, interrupted ranking, shared
  tooltips, native input, exact SVG slots, compact text and offline exports.
- `node tools/verify-maps.js http://127.0.0.1:4173` covers all six v4 map
  previews and complete original fields, parcels, globe points, routes, sites
  and contours. It checks native keyboard/touch, replay interruption, virtual
  clocks, refresh-rate independence, adversarial contour equivalence, exact SVG
  slots, compact typography and complete offline exports.
- `node tools/verify-agents.js http://127.0.0.1:4173` covers the remediated
  deploy pipeline, workflow graph, streaming response and thinking drawer.
  It checks original operational fixtures, scaled dragging, cycle rejection,
  native keys/copy, word and check motion, interruption, completion holds,
  caller/offscreen pauses, exact artwork, compact text and offline exports.
- `node tools/verify-agent-models.js http://127.0.0.1:4173` covers v4 diff
  review, knowledge orbit, context compaction and context meter: complete original
  fixtures, native decisions/promotion/history, long-horizon cost, source
  accounting, exact SVG slots, compact text, pause and offline exports.
- `node tools/verify-fui.js http://127.0.0.1:4173` covers the v4 status panel,
  target lock, oscilloscope and spectrum scan. It checks complete original
  instrument fixtures, native touch/keys, interrupted locks, harmonic traces,
  virtual holds, seeded contacts, actual band transforms, exact SVG slots,
  compact type, suspension, disposal and offline exports.
- `node tools/verify-fui-terminals.js http://127.0.0.1:4173` covers v4 packet
  lanes, biometric gate and hex inspector. It checks complete original packet,
  flash, hash, byte and signature fixtures; native grant/deny, lane holds, byte
  keys/touch, actual ASCII links and horizontal touch access; compact optical
  sizing, exact SVG slots, pause, cancellation, cleanup and offline exports.
- `node tools/verify-entry-layout.js http://127.0.0.1:4173` holds the catalog
  across first paint and checks stable route chrome for modern and legacy
  entries on desktop and mobile. Reserve initial chrome before catalog loading.
- `node tools/verify-fui-missions.js http://127.0.0.1:4173` covers v4 trading,
  orbital tracking and boot output. It checks all original market states,
  satellite/trail samples, full orbit paths and sixteen boot event timelines;
  native drag, keys and touch; exact native artwork/primitive geometry, compact
  typography, interruptions, caller/viewport holds, cleanup and offline exports.
- The fit auditor honors masks inside a demo through `tools/stage-fit-bounds.js`.
  Fill includes painted child frames through `tools/stage-fit-surface.js`;
  transparent wrappers and the fitted root never supply parent surface area.
  Overflow and text gates continue to use leaf geometry.
  The audit restarts each measured preview so its initial composition does not
  depend on other tiles' boot times; component verifiers cover complete loops.
  Root and shell-stage clipping never exempt overflowing content. Verify this
  boundary with `node tools/verify-stage-fit-geometry.js` after audit changes.
- `node tools/verify-galleries.js http://127.0.0.1:4173` covers v4 Fraction
  Slider, Clip Transition, Stack Deck and Parallax Slides. It compares original
  bounds, wrap, drag/velocity and recycling fixtures; native keys/touch, complete
  drum timing, interrupted compositing and flights, exact image/crop/SVG slots,
  optical type, caller/viewport holds, reset cancellation and offline exports.
- `node tools/verify-galleries-remaining.js http://127.0.0.1:4173` covers the
  other nine galleries. It preserves all original timecodes, seeded print poses,
  neighbor calculations and project data; tests native wheel/drag/focus/scroll,
  all snap endpoints, exact native artwork/photo slots, delayed FLIP reversals,
  modal focus/Escape, native-scroll suspension, every mobile project caption,
  cleanup and complete offline exports.
- `node tools/verify-scroll.js http://127.0.0.1:4173` covers the remediated
  Smooth Scroll and Stagger Reveal demos: original copy and observer semantics,
  exact v4 layers, native wheel/keys/touch, interrupted reveals, six-second
  stories, runtime holds, compact typography and offline exports.
- `node tools/verify-scroll-core.js http://127.0.0.1:4173` covers Parallax,
  Horizontal Scroll, Sticky Stack, Reading Progress, Velocity Skew and Scroll
  Zoom. It compares the original numeric models and complete datasets, all
  native layers/photo slots, 60/120/240Hz skew, native wheel/keys/touch, complete
  stories, holds/disposal, compact full typography and offline exports.
- `node tools/verify-scroll-narratives.js http://127.0.0.1:4173` covers reading
  highlight, all 48 sequence poses at five canvas/DPR settings, measured route
  drawing, all seven rotating projects and all four split chapters, including
  native artwork, real input, compact typography, holds and offline exports.
- `node tools/verify-scroll-effects.js http://127.0.0.1:4173` covers Crossing
  Marquees, Counter-Rotating Rings, Depth Tunnel, Letter Scatter and Theme Shift.
  It compares original velocity/rotation/depth/glyph/RGB fixtures, equivalent
  60/120/240Hz motion, every native artwork slot, live renderer/model agreement,
  real wheel/keys/touch, complete stories, holds, compact type and offline exports.
- `node tools/verify-scroll-final.js http://127.0.0.1:4173` covers Clip Morph,
  Table of Contents, Inertia Grid and Video Scrubber. It compares the original
  sixteen-point aperture, complete article and project data, all three inertia
  recurrences and 280 direct video frame fixtures; checks exact native photo/SVG
  slots, live renderer agreement, real keyboard/wheel/touch, compact typography,
  full endpoints, six-second stories, holds, cleanup and complete offline exports.
- `node tools/verify-text-core.js http://127.0.0.1:4173` covers Split Text
  Reveal, Text Scramble, Kinetic Marquee, Line Mask Reveal, Split-Flap Roll,
  Proximity Type and Stat Counter. It compares independent original glyph
  queues, signed velocity/decay, proximity fields and count samples; checks
  complete full content, exact native type/SVG geometry, scaled input, actual
  wheel/keys/touch, flap reversals, six-second stories, compact typography,
  suspended intents, cleanup and complete offline exports.
- `node tools/verify-preview-start.js http://127.0.0.1:4173` checks that
  Morphing Popover and Spring Modal paint their native reference state when
  paused before the first frame. It covers four sizes, normal/reduced motion,
  restored live transitions, unchanged full interactions and startup cleanup.
- `node tools/verify-text-interactive.js http://127.0.0.1:4173` covers v4
  Text Wave, Image-Filled Type, Typewriter and Falling Letters. It compares
  independent original wave origins, texture offsets, every typing state and
  all thirteen collision bodies; checks native photo/type geometry, real
  pointer/keys/touch, interrupted motion, idle restarts, caller/viewport holds,
  compact full typography, deferred Reset, cleanup and complete offline exports.
- `node tools/verify-text-focus.js http://127.0.0.1:4173` covers v4 Blur to
  Focus, Strike and Replace, Anagram Shuffle and Outline Fill. It compares
  original optical/state/permutation/fill fixtures; checks exact native type,
  card and mask geometry, live renderer agreement, native keys/touch scrolling,
  interrupted flights, inertia cancellation, caller/viewport holds, queued
  intent, cleanup, compact full type and complete offline exports.
- `node tools/verify-text-expressive.js http://127.0.0.1:4173` covers v4 Ransom
  Note, Glitch Layers, Circular Badge and Accordion Type. It compares original
  seeded cutouts, burst slices, orbital trajectories and row weights; checks
  every native type/card/SVG slot, actual input, interrupted FLIP, uniform type,
  orbit pivot and refresh-rate equivalence, caller/viewport holds, cleanup,
  compact full typography and complete offline exports.
- `node tools/verify-text-final.js http://127.0.0.1:4173` covers v4 Magic
  Underline, Price Roll, Highlighter Swipe and Broken Grid Type. It compares
  original priority, reel, article and fragment fixtures; exact native type
  and geometry; actual keyboard, wheel and touch; live retargeting; one-shot
  observers and stale generations; complete stories, holds, cleanup, compact
  typography and complete offline exports.
- `node tools/verify-svg-core.js http://127.0.0.1:4173` covers v4 Path Draw,
  Blob Morph, Squiggle Underline and Live Line Graph. It compares original
  path/radial/wave/dataset fixtures, exact supplied artwork and native geometry,
  actual stroke and GPU output, native keys/touch, retargeting, holds, graphics
  context loss and fallback, complete stories, cleanup, compact type and offline
  exports. Full compositions retain the complete original SVG models.
