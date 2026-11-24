# Final audit follow-ups

The full 520-component handoff remains open. Per-component verification and prepared-font timing reports do not replace the final library, accessibility, cold-route or Lighthouse audits.

The [initial component accessibility scan](accessibility/components-initial-2026-11-24.json)
now covers all 520 components across native/full, dark/light and reduced/normal
initial states: 4,160 cases, 726 rule violations across 140 components, 1,945
incomplete results and no page errors. The source-bound report preserves every
rule, affected condition and representative element. Triage thumbnail focus
findings against the actual live/paused catalog contract; this fixture alone
does not establish the complete catalog experience. The earlier stopped
identity-resolver scan is invalid diagnostics, excluded from the report.

Three initial form findings are repaired: Upload's visible text supplies its
button name, Signature's real keyboard Canvas is exposed, and selectable
adjacent-month dates exceed 4.5:1. The targeted scan clears the automated
violations in 24 cases; 272 actual name/file-chooser/keyboard/contrast checks
pass. Eighteen incomplete results remain. Manual review already confirms
full-calendar weekday labels at 4.08:1 and an unreadable Upload heading on the
light Stage. Repair these and audit light-stage heading/help text across the
full compositions. Preserve the native reference geometry and artwork.

Chrome 158 can acknowledge a touch move before delivering its PointerEvent.
The old Precision assertion read 55.6 before delivery and 56.60000015 after
delivery with the same production model. The verifier now awaits the actual
event, retaining all 118 checks and original numerical tolerances. The failed
run and both diagnostic observations remain archived.

The [worker investigation](performance/threads-worker-2026-11-24.json) preserves
completed-bitmap rates separately from source callbacks. Page CPU emulation
does not independently establish worker throttling. Bitmap transport matches
the original HTML Canvas pixels, but OffscreenCanvas clips differ at DPR 1/2;
direct slices and alpha-mask variants also differ. No experiment is accepted,
and native Threads' CPU4 finding remains open.

The final shell accessibility pass repairs the unnamed mobile search trigger,
Copy inside the install tablist, button-only ARIA on the library grid, missing
keyboard access to scrollable source/tables, the setup landmark, faded group
counts and low-contrast light-theme shell text. The dedicated shell verifier
covers actual keyboard routes at 1440/390/360px in both themes. This does not
close component-interior or modal audits, manual contrast review, pixel focus
clipping, motion recipes or the earlier CPU4 timing findings.

Initial Lighthouse 13.6 mobile measurements are unstable: Home ranged from
65 to 100 and Elastic Tabs from 89 to 90 in exploratory default-throttling
runs. A catalog-preload experiment did not establish an improvement and was
removed. All reports and traces remain retained privately; these are findings,
not accepted final scores. Keep both Lighthouse gates open until current-source
repeat measurements support them. Transfer accounting must include the document
and distinguish actual demo-only fonts from shell fonts; the first diagnostic
incorrectly counted all Inter transfers as shell bytes.

The startup pass now fetches the catalog alongside the shell scripts and keeps
Home's existing heading while the page hydrates. Pending shell actions preserve
their order, cancellation and focus, including static agent setup after a failed
catalog request. Initial user scroll survives hydration. The original header
blur and translucency remain unchanged: lazy blur activation and an opaque
header produced first-input or text-rendering changes and were rejected.

The manual large-heading contrast finding is fixed with the existing light-theme
orange hover token. The former `#FA7319` on `#FAFAFA` measured 2.67:1; the new
large-text foreground measures 3.44:1. Both responsive headings are covered by
the computed contrast check. Other manual scan results and full component
accessibility remain open. Retain cold-start timing outliers and do not treat
a best Lighthouse run as complete site-wide performance acceptance.

The [current startup report](performance/shell-startup-2026-11-24.json) retains
all six final mobile Lighthouse runs: Home and Elastic Tabs each score
100/100/100 with zero layout shift. Earlier cold rendering outliers remain in
the archived diagnostics. One of 24 local Elastic Tabs cold/warm samples still
records 383.4ms heading/stage paint, exceeding the 300ms target. Keep this
cold-route issue and the component CPU 4 findings below open. The 17 required
and focused commands pass; these shell results do not complete site-wide
motion, manual accessibility or performance acceptance.

