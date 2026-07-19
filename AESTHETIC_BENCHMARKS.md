# AESTHETIC_BENCHMARKS — taste pass (for Codex)

Owner verdict: physics/logic are solid, aesthetics are not. The failures are systemic, not per-demo:
LLM-ideated compositions, no palette discipline inside tiles, Inter inside a mono shell, pastel/light
roots, emoji-as-art, and 4+ hue families in single demos. The user-flagged items (031 `cursor-eyes-follow`,
071 `image-blinds-reveal`, 075 `webgl-distortion`, 089 `webgl-neural-signals`, 090 `webgl-pixel-river`,
Skeuomorph, Galleries & Sliders) are **examples, not the list** — a full heuristic audit is in the appendix.

This doc gives (a) the design law every repair must satisfy, (b) a benchmark link per problem area —
the best publicly visible version of the pattern to measure against — and (c) the repair queue.
Read `KIMI_QA.md` first; its A0–A4 findings and coordination rules still apply. One repair per commit.

---

## 1. Design law (post-Originkit-benchmark, 2026-07-19)

Benchmarked against originkit.dev (measured tokens, not guessed). Adopted for INTRX:

| Token | Value | Note |
|---|---|---|
| Chrome bg | `#1e1e1f` | page/sidebar/panel — charcoal, NOT near-black |
| Stage bg | `#0a0a0b` | demo tile canvases — darker than chrome, reads as an inset "screen" |
| Raised bg | `#262626` | hovers, inputs, modals |
| Line | `#333333` | 1px dashed tile frames, hairlines |
| Text | `#ffffff` / `#b8b8b8` / `#7a7a7f` | primary / secondary / faint |
| Accent | `#fa7319` | THE ONLY HUE. `rgba(250,115,25,x)` for glows/dims |
| Type | Roboto Mono (JetBrains Mono fallback), base 16/24 | mono everywhere, incl. inside demos |
| Radius | 0 | everywhere |

Inside-demo rules (the taste bar every repair must clear):

1. **One idea per tile.** If a demo needs a caption to explain what it is, the composition failed.
2. **Monochrome + one accent.** Grayscale ramp (`#0a0a0b → #fff`) plus `#fa7319` only.
   Semantic colors (success/error) allowed, desaturated ~20%. Concept-exempt demos
   (glitch/raster/scene art — see KIMI_QA P3 list) keep their palettes.
3. **No pastel or light roots.** Nothing lighter than `#2a2a2e` at tile scale. Paper/metal skeuo
   materials: dark variants, one muted paper tone ≤ `#d7d2c4`.
4. **No emoji as content.** Replace with drawn glyphs, unicode box/line art, or typography.
5. **Type is a material.** Big numerals, uppercase micro-labels, tabular figures — not decorative fonts.
6. **Negative space is the composition.** Small dense widget centered in dark field beats
   full-bleed clutter. Look at any Originkit tile: ~70% of the tile is empty.
7. **Photography placeholders:** grayscale line art, flat silhouettes, or big numerals — never
   rainbow CSS gradient "art" blocks.
8. **Gradient/glow discipline (vision-verified 2026-07-19).** Blurred radial glows, muddy warm
   multi-stop gradients, and airbrushed "duotone" washes are themselves aesthetic culprits — the
   brown card + blurred orange ring in `slider-stack-deck` and the tan casino toy in
   `slot-machine-reel` are the disease, and a blind duotone recolor reproduces it. The accent must
   live IN structure: colored linework (gradient strokeStyle on drawn lines), flat dimensional
   fills, hairlines, type. If a color patch has no edge, delete it. Max one soft shadow/glow per
   tile and only behind a hard-edged object (e.g. a crisp sun disc).
9. **Heuristic flags ≠ bad taste — verify with eyes before repairing.** The FUI section trips
   MULTI-HUE/SAT flags yet is visually excellent because every hue is semantic (bid/ask red-green,
   OK columns, alert ticks). Screenshot the tile (deep-link `#demo-id` boots it in the modal)
   before deciding it needs repair.

## 2. Benchmarks per problem area

