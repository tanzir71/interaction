# Visual remediation progress

The v4 redesign is complete for 174 of the 399 existing demos: Interface (89),
Data & AI (30), all twenty-two Scroll demos, and all twenty-three Text & Type
demos plus all ten SVG & Line demos in Motion. The remaining work includes
225 existing demos, 121 new or extension components, Pro seams, and the final audit.

## Scroll: Smooth Scroll and Stagger Reveal

The native previews follow Figma nodes `159:1084` and `159:582`. Their geometry
fixtures were captured from Figma metadata before implementation; they are
independent of the rendered site. No new images or dependencies were added.

Smooth Scroll retains all four original sections. The existing Lenis 1.1.14
driver now uses the motion system's 0.12 smoothing value, with the original
wheel multiplier of 1. The wrapper's class avoids the substring that Lenis
rewrites. Reduced motion and offline exports use native scrolling. The driver
runs frames during active momentum, resets its clock after idle, and pauses
with the stage.

Stagger Reveal retains Design, Motion, Code, Type, Color and Grid in the full
view. Its original single observer still uses `isIntersecting` and threshold
0.25. The motion system replaces the older timing with a 400ms entrance,
40ms stagger, 12px rise and 2px blur; exits take 150ms with no delay. Reduced
motion keeps every card readable. The bottom spacer allows the complete group
to leave the viewport so scrolling back can replay its entrance.

Both compact views scroll on a six-second authored story. The checkpoint at
40% of story time matches the exact Figma pose: Smooth Scroll has 175px of
475px travel, and Stagger Reveal has 170px of 452px travel. Reduced motion
holds that checkpoint. User input takes over, and the shell owns Scroll ↓,
Reset and Replay. Full views retain native wheel, touch and keyboard input.

`node tools/verify-scroll.js http://127.0.0.1:4173` verifies the original
content and observer fixtures, native layer geometry at four tile sizes,
keyboard and touch scrolling, interrupted animation, paused momentum, compact
full-view text and completely offline exports. Other category verifiers and
the remaining global stage-fit debts continue to apply.

The global geometry audit restarts each preview before sampling its initial
composition. Network timing and preview boot order therefore cannot choose a
later scroll-out as the component's measured composition. Motion tests
separately exercise the complete six-second stories, including wrapping.

The final reduced-motion library audit also needs to address initial paused
opacity transitions in the existing Popover Morph and Spring Dialog thumbnails.
Their initial open states should paint before LiveTiles pauses them. This pass
includes that first-paint protection for Stagger Reveal.

## Scroll: depth, pinned scenes and reading

Parallax Layers, Horizontal Scroll, Sticky Stack, Reading Progress, Velocity
Skew and Scroll Zoom now follow their v4 tiles. The eight initial Scroll demos
load from separate source modules. Full views preserve all three depth speeds,
four horizontal chapters, four stack cards, five reading paragraphs and eight
velocity headlines. The original translation, overlap, progress and cubic zoom
formulas are unchanged.

Velocity Skew keeps the original arithmetic order at 60Hz, including its
three-decimal presentation. Its fractional-frame extension gives the same
trajectory at 120Hz and 240Hz. A text camera contains painted skew without
feeding its transformed bounds back into the scroll range. Frames stop when
the skew settles. The native Momentum composition keeps its exact 211×49
geometry; its low-fill exception is recorded alongside the Figma reference.

The original dusk, cityNight, aurora and ocean photos are reused. Horizontal
Scroll adds the exact embers photo by Alican Leblebici, verified against the
free Unsplash original. Both local sizes and hashes are recorded in
`assets/photo-credits.json`; the complete offline export retains attribution.
Native parallax uses a separate scene camera so its card shadow has room while
the moving layers still clip within their intended viewport.

`node tools/verify-scroll-core.js http://127.0.0.1:4173` checks the independent
original-model fixtures, every native layer and photo, real wheel/keyboard/touch,
complete six-second stories, pauses, cleanup, narrow full views and all six
offline exports. All original models and all 22 high-fidelity Figma references
were captured before source changes.

## Scroll: reading, sequence, route, gallery and split chapters

Text Highlight, Image Sequence, SVG Draw, Rotating Gallery and Split Screen now
match their native v4 compositions. Full views retain the complete original
21-word passage, 48-frame projected assembly, three measured route curves,
seven project records and four material chapters with all paragraphs and data.
Independent fixtures were captured before implementation. The sequence's 240
projection hashes cover all 48 frames at five canvas sizes and DPR settings;
all geometric drawing operations remain exact while approved Dusk photography
is mapped onto the four horizontal surfaces.

