# INTRX handover (15 Nov 2026)

This folder is everything needed to build the redesigned INTRX library: the work order for Codex, the motion system, a per-component manifest that links every component to its Figma tile, board previews and two CI tools.

**Status.** The design pass is complete. All **520** components (399 existing, 91 extension and 30 new) have a v4 tile in Figma. The v3 and earlier boards are archived. Nothing in the repo has been changed yet: implementation starts with Phase 1 of the handoff.

**Figma file:** [Interaction](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction)

## Read in this order

1. `AGENTS.md`: the short rules for any agent working in the repo. Copy it to the repo root.
2. `CODEX_HANDOFF_3.md`: the work order. It covers foundations and tokens, the stage contract, the shell redesign, remediation of the 399 demos, agents and MCP, the 30 new and 91 extension components, Pro seams and the phase plan.
3. `MOTION_SYSTEM.md`: hover, press, drag and state-change behaviour, calibrated to transitions.dev. It contains tokens, 34 recipes, a per-component table and the audit. It supersedes every timing value elsewhere.
4. `manifest/components.json`: the lookup table for each component.

## What's in the folder

| Path | What it is |
|---|---|
| `AGENTS.md` | Agent rules and the verify commands to run before every PR. |
| `CODEX_HANDOFF_3.md` | The full spec and phase plan, updated to the v4 state (neutral palette, neutral Pro, v4 node IDs, dark photo set). |
| `MOTION_SYSTEM.md` | Motion tokens, recipes and the per-component motion table for all 520. |
| `EXTENSION_GAP_ANALYSIS.md` | How the 10 reference sites map to INTRX. It holds the specs for the 91 extension components and an index by reference site. |
| `DESIGN_PROGRESS.md` | The design ledger: rules, decisions, board list and notes on the Figma drawing library. |
| `manifest/components.json` · `.csv` | All 520 components. Each row has id, title, trigger, description, board, section, origin (repo, extension or new), new/pro flags, stage theme, motion recipes, motion audit flags, Figma node and link. |
| `previews/01–08` | Full-board screenshots of the eight v4 boards. |
| `previews/09` | Home page at 1440px. |
| `previews/10` | The 12 before → after exemplars. |
| `previews/11` | Contact sheet of the dark photo library. |
| `motion-reference/index.html` | Self-contained interactive reference with 20 recipes (press, menu, modal, tooltip, tabs, toggle, toast stack and more) and a reduced-motion preview. Open it in a browser. The same page is published as a private artifact: https://claude.ai/artifact/12fVDbmGBT6ELmGv8FQ8yJ |
| `tools/verify-motion.js` | Dependency-free CI check against the motion system, with baseline, `--strict`, `--report` and `--update-baseline` modes. Tested on the current repo: 399 demos, 168 with violations, all recorded in the baseline. |
| `tools/motion-baseline.json` | The violations as of 15 Nov 2026. CI fails only on new ones until remediation is done. |
| `tools/audit-stage-fit.js` | Playwright stage-fit audit, the acceptance gate for handoff §5. |
| `figma/export-manifest.js` | Snippet that regenerates the manifest from Figma if tiles change. |

## Figma boards

| Board | Tiles | Link |
|---|---|---|
| Library v4 — Interface | 89 | [110:973](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=110-973) |
| Library v4 — Motion | 67 | [72:559](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=72-559) |
| Library v4 — Pointer & Physics | 53 | [78:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=78-2) |
| Library v4 — Data & AI | 30 | [76:257](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=76-257) |
| Library v4 — Visual FX | 88 | [82:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=82-2) |
| Library v4 — Collections | 72 | [88:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=88-2) |
| Library v4 — Extension | 91 | [92:174](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=92-174) |
| Library v4 — New (30) | 30 | [99:299](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=99-299) |
| Home 1440 | — | [48:260](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=48-260) |
| Direction v4 (reference standard) | 12 | [106:866](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=106-866) |

## How to read a tile

- A tile is a static frame of the interaction's most telling moment. Motion is never drawn: there are no ghost trails, arcs or labels. It is specified in `MOTION_SYSTEM.md`, and the manifest lists each tile's recipes.
- The tile's dock pill shows the **trigger verb** (Press, Hover, Drag…), which matches the first word of the description. On the live site the dock holds the demo's real controls instead (at most two).
- Grey bars are placeholder content. Real text appears only when the text is the component.
- The tile wins over older art and older demos. Titles in the manifest are the v4 titles. Rename registry entries that differ, especially the three IP renames in handoff §3.9.

## Open items

- **Photo credits.** The Unsplash IDs and photographers of the dark photo set (v2) were not recorded. Before launch, find each photo on Unsplash using `previews/11-photo-library-v2.png` (or export the originals from Figma frame 104:4). Check the licence and record the credits in `ASSET_ART_DIRECTION.md` (handoff §2.4).
- **Reference index scope.** The index in `EXTENSION_GAP_ANALYSIS.md` lists every reference entry that produced a new component. Entries already covered by INTRX are mapped by pattern family in the coverage table, not one row per catalogue entry.
- **Motion on tiles.** The Figma tiles are static. `motion-reference/index.html` is the visual reference for timing and easing.
