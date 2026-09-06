# Icon alignment audit

Reviewed all 399 registered demos. Corrected 32 and retained 367 after inspection. Each demo was checked at 300px and a wider 440–560px size. All 32 changed demos also passed actual Code-tab standalone export checks.

The pass checks centering inside controls, alignment beside labels, balanced stroke geometry, pagination dots, and icons in expanded or active states. Intentional icon movement, physical indicators and decorative artwork are documented per demo.

## Corrections

| Demo | Correction |
| --- | --- |
| Cursor Snap Targets (cursor-snap-targets) | Removed the inherited 7px top margin and aligned the metadata arrow with the card row. |
| Split-Text Character Reveal (split-text-reveal) | Replaced font-dependent replay glyph with a centered SVG and explicit label gap. |
| Line Mask Reveal (line-mask-reveal) | Replaced font-dependent replay glyph with a centered SVG and explicit label gap. |
| Text Accordion Squeeze (text-accordion-squeeze) | Centered header, active-row and reset SVGs in stable boxes; retained entrance motion. |
| Text Broken Grid (text-broken-grid) | Aligned the Scatter arrow with its label using a fixed SVG box and flex gap. |
| Clip-Path Image Reveal (clip-reveal) | Separated replay icon and label into aligned flex items with a fixed 13px icon and 5px gap. |
| Pixelation Reveal (pixelate-reveal) | Centered a fixed 18px replay SVG in the 30px circular overlay button, removing font metrics from its position. |
| Comparison Slider (comparison-slider) | Replaced separately spaced, upward-shifted font chevrons with a symmetric SVG pair centered in the divider handle. |
| Kenburns Crossfade (kenburns-crossfade) | Aligned all three media buttons on grid centers; equal SVG arrows and state-dependent CSS play/pause shapes keep a stable optical center. |
| SVG Gooey Menu (svg-gooey-menu) | Before: at 300px, the outer Archive action extended beyond the 268px menu field, clipping its circle and making the centered A appear off-balance. After: a container query reduces the narrow fan horizontal spread to 90% and applies the same transform to button and blob; the full action circles remain visible. Wide placement is unchanged. Plus/cross bars retain their existing optical center. |
| CSS 3D Carousel Cylinder (css3d-carousel-cylinder) | Before: fixed-width navigation buttons inherited 10px horizontal padding, putting both arrows 3.25px right of center. After: scoped grid centering and zero padding yield exactly 0px horizontal offset, with a consistent -0.5px text-range vertical offset. Pagination dots retain their centered row and selected-size emphasis. |
| Magnet Snap Grid (magnet-snap-grid) | Before: the six right-anchored glyph boxes varied from 17.95px to 28.97px wide, placing their centers at different distances from the card edge. After: all six use a 30×30px grid box; glyph content is horizontally centered within ±0.01px. Labels and drag behavior remain intact. |
| Slider Elastic Edges (slider-elastic-edges) | Centered each 6px pagination marker in a separate 24px target; placed the dot row above the footer so targets do not overlap at 300px. |
| Slider Progress Fraction (slider-progress-fraction) | Centered each 6px timeline node in a 24px target and aligned the progress line to the first and last node centers. |
| Lightbox Flip Zoom (lightbox-flip-zoom) | Removed the close glyph baseline offset and centered a 14px cross inside the existing round close control. |
| Menu Fullscreen Overlay (menu-fullscreen-overlay) | Stacked menu strokes now occupy one centered 16px box. Open-panel close glyph and contact-row arrow retain their aligned positions. |
| Menu Split Reveal (menu-split-reveal) | Two strokes now form a stacked menu mark instead of separate horizontal dashes. The contact-row arrow remains vertically aligned. |
| Copy Inline Feedback (copy-inline-feedback) | Success strokes now meet at one joint. The fixed 20px icon box and readable 12px label share a centerline and 8px gap. |
| Hero Spotlight Reveal (hero-spotlight-reveal) | Replaced baseline-sensitive glyphs with 14px SVGs in centered inline-flex controls. Removed the measured 3px downward arrow offset; hover motion remains intentional. |
| Weekend Paper Plans (paper-stack-cards) | Aligned the Next plan text and arrow as flex items with a 9px gap, replacing the oversized inline glyph baseline. |
| Dot Matrix Clock (led-segment-display) | Centered the power icon instead of leaving its 12px SVG against the left of a 17px button; both utility controls now have 24px minimum hit height. |
| Split-Flap Focus Timer (flip-clock) | Centered the reset arrow independently of its font baseline using a fixed SVG in the existing 35x29px button. |
| Sculpted Macro Keys (punch-card-keyboard) | Used equal 23px symbol slots for all keycaps and centered SVG arrows/reset inside them; preserved the keycap depth and pressed translation. |
| Quiet Tape Transport (cassette-reels) | Removed the negative SVG translation and overflowing button padding; the transport icons now occupy true grid centers, including the pause state. |
| Expanding Activity Capsule (dynamic-notch) | Replaced mixed serif-like skip glyphs with balanced SVGs, centered play/pause shapes, and established 28px transport and 24px collapse hit areas. |
| Direct-drive Turntable (vinyl-player-card) | Centered the start icon in its physical button and added an invisible 25px-high target that stays fixed while the hardware key depresses. |
| Pointer Mask Reveal (showcase-mask-reveal) | Centered a vector reticle on the moving reveal origin independently of font metrics. |
| Curved Gallery (showcase-circular-gallery) | Centered both navigation arrows in zero-padding grid buttons. |
| Toss & Stack (showcase-card-swap) | Aligned card arrows with their labels and centered the Next card arrow. |
| Elastic Range (showcase-elastic-slider) | Aligned vector plus/minus signs, filled track and thumb on the same horizontal center. |
| Ball Pop (drams-044) | Centered the checkmark in the confirmation ball; measured original offset was x=-0.5px,y=9.5px. |
| DRAMS · Digital Clock Radio (drams-050) | Centered the station chevrons in explicit 24px grid buttons; replaced font-baseline glyphs with equal 12px SVGs. |

## Verification

- Registry: 399 demos in 284 files; passed.
- Narrow and wider previews inspected across all 399 entries.
- Relevant pointer, keyboard, menu, clipboard, playback and selected states checked.
- All 32 changed Code-tab exports rendered successfully. Declared libraries were supplied from cached copies of the exact live scripts; other network requests were blocked.
- Final targeted validation reports contain no runtime errors.
- Git whitespace check passed.

Full per-demo findings and evidence references: [ICON_ALIGNMENT_AUDIT.json](ICON_ALIGNMENT_AUDIT.json).

## Detailed evidence

- root: [audit report](.artifacts/icon-alignment-root/audit.json)
- controls: [audit report](.artifacts/audit-controls-icons.json)
- spatial: [audit report](.artifacts/icons-spatial-audit.json)
- visuals: [audit report](.artifacts/icon-audit-visuals.json)
- [Root alignment and export checks](.artifacts/icon-alignment-root/verification.json)
- [Remaining 22 actual Code-tab export checks](.artifacts/icon-alignment-exports/verification.json)
- [Final vinyl export recheck](.artifacts/icon-alignment-exports/vinyl-final-verification.json)
