# Polish craft standards for production-grade UI components and interaction demos (yardstick and fix-recipe notes for the INTRX aesthetic upgrade)

Reading notes. Research date 28 Nov 2026. Source reliability tags used below: **[P]** primary (the practitioner's or vendor's own page), **[C]** community/secondary (blog, wiki, skill file by a third party), **[SS]** known only from a web-search summary (page itself not fetched; treat as directional). Values are reported as the source gives them; prose is paraphrased. Everything under "Inferences" is my own synthesis, including every recipe and token that is not explicitly attributed. Repo facts come from `C:\Users\tanzir\Desktop\interaction\css\foundations.css`, `C:\Users\tanzir\Desktop\interaction\MOTION_SYSTEM.md` and `C:\Users\tanzir\Desktop\interaction\AGENTS.md`.

---

## 1. Surfaces and depth on dark UIs (shadows, hairlines, highlights, radii, grain, glow, glass, focus)

### Takeaway
On dark UIs depth comes from three stacked cues, not one: (a) surfaces get lighter as they come closer, (b) every edge is a translucent 1px hairline plus an inset top highlight, and (c) shadows are layered (two or more) and kept translucent. A flat fill with a single solid border and no light cue is what reads as "dead"; INTRX's dark Stage is currently exactly that (flat `#151515`, same value as the page canvas, no lighting, tile shadow `none`).

### Cited Findings

