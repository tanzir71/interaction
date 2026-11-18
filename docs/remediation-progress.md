# Visual remediation progress

The native v4 stage compositions are remediated for 256 of the 399 existing demos: Interface (89),
Data & AI (30), all twenty-two Scroll demos, and all twenty-three Text & Type
demos plus all ten SVG & Line demos and all twelve 3D & Perspective demos in Motion,
all fifty-three Pointer & Physics demos, and seventeen Image & WebGL demos.
The remaining work includes 143 existing demos, 121 new or extension components,
Pro seams, and the final audit.

Photography replacement and performance tails remain open. A current asset
inventory finds the three retired generated photo keys in 23 remaining demos.
None of the 256 remediated native compositions retains those references.

The current full fit audit boots all 399 demos and reports no gate violations
among these 256 native compositions. The unfinished groups still account for
20 overflow findings, zero horizontal-scroll findings, 52 tiny-text findings and
33 low-fill findings; findings can overlap within a demo. All 83 documented
Figma fill exceptions validate.

## Photographic controls: comparison, drifting scenes, radial colour and louvers

Comparison Slider, Ken Burns Crossfade, Duotone Sweep and Blinds Reveal use
their exact v4 native compositions. The native range starts at 50 while full
retains the original 52% restored split. Both use the real 0–100, step-one
range input, native keys, original announcements, double-click centering and
shared Center action. Direct input follows immediately; centering uses the
interruptible 380/32 spring, checked against independent numerical integration.
Native announcements describe divider position; full retains restored-percent
semantics and both original photographic treatments.

Ken Burns retains all three original captions, names, smoothstep camera
paths, translation/scale rounding, eight-second scene duration, 6.4-second fade
start, 1.6-second dissolve and 80ms integration cap. Left/Right, Space, Escape,
pause and cyclic navigation remain available. The six-second native story
samples the complete three-scene source cycle; full keeps its original clock.
Actual full rendering matches all 3,602 captured normal/reduced-motion frames.
Native keeps the 220×165px Forest Blue crop, centred vignette and indicators.

Duotone retains the original hover, focus, latch, release and radial-origin
states, including both full photographic filter pipelines. The exact native
Roses window uses the supplied 200×150px luminance SVG and 82% functional
purple tint. Live reveals run 350ms in/out and origins follow in 160ms. Full
Blinds retains all ten louvers, 850px perspective, top-edge pivots and 88°
endpoint; native has the six supplied partial strips. Motion runs 350ms with
40ms stagger capped at 300ms. Reversals start from the visible circle or angle.
Animation clocks use elapsed logical time, including deferred pointer entry,
so the visible stories agree at 60, 120 and 240Hz.

`node tools/verify-image-photos.js http://127.0.0.1:4173` passes 212,497 checks
across seven suites. These cover independent original models and clock caps,
actual camera transforms, fades, clipping and filters, exact native geometry,
photograph and SVG identities, compact full typography, real mouse/keys/touch,
native vertical scrolling, interruptions, queued intent, independent caller
and viewport holds, disposal and sixteen fresh offline exports. Reduced
motion preserves meaningful state changes without animation loops.

The sixteen measurements in
`docs/performance/image-photos-2026-11-18.json` average 60.0fps at normal and
4× CPU rates, with p95 intervals at most 16.8ms and no slow intervals or long
tasks. Full Ken Burns includes a complete three-scene cycle. The profiler binds
source and harness hashes; these local measurements leave the final site-wide
performance audit open.

## Image fields: static, mesh waves, slice depth and recursive zoom

Static TV, Vertex Wave, Slice Fan and Infinite Zoom now use the exact v4
native compositions. All 69 supplied elements and 17 image instances retain
their authored geometry across 372/390/375/360px stages. Four supplied SVG
payloads cover the eight mirrored wave slots. The approved Interior Dark,
Milkyway, City Night and Sea photographs replace the retired generated content;
native and exported cameras use 800px files, full previews use 1600px files.
Each camera decodes only its own sources.

TV retains its complete original static, tear, chroma, carrier and grain
shader. Vertex retains both literal shaders, all 1189 interleaved vertices,
6720 indices and 2240 triangles, including radial impulses, analytic lighting
and pointer projection. Actual uploaded textures and rendered GPU channels
match independent original-shader renders in both cameras and themes. The
fallback evaluates the complete mathematical effect with worker cancellation
and a synchronous path, bounded to a 256px raster.

Full Slice Fan retains all eight original slats, panorama offsets and depth
poses; native uses the five exact Figma strips. Interruptible reveal runs
350ms in either direction with 40ms stagger capped at 300ms. Tilt follows in
400ms and returns in 1000ms, disabled for touch and reduced motion. Recursive
Zoom retains the complete eleven-candidate field, 2.15 ratio, even-odd holes,
cover crops, original velocities, steering response and depth steps. An
independent capture of the original drawing functions verifies 88 paint cases
and actual Canvas commands. Complete SVG rendering covers Canvas loss.

`node tools/verify-image-fields.js http://127.0.0.1:4173` passes 161,956 checks
across nine suites: independent original states and shader samples, exact
artwork, actual pixels and drawing commands, real mouse/keys/moving touch,
reversals, 60/120/240Hz clocks, six-second stories, queued explicit intent,
independent holds, graphics recovery, cleanup and sixteen fresh offline exports.
The preview clock snaps to each scripted cue, preventing a floating-point
boundary from delaying Slice Fan by one frame at some refresh rates.

The sixteen complete 480-frame profiles in
`docs/performance/image-fields-2026-11-18.json` average 59.9–60.0fps at normal
and 4× CPU rates. Each rate retains one 33.3–33.4ms gap in native Vertex Wave;
the other fourteen scenes have no slow intervals. All p95 intervals are at
most 16.8ms, with no long tasks in the complete runs. Earlier partial samples
retain a 50ms gap and long task. These local SwiftShader measurements record
the remaining timing tails without declaring the final performance audit
passed. `tools/profile-image-fields.js` reproduces both CPU rates and binds
each report to the current sources and measurement tool.

