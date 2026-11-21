# Final audit follow-ups

The full 520-component handoff remains open. Per-component verification and prepared-font timing reports do not replace the final library, accessibility, cold-route or Lighthouse audits.

The shared light-stage background still uses the legacy `#F4F4F2`. The v4 Kit uses a neutral `#F4F4F4` base with a white upper glow. The captured [Dark Volume tile](https://www.figma.com/design/OpP74UYjFHRU5q9OBPhoSY/Interaction?node-id=89-343) has pixels (245,245,245) at (60,50) and (244,244,244) at (60,200); the three subsequent knob tiles have the same samples and their Kit metadata confirms the base and glow. The earlier flat `#F5F5F5` note inferred too much from one upper pixel. Reproduce the neutral base and glow in shared stages and portable exports during the final shell pass. Preserve the frozen v1 runtime, stage, exporter, style and font inputs; use a new stylesheet and exporter extension for the correction. The supplied component SVGs remain unchanged.

The shared light-stage Dock also needs its v4 Kit treatment. The reference uses a dark filled pill with light text; current previews use a light pill with dark text. Check the supplied 53×28 px Drag reference and label typography when applying the shared theme correction. Component demos must continue to use the shared Dock.

Review every remediated generator prompt against its own v4 geometry, controls and approved assets, while retaining the complete original models, datasets and displayed copy. The four volume-dial prompts and the three subsequent knob prompts now describe their individual native assets, geometry, controls and complete original compositions.

The motion audit still reports the legacy curve string inside Joypad’s unchanged virtual source program. Its source CSS transitions are disabled before paint; the visible renderer uses the canonical spring and reduced-motion fades, with independent numerical and pixel checks. The final strict audit should distinguish unpainted model styles from transitions that can reach the screen while continuing to flag actual noncanonical motion.
