# Extension gap analysis: reference libraries vs INTRX

Compiled 14 Nov 2026 from the live catalogues of the ten reference sites:

| Site | Entries reviewed |
|---|---|
| transitions.dev | 45 |
| beUI | 120+ components, blocks and agent items |
| bencho | 167 blocks |
| Aceternity | ~110 |
| ReverseUI | 69 |
| BoardUI | ~150 components, blocks and charts |
| Originkit | 58 functional; the 805 "creative" entries are shader art, mapped to the Visual FX direction |
| HorizonX | tools and textures |
| ObsidianUI | 11 |
| Astryx | design-system primitives only (no motion catalogue) |

Each reference entry was mapped to one of three outcomes:

- **covered:** INTRX already has an equivalent;
- **new (handoff §7):** one of the 30 components already specified;
- **extension:** listed below.

Plain primitives with no interaction story (divider, close button, link button, and so on) are out of scope. INTRX is an interaction library.

**Result:** 91 extension components. With the 30 in §7, the library grows from 399 to **520**. Every extension item is an original implementation under the stage contract (CODEX_HANDOFF_3 §3). Never copy code or assets. `seen` names the pattern family and the sites it appears on.

Design: Figma page **15 · Extension — From reference sites**, board "Library v4 — Extension" (92:174), one tile per item at the v4 standard: one focal element, neutral palette, dock showing the trigger verb. Photos come from the Unsplash photo library on page 02 (see `ASSET_ART_DIRECTION.md` for credits once downloaded).

## Already covered by INTRX (no new work)

| Reference pattern | INTRX equivalent |
|---|---|
| command palette, toast stack, bottom sheet, radial menu | same names |
| tabs | elastic-tabs, tab-morph-content |
| context menu | context-menu-custom |
| resizable panels | resizable-split-pane |
| sortable/reorder list | list-reorder-drag |
| accordion | smooth-accordion |
| morphing/spring modal | spring-modal |
| dock | dock-magnify |
| expandable card | flip-expand |
| page transition | page-transition |
| logo marquee | logo-marquee |
| number field | number-input-drag |
| popover | popover-anchor-morph |
| OTP | otp-code-boxes |
| password strength | password-strength-bar |
| select | select-morph-dropdown |
| range | range-elastic-thumb |
| textarea | textarea-auto-grow |
| multi-step form | form-multistep-progress |
| floating label | input-float-label |
| error shake | input-shake-error |
| skeleton | skeleton-shimmer |
| like | like-heart-particles |
| checkbox | checkbox-draw-check |
| theme toggle | toggle-day-night |
| copy field | copy-inline-feedback |
| tooltip | hover-tooltip-spring |
| notification badge | badge-notification-pop |
| spinner→check | btn-success-morph |
| confetti | btn-confetti-burst |
| moving border | btn-border-beam |
| shimmer button | btn-shimmer-sweep |
| before/after | comparison-slider |
| 3D tilt / glare | 3d-tilt-card |
| magnetic button | magnetic-button |
| image trail | image-trail |
| spotlight | spotlight-hover |
| encrypted/scramble text | text-scramble |
| typewriter | text-typewriter-caret |
| text generate / blur reveal | text-blur-focus |
| flipping board | split-flap timer (skeuo) |
| marquee | kinetic-marquee |
| rolling counter | text-numbers-slot, framer-rolling-balance |
| ticker | ticker-tape-prices |
| radar | radar-sweep-blips |
| globe | map-dot-globe-arcs, webgl-point-globe |
| terminal | fui-terminal-boot, terminal-window |
| matrix rain, starfield, aurora, gradient mesh, dither, ASCII, halftone, CRT, VHS, glitch, grain | same family names |
| tracing beam | showcase-tracing-story |
| SVG mask | spotlight-mask |
| dynamic island / notch | dynamic-notch |
| swipe deck | showcase-card-swap |
| cylinder carousel | css3d-carousel-cylinder |
| eye tracker | cursor-eyes-follow |
| metaballs | cursor-liquid-metaball |
| image accordion | gallery-expanding-columns |
| card stack | slider-stack-deck |
| breadcrumb | breadcrumb-collapse |
| collapsing sidebar | sidebar-rail-expand |
| bento | bento-spotlight |
| focus cards | focus-grid |
| direction-aware hover | hover-fill-button |
| card spotlight | spotlight-hover |
| streaming text | agent-streaming-text |
| thinking states | agent-thinking-drawer |
| file diff | agent-diff-review |

