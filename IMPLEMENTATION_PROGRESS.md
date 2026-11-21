# Handoff 3 implementation

The complete work order is `CODEX_HANDOFF_3.md`, with motion requirements in
`MOTION_SYSTEM.md` and tile mappings in `INTRX-handover/manifest/components.json`.
The supplied handover is preserved in `INTRX-handover/`.

## Phase 0 — Foundations

- Added the v4 neutral primitives, semantic dark/light themes, compatibility
  aliases, spacing, radius, elevation and motion tokens.
- Self-hosted Geist and Geist Mono with their OFL licence; removed Google Fonts.
- Added shared button, chip, badge, icon, dock, keyboard and tile primitives.
- Kept legacy demo material variables scoped to `.demo-stage` until Phase 4.
- Installed the supplied motion checker and its existing 168-demo baseline.

Verification: registry and roadmap checks pass; motion has no regressions against
the supplied baseline; the browser suite passes 560 checks, 399 previews and 97
offline exports on desktop/mobile. The foundation kit was rendered in dark and
light modes and its local fonts, geometry and reduced-motion tokens were checked.

The diagnostic stage audit runs with 0 failed boots, 399 missing design sizes,
59 overflow, 6 horizontal scroll, 197 text below 11px and 62 low-fill results.
These are the pending stage/remediation work, not an accepted final audit.
Stage and generated-registry checks become available in Phases 1 and 2.

Foundation commit: `62726f3`. The owner subsequently requested direct commits
and pushes without PRs; the initial foundations PR has been closed.

## Phase 1 — Stage contract

- Declared metadata for all 399 existing demos, using the v4 manifest's gestures
  and themes, category size presets and explicit intentional-overflow entries.
- Replaced leaf-based sizing with declared sizes and a ResizeObserver, safe
  areas, full/thumb context, shared actions and dock controls.
- Added LiveTiles with desktop/touch caps of 6/1, background suspension,
  keyboard pause and explicit touch opt-in for hover/drag interactions.
- Reworked lifecycle scheduling to freeze remaining timer delays and animation
  frames without native wakeups, retain a virtual clock, support speed changes,
  pause animations and disconnect runtime-created observers during cleanup.
- Elastic Tabs exposes Next and Replay actions and cleans up its observer.
- Added stage validation, runtime tests and focused browser contract checks.

Verification: all 399 preview boots and 97 offline exports pass the full 560-check
browser suite. Seven deterministic lifecycle/metadata/fit tests pass, as do the
focused browser action, cleanup, cap, touch and keyboard checks. Registry and
motion checks pass. The stage audit covers all 399 demos with 0 failed boots,
0 missing design sizes, 59 overflow, 3 horizontal scroll, 293 text below 11px
and 77 low-fill results. Its remaining fit gates are required to pass in Phase 4.

The stage verifier records existing chrome/control debt explicitly for 391 demos;
baseline mode rejects regressions, while `--strict` will require full remediation.
This is not a claim that the redesigned demo compositions are finished.

Stage contract commit: `914685c`, pushed directly to `main`.

## Phase 2 — Registry and agents

- Generated 806 deterministic artifacts for the 399 current demos: public index,
  full component items, categories, schema, tokens, stage contract, shadcn items,
  both llms files and the browser's shared export data.
- Moved portable HTML generation to `js/shell/export.js`. Exports include the
  stage context, declared fit, runtime cleanup, controls and embedded local fonts
  and photography. Generated output normalizes source line endings for CI.
- Added the `@tanziro/intrx` CLI/MCP package (the unscoped npm name is occupied),
  local/HTTP registries, ETag revalidation, ranked search, safe file installation,
  seven MCP tools, resources and two prompts.
- Added the INTRX agent skill, its stage/motion references and seven documentation
  sources. The Docs view is part of the following shell phase.
- CI verifies Node 18 and 22, rejects stale generated output and stages only the
  public static files for hosting; npm dependencies are excluded.

Verification: registry/stage/motion checks pass, generated output is current,
seven package tests and seven runtime tests pass, the skill validates, and all
560 browser checks pass (399 previews and 97 offline exports). A generated Elastic
Tabs document also passes offline action/replay checks. MCP Inspector connects
through the local npx package route and lists the seven required tools. The stage
audit remains at the Phase 1 diagnostic counts, with no boot or metadata failures.

The npm package is implemented and tested locally. Publishing it to npm is a
separate owner action; setup docs provide working local commands in the meantime.

Phase 2 commit: `5b6dfd9`, pushed to `main`; GitHub verification passed on Node
18 and 22 and the static deployment succeeded. The public GitHub registry returns
399 entries. The Vercel mirror returned HTTP 402 during verification, so the
default client retries the GitHub registry when that mirror is unavailable.

## Phase 3 — Routed shell

- Replaced the single renderer with plain-script home, library, detail, docs,
  router, shared UI and palette modules. Legacy hashes normalize to current
  routes; Back restores filters, sorting, loaded batches and scroll position.
- Matched the supplied desktop/mobile shell layouts, including grouped Browse,
  full detail pages, viewport/theme/speed/fullscreen tools, accessible source
  tabs, sticky mobile copy actions and the agent setup views.
- Added keyboard fuzzy search with static native posters, scope controls,
  highlighted matches, code/prompt shortcuts, Escape and focus restoration.
- Moved catalog discovery to generated metadata and lazily loaded source modules,
  animation libraries and portable assets. Module hashes prevent stale demo code.
  Added a dependency-free gzip development server and native poster generator.
- Removed hard-coded registry totals and preserved historical comparison/roadmap
  content in Docs. Counts now reflect the implemented catalog, including zero
  new v4 entries until Phase 5, rather than Figma's placeholder totals.
- Ported browser verifiers to the new routes. Regression checks cover collapsed
  mobile stage geometry, nonempty palette Escape, focus restoration and
  fullscreen. A fractional scroll endpoint now completes the reading highlight.

Verification: 651 browser checks pass, covering all 399 lazy previews and 97
offline exports. The 32 targeted interaction checks, desktop/touch lifecycle
checks, ten runtime/shell tests and eight CLI/MCP tests pass. Registry, metadata,
motion baseline, roadmap and generated-output checks pass. Detail first paint
was 26ms locally. Final mobile Lighthouse scores are 93 for home and 100 for
Elastic Tabs detail; home transfers 282,700 bytes before interaction, below the
400KB budget. Reports and screenshots are in the local verification artifacts.

The complete stage audit has zero failed boots and zero missing design sizes.
It still finds 61 overflow, 3 horizontal scroll, 294 text below 11px and 76
low-fill results. These are pending Phase 4 gates. Existing demo compositions,
391 chrome/control debts and 168 motion debts are not claimed complete here.
Search posters capture those current native demos and must be refreshed after
their redesign. The npm package remains unpublished; UI/docs link working local
setup and state that npm instructions become available after publication.

Phase 3 commit: `29a942c`, pushed directly to `main`. Node 18/22 CI and both
Pages deployment jobs passed. A public-browser check confirmed the home catalog,
lazy detail, dock action, portable export and mobile stage geometry.

## Phase 4 — Remediation in progress

Bucket A now includes all fifteen existing Buttons & Micro demos, plus Elastic
Tabs and Toast Stack. All seventeen implementations render
their compact Figma heroes without a surrounding demo panel or internal replay/reset
toolbar. Shared dock actions, keyboard behavior, cancellation, reduced-motion
poses and standalone exports are covered by `tools/verify-exemplars.js`.

- Downloaded the original Figma SVGs without changing paths or intrinsic sizes.
  `assets/demo-assets.json` records their local paths alongside the existing
  photographic assets; `ASSET_ART_DIRECTION.md` records their Figma provenance.
- Previews resolve original local files. Portable exports load content-hashed
  asset/runtime bundles and embed the same files. This avoids loading the whole
  font/photo bundle for a small preview icon and prevents stale asset versions.
- Fixed a shared lifecycle bug where Web Animations `play()` overrode an
  author's CSS pause. CSS loops now follow the stage suspension rule, including
  pseudo-elements in exported HTML. Newly created CSS transitions inherit the
  selected animation speed; the tab spring uses virtual-time 60Hz integration.
- The owner clarified that sparse controls must retain their exact v4 Figma
  geometry despite the 12% fill heuristic. Fourteen documented fill exceptions are
  measured against their reference geometry in `tools/stage-fit-allowlist.json`.
  No overflow, scroll or text-size gates were relaxed.
- Refreshing posters can target changed IDs, and registry generation leaves
  unchanged output files untouched. Stale preview-request failures after a view
  is disposed no longer appear as errors in the next view.

The second control group preserves the compact v4 artwork and adds an ambient
2000ms sheen, intent-driven arrow hops with one-cycle touch playback, radial
feedback measured from the live fractional padding box, and a held squash with
an interruptible spring release. Ripple stays under the pointer when stage zoom
and active transforms are combined. Jelly Press handles outside release,
cancellation, key repeats and replay without leaving a held state behind. The
16px arrow and 80px radial glow are the original Figma SVGs.

The remaining button group adds reversible twin labels, a gray eight-dot like
burst, queued badge updates, the three-way Light/Dark/Auto selector, a four-anchor
tooltip toolbar, four additive polish layers and a seeded sprite celebration.
The three-way selector and four polish layers follow the v4 reference rather
than the superseded celestial switch and five-stage artwork. Auto preference
tracks system changes, tooltip focus/Escape and touch share the same hint state,
and timers cancel cleanly when the user interrupts an automatic demonstration.
Reset restarts the badge's complete arrival interval, and pointer departure
restores the currently focused tooltip anchor. The browser also verifies the
badge's separate 260/400/500ms travel/opacity/scale channels, the selector's
mirrored 1px overshoot and the polish action's 80/250ms press/release timings.
Confetti uses the original SVG sprites with a virtual-time 60Hz simulation.
Its reduced-motion confirmation is a still fan. The new SVG size checks also
found Chrome shortening the 121×1px beam highlight at fractional zoom; explicit
matching image dimensions preserve its original width.

Focused verification: 282 exemplar behavior, reduced-motion, namespace,
native-size, original SVG geometry and offline-export checks pass. The 32 existing interaction checks,
desktop/touch lifecycle suite, 12 runtime/shell tests and eight CLI/MCP tests pass.
The chrome/control baseline has shrunk from 391 to 374 demos and motion debt
from 168 to 154. These are incremental reductions; bucket A and Phase 4 remain
incomplete. Seventeen native search posters have been refreshed.

The final broad browser run passes 651 checks, all 399 lazy preview boots and 97
offline exports. The full audit records 0 failed boots, 0 missing sizes, 61
overflow, 3 horizontal scroll, 276 tiny-text and 75 low-fill offenders; all fourteen
approved geometry exceptions validate. None of the seventeen remediated IDs has an
overflow, horizontal-scroll or tiny-text failure. The global fit gate remains
unmet while the other demos are still being remediated.

Detail's collapsed source now uses generated previews of the actual first 18
displayed lines and the complete document's line count. This removes the portable
asset bundle from initial detail loading. Copy and Expand still load the complete
portable source. Asynchronous copy retains the selected format, gives preparation
feedback and starts its clipboard write during the initiating gesture. The
registry now generates 1,205 artifacts, including 399 source previews.

