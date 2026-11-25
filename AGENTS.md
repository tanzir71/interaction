# AGENTS.md — INTRX

Current work order: **`CODEX_HANDOFF_3.md`**. Read it before changing anything. Design source: the Figma file linked at the top of that handoff. Motion: **`MOTION_SYSTEM.md`**. Per-component lookup (Figma node, trigger, recipes): **`INTRX-handover/manifest/components.json`**.

## Repo in one minute
- Zero-build static site. `index.html` loads `css/`, `js/demo-runtime.js` and the plain scripts in `js/shell/`. The shell fetches `registry/index.json`, then lazily loads each demo's module and dependencies.
- Active shared styles live in `css/foundations.css`. Keep `css/style.css`,
  `css/fonts.css`, the runtime, stage and base exporter unchanged as frozen v1
  inputs. `js/shell/export.shared.js` is embedded in generated export data and
  extends the base exporter in either script load order.
- A demo is one `INTRX.register({ id, title, cat, rootClass, tags, libs, desc, seen, hint, html, css, js, prompt })` object. All classes are prefixed with `rootClass`.
- Stage metadata (`designSize`, `stage`, `trigger`, `controls`, `a11y`, `tier`) lives in `js/meta.stage.js`. `js/registry-files.json` is the ordered source-module manifest used by Node tooling; add new modules there.
- A `thumb: 'hero'` demo may declare `thumbDesignSize` for its compact plane.
  `designSize` remains the complete composition used by detail and exports.

## Rules
- Work in the order of Handoff 3 §9. Per the owner's instruction on 15 Nov 2026,
  commit and push phases directly; do not open PRs.
- Owner instruction, 17 Nov 2026: keep GitHub Actions disabled for this
  repository. Run verification locally; commit and push without starting or
  re-enabling workflows. The owner's account-wide Actions budget is $0 with
  "Stop usage when budget limit is reached" enabled; preserve this limit.
- No bundler, no framework, no runtime dependencies in the site. Only `packages/intrx` may have npm dependencies.
- Demos never draw their own outer panel or replay/reset buttons; expose actions and list them in `controls`.
- Rendered thumbnail text ≥ 11px; neutral greys + one accent per demo (no decorative hues); reduced-motion branch required.
- Build what the v4 tile in Figma shows; the tile wins over older art and older demos.
- Full compositions also use approved v2 photography. Migrate the retired
  generated `coastal-stack`, `limestone-pavilion` and `atlantic-shore` content
  while preserving original interaction models and copy.
- Refresh each remediated demo's generator prompt to describe its v4 geometry,
  controls and approved assets; preserve the displayed composition's copy and
  complete original datasets and models.
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
- The four new Visual FX components use `tools/verify-fx-new.js`,
  `tools/verify-fx-new-models.js`, `tools/verify-fx-new-input.js`,
  `tools/verify-fx-new-clocks.js`, `tools/verify-fx-new-exports.js` and
  `tools/verify-fx-new-holds.js` against the local 4173 server. Preserve all
  46 native layers, 18 original SVG slots using twelve unchanged files, and
  both exact ocean photo slots with the original 800/1600px hashes and credit.
  Bleed stages already cancel the shared vertical offset. Native beam lanes
  keep their 30px spacing; native Particle Text restores its exact Geist word
  and sixteen dots at rest. Full retains the SDF-normal refractive pill with
  1.5px chromatic offsets and SVG displacement fallback, four-octave plasma
  with equivalent software pixels, 256 seeded beam events with twelve sparks
  per collision, and every sampled glyph point with 170/26/1 spring return.
  Retained SVG fades own independent mask/filter IDs. Full reduced Beams keeps
  a complete collision still rather than an empty pre-event field.
  Held lens gestures preserve their complete final position without inventing
  release velocity while source time is frozen. Lost capture cancels momentum.
  Keep analytical per-step particle integration, fixed source clocks, actual
  60fps paint caps, graphics resource recovery and independent pause owners.
  Tests cover 24 six-second 60/120/240Hz renderer stories, real scaled mouse,
  native keys and moving touch, vertical page scrolling, literal GPU context
  loss/rebuild, software/SVG fallback, cleanup and eight fresh offline contexts.
  All thirty new components and all ninety-one extensions are implemented;
  the catalog is 520. Pro scaffolding is implemented; final audits remain. Earlier phase counts below
  are historical. Keep earlier private helpers, inputs and evidence frozen.
- The first ten Agent & AI UI extensions use `tools/verify-agent-ext.js`,
  `tools/verify-agent-ext-models.js`, `tools/verify-agent-ext-input.js`,
  `tools/verify-agent-ext-clocks.js`, `tools/verify-agent-ext-exports.js`,
  `tools/verify-agent-ext-holds.js`, `tools/verify-agent-ext-touch.js` and
  `tools/verify-agent-ext-async.js` against the local 4173 server. Preserve
  all 105 captured native layers and seventeen SVG slots using fifteen unchanged
  files. Full views retain five messages, three complete code tabs, complete tool
  JSON, five activity steps, three note passages/contexts/responses, three verified
  sources and the complete summary, both usage counters and 24-hour resets, five
  completions, three agents/nine turns and all 72 role/tools/tone combinations.
  Home/End and 5% meter keys adjust the actual displayed fractions; automatic
  consumption and skipped reset periods remain accounted. Keep browser word/caret
  editing, grapheme deletion, real paste and IME commits through independent holds.
  Held Send/Stop/typing intents stay ordered. Old tab/disposed clipboard promises
  cannot restore feedback or invoke fallback side effects. Reduced queued batches
  retain one inert old composition for 150ms. Tests cover 60 six-second renderer
  stories at 60/120/240Hz, twenty fresh network-blocked full/native contexts,
  actual moving touch and scrolling, 44px targets, exact artwork/type, complete
  models and cleanup. Creator's sparse exception changes only the fill gate.
  This group brought the catalog to 439; later counts appear above. Keep all
  prior phase private helpers, inputs and archived publication evidence frozen.
- The three Play & Easter Eggs extensions use `tools/verify-play-ext.js`,
  `tools/verify-play-ext-models.js`, `tools/verify-play-ext-input.js`,
  `tools/verify-play-ext-clocks.js`, `tools/verify-play-ext-exports.js`,
  `tools/verify-play-ext-holds.js`, `tools/verify-play-ext-touch.js` and
  `tools/verify-play-ext-pixels.js` against the local 4173 server. Preserve
  56 exact native artwork layers and the one unchanged supplied Coin SVG at its
  original 15×15 root and captured bleed. Classify the nine Press/Drag Dock
  layers as shared shell controls. Plinko retains all twenty-one pegs, seven
  multipliers, eight visible balls, ordered scheduling, actual collision/landing
  times and complete spring tails. Prune old traces only after reporting results.
  Sling retains all nineteen exact dots and its captured parabola; the loaded
  (96,150) point uses anchor (118.5,103), gain 8 and gravity 752. Real release
  begins at the painted pulled point. Full uses a 1.6× world clear of result text.
  Coin uses two real faces, a connected 64-panel six-pixel rim, both bounces,
  current-pose retargeting and actual random-bit result accounting. Blur only
  the outer carrier, preserving the rotor's real 3D scene and visible edge.
  Keep independent pointer/key owners, held random/aim intentions, physical 2px
  focus rings and bounded handle geometry. Tests cover 2,000 seeded Plinko drops,
  analytical free flight and 170/26/1 force equations, eighteen six-second
  60/120/240Hz renderer stories, six fresh blocked-network full/native contexts,
  twelve independent hold stories, actual scaled mouse and moving touch, literal
  capture loss, late-click cancellation, simultaneous keys, page scrolling and
  mid-capture disposal. Actual pixels cover ball projection and both coin faces,
  the quarter-turn rim and retired blur. Keep all full result/history glyphs at
  least 11px. The three documented sparse Figma exceptions change only low fill;
  other gates still apply. Keep earlier private helpers, inputs and publication
  evidence frozen. These functional checks leave final timing audits open.
- The two Cursor extensions use `tools/verify-cursor-ext.js`,
  `tools/verify-cursor-ext-models.js`, `tools/verify-cursor-ext-input.js`,
  `tools/verify-cursor-ext-clocks.js`, `tools/verify-cursor-ext-exports.js`,
  `tools/verify-cursor-ext-holds.js`, `tools/verify-cursor-ext-touch.js` and
  `tools/verify-cursor-ext-pixels.js` against the local 4173 server. Preserve
  twelve exact native artwork layers, the original View project text, one
  unchanged reused SVG and three exact chrome/magnolia photo slots. Classify the
  six captured Move Dock layers as shared shell controls. Both verified photo
  pairs keep their 800/1600px hashes and attribution; full resolves 1600px before
  creation. Native Lens first paints its exact 2× stencil, then deliberate input
  uses the complete 2.5× model. Full always uses 2.5×. Preserve actual source-time
  0.18 followers, analytic eight-point six-second stories, current-pose retargeting,
  complete inline project disclosure, native Enter/Space/Escape and independent
  press owners. Counter-transform pop glyphs to stay at least 11px throughout;
  clamp the painted capsule inside Stage/root bounds. Per-frame updates use
  transforms and opacity. Tests cover twelve 60/120/240Hz renderer stories, four
  fresh network-blocked full/native contexts, eight independent hold stories,
  real scaled mouse and moving touch, actual implicit-capture loss, late click
  cancellation, next-touch recovery, mid-capture disposal, photographic sampling
  pixels, exact zoom matrices and physical 2px focus rings. No assets or fill
  exceptions are added. Keep earlier private helpers, inputs and archived
  publication evidence frozen.
- The three Scroll extensions use `tools/verify-scroll-ext.js`,
  `tools/verify-scroll-ext-models.js`, `tools/verify-scroll-ext-input.js`,
  `tools/verify-scroll-ext-clocks.js`, `tools/verify-scroll-ext-exports.js`,
  `tools/verify-scroll-ext-holds.js`, `tools/verify-scroll-ext-touch.js` and
  `tools/verify-scroll-ext-pixels.js` against the local 4173 server. Preserve
  67 exact native artwork layers and eighteen original photo slots. The nine
  captured Dock layers, including three Scroll labels, belong to shared shell
  controls and remain classified separately in the native fixture. All eleven
  photo asset pairs retain their 800/1600px hashes and credits. Columns keeps
  licensed Dusk natively and approved forestDark in full; each actual image gets
  its actual photographer, including Rosie Sun for the full forest replacement.
  Sticky keeps all three complete chapters and photographic states; Hero all
  eight works; Columns all nine. Use actual calibrated fractional browser scroll,
  source-time 0.12 followers, pinned scenes and pure progress-bound row/column
  transforms. Native's complete six-second cosine story starts at the exact 40%
  reference. Full Replay drives actual scroll and stops after its complete 6s
  story. Sticky's chapter thresholds use exact analytic source timestamps;
  current-pose photo/radius/text channels retain their complete named timings.
  Tests cover eighteen six-second 60/120/240Hz stories, six fresh network-blocked
  full/native contexts, twelve independent hold stories, actual moving touch,
  queued physical scroll, complete rendered photo coverage, full native endpoints,
  exact source resolutions and actual CSS transforms. No assets, fill exceptions
  or overflow exceptions are added. Keep earlier private helpers, inputs and
  archived publication evidence frozen.
- The three 3D & Perspective extensions use `tools/verify-perspective-ext.js`,
  `tools/verify-perspective-ext-models.js`, `tools/verify-perspective-ext-input.js`,
  `tools/verify-perspective-ext-clocks.js`, `tools/verify-perspective-ext-exports.js`,
  `tools/verify-perspective-ext-holds.js`, `tools/verify-perspective-ext-touch.js`
  and `tools/verify-perspective-ext-pixels.js` against the local 4173 server.
  Preserve all 54 native layers, two unchanged original SVG slots, thirteen
  exact native photographic slots and fourteen complete 800/1600px asset pairs
  with their hashes and credits. Marquee keeps licensed Dusk in its native v4
  reference; full replaces that slot with approved forestDark. Detail uses
  1600px photos before cloning; native and portable exports use 800px files.
  Pin retains current-pose 400ms follow, 1000ms return, 300ms glare and fixed
  ring phases, with its original beam joined to actual perspective projection.
  Marquee retains all twelve works, buffered repeated geometry and the complete
  12000ms diagonal period. Scroll uses calibrated fractional browser offsets,
  a 0.12 source-time follower, bottom hinge and interruptible six-second story.
  Paused-before-first-frame native artwork remains exact; reduced motion keeps
  flat deliberate stills with bounded inert 150ms old-paint feedback. Tests cover
  eighteen six-second 60/120/240Hz renderer stories, six fresh offline full/native
  contexts, twelve independent hold stories, actual moving touch/page scroll,
  prospective keyboard input, native scroll endpoints and real projected joins
  and wrap pixels. No fill or overflow exceptions are added. Earlier private
  helpers, inputs and archived publication evidence remain frozen.
- The four loader extensions use `tools/verify-loaders-ext.js`,
  `tools/verify-loaders-ext-models.js`, `tools/verify-loaders-ext-input.js`,
  `tools/verify-loaders-ext-clocks.js`, `tools/verify-loaders-ext-exports.js`,
  `tools/verify-loaders-ext-holds.js`, `tools/verify-loaders-ext-touch.js` and
  `tools/verify-loaders-ext-pixels.js` against the local 4173 server. Preserve
  all 61 captured native layers, five exact text copies and thirteen SVG slots
  using twelve unchanged supplied files, including both ring arcs and all five
  dashed blue outlines. Blueprint retains the exact approved archGrid photo,
  crop, 800/1600px hashes and credit. Its one-second live scanner checkpoint
  reproduces y118 with all outlines and the original photo fully visible.
  Full models retain every build step, all twenty-five matrix dots, the complete
  photographic card and the entire analytic rounded route. Keep 1800ms step
  milestones, the 1500ms success hold, current-pose icon handoff, fixed diagonal
  and perimeter clocks, SVG pathLength calibration and actual geometric head
  pixels. Paused native/full Trace must paint only its original reference glow
  before the first frame. Finite completion holds stop painting; early timers
  re-arm absolute deadlines. Matrix's documented 82×82 sparse exception changes
  only low fill. Checks cover 24 six-second 60/120/240Hz renderer stories, eight
  fresh offline full/native contexts, sixteen independent hold stories, actual
  moving touch/page scroll, complete long build timelines, calibrated SVG paint
  and original photographic pixels. This group brought the catalog to 505; later counts appear above. Keep earlier private helpers, inputs and evidence frozen.
- The six Data & Numbers extensions use `tools/verify-data-ext.js`,
  `tools/verify-data-ext-models.js`, `tools/verify-data-ext-input.js`,
  `tools/verify-data-ext-clocks.js`, `tools/verify-data-ext-exports.js`,
  `tools/verify-data-ext-holds.js`, `tools/verify-data-ext-touch.js` and
  `tools/verify-data-ext-pixels.js` against the local 4173 server. Preserve all
  112 captured layers, 31 exact text copies and 56 supplied SVG slots using
  30 unchanged files; 29 files are new and the cursor reuses nav-ext. Native
  Treemap uses a 348×176 plane; the other five retain 324px width. Full models
  retain all four conversion stages, six weighted categories, both complete
  six-axis comparisons, thirteen monthly records, every market observation and
  all twenty-four hours with quarter-hour endpoints in three real timezones.
  Keep finite changed-digit fades, source-time counters and deadlines,
  proportional squarification, captured radar vertices, unchanged chart SVGs,
  quarter-pixel stroke sampling and measured tooltip delays. Original clock
  hands rotate around their exact pivots; physical event-time velocity carries
  into the 380/32 spring without a release jump. Reduced release snaps with
  inert 150ms old-paint feedback. Daytime arcs illustrate 06:00–18:00; Reset time
  returns the fixed captured UTC instant. Tests cover 36 six-second equivalent
  renderer stories, twelve fresh offline full/native contexts, twenty-four
  independent hold stories, isolated real touch/vertical scroll, physical mouse,
  tooltip early wakes and actual SVG/clip/hand rendering. No fill or overflow
  exceptions are added. This group brought the catalog to 501; later counts
  appear above. Keep earlier private helpers, inputs and evidence frozen.
