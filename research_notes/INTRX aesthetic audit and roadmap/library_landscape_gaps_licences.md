# Animated / interaction UI library landscape, INTRX gaps, licences and catalog organisation (checked 28 Nov 2026)

Method notes for the report writer:
- All GitHub star counts, SPDX licence ids and "last pushed" dates were read from the GitHub REST API on 28 Nov 2026. npm figures are weekly downloads for 21–27 Nov 2026 from the npm downloads API. Bundle sizes are from the Bundlephobia API plus my own gzip measurements of jsDelivr files on 28 Nov 2026.
- Licence clauses are **closely paraphrased, not verbatim** (one short direct quote only). Each row links to the page that holds the exact wording; read it there before acting. Nothing here is legal advice.
- Component counts taken from a site's sidebar were counted by a page-summarising tool unless marked "site states"; treat them as ±5.
- Pages I could not read: Codrops licensing page (bot check, HTTP 403), uiverse.io terms (403), motion-primitives.com docs (403), Tailwind Plus licence page (login wall to my fetcher), skiper-ui.com licence/terms URLs (404; the pre.skiper-ui.com docs host has an expired certificate), originkit.dev (JS-rendered, only the tagline came back), ui.elevenlabs.io (429). Where I used a fallback (GitHub repo, search-engine summary), it is marked.

## 1. Landscape: who the leading libraries are (size, stack, licence, price, distribution, taxonomy)

