# KIMI HANDOFF — Refine INTRX to Originkit-grade polish

You are Kimi K3 working on **INTRX**, a zero-build static interaction library (`index.html` + `css/style.css` + `js/app.js` + ~270 registry files `js/demos.*.js`). The site works but looks immature next to https://www.originkit.dev — the reference. Your job: make the whole site read at Originkit's level of restraint and refinement, chiefly by turning the landing page into an explorable grid of live, unlabeled demo tiles.

## BUDGET PROTOCOL — read this before anything

The owner has ~$10 of your tokens. Behave accordingly:

1. **In Phases 1–4, only edit 3 files:** `index.html`, `css/style.css`, `js/app.js`. **Do not open the `js/demos.*.js` registry files** during those phases — they are data (~270 files, huge); shell refinement is global. In Phase 5 (demo repair) you may open **one registry file at a time**, only the one under repair.
2. **Do not read the whole repo.** Read `index.html`, `css/style.css`, `js/app.js` once, fully. That's it. This document contains everything you need about the registry contract and the reference aesthetic.
3. **Work in the phase order below** — it is sorted by impact-per-token. Commit after each phase (`git commit -am "kimi: phase N"`). The site must be shippable after every commit, so if budget runs out mid-way, everything done so far still ships.
4. **No rewrites, no reformatting, no renames.** Surgical edits. Don't restructure working code you aren't changing.
5. Exact code from Originkit's live DOM is included below. Use it (drifted onto INTRX tokens) instead of inventing your own — that's the point.

## Registry contract (all you need to know, don't go read it)

Each demo object: `{ id, title, cat, rootClass, tags, libs, desc, seen, hint, html, css, js, prompt }`. `app.js` currently renders every demo as a full-width `<article class="card">` with header/desc/tabs (Demo | Code | LLM Prompt | Copy), lazy-boots demos via IntersectionObserver when scrolled into view (injects `html` into `.demo-stage`, appends `css` globally, runs `new Function('root','stage', js)`). Stages are ~320px tall. Demos hardcode the site palette (`#0a0a0b`, `#101012`, `#a78bfa`, JetBrains Mono).

**CRITICAL CONSTRAINT: demos hardcode `#0a0a0b`-family backgrounds. Do NOT change `--bg`.** Originkit's page is `#1E1E1F`, but its magic is that tiles are *seamless* with the page. We get the same seamlessness by keeping INTRX's `#0a0a0b` everywhere. Copy Originkit's structure and restraint, not its exact gray.

## The reference — Originkit teardown (extracted from the live DOM, use verbatim where marked)

What makes originkit.dev feel expensive:

1. **The landing page IS the library.** No hero, no marketing sections up top. You land directly on a masonry grid of live, animated, pointer-reactive demo tiles. Zero chrome on tiles: no titles, no tags, no buttons. The work speaks. A thin dismissable banner strip sits above the grid.
2. **Mono everything.** One typeface (Roboto Mono) for 100% of the UI. Body 16px, labels ~10–11px uppercase.
3. **The tile frame** (this is the signature — extracted exactly):
   - Grid: 3 columns, `gap: 14px`, tile `margin-bottom: 14px`, uniform ~320px tall tiles, `border-radius: 0`.
   - Each tile: demo canvas fills the tile, same bg as page, `overflow: hidden`, `contain: paint`.
   - Frame overlay (absolute, inset 0, pointer-events none, z-10):
     - `border: 1px dashed #333333`
     - four 8×8 corner-bracket SVGs, `stroke: #989898`, absolutely positioned at the corners. Exact paths:
       - top-left: `M0.5 7.5 V0.5 H7.5`
       - top-right: `M0.5 0.5 H7.5 M7.5 0.5 V7.5`
       - bottom-left: `M0.5 7.5 H7.5 M0.5 7.5 V0.5`
       - bottom-right: `M7.5 0.5 V7.5 H0.5`