- The six Text & Type extensions use `tools/verify-type-ext.js`,
  `tools/verify-type-ext-models.js`, `tools/verify-type-ext-input.js`,
  `tools/verify-type-ext-clocks.js`, `tools/verify-type-ext-exports.js`,
  `tools/verify-type-ext-holds.js`, `tools/verify-type-ext-touch.js` and
  `tools/verify-type-ext-pixels.js` against the local 4173 server. Preserve all
  66 captured layers, 31 original text copies and the single unchanged cursor
  SVG reused from nav-ext. Four transparent 372×264 mask groups are flattened
  into zero-layout definitions with captured reference boxes; all painted mask
  geometry remains exact. Full models retain both complete reveal lines, every
  Wavelength glyph, the original MOTION aperture, four complete flip words,
  all 156 alphabet faces and the complete continuous Clarity brush path.
  Keep analytical 0.18 followers, source-time turbulence and sweeps, current-pose
  text reversals, natural-width pill type, 100/130/740ms drums with 90ms stagger
  capped at 300ms, the exact 1.03 landing peak and bounded 2500ms fog recovery.
  Drum glyph floors include actual projection and anticipation; keep font layout
  constant through motion and use transforms for optical compensation.
  Prospective native/Dock intent remains ordered through holds; retained reduced
  paint is inert and bounded to one composition. All eight suites pass
  458,185 checks across 36 six-second 60/120/240Hz renderer stories, twelve fresh
  network-blocked full/native contexts, twenty-four independent hold stories,
  actual moving touch/page scroll and real SVG filter/mask pixels. No new source assets,
  runtime dependencies, fill exceptions or overflow exceptions are added.
  This group brought the catalog to 495; later counts appear above. Keep
  earlier private helpers, inputs and archived publication evidence frozen.
- The five Navigation extensions use `tools/verify-nav-ext.js`,
  `tools/verify-nav-ext-models.js`, `tools/verify-nav-ext-input.js`,
  `tools/verify-nav-ext-clocks.js`, `tools/verify-nav-ext-exports.js`,
  `tools/verify-nav-ext-holds.js`, `tools/verify-nav-ext-touch.js` and
  `tools/verify-nav-ext-pointer.js` against the local 4173 server. Preserve all
  56 exact native layers and twelve original SVG slots using eleven unchanged
  files. Full models retain fifteen projects across five pages, four portfolio
  destinations, five documentation sections, five mobile panes and nine complete
  articles. Keep 200/300ms elastic edges, the rolling page number, bounded original
  scribble masks, fractional field calibration, source-time 0.18 followers and
  finite analytical settling. Mobile keeps the small 1.03 pop, icon return and
  shared masked notch. Sidebar labels share the 16px native row stencil after
  input, retaining actual glyph clearance. Compact canvases are 324×144/144/192/
  160/200; compensate centering and preserve the original artwork coordinates,
  sizes and Stage zoom. Natural-width labels remain 11px without compressed type.
  Only Pagination adds a documented low-fill exception for its exact sparse
  30px arrows and 80×8 indicator. Eight suites pass 81,389 checks, including 30
  six-second 60/120/240Hz renderer stories, ten fresh network-blocked full/native
  contexts, twenty independent hold stories, real scaled mouse, moving touch,
  actual glyph ink and vertical page scroll. This group brought the catalog
  to 489; later counts appear above. Keep earlier private helpers, inputs and
  archived publication evidence frozen.
- The five Gallery extensions use `tools/verify-gallery-ext.js`,
  `tools/verify-gallery-ext-models.js`, `tools/verify-gallery-ext-input.js`,
  `tools/verify-gallery-ext-clocks.js`, `tools/verify-gallery-ext-exports.js`,
  `tools/verify-gallery-ext-holds.js`, `tools/verify-gallery-ext-touch.js` and
  `tools/verify-gallery-ext-interaction.js` against the local 4173 server.
  Preserve all 93 exact native layers and 18 photograph slots using fifteen
  original local images. Native Dusk keeps its exact reference; the full first
  print uses approved forestDark. Keep all 800/1600px hashes and credits. Complete
  models retain five covers, eleven books, six two-paragraph stories, three
  complete quotes and five prints. Drag carries actual source velocity into
  analytical 380/32/1 springs; full covers keep their real mirrored reflections.
  Book hinge/tilt, bounded photo blends, exact 4800ms quote deadlines, complete
  scrollable articles, current-pose shared-image FLIP and visible modal focus
  remain intact. Native paint follows the shared Stage zoom and original 24,20
  offset. Hit order follows artwork depth; touch never acquires hover motion.
  Eight suites pass 68,775 checks, including independent numerical integration,
  30 six-second 60/120/240Hz renderer stories, ten fresh network-blocked full/native
  contexts, twenty independent hold stories, actual moving touch and page scroll.
  No new fill or overflow exceptions were added. This group brought the catalog
  to 484; later counts appear above. Keep earlier private helpers, inputs and
  archived publication evidence frozen.
- The twelve Layout & UI extensions use `tools/verify-layout-ext.js`,
  `tools/verify-layout-ext-models.js`, `tools/verify-layout-ext-input.js`,
  `tools/verify-layout-ext-clocks.js`, `tools/verify-layout-ext-exports.js`,
  `tools/verify-layout-ext-holds.js`, `tools/verify-layout-ext-pointer.js` and
  `tools/verify-layout-ext-interaction.js` against the local 4173 server. Preserve
  all 206 native layers, 42 supplied SVG slots using 27 unchanged files, four
  approved photo slots and both captured [3,3] dashed placeholders. Full models
  retain twelve tree nodes, twelve complete glyph rows, three photo cards, four
  timeline entries, nine tasks, the complete Northwind project and local note,
  both collaborators and every comment, six projects and all 336 half-hour cells.
  Use the Stage zoom on the 324×216 native plane with its original 24,20 offset.
  Keep current-pose menu reversals, actual fractional scroll endpoints, stable
  ancestor capture, carried 380/32 drop springs, rollback, visible dialog focus
  and ordered checkbox/text intent. Native Feedback morphs from its exact stars;
  completion holds exactly 1500ms and re-arms early timers. Only its low-fill
  exception is new; overflow, scroll and optical gates remain active. Eight
  suites pass 141,861 checks, including independent RK4/cubic/lag models, 72
  six-second 60/120/240Hz renderer stories, 24 fresh network-blocked full/native
  contexts, 48 independent hold stories, actual moving touch and capture cleanup.
  This group brought the catalog to 479; later counts appear above. Keep
  earlier private helpers, inputs and archived publication evidence frozen.
- The eight Visual FX extensions use `tools/verify-fx-ext.js`,
  `tools/verify-fx-ext-models.js`, `tools/verify-fx-ext-input.js`,
  `tools/verify-fx-ext-clocks.js`, `tools/verify-fx-ext-exports.js`,
  `tools/verify-fx-ext-holds.js`, `tools/verify-fx-ext-touch.js` and
  `tools/verify-fx-ext-graphics.js` against the local 4173 server. Preserve all
  882 native layers, 24 supplied SVG slots using 23 unchanged files and both
  directly rehydrated Black Hole alpha masks. Native retains 64 vortex points,
  135 matrix dots, five tunnel frames with sixteen streaks, 589 logo dots with
  117 bright mark cells, five meteors and the complete grid/cursor composition.
  Full keeps the analytical lensed field, 384 inward simplex particles, real
  lamp scrolling, the 325-dot fragment shader, nine projective tunnel frames
  with sixteen unchanged streaks, the continuous resolved logo, 256 seeded
  meteor events and 180 skewed cells. Invert the actual grid transform; each
  Arrow key moves one cell. Native ambient art stays at its exact checkpoint
  before the first source frame. Black Hole retains every software/SVG field
  sample; Dot Matrix retains complete Canvas/SVG fallback. Literal context
  recovery respects caller holds, restores identical GPU pixels and deletes
  all live graphics resources. Eight suites pass 27,195 checks, including 48 actual
  six-second 60/120/240Hz renderer stories, sixteen fresh network-blocked
  full/native export contexts, real moving touch and wheel, complete local
  models, exact native masks, independent holds and retained old GPU pixels.
  This group brought the catalog to 467; later counts appear above. Keep
  earlier private helpers, inputs and publication evidence frozen.
- The ten Forms & Inputs extensions use `tools/verify-forms-ext.js`,
  `tools/verify-forms-ext-models.js`, `tools/verify-forms-ext-input.js`,
  `tools/verify-forms-ext-clocks.js`, `tools/verify-forms-ext-exports.js`,
  `tools/verify-forms-ext-holds.js`, `tools/verify-forms-ext-touch.js`,
  `tools/verify-forms-ext-async.js` against the local 4173 server. Preserve all
  230 native layers, twelve supplied SVG slots using ten unchanged files and the
  licensed Allura font. Full models retain every placeholder/glyph, five search
  results, three intervals and people, the complete HSV gamut and eight-color
  history, UTC six-week calendars and three presets, all eight chip options, saved
  names, every pressure-weighted Catmull point and connected liquid paths. Keep
  original reference copy and initial geometry. Five sparse exceptions waive only
  fill. Active compact search results and dates retain 24px targets. Touch taps
  focus the actual text field after canceled drags; compatibility mouse events
  cannot repeat actions or steal focus. Held native edits preserve selection,
  graphemes, clipboard and composition intent. Signature SVG fallback embeds the
  complete licensed font; stale, aborted or disposed font requests cannot restore
  previews. Eight suites cover 12,336 checks, 60 actual six-second 60/120/240Hz
  renderer stories, twenty fresh network-blocked full/native export contexts,
  graphics recovery, native input, independent holds, retained Canvas/range paint
  and cleanup. This group brought the catalog to 459; later counts appear above.
  Keep earlier private helpers, inputs and publication evidence frozen.
- The ten Buttons & Micro extensions use `tools/verify-micro-ext.js`,
  `tools/verify-micro-ext-models.js`, `tools/verify-micro-ext-input.js`,
  `tools/verify-micro-ext-clocks.js`, `tools/verify-micro-ext-exports.js`,
  `tools/verify-micro-ext-holds.js`, `tools/verify-micro-ext-touch.js` and
  `tools/verify-micro-ext-async.js` against the local 4173 server. Preserve
  all 92 native layers, 49 supplied SVG slots using 46 unchanged files and the
  approved portraitC1 photograph with its original 800/1600px hashes and credit.
  Full models keep both save outcomes and timed reset, five bounded dodges,
  the exact 900ms hold, four real share targets, all three icon pairs, pointer
  iridescence, original laurel, both conference-pass faces, velocity-carrying
  paper peel and Follow/Following states. Spinner replaces the loading label;
  results use 150ms outgoing and 500ms incoming icon transforms. Width/radius
  use 350ms settle, with 250ms reset. Restore/Reset release physical capture
  and key owners. Late clipboard/share work cannot restore stale or disposed
  feedback; synchronous share failures retain clipboard fallback. Six sparse
  exceptions change only fill. Tests cover 60 actual six-second renderer stories
  at 60/120/240Hz, independent curves/RK4 springs and paper area, real moving
  touch and keys, capture loss, independent holds, reduced retained paint,
  compact type, disposal and twenty fresh offline full/native contexts.
  This group brought the catalog to 449; later counts appear above. Keep
  earlier private helpers, inputs and publication evidence frozen.
- The four new Data/Navigation components use `tools/verify-data-nav-new.js`,
  `tools/verify-data-nav-new-models.js`, `tools/verify-data-nav-new-input.js`,
  `tools/verify-data-nav-new-clocks.js`, `tools/verify-data-nav-new-exports.js`
  and `tools/verify-data-nav-new-holds.js` against the local 4173 server. Preserve
  all 48 native layers, 24 supplied SVG slots using 21 unchanged files, and the
  approved forestDark photo with its 800/1600px hashes and attribution. Native
  ring arcs include cropped 95×107 and 42×82 SVG roots; preserve their offsets.
  Ring overshoot reuses the original arc assets. Sankey reveal masks cover the
  full exported paint bounds, including stroke bleed and rounded caps. Full views
  keep all three goals, 32 OHLC sessions/volumes, six conserved flows and three
  complete local page sections; native Candles retains its ten supplied bodies.
  Keep 11px optical prices and the documented sparse chart exception. Nav reads
  actual fractional browser scroll offsets under stage zoom, calibrates its
  initial reference checkpoint, and retains old page scroll positions during
  reduced fades. Tests cover actual input, Canvas fallback/recovery events,
  exact tooltip deadlines, 24 equal-time 60/120/240Hz renderer stories, eight
  fresh offline full/native contexts, independent holds, queued scroll/touch and
  disposal. This group brought the catalog to 425; later counts appear above.
- The four new Forms & Inputs components use `tools/verify-forms-new.js`,
  `tools/verify-forms-new-models.js`, `tools/verify-forms-new-input.js`,
  `tools/verify-forms-new-clocks.js`, `tools/verify-forms-new-exports.js` and
  `tools/verify-forms-new-holds.js` against the local 4173 server. Preserve all
  81 captured native layers and 46 supplied SVG slots using nine unchanged files.
  Native Upload retains its exact licensed Dusk photograph; its full sample uses
  approved v2 forestDark. Keep both credits and 800/1600px hashes unchanged.
  Full models retain twelve hours, sixty minutes, AM/PM, the complete 0–100
  precision range and real file input/drop. The native picker first paints its
  supplied five-minute stencil, then uses the full one-minute model after input.
  Slide and Precision retain their documented sparse reference sizes. Compact
  gradient labels must paint every glyph at 11px or more. Use absolute spring
  settle/inertia boundaries and source-clock upload entrance/check paint; reduced
  milestone timers must re-arm after an early wake. Tests cover actual scaled
  mouse/keys/moving touch, 24 six-second 60/120/240Hz renderer stories, eight fresh
  offline full/native contexts, independent holds, ordered intents, early timers,
  Blob retirement, decode generations, capture and disposal.
- The seven new Layout & UI components use `tools/verify-layout-new.js`,
  `tools/verify-layout-new-input.js`, `tools/verify-layout-new-clocks.js`,
  `tools/verify-layout-new-exports.js`, `tools/verify-layout-new-holds.js` and
  `tools/verify-layout-new-hover.js`
  against the local 4173 server. Preserve 93 exact native layers, 23 unchanged
  SVG slots, nine approved photo slots and the complete three/thirteen/three/
  five/five/four/six record models. Tests cover 42 six-second 60/120/240Hz
  renderer stories, fourteen fresh offline full/native contexts, actual native
  touch/keys/wheel, compact glyph/icon clearance, scrolled tooltip anchors,
  independent holds, queued checkbox/clipboard intent, capture and disposal.
  Folder follows Handoff 3 section 7's Layout & UI placement while the supplied
  manifest category remains unchanged. Avatar/Tabs exceptions change only fill.
  Keep prior phase private helpers, inputs and archived publication evidence
  frozen; use new phase helpers for further work.
