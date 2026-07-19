# INTRX — The Interaction Library

A curated, copy-paste reference of the web interactions used by award-winning design agencies. **318 hand-built patterns** — each with a live demo, a single-file code snippet, and a ready-to-paste LLM prompt. The original roadmap is complete and the likes-driven expansion is underway.

## Website & demo

- 🌐 Site (the library IS the demo): <https://tanzir71.github.io/interaction/>
- ▲ Vercel mirror: <https://intrx.vercel.app/>
- 🤖 Agent-readable index: <https://tanzir71.github.io/interaction/llms.txt>

**Live categories:** Scroll (22) · Cursor (25) · Text & Type (23) · Image & WebGL (23) · Raster & Glitch (29) · Skeuomorph (20) · SVG & Line (10) · 3D & Perspective (12) · Physics (10) · Liquid & Organic (10) · Galleries & Sliders (12) · Navigation & Menus (12) · Buttons & Micro (15) · Forms & Inputs (10) · Loaders & Progress (10) · Data & Numbers (6) · Ambient (10) · Sound & Haptics (6) · Play & Easter Eggs (8) · Layout & UI (21).
**Expansion categories live:** Maps & Geo (6) · FUI & Terminal (10) · Agent & AI UI (8).
**Roadmap:** All 236 original handoff items are published; 47 of 56 likes-driven expansion items are live, with 9 queued.

## Architecture

INTRX is a **zero-build static site** — no framework, no bundler, no dependencies to install. Three layers:

```
index.html            the shell (nav, search, card grid)
css/style.css         design system (tokens, cards, tabs)
js/app.js             the renderer:
                        • builds category nav + cards from the registry
                        • lazy-boots each demo only when scrolled into view
                        • tabs (Demo / Code / LLM Prompt), copy buttons, ⌘K search
js/demos.*.js         the content: one registry file per category,
                      each pattern registered as a plain JS object
                      { id, title, cat, html, css, js, prompt, … }
```

Key design decision: every pattern is **self-contained data** (its own HTML/CSS/JS strings with a unique class prefix), so demos can't leak styles into each other, the whole library is greppable, and adding a pattern means appending one object — no build step, ever. GSAP/Lenis are pulled from CDN only inside snippets that need them.

Because it's pure static files, hosting is trivial: any static server locally, GitHub Pages in production.

## Run locally

No build step. Any static server works:

```bash
npx serve .
# or
python -m http.server
```

Then open http://localhost:3000 (or :8000).

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow that deploys the static site whenever `main` is pushed.

1. Create an empty GitHub repository, then connect and push this checkout:

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

2. If GitHub does not enable Pages automatically on the first run, select **Settings → Pages → Source: GitHub Actions** once, then re-run the `Deploy to GitHub Pages` workflow.
3. The site will be available at `https://<you>.github.io/<repo>/`. Every later push to `main` redeploys it automatically.

## Using a pattern

Every card has three tabs:

- **Demo** — the interaction running live.
- **Code** — a self-contained HTML + CSS + JS snippet (CDN tags included where GSAP/Lenis are used). Paste into any page.
- **LLM Prompt** — a precise specification of the interaction (easings, timings, math, accessibility notes). Paste into Claude or any model to rebuild it in React, Vue, Svelte, or your own stack.

`⌘K` / `Ctrl+K` searches the library.

## Structure

```
index.html          shell
css/style.css       design system
js/app.js           renderer: nav, tabs, lazy demo boot, copy, search
js/demos.*.js       demo registries by category (add yours here)
```

## Adding a pattern

Register an object in any `js/demos.*.js` file:

```js
INTRX.register({
  id: 'my-effect',            // unique, kebab-case
  title: 'My Effect',
  cat: 'Scroll',              // Scroll | Cursor | Text & Type | Image & WebGL | Layout & UI
  rootClass: 'd-myfx',        // unique class prefix used by html/css/js
  tags: ['whatever'],
  libs: [],                   // 'gsap' | 'scrolltrigger' | 'lenis'
  desc: 'One-paragraph description.',
  seen: 'Seen on: …',
  hint: 'hover me',
  html: `<div class="d-myfx">…</div>`,
  css:  `.d-myfx { … }`,
  js:   `/* receives root (the .d-myfx element) and stage */`,
  prompt: `Build …`,
});
```

Demos boot lazily when scrolled into view. Keep all class names prefixed with your `rootClass` so styles never collide.

## License

MIT — use anything here in any project, commercial or not.
