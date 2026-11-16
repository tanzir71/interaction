# Visual remediation progress

The v4 redesign is complete for 152 of the 399 existing demos: Interface (89),
Data & AI (30), all twenty-two Scroll demos, and the first eleven Text & Type
demos in Motion. The remaining work includes 247
existing demos, 121 new or extension components, Pro seams, and the final audit.

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

Twelve Text & Type demos, plus SVG and 3D studies in Motion, remain. Other unfinished categories,
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