## Current final-perspective timing

The local profiler `tools/profile-perspective-final.js` reproduces 480-frame
native/full stories for Voxel Assemble, Exploded Device, Depth Hero and
Isometric Stack. It exercises interruptions, excavation, camera keys, contact
and selection. Run with `--cpu=1` or `--cpu=4`; `--ids` selects a smaller set.
Each report binds the complete source and harness hashes, verifies that the
browser catalog matches local sources, and rejects changes during measurement.
It records findings without turning completion into a performance gate pass.

The sixteen measurements in
`docs/performance/perspective-final-2026-11-18.json` cover both cameras and CPU
rates. All eight desktop runs average 60.0fps, with no slow intervals or long
tasks. The eight 4× CPU runs average 59.9–60.0fps with no long tasks. Native
Voxel retains one 33.3ms interval; the other seven have no slow intervals.
Every p95 is at most 16.8ms. Separate earlier rechecks retained one 66.6ms gap
and one long task; those traces and the original 47.1fps full-Voxel result
remain recorded. The cause of the variation is unproven.

An easing-cache trial retained bit-identical numeric output and reduced solver
calls, but did not improve measured render time. It was not applied to the
runtime. This checkpoint adds measurement tooling and evidence; all component
models, renderers, assets and metadata retain their existing source bytes.
The broader performance audit and unfinished component work remain open.

## Particle Dissolve: remove repeated dock layout

The particle runtime now updates its Dissolve/Reform label only when the label
changes. Previously, assigning the same `textContent` every frame replaced the
button's text node and repeatedly forced layout. Both native and full cameras
retain every original model, particle, paint command, timing, photograph and
supplied SVG. All other source modules and metadata remain unchanged.

A paired 4× CPU diagnostic over 300 frames reduced label mutations from 300
to 2 in native and 302 to 2 in full. Measured layout time fell from 308.8 to
1.8ms in native and 214.9 to 5.9ms in full. This establishes the removed layout
work. A fresh pre-change baseline already averaged 59.8–60.0fps on this shared
host, so the older 45–50fps traces are retained without attributing their full
timing difference to this guard.

All 29,929,121 image-core checks pass against the updated source, including
complete original states, every particle paint command, exact native artwork,
refresh-rate equivalence, real input, holds, recovery, disposal and twenty
network-blocked exports. Registry, stage, motion and generated-output checks
also pass, with 651 library checks, all 399 previews and 97 general offline
exports. All 248 remediated previews still pass every fit gate. The full fit
audit retains the same findings in unfinished groups.

Final current-source profiles hold 60.0fps in both cameras at normal and 4× CPU
speed, with p95 frame intervals at most 16.8ms, no slow intervals and no long
tasks. All four complete traces retain the source and harness hashes. This
focused pass leaves the other groups' historical performance tails for the
final audit.

## Image & WebGL: distortion, ripples, curl noise and fisheye

Hover Distortion, Ripple Click, Pixel River and Fisheye Lens follow v4 nodes
`168:1672`, `168:1039`, `168:1061` and `168:1175`. Four existing lazy modules
retain catalog order; all 322 other modules, 395 other original objects and
395 other metadata records remain unchanged. Stage debt falls from 152 to 148
and motion debt from 57 to 56 without growing either baseline. All eighty-three
earlier fill exceptions remain unchanged; these four previews use the ordinary
fill gate. Four full compositions replace retired generated photographs.

All 225 native nodes retain their exact declared fractional geometry. The
98 rounded bars become Pixel River's actual shader texture. All 117 fisheye
dots use supplied SVGs; exact size, rotation and style matches reduce those
slots to twenty-four distinct payloads. The 80px lens and three elliptical
ripple rings retain their supplied bytes. Both 200×150px native photographs
reuse the verified Chrome and Sea files; full compositions also use
Architectural Grid. Native/full-only images stay inert until their camera
mounts. Full previews decode 1600px photos; native and exports use 800px.
Portable assets now contain 504 aliases and eighteen unchanged photo credits.

Every original vertex/fragment shader, fullscreen buffer and draw primitive
is preserved literally. Distortion retains its radial/vertical displacement,
chromatic sampling and original .06 intensity recurrence, normalized to
elapsed time. Ripple keeps all five origins, oldest-first replacement, 3.2s
lifetime, signed wave, envelope, glow and cumulative source counter; Clear
retains the original counter and focus behavior. Reduced ripple retains the
original .62s static age. River keeps its complete four-octave noise/curl
derivatives, time domain, 150×90 quantization, signed displacement, .22 idle
intensity and original exponential response. Fisheye retains its aspect-correct
.235 radius, .62 strength, magnification, rim/shade, pointer/radius response
and original settling threshold. Full distortion keeps its original square
cover texture; the native camera uses the supplied photographic crop.

Independent pre-change captures cover 1,444 complete original states. Forty-eight
live GPU comparisons against the original shaders match every output byte,
including the photographic cover crops. All eight native texture uploads
match independent Figma-based reference renders byte for byte in both themes.
Reading raw authored style coordinates avoids CSSOM rounding in the texture.
Independent scalar and bilinear samples cover the complete mathematical Canvas
fallback. Its double-precision noise can differ from GPU transcendental
precision; the fallback retains the complete model at a 256px raster cap.

