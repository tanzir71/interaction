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

## V2 sea provenance

The v2 `sea` photograph is Clayton Tonna's [Deep Blue Sea](https://unsplash.com/photos/shallow-focus-photo-of-body-of-water-qINZ8zEYErY),
image `photo-1578664865136-74b450f31cd9`. Its canonical page was checked on
17 November 2026 and confirms a free download under the Unsplash License.
The 1600px and 800px self-hosted WebP files preserve its natural aspect ratio;
both dimensions and SHA-256 hashes are recorded in `assets/photo-credits.json`.
An independent 1800×1200 source JPEG matches the Figma PNG with RGB RMS 1.34
on a 0–255 scale. The 1600px WebP has an RGB RMS difference of 4.63 after
resizing, consistent with the smaller, compressed delivery variant.
Image Trail uses this distinct water photograph for its complete composition.

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

## Handoff 3 v4 globe, route, sites and isoline artwork

The remaining four maps use 48 supplied SVG exports in 270 visible instances.
One site dot is byte-identical to the globe endpoint, so it reuses that existing
portable key; 47 unique files are added. The complete six-map manifest records
301 instances, their original child IDs, exact slots, native dimensions and
SHA-256 hashes in `tools/fixtures/maps-artwork.json`.

| Preview | Figma tile | Original image instances |
| --- | --- | --- |
| Globe Arcs | 166:659 | 165 globe dots, one arc and two endpoints |
| Route Draw | 166:843 | Eleven grid lines, one route and two endpoints |
| Site Pings | 166:873 | 77 grid dots and three ring/dot pairs |
| Isolines | 166:972 | Five ellipse contours |

Images retain their original bytes and explicit native width and height. Motion
acts on wrappers, masks and opacity. New destinations and pulse instances are
interactive states; the static Figma illustrations do not replace the complete
geographic, graph, site or scalar-field models in full mode. No screenshot is
used as tile art. The portable bundle contains 187 image references and the
same six font faces; all 140 preceding image payloads and fonts are unchanged.

## Handoff 3 v4 agent pipeline, graph and reasoning artwork

Twelve original SVG exports supply fourteen visible compact instances across
the deploy pipeline, workflow graph and thinking drawer. Three exports reuse
byte-identical existing assets; nine unique files are added. Streaming text is
native typography. `tools/fixtures/agents-artwork.json` records each design
child, portable key, file, native size, exact slot and original SHA-256 hash.

| Preview | Figma tile | Original visible image instances |
| --- | --- | --- |
| Agent Deploy Pipeline | 166:297 | Two checks, spinner track/arc and pending ring |
| Agent Workflow Graph | 166:324 | Two connectors, packet and three node icons |
| Thinking Drawer | 166:372 | Spinner track/arc and disclosure chevron |
| Agent Streaming Text | 166:354 | Native Inter text; no image substitute |

Artwork remains unmodified, with explicit intrinsic dimensions. Inset strokes
on compact controls avoid CSS zoom border rounding moving the icons. The full
pipeline also uses the original check image, revealed by a primitive clip;
no SVG paths are extracted or redrawn. Green completion and orange active state
are functional status signals present in the v4 reference. Other paint is
neutral. Full graph geometry and streaming/disclosure contents remain native.

The portable bundle has 196 image references and the same six font faces.
All preceding 187 image payloads and fonts are unchanged. Three documented
fill-only exceptions preserve the exact sparse rail, graph and two-line text
geometry; text, overflow and horizontal-scroll gates remain in force.

## Agent review, knowledge and memory

The remaining four v4 agent tiles use sixteen original SVG exports across twenty
visible instances: diff 166:399 (two 14px decision icons), orbit 166:428 (six
connectors, six 14px concepts and the native 52px center/shadow), compaction
166:1294 (16px arrow and layers) and context meter 188:273 (three 6px source
dots). One exact-byte match reuses an existing asset; fifteen unique files are
added. Native root dimensions and original bytes are unchanged. The artwork
fixture records each node, portable key, position, dimensions and SHA-256.

