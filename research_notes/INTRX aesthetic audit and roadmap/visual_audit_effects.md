# Visual audit — effects / expressive categories (INTRX, 28 Nov 2026)

Scope and method (not a key question; context for the writer). I audited the 14 registry categories not assigned to the other visual auditor: Cursor (27), Image & WebGL (25), SVG & Line (10), 3D & Perspective (15), Physics (10), Liquid & Organic (10), Ambient (18), Sound & Haptics (7), Play & Easter Eggs (11), Raster & Glitch (31), Skeuomorph (23), Interactive Showcase (16), Framer Collection (4), DRAMS (52) = **259 of 520** components ([registry/index.json](../../registry/index.json)).

What I actually looked at:

| Category | Posters viewed (native 360×264) | Live full-view routes screenshotted | Extra |
|---|---|---|---|
| Cursor | 27/27 | 16 (synthetic pointer sweep) | 6 live library tiles × 2 times |
| Image & WebGL | 25/25 | 14 | — |
| SVG & Line | 10/10 | 4 | — |
| 3D & Perspective | 15/15 | 10 | — |
| Physics | 10/10 | 4 | — |
| Liquid & Organic | 10/10 | 6 | lava-lamp at 2 s / 6 s idle |
| Ambient | 18/18 | 17 (two timed frames each) | fx-meteors, fx-beam-grid at 2.5/5/8 s idle; 9 live library tiles |
| Sound & Haptics | 7/7 | 3 | — |
| Play & Easter Eggs | 11/11 | 7 | click-fireworks with a click |
| Raster & Glitch | 31/31 | 15 | — |
| Skeuomorph | 23/23 | 18 dark + 6 on light stage | — |
| Interactive Showcase | 16/16 | 9 | — |
| Framer Collection | 4/4 | 2 | — |
| DRAMS | 52/52 | 18 | library grid |

Total: 259 posters (as 20 labelled contact sheets), **143 detail routes** (`http://127.0.0.1:4173/#/c/<id>`, headless Chrome 1440×1100, SwiftShader WebGL, stage crop 986×560), 10 Figma tiles, and source statistics over all 259 `registry/c/<id>.json` files (hex counts, tokens, blend modes, fonts, design sizes) plus poster pixel statistics (ink coverage, saturation). Evidence images are in the session scratchpad (may be cleared on reboot): `C:\Users\tanzir\AppData\Local\Temp\claude\8a6b72039f008ee8\782b9cbf-e651-4cd3-a37d-9f4fc6922f42\scratchpad\sheets-fx\` (poster sheets `<category>-N.png`, full-view sheets `full-*.png`, `figma-compare.png`, `skeuo-light.png`, `zoom-materials.png`, `crop-*.png`) and raw frames in `...\scratchpad\shots\full\`. Scripts: `mksheets.py`, `cdpshot.mjs`, `stats.mjs` in the same scratchpad. Nothing in the repo was modified except this file. Frame-rate/smoothness cannot be judged from headless software rendering; I judged stills, timed frame pairs and source parameters only. All A/B/C/D classifications are my judgement; where a component's full view was not captured the grade is extrapolated from its poster plus the category sample.

Three structural facts explain most of what follows and are referenced repeatedly:

- **F1 — the tile is faithful to Figma; the design is the weak part.** 10/10 sampled posters match their Figma v4 tile essentially 1:1.
- **F2 — every component is two different designs.** The thumbnail is the Figma v4 "native" stencil; the detail view is an older "original full" composition with different art, colours and data.
- **F3 — the detail view never scales up.** `js/shell/stage.js` clamps fit scale to ≤1, so a 400×320 composition sits in a 986×560 stage.

---

## 1. Visual richness: do the effects look lush and intentional, or grey, flat and "tech-demo"?

### Takeaway
Predominantly grey, flat and tech-demo. Outside photo-based tiles and one shader (`fx-black-hole`), the effects are thin 1px grey linework and flat grey discs on a flat `#151515` stage, with no glow, bloom, grain, depth or colour ramp; the monochrome rule produces elegance only in Raster & Glitch and (on a light stage) DRAMS/Skeuomorph. The Ambient category, where benchmark libraries are strongest, is the weakest here: full views are ≈350×254px grey canvases wrapped in lab-report chrome with a native `<select>`.

