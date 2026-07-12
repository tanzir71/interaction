# CODEX HANDOFF — Extend the INTRX Interaction Library

You are extending **INTRX**, a static, GitHub-Pages-hosted library of web interactions. Each interaction ships as a live demo + copyable single-file snippet + LLM prompt. Your job: work through the backlog below **one interaction per loop iteration**, implement it to the quality bar, verify, check it off, commit.

## Loop protocol

Each iteration:

1. Pick the **first unchecked item** in the Backlog.
2. Study the effect (reference implementations exist on CodePen, Codrops, Framer community, hoverstat.es — replicate the *behavior*, write **original code**; never copy licensed code verbatim).
3. Register it in the correct `js/demos.*.js` file (create a new file + `<script>` tag in `index.html` if it's a new category).
4. Run the verification script (below). All checks must pass.
5. Check the item off in this file, update the pattern count in `README.md`.
6. Commit: `git commit -am "add <id>"`.
7. Continue to the next item. Stop only when the backlog is done or a check cannot be fixed after 3 attempts (then mark the item `[BLOCKED: reason]` and move on).

## Architecture (do not restructure)

```
index.html          shell — loads css, CDN libs (gsap, scrolltrigger, lenis), js/demos.*.js, then js/app.js
css/style.css       site design system only — demo CSS lives in each registry entry
js/app.js           renderer: nav, tabs, lazy boot, copy, search. CAT_ORDER array controls category order.
js/demos.*.js       registries. Each file starts with the INTRX bootstrap line.
```

`app.js` boots a demo when its card scrolls into view: injects `html` into the stage, appends `css` as a global `<style>`, runs `new Function('root','stage', js)(rootEl, stage)` where `rootEl` is the first element matching `.rootClass`.

## Registry contract

```js
INTRX.register({
  id: 'kebab-unique-id',
  title: 'Human Title',
  cat: 'Cursor',              // must exist in CAT_ORDER in app.js — add new categories there
  rootClass: 'd-uniqueprefix',// EVERY class in html/css must start with this prefix
  tags: ['technique', 'api'],
  libs: [],                   // subset of: 'gsap', 'scrolltrigger', 'lenis' (CDN tags auto-added to snippet)
  desc: 'One or two sentences: what it does and why/where it is used.',
  seen: 'Seen on: real sites/agencies that use it',
  hint: 'hover the card',     // short instruction shown in the demo corner
  html: `...`,
  css:  `...`,
  js:   `...`,                // receives `root` and `stage`
  prompt: `...`,              // see Prompt quality bar
});
```

### Hard constraints (violating these breaks the site)

- `html`/`css`/`js`/`prompt` are **JS template literals**: never use a backtick or `${` inside them. In demo `js`, use string concatenation (`'a' + x + 'b'`) and `.join('\\n')` for multiline strings (e.g. shaders).
- Demo must be **fully self-contained**: no network requests, no image assets — generate textures procedurally (canvas gradients/shapes). No `localStorage`.
- All demo class names prefixed with `rootClass` — CSS is injected globally, collisions are catastrophic.
- The demo runs inside a `~320px`-tall stage, not the viewport. Scroll-driven demos must use their own inner scroll container (`height: 320px; overflow-y: auto`) — see `demos.scroll.js` for the pattern.
- Fixed positioning is forbidden in demos (cards are in-page); use `position: absolute` within the root.
- Match the site palette: bg `#0a0a0b` / `#101012` / `#161619`, lines `#232327` / `#2e2e34`, text `#ececef` / `#9b9ba3` / `#5c5c66`, accent `#a78bfa`, mono font `"JetBrains Mono", monospace`.
- Keep it performant: transforms/opacity only where possible, `will-change` on animated nodes, one rAF loop per demo, passive listeners.
- No new CDN dependencies without need. Prefer vanilla. If an effect truly needs three.js, add its CDN tag to `index.html` AND teach `buildCode()` in `app.js` to emit the tag for `libs: ['three']`.
- Audio demos: WebAudio synthesis only (no files), start only after a user gesture, always provide a visible mute.

### Prompt quality bar

The `prompt` field is a specification another LLM can implement from, in any stack. It must state: the DOM/structural approach, the exact math (falloffs, lerp factors, thresholds), easings as cubic-bezier or named GSAP eases, durations/staggers, performance rules (transform-only, rAF, passive), and accessibility/reduced-motion behavior. Look at existing entries — match that density.

## Verification (run every iteration)

```bash
for f in js/*.js; do node --check "$f" || echo "SYNTAX FAIL $f"; done
```

```bash
node - <<'EOF'
const vm = require('vm'), fs = require('fs');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
fs.readdirSync('./js').filter(f => f.startsWith('demos.')).forEach(f =>
  vm.runInContext(fs.readFileSync('./js/' + f, 'utf8'), ctx, { filename: f }));
const demos = ctx.INTRX.demos; let errs = 0;
const appSrc = fs.readFileSync('./js/app.js', 'utf8');
const catOrder = appSrc.match(/CAT_ORDER = \[(.*?)\]/s)[1].match(/'[^']+'/g).map(s => s.slice(1, -1));
demos.forEach(d => {
  ['id','title','cat','rootClass','desc','html','css','js','prompt'].forEach(k => {
    if (!d[k]) { console.log('MISSING', d.id, k); errs++; } });
  if (!d.html.includes(d.rootClass)) { console.log('rootClass not in html:', d.id); errs++; }
  if (!catOrder.includes(d.cat)) { console.log('cat not in CAT_ORDER:', d.id, d.cat); errs++; }
  if (d.prompt.trim().length < 300) { console.log('prompt too thin:', d.id); errs++; }
  try { new Function('root','stage', d.js); } catch (e) { console.log('JS COMPILE FAIL:', d.id, e.message); errs++; }
});
const ids = demos.map(d => d.id);
if (new Set(ids).size !== ids.length) { console.log('DUPLICATE IDS'); errs++; }
demos.forEach(d => {
  (d.css.match(/\.[a-zA-Z][\w-]*/g) || []).forEach(cls => {
    if (!cls.startsWith('.' + d.rootClass.split('-')[0] + '-') && cls !== '.' + d.rootClass)
      { console.log('UNPREFIXED CLASS', d.id, cls); errs++; } });
});
console.log(errs ? 'ERRORS: ' + errs : 'PASS — ' + demos.length + ' demos');
EOF
```

Optional deeper check (if `jsdom` is installed): boot every non-canvas demo with stubbed `IntersectionObserver`/`requestAnimationFrame`/`gsap`/`Lenis` and assert no exceptions.

If a demo is visual-only-verifiable, ALSO open `index.html` in a browser/headless runner when available and confirm no console errors.

## Backlog

Work top to bottom within a section; sections may be interleaved to keep category balance. `→ cat` names an existing or new category; new categories must be appended to `CAT_ORDER` in `app.js` (suggested full order: Scroll, Cursor, Text & Type, Image & WebGL, Raster & Glitch, Skeuomorph, SVG & Line, 3D & Perspective, Physics, Liquid & Organic, Galleries & Sliders, Navigation & Menus, Buttons & Micro, Forms & Inputs, Loaders & Progress, Layout & UI, Data & Numbers, Ambient, Sound & Haptics, Play & Easter Eggs).

### Cursor & pointer-reactive (extend `demos.cursor.js`)

- [x] `cursor-gooey-blob` — SVG-filter gooey blob chasing the cursor, absorbing hovered nav items
- [x] `cursor-particle-emitter` — canvas sparks/dust emitted along pointer path with gravity + fade
- [x] `cursor-elastic-line` — SVG path between anchors bending elastically toward pointer, springs back (quadratic bezier + spring)
- [x] `cursor-inverted-lens` — circular lens following cursor that magnifies/inverts (duplicate layer + clip-path)
- [x] `cursor-text-repel` — characters within radius push away from pointer and spring home
- [x] `cursor-grid-ripple` — dot-grid dots displace/brighten in radial wave from pointer with trailing decay
- [x] `cursor-hover-preview` — link hover spawns floating media preview lerping after cursor, rotation from velocity
- [x] `cursor-drag-ghost` — dragging leaves motion-blur ghost copies that fade
- [x] `cursor-eyes-follow` — eyes tracking pointer (atan2), blink on click
- [x] `cursor-liquid-metaball` — metaballs merging around pointer via blur+contrast threshold
- [x] `cursor-rope-trail` — verlet rope/chain of segments dragging behind the pointer with slack and sway
- [x] `cursor-velocity-stretch` — cursor blob stretches/rotates along its motion vector (squash & stretch from speed)
- [x] `cursor-snap-targets` — cursor snaps/morphs to rect outline of hovered element (Fantasy-style "sticky cursor")
- [x] `cursor-flashlight-noise` — darkness with grain revealed by a soft flashlight; light flickers subtly
- [x] `cursor-emoji-rain` — clicking bursts physics-y emoji/glyph confetti from the point
- [x] `cursor-magnetic-grid-lines` — background grid lines bow toward the cursor (SVG path warp)
- [x] `cursor-heat-shimmer` — cursor leaves a cooling heat-map trail (canvas, additive blend, fade)
- [x] `cursor-crosshair-hud` — full-stage crosshair + coordinates readout following pointer, axis lines with lag
- [x] `cursor-pull-distort` — hovered card's corners bow toward the cursor (perspective via clip-path polygon)
- [x] `cursor-shadow-parallax` — element's drop shadow moves opposite the cursor like a light source

### Raster, dither & glitch (new file `js/demos.raster.js`)

- [x] `dither-bayer` — 4x4 Bayer ordered dither, threshold animated by cursor proximity (canvas)
- [x] `dither-floyd-steinberg` — 1-bit error-diffusion dither resolving to full color on hover
- [x] `dither-blue-noise` — blue-noise mask dither dissolving between two images on click
- [x] `halftone-dots` — halftone dot grid, radius from luminance; dots swell near cursor
- [x] `halftone-lines` — engraving-style line halftone, line weight from luminance, angle rotates on hover
- [x] `ascii-render` — image rendered as ASCII glyph ramp on canvas by luminance
- [x] `ascii-webcam-style-wave` — ASCII field animated by layered sines (no webcam), cursor stirs it
- [x] `glitch-rgb-slices` — horizontal slice displacement + RGB split bursts on hover
- [x] `glitch-datamosh-blocks` — macroblock corruption: random blocks copied/offset with motion smear on interval
- [x] `scanline-crt` — CRT: scanlines, vignette, barrel wobble, occasional roll
- [x] `vhs-tracking` — VHS tracking error: wave displacement bands + chroma bleed on interval
- [x] `pixel-sort` — columns sort by brightness downward on hover, unsort on leave
- [x] `noise-grain-overlay` — animated film grain (canvas noise ~8fps) as reusable overlay
- [x] `threshold-mosaic-transition` — image-to-image transition through animated dither threshold (Obys-style)
- [x] `bitmap-font-marquee` — text rendered to canvas then re-rendered as chunky bitmap pixels, scrolling
- [x] `interlace-flicker` — alternating field flicker + slight y-jitter for broadcast look, intensity on hover
- [x] `posterize-hover` — color depth collapses to 2-3 levels near the cursor, full depth elsewhere
- [x] `chromatic-type` — headline with animated RGB fringe that splits with cursor velocity

### Skeuomorphism & physicality (new file `js/demos.skeuo.js`)

- [x] `neumorphic-buttons` — soft-UI raised/pressed/toggle set with correct dual shadows
- [x] `mechanical-switch` — toggle with overshoot travel + synthesized click (WebAudio)
- [x] `rotary-knob` — draggable knob (atan2 angle, detents, tick marks, readout)
- [x] `brushed-metal-slider` — machined track, chamfered thumb, position-shifting specular highlight
- [x] `paper-stack-cards` — layered paper, drag top sheet to peel/toss (physics on release)
- [x] `glass-refraction-card` — glass card with cursor-tracked glare, edge highlight, backdrop distortion illusion
- [x] `led-segment-display` — 7-segment with phosphor glow, ghost segments, count/scramble modes
- [x] `flip-clock` — split-flap digits, 3D half-card flips, staggered cascade
- [x] `embossed-press` — text/icon depresses into surface on press (inner-shadow swap + 1px translate)
- [x] `analog-gauge` — needle gauge with spring overshoot, redline zone, jittering at rest
- [x] `punch-card-keyboard` — keycaps that depress with travel, stagger-type a sentence on loop
- [x] `cassette-reels` — two tape reels spinning, tape amount transfers over time, scrub by dragging
- [x] `slot-machine-reel` — vertical glyph reel with blur during spin, clunk-settle on stop
- [x] `zippo-flame` — flame of layered blurred blobs flickering, bends away from cursor "wind"
- [x] `torn-paper-edge` — section divider with procedurally torn edge (SVG path noise) that re-tears on click
- [x] `wax-seal-stamp` — press-and-hold stamps a wax seal with squash, cooling color shift

### Scroll (extend `demos.scroll.js`)

- [x] `scroll-text-highlight` — words fill dim→bright sequentially with scroll (reading progress)
- [x] `scroll-image-sequence` — pseudo-video: procedural frames scrubbed by scroll (Apple-style)
- [x] `scroll-svg-draw` — SVG stroke-dashoffset path drawing tied to scroll
- [x] `scroll-rotate-gallery` — circular fan gallery rotating with scroll, center item scales
- [x] `scroll-split-screen` — pinned left panel, right chapters scroll; left crossfades per chapter
- [x] `scroll-marquee-direction` — marquee rows reverse with scroll direction, lean with velocity
- [x] `scroll-counter-rotate` — two overlapping rings of text counter-rotating with scroll
- [x] `scroll-depth-tunnel` — nested frames scale up past camera like flying through a tunnel
- [x] `scroll-letter-scatter` — headline letters scatter along bezier paths as section scrolls away
- [x] `scroll-color-theme` — page background/theme crossfades between section palettes with scroll
- [x] `scroll-clip-morph` — hero image clip-path morphs (circle→full-bleed) with progress
- [x] `scroll-table-of-contents` — TOC dots/labels track sections, active dot stretches while moving
- [x] `scroll-inertia-grid` — grid items lag behind scroll proportionally to column (columns arrive at different times)
- [x] `scroll-video-scrubber` — timeline scrubber UI synced to inner scroll with chapter markers

### Text & type (extend `demos.text.js`)

- [x] `text-wave-hover` — sine wave ripples through characters from entry glyph
- [x] `text-clip-image` — animated procedural texture panning inside background-clip: text
- [x] `text-typewriter-caret` — multi-string type/pause/delete cycle, blinking block caret
- [x] `text-falling-letters` — letters drop with gravity + bounce, scatter on click
- [x] `text-blur-focus` — words rack focus blur(8px)→0 with scale settle, staggered
- [x] `text-strike-reveal` — hover strikes a phrase and rolls in its replacement
- [x] `text-anagram-shuffle` — word smoothly rearranges letters into another word (FLIP per glyph)
- [x] `text-outline-fill-scroll` — outlined display type fills with solid color left-to-right on hover
- [x] `text-ransom-note` — each glyph randomizes font/weight/rotation like cut-out letters, reshuffles on click
- [x] `text-glitch-layers` — headline with clipped duplicate layers jittering (classic CSS glitch)
- [x] `text-circular-spin` — text on a circular path (SVG textPath) spinning, speed reacts to hover
- [x] `text-accordion-squeeze` — hovering a line squeezes siblings (font-stretch/scaleY distribution)
- [x] `text-underline-magic` — animated underline that draws, hops between hovered nav links (shared indicator)
- [x] `text-numbers-slot` — number changes by rolling each digit column like a slot machine
- [x] `text-highlighter-swipe` — marker-style highlight sweeps across key phrases on scroll into view
- [x] `text-broken-grid` — headline fragments across a broken grid, fragments reunite on hover

### Image & WebGL (extend `demos.image.js`)

- [x] `webgl-ripple-click` — click spawns expanding ripple rings distorting texture (uniform array of origins/ages)
- [x] `webgl-pixel-river` — UVs flow like liquid along a noise field, intensity on hover
- [x] `webgl-fisheye-hover` — bulge/fisheye lens under cursor with easing radius
- [x] `webgl-static-tv` — analog static that resolves into the image on hover
- [x] `webgl-kaleidoscope` — texture mirrored into kaleidoscope segments, rotates toward cursor angle
- [x] `webgl-vertex-wave` — image on a subdivided grid mesh waving in 3D (vertex displacement)
- [x] `image-slice-hover` — vertical slats stagger-tilt/offset on hover (CSS 3D)
- [x] `image-infinite-zoom` — seamless infinite zoom through nested procedural frames
- [x] `comparison-slider` — before/after wipe with draggable divider
- [x] `kenburns-crossfade` — slideshow with Ken Burns pan/zoom + crossfade
- [x] `image-duotone-swap` — duotone palette remaps on hover with radial sweep from cursor
- [x] `image-shatter-click` — image breaks into triangle shards that fall (canvas triangulation)
- [x] `image-blinds-reveal` — venetian-blind strips rotate open to reveal (staggered rotateX)
- [x] `image-magnetic-tiles` — image grid tiles lift/tilt toward cursor as a cohesive field

### SVG & line (new file `js/demos.svg.js`)

- [x] `svg-path-draw-hover` — icon strokes draw themselves on hover (dashoffset)
- [x] `svg-blob-morph` — organic blob morphing between states (interpolated radial points), reacts to hover
- [x] `svg-squiggle-underline` — hand-drawn squiggle underline animates on hover, wobbles while shown
- [x] `svg-line-graph-live` — line chart draws in with dot pulse, replots with new data on click
- [x] `svg-marching-ants` — animated dashed border tracing a card outline, speeds on hover
- [x] `svg-signature-write` — signature handwriting animates stroke by stroke with variable speed
- [x] `svg-gooey-menu` — expanding action button with gooey-filter merging child buttons
- [x] `svg-topographic-drift` — topographic contour lines slowly drifting (noise-displaced paths)
- [x] `svg-circuit-pulse` — circuit-board paths with light pulses traveling along them (dash animation)
- [x] `svg-lissajous-loader` — parametric lissajous curves morphing between figures

### 3D & perspective (new file `js/demos.three.js` — CSS 3D first; raw WebGL where needed)

- [x] `css3d-cube-nav` — rotating cube with content faces, snaps to face on click/drag
- [x] `css3d-card-flip-grid` — grid of cards flipping to reveal backs in a wave pattern
- [x] `css3d-book-page` — page-turn with bending fold shadow (two-half trick)
- [x] `css3d-carousel-cylinder` — items arranged on a cylinder, drag to spin with inertia
- [x] `css3d-parallax-room` — walls/floor/ceiling planes forming a room that looks around with cursor
- [x] `css3d-isometric-hover` — isometric card stack; hover lifts layers apart (exploded view)
- [x] `css3d-folding-map` — content unfolds like a map along multiple creases on scroll into view
- [x] `webgl-point-globe` — rotating point-cloud sphere, points swell near cursor ray
- [x] `webgl-wobbly-sphere` — noise-displaced sphere blob (classic agency hero), reacts to cursor speed
- [x] `css3d-depth-hero` — layered hero (bg/mid/fg planes at translateZ) with device-tilt-style cursor look

### Physics & springs (new file `js/demos.physics.js`)

- [x] `spring-cursor-follower` — configurable spring (stiffness/damping sliders) following pointer — teaching demo
- [x] `pendulum-tags` — tags hanging from a rail, swing from cursor swipes and settle (verlet)
- [x] `chain-links` — draggable verlet chain between two anchors, links sag realistically
- [x] `gravity-drop-icons` — icons fall, bounce, and pile at container floor on load; drag to throw
- [x] `collision-bubbles` — floating circles with elastic collisions, cursor is a repeller body
- [x] `soft-body-blob` — pressable jelly blob (spring mesh) that squishes under the cursor
- [x] `cloth-flag` — verlet cloth flag waving; cursor drags points; pins at one edge
- [x] `wrecking-ball-text` — swinging ball knocks letters over (simple rigid impulse)
- [x] `inertia-window-drag` — draggable panel with momentum and boundary bounce
- [x] `magnet-snap-grid` — dragged items snap to grid with critically-damped spring settle

### Liquid & organic (new file `js/demos.liquid.js`)

- [x] `liquid-blob-buttons` — buttons whose borders wobble like surface tension on hover (border-radius keyframe morphing)
- [x] `ferrofluid-dots` — dot field bulges into spikes under cursor like ferrofluid (canvas metaball threshold)
- [x] `water-ripple-2d` — classic 2-buffer water ripple sim on canvas; move to disturb, click to splash
- [x] `lava-lamp` — rising/merging blobs via blur+contrast, palette shifts slowly
- [x] `ink-bleed-reveal` — content revealed by spreading ink blot (growing turbulence-displaced mask)
- [x] `melt-drip-text` — headline letters drip/melt downward on hover (canvas smear)
- [x] `smoke-wisps` — curl-noise smoke trails rising from a point, cursor disturbs flow
- [x] `bubble-float-pop` — bubbles float up with wobble, pop with ring burst on hover

### Galleries & sliders (new file `js/demos.gallery.js`)

- [x] `slider-elastic-edges` — slider with rubber-band overscroll and snap
- [x] `slider-progress-fraction` — slider with animated fraction counter (01 — 05) and progress line
- [x] `slider-clip-transition` — slides transition via expanding clip-path from click point
- [x] `slider-stack-deck` — swipe-away card deck (Tinder-style) with rotation from drag offset
- [x] `slider-fullbleed-parallax` — full-bleed slider where outgoing/incoming images move at different speeds
- [x] `gallery-filmstrip-scrub` — thumbnail filmstrip scrubbed by cursor x position (no click)
- [x] `gallery-expanding-columns` — flex columns; hovered column expands, siblings compress (with eased flex-grow)
- [x] `gallery-honeycomb` — hex grid where hovered cell scales and neighbors ripple
- [x] `gallery-random-stack` — click cycles photos thrown onto a pile with random offset/rotation
- [x] `gallery-dual-row-drift` — two auto-drifting rows in opposite directions, pause + straighten on hover
- [x] `lightbox-flip-zoom` — thumbnail FLIP-zooms into lightbox with backdrop, ESC/click to return
- [x] `slider-wheel-3d` — vertical wheel-of-fortune list, wheel/drag to spin, center item highlighted

### Navigation & menus (new file `js/demos.nav.js`)

- [x] `menu-fullscreen-overlay` — hamburger opens full-stage overlay: staggered link reveal, background zoom
- [x] `menu-split-reveal` — menu splits the page apart (top/bottom halves slide away) revealing links between
- [x] `menu-circular-expand` — menu expands as a circle from the burger icon (clip-path circle)
- [x] `nav-blur-elevate` — navbar gains blur/shadow/compresses height after scroll threshold
- [x] `nav-hide-reveal` — navbar hides on scroll down, reveals on scroll up with slight overshoot
- [x] `nav-active-pill` — pill indicator FLIP-slides between active links, stretching mid-travel
- [x] `menu-letter-cascade` — hover cascades the link's letters up while siblings dim + blur
- [x] `menu-image-peek` — hovering menu items reveals a corresponding image behind, crossfading between items
- [x] `breadcrumb-collapse` — breadcrumbs collapse to ellipsis and expand on hover with stagger
- [x] `tab-morph-content` — tab content transitions with height auto-morph + directional slide by tab index
- [x] `sidebar-rail-expand` — icon rail expands to labeled sidebar on hover, labels stagger in
- [x] `burger-morph-x` — burger icon morphs to X with staggered line rotations (path or spans)

### Buttons & micro-interactions (new file `js/demos.micro.js`)

- [x] `btn-border-beam` — a light beam travels around the button border (conic-gradient mask rotation)
- [x] `btn-shimmer-sweep` — diagonal shine sweeps across on hover, once per entry
- [x] `btn-text-slide-swap` — label slides up revealing duplicate from below (mini letter-roll)
- [x] `btn-icon-hop` — arrow icon hops forward and returns; loops while hovered with pause
- [x] `btn-success-morph` — submit → loading spinner → checkmark morph sequence (width animates between states)
- [x] `btn-confetti-burst` — click bursts canvas confetti from the button
- [x] `btn-ripple-material` — material ripple from click point, correctly sized to farthest corner
- [x] `btn-jelly-press` — squash-and-stretch press (scaleX up/scaleY down then overshoot back)
- [x] `like-heart-particles` — heart toggles with pop + particle ring (Twitter-style)
- [x] `checkbox-draw-check` — checkbox checkmark draws itself (SVG dashoffset) with box pop
- [x] `toggle-day-night` — theme toggle where sun morphs to moon, stars/clouds swap with stagger
- [x] `copy-inline-feedback` — copy button morphs icon → check + floats "copied" chip up
- [x] `hover-tooltip-spring` — tooltip springs in with scale from anchor direction, follows with lag
- [x] `badge-notification-pop` — badge count increments with slot-roll digit + elastic pop

### Forms & inputs (new file `js/demos.forms.js`)

- [x] `input-float-label` — placeholder floats up into a label with color shift on focus
- [x] `input-underline-grow` — focus underline grows from caret-entry side
- [x] `input-shake-error` — invalid submit shakes field (damped sine) and flashes border
- [x] `input-char-counter-arc` — circular arc fills as characters approach the limit, warns near cap
- [x] `otp-code-boxes` — segmented code input: auto-advance, paste-splitting, filled-box pop
- [x] `password-strength-bar` — strength meter animating width + hue with rule checklist ticking
- [x] `select-morph-dropdown` — custom select where the panel morphs open from the trigger (height + clip)
- [x] `range-elastic-thumb` — range slider whose thumb stretches while dragging fast and snaps back
- [x] `textarea-auto-grow` — textarea grows/shrinks smoothly to content height
- [x] `form-multistep-progress` — multi-step form with sliding panels and step dots that fill in sequence

### Loaders & progress (new file `js/demos.loaders.js`)

- [x] `preloader-percentage` — full-stage preloader: counter 0→100 with eased pacing, curtain exit into content
- [x] `preloader-word-cycle` — greeting words cycle (hello, bonjour, ciao…) then wipe away (dennissnellenberg-style)
- [x] `loader-dots-wave` — three dots waving with phase offset — the baseline, done perfectly
- [x] `loader-morph-shapes` — shape morphs square→triangle→circle continuously
- [x] `loader-typing-code` — fake terminal types commands with cursor, outputs "ready", clears
- [x] `skeleton-shimmer` — skeleton screens with traveling shimmer, staggered per element, crossfade to content
- [x] `progress-blob-fill` — container fills with a wavy liquid surface to the target percent
- [x] `loader-orbit-dots` — dots orbiting with trails at different radii/speeds (electron style)
- [x] `upload-progress-morph` — upload button morphs into progress ring, then check with ring burst
- [x] `page-load-counter-slide` — big numeral counter slides digits as it counts, panel lifts at 100

### Data & numbers (new file `js/demos.data.js`)

- [x] `chart-bars-race` — bar chart animating between datasets with rank-swapping FLIP
- [x] `chart-donut-sweep` — donut segments sweep in sequentially with count-up labels
- [x] `sparkline-hover-scrub` — inline sparkline with crosshair scrub + value bubble
- [x] `heatmap-fade-in` — calendar heatmap cells fade in diagonally, tooltip on hover
- [x] `ticker-tape-prices` — financial ticker with price flashes green/red on change
- [x] `radar-sweep-blips` — radar sweep revealing blips that fade until next pass

### Ambient & generative (new file `js/demos.ambient.js`)

- [x] `particles-constellation` — drifting particles with proximity lines; pointer attracts/repels
- [x] `gradient-mesh-drift` — morphing multi-blob mesh gradient; pointer nudges nearest blob
- [x] `flow-field` — noise flow field with streaking particles; cursor disturbs the field
- [x] `starfield-warp` — z-flying starfield; hover engages warp streaks
- [x] `conway-life-fade` — Game of Life running dim; cells spawn under cursor
- [x] `audio-reactive-bars` — fake audio visualizer from layered sines; hover excites amplitude
- [x] `matrix-rain` — falling glyph columns with bright heads and fading tails; cursor clears a hole
- [x] `fireflies-night` — glowing particles with wander behavior, gather slowly around idle cursor
- [x] `aurora-curtains` — layered sine-driven translucent curtains slowly waving (northern lights)
- [x] `rain-window` — droplets streak down with random walk, merging into bigger drops

### Sound & haptics (new file `js/demos.sound.js` — WebAudio synthesis only, gesture-gated, mutable)

- [x] `ui-sound-kit` — hover/click/toggle blips synthesized with envelopes; pitch varies per element index
- [x] `typing-mechanical` — keystrokes in a field trigger synthesized thock with velocity variation
- [x] `theremin-pad` — x=pitch, y=volume pad with visual trace while pressed
- [x] `notification-chime-stack` — stacking toasts each play an ascending arpeggio note
- [x] `drum-grid-sequencer` — 4x8 step sequencer, click cells, loop plays synthesized kit with playhead sweep
- [x] `scroll-pitch-drone` — subtle drone whose filter opens with scroll velocity (headphone easter egg)

### Play & easter eggs (new file `js/demos.play.js`)

- [x] `dvd-screensaver` — bouncing logo, corner-hit color change, corner-hit counter
- [x] `konami-unlock` — konami code triggers rainbow party mode on the card
- [x] `click-fireworks` — click launches fireworks with trail, burst, gravity sparks
- [x] `drag-to-break` — grabbing and shaking an element hard makes it crack then shatter (velocity accumulator)
- [x] `pet-the-blob` — blob character follows cursor with eyes, squishes when petted, gets happy (state machine)
- [x] `gravity-flip-page` — button flips gravity: all elements in the card tumble to the ceiling and back
- [x] `wobbly-window-drag` — draggable panel with jelly deformation from drag velocity (Linux compiz nostalgia)
- [x] `snake-in-grid` — tiny playable snake in a dot grid, arrows/wasd, score readout

### Layout & UI (extend `demos.ui.js`)

- [x] `bottom-sheet` — draggable sheet with snap points (peek/half/full), velocity-aware release
- [x] `radial-menu` — press-and-hold fan-out radial menu, selection on release
- [x] `elastic-tabs` — stretchy tab indicator that overshoots and squashes mid-travel
- [x] `masonry-filter` — filterable grid, items FLIP to new positions
- [x] `command-palette` — ⌘K palette with fuzzy highlight, keyboard nav, spring entrance
- [x] `toast-stack` — toasts push with spring, hover fans them out (Vercel-style)
- [x] `number-input-drag` — Figma-style drag-to-scrub value input with acceleration
- [x] `context-menu-custom` — right-click menu with origin-aware scale-in and submenu slide
- [x] `resizable-split-pane` — draggable divider with snap zones and double-click reset
- [x] `card-hover-border-gradient` — conic gradient border rotating around card, centered on cursor angle
- [x] `list-reorder-drag` — drag-to-reorder list where siblings animate out of the way (FLIP)
- [x] `zoom-ui-inception` — clicking a mini preview card zooms the whole UI into it becoming the new view

## Sourcing new ideas beyond this backlog

When the backlog is exhausted, source more from: CodePen trending (search: "cursor effect", "dither", "scroll animation", "hover effect", "loader", "menu"), Codrops articles/demos (tympanus.net), Framer community resources & motion.dev examples, hoverstat.es, awwwards SOTD collections, darkroom.engineering / lusion.co / activetheory.net labs, minimal.gallery, godly.website, seesaw.website. For each: identify the *technique* (not the code), rebuild original, credit the popularizer in `seen`. Append 20 new items here each time the list runs dry, keeping category balance.

## Definition of done (per item)

- Verification script: PASS.
- Demo is visually alive within the 320px stage without setup, works idle + on interaction.
- Code tab is a paste-runnable single file; prompt tab meets the quality bar.
- `seen` cites at least one real-world reference.
- Backlog checkbox ticked, README count updated, committed.