Mouse, native keys and moving touch operate the real fields. Vertical touch
yields page scrolling. Six-second native stories end on deliberate input;
coarse pointers and reduced motion retain designed stills. Reduced deliberate
states use 150ms opacity feedback. Explicit held Reset/Clear/Release takes
priority over incidental hover. Caller and viewport holds remain independent
and freeze both model and painted output. Coalesced workers reject stale
generations, preserve pending explicit input, and release on disposal.
Real GPU loss reconstructs one complete held Canvas frame; restoration retains
the current state and caller pause. Cleanup accounts for every graphics handle,
observer, frame, worker and Blob URL.

`node tools/verify-image-gpu.js http://127.0.0.1:4173` passes 60,516 checks across
nine source-bound suites, covering exact artwork and uploaded textures, original
models and real paint, native input, 60/120/240Hz renderer clocks, complete
stories, holds, interruptions, recovery and disposal. Sixteen complete portable
native/full exports run in fresh browser contexts with all network access
blocked, including both motion preferences and source/license checks.

Registry, stage, motion and generated-output checks pass, alongside 651 library
checks, all 399 lazy previews, 97 general offline exports, browser stage-runtime
checks, seventeen runtime/shell tests and eight CLI/MCP tests. The four native
posters are refreshed. Source hashes bind the focused suites and broad checks
to the verified modules. All 256 remediated native compositions pass every fit
gate; the full audit still fails on unfinished groups.

All eight desktop profiles average 60.0fps, with p95 frame intervals at most
16.8ms, no slow intervals and no long tasks. The eight 4× CPU profiles average
59.9–60.0fps with the same p95 ceiling and no long tasks. Full distortion and
native River each retain one 33.4ms gap; the other six stress profiles have no
slow intervals. The source-bound traces record Chromium's SwiftShader renderer
on this shared host. Earlier performance tails in other groups remain open
for the final audit; these measurements do not close them.

Repository Actions remain disabled, with no active runs. The account-wide
Actions budget stays $0 with usage stopped at the limit. Verification runs
locally; this phase is committed and pushed directly, with Pages paused.

## Image & WebGL: particles, clip, zoom, resolution and focus

Particle Dissolve, Clip Reveal, Hover Zoom Card, Pixelate Reveal and Focus Grid
follow v4 nodes `168:807`, `168:922`, `168:942`, `168:961` and `168:1005`.
Five separate lazy modules preserve catalog order. The original WebGL Hover
Distortion object remains unchanged in its existing module, alongside 320 other
unchanged original source modules, 394 other objects and 394 other metadata
records. Stage debt falls from 157 to 152 and motion debt from 62 to 57 without
growing either baseline. All eighty-three earlier fill exceptions remain
unchanged; these five native compositions use the ordinary fill gate.

All 151 supplied native nodes retain their geometry. Eight exact SVG payloads
appear in ninety-six particle slots with their fractional root dimensions.
Ten native photo slots resolve to previously verified local photographs;
full compositions retain the original content using the same approved v2 set.
No photo-credit record, font or dependency changes. Four full compositions
replace retired generated imagery, leaving 35 demos to migrate. Portable assets
now contain 476 aliases and eighteen unchanged photo credits.

Full Particle Dissolve retains the original FORM bitmap, all 1,464 sampled
homes, seeds and delays, drift/turbulence, distance alpha and .06/.82 reforming
spring. The offscreen sampler keeps its original color: changing it alters four
antialiased edge samples. The visible paint uses the native mint accent.
All 360 complete original frame states and every live paint command agree with
independent captures. A complete SVG renderer retains every particle during
Canvas loss, and restoration preserves the current pose.

Clip Reveal retains three complete photographs, numbered captions, inset masks
and the original 1.3→1 counter-scale. Replay, Close and Reveal interrupt from
the current state. Canonical 400ms movement, 40ms stagger and faster 150ms exit
replace the old timings. Hover Zoom keeps both original project captions,
1.01/1.08 zoom endpoints and signed eight-pixel pointer field. Its 6s/6.8s
alternating idle transforms agree with the original CSS animation engine.
Deliberate mouse, focus or touch input ends the original idle behavior.

Pixelate Reveal retains all six 2/4/8/16/32/100-percent backing resolutions,
the exact cover crop, 300ms opening hold, 180ms deadlines, final cleanup callback
and manual cancellation. The actual Canvas output matches every channel of the
unmodified original drawing function at three widths and two DPR settings.
The native telling still retains the supplied checker and divider; deliberate
input runs the real photographic sampling model. CPU sampling supplies every
cell in the SVG fallback during graphics loss.

Focus Grid keeps all five full photo slots, original crops and numbered items,
sibling grayscale/brightness/opacity, and its 5s idle with .42s phase offsets.
The native camera has all six supplied photographs and the exact Silk focus
checkpoint. Live idle transforms and opacity match the original CSS keyframes.
Hover lift and elevation follow the canonical 2px, 150ms-in/250ms-out recipe.
The native selection shadow follows the selected photograph. Keyboard focus,
pinning and touch retain access to every item; vertical gestures yield page
scrolling. Reduced motion preserves deliberate state feedback and designed
stills. Explicit queued Reset takes priority over incidental held hover.

`node tools/verify-image-core.js http://127.0.0.1:4173` passes 29,929,121 checks
across seven suites, including exact assets and native geometry, complete source
models and paint, real input, 60/120/240Hz clocks, six-second stories, independent
caller/viewport holds, interruptions, graphics recovery, resource cleanup,
390/375/360px full typography and twenty fresh network-blocked exports.

Registry, stage, motion and generated-output checks pass, with 651 library
checks, all 399 lazy previews, 97 general offline exports, browser stage-runtime
checks, seventeen runtime/shell tests and eight CLI/MCP tests. The five native
posters are refreshed. Source hashes bind the focused suites and broad checks
to the committed modules. All 244 remediated native compositions pass every fit
gate; the full audit still fails on unfinished groups. The package test was
rechecked successfully after an overlapping clean dependency install finished.

