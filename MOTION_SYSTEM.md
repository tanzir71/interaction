# INTRX motion system

Every hover, press, drag and state change in INTRX follows this system. It is calibrated to transitions.dev: the timing scale, the easing curves and the motion recipes below match the values that site ships, extended to cover every INTRX component. Codex implements it; nothing here needs a new dependency.

## 1. What makes the motion feel right

1. **One default curve.** Almost everything that enters, moves or resizes uses `cubic-bezier(0.22, 1, 0.36, 1)`: fast start, long soft landing. Other curves are exceptions with a named job.
2. **Exits are faster than entrances.** Roughly 60%: a menu opens in 250ms and closes in 150ms; a panel opens in 350ms and closes in 250ms. Leaving should never hold the user up.
3. **Things resolve, they do not just fade.** Entrances combine opacity with a small move (4 to 12px) or scale (0.96 to 0.98) and a 2px blur that clears. Icons swap from scale 0.25 with blur 10px. Nothing starts from scale 0.
4. **Motion starts where the user acted.** Menus, popovers, tooltips and morphing modals use the trigger as `transform-origin`, or FLIP from the trigger's rect.
5. **Every state change is interruptible.** Toggles and hovers use CSS transitions (or mirrored keyframes) so a reversal mid-flight retargets instead of snapping. One-shot keyframes are only for celebrations (like, confetti).
6. **Small, specific overshoot.** Bounce lives in a few named curves (pop, settle, toggle). Overshoot is 1px of travel or a 1.03 scale peak, never a wobble.
7. **Stagger is short.** 40ms between items, the cascade capped at about 300ms; anything after that arrives together.
8. **Only cheap properties.** transform, opacity and filter. Height animates through `grid-template-rows: 0fr` to `1fr`; layout changes use FLIP.
9. **Hover is for pointers.** Hover motion sits inside `@media (hover: hover)`. Touch gets the press state instead.
10. **Reduced motion is designed, not deleted.** Under `prefers-reduced-motion: reduce`, transforms become 150ms opacity cross-fades, loops render one still frame, scroll-linked scenes jump between states. Feedback (focus, success, error colour) still happens.

## 2. Tokens

Add these once to `css/style.css` (`:root`) and use them in every demo instead of literal values.

```css
:root {
  /* duration */
  --dur-micro: 80ms;     /* press-in, tooltip delay */
  --dur-quick: 150ms;    /* hover in, closes, colour */
  --dur-fast: 250ms;     /* menus, modals, tabs, accordions */
  --dur-medium: 350ms;   /* panels, toasts, toggles, check draw */
  --dur-slow: 400ms;     /* text swaps, reveals */
  --dur-xslow: 500ms;    /* icon swaps, pop-in scale */
  --stagger: 40ms;

  /* easing */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);        /* default for enter, move, resize */
  --ease-close: cubic-bezier(0.4, 0, 0.2, 1);        /* exits that should feel decisive */
  --ease-in-out: ease-in-out;                        /* cross-fades, pulses */
  --ease-pop: cubic-bezier(0.34, 1.36, 0.64, 1);     /* scale-in with a 1.03 peak */
  --ease-settle: cubic-bezier(0.34, 1.25, 0.64, 1);  /* panels and morphs opening */
  --ease-bounce: cubic-bezier(0.34, 1.35, 0.64, 1);  /* toggle thumb */
  --ease-pop-strong: cubic-bezier(0.34, 1.96, 0.64, 1); /* like-heart only */
  --ease-step: cubic-bezier(0.35, -0.02, 0.43, 1);   /* number drum steps */
  /* linear: only continuous loops, shimmers, marquees and scroll scrubbing */

  /* distance / scale / blur */
  --move-micro: 4px; --move-small: 6px; --move-base: 8px; --move-medium: 12px; --move-large: 30px;
  --scale-large: 0.96; --scale-medium: 0.97; --scale-small: 0.98; --scale-tiny: 0.99;
  --blur-small: 2px; --blur-medium: 3px; --blur-large: 8px;
}
@media (prefers-reduced-motion: reduce) {
  :root { --move-micro: 0px; --move-small: 0px; --move-base: 0px; --move-medium: 0px; --move-large: 0px;
          --scale-large: 1; --scale-medium: 1; --scale-small: 1; --scale-tiny: 1; --blur-small: 0px; --blur-medium: 0px; --blur-large: 0px; }
}
```

Springs for drag release (JS): **snappy** stiffness 380, damping 32, mass 1 (UI handles, sheets, cards); **soft** stiffness 170, damping 26 (objects, physics toys). Pointer-follow lerp per frame: 0.18 snappy, 0.08 lazy. Scroll smoothing lerp: 0.12.

## 3. Recipes

Each component below names the recipes it uses. A recipe is the exact transition, not a suggestion.