The native route uses four unmodified SVG exports with their original root
dimensions. Translated masks reveal the orange half; the mirrored second half
follows the same symmetric curve. Split Screen keeps its native photo and four
text bars separate so the photo's mask cannot hide the copy. Full layouts keep
readable type at 390, 375 and 360px, including SVG labels and material units.

`node tools/verify-scroll-narratives.js http://127.0.0.1:4173` checks the original
models and datasets, every native layer, real keyboard/wheel/touch, six-second
preview stories, interruption, held Reset, cleanup and complete offline exports.
Reduced motion holds the exact preview checkpoint, uses discrete route/gallery
states and removes split reveal transforms. No new photographs or dependencies
were added; all eleven credit records remain unchanged.

## Scroll: directional type, rings, depth, glyphs and palettes

Crossing Marquees, Counter-Rotating Rings, Depth Tunnel, Letter Scatter and Theme
Shift now use their native v4 compositions. Full views retain all three original
type bands, both complete ring strings and 1.5/−2 turns, nine depth frames and
2.25 cycles, all nine BREAK FORM paths, and every channel and chapter in the
four original palettes. Their fixtures contain 70 position samples and 30
marquee settling states captured before implementation.

The marquee keeps the original 60Hz arithmetic. Its fractional-frame extension
integrates the same velocity recurrence and belt displacement at 120 and 240Hz.
Direction persists after velocity decays. Full ring copy stays readable on small
screens, with complete text below the rings in compact full views. Native dots
rotate around point pivots, keeping transparent layout boxes out of horizontal
scroll bounds. Letter Scatter caches seeded paths and its native reference;
thumbnail playback updates only the visible glyph layer. The depth
camera contains its frames without widening the fitted root. Theme preview
layout stays fixed while fonts load, so native scroll anchoring cannot shift
the reference pose.

Theme Shift's native journey uses separate neutral dawn and night layers.
Only their opacity changes: dawn starts at 0.12, the exact warm Figma checkpoint
has no veil, and night ends at 0.88. Reset restores the untouched native art.
The full view keeps all original RGB interpolation; thumbnail playback avoids
updating its invisible palette styles.

Native rings use all 60 original SVG dot instances, the core and arrow. The
theme uses the complete original SVG with its gradient, sun, glow, lower band
and negative inset. The tunnel adds the exact Milky Way photo by Dns Dgn;
provenance and both file hashes are recorded in `assets/photo-credits.json`.
Letter Scatter preserves the exact 201×80.6px glyph composition. Its low-fill
exception at the smallest compact stage follows the owner's Figma-size
clarification; overflow, horizontal scrolling and typography remain gated.

`node tools/verify-scroll-effects.js http://127.0.0.1:4173` checks the independent
original models, live renderer agreement, native geometry/assets, real input,
six-second stories, holds, cleanup, compact full views and complete offline
exports. Palette hues remain functional data in the full theme demonstration.

## Scroll: aperture, contents, inertia and film

Clip Morph, Table of Contents, Inertia Grid and Video Scrubber complete the
existing Scroll category. Their native previews match the exact v4 geometry;
full views keep the original sixteen-point aperture and rectangular endpoints,
all four complete article sections and reading times, all twelve project names,
and all four film chapters across the original 24-second timeline.

Independent fixtures preserve 56 original scroll positions, 30 grid settling
states, and 280 direct video render traces at five size/DPR settings, including
frame zero and chapter boundaries. The grid retains the exact 60Hz rates
0.18, 0.11 and 0.065; exponential interpolation gives equivalent settling at
120 and 240Hz. The film keeps the original cover/pan/zoom equations, gradient,
tenths clock and 24fps timecode. Scaled native scrolling resolves the end clock
to 24.0 despite a fractional pixel at the physical scroll limit.

The new Chrome and Interior Dark assets use the exact supplied images, with
verified Unsplash sources, authors, licences and both local file hashes recorded
in `assets/photo-credits.json`. Chrome is Rohit Choudhari's original 3D render;
the interior is Dmitry Ant's photograph. The scrubber knob retains its complete
original 37×37 SVG and negative inset. All 246 previous image payloads, six font
faces and twelve previous credit records remain unchanged.

The sparse table of contents preserves its exact 107×104 group. Its documented
low-fill exception follows the owner's Figma-size clarification and changes no
overflow, horizontal scroll or typography requirement.