## Extension list (91)

Trigger keys: H hover · P press · D drag · S scroll · T type · A ambient.

### Agent & AI UI (10)

| id | Title | Trg | Sources | Behaviour |
|---|---|---|---|---|
| `ai-message-stream` | Message Stream | A | beUI Message/Message Scroller, BoardUI AI Chat | Messages stream in with typed tokens. The scroller sticks to the bottom and shows a "jump to latest" pill when the user scrolls up. Reactions pop on hover. |
| `ai-code-block` | Code Block | P | beUI Code Block, Aceternity Codeblock | Tabbed code block with line highlight sweep, a copy button that morphs to "Copied", and expand/collapse. |
| `ai-tool-result` | Tool Result Card | P | beUI Tool Result | Collapsed tool-call row (icon, name, duration) expands to show JSON args and result with a height spring. Status dot animates pending → success. |
| `ai-activity-feed` | Agent Activity Feed | A | beUI Agent Activity, BoardUI Agent Progress | Vertical timeline of agent steps. New steps slide in from the top, durations tick live, and finished steps collapse into a summary. |
| `ai-sidebar` | AI Sidebar | P | beUI AI Sidebar | Sidebar slides in from the right, pushing content. Context chips show the current selection; the composer sits at the bottom. |
| `ai-web-search` | Web Search Results | A | BoardUI Web Search | Searching shimmer, then sources fan in as favicon chips, then a summary streams with inline citations. |
| `ai-usage-limits` | Usage Limits Card | A | BoardUI Agent Limits | Usage meters fill and change colour at 80% and 95%. A reset countdown ticks. |
| `ai-autocomplete` | Ghost Autocomplete | T | bencho AI autocomplete | Ghost text completes the sentence in the input; Tab accepts with a slide-in; Esc dismisses. |
| `ai-multi-agent` | Multi-agent Chat | A | BoardUI Multi-agent Chat | Three agent avatars take turns. The active speaker's ring pulses, and handoff arrows animate between them. |
| `ai-agent-creator` | Agent Creator | P | BoardUI Agent Creator | 3-step wizard (role, tools, tone) with a live preview card that updates as options change. |

### Buttons & Micro (10)

| id | Title | Trg | Sources | Behaviour |
|---|---|---|---|---|
| `micro-stateful-button` | Stateful Button | P | Aceternity Stateful Button | Idle → loading (spinner replaces label, width animates) → success or error, then auto-reset. |
| `micro-escape-button` | Escape Button | H | bencho Escape button | The button dodges the pointer within bounds and gives up after 5 tries. Keyboard users get a normal button. |
| `micro-hold-to-pay` | Hold to Pay | P | bencho Pay button | Press and hold fills the button with a progress sweep (900ms) plus a haptic-style scale pulse. Releasing early rewinds. |
| `micro-share-pill` | Share Pill | P | bencho Share pill | Pill expands horizontally to reveal 4 share targets with staggered icons. Copy link shows a toast. |
| `micro-icon-swap` | Icon Swap | P | transitions.dev Icon swap | Icon pairs (play/pause, copy/check, menu/close) cross-rotate and scale with blur. |
| `micro-rainbow-shine` | Rainbow Shine Button | H | ReverseUI Rainbow Shine Button | A conic iridescent highlight follows the pointer along the button border. |
| `micro-award-badge` | Award Badge | H | ReverseUI Award Badge, Cool Badge | Laurel badge tilts toward the pointer with a specular sweep and number count-up. |
| `micro-holo-badge` | Holo Flip Badge | P | Originkit Holo Flip Badge | Conference badge flips on click. The holographic foil shifts with pointer angle. |
| `micro-peel-sticker` | Peel Sticker | D | Originkit Peel Sticker | Dragging the corner peels the sticker with a curl shadow; releasing past 60% removes it. |
| `micro-action-swap` | Action Swap | P | beUI Action Swap | Primary action swaps to its counterpart (Follow ↔ Following) with width morph and label slide. |