| Recipe | Used by | Spec |
|---|---|---|
| **Press** | 72 | `:active` scale 0.97 in 80ms `--ease-out`; release to 1 in 250ms `--ease-pop`. Keyboard Enter/Space mirrors it. |
| **Hover lift** | 13 | Hover in: translateY(-2px) + shadow step up, 150ms `--ease-out`. Leave: 250ms `--ease-out`. Only inside `@media (hover:hover)`. |
| **Icon swap** | 14 | Outgoing: opacity 0, scale 0.25, blur 4px, 150ms `--ease-close`. Incoming: from scale 0.25, blur 10px (rotate 80deg for checks) to rest, 500ms `--ease-out` (opacity 400ms). Both layers share one grid cell so nothing shifts. |
| **Text swap** | 8 | Out: translateY(-12px), blur 2px, opacity 0, 400ms `--ease-out`. In: from +12px, blur 2px, opacity 0, 400ms `--ease-out`, 50ms after the out starts. Width of the container animates 250ms `--ease-out` if it changes. |
| **Pop-in** | 11 | Enter: translate(-8px, 12px) to 0 in 260ms `--ease-out`, scale 0.7 to 1 in 500ms `--ease-pop`, opacity in 400ms. Exit: 180ms `--ease-close` to scale 0.7 + opacity 0. |
| **Origin-aware menu** | 10 | `transform-origin` = the trigger's edge. Open: opacity 0 to 1, scale 0.96 to 1, translateY(-4px) to 0, blur 2px to 0, 250ms `--ease-out`; items stagger 40ms (max 5). Close: 150ms `--ease-out` back to scale 0.96, no stagger. Hover highlight moves between rows in 160ms `--ease-out` instead of fading. |
| **Modal** | 9 | Scrim opacity 250ms in / 150ms out. Dialog: scale 0.96 to 1 + opacity, 250ms `--ease-out`; close 150ms back to 0.96. If opened from a button, start from the button's rect (FLIP) and morph radius. |
| **Panel / morph** | 26 | Container size + radius morph: open 350ms `--ease-settle`, close 250ms `--ease-out`. Inner content fades in 200ms `--ease-out` after a 50ms delay and out in 150ms before the container closes. Slide-in content shifts 40px with 2px blur. |
| **Tooltip** | 9 | Delay in 80ms, then 150ms `ease-out` from scale 0.98 + opacity 0. Out: 50ms, no delay. Moving between anchors within 300ms skips the delay and travels 160ms `--ease-out` without re-fading. |
| **Sliding indicator** | 20 | Indicator translateX + width 250ms `--ease-out`; label colour 250ms. Elastic variant: leading edge 200ms, trailing edge 300ms so the pill stretches mid-flight. |
| **Accordion** | 7 | `grid-template-rows: 0fr` to `1fr` in 250ms `--ease-out`; chevron rotates 180deg in 250ms; content opacity 200ms. Collapse uses the same 250ms. |
| **Toggle** | 4 | Thumb travel via keyframes (55% overshoot +1px, 80% settle) 350ms `--ease-bounce` (.34,1.35,.64,1); track colour 150ms. Reverse uses the mirrored keyframes so a mid-flight click retargets. |
| **Check / path draw** | 11 | Box fill/border 150ms `--ease-out`; check path draws by `stroke-dashoffset` 350ms `--ease-out` after 80ms. Uncheck: path and fill out in 150ms together. |
| **Like burst** | 5 | Fill colour 150ms; heart keyframes scale 1 to 0.82 to 1 over 350ms `--ease-pop-strong` (.34,1.96,.64,1); 8 particles (2.5px) fly 20px radially and fade over 600ms `--ease-out`. Count rolls with Number fade. |
| **Error shake** | 1 | translateX 0, 6px, -6px, 4px, 0 at 0/28.6/57.1/78.6/100% (segments 80ms/60ms, about 280ms total), each segment `--ease-out`. Border/text to error colour 150ms; auto-revert after 3s in 280ms. |
| **Number drum** | 9 | Each digit is a 1.2em cell on a 3D drum. Anticipation: scale 0.94 + lift 0.125em in 100ms; step 130ms per digit with `cubic-bezier(.35,-.02,.43,1)`; land 740ms with a 1.03 peak; digits stagger 90ms. Neighbouring digits sit at scale 0.7, blur 2px, opacity 0.17. |
| **Number fade** | 16 | Only the changed digits animate: old digit out up 4px with 2px blur, new digit in from below, 250ms `--ease-out`. Use `font-variant-numeric: tabular-nums` so width never jumps. |
| **Skeleton reveal** | 2 | Skeleton pulses once: opacity 1 to 0.5 to 1 over 1000ms `ease-in-out`. Reveal: content from blur 2px + opacity 0 in 400ms `ease-in-out`; skeleton out in 250ms. Lines stagger 40ms. |
| **Shimmer** | 8 | Masked gradient band (background-size 400%) sweeps `background-position` 100% to 0 in 2000ms `linear`, infinite. Base text #7C7C7C, highlight full-contrast. Paused under reduced motion. |
| **Streaming words** | 8 | Each word resolves as it arrives: opacity 0 to 1, blur 0.042em to 0, translateY 0.14em to 0, 455ms `--ease-out`. No stagger beyond arrival order. A 'jump to latest' pill uses Pop-in. |
| **Stagger reveal** | 26 | Items rise 12px with 2px blur and opacity, 400ms `--ease-out`, 40ms stagger (two-line headlines offset 80ms). Cap the cascade at 300ms total; later items start together. |
| **Toast stack** | 7 | Enter: rise 12px, scale 0.97, blur 2px to rest in 350ms `--ease-out`. Exit 250ms. Stacked depth: each level scale -6%, blur 1px/2px, opacity -40%, peeking 12px. Hover spreads them with an 8px gap in 350ms. |
| **Pointer tilt** | 16 | perspective 1000px; rotate up to the component's max; follow 400ms `--ease-out`, return to rest 1000ms `--ease-out`; glare opacity 0.32 fading in 300ms. Disabled for touch and reduced motion. |
| **Drag + release** | 129 | While dragging: transform follows the pointer with no transition. On release: carry the pointer velocity into a spring (snappy UI: stiffness 380, damping 32; soft objects: 170, 26; mass 1). Past bounds, rubber-band at 0.55x. Snap targets resolve with the same spring. |
| **Scroll-linked** | 40 | Values are a pure function of scroll progress (no CSS transitions on bound properties). Smooth only with a per-frame lerp of 0.12. Pinned scenes use `position: sticky`. Reduced motion: jump between states. |
| **Ambient loop** | 129 | Time-based (not frame-count) rAF loop; pauses when offscreen (IntersectionObserver) or the tab is hidden; pointer influence eases with a 0.08 to 0.18 per-frame lerp. Reduced motion: render one still frame. |
| **Page slide** | 7 | Forward: outgoing x to -30px + opacity 0, incoming from +30px, 350ms `--ease-out`, 2px blur on both. Back: mirrored. Shared elements FLIP instead of fading. |
| **Hover reveal** | 16 | Caption/peek/chevron: shift 2px (chevron opens 8deg), 350ms `--ease-out` in and out; image peek scales 0.97 to 1 with opacity 250ms, following the pointer at 160ms. |
| **Dissolve** | 8 | Per word (or per fragment): blur 0 to 3px, opacity to 0, drift 8px, 400ms `--ease-out`, 40ms stagger. Undo restores with the Stagger reveal. |
| **Progress** | 22 | Width / stroke-dashoffset 350 to 500ms `--ease-out` per update (never linear except continuous indeterminate loops). Completion hands off to Icon swap (spinner pops into a drawn check: rotate 80deg to 0, blur 10px to 0, 500ms). |
| **Cursor follow** | 105 | Follower position lerps per frame: 0.18 (snappy) or 0.08 (lazy). Over targets: scale/morph 150ms `--ease-out`; leaving 250ms. Hidden on touch; reduced motion keeps the native cursor. |
| **FLIP reflow** | 13 | Measure first and last positions; items travel to their new place with transform only, 350ms `--ease-out`, 40ms stagger in reading order. Leaving items scale to 0.96 + opacity 0 in 150ms first; arriving items use Stagger reveal. No fades on items that merely move. |
| **Field focus** | 3 | Focus ring and border 150ms `--ease-out`. Floating label lifts 6px and scales to 0.85 in 250ms `--ease-out` (stays up while the field has a value). Caret appears with the focus, no blink delay. Helper/error text uses Text swap. |
| **Button morph** | 7 | Width + radius morph 350ms `--ease-settle`; label uses Text swap; loading spinner hands off to Icon swap; success state holds 1.5s then reverses with 250ms `--ease-out`. |

## 4. Current state of the library

Audit of all 399 components in the repo (CSS and JS of every demo):

- **96** use at least one easing curve outside the system. The repo uses 64 distinct curves; the default is already `cubic-bezier(.22,1,.36,1)` (129 uses), so most fixes are swaps to a token.
- **33** use sub-second durations off the scale (for example 55ms, 110ms, 170ms, 270ms, 450ms). Snap each to the nearest token.
- **60** have no reduced-motion path. Add one per Principle 10.
- **10** use `linear` on a UI transition. Linear is only for loops, shimmer, marquee and scrubbing.

Most-used off-system curves and what replaces them:

| Curve in repo | Uses | Replace with |
|---|---|---|
| `cubic-bezier(.2,.8,.2,1)` | 17 | `--ease-out` |
| `cubic-bezier(.76,0,.24,1)` | 9 | `--ease-in-out` (symmetric move or cross-fade) |
| `cubic-bezier(.65,0,.35,1)` | 7 | `--ease-in-out` (symmetric move or cross-fade) |
| `cubic-bezier(.22,.9,.3,1.2)` | 5 | `--ease-settle` |
| `cubic-bezier(.16,1,.3,1)` | 4 | `--ease-out` |
| `cubic-bezier(.37,0,.63,1)` | 4 | `--ease-in-out` (symmetric move or cross-fade) |
| `cubic-bezier(.2,.75,.2,1)` | 3 | `--ease-out` |
| `cubic-bezier(.2,.72,.2,1)` | 3 | `--ease-out` |
| `cubic-bezier(.55,0,.8,.25)` | 3 | `--ease-close` (accelerating exit) |
| `cubic-bezier(.18,.9,.2,1.18)` | 3 | `--ease-settle` |
| `cubic-bezier(.2,.85,.25,1.13)` | 3 | `--ease-settle` |
| `cubic-bezier(.77,0,.175,1)` | 2 | `--ease-in-out` (symmetric move or cross-fade) |
| `cubic-bezier(.16,.8,.2,1)` | 2 | `--ease-out` |
| `cubic-bezier(.62,.02,.28,1)` | 2 | `--ease-in-out` (symmetric move or cross-fade) |
| `cubic-bezier(.2,.8,.18,1)` | 2 | `--ease-out` |
| `cubic-bezier(.2,.8,.25,1)` | 2 | `--ease-out` |
| `cubic-bezier(.2,.8,.25,1.25)` | 2 | `--ease-settle` |
| `cubic-bezier(.2,.8,.25,1.3)` | 2 | `--ease-pop` (or `--ease-pop-strong` for like bursts) |