`node tools/verify-scroll-final.js http://127.0.0.1:4173` compares independent
original fixtures with the implemented models and live renderers. It also checks
all native asset slots at four sizes, readable 390/375/360px full views, native
wheel/keyboard/touch, complete six-second stories, caller holds, deferred Reset,
cleanup, tall and short stage endpoints, and complete offline exports with
original asset bytes and credits.

Four Text & Type demos, plus SVG and 3D studies in Motion, remain. Other unfinished categories,
new/extension components, Pro seams and the final requirement audit stay open.

## Text & Type: reveals, decode, marquee, flaps, proximity and statistics

The first seven native previews match the v4 type, masks, flap cells and counter
geometry. Full views preserve both original headline lines, all four reveal
lines, four complete scramble phrases, both six-chunk marquee bands, all three
navigation labels and duplicate character stacks, ELASTIC, and the original
128 / 14 / 99% statistics with their labels. The native counter separately uses
the exact 12,480 composition. Split Text Reveal now uses the shared motion
system without its former GSAP dependency.

Independent fixtures were captured before any source changes: every seeded
scramble queue step, fourteen marquee wheel states and thirty settling states,
seventeen measured proximity inputs, original character/line/link structure,
and thirteen quartic count samples. The marquee preserves its signed 60Hz
arithmetic, including the asymmetric response to negative velocity; fractional
integration gives equivalent 120/240Hz displacement. Proximity keeps the
140px radius, smoothstep falloff, 22px lift and 0.35 scale gain while accounting
for fitted coordinates. The complete 1300ms quartic count is unchanged.

Native flaps have continuous, reversible 3D poses. Counter digits use actual
3D face geometry, anticipation, the named step curve, 740ms landing and 90ms
stagger; unchanged digit structures are reused during counting. Native
proximity blends fixed font-weight layers through opacity. Its pointer is the
byte-identical existing SVG, including its original dimensions and negative
insets, so no assets or dependencies were added. The text scramble's glyph
layer ignores pointer hits to keep DOM updates from restarting hover.

Scroll-triggered previews follow six-second stories. Full reveals and counters
start when they enter view; full marquee input uses native wheel, scrolling,
touch and keys. Reduced motion renders readable initial states. Four sparse
compositions have documented Figma-size fill exceptions; other fit gates remain
unchanged. The focused verifier checks all original data and numeric models,
native geometry and artwork, real input, interrupted motion, caller holds,
deferred Reset, compact full typography and complete offline exports.

## Initial preview holds

Morphing Popover and Spring Modal now paint their open native reference state
synchronously. Holding a preview before its first frame no longer freezes an
entrance at opacity zero. Their original transitions become available on the
first live frame; the full views retain their closed initial state and existing
interaction behavior. A pending startup frame is cancelled on disposal.

The startup verifier checks both motion preferences at four stage sizes, exact
reference dimensions and opacity, resumed transitions, full open/Escape behavior
and cleanup. The full layout-control regression suite remains unchanged.

## Text & Type: wave, image fill, typewriter and falling letters

The next four native previews match the v4 Wavelength pose, EMBER image crop,
Building the future line and 2×26px caret, and four independently placed FALL
glyphs over the 180px floor. The photo is the supplied ember image already
present in the credited local library; previews use the 800px file and full
detail uses 1600px. Exports embed the original portable file and licence.
No image payloads, fonts, credits or dependencies were added.

Full views keep Make waves, both OPEN / WATER lines, all three complete
typewriter messages and all thirteen FALL INTO PLACE bodies. Independent
captures preserve every wave origin, all texture speed and offset states,
all four states of each original message, and four complete collision runs.
The wave retains its 55ms distance delay, 24px damped sine and original
rotation coupling. The texture retains its 640px wrap and sine drift.
The typewriter retains 70ms typing, 38ms deleting, 1200ms holds and 360ms gaps;
new glyphs use the shared streaming recipe. Falling letters retain the
original gravity, restitution, wall response, friction, impulse and sleep
thresholds. Fixed 60Hz state integration preserves the discrete models at
120/240Hz. The native image crop follows actual pointer input and returns to
the exact reference crop when the pointer leaves.

All four use shell controls, native keyboard and touch, readable compact
typography, deferred Reset during caller or viewport holds, and owned frame
and observer cleanup. Wave and Typewriter have documented sparse native
geometry exceptions; other fit gates remain unchanged. The focused verifier
compares original numeric fixtures, exact artwork and geometry at four sizes,
real input, live renderer agreement, pause boundaries and offline exports.
A new impulse after rest starts a fresh frame clock; repeated pointer input
keeps the current clock, so it cannot freeze an active animation.

