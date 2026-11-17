# Visual remediation progress

The native v4 stage compositions are remediated for 202 of the 399 existing demos: Interface (89),
Data & AI (30), all twenty-two Scroll demos, and all twenty-three Text & Type
demos plus all ten SVG & Line demos and all twelve 3D & Perspective demos in Motion,
and the first sixteen Cursor demos in Pointer & Physics.
The remaining work includes 197 existing demos, 121 new or extension components,
Pro seams, and the final audit.

Photography replacement and performance tails remain open. A current asset
inventory finds the three retired generated photo keys in 44 remaining demos.
None of the 202 remediated native compositions retains those references.

The current full fit audit boots all 399 demos and reports no gate violations
among these 202 native compositions. The unfinished groups still account for
21 overflow findings, zero horizontal-scroll findings, 100 tiny-text findings and
35 low-fill findings; findings can overlap within a demo. All 74 documented
Figma fill exceptions validate.

## Cursor: snap targets, flashlight, glyph rain and magnetic grid

Snap Targets, Flashlight, Glyph Rain and Magnetic Grid follow v4 nodes `165:807`,
`165:836`, `165:859` and `165:884`. Four lazy modules retain the other 37 original
Pointer & Physics objects, all twelve completed cursor modules and 395 stage
metadata records. Chrome/control debt falls from 198 to 194; the motion baseline
stays at 73. Two exact-geometry fill exceptions preserve the sparse target and
glyph compositions, bringing the allowlist to 74. Eighteen new supplied SVGs and
four exact existing matches retain their complete original bytes and root sizes.

Native previews retain the three 40px targets, 16px icons and 52px circular-corner
outline; the 220×150 forest card and exact luminance stencil; all seven geometric
glyph slots and their cursor; and every one of the seventeen magnetic line slots.
The flashlight's initial full-photo reference fades after 650ms into its moving
supplied stencil; the same photograph counter-transforms to keep its crop fixed.
Native magnetic motion deforms the unchanged vertical and horizontal SVG textures
through one owned graphics context, with a complete Canvas fallback.

Full views preserve Archive / 24 projects, Play / Film 01:42 and About the studio /
Since 2014 with their original bounds, snap padding, radii and independent springs.
The changing outline is a vector path with real circular arcs. Flashlight retains
WHAT / THE DARK / KEEPS, both rotated photo panels, captions and orbit. Its retired
generated imagery becomes the approved forestDark and archGrid photographs,
resolving 1600px in live full views and 800px in native previews and exports, with
both existing photographer credits. The remaining retired-photo inventory falls
from 45 to 44 demos, with none among these 202 native compositions.

The independent original fixtures cover all beam-follow, radius, flicker and flare
samples, the seeded 128×64 noise and five actual Canvas readbacks; all ten original
glyphs, the 28/12-particle bursts, complete 160-body cap, random-call order, gravity,
bounces, settlement and lifetime; and all eighteen original full magnetic paths,
their 13/19 samples, quadratic smoothing, orientation gains and both polarities.
Fixed 60Hz simulations retain the original trajectories at 60/120/240Hz rendering.

Flashlight composes fixed radial masks with transforms while retaining the original
optical stops and world-fixed grain. Glyph Rain caches exact native SVGs and all
ten full Inter glyphs as immutable sprite bitmaps; particle count, physics and
content remain complete. Independent screenshot and raster checks compare six
beam poses and all glyphs at three sizes in both themes, including ink coverage,
alignment and compact optical sizing. Physical mouse, keyboard and touch, six-second
native stories, interrupted input, queued intents, independent caller/viewport
holds, resource cleanup and sixteen fresh-context offline exports are covered by
`node tools/verify-cursor-targets.js http://127.0.0.1:4173`, which passes 79,116 checks.

All sixteen final interaction profiles match the verified module hashes. All eight
desktop profiles hold about 60fps, with p95/max intervals at or below 16.8ms, no
missed frames and no long tasks. At 4× CPU slowdown the complete capture ranges
from 35.14 to 60fps, with 289 missed frames and 73 long tasks, concentrated in full
Glyph Rain and Magnetic Grid. The worst gap is 116.7ms and longest task 105ms.
The full Glyph Rain p95 reaches 66.7ms and Magnetic Grid reaches 33.4ms. These
stress costs remain open for the performance audit. Earlier and isolated renderer
captures are retained alongside this complete capture; a faster isolated result
does not establish a stable stress-performance fix.

