# Motion tokens

Use the default ease-out for entrances, movement and resizing. Exits are faster.
Use hover motion only with a pointer and preserve a designed reduced-motion state.

```css
:root {
  /* duration */
  --dur-micro: 80ms;     /* press-in, tooltip delay */
  --dur-quick: 150ms;    /* hover in, closes, colour */
  --dur-fast: 250ms;     /* menus, modals, tabs, accordions */
  --dur-medium: 350ms;   /* panels, toasts, toggles, check draw */
  --dur-slow: 400ms;     /* text swaps, reveals */
  --dur-xslow: 500ms;    /* icon swaps, pop-in scale */
  --stagger: 40ms;

  /* easing */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);        /* default for enter, move, resize */
  --ease-close: cubic-bezier(0.4, 0, 0.2, 1);        /* exits that should feel decisive */
  --ease-in-out: ease-in-out;                        /* cross-fades, pulses */
  --ease-pop: cubic-bezier(0.34, 1.36, 0.64, 1);     /* scale-in with a 1.03 peak */
  --ease-settle: cubic-bezier(0.34, 1.25, 0.64, 1);  /* panels and morphs opening */
  --ease-bounce: cubic-bezier(0.34, 1.35, 0.64, 1);  /* toggle thumb */
  --ease-pop-strong: cubic-bezier(0.34, 1.96, 0.64, 1); /* like-heart only */
  --ease-step: cubic-bezier(0.35, -0.02, 0.43, 1);   /* number drum steps */
  /* linear: only continuous loops, shimmers, marquees and scroll scrubbing */

  /* distance / scale / blur */
  --move-micro: 4px; --move-small: 6px; --move-base: 8px; --move-medium: 12px; --move-large: 30px;
  --scale-large: 0.96; --scale-medium: 0.97; --scale-small: 0.98; --scale-tiny: 0.99;
  --blur-small: 2px; --blur-medium: 3px; --blur-large: 8px;
}
@media (prefers-reduced-motion: reduce) {
  :root { --move-micro: 0px; --move-small: 0px; --move-base: 0px; --move-medium: 0px; --move-large: 0px;
          --scale-large: 1; --scale-medium: 1; --scale-small: 1; --scale-tiny: 1; --blur-small: 0px; --blur-medium: 0px; --blur-large: 0px; }
}
```

Drag-release springs: snappy stiffness 380/damping 32/mass 1; soft 170/26/1.
Pointer-follow lerp: 0.18 snappy or 0.08 lazy; scroll smoothing: 0.12.