- The five new Buttons & Micro components are original implementations under
  the Stage contract. Run `node tools/verify-micro-new.js`,
  `node tools/verify-micro-new-input.js`, `node tools/verify-micro-new-clocks.js`
  `node tools/verify-micro-new-exports.js` and `node tools/verify-micro-new-holds.js`
  against the local 4173 server.
  These cover 85 exact native layers and sixteen unchanged SVG slots, all
  original local content, half-star input, held confirmation, changed digits,
  moving touch, compact text/physical controls, caller/document/viewport holds, cleanup, thirty
  six-second 60/120/240Hz renderer stories and ten fresh offline full/native
  exports. Keep the same raster and curl path for reverse Undo; filter bounded
  phase surfaces rather than every patch. Press intent waits through holds and
  unrelated window releases must not queue work. Touch release activation
  consumes a following compatibility click once. Reduced motion retains 150ms
  old-paint fades. The clock fixture advances WAAPI and source frames together;
  these functional stories do not replace final performance measurements.
- The first six new Agent & AI UI components are original implementations under
  the Stage contract. `node tools/verify-agents-new.js http://127.0.0.1:4173`
  checks their 66 native layers, all unchanged supplied SVGs, complete local
  datasets, input, reduced motion and holds. Also run
  `node tools/verify-agents-new-input.js`, `node tools/verify-agents-new-clocks.js`
  `node tools/verify-agents-new-exports.js` and `node tools/verify-agents-new-pixels.js`.
  These cover real moving touch,
  independent capture/key owners, actual 60/120/240Hz Canvas output, disposal,
  compact text, pointer travel into citations and twelve fresh offline full/native
  exports, exact mosaic edge cells, software recovery pixels and complete
  long-held voice bounds. Keep 16/8/4 logical-pixel diffusion cells, absolute voice phase
  boundaries, native action feedback and finite reduced state timers. Retained
  paint is inert, preserves Canvas pixels and is removed after 150ms. New Pro
  candidates stay free until the seams phase and the owner's flag choice.
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
- `node tools/verification/smooth-driver-models.js` compares Smooth Scroll's
  local driver with 7,752 independently captured original Lenis 1.1.14 frames at
  60/120/240Hz. Preserve wheel/programmatic target differences, rounding, clamps,
  retargeting, stop/start and resize behavior. The site has no runtime libraries.
  `node tools/verify-scroll-mask.js http://127.0.0.1:4173` checks native Mask
  Reveal's interruptible 350ms aperture, fixed photo crop, equivalent clocks,
  held/queued input, reduced feedback and fresh offline smoothing/mask exports.
  Native Mask uses 38/76px radii; full retains its original 65/130px model.
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
- `node tools/verify-perspective-spatial.js http://127.0.0.1:4173` covers v4
  Parallax Room and Folding Map: original gallery and route content, exact SVG
  and photo slots, projective corner joins, original idle easing and phases,
  real keys/touch, interrupted motion, 60/120/240Hz renderer clocks, user intent
  priority over delayed visibility, holds, cleanup and complete offline exports.
- `node tools/verify-svg-remaining.js http://127.0.0.1:4173` covers the other six
  SVG demos. It compares original perimeter, pen schedules, menu endpoints,
  noise fields, seven measured circuit routes and all four 240-point figures;
  checks exact native artwork and photo slots, scaled selection, real pen and
  touch, complete live stories, interrupted menus, holds, cleanup, compact type,
  offline exports and the complete font in separate CSS and the actual CSS tab.
- `node tools/verify-perspective-core.js http://127.0.0.1:4173` covers v4 Cube
  Navigation, Flip Grid, Page Turn and Cylinder Carousel. It compares original
  navigation, all 256 card states, four complete spreads and eight poster/inertia
  models; checks exact SVG/photo slots, native keys/drag/touch, interruption,
  independent spring forces, actual 60/120/240Hz renderer clocks, compact type,
  caller/viewport holds, capture cleanup and complete offline exports.
- `node tools/verify-perspective-gpu.js http://127.0.0.1:4173` covers v4 Point
  Globe and Wobbly Sphere: complete original point/mesh buffers and vertex
  shaders, orbit/energy/spring fixtures, exact native SVG slots and texture
  pixels, actual GPU uniforms and 60/120/240Hz renderer clocks, native drag,
  keys and touch, queued intent, holds, context loss/recovery, complete Canvas
  fallback, resource cleanup, compact type and fresh-context offline exports.
- `node tools/verify-perspective-final.js http://127.0.0.1:4173` covers v4
  Voxel Assemble, Exploded Device, Depth Hero and Isometric Stack: original
  blocks, excavation, device and layer geometry, actual painted faces, exact
  native SVG/photo/type slots, real wheel/keys/touch, interrupted transitions,
  60/120/240Hz renderer clocks, queued intents, independent holds, clipped-text
  protection at every camera limit, cleanup and eight fresh-context exports.
- `node tools/profile-perspective-final.js http://127.0.0.1:4173 --cpu=4`
  records actual 480-frame native/full stories for those four scenes; use
  `--cpu=1` for desktop and `--ids=voxel-assemble` to isolate a scene. Reports
  bind source and harness hashes, record gaps and long tasks, and reject source
  changes during measurement. Completion records a measurement, not a timing
  gate pass. Use the recorded findings in the final performance audit.
- `node tools/verify-cursor-core.js http://127.0.0.1:4173` covers v4 Gooey
  Cursor, Particle Emitter, Elastic Cable and Inverted Lens. It compares the
  original spring, particle, quadratic and zoom fixtures; exact native SVG and
  photo slots; actual painted paths, textures and masks; physical mouse, keys
  and touch; equivalent renderer clocks; queued input and independent holds;
  graphics loss/fallback, optical type, cleanup and sixteen offline exports.
- `node tools/verify-cursor-fields.js http://127.0.0.1:4173` covers v4 Text
  Repel, Grid Ripple, Hover Preview and Drag Ghost. It compares complete original
  glyph, responsive-grid, multiwave, placement and inertia fixtures; actual dot
  textures and ghost projections; exact native assets and type; all four project
  photographs and credits; mouse/keys/touch, loop resets, queued input, holds,
  cleanup, dark/light stages and sixteen fresh-context offline exports.
- `node tools/verify-cursor-motion.js http://127.0.0.1:4173` covers v4 Watching
  Eyes, Liquid Metaballs, Rope Trail and Velocity Stretch. It compares original
  gaze, six-orb, 22-link and velocity-history fixtures; exact native SVG and
  primitive geometry; actual transforms and GPU/Canvas output; physical input,
  moving touch targets, equivalent clocks, loop resets, queued intents, holds,
  cleanup, themes, compact full type and sixteen fresh-context offline exports.
- `node tools/verify-image-gpu.js http://127.0.0.1:4173` covers v4 Hover
  Distortion, Ripple Click, Pixel River and Fisheye Lens. It compares independent
  original states, shader sources, buffers and fragment samples; actual GPU
  pixels and photographic crops; every native asset, primitive and uploaded
  texture; native mouse, keys and moving touch; equivalent renderer clocks,
  complete stories, queued intent and independent holds; worker cancellation,
  mathematical Canvas fallback, real context loss/recovery, disposal and
  sixteen fresh-context network-blocked exports.
- `node tools/verify-cursor-classic.js http://127.0.0.1:4173` covers v4 Trailing
  Cursor, Magnetic Button, Image Trail, Spotlight Mask and Tilt and Glare. It
  compares independent original lerp, GSAP 3.12.5 easing and interrupted tween,
  photo threshold/flight and tilt fixtures; checks actual CSS flight matrices,
  long-running idle phases, exact SVG/photo/type slots, real keys and touch,
  coarse/reduced stills, renderer clocks, queued intent, independent holds,
  cleanup and twenty fresh-context offline exports. Magnetic Button has no
  runtime library dependency.
- `node tools/verify-cursor-targets.js http://127.0.0.1:4173` covers v4 Snap
  Targets, Flashlight, Glyph Rain and Magnetic Grid. It compares original snap,
  beam/noise, complete particle and sampled-path fixtures; exact native SVG and
  photo slots; physical mouse/keys/touch; native stories, interruption, equivalent
  clocks, queued input, independent holds and cleanup; GPU/Canvas fallback,
  compact type, beam compositing and cached glyph fidelity, plus sixteen offline
  exports with the complete original content and both photo credits.
- `node tools/verify-cursor-final.js http://127.0.0.1:4173` covers v4 Heat
  Shimmer, Crosshair HUD, Pull Distort and Shadow Parallax. It compares complete
  original thermal fields, unequal HUD springs/telemetry, eight-node deformation
  and soft/hard light fixtures; exact native artwork, typography and stage slots;
  physical mouse/keys/touch, captured drag/cancellation, queued intents and holds;
  cached thermal pixels, GPU/Canvas fallback, cleanup and sixteen offline exports
  with the original full content and verified photo attribution.
- `node tools/verify-physics-core.js http://127.0.0.1:4173` covers v4 Spring
  Follower, Pendulum Tags, Chain Links and Gravity Icons. It compares independent
  original presets, angular impulses, all18 Verlet joints and complete ten-body
  collision/throw fixtures; checks exact SVG and primitive geometry, live source
  renderer agreement, real range/preset/keyboard input, scaled mouse and native
  touch dragging, capture interruption, independent holds, cleanup, compact full
  type and sixteen fresh-context offline exports. Native Gravity retains all
  eleven v4 icon slots; its full composition retains the original ten symbols.
- `node tools/verify-physics-remaining.js http://127.0.0.1:4173` covers v4
  Collision Bubbles, Soft Body, Cloth Flag, Wrecking Ball, Inertia Window and
  Magnet Snap Grid. It compares 2,160 independent original solver frames,
  complete full content, exact SVG bytes and slots, actual SVG/Canvas rendering,
  60/120/240Hz clocks and six-second native stories. It checks real range,
  keyboard, scaled mouse and touch input; occupied-slot swaps, pressure markers,
  interrupted capture, independent holds, WebGL loss/recovery, complete Canvas
  fallback and resource cleanup; compact full type and twenty-four fresh-context
  offline exports. Native Collision retains nineteen bubbles versus twelve in
  full; native Snap retains two modules versus all six original full modules.
- `node tools/verify-liquid-core.js http://127.0.0.1:4173` covers v4 Liquid
  Buttons, Ferrofluid, Water Ripple and Lava Lamp. It compares 1,440 independent
  original frames, all scalar pixels and wave-buffer hashes, exact native SVG
  slots and all 55 supplied primitive bars. It checks complete live GPU/Canvas
  output, all seven thermal transforms, actual 60/120/240Hz clocks, six-second
  native stories, real keyboard/mouse/touch and range input, reset generations,
  independent holds, context loss/recovery, software fallback, compact type,
  cleanup and sixteen fresh-context offline exports. Native membranes retain
  two controls versus three in full; native lava retains the three supplied
  colored regions while full retains all seven original bodies.
- `node tools/verify-liquid-remaining.js http://127.0.0.1:4173` covers v4 Ink
  Bleed, Melt Drip, Smoke Wisps, Bubble Pop, Liquid Image and Liquid Mask. It
  compares all 2,160 independent original frames, complete wave buffers,
  97-point/seven-droplet mask hashes, every glyph strip and all 180 plume and
  18-body burst paint commands. It checks exact supplied SVG/photo/type slots,
  licensed 800/1600px resolution, capped mask DPR, live canonical easing,
  scaled physical pointer/touch and native keys, interrupted reveals, focus
  recovery, queued intent, independent holds, 60/120/240Hz clocks, six-second
  stories, GPU/Canvas photo deformation, cleanup and twenty-four fresh-context
  offline exports. Native Bubble Pop has eight supplied slots; full retains
  all eighteen original bodies. Full Smoke reserves 400×340px for its complete
  mobile caption; its 600×400 physical field remains unchanged.
- `node tools/verify-play.js http://127.0.0.1:4173` covers all eight v4 Play
  demos. It compares 2,880 independent original model frames, every live
  firework paint command, exact supplied SVG/type/primitive slots, native keys,
  scaled mouse and touch, capture interruption, complete six-second stories,
  60/120/240Hz clocks, independent holds, queued intent, reduced motion,
  Canvas loss/recovery, complete SVG fallback, disposal and thirty-two fresh
  network-blocked exports. Full Snake retains the complete 20×14 world and
  eight foods; its native camera shows the supplied 10×8 grid. Gravity keeps
  the original eight-body solver beneath a readable full composition. Konami's
  exact eight-cap preview has a documented sparse-fill exception; the complete
  ten-key sequence remains functional.
- `node tools/verify-image-core.js http://127.0.0.1:4173` covers v4 Particle
  Dissolve, Clip Reveal, Hover Zoom Card, Pixelate Reveal and Focus Grid. It
  compares all 1,464 original glyph particles across 360 source frames, actual
  particle paint commands, every pixel channel against the unmodified original
  drawing function, and live idle matrices against the original CSS keyframes.
  It checks all 151 native nodes, 96 supplied SVG instances, ten exact photo
  slots, complete full content, native mouse/keys/touch, interrupted reveals,
  queued intent, independent holds, 60/120/240Hz clocks, six-second stories,
  Canvas/SVG recovery, cleanup, compact type and twenty fresh-context offline
  exports. Native Focus Grid has six supplied tiles; full keeps five original
  items. The original sampling color is retained offscreen to preserve glyph
  edge samples; visible particles use the v4 accent.
- `node tools/verify-image-fields.js http://127.0.0.1:4173` covers v4 Static
  TV, Vertex Wave, Slice Fan and Infinite Zoom. It compares independent original
  states, literal shaders and complete mesh buffers, mathematical samples,
  actual GPU pixels, native artwork and camera textures, original eight-slat
  endpoints and recursive Canvas commands. It checks real mouse/keys/touch,
  interrupted reveals, 60/120/240Hz clocks, six-second stories, queued intent,
  caller/viewport holds, worker and synchronous fallback, graphics recovery,
  cleanup and sixteen fresh-context offline exports. Native Slice Fan has five
  exact Figma slices; full keeps all eight original slats. Frame timing can be
  recorded with `node tools/profile-image-fields.js http://127.0.0.1:4173 --cpu=1`
  or `--cpu=4`; these reports record findings without declaring the timing gate
  passed.
- `node tools/verify-image-photos.js http://127.0.0.1:4173` covers v4 Comparison
  Slider, Ken Burns Crossfade, Duotone Sweep and Blinds Reveal. It checks the
  complete original range, camera paths, three-scene timeline, radial states
  and ten-louver endpoints against independent captures; exact native photos,
  crops, vector and luminance-mask payloads; actual painted CSS and source
  clocks; independent numerical spring samples; mouse/keys/moving touch and
  vertical scrolling; interruptions, 60/120/240Hz stories, queued intent,
  caller/viewport holds, cleanup and sixteen fresh offline exports. Native
  Blinds has six reference louvers while full retains ten. Record frame timing
  with `node tools/profile-image-photos.js http://127.0.0.1:4173 --cpu=1` or
  `--cpu=4`; full Ken Burns includes a complete three-scene source cycle.
- `node tools/verify-image-assemblies.js http://127.0.0.1:4173` covers v4
  Kaleidoscope, Shatter, Magnetic Tiles and Hologram Wordmark. It compares the
  complete original twelve-sector shader, 96 triangular shards, twenty-tile
  field and 1,865-particle raster against independent normal/reduced captures;
  exact native SVG/photo/type slots, actual matrices, painted particles and
  two-frame RGB splits; real keys/touch and vertical scrolling; equivalent
  native clocks, independent holds, queued intent, GPU loss/recovery and
  complete photographic fallback, cleanup and sixteen fresh offline exports.
  Literal original drawing functions also verify transformed photo/particle
  pixels at DPR 1/2; independent 128x128 subpixel samples verify triangle-edge
  coverage across GPU and Canvas rasterizers.
  Native has eight sectors and twelve tiles. Record timing with
  `node tools/profile-image-assemblies.js http://127.0.0.1:4173 --cpu=1` or
  `--cpu=4`; full Hologram includes all four original glitch intervals.