## Text & Type: focus, replacement, anagram and outline fill

Blur to Focus, Strike and Replace, Anagram Shuffle and Outline Fill now match
their native v4 type, placement, card geometry and mask. Blur's 183×34px group
and Strike's 173×56px group keep their exact Figma sizes under the owner's
sparse-fill exception. Overflow, horizontal scroll and type gates still apply.
Anagram card strokes are painted inside the cards so fractional stage scaling
does not shift their glyphs through rounded layout borders.

Full views preserve all seven focus words, both complete replacement phrases,
STATE / TASTE with distinct repeated-letter identities, and both SOLID / SIGNAL
lines. Independent fixtures retain the original optical relationships, flag
combinations, measured permutations and exponential fill recurrence. Focus uses
the shared 400ms reveal and 40ms stagger; its tracking field moves glyphs through
transforms. Replacement retargets from its current pose. Anagram measures actual
First and Last centers and retains the same nodes during interrupted flights.

Full focus and fill views use actual native scroll containers with keyboard and
touch input. Scroll takes priority over dormant hover; deliberate hover, focus
and latch interactions remain available. Switching input maps the current
composition to the scroll plane. Scroll ranges refresh on resize, keeping
geometry reads out of the scroll handler. Caller holds cancel native touch inertia and
freeze both the model and scroll position. Deferred resets beat late entry
observers, and queued toggles retain the user's final intent.

Outline uses one new supplied SVG, unchanged at 372×206px with luminance-mask
semantics and its original checkpoint boundary. A native canvas paints the
inspected 1px inside stroke at 35% white; fill layers extend the full scroll
range without changing the SVG. Portable exports preserve the original bytes.
All 249 previous image payloads, six font faces and fourteen photo credits are
unchanged. Both scroll previews follow six-second stories and hold readable
reference states under reduced motion.

`node tools/verify-text-focus.js http://127.0.0.1:4173` covers original numeric
fixtures, exact native geometry at four sizes, live optical and fill output,
native keys and touch, reversed flights, caller and viewport holds, queued
intent, cleanup, compact full typography and complete offline exports.

## Text & Type: cutouts, channel slices, circular badge and accordion

Ransom Note, Glitch Layers, Circular Badge and Accordion Type now use their
exact v4 native compositions. Three sparse previews retain the authored
184×44px card group, 160×60px channel group and 99×99px dot ring under documented
fill exceptions. Compact planes keep the smallest native text above 11 physical
pixels while preserving the geometry of the 372×264px reference.

Full views retain all eleven KEEP IT WEIRD cutouts, both SIGNAL / LOST lines,
the complete original circular text path and all four studio disciplines.
Independent captures preserve twelve seeded arrangements, every font, weight,
palette and irregular corner sample; burst slice bands and channel offsets;
accelerated and reversed orbit trajectories; and every hover/focus/latch
combination with the original row-weight recurrence. Legacy paper colours are
painted as neutral greys, retaining the single original orange sample. Red and
cyan in Glitch are the functional channel colours specified by the v4 tile.

Cutouts use measured centre FLIP with the shared 350ms duration and capped 40ms
stagger. Bursts retain the original 520ms clock, 45ms slices and seeded stream,
including interruption and complete recovery. The orbit retains its original
18/96° per second model with fixed 60Hz integration at higher refresh rates.
Its full SVG rotates around the original 380×195 centre. At compact widths,
spacing fits the complete phrase around the original path while glyphs retain
their 12px physical size and proportions. The native ring uses
all twenty-eight original 3px SVG dots and the exact 20px arrow; three new asset
files are embedded unchanged in exports.

The accordion retains active weight 2.05, the original sibling distribution,
font/weight relationship and pointer precedence over focus and latch. The
shared 250ms accordion motion replaces the legacy easing. Labels move from
their current measured centres and scale uniformly, retaining their proportions;
rules move through transforms. Font and row sizes change once per requested
layout. Reduced motion jumps layout with brief opacity feedback; ambient
motion becomes a readable still frame. All four own frame and observer cleanup
and preserve queued input across caller, document and viewport holds.

`node tools/verify-text-expressive.js http://127.0.0.1:4173` compares independent
original models, exact native geometry and every SVG slot, complete full
content, real input, interrupted motion, orbit refresh-rate equivalence and
pivot stability, holds, cleanup, compact typography and offline exports.

