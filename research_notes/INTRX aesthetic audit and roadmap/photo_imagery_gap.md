# Photographic imagery in INTRX: what ships, what Figma shows, and a dark-abstract replacement set (28 Nov 2026)

Scope notes for the report writer:
- Repo was treated read-only; no verify/build/profile tools were run. Counts come from static reads of `assets/`, `registry/index.json`, `js/` and `tools/`.
- Mid-task owner/coordinator corrections are folded in: (a) the Figma file is the reference for "what was designed" but the owner says the Figma imagery is **not** good either, so the goal is to replace ALL photo slots with a NEW curated dark-abstract set, not to match Figma; (b) the owner excluded procedurally generated and AI-generated assets, so only real, licensed, human-made photographs/renders are proposed and that evaluation is omitted.
- No candidate image was downloaded or viewed. Every candidate's look is inferred from its Unsplash title, alt text, tags and metadata. **The owner must eyeball each link before approval.**
- Scratch evidence I generated (temp, outside the repo): contact sheet of the 24 current photos `C:\Users\tanzir\AppData\Local\Temp\claude\8a6b72039f008ee8\782b9cbf-e651-4cd3-a37d-9f4fc6922f42\scratchpad\photos-sheet.jpg`; poster sheets `C:\Users\tanzir\AppData\Local\Temp\claude\8a6b72039f008ee8\782b9cbf-e651-4cd3-a37d-9f4fc6922f42\scratchpad\posters-A.jpg`, `C:\Users\tanzir\AppData\Local\Temp\claude\8a6b72039f008ee8\782b9cbf-e651-4cd3-a37d-9f4fc6922f42\scratchpad\posters-B.jpg`, `C:\Users\tanzir\AppData\Local\Temp\claude\8a6b72039f008ee8\782b9cbf-e651-4cd3-a37d-9f4fc6922f42\scratchpad\posters-C.jpg`.

---

## 1. What photos exist? (inventory + visual characterization)

### Takeaway
There are 24 credited Unsplash photos (each as 1600px + 800px WebP, all free Unsplash License, none Unsplash+), plus 3 retired generated images still sitting in `assets/images`. Viewed and measured, only 2 of the 24 (silk, fire) are dark + abstract + neutral/warm; 14 are plainly representational (forests, cities, portraits, aurora, Milky Way, flowers, interior) and 11 are blue/teal/green dominant.

### Cited Findings
- `assets/photo-credits.json` holds 24 records: forestDark, forestBlue, ocean, cityTeal, cityNight, archGrid, portraitC1, silk, aurora, dusk, embers, milkyway, chrome, interiorDark, fire, sea, roses, smoke, magnolia, portraitC2, portraitC3, trails, rain, fluidBlue. Every record has `license: "Unsplash License"`, `free: true`, a canonical `unsplash.com/photos/...` page, photographer, `verifiedAt` (15–20 Nov 2026) and SHA-256 for both files. — [assets/photo-credits.json](../../assets/photo-credits.json)
- `assets/images/` holds 54 files: 48 WebP for the 24 photos (`<key>.webp` 1600px wide, `<key>-800.webp`) plus `coastal-stack`, `limestone-pavilion`, `atlantic-shore` as both `.png` (2.3–2.8 MB each) and `.webp`. Directory is 15 MB. — [assets/images](../../assets/images)
- `assets/demo-assets.json` has 1,088 aliases: 1,061 SVG and 27 WebP. The 24 `photo-<key>` aliases point at the 800px files; the 3 generated images keep bare aliases. — [assets/demo-assets.json](../../assets/demo-assets.json)
- Sizes are not uniform: most are 1600×1067 (3:2); archGrid and portraitC2 1600×1060; silk 1600×1371; aurora/roses 1600×1068; embers 1600×651 (wide strip); chrome 1600×900 (16:9); interiorDark 1600×1200 (4:3). — [assets/photo-credits.json](../../assets/photo-credits.json)
- Extra provenance fields: silk and chrome are `kind: "3d-render"`; aurora and interiorDark `kind: "photograph"`; magnolia notes the photographer's title is "Moody Hellebores"; rain records the Figma library node 104:5, tile image node 170:1383 and Figma image hash. — [assets/photo-credits.json](../../assets/photo-credits.json)
- The three generated images are documented as "Earlier generated photographs (being replaced)". The current registry lists no component with them in `assetRefs`; the names still appear in two raster source modules. — [ASSET_ART_DIRECTION.md](../../ASSET_ART_DIRECTION.md), [registry/index.json](../../registry/index.json), [js/demos.raster.ascii.js](../../js/demos.raster.ascii.js)

Per-photo table. Subject and verdict are my visual read of the 800px files; numbers are measured on those files (luma 0–255, Rec.709 weights on gamma-encoded values; "bright px" = share of pixels above 50% luma; chroma = mean max−min channel; hue = chroma-weighted dominant hue). Source for every row: [assets/images](../../assets/images) + [assets/photo-credits.json](../../assets/photo-credits.json).

| Key | Photographer (Unsplash ID) | Subject as seen | Mean luma / p95 / bright px | Chroma, hue | Abstract? | Reads as "dark abstract"? |
|---|---|---|---|---|---|---|
| forestDark | Rosie Sun (1L71sPT5XKc) | Dense conifer trunks, near-monochrome | 21 / 52 / 0% | 5, neutral | No | Dark yes, abstract no |
| forestBlue | Taylor Wright (2aSpCOPNyO0) | Misty bare trees, blue cast | 29 / 72 / 0% | 21, 204° blue | No | No |
| ocean | Michael Benz (IgWNxx7paz4) | Aerial dark sea, white foam diagonal | 21 / 72 / 1.5% | 24, 200° blue-teal | Texture-like | Partly (blue) |
| cityTeal | Andre Benz (cXU6tNxhub0) | Aerial night street canyon, teal grade, red road | 50 / 115 / 3.4% | 24, 193° teal | No | No |
| cityNight | Polina Kuzovkova (zd8v_Ig3ndg) | Night skyline, teal + orange lights | 33 / 89 / 0.9% | 27, 179° teal | No | No |
| archGrid | Christophe Laurenceau (MPWbGMrZ6eo) | B/W brutalist facade grid, hard white light | 54 / 219 / 13.4% | 0, neutral | Geometric | Abstract-ish but bright |
| portraitC1 | Carlos Garcia Hansen (TfjOwcrMj5I) | Woman in profile, warm low-key | 17 / 82 / 2.8% | 10, 359° warm | No (person) | No |
| silk | Milad Fakurian (JTKKRK05NAM) | Black/graphite wavy 3D forms | 13 / 45 / 0% | 0, neutral | **Yes** | **Yes** (the reference look) |
| aurora | Vincent Guth (62V7ntlKgL8) | Green/purple aurora over tree silhouettes | 66 / 166 / 15.2% | 32, 173° green | No | No (bright, colourful) |
| dusk | John Towner (JgOeRuGD_Y4) | Maroon mountain ridges, grey-blue sky | 38 / 120 / 3.2% | 25, 231° | No | No |
| embers | Alican Leblebici (5w2hjEJ06b0) | Macro glowing coals, saturated orange | 40 / 101 / 1.5% | 75 (highest), 9° orange | Texture | Partly (very saturated) |
| milkyway | Dns Dgn (9wH624ALFQA) | Milky Way over mountain silhouette | 44 / 131 / 5.4% | 33, 219° blue-violet | No | No |
| chrome | Rohit Choudhari (sC2Twgvu3lg) | Iridescent liquid-chrome/glass 3D form on black | 46 / 198 / 12.3% | 23, 198° blue | **Yes** | Abstract yes; bright and blue |
| interiorDark | Dmitry Ant (oRQGyCpPREw) | Derelict room, blown-out windows | 44 / 216 / 9.0% | 10, 32° warm | No | No |
| fire | David McCumskay (JKAKwrATVq8) | Orange fire/smoke cloud on black | 13 / 59 / 0% | 39, 8° orange | **Yes** | **Yes** |
| sea | Clayton Tonna (qINZ8zEYErY) | Dark rippled water surface | 25 / 70 / 0% | 15, 200° blue-grey | Texture | Partly (blue-grey) |
| roses | Alessio Soggetti (KQBsTXCvGwM) | Red roses on pure black | 3 / 20 / 0% (darkest) | 8, 356° red | No (object) | Dark yes, abstract no |
| smoke | Pascal Meier (1uVCTVSn-2o) | White smoke on black | 53 / 180 / 16.5% | 0, neutral | **Yes** | Abstract yes; bright |
| magnolia | Annie Spratt (J4gm_1GKfAA) | Pink/white hellebores in dark foliage | 26 / 73 / 1.8% | 10, 39° warm | No | No |
| portraitC2 | Miguel Angel Avila (nB4Tyxrv0CU) | Man's back/profile, B&W on black | 9 / 72 / 2.1% | 0, neutral | No (person) | No |
| portraitC3 | Sylvester Sabo (V5tNnQfTges) | Woman facing camera, strong blue light | 25 / 132 / 5.9% | 35, 240° blue | No (person) | No |
| trails | Osman Rana (G7VN8NadjO0) | Long-exposure car light trails on black | 12 / 75 / 3.1% | 6, 358° | Semi | Mostly yes |
| rain | Max van den Oetelaar (1e60bqR1Ar0) | Rain on glass, teal + orange bokeh | 80 / 196 / 17.7% (brightest) | 33, 55° | Semi | No (bright, colourful) |
| fluidBlue | Pawel Czerwinski (prMn9KINLtI) | Blue acrylic fluid pour | 32 / 77 / 0.6% | 65, 209° blue | **Yes** | Abstract yes; saturated blue |
| coastal-stack / limestone-pavilion / atlantic-shore | Generated (retired) | Daylight sea stack / pale pavilion / shoreline | 132 / 139 / 87 mean | — | No | No (light) |

