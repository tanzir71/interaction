# Stage contract

The shell owns the stage, sizing, theme, controls and preview lifecycle.
Every demo declares `designSize`, `stage`, `trigger`, `controls` and `a11y` in
`js/meta.stage.js` or inline. Inline metadata takes precedence.

Presets are sm 320×240, md 480×360 and lg 720×480. Bleed fills the stage.
Thumbnails reserve 24px padding; full views reserve 32px. A control dock reserves
48px. Fit uses the minimum width/height scale, capped at 1, with CSS zoom to
preserve pointer geometry. A ResizeObserver updates it on viewport changes.

A simplified `thumb: 'hero'` may declare `thumbDesignSize` as an explicit
`[width,height]` or non-bleed preset. The shell uses that declared plane only
for thumbnails. `designSize` continues to size the complete detail composition
and portable export. For example, Password Strength uses `[220,184]` in full
and `[220,100]` for its field-and-meter hero; the criteria remain in full view.
This is deterministic metadata, not a measurement of the rendered leaves.

Demo scripts receive `root`, `stage`, `ctx` and lifecycle-wrapped timers.
Register actions with `ctx.onAction(name, fn)`, or return an object with `actions`
and `cleanup`. A returned cleanup function is also supported. `ctx` includes mode,
theme, reduced-motion preference, scale and stage size. Custom changes can be
announced with `ctx.emit(name, detail)`.

Keep one hero object per thumbnail and text at least 11px after scaling. Do not
add an outer frame or replay/reset controls inside the demo. Use one neutral
ramp and one accent. Preserve keyboard access and a deliberate reduced-motion
poster. Touch hover/drag starts suspended until the visitor opts in.

Run registry, stage, motion, runtime and browser verifiers before each commit.
Existing chrome/control debt is recorded explicitly during migration;
`verify-stage.js --strict` must pass after remediation.

## Adding a pattern

Register one object in a `js/demos.*.js` module and list that module in
`js/registry-files.json`. Give the entry a unique ID, prefixed classes, complete
demo strings, metadata and a detailed motion prompt. Regenerate the public
registry and poster, then run the registry, stage, motion and browser checks.

## Figma geometry and sparse controls

The owner clarified on 15 Nov 2026 that exact v4 Figma geometry takes precedence
over the 12% area-fill heuristic for intentionally sparse controls. Document each
exception in `tools/stage-fit-allowlist.json` with its reason, Figma tile, primary
selector and expected unscaled dimensions. The browser audit checks that geometry
before applying the exception and reports invalid entries as failures.

These exceptions apply only to low fill. Failed boots, missing metadata,
overflow, horizontal scrolling and rendered text below 11px still fail their
respective gates. Use `node tools/verify-exemplars.js` for the current remediated
controls' interaction, reduced-motion, namespace and offline-export checks.
`node tools/verify-forms.js` also verifies native editing, validation, paste,
form completion, declared hero/full geometry and native text readability.
`node tools/verify-layout.js` covers captured drag/release, snapping, local menu
placement, keyboard reordering, touch gestures, interruptible navigation and
swaps, original asset geometry and complete portable behavior.
`node tools/verify-layout-photos.js` covers photographic masonry, table previews,
masked captions, shared expansion and inertia, including resolution routing,
native touch, exact v4 photo slots, attribution and offline 800px imagery.

Verified photographs live in `assets/photo-credits.json`. Portable `photo-*`
asset names refer to 800px files; generated `fullAssetRefs` select local 1600px
files for detail previews. Keep source and licence comments in portable HTML.

`node tools/verify-navigation.js` checks native menus, breadcrumbs, tab panels,
scroll navigation and sidebar expansion, including complete offline interactions
and readable full views at 390px, 375px and 360px.