Format: what's wrong → the reference to beat → repair direction.

### 031 · cursor-eyes-follow (Cursor)
Childish: googly cartoon eyes, pastel root (`LIGHT-ROOT` + 4 saturated colors).
- Benchmark: Awwwards' collected treatment — https://www.awwwards.com/inspiration/animated-eyes-follow-mouse-cursor (Ochi Design: eyes as bold graphic shapes, editorial not cartoon)
- Also: https://codepen.io/clayb/pen/vjwNdE (restraint: two shapes, flat color)
- Repair: dark stage, two large high-contrast geometric eyes (white sclera as thin ring or flat
  `#ececef` ellipse, pupil pure black or accent), no face/blush/mouth. Add blink on idle. Editorial, not mascot.

### 071 · image-blinds-reveal (Image & WebGL)
Horrendous colors/composition: saturated multi-hue gradient placeholder slats.
- Benchmark: SVG-mask blinds transitions — https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/ (30 even blinds, one image, strict rhythm)
- Also: https://tympanus.net/codrops/2018/02/06/slice-revealer/ and https://tympanus.net/codrops/2018/06/12/full-image-reveal-effect/
- Repair: one duotone (near-black + accent) generated image, even slat count (12–30), single-direction
  stagger with one easing. Kill the hue-per-slat rainbow.

### 075 · webgl-distortion (Image & WebGL)
- Benchmark: the canonical pair — https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/ and https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/ (velocity-driven, photographic, no UI chrome)
- Also (bulge variant): https://tympanus.net/codrops/2023/06/28/creating-a-bulge-distortion-effect-with-webgl/
- Repair: replace placeholder texture with generated grayscale/duotone imagery (noise-displaced
  gradient or line-field render). Full-bleed in tile, zero labels except corner hint.

### 089 · webgl-neural-signals (Image & WebGL)
LLM-ideated composition — node soup + too many hues.
- Benchmark: https://arogozhnikov.github.io/3d_nn/ (levels as calm layered surfaces) and https://codepen.io/towc/pen/wGjXGY (single-hue signal pulses, black field)
- Repair: one hue (accent) on black; nodes as 1–2px points, signals as brief traveling glow;
  ≤3 layers; slow drift, not chaos. Think "instrument", not "brain clipart".

### 090 · webgl-pixel-river (Image & WebGL)
- Benchmark: flow-field craft — https://emildziewanowski.com/flowfields/ (the taste ceiling for this idea) and https://www.webgpu.com/showcase/tendrils-emergent-webgl-particle-visuals/
- Also: https://blog.serchinastico.com/flow-fields/ (parameter discipline)
- Repair: single vector field, monochrome particles with accent only at velocity peaks,
  trails via low-alpha fade. Remove blocky "pixel" gimmick unless quantized grid IS the idea — then
  keep the grid ≤2 tones.

### Skeuomorph section (18 flagged)
Some are good; the weak ones match low-tier "CSS art" from the internet. The bar:
- OP-1 panel: https://codepen.io/shunyadezain/pen/QWyVwep (the reference recreation) + real thing https://teenage.engineering/products/op-1 (their restraint is the lesson: 2 grays + 3 small accents)
- Flip clock: https://codepen.io/shshaw/pen/vKzoLL (canonical) + pure-CSS https://unframework.com/portfolio/pure-css-flip-clock-animation/
- Rotary knob: https://codepen.io/paegasus/pen/GRBMbWd (conic-gradient ring, single accent)
- Cassette: https://codepen.io/mikemorkes/full/aWqjem (material fidelity)
- Roundup for calibration: https://speckyboy.com/interactive-skeuomorphic-design-elements/
- Repair rule: pick ONE material (dark brushed metal / matte plastic / paper) per demo, light from
  one direction, shadows in 2 layers max, all chrome text mono uppercase micro-labels. Fix first:
  `slot-machine-reel` (SAT:10 + emoji), `wax-seal-stamp` (SAT:10), `analog-gauge`, `cassette-reels`,
  `dynamic-notch` (MULTI-HUE:5), then the light-material set from KIMI_QA A0.