### Inferences
- Unambiguously abstract: 5 of 24 (silk, chrome, fluidBlue, fire, smoke). Texture-like or semi-abstract: 5 (ocean, sea, embers, trails, rain). Representational: 14.
- "Dark abstract" in the sense the owner now wants (near-black, non-representational, neutral or warm) is met by silk and fire only; smoke fails on brightness, chrome and fluidBlue on blue saturation.
- 11 of 24 photos are blue/teal/green/violet dominant (forestBlue, ocean, cityTeal, cityNight, aurora, dusk, milkyway, chrome, sea, portraitC3, fluidBlue). The UI is neutral grey with one orange accent, so the imagery, not the UI, supplies most of the colour on photo tiles.
- The brightness outliers that break the dark Stage are rain (mean 80), aurora (66), archGrid (54, with 13% bright pixels), smoke (53) and cityTeal (50). The cohesive ones cluster at mean luma 13–25 with p95 under ~75 (silk, forestDark, sea, fire).
- The 3 retired generated images are dead weight (about 7.7 MB of PNG) and could be deleted in the same change, subject to the two raster modules that still name them.

### Gaps
- I did not open the 1600px variants; they are resizes of the same sources, so the read should hold.
- Whether the two raster modules still load the generated images at runtime, or only mention them in comments or fixtures, was not traced.

---

## 2. Which components use each photo, and how often?

### Takeaway
119 of 520 components use photos, through 824 textual `photo-<key>` references in 115 of 447 source modules. Usage is concentrated: six cool-toned representational photos (ocean, cityNight, cityTeal, forestBlue, dusk, aurora) plus archGrid and forestDark account for most slots, and the same five-image set repeats across roughly ten gallery tiles.

### Cited Findings
- 119 components carry `photoCredits`. By group: Visual FX 46, Interface 35, Motion 21, Pointer & Physics 12, Collections 3, Data & AI 2. — [registry/index.json](../../registry/index.json)
- By category: Image & WebGL 22, Galleries & Sliders 17, Raster & Glitch 16, Scroll 13, Layout & UI 10, Cursor 8, 3D & Perspective 6, Skeuomorph 5, Liquid & Organic 4, Navigation & Menus 4, Interactive Showcase 3, Loaders & Progress 2, Ambient 2, Agent & AI UI 2, and 1 each in Text & Type, SVG & Line, Sound & Haptics, Forms & Inputs, Buttons & Micro. — [registry/index.json](../../registry/index.json)
- Components per photo (thumbnail + full view combined): ocean 42, archGrid 34, forestDark 32, cityNight 31, cityTeal 29, forestBlue 28, dusk 23, aurora 20, silk 15, sea 15, portraitC1 13, embers 12, milkyway 8, chrome 8, magnolia 7, roses 5, interiorDark 3, portraitC2 3, portraitC3 3, fluidBlue 3, fire 1, smoke 1, rain 1, trails 1. Total 338 component-photo links. — [registry/index.json](../../registry/index.json)
- Source modules: 447 listed, 115 reference `photo-*`, 824 references in total. Most referenced: ocean 94 refs / 42 modules, dusk 76 / 23, archGrid 61 / 34, forestDark 60 / 30, forestBlue 59 / 27, cityNight 58 / 28, cityTeal 58 / 29, silk 50 / 15, aurora 48 / 20, portraitC1 41 / 12. — [js/registry-files.json](../../js/registry-files.json)
- Most photo-heavy components: 3d-marquee-grid (13 distinct photos), scroll-parallax-columns (10), scroll-inertia-grid (9), slider-wheel-3d (9), scroll-hero-parallax (8), grayscale-grid (8), and seven each in masonry-filter, table-image-idle, scroll-rotate-gallery, gallery-filmstrip-scrub, gallery-random-stack, gallery-dual-row-drift. — [registry/index.json](../../registry/index.json)
- The set forestDark + cityTeal + ocean + forestBlue + cityNight recurs in slider-elastic-edges, gallery-expanding-columns, scrollsnap-carousel, drag-carousel, showcase-circular-gallery and, extended with dusk/silk/archGrid/aurora, in filmstrip, random-stack, dual-row-drift, lightbox-flip-zoom and slider-wheel-3d. — [registry/index.json](../../registry/index.json)
- Person photos are used by 14 components: portraitC1 in masonry-filter, table-image-idle, dither-bayer, dither-floyd-steinberg, dither-blue-noise, halftone-dots, halftone-lines, ascii-render, foil-trading-card, micro-holo-badge, skeuo-lanyard-badge, ui-avatar-stack, gallery-testimonials; portraitC2 in dither-blue-noise, ui-avatar-stack, gallery-testimonials; portraitC3 in ascii-portrait-reveal, ui-avatar-stack, gallery-testimonials. — [registry/index.json](../../registry/index.json)
- The registry builder derives `photoCredits` and `fullAssetRefs` from asset use, so a component's credit list changes automatically when the credits file changes. — [tools/build-registry.js](../../tools/build-registry.js)

### Inferences
- By usage weight, abstract imagery is rare: silk + chrome + fluidBlue + smoke + fire make 28 of 338 links (8%). Adding the texture-like sea and embers gives 55 (16%). So about 84–92% of what a visitor sees in photo slots is representational.
- Cool-hued photos make 210 of 338 links (62%).
- Because slots are keyed by asset name, replacing 24 files re-skins all 119 components at once. The repetition also means only about 7 images need to be mutually distinctive "gallery heroes"; the rest are single-use.

