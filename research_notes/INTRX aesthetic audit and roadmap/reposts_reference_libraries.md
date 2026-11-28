# Reposts of @tanz1r as a taste and benchmark signal: reference libraries, design resources and upcoming sites (as of 28 Nov 2026)

Method and coverage (applies to every section):
- Source timeline: https://x.com/tanz1r/reposts, read in the signed-in built-in browser tab, strictly read-only (only scrolling, opening posts and navigating back).
- 200 unique reposts were read, from the newest (original post dated 19 Nov 2026) back to items originally posted in Aug 2024. X did not block or rate-limit. The first scroll pass stopped at 20 items (the API returned a terminate instruction); a reload returned the full list.
- Dates below are the ORIGINAL post dates shown by X, not the dates the owner reposted. Timeline order is repost order (newest repost first), which is why a few dates look out of sequence.
- Design/dev-relevant activity is concentrated between 26 Mar 2026 and 19 Nov 2026 (about 180 reposts). Below 26 Mar 2026 the timeline holds one Jan 2026 design post and then 2024–2025 news, politics and general AI posts, which are not logged here.
- Videos were NOT played (read-only rule). Descriptions of video posts are from the poster frame and post text only. Where a statement is from a poster frame it says so.
- Library facts were read on 28 Nov 2026 from each site, its GitHub repo and its licence file. Licence texts quoted "verbatim" were read from the raw licence file (GitHub API) unless marked "as reported by page fetch".
- INTRX's own catalog (26 categories, 520 titles) was read from `C:\Users\tanzir\Desktop\interaction\registry\index.json` to map repost ideas against existing coverage.

## 1. What do the reposts contain? Complete log of design/dev-relevant reposts read

### Takeaway
Of 200 reposts read, about 180 are design/dev posts from 26 Mar – 19 Nov 2026: 13 are "list of resources" posts naming about 110 distinct libraries/sites, and the rest are single showcases (hero sections, brand systems, motion studies, UI elements, three.js demos, ASCII/dither tools, maps). The most reposted single creator is @its_sslvr (7), and the most reposted list author is @neropursue (5).

### Cited Findings