### Takeaway
The 2026 field has converged on one distribution model: React + Tailwind + Motion source files installed through the shadcn CLI from a namespaced registry (613 registries are listed in shadcn's directory), with an MCP server, llms.txt and a one-time-payment Pro tier of blocks and templates on top of a free component set. Almost nobody ships framework-free vanilla code at INTRX's scale; the vanilla sources that exist are Uiverse (CSS), Codrops (demos), CodePen, Paper Shaders' vanilla package and Motion's JavaScript examples.

### Cited Findings

#### 1a. Comparison table — animated / interaction libraries

| Library | URL | Size | Stack | Licence (free part) | Paid tier | Install / distribution | Top-level taxonomy (labels as written) |
|---|---|---|---|---|---|---|---|
| shadcn/ui | ui.shadcn.com | 129,321 stars; ~66 core components incl. new AI ones (Attachment, Bubble, Message, Message Scroller, Marker, Questionnaire, Trace, Code Block) | React, Tailwind, Radix/Base UI | MIT | none | `npx shadcn add`, registry + namespaces, MCP server, Skills, llms.txt, Open in v0 | Home, Docs, Components, Blocks, Charts, Directory, Typeset, Create |
| Aceternity UI | ui.aceternity.com | site footer states 100+ free components (~114 in sidebar + 5 Labs); paid: 200+ blocks, 15+ templates, 5 pages, 19 "interactions" | React/Next, Tailwind, Motion | Proprietary site terms (free to use in projects; no resale/redistribution as a competing library) | 1-year $169, lifetime $199, team $1,590 (one-time) | copy-paste, `npx shadcn@latest add @aceternity/<name>`, MCP | Components, Blocks, Pages, Interactions (New), Templates, Resources, Pricing |
| Magic UI | magicui.design | 23,643 stars; 80 component files in registry | React, Tailwind, Motion | MIT | Magic UI Pro $199 lifetime: 50+ sections, 9+ templates; resale of code not allowed | `pnpm dlx shadcn@latest add @magicui/<name>`, MCP page, Open in v0, Copy Page | Components, Templates, Showcase; sidebar: Components, Special Effects, Animations, Text Animations, Device Mocks, Buttons, Backgrounds, Community |
| React Bits | reactbits.dev | 52,878 stars; ~218 free components (221 `.jsx` files under `src/content`); Pro: 255 components, 400 page blocks, 300 app-UI blocks, 18 templates | React; four variants JS-CSS / JS-TW / TS-CSS / TS-TW; deps in repo include gsap, motion, ogl, three, matter-js, lenis | MIT + Commons Clause v1.0 (no selling/redistributing components, including ports) | Pro $129 / $249 / $349 one-time | `npx shadcn@latest add @react-bits/SplitText-TS-TW`, manual copy; tools (Background Studio etc.) | Components, Installation, Tools, Pro; content folders: TextAnimations, Animations, Components, Micro, Backgrounds |
| 21st.dev | 21st.dev | repo 5,590 stars (last push May 2025); marketplace with thousands of community items (e.g. Buttons 2,043, Cards 1,780, Heroes 1,152) | React, Tailwind (shadcn-style) | Repo MIT; marketplace content governed by 21st terms + each author's licence | Free (2 copies/day), Builder $6–8/mo, Builder+AI $15–60/mo, Team from $7.50/seat | web copy, CLI `npx @21st-dev/cli@latest`, MCP `generate` tool | Components, Featured, Newest, Authors, Libraries; sidebar: Marketing Blocks (29 categories), UI Components (49 categories) |
| Motion Primitives | motion-primitives.com | 7,059 stars; 33 core component files | React, Tailwind, Motion | MIT | Pro tier exists (not readable today) | shadcn CLI (`@motion-primitives` namespace listed) | not captured (site returned 403) |
| Animate UI | animate-ui.com | 5,149 stars | React; animated primitives over Radix, Base UI, React Aria; Motion | MIT + Commons Clause (no selling/redistributing components in original form) | none seen | `npx @animate-ui/cli@latest animate all`; `@animate-ui` registry | docs intro only captured (Primitives / Components / Icons not confirmed) |
| Skiper UI | skiper-ui.com | site states 106+ components | Next, Tailwind, Motion | No readable licence; docs (per search summary) require attribution on the free tier | Premium $129 one-time; "Exclusive" $549 coming | `npx shadcn add @skiper-ui/skiper40` | How to use, Pricing, Components (Free / Premium) |
| Cult UI | cult-ui.com | 7,733 stars; ~134 sidebar entries | React, Tailwind, Motion, Base UI | MIT | paid "AI SDK Agents" 150+ full-stack blocks (one-time, price not shown) | `npx shadcn@latest add @cult-ui/<name>`, MCP server page, "LLMs & Agents" page, Copy page | Blocks, Components, AI components, skills; sidebar: AI (Inputs, Generative UI), App & Workspace, Form Controls, Feedback & Status, Navigation & Overlays, Onboarding & Flows, Buttons, Cards, Landing Pages, Illustrations, Media & Mockups, Backgrounds & Effects, Typography |
| Kokonut UI | kokonutui.com | 2,441 stars; site states 117 components | React, Tailwind v4, Motion, shadcn | MIT | Pro: 150+ components and templates; single templates from $59 | `npx shadcn@latest add @kokonutui/<name>`, shadcn MCP, llms.txt | Docs, Installation, Agents and MCP, Changelog, llms.txt, Pro components, Website templates |
| coss ui (was Origin UI) | coss.com/ui | 11,233 stars (repo `cosscom/ui`); 56 components, 531 "particles" | React, Base UI, Tailwind | MIT | none (funded by coss.com) | copy-own source; `@coss` registry | Docs, Particles, Chat UI |
| Eldora UI | eldoraui.site | 1,976 stars; site states 150+ | React, TS, Tailwind, Motion | MIT | none seen | registry JSON `/r/*.json`, Open in v0 | Components, Templates, Blocks (New) |
| Fancy Components | fancycomponents.dev | 3,323 stars; ~40–45 components | React, TS, Tailwind, Motion | MIT | none | shadcn registry (`@fancy` listed), llms.txt | Docs, Components; sidebar: Text, Carousel, Background, Physics, Image, Filter, Blocks |
| SmoothUI | smoothui.dev | 1,074 stars; site states 228 primitives and components | React 19, Motion, GSAP, Tailwind v4 | MIT | none seen | shadcn registry, MCP, public search API (OpenAPI), llms.txt | Components, Blocks, Templates, Resources; footer: Primitives, Components, Blocks, Templates |
| Hover.dev | hover.dev | 30 categories (10 Sections + 20 Components) | React, Tailwind, Framer Motion | All rights reserved; redistribution needs written consent | Hover Pro $49 (list $149) lifetime | copy-paste | Components, Templates, Pricing, FAQ, Color Generator |
| beUI | beui.dev | 233 React + 76 React Native components; Pro 366+ blocks | React/Next, RN, Motion, Tailwind | MIT (public library, per site) | Pro lifetime $249 | `npx shadcn@latest add @beui/<name>`, `npx beui-native add`, MCP + Agent Skill, markdown page versions | Components, Charts, Interactions, Sounds, React Native, Resources; filters Hover, Press, Drag, Type, Loading, Sound |
| transitions.dev | transitions.dev | 48+ transitions | HTML/CSS and React | not stated | Pro (price not shown) | Remix in studio, Motion Skill (.md), MCP, `npx transitions-agent` | Library, Builder, Motion Agent, Motion Skill, MCP, Community, Docs; categories All, Essential, AI Agents, Effects, Texts, Pro |
| libraries.dev | libraries.dev | ~9–12 effect "libraries" (Border beam, Thinking orbs, Gooey, Liquid Metal, Voice ring…) | paste-into-agent libraries | five libraries MIT (per site FAQ), rest paid | Pro + paid "Skill" | paste into Claude Code / Cursor / Codex | Products, Libraries, Models (New), Skill, Studio, Pricing |
| HorizonX | horizonx.so | site claims 1000+ products | Figma, HTML/CSS, WebGL textures/shaders | commercial licence with subscription; bundled OSS keeps original licence | $24.99 / $39.99 / $99.99 per month | downloads, Figma plugin, desktop app, MCP, Copy Prompt | Explore, Tools, MCP, Pricing, Affiliate, Resources |
| Originkit | originkit.dev | INTRX's own Nov 2026 review counted 58 functional + 805 shader-art entries | not confirmed | not confirmed | not confirmed | not confirmed | not captured |
| uilabs | uilabs.dev | 12 experiments | React, Tailwind, Framer Motion, Radix | none stated (default: all rights reserved) | — | showcase only | single gallery page |

Sources for the table:
- shadcn/ui stars, licence — [GitHub](https://github.com/shadcn-ui/ui); nav and component list — [shadcn docs](https://ui.shadcn.com/docs/components); MCP setup and supported clients (Claude Code, Cursor, VS Code, Codex, OpenCode) — [shadcn MCP docs](https://ui.shadcn.com/docs/mcp); directory holds 613 namespaces including @aceternity, @magicui, @react-bits, @animate-ui, @motion-primitives, @cult-ui, @kokonutui, @coss, @eldoraui, @fancy, @smoothui, @skiper-ui, @beui, @ai-elements, @prompt-kit, @assistant-ui, @kibo-ui, and no @intrx — [registries.json](https://ui.shadcn.com/r/registries.json).
- Aceternity nav, category list, "New" badges, paid contents — [components page](https://ui.aceternity.com/components); prices — [pricing](https://ui.aceternity.com/pricing); install command and commercial-use FAQ (structured data) — [home page](https://ui.aceternity.com/).
- Magic UI stars/licence — [GitHub](https://github.com/magicuidesign/magicui); 80 component files — [registry folder](https://github.com/magicuidesign/magicui/tree/main/apps/www/registry/magicui); sidebar, page anatomy, install command — [Marquee doc page](https://magicui.design/docs/components/marquee); Pro price and contents — [Magic UI Pro](https://pro.magicui.design).
- React Bits stars — [GitHub](https://github.com/DavidHDev/react-bits); component list — [reactbits.dev](https://reactbits.dev/get-started/index); variants and CLI command — [installation](https://reactbits.dev/get-started/installation); Pro tiers — [pro.reactbits.dev](https://pro.reactbits.dev); licence — [LICENSE.md](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md).
- 21st.dev category counts — [community components](https://21st.dev/community/components); pricing — [pricing.md](https://21st.dev/pricing.md); terms (last updated 20 Jul 2026) — [terms](https://21st.dev/terms); MCP/CLI — [21st.dev/magic](https://21st.dev/magic); repo — [GitHub](https://github.com/serafimcloud/21st).
- Motion Primitives — [GitHub](https://github.com/ibelick/motion-primitives) and [components/core](https://github.com/ibelick/motion-primitives/tree/main/components/core).
- Animate UI — [GitHub](https://github.com/imskyleen/animate-ui), [LICENSE.md](https://github.com/imskyleen/animate-ui/blob/main/LICENSE.md), [docs](https://animate-ui.com/docs).
- Skiper UI — [skiper-ui.com](https://skiper-ui.com); attribution note via search summary of [quick-start docs](https://pre.skiper-ui.com/docs/quick-start) (page itself unreadable today).
- Cult UI — [GitHub](https://github.com/nolly-studio/cult-ui), [docs](https://www.cult-ui.com/docs).
- Kokonut UI — [GitHub](https://github.com/kokonut-labs/kokonutui), [home](https://kokonutui.com), [docs](https://kokonutui.com/docs).
- coss ui — [coss.com/ui](https://coss.com/ui), [GitHub](https://github.com/cosscom/ui); it is the evolution of Origin UI, rebuilt on Base UI, with old components recast as "particles" — [coss roadmap](https://coss.com/ui/docs/roadmap).
- Eldora UI — [site](https://www.eldoraui.site), [GitHub](https://github.com/karthikmudunuri/eldoraui). Fancy — [docs](https://www.fancycomponents.dev/docs/introduction), [GitHub](https://github.com/danielpetho/fancy). SmoothUI — [site](https://smoothui.dev), [GitHub](https://github.com/educlopez/smoothui). Hover.dev — [components](https://www.hover.dev/components), [pricing](https://www.hover.dev/pricing).
- beUI — [beui.dev](https://beui.dev). transitions.dev (built by Jakub Antalik) — [transitions.dev](https://transitions.dev). libraries.dev — [libraries.dev](https://libraries.dev). HorizonX — [horizonx.so](https://horizonx.so). Originkit tagline — [originkit.dev](https://originkit.dev); entry counts — local file `EXTENSION_GAP_ANALYSIS.md` (compiled 14 Nov 2026). uilabs (authored by Mariana Castilho, not Rauno Freiberg) — [uilabs.dev](https://www.uilabs.dev).

#### 1b. Engines, tools, primitives and asset platforms

| Name | What it is | Size / signal | Licence | Price | Relevance to INTRX |
|---|---|---|---|---|---|
| Motion (motion.dev) | animation library; 550 examples filterable by React, JavaScript, Vue, Svelte, Three.js | 35,707 stars; `motion` 37.2M/wk, `framer-motion` 68.5M/wk | MIT | Motion+ $399 one-time per developer: 550+ example sources, 110+ tutorials, Cursor, Ticker, AnimateNumber, Typewriter, ScrambleText, AnimateView, Carousel, splitText, Studio, AI Kit | has a vanilla JS API and JS examples |
| GSAP | animation engine + all formerly paid plugins | 31,406 stars; 7.96M/wk; v3.15.1 | "Standard no-charge" licence (not OSS) | free | vanilla, CDN-loadable |
| Sonner / Vaul (Emil Kowalski) | toast / drawer | 13,319 and 8,802 stars; 55.9M and 29.7M/wk | MIT | free | behaviour references (React only) |
| animations.dev | Emil Kowalski's paid course; enrolment closed until 2027 | — | course terms | price not shown | learning resource, not a library |
| Codrops | demo articles + GitHub repos | 354 public repos; 12 most recent all MIT | MIT per repo | free | vanilla JS + GSAP demos |
| Uiverse.io | community HTML/CSS/Tailwind elements | galaxy repo 15,351 stars; 3,000+ elements | MIT | free | CSS-only, near drop-in |
| CodePen | pens | — | public pens MIT; private pens unlicensed | — | vanilla |
| Paper Shaders | 30 zero-dependency canvas shaders (7 image filters, 3 logo animations, 20 effects) | 4,047 stars; vanilla pkg 1.65M/wk | Apache-2.0 | free | has a vanilla package |
| ShaderGradient | 3D gradient component | 3,280 stars; 53k/wk | MIT (README) | free | React/three based |
| Unicorn Studio | no-code WebGL scene editor, 90+ effects | — | SaaS terms | Free (non-commercial, 8 branded publishes); Legend $168/yr or $20/mo | not portable code |
| Spline | 3D design tool with web runtime | `@splinetool/runtime` 656k/wk | SaaS terms | free tier watermarked (secondary sources) | embeds only |
| Tailwind Plus / Catalyst | paid blocks, templates, UI kit | — | proprietary; no derivative UI libraries | paid | do not copy |
| Base UI | unstyled primitives | 11,516 stars | MIT | free | React only |
| React Aria (react-spectrum) | a11y primitives | 16,076 stars | Apache-2.0 | free | React only |
| HeroUI | component library | 31,331 stars | Apache-2.0 | free | React only |
| Park UI | Ark UI + Panda | 2,386 stars | MIT | free | multi-framework |
| daisyUI | CSS-only Tailwind components | 43,039 stars | MIT | free | CSS-only, vanilla-friendly |
| Lottie | lottie-web / dotlottie-web runtimes | 32,637 / 965 stars; 9.7M / 2.2M per wk | MIT runtimes; files under Lottie Simple License | free | runtime + assets |
| Rive | state-machine animation runtime | rive-wasm 1,039 stars; 1.45M/wk | MIT runtimes; community files CC BY | editor paid | runtime + assets |
| Framer Marketplace | Framer components/templates | — | per-creator terms | free and paid | not portable |
| AI Elements (Vercel) | AI chat/agent components | 2,537 stars | Apache-2.0 | free | being folded into shadcn/ui; repo says it is deprecated at the end of Nov 2026 |
| ElevenLabs UI | voice/audio components (orb, waveform, live-waveform, bar-visualizer, audio-player, scrub-bar, mic-selector, voice-picker, speech-input, transcript-viewer, shimmering-text, matrix) | 2,487 stars | MIT | free | voice UI reference |
| prompt-kit / assistant-ui | AI chat kits | 3,170 / 13,460 stars | MIT | free | AI UI reference |
| Kibo UI | shadcn-style composites | 3,992 stars | MIT | free | app UI reference |
| Vue Bits / Inspira UI | Vue ports | 4,680 / 5,126 stars | Commons Clause / MIT | free | shows multi-framework demand |

Sources: Motion — [GitHub](https://github.com/motiondivision/motion), [examples](https://motion.dev/examples), [Motion+](https://motion.dev/plus), [npm motion](https://api.npmjs.org/downloads/point/last-week/motion), [npm framer-motion](https://api.npmjs.org/downloads/point/last-week/framer-motion). GSAP — [GitHub](https://github.com/greensock/GSAP), [standard licence](https://gsap.com/community/standard-license/), [npm](https://api.npmjs.org/downloads/point/last-week/gsap). Sonner — [GitHub](https://github.com/emilkowalski/sonner), [npm](https://api.npmjs.org/downloads/point/last-week/sonner); Vaul — [GitHub](https://github.com/emilkowalski/vaul), [npm](https://api.npmjs.org/downloads/point/last-week/vaul). animations.dev — [site](https://animations.dev). Codrops — [GitHub org](https://github.com/orgs/codrops/repositories). Uiverse — [galaxy repo](https://github.com/uiverse-io/galaxy), [elements page](https://uiverse.io/elements) (via search summary). CodePen — [licensing doc](https://blog.codepen.io/documentation/licensing/). Paper Shaders — [site](https://shaders.paper.design), [GitHub](https://github.com/paper-design/shaders), [npm](https://api.npmjs.org/downloads/point/last-week/@paper-design/shaders). ShaderGradient — [GitHub](https://github.com/ruucm/shadergradient). Unicorn Studio — [pricing docs](https://www.unicorn.studio/docs/pricing/). Spline — [pricing](https://www.spline.design/pricing) (seen only through secondary summaries). Tailwind Plus — [licence](https://tailwindcss.com/plus/license), [Catalyst FAQ](https://tailwindcss.com/plus/templates/catalyst) (both via search summary). Base UI — [GitHub](https://github.com/mui/base-ui). React Aria — [GitHub](https://github.com/adobe/react-spectrum). HeroUI — [GitHub](https://github.com/heroui-inc/heroui). Park UI — [GitHub](https://github.com/chakra-ui/park-ui). daisyUI — [GitHub](https://github.com/saadeghi/daisyui). Lottie — [lottie-web](https://github.com/airbnb/lottie-web), [dotlottie-web](https://github.com/LottieFiles/dotlottie-web), [Lottie Simple License](https://lottiefiles.com/page/license). Rive — [rive-wasm](https://github.com/rive-app/rive-wasm), [marketplace docs](https://rive.app/docs/community/marketplace-overview). Framer — [community terms](https://framer.com/legal/community-terms). AI Elements — [GitHub README](https://github.com/vercel/ai-elements), [site](https://elements.ai-sdk.dev/). ElevenLabs UI — [GitHub](https://github.com/elevenlabs/ui). prompt-kit — [GitHub](https://github.com/ibelick/prompt-kit). assistant-ui — [GitHub](https://github.com/assistant-ui/assistant-ui). Kibo UI — [GitHub](https://github.com/shadcnblocks/kibo). Vue Bits — [GitHub](https://github.com/DavidHDev/vue-bits). Inspira UI — [GitHub](https://github.com/unovue/inspira-ui).

#### 1c. Demand signals
- React Bits (52.9k stars) has overtaken Magic UI (23.6k) by more than 2x; among animation-first libraries the star order is React Bits, Magic UI, coss ui 11.2k, Cult UI 7.7k, Motion Primitives 7.1k, Animate UI 5.1k, Fancy 3.3k, Kokonut 2.4k, Eldora 2.0k, SmoothUI 1.1k — GitHub API via the repo links above, e.g. [React Bits](https://github.com/DavidHDev/react-bits), [Magic UI](https://github.com/magicuidesign/magicui).
- 21st.dev's supply per category is a usable proxy for what people build and search: Buttons 2,043; Cards 1,780; Forms 1,522; Heroes 1,152; Inputs 949; Icons 851; Texts 663; Grids & Bento 620; Badges 605; Avatars 597; Toggles 532; Dropdowns 506; Calls to Action 501; Spinner Loaders 480; Navigation Menus 477; Images 428; Dashboards 400; Progress 375; Backgrounds 365; Dialogs 328; Features 318; Tables 313; Galleries 272; Date Pickers 250; AI Chats 248; Charts 246; Pricing Sections 216; FAQs 191; Testimonials 161 — [21st.dev](https://21st.dev/community/components).
- Weekly npm downloads for single-purpose interaction packages: recharts 64.4M, sonner 55.9M, react-day-picker 48.9M, cmdk 46.0M, vaul 29.7M, embla-carousel 28.2M, input-otp 26.2M, lottie-web 9.7M, canvas-confetti 8.7M, driver.js 3.7M, @number-flow/react 3.1M, lenis 2.4M, cobe 1.1M, ogl 1.0M — e.g. [sonner](https://api.npmjs.org/downloads/point/last-week/sonner), [cmdk](https://api.npmjs.org/downloads/point/last-week/cmdk), [input-otp](https://api.npmjs.org/downloads/point/last-week/input-otp), [driver.js](https://api.npmjs.org/downloads/point/last-week/driver.js), [cobe](https://api.npmjs.org/downloads/point/last-week/cobe).
- Third-party round-ups name React Bits as the default pick, Aceternity for dramatic landing pages and Magic UI as the polished free option, but several of those round-ups are published by vendors (Aceternity, React Bits Pro, 21st.dev) and their star counts are stale — [PkgPulse guide](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026), [Aceternity's own guide](https://ui.aceternity.com/guides/best-react-ui-components-2026).

### Inferences
- The free tier is "components"; money is made on **blocks/sections, templates and agent kits** sold once for $129–$399 (React Bits Pro, Aceternity, Magic UI Pro, Skiper, beUI, Motion+). INTRX's planned Pro tier of locked individual demos is unlike any of them.
- The newest growth areas visible across sites are (a) AI/agent UI (shadcn core, AI Elements, Kokonut's 27 `ai-*` components, Cult UI, beUI and transitions.dev each have an AI category), (b) shader backgrounds (React Bits has 65 backgrounds; Paper Shaders vanilla has 1.65M weekly downloads), and (c) "micro" tactile interactions (React Bits added a 34-item Micro category; Aceternity added paid "Interactions"; beUI filters by Hover/Press/Drag/Type/Sound, which is INTRX's own trigger model).
- npm downloads in 2026 are inflated by CI and coding agents; use them only as relative ranks.

### Gaps
- Could not read Motion Primitives' site, Skiper UI's licence, Originkit, or Animate UI's full component list; Animate UI and Originkit counts are missing.
- Rauno Freiberg's own work (rauno.me, Devouring Details) was not surveyed; uilabs.dev turned out to be a different author.
- Spline and Framer Marketplace terms were seen only through secondary summaries.
- Unicorn Studio's effect count conflicts between sources (75+ in a search summary, 90+ on the docs page).

## 2. What INTRX has today, and the prioritised GAP LIST (top 40)

### Takeaway
INTRX is already deeper than any competitor on effects, cursor, raster/ASCII, physics, skeuomorphic controls and agent UI, and a 14 Nov 2026 pass already closed 91 gaps against ten reference sites. What remains missing is structural: there are no page sections at all (hero, pricing, FAQ, footer, auth), thin shader/pattern backgrounds, no device mockups, and no demos using the modern CSS platform features; the AI set lacks the newer agent-shell pieces (branches, artifact panel, queue/checkpoint, voice kit, standalone model selector).

### Cited Findings

#### 2a. INTRX's current catalog
- 520 items, 26 categories in 6 groups: Interface (Buttons & Micro 30, Forms & Inputs 24, Navigation & Menus 19, Layout & UI 47, Loaders & Progress 14, Galleries & Sliders 18); Motion (Scroll 25, Text & Type 29, SVG & Line 10, 3D & Perspective 15); Pointer & Physics (Cursor 27, Physics 10, Liquid & Organic 10, Play & Easter Eggs 11); Data & AI (Agent & AI UI 24, Data & Numbers 15, Maps & Geo 6, FUI & Terminal 10); Visual FX (Image & WebGL 25, Raster & Glitch 31, Ambient 18, Skeuomorph 23, Sound & Haptics 7); Collections (Interactive Showcase 16, DRAMS 52, Framer Collection 4) — local `registry/index.json` and `registry/categories.json`.
- Trigger distribution: hover 166, press 150, drag 93, ambient 56, scroll 43, type 12. All 520 are `tier: free` and every `libs` array is empty — local `registry/index.json`.
- A previous analysis (14 Nov 2026) compared transitions.dev, beUI, bencho, Aceternity, ReverseUI, BoardUI, Originkit, HorizonX, ObsidianUI and Astryx, and added 91 extension components to reach 520 — local `EXTENSION_GAP_ANALYSIS.md`.
- The 16 "Interactive Showcase" items are documented as original vanilla interpretations of React Bits (10), Aceternity (3), Paper Shaders (1), Magic UI (1) and Motion (1) references — local `SHOWCASE_SOURCES.md`.
- INTRX source contains no use of `animation-timeline`, View Transitions, `@starting-style`, `interpolate-size`, anchor positioning, `@property` or WebGPU; `linear()` appears in one file; WebGL contexts appear in 34 files; `backdrop-filter` in 139 — my grep of local `js/*.js` and `css/*.css` on 28 Nov 2026.

#### 2b. Coverage checks behind the gap list (keyword search over title + description + tags of all 520 items)
- Zero hits: faq, footer, sign in / login / sign up, device mock / iphone / safari / browser window, pull to refresh, credit card, branch, artifact / web preview, video player, world map / dotted map, icon cloud / tag sphere, sparkle, progressive blur, god rays / light rays, morphing text, view transition, silk, spline / gltf, promise / loading toast — local `registry/index.json`.
- Partly covered inside an existing demo: Prompt Composer's description lists attachment chips and a keyboard model menu, so attachments are covered and a model picker exists only as part of the composer; no AI demo mentions a queue, checkpoint, transcript or suggestion chips — local `registry/index.json`.
- One or two weak hits: pricing (2, both text demos), testimonial (1), bento (1), grid/dot pattern (1), combobox/autocomplete (1, the AI ghost autocomplete), chrome/metallic (1, unrelated), waveform (1, FUI oscilloscope), empty state (1), popover (1), confetti (1), banner (1, unrelated) — local `registry/index.json`.
- Already covered and therefore **not** gaps: border beam, shimmer, logo marquee, dock, globe (3), command palette, toast stack, bottom sheet, OTP, date range, file tree, terminal, kanban, timeline, charts, carousels, meteors, aurora, vortex, lamp, background boxes, 3D pin/marquee, sticky scroll reveal, hero parallax, evervault card, wobble card, lanyard, tear ticket, peel sticker, dynamic notch, voice orb, prompt composer, tool approval, citations, diff review, context meter, activity feed — local `registry/index.json`.

#### 2c. Top-40 additions, grouped into proposed categories

Priority: P1 = high demand signal, strong fit, low/medium effort; P2 = good fit, medium effort; P3 = niche or high effort. "Ref" is the best permissively licensed implementation I verified exists; restricted libraries are named only as "seen in".

**Sections (new top-level area; INTRX has 0)**

| # | Addition | P | Demand / seen in | INTRX today | Best reference (licence) |
|---|---|---|---|---|---|
| 1 | Pricing section with monthly/yearly toggle and rolling prices | P1 | 21st: 216 pricing sections; Aceternity, Magic UI Pro, SmoothUI, Hover | none | SmoothUI Blocks → Pricing, [smoothui.dev](https://smoothui.dev) (MIT) |
| 2 | Hero kit (3–5 variants: headline reveal + media, shader hero, video hero) | P1 | 21st: 1,152 heroes; every Pro tier | effects only, no section | Cult UI Landing Pages (Hero Dithering, Hero Liquid Metal, Bg Media Hero), [cult-ui.com/docs](https://www.cult-ui.com/docs) (MIT) |
| 3 | Testimonial wall / tweet-card marquee | P1 | 21st: 161; Magic UI, Cult UI, Aceternity | 1 (Animated Testimonials) | Magic UI `tweet-card.tsx` + `marquee.tsx`, [repo](https://github.com/magicuidesign/magicui/tree/main/apps/www/registry/magicui) (MIT) |
| 4 | Bento feature grid with animated cells | P1 | 21st: 620 "Grids & Bento"; Magic UI, Aceternity, React Bits | 1 (Bento Spotlight) | Magic UI `bento-grid.tsx`, same repo (MIT) |
| 5 | Logo cloud with in-place swapping logos | P1 | Cult UI, Aceternity blocks, SmoothUI | marquee only | Cult UI Logo Carousel, [cult-ui.com/docs](https://www.cult-ui.com/docs) (MIT) |
| 6 | FAQ + CTA + sticky-reveal footer trio | P1 | 21st: FAQs 191, CTAs 501, Footers 65 | accordion only | Fancy Sticky Footer, [fancycomponents.dev](https://www.fancycomponents.dev/docs/introduction) (MIT) |
| 7 | Auth card (sign in, social buttons, OTP step) | P1 | 21st: Sign Ins 103; Aceternity "Login and Signup" (New) | none | Eldora UI Clerk OTP, [eldoraui.site](https://www.eldoraui.site) (MIT) |
| 8 | Device mockups (browser, iPhone, Android) to frame other demos | P1 | Magic UI Device Mocks; Cult UI Media & Mockups; Aceternity Macbook Scroll | none | Magic UI `safari.tsx`, `iphone.tsx`, `android.tsx`, [repo](https://github.com/magicuidesign/magicui/tree/main/apps/www/registry/magicui) (MIT) |
| 9 | Announcement / sticky banner | P3 | 21st: Announcements 71; Aceternity Sticky Banner | none | original build (pattern only) |

**Backgrounds and shaders**

| # | Addition | P | Demand / seen in | INTRX today | Best reference (licence) |
|---|---|---|---|---|---|
| 10 | Grid and dot pattern family (retro grid, flickering grid, animated grid, interactive grid, dot, hexagon, striped) | P1 | Magic UI has 13 backgrounds, Aceternity 32, 21st 365 | 1 weak hit | Magic UI `retro-grid.tsx`, `flickering-grid.tsx`, `animated-grid-pattern.tsx`, `dot-pattern.tsx`, [repo](https://github.com/magicuidesign/magicui/tree/main/apps/www/registry/magicui) (MIT) |
| 11 | Shader gradient set (mesh, grain gradient, warp, swirl, smoke ring, voronoi, neuro noise) | P1 | Paper Shaders 1.65M/wk; React Bits 65 backgrounds | Mesh Drift, Plasma Orb only | [Paper Shaders](https://shaders.paper.design) vanilla package (Apache-2.0) |
| 12 | Liquid metal / chrome logo | P1 | Paper, libraries.dev, Cult UI, React Bits | none | Paper Shaders "liquid metal" (Apache-2.0) |
| 13 | Light rays / god rays | P1 | Magic UI (New), Paper, React Bits | Lamp Glow only | Magic UI `light-rays.tsx` (MIT); Paper "god rays" (Apache-2.0) |
| 14 | Progressive blur edge | P1 | Magic UI, Motion Primitives, Cult UI Edge Blur, React Bits | none | Motion Primitives `progressive-blur.tsx`, [repo](https://github.com/ibelick/motion-primitives/tree/main/components/core) (MIT) |
| 15 | Fluid-simulation cursor / background | P2 | React Bits Splash Cursor, Liquid Ether | 2D ripple only | [PavelDoGreat/WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) (MIT, 16,955 stars) |
| 16 | Silk / drape fabric flow | P2 | React Bits Silk; Kokonut | none | Kokonut `drape-background.tsx`, [repo](https://github.com/kokonut-labs/kokonutui/tree/main/components/kokonutui) (MIT) |
| 17 | Fluted glass, paper texture, halftone-CMYK image filters | P2 | Paper image filters; Cult UI Fluted Glass | halftone exists; fluted glass none | Paper Shaders image filters (Apache-2.0) |
| 18 | Sparkles / glowing-star field | P3 | Aceternity, Magic UI Sparkles Text | none | Magic UI `sparkles-text.tsx` (MIT) |

**Text**

| # | Addition | P | Demand / seen in | INTRX today | Best reference (licence) |
|---|---|---|---|---|---|
| 19 | Morphing text (blur/threshold morph between words) | P2 | Magic UI; Motion Primitives text-morph | none | Magic UI `morphing-text.tsx` (MIT) |
| 20 | Text or marquee along an SVG path | P2 | Fancy; React Bits Curved Loop | circular badge only | Fancy Text Along Path / Marquee Along SVG Path, [fancycomponents.dev](https://www.fancycomponents.dev/docs/introduction) (MIT) |
| 21 | Shiny / gradient / aurora text | P2 | Magic UI, Motion Primitives, React Bits | status shimmer only | Magic UI `animated-shiny-text.tsx`, `aurora-text.tsx`; Motion Primitives `text-shimmer.tsx` (MIT) |
| 22 | Media-between-text headline (inline media expanding inside a headline) | P2 | Fancy | none | Fancy Media Between Text (MIT) |

**Components**

| # | Addition | P | Demand / seen in | INTRX today | Best reference (licence) |
|---|---|---|---|---|---|
| 23 | Animated beam (integration hub: beams travelling between nodes) | P1 | Magic UI flagship | none specific | Magic UI `animated-beam.tsx` (MIT) |
| 24 | Combobox / autocomplete and single-date calendar | P1 | react-day-picker 48.9M/wk, cmdk 46.0M/wk; 21st Date Pickers 250 | date range only | shadcn Combobox, Calendar, Date Picker, [docs](https://ui.shadcn.com/docs/components) (MIT) |
| 25 | Spotlight onboarding tour (coach marks) | P1 | driver.js 3.7M/wk; Cult UI Onboarding & Flows | checklist only | [driver.js](https://github.com/nilbuild/driver.js) (MIT, vanilla) |
| 26 | Multi-view morphing drawer (Family-style tray) | P1 | Cult UI Family Drawer; vaul 29.7M/wk | single bottom sheet | Cult UI Family Drawer (MIT); [Vaul](https://github.com/emilkowalski/vaul) (MIT) |
| 27 | Icon cloud / tag sphere | P2 | Magic UI | none | Magic UI `icon-cloud.tsx` (MIT) |
| 28 | Dotted world map with arcs | P2 | Magic UI Dotted Map (New), Aceternity World Map, 21st Maps 51 | globes only | Magic UI `dotted-map.tsx` (MIT) |
| 29 | Mobile gesture set: swipe-action row, pull to refresh, story viewer | P2 | React Bits Micro (Swipe Row, Swipe Toast), beUI React Native | none | original build; ideas only from restricted sources |
| 30 | Credit-card field with flipping card | P2 | Kokonut; common on Uiverse/CodePen | none | Kokonut `card-field.tsx`, [repo](https://github.com/kokonut-labs/kokonutui/tree/main/components/kokonutui) (MIT) |
| 31 | Hover video player and hero video dialog | P2 | Cult UI, Magic UI; 21st Videos 162 | none | Magic UI `hero-video-dialog.tsx` (MIT) |
| 32 | Promise toast (loading → success/error) with swipe dismiss | P2 | sonner 55.9M/wk; Kokonut promise-toast | Toast Stack covers stacking, spread and dismiss; its description mentions no loading/promise state | [Sonner](https://github.com/emilkowalski/sonner) behaviour (MIT) |
| 33 | Page-transition pack (curtain, columns, pixel, clip, seam) | P2 | Motion examples list 25 page transitions; Codrops | 1 | Codrops [SeamTransitions](https://github.com/codrops/SeamTransitions) (MIT) |

**AI and voice**

| # | Addition | P | Demand / seen in | INTRX today | Best reference (licence) |
|---|---|---|---|---|---|
| 34 | Standalone model selector (provider groups, capability badges, search) | P2 | AI Elements, Kokonut | only a keyboard model menu inside Prompt Composer | Kokonut `ai-model-selector.tsx` (MIT); AI Elements Model Selector (Apache-2.0) |
| 35 | Conversation branches / response versions | P1 | Kokonut | none | Kokonut `ai-branches.tsx` (MIT) |
| 36 | Artifact / web-preview side panel | P1 | AI Elements Artifact, Web Preview, JSX Preview, Sandbox | none | [AI Elements](https://elements.ai-sdk.dev/) (Apache-2.0) |
| 37 | Message queue and checkpoint/restore | P1 | AI Elements Queue, Checkpoint; Kokonut | none | Kokonut `ai-message-queue.tsx` (MIT) |
| 38 | Voice kit: live waveform, bar visualizer, mic selector, voice picker, transcript viewer, audio player with scrub bar | P1 | ElevenLabs UI; AI Elements Voice; libraries.dev | Voice Orb only | [ElevenLabs UI](https://github.com/elevenlabs/ui) (MIT) |
| 39 | Suggestion chips and agent questionnaire | P2 | AI Elements Suggestion, Question; shadcn Questionnaire | none found | shadcn Questionnaire (MIT) |
| 40 | Generative-UI cards (agentic checkout, order status, schedule, polls) plus memory / connector / inline-edit / redaction panels | P2 | Kokonut; Cult UI Generative UI | none | Kokonut `ai-checkout.tsx`, `ai-memory.tsx`, `ai-connect.tsx`, `ai-inline-edit.tsx`, `ai-redact.tsx` (MIT) |

Sources for the reference columns: Magic UI file names — [registry folder](https://github.com/magicuidesign/magicui/tree/main/apps/www/registry/magicui); Motion Primitives — [components/core](https://github.com/ibelick/motion-primitives/tree/main/components/core); Kokonut — [components folder](https://github.com/kokonut-labs/kokonutui/tree/main/components/kokonutui); Cult UI sidebar — [docs](https://www.cult-ui.com/docs); Fancy sidebar — [docs](https://www.fancycomponents.dev/docs/introduction); Paper shader names — [shaders.paper.design](https://shaders.paper.design); AI Elements component list — [elements.ai-sdk.dev](https://elements.ai-sdk.dev/); ElevenLabs component files — [repo](https://github.com/elevenlabs/ui); Aceternity names — [components](https://ui.aceternity.com/components); React Bits names — [reactbits.dev](https://reactbits.dev/get-started/index); Motion page-transition count — [motion.dev/examples](https://motion.dev/examples).

### Inferences
- Items 1–8 are the cheapest way to change how complete INTRX feels: they are compositions of interactions INTRX already owns (accordion, marquee, number roll, reveal), so most of the work is layout and copy, not new motion.
- Items 10–14 can share one "Backgrounds" area and, if a dependency is allowed, items 11, 12, 13 and 17 could come from a single Paper Shaders import rather than four hand-written shaders.
- A "runner-up" list worth keeping: electric/turbulent border, hyperspeed/galaxy/lightning hero backdrops, expandable toolbar (Motion Primitives `toolbar-expandable.tsx`), animated empty states, uptime bars, receipt printer, seat map, amount pad, code test-results / stack-trace cards, text 3D flip, variable-font "pressure" text.
- React Bits is the single largest source of ideas INTRX lacks (65 backgrounds, 34 micro, 3D/WebGL galleries such as dome gallery and infinite menu), but its licence makes it an ideas-only source (see section 4).

### Gaps
- Individual doc-page URLs for the references were not each opened; file names were verified in the repositories, and only Magic UI's `/docs/components/<slug>` pattern was confirmed on one page.
- I did not open INTRX demo source to confirm sub-features (for example whether Toast Stack already has promise states, or whether Prompt Composer already has attachment chips).
- No quantitative popularity data per component exists for Aceternity, Magic UI or React Bits (no public "most copied" lists were found).

## 3. Emerging 2026 patterns worth adding

### Takeaway
The clearest opening is a "modern CSS / zero-JS" strand: scroll-driven animations, View Transitions and anchor positioning are 2026 interoperability priorities and INTRX currently ships no demo using any of them. Liquid-glass materials, voice/agent UI and shader hero backgrounds are the visible stylistic trends.

### Cited Findings
- Interop 2026 lists Anchor Positioning, Scroll-driven Animations and View Transitions among its focus areas — [WebKit: Announcing Interop 2026](https://webkit.org/blog/17818/announcing-interop-2026).
- Firefox 147 shipped CSS anchor positioning and view-transition types (Dec 2025 platform digest) — [web.dev](https://web.dev/blog/web-platform-12-2025?hl=en).
- `interpolate-size` remains Chromium-only (Chrome 129+; Firefox and Safari unsupported in current listings) — [caniuse](https://caniuse.com/mdn-css_properties_interpolate-size).
- `corner-shape` (squircles etc.) is Chromium-only from Chrome 139 — [caniuse](https://caniuse.com/mdn-css_properties_corner-shape).
- `sibling-index()` is reported as shipping in all three engines (Chrome 138, Firefox 154, Safari 26.2) by a secondary article — [Interop 2027 proposals article](https://www.buildmvpfast.com/blog/interop-2027-css-proposals-border-shape-function-if-browser-support-2026).
- Liquid glass is now a catalogue category: Aceternity lists "Liquid Glass" with a New badge, React Bits has Fluid Glass and Glass Surface, Kokonut has `liquid-glass-card`, and the shadcn directory has @liquid-glass, @glass-ui, @glasscn and @glassyui registries — [Aceternity](https://ui.aceternity.com/components), [React Bits](https://reactbits.dev/get-started/index), [Kokonut repo](https://github.com/kokonut-labs/kokonutui/tree/main/components/kokonutui), [registries.json](https://ui.shadcn.com/r/registries.json).
- View-transition theme toggling is now a stock component (Magic UI "Animated Theme Toggler", New) and Motion sells AnimateView in Motion+ — [Magic UI](https://magicui.design/docs/components/marquee), [Motion+](https://motion.dev/plus).
- AI components moved into the mainstream primitive set: shadcn/ui's component list now includes Message, Bubble, Attachment, Marker, Questionnaire and Trace, and Vercel's AI Elements is being folded into shadcn/ui — [shadcn components](https://ui.shadcn.com/docs/components), [AI Elements README](https://github.com/vercel/ai-elements).
- AI Elements groups agent UI as Chatbot (19 parts incl. Chain of Thought, Checkpoint, Plan, Queue, Reasoning, Sources, Task, Tool), Code (15 incl. Artifact, Sandbox, Terminal, Test Results, Stack Trace, Web Preview), Voice (6) and Workflow (7) — [AI Elements](https://elements.ai-sdk.dev/).
- Motion's example gallery publishes a letter-grade "MotionScore" filter (S to F) and platform filters including Three.js — [motion.dev/examples](https://motion.dev/examples).
- Agent-facing packaging is itself a pattern: transitions.dev sells a Motion Skill and a Motion Agent that scores a codebase's motion 0–100; beUI ships an MCP server and Agent Skill; SmoothUI's maker ships a tool with anti-slop detection for AI-generated UI — [transitions.dev](https://transitions.dev), [beui.dev](https://beui.dev), [smoothui.dev](https://smoothui.dev).
- Sound is appearing as a first-class category (beUI "Sounds"; React Bits Sound Lab named in its licence) — [beui.dev](https://beui.dev), [React Bits LICENSE](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md).
- INTRX already has 7 Sound & Haptics demos, a Liquid Glass Lens and a Voice Orb — local `registry/index.json`.

### Inferences
- Suggested new demos, each small: (1) scroll-driven reading progress / reveal / sticky-header shrink with `animation-timeline`; (2) View Transition theme toggle (circular reveal), list→detail shared element, and cross-document `@view-transition`; (3) zero-JS popover/tooltip/menu using the Popover API + anchor positioning + `@starting-style`; (4) `interpolate-size` accordion with a JS fallback; (5) `linear()` spring easing gallery (INTRX already computes springs in JS); (6) squircle `corner-shape` cards with fallback; (7) `sibling-index()` staggers.
- Because INTRX is framework-free, it can credibly own "the platform-native way to do X" — a position React libraries cannot take. Each such demo needs a stated support matrix and a fallback because three of these features are still Chromium-only.
- Variable-font animation (weight/width responding to pointer or scroll) is a cheap extension of the existing Proximity Type demo; `font-variation-settings` is already used in 25 INTRX source files.

### Gaps
- I did not confirm from a primary source (MDN / web-features) that scroll-driven animations and same-document View Transitions are Baseline in all engines as of Nov 2026; one secondary round-up says so. Verify before labelling demos "works everywhere".
- WebGPU availability across browsers in late 2026 was not checked; no surveyed library advertises WebGPU components except Motion's platform filter.

## 4. Licence / reuse matrix (what INTRX may port, and on what terms)

### Takeaway
Safe to port with notices: Magic UI, Motion Primitives, Cult UI, Kokonut UI, Fancy, Eldora, SmoothUI, coss ui, shadcn/ui, ElevenLabs UI, Uiverse, Codrops repos and public CodePens (all MIT), plus Paper Shaders and AI Elements (Apache-2.0). Not portable into a redistributed catalog: React Bits and Vue Bits (their Commons Clause names ports explicitly), Animate UI, Aceternity, Skiper, Hover.dev, Tailwind Plus, Motion+ FX, 21st.dev marketplace content and every paid tier.

### Cited Findings

#### 4a. Matrix (all checked 28 Nov 2026)

| Source | Licence | Class | What the terms say (paraphrase) | May INTRX port code? | Licence URL |
|---|---|---|---|---|---|
| Magic UI (free) | MIT, © Magic UI | A | standard MIT | Yes, keep notice | [LICENSE.md](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md) |
| Motion Primitives | MIT | A | standard | Yes | [repo](https://github.com/ibelick/motion-primitives) |
| Cult UI | MIT | A | standard | Yes | [repo](https://github.com/nolly-studio/cult-ui) |
| Kokonut UI (free) | MIT | A | site footer and repo both say MIT | Yes | [repo](https://github.com/kokonut-labs/kokonutui) |
| Fancy Components | MIT | A | standard | Yes | [repo](https://github.com/danielpetho/fancy) |
| Eldora UI | MIT | A | standard | Yes | [repo](https://github.com/karthikmudunuri/eldoraui) |
| SmoothUI | MIT | A | standard | Yes | [repo](https://github.com/educlopez/smoothui) |
| coss ui / Origin UI | MIT | A | standard | Yes | [repo](https://github.com/cosscom/ui) |
| shadcn/ui | MIT | A | standard | Yes | [repo](https://github.com/shadcn-ui/ui) |
| ElevenLabs UI, prompt-kit, assistant-ui, Kibo UI, Inspira UI | MIT | A | standard | Yes | [ElevenLabs UI](https://github.com/elevenlabs/ui), [prompt-kit](https://github.com/ibelick/prompt-kit), [assistant-ui](https://github.com/assistant-ui/assistant-ui), [Kibo](https://github.com/shadcnblocks/kibo), [Inspira](https://github.com/unovue/inspira-ui) |
| Sonner, Vaul, cmdk | MIT | A | standard | Yes (React; behaviour reference) | [Sonner](https://github.com/emilkowalski/sonner), [Vaul](https://github.com/emilkowalski/vaul), [cmdk](https://github.com/dip/cmdk) |
| Uiverse.io elements | MIT, © Uiverse.io | A | site states all elements are MIT | Yes; credit the element author | [galaxy LICENSE](https://github.com/uiverse-io/galaxy/blob/main/LICENSE) |
| CodePen public pens | MIT (template names the pen author and URL) | A | public pens MIT; private pens carry no licence | Yes for public pens; keep author + pen URL | [CodePen licensing](https://blog.codepen.io/documentation/licensing/) |
| Codrops demo repos | MIT per repo (12 newest checked) | A, per repo | recent READMEs list third-party credits (GSAP, fonts, images) separately | Yes for code; check each repo; images/fonts are separate | [Codrops repos](https://github.com/orgs/codrops/repositories) |
| beUI public library | MIT (site statement) | A, unverified at file level | copies must keep the notice | Likely yes; confirm the repo LICENSE first | [beui.dev](https://beui.dev) |
| libraries.dev free set | MIT for five libraries (site FAQ) | A / C mixed | remaining libraries and the Skill are paid | Only the five MIT ones, after reading their licence files | [libraries.dev](https://libraries.dev) |
| Paper Shaders | Apache-2.0, © Lost Coast Labs | A (Apache) | commercial use without visible attribution; if redistributed inside another library or tool, keep LICENSE and NOTICE; visible credit appreciated | Yes; ship LICENSE + NOTICE, state changes | [README licence section](https://github.com/paper-design/shaders) |
| AI Elements | Apache-2.0, © Vercel | A (Apache) | standard | Yes with Apache conditions | [LICENSE](https://github.com/vercel/ai-elements/blob/main/LICENSE) |
| React Aria, HeroUI | Apache-2.0 | A (Apache) | standard | Yes with Apache conditions | [react-spectrum](https://github.com/adobe/react-spectrum), [HeroUI](https://github.com/heroui-inc/heroui) |
| Motion (library, most examples) | MIT | A | Motion+ page says most APIs and examples are MIT | Library yes; examples only where marked MIT | [repo](https://github.com/motiondivision/motion), [Motion+](https://motion.dev/plus) |
| OGL | Unlicense | A (public domain) | no conditions | Yes | [repo](https://github.com/oframe/ogl) |
| WebGL-Fluid-Simulation | MIT | A | standard | Yes | [repo](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) |
| **React Bits** | MIT + Commons Clause v1.0, © 2026 David Haz | **B** | grant is limited to use inside an application, website or product; the clause forbids selling, sublicensing or redistributing the components "whether alone, in a bundle, or as a ported version" (React Bits LICENSE.md); also covers its tools and sound library, and forbids selling exports as packs | **No.** A catalog that republishes ported components is the exact prohibited case, free or paid | [LICENSE.md](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md) |
| **Vue Bits** | MIT + Commons Clause v1.0 | **B** | same, and names templates as well as bundles and ports | No | [LICENSE.md](https://github.com/DavidHDev/vue-bits/blob/main/LICENSE.md) |
| **Animate UI** | MIT + Commons Clause, © 2025 Elliot Sutton | **B** | forbids selling or redistributing the components in their original form, alone or bundled | No verbatim copies; a substantial rewrite is a grey area — avoid | [LICENSE.md](https://github.com/imskyleen/animate-ui/blob/main/LICENSE.md) |
| **Aceternity UI (free)** | Proprietary, © Aceternity Labs LLC | **B** | FAQ: unlimited personal and commercial projects, but no reselling or redistributing the components as a competing template or component library; Terms: no republishing, reproducing or redistributing site material; Licence page: no redistribution of source, no marketplace sale | No | [home FAQ](https://ui.aceternity.com/), [terms](https://ui.aceternity.com/terms), [licence](https://ui.aceternity.com/licence) |
| **Skiper UI** | No licence file found | **B** | docs reportedly require attribution on the free tier; nothing grants redistribution | No (unlicensed = all rights reserved) | [skiper-ui.com](https://skiper-ui.com) |
| **21st.dev marketplace** | Platform terms + per-component licences | **B** | content belongs to authors and 21st Labs; no redistributing, selling or licensing marketplace content without authorisation; no scraping; forks must keep licence and visible credit | Not from the marketplace; only from an author's own repo under that repo's licence | [terms](https://21st.dev/terms) |
| **GSAP** | Standard "no charge" licence (Webflow), last modified 30 May 2025 | **B (usable as a dependency)** | free including commercial use and all plugins; prohibited in tools that let users build visual animations without code and that compete with Webflow's animation features; do not remove notices; all rights stay with Webflow; AI-generated code is not a prohibited use | Use as a CDN dependency: yes. Do not present GSAP as INTRX's own code; do not build a no-code animation builder on it | [standard licence](https://gsap.com/community/standard-license/) |
| Motion+ (FX and premium examples) | Motion+ Licence | **C** | FX source cannot be redistributed, ported or used to make another implementation; reselling Motion+ capabilities needs a Builder's Licence | No | [Motion+](https://motion.dev/plus) |
| Aceternity paid, Magic UI Pro, React Bits Pro, Kokonut Pro, Cult UI paid blocks, beUI Pro, Skiper Premium | Paid proprietary | **C** | e.g. Magic UI Pro: commercial use allowed, reselling code not allowed | No | [Magic UI Pro](https://pro.magicui.design), [React Bits Pro](https://pro.reactbits.dev), [Aceternity pricing](https://ui.aceternity.com/pricing) |
| Hover.dev | All rights reserved | **C** | footer: components may not be redistributed without written consent | No | [hover.dev/pricing](https://www.hover.dev/pricing) |
| Tailwind Plus / Catalyst | Proprietary | **C** | no derivative themes, UI kits or page builders; building a UI library from it, free or paid, is listed as prohibited | No | [licence](https://tailwindcss.com/plus/license) |
| Unicorn Studio, Spline, HorizonX, Framer Marketplace, transitions.dev Pro, animations.dev, uilabs | SaaS / proprietary / unlicensed | **C** | subscriptions or per-creator terms; uilabs shows no licence | No | [Unicorn](https://www.unicorn.studio/docs/pricing/), [HorizonX](https://horizonx.so), [Framer terms](https://framer.com/legal/community-terms), [uilabs](https://www.uilabs.dev) |

Class key: A = permissive (port freely with the required notices); B = source-available or free-to-use but with a no-redistribution / no-competing-library condition; C = proprietary or paid.

#### 4b. Assets
- Lucide: ISC, with the Feather-derived icons under MIT (© Cole Bemis) — [Lucide LICENSE](https://github.com/lucide-icons/lucide/blob/main/LICENSE). Tabler Icons: MIT — [repo](https://github.com/tabler/tabler-icons). Phosphor: MIT — [repo](https://github.com/phosphor-icons/core).
- Unsplash licence: free commercial use without permission; photos may not be sold without significant modification and may not be compiled to replicate a similar or competing service — [Unsplash licence](https://unsplash.com/license).
- Lottie Simple License: files may be used, modified and distributed commercially without attribution, modified files stay under the same licence, and collecting files to build a similar or competing service is not allowed — [LottieFiles licence](https://lottiefiles.com/page/license).
- Rive: runtimes MIT; community/marketplace files CC BY — [Rive marketplace docs](https://rive.app/docs/community/marketplace-overview).
- INTRX already records photo provenance and font licences (Geist, Inter, Manrope, Newsreader, Allura under SIL OFL 1.1; Unsplash photos credited per component) — local `docs/license-credits.md`.

#### 4c. INTRX's own position
- INTRX is MIT, © 2026 INTRX contributors — local `LICENSE`.
- The repository's standing rules say there are no runtime dependencies in the site and that code or assets are never copied from reference sites — local `AGENTS.md`. The owner's new decision to port third-party code contradicts both rules, so they need an explicit owner amendment before any port lands.
- Pro scaffolding exists but is disabled; all 520 items are free — local `docs/pro-scaffolding.md`.

### Inferences
- **What INTRX must ship when porting class-A code** (my reading of MIT / ISC / Apache-2.0 conditions):
  1. A root `THIRD_PARTY_NOTICES.md` listing, per upstream project: name, URL, copyright line, full licence text, and which INTRX demo ids derive from it.
  2. A per-demo `credits` array in the registry item, e.g. `{ name, url, license, copyright, changes }`, rendered on the detail page.
  3. A licence comment at the top of the copyable/exported single-file HTML for that demo. This matters most: users copy one file, and MIT requires the notice to travel with every copy or substantial part of the code. INTRX already preserves licence comments for photos in exports, so the mechanism exists.
  4. For Apache-2.0 sources: include the licence, carry over any NOTICE file, and mark the file as modified.
  5. For CodePen/Uiverse sources: the individual author's name and the original URL in the notice.
- **Pro tier interaction:** MIT and Apache-2.0 code may sit inside a paid tier provided notices remain. Anything in class B cannot be sold, and for React Bits cannot even be given away as part of a catalog.
- **"Inspired by" versus copying:** ideas, effects and interaction behaviours are not protected by copyright; source code, shader text, distinctive assets, demo copy and names/branding are. A clean re-implementation written from the visual behaviour (not from reading the source) is the normal way to cover a class-B effect. Risks rise when the implementer has the source open, when structure/variable names/magic numbers carry over, or when the product name is reused. Practical rule for agents: for class-B/C references, give the agent a behavioural spec and screenshots only, never the source file, and use a different title.
- **Existing exposure to review:** ten of INTRX's sixteen Showcase demos cite React Bits pages as their reference (Dot Grid, Threads, Ballpit, Ripple Grid, Magnet Lines, Pixel Trail, Ribbons, Circular Gallery, Card Swap, Elastic Slider — local `SHOWCASE_SOURCES.md`). They are documented as independent vanilla interpretations; given React Bits' 2026 licence wording about ported versions, it is worth confirming none was written from React Bits source and keeping that provenance note.
- **GSAP:** fine as a CDN-loaded dependency for a code catalog. Two cautions: load it from the CDN rather than inlining it into exported HTML (the licence grants use and reproduction but reserves all rights and says nothing explicit about sublicensing), and if INTRX ever adds a visual, no-code animation tuner/exporter, re-read the prohibited-uses clause first.
- **Order of preference for sourcing:** Magic UI → Motion Primitives → Cult UI → Kokonut → Fancy → Paper Shaders → Codrops/Uiverse/CodePen → clean-room for anything only found in React Bits/Aceternity.

### Gaps
- Codrops' central licensing page could not be read (bot protection). Older Codrops demos reportedly carried extra wording against republishing or redistributing a demo unchanged (search summary of older repo READMEs); check each repo's LICENSE and README before porting, and never reuse demo images.
- Skiper UI's actual licence text, Spline's export terms, Framer Marketplace component terms and the Motion+ Licence full text were not read first-hand.
- beUI's and libraries.dev's MIT claims come from their marketing pages, not from licence files.
- This is a research summary, not legal advice; a lawyer should confirm the Commons Clause reading and the notice plan before a paid tier launches.

## 5. Runtime dependencies: which small CDN libraries would speed up quality

### Takeaway
Three permissively licensed, bundler-free libraries would remove most hand-rolling: Lenis (6 kB) for smooth scroll, Motion's vanilla API or GSAP core (27–28 kB) for timelines/springs/text splitting, and OGL or Paper Shaders for WebGL. All load from jsDelivr as ES modules or globals; only GSAP is not open-source licensed.

### Cited Findings

| Library (version) | min + gzip | Licence | No-bundler use | Notes |
|---|---|---|---|---|
| Lenis 1.3.29 | 6.0 kB (6.1 kB measured on jsDelivr) | MIT | `lenis@1/dist/lenis.min.js` global, 200 OK | 17.5k stars, 2.4M/wk |
| GSAP core 3.15.1 | 26.8 kB (28.5 kB measured) | Standard no-charge licence | `gsap@3/dist/gsap.min.js` global | SplitText 3.6 kB and MorphSVG 9.5 kB gzip measured as separate files |
| Motion 14.14.0 | whole package 62.8 kB; global build `dist/motion.js` 64.7 kB measured; docs state a 3.2 kB mini `animate()` | MIT | ESM `motion@latest/+esm` or global `Motion`; docs advise pinning a version | vanilla `animate`, `scroll`, `stagger` |
| OGL 1.0.11 | 33.4 kB full (README: core 8 kB, math 6 kB, extras 15 kB) | Unlicense | ESM `ogl@1/+esm`, 200 OK | zero deps |
| three 0.187.0 | 181.3 kB | MIT | ESM via import map | too heavy for thumbnails |
| @paper-design/shaders 0.0.82 | 62.8 kB whole package (64.4 kB measured) | Apache-2.0 | ESM `+esm`, 200 OK | 0.0.x versions break; pin exactly |
| cobe 2.0.1 | 5.8 kB | MIT | ESM `+esm` | WebGL globe |
| number-flow 0.6.2 | 6.0 kB measured | MIT | ESM `+esm` (custom element) | animated number formatting |
| canvas-confetti 1.9.4 | 4.2 kB | ISC | global script | |
| @lottiefiles/dotlottie-web 0.83.2 | 30.7 kB JS | MIT | ESM `+esm` | also fetches a WASM binary (not measured) |
| @rive-app/canvas-lite 2.55.1 | 59.6 kB JS | MIT | ESM `+esm` | plus WASM |
| lottie-web 5.13.0 | 75.0 kB | MIT | global script | legacy, heavy |
| anime.js 4.5.0 | 39.6 kB full | MIT | ESM | modular |
| embla-carousel 8.6.0 | 6.8 kB | MIT | ESM/global | |
| @floating-ui/dom 1.8.0 | 8.0 kB | MIT | ESM | anchor-positioning fallback |
| @formkit/auto-animate 0.11.0 | 4.0 kB | MIT | ESM | |
| driver.js 1.14.0 | 14.8 kB | MIT | global/ESM | onboarding tours |
| swup 4.10.0 | 9.0 kB | MIT | ESM | page transitions |
| matter-js 0.20.0 | 25.3 kB | MIT | global | physics |

Sources: sizes — Bundlephobia API, e.g. [lenis](https://bundlephobia.com/package/lenis), [gsap](https://bundlephobia.com/package/gsap), [motion](https://bundlephobia.com/package/motion), [ogl](https://bundlephobia.com/package/ogl), [three](https://bundlephobia.com/package/three), [@paper-design/shaders](https://bundlephobia.com/package/@paper-design/shaders), [cobe](https://bundlephobia.com/package/cobe); CDN checks — [jsDelivr lenis](https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js), [jsDelivr gsap](https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js), [jsDelivr motion ESM](https://cdn.jsdelivr.net/npm/motion@latest/+esm), [jsDelivr ogl ESM](https://cdn.jsdelivr.net/npm/ogl@1/+esm), [jsDelivr paper shaders ESM](https://cdn.jsdelivr.net/npm/@paper-design/shaders@0.0.82/+esm), [jsDelivr number-flow](https://cdn.jsdelivr.net/npm/number-flow/+esm); Motion no-bundler instructions and mini size — [Motion quick start](https://motion.dev/docs/quick-start); OGL sizes and licence — [OGL README](https://github.com/oframe/ogl); GSAP package licence field and version — [GSAP repo](https://github.com/greensock/GSAP); Paper vanilla package and versioning warning — [Paper Shaders README](https://github.com/paper-design/shaders).

- INTRX demos can declare `libs`, and today all 520 declare none; the site rule is no runtime dependencies, with only `packages/intrx` allowed npm dependencies — local `registry/index.json`, local `AGENTS.md`.
- INTRX has previously re-implemented library behaviour to stay dependency-free: its smooth-scroll driver is verified against captured Lenis 1.1.14 frames and its magnetic button against GSAP 3.12.5 easing — local `AGENTS.md`.

### Inferences
- Recommended allow-list if the owner lifts the rule: **Lenis, Motion (vanilla), GSAP (+ScrollTrigger/SplitText), OGL, Paper Shaders, cobe, number-flow, canvas-confetti**. Keep three.js, Rive and Lottie as opt-in for specific demos because of size and WASM.
- Dependencies cut both ways for INTRX's selling point. A fair compromise: keep the dependency-free demos as the default, add a visible `deps` facet (None / GSAP / Motion / OGL / Paper…), pin exact versions with SRI hashes, and make the generator prompt name the library and version.
- A dependency also changes the export story: portable single-file HTML would need a CDN `<script>` tag (works offline only if cached) — INTRX's existing offline-export verifiers would need a declared exception for `libs` demos.
- Motion and GSAP overlap; picking one house engine keeps prompts and agent output consistent. Motion is MIT; GSAP has the richer plugin set (SplitText, MorphSVG, ScrollTrigger, Flip) but a custom licence.

### Gaps
- Tree-shaken sizes are not available for CDN use; the Motion and Paper figures are whole-package and overstate a typical demo's cost if a bundler were used.
- WASM payload sizes for dotLottie and Rive were not measured.
- ScrollTrigger, Flip and ScrollSmoother file sizes were not measured.

## 6. Porting effort from React + Tailwind + Motion to vanilla

### Takeaway
Most "magic" components are small: Magic UI's Border Beam is 107 lines importing only Motion and a class-name helper, and React Bits' shader backgrounds are 480–660-line files that import nothing but React and a CSS file. The port itself is minutes for an agent; INTRX's own stage contract and verification gates will dominate the time.

### Cited Findings
- Magic UI `border-beam.tsx`: 107 lines; imports `motion/react` and the `cn` helper only — [source file](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/border-beam.tsx).
- React Bits JS-CSS variants: Aurora 481 lines, Silk 590, Liquid Chrome 659, Splash Cursor 1,019, Dock 1,023 — each importing only React hooks plus a CSS file (Dock also `createPortal`); SplitText is 428 lines and imports gsap, ScrollTrigger, GSAP SplitText and `@gsap/react` — [React Bits content folder](https://github.com/DavidHDev/react-bits/tree/main/src/content).
- React Bits publishes every component in four variants and installs by suffix (for example `-JS-CSS`) — [installation](https://reactbits.dev/get-started/installation).
- Sources that are already vanilla or CSS-only: Uiverse elements are plain CSS or Tailwind — [uiverse.io/elements](https://uiverse.io/elements); Codrops repos are plain JS with GSAP — [Codrops repos](https://github.com/orgs/codrops/repositories); Paper Shaders has a vanilla package — [README](https://github.com/paper-design/shaders); Motion's gallery has a JavaScript platform filter — [examples](https://motion.dev/examples); transitions.dev offers its library as CSS and React — [transitions.dev](https://transitions.dev); daisyUI is CSS-only — [repo](https://github.com/saadeghi/daisyui); Zag.js provides framework-agnostic state machines for accessible widgets (MIT, 5,295 stars) — [repo](https://github.com/chakra-ui/zag); cobe, canvas-confetti, driver.js, Lenis, Embla and number-flow are vanilla — [cobe](https://github.com/shuding/cobe), [driver.js](https://github.com/nilbuild/driver.js).
- shadcn registry items can be framework-agnostic: the schema has a `registry:item` "universal" type and `registry:file` with an explicit `target` — [registry-item docs](https://ui.shadcn.com/docs/registry/registry-item-json). INTRX's `r/<id>.json` files already use this schema with a `registry:file` HTML payload — local `r/3d-pin.json`.
- INTRX requires, per demo: a `rootClass` prefix on all classes, stage metadata, at most three declared actions, a reduced-motion branch, 11px minimum thumbnail text, a refreshed generator prompt, regenerated registry output and passing verifiers — local `AGENTS.md`.

### Inferences
Effort estimates for an AI coding agent (my estimates, not measured; "port" = working vanilla demo, "INTRX-ready" = also meets the stage contract, prompt, a11y flags and registry regeneration):

| Source shape | Example | Port | INTRX-ready | Why |
|---|---|---|---|---|
| CSS-only / keyframes | Uiverse button, Magic UI shimmer, retro grid, dot pattern | 5–10 min | 20–30 min | de-Tailwind classes into prefixed CSS |
| Motion wrapper around CSS | Magic UI Border Beam, Blur Fade, Marquee | 10–15 min | 25–40 min | replace `motion` props with CSS `offset-path`/WAAPI |
| Self-contained WebGL in a `useEffect` | Paper shader, any raw-WebGL background | 10–20 min | 30–45 min | lift effect body, add resize/dispose, DPR cap, reduced-motion still |
| Motion with layout/shared-element or `AnimatePresence` | morphing dialog, family drawer, animated list | 30–60 min | 60–120 min | needs FLIP or View Transitions and exit handling by hand |
| GSAP-based | SplitText reveals, ScrollTrigger scenes | 15–30 min with GSAP allowed; 60+ min dependency-free | 45–120 min | plugin behaviour must be rebuilt if no dependency |
| React-three-fiber / three scenes | 3D galleries, model viewer | 60–120 min | 2–4 h | rewrite scene graph imperatively |
| Stateful accessible widgets (Radix/Base UI underneath) | combobox, date picker, tour, command menu | 60–120 min | 2–4 h | focus management, roving tabindex, ARIA; consider Zag.js |
| Multi-part sections | pricing, hero, bento | 20–40 min | 45–90 min | mostly layout and copy |

- Tailwind removal is mechanical but verbose; the main quality risk is losing design tokens (spacing/radius/shadow scale). INTRX's `css/foundations.css` tokens should be the target vocabulary.
- React Bits' JS-CSS variants are technically the closest to drop-in of any React library, which is precisely what its licence's port clause closes off.
- Given INTRX's verification regime (per-phase model/input/clock/export/hold/touch/pixel suites), a realistic all-in budget is 1–2 hours of agent time per ported component unless the owner defines a lighter "community tier" gate (stage fit + reduced motion + keyboard + offline export only).

### Gaps
- No timing was measured; the table is judgment based on source sizes and INTRX's documented gates.
- Aceternity source was not inspected (no public repository), so its porting difficulty is assumed similar to Magic UI.

## 7. Organisation: how the best catalogs are structured, and a taxonomy for INTRX

### Takeaway
Leading catalogs split by what the visitor is assembling — Components, Blocks/Sections, Backgrounds, Text, Templates — then by plain-language category, and expose "New"/"Pro" badges, a command palette and per-page agent actions. INTRX's 26 categories mix user intent, technique and provenance (DRAMS, Interactive Showcase, Framer Collection, FUI) and its 700 free-form tags cannot act as filters; a seven-group, intent-first structure with four or five controlled facets would fix both.

### Cited Findings

#### 7a. Real navigation labels (15 sites)
- shadcn/ui: Home, Docs, Components, Blocks, Charts, Directory, Typeset, Create; Registry section with MCP Server, Open in v0, Namespaces; "New" badges on Code Block and Trace — [shadcn](https://ui.shadcn.com/docs/components).
- Aceternity: Components, Blocks, Pages, Interactions (New), Templates, Resources, Pricing; sidebar: Backgrounds & Effects, Card Components, Scroll & Parallax, Text Components, Buttons, Loaders, Navigation, Inputs & Forms, Overlays & Popovers, Carousels & Sliders, Layout & Grid, Data & Visualization, Cursor & Pointer, 3D, Sections and Blocks Free, Labs; ⌘K search — [Aceternity](https://ui.aceternity.com/components).
- Magic UI: Components, Templates, Showcase; sidebar: Getting Started (Introduction, Installation, MCP, Story, Legacy), Templates, Components, Special Effects, Animations, Text Animations, Device Mocks, Buttons, Backgrounds, Community; "New" and "Pro" badges — [Magic UI](https://magicui.design/docs/components/marquee).
- React Bits: Components, Installation, Tools, Pro; content groups Text Animations, Animations, Components, Micro, Backgrounds — [React Bits](https://reactbits.dev/get-started/index), [content folders](https://github.com/DavidHDev/react-bits/tree/main/src/content).
- 21st.dev: Components, Featured, Newest, Authors, Libraries; two sidebar families, Marketing Blocks and UI Components, each category with a live count; home rows for Newest, Popular, Shaders, Heros, AI Chat Components — [21st.dev](https://21st.dev/community/components).
- Cult UI: Blocks, Components, AI components, skills; functional sidebar (AI, App & Workspace, Form Controls, Feedback & Status, Navigation & Overlays, Onboarding & Flows, Buttons, Cards, Landing Pages, Illustrations, Media & Mockups, Backgrounds & Effects, Typography); Getting Started has MCP Server, LLMs & Agents, Changelog; Copy page — [Cult UI](https://www.cult-ui.com/docs).
- Fancy: Docs, Components; Text, Carousel, Background, Physics, Image, Filter, Blocks; Changelog and llms.txt under Getting Started — [Fancy](https://www.fancycomponents.dev/docs/introduction).
- SmoothUI: Components, Blocks, Templates, Resources; footer Primitives, Components, Blocks, Templates; Develop: Animations, Accessibility, Changelog — [SmoothUI](https://smoothui.dev).
- beUI: Components, Charts, Interactions, Sounds, React Native, Resources, Get Pro; filters Hover, Press, Drag, Type, Loading, Sound — [beUI](https://beui.dev).
- transitions.dev: Library, Builder, Motion Agent, Motion Skill, MCP, Community, Docs, Get Pro; library tabs All, Essential, AI Agents, Effects, Texts, Pro — [transitions.dev](https://transitions.dev).
- Hover.dev: Components, Templates, Pricing, FAQ; Sections (3D, FAQ, Features, Forms, Heros, Kanban Boards, Pricing, Stats, Sign In, Testimonials) and Components (20 groups) — [Hover.dev](https://www.hover.dev/components).
- Motion examples: filters Tutorial, Motion+, Favourites; platform All/React/JavaScript/Vue/Svelte/Three.js; MotionScore S–F; 28 categories with counts (Basics 110, Text 54, Carousel 30, Radix 30, Gallery 28, Loading 26, Cursor 25, Page transitions 25, 3D 22, Interactions 21…) — [Motion](https://motion.dev/examples).
- coss ui: Docs, Particles, Chat UI — [coss](https://coss.com/ui).
- HorizonX: Explore, Tools, MCP, Pricing, Affiliate, Resources; library UI/UX, Code, Design Systems, Assets, Game Assets — [HorizonX](https://horizonx.so).
- Skiper UI: How to use, Pricing, Components (Free / Premium), command palette — [Skiper](https://skiper-ui.com).

#### 7b. Per-component page anatomy seen in the field
- Magic UI's page: breadcrumb, Copy Page, title + one-liner, Preview/Code tabs with Open in v0, Installation with CLI/Manual tabs and package-manager switch, Examples, Usage, Props table, on-page contents, issue/feature/edit links — [Magic UI Marquee](https://magicui.design/docs/components/marquee).
- Other recurring features: Remix-in-studio button (transitions.dev), Copy Prompt (HorizonX), markdown version of every page (beUI), public search API with OpenAPI spec and machine-readable catalog (SmoothUI), per-category counts (21st.dev, Motion) — [transitions.dev](https://transitions.dev), [HorizonX](https://horizonx.so), [beUI](https://beui.dev), [SmoothUI](https://smoothui.dev).

#### 7c. INTRX's current structure
- Registry fields per item already include `group`, `category`, `trigger`, `tags`, `useCases`, `tier`, `libs`, `addedAt`, `isNew`, `a11y {keyboard, reducedMotion, aria}`, `thumb`, `sourceName`, `controls` — local `registry/index.json`.
- There are 700 distinct tags for 520 items; the most frequent are build-phase or provenance labels (extension 91, accessible 90, native 85, DRAMS 34 plus drams 18) and case duplicates exist (SVG 10 / svg 7) — local `registry/index.json`.
- "Layout & UI" holds 47 unrelated items (sheets, menus, cards, tables, kanban, cursors, schedulers); "Collections" groups items by where the idea came from — local `registry/index.json`.

### Inferences

#### Proposed two-level taxonomy (7 groups)

| New group | New category | Absorbs (current category → count) |
|---|---|---|
| **Components** | Buttons & Micro-interactions | Buttons & Micro 30 |
| | Inputs & Forms | Forms & Inputs 24; DRAMS sliders, knobs and switches cross-listed |
| | Navigation & Menus | Navigation & Menus 19; from Layout & UI: radial, bloom and context menus, dock, inverse/elastic tabs |
| | Overlays & Feedback | from Layout & UI: bottom sheet, modals, popover, toast, command palette, tooltip, link preview; Loaders & Progress 14 |
| | Cards, Lists & Layout | rest of Layout & UI: bento, masonry, reorder, kanban, tables, file tree, accordion, split pane, card stacks |
| | Galleries & Carousels | Galleries & Sliders 18; Showcase curved gallery, toss & stack |
| **Sections** (new) | Heroes; Features & Bento; Pricing; Social proof (testimonials, logos); FAQ, CTA & Footer; Auth & Onboarding; Device frames | new work (gap items 1–9) |
| **Text** | Text effects | Text & Type 29 |
| **Backgrounds** | Animated backgrounds; Patterns; Shaders | Ambient 18; Showcase dot field, threads, ballpit, ripple grid, magnet lines, mesh, warp |
| **Effects** | Scroll | Scroll 25 |
| | Cursor & Hover | Cursor 27; Showcase pixel trail, ribbons, mask reveal |
| | Image & Media | Image & WebGL 25 |
| | Retro & Glitch | Raster & Glitch 31 |
| | 3D & Depth | 3D & Perspective 15 |
| | Physics & Liquid | Physics 10; Liquid & Organic 10 |
| | SVG & Line | SVG & Line 10 |
| | Page transitions | new; page-transition, clip transition, mosaic switch |
| **AI & Data** | AI Chat & Agents | Agent & AI UI 24 |
| | Voice & Audio | new; Voice Orb; Sound & Haptics 7 (UI Sound Kit, Chime Stack) |
| | Charts & Numbers | Data & Numbers 15; Framer Collection 4 |
| | Maps & Globes | Maps & Geo 6; point/halftone globes cross-listed |
| | HUD & Terminal | FUI & Terminal 10; Terminal Window |
| **Lab** | Tactile & Skeuomorphic | Skeuomorph 23; DRAMS 52 as the named collection "DRAMS by 1042 Studio" |
| | Play & Easter eggs | Play & Easter Eggs 11; sound toys (theremin, drum sequencer, piano) |

Rename rationale: "FUI" → HUD & Terminal; "Raster & Glitch" → Retro & Glitch; "DRAMS", "Framer Collection", "Interactive Showcase" stop being categories and become **collections** (provenance), so their items appear under what they are.

#### Facets (controlled vocabularies, single source in the registry)
- `trigger`: hover, press, drag, scroll, type, ambient (exists).
- `tech`: css-only, js, canvas-2d, webgl, svg, web-audio, view-transitions, scroll-driven.
- `deps`: none, gsap, motion, ogl, paper-shaders, three… (from `libs`).
- `use`: marketing, app, ai, editorial, mobile, dashboard, playful.
- `a11y`: keyboard, reduced-motion (exists).
- `quality`: featured, standard, lab, archived. `status`: new, updated. `tier`: free, pro.
- Replace the 700 tags with roughly 60 curated keywords plus synonyms used only for search; drop internal tags (extension, native) from public output; make `useCases` distinct from `tags` or remove it.

#### Curation and hiding
- **Featured** (40–60 items) drives the home page and the hero thumbnails; choose from INTRX's own aesthetic audit rather than by category quota.
- **Lab** marks expressive or niche pieces (ASCII donut, Konami, theremin) so they do not dilute a first impression; **Archived** keeps URL, registry entry and MCP access but removes the item from default grids and counts.
- A public grade is defensible precedent: Motion shows a letter score on every example.
- **Collections** (cross-cutting, curated lists with their own URL): Landing-page kit, AI app kit, Dashboard kit, Mobile patterns, Zero-JS / modern CSS, Shaders, Liquid glass, Retro computing, Accessible by default, DRAMS by 1042 Studio, New this month.

#### Per-component page for INTRX
Preview (native + full) · tabs Single file / HTML / CSS / JS / Prompt (exists) · add: "Open in v0 / Claude / Cursor" deep links, Copy as Markdown, CLI + shadcn command (`npx shadcn add @intrx/<id>`), dependency and browser-support chips, credits/licence block, "Related" and "Used in collections", changelog entry.

#### Site-level navigation
Components · Sections · Text · Backgrounds · Effects · AI & Data · Lab, plus Collections, New, Docs (CLI, MCP, Skill, llms.txt), Pricing. Show counts beside each category as 21st.dev and Motion do.

### Gaps
- No analytics were available on which INTRX items are actually viewed or copied; "featured" selection should use that data if it exists.
- I did not read `LIBRARY_AESTHETIC_AUDIT.json` to propose which specific items to archive; the other researcher's aesthetic audit should supply that list.
- Exact per-item remapping of the 47 Layout & UI items was not produced; the table gives the rule, not all 47 assignments.

## 8. Positioning: what makes INTRX distinctive, and what is now table stakes

### Takeaway
INTRX's defensible difference is being framework-free, single-file and prompt-first with stated accessibility behaviour, at a scale (520 free) larger than any free competitor. Its distribution plumbing is technically present but not plugged into the channels the market uses: it is not in the shadcn registry directory, its npm package is unpublished, and it has no "open in" buttons or framework wrappers.

### Cited Findings
- INTRX ships, per component, a live demo, a single-file HTML+CSS+JS snippet and an LLM prompt; it publishes `registry/index.json`, `llms.txt`, `llms-full.txt`, shadcn-schema items in `r/`, a CLI and an MCP server with seven read-only tools, and an agent skill folder — local `llms.txt`, local `packages/intrx/README.md`, local `r/3d-pin.json`, local `AGENTS.md`.
- The CLI/MCP package `@tanziro/intrx` has not been published to npm — local `packages/intrx/README.md`.
- The shadcn registry directory lists 613 namespaces and `@intrx` is not among them — [registries.json](https://ui.shadcn.com/r/registries.json).
- Size comparison of free tiers: INTRX 520; beUI 233 React; SmoothUI 228; React Bits ~218; Eldora 150+; Cult UI ~134; Kokonut 117; Aceternity 100+; Skiper 106+; Magic UI 80; Fancy ~45; Motion Primitives 33 — sources in section 1.
- Table-stakes features and who has them: shadcn-CLI install (Aceternity, Magic UI, React Bits, Cult UI, Kokonut, Skiper, beUI, SmoothUI, Fancy, Eldora); MCP server (Aceternity, Magic UI, Cult UI, Kokonut via shadcn MCP, SmoothUI, beUI, HorizonX, transitions.dev, 21st.dev); llms.txt (shadcn, Fancy, Kokonut, SmoothUI); agent skill (shadcn, beUI, transitions.dev, Motion AI Kit); Open in v0 (shadcn, Magic UI, Eldora); copy page as markdown (Magic UI, Cult UI, beUI); multi-framework variants (React Bits' four variants, Motion's React/JS/Vue/Svelte examples, Vue Bits, Inspira UI) — [Aceternity](https://ui.aceternity.com/), [Magic UI](https://magicui.design/docs/components/marquee), [React Bits install](https://reactbits.dev/get-started/installation), [Cult UI](https://www.cult-ui.com/docs), [Kokonut docs](https://kokonutui.com/docs), [SmoothUI](https://smoothui.dev), [beUI](https://beui.dev), [transitions.dev](https://transitions.dev), [Motion+](https://motion.dev/plus), [shadcn](https://ui.shadcn.com/docs/components).
- Accessibility as a differentiator: SmoothUI advertises reduced-motion support and an Accessibility docs page; one round-up says React Bits ships reduced-motion controls that Aceternity and Magic UI lack by default — [SmoothUI](https://smoothui.dev), [PkgPulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026). INTRX records keyboard and reduced-motion support per item — local `registry/index.json`.
- Pro-tier norms: one-time $129–$399 for blocks, templates and agent kits (React Bits Pro $129/$249/$349; Aceternity $169/$199; Magic UI Pro $199; Skiper $129; beUI $249; Motion+ $399); subscriptions are used by marketplaces and asset services (21st.dev $6–60/mo, HorizonX $24.99–99.99/mo, Unicorn Studio $20/mo) — [React Bits Pro](https://pro.reactbits.dev), [Aceternity pricing](https://ui.aceternity.com/pricing), [Magic UI Pro](https://pro.magicui.design), [Skiper](https://skiper-ui.com), [beUI](https://beui.dev), [Motion+](https://motion.dev/plus), [21st pricing](https://21st.dev/pricing.md), [HorizonX](https://horizonx.so), [Unicorn Studio](https://www.unicorn.studio/docs/pricing/).

### Inferences
- **Distinctive today:** (1) zero-framework, zero-dependency, one-file output that works in any stack and in any agent sandbox; (2) a precise rebuild prompt per component, which makes INTRX a spec library as much as a code library; (3) per-item trigger, keyboard and reduced-motion metadata; (4) depth in categories nobody else covers (ASCII/dither/CRT, skeuomorphic controls, sound, FUI, physics); (5) everything free.
- **Missing table stakes, in order of payoff:** publish the npm package; register `@intrx` in the shadcn directory (the `r/` items already use the schema); add "Open in v0 / Claude / Cursor" and "Copy as Markdown"; publish the agent skill through the common skills channel; add a React wrapper output (and optionally Vue/Svelte) generated from the same definition, since every competitor's audience is React-first; add a hosted (HTTP) MCP endpoint alongside stdio.
- **Positioning line the evidence supports:** "the interaction library that is not tied to React" — the only large catalog whose output is platform-native, with prompts so an agent can re-express any item in the user's framework.
- **Pro strategy caution:** competitors keep single components free and charge for assembled value. If INTRX adds Sections (gap items 1–9), templates built from them and an agent kit, that is the natural Pro surface; locking individual effects is the weaker fit, and any ported MIT code inside Pro still needs its notices.
- **Risk:** adding third-party runtime dependencies and ported React-derived code erodes points (1) and (5) above; keep ported items clearly labelled with a `deps` facet and credits so the dependency-free core remains the headline.

### Gaps
- No traffic, install or conversion data for INTRX or competitors was available; "payoff" ordering is judgment.
- I did not verify the requirements for being accepted into the shadcn registry directory (the "Add a Registry" guide was not opened).
- Whether INTRX's existing MCP/CLI already offers framework ports was not tested; the Pro scaffolding note mentions requests for framework ports, which suggests a port path exists in some form.