### Gaps
- The registry merges thumbnail and full-view references, so I cannot say from it alone which photos appear only in the detail view.

---

## 3. Figma evidence: what does the design file show and what did it intend?

### Takeaway
Implementation ≈ Figma. The Figma file contains exactly one photo library, titled "Photo library v2 — dark editorial (Unsplash)", and the v4 tiles show those same dark editorial photographs (forests, night cities, ocean, portraits, aurora, Milky Way, roses) that Codex shipped. Neither the file nor the written handoff specifies "dark abstract"; the handoff explicitly asks for real photographs and forbids gradients posing as photos. Codex implemented the documented design faithfully; the gap is between the owner's present intent and what was documented and drawn.

### Cited Findings
- The file has 17 pages: 00 Cover (0:1), 01 Audit, 02 Foundations (7:96), 03 Stage Kit, 04/05 Site, 06 Components — Redesigned, 07 Components — New, 08 Agents & MCP, 09–14 Library boards (Interface 36:5, Motion 36:6, Pointer & Physics 36:7, Data & AI 36:8, Visual FX 36:9, Collections 36:10), 15 Extension (36:11), 99 Archive (71:1134). — [Figma file, page list](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=0-1)
- Frame 104:4 is named "Photo library v2 — dark editorial (Unsplash)" and holds 30 rounded rectangles named `photo/<key>` (ids 104:5–104:34). Five are labelled "(retired: too light)": mountains, ridge, archStripes, dunes, ceramics. — [Figma 104:4](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=104-4)
- A live screenshot of 104:4 today is visually identical to the handover contact sheet: rain, smoke, smokeBlue, fire, two retired mountain shots, cityNight, cityTeal, ocean, sea, forestDark, forestBlue, archGrid, archStripes, three portraits, silk, aurora, milkyway, dunes, roses, magnolia, interiorDark, chrome, fluidBlue, ceramics, trails, embers, desk. — [Figma 104:4](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=104-4), [INTRX-handover/previews/11-photo-library-v2.png](../../INTRX-handover/previews/11-photo-library-v2.png)
- The Visual FX board (82:2, 88 tiles) shows about 30 photo tiles, and every one I can identify matches the shipped asset: Hover Distortion = chrome; Particle Dissolve and Blinds Reveal = aurora; Clip Reveal = cityTeal; Hover Zoom Card = forestBlue; Pixelate Reveal and Film Grain = dusk; Ripple Click = sea; Static TV = interiorDark; Slice Fan = milkyway; Infinite Zoom, Shatter and RGB Slices = cityNight; Comparison Slider = forestDark; Duotone and VHS = roses; Magnetic Tiles and Posterize = silk; Painterly Smear = magnolia; Blue-Noise Dissolve = portraitC2; ASCII Portrait = portraitC3; Datamosh = trails; Pixel Sort = embers; Aurora = aurora; Rain on Glass = rain; Frosted Pass = fluidBlue; Satin Foil Card = portraitC1. — [Figma 82:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=82-2)
- Four individual tiles checked against their posters all match: Masonry Filter 113:427 (forestDark, portraitC1, archGrid, ocean), Coverflow 134:1005 (chrome, fluidBlue, silk, magnolia, embers), 3D Wheel 185:1986 (cityTeal, ocean, forestBlue…), Avatar Stack Spread 180:811 (the three portraits). — [Figma 113:427](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=113-427), [Figma 134:1005](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=134-1005), [Figma 185:1986](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=185-1986), [Figma 180:811](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=180-811), [assets/posters](../../assets/posters)
- Inside tiles, photo slots are frames named `photo/<key>` with an overlay frame on top (for example 113:447 `photo/forestDark`, 113:450 `photo/portraitC1`, 113:453 `photo/archGrid`, 113:456 `photo/ocean`). — [Figma 113:427](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=113-427)
- Handoff 3 §2.4 says every component with imagery uses "real photographs from Unsplash" and "Don't use gradients posing as photos, illustrations or slate placeholders"; "Use only the dark editorial set (Figma Photo library v2, 104:4)" with 25 named keys; older keys "map to the closest v2 photo"; subjects should match the component ("people for testimonials and avatars, product shots for commerce, architecture or landscape for galleries"). — [CODEX_HANDOFF_3.md §2.4](../../CODEX_HANDOFF_3.md)
- Handoff 3's frame table calls 104:4 "Photo library v2, dark editorial (the only photo set to use)", and its visual-standard rules in §3 ask for "Real content and dark photography … (Unsplash, v2 dark set only)". The same list sets the material: surfaces `#1C1C1C` on stage `#151515`, 1px `rgba(255,255,255,.07)` borders, one accent. — [CODEX_HANDOFF_3.md](../../CODEX_HANDOFF_3.md)
- The design log records the same rule: "Dark photography only: all light photos swapped out on live pages", and describes tiles referencing photos by key (`'img:<photoKey>'`). — [DESIGN_PROGRESS.md](../../DESIGN_PROGRESS.md)
- Codex recovered each Unsplash original and measured identity against the Figma rasters: the nine first photos matched "with zero perceptual-hash distance (RGB RMS difference 0.00–0.38)"; later ones report RGB RMS 0.39–2.27; rain's download SHA-1 equals the Figma image hash. — [ASSET_ART_DIRECTION.md](../../ASSET_ART_DIRECTION.md)
- Deviations from the written key list: the repo ships `dusk` (not a v2 key) because several v4 tiles show it, documented as following the "owner-authorized v4-tile rule"; the v2 keys `smokeBlue` (104:7) and `desk` (104:34) are not in the repo. — [ASSET_ART_DIRECTION.md](../../ASSET_ART_DIRECTION.md), [assets/photo-credits.json](../../assets/photo-credits.json)
- AGENTS.md binds implementers to the tiles: "Build what the v4 tile in Figma shows; the tile wins over older art and older demos" and "Full compositions also use approved v2 photography." — [AGENTS.md](../../AGENTS.md)

### Inferences
- Classification for every photo checked: "same image as Figma (so the Figma tile itself was not dark abstract)". I found no "wrong image" case and no "right image but brighter" case.
- There is no page in the file with a dark-abstract image set; 99 · Archive holds superseded boards. The only abstract images in the library are smoke, smokeBlue, fire, silk, chrome and fluidBlue (6 of 30 swatches).
- The owner's statement that components "were designed to use dark abstract images, which Codex didn't implement" is not supported by the file or the handoff. A fair framing for the report: the design spec said dark editorial photography, Codex matched it to near-zero pixel error, and the owner has now changed the art direction to dark abstract.
- Since slots are keyed by `photo/<key>` in Figma too, the Figma library could later be re-filled with the new set under the same keys so design and code stay in sync. That is a write to the file and out of scope here.
- If the original Figma rasters were ever needed, they can be exported from nodes 104:5–104:34 (or any `photo/<key>` frame) through Figma's export or image-fill endpoints; Codex already did this and recorded the hashes. This is now moot because the owner is replacing the set.

### Gaps
- I screenshotted one full board and four tiles, per the instruction to keep the Figma check brief. The other boards were not inspected tile by tile; the claim that all tiles match rests on those samples plus Codex's recorded per-photo identity measurements.
- I did not inspect 99 · Archive.

---

## 4. The gap, stated precisely

### Takeaway
There are two different gaps. Against Figma and the handoff there is essentially none. Against the owner's current intent (dark abstract everywhere) the gap is nearly total: about 22 of 24 assets and roughly 85–90% of photo slots by usage need different imagery.