The browser's Inter Latin face is an unmodified distribution from the same font
revision, with matching glyph/advance metrics and the existing full face retained
for other supported characters. Critical fonts are preloaded for their routes.
Final mobile Lighthouse scores are 99 for home (292,279 bytes) and 100 for Elastic
Tabs detail (356,146 bytes), both with a 1.0s LCP. The latest local route-opening
first-paint measurement is 35ms. This preserves the shell performance gates while
adding the new artwork and complete-source copy behavior.

The first six controls and preview-performance changes were committed as
`2fabf60` and pushed to `main`. Node 18/22 verification and Pages deployment
passed, followed by a public-browser check of the catalog, lazy source loading,
keyboard actions, portable clipboard export, mobile geometry and checkbox input.

The next four controls were committed as `ccec511` and pushed to `main`. Node
18/22 verification and Pages deployment passed. The public-browser check covered
pause, native pointer/keyboard input, original SVG loading, portable clipboard
source, held/outside release, mobile readability and clean network/console output.

## Phase 4 — Existing Forms & Inputs

All ten existing form demos now use their v4 Figma compositions: Floating Label,
Underline Grow, Error Shake, Counter Ring, One-Time Code, Password Strength,
Auto-Grow Textarea, Multi-Step Progress, Morphing Select and Elastic Range.
Together with the earlier controls, 27 existing demos have been remediated.
Phase 4 remains in progress.

The compact password, composer, wizard and selector heroes declare a separate
`thumbDesignSize`; the full `designSize` preserves complete native editing,
criteria, validation and workflow panels in detail and portable HTML. The shell,
registry schema, generated catalog, source exporter and MCP response carry that
contract. Fitting remains deterministic from metadata. Ten native search posters
have been refreshed and ten original Figma SVG files are recorded with their
intrinsic dimensions and provenance. The healthy selector dot reuses the
byte-identical Toast Stack asset.

The form suite passes 169 checks, covering actual clipboard paste and browser
autofill, native Enter submission, cancellation of validation timers, password
selection preservation, growing and capped notes, validated multi-step completion,
independent radio groups, compact option scrolling, scaled pointer math and real
touch dragging with vertical page scrolling preserved. That touch test exposed Chrome applying its native range value
after a captured custom drag; the form now retains its measured value during
those native input events. Suspension and disposal cancel pending range work.
All ten portable exports boot offline, and native text and SVG dimensions pass
at 372×264 and 286×196.

The shared-runtime regression checks pass: 282 exemplar checks, desktop/touch
lifecycle checks, 13 runtime/shell tests and eight CLI/MCP tests. The stage
baseline shrinks from 374 to 364 demos and motion debt from 154 to 151. There
are 22 validated geometry exceptions, limited to sparse Figma compositions;
the overflow, scroll and text gates are unchanged. The audit now also measures
native field values and placeholders. Its current totals are 0 failed boots,
0 missing sizes, 60 overflow, 3 horizontal scroll, 266 tiny-text and 75 low-fill
offenders. None of the ten forms fails overflow, horizontal scroll or text size.
The remaining global failures belong to demos still awaiting remediation.
The broad browser suite passes 651 checks, all 399 lazy preview boots and 97
offline exports after the form and hero-sizing changes.

Final quiet mobile Lighthouse runs score 100 for home (292,172 bytes) and 99
for Password Strength detail (357,531 bytes), both with a 0.96s LCP. The form
previews retain the lightweight initial source path; complete portable assets
load only when source is requested.

The earlier seven-control group was committed as `414213a` and pushed to `main`.
Node 18/22 verification, Pages deployment and the public-browser control smoke
check passed.

## Phase 4 — Layout controls and navigation

Eleven more existing Layout & UI demos now follow their v4 references: Bottom
Sheet, Radial Menu, Command Palette, Scrub Number, Context Menu, Resizable Split,
Border Glow Card, Drag to Reorder, Zoom Into UI, Bento Spotlight and Swap Card.
Together with the earlier work, 38 existing demos have been remediated. This
continues bucket A; the remaining remediation buckets are still pending.

The implementations retain captured drag, velocity projection, local coordinate
math, keyboard editing, fuzzy ranking, submenu placement and five-row full
reordering. The v4 scrub modifier and split-stop hints govern their updated
Shift-times-ten and thirds behavior. Native heroes preserve the original geometry;
the full compositions retain their complete controls and state. All 23 supplied
SVGs keep their bytes, layer slots and intrinsic dimensions, with provenance in
`ASSET_ART_DIRECTION.md`. Eleven native search posters have been refreshed.

The new `tools/verify-layout.js` passes 190 checks. It covers mouse and real touch
capture/release, snap springs and suspension, precise keyboard nudges, scoped
shortcuts, independent menu instances, compact local scrolling, validated submenu
placement, cancellation, keyboard reorder rollback and rapid zoom/swap
interruption. All eleven full exports boot and execute their primary behavior
offline. Original artwork geometry and visible text pass at 372x264 and 286x196.
The touch suite caught and fixed a long-press release click selecting the newly
opened menu row; the release is now consumed and the next deliberate tap works.

The broad suite passes 651 checks, all 399 lazy previews and 97 offline exports.
The 13 runtime/shell tests and eight CLI/MCP tests also pass. The stage baseline
shrinks from 364 to 353 demos and motion debt from 151 to 142, with no new
violations. The current global audit records 0 failed boots, 0 missing sizes,
60 overflow, 3 horizontal scroll, 255 tiny-text and 75 low-fill offenders. None
of these eleven demos is an offender. All 23 sparse-geometry exceptions validate;
the newly documented exception is the Figma 160x40 scrub field. Other gates are
unchanged and remain pending across the rest of the library.

The required mobile Lighthouse routes score 94 for home (about 293KB) and 100
for Elastic Tabs (about 356KB). An additional Command Palette cold-load check
exposed a needless complete-Inter download for absent keyboard glyphs and eager
layout of hidden search results. Symbols now use the existing system fallback
directly while Latin text stays Inter; real results are built on deliberate
open. Command Palette now scores 99 at about 359KB with a 0.96s LCP. The complete
source and offline interactions remain available.

The previous form group was committed as `c691bdc` and pushed to `main`. Node
18/22 verification, Pages deployment and all 169 form checks on the public site
passed. The published registry preserved full password source and its separate
hero geometry.

## Phase 4 — Inspector and desktop controls

Ten further Layout & UI demos now follow their v4 tiles: Collapsible Inspector,
Morphing Popover, Spotlight Reveal, Genie Minimize, Dock Magnify, Smooth
Accordion, Spring Modal, Directional Fill, Page Transition and Logo Marquee.
This brings existing-demo remediation to 48; bucket A is still in progress.

The inspector preserves the direct/resisted pull thresholds and carries release
velocity into the prescribed spring, with native touch cancellation and separator
keys. Popover retargeting measures the displayed surface before cancelling its
previous transition; full Profile, Alerts and Share content remains available.
Share writes the real link or selects it when clipboard access is unavailable.
The window measures its actual 20px dock tile, dock influence uses untransformed
centers, and accordion tracks remain interruptible. The local dialog owns focus
and completion state without stale hide timers. Page navigation mirrors forward
and back, retains one outgoing layer and preserves the shell route. Marquee pause
survives suspension and speed changes.

The ten supplied SVG files retain their bytes and dimensions. The Accordion's
identical right-chevron download reuses the original inspector file. Original
layer positions are also verified at 372x264, including the window stroke
overhang, all three dots and the whole two-row marquee artwork. The fitted roots
compensate for the shell's 4px optical raise; compact views preserve asset sizes
in their logical planes and keep visible text at least 11px. All ten native
search posters have been refreshed. Asset provenance is in ASSET_ART_DIRECTION.md.

The new `tools/verify-layout-controls.js` passes 194 checks for native mouse and
touch, cancellation, keyboard/focus, rapid reversals, suspension, authored pause,
full source actions offline, reduced-motion still frames, unique associations,
and exact SVG dimensions/positions. It verifies the minimized window's final
rectangle against the actual 20px dock tile and checks every visible hero at
372x264 and 286x196.

The broad suite passes 651 checks, all 399 lazy previews and 97 offline exports.
The 13 runtime/shell tests and eight CLI/MCP tests pass. Stage debt shrinks from
353 to 344 demos and motion debt from 142 to 133, with no new violations. The
global diagnostic audit records 0 failed boots, 0 missing sizes, 59 overflow,
3 horizontal scroll, 248 tiny-text and 71 low-fill offenders. None of these ten
demos is an offender. All 24 documented sparse-geometry exceptions validate;
Directional Fill retains its exact 140x40 Figma button. Other fit gates remain
unchanged and must pass across the full library before remediation is complete.

Quiet mobile Lighthouse checks score 95 for home (292,899 transferred bytes)
and 90 for Elastic Tabs (356,766 bytes), meeting both required performance gates.
The new previews continue to use local asset paths; complete embedded assets
load when portable source is requested.

Five Layout & UI demos remain: Masonry Filter, Table Image Peek, Caption Pull,
Flip Expand and Drag Carousel. Their exact v2 Figma photographs have been
retrieved for comparison; source IDs, authors and licence confirmation are still
being established before those new photos are published. The drawing library
preserves image hashes but does not supply the missing credits. The supplied
handover and the two photo-dependent registrations in demos.ui.js are unchanged.

The preceding eleven-layout group was committed as `6ba4317`, pushed to `main`,
and passed Node 18/22 verification, Pages deployment and all 190 public layout
checks, including complete exported Command/Context source and hero geometry.

## Phase 4 — Photographic layouts

Masonry Filter, Table Image Peek, Caption Pull, Flip Expand and Inertia Carousel
now match their v4 photo compositions. This brings existing-demo remediation to
53; bucket A and the remaining categories are still in progress. Full mode keeps
the original eight projects, five table rows, two independent captions, three
expanding cards and five carousel photographs. The seven other registrations
in demos.ui.js were compared against the previous commit and remain unchanged.

All seven photographs have verified free Unsplash sources and photographer
credits. Independent original-image comparisons have zero perceptual-hash
distance from the Figma exports. Local 1600px and 800px WebPs retain natural
aspect ratios; the supplied carousel pointer retains its original bytes and
28.5×29.25px dimensions. ASSET_ART_DIRECTION.md records canonical source URLs
and assets/photo-credits.json records both variants' SHA-256 checksums.

The shared stage resolves 1600px paths before creating full-preview images,
including images in inert templates; thumbnail and portable bundles resolve
800px variants. This avoids fetching both sizes on detail open and keeps full
previews at 1600px after copying code. Registry metadata and Notes retain the
credits, and portable HTML carries the source and licence URLs in comments.
Hidden rows and hero-only frames instantiate photographs when needed.

Filtering preserves DOM order and measures interrupted card positions before
cancelling transitions. Caption masks reverse their word stagger and maintain
independent hover, focus and pinned states. Table rows share one expanded strip
and stop their pointer-follow loop at rest. Shared expansion keeps local focus,
Escape and scrim behavior. Carousel dragging preserves horizontal capture,
vertical touch scrolling, time-based inertia, resisted bounds and spring
returns; cancellation restores the captured origin. Reduced motion and runtime
suspension apply to each interaction. All five search posters are refreshed.

