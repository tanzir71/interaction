# Visual audit — product-UI categories and site shell (INTRX, 28 Nov 2026)

Scope: Buttons & Micro (30), Forms & Inputs (24), Layout & UI (47), Navigation & Menus (19), Data & Numbers (15), Agent & AI UI (24), Galleries & Sliders (18), Text & Type (29), Loaders & Progress (14), Scroll (25), Maps & Geo (6), FUI & Terminal (10) = 261 of the 520 demos in `registry/index.json`, plus the site shell (Home, Library, detail page, command palette; dark and light). Everything else belongs to the other visual auditor.

Method (all read-only; scripts, sheets and screenshots live in the session scratchpad, which is ephemeral):

- **Tiles:** all 261 native posters (`assets/posters/<id>.png`, 360×264) viewed at 1:1 on 19 labelled contact sheets.
- **Full detail views:** 157 of 261 captured live from `http://127.0.0.1:4173/#/c/<id>` (headless Chrome, 1440×1000, DPR 1, dark shell, default dark Stage, resting state 3.4–4.2 s after load; the Stage viewport is 986×560 at this width).
- **Extra states:** 10 components captured in three timed frames (≈0.1 s, ≈0.3 s, ≈1.2 s); the first Dock action fired in 8 of them, the other 2 have no Dock button and stayed at rest. 12 components with the detail toolbar's light Stage.
- **Shell:** Home, Library, one category page, detail page and palette in both themes, plus two 390 px mobile frames.
- **Source:** `css/foundations.css` tokens; regex statistics over all 261 demo modules in scope; closer reads of ~14 modules.
- **Figma (coordinator add-on):** 9 tile nodes viewed through the Figma connector.
- **Calibration:** one screenshot each of Magic UI (Marquee docs), Aceternity UI (components index) and Origin UI (index).

| Category | Tiles viewed | Full views viewed |
|---|---:|---:|
| Buttons & Micro | 30/30 | 16 |
| Forms & Inputs | 24/24 | 15 |
| Layout & UI | 47/47 | 34 |
| Navigation & Menus | 19/19 | 11 |
| Data & Numbers | 15/15 | 12 |
| Agent & AI UI | 24/24 | 20 |
| Galleries & Sliders | 18/18 | 8 |
| Text & Type | 29/29 | 9 |
| Loaders & Progress | 14/14 | 8 |
| Scroll | 25/25 | 8 |
| Maps & Geo | 6/6 | 6 |
| FUI & Terminal | 10/10 | 10 |
| **Total** | **261/261** | **157 (60%)** |

Caveats: stills only (motion judged from source plus 30 timed frames). Full-view judgements for the 104 components not captured are extrapolated from their tile and from category siblings. "Skeleton tile" counts are my visual tally from the contact sheets (±3). Grades are relative to the owner's benchmark set (Aceternity UI, Magic UI, React Bits, Origin UI, shadcn/ui, Linear/Vercel craft), not to average open-source demos.

---

## 1. Overall verdict and per-category grades

### Takeaway
The product-UI half of the catalog reads as well-engineered wireframes: disciplined, consistent and nicely animated, but grey-on-grey, small in the frame and often filled with placeholder bars instead of content. My A/B/C read of 261 components: about 31% ship as-is, 53% are fixed by a shared stage/token/content pass, and 16% (42 ids) need individual redesign. The redesign load is concentrated in Layout & UI (19), Agent & AI UI (6) and Maps & Geo (4).

### Cited Findings
- Grades (tile + sampled full view). Evidence: [T-btn1], [T-btn2], [T-form1], [T-form2], [T-lay1], [T-lay2], [T-lay3], [T-nav], [T-data], [T-ag1], [T-ag2], [T-gal], [T-txt1], [T-txt2], [T-load], [T-scr1], [T-scr2], [T-map], [T-fui]; full views [F-A1]–[F-A5], [F-B1]–[F-B5], [F-2a1]–[F-2g].

| Category | Grade | One-line reason |
|---|---|---|
| Forms & Inputs | B | Most finished category: real values, clear states, one accent used with meaning. Full views open in empty resting states. |
| Text & Type | B | Clean, legible, well-chosen sample words. One typeface throughout, so little variety; three near-duplicates. |
| Data & Numbers | B | Tidy single-accent charts; several full views are good. One visibly broken (ticker), tiles lack axes/labels. |
| Buttons & Micro | B− | Restrained and correct, but a 150 px control floating in a 360×264 void; few tiles a visitor would screenshot. |
| Galleries & Sliders | B− | Coherent moody photo set and good depth. The same five photos appear in 12–14 of 18 demos. |
| Loaders & Progress | B− | Tidy but generic and sparse; full views rest at 0%. |
| Navigation & Menus | C+ | 8 of 19 tiles are skeleton wireframes, yet the full views have good editorial copy. Tiles undersell them. |
| Scroll | C+ | Same pattern: weak schematic tiles, strong full compositions (serif headline, real chapters). |
| Agent & AI UI | C | Most topical category, but 12 of 24 tiles are skeletons and six full views look unfinished or broken. |
| FUI & Terminal | C | Tiles are tame; full views use a proportional sans, colliding rows and mis-capitalised units. |
| Layout & UI | C− | 30 of 47 tiles are skeleton bars; many stay skeleton in the full view. 40% need redesign. |
| Maps & Geo | D+ | No geography anywhere: grey diamonds, blobs and grids stand in for maps. |
| Site shell | B+ | Competent Vercel/Linear-style chrome with good IA. Loses points on tile composition, no hero showpiece and light-theme defects. |

