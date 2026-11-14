# CODEX HANDOFF 3: INTRX redesign, remediation, agent readiness and expansion

Prepared 14 Nov 2026, updated 15 Nov 2026 when the v4 design pass was completed (all 520 tiles). This document supersedes the visual rules in `AESTHETIC_BENCHMARKS.md` and the shell sections of `CODEX_HANDOFF.md` and `CODEX_HANDOFF_2.md`. Their per-demo interaction specs still apply.

**Design source:** Figma file [Interaction](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction). Every section below links the exact frame. Tokens exist as local Figma variables with web code syntax, so the CSS variable names here match the Figma inspect panel.

| Figma page | Frame | Link |
|---|---|---|
| 01 · Audit | UX audit | [30:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=30-2) |
| 02 · Foundations | Foundations board | [9:4](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=9-4) |
| 02 · Foundations | Kit (Button, Chip, Badge, IconButton, DockButton, Kbd, Tile) | [8:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=8-2) |
| 03 · Stage Kit | Stage contract, tile states, thumb vs full | [10:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=10-2) |
| 04 · Site — Desktop | Home | [48:260](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=48-260) |
| 04 · Site — Desktop | Library / category | [16:113](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=16-113) |
| 04 · Site — Desktop | Component detail | [18:221](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=18-221) |
| 04 · Site — Desktop | ⌘K palette | [20:263](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=20-263) |
| 04 · Site — Desktop | Pro gating (later) | [20:372](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=20-372) |
| 04 · Site — Desktop | Topbar component | [12:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=12-2) |
| 05 · Site — Mobile | Home · Detail · Browse sheet | [21:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=21-2) · [21:246](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=21-246) · [21:312](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=21-312) |
| 06 · Components — Redesigned | 12 before → after exemplars (stages synced to v4) | [22:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=22-2) |
| 07 · Components — New | Library v4 — New, 30 tiles | [99:299](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=99-299) |
| 08 · Agents & MCP | Registry, MCP, CLI, skill | [28:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=28-2) |
| 09 · Library — Interface | Library v4 — Interface, 89 tiles | [110:973](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=110-973) |
| 09 · Library — Interface | Direction v4 (the visual standard, 12 reference tiles) | [106:866](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=106-866) |
| 10 · Library — Motion | Library v4 — Motion, 67 tiles | [72:559](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=72-559) |
| 11 · Library — Pointer & Physics | Library v4 — Pointer & Physics, 53 tiles | [78:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=78-2) |
| 12 · Library — Data & AI | Library v4 — Data & AI, 30 tiles | [76:257](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=76-257) |
| 13 · Library — Visual FX | Library v4 — Visual FX, 88 tiles | [82:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=82-2) |
| 14 · Library — Collections | Library v4 — Collections, 72 tiles (DRAMS on light stages) | [88:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=88-2) |
| 15 · Extension — From reference sites | Library v4 — Extension, 91 tiles | [92:174](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=92-174) |
| 02 · Foundations | Photo library v2, dark editorial (the only photo set to use) | [104:4](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=104-4) |
| 99 · Archive | Superseded boards (v3 Interface, Direction v3, Home v1, older libraries). Do not build from these. | [71:1134](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=71-1134) |

**Per-tile lookup.** `manifest/components.json` (and `.csv`) in the handover folder lists every one of the 520 components with its Figma node ID and link, board, section, trigger, title, description, origin (repo, extension or new), stage theme and motion recipes. Use it to open the exact tile, for example with the Figma MCP `get_design_context` on `figmaNode`.

Counts shown in the Figma frames (trigger counts, "Show 29 more", and so on) are placeholders. The site computes them from the registry.

---

## 0. Ground rules

- **Stay zero-build.** Plain `<script>` tags, no bundler and no framework. Node tooling under `tools/` stays dependency-free. The new `packages/intrx` CLI/MCP package is the only place with npm dependencies.
- **Ship one phase per PR**, in the order of §9. Every PR must leave `node tools/verify-registry.js` and the updated browser verifiers green.
- **Don't regress interactions.** The interaction specs and prompts in the earlier handoffs are still the source of truth for behaviour. This handoff changes the frame, sizing, composition and chrome around them.
- **Credit and licence.** New components are original implementations *inspired by* public patterns. Never copy code or assets from the reference sites. Each new component's `seen`/`source` field names the pattern family, not a copied artefact.
- **Accent discipline.** Orange `--accent-default` marks CTAs, live state and the single highlight in a demo. Pro is neutral (`--pro-default` = text-primary on a hairline border, no gold). Never use orange for Pro.

---

## 1. Audit summary (what the work must fix)

Measured on `localhost:3000` at 1440×900 and 375×812 by booting all 399 tiles. `tools/audit-stage-fit.js` (added with this handoff) reproduces these numbers and is the acceptance gate for §5.

| Finding | Measured | Gate after this work |
|---|---:|---:|
| Tiles with content outside the stage | 50 | 0 (opt-out only via `stage.overflow: 'intentional'`) |
| Tiles that scroll sideways | 6 | 0 |
| Tiles rendering text ≤ 8px | 73 | 0 below 11px |
| Tiles filling < 12% of the stage | 56 (44 of 52 DRAMS) | 0 (bleed exempt) |
| Demos drawing their own control buttons | 195 | 0. Controls come from `demo.controls` |
| First paint when opening detail | 2–3 s | < 300 ms |

Root causes, P0 to P2 (full write-up in Figma `01 · Audit`):

1. **P0 Overflow.** There is no declared design size. `app.js` guesses a CSS zoom from leaf bounding boxes (lines ~150–190) and skips scroll containers, so wide roots (`cursor-*` at 360–392px, `form-multistep-progress` at 929px) crop.
2. **P0 Full view.** The modal stage is capped at 380px and stretches components to the modal width. There's no viewport, theme or fullscreen control.
3. **P0 Opening jank.** `location.hash = id` collides with the tile's `id`, so the page scrolls behind the modal. On top of that, `backdrop-filter: blur(6px)` sits over dozens of live canvases, and newly visible tiles boot behind the modal.
4. **P0 Touch.** Drag and pointer demos capture touch inside 396px tiles. Four hundred tiles sit in a single column.
5. **P1 Box-in-box.** 195 demos draw their own panel plus 11px chips (Animate, Reset …), each in a different style.
6. **P1 Unreadable thumbnails.** Full forms and dashboards are squeezed into the thumbnail; 73 tiles render text at 8px or less.
7. **P1 Scale mismatch.** DRAMS objects fill about 2–10% of pure-white stages inside a dark site.
8. **P1 Raw shell.** Roboto Mono everywhere, zero radius, 001–399 numbering, hints truncated with an ellipsis.
9. **P2 IA.** One 400-tile page, 26 flat categories, regex filters, no sort, featured section or batching.
10. **P2 Performance.** GSAP, ScrollTrigger and Lenis load for every visitor, but only 3 demos use them (`libs`: gsap 2, lenis 1). Google Fonts loads two mono families even though local fonts exist.
11. **P2 Agents.** There's only a hand-written `llms.txt`: no registry JSON, MCP server, CLI or skill.
12. **P2 Search.** Substring matching only, results aren't keyboard-navigable, and search is hidden in the drawer on mobile.

Appendix A lists the IDs in each bucket.

---

## 2. Foundations: tokens, type and kit (Figma `02 · Foundations`)

> **Update 14 Nov (v4):** the accent stays orange; greys are now neutral (no warm tint) and colour arrives through small tints. Use these values:
> `--accent:#FA7319; --accent-hover:#FF8A3D; --accent-subtle:rgba(250,115,25,.14); --focus-ring:#FF8A3D;`
> `--bg-canvas:#151515; --bg-surface:#1C1C1C; --bg-raised:#222222; --bg-overlay:#2A2A2A; --bg-stage:#151515;`
> `--border-subtle:rgba(255,255,255,.06); --border-default:rgba(255,255,255,.09); --border-strong:rgba(255,255,255,.14);`
> `--text-primary:#F1F1F1; --text-secondary:#A0A0A0; --text-tertiary:#6B6B6B;`
> `--tint-amber:#F5B544; --tint-violet:#A78BFA; --tint-cyan:#38BDF8; --tint-pink:#F472B6; --tint-blue:#4C9BFF; --tint-green:#3ECF8E; --tint-red:#F26D6D;` (use at 13% as chip fills with the full hue on the icon)
> The Pro badge is neutral: transparent fill, 1px border-strong, text-primary. No gold anywhere.