### Galleries & Sliders (all 13 flagged — worst section by density)
Multi-hue gradient placeholder "art" + Inter + per-slide hues = the childish read.
- Benchmarks: https://tympanus.net/codrops/2024/05/13/design-finds-creative-slideshows/ ·
  https://tympanus.net/codrops/2025/04/21/mastering-carousels-with-gsap-from-basics-to-advanced-animation/ ·
  https://tympanus.net/codrops/tag/slideshow/ · scroll-driven WebGL gallery https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/
- Repair: shared placeholder system for the whole section — generated duotone images (grayscale noise /
  line fields / big numerals "01–05" as slide art), all slides same duotone, accent only on
  progress/counters. Numbered slides + fraction counters + thin progress = editorial instantly.

### FUI & Terminal — NO REPAIR NEEDED (vision-verified 2026-07-19)
Screenshot review of `fui-status-dashboard` and `fui-trading-terminal` on the live site: these are
correctly implemented — hard-edged corner brackets, dense mono telemetry, restrained motion, hues
all semantic. The earlier heuristic flags were false positives. **Do not touch this section.**
Instead, treat these two demos as the INTERNAL gold standard for the "instrument" look when
repairing Data, Agent, and Layout demos.
- External canon for reference only: https://www.hudsandguis.com/ ·
  https://medium.com/domo-ux/designing-a-functional-futuristic-user-interface-c27d617ce8cc

### Agent & AI UI (7 flagged)
- Benchmark: https://vercel.com/blog/ai-sdk-3-generative-ui (streaming UI restraint) + Linear-style
  changelog/status surfaces for list/diff density.
- Repair: these are UI-chrome demos — grayscale chrome, accent for the "live" element only
  (stream cursor, active node, diff add). Kill emoji (`agent-deploy-pipeline`, `agent-thinking-drawer`),
  kill per-state hues (`agent-token-meter` MULTI-HUE:5/SAT:6).

### Forms / Buttons / Loaders / Layout (the A0 wall-of-white)
Already specified in KIMI_QA A0 — dark roots, mono, accent focus states. Benchmark is Originkit's
own form/button tiles: widget floats in dark field, accent appears only on interaction.

### Cursor section (19 flagged, worst SAT density)
`cursor-hover-preview` (7 hues/10 sat), `cursor-emoji-rain` (emoji + 10 sat), `cursor-heat-shimmer`,
`cursor-crosshair-hud`, `cursor-pull-distort` (10 sat each).
- Benchmark: any Ochi/Cuberto-style cursor work on Awwwards — cursor demos read premium when the
  cursor artifact is the ONLY colored thing on an empty dark stage.
- Repair: strip stages to bare dark field + 1–3 target elements; artifact in accent; emoji-rain →
  glyph-rain (unicode arrows/asterisks in grayscale, accent 1-in-10).

## 3. Repair queue (priority order)

1. **P0 — user-flagged five:** 031, 071, 075, 089, 090 (071/075/089/090 done in this pass — see §4; 031 done).
2. **P1 — Galleries & Sliders section sweep** (shared duotone placeholder system, 13 demos).
3. **P2 — KIMI_QA A0 light-root wall** (~30 demos, worst-first: pastels).
4. **P3 — Cursor SAT offenders** (5 demos above).
5. **P4 — Skeuomorph judgment set** (list above; keep the good ones untouched; kill the
   muddy-brown material family first — `slot-machine-reel`, `wax-seal-stamp`).
6. **P5 — Agent hue discipline** (7 demos; FUI is exempt — vision-verified good, see §2).
7. **P6 — global sweeps already scripted:** Inter→mono (KIMI_QA A2), violet→orange accent
   (`#a78bfa`→`#fa7319`, `rgba(167,139,250`→`rgba(250,115,25`) — DONE in this pass, verify only.

Acceptance for every repair: tile screenshot passes design law §1; no hue families beyond
grayscale+accent (unless concept-exempt); no light root; mono type; zero console errors; keep
`id`/`rootClass`/`cat`/contract; update `prompt` when visuals change materially.