The [Paths read-order report](performance/paths-read-order-2026-11-24.json)
records batching of actual scroll reads before the original SVG/counter writes.
Each fresh full-view CPU 4 trace records zero Layout/style-update events inside
JavaScript, down from 361 of each; layout continues in the normal rendering
phase. All 48 component image/state checkpoints are unchanged. Both complete
browser suites pass. A fresh baseline also reached 59.94fps, so retain the
earlier intermittent 49.45fps sample without claiming a guaranteed frame-rate
increase. Final presentation-rate, cold-route and site-wide acceptance remain
open.

Spatial model verification retains immutable captures and exact state/clock
checks, then compares every command and RGBA channel to an independent run of
the complete original factory in the tested browser. Historical differences
are retained rather than rebaselined or accepted with a tolerance. Chrome 140
has none; Chrome 158 has 66 command-witness and 24 pixel-hash differences while
matching its independent original exactly. A one-pixel fault still fails.

The [forty-case current Stage report](performance/showcase-current-stage-2026-11-24.json)
retains native Threads at 18.65–21.14fps and full desktop Converging Paths at
49.45fps with 50ms p95 intervals under CPU 4. Magnet Lines records four paints
at 423.90–474.99ms; Dot Field's first native desktop paint records 317.00ms.
Keep all 159 long tasks, 371 intervals above 25ms and the earlier interrupted
samples as investigation evidence. No component source changed in this pass.
These rates measure source frame callbacks; they do not independently prove
the compositor's presentation rate.

The final Showcase profiler now loads active `foundations.css`, rather than
the frozen v1 stylesheet used by older profile harnesses. Its source-bound
Chrome 158 Mesh recheck records 59.27–59.94fps across eight twelve-second
native/full desktop/compact CPU 1/4 stories; every CPU 4 case records 59.94fps.
The full 400×320 model and 5,044 paint commands remain unchanged. Keep the older
30.38fps sample and its trace as historical evidence. Browser and stylesheet
differences limit direct comparisons. This recheck leaves cold-route, recipe,
accessibility and site-wide timing acceptance open.

Native Threads still misses the CPU 4 frame budget. A GPU prototype improved
its measured rate to 56.94–58.82fps but changed texture edge pixels; it is not
accepted. Command-capture, cached-path and cached-math trials also remain
unshipped because their measured native frame rates were worse. Preserve these
trial sources, pixels, traces and outliers when continuing the investigation.