All ten current desktop profiles average 59.9–60.0fps, with p95 frame
intervals at most 16.8ms, 1 slow interval and 0 long tasks.
The ten 4× CPU profiles average 45.1–60.0fps and retain 192 slow intervals
and 19 long tasks, up to 107.0ms. Particle Dissolve averaged 50.2fps
in native and 45.1fps in full; its 4× CPU 60fps target was left open at that
release. The later layout and frame-timing follow-up is recorded above.
Measurements share this host with other active work. The earlier source-bound
profiles and separate model/render/style diagnostics are retained, including
the mixed results of an experimental layer hint that was not shipped.


Repository Actions remain disabled. Verification runs locally, and this phase
is committed and pushed directly. The account-wide Actions budget stays $0
with usage stopped at the limit; Pages publication remains paused.

## Play: bounce, secrets, fireworks, fracture, pet, gravity, window and snake

The final eight Pointer & Physics demos follow v4 nodes `164:877`, `164:896`,
`164:936`, `164:969`, `164:992`, `164:1012`, `164:1033` and `164:1055`.
Their existing lazy modules retain catalog order. The prior forty-five
Pointer & Physics demos, 313 other source modules and 391 other metadata
records stay unchanged. Chrome/control debt falls from 165 to 157 and motion
debt from 66 to 62, without increasing either baseline. Konami adds the owner's
documented sparse-fill exception: eight 32px caps, 4px gaps, 284×32px total
against the 372×264px reference stage. All eighty-two earlier exceptions stay
unchanged; overflow and text-size gates still apply.

Thirty-six supplied SVG bindings preserve exact bytes, intrinsic fractional
bounds and native callsites. Thirty-five assets are new; snake food reuses an
existing byte-identical file. Native views keep the supplied badge, caps,
sixteen firework rays and center, fracture slab, pet/rings, gravity page,
window/shadow and 10×8 grid. No photo, credit, font or dependency changes.
Portable assets now contain 468 aliases and eighteen unchanged photo credits.

Full compositions retain all original numerical models and content: combined
corner reflection and five bounce states; the complete ten-key secret, recovery
rules and forty-eight confetti fixtures; all rockets, forty-two sparks per
burst and delayed three-rocket salvo; both fracture thresholds and twelve
polygons; slow-stroke pet affection, eye/lean fields and expiring hearts; all
eight original gravity bodies; the complete window spring/bounds recurrence;
and the 20×14 snake world, all eight foods, score and original collision rules.
Gravity's readable full camera maps the unchanged source bodies into columns,
preserving initial and floor/ceiling anchors. The full window reserves more
height for its copy while retaining the original bound calculation. Snake's
native camera follows its supplied six-cell pose through the complete world;
full retains the original four-cell seed. All full type remains at least 11px
at 390px, 375px and 360px.

Physics uses a fixed source clock; the game preserves independent 145ms
deadlines. Complete native stories loop every six seconds until deliberate
input. Press and pop-in feedback use canonical motion tokens; reduced motion
keeps meaningful stills, deliberate controls and the playable discrete game.
Deferred intent, independent caller/viewport holds, released captures, stale
launch cancellation and cleanup remain covered. Fireworks records every source
substep, freezes actual pixels on Pause, and retains complete recursive trails
in its SVG fallback. Graphics restoration preserves the current model.

`node tools/verify-play.js http://127.0.0.1:4173` passes 477,250 checks across
six suites, including 2,880 independently captured original frames, exact
artwork, every original firework paint command, real scaled mouse/keys/touch,
60/120/240Hz clocks, interruptions, holds, cleanup and thirty-two fresh-context
network-blocked exports. Production exports contain no mutable test hook.

Registry, stage, motion and generated-output checks pass, alongside 651 library
checks, all 399 lazy previews, 97 general offline exports, browser stage-runtime
checks, seventeen runtime/shell tests and eight CLI/MCP tests. A clean package
install and its npm test command also pass. The eight native posters are
refreshed. Source hashes bind the focused suites and broader checks to the
committed modules. All 239 remediated native compositions pass every fit gate;
the full audit still fails on unfinished groups.

All sixteen desktop profiles average 59.9–60.0fps, with p95 frame intervals
at most 16.8ms and no long tasks. Full Fracture retains one 33.3ms gap; the
other fifteen profiles have no slow intervals. The sixteen 4× CPU profiles
average 52.6–60.0fps and retain 105 slow intervals and twenty-four long tasks.
Native Fireworks averages 53.7fps and full Window Drag 52.6fps, both with
33.4ms p95 intervals. The final stress audit remains open. Complete samples
and the incomplete first timing probe are retained with source/harness hashes.

Repository Actions remain disabled and there are no active runs. A fresh live
account check confirms the saved $0 Actions budget, Stop usage when budget
limit is reached checked, and Usage blocked. No billing change was needed.

## Liquid: ink, melting type, smoke, bubbles and photographic fields

Ink Bleed, Melt Drip, Smoke, Bubble Pop, Liquid Image and Liquid Mask follow v4
nodes `164:733`, `164:758`, `164:779`, `164:798`, `164:830` and `164:852`. Their
six existing lazy modules retain catalog order. The prior 39 remediated
Pointer & Physics demos, eight original Play demos, 315 other source modules
and 393 other metadata records stay unchanged. Chrome/control debt falls to
165 and motion debt to 66. All 82 fill exceptions stay unchanged; these six
native compositions pass the ordinary fill gate at their exact reference size.

Fifteen supplied SVGs retain their exact bytes and intrinsic dimensions:
both photographic masks, five bubble body/highlight pairs and three ripple
rings. Bubble Pop has eight visible native bubbles using the five supplied
pairs; its full field retains all eighteen original bodies. The approved Roses
and Smoke photographs are identified against the primary Unsplash originals,
confirmed under the free licence, self-hosted at 1600px and 800px, and recorded
with both file hashes and photographer credits. Sea reuses the previously
verified local photograph. Portable assets now contain 432 aliases and eighteen
photo-credit records. Three full compositions shed retired generated photos,
leaving 39 demos to migrate.