## 4a. Vision QA round (Claude, 2026-07-19, second pass) — findings

Screenshots taken via browser on the live site (old build) + injected previews of the new fixes:

- **FUI section: excellent as-is** — removed from the repair queue (see §2). Use
  `fui-trading-terminal` / `fui-status-dashboard` as internal benchmarks.
- **Confirmed culprit family:** muddy warm fills + blurred glow blobs (`slot-machine-reel` tan
  casino toy, `slider-stack-deck` brown card with blurred orange ring). Rule 8 added.
- **031 eyes rebuild: passes** (verified via injection) — clean editorial pair on dark stage.
- **071 scene: first rebuild failed vision QA** (floating bars, sticker sun, sky banding) —
  recomposed: buildings anchored to horizon with varied heights, dimensional sun
  (radial-gradient disc + wide soft halo), off-white headline with only the slash in accent.
- **075 texture: first rebuild failed vision QA** (airbrushed orange radial glow = blob) —
  replaced with a second gradient-stroke pass over the same contour lines so the accent is
  linework, not airbrush.
- **089/090:** palette changes verified in code (one accent + grayscale ramp; ember only at
  intensity peaks); take a screenshot after the next deploy to confirm.
- **Benchmark links spot-checked visually:** originkit.dev (tokens measured live),
  emildziewanowski.com/flowfields (confirmed exceptional — keep as taste ceiling). Codrops and
  CodePen links are cited from search results; open before leaning on any single one.

## 4. Shipped in this pass (Claude, 2026-07-19) — do not redo

- Shell re-tokened to §1 (charcoal chrome `#1e1e1f`, stages `#0a0a0b`, dashed `#333` frames,
  Roboto Mono 16px, white/`#b8b8b8` text, orange accent). Sidebar-first layout (brand + search
  in sidebar, topbar removed). Content panel padding 26px.
- **Responsive grid:** `repeat(auto-fill, minmax(min(340px,100%),1fr))` — column count now derives
  from available width (3→2→1), fixing the missing responsive logic.
- Accent sweep across all 57 demo files (violet→orange, both hex and rgba forms).
- Inter→mono sweep inside demos (KIMI_QA A2), serif editorial exemptions preserved.
- Rebuilt: 031 eyes-follow, 071 blinds-reveal, 075 distortion texture, 089 neural-signals,
  090 pixel-river per §2.

## 5. Appendix — full heuristic audit (2026-07-19)

327 demos scanned; 267 flagged. Flags: LIGHT-ROOT (root bg luminance > .75),
MULTI-HUE:n (≥4 hue families), SAT:n (≥3 saturated colors), INTER (Inter font), EMOJI.
Many raster/glitch/scene flags are concept-exempt (KIMI_QA P3); use judgment.
Regenerate anytime:

```bash
node tools/audit-aesthetics.js   # emits per-category flag lists + /tmp/audit.json
```

Worst offenders by flag weight (non-exempt): form-multistep-progress (LIGHT+SAT:12),
select-morph-dropdown (LIGHT+SAT:10), cursor-hover-preview (HUE:7+SAT:10), cursor-emoji-rain,
cursor-pull-distort, spring-cursor-follower (SAT:10), slot-machine-reel (SAT:10+EMOJI),
wax-seal-stamp (SAT:10), bitmap-font-marquee (SAT:10), konami-unlock (HUE:6+SAT:7),
image-infinite-zoom (HUE:7+SAT:7), agent-token-meter, fui-status-dashboard, drum-grid-sequencer,
scanline-crt (HUE:9 — exempt), glitch-datamosh-blocks (SAT:13 — exempt).

Full category lists: run the audit script; Galleries & Sliders (13/13), Forms (10/10),
Loaders (10/10), Cursor (19), Layout & UI (19), Skeuomorph (18), Scroll (14), Nav (12),
Physics (10), Play (8), Agent (7), FUI (8), Data (6), Sound (6), SVG (10), Text (19),
Image & WebGL (15), Ambient (10 — mostly INTER-only, art exempt).