All 399 existing native compositions now follow their v4 references. All thirty
new Agent & AI UI, Buttons & Micro, Layout & UI, Forms & Inputs, Data/Navigation
and Visual FX components bring the catalog to 429. The first ten Agent & AI UI
extensions brought it to 439. Ten Buttons & Micro and ten Forms & Inputs
extensions brought it to 459. Eight Visual FX extensions bring it to 467. Twelve Layout & UI extensions bring
it to 479. Five Gallery extensions bring it to 484. Five Navigation extensions
bring it to 489. Six Text & Type extensions bring it to 495. Six Data & Numbers
extensions bring it to 501, four loaders to 505 and three 3D & Perspective
extensions to 508. Three Scroll extensions bring it to 511 and two Cursor
extensions to 513 and three Play extensions to 516 and Piano Keys to 517. The three Skeuomorph extensions complete all 520 components; Pro scaffolding is implemented and final acceptance remains. Both strict static audits now pass.
Active legacy aliases are retired and the shared Stage/Dock correction is
implemented in `css/foundations.css` and the portable exporter extension. Resolve
the final recipe, accessibility and performance findings before acceptance.
The three Play extensions retain 56 native artwork layers, the unchanged Coin
SVG and nine separately classified Dock layers. Preserve the complete seeded
Plinko contact/scheduling/settlement model and all seven multipliers, actual
pulled-point Sling releases and all nineteen reference dots, and both real Coin
faces with the connected 64-panel rim. Blur stays outside the 3D rotor. Keep
independent press/capture owners, ordered held inputs, result accounting,
readable histories and the full title/focus clearance. Eighteen equal-time
renderer stories, six offline contexts, twelve hold stories and actual mouse,
touch and raster checks establish functional behavior. The three sparse-size
exceptions change only fill. Final frame-time, accessibility, contrast,
cold-route and Lighthouse gates remain open; all earlier findings remain open.
The two Cursor extensions retain twelve exact native artwork layers, the
original View project copy, one unchanged reused SVG and three exact photo slots.
Keep their six shared Move Dock layers classified separately. Preserve both
verified photo pairs and the native 2× Lens stencil before its deliberate 2.5×
model, complete inline project content, source-time 0.18 followers, analytic
finite path stories, readable pop glyphs, actual scaled input and capture/click
cancellation. Twelve equal-time renderer stories, four offline contexts, eight
hold stories and actual photographic sampling pixels establish functional
behavior. Final timing, accessibility, contrast, cold-route and Lighthouse gates
remain open. No fit exceptions are added. All earlier findings remain open.
The three Scroll extensions preserve 67 native artwork layers, eighteen exact
photo slots and all eleven verified 800/1600px photo pairs. Keep the nine Dock
layers classified as shared shell controls. Preserve the complete three/eight/
nine-record models, actual fractional scroll calibration, 0.12 source followers,
analytic chapter thresholds, current-pose panel transitions and full rendered
photo coverage. Keep Columns' native Dusk/full forestDark distinction and actual
photographer attribution. Eighteen equivalent-clock stories, six offline contexts,
twelve hold stories and real touch/scroll/renderer checks establish functional
behavior; final timing, accessibility, contrast, cold-route and Lighthouse gates
remain open. No fit exceptions are added. Earlier findings remain open below.
The three 3D & Perspective extensions retain 54 captured native layers, two
unchanged SVG files and thirteen exact native photo slots, plus approved full
forestDark for Marquee's licensed native Dusk exception. Preserve both asset
sizes, hashes and credits, perspective beam joins, the twelve-work periodic wall,
actual fractional scroll calibration, 0.12 source-time smoothing, bottom hinge,
interrupted replay and exact paused first paint. Eighteen equal-time renderer
stories, six offline contexts, twelve hold stories and actual touch/scroll,
projected-corner and seam pixel checks establish functional behavior. They do
not close final performance, accessibility, contrast, cold-route or Lighthouse
acceptance. No fit exceptions are added. All previous findings below remain open.
The six Text & Type extensions retain 66 captured layers and 31 original text
copies, with one reused unchanged SVG. Four transparent full-stage mask groups
keep their reference boxes as zero-layout definitions; all visible masks remain
exact. Preserve complete copy, analytical followers, natural-width flip text,
all 156 drum faces and bounded continuous fog paths. Thirty-six equal-time
renderer stories, twelve offline contexts, twenty-four hold stories and actual
mask/filter pixels verify behavior. They do not close the final performance,
contrast, cold-route or Lighthouse gates. No new fit exceptions are added.
Include vertically displaced pointer states when auditing Outline Fill's Dock
sweep; it currently starts on the reference horizontal row. Preserve the tested
horizontal sweep reversal and all three drum pose channels during that review.
The five Navigation extensions retain 56 exact native layers and twelve original
SVG slots using eleven unchanged files. Preserve complete page/destination/pane/
article models, elastic-edge reversal, the real page reel, source-fixed distance
followers, finite settling, fractional field calibration, shared notch and small
pop. Keep native row-stencil glyph clearance, original artwork coordinates and
shorter Stage canvases; do not replace these with inner scaling or compressed
type. Pagination adds only the documented sparse-fill exception. Thirty equal-
time renderer stories, ten fresh offline contexts, twenty independent hold
stories and real input establish functional behavior; final timing, contrast,
cold-route and Lighthouse acceptance remain open.
The five Gallery extensions retain all 93 exact native layers, eighteen photo
slots and complete five/eleven/six/three/five-record models. Preserve velocity
carry, the native Dusk/full forestDark distinction, spine hinges, conserved photo
weights, exact quote deadlines, shared-image reversals, visible focus and article
scroll. Their thirty equal-time renderer stories, ten fresh offline contexts,
twenty hold stories and actual moving-touch checks establish functional behavior;
final performance, contrast, cold-route and Lighthouse audits remain open.
The five new micro components have source-bound geometry, input, touch,
reduced-motion, offline and actual-renderer clock coverage. Keep the same-pixel
smoke reversal, bounded phase blur surfaces, 600ms hold cancellation, unchanged
counter digits, touch click de-duplication and static reduced shimmer. Their
60/120/240Hz stories establish model and paint agreement; they do not establish
the final frame-time, cold-route or Lighthouse budgets.
The seven Layout & UI additions add 42 equal-time renderer stories and fourteen
fresh offline contexts. Preserve the actual inverse blend, complete thirteen-
person and five-step models, scroll-anchored tooltips, velocity-carrying Deal,
compact glyph/icon clearance and delayed clipboard ownership. Their original
native artwork and sparse-fill exceptions do not waive text or overflow gates.
Smooth Scroll's dependency removal and native Mask Reveal's aperture timing are
implemented with independent source captures, interruption and offline coverage;
preserve their complete original models and copy. Punch
Card's sixth key is an intrinsic formatting command, validated by exact markup
and its Figma 170:1830 slot. It clears all sixteen formatting combinations while
the source clock advances normally. Preserve the six-key interaction and the
complete original full note. Changed or duplicate markup fails the command
contract rather than silently inheriting a general Reset exemption.

