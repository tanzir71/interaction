# Owner decision record — 28 Nov 2026

Source: the audit report `reports/INTRX aesthetic audit and roadmap.md`. On 28 Nov 2026 the owner
answered "Yes, use recommendations" to the report's decision table, and set the goal "implement the
upgrade, easiest first, push to GitHub in milestones (no Actions, no PR)". Earlier the same day the
owner also stated: photo slots must use **dark abstract** images, **not** the Figma "dark editorial"
set, and **no procedural or AI-generated assets**; and "use other libraries and their code as needed
to quickly upgrade aesthetics and coverage".

The pre-upgrade state is preserved at git tag `v3-verified`. The previous instructions file is archived
at `docs/archive/AGENTS-v3-2026-11-28.md`.

| # | Decision | Status |
|---|---|---|
| 1 | Renders vs photographs for the new image set | **Open** — owner to choose when approving candidates |
| 2 | Person slots (avatars, testimonials, badges) | Accepted: real portraits graded to dark monochrome where a face carries meaning |
| 3 | Literal-subject slots | Accepted: keep rain, smoke, fire and embers re-graded; re-image or retitle Aurora |
| 4 | Photo pool size | Accepted: same-key swap first; widen the gallery pool in a later change |
| 5 | "The v4 Figma tile wins" | Accepted: **demoted to reference**. Figma tiles are no longer a pixel oracle |
| 6 | One composition per component | Accepted: choose per family; promote the stronger full view where it is better |
| 7 | Frozen Stage | Accepted: **unfrozen**. Fit, lighting and Dock changes allowed; posters re-baselined |
| 8 | One-accent rule | Accepted: kept for product UI; effect categories may use the accent as a ramp of light |
| 9 | "Never copy code" | Accepted: **replaced** by the licence-gated policy below |
| 10 | "No runtime dependencies" | Accepted: per-demo `libs` only, pinned and lazy-loaded from a CDN |
| 11 | Gates waived or redefined | Accepted: cold first paint < 300 ms on 4,160 cases; 60 fps at 4× CPU for every component; stable local Lighthouse ≥ 90; hand review of 15,269 axe-incomplete nodes; pixel parity with Figma; evidence preservation |
| 12 | Verification estate | Accepted: group suites, fixtures and sealed archives are **historical**; they certify `v3-verified` and are not gates |
| 13 | Provenance | To do: confirm the ten React Bits-referenced Showcase demos are independent; record 1042 Studio's position on the DRAMS recreations before any paid tier |
| 14 | Launch logistics | Owner actions: publish `@tanziro/intrx` to npm; choose the canonical host. No GitHub Actions |
| 15 | Catalog shape | Accepted: hide the cut/merge items, featured set, seven-group taxonomy (incremental) |

## Licence-gated reuse policy (replaces "never copy code")

- **Allowed sources**: MIT, BSD, ISC, Apache-2.0, CC0, Unlicense — keep the copyright notice, add an
  entry to `THIRD_PARTY_NOTICES.md` and credit the source in the demo's `desc`/notes.
- **Never port** (clean-room re-implementation from behaviour only): React Bits, Vue Bits, Canvas UI,
  Animate UI, transitions.dev, Aceternity UI, 21st.dev marketplace content, Skiper UI, Hover.dev,
  Tailwind Plus, Motion+ and any paid "Pro" tier. GSAP may be a CDN dependency, never vendored.
- Re-read the licence file at the source before every port; licences change.

## Imagery policy

- Real, licensed images by human creators only (Unsplash free licence; **not** Unsplash+).
- No procedurally generated or AI-generated imagery in photo slots.
- Every photo keeps 800/1600 px WebP variants and a complete entry in `assets/photo-credits.json`.