## 5. Per-component motion spec

Trigger is the gesture the demo responds to. Recipes are applied in order: the first is the main transition. Fixes list what the current code needs to meet the system.

### Scroll (22)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `lenis-smooth-scroll` | Scroll | Scroll-linked | meets system |
| `scroll-reveal-stagger` | Scroll | Stagger reveal → Scroll-linked | 1 off-system curve; durations 700ms off-scale; no reduced-motion path |
| `parallax-layers` | Scroll | Scroll-linked | meets system |
| `horizontal-scroll` | Scroll | Scroll-linked | meets system |
| `sticky-stack` | Scroll | Scroll-linked → Toast stack | meets system |
| `scroll-progress` | Scroll | Scroll-linked → Progress | meets system |
| `velocity-skew` | Scroll | Scroll-linked | no reduced-motion path |
| `scroll-zoom` | Scroll | Scroll-linked | meets system |
| `scroll-text-highlight` | Scroll | Scroll-linked | durations 90ms off-scale |
| `scroll-image-sequence` | Scroll | Scroll-linked | meets system |
| `scroll-svg-draw` | Scroll | Scroll-linked | meets system |
| `scroll-rotate-gallery` | Scroll | Scroll-linked | meets system |
| `scroll-split-screen` | Scroll | Scroll-linked → Stagger reveal | meets system |
| `scroll-marquee-direction` | Scroll | Scroll-linked → Ambient loop | meets system |
| `scroll-counter-rotate` | Scroll | Scroll-linked | meets system |
| `scroll-depth-tunnel` | Scroll | Scroll-linked | meets system |
| `scroll-letter-scatter` | Scroll | Scroll-linked | meets system |
| `scroll-color-theme` | Scroll | Scroll-linked | meets system |
| `scroll-clip-morph` | Scroll | Scroll-linked | meets system |
| `scroll-table-of-contents` | Scroll | Scroll-linked → Sliding indicator | meets system |
| `scroll-inertia-grid` | Scroll | Scroll-linked | meets system |
| `scroll-video-scrubber` | Scroll | Scroll-linked → Drag + release | meets system |

### Cursor (25)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `cursor-gooey-blob` | Hover | Cursor follow | meets system |
| `cursor-particle-emitter` | Hover | Cursor follow → Ambient loop | meets system |
| `cursor-elastic-line` | Drag | Drag + release → Cursor follow | meets system |
| `cursor-inverted-lens` | Hover | Cursor follow | meets system |
| `cursor-text-repel` | Hover | Cursor follow → Drag + release | meets system |
| `cursor-grid-ripple` | Hover | Cursor follow → Ambient loop | meets system |
| `cursor-hover-preview` | Hover | Hover reveal → Cursor follow | meets system |
| `cursor-drag-ghost` | Drag | Drag + release | meets system |
| `cursor-eyes-follow` | Hover | Cursor follow | meets system |
| `cursor-liquid-metaball` | Hover | Cursor follow → Ambient loop | meets system |
| `cursor-rope-trail` | Drag | Drag + release → Cursor follow | meets system |
| `cursor-velocity-stretch` | Hover | Cursor follow | meets system |
| `cursor-snap-targets` | Hover | Cursor follow → Button morph | meets system |
| `cursor-flashlight-noise` | Hover | Cursor follow → Ambient loop | meets system |
| `cursor-emoji-rain` | Press | Press → Ambient loop | meets system |
| `cursor-magnetic-grid-lines` | Hover | Cursor follow → Ambient loop | meets system |
| `cursor-heat-shimmer` | Hover | Cursor follow → Ambient loop | meets system |
| `cursor-crosshair-hud` | Hover | Cursor follow → Pop-in | meets system |
| `cursor-pull-distort` | Drag | Drag + release → Cursor follow | meets system |
| `cursor-shadow-parallax` | Hover | Cursor follow → Pointer tilt | meets system |
| `custom-cursor` | Hover | Cursor follow | no reduced-motion path |
| `magnetic-button` | Hover | Cursor follow → Press | no reduced-motion path |
| `image-trail` | Hover | Cursor follow → Pop-in | no reduced-motion path |
| `spotlight-mask` | Hover | Cursor follow | no reduced-motion path |
| `tilt-card` | Hover | Pointer tilt | meets system |

### Text & Type (23)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `split-text-reveal` | Scroll | Stagger reveal | no reduced-motion path |
| `text-scramble` | Hover | Text swap | no reduced-motion path |
| `kinetic-marquee` | Scroll | Scroll-linked → Ambient loop | no reduced-motion path |
| `line-mask-reveal` | Scroll | Stagger reveal | 1 off-system curve; durations 900ms off-scale; no reduced-motion path |
| `letter-roll` | Hover | Text swap | 1 off-system curve |
| `proximity-type` | Hover | Cursor follow | no reduced-motion path |
| `stat-counter` | Scroll | Number drum | meets system |
| `text-wave-hover` | Hover | Cursor follow → Stagger reveal | meets system |
| `text-clip-image` | Hover | Ambient loop | meets system |
| `text-typewriter-caret` | Ambient | Streaming words | meets system |
| `text-falling-letters` | Press | Drag + release | meets system |
| `text-blur-focus` | Scroll | Stagger reveal | meets system |
| `text-strike-reveal` | Hover | Hover reveal → Text swap | 1 off-system curve |
| `text-anagram-shuffle` | Press | FLIP reflow | meets system |
| `text-outline-fill-scroll` | Scroll | Hover reveal | meets system |
| `text-ransom-note` | Hover | FLIP reflow | meets system |
| `text-glitch-layers` | Hover | Ambient loop | meets system |
| `text-circular-spin` | Ambient | Ambient loop | meets system |
| `text-accordion-squeeze` | Hover | Accordion | meets system |
| `text-underline-magic` | Hover | Sliding indicator | meets system |
| `text-numbers-slot` | Press | Number drum | meets system |
| `text-highlighter-swipe` | Scroll | Scroll-linked → Stagger reveal | meets system |
| `text-broken-grid` | Hover | FLIP reflow | meets system |

