(function(){const R=INTRX;
 R.categoryCopy={
  'All components':'Every interaction in the library, live. Filter by gesture or stack, open one, copy the code or the prompt.',
  'New this month':'The latest additions to the library, newest first.',
  'Staff picks':'A short list of the components we would reach for first.',
  Interface:'Everyday product UI with the details finished: buttons, inputs, menus, layout and loading states.',
  Motion:'Scroll, type, line and depth: motion that carries a page rather than decorating it.',
  'Pointer & Physics':'Cursors, springs, bodies and fluids that answer the pointer directly.',
  'Data & AI':'Numbers, charts, maps, terminals and agent interfaces that make state legible.',
  'Visual FX':'Shaders, rasters, ambient fields and tactile objects for moments that should be seen.',
  Collections:'Curated sets built around one source of inspiration or one family of objects.',
  'Buttons & Micro':'Small controls with considered press, hover and success states.',
  'Forms & Inputs':'Fields, pickers and validation that feel immediate without getting in the way.',
  'Navigation & Menus':'Tabs, menus, docks and pagination with motion that shows where you are.',
  'Layout & UI':'Panels, cards, lists, dialogs and workspaces: the structure of real product screens.',
  'Loaders & Progress':'Ways to show work happening, from a single spinner to a multi-step build.',
  'Galleries & Sliders':'Carousels, stacks and grids for browsing images and cards.',
  Scroll:'Scroll-linked reveals, pinned scenes and progress, driven by the page itself.',
  'Text & Type':'Typographic motion: reveals, scrambles, rolls and kinetic lettering.',
  'SVG & Line':'Paths that draw, morph and wave, rendered as crisp vectors.',
  '3D & Perspective':'Cards, rooms and objects with real depth, built on CSS 3D and WebGL.',
  Cursor:'Pointer followers, lenses and fields that make the cursor part of the composition.',
  Physics:'Springs, collisions, cloth and gravity with simulated, interruptible motion.',
  'Liquid & Organic':'Blobs, ink, smoke and liquid surfaces with soft, continuous movement.',
  'Play & Easter Eggs':'Small games and hidden delights for the corners of a site.',
  'Agent & AI UI':'Interfaces for working with models and agents: streams, tools, context and review.',
  'Data & Numbers':'Charts, counters and tables that animate changes rather than replacing them.',
  'Maps & Geo':'Globes, routes, parcels and contours for location and movement.',
  'FUI & Terminal':'Instrument panels, scanners and terminals in a precise, technical register.',
  'Image & WebGL':'Shader-driven image effects: distortion, ripples, reveals and lenses.',
  'Raster & Glitch':'Dither, halftone, ASCII and signal effects built from the pixel up.',
  Ambient:'Backgrounds and fields that move on their own, for heroes and empty states.',
  Skeuomorph:'Tactile objects with material, light and weight.',
  'Sound & Haptics':'Instruments and controls that answer with sound as well as motion.',
  'Interactive Showcase':'Showpiece fields, ribbons and galleries for a single striking moment.',
  DRAMS:'A family of physical sliders, switches, knobs and devices with mechanical motion.',
  'Framer Collection':'Numeric and financial components in a clean product style.'
 };
 R.views.library=async hash=>{
  const route=hash.split('/'),scope=decodeURIComponent(route[2]||''),kind=route[1];let title='All components',base=R.catalog;
  if(kind==='new'){title='New this month';base=base.filter(d=>d.isNew);}else if(kind==='picks'){title='Staff picks';base=R.picks.map(id=>R.byId.get(id)).filter(Boolean);}else if(kind==='trigger'){title=scope[0]?.toUpperCase()+scope.slice(1)+' interactions';base=base.filter(d=>d.trigger===scope);}else if(scope){const group=Object.keys(R.groups).find(g=>R.slug(g)===scope),category=Object.values(R.groups).flat().find(c=>R.slug(c)===scope);title=group||category||'No matching category';base=base.filter(d=>group?d.group===group:d.category===category);}
  const app=document.getElementById('app');app.innerHTML='<div class="library-layout"><aside class="library-sidebar">'+R.sidebar()+'</aside><section class="library-main"><p class="breadcrumb"><a href="#/library">Library</a> / '+R.escape(title)+'</p><div class="library-heading"><h1 tabindex="-1">'+R.escape(title)+'</h1><span id="library-count">'+base.length+'</span></div><p class="library-description">'+R.escape(R.categoryCopy[title]||(kind==='trigger'?'Components you '+(scope==='ambient'?'watch rather than touch':scope+' to see')+'. Open one to try it, then copy the code or the prompt.':'Interfaces that move with intent. Find a detail, try it, make it yours.'))+'</p><div class="library-toolbar"><div class="trigger-scroll" role="group" aria-label="Filter by gesture">'+['all',...R.triggers].map(t=>'<button class="chip" data-trigger="'+t+'" aria-pressed="'+(t==='all')+'">'+(t==='all'?'All':t[0].toUpperCase()+t.slice(1))+' <span class="n">'+(t==='all'?base.length:base.filter(d=>d.trigger===t).length)+'</span></button>').join('')+'</div><div class="library-options"><label class="sr-only" for="stack-filter">Stack</label><select id="stack-filter"><option value="all">Any stack</option><option value="vanilla">Vanilla</option><option value="gsap">GSAP</option><option value="webgl">WebGL</option><option value="canvas">Canvas</option></select><label class="sr-only" for="sort-order">Sort</label><select id="sort-order"><option value="featured">Featured</option><option value="newest">Newest</option><option value="az">A–Z</option></select><div class="density-control" role="group" aria-label="Display density"><button class="icon-btn" aria-pressed="true" data-density="grid" aria-label="Grid view">▦</button><button class="icon-btn" aria-pressed="false" data-density="rows" aria-label="Rows view">☷</button></div></div></div><div class="tile-grid" id="library-grid"></div><div class="library-empty" hidden><h2>No components found</h2><p>Try another gesture or stack.</p><button class="btn btn--secondary" id="reset-library">Clear filters</button></div><div class="section-more"><button class="chip" id="show-more"></button><p class="type-meta" id="batch-count"></p></div></section></div>'+R.footer();
  app.querySelectorAll('.library-nav a').forEach(a=>{if(a.getAttribute('href')===hash)a.setAttribute('aria-current','page');});
  R.viewStates=R.viewStates||new Map();const state=R.viewStates.get(hash)||{gesture:'all',stack:'all',sort:'featured',limit:12,density:'grid'};let {gesture,stack,sort,limit}=state;const grid=app.querySelector('#library-grid');grid.dataset.density=state.density;app.querySelector('#stack-filter').value=stack;app.querySelector('#sort-order').value=sort;app.querySelectorAll('[data-trigger]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.trigger===gesture)));app.querySelectorAll('button[data-density]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.density===state.density)));
  function render(append=false){
   R.viewStates.set(hash,{gesture,stack,sort,limit,density:grid.dataset.density||'grid'});
   const start=append?grid.children.length:0;
   if(!append){if(R.liveTiles){R.liveTiles.destroy();R.liveTiles=null;}grid.replaceChildren();}
   let items=base.filter(d=>(gesture==='all'||d.trigger===gesture)&&(stack==='all'||(stack==='vanilla'?!d.libs.length&& !/webgl|canvas/i.test(d.tags.join(' ')):stack==='gsap'?d.libs.includes('gsap'):new RegExp(stack,'i').test(d.tags.join(' ')+' '+d.desc))));
   if(sort==='az')items.sort((a,b)=>a.title.localeCompare(b.title));else if(sort==='newest')items.sort((a,b)=>b.addedAt.localeCompare(a.addedAt)||a.title.localeCompare(b.title));else items=R.feature(items);
   R.renderTiles(grid,items.slice(start,limit));const more=app.querySelector('#show-more');more.hidden=limit>=items.length;more.textContent='Show '+Math.min(12,Math.max(0,items.length-limit))+' more';app.querySelector('#batch-count').textContent='Showing '+Math.min(limit,items.length)+' of '+items.length;app.querySelector('.library-empty').hidden=items.length!==0;app.querySelector('#library-count').textContent=items.length;
  }
  app.querySelectorAll('[data-trigger]').forEach(button=>button.addEventListener('click',()=>{gesture=button.dataset.trigger;limit=12;app.querySelectorAll('[data-trigger]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();}));
  app.querySelector('#stack-filter').addEventListener('change',event=>{stack=event.target.value;limit=12;render();});app.querySelector('#sort-order').addEventListener('change',event=>{sort=event.target.value;render();});app.querySelector('#show-more').addEventListener('click',()=>{limit+=12;render(true);});
  app.querySelector('#reset-library').addEventListener('click',()=>{gesture=stack='all';limit=12;app.querySelector('#stack-filter').value='all';app.querySelectorAll('[data-trigger]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.trigger==='all')));render();});
  app.querySelectorAll('button[data-density]').forEach(button=>button.addEventListener('click',()=>{grid.dataset.density=button.dataset.density;R.viewStates.set(hash,{gesture,stack,sort,limit,density:button.dataset.density});app.querySelectorAll('button[data-density]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));render();
 };
})();