### Cited Findings
- Design-vs-code: sampled tiles and the library frame match the shipped assets one-for-one (section 3). — [Figma 82:2](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=82-2), [assets/posters](../../assets/posters)
- Intent-vs-code, per asset (from the table in section 1): keep-as-is candidates are silk and fire; keep-with-treatment candidates are smoke, embers, trails; everything else is representational, blue-dominant or too bright. — [assets/images](../../assets/images)
- The most-used assets are the least abstract: ocean (42 components), archGrid (34), forestDark (32), cityNight (31), cityTeal (29), forestBlue (28), dusk (23), aurora (20). — [registry/index.json](../../registry/index.json)
- Some demos are semantically tied to a subject: Aurora (ambient curtains over the aurora photo), Rain on Glass (rain photo), Smoke Wisps (smoke), Heat Shimmer (fire), the "EMBER" image-filled type, water ripple demos on sea/ocean, ASCII Portrait Reveal, avatars, testimonials and ID badges on portraits. — [registry/index.json](../../registry/index.json), [AGENTS.md](../../AGENTS.md)
- Full-view copy sometimes names a subject: titles such as "The open water", "Into the blue", "A quieter sky", "Across the night", "After the rain" exist in gallery/layout modules; 111 photo-using modules contain subject words (forest, ocean, city, aurora, rose, portrait, rain…) somewhere in their strings. — [js/demos.galleryext.gallery-apple-cards.js](../../js/demos.galleryext.gallery-apple-cards.js), [js/registry-files.json](../../js/registry-files.json)

### Inferences
- Severity by component group: Galleries & Sliders, Layout & UI photo cards, Scroll galleries and the Extension 3D/scroll grids are the most visible offenders, because they show 5–13 representational, mostly blue photos at once. Single-image effect demos (distortion, ripple, zoom) are lower severity individually but numerous.
- The fix is an art-direction change that must be written down as an owner instruction, because it contradicts three standing rules: "the tile wins", "approved v2 photography", and dozens of AGENTS.md bullets that say to preserve exact photo slots, hashes and credits.

### Gaps
- I did not read each of the 119 components' copy and prompts, so the number that mention a subject in user-visible text (as opposed to code identifiers) is unknown; 111 modules is an upper bound.

---

## 5. How do the photos sit inside components? (poster review)

### Takeaway
On 108 posters reviewed, the photography is consistently dark, so nothing looks broken, but it reads as a moody stock wallpaper pack rather than part of the system: blue/teal forests, cities and ocean dominate, aurora and chrome are the loudest elements on their tiles, and the same five images repeat across the gallery section. The few tiles that use silk, smoke, fire or roses-on-black look native to the neutral Stage.

### Cited Findings
- Posters are 360×264 PNGs, one per component, 520 in total. — [assets/posters](../../assets/posters)
- Gallery posters (slider-elastic-edges, gallery-expanding-columns, scrollsnap-carousel, drag-carousel, slider-wheel-3d, gallery-dual-row-drift, gallery-filmstrip-scrub) all show the forestDark / cityTeal / ocean / forestBlue / cityNight set, in blue-teal tones, against the near-black Stage with light-grey dock pills. — [assets/posters](../../assets/posters)
- Aurora posters (particle-dissolve, image-blinds-reveal, aurora-curtains, menu-image-peek, scroll-clip-morph, scroll-sticky-reveal, css3d-carousel-cylinder, gallery-apple-cards, ui-draggable-cards) put saturated green/purple on tiles whose only UI colour is neutral. — [assets/posters](../../assets/posters)
- Bright outliers on posters: archGrid's white lattice (cursor-inverted-lens, loader-blueprint, masonry-filter), rain-window's bokeh, chrome's blue-white speculars (webgl-distortion, tilt-card, cursor-following-label), interiorDark's windows (webgl-static-tv, scroll-video-scrubber, 3d-container-scroll). — [assets/posters](../../assets/posters)
- Tiles using silk (gallery-coverflow centre, image-magnetic-tiles, posterize-hover, mega-menu-preview), smoke (smoke-wisps), fire (cursor-heat-shimmer) or roses on black (ink-bleed-reveal, vhs-tracking, liquid-mask-reveal) are monochrome or warm on black and sit quietly in the Stage. — [assets/posters](../../assets/posters)
- The repo's own rule for demos is "neutral greys + one accent per demo (no decorative hues)". — [AGENTS.md](../../AGENTS.md)

### Inferences
- The clash is hue and subject, not brightness: on most photo tiles the imagery introduces a second and third hue (teal, green, violet) next to an orange-accent system, which the demos themselves are forbidden to do.
- Recognisable stock tropes (misty forest, neon city from above, aurora, Milky Way, roses) pull attention to the picture instead of the interaction. Abstract matter and light would make the motion the subject.
- Repetition of five images across ten gallery tiles makes the gallery section feel like one demo repeated. A larger, more varied but single-series set fixes this without changing any layout.

### Gaps
- Posters are paused native thumbnails. I did not view full detail views live, where photos are larger and copy overlays them.

---

## 6. Replacement strategy: a human-made dark-abstract set

### Takeaway
Replace the bytes behind all 24 keys with one art-directed series of real, free-licence Unsplash photographs and human-made 3D renders, then normalise them with one treatment recipe. I verified 33 candidates on their Unsplash pages (all "Free to use under the Unsplash License", none Unsplash+); a recommended 24-key mapping is below, with alternates. Two things need an owner decision: whether human-made 3D renders are acceptable, and what goes in the person slots.

### Cited Findings