### Image & WebGL (23)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `webgl-distortion` | Hover | Cursor follow → Ambient loop | no reduced-motion path |
| `particle-dissolve` | Press | Dissolve → Ambient loop | no reduced-motion path |
| `clip-reveal` | Press | Stagger reveal | 1 off-system curve |
| `hover-zoom-card` | Hover | Hover lift | durations 800ms off-scale |
| `pixelate-reveal` | Press | Progress → Ambient loop | no reduced-motion path |
| `grayscale-grid` | Hover | Hover lift | durations 450ms off-scale |
| `webgl-ripple-click` | Press | Press → Ambient loop | meets system |
| `webgl-pixel-river` | Hover | Ambient loop → Cursor follow | meets system |
| `webgl-fisheye-hover` | Hover | Cursor follow → Ambient loop | meets system |
| `webgl-static-tv` | Hover | Ambient loop | meets system |
| `webgl-kaleidoscope` | Hover | Cursor follow → Ambient loop | meets system |
| `webgl-vertex-wave` | Hover | Cursor follow → Ambient loop | meets system |
| `image-slice-hover` | Hover | Hover reveal → Pointer tilt | 2 off-system curves |
| `image-infinite-zoom` | Hover | Ambient loop → Cursor follow | meets system |
| `comparison-slider` | Drag | Drag + release | no reduced-motion path |
| `kenburns-crossfade` | Ambient | Ambient loop | meets system |
| `image-duotone-swap` | Hover | Hover reveal → Ambient loop | 1 off-system curve |
| `image-shatter-click` | Press | Dissolve | meets system |
| `image-blinds-reveal` | Hover | Hover reveal | 1 off-system curve |
| `image-magnetic-tiles` | Hover | Cursor follow | meets system |
| `webgl-hologram-particles` | Hover | Cursor follow → Ambient loop | meets system |
| `webgl-neural-signals` | Hover | Ambient loop → Tooltip | meets system |
| `painterly-smear` | Hover | Cursor follow → Ambient loop | meets system |

### SVG & Line (10)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `svg-path-draw-hover` | Hover | Check / path draw → Hover lift | 1 off-system curve |
| `svg-blob-morph` | Ambient | Ambient loop → Cursor follow | meets system |
| `svg-squiggle-underline` | Hover | Check / path draw | 1 off-system curve |
| `svg-line-graph-live` | Ambient | Check / path draw → Number fade | 1 off-system curve |
| `svg-marching-ants` | Drag | Ambient loop | meets system |
| `svg-signature-write` | Draw | Check / path draw | meets system |
| `svg-gooey-menu` | Press | Origin-aware menu | 1 off-system curve |
| `svg-topographic-drift` | Hover | Ambient loop | meets system |
| `svg-circuit-pulse` | Ambient | Ambient loop | meets system |
| `svg-lissajous-loader` | Ambient | Ambient loop | meets system |

### 3D & Perspective (12)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `css3d-cube-nav` | Press | Page slide → Drag + release | 1 off-system curve |
| `css3d-card-flip-grid` | Hover | Pointer tilt → Stagger reveal | 1 off-system curve |
| `css3d-book-page` | Drag | Drag + release → Page slide | 1 off-system curve |
| `css3d-carousel-cylinder` | Drag | Drag + release | meets system |
| `css3d-parallax-room` | Hover | Pointer tilt | meets system |
| `css3d-isometric-hover` | Hover | Pointer tilt | 1 off-system curve |
| `css3d-folding-map` | Press | Stagger reveal | 1 off-system curve; durations 240/95ms off-scale |
| `webgl-point-globe` | Drag | Drag + release → Ambient loop | meets system |
| `webgl-wobbly-sphere` | Hover | Cursor follow → Ambient loop | meets system |
| `css3d-depth-hero` | Hover | Pointer tilt | linear on a UI transition |
| `voxel-assemble` | Press | Stagger reveal → Ambient loop | meets system |
| `css3d-exploded-device` | Scroll | Pointer tilt → Scroll-linked | durations 120/620ms off-scale |

### Physics (10)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `spring-cursor-follower` | Hover | Cursor follow → Drag + release | meets system |
| `pendulum-tags` | Drag | Drag + release | meets system |
| `chain-links` | Drag | Drag + release | meets system |
| `gravity-drop-icons` | Drag | Drag + release | meets system |
| `collision-bubbles` | Hover | Cursor follow → Drag + release | meets system |
| `soft-body-blob` | Press | Drag + release | meets system |
| `cloth-flag` | Drag | Drag + release | meets system |
| `wrecking-ball-text` | Press | Drag + release | meets system |
| `inertia-window-drag` | Drag | Drag + release | meets system |
| `magnet-snap-grid` | Drag | Drag + release | meets system |

### Liquid & Organic (10)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `liquid-blob-buttons` | Hover | Cursor follow → Press | 1 off-system curve |
| `ferrofluid-dots` | Hover | Cursor follow → Ambient loop | meets system |
| `water-ripple-2d` | Drag | Drag + release → Ambient loop | meets system |
| `lava-lamp` | Ambient | Ambient loop | meets system |
| `ink-bleed-reveal` | Press | Press → Ambient loop | meets system |
| `melt-drip-text` | Hover | Cursor follow → Ambient loop | meets system |
| `smoke-wisps` | Hover | Cursor follow → Ambient loop | no reduced-motion path |
| `bubble-float-pop` | Hover | Cursor follow → Ambient loop | no reduced-motion path |
| `liquid-image-ripple` | Hover | Cursor follow → Ambient loop | meets system |
| `liquid-mask-reveal` | Hover | Cursor follow → Hover reveal | meets system |

### Galleries & Sliders (13)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `slider-elastic-edges` | Drag | Drag + release | meets system |
| `slider-progress-fraction` | Press | Sliding indicator → Number drum | meets system |
| `slider-clip-transition` | Press | Page slide | meets system |
| `slider-stack-deck` | Drag | Drag + release → Toast stack | 1 off-system curve |
| `slider-fullbleed-parallax` | Press | Page slide → Scroll-linked | meets system |
| `gallery-filmstrip-scrub` | Hover | Cursor follow | linear on a UI transition |
| `gallery-expanding-columns` | Hover | FLIP reflow | meets system |
| `gallery-honeycomb` | Hover | Hover lift | durations 55ms off-scale |
| `gallery-random-stack` | Press | FLIP reflow → Pop-in | meets system |
| `gallery-dual-row-drift` | Hover | Ambient loop → FLIP reflow | meets system |
| `lightbox-flip-zoom` | Press | Modal | 1 off-system curve |
| `slider-wheel-3d` | Drag | Drag + release | meets system |
| `scrollsnap-carousel` | Scroll | Scroll-linked → Sliding indicator | meets system |

### Navigation & Menus (13)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `menu-fullscreen-overlay` | Press | Modal → Stagger reveal | durations 75/110ms off-scale |
| `menu-split-reveal` | Press | Panel / morph → Stagger reveal | 1 off-system curve; durations 70ms off-scale |
| `menu-circular-expand` | Press | Panel / morph → Icon swap | 1 off-system curve; durations 65ms off-scale |
| `nav-blur-elevate` | Scroll | Scroll-linked | meets system |
| `nav-hide-reveal` | Scroll | Scroll-linked | 1 off-system curve |
| `nav-active-pill` | Press | Sliding indicator | meets system |
| `menu-letter-cascade` | Hover | Stagger reveal | meets system |
| `menu-image-peek` | Hover | Hover reveal → Cursor follow | meets system |
| `breadcrumb-collapse` | Press | Panel / morph | durations 55ms off-scale |
| `tab-morph-content` | Press | Sliding indicator → Panel / morph | meets system |
| `sidebar-rail-expand` | Press | Panel / morph → Stagger reveal | durations 125/170/215ms off-scale |
| `burger-morph-x` | Press | Icon swap | durations 170/65ms off-scale |
| `mega-menu-preview` | Hover | Origin-aware menu → Panel / morph | durations 120/190/70/110ms off-scale; linear on a UI transition |