The photo-layout browser verifier passes 188 checks for exact photo and pointer slots at
372×264, compact heroes at 286×264 and 286×196, readable full views at 390px, 375px and 360px,
native touch, cancellation, keyboard input, interruption, unique associations,
credits and complete offline exports. The broad suite passes 651 checks, all
399 lazy previews and 97 offline exports; the earlier layout-control suite
passes 194 checks. All 13 runtime/shell and eight CLI/MCP tests pass.

Stage debt shrinks from 344 to 340 demos and motion debt from 133 to 129, with
no new violations. None of these five demos is a stage-fit offender. The global
diagnostic audit remains incomplete: 0 failed boots, 0 missing sizes, 60 overflow,
3 horizontal scroll, 243 tiny-text and 69 low-fill offenders; all 24 documented
sparse-geometry exceptions validate. The untouched ambient demos can vary by
one overflow observation while animating. No new low-fill exception is needed
for these photo layouts, and no other fit gate has been relaxed.

Quiet mobile Lighthouse checks score 99 for home (295,106 transferred bytes)
and 90 for Elastic Tabs (358,972 bytes), satisfying both performance gates.
A final 375px check found masonry captions scaling below 11px; their logical
size is now 12.5px and the additional 375px/360px checks cover all five demos.
The supplied INTRX-handover folder is unchanged. The previous ten-control batch
was committed as 56452b1, pushed to main, and passed Node 18/22 verification,
Pages deployment and all 194 public layout-control checks.

## Phase 4 — Navigation and menus

All thirteen existing Navigation & Menus demos now follow their exact v4 tiles:
Fullscreen Overlay, Split Reveal, Circular Expand, Blur-Elevate Nav,
Hide-on-Scroll Nav, Active Pill Nav, Letter Cascade, Image Peek List,
Breadcrumb Collapse, Morphing Tabs, Rail to Sidebar, Burger to X and Mega Menu.
Existing-demo remediation reaches 66; the remaining 333 existing demos and the
121 new/extension entries still need their complete implementation and audit.

Full mode keeps the original route sets, project captions, complete journal
articles, hidden breadcrumb levels, distinct tab contents and heights, sidebar
profile and neighboring canvas, and all five mega-menu products. Native
keyboard, focus return, local Escape, pointer and touch behavior stay usable.
The full-screen overlay measures its native launcher and reversibly morphs
from that rectangle, including its radius. Transitions retarget from their
current positions; the sidebar interpolates a
label grid without moving its icon column or directly transitioning width.
Both scroll previews share one time-based driver, pause with the runtime, stop
autoplay after manual input and cease scheduling frames once settled. Reduced
motion holds the v4 preview pose and keeps opacity feedback. CSS and JavaScript
transitions resolve shared timing/easing tokens, including derived recipe values.

Nine original navigation SVGs retain their source bytes and intrinsic sizes;
the fourth rail icon reuses the byte-identical existing settings SVG. Aurora
and Silk have verified free Unsplash sources, exact comparisons against the v2
originals, photographer credits and checksums for both local WebP variants.
Silk is explicitly recorded as the source author's 3D render. Full previews use
1600px imagery; complete portable exports embed only 800px images. All 86 prior
portable image payloads, the existing font faces and all non-navigation stage
metadata were compared with the preceding commit and remain unchanged.

The navigation verifier passes 394 checks for complete interactions, measured
asset slots, interrupted transitions, scroll lifecycle, keyboard focus, native
touch, unique associations, compact heroes, full text at 390px/375px/360px and
all thirteen offline exports. Eleven browser geometry checks prove that native
photo masks and scroll viewports clip painted bounds while root/stage clipping
cannot exempt overflow. The auditor now includes single-character glyphs and
digits in its existing 11px text gate and excludes zero-area screen-reader masks.
This corrects measurement independently of component remediation; reductions
from that correction are not counted as additional remediated demos.

Four exact sparse Figma controls have documented fill-only exceptions: the
236×40px active-pill rail, 28×24px breadcrumb ellipsis, 140×160px sidebar and
44×44px burger button. The overflow, horizontal-scroll and typography gates
retain their original thresholds. Stage debt drops from 340 to 327 demos and
motion debt from 129 to 121, with no new violations. All 13 runtime/shell and
eight CLI/MCP tests pass. The supplied INTRX-handover folder is unchanged.

The five most layout-intensive transitions were profiled with 4× CPU slowdown:
median frame time is 16.7ms, the 95th percentile is at most 16.8ms and no frame
exceeded 34ms. Mobile Lighthouse scores 98 for home (295,765 transferred bytes)
and 90 for Elastic Tabs (359,631 bytes). An initial localhost:3000 home run
scored 86 with a longer task in the unchanged dot-field preview; the isolated
control on the previous 127.0.0.1:4173 setup scores 98. Both raw runs are retained
in local QA artifacts. No home code was changed to obtain the control result.

All thirteen native search posters are refreshed. Final broad verification passes
651 checks, all 399 lazy previews and 97 offline exports. The thirteen navigation
demos have no fit offenders. The global diagnostic remains incomplete and exits
1: 0 failed boots, 0 missing sizes, 34 overflow, 2 horizontal-scroll, 229 tiny-text
and 75 low-fill offenders. All 28 exact-geometry fill exceptions validate. These
global counts use the corrected native-mask measurement; untouched ambient
compositions can vary by one low-fill observation while animating.

## Phase 4 — Loaders and progress

All ten existing Loaders & Progress demos now follow their v4 compositions:
Liquid Progress, Word Cycle Preloader, Terminal Install, Skeleton Reveal,
Upload Morph, Percentage Preloader, Counter Reel, Dot Wave, Shape Morph and
Orbit Loader. Existing-demo remediation reaches 76; the remaining 323 existing
demos and 121 new/extension entries still require their full implementation
and audit. The preceding navigation batch was committed and pushed as 6955545,
passed both Node versions and deployment, and passed all 394 public navigation
checks and 41 published-artifact comparisons.

Full mode preserves both original paced count formulas, all five greetings and
language codes, the complete page reveals, both typed commands and output,
article content, upload file information and circumference, the three-dot sine
model, twelve-point shape interpolation, nine-point liquid surface, and all
three orbital radii with signed velocities and four trail samples. The compact
views retain the simpler five-dot wave, rounded shape and two orbital trains.
Native object activation preserves speed changes and liquid target updates;
the remaining controls live in the shared dock. Replay/reset cancels stale
frames, timers and owned digit animations. Counter clocks start on the runtime
RAF timestamp so replay after a pause cannot acquire a wall-clock offset.

Fourteen original SVGs retain their source bytes and intrinsic dimensions.
All sixteen visible SVG instances are checked by asset identity and actual
rendered geometry at 372×264, 286×264 and 286×196. Frame offsets include the
Figma stroke without allowing pixel-rounded CSS borders to shift artwork under
zoom. Skeleton Reveal uses the existing verified archGrid photograph, with its
1600px full view, 800px portable version and photographer credit. All 98 prior
portable image payloads, six font faces and non-loader stage records remain
unchanged. The supplied INTRX-handover folder is unchanged.

The new loader verifier passes 291 checks for original math and state sequences,
rapid cancellation, complete page/article content, keyboard and native touch,
full typography at 390px/375px/360px, exact SVG slots, compact views, runtime
suspension, reduced motion and all ten interactive offline exports. It includes
an actual offscreen/return check inside copied HTML. Reduced motion commits
requested progress immediately, holds the exact reference poses and retains
finite word opacity feedback without sliding the progress marker.

Full previews now have an independent runtime viewport hold. Scrolling a
preview offscreen freezes RAF, remaining timer delays, CSS loops and Web
Animations. Returning never overrides a caller pause, and offscreen/hidden wall
time is excluded from the virtual clock. The same runtime is embedded in copied
HTML. LiveTiles retains sole ownership of thumbnail visibility and live caps.
All sixteen runtime/shell and eight CLI/MCP tests pass; browser lifecycle checks
cover real scroll suspension, caller-pause preservation and CSS caret freezing.

The two counter views update only visible, changed digits and leaf progress
rules. All ten profiles have a 16.7ms median and at most 16.8ms 95th-percentile
frame time under 4× CPU slowdown; occasional longer frames remain recorded in
the raw QA results. Eight exact sparse controls have fill-only exceptions, with
Figma references and measured native dimensions. The other fit gates retain
their original thresholds. Stage debt drops from 327 to 317 demos and motion
debt from 121 to 118, with no new violations.

Final regression verification passes all 394 navigation checks, 651 broad
checks, all 399 lazy previews and 97 offline exports. All ten native search
posters are refreshed. Quiet mobile Lighthouse after the runtime change scores
92 for home (296,093 transferred bytes) and 90 for Elastic Tabs (359,959 bytes),
meeting both performance gates. The loader batch has no stage-fit offenders.
The global diagnostic still exits 1 for remaining work: 0 failed boots,
0 missing sizes, 34 overflow, 2 horizontal-scroll, 219 tiny-text and 75 low-fill
offenders; all 36 documented exact-geometry fill exceptions validate.

## Phase 4 — Data and numbers

The six existing Data & Numbers demos now use their v4 compositions: Donut
Sweep, Radar Sweep, Bar Race, Sparkline Scrub, Ticker Tape and Heatmap Reveal.
Visual remediation covers 82 existing demos. The remaining 317 existing demos
and 121 new/extension entries still require implementation and audit. The
preceding loader batch shipped as 6ee9a9a, with the browser-scroll verifier fix
in f3f2fe3; both commits passed CI and deployment. Its public verification passed
291 interaction checks, 49 committed-artifact comparisons and the real lifecycle
checks after waiting for actual offscreen geometry.

Full mode preserves the original four allocation shares, r48 circumference,
local progress windows and synchronized legend counts; all five polar targets,
angular hit rule and exponential decay; both ranked project datasets; all twelve
monthly values and nearest-sample math; five price baselines and signed ticks;
and every one of the 42 contribution values and dates. The compact views retain
the simpler reference compositions. Both illustrative market prices and the
static sparkline reference are distinguished from the original full datasets.
The active sparkline shows the actual monthly-data line. Touch selection stays
visible after release; keyboard selection uses the same sample function.

Sixteen original SVG files keep their source bytes. All seventeen image elements
are checked by identity, standard slots and unscaled compact geometry. Two empty
donut exports remain transparent 32px originals in their source layer slots.
The radar ray uses its exact fractional intrinsic size to avoid browser ratio
rounding. No photo, remote runtime URL or replacement vector is introduced.
All 112 preceding portable image payloads, six font faces and unrelated stage
records are unchanged. The supplied INTRX-handover folder is unchanged.

The data verifier passes 203 checks for the original models, interrupted FLIP,
changed-digit fades, native keyboard/touch, explicit runtime speed, complete
portable exports, selected tooltip readability, native SVG geometry, compact
views, reduced motion and class namespaces. All six interactive exports run
offline. Ranking captures the currently painted positions before canceling its
previous motion, then applies measured deltas with the stagger held in place.
Number fades batch reads and writes and share animation layers only across
changed character runs; unchanged numeric digits stay still. Hidden tape copies
receive current values without creating invisible animation layers.