The fit auditor intersects artwork bounds with native masks and scroll viewports
inside the demo. Clipping on the fitted root or outer stage is excluded from that
calculation so those boundaries cannot conceal overflow. The original image
dimensions remain unchanged. `node tools/verify-stage-fit-geometry.js` exercises
these rules in a real browser, including per-axis clipping and CSS zoom.
Zero-area screen-reader masks contribute no painted bounds. Single-character
glyphs and digits remain subject to the same 11px rendered-text gate.


`node tools/verify-loaders.js` verifies the ten loader models, their complete
loading/reveal sequences, original math, native controls, runtime suspension,
precise SVG geometry, compact typography and interactive offline exports.
A hero plane must also accommodate its widest interactive state: the upload
reference is a 64px ring, while Reset can restore its 220px native button.
Figma child positions inside a stroked frame include that frame's border.


Full previews use an independent runtime viewport hold. Scrolling one out of
view freezes its frames, remaining timer delays and animations; returning does
not override a caller pause. Hidden document time and offscreen time are both
excluded from the virtual clock. This behavior is included in portable HTML.
LiveTiles keeps exclusive ownership of thumbnail visibility and preview caps.


`node tools/verify-data.js` covers the six original data models, native touch
and keyboard input, measured SVG slots, compact/full readability and all six
interactive offline exports. Number fades preserve unchanged digits and group
adjacent changed characters into shared animation layers; offscreen tape copies
receive their current values without creating invisible fade animations. New
Web Animations inherit the current explicit runtime speed.

At the default 1× speed, CSS animation/transition events do not rescan every
animation in the stage. Explicit speed changes, including returning to 1×,
still synchronize existing animations; new CSS motion at another speed still
uses the lifecycle listener. This avoids repeated identity updates during a
large stagger reveal while preserving caller pauses and viewport holds.


`node tools/verify-maps.js` covers the remediated terrain and city pair. Their
224×168 hero planes retain every original SVG face; full mode keeps all 216
terrain cells and 90 city parcels in a 280×238 composition. A thumbnail action
must visibly affect its hero as well as its underlying model. City Replay
retargets the current painted opacity when interrupted; seed changes preserve
parcel nodes and FLIP their centers. The full terrain uses a single canvas to
project every original cell and extrusion wall; the complete semantic grid stays
available to assistive technology. Pointer hit testing uses the painted top faces.
Its interruptible RAF clock excludes caller pauses and offscreen/hidden time.
Shared runtime disposal owns returned cleanup, including listeners, observers
and temporary Web Animations.

The remaining four maps keep complete 360×280 full compositions, with 224×168
hero planes for globe, route and sites and a 260×168 plane for isolines. Thumb
mode boots only its lightweight preview controller; full mode removes the unused
hero artwork. Full globe retains all 2,048 seeded points and native source-over
depth blending. Route keeps all 63 intersections and deterministic Dijkstra
paths; radar keeps six sites and their seeded schedules. Both virtual RAF and
elapsed-time interpolation exclude hidden and suspended time.

Isolines retains the 64×40 field and all seven marching-squares levels. A fixed
60Hz simulation accumulator makes 30/60/120Hz display schedules produce the same
field, contours and labels. Sample ranks skip uniform cells, and adjacent cells
share interpolation on the same oriented edge. Boundary duplicate detection
retains the original nine-decimal keys. An unchanged reference extractor checks
degenerate, near-threshold and seeded adversarial fields. Field and projection
digests are computed when inspected, outside the normal animation path; pending
digests are explicitly marked. All four exports retain the complete original
models, shared controls, cleanup and offline native artwork.

Agent pipeline and graph heroes retain their sparse Figma geometry. Their full
compositions keep the original seeded schedules, bounded logs, five-node DAG,
edge validation and execution plans. Graph pointer deltas and connection
previews convert physical pixels through the fitted scale; nodes move through
transforms without changing normalized model coordinates. Stable text, SVG
attributes and styles are written only when their values change. The eight-row
log cap fits its viewport without forced scroll-height reads on every frame.