### Buttons & Micro (15)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `btn-border-beam` | Ambient | Shimmer → Press | 1 off-system curve |
| `btn-shimmer-sweep` | Ambient | Shimmer → Press | 1 off-system curve |
| `btn-text-slide-swap` | Hover | Text swap → Press | 1 off-system curve |
| `btn-icon-hop` | Hover | Icon swap → Press | 1 off-system curve |
| `btn-success-morph` | Press | Button morph | meets system |
| `btn-confetti-burst` | Press | Like burst → Press | meets system |
| `btn-ripple-material` | Press | Press | 1 off-system curve |
| `btn-jelly-press` | Press | Press → Drag + release | 1 off-system curve |
| `like-heart-particles` | Press | Like burst | 2 off-system curves |
| `checkbox-draw-check` | Press | Check / path draw | 1 off-system curve |
| `toggle-day-night` | Press | Toggle → Sliding indicator | 1 off-system curve; durations 45ms off-scale |
| `copy-inline-feedback` | Press | Icon swap → Pop-in | 2 off-system curves |
| `hover-tooltip-spring` | Hover | Tooltip | 1 off-system curve |
| `badge-notification-pop` | Ambient | Pop-in → Number fade | 2 off-system curves |
| `btn-polish-stages` | Press | Press → Hover lift | 1 off-system curve |

### Forms & Inputs (10)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `input-float-label` | Type | Field focus | meets system |
| `input-underline-grow` | Focus | Field focus → Sliding indicator | meets system |
| `input-shake-error` | Submit | Error shake | 1 off-system curve |
| `input-char-counter-arc` | Type | Progress → Number fade | meets system |
| `otp-code-boxes` | Press | Field focus → Pop-in | 1 off-system curve |
| `password-strength-bar` | Type | Progress → Check / path draw | meets system |
| `select-morph-dropdown` | Press | Origin-aware menu → Panel / morph | meets system |
| `range-elastic-thumb` | Drag | Drag + release | 1 off-system curve; linear on a UI transition |
| `textarea-auto-grow` | Type | Accordion | meets system |
| `form-multistep-progress` | Press | Sliding indicator → Progress | meets system |

### Loaders & Progress (10)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `preloader-percentage` | Ambient | Number drum → Progress | 1 off-system curve |
| `preloader-word-cycle` | Ambient | Text swap | 1 off-system curve |
| `loader-dots-wave` | Ambient | Ambient loop | meets system |
| `loader-morph-shapes` | Ambient | Ambient loop | meets system |
| `loader-typing-code` | Press | Streaming words | meets system |
| `skeleton-shimmer` | Press | Skeleton reveal → Shimmer | meets system |
| `progress-blob-fill` | Ambient | Progress → Ambient loop | meets system |
| `loader-orbit-dots` | Ambient | Ambient loop | meets system |
| `upload-progress-morph` | Press | Progress → Icon swap | meets system |
| `page-load-counter-slide` | Ambient | Number drum | 1 off-system curve |

### Data & Numbers (6)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `chart-bars-race` | Press | FLIP reflow → Number fade | meets system |
| `chart-donut-sweep` | Press | Progress → Hover lift | no reduced-motion path |
| `sparkline-hover-scrub` | Hover | Cursor follow → Tooltip | no reduced-motion path |
| `heatmap-fade-in` | Ambient | Stagger reveal → Tooltip | meets system |
| `ticker-tape-prices` | Ambient | Ambient loop → Number fade | meets system |
| `radar-sweep-blips` | Ambient | Ambient loop | meets system |

### Maps & Geo (6)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `map-topo-extrude` | Hover | Cursor follow → Ambient loop | durations 450/120ms off-scale |
| `map-city-tiles` | Hover | Hover lift → FLIP reflow | durations 240/120/700ms off-scale; linear on a UI transition |
| `map-dot-globe-arcs` | Hover | Ambient loop | meets system |
| `map-route-draw` | Press | Check / path draw → Press | meets system |
| `map-radar-pings` | Hover | Ambient loop → Tooltip | meets system |
| `map-isoline-field` | Hover | Cursor follow → Ambient loop | meets system |

### FUI & Terminal (10)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `fui-status-dashboard` | Hover | Hover lift → Ambient loop | durations 270ms off-scale |
| `fui-target-lock` | Hover | Cursor follow → Pop-in | 1 off-system curve; durations 240/120ms off-scale; linear on a UI transition |
| `fui-terminal-boot` | Ambient | Streaming words → Ambient loop | 1 off-system curve; durations 120/530ms off-scale |
| `fui-waveform-scope` | Hover | Cursor follow → Ambient loop | durations 120ms off-scale |
| `fui-signal-scanner` | Hover | Cursor follow → Ambient loop | meets system |
| `fui-data-stream` | Hover | Ambient loop → Hover lift | meets system |
| `fui-access-granted` | Press | Progress → Icon swap | 1 off-system curve |
| `fui-hex-dump` | Hover | Cursor follow → Tooltip | durations 360ms off-scale |
| `fui-trading-terminal` | Drag | Drag + release → Accordion | 1 off-system curve |
| `fui-orbital-tracker` | Press | Ambient loop → Text swap | 1 off-system curve |

### Agent & AI UI (8)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `agent-token-meter` | Ambient | Number fade → Progress | 1 off-system curve |
| `agent-deploy-pipeline` | Ambient | Progress → Check / path draw | meets system |
| `agent-context-compaction` | Ambient | FLIP reflow → Number fade | meets system |
| `agent-node-graph` | Drag | Drag + release | meets system |
| `agent-streaming-text` | Ambient | Streaming words → Icon swap | meets system |
| `agent-thinking-drawer` | Press | Panel / morph → Shimmer | 1 off-system curve |
| `agent-diff-review` | Press | Stagger reveal → Icon swap | durations 55ms off-scale |
| `agent-knowledge-orbit` | Hover | Ambient loop → Hover lift | meets system |

### Ambient (10)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `particles-constellation` | Hover | Ambient loop → Cursor follow | meets system |
| `gradient-mesh-drift` | Ambient | Ambient loop | meets system |
| `flow-field` | Hover | Ambient loop → Cursor follow | meets system |
| `starfield-warp` | Hover | Ambient loop | meets system |
| `conway-life-fade` | Ambient | Ambient loop | meets system |
| `audio-reactive-bars` | Hover | Ambient loop | meets system |
| `matrix-rain` | Hover | Ambient loop → Cursor follow | meets system |
| `fireflies-night` | Hover | Ambient loop → Cursor follow | meets system |
| `aurora-curtains` | Hover | Ambient loop → Cursor follow | meets system |
| `rain-window` | Press | Ambient loop → Press | meets system |

### Sound & Haptics (6)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `ui-sound-kit` | Hover | Press → Hover lift | no reduced-motion path |
| `typing-mechanical` | Type | Press | no reduced-motion path |
| `theremin-pad` | Drag | Drag + release | no reduced-motion path |
| `notification-chime-stack` | Press | Toast stack | 2 off-system curves; no reduced-motion path |
| `drum-grid-sequencer` | Press | Press → Toggle | no reduced-motion path |
| `scroll-pitch-drone` | Scroll | Scroll-linked | no reduced-motion path |

### Play & Easter Eggs (8)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `dvd-screensaver` | Ambient | Ambient loop | meets system |
| `konami-unlock` | Keys | Press → Pop-in | 1 off-system curve; no reduced-motion path |
| `click-fireworks` | Press | Press → Ambient loop | meets system |
| `drag-to-break` | Drag | Drag + release | 1 off-system curve; no reduced-motion path |
| `pet-the-blob` | Hover | Cursor follow → Drag + release | 1 off-system curve; no reduced-motion path |
| `gravity-flip-page` | Press | Drag + release | meets system |
| `wobbly-window-drag` | Drag | Drag + release | meets system |
| `snake-in-grid` | Keys | Ambient loop | no reduced-motion path |

