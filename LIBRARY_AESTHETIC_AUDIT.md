# INTRX library redesign and native collection audit

Current review: 6 September 2026. All 399 registered components are covered. The 20 original skeuomorphic components were replaced from scratch, including their markup, CSS, interaction code, descriptions and prompts. The 52 distinct DRAMS components are independently implemented native demos with source and creator attribution.

| Work | Components |
|---|---:|
| Existing components refined |323|
| Original skeuomorphic components rebuilt from scratch |20|
| DRAMS native additions |52|
| Framer data additions |4|
| Total |399|

The [per-component JSON](LIBRARY_AESTHETIC_AUDIT.json) records decisions, evidence paths and observed states for each ID. Screenshot evidence is local under ignored `.artifacts/`; it is not required to run or export the library. Earlier audit decisions are superseded by this review.

## Verified behavior

- Registry: 399 unique valid entries; all 52 DRAMS source URLs match the catalog.
- Full browser suite: 560 checks; 399 real previews load; 97 copied HTML documents execute offline with embedded fonts/assets; no runtime errors.
- Original hardware: 75 root assertions and 51 complementary assertions, plus 10 reduced-motion and 10 teardown cases in the complementary set.
- Refinement: 41 focused typography/DRAMS checks, 32 additional aesthetic/interaction checks, 16 Framer counter checks, and per-scope operation logs linked in JSON.
- Responsive review: 300×320 native demos, wider modal previews, and 390px mobile library navigation/search.

## Design changes

Regular locally hosted Inter replaces unsuitable interface and counter fonts; counters use tabular numerals and moderate weight. The 082 menu now changes its naturally rendered font size without distorting glyphs. The 084 reels, 086 text fragments and broader UI layouts have revised compositions. Gradients use wider soft transitions, quieter strokes and shallow contact shadows. Photographic sources replace schematic illustrated textures where imagery carries the composition. The 20 original hardware demos are complete object-based replacements, including a working synthesizer, cassette transport, split-flap timer, wax-sealed envelope and physical controls.

See [DRAMS implementation notes](DRAMS_IMPLEMENTATION.md), [source catalog](DRAMS_CATALOG.json) and [asset/font licenses](ASSET_ART_DIRECTION.md).

## Coverage

| Category | Count |
|---|---:|
|Interactive Showcase|16|
|Scroll|22|
|Cursor|25|
|Text & Type|23|
|Image & WebGL|23|
|Raster & Glitch|29|
|Skeuomorph|20|
|SVG & Line|10|
|3D & Perspective|12|
|Physics|10|
|Liquid & Organic|10|
|Galleries & Sliders|13|
|Navigation & Menus|13|
|Buttons & Micro|15|
|Forms & Inputs|10|
|Loaders & Progress|10|
|Layout & UI|28|
|Data & Numbers|6|
|Maps & Geo|6|
|FUI & Terminal|10|
|Agent & AI UI|8|
|Ambient|10|
|Sound & Haptics|6|
|Play & Easter Eggs|8|
|Framer Collection|4|
|DRAMS|52|

## Per-component decisions

