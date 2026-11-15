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

## Remaining work

1. Remediation buckets A–G and motion migration across all existing demos.
2. Thirty new components and ninety-one extension components, by category.
3. Pro entitlement seams and a full requirement-by-requirement completion audit.

The objective remains active until every phase is implemented, verified,
committed and pushed. Design completion is not implementation completion.
