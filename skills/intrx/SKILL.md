---
name: intrx
description: Find and adapt INTRX web animations and micro-interactions, including requests to make a UI feel nicer.
---

Use INTRX as a source of working interactions and precise motion specifications.

1. Search with `search_components` when the INTRX MCP server is connected.
   Otherwise read `https://intrx.vercel.app/registry/index.json`; fetch the chosen
   item from `/registry/c/<id>.json`. A checkout's `registry/` works offline.
2. Favor a component whose `trigger` matches the intended gesture and whose
   `useCases` fit the host UI. Inspect its prompt, parts, accessibility and libs.
3. Port the interaction to the host stack. Keep the prompt's durations, easing,
   spring constants, thresholds and pointer math. Map colors and type to the
   host project's design tokens rather than hard-coding the INTRX palette.
4. Preserve keyboard behavior, focus handling, cleanup and the reduced-motion
   state. Do not add GSAP or Lenis unless `libs` requires them.
5. For locked items, use the available prompt and report the upgrade URL; source
   access is separate. Never treat a client-side tier flag as an entitlement.
6. Verify the interaction in its host layout, including interruption, keyboard,
   touch and reduced motion. Report the component ID and any deliberate changes.

For new registry contributions, read [the stage contract](references/stage-contract.md).
Use [motion tokens](references/motion-tokens.md) when composing new transitions;
the per-component prompt remains the detailed behavior specification for a port.