## Text & Type: shared underline, price drums, highlights and fragments

Magic Underline, Price Roll, Highlighter Swipe and Broken Grid Type complete
the existing Text & Type category. Their native views match v4 nodes `160:969`,
`161:1220`, `160:989` and `160:1009`. The sparse 181×26px navigation and 100×62px
BRO text retain their authored size through documented fill exceptions. The
three original 60px clip frames remain intact, including the empty third clip.
All other fit gates still apply. No assets, fonts or dependencies were added.

The full underline retains Work, Studio, Notes and Contact, its complete
editorial statement, measured link geometry and pointer > focus > latch
precedence. The shared 250ms easing replaces the older timing while preserving
the 8px hop and height coupling. Retargeting captures the live x, width and y;
transformed bar sections preserve the rounded end caps without animating layout.

Price Roll retains all four full values (0427, 1984, 2026, 7315), BASE 20,
forward modulo and one through four extra turns. Native billing starts at
Yearly $19/mo; Monthly selects $24/mo. Each digit uses ten actual 3D faces with
the shared 100ms anticipation, 130ms step, 740ms landing and 90ms stagger.
Neighbors retain the specified scale, blur and opacity. The motion system
supersedes legacy timing and input locking; interrupted rolls preserve their
current fractional positions, scale and lift. Leading zeros collapse visually
while accessible values remain complete. Widths change once per target; measured
digit centers and the suffix move through transforms. The outer stage uses normal clip
boundaries; each drum owns its internal mask.

The highlighter retains the complete Newsreader article and all four original
semantic marks. Its local observer keeps threshold 0.55, negative 6% margins,
one-shot unobserve behavior and the no-observer fallback. Wrapped phrases paint
individual marker bands. Replay clears eligibility and increments an observer
generation, so stale callbacks cannot mark a new run. Holds stop native scroll
momentum and defer eligible marks. The native sentence follows a complete
six-second story, 400ms reveal and 40ms stagger; wheel, keys and touch take over.

The full broken headline retains all six original clip partitions, translations
and rotations, and the complete “Break / the grid.” text. Shared 350ms motion
and capped 40ms stagger replace the older timing. Retargeting preserves current
fragment poses, and hover, focus and latch remain independent. Reduced motion
uses static target geometry with 150ms opacity feedback; all four demos own
their frame, listener and observer cleanup and preserve pending intent on hold.

`node tools/verify-text-final.js http://127.0.0.1:4173` checks independent
original fixtures, exact native geometry at four sizes in both motion modes,
real input, live interruption, complete article and number targets, observer
subscription/reset semantics, story completion, caller and viewport holds,
native scroll momentum, compact full typography and complete offline exports.

## SVG & Line: measured paths, radial morphs, underlines and live charts

Path Draw, Blob Morph, Squiggle Underline and Live Line Graph now match their
v4 native compositions (`161:609`, `161:1242`, `161:632`, `161:650`). Eight supplied
SVG files retain their original bytes, dimensions and design slots. Fractional
image dimensions are explicit so compact CSS zoom preserves the thin strokes.
The 160×40px icon group and 132×55.4px underline composition retain their exact
Figma sizes through documented fill exceptions. Other fit gates still apply.

Full views retain all eleven paths across Compass, Current, Orbit and Monogram;
all three sixteen-radius blob states; all three editorial underline phrases and
their complete two-frequency model; and all three eight-value chart datasets.
Independent original captures cover path lengths, radial convergence and spline
poses, procedural wave timecodes and complete chart curves. The shared motion
system replaces the older timing, path stagger and locked chart input.

Path drawing uses measured stroke lengths, a 350ms entrance after 80ms, capped
40ms stagger and a 150ms exit. Native outlines animate in owned SVG documents
created from the unchanged assets. Blob motion retains its original exponential
convergence, sixteen-point topology, pointer bulge and cyclic spline. Full views
keep idle, focus/hover and held states; the native preview adds a six-second
three-state story. Underlines retain their original active-only shared clock;
full Clear preserves phase while native Reset restores the reference frame.

Native shape, underline and chart deformation uses a texture rendered from the
supplied SVG, with shared mesh edges and original model values. No supplied path
data is copied or replaced. The blob uses 64 radial sectors; the underline uses
96 strips and a reveal located from measured path length; the chart uses 48
strips and all eight original values. The chart's exact dot and ring follow its
last value. Full chart replots retarget current floats, and only changed readout
digits animate. Reduced motion keeps loops still and uses brief opacity feedback.