The motion checker now excludes only seven exact hash-checked virtual model
function bodies in four demos. All CSS and visible renderer code still gate.
The terminal's original closed-shadow model stays inert, hidden and zero-size;
the drum and Joypad presentations suppress the unpainted source transitions.
Fractional seconds now retain their decimal point. Continuous loop periods and
bounded 40ms animation staggers are treated separately from UI durations. Keep
the eight mutation/unit tests, 72 browser scope stories, 128 formatting states
and 24 fresh offline exports when changing these boundaries. Thirteen CSS
declarations across five demos were corrected without changing their programs,
markup, copy or prompts. These static and focused browser checks supplement the
full final motion audit; they do not prove every component's recipe or timing.

The corrected fit audit excludes empty transparent leaf hit areas while
retaining their overflow/text checks. It now passes all 479 demos with 157 valid
reference-size exceptions; Rolling Balance preserves its exact 147×84px painted
composition rather than enlarging it past the 12% heuristic. Keep all 24 browser
boundary regressions when changing measurement rules.

The twelve Layout & UI extensions preserve 206 native layers, 42 supplied SVG
slots using 27 unchanged files and four original approved photographs. Keep
complete trees, glyphs, photo cards, timeline entries, tasks, project/note data,
collaborator paths/comments, table records and all 336 half-hour cells. Their eight
suites pass 141,861 checks, including 72 actual renderer stories, 24 fresh offline
contexts, 48 hold stories and independent motion models. Exact native geometry,
physical mouse/touch, velocity-carrying drops, visible compact focus, early finite
timers and retained reduced paint establish functional behavior. They do not
establish final frame-time, accessibility, cold-route or Lighthouse budgets.
Earlier private helpers, inputs and publication evidence remain frozen.

The eight Visual FX extensions preserve 882 native layers, 24 supplied SVG slots
using 23 unchanged files and both original Black Hole alpha masks. Keep complete
lens, simplex, scroll, dot shader, projective tunnel, logo, meteor and inverse
grid models. Their eight suites pass 27,195 checks, including 48 actual renderer
stories and sixteen fresh offline contexts. Literal GPU loss/rebuild, analytical
Canvas/SVG samples, paused recovery and explicit graphics deletion establish
functional behavior; they do not establish the final frame-time, cold-route or
Lighthouse budgets. Earlier private helpers, inputs and evidence stay frozen.

The ten Forms & Inputs extensions preserve 230 native layers and twelve SVG
slots using ten unchanged files. Keep complete glyph/search/people/color/date/
chip/edit/signature/liquid models, licensed Allura and the five fill exceptions.
Their eight suites pass 12,336 checks, including 60 actual renderer stories and
twenty fresh offline contexts. Native touch, held IME/paste, exact retained
Canvas/range paint, graphics recovery and late font exports establish functional
behavior; they do not establish final frame-time, cold-route or Lighthouse
budgets. Earlier private helpers, inputs and publication evidence stay frozen.

The ten Buttons & Micro extensions preserve 92 native layers, 49 supplied SVG
slots using 46 unchanged files and the approved portraitC1 photograph. Keep both
save outcomes, spinner/result handoff, 900ms hold, five dodges, four sharing
targets, three icon pairs, exact laurel/pass/paper models and Follow/Following
states. Reset/Restore release capture and key ownership; stale or disposed
clipboard promises cannot invoke fallback work. Their eight suites pass 5,466
checks, including 60 actual renderer stories and twenty fresh offline contexts.
Independent easing, RK4 and paper-area checks establish functional behavior;
they do not establish the final frame-time, cold-route or Lighthouse budgets.

The first ten Agent & AI UI extensions preserve 105 native layers, seventeen
original SVG slots, complete local models and all 72 wizard combinations. Keep
source-time streaming, citations, changed-digit thresholds, 24-hour reset
accounting, ordered held editing and Send/Stop intent, real paste/IME and stale
clipboard retirement. Their eight suites cover 7,140 checks, 60 actual renderer
stories and twenty fresh offline contexts. Preserve the 150ms inert retained
paint and Creator's fill-only exception. These establish functional behavior;
final frame-time, cold-route, accessibility and contrast budgets remain open.

