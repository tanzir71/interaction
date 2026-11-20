# Photographic assets and typography

## Rain Window — approved v2 source, verified 20 November 2026

The `rain` key is [Max van den Oetelaar's airport-window photograph](https://unsplash.com/photos/a-window-with-rain-drops-on-it-at-night-1e60bqR1Ar0),
Unsplash photo `1e60bqR1Ar0`, image `photo-1643287146701-93c795880dda`.
The primary photo page confirms the free [Unsplash License](https://unsplash.com/license).
An independent 1800px JPEG download at quality 82 has SHA-1
`fa352e5af6719470756f08abc782f77edfc68f0e`, identical to the original
Figma image hash at library node `104:5` and Rain tile image `170:1383`.
Its SHA-256 is `c1e47c0e7abffe18581eed2f01f6f4614cf3bc012109fa7bcde3a71aaca548ac`.

Self-hosted quality-85 WebP variants preserve the source aspect ratio:
`assets/images/rain.webp` is 1600×1067px, SHA-256
`4d8a4be98e1511d34eb32f368ccc6c6af589f65b6110b6bd4f24aa5baf2c929c`;
`assets/images/rain-800.webp` is 800×533px, SHA-256
`0f025d78016b0d5810a15e20e6b4868eff41e0aede10e3bfcfd660968ee8740e`.
`photo-rain` resolves to the 800px file for thumbnails and portable exports;
full detail resolves to 1600px. Native geometry is the supplied 200×150px
centered cover crop with a 14px radius. Full Rain replaces its retired generated
background while retaining the original drop solver and “After / rain” copy.

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

## Photographic distortion, ripples, curl noise and fisheye

Hover Distortion, Ripple Click, Pixel River and Fisheye Lens follow v4 nodes
`168:1672`, `168:1039`, `168:1061` and `168:1175`. Twenty-eight supplied SVG
payloads retain their exact bytes and intrinsic sizes: one 80px lens, three
elliptical ripple rings and twenty-four distinct fisheye dots. All 117 dot
slots reuse an exact size, rotation and style match from the supplied exports;
no circle or path is redrawn. Pixel River retains all ninety-eight authored
rounded bars. All 225 native nodes retain their fractional coordinates.

The two 200×150px native photographs use the already verified Chrome and Sea
files. Independent identity checks against the exported Figma originals yield
RGB RMS 0.62 and 1.25. Sea is selected by content identity: Figma's returned
name `sea2` does not refer to the separate Ocean photograph. Full compositions
reuse Chrome, Sea and Architectural Grid. Previews load the 1600px source in
full view and 800px in native view; portable exports embed the 800px file.

Both native procedural fields become actual shader textures, retaining the
supplied SVG dots and original primitive bars. Independent reference renders
match every uploaded texture byte in both themes. Source coordinates are read
from the original style attributes to avoid CSSOM's six-significant-digit
rounding. The lens retains its supplied 2.5px exported backdrop blur.
`tools/fixtures/image-gpu-artwork.json` records every asset hash and native
slot. Portable assets now contain 504 aliases, the same seven font faces and
eighteen unchanged photo credits. This phase introduces no new photography.

## Broadcast static, displaced waves, fanned photographs and recursive frames

Static TV, Vertex Wave, Slice Fan and Infinite Zoom follow v4 nodes `168:1308`,
`168:1366`, `168:1390` and `168:1416`. Four supplied vector payloads retain
their exact bytes and stroke-inclusive sizes: 221×3.4, 221×7.6, 221×11 and
221×12.8px. The eight native wave slots reuse them in mirrored order. They
become the actual native mesh texture when the preview starts moving.

All 69 native nodes retain their supplied geometry. TV has the 200×150px
Interior Dark photograph, its outline and all 39 scanlines. Slice Fan has five
38px strips with one shared 200×150px Milkyway panorama and the exact crop
offsets; the complete full composition retains eight original slats. Infinite
Zoom has the 200×150px City Night photograph and both nested frames at
100×74px and 50×36px, including their individual outlines and radii.

The three photographs already have approved local files and provenance.
Independent identity comparisons against the Figma exports yield RGB RMS
0.56, 0.63 and 1.45 respectively. Full Vertex Wave uses the approved Sea photo.
Native previews and portable exports use 800px files; full previews use 1600px
files. Only the active camera decodes its sources. Screenshots remain reference
evidence and are never used as tile art. `tools/fixtures/image-fields-artwork.json`
records the exact geometry, photo matches and vector hashes. The portable
bundle has 508 image aliases, seven font faces and eighteen photo credits.

## Image comparison, drifting scenes, duotone windows and louvers

Comparison Slider, Ken Burns Crossfade, Duotone Sweep and Blinds Reveal follow
v4 nodes `168:1441`, `168:1465`, `168:1488` and `168:1511`. The two supplied
SVGs retain their exact bytes and intrinsic dimensions: the 16×16px move icon
inside Comparison's 24px circular handle, and the 200×150px luminance mask for
Duotone. The latter contains the complete white field and its black 100px
window at 40/25, centred at 90/75. CSS uses the original mask as luminance;
the circle is never redrawn as substitute tile art.

The four native photo identities are the already credited Forest Dark,
Forest Blue, Roses and Aurora files. Independent comparisons against Figma's
source exports yield RGB RMS 1.05, 1.35, 0.67 and 1.43. All native card frames
remain 200×150px. Comparison keeps the supplied .55 black left treatment and
2px divider. Ken Burns keeps its 220×165px photograph at −10/−6, centred
radial vignette and three supplied indicators. Duotone keeps the functional
82% purple tint outside its source mask. Blinds retains all six partial
strips on their 25px pitch, including the two .01px source slivers.

Full compositions use the approved Dusk, Architectural Grid and Sea photos.
Ken Burns retains all three original names and captions. Comparison and
Duotone retain their original photographic filter pipelines; full Blinds keeps
all ten original rotating louvers. Native and portable sources are 800px;
full previews use 1600px. Only the active camera decodes its sources.
`tools/fixtures/image-photos-artwork.json` binds the supplied geometry, file
hashes and photo identities. Portable assets now have 510 aliases, with the
same seven font faces and eighteen photo-credit records.

## Mirrored fields, photographic shards, magnetic fragments and particle type

Kaleidoscope, Shatter, Magnetic Tiles and Hologram Wordmark use v4 nodes
`171:1345`, `171:1420`, `168:1536` and `172:795`. All 27 unique supplied SVGs
retain their original file bytes, intrinsic dimensions and individual slots.
Kaleidoscope uses all eight wedge assets, sixteen dot placements, its 144px
outline and 10px orange pivot. Full preserves the original twelve-sector
photographic fragment shader and complete equivalent Canvas fallback.

Shatter keeps its 200×150px City Night photograph and all ten crack assets;
its moving triangles carry the actual clipped photograph and those assets.
Magnetic Tiles keeps twelve 44px Silk fragments on the 46px source pitch,
each clipping its exact 184×138px photograph plane. The two raised center
fragments keep their supplied positions, shadows and highlight. Independent
source-photo comparisons give RGB RMS 1.45 for City Night and 0.39 for Silk.

The native INTRX wordmark is Geist 600 at 58px with −2.83% tracking in its
162×75px reference frame. Its gradient, six supplied 2px marker placements
and 120px rule remain intact. Live particles reform this same native glyph.
Full keeps every original Inter-raster particle and operational scan/glitch
timeline. Full photographic cameras use the credited Architectural Grid
source at 1600px; native and portable cameras use 800px files. Only the
selected camera decodes its sources. The portable bundle has 537 aliases,
seven font faces and the same eighteen photo credits. Exact native geometry,
source identities and SVG hashes live in `tools/fixtures/image-assemblies-artwork.json`.

## Neural routes and photographic pigment

Neural Signals and Painterly Smear use v4 tiles `168:1607` and `168:1652`.
All sixteen distinct SVG payloads retain their original bytes and root
dimensions. The network has twenty connection slots and nine 12px neuron
slots, including the exact orange route and three selected nodes. The full
composition retains all nineteen original neurons and seventy-eight weighted
directed connections. Its native three-layer graph uses counts 3/4/2.

The Figma `magnolia` key is [Annie Spratt's Moody Hellebores](https://unsplash.com/photos/purple-petaled-flowers-J4gm_1GKfAA),
image `photo-1518343161123-c7e9ab4dc4da`. The canonical page confirmed a free
download under the Unsplash License on 18 November 2026; it is not Unsplash+.
The independently downloaded 1800px original matches the Figma upload with
RGB RMS 0.42 on the 0–255 scale. The key remains `magnolia` to match the design
library; provenance records the photographer's actual title.

Self-hosted 1600px and 800px WebP files preserve the original aspect ratio.
Native paint retains the 200×150px crop, 14px mask, inside rim, exact shadows
and supplied 218.005×66px blurred pigment stroke. Its negative horizontal
offset is clipped by the photo frame. SVG image elements explicitly retain
their supplied dimensions to avoid browser intrinsic-size rounding. Full
previews use the credited 1600px photo; thumbnails and exports use 800px.

The complete original procedural painting remains an interactive source
beside the photograph. Both sources use the actual sampled brush and original
drying model. `tools/fixtures/image-final-artwork.json` binds all thirty-three
native slots and photo identities. The portable bundle now has 554 aliases,
nineteen photo credits and the same seven font faces.

## Halftone Field: approved missing-circle reconstruction

The owner explicitly answered “Recreate from the captured exact geometry” on
18 November 2026 after the Figma MCP quota stopped the remaining circle exports
for tile `169:1551`, stage `169:1563`. This exception covers only the 61 missing
circle files. It does not authorize replacing the 145 available unique SVGs or
approximating other Figma artwork.

All 210 slots retain their captured positions and dimensions in the 240×168px
native plane, at stage offset 66/24px in the 372×264px reference. The 61 new SVGs
use the captured circle radius, center and `#F1F1F1` fill; their root dimensions
and viewBox equal the recorded floating-point dimensions. The 145 available
SVGs retain their exact bytes and intrinsic root dimensions. SVG image slots
avoid HTML intrinsic-size rounding for subpixel exports. The artwork fixture
records every slot, source kind, file hash and the captured geometry hash.

The native pressure field expands those circles and returns to the authored
reference every six seconds. Full retains its complete original 15-degree,
9px photographic print screen, pressure model, copy and readout. It uses the
already credited portraitC1 photograph: 1600px in detail and 800px in exports.
The portable bundle now contains 823 aliases, seven font faces and twenty
photo credits. No Figma screenshot is used as product artwork.

The default dark stage preserves the exact white reference. Light stages apply
a black ink filter to the complete native artwork and use dark labels, while
retaining every SVG file, alpha value and slot. The full photographic print and
its functional pressure accent stay intact.

## Sound instruments

UI Sound Kit, Typing Mechanical, Theremin Pad, Notification Chime Stack,
Drum Grid Sequencer and Scroll Pitch Drone follow v4 tiles `170:1388`,
`170:1417`, `170:1443`, `170:1465`, `170:1490` and `170:1539`. All 58 supplied
SVG files retain their original bytes and intrinsic painted bounds. Each
native plane is 240×168px at (66,20) in the 372×264px reference stage.
`tools/fixtures/sound-artwork.json` records every original payload and slot.

Kit retains four 58px pads and the highlighted bell's 82px shadow export.
Typing retains four 32px caps, their 56px shadow exports and the 140×3px rail.
Its exact 164×59px painted union has a documented sparse-fill exception.
The Theremin keeps its 160×148px rounded field, center axes and 12px orange
marker with its 36px glow. Pointer input spans the complete original pitch
and gain ranges; the moving artwork stays 9px inside the rounded corners.
Chime retains both supplied back cards, the 200×48px front material, bell,
rule and three level bars. Drums retains all 32 supplied 20px cells at 24px
pitch and the 24×104px third-column still. Live alpha/color transfer changes
the painted states without modifying the SVGs.

Drone retains its exact sine SVG, 3×100px rail and 3×34px thumb. The native
scroll camera starts and resets at 85px to preserve the reference checkpoint.
Its full composition replaces the retired generated photograph with the
already credited Sea source: 1600px in detail and 800px in portable exports.
Existing photo/font files, provenance and portable asset aliases are unchanged.
No Figma screenshot is used as product artwork.

## Skeuomorph controls

Soft Focus Switch, Desk Rocker and Satin Fader follow tiles `170:1558`,
`170:1584` and `170:1635`. Their 240×168px native planes sit at (66,20) in the
372×264px reference stage. `tools/fixtures/skeuo-controls-artwork.json` binds
all nine unchanged SVG payloads, exact slots, parent materials and palette.
Figma Dock groups belong to the shared shell and are excluded from demo art.

Focus keeps three 44×44px keys at (116,82), (168,82) and (220,82), with their
original 16px transport icons. Their logical union is 148×44px and captured
shadow union 172×68px. Rocker keeps its 60×84px housing at (156,62), two
48×36px plates and original 8px pilot at (182,160), including its 24px glow.
The tight I/O SVG roots remain 2×11px and 10×11px at their original fractional
paint origins. Both sparse controls have written fill exceptions; no other
fit gate is exempt. RGB transfer changes live state without editing source
paths or alpha.

Fader keeps its 200×6px track at (86,100), 120×6px fill and 32×38px thumb at
(190,84). The complete thumb shadow export remains 56×62px at (178,80),
including all three grooves. Full views retain their complete original
400×480px compositions. Existing photos, fonts, provenance and portable
asset aliases are unchanged. Reference PNG samples are verification data;
no Figma screenshot is product artwork.

## Skeuomorph paper, glass and clock

Paper Plans, Frosted Pass and Dot Matrix Clock follow tiles `170:1657`,
`170:1686` and `170:1708`. Their native planes are 240×168px at (66,20) in
the 372×264px stage. The artwork manifest binds two unchanged 10px check SVGs,
the original 120×90px glass highlight, exact parent materials and the separate
verification-only outlined clock. The live clock uses local Geist Mono at
40px/52px, regular weight, with the original orange ink and 10px glow.
Reference PNGs supply verification samples only.

Paper retains three 150×128px sheets at (96,28), (104,36) and (112,44).
Its 14px checks and 80/64/72×7px rules retain the supplied positions. Glass
retains its 200×150px photo at (86,28), 120×90px pane at (126,58) and 60×7px
caption at (140,116). Captured Figma blur radius 14 was compared with actual
CSS compositor output: blur(7px) gives mean squared channel error 6.02 in the
measured pane, versus 38.46 for blur(14px). This result applies to this
composition; the two renderers are not claimed byte-identical. The clock
retains its 180×72px clipped housing at (96,66) and authored 12:45 still.

The missing approved `fluidBlue` photograph was matched to Pawel Czerwinski's
[blue and black abstract painting](https://unsplash.com/photos/blue-and-black-abstract-painting-prMn9KINLtI),
photo `prMn9KINLtI`, image `photo-1597773150796-e5c14ebecbf5`. On 20 November
2026 the primary Unsplash result confirmed free use under the Unsplash License;
the direct photo page returned 429. Image identity was independently checked
against Figma's original 1800×1200px JPEG, SHA-256
`732b16028d3d82f02bbc7fe0e3ddb99c915e2c276728137722bf376e2fad50b9`.
The matching 1800px JPEG variant has 64px comparison MSE 0.0912.

The self-hosted 1600×1067px `fluidBlue.webp` SHA-256 is
`090bb1cfca4b51cac9c8c62266d0828857fada390d8ca7ccadc4b0d35e0f763c`;
the 800×533px `fluidBlue-800.webp` SHA-256 is
`bbdb8b8eee327466eff0a811860fcc9a4aeae4b04077a14d26764ab5f29fc240`.
The portable alias uses the 800px file. Detail attribution includes the
photographer and original page. Existing 23 photo-credit records and aliases
are unchanged; the new record brings the total to 24.

Full Paper replaces retired generated photographs with the approved Sea,
Forest Dark and Dusk sources. Full Glass uses Sea. Complete original copy and
interaction models remain, with 1600px detail paths and 800px portable assets.
Original generated buffers are isolated in regression fixtures and never
included in product output. Only `showcase-circular-gallery` still uses the
retired runtime keys.

### Needle Meter, Macro Keys and Tape Transport

The instruments batch preserves twenty original SVG payloads from tiles
`170:1775`, `170:1807` and `170:1835`: thirteen meter ticks, needle and hub,
plus four tape circles and the original housing/shadow composite. They live in
`assets/components/skeuo-instruments/`; the artwork manifest records payload
hashes, original render bounds and captured native material data. The six macro
caps and their inset faces use twelve exact CSS primitives. The invisible meter
scaffold has no painted export. No screenshot is used as product artwork, and
no new photograph, font, photo credit or asset alias is introduced. SVG image
width and height repeat the supplied root dimensions to preserve intrinsic
geometry under CSS zoom. Figma PNG antialiasing differences remain measurements
rather than byte identity claims. The original full compositions stay complete.

### Listening Dial, Split-Flap Timer and Embossed Key

The tactile batch preserves fourteen original SVG exports from tiles
`171:2103`, `170:1726` and `170:1754`. Dial uses all eleven supplied tick
vectors, the 68px circle's 92px shadow export and the 6px orange indicator.
Its authored indicator is at 27 degrees; numeric motion keeps the original
260-degree law. Original path data and default SVG attributes remain intact;
live stroke styles select the source state's 0.7/0.18 opacity and neutral
gray on the optional light stage.

Timer keeps four 38×56px cards at (106,70), (148,70), (202,70) and (244,70),
with 32px Geist Semibold on a 42px line and the original center seams. Its
four outlined glyph exports are verification-only. Persistent live drums
start at the authored 12:45 without changing original Reset or restart.

Key retains the 120×48px face at (126,78), 124×52px outline at (124,76),
supplied 18px green check and 13.5px Inter Medium label. Its undocked root
reserves 240×216px, keeping the upper native composition at the same stage
origin (66,20). Full compositions retain complete original content and
behavior; full optical sizing accounts for the press scale.
The native label retains 13.5px at the reference size and uses an optical floor
to stay above 11px through press in 286×196px landing cards. Its control geometry
stays fixed.

The original exports live in `assets/components/skeuo-tactile/`, with outlined
timer references under `tools/fixtures/skeuo-tactile-reference/`. The artwork
manifest records every payload hash and captured geometry. Three low-fill
exceptions preserve these sparse authored controls; other fit gates remain.
Tick geometry and computed stroke styles are exact checks; independent
translucent-SVG raster coverage records bounded antialiasing differences,
rather than claiming identical pixels. Posters come from paused native
browser renders. This batch adds no photograph, font, credit or alias.


### Mechanical Counter, Pocket Lighter and Tear-Off Note

Tiles 170:1858,170:1898 and 171:2158 retain 4 unchanged original product SVGs in
`assets/components/skeuo-mechanisms/` and 12 unchanged outlined glyph references
in`tools/fixtures/skeuo-mechanisms-reference/`. The artwork manifest binds
all original payload hashes, exact render bounds and native slots/materials.
The dynamic counter uses bundled Geist 600 with captured proportional metrics;
its four 38×80 frames and the paper’s four ink bars use captured CSS geometry.
No Figma screenshot is product artwork. The lighter’s source 52×70 body,
52×4 highlight and 26.50585×56 flame retain their original shadow/glow roots
and written sparse-fill exception. Native planes stay 240×168 at origin 66,20.
Full compositions retain all original content and interaction models. Note’s
full 400×560 presentation keeps its complete copy readable. No photography,
font, attribution or portable-alias changes occur in this batch.