- `node tools/verify-image-final.js http://127.0.0.1:4173` covers v4 Neural
  Signals and Painterly Smear. It compares complete original routing histories,
  the nineteen-node/seventy-eight-edge graph, all original painting fields,
  brush samples, bristles, queue and quantized drying against independent
  captures. It verifies literal network and photographic pigment pixels,
  every native SVG/photo slot, real mouse/keys/moving touch and vertical
  scrolling, both source choices, interrupted input, two complete stories at
  60/120/240Hz, queued intent, caller/viewport holds, cleanup and twelve fresh
  offline exports. Original pixel fixtures use verified lossless XOR packing.
  Record timing with `node tools/profile-image-final.js http://127.0.0.1:4173
  --cpu=1` or `--cpu=4`; full paint spans its twelve-second glare and both
  interactive sources.
- `node tools/verify-raster-core.js http://127.0.0.1:4173` covers v4 Bayer
  Dither, Error-Diffusion Resolve and Blue-Noise Dissolve. It compares original
  luma, threshold, diffusion, rank, progress and pixel histories; checks all
  native primitive/SVG/photo slots, actual full Canvas pixels, physical mouse,
  keys and touch scrolling, interrupted input, reduced motion, complete stories
  at 60/120/240Hz, queued intent, independent holds, cleanup and twelve fresh
  offline exports. Record timing with `node tools/profile-raster-core.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`. Halftone's missing exports were
  subsequently resolved through the explicit owner exception below.
- `node tools/verify-halftone.js http://127.0.0.1:4173` covers v4 Halftone
  Field: all 210 exact native slots, 145 unchanged supplied SVGs and the 61
  missing circles reconstructed from captured geometry with the owner's
  explicit approval on 18 Nov 2026. It compares complete original states,
  sampling and live Canvas pixels; native keys, mouse and touch scrolling;
  six-second stories at 60/120/240Hz, holds, queued input, reduced motion,
  compact full type, cleanup and eight fresh offline exports. Record timing
  with `node tools/profile-halftone.js http://127.0.0.1:4173 --cpu=1` or
  `--cpu=4`. The circle reconstruction exception applies only to Halftone.
- `node tools/verify-raster-studies.js http://127.0.0.1:4173` covers v4
  Engraving Screen, ASCII Luminance and ASCII Wave. It verifies all 31 original
  SVG exports and two blank text rows, exact native pixels and geometry,
  complete original photographic/ribbon/glyph models, source buffers, drawing
  traces and pixel digests across 17,280 replayed frames. It checks actual
  keys, mouse and moving touch, every density, continuous wave phase,
  60/120/240Hz clocks, independent holds, LiveTiles visibility and touch unlock,
  readable complete full views, resource retirement and 24 fresh offline
  contexts. Native views replace the hidden paint pass; all original state,
  input, sampling and readout code remains unchanged.
  Record source-bound native/full timing with `node tools/profile-raster-studies.js
  http://127.0.0.1:4173 --cpu=4` or `--cpu=1`. Native timing is near 60fps;
  several full views and full mobile Wave startup remain performance audit work.
- `node tools/verify-raster-simulations.js http://127.0.0.1:4173` covers v4
  ASCII Fire, Fluid Stir and Type Explode: all 24 original SVGs, the blank fire
  row, exact native pixels, complete original heat/pressure/velocity/bitmap
  buffers, 34,608 replayed full/native states and complete full paint digests.
  It checks real input, moving touch and capture, Pan scrolling, native caret
  selections and composition during live frames, 60/120/240Hz stories, holds,
  full cameras, cleanup, LiveTiles and 24 fresh offline contexts. Type's sparse
  artwork has a documented fill exception; its full-width hero retains physical
  glyph sizes while its full view keeps 400×320 geometry.
  Record native/full timing with `node tools/profile-raster-simulations.js
  http://127.0.0.1:4173 --cpu=4` or `--cpu=1`.
- `node tools/verify-raster-portrait.js http://127.0.0.1:4173` covers v4
  Portrait Reveal: ten unchanged SVG rows, the exact C3 crop, verified free
  photo provenance and complete original procedural source and reveal model.
  It compares 11,536 original full/native states and full paint/pixel digests,
  every photographic reveal channel, physical mouse/keys/touch and native
  vertical scrolling, 60/120/240Hz stories, independent holds, reduced opacity
  feedback, complete cameras, cleanup, LiveTiles/routes and eight fresh offline
  exports with photo credits. Local detail uses 1600px C3; exports use 800px.
  Record native/full timing with `node tools/profile-raster-portrait.js
  http://127.0.0.1:4173 --cpu=4` or `--cpu=1`.
- `node tools/verify-raster-fields.js http://127.0.0.1:4173` covers v4 ASCII
  Donut, ASCII Morph, Dot Matrix and Halftone Globe: 455 unchanged original
  SVGs and four blank rows, exact native pixels, 82,624 full/native original
  model states and complete full paint/pixel digests, plus 41,312 states through
  the production hidden-paint context with real font measurement. Independent equations
  check every native glyph/dot projection and actual Canvas pixels. It covers
  physical mouse/keys/moving touch, capture and Pan scrolling, all four shapes,
  retargeting, complete message/orbit stories at 60/120/240Hz, independent holds,
  queued intent, paused themes, reduced feedback, compact full cameras,
  synthetic Canvas loss/restoration notifications, cleanup, LiveTiles/routes
  and 32 fresh network-blocked exports. Sparse Donut, Matrix and Globe keep
  their exact Figma geometry through documented fill exceptions. Full views
  retain all 2,160 torus samples, both 480-cell figures, all 104 message columns
  and all 1,152 original globe points. Record isolated native/full timing with
  `node tools/profile-raster-fields.js http://127.0.0.1:4173 --cpu=1` or `--cpu=4`;
  measurements record findings without declaring final timing gates passed.
- `node tools/verify-raster-instruments.js http://127.0.0.1:4173` covers v4
  Terminal Window, Engraved Relief, Pixel Lissajous and RGB Slices: all 169
  unchanged SVGs, 131,584 original full/native states, complete original models
  and full pixels, independent native and filtered full pixels, plus approved
  RGB photography. It checks real keys/mouse/moving touch, sessions and command
  loops, complete frequency ranges, native scrolling, 60/120/240Hz clocks,
  independent holds, paused themes, queued intent, reduced opacity feedback,
  actual viewport/route ownership, context-state restoration, early disposal
  and 32 fresh offline exports. Native Lissajous has a documented sparse-fill
  exception; its complete 600-sample original model remains functional.
  Record isolated native/full timing with `node tools/profile-raster-instruments.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`. Measurement records findings and
  leaves final timing gates open.
- `node tools/verify-raster-film.js http://127.0.0.1:4173` covers v4 Datamosh,
  CRT Receiver and VHS Tracking: 39 unchanged original SVGs, exact approved
  photo crops, 67,256 original engine states and complete original pixel planes.
  It checks actual photographic output, native mouse/keys/moving touch, full
  cameras and optical type, 60/120/240Hz stories, independent caller/viewport
  holds, paused themes, queued intent, reduced opacity feedback, startup
  disposal, LiveTiles/routes and 24 fresh network-blocked exports. CRT retains
  the supplied 180×136px tube and all 34 intrinsic 180×2px scanline SVG roots.
  Full compositions retain all original blocks, trails, strips, channels and
  tracking rows. Record isolated native/full timing with
  `node tools/profile-raster-film.js http://127.0.0.1:4173 --cpu=1` or `--cpu=4`;
  the reports retain the original 32ms paint cap and leave final timing gates open.
- `node tools/verify-raster-processing.js http://127.0.0.1:4173` covers v4
  Pixel Sort, Threshold Mosaic, Interlace Field and Posterize Lens: all 69
  unchanged SVGs, 76,864 original states, 6,240 complete typed-model checkpoints
  and every original pixel plane. It checks actual photographic projections,
  the exact sort horizon, all 21 initial mosaic crops and live Bayer tiles,
  alternating field rows and complete RGB quantization; physical input and
  vertical touch scrolling, 96 native and 96 full layouts, 60/120/240Hz stories,
  independent holds, paused themes, queued intent, interrupted reduced feedback,
  startup disposal, LiveTiles/routes and 32 fresh offline exports. Full models
  retain the original complete sort, 6px mosaic, row fields and lens buffers.
  Record isolated native/full timing with `node tools/profile-raster-processing.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; measurements leave final timing
  gates open. Context-state notifications do not claim literal GPU reset tests.
- `node tools/verify-raster-signal.js http://127.0.0.1:4173` covers v4 Film
  Grain, Bitmap Marquee and Chromatic Type: all 597 original SVGs, 57,648
  original states, complete typed buffers and original Canvas planes. It
  checks exact native slots and intrinsic dimensions, live source projections,
  complete glyph loops and velocity trajectories, physical input and touch
  scrolling, native range input, 72 native and 72 full layouts, long stories
  at 60/120/240Hz, independent holds, queued intent, reduced feedback, startup
  disposal, LiveTiles/routes and 24 fresh offline exports. Chromatic retains
  its exact sparse geometry through a documented fill exception; its neutral
  layer remains legible on light stages without changing the SVG payload.
  Record isolated timing with `node tools/profile-raster-signal.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`. Preserve dense-SVG startup and
  full-grain timing findings for the final audit; measurement is not a timing pass.
- `node tools/verify-ambient-fields.js http://127.0.0.1:4173` covers v4
  Constellation, Flow Field, Starfield Warp and Fireflies: all 257 unchanged
  SVG exports, 76,864 original states and complete original Canvas planes.
  Independent native checks cover the authored 35-node network and 12-firefly
  swarm, all 135 vector-field directions, and 24 rays projected from the full
  96-star flight. It checks compact type, real touch and scrolling, equivalent
  clocks, independent holds, queued Reset, interrupted opacity feedback,
  routes, LiveTiles, early cleanup and 32 fresh offline exports. Full views
  retain all original 28 particles, 72 tracers, 96 stars and 34 fireflies.
  SVG exports use `useAbsoluteBounds:false` to preserve painted stroke bounds
  for zero-axis vectors; never replace or edit the exported payloads.
  Record isolated timing with `node tools/profile-ambient-fields.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; retain findings for the final audit.
- `node tools/verify-skeuo-materials.js http://127.0.0.1:4173` covers v4
  Paper Plans, Frosted Pass and Dot Matrix Clock: three unchanged product SVGs,
  twenty losslessly reconstructed original fixtures and complete full models.
  It checks 168 layouts, actual materials/photo pixels, all six task fields,
  independent motion at 60/120/240Hz, interrupted page/digit paint, real keys
  and moving touch, capture cleanup, independent holds, routes, LiveTiles and
  24 fresh offline exports. Native clock power-off is blank; full preserves
  all 142 original dots. Keep retained digit nodes in place during reversals.
  Figma's blur radius 14 matches CSS blur(7px) in this measured composition;
  this is not a general conversion rule. Font fringes are not byte-exact.
  Use `tools/build-posters.js ... --initial --ids=...` for these paused initial
  frames, including the authored 12:45 clock. The default capture is unchanged.
  Record isolated timing with `node tools/profile-skeuo-materials.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; final timing gates stay open.
- `node tools/verify-skeuo-tactile.js http://127.0.0.1:4173` covers v4
  Listening Dial, Split-Flap Timer and Embossed Key: fourteen original product
  SVGs, four verification-only glyphs, twelve original fixtures and complete
  original full programs. It checks authored native starts, four complete
  25-minute timer sessions, 192 layouts including 286×196px landing cards,
  independent 60/120/240Hz motion,
  complete six-second stories, real mouse/keys/moving touch, painted reversals,
  independent holds, actual capture cleanup, routes, LiveTiles and 24 fresh
  offline exports. Preserve the original 260-degree dial law, timer poll/cap/
  reset/restart and key saving/disabled behavior. Keep all drum layers present
  at first paint, preserve full card surfaces/seams and retain visible layers
  during retargets. Do not discard historical source animation records.
  Native timer starts paused at 12:45 through an explicit checkpoint; full
  and Reset/restart retain 25:00. The undocked key uses a 240×216px root to
  keep its upper native composition at the authored stage origin. Three sparse
  fill exceptions preserve exact Figma sizes; other fit gates remain. Keep
  native key type at 13.5px at the reference size and at
  least 11px through press in landing cards; preserve the control geometry.
  Its responsive optical observer must disconnect during cleanup. Profile
  isolated eight-second stories with `node tools/profile-skeuo-tactile.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`. Record findings without passing
  final timing gates. Static motion debt still records the original timer's
  hidden-model curve; visible drums use the canonical recipe.
- `node tools/verify-skeuo-instruments.js http://127.0.0.1:4173` covers v4
  Needle Meter, Macro Keys and Tape Transport: twenty unchanged original SVGs,
  exact macro materials, twelve complete original fixtures and all full models.
  It checks 192 layouts, independent motion at 60/120/240Hz, complete source
  stories and four full tape sessions, actual mouse/keys/moving touch, retained
  paint on interruption, independent holds, early/active cleanup, cold routes,
  LiveTiles and 24 fresh network-blocked exports. Native starts are -3dB,
  right alignment and paused 90 seconds; full keeps -8dB, left and zero.
  Keep the meter's 380/32 visible spring separate from its original 135/15
  source solver. Macro retains all six formatting actions. Shared tape buttons
  own their actual implicit touch capture and release it during disposal.
  Closed native range thumbs require explicit capture transfer before release.
  Meter and macro use undocked 240×216px planes and documented sparse-fill
  exceptions. Full Macro's intrinsic Reset key remains original static debt.
  Touch cases use fresh contexts to isolate preceding native scroll momentum.
  Record isolated eight-second timing with `node tools/profile-skeuo-instruments.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; measurements leave timing gates open.
- `node tools/verify-ambient-cells.js http://127.0.0.1:4173` covers v4 Life,
  Reactive Bars and Glyph Rain: all 153 unchanged SVG assets, 57,648 original
  engine states, complete typed models and 333,273,600 original Canvas channels.
  Independent native checks cover the 14×9 toroidal colony and Float32 memory,
  all 24 signal bands and seventeen authored bar transforms, ten seeded glyph
  columns, original aperture dimensions and 4,838,400 dynamic Kana channels.
  It checks real input and touch scrolling, 72 native and 72 full layouts,
  equivalent clocks, independent holds, queued Reset, interrupted reduced
  feedback, early cleanup, routes, LiveTiles and 24 fresh offline exports.
  Full views retain the original 32×20 colony, all 24 bands, both glyph sets
  and complete responsive columns. Native Latin keeps the ten supplied SVGs;
  native Kana uses dynamic original glyph data. Life drawing owns touch inside
  its full canvas; vertical page scrolling remains available beside that field.
  Record isolated timing with `node tools/profile-ambient-cells.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; measurement is not a timing pass.
- `node tools/verify-ambient-atmospheres.js http://127.0.0.1:4173` covers v4
  Mesh Drift, Aurora Curtains and Rain Window: seven unchanged Figma SVGs,
  approved Aurora and Rain photographs, complete original full models and
  independent native projections. It checks actual uploaded curtain columns,
  photo displacement and rain pixels, real GPU loss/restoration, complete
  Canvas fallbacks, compact type, physical input and touch scrolling, equivalent
  clocks, independent holds, queued Reset, reduced feedback, startup disposal,
  routes, LiveTiles and 24 fresh offline exports. Full Aurora retains every
  original layer and column; its blur atlas has measured raster differences
  from original Canvas. Preserve those differences and performance findings
  for the final audit. Record isolated native/full timing with
  `node tools/profile-ambient-atmospheres.js http://127.0.0.1:4173 --cpu=1`
  or `--cpu=4`; measurement is not a timing pass.