The runtime no longer rescans all animations for each CSS transition at its
default 1× rate. Explicit speed changes still synchronize existing motion, and
new CSS motion at another speed still inherits it. New data Web Animations also
inherit the current explicit speed. Seventeen runtime/shell and eight CLI/MCP
tests pass. Real browser lifecycle checks preserve desktop/touch caps, native
opt-in, caller pauses and independent offscreen full-preview suspension.

All six interaction profiles have a 16.7ms median under 4× CPU slowdown after
fonts and source are ready. The final 95th percentiles range from 16.7ms to
33.4ms; price updates and heatmap reveals retain occasional longer frames in
the raw results. Those update-frame spikes remain a performance follow-up for
the completion audit; correctness checks do not establish a perfectly flat
60fps trace. Mobile Lighthouse scores 98 for home (296,262 transferred bytes)
and 100 for Elastic Tabs (360,128 bytes).

Final regression verification passes 394 navigation checks, 651 library checks,
all 399 lazy previews and 97 offline exports. Six native search posters are
refreshed. The data group has no stage-fit offenders. One exact 104×104 Figma
donut has a documented fill-only exception; no gate thresholds changed. Stage chrome/control debt drops from 317 to 311 demos and motion debt from 118 to 116,
with no new violations. The global audit still exits 1 for remaining work:
0 failed boots, 0 missing sizes, 34 overflow, 2 horizontal-scroll, 213 tiny-text
and 75 low-fill offenders. All 37 documented exact-geometry exceptions validate.

The owner follow-up adds a visible “Made by Tanzir Rahman” credit linked to
https://tanziro.com/ in the shared footer, with a fresh UI script cache version.
Library pages now include the same shared footer. The link is verified on home,
category, component and licence/credits pages at
1440px and 390px, including native keyboard focus and external-link attributes.

## Phase 4 — Maps: terrain and city

Topo Extrude and City Blocks now use their v4 native previews. Visual remediation
covers 84 existing demos; 315 existing demos and 121 new/extension entries remain.
The four other Maps & Geo models are still pending. The data/footer batch shipped
as 8720ab9, passed Node 18/22 CI and deployment, and passed the public 203-check
data suite, 41 committed-artifact comparisons and eight footer route/viewport
checks. The shared footer credit links to https://tanziro.com/.

Full mode preserves all 216 three-octave terrain values, seeded anchor values,
elevations and eleven snow cells, plus every original terrain fixture hash.
The city retains all 90 polygons, eight RNG draws per parcel, ring ordering,
original river path, five place-label positions, six historic parcels and their
bounds/path. Both original seed-42 geometry/order hashes remain exact; the next
seed is verified against all 720 RNG draws and every resulting vertex.

Four original terrain SVGs and eight city-face SVGs provide all 31 visible image
instances. Every file retains its original bytes and intrinsic dimensions. The
verifier checks each callsite and effective slot at 372×264, 286×264 and 286×196.
No image replaces a full mathematical model. All 128 preceding portable image
payloads, six font faces and 397 unrelated stage records remain unchanged; the
supplied INTRX-handover directory is untouched. The bundle has 140 image entries.

Both complete models fit a 280×238 composition; 224×168 hero planes preserve the
compact references. Controls live in the shared dock. Native keyboard and touch
inspect the same records and elevation values. City seed changes reuse parcel
nodes and apply transform-only FLIP; replay during an active reveal preserves
its current presentation. Thumbnail Replay visibly reveals all nine blocks and
retargets their current opacity when repeated. A single canvas projects every
terrain top face and extrusion wall from the
original field, 52° rotation and 900px perspective, while retaining the accessible
216-cell grid. Painted top-face hit testing selects the real cell. Terrain
transitions retarget each current height and use the runtime virtual clock.
Reduced motion holds flat/still geometry with finite opacity feedback.
Returned cleanup aborts input, disconnects observers and cancels owned motion;
all shared actions remain inert after disposal.

The focused map verifier passes 186 checks, including original mathematics,
interruption, native input, readable full/compact inspection, exact image slots,
caller pause/resume without hidden elapsed time and both complete interactive
offline exports. All 17 runtime/shell and eight CLI/MCP tests pass. Both native search posters are refreshed. The broad
suite passes 651 checks, all 399 lazy previews and 97 offline exports.

The final quiet interaction profiles have 16.7ms medians and 16.8ms 95th
percentiles under 4× CPU slowdown. The raw maxima are 33.3ms for terrain and
50ms for city, including all three deterministic seed changes. Projecting the
terrain in one canvas replaces hundreds of animated 3D layers. City reshuffles
batch transform reads, retain connected parcel nodes and track owned FLIP jobs
without repeatedly scanning native animations. Assembly transition events track
whether replay is still moving. Occasional seed-update frames remain recorded;
this is not a claim that every sampled frame stays below one refresh interval.

Quiet mobile Lighthouse scores 97 for home (296,467 transferred bytes) and
100 for Elastic Tabs (360,333 bytes) on the idle repeat. The first detail sample
scored 89 with LCP 3.59s and CLS .068; the repeat measured .96s and .00019. Both
raw reports are retained for the completion audit rather than hiding this
variance. No global runtime or shell code changed in this pair.

The terrain/city pair has no stage-fit offenders and needs no fill exceptions.
Chrome/control debt drops from 311 to 309 demos and motion debt from 116 to 114.
Both baselines only shrink. The full diagnostic still exits 1 for remaining
work: zero failed boots, zero missing sizes, 35 overflow, three horizontal-scroll,
211 tiny-text and 74 low-fill offenders. All 37 exact-geometry exceptions remain
valid. The unchanged line-mask-reveal appears in this run's overflow and
horizontal-scroll lists; it remains an existing remediation item.

## Phase 4 — Maps: globe, route, sites and isolines

The four remaining Maps & Geo demos now have their v4 previews. Visual
remediation covers 88 existing demos; 311 existing and 121 new/extension entries
remain. The preceding terrain/city release is f82dfea, with successful Node
18/22 CI and deployment, 186 public browser checks, 26 committed-artifact
comparisons and eight footer route/viewport checks.

Full Globe Arcs retains all 2,048 seeded world points, eight real city
coordinates, 32 deterministic flight pairs, 49 samples per arc, lifted
midpoints, depth order and source-over alpha. Route Draw retains its 63-node
graph, seeded diagonal edges, canonical path, deterministic Dijkstra reroutes,
turn-aware marker, trail model and distance/ETA calculations. Site Pings keeps
both original landmasses, 24 noise blobs, all six sites, directional navigation,
eight seeded intervals per site and bounded pulse queues. Its landing timing
and parallax now use motion tokens; the four dependent fixture hashes change
explicitly, while original geometry, schedule intervals and RNG draws remain.

Isolines keeps all 2,560 field samples, 2,457 cells, seven levels, the original
asymptotic decider, Gaussian heat kernel, segment order and chosen label model.
A fixed 60Hz simulation produces identical fields, contours and labels under
30/60/120Hz schedules. Per-sample ranks skip uniform cells, shared edge records
avoid duplicate interpolation, and nine-decimal duplicate keys remain exact on
boundary candidates. Seventy-three original/adversarial fields are compared
against an unchanged pre-remediation extractor, including flat levels, shared
boundaries, near-threshold saddles and seeded fields with exact vertices. The
probe also proves that these inspections leave the live model unchanged.

All four complete models use 360×280 full compositions with readable native
SVG/canvas labels at 390px, 375px and 360px. Compact controllers use their own
224×168 planes, or 260×168 for Isolines, and avoid booting hidden full models.
Shared controls, native keyboard/touch, finite reduced-motion feedback,
interruption, offscreen suspension, caller pause preservation and disposal are
covered by focused checks and interactive offline exports. Projection/field
checksums are computed when inspected instead of in the animation loop, with
pending digests explicitly marked.

The four references contain 48 SVG exports in 270 visible instances. One dot
reuses a byte-identical existing endpoint, adding 47 unique files. All six maps
now account for 301 native image slots. All original bytes and dimensions are
verified at 372×264, 286×264 and 286×196. The portable bundle has 187 image
references; all preceding 140 image payloads, six fonts and 395 unrelated stage
records are unchanged. INTRX-handover remains untouched. Four native search
posters are refreshed.

The final 4× CPU profiles have 16.7ms medians. Route and sites have 16.7ms 95th
percentiles and 16.8ms maxima. Isolines reaches 16.8ms at the 95th percentile,
with a 33.4ms maximum. Globe reaches 33.4ms at the 95th percentile and maximum;
its all-point canvas rendering remains a completion-audit performance follow-up.
The slower bitmap and disjoint-fill experiments are retained as raw evidence;
the shipped globe preserves individual native circular fills. No point, contour
level, field resolution or route sample was removed for the profiles.

The library verifier passes 651 checks, all 399 lazy previews and 97 offline
exports. All 17 runtime/shell and eight CLI/MCP tests pass. Registry, generated
output, stage and baseline motion checks pass. Terrain interruption samples now
capture the current pose and reverse it in one browser task; pause/resume checks
compare virtual elapsed time directly instead of treating driver delays as
animation time. These verifier changes leave the terrain implementation intact.
Chrome/control debt shrinks from
309 to 305; motion debt stays at 114, with no additions. All six maps pass
1,334 focused checks, including 1,148 for the four complete models and 186 for
terrain/city. Browser lifecycle checks also pass.

The four remediated previews have no stage-fit offenders and need no new fill
exceptions. The full audit still exits 1 for remaining remediation: zero failed
boots, zero missing sizes, 35 overflow, three horizontal-scroll, 207 tiny-text
and 74 low-fill offenders. All 37 documented exact-geometry exceptions validate;
no gate or threshold changes. Tiny-text debt drops by four from the preceding
release.

Quiet mobile Lighthouse scores 95 for home (296,995 transferred bytes) and
100 for Elastic Tabs (360,861 bytes) on the repeat. The first detail sample is
89 with LCP 3.585s and CLS .068; the repeat is 1.033s and .000187. Both reports
are retained, as with the preceding release, for the completion audit. The
shared footer still visibly links Tanzir Rahman to https://tanziro.com/ and is
verified on the running dev site across desktop and mobile routes.

## Phase 4 — Agents: pipeline, graph, streaming and reasoning

The first four Agent & AI UI previews now match their v4 references. Existing
visual remediation reaches 92; 307 existing and 121 new/extension entries remain.
Diff review, knowledge orbit, context compaction and token meter are still
pending. The preceding six-map release is 22837a7, with successful Node 18/22
CI and deployment, 1,334 public browser checks, 85 committed-artifact
comparisons and eight public footer route/viewport checks.

Pipeline retains every one of its 780 seeded draws, all six run schedules,
bounded gap partitions, timestamps, canonical logs, handoff times and exact
one-in-three TEST failure/retry rule. All non-presentation hashes are unchanged.
The eight-row cap now fits its readable viewport without repeated scroll-height
reads. Completion uses the original native check SVG through a primitive mask:
350ms draw after 80ms, with a 150ms interrupted exit. Its small pop and shake
stay within a 1.03 scale and one-pixel displacement; operational handoff windows
remain separate from these shorter presentation poses.