### 2.1 CSS variables

Replace the `:root` block in `css/style.css` with the following. Keep the old names as aliases for one release so demo CSS that references `--bg`, `--text-2` and similar keeps working. The light theme applies via `[data-theme="light"]` on `<html>`; dark is the default.

```css
:root{
  /* primitives (hidden in Figma): neutral greys, no warm tint */
  --p-gray-0:#FFFFFF;--p-gray-25:#FAFAFA;--p-gray-50:#F4F4F4;--p-gray-100:#EAEAEA;--p-gray-200:#D6D6D6;
  --p-gray-300:#B4B4B4;--p-gray-400:#8C8C8C;--p-gray-500:#6B6B6B;--p-gray-600:#4A4A4A;--p-gray-700:#2A2A2A;
  --p-gray-750:#222222;--p-gray-800:#1C1C1C;--p-gray-850:#151515;--p-gray-900:#101010;--p-gray-950:#0A0A0A;
  --p-orange-400:#FF8A3D;--p-orange-500:#FA7319;--p-orange-600:#E0600A;
  --p-green-500:#3ECF8E;--p-green-600:#1FA866;--p-red-500:#F26D6D;--p-red-600:#D63A40;

  /* semantic: dark (default) */
  --bg-canvas:var(--p-gray-850);--bg-surface:var(--p-gray-800);--bg-raised:var(--p-gray-750);
  --bg-stage:var(--p-gray-850);--bg-overlay:var(--p-gray-700);
  --border-subtle:rgba(255,255,255,.06);--border-default:rgba(255,255,255,.09);--border-strong:rgba(255,255,255,.14);
  --border-highlight:rgba(255,255,255,.06);
  --text-primary:#F1F1F1;--text-secondary:#A0A0A0;--text-tertiary:#6B6B6B;--text-inverse:var(--p-gray-950);
  --accent-default:var(--p-orange-500);--accent-hover:var(--p-orange-400);--accent-subtle:rgba(250,115,25,.14);
  --pro-default:var(--text-primary);--status-success:var(--p-green-500);--status-danger:var(--p-red-500);--focus-ring:var(--p-orange-400);
  /* tints: 13% chip fills with the full hue on the icon; never decorative */
  --tint-amber:#F5B544;--tint-violet:#A78BFA;--tint-cyan:#38BDF8;--tint-pink:#F472B6;--tint-blue:#4C9BFF;--tint-green:#3ECF8E;--tint-red:#F26D6D;

  /* space · radius · motion (motion tokens: see MOTION_SYSTEM.md, which supersedes these) */
  --space-half:2px;--space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:20px;--space-6:24px;
  --space-8:32px;--space-10:40px;--space-14:56px;--space-20:80px;
  --radius-xs:6px;--radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:20px;--radius-2xl:28px;--radius-full:999px;

  /* elevation */
  --elev-card:0 8px 24px -8px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.04);
  --elev-popover:0 24px 64px -12px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.06);

  /* type */
  --font-shell:'Geist',system-ui,sans-serif;--font-shell-mono:'Geist Mono',ui-monospace,monospace;
}
[data-theme="light"]{
  --bg-canvas:var(--p-gray-25);--bg-surface:var(--p-gray-0);--bg-raised:var(--p-gray-50);--bg-stage:var(--p-gray-50);--bg-overlay:var(--p-gray-0);
  --border-subtle:rgba(0,0,0,.06);--border-default:rgba(0,0,0,.09);--border-strong:rgba(0,0,0,.14);--border-highlight:rgba(0,0,0,.04);
  --text-primary:var(--p-gray-950);--text-secondary:#5C5C5C;--text-tertiary:var(--p-gray-400);--text-inverse:var(--p-gray-0);
  --accent-hover:var(--p-orange-600);--accent-subtle:rgba(250,115,25,.10);--pro-default:var(--text-primary);
  --status-success:var(--p-green-600);--status-danger:var(--p-red-600);--focus-ring:var(--p-orange-600);
}
/* stage-only light mode (DRAMS, skeuomorph, paper): same tokens scoped to the stage */
.stage[data-stage-theme="light"]{ --bg-stage:#F4F4F4; color-scheme:light; }
```

Legacy aliases, to be removed in Phase 4: `--bg:var(--bg-stage); --bg-2:var(--bg-surface); --bg-3:var(--bg-raised); --chrome:var(--bg-canvas); --line:var(--border-default); --line-2:var(--border-strong); --text:var(--text-primary); --text-2:var(--text-secondary); --text-3:var(--text-tertiary); --accent:var(--accent-default); --accent-dim:var(--accent-subtle); --mono:var(--font-shell-mono)`.

### 2.2 Fonts

- Add **Geist** and **Geist Mono** variable woff2 files to `assets/fonts/` (SIL OFL 1.1, from the `vercel/geist-font` repository) with their licence text, and declare them in `css/fonts.css` next to the existing Inter and Newsreader entries.
- Remove the Google Fonts `<link>`s for Roboto Mono and JetBrains Mono from `index.html`.
- **Shell** uses Geist. **Code, meta and counters** use Geist Mono. **No italics anywhere** in shell or demo copy; emphasis is colour (accent) or weight only. Drop the Newsreader editorial accent from the shell. **Demos keep their own typography** (Inter) inside the stage.
- If Geist can't be fetched in your environment, fall back to the already bundled Inter for the shell and leave a TODO. Don't block the phase on it.

Type ramp (Figma text styles of the same names):

| Style | Font | Size/line | Tracking |
|---|---|---|---|
| Display/Hero | Geist SemiBold | 64/64 (hero 76/80) | −3% |
| Display/Accent | Geist SemiBold, accent colour | 64/64 | −3% |
| Heading/H1 | Geist SemiBold | 40/44 | −2% |
| Heading/H2 | Geist SemiBold | 28/32 | −1.5% |
| Heading/H3 | Geist Medium | 20/26 | −1% |
| Heading/H4 | Geist Medium | 16/22 | −0.5% |
| Body/Large · Default · Small | Geist Regular | 16/26 · 14/22 · 13/20 | 0 |
| Label/Default · Small | Geist Medium | 13/16 · 12/16 | 0 |
| Mono/Code | Geist Mono Regular | 12.5/20 | 0 |
| Mono/Meta | Geist Mono Medium, uppercase | 11/14 | +4% |

### 2.3 Kit classes (Figma `Kit` frame, 8:2)

Implement these as shell CSS in `css/style.css`. All of them are pills (`--radius-full`).

| Class | Spec |
|---|---|
| `.btn` + `.btn--accent / --primary / --secondary / --ghost`, `.btn--sm` | 36px (sm 28px) tall, padding 0 16px (sm 12px), Label/Default (sm Label/Small). Accent: fill accent, text inverse. Primary: fill text-primary, text inverse. Secondary: fill raised, 1px border-default. Ghost: transparent, text-secondary. Hover lifts brightness 6%; active scales 0.98 over 90ms. Focus-visible: 2px focus-ring, offset 2px. |
| `.chip` / `.chip[aria-pressed="true"]` | 32px tall, padding 0 12px, fill surface + border-subtle, Label/Small text-secondary, plus count in Mono/Meta text-tertiary. Active: fill text-primary, text inverse, count at 60% opacity. **Never** accent. |
| `.badge--new / --pro / --lib / --soon` | 20px tall, padding 0 7px, Mono/Meta 10px. New: accent-subtle fill + accent text. Pro: transparent, 1px border-strong, text-primary (neutral, no gold). Lib: raised + text-secondary. Soon: raised + text-tertiary. |
| `.icon-btn` | 32px circle. Active: fill overlay + 1px border-strong. Icons are 16px, stroke 1.75 (a Lucide-style inline SVG sprite in `assets/icons.svg`). |
| `.dock-btn` | 28px tall, padding 0 12px, fill overlay at 72% opacity, 1px border-highlight, `backdrop-filter: blur(12px)`, Label/Small text-primary. |
| `.kbd` | 20px tall, padding 0 6px, radius 6, fill raised, 1px border-default, Mono/Meta text-tertiary. |

### 2.4 Photography (Unsplash)

Every component that shows imagery uses **real photographs from Unsplash** (Unsplash License: free, commercial use allowed). Don't use gradients posing as photos, illustrations or slate placeholders.

