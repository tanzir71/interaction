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
  glyph sizes while its full view keeps 400×320 geometry. Portrait Reveal's
  native C3 photograph still requires source and licence verification.
  Record native/full timing with `node tools/profile-raster-simulations.js
  http://127.0.0.1:4173 --cpu=4` or `--cpu=1`.