## Cursor: watching eyes, liquid masses, rope and velocity

Watching Eyes, Liquid Metaballs, Rope Trail and Velocity Stretch follow v4 nodes
`167:843`, `165:770`, `163:1373` and `165:789`. Four lazy modules preserve the other
41 original Pointer & Physics objects, the eight completed cursor modules and
395 stage metadata records. Chrome/control debt falls from 202 to 198; the motion
baseline remains at 73. Two fill exceptions preserve the sparse metaball and
velocity compositions. The eyes and cable already exceed the fill heuristic.
Seven new supplied SVGs and three exact existing matches retain their root sizes.

Native previews retain both 48px sockets, both 14px pupils and their cursor;
the two 52px and one 40px shaded masses; both exact cable layers, pin, tip and
cursor; and the 40×14 capsule beside its 52×14 quarter-opacity, 1.5px-blurred echo.
The eye mapping accounts for the reference pupils' 9px horizontal and 5px vertical
offsets, so tracking remains centered in each actual socket.

Full views restore the original pair of 104px optical sockets and preserve the
asymmetric .18/.145 gaze easing, elliptical reach, head lean and synchronized
280ms blink. They retain all six original orbit specifications and their pointer
mass, spring, quadratic attraction, pulse and alpha threshold; all 22 rope links,
five constraint iterations, gravity, damping, shake impulses and idle anchor;
and the complete 20-frame velocity history, shortest-angle easing, squash/stretch
and three delayed echoes. The original 16.667ms denominator remains inside the
fixed 60Hz simulation. Browser fixtures were captured from the immutable original
JavaScript before production edits; the eye fixture uses the intended visible
socket composition at logical 400×320, avoiding the old startup measurement issue.

Native rope motion deforms the unchanged supplied SVG textures through the
original solver's field. GPU context loss falls back to Canvas; both paths paint
real output and dispose their resources. The full-view touch hit area follows the
moving anchor. Mouse, keys, physical touch, six-second native stories, queued
intents, independent caller/viewport holds and disposal are covered. Reduced
motion starts still and keeps deliberate input with opacity feedback.

`node tools/verify-cursor-motion.js http://127.0.0.1:4173` passes 55,302 checks of original model
fixtures, actual full transforms, every native asset slot at four sizes and both
motion preferences, compact full typography, input, graphics fallback, holds,
cleanup, dark/light stages and sixteen fresh-context offline exports.

All four generated prompts describe the transparent shell-owned stage, shared
dock and complete original numerical models. Eyelids use the original translating
overlay, and the moving head and pupils declare compositor hints. The sixteen
final interaction profiles match the current module hashes. All eight desktop
profiles hold about 60fps, with p95/max intervals at or below 16.8ms, zero missed
frames and zero long tasks. At 4× CPU slowdown, profiles range from 57.95 to 60fps
with p95 at or below 16.8ms; 24 missed frames and six long tasks remain across the
eyes, metaballs and native rope captures. The worst frame gap is 100ms and longest
task 113ms. These stress tails remain open for the performance audit; the earlier
captures are retained alongside the final source-matched measurements.

## Cursor: repelling type, ripples, project previews and ghost drag

Text Repel, Grid Ripple, Hover Preview and Drag Ghost follow v4 nodes `165:546`,
`165:567`, `165:702` and `165:726`. Their four lazy modules preserve the other 45
original Pointer & Physics objects, the first four completed cursor modules and
395 stage metadata records. Chrome/control debt falls from 206 to 202; the motion
baseline stays at 73. Three exact-geometry fill exceptions bring the allowlist
to 70. The only new artwork file is the supplied 3.52px bright dot; five SVGs
match existing local assets exactly.

The native compositions retain every supplied slot: five 40px Geist glyphs and
their cursor, all 117 grid dots including twelve bright positions, three precise
placeholder rows beside the 80×60 aurora crop, and the 120×86 thrown card with its
110×80 origin marker, two bars and cursor. Full views retain all nine MAKE SPACE
glyphs, the complete responsive Gaussian field, all four original projects and
the complete MOVE MATTER artifact. The original radius, squared force, spring,
pulse, grid, propagation, lifetime, placement, velocity, damping, bounce, tilt,
ghost-strength and ghost-fade formulas are checked against fixtures captured
before editing. The original 16.667ms force denominator remains intact inside
the fixed 60Hz simulation.