**Licence**
- The Unsplash License page states images "can be downloaded and used for free" for "Commercial and non-commercial purposes" with "No permission needed"; not permitted: "Images cannot be sold without significant modification" and "This license does not include the right to compile images from Unsplash to replicate a similar or competing service." Attribution is not required. — [Unsplash License](https://unsplash.com/license)
- Unsplash+ is a separate licence tied to a subscription; it prohibits, among other things, "Using Unsplash+ images in digital templates, or for machine learning, AI, or biometric tracking technology" and "Reselling Unsplash+ images 'as-is'". — [Unsplash+ License](https://unsplash.com/plus/license)
- An Unsplash+ photo page shows "Licensed under the Unsplash+ License" and serves from `plus.unsplash.com/premium_photo-…`. — [Unsplash+ example page](https://unsplash.com/photos/a-close-up-of-a-black-satin-fabric-bMI4LiEDN0U)
- Unsplash's submission guidelines: "We currently only accept original photos, 3d renders" and "We do not accept screenshots, in-game captures, composite art or content created by AI generative models." — [Unsplash submission guidelines](https://help.unsplash.com/en/articles/2534415-unsplash-submission-guidelines)
- The repo's builder already enforces free-licence provenance: every credit must have `free`, `license === 'Unsplash License'`, a `https://unsplash.com/photos/` page and an `imageId` matching `^photo-[\d]+-[\da-f]+$`. — [tools/build-registry.js](../../tools/build-registry.js)
- Handoff 3 already says "Exclude Unsplash+ images. They aren't covered by the free licence." — [CODEX_HANDOFF_3.md §2.4](../../CODEX_HANDOFF_3.md)

**Verified candidates.** Every row was opened on Unsplash; licence line on each page reads "Free to use under the Unsplash License". "Evidence" is why I believe it is human-made. Tone and form come from title, alt text and tags only. Orientation is given where the site metadata exposed dimensions.

| # | Candidate (page) | Artist | Medium + evidence | Published | Tone / form (from page text) | Orientation |
|---|---|---|---|---|---|---|
| A1 | [black and white wavy background](https://unsplash.com/photos/a-black-and-white-photo-of-a-wavy-background-7Wjmy3m6Nlo) | Milad Fakurian | 3D render; featured in "3D Renders", caption advertises his 3D commissions; predates mainstream image generators | 19 Oct 2021 | Monochrome graphite waves (sibling of current silk) | ? |
| A2 | [black and brown wavy lines](https://unsplash.com/photos/a-black-and-brown-background-with-wavy-lines-ptR5HNaplGQ) | Milad Fakurian | 3D render ("3D Renders" topic); same artist series | 11 May 2024 | Black with brown/bronze waves | 3840×2160 (16:9) |
| A3 | [black and gold wavy lines](https://unsplash.com/photos/a-black-and-gold-background-with-wavy-lines-Ry10Dtwa-hg) | Milad Fakurian | 3D render ("3D Renders" topic) | 11 May 2024 | Black with gold waves | ? |
| A4 | [dark metallic curved abstract shapes](https://unsplash.com/photos/dark-metallic-curved-abstract-shapes-7W3X1dAuKqg) | Milad Fakurian | 3D render; "3D Renders" topic, tags "render", "digital image" | 14 Nov 2022 | Dark metal, specular curves | 8000×6078 |
| A5 | [stacked black wavy surfaces](https://unsplash.com/photos/black-wavy-surfaces-abstract-composition-0gTTqEaAW3g) | Andrew Kliatskyi | 3D render ("3D Renders" topic, "3d shape" tag) | 26 Apr 2022 | Matte black layered waves | 2160×3840 (portrait) |
| A6 | [curved black architectural fins](https://unsplash.com/photos/curved-black-architectural-fins-jpu0gMXT9to) | Andrew Kliatskyi | 3D render ("3D Renders" topic, "3d geometry" tag) | 26 Nov 2021 | Rhythmic black fins, geometric | 2160×3840 (portrait) |
| A7 | [amber and dark curves on black](https://unsplash.com/photos/amber-and-dark-curves-on-black-Li56AhRlcI8) | Pawel Czerwinski | 3D render (tags "3d render", "render", "digital image"; "3D Renders" topic); no camera | 2 Mar 2024 | Black with amber curves, "negative space" tag | 8400×5600 (3:2) |
| A8 | [dark swirling shapes with bronze accents](https://unsplash.com/photos/dark-swirling-shapes-with-bronze-accents-gftMuFt8vNk) | Philip Oroni | 3D render ("3D Renders" topic; tags "render", "digital image") | 14 Nov 2022 | Black + bronze swirls | 3840×2160 (16:9) |
| A9 | [black and orange abstract with curves](https://unsplash.com/photos/a-black-and-orange-abstract-background-with-curves-qqyUN78RmgI) | Martin Martz | 3D render ("3D Renders" topic, "3d wallpaper" tag) | 4 Jul 2023 | Black + orange curves (tags also mention green/yellow) | 6000×4000 (3:2) |
| A10 | [swirling black and white liquid metal](https://unsplash.com/photos/abstract-swirling-black-and-white-liquid-metal-pattern-Id7zEV8yGhQ) | Logan Voss | 3D render; page states "Swift \| Blender 3D" | 5 Feb 2026 | Monochrome liquid chrome | ? |
| A11 | [glass object with a black background](https://unsplash.com/photos/a-glass-object-with-a-black-background-_BTOMrRpyRA) | Trophim Laptev | 3D render ("3D Renders", "Experimental" topics) | 20 Nov 2023 | Glass cube/gradient on black ("full color" tag: may be colourful) | ? ("vertical wallpaper" tag) |
| A12 | [crystal-like structure, iridescent on black](https://unsplash.com/photos/abstract-crystal-like-structure-with-iridescent-colors-against-black-t87AzqfIg3w) | Rohit Choudhari (current chrome's artist) | 3D render (tags "3d render", "render") | 31 Mar 2025 | Glass prism on black, iridescent (needs desaturation) | ? |
| B1 | [black and white abstract painting](https://unsplash.com/photos/black-and-white-abstract-painting-ahX1sknMGhg) | Pawel Czerwinski | Photograph of acrylic pour; Canon EOS 77D | 21 Mar 2021 | Black with warm yellow/brown paint | ? |
| B2 | [black and brown abstract painting](https://unsplash.com/photos/H9Kp4LIGqqo) | Pawel Czerwinski | Photograph; Canon EOS 77D | 14 Feb 2021 | Grey/black molten fluid | ? |
| B3 | [brown and black abstract painting](https://unsplash.com/photos/EdULlCRj-x0) | Pawel Czerwinski | Photograph; Canon EOS 77D | 15 Nov 2020 | Black with fire-toned paint | ? |
| B4 | [brown and black abstract painting](https://unsplash.com/photos/brown-and-black-abstract-painting-bRwM14s-XcE) | Pawel Czerwinski | Photograph; Canon EOS 77D | 25 Apr 2021 | Dark, orange/flame pour | ? |
| B5 | [orange and black fluid abstract painting](https://unsplash.com/photos/orange-and-black-fluid-abstract-painting-kNx8H8ScHDk) | Pawel Czerwinski | Photograph; Canon EOS 77D | 22 Jun 2019 | Black + orange/red "lava" | 6000×4000 (3:2) |
| B6 | [orange and black fluid art texture](https://unsplash.com/photos/abstract-orange-and-black-fluid-art-texture-gSRCehQLUu0) | Pawel Czerwinski | Photograph; Canon EOS 77D | 24 Apr 2026 | Orange/black cells ("vibrant" tag: may be bright) | ? |
| B7 | [black and white abstract painting](https://unsplash.com/photos/black-and-white-abstract-painting-CL3orMYdm-I) | Pawel Czerwinski | Photograph; Canon EOS 77D | 10 Jan 2021 | Black/white pour (tags include blue, mint, cyan) | ? |
| C1 | [orange and black light streaks](https://unsplash.com/photos/orange-and-black-light-streaks-pIeiJFp59BU) | Marek Piwnicki | Photograph; Canon EOS R6 | 23 Jun 2021 | Orange streaks on black | ? |
| C2 | [orange streaks of light on black](https://unsplash.com/photos/a-group-of-orange-streaks-of-light-on-a-black-background-dqQMZ6Vozvk) | Mariola Grobelska | Photograph; Canon EOS 6D Mark II | 9 Jan 2022 | Orange light streaks on black | ? |
| C3 | [abstract streaks of orange light](https://unsplash.com/photos/abstract-streaks-of-orange-light-on-dark-background-tvFeF_k_9NQ) | Liana S | Photograph; Nikon D600; tags "long exposure" | 2 Feb 2026 | Orange glowing lines, motion blur | ? |
| C4 | [orange light on black background](https://unsplash.com/photos/orange-light-on-black-background-6adJJmewoUg) | Md Mahdi | Light-trail photograph ("Light trail of a spiral"); no camera shown; "Experimental" topic | 12 Jul 2020 | Centred orange spiral on black | ? |
| D1 | [gray smoke](https://unsplash.com/photos/gray-smoke-digital-wallpaper-l9H7FkGjpAE) | Daniele Levis Pelusi | Photograph; Canon EOS 5D Mark II | 19 Sep 2017 | White smoke helix on black | ? |
| D2 | [dark smoke with glowing red embers](https://unsplash.com/photos/abstract-swirls-of-dark-smoke-with-glowing-red-embers-MnRFsBP581U) | Andrey Strizhkov | Photograph; Nikon Z 8; "long exposure" tag | 30 Oct 2025 | Dark haze with red glow | 8256×5504 (3:2) |
| E1 | [black sand](https://unsplash.com/photos/uSM0tpDAF00) | Adrien Olichon | Photograph; Fujifilm X100F | 20 Feb 2019 | Fine black sand ripples | ? |
| E2 | [Black Dune](https://unsplash.com/photos/a-black-and-white-photo-of-a-sand-dune-kz63JaDm9V4) | Jan Folwarczny | Photograph (no camera shown; "Photos" topic) | 18 Apr 2022 | Black dune gradient, minimal | ? |
| E3 | [black fabric with wrinkled texture](https://unsplash.com/photos/black-fabric-with-wrinkled-texture-rDMacl1FDjw) | Klim Musalimov | Photograph; Nikon D5600 | 11 Apr 2021 | Matte black creased cloth | 4000×6000 (portrait) |
| E4 | [wrinkled black plastic and dust](https://unsplash.com/photos/a-piece-of-black-paper-that-has-been-wrinkled-zgA8aaDng5w) | Heather Green | Photograph (no camera shown); described "Black Plastic And Dust Texture" | 23 Oct 2023 | Black sheet with dust specks and fibres | 5304×8000 (portrait) |
| F1 | [grey ceramic woman's face bust](https://unsplash.com/photos/dzYzrbF0HFE) | Ansh Minchekar | Photograph; Canon EOS 1100D | 30 Jun 2019 | Sculpted face, black/grey | ? |
| F2 | [white ceramic man head bust](https://unsplash.com/photos/L2sbcLBJwOc) | Birmingham Museums Trust | Museum archival photograph of a 1760 Rysbrack bust | 10 Feb 2020 | Pale bust on black ("black" tag) | ? |
| F3 | [B/W bust of a man](https://unsplash.com/photos/iqqSqpt4BmA) | Prem Chandaka | Likely a 3D render (tag "blender"); no camera | 7 Oct 2021 | Monochrome bust | ? |
| G1 | [abstract architecture in stark monochrome](https://unsplash.com/photos/abstract-architecture-showcased-in-stark-monochrome-Oskm8uY1Et0) | Victoria Wang | Photograph; Nikon Z 8 | 5 Jun 2025 | Monochrome geometry (tag "white": may be bright) | ? |

Unsplash+ items seen during the search and excluded: [close up of a metal object on black](https://unsplash.com/photos/a-close-up-of-a-metal-object-on-a-black-background-VDBXQUSrD10) (Rick Rothenberg), [black satin fabric](https://unsplash.com/photos/a-close-up-of-a-black-satin-fabric-bMI4LiEDN0U) and [black satin material](https://unsplash.com/photos/a-close-up-of-a-black-satin-material-p5VEDgeb-lo) (Virginia Marinova), [close up of black fabric](https://unsplash.com/photos/a-close-up-of-a-black-fabric-PCXPrYANN2o) (Andrew Petrischev), [cube of glass on black](https://unsplash.com/photos/a-cube-of-glass-on-a-black-background-4eo58OEW4yk), and a Jr Korpa [swirl of light](https://unsplash.com/photos/Y2ccNjDKlm8).

Further free-licence leads surfaced by search but **not** opened individually: Czerwinski [black and red curved design](https://unsplash.com/photos/a-black-and-red-background-with-a-curved-design-DQ2lqx_6RD0) and [black and white wavy lines](https://unsplash.com/photos/a-black-and-white-photo-of-wavy-lines-APJtnTolIMs) (2024); Kliatskyi [curved black parallel lines](https://unsplash.com/photos/curved-black-parallel-lines-pattern-B_Z9jqassqE) and [dark curved ribbons](https://unsplash.com/photos/dark-curved-ribbons-abstract-wallpaper-r4HT6aurLQw); Adrien Olichon [water and sand](https://unsplash.com/photos/a-black-and-white-photo-of-water-and-sand-_GH9LwhlSO4); Annie Spratt [dark textured plaster wall](https://unsplash.com/photos/dark-textured-plaster-wall-6a3nqQ1YwBw); Ryunosuke Kikuno [shiny black background](https://unsplash.com/photos/a-black-background-that-is-very-shiny-v7xw4p7KdFQ); engin akyurt [black ink in water](https://unsplash.com/photos/a-painting-of-black-ink-floating-in-water-kPt9t2yqXiQ) (Canon EOS R5, free licence verified, but ink-in-water shots are often on a light ground).

### Inferences

**Art direction (proposed wording)**
- Name: "INTRX Matter & Light". One series, six families: (A) graphite and bronze 3D forms, (B) pigment pours, (C) light drawn on black, (D) smoke and ember, (E) dark matter textures (sand, cloth, sheet), (F) sculptural busts for person slots, plus one geometric image (G).
- Palette: near-black neutrals (R≈G≈B) carry at least two thirds of the set. Warm images use only amber, bronze and ember hues (roughly 15–40°) at restrained saturation so the UI accent `#FA7319` stays the most saturated thing on the tile. No blue, teal, green or violet dominants.
- Subjects: fluid, glass, chrome and folded forms; light leaks and long-exposure streaks; macro matter. Scale-free compositions with no horizon, so any crop (4:3 card, tall column, 52px square, circle, wide strip) still reads.
- Avoid: recognisable places, people, nature tropes (forest, skyline, aurora, stars, flowers), text or brand marks, rainbow iridescence, pure-white highlights, flat generated gradients, and anything labelled AI.
- Sets: in any group of five shown together, use five different families and at most two warm images, so items are distinguishable by form (wave, streak, cell, grain, fold) rather than by subject.

**Treatment recipe (so mixed sources read as one system)**
- Geometry: crop each to the aspect ratio of the key it replaces (mostly 3:2; keep 1600×651 for embers, 16:9 for chrome, 4:3 for interiorDark, 1600×1371 for silk), export 1600px and 800px WebP at the existing quality level.
- Tone targets, taken from the photos that already sit well (silk 13/45, forestDark 21/52, sea 25/70, fire 13/59): mean luma 15–35 of 255, 95th percentile at or below about 150, no more than about 4% of pixels above 50% luma, true black retained in the deepest shadows.
- Colour: neutralise shadows; desaturate cool casts to grey; grade warm highlights toward amber; keep mean chroma at or below about 25 for neutral images and about 45 for warm ones (embers today is 75).
- Finish: a light monochrome grain and a gentle 8–12% edge vignette baked into the file, so crops never end on a bright edge and smooth renders sit beside photographs.
- Frame: one consistent inner hairline on every photo slot in CSS, using the handoff's existing material border (1px `rgba(255,255,255,.07)`), rather than per-image borders. The Figma tiles already place an overlay frame above each `photo/<key>` frame. The Stage is `#151515` (luma about 21), so images averaging 15–35 sit at or just above the Stage instead of punching through it.
- Record `kind` (photograph or 3d-render) and a one-line treatment note per key in `photo-credits.json`; the file already carries such extra fields.

**Mapping: current key → role → replacement.** Keys are kept as slot IDs so no slot reference in any component changes (17 extension modules embed a copy of the credit record and need that copy refreshed; see section 7). "Uses" is the component count from section 2.

| Current key (uses) | Role the slot plays | Proposed replacement | Alternate | Notes |
|---|---|---|---|---|
| ocean (42) | Primary landscape hero; ripple, liquid-glass and zoom base | B2 grey/black molten pour | A10 liquid metal | Fluid subject suits water demos; neutral because it is the most-seen image |
| archGrid (34) | Hard-edged geometry for lens, fisheye, kaleidoscope, comparison, dither | A6 black architectural fins | G1, A5 | Portrait source: crop to 3:2. Current is the brightest neutral; target much darker |
| forestDark (32) | Calm dark neutral; gallery lead; comparison "before" | E3 wrinkled black cloth | E2 Black Dune | Matte texture, clearly different from silk |
| cityNight (31) | High-detail image for infinite zoom, shatter, RGB slices | A4 dark metallic curves | A12 crystal (desaturated) | Needs detail at several scales and crisp speculars |
| cityTeal (29) | Busy linear energy; nav preview; link preview | C1 orange light streaks | C2, C3 | Warm image 1 of the core five |
| forestBlue (28) | Quiet image under captions; hover-zoom card | E2 Black Dune | A1 | Low detail so overlaid text stays readable |
| dusk (23) | Hero with type overlay ("Beyond"), parallax planes, image-gen reveal | A7 amber curves on black | A8 bronze swirls | Negative space for text; warm image 2 |
| aurora (20) | Luminous image for particle dissolve, blinds, clip-morph circle | C2 orange streaks | C3 | See semantic note for the Aurora ambient demo below |
| silk (15) | Graphite form; menu preview; magnetic tiles | Keep current silk | A1 | Already the reference look |
| sea (15) | Fine uniform texture for ripple, vertex wave, pixel river | E1 black sand | E4 | Fine grain shows distortion well |
| portraitC1 (13) | "Person" in dithers, halftones, ASCII, badges, avatars, testimonials | F1 ceramic face (low-key) | Keep portraitC1, graded | Owner decision; see below |
| embers (12) | Wide warm strip; type fill for "EMBER" | Keep embers, treated darker and less saturated | D2 smoke with embers | Real macro texture, already on-accent; wide 1600×651 crop |
| milkyway (8) | Speckled field for depth tunnel, slice fan | E4 black sheet with dust specks | A5 | Portrait source: crop |
| chrome (8) | Liquid-chrome hero for hover distortion, tilt card, following label | A10 monochrome liquid metal | Keep chrome, desaturated | A10 is a Feb 2026 Blender render: check visually |
| magnolia (7) | Fine organic detail for zoom lens; pigment source for Painterly Smear; album art | B1 black with warm pour | B3 | Actual paint suits the smear demo |
| roses (5) | Centred object on black for duotone, ink/liquid mask reveals, VHS | C4 orange spiral light trail | B5 | Centred figure on pure black |
| fluidBlue (3) | Busy backdrop behind frosted glass; coverflow | B3 fire-toned pour | B4 | Same artist as today, warm instead of blue |
| interiorDark (3) | "Picture on a screen" for video scrubber, static TV, laptop | A2 black and brown waves | A8 | 16:9 source fits a screen; current asset is 4:3 |
| portraitC2 (3) | Second person | F2 museum bust on black | Keep portraitC2 (already B&W low-key) | Owner decision |
| portraitC3 (3) | Third person; ASCII Portrait Reveal | F3 B/W bust (likely a render) | F1 crop variant | Current is blue-lit; replace or grade to mono |
| fire (1) | Heat Shimmer subject | Keep fire | D2 | Already dark, abstract, warm |
| smoke (1) | Smoke Wisps subject | Keep smoke, darkened | D1 | Brightness today: mean 53 |
| trails (1) | Second frame for Datamosh | Keep trails | C3 | Semi-abstract long exposure |
| rain (1) | Rain on Glass subject | Keep rain, darkened and desaturated | — | Only representational exception; the demo is literally rain on a window |

- Role coverage check: landscape heroes (ocean, dusk, cityNight, chrome); portrait/person (three F options); square and circular thumbnails (all E and B textures are scale-free; C4 and the busts are centred); texture/detail crops (E1, E3, E4, B-series); 4–12 image sets (the core five map to five families; the 13-image marquee draws on all six families); distortion/zoom/mask robustness (A4, A10, B2, E1 have detail at multiple scales and no horizon).
- Person slots, flagged: avatars (ui-avatar-stack), testimonials, ID badges (micro-holo-badge, skeuo-lanyard-badge, foil-trading-card) and ASCII Portrait Reveal semantically want a face; dithers, halftones and ascii-render only need a subject with smooth tonal gradation. Three workable options: (1) sculptural busts in low-key monochrome, which keep a "face" without a real person; (2) keep the two darkest real portraits (C1, C2) graded to monochrome and drop the blue C3; (3) for avatar stacks only, switch to initials on neutral discs, which is a UI change rather than imagery. Option 1 is the most consistent with "dark abstract"; option 2 is the least work and keeps Handoff 3's "people for testimonials and avatars".
- Other semantic slots: the Aurora ambient demo would sit over orange light streaks instead of an aurora, so either retitle its copy or give that one demo a neutral luminous image; Rain, Smoke, Heat Shimmer and EMBER keep their literal subjects in the mapping above.
- AI screening: 16 of the 33 verified candidates show camera EXIF on the page (B1–B7, C1–C3, D1, D2, E1, E3, F1, G1), which is the strongest available evidence of a real photograph. The 12 A-family items are human-made digital 3D renders, not photographs: the owner should decide whether renders are acceptable at all (the current set already has two, silk and chrome). If renders are excluded, the B, C, D and E families alone still cover every non-person role. Renders published after mid-2022 (A2, A3, A4, A7, A8, A9, A10, A11, A12) cannot be independently proven AI-free from page text; the supporting evidence is the named 3D artist, the "3D Renders" topic, Unsplash's stated ban on AI content and, for A10, an explicit "Blender 3D" note. A1, A5 and A6 predate mainstream image generators (my background knowledge, not sourced). "Cannot tell" from the page alone: C4, E2, E4 (no camera shown) and F3 (tagged "blender", so probably a render). F2 is an institutional archive photograph with no camera data.
- Licence fit: free-licence Unsplash images may be modified and redistributed inside the product; attribution is optional but the repo already shows "Photo: Name / Unsplash" and should keep doing so. Two things to keep in mind: the repo embeds 800px photos in portable exports, and the licence forbids selling images "without significant modification", which matters if a paid Pro tier ever ships components whose main content is an unmodified photo.
- The owner excluded procedural and AI-generated assets, so those options are not evaluated.

### Gaps
- No candidate was viewed. Brightness, actual hue, composition and crop suitability are unverified; several have warning tags ("vibrant", "full color", "white", blue/mint). Expect to reject some on sight, which is why 33 are listed for 24 slots (5 of which keep their current image).
- Dimensions are known for only 12 candidates. I read them from Unsplash's site JSON for a few lookups; further automated metadata calls were blocked by the permission system, so I stopped. Orientation for the rest must be checked on the page.
- I could not retrieve the verbatim long-form grant sentence of the Unsplash License (the fetch tool would not quote it). That the licence permits modification is my understanding of the text and is implied by the "significant modification" clause; confirm on the licence page.
- Jr Korpa, Simone Hutsch, Codioful and Steve Johnson were named in the brief as possible sources. I found no verified dark, free-licence pieces from them in the time available (the one Jr Korpa hit was Unsplash+); Codioful-style gradient graphics would also sit close to the "generated" line the owner drew.
- Whether dithers and halftones look as good on a ceramic bust as on a human face is untested.

---

## 7. What does a swap cost in this repo?

### Takeaway
The cheapest correct path is a same-key byte swap: keep all 24 keys, file names and per-key aspect ratios, replace 48 files, rewrite `photo-credits.json`, refresh the credit copies embedded in 17 extension modules, then regenerate bundles, registry and 119 posters. The six mandatory phase gates do not pin photo bytes, so they should pass after regeneration. The real cost is the per-category verification estate: 40 fixtures hard-pin the old SHA-256 values and up to about 100–150 of 334 verifier scripts touch photos, an unknown share of which store photo-derived pixel oracles that must be re-baselined or formally retired.

### Cited Findings
- `build-registry.js` reads `assets/photo-credits.json` and throws unless each record is free, Unsplash-licensed, has a photographer, an `unsplash.com/photos/` page and a `photo-…` image id; for each of `tile` (width must be 800) and `full` (width must be 1600) the file must exist under `assets/images/*.webp` and its SHA-256 must equal the recorded value. It then derives `photoCredits`, `fullAssetRefs` and "Photo: Name / Unsplash" notes per component. — [tools/build-registry.js](../../tools/build-registry.js)
- The registry schema fixes `license` to the constant "Unsplash License" and `fullAssetRefs` to `assets/images/*.webp`. — [tools/build-registry.js](../../tools/build-registry.js)
- `build-demo-assets.js` embeds local photos and fonts as base64 into `js/demo-assets.js` (4.39 MB today). — [tools/build-demo-assets.js](../../tools/build-demo-assets.js), [js/demo-assets.js](../../js/demo-assets.js)
- Generated outputs that embed or reference photos: 119 portable files under `r/` contain WebP data URIs; `registry/c`, `registry/index.json` (content-hashed module and bundle URLs), `llms-full.txt` and `js/export-data.js` are regenerated by the builder. AGENTS.md: "Do not hand-edit generated files." — [r](../../r), [registry](../../registry), [AGENTS.md](../../AGENTS.md)
- `build-posters.js` renders native thumbnails in a browser against the local server and accepts `--ids=` and `--initial`; AGENTS.md says to refresh posters after changing compositions and to use `--initial` for certain paused-start demos. — [tools/build-posters.js](../../tools/build-posters.js), [AGENTS.md](../../AGENTS.md)
- The six mandatory phase commands (`verify-registry`, `verify-stage`, `build-registry --check`, `verify-library`, `audit-stage-fit`, `verify-motion`) contain no photo hash or credit checks beyond the builder's own validation. — [tools/verify-registry.js](../../tools/verify-registry.js), [tools/verify-library.js](../../tools/verify-library.js), [AGENTS.md](../../AGENTS.md)
- 40 files under `tools/fixtures/` contain one or more of the 48 current photo SHA-256 values (for example `image-photos-artwork.json`, `image-core-artwork.json`, `raster-portrait-artwork.json`, `gallery-ext/native.json`, `scroll-ext/native.json`, `showcase-final/photo-bindings.json`, `skeuo-media-artwork.json`). — [tools/fixtures](../../tools/fixtures)
- 62 fixture files, 19 `verify-*.js`, 4 `profile-*.js` and 29 files under `tools/verification/` name photo keys directly; 21 fixtures and 10 verifier scripts name photographers. — [tools](../../tools)
- Of 334 `verify-*.js` scripts: 99 mention "photo"; 95 reference `naturalWidth`, `photoCredits`, photographer, Unsplash or `fullAssetRefs`; 93 mention photos together with pixel/digest/RMS terms; about 100 reach a hash-pinning fixture directly or through a helper; the union touching photos in any way is about 151. — [tools](../../tools)
- AGENTS.md describes many of these as photo-specific oracles: "exact photo slots", "original 800/1600px hashes and credit", "photographic sampling pixels", "original photographic pixels", "actual photographic output", "verified free photo provenance", raster/dither/halftone/ASCII model histories computed from portraitC1 and C3. 14 AGENTS.md lines pin photo hashes or exact slots; 98 lines mention photos. — [AGENTS.md](../../AGENTS.md)
- 17 extension source modules embed a copy of the photo-credit record, including file paths, dimensions and SHA-256, inside the module text: cursor-following-label, cursor-zoom-lens, gallery-apple-cards, gallery-bookshelf, gallery-coverflow, gallery-photo-stack, gallery-testimonials, ui-draggable-cards, ui-wobble-card, loader-blueprint, micro-holo-badge, 3d-container-scroll, 3d-marquee-grid, scroll-hero-parallax, scroll-parallax-columns, scroll-sticky-reveal, skeuo-lanyard-badge. Their generated `registry/c` and `r/` files carry the same strings. — [js/demos.cursorext.cursor-following-label.js](../../js/demos.cursorext.cursor-following-label.js), [js](../../js)
- The hashes also appear in 16 `docs/performance` and 1 `docs/accessibility` evidence files and in `ASSET_ART_DIRECTION.md`; `docs/license-credits.md` describes the photo provenance in prose. — [docs](../../docs), [ASSET_ART_DIRECTION.md](../../ASSET_ART_DIRECTION.md)
- Standing rules a swap contradicts: "Build what the v4 tile in Figma shows; the tile wins", "Full compositions also use approved v2 photography", "Refresh each remediated demo's generator prompt to describe its … approved assets", and "Keep earlier private helpers, inputs and evidence frozen". Owner clarifications are recorded in AGENTS.md with dates. — [AGENTS.md](../../AGENTS.md)

### Inferences
- Lowest-effort path, in order:
  1. Record an owner instruction in AGENTS.md that the dark-abstract set supersedes Handoff 3 §2.4 and the "tile wins" rule for photo fills only, and that Figma-identity photo checks are retired.
  2. Keep keys, paths and widths (800/1600 are enforced); keep each key's current aspect ratio so crop geometry in 115 modules is untouched.
  3. Replace the 48 WebP files; update `photo-credits.json` (ids, photographer, page, date, dimensions, both hashes, `kind`, treatment note). No change to `demo-assets.json` is needed for a same-key swap. Refresh the embedded credit copies in the 17 extension modules listed above.
  4. Run `build-demo-assets.js`, then `build-registry.js`, then `build-posters.js` for the 119 photo-using ids (with `--initial` where AGENTS.md says so).
  5. Apply one scripted old-hash → new-hash rewrite across the 40 fixtures; update photographer strings in the 21 fixtures and 10 scripts that name them.
  6. Run the six mandatory gates, then the photo-touching suites, and sort failures into (a) checks that read expectations from `photo-credits.json` or the live file (pass unchanged), (b) stored photo-pixel digests and Figma-identity comparisons (re-capture or retire), (c) crop/slot geometry (should pass if aspect ratios are kept).
  7. Sweep user-visible copy, alt text, accessible names and generator prompts in the photo-using modules for subject words; update `ASSET_ART_DIRECTION.md` and `docs/license-credits.md`; delete the three retired generated images if nothing loads them.
- Rough effort (my estimate, not measured): curation and treatment of 24 images half a day to a day of owner time; file swap, credits, regeneration and posters a few hours; fixture hash remap about an hour if scripted; the long tail is step 6, plausibly several agent-days because roughly 90–100 scripts may hold photo-derived oracles and each suite must be run to find out; step 7 touches up to 111 modules but most edits are one-line.
- Risk points: raster demos (dither, halftone, ASCII, pixel sort, mosaic, datamosh) have models whose stored histories were computed from the current photos' pixels, so they are the most likely to need full re-capture; contrast repairs for text over photos (Rotating Gallery captions, Parallax labels, light Scroll palettes) were tuned against the current images and should be re-checked, though darker, lower-detail images generally make text contrast easier.
- If keys are later renamed to role names (for honesty: `forestDark` would no longer be a forest), that is a mechanical rename across 824 references plus fixtures and should be a separate, second change.

### Gaps
- No verifier was run, so the split between checks that will pass unchanged and checks that need re-baselining is unknown. The counts above come from text matching and are upper bounds on impact, not failure counts.
- I did not check whether any fixture stores the photos themselves (for example data URIs inside "before" definitions) rather than only hashes; if so, those files need regeneration rather than a hash rewrite.
- `tools/fixtures` contains 1,164 files and `tools/verification` 733; I did not determine which are treated as frozen evidence under the repo's rules and therefore may not be edited without an explicit owner instruction.
- Whether the Pro policy or exporter has any photo-specific handling was not examined.