### Cited Findings
- 127 of 259 posters contain zero saturated pixels (pure greyscale); per-category mean share of saturated pixels above the dock is 0.2–1.7% — [poster pixel stats script output, scratchpad `inkstats.json`](file:///C:/Users/tanzir/AppData/Local/Temp/claude/8a6b72039f008ee8/782b9cbf-e651-4cd3-a37d-9f4fc6922f42/scratchpad/inkstats.json); posters in [assets/posters/](../../assets/posters/)
- Glow/bloom techniques are almost absent in source: across all 259 components, 0 assign a numeric Canvas `shadowBlur`, only 10 use additive/screen compositing (`globalCompositeOperation='lighter'|'screen'` or `mix-blend-mode:screen`), 35 mention grain/film/`feTurbulence`, 53 use a CSS blur/backdrop filter; 31 contain GLSL — regex over `parts.css/js/html` of every [registry/c/&lt;id&gt;.json](../../registry/c/) (script `stats.mjs`, scratchpad)
- The stage is a flat fill: `--bg-stage:var(--p-gray-850)` = `#151515` for dark; only the light stage gets a glow image (`stage-glow.svg`) — [css/foundations.css](../../css/foundations.css) lines 9–17, 226–271
- The palette file defines seven tints (`--tint-amber/violet/cyan/pink/blue/green/red`) but most effect demos barely consume shell tokens: mean count of `var(--bg|text|border|accent|p-|elev|radius|dur|ease…)` references per demo is 0.0 (Ambient, Showcase, Framer), 0.1 (SVG), 0.2 (Physics), 0.3 (3D), 0.4 (Raster), 0.6 (Cursor), 0.8 (Liquid), 1.0 (Skeuo), 2.1 (DRAMS), versus 4.3 (Sound), 5.4 (Play) and 7.5 (Image & WebGL); colours are hard-coded hexes (mean unique hexes per demo: Skeuomorph 33.3, Framer 21.0, DRAMS 18.8, Showcase 17.5, Ambient 13.5) — [css/foundations.css](../../css/foundations.css) line 24; [registry/c/](../../registry/c/)
- The repo's own historical design law prescribed the current look: "Monochrome + one accent", "Negative space is the composition… ~70% of the tile is empty", "If a color patch has no edge, delete it. Max one soft shadow/glow per tile" — [AESTHETIC_BENCHMARKS.md](../../AESTHETIC_BENCHMARKS.md) §1 rules 2, 6, 8; current rule "neutral greys + one accent per demo (no decorative hues)" — [AGENTS.md](../../AGENTS.md) Rules
- `gradient-mesh-drift` full view is a 350×254 hard-edged rectangle of **grey** blurred blobs captioned "Take your time.", under mono headers "AMBIENT / NEAREST FIELD · FIVE BLOBS / INDEPENDENT DRIFT", readouts "PHASE 2.83 · 5 FIELDS", a native `<select>` "Choose action" and two lines of key hints; its thumbnail is a small blue/pink smudge — [live route](http://127.0.0.1:4173/#/c/gradient-mesh-drift); [poster](../../assets/posters/gradient-mesh-drift.png)
- Same lab-report template on `particles-constellation`, `flow-field`, `starfield-warp`, `fireflies-night`, `aurora-curtains` (grey curtains, "Under quiet skies"), `matrix-rain`, `audio-reactive-bars`, `conway-life-fade`, `rain-window`: canvas ≈350×254px at stage scale 1.00 inside the 986×560 stage — [live route e.g.](http://127.0.0.1:4173/#/c/aurora-curtains); evidence sheets `full-ambient-1.png`, `full-ambient-2.png`
- 20 audited components ship a native `<select>` in the composition (Ambient 10, Sound 6, Skeuomorph 2, Framer 2) — regex `<select` over [registry/c/](../../registry/c/)
- `fx-black-hole` is the one hero-grade effect: full-bleed, warm accretion disc, lensing arc and ring, faint stars; it is an analytic 2D shader with a software-pixel fallback, not a ray-march — [live route](http://127.0.0.1:4173/#/c/fx-black-hole); [js/demos.fxext.fx-black-hole.js](../../js/demos.fxext.fx-black-hole.js)
- Its bleed canvas is an 840×420 pure-black rectangle inside the `#151515` 986×560 stage, so a visible hard seam frames the effect in the detail view — [live route](http://127.0.0.1:4173/#/c/fx-black-hole)
- Particle effects are un-lit dots: `fx-vortex` ≈200 white 1–2px specks with a faint warm core; `cursor-particle-emitter` five 2px grey dots (thumb) / faint specks plus a "Velocity 561" readout (full); `fireflies-night` 34 pale dots; `particles-constellation` 28 nodes with hairlines — [fx-vortex](http://127.0.0.1:4173/#/c/fx-vortex), [cursor-particle-emitter](http://127.0.0.1:4173/#/c/cursor-particle-emitter)
- Liquids are flat: `lava-lamp` = flat `#fa7319` shapes hard-clipped by an outline capsule (7 unique hexes, 0 gradients, 0 shadows in source); `ferrofluid-dots` = grey dots/ticks on a black rectangle; `smoke-wisps` full view = near-invisible plume in a black box — [lava-lamp](http://127.0.0.1:4173/#/c/lava-lamp), [registry/c/lava-lamp.json](../../registry/c/lava-lamp.json), [smoke-wisps](http://127.0.0.1:4173/#/c/smoke-wisps)
- 3D primitives are unlit grey: `css3d-cube-nav` thumb is a grey cube, `voxel-assemble` thumb grey cubes, `webgl-wobbly-sphere` a dark-grey sphere on dark grey (5 unique hexes, no gradient), `soft-body-blob` a dark ellipse, `cloth-flag` a flat grey wire-grid flag — [poster sheet rows](../../assets/posters/css3d-cube-nav.png), [webgl-wobbly-sphere](http://127.0.0.1:4173/#/c/webgl-wobbly-sphere)
- Where the monochrome rule works: Raster & Glitch (`dither-bayer`, `halftone-dots`, `dither-blue-noise`, `pixel-lissajous-lab`, `fx-dithered-logo`, `ascii-fire` with orange heat ramp) — greyscale is the medium, and the lab readouts suit a signal-processing idiom — [dither-bayer](http://127.0.0.1:4173/#/c/dither-bayer), [pixel-lissajous-lab](http://127.0.0.1:4173/#/c/pixel-lissajous-lab)
- Where accent is used as light rather than flat fill it looks intentional: `cursor-heat-shimmer` (orange-white thermal trail), `cursor-magnetic-grid-lines` and `showcase-threads` full views (orange lines among grey), `voxel-assemble` and `css3d-isometric-hover` full views (orange structural marks) — [cursor-heat-shimmer](http://127.0.0.1:4173/#/c/cursor-heat-shimmer), [voxel-assemble](http://127.0.0.1:4173/#/c/voxel-assemble)
- Many of these items are explicit reinterpretations of colourful originals: Showcase = React Bits Dot Grid/Threads/Ballpit/Ripple Grid/Magnet Lines/Pixel Trail/Ribbons/Circular Gallery/Card Swap/Elastic Slider, Magic UI Warp Background, Aceternity Gemini Effect/SVG Mask/Tracing Beam, Paper Shaders ("Canvas contour study… not a shader") — [SHOWCASE_SOURCES.md](../../SHOWCASE_SOURCES.md); `fx-*` and `3d-*` = Aceternity Meteors, Vortex, Background Boxes, Lamp, Canvas Reveal, Beams With Collision, 3D Pin, 3D Marquee, Container Scroll — [EXTENSION_GAP_ANALYSIS.md](../../EXTENSION_GAP_ANALYSIS.md) lines 222–237, 343–389

### Inferences
- The gap to Aceternity/React Bits/Paper is not interaction logic; it is the absence of four cheap rendering ingredients: additive light (glow sprites, screen blending), a colour ramp (accent used as a 3–4 stop gradient plus one cool counter-hue), surface grain/vignette on the stage, and scale. The originals these demos reinterpret get almost all their appeal from exactly those ingredients, so the "one accent, flat" translation removes the reason the effect exists.
- The monochrome rule is right for instruments, type, raster and UI; it is wrong as a blanket rule for Ambient, Liquid, 3D, Physics and Cursor particle effects. A scoped relaxation ("accent ramp + one temperature shift, used as light") would keep the brand and remove the dullness.
- Because colours are hard-coded per demo, a "shared palette pass" is not a token edit; it needs either a codemod of the recurring literals (`#151515`, `#f1f1f1`, `#a0a0a0`, `#fa7319`, `#ff8a3d`) or shared helper recipes that demos call.

### Gaps
- I did not open the benchmark sites side by side in a browser; comparison to Aceternity/React Bits/Magic UI/Paper originals is from prior knowledge of those components plus the provenance tables above. The other researcher's reference notes should be used for exact visual comparisons.
- Headless SwiftShader may render WebGL slightly differently from a GPU (no observed failures; all 143 routes mounted).

---

## 2. Material quality for Skeuomorph and DRAMS: Teenage-Engineering/Rams-grade objects, or flat vector approximations?

### Takeaway
At tile scale both families are flat vector approximations with one soft drop shadow; DRAMS is cohesive and charming, Skeuomorph thumbnails are schematic pictograms. The real material work lives in the full views (layered shadows, knurled edges, satin faces) but is shown at roughly 45–220px in a 986px stage, in greyscale-on-dark for Skeuomorph (objects authored for a light stage and inverted), and with different art from the tile.

### Cited Findings
- DRAMS thumbnails use flat fills: `drams-053` body is a flat warm-grey slab with one drop shadow and a thin lighter rim; its knob is a flat orange disc with a single tick (no gradient, specular or knurl); green LCD "98.4 FM · STEREO" — [poster](../../assets/posters/drams-053.png); zoom sheet `zoom-materials.png`
- DRAMS full views are different, more Rams-like objects: `drams-053` = tall white perforated radio ("Standby 20:53", sage-tinted), `drams-052` = slotted speaker with fan dial "96.0 FM", `drams-050` = analogue clock radio, `drams-051` = foil shaver with brushed head; objects ≈95–180px wide and ≈165–220px tall, plus a title, a spec paragraph and a mono status line — [drams-053](http://127.0.0.1:4173/#/c/drams-053), [drams-052](http://127.0.0.1:4173/#/c/drams-052), [drams-050](http://127.0.0.1:4173/#/c/drams-050), [drams-051](http://127.0.0.1:4173/#/c/drams-051); crop `crop-drams-a.png`
- Spec prose leaks into the UI as copy: "A native, accessible recreation of DRAMS 015, Joypad Controller, with its original physical composition and direct manipulation." (also on drams-047, -019, -038); "A 108px circular push key has a satin concave pale face, dark layered base, separate 12px LED and momentary vertical press travel" (drams-006) — [drams-015](http://127.0.0.1:4173/#/c/drams-015), [drams-006](http://127.0.0.1:4173/#/c/drams-006)
- Smallest DRAMS full views: `drams-034` knob ≈55px, `drams-043` orb ≈45px, `drams-038`, `drams-005`, `drams-003` controls ≈35–55px tall in the 986×560 stage (sizes estimated from half-scale sheets) — [drams-034](http://127.0.0.1:4173/#/c/drams-034), [drams-043](http://127.0.0.1:4173/#/c/drams-043)
- DRAMS design sizes are 400×520 (12) and 400×584 (40), all on a light stage; the collection is an independent recreation of the 52-piece DRAMS set by 1042 Studio — [registry/c/](../../registry/c/); [DRAMS_IMPLEMENTATION.md](../../DRAMS_IMPLEMENTATION.md)
- Skeuomorph thumbnails (Figma v4): `zippo-flame` = grey cylinder + cream teardrop (reads as a candle); `cassette-reels` = grey box, two rings, one bar; `punch-card-keyboard` = six blank grey squares; `wax-seal-stamp` = flat grey envelope with orange disc; `op1-panel` = four flat coloured dots (blue, green, white, orange) over ten grey bars; `analog-gauge` = ticks and a needle with no housing (0.63% ink) — [posters](../../assets/posters/zippo-flame.png), [cassette-reels](../../assets/posters/cassette-reels.png), [punch-card-keyboard](../../assets/posters/punch-card-keyboard.png), [op1-panel](../../assets/posters/op1-panel.png)
- Skeuomorph full views on the default dark stage are greyscale objects on a dark ground: "Listening Dial" (dark knob, knurled edge, faint halo — the best), "Pocket Lighter" (featureless grey capsule lettered FIELD), "Pocket Synth" (mid-grey panel, grey keys, one orange knob), "Turntable" (grey slab, "STILL 01"), "Tape Transport", "Needle Meter"; each repeats its title, a status line and a key-hint line — [rotary-knob](http://127.0.0.1:4173/#/c/rotary-knob), [zippo-flame](http://127.0.0.1:4173/#/c/zippo-flame), [op1-panel](http://127.0.0.1:4173/#/c/op1-panel); crops `crop-skeuo-a.png`, `crop-skeuo-b.png`
- The same full views on the light stage read markedly better (satin white dial with knurl and three-layer shadow; white turntable; white synth with black display; pale cassette; tilted paper note) — light-stage captures of rotary-knob, vinyl-player-card, torn-paper-edge, zippo-flame, op1-panel, cassette-reels via the stage theme toggle at [the same routes](http://127.0.0.1:4173/#/c/rotary-knob); sheet `skeuo-light.png`
- The source carries both themes as duplicated literal rule sets, e.g. `.d-rotary-host[data-sk-theme=light] … box-shadow:0 2px 2px #5f5f5f5c,0 9px 13px #7e7e7e45,0 21px 30px #9090902b` and `repeating-conic-gradient(#d6d6d6 0 1deg,#dbdbdb 1.2deg 3deg)` for knurling, then a `[data-sk-theme=dark]` copy with other hexes — [registry/c/rotary-knob.json](../../registry/c/rotary-knob.json) `parts.css`
- No shared material vocabulary: Skeuomorph demos average 33.3 unique hex colours, 12.0 shadow declarations and 8.3 gradients each, with only `--sk-font/--sk-ui/--sk-ink/--sk-accent-ink/--sk-border/--sk-muted` as local variables (e.g. zippo-flame 74 unique hexes, vinyl-player-card 70, cassette-reels 67) — [registry/c/zippo-flame.json](../../registry/c/zippo-flame.json), [registry/c/vinyl-player-card.json](../../registry/c/vinyl-player-card.json)
- Thumb/full state mismatches are intentional and documented ("Native defaults are on/on/60; full retains off/off/72"; "Native starts are -3dB… full keeps -8dB"; native lighter "opened and lit", "full starts closed and unlit") — [AGENTS.md](../../AGENTS.md) Skeuomorph sections; zippo prompt in [registry/c/zippo-flame.json](../../registry/c/zippo-flame.json)
- Best material piece in either family: `glass-refraction-card` (frosted panel with rim light over a blue fluid photograph; real refraction/blur depth) — [poster](../../assets/posters/glass-refraction-card.png), [live route](http://127.0.0.1:4173/#/c/glass-refraction-card)
- Off-palette exceptions inside Skeuomorph: `skeuo-wallet-cards` (blue and violet cards), `op1-panel` thumb (blue/green dots), `embossed-press` (green check) — [posters](../../assets/posters/skeuo-wallet-cards.png)

### Inferences
- Lighting is locally consistent (top-left key, soft contact shadow) but there is no cross-family light model, bevel or specular convention, so objects do not look like one product line. A Teenage-Engineering/Braun bar needs: a body colour with temperature (cream, anodised black, safety orange), a crisp inner highlight rim, a contact shadow plus ambient shadow, printed micro-typography, and one precision detail (knurl, perforation, screw) per object. The DRAMS full views are closest; the DRAMS thumbnails and all Skeuomorph thumbnails are furthest.
- Defaulting Skeuomorph detail stages to light (as DRAMS already does) is a near-zero-cost improvement; authoring true dark materials (anodised black, brass, cream legends) is the higher-quality but per-object route.
- The DRAMS thumbnail art (cream + orange "toy") and the DRAMS full art (white/sage Braun) are both defensible; shipping both under one id is not. One must win.

### Gaps
- I captured only rest states for Skeuomorph/DRAMS (no pressed/dragged frames), so press depth, shadow change and haptic feel are unassessed.
- I did not compare against the live DRAMS originals at drams.framer.website.

---

## 3. Photography inside effects: which ids clash with the dark stage?

### Takeaway
In these categories the photography is mostly well-matched and is the main source of richness; the more common fault is under-exposure (the photo disappears into the stage), followed by heavy repetition of a small pool. A few bright or saturated assets compete with the orange accent.

### Cited Findings
- 68 of 259 audited components use photographs, drawn from 24 assets; reuse counts: archGrid 22, sea 15, ocean 13, cityNight 9, aurora 8, dusk 8, portraitC1 8, forestDark 7, cityTeal 7, forestBlue 7, embers 5, silk 5, roses 5, chrome 4, magnolia 4 — `assetRefs`/`fullAssetRefs` in [registry/c/](../../registry/c/); credits in [assets/photo-credits.json](../../assets/photo-credits.json)
- Too dark, effect hard to read (severity medium–high): `hover-zoom-card`, `kenburns-crossfade`, `interlace-flicker` (forestBlue, almost black lower half); `comparison-slider`, `cursor-flashlight-noise` thumb, `showcase-card-swap` (forestDark); `image-magnetic-tiles` thumb (near-black silk tiles); `grayscale-grid` (six dim 50px tiles); `liquid-mask-reveal`, `ink-bleed-reveal`, `vhs-tracking`, `image-duotone-swap` thumb (roses on black); `cursor-zoom-lens` (lens ring invisible on dark magnolia); `css3d-parallax-room`; `clip-reveal` (small dim city photo in a grey frame) — [posters](../../assets/posters/kenburns-crossfade.png), sheets `image-webgl-1.png`, `liquid-organic-1.png`
- Bright/high-contrast against the stage (severity medium): archGrid white lattice in `cursor-inverted-lens`, `svg-marching-ants`, `webgl-fisheye-hover` full, `image-magnetic-tiles` full, `tilt-card` full; `torn-paper-edge` thumb (near-white paper block); `smoke-wisps` thumb (white smoke) — [cursor-inverted-lens poster](../../assets/posters/cursor-inverted-lens.png), [torn-paper-edge poster](../../assets/posters/torn-paper-edge.png)
- Saturated, competes with the accent (severity low–medium): `pixel-sort` (embers, orange-red fills the tile); aurora green/magenta in `particle-dissolve`, `aurora-curtains`, `cursor-hover-preview`, `image-blinds-reveal`, `css3d-carousel-cylinder`; `glass-refraction-card` (electric blue fluid — off-palette but the best-looking skeuomorph tile); `rain-window` (teal/orange bokeh — works) — [posters](../../assets/posters/pixel-sort.png), [rain-window](../../assets/posters/rain-window.png)
- Stock/wallpaper feel (severity low–medium): aerial night city (`image-infinite-zoom`, `image-shatter-click`, `glitch-rgb-slices`, `showcase-mask-reveal`), Milky Way (`image-slice-hover`), aurora, mountain dusk with the word "Beyond" (`css3d-depth-hero`) — [posters](../../assets/posters/image-infinite-zoom.png)
- The same chrome render appears on `webgl-distortion`, `tilt-card` and `cursor-following-label` thumbnails; the same dithered portrait on six Raster tiles — [posters](../../assets/posters/tilt-card.png)

### Inferences
- A per-photo exposure/contrast floor (or a thin 1px inner highlight on photo cards) would fix more tiles in these categories than replacing "bright" photos.
- Doubling the pool and assigning photos by effect (not by availability) would reduce the sameness more than any restyle.

### Gaps
- Licensing, provenance and replacement candidates are the other researcher's scope; I only flag ids.

---

## 4. Composition: does the effect fill the tile with a striking still? Which tiles are blank or near-blank?

### Takeaway
No — most tiles are small, centred pictograms in an empty field, and most detail views are a postage stamp in a large empty stage. Screenshot appeal is high only for photo-based Image tiles, Raster, DRAMS and a handful of FX; Cursor, Showcase, Play, Physics and SVG are the emptiest.

### Cited Findings
- Mean "ink" coverage (pixels differing from the stage background, area above the dock): Play 5.0%, Framer 5.2%, Showcase 5.5%, SVG 6.0%, Skeuomorph 7.3%, Cursor 7.7%, Physics 8.3%, Sound 8.5%, Ambient 9.8%, 3D 9.9%, Raster 11.9%, Liquid 13.3%, Image & WebGL 18.0%; mean bounding box of ink ≈29–47% of the tile (DRAMS excluded: light stage) — poster pixel stats over [assets/posters/](../../assets/posters/)
- Tiles under 3% ink (35 of the 207 dark-stage tiles), emptiest first: fx-beam-grid 0.40, fx-meteors 0.52, analog-gauge 0.63, fx-vortex 0.64, embossed-press 0.66, play-slingshot 1.39, neumorphic-buttons 1.49, cursor-particle-emitter 1.54, fx-canvas-reveal 1.59, custom-cursor 1.69, showcase-pixel-trail 1.86, spring-cursor-follower 1.93, showcase-orbital-path 2.06, webgl-point-globe 2.07, showcase-dot-field 2.16, cursor-emoji-rain 2.16, cursor-grid-ripple 2.19, showcase-ripple-grid 2.27, svg-path-draw-hover 2.28, cursor-elastic-line 2.31, ferrofluid-dots 2.32, showcase-elastic-slider 2.33, cursor-velocity-stretch 2.42, webgl-fisheye-hover 2.53, cursor-eyes-follow 2.53, cassette-reels 2.66, click-fireworks 2.74, svg-line-graph-live 2.75, brushed-metal-slider 2.82, ascii-donut-3d 2.82, cursor-rope-trail 2.86, cursor-snap-targets 2.87, fx-particle-text 2.94, slot-machine-reel 2.95, skeuo-lanyard-badge 2.99 — same stats (the threshold ignores very faint surfaces, which is the perceptual point)
- Stage fit never upscales: `Math.min(1,(stage.clientWidth-pad*2)/width,(stage.clientHeight-pad*2-dock)/height)` — [js/shell/stage.js](../../js/shell/stage.js); detail stage is `height:min(560px,70vh)` — [css/foundations.css](../../css/foundations.css) line 193; measured stage 986×560 at a 1440px viewport with readout "scale 1.00" — [live route](http://127.0.0.1:4173/#/c/fx-black-hole)
- Full-composition design sizes: Cursor 400×320 (25/27); Image & WebGL 400×320 (22/25); Physics 400×320 (10/10); Liquid 400×320 (9/10); Showcase 400×320 (16/16); Raster 400×320 or 400×400 (25/31); Skeuomorph 400×480 (16/23); DRAMS 400×520/584 (52/52); Ambient 400×472 (9/18); only 12 of 259 are "bleed" (Ambient 8, Image 2, Raster 2). A 400×320 composition covers 23% of the 986×560 stage — `designSize` in [registry/c/](../../registry/c/)
- AGENTS.md treats the Stage as frozen: "Keep `css/style.css`, `css/fonts.css`, the runtime, stage and base exporter unchanged as frozen v1 inputs" — [AGENTS.md](../../AGENTS.md) Repo in one minute
- Detail-view examples of the stamp effect: `cursor-heat-shimmer` is a hard-edged 400×270 field floating mid-stage; `showcase-ballpit` a ≈380×120px cluster of grey balls; `webgl-distortion` a ≈366×266 photo; `custom-cursor` two small text links and a ≈36px ring; `dvd-screensaver` an empty ≈366×238 frame (sizes estimated from half-scale sheets) — [cursor-heat-shimmer](http://127.0.0.1:4173/#/c/cursor-heat-shimmer), [showcase-ballpit](http://127.0.0.1:4173/#/c/showcase-ballpit), [custom-cursor](http://127.0.0.1:4173/#/c/custom-cursor)
- Blank or near-blank detail views at rest: `fx-meteors` (empty stage at 2.5 s and 8 s; one 1px streak at 5 s), `fx-beam-grid` (seven hairline lanes, one or two 1px-wide beams ≈20–36px long, a ≈36px grey spark), `cursor-emoji-rain` (a ≈32px ring and "Glyphs 000"), `click-fireworks` (dim grey spiral ≈75px after a click, dark-grey skyline barely above background), `smoke-wisps`, `bubble-float-pop` (faint outlines) — [fx-meteors](http://127.0.0.1:4173/#/c/fx-meteors), [fx-beam-grid](http://127.0.0.1:4173/#/c/fx-beam-grid), [click-fireworks](http://127.0.0.1:4173/#/c/click-fireworks); sheet `full-idle.png`
- In the library grid only six tiles run live; the remainder show the static poster with a 48px play disc centred on top of the artwork (`.stage-play`), i.e. over the subject — [css/foundations.css](../../css/foundations.css) line 162; cap "six-desktop/one-touch live" — [AGENTS.md](../../AGENTS.md) Library Show more; capture `shots/lib/lib-ambient_1.png`
- Screenshot appeal by category (my ranking, best to worst): DRAMS (cohesive set) > Image & WebGL (photos) > Raster & Glitch > Framer > Sound > Skeuomorph > 3D > Liquid > Ambient > SVG > Physics > Play > Showcase > Cursor — from the contact sheets in the scratchpad built from [assets/posters/](../../assets/posters/)

### Inferences
- Removing the ≤1 clamp (or raising design sizes) is the single highest-leverage change in these categories: it roughly triples the painted area of ~247 detail views with no art changes. Canvas/WebGL demos need a DPR-aware backing-store check; DOM/SVG ones scale for free.
- Posters should be captured at the effect's peak (mid-burst, mid-ripple, lit), not its rest frame; today's posters reproduce the Figma rest stencil, which for pointer effects is the least interesting frame.
- The centred play disc should move to a corner or appear on hover only; it damages every non-live tile in exactly these categories where the subject is small and centred. (Shell item — for the other auditor to confirm.)

### Gaps
- I did not test tablet/mobile viewports or fullscreen, where the stage is smaller and the stamp effect is less severe.

---

## 5. Typography within effects (labels, readouts, wordmarks)

### Takeaway
Three type systems coexist inside the demos (Inter for copy, Geist in Skeuomorph/DRAMS and the shell, Geist Mono for lab readouts), micro-labels sit at the repo's ≈11–12px floor because nothing scales with the 986px stage, and display type inside effects is plain bold sans with no refinement. The mono "instrument" labelling is distinctive and suits Raster/Sound, but is applied to ambient backgrounds and physical objects where it reads as debug output.

### Cited Findings
- Leading font family declared inside demos, by category: Inter in Cursor 27/27, Image & WebGL 25/25, 3D 15/15, Physics 10/10, Liquid 10/10, Play 11/11, Showcase 10/16; Geist in Skeuomorph 20/23 and DRAMS 37/52; per-family mono variables (`--field-font`, `--sound-font`, `--study-font`, `--sim-font`…) in Ambient, Sound and Raster — regex over [registry/c/](../../registry/c/); shell fonts are `--font-shell:'Geist'` and `--font-shell-mono:'Geist Mono'` — [css/foundations.css](../../css/foundations.css) line 36
- The September direction mandated Inter "for interfaces and every numeric counter", while the shell later moved to Geist — [AESTHETIC_BENCHMARKS.md](../../AESTHETIC_BENCHMARKS.md) "Current direction"; [css/foundations.css](../../css/foundations.css)
- Readouts at detail scale are ≈11–12px grey (label "Temp" ≈11px, value ≈20px on `cursor-heat-shimmer` at 1:1): "Velocity 561", "Cohesion 78", "Soft body / mesh 48×32 · Energy 34%", "Orbital field / 1,800 nodes", "HEAT 50 / MERGE 02", "Ascent → 42-spark burst / drag .982 / gravity .045", "Overshoot-preserving bounds / dual axis = corner", "SLOW CONTACT < .9 PX/MS / AFFECTION DECAY .08/S" — [cursor-particle-emitter](http://127.0.0.1:4173/#/c/cursor-particle-emitter), [webgl-wobbly-sphere](http://127.0.0.1:4173/#/c/webgl-wobbly-sphere), [click-fireworks](http://127.0.0.1:4173/#/c/click-fireworks), [pet-the-blob](http://127.0.0.1:4173/#/c/pet-the-blob)
- Display words in effects are generic heavy sans: "RE P EL", "MELT", "TYPE", "SHIFT", "IMP ACT", "Beyond", "Assemble", "Light the way", grey "INTRX" (`webgl-hologram-particles` thumb); editorial exceptions that work: "WHAT THE DARK KEEPS" (`cursor-flashlight-noise`), "ACQUIRE SIGNAL" (`cursor-crosshair-hud`), "Quiet by design." (`tilt-card`), "Explore the coast." (`css3d-cube-nav`), script signature in `svg-signature-write` (Allura) — [posters](../../assets/posters/melt-drip-text.png), [cursor-flashlight-noise](http://127.0.0.1:4173/#/c/cursor-flashlight-noise), [svg-signature-write poster](../../assets/posters/svg-signature-write.png)
- Skeuomorph and DRAMS full views stack three text tiers (title, status, key hints) under each object; DRAMS adds a wrapped paragraph at ≈11px — [rotary-knob](http://127.0.0.1:4173/#/c/rotary-knob), [drams-048](http://127.0.0.1:4173/#/c/drams-048)
- Good numeric typography: `led-segment-display` ("12:45"), `flip-clock`, `slot-machine-reel`, `drams-053`/`drams-050` LCDs, `framer-formatted-metric` ("$84,210"), `framer-rolling-balance` — [posters](../../assets/posters/led-segment-display.png), [framer-rolling-balance](../../assets/posters/framer-rolling-balance.png)

### Inferences
- Pick one sans (Geist, already the shell face) plus Geist Mono for genuine readouts; replacing Inter inside ~160 demos is a mechanical change but touches every exported snippet.
- Move descriptive/readout/key-hint text out of the composition into the detail rail or a collapsible "inspector"; keep at most one line of in-stage copy. This is the same fix as removing the lab chrome in §1.

### Gaps
- I did not measure computed font sizes; sizes quoted are read off 1:1 screenshots.

---

## 6. Consistency vs sameness; redundant clusters

### Takeaway
The set is very consistent (same stage, dock, grey ramp, orange) to the point of sameness: at thumbnail size dozens of tiles are interchangeable grey dot-grids, line-fields, blobs and skeleton cards. Roughly 18 components are outright redundant and ~60 more belong to clusters that should be presented as variants of one parent.

### Cited Findings
Clusters observed on the contact sheets built from [assets/posters/](../../assets/posters/) (ids are in [registry/index.json](../../registry/index.json)):
- Rope/cable/chain between two points: `cursor-elastic-line`, `cursor-rope-trail`, `chain-links`, `spring-cursor-follower`, `showcase-ribbons`
- Pointer-reactive dot grids: `cursor-grid-ripple`, `showcase-dot-field`, `showcase-ripple-grid`, `fx-canvas-reveal`, `ferrofluid-dots`, `webgl-fisheye-hover` (thumb), `dot-matrix-shapes`, `halftone-dots`, `fx-dithered-logo`; dot globes ×2: `webgl-point-globe`, `halftone-globe-canvas`
- Line/needle fields: `flow-field`, `showcase-magnet-lines`, `cursor-magnetic-grid-lines`, `showcase-threads`, `engraving-lines-warp`, `halftone-lines`, `webgl-vertex-wave` (thumb)
- Concentric rings: `water-ripple-2d`, `svg-topographic-drift` (thumb), `showcase-mesh-surface` (thumb), `webgl-ripple-click`, `liquid-image-ripple`, `pet-the-blob`
- Grey blob/sphere: `cursor-liquid-metaball`, `svg-blob-morph`, `soft-body-blob`, `webgl-wobbly-sphere`, `pet-the-blob`, `collision-bubbles`, `bubble-float-pop`, `showcase-ballpit`
- Circular lens/mask over a photo: `cursor-inverted-lens`, `cursor-zoom-lens`, `fx-liquid-glass`, `posterize-hover`, `showcase-mask-reveal`, `spotlight-mask`, `cursor-flashlight-noise`, `liquid-mask-reveal`, `ink-bleed-reveal`, `dither-floyd-steinberg`, `image-duotone-swap`
- Grey skeleton card being moved: `cursor-drag-ghost`, `cursor-pull-distort`, `cursor-shadow-parallax`, `inertia-window-drag`, `wobbly-window-drag`, `gravity-flip-page`, `drag-to-break`, `css3d-book-page`, `3d-pin`, `spotlight-mask` (thumb), `showcase-tracing-story`
- Stacked isometric planes (near-identical thumbs): `css3d-isometric-hover`, `css3d-exploded-device`; grey cubes: `css3d-cube-nav`, `voxel-assemble`
- Tunnels: `fx-light-tunnel`, `showcase-warp-tunnel`, `css3d-parallax-room`; starbursts: `starfield-warp`, `click-fireworks`
- Particle clouds: `particles-constellation`, `fx-vortex`, `fireflies-night`, `cursor-particle-emitter`, `cursor-emoji-rain`, `fx-particle-text`, `webgl-hologram-particles`
- ASCII (8): `ascii-render`, `ascii-webcam-style-wave`, `ascii-donut-3d`, `ascii-morph`, `ascii-fluid-stir`, `ascii-fire`, `ascii-portrait-reveal`, `ascii-type-explode` — five are small grey glyph clumps indistinguishable at a glance
- Scanline/tape-over-photo (7): `scanline-crt`, `vhs-tracking`, `interlace-flicker`, `noise-grain-overlay`, `webgl-static-tv`, `glitch-rgb-slices`, `glitch-datamosh-blocks`
- Photo reveal transitions (10): `clip-reveal`, `pixelate-reveal`, `image-blinds-reveal`, `image-slice-hover`, `threshold-mosaic-transition`, `kenburns-crossfade`, `comparison-slider`, `particle-dissolve`, `image-shatter-click`, `image-magnetic-tiles`
- DRAMS horizontal sliders (11): `drams-003, -004, -005, -009, -020, -021, -022, -039, -026, -028, -030` (the last three are near-identical "hourglass rail + orange ball"); vertical sliders/knob-lines (8): `drams-002, -012, -034, -040, -008, -019, -025, -032`; toggles (13): `drams-001, -007, -014, -018, -023, -024, -035, -037, -041, -042, -027, -029, -033` plus `mechanical-switch`, `neumorphic-buttons`
- Four-digit readouts: `led-segment-display`, `flip-clock`, `slot-machine-reel`, `drams-050`; key clusters: `punch-card-keyboard`, `typing-mechanical`, `drams-036`, `konami-unlock`; pendulums: `pendulum-tags`, `drams-046`, `wrecking-ball-text`
- The repo already acknowledges overlap: "Several references overlap with established entries: `cursor-grid-ripple`, `cursor-magnetic-grid-lines`, `image-trail`, … `collision-bubbles`, and `gradient-mesh-drift`. They remain available in their original categories." — [SHOWCASE_SOURCES.md](../../SHOWCASE_SOURCES.md)

### Inferences
- A launch catalog of ~190–200 of these 259 (parents only, variants behind a "variants" switcher on the detail page) would look stronger than 259 lookalikes; the "520" headline can be kept by counting variants.
- Sameness is amplified by the photo pool (§3) and by every tile using the same centred-pictogram layout (§4).

### Gaps
- Cross-category duplicates with the other auditor's categories (e.g. Scroll depth tunnel, Text glitch, Forms sliders, Loaders lissajous) were noticed but not enumerated.

---

## 7. Motion: smoothness, easing, idle life

### Takeaway
Motion is the strongest layer: a real token system, canonical springs and source-clock integration are used consistently, and live tiles autoplay idle stories. The visual problem is that ambient motion is sparse or slow enough to read as static, and pointer effects in the detail view are inert until touched.

### Cited Findings
- Shared motion tokens: durations 80/150/250/350/400/500ms, stagger 40ms, eases `--ease-out: cubic-bezier(0.22,1,0.36,1)`, `--ease-pop`, `--ease-settle`, `--ease-bounce`, `--ease-step`, movement and blur scales, reduced-motion overrides — [css/foundations.css](../../css/foundations.css) lines 51–77; [MOTION_SYSTEM.md](../../MOTION_SYSTEM.md)
- Canonical physical recipes recur across families (release spring stiffness 380 / damping 32 / mass 1, 0.55 rubber-band past bounds, 80ms press, 150ms reduced fades) — e.g. rotary-knob prompt in [registry/c/rotary-knob.json](../../registry/c/rotary-knob.json); [AGENTS.md](../../AGENTS.md) DRAMS and Skeuomorph sections
- Source parameters sampled in 16 effects: `cursor-gooey-blob` two springs (stiffness .095/damping .76 and .16/.68) with `mix-blend-mode:difference`; `cursor-liquid-metaball`, `lava-lamp`, `webgl-wobbly-sphere`, `showcase-ballpit` exponential followers (factors ≈.055–.72); `fireflies-night` velocity damping .985; `click-fireworks` drag .982; `fx-vortex`/`fx-meteors`/`fx-plasma-orb` share `cubic-bezier(.22,1,.36,1)` for UI transitions — `parts.js` in [registry/c/](../../registry/c/) (ids named)
- Library tiles have idle life: between t≈3.5 s and 6.5 s the `cursor-gooey-blob` blob moved across its button, the `cursor-inverted-lens` lens moved and `cursor-grid-ripple` changed ripple phase; `cursor-particle-emitter` looked identical in both frames; in the Ambient grid at 6.5 s the live `particles-constellation`, `gradient-mesh-drift` and `starfield-warp` tiles differed from their static posters (i.e. were animating) — captures of [#/library/cursor](http://127.0.0.1:4173/#/library/cursor) and [#/library/ambient](http://127.0.0.1:4173/#/library/ambient); sheet `lib-cursor-2frames.png`
- Ambient detail views over time: `fx-vortex` at 2.0 s vs 4.5 s is almost unchanged (slow drift, no trails); `fx-meteors` shows nothing in two of three idle frames; `fx-beam-grid` shows one or two short beams per frame; `gradient-mesh-drift` phase readout 1.03 → 2.83 with a slow visible shift; `fx-plasma-orb` subtle change; `lava-lamp` at 6 s shows two flat blobs clipped at the capsule edge — [fx-vortex](http://127.0.0.1:4173/#/c/fx-vortex), [fx-meteors](http://127.0.0.1:4173/#/c/fx-meteors), [lava-lamp](http://127.0.0.1:4173/#/c/lava-lamp); sheets `full-motion-pairs.png`, `full-idle.png`
- Known performance debt in these categories: native `showcase-threads` measures about 19–20fps at 4× CPU throttle against a 60fps target; several Raster full views and full mobile ASCII Wave startup "remain performance audit work"; final timing gates are open — [AGENTS.md](../../AGENTS.md) (Threads investigations, raster-studies section); [docs/LLM_HANDOFF_2026-11-28.md](../../docs/LLM_HANDOFF_2026-11-28.md) Pending acceptance
- The owner's July verdict already said "physics/logic are solid, aesthetics are not" — [AESTHETIC_BENCHMARKS.md](../../AESTHETIC_BENCHMARKS.md) Historical July assessment

### Inferences
- Do not spend the aesthetic budget on motion curves. Spend it on making the motion visible: persistence trails (fade-to-background instead of clear), more simultaneous events (meteors, beams), glow on moving heads, and an attract loop in detail views for pointer effects (the thumbnail "story" already exists and could run until first input).
- Exponential per-frame followers are fine visually; the repo states these are integrated on source time, which I did not independently verify.

### Gaps
- No real frame-rate, jank or input-latency observation (headless software GL). No press/drag/release sequences were captured for springs. Idle behaviour of pointer-driven detail views without any pointer was captured only for fx-meteors, fx-beam-grid, lava-lamp and (clicked once) click-fireworks.

---

## 8. Is the weakness in the Figma design or in the implementation? (coordinator add-on, small sample)

### Takeaway
In the design. All ten sampled thumbnails reproduce their Figma v4 tile essentially pixel-for-pixel, weak and strong alike; the schematic, sparse, grey look is authored in Figma. The detail-view compositions are a separate, older design layer that the tiles do not represent.

### Cited Findings
- Sample (Figma node → implemented poster), all visually matching in geometry, colour and scale: `cursor-particle-emitter` 165:500 (five grey dots + arrow), `zippo-flame` 170:1898 (grey cylinder + cream flame), `cassette-reels` 170:1835, `webgl-wobbly-sphere` 161:1135, `gradient-mesh-drift` 170:909 (blue/pink smudge), `fx-black-hole` 96:776, `drams-053` 89:721, `css3d-cube-nav` 161:811, `soft-body-blob` 164:599, `webgl-kaleidoscope` 171:1345 — Figma file [Interaction](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=165-500) (node ids from [INTRX-handover/manifest/components.json](../../INTRX-handover/manifest/components.json)); posters in [assets/posters/](../../assets/posters/); side-by-side sheet `figma-compare.png` in the scratchpad
- Only visible differences: the Figma tile shows one trigger pill ("Move", "Press", "Ambient", "Turn"); the implementation shows up to two action pills ("Move / Reset", "Hold angle / Release angle", "Step once / Reset phase"), and the Figma tile includes the caption block — same sheet
- The repo rule that enforces this: "Build what the v4 tile in Figma shows; the tile wins over older art and older demos"; verifiers assert exact native layers/SVG slots per family (e.g. "Preserve all 882 native layers", "exact SVG bytes") — [AGENTS.md](../../AGENTS.md) Rules and per-family sections
- The handoff states no independent aesthetic sign-off exists and asks for comparison of "native tiles and full compositions with the v4 Figma references" — [docs/LLM_HANDOFF_2026-11-28.md](../../docs/LLM_HANDOFF_2026-11-28.md) Pending acceptance
- Detail-view compositions differ from the tiles (F2): thumbnail `webgl-kaleidoscope` = pie of dots, full = kaleidoscoped architecture photo; `webgl-vertex-wave` thumb = grey line waves, full = ocean-photo mesh; `particle-dissolve` thumb = aurora photo dissolving, full = the word "FORM" in green-grey dots; `image-duotone-swap` thumb = roses in a purple circle, full = sepia mountains; `aurora-curtains` thumb = aurora photo, full = grey curtains; `webgl-hologram-particles` thumb = grey INTRX, full = orange particle wordmark — [webgl-kaleidoscope](http://127.0.0.1:4173/#/c/webgl-kaleidoscope), [particle-dissolve](http://127.0.0.1:4173/#/c/particle-dissolve), [image-duotone-swap](http://127.0.0.1:4173/#/c/image-duotone-swap) vs [posters](../../assets/posters/webgl-kaleidoscope.png)

### Inferences
- Polishing implementation fidelity further will not change the owner's complaint. The Figma tiles must be redesigned (or the "tile wins" rule suspended for the effect categories) before any restyle can land; otherwise verifiers will reject improved art.
- For several Image/3D components the legacy full composition is already better than the v4 tile (kaleidoscope, vertex wave, voxel arch, isometric report, folding map); promoting the full art to the tile is cheaper than redesigning.

### Gaps
- Sample is 10 of 259 (8 weak, 2 strong), chosen by me; I did not look for Figma frames of the full compositions, so I cannot say whether full views have any Figma reference.
- Kept small deliberately to avoid Figma rate limits.

---

## 9. Per-category grade and rework estimate (A ship as-is / B shared pass / C individual redesign / D cut or merge)

### Takeaway
Across the 259: about 22% A (58), 44% B (115), 26% C (68), 7% D (18). "B" assumes the shared fixes in §12 (stage upscale, lab-chrome removal, tile/full unification, glow/colour recipe, material kit); without those, almost nothing in Ambient, Cursor, Physics, Liquid, Showcase or DRAMS detail views is shippable as a hero.

### Cited Findings
Grades are my judgement from the contact sheets and full-view captures listed in the method table; ids from [registry/index.json](../../registry/index.json); posters in [assets/posters/](../../assets/posters/); live routes `http://127.0.0.1:4173/#/c/<id>`.

| Category (n) | Grade | A | B | C | D |
|---|---|---|---|---|---|
| Cursor (27) | D+ | 4 (15%) | 13 (48%) | 8 (30%) | 2 (7%) |
| Image & WebGL (25) | B− | 8 (32%) | 10 (40%) | 7 (28%) | 0 |
| SVG & Line (10) | C+ | 3 (30%) | 4 (40%) | 3 (30%) | 0 |
| 3D & Perspective (15) | C+ (tiles D+, full B−) | 4 (27%) | 6 (40%) | 5 (33%) | 0 |
| Physics (10) | D+ | 2 (20%) | 3 (30%) | 4 (40%) | 1 (10%) |
| Liquid & Organic (10) | C− | 1 (10%) | 4 (40%) | 5 (50%) | 0 |
| Ambient (18) | tiles C, full D | 1 (6%) | 8 (44%) | 9 (50%) | 0 |
| Sound & Haptics (7) | C+ | 2 (29%) | 4 (57%) | 1 (14%) | 0 |
| Play & Easter Eggs (11) | C− | 2 (18%) | 3 (27%) | 4 (36%) | 2 (18%) |
| Raster & Glitch (31) | B− | 12 (39%) | 13 (42%) | 3 (10%) | 3 (10%) |
| Skeuomorph (23) | tiles C−, full dark C−, full light B | 3 (13%) | 11 (48%) | 8 (35%) | 1 (4%) |
| Interactive Showcase (16) | C− | 2 (13%) | 5 (31%) | 6 (38%) | 3 (19%) |
| Framer Collection (4) | B | 2 (50%) | 2 (50%) | 0 | 0 |
| DRAMS (52) | tiles B+, full C | 12 (23%) | 29 (56%) | 5 (10%) | 6 (12%) |

All C (individual redesign) ids with reason:
- Cursor: `cursor-particle-emitter` (five grey dots; needs additive sparks, trails, colour); `cursor-liquid-metaball` (flat grey blobs; needs shaded/iridescent metaball); `cursor-eyes-follow` (two outline circles; reads as clip-art); `custom-cursor` (small ring in an empty stage; needs a real surface to act on); `cursor-emoji-rain` (blank until pressed; six specks in tile); `cursor-drag-ghost`, `cursor-pull-distort`, `cursor-shadow-parallax` (grey skeleton cards; need real card content/material)
- Image & WebGL: `webgl-pixel-river` (tile = rows of grey dashes); `webgl-fisheye-hover` (tile = faint dot grid, 2.5% ink); `webgl-kaleidoscope` (tile = schematic pie; full photo version is good); `webgl-vertex-wave` (tile = grey line waves); `webgl-neural-signals` (schematic node graph); `webgl-hologram-particles` (grey wordmark, no hologram look); `fx-canvas-reveal` (1.6% ink dot field)
- SVG & Line: `svg-blob-morph` (flat grey blob); `svg-topographic-drift` (faint hairlines, no terrain feel); `svg-path-draw-hover` (three 30px outline icons)
- 3D & Perspective: `webgl-wobbly-sphere` (unlit dark sphere; needs a material); `webgl-point-globe` (2% ink; needs glow, arcs, land mask); `css3d-card-flip-grid` (empty grey squares in tile); `css3d-book-page` (grey rectangles); `3d-pin` (skeleton card, hairline beam)
- Physics: `soft-body-blob` (dark ellipse); `cloth-flag` (flat grey wire flag); `chain-links` (outline links); `inertia-window-drag` (skeleton window stack)
- Liquid & Organic: `lava-lamp` (flat orange shapes, hard clip, no glass/glow); `ferrofluid-dots` (grey ticks; nothing reads as ferrofluid); `melt-drip-text` (rectangular drips); `smoke-wisps` (full view nearly invisible; tile is just a photo); `water-ripple-2d` (hairline rings in tile)
- Ambient: `gradient-mesh-drift` (grey mesh in full, muddy smudge in tile); `fx-vortex` (white specks, reads static); `fx-meteors` (mostly blank); `fx-beam-grid` (mostly blank); `particles-constellation`, `flow-field`, `starfield-warp`, `fireflies-night`, `conway-life-fade` (≈350px canvases in lab chrome; need bleed, light and density)
- Sound & Haptics: `typing-mechanical` (four flat keycaps; duplicates other key clusters)
- Play & Easter Eggs: `click-fireworks` (grey, near-invisible in full; gold only in tile); `play-coin-flip` (dark disc with a sparkle glyph, not a coin); `play-slingshot` (1.4% ink dotted arc); `drag-to-break` (grey card with crack lines)
- Raster & Glitch: `ascii-type-explode` (plain word "TYPE"); `fx-particle-text` (plain word "Assemble", 2.9% ink); `interlace-flicker` (photo too dark to show the effect)
- Skeuomorph: `zippo-flame` (candle-like tile; blank capsule in full); `cassette-reels` (box with two rings in tile); `punch-card-keyboard` (six blank squares in tile); `wax-seal-stamp` (flat envelope; grey rectangle in full); `op1-panel` (four coloured dots; grey slab in full dark); `neumorphic-buttons` (three small flat buttons); `paper-stack-cards` (grey checklist card, no paper); `skeuo-tear-ticket` (grey skeleton ticket)
- Interactive Showcase: `showcase-ballpit` (small flat-shaded cluster, not a pit); `showcase-ribbons` (thin arcs); `showcase-mesh-surface` (wire lozenge / concentric hairlines); `showcase-warp-tunnel` (hairline rectangles); `showcase-dot-field` (2.2% ink); `showcase-pixel-trail` (1.9% ink)
- DRAMS: `drams-044` (eight orange wedges, abstract); `drams-019` (a line and a bar); `drams-034` (≈30px knob on a dashed line); `drams-010` (ball over half-bowl, unclear object); `drams-047` (three balls and a flat ellipse)

All D (cut, hide or merge) ids with reason:
- Cursor: `cursor-elastic-line` (duplicate of `cursor-rope-trail`/`chain-links`); `cursor-velocity-stretch` (too slight for its own entry; fold into `custom-cursor`)
- Physics: `spring-cursor-follower` (near-blank; duplicates cursor springs)
- Play: `gravity-flip-page`, `wobbly-window-drag` (grey skeleton windows; duplicate `inertia-window-drag`)
- Raster: `ascii-webcam-style-wave`, `ascii-morph`, `ascii-fluid-stir` (indistinguishable small glyph clumps; merge as modes of one ASCII field)
- Skeuomorph: `embossed-press` (a "Saved" button state, not an object; belongs with Buttons & Micro)
- Showcase: `showcase-ripple-grid` (duplicate of `cursor-grid-ripple`); `showcase-orbital-path` (thin ellipse + range input); `showcase-elastic-slider` (duplicate of DRAMS/Forms sliders)
- DRAMS (hide from the default grid, keep in the complete collection): `drams-028`, `drams-030` (variants of `drams-026`); `drams-020` (variant of `drams-009`); `drams-040` (variant of `drams-012`); `drams-035` (variant of `drams-045`); `drams-024` (generic iOS toggle)

A lists (what I would ship today, at tile level):
- Cursor: `tilt-card`, `cursor-inverted-lens`, `cursor-following-label`, `cursor-zoom-lens`
- Image & WebGL: `webgl-distortion`, `fx-liquid-glass`, `image-shatter-click`, `image-slice-hover`, `image-infinite-zoom`, `pixelate-reveal`, `webgl-ripple-click`, `comparison-slider`
- SVG: `svg-signature-write`, `svg-marching-ants`, `svg-squiggle-underline`
- 3D: `css3d-depth-hero`, `css3d-carousel-cylinder`, `3d-container-scroll`, `3d-marquee-grid`
- Physics: `gravity-drop-icons`, `wrecking-ball-text`; Liquid: `liquid-image-ripple`; Ambient: `fx-black-hole`
- Sound: `drum-grid-sequencer`, `sound-piano-keys`; Play: `snake-in-grid`, `konami-unlock`
- Raster: `dither-bayer`, `halftone-dots`, `dither-blue-noise`, `glitch-rgb-slices`, `glitch-datamosh-blocks`, `pixel-sort`, `threshold-mosaic-transition`, `chromatic-type`, `pixel-lissajous-lab`, `fx-dithered-logo`, `terminal-window`, `ascii-fire`
- Skeuomorph: `glass-refraction-card`, `led-segment-display`, `skeuo-wallet-cards`
- Showcase: `showcase-circular-gallery`, `showcase-card-swap`; Framer: `framer-formatted-metric`, `framer-rolling-balance`
- DRAMS: `drams-053`, `-052`, `-050`, `-051`, `-048`, `-036`, `-015`, `-006`, `-031`, `-001`, `-029`, `-043`

Everything not listed under A, C or D in its category is B.

### Inferences
- Rework estimate by category: none — Framer; shared restyle mostly — Raster & Glitch, Image & WebGL, DRAMS, Sound, Skeuomorph (with light-stage default); shared restyle plus substantial individual redesign — 3D, SVG, Liquid, Play; individual redesign of the category concept — Ambient, Cursor, Physics, Interactive Showcase.
- Even A items inherit F2/F3 in the detail view; "ship as-is" refers to the art, not the presentation.

### Gaps
- 116 of 259 full views were not captured; their B/C placement rests on the poster and on sampled siblings from the same family template. Light-theme stage variants were checked only for six Skeuomorph items.

---

## 10. Ranked list of the weakest components (specific defect)

### Takeaway
The worst offenders are blank-at-rest ambient effects, grey-on-grey 3D/physics primitives, and pictogram skeuomorphs; many are high-profile names (Meteors, Beams, Vortex, Mesh Gradient, Ballpit, Lava Lamp) that visitors will compare directly with the originals.

### Cited Findings
Ranked by severity (blank/broken first, then flat/unlit, then schematic). Evidence: live routes `http://127.0.0.1:4173/#/c/<id>` and [assets/posters/](../../assets/posters/).
1. `fx-meteors` — detail view empty in 2 of 3 idle frames; one 1px streak in the third; tile 0.5% ink.
2. `fx-beam-grid` — 1px-wide beams ≈20–36px long on hairline lanes, ≈36px grey spark; tile 0.4% ink.
3. `gradient-mesh-drift` — "mesh gradient" rendered grey in a 350×254 hard-edged box with a native select; tile is a small muddy smudge.
4. `cursor-particle-emitter` — five 2px grey dots; no glow, colour or trail.
5. `click-fireworks` — grey ≈75px burst barely above the background in full view; tile (gold) and full (grey) disagree.
6. `zippo-flame` — tile reads as a candle; full dark view is a blank grey capsule.
7. `punch-card-keyboard` — tile is six unlabeled grey squares.
8. `lava-lamp` — flat orange shapes hard-clipped by an outline; no glass, glow or metaball shading.
9. `webgl-wobbly-sphere` — unlit dark-grey sphere on dark grey.
10. `fx-vortex` — ≈200 white specks, no trails/glow; looks static across 2.5 s.
11. `soft-body-blob` / `cloth-flag` — flat grey ellipse / flat grey wire flag.
12. `smoke-wisps` — full view plume nearly invisible; tile is a stock smoke photo.
13. `cassette-reels` (tile) — grey box, two rings, one bar.
14. `custom-cursor` / `cursor-velocity-stretch` — ≈36px ring / small pill in an empty stage.
15. `showcase-ballpit` — ≈380×120px cluster of flat-shaded grey balls with one orange; not a pit.
16. `showcase-mesh-surface`, `showcase-warp-tunnel`, `showcase-ribbons`, `showcase-pixel-trail`, `showcase-dot-field` — hairline diagrams at 2–5% ink.
17. `op1-panel` — tile is four coloured dots over grey bars; full dark is a grey slab.
18. `wax-seal-stamp` — flat envelope; full is a grey rectangle with an "A".
19. `webgl-pixel-river`, `webgl-fisheye-hover`, `webgl-neural-signals`, `webgl-hologram-particles` (tiles) — schematic grey stand-ins for photo/WebGL effects.
20. `css3d-isometric-hover` + `css3d-exploded-device` (tiles) — identical stacked grey diamonds; `css3d-cube-nav`, `voxel-assemble` (tiles) — unlit grey cubes.
21. `ferrofluid-dots`, `melt-drip-text` — grey ticks; rectangular drips.
22. `dvd-screensaver` — empty frame with a small chip; `play-coin-flip` — dark disc, sparkle glyph.
23. `cursor-eyes-follow` — two outline circles with dots.
24. `spring-cursor-follower`, `play-slingshot`, `svg-path-draw-hover` — under 2.5% ink.
25. `image-magnetic-tiles`, `kenburns-crossfade`, `interlace-flicker`, `hover-zoom-card` (tiles) — near-black photos.
26. DRAMS detail views as a group — objects ≈45–220px in a 986px stage beside spec paragraphs (worst: `drams-034`, `-043`, `-038`, `-005`, `-003`).

### Inferences
- Items 1–3, 8, 10 and 15 are direct name-alikes of well-known Aceternity/React Bits/Paper effects; they are the most damaging to perceived quality and the best candidates for "replace/inform from a library" (§12).

### Gaps
- Ranking is qualitative; components I saw only as posters could move a few places after a full-view check.

---

## 11. The strongest components (what "good" already looks like here)

### Takeaway
The best pieces share three traits: a subject that fills at least half the frame, a real depth cue (refraction, blur, glow, perspective, photographic texture), and the accent used as light or as one precise mark. They prove the house style can reach benchmark quality without abandoning restraint.

### Cited Findings
- `fx-black-hole` — full-bleed luminous disc, warm ramp, lensing; the only effect I would put in a hero today — [live route](http://127.0.0.1:4173/#/c/fx-black-hole)
- `glass-refraction-card` — frosted panel with rim light over a fluid photo; `fx-liquid-glass` — lens with chromatic edge over ocean — [glass-refraction-card](http://127.0.0.1:4173/#/c/glass-refraction-card), [fx-liquid-glass](http://127.0.0.1:4173/#/c/fx-liquid-glass)
- `rain-window` (tile) — bokeh street photo with beaded droplets — [poster](../../assets/posters/rain-window.png)
- `webgl-distortion`, `tilt-card` — liquid-chrome render with dispersion — [poster](../../assets/posters/webgl-distortion.png)
- `image-shatter-click`, `image-slice-hover`, `pixelate-reveal`, `image-infinite-zoom`, `comparison-slider` — the effect is legible in a still — [posters](../../assets/posters/image-shatter-click.png)
- `css3d-depth-hero`, `css3d-carousel-cylinder`, `3d-container-scroll`, `3d-marquee-grid` — photographic content in real perspective — [posters](../../assets/posters/3d-container-scroll.png)
- Detail views that beat their own tiles: `voxel-assemble` (voxel arch with orange blocks and shadow), `css3d-isometric-hover` (exploded report with orange bars), `css3d-folding-map` (topographic route), `cursor-heat-shimmer` (thermal trail), `cursor-flashlight-noise`, `cursor-crosshair-hud` — [voxel-assemble](http://127.0.0.1:4173/#/c/voxel-assemble), [css3d-folding-map](http://127.0.0.1:4173/#/c/css3d-folding-map)
- Raster: `dither-bayer`, `halftone-dots`, `dither-blue-noise`, `glitch-rgb-slices`, `glitch-datamosh-blocks`, `pixel-sort`, `chromatic-type`, `pixel-lissajous-lab`, `fx-dithered-logo`, `ascii-fire` — [pixel-lissajous-lab](http://127.0.0.1:4173/#/c/pixel-lissajous-lab)
- DRAMS devices: `drams-053`, `-052`, `-050`, `-051`, `-048`, `-036` (tiles as a cohesive cream/orange set; full views as Braun-like objects) and controls `-006`, `-015`, `-031` — [posters](../../assets/posters/drams-053.png), [drams-052](http://127.0.0.1:4173/#/c/drams-052)
- Skeuomorph: `led-segment-display`, `flip-clock`, `skeuo-wallet-cards`, `dynamic-notch`; on the light stage `rotary-knob`, `vinyl-player-card`, `op1-panel`, `torn-paper-edge` — [led-segment-display poster](../../assets/posters/led-segment-display.png); sheet `skeuo-light.png`
- Others: `svg-signature-write`, `drum-grid-sequencer`, `sound-piano-keys`, `framer-rolling-balance`, `framer-formatted-metric` — [posters](../../assets/posters/svg-signature-write.png)

### Inferences
- A workable internal bar: "would this tile survive as a 1200×630 social card?" About 45–60 of the 259 pass today.

### Gaps
- None beyond the sampling limits already stated.

---

## 12. Top systemic fixes (impact/effort) and library components that could replace or inform weak effects

### Takeaway
Six of the ten fixes are shared, mostly mechanical changes that would lift ~115 components at once; the remaining four are art direction decisions the owner must make because they contradict current repo rules (Figma tile wins, one flat accent, frozen Stage, never copy code, zero dependencies). Paper Shaders (Apache-2.0) and Magic UI (MIT) are safe to adopt from; React Bits is not redistributable; Aceternity's terms are unclear.

### Cited Findings
Ranked fixes (impact ÷ effort, highest first):
1. **Let the detail Stage scale compositions up** (target ≈80% of 986×560). One clamp: `Math.min(1, …)` — [js/shell/stage.js](../../js/shell/stage.js). Affects ≈247 of 259. Needs the "frozen Stage" rule lifted — [AGENTS.md](../../AGENTS.md).
2. **Remove lab-report chrome from compositions**: mono headers, readouts, native `<select>` (20 demos), key-hint lines, repeated titles, DRAMS spec paragraphs; move to the Details rail/Notes. Per family template (ambient field host, sound host, skeuo host, DRAMS host, cursor/physics readouts) — examples [gradient-mesh-drift](http://127.0.0.1:4173/#/c/gradient-mesh-drift), [drams-015](http://127.0.0.1:4173/#/c/drams-015).
3. **Make all Ambient/FX backgrounds bleed**: only 12 of 259 are bleed today; ambient canvases are ≈350×254px in a 986×560 stage — `designSize` in [registry/c/](../../registry/c/). Also fix the black-rectangle seam on `fx-black-hole`.
4. **One composition per component** (resolve F2): choose tile art or full art per family; regenerate posters at the effect's peak frame — mismatches listed in §8; poster tooling `tools/build-posters.js` per [AGENTS.md](../../AGENTS.md).
5. **Shared light recipe for canvas/WebGL effects**: glow sprite + additive pass, persistence trails, vignette, film grain; today 0/259 use `shadowBlur`, 10/259 additive — stats over [registry/c/](../../registry/c/). Applies to ≈25 particle/line effects.
6. **Scoped colour relaxation**: accent as a ramp (deep → `#FA7319` → pale) plus one cool counter-hue for Ambient/Liquid/3D/Physics/Cursor particles; the unused `--tint-*` tokens already exist — [css/foundations.css](../../css/foundations.css) line 24; rule to amend in [AGENTS.md](../../AGENTS.md).
7. **Shared material kit for Skeuomorph/DRAMS**: tokens for body, face, bevel highlight, contact + ambient shadow, knurl, legend type; one light direction; default Skeuomorph detail stage to light (or author true dark materials) — current state 33 unique hexes and 12 shadows per Skeuomorph demo, [registry/c/rotary-knob.json](../../registry/c/rotary-knob.json); light-stage evidence `skeuo-light.png`.
8. **Composition floor for tiles**: subject ≥45% of tile width and ≥≈20% ink; 35 tiles are under 3% — poster stats over [assets/posters/](../../assets/posters/). Requires redesigning the Figma tiles ([AGENTS.md](../../AGENTS.md) "tile wins").
9. **Typography unification inside demos**: Inter (≈160 demos) → Geist/Geist Mono to match the shell; minimum in-stage label size after upscale — font stats over [registry/c/](../../registry/c/); [css/foundations.css](../../css/foundations.css) line 36.
10. **Curate and de-duplicate**: hide the 18 D items, present cluster members as variants, widen and re-expose the photo pool (24 photos across 68 demos; archGrid ×22) — §6, §3.
Also (shell, for the other auditor): move the centred 48px play disc off the artwork on non-live tiles — [css/foundations.css](../../css/foundations.css) line 162.

Licences checked today:
- React Bits is "MIT + Commons Clause": commercial use allowed, but you may not "sell, sublicense, or redistribute the components, whether alone, bundled, or as a ported version" — [react-bits LICENSE.md](https://raw.githubusercontent.com/DavidHDev/react-bits/main/LICENSE.md)
- Paper Shaders repository licence is Apache License 2.0 — [paper-design/shaders LICENSE](https://raw.githubusercontent.com/paper-design/shaders/main/LICENSE); catalogue of 30 shaders (mesh gradient, grain gradient, dithering, dot orbit, dot grid, warp, spiral, swirl, waves, neuro noise, perlin, simplex noise, voronoi, pulsing border, metaballs, color panels, smoke ring, god rays, paper texture, fluted glass, water, image dithering, halftone dots, halftone cmyk, lens distortion, heatmap, liquid metal, gem smoke…) — [shaders.paper.design](https://shaders.paper.design/)
- Magic UI is MIT — [magicui LICENSE.md](https://raw.githubusercontent.com/magicuidesign/magicui/main/LICENSE.md)
- Aceternity's licence page does not state MIT for free components and says "You cannot re-distribute the Item… or its source files" and "cannot sell, resell, or distribute the Item or derivative works on any marketplace" — [ui.aceternity.com/licence](https://ui.aceternity.com/licence)
- Repo rules that conflict with adopting code: "Never copy code or assets from reference sites; new components are original implementations" and "No bundler, no framework, no runtime dependencies in the site" — [AGENTS.md](../../AGENTS.md) Rules

Weak effect → library component that does it better (adopt = licence permits porting with notice; inform = study the technique, re-implement):
- `gradient-mesh-drift` → Paper **Mesh Gradient** / **Grain Gradient** (adopt, Apache-2.0); React Bits Aurora/Silk/Iridescence (inform)
- `aurora-curtains` → Aceternity **Aurora Background** (inform; CSS gradient technique), Paper **Waves**/**Warp** (adopt)
- `fx-vortex` → Aceternity **Vortex** (inform: simplex-noise flow with blurred glow pass), Paper **Swirl**/**Spiral** (adopt)
- `fx-meteors` → Magic UI **Meteors** (adopt, MIT)
- `fx-beam-grid` → Aceternity **Background Beams With Collision** (inform)
- `fx-background-boxes` → Magic UI **Flickering Grid** / **Retro Grid** (adopt), Aceternity Background Boxes (inform)
- `particles-constellation`, `fireflies-night` → Magic UI **Particles** (adopt)
- `starfield-warp`, `showcase-warp-tunnel`, `fx-light-tunnel` → Magic UI **Warp Background** (adopt), Paper **God Rays** (adopt)
- `webgl-point-globe`, `halftone-globe-canvas` → Magic UI **Globe** (adopt only after checking the licence of the `cobe` library it wraps)
- `lava-lamp`, `cursor-liquid-metaball` → Paper **Metaballs** (adopt)
- `smoke-wisps` → Paper **Smoke Ring** / **Gem Smoke** (adopt)
- `webgl-wobbly-sphere`, `svg-blob-morph`, `soft-body-blob` → Paper **Liquid Metal** (adopt) as the material reference
- `water-ripple-2d`, `liquid-image-ripple` → Paper **Water** (adopt)
- `flow-field`, `svg-topographic-drift`, `showcase-mesh-surface` → Paper **Perlin**/**Simplex Noise**/**Voronoi** (adopt)
- `fx-canvas-reveal`, `showcase-dot-field`, `cursor-grid-ripple` → Paper **Dot Grid**/**Dot Orbit** (adopt); Aceternity Canvas Reveal (inform)
- `webgl-neural-signals` → Paper **Neuro Noise** (adopt)
- `glass-refraction-card`, `fx-liquid-glass`, cursor lenses → Paper **Fluted Glass**/**Lens Distortion** (adopt)
- Dither/halftone family → Paper **Dithering**, **Image Dithering**, **Halftone Dots**, **Halftone CMYK** (adopt) as the finish benchmark
- `showcase-ballpit`, `showcase-threads`, `showcase-ribbons`, `showcase-pixel-trail`, `showcase-magnet-lines` → their React Bits namesakes (inform only — Commons Clause forbids redistributing ports) — [SHOWCASE_SOURCES.md](../../SHOWCASE_SOURCES.md)
- `fx-lamp`, `3d-pin`, `3d-marquee-grid`, `3d-container-scroll` → Aceternity Lamp / 3D Pin / 3D Marquee / Container Scroll (inform)

### Inferences
- Fastest credible path for the effect categories: (a) fixes 1–3 in a week of shell/template work; (b) port ≈12 Paper shaders to the repo's vanilla/WebGL host as the new Ambient, Liquid and material baseline (Apache-2.0 notice in exports); (c) take Magic UI for meteors/particles/grid/globe; (d) re-implement the Aceternity/React Bits name-alikes from scratch with the shared light recipe; (e) redesign the ≈68 C tiles in Figma against a composition floor.
- INTRX is itself a redistributed component catalog with a planned Pro tier, so "can I use it commercially" licences are not enough; only licences that allow redistribution of source (MIT, Apache-2.0, ISC, BSD) fit. That excludes React Bits ports outright.
- Adopting Paper shaders would add GLSL to categories that currently guarantee Canvas/SVG fallbacks and exact-pixel verifiers; the verification regime (hundreds of byte-exact suites in AGENTS.md) is likely the real cost of any restyle, not the art.

### Gaps
- I could not confirm an official statement that Aceternity's free components are MIT; treat as not redistributable until the owner checks.
- My memory had Paper Shaders under a more restrictive licence at one time; the repository file fetched today is Apache-2.0, but verify the licence of the specific package version before porting.
- I did not verify the licence of `cobe` or of fireworks/confetti libraries; not recommended here for that reason.
- Magic UI and Aceternity component names (Meteors, Particles, Flickering Grid, Retro Grid, Warp Background, Globe; Aurora Background, Vortex, Lamp, Background Beams With Collision) are from prior knowledge and the repo's own provenance tables, not re-opened today; only the Paper Shaders catalogue and the four licence files were fetched. Size figures marked "estimated from half-scale sheets" are ±15%.
- No effort estimates were validated against the repo's verifier/test burden.