Hover Preview replaces its retired generated content with the already credited
forestDark, aurora, cityNight and archGrid photographs. All four project names
and categories remain, along with the fourth image's original 70% crop. Native
uses the exact aurora image; live full view resolves all four 1600px photographs,
and offline exports embed the 800px files with their attribution. Inert templates
keep the other full photographs out of thumbnail loading. The remaining retired
photo inventory falls from 46 to 45 demos, with none among these 194 compositions.

Mouse, keyboard and touch remain native. Quick touch seeds one original force
step so the feedback is visible before the next frame; lift, leave or cancellation
releases Text Repel and the glyphs return home. Ghost dragging retains pointer
capture and release velocity, while Home centers and shared Reset restores the
reference pose. Six-second native stories restore the complete reference,
including the ghost's origin marker. Reduced motion starts still and retains
direct input with opacity feedback. Dark and light stages preserve readable ink
and original photo colours. Held input composes on resume; caller and viewport
holds stay independent; disposal cancels frames, listeners, observers and capture.

`node tools/verify-cursor-fields.js http://127.0.0.1:4173` passes 142,966 checks:
complete original numeric fixtures, actual glyph transforms, all painted dots and
ghost projections, exact native asset/type/primitive geometry, optical full text,
physical input, quick-touch release, loop resets, both stage themes, suspension
and cleanup, sixteen fresh-context offline exports and all four live photo credits.

Sixteen interaction profiles cover thumbnail/full modes on desktop and at 4× CPU
slowdown. Every profile matches the current module hash, measures about 60fps,
and has p95 and maximum frame intervals at or below 16.8ms, with no missed frames
or long tasks. The Text Repel profiles were refreshed after the touch fix; their
earlier captures remain available for the final performance audit.

## Cursor: follower, sparks, cable and lens

Gooey Cursor, Particle Emitter, Elastic Cable and Inverted Lens now follow v4
nodes `165:480`, `165:500`, `165:525` and `163:1334`. Each has its own lazy source
module. That pass left the other 49 Pointer & Physics registered objects and
395 stage metadata records unchanged. The public library still contains 399 components.

The native previews use all supplied SVGs in their original dimensions and
positions: twelve new assets and two exact existing matches. Gooey Cursor keeps
the 150×40 target and 32px pointer; the emitter keeps all seven 1.5–4.5px sparks
and its cursor; the cable keeps its 182×24.0001 curve, both anchors and cursor;
the lens keeps the 200×150 archGrid crop and 72px inversion circle. Three sparse
compositions have documented fill exceptions. Overflow and typography gates
continue to apply. The Get started label stays readable at landing-tile sizes
and uses difference blending while the pointer covers it.

Full views retain Index, Studio and Contact, the complete 220-particle emitter,
the original 800×320 quadratic cable model, and the complete optical study with
its title, grid, two orbs and coordinates. Original spring constants, particle
lifetimes, emission/velocity rules, gravity, cable bounds/impulse/tension,
keyboard increments and 1.16/1.35 lens zooms are compared with immutable fixtures
captured from the original registered JavaScript. The cable deforms the supplied
artwork texture through the actual quadratic displacement, including a Canvas
fallback after graphics-context loss. The lens uses the already credited
archGrid photograph, at 1600px in live full view and 800px in portable exports.

All four simulations run the original recurrence at a fixed 60Hz, with equivalent
60/120/240Hz renderer clocks. Native idle stories return through the reference
pose every six seconds; deliberate input takes over. Reduced motion starts on
the reference still, disables hover and retains explicit actions. Shared dock
actions replace in-demo controls. Held input composes on resume without changing
the suspended model; caller and viewport holds remain independent. Frames,
observers, pointer capture and graphics resources are released on cleanup.

`node tools/verify-cursor-core.js http://127.0.0.1:4173` passes 24,559 checks:
original numeric fixtures, actual rendered paths/textures/masks, exact artwork
at four widths and both motion preferences, compact full typography, physical
mouse/keyboard/touch, complete stories, interruptions, suspension and cleanup,
plus sixteen fresh-context offline exports and live photo attribution.