Workflow Graph retains all five normalized nodes, five base edges, the extra
TOOLS-to-WRITE fixture, normal/narrow geometry oracles, ten-edge limit, cycle
validation, execution plans and original packet interpolation. Visual dot,
morph and lift oracles change explicitly for the motion system; graph and plan
hashes remain exact. Native keyboard and pointer tests create and reject edges.
Pointer deltas and connection previews now convert through the stage scale, so
physical dragging stays accurate at narrow sizes. Node movement uses transforms.
Stable SVG paths, viewport attributes, styles and labels avoid redundant writes.

Streaming preserves every character of the original markdown, all 63 pieces,
the deterministic bursts and 400ms stall, code example and 3.1-second sequence.
Words resolve at their original arrivals for 455ms; stable word DOM preserves
their selection and native animation clocks across later bursts. Shared Pause freezes arrivals and resolving word animations. Loading
indicators follow the icon-swap recipe, and inactive loops stop. Native Copy
preserves all three original code lines, accounting for Windows clipboard CRLF.
The reasoning drawer keeps all eight original trace times, full content and
six-second completion. Its panel reversals retain current painted opacity;
the original 800ms completion hold now uses the virtual runtime timer and freezes
with caller, viewport and document suspension. Shared Replay resets owned work.

Twelve original SVG exports provide fourteen compact image instances; three
reuse byte-identical existing keys and nine files are added. The portable bundle
has 196 image references and six fonts. Every native asset slot is checked at
372×264, 286×264 and 286×196. Inset strokes avoid CSS zoom border rounding
moving the icons. Three fill-only exceptions retain the sparse rail, graph and
text geometry. Green completion and orange activity retain the reference's
functional status signals. Full modes keep their complete original models;
compact controllers avoid booting hidden full UIs.

The final four 4× CPU profiles each contain 239 frame intervals. Medians are
16.7ms; 95th percentiles are 16.7–16.8ms. Raw maxima are 33.3ms for pipeline,
33.3ms for graph/drawer and 16.8ms for streaming, including failure/retry,
stepping, reset, copy and disclosure actions. Native failure/retry sampling fell
from approximately 53ms to 12ms after stable writes and batched mask reads;
no seeded data or graph samples were reduced. All four final raw traces are
retained. An earlier final-layout sample has one 133.3ms pipeline frame outside
the measured actions; the unchanged repeat has a 33.3ms maximum. Both remain
recorded for the completion audit. Stable word DOM removed the repeated burst
rebuilds that raised streaming's earlier 95th percentile to 33.3ms. The literal
code now uses local Geist Mono, three visible lines and a separate copy header.

The focused verifier passes 240 checks for complete original fixtures, actual
rendered logs/markdown, native keyboard/copy, scaled touch dragging, exact image
slots, stable word identity, word/check motion, interrupted panel opacity,
completion holds, offscreen/caller pauses, compact text, disposal and all four
interactive offline exports. Seventeen runtime/shell and eight CLI/MCP tests
pass. All 651 library checks, 399 lazy previews and 97 offline exports pass.
Four native posters are refreshed. The four agent prompts now describe their
actual v4 geometry, controls, motion and complete operational models.

The four previews have zero stage-fit offenders. Their three fill-only
exceptions validate alongside all preceding exceptions, for 40 total. The full
audit still exits 1 for remaining remediation: zero failed boots, zero missing
sizes, 35 overflow, three horizontal-scroll, 203 tiny-text and 74 low-fill
findings. Chrome/control debt drops from 305 to 301 and motion debt from 114
to 113, with no additions. All preceding 187 portable image payloads, six font
faces and 395 unrelated metadata records remain unchanged; INTRX-handover is
untouched. Quiet final mobile Lighthouse scores 99 for home (297,216 transferred bytes)
and 100 for Elastic Tabs (361,082 bytes). LCP is .960s and 1.086s respectively;
CLS is zero and .000187. The home remains below the 400KB pre-interaction budget.

## Phase 4 — Agent review, knowledge and memory

The remaining four existing Agent & AI UI demos now have v4 previews: Diff
Review (166:399), Knowledge Orbit (166:428), Context Compaction (166:1294) and
Context Meter (188:273). All eight existing agent demos are remediated. Visual
remediation reaches 96/399; 303 existing and 121 new/extension entries remain.

Full diff preserves every code character, all eight arrival times and the
two-second decision hold. Native acceptance/rejection actually removes the
appropriate rows and restores clean code. Source remains keyboard-scrollable
without truncation. Full orbit preserves all thirteen concepts, twelve slots,
neighbor lists, ring periods, radial wobble and pull model. A native legend
keeps every concept readable; its center label sits below the native center
glyph to avoid overlapping the innermost orbit. Interrupted promotions accept
the latest concept and retarget from painted positions in 350ms.

Compaction retains all sixteen seeded width templates, 96 draws, bound
compression/pulse functions, token reduction, complete four-cycle timeline and
history provenance. The fourth cycle retains message counts 12,6,6 with every
source preview intact. Stable bubble DOM uses transform FLIP reflow with 40ms
stagger; tooltip content is cached and its 80ms delay/150ms entry/50ms exit use
owned runtime animations. Only landing and merge UI scale peaks change to 1.03.
The compact pre-compaction hold now shares the virtual timeline, so a pause
cannot be bypassed by an automatic timeout; repeated input retains progress.

The complete meter retains all 64 seeded events, 128 draws, 30-point throughput
history, thresholds, eight-trigger queue, bounded curves, compaction and billed
cost. All original accounting/geometry checksums remain exact. Native events
match all 64 original state snapshots; canonical event4159 actually renders
$100.003 with six digit slots. Only changed digits use 250ms number fades.
Conversation/files/tools allocation is deterministic, sums to context and is
proportionally conserved through compaction. Pause freezes both model time and
owned digit animations. All four exports retain their complete models offline.

Sixteen original SVG exports supply twenty compact instances. Fifteen unique
files are added; one exact-byte match reuses an existing key. Every native slot
is checked at 372×264, 286×264 and 286×196. The full orbit center and dynamic
history glyphs are also checked. The portable bundle has 211 image references
and the same six fonts. All preceding 196 payloads, 395 unrelated metadata
records and 395 unrelated demo modules remain exact. Handover files are untouched.
The 180×51 context meter has a fill-only Figma exception; all 41 exceptions
validate, with no relaxation of text, overflow or horizontal-scroll gates.

The focused new verifier passes 614 original-model, native input, source
accounting, artwork, motion, pause, compact, touch, disposal and offline checks.
The preceding agent verifier passes 260 checks, including all native artwork
hashes. All 651 library checks, 399 lazy previews and 97 offline exports pass;
17 runtime/shell and eight CLI/MCP tests pass. Four native posters are refreshed.
Registry, stage, generated output and motion checks pass. Chrome/control debt
shrinks from 301 to 297 and motion debt from 113 to 111, without additions.

Each final 4× CPU profile has 239 frame intervals, a 16.7ms median and 16.7–16.8ms
95th percentile; every maximum is approximately 16.8ms. Measured actions cover
accept/replay, concept promotion/reset, physical compaction boundaries and
interrupted token compaction. The largest measured action is 17.7ms. No model,
history or data resolution is reduced. Sequential mobile Lighthouse scores
94 for home (297,535 bytes, LCP3.030s, CLS0) and 90 for Elastic Tabs (361,401
bytes, LCP3.570s, CLS.0680); both meet the required budget and home stays under
400KB. Raw profiles, screenshots and Lighthouse reports remain in the artifacts.

These four previews have zero stage-fit offenders. The full diagnostic still
exits1 for remaining remediation: zero failed boots, zero missing design sizes,
35 overflow, three horizontal-scroll, 199 tiny-text and 74 low-fill findings.

## Phase 4 — FUI status, target, scope and spectrum

The first four FUI tiles now match v4: status panel 166:993, target lock 166:1022,
oscilloscope 166:1045 and spectrum scan 166:1069. Existing visual remediation
reaches 100/399; 299 existing and 121 new/extension entries remain. The six
remaining FUI modules, 395 unrelated metadata records/modules and supplied
handover files are untouched. Chrome/control debt shrinks from 297 to 293 and
motion debt from 111 to 107 without additions.

Each lightweight native hero mounts independently of its full instrument.
Status retains all four panels, original thermal sine, clock and random
diagnostic delays/row/duration draws. Target preserves all four identities,
corner/reticle geometry and cursor model; fitted pointer coordinates and native
focus work on desktop and touch. Interrupted locks now start at every current
painted corner, including a return flight, rather than snapping to center.

Scope keeps the three-harmonic signal, 1.5px point sampling, original trail
decay/glow and full DPR-backed canvas. Its 1500ms hold uses virtual time, so
caller/offscreen pauses preserve the remainder. Two-axis native touch now tunes
both original inputs and retains them on touchend; mouse leave still resets.
Spectrum preserves all 64 seeded bases, contact draws, selection/frequency map,
3.2s sweep, physical 1.15 influence, 2× contacts, 800ms crossing pause and
1200ms fade. Cached direct body/tip/blip transforms remove inherited variable
updates without reducing the signal model, data resolution or update cadence.

Six original SVG exports provide six compact instances; five new files and one
exact-byte reuse bring the portable bundle to 216 images with the same six
fonts. All prior 211 payloads remain exact. Artwork slots are checked at
372×264, 286×264 and 286×196; spectrum primitive geometry is also checked.
Target's exact 140.8×76.8 Figma composition is the 42nd valid fill-only exception.
The four previews have zero stage-fit offenders. The global diagnostic still
exits 1 for pending remediation: zero failed boots or missing sizes, 35 overflow,
three horizontal-scroll, 195 tiny-text and 74 low-fill findings.

The focused verifier passes 286 original-model, actual-rendering, native input,
interruption, compact typography, virtual hold, suspension, disposal and offline
checks. Four native posters are refreshed.
All 651 library checks, 399 lazy previews and 97 offline exports pass, as do
17 runtime/shell tests, eight CLI/MCP tests and the stage-runtime browser checks.
Registry, stage, canonical generated output and motion checks pass.

The final 4× CPU profiles each have 239 intervals: median 16.7ms, p95
16.7–16.8ms. Scope has a retained 33.4ms
maximum; the other maxima are 16.8ms. Largest measured action is 16.5ms. The
original scanner p95 33.3ms trace is retained alongside the optimized 16.8ms
trace. No model sampling or interaction was removed to obtain these results.

A required Lighthouse run exposed an existing cold-entry chrome jump: mobile
detail initially painted the 56px site header, then removed it after catalog
loading; desktop similarly removed its 36px promo strip. Initial route chrome
now resolves before catalog loading, and scale text is populated before layout.
Twelve delayed-catalog modern/legacy entry checks pass. Retained before/after
traces show the mobile main shift eliminated. Sequential final mobile Lighthouse
scores 92 for home (297,867 bytes, LCP 3.030s, CLS 0) and 91 for Elastic Tabs
(361,733 bytes, LCP 3.570s, CLS 0). The earlier failing detail score of 89 is
retained. Both required routes meet 90; home remains below 400KB. The shared
author link to https://tanziro.com/ is verified across eight desktop/mobile
route cases locally and publicly. Shared stylesheet, footer UI and detail script
URLs are versioned so returning browsers retrieve the current release.