- **Use only the dark editorial set** (Figma Photo library v2, 104:4; contact sheet in `previews/11-photo-library-v2.png`). Keys: rain, smoke, smokeBlue, fire, cityNight, cityTeal, ocean, sea, forestDark, forestBlue, archGrid, portraitC1, portraitC2, portraitC3, silk, aurora, milkyway, roses, magnolia, interiorDark, chrome, fluidBlue, trails, embers, desk. mountains, ridge, archStripes, dunes and ceramics are retired (too light). The v1 set in `DESIGN_PROGRESS.md` is retired too. Older keys used by some tiles (dusk, warm, night and others) map to the closest v2 photo.
- **The Unsplash IDs and photographers of the v2 set were not recorded.** Before launch, find each photo on Unsplash using the contact sheet (or export the original from the Figma frame), confirm it is under the free licence and not Unsplash+, and record ID, photographer and URL in `ASSET_ART_DIRECTION.md`.
- Download each at 1600px (`https://images.unsplash.com/<id>?w=1600&q=80&fm=webp`) into `assets/images/<key>.webp`, plus an 800px variant for tiles.
- Self-host them: never hotlink from demos. Copied single-file snippets embed only the 800px variant through `demo-assets.js`, like today.
- Record the photographer name and photo page URL for each in `ASSET_ART_DIRECTION.md`, and show "Photo: Name / Unsplash" in the detail page Notes.
- Exclude Unsplash+ images. They aren't covered by the free licence.
- Replace the generated images now in `assets/images` wherever a demo uses them as content. Keep them only where a demo needs a specific composition, such as 038's timeline.
- Add more photos from Unsplash as needed for the extension list. Match the subject to the component (people for testimonials and avatars, product shots for commerce, architecture or landscape for galleries).

---

## 3. The stage contract (Figma `03 · Stage Kit`, 10:2)

This is the core fix. The shell owns the frame, sizing, dock, theme and lifecycle. The demo owns only what happens inside the safe area.

### 3.1 New registry fields

Add these fields to `INTRX.register({...})`. To avoid editing 287 files just for metadata, **put defaults in a sidecar** `js/meta.stage.js` keyed by id. Values in the demo object override the sidecar.

```js
INTRX.meta({
  'elastic-tabs': {
    designSize: [480, 360],        // required. [w,h] in CSS px, or 'bleed'
    stage: { theme: 'dark', overflow: 'clip' },   // theme: 'dark' | 'light'; overflow: 'clip' | 'scroll' | 'intentional'
    trigger: 'press',              // 'hover' | 'press' | 'drag' | 'scroll' | 'type' | 'ambient'
    controls: [ { label: 'Next tab', action: 'next' }, { label: 'Replay', action: 'replay' } ],  // max 3
    a11y: { keyboard: true, reducedMotion: true, aria: 'tablist' },
    useCases: ['settings', 'dashboards'],
    tier: 'free',                  // 'free' | 'pro'
    thumb: 'full',                 // 'full' (same composition) | 'hero' (demo renders a simplified thumb, see §3.3)
    addedAt: '2026-11',
  },
});
```

Size presets (Figma "Declared design size"): **sm** 320×240 (toggles, buttons, knobs), **md** 480×360 (inputs, tabs, toasts, cards), **lg** 720×480 (forms, dashboards, galleries), **bleed** (canvas, WebGL, backgrounds fill the stage). `designSize` may use a preset name or explicit numbers.

### 3.2 Geometry and scaling

- **Tile (beUI-style flat card):** width is fluid (grid `repeat(auto-fill, minmax(280px, 1fr))`, gap 16px). The card has no fill, a 1px `--border-default` border, radius 18 and no shadow. The preview area is flush with the card (no inner frame) and **264px** tall in the library (mobile 240, landing cards 196). Content that needs an edge (photos) clips at a 6px inset with radius 13. Light stages (`stage.theme: 'light'`) keep a `#F4F4F2` panel at that inset. Caption: padding 12/14/14, title 15px Geist Medium with badges **directly after the title** (NEW, PRO, lib), then one line of hint text (13px, tertiary, written to fit: no ellipsis in the copy). Hover: border goes to `--border-strong`, the dock and quick actions fade in.
- **Safe area:** 24px inset on thumbnails, 32px on detail. Dock zone is the bottom 48px when `controls.length > 0`.
- **Fit**, deterministic. Delete the leaf-walking heuristic in `runDemo`:

```js
function fitStage(stageEl, rootEl, meta, mode) {
  if (meta.designSize === 'bleed') { rootEl.style.cssText += ';width:100%;height:100%'; return 1; }
  const [w, h] = resolveSize(meta.designSize);           // preset → numbers
  const pad = mode === 'thumb' ? 24 : 32;
  const dock = (meta.controls || []).length ? 48 : 0;
  const s = Math.min(1, (stageEl.clientWidth - pad * 2) / w, (stageEl.clientHeight - pad * 2 - dock) / h);
  Object.assign(rootEl.style, { width: w + 'px', height: h + 'px', zoom: String(s) });
  return s;                                              // CSS zoom keeps pointer maths intact (all evergreen browsers)
}
```

Re-run on a `ResizeObserver` for the stage. Center the root in the area above the dock, 4–8px above optical center.
- **Light stages** (`stage.theme: 'light'`): set `data-stage-theme="light"` on the stage. Use this for all 52 DRAMS, the 20 Skeuomorph demos where the material is pale, and paper-based demos. Stage colour is `#F4F4F2` with a white top highlight. Never use pure `#FFF`.

### 3.3 Runtime API changes (`js/demo-runtime.js`, `js/app.js`)

Demo JS now receives a `ctx` argument:

```js
new Function('root', 'stage', 'ctx', ...TIMER_NAMES, code)(rootEl, stageEl, ctx, ...wrappers)
// ctx = { mode: 'thumb' | 'full', theme: 'dark' | 'light', reducedMotion: boolean,
//         scale: number, size: { w, h }, onAction(name, fn), emit(name, detail) }
```

