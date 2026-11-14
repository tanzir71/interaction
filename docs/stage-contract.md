# Stage contract

The shell owns the stage, sizing, theme, controls and preview lifecycle.
Every demo declares `designSize`, `stage`, `trigger`, `controls` and `a11y` in
`js/meta.stage.js` or inline. Inline metadata takes precedence.

Presets are sm 320×240, md 480×360 and lg 720×480. Bleed fills the stage.
Thumbnails reserve 24px padding; full views reserve 32px. A control dock reserves
48px. Fit uses the minimum width/height scale, capped at 1, with CSS zoom to
preserve pointer geometry. A ResizeObserver updates it on viewport changes.

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
