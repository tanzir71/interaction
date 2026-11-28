(function(){const R=INTRX;
 R.categoryCopy={
  'All components':'Every interaction in the library, live. Filter by gesture or stack, open one, copy the code or the prompt.',
  'New this month':'The latest additions to the library, newest first.',
  'Staff picks':'A short list of the components we would reach for first.',
  Components:'Everyday product UI with the details finished: buttons, inputs, menus, overlays, cards and galleries.',
  Sections:'Whole page sections built from the library’s interactions: heroes, feature grids, social proof and device frames.',
  Text:'Typographic motion: reveals, scrambles, rolls and kinetic lettering.',
  Backgrounds:'Fields, patterns and shaders that move on their own, for heroes and empty states.',
  Effects:'Scroll, cursor, image, depth, physics and line effects that carry a page rather than decorate it.',
  'AI & Data':'Agent and chat surfaces, voice, charts, maps and terminals that make state legible.',
  Lab:'Tactile objects, mechanical devices and small games for the corners of a site.',
  Collections:'Curated lists that cut across the groups: kits for one kind of product, and families from one source.',
  'Buttons & Micro-interactions':'Small controls with considered press, hover and success states.',
  'Inputs & Forms':'Fields, pickers, sliders and validation that feel immediate without getting in the way.',
  'Navigation & Menus':'Tabs, menus, docks and pagination with motion that shows where you are.',
  'Overlays & Feedback':'Dialogs, sheets, toasts, popovers, loaders and progress: the layer that answers back.',
  'Cards, Lists & Layout':'Panels, cards, lists, tables and workspaces: the structure of real product screens.',
  'Galleries & Carousels':'Carousels, stacks and grids for browsing images and cards.',
  Heroes:'Opening sections with a headline, a call to action and one striking interaction.',
  'Features & Bento':'Feature grids and bento layouts that explain a product in tiles.',
  Pricing:'Plans, billing toggles and price changes laid out to compare at a glance.',
  'Social proof':'Logos, testimonials and quotes that show who already uses the product.',
  'FAQ, CTA & Footer':'Questions, closing calls to action and footers that end a page well.',
  'Auth & Onboarding':'Sign-in, verification and first-run steps that get people started.',
  'Device frames':'Browser, laptop and phone frames for showing a product in context.',
  'Text effects':'Typographic motion: reveals, scrambles, rolls and kinetic lettering.',
  'Animated backgrounds':'Particles, light and weather that move on their own behind content.',
  Patterns:'Grids, dots and boxes that flicker, pulse or answer the pointer.',
  Shaders:'GPU gradients, noise, rays and metaballs drawn in a fragment shader.',
  Scroll:'Scroll-linked reveals, pinned scenes and progress, driven by the page itself.',
  'Cursor & Hover':'Pointer followers, lenses and fields that make the cursor part of the composition.',
  'Image & Media':'Image and video effects: distortion, ripples, reveals and lenses.',
  'Retro & Glitch':'Dither, halftone, ASCII and signal effects built from the pixel up.',
  '3D & Depth':'Cards, rooms and objects with real depth, built on CSS 3D and WebGL.',
  'Physics & Liquid':'Springs, collisions, cloth, blobs and liquid with simulated, interruptible motion.',
  'SVG & Line':'Paths that draw, morph and wave, rendered as crisp vectors.',
  'Page transitions':'Moves between views and pages: curtains, expanding cards and zooms.',
  'AI Chat & Agents':'Interfaces for working with models and agents: streams, tools, context and review.',
  'Voice & Audio':'Voice orbs, instruments and controls that answer with sound as well as motion.',
  'Charts & Numbers':'Charts, counters and tables that animate changes rather than replacing them.',
  'Maps & Globes':'Globes, routes, parcels and contours for location and movement.',
  'HUD & Terminal':'Instrument panels, scanners and terminals in a precise, technical register.',
  'Tactile & Skeuomorphic':'Objects with material, light and weight, including the DRAMS devices.',
  'Play & Easter eggs':'Small games and hidden delights for the corners of a site.'
 };
 R.views.library=async hash=>{
  const route=hash.split('/'),scope=decodeURIComponent(route[2]||''),kind=route[1];let title='All components',base=R.catalog;
  if(kind==='new'){title='New this month';base=base.filter(d=>d.isNew);}else if(kind==='picks'){title='Staff picks';base=R.picks.map(id=>R.byId.get(id)).filter(Boolean);}else if(kind==='trigger'){title=scope[0]?.toUpperCase()+scope.slice(1)+' interactions';base=base.filter(d=>d.trigger===scope);}else if(kind==='collections'){if(!scope)return R.views.collections();const collection=R.collections.find(c=>c.slug===scope);title=collection?.title||'No matching collection';base=collection?base.filter(d=>d.collections?.includes(collection.slug)):[];if(collection)R.categoryCopy[title]=collection.desc;}else if(scope){const group=Object.keys(R.groups).find(g=>R.slug(g)===scope),category=Object.values(R.groups).flat().find(c=>R.slug(c)===scope);title=group||category||'No matching category';base=base.filter(d=>group?d.group===group:d.category===category);}
  const curated=kind==='collections'||kind==='picks',shown=d=>curated||!R.archived.has(d.id);
  const app=document.getElementById('app');app.innerHTML='<div class="library-layout"><aside class="library-sidebar">'+R.sidebar()+'</aside><section class="library-main"><p class="breadcrumb"><a href="#/library">Library</a> / '+(kind==='collections'?'<a href="#/collections">Collections</a> / ':'')+R.escape(title)+'</p><div class="library-heading"><h1 tabindex="-1">'+R.escape(title)+'</h1><span id="library-count">'+base.length+'</span></div><p class="library-description">'+R.escape(R.categoryCopy[title]||(kind==='trigger'?'Components you '+(scope==='ambient'?'watch rather than touch':scope+' to see')+'. Open one to try it, then copy the code or the prompt.':'Interfaces that move with intent. Find a detail, try it, make it yours.'))+'</p><div class="library-toolbar"><div class="trigger-scroll" role="group" aria-label="Filter by gesture">'+['all',...R.triggers].map(t=>'<button class="chip" data-trigger="'+t+'" aria-pressed="'+(t==='all')+'">'+(t==='all'?'All':t[0].toUpperCase()+t.slice(1))+' <span class="n">'+(t==='all'?base.filter(shown).length:base.filter(d=>shown(d)&&d.trigger===t).length)+'</span></button>').join('')+'</div><div class="library-options"><label class="sr-only" for="stack-filter">Stack</label><select id="stack-filter"><option value="all">Any stack</option><option value="vanilla">Vanilla</option><option value="gsap">GSAP</option><option value="webgl">WebGL</option><option value="canvas">Canvas</option></select><label class="sr-only" for="sort-order">Sort</label><select id="sort-order"><option value="featured">Featured</option><option value="newest">Newest</option><option value="az">A–Z</option></select><div class="density-control" role="group" aria-label="Display density"><button class="icon-btn" aria-pressed="true" data-density="grid" aria-label="Grid view">▦</button><button class="icon-btn" aria-pressed="false" data-density="rows" aria-label="Rows view">☷</button></div></div></div><div class="tile-grid" id="library-grid"></div><div class="library-empty" hidden><h2>No components found</h2><p>Try another gesture or stack.</p><button class="btn btn--secondary" id="reset-library">Clear filters</button></div><div class="section-more"><button class="chip" id="show-more"></button><p class="type-meta" id="batch-count"></p><button class="chip" id="toggle-archived" hidden></button></div></section></div>'+R.footer();
  app.querySelectorAll('.library-nav a').forEach(a=>{if(a.getAttribute('href')===hash)a.setAttribute('aria-current','page');});
  R.viewStates=R.viewStates||new Map();const state=R.viewStates.get(hash)||{gesture:'all',stack:'all',sort:'featured',limit:12,density:'grid',archived:false};let {gesture,stack,sort,limit}=state,archived=!!state.archived;const grid=app.querySelector('#library-grid');grid.dataset.density=state.density;app.querySelector('#stack-filter').value=stack;app.querySelector('#sort-order').value=sort;app.querySelectorAll('[data-trigger]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.trigger===gesture)));app.querySelectorAll('button[data-density]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.density===state.density)));
  function render(append=false){
   R.viewStates.set(hash,{gesture,stack,sort,limit,archived,density:grid.dataset.density||'grid'});
   const start=append?grid.children.length:0;
   if(!append){if(R.liveTiles){R.liveTiles.destroy();R.liveTiles=null;}grid.replaceChildren();}
   const matches=d=>(gesture==='all'||d.trigger===gesture)&&(stack==='all'||(stack==='vanilla'?!d.libs.length&& !/webgl|canvas/i.test(d.tags.join(' ')):stack==='gsap'?d.libs.includes('gsap'):new RegExp(stack,'i').test(d.tags.join(' ')+' '+d.desc)));
   let items=base.filter(d=>matches(d)&&(archived||shown(d)));const hidden=curated?0:base.filter(d=>matches(d)&&R.archived.has(d.id)).length;
   const toggle=app.querySelector('#toggle-archived');toggle.hidden=!hidden;toggle.textContent=archived?'Hide '+hidden+' archived variant'+(hidden===1?'':'s'):'Show '+hidden+' archived variant'+(hidden===1?'':'s');toggle.setAttribute('aria-pressed',String(archived));
   if(sort==='az')items.sort((a,b)=>a.title.localeCompare(b.title));else if(sort==='newest')items.sort((a,b)=>b.addedAt.localeCompare(a.addedAt)||a.title.localeCompare(b.title));else items=R.feature(items);
   R.renderTiles(grid,items.slice(start,limit));const more=app.querySelector('#show-more');more.hidden=limit>=items.length;more.textContent='Show '+Math.min(12,Math.max(0,items.length-limit))+' more';app.querySelector('#batch-count').textContent='Showing '+Math.min(limit,items.length)+' of '+items.length;app.querySelector('.library-empty').hidden=items.length!==0;app.querySelector('#library-count').textContent=items.length;
  }
  app.querySelectorAll('[data-trigger]').forEach(button=>button.addEventListener('click',()=>{gesture=button.dataset.trigger;limit=12;app.querySelectorAll('[data-trigger]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();}));
  app.querySelector('#stack-filter').addEventListener('change',event=>{stack=event.target.value;limit=12;render();});app.querySelector('#sort-order').addEventListener('change',event=>{sort=event.target.value;render();});app.querySelector('#show-more').addEventListener('click',()=>{limit+=12;render(true);});
  app.querySelector('#toggle-archived').addEventListener('click',()=>{archived=!archived;render();});
  app.querySelector('#reset-library').addEventListener('click',()=>{gesture=stack='all';limit=12;app.querySelector('#stack-filter').value='all';app.querySelectorAll('[data-trigger]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.trigger==='all')));render();});
  app.querySelectorAll('button[data-density]').forEach(button=>button.addEventListener('click',()=>{grid.dataset.density=button.dataset.density;R.viewStates.set(hash,{gesture,stack,sort,limit,archived,density:button.dataset.density});app.querySelectorAll('button[data-density]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));render();
 };
 R.views.collections=async()=>{
  const app=document.getElementById('app'),rows=R.collections.map(c=>[c,R.catalog.filter(d=>d.collections?.includes(c.slug))]).filter(([,items])=>items.length);
  app.innerHTML='<div class="library-layout"><aside class="library-sidebar">'+R.sidebar()+'</aside><section class="library-main"><p class="breadcrumb"><a href="#/library">Library</a> / Collections</p><div class="library-heading"><h1 tabindex="-1">Collections</h1><span>'+rows.length+'</span></div><p class="library-description">'+R.escape(R.categoryCopy.Collections)+'</p><ul class="collection-grid" role="list">'+rows.map(([c,items])=>'<li><a class="collection-card" href="#/collections/'+c.slug+'"><span class="collection-posters" aria-hidden="true">'+R.feature(items).slice(0,3).map(d=>'<span data-poster="'+d.id+'"></span>').join('')+'</span><span class="collection-text"><strong>'+R.escape(c.title)+'</strong><span>'+R.escape(c.desc)+'</span><span class="type-meta">'+items.length+' components</span></span></a></li>').join('')+'</ul></section></div>'+R.footer();
  app.querySelectorAll('.library-nav a').forEach(a=>{if(a.getAttribute('href')==='#/collections')a.setAttribute('aria-current','page');});
 };
})();
