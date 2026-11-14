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

## Remaining work

1. Routed shell, mobile layouts, search palette, performance and accessibility.
2. Remediation buckets A–G and motion migration across all existing demos.
3. Thirty new components and ninety-one extension components, by category.
4. Pro entitlement seams and a full requirement-by-requirement completion audit.

The objective remains active until every phase is implemented, verified,
committed and pushed. Design completion is not implementation completion.