### Forms & Inputs (10)

| id | Title | Trg | Sources | Behaviour |
|---|---|---|---|---|
| `form-vanish-input` | Vanish Input | T | Aceternity Placeholders & Vanish Input | Placeholders cycle. On submit the typed text disintegrates into particles that drift up. |
| `form-gooey-search` | Gooey Search | P | Aceternity Gooey Input, Originkit Gooey Search | Search icon blobs out into a field with a gooey SVG filter; the results pill drips below. |
| `form-magnetic-select` | Magnetic Select | H | bencho Magnetic select | The option highlight magnetically follows the pointer between options with a spring. |
| `form-assignee-picker` | Assignee Picker | P | bencho Assignees | Avatar stack button opens a searchable list. Chosen avatars fly into the stack. |
| `form-color-picker` | Color Picker | D | beUI Color Picker, BoardUI | Saturation square, hue rail and swatch history. The preview chip morphs colour smoothly. |
| `form-date-range` | Date Range Picker | P | beUI Date Range Picker | Calendar with a range band that fills between start and hover end. Presets slide in. |
| `form-multi-select` | Multi Select Chips | T | beUI Multi Select | Selected options become chips that FLIP into the field. Backspace removes the last chip. |
| `form-inline-edit` | Inline Edit | P | Originkit Inline Edit | Text morphs into an input in place. Save/Cancel slide in. Enter commits with a success flash. |
| `form-signature-pad` | Signature Pad | D | bencho Signature pad, ReverseUI Signature | Pressure-simulated smooth strokes (Catmull-Rom), with undo and clear. Export preview chip. |
| `form-liquid-toggle` | Liquid Toggle | P | bencho Liquid toggle, Originkit Stretch Pill | The knob stretches like liquid across the track (metaball) before settling. |

### Layout & UI (12)

| id | Title | Trg | Sources | Behaviour |
|---|---|---|---|---|
| `ui-evervault-card` | Encrypted Hover Card | H | Aceternity Evervault Card | Hovering reveals a field of random glyphs masked by a radial gradient around the pointer. |
| `ui-wobble-card` | Wobble Card | H | Aceternity Wobble Card | The card translates and tilts slightly opposite to the pointer, with inner parallax. |
| `ui-draggable-cards` | Draggable Cards | D | Aceternity Draggable Card | Scatter of photo cards that can be thrown with inertia and rotation; double-click re-stacks. |
| `ui-timeline-progress` | Timeline Progress | S | ReverseUI Timeline Progress, Aceternity Timeline | Scroll-linked line fills down a timeline. Entries reveal as the line reaches them. |
| `ui-file-tree` | File Tree | P | beUI File Tree, BoardUI Tree View | Folders expand with height springs and indent guides. The selected file highlights; keyboard navigation works. |
| `ui-kanban-board` | Kanban Board | D | BoardUI Project Board | Drag cards between columns. Placeholders open with FLIP and column counts update. |
| `ui-morphing-modal` | Morphing Modal | P | beUI Morphing Modal, Center Morph Modal | A button morphs into a modal (shared-element) and back. The backdrop blur ramps. |
| `ui-feedback-widget` | Feedback Widget | P | beUI Feedback Widget | Floating button expands into an emoji-free rating plus textarea. Submitting collapses it to a thank-you check. |
| `ui-bloom-menu` | Bloom Menu | P | beUI Bloom Menu | Plus button blooms items along an arc with stagger and rotation. |
| `ui-realtime-cursors` | Realtime Cursors | A | ReverseUI Realtime Collaboration | Named collaborator cursors move with smoothed paths. Selection boxes and comments appear. |
| `ui-data-table-expand` | Data Table Expand | P | BoardUI Data Table, beUI Table | Sortable table. Rows expand to reveal details; the sort arrow animates; the selection bar appears. |
| `ui-availability-scheduler` | Availability Scheduler | D | beUI Availability Scheduler, BoardUI Calendar | Drag across the week grid to paint availability blocks that snap to 30 min. |