**Base colour and why pure black / flat boxes fail**
- Superhuman uses no pure black or pure white in dark themes; even a grey as dark as `#010101` avoids OLED black smearing; white-on-black at 21:1 can cause halation; shadows are invisible on pure black, so a non-black base is required to show depth with shadow opacity/blur. [P] — [Superhuman](https://blog.superhuman.com/how-to-design-delightful-dark-themes/)
- Superhuman rule for elevation: the closer a layer is to the user (e.g. modals), the lighter the surface; their dark theme uses five shades of grey. [P] — [Superhuman](https://blog.superhuman.com/how-to-design-delightful-dark-themes/)
- Muzli (Apr 2026) recommends a near-black base of `#0A0A0A`–`#161616` (example `#0F0F0F`), at least four elevation levels (base, raised, secondary raised, overlay), roughly 5–8% more luminance per level, and says drop shadows are weak on dark so luminance must carry elevation. [C] — [Muzli](https://muz.li/blog/dark-mode-design-systems-a-complete-guide-to-patterns-tokens-and-hierarchy/)
- Atlassian pairs shadows with lighter raised surfaces in dark mode; Material's dark theme builds surfaces with a semi-transparent overlay on the component surface. [SS] — [Atlassian elevation](https://atlassian.design/foundations/elevation), [Material dark theme](https://m2.material.io/design/color/dark-theme)
- Linear generates all surfaces from three variables (base colour, accent colour, contrast) in LCH and names elevation levels background, foreground, panels, dialogs, modals; the redesign was explored mostly with black and white opacities to fix the relation between elevation and hierarchy. [P] — [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- Geist (Vercel) grey scale roles: two page backgrounds; component backgrounds grey-100 default / 200 hover / 300 active; borders grey-400 default / 500 hover / 600 active; grey-700/800 high-contrast fills; grey-900 secondary text, grey-1000 primary text. Solid grey is the default for borders; grey-alpha is for cases where the background must show through (overlays, shadows, edges that should blend). [P] — [Geist colors](https://vercel.com/geist/colors)
- Geist usage rules: draw each border once and keep dividers inside the border, because overlapping alpha borders make intersections stand out; keep shadows translucent, because opaque shadows create a grey halo. [P] — [Geist colors](https://vercel.com/geist/colors)
- Radix 12-step roles: 1 app bg, 2 subtle bg, 3 element bg, 4 hovered element bg, 5 active/selected bg, 6 subtle borders/separators, 7 element border and focus rings, 8 hovered border, 9 solid, 10 hovered solid, 11 low-contrast text, 12 high-contrast text. [P] — [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)

**Shadows**
- Vercel Web Interface Guidelines: use at least two shadow layers (ambient + direct light); combine borders with shadows and prefer semi-transparent borders for edge clarity; on non-neutral backgrounds tint borders, shadows and text toward the same hue; hover/active/focus must have more contrast than rest. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Josh Comeau: every shadow on a page shares one light source, i.e. one fixed x:y offset ratio (his example: y = 2x); as elevation rises, offset and blur increase and opacity decreases; layer several low-opacity shadows with doubling offsets/blur; do not animate heavily layered shadows; avoid many layers on weak devices. [P] — [Josh Comeau, shadows](https://www.joshwcomeau.com/css/designing-shadows/)
- Josh Comeau layered recipe: five layers `0 1px 1px`, `0 2px 2px`, `0 4px 4px`, `0 8px 8px`, `0 16px 16px`, each `hsl(0deg 0% 0% / 0.075)`. Elevation set: small `0.5px 1px 1px / 0.7`; medium three layers (1/2/2, 2/4/4, 3/6/6 px) at `/ 0.333`; large five layers (1/2/2 up to 16/32/32 px) at `/ 0.2`, all using a `--shadow-color` matched to the background hue rather than pure black. [P] — [Josh Comeau, shadows](https://www.joshwcomeau.com/css/designing-shadows/)
- Tailwind v4 defaults (useful as a known baseline that reads "generic"): `shadow-sm` = `0 1px 3px 0 rgb(0 0 0/.1), 0 1px 2px -1px rgb(0 0 0/.1)`; `shadow-md` = `0 4px 6px -1px …/.1, 0 2px 4px -2px …/.1`; `shadow-lg` = `0 10px 15px -3px …/.1, 0 4px 6px -4px …/.1`; `shadow-2xl` = `0 25px 50px -12px rgb(0 0 0/.25)`; `inset-shadow-2xs` = `inset 0 1px rgb(0 0 0/.05)`; `ring` = `0 0 0 1px`. [P] — [Tailwind box-shadow](https://tailwindcss.com/docs/box-shadow)
- Jakub Krehel "shadows instead of borders": light mode three layers `0 0 0 1px rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.06), 0 2px 4px 0 rgba(0,0,0,.04)` (hover .08/.08/.06); dark mode a single ring `0 0 0 1px rgba(255,255,255,.08)`, hover `.12`. [P] — [Jakub Krehel](https://jakub.kr/writing/details-that-make-interfaces-feel-better)
- Una Kravets: in dark themes shadows vanish, so swap them for a light edge: `inset 0 0 0 1px oklch(from var(--bg) calc(l + 0.5) c h / 0.5)`, plus soft glows `0 0 16px … / 0.3` and `0 0 3px … / 0.5`; light-mode equivalents are `0 1px 2px`, `0 4px 12px`, `0 12px 32px`. [P] — [una.im](https://una.im/modern-css-theming)
- Practitioner recipe list for dark UIs: translucent surface `rgba(42,42,44,.85)` instead of hex; `backdrop-filter: blur(8px)` (5–12px range); shadow `0 4px 24px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.05)`; border `1px solid rgba(245,245,247,.08)` (`.12` for interactive); a surface gradient from `rgba(255,255,255,.02)` to transparent; text at alpha 1.0 / .6 / .3. [C] — [dev.to, RAXXO](https://dev.to/raxxostudios/the-8-css-properties-that-make-dark-uis-feel-premium-1kh7)
- A design-system reference gives the dark-card top rim as `inset 0 1px 0 rgba(255,255,255,0.08)` (light from above), and another warns that adding a real border on top of a shadow token that already contains a 1px ring produces a broken-looking 2px edge. [SS] — [shilp-sutra surfaces](https://unpkg.com/@devalok/shilp-sutra@0.42.1/make-kit/foundations/surfaces.md), [get-design-done surfaces](https://cdn.jsdelivr.net/npm/@hegemonart/get-design-done@1.60.4/reference/surfaces.md)

**Radii**
- Concentric rule: outer radius = inner radius + the padding between them. [P] — [Jakub Krehel](https://jakub.kr/writing/details-that-make-interfaces-feel-better)
- Vercel: child radius ≤ parent radius and curves concentric. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Community ban list: one identical radius everywhere is a tell; vary by role (pills; cards 8–16px; inputs 4–6px; modals 16–24px). [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)

**Gradients, banding, grain**
- Rauno Freiberg: use radial gradients rather than scaled/blurred filled rectangles to avoid banding; large `blur()` values in `filter`/`backdrop-filter` can be slow; decorative glows and gradients must be `pointer-events: none`. [P] — [rauno interfaces](https://github.com/raunofreiberg/interfaces)
- Vercel: for fades to dark colours avoid CSS masks (banding); background images can work better. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- CSS-Tricks grain recipe: inline SVG `feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"` on a full-size rect, used as a background layer beneath a gradient that fades to transparent; optional `filter: contrast(170%) brightness(1000%)` to harden the grain; blend with `mix-blend-mode` inside an `isolation: isolate` wrapper; Blink and WebKit blend differently, so test both. The article gives no opacity value. [P] — [CSS-Tricks](https://css-tricks.com/grainy-gradients/)
- A 2026 "aurora" design kit and Framer marketplace components bake subtle grain into gradients specifically to hide banding and add texture. [SS] — [aurora kit](https://cdn.jsdelivr.net/npm/@wrongstack/core@0.295.1/design-kits/aurora-gradient/KIT.md), [Framer Grain Gradient](https://www.framer.com/marketplace/components/grain-gradient/)

**Glow**
- Community ban list: glow on every card, neon text glow and glow rings under floating elements are slop tells; allow glow on one emphasised element and use shadow for elevation. [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)

**Glass / "liquid glass" (2025–26)**
- Community recipes converge on `backdrop-filter: blur(12–20px) saturate(150–180%)`, a white fill at alpha .1–.3, a 1px border that is brighter on top, and an inset top highlight; pure-CSS versions cannot refract, so they are glassmorphism with a brighter rim. No Apple or W3C source gives official values. [SS] — [gist](https://gist.github.com/tuliopc23/6cabf60c3b306a7fd585c6cc737e2392), [ThePlusAddons](https://theplusaddons.com/blog/liquid-glass-ui/), [ekino](https://medium.com/ekino-france/liquid-glass-in-css-and-svg-839985fcb88d)
- LogRocket's refraction build: tint `hsl(0 100% 100% / 15%)`, base `blur(4px) brightness(150%)`, SVG `feDisplacementMap scale="55"` fed by a displacement PNG, specular rim from a second image; SVG filters as `backdrop-filter` inputs work only in Chromium, so Safari/Firefox need a plain blur fallback; restrict the effect to a few floating elements for performance and keep text contrast high. [C] — [LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)
- Aceternity ships a "Liquid Glass" component (refracting surface, curved rim, frosted fallback), evidence the look is a current catalogue staple. [P] — [Aceternity components](https://ui.aceternity.com/components)
- Emil Kowalski: keep blur under 20px; heavy blur is expensive, especially in Safari. [P] — [emilkowalski/skill](https://raw.githubusercontent.com/emilkowalski/skill/main/skills/emil-design-eng/SKILL.md)
- Community ban list: limit glass to one element per page where translucency carries meaning. [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)

**Focus rings**
- Vercel: `:focus-visible` (not `:focus`), `:focus-within` for grouped controls; focused elements must not be covered by sticky UI. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Rauno: build focus rings with `box-shadow` rather than `outline` because older Safari ignored radius on outlines. [P] — [rauno interfaces](https://github.com/raunofreiberg/interfaces)
- Radix assigns step 7 to element borders and focus rings. [P] — [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)

**INTRX current state (repo)**
- Dark surfaces are pure neutral hexes: canvas and Stage `#151515`, surface `#1C1C1C`, raised `#222222`, overlay `#2A2A2A`; borders are white alpha `.06 / .09 / .14`; a `--border-highlight` of `rgba(255,255,255,.06)` exists. — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css)
- Only two elevation tokens exist, each a single outer shadow plus an inset highlight: `--elev-card: 0 8px 24px -8px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.04)` and `--elev-popover: 0 24px 64px -12px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06)`. — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css)
- Tiles are `background: transparent; border: 1px solid var(--border-default); border-radius: 18px; box-shadow: none`; the dark Stage is a flat `background: var(--bg-stage)`; only the light Stage has a lighting asset (`stage-glow.svg`). — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css)
- Radii scale 6 / 8 / 12 / 16 / 20 / 28 / full; the detail Stage card is concentric (20 = 14 + 6px padding), the tile with a light Stage is 18 outside vs 13 + 6 = 19. — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css)
- Focus ring is `outline: 2px solid var(--focus-ring)` (orange) with 2–3px offset on `:focus-visible`. — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css)
- Repo rules constrain changes: `css/style.css`, `css/fonts.css`, the runtime, Stage and base exporter are frozen; shared Stage/Dock visuals are pinned by exact fixtures (`tools/verify-foundations.js`, 1,644 stage mounts) and posters must be refreshed when they change; native tiles follow Figma v4 exactly. — [AGENTS.md](C:\Users\tanzir\Desktop\interaction\AGENTS.md)

### Inferences
**Dark UI material system (my synthesis from the sources above; alpha values chosen inside the cited ranges and to extend INTRX's existing tokens).**

1. *Surface ladder.* Keep four fills, each lighter as it nears the viewer: Stage/canvas `#151515` → surface `#1C1C1C` → raised `#222` → overlay `#2A2A2A` (OKLCH L ≈ .196 / .226 / .252 / .285, computed). The steps are sound; what is missing is light.
2. *Hairline + top highlight on every raised thing.* One real border (never border + ring):
```css
.surface{
  background:linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,0) 56%),var(--bg-surface);
  border:1px solid var(--border-default);             /* rgba(255,255,255,.09) */
  box-shadow:inset 0 1px 0 rgba(255,255,255,.05), var(--elev-2);
}
.surface:hover{ border-color:var(--border-strong); }   /* interaction raises contrast */
```
3. *Elevation ladder* (straight-down light, x = 0, matching the two existing tokens; offsets/blur double, alpha is higher than light-mode recipes because the base is dark):
```css
--elev-1: inset 0 1px 0 rgba(255,255,255,.05), 0 1px 1px rgba(0,0,0,.24), 0 2px 4px -2px rgba(0,0,0,.24);
--elev-2: inset 0 1px 0 rgba(255,255,255,.05), 0 1px 1px rgba(0,0,0,.20), 0 2px 4px rgba(0,0,0,.20), 0 8px 16px -4px rgba(0,0,0,.28);
--elev-3: inset 0 1px 0 rgba(255,255,255,.07), 0 1px 2px rgba(0,0,0,.24), 0 4px 8px rgba(0,0,0,.24), 0 12px 24px -4px rgba(0,0,0,.32), 0 24px 48px -12px rgba(0,0,0,.36);
--elev-4: inset 0 1px 0 rgba(255,255,255,.08), 0 2px 4px rgba(0,0,0,.20), 0 8px 16px rgba(0,0,0,.24), 0 24px 48px -8px rgba(0,0,0,.40), 0 48px 96px -24px rgba(0,0,0,.50);
```
   `--elev-card` maps to `--elev-2`, `--elev-popover` to `--elev-3`/`--elev-4`. Never transition these; cross-fade an `::after` carrying the higher level (opacity only).
4. *Pressed / recessed wells* (inputs, tracks, code wells): invert the light. `background: var(--p-gray-900); box-shadow: inset 0 1px 2px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.04), 0 1px 0 rgba(255,255,255,.04);`
5. *Stage lighting* (the single change that touches all 520 thumbnails): replace the flat dark Stage with a top key light, a floor falloff and static grain.
```css
.demo-stage.stage[data-stage-theme="dark"]{
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,.045), transparent 60%),
    radial-gradient(140% 90% at 50% 115%, rgba(0,0,0,.32), transparent 60%),
    var(--bg-stage);
}
/* grain: static, tiled, never animated */
.stage-grain{position:absolute;inset:0;pointer-events:none;opacity:.05;mix-blend-mode:soft-light;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");}
```
   Grain opacity 3–6% is my recommendation (no source gave a number); pre-rasterising the noise to a 128–160px tile avoids SVG filter cost.
6. *Accent glow* (one focal element per demo at most): `box-shadow: 0 0 0 1px rgba(250,115,25,.35), 0 0 12px rgba(250,115,25,.30), 0 0 32px rgba(250,115,25,.16);` Pair with the solid accent, never glow on text.
7. *Dark glass* (floating bars, docks, popovers over moving content only): `background: rgba(28,28,28,.66); backdrop-filter: blur(16px) saturate(160%); border:1px solid rgba(255,255,255,.08); box-shadow: inset 0 1px 0 rgba(255,255,255,.10), var(--elev-3);` Note the existing `.dock-btn` applies `backdrop-filter: blur(12px)` to an opaque `#2A2A2A` fill, where the blur cannot show.
8. *Radii.* Enforce `inner = outer − padding` mechanically; the light-Stage tile should be 12px inside an 18px tile with 6px inset (currently 13).
9. *Why flat boxes look dead* (inference from the cited rules): with no top highlight, no gradient and no translucent edge there is no implied light source, so the eye cannot place the surface in depth; a single mid-grey border additionally flattens it.

Applying item 5 or any shared Stage/Dock change collides with INTRX's pixel-exact verification regime; it needs an explicit owner decision to re-baseline posters and Stage fixtures. A lower-risk variant is to apply lighting only to full (detail) views and landing/hero tiles first.

### Gaps
- No primary source publishes Linear's, Raycast's, Arc's, Stripe's or Family's actual dark surface/shadow token values; I found only Linear's method (LCH, three variables) and Geist's role mapping. Exact numbers for those products would require inspecting their CSS.
- No authoritative Apple or W3C values for Liquid Glass on the web; all recipes are community approximations.
- No source gave a recommended grain opacity; the 3–6% figure is my judgement.
- Rauno's `box-shadow` focus-ring advice targets older Safari; I did not verify the current Safari behaviour in this session.

---

## 2. Colour (neutral ramps, OKLCH, accent discipline, text tiers, gradients)

### Takeaway
Premium neutral systems are built perceptually (LCH/OKLCH) with fixed role steps, keep accent chrome scarce, and express text hierarchy as two or three clearly separated tiers. INTRX's ramp is sound but its secondary (`#A0A0A0`, 6.98:1) and tertiary (`#949494`, 6.02:1) tiers are almost the same colour, so hierarchy is currently carried by size alone.

### Cited Findings
- Linear moved theme generation from HSL to LCH because equal lightness values look equally light across hues; it limited how much accent ("blue chrome") enters the calculation to return to a more neutral, timeless look, and made text and neutral icons lighter in dark mode. [P] — [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- OKLCH: HSL lightness is inconsistent across hues; build variants by changing only L (`oklch(from var(--c) calc(l + 0.1) c h)`); chroma stays below 0.37 for sRGB/P3; ship an sRGB value with a `@media (color-gamut: p3)` override; use APCA for contrast because lightness alone is not enough. [P] — [Evil Martians](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- Gradient interpolation: `linear-gradient(in oklab, …)` avoids the greyish middle of sRGB gradients and the blue-to-purple shift of Lab; no single space suits every gradient. [P] — [Evil Martians](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- Radix guarantees step 11 text at APCA Lc 60 and step 12 at Lc 90 on a step-2 background. [P] — [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- Vercel prefers APCA over WCAG 2 for minimum contrast and requires `color-scheme: dark` on `<html>` and a matching `theme-color`. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Text tiers on dark: Superhuman sets body text to white at 90% and secondary detail to white at 65%, noting there is no hard rule and each element is tuned for size and weight. [P] — [Superhuman](https://blog.superhuman.com/how-to-design-delightful-dark-themes/)
- Text tiers on dark (community): one text colour at alpha 1.0 / 0.6 / 0.3. [C] — [dev.to, RAXXO](https://dev.to/raxxostudios/the-8-css-properties-that-make-dark-uis-feel-premium-1kh7)
- Off-white text `#E0E0E0`–`#F0F0F0` rather than `#FFFFFF`; body text still needs 4.5:1. [C] — [Muzli](https://muz.li/blog/dark-mode-design-systems-a-complete-guide-to-patterns-tokens-and-hierarchy/)
- Accents on dark: Superhuman keeps hue, reduces lightness and increases saturation, and removes large blocks of bright colour; Muzli says accents wash out on dark and suggests +10–20% saturation, tested. [P]/[C] — [Superhuman](https://blog.superhuman.com/how-to-design-delightful-dark-themes/), [Muzli](https://muz.li/blog/dark-mode-design-systems-a-complete-guide-to-patterns-tokens-and-hierarchy/)
- Anthropic's frontend-aesthetics prompt: dominant colours with sharp accents beat timid, evenly distributed palettes; commit to one cohesive theme through CSS variables. [P] — [Anthropic cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)
- Use colour semantically: every colour should signal a function; tokens named after decoration (gradient-start/end) are a smell. [C] — [Kosta Canatselis](https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c)
- INTRX today: text `#F1F1F1` / `#A0A0A0` / `#949494`; accent `#FA7319` (hover `#FF8A3D`, subtle `rgba(250,115,25,.14)`); seven "tint" hues reserved for 13% chip fills; a violet radial glow (`#a78bfa0b`) on the Pro pricing card; syntax colours `#9ccaa7`, `#ff9a55`, `#8eb8f5`, `#ffb27a`. — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css)
- INTRX rule: neutral greys plus one accent per demo, no decorative hues; tertiary text must hold 4.5:1 on canvas, surface, raised, overlay and Stage. — [AGENTS.md](C:\Users\tanzir\Desktop\interaction\AGENTS.md)

### Inferences
- Computed WCAG ratios for the current tokens (my calculation): `#F1F1F1` on `#151515` = 16.2:1; `#A0A0A0` = 7.0:1; `#949494` = 6.0:1 on `#151515` and 4.7:1 on `#2A2A2A` (overlay). Tertiary cannot go darker without failing the 4.5:1 gate on the overlay surface, so the only way to separate the tiers is to lift secondary: `#B4B4B4` (existing `--p-gray-300`) gives 8.8:1 on Stage and 6.9:1 on overlay. Recommended tiers: primary `#F1F1F1`, secondary `#B4B4B4`, tertiary `#949494`, plus a non-text "quaternary" `#6B6B6B` for decorative ticks, disabled glyphs and separators only.
- "Muddy mid-greys" in this system are the `#4A4A4A`–`#6B6B6B` band used as fills or solid borders on a `#151515` base: they are too light to be a surface and too dark to be text. Rule for the agent: fills stay ≤ `#2A2A2A` (or become `#F1F1F1` inverse), text stays ≥ `#949494`, and anything between must be an alpha hairline, not a solid.
- Monochrome + one accent keeps richness through non-hue variables: lightness steps, translucency, gradient direction (lit from top), texture (grain), material (matte vs gloss), and type contrast. The accent should appear at three intensities only: solid (one focal element), subtle fill (`rgba(250,115,25,.14)`), and glow (rare).
- A slight hue bias in neutrals is what Linear's LCH system and Vercel's hue-consistency rule imply, but INTRX's primitives are explicitly "neutral greys, no warm tint". If the owner allows it, a chroma of ≤ 0.004 toward the accent hue (≈ 55° in OKLCH) is the mildest option; otherwise keep pure neutral and let photography carry warmth.
- Use `in oklab` for any multi-stop decorative gradient; accent-to-transparent fades should fade the alpha of the same colour (not to `transparent` black) to avoid a grey fringe.
- Housekeeping hits for accent discipline: the violet Pro-card glow and the multi-hue syntax theme are the only decorative hues in the shell; converting both to neutral + orange (keywords orange, strings `#B4B4B4`, comments tertiary) would make the shell obey its own rule.

### Gaps
- I found no primary source stating exact alpha tiers used by Linear/Vercel/Raycast for text on dark; the 90/65 and 100/60/30 figures are from Superhuman and a community post.
- No APCA measurements were run for INTRX tokens; ratios above are WCAG 2.

---

## 3. Typography (small text on dark UIs)

### Takeaway
The consistent rules are: antialiased smoothing, tabular numerals wherever digits change, balanced titles, weights 400–600 only, negative tracking that grows with size and slightly positive tracking for tiny caps, and a compensating lighter grade/weight for light-on-dark text. INTRX already uses Geist + Geist Mono with a sensible scale; the gaps are sub-11px shell text, no global `tabular-nums`/`text-wrap`, and near-identical secondary/tertiary ink.

### Cited Findings
- Rauno: apply `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`; avoid weights below 400; medium headings look best at 500–600; do not change weight on hover/selected (layout shift); use `clamp()` for fluid headings (e.g. `clamp(48px, 5vw, 72px)`); tabular numbers for tables and timers; subset fonts. [P] — [rauno interfaces](https://github.com/raunofreiberg/interfaces)
- Vercel: tabular numbers for comparisons; curly quotes; real ellipsis character; avoid widows/orphans; non-breaking spaces for glued terms ("10 MB", "⌘ K"); animate a wrapper rather than the text node to protect anti-aliasing. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Jakub Krehel: `text-wrap: balance` for titles, `text-wrap: pretty` for paragraphs; antialiasing on the root so portaled elements inherit it; `tabular-nums` (note Inter changes numeral shapes with it). [P] — [Jakub Krehel](https://jakub.kr/writing/details-that-make-interfaces-feel-better)
- Geist type roles: Heading 72–14, Button 16/14/12, Label 20–12 (single-line, with mono variants at 14/13/12), Copy 24–13 (multi-line); Label 14 and Copy 14 are the most used; Label 13 is the secondary line and should use tabular figures for numbers; Label 12 is tertiary text in busy views; 12 is the smallest size in the system. [P] — [Geist typography](https://vercel.com/geist/typography)
- Linear uses Inter Display for headings and Inter for everything else. [P] — [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- Inter dynamic metrics: tracking (em) = −0.0223 + 0.185 × e^(−0.1745 × size px). [P, archived] — [Inter dynamic metrics](https://d.rsms.me/inter-website/v3/dynmetrics/)
- Light-on-dark text looks heavier (irradiation/halation). Fixes: a negative grade on fonts with a `GRAD` axis (`font-variation-settings: "GRAD" -50` in dark mode), which changes stroke weight without reflow; or drop body weight slightly in dark mode (example 400 → 350). Letter-spacing alone does not correct it. [P]/[SS] — [nerdy.dev](https://nerdy.dev/adjust-perceived-typepace-weight-for-dark-mode-without-layout-shift), [web.dev](https://web.dev/articles/adapting-typography-to-user-preferences-with-css), [CSS-Tricks](https://css-tricks.com/?p=306566)
- Anthropic's prompt names Inter, Roboto, Arial, Open Sans, Lato and system fonts as generic defaults and recommends decisive pairing (display + monospace), with weight and size contrast in large jumps. [P] — [Anthropic cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)
- Community list of type tells: Inter as display face; Title Case everywhere; all-caps body; loose tracking (0.1em) on body; uniform weights; everything centred; display type under 24px. [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)
- INTRX today: `--font-shell: Geist`, `--font-shell-mono: Geist Mono`; scale hero 64/64 −.03em, h1 40/44 −.02em, h2 28/32 −.015em, h3 20/26 −.01em, h4 16/22 −.005em, body 14/22, meta 11/14 mono uppercase +.04em, code 12.5/20; body has antialiased smoothing; Stage text defaults to the mono face. Shell sizes below 11px exist: eyebrow and badges 10px, stage readout 10px (9px at ≤1250px), `.agent-ask .type-meta` 9px, palette footer 9px on mobile, `.source-toolbar .badge--soon` 8px. — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css)
- INTRX rule: rendered thumbnail text ≥ 11px. — [AGENTS.md](C:\Users\tanzir\Desktop\interaction\AGENTS.md)

### Inferences
- Tracking guide derived from the Inter formula (my computation; Geist is a different face, so treat as a starting point): 11px +0.005em, 12px 0, 13px −0.003em, 14px −0.006em, 16px −0.011em, 20px −0.017em, 24px −0.020em, 32px+ −0.022em. INTRX's scale already follows the shape (−0.03em at 64px is tighter than the formula's floor, acceptable for a display line). Uppercase mono labels at 10–11px want +0.04 to +0.08em; lowercase UI text never gets positive tracking above 12px.
- Minimum sizes: 11px floor everywhere (matches the repo's thumbnail rule and is one step under Geist's 12px floor); move the 8–10px shell labels up to 11px and shorten copy instead. Mono reads about one size larger than the sans, so pair mono 12 with sans 13 (Geist pairs Label-13-mono with Label 14).
- Weights on dark: use 400 for body, 500 for labels/titles, 600 only at ≥ 20px; avoid 700+ in small sizes on dark (halation thickens strokes). To my knowledge Geist exposes a weight axis but no GRAD axis (not verified in this session), so the practical compensation is choosing 400 where a light theme would use 450–500.
- Mixing mono + sans tastefully: mono only for data (numbers, units, key hints, code, eyebrow labels, timestamps); sans for sentences and titles. A Stage that sets every label in mono (the current default) reads "terminal", which is right for FUI/data demos and wrong for product-UI demos (menus, forms, cards).
- Add once, globally: `font-variant-numeric: tabular-nums` on anything numeric that updates; `text-wrap: balance` on titles/captions, `text-wrap: pretty` on paragraphs; `font-feature-settings` for slashed zero in mono data if the face supports it; `font-optical-sizing: auto`.

### Gaps
- Geist's exact font-size/line-height/letter-spacing values per class are not on the public typography page (they live in Figma/Tailwind config).
- Apple HIG minimum text sizes and SF tracking tables could not be fetched (JS-rendered pages); not cited.
- I found no source specific to Söhne, Berkeley Mono or JetBrains Mono usage rules in premium tools beyond Anthropic's font suggestions.

---

## 4. Motion (durations, easings, springs, stagger, interruption, reduced motion)

### Takeaway
The sources agree on the structure (ease-out for enter/exit, exits faster than enters, transform/opacity only, origin-aware, interruptible, never from scale 0, no animation on high-frequency or keyboard actions, reduced motion keeps opacity) and disagree mainly on the duration ceiling (Rauno ≤ 200ms, Emil < 300ms, Material up to 1000ms tokens). INTRX's `MOTION_SYSTEM.md` already encodes almost all of the consensus; its deviations are long 400–500ms swaps, entrances from scale 0.25/0.7, and mapping strong symmetric curves to the weak built-in `ease-in-out`.

### Cited Findings

**Emil Kowalski**
- Press: `scale(0.97)` on `:active`; never animate from `scale(0)`, start at 0.9+ (his example 0.93); tooltips `transform/opacity 125ms ease-out` from `scale(0.97)`, and neighbouring tooltips open with 0ms once one is showing; use `ease-out` for enter/exit and avoid `ease-in`; built-in curves are too weak, use custom ones; make popovers origin-aware (`transform-origin` from the trigger); keep UI animation under 300ms (180ms select feels better than 400ms); add ~2px blur to mask an imperfect crossfade. [P] — [7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Animations should usually be shorter than 300ms; never animate keyboard-initiated actions; animate only transform and opacity; CSS transitions retarget mid-flight (interruptible); reduced motion swaps movement for a fade; must hold 60fps. [P] — [Great animations](https://emilkowal.ski/ui/great-animations)
- Skill file values: strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`; strong ease-in-out for on-screen movement `cubic-bezier(0.77, 0, 0.175, 1)`; iOS-like drawer `cubic-bezier(0.32, 0.72, 0, 1)`; hover/colour use `ease`; linear only for constant motion. Durations: button press 100–160ms, tooltips/small popovers 125–200ms, dropdowns/selects 150–250ms, modals/drawers 200–500ms; enter 250ms vs exit 200ms as an example of asymmetry. Frequency rule: 100+ times/day no animation, tens/day remove or reduce, occasional standard, rare can delight. Springs: Apple-style `duration 0.5, bounce 0.2`, bounce 0.1–0.3 and avoided in most UI; entry from `scale(0.95)`; press range 0.95–0.98 at `transform 160ms`; hover gated by `@media (hover: hover) and (pointer: fine)`; stagger 30–80ms, non-uniform; crossfade blur 2px with opacity .7 over 200ms; blur < 20px; swipe dismiss when velocity > 0.11; reduced motion keeps opacity/colour and removes transforms; never `transition: all`; keyframes restart on interruption, transitions retarget. [P] — [emilkowalski/skill](https://raw.githubusercontent.com/emilkowalski/skill/main/skills/emil-design-eng/SKILL.md)

**Rauno Freiberg / Vercel**
- Rauno: interaction animations ≤ 200ms; scale proportionally (dialogs fade and scale from ~0.8, buttons press to ~0.96–0.9); skip extra animation for frequent, low-novelty actions (context menus, list add/delete, trivial hovers); theme switching must not trigger transitions; pause loops off-screen; `will-change` only as a last resort during heavy scroll animation. [P] — [rauno interfaces](https://github.com/raunofreiberg/interfaces)
- Rauno, "Invisible Details": gestures keep momentum and angle; lightweight actions may trigger mid-swipe, destructive ones only on release; apply gesture deltas immediately; motion must be interruptible; macOS context menus have no entrance animation because they are used constantly; removing command-menu animation made his app feel faster. [P] — [Invisible Details of Interaction Design](https://rauno.me/craft/interaction-design)
- Vercel: honour `prefers-reduced-motion`; prefer CSS, then WAAPI, then JS; animate transform/opacity; animate only to clarify cause and effect or for deliberate delight; easing chosen by what changes; interruptible by input; no autoplay except muted non-essential loops, and motion over 5s needs pause controls; correct transform origin; never `transition: all`; SVG transforms on a `<g>` with `transform-box: fill-box; transform-origin: center`; loading states use a 150–300ms show delay and a 300–500ms minimum visible time; first tooltip in a group delayed, peers instant. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)

**Josh Comeau**
- `linear()` approximates springs with ~25–50 points; supported in all major browsers since Dec 2023 (~88% as of Oct 2025); define a bezier fallback and override inside `@supports (animation-timing-function: linear(0, 1))`; limitation: fixed duration, and an interrupted `linear()` spring reverses abruptly whereas a real spring carries velocity; if more than ~20% of transitions need bespoke curves the tokens need work; generators: Linear Easing Generator and Easing Wizard. [P] — [Josh Comeau, linear()](https://www.joshwcomeau.com/animation/linear-timing-function/)
- Most of his springs are not bouncy; high-friction springs give smooth motion; springs suit movement, not colour/opacity. [P] — [Josh Comeau, springs](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)

**Libraries and platforms**
- Motion (motion.dev): tween duration default 0.3s (0.8s with multiple keyframes); duration-based spring `bounce` default 0.25; `restSpeed` 0.1, `restDelta` 0.01; inertia `power` 0.8, `timeConstant` 700, `bounceStiffness` 500, `bounceDamping` 10; stagger via `stagger(0.1)`-style delays. The fetched page reported spring defaults of damping 10, mass 1 and stiffness "1", which conflicts with the 100/10/1 example Emil cites; treat the stiffness figure as unverified. [P] — [Motion transitions](https://motion.dev/docs/react-transitions)
- Apple (WWDC23 "Animate with springs"): springs are specified by duration and bounce; examples use `duration: 0.5` with bounce 0 (no overshoot), 0.15 (small) and 0.3 (large); presets `.smooth` (no bounce), `.snappy` (small bounce), `.bouncy` (more). [P, via search summary] — [WWDC23 session 10158](https://developer.apple.com/videos/play/wwdc2023/10158/), [SwiftUI Spring](https://developer.apple.com/documentation/swiftui/spring)
- Material 3 tokens as reported by secondary token listings: durations run from `short1` 50ms to `extra-long4` 1000ms; emphasized-decelerate `cubic-bezier(0.05, 0.7, 0.1, 1.0)` (enter), emphasized-accelerate `cubic-bezier(0.3, 0.0, 0.8, 0.15)` (exit). [SS] — [Material 3 easing and duration](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs), [camoa motion tokens](https://camoa.github.io/dev-guides/css/css-craft/motion-design-tokens)
- Jakub Krehel: stagger sections by 100ms and title words by 80ms; enter keyframe from `translateY(8px)`, `blur(8px)`, opacity 0 over 800ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)`; make exits subtler than enters (e.g. opacity 0, `blur(4px)`, partial offset instead of a full slide); transitions for interactions, keyframes for one-shot sequences. [P] — [Jakub Krehel](https://jakub.kr/writing/details-that-make-interfaces-feel-better)
- Family (Benji Taylor): motion is a spatial guide, e.g. tabs slide in the direction tapped ("We fly instead of teleport."); shared elements persist across screens; labels morph through shared letters; delight scales inversely with how often a feature is used. [P] — [Family Values](https://benji.org/family-values)
- Community lists: 100–150ms for routine actions, 200–300ms for significant transitions; default `ease`/`linear` is a tell; fade-up on every element and endless pulsing/spinning are tells. [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)
- A design-audit tool's sample annotations use hover lift 1px at 150ms and press scale .96 at 160ms. [C] — [impeccable.style](https://impeccable.style/)

**INTRX motion system (repo)**
- Tokens: durations 80 / 150 / 250 / 350 / 400 / 500ms, stagger 40ms (cascade capped ~300ms); `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`; `--ease-close: cubic-bezier(0.4, 0, 0.2, 1)`; `--ease-in-out: ease-in-out`; overshoot curves pop (1.36), settle (1.25), bounce (1.35), pop-strong (1.96, like-heart only); distances 4/6/8/12/30px; scales .96/.97/.98/.99; blur 2/3/8px; all zeroed under reduced motion. — [MOTION_SYSTEM.md](C:\Users\tanzir\Desktop\interaction\MOTION_SYSTEM.md)
- Principles: one default curve; exits ≈ 60% of entrance time (menu 250/150, panel 350/250); entrances combine opacity + 4–12px move or .96–.98 scale + 2px blur; nothing from scale 0; trigger-origin transforms or FLIP; transitions/mirrored keyframes for interruptibility; transform/opacity/filter only; hover inside `@media (hover:hover)`; reduced motion = 150ms opacity cross-fades, loops show one still. — [MOTION_SYSTEM.md](C:\Users\tanzir\Desktop\interaction\MOTION_SYSTEM.md)
- Recipes: Press .97 in 80ms, release 250ms `--ease-pop`; Icon swap from scale 0.25 + blur 10px over 500ms; Pop-in from scale 0.7 over 500ms; Tooltip 80ms delay then 150ms from .98, 50ms out, no delay when moving between anchors within 300ms; springs snappy 380/32/1 and soft 170/26/1; pointer lerp .18/.08; scroll lerp .12; rubber-band .55. — [MOTION_SYSTEM.md](C:\Users\tanzir\Desktop\interaction\MOTION_SYSTEM.md)
- Its own audit of the original 399 components: 96 with off-system curves (64 distinct curves), 33 with off-scale durations, 60 without a reduced-motion path, 10 with `linear` on a UI transition; strong symmetric curves such as `.76,0,.24,1`, `.65,0,.35,1` and `.77,0,.175,1` are mapped to the `ease-in-out` keyword. — [MOTION_SYSTEM.md](C:\Users\tanzir\Desktop\interaction\MOTION_SYSTEM.md)
- Repo status note: stage and motion baselines are now empty and both static audits run `--strict`. — [AGENTS.md](C:\Users\tanzir\Desktop\interaction\AGENTS.md)

### Inferences
**Where INTRX already matches best practice:** default strong ease-out (within rounding of Emil's `0.23,1,0.32,1`); press 0.97; menus/modals from 0.96 with 2px blur; tooltip grouping behaviour; exits faster than enters; 40ms stagger with a cap (inside Emil's 30–80ms); transform/opacity only; hover gating; designed reduced motion; time-based loops paused off-screen; springs for drag release with velocity carry.

**Where it deviates (and what to do):**
1. *Weak symmetric curve.* `--ease-in-out: ease-in-out` is a built-in keyword, and the audit table maps strong positional curves to it. Emil's rule is that built-ins are too weak and that on-screen A→B movement wants a strong in-out. Add `--ease-move: cubic-bezier(0.77, 0, 0.175, 1)` (or the repo's own `.65,0,.35,1`) for elements that travel while staying on screen; keep the keyword only for opacity cross-fades and pulses.
2. *Entrances from scale 0.25 / 0.7* (Icon swap, Pop-in) contradict "start at 0.9+". They are deliberate (calibrated to transitions.dev) and masked by blur; keep for icon-sized elements (< 24px), but anything larger than ~48px should enter from ≥ 0.9.
3. *400–500ms swaps* exceed Emil's 300ms and Rauno's 200ms ceilings. Acceptable when the animation is the demo's subject; for utility transitions inside demos (tab change, hover, menu) hold to ≤ 250ms.
4. *Press-in at 80ms* is faster than Emil's 100–160ms band; fine (feedback should feel instant), but do not go below it.
5. *Hover gate*: add `and (pointer: fine)` to match Emil.
6. *No CSS spring token.* A `linear()` version of the house springs lets CSS-only demos share the JS feel. Computed by me from the damped-spring equation:
```css
:root{ --spring-snappy: cubic-bezier(0.34,1.25,0.64,1); --spring-snappy-dur: 500ms;   /* fallback */
       --spring-soft: cubic-bezier(0.22,1,0.36,1);      --spring-soft-dur: 750ms; }
@supports (animation-timing-function: linear(0, 1)){
  :root{
    /* stiffness 380, damping 32, mass 1 → ζ≈0.82, peak 1.011 at 282ms */
    --spring-snappy: linear(0, 0.066, 0.211, 0.379, 0.539, 0.676, 0.785, 0.866, 0.924, 0.962, 0.987, 1.001, 1.008, 1.011, 1.011, 1.01, 1.008, 1.006, 1.004, 1.003, 1.002, 1.001, 1.001, 1, 1);
    /* stiffness 170, damping 26, mass 1 → ζ≈1.00, no overshoot */
    --spring-soft: linear(0, 0.064, 0.197, 0.346, 0.485, 0.605, 0.702, 0.779, 0.838, 0.882, 0.915, 0.939, 0.957, 0.969, 0.978, 0.985, 0.989, 0.993, 0.995, 0.996, 0.998, 0.998, 0.999, 0.999, 1);
  }
}
```
   Use these only for one-directional releases; for anything a user can reverse mid-flight keep the JS spring (Josh's interruption caveat).
7. The house springs line up with Apple's vocabulary (my calculation): 170/26/1 is critically damped (≈ bounce 0, ".smooth"); 380/32/1 has damping ratio ≈ 0.82, i.e. roughly bounce 0.18 (between Apple's 0.15 "small" and Emil's 0.2), with a 1.1% overshoot. No change needed.

**Disagreements to carry into the report**

| Topic | Emil | Rauno | Vercel | Material 3 | Others | INTRX |
|---|---|---|---|---|---|---|
| UI duration ceiling | < 300ms; modals/drawers 200–500 | ≤ 200ms | not numeric | tokens 50–1000ms | community 100–150 / 200–300 | 80–500ms |
| Press scale | 0.97 (0.95–0.98), 100–160ms | ~0.96–0.9 | — | — | audit sample .96 @160ms | 0.97 @ 80ms |
| Entry scale | 0.95 / 0.9+ (tooltip 0.97) | dialogs ~0.8 | — | — | — | 0.96; 0.7 and 0.25 for pop/icon |
| Enter easing | strong ease-out | — | "fits the subject" | emphasized-decelerate | community `.4,0,.2,1` | `.22,1,.36,1` |
| Exit easing | ease-out, faster | — | — | accelerate curves | — | ease-out or `.4,0,.2,1`, ~60% time |
| `ease-in` | never for UI | — | — | used for exits | — | not tokenised |
| Stagger | 30–80ms | — | — | — | Jakub 80–100ms; Motion example 100ms | 40ms, capped 300ms |
| Spring default | duration .5, bounce .2 | — | — | — | Apple .5 with 0/.15/.3; Motion bounce .25 | 380/32/1, 170/26/1 |
| Bounce | avoid in most UI | — | — | — | Josh: mostly none | 1px / 1.03 peak, named curves only |

### Gaps
- Material's official token page is JS-rendered and returned no content; the full duration/easing table (including the standard curves and the newer spring tokens) was not verified against a primary source.
- Apple HIG motion guidance and the exact default durations of `.smooth/.snappy/.bouncy` were not retrieved.
- Emil's animations.dev course material is paywalled; the values above come from his public articles and skill file.
- Motion's default spring stiffness is uncertain (see note above).

---

## 5. Micro-details (targets, cursors, selection, scrollbars, icons, alignment, states, content, loading)

### Takeaway
The "invisible" layer is a short list of checkable rules: ≥ 24px hit targets (44px touch), no dead zones, named icon buttons, one icon stroke weight, optical alignment by ±1px, designed empty/loading/error states, real copy and locale-formatted numbers, stable skeletons, explicit image dimensions, and styled selection.

### Cited Findings
- Hit targets ≥ 24px (≥ 44px on mobile) even when the visual is smaller; no dead zones (if it looks interactive it is); `touch-action: manipulation`; set `-webkit-tap-highlight-color` deliberately; disable text selection and apply `inert` while dragging; every gesture has a click/keyboard alternative. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Disable `user-select` on the inner content of interactive elements; in lists remove dead space between items and grow padding instead; open dropdowns on `mousedown`; style `::selection` and remove gradient text fills on selection; show feedback next to its trigger (inline check after copy); disabled buttons should not carry tooltips; use a prediction cone for nested menus. [P] — [rauno interfaces](https://github.com/raunofreiberg/interfaces)
- Optical alignment: adjust ±1px when perception beats geometry; every element aligns to a grid, baseline, edge or optical centre; balance icon/text lockups by weight, size, spacing or colour. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Give the icon side of a button slightly less padding, or fix the offset inside the SVG. [P] — [Jakub Krehel](https://jakub.kr/writing/details-that-make-interfaces-feel-better)
- Lucide icon grid: 24×24 canvas, ≥ 1px padding, 2px stroke throughout (never mixed), round caps and joins, centred strokes, 2px corner radius (1px for shapes under 8px), ≥ 2px gaps, coordinates on the pixel grid because off-grid lines look blurry and optically wider on low-density screens. [P] — [Lucide icon design guide](https://lucide.dev/guide/design/icon-design-guide)
- One icon library, one style, one stroke weight; SVG icons, never emoji. [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)
- States: design empty, sparse, dense and error states; skeletons mirror the final content to avoid layout shift; show-delay 150–300ms and minimum visible 300–500ms for loaders; loading buttons keep their label; no dead ends. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Content: resilient to short/average/very long content; locale-aware dates, numbers and currency; numerals for counts; a space between number and unit; specific button labels. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Fake-content tells: lorem ipsum, "John Doe", "Acme/TechCorp", round-number stats ("10,000+"), filler verbs (empower, leverage, unlock). [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)
- Images: explicit dimensions to prevent layout shift; preload only above-the-fold images; video instead of GIF; render images with `<img>`. [P] — [Vercel guidelines](https://vercel.com/design/guidelines), [rauno interfaces](https://github.com/raunofreiberg/interfaces)
- `will-change`: toggle only during heavy scroll animation as a last resort; `translateZ(0)` sparingly; if animated text shows anti-aliasing artefacts, animate a wrapper and add `translateZ(0)` or `will-change: transform`. [P] — [rauno interfaces](https://github.com/raunofreiberg/interfaces), [Vercel guidelines](https://vercel.com/design/guidelines)
- Scrollbars: render only useful ones and fix unwanted overflow; `overscroll-behavior: contain` in modals/drawers. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Changing a CSS variable on a parent restyles all children; for per-frame updates set the transform on the element directly. [P] — [emilkowalski/skill](https://raw.githubusercontent.com/emilkowalski/skill/main/skills/emil-design-eng/SKILL.md)
- INTRX today: buttons carry `touch-action: manipulation`, tap highlight is transparent, `button{cursor:pointer}`, disabled uses `not-allowed` and opacity .45; there is no `::selection` rule; scrollbars are `thin` or hidden; the pricing list uses a text "✓" glyph as its bullet. — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css)

### Inferences
- Add four global lines the shell lacks: `::selection{background:rgba(250,115,25,.28);color:#fff}`; `*{scrollbar-color:rgba(255,255,255,.14) transparent;scrollbar-width:thin}`; `:root{-webkit-text-size-adjust:100%;text-rendering:optimizeLegibility}`; `img{outline:1px solid rgba(255,255,255,.1);outline-offset:-1px}` scoped to photo slots.
- Cursor states to check per demo: `grab`/`grabbing` on draggables, `ew-resize`/`ns-resize` on sliders and splitters, `text` only on real inputs, `default` on non-interactive Stage, `pointer` on every clickable.
- Pixel discipline: 1px hairlines must land on whole device pixels (avoid fractional translate on bordered elements at rest); rotated elements need `backface-visibility: hidden` or a 1px transparent outline to anti-alias edges; scale transforms should end at exactly 1 so text re-snaps; on HiDPI a 0.5px hairline is possible but 1px alpha is safer across zoom levels.
- Icon consistency for INTRX: Lucide's default is 2px at 24px; at the 16px size the shell uses, 1.5px optical stroke (i.e. `stroke-width: 1.5` at 16px or 2 at 24px scaled) reads lighter and more "premium". Pick one and normalise every inline SVG in demos.
- Content realism is cheap and highly visible in thumbnails: plausible names, product-specific labels, non-round numbers (`$12,480.50`, `87.4%`, `2m 14s`), consistent unit formatting, one fictional brand world per category.

### Gaps
- I did not find a primary source for the exact "1.5px icon stroke" convention; Lucide specifies 2px at 24px. The 1.5px recommendation is practice-based inference.
- No source was fetched for blur-up image loading specifics or subpixel-border behaviour; those points are inference.

---

## 6. Skeuomorphic / material controls (knobs, switches, sliders, devices)

### Takeaway
Believable physical controls come from one light direction applied to every layer (body gradient, bevel highlight, bevel shade, cast shadow, gloss), plus layers that do not all move together (the gloss stays fixed while the knob rotates). Sources here are thin and mostly CodePen-level; the recipes below are my synthesis.

### Cited Findings
- All shadows should share a single light source and offset ratio; as elevation increases, offset and blur grow and opacity falls. [P] — [Josh Comeau, shadows](https://www.joshwcomeau.com/css/designing-shadows/)
- Layered shadows: at least two layers to mimic ambient and direct light. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- CodePen dial/knob examples build bevels by stacking several inset shadows at different offsets and alphas, with a separate pseudo-element for the highlight; a typical knob uses a 135° linear gradient body, an outer drop shadow, and two inset shadows (top highlight, bottom shade). [SS] — [CodePen dial](https://codepen.io/Dreamdealer/pen/AgaWaP), [CodePen knob](https://codepen.io/toddpress/pen/OJjraW)
- A "Stereo" design-system skill builds metal knobs from a repeating conic gradient over a radial gradient (flat centre, cylindrical rim) and keeps the gloss on a separate, non-rotating layer so the sheen stays put as the knob turns. [SS] — [Stereo Design System skill](https://www.skills.lc/marcus/marcus-skills/marcus-marcus-skills-skills-stereo-design-system-skill-md)
- A skeuomorphism generator derives drop shadow, bevel highlight/shade, gloss direction and knob highlight from one angle input. [SS] — [Made Good Designs generator](https://madegooddesigns.com/?p=134721)
- Family uses selective skeuomorphism for delight (deleted items tumble into a physical-looking bin with sound). [P] — [Family Values](https://benji.org/family-values)
- Community ban list: "CSS-only fake depth" is a tell; commit to true depth or stay flat. [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)
- INTRX has 20 Skeuomorph demos, 52 DRAMS controls and further extensions, with exact Figma materials preserved by verifiers; several use light Stage themes. — [AGENTS.md](C:\Users\tanzir\Desktop\interaction\AGENTS.md)

### Inferences
**Lighting model for the whole Skeuomorph/DRAMS set (synthesis):** light from top (12 o'clock), slightly forward. Every control uses the same five layers in the same order.
```css
:root{ --lit: rgba(255,255,255,.14); --lit-soft: rgba(255,255,255,.06); --shade: rgba(0,0,0,.55); }
/* Raised cap / key / knob body */
.cap{
  background:linear-gradient(180deg,#333 0%,#242424 48%,#1b1b1b 100%);
  border-radius:12px;
  box-shadow:
    inset 0 1px 0 var(--lit),              /* top bevel highlight */
    inset 0 -1px 0 rgba(0,0,0,.6),         /* bottom bevel shade */
    inset 0 0 0 1px var(--lit-soft),       /* edge definition */
    0 1px 1px rgba(0,0,0,.5),              /* contact shadow */
    0 4px 8px -2px rgba(0,0,0,.5),         /* key shadow */
    0 12px 20px -8px rgba(0,0,0,.6);       /* ambient */
}
.cap:active{ transform:translateY(1px);
  box-shadow: inset 0 1px 2px rgba(0,0,0,.6), inset 0 0 0 1px var(--lit-soft), 0 1px 1px rgba(0,0,0,.5); }
/* Recessed well (slider track, socket) */
.well{ background:#0d0d0d; border-radius:999px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.8), inset 0 -1px 0 rgba(255,255,255,.05), 0 1px 0 rgba(255,255,255,.06); }
/* Rotary knob: rotating body + fixed gloss */
.knob{ border-radius:50%;
  background: repeating-conic-gradient(from 0deg, rgba(255,255,255,.05) 0 2deg, rgba(0,0,0,.05) 2deg 4deg),
              radial-gradient(circle at 50% 35%, #3a3a3a, #1c1c1c 70%); }
.knob-gloss{ position:absolute; inset:0; border-radius:50%; pointer-events:none;   /* does NOT rotate */
  background: linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,0) 45%, rgba(0,0,0,.25));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 6px 12px -4px rgba(0,0,0,.7); }
/* Accent LED */
.led{ background: radial-gradient(circle at 50% 35%, #ffc08f, #fa7319 55%, #b04a0b);
  box-shadow: 0 0 0 1px rgba(0,0,0,.6), 0 0 6px rgba(250,115,25,.7), 0 0 14px rgba(250,115,25,.35), inset 0 1px 0 rgba(255,255,255,.5); }
```
- Checks an agent can run per material demo: (1) every highlight is on the top edge and every shade on the bottom, with no exceptions inside one demo; (2) cast shadows fall straight down; (3) pressed states reduce the outer shadow and add an inset shadow, and move ≤ 1–2px; (4) gloss/specular layers stay screen-fixed while parts rotate or slide; (5) grooves and seams are a dark line with a 1px light line beneath it; (6) textures (brushed metal, grain) sit at 3–8% contrast; (7) one accent source of emitted light at most.
- "Neumorphism done right" reduces to: enough contrast between control and background to pass 3:1 for the control boundary, a real edge line in addition to the soft shadows, and state shown by more than shadow direction (colour or indicator).
- Because INTRX's native skeuomorph tiles are pinned to exact Figma materials, these recipes apply to full views and any surrounding chrome first.

### Gaps
- I found no authoritative written guide for CSS skeuomorphic controls (Teenage Engineering-style or otherwise); the cited items are search summaries of pens and a third-party skill, not fetched pages.
- No sourced "neumorphism done right" critique was retrieved; the statement above is inference.

---

## 7. Imagery for dark showcase UIs

### Takeaway
Current premium catalogues lean on procedural atmosphere (mesh gradients, shaders, grain) more than stock photography, and where photos are used they are unified by one treatment: an inner 1px outline, a consistent grade and a scrim. Evidence here is mostly observational and vendor-level, so treat the treatments as a house style to adopt rather than an established standard.

### Cited Findings
- Image outline recipe for crisp edges on any background: `outline: 1px solid rgba(0,0,0,.1); outline-offset: -1px`, with `rgba(255,255,255,.1)` in dark mode. [P] — [Jakub Krehel](https://jakub.kr/writing/details-that-make-interfaces-feel-better)
- Aceternity's catalogue is dominated by procedural and shader visuals rather than photographs: Liquid Glass, Background Cubes Grid, Cloud Shader, Dither Shader, Chromatic Image, 3D Globe, Parallax Hero Images, Lens; each card pairs a static thumbnail with a title and one-line description. [P] — [Aceternity components](https://ui.aceternity.com/components)
- React Bits makes its own page background a tunable component and groups work into Text Animations, Animations, Components, Backgrounds and Micro Interactions. [P] — [React Bits](https://reactbits.dev/)
- Trend sources describe dark-first aurora/mesh gradients with subtle grain as the 2026 hero look, with grain used to avoid banding; Framer marketplace gradients ship with built-in noise controls (intensity, size, blend mode). [SS] — [aurora kit](https://cdn.jsdelivr.net/npm/@wrongstack/core@0.295.1/design-kits/aurora-gradient/KIT.md), [Kittl](https://www.kittl.com/blogs/grainy-blur-effect-stl/), [Framer Grain Gradient](https://www.framer.com/marketplace/components/grain-gradient/)
- Anthropic's prompt: create atmosphere and depth with layered gradients, geometric patterns or contextual effects instead of flat solid backgrounds. [P] — [Anthropic cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)
- Community ban list: decorative images that carry no information and generic stock heroes are tells; half-real (stock photo + placeholder copy) reads worse than fully placeholder. [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)
- Superhuman: dim or remove large bright areas in dark themes so focus stays on content. [P] — [Superhuman](https://blog.superhuman.com/how-to-design-delightful-dark-themes/)
- Vercel: when text sits over imagery, contrast rules still apply; fades to dark should avoid masks because of banding. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- INTRX today: approved v2 photography with provenance and hashes in `assets/photo-credits.json`, 800px for tiles/exports and 1600px for detail; named sets include forestDark, Dusk, archGrid, Magnolia, portraitC1 and chrome; several captions needed opaque `#151515` backings to stay readable over photos. — [AGENTS.md](C:\Users\tanzir\Desktop\interaction\AGENTS.md)

### Inferences
- **One grade for every photo slot** (synthesis): `filter: saturate(.72) contrast(1.06) brightness(.86)`; overlay `linear-gradient(180deg, rgba(21,21,21,0) 35%, rgba(21,21,21,.72))` where a caption sits; inner outline `rgba(255,255,255,.1)`; optional 4% grain; corner radius concentric with the card. Mean luminance of a treated photo should sit below ~35% so it never out-shouts the UI on a `#151515` Stage.
- **Art-direction rules for a set:** one subject family (architecture, mineral/landscape, studio abstracts, or macro materials), one colour temperature (neutral-to-warm so orange remains the only saturated hue), no faces unless the demo is about people, no recognisable brands, consistent focal length/depth. Reject any image whose dominant hue is blue/violet/green at high chroma, because it reads as a second accent.
- **When procedural beats stock:** backgrounds, hero fills, card covers, "image" placeholders in galleries/sliders/menus where the image is not the subject. A small family of 6–10 seeded neutral gradients (radial light + grain + one orange bloom) costs no bytes, cannot clash, scales to any slot, and is identical across 520 demos. Use real photos where the effect needs photographic detail (distortion, lens, pixel sort, parallax, Ken Burns).
- **Duotone option:** map luminance to `#0A0A0A → #F1F1F1` with an orange mid-tone only for a hero image; keep it to one per view.
- Since photo hashes and credits are verified in the repo, a CSS-only treatment (filter/overlay/outline on the slot) is the fast path; replacing files requires provenance and hash updates.

### Gaps
- I could not observe thumbnail visuals directly (text-only fetches), so claims about how Aceternity, Magic UI, Framer templates and Linear/Vercel marketing treat imagery are limited to what their text exposes; Magic UI, Motion Primitives, shadcn and Origin were not fetched.
- No primary source documents an explicit image-treatment standard (desaturation %, overlay strength) for dark component galleries; all numeric values in the inferences are mine.

---

## 8. "Sloppy UI" tells (amateur / AI-generated)

### Takeaway
Critics describe slop less as ugliness than as unauthored defaults: the same font, gradient, radius, padding, fade and copy everywhere. Two findings matter directly for INTRX: "near-black with one bright accent" is itself reported as a current AI-default look, and "pulsing dot", "eyebrow chip" and "numbered section labels" are named detector tells that appear in catalogue shells.

### Cited Findings
- Anthropic's own guidance names the convergent defaults: overused fonts (Inter, Roboto, Arial, system fonts), purple gradients on white, predictable layouts and component patterns, cookie-cutter design without context, and flat solid backgrounds; it asks for a committed theme, sharp accents, one orchestrated staggered load instead of scattered micro-interactions, and atmospheric backgrounds. [P] — [Anthropic cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics), [Anthropic blog](https://claude.com/blog/improving-frontend-design-through-skills)
- A 2026 report on Anthropic's rewritten frontend-design skill says it names three looks AI output clusters around: warm cream (`#F4F1EA`) with a high-contrast serif and terracotta accent; near-black with a single acid-green or vermilion accent; and a broadsheet layout with hairline rules and zero radius. It reportedly replaces "pick an extreme" with spending boldness in one justified place. I could not verify this against the skill file itself. [C, unverified] — [dev.to](https://dev.to/kenimo49/anthropic-rewrote-frontend-design-skill-3-ai-design-cliches-named-with-hex-codes-22m4)
- Kosta Canatselis (Jul 2026): slop is design with no author. Tells: default typography (Inter + system fallback only); decorative purple-to-blue gradients; generic copy; uniform layout (the same 16px radius and 24px padding, identical card heights); missing empty/loading/error states; absent or identical motion (one generic fade-in); everything visible at once; a left-edge coloured line plus curve on a panel. Fixes: deliberate font pairing, semantic colour, a real voice, deliberate hierarchy, designed unhappy paths, purposeful micro-interactions, progressive disclosure. [C] — [Kosta Canatselis](https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c)
- Community ban list (May 2026), visual: `linear-gradient(135deg,#667eea,#764ba2)`; glow on everything; heavy drop shadows on flat cards; rainbow gradient text; glassmorphism overload; neon text; identical radius everywhere; animated rainbow borders; low-contrast pastel accents. Layout: three equal cards, centred stacked hero, identical card grids, decorative floating shapes, two equal CTAs, identical dividers. Content: lorem ipsum, John Doe, round-number stats, fake brands, filler verbs, emoji as decoration. Motion: fade-up on everything, 600ms on routine actions, default `ease`/linear, endless pulsing/spinning, parallax everywhere, animating width/height. Components: cards for everything, emoji as icons, mixed icon styles, multiple primary button styles, default spinners and chart styling. [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list)
- A design-audit tool that ships 62 automated checks labels these tells in its examples: cards in cards, everything equal, side-tab border, status-chip soup, hero eyebrow chip, icon tile stack, numbered section labels, pulsing dot, clipped label, AI kicker, vague headline, generic CTA, "AI beige", italic serif display, and inconsistent radii (e.g. 8px fields, pills and 12px cards mixed). [C] — [impeccable.style](https://impeccable.style/)
- Why purple: Tailwind's indigo-500 default propagated through training data, per commentary citing Adam Wathan; some writers argue the colour is not the problem, sameness is. [SS] — [Product Hunt thread](https://www.producthunt.com/p/vibecoding/an-accidental-choice-a-butterfly-effect-and-the-future-of-ai-aesthetics), [dev.to](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p)
- Built In (Jun 2026) frames the risk as AI making weak design look "good enough", producing interchangeable interfaces. [SS] — [Built In](https://builtin.com/articles/ai-design-slop-era)
- Durable motion tells from Emil's review checklist: `transition: all`, `scale(0)` entries, `ease-in` on UI, centred transform-origin on popovers, animation on keyboard actions, > 300ms UI durations, hover without a media query, identical enter/exit speed, everything appearing at once. [P] — [emilkowalski/skill](https://raw.githubusercontent.com/emilkowalski/skill/main/skills/emil-design-eng/SKILL.md)
- INTRX shell elements that coincide with named tells: a hero eyebrow chip (`.hero-eyebrow`), a pulsing/live dot (`.live-dot`), uniform tile cards in an equal grid, pill-shaped everything (`--radius-full` on buttons, chips, tabs, search, selects), a text "✓" bullet, and a faint violet glow on the Pro card. — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css)

### Inferences
- INTRX's base aesthetic (near-black, neutral greys, one vivid orange) sits inside one of the three reported default clusters. The owner's constraint fixes the palette, so differentiation has to come from the things defaults lack: light and material (section 1), type with a point of view (section 3), realistic content (section 5), a consistent image world (section 7), and motion with specific character (section 4). This is likely the root of "doesn't feel fully production grade": correct tokens, no authored material.
- Consolidated tell list for an agent to grep/inspect per component (each maps to a checklist item in section 10): flat single-colour panel with a solid grey border; one generic `0 4px 12px rgba(0,0,0,.x)` shadow; non-concentric nested radii; card inside card with equal padding; same radius on every element; centred everything; low-contrast grey labels or sub-11px text; default `ease`/`ease-in-out`/`linear` on UI; `transition: all`; fade-up on every child; endless pulse on idle UI; emoji or mixed-weight icons; placeholder copy and round numbers; a second hue used decoratively; glow on more than one element; gradient text; glass over a static background; unstyled focus, selection and scrollbars; missing hover/active/disabled states.
- Not every listed tell is wrong for a catalogue: an equal tile grid is the correct pattern for browsing 520 items. The fix there is curation (featured rows, varied spans for hero demos), not abandoning the grid.

### Gaps
- Most "AI slop" sources are blogs, wikis and product pages (2025–26), i.e. practitioner opinion rather than measured evidence.
- The claimed rewrite of Anthropic's frontend-design skill (three clichés) is second-hand; the skill file was not read.
- impeccable.style's full 62-check list is not public on the landing page; only example labels were visible.

---

## 9. Gallery presentation (what makes a component catalogue feel premium)

### Takeaway
At grid level, premium is consistency plus curation: every subject lit, scaled and padded the same way on the same stage; quiet static tiles that come alive on hover; a clear featured tier; and detail pages with a large live preview, tunable props and copyable source. INTRX already has the hard infrastructure (live tiles with caps, posters, detail pages, stage themes); what it lacks is stage lighting, tile materiality and curation.

### Cited Findings
- Aceternity: sidebar taxonomy (Components, Blocks, Pages, Interactions, Templates, Labs; sub-groups such as Backgrounds & Effects, Card Components, Scroll & Parallax, Text, Buttons, Loaders, Navigation, Cursor & Pointer, 3D); cards show a static thumbnail image, title and a one-sentence description, with "New" tags; copy emphasises copy-paste, Tailwind + Motion and shadcn compatibility. [P] — [Aceternity components](https://ui.aceternity.com/components)
- React Bits: positions components as source you own, installable by copy or CLI, in JS or TS with plain CSS or Tailwind, and invites visitors to tune every value starting with the page's own background. [P] — [React Bits](https://reactbits.dev/)
- Vercel: prefer video over GIF with a still fallback and reduced-motion support; autoplay only muted, non-essential loops and provide pause for motion over 5s; set explicit media dimensions; pause off-screen loops. [P] — [Vercel guidelines](https://vercel.com/design/guidelines)
- Rauno: pause looping animations when off-screen; hover styles only under `@media (hover: hover)`. [P] — [rauno interfaces](https://github.com/raunofreiberg/interfaces)
- Emil (Sonner principles): good defaults beat options, and an interactive documentation site is part of the product. [P] — [emilkowalski/skill](https://raw.githubusercontent.com/emilkowalski/skill/main/skills/emil-design-eng/SKILL.md)
- Family: delight should be selective, with intensity inversely related to frequency of use. [P] — [Family Values](https://benji.org/family-values)
- Community lists: identical cards in an identical grid and "everything equal" read as defaults; vary spans and make one element dominant. [C] — [ux-skill ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list), [impeccable.style](https://impeccable.style/)
- INTRX today: tiles are 264px Stage (196px on landing) + caption (15px title, 13px hint), dock and quick actions fade in on hover, a 48px play button, live previews capped at six on desktop and one on touch with posters elsewhere, Show more in batches of twelve, grid/rows density, per-Stage dark/light theme, detail page with toolbar (theme, viewport, speed, replay, fullscreen), source tabs, notes and an agent rail; tile hover changes border colour only. — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css), [AGENTS.md](C:\Users\tanzir\Desktop\interaction\AGENTS.md)
- INTRX fit rules: subjects are fitted deterministically, with a 12% minimum fill heuristic and documented sparse-size exceptions where Figma geometry wins. — [AGENTS.md](C:\Users\tanzir\Desktop\interaction\AGENTS.md)

### Inferences
- **Uniform stage lighting** is the strongest grid-level signal: identical key light, floor falloff and grain on every tile makes 520 unrelated demos look like one studio shoot (recipe in section 1). A soft contact shadow under each subject (`0 24px 32px -24px rgba(0,0,0,.6)` on the stage content wrapper) seats objects on the stage.
- **Consistent subject scale:** target 45–65% of the stage's short side for the subject's bounding box, optical centre ~4px above geometric centre (the repo already applies `translateY(-4px)`), ≥ 24px clear margin; sparse exceptions are the visible outliers in a grid and deserve either a scale-up in thumbnails or a supporting ground (track, plate, shadow).
- **Tile materiality:** give tiles a surface instead of `transparent` + border: caption on `--bg-surface`, Stage inset by a hairline, `--elev-1` at rest, hover = border to `--border-strong` + 1px lift + Stage light gaining ~2% (150ms in, 250ms out).
- **Static-then-live:** posters at rest, live on hover/focus (already built); the poster should be the most flattering frame, not frame 0 (the repo has an `--initial` poster path for authored first frames).
- **Curation:** a featured row with larger spans (2×1) for 6–10 hero demos, category covers, and "new" badges used sparingly; this breaks the "everything equal" read without changing the browse grid.
- **Detail pages:** large preview first, props/controls beside it, code with copy feedback beside the trigger, related items with real posters. INTRX has these; the polish gap is toolbar typography below 11px and near-identical secondary/tertiary ink.
- **Dark/light toggle:** keep per-Stage theme independent of page theme (already the case), but ensure both stage themes share the same lighting language (the light Stage has a glow asset; the dark Stage has none).

### Gaps
- Visual properties of competitor thumbnails (lighting, padding, video vs static, hover-to-play) could not be confirmed from text fetches; Aceternity's alt text indicates static image thumbnails, but I did not verify hover behaviour.
- Magic UI, Motion Primitives, shadcn/ui, Origin (coss) and 21st.dev were not fetched; no claims are made about them.
- No source quantifies ideal subject scale or padding in gallery thumbnails; the 45–65% figure is my recommendation.

---

## 10. Synthesis: (a) polish checklist, (b) starter token sheet, (c) the ten highest-gain changes

### Takeaway
A small additive token layer (elevation ladder, stage lighting, text-tier respread, image treatment, two motion curves) plus a mechanical per-component checklist will lift most of the catalogue at once, because INTRX's structure and motion tokens are already close to best practice; the missing ingredient is light, material and typographic hierarchy.

### Cited Findings
- Existing INTRX tokens to extend rather than replace (names and values listed in sections 1–4). — [foundations.css](C:\Users\tanzir\Desktop\interaction\css\foundations.css), [MOTION_SYSTEM.md](C:\Users\tanzir\Desktop\interaction\MOTION_SYSTEM.md)
- Constraints that shape how fast this can go: frozen v1 files; exact Stage/Dock fixtures and native PNG oracles; neutral greys + one accent per demo; thumbnail text ≥ 11px; "the v4 Figma tile wins"; at most three declared actions; generated registry output must be rebuilt and posters refreshed after shared visual changes. — [AGENTS.md](C:\Users\tanzir\Desktop\interaction\AGENTS.md)
- Source basis for each checklist item is given in brackets and refers to the cited findings in sections 1–9: V = [Vercel](https://vercel.com/design/guidelines), R = [Rauno](https://github.com/raunofreiberg/interfaces), E = [Emil](https://raw.githubusercontent.com/emilkowalski/skill/main/skills/emil-design-eng/SKILL.md), J = [Josh Comeau](https://www.joshwcomeau.com/css/designing-shadows/), K = [Jakub Krehel](https://jakub.kr/writing/details-that-make-interfaces-feel-better), S = [Superhuman](https://blog.superhuman.com/how-to-design-delightful-dark-themes/), G = [Geist](https://vercel.com/geist/colors), L = [Lucide](https://lucide.dev/guide/design/icon-design-guide), B = [ban list](https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list), A = [Anthropic](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics), M = [MOTION_SYSTEM.md](C:\Users\tanzir\Desktop\interaction\MOTION_SYSTEM.md).

### Inferences

#### (a) Polish checklist, ordered by impact (all items are my synthesis; bracketed letters show the supporting sources)

Format: **Check** → **Fix**.

*Material and depth*
1. **Any panel that is a flat fill with only a border or nothing** → add the surface recipe: 2.5% top sheen gradient, `--border-default` hairline, `inset 0 1px 0 rgba(255,255,255,.05)`, and the right `--elev-n`. [V, K, S]
2. **Any single-layer `box-shadow` (one offset/blur pair)** → replace with the matching `--elev-1…4`; delete ad-hoc shadows. [V, J]
3. **Shadows cast in different directions inside one demo** → all x-offsets 0, light from top; highlights top edge, shades bottom edge. [J]
4. **Solid mid-grey borders (`#333`–`#555`) or 2px borders** → 1px `--border-subtle/default/strong` (white alpha .06/.09/.14); never a ring on top of a border. [V, G, K]
5. **Nested rounded boxes where inner radius ≥ outer or `outer ≠ inner + padding`** → set inner = outer − padding (min 2px); snap to the radius scale. [K, V]
6. **Elevation not expressed by lightness** (popover same colour as its parent) → step the fill one level up the surface ladder for each level closer to the viewer. [S, G]
7. **Fills in the `#4A4A4A`–`#6B6B6B` band, or pure `#000`/`#fff`** → move fills to ≤ `#2A2A2A` or inverse `#F1F1F1`; base never darker than `#0A0A0A`; text never `#fff` at body sizes. [S]
8. **Recessed things (tracks, inputs, wells) drawn as raised** → use the well recipe (darker fill, inset top shadow, bottom light line). [J]
9. **Glow on more than one element, glow on text, or glass over a static background** → keep one accent glow; replace other glows with elevation; remove pointless `backdrop-filter`. [B, R]
10. **Visible gradient banding on large dark fades** → use radial gradients, `in oklab`, and the grain layer; no mask-based fades to dark. [R, V]

*Colour and type*
11. **A second saturated hue used decoratively** → neutral or the single accent; status colours only for real status. [B, A]
12. **Accent used on more than ~10% of the demo's pixels or on more than one focal element** → reserve solid orange for the one primary action/indicator; others use `--accent-subtle` or neutral. [A, S]
13. **Text below 11px, or grey text under 4.5:1 on its actual background** → raise to 11px and to `--text-tertiary` or better; measure against the real backdrop including photos. [V]
14. **Secondary and tertiary text indistinguishable** → primary `#F1F1F1`, secondary `#B4B4B4`, tertiary `#949494`; also separate by size/weight. [S, G]
15. **Numbers that change or align without tabular figures** → `font-variant-numeric: tabular-nums`; mono for data. [V, R, K]
16. **Titles wrapping with a one-word last line; paragraphs with orphans** → `text-wrap: balance` on titles/captions, `pretty` on paragraphs. [K, V]
17. **Large type with default tracking, tiny caps with none, weights < 400 or > 600 at small sizes** → apply the tracking table (≥ 20px: −0.015 to −0.03em; 11px caps: +0.04 to +0.08em); weights 400/500/600. [R]
18. **Mono used for sentences, or sans used for data** → mono only for numbers, units, key hints, code, eyebrow labels. [A]

*Motion*
19. **`transition: all`, `ease`, `ease-in`, `ease-in-out` or `linear` on a UI state change** → name the properties and use `--ease-out` (enter/exit), `--ease-move` (on-screen travel), `--ease-close` (decisive exit); linear only for loops and scrubbing. [E, V, M]
20. **Durations off the scale, or utility transitions > 250ms** → snap to 80/150/250/350/400/500; hover 150, menus 250/150, panels 350/250. [E, R, M]
21. **Enter and exit the same speed** → exit ≈ 60% of enter. [E, M]
22. **Entrances from `scale(0)` or with no secondary cue** → from ≥ 0.9 (icons excepted) with opacity + 4–12px move + 2px blur. [E, M]
23. **Popovers/menus/tooltips scaling from centre** → `transform-origin` at the trigger. [E, V]
24. **Keyframe animation on something the user can reverse** → convert to transitions or mirrored keyframes; drags release into the 380/32 or 170/26 spring with velocity. [E, K, M]
25. **Missing press feedback or hover outside a hover media query** → `:active` scale .97 in 80ms; hover inside `@media (hover:hover) and (pointer:fine)`; interaction raises contrast. [E, V]
26. **Everything appears at once, or stagger > 80ms/uncapped** → 40ms stagger, capped at ~300ms total. [E, M]
27. **Idle UI that pulses, spins or shimmers forever without meaning** → stop when nothing is changing; loops pause off-screen. [B, R]
28. **No reduced-motion branch** → 150ms opacity cross-fade, one still frame for loops, feedback colours kept. [E, V, M]
29. **Animating width/height/top/left or layered shadows** → transform/opacity/filter, FLIP, `grid-template-rows`; cross-fade a shadow layer. [V, E, J]

*Details and content*
30. **Icons with mixed stroke weights/sizes, emoji, or text glyphs as icons** → one SVG set, one stroke weight, pixel-snapped, optically centred. [L, B]
31. **Icon/text lockups or play/chevron glyphs that look off-centre** → nudge ±1px; less padding on the icon side. [V, K]
32. **Hit targets < 24px (44px touch), dead gaps between list rows, wrong cursors** → pad the target, remove gaps, set `grab/grabbing/ew-resize/pointer`. [V, R]
33. **Missing hover/active/focus/disabled/empty/loading state** → add each; focus = 2px accent ring offset 2px on `:focus-visible`. [V, B]
34. **Placeholder content: lorem, John Doe, Acme, round numbers, generic labels** → specific plausible names, non-round locale-formatted numbers, real units with a space. [V, B]
35. **Photos without treatment** → shared grade, inner 1px outline `rgba(255,255,255,.1)`, caption scrim, explicit dimensions; reject images with a competing saturated hue. [K, V]
36. **Rotated or scaled elements with jagged edges or blurry text at rest** → end transforms at identity, add `backface-visibility:hidden` or a transparent outline; animate a wrapper, not the text node. [V]
37. **Card inside card with equal padding, or every element the same size/weight** → remove a container level or differentiate; make one element dominant. [B]
38. **Subject too small, off-centre or cramped in the thumbnail** → 45–65% of the short side, ≥ 24px margin, optical centre slightly high, contact shadow. [inference]

#### (b) Starter token sheet (additive to `foundations.css`; dark neutral + single orange)

```css
:root{
  /* neutral ramp: existing primitives kept (approx. OKLCH L in comments) */
  /* #0A0A0A .145 · #101010 .173 · #151515 .196 · #1C1C1C .226 · #222 .252 · #2A2A2A .285 */
  --bg-well: var(--p-gray-900);                     /* recessed tracks, inputs, code wells */

  /* text tiers (respread) */
  --text-primary:#F1F1F1;      /* 16.2:1 on stage */
  --text-secondary:#B4B4B4;    /* 8.8:1  (was #A0A0A0, 7.0:1) */
  --text-tertiary:#949494;     /* 6.0:1; 4.7:1 on overlay, do not darken */
  --text-quaternary:#6B6B6B;   /* decorative ticks/disabled glyphs only, never copy */

  /* hairlines (existing) + highlights */
  --border-subtle:rgba(255,255,255,.06); --border-default:rgba(255,255,255,.09); --border-strong:rgba(255,255,255,.14);
  --hl-1:inset 0 1px 0 rgba(255,255,255,.05); --hl-2:inset 0 1px 0 rgba(255,255,255,.08); --hl-3:inset 0 1px 0 rgba(255,255,255,.12);
  --sheen:linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,0) 56%);

  /* elevation ladder (light from top, x=0) */
  --elev-0:none;
  --elev-1:var(--hl-1),0 1px 1px rgba(0,0,0,.24),0 2px 4px -2px rgba(0,0,0,.24);
  --elev-2:var(--hl-1),0 1px 1px rgba(0,0,0,.20),0 2px 4px rgba(0,0,0,.20),0 8px 16px -4px rgba(0,0,0,.28);
  --elev-3:var(--hl-2),0 1px 2px rgba(0,0,0,.24),0 4px 8px rgba(0,0,0,.24),0 12px 24px -4px rgba(0,0,0,.32),0 24px 48px -12px rgba(0,0,0,.36);
  --elev-4:var(--hl-2),0 2px 4px rgba(0,0,0,.20),0 8px 16px rgba(0,0,0,.24),0 24px 48px -8px rgba(0,0,0,.40),0 48px 96px -24px rgba(0,0,0,.50);
  --elev-well:inset 0 1px 2px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.04),0 1px 0 rgba(255,255,255,.04);
  --elev-card:var(--elev-2); --elev-popover:var(--elev-3);        /* keep old names working */

  /* accent (existing) + glow */
  --accent-default:#FA7319; --accent-hover:#FF8A3D; --accent-subtle:rgba(250,115,25,.14);
  --accent-ink:#0A0A0A;                              /* 7.1:1 on orange */
  --glow-accent:0 0 0 1px rgba(250,115,25,.35),0 0 12px rgba(250,115,25,.30),0 0 32px rgba(250,115,25,.16);

  /* stage lighting */
  --stage-key:radial-gradient(120% 80% at 50% -10%,rgba(255,255,255,.045),transparent 60%);
  --stage-floor:radial-gradient(140% 90% at 50% 115%,rgba(0,0,0,.32),transparent 60%);
  --grain-opacity:.05;

  /* glass */
  --glass-bg:rgba(28,28,28,.66); --glass-filter:blur(16px) saturate(160%);

  /* radii (existing scale) + rule: inner = outer − padding */
  --radius-xs:6px;--radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:20px;--radius-2xl:28px;--radius-full:999px;

  /* photo treatment */
  --photo-filter:saturate(.72) contrast(1.06) brightness(.86);
  --photo-outline:1px solid rgba(255,255,255,.10);
  --photo-scrim:linear-gradient(180deg,rgba(21,21,21,0) 35%,rgba(21,21,21,.72));

  /* motion: existing durations/easings unchanged; additions only */
  --ease-move:cubic-bezier(0.77,0,0.175,1);          /* on-screen A→B travel */
  --ease-drawer:cubic-bezier(0.32,0.72,0,1);         /* sheets/drawers */
  --spring-snappy:cubic-bezier(0.34,1.25,0.64,1); --spring-snappy-dur:500ms;
  --spring-soft:cubic-bezier(0.22,1,0.36,1);      --spring-soft-dur:750ms;

  /* type scale (existing sizes; floor 11px) */
  --type-display:600 64px/64px var(--font-shell);    /* −.03em */
  --type-h1:600 40px/44px var(--font-shell);         /* −.02em */
  --type-h2:600 28px/32px var(--font-shell);         /* −.015em */
  --type-h3:500 20px/26px var(--font-shell);         /* −.01em */
  --type-title:500 15px/20px var(--font-shell);      /* −.006em */
  --type-body:400 14px/22px var(--font-shell);
  --type-small:400 13px/20px var(--font-shell);
  --type-label:500 12px/16px var(--font-shell);
  --type-data:500 12px/16px var(--font-shell-mono);  /* tabular-nums */
  --type-micro:500 11px/14px var(--font-shell-mono); /* uppercase, +.05em; smallest allowed */
}
@supports (animation-timing-function:linear(0,1)){ :root{
  --spring-snappy:linear(0,0.066,0.211,0.379,0.539,0.676,0.785,0.866,0.924,0.962,0.987,1.001,1.008,1.011,1.011,1.01,1.008,1.006,1.004,1.003,1.002,1.001,1.001,1,1);
  --spring-soft:linear(0,0.064,0.197,0.346,0.485,0.605,0.702,0.779,0.838,0.882,0.915,0.939,0.957,0.969,0.978,0.985,0.989,0.993,0.995,0.996,0.998,0.998,0.999,0.999,1);
}}
::selection{background:rgba(250,115,25,.28);color:#fff}
*{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.14) transparent}
:root{text-rendering:optimizeLegibility;-webkit-text-size-adjust:100%}
:where(h1,h2,h3,.kit-tile-title,.tile-details){text-wrap:balance}
:where(p,li,.tile-hint){text-wrap:pretty}
:where([data-numeric],time,.type-data,.stage-readout){font-variant-numeric:tabular-nums}
```

Notes on the sheet: values not attributed in sections 1–7 are my choices; text-tier and accent-ink contrast figures are my WCAG 2 calculations; the `linear()` strings are computed from the repo's own spring parameters.

#### (c) Ten changes with the highest perceived-quality gain per hour (my ranking)

1. **Light the dark Stage** (key light + floor falloff + static grain, one shared rule). Touches every thumbnail and detail view; converts "flat box" into a studio. Needs an owner decision on re-baselining Stage fixtures and posters.
2. **Ship the elevation ladder and surface recipe, then map every ad-hoc shadow/border to it** (scriptable find-and-replace per demo; items 1–4, 6 of the checklist).
3. **Respread text tiers and enforce the 11px floor, tabular numerals and balanced titles** (token change plus four global rules; fixes hierarchy in shell and demos together).
4. **Give tiles material and a hover response** (surface caption, hairline-inset Stage, `--elev-1`, lift + border + light on hover). The grid is the first impression.
5. **Concentric-radius and hairline audit by script** (detect `inner ≥ outer` and solid grey borders; mechanical fixes).
6. **One photo treatment class + a culled image set** (CSS-only grade, outline, scrim; drop images with competing hues; procedural gradients for non-essential slots).
7. **Motion token sweep on the remaining literals plus `--ease-move`** (the repo already has the audit categories; add the strong in-out and the hover pointer gate).
8. **Accent discipline pass** (one solid-orange focal element per demo; neutralise the violet Pro glow and the multi-hue syntax theme; orange glow recipe for the single focal element only).
9. **Realistic content pass** (names, labels, non-round formatted numbers, consistent units; highly visible in thumbnails, no layout risk).
10. **Icon normalisation and optical centring** (one stroke weight, SVG instead of glyph characters, ±1px nudges on play/chevron/lockups).

Runner-up: curate a featured row with larger spans and regenerate posters at each demo's most flattering frame.

### Gaps
- None of the checklist thresholds marked "inference" (accent ≤ ~10% of pixels, subject 45–65% of the short side, photo mean luminance < 35%, grain 3–6%) comes from a source; they are proposed defaults to be tuned by eye.
- The token sheet was not tested in the running site; contrast figures are computed, not measured in a browser, and APCA was not evaluated.
- The interaction between these shared changes and the repo's exact-pixel verifiers was assessed only from `AGENTS.md`; the actual number of fixtures that would need re-baselining is unknown.
- Research could not cover first-hand visual inspection of Linear, Raycast, Arc, Stripe, Family, Magic UI, Motion Primitives, shadcn or Origin; another researcher using a browser could close that gap.
