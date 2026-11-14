# Stage contract

Declare `designSize`, `stage`, `trigger`, `controls` and `a11y` for each demo.
Presets: sm 320×240, md 480×360, lg 720×480, or bleed. Explicit dimensions work.
Inline fields override sidecar metadata.

The shell owns the outer frame, theme, fit, dock and lifecycle. The demo owns its
content inside a 24px thumbnail / 32px full-view safe area; reserve 48px for a dock.
Use one neutral ramp and one accent. Rendered thumbnail text must be at least 11px.

The demo receives `root`, `stage` and `ctx`:

```js
// ctx: mode, theme, reducedMotion, scale, size, onAction, emit
ctx.onAction('next', () => selectNext());
return { cleanup: () => releaseResources(), actions: { replay: reset } };
```

Support thumb/full compositions, light/dark themes and designed reduced-motion
states. Expose state changes as actions; declare their labels in `controls`.

Do not draw an outer panel or replay/reset buttons. Do not hard-code widths beyond
the declared design size, render tiny text, use emoji as artwork, add decorative
accent hues, start audio without a gesture, capture wheel/touch outside the stage,
or keep timers running while suspended. Use the wrapped timers/animation frames
and return cleanup for listeners and external resources.