The portable bundle now has 211 images and the same six font faces; all earlier
196 payloads remain exact. Diff red and green are functional removal/addition
signals from the source. Other paint is neutral with orange for active state.
The meter preserves its sparse 180×51 Figma geometry through a documented
fill-only exception. Overflow, horizontal scroll and 11px text gates apply.

## FUI status, target, scope and spectrum

The first four v4 instrument previews are status 166:993, target lock 166:1022,
oscilloscope 166:1045 and spectrum scan 166:1069. Six original SVG exports
supply six visible instances: four 13.6×13.6 target corners, the 8×8 center dot
and the 224×150 scope frame/trace/shadow. Five unique files are added; the dot
reuses the byte-identical `load-wave-core` asset. `tools/fixtures/fui-artwork.json`
records each node, key, exact slot, root dimensions and SHA-256. No paths are
extracted or redrawn. Status tracks and the 21 spectrum bars remain primitives.

The scope's default hero preserves the native export; deliberate tuning displays
the real three-harmonic trace and Reset restores the export. Full mode retains
the complete instrument. The portable bundle has 216 image references and the
same six fonts; all preceding 211 image payloads remain exact. Target lock keeps
its sparse 140.8×76.8 reference composition through a fill-only exception. All
42 exceptions validate without changing overflow, scroll or typography gates.

## FUI packet lanes, biometric gate and hex inspector

V4 packet lanes 166:1127 and hex inspector 166:1200 use native primitives and
type. The lanes preserve four rows of eight 12×4 dashes, their 24px pitch and
the second row's reference emphasis. Hex uses the exact 200×110 card, four
offsets, 24 byte labels and the 20×17 orange selection. Short compact stages
show four readable byte columns; the standard stage retains all six reference
columns. Full mode retains sixteen bytes per row and the original ASCII twins.

Biometric gate 166:1179 adds three original exports: two 71×71 ring layers and
the 24×24 check. Their original bytes, root dimensions and exact slots are in
`tools/fixtures/fui-artwork.json`. Wrappers carry the scan mask and check motion;
the SVGs are unmodified. The 93×100 ring/check/label composition has a fill-only
reference exception. The portable bundle has 219 images with the same six
fonts, and all preceding 216 image payloads remain exact. No screenshots are
used as demo artwork.

## FUI trading, orbital tracking and boot output

Trading desk 166:1246 retains the native 144×104 price-frame export at (74,28),
with native book bars and tape rails alongside it. Orbital tracker 166:1273
retains its 180×60 orbit, 64×64 planet/shadow and 8×8 satellite exports at their
reference slots. The satellite reuses the byte-identical `form-step-dot` asset.
All four instances keep original root dimensions and payload bytes; three
unique exports bring the portable bundle to 222 images with six unchanged fonts.
All preceding 219 image payloads remain exact.

Boot sequence 166:1366 uses native primitives: a 220×112 terminal, three
11.5px command lines and a 192×3 rail with 128px representative progress. Its
short compact layout increases line spacing to retain 11px rendered type.
Separate full models retain all original market, orbital and device data.

## Gallery sequences and photo decks

The v4 Fraction Slider (185:1709), Clip Transition (185:1737), Stack Deck
(185:1760) and Parallax Slides (185:1781) use the verified cityNight, forestBlue,
forestDark, ocean and archGrid sources. Native frames apply the exact reference
crops; full views use the 1600px variants and portable previews use 800px files.
Their earlier source payloads and provenance records remain unchanged.