Full Ink retains all five recycled turbulent blooms, original 600×380 input
coordinates and archive/land/sea/field-notes copy. Melt retains the complete
600×380 glyph bitmap, original gradient/scanline alpha and all 150 heated
columns, while its visible RGB paint follows the neutral palette. Smoke retains
all 180 seeded tracers, curl-noise derivatives, vortex and gust forces, complete
trails and particle lifetimes. Its exact native photograph deforms through the
same field, with GPU rendering and a complete Canvas fallback. Bubble Pop
retains buoyancy, all eight droplets per pop, expanding rings, the 84-tick
respawn and the original last visible pop frame.

Liquid Image retains all three 288×200 Float32 buffers, ordered updates,
0.985 damping, original wake/drop/idle amplitudes, sample indexing, four-pixel
displacement per axis and twelve-percent specular gain. Its renderer avoids
per-pixel object allocation without changing any sampled result. Liquid Mask
retains two distinct complete photographs, all 97 boundary points and seven
droplets, the original half-resolution mask, blur/threshold operation and
0.08 follow. Entry/exit and flood/restore use the canonical timing and easing
tokens; interrupted pointer activation preserves the visible center and radius.
Keyboard and shell activation still center the original flood. Canvas readbacks
use dedicated CPU surfaces and cached photo rasters while preserving exact
original mask pixels.

The shell owns all driver controls. Every original action remains available,
including Pause for each three-action simulation. Native mouse, keyboard and
touch input, moving bubble targets, scaled capture, caller/viewport holds,
queued intent, reset cancellation, graphics loss/recovery, reduced/coarse stills
and disposal are verified. Native views retain the 240×168 reference plane.
Full views use 400×320; Smoke uses 400×340 so its complete caption stays inside
the stage on narrow screens. Full Melt and Bubble canvases adapt their neutral
paint to light stages. All six complete compositions retain readable type at
390px, 375px and 360px.

`node tools/verify-liquid-remaining.js http://127.0.0.1:4173` passes 7,460,882
checks across six suites, covering all 2,160 original model frames,
independent paint fixtures, complete live pixels,
60/120/240Hz clocks, six-second stories, exact native assets and twenty-four
fresh-context offline exports. Source hashes bind the focused suites, broader
checks and profiles to the modules being committed. Registry, stage, motion
and generated-output checks pass, alongside 651 library checks, all 399 lazy
previews, 97 general offline exports, browser stage-runtime checks, seventeen
runtime/shell tests and eight CLI/MCP tests. The six native posters are
refreshed. The full fit
audit still fails on unfinished groups; all 231 remediated native compositions
pass every fit gate.

All twelve final desktop profiles average 60fps, with p95 intervals at most
16.8ms, no slow intervals and no long tasks. Final 4× CPU samples average
55.0–60.0fps and retain 63 slow intervals and nine long tasks; Liquid Image
averages 55.0fps in native and 57.1fps in full. Before renderer optimization,
those views averaged 49.7fps and 48.6fps. An earlier optimized run averaged
59.1fps and 59.4fps, demonstrating timing variation across runs. Original,
intermediate and final samples remain separate and source-bound. The broader
final stress audit remains open. Repository Actions stay disabled. The last live account check
confirmed a $0 Actions budget, Stop usage when budget limit is reached enabled,
and Usage blocked. A later attempted UI recheck stopped before reading billing
because Computer Use could not verify the browser URL; it changed no settings.

## Liquid: membranes, magnetic fields, water and thermal bodies

Liquid Buttons, Ferrofluid, Water Ripple and Lava Lamp follow v4 nodes
`164:1272`, `164:1201`, `164:691` and `164:712`. Four existing lazy modules keep
their catalog positions. The prior 35 Cursor/Physics modules, fourteen remaining
original Pointer & Physics objects and 395 other metadata records stay unchanged.
Chrome/control debt falls to 171 and motion debt to 68. One documented fill
exception preserves the two 84×40 liquid controls and their 12px separation.
Ferrofluid's 55-bar field and the complete lamp remain at their exact sizes.

Eight supplied SVGs retain their exact bytes and intrinsic dimensions: the
orange membrane, all five water layers, the complete lamp and its shadow.
Native labels retain the supplied 13.5px Inter styling with optical protection
at compact widths. Full membranes retain Explore, Listen and Collect, the
original normalized pointer-radius and tilt equations, active state, energy
decay and staggered pulse. Reset starts a new generation so an old pulse or
rest timer cannot alter the new state.

Full Ferrofluid retains all 35 original sources and the complete 288×180 scalar
field. Its GPU renderer evaluates every source at every pixel and reads the
coverage channel; Canvas fallback evaluates the complete original raster.
The renderer caches the uploaded field values and program locations, avoiding
duplicate readbacks when input has not yet changed a simulation pose. A draw-call
regression checks both reuse and the next complete two-pass field update.
Independent source captures verify exact CPU pixels. Live GPU channels are
compared with the original raster to within one intensity step. The native
55-bar composition responds through the same source field and retains every
reference height, opacity, corner and position.

Water retains all 128×80 cells and three Float32 buffers, ordered wave updates,
original wake and splash kernels, gradient luminance, pause and clear behavior.
The five supplied native textures deform through those wave gradients, with
complete software fallback. Full lava retains all seven original bodies,
thermal phases, wrap equations, overlaps, merge, palette and native heat range.
Its compact view preserves the three colored regions of the supplied texture
while the vessel stays fixed; their movement projects original trajectories.
Palette also changes the compact lamp and shadow, and Reset restores their
supplied reference color.