The renderer owns textures, buffers, graphics contexts and asynchronous loading.
Context loss or unavailable WebGL uses a Canvas fallback. Caller, document and
viewport holds preserve model and displayed state; cleanup revokes Blob URLs and
removes embedded documents and canvases. The native blob and chart stories cover
all three original states before wrapping. All previous 253 image payloads, six
font faces and fourteen photo credits are unchanged; no dependency was added.

`node tools/verify-svg-core.js http://127.0.0.1:4173` checks original fixtures,
native artwork and geometry at four sizes in both motion modes, actual stroke
endpoints, chart pixels against an independent original-curve reference, native
input, interrupted motion, holds, complete stories, fallback, cleanup, compact
full typography and complete offline exports. Six SVG & Line demos remain.

Changing full underline and chart paths use normalized stroke lengths, preserving
their complete endpoint through deformation without measuring during each frame.
The native renderer prepares its reference mesh before becoming ready while the
original SVG remains visible. All sixteen desktop and 4x CPU profiles have a
95th-percentile interval of at most 16.8ms and no long tasks. Both blob thumbnail
runs retain two approximately 33ms intervals; this remains performance debt for
the final audit. The other fourteen profiles have no missed intervals.

## SVG & Line: selections, signatures, fluid menus and complete loops

The remaining six SVG demos match their v4 native tiles (`161:670`, `161:692`,
`161:710`, `161:741`, `161:763`, `161:793`). Thirteen new SVG files preserve their
supplied bytes and dimensions. Two icons exactly match existing local assets;
the photo selection reuses the approved, credited architecture photograph.
Signature uses the original Allura face, bundled locally with its SIL OFL licence.
The exact 44×170px open menu stack has a documented sparse fill exception.

Marching Ants supports scaled native drag and lower-right resize, arrow movement,
Shift-arrow resizing and live dimensions. Its size badge keeps 11px physical
text in compact views. Full retains the original measured perimeter, two dash
lanes, acceleration, phase integration and sampled runner. Signature accepts real
mouse, pen and touch input with pressure-aware width. Replay retains all five
original paths, distinct pen rates, measured durations, 90ms lifts and arc-length
nib. The native signed reference uses the exact Allura text and baseline.

The fluid menu retains its real blur/alpha/composite filter and synchronized
semantic and filtered layers. Native shows the supplied three-action stack;
full retains all four original radial actions. Motion retargets live positions
with a 250ms entrance, 40ms item stagger and an unstaggered 150ms exit; opacity,
scale, rise and icon blur follow the origin-aware menu recipe. Keyboard wrapping, restored focus, outside
close, inert closed actions and deferred intents remain available.

Full contour views retain all fourteen original 32-point paths and four-octave
field, with eased pointer influence. All seven original circuit routes, sampled packets and factors remain
complete. All four Lissajous presets, 240 vertices per figure, hold/morph schedule,
echo and tracer remain live. Native views transform the supplied contour assets,
route dots along the supplied traces, and trace the exact supplied 3:2 curve.
The full tracer has an angular clock independent of the dash pattern, correcting
an inherited 153-unit jump when the dash phase wrapped. Its traversal wraps with
the figure cycle, when the preset's endpoints coincide; intermediate open morph
curves keep their original geometry. Parameter schedules and dash integration
remain unchanged, and the original captures are kept.
Caller, viewport and document holds preserve state; cleanup owns documents,
observers, pointer capture and custom ink. Touch leaves no sticky hover state.

Single-file exports and separate CSS retain the complete signature font and
licence. The CSS tab abbreviates embedded font data for reading; Copy preserves
the original bytes. The shared exporter supplies the same CSS to the registry,
CLI and site. Other components retain their existing exported CSS.

`node tools/verify-svg-remaining.js http://127.0.0.1:4173` compares immutable
original fixtures, exact native assets and photo crop, actual pen pressure and
touch, complete live timelines, all curve vertices and circuit paths, native
keyboard behavior, interrupted menus, holds, cleanup, compact full typography,
network-blocked exports, separate CSS and the actual CSS-tab copy flow.

All twenty-four final desktop and 4x CPU profiles use the current module hashes.
Their 95th-percentile frame interval is at most 16.8ms, with no long tasks. The
full Lissajous stress run retains one 33.4ms interval; the other twenty-three
profiles have no missed intervals. Earlier variable measurements are retained
alongside these results for the final performance audit.