### Galleries & Sliders (5)

| id | Title | Trg | Sources | Behaviour |
|---|---|---|---|---|
| `gallery-apple-cards` | Story Cards Carousel | D | Aceternity Apple Cards Carousel | Tall photo cards scroll horizontally. Clicking expands to a full story modal. |
| `gallery-testimonials` | Animated Testimonials | P | Aceternity Animated Testimonials | Portrait stack rotates while the quote reveals word by word. |
| `gallery-coverflow` | Coverflow Drag | D | Originkit Coverflow Drag | 3D coverflow with rotateY and reflection. Dragging snaps to the nearest cover. |
| `gallery-photo-stack` | Photo Stack Lightbox | P | Originkit Photo Stack Lightbox | Stacked prints fan, then open into a lightbox with the shared element. |
| `gallery-bookshelf` | Bookshelf Cover Flip | H | Originkit Bookshelf, bencho Album shelf | Book spines on a shelf. Hovering pulls a book out and rotates it to show the cover. |

### Navigation & Menus (5)

| id | Title | Trg | Sources | Behaviour |
|---|---|---|---|---|
| `nav-pagination-morph` | Pagination Morph | P | beUI Animated Pagination | Active dot morphs into a pill and travels with stretch; numbers roll. |
| `nav-scribble-underline` | Scribble Underline Nav | H | Originkit Scribble Loop Nav | A hand-drawn SVG underline scribbles under the hovered link. |
| `nav-proximity-links` | Proximity Navigation | H | ReverseUI Proximity Navigation | Link weight and size respond to pointer distance with a shared highlight. |
| `nav-mobile-tabbar` | Mobile Tab Bar | P | bencho Tab bar | Bottom tab bar where the active icon lifts into a bubble with a notch cut-out. |
| `nav-line-sidebar` | Line Sidebar | H | bencho Line sidebar | Tick-line sidebar. Hovering grows lines into labels (macOS-style index). |

### Text & Type (6)

| id | Title | Trg | Sources | Behaviour |
|---|---|---|---|---|
| `text-reveal-card` | Text Reveal Card | H | Aceternity Text Reveal Card | The pointer wipes a top text layer to reveal the text beneath, with a sparkle edge. |
| `text-squiggle-wave` | Squiggly Text | H | Aceternity Squiggly Text, Originkit Bloom Wave Text | SVG turbulence displaces the letters into a gentle wave on hover. |
| `text-gradient-outline` | Gradient Outline Hover | H | Aceternity Text Hover Effect | Outlined display text fills with a gradient under a radial mask that follows the pointer. |
| `text-container-flip` | Container Text Flip | A | Aceternity Container Text Flip, Layout Text Flip | A word cycles inside a pill whose width animates to fit each word. |
| `text-caesar-cipher` | Caesar Cipher | H | ReverseUI Caesar Cipher | Letters roll through the alphabet to decode on hover. |
| `text-fog-wipe` | Foggy Word | H | bencho Foggy word | The word sits behind fog (blur + noise) that clears along the pointer path and slowly returns. |

### Data & Numbers (6)

| id | Title | Trg | Sources | Behaviour |
|---|---|---|---|---|
| `data-line-tooltip` | Line Chart Tooltip | H | BoardUI Line/Area Chart, beUI Line Chart | Area chart with a draw-in line, crosshair, tooltip and gradient fill. |
| `data-funnel` | Funnel Chart | A | BoardUI Funnel Chart | Stages shrink in sequence with conversion percentages counting up. |
| `data-treemap` | Treemap | H | beUI Treemap | Squarified tiles. Hovering zooms the tile and dims the rest. |
| `data-radar-compare` | Radar Compare | P | BoardUI Radar Comparison | Two series morph between datasets on toggle. |
| `data-world-clock` | World Clock | D | bencho World clock | Drag the time scrubber; city clocks and day/night arcs update. |
| `data-prediction-market` | Prediction Market | P | beUI Prediction Market, bencho Odds | Yes/No odds bars animate on trade, with a probability sparkline and numeral roll. |