The verifier covers original captures across 1,440 frames, complete live pixels,
native mouse/keys/touch, scaled drag capture, heat-range input, independent
caller/viewport holds, queued intent, six-second stories, 60/120/240Hz clocks,
graphics loss/recovery, reduced/coarse stills, compact typography, cleanup and
sixteen fresh-context offline exports. Photography provenance and the remaining
retired-photo inventory stay unchanged.

`node tools/verify-liquid-core.js http://127.0.0.1:4173` passes 3,084,359 checks
across six suites. Registry, stage, motion and generated-output checks pass,
alongside 651 library checks, all 399 lazy previews, 97 general offline exports,
browser stage-runtime checks, seventeen runtime/shell tests and eight CLI/MCP
tests. A fresh full audit passes every gate among all 225 remediated native
compositions. Eight supplied SVGs are self-hosted, and the four native posters
are refreshed. No shared shell/runtime, prior component or photo-credit changes
are needed for this group.

All eight current desktop profiles and eight 4× CPU profiles average 60fps,
with p95 intervals at most 16.8ms, no slow intervals and no long tasks. The
retained uncached run recorded 28 slow intervals across eight 4× views, with
full Ferrofluid averaging 57.4fps. Its traced diagnostic averaged 51.2fps and
recorded 81 slow intervals; repeated GPU readbacks dominated the recorded work.
The original and optimized measurements remain available. Timing in unchanged
views also varies between runs, and the broader final stress audit remains open.
Verification stays local with repository Actions disabled and the account's
verified $0 Actions budget and stop-at-limit setting preserved.

## Physics: collisions, soft mesh, cloth, impact and snapping

Collision Bubbles, Soft Body, Cloth Flag, Wrecking Ball, Inertia Window and Magnet
Snap Grid follow v4 nodes `164:562`, `164:599`, `165:1087`, `165:1041`, `164:642`
and `164:666`. Their six existing lazy modules retain catalog order. The other
twenty-nine completed Cursor/Physics modules, eighteen remaining original
Pointer & Physics objects and 393 other metadata records stay unchanged.
Chrome/control debt falls to 175; motion debt stays at 69. No new fill exceptions
or photography changes are needed.

All nine supplied SVG sources retain their exact downloaded bytes and intrinsic
dimensions. Seven become local files; two reuse identical existing pointer
artwork. Native compositions preserve nineteen 38px bubbles, both soft-body
layers, the complete supplied flag, cable and ball, the two word groups, both
window ghosts and supplied front, all six magnetic slots and both modules.
Full Collision retains the twelve original named/radius-varied bodies; full Snap
retains all six original module labels, glyphs, occupancy and swap behavior.

The original models keep elastic pair ordering and repeller velocity transfer;
all 24 sequential coupled radial springs and pressure falloffs; all 126 cloth
vertices, nine pins, five constraint passes and complete wind phases; the full
pendulum and six IMPACT bodies; original window friction, throws, rebound and
shadow equations; and the critically damped slot spring. Cloth constraint lookup
uses direct vertex indices while preserving the source's ordered operations.
Independent captures compare every field across 2,160 original frames.

The native jelly and flag deform their supplied textures through the original
fields. The WebGL path shares mesh edges; the Canvas fallback closes triangle
seams. Context loss/recovery preserves held physical state, and disposal frees
both backends. GPU mesh positions reuse an allocated buffer, and cloth sampling
keeps the original bilinear ordering without per-vertex tuple arrays. Full SVG
and Canvas renderers match original source poses and all mesh drawing commands.
Both preview/full clocks agree at 60/120/240Hz; every
native story restores its telling reference after six seconds.

Native range, pressure, wind, impact, throw and snap input works with mouse,
keyboard and touch at scaled sizes. Cloth keyboard grabs have a visible vertex
marker, and slot arrows follow the actual three-column layout. Full Soft Body
keeps the original localized pressure indicator. Full Inertia Window keeps
Notes, the session label, headline and complete explanatory copy with the same
232×170 physical body. Caller/viewport holds, queued Reset, interrupted capture,
reduced/coarse stills, compact full text and twenty-four fresh-context offline
exports are verified by `node tools/verify-physics-remaining.js`. Collision
Pause/Resume labels and pressed state also agree after Reset and suspension.
The focused suite passes 507,919 checks across the six groups of assertions.

The complete library verifier passes 651 checks, all 399 lazy previews and 97
general offline exports. Registry, stage, motion, generated-output, browser
stage-runtime, seventeen runtime/shell and eight CLI/MCP checks pass locally.
The fresh audit finds no gate violations among the 221 remediated native
compositions. Generated artifacts and the six native posters are refreshed.

All twelve current desktop profiles and twelve 4× CPU profiles average 60fps,
with p95 intervals at most 16.8ms, no slow intervals and no long tasks. The
retained earlier 4× run averaged 52.9–59.8fps, with 178 slow intervals and 34
long tasks up to 125ms; its separate three-view diagnostic averaged 59.4–59.9fps.
Only Soft Body and Cloth changed during the allocation optimization, so improved
timing in the other four views also demonstrates run-to-run variation. Both
sets of evidence are preserved, and the broader stress-performance audit remains
open alongside the earlier Gravity tail.

This phase is committed and pushed directly to `main`. Repository Actions remain
disabled with no active runs; the account's verified $0 Actions budget and
stop-at-limit setting remain preserved. No workflow or deployment is started.

## Physics: spring response, pendulums, constraints and gravity

