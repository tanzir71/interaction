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