### Layout & UI (28)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `bottom-sheet` | Drag | Drag + release → Panel / morph | 1 off-system curve; no reduced-motion path |
| `radial-menu` | Press | Origin-aware menu | 1 off-system curve; no reduced-motion path |
| `elastic-tabs` | Press | Sliding indicator | meets system |
| `masonry-filter` | Press | FLIP reflow | 2 off-system curves; no reduced-motion path |
| `command-palette` | Press | Modal → Origin-aware menu | 1 off-system curve; no reduced-motion path |
| `toast-stack` | Press | Toast stack | 1 off-system curve; no reduced-motion path |
| `number-input-drag` | Drag | Drag + release → Number fade | no reduced-motion path |
| `context-menu-custom` | Right-click | Origin-aware menu | 1 off-system curve; no reduced-motion path |
| `resizable-split-pane` | Drag | Drag + release | no reduced-motion path |
| `card-hover-border-gradient` | Hover | Cursor follow | meets system |
| `list-reorder-drag` | Drag | Drag + release → FLIP reflow | 1 off-system curve; no reduced-motion path |
| `zoom-ui-inception` | Press | Modal → Panel / morph | 3 off-system curves; no reduced-motion path |
| `bento-spotlight` | Hover | Cursor follow → Hover lift | 1 off-system curve; durations 650/420/240/55ms off-scale |
| `swap-widget` | Press | Icon swap → FLIP reflow | meets system |
| `drag-collapse-panel` | Drag | Drag + release → Panel / morph | meets system |
| `popover-anchor-morph` | Press | Panel / morph | 1 off-system curve |
| `table-image-idle` | Hover | Hover reveal → Cursor follow | meets system |
| `caption-pull-hover` | Hover | Hover reveal | durations 245/175/140/340ms off-scale |
| `hero-spotlight-reveal` | Hover | Cursor follow → Stagger reveal | durations 900/700/370/850ms off-scale |
| `mac-window` | Press | Modal → Panel / morph | 1 off-system curve; durations 550/450ms off-scale |
| `dock-magnify` | Hover | Cursor follow | no reduced-motion path |
| `flip-expand` | Press | Modal → FLIP reflow | 1 off-system curve; no reduced-motion path |
| `smooth-accordion` | Press | Accordion | durations 450ms off-scale; no reduced-motion path |
| `spring-modal` | Press | Modal | 1 off-system curve; durations 450ms off-scale; no reduced-motion path |
| `drag-carousel` | Drag | Drag + release | no reduced-motion path |
| `hover-fill-button` | Hover | Hover reveal → Press | durations 450ms off-scale; no reduced-motion path |
| `page-transition` | Press | Page slide | 1 off-system curve; durations 210ms off-scale; no reduced-motion path |
| `logo-marquee` | Ambient | Ambient loop | no reduced-motion path |

### Raster & Glitch (29)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `dither-bayer` | Hover | Cursor follow → Ambient loop | meets system |
| `dither-floyd-steinberg` | Hover | Cursor follow → Ambient loop | meets system |
| `dither-blue-noise` | Press | Dissolve → Ambient loop | meets system |
| `halftone-dots` | Hover | Cursor follow → Ambient loop | meets system |
| `halftone-lines` | Hover | Cursor follow → Ambient loop | meets system |
| `ascii-render` | Hover | Cursor follow → Ambient loop | meets system |
| `ascii-webcam-style-wave` | Hover | Ambient loop | meets system |
| `ascii-donut-3d` | Drag | Drag + release → Ambient loop | meets system |
| `ascii-fire` | Hover | Cursor follow → Ambient loop | meets system |
| `ascii-fluid-stir` | Drag | Drag + release → Ambient loop | meets system |
| `ascii-portrait-reveal` | Hover | Cursor follow → Ambient loop | meets system |
| `ascii-morph` | Press | Dissolve → Ambient loop | meets system |
| `ascii-type-explode` | Type | Dissolve → Ambient loop | meets system |
| `terminal-window` | Drag | Drag + release → Streaming words | durations 530ms off-scale |
| `dot-matrix-shapes` | Hover | Cursor follow → Ambient loop | meets system |
| `halftone-globe-canvas` | Hover | Cursor follow → Ambient loop | meets system |
| `engraving-lines-warp` | Hover | Cursor follow → Ambient loop | meets system |
| `pixel-lissajous-lab` | Drag | Drag + release → Ambient loop | meets system |
| `glitch-rgb-slices` | Hover | Ambient loop | meets system |
| `glitch-datamosh-blocks` | Hover | Ambient loop | meets system |
| `scanline-crt` | Hover | Ambient loop | meets system |
| `vhs-tracking` | Hover | Ambient loop | meets system |
| `pixel-sort` | Hover | Cursor follow → Ambient loop | meets system |
| `noise-grain-overlay` | Ambient | Ambient loop | meets system |
| `threshold-mosaic-transition` | Press | Page slide → Ambient loop | meets system |
| `bitmap-font-marquee` | Hover | Ambient loop → Cursor follow | meets system |
| `interlace-flicker` | Hover | Ambient loop | meets system |
| `posterize-hover` | Hover | Cursor follow → Ambient loop | meets system |
| `chromatic-type` | Hover | Cursor follow | meets system |

### Skeuomorph (20)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `neumorphic-buttons` | Press | Press | 1 off-system curve |
| `mechanical-switch` | Press | Toggle → Press | 1 off-system curve |
| `rotary-knob` | Drag | Drag + release | meets system |
| `brushed-metal-slider` | Drag | Drag + release | meets system |
| `paper-stack-cards` | Press | Check / path draw → Page slide | 1 off-system curve |
| `glass-refraction-card` | Hover | Pointer tilt | 1 off-system curve |
| `led-segment-display` | Press | Number fade | meets system |
| `flip-clock` | Press | Number drum | 1 off-system curve |
| `embossed-press` | Press | Press → Icon swap | meets system |
| `analog-gauge` | Drag | Drag + release | meets system |
| `punch-card-keyboard` | Press | Press | meets system |
| `cassette-reels` | Press | Ambient loop → Press | meets system |
| `slot-machine-reel` | Press | Number drum | 2 off-system curves |
| `zippo-flame` | Press | Button morph → Ambient loop | 1 off-system curve |
| `torn-paper-edge` | Drag | Drag + release | meets system |
| `wax-seal-stamp` | Press | Press → Dissolve | meets system |
| `op1-panel` | Press | Press → Drag + release | meets system |
| `dynamic-notch` | Press | Panel / morph | 1 off-system curve |
| `vinyl-player-card` | Press | Ambient loop → Sliding indicator | 1 off-system curve |
| `foil-trading-card` | Hover | Pointer tilt | meets system |

### Interactive Showcase (16)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `showcase-dot-field` | Hover | Cursor follow → Ambient loop | meets system |
| `showcase-threads` | Hover | Cursor follow → Ambient loop | meets system |
| `showcase-ballpit` | Hover | Drag + release → Ambient loop | meets system |
| `showcase-ripple-grid` | Hover | Cursor follow → Ambient loop | meets system |
| `showcase-magnet-lines` | Hover | Cursor follow → Ambient loop | meets system |
| `showcase-pixel-trail` | Draw | Cursor follow → Ambient loop | meets system |
| `showcase-ribbons` | Hover | Cursor follow → Ambient loop | meets system |
| `showcase-mesh-surface` | Hover | Cursor follow → Ambient loop | meets system |
| `showcase-warp-tunnel` | Hover | Cursor follow → Ambient loop | meets system |
| `showcase-converging-paths` | Scroll | Scroll-linked | meets system |
| `showcase-orbital-path` | Drag | Drag + release → Scroll-linked | meets system |
| `showcase-mask-reveal` | Hover | Cursor follow → Hover reveal | meets system |
| `showcase-circular-gallery` | Drag | Drag + release | meets system |
| `showcase-card-swap` | Drag | Drag + release → Toast stack | 1 off-system curve |
| `showcase-tracing-story` | Scroll | Scroll-linked | meets system |
| `showcase-elastic-slider` | Drag | Drag + release | 1 off-system curve |

