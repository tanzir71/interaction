# KIMI QA — Repair & polish queue (for Codex)

QA pass over the Originkit-grade refactor. The site is **shippable as-is** — everything below is ranked improvement work, not breakage. One repair per commit (`codex: repair <id>`), re-verify after every few. Data current as of 2026-07-18 07:30 (+06:00); the demo count is a moving target because **another agent is live in this tree building the CODEX_HANDOFF_2 expansion** (`js/demos.maps.js`, `js/demos.fui.js`, `js/demos.agent.js` are untracked WIP — do not touch, do not commit them).

## Coordination rules (read first)

1. **Never `git commit -am`.** Stage exact files per repair (`git add js/demos.x.y.js`). Untracked files and edits you didn't make belong to the other agent — `git status` before every commit.
2. **One registry file open at a time** — the one under repair. No mass reformats, no renames, keep `id` / `rootClass` / `cat` / contract. Update the `prompt` field only when behavior changes.
3. Shell files (`index.html`, `css/style.css`, `js/app.js`) are only touched for section P5 below.

## Already shipped — do NOT redo (git log reference)

| Commit | What |
|---|---|
| `a4c87ac` `kimi: phase 1` | Mono-everything design system, radius 0, tile-frame classes (dashed border + 8×8 corner brackets), modal shell |
| `f463602` `kimi: phase 2` | Landing = 3-up tile grid of naked live tiles; hero → one-line dismissable strip; prose demoted below grid; sidebar = category links + counts, items surface on search |
| `4f051e8` `kimi: phase 3` | Detail modal: second demo instance, ⟳ reset, loud white Copy, Demo notes/Code/LLM Prompt tabs, deep links `#id`, Escape/backdrop close |
| `12683ff` `kimi: phase 4` | Hints 9px/.6, single-line footer, dead hero/card CSS removed |
| `42cdf3c` `kimi: phase 5 triage` | Deleted stale aggregates `demos.raster.js`/`demos.skeuo.js` → duplicate ids gone, 271 unique |
| `430b441` | **Repair pattern A** — `scroll-reveal-stagger`: spacer 300→170px (first row reveals on boot), bobbing scroll cue, hover border |
| `b757150` | **Repair pattern B** — `css3d-carousel-cylinder`: 8 hues → 1 violet, 555px → 320px native, palette/mono drift, idle drift teaser (0.05°/frame after 2s, stops on first interaction, `prefers-reduced-motion` guard, `isConnected` orphan-loop guard) |
| `51fa83d` + `a59a2dc` | **Zoom-fit adapter** in `runDemo()`: oversized roots get `style.zoom` (tile 320 / modal 380). Uses `clientHeight`, never `scrollHeight`. Modal boots **after** `.open` so it's measurable |
| `4f860bf` | Demo inner scrollbars forced thin/dark globally (`.demo-stage *`); category deep-links (`#cat-*`) re-scroll after grid build |
| `8ea5eb0` | Category deep-links jump `behavior:'instant'` (smooth scroll never lands under load) |
| `69e2ca7` | **Zoom-fit v4** — scroller-aware + leaf-union content height (see comment block in `runDemo()`). Verified: only `lenis-smooth-scroll` below zoom 0.55 (0.346); marquees/strips untouched; zero boot failures |

Verified state at QA time: all 271+ demos boot with zero console errors in headless Edge (31,000px viewport boots every tile); modal deep-link `#flip-clock` boots a second fitted instance.

---

## AESTHETICS — visual pass (full-page screenshots, 2026-07-18)

The mechanical triage missed what the owner's "immature" verdict actually sees. Full-page screenshot review found four systemic issues. They are listed worst-first.

### A0 — Light tiles glare in the dark grid (flagship issue)

~30 demos set **light/pastel root backgrounds** — rendered as glowing white rectangles among dark tiles (confirmed: the entire Forms section is a wall of white tiles; `toggle-day-night` shows a sky-blue card with sun; `css3d-card-flip-grid` cream; `menu-image-peek` cream overlay). Originkit's grid is uniformly dark; these read as holes.