- Calibration: Origin UI uses the same abstract-skeleton pictogram idea, but only for *category* index tiles ("Accordion — 20 components") on a visibly lighter tile surface than the page. — [Origin UI index](https://coss.com/origin), [ref-coss]
- Calibration: Magic UI's Marquee preview shows real testimonial cards (avatars, names, handles, quotes, edge fades) filling roughly 85% of a ~775×520 preview. INTRX's `logo-marquee` shows grey dots and bars. — [Magic UI Marquee](https://magicui.design/docs/components/marquee), [ref-magic], [poster](../../assets/posters/logo-marquee.png)
- Calibration: every tile on Aceternity UI's components index is a colourful poster-grade image (Liquid Glass, Background Cubes Grid, Image Generation Loader). — [Aceternity components](https://ui.aceternity.com/components), [ref-aceternity]

### Inferences
- The gap to the benchmark set is presentation and content, not engineering: motion, accessibility and state handling are ahead of most of those libraries.
- Because the weakness is systemic, most of the lift can come from five or six shared changes (section 13) before any per-component redesign.

### Gaps
- 104 full views were not captured; their grades lean on the tile.
- I did not judge hover/drag/typed states beyond the 10 timed sequences.

---

## 2. Typography

### Takeaway
Type is neat but undifferentiated and split across families: the shell is Geist, every demo declares Inter, and 13 demos ask for JetBrains Mono, which is not shipped. Sizes skew small (many 8–10 px labels), there are no type tokens, and a lot of visible copy is written for verifiers rather than users.

### Cited Findings
- Shell fonts are `--font-shell:'Geist'` and `--font-shell-mono:'Geist Mono'`; Home h1 is 64px/1.06, weight 600, tracking −0.035em. — [foundations.css]
- All 261 in-scope modules declare Inter as the demo UI family (e.g. `.d-beam-demo{…font-family:Inter,system-ui,sans-serif}`); 80 also reference Geist. — [css-stats], [btn-border-beam module](../../js/demos.micro.btn-border-beam.js)
- 13 demos request `'JetBrains Mono'` (9 of 10 FUI demos plus `agent-context-compaction`, `agent-streaming-text`, `agent-thinking-drawer`, `agent-knowledge-orbit`). `css/fonts.css` defines faces only for Geist, Geist Mono, Inter, Manrope, Newsreader and Allura, and `assets/fonts` has no JetBrains file, so these fall back to the OS monospace. — [css-stats], [fonts.css](../../css/fonts.css)
- Newsreader (serif) is shipped but used by only 3 in-scope demos (`scroll-color-theme`, `text-underline-magic`, `text-highlighter-swipe`); all 29 Text & Type tiles are white sans on dark. — [css-stats], [T-txt1], [T-txt2]
- Explicit `font-size` declarations in scope: 13px ×136, 12px ×59, 12.5px ×58, 14px ×54, 10px ×38, 11px ×38, 9px ×22, 8px ×20, 7px ×3. Half-pixel sizes (12.5, 13.5, 11.5) are common. — [css-stats]
- Letter-spacing values include raw Figma floats such as `0.006000000089406968px` (×43) and `-0.04159999907016754px` (×28); there is no tracking scale. — [css-stats]
- `font-variant-numeric: tabular-nums` appears 196 times (good); `text-wrap` (balance/pretty) appears 0 times. — [css-stats]
- FUI full views set instrument text in proportional sans with rows that collide: `fui-data-stream` table rows overlap and clip; `fui-hex-dump`'s first row sits under the header; `fui-trading-terminal`'s order book lines touch. — [F-2g], [Z2], [live fui-data-stream](http://127.0.0.1:4173/#/c/fui-data-stream)
- Mis-capitalised units and labels are authored in source and visible: "Utc+6", "06 Lvl", "800Ms feed" (`fui-trading-terminal`); "18.8 Kw", "4.2 Tesla" (`fui-status-dashboard`); "128.4 Mhz" (`fui-target-lock`); "Aes-256", "1 In 4 denied", "16 Char token" (`fui-access-granted`); "Crc pass", "Row 16px" (`fui-data-stream`). — [Z2], [F-2g], [fui-trading-terminal module](../../js/demos.fui.fui-trading-terminal.js)
- Verifier-style captions sit inside stages: "Four complete conversion stages · Replay", "Five complete build steps · Replay", "Two complete series · Six dimensions", "Probability · 12 complete observations", "Three perspectives · A complete local story". — [F-B1], [F-B3], [F-2c], source grep in `js/demos.dataext.*`, `js/demos.loaderext.*`
- Disclaimer copy ("Your prompt stays in this demo.", "These reactions stay in this demo.", "These are local example files.", "These are local example citations.") appears in at least 9 in-scope demos: `agent-prompt-composer`, `agent-approval-card`, `agent-citation-chips`, `micro-smoke-delete`, `micro-inline-confirm`, `micro-reaction-bar`, `ui-folder-peek`, `ui-link-preview`, `ui-selection-bar`. — [F-A1], [F-2a1], [F-2d], [Z1]
- Sample content often describes this repo's own build process: kanban cards read "Run the browser stories", "Publish the verified phase", "Check the offline export", "Write the complete prompt"; the testimonial reads "I can see every state, try the interaction and bring a complete example into my own work." — [F-A3], [F-B3]
- Many full views repeat the component's own name as an in-stage heading: "Reaction Bar", "Spring Star Rating", "Picker Wheel", "Upload Dropzone", "Selection Action Bar", "Link Preview", "Smoke Delete". — [F-2a1], [F-2a2], [F-2b1], [F-2b2], [F-A1]
- Strong counter-examples with specific, believable copy: `select-morph-dropdown` (US East / EU West / Asia Pacific with status dots), `copy-inline-feedback` (`sk_live_····4f2a` → Copied), `swap-widget` (1.0 ETH → 3,240 USDC), `slider-progress-fraction` full ("01 / BLUE FOREST — Blue hour — FIELD ARCHIVE / 2026"), `scroll-color-theme` full (Newsreader headline "Heat leaves a memory."). — [T-form1], [T-btn1], [T-lay1], [F-2d], [F-2f]

### Inferences
- One UI family (Geist is already loaded for the shell) plus Geist Mono for all code/FUI text would remove the Inter/Geist seam and the missing-font fallback in one pass.
- A copy pass is as valuable as a style pass here: the dev-speak captions and self-referential sample data are a large part of why full views feel like test fixtures.
- The serif is an unused asset; three or four editorial text demos set in Newsreader would break the sameness of the Text & Type grid cheaply.

### Gaps
- I did not measure rendered glyph sizes; the size counts are declarations, not painted sizes after Stage zoom.
- Truncation behaviour was only seen where it failed (section 9, "Approv").

---

## 3. Surfaces and depth

### Takeaway
Surfaces are close-valued dark greys with hairline borders; real depth (layered shadow plus inner highlight plus gradient) exists in the code but is too quiet to read, and the Stage itself is a flat void the same colour as the page. Radii, border alphas and greys are hand-picked per demo rather than drawn from the token scale.

### Cited Findings
- Dark tokens: canvas `#151515`, surface `#1C1C1C`, raised `#222222`, overlay `#2A2A2A`; `--bg-stage` is the same `#151515` as `--bg-canvas`. Computed contrast is about 1.07:1 for surface on stage and 1.15:1 for raised on stage. — [foundations.css]
- The dark Stage is `background:var(--bg-stage)` with nothing else. Only the light Stage gets a backdrop (`stage-glow.svg` at −36,−170). — [foundations.css]
- Tile cards are `background:transparent; border:1px solid var(--border-default); border-radius:18px; box-shadow:none`, and hover changes only the border colour. — [foundations.css], [SH-lib-dark]
- Two elevation tokens exist (`--elev-card`, `--elev-popover`, both with an inset top highlight). In-scope demos carry 787 `box-shadow` declarations, 380 with `inset` and 229 multi-layer, mostly hand-written. — [foundations.css], [css-stats]
- Demo colours are hard-coded: about 7,248 hex literals against 123 references to colour tokens across the 261 modules (whole-file count, so approximate). — [css-stats]
- Eleven near-identical dark greys are in common use: `#111`, `#151515`, `#171717`, `#1c1c1c`, `#202020`, `#222`, `#252525`, `#272727`, `#292929`, `#333333`, `#3a3a3a`. — [css-stats]
- Seven hairline alphas are in common use: `#ffffff0f`, `12`, `14`, `16`, `1a`, `1c`, `20` (6% to 12.5% white). — [css-stats]
- More than 20 distinct radii: the token scale is 6/8/12/16/20/28, but demos also use 7, 9, 10, 14, 22, 3, 3.5 and 5 px. — [foundations.css], [css-stats]
- Typical recipe (`btn-border-beam`): `border:1px solid #ffffff1c; background:#202020; box-shadow:0 16px 22px -9px #0008, 0 2px 3px #0003`. In the tile the button reads as a flat charcoal slab and the beam is barely visible. — [btn-border-beam module](../../js/demos.micro.btn-border-beam.js), [T-btn1]
- `bento-spotlight`'s spotlight is a radial gradient of `#ffffff0f` (6% white) on `#1c1c1c` cells, which is invisible in the still. — [bento-spotlight module](../../js/demos.layout.bento-spotlight.js), [F-A3]
- `btn-polish-stages` demonstrates the missing recipe inside the catalog: its Fill → Border → Light → Depth layers add an inset 1px edge, then an inset top highlight (`inset 0 1px #ffffff40`), then a two-layer drop shadow with a 2px hover lift. Most other controls in scope stop at the border step. — [T-btn1], [F-A1]
- Flat, unstyled-looking controls in full views: plain grey square checkboxes in `ui-selection-bar` and `ui-data-table-expand`; table header cells rendered as two large buttons. — [F-2b1], [F-A4]
- On a light Stage, hard-coded dark components gain contrast and look like product shots (`agent-diff-review`, `ui-file-tree`, `ui-kanban-board`), which shows how much the dark-on-dark Stage is suppressing them. — [LS1], [LS2]

### Inferences
- Separation is the core problem: 1.07:1 between card and stage cannot carry a composition. Either darken the Stage (≈`#0C0C0C`) or lift cards (≈`#1E1E1E`–`#242424`) and make the inner highlight and shadow visible.
- A single shared "card", "control" and "popover" recipe (hairline + inner top highlight + two-layer shadow + 2–3% vertical gradient) applied by codemod would reach most B-grade components.
- Tokenising colours is also the prerequisite for a dependable light Stage (section 4).

### Gaps
- Shadow quality was judged from stills at DPR 1; fine inner highlights may read better on high-DPI displays.
- The hex and shadow counts include strings in prompts and JS, not just CSS.

---

## 4. Colour

### Takeaway
The neutral-plus-one-orange rule is followed and the orange (`#FA7319`) is used well where it carries meaning. The problem is the greys: mid-greys on near-black look dead, and several tiles sit below comfortable legibility. Light Stage support is partial because colours are hard-coded.

### Cited Findings
- Accent tokens: `--p-orange-500:#FA7319`, hover `#FF8A3D`; success `#3ECF8E`; danger `#F26D6D`; tints (amber, violet, cyan, pink, blue) are defined for chips. — [foundations.css]
- Good accent use: `form-date-range` (range band and end caps), `data-line-tooltip` (line, gradient fill, marker), `ui-file-tree` (selected row), `input-float-label` (focus ring and label), `micro-hold-to-pay`. — [T-form1], [T-data], [F-A4], [T-btn2]
- Low-contrast tiles where inactive text or placeholder bars nearly vanish: `toggle-day-night` (Light/Auto), `form-magnetic-select` (Monthly/Yearly), `ui-evervault-card` (glyph field), `agent-knowledge-orbit`, `radar-sweep-blips`, `nav-line-sidebar`, `otp-code-boxes` in its empty full view. — [T-btn1], [T-form1], [F-2b2], [T-ag1], [T-data], [T-nav], [F-2a1]
- Off-rule hues that read as accidents rather than choices: violet rim and sparkle on `micro-holo-badge`; violet and cyan cursors in `ui-realtime-cursors`; blue pill and blue dashed outlines in `loader-blueprint`; blue/orange/violet agents in `ai-multi-agent`; amber plus red bars in `ai-usage-limits` (this last one is semantic and works). — [T-btn2], [T-lay3], [F-2f], [F-2d], [T-ag2]
- `micro-rainbow-shine` uses a full-spectrum glow, but it is dim and muddy against `#151515`. — [T-btn2], [F-2a1]
- Light Stage, 12 components sampled: `elastic-tabs`, `toast-stack` and `stat-counter` re-theme fully; `form-date-range`, `ui-kanban-board`, `agent-diff-review`, `command-palette`, `fui-status-dashboard`, `btn-border-beam`, `input-float-label` and `ui-file-tree` stay dark slabs on `#F4F4F4`; `data-treemap` becomes muddy mid-greys with one peach tile. — [LS1], [LS2]
- None of the 261 in-scope demos declares a light Stage by default (all 52 light-stage demos are in the other auditor's categories). — [registry]
- In the light shell, the 468 dark-stage demos render as black blocks inside white cards. — [SH-lib-light], [registry]

### Inferences
- The accent is fine; do not add hues. Fix the grey ladder (fewer, further-apart steps; lift secondary text from `#A0A0A0`/`#949494` only where it sits on `#1C1C1C` or lighter) and remove the stray violet/blue.
- Dark components on a light Stage photograph better than dark-on-dark. A light or mid-grey Stage option for hero tiles is a cheap way to add variety without breaking the palette rule.

### Gaps
- No measured contrast ratios for individual text nodes; the repo's own contrast verifiers cover that and I did not run them.
- I did not test the light Stage for the other 249 components.

---

## 5. Iconography, illustration and photos

### Takeaway
Icons are a consistent thin-stroke set and fine. The weak spot is illustration: placeholder bars, blank squares and abstract blobs stand in for logos, app icons, maps and content. Photos are tasteful but come from a tiny pool that repeats everywhere, and one portrait plays every person.

### Cited Findings
- About 73 of 261 tiles (28%) use grey placeholder bars where text or content should be: Layout & UI 30/47, Agent & AI UI 12/24, Navigation 8/19, Scroll 8/25, Forms 5/24, Buttons 3/30 (my tally). — [T-lay1], [T-lay2], [T-lay3], [T-ag1], [T-nav], [T-scr1], [T-form1]
- Placeholder illustration that defeats the component: `logo-marquee` (dots and bars for logos), `dock-magnify` (blank grey squares for app icons), `command-palette` (grey squares for result icons), `gallery-honeycomb` (empty numbered hexes), `mac-window` (grey genie silhouette), `zoom-ui-inception` (nested grey squares), `ui-card-fan` (outlined blank cards). — [F-A3], [F-2a2], [M1], [F-B3], [F-A4], [T-lay2]
- Maps contain no geography: `map-topo-extrude` (stacked diamonds in the tile, a flat grey grid in the full view), `map-city-tiles` (grey cubes / flat blocks with labels overlapping them), `map-dot-globe-arcs` (a dotted ellipse; the full-view globe is about 180 px wide in a 986 px stage), `map-radar-pings` (two grey blobs). `map-isoline-field`'s full view (contours with "510" labels) is the only one that reads as cartography. — [T-map], [F-B5], [F-2f], [Z2], [PZ2]
- `agent-voice-orb` is a flat grey sphere with no glow, gradient or audio texture. — [F-2d], [T-ag1]
- Photo demos per category: Galleries 17/18, Scroll 13/25, Layout 10/47, Navigation 4/19; Data, Maps and FUI use none. — [registry]
- Within Galleries, `photo-ocean` appears in 14 demos, `photo-forestBlue` and `photo-cityNight` in 13 each, `photo-forestDark` in 12, `photo-cityTeal` in 9. — [registry], [T-gal]
- One portrait (`photo-portraitC1`, captioned "Ava Rhodes") is the face in `micro-holo-badge`, `gallery-testimonials`, `masonry-filter` and `ui-avatar-stack`. The avatar stack's five avatars are three portraits in the order A-B-C-B-A, all side-lit on black, so they read as dark discs at about 40 px. — [PZ2], [registry]
- Photos that clash with the dark Stage or the palette (for the photo researcher): `photo-archGrid` (high-key black-and-white lattice) in `loader-blueprint` and `masonry-filter`; `photo-aurora` (saturated green) in `horizontal-scroll`, `scroll-rotate-gallery`, `scroll-clip-morph`, `scroll-sticky-reveal`, `menu-image-peek`, `gallery-apple-cards`, `ui-draggable-cards`; `photo-embers` (red-orange, fights the accent) in `horizontal-scroll`, `scroll-rotate-gallery`, `scroll-hero-parallax`, `scroll-inertia-grid`, `text-clip-image`. — [T-load], [T-lay1], [T-scr1], [T-scr2], [T-gal], [PZ2]
- `text-clip-image` fills "EMBER" with a dark lava texture that muddies the letter edges; its full view pairs the words "OPEN WATER" with the same ember texture. — [PZ2], [F-B3]

### Inferences
- A small licensed asset kit would fix a whole class of tiles at once: 12 monochrome wordmark logos, 8 app icons, 8 avatar portraits lit for small sizes, one real vector world/land outline.
- The gallery set needs breadth (20–30 images, a few warm or light ones) more than it needs better individual photos.

### Gaps
- Photo provenance and replacements are the other researcher's remit; I only flagged clashes I saw.
- Icon alignment at sub-pixel level was not checked (the repo has its own icon audit).

---

## 6. Composition: tile, detail Stage and Dock

### Takeaway
Components sit small and high in the frame. In tiles the lower quarter is reserved for a Dock that is hidden at rest; on the detail page a 260×100 control is shown at scale 1.00 in a 986×560 flat stage. Full views also open in empty resting states, so the detail page is often less impressive than its own thumbnail.

### Cited Findings
- 49 of 261 in-scope demos have a design plane of 60,000 px² or less (e.g. 260×100, 220×100, 240×164): Layout 24, Buttons 15, Forms 10. The detail readout confirms no upscaling, e.g. "Live preview · 260 × 100 · scale 1.00". — [registry], [SH-detail-dark]
- Examples at 1440 px: `btn-border-beam` is a ~160×40 button, `input-float-label` a ~200×44 field, `elastic-tabs` a 260×40 bar, `card-hover-border-gradient` a ~180×110 card, each alone in the 986×560 stage. — [F-A1], [F-A2], [SH-detail-dark], [F-A4]
- In Library tiles the component centre sits about 26–28 px above the stage centre, because the bottom band is kept for the Dock, which is `opacity:0` until hover. — [SH-lib-dark], [foundations.css]
- On Home's four-column grid the stage is 196 px tall (`.tile--landing`), previews render at roughly two-thirds of their Library size in the top ~45% of the tile, and about 100 px of empty stage separates them from the caption. — [SH-home-b], [home-zoom], [foundations.css]
- Full views revert to rest while tiles show the hero state: `otp-code-boxes` (six empty dim boxes vs "4 8 1 9"), `password-strength-bar` (empty field, "Empty"), `chart-donut-sweep` ("100 Total share", all legend values 0%), `heatmap-fade-in` (all cells one grey), `preloader-percentage` and `progress-blob-fill` (0%), `loader-typing-code` (empty terminal, "WAITING"). — [F-2a1], [F-2b2], [F-2e], [F-2f]
- Full views that collapse to a single small control: `form-gooey-search` (one ~46 px icon, caption about 270 px below), `form-assignee-picker` ("ARMC 2 assignees" pill, off-centre), `micro-share-pill` (one icon), `radial-menu` (one + button), `micro-reaction-bar` ("React · 0 reactions"), `spring-modal` and `ui-morphing-modal` (one button), `ui-feedback-widget` (one button), `command-palette` (closed search field). — [F-A2], [F-2a1], [F-2a2], [F-A4], [M2], [F-2b1], [F-A3]
- Inconsistent placement in the detail stage: content is top-aligned in some (`mega-menu-preview`, `ui-link-preview` title), lower-third in others (`popover-anchor-morph`, `toast-stack`), left-aligned and cut off in `logo-marquee`. — [F-A5], [F-2b2], [F-2b1], [F-A3]
- Instruction captions float under components in most extension full views ("Space to lift · Enter to drop", "Open a folder · Arrow keys navigate", "Drag to paint · Space and Arrow keys"). — [F-A3], [F-A4], [F-2b1]
- Dock: in-scope `controls` labels are dominated by utility verbs: Reset ×131, Replay ×28, "Scroll ↓" ×26, Hover ×11, Clear ×11. — [registry]
- Dock pills are `#2A2A2A`, 28 px, 12 px medium text, and on posters they are often the highest-contrast element in the tile. — [foundations.css], [T-btn1]
- Tiles that sit and fill well: `form-date-range`, `data-treemap`, `data-funnel`, `masonry-filter`, `scroll-inertia-grid`, `ui-file-tree`, `form-signature-pad`, `gallery-dual-row-drift`. — [T-form1], [T-data], [T-lay1], [T-scr2], [T-lay2], [T-form2], [T-gal]

### Inferences
- Three shared changes would fix most composition complaints: (1) fit-to-stage with a target fill of roughly 45–60% in the detail view; (2) centre the component when the Dock is hidden, or overlay the Dock on hover without reserving space; (3) open the detail view in the tile's hero state and auto-play once.
- Moving instructions and component titles out of the stage (into the Notes panel or toolbar) would make full views read as product rather than test harness.
- For Navigation and Scroll, generating the tile from a cropped frame of the full view would be a better thumbnail than the current schematic.

### Gaps
- I judged the default desktop Stage width only, not the tablet/phone widths or fullscreen. The toolbar's "1×" select is playback speed (0.5×/1×/2×); I found no user-facing zoom control.
- `AGENTS.md` records owner decisions to keep exact Figma sizes for sparse controls; whether the owner now wants to revisit those is not something I can determine.

---

## 7. Sameness, variety and hero appeal

### Takeaway
Seen as a grid, the 261 tiles are one template: `#151515` field, a small grey rounded rectangle, white or grey bars, an occasional orange detail, grey pills beneath. Very few tiles would be screenshotted and shared. Variety that exists in the full views (serif headline, coloured panel, cut-out letters) is hidden behind schematic thumbnails.

### Cited Findings
- All 261 in-scope demos use the dark Stage. — [registry]
- Near-duplicate stills: `text-wave-hover` and `text-squiggle-wave` (both "Wavelength"); `radial-menu` and `ui-bloom-menu`; `btn-success-morph` and `micro-stateful-button` (green "Published" / "Saved" pill); `micro-star-rating` and `ui-feedback-widget`; `scroll-inertia-grid` and `scroll-parallax-columns` (same photos, same three-column layout); `kinetic-marquee` and `scroll-marquee-direction`; `text-circular-spin` and `scroll-counter-rotate` (dotted ring with an arrow button); `agent-task-checklist`, `ui-onboarding-checklist` and `loader-multi-step`; `agent-deploy-pipeline`, `form-multistep-progress` and `ai-agent-creator` (stepper dots). — [T-txt1], [T-txt2], [T-lay1], [T-lay2], [T-btn1], [T-btn2], [T-lay3], [T-scr1], [T-scr2], [T-ag1], [T-ag2], [T-form1], [T-load]
- Tiles with real hero appeal (my shortlist of about 15 from 261): `form-date-range`, `form-signature-pad`, `data-line-tooltip`, `data-treemap`, `data-radar-compare`, `gallery-coverflow`, `gallery-random-stack`, `gallery-bookshelf`, `scroll-inertia-grid`, `horizontal-scroll`, `text-ransom-note`, `kinetic-marquee`, `micro-award-badge`, `micro-peel-sticker`, `form-color-picker`. — [T-form1], [T-form2], [T-data], [T-gal], [T-scr1], [T-scr2], [T-txt1], [T-btn2]
- Full views that are much stronger than their tiles: `scroll-color-theme` (tile: brown box with a dot; full: orange editorial panel with a Newsreader headline), `scroll-split-screen`, `scroll-table-of-contents`, `nav-pagination-morph`, `text-broken-grid` (poster frame reads "BRO"; full reads "Break the grid."), `ui-onboarding-checklist`, `ui-kanban-board`, `agent-diff-review`. — [T-scr1], [F-2f], [F-2b2], [PZ1], [F-2e], [F-2a2], [F-A3], [F-B2]
- Many in-scope ids mirror Aceternity UI component names that appear on its index (Evervault Card, Wobble Card, Draggable Card, Link Preview, Placeholders And Vanish Input, Multi Step Loader, Stateful Button, Apple Cards Carousel, Animated Testimonials, Sticky Scroll Reveal, Hero Parallax, Parallax Scroll, Container Text Flip, Text Reveal Card), so visitors can compare like for like. — [Aceternity components](https://ui.aceternity.com/components), [registry]

### Inferences
- Sameness is partly a virtue (it looks like one system), but with nothing breaking the pattern the grid has no entry points. Ten to fifteen deliberately art-directed hero tiles, spread across categories and pinned to Home and "Staff picks", would change the first impression more than polishing all 261.
- De-duplicating or differentiating the nine clusters above removes about a dozen tiles that currently make the catalog look padded.

### Gaps
- "Would a visitor share this" is a judgement call; I have no engagement data.

---

## 8. Motion

### Takeaway
Motion is the strongest part of the product and already at benchmark level: a tokenised scale (80/150/250/350/400/500 ms), one default ease-out, faster exits than entrances, blur-and-settle entrances, 40 ms stagger and named springs. The issue is not how things move but what is on screen when they do.

### Cited Findings
- Tokens: `--dur-micro:80ms` to `--dur-xslow:500ms`, `--ease-out:cubic-bezier(0.22,1,0.36,1)`, `--ease-pop`, `--ease-settle`, `--stagger:40ms`; springs are specified as 380/32 (snappy) and 170/26 (soft). — [foundations.css], [MOTION_SYSTEM.md](../../MOTION_SYSTEM.md)
- Adoption in scope: 881 `var(--dur-*)` and 796 `var(--ease-*)` uses; of 505 literal `cubic-bezier()` values, 394 are the default ease-out and 92 the pop curve. — [css-stats]
- `toast-stack`: `transform/opacity/filter var(--dur-medium) var(--ease-out)` on enter, `opacity var(--dur-quick)` on exit. — [toast-stack module](../../js/demos.layout.toast-stack.js)
- `command-palette`: panel opens with `grid-template-rows/opacity/transform/filter` at `--dur-fast`, closes at `--dur-quick`, rows animate in with a per-row delay. — [command-palette module](../../js/demos.layout.command-palette.js)
- `select-morph-dropdown`: options fade and translate with `calc(50ms + order*40ms)` stagger; chevron uses `--ease-settle`. — [select module](../../js/demos.forms.select-morph-dropdown.js)
- `like-heart-particles`: pop at `--dur-medium` with `--ease-pop-strong`, particles 600 ms ease-out. `checkbox-draw-check`: clip-path draw at `--dur-medium` after an 80 ms delay. Press feedback in `btn-border-beam` and the shared shell buttons is `scale(.97)` in 80 ms, release 250 ms `--ease-pop`. — [like module](../../js/demos.micro.like-heart-particles.js), [checkbox module](../../js/demos.micro.checkbox-draw-check.js), [btn-border-beam module](../../js/demos.micro.btn-border-beam.js)
- Timed frames: `elastic-tabs` shows the indicator stretched between tabs at ~0.1 s and settled by ~0.3 s; `mega-menu-preview` shows later rows still blurred at ~0.1 s and resolved by ~0.3 s; `context-menu-custom`, `spring-modal` and `select-morph-dropdown` are fully open by the first frame. — [M1], [M2]
- Home tiles animate on their own (Elastic Tabs' active tab differs between two captures seconds apart); tiles beyond the live cap show a 48 px play disc. — [SH-home-b], [SH-home-c]
- The handover manifest still lists audit flags for 63 of the 163 in-scope components in its original (non-"new") sections ("off-system curve" ×42, "no reduced-motion path" ×19). These look historical: the 12 modules I read use tokens and carry reduced-motion branches, and `AGENTS.md` states the motion baseline is empty under `--strict`. — [manifest], [AGENTS.md](../../AGENTS.md)

### Inferences
- No motion rework is needed for polish; protect it. The visual pass should not touch timing.
- Two motion-adjacent presentation gaps remain: detail views should auto-play their hero sequence once on load, and ambient effects such as the border beam or spotlight need enough luminance to be seen moving.

### Gaps
- No frame-rate or smoothness measurement (the repo's own profilers cover that; I did not run them).
- Drag springs and scroll-linked motion were not exercised.

---

## 9. Site shell

### Takeaway
The chrome is clean and credible: good header, IA, filters, detail layout and a strong command palette. It stops short of premium because the hero has no showpiece, tiles are outlines with tiny previews, the detail Stage is an empty room, the code panel opens on boilerplate, and the light theme has visible defects.

### Cited Findings
- Works well: sticky 64 px blurred header; 64 px Geist headline with one orange line; install card with npx/bun/pnpm/MCP tabs; Library sidebar with mono counts and gesture filters (Hover 166, Press 150, Drag 93, Scroll 43, Type 12, Ambient 56); detail page with breadcrumb, prev/next, Copy prompt / Copy code, a details rail with a11y chips and a "Use with your agent" panel. — [SH-home-a], [SH-lib-dark], [SH-detail-dark]
- Command palette: scoped tabs, per-result thumbnail, orange match highlighting, key-hint footer; clearly the most finished shell surface. — [SH-palette-dark], [SH-palette-light]
- Home has no live component above the fold: at 1440×900 the first tile row starts at about y=820. — [SH-home-full]
- Landing-tile defects at 1440 px: the Tool Approval tile's button label is clipped to "Approv"; the Command Palette tile is cropped at the bottom of its 196 px stage with a play disc over the content. — [home-zoom], [SH-home-b]
- Tile cards have no fill, elevation or hover lift, and the stage inside is the page colour, so the dark grid reads as outlined empty boxes with small objects in them. — [foundations.css], [SH-lib-dark]
- Light theme: the selected device button in the Stage toolbar is white on white (icon invisible); toolbar icons mix a filled desktop glyph with thin outline tablet/phone glyphs. — [toolbar-zoom], [SH-detail-light]
- Light theme: every dark-stage tile is a black rectangle in a white card, which is most of the catalog. — [SH-lib-light]
- Detail Stage: flat `#151515`, 10 px mono readout, no grid or backdrop, small component (section 6). — [SH-detail-dark], [foundations.css]
- Code panel: the default "Single file" tab opens on `<!DOCTYPE html>`, a base64 `@font-face` line and 10 lines of token variables; text is 12px/20px mono with almost no syntax colour; the component's own markup is far below the 18 visible lines ("Expand · 557 lines"). — [SH-detail-code]
- Every Library category page uses the same description: "Interfaces that move with intent. Find a detail, try it, make it yours." (hard-coded). — [library.js](../../js/shell/views/library.js), [SH-lib-buttons], [SH-lib-hover]
- Pre-launch caveats are prominent: "Use the local CLI while the npm package awaits publication" in the hero install card, "Local setup is available now. npm installation follows package publication.", "Pricing SOON", "React port SOON", "Pro COMING SOON". — [SH-home-a], [SH-home-d], [SH-detail-code]
- The search trigger and palette show the Mac "⌘K" glyph on Windows. — [SH-home-a]
- Palette thumbnails are about 54×38 px posters (Dock pills included) and are not legible; the light palette's last visible row is clipped. — [SH-palette-dark], [SH-palette-light]
- Mobile (390 px): tiles are large and readable, but the empty band under each preview is more obvious. — [SH-home-mobile]

### Inferences
- Highest-leverage shell changes, in order: (1) a hero showcase band of six to eight of the best live tiles directly under the headline; (2) a tile card with a distinct stage surface, centred and larger preview, and a hover lift; (3) the detail Stage backdrop and auto-fit; (4) a code panel that leads with the component's HTML/CSS/JS, with real syntax highlighting; (5) fix the light-theme toolbar icon and decide whether light theme should lighten stages.
- Per-category descriptions and removing "awaits publication" language are small copy jobs with outsized effect on perceived readiness.

### Gaps
- Docs, Agents and Pricing routes were not reviewed.
- Mobile was checked with device-metrics emulation only (no touch emulation), so Dock visibility on real touch devices is unverified.

---

## 10. Is the weakness in the Figma design or in the implementation? (coordinator add-on, 9 tiles)

### Takeaway
For tiles, the implementation is faithful and the weakness is in the design: the Figma v4 tiles are themselves schematic skeletons on the same dark field. For full views, the weakness is implementation and content, because the defects I found (raw file input, digit gaps, colliding rows, dev copy) are in compositions the tiles do not specify.

### Cited Findings
- Posters match their Figma tiles closely in layout, colour and placeholder bars for all nine sampled: Logo Marquee, Prompt Composer, FUI Trading Desk, Ticker Tape, Diff Review, Command Palette, Date Range, Line Chart Tooltip, AI Sidebar. — [Figma 185:2046](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=185-2046), [Figma 180:311](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=180-311), [Figma 166:1246](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=166-1246), [Figma 167:273](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=167-273), [Figma 166:399](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=166-399), [Figma 157:1722](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=157-1722), [Figma 129:1246](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=129-1246), [Figma 146:1288](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=146-1288), [Figma 144:1133](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=144-1133)
- The Figma Logo Marquee tile is the same two rows of dots and bars; Prompt Composer, Command Palette, Diff Review, AI Sidebar and FUI Trading Desk tiles all use placeholder bars in Figma. — same nodes as above
- One visible difference: each Figma tile's Dock is a single pill naming the trigger ("Ambient", "Type", "Drag", "Press", "Hover"), whereas the implemented posters show one or two action pills ("Pause / resume", "Reset", "Replay"). — Figma nodes above vs [T-lay2], [T-ag1], [T-data]
- The repo's rule is to build what the v4 tile shows ("the tile wins over older art and older demos") while full views "retain" original content and models. — [AGENTS.md](../../AGENTS.md)
- Implementation-side defects in full views with no Figma counterpart in the tile: native file input in `agent-prompt-composer`; split digits in `ticker-tape-prices`; proportional type and "Utc+6" in `fui-trading-terminal`; misaligned highlights in `ai-sidebar`. — [Z1], [Z2]

### Inferences
- Raising tile quality is a design decision, not a fidelity fix: the Figma tiles need real content and larger compositions, then the code follows.
- Raising full-view quality needs a design that does not exist yet: a full-view spec (layout, copy, hero state) per component family.
- The single trigger pill in Figma is calmer than the implemented action pills; reverting thumbnails to it would reduce clutter at no design cost.

### Gaps
- Nine tiles only; I did not check whether the Figma file contains full-view frames elsewhere.
- I compared by eye at 1×, not pixel-diffed.

---

## 11. Per-category split: (A) ship as-is, (B) shared token/style/content pass, (C) individual redesign

### Takeaway
Across 261 components: A 80 (31%), B 139 (53%), C 42 (16%). "B" assumes the shared fixes in section 13 (stage fit and backdrop, surface recipe, type unification, hero state, copy cleanup, tile-from-full-view for skeleton tiles). "C" means the component needs its own content, layout or concept work.

### Cited Findings
- Split by category (tile for all; full view where captured — see coverage table). Evidence as in section 1.

| Category | A | B | C | Rework estimate |
|---|---:|---:|---:|---|
| Buttons & Micro (30) | 8 (27%) | 19 (63%) | 3 (10%) | Token-level restyle + stage fit |
| Forms & Inputs (24) | 11 (46%) | 11 (46%) | 2 (8%) | Mostly none/token; hero-state default |
| Layout & UI (47) | 5 (11%) | 23 (49%) | 19 (40%) | Heavy individual redesign |
| Navigation & Menus (19) | 6 (32%) | 13 (68%) | 0 | Tile-from-full-view; no redesign |
| Data & Numbers (15) | 5 (33%) | 9 (60%) | 1 (7%) | Token-level + chart furniture |
| Agent & AI UI (24) | 5 (21%) | 13 (54%) | 6 (25%) | Mixed; six redesigns |
| Galleries & Sliders (18) | 7 (39%) | 10 (56%) | 1 (6%) | Wider photo pool; one redesign |
| Text & Type (29) | 17 (59%) | 10 (34%) | 2 (7%) | Mostly none; add typeface variety |
| Loaders & Progress (14) | 5 (36%) | 8 (57%) | 1 (7%) | Token-level + stage fit |
| Scroll (25) | 9 (36%) | 15 (60%) | 1 (4%) | Tile-from-full-view |
| Maps & Geo (6) | 0 | 2 (33%) | 4 (67%) | Redesign the category |
| FUI & Terminal (10) | 2 (20%) | 6 (60%) | 2 (20%) | Shared FUI type fix + two redesigns |

- **Buttons & Micro — C:** `checkbox-draw-check` (labels are grey bars in tile and full view); `micro-stateful-button` (same still as `btn-success-morph`; merge or differentiate); `micro-holo-badge` (holo effect unreadable, stray violet, placeholder line, ~150 px card). — [T-btn1], [T-btn2], [F-A1]
- **Forms & Inputs — C:** `form-gooey-search` (full view is a lone ~46 px icon with a distant caption; results are bars); `form-assignee-picker` (collapsed pill with initials run together, off-centre; names are bars in the tile). — [F-A2], [T-form1]
- **Layout & UI — C (19):** `logo-marquee` (no logos; rows cut off); `bento-spotlight` (grey boxes, invisible spotlight); `card-hover-border-gradient` (skeleton card, effect invisible at rest); `zoom-ui-inception` (nested grey squares); `mac-window` (grey silhouette, no window content); `dock-magnify` (blank squares for icons); `bottom-sheet`, `list-reorder-drag`, `resizable-split-pane`, `drag-collapse-panel` (skeleton bars in both views); `page-transition` (placeholder page with an empty grey block); `command-palette` (~220 px panel, grey squares for icons); `ui-card-fan` (blank outlined cards); `ui-bloom-menu` (duplicate of `radial-menu`); `ui-feedback-widget` (duplicate of `micro-star-rating`; full view is one button); `ui-data-table-expand` and `ui-selection-bar` (raw grey square checkboxes, header cells as buttons, clipped last row); `ui-realtime-cursors` (comment bubble overlaps the paragraph); `popover-anchor-morph` (three faint chips low in the stage; skeleton popover). — [F-A3], [F-A4], [F-2a2], [F-2b1], [M1], [M2], [T-lay1], [T-lay2], [T-lay3]
- **Navigation & Menus — C:** none. Skeleton tiles (`nav-hide-reveal`, `menu-split-reveal`, `menu-circular-expand`, `mega-menu-preview`, `sidebar-rail-expand`, `nav-pill-condense`, `tab-morph-content`, `nav-blur-elevate`) have good full views and need only a better thumbnail. — [T-nav], [F-A5], [F-2b2]
- **Data & Numbers — C:** `ticker-tape-prices` (full view shows "128 .42", "+0 .00", "84. 16"; tape cells have no surfaces). — [Z1]
- **Agent & AI UI — C (6):** `agent-prompt-composer` (native "Choose files / No file chosen" input, mismatched controls); `ai-sidebar` (oversized, misaligned highlight blocks; uneven line spacing); `ai-message-stream` ("You" label clipped by its bubble; large empty bubble); `agent-context-compaction` (smeared overlapping grey strips under "Recent messages"); `agent-voice-orb` (flat grey sphere); `ai-web-search` (boxed citation markers taller than the text line break the paragraph). — [Z1], [F-B1], [F-B2], [F-2d]
- **Galleries & Sliders — C:** `gallery-honeycomb` (numbered empty hexes, no imagery). — [F-B3]
- **Text & Type — C:** `text-squiggle-wave` (same "Wavelength" still as `text-wave-hover`); `text-circular-spin` (tile shows a dotted ring and arrow, no circular text). — [T-txt1], [T-txt2]
- **Loaders & Progress — C:** `loader-blueprint` (high-key photo, blue pill and dashes off-palette, muddled concept). — [F-2f], [PZ2]
- **Scroll — C:** `scroll-parallax-columns` (still is a near-copy of `scroll-inertia-grid`). — [T-scr2]
- **Maps & Geo — C (4):** `map-topo-extrude`, `map-city-tiles`, `map-dot-globe-arcs`, `map-radar-pings` (see section 5). — [T-map], [F-B5], [F-2f]
- **FUI & Terminal — C:** `fui-trading-terminal` (cramped proportional type, touching rows, mis-capitalised labels; tile is skeleton); `fui-data-stream` (colliding table rows, "Row 16px" leaking into the UI). — [Z2], [F-2g]

### Inferences
- Roughly 60 ids in "B" are there only because of a skeleton tile or an empty resting state; a tile-from-full-view rule plus a hero-state default would move most of them to "A" without touching their internals.
- Layout & UI should be triaged rather than fully redesigned: about eight of its 19 "C" items are generic containers (split pane, list reorder, collapse panel, bottom sheet, page transition) that need only real content.

### Gaps
- Classification of the 104 components without a captured full view is tile-based and could shift by a grade either way.
- I did not weigh interaction quality; a "C" here can still behave well.

---

## 12. Ranked weakest and strongest components

### Takeaway
The weakest items are either placeholders standing in for the thing being demonstrated or full views with visible rendering defects. The strongest share four traits: specific believable content, one meaningful use of the accent, a composition that fills the frame, and at least one real material cue (shadow, gradient, glow or photo).

### Cited Findings
- **Weakest, ranked (id — defect):**
  1. `agent-prompt-composer` — raw native file input and "Choose files" label visible; three mismatched controls; "Your prompt stays in this demo." — [Z1], [live](http://127.0.0.1:4173/#/c/agent-prompt-composer)
  2. `logo-marquee` — dots and bars instead of logos in both views; full-view rows left-aligned and cut off. — [F-A3], [live](http://127.0.0.1:4173/#/c/logo-marquee)
  3. `map-topo-extrude` — full view is a flat grid of grey squares. — [F-2f]
  4. `command-palette` — skeleton tile; open state is a ~220 px panel with grey squares for icons; cropped on Home. — [M1], [home-zoom]
  5. `ticker-tape-prices` — split digits and unsurfaced tape cells in the full view. — [Z1]
  6. `bento-spotlight` — four grey boxes with bars; spotlight at 6% white. — [F-A3]
  7. `ai-sidebar` — misaligned highlight blocks, uneven leading. — [Z1]
  8. `agent-context-compaction` — smeared, overlapping message strips. — [F-2d]
  9. `dock-magnify` — blank squares for app icons. — [F-2a2]
  10. `map-city-tiles` — flat blocks; labels collide with tiles. — [Z2]
  11. `fui-data-stream` — colliding rows; "Crc pass", "Row 16px". — [F-2g]
  12. `fui-trading-terminal` — cramped sans, touching rows, "Utc+6", "06 Lvl", "800Ms feed". — [Z2]
  13. `agent-voice-orb` — flat grey ball. — [F-2d]
  14. `zoom-ui-inception` — nested grey squares, "Atlas · Depth 0". — [F-A4]
  15. `mac-window` — grey genie silhouette. — [F-A4]
  16. `card-hover-border-gradient` — skeleton card; nothing visible at rest. — [F-A4]
  17. `form-gooey-search` — lone icon; caption ~270 px away. — [F-A2]
  18. `form-assignee-picker` — "ARMC 2 assignees" pill, off-centre. — [F-A2]
  19. `ai-message-stream` — clipped "You" label, empty bubble. — [Z1]
  20. `map-radar-pings` / `map-dot-globe-arcs` — blobs and a dotted ellipse. — [F-2f], [PZ2]
  21. `gallery-honeycomb` — empty numbered cells. — [F-B3]
  22. `list-reorder-drag`, `resizable-split-pane`, `drag-collapse-panel`, `bottom-sheet`, `page-transition` — placeholder content in both views. — [F-2b1], [F-2a2]
  23. `ui-selection-bar` / `ui-data-table-expand` — raw square checkboxes; clipped row; button-like header cells. — [F-2b1], [F-A4]
  24. `ui-realtime-cursors` — comment bubble covers the text it refers to. — [F-2b1]
  25. `checkbox-draw-check` — labels are bars. — [F-A1]
  26. `ai-web-search` — oversized citation boxes. — [F-2d]
  27. `loader-blueprint` — clashing photo and blue. — [F-2f]
  28. `context-menu-custom` — unexplained blank row between Duplicate and Delete. — [M2]
  29. `agent-token-meter` — poster shows "Context" and "68%" overprinted. — [PZ1], [poster](../../assets/posters/agent-token-meter.png)
  30. `btn-border-beam` — the beam, the whole point, is nearly invisible. — [T-btn1], [F-A1]
- **Strongest (what good already looks like here):**
  - `form-date-range` (tile) — full month, real range, accent band and caps. — [T-form1]
  - `agent-diff-review` (full) — real code, semantic red/green, mono, compact header chips. — [F-B2]
  - `data-line-tooltip` — line with gradient fill, crosshair, tooltip card. — [T-data], [F-B1]
  - `data-world-clock` (full) — three clocks with rings, day/night labels, scrubber. — [F-2c]
  - `data-candlestick-crosshair` (full) — OHLC header, volume bars, price tag. — [F-2c]
  - `form-signature-pad` — script signature, dashed baseline, dated caption. — [T-form2], [F-2a2]
  - `text-ransom-note` (full) — "KEEP IT WEIRD" cut-outs with orange tiles; the most distinctive frame in scope. — [F-2e]
  - `scroll-color-theme` (full) — the only coloured editorial panel and serif headline. — [F-2f]
  - `slider-progress-fraction`, `gallery-apple-cards`, `gallery-coverflow` (full) — captions set on photos with hierarchy. — [F-2d], [F-2e], [F-B2]
  - `fui-waveform-scope` (full) — glowing teal trace on a grid; `fui-signal-scanner` close behind. — [F-2g]
  - `btn-polish-stages` — shows the Fill → Border → Light → Depth recipe. — [T-btn1], [btn-polish-stages module](../../js/demos.micro.btn-polish-stages.js)
  - Also solid: `select-morph-dropdown`, `otp-code-boxes`, `input-float-label`, `swap-widget`, `ui-file-tree`, `nav-mobile-tabbar`, `menu-letter-cascade`, `nav-proximity-links`, `kinetic-marquee`, `copy-inline-feedback`, `micro-peel-sticker`, `micro-award-badge`. — [T-form1], [T-lay1], [T-lay2], [T-nav], [T-txt1], [T-btn1], [T-btn2]

### Inferences
- The strongest list is a ready-made style guide: lift its content density, accent use and surface treatment into the shared recipe.
- Items 1, 5, 7, 8, 11, 12, 19, 23, 24, 28 and 29 are defects, not taste; they can be fixed quickly and independently of any redesign.

### Gaps
- Ranking within the weakest list is my judgement; positions 10–30 are close.
- Some defects (items 8, 19) were captured mid-stream and may look different at other moments.

---

## 13. Top 10 systemic fixes (impact over effort) and library references

### Takeaway
Most of the perceived-quality gain is available from shared changes: Stage presentation, a surface recipe, typography and copy cleanup, hero states and better thumbnails. Per-component redesign should be reserved for the 42 "C" ids, and many of those have well-known open-source counterparts to learn from.

### Cited Findings
- Ranked fixes, each tied to evidence above:
  1. **Stage presentation (very high impact, low effort).** Give the dark Stage a backdrop (the light one already has `stage-glow.svg`), separate it from the page colour, and auto-fit small design planes to about 45–60% of the detail stage. Touches every component. — [foundations.css], section 6
  2. **Hero state by default (high, low).** Open detail views in the tile's hero state and play once; never rest at 0%, empty or collapsed. — section 6
  3. **Defect sweep (high, low).** The eleven defects flagged in section 12, plus the "Approv" clip, cropped Command Palette tile and invisible light-theme toolbar icon. — sections 9 and 12
  4. **Copy and stage hygiene (high, low–medium).** Remove in-stage component titles, instruction captions and "stays in this demo" disclaimers (at least 9 in-scope demos); replace verifier phrasing and self-referential sample data; fix unit capitalisation. — section 2
  5. **Surface recipe and grey ladder (high, medium).** One card/control/popover recipe with visible inner highlight and layered shadow; collapse 11 greys and 7 border alphas onto tokens by codemod. — section 3
  6. **Real content in skeleton tiles (very high, medium).** About 73 tiles; for Navigation and Scroll derive the tile from the full view; for Layout and Agent write short real labels. Needs a Figma decision because the bars are in the design. — sections 5 and 10
  7. **Typography unification (medium, low–medium).** Geist for demo UI, Geist Mono for all code and FUI (drop the unshipped JetBrains Mono request), a size floor of 11 px with a small scale, tracking tokens, `text-wrap: balance` on headings. — section 2
  8. **Dock simplification (medium, low).** One trigger pill in thumbnails as in Figma; centre the preview when the Dock is hidden; move Reset/Replay into the detail toolbar. — sections 6 and 10
  9. **Hero tiles and de-duplication (high, medium).** Art-direct 10–15 showpiece tiles, add a showcase band to Home, resolve nine duplicate clusters, widen the photo pool, add a small logo/app-icon/avatar kit. — sections 5, 7 and 9
  10. **Shell finish (medium, low).** Tile card with fill and hover lift, code panel that leads with component code and real highlighting, per-category descriptions, remove pre-launch caveats from the hero, platform-aware shortcut glyph. — section 9
- Library components that exist today and could inform or replace weak INTRX items (names as returned by a fetch of each library's own component list today; licences not checked by me):
  - `logo-marquee` → Magic UI **Marquee**; Aceternity **Infinite Moving Cards**, **Logo Clouds**. — [Magic UI Marquee](https://magicui.design/docs/components/marquee), [Aceternity components](https://ui.aceternity.com/components)
  - `dock-magnify` → Magic UI **Dock**; Aceternity **Floating Dock**. — same sources
  - `bento-spotlight`, `card-hover-border-gradient` → Magic UI **Bento Grid**, **Magic Card**, **Shine Border**; Aceternity **Card Spotlight**, **Glowing Effect**, **Hover Border Gradient**. — same sources
  - `btn-border-beam`, `btn-shimmer-sweep`, `micro-rainbow-shine` → Magic UI **Border Beam**, **Shimmer Button**, **Rainbow Button**, **Shiny Button**; Aceternity **Moving Border**. — same sources
  - `map-dot-globe-arcs`, `map-radar-pings` → Magic UI **Globe**, **Dotted Map**; Aceternity **GitHub Globe**, **3D Globe**, **World Map**. — same sources
  - `ui-file-tree`, `ai-code-block`, `loader-typing-code`, `fui-terminal-boot` → Magic UI **File Tree**, **Code Comparison**, **Terminal**; Aceternity **Code Block**, **Terminal**. — same sources
  - `stat-counter`, `text-numbers-slot`, `ticker-tape-prices` → Magic UI **Number Ticker**. — same source
  - `text-circular-spin`, `text-highlighter-swipe`, `velocity-skew`, text reveals → Magic UI **Spinning Text**, **Text Highlighter**, **Scroll Based Velocity**, **Text Animate**, **Hyper Text**, **Morphing Text**. — same source
  - Direct namesakes to compare for richness: `ui-evervault-card`, `ui-wobble-card`, `ui-draggable-cards`, `ui-link-preview`, `form-vanish-input`, `loader-multi-step`, `micro-stateful-button`, `gallery-apple-cards`, `gallery-testimonials`, `scroll-sticky-reveal`, `scroll-hero-parallax`, `scroll-parallax-columns`, `text-container-flip`, `text-reveal-card` ↔ Aceternity **Evervault Card**, **Wobble Card**, **Draggable Card**, **Link Preview**, **Placeholders And Vanish Input**, **Multi Step Loader**, **Stateful Button**, **Apple Cards Carousel**, **Animated Testimonials**, **Sticky Scroll Reveal**, **Hero Parallax**, **Parallax Scroll**, **Container Text Flip**, **Text Reveal Card**. — [Aceternity components](https://ui.aceternity.com/components)
  - Forms (`form-date-range` and siblings) → Origin UI's "Calendar & Date picker" family, visible on its index alongside Button, Badge, Breadcrumb and Accordion. — [Origin UI index](https://coss.com/origin), [ref-coss]

### Inferences
- From my own prior knowledge, not re-verified today (names and licences should be confirmed by the licence researcher): `command-palette` → cmdk / shadcn Command; `toast-stack` → Sonner; `bottom-sheet` → Vaul; `otp-code-boxes` → input-otp; number rolls → NumberFlow; `agent-prompt-composer`, `ai-message-stream`, `ai-tool-result`, `agent-task-checklist` → Vercel AI Elements, prompt-kit, assistant-ui; `agent-voice-orb` → ElevenLabs UI Orb; charts → shadcn/ui Charts or Tremor; `ui-kanban-board`, `list-reorder-drag` → dnd-kit examples; `ui-data-table-expand` → TanStack Table with shadcn Data Table; `ui-morphing-modal`, `popover-anchor-morph` → Motion Primitives Morphing Dialog / Morphing Popover.
- Suggested order: fixes 1–4 first (about a week of shared work, no design dependency), then 5–8 with a Figma pass, then 9–10 and the 42 redesigns starting with Agent & AI UI (highest visitor interest) and the Home-featured Layout items.
- The repo's verification suite pins exact colours, geometry and native pixels for many components, so fixes 5–7 will need the fixtures regenerated; that cost should be planned, not discovered.

### Gaps
- No licence verification: Aceternity's and Magic UI's pages did not state licence terms in what I fetched.
- Effort levels are estimates from reading the code structure, not from attempting any change.
- I did not look at React Bits, 21st.dev, Motion Primitives or Skiper UI today; they are covered by the reference researcher.

---

<!-- Evidence index. Scratchpad files are session-temporary; durable equivalents are assets/posters/<id>.png and the live routes. -->
[T-btn1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/buttons-micro-1.png
[T-btn2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/buttons-micro-2.png
[T-form1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/forms-inputs-1.png
[T-form2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/forms-inputs-2.png
[T-lay1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/layout-ui-1.png
[T-lay2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/layout-ui-2.png
[T-lay3]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/layout-ui-3.png
[T-nav]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/navigation-menus-1.png
[T-data]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/data-numbers-1.png
[T-ag1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/agent-ai-ui-1.png
[T-ag2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/agent-ai-ui-2.png
[T-gal]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/galleries-sliders-1.png
[T-txt1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/text-type-1.png
[T-txt2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/text-type-2.png
[T-load]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/loaders-progress-1.png
[T-scr1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/scroll-1.png
[T-scr2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/scroll-2.png
[T-map]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/maps-geo-1.png
[T-fui]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/fui-terminal-1.png
[F-A1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailA-1.png
[F-A2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailA-2.png
[F-A3]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailA-3.png
[F-A4]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailA-4.png
[F-A5]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailA-5.png
[F-B1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailB-1.png
[F-B2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailB-2.png
[F-B3]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailB-3.png
[F-B4]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailB-4.png
[F-B5]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/detailB-5.png
[F-2a1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/d2a-1.png
[F-2a2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/d2a-2.png
[F-2b1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/d2b-1.png
[F-2b2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/d2b-2.png
[F-2c]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/d2c-1.png
[F-2d]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/d2d-1.png
[F-2e]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/d2e-1.png
[F-2f]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/d2f-1.png
[F-2g]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/d2g-1.png
[Z1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/zoom1.png
[Z2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/zoom2.png
[PZ1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/poster-zoom.png
[PZ2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/poster-zoom2.png
[M1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/motion-1.png
[M2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/motion-2.png
[LS1]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/lightstage-1.png
[LS2]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/sheets-ui/lightstage-2.png
[SH-home-full]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/home-dark.s1.png
[SH-home-a]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/home2-light-a.png
[SH-home-b]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/home2-dark-b.png
[SH-home-c]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/home2-dark-c.png
[SH-home-d]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/home2-dark-d.png
[home-zoom]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/home-zoom.png
[SH-home-mobile]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/light/_home-mobile-b.png
[SH-lib-dark]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/library2-dark-a.png
[SH-lib-light]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/library2-light.png
[SH-lib-buttons]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/library-buttons-dark.png
[SH-lib-hover]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/light/_lib-hover-a.png
[SH-detail-dark]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/detail-elastic-tabs-dark-a.png
[SH-detail-code]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/detail-elastic-tabs-dark-b.png
[SH-detail-light]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/detail-elastic-tabs-light-a.png
[toolbar-zoom]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/toolbar-zoom.png
[SH-palette-dark]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/palette-dark-b.png
[SH-palette-light]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/palette-light-b.png
[ref-magic]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/refs/magicui-marquee.png
[ref-aceternity]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/refs/aceternity-components.png
[ref-coss]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/shots-ui/refs/coss-origin.png
[css-stats]: file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/scripts-ui/css-stats.js
[foundations.css]: ../../css/foundations.css
[registry]: ../../registry/index.json
[manifest]: ../../INTRX-handover/manifest/components.json