Spring Follower, Pendulum Tags, Chain Links and Gravity Icons follow v4 nodes
`163:1354`, `164:480`, `165:1061` and `164:508`. The four existing lazy modules
retain their catalog positions; all twenty-five completed Cursor modules,
twenty-four remaining original Pointer & Physics objects and 395 other stage
records stay unchanged. Chrome/control debt falls to 181; motion debt stays at
69. Three documented fill exceptions preserve the sparse spring, pendulums and
outlined links, bringing the allowlist to 81. Photography provenance and the
remaining retired-photo inventory stay unchanged.

Native previews retain the exact 101.4×17.2062 spring artwork, 16px ring and 8px
target; all five supplied 1px string slots, 24×32 tags and 180×3 rail; ten 24×14
outlined chain links; and all eleven 34px icon cells with their supplied 16px
artwork. Sixteen independently downloaded SVG sources retain their exact bytes;
five reuse identical existing files. Native gravity keeps the complete v4 pile
and floating lightning icon. Its full view keeps the original ten glyphs.

Full Spring Follower retains both real range inputs, all three original presets,
live stiffness/damping classification, 28px keyboard targeting, original bounds
and semi-implicit Euler response. Pendulum Tags retains all five named/numbered
tags, original physical lengths, localized falloff, alternating impulse weights,
920 gravity and .992 Verlet damping. Chain Links retains all eighteen points,
seventeen segments, fixed anchors, six ordered constraint passes, 850 gravity
and original midpoint pulses. The ten native capsules project selected original
joints, so the grabbed capsule follows its actual scaled pointer position.
Arrows select a joint, Enter grabs/releases it, and arrows move the held joint
with visible selection feedback. Space retains the original midpoint pulse.

Full Gravity Icons retains all ten original symbols, seeded random-call order,
980 acceleration, wall/floor restitution, friction, all three pair-collision
passes, held-body exclusion and clamped throws. Its simulation clock preserves
the original 60Hz timestamp arithmetic at sensitive contact boundaries. The
native eleven-body study applies the same solver at its exact v4 size. Reduced
full gravity shows a still from the original solver's settled drop; native
reduced/coarse previews retain their exact reference poses. Deliberate input
remains available with bounded opacity feedback.

Independent captures cover 1,800 original simulation frames and adversarial
collision pairs. The verifier compares every recorded joint/body, preset,
impulse and paint sample; actual full renderers also match the source captures.
Real range keys, presets, mouse, keyboard and touch dragging exercise live
controls and scaled geometry. Caller/viewport holds release browser capture,
freeze all physical fields and safely finalize interrupted grabs on resume.
Reset ordering, complete disposal, equivalent 60/120/240Hz renderer clocks,
compact full typography and sixteen fresh-context offline exports are checked.
`node tools/verify-physics-core.js http://127.0.0.1:4173` passes 110,325 checks.

All eight desktop profiles average 60fps, with p95 intervals at most 16.8ms,
no missed intervals and no long tasks. The original eight 4× CPU profiles are
retained: full Spring and native Pendulum have isolated slow frames, while full
Gravity averages 54fps with 33.4ms p95, forty slow intervals and eight long tasks
(71ms maximum). Separate traced runs of those three views hold 60fps without
slow intervals. These differing measurements leave the stress performance tail
open for the final audit; the clean diagnostic runs do not replace the originals.

The fresh 399-demo fit audit has no violations among all 215 remediated native
compositions. Registry generation, 651 library checks, 97 general offline
exports, shell lifecycle checks, seventeen runtime/shell tests and eight CLI/MCP
tests pass locally. GitHub Actions stays disabled, with no active runs, and the
account-wide Actions budget is $0 with its hard stop enabled. This phase is
committed and pushed directly without a PR or workflow run.

## Cursor: the five classic interactions

Trailing Cursor, Magnetic Button, Image Trail, Spotlight Mask and Tilt and Glare
follow v4 nodes `165:1002`, `165:1020`, `163:1258`, `163:1288` and `163:1313`.
Five lazy modules replace the final cursor bundle while retaining catalog order.
The other twenty completed cursor modules and all twenty-eight remaining original
Pointer & Physics objects stay unchanged. Stage debt falls to 185 and motion debt
to 69. Exact sparse ring/dot, button and four-photo geometry has three documented
fill exceptions. The full photo migrations remove two more retired-photo demos.

Native compositions retain the unchanged 28px ring, 6px dot and three separately
downloaded, byte-identical 28.5×29.25 pointers. They preserve the exact button and
ghost offsets, four 64×48 photo slots with their original opacity, five spotlight
bars and soft elliptical field, and the 140×150 chrome crop and diagonal glare.
The shared 240×168 plane has the same two-pixel lift as the other cursor previews.
Native artwork and full text are checked at four compact preview widths and
390/375/360px full widths, with normal and reduced motion.

Full Trailing Cursor keeps both original links, direct dot and .12 follower.
Magnetic Button keeps both 120px circular controls, .4/.7 shell/label attraction,
400ms quartic follow and 900ms elastic return. Independent fixtures from actual
GSAP 3.12.5 include interrupted and overlapping tweens; the production module now
implements those curves and retargeting without a runtime library dependency.
Image Trail keeps its complete copy, strict distance greater than 90px, three-photo
cycle, original random-call order, ±7° print poses, 112×142 portraits, segmented
1000ms flight and exact removal time. Real elapsed time drives deliberate flights;
their live CSS matrices match independent samples of the original animation.

Spotlight Mask keeps both original messages, .15 follow and full 110px circular
98–100% mask. Its bounded static gradient moves with transforms. Tilt and Glare
keeps the full architecture card, complete field-note copy, original ±10° target
and glare equations, raised content and 4800ms idle model. Live checks continue
through 24 seconds, so the full idle cycle cannot accidentally reset with the
six-second native story. The motion system supplies 400ms follow, 1000ms return,
300ms glare opacity and 150/250ms ring growth and release.

