# Figma design progress (ledger)

File: https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction

Every existing component gets one redesigned tile at the stage contract. Every extension component gets a tile on page 15. Update this ledger after each batch.

## v4 rebuild (current standard, supersedes v3) — started 2026-11-14

User feedback on v3: too amateur and childish (cartoon mascots, toy shapes, dotted guide curves, mono annotation labels, harsh gradient strokes, thick halo rings, fake touch circles, washed-out light photos). Gradients ARE allowed on fills and strokes, but only subtle ones.


### v4 colour and type system (14 Nov, after user feedback)
- Primary stays **orange #FA7319** (hover #FF8A3D dark / #E0600A light; subtle rgba(250,115,25,.14)). An Iris primary was tried and rejected by the user (worse than orange). Gold primitives renamed legacy/gold/*.
- Neutral greys (no warm tint): canvas #151515, surface #1C1C1C, raised #222222, overlay #2A2A2A; borders are alpha hairlines white 6/9/14% (dark) and black 6/9/14% (light); text #F1F1F1 / #A0A0A0 / #6B6B6B.
- Colour comes from small tints only (beUI style): Color/tint/{amber,violet,cyan,pink,blue,green,red} at ~13% fill with the full hue on the icon.
- Gradients allowed when soft: transitions.dev-style multi-hue blurred halo (K.halo) behind premium surfaces at ≤16% alpha, and a faint gradient hairline on one edge (K.edge). Hero accent text is solid orange.
- Pro is neutral (no gold): hairline border, grey checks, halo + edge highlight.
- Curves are symmetric and regular (K.sag, K.arc, K.wave, K.series); never random-looking. No random particle scatter.
- Typography: lib applies Inter dynamic tracking automatically, Geist display −0.6% extra at ≥20px, default line-heights for wrapped text, 11px minimum (non-mono). Max two sizes per tile plus one caption; hierarchy by weight and grey, not size jumps; mono only for code, tickers and IDs.
- DRAMS keeps a signal orange on physical knobs only (product colour, not brand).

Reference frame: "Direction v4 — commercial standard" (page 05, node 106:866).