## Phase 4 — FUI packet lanes, biometric gate and hex inspector

V4 data lanes 166:1127, biometric gate 166:1179 and hex inspector 166:1200 now
have independent native previews and complete original full models. Existing
visual remediation reaches 103/399; 296 existing and 121 new/extension entries
remain. Trading desk, orbital tracker and boot sequence remain unchanged. All
396 unrelated metadata records/modules and the supplied handover remain exact.
Chrome/control debt shrinks from 293 to 290 and motion debt from 107 to 105.

Data lanes retain four separate seeds, eighteen-row pools, sixteen-pixel row
geometry, original 18/24/30/22px/s speeds and independent flash draws. Native
hover/focus holds only the inspected lane. Fitted decoder geometry uses logical
CSS units. Reset restores every seed and pool; shared Pause stops all recurring
work. The native preview preserves all 32 reference dashes and lane emphasis.

Biometric authentication keeps all sixteen-character hashes, 18ms typing, two
400ms scans, the 800ms result boundary, every-fourth denial and 3000ms reset
hold. Its scan rotation and result swap use the shared 500ms motion; denial
uses the 280ms error shake. Repeated busy input preserves the guard. Reset
cancels pending frames, result holds and native compact check animations. Three
original exports preserve the two 71px ring layers and 24px check. Wrappers
carry motion; no SVG paths or screenshots are used as replacement artwork.

Hex preserves all 65,536 address-derived bytes, 4096 rows, sixteen bytes and
ASCII twins per row, nineteen rendered rows, eight neighbor influences,
14px/s scanning and original signature draws/decay. The 680px full memory plane
offers native horizontal scrolling on narrow screens while the page stays
within its viewport. Standard compact previews retain the exact six-column
reference; short stages show four columns with 11px type. Native keys retain
visible selection through compact resizing. Full pointer and link coordinates
convert fitted pixels back to CSS units.

The original whole-window rebuild produced 166.7ms and 250.1ms frame outliers
at 4× CPU. Memory now reuses rows and rebinds only addresses that leave the
window. Selection clears only previously decorated cells, preserving all 304
rendered bytes and their twins. The latest inspection action takes 10.1ms
instead of 26ms; Reset takes 4.2ms instead of 39ms. All final profiles contain
239 intervals with a 16.7ms median and 16.8ms p95. Lane/memory maxima are 33.4ms;
biometric maximum is 16.8ms, with no recorded long tasks. Earlier raw reports,
including the 116.7ms lane outlier, remain available for the final performance
audit. No generator, model extent, data sampling or row count was reduced.

The focused verifier passes 172 checks: 512 original packets, sixteen flash,
hash and signature draw sequences, complete 64KB byte digest, native holds,
grant/deny, byte keys/touch, actual ASCII links, real horizontal touch, compact
geometry/type, exact image slots, pause, interruption, disposal and full offline
exports. All 216 previous image payloads and six fonts remain exact; the bundle
now has 219 images. The sparse 93×100 biometric composition has a documented
fill-only exception. Three native posters are refreshed. Registry, stage,
motion, 1205 generated artifacts, 17 runtime/shell and eight CLI/MCP checks pass.

Sequential mobile Lighthouse scores 99 for home (297,896 transferred bytes)
and 100 for Elastic Tabs (361,762 bytes), both with 960ms LCP and zero CLS.
The full regression passes all 651 checks, 399 lazy previews and 97 offline
exports. The three previews have zero fit offenders; all 43 fill-only exceptions
validate. The global fit diagnostic still exits 1 for pending work: zero failed
boots or missing sizes, 35 overflow, three horizontal-scroll, 192 tiny-text and
74 low-fill findings. A final compact focus repair leaves every profiled full
path, prelude, stylesheet and HTML composition byte-identical.

## Phase 4 — FUI trading, orbital tracking and boot output

The last three existing FUI demos now match v4: trading desk 166:1246,
orbital tracker 166:1273 and boot sequence 166:1366. Existing visual remediation
reaches 106/399; 293 existing and 121 new/extension entries remain. All 396
unrelated metadata records/modules and the supplied handover remain exact.
Chrome/control debt shrinks from 290 to 287 and motion debt from 105 to 102.

Trading retains all sixty market points, six bid/ask levels, four tape rows,
original random streams and 800ms tick. Native pointer, touch and keyboard
reorder the complete panels; Enter or double-click collapses through grid rows.
FLIP retargets from painted rectangles, with final reads batched before writes.
The native compact preview retains the exact price artwork, five book bars and
two tape rails. Tape type and price-column spacing remain readable on phones.

Orbital tracking retains three original satellite configurations, thirty-six
trails, both 73-point halves per orbit, front/back occlusion, station passes,
20000ms latitude drift and 22ms telemetry typing. Camera and text swaps accept
interruption. Stable selection attributes and paths are cached; no orbital
sample is removed. The separate native compact view retains all three original
image exports and its 70×20 SAT-07 badge.

Boot keeps fourteen asynchronous device emissions/resolutions, original seeded
warning/jitter draws, twenty-four progress cells, the 2500ms ready hold and
250ms wipe. Word spans add the streaming recipe without changing any line text
or operational schedule. Replay cancels pending callbacks and owned motion
while preserving caller suspension. Reduced mode shows the complete resolved
log. Its native compact preview uses the exact 220×112 card and reference rail.

The first 4× CPU profiles recorded 116.7ms trading and 150ms orbital outliers.
The chart now redraws when its data, shift or dimensions change, and orbital
selection attributes are written only when changed. All original models remain
complete. The final three profiles each contain 239 intervals, with 16.7ms
medians and p95 at or below 16.8ms. Trading's maximum is 33.3ms; orbital and
boot maxima are 16.8ms. No final profile records a long task. Earlier raw
profiles are retained for the comprehensive performance audit.

The focused verifier passes 505 checks, comparing all 65 complete market
states, every satellite/trail sample, all full orbit paths, sixteen boot
schedules and 496 original boot timeline events. It also covers native keys,
fitted mouse/touch dragging, collapse reversals, camera/text interruption,
exact image/primitive slots, three compact sizes, 390/375/360px full typography,
caller/viewport holds, paused Reset/Replay, cleanup and full offline exports.
Three new unique exports bring the portable bundle to 222 images; all previous
219 payloads and six fonts remain exact. Three native posters are refreshed.

Sequential mobile Lighthouse scores 100 for home (297,970 transferred bytes)
and the trading detail (532,632 bytes), both with 960ms LCP. CLS is zero for
home and 0.000879 for trading. All seventeen runtime/shell and eight CLI/MCP
tests pass.

The full regression passes all 651 checks, 399 lazy previews and 97 offline
exports. Registry, stage, motion and all 1205 generated artifacts pass. Browser
stage lifecycle checks and eleven native-mask/acceptance-boundary checks pass.
The three new previews have no fit offenders and need no new fill exceptions;
all 43 existing exceptions validate. The global fit diagnostic still exits 1
for remaining work: zero failed boots or missing sizes, 35 overflow, three
horizontal-scroll, 189 tiny-text and 74 low-fill findings.

## Phase 4 — Gallery sequences and photo decks

Fraction Slider, Clip Transition, Stack Deck and Parallax Slides now match their
native v4 tiles at 185:1709, 185:1737, 185:1760 and 185:1781. Visual remediation
reaches 110/399; 289 existing and 121 new/extension entries remain. All 395
unrelated demos and metadata records, including nine other gallery modules,
remain unchanged. Chrome/control debt shrinks from 287 to 283 and motion debt
from 102 to 101. The supplied handover remains untouched.

Each compact preview has its own native composition and a complete full model.
Fraction retains five bounded frames, all direct indicators and a shared index.
Its number drum uses 100ms anticipation, a 130ms step and 740ms landing, both
neighbor faces, the token step curve and interruption ghosts. Full-mode photos
decode after the initial paint so the first transition can reuse prepared images.
Reduced motion resolves sharp, unmoved photos with finite opacity feedback.

Clip retains four wrapping chapters, clamped normalized pointer origins and
the complete circular/page transition. The initial tile uses the exact forest
and dusk crops with original ring and pointer exports. Interrupted transitions
retain their painted image layers, including the current mask, alpha, shift
and blur; the next commit releases these layers. Pixel-continuity checks cover
retargeting while paused. This avoids synchronous canvas compositing/readback.

Deck retains all five identities, recycling order, 90px/.7px/ms decisions,
.32 vertical movement, .045 rotation with a twelve-degree clamp and 110px stamp
strength. Fitted drag deltas use logical units. Release carries velocity through
the 380/32/1 spring; reverse input retargets the pending flight. Full mode shows
all five layers with twelve-pixel peeks. Escape, Reset and disposal release
native pointer capture. FLIP measures all cards before writing animations.

Parallax retains four bounded slides, complete 100% panel/35% opposite media
travel and the normalized ±2.4%/±1.5% look map. Its native split photo composition,
divider and original arrow exports remain exact. All four use shared dock
actions, preserve caller/viewport holds and reject stale completion work.

Four unmodified SVGs and the verified dusk photograph bring portable assets
from 222 to 227 images; every preceding image payload, all six fonts and the
nine preceding provenance records remain exact. John Towner's free Unsplash
photograph matches the v4 raster exactly. Its limited clip slot follows the
owner's v4-tile rule; full/tile files, hashes, detail credit and export licence
comments are recorded. All four native posters are refreshed.

The first rapid-input profiles recorded 283.3ms reveal and 83.3ms fraction
outliers. Retaining native image layers and preparing full fraction photos
removed those long tasks. Final sequential 4× CPU profiles each contain 239
intervals with 16.7ms medians and p95 at or below 16.8ms. Clip and deck maxima
are 16.8ms; fraction and parallax each have one interval around 33ms. No final
profile records a long task. Earlier raw results remain available for the full
performance audit.

The focused verifier passes 419 checks against the original bounded/wrapping
states, fourteen native pointer/velocity fixtures, all five queue identities,
complete drum timing, interruption continuity, touch/keys, three compact sizes,
390/375/360px full typography, exact photo/SVG slots, caller/viewport holds,
cleanup and offline exports. The broad deck check now waits for its stack
transition to settle before asserting the next card's final opacity.

Sequential mobile Lighthouse scores 94 for home (298,583
transferred bytes) and 91 for the required Elastic Tabs detail
(362,449 bytes).
LCP is 3105ms / 3570ms and CLS is
0 / 0. An additional clip-detail diagnostic scores
84 with 553,027 bytes and 4620ms simulated LCP;
its late-discovered 1600px photograph remains a documented performance follow-up.
The canonical §4.6 routes pass; the photo-detail result is retained separately.
All seventeen runtime/shell and eight CLI/MCP tests pass.

The full regression passes 651 checks, all 399 lazy previews and 97 offline
exports. Registry, stage, motion and all 1205 generated artifacts pass. Browser
stage lifecycle and eleven native-mask/acceptance-boundary checks pass. All four
galleries meet every fit gate without new exceptions; the existing 43 fill-only
exceptions validate. The global diagnostic still exits 1 for remaining work:
zero failed boots or missing sizes, 35 overflow, 3 horizontal-scroll,
185 tiny-text and 70 low-fill findings.