- **Files:** all `js/demos.forms.*.js` (10), most `js/demos.loaders.*.js` (loader-dots-wave, loader-morph-shapes, progress-blob-fill, skeleton-shimmer, upload-progress-morph, preloader-*), `js/demos.layout.*.js` (bottom-sheet, command-palette, elastic-tabs, list-reorder-drag, masonry-filter, toast-stack, zoom-ui-inception), `js/demos.micro.*.js` (btn-confetti-burst, btn-icon-hop, btn-jelly-press, btn-shimmer-sweep, btn-success-morph, checkbox-draw-check, like-heart-particles, toggle-day-night, burger-morph-x, badge-notification-pop, hover-tooltip-spring), `js/demos.data.*.js` (chart-bars-race, chart-donut-sweep, heatmap-fade-in, sparkline-hover-scrub), `demos.cursor.js` (cursor-inverted-lens, cursor-eyes-follow, cursor-snap-targets, cursor-shadow-parallax), `demos.layout.tab-morph-content.js`, `demos.play.gravity-flip-page.js`, `demos.raster` (noise-grain-overlay, halftone-dots, halftone-lines, dither-floyd-steinberg), `demos.three.card-flip-grid.js`, skeuo light-materials (brushed-metal-slider, rotary-knob, cassette-reels, embossed-press, wax-seal-stamp, paper-stack-cards, torn-paper-edge).
- **Fix:** convert each demo's root bg + foregrounds to the site palette (dark cards, `#ececef` text). Mechanical per-demo inversion; one file per commit as usual. Skeuo light materials are judgment calls — dark-metal variants keep the concept (brushed dark steel exists); paper demos may keep ONE paper tone muted toward `#d7d2c4` max, never pure white. Pastel tints (`#f0ddd5`, `#f1dfe5`, `#dfe9f5`, `#e6e3f0`, `#e9e2eb`) are the most immature — do those first.
- **Acceptance:** full-page screenshot strip shows no tile lighter than ~`#2a2a2e`.

### A1 — Near-black tinted roots break tile seamlessness (~150 demos)

Most remaining demos paint roots `#0b0d0d`, `#10120f`, `#080b0c`, `#090b0c`-family — warm/green/blue near-blacks. At tile scale each shows a faint seam against the page's `#0a0a0b` (Originkit's magic is seamlessness).

- **Fix (scripted sweep, safe):** in each registry file, replace the **root rule's** background value with `#0a0a0b`. Contrast-neutral (bg sits behind everything). One commit per registry file, spot-check with a screenshot strip. Do NOT touch inner canvas fills that paint scene backgrounds deliberately (matrix-rain `#07110b`, starfield, aurora — scene demos may keep atmospheric bgs; the sweep targets UI-chrome demos: galleries, sliders, nav, buttons, forms, loaders, layout, text, svg, scroll, physics).
- Root bg lives in the first `.d-<root> { ... background: #xxxxxx ... }` rule of each entry's `css`.

### A2 — Inter inside ~190 demos vs mono-everything shell

The identical template string `font-family:Inter,system-ui,sans-serif` appears in ~190 registry entries — UI text inside tiles renders Inter while the chrome is JetBrains Mono.

- **Fix (scripted sweep):** replace `font-family:Inter,system-ui,sans-serif` → `font-family:"JetBrains Mono",monospace` repo-wide. One commit. **Exempt editorial display serifs** (deliberate): `Georgia,serif` in css3d-carousel-cylinder, scroll-marquee-direction, css3d-book-page, menu demos' serif headlines (menu-fullscreen-overlay "Move in new circles." etc. — those are editorial content, keep).

### A3 — Off-palette saturated accents (seen in screenshots)

- **Lime family** (`#d3e65d`-ish) across `js/demos.scroll.js` demos: `FRONT`, `Concept`, `0%` progress, sticky-stack headers. → `#a78bfa`.
- **Magenta sphere** in `webgl-wobbly-sphere`; **cyan slab** (Physics section, `magnet-snap-grid` area); **red MELT** (`melt-drip-text`); **dark-green menu tiles** (`menu-circular-expand`, `menu-split-reveal` "Designed for changing states."); rainbow `toast-stack` dots (already P3).
- Fix: one accent hue per demo, default `#a78bfa`; semantic colors (success/error) may stay but desaturate ~20%.

### A4 — Density notes (no bulk action)

Buttons/Forms/Loaders tiles are sparse by design (small widget + corner labels in a 555px card — leaf-union ~493px, adapter zooms ~0.65, widget reads small but complete). Bulk zooming can't fix this; per-demo, enlarge widgets/tighten spacing for a 320px stage when a demo next gets touched for other reasons. Not a standalone sweep.

### Verifier additions (prevent regressions)

Add to the QA/verifier script as **warnings** (not errors):

```js
// root background must be palette-dark; UI font must be mono
const esc = d.rootClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rootRule = d.css.match(new RegExp('\\.' + esc + '\\s*\\{([^}]*)\\}'));
const bg = rootRule && rootRule[1].match(/background(?:-color)?\s*:\s*([^;]+)/);
if (bg && !/#0a0a0b|#101012|#161619|transparent|var\(--bg/i.test(bg[1]))
  console.log('ROOT BG OFF-PALETTE:', d.id, bg[1].trim());
if (/font-family\s*:\s*Inter/.test(d.css)) console.log('INTER FONT:', d.id);
```