Sixteen interaction profiles cover native/full at desktop and 4× CPU slowdown.
All have p95 frame intervals at or below 16.8ms and no long tasks. Desktop has
no missed frames; the 4× full Gooey Cursor has one 33.3ms gap and the full emitter
has two gaps up to 33.4ms. These three tail frames remain recorded for the final
performance audit. Chrome/control debt falls from 210 to 206; the motion baseline
remains 73 and the fill allowlist grows from 64 to 67 with the owner's exceptions.

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

## 3D & Perspective: navigation, flip cards, journal pages and orbit inertia

Cube Navigation, Flip Grid, Page Turn and Cylinder Carousel now follow v4
(`161:811`, `161:830`, `161:852`, `161:876`). Three supplied cube SVGs retain
their original bytes and dimensions. An inverse basis maps those faces onto
rotating 3D planes; the native still keeps the exact 113×83.9px composition,
including stroke overscan. Its sparse fill exception follows the owner's size
clarification. Full view retains all four original navigation faces and copy,
signed nearest-turn selection, scaled drag and the original release threshold.

The native flip grid has six 52×58px cards, including the exact 16px edge-on
fifth card. Effective corners and borders remain constant as the plane turns.
Full view keeps all eight original fronts and notes, all 256 selection states,
and the original diagonal wave order with the system's 40ms stagger.

The journal retains all four chapters, complete copy, quotes, coordinates and
page numbers. Its native pages, bars and 52×114px raised leaf match the design.
Dragging follows the scaled pointer; release uses the prescribed snappy spring
and original 55px swipe threshold. Reversals and grabs continue from the visible
pose. Chained turns consume remaining frame time, including exact boundary
rounding, so complete stories agree at 60, 120 and 240Hz. Full turns retain the
original fold-shadow and midpoint-light models with interruptible system timing.

The cylinder keeps all eight original posters, signed nearest rotations,
0.32 drag ratio, velocity units, 0.94 inertia decay and 0.16 stopping threshold.
Its continuous clock agrees with the original 16ms recurrence and stop boundary;
arrival uses the prescribed soft spring, checked against an independent force
integration. Native shows the five exact approved photo slots. Counter-scaling
keeps their center-cover crops uniform while frames move around the ring.
All existing photo credits, image payloads and seven font faces remain intact.

Shared dock actions replace local controls. Caller and viewport holds preserve
live poses, defer actions, release capture and clean up owned work. Full copy
remains readable at 390, 375 and 360px; reduced motion keeps the telling still
and opacity feedback. `node tools/verify-perspective-core.js` checks independent
original fixtures, real inputs, renderer clocks, native artwork, complete
network-blocked exports and their original embedded image bytes.

The cylinder's stress trace exposed font-size changes on culled rear faces.
Removing those invisible updates preserves visible type and reduced layout
events from 176 to 3, and paint events from 1,427 to 11 in the diagnostic story.
All sixteen current desktop and 4x CPU profiles have p95 intervals at most
16.8ms and no long tasks. The flip thumbnail retains one stress-frame gap;
the full cylinder retains three. An inconsistent slow thumbnail run remains
recorded alongside clean cold/warm repeats and traces; its cause is unproven.
These tails remain part of the final performance audit.

## 3D & Perspective: Parallax Room and Folding Map

Parallax Room and Folding Map now follow v4 nodes `161:907` and `161:932`.
Five supplied SVGs retain their original bytes and root dimensions. The room
keeps the exact 220×144px wireframe, 100×64px rear wall and 50×36px forest print.
Projective transforms keep all four supplied edges attached to their front and
rear corners as the camera moves. The approved forestBlue original supplies the
native photo and full back-wall print. Full side walls use the approved archGrid
and cityNight photographs. Wall artwork, bench, ceiling lights and the complete
five-plane gallery remain. Corrected wall origins make the interior and its side
photographs visible.

The room preserves its normalized pointer field, ±22°/±12° clamps, 3°/2° key
steps and all three original presets. The old frame-dependent 9% damping is
replaced by the prescribed 400ms pointer tilt and 1000ms return. Touch and
reduced motion do not activate hover; deliberate keys and camera presets remain
available. All controls and readouts use the shared lifecycle and optical type.

