# Interactive Showcase — source notes

The September 2026 expansion adds **16 original, dependency-free studies** based on the supplied reference list. These are vanilla HTML/CSS/JavaScript interpretations of interaction ideas, not copies of the React libraries or claims of equivalent WebGL implementations. Every entry includes a live preview, a standalone HTML document, an implementation prompt, and its reference link.

| New pattern | Reference | Implementation |
|---|---|---|
| Inertial Dot Field | [React Bits: Dot Grid](https://reactbits.dev/backgrounds/dot-grid) | Canvas dots, damped springs, radial click impulse |
| Reactive Threads | [React Bits: Threads](https://reactbits.dev/backgrounds/threads) | Continuous line field with a local falloff |
| Tactile Ballpit | [React Bits: Ballpit](https://reactbits.dev/backgrounds/ballpit) | 2D spheres with gravity and pairwise collisions |
| Ripple Grid | [React Bits: Ripple Grid](https://reactbits.dev/backgrounds/ripple-grid) | Canvas lattice displaced by radial waves |
| Magnetic Line Field | [React Bits: Magnet Lines](https://reactbits.dev/animations/magnet-lines) | Needles oriented toward pointer position |
| Fading Pixel Trail | [React Bits: Pixel Trail](https://reactbits.dev/animations/pixel-trail) | Quantized stamps with independent decay |
| Elastic Ribbons | [React Bits: Ribbons](https://reactbits.dev/animations/ribbons) | Five chains with different damping rates |
| Contour Mesh Surface | [Paper Shaders](https://shaders.paper.design) | Canvas contour study of material deformation; not a shader |
| Perspective Warp | [Magic UI: Warp Background](https://magicui.design/docs/components/warp-background) | Nested perspective frames and a movable vanishing point |
| Converging Paths | [Aceternity: Google Gemini Effect](https://ui.aceternity.com/components/google-gemini-effect) | Local scroll mapped to five SVG stroke lengths |
| Path Follower | [Motion: SVG animation](https://motion.dev/docs/react-svg-animation) | Native range input and SVG path geometry |
| Pointer Mask Reveal | [Aceternity: SVG Mask Effect](https://ui.aceternity.com/components/svg-mask-effect) | CSS circular clipping, pointer and keyboard control |
| Curved Gallery | [React Bits: Circular Gallery](https://reactbits.dev/components/circular-gallery) | Damped drag, circular wrapping, embedded photographic artwork |
| Toss & Stack | [React Bits: Card Swap](https://reactbits.dev/components/card-swap) | Direct manipulation with a dismissal threshold |
| Tracing Story | [Aceternity: Tracing Beam](https://ui.aceternity.com/components/tracing-beam) | Reading progress and a sticky chapter panel |
| Elastic Range | [React Bits: Elastic Slider](https://reactbits.dev/components/elastic-slider) | Native range semantics and rubber-band edge resistance |

## Existing coverage and refinement

Several references overlap with established entries: `cursor-grid-ripple`, `cursor-magnetic-grid-lines`, `image-trail`, `velocity-skew`, `scroll-progress`, `webgl-distortion`, `webgl-hologram-particles`, `collision-bubbles`, and `gradient-mesh-drift`. They remain available in their original categories.

The initial expansion refined five existing demos; the subsequent [full-library audit](LIBRARY_AESTHETIC_AUDIT.md) extends that work across the collection:

- `css3d-isometric-hover`: compact dimensional slabs, a dot grid, orange structural marks, readable native-size layout, and preserved hover/pin/layer controls.
- `btn-border-beam`: readable interface type, quieter geometry, orange perimeter light, and a static reduced-motion state.
- `input-float-label`: larger readable field, restrained focus treatment, persistent filled state, and unique input/label IDs for simultaneous preview instances.
- `lenis-smooth-scroll`: native 320px inner scroll panel, readable editorial content, reduced-motion fallback, and Lenis cleanup.
- `slider-stack-deck`: compact grayscale cards, crisp geometry, readable type, and cancellation of completed flyout animations before cards are recycled.

The reference list also contains engines and discovery resources (Motion, GSAP, Lenis, Matter.js, Rapier, Flubber, Codrops), plus heavier WebGL/fluid components. Those are resources for further implementations, not additional shipped demos in this release. No new runtime dependencies were added.

## Library behavior

Previews remain interactive; use the title row to open details. Filters and multi-word search include reference names. The modal has a focus trap, semantic tabs, source attribution, reset, and clipboard feedback. Exported code includes the stage, baseline tokens, root binding, and declared CDN dependencies.

The preview runtime cancels its tracked animation frames and timers on reset/close and invokes any cleanup function returned by a demo. Offscreen animation-frame and interval callbacks and CSS animations pause. New canvas studies also disconnect resize and visibility observers and respond to changes in reduced-motion preferences. Existing demos that attach their own global listeners or third-party tickers retain their individual lifecycle behavior; the runtime does not intercept those APIs.

## Verification

Run `node tools/verify-registry.js` and `node tools/verify-roadmap.js` for the registry contract. With Playwright installed as a development tool, `node tools/verify-library.js http://127.0.0.1:4173` checks the real browser flow, all 343 preview boots, 22 offline code exports including photographic assets and bundled fonts, pointer/keyboard/scroll behavior, lifecycle cleanup, reduced motion, and mobile layout. `node tools/verify-aesthetic.js http://127.0.0.1:4173` checks the refined interactions at 300px width. Both save evidence to the ignored `.artifacts/` directory.