### Loaders & Progress (4)

| id | Title | Trg | Sources | Behaviour |
|---|---|---|---|---|
| `loader-multi-step` | Multi-step Loader | A | Aceternity Multi Step Loader | Steps tick by with checkmarks. The current step sits centered in a scrolling list. |
| `loader-matrix-dots` | Matrix Dot Loader | A | transitions.dev Matrix dot loader | 5×5 dot matrix animates in a diagonal wave. |
| `loader-blueprint` | Blueprint Loader | A | bencho Blueprint loader | Wireframe lines draw a UI card, then fill to the final state. |
| `loader-trace` | Trace Loader | A | bencho Trace loader | A light trace runs around a rounded rectangle path. |

### Visual FX (8)

| id | Title | Cat | Trg | Sources | Behaviour |
|---|---|---|---|---|---|
| `fx-meteors` | Meteors | Ambient | A | Aceternity Meteors, Shooting Stars | Diagonal meteor streaks with tails fall across a card at random intervals. |
| `fx-vortex` | Vortex | Ambient | A | Aceternity Vortex, Originkit Tornado | Particle vortex swirling around the center (canvas, simplex drift). |
| `fx-background-boxes` | Background Boxes | Ambient | H | Aceternity Background Boxes | A skewed grid of cells lights up under the pointer in neutral tones, with the orange accent on the cell under the pointer. |
| `fx-lamp` | Lamp Effect | Ambient | A | Aceternity Lamp Effect | Conic light beams widen from a lamp line onto a heading. |
| `fx-canvas-reveal` | Dot Matrix Reveal | Image & WebGL | H | Aceternity Canvas Reveal Effect | Hover reveals an animated dot-matrix shader inside the card. |
| `fx-light-tunnel` | Light Tunnel | Ambient | A | ReverseUI Light Tunnel | Concentric rounded rectangles rush toward the viewer with light streaks. |
| `fx-black-hole` | Black Hole | Ambient | A | HorizonX Cinematic Black Hole, Originkit Accretion Disc | WebGL accretion disc with gravitational lensing; the pointer tilts the camera. |
| `fx-dithered-logo` | Dithered Logo | Raster & Glitch | H | ReverseUI Dithered Logo / Sketched Logo | Logo rendered as an ordered-dither field that resolves to vector on hover. |

### 3D, Scroll, Cursor (8)

| id | Title | Cat | Trg | Sources | Behaviour |
|---|---|---|---|---|---|
| `3d-pin` | 3D Pin | 3D & Perspective | H | Aceternity 3D Pin | Card tilts back into perspective while a pin beam and ripple rise above it. |
| `3d-marquee-grid` | 3D Marquee | 3D & Perspective | A | Aceternity 3D Marquee | Isometric grid of photo tiles scrolls diagonally in 3D. |
| `3d-container-scroll` | Container Scroll Tilt | 3D & Perspective | S | Aceternity Container Scroll Animation, Macbook Scroll | A device frame rotates from tilted to flat as you scroll. |
| `scroll-sticky-reveal` | Sticky Scroll Reveal | Scroll | S | Aceternity Sticky Scroll Reveal | Left text sections scroll while the right visual swaps with a crossfade. |
| `scroll-hero-parallax` | Hero Parallax | Scroll | S | Aceternity Hero Parallax | Rows of product shots slide horizontally at different speeds while the heading pins. |
| `scroll-parallax-columns` | Parallax Columns | Scroll | S | Aceternity Parallax Scroll | Three photo columns scroll at different rates. |
| `cursor-following-label` | Following Pointer Label | Cursor | H | Aceternity Following Pointer | A custom pointer carries a coloured name label inside a card. |
| `cursor-zoom-lens` | Zoom Lens | Cursor | H | Aceternity Lens | A circular magnifier follows the pointer over a photo at 2.5× zoom. |