### Framer Collection (4)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `framer-formatted-metric` | Press | Number fade | meets system |
| `framer-rolling-balance` | Press | Number drum | meets system |
| `framer-focus-countdown` | Press | Progress → Number fade | meets system |
| `framer-financial-trend` | Press | Sliding indicator → Cursor follow | meets system |

### DRAMS (52)

| Component | Trigger | Recipes | Fixes |
|---|---|---|---|
| `drams-003` | Drag | Drag + release | meets system |
| `drams-004` | Drag | Drag + release | meets system |
| `drams-005` | Drag | Drag + release | 1 off-system curve |
| `drams-009` | Drag | Drag + release | meets system |
| `drams-020` | Drag | Drag + release | meets system |
| `drams-021` | Drag | Drag + release | meets system |
| `drams-022` | Drag | Drag + release | meets system |
| `drams-045` | Drag | Drag + release | meets system |
| `drams-002` | Drag | Drag + release | linear on a UI transition |
| `drams-012` | Drag | Drag + release | linear on a UI transition |
| `drams-034` | Drag | Drag + release | linear on a UI transition |
| `drams-040` | Drag | Drag + release | linear on a UI transition |
| `drams-010` | Hover | Drag + release | 1 off-system curve |
| `drams-043` | Press | Press → Drag + release | meets system |
| `drams-044` | Press | Press → Drag + release | 1 off-system curve |
| `drams-036` | Press | Press → Drag + release | meets system |
| `drams-048` | Drag | Drag + release | meets system |
| `drams-050` | Press | Press → Drag + release | no reduced-motion path |
| `drams-051` | Press | Press → Drag + release | meets system |
| `drams-052` | Drag | Drag + release | no reduced-motion path |
| `drams-053` | Press | Press → Drag + release | no reduced-motion path |
| `drams-008` | Drag | Drag + release | no reduced-motion path |
| `drams-011` | Drag | Drag + release | no reduced-motion path |
| `drams-013` | Drag | Drag + release | no reduced-motion path |
| `drams-015` | Drag | Drag + release | 1 off-system curve; no reduced-motion path |
| `drams-016` | Drag | Drag + release | no reduced-motion path |
| `drams-017` | Press | Press → Drag + release | 1 off-system curve; no reduced-motion path |
| `drams-019` | Drag | Drag + release | no reduced-motion path |
| `drams-025` | Drag | Drag + release | no reduced-motion path |
| `drams-032` | Drag | Drag + release | no reduced-motion path |
| `drams-038` | Drag | Drag + release | no reduced-motion path |
| `drams-046` | Drag | Drag + release | meets system |
| `drams-047` | Press | Press → Drag + release | meets system |
| `drams-001` | Press | Press → Drag + release | 1 off-system curve |
| `drams-006` | Press | Press → Drag + release | meets system |
| `drams-007` | Press | Press → Drag + release | meets system |
| `drams-014` | Drag | Drag + release | 1 off-system curve |
| `drams-018` | Press | Press → Drag + release | 1 off-system curve |
| `drams-023` | Press | Press → Drag + release | 1 off-system curve |
| `drams-024` | Press | Press → Drag + release | 1 off-system curve |
| `drams-026` | Drag | Drag + release | 1 off-system curve |
| `drams-028` | Drag | Drag + release | 1 off-system curve |
| `drams-030` | Drag | Drag + release | 1 off-system curve |
| `drams-027` | Press | Press → Drag + release | meets system |
| `drams-029` | Press | Press → Drag + release | meets system |
| `drams-031` | Press | Press → Drag + release | meets system |
| `drams-033` | Press | Press → Drag + release | meets system |
| `drams-035` | Press | Press → Drag + release | 1 off-system curve |
| `drams-037` | Press | Press → Drag + release | 1 off-system curve |
| `drams-039` | Press | Press → Drag + release | 1 off-system curve |
| `drams-041` | Press | Press → Drag + release | 1 off-system curve |
| `drams-042` | Press | Press → Drag + release | 2 off-system curves |

## 6. Extension components (91) and New components (30)

These are built fresh, so they start on the system: no fixes column.