- `node tools/verify-sound.js http://127.0.0.1:4173` covers all six v4
  Sound instruments: 58 unchanged SVGs, all 34 complete original fixtures,
  synthesis graphs, lossless noise/PCM buffers and original model/Canvas
  output. Native PCM uses the unchanged independently measured platform
  repeatability policy. It checks trusted activation and expired gestures,
  actual AudioContext suspension/closure/recovery, authored mute, independent
  holds, exact native pixels, real keys/mouse/moving touch and scrolling,
  60/120/240Hz clocks, compact full type, startup/route/viewport cleanup and
  48 fresh network-blocked exports. Test audio uses an inaudible MediaStream;
  speaker connections are rejected. Native drums use the Figma pattern while
  full keeps the original pattern. Native drone starts/resets at 85px; full
  keeps its complete original scroll range. Theremin keeps its complete audio
  range while its painted marker stays 9px inside the rounded field. Typing
  retains its exact sparse geometry through the documented fill exception.
  Record isolated timing with `node tools/profile-sound.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`. Each story first activates a
  real context through trusted input. Measurements leave final timing gates open.
- `node tools/verify-skeuo-controls.js http://127.0.0.1:4173` covers v4
  Soft Focus Switch, Desk Rocker and Satin Fader: nine unchanged original SVGs,
  twelve complete original fixtures, exact native materials and full behavior.
  It checks actual pixels, 168 layouts, native forms, keys/mouse/moving touch
  and scrolling, independent spring/toggle samples at 60/120/240Hz, interrupted
  retargeting, queued intent, independent holds, cleanup, cold routes, LiveTiles
  and 24 fresh offline exports. Native defaults are on/on/60; full retains
  off/off/72. The shell owns Toggle/Reset. Focus and Rocker have written sparse
  fill exceptions. Glyph antialiasing fringes are measured separately from peak
  color coverage; do not claim byte-exact fringes. These controls create no audio.
  Record isolated timing with `node tools/profile-skeuo-controls.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; retain findings for the final audit.

- `node tools/verify-skeuo-mechanisms.js http://127.0.0.1:4173` covers v4
  Mechanical Counter, Pocket Lighter and Tear-Off Note:4 unchanged product
  SVGs,12 outlined glyph references and 12 complete original fixtures. Its 13
  groups cover the entire 10000-value counter domain, original ignition and
  strict tear models, exact geometry/materials, independent canonical motion,
  192 layouts, physical input and moving touch, independent holds, actual
  implicit/explicit capture release, early cleanup,36 live source stories,
  repeated painted interruptions, cold routes, LiveTiles and 24 fresh offline
  exports. Keep native starts 0783/open+lit/fresh and complete original full
  defaults. Counter uses canonical drums; lighter retains its original 1.4 s
  alternating flicker with the named ease-in-out token. Note retains original
  greater-than 14 tear logic beneath its 380/32 visible release spring. Full
  note uses 400×560 with complete readable copy. Held paper release clears
  ownership immediately and defers visual release until resume. Reduced
  root fades require relative containing blocks, correct paint order and
  stable opacity compositing. Preserve the lighter’s sparse-fill exception.
  Record isolated timing with `node tools/profile-skeuo-mechanisms.js
  http://127.0.0.1:4173 --cpu=1` or`--cpu=4`; measurements leave gates open.
- `node tools/verify-skeuo-devices.js http://127.0.0.1:4173` covers v4
  Sealed Letter, Pocket Synth and Activity Capsule: five unchanged supplied
  SVGs and fourteen complete original fixtures, including native PCM under
  the unchanged localized cleanup policy. Its 22 groups cover canonical
  press/dissolve/Undo, all four 380/32 knob springs, complete original models,
  192 moving layouts, actual trusted and failed/recovered inaudible audio,
  mouse/keys/moving touch, independent holds, capture cleanup, 36 source
  stories, 48 retargets, themes/focus, photo resolution, cold routes/LiveTiles
  and 24 fresh offline exports. Native synth seeds visual G without sound;
  full retains all seventeen keys. Native capsule seeds playing at43 seconds;
  full starts paused. Reuse verified Magnolia800/1600 variants and preserve
  licence comments in exports. Exact four-color functional knobs and the
  capsule's sparse geometry follow Figma. Paused Escape/shortcuts must be
  consumed immediately. CSSOM rounded outline widths need a small boundary
  correction when copied so actual device-pixel focus width stays unchanged.
  Retarget paint is exact except the documented full-normal capsule bound of
  one RGB level in one pixel; source and geometry remain exact. Record isolated
  timing with `node tools/profile-skeuo-devices.js http://127.0.0.1:4173
  --cpu=1` or `--cpu=4`; measurements leave timing gates open.
- `node tools/verify-skeuo-media.js http://127.0.0.1:4173` covers v4
  Turntable and Satin Foil Card: ten unchanged supplied SVGs and eight complete
  original fixtures. Its sixteen groups cover canonical platter/arm/foil/glare
  and rate-indicator motion, 128 moving layouts, 72 byte-identical painted
  retargets, physical focus/keys/scaled mouse/moving touch, real scrolling and
  capture release, independent holds and early cleanup, 24 original-model
  stories, complete membership copy/emblem, approved portrait resolution,
  cold routes/LiveTiles and 16 fresh network-blocked exports. Native starts
  retain exact stopped/flat Figma geometry. Full retains both original models;
  its responsive foil grid reserves header/photo/member rows. Rate labels and
  markers live inside the Stage-owned speed action; measure their local
  geometry independently of the shared button's press scale, including font
  resizing while held. Preserve focused source buttons during retained-arm
  reconciliation. Both demos stay silent. Reuse portraitC1 at 800px for native
  and portable views and 1600px for full detail, with complete attribution.
  Record isolated timing with `node tools/profile-skeuo-media.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; measurements leave gates open.
- `node tools/verify-drams-sliders.js http://127.0.0.1:4173` covers v4
  Dirty Rollin' Slider, Dimpled Slider and Dynamic Slider. Fourteen groups cover
  26 unchanged product SVG layers, three whole-ball references, twenty frozen
  original fixtures, 180 layouts, independent 380/32 release at 60/120/240Hz,
  72 byte-identical painted retargets,48 physical elastic-edge drags, pressure
  and translation agreement, real mouse/moving touch and scrolling,
  independent caller/viewport holds and controlled document signals, queued
  intent, capture and early cleanup, eighteen full
  source stories, twelve cold route/LiveTiles cases and 24 fresh offline exports.
  Native uses a 324×168 plane at reference (24,20); full preserves complete
  original copy and continuous models in 400×520 with a 368×320 source plane.
  Dirty's explicit camera maps values 0/62/100 to centres 70/204/302. Native
  Dimpled activates the original nine-step branch and preserves the supplied
  235px mid-flight checkpoint; normal startup settles to 247px, while reduced
  startup stays still until input. Dynamic keeps byte-unchanged curves inside
  tightly bounded masks. Its original 300ms scale/reversal law supplies only
  unpainted input geometry; visible pressure uses canonical 80/250ms motion.
  Reduced native fades retain the actual painted node; full retains stable
  source field identity and explicitly copies focus appearance. Promote focus
  rings and retained paint consistently to protect compact raster continuity.
  Preserve Dirty/Dynamic sparse-fill exceptions. The shared source file has
  twelve untouched siblings; only their generated module URL/hash may change.
  Record isolated timing with `node tools/profile-drams-sliders.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; measurements leave gates open.

- `node tools/verify-drams-rails.js http://127.0.0.1:4173` covers v4
  Square, Trackin’ and Long Rollin’ sliders. Fifteen groups preserve 42 supplied
  product SVGs, one stripe reference and 12 independent original DOM/CSS fixtures.
  They cover 180 layouts, 72 exact painted retargets, 48 real elastic-edge drags,
  moving touch, 18 complete full source stories, 12 cold route/LiveTiles cases
  and 24 fresh offline exports. Fixed 2 px/5 px fill caps retain stable original
  left-cap pixels while only the interior grows and the right cap translates.
  Long’s six delayed marks sample head history at 258/218/178/138/98/58 ms;
  keep baked SVG alpha once, and roll the supplied glint without its shadow.
  Reduced motion fades the retained still without animated trails. All three
  original full programs stay continuous and have fixed input widths.
  Native 324×168 fitting at reference 24,20 preserves exact Figma geometry;
  full 400×520 retains complete 368×320 source models and copy. Keep their
  documented sparse-fill exceptions and all 12 shared-file siblings unchanged.
  Record isolated timing with `node tools/profile-drams-rails.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; timing gates remain open.

- `node tools/verify-drams-detents.js http://127.0.0.1:4173` covers v4
  Rollin’ Dot Slider, Rollin’ Stepper and Standard Volume. Fifteen groups cover
  36 unchanged product SVGs, nine references and 12 independent source fixtures;
  180 layouts, 72 physical drags, 18 full source stories, 12 cold route/LiveTiles
  cases and 24 fresh offline exports. Keep six/three original detents and
  Volume’s upward delta + 0.35×rightward delta law. Source thumb paths are 0.2/0.2/0.1, not a shared index.
  Native Dot/Stepper start at supplied mid-flight checkpoints; reduced stays
  still until input. Native Stepper hops use the 380/32/1 two-axis spring and
  exact 80/40 ms history with parent alpha 1/12 and 1/6 once. Scale all six source
  label SVGs around their captured anchors to at least 11.1 px optical size;
  preserve their roots and the mandatory text gate. Volume’s 100/130 camera
  maps values 0/100 to centres 175/45; preserve the 99 px reference cap and stable
  lower-cap pixels. Full inputs stay outside actual retained paint so focus
  and capture survive every fade. Always write view variables to the live
  plane. Immediate semantic numeral/color changes exclude only measured
  glyph bounds plus 2 px AA, under 8% crop; reduced full paint stays fully exact.
  Preserve complete original controllers/copy, full Volume’s initial 50 and
  all 12 shared-file siblings. Keep Dot/Volume sparse-fill exceptions.
  Record isolated timing with `node tools/profile-drams-detents.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; final timing gates remain open.

- `node tools/verify-drams-volumes.js http://127.0.0.1:4173` covers v4
  Empty, Hidden and Visible Track Volume: eight exact SVG layers, twelve frozen
  original captures, 180 layouts, 72 whole-control byte-identical retargets,
  72 physical drags, eighteen full stories, twelve cold routes/LiveTiles,
  moving touch and 24 fresh offline exports. Preserve their 120/112/128 px
  native travel cameras, faint 1×161 Hidden guide, fixed fill cap and complete
  original relative rotary laws, arcs, copy and full initial value 0. Source
  knob paths are 0.8/0.0/0.1. Keep full inputs outside retained paint and write
  view variables to the live plane. Drain source style instrumentation after
  render, retain one analytic segment and prune invisible fade planes; 21,600
  rapid inputs verify bounded storage, complete settling and cleanup. Preserve
  the three sparse-fill exceptions and all twelve shared-file siblings.
  Record isolated timing with `node tools/profile-drams-volumes.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; final timing gates remain open.

- Published Empty/Hidden/Visible volume renderers scope the full view-angle
  property to the current live rotor and guard unchanged readout/theme writes.
  Preserve this optimization when extending their host: inheriting the view
  property through the complete original scene invalidates static arc/tick
  styles on every frame. The historical batch helpers remain frozen. The
  renderer follow-up preserves 144 whole-stage baseline/candidate frames and
  all 16 emitted-source groups. Record new timing with
  `node tools/profile-drams-volume-render.js http://127.0.0.1:4173 --cpu=1`
  or `--cpu=4`; preserve the earlier performance report and keep final gates open.

- `node tools/verify-drams-objects.js http://127.0.0.1:4173` covers v4
  Rollin' Ball Surprise, Rollin' Search and Ball Pop: seventeen unchanged leaf
  SVGs, one captured editable-capsule primitive and twelve original fixtures.
  Thirty groups cover 264 native/full/short layouts, 108 interrupted paint
  boundaries, 36 complete stories, actual mouse/keys/touch, native editing and
  undo, ordered held submission, 21,600 rapid retargets, twelve cold routes and
  LiveTiles cases, independent holds, focus/contrast, cleanup and 24 fresh
  offline exports. Full retains complete original virtual models and copy.
  Short stages expand text within the available Stage width and adapt optical
  control size only enough to preserve nonoverlap and 44px minimum targets.
  Keep proxies aligned and outside retained paint; never synchronize attached
  hidden input values, which can split native undo groups. Clip both supplied
  native query/caret artwork and the stable input inside the morphing capsule.
  Retarget masks cover only measured immediate semantic ink/caret changes;
  normal Search focus and its bounded native clip-edge raster have separate
  proofs. Captured leave/window blur must release pressure and capture, cancel
  blurred clicks, and preserve held source clocks. Pop's dynamic 60px reformed
  sphere uses 400/150ms swaps beneath the exact eight-wedge reference. Keep the
  two sparse-fill exceptions and all twelve optimized shared-file siblings.
  Record isolated timing with `node tools/profile-drams-objects.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; prepared-font measurements leave
  cold-route, Lighthouse and final site-wide gates open.

- `node tools/verify-drams-dials.js http://127.0.0.1:4173` covers v4 Dark,
  Line, Fingerin' and Hollin' Volume. Fourteen groups retain eleven exact SVGs,
  sixteen original captures, 864 layouts, 320 measured paint boundaries,
  24 independent six-second renderer stories, physical mouse/keys/touch,
  57,600 rapid retargets, independent holds, 32 fresh offline exports and
  sixteen cold route/LiveTiles cases. Native uses a 324×168 plane at reference
  origin 24,20; full keeps all original rotary models and copy in 400×584 with
  a 368×320 source plane. Keep the native Line caption at least 11.1px, all seven
  Finger ridges, ten native Hollin holes and all twelve original full labels.
  Hollin's physical hover boundary is its scaled 160px square plate; empty
  scene hover must not reveal labels, while focus and dragging do. Skip writes
  of unchanged text and attributes; preserve the original controller programs.
  Keep source inputs outside retained paint, minimum 44px physical targets,
  compact focus against its actual material and all eight shared-file siblings.
  Preserve four documented sparse-fill exceptions. Record isolated timing with
  `node tools/profile-drams-dials.js http://127.0.0.1:4173 --cpu=1` or `--cpu=4`;
  preserve the pre-optimization measurements and leave final timing gates open.