The map keeps four exact 40×92px dark panels and the unchanged 141.8×37.8002px
route image, clipped continuously across their creases. Full view retains all
four original route paths, place names, coordinates, compass and route metrics.
Original alternating fold angles remain 87°, −88°, 88° and −88°. Opening takes
400ms per panel, closing 250ms, with 40ms forward or reverse stagger. Reversals
start from the actual visible plane angles. Its original 3600ms idle easing,
2.2° alternating peaks and −220ms phase offsets are checked against the actual
old CSS animation at explicit timeline samples, including live rendered planes.

The original 0.45 visibility threshold and one-shot automatic unfold remain.
An explicit user action takes priority over late visibility deliveries, even
while suspended. The first pointer or keyboard interaction permanently stops
the idle teaser. Holds freeze actual paint and defer intent; cleanup removes
owned observers and frames. `node tools/verify-perspective-spatial.js` checks
independent originals, exact physical native geometry, full content and type at
390/375/360px, native keys and touch, interrupted motion, 60/120/240Hz clocks,
deferred intent and complete network-blocked exports.

The original eight desktop and 4× CPU profiles ran at approximately 60fps, with
95th-percentile intervals at most 16.8ms, no long tasks and no missed frames.

The full gallery now uses the approved v2 photo set in its original three frames.
Full-only templates keep those photographs inert in thumbnails. Detail resolves
the 1600px files before image creation; portable exports embed the credited
800px originals. The verifier checks all frame bounds, source bytes, aspect
ratios, clipping, inert templates, actual Notes credit links and standalone
licence comments. Camera equations, presets, native artwork and stage metadata
remain unchanged.

The refreshed room's desktop profiles run at approximately 60fps, with no missed
frames or long tasks. Both stress profiles retain p95 intervals at most 16.8ms;
they contain 17 missed intervals and one long task, retained for the final audit.

## 3D & Perspective: Point Globe and Wobbly Sphere

Point Globe and Wobbly Sphere follow v4 nodes `161:953` and `161:1135`.
Forty new supplied SVG files retain their original bytes and root dimensions;
the orange city dot exactly reuses an existing local asset. Native globe has
all 166 exact front slots and a hidden rear hemisphere for complete rotations.
Native sphere uses the unchanged 144×144px body and 56×42px highlight. Its
two textures deform on complete grids with the original wave and impulse
field; the still preserves every alpha pixel and the supplied image geometry.
No photograph, font, credit or dependency changed.

Full view retains all 1,800 original Float32 Fibonacci points, the complete
1,617-vertex/3,072-triangle sphere and both original vertex shaders. The sphere
now culls its inward-wound back faces and uses the depth direction of its
original projection, exposing the exterior instead of its interior. The
buffers, vertex deformation, wave, normal and projection equations remain
unchanged. Context loss or unsupported WebGL preserves complete geometry in
Canvas; restoration keeps the current pose. Cleanup releases buffers, shaders,
programs, textures, frames, observers and pointer capture.

Globe keeps its original drift, scaled drag, pitch limits, key increments and
pointer field. Its fractional damping agrees with every original 16ms sample;
drag release uses the prescribed 170/26 soft spring. Repeated turns preserve
visible pose and velocity. A drag release cannot become an accidental pause.
Sphere keeps all three presets, tilt, pointer speed and original energy decay,
extended analytically across refresh rates. Actual renderer stories agree at
60, 120 and 240Hz. Click or Space pauses; deliberate keys remain available.
Reduced motion keeps the telling still and 150ms opacity feedback.

Both components combine deferred intent before applying it: incidental hover
cannot replace a held Reset, mode choice or pause. Caller and viewport holds
stay independent and freeze the displayed pose. Shared dock actions replace
local demo controls. Full typography remains at least 11px at 390/375/360px.
`node tools/verify-perspective-gpu.js http://127.0.0.1:4173` checks independent
original fixtures, actual GPU uploads/uniforms, exact native artwork and texture
pixels, real mouse/keys/touch, interruptions, holds, graphics recovery, complete
fallback and disposal. Each of the four portable full/native exports runs in
a fresh browser context with all network access blocked.

