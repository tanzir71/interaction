# Contrast review

`node tools/verify-tertiary-contrast.js` checks the Handoff 3 tertiary-text gate
against actual computed colors on all five opaque shell surfaces in both themes.
Each pair must meet the unrounded 4.5:1 threshold. Ten deliberately insufficient
foregrounds exercise the rejection condition and exact style restoration.

`node tools/verify-text-background-sampler.js` calibrates a background measurement,
not an accessibility decision. It captures transparent, black and white glyph
fills across the viewport, preserving layout, CSS currentColor and descendant
text. The mask includes italic overhang and otherwise invisible glyph parts.
Stable stills and exact restoration are required; unsupported effects stay
pending. Channel intervals conservatively include quantization uncertainty.

A candidate bound needs an independent review of the final foreground paint.
The calibration includes a white scrim over black text: its CSS-color/background
estimate is high while its actual foreground contrast is insufficient. The
sampler explicitly leaves its foreground unapproved. Source hierarchy, overlays,
filters and compositing must be reviewed before using a measurement to close a
finding. These tools do not replace input, focus, native-art or state reviews.

Run the Encrypted Card review with an external axe installation:

```text
node tools/verify-evervault-contrast-review.js --axe=/external/axe.min.js
```

The narrow decision lives in `tools/fixtures/evervault-contrast-review.json`.
The twelve captured alphanumeric rows provide visual texture; changing their
individual characters does not change the field's meaning or its instruction.
This matches the pure-decoration provision in
[W3C's contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
ARIA hiding alone is not the reason for the decision. The instruction remains
essential text and must meet 4.5:1 after its foreground hierarchy is checked.
Every raw axe result and every original character remains intact.

The recorded matrix covers initial full views at 1440px and 390px, both Stage
and shell themes, and both motion settings. It includes low-contrast instruction
probes and restored character permutations with unchanged Chrome accessibility
names. Ancillary measurements that fail exact pixel stability remain pending.
The review does not establish whole-catalog WCAG conformance, native artwork,
non-text contrast or every interaction state. Broader contrast review, complete
current-source startup and CPU4 performance acceptance remain open.