- `node tools/verify-drams-knobs.js http://127.0.0.1:4173` covers v4 3-Way
  Knob, Round Knob Slider and Joypad. Sixteen groups retain fifteen exact SVGs,
  twelve original captures, 132 layouts, 240 exact paint boundaries, eighteen
  independent six-second renderer stories, physical mouse/keys/touch, 43,200
  rapid retargets, independent holds, 24 fresh offline exports and twelve cold
  route/LiveTiles cases. Keep native MID, the authored arc pose and 58% label,
  and Joypad's (28,-20) offset. Full preserves the original 0/1/2 rotary model,
  real linear range and complete 12px circular joystick with any-keyup release.
  Rounded status telemetry must never supply joystick geometry. Preserve the
  exact source programs, current-rectangle input transport, native range keys,
  arm stroke width, stable input outside retained paint, 44px physical targets,
  11.1px optical type and the documented 3-Way sparse-fill exception. Visible
  focus belongs to retained paint; suppress duplicate global input outlines.
  Record isolated timing with `node tools/profile-drams-knobs.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; preserve all trace findings and
  leave cold-route, Lighthouse and final site-wide timing gates open.

- `node tools/verify-drams-rotary.js http://127.0.0.1:4173` covers v4 Plus
  Minus Knob, Round On/Off Knob and Crankin’ Ball. Sixteen groups preserve 14
  exact supplied SVGs, twelve original captures, two supplemental DOM replays,
  complete full copy, unrounded signed/unbounded models and native activation.
  Keep native 0/on/0 seeds,90px/84px plates, the 140px orbit and exact 55,-39 ball
  pose. Full retains original−12..12 rounding/gain, off initial state and crank
  seam/modulo models. Source variables must supply geometry. Stable 44px inputs
  stay outside retained paint; physical presses must not release virtual Dock
  feedback. Preserve 132 layouts,36 press cases,320 pixel boundaries, independent
  holds, actual listener cleanup, concurrent instances and 24 offline exports.
  Exact-size Plus/On-Off fill exceptions change only the low-fill gate. Keep
  the controlled canceled-first-CDP-tap diagnostic for final mobile audit;
  native browser clicks apply exactly once, with no manual touch fallback.
  Record isolated timing with `node tools/profile-drams-rotary.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; retain all outliers and leave
  cold-route, Lighthouse and final site-wide timing gates open.

- `node tools/verify-drams-objects-physics.js http://127.0.0.1:4173` covers v4
  Pendulum and Bouncin' Ball. Preserve all 22 supplied SVG roots/slots, captured
  trail alpha, 24 original captures and complete three-body source programs.
  Native seeds are the raised right pendulum and y[0,-122,0]; full starts at
  original zero poses and retains all original materials, controls and copy.
  Normal source integration runs at canonical 60Hz, independent of paint.
  Reduced hosts leave source RAF callbacks dormant and retain semantic poses
  with 150ms fades; include view-offset removal when deciding to retain paint.
  The first raised native bounce grab rebases y to -65 with a -57 view offset;
  normal release returns that offset with 380/32/1. Keep the invertible camera's
  scaled shadow/blur support and 44px input bounds, even at unbounded heights.
  Stable inputs stay outside retained paint. Update focus on every fading
  plane; use retained 44px focus geometry outside the camera world when the
  material shrinks below 20px. Thumbnail Tab order remains Stage-owned.
  The verifier checks original models, actual emitted clock/projection,
  renderer/pressure/pixels, native mouse/keys/single and multiple touch,
  independent holds, queued intent, listeners, startup, concurrency, stress,
  offline exports and desktop/mobile routes/LiveTiles. It also checks actual
  clock interruption and independent press owners. Pass the
  cached event time through Dock cancellation; a second ctx.now read can move
  ahead of the pending input. Keyup/blur, pointer release and virtual release
  clear only their own pressure owners.
  Record isolated timing with
  `node tools/profile-drams-objects-physics.js http://127.0.0.1:4173
  --cpu=1` or `--cpu=4`; preserve all traces and keep final timing gates open.

- `node tools/verify-drams-switches-core.js http://127.0.0.1:4173` covers v4
  I/O, LED, Standard and Slurp switches. Keep the vertical 120px I/O housing,
  green LED housing, 92px dark Standard rail and unchanged orange Slurp vector;
  older 79px manifest descriptions describe the retained full controls.
  Six exact SVGs and seven captured primitive frames supply native artwork.
  Native starts on; full starts off and preserves the complete original event
  program, materials and copy. Direction resolves on release from dominant dx
  versus upward dy, ties use dy, and the threshold is strictly greater than
  12 source pixels. Preserve repeated assignments, cancellation coordinates
  and the next-click drag latch. Restore source coordinates through Stage zoom.
  Keep 44px physical targets, readable compact copy and Stage-owned Dock/Tab
  order. Normal travel uses the canonical 380/32/1 release spring; reduced motion
  retains 150ms fades and opacity press feedback.
  Resolve pending Web Animation pauses at their sampled currentTime, so a hold
  cannot advance one paint. Queue semantic intent while held, preserve separate
  key/pointer/virtual owners and clean up captures, listeners and retained paint.
  The verifier checks frozen original histories, exact native slots, actual
  input, interrupted paint, caller/viewport/document holds and offline exports.
  Record isolated timing with `node tools/profile-drams-switches-core.js
  http://127.0.0.1:4173 --cpu=1` or `--cpu=4`; keep final timing gates open.

- `node tools/verify-drams-switches-objects.js http://127.0.0.1:4173` covers
  nine additional physical switches and the release-spring correction for I/O,
  LED, Standard and Slurp. Preserve all 22 new SVG bytes, 36 new native nodes,
  the prior 13 native nodes and every original full program/endpoint/press pose.
  Normal motion uses 380/32/1 with 80ms press feedback, direct drag, 0.55 rubber
  banding and an eight-source-pixel overrun cap. Preserve release position and
  velocity, the strict 12px source threshold, dominant-direction/tie behavior,
  cancellation coordinates and the click latch. Resume held pointer movement
  without inventing release velocity. Keep the native reference seeds, full
  Coloured's true seed, all complete copy and stable 44px input targets. CLICK
  retains its center with an 11.6px optical floor; seven sparse-fill exceptions
  change only the fill gate. The verifier covers frozen original histories,
  full geometry, independent RK4 motion, actual input, holds, cleanup and 52
  offline exports. Record current timing with
  `node tools/profile-drams-switches-objects.js http://127.0.0.1:4173 --cpu=1,4`;
  preserve every trace and leave final timing gates open.

- `node tools/verify-drams-switches-banks.js http://127.0.0.1:4173` covers
  3-Way Switch, Pushin' 5'ers, Triple Light Switch, Fidget Poppin', Triple Push
  Buttons and Triple Switch. Preserve all 54 native nodes, 21 supplied SVGs,
  complete original full programs and each composition's independent seeds.
  Native Pushin' has five latches versus the full five-option radio group;
  native Fidget has fifteen bubbles versus all six original full domes.
  Native Triple Switch is horizontal/stacked; full keeps its vertical tracks.
  Keep exact slot-specific SVGs, intrinsic padding, direct cached live image
  references, canonical release motion, queued input and independent holds.
  Minimum 44px targets resolve overlapping trusted input by nearest control;
  preserve browser key activation, radio roving focus and cross-release
  suppression without capturing radio pointers or blocking Stage bubbling.
  Keep compact full captions centered with one constrained grid column and
  test actual 314/344px stages. 3-Way's sparse exception changes only fill;
  A/B/C keep their centers and 11.6px optical floor. Tests compare original
  states/geometry, RK4 motion and painted transforms, physical keys/mouse/touch,
  holds, cleanup, themes, compact text and 24 fresh offline exports/native remounts.
  Record timing with `node tools/profile-drams-switches-banks.js
  http://127.0.0.1:4173 --cpu=1,4`; preserve every trace and leave final gates open.

- `node tools/verify-drams-devices.js http://127.0.0.1:4173` covers v4
  Pocket Keys, Rover Shell, Clock Radio, Electric Shaver, Rotary Radio and Digital
  Rotary Radio. Preserve all 227 native nodes, 192 supplied SVGs, 24 immutable
  captures, complete literal original programs and independent native/full seeds.
  Native Clock starts at 07:30; native Digital starts at 52/on without audio; full keeps
  real clock/standby, complete station/note fixtures and original particle fields.
  Source integration stays at 60Hz; paint can run at 60/120/240Hz. Keep exact unrounded
  input transport, incremental clamp reversal, keyboard retargeting while held,
  44px nearest-control targets and cross-release suppression. Source event
  rebubbling must not recurse into host activation. Caller, viewport and document
  holds freeze clocks and queue intent independently; real audio is trusted-input
  gated and closes on disposal. Preserve canonical pressure/release, reduced
  retained fades, readable compact clock labels and complete Canvas/SVG particle
  alpha/aspect recovery. Tests cover 69,192 source states, 7,884 native geometry
  checks, 48 physical-input cases, 2,032 runtime checks and 24 fresh offline exports
  with native remounts. Record timing with `node tools/profile-drams-devices.js
  http://127.0.0.1:4173 --cpu=1,4`; retain every trace and leave final gates open.

- `node tools/verify-showcase-fields.js http://127.0.0.1:4173` covers v4
  Inertial Dot Field, Reactive Threads, Tactile Ballpit, Ripple Grid, Magnetic Line
  Field and Fading Pixel Trail. Preserve all 474 native nodes, 296 supplied SVGs,
  24 immutable captures and complete original full model statements/datasets.
  Native has 152 dots, 8 filaments, 42 balls, 153 squares, 90 needles and 22 blocks;
  full retains complete original grids, 36 filaments and 16 collision bodies.
  Keep fixed 60Hz integration, unrounded input, source-clock idle phases and exact
  native anchors. Threads sample original SVGs with matching Canvas/SVG clips;
  needle length scales in its own axis, preserving atan2 direction and stroke.
  Retained SVG references match complete IDs and remain local to their layer.
  Both native and full paint initial states while paused, before animation.
  Preserve real mouse/keys/moving touch, vertical scrolling, independent holds,
  queued intent, reduced 150ms fades, graphics recovery, cleanup and 24 fresh
  offline exports/native remounts. Tests compare 25,992 source states, 648 command
  witnesses, 216 source pixel checkpoints, 17,118 native geometry checks and 4,586
  renderer/runtime checks. Pixel's sparse exception changes only the fill gate.
  Record timing with `node tools/profile-showcase-fields.js
  http://127.0.0.1:4173 --cpu=1,4`; retain every trace and leave final gates open.

- `node tools/verify-showcase-spatial.js http://127.0.0.1:4173` covers v4
  Ribbons, Mesh Surface, Warp Tunnel and Converging Paths. Preserve 40 native
  slots, 33 supplied SVGs, seven Frame primitives and exact fractional paint
  offsets. Full retains all five 30-point strands, 48×101 surface samples,
  eighteen Warp frames/six rays and five complete C/S paths. Keep fixed 60Hz
  source integration, original texture deformation, native keys/wheel/moving
  touch, interrupted scroll ownership, queued Home, fractional End precision,
  independent holds, reduced fades, cleanup and complete Canvas/SVG fallback.
  Tests compare 12,996 source states, 324 command witnesses, 108 original pixels,
  exact native geometry, compact full typography, 32 physical-input cases,
  sixteen hold cases, actual graphics recovery and sixteen offline exports.
  Full Paths labels remain at least 11px on the actual 360px detail route.
  Record timing with `node tools/profile-showcase-spatial.js
  http://127.0.0.1:4173 --cpu=1,4`; retain all traces and final timing findings.

- `node tools/verify-showcase-final.js http://127.0.0.1:4173` covers v4 Path
  Follower, Mask Reveal, Circular Gallery, Toss & Stack, Tracing Story and Elastic
  Slider. Preserve 49 native slots, eleven unchanged supplied SVGs, seven approved
  photo slots, thirty Frames and exact native type. Full retains the complete
  original paths, seven gallery records, three cards, three chapters, copy and
  clamp/overpull models. Tests compare 25,992 source states, 2,107 geometry checks,
  actual keys/mouse/moving touch, interrupted card capture and Story replay,
  independent holds, queued input, reduced retained paint, equivalent clocks,
  readable compact full type and 24 fresh offline exports/native remounts. Detail
  photos resolve at 1600px before creation; tile/export photos stay at 800px.
  Story and Range sparse exceptions change only the fill gate. Record observations
  with `node tools/profile-showcase-final.js http://127.0.0.1:4173 --cpu=1,4`;
  keep the actual site-root document base, assert decoded photo sizes and preserve
  every trace. Final motion, cold-route and Lighthouse gates remain open.

- `node tools/verify-framer-data.js http://127.0.0.1:4173` covers v4 Formatted
  Metric, Rolling Balance, Focus Countdown and Revenue Summary. Preserve 22 native
  slots, two unchanged supplied SVGs and the active arc's 1.02734375px paint offset.
  Full keeps all original presets, currency/cent arithmetic, digit sequences,
  20/45/60-second sessions, financial records, chart samples and copy. Tests compare
  105,888 source states, exact geometry, native keys/mouse/moving touch, actual
  painted drum interruption, changed-digit fades, the 30% one-shot observer,
  queued intent, independent holds, light stages, readable compact type and
  sixteen fresh offline exports/native remounts. Balance Replay and selected-
  duration Focus Reset live in the shared Dock. Record observations with
  `node tools/profile-framer-data.js http://127.0.0.1:4173 --cpu=1,4`; preserve
  every trace and leave final cold-route/Lighthouse gates open.
- `node tools/verify-rolling-cache.js http://127.0.0.1:4173` compares Rolling
  Balance with its complete pre-cache definition. Preserve all ten faces per
  cylinder, original model/factory, arithmetic, timing, current-pose reversals,
  announcements and independent holds. Reuse nodes while the drum structure
  matches; invalidate detached trees and remeasure shared font metrics on paint.
  The same-time settlement pass still updates model-derived status and ARIA;
  only an unchanged Balance pose may skip its second motion paint. Require exact
  models, DOM, geometry and GPU PNGs across full/native themes, compact widths,
  reduced motion, 60/120/240Hz clocks, queued input, resize and disposal. Work
  counters do not establish frame rate. Retain the contended timing trials;
  CPU4, cold-route and Lighthouse acceptance remain open. Earlier private phase
  helpers, inputs and evidence stay frozen.
- Rolling Balance also memoizes fitted inline assignments while remeasuring
  overlay geometry and target typography on every paint. Its twelve-entry currency
  text cache keys value, currency and fraction count; native integers and the
  full/accessible two-decimal values remain distinct. `verify-rolling-cache.js`
  includes 24-step currency/payment stories, repeated eviction, target font changes
  and disposal in full/native normal/reduced modes. Keep its original model
  adapter and factory exact. `profile-final-framer.js` records all four scenes
  with current foundations and registry/Dock bootstrap; every run and outlier
  remains separate. Lower work counts do not establish the open CPU4 timing gate.
- `tools/stage-fit-ink.js` excludes empty transparent leaf targets from fill while
  retaining their geometry for overflow/text gates. Intrinsic media, visible text,
  surfaces, shadows and pseudo-elements still count. Run the 24 browser boundary
  checks in `tools/verify-stage-fit-geometry.js` after changing these rules.

- Stage and motion baselines are empty. Run both static audits with `--strict`
  locally; keep GitHub Actions disabled. `tools/motion-models.json` binds seven
  exact virtual model bodies in four demos. Their original code must remain
  unchanged; complete CSS and visible renderer code stay audited. Fractional
  seconds must retain their decimal point. Continuous source-loop frequencies
  and bounded 40ms animation staggers do not exempt UI transition durations.
- `tools/stage-component-controls.json` records Punch Card's intrinsic formatting
  Reset command and Figma 170:1830 geometry. Preserve all six native caps and the
  full keyboard. Exact markup/hash validation prevents a driver or changed button
  from inheriting that classification. All other demo replay/reset drivers remain
  shared Dock actions. Run `node --test tools/motion-audit.test.js
  tools/stage-component-controls.test.js` after changing either audit boundary.
- `node tools/verify-remediation-scope.js http://127.0.0.1:4173` checks 72
  native/full dark/light normal/reduced stories, actual painted timing, hidden
  model isolation, 128 formatting states and monotonic intrinsic Reset clocks.
  `node tools/verify-remediation-exports.js` checks 24 fresh network-blocked full
  exports at 390px. These supplement the original component suites and final
  motion/performance audits; they do not replace them.