The agent currently writing FUI/Maps/Agent demos should run this **now** — new demos must land dark + mono from birth.

### Screenshot protocol (for future visual passes)

Headless Edge renders only the initial viewport — scrolled screenshots come out black, and `scroll-behavior:smooth` never lands under `--virtual-time-budget`. Working recipe: `--window-size=1400,31000` full-page screenshot (fresh `--user-data-dir`), then slice with Pillow into ~6 strips × 5170px, downscale to ~620px wide, review. `#cat-*` anchors now jump instantly and can frame specific categories.



## P1 — `lenis-smooth-scroll`: the one unreadable tile

Only demo rendering below zoom 0.55: measured **zoom 0.308** (root `clientHeight` ≈ 1040px — a stacked page layout, not an inner-scroll container). At a third scale it's illegible dead weight in the grid.

- **File:** `js/demos.scroll.js` (entry 001).
- **Fix:** restructure to the registry's own scroll-demo pattern — root = fixed `height:320px; overflow-y:auto` inner container (like `scroll-reveal-stagger` and the `scroll-*` demos), so the tile shows a real scrollbar and Lenis smooths the inner scroll at native size. Keep `id`, `rootClass`, Lenis wiring, and the anchors behavior. Update `prompt` to state the 320px inner-container requirement.
- **Acceptance:** reload, tile has no `zoom` style on its root, scrollbar visible, smooth-scroll works inside the tile and in the modal (380px).

## P2 — Idle life for 12 demos (controls exempt)

Checklist item: *a frozen tile is dead weight; something subtle should move before any interaction.* 51 demos have no autonomous motion, but **39 are form/button/menu controls — exempt by design** (they react to input; adding motion would be wrong). The actionable 12:

| Demo | File | Note |
|---|---|---|
| `lenis-smooth-scroll` | `js/demos.scroll.js` | fixed by P1 |
| `parallax-layers`, `horizontal-scroll`, `sticky-stack`, `scroll-progress`, `scroll-zoom` | `js/demos.scroll.js` | inner-scroll demos: apply **pattern A** (`git show 430b441`) — shorten top spacer so content peeks in, add animated scroll cue |
| `css3d-folding-map` | `js/demos.three.folding-map.js` | add gentle idle fold oscillation until first pointerdown (pattern B's drift approach) |
| `tilt-card` | `js/demos.cursor.js` | slow autonomous tilt sway until first pointermove |
| `hover-zoom-card`, `grayscale-grid` | `js/demos.image.js` | subtle Ken-Burns drift / periodic cell pulse |
| `letter-roll` | `js/demos.text.js` | auto-roll once on boot, then hover-only |
| `mac-window` | `js/demos.ui.js` | idle traffic-light breathe or title-bar shimmer; also see P3 |

Rules: motion must stop permanently on first interaction (one-shot `pointerdown`/`keydown` listeners), use transforms/opacity only, guard with `matchMedia('(prefers-reduced-motion: reduce)')`, and self-terminate when the root disconnects (`if (!el.isConnected) return` in rAF) because the modal orphans stages.

## P3 — Restraint judgment calls (45 demos ≥4 hue buckets)

Most are **concept-exempt** — color is the content: all raster/glitch demos (`scanline-crt`, `glitch-rgb-slices`, `vhs-tracking`, `pixel-sort`, `posterize-hover`, `interlace-flicker`, `dither-blue-noise`, `ascii-render`, `threshold-mosaic-transition`), scene/image demos (`kenburns-crossfade`, `image-duotone-swap`, `image-magnetic-tiles`, `image-slice-hover`, `image-infinite-zoom`, `cursor-hover-preview`, gallery/slider art placeholders), physics toys (`collision-bubbles`, `gravity-drop-icons`, `pendulum-tags`), `aurora-curtains`, `gradient-mesh-drift`, `btn-confetti-burst`, `like-heart-particles`, `dvd-screensaver`, `pet-the-blob`, `wobbly-window-drag`, `svg-blob-morph`, `svg-lissajous-loader`, `text-highlighter-swipe`, `glass-refraction-card`, `scroll-clip-morph`, `scroll-inertia-grid`, `text-clip-image`, `toast-stack` (semantic colors).

**Mute candidates** (chrome/UI color that Originkit would flatten to grays + ≤1 hue):

1. `text-ransom-note` (`js/demos.text.ransom-note.js`, 5 hues) — newsprint grays + single accent; concept survives.
2. `mac-window` (`js/demos.ui.js`, 4 hues) — mac chrome in grays; traffic lights may keep red/amber/green (semantic) — judge.
3. `drum-grid-sequencer` (`js/demos.sound.drum-grid-sequencer.js`, 5 hues) — one row accent color instead of per-row hues.
4. `zoom-ui-inception` (`js/demos.layout.zoom-ui-inception.js`, 4 hues) — depth layers in one hue ramp.

Rule: drift toward the site palette (`#0a0a0b/#101012/#161619` bg, `#232327/#2e2e34` lines, `#ececef/#9b9ba3/#5c5c66` text, `#a78bfa` accent). Don't touch concept-exempt demos. Skip any demo where muting would erase meaning.

## P4 — Fix the verifier, not the demos

`tools`-style vm check (from `CODEX_HANDOFF.md`) reports 468 `UNPREFIXED CLASS` errors — **all false positives**: state classes (`.is-active`, `.show`) and decorative child classes (`.sun`, `.r1`) that only appear in compound/descendant selectors under the prefixed root. A dedicated scan for genuinely global (bare, selector-leading) unprefixed classes found **zero**.

Action: amend the verifier's class check to flag a class only when it's the **leftmost class of a selector** and lacks the root prefix:

```js
// replace the UNPREFIXED CLASS block with:
demos.forEach(d => {
  const pfx = '.' + d.rootClass.split('-')[0] + '-';
  d.css.replace(/\/\*[^]*?\*\//g, '').split('}').forEach(rule => {
    const sel = rule.split('{')[0]; if (!sel || !sel.includes('.')) return;
    sel.split(',').forEach(one => {
      const first = (one.trim().match(/^\.[a-zA-Z][\w-]*/) || [])[0];
      if (first && !first.startsWith(pfx) && first !== '.' + d.rootClass)
        { console.log('BARE UNPREFIXED SELECTOR', d.id, one.trim()); errs++; }
    });
  });
});
```

Do **not** mass-edit ~100 registry files to satisfy the old rule.

## P5 — Shell accessibility gaps (`js/app.js`, `css/style.css` only)

1. **Tiles aren't keyboard-reachable.** `<article class="tile">` has a click handler and nothing else. Add per tile: `tabindex="0"`, `role="button"`, `aria-label="{num} {title} — open details"`, and `keydown` (Enter/Space → `openModal(d)`, `preventDefault` on Space to avoid scroll). Add `.tile:focus-visible { outline: 1px solid var(--accent); outline-offset: -1px; }` (or a `.tile-frame` border-color variant to stay in-system).
2. **Modal focus management.** On open: focus `.modal-close`. On close: return focus to the originating tile. No trap needed (page behind is `overflow:hidden`; keep it simple). `.modal-close` is sticky — fine.
3. **Reduced-motion audit:** 60 of 271 demos never mention `prefers-reduced-motion`. Regenerate the list:
   ```bash
   node -e "const vm=require('vm'),fs=require('fs');const c={};c.window=c;vm.createContext(c);fs.readdirSync('./js').filter(f=>f.startsWith('demos.')).forEach(f=>vm.runInContext(fs.readFileSync('./js/'+f,'utf8'),c,{filename:f}));console.log(c.INTRX.demos.filter(d=>!/prefers-reduced-motion/.test(d.css+d.js)).map(d=>d.id).join('\n'))"
   ```
   Add `@media (prefers-reduced-motion: reduce)` guards (or JS `matchMedia` checks) where **motion is the point** (ambient, physics, loaders, auto-playing teasers). Controls that only animate on direct input are lower priority. One file at a time; this is background work, not a sprint.

## Non-goals (explicitly)

- No new demo patterns here — the other agent owns `CODEX_HANDOFF_2.md`.
- No palette rewrites of concept-exempt demos (P3 list; A0 lists its own skeuo/paper exemptions).
- No prefix mass-edits (P4), no restructuring `demos.*.js` files beyond the entry under repair.
- Don't change `--bg`, the tile frame system, or the zoom-fit adapter — signed off. A1 touches demo-internal bg only.

## Verification (after every few repairs)

```bash
for f in js/*.js; do node --check "$f" || echo "SYNTAX FAIL $f"; done   # (PowerShell: Get-ChildItem js\*.js | % { node --check $_.FullName })
```

Full-boot headless check (fresh profile — Edge caches aggressively):

```bash
python -m http.server 8123
msedge --headless --disable-gpu --user-data-dir=$TMP\edgeqa --window-size=1400,31000 --virtual-time-budget=20000 --dump-dom "http://localhost:8123/index.html" > dom.html
# expect: 271+ tiles, zero "failed to boot", repaired demo's root has no tiny zoom (<0.55)
```

Zoom audit one-liner (per-tile first-child — do not use a wide regex window, it bleeds into the next tile):

```js
const re=/<article class="tile" id="([^"]+)"[^>]*>\s*<div class="demo-stage">\s*<[a-z0-9]+([^>]*)>/g;
// zoom value lives in m[2]'s style attr; flag any zoom < 0.55
```