The four Visual FX additions retain all 46 native layers, eighteen original SVG
slots using twelve unchanged files, and both approved ocean slots. Preserve the
native bleed origin, 30px beam spacing, exact glyph rest, SDF-normal refraction
and 1.5px chromatic offset, complete fbm/software field, all 256 seeded events,
twelve collision sparks and every sampled particle. Keep independent SVG
definitions through retained fades and the complete reduced collision still.
Held lens input must not invent velocity from zero elapsed source time; canceled
capture must stop momentum.
The analytical 170/26/1 step
passes independent closed-form assembly checks. The native GPU/software plasma
comparison matches all 9,508 opaque pixels byte-for-byte. Actual GPU loss/rebuild,
moving touch, independent holds, eight fresh offline contexts and 24 equal-time
renderer stories establish functional behavior. They leave final frame timing,
cold-route, theme/contrast and accessibility acceptance open.

The four Forms additions preserve all 81 native layers, 46 original SVG slots
and complete hour/minute/precision/file models. Keep the native Dusk/full
forestDark distinction, exact sparse controls, complete compact gradient glyphs,
analytical spring and finite inertia boundaries, and source-clock upload entrance
and success checks. The early-timer regression prevents reduced progress from
stalling when a wake precedes its deadline by a fraction of a millisecond. Preserve
real file input, stale decode rejection, held Blob retirement, independent pause
owners, moving touch and eight fresh offline contexts. Twenty-four six-second
renderer stories establish equal-time model and paint agreement; final timing,
cold-route, theme/contrast and accessibility budgets remain separate work.

The Data/Navigation additions retain all 48 native layers, 24 original SVG slots
and the approved forestDark photograph. Keep exact cropped arc roots and their
unchanged overshoot copies; mask native ribbons at their full paint bounds,
including stroke bleed. Preserve all three goals, 32 full and ten native OHLC
records, six conserved flows and complete local page copy. Fractional browser
scroll under stage zoom drives Nav’s actual state; its calibrated native
checkpoint and retained old-page offsets have separate regressions. Tooltip
deadlines, native gesture ordering, Canvas fallback/recovery events, 24 equal-time
renderer stories and eight fresh offline contexts are covered. Actual Canvas
pixel agreement at different virtual refresh rates does not establish the final
CPU frame-time, cold-route, accessibility or Lighthouse budgets.

The four Framer prompts now describe their native geometry and complete original
full models. Preserve the original 30% one-shot entry threshold, early-intent
priority, selected-duration reset, complete currency/financial records, actual
painted interruption poses, local light palettes and accessible numeric content.
The format indicator uses the component clock because a real-clock regression
found a pending CSS transition advancing after Pause. Keep that regression along
with the actual drum matrices and changed-digit checks in the final motion audit.

The 32 source-bound Framer profiles in
`docs/performance/framer-data-2026-11-22.json` average 56.4–60.0fps at CPU 1 and
22.0–59.6fps at CPU 4. Compact full Rolling Balance is the slowest case at
22.0fps; investigate its repeated drum construction/paint work. CPU 4 records
1,235 gaps over 25ms and 332 long tasks across sixteen cases; retain every trace
and outlier. CPU 1 records forty gaps and no long tasks. Prepared mount paint
and readiness observations do not satisfy cold-route or Lighthouse gates.

The six final Showcase compositions complete the sixteen-demo collection and
bring existing visual remediation to 395/399. Four Framer demos, 121 new or
extension components and Pro seams remain. Native Mask Reveal currently applies
its aperture radius change immediately; review that transition against the
prescribed motion recipe in the final motion pass. Preserve the exact 76px
reference aperture, stationary photo crop, original full 65/130px model,
interruptibility and independent holds when refining it. The profiler's first
attempt exposed its fixture-relative full-photo base; the fixture now uses the
actual site root and asserts 1600px full/800px thumbnail photo resolution. Both
diagnostic runs and their traces remain retained.

The first trace Paint can precede complete photographic readiness. The report's
readiness measurement includes image decoding and font completion; use both
fields when investigating cold detail loads rather than treating the first
Paint event as proof that all photographs were visible.

<!-- showcase-final-performance -->