- `node tools/verify-foundations.js http://127.0.0.1:4173` checks 1,644 declared
  native/full stage mounts across page themes and motion settings, plus eight
  exact Stage/Dock fixtures. Preserve the neutral 244 base, white glow at
  −36,−170, 14px light corner, 53×28 Drag and opaque dark Dock. Keep Stage palettes
  independent of the page theme. Global legacy aliases stay retired; Duotone's
  scoped mask-radius variable retains its original meaning.
- `node tools/verify-foundation-exports.js` checks 48 fresh network-blocked full
  exports at 390px. Run `node --test tools/export.shared.test.js` when changing
  the shared exporter or compiler. Normalize embedded SVG text to LF for
  deterministic output; do not edit original assets. Refresh all native posters
  when shared Stage/Dock visuals change. Final theme/contrast/performance audits
  remain separate acceptance work.

- The Piano Keys extension uses `tools/verify-sound-ext.js`,
  `tools/verify-sound-ext-audio.js`, `tools/verify-sound-ext-input.js`,
  `tools/verify-sound-ext-clocks.js`, `tools/verify-sound-ext-exports.js`,
  `tools/verify-sound-ext-holds.js`, `tools/verify-sound-ext-touch.js` and
  `tools/verify-sound-ext-pixels.js` against the local 4173 server. Preserve
  all fourteen exact Figma primitive layers, the silent E-key reference and
  separately classified three-layer Play Dock. Full keeps twelve chromatic
  C4—B4 notes, all note/shortcut labels, chords, recent twelve-note history
  and native moving-touch glissando. Keep the four sine partials, 4ms attack,
  2.8s decay, 180ms release and equal temperament; tests compare actual browser
  PCM with independent numerical samples for all twelve notes. Audio requires
  a fresh trusted gesture. Per-note and context generations reject expired
  resumes; all nodes stop/disconnect on hold and disposal. M toggles explicit
  mute. Source-clock Press retains 80ms/.97 and 250ms soft-pop release; compact
  labels counter-scale during presses. Six six-second 60/120/240Hz renderer
  stories, four hold stories, four native-touch stories and two fresh blocked-
  network full/native contexts supplement the actual input/raster checks.
  No new SVGs, photos or fill exceptions. Earlier private phase inputs and
  publication archives stay frozen; final performance/a11y audits remain open.

- The final three Skeuomorph extensions use `tools/verify-skeuo-ext.js`,
  `tools/verify-skeuo-ext-models.js`, `tools/verify-skeuo-ext-input.js`,
  `tools/verify-skeuo-ext-clocks.js`, `tools/verify-skeuo-ext-exports.js`,
  `tools/verify-skeuo-ext-holds.js`, `tools/verify-skeuo-ext-touch.js` and
  `tools/verify-skeuo-ext-pixels.js` against the local 4173 server. Preserve
  all 32 exact native art layers, nine shared Dock layers, three unchanged
  SVG files/slots and the approved portraitC1 slot with both original photo
  hashes and attribution. Native Wallet preserves the exact blue/violet v4
  card materials. Ticket keeps all eight bars, partial paper tearing and
  analytical 170/26/1 return; Lanyard uses all nineteen actual Verlet points,
  sixteen rope segments, two fixed anchors and rigid badge constraints at
  1/240s with 32 solver passes. Preserve gravity720, damping2.4, actual release
  momentum and the absolute eight-second settle boundary. Wallet keeps three
  complete card records, native listbox keys, drag selection, press ownership,
  interrupted 170/26/1 springs and the bounded 500ms sheen. Compact complete
  histories clear instructions and every visible glyph stays≥11px. Eighteen
  six-second 60/120/240Hz renderer stories, four nine-second deadline stories,
  twelve actual input/hold/touch/pixel stories per suite and six fresh blocked-
  network full/native export contexts supplement independent solver fixtures.
  No new fit exceptions. All 520 components are implemented; Pro seams and
  final acceptance remain. Earlier private helpers, inputs and publication
  evidence remain frozen. Functional clocks do not replace performance audits.

- Pro source policy lives in `js/shell/access.js`; keep its owner launch flag
  disabled until the owner chooses launch. Both Figma candidates stay free in
  the published 520-item catalog. Pro preview builds require an isolated
  `--pro-preview --output .artifacts/...` directory. Never activate this flag,
  take payments or change the Pricing SOON state as part of routine work.
  Run `node --test tools/pro-policy.test.js`, `node tools/verify-pro-registry.js`,
  `node tools/verify-pro.js http://127.0.0.1:4173` and
  `node tools/verify-pro-access.js http://127.0.0.1:4173`; package tests include
  actual CLI and MCP locked tools/resources. The shell locks every source tab
  and copy path while preview, notes and complete prompts remain free. Respect
  authoritative registry locks, pending clipboard intents and route generations.
  Keep the original 19×15 crown SVG at its captured 22px-frame offsets. The
  neutral badge and responsive source panel use shell styles, without changing
  Stage materials, demo code or portable exports. See `docs/pro-scaffolding.md`.
  These seams leave final motion, a11y, contrast, cold-route, Lighthouse and
  performance acceptance open. Keep earlier private phase evidence frozen.

- Multi-Step Loader keeps the exact five-row Figma 143:955 stencil. Its
  18px status marks, 16px spinner and 13/14px labels on 34px pitch are covered
  by `tools/stage-fit-allowlist.json` under the owner sparse-size clarification.
  The native reference is unchanged. A 150ms retained reference can inflate
  early measured fill; the eight-leaf measurement is 11.2%. This changes only
  low fill, leaving overflow, horizontal scroll and the 11px text gate strict.

- Run `node tools/verify-shell-accessibility.js http://127.0.0.1:4173` after
  changing shared shell names, tablists, density, source/table focus or text
  colors. It uses actual keys, clipboard intent and scrolling at 1440/390/360px
  in both themes. Keep the install Copy button outside the tablist, restrict
  density listeners to buttons, and match the search name to its text and shortcut.
  Light shell inks sit before the shared Stage marker so portable exports and
  independent Stage palettes stay unchanged. This focused suite does not close
  the remaining full accessibility, motion, Lighthouse or performance audits.

- Run `node tools/verify-shell-loading.js http://127.0.0.1:4173` after changing
  initial catalog fetching, the Home hero, shell intent handling or router startup.
  Keep one catalog response, retain the existing heading during hydration and
  preserve initial user scroll. Escape and navigation cancel queued actions;
  static agent configuration remains available if catalog loading fails. Tests
  cover 1440/390/375/360px, both themes and motion settings. Keep the original
  translucent 16px header blur; startup experiments are private evidence, not
  replacement artwork or accepted styles. Large hero text uses the existing
  darker orange token in light mode and must meet 3:1; ordinary text stays 4.5:1.

- `node tools/profile-final-showcase.js http://127.0.0.1:4173 --cpu=1,4`
  measures all ten Showcase field/spatial scenes with current foundations,
  prepared fonts, actual clocks and native/full desktop DPR 1 and compact DPR 2
  stages. Use `--ids=showcase-threads,showcase-magnet-lines` to isolate findings
  and `--output=.artifacts/...` for a phase-owned archive. Mesh includes its full
  twelve-second breath; Paths completes one six-second replay. Every run retains
  source hashes, raw traces, initialization/story long tasks and disposal checks.
  Set `PLAYWRIGHT_MODULE` and optionally `INTRX_CHROME_EXECUTABLE` to external
  installed tooling. Run it alone; recording a sample does not pass a timing
  gate. Earlier private inputs/helpers/evidence remain frozen. Compare renderer
  changes with captured original pixels and retain every trial and outlier.

- `node tools/verify-showcase-paths-render.js http://127.0.0.1:4173` checks
  Paths' actual DOM reads during normal/reduced native/full stories in both
  themes at desktop DPR 1 and compact DPR 2. Read actual scroll top and extent
  before the original SVG/counter writes; retain fractional browser positions,
  the complete original paths/copy, queued input and six-second replay.
  The spatial model verifier also executes the immutable original factories
  independently in the tested browser. States/clocks stay exact to captures;
  command streams and every RGBA channel must match that original execution
  exactly. Historical commands/pixel hashes remain immutable, and differences
  between browser backends are recorded without numeric or pixel tolerances.

- `node tools/audit-component-accessibility.js http://127.0.0.1:4173 --axe=C:/path/to/axe.min.js`
  scans initial component states using current Stage styles, decoded local
  assets and catalog full-photo references. Playwright and axe remain external
  audit dependencies. Use `--modes=full,thumb --motion=reduced,normal` for the
  complete desktop matrix; `--ids=...`, `--width=390` and `--output=.artifacts/...`
  select a focused fresh run. Preserve violations and incomplete results.
  The baseline has 726 rule violations across 140 components; this is an open
  triage list, not a conformance pass or a reason to suppress checks.
  `node tools/verify-forms-accessibility.js http://127.0.0.1:4173` checks Upload's
  visible name and real file chooser, selectable adjacent-month contrast and
  Signature's actual Tab/Space/Arrow drawing. Keep sample lettering decorative,
  the Canvas exposed and every native artwork layer unchanged. Full weekday
  and surrounding form palette repairs have a separate verifier below. The
  Forms new-input verifier awaits actual PointerEvent delivery after CDP touch
  moves, keeping its existing models, numeric tolerances and 118 checks.

- `node tools/verify-forms-themes.js http://127.0.0.1:4173` checks surrounding
  form text in independent shell/Stage palettes, both motion settings and
  desktop/mobile widths, valid named native picker/color input and 28 fresh
  offline full exports. Keep dark inner controls independent of surrounding
  Stage text. Full Slide retains the original `#7C7C7C` shimmer recipe over an
  approved `#101010` track; native art and all JavaScript models stay unchanged.
  New/extension full-view outlines compensate Stage zoom to preserve two
  physical pixels. The alternate light Floating Label uses neutral readable
  ink and the neutral Stage cutout. Refresh affected prompts and generated
  output. Initial form scans pass; incomplete results, other categories and
  final acceptance still need review. Historical pixel differences stay
  recorded; independent original renderings require exact channels and paint
  properties without numeric tolerances.

- `node tools/verify-component-semantics.js http://127.0.0.1:4173` checks actual
  browser accessibility-tree ownership, keyboard stories and 66 fresh offline
  full/native exports for 33 repaired components. Keep component-local headers
  out of document landmarks, interactive sparkline points exposed and the
  Context Meter's percentage independent of its response button. Preserve all
  42 heatmap cells in six rows, 24 compact hex bytes in four rows, six project
  records and all 336 scheduler slots in 48 rows. Scheduler rows use zero-height
  block boxes: Chromium 140 loses `display:contents` row ownership after native
  activation. Keep the original physical cell positions and eight-row native
  window. Native navigation retains its pointer/touch styles, Enter activation,
  owned Space release/cancellation and press paint. Inactive terminal panels
  are inert and leave Tab order. Both browser versions pass the focused checks;
  remaining contrast/name findings, incomplete review and final acceptance stay
  open. Earlier private phase helpers, original inputs and publication evidence
  remain frozen.
  Masonry controllers and verifiers select `.d-masonry-demo-card`, preserving
  all eight records and the native four-card limit across valid markup changes.
  The Data verifier samples real digit animations in the click microtask;
  protocol reads can outlive short fades. Navigation waits for the actual native
  journal scroll threshold before checking that the page stayed still. Keep
  the original data, timing, keyboard and page-scroll assertions intact.
  Raster field models execute the unchanged original source and byte-preserved
  observation programs in a separate current-browser context. Complete states,
  projections and full RGBA bytes require exact equality. Hidden-paint checks
  use those source-bound original references; run models before hidden-models.
  Preserve historical captures and their reported render differences, plus
  exact captured core-state comparisons. Never add numeric/pixel tolerances
  for browser-dependent derived projections. Play preserves its first Canvas
  readback and requires coherent exact buffers before/after Pause and held
  ticks. The FUI geometry loop covers its actual mounted instruments; keep all
  shared SVG hash checks. Earlier private helpers and captures stay frozen.
  Native projection pixel checks retain initial readback/repaint differences,
  prepare both default canvases for coherent reading and repaint before exact
  comparisons. Keep all source fields, clocks and projections fixed during
  preparation. These prepared surfaces do not prove first-paint or performance
  acceptance; retain the untouched-surface diagnostics.
  Instrument projection references match their existing Canvas pipelines:
  Engraving/Lissajous retain an unread paint plane and copy to a separate
  readback display; RGB keeps direct display reads and its existing
  `willReadFrequently` photo sampler. Keep original equations and the existing
  one-channel compositing threshold. Do not change production context options
  or supplied assets to accommodate an oracle sampling difference.
  Full Engraving/Lissajous/RGB viewports contain horizontal overscroll and
  permit vertical chaining. A fitted viewport with no vertical range must not
  trap page swipes. Preserve deliberate pan/zoom and run the unmodified native
  touch stories after scroll changes. Catalog/source-hash changes invalidate
  broad cached inputs: refresh affected checks or explicitly prove unchanged
  scoped dependencies while retaining original executed hashes and results.

- `node tools/verify-component-names.js http://127.0.0.1:4173` checks actual
  names and structured ownership for 49 repaired components, real keyboard and
  ordered clipboard feedback, and 98 fresh network-blocked full/native exports.
  Native Proximity, menu placeholders and accordion bars retain meaningful
  names from their original content. Inactive native File Tree and Scheduler
  expose activation buttons until their original contents open, then restore
  tree/grid ownership and the actual active descendant. Keep all twelve files,
  all 336 availability cells, three citation sources and full product records.
  Citation tooltips use neutral containers. Visible indices and primary labels
  lead accessible names; Copy/Retry/Copied feedback follows the existing async
  ownership. Full Award/Peel, gallery captions and piano keys have nonpainting
  DOM word boundaries outside original artwork text. Native geometry, complete
  models, clocks, assets and all CSS remain unchanged. Preserve initial failed
  pixel comparisons and independent original-render variance; calibrated full
  Scheduler scroll comparisons do not certify untouched initial scroll paint.
  Remaining contrast/name findings, manual review and final motion/performance
  acceptance stay open. Earlier private helpers and evidence remain frozen.

- Accessibility regression observers wait for actual clock progress, native
  pointer/viewport delivery and WAAPI pause readiness before the original
  assertions. Keep every planned coordinate, model equation and pixel bound.
  Macro's original-DOM oracle adds only the intentional root group role.
  Raster settling still requires six identical captures; preserve failed runs.
  Historical raw fixtures for Instruments and DRAMS devices use Chromium140;
  current native/full UI checks use Chrome158, with explicit per-group engine
  evidence. Do not recapture fixtures or relax numerical/pixel bounds to erase
  browser differences. The63affected-family regression is complete; full
  accessibility, motion and performance acceptance remain open.

- `node tools/verify-primary-names.js http://127.0.0.1:4173` checks thirteen
  further primary-name repairs, actual desktop/compact AX names,32real
  normal/reduced keyboard stories and26fresh network-blocked exports.
  Visible indices/captions and native fast/smooth belong in names; coincident
  Glitch paint layers speak once. Target metrics have computed descriptions.
  Anonymous inter-element word boundaries preserve supplied TEXT and geometry.
  Wheel dataset checks read actual captions, not substrings of accessible names.
  Image pixel oracles retain the existing CPU sampling context and read both
  independent paint planes through separate copies; preserve exact pixel bounds.
  Portable reveals wait for their actual source deadline/completion. Immutable
  image model/render captures and the complete SVG reference suite use140;
  current158 naming, image input/artwork/paint/exports are recorded separately.
  Retain158SVG first-read/held raster differences for final renderer review;
  do not claim them passed by using another engine. Broader name/contrast/manual
  accessibility and motion/cold-route/Lighthouse/CPU4 acceptance remain open.