Image Trail's full coast/architecture/water sequence uses approved ocean, archGrid
and sea photographs. The exact sea image is Clayton Tonna's free Unsplash License
photograph `qINZ8zEYErY`, verified on 17 November 2026. Both self-hosted sizes,
dimensions and hashes are recorded. Native Image Trail retains the supplied
cityTeal, aurora, ocean and embers crops; native Tilt retains chrome, while its
full retired pavilion image becomes archGrid. Live full uses 1600px photographs;
native previews and exports use 800px. Inert templates defer unused compositions.

Coarse pointers keep still reference previews and usable native buttons/links.
Reduced motion retains the native cursor and deliberate opacity feedback.
Keyboard and touch placement, interrupted motion, queued Reset, independent
caller/viewport holds and complete cleanup are verified. Incidental held hover
cannot override Reset. `node tools/verify-cursor-classic.js http://127.0.0.1:4173`
passes 8,772 model, artwork, input, rendering and portable checks, including twenty
fresh contexts with all network access blocked.

All twenty current desktop and 4× CPU profiles average about 60fps, with p95
frame intervals at most 16.8ms, no missed intervals and no long tasks. Earlier
performance tails in other demos remain open for the final audit. The fresh
399-demo audit finds no fit violations among all 211 remediated native
compositions. Registry generation, 651 library checks, 97 general offline
exports, shell lifecycle checks, seventeen runtime/shell tests and eight CLI/MCP
tests pass locally. GitHub Actions remains disabled; the account's Actions budget
is $0 and its live budget table reports Usage blocked. This phase is committed
and pushed directly without a PR or workflow run.

## Cursor: thermal fields, crosshair telemetry, pull and shadow

Heat Shimmer, Crosshair HUD, Pull Distort and Shadow Parallax follow v4 nodes
`165:919`, `165:939`, `165:960` and `165:981`. Four lazy modules preserve the other
33 original Pointer & Physics objects, sixteen completed cursor modules and 395
stage metadata records. The five older cursor demos retain their original bundle
and catalog positions. Chrome/control debt falls from 194 to 190; the motion
baseline stays at 73. One exact-geometry fill exception preserves the sparse HUD,
bringing the allowlist to 75. The remaining retired-photo inventory stays at 44
demos, with none among these 206 native compositions.

Native previews retain the exact 200×150 fire crop and 100×100 circular optical
overlay; 1×165 and 293×1 crosshair lines, 24px frame and 78×22 coordinate surface;
201×129 pull-card artwork, both bars and original pointer; and the 44px lamp,
120×80 object, both bars and diffuse cast. A 320×168 HUD plane keeps both line
assets at their original physical sizes. A two-pixel composition lift aligns all
four complete 372×264 previews to their actual Figma stage slots, including
negative half-pixel stroke outsets. Native coordinates use the supplied Geist
Mono Medium 11.5px type and preserve that optical size on compact stages.

The fire photograph is David McCumskay's free Unsplash License image
`JKAKwrATVq8`, image ID `photo-1530374195309-8c25022c4753`. A separate primary
1800×1200 download matches the native Figma raster at RGB RMS 0.53. Local 800px
and 1600px WebP files, provenance and both hashes are recorded. The native lens
retains the source SVG with its actual background blur; the original full thermal
instrument avoids loading this native-only photograph. All fourteen earlier photo
credits remain unchanged. Five new supplied SVGs and one exact existing pointer
bring the portable bundle to 376 image aliases, seven fonts and fifteen credits.

Full views preserve THERMAL TRACE, all markers, COOL/HOT scale and temperature;
SECTOR 07, ACQUIRE SIGNAL, four targeting corners and X/Y/VEL/BRG telemetry;
ELASTIC MATTER, FORM FOLLOWS FORCE, the original poster, ring, square and all eight
wire handles; and LIGHT STUDY / 01, FORM 07, contact/cast shadows and offset meter.
Fixtures captured before production edits retain every original thermal particle,
random call and 140-point cap; unequal HUD axis springs and frozen-target/raw-input
states; all eight distortion nodes, boost, influence, polygon and art parallax;
and both light modes' reach, blur, opacity, stretch, contact, highlight and tilt.
Fixed 60Hz simulations preserve these trajectories at 60/120/240Hz rendering.

Thermal fields use an immutable radial sprite with independent pixel comparisons
against the original optical ramp at thirty radius/temperature/DPR combinations.
The native pull renderer deforms the unchanged supplied card texture and exact
bars with the original eight nodes; graphics loss paints a complete Canvas
fallback. Shared dock actions retain the current target/light position. Physical
touch places the HUD and lamp; a quick pull tap seeds one original spring step.
Interrupted dragging releases browser capture, freezes every node through caller
holds, and queues tension release for resume. Reduced input uses direct states
and bounded opacity feedback. Reset, six-second stories, queued actions, viewport
holds, cleanup, compact type and sixteen fresh-context offline exports are covered
by `node tools/verify-cursor-final.js http://127.0.0.1:4173`: 54,027 focused checks.

All sixteen final interaction profiles match the verified module hashes. Seven
desktop captures hold about 60fps without missed frames; native Shadow Parallax
records 59.75fps and two missed frames, with no long tasks in any desktop capture.
Desktop p95 stays at or below 16.8ms and the worst gap is 33.4ms. At 4× CPU
slowdown, the HUD, pull and shadow profiles hold about 60fps with no missed frames
or long tasks. Thermal native/full captures reach 58.42/45.84fps and account for
all 142 stress missed frames and four long tasks. The full thermal p95 is 33.4ms,
worst gap 66.7ms and longest task 57ms. These costs remain open for the final
performance audit.

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
average from 43.2 to 47.1fps. At that release, stress runs retained gaps and
long tasks; full voxel and Depth Hero exceeded the frame budget. The later
source-bound rechecks are recorded above. All old and current results remain
recorded for the final performance audit.
