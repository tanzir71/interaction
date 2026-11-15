# Visual remediation progress

The v4 redesign is complete for 127 of the 399 existing demos: Interface (89),
Data & AI (30), and the first eight Motion demos. The remaining work includes 272
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

Next in the Scroll manifest: Text Highlight, Image Sequence, SVG Draw and the
remaining eleven scroll studies. New/extension components, Pro seams and the
final requirement audit remain open.