- `node tools/verify-remaining-names.js http://127.0.0.1:4173` checks thirteen
  final primary-label repairs with actual desktop/compact names, normal/reduced
  keyboard stories and fresh blocked-network full/native exports. Fraction names
  follow the active caption; native scan/satellite names follow actual paint.
  Thinking retains literal 4s/6s copy. Table rows retain original projects/years.
  Full glass, lighter, note and foil names belong to presentation adapters;
  keep their embedded original controllers, kernels and model markup unchanged.
  Trading checks follow panel identity after reorder, and retained inert copies
  stay outside control queries. Native lighter Dock names include visible Press.
  Anonymous word boundaries preserve the original text geometry and all CSS.
  Scoped label review does not establish whole-catalog accessibility or final
  motion/performance acceptance. Keep earlier private phase evidence frozen.

- `node tools/verify-threads-render.js http://127.0.0.1:4173` compares the
  current Threads model and renderer to its immutable local before-definition.
  The native preview may defer its pure hidden full-drawing commands; preserve
  source state, clocks, draw/notification counts, historical paint reads,
  recorder styles, witnesses and disposal. Its existing `onDraw` hook is only
  a dirty notification; this opt-in does not promise lazy payloads to arbitrary
  external observers. Full mode keeps eager drawing. The complete original
  native renderer keeps every column, neighborhood sample and SVG texture.
  Dispose pending command snapshots. Runtime observers track requested Canvas
  transforms in double precision: getTransform may expose float32 translation.
  Keep the original1e-9geometry bound and exact RGBA/premultiplied comparisons.
  Sample the first actual60Hz source frame at120/240Hz without advancing it
  early. Current-browser renderer stories complement the historical model
  suite; measured improvements do not close the remaining CPU4 timing gate.

- `node tools/verify-component-palettes.js http://127.0.0.1:4173` covers the
  full-view ink repairs for Accordion Type, Magic Underline, Number Slot,
  Highlighter Swipe, Fraction Slider, Bar Race, Sparkline, Price Tape and Radar.
  Keep their original controller hashes, HTML, geometry and native artwork.
  Full-only palette selectors use Stage mode, which exists before first layout;
  initialize readable ink without a transition from native colors. Preserve
  dark tooltip/selected-well ink and both signs of live price feedback. Checks
  cover 144 exact layouts, 72 exact native crops and 18 fresh offline palettes
  at two widths, themes and motion settings. Listed Stage text is measured
  against the conservative light Kit surface; photographic captions and the
  remaining catalog require separate review. Initial axe findings stay archived
  beside settled observations. Native Figma ink and CPU4 timing remain open.

- `node tools/verify-interface-palettes.js http://127.0.0.1:4173` covers twelve
  full interface palettes: active pill, image menu, breadcrumb, morphing tabs,
  day/night, notification badge, polish stages, liquid progress caption,
  masonry, swap, image table and inertial notes. Preserve all original controller
  hashes, HTML, metadata and native artwork. Keep each selector component-first;
  `:is(.stage[data-mode="full"] *)` reads the Stage context at the original
  specificity without adding namespace debt. Tests compare fresh layouts and
  exports, then apply/remove the exact CSS suffix on one paused native instance.
  Native clock, DOM, every computed style and PNG bytes must remain exact in
  the GPU-disabled CSS comparison, and new rules must match zero native nodes.
  Default-GPU readback differences remain open; this comparison does not replace
  actual GPU behavior or timing checks. Direct CDP capture avoids capture
  preparation changes. Retain one priming readback before the native baseline,
  the observed startup/first-read pixel variance and its original-source controls.
  Do not add a pixel tolerance or claim cold
  GPU determinism. Check opaque control surfaces separately from Stage ink.
  Native gray ink, filled-progress text, other states and final audits stay open.

- `node tools/verify-agent-palettes.js http://127.0.0.1:4173` covers nine full
  terminal/agent palettes: Boot, Scanner, Authorization, Hex, Trading, Pipeline,
  Compaction, Streaming and Diff. Keep original CSS as an exact prefix and all
  controller, HTML, metadata, native artwork and geometry unchanged. Transparent
  full-view copy follows Stage ink; existing dark panels keep their local ink.
  Light status text uses readable shades of the original green/red/orange.
  Hex proximity keeps its ordered shades and selected-cell treatment. The
  verifier records absent dynamic Boot/Streaming fields before a held initial
  clock produces content, then requires every named field to render and pass
  in each theme elsewhere in the run. Preserve those missing-field observations.
  Native PNG comparisons use the explicit GPU-disabled CSS roundtrip; default
  GPU behavior, primary AX names and timing remain separate checks. Do not
  change animation time in the palette harness: full geometry now uses the
  actual runtime-held pose. The fixture accepts only the recorded Diff optical
  revision, checked against its complete original factory and exact insertions.
  Do not
  introduce a pixel tolerance or alter earlier private evidence. Native ink,
  other states, manual incomplete findings and final acceptance remain open.

- `node tools/verify-diff-holds.js http://127.0.0.1:4173` covers Diff Review's
  local full-view initialization and newly created CSS transitions under holds.
  Preserve its complete native program, CSS, HTML, original eight arrivals,
  code, decisions and two-second outcome hold. Initial fitted rows settle before
  their authored transitions are restored. Re-fits retain the original 12px/2px
  initial stencil until the first source frame or applied decision/replay.
  New running transitions created
  during a runtime hold pause at creation; one runtime-owned wake job resumes
  only live paused jobs, and cleanup cancels every owned job. Existing paused
  transitions retain their current pose. Tests use actual first-frame samples,
  physical decisions, mid-entrance pause, real viewport/caller ownership,
  ordered held intents, disposal and fresh offline holds. Document visibility
  coverage is explicitly instrumented because this headless browser kept all
  background/minimized pages visible. Native PNG comparisons alone disable GPU
  rendering; no animation pose is normalized in the hold harness. Keep the
  original failures and all earlier private evidence frozen. Shared runtime,
  Stage, assets and native geometry remain unchanged; final audits stay open.

- `node tools/verify-interactive-palettes.js http://127.0.0.1:4173` and
  `node tools/verify-interactive-palette-states.js http://127.0.0.1:4173` cover
  ten full previews: Theme Shift, Mesh, Autocomplete, Creator, Cipher, Timeline,
  Cursors, Sound Kit, LED Display and Liquid. Preserve the original CSS prefix,
  all HTML/metadata/native artwork and exact controller edit contracts. Theme
  Shift keeps every original interpolated channel; full text keeps that ink
  when readable and uses black/white only when required. Timeline exposes its
  original reached state for a full-only optical floor; progress math and native
  opacity stay exact. Contrast checks include ancestor opacity. Liquid retains
  its white percentage with a 1.5 physical-pixel dark halo. Check its actual
  paint at 0/68/100 and both widths. Cipher's twelve random glyph strings are
  incidental artwork; retain their raw axe findings and exact original ink.
  Keep Autocomplete's original word arrivals and distinguish transient fades
  from settled text. Native comparisons remain exact same-instance CSS
  roundtrips with GPU disabled; they do not certify default-GPU timing. Final
  catalog accessibility, native ink preference, motion and performance remain
  open. Earlier private inputs, helpers and evidence stay frozen.

- `tools/profile-shell-cold.js` records actual cold navigation and trusted warm
  caption input, keeping the font-ready heading/two-frame Stage method, every
  trace, all outliers and actual Back scroll. `tools/profile-shell-lighthouse.js`
  retains all default mobile runs and raw transfer totals. Run performance
  collection sequentially without other heavy own checks. Do not certify a
  route from its best sample or count demo-only fonts as shell bytes without
  checking actual font use. The 25 Nov investigation ships no production
  changes; cold readiness and Lighthouse failures remain open alongside CPU4
  motion timing. Keep rejected prototypes and prior evidence immutable.
  Cold collection uses external `PLAYWRIGHT_MODULE` and
  `INTRX_CHROME_EXECUTABLE`; Lighthouse uses `CHROME_PATH` and an external
  `--lighthouse` CLI path. Neither adds site dependencies.

- `node tools/verify-page-visibility.js http://127.0.0.1:4173` uses Node 22+
  and `INTRX_CHROME_EXECUTABLE` (or `CHROME_PATH`) to test native background tabs
  through Chrome's CDP connection. Do not use Playwright focus emulation or
  replace document visibility getters in this audit. Require trusted native
  hide/show events, exact held clocks, callback counts, DOM, Canvas/WebGL calls,
  controller inspection state and existing animation times. Returning to the
  foreground must preserve a caller pause and exclude hidden wall time. The
  default matrix covers all components in full/thumbnail and normal/reduced
  modes. Every run gets a new output directory with source hashes and complete
  compressed evidence. This checks mounted motion; input-specific hidden intent,
  offscreen behavior, frame rate and other final audits remain separate.

- `node tools/verify-final-accessibility-fixes.js http://127.0.0.1:4173`
  covers Folding Map's full-view Stage ink and Draggable Cards' decorative image
  alternatives. Keep the original Map CSS as a prefix and its complete controller
  unchanged. Full headings and metrics follow Stage ink; dark map panels keep
  their local palette. The compass remains readable at the original .6 reduced
  opacity floor. Cards change only the full image alternative to empty, keeping
  each visible caption and complete named keyboard control. Preserve all HTML,
  native artwork, photographs, models, timing and geometry. Tests cover exact
  initial layouts, native CSS roundtrips, actual map keys and offline exports.
  GPU-disabled native CSS comparisons do not certify default-GPU timing. Keep
  raw axe incomplete results and earlier private evidence; final audits stay open.

- `node tools/verify-visible-names.js http://127.0.0.1:4173` covers the 22
  retained full-view label/name findings with actual browser accessibility trees,
  deliberate keys, both Stage themes, desktop/compact widths and offline exports.
  Match reviewed primary labels; keep supporting data, symbolic icons, repeated
  paint layers and inactive slide text distinct. Preserve all raw axe findings.
  Authorization's result stamp replaces its hidden scanning label. Flip Grid's
  full name includes its object identity and Return in one stable label; its
  current note is an accessible description. Orbit's full name includes Target link and
  its selected satellite, with the actual painted readout as its description.
  Cache note copy without frame-time layout reads and avoid repeated ARIA writes.
  Keep the original controllers except the fixture's exact full-only ARIA
  insertions; all CSS, HTML, models, timing and native names/artwork stay intact.
  The matrix includes focused normal-motion cases for the two changed controls.
  These checks do not certify speech recognition, every intermediate frame,
  native contrast or full-catalog accessibility. Earlier private evidence stays
  frozen; final motion and performance audits remain open.

- The visible-name matrix now includes seven additional symbolic/shortcut cases,
  for 29 components. Match complete word tokens so A does not match the letter
  inside Play. Preserve the old fixture unchanged; `semantic-controller.js`
  strictly applies/reverses the newer metadata-only edits. Full OP-1 keys retain
  their note names and add their printed shortcuts; its full Mute name is stable.
  Both original audio kernels remain byte-identical. Snap mode uses a native
  action button with its current caption and next-mode instruction. Full archive
  card names contain both face labels in one stable identity while their existing
  pressed state and descriptions convey pinning and the current note. Audio is
  disabled only in naming test contexts; those contexts do not prove synthesis.
  `verify-component-semantics.js` also checks the already-repaired named groups,
  the city's declared ninety-parcel image alternative, and the Scheduler's
  inactive launcher/active 40-cell native window. Keep both browser proofs,
  historical counterexamples, raw incomplete results and earlier fixtures.

- The naming matrix also checks full Solid Signal, Broken Grid, Coast Pass and
  Turntable identities through deliberate toggles, held Enter input and queued
  return. Descriptions retain current state, complete pass-face copy and next
  instructions; native names, all CSS/HTML and both original Skeuomorph kernels
  remain unchanged. `toggle-names-before.json` adds exact reversible migrations
  without changing earlier fixtures. Normal-motion stories include these four.
  `tools/audit-dock-toggle-names.js` records actual AX names before/after trusted
  Enter on initial visible shared-Dock toggles; retain all drifts for review.
  Its reduced dark desktop sample is an inventory, not catalog acceptance.
  Glass Pass cross-context blur pixels have two observed outcomes even with
  identical source; retain the failed oracle and same-source repeatability.
  Native DOM/styles/geometry remain exact; do not claim every PNG pair is exact
  or infer a universal raster bound from the observed channel delta of four.

- `docs/performance/final-shell-2026-11-25.json` records the later current-source
  shell measurements: six Lighthouse scores of 100 and 24 Elastic cold/warm
  heading/Stage paints below 300ms. Preserve the earlier failed runs. Home's
  570116 raw bytes include two demo-only Inter fonts; actual shell font use and
  a demo-module-blocked provenance control support excluding their 230969 bytes,
  leaving 339147 shell bytes under §4.6. The control is not a performance run.
  All 520 component definitions stay unchanged. Native Threads CPU4 remains
  about 19–20fps; rejected pixel/timing trials remain private and are not shipped.
  `profile-final-showcase.js --reference=FILE` accepts complete definitions with
  only JS changed in memory and records the candidate hash. Keep the V23 raw
  evidence frozen after publication; complete motion/performance/manual audits
  remain open.

- Shared Dock controls may declare `ariaLabel` alongside `action` and the
  initial visible `label`. Include all visible aliases in the fixed identity;
  Snake includes Play, Pause and Resume. `registry.js` associates an invisible
  sibling through `aria-labelledby` on boot; generated portable bootstrap uses
  the same helper. Keep the base Stage, runtime and exporter files frozen.
  All 520 demo controllers, styles, HTML, prompts, artwork and models remain
  unchanged in this metadata pass. `tools/verify-dock-control-names.js` checks
  actual browser names, full/native views, normal/reduced motion, held Space,
  compact layout, offline exports, ID collisions, independent Stages and replay.
  `tools/audit-dock-toggle-names.js --require-stable` rejects drift in its initial
  visible Dock sample. Keep the first Snake alias failures and the fixture's
  asset-resolver/footer-selector mistakes; earlier evidence remains frozen.

- `tools/audit-component-accessibility.js` loads the current registry before
  Stage creation and installs the local asset resolver afterwards. Register each
  case so shared Dock `ariaLabel` bindings are exercised; retain every raw flag
  and incomplete result. `tools/verify-elastic-theme.js` checks synchronous
  initial ink before fonts/source frames, caller-held native/full geometry,
  deliberate tab input and four fresh offline exports. Elastic's light palette
  applies from Stage metadata before fitting; native reset paints Drafts at its
  final ink. Keep the original controller, HTML, metadata and spring unchanged.
  Eight GPU-disabled dark CSS roundtrips require exact PNG bytes. Default-GPU
  comparisons are diagnostic, with all failed captures retained; do not infer
  a universal raster bound or CPU4 acceptance. The current bulk review retains
  47 raw flags and 616 incomplete results, including a separate Thinking Drawer
  label follow-up. Earlier private evidence and helpers remain frozen.
  The exemplar Shimmer pause assertion waits for `paused` with no pending
  browser task, then requires identical background, hold time and pause state
  across speed/suspension changes. Preserve the earlier Chrome 158 fixed-time
  pause/speed failures and mixed-source baseline diagnostic. The revised
  precondition and a passing Chromium 140 suite do not establish those failures'
  cause or complete broader browser/timing acceptance.