- **Return value:** a demo may return a cleanup function (today's behaviour), or `{ cleanup, actions: { replay() {}, next() {} } }`. `ctx.onAction('replay', fn)` is equivalent. The shell renders `meta.controls` as `.dock-btn`s that call the matching action. **Every in-demo replay/reset/animate button must be removed** and its handler exposed as an action (195 demos, §5).
- **`ctx.mode`:** the detail page boots with `'full'`, tiles with `'thumb'`. If `meta.thumb === 'hero'`, the demo must render only the hero moment in thumb mode (one field, one state, one card). Exemplar: Password Strength (Figma Stage Kit "Thumbnail vs full").
- **Reduced motion:** the shell passes `ctx.reducedMotion`. Ambient loops render a static poster frame, springs fall back to `--ease-out` at ≤ 90ms, and nothing autoplays.
- **Live-tile cap:** the runtime gains `suspend()` and `resume()`. A `LiveTiles` manager keeps at most **6** tiles live on desktop and **1** on touch devices: those at least 50% visible and closest to the viewport center. The rest are suspended (frozen frame plus a play glyph overlay).

### 3.4 Author rules (enforced by new `tools/verify-stage.js`)

Do:
- Declare `designSize`, `stage`, `trigger`, `controls` and `a11y` for every demo.
- Render inside the safe area and use one neutral ramp plus one accent.
- Expose state changes as actions.
- Support `ctx.mode`, `ctx.reducedMotion` and `ctx.theme`.

Don't:
- Draw a card, panel or border around the whole demo (the tile is the frame).
- Hard-code widths beyond `designSize`.
- Render text under 11px.
- Use emoji as artwork.
- Use more than one accent hue.
- Start audio without a gesture.
- Capture wheel or touch outside the stage, or scroll the page.
- Keep timers running when suspended (always use the runtime wrappers).

`verify-stage.js` (Node, no browser) checks:
- meta presence and valid enums;
- `controls.length ≤ 3`;
- no `<button>` in demo HTML whose text matches `/^(replay|reset|animate|restart|play again)$/i`;
- no root-level `border:` or `background:` box on the root class unless `stage.overflow === 'intentional'` or the demo is listed in an allowlist.

`tools/audit-stage-fit.js` (browser) checks the rendered gates in §1.

---


### 3.9 Tile art direction (v4, supersedes all earlier tile visuals)

Every one of the 399 existing demos and the 91 extension components has a v4 tile on the boards above, and the 30 new components do too. Where a v4 tile and older art disagree, the v4 tile wins. The user asked for near-perfect craft and explicitly allowed departing from the current demos, so many concepts are re-imagined; build the demo the tile shows, not the old one.

- **Peak moment.** The tile shows the interaction at its most telling frame: the pill mid-stretch, the button leaning toward the cursor, the sheet held between snap stops. Tiles never show ghost trails, motion arcs, dashed guides or annotation labels; motion is specified in `MOTION_SYSTEM.md`, not drawn. In code, the thumbnail's `ambient` loop must pass through that frame, and `prefers-reduced-motion` freezes on it.
- **One hero object**, optically centred, clear of the control dock (keep content above 78% of stage height). Incidental content is grey placeholder bars (white 8%, 7px, round ends); real text only when the text is the component.
- **Geometric symmetry.** Every blob, curve and shape is mirror-symmetric or a regular construction (true arcs and circles, regular grids, centred stacks). No random scatter.
- **Dock = trigger verb.** The tile's dock pill shows the trigger verb that opens its hint (Press, Hover, Drag, Move, Scroll, Ambient, Type, Hold…). On the live site the dock holds the demo's real controls (`controls`), at most two.
- **Material.** Surfaces `#1C1C1C` on stage `#151515` (neutral greys); 1px `rgba(255,255,255,.07)` borders; layered shadows: `0 28px 56px -18px rgba(0,0,0,.55), 0 2px 6px -2px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.07)`. One accent (`--accent`), used once per tile. Green and red only for success and error; other hues only where they carry meaning (terminal green, RGB-split glitch, colour-picker hue rail, collaborator cursors, DRAMS knobs). Decorative blue, purple and multicolour fills are not allowed.
- **Gradients are near-flat.** Colour stops sit within a few percent of each other; ambient glows stay under 6% alpha. No visible banding, no rainbow fills except functional ones (colour picker hue rail).
- **Real content and dark photography** from `assets/images` (Unsplash, v2 dark set only). No brand marks in photos: the perfume and car photos were replaced; do not reintroduce them.
- **No italics** anywhere. Geist for UI and display, Geist Mono for meta and numbers, Inter inside demos.
- **Hints** are 56 characters or fewer, `Trigger · what happens`.
- **DRAMS** renders on light stages (`stage.theme: 'light'`): base `#E9E7E2`, plates `#F3F1EC`, grooves `#D8D5CD` with inner shadow, accent balls with a small specular highlight.
- **IP:** registry titles for `drams-036` (OP1), `drams-048` (R2D2) and `drams-051` (Braun) name real products or a film character. The v4 tiles are original designs titled Pocket Keys, Rover Shell and Electric Shaver; rename the registry entries to match.

## 4. Shell redesign

### 4.1 Information architecture and routing

Split `js/app.js` into plain scripts loaded in this order: `js/shell/registry.js` (merges sidecar meta, groups, triggers), `js/shell/stage.js` (fit, LiveTiles, dock), `js/shell/router.js`, `js/shell/views/home.js`, `js/shell/views/library.js`, `js/shell/views/detail.js`, `js/shell/palette.js`, `js/shell/main.js`.

Hash routes (static-host friendly):

| Route | View |
|---|---|
| `#/` | Home |
| `#/library` · `#/library/<cat-slug>` · `#/trigger/<trigger>` · `#/new` · `#/picks` | Library grid |
| `#/c/<id>` | Detail page (a full view, **not** a modal) |
| legacy `#<id>`, `#cat-<slug>` | `history.replaceState` to the new route |

Restore scroll position per route on back navigation. Tile DOM ids become `tile-<id>` so they can never collide with routes.

**Groups** (sidebar, Browse sheet; category names unchanged):

- **Interface:** Buttons & Micro, Forms & Inputs, Navigation & Menus, Layout & UI, Loaders & Progress, Galleries & Sliders
- **Motion:** Scroll, Text & Type, SVG & Line, 3D & Perspective
- **Pointer & Physics:** Cursor, Physics, Liquid & Organic, Play & Easter Eggs
- **Data & AI:** Agent & AI UI, Data & Numbers, Maps & Geo, FUI & Terminal
- **Visual FX:** Image & WebGL, Raster & Glitch, Ambient, Skeuomorph, Sound & Haptics
- **Collections:** Interactive Showcase, DRAMS, Framer Collection

**Triggers:** add `trigger` to every demo via the sidecar. A heuristic first pass over tags, hint and category gives roughly hover 71, press 102, drag 90, scroll 32, type 42, ambient 62. Hand-check every DRAMS, Cursor and Layout entry.

### 4.2 Home (Figma 48:260) and Library (16:113)

**Topbar** (64px, sticky, `rgba(10,10,10,.8)` + blur 16, bottom border-subtle), left to right:
- mark and wordmark;
- nav pills (Library, Collections, Agents & MCP, Docs, Pricing + SOON badge);
- spacer;
- search field (280px, opens ⌘K);
- theme icon-btn;
- GitHub star pill;
- **Connect agent** (`.btn--primary`).

**Home** follows beUI's homepage order (Figma 48:260):
1. **Promo strip** (36px, raised): "The INTRX MCP server is live…" plus a "Set up →" chip.
2. **Topbar.**
3. **Hero:** centered.
   - An eyebrow chip ("New · 30 components and an MCP server").
   - A 64px H1 on two lines, "Interactions for the web," and "ready for your agent." The second line is accent orange, **not italic**.
   - A two-line 17px subcopy.
   - CTAs: Browse components (accent) and Connect your agent (secondary).
4. **"One command. The source is yours."** Centered caption above a 540px command card:
   - Tabs: npx (active white pill), bun, pnpm, MCP, plus a copy icon button.
   - An inset code row `$ npx intrx add elastic-tabs`, coloured `$` grey, `npx` `#FFB27A`, `intrx add` `#7AA7FF` and the id white Medium.
   - The MCP tab shows `claude mcp add intrx -- npx -y intrx@latest mcp`.
5. **Recently launched:** NEW eyebrow, H2, "See all 30 →" chip, and 4 landing cards (288×272, stage 196).
6. **"Everything in the library":** EXPLORE eyebrow and H2.
   - A segmented control with counts: Interface 89 · Motion 67 · Pointer & Physics 53 · Data & AI 30 · Visual FX 88 · Collections 72 · New 121. The active segment is filled accent with dark text.
   - A 4×2 grid of landing cards for the active group.
   - An "All 89 in Interface →" button that links to `#/library/<group>`.
7. **For agents band:** copy, CTAs and the tabbed MCP config card.
8. **"Start free. Go further with Pro.":** a Free card ($0, MIT) and a Pro card ("Join the list", neutral hairline border with a soft halo, "Get notified"). There's no payment flow until §8.
9. **FAQ:** accordion, first row open.
10. **Footer.**

Don't add testimonials until there are real, attributable quotes.

**Library page:**
- 264px sidebar (All, New this month, Staff picks, then groups with category counts; active row raised with a 2px accent bar).
- Header: breadcrumb, H1, count, one-line description.
- Toolbar: trigger chips with counts; Stack and Sort dropdowns (Featured, Newest, A–Z); grid/rows density toggle.
- Grid of tiles in **batches of 12** with "Show N more". Replace the legacy agent strip, comparison table and roadmap sections; move their content to Docs.

### 4.3 Detail page (Figma 18:221)

Layout: 1344px content; main column 1000px plus a 320px right rail, gap 24.

- **Header:** breadcrumb plus prev/next pills on the right. H1, badges (NEW, lib), and a trigger chip. A 760px description. Actions: Copy prompt (secondary), **Copy code** (accent), Share icon-btn.
- **Stage card:** 6px bezel. The toolbar row (44px) shows, on the left, a live dot and `designSize · scale` in Mono/Meta. On the right: Replay, Speed (0.5×, 1×, 2×; scales runtime time), Theme segmented control (dark/light stage), Viewport segmented control (Desktop = stage width; Tablet = 768-wide frame; Mobile = 390-wide frame, centered with a device outline), and Fullscreen (Fullscreen API on the stage card; Esc exits). The stage is `min(560px, 70vh)` tall, boots in `mode: 'full'`, and keeps the dock bottom-center.
- **Source card:** tabs Single file · HTML · CSS · JS · LLM prompt · React port (SOON badge). Line-numbered code with a tiny highlighter (comments, strings, keywords, tags). Collapsed to 18 lines with "Expand · N lines". Copy button top-right shows "Copied ✓" for 1.4s.
- **Notes:** bullets from `desc` plus timing details, and "Seen on".
- **Right rail:**
  - **Details:** Trigger, Category, Stack, Design size, Stage, Added, License, plus accessibility chips.
  - **Use with your agent:** MCP / CLI / Prompt segmented control (§6.6).
  - **Related:** 3 rows with mini thumbnails.
- **Performance:** opening detail calls `LiveTiles.suspendAll()`, renders the view, and boots one runtime. There's no backdrop blur anywhere over live content. Target: first paint under 300ms.

### 4.4 ⌘K palette (Figma 20:263)

640px wide, radius 28, `--elev-popover`, over a 72% canvas scrim (no blur).

- **Scope chips:** All, Components, Categories, Actions.
- **Results:** fuzzy-ranked over title, tags, useCases, category and source name, with a 56×40 mini thumbnail (static poster) and the matched substring in accent.
- **Actions:** Copy MCP config, Toggle theme, Open random.
- **Keys:** ↑↓ to move, ↵ opens, ⌘C copies code, ⌘P copies the prompt, Esc closes.
- **Accessibility:** `role="dialog"` plus a combobox/listbox with `aria-activedescendant`.

### 4.5 Mobile and touch (Figma 21:2, 21:246, 21:312)

- **Header:** 56px with mark, search and menu. The menu opens the **Browse sheet** (bottom sheet with grab handle, search field, grouped categories).
- **Trigger chips** scroll horizontally with a right edge fade.
- **Tiles:** single column, stage 240px. **One live tile at a time** (the one nearest center). Tiles whose trigger is `drag` or `hover` start suspended with a tap-to-play overlay, and idle stages get `touch-action: pan-y`, so the page never gets trapped.
- **Detail:** back button and share. The stage is 360px tall with a compact toolbar (Replay, Theme, scale readout, Fullscreen). Code / Prompt / Agent sit in a segmented control above the source. A **sticky bottom bar** holds Copy prompt and Copy code.

### 4.6 Performance budget

- Lazy-load GSAP, ScrollTrigger and Lenis only when a demo whose `libs` includes them boots: `loadScript(url)` memoized, and boot awaits it.
- Drop Google Fonts.
- Defer `demo-assets.js` (embedded images) until the first image demo boots.
- Cap live tiles (§3.3).
- Budget: home transfers under 400KB before interaction (excluding demo assets); Lighthouse Performance ≥ 90 on mobile for `#/` and `#/c/elastic-tabs`.

### 4.7 Accessibility

- **Tile as a unit:** a focusable caption button opens detail. Space toggles play on the focused tile. Demos stay reachable with Tab only on the detail page (tiles set `inert` on suspended stages).
- **Focus ring:** 2px `--focus-ring` outside the bezel.
- **Contrast:** text-tertiary on surface must stay ≥ 4.5:1 in both themes (verify `#6B6B67` on `#151514`; raise to `#7A7A75` if it fails).
- **Announcements:** copy actions announce via `aria-live="polite"`.

---

## 5. Remediation of the existing 399 demos

Work bucket by bucket, one PR per bucket. Each bucket has an exemplar in Figma `06 · Components — Redesigned` (22:2). Apply the same pattern to every ID in the bucket (Appendix A). After each bucket, `tools/audit-stage-fit.js` must show zero offenders for that bucket.

| Bucket | Pattern | Exemplar |
|---|---|---|
| **A. Own chrome** (195 demos with in-demo buttons/panels) | Remove outer panel, border and background. Move buttons to `controls` plus actions. Re-center. | `btn-border-beam`, `toast-stack` |
| **B. Too wide / overflow** (Appendix A.1, A.2) | Declare `designSize`. Remove fixed widths. If the overflow is the point (marquees, reels, carousels), set `stage.overflow: 'intentional'` and add 40px edge fades to `--bg-stage`. | `cursor-drag-ghost`, `drag-carousel`, `form-multistep-progress` |
| **C. Tiny text** (A.3) | Pick a size preset that keeps text ≥ 11px after zoom, or ship `thumb: 'hero'`. | `agent-token-meter`, `input-float-label` |
| **D. Low fill / DRAMS** (A.4) | `stage.theme: 'light'` for DRAMS. Use designSize `sm` so the object fills 30–40% of stage width. Add a value readout or tick scale where the control has a value. | `drams-001` I/O Switch, `drams-002` Standard Volume |
| **E. Full UI in a thumbnail** (forms, dashboards, agent panels) | `thumb: 'hero'`: field + meter, one card, one state. Full composition on detail. | `password-strength-bar`, `otp-code-boxes` |
| **F. Placeholder art** (slate gradients, lorem, emoji glyphs) | Use the photographic assets in `assets/images` and real-sounding microcopy. Replace emoji with SVG glyphs. | `drag-carousel`, `skeleton-shimmer` |
| **G. Scroll-inside-tile demos** (`scroll-*`, `nav-hide-reveal`, `nav-blur-elevate`, `showcase-tracing-story`) | `stage.overflow: 'scroll'`. The thumbnail auto-plays a 6s scripted scroll loop (reduced motion: static at 40%). Detail lets the user scroll. A scroll hint chip in the dock ("Scroll ↓"). | `scroll-split-screen` |

Every changed demo also updates its `prompt` where the visual spec changed (sizes, colours, controls). Keep the interaction maths identical.

---

## 5b. Motion system (supersedes every per-demo timing value)

Every hover, press, drag and state change follows **`MOTION_SYSTEM.md`** (same folder). It is calibrated to transitions.dev's shipped values and contains: the 10 motion principles, the CSS token block for `css/style.css`, 34 named recipes (exact durations, curves, distances, blur), a per-component table for all 399 demos plus the 91 extension and 30 new components, and an audit of what each existing demo must change.

Live reference: the **INTRX motion reference** page (claude.ai artifact, link in the session) runs 20 of the recipes with the real tokens; treat it as the behavioural source of truth when the written spec is ambiguous.

Implementation order (one PR each):
1. Add the token block and the reduced-motion overrides to `css/style.css`. Expose `--ease-*` and `--dur-*` to demos through the stage root.
2. Replace literal curves and durations in every demo with tokens (`MOTION_SYSTEM.md` §4 lists the mapping; 96 demos use off-system curves, 33 use off-scale durations).
3. Add reduced-motion paths to the 60 demos that lack one, and move hover motion inside `@media (hover:hover)`.
4. Bring each demo's transitions to its listed recipes (§5 and §6). Interruptibility and exit-faster-than-enter are acceptance criteria, not polish.
5. Add `tools/verify-motion.js` and `tools/motion-baseline.json` (both ship in the handover folder's `tools/`; tested against the 15 Nov repo, 399 demos and 168 with violations). The default mode fails CI only on violations that are not in the baseline. Re-run `--update-baseline` after each remediation bucket, and switch CI to `--strict` once §5b is complete. Its `linear` check is stricter than the audit table in `MOTION_SYSTEM.md`: it also counts scroll-bound and looping demos. Those may keep `linear` on bound values; record them in the baseline.

Acceptance per demo is §7 of `MOTION_SYSTEM.md`.

---

## 6. Agents and MCP (Figma `08 · Agents & MCP`, 28:2)

### 6.1 Registry build: `tools/build-registry.js`

Node, zero dependencies. Loads the demo files and the sidecar meta (same VM approach as `verify-registry.js`), validates, and writes:

```
registry/index.json            # [{ id, title, category, group, trigger, tags, useCases, tier, desc, designSize, stage, libs, addedAt, url, thumb }]
registry/c/<id>.json           # full item (schema below)
registry/categories.json       # [{ name, slug, group, count }]
registry/tokens.json           # §2.1 values (+ css string, + tailwind theme extension)
registry/stage-contract.json   # presets + author rules (§3)
r/<id>.json                    # shadcn "registry-item" (type: registry:block, files[].content = single-file HTML) so `npx shadcn add https://<host>/r/<id>.json` works; React ports replace this later
llms.txt                       # regenerated: header + one line per component (id · title · trigger · one-line desc · url)
llms-full.txt                  # every prompt, grouped by category
```

Item schema (`registry/c/<id>.json`):

```json
{
  "$schema": "https://intrx.vercel.app/registry/schema.json",
  "id": "elastic-tabs", "title": "Elastic Tabs", "category": "Layout & UI", "group": "Interface",
  "trigger": "press", "tags": ["tabs","spring","segmented"], "useCases": ["settings","dashboards"],
  "tier": "free", "stage": { "theme": "dark", "designSize": [480,360], "overflow": "clip" },
  "a11y": { "keyboard": true, "reducedMotion": true, "aria": "tablist" },
  "libs": [], "files": [{ "path": "elastic-tabs.html", "type": "single-file", "content": "<!DOCTYPE html>…" }],
  "parts": { "html": "…", "css": "…", "js": "…" },
  "prompt": "…", "notes": ["…"], "related": ["inverse-pill-tabs","tab-morph-content"],
  "source": { "name": "INTRX", "license": "MIT", "credit": null }, "version": "3.0.0", "updatedAt": "2026-11-14"
}
```

The single-file content reuses the existing `buildCode()` logic. Move it to `js/shell/export.js` so both the site and the build script use it. **Pro items** (`tier: 'pro'`) emit `files: []` and `parts: null` publicly, plus `"locked": true`. Their source ships through the authenticated path in §8.

Add `npm`-free scripts: `node tools/build-registry.js` (writes) and `node tools/build-registry.js --check` (fails CI if the committed registry is stale). Add a CI step in `.github/workflows/pages.yml` that runs both verifiers and `--check`.

### 6.2 MCP server and CLI: `packages/intrx/`

One npm package (name **`intrx`**; check availability on npm, and fall back to `@tanziro/intrx`). Node ≥ 18. Dependencies: `@modelcontextprotocol/sdk`, `zod`. Binary: `intrx`.

```
intrx mcp                         # stdio MCP server
intrx add <id> [--dir src/components/intrx] [--format html|parts] [--registry <url|path>]
intrx search <query> [--trigger press] [--category "Layout & UI"] [--json]
intrx list [--category …]
```

- **Registry source:** `--registry`, else `INTRX_REGISTRY_URL`, else `https://intrx.vercel.app/registry`. Cache responses in `~/.cache/intrx` with ETag revalidation. `--registry ./registry` enables offline/local development.
- **Tools** (names, inputs and outputs exactly as in the Figma table):

| Tool | Input (zod) | Returns |
|---|---|---|
| `search_components` | `query?: string, trigger?: enum, category?: string, stack?: 'vanilla'\|'gsap'\|'webgl'\|'canvas', tier?: 'free'\|'pro', limit?: number = 12` | `[{ id, title, category, trigger, desc, url, tier }]`, ranked (title > tags > useCases > desc) |
| `get_component` | `id: string, format?: 'html'\|'parts'\|'react'\|'vue' = 'html'` | `{ files, libs, designSize, a11y, prompt, notes }`. For `react`/`vue` before ports exist: the vanilla file plus prompt and an instruction to port. For Pro without a key: `{ locked: true, prompt, upgradeUrl }`. |
| `get_prompt` | `id` | prompt text |
| `list_categories` | none | `[{ name, group, count }]` |
| `get_tokens` | `format?: 'css'\|'json'\|'tailwind'` | tokens |
| `get_stage_contract` | none | presets + rules |
| `related_components` | `id, limit?: 4` | `[{ id, title, reason }]` |

- **Resources:** `intrx://component/{id}`, `intrx://category/{slug}`, `intrx://tokens`.
- **Prompts:** `add-interaction` (args `brief`, `framework`: search, then pick, then fetch, then adapt to the host project's tokens, keeping timing, easing, keyboard and reduced motion) and `audit-motion` (args `path`: review a file against the INTRX rules).
- **Pro keys (Phase 6):** read `INTRX_KEY` from env and send it as `Authorization: Bearer` to the Pro endpoint. Without a key, Pro IDs return locked items.
- **Tests:** `node --test` covering search ranking, `add` writing files, locked-item handling and the stdio handshake (spawn plus `initialize` / `tools/list`).
- **Optional (Vercel only):** a remote MCP endpoint in `api/mcp.js` using the SDK's Streamable HTTP transport over the same registry, so Claude.ai and other remote clients can connect. GitHub Pages can't host it, so keep it behind the Vercel deployment.

### 6.3 Agent Skill: `skills/intrx/SKILL.md`

Frontmatter: `name: intrx`, plus a `description` that triggers on requests for animations, micro-interactions or "make this feel nicer". The body covers:

1. Search via MCP, or fetch `registry/index.json` if MCP isn't connected.
2. Prefer components whose `trigger` matches the requested gesture.
3. Fetch the item and port it to the host stack, **keeping durations, easings and maths exactly as in the prompt**.
4. Map colours to the host project's tokens, never hard-coding the INTRX palette.
5. Keep keyboard support and the reduced-motion branch.
6. Don't add GSAP or Lenis unless `libs` requires them.
7. Report what was ported.

Ship `skills/intrx/references/stage-contract.md` (copy of §3.4) and `references/motion-tokens.md`.

### 6.4 `AGENTS.md` and docs

Extend the root `AGENTS.md` (a starter ships with this handoff) as each phase lands: repo layout, the stage contract summary, the verify commands and "one bucket per PR". Add a Docs view at `#/docs` (static markdown rendered by a tiny renderer) with these pages:
- Getting started
- MCP setup (per client)
- CLI
- Agent Skill
- Registry schema
- Stage contract (for contributors)
- License and credits

### 6.5 llms.txt

Generate it. Don't hand-edit. Keep the current header paragraph, then sections per group, each line as `- [Title](https://intrx.vercel.app/#/c/<id>): <trigger> · <one-line desc> · registry: /registry/c/<id>.json`.

### 6.6 "Use with your agent" UI

- **Detail rail:** MCP / CLI / Prompt segmented control.
  - MCP shows a sample ask, e.g. *"Use intrx to add elastic-tabs to the settings page"*.
  - CLI shows `npx intrx add <id>` with copy.
  - Prompt copies the LLM prompt.
- **Home band and ⌘K action:** copy the client config. Tabs:
  - Claude Code: `claude mcp add intrx -- npx -y intrx@latest mcp`
  - Cursor / VS Code / Codex: JSON snippets with `command: "npx", args: ["-y","intrx@latest","mcp"]`. For Codex, use `~/.codex/config.toml` `[mcp_servers.intrx]` syntax.

---

## 7. New components (30) (Figma `07 · Components — New`, Library v4 — New, 99:299)

All 30 are original implementations under the stage contract. Each needs:
- the full registry object (html/css/js/prompt ≥ 300 chars);
- sidecar meta;
- `controls` as listed;
- keyboard support where interactive;
- a reduced-motion branch;
- `thumb` composition matching the Figma tile.

"Ref" names the public pattern family for `seen`. Don't copy code. **PRO?** marks Pro-tier candidates; ship them as `tier: 'free'` until §8 is live, and let the owner flip the flag.

### Agent & AI UI (`js/demos.agent.<id>.js`)

| id | Title | Trigger · size | Controls | Behaviour and timing | Ref | PRO? |
|---|---|---|---|---|---|---|
| `agent-prompt-composer` | Prompt Composer | type · md | Attach, Send | Auto-grow textarea (1→6 rows, 120ms height spring). Attachment chips fly in from the clip icon (scale .8→1, y 8→0, 240ms ease-out). Model pill opens a 3-item menu. Send morphs to a stop square while "generating" with a conic progress ring (2.4s), then morphs back. ⌘↵ sends. | beUI Prompt Input, BoardUI Composer | |
| `agent-voice-orb` | Voice Orb | press · md | Hold | Hold Space or the pointer to "listen": canvas orb with noise-displaced radius (simplex, amplitude follows a simulated mic envelope 0–1). States idle / listening / thinking (slow rotation) / speaking (pulses to a scripted envelope). 5 level bars under the orb. | beUI Voice Orb, ReverseUI Glowing Orb | ✓ |
| `agent-approval-card` | Tool Approval Card | press · md | Reset | The card asks to run a command. Approve: buttons collapse, card height animates to a 40px receipt row with a check draw (320ms). Deny: 3-cycle shake (6px, 260ms), command gets strike-through, card dims. Enter = approve, Esc = deny. | beUI Approval Card | |
| `agent-image-gen-reveal` | Image Generation Reveal | ambient · md | Replay | Photo from `assets/images` revealed in 4 diffusion passes: noise, then 16px mosaic, 8px, 4px, sharp. A scanline sweeps between passes, with a percentage label. 4.8s total. Reduced motion: final image with a fade. | transitions.dev placeholder, Aceternity loader | ✓ |
| `agent-task-checklist` | Agent Task Checklist | ambient · md | Replay | 5 steps. The active step shows a 300° arc spinner. On completion the check draws (stroke-dashoffset, 220ms), the label strikes through, and after 3 done they collapse into a "3 completed" summary row (height spring). | beUI Todo List, BoardUI Task List | |
| `agent-citation-chips` | Citation Hover Chips | hover · md | none | Inline numbered chips in an answer paragraph. Hover or focus opens a preview card (favicon, domain, title, two-line snippet), spring-positioned above the chip with horizontal clamp. Tab cycles chips. | beUI Citations | |

### Buttons & Micro (`js/demos.micro.<id>.js`)

| id | Title | Trigger · size | Controls | Behaviour and timing | Ref |
|---|---|---|---|---|---|
| `micro-smoke-delete` | Smoky Delete | press · md | Delete, Undo | The row rasterises to a canvas. Particles drift up and right with curl noise and fade over 900ms while siblings close the gap (FLIP, 320ms spring). Undo restores in reverse. | transitions.dev delete dissolve, bencho Dust delete |
| `micro-inline-confirm` | Inline Confirm | press · sm | Reset | The Delete button expands in place to "Delete 3 files? Cancel · Delete" (width spring). The confirm button needs a 600ms hold, shown as a fill bar; releasing early reverts. | bencho Inline confirm |
| `micro-star-rating` | Spring Star Rating | hover · sm | none | Hover previews fill with 30ms stagger, half-star by pointer x. Click pops the selected star (scale 1.25, spring) and emits 8 sparks. Arrow keys set the value in 0.5 steps. | ReverseUI Star Rating |
| `micro-reaction-bar` | Reaction Bar | hover · sm | none | Hovering "React" raises a 5-glyph bar (SVG glyphs, no emoji) with dock-style magnification (max 1.35). Selecting one flies it into the counter (arc path, 420ms). | bencho Emoji reactions |
| `micro-shimmer-status` | Shimmer Status Text | ambient · sm | Next | A text-clipped luminance band sweeps every 1.6s. Status phrases swap with a blur crossfade (180ms). | transitions.dev Shimmer text / Thinking states |

### Layout & UI (`js/demos.layout.<id>.js`)

| id | Title | Trigger · size | Controls | Behaviour and timing | Ref |
|---|---|---|---|---|---|
| `ui-folder-peek` | Folder Peek | hover · sm | none | Hover: front flap rotates −14° on X (perspective 600), 3 documents rise and fan (−8°, 0, 8°) with 40ms stagger. Click opens the folder to a 3-up grid. | bencho Folder, beUI Project Folder |
| `ui-avatar-stack` | Avatar Stack Spread | hover · sm | none | Overlapping avatars spread apart on hover (gap −12 → 6px). The hovered avatar lifts 6px and shows a name tooltip. "+8" expands into the remaining avatars. | transitions.dev Avatar group |
| `ui-link-preview` | Link Preview Hover | hover · md | none | Underlined link. On hover a preview card appears above, follows the pointer x with spring lag, tilts ±3° with velocity, and the image crossfades. | Aceternity Link Preview |
| `ui-card-fan` | Card Fan | hover · sm | Deal | The stack fans into a 48° arc on hover. Deal sends the top card forward (y −40, scale 1.05) and returns it to the back. | bencho Card fan |
| `ui-onboarding-checklist` | Onboarding Checklist | press · md | Complete next | Progress ring plus 5 items. Completing an item strikes it, ticks the ring (spring), and the next item becomes accent. At 5/5 the list collapses to a success state. | ReverseUI Onboarding Tasks |
| `ui-inverse-tabs` | Inverse Pill Tabs | press · sm | Next | The pill slides between tabs. `mix-blend-mode: difference` inverts the label under it, so letters flip colour mid-slide. Arrow keys work. | ReverseUI Exclusion Tabs |
| `ui-selection-bar` | Selection Action Bar | press · md | Select all, Clear | Selecting rows raises a floating action bar (y 24→0, 260ms spring) with a live count (odometer digits). Clearing drops it. | bencho Selection actions |

### Forms & Inputs (`js/demos.forms.<id>.js`)

| id | Title | Trigger · size | Controls | Behaviour and timing | Ref |
|---|---|---|---|---|---|
| `form-slide-to-confirm` | Slide to Confirm | drag · md | Reset | Thumb drags along the track with rubber-banding past the ends. The label shimmer fades with progress. Past 80% it snaps to the end and shows a check; otherwise it springs back. Keyboard: →/End. | bencho Slide to confirm |
| `form-picker-wheel` | Picker Wheel | drag · md | none | Three wheel columns (hour, minute, AM/PM) using rotateX per row on a cylinder. Momentum with friction 0.92 and snap to row. Mouse wheel and arrow keys supported. Top and bottom fade to `--bg-stage`. | bencho Picker wheel |
| `form-precision-scrubber` | Precision Scrubber | drag · md | none | Slider whose sensitivity drops as the pointer moves vertically away from the track (×1 / ×0.5 / ×0.1 at 0 / 40 / 100px). A multiplier badge and dashed guide show the mode. | ReverseUI Adaptive Precision |
| `form-dropzone-morph` | Upload Dropzone | drag · md | Simulate drop | Dragover: the zone inhales (scale .98) and the dashed border animates. Drop: file chip with a progress bar, then a success check. Real file input fallback. | bencho Upload dropzone |

### Data & Numbers, Navigation

| id | Title | Cat | Trigger · size | Controls | Behaviour and timing | Ref | PRO? |
|---|---|---|---|---|---|---|---|
| `data-activity-rings` | Activity Rings | Data & Numbers | ambient · sm | Replay | 3 concentric rings fill with overshoot (1.04 then 1) and a glowing tip; values count up with tabular numerals. | BoardUI Activity Rings | |
| `data-candlestick-crosshair` | Candlestick Crosshair | Data & Numbers | hover · lg | none | OHLC canvas. The crosshair snaps to the nearest candle and shows a price tag on the axis plus an OHLC tooltip. Volume bars highlight. Arrow keys step through candles. | beUI Candlestick | |
| `data-sankey-flow` | Sankey Flow | Data & Numbers | hover · lg | Replay | Ribbons draw left to right (dash animation, 900ms). Hovering a node isolates its flows (others fade to 15%). | beUI / BoardUI Sankey | ✓ |
| `nav-pill-condense` | Condensing Pill Nav | Navigation & Menus | scroll · lg | Scroll | Inside a scrolling mock page, the full-width nav condenses into a floating centered pill after 120px (width, radius and blur interpolate with scroll). | Aceternity Resizable Navbar | |

### Visual FX

| id | Title | Cat | Trigger · size | Controls | Behaviour and timing | Ref | PRO? |
|---|---|---|---|---|---|---|---|
| `fx-liquid-glass` | Liquid Glass Lens | Image & WebGL | drag · bleed | none | Draggable pill lens over a photo. A WebGL refraction shader (normal-from-SDF, chromatic offset 1.5px, specular rim). Falls back to an SVG displacement filter. | HorizonX / Aceternity Liquid Glass | ✓ |
| `fx-plasma-orb` | Plasma Orb | Ambient | ambient · bleed | none | WebGL fbm plasma sphere with fresnel rim; the pointer bends the flow field. 60fps cap; paused when suspended. | HorizonX Plasma Orb | ✓ |
| `fx-beam-grid` | Beam Collision Grid | Ambient | ambient · bleed | none | Beams fall along grid lines at random intervals and burst into 12 sparks plus a floor flare on impact. | Aceternity Background Beams With Collision | |
| `fx-particle-text` | Particle Text Reveal | Raster & Glitch | hover · bleed | none | Text sampled to points that assemble from noise (1.2s). The pointer scatters points within 60px and they spring home. | ReverseUI Particle Text Reveal | |

### 7b. Extension from the reference sites (91)

`EXTENSION_GAP_ANALYSIS.md` maps every catalogue entry from the ten reference sites to INTRX as covered, §7, or **extension**. The 91 extension items are specified there (id, title, category, trigger, sources, behaviour). Their tiles are on Figma page **15 · Extension — From reference sites**, board Library v4 — Extension (92:174). Implement them after §7, one category per PR, under the same rules.

The library grows from 399 to **520**.

The redesign of all 399 existing components lives on the Library v4 boards on Figma pages 09–14, one tile per id (node IDs in `manifest/components.json`). Use those tiles as the visual target for the §5 remediation buckets. All boards are complete (see `DESIGN_PROGRESS.md`, "v4 complete").

Add the new ids to `CAT_ORDER` placement and the "New this month" list. Update `README.md` counts from the registry (no more hard-coded numbers).

---

## 8. Pro scaffolding (later, design only: Figma 20:372)

Don't take payments in this handoff. Prepare the seams:
- `tier` in meta and registry;
- a neutral PRO badge on tiles (hairline border, text-primary);
- on Pro detail pages, preview, notes and prompt stay free while the source card shows a locked panel (blurred placeholder lines, crown, "Unlock with Pro", "Copy prompt instead");
- the MCP returns `{ locked, prompt, upgradeUrl }`;
- the CLI prints the upgrade URL.

Entitlement checks live in the shell and the MCP server, never in demo code. Keep `Pricing` in the topbar with a SOON badge until the owner launches.

---

## 9. Phases, PRs and acceptance

| Phase | PR scope | Acceptance |
|---|---|---|
| **0. Foundations** | §2 tokens, fonts, kit classes; legacy aliases; remove Google Fonts | No demo visually changes; verifiers green; tokens match the Figma variables |
| **1. Stage contract** | §3 `meta.stage.js` with defaults for all 399 (heuristic triggers, presets by category), `fitStage`, `ctx`, actions, dock, LiveTiles, `verify-stage.js`, `audit-stage-fit.js` | Every demo boots; dock renders for demos with `controls`; audit runs and writes `.artifacts/stage-fit.json` |
| **2. Registry + agents** | §6.1–6.5 build-registry, generated llms files, `packages/intrx` (MCP + CLI + tests), `skills/intrx`, `AGENTS.md`, CI `--check` | `npx ./packages/intrx mcp` lists 7 tools in MCP Inspector; `intrx add elastic-tabs` writes a working file; `node --test` green |
| **3. Shell** | §4 router, home, library, detail, palette, mobile, perf, a11y; update `verify-library.js` to the new routes and remove hard-coded counts (`343 + 4 + 52`) from `verify-registry.js` / `verify-library.js` | Matches Figma frames at 1440 and 390; detail first paint < 300ms; Lighthouse mobile ≥ 90; no page jump on open/close |
| **4. Remediation** | §5 buckets A→G, one PR each | `audit-stage-fit.js` exits 0; `verify-stage.js` exits 0; legacy aliases removed |
| **5. New components** | §7, grouped by category, one PR per group | 30 entries pass both verifiers and the stage audit; registry regenerated |
| **6. Pro seams** | §8 | Pro items locked in registry/MCP/UI with no regressions for free items |

Verification commands (run all before each PR):

```bash
node tools/verify-registry.js
node tools/verify-stage.js
node tools/build-registry.js --check
npx serve . -l 4173 &
node tools/verify-library.js http://127.0.0.1:4173
node tools/audit-stage-fit.js http://127.0.0.1:4173   # gates in §1 (required from Phase 4)
(cd packages/intrx && node --test)
```

---

## Appendix A: audit buckets (14 Nov 2026 run)

### A.1 Content outside the stage (50)

*Intentional, mark `overflow: 'intentional'` plus edge fades:* `scroll-marquee-direction`, `kinetic-marquee`, `logo-marquee`, `ticker-tape-prices`, `text-numbers-slot`, `slot-machine-reel`, `framer-rolling-balance`, `drag-carousel`, `showcase-circular-gallery`, `btn-shimmer-sweep`, `gradient-mesh-drift`.

*Scroll containers, mark `overflow: 'scroll'` (bucket G):* `showcase-tracing-story`, `velocity-skew`, `scroll-split-screen`, `scroll-color-theme`, `scroll-table-of-contents`, `scroll-inertia-grid`, `text-highlighter-swipe`, `nav-blur-elevate`, `nav-hide-reveal`, `scroll-pitch-drone`.

*Real overflow, fix with designSize (bucket B):* `showcase-converging-paths`, `scroll-rotate-gallery`, `scroll-counter-rotate`, `scroll-depth-tunnel`, `cursor-elastic-line`, `cursor-inverted-lens`, `cursor-text-repel`, `cursor-grid-ripple`, `cursor-drag-ghost`, `cursor-rope-trail`, `cursor-velocity-stretch`, `cursor-flashlight-noise`, `cursor-emoji-rain`, `cursor-magnetic-grid-lines`, `cursor-heat-shimmer`, `cursor-pull-distort`, `cursor-shadow-parallax`, `text-circular-spin`, `gravity-drop-icons`, `menu-split-reveal`, `menu-image-peek`, `mega-menu-preview`, `btn-border-beam`, `form-multistep-progress`, `bottom-sheet`, `caption-pull-hover`, `map-radar-pings`, `fui-data-stream`, `fui-hex-dump`.

### A.2 Horizontal scroll (6)

`showcase-circular-gallery`, `cursor-inverted-lens`, `cursor-liquid-metaball`, `kinetic-marquee`, `mega-menu-preview`, `drag-carousel`

### A.3 Rendered text ≤ 8px (73)

`showcase-orbital-path`, `showcase-circular-gallery`, `showcase-card-swap`, `showcase-tracing-story`, `scroll-rotate-gallery`, `scroll-split-screen`, `scroll-color-theme`, `scroll-clip-morph`, `scroll-table-of-contents`, `scroll-video-scrubber`, `cursor-inverted-lens`, `cursor-text-repel`, `cursor-drag-ghost`, `cursor-eyes-follow`, `cursor-liquid-metaball`, `cursor-snap-targets`, `cursor-flashlight-noise`, `cursor-heat-shimmer`, `cursor-crosshair-hud`, `cursor-pull-distort`, `cursor-shadow-parallax`, `text-circular-spin`, `text-highlighter-swipe`, `webgl-ripple-click`, `webgl-pixel-river`, `webgl-fisheye-hover`, `webgl-static-tv`, `webgl-kaleidoscope`, `webgl-vertex-wave`, `image-slice-hover`, `image-infinite-zoom`, `comparison-slider`, `image-duotone-swap`, `image-shatter-click`, `image-blinds-reveal`, `image-magnetic-tiles`, `noise-grain-overlay`, `led-segment-display`, `zippo-flame`, `op1-panel`, `vinyl-player-card`, `css3d-book-page`, `css3d-carousel-cylinder`, `css3d-isometric-hover`, `css3d-folding-map`, `webgl-point-globe`, `pendulum-tags`, `gravity-drop-icons`, `wrecking-ball-text`, `melt-drip-text`, `menu-split-reveal`, `nav-blur-elevate`, `nav-hide-reveal`, `nav-active-pill`, `sidebar-rail-expand`, `page-load-counter-slide`, `masonry-filter`, `command-palette`, `list-reorder-drag`, `table-image-idle`, `ticker-tape-prices`, `fui-target-lock`, `fui-data-stream`, `fui-hex-dump`, `agent-thinking-drawer`, `agent-diff-review`, `typing-mechanical`, `dvd-screensaver`, `konami-unlock`, `gravity-flip-page`, `wobbly-window-drag`, `drams-050`, `drams-052`, `drams-053`

(`noise-grain-overlay` and `fui-data-stream` report 0px because of hidden measuring nodes. Confirm visually.)

### A.4 Fill < 12% of the stage (56)

`showcase-mask-reveal` (0, empty until hover; needs an idle state), `cursor-eyes-follow`, `custom-cursor`, `magnetic-button`, `image-trail`, `text-scramble`, `proximity-type`, `text-clip-image`, `text-strike-reveal`, `text-outline-fill-scroll`, `gallery-honeycomb`, `gallery-random-stack`, `gallery-dual-row-drift`, `dock-magnify`, `flip-expand`, `hover-fill-button`, `logo-marquee`, and DRAMS `drams-001`–`005`, `007`, `009`, `010`, `013`–`015`, `017`–`031`, `033`–`035`, `037`–`040`, `042`–`045`, `047`, `048`.

### A.5 Demos with in-demo control buttons (195)

Generate the exact list with `node tools/verify-stage.js --list-controls`. The heuristic is HTML with ≥ 2 `<button>`s, or a class matching `controls|actions|toolbar|chips`. Review each match: interactive UI buttons that *are* the component (tabs, steppers, form submits) stay. Only replay/reset/demo-driver buttons move to the dock.