## Phase 4 — Remaining galleries and carousels

All nine remaining Galleries & Sliders now have native v4 previews and complete
full interactions: Filmstrip Scrub, Honeycomb, Print Pile, Dual Row Drift,
Lightbox Zoom, 3D Wheel, Snap Carousel, Expanding Columns and Elastic Edges.
Visual remediation reaches 119/399; 280 existing and 121 new/extension entries
remain. The Interface and Data & AI groups contain 89 and 30 previews with zero
fit offenders. All 388 unrelated demos and 390 unrelated metadata records
remain unchanged. Two earlier Layout thumbnails receive only a four-pixel
vertical alignment correction, verified against their exact Figma slots. The
preceding four galleries remain exact. Chrome/control debt shrinks from
283 to 274 and motion debt from 101 to 98. The supplied handover is untouched.

The full models retain eight film frames and every timecode, fourteen hex cells
with measured nearest-neighbor selection, seven prints with seed 713 and the
original LCG/rounded poses/order, twenty-four opposing drift cards, six measured
lightbox origins, nine projects with every place/year, and all five snap,
elastic and expanding-column items. Compact views preserve the exact v4
representative compositions. Wheel and elastic retain their input mappings,
bounds, resistance and velocity prediction; release uses the 380/32/1 spring.
Independent coordinate, seed and input fixtures were captured before editing.

Native browser checks also cover fixes for selected-text drag interruption,
delayed FLIP retaining its first pose, all snap endpoints centering, immediate
switch announcements, native scroll suspension, and Escape reversing an opening
lightbox from the dock. Cleanup aborts input, releases capture, disconnects
observers and cancels every owned timer, frame and animation.

Filmstrip batches measurements and changes rail sizes through transform-only
FLIP; its follower uses transforms. Snap indicators animate transforms instead
of width. The wheel avoids unused inherited CSS writes, and drift retains its
unchanged button label. Print entry uses separate wrappers for its 500ms scale,
260ms shift, 400ms opacity and 350ms FLIP. Static shadow artwork and stationary
edge gradients retain the required appearance without live filter/mask effects.
Final sequential 4× CPU profiles contain 239 intervals each: all medians are
16.7ms, all p95 values are at or below 16.8ms, and none records a long task.
Film, honeycomb and snap have isolated intervals near 33ms; wheel has one
66.7ms interval. Other maxima are at or below 16.8ms. The final profiles and
earlier stall/trace evidence remain in `.artifacts/galleries/`.

Eight untouched SVG exports bring portable assets to 235 images, with all 227
preceding payloads and six fonts exact. All ten photo-provenance records remain
unchanged; native Figma/local photo comparisons have RGB RMS below 3.2 after
equal-size resampling. SVG root sizes, byte hashes, repeated design slots and
rendered positions are verified. All nine native gallery posters and both
aligned Layout posters are refreshed.
No Figma screenshot is shipped as artwork.

The new focused suite passes 1,800 checks. It covers 96 original seeded throws,
fourteen captured drag/neighbor fixtures, every project place/year and film/print
identifier, native wheel input and 90ms rounding, interrupted painted geometry,
transform-only motion, caller/viewport holds, disposal, exact native assets,
three compact sizes, 390/375/360px touch views and complete offline exports.
The preceding four-gallery suite passes 419 checks. The broad suite passes
651 checks, 399 lazy previews and 97 offline exports. All 17 runtime/shell and
eight CLI/MCP tests, stage lifecycle and sixteen geometry checks pass.
The two aligned Layout previews also pass the 190-check Layout suite; their
native positions and exact swap-arrow SVG bytes are checked independently.
Registry, stage, motion and all 1,205 generated artifacts validate.

Sequential mobile Lighthouse scores 100 for home (299,087
transferred bytes) and 100 for the required Elastic Tabs detail
(362,953 bytes). LCP is 960ms / 960ms;
CLS is 0 / 0. The preceding clip-detail score of 84 remains
a documented photo-loading follow-up.

The fit auditor now includes visible non-leaf backgrounds and borders while
ignoring transparent wrappers and the fitted root. Figma confirms the existing
220×160 nested UI frame and two 200×62 swap wells; the previous leaf-only
measurement had undercounted their real footprint. Overflow and typography
continue to use the original leaf geometry. Five new browser checks exercise
painted frames, transparent wrappers/borders and gradients.

All nine new previews pass every applicable fit gate with no new exceptions;
all 43 existing fill-only exceptions validate. The global diagnostic still exits
1 for remaining work: zero failed boots or missing sizes, 35 overflow,
3 horizontal-scroll, 176 tiny-text and 42 low-fill findings.
These findings lie outside the two completed groups.

## Remaining work

1. Remediation buckets A–G and motion migration across all existing demos,
   including the recorded price-tape/heatmap update-frame spikes and clip-detail
   photo discovery/loading follow-up.
2. Thirty new components and ninety-one extension components, by category.
3. Pro entitlement seams and a full requirement-by-requirement completion audit.

The objective remains active until every phase is implemented, verified,
committed and pushed. Design completion is not implementation completion.

## Raster instruments — 20 Nov 2026

Terminal Window, Engraved Relief, Pixel Lissajous and RGB Slices now use their
exact v4 native artwork: 169 unchanged SVGs, both original terminal sessions,
all commands, the complete 46-row relief field, all 600 Lissajous samples and
both 1–9 ranges, plus three native/ten full RGB bands. Approved cityNight and
archGrid replace the retired RGB photo; both credits and hashes are retained.
Full views keep complete 400×400 compositions and accessible scroll cameras.
Generator prompts now describe the v4 layouts, controls and approved assets.

The instrument verifier passes thirteen source-bound groups covering complete
original models and pixels, independent native/full paint, actual input and
scrolling, clock equivalence, holds, paused themes, reduced feedback, early
disposal, viewport/route ownership and 32 fresh offline exports. See
`docs/remediation-progress.md` for the counts, source scope and timing findings.
The sparse Lissajous first pose retains its exact Figma geometry through the
written fill exception.

Visual remediation reaches 281/399. Another 118 existing demos and all 121
new/extension components remain, alongside Pro seams and the final audit.
The full fit diagnostic reports 14 overflow, zero horizontal scroll, 46 tiny
text and 33 low-fill findings; all 89 exceptions validate. Stage debt is 115
and motion debt remains 51. These are unfinished global gates. Verification
runs locally; direct commits/pushes preserve disabled Actions and the $0 limit.

## Sound instruments — 20 Nov 2026

All six Sound demos now have native v4 previews from 58 unchanged SVGs and
complete original full interactions. The twelve focused verification groups
pass 460,232 checks, including original models and synthesis, lossless buffers,
measured native PCM repeatability, actual trusted audio/input, painted pixels,
72 refresh-rate stories, compact layouts, independent holds, context recovery,
cleanup and 48 fresh offline exports. Typing retains its exact sparse Figma
geometry through a documented fill exception. Full Drone now uses the already
credited Sea photograph. See `docs/remediation-progress.md` for source scope,
current global counts and timing findings.

Visual remediation reaches 307/399. Another 92 existing demos (20 Skeuomorph
and 72 Collections) and all 121 new/extension components remain, alongside
Pro seams and the final audits. The objective remains active. Verification
runs locally; direct commits/pushes preserve disabled Actions and the $0 limit.

## Skeuomorph controls — 20 Nov 2026

Soft Focus Switch, Desk Rocker and Satin Fader now have exact native v4
previews from nine unchanged SVGs, with complete original full interactions.
The eleven focused groups pass 31,517 checks across original fixtures,
168 layouts, independent 60/120/240Hz motion, actual input and touch scrolling,
painted pixels, independent holds, cleanup and 24 fresh offline exports.
Focus and Rocker retain their exact sparse geometry through written fill
exceptions. Native defaults are on/on/60; full keeps off/off/72. Glyph raster
fringes and the CPU4 timing findings remain documented for the final audit.

Visual remediation reaches 310/399. Another 89 existing demos (17 Skeuomorph
and 72 Collections) and all 121 new/extension components remain, alongside
Pro seams and final audits. The global fit diagnostic records three overflow,
zero horizontal-scroll, 34 tiny-text and 33 low-fill findings; all 93 exceptions
validate. Stage debt is 87 and motion debt is 43. See
`docs/remediation-progress.md` for verification and timing scope. Verification
runs locally; direct commits/pushes preserve disabled Actions and the $0 limit.

## Skeuomorph paper, glass and clock — 20 Nov 2026

Tiles `170:1657`, `170:1686` and `170:1708` now have their exact 240×168px
native planes and complete 400×480px full compositions. Two original check
SVGs and the supplied glass highlight retain their original bytes. The clock
uses the local 40px Geist Mono face; its outlined SVG remains verification-only.
All 323 unrelated modules, 396 unrelated metadata records, 116 earlier private
source files and eleven frozen reference releases remain unchanged. Other
catalog records change only their shared asset cache hashes.

Paper retains all three original plans, six native task fields and full copy.
Its three preview rows project cyclic fields 2×plan+[0,1,2], including a peek
at the next plan. Native starts with the first two checks selected; full keeps
the original unchecked defaults. Checks fill in 150ms and draw in 350ms after
80ms. Page slides take 350ms while the original 330ms busy gate stays intact.
Reversals in that 20ms window preserve visible layers. Reduced motion uses
150ms opacity. The shell owns Next.

Glass keeps the supplied photo, pane, highlight and caption geometry, using
the newly verified approved fluidBlue photograph. Full retains the complete
original pass, front/back copy and Sea photograph. Pointer tilt follows in
400ms and returns in 1000ms, with 300ms glare and 1000px perspective. Touch
and reduced motion suppress pointer tilt and preserve semantic flip feedback.
The measured CSS blur(7px) matches this Figma composition more closely than
blur(14px); this does not establish a general renderer conversion.

The clock paints 12:45 when paused before its first live frame, then follows
the original real wall time, both formats and power. Resume refreshes real
time. Native power-off is blank; full retains all 142 original dots and ten
glyphs. Changed digits use 250ms fades with 4px travel and 2px blur, or 150ms
opacity when reduced. Retained digit nodes stay in place through reversals,
avoiding a measured clipping/compositor raster change from node reattachment.
All three demos retire active implicit touch capture during disposal.

The ten groups in `tools/verify-skeuo-materials.js` pass 46,710 checks.
Forty full/native factory bindings cover twenty original cases, 28 actual
replays, 6,760 bound state samples and 1,536 complete DOM/model checkpoints.
Identical factories share exact evidence; the distinct frozen full clock
adapter runs independently. Lossless pooled strings reconstruct every original
fixture byte and verify its hash. Original generated photos are regression
data only. Full Paper now uses approved Sea, Forest Dark and Dusk images;
full Glass uses Sea, with 1600px detail paths and 800px portable variants.

Verification covers 168 layouts, independent 60/120/240Hz motion, interrupted
page/digit raster continuity, all six task fields through real keys, moving
touch, vertical scrolling and capture cleanup. It checks actual materials and
photo pixels, peak glyph ink, caller/document/viewport holds, cold routes,
LiveTiles, early cleanup and 24 fresh network-blocked exports. Font fringes and
cross-renderer blur are not claimed byte-exact. Controlled document signals
are not OS visibility measurements. These demos construct no audio.