4. **Sidebar** (290px, same bg as page, no border tricks): logo row → search field with `Ctrl+K` chip → section label `GET STARTED` → items with small icons → `EXPLORE` (Trending/Featured/New) → `LIBRARIES` with per-category counts right-aligned in `txt2`. Active item: slightly lighter bg, white text. One high-contrast CTA button pinned at the bottom.
5. **Detail view** (click a tile): big title + stats row (`◎ 1,158 · Used by 43`) → large live preview panel with a reset ⟳ button in its corner → `Copy` split-button (white bg, dark text — the only loud element on the page) → description line → `KEY FEATURES` label + list. Right rail: `Controls` with grouped collapsible sections (COLORS / LAYOUT / RANDOM), each row = label + slider + value chip.
6. **Restraint rules you can feel:** one accent color used maybe 5 times per screen; everything else is 4 grays. No shadows, no gradients on chrome, radius 0 on tiles (only inputs/chips get 2–4px). Demos are mostly monochrome white-on-black with at most one hue each — chrome never competes with demos.

## Phase 1 — Global design-system drift (`css/style.css` only) — biggest win/token

Apply these changes to the existing stylesheet. Keep all token names.

1. **Mono everything.** In `body`, replace `font-family: var(--sans)` with `var(--mono)`; set `font-size: 13px; line-height: 1.6;`. Remove/ignore `--sans` (don't delete the token, just stop using it). Headings that used Inter get mono + tighter sizes: `.hero-title`-scale type shrinks (see Phase 2 — the hero mostly goes away). Anywhere `font-weight: 700` appears on UI text, drop to 500–600 (mono at 700 looks bloated).
2. **Radius 0 on surfaces.** `--radius: 0px`. Chips/inputs may keep 2px by local override if it looks broken otherwise — default is square.
3. **Kill remaining "immature" tells globally:**
   - `.hero` grid-paper background: delete (the grid of live tiles replaces it as texture).
   - Any `box-shadow` used for elevation on cards/panels: delete. Elevation = lighter bg + brighter border only.
   - `::selection` stays.
4. **Add the Originkit tile frame as reusable classes** (verbatim, drifted to INTRX colors):

```css
/* ---------- tile grid (Originkit-pattern, drifted) ---------- */
.tile-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  padding: 14px;
}
.tile {
  position: relative;
  height: 320px;
  overflow: hidden;
  background: var(--bg);
  contain: paint;
  cursor: pointer;
}
.tile-frame {
  position: absolute; inset: 0;
  pointer-events: none; z-index: 10;
  border: 1px dashed var(--line-2);
  transition: border-color .15s;
}
.tile:hover .tile-frame { border-color: var(--text-3); }
.tile-frame svg { position: absolute; width: 8px; height: 8px; }
.tile-frame svg path { stroke: var(--text-3); fill: none; }
.tile-frame .c-tl { top: -1px; left: -1px; }
.tile-frame .c-tr { top: -1px; right: -1px; }
.tile-frame .c-bl { bottom: -1px; left: -1px; }
.tile-frame .c-br { bottom: -1px; right: -1px; }
.tile-label {
  position: absolute; left: 10px; bottom: 8px; z-index: 11;
  font: 10px var(--mono); letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-3);
  opacity: 0; transform: translateY(4px);
  transition: opacity .18s, transform .18s;
  pointer-events: none;
}
.tile:hover .tile-label { opacity: 1; transform: none; }
.tile .demo-stage { min-height: 320px; }
@media (max-width: 1100px) { .tile-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (max-width: 640px)  { .tile-grid { grid-template-columns: 1fr; } }
```

The corner-bracket markup to inject per tile (exact Originkit paths):

```html
<div class="tile-frame">
  <svg class="c-tl" viewBox="0 0 8 8"><path d="M0.5 7.5 V0.5 H7.5"/></svg>
  <svg class="c-tr" viewBox="0 0 8 8"><path d="M0.5 0.5 H7.5 M7.5 0.5 V7.5"/></svg>
  <svg class="c-bl" viewBox="0 0 8 8"><path d="M0.5 7.5 H7.5 M0.5 7.5 V0.5"/></svg>
  <svg class="c-br" viewBox="0 0 8 8"><path d="M7.5 0.5 V7.5 H0.5"/></svg>
</div>
```

5. **Modal shell** for the detail view (Phase 3 uses it):

```css
/* ---------- detail modal ---------- */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(10,10,11,.7); backdrop-filter: blur(6px);
  display: none;
}
.modal-backdrop.open { display: block; }
.modal {
  position: fixed; z-index: 301;
  inset: 4vh 8vw; overflow-y: auto;
  background: var(--bg); border: 1px solid var(--line-2);
  display: none;
  scrollbar-width: thin; scrollbar-color: var(--line-2) transparent;
}
.modal.open { display: block; animation: modal-in .22s cubic-bezier(.22,1,.36,1); }
@keyframes modal-in { from { opacity: 0; transform: translateY(10px) scale(.99); } }
.modal-close {
  position: sticky; top: 0; float: right; z-index: 5;
  background: var(--bg-2); border: 1px solid var(--line); color: var(--text-2);
  font: 12px var(--mono); padding: 8px 14px; cursor: pointer;
}
.modal-close:hover { color: var(--text); border-color: var(--line-2); }
@media (max-width: 700px) { .modal { inset: 0; } }
```

## Phase 2 — Landing page becomes the explorable grid (`js/app.js` + `index.html`)

Replace the long vertical card feed with the Originkit model: **grid of naked live tiles, detail on click.**

In `index.html`:
- Delete the `.hero` section. Replace with a single slim strip above the grid (Originkit banner pattern): one line, mono, `border-bottom: 1px solid var(--line)`, padding 12px 20px: `INTRX — 271 live interaction patterns. Click any tile for code + LLM prompt.` with the count injected into `#hero-count`-style span (keep the id so app.js keeps working, or update app.js's reference).
- Move `.agent-strip`, `.entry-guide`, `.roadmap` **below** `#cards` (grid first, prose later). Do not delete them — just relocate. Compress `.entry-guide` heading sizes via the mono change; no structural edits.
- Keep topbar (search, count pill, GitHub) and sidebar exactly as they are.

In `js/app.js`, change the card-builder loop:
- `#cards` gets class `tile-grid`. Per category, keep a divider but make it span the grid: give `.cat-divider { grid-column: 1 / -1; padding: 40px 6px 2px; }` (add that rule in style.css).
- Each demo renders as a **tile** instead of the full card:

```html
<article class="tile" id="{id}" data-search="...">
  <div class="demo-stage"></div>
  [tile-frame markup from Phase 1]
  <span class="tile-label">{num} · {title}</span>
  {hint ? <div class="demo-hint">…</div> : ''}
</article>
```

- **Lazy boot stays exactly as is** (IntersectionObserver, `rootMargin: '200px 0px'`, boot once). It already scales to a grid; do not rearchitect. Keep the `.demo-hint` element but restyle it smaller/dimmer if needed — it already matches the aesthetic.
- Tabs/code/prompt/copy move to the modal (Phase 3). Delete the per-card tab markup from the grid path. Keep `buildCode()` untouched.
- Search now toggles `.hidden` on tiles (same `dataset.search` logic — just the class target changes). Nav click scrolls to the tile; scroll-spy can key off category dividers instead of every card (cheaper: keep observing tiles, it works unchanged since ids are preserved).
- Sidebar: keep the per-demo links, but this is optional polish if cheap — collapse each `.nav-group` to show only the category label + count by default (Originkit lists categories, not all 271 items). If not cheap, leave as is.

## Phase 3 — Detail modal (Originkit detail-page pattern) (`js/app.js`)

One shared modal, reused for every demo (build the DOM once at startup):

- Backdrop + `.modal` from Phase 1. Open on tile click; also open when `location.hash` matches a demo id (preserves deep links). Close: ✕ button, backdrop click, Escape. On close, clear the hash.
- Modal content, top to bottom (Originkit order):
  1. Header row: `{num}` in accent mono + `{title}` (18px, weight 600) + tags right-aligned. Close button top-right.
  2. **Live preview**: a fresh `.demo-stage` (min-height 380px, `border: 1px solid var(--line)`) — boot a *second instance* of the demo into it on open (same boot mechanics: inject html, run `new Function('root','stage', js)`; the demo's CSS is already in the document if the tile booted; if not, inject it). Add a ⟳ reset button in the preview's top-right corner that clears the stage and re-boots — this replaces Originkit's controls rail, which we can't afford.
  3. `Copy` button styled as the page's one loud element: white bg (`#ececef`), `#0a0a0b` text, mono, square — copies the Code tab content by default.
  4. Tabs: `Demo notes | Code | LLM Prompt` reusing the existing tab CSS; Code and Prompt panes reuse `buildCode(d)` and `d.prompt` exactly as today.
  5. Description + `seen` line under a `KEY FEATURES`-style mono label (reuse `.code-label` styling).
- When the modal closes, empty the modal's demo stage (`innerHTML = ''`) so timers/rAF loops in it get orphaned nodes — acceptable for a static site; do NOT build a teardown system.

## Phase 4 — Global maturity sweep (cheap, do only what's listed)

- `.demo-hint`: reduce to `font-size: 9px; opacity: .6;`.
- Grid strip above tiles: add the Originkit-style dismissable notice line only if trivially cheap; otherwise skip.
- `.count-pill`, `.tag`, `.chip`: ensure square corners, `--line` borders, no accent borders except `.tag.lib`.
- Footer: single mono line, links dim → text on hover. Delete any multi-column footer layout if present.
- Verify mobile: 1-col grid, sidebar drawer still works (its code is untouched), modal inset 0.

## Phase 5 — Repair existing demos (higher priority than new patterns)

The owner's verdict: many existing demos look **immature** next to Originkit's. Repairing them matters more than adding new ones. Each demo lives in its own file (`js/demos.<cat>.<id>.js`), so a repair touches exactly one small file — cheap per fix. Protocol:

**Triage first (don't fix while triaging):**
1. Run the vm verification script from `CODEX_HANDOFF.md` — anything failing goes to the top of the repair list.
2. Serve the site, scroll the full grid with the console open — any demo that errors, renders blank, overflows its tile, or shows scrollbars gets listed.
3. Visual pass against this **maturity checklist** (Originkit's demos pass all of these; flag demos that fail 2+):
   - **Idle life** — the tile does something subtle before any interaction (drift, breathing, ambient motion). A frozen tile is dead weight in the new grid.
   - **Pointer reactivity** — hover/cursor does something within 100ms; Originkit tiles all react to the pointer.
   - **Restraint** — ≤1 hue besides the grays; no off-palette colors (`#a78bfa` accent family, palette in `CODEX_HANDOFF.md`); no more than one element competing for attention.
   - **Easing quality** — nothing moves linearly except deliberate mechanical effects; entrances `cubic-bezier(0.22,1,0.36,1)`, no default `ease`.
   - **Density/scale** — elements sized for a ~320px tile viewed in a 3-up grid: no cramped text under 9px, no giant empty voids, no clipped content.
   - **Performance** — transforms/opacity only, one rAF loop, no layout thrash (the grid now runs many demos concurrently — jank is now a global problem).

**Then repair, worst-first:** one demo per commit (`kimi: repair <id>`). Timebox each — if a demo needs a ground-up rewrite to pass, rewrite `html`/`css`/`js` of that one entry using the shared aesthetic system in `CODEX_HANDOFF_2.md` as the styling spec; keep `id`, `rootClass`, `cat`, and the registry contract intact so nothing else changes. Update the `prompt` field only if the behavior changed. Re-run the verification script after every few repairs.

## Phase 6 — Only if budget clearly remains after repairs: new patterns

`CODEX_HANDOFF_2.md` (same repo root) contains a fully-specified 51-item backlog (likes-driven: FUI & Terminal, ASCII, Maps & Geo, Agent & AI UI…) with a shared aesthetic system and per-item motion specs, plus the registry contract in `CODEX_HANDOFF.md`. If — and only if — Phases 1–5 are committed and you estimate ≥25% budget left: implement items from its backlog **top-of-file first** (FUI section leads), one per commit, following its spec density exactly. Stop the moment budget feels tight; a half-finished demo is worth negative money.

## Verification (run after Phases 2, 3, and 5, and before any final commit)

```bash
for f in js/*.js; do node --check "$f" || echo "SYNTAX FAIL $f"; done
```

Then open `index.html` via `python -m http.server` in a headless browser if available and confirm: no console errors; tiles lazy-boot on scroll; search filters tiles; a tile click opens the modal with working Code/Prompt/Copy; Escape closes it; `#some-demo-id` in the URL deep-links to its modal.

## Definition of done

Landing = seamless dark grid of live, unlabeled, dash-framed tiles with corner brackets, mono UI throughout, detail modal with code/prompt/copy, prose sections demoted below the grid, all committed in shippable phase increments. The site should feel like Originkit's calmer violet cousin — the demos are the interface.