Full streaming preserves its original markdown, 63 pieces, burst schedule,
stall and code example. Word fades start at their original arrival times with
455ms resolution; rebuilding at a burst preserves each active word's painted
age. Shared Pause freezes arrival and word animations. Loading indicators use
the icon-swap recipe, and hidden/completed loops stop. The thinking drawer keeps
all eight original trace times and its six-second completion, with interruptible
panel transitions. Its 800ms completion hold uses a runtime timer, so caller,
viewport and document suspension preserve the remaining delay. Returned cleanup
aborts input, observers, timers and owned check-mask animations.

The remaining agent previews keep their native v4 review, orbit, compaction and
segmented meter artwork. Full review retains all eight code lines and original
arrival/hold schedule; source scrolls natively without truncation. Full orbit
retains thirteen concepts and all twelve original slots, periods, radial wobble
and neighbor relationships. A native legend keeps the complete vocabulary
readable, while interrupted promotions retarget from painted positions.

Compaction preserves all sixteen seeded width templates, physical compression,
token reduction and four-cycle history merge. Stable bubble DOM uses transform
FLIP reflow when membership changes; tooltip content is cached and its motion
uses the shared virtual runtime. Only landing/merge UI scale is reduced to a
1.03 peak. The complete token model retains its 64 seeded events, throughput
history, queue, threshold compaction and billed cost. Changed cost digits use
250ms fades with stable slots, including whole-dollar carries. Source allocation
is deterministic and conserved through compaction without changing old event
fixtures. Both models preserve explicit caller pauses across viewport changes.

The first four FUI demos mount separate native v4 heroes and complete original
instruments. Status retains all four monitor modules, its clock, thermal sine
and random diagnostic policy. Target lock converts physical pointer/DOM
geometry through the fitted scale and retargets every flight from its painted
position, including an outgoing return. Native focus, Escape and shared dock
actions operate on the same model.

Oscilloscope retains its three harmonics, 1.5px sampling, complete trail buffer,
original input maps and phase model. Canvas resolution uses logical dimensions
times DPR; stage fitting applies separately. The 1500ms hold shares runtime
time, and real two-axis touch retains its tuning after release. Spectrum keeps
all 64 seeded bands, physical influence/boost, selected range, seeded contacts,
800ms crossing pause and 1200ms contact fade. Cached direct body/tip/blip
transforms preserve the original model while avoiding inherited variable writes
on every frame. Reduced mode does no automatic recurring work; cleanup cancels
owned scheduling, observers and listeners. Full exports retain each model offline.

Cold entry sets route chrome before the catalog response, including legacy
detail/category links. This prevents removal of the mobile 56px header or
desktop 36px promo strip from moving the detail page after first paint. The
initial scale readout is populated before layout. The delayed-catalog verifier
checks twelve modern/legacy entry cases at mobile and desktop widths.

Packet lanes retain four independently seeded generators, eighteen rows per
lane, sixteen-pixel row geometry and their original 18/24/30/22px/s rates. Native
hover/focus holds only the inspected lane; a separate active-time channel keeps
the original flash draws. Full decoder geometry converts fitted DOM pixels back
to CSS units. Compact lanes are native primitives with isolated holds.

Biometric authentication preserves its sixteen-character seeded hashes, 18ms
typing, two 400ms scans, 800ms result boundary, every-fourth denial and 3000ms
result hold. Motion uses the shared 500ms icon swap and 280ms error shake.
Reset cancels pending frames, holds and compact check animations. A compact
success still uses the exact native v4 ring/check exports.

The full memory inspector keeps the complete 64KB address-derived model,
4096 rows, nineteen rendered rows, all sixteen bytes and ASCII twins, eight
neighbor influences, 14px/s scan and original signature schedule/decay. The
680px memory plane scrolls natively inside the fitted preview on narrow screens;
the page does not scroll sideways. Existing rows are reused and rebound only
when their addresses leave the window. Selection clears only previously
decorated cells, preserving the same data and influence model. The compact
preview adapts from six to four columns in short stages to retain 11px type.
