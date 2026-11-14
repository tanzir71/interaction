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

Bucket A now includes ten v4 implementations: Border Beam, Elastic Tabs,
Toast Stack, Success Morph, Checkbox Draw, Copy Feedback, Shimmer Sweep, Icon
Hop, Ripple and Jelly Press. Each now renders
its compact Figma hero without a surrounding demo panel or internal replay/reset
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
  geometry despite the 12% fill heuristic. Nine documented fill exceptions are
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

Focused verification: 150 exemplar behavior, reduced-motion, namespace,
native-size and offline-export checks pass. The 32 existing interaction checks,
desktop/touch lifecycle suite, 12 runtime/shell tests and eight CLI/MCP tests pass.
The chrome/control baseline has shrunk from 391 to 381 demos and motion debt
from 168 to 160. These are incremental reductions; bucket A and Phase 4 remain
incomplete. Ten native search posters have been refreshed.

The final broad browser run passes 651 checks, all 399 lazy preview boots and 97
offline exports. The full audit records 0 failed boots, 0 missing sizes, 61
overflow, 3 horizontal scroll, 284 tiny-text and 75 low-fill offenders; all nine
approved geometry exceptions validate. None of the ten remediated IDs has an
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

## Remaining work

1. Remediation buckets A–G and motion migration across all existing demos.
2. Thirty new components and ninety-one extension components, by category.
3. Pro entitlement seams and a full requirement-by-requirement completion audit.

The objective remains active until every phase is implemented, verified,
committed and pushed. Design completion is not implementation completion.