| Component | Group | Trigger | Recipes |
|---|---|---|---|
| `ai-message-stream` | Agent & AI UI | Ambient | Streaming words |
| `ai-code-block` | Agent & AI UI | Press | Sliding indicator → Icon swap |
| `ai-tool-result` | Agent & AI UI | Press | Accordion |
| `ai-activity-feed` | Agent & AI UI | Ambient | Stagger reveal → Progress |
| `ai-sidebar` | Agent & AI UI | Press | Panel / morph → Press |
| `ai-web-search` | Agent & AI UI | Ambient | Stagger reveal → Streaming words |
| `ai-usage-limits` | Agent & AI UI | Ambient | Number fade |
| `ai-autocomplete` | Agent & AI UI | Type | Streaming words |
| `ai-multi-agent` | Agent & AI UI | Ambient | Stagger reveal → Ambient loop |
| `ai-agent-creator` | Agent & AI UI | Press | Sliding indicator → Panel / morph |
| `micro-stateful-button` | Buttons & Micro | Press | Button morph → Press |
| `micro-escape-button` | Buttons & Micro | Hover | Drag + release |
| `micro-hold-to-pay` | Buttons & Micro | Hold | Button morph → Progress |
| `micro-share-pill` | Buttons & Micro | Press | Origin-aware menu → Sliding indicator → Press |
| `micro-rainbow-shine` | Buttons & Micro | Hover | Shimmer |
| `micro-icon-swap` | Buttons & Micro | Press | Icon swap → Press |
| `micro-award-badge` | Buttons & Micro | Hover | Pointer tilt → Shimmer |
| `micro-holo-badge` | Buttons & Micro | Press | Pointer tilt → Press |
| `micro-peel-sticker` | Buttons & Micro | Drag | Number fade → Drag + release |
| `micro-action-swap` | Buttons & Micro | Press | Icon swap → Press |
| `form-vanish-input` | Forms & Inputs | Press | Dissolve → Press |
| `form-gooey-search` | Forms & Inputs | Press | Press |
| `form-magnetic-select` | Forms & Inputs | Hover | Drag + release → Cursor follow |
| `form-assignee-picker` | Forms & Inputs | Press | Origin-aware menu → Press |
| `form-color-picker` | Forms & Inputs | Drag | Drag + release |
| `form-date-range` | Forms & Inputs | Hover | Sliding indicator |
| `form-multi-select` | Forms & Inputs | Press | Origin-aware menu → Press |
| `form-inline-edit` | Forms & Inputs | Press | Text swap |
| `form-signature-pad` | Forms & Inputs | Drag | Drag + release |
| `form-liquid-toggle` | Forms & Inputs | Press | Toggle |
| `ui-evervault-card` | Layout & UI | Hover | Cursor follow |
| `ui-wobble-card` | Layout & UI | Hover | Pointer tilt |
| `ui-draggable-cards` | Layout & UI | Drag | Drag + release |
| `ui-timeline-progress` | Layout & UI | Scroll | Scroll-linked → Progress |
| `ui-file-tree` | Layout & UI | Press | Accordion |
| `ui-kanban-board` | Layout & UI | Drag | Drag + release |
| `ui-morphing-modal` | Layout & UI | Press | Panel / morph → Modal → Press |
| `ui-feedback-widget` | Layout & UI | Press | Panel / morph → Like burst |
| `ui-bloom-menu` | Layout & UI | Press | Origin-aware menu → Press |
| `ui-realtime-cursors` | Layout & UI | Ambient | Cursor follow |
| `ui-data-table-expand` | Layout & UI | Press | Accordion |
| `ui-availability-scheduler` | Layout & UI | Drag | Drag + release |
| `gallery-apple-cards` | Galleries & Sliders | Drag | Drag + release |
| `gallery-testimonials` | Galleries & Sliders | Ambient | Stagger reveal |
| `gallery-coverflow` | Galleries & Sliders | Drag | Drag + release |
| `gallery-photo-stack` | Galleries & Sliders | Press | Modal → Panel / morph → Toast stack |
| `gallery-bookshelf` | Galleries & Sliders | Hover | Hover reveal → Pointer tilt |
| `nav-pagination-morph` | Navigation & Menus | Press | Sliding indicator → Press |
| `nav-scribble-underline` | Navigation & Menus | Hover | Hover reveal |
| `nav-proximity-links` | Navigation & Menus | Hover | Cursor follow |
| `nav-mobile-tabbar` | Navigation & Menus | Press | Sliding indicator → Pop-in |
| `nav-line-sidebar` | Navigation & Menus | Hover | Cursor follow |
| `text-reveal-card` | Text & Type | Hover | Stagger reveal |
| `text-squiggle-wave` | Text & Type | Hover | Cursor follow |
| `text-gradient-outline` | Text & Type | Hover | Cursor follow |
| `text-container-flip` | Text & Type | Ambient | Text swap → Panel / morph |
| `text-caesar-cipher` | Text & Type | Hover | Number drum |
| `text-fog-wipe` | Text & Type | Hover | Cursor follow → Ambient loop |
| `data-line-tooltip` | Data & Numbers | Hover | Cursor follow → Tooltip |
| `data-funnel` | Data & Numbers | Ambient | Stagger reveal → Number fade |
| `data-treemap` | Data & Numbers | Hover | Hover lift |
| `data-radar-compare` | Data & Numbers | Press | Sliding indicator → Panel / morph |
| `data-world-clock` | Data & Numbers | Drag | Drag + release |
| `data-prediction-market` | Data & Numbers | Press | Number fade → Press |
| `loader-multi-step` | Loaders & Progress | Ambient | Progress |
| `loader-matrix-dots` | Loaders & Progress | Ambient | Ambient loop |
| `loader-blueprint` | Loaders & Progress | Ambient | Progress |
| `loader-trace` | Loaders & Progress | Ambient | Progress |
| `fx-meteors` | Visual FX | Ambient | Ambient loop |
| `fx-vortex` | Visual FX | Ambient | Ambient loop |
| `fx-background-boxes` | Visual FX | Hover | Cursor follow |
| `fx-lamp` | Visual FX | Scroll | Scroll-linked |
| `fx-canvas-reveal` | Visual FX | Hover | Cursor follow → Ambient loop |
| `fx-light-tunnel` | Visual FX | Ambient | Ambient loop |
| `fx-black-hole` | Visual FX | Ambient | Ambient loop → Pointer tilt |
| `fx-dithered-logo` | Visual FX | Hover | Ambient loop → Cursor follow |
| `3d-pin` | 3D & Perspective | Hover | Pointer tilt |
| `3d-marquee-grid` | 3D & Perspective | Ambient | Ambient loop |
| `3d-container-scroll` | 3D & Perspective | Scroll | Scroll-linked |
| `scroll-sticky-reveal` | Scroll | Scroll | Panel / morph → Stagger reveal → Scroll-linked |
| `scroll-hero-parallax` | Scroll | Scroll | Scroll-linked |
| `scroll-parallax-columns` | Scroll | Scroll | Scroll-linked |
| `cursor-following-label` | Cursor | Hover | Cursor follow → Pop-in |
| `cursor-zoom-lens` | Cursor | Hover | Cursor follow |
| `play-plinko` | Play & Easter Eggs | Press | Drag + release → Press |
| `play-slingshot` | Play & Easter Eggs | Drag | Drag + release |
| `play-coin-flip` | Play & Easter Eggs | Press | Drag + release → Press |
| `sound-piano-keys` | Sound & Haptics | Press | Press |
| `skeuo-tear-ticket` | Skeuomorph | Drag | Drag + release |
| `skeuo-lanyard-badge` | Skeuomorph | Drag | Drag + release |
| `skeuo-wallet-cards` | Skeuomorph | Press | Drag + release → Press |

**New (30)**

| Component | Group | Trigger | Recipes |
|---|---|---|---|
| `agent-prompt-composer` | Agent & AI UI | Type | Panel / morph → Press |
| `agent-approval-card` | Agent & AI UI | Press | Panel / morph → Icon swap |
| `agent-image-gen-reveal` | Agent & AI UI | Ambient | Ambient loop → Skeleton reveal |
| `agent-task-checklist` | Agent & AI UI | Ambient | Check / path draw → Shimmer |
| `agent-citation-chips` | Agent & AI UI | Hover | Tooltip |
| `micro-smoke-delete` | Buttons & Micro | Press | Dissolve → Press |
| `micro-inline-confirm` | Buttons & Micro | Hold | Button morph |
| `micro-star-rating` | Buttons & Micro | Hover | Like burst |
| `micro-shimmer-status` | Buttons & Micro | Ambient | Shimmer |
| `ui-folder-peek` | Layout & UI | Hover | Hover reveal |
| `ui-avatar-stack` | Layout & UI | Hover | Toast stack |
| `ui-link-preview` | Layout & UI | Hover | Hover reveal |
| `ui-card-fan` | Layout & UI | Press | Drag + release |
| `ui-onboarding-checklist` | Layout & UI | Press | Check / path draw → Progress |
| `ui-inverse-tabs` | Layout & UI | Press | Sliding indicator → Press |
| `ui-selection-bar` | Layout & UI | Press | Pop-in → Number fade |
| `form-picker-wheel` | Forms & Inputs | Drag | Drag + release |
| `form-precision-scrubber` | Forms & Inputs | Drag | Drag + release |
| `data-activity-rings` | Data & Numbers | Ambient | Progress |
| `data-candlestick-crosshair` | Data & Numbers | Hover | Cursor follow → Tooltip |
| `data-sankey-flow` | Data & Numbers | Ambient | Stagger reveal |
| `nav-pill-condense` | Navigation & Menus | Scroll | Scroll-linked → Panel / morph |
| `fx-liquid-glass` | Visual FX | Drag | Drag + release |
| `fx-plasma-orb` | Visual FX | Ambient | Ambient loop |
| `fx-beam-grid` | Visual FX | Ambient | Ambient loop |
| `fx-particle-text` | Visual FX | Hover | Cursor follow → Ambient loop |
| `agent-voice-orb` | Agent & AI UI | Hold | Ambient loop → Button morph |
| `micro-reaction-bar` | Buttons & Micro | Hover | Cursor follow → Like burst |
| `form-slide-to-confirm` | Forms & Inputs | Drag | Drag + release |
| `form-dropzone-morph` | Forms & Inputs | Press | Panel / morph → Progress |

## 7. Acceptance check for every component

A component is done when all of these hold:

- Uses only the tokens above (grep the demo for `cubic-bezier(` and literal `ms`; both should be zero outside the token block).
- Exit duration is shorter than enter.
- Reversing mid-transition (hover out early, click twice fast) retargets smoothly; no snap, no restart from zero.
- Nothing animates width/height/top/left directly; FLIP or grid rows instead. 60fps in Chrome performance panel at 4x CPU slowdown.
- `prefers-reduced-motion: reduce` gives an opacity-only version and stills any loop.
- Hover motion is absent on touch devices; press feedback is present everywhere.
- Loops and canvases pause offscreen and in hidden tabs.
