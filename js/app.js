/* ============================================================
   INTRX — app engine
   Renders the registry: nav, cards, tabs, lazy demo boot,
   copy system, search.
   ============================================================ */

(function () {
  const R = window.INTRX;
  if (!R || !R.demos.length) return;

  const CAT_ORDER = ['Scroll', 'Cursor', 'Text & Type', 'Image & WebGL', 'Raster & Glitch', 'Skeuomorph', 'SVG & Line', '3D & Perspective', 'Physics', 'Liquid & Organic', 'Galleries & Sliders', 'Navigation & Menus', 'Buttons & Micro', 'Forms & Inputs', 'Loaders & Progress', 'Layout & UI', 'Data & Numbers', 'Ambient', 'Sound & Haptics', 'Play & Easter Eggs'];
  const cats = CAT_ORDER.filter(c => R.demos.some(d => d.cat === c));

  const nav = document.getElementById('nav');
  const cardsEl = document.getElementById('cards');
  const pad = n => String(n).padStart(3, '0');

  async function copyText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {}
    const fallback = document.createElement('textarea');
    fallback.value = text;
    fallback.setAttribute('readonly', '');
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    const copied = document.execCommand('copy');
    fallback.remove();
    return copied;
  }

  /* ---------- build the copyable code block for a demo ---------- */
  function buildCode(d) {
    let out = '';
    if (d.libs && d.libs.length) {
      out += '<!-- CDN dependencies -->\n';
      d.libs.forEach(l => {
        if (l === 'gsap') out += '<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"><\/script>\n';
        if (l === 'scrolltrigger') out += '<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"><\/script>\n';
        if (l === 'lenis') out += '<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"><\/script>\n';
      });
      out += '\n';
    }
    out += '<!-- HTML -->\n' + d.html.trim() + '\n\n';
    out += '<style>\n' + d.css.trim() + '\n</style>\n\n';
    out += '<script>\nconst root = document.querySelector(".' + d.rootClass + '");\n\n' + d.js.trim() + '\n<\/script>';
    return out;
  }

  /* ---------- nav ---------- */
  let total = 0;
  cats.forEach(cat => {
    const items = R.demos.filter(d => d.cat === cat);
    const slug = 'cat-' + cat.toLowerCase().replace(/[^a-z]+/g, '-');
    const group = document.createElement('div');
    group.className = 'nav-group';
    group.innerHTML =
      '<div class="nav-group-label"><a href="#' + slug + '">' + cat + '</a><span class="n">' + pad(items.length) + '</span></div>';
    items.forEach(d => {
      total++;
      const a = document.createElement('a');
      a.className = 'nav-item';
      a.href = '#' + d.id;
      a.dataset.id = d.id;
      a.textContent = pad(total) + '  ' + d.title;
      group.appendChild(a);
    });
    nav.appendChild(group);
  });

  document.getElementById('count-pill').textContent = pad(R.demos.length);
  document.getElementById('hero-count').textContent = pad(R.demos.length);

  /* ---------- tiles ---------- */
  let idx = 0;
  cats.forEach(cat => {
    const divider = document.createElement('div');
    divider.className = 'cat-divider';
    divider.id = 'cat-' + cat.toLowerCase().replace(/[^a-z]+/g, '-');
    const catItems = R.demos.filter(d => d.cat === cat);
    divider.innerHTML =
      '<h2>' + cat + '</h2><span class="mono">' + pad(catItems.length) + ' patterns</span><span class="rule"></span>';
    cardsEl.appendChild(divider);

    catItems.forEach(d => {
      idx++;
      d._num = pad(idx);
      const card = document.createElement('article');
      card.className = 'tile';
      card.id = d.id;
      card.dataset.search = (d.title + ' ' + d.cat + ' ' + (d.tags || []).join(' ') + ' ' + d.desc).toLowerCase();

      card.innerHTML =
        '<div class="demo-stage"></div>' +
        '<div class="tile-frame">' +
          '<svg class="c-tl" viewBox="0 0 8 8"><path d="M0.5 7.5 V0.5 H7.5"/></svg>' +
          '<svg class="c-tr" viewBox="0 0 8 8"><path d="M0.5 0.5 H7.5 M7.5 0.5 V7.5"/></svg>' +
          '<svg class="c-bl" viewBox="0 0 8 8"><path d="M0.5 7.5 H7.5 M0.5 7.5 V0.5"/></svg>' +
          '<svg class="c-br" viewBox="0 0 8 8"><path d="M7.5 0.5 V7.5 H0.5"/></svg>' +
        '</div>' +
        '<span class="tile-label">' + d._num + ' · ' + d.title + '</span>' +
        (d.hint ? '<div class="demo-hint">' + d.hint + '</div>' : '');

      cardsEl.appendChild(card);
      d._card = card;
    });
  });

  /* ---------- lazy demo boot ---------- */
  const booted = new Set();
  function boot(d) {
    if (booted.has(d.id)) return;
    booted.add(d.id);
    const stage = d._card.querySelector('.demo-stage');
    /* scoped style */
    const style = document.createElement('style');
    style.textContent = d.css;
    document.head.appendChild(style);
    stage.innerHTML = d.html;
    const rootEl = stage.querySelector('.' + d.rootClass) || stage.firstElementChild;
    try {
      new Function('root', 'stage', d.js)(rootEl, stage);
    } catch (e) {
      console.error('[INTRX] demo "' + d.id + '" failed:', e);
      stage.innerHTML = '<p class="mono dim" style="padding:24px">demo failed to boot — see console</p>';
    }
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const d = R.demos.find(x => x.id === en.target.id);
        if (d) boot(d);
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '200px 0px' });
  R.demos.forEach(d => io.observe(d._card));

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    const setOpen = open => {
      document.body.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };
    navToggle.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
    /* close the drawer when a nav link is tapped or Escape is pressed */
    nav.addEventListener('click', e => { if (e.target.closest('.nav-item')) setOpen(false); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- nav active state ---------- */
  const sidebar = document.getElementById('sidebar');
  const navItems = [...document.querySelectorAll('.nav-item')];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navItems.forEach(n => n.classList.toggle('active', n.dataset.id === en.target.id));
        /* keep the active item visible inside the sidebar (desktop only —
           never auto-scroll the drawer while it's closed on mobile) */
        const active = navItems.find(n => n.dataset.id === en.target.id);
        const isDesktop = !navToggle || getComputedStyle(navToggle).display === 'none';
        if (active && sidebar && isDesktop) {
          const top = active.offsetTop - sidebar.clientHeight / 2;
          sidebar.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  R.demos.forEach(d => spy.observe(d._card));

  /* ---------- search ---------- */
  const search = document.getElementById('search');
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    nav.classList.toggle('searching', !!q);
    R.demos.forEach(d => {
      const hit = !q || d._card.dataset.search.includes(q);
      d._card.classList.toggle('hidden', !hit);
      const navItem = navItems.find(n => n.dataset.id === d.id);
      if (navItem) navItem.classList.toggle('hidden', !hit);
      if (hit) visible++;
    });
    document.getElementById('count-pill').textContent = pad(visible);
    /* hide empty category dividers */
    cats.forEach(cat => {
      const anyVisible = R.demos.some(d => d.cat === cat && !d._card.classList.contains('hidden'));
      const div = document.getElementById('cat-' + cat.toLowerCase().replace(/[^a-z]+/g, '-'));
      if (div) div.style.display = anyVisible ? '' : 'none';
    });
  });

  window.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      search.focus();
      search.select();
    }
    if (e.key === 'Escape' && document.activeElement === search) search.blur();
  });

  const agentCopy = document.getElementById('agent-copy');
  if (agentCopy) {
    agentCopy.addEventListener('click', async () => {
      const prompt = document.getElementById('agent-prompt');
      if (!prompt || !(await copyText(prompt.textContent.trim()))) return;
      agentCopy.textContent = 'Copied ✓';
      agentCopy.classList.add('copied');
      setTimeout(() => {
        agentCopy.textContent = 'Copy agent prompt';
        agentCopy.classList.remove('copied');
      }, 1400);
    });
  }
})();