### Play, Sound, Skeuomorph (7)

| id | Title | Cat | Trg | Sources | Behaviour |
|---|---|---|---|---|---|
| `play-plinko` | Plinko | Play & Easter Eggs | P | beUI Casino Plinko | Drop a ball through a peg triangle (physics) into multiplier slots that pulse on landing. |
| `play-slingshot` | Slingshot | Play & Easter Eggs | D | bencho Slingshot | Pull back an elastic band; release launches a ball with a trajectory preview. |
| `play-coin-flip` | Coin Flip | Play & Easter Eggs | P | bencho Coin | 3D coin flip with motion blur. The result lands with bounce. |
| `sound-piano-keys` | Piano Keys | Sound & Haptics | P | bencho Piano | One-octave keyboard (WebAudio) with pressed-key depth and note labels. |
| `skeuo-tear-ticket` | Tear-off Ticket | Skeuomorph | D | bencho Ticket, Originkit Flip Invite Ticket | Drag the stub along the perforation to tear it off with a paper-edge reveal. |
| `skeuo-lanyard-badge` | Swinging Lanyard Badge | Skeuomorph | D | Originkit Swinging Lanyard Badge | A badge hangs from a lanyard (verlet rope); drag and release to swing. |
| `skeuo-wallet-cards` | Wallet Cards | Skeuomorph | P | beUI Wallet Card, Originkit Holo Card Dispenser | Cards in a wallet slot. Tapping lifts one out with a sheen while the others tuck. |

## Index by reference site

Every reference entry that led to a new INTRX component, grouped by site. It is generated from the Sources columns above and from handoff §7. Families INTRX already covered are in the first table. A site with no rows contributed only covered patterns, plain primitives or shader art. Use this index when reviewing a new component to confirm it is an original implementation, not a copy of its source.

### transitions.dev (6)

| Reference entry | INTRX id | Origin |
|---|---|---|
| Avatar group | `ui-avatar-stack` | new (§7) |
| delete dissolve | `micro-smoke-delete` | new (§7) |
| Icon swap | `micro-icon-swap` | extension |
| Matrix dot loader | `loader-matrix-dots` | extension |
| placeholder | `agent-image-gen-reveal` | new (§7) |
| Shimmer text | `micro-shimmer-status` | new (§7) |

### beUI (29)

| Reference entry | INTRX id | Origin |
|---|---|---|
| (pattern family) | `data-sankey-flow` | new (§7) |
| Action Swap | `micro-action-swap` | extension |
| Agent Activity | `ai-activity-feed` | extension |
| AI Sidebar | `ai-sidebar` | extension |
| Animated Pagination | `nav-pagination-morph` | extension |
| Approval Card | `agent-approval-card` | new (§7) |
| Availability Scheduler | `ui-availability-scheduler` | extension |
| Bloom Menu | `ui-bloom-menu` | extension |
| Candlestick | `data-candlestick-crosshair` | new (§7) |
| Casino Plinko | `play-plinko` | extension |
| Citations | `agent-citation-chips` | new (§7) |
| Code Block | `ai-code-block` | extension |
| Color Picker | `form-color-picker` | extension |
| Date Range Picker | `form-date-range` | extension |
| Feedback Widget | `ui-feedback-widget` | extension |
| File Tree | `ui-file-tree` | extension |
| Line Chart | `data-line-tooltip` | extension |
| Message/Message Scroller | `ai-message-stream` | extension |
| Morphing Modal | `ui-morphing-modal` | extension |
| Multi Select | `form-multi-select` | extension |
| Prediction Market | `data-prediction-market` | extension |
| Project Folder | `ui-folder-peek` | new (§7) |
| Prompt Input | `agent-prompt-composer` | new (§7) |
| Table | `ui-data-table-expand` | extension |
| Todo List | `agent-task-checklist` | new (§7) |
| Tool Result | `ai-tool-result` | extension |
| Treemap | `data-treemap` | extension |
| Voice Orb | `agent-voice-orb` | new (§7) |
| Wallet Card | `skeuo-wallet-cards` | extension |