The [final Showcase timing report](performance/showcase-final-2026-11-22.json) retains all 48 eight-second native/full desktop DPR 1 and compact DPR 2 stories. Path, Range and Story each complete one six-second Dock replay; Gallery, Cards and Mask receive six interrupted actions. CPU 1 records 59.88–60.00fps, 2 intervals above 25ms and 0 long tasks; first trace Paint spans 10.49–42.65ms and maximum readiness is 222.40ms. CPU 4 records 59.00–60.00fps, 17 intervals above 25ms and 12 long tasks; first trace Paint spans 50.80–158.88ms and maximum readiness is 219.10ms. The slowest sample is showcase-orbital-path-full-compact-dpr2-cpu4 at 59.00fps. No prepared-font sample exceeds 300ms first trace Paint. Fonts were prepared before mounting; own heavy checks had stopped and other applications were not controlled. Every trace and outlier is retained, including the fixture document-base and photo-filter diagnostics. Decoded photos assert 1600px full or 800px thumbnail resolution. These observations leave cold-route, Lighthouse and site-wide timing gates open. Preserve actual-clock card interruption and Story replay, independent scroll/capture ownership, canonical source clocks and the original full models during the final audit.

The shared light-stage correction now uses the Figma Kit's neutral `#F4F4F4`
base, 14px corner and 420×260px white glow at −36,−170. Exact Kit fixtures verify
neutral upper/lower pixels 245/244. The earlier flat `#F5F5F5` note inferred too
much from one upper pixel. The new active stylesheet and generated exporter
extension preserve all five frozen v1 inputs and the unchanged source SVG. Stage
palettes are isolated from the page theme. Preserve this separation during the
final theme/accessibility audit.

The shared Dock now matches the dark filled Kit pill: `#2A2A2A`, `#FAFAFA` text,
6% white stroke, 12px blur and 12/16px Geist Medium. The Drag fixture measures
53×28px through whole-pixel intrinsic sizing where supported; other engines keep
native automatic sizing. Component demos continue to use the shared Dock. The
portable Kit's light-theme accent label now has 7.10:1 contrast against orange,
replacing the previous 2.79:1 white label and matching the shell's existing dark
label override. These shared checks do not replace the full final
component contrast, keyboard or motion audits.

Review every remediated generator prompt against its own v4 geometry, controls and approved assets, while retaining the complete original models, datasets and displayed copy. The four volume-dial prompts and the three subsequent knob prompts now describe their individual native assets, geometry, controls and complete original compositions.

The earlier literal motion audit reported the legacy curve inside Joypad’s unchanged virtual source program. Its source CSS transitions are disabled before paint; the visible renderer uses the canonical spring and reduced-motion fades, with independent numerical and pixel checks. The strict audit now distinguishes that exact hash-checked virtual model from the complete CSS and visible renderer. Preserve this boundary and its browser checks during the final motion audit.