| No. | Component | Decision |
|---|---|---|
|001|Inertial Dot Field (`showcase-dot-field`)|refined|
|002|Reactive Threads (`showcase-threads`)|refined|
|003|Tactile Ballpit (`showcase-ballpit`)|refined|
|004|Ripple Grid (`showcase-ripple-grid`)|refined|
|005|Magnetic Line Field (`showcase-magnet-lines`)|refined|
|006|Fading Pixel Trail (`showcase-pixel-trail`)|refined|
|007|Elastic Ribbons (`showcase-ribbons`)|refined|
|008|Contour Mesh Surface (`showcase-mesh-surface`)|refined|
|009|Perspective Warp (`showcase-warp-tunnel`)|refined|
|010|Converging Paths (`showcase-converging-paths`)|refined|
|011|Path Follower (`showcase-orbital-path`)|refined|
|012|Pointer Mask Reveal (`showcase-mask-reveal`)|refined|
|013|Curved Gallery (`showcase-circular-gallery`)|refined|
|014|Toss & Stack (`showcase-card-swap`)|refined|
|015|Tracing Story (`showcase-tracing-story`)|refined|
|016|Elastic Range (`showcase-elastic-slider`)|refined|
|017|Lenis Smooth Scroll (`lenis-smooth-scroll`)|refined|
|018|Staggered Scroll Reveal (`scroll-reveal-stagger`)|refined|
|019|Parallax Depth Layers (`parallax-layers`)|refined|
|020|Horizontal Scroll Section (`horizontal-scroll`)|refined|
|021|Sticky Stacking Cards (`sticky-stack`)|refined|
|022|Scroll Progress Indicator (`scroll-progress`)|refined|
|023|Scroll Velocity Skew (`velocity-skew`)|refined|
|024|Scroll-Driven Zoom (`scroll-zoom`)|refined|
|025|Scroll Reading Highlight (`scroll-text-highlight`)|refined|
|026|Scroll Image Sequence (`scroll-image-sequence`)|refined|
|027|Scroll SVG Draw (`scroll-svg-draw`)|refined|
|028|Scroll Rotate Gallery (`scroll-rotate-gallery`)|refined|
|029|Scroll Split Screen (`scroll-split-screen`)|refined|
|030|Scroll Marquee Direction (`scroll-marquee-direction`)|refined|
|031|Scroll Counter Rotate (`scroll-counter-rotate`)|refined|
|032|Scroll Depth Tunnel (`scroll-depth-tunnel`)|refined|
|033|Scroll Letter Scatter (`scroll-letter-scatter`)|refined|
|034|Scroll Color Theme (`scroll-color-theme`)|refined|
|035|Scroll Clip Morph (`scroll-clip-morph`)|refined|
|036|Scroll Table Of Contents (`scroll-table-of-contents`)|refined|
|037|Scroll Inertia Grid (`scroll-inertia-grid`)|refined|
|038|Scroll Video Scrubber (`scroll-video-scrubber`)|refined|
|039|Cursor Gooey Blob (`cursor-gooey-blob`)|refined|
|040|Cursor Particle Emitter (`cursor-particle-emitter`)|refined|
|041|Cursor Elastic Line (`cursor-elastic-line`)|refined|
|042|Cursor Inverted Lens (`cursor-inverted-lens`)|refined|
|043|Cursor Text Repel (`cursor-text-repel`)|refined|
|044|Cursor Grid Ripple (`cursor-grid-ripple`)|refined|
|045|Cursor Hover Preview (`cursor-hover-preview`)|refined|
|046|Cursor Drag Ghost (`cursor-drag-ghost`)|refined|
|047|Cursor Eyes Follow (`cursor-eyes-follow`)|refined|
|048|Cursor Liquid Metaball (`cursor-liquid-metaball`)|refined|
|049|Cursor Rope Trail (`cursor-rope-trail`)|refined|
|050|Cursor Velocity Stretch (`cursor-velocity-stretch`)|refined|
|051|Cursor Snap Targets (`cursor-snap-targets`)|refined|
|052|Cursor Flashlight Noise (`cursor-flashlight-noise`)|refined|
|053|Cursor Glyph Rain (`cursor-emoji-rain`)|refined|
|054|Cursor Magnetic Grid Lines (`cursor-magnetic-grid-lines`)|refined|
|055|Cursor Heat Shimmer (`cursor-heat-shimmer`)|refined|
|056|Cursor Crosshair HUD (`cursor-crosshair-hud`)|refined|
|057|Cursor Pull Distort (`cursor-pull-distort`)|refined|
|058|Cursor Shadow Parallax (`cursor-shadow-parallax`)|refined|
|059|Custom Trailing Cursor (`custom-cursor`)|refined|
|060|Magnetic Button (`magnetic-button`)|refined|
|061|Cursor Image Trail (`image-trail`)|refined|
|062|Spotlight Mask Hover (`spotlight-mask`)|refined|
|063|3D Tilt Card + Glare (`tilt-card`)|refined|
|064|Split-Text Character Reveal (`split-text-reveal`)|refined|
|065|Text Scramble / Decode (`text-scramble`)|refined|
|066|Kinetic Marquee (`kinetic-marquee`)|refined|
|067|Line Mask Reveal (`line-mask-reveal`)|refined|
|068|Hover Letter Roll (`letter-roll`)|refined|
|069|Proximity Type (`proximity-type`)|refined|
|070|Odometer Stat Counter (`stat-counter`)|refined|
|071|Text Wave Hover (`text-wave-hover`)|refined|
|072|Text Clip Image (`text-clip-image`)|refined|
|073|Text Typewriter Caret (`text-typewriter-caret`)|refined|
|074|Text Falling Letters (`text-falling-letters`)|refined|
|075|Text Blur Focus (`text-blur-focus`)|refined|
|076|Text Strike Reveal (`text-strike-reveal`)|refined|
|077|Text Anagram Shuffle (`text-anagram-shuffle`)|refined|
|078|Text Outline Fill Scroll (`text-outline-fill-scroll`)|refined|
|079|Text Ransom Note (`text-ransom-note`)|refined|
|080|Text Glitch Layers (`text-glitch-layers`)|refined|
|081|Text Circular Spin (`text-circular-spin`)|refined|
|082|Text Accordion Squeeze (`text-accordion-squeeze`)|refined|
|083|Text Underline Magic (`text-underline-magic`)|refined|
|084|Text Numbers Slot (`text-numbers-slot`)|refined|
|085|Text Highlighter Swipe (`text-highlighter-swipe`)|refined|
|086|Text Broken Grid (`text-broken-grid`)|refined|
|087|WebGL Hover Distortion (`webgl-distortion`)|refined|
|088|Fragment Disintegration (`particle-dissolve`)|refined|
|089|Clip-Path Image Reveal (`clip-reveal`)|refined|
|090|Hover Zoom Project Card (`hover-zoom-card`)|refined|
|091|Pixelation Reveal (`pixelate-reveal`)|refined|
|092|Focus Grid (Dim Siblings) (`grayscale-grid`)|refined|
|093|WebGL Ripple Click (`webgl-ripple-click`)|refined|
|094|WebGL Pixel River (`webgl-pixel-river`)|refined|
|095|WebGL Fisheye Hover (`webgl-fisheye-hover`)|refined|
|096|WebGL Static TV (`webgl-static-tv`)|refined|
|097|WebGL Kaleidoscope (`webgl-kaleidoscope`)|refined|
|098|WebGL Vertex Wave (`webgl-vertex-wave`)|refined|
|099|Image Slice Hover (`image-slice-hover`)|refined|
|100|Image Infinite Zoom (`image-infinite-zoom`)|refined|
|101|Comparison Slider (`comparison-slider`)|refined|
|102|Kenburns Crossfade (`kenburns-crossfade`)|refined|
|103|Image Duotone Swap (`image-duotone-swap`)|refined|
|104|Image Shatter Click (`image-shatter-click`)|refined|
|105|Image Blinds Reveal (`image-blinds-reveal`)|refined|
|106|Image Magnetic Tiles (`image-magnetic-tiles`)|refined|
|107|WebGL Hologram Particles (`webgl-hologram-particles`)|refined|
|108|Neural Network Signals (`webgl-neural-signals`)|refined|
|109|Painterly Smear (`painterly-smear`)|refined|
|110|Bayer Dither Field (`dither-bayer`)|refined|
|111|Floyd–Steinberg Resolve (`dither-floyd-steinberg`)|refined|
|112|Blue-Noise Image Dissolve (`dither-blue-noise`)|refined|
|113|Luminance Halftone Field (`halftone-dots`)|refined|
|114|Engraving Line Screen (`halftone-lines`)|refined|
|115|ASCII Luminance Terminal (`ascii-render`)|refined|
|116|Synthetic ASCII Wave (`ascii-webcam-style-wave`)|refined|
|117|ASCII Donut 3D (`ascii-donut-3d`)|refined|
|118|ASCII Fire (`ascii-fire`)|refined|
|119|ASCII Fluid Stir (`ascii-fluid-stir`)|refined|
|120|ASCII Portrait Reveal (`ascii-portrait-reveal`)|refined|
|121|ASCII Morph (`ascii-morph`)|refined|
|122|ASCII Type Explode (`ascii-type-explode`)|refined|
|123|Terminal Window (`terminal-window`)|refined|
|124|Dot Matrix Shapes (`dot-matrix-shapes`)|refined|
|125|Halftone Globe Canvas (`halftone-globe-canvas`)|refined|
|126|Engraving Lines Warp (`engraving-lines-warp`)|refined|
|127|Pixel Lissajous Lab (`pixel-lissajous-lab`)|refined|
|128|RGB Slice Transmission (`glitch-rgb-slices`)|refined|
|129|Macroblock Motion Smear (`glitch-datamosh-blocks`)|refined|
|130|Scanline CRT Receiver (`scanline-crt`)|refined|
|131|VHS Tracking Deck (`vhs-tracking`)|refined|
|132|Column Pixel Sort (`pixel-sort`)|refined|
|133|Reusable Film Grain (`noise-grain-overlay`)|refined|
|134|Threshold Mosaic Switch (`threshold-mosaic-transition`)|refined|
|135|Bitmap Type Marquee (`bitmap-font-marquee`)|refined|
|136|Alternating Field Monitor (`interlace-flicker`)|refined|
|137|Local Posterize Lens (`posterize-hover`)|refined|
|138|Chromatic Velocity Type (`chromatic-type`)|refined|
|139|Soft Focus Switch (`neumorphic-buttons`)|rebuilt from scratch|
|140|Tactile Desk Rocker (`mechanical-switch`)|rebuilt from scratch|
|141|Precision Listening Dial (`rotary-knob`)|rebuilt from scratch|
|142|Satin Light Fader (`brushed-metal-slider`)|rebuilt from scratch|
|143|Weekend Paper Plans (`paper-stack-cards`)|rebuilt from scratch|
|144|Frosted Coast Pass (`glass-refraction-card`)|rebuilt from scratch|
|145|Dot Matrix Clock (`led-segment-display`)|rebuilt from scratch|
|146|Split-Flap Focus Timer (`flip-clock`)|rebuilt from scratch|
|147|Embossed Save Key (`embossed-press`)|rebuilt from scratch|
|148|Calibrated Needle Meter (`analog-gauge`)|rebuilt from scratch|
|149|Sculpted Macro Keys (`punch-card-keyboard`)|rebuilt from scratch|
|150|Quiet Tape Transport (`cassette-reels`)|rebuilt from scratch|
|151|Mechanical Counter (`slot-machine-reel`)|rebuilt from scratch|
|152|Hinged Pocket Lighter (`zippo-flame`)|rebuilt from scratch|
|153|Tear-off Note (`torn-paper-edge`)|rebuilt from scratch|
|154|Sealed Correspondence (`wax-seal-stamp`)|rebuilt from scratch|
|155|Pocket Synthesizer (`op1-panel`)|rebuilt from scratch|
|156|Expanding Activity Capsule (`dynamic-notch`)|rebuilt from scratch|
|157|Direct-drive Turntable (`vinyl-player-card`)|rebuilt from scratch|
|158|Satin Foil Membership (`foil-trading-card`)|rebuilt from scratch|
|159|SVG Path Draw Hover (`svg-path-draw-hover`)|refined|
|160|SVG Blob Morph (`svg-blob-morph`)|refined|
|161|SVG Squiggle Underline (`svg-squiggle-underline`)|refined|
|162|SVG Line Graph Live (`svg-line-graph-live`)|refined|
|163|SVG Marching Ants (`svg-marching-ants`)|refined|
|164|SVG Signature Write (`svg-signature-write`)|refined|
|165|SVG Gooey Menu (`svg-gooey-menu`)|refined|
|166|SVG Topographic Drift (`svg-topographic-drift`)|refined|
|167|SVG Circuit Pulse (`svg-circuit-pulse`)|refined|
|168|SVG Lissajous Loader (`svg-lissajous-loader`)|refined|
|169|CSS 3D Cube Nav (`css3d-cube-nav`)|refined|
|170|CSS 3D Card Flip Grid (`css3d-card-flip-grid`)|refined|
|171|CSS 3D Book Page (`css3d-book-page`)|refined|
|172|CSS 3D Carousel Cylinder (`css3d-carousel-cylinder`)|refined|
|173|CSS 3D Parallax Room (`css3d-parallax-room`)|refined|
|174|CSS 3D Isometric Hover (`css3d-isometric-hover`)|refined|
|175|CSS 3D Folding Map (`css3d-folding-map`)|refined|
|176|WebGL Point Globe (`webgl-point-globe`)|refined|
|177|WebGL Wobbly Sphere (`webgl-wobbly-sphere`)|refined|
|178|CSS 3D Depth Hero (`css3d-depth-hero`)|refined|
|179|Voxel Assemble (`voxel-assemble`)|refined|
|180|CSS 3D Exploded Device (`css3d-exploded-device`)|refined|
|181|Spring Cursor Follower (`spring-cursor-follower`)|refined|
|182|Pendulum Tags (`pendulum-tags`)|refined|
|183|Chain Links (`chain-links`)|refined|
|184|Gravity Drop Icons (`gravity-drop-icons`)|refined|
|185|Collision Bubbles (`collision-bubbles`)|refined|
|186|Soft Body Blob (`soft-body-blob`)|refined|
|187|Cloth Flag (`cloth-flag`)|refined|
|188|Wrecking Ball Text (`wrecking-ball-text`)|refined|
|189|Inertia Window Drag (`inertia-window-drag`)|refined|
|190|Magnet Snap Grid (`magnet-snap-grid`)|refined|
|191|Liquid Blob Buttons (`liquid-blob-buttons`)|refined|
|192|Ferrofluid Dots (`ferrofluid-dots`)|refined|
|193|Water Ripple 2D (`water-ripple-2d`)|refined|
|194|Lava Lamp (`lava-lamp`)|refined|
|195|Ink Bleed Reveal (`ink-bleed-reveal`)|refined|
|196|Melt Drip Text (`melt-drip-text`)|refined|
|197|Smoke Wisps (`smoke-wisps`)|refined|
|198|Bubble Float Pop (`bubble-float-pop`)|refined|
|199|Liquid Image Ripple (`liquid-image-ripple`)|refined|
|200|Liquid Mask Reveal (`liquid-mask-reveal`)|refined|
|201|Slider Elastic Edges (`slider-elastic-edges`)|refined|
|202|Slider Progress Fraction (`slider-progress-fraction`)|refined|
|203|Slider Clip Transition (`slider-clip-transition`)|refined|
|204|Slider Stack Deck (`slider-stack-deck`)|refined|
|205|Slider Fullbleed Parallax (`slider-fullbleed-parallax`)|refined|
|206|Gallery Filmstrip Scrub (`gallery-filmstrip-scrub`)|refined|
|207|Gallery Expanding Columns (`gallery-expanding-columns`)|refined|
|208|Gallery Honeycomb (`gallery-honeycomb`)|refined|
|209|Gallery Random Stack (`gallery-random-stack`)|refined|
|210|Gallery Dual Row Drift (`gallery-dual-row-drift`)|refined|
|211|Lightbox Flip Zoom (`lightbox-flip-zoom`)|refined|
|212|Slider Wheel 3D (`slider-wheel-3d`)|refined|
|213|Scroll Snap Carousel (`scrollsnap-carousel`)|refined|
|214|Menu Fullscreen Overlay (`menu-fullscreen-overlay`)|refined|
|215|Menu Split Reveal (`menu-split-reveal`)|refined|
|216|Menu Circular Expand (`menu-circular-expand`)|refined|
|217|Nav Blur Elevate (`nav-blur-elevate`)|refined|
|218|Nav Hide Reveal (`nav-hide-reveal`)|refined|
|219|Nav Active Pill (`nav-active-pill`)|refined|
|220|Menu Letter Cascade (`menu-letter-cascade`)|refined|
|221|Menu Image Peek (`menu-image-peek`)|refined|
|222|Breadcrumb Collapse (`breadcrumb-collapse`)|refined|
|223|Tab Morph Content (`tab-morph-content`)|refined|
|224|Sidebar Rail Expand (`sidebar-rail-expand`)|refined|
|225|Burger Morph X (`burger-morph-x`)|refined|
|226|Mega Menu Preview (`mega-menu-preview`)|refined|
|227|Button Border Beam (`btn-border-beam`)|refined|
|228|Button Shimmer Sweep (`btn-shimmer-sweep`)|refined|
|229|Button Text Slide Swap (`btn-text-slide-swap`)|refined|
|230|Button Icon Hop (`btn-icon-hop`)|refined|
|231|Button Success Morph (`btn-success-morph`)|refined|
|232|Button Confetti Burst (`btn-confetti-burst`)|refined|
|233|Button Material Ripple (`btn-ripple-material`)|refined|
|234|Button Jelly Press (`btn-jelly-press`)|refined|
|235|Like Heart Particles (`like-heart-particles`)|refined|
|236|Checkbox Draw Check (`checkbox-draw-check`)|refined|
|237|Toggle Day Night (`toggle-day-night`)|refined|
|238|Copy Inline Feedback (`copy-inline-feedback`)|refined|
|239|Hover Tooltip Spring (`hover-tooltip-spring`)|refined|
|240|Badge Notification Pop (`badge-notification-pop`)|refined|
|241|Button Polish Stages (`btn-polish-stages`)|refined|
|242|Input Float Label (`input-float-label`)|refined|
|243|Input Underline Grow (`input-underline-grow`)|refined|
|244|Input Shake Error (`input-shake-error`)|refined|
|245|Input Character Counter Arc (`input-char-counter-arc`)|refined|
|246|OTP Code Boxes (`otp-code-boxes`)|refined|
|247|Password Strength Bar (`password-strength-bar`)|refined|
|248|Select Morph Dropdown (`select-morph-dropdown`)|refined|
|249|Range Elastic Thumb (`range-elastic-thumb`)|refined|
|250|Textarea Auto Grow (`textarea-auto-grow`)|refined|
|251|Form Multistep Progress (`form-multistep-progress`)|refined|
|252|Preloader Percentage (`preloader-percentage`)|refined|
|253|Preloader Word Cycle (`preloader-word-cycle`)|refined|
|254|Loader Dots Wave (`loader-dots-wave`)|refined|
|255|Loader Morph Shapes (`loader-morph-shapes`)|refined|
|256|Loader Typing Code (`loader-typing-code`)|refined|
|257|Skeleton Shimmer (`skeleton-shimmer`)|refined|
|258|Progress Blob Fill (`progress-blob-fill`)|refined|
|259|Loader Orbit Dots (`loader-orbit-dots`)|refined|
|260|Upload Progress Morph (`upload-progress-morph`)|refined|
|261|Page Load Counter Slide (`page-load-counter-slide`)|refined|
|262|Bottom Sheet (`bottom-sheet`)|refined|
|263|Radial Menu (`radial-menu`)|refined|
|264|Elastic Tabs (`elastic-tabs`)|refined|
|265|Masonry Filter (`masonry-filter`)|refined|
|266|Command Palette (`command-palette`)|refined|
|267|Toast Stack (`toast-stack`)|refined|
|268|Number Input Drag (`number-input-drag`)|refined|
|269|Context Menu Custom (`context-menu-custom`)|refined|
|270|Resizable Split Pane (`resizable-split-pane`)|refined|
|271|Card Hover Border Gradient (`card-hover-border-gradient`)|refined|
|272|List Reorder Drag (`list-reorder-drag`)|refined|
|273|Zoom UI Inception (`zoom-ui-inception`)|refined|
|274|Bento Spotlight (`bento-spotlight`)|refined|
|275|Token Swap Widget (`swap-widget`)|refined|
|276|Drag Collapse Panel (`drag-collapse-panel`)|refined|
|277|Popover Anchor Morph (`popover-anchor-morph`)|refined|
|278|Table Image Idle (`table-image-idle`)|refined|
|279|Caption Pull Hover (`caption-pull-hover`)|refined|
|280|Hero Spotlight Reveal (`hero-spotlight-reveal`)|refined|
|281|Mac Minimize / Maximize (`mac-window`)|refined|
|282|Dock Magnification (`dock-magnify`)|refined|
|283|FLIP Card Expand (`flip-expand`)|refined|
|284|Smooth Accordion (`smooth-accordion`)|refined|
|285|Spring Modal (`spring-modal`)|refined|
|286|Inertia Drag Carousel (`drag-carousel`)|refined|
|287|Directional Hover Fill (`hover-fill-button`)|refined|
|288|Page Transition Curtain (`page-transition`)|refined|
|289|Infinite Logo Marquee (`logo-marquee`)|refined|
|290|Chart Bars Race (`chart-bars-race`)|refined|
|291|Chart Donut Sweep (`chart-donut-sweep`)|refined|
|292|Sparkline Hover Scrub (`sparkline-hover-scrub`)|refined|
|293|Heatmap Fade In (`heatmap-fade-in`)|refined|
|294|Ticker Tape Prices (`ticker-tape-prices`)|refined|
|295|Radar Sweep Blips (`radar-sweep-blips`)|refined|
|296|Map Topo Extrude (`map-topo-extrude`)|refined|
|297|Map City Tiles (`map-city-tiles`)|refined|
|298|Map Dot Globe Arcs (`map-dot-globe-arcs`)|refined|
|299|Map Route Draw (`map-route-draw`)|refined|
|300|Map Radar Pings (`map-radar-pings`)|refined|
|301|Map Isoline Field (`map-isoline-field`)|refined|
|302|FUI Status Dashboard (`fui-status-dashboard`)|refined|
|303|FUI Target Lock (`fui-target-lock`)|refined|
|304|FUI Terminal Boot (`fui-terminal-boot`)|refined|
|305|FUI Waveform Scope (`fui-waveform-scope`)|refined|
|306|FUI Signal Scanner (`fui-signal-scanner`)|refined|
|307|FUI Data Stream (`fui-data-stream`)|refined|
|308|FUI Access Granted (`fui-access-granted`)|refined|
|309|FUI Hex Dump (`fui-hex-dump`)|refined|
|310|FUI Trading Terminal (`fui-trading-terminal`)|refined|
|311|FUI Orbital Tracker (`fui-orbital-tracker`)|refined|
|312|Agent Token Meter (`agent-token-meter`)|refined|
|313|Agent Deploy Pipeline (`agent-deploy-pipeline`)|refined|
|314|Agent Context Compaction (`agent-context-compaction`)|refined|
|315|Agent Node Graph (`agent-node-graph`)|refined|
|316|Agent Streaming Text (`agent-streaming-text`)|refined|
|317|Agent Thinking Drawer (`agent-thinking-drawer`)|refined|
|318|Agent Diff Review (`agent-diff-review`)|refined|
|319|Knowledge Orbit (`agent-knowledge-orbit`)|refined|
|320|Particles Constellation (`particles-constellation`)|refined|
|321|Gradient Mesh Drift (`gradient-mesh-drift`)|refined|
|322|Flow Field (`flow-field`)|refined|
|323|Starfield Warp (`starfield-warp`)|refined|
|324|Conway Life Fade (`conway-life-fade`)|refined|
|325|Audio Reactive Bars (`audio-reactive-bars`)|refined|
|326|Matrix Rain (`matrix-rain`)|refined|
|327|Fireflies Night (`fireflies-night`)|refined|
|328|Aurora Curtains (`aurora-curtains`)|refined|
|329|Rain Window (`rain-window`)|refined|
|330|UI Sound Kit (`ui-sound-kit`)|refined|
|331|Typing Mechanical (`typing-mechanical`)|refined|
|332|Theremin Pad (`theremin-pad`)|refined|
|333|Notification Chime Stack (`notification-chime-stack`)|refined|
|334|Drum Grid Sequencer (`drum-grid-sequencer`)|refined|
|335|Scroll Pitch Drone (`scroll-pitch-drone`)|refined|
|336|DVD Screensaver (`dvd-screensaver`)|refined|
|337|Konami Unlock (`konami-unlock`)|refined|
|338|Click Fireworks (`click-fireworks`)|refined|
|339|Drag To Break (`drag-to-break`)|refined|
|340|Pet The Blob (`pet-the-blob`)|refined|
|341|Gravity Flip Page (`gravity-flip-page`)|refined|
|342|Wobbly Window Drag (`wobbly-window-drag`)|refined|
|343|Snake In Grid (`snake-in-grid`)|refined|
|344|Formatted Metric Counter (`framer-formatted-metric`)|added native component|
|345|Rolling Account Balance (`framer-rolling-balance`)|added native component|
|346|Focus Countdown Ring (`framer-focus-countdown`)|added native component|
|347|Revenue Period Summary (`framer-financial-trend`)|added native component|
|348|I/O Switch (`drams-001`)|added native component|
|349|Standard Volume (`drams-002`)|added native component|
|350|Dirty Rollin' Slider (`drams-003`)|added native component|
|351|DImpled Slider (`drams-004`)|added native component|
|352|Dynamic Slider (`drams-005`)|added native component|
|353|Pushin' Click Button (`drams-006`)|added native component|
|354|Concaved Switch (`drams-007`)|added native component|
|355|Dark Volume (`drams-008`)|added native component|
|356|Square Slider (`drams-009`)|added native component|
|357|Rollin' Ball Surprise (`drams-010`)|added native component|
|358|3-Way Knob (`drams-011`)|added native component|
|359|Empty Track Volume (`drams-012`)|added native component|
|360|Round Knob Slider (`drams-013`)|added native component|
|361|3-Way Switch (`drams-014`)|added native component|
|362|Joypad Controller (`drams-015`)|added native component|
|363|Plus Minus Knob (`drams-016`)|added native component|
|364|Round On/Off Knob (`drams-017`)|added native component|
|365|LED Switch (`drams-018`)|added native component|
|366|Line Volume (`drams-019`)|added native component|
|367|Trackin' Slider (`drams-020`)|added native component|
|368|Long Rollin' Slider (`drams-021`)|added native component|
|369|Rollin' Dot Slider (`drams-022`)|added native component|
|370|Square Switch (`drams-023`)|added native component|
|371|Coloured Switch (`drams-024`)|added native component|
|372|Fingerin' Volume (`drams-025`)|added native component|
|373|Pinchin' Track Switch (`drams-026`)|added native component|
|374|Pushin' 5'ers (`drams-027`)|added native component|
|375|Long Pinchin' Switch (`drams-028`)|added native component|
|376|Triple Light Switch (`drams-029`)|added native component|
|377|Pinchin' Switch (`drams-030`)|added native component|
|378|Fidget Poppin' (`drams-031`)|added native component|
|379|Hollin' Volume (`drams-032`)|added native component|
|380|Triple Push Buttons (`drams-033`)|added native component|
|381|Volume Hidden Track (`drams-034`)|added native component|
|382|Rollin' Dot Switch (`drams-035`)|added native component|
|383|DRAMS · OP1 (`drams-036`)|added native component|
|384|Standard Switch (`drams-037`)|added native component|
|385|Crankin' Ball (`drams-038`)|added native component|
|386|Rollin' Switch (`drams-039`)|added native component|
|387|Volume Visible Track (`drams-040`)|added native component|
|388|Triple Switch (`drams-041`)|added native component|
|389|Slurp Switch (`drams-042`)|added native component|
|390|Rollin' Search (`drams-043`)|added native component|
|391|Ball Pop (`drams-044`)|added native component|
|392|Rollin' Stepper (`drams-045`)|added native component|
|393|Pendulum (`drams-046`)|added native component|
|394|Bouncin' Ball (`drams-047`)|added native component|
|395|DRAMS · R2D2 (`drams-048`)|added native component|
|396|DRAMS · Digital Clock Radio (`drams-050`)|added native component|
|397|DRAMS · Braun Electric Shaver (`drams-051`)|added native component|
|398|DRAMS · Rotary Radio (`drams-052`)|added native component|
|399|DRAMS · Digital Rotary Radio (`drams-053`)|added native component|

The screenshots support a visual assessment; automated assertions support only their stated behavior and geometry claims. Generic contact-sheet pointer/scroll probes are identified as such in the JSON. Validation used Chromium. The photographic video scrubber remains an image-based sequence rather than a decoded video.