List-style posts (full text expanded; every URL named is listed)
- 2026-11-19 · @BenjaminUIX · "10 UI libraries that kill sloppy UI": libraries.dev, reactbits.dev, Magic UI (pro.magicui.design), ui.aceternity.com, 21st.dev, ui.shadcn.com, motion-primitives.com, cult-ui.com, animate-ui.com, kibo-ui.com — [post](https://x.com/BenjaminUIX/status/2123340929633550834)
- 2026-11-12 · @neropursue · "The best 10 component libraries to ship faster": horizonx.so ("Premium UI Asset Library"), originkit.dev ("Free animated components"), transitions.dev, beui.dev, obsidianui.dev, ui.aceternity.com, astryx.atmeta.com ("Customizable React design system"), bencho.dev ("Interactive UI components"), boardui.com, reverseui.com ("Distinctive UI components") — [post](https://x.com/neropursue/status/2120762111961776163)
- 2026-10-20 · @csaba_kissi · "6 cool sites for web developers": open-design.ai, vibeprompts.dev, github.com/feder-cr/git-ai, hairline.lucasmarkes.com ("33 free animated React figures"), ui.oiloil.org ("Free AI design skill"), tympanus.net/codrops/webzibition ("2,400+ free web design inspirations") — [post](https://x.com/csaba_kissi/status/2112443894319489423)
- 2026-10-04 · @iamtanzil_ · "8 design resources worth bookmarking": jiro.build ("1,200+ design prompts"), navbar.gallery, footer.design, cta.gallery, 404s.design, unsection.com ("ready-made sections"), bentogrids.com, 60fps.design ("premium motion details") — [post](https://x.com/iamtanzil_/status/2106710926145781986)
- 2026-09-15 · @craftworkdesign · "Nine dev tools for the details. Part 7": cuedesign.space, bencho.dev, evilbuttons.com, cursor-lab-ui.vercel.app, bookofshapes.com, shaders.com, vgpu.sh, shotbase.com, splitsense.ai (+ productrally.com) — [post](https://x.com/craftworkdesign/status/2099964530394845429)
- 2026-09-14 · @neropursue · "The best UI components ready to use": libraries.dev ("Interactive UI effects & animations"), transitions.dev, astryx.atmeta.com ("170+ customizable React components"), beui.dev, coss.com/ui, originkit.dev, kinetics.colorion.co ("Fluid motion powered by physics"), 21st.dev ("1,000+ AI-ready UI components"), beautifului.dev ("Stunning components for AI products") — [post](https://x.com/neropursue/status/2099449677556977844)
- 2026-09-07 · @Hartdrawss · "9 sites that generate Design Markdown files for your AI builds": styles.refero.design, designmd.me, open-design.ai, designmd.supply, aura.build, neuform.ai, design-md.hyperbrowser.ai, typeui.sh (eight are named in the text) — [post](https://x.com/Hartdrawss/status/2096924182260875471)
- 2026-08-27 · @csaba_kissi · circleloaders.dominikakissi.com ("Animated circle SVG loaders"), vibeindex.dev, 404.colorion.co ("CSS animation snippets for 404 pages"), findergit.app, mantine.dev — [post](https://x.com/csaba_kissi/status/2092865608341926390)
- 2026-08-17 · @neropursue · "The best UI components ready to use": originkit.dev, orbs.jakubantalik.com ("Animated thinking orb component"), transitions.dev, beautiful-ui-five.vercel.app ("crafted UI for AI-native interfaces"), 21st.dev, ui.aceternity.com, component.gallery ("patterns from 95 design systems"), agentation.com — [post](https://x.com/neropursue/status/2089263766428950683)
- 2026-08-17 · @csaba_kissi · github.com/alibaba/page-agent, beui.dev ("Animated React components"), sevalla.com, iconcreator.dev ("Free animated/3D icons designer"), firecrawl.dev — [post](https://x.com/csaba_kissi/status/2089235628710109528)
- 2026-08-16 · @ImranUxi · background gradient resources: backgrounds.supply, pryzm.design ("gradients, glass & grain backgrounds"), colorflow.ls.graphics, grainient.supply, cssgradient.io, gradientool.com, ramps.studio, studio.zoxilsi.cc, tabbied.com, pro.beui.dev ("animated React backgrounds & UI blocks") — [post](https://x.com/ImranUxi/status/2088951277782970449)
- 2026-06-07 · @dhruvtwt_ · "A directory of ui skills for design engineers": ui-skills.com — [post](https://x.com/dhruvtwt_/status/2063655840910069838)
- 2026-06-01 · @kail_designs · perspectivemock.vercel.app (tilt a screenshot in 3D, keyframe it, export MP4); quoted post: thesvg.org (brand logo library) — [post](https://x.com/kail_designs/status/2061406998311362981)
- 2026-05-30 · @noahelhadedy · "Design websites worth saving": thiings.co, 60fps.design, shadergpt.14islands.com, endlesstools.io, uncut.wtf, coolshap.es, siteinspire.com, logggos.club — [post](https://x.com/noahelhadedy/status/2060672583515652390)
- 2026-04-30 · @bbssppllvv · Refero: "2,000 DESIGN.md files from the world's best products... Free. styles.refero.design" — [post](https://x.com/bbssppllvv/status/2049924037111841027)

Library/tool announcements and code-linked demos
- 2026-09-06 · @MengTo · "Astra can create beautiful three.js UIs entirely in code... Liquid Glass, shaders, motion design, procedural three.js models"; prompts quoted include "Add Liquid Glass buttons. On hover, animate the lighting around the borders" — [post](https://x.com/MengTo/status/2096510126244999366)
- 2026-08-27 · @arqe_ai · arqe.ai: drop in content, generate animated posts to showcase work — [post](https://x.com/arqe_ai/status/2092946785228497387)
- 2026-08-26 · @neropursue · inspora.design: "We collect the best designs from X"; 10K visitors in one day — [post](https://x.com/neropursue/status/2092511038499377389)
- 2026-08-18 · @Praha37v · "built with originkit.dev" (poster frame: dark hero, green particle hourglass/vortex, serif headline "Transform Every Signal Into Action") — [post](https://x.com/Praha37v/status/2089850343412916581)
- 2026-08-17 · @Praha37v · "Anyone can customize and use this Galaxy Ring in your project. Free Access Link" (poster frame: particle galaxy ring inside an editor with controls panel) — [post](https://x.com/Praha37v/status/2089348019426930908)
- 2026-08-17 · @MengTo · Opus 5 three.js landing pages; prompts: "orbit using mouse", "add particles to pointer", butterfly that reacts to hover, wireframe scan intro "similar to the field-scanning effect in Death Stranding", "Add a scan effect to the card images while they load" — [post](https://x.com/MengTo/status/2089252548473688076)
- 2026-08-07 · @MengTo · three.js landing page with 3D scrolling per section; "the whole site is 922 KB on disk, 290 KB gzipped"; used canvasui.dev for a cloth effect on images — [post](https://x.com/MengTo/status/2085765403729653877)
- 2026-07-12 · @originkit · "New components just dropped. Copy them for free at originkit.dev" — [post](https://x.com/originkit/status/2076258058188296332)
- 2026-05-29 · @Aurelien_Gz · "particles + threejs is the cheat code for banger interactive animations": hologram-particles.vercel.app (credit @cortiz2894) — [post](https://x.com/Aurelien_Gz/status/2060464174153523264)
- 2026-05-28 · @dantmatt · three.js portfolio "an astronaut flying near a black hole, and the planets are my CV sections": matteodante.it, source github.com/matteodante/portfolio-cockpit — [post](https://x.com/dantmatt/status/2060014029259616463)
- 2026-05-28 · @fernandorojo · "flying car by @evilrabbit_ x @v0"; quoted: flyingcar.evilrabbit.com wallpapers — [post](https://x.com/fernandorojo/status/2060119194482692386)
- 2026-05-28 · @kaolti · "Card hover with 3D shape sculpting, Three.js. Built with Cursor"; transcript sold on Gumroad (poster frame: two dark glass cards each holding a 3D gem, "Pyramid" and "Diamond") — [post](https://x.com/kaolti/status/2060107896927473837)
- 2026-05-28 · @timothymaarv · trading terminal with flexible layout "expand, minimize, resize, collapse, widgets": markets-demo.timothymaarv.me — [post](https://x.com/timothymaarv/status/2059896713486213625)
- 2026-05-25 · @jeetnirnejak · "Token Usage Component: see the live usage, throughput and cost. Designed in @paper, animated with @motiondotdev" — [post](https://x.com/jeetnirnejak/status/2058894004532691102)
- 2026-05-25 · @AdhamDannaway · cognitivebiasindex.com by Jon Yablonski — [post](https://x.com/AdhamDannaway/status/2058919264862523681)
- 2026-05-12 · @alibey_10 · "coss ui is just a component library, but someone built a big collection of blocks on top of it... it costs 0$" — [post](https://x.com/alibey_10/status/2054156725452689459)
- 2026-05-12 · @zzzzshawn · "You can now customise the shape of the dots in dotmatrix!": dotmatrix.zzzzshawn.cloud — [post](https://x.com/zzzzshawn/status/2054146347251781848)
- 2026-04-30 · @HowToPrompt__ · mapcn: "Beautiful, customizable map components for React... Works out of the box with shadcn/ui. 100% Open Source" — [post](https://x.com/HowToPrompt__/status/2049855474997367013)
- 2026-04-29 · @bewaretherat · "only a fool could walk away from shader lab" — [post](https://x.com/bewaretherat/status/2049543024280006677)
- 2026-04-11 · @madebyhex · "Motion GPU - WebGPU, without the noise"; added Vue 3 (React 18/19, Svelte 5, Vue 3); playground: motion-gpu.dev — [post](https://x.com/madebyhex/status/2042935139613704475)
- 2026-04-06 · @vamsibatchuk · typevibe: font-pairing recommender — [post](https://x.com/vamsibatchuk/status/2040969883236622484)
- 2026-04-03 · @maptheclouds · "Built an animated globe where custom GLSL turns a standard texture into procedural halftone dots. Three.js + WebGL + GLSL shaders" — [post](https://x.com/maptheclouds/status/2040112089994309864)
- 2026-04-02 · @sabosugi · "Neural Network Signals. Demo and Source Code" on CodePen (three.js) — [post](https://x.com/sabosugi/status/2039637282945388712)
- 2026-04-01 · @Nomandsign · interactive case study "crafting a near-perfect MacBook notch for the web with Claude": iamnoman.com/notch — [post](https://x.com/Nomandsign/status/2039418879659962476)
- 2026-04-01 · @ieeeedan · "Welcoming Luma to shadcn-svelte" — [post](https://x.com/ieeeedan/status/2039326742909796474)
- 2026-03-29 · @madebyhex · Motion Core "Globe component supports any HTML tooltips": motion-core.dev/docs/globe — [post](https://x.com/madebyhex/status/2038223362917282155)
- 2026-03-29 · Pretext cluster (five reposts in one day, all quoting @_chenglou's launch of Pretext, a text measurement/layout library): @andrewjiang "fully playable demo" inside a paper — [post](https://x.com/andrewjiang/status/2038273711237984564); @Riyvir illuminated dragon, illustrated-manuscript.vercel.app — [post](https://x.com/Riyvir/status/2038093450139279426); @alyx_so — [post](https://x.com/alyx_so/status/2038369797616885933); @nykdotdev pretext-playground.builderz.dev — [post](https://x.com/nykdotdev/status/2038186160514605556); @XRarchitect "pretext, three.js, world labs" — [post](https://x.com/XRarchitect/status/2038319908782805243); plus @garrytan "Golden age of AI + design" quoting @_chenglou — [post](https://x.com/garrytan/status/2038347973193859497)
- 2026-03-29 · @chazza · "One of the most underrated CSS props is definitely scroll snapping... these carousels are possible with CSS alone" — [post](https://x.com/chazza/status/2038277660850205099)
- 2026-03-29 · @Aurelien_Gz · "the death of the 'are you sure?' popup.. wizard » @raunofreiberg" — [post](https://x.com/Aurelien_Gz/status/2038344175356121547)
- 2026-03-29 · @RoundtableSpace and @heyrimsha · tool that generates 3D particle systems from a text prompt and exports React/Three.js code — [post](https://x.com/RoundtableSpace/status/2038213328435089470), [post](https://x.com/heyrimsha/status/2038218309276184940)
- 2026-03-29 · @cedric_design · Dashfolio N2 (Framer template) launch: "Signature Sidebar. Mobile-first. Page Transitions. Expanded CMS" — [post](https://x.com/cedric_design/status/2038240166683554211)
- 2026-03-29 and 2026-04-12 · @vansh1029 · ASCII Studio: landing v1 ("571 stars left before the tool launch") and editor page — [post](https://x.com/vansh1029/status/2038247303216287770), [post](https://x.com/vansh1029/status/2043320733858763240)
- 2026-03-27 · @Prasanjit_ui · Ditherit: turns image/video/GIF into dithered dot art and ASCII; "Hover over the preview and watch the dots react with smooth physics"; exports PNG, SVG, JSON, WebM or React/JS code — [post](https://x.com/Prasanjit_ui/status/2037495387976565240)
- 2025-08-01 · @CodePen · "Interactive Table with Image Hover & Idle Animation" by Filip Zrnzevic — [post](https://x.com/CodePen/status/1951345714413355305)

Single showcases (visual/motion taste), newest repost first
- 2026-08-27 · @seb__design · "some of my favourite designs / animations" (4 videos; poster: light grey editorial grid, mono numerals "1 km") — [post](https://x.com/seb__design/status/2092889394835497447)
- 2026-08-25 · @its_sslvr · "Forward+sector*" (poster: three dark grid-lined poster cards with wireframe aircraft and an orange wireframe globe) — [post](https://x.com/its_sslvr/status/2092129852514029770)
- 2026-08-22 · @its_sslvr · "Rosso+corsa*" (poster: two dark posters filled with fluid smoke gradients, acid green/black and red/grey) — [post](https://x.com/its_sslvr/status/2091027587326005421)
- 2026-08-19 · @Jaxoriginals · "A few seconds of controlled chaos." (poster: black field, HUD readouts, B&W aerial city photo, orange square and numeral) — [post](https://x.com/Jaxoriginals/status/2089973882929426577)
- 2026-08-19 · @BThreeAgency · "Just casually farming aura with every hero section." (poster: off-white neoclassical marble relief as full-bleed hero, serif headline) — [post](https://x.com/BThreeAgency/status/2090015464110121469)
- 2026-07-22 · @seb__design · slider with "animated graphics in one view" (poster: light grid, mono metrics "200 ms", "15 s", blurred orange/green gradient bars) — [post](https://x.com/seb__design/status/2079909906367623428)
- 2026-07-22 · @Velaskdzn · "Exploring texture + gradient for assets" (images: pixelated red/orange gradient on black, serif headline "Semantic processing at absolute scale.") — [post](https://x.com/Velaskdzn/status/2079929465153430005)
- 2026-07-12 · @its_sslvr · "+stellar+patch" (quotes "Pixelated+orbit") — [post](https://x.com/its_sslvr/status/2076169686732214691)
- 2026-07-12 · @pwnies · "interweave of classical painting styling and digital effects/shaders... Neoclassicore? Renderaissance? Baroquepunk?" (poster: cream landing page with painted portrait collage) — [post](https://x.com/pwnies/status/2076375340734357646)
- 2026-07-11 · @amnadesignn · "Footer Design" — [post](https://x.com/amnadesignn/status/2075962836036300876)
- 2026-07-12 · @theharshith_ · "Here's a cool website I just found" (video only; site not named in text) — [post](https://x.com/theharshith_/status/2076319670454366333)
- 2026-07-12 · @NotHsuyeep26 · "Week in 4 designs" — [post](https://x.com/NotHsuyeep26/status/2076192331078730142)
- 2026-07-11 · @DilumSanjaya · interactive science app (pollinators), Gemini 3.1 Pro — [post](https://x.com/DilumSanjaya/status/2075985725108154685)
- 2026-07-12 · @marina_uiux · "some new design experiments of mine WIP" — [post](https://x.com/marina_uiux/status/2076410277109645741)
- 2026-07-12 · @HeyLabii · "The Easiest Way to Make UI Feel Premium" by @mona_biasia (poster: sign-in card beside a soft sky-gradient panel with a floating menu) — [post](https://x.com/HeyLabii/status/2076293341298528257)
- 2026-06-18 · @uihssn · "Built one of the biggest background libraries on X, completely free" (images: soft painterly cloud gradients, blue/orange) — [post](https://x.com/uihssn/status/2067537266902483163)
- 2026-06-08 · @NotHsuyeep26 · "Some footers done lately" — [post](https://x.com/NotHsuyeep26/status/2063934939243159998)
- 2026-06-08 · @Lukeedesigner · "Whats a color combo that deserves more love?" — [post](https://x.com/Lukeedesigner/status/2063825261326373064)
- 2026-06-05 · @Oluwaphilemon1 · tutorial: Kimi K2.6 for "award-winning" websites — [post](https://x.com/Oluwaphilemon1/status/2062992288213508316)
- 2026-06-05 · @DopeOblivion · "Already loving this aesthetic." (images: cream canvas, a bar-chart UI card laid over a classical painting) — [post](https://x.com/DopeOblivion/status/2062925685119729928)
- 2026-06-05 · @TyroneC__ · "Editorial explorations for a client" — [post](https://x.com/TyroneC__/status/2062903370583568503)
- 2026-06-05 · @echoGFX_ · "Tekashi analytics" poster design — [post](https://x.com/echoGFX_/status/2063002922766737897)
- 2026-06-05 · @viktoroddy · "GPT 5.5 + Codex. Prompt ↓" — [post](https://x.com/viktoroddy/status/2062918204452663767)
- 2026-06-06 · @its_sslvr · "Random experiment" (poster: dark "MONOLITH+CMD" dashboard with a coloured dot-matrix field) — [post](https://x.com/its_sslvr/status/2063102555971068326)
- 2026-06-06 · @sparkpxldesign · "What the team is cooking up lately" — [post](https://x.com/sparkpxldesign/status/2063187050665529584)
- 2026-06-05 · @uihssn · "Design recap of the week" (branding, logos, hero explorations) — [post](https://x.com/uihssn/status/2062942527095804070)
- 2026-06-02 · @its_sslvr · "The digital synapse ***" (poster: three dark cards with dot-matrix/particle graphics labelled "Sentient**Organic(Glass)**", "Pulse(Emission)", "Crash(Particles)"; quoted "The clutter protocol": cream cards with dotted curves) — [post](https://x.com/its_sslvr/status/2061660355898818595)
- 2026-06-01 · @coffee_0708 · footer matching hero ("does this feel premium") — [post](https://x.com/coffee_0708/status/2061415210750190038)
- 2026-05-30 · @eugeneniidesign · "Crazy how much you can achieve with minimalism" (images: light bento cards with isometric line illustrations) — [post](https://x.com/eugeneniidesign/status/2060800489592070278)
- 2026-05-30 · @uxsweta · "Hero sections I designed this week" — [post](https://x.com/uxsweta/status/2060609654141632548)
- 2026-05-30 · @Praha37v · "Now you know whom to hire for isometric websites." — [post](https://x.com/Praha37v/status/2060669103170519429)
- 2026-05-30 · @its_sslvr · "Expanding this series" (quotes "The biopixel protocol") — [post](https://x.com/its_sslvr/status/2060570182238773424)
- 2026-05-29 · @astarcodes · recreated a @stevelauda_ Figma design in Next.js + Motion; font "GeistPixel Circle variant" — [post](https://x.com/astarcodes/status/2060323413261226413)
- 2026-05-29 · @uiuxarih · "Clean and Smooth Animations is the key" — [post](https://x.com/uiuxarih/status/2060310948393435355)
- 2026-05-29 · @radbar_1 · "Animated pond" (@rive_app) — [post](https://x.com/radbar_1/status/2060347628718571717)
- 2026-05-30 and 2026-04-03 · @radbar_1 · "Random bits from @mymind" #20 and #13 — [post](https://x.com/radbar_1/status/2060569582205653134), [post](https://x.com/radbar_1/status/2040050274815877212)
- 2026-05-29 · @DanFessler · voxel lighting algorithm proof of concept — [post](https://x.com/DanFessler/status/2060504009111433631)
- 2026-05-28 · @kuxshl · (no text; images: terracotta/sage panels, "$32.5M" serif figure, branching network diagrams). The owner replied "The colors and branches look great. Unique." — [post](https://x.com/kuxshl/status/2059874258126594461)
- 2026-05-28 · @mnowakdesign · "cinematic motion for this dashboard" (images: dark tilted dashboard, dashed glowing forecast lines "Optimistic / Base / Conservative") — [post](https://x.com/mnowakdesign/status/2060013326760022147)
- 2026-05-29 · @yahyavision · "The only fonts I'll ever need again" — [post](https://x.com/yahyavision/status/2060385101100339340)
- 2026-05-29 · @ycombinator · DraftedAI: floor plans and 3D home designs from constraints — [post](https://x.com/ycombinator/status/2060390756154769500)
- 2026-05-28 · @adamhmwn · "Hover animation made in claude." (poster: "What services we provide", three panels orange-red / black / lime with line icons). The owner replied "Subtle and clean." — [post](https://x.com/adamhmwn/status/2059818530359726227)
- 2026-05-28 · @crsanchezx · AI tool that scans a plot and lays out a car park — [post](https://x.com/crsanchezx/status/2059949518150406202)
- 2026-05-26 · @praveenisomer · "Animated Cards? Nahh... We do 3D animated cards. Taste matters." (poster: cards with orange 3D coin/disc renders) — [post](https://x.com/praveenisomer/status/2059311097337741782)
- 2026-05-25 · @Oriku175 · "Wildlife.exe corrupted successfully." (poster: white page, point-cloud animals in green/orange/violet/blue with crosshair labels) — [post](https://x.com/Oriku175/status/2058899636069265604)
- 2026-05-25 · @tejashinduja · (no text; images: dark olive panel with yellow-green branching network and orange labels) — [post](https://x.com/tejashinduja/status/2058946514698060246)
- 2026-05-25 · @Vaibhavpaul_UI · visual identity for an AI cybersecurity company (images: magenta/plum panels, ASCII horse and dragon) — [post](https://x.com/Vaibhavpaul_UI/status/2058811744051703970)
- 2026-05-25 · @uihssn · "Your hero section decides if people stay or leave." (images: black hero with red/orange ASCII-textured gradient and serif italic headline; a second with a blue-violet arc on black) — [post](https://x.com/uihssn/status/2058739682771652612)
- 2026-05-24, 05-09, 05-08 · @Lukeedesigner · branding style, slides, "Client: Make it pop" — [post](https://x.com/Lukeedesigner/status/2058649693731602612), [post](https://x.com/Lukeedesigner/status/2052958628596904301), [post](https://x.com/Lukeedesigner/status/2052576870550393250)
- 2026-05-12 · @ItsPeterDesign · "Rate this design" — [post](https://x.com/ItsPeterDesign/status/2054240746673209826)
- 2026-05-12 · @neropursue · "Our design work is on another level." — [post](https://x.com/neropursue/status/2054204334473085104)
- 2026-05-11 · @uxbybhakti · "Isometric Design Concept in @figma" — [post](https://x.com/uxbybhakti/status/2053829359119810945)
- 2026-05-08 · @measure_plan · "i made a NYC neighbourhood exploration gacha" (quotes "i made a map roulette") — [post](https://x.com/measure_plan/status/2052739524275405202)
- 2026-05-09 · @its_sslvr · "Oxidized logic -+ a glitch matrix" (poster: three cards "Swarm Orchest", "Neural Dispatch", "Cognitive Observer"; grey and acid-lime glitch textures) — [post](https://x.com/its_sslvr/status/2052956858768556205)
- 2026-05-09 and 05-04 · @stevelauda_ · "FUI exploration // 003. Secret agent manager dashboard. Made w/ code" (poster: dark terminal-style roster; quoted 002: map HUD with coordinates and Japanese labels); "Building them in code this week for fun." — [post](https://x.com/stevelauda_/status/2052909042104954963), [post](https://x.com/stevelauda_/status/2051205716095217987)
- 2026-05-08 · @ehsanshares · SaaS design exploration — [post](https://x.com/ehsanshares/status/2052593589553705404)
- 2026-05-04 · @o_kwasniewski · iterating on @TesterArmy landing page — [post](https://x.com/o_kwasniewski/status/2051350522175856886)
- 2026-04-30 · @marcelkargul · "we literally use these fonts in 90% of our projects" — [post](https://x.com/marcelkargul/status/2049918766570524913)
- 2026-04-30 · @disarto_max · "AI agent overview [UI element]" (image: light card, agent name "Jake", tool chips, orange activity strip) — [post](https://x.com/disarto_max/status/2049893848717951272)
- 2026-04-30 · @kyle_e_walker · why web maps are slow (geospatial performance) — [post](https://x.com/kyle_e_walker/status/2049884599912710393)
- 2026-04-14 and 04-12 · @keilethh · "visual system i've been building" (images: grayscale cards, dotted-sphere horizon on black, pixel numerals "V/04", one orange button); moodboard — [post](https://x.com/keilethh/status/2044105900038697072), [post](https://x.com/keilethh/status/2043381746490548229)
- 2026-04-12 and 04-11 · @ciguleva · two posts without text — [post](https://x.com/ciguleva/status/2043324906872680573), [post](https://x.com/ciguleva/status/2042962833944764917)
- 2026-04-12 · @BenjaminUIX · "Did I cook?" — [post](https://x.com/BenjaminUIX/status/2043374578920280429)
- 2026-04-13 and 03-28 · @kyleanthony · "BRAND CONCEPT (AUTOMATION DEPT. U.S.A.) ADVANCED SYSTEMS - T100"; "Neo Industrial design style" (image: black-and-white stamped badges "LAB", "FUEL", "BH OPS 2026", "MADE IN THE U.S.A.") — [post](https://x.com/kyleanthony/status/2043663419207815609), [post](https://x.com/kyleanthony/status/2037860081614606711)
- 2026-04-12 · @uixamjad · human taste vs AI subscriptions — [post](https://x.com/uixamjad/status/2043392890190377387)
- 2026-04-12 · @helloHEX · new identity for tensorlake: hex.inc/work/tensorlake — [post](https://x.com/helloHEX/status/2043240069507494376)
- 2026-04-12 · @fellowshiptrust · "1997#2 by Bjørn Staal" (generative art) — [post](https://x.com/fellowshiptrust/status/2043371556840350190)
- 2026-04-12 · @basit_designs · "luxury+minimalism+ASCII art into the landing page design" — [post](https://x.com/basit_designs/status/2043409177482232317)
- 2026-04-11 · @faydkr · "Vibed a whole ascii tool of my own today" — [post](https://x.com/faydkr/status/2043050004709839046)
- 2026-04-12 · @immarupng · «from the abyss to the stars» (image: dark poster, pixel/dither salmon rocket trail, orbit lines, display type) — [post](https://x.com/immarupng/status/2043287305243525173)
- 2026-04-12 · @konrad_designs · "one of the top my daily designs" — [post](https://x.com/konrad_designs/status/2043324731743408577)
- 2026-04-11 · @alikashifmr · "Problem & Solution Section exploration" — [post](https://x.com/alikashifmr/status/2042921785188893071)
- 2026-04-12 and 03-31 · @alexroyhe · "how a modern Sign Up Page should look"; "now tell me Ai can build this or not?" — [post](https://x.com/alexroyhe/status/2043151698928206300), [post](https://x.com/alexroyhe/status/2038849158074032454)
- 2026-04-12 · @GaloAndStuff · "terminal aesthetics" (poster: near-black screen of blue ASCII/dot-matrix widgets with an orange highlight band) — [post](https://x.com/GaloAndStuff/status/2043385811375202393)
- 2026-04-11, 03-28, 03-26 · @shihaabbbb · fonts; brand works for piro; brand work in progress — [post](https://x.com/shihaabbbb/status/2042942429461135584), [post](https://x.com/shihaabbbb/status/2037891574869446935), [post](https://x.com/shihaabbbb/status/2037169959303106923)
- 2026-04-11 · @hrshbika · "Some keyframes from the recent motion work" — [post](https://x.com/hrshbika/status/2042929968863416358)
- 2026-04-10 · @iliazolotukhin · interactive investment calculator, "Built with Claude inside Cursor" — [post](https://x.com/iliazolotukhin/status/2042628306101768529)
- 2026-04-11 · @shedsgns · "integration settings panel ~ dark" (image: dark panel listing Google, Claude Code etc. with orange toggles) — [post](https://x.com/shedsgns/status/2042830000664305765)
- 2026-04-11 and 03-29 · @AdityaSur11 · music players made in Figma; "Folder animation" (poster: dark folder with document cards peeking out, "Folder Micro-Interaction") — [post](https://x.com/AdityaSur11/status/2042897948560797853), [post](https://x.com/AdityaSur11/status/2038187155571323256)
- 2026-04-10 · @dakshpixelup · brand universe translated into a product design system — [post](https://x.com/dakshpixelup/status/2042584289439813871)
- 2026-04-09 · @stfnco · "Current mood: Duotone" (image: charcoal + cream ticket layout "EASY FAST 25%", technical line graphics, QR) — [post](https://x.com/stfnco/status/2042210683832643607)
- 2026-04-09 · @creativemints · Framer project walkthrough (Artemis theme) — [post](https://x.com/creativemints/status/2042263230014218427)
- 2026-04-10 · @disarto_max · "Service console [UI element]" (image: light card with green uptime bars and a worker table) — [post](https://x.com/disarto_max/status/2042648512861556804)
- 2026-04-07 · @yiannifive · custom playground for experiments, "all built with @claudeai" — [post](https://x.com/yiannifive/status/2041329981049937964)
- 2026-04-05 · @adriankuleszo · "Components for N3XT" (poster: light card with an orange dot-matrix meter and "24%") — [post](https://x.com/adriankuleszo/status/2040829390855278689)
- 2026-04-06 · @MillionPageProj · Chapel: store favourite things and see how they relate — [post](https://x.com/MillionPageProj/status/2041231284484366742)
- 2026-04-06 · @cyrilXBT · Obsidian vault rendered as a 3D thought network — [post](https://x.com/cyrilXBT/status/2041153633048297757)
- 2026-04-06 and 04-02 · @ayushsoni_io · "designing interactive data viz systems w/ claude code"; "case study coming" — [post](https://x.com/ayushsoni_io/status/2041105530987712614), [post](https://x.com/ayushsoni_io/status/2039646966527971556)
- 2026-04-03 · @prem_uiux · "Took a break from Bentos. Flame's still on" — [post](https://x.com/prem_uiux/status/2039974654786613286)
- 2026-04-02 · @shariar_design · "This is how clean dark UI should feel" (images: neutral dark dashboards, notification panel, grey line chart) — [post](https://x.com/shariar_design/status/2039727279799222708)
- 2026-04-02 · @m_adams · Republic: city monitoring map app — [post](https://x.com/m_adams/status/2039805602789265918)
- 2026-04-02 · @jshguo · "From last year. Some things age well." — [post](https://x.com/jshguo/status/2039679126798578047)
- 2026-04-01 (two posts) · @pdotcv · 3D cards with timescale controls (quotes @praveenisomer); Linear agent announcement explored as trading cards, "The cards @mymind just launched look great" — [post](https://x.com/pdotcv/status/2039313204845629578), [post](https://x.com/pdotcv/status/2039277755200610361)
- 2026-03-30 · @BPBartholomew · "The world's electricity infrastructure, mapped." — [post](https://x.com/BPBartholomew/status/2038674574015959182)
- 2026-03-31 · @estebanmoro · updated "Atlas of Inequality" — [post](https://x.com/estebanmoro/status/2038995623660204409)
- 2026-03-31 · @Ahmedcreatives · "SigmaAi / Brand direction" — [post](https://x.com/Ahmedcreatives/status/2038979242403496268)
- 2026-04-01 · @AlbiaHossain · "Typeface mono btw..." — [post](https://x.com/AlbiaHossain/status/2039329942727770407)
- 2026-03-31 · @CharlesPattson · "Designers building their own bespoke design tools is exactly the future" — [post](https://x.com/CharlesPattson/status/2038960363786399760)
- 2026-03-31 · @ThijsVerreck · "tmux-ide 2.0 soon!" — [post](https://x.com/ThijsVerreck/status/2039019165869125891)
- 2026-03-31 · @yeasindesign · product design showcase — [post](https://x.com/yeasindesign/status/2038990175246962798)
- 2026-03-30 · @onusoz · acpx v0.4 "Agentic Graphs": node-based workflows over Agent Client Protocol — [post](https://x.com/onusoz/status/2038565725690900992)
- 2026-03-30 · @akhakim_ · "sneakpeek from recent dashboard" — [post](https://x.com/akhakim_/status/2038536756459687978)
- 2026-03-28 · @aureliensalomon · "Interactive hero section" (poster: black hero, face built from dots/ASCII particles, orange CTA) — [post](https://x.com/aureliensalomon/status/2037877371940851906)
- 2026-03-29 · @xikhar · Linux desktop customisation showcase — [post](https://x.com/xikhar/status/2038186852499501127)
- 2026-03-29 · @maptheclouds · "Polygon city tiles": base context first, buildings layer in progressively (D3.js + OSM Buildings) — [post](https://x.com/maptheclouds/status/2038285056696016993)
- 2026-03-29 · @radbar_1 · "The world craves amber." (@rive_app) — [post](https://x.com/radbar_1/status/2038315635512328627)
- 2026-03-28 · @tranmautritam · "The design speaks for itself" — [post](https://x.com/tranmautritam/status/2037856950227239235)
- 2026-03-29 · @bilawalsidhu · Strait of Hormuz shutdown visualised from AIS tracking data — [post](https://x.com/bilawalsidhu/status/2038143105493348730)
- 2026-03-27 · @UltraLinx · "I like the black and white, gritty, pixelated texture" (quotes @jeffinvenice "Emergence brand exploration for @OpenAI": black phone screens, dithered hand holding a glowing dithered orb) — [post](https://x.com/UltraLinx/status/2037469318552973628)
- 2026-03-26 · @HeyAnsariUX · typography and spacing tip — [post](https://x.com/HeyAnsariUX/status/2037148076952215686)
- 2026-03-26 · @taylor_ · "youve seen light mode, youve seen dark mode, but have you ever seen sunny mode?" (poster: cream UI with mono text and soft window-light) — [post](https://x.com/taylor_/status/2037173278767243528)
- 2026-01-18 · @disarto_max · "Some of the product design pieces from this week" — [post](https://x.com/disarto_max/status/2012928924171321451)

### Inferences
- The owner reposts in bursts (very dense 26 Mar – 14 Apr 2026 and 24 May – 8 Jun 2026) and switches from single showcases in spring to "list of libraries" posts from August onward; the autumn reposts are the ones that name benchmark libraries.
- Many spring showcases map one-to-one onto demos that now exist in INTRX (see section 6), so the reposts have already been used as a build backlog once.

### Gaps
- Video content was not played, so motion quality, easing and interaction details in about 60 video posts are unverified.
- The repost dates themselves are not exposed by X; only original post dates are known.
- The ninth site in @Hartdrawss's "9 sites" post and the target of @theharshith_'s "cool website" video are not named in the post text.
- Reposts older than 26 Mar 2026 that are not design-related (about 16 items, 2024–2025) were read but deliberately not logged.

## 2. Which libraries and sites recur most? (de-duplicated, ranked)

### Takeaway
Originkit is the single most recurring library (5 reposts), followed by beUI (4) and then transitions.dev, 21st.dev and Aceternity UI (3 each); Jakub Antalik's work (transitions.dev, libraries.dev, orbs) appears in 4 separate list posts. Pretext is the most reposted single technology (6 reposts in two days), and ASCII/dither tools form the largest thematic cluster.

### Cited Findings

Ranked table (count = number of distinct reposts naming it; sources are the posts in section 1)

| Rank | Library / site | Reposts | What it is | Licence / pricing | Source openly reusable in a redistributed library? |
|---|---|---|---|---|---|
| 1 | originkit.dev | 5 (+1 probable) | "Free Animated component library for modern websites"; 813 components, 92 sections | Free with login; no licence page found | Unknown; treat as no |
| 2 | beui.dev | 4 | 233 React + 76 React Native animated components | MIT (free); Pro $249 lifetime | Yes for free tier (MIT, keep notice) |
| 3 | transitions.dev | 3 | 48+ UI transitions, builder, motion agent/skill | Custom licence; Pro tier | No: "may not redistribute the library itself" |
| 3 | 21st.dev | 3 | Community registry, "12,000+" components/templates/themes | ToS; 2 free copies/day, membership | No: ToS bars redistribution |
| 3 | ui.aceternity.com | 3 | 100+ free components, 200+ blocks | Proprietary licence; All-Access $169–$199 | No |
| 6 | libraries.dev | 2 | Free UI effect libraries (Beam, Orb, Gooey, Metal, Image) + on-device ML models | Core libraries MIT; Pro plan | Yes for the MIT cores (keep notice) |
| 6 | astryx.atmeta.com | 2 | Meta's open-source design system, 190+ components | MIT | Yes |
| 6 | bencho.dev | 2 | ~190 interactive blocks + sounds | Free blocks MIT; Pro €99/yr | Free blocks yes; Pro no |
| 6 | open-design.ai | 2 | Open-source AI design agent workspace | Apache-2.0 | Tool, not a component source |
| 6 | styles.refero.design | 2 | 2,000+ DESIGN.md style files | Not stated | Reference only |
| 6 | 60fps.design | 2 | 2,150 recorded iOS interaction "shots" | Free + PRO | Reference only |
| 6 | coss.com/ui | 2 | Cal.com's design system; 56 components, 531 "particles" | MIT | Yes |
| 6 | colorion.co tools (kinetics, 404) | 2 | Kinetics: 162 spring-physics animations; 404 CSS snippets | Kinetics repo has no licence file | No licence granted |
| 6 | madebyhex (Motion GPU, Motion Core) | 2 | WebGPU shader framework; Svelte motion components | MIT | Yes |
| 14 | shadcn/ui | 1 direct (+2 ecosystem: mapcn, shadcn-svelte) | Component distribution standard | MIT | Yes |
| 14 | reactbits.dev | 1 | 226 animated components incl. 65 backgrounds | MIT + Commons Clause | No |
| 14 | Magic UI | 1 | 150+ components and effects | MIT; Pro $199 | Yes for free tier |
| 14 | motion-primitives.com | 1 | Motion components for shadcn projects | MIT | Yes |
| 14 | cult-ui.com | 1 | 134 "motion-rich, niche" shadcn components | MIT | Yes |
| 14 | animate-ui.com | 1 | Animated primitives for Radix/Base UI/React Aria | MIT + Commons Clause | No (original form) |
| 14 | kibo-ui.com | 1 | 41 components, 28 blocks, 1,101 patterns | MIT | Yes |
| 14 | horizonx.so, obsidianui.dev, boardui.com, reverseui.com, beautifului.dev, hairline.lucasmarkes.com, evilbuttons.com, canvasui.dev, mapcn, component.gallery, unsection.com, navbar.gallery, footer.design, cta.gallery, 404s.design, bentogrids.com, jiro.build, cuedesign.space, cursor-lab-ui, shaders.com, backgrounds.supply, grainient.supply, pryzm.design, ui-skills.com, and about 60 other single mentions | 1 each | See sections 1 and 3 | See section 3 | See section 3 |

- Originkit is named in three @neropursue lists, one "built with originkit.dev" showcase and the @originkit account's own "New components just dropped" post — [Nov 12](https://x.com/neropursue/status/2120762111961776163), [Sep 14](https://x.com/neropursue/status/2099449677556977844), [Aug 17](https://x.com/neropursue/status/2089263766428950683), [Aug 18](https://x.com/Praha37v/status/2089850343412916581), [Jul 12](https://x.com/originkit/status/2076258058188296332)
- beUI is named in four posts, once as pro.beui.dev for "animated React backgrounds & UI blocks" — [Nov 12](https://x.com/neropursue/status/2120762111961776163), [Sep 14](https://x.com/neropursue/status/2099449677556977844), [Aug 17](https://x.com/csaba_kissi/status/2089235628710109528), [Aug 16](https://x.com/ImranUxi/status/2088951277782970449)
- transitions.dev, libraries.dev and the "thinking orb" are all by Jakub Antalik: transitions.dev says "Created by Jakub Antalik" and libraries.dev lists "Thinking orbs" among its libraries — [transitions.dev](https://transitions.dev), [libraries.dev](https://libraries.dev)
- Pretext was reposted via six posts on 28–29 Mar 2026; the repo describes it as "Fast, accurate & comprehensive text measurement & layout" with about 51k stars — [repo](https://github.com/chenglou/pretext), [example repost](https://x.com/nykdotdev/status/2038186160514605556)
- ASCII/dither tooling appears in at least seven reposts: Ditherit, ASCII Studio (twice), a self-built ASCII tool, an ASCII landing page, dotmatrix and an ASCII brand identity — [Ditherit](https://x.com/Prasanjit_ui/status/2037495387976565240), [ASCII Studio](https://x.com/vansh1029/status/2038247303216287770), [ascii tool](https://x.com/faydkr/status/2043050004709839046), [ASCII landing](https://x.com/basit_designs/status/2043409177482232317), [dotmatrix](https://x.com/zzzzshawn/status/2054146347251781848), [ASCII identity](https://x.com/Vaibhavpaul_UI/status/2058811744051703970)
- three.js is the named technology in at least eight reposts (three by @MengTo) — [Sep 6](https://x.com/MengTo/status/2096510126244999366), [Aug 17](https://x.com/MengTo/status/2089252548473688076), [Aug 7](https://x.com/MengTo/status/2085765403729653877), [hologram particles](https://x.com/Aurelien_Gz/status/2060464174153523264), [portfolio](https://x.com/dantmatt/status/2060014029259616463), [3D card](https://x.com/kaolti/status/2060107896927473837), [neural signals](https://x.com/sabosugi/status/2039637282945388712), [halftone globe](https://x.com/maptheclouds/status/2040112089994309864)
- Most reposted creators: @its_sslvr 7, @neropursue 5, @Lukeedesigner 4, @radbar_1 4, and 3 each for @MengTo, @csaba_kissi, @Praha37v, @uihssn, @disarto_max, @shihaabbbb — counted from the log in section 1, e.g. [its_sslvr](https://x.com/its_sslvr/status/2092129852514029770)

### Inferences
- The owner's benchmark set is the 2026 "animated component gallery" cohort (Originkit, beUI, Bencho, transitions.dev, React Bits, Aceternity, Reverse UI) rather than general-purpose design systems; shadcn/ui, Mantine, Astryx and coss appear only inside lists.
- Because list posts are written by a few promoters (@neropursue runs Inspora and reposts his own lists), recurrence partly measures those authors' preferences. The stronger taste signal is the single showcases in section 4.

### Gaps
- The probable sixth Originkit mention (the "Galaxy Ring" editor screenshot) could not be confirmed because the post gives no URL.
- Repost counts cannot be weighted by how long the owner engaged with each library; a repost is a bookmark, not proof of use.

## 3. Per-library facts: stack, size, licence, and whether code may be copied or ported into INTRX

### Takeaway
Cleanly reusable (MIT or Apache-2.0, notice required): Magic UI, shadcn/ui, Motion Primitives, Cult UI, Kibo UI, coss ui, beUI free tier, Bencho free blocks, Astryx, ObsidianUI, BoardUI free tier, hairline, Evil Buttons, Motion Core, Spektral, mapcn, Pretext and the libraries.dev core libraries. Not reusable in a distributed catalog: React Bits, Canvas UI and Animate UI (MIT + Commons Clause), transitions.dev (custom anti-competing-library clause), Aceternity UI, 21st.dev, Reverse UI, Bencho Pro, and anything with no licence (Kinetics, Originkit).

### Cited Findings

Restrictive licences (quotes)
- React Bits is "MIT + Commons Clause License Condition v1.0". Verbatim: "You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**" The grant itself is limited to distributing the Software "**as part of an application, website, or product**" — [LICENSE.md](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)
- React Bits extends the same restriction to its tools and exports: "You may not sell or redistribute the exports on their own, either individually or as the product itself, such as a sound, texture, background, or template pack." — [LICENSE.md](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)
- Canvas UI (same author, David Haz) uses the same clause: "so long as you do not sell, sublicense, or redistribute the components themselves - whether alone, in a bundle, or as a ported version." — [LICENSE.md](https://github.com/DavidHDev/canvas-ui/blob/main/LICENSE.md)
- Animate UI is "MIT + Commons Clause License Condition": "so long as you do not sell or redistribute the components themselves in their original form—whether alone or in a bundle." — [LICENSE.md](https://github.com/imskyleen/animate-ui/blob/main/LICENSE.md)
- transitions.dev has its own licence. Verbatim: "Restriction: you may not redistribute the library itself. You may not repackage, resell, or publish the collection (or a substantial part of it) as a competing transitions library, motion pack, or animation kit. Use the transitions in your products, not as a product of their own." — [LICENSE](https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE)
- transitions.dev allows use inside templates/UI kits only "with a Pro, Business, or Lifetime plan", only when "the transitions are part of a larger design, not the main thing being sold", and "A motion or animation pack whose main selling point is the transitions is not allowed." Its tooling (CLI, agent) is MIT — [LICENSE](https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE)
- Aceternity UI's licence page (as reported by page fetch) says: "You cannot re-distribute the Item as a stock image or its source files, regardless of modifications." and "You cannot create themes, templates, or derivative products to sell on any marketplace."; the site footer reads "© 2026 Aceternity Labs LLC. All Rights Reserved." — [licence](https://ui.aceternity.com/licence), [components](https://ui.aceternity.com/components)
- 21st.dev's terms (as reported by page fetch) prohibit "Redistributing, selling, or licensing any content from the Marketplace without authorization" and "Scraping or automatically collecting data from the Marketplace", and require "a clear and visible link back to the original component page" when copying components to other websites. The platform's own repo is MIT, but components belong to "their respective authors and 21st Labs Inc." — [terms](https://21st.dev/terms), [repo licence](https://github.com/serafimcloud/21st/blob/main/LICENSE)
- Bencho: "The free blocks are MIT." For Pro blocks, verbatim: "You may not: Pass the blocks or sounds on as themselves: not sell, share, sublicense or publish them on their own, or as part of a UI kit, component library, template, theme, starter, snippet collection or sound pack; not use them to build a library, service or MCP server that hands blocks to other people; and not put them into a dataset for training models." — [licence](https://bencho.dev/licence)
- Bencho notes its own in-block photographs "are licensed to this site and are not ours to pass on", and that blocks taken under MIT before 12 October 2026 "stay MIT for whoever took them then" — [licence](https://bencho.dev/licence)
- Magic UI Pro: "Use the templates for commercial projects. Re-selling of code is NOT allowed." (as reported by page fetch) — [pro.magicui.design](https://pro.magicui.design)
- Kinetics' repository has no licence file (GitHub reports licence: null), so no reuse rights are granted by default — [repo](https://github.com/ckissi/kinetics)
- Originkit shows no licence or terms page (both /terms and /license return 404) and gates "Get this Component" behind login — [originkit.dev](https://www.originkit.dev/), [component page](https://www.originkit.dev/components/tornado)
- backgrounds.supply (as reported by page fetch): "Reselling or redistributing them as a standalone product is not allowed."; Pro is $49 one-time — [backgrounds.supply](https://backgrounds.supply)

Permissive licences (verified at the repo)
- Magic UI: MIT, copyright "Magic UI", no extra restrictions; about 23.6k stars — [LICENSE.md](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md), [repo](https://github.com/magicuidesign/magicui)
- shadcn/ui: MIT — [LICENSE.md](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- Motion Primitives: MIT (copyright 2024 ibelick) — [LICENCE.md](https://github.com/ibelick/motion-primitives/blob/main/LICENCE.md)
- Cult UI: MIT (copyright 2023 Jordan-Gilliam) — [LICENSE.md](https://github.com/nolly-studio/cult-ui/blob/main/LICENSE.md)
- Kibo UI: MIT; repo now lives at shadcnblocks/kibo, about 4.0k stars — [license.md](https://github.com/shadcnblocks/kibo/blob/main/license.md)
- coss ui: MIT; repo cosscom/ui (formerly origin-space/originui), about 11.2k stars, "the official design system of Cal.com" — [repo](https://github.com/cosscom/ui)
- beUI: MIT (copyright 2026 Saurabh Chauhan), about 2.0k stars; Pro is a separate paid licence — [LICENSE](https://github.com/starc007/ui-components/blob/main/LICENSE), [beui.dev](https://beui.dev)
- Astryx: MIT (copyright 2026 Meta Platforms, Inc.), about 33.6k stars — [LICENSE](https://github.com/meta/astryx/blob/main/LICENSE)
- ObsidianUI: MIT, 642 stars — [LICENSE](https://github.com/Atharvsinh-codez/ObsidianUI/blob/main/LICENSE)
- BoardUI free tier: MIT, about 1.3k stars — [repo](https://github.com/BoardUI/boardui)
- hairline: MIT, about 4.2k stars, repo created 2026-10-01 — [repo](https://github.com/lucasmarkes/hairline)
- Evil Buttons: Apache-2.0 — [repo](https://github.com/radiumcoders/Evil-Buttons)
- Motion Core: MIT (Svelte + GSAP + OGL), 588 stars; Spektral: MIT — [motion-core](https://github.com/kaltwrk/motion-core), [spektral](https://github.com/kaltwrk/spektral)
- mapcn: MIT, about 12.4k stars — [repo](https://github.com/AnmolSaini16/mapcn)
- Pretext: MIT, with bundled Chromium BSD-style notices that must be kept — [LICENSE](https://github.com/chenglou/pretext/blob/main/LICENSE)
- Mantine: MIT; ui-skills: MIT; open-design: Apache-2.0 — [mantine](https://github.com/mantinedev/mantine/blob/master/LICENSE), [ui-skills](https://github.com/ibelick/ui-skills), [open-design](https://github.com/nexu-io/open-design)
- libraries.dev states its five core libraries (Beam, Orb, Gooey, Metal, Image) are MIT-licensed and "free on npm" — [libraries.dev](https://libraries.dev)
- beautifului.dev (by the studio Turbo) links an "MIT License" in its footer — [beautifului.dev](https://beautifului.dev)

First-hand looks (size, stack, pricing, what each does well)
- Originkit: nav is two toggles, "Components | Sections" and "Creative | Functional"; headline "Discover 813 Components" and "Discover 92 Sections"; functional view has sort tabs "Trending / Recently Added / Most Copied" and ten categories (Carousels; Galleries & Card Stacks; Cards & Badges; Navigation; Tabs & Selectors; Inputs & Forms; Text Effects; Buttons & Toggles; Sliders & Progress; Widgets & Media) — [home](https://www.originkit.dev/), [functional](https://www.originkit.dev/functional), [sections](https://www.originkit.dev/sections)
- Originkit component pages show view and copy counts ("19,917" views, "Used by 2,126"), a category chip, "Used in Sections: Hero 18", presets via URL (`?preset=variant-2`), "Editor Mode", a key-features list and a full props table; "Tornado" is "A WebGL particle tornado" that "Respects prefers-reduced-motion and recovers gracefully if WebGL is unavailable" — [Tornado](https://www.originkit.dev/components/tornado)
- Originkit's creative items use evocative names rather than functional ones (Glimmer Vale, Plush Tile, Corolla Gleam, Single Glass Keyboard, Vector Wordmark, Cloud Sky, Velour Bolster, Tornado, Venom Button, Accretion Disc) — [home](https://www.originkit.dev/)
- beUI: nav "Components, Charts, Interactions, Sounds, React Native, Resources"; categories Components, AI Agents, Blocks, Charts, Micro Interactions, Sounds, Casino; 233 React and 76 React Native components; Framer Motion + Tailwind + shadcn CLI; a "For agents" footer group (Agent guide, MCP server, llms.txt) — [beui.dev](https://beui.dev)
- beUI live tiles include Bell Sound, Bubble Sound, Before After Slider, Magnetic Button, Plane Crash Game, Bloom Menu, OTP Input, Card Folder, Wheel Picker, Like Button, Color Picker, Download Button, Dynamic Island, Prompt Input, Project Folder, Wave Slider, Send Button, Plinko, Star Rating, Bookshelf — [beui.dev](https://beui.dev)
- transitions.dev: nav "Products, Community, Docs, Pricing"; products are Library, Builder, Motion Agent, Motion Skill, MCP; library filters "All, Essential, AI Agents, Effects, Texts, Pro"; about 6.5k stars — [site](https://transitions.dev), [repo](https://github.com/Jakubantalik/transitions.dev)
- transitions.dev's 47 listed transitions include Card resize, Number pop-in, Notification badge, Text states swap, Gooey plus menu, Page side-by-side, Avatar group hover, Card stack hover, Input clear with dissolve, Drag & drop with physics, Organic shimmer, Dropdown menu morph, Image open tilt, Spinner to check morph, Delete with smoky dissolve, Thinking states, Reasoning stream, Streaming text, Matrix dot loader, Banner stacking, Image generation placeholder, To-do reorder, Magnetic slider, Icon morph — [site](https://transitions.dev)
- transitions.dev distributes each transition as a self-contained CSS snippet with custom properties and reduced-motion guards, plus a CLI (`npx transitions-dev add <name>`) and an agent skill — [repo](https://github.com/Jakubantalik/transitions.dev)
- libraries.dev: nav "Products, Libraries, Models (New), Skill, How to use, Studio, Get Pro, Pricing"; items are Border beam, Thinking orbs, Gooey, Voice, Voice ring, Distortion waves, Magnetic UI (New), Voice position, Mood recognition, Bot avatars, Liquid Metal, Image generation; packages have "zero runtime dependencies" except Image generation (three); claims "20,800,000+ installs" — [libraries.dev](https://libraries.dev)
- React Bits: nav "Components, Installation, Tools, Pro"; five categories with (by tally) Text Animations 33, Animations 42, Components 52, Micro Interactions 34, Backgrounds 65 = 226; each component ships in JS or TS and plain CSS or Tailwind; about 52.9k stars — [index](https://www.reactbits.dev/get-started/index), [repo](https://github.com/DavidHDev/react-bits)
- React Bits Pro: 255 components (Starter $129), 400 page blocks + 300 app UI blocks (Pro $249), 18 templates (Ultimate $349), one-time — [pro.reactbits.dev](https://pro.reactbits.dev)
- Aceternity UI: nav "Components, Blocks, Pages, Interactions (New), Templates, Resources, Pricing"; "All 100+ components", "All 200+ blocks"; free tier $0, 1-Year $169, Lifetime $199, Team $1,590 — [components](https://ui.aceternity.com/components), [pricing](https://ui.aceternity.com/pricing)
- Aceternity's newest "Interactions" group: Preview Slider, Burn Carousel, Liquid Carousel, Pixel Prompt Button, Direction Aware Selection, Image Wave, Paper Plane Globe, Paper Plane Send, Fluid Notch, Matrix Trail, Speed Counter, Gooey Waitlist, Compare Slider, Infinite Card Grid, Grid Zoom Image, Hover Image Links, Gravity Trail, Disintegrating Gallery, Image Particles — [components](https://ui.aceternity.com/components)
- Magic UI: nav "Components, Templates, Showcase"; sidebar groups Components, Special Effects, Animations, Text Animations, Device Mocks, Buttons, Backgrounds, Community; newest items include Dither, Dotted Map, Glare Hover, Light Rays, Noise Texture, Floating 3D Particles, Glyph Matrix, Text 3D Flip — [docs](https://magicui.design/docs/components), [home](https://magicui.design)
- Bencho: nav "Blocks, Sounds, Finds, Bench, Pricing"; about 190 blocks each tagged by one interaction verb (Press, Drag, Hover, Loading, Type, Swipe, Select, Slide); Free, Pro €99/year, Forever one-time; by Lorenzo Cabra — [bencho.dev](https://bencho.dev), [pricing](https://bencho.dev/pricing), [licence](https://bencho.dev/licence)
- Reverse UI: 69 components, 19 free "full source"; Essential $39 (list $100) and Team $175 one-time; React + Framer Motion — [pricing](https://reverseui.com/pricing), [home](https://reverseui.com)
- Kinetics: nav "Library, Physics, Generator, About"; "162 animations, 99 React examples, 153 AI prompts"; two categories "Interaction & Input" and "Feedback & State"; described as "interface animations built on spring physics instead of fixed-duration easing" — [site](https://kinetics.colorion.co), [repo](https://github.com/ckissi/kinetics)
- Cult UI: nav "Blocks, Components, AI components, skills"; 134 components in 13 groups, including Landing Pages (Hero Dithering, Hero Liquid Metal), Illustrations (15), Media & Mockups, Backgrounds & Effects (Fluted Glass, Dither Image, Distorted Glass), Typography (Pixel Heading, LightBoard) — [docs](https://www.cult-ui.com/docs)
- Kibo UI: nav "Docs, Components (41), Blocks (28), Patterns (1101)"; groups by product domain (Collaboration, Project Management, Code, Forms, Images, Finance, Social, Callouts) — [components](https://www.kibo-ui.com/components)
- HorizonX: "The premium UI & code library for the vibecoding era"; nav "Explore, Tools, MCP, Pricing, Affiliate, Resources"; "1000+" products; tags include "3D & Perspective, ASCII, Dither Text, Riso Glow, Retro Matrix"; $24.99 / $39.99 / $99.99 per month, no free library tier — [horizonx.so](https://horizonx.so)
- Astryx: "An open source design system that's fully customizable and agent ready"; nav "Docs, Components, Templates, Themes, Playground"; "Over 190" components; React 19 + StyleX; "Currently in Beta" — [astryx.atmeta.com](https://astryx.atmeta.com)
- BoardUI: "React Design System for Agentic Interface"; 105 components including 19 charts; React 19.2, Tailwind v4, React Aria; Free, €149, €199 lifetime, €349 startups — [boardui.com](https://boardui.com)
- coss ui: nav "Docs, Particles, Chat UI"; React + Base UI + Tailwind; 531 particles — [coss.com/ui](https://coss.com/ui)
- ObsidianUI: "Design less. Ship better."; React + Tailwind with Motion, GSAP, canvas or WebGL; 13 documented components (Active Sessions, Art Gallery, Draggable Marquee, Flip Text, Hover Image, Parallax Slider, v-prism and others) — [home](https://obsidianui.dev), [components](https://obsidianui.dev/components)
- beautifului.dev: "Crafted primitives for AI-native interfaces"; 21 numbered components (Loading State, Thinking, Streaming Text, Approval Card, Tool Chips, Task Rows, Chat, Prompt Bar, Recommendation Card, Context Cards, Diff Table, Records Table, Filter Table, Sidebar Nav, Search, Flowchart, Insight Cards, Code Block, Fine-tune Card, Selection Actions, Agent Screen) — [beautifului.dev](https://beautifului.dev)
- hairline: "Line drawings that answer the pointer"; thirty-three isometric SVG figures, no dependencies, "usable with React or plain DOM" — [hairline](https://hairline.lucasmarkes.com)
- Canvas UI: "tasteful html-in-canvas components"; 38 effects (Blaze, Liquid, Glass, Shatter, Particle Reveal, VHS, Laser, Clouds, Bubble, Droplets, Magnify, Grid, Ripple); ships React, Solid, Preact, Vue, Svelte and vanilla TypeScript — [canvasui.dev](https://canvasui.dev)
- Evil Buttons: five shadcn/Motion buttons (AshBurstButton, MinecraftButton, RevealButton, CommandButton, CopyButton) — [evilbuttons.com](https://evilbuttons.com)
- shaders.com: GPU effects library for Vue, React, Svelte, Solid and JS on WebGPU, free core plus paid Pro presets — [shaders.com](https://shaders.com)
- Reference galleries: 60fps.design has 2,150 shots from 499 apps; component.gallery has 60 components, 95 design systems, 2,671 examples; navbar.gallery has 519 navbars; unsection lists 13 section types; jiro.build claims 1,565+ prompt-packaged templates/components at $99 lifetime — [60fps](https://60fps.design), [component.gallery](https://component.gallery), [navbar.gallery](https://www.navbar.gallery), [unsection](https://unsection.com), [jiro](https://jiro.build)
- Background sources: backgrounds.supply has 1,983 backgrounds in 53 collections (36 animated), with collections named "Nocturne", "Night Rise", "Midnight Silk", "Rust Grain"; grainient.supply lists 387 grainy, 511 smooth, 90 animated and 556 AI-generated gradients — [backgrounds.supply](https://backgrounds.supply), [grainient.supply](https://grainient.supply)

### Inferences
- INTRX is itself a distributed component catalog with planned Pro tier, so it is exactly the "bundle", "ported version", "competing library" or "component library" that the React Bits, Canvas UI, transitions.dev, Bencho Pro and Aceternity clauses exclude. Porting React Bits code to vanilla JS does not escape its licence, because "ported version" is named explicitly.
- Animate UI's clause only names redistribution "in their original form", so a vanilla rewrite is arguably outside it, but that reading is untested and the safe course is to treat it as restricted.
- MIT sources can be ported, but every port must carry the original copyright and permission notice in the repo and in INTRX's portable exports, because the exports redistribute the code.
- The repo's own rule in `AGENTS.md` ("Never copy code or assets from reference sites; new components are original implementations") conflicts with the owner's new instruction to "use other libraries and their code as needed". The owner needs to amend that rule explicitly, and limit it to the permissive list above, before any porting starts.
- The "no runtime dependencies in the site" rule means even MIT libraries (Pretext, three, Motion) cannot be imported; their techniques must be re-implemented or vendored as source with notices.
- Stock background packs (backgrounds.supply, grainient.supply) forbid redistribution "as a standalone product"; INTRX exports that embed the image inside a demo are a grey area, so dark abstract imagery is safer generated in-house (shader, dither, gradient) or taken from sources with explicit redistribution rights.

### Gaps
- Aceternity's and 21st.dev's quotes come from an automated page fetch, not a raw licence file; wording should be re-checked on the pages before relying on it.
- No licence text was found for Originkit, Reverse UI, HorizonX, grainient.supply, shaders.com or 60fps.design; HorizonX only states that "A commercial license is included".
- libraries.dev's MIT claim was read on the site only; the individual package repos were not located.
- motion-primitives.com returned HTTP 403 to the fetch, so its current component list and Pro pricing were not read; only its repo licence was verified.
- Pro prices for transitions.dev and libraries.dev are not shown on the pages read.

## 4. Taste profile inferred from the reposts

### Takeaway
The owner keeps reposting restrained, technical, mostly monochrome work with a single warm accent (usually orange), built from dither, ASCII, dot-matrix and halftone textures, FUI/terminal typography and WebGL particles. Dark abstract imagery is a clear recurring motif, but light "paper" layouts with hairline grids also appear, so the constant is restraint and texture rather than darkness alone.

### Cited Findings
- Neutral palette plus one orange accent recurs: grayscale visual system with one orange button — [keilethh](https://x.com/keilethh/status/2044105900038697072); black/white motion piece with an orange square — [Jaxoriginals](https://x.com/Jaxoriginals/status/2089973882929426577); dark settings panel with orange toggles — [shedsgns](https://x.com/shedsgns/status/2042830000664305765); orange dot-matrix meter — [adriankuleszo](https://x.com/adriankuleszo/status/2040829390855278689); orange 3D discs on cards — [praveenisomer](https://x.com/praveenisomer/status/2059311097337741782); black hero with orange CTA — [aureliensalomon](https://x.com/aureliensalomon/status/2037877371940851906)
- Dither, ASCII, dot-matrix and halftone textures are the most repeated visual device: "I like the black and white, gritty, pixelated texture" — [UltraLinx](https://x.com/UltraLinx/status/2037469318552973628); pixelated gradient assets — [Velaskdzn](https://x.com/Velaskdzn/status/2079929465153430005); ASCII-textured hero — [uihssn](https://x.com/uihssn/status/2058739682771652612); "luxury+minimalism+ASCII art" — [basit_designs](https://x.com/basit_designs/status/2043409177482232317); dot-matrix poster cards — [its_sslvr](https://x.com/its_sslvr/status/2061660355898818595); procedural halftone globe — [maptheclouds](https://x.com/maptheclouds/status/2040112089994309864); Ditherit — [Prasanjit_ui](https://x.com/Prasanjit_ui/status/2037495387976565240)
- FUI, terminal and industrial spec-sheet typography: "FUI exploration // 003. Secret agent manager dashboard" — [stevelauda_](https://x.com/stevelauda_/status/2052909042104954963); "terminal aesthetics" — [GaloAndStuff](https://x.com/GaloAndStuff/status/2043385811375202393); "Neo Industrial design style" — [kyleanthony](https://x.com/kyleanthony/status/2037860081614606711); duotone ticket layout — [stfnco](https://x.com/stfnco/status/2042210683832643607); wireframe technical posters — [its_sslvr](https://x.com/its_sslvr/status/2092129852514029770)
- Dark abstract imagery (relevant to replacing photo slots): fluid smoke gradients on dark posters, acid green and red — [its_sslvr Rosso+corsa](https://x.com/its_sslvr/status/2091027587326005421); red/orange textured glow and a blue-violet arc on black heroes — [uihssn](https://x.com/uihssn/status/2058739682771652612); dithered glowing orb on black — [UltraLinx](https://x.com/UltraLinx/status/2037469318552973628); pixel rocket trail on a dark poster — [immarupng](https://x.com/immarupng/status/2043287305243525173); white particle vortex on black — [Originkit Tornado](https://www.originkit.dev/components/tornado); green particle hourglass hero "built with originkit.dev" — [Praha37v](https://x.com/Praha37v/status/2089850343412916581)
- Gradient and grain background resources were reposted twice as collections — [ImranUxi](https://x.com/ImranUxi/status/2088951277782970449), [uihssn](https://x.com/uihssn/status/2067537266902483163)
- WebGL, three.js, particles and shaders: "particles + threejs is the cheat code for banger interactive animations" — [Aurelien_Gz](https://x.com/Aurelien_Gz/status/2060464174153523264); "Liquid Glass, shaders, motion design, procedural three.js models" — [MengTo](https://x.com/MengTo/status/2096510126244999366); "only a fool could walk away from shader lab" — [bewaretherat](https://x.com/bewaretherat/status/2049543024280006677); card hover with 3D shape sculpting — [kaolti](https://x.com/kaolti/status/2060107896927473837)
- Micro-interaction polish, stated as a value: "Clean and Smooth Animations is the key" — [uiuxarih](https://x.com/uiuxarih/status/2060310948393435355); "the death of the 'are you sure?' popup" — [Aurelien_Gz](https://x.com/Aurelien_Gz/status/2038344175356121547); folder micro-interaction — [AdityaSur11](https://x.com/AdityaSur11/status/2038187155571323256); MacBook notch case study — [Nomandsign](https://x.com/Nomandsign/status/2039418879659962476); CSS-only scroll-snap carousels — [chazza](https://x.com/chazza/status/2038277660850205099)
- The owner's own words on two reposted pieces: "Subtle and clean." on a three-panel hover animation, and "The colors and branches look great. Unique." on an earthy branching data visual — [adamhmwn](https://x.com/adamhmwn/status/2059818530359726227), [kuxshl](https://x.com/kuxshl/status/2059874258126594461)
- AI/agent UI patterns as design objects: "AI agent overview [UI element]" — [disarto_max](https://x.com/disarto_max/status/2049893848717951272); "Token Usage Component" — [jeetnirnejak](https://x.com/jeetnirnejak/status/2058894004532691102); agent cards "Swarm Orchest / Neural Dispatch / Cognitive Observer" — [its_sslvr](https://x.com/its_sslvr/status/2052956858768556205); node-based "Agentic Graphs" — [onusoz](https://x.com/onusoz/status/2038565725690900992)
- Data visualisation and maps recur: cinematic dashboard forecast lines — [mnowakdesign](https://x.com/mnowakdesign/status/2060013326760022147); trading terminal — [timothymaarv](https://x.com/timothymaarv/status/2059896713486213625); mapcn — [HowToPrompt__](https://x.com/HowToPrompt__/status/2049855474997367013); electricity infrastructure map — [BPBartholomew](https://x.com/BPBartholomew/status/2038674574015959182); AIS shipping visualisation — [bilawalsidhu](https://x.com/bilawalsidhu/status/2038143105493348730); map roulette — [measure_plan](https://x.com/measure_plan/status/2052739524275405202)
- Editorial serif with classical art ("Renderaissance") appears three times — [pwnies](https://x.com/pwnies/status/2076375340734357646), [DopeOblivion](https://x.com/DopeOblivion/status/2062925685119729928), [BThreeAgency](https://x.com/BThreeAgency/status/2090015464110121469)
- Light, hairline-grid "instrument" layouts with mono numerals also recur — [seb__design](https://x.com/seb__design/status/2079909906367623428), [eugeneniidesign](https://x.com/eugeneniidesign/status/2060800489592070278), [taylor_ "sunny mode"](https://x.com/taylor_/status/2037173278767243528)
- Isometric line illustration appears four times — [eugeneniidesign](https://x.com/eugeneniidesign/status/2060800489592070278), [Praha37v](https://x.com/Praha37v/status/2060669103170519429), [uxbybhakti](https://x.com/uxbybhakti/status/2053829359119810945), [hairline in csaba_kissi's list](https://x.com/csaba_kissi/status/2112443894319489423)
- Typography as a topic: font shortlists and mono/pixel faces — [yahyavision](https://x.com/yahyavision/status/2060385101100339340), [marcelkargul](https://x.com/marcelkargul/status/2049918766570524913), [AlbiaHossain](https://x.com/AlbiaHossain/status/2039329942727770407), [astarcodes on GeistPixel](https://x.com/astarcodes/status/2060323413261226413)
- "Clean dark UI" is named directly once, with neutral grey dashboards as the example — [shariar_design](https://x.com/shariar_design/status/2039727279799222708)
- Glass appears mainly through three.js "Liquid Glass buttons" and glassy 3D cards — [MengTo](https://x.com/MengTo/status/2096510126244999366), [kaolti](https://x.com/kaolti/status/2060107896927473837)

### Inferences
- INTRX's house rule "neutral greys + one accent per demo" matches the reposts closely; orange is the accent the owner sees most often in work they endorse.
- For photo-slot replacement, the best-evidenced direction is monochrome or duotone abstract imagery with visible texture: dithered or halftone orbs and horizons, particle vortices, fluid smoke in one saturated hue on black, and pixelated gradient fields. Clean stock gradients are less supported than textured ones.
- Skeuomorphic and tactile controls are thinly represented in the reposts (music players, mymind cards, a Rive pond) even though INTRX has 75 Skeuomorph and DRAMS items; the reposts do not ask for more of them.
- Spring physics is the motion idiom of the benchmark libraries (Kinetics is built on it and transitions.dev markets "physics"), consistent with INTRX's 380/32 and 170/26 springs; the reposts give no evidence of a different preferred easing.
- The repeated "made with Claude / Opus 5 / Cursor" framing suggests the owner values work that an agent can reproduce, which fits INTRX's prompt-per-demo model.

### Gaps
- Motion taste (durations, easing, stagger) could not be measured because videos were not played.
- Colour claims rest on small poster frames viewed at reduced scale; exact hues were not sampled.
- Four no-text image posts (two by @ciguleva, one each by @konrad_designs and @marina_uiux) were not opened, so they do not inform the profile.

## 5. "Upcoming websites": new, soon-to-launch and newly versioned libraries and tools

### Takeaway
The reposts announce few true waitlists; most "upcoming" signal is recent launches from mid-2026 (Bencho, BoardUI, Canvas UI, hairline, Kinetics, Astryx) and features flagged "New" or "coming" on the sites as of 28 Nov 2026. The clearest pending items are Kinetics Pro (waitlist), Cue's React source and MCP ("actively rolling out"), BoardUI's "Canvas" early access and ASCII Studio's star-gated launch.

### Cited Findings
- ASCII Studio was pre-launch on 2026-03-29: "571 stars left before the tool launch"; an editor page followed on 2026-04-12 — [post](https://x.com/vansh1029/status/2038247303216287770), [post](https://x.com/vansh1029/status/2043320733858763240)
- "tmux-ide 2.0 soon!" (2026-03-31) — [post](https://x.com/ThijsVerreck/status/2039019165869125891)
- Dashfolio N2 launched 2026-03-29 after "8 months of work", with a launch offer — [post](https://x.com/cedric_design/status/2038240166683554211)
- Originkit: "New components just dropped" (2026-07-12) — [post](https://x.com/originkit/status/2076258058188296332)
- @MengTo offered three times to open-source his three.js projects ("Let me know which one should I release", 2026-09-06) — [post](https://x.com/MengTo/status/2096510126244999366), [post](https://x.com/MengTo/status/2089252548473688076), [post](https://x.com/MengTo/status/2085765403729653877)
- Inspora (design inspiration from X) reported "our biggest day since launch", 10K visitors (2026-08-26) — [post](https://x.com/neropursue/status/2092511038499377389)
- Motion GPU added Vue 3 and a playground (2026-04-11); motion-gpu.dev now redirects to spektral.madebyhex.com, "Minimalist framework for modern WebGPU visuals" — [post](https://x.com/madebyhex/status/2042935139613704475), [spektral](https://spektral.madebyhex.com/)
- "case study coming" for an interactive data-viz system (2026-04-02) — [post](https://x.com/ayushsoni_io/status/2039646966527971556)
- Kinetics Pro has a waitlist: "Production-ready React versions of these effects are coming." — [kinetics](https://kinetics.colorion.co)
- Cue: React source code and an MCP server are "actively rolling out"; free users get 2 prompt copies per 24 hours — [cuedesign.space](https://cuedesign.space)
- BoardUI: banner for "Canvas by BoardUI" early access, badge "BoardUI Pro is out", lifetime price labelled a "launch discount"; repo created 2026-09-01 — [boardui.com](https://boardui.com), [repo](https://github.com/BoardUI/boardui)
- libraries.dev: "Models" and "Magnetic UI" are marked New; support outside React for the remaining libraries is "coming soon" — [libraries.dev](https://libraries.dev)
- Astryx is "Currently in Beta"; blog post "Astryx is now available in v0" dated 2026-11-14; repo created 2026-01-09 — [astryx](https://astryx.atmeta.com), [repo](https://github.com/meta/astryx)
- Aceternity UI added a top-level "Interactions (New)" section and shows a "Coming Soon" block — [components](https://ui.aceternity.com/components)
- Magic UI's home banner is "Introducing Dither" — [magicui.design](https://magicui.design)
- shadcn/ui's home "New" badge links to "Trace, Code Block and AI Elements"; nav now includes "Typeset" and "Create" — [ui.shadcn.com](https://ui.shadcn.com)
- coss ui marks "Composer" as New and has a "Chat UI" nav item — [coss.com/ui](https://coss.com/ui)
- Bencho moved from all-free to free + Pro on 2026-10-12 — [licence](https://bencho.dev/licence)
- hairline is new (repo created 2026-10-01, v0.5.1) and says sponsorship funds "the next figures" — [hairline](https://hairline.lucasmarkes.com), [repo](https://github.com/lucasmarkes/hairline)
- Canvas UI is new (repo created 2026-07-16) and depends on Chrome 157+ for live HTML-in-Canvas, with HTML fallback elsewhere — [canvasui.dev](https://canvasui.dev), [repo](https://github.com/DavidHDev/canvas-ui)
- Kinetics repo was created 2026-06-24; ObsidianUI 2026-01-10; Evil Buttons 2026-04-28; open-design 2026-04-28 — [kinetics](https://github.com/ckissi/kinetics), [ObsidianUI](https://github.com/Atharvsinh-codez/ObsidianUI), [Evil Buttons](https://github.com/radiumcoders/Evil-Buttons), [open-design](https://github.com/nexu-io/open-design)
- Reverse UI promises "69+ components (many more expected)" and lets buyers "Vote on new components" — [pricing](https://reverseui.com/pricing)
- jiro.build marks "Jiro Builder" as New and lists an MCP server and Chrome extension — [jiro.build](https://jiro.build)
- 60fps.design marks "Community" as NEW and offers an MCP — [60fps.design](https://60fps.design)
- Seasonal pricing live on 28 Nov 2026: beUI Pro $249 shown at $199.20 "until Dec 1"; jiro.build $99 (regular $199) — [beui.dev](https://beui.dev), [jiro.build](https://jiro.build)

### Inferences
- The competitive set is very young: Bencho, BoardUI, Canvas UI, hairline, Kinetics and Evil Buttons all appeared in 2026, and several moved to free + Pro within months. A 520-item free catalog is large relative to them (Bencho ~190, React Bits 226, beUI 233), but Originkit claims 813.
- "Interactions" is becoming a first-class product line next to "Components" and "Blocks" (Aceternity, beUI), which is the space INTRX already occupies.
- Chrome's HTML-in-Canvas API (Canvas UI) is the one genuinely new platform capability in the reposts and is a candidate for a future INTRX category once support widens.

### Gaps
- No repost announces a waitlist with a launch date; "upcoming" items are mostly inferred from site badges read on one day.
- "Astra" (@MengTo) could not be identified as a product page; only the post describes it.
- Whether ASCII Studio, tmux-ide 2.0 and the "prompt to 3D particle system" tool have since launched was not checked.

## 6. How the best sites organise a large catalog (actual navigation labels)

### Takeaway
Large catalogs split by KIND at the top level (Components / Blocks or Sections / Backgrounds / Text / Interactions / Templates) and by FUNCTION in the sidebar, then add cross-cutting facets: interaction verb (Bencho), gesture/pattern/effect/element (60fps), sort by trending/new/most copied (Originkit), and "New"/"Pro" badges. Agent tooling (MCP, llms.txt, skills, CLI) now sits in primary navigation on most of them.

### Cited Findings

Top-level navigation labels (verbatim)
- React Bits: "Components, Installation, Tools, Pro"; categories "Text Animations, Animations, Components, Backgrounds, Micro Interactions" — [reactbits.dev](https://reactbits.dev)
- Aceternity UI: "Components, Blocks, Pages, Interactions (New), Templates, Resources, Pricing" — [components](https://ui.aceternity.com/components)
- Magic UI: "Components, Templates, Showcase" — [magicui.design](https://magicui.design)
- beUI: "Components, Charts, Interactions, Sounds, React Native, Resources" — [beui.dev](https://beui.dev)
- transitions.dev: "Products, Community, Docs, Pricing" with Products = "Library, Builder, Motion Agent, Motion Skill, MCP" — [transitions.dev](https://transitions.dev)
- libraries.dev: "Products, Libraries, Models, Skill, How to use, Studio, Get Pro, Pricing" — [libraries.dev](https://libraries.dev)
- Originkit: "Components | Sections" and "Creative | Functional" toggles — [originkit.dev](https://www.originkit.dev/)
- Bencho: "Blocks, Sounds, Finds, Bench, Pricing" — [bencho.dev](https://bencho.dev)
- Cult UI: "Blocks, Components, AI components, skills" — [cult-ui.com](https://www.cult-ui.com/docs)
- Kibo UI: "Docs, Components (41), Blocks (28), Patterns (1101)" — [kibo-ui.com](https://www.kibo-ui.com/components)
- shadcn/ui: "Home, Docs, Components, Blocks, Charts, Directory, Typeset, Create" — [ui.shadcn.com](https://ui.shadcn.com)
- Astryx: "Docs, Components, Templates, Themes, Playground" — [astryx](https://astryx.atmeta.com)
- BoardUI: "Components, Templates, Docs, Blog" — [boardui.com](https://boardui.com)
- coss ui: "Docs, Particles, Chat UI" — [coss.com/ui](https://coss.com/ui)
- Kinetics: "Library, Physics, Generator, About" — [kinetics](https://kinetics.colorion.co)
- HorizonX: "Explore, Tools, MCP, Pricing, Affiliate, Resources" — [horizonx.so](https://horizonx.so)
- 60fps.design: "Shots (2150), Apps (499), App Sites (96), Motion (98), Snippets (32), Community, MCP, Jobs, Storyboards (67)" — [60fps.design](https://60fps.design)
- component.gallery: "Components, Design systems, About" — [component.gallery](https://component.gallery)
- unsection: "Sections, Types, Industries, Fonts, OG images, Templates" — [unsection.com](https://unsection.com)
- navbar.gallery: "Navbars, Mobile, Types, Styles, Blog" — [navbar.gallery](https://www.navbar.gallery)
- jiro.build: "Library, Jiro Builder, MCP, Pricing, Affiliate, Contact" — [jiro.build](https://jiro.build)
- hairline: "Figures, Skills, Docs, Inspo" — [hairline](https://hairline.lucasmarkes.com)

Second-level structure and facets
- Aceternity groups its sidebar by function: Backgrounds & Effects, Card Components, Scroll & Parallax, Text Components, Buttons, Loaders, Navigation, Inputs & Forms, Overlays & Popovers, Carousels & Sliders, Layout & Grid, Data & Visualization, Cursor & Pointer, 3D, plus "Labs" for one-off recreations — [components](https://ui.aceternity.com/components)
- Bencho tags every block with one interaction verb: "Press, Drag, Hover, Loading, Type, Swipe, Select, Slide" — [bencho.dev](https://bencho.dev)
- 60fps.design exposes four orthogonal filter groups: Gestures (15, e.g. Drag, Flick, Hold, Pinch, Scrub), Patterns (39, e.g. Onboarding, Empty State, Shared Element, Streak), Effects (26, e.g. Morph, Shimmer, Spring Physics, Skeuomorphic, Sound) and Elements (30, e.g. Bottom Sheet, Picker, Segmented Control, Liquid Glass), 113 filters in all — [60fps.design](https://60fps.design)
- Originkit sorts by "Trending / Recently Added / Most Copied", shows view and copy counts on every card, and cross-links components to the sections that use them — [functional](https://www.originkit.dev/functional), [Tornado](https://www.originkit.dev/components/tornado)
- transitions.dev filters by tier and theme in one row: "All, Essential, AI Agents, Effects, Texts, Pro" — [transitions.dev](https://transitions.dev)
- Kinetics uses two behavioural categories, "Interaction & Input" and "Feedback & State", and reports three counts side by side ("162 animations, 99 React examples, 153 AI prompts") — [kinetics](https://kinetics.colorion.co)
- Kibo UI groups by product domain (Collaboration, Project Management, Code, Forms, Images, Finance, Social, Callouts) rather than by widget type — [kibo-ui.com](https://www.kibo-ui.com/components)
- Cult UI groups by product surface and tags items "new", "updated" or "recent"; it leads with an "AI" group split into "Inputs" and "Generative UI" — [cult-ui.com](https://www.cult-ui.com/docs)
- Magic UI separates "Community" contributions from core groups and marks Pro templates in the same sidebar — [docs](https://magicui.design/docs/components)
- navbar.gallery filters by Types, Style, Format, Technical (e.g. "GSAP", "Framer Template"), Industry and Platform — [navbar.gallery](https://www.navbar.gallery)
- HorizonX uses aesthetic tags as facets: "3D & Perspective, ASCII, Dither Text, Riso Glow, Retro Matrix" — [horizonx.so](https://horizonx.so)
- Refero Styles tags by aesthetic ("Cream paper & serif", "Neon crypto dark", "Riso zine print") and sorts "Trending, Popular, Newest" — [styles.refero.design](https://styles.refero.design)
- React Bits offers each component in four variants (JS or TS, CSS or Tailwind) — [reactbits.dev](https://reactbits.dev)
- Agent tooling in primary navigation or footer: beUI ("Agent guide, MCP server, llms.txt"), transitions.dev ("Motion Skill, MCP"), libraries.dev ("Skill"), Cult UI ("MCP Server, LLMs & Agents"), HorizonX, 60fps and jiro ("MCP") — [beui.dev](https://beui.dev), [transitions.dev](https://transitions.dev), [libraries.dev](https://libraries.dev), [cult-ui.com](https://www.cult-ui.com/docs), [horizonx.so](https://horizonx.so), [60fps.design](https://60fps.design), [jiro.build](https://jiro.build)
- INTRX today has one flat level of 26 categories of very uneven size: DRAMS 52, Layout & UI 47, Raster & Glitch 31, Buttons & Micro 30, down to Framer Collection 4, Maps & Geo 6 and Sound & Haptics 7 — `C:\Users\tanzir\Desktop\interaction\registry\index.json`

### Inferences
- INTRX's 26 flat categories mix three different axes: kind (Buttons, Forms, Loaders), technique (Raster & Glitch, SVG & Line, Physics, 3D) and provenance (DRAMS, Framer Collection, Interactive Showcase). Benchmarks keep provenance out of the taxonomy; those three could become tags or "collections".
- A two-level scheme fits the evidence: 5–7 top-level KINDS (for example Interactions, Text, Backgrounds & Ambient, Data & Maps, Agent & AI, Objects & Skeuomorph, Play & Sound) with the present categories as second level, plus facets for trigger verb (Hover, Press, Drag, Scroll, Type, Idle), technique (CSS, SVG, Canvas, WebGL, Audio) and badge (New, Pro, Reduced-motion still).
- "Trending / Recently Added / Most Copied" sorting and visible copy counts are cheap social proof that INTRX lacks; INTRX already tracks `trigger` and `tier` in stage metadata, so a trigger facet needs no new data.
- "Backgrounds" is a headline category at React Bits (65), Aceternity and Magic UI; INTRX files the equivalent under "Ambient" (18), a less searchable name.
- "Sections/Blocks" (hero, footer, CTA, pricing, 404) is the largest product line INTRX does not have, and the reposted galleries (navbar.gallery, footer.design, cta.gallery, 404s.design, unsection) show the owner looks at that layer.

### Gaps
- 21st.dev's live navigation and category counts did not render to the fetcher; only its marketing text was read.
- Search behaviour (command palettes, fuzzy search, tag search) was not tested on any site.
- motion-primitives.com and animate-ui.com sidebars were not readable, so their grouping is not recorded.

## 7. Component ideas seen in reposts that a 520-component interaction catalog should have

### Takeaway
About fifteen reposted demos already exist in INTRX under the same or a near-identical name, which confirms the reposts are a working backlog. The clearest missing ideas are a Dynamic Island/notch, text that reflows around a moving object (Pretext-style), a token-throughput card, uptime-bar service console, 3D-object cards, scan-line image loading, a dockable widget layout, a forecast fan chart, and a whole "Sections" layer (hero, footer, CTA, 404).

### Cited Findings

Reposted ideas INTRX already covers (title match in `registry/index.json`)
- "Neural Network Signals" (three.js CodePen) ↔ INTRX "Neural Signals" — [post](https://x.com/sabosugi/status/2039637282945388712)
- Procedural halftone-dot globe ↔ INTRX "Halftone Globe" — [post](https://x.com/maptheclouds/status/2040112089994309864)
- "Interactive Table with Image Hover & Idle Animation" ↔ INTRX "Table Row Preview" and "Image Peek List" — [post](https://x.com/CodePen/status/1951345714413355305)
- "Folder animation" micro-interaction ↔ INTRX "Folder Peek" — [post](https://x.com/AdityaSur11/status/2038187155571323256)
- dotmatrix with dot shapes ↔ INTRX "Dot Matrix", "Dot Matrix Reveal", "Matrix Dot Loader" — [post](https://x.com/zzzzshawn/status/2054146347251781848)
- ASCII tools and landing pages ↔ INTRX's eight ASCII demos (Luminance, Wave, Donut, Fire, Fluid, Portrait, Morph, Type Explode) — [post](https://x.com/vansh1029/status/2038247303216287770)
- Dithered dot art ↔ INTRX "Bayer Dither", "Error-Diffusion Resolve", "Dithered Logo" — [post](https://x.com/Prasanjit_ui/status/2037495387976565240)
- CSS scroll-snap carousel ↔ INTRX "Snap Carousel" — [post](https://x.com/chazza/status/2038277660850205099)
- FUI dashboards ↔ INTRX's ten "FUI & Terminal" demos — [post](https://x.com/stevelauda_/status/2052909042104954963)
- Voxel lighting ↔ INTRX "Voxel Assemble" — [post](https://x.com/DanFessler/status/2060504009111433631)
- Polygon city tiles ↔ INTRX "City Blocks" — [post](https://x.com/maptheclouds/status/2038285056696016993)
- Trading cards and 3D cards ↔ INTRX "Holo Flip Badge", "Satin Foil Card", "Tilt and Glare" — [post](https://x.com/pdotcv/status/2039277755200610361)
- Library-derived titles already in INTRX: "Encrypted Card", "Wobble Card", "3D Pin", "3D Marquee", "Hero Parallax", "Sticky Scroll Reveal", "Lamp Glow", "Meteors", "Vortex", "Background Boxes", "Multi-Step Loader", "Vanish Input" mirror Aceternity names; "Matrix Dot Loader" and "Smoke Delete" mirror transitions.dev; "Caesar Cipher", "Award Badge", "Proximity Nav" mirror Reverse UI; "Foggy Word", "Blueprint Loader", "Trace Loader", "Escape Button", "Share Pill" mirror Bencho — [Aceternity](https://ui.aceternity.com/components), [transitions.dev](https://transitions.dev), [Reverse UI](https://reverseui.com), [Bencho](https://bencho.dev)

Reposted ideas with no clear INTRX counterpart (candidates)
- Dynamic Island / notch morph: "near-perfect MacBook notch for the web"; beUI ships "Dynamic Island", Bencho ships "Dynamic island", "Flight island", "Music island", "Call island", Cult UI ships "Dynamic Island", Aceternity ships "Fluid Notch" and "Notch" — [post](https://x.com/Nomandsign/status/2039418879659962476), [beui.dev](https://beui.dev), [bencho.dev](https://bencho.dev)
- Text reflow around a moving obstacle (Pretext demos: a dragon moving through manuscript text, a playable game inside a paper) — [post](https://x.com/Riyvir/status/2038093450139279426), [post](https://x.com/andrewjiang/status/2038273711237984564)
- Token usage card showing "live usage, throughput and cost" as a live line — [post](https://x.com/jeetnirnejak/status/2058894004532691102)
- Agent overview card (identity, tools, activity strip) — [post](https://x.com/disarto_max/status/2049893848717951272)
- Service console with uptime bars and a worker table — [post](https://x.com/disarto_max/status/2042648512861556804)
- Integration settings list with animated toggles — [post](https://x.com/shedsgns/status/2042830000664305765)
- Dot-matrix percentage/usage meter — [post](https://x.com/adriankuleszo/status/2040829390855278689)
- Card hover that sculpts a 3D object (gem, coin) inside the card — [post](https://x.com/kaolti/status/2060107896927473837), [post](https://x.com/praveenisomer/status/2059311097337741782)
- Three-panel "services" hover expansion, which the owner called "Subtle and clean." — [post](https://x.com/adamhmwn/status/2059818530359726227)
- No-confirm destructive action (Rauno Freiberg's alternative to "are you sure?") — [post](https://x.com/Aurelien_Gz/status/2038344175356121547)
- Scan-line image loading ("Add a scan effect to the card images while they load") and wireframe-scan intro — [post](https://x.com/MengTo/status/2089252548473688076)
- Liquid Glass button with border lighting on hover and pointer-driven gradient — [post](https://x.com/MengTo/status/2096510126244999366)
- Pointer orbit parallax and "particles to pointer" for a 3D hero — [post](https://x.com/MengTo/status/2089252548473688076)
- Cloth-simulated image — [post](https://x.com/MengTo/status/2085765403729653877)
- Hologram particle model — [post](https://x.com/Aurelien_Gz/status/2060464174153523264)
- Galaxy ring / particle hourglass vortex with cursor repel — [post](https://x.com/Praha37v/status/2089348019426930908), [Originkit Tornado](https://www.originkit.dev/components/tornado)
- Dither-with-hover-physics on an arbitrary image — [post](https://x.com/Prasanjit_ui/status/2037495387976565240)
- Dot/ASCII particle face hero — [post](https://x.com/aureliensalomon/status/2037877371940851906)
- Dockable widget layout ("expand, minimize, resize, collapse, widgets") — [post](https://x.com/timothymaarv/status/2059896713486213625)
- Forecast fan chart with dashed scenario lines and a legend tooltip — [post](https://x.com/mnowakdesign/status/2060013326760022147)
- Branching/dendritic network data visual — [post](https://x.com/kuxshl/status/2059874258126594461), [post](https://x.com/tejashinduja/status/2058946514698060246)
- Interactive investment calculator — [post](https://x.com/iliazolotukhin/status/2042628306101768529)
- Map roulette / neighbourhood gacha — [post](https://x.com/measure_plan/status/2052739524275405202)
- Globe with HTML tooltips — [post](https://x.com/madebyhex/status/2038223362917282155)
- 3D knowledge graph of notes — [post](https://x.com/cyrilXBT/status/2041153633048297757)
- Node-based agent workflow graph ("Agentic Graphs") — [post](https://x.com/onusoz/status/2038565725690900992)
- "Sunny mode" theme with window-light shadows — [post](https://x.com/taylor_/status/2037173278767243528)
- Metric slider with blurred gradient bars and mono figures — [post](https://x.com/seb__design/status/2079909906367623428)
- Generative poster cards (dot-matrix "Sentient" series, glitch matrix) — [post](https://x.com/its_sslvr/status/2061660355898818595), [post](https://x.com/its_sslvr/status/2052956858768556205)
- Point-cloud model morph (animals) — [post](https://x.com/Oriku175/status/2058899636069265604)
- Animated pond (Rive) as an ambient/play piece — [post](https://x.com/radbar_1/status/2060347628718571717)
- Music player controls — [post](https://x.com/AdityaSur11/status/2042897948560797853)
- Pointer-reactive isometric line figures (hairline) — [post](https://x.com/csaba_kissi/status/2112443894319489423), [hairline](https://hairline.lucasmarkes.com)
- Animated circle SVG loaders and 404-page animations — [post](https://x.com/csaba_kissi/status/2092865608341926390)
- Sections layer: footers, hero sections, sign-up page, problem/solution section — [footer](https://x.com/amnadesignn/status/2075962836036300876), [footers](https://x.com/NotHsuyeep26/status/2063934939243159998), [heroes](https://x.com/uxsweta/status/2060609654141632548), [sign-up](https://x.com/alexroyhe/status/2043151698928206300), [problem/solution](https://x.com/alikashifmr/status/2042921785188893071)

Gaps visible from the benchmark libraries' own indexes
- React Bits lists 65 backgrounds (for example Dark Veil, Silk, Liquid Chrome, Grainient, Faulty Terminal, Hyperspeed, Balatro) against INTRX's 18 "Ambient" items — [React Bits](https://www.reactbits.dev/get-started/index)
- beUI and Bencho ship a "Sounds" product line and beUI ships "Charts" and "Casino" lines; INTRX has 7 sound items and 15 data items — [beui.dev](https://beui.dev), [bencho.dev](https://bencho.dev)
- Bencho names not present in INTRX's titles include VPN, Seat map, Audio trim, Dice, 3D bar chart, Crumpled receipt, Folding bill, Pull to refresh, Canvas toolbar, Todo tower, Eye tracker, Step player, Voice note, Standing calendar and Liquid tooltip — [bencho.dev](https://bencho.dev)
- React Bits "Micro Interactions" not present in INTRX's titles include Shredder, Paper Crumple, Slosh Gauge, Sling Button, Jelly Radio, Comet Dial, Code Slots, Fuse Button and Squish Switch — [React Bits](https://www.reactbits.dev/get-started/index)
- Cult UI and Magic UI ship device mockups (Safari, iPhone, Apple Watch, Pro Display) and Cult UI ships 15 animated "Illustrations"; INTRX has neither group — [cult-ui.com](https://www.cult-ui.com/docs), [Magic UI](https://magicui.design/docs/components)

### Inferences
- Coverage of the reposted demos is already high; the roadmap gain is less in more one-off effects and more in (a) the missing product surfaces (Dynamic Island, Sections, device mocks, backgrounds at volume) and (b) upgrading existing demos' imagery to the dithered, monochrome-plus-orange look the reposts favour.
- Several "missing" ideas are parameter or preset extensions of existing demos (dot shape for Dot Matrix, galaxy-ring preset for Vortex, HTML tooltips for Globe Arcs), which Originkit-style presets would surface without new components.
- Names borrowed from benchmark libraries are fine, but any code for them must stay original or come only from the MIT/Apache sources in section 3; React Bits' Micro Interactions and Backgrounds are ideas only.
- The "INTRX covers this" matches are by title only; equivalence of behaviour was not checked against the videos.

### Gaps
- Whether INTRX's "Inline Confirm", "Smoke Delete" or "Hold to Pay" already implement the Rauno pattern is unknown because the video was not played.
- Title matching may miss INTRX demos that cover an idea under a different name, or over-count where the same name hides a different interaction.
- Bencho's and React Bits' item names were read from index pages; their actual interactions were not inspected one by one.
