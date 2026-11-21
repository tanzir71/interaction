# Final audit follow-ups

The full 520-component handoff remains open. Per-component verification and prepared-font timing reports do not replace the final library, accessibility, cold-route or Lighthouse audits.

The shared light-stage background still uses the legacy `#F4F4F2`. The captured v4 [Dark Volume tile](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=89-343) has a flat background of `#F5F5F5`: its screenshot pixel at (60,50) is (245,245,245), while the current local preview is (244,244,242). Correct the shared stage and portable-export background during the final shell pass. Preserve the frozen v1 runtime, stage, exporter, style and font inputs; use a new stylesheet and exporter extension for the correction. The supplied component SVGs remain unchanged.

The shared light-stage Dock also needs its v4 Kit treatment. The reference uses a dark filled pill with light text; current previews use a light pill with dark text. Check the supplied 53×28 px Drag reference and label typography when applying the shared theme correction. Component demos must continue to use the shared Dock.

Review every remediated generator prompt against its own v4 geometry, controls and approved assets, while retaining the complete original models, datasets and displayed copy. The four volume-dial prompts now describe their own native assets and complete rotary compositions separately.