The [Pendulum/Bouncin' Ball timing report](performance/drams-objects-physics-2026-11-22.json) retains all sixteen current-source cases. CPU 1 records 59.88–60.00fps, one gap and no long tasks. CPU 4 records 40.28–52.04fps, 469 gaps and 103 long tasks, with first trace Paint up to 535.47ms and readiness up to 709.5ms. These stress samples miss the final frame/paint targets; investigate the recorded JavaScript, style/layout and paint work during the final performance pass. The earlier timing attempt exposed a real event-time bug, now fixed and covered by sixteen actual-clock interruptions and eight independent press-owner stories. Keep real-clock interruption coverage in the final motion audit; virtual clocks alone did not expose that failure. All earlier source/log evidence and completed replacement traces remain preserved.

The pre-spring [I/O, LED, Standard and Slurp timing report](performance/drams-switches-core-2026-11-21.json) retains 32 source-bound eight-second stories. These event-driven models need no idle simulation loop. CPU 1 records about 60fps without gaps or long tasks. CPU 4 records 58.75–59.88fps, 20 gaps and 16 long tasks, with first trace Paint up to 99.92ms and readiness up to 92ms. Preserve these occasional stalls for the final performance investigation. An earlier run recorded 30 gaps and 17 long tasks; all 32 earlier traces remain archived, and all 399 loaded definitions stayed identical through the newline cleanup between measurements. Pending Web Animation pauses now resolve at their sampled currentTime; keep the actual pause, retargeting and independent hold checks when changing shared motion. Prepared-font component timing does not prove cold-route or Lighthouse completion.

The [thirteen physical-switch timing report](performance/drams-switches-objects-2026-11-21.json) retains all 104 current-source eight-second native/full desktop/compact stories, including the corrected I/O, LED, Standard and Slurp release springs. CPU 1 records 59.88–60.00fps, 2 intervals above 25ms and 0 long tasks; first trace Paint spans 11.15–32.51ms and maximum readiness is 31.20ms. CPU 4 records 56.14–59.63fps, 96 intervals above 25ms and 56 long tasks; first trace Paint spans 71.53–367.87ms and maximum readiness is 345.80ms. Keep all traces and occasional stalls for the final performance investigation; prepared-font measurements do not prove cold-route or Lighthouse completion. The native/full programs remain event-driven, with no idle simulation loop. Preserve the independent numerical renderer, physical input and pending-drag hold regressions when changing motion.

Long Pinchin’s CPU 4 native desktop sample records 367.87ms first trace Paint, above the 300ms target, and 56.14fps. Investigate that retained trace together with the Coloured-switch stalls; preserve these samples when optimizing rather than treating prepared-font measurements as a final pass.

The current-source [six-switch timing report](performance/drams-switches-banks-2026-11-22.json) retains all 48 eight-second native/full desktop DPR 1 and compact DPR 2 stories. CPU 1 records 59.75–60.00fps, 5 intervals above 25ms and 2 long tasks; first trace Paint spans 16.09–59.05ms and maximum readiness is 56.00ms. CPU 4 records 54.76–59.63fps, 99 intervals above 25ms and 33 long tasks; first trace Paint spans 68.92–516.42ms and maximum readiness is 510.20ms. Fonts were prepared before mounting; own heavy checks had stopped and other applications were not controlled. All traces and outliers are retained. These measurements leave cold-route, Lighthouse and site-wide timing gates open. 3 prepared-font samples miss the 300ms paint target; the largest is drams-029-thumb-compact-dpr2-cpu4 at 516.42ms. Investigate the retained traces during the final performance pass. Preserve nearest-control routing, radio cross-release suppression and the 314/344px full-caption regression when changing Stage sizing. The grid correction is local to the six new banks; protected shared inputs remain unchanged.

The current-source [six-device timing report](performance/drams-devices-2026-11-22.json) retains all 48 eight-second native/full desktop DPR 1 and compact DPR 2 stories. CPU 1 records 59.63–60.00fps, 10 intervals above 25ms and 4 long tasks; first trace Paint spans 23.85–67.94ms and maximum readiness is 66.10ms. CPU 4 records 57.26–59.25fps, 38 intervals above 25ms and 24 long tasks; first trace Paint spans 106.42–365.54ms and maximum readiness is 355.10ms. Fonts were prepared before mounting; own heavy checks had stopped and other applications were not controlled. All traces and outliers are retained. These measurements leave cold-route, Lighthouse and site-wide timing gates open. 2 prepared-font samples miss the 300ms paint target; the largest is drams-053-thumb-compact-dpr2-cpu4 at 365.54ms. Investigate the retained traces during the final performance pass. Preserve exact source-coordinate replay, immediate clamp reversal, keyboard retargeting, separate pressure owners, source-clock holds and complete Canvas/SVG recovery in the final audit. Full Clock uses readable external brand/date/station labels while preserving all original hands and time fixtures.

<!-- showcase-fields-performance -->

The current-source [Showcase field timing report](performance/showcase-fields-2026-11-22.json) retains all 48 eight-second native/full desktop DPR 1 and compact DPR 2 stories. CPU 1 records 54.51–60.00fps, 58 intervals above 25ms and 5 long tasks; first trace Paint spans 6.76–111.37ms and maximum readiness is 99.00ms. CPU 4 records 8.61–59.75fps, 508 intervals above 25ms and 184 long tasks; first trace Paint spans 46.76–1145.63ms and maximum readiness is 1053.20ms. Fonts were prepared before mounting; own heavy checks had stopped and other applications were not controlled. Every trace and outlier is retained. These measurements leave cold-route, Lighthouse and site-wide timing gates open. 6 prepared-font samples miss the 300ms paint target; the largest is showcase-magnet-lines-full-compact-dpr 2-cpu 4 at 1145.63ms. Investigate the retained traces during the final performance pass. Native Threads improved from 25.89/23.73fps to 59.88/54.51fps on CPU 1 desktop/compact, and from 3.77/3.46fps to 10.41/8.61fps on CPU 4. The original 48 baseline traces and both cache-only diagnostic runs and the cropped-texture diagnostic run remain preserved alongside the final 48 stories. The cache and bounded source neighborhoods retain exact SVG payloads and pixel filtering. Preserve the independent needle-direction/stroke checks, Gaussian texture clips, exact retained SVG references, paused full initialization and physical vertical-touch regressions during the final motion and performance audits. The single new sparse-fill exception preserves exact native Pixel geometry at compact scales.

<!-- showcase-spatial-performance -->

The [Showcase surface timing report](performance/showcase-spatial-2026-11-22.json) retains all 32 native/full desktop DPR 1 and compact DPR 2 stories. Mesh runs for twelve seconds to include its complete original breathing phase; the other scenes run for eight seconds, including a complete six-second Paths replay. CPU 1 records 59.13–60.00fps, 19 intervals above 25ms and 5 long tasks; first trace Paint spans 8.38–61.07ms and maximum readiness is 48.10ms. CPU 4 records 30.38–59.88fps, 347 intervals above 25ms and 21 long tasks; first trace Paint spans 36.08–208.46ms and maximum readiness is 179.30ms. Fonts were prepared before mounting and own heavy checks had stopped; other applications were not controlled. Every trace and outlier is retained. The slowest sample is showcase-mesh-surface-full-compact-dpr2-cpu4 at 30.38fps; investigate its retained trace during the final performance pass. These are component observations; cold-route, Lighthouse and site-wide performance gates remain open. Preserve exact fractional native paint offsets, complete SVG texture fallbacks, independent scroll ownership, queued Home, compact End precision and full optical type checks during the final audits. The prior full Mesh solver and native texture transport remain represented in all retained traces.

The six Data & Numbers extensions preserve 112 exact layers, 31 original text copies and 56 unchanged SVG slots using thirty files. Their complete datasets, timezone dates, quarter-hour input, current-pose reversals, physical spring releases, exact tooltip deadlines, independent holds and offline exports pass focused checks. No fit exceptions are added. Equal-source renderer equivalence and functional SVG checks are not final frame-rate, contrast, cold-route or Lighthouse acceptance. Keep the earlier Outline vertically displaced Sweep review open.

The four loader extensions preserve 61 exact native layers, five original labels, thirteen unchanged SVG slots and the approved archGrid photo/crop/credits. Complete build timelines, 24 equal-source renderer stories, eight offline contexts, sixteen independent hold stories, actual touch/scroll and actual photographic/continuous-ray pixels pass focused checks. Preserve the paused-before-first-frame Trace glow regression, analytic SVG pathLength calibration, early-wake deadlines and finite completion holds. Matrix’s new 82×82 Figma exception changes only low fill. These functional checks do not close final frame-rate, contrast, cold-route or Lighthouse gates; earlier performance findings and Outline Sweep review remain open.

Piano Keys retains all fourteen exact primitive layers, twelve playable notes,
actual four-partial PCM and silent first paint. Preserve fresh-gesture audio
creation, per-note resume generations, native multi-owner keys and touch
Glissando, finite source-clock feedback, compact glyph counter-scaling and
complete audio/capture disposal during the final audit. Its six refresh-rate
stories and actual waveform comparisons establish function, leaving final
frame-time, audio accessibility, contrast and cold-route gates open.

All three final Skeuomorph extensions retain their exact native artwork and
complete material models. Preserve partial paper progress/current-pose grabs,
real nineteen-point Verlet rope/rigid-body constraints and absolute settling,
all three Wallet records with inherited spring velocity and native listbox
ownership, exact SVG/photo slots, compact complete histories and full cleanup.
The independent solver, eighteen refresh-rate stories and four late-frame
settling stories establish function. Final recipe, contrast, accessibility,
CPU-throttled timing, cold-route and Lighthouse acceptance remain open.

Pro source scaffolding is implemented with the owner launch flag disabled.
Keep both candidates free and Pricing SOON until the owner chooses launch.
Preserve complete free prompts, every source-copy guard, authoritative registry
locks and route generations. The actual free-copy, locked UI, registry, CLI and
MCP stories do not replace the final site-wide performance/a11y/contrast audits.

Multi-Step Loader now has a documented sparse-fill exception matching fresh
Figma 143:955 geometry. Its native/full model and source remain unchanged.
Preserve the five complete build steps and the 150ms retained-reference fade;
fill during that fade can differ from the settled eight-leaf measurement.
All overflow, horizontal-scroll and type-size gates remain required.