### bencho (29)

| Reference entry | INTRX id | Origin |
|---|---|---|
| AI autocomplete | `ai-autocomplete` | extension |
| Album shelf | `gallery-bookshelf` | extension |
| Assignees | `form-assignee-picker` | extension |
| Blueprint loader | `loader-blueprint` | extension |
| Card fan | `ui-card-fan` | new (§7) |
| Coin | `play-coin-flip` | extension |
| Dust delete | `micro-smoke-delete` | new (§7) |
| Emoji reactions | `micro-reaction-bar` | new (§7) |
| Escape button | `micro-escape-button` | extension |
| Foggy word | `text-fog-wipe` | extension |
| Folder | `ui-folder-peek` | new (§7) |
| Inline confirm | `micro-inline-confirm` | new (§7) |
| Line sidebar | `nav-line-sidebar` | extension |
| Liquid toggle | `form-liquid-toggle` | extension |
| Magnetic select | `form-magnetic-select` | extension |
| Odds | `data-prediction-market` | extension |
| Pay button | `micro-hold-to-pay` | extension |
| Piano | `sound-piano-keys` | extension |
| Picker wheel | `form-picker-wheel` | new (§7) |
| Selection actions | `ui-selection-bar` | new (§7) |
| Share pill | `micro-share-pill` | extension |
| Signature pad | `form-signature-pad` | extension |
| Slide to confirm | `form-slide-to-confirm` | new (§7) |
| Slingshot | `play-slingshot` | extension |
| Tab bar | `nav-mobile-tabbar` | extension |
| Ticket | `skeuo-tear-ticket` | extension |
| Trace loader | `loader-trace` | extension |
| Upload dropzone | `form-dropzone-morph` | new (§7) |
| World clock | `data-world-clock` | extension |

### Aceternity (33)

| Reference entry | INTRX id | Origin |
|---|---|---|
| 3D Marquee | `3d-marquee-grid` | extension |
| 3D Pin | `3d-pin` | extension |
| Animated Testimonials | `gallery-testimonials` | extension |
| Apple Cards Carousel | `gallery-apple-cards` | extension |
| Background Beams With Collision | `fx-beam-grid` | new (§7) |
| Background Boxes | `fx-background-boxes` | extension |
| Canvas Reveal Effect | `fx-canvas-reveal` | extension |
| Codeblock | `ai-code-block` | extension |
| Container Scroll Animation | `3d-container-scroll` | extension |
| Container Text Flip | `text-container-flip` | extension |
| Draggable Card | `ui-draggable-cards` | extension |
| Evervault Card | `ui-evervault-card` | extension |
| Following Pointer | `cursor-following-label` | extension |
| Gooey Input | `form-gooey-search` | extension |
| Hero Parallax | `scroll-hero-parallax` | extension |
| Lamp Effect | `fx-lamp` | extension |
| Lens | `cursor-zoom-lens` | extension |
| Link Preview | `ui-link-preview` | new (§7) |
| Liquid Glass | `fx-liquid-glass` | new (§7) |
| loader | `agent-image-gen-reveal` | new (§7) |
| Meteors | `fx-meteors` | extension |
| Multi Step Loader | `loader-multi-step` | extension |
| Parallax Scroll | `scroll-parallax-columns` | extension |
| Placeholders & Vanish Input | `form-vanish-input` | extension |
| Resizable Navbar | `nav-pill-condense` | new (§7) |
| Squiggly Text | `text-squiggle-wave` | extension |
| Stateful Button | `micro-stateful-button` | extension |
| Sticky Scroll Reveal | `scroll-sticky-reveal` | extension |
| Text Hover Effect | `text-gradient-outline` | extension |
| Text Reveal Card | `text-reveal-card` | extension |
| Timeline | `ui-timeline-progress` | extension |
| Vortex | `fx-vortex` | extension |
| Wobble Card | `ui-wobble-card` | extension |

### ReverseUI (15)