Rules for every v4 tile:
- Real product UI (sign-in, chat thread, tabs, charts) or real photography. No illustrations of creatures/toys; no mascots or faces drawn from shapes.
- Hairline solid or subtly graded strokes (1–1.5px, white at 8–13% for borders). No thick halo rings, no dashed/dotted guides, no motion arcs, no ghost trails, no fake touch circles.
- No annotation labels inside the stage (no "0.6 s", "×0.1", "v 1.8", "Station 2"). Mono only for real UI content (code, tickers, IDs).
- Rectangles with 8–12 radius; circles only for avatars, status dots, knobs. No oversized pills/bubbles.
- One accent (#FA7319) used once per tile; semantic green/red only where meaning needs it.
- Photos only from Photo library v2 (page 02, frame 104:4): rain, smoke, smokeBlue, fire, mountains, ridge, cityNight, cityTeal, ocean, sea2, forestDark, forestBlue, archGrid, archStripes, portraitC1-3, silk, aurora, milkyway, dunes, roses, magnolia, interiorDark, chrome, fluidBlue, ceramics, trails, embers, desk. Old keys are remapped to these in the lib.
- Lib v4 kit (returned as L.K): K.surf, K.btn, K.input, K.seg, K.tog, K.av, K.photo (scrim/title/sub/kids), K.menu, K.kbd, K.dots, K.SM(points) smooth curve, op 'mask' (luminance masks), shadows sh 7 (UI), 8 (popover), 9 (soft object).
- DRAMS stay on light stages, rendered as premium product objects (matte plastic, aluminium), never toys.

### v4 refinements (14 Nov, later)
- **Transitions.dev standard (static):** each stage shows one focal element in generous space. Incidental content is grey placeholder bars (white 8% fill, 7px, round ends); real text only when the text is the component; no in-stage headers, helper captions or explanatory rows. Extension board rebuilt to this standard and renamed "Library v4 — Extension" (page 15, 92:174); Interface v4 batch 1 (24 tiles) done.
- **Geometric symmetry:** every blob, curve and shape is mirror-symmetric or a regular construction (true arcs and circles, cosine/sine with symmetric phase, regular grids, centred stacks). Rope trail and liquid progress were corrected to this.
- **Dark photography only:** all light photos swapped out on live pages; the v1 library is retired; light v2 slots (mountains, ridge, dunes, ceramics, archStripes) are dimmed and marked retired.
- **Motion:** the quality bar is transitions.dev's hover and click behaviour. See `MOTION_SYSTEM.md` and the motion reference page; the Figma tiles stay static and carry no motion annotations.
- **Sync rule:** when a component is rebuilt on a v4 board, copy its stage onto every older copy on the same day so no board shows a superseded version.

### v4 complete (15 Nov)
All 520 components now have a v4 tile, and every v4 board carries the "Library v4" name:

| Board | Page | Node | Tiles |
|---|---|---|---|
| Library v4 — Interface | 09 | 110:973 | 89 (62 + 27 restored: new sections "Panels & Transitions" and "Galleries & Carousels") |
| Library v4 — Motion | 10 | 72:559 | 67 |
| Library v4 — Pointer & Physics | 11 | 78:2 | 53 |
| Library v4 — Data & AI | 12 | 76:257 | 30 |
| Library v4 — Visual FX | 13 | 82:2 | 88 |
| Library v4 — Collections | 14 | 88:2 | 72 (20 showcase/framer + 52 DRAMS on light stages) |
| Library v4 — Extension | 15 | 92:174 | 91 |
| Library v4 — New (30) | 07 | 99:299 | 30 |

- **Dock = trigger verb.** Every tile's dock is now a single pill showing the trigger verb that opens its description (Press, Hover, Drag, Move, Scroll, Ambient, Type, Hold…). The earlier per-demo action labels (Next, Add, Weak/Strong) are gone.
- **Palette audit.** Decorative blue, green and purple were moved to the neutral white-tone scale on 12 tiles (confetti, like burst, border glow, donut, context compaction, treemap, radar compare, lamp, dot-matrix reveal, assignee picker, background boxes, 3D pin), and red went to the orange accent. Colour stays only where it carries meaning: success and error states, terminal green, RGB-split glitch, the hue rail in the colour picker, OP-1 knobs, collaborator cursors and DRAMS knobs.
- **Guides removed.** The dashed guides and the in-stage "×0.1" label were taken off the precision scrubber, shared expand, ball pop and path follower.
- **Synced copies.** These were refreshed from v4: Direction v4 (12 tiles), Redesigned components (12; title and description now come from v4), Home 1440 (12 cards), Library Category (6) and Mobile Home (2).
- **Archived** to page 99: Library v3 — Interface, Direction v3 and Home v1.
- **Lib notes for whoever continues:**
  - `op 'mask'` (luminance) does not mask photos reliably. For a circular reveal, use a clipped `'g'` with radius w/2.
  - `arc` on a stroked ellipse draws a pie wedge. For open arcs (spinners, hold rings), use a `'p'` polyline.
  - `K.seg` returns a single op.
  - Text `al` must be 'LEFT', 'CENTER' or 'RIGHT'.
  - Opacity must stay ≤1, so clamp it.

## v3 rebuild (current standard, supersedes the v2 boards)

User direction (2026-11-14): aesthetics must be near-perfect and may deviate freely from the original demos; gradients extremely subtle; no italics.

Rules every v3 tile follows (see the "Direction v3" frame on page 05, node 61:829):
- Show the interaction at its peak moment (mid-stretch, mid-roll, lifted, mid-wipe), not a resting state.
- One hero object per tile, optically centred, clear of the control dock (content above y≈206 of the 372×264 stage).
- Layered surfaces (#1A1A19 on #151514), 1px white@7% borders, deep soft shadows (lib sh 4/5/6), one accent (#FA7319); semantic colours only where meaning needs them.
- Real content and Unsplash photos, no lorem or grey boxes.
- Gradients are near-flat: the lib's paint() pulls colour stops 70% toward their mean and drops ambient radial glows to 45% alpha automatically.
- Hints are 56 characters or fewer.

Lib additions: SH presets 4 (deep), 5 (sheet, upward), 6 (float); `trail` op for motion ghosts: ['trail',x,y,w,h,count,dx,dy,kids,{o0,b}].

| Board | Node | Status |
|---|---|---|
| Interface v3 (page 05) | 63:883 | done — 89 tiles |
| Motion v3 (page 06) | 72:559 | done — 67 tiles |
| Data & AI v3 (page 12) | 76:257 | done — 30 tiles |
| Pointer & Physics v3 (page 11) | 78:2 | done — 53 tiles |
| Visual FX v3 (page 13) | 82:2 | done — 88 tiles |
| Collections v3 (page 14) | 88:2 | done — 72 tiles (DRAMS on light stages, three sections) |
| Extension v3 (page 15) | 92:174 | done — 91 tiles (NEW badge) |
| New (30) v3 (page 07) | 99:299 | done — 30 tiles |

Superseded v2 boards are moved to page "99 · Archive (superseded)" (71:1134).

## Pages and status (v2, superseded)

Existing components redesigned at v3: **399 / 399**. Extension tiles: 0 / 91. Next, in order: page 11, page 13, page 14, then page 15.

| Page | Contents | Status |
|---|---|---|
| 04 · Home | Rebuilt on beUI's homepage order (frame 48:260): promo strip, hero, install block, Recently launched, Everything in the library, agents, Free vs Pro, FAQ. Old home kept as 'Home — v1 (superseded)'. | done |
| 00–08 | Cover, audit, foundations, stage kit, desktop, mobile, 12 exemplars, 30 new components, agents & MCP | done |
| 09 · Library — Interface (board 38:2) | Buttons & Micro 15 · Forms & Inputs 10 · Navigation & Menus 13 · Loaders & Progress 10 · Layout & UI 28 · Galleries & Sliders 13 | **done (89)** |
| 10 · Library — Motion (board 53:2) | Scroll 22 · Text & Type 23 · SVG & Line 10 · 3D & Perspective 12 | **done (67)** |
| 11 · Library — Pointer & Physics (36:7) | Cursor 25 · Physics 10 · Liquid & Organic 10 · Play & Easter Eggs 8 | pending (53) |
| 12 · Library — Data & AI (board 58:2) | Agent & AI UI 8 · Data & Numbers 6 · Maps & Geo 6 · FUI & Terminal 10 | **done (30)** |
| 13 · Library — Visual FX (36:9) | Image & WebGL 23 · Raster & Glitch 29 · Ambient 10 · Skeuomorph 20 · Sound & Haptics 6 | pending (88) |
| 14 · Library — Collections (36:10) | Interactive Showcase 16 · DRAMS 52 · Framer Collection 4 | pending (72) |
| 15 · Extension — From reference sites (36:11) | 91 items from EXTENSION_GAP_ANALYSIS.md | pending (91) |

## How tiles are produced (for whoever continues)

- **Drawing library:** a hidden text node `36:4` on page 02 ("_intrx_draw_lib"). Load it in any `use_figma` script with:
  `const L=await (new Function('figma','return (async()=>{'+(await figma.getNodeByIdAsync('36:4')).characters+'\n})()'))(figma);`
- **Boards and sections:** `L.board(pageId, name, title, sub)` finds or creates the page board. `L.section(board, heading, specs)` appends a 6-column grid of tiles.
- **Tile spec:** `{ id, t: title, d: 'Trigger · hint', k: [dock labels], light, n: isNew, pro, o: [ops] }`.
- **Ops:**
  - shapes: `r`/`g` (frame with optional kids), `e` (ellipse; `arc`), `t` (Inter text; `f: 'mono'|'serif'|'geist'`), `i` (icon), `l`/`p` (vector line/path);
  - composites: `dots`, `bars`, `parts`, `star`, `poly`, `chip`, `btn`, `field`, `card`, `ring`, `toggle`, `slider`, `photo`, `cur`, `grid`, `glyph`.
  - Paints: `'#hex'`, `'#hex@alpha'`, `'lg:#a,#b|angle'`, `'rg:#a,#b'`, `'img:<photoKey>'`.
- **Photos:** Unsplash, free licence, uploaded to the "Photo library" frame on page 02. Use them via `['photo', x, y, w, h, key, radius]` or the `'img:<key>'` paint. Keys and Unsplash IDs:

| Key | Unsplash ID |
|---|---|
| sea | photo-1510414842594-a61c69b5ae57 |
| warm | photo-1621795307430-3ff25aa08945 |
| dusk | photo-1477346611705-65d1883cee1e |
| forest | photo-1448375240586-882707db888b |
| stone | photo-1520529890308-f503006340b4 |
| night | photo-1506606401543-2e73709cebb4 |
| sand | photo-1505142468610-359e7d316be0 |
| ice | photo-1517032880222-1afedf8c9d0d |
| interior | photo-1567016376408-0226e4d0c1ea |
| product | photo-1523293182086-7651a899d37f |
| portraitA | photo-1580489944761-15a19d654956 |
| portraitB | photo-1500648767791-00dcc994a43e |
| flowers | photo-1532614208657-10b8d7815f40 |
| abstract | photo-1635776062360-af423602aff3 |
| city | photo-1449824913935-59a10b8d2000 |
| car | photo-1580273916550-e323be2ae537 |

Image URL pattern: `https://images.unsplash.com/<id>?w=1600&q=80&fm=webp`. The Codex handoff (§2.4) covers downloading, self-hosting and crediting them.

## Style decisions after review (14 Nov)

- Follow beUI closely: `#151514` page, flat bordered cards (radius 18, no inner frame), badge directly after the title.
- No italics anywhere.
- Real Unsplash photos for all imagery.

## IP note for the paid tier
Three registry titles name real products or a film character: drams-036 "DRAMS · OP1", drams-048 "DRAMS · R2D2", drams-051 "DRAMS · Braun Electric Shaver". The v3 tiles use original designs titled "Pocket Keys", "Rover Shell" and "Electric Shaver". Rename them in the registry before selling.

Home (48:260): all 12 card previews now use scaled v3 stage content; Recently launched shows Message Stream, Hold to Pay, Color Picker and Black Hole.
Photos: the 'product' (branded perfume) and 'car' (badge visible) keys now point to the flowers and sand photos everywhere, including the lib's PH map.
Page 07: the 30 handoff §7 components are rebuilt at v3 on board 99:299 (old 24:2 archived).
