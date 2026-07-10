# INTRX — The Interaction Library

An exhaustive, copy-paste reference of the web interactions used by award-winning design agencies. **271 patterns**, each with a live demo, a single-file code snippet, and a ready-to-paste LLM prompt.

**Categories:** Scroll · Cursor · Text & Type · Image & WebGL · Raster & Glitch · Skeuomorph · SVG & Line · 3D & Perspective · Physics · Liquid & Organic · Galleries & Sliders · Navigation & Menus · Buttons & Micro · Forms & Inputs · Loaders & Progress · Layout & UI · Data & Numbers · Ambient · Sound & Haptics · Play & Easter Eggs.

## Run locally

No build step. Any static server works:

```bash
npx serve .
# or
python -m http.server
```

Then open http://localhost:3000 (or :8000).

## Deploy to GitHub Pages

1. Create a repo and push this folder:

```bash
git init
git add .
git commit -m "INTRX interaction library"
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

2. In the repo: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save**.
3. Your library is live at `https://<you>.github.io/<repo>/`.

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