All three previews pass the fit gates without new exceptions. The batch
removes three tiny-text findings and three chrome debts; stage debt is 84 and
motion debt is 41. Registry generation validates 1,205 artifacts. The broad
library suite passes 651 checks, 399 previews and 97 offline exports. All
nineteen lifecycle/shell tests, eight CLI/MCP tests, sixteen fit-geometry checks
and shared stage runtime checks pass locally. The full fit diagnostic still
exits 1 for the unfinished groups: three overflow, 31 tiny-text and 33 low-fill
findings, with no horizontal scroll, failed boots, missing sizes or invalid
exceptions. All 93 existing Figma exceptions validate. Three posters were
refreshed with the paused-initial capture option; its default behavior stays
the same.

The 24 isolated eight-second CPU1/4 timing stories are recorded in
`docs/performance/skeuo-materials-2026-11-20.json`. CPU1 native measures
59.9–60.0fps with one slow interval and no long tasks; full holds 60fps with
none. CPU4 native records 52.4–60.0fps, 41 intervals above 25ms and 29 long
tasks; full records 57.6–60.0fps, 33 slow intervals and eight long tasks. Two
native first paints exceed 300ms, with a 342.7ms maximum; full first paints
range from 166.6ms to 264.2ms. Readiness reaches 635.9ms in native stress runs.
These results and all earlier timing tails remain open for the final audit;
measurement does not pass the timing gate, and no cause is inferred from
frame-rate variation.

Visual remediation reaches 313/399. Fourteen Skeuomorph demos, all seventy-two
Collections, 121 new/extensions, Pro seams and final audits remain. Only
`showcase-circular-gallery` still uses the retired runtime photo keys. Direct
commits/pushes preserve disabled Actions and the account-wide $0 stop-at-limit
policy.

## Listening Dial, Split-Flap Timer and Embossed Key — 20 Nov 2026

Three more existing demos now have native v4 compositions and complete original
full views. Fourteen supplied SVG payloads remain byte-exact; four outlined timer
glyphs are verification-only. Dial and timer retain 240×168px compact planes;
the undocked key uses a 240×216px root so its upper native composition keeps the
authored stage origin. No photograph, font, credit or asset alias changes.

Dial preserves the original 260-degree integer value model, keyboard range and
mute restoration, with direct dragging, 0.55 rubber band and velocity-carrying
380/32 spring release. Capture pickup, key intent during drag, cancellation and
window blur preserve continuous paint and release the actual pointer owner.

Timer uses an explicit paused 12:45 native checkpoint, retaining 25:00 in full
and for Reset/restart. Its original 120ms poll, +300 seconds and 5999-second
cap remain. Persistent Number drums use canonical anticipation, step, landing
and stagger, retaining full card materials and center seams. Read-only UI/work
accessors preserve complete original animation history without mapping that
history on every render. Reduced motion uses a retained-layer crossfade.

Key retains Saved in native and idle in full, original Saving/disabled state,
650ms normal and zero-delay reduced completion, reset, labels and status copy.
Press and icon swap use canonical curves and preserve visible layers on reversal.
Full optical sizing accounts for the press scale, keeping short-view text above
11px through the complete interaction. Native key type also stays above 11px
through press in 286×196px landing cards, retaining 13.5px at the reference size
and the original control geometry.

The fourteen public verifier groups pass 414,611 checks: twelve original cases
bound to both compiled factories, independent authored starts and four complete
25-minute sessions, 192 layouts, 36 six-second live stories at 60/120/240Hz,
physical mouse/keys/moving touch, raster reversals, independent holds, cold
routes, LiveTiles, cleanup and 24 fresh network-blocked exports. Original SVG
geometry and computed stroke styles are strict; translucent-stroke raster
coverage records bounded subpixel antialiasing rather than identical pixels.

Registry generation checks 1,205 artifacts. The library passes 651 checks,
399 previews and 97 offline exports. Nineteen runtime/shell tests, eight CLI/MCP
tests, sixteen fit-geometry checks and stage-runtime checks pass locally.
Three exact-reference low-fill exceptions preserve authored sizes. The full fit
diagnostic now reports two overflow, zero horizontal-scroll, 28 tiny-text and
33 low-fill findings in unfinished demos, with 96 valid exceptions and no
failed boots, missing sizes or invalid exceptions. Stage debt is 81; static
motion debt remains 41, including the original timer curve on hidden model
nodes. No baseline debt grows. Three native browser posters were refreshed.

Visual remediation reaches 316/399. Eleven Skeuomorph demos, seventy-two
Collections, 121 new/extensions, Pro seams and final audits remain.

The [source-bound timing report](docs/performance/skeuo-tactile-2026-11-20.json)
records 24 isolated eight-second stories. Timer metric/style caching and
dirty-field painting retain the complete verified original programs and history,
raising CPU4 timer results from the preserved 33.3–35.9fps baseline to
50.5–53.1fps. CPU1 records 60fps with no slow intervals or long tasks. CPU4
native records 52.7–59.9fps, 105 intervals above 25ms and three long tasks;
full records 50.5–60.0fps, 139 slow intervals and fifteen long tasks. Full
desktop timer first paint reaches 345.2ms and readiness reaches 364.5ms.
Fonts are prepared before mounting; route transfer is excluded. All timing
findings and earlier tails remain open for the final audit.
Direct commit/push continues with Actions disabled and the $0 stop-at-limit
policy preserved.


## Phase 4 — Needle Meter, Macro Keys and Tape Transport

Three further native v4 compositions retain 20 original SVGs, exact macro
materials, all complete original full programs and 12 lossless fixtures.
Native checkpoints keep −3dB/right/90 seconds; full retains −8dB/left/zero.

Twelve component groups pass 164,775 checks, including 192 layouts, independent
canonical motion, four complete tape sessions, actual input and capture cleanup,
24 fresh offline exports, cold routes and LiveTiles. The six required local
phase commands pass for the remediated set; the full diagnostic records
1 overflow, 25 tiny-text and 33 low-fill findings in unfinished demos. All 98
fill exceptions validate. Stage debt is 79; motion debt stays 41 without new debt.
Registry generation, 651 library checks/399 previews/97 exports, 19 runtime/shell
tests, 8 CLI/MCP tests, 16 fit-geometry checks and stage-runtime checks pass.

Visual remediation reaches 319/399. Eight Skeuomorph demos, 72 Collections,
121 new/extensions, Pro seams and final audits remain. Twenty-four isolated
CPU1/4 timing stories are recorded in the [timing report](docs/performance/skeuo-instruments-2026-11-20.json);
measurements leave all final timing gates open. GitHub Actions remains disabled,
with the previously verified account-wide $0 stop limit preserved.


## Phase 4 — Mechanical Counter, Pocket Lighter and Tear-Off Note

Three more native v4 compositions retain 4 original product SVGs,12 outlined
reference glyphs, exact native primitives and complete original full models.
Thirteen verifier groups pass 607,996 checks, including complete 10000-value
counter cycles,192 layouts, canonical visible motion, actual input/capture
cleanup, independent holds,36 source stories,24 fresh offline exports and
cold routes/LiveTiles. The six required phase commands pass for the remediated
set; the full diagnostic leaves 1 overflow,22 tiny-text and 33 low-fill findings
in unfinished demos, with 99 valid fill exceptions. Stage debt 76; motion debt 41.
The registry,651 library checks/399 previews/97 exports,19 runtime/shell tests,
8 CLI/MCP tests, 16 geometry checks and stage-runtime checks pass locally.

Visual remediation reaches 322/399. Five Skeuomorph demos,72 Collections,
121 new/extensions,Pro seams and final audits remain. The [timing report](docs/performance/skeuo-mechanisms-2026-11-21.json)
records 24 isolated CPU 1/4 stories and leaves timing gates open. Actions stays
disabled; the previously verified account-wide $0 stop limit is preserved.


## Phase 4 — Sealed Letter, Pocket Synth and Activity Capsule

Three native v4 devices preserve five unchanged SVGs and fourteen complete
original fixtures, including synth PCM under the existing cleanup policy.
Twenty-two groups pass 82,339 checks:192 moving layouts, independent canonical
motion, native ranges and trusted inaudible audio/recovery, input/capture and
holds,36 source stories,24 fresh exports and cold routes/LiveTiles. Exact
Figma knob colors and the capsule's sparse sizing are documented. Magnolia
800/1600 files and attribution are reused. Initial root-width checks protect
the centered synth value caption. Retained focus rings preserve actual width;
full-normal capsule retarget records at most one RGB level in one pixel.

Remediation reaches 325/399. All 325 pass fit; the unfinished 74 retain19 tiny-text
and 33 low-fill findings, with zero overflow/sideways-scroll and 100 valid fill
exceptions. Stage debt73; static motion debt 40, with no new violations.
Required local registry/stage/generated/library/fit/motion checks pass for
the owned set; full fit exits1 for unfinished work. All 19 runtime/shell,
8 CLI/MCP and16 fit-geometry checks pass. The [timing report](docs/performance/skeuo-devices-2026-11-21.json)
records 24 isolated CPU1/4 stories with real trusted inaudible synth audio;
timing gates remain open. Two Skeuomorph demos, 72 Collections, 121 new/extensions,
Pro seams and final audits remain. Direct commit/push; Actions disabled;
previously verified account-wide$0 stop limit preserved.


## Phase 4 — Turntable and Satin Foil Card

Two native v4 media demos complete all twenty existing Skeuomorph demos.
Ten unchanged supplied SVGs and eight complete frozen original fixtures retain
the exact native artwork and full original models/content. Canonical platter,
arm,foil/glare and Stage-owned speed-indicator motion preserves source values
and current paint through interruptions. Retained layers preserve keyboard
focus; local speed metrics exclude shared press scale. Full foil reserves
header/photo/member rows so compact readable text cannot overlap its portrait.
Approved portraitC1/provenance remains unchanged at800/1600px.

Sixteen groups pass 59,794 checks, including128 moving layouts,72 exact painted
retargets,physical input/touch/capture,independent holds,24 six-second original
stories,8 cold route/LiveTiles cases and16 fresh offline exports. All327/399
remediated native compositions pass fit. Unfinished Collections retain
17 tiny-text/33 low-fill findings; zero overflow/sideways-scroll,
100 valid fill exceptions,stage debt71 and motion debt39. Required local checks,
19 runtime/shell,8 CLI/MCP and16 fit-geometry checks pass.

The [timing report](docs/performance/skeuo-media-2026-11-21.json) records16 isolated
CPU1/4 cases. CPU1: 60.0–60.0 fps, 0 intervals above25ms, 0 long tasks; first trace Paint 31.8–54.0ms and maximum readiness 82.7ms.
CPU4: 56.8–60.0 fps, 42 intervals above25ms, 5 long tasks; first trace Paint 95.3–358.9ms and maximum readiness 491.6ms. Final timing gates remain open. Remaining:72 Collections,
121 new/extensions,Pro seams and final audits. Direct commit/push; Actions
disabled; previously verified account-wide$0 stop limit preserved.
