# Photographic assets and typography

## Handoff 3 — verified Photo library v2

The nine dark editorial images below supply the remediated photo layouts and
navigation previews, including Masonry Filter, Table Image Peek, Caption Pull,
Flip Expand, Inertia Carousel, Blur-Elevate Nav, Image Peek List and Mega Menu.
Each canonical Unsplash page was checked on 15 November 2026: its photographer,
free download and Unsplash License were confirmed. The original image IDs were
recovered through Unsplash visual search against the owner's Figma exports.
Independent 1800px source downloads matched all nine Figma originals with zero
perceptual-hash distance (RGB RMS difference 0.00–0.38 on a 0–255 scale).

| Key | Unsplash image ID | Photographer and canonical photo |
| --- | --- | --- |
| forestDark | photo-1483982258113-b72862e6cff6 | [Rosie Sun](https://unsplash.com/photos/photography-of-forest-1L71sPT5XKc) |
| forestBlue | photo-1630695230041-8909e3204778 | [Taylor Wright](https://unsplash.com/photos/bare-trees-on-forest-during-daytime-2aSpCOPNyO0) |
| ocean | photo-1484387436194-cf7cb70800ce | [Michael Benz](https://unsplash.com/photos/high-angle-photo-of-sea-with-waves-IgWNxx7paz4) |
| cityTeal | photo-1493514789931-586cb221d7a7 | [Andre Benz](https://unsplash.com/photos/aerial-photography-of-city-skyline-during-night-time-cXU6tNxhub0) |
| cityNight | photo-1603793510575-a8cf24361baa | [Polina Kuzovkova](https://unsplash.com/photos/aerial-view-of-city-buildings-during-night-time-zd8v_Ig3ndg) |
| archGrid | photo-1504625709867-b4e45e3bb9dd | [Christophe Laurenceau](https://unsplash.com/photos/architectural-photo-of-building-MPWbGMrZ6eo) |
| portraitC1 | photo-1610659128929-fa69328744e2 | [Carlos Garcia Hansen](https://unsplash.com/photos/woman-with-brown-hair-and-black-eyes-TfjOwcrMj5I) |
| silk | photo-1638376776402-9a4b75fe21bb | [Milad Fakurian](https://unsplash.com/photos/a-black-and-white-abstract-background-with-wavy-lines-JTKKRK05NAM) |
| aurora | photo-1483347756197-71ef80e95f73 | [Vincent Guth](https://unsplash.com/photos/silhouette-of-trees-near-aurora-borealis-at-night-62V7ntlKgL8) |

All nine use the [Unsplash License](https://unsplash.com/license), separate
from the implementation's MIT licence; none is an Unsplash+ image. Files are
self-hosted as `assets/images/<key>.webp` (1600px wide) and `<key>-800.webp`
(800px wide), downloaded with `w=1600&q=80&fm=webp` and
`w=800&q=80&fm=webp`. Natural image aspect ratios are preserved; native frames
apply `object-fit: cover`. The v2 `silk` key is Milad Fakurian's original
3D render, categorized as 3D Renders on its source page. Its provenance records
`kind: "3d-render"`; Aurora records `kind: "photograph"`. Both retain the exact
approved v2 imagery. Source screenshots remain QA material.

`assets/photo-credits.json` records canonical photo IDs, photographer profiles,
licences, dimensions and SHA-256 checksums for both files. The registry builder
validates provenance and checksums and derives per-demo credits from asset use.
Detail Notes show "Photo: Name / Unsplash" linked to the photo page. Detail
previews resolve the local 1600px variants before creating image elements;
thumbnails and portable source use only the 800px variants. Portable HTML
retains the photo credit, source URL and licence URL in comments, and embeds the
800px WebP data for offline use. Hidden table rows and hero-only cards defer
photo creation through inert templates.

The supplied `layout2-carousel-pointer.svg` is used byte-for-byte at its
original 28.5×29.25px intrinsic size in the Figma 185:1646 thumbnail.

## Earlier generated photographs (being replaced)

The September 6 refinement replaces weak procedural landscapes with three original photographic assets. These are generated photographs, not photographs of documented locations. The built-in image-generation tool produced each image separately; the original PNGs remain in `assets/images`, alongside optimized WebP versions used by the demos.

| Asset | Direction | Used for |
|---|---|---|
| [Coastal stack](assets/images/coastal-stack.webp) | Natural diffuse light, authentic stratified stone, quiet gray-blue sea | Aperture reveals, photographic galleries, image effects |
| [Limestone pavilion](assets/images/limestone-pavilion.webp) | Architectural proportions, tactile stone, broad directional shadows | Tilt card, hover previews, gallery artwork |
| [Atlantic shore](assets/images/atlantic-shore.webp) | Fine irregular foam, subdued blue-gray water, organic diagonal composition | Timeline camera study, trails, image effects |

The 038 timeline is a deterministic photographic camera study. Its 24-second timeline pans and pushes through the ocean image; it is not a decoded video file. Scroll, range input, chapter markers, timecode and reset use the same current-time state.

`{{asset:coastal-stack}}`, `{{asset:limestone-pavilion}}` and `{{asset:atlantic-shore}}` are resolved into embedded image data for live previews and copied HTML. The exported component includes its artwork and can render offline. Run `node tools/build-demo-assets.js` after changing an optimized image or font to rebuild the portable asset bundle.

## Typography

[Inter](https://fonts.google.com/specimen/Inter) is the primary interface and numeric family, with weights 400–500, normal tracking and tabular numerals. This includes counters, timecodes, measurements and controls. [Newsreader](https://fonts.google.com/specimen/Newsreader) is reserved for selected editorial compositions. Monospaced type remains appropriate for actual code and ASCII output. Earlier Manrope assets are retained for compatibility with existing examples.

Variable fonts are hosted locally in `assets/fonts`. The web subsets cover Latin text and punctuation; system fallbacks handle other scripts. Components embed their selected font faces in copied HTML. Original sources and licenses are retained: [Inter license](assets/fonts/Inter-OFL.txt), [Manrope license](assets/fonts/Manrope-OFL.txt), [Newsreader license](assets/fonts/Newsreader-OFL.txt). Sources: [Google Fonts Inter repository](https://github.com/google/fonts/tree/main/ofl/inter), [Google Fonts Manrope repository](https://github.com/google/fonts/tree/main/ofl/manrope), [Google Fonts Newsreader repository](https://github.com/google/fonts/tree/main/ofl/newsreader).

## Generation prompts

### Coastal stack

Use case: photorealistic-natural. Asset type: premium editorial landscape photograph for a professional interactive web component, landscape aspect ratio 3:2. Photograph an immense quiet Nordic coastal rock formation with striated pale limestone cliffs descending into deep muted blue-gray water. A finely detailed monumental sea stack is centered, smaller cliffs recede into atmospheric haze, low horizon with broad soft overcast sky. Natural diffuse daylight, subdued cinematic neutral tones, beautiful authentic rock texture, real water reflections and subtle ripples. Sophisticated travel architecture magazine art direction, photographed on medium-format, crisp but soft tonal transitions and no HDR. The lower left water is calm and dark enough for optional overlay type; DO NOT put any text in the image. Realistic photographic scene, not a vector illustration, not a painted mountain icon, not 3D plastic. No sunrise orange cast, no oversaturated teal, no people, no logos, no border or watermark. Compose to crop successfully both square and wide.

### Limestone pavilion

Use case: photorealistic-natural. Asset type: luxury architecture editorial photography for a refined web interaction component. Landscape 3:2 image of a minimal contemporary limestone pavilion on a rocky Mediterranean coast. Long tactile pale travertine walls, one deep rectangular doorway, a single slender column, restrained stepped terrace and broad horizontal roof, no furniture or people. Strong but natural late afternoon side light creates large clean shadows on the warm gray stone; a narrow distant sea horizon gives scale. Architectural Digest quality photographed architecture, 50mm architectural lens with corrected verticals, natural grain and honest stone pores. A composed editorial study of proportion, light and negative space. Restrained cream, warm gray, muted ocean blue, charcoal shadows. No orange sunset filter, no exaggerated curves, no glowing edges, no plasticky 3D, no text, no borders, no watermarks. Main architectural mass centered, good square crop, quietly sophisticated.

### Atlantic shore

Use case: photorealistic-natural. Asset type: premium cinematic ocean photography for a scroll-driven film study in a professional interaction library. Wide horizontal 3:2 photograph, high oblique aerial view of long natural rolling Atlantic swells breaking in layers along a black sand shoreline. Dark blue-gray water with restrained muted jade undertones, delicate detailed white sea foam, wet charcoal volcanic sand, no visible horizon. Organic sweeping wave diagonals flow from upper left to lower right. An elegant abstract composition grounded in authentic photographed ocean physics and rich fine texture. Gentle overcast light with a little directional silver sheen, natural exposure, editorial art direction, no artificial glow, no neon teal, no HDR, no illustrated curves or blobs, no text, people, buildings, boats, logos or watermark. Sophisticated quiet cinematic mood, realistic fine irregular froth, broad tonal range without harsh contrast.

## Handoff 3 shell fonts

Geist and Geist Mono are self-hosted variable WOFF2 fonts from
[vercel/geist-font](https://github.com/vercel/geist-font), revision
`ef2597cfc42f4797676df105517ccc0a1cfa6569`. Their SIL Open Font License 1.1
is included at `assets/fonts/Geist-OFL.txt`. Geist is used by the shell;
Geist Mono is used for code, counters and metadata. Demo-specific Inter,
Manrope and Newsreader files remain available during the staged migration.

For browser UI text, `inter-latin-variable.woff2` is an unmodified vendor Latin
file from the same Inter revision (`4.001;git-66647c0bb`) as the existing face.
The original face remains the fallback for other supported characters, and
portable exports retain it. The 73KB Latin file replaces a 158KB transfer on
Latin-only detail views. All fonts are served locally. Source, licence and
checksum are in `assets/fonts/inter-latin-provenance.json`; 1,296 shared glyph
instances, vertical metrics and 30 browser word/kerning measurements matched.

## Handoff 3 v4 control artwork

The SVGs in `assets/components/` are the original static assets supplied by the
owner's [Interaction Figma file](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction).
Their paths and intrinsic dimensions are preserved. They are used by native
HTML/CSS interactions; no Figma screenshot is used as implementation artwork.
Git preserves the original SVG bytes across Windows and Unix checkouts so the
portable bundle remains reproducible.

| Asset | Figma tile | Intrinsic size |
| --- | --- | --- |
| beam-deploy.svg | 149:1552 · Border Beam | 16×16 |
| beam-highlight.svg | 149:1552 · Border Beam | 121×1 |
| beam-glow.svg | 149:1552 · Border Beam | 76×32 |
| toast-status.svg | 157:1753 · Toast Stack | 8×8 |
| success-check.svg | 149:1615 · Success Morph | 16×16 |
| checkbox-check.svg | 149:1668 · Checkbox Draw | 14×14 |
| copy-check.svg | 149:2008 · Copy Feedback | 14×14 |
| hop-arrow.svg | 149:1594 · Icon Hop | 16×16 |
| ripple-wave.svg | 149:1723 · Ripple | 80×80 |
| swap-pointer.svg | 149:1986 · Text Slide Swap | 28.5×29.25 |
| like-dot.svg | 149:1742 · Like Burst | 3×3 |
| like-heart.svg | 149:1742 · Like Burst | 24×24 |
| badge-bell.svg | 149:1769 · Badge Pop | 20×20 |
| theme-sun.svg | 149:1694 · Theme Switch | 16×16 |
| theme-moon.svg | 149:1694 · Theme Switch | 16×16 |
| theme-auto.svg | 149:1694 · Theme Switch | 16×16 |
| tooltip-save.svg | 110:1297 · Spring Tooltip | 16×16 |
| tooltip-copy.svg | 110:1297 · Spring Tooltip | 16×16 |
| tooltip-star.svg | 110:1297 · Spring Tooltip | 16×16 |
| tooltip-delete.svg | 110:1297 · Spring Tooltip | 16×16 |
| polish-arrow.svg | 110:1355 · Polish Stages | 16×16 |
| confetti-dot-accent.svg | 149:1637 · Confetti Burst | 5×5 |
| confetti-dot-muted.svg | 149:1637 · Confetti Burst | 5×5 |
| confetti-dot-light.svg | 149:1637 · Confetti Burst | 5×5 |
| confetti-ray-1.svg | 149:1637 · Confetti Burst | 8.93146×8.19132 |
| confetti-ray-2.svg | 149:1637 · Confetti Burst | 5.56774×10.6358 |
| confetti-ray-3.svg | 149:1637 · Confetti Burst | 1.5×11.5 |
| confetti-ray-4.svg | 149:1637 · Confetti Burst | 5.56774×10.6358 |
| confetti-ray-5.svg | 149:1637 · Confetti Burst | 8.93146×8.19132 |
| confetti-check.svg | 149:1637 · Confetti Burst | 16×16 |
| form-error-icon.svg | 149:1834 · Error Shake | 16×16 |
| form-counter-art.svg | 149:1857 · Character Counter | 220×52 |
| form-password-eye.svg | 149:1908 · Password Strength | 16×16 |
| form-textarea-send.svg | 149:1935 · Auto-grow Textarea | 16×16 |
| form-step-check.svg | 149:1960 · Multi-step Form | 12×12 |
| form-step-current.svg | 149:1960 · Multi-step Form | 20×20 |
| form-step-dot.svg | 149:1960 · Multi-step Form | 8×8 |
| form-step-empty.svg | 149:1960 · Multi-step Form | 20×20 |
| form-select-chevron.svg | 149:2048 · Morphing Select | 16×16 |
| form-select-limited.svg | 149:2048 · Morphing Select | 8×8 |

Text Slide Swap reuses `hop-arrow.svg`: its downloaded arrow is byte-for-byte
identical. Confetti's live canvas draws the original sprite images without
resizing them; the thumbnail preserves every supplied fan layer and stroke
overhang at its reference position.

The selector's healthy status dot is byte-for-byte identical to
`toast-status.svg`; the `form-select-healthy` asset name reuses that original
8×8 file. The character counter uses the complete, unmodified 220×52 reference
asset only for its static thumbnail. Its editable form preserves the earlier
native character-limit and circular-progress interaction; no paths are extracted
from the supplied SVG. Password rule checks reuse the original 14×14
`checkbox-check.svg`. Form artwork retains its intrinsic dimensions in previews
and offline exports.

`assets/demo-assets.json` maps portable asset names to local files. The registry
exposes the referenced paths for lightweight previews and content-hashed bundle
URLs for source export. `tools/build-demo-assets.js` embeds the same original
files and local fonts into `js/demo-assets.js` for portable HTML. Update the
manifest, regenerate the asset bundle, then regenerate the registry after edits.

## Handoff 3 v4 layout artwork

The following unmodified SVGs come from the same owner-supplied Interaction
Figma file. They keep their root dimensions and original layer slots in native
previews and portable HTML. No reference screenshot is used as artwork.

| Asset | Figma tile | Intrinsic size |
| --- | --- | --- |
| layout-radial-image.svg | 157:1658 | 16x16 |
| layout-radial-mic.svg | 157:1658 | 16x16 |
| layout-radial-file.svg | 157:1658 | 16x16 |
| layout-radial-link.svg | 157:1658 | 16x16 |
| layout-radial-calendar.svg | 157:1658 | 16x16 |
| layout-radial-upload.svg | 157:1658 | 16x16 |
| layout-radial-plus.svg | 157:1658 | 20x20 |
| layout-command-search.svg | 157:1722 | 16x16 |
| layout-scrub-move.svg | 157:1774 | 16x16 |
| layout-context-share.svg | 157:1796 | 16x16 |
| layout-context-copy.svg | 157:1796 | 16x16 |
| layout-context-delete.svg | 157:1796 | 16x16 |
| layout-context-pointer.svg | 157:1796 | 28.5x29.25 |
| layout-glow-glow-1.svg | 157:1854 | 114x116 |
| layout-glow-glow-2.svg | 157:1854 | 114x116 |
| layout-glow-glow-3.svg | 157:1854 | 114x116 |
| layout-glow-glow-4.svg | 157:1854 | 114x116 |
| layout-glow-highlight.svg | 157:1854 | 111x1 |
| layout-reorder-grip.svg | 157:1880 | 16x16 |
| layout-reorder-grip-active.svg | 157:1880 | 16x16 |
| layout-bento-card.svg | 157:1934 | 132x90 |
| layout-bento-pointer.svg | 157:1934 | 28.5x29.25 |
| layout-swap-arrow.svg | 157:1963 | 16x16 |

The fifth glow layer repeats `layout-glow-glow-4.svg` exactly as in Figma.
Reorder retains the three normal-grip slots, the active grip and the overlapping
bottom-row layer in the static lifted pose. The first Bento card remains the
complete supplied SVG; its live pointer lighting overlays the original artwork.
Context Menu and Bento each retain their own original pointer file. Asset hashes
are compared before reuse; these downloads have distinct original bytes.

The bundled Inter Latin and complete faces contain neither U+2318 (Command)
nor U+232B (Backspace). Those two keyboard symbols use the same system fallback
directly; adjacent K/D letters remain Inter. This avoids an unnecessary 158KB
complete-font download for glyphs it does not contain. No font files are edited.

## Handoff 3 v4 inspector and desktop artwork

These original SVGs are downloaded from the owner-supplied Interaction file.
Their bytes, intrinsic dimensions and layer positions are retained in the
native heroes and portable exports. Reference screenshots remain QA material.

| Asset | Figma tile | Intrinsic size |
| --- | --- | --- |
| layout2-collapse-chevron-down.svg | 184:1538 | 14x14 |
| layout2-collapse-chevron-right.svg | 184:1538 | 14x14 |
| layout2-popover-arrow.svg | 184:1571 | 12x6 |
| layout2-spotlight-ring.svg | 184:1660 | 100x100 |
| layout2-mac-silhouette.svg | 184:1806 | 153x127 |
| layout2-mac-dot.svg | 184:1806 | 6x6 |
| layout2-dock-indicator.svg | 186:1779 | 4x4 |
| layout2-accordion-chevron-down.svg | 184:1703 | 14x14 |
| layout2-modal-bell.svg | 184:1734 | 14x14 |
| layout2-marquee-rows.svg | 185:2046 | 372x90 |

The Accordion right-chevron download is byte-identical to the inspector's
right-chevron. Its portable `layout2-accordion-chevron-right` name reuses that
unmodified file. All three original window-dot slots are retained; only the
center dot is an interactive Minimize control. The silhouette keeps its half
pixel stroke overhang. The marquee repeats the complete two-row artwork and
clips row windows; no paths or individual marks are extracted or redrawn.
The fitted compositions compensate for the shell's 4px optical raise; their
standard 372x264 asset positions match Figma. The bleed marquee uses the stage
origin directly. The focused verifier checks both original dimensions and slots.

That control group bundled 78 portable images: 75 original SVG references (73 physical
files, including the earlier aliases) and the three existing generated photos.
No uncredited photo from the new Figma set is published with this control group.

## Handoff 3 v4 navigation artwork

The following original SVGs are downloaded from the owner's Interaction file.
Their bytes and intrinsic dimensions are preserved in the native previews and
portable exports. The circular surface is clipped by its native 200×150px
window while keeping its complete 220×220px image element and source position.

| Asset | Figma tile | Intrinsic size |
| --- | --- | --- |
| nav-fullscreen-close.svg | 156:1572 | 16×16 |
| nav-circle-surface.svg | 156:1615 | 220×220 |
| nav-circle-close.svg | 156:1615 | 16×16 |
| nav-blur-bar.svg | 156:1639 | 200×40 |
| nav-hide-bar.svg | 156:1665 | 200×40 |
| nav-rail-home.svg | 156:1760 | 16×16 |
| nav-rail-search.svg | 156:1760 | 16×16 |
| nav-rail-folder.svg | 156:1760 | 16×16 |
| nav-burger-open.svg | 156:1792 | 68×68 |

The fourth sidebar icon is byte-identical to `theme-auto.svg`; its
`nav-rail-settings` portable name reuses that original file. The burger artwork
contains the 44×44px button and its shadow overhang; the complete 68×68px asset
remains at the Figma slot. Closed-state strokes are native interactive HTML.
The navigation group bundled 98 image references and the same six embedded font faces.


## Handoff 3 v4 loaders and progress artwork

All fourteen SVG files below are original exports from the owner's Interaction
file. Their source bytes, intrinsic dimensions and callsite geometry are kept.
The wave reuses each outer and middle dot twice; all eight orbit assets retain
their distinct neutral opacity ramp. Supplied SVGs are never extracted or
redrawn. Full liquid and upload progress remain data-driven original SVG
models; their compact reference states use the supplied artwork.

| Asset | Figma tile | Intrinsic size |
| --- | --- | --- |
| load-liquid-fill.svg | 111:791 | 110×77.775 |
| load-upload-track.svg | 156:1922 | 64×64 |
| load-upload-arc.svg | 156:1922 | 53.9055×64 |
| load-wave-outer.svg | 157:1548 | 8×8 |
| load-wave-mid.svg | 157:1548 | 8×8 |
| load-wave-core.svg | 157:1548 | 8×8 |
| load-orbit-0.svg | 157:1587 | 7×7 |
| load-orbit-1.svg | 157:1587 | 7×7 |
| load-orbit-2.svg | 157:1587 | 7×7 |
| load-orbit-3.svg | 157:1587 | 7×7 |
| load-orbit-4.svg | 157:1587 | 7×7 |
| load-orbit-5.svg | 157:1587 | 7×7 |
| load-orbit-6.svg | 157:1587 | 7×7 |
| load-orbit-7.svg | 157:1587 | 7×7 |

Native borders in Liquid Progress, Terminal Install and Skeleton Reveal are
included in child positions, as confirmed against the Figma frame metadata.
The liquid SVG is at stage (131,62.2); its sampled solid colour is the existing
#FA7319 accent. A separate region extends that fill below the unchanged surface
as the target rises. Skeleton Reveal uses the existing verified archGrid image
for its resolved article, with both resolutions and the recorded photographer
credit. No new photograph or remote runtime asset is introduced in this group.
The loader group bundled 112 image references and the same six font faces.


## Handoff 3 v4 data artwork

These sixteen SVGs are unmodified original exports from the owner's Interaction
file. All seventeen visible image elements retain their original asset identity
and measured slots, including both empty donut layers. Floating-point dimensions
are set to the source dimensions to prevent replaced-element ratio rounding.

| Asset | Figma tile | Intrinsic size |
| --- | --- | --- |
| data-donut-track.svg | 166:457 | 104×104 |
| data-donut-right.svg | 166:457 | 52×89.9064 |
| data-donut-empty.svg | 166:457 | 32×32 |
| data-donut-lower.svg | 166:457 | 74.4699×30.5669 |
| data-donut-left.svg | 166:457 | 21.1795×55.2866 |
| data-radar-inner.svg | 166:572 | 44×44 |
| data-radar-middle.svg | 166:572 | 88×88 |
| data-radar-outer.svg | 166:572 | 132×132 |
| data-radar-sector.svg | 166:572 | 45.1801×66 |
| data-radar-ray.svg | 166:572 | 1.2×67.2 |
| data-radar-near.svg | 166:572 | 6×6 |
| data-radar-left.svg | 166:572 | 5×5 |
| data-radar-right.svg | 166:572 | 5×5 |
| data-spark-line.svg | 166:1345 | 221.6×39.4002 |
| data-spark-cross.svg | 166:1345 | 1×127 |
| data-spark-dot.svg | 166:1345 | 14×14 |

The two empty donut layers export as transparent 32×32 SVGs. The original
files are retained at their source origins in the 104×104 layer slots; their
Figma child screenshots contain no painted content. No replacement arc is drawn.
The remaining supplied donut segments, radar rings/beam/blips and sparkline
artwork retain their complete shapes and native dimensions.

The green radar accent and green/red price feedback match their v4 references.
Price colours convey the sign of an illustrative change. Full previews preserve
the original datasets; the compact market labels and illustrative sparkline
reference are separate from those original data models. Scrubbing exposes the
actual monthly-data line instead of claiming its values belong to the static
price illustration. The bundle now contains 128 image references and the same
six font faces; every preceding image payload and font face is unchanged.


## Handoff 3 v4 terrain and city artwork

Twelve unmodified SVG exports from the owner’s Interaction file supply all
31 visible image instances: four terrain layers and nine city blocks with three
faces each. `tools/fixtures/maps-artwork.json` records every design child, slot,
intrinsic dimension and original SHA-256 hash. `tools/verify-maps.js` checks the
local bytes and measured geometry in standard and compact stages.

| Assets | Figma tile | Intrinsic dimensions |
| --- | --- | --- |
| maps-topo-extrude-layer-0.svg | 166:596 | 201×101 |
| maps-topo-extrude-layer-1.svg | 166:596 | 157×79 |
| maps-topo-extrude-layer-2.svg | 166:596 | 113×57 |
| maps-topo-extrude-layer-3.svg | 166:596 | 69×35 |
| maps-city-tiles-layer-0.svg | 166:616 | 57×29 |
| maps-city-tiles-layer-1.svg | 166:616 | 28×24 |
| maps-city-tiles-layer-2.svg | 166:616 | 28×24 |
| maps-city-tiles-layer-3.svg | 166:616 | 28×32 |
| maps-city-tiles-layer-4.svg | 166:616 | 28×32 |
| maps-city-tiles-layer-5.svg | 166:616 | 57×29 |
| maps-city-tiles-layer-6.svg | 166:616 | 28×44 |
| maps-city-tiles-layer-7.svg | 166:616 | 28×44 |

The static previews are original image layers, with native intrinsic sizes.
Interactive lifts, seeded offsets and replay fades act on their wrappers.
Full mode retains the native field and polygon algorithms. No photo, screenshot
or replacement vector is introduced. The portable bundle now contains 140 image
references and the same six font faces; all 128 preceding image payloads and
font faces remain unchanged.