The clip tile explicitly retains the dusk image at 185:1753: John Towner's
[Red highlands](https://unsplash.com/photos/aerial-photo-of-brown-moutains-JgOeRuGD_Y4),
image ID `photo-1477346611705-65d1883cee1e`. Its canonical page was verified on
15 November 2026 as a free Unsplash License photograph. An independent 1200px
source download matches the Figma raster with zero RGB difference. This exact
slot follows the owner's v4-tile rule; the general v2 mapping still governs
other legacy photo keys. Both self-hosted variants and their dimensions/hashes
are recorded in `assets/photo-credits.json`; detail and exports retain credit.

Four unmodified SVG exports supply the 72×72 clip ring, 28.5×29.25 pointer and
two 14×14 parallax arrows. Their bytes, dimensions, nodes and native slots are
recorded in `tools/fixtures/gallery-artwork.json`. Photo crops are native image
elements; interrupted reveals retain the painted image layers and parallax
uses a canvas only for its initial reference-to-live transition. The portable
bundle has 227 images and the same six font faces. No screenshot is tile art.

## Remaining gallery compositions

The other nine v4 gallery tiles use the existing verified forestDark, cityTeal,
ocean, forestBlue, cityNight, dusk and silk photographs. Every repeated Figma
raster is byte-identical across these tiles. Comparisons with the retained local
1600px sources have RGB RMS below 3.2 after equal-size resampling; the difference
comes from delivery encoding/resizing. Full wheel project content also reuses
the already verified archGrid and aurora files. No photograph or provenance
record is replaced.

The exact dusk slots in filmstrip 185:1823/1844, print pile 185:1894, drift
185:1936 and lightbox 185:1978 follow the same owner-authorized v4-tile rule as
clip 185:1753. General legacy-key mapping continues elsewhere.

Eight unchanged exports supply four honeycomb shapes (including the 77×85
central shadow plane), two print backers (164.4×151 and 161.2×147.4), and two
6×6 snap dots. `tools/fixtures/gallery-artwork.json` records every original
root dimension, file hash, node and design slot, including repeated instances.
Wrappers position and animate these exports; their payloads and root dimensions
remain intact. The portable bundle contains 235 images and six unchanged fonts.

## Scroll depth and pinned compositions

Parallax Layers, Horizontal Scroll and Scroll Zoom reuse the verified dusk,
cityNight, aurora and ocean files in their exact v4 photo slots. Horizontal
Scroll also uses the native embers crop from Figma node `159:654`.

The embers photograph is Alican Leblebici's free Unsplash License image
[`5w2hjEJ06b0`](https://unsplash.com/photos/glowing-hot-embers-and-coals-in-a-fire-5w2hjEJ06b0),
image ID `photo-1762202742459-4fcdc4beaab4`. The canonical page and free licence
were verified on 16 November 2026. An independent 1800×732 source download
matches the native Figma raster with RGB RMS 1.47, attributable to JPEG encoding.
The local 1600×651 and 800×325 WebP files, source URL and both hashes are recorded
in `assets/photo-credits.json`; detail and portable HTML retain attribution.
All ten earlier photo records and image payloads remain unchanged.

`tools/fixtures/scroll-core-geometry.json` records every native primitive and
photo slot for these six Scroll compositions, captured directly from Figma
before implementation. Photo wrappers and masks are original HTML/CSS. No
screenshot or substitute image is tile art, and no new SVG payload is needed.
The portable bundle now contains 236 images and the same six font faces.

## Scroll narratives

Text Highlight, Image Sequence, SVG Draw, Rotating Gallery and Split Screen use
their exact v4 native layers, recorded in `tools/fixtures/scroll-narrative-geometry.json`.
The four `scroll-route-*` SVG exports are copied unchanged; their original
222×54, 110×206 and 10×10 roots and SHA-256 hashes are recorded independently in
`tools/fixtures/scroll-narrative-artwork.json`. The grey curve's negative inset
is preserved. Reveal masks and the mirrored live second half are original CSS;
the exported SVG payloads are neither extracted nor redrawn.

The sequence retains every original polygon, projection, bolt and grid vertex.
Approved Dusk photography is affinely mapped to its horizontal faces. Its
compact filmstrip uses five native Dusk crops; the orbit keeps the five exact
Embers, Silk, Aurora, Ocean and CityTeal slots. Full views retain seven projects
and four split chapters using approved local photographs. All 236 earlier image
payloads, six font faces and eleven photo-credit records remain unchanged. The
portable bundle now has 240 image aliases, including the four route exports.

## Direction, rings, depth and theme

Crossing Marquees and Letter Scatter use original live typography. The former
retains all three full bands; its native camera uses the exact two Geist bands
and edge fades. The latter retains all nine full glyph paths while its seven
native SCATTER glyphs follow the v4 positions and opacity values.

Counter-Rotating Rings uses the four unchanged SVG exports for all 36 outer
dots, 24 inner dots, 40px core and 16px arrow. Theme Shift uses the complete
204×148 SVG export at its original negative inset around a 180×124 frame.
Its internal gradient, sun, glow and lower band remain in that original asset.
Separate neutral opacity layers express dawn and night around the unchanged
warm checkpoint; the SVG payload and intrinsic dimensions stay intact.
No SVG paths are extracted, inlined or redrawn. Root dimensions, hashes and
source callsites are recorded in `tools/fixtures/scroll-effects-artwork.json`;
native layer geometry is in `scroll-effects-geometry.json`.

Depth Tunnel uses Dns Dgn's free Unsplash License photograph
[`9wH624ALFQA`](https://unsplash.com/photos/milky-way-on-mountains-9wH624ALFQA),
image ID `photo-1515705576963-95cad62945b6`. The primary page and licence were
verified on 16 November 2026. An independent 1800×1200 primary download matches
the native Figma raster at RGB RMS 2.27, consistent with JPEG encoding. Local
1600×1067 and 800×533 WebP derivatives, attribution and both SHA-256 hashes are
recorded in `assets/photo-credits.json`. The exact 80×50 native photo crop is
preserved; the full tunnel retains all nine original exponential frame models.

All 240 earlier image payloads, six font faces and eleven earlier photo-credit
records remain unchanged. The portable bundle now has 246 image aliases and
twelve photo-credit records.

## Thermal cursor photograph

Heat Shimmer uses the exact v2 fire image, David McCumskay's
[`JKAKwrATVq8`](https://unsplash.com/photos/brown-smoke-on-black-background-JKAKwrATVq8),
image ID `photo-1530374195309-8c25022c4753`. The primary photo and photographer
pages confirmed its free Unsplash License on 17 November 2026. A separate
1800×1200 primary download matches the Figma raster at RGB RMS 0.53. The local
1600×1067 and 800×533 WebP files, provenance and both hashes are recorded in
`assets/photo-credits.json`; portable `photo-fire` resolves to the 800px file.
The native 200×150 crop and supplied 100×100 circular optical overlay remain
intact. Its Figma background blur radius of 6 maps to a 3px CSS backdrop blur.

The final four Cursor previews add five unchanged supplied SVG files and reuse
the exact existing pull pointer. The 1×165 and 293×1 HUD lines, 201×129 pull-card
artwork and 44×44 lamp retain their root sizes. The pull surface deforms the
unchanged supplied card texture and both native bars through its original eight
nodes, with GPU and Canvas renderers. All fourteen previous photo-credit records
remain unchanged; the portable bundle now has 376 image aliases, seven font
faces and fifteen photo credits.

## Ink, plume and liquid photography

Ink Bleed and Liquid Mask use the exact v2 roses photograph by
[Alessio Soggetti](https://unsplash.com/photos/red-roses-flower-arrangement-KQBsTXCvGwM),
photo ID `KQBsTXCvGwM`, image ID `photo-1516565349308-c76fe36a115c`.
Smoke Wisps uses [Pascal Meier's White smoke](https://unsplash.com/photos/white-smoke-1uVCTVSn-2o),
photo ID `1uVCTVSn-2o`, image ID `photo-1556388275-bb5585725aca`.
Both primary photo pages confirm the free Unsplash License, verified on
17 November 2026. Independent 1800px primary downloads match their Figma
rasters at RGB RMS 0.64 and 0.70 respectively. The source photographs retain
their complete native crops; no generated substitute or screenshot is tile art.

Local Roses derivatives are 1600×1068 and 800×534; Smoke derivatives are
1600×1067 and 800×533. Their identities, attribution, licence, dimensions and
both SHA-256 hashes are in `assets/photo-credits.json`. Portable `photo-roses`
and `photo-smoke` names resolve to the 800px files. Liquid Image reuses Clayton
Tonna's already verified v2 Sea image. The full ink composition preserves its
original archive and coastal copy over Sea; the full liquid mask keeps two
distinct photographic views, Sea and Roses, and all original reveal states.

The remaining Liquid previews add fifteen unchanged supplied SVGs: two
200×150 masks, five bubble body/highlight pairs and three photographic ripple
rings. All eight Bubble Pop slots reuse the correct pair at its intrinsic
size; no SVG paths are extracted or redrawn. The portable bundle now has 432
image aliases, the same seven font faces and eighteen photo-credit records.

## Play keys, rays, fractures and soft objects

The eight Play previews follow v4 nodes `164:877`, `164:896`, `164:936`,
`164:969`, `164:992`, `164:1012`, `164:1033` and `164:1055`. Thirty-six SVG
bindings retain the supplied bytes and intrinsic sizes: six key arrows,
seventeen firework rays/center, six cracks, four pet body/face layers, two
window layers and the snake food. Thirty-five files are new; the food reuses
an existing byte-identical local asset. Fractional stroke/shadow bounds remain
explicit CSS image dimensions. No SVG paths are extracted or redrawn.

Native primitive geometry remains exact: the 220×150px bounce arena and
68×26px badge; eight 32×32px caps with 4px gaps; the 160×110px fracture slab;
the 60px pet and 84/108/132px rings; the 180×150px gravity page and four child
frames; the 166×112px window body inside its 191×137px shadow export; and all
eighty 16px snake cells on an 18px pitch. Konami's 284×32px row retains the
owner-approved sparse-fill exception against the 372×264px Figma stage.

Per-asset node IDs, root/render bounds, callsites and SHA-256 hashes are in
`tools/fixtures/play-native-artwork.json`. The portable bundle now has 468
image aliases, the same seven font faces and eighteen unchanged photo-credit
records. This phase adds no photography or site dependencies.

## Image reveals, particle dust and focused photographs

Particle Dissolve, Clip Reveal, Hover Zoom Card, Pixelate Reveal and Focus Grid
follow v4 nodes `168:807`, `168:922`, `168:942`, `168:961` and `168:1005`.
Eight supplied SVG exports retain their exact bytes and intrinsic square sizes
6, 5.3, 4.6, 3.9, 3.2, 2.5, 1.8 and 1.1px. Their ninety-six native instances
keep all eight columns and twelve rows, the supplied mint fills and opacity.
Fractional CSS dimensions prevent HTML width attributes from truncating them.

The ten native photo slots reuse the verified Aurora, City Teal, Forest Blue,
Dusk, Embers, Silk, Ocean and Roses files. Full compositions also reuse Sea
and Architectural Grid for the original project and field-study content.
Independent matches against the freshly exported Figma JPEGs have thumbnail
RGB RMS 0.39–1.41; hashes bind those comparisons to the unchanged local
photographs. No new photo, photographer, licence record or font is introduced.
Figma raw-image arrays are resolved by content identity rather than their
returned order.

Native image dimensions and crops remain exact: the 120×150px Aurora mask over
a 200×150px photograph; 140×98px City inset; the 240×178px Forest crop at
−20/−14 inside its 200×150px card; the 200×150px Dusk photo with all twenty-four
25px checker cells and its 1px divider; and all six 52px Focus Grid photographs.
The native stills use real local photographs and original vector exports;
Figma screenshots are reference evidence only. The portable bundle now has
476 image aliases, the same seven font faces and eighteen photo-credit records.