| Reference entry | INTRX id | Origin |
|---|---|---|
| Adaptive Precision | `form-precision-scrubber` | new (§7) |
| Award Badge | `micro-award-badge` | extension |
| Caesar Cipher | `text-caesar-cipher` | extension |
| Dithered Logo | `fx-dithered-logo` | extension |
| Exclusion Tabs | `ui-inverse-tabs` | new (§7) |
| Glowing Orb | `agent-voice-orb` | new (§7) |
| Light Tunnel | `fx-light-tunnel` | extension |
| Onboarding Tasks | `ui-onboarding-checklist` | new (§7) |
| Particle Text Reveal | `fx-particle-text` | new (§7) |
| Proximity Navigation | `nav-proximity-links` | extension |
| Rainbow Shine Button | `micro-rainbow-shine` | extension |
| Realtime Collaboration | `ui-realtime-cursors` | extension |
| Signature | `form-signature-pad` | extension |
| Star Rating | `micro-star-rating` | new (§7) |
| Timeline Progress | `ui-timeline-progress` | extension |

### BoardUI (18)

| Reference entry | INTRX id | Origin |
|---|---|---|
| (pattern family) | `form-color-picker` | extension |
| Activity Rings | `data-activity-rings` | new (§7) |
| Agent Creator | `ai-agent-creator` | extension |
| Agent Limits | `ai-usage-limits` | extension |
| Agent Progress | `ai-activity-feed` | extension |
| AI Chat | `ai-message-stream` | extension |
| Calendar | `ui-availability-scheduler` | extension |
| Composer | `agent-prompt-composer` | new (§7) |
| Data Table | `ui-data-table-expand` | extension |
| Funnel Chart | `data-funnel` | extension |
| Line/Area Chart | `data-line-tooltip` | extension |
| Multi-agent Chat | `ai-multi-agent` | extension |
| Project Board | `ui-kanban-board` | extension |
| Radar Comparison | `data-radar-compare` | extension |
| Sankey | `data-sankey-flow` | new (§7) |
| Task List | `agent-task-checklist` | new (§7) |
| Tree View | `ui-file-tree` | extension |
| Web Search | `ai-web-search` | extension |

### Originkit (15)

| Reference entry | INTRX id | Origin |
|---|---|---|
| Accretion Disc | `fx-black-hole` | extension |
| Bloom Wave Text | `text-squiggle-wave` | extension |
| Bookshelf | `gallery-bookshelf` | extension |
| Coverflow Drag | `gallery-coverflow` | extension |
| Flip Invite Ticket | `skeuo-tear-ticket` | extension |
| Gooey Search | `form-gooey-search` | extension |
| Holo Card Dispenser | `skeuo-wallet-cards` | extension |
| Holo Flip Badge | `micro-holo-badge` | extension |
| Inline Edit | `form-inline-edit` | extension |
| Peel Sticker | `micro-peel-sticker` | extension |
| Photo Stack Lightbox | `gallery-photo-stack` | extension |
| Scribble Loop Nav | `nav-scribble-underline` | extension |
| Stretch Pill | `form-liquid-toggle` | extension |
| Swinging Lanyard Badge | `skeuo-lanyard-badge` | extension |
| Tornado | `fx-vortex` | extension |

### HorizonX (3)

| Reference entry | INTRX id | Origin |
|---|---|---|
| (pattern family) | `fx-liquid-glass` | new (§7) |
| Cinematic Black Hole | `fx-black-hole` | extension |
| Plasma Orb | `fx-plasma-orb` | new (§7) |

### ObsidianUI (0)

No new components. This site's entries are covered or out of scope.

### Astryx (0)

No new components. This site's entries are covered or out of scope.

## Monetisation note

Pro candidates (owner decides): `ai-*` (all 10), `ui-kanban-board`, `ui-availability-scheduler`, `ui-data-table-expand`, `fx-black-hole`, `fx-vortex`, `3d-marquee-grid`, `gallery-apple-cards`, `data-*` charts.

This mirrors what the reference sites sell:
- beUI Pro: blocks and agents;
- BoardUI Pro: charts and agentic blocks;
- HorizonX: shaders and heroes;
- Aceternity All-Access: blocks.
