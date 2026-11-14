# Photographic assets and typography

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
