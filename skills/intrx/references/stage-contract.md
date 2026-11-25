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
For a toggle with changing captions, add a fixed `ariaLabel` containing both
visible aliases, for example `{ action: 'mute', label: 'Mute', ariaLabel:
'Mute or unmute sound' }`. Keep its original `aria-pressed` state. The shared
registry/export extension supplies the stable name without changing the frozen
base Stage or the component's controller.

The metadata cap is three actions. Full views retain direct controls; v4
thumbnails expose at most two visible Dock pills. The shared shell groups three
visible actions into the first action plus More, retaining the original
buttons, listeners, names and state. Respect controls the component hides.
Do not implement a second overflow UI inside the demo.

Do not draw an outer panel or replay/reset buttons. Do not hard-code widths beyond
the declared design size, render tiny text, use emoji as artwork, add decorative
accent hues, start audio without a gesture, capture wheel/touch outside the stage,
or keep timers running while suspended. Use the wrapped timers/animation frames
and return cleanup for listeners and external resources.