The thumbnail caches spherical coordinates and changes depth brightness in
1% steps, removing repeated calculations and unnecessary per-dot filter
updates. A focused 4× CPU run improved from a 49.9ms to 16.8ms p95 interval,
with no long tasks after the change. All four final desktop profiles retain
p95 at most 16.8ms and no long tasks; three missed intervals remain across
the two thumbnails. Final stress profiles remain variable: globe thumbnail
and full sphere exceed the frame budget, with long tasks. Follow-up system
samples measured 88–100% total CPU load from other applications, but the cause
of the timing variation is unproven. All slow and clean traces remain recorded
for the final performance audit; the stress budget is not claimed as passed.

Per the owner's 17 Nov instruction, GitHub Actions stays disabled and the
account-wide Actions budget stays $0 with usage stopped at the limit. This
phase is verified locally and pushed directly; Pages publication is paused.

## 3D & Perspective: the voxel monument, device, depth hero and layer stack

The final four native compositions follow v4 nodes `161:1153`, `161:1181`,
`161:1259` and `162:692`. Nine supplied SVG files retain their exact bytes and
intrinsic dimensions. The voxel sculpture uses all twelve original face slots;
its 121×79.4px stroke-inclusive bounds have the owner's documented sparse-fill
exception. Device and stack retain all three supplied planes. Depth Hero uses
both independent dusk crops and the exact 34px Geist semibold headline. Compact
planes fit the shared padding at their physical reference size.

Full Voxel Assemble retains all 180 original coordinates, sorted draw order,
eight accent positions, deterministic scatter, three faces and 14/7/14
projection. The .15/.72 excavation recurrence now has an analytic fractional
clock and the original settlement threshold. Actual painted faces are compared
with independent original captures during assembly and quadratic gravity.
The motion system supplies 400ms assembly, 40ms stagger capped at 300ms, a small
80ms contact settle and 500ms collapse with the original 230px quadratic travel
and 600ms rebuild hold. Reversals start at the visible pose. Three cached
Path2D faces reduce repeated Canvas calls without changing their vertices;
invisible faces skip drawing. Scaled pointer input, 12/24px arrow steps,
centered excavation and interrupted rebuilding remain available.

Exploded Device keeps its complete four-layer circuit board, screen, glass,
labels and 132×174px scene. Assembled Z positions remain 0/8/16/24; exploded
positions remain 0/50/100/150. Its original 8s, ±3° sway is retained. A real
scroll viewport maps wheel, touch and keyboard input to separation; hover,
pinning and Escape remain available. Opening takes 400ms, closing 250ms, with
40ms forward/reverse stagger and actual 150ms contact feedback. The native
six-second story begins at the exact expanded reference checkpoint.

Depth Hero retains all five original depth planes, angle limits, pointer and
key increments, complete copy, orbit and foreground readouts. Its full view
replaces the retired generated background with the approved, credited dusk
photograph. Native depth compensation preserves both exact reference crops at
rest. Follow takes 400ms and return 1000ms; the depth comparison remains
available. Foreground readouts stay inside their mask at every camera limit
on 390/375/360px screens. Full copy has a neutral contrast layer.

Isometric Stack keeps all five original report layers, the complete 64.8
report, controls, bar heights and legend descriptions. Its 225×155px world
retains the original 58°/−40° basis, assembled and exploded Z positions,
12→14px shadow offset and .22 isolation opacity. Native selection lifts the
chosen supplied slab by 20px; full hover, focus, pinning and Escape remain
available. The telling native still starts with the top slab lifted. Follow
takes 400ms and return 1000ms, with 150ms highlight opacity.

`node tools/verify-perspective-final.js http://127.0.0.1:4173` covers independent
original fixtures, actual painted geometry, every native SVG/photo/type slot,
real pointer/wheel/keys/touch, interrupted motion, complete renderer stories at
60/120/240Hz, queued Reset and later explicit intent, independent caller and
viewport holds, compact full typography, clipped-text protection, disposal and
eight fresh-context network-blocked exports. Reduced motion holds the native
reference and retains deliberate input with 150ms opacity feedback.

All eight current desktop profiles have p95 frame intervals at most 16.8ms
and no long tasks; full voxel retains one 66.7ms gap. Cached paths reduced
full voxel's measured stress long tasks from 34 to 16 and increased its
average from 43.2 to 47.1fps. Stress runs still retain gaps and long tasks;
full voxel and Depth Hero exceed the frame budget. All old and current results
remain recorded for the final performance audit.
