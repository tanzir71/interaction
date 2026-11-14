/* ============================================================
   INTRX — app engine
   Renders the registry: nav, cards, tabs, lazy demo boot,
   copy system, search.
   ============================================================ */

(function () {
  const R = window.INTRX;
  if (!R || !R.demos.length) return;
  const drams = R.demos.filter(d => d.cat === 'DRAMS').sort((a, b) => a.id.localeCompare(b.id));
  let dramsIndex = 0;
  R.demos = R.demos.map(d => d.cat === 'DRAMS' ? drams[dramsIndex++] : d);

  const CAT_ORDER = ['Interactive Showcase', 'Scroll', 'Cursor', 'Text & Type', 'Image & WebGL', 'Raster & Glitch', 'Skeuomorph', 'SVG & Line', '3D & Perspective', 'Physics', 'Liquid & Organic', 'Galleries & Sliders', 'Navigation & Menus', 'Buttons & Micro', 'Forms & Inputs', 'Loaders & Progress', 'Layout & UI', 'Data & Numbers', 'Maps & Geo', 'FUI & Terminal', 'Agent & AI UI', 'Ambient', 'Sound & Haptics', 'Play & Easter Eggs', 'Framer Collection', 'DRAMS'];
  const cats = CAT_ORDER.filter(c => R.demos.some(d => d.cat === c));

  const nav = document.getElementById('nav');
  const cardsEl = document.getElementById('cards');
  const pad = n => String(n).padStart(3, '0');
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

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
  function buildCode(d) { return R.buildCode(d); }

  /* ---------- nav ---------- */
  let total = 0;
  cats.forEach(cat => {
    const items = R.demos.filter(d => d.cat === cat);
    const slug = 'cat-' + cat.toLowerCase().replace(/[^a-z]+/g, '-');
    const group = document.createElement('div');
    group.className = 'nav-group';
    group.dataset.category = cat;
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

  const setCount = v => {
    document.getElementById('count-pill').textContent = pad(v);
    const m = document.getElementById('count-pill-mobile');
    if (m) m.textContent = pad(v);
  };
  setCount(R.demos.length);
  const newCount = document.querySelector('[data-filter="new"] span');
  if (newCount) newCount.textContent = R.demos.filter(d => ['Interactive Showcase', 'Framer Collection', 'DRAMS'].includes(d.cat)).length;
  const dramsCount = document.querySelector('[data-filter="drams"] span');
  if (dramsCount) dramsCount.textContent = drams.length;
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
    if (cat === 'Interactive Showcase') divider.classList.add('showcase-divider');
    cardsEl.appendChild(divider);

    catItems.forEach(d => {
      idx++;
      d._num = pad(idx);
      const card = document.createElement('article');
      card.className = 'tile';
      card.id = d.id;
      card.dataset.id = d.id;
      card.setAttribute('aria-labelledby', d.id + '-title');
      card.dataset.search = (d.title + ' ' + d.cat + ' ' + (d.tags || []).join(' ') + ' ' + d.desc + ' ' + (d.source ? d.source.name : '')).toLowerCase();

      card.innerHTML =
        '<div class="demo-stage stage" data-stage="'+escapeHtml(d.id)+'" data-mode="thumb" data-stage-theme="'+d.stage.theme+'" data-overflow="'+d.stage.overflow+'"></div>' +
        '<div class="tile-caption"><button class="tile-details" type="button" aria-label="' + escapeHtml(d.title) + ' — open details"><span class="tile-number">' + d._num + '</span><span id="' + d.id + '-title">' + escapeHtml(d.title) + '</span><span class="tile-arrow" aria-hidden="true">↗</span></button><p class="tile-hint">' + escapeHtml(d.hint) + '</p></div>' +
        '<div class="tile-frame">' +
          '<svg class="c-tl" viewBox="0 0 8 8"><path d="M0.5 7.5 V0.5 H7.5"/></svg>' +
          '<svg class="c-tr" viewBox="0 0 8 8"><path d="M0.5 0.5 H7.5 M7.5 0.5 V7.5"/></svg>' +
          '<svg class="c-bl" viewBox="0 0 8 8"><path d="M0.5 7.5 H7.5 M0.5 7.5 V0.5"/></svg>' +
          '<svg class="c-br" viewBox="0 0 8 8"><path d="M7.5 0.5 V7.5 H0.5"/></svg>' +
        '</div>';

      cardsEl.appendChild(card);
      d._card = card;
      card.querySelector('.tile-details').addEventListener('click', () => openModal(d));
    });
  });

  /* ---------- stage contract and bounded live previews ---------- */
  const liveTiles = R.liveTiles = new R.LiveTiles();
  function runDemo(d, stage) {
    return R.mountStage(d, stage, stage.closest('.modal-preview') ? 'full' : 'thumb');
  }
  R.demos.forEach(d => liveTiles.add(d, d._card));

  /* ---------- detail modal ---------- */
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modal-title');
  modal.innerHTML =
    '<button class="modal-close" type="button" aria-label="Close details">✕</button>' +
    '<div class="modal-head">' +
      '<span class="modal-num"></span>' +
      '<h3 class="modal-title" id="modal-title"></h3>' +
      '<div class="modal-tags"></div>' +
    '</div>' +
    '<div class="modal-preview"><div class="demo-stage"></div>' +
      '<button class="modal-reset" type="button" aria-label="Reset demo" title="Reset demo">⟳</button>' +
    '</div>' +
    '<div class="modal-actions"><p class="modal-hint"></p><button class="modal-copy" type="button" aria-live="polite">Copy code</button></div>' +
    '<div class="tabs" role="tablist" aria-label="Pattern details">' +
      '<button class="tab active" role="tab" data-pane="notes">Demo notes</button>' +
      '<button class="tab" role="tab" data-pane="code">Code</button>' +
      '<button class="tab" role="tab" data-pane="prompt">LLM Prompt</button>' +
    '</div>' +
    '<div class="pane pane-notes active"><span class="code-label">Key features</span><div class="modal-desc"></div></div>' +
    '<div class="pane pane-code"><span class="code-label">single-file snippet · html + css + js</span><pre></pre></div>' +
    '<div class="pane pane-prompt"><span class="code-label">paste into claude / any llm</span><pre></pre></div>';
  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  const mStage = modal.querySelector('.modal-preview .demo-stage');
  const mPanes = {
    notes: modal.querySelector('.pane-notes'),
    code: modal.querySelector('.pane-code'),
    prompt: modal.querySelector('.pane-prompt')
  };
  let modalDemo = null;
  let modalOrigin = null;
  let returnHash = '';
  const modalClose = modal.querySelector('.modal-close');

  function openModal(d) {
    if (!modalDemo) {
      modalOrigin = document.activeElement;
      returnHash = location.hash === '#' + d.id ? '' : location.hash;
    }
    liveTiles.suspendAll();
    modalDemo = d;
    modal.querySelector('.modal-num').textContent = d._num;
    modal.querySelector('.modal-title').textContent = d.title;
    modal.querySelector('.modal-tags').innerHTML =
      (d.libs || []).map(l => '<span class="tag lib">' + l + '</span>').join('') +
      (d.tags || []).map(t => '<span class="tag">' + t + '</span>').join('');
    modal.querySelector('.modal-desc').innerHTML =
      d.desc + (d.seen ? '<span class="seen">' + d.seen + '</span>' : '');
    if (d.source) {
      const source = document.createElement('a');
      source.className = 'source-link';
      source.href = d.source.url; source.target = '_blank'; source.rel = 'noopener noreferrer';
      source.textContent = 'Reference: ' + (d.cat === 'DRAMS' ? 'DRAMS ' + d.id.slice(-3) + ' · 1042 Studio' : d.source.name) + ' ↗';
      modal.querySelector('.modal-desc').appendChild(source);
    }
    modal.querySelector('.modal-hint').textContent = d.hint;
    mPanes.code.querySelector('pre').textContent = buildCode(d);
    mPanes.prompt.querySelector('pre').textContent = d.prompt.trim();
    modal.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.pane === 'notes'));
    Object.values(mPanes).forEach(p => p.classList.remove('active'));
    mPanes.notes.classList.add('active');
    selectPane('notes');
    backdrop.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.querySelector('.layout').inert = true;
    document.querySelector('.topbar').inert = true;
    modal.scrollTop = 0;
    /* boot after .open so the stage is rendered and measurable for zoom-fit */
    runDemo(d, mStage);
    modalClose.focus();
    history.replaceState(null, '', '#' + d.id);
  }
  function closeModal() {
    if (!modalDemo) return;
    const origin = modalOrigin;
    modalDemo = null;
    modalOrigin = null;
    backdrop.classList.remove('open');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    document.querySelector('.layout').inert = false;
    document.querySelector('.topbar').inert = false;
    if (mStage._runtime) mStage._runtime.dispose();
    mStage.innerHTML = '';
    history.replaceState(null, '', location.pathname + location.search + returnHash);
    if (origin && origin.isConnected) origin.focus({ preventScroll: true });
    liveTiles.resumeAll();
  }

  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', e => {
    if (e.defaultPrevented) return;
    if (e.key === 'Escape') closeModal();
    if (e.key !== 'Tab' || !modalDemo) return;
    const focusable = [...modal.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')].filter(el => el.getClientRects().length && !el.disabled);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  modal.querySelector('.modal-reset').addEventListener('click', () => {
    if (!modalDemo) return;
    mStage.innerHTML = '';
    runDemo(modalDemo, mStage);
  });

  function selectPane(name) {
    modal.querySelectorAll('.tab').forEach(tab => {
      const active = tab.dataset.pane === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.id = 'tab-' + tab.dataset.pane;
      tab.setAttribute('aria-controls', 'pane-' + tab.dataset.pane);
      tab.tabIndex = active ? 0 : -1;
    });
    Object.entries(mPanes).forEach(([key, pane]) => {
      pane.classList.toggle('active', key === name);
      pane.id = 'pane-' + key; pane.setAttribute('role', 'tabpanel');
      pane.setAttribute('aria-labelledby', 'tab-' + key);
      pane.tabIndex = 0;
    });
    modal.querySelector('.modal-copy').textContent = name === 'prompt' ? 'Copy prompt' : 'Copy code';
  }
  modal.querySelectorAll('.tab').forEach((tab, index, tabs) => {
    tab.addEventListener('click', () => {
      selectPane(tab.dataset.pane);
    });
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectPane(tabs[next].dataset.pane); tabs[next].focus();
    });
  });

  const mCopy = modal.querySelector('.modal-copy');
  mCopy.addEventListener('click', () => {
    if (!modalDemo) return;
    const active = modal.querySelector('.tab.active').dataset.pane;
    const text = active === 'prompt' ? modalDemo.prompt.trim() : buildCode(modalDemo);
    copyText(text).then(copied => {
      if (!copied) { mCopy.textContent = 'Select code to copy'; return; }
      mCopy.textContent = 'Copied ✓';
      setTimeout(() => { mCopy.textContent = modal.querySelector('.tab.active').dataset.pane === 'prompt' ? 'Copy prompt' : 'Copy code'; }, 1400);
    });
  });

  /* deep link: #demo-id opens its modal */
  const deep = R.demos.find(d => d.id === location.hash.slice(1));
  if (deep) openModal(deep);
  /* category deep link (#cat-xxx): tiles are built after the browser's
     initial anchor jump, so scroll manually once the grid exists */
  if (!deep && location.hash.length > 1) {
    const anchorTarget = document.getElementById(location.hash.slice(1));
    if (anchorTarget) anchorTarget.scrollIntoView({ behavior: 'instant', block: 'start' });
  }

  /* dismissable grid strip */
  const stripClose = document.getElementById('strip-close');
  if (stripClose) stripClose.addEventListener('click', () => stripClose.parentElement.remove());

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    const setOpen = open => {
      document.body.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };
    navToggle.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
    /* close the drawer when a nav link is tapped or Escape is pressed */
    nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- nav active state ---------- */
  const navItems = [...document.querySelectorAll('.nav-item')];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navItems.forEach(n => n.classList.toggle('active', n.dataset.id === en.target.id));
        // Indicate the current category without moving the user's navigation.
        const active = navItems.find(n => n.dataset.id === en.target.id);
        document.querySelectorAll('.nav-group').forEach(group => group.classList.toggle('current', !!active && group.contains(active)));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  R.demos.forEach(d => spy.observe(d._card));

  /* ---------- search ---------- */
  const search = document.getElementById('search');
  let activeFilter = 'all';
  const filters = [...document.querySelectorAll('[data-filter]')];
  function filterMatches(d) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return ['Interactive Showcase', 'Framer Collection', 'DRAMS'].includes(d.cat);
    if (activeFilter === 'drams') return d.cat === 'DRAMS';
    const text = ((d.tags || []).join(' ') + ' ' + d.hint + ' ' + d.cat).toLowerCase();
    return activeFilter === 'pointer' ? /pointer|cursor|hover|mouse/.test(text) : text.includes(activeFilter);
  }
  function applyFilters() {
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    nav.classList.toggle('searching', !!q);
    R.demos.forEach(d => {
      const hit = filterMatches(d) && (!q || q.split(/\s+/).every(word => d._card.dataset.search.includes(word)));
      d._card.classList.toggle('hidden', !hit);
      const navItem = navItems.find(n => n.dataset.id === d.id);
      if (navItem) navItem.classList.toggle('hidden', !hit);
      if (hit) visible++;
    });
    setCount(visible);
    document.getElementById('result-count').textContent = visible + ' pattern' + (visible === 1 ? '' : 's');
    document.getElementById('empty-state').hidden = visible !== 0;
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter)));
    /* hide empty category dividers */
    cats.forEach(cat => {
      const anyVisible = R.demos.some(d => d.cat === cat && !d._card.classList.contains('hidden'));
      const div = document.getElementById('cat-' + cat.toLowerCase().replace(/[^a-z]+/g, '-'));
      if (div) div.style.display = anyVisible ? '' : 'none';
      const group = [...nav.children].find(item => item.dataset.category === cat);
      if (group) group.hidden = !anyVisible;
    });
  }
  search.addEventListener('input', applyFilters);
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    applyFilters();
  }));
  document.getElementById('clear-filters').addEventListener('click', () => {
    search.value = ''; activeFilter = 'all'; applyFilters();
    filters[0].focus();
  });
  nav.addEventListener('click', event => {
    const item = event.target.closest('a');
    if (!item) return;
    const demo = R.demos.find(d => d.id === item.dataset.id);
    if (demo) { event.preventDefault(); openModal(demo); }
    else {
      event.preventDefault();
      search.value = ''; activeFilter = 'all'; applyFilters();
      const target = document.querySelector(item.getAttribute('href'));
      if (target) { target.scrollIntoView({ behavior: 'instant' }); history.replaceState(null, '', item.getAttribute('href')); }
    }
  });
  applyFilters();

  window.addEventListener('hashchange', () => {
    const demo = R.demos.find(d => d.id === location.hash.slice(1));
    if (demo && demo !== modalDemo) openModal(demo);
  });

  window.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modalDemo) closeModal();
      if (innerWidth <= 900) {
        document.body.classList.add('nav-open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
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
