/* Shared registry metadata; usable in the browser and dependency-free Node VMs. */
(function () {
  const R = window.INTRX = window.INTRX || { demos:[], register(demo) { this.demos.push(demo); } };
  const metadata = R.stageMeta = Object.create(null);
  R.meta = entries => {
    Object.entries(entries).forEach(([id,value]) => { metadata[id] = value; });
    R.demos.forEach(demo => R.applyMeta(demo));
  };
  R.applyMeta = demo => {
    const sidecar = metadata[demo.id]; if (!sidecar) return demo;
    // Inline fields take precedence. Keep their original values separately so
    // reapplying metadata never mistakes a previous default for an override.
    if (!demo._inlineMeta) {
      Object.defineProperty(demo,'_inlineMeta',{value:Object.fromEntries(Object.keys(sidecar).filter(key=>Object.hasOwn(demo,key)).map(key=>[key,demo[key]]))});
    }
    Object.assign(demo,sidecar,demo._inlineMeta);
    ['stage','a11y'].forEach(key => { demo[key] = Object.assign({},sidecar[key],demo._inlineMeta[key]); });
    if(R.access)demo.tier=R.access.tier(demo);
    return demo;
  };
  const register = R.register;
  R.register = function(demo) { R.applyMeta(demo); return register.call(R,demo); };
  R.groups={Interface:['Buttons & Micro','Forms & Inputs','Navigation & Menus','Layout & UI','Loaders & Progress','Galleries & Sliders'],Motion:['Scroll','Text & Type','SVG & Line','3D & Perspective'],'Pointer & Physics':['Cursor','Physics','Liquid & Organic','Play & Easter Eggs'],'Data & AI':['Agent & AI UI','Data & Numbers','Maps & Geo','FUI & Terminal'],'Visual FX':['Image & WebGL','Raster & Glitch','Ambient','Skeuomorph','Sound & Haptics'],Collections:['Interactive Showcase','DRAMS','Framer Collection']};
  R.triggers=['hover','press','drag','scroll','type','ambient'];
  // One delegated disclosure owner; it never retains an individual Stage.
  R.installDockOverflow=function(){
    const R=window.INTRX;if(R.dockOverflowBound)return;R.dockOverflowBound=true;let presses=new WeakSet();const ownedKeys=new Set();
    const popup=dock=>dock?.querySelector(':scope > .dock-overflow');
    const trigger=dock=>dock?.querySelector(':scope > .dock-more');
    const close=(dock,focus=false)=>{const menu=popup(dock),button=trigger(dock);if(!menu||!button)return;menu.hidden=true;button.setAttribute('aria-expanded','false');if(focus&&button.isConnected&&!button.disabled)button.focus();};
    const opened=()=>[...document.querySelectorAll('.stage-dock > .dock-overflow:not([hidden])')].map(menu=>menu.parentElement);
    const open=dock=>{const menu=popup(dock),button=trigger(dock),stage=dock?.closest('.stage');if(!menu||!button||button.hidden||button.disabled||stage?._runtime?.disposed)return;for(const other of opened())if(other!==dock)close(other);menu.style.maxWidth=Math.max(120,(stage?.clientWidth||300)-24)+'px';menu.hidden=false;button.setAttribute('aria-expanded','true');};
    const enabled=menu=>[...menu.querySelectorAll('button[data-action]')].filter(button=>!button.disabled&&!button.hidden&&getComputedStyle(button).display!=='none');
    document.addEventListener('click',event=>{
      const more=event.target.closest?.('button.dock-more');
      if(more){const dock=more.parentElement;if(popup(dock)?.hidden)open(dock);else close(dock);event.stopPropagation();return;}
      const action=event.target.closest?.('.dock-overflow button[data-action]');
      if(action){const dock=action.closest('.stage-dock');queueMicrotask(()=>close(dock,popup(dock)?.contains(document.activeElement)));return;}
      for(const dock of opened())if(!dock.contains(event.target))close(dock);
    },true);
    document.addEventListener('keydown',event=>{
      const code=event.code||event.key;if(!event.repeat)ownedKeys.delete(code);
      const dock=event.target.closest?.('.stage-dock'),menu=popup(dock);if(!menu)return;
      const keyButton=event.target.closest?.('button.dock-more'),inMenu=event.target.closest?.('.dock-overflow button[data-action]'),consume=()=>{if(!event.repeat)ownedKeys.add(code);event.stopPropagation();};
      if(keyButton&&event.key===' '){event.preventDefault();consume();if(!event.repeat)presses.add(keyButton);return;}
      if(keyButton&&event.key==='Enter'){consume();if(event.repeat)event.preventDefault();return;}
      if((keyButton||inMenu)&&event.key==='Tab'){consume();return;}
      if(event.key==='Escape'&&(!menu.hidden||(keyButton&&presses.has(keyButton)))){event.preventDefault();consume();if(keyButton)presses.delete(keyButton);close(dock,true);return;}
      if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
      const more=event.target.closest?.('button.dock-more'),action=event.target.closest?.('.dock-overflow button[data-action]');if(!more&&!action)return;
      event.preventDefault();consume();open(dock);if(menu.hidden)return;const buttons=enabled(menu);if(!buttons.length)return;
      const at=buttons.indexOf(action),next=event.key==='Home'?0:event.key==='End'?buttons.length-1:more?(event.key==='ArrowUp'?buttons.length-1:0):(at+(event.key==='ArrowUp'?-1:1)+buttons.length)%buttons.length;buttons[next].focus();
    },true);
    document.addEventListener('keyup',event=>{const code=event.code||event.key,owned=ownedKeys.has(code);ownedKeys.delete(code);if(owned)event.stopPropagation();const more=event.target.closest?.('button.dock-more');if(!more||event.key!==' ')return;const armed=presses.has(more);presses.delete(more);if(owned||armed)event.preventDefault();if(armed&&!more.disabled)more.click();},true);
    document.addEventListener('focusout',event=>{const more=event.target.closest?.('button.dock-more');if(more)presses.delete(more);});
    const cancelKeys=()=>{presses=new WeakSet();ownedKeys.clear();};window.addEventListener('blur',cancelKeys);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelKeys();});
    document.addEventListener('focusin',event=>{for(const dock of opened())if(!dock.contains(event.target))close(dock);});
    window.addEventListener('resize',()=>{for(const dock of opened())close(dock);});
  };
  // Fixed toggle identities survive demo-authored caption/aria-label updates.
  // Referenced hidden siblings do not participate in the Dock's visual layout.
  R.nameDockControls=function(stage,controls){
    const R=window.INTRX,dock=stage.querySelector(':scope > .stage-dock');
    if(!dock)return;
    const names=new Map((controls||[]).filter(c=>typeof c.ariaLabel==='string'&&c.ariaLabel.trim()).map(c=>[c.action,c.ariaLabel]));
    for(const button of dock.querySelectorAll('button[data-action]')){
      const name=names.get(button.dataset.action);if(!name)continue;
      let label=[...dock.querySelectorAll('[data-control-name]')].find(n=>n.dataset.controlName===button.dataset.action);
      if(!label){
        label=document.createElement('span');label.hidden=true;label.style.display='none';label.dataset.controlName=button.dataset.action;
        do{label.id='intrx-dock-name-'+(R.dockNameSerial=(R.dockNameSerial||0)+1);}while(document.getElementById(label.id));
        button.parentElement.appendChild(label);
      }
      label.textContent=name;button.setAttribute('aria-labelledby',label.id);
    }
    // v4 tiles have two visible Dock controls; full compositions retain up to
    // three direct actions under the Stage Kit contract. Move the original
    // buttons, including their listeners, state and fixed-name siblings.
    if(stage.dataset.mode!=='thumb'||stage._runtime?.disposed)return;
    if(dock._intrxDockOverflow){dock._intrxDockOverflow();return;}
    const buttons=[...dock.querySelectorAll('button[data-action]')];if(buttons.length<=2)return;
    let more,menu,signature,dead=false;
    const move=(button,parent)=>{const label=[...dock.querySelectorAll('[data-control-name]')].find(node=>node.dataset.controlName===button.dataset.action);parent.appendChild(button);if(label)parent.appendChild(label);};
    const sync=()=>{
      if(dead||stage._runtime?.disposed)return;
      const visible=buttons.filter(button=>!button.hidden&&getComputedStyle(button).display!=='none'),next=buttons.map(button=>visible.includes(button)?'1':'0').join('');
      if(next===signature)return;signature=next;const active=document.activeElement;
      if(visible.length>2){
        if(!more){
          R.installDockOverflow();more=document.createElement('button');menu=document.createElement('div');more.type='button';more.className='dock-btn dock-more';more.textContent='More';more.setAttribute('aria-label','More actions');more.setAttribute('aria-expanded','false');
          do{menu.id='intrx-dock-overflow-'+(R.dockOverflowSerial=(R.dockOverflowSerial||0)+1);}while(document.getElementById(menu.id));
          menu.className='dock-overflow';menu.hidden=true;menu.setAttribute('role','group');menu.setAttribute('aria-label','More actions');more.setAttribute('aria-controls',menu.id);
        }
        for(const button of buttons)move(button,button===visible[0]||!visible.includes(button)?dock:menu);
        more.hidden=false;dock.append(more,menu);dock.dataset.overflowControls='true';
      }else if(more){
        menu.hidden=true;more.hidden=true;more.setAttribute('aria-expanded','false');
        for(const button of buttons)move(button,dock);dock.append(more,menu);delete dock.dataset.overflowControls;
      }
      if(active&&active!==document.activeElement&&active.isConnected&&active.getClientRects().length)active.focus({preventScroll:true});
      else if(active===more&&more?.hidden)visible.find(button=>!button.disabled)?.focus({preventScroll:true});
    };
    Object.defineProperty(dock,'_intrxDockOverflow',{value:sync});
    const observer=new MutationObserver(sync);for(const button of buttons)observer.observe(button,{attributes:true,attributeFilter:['hidden','style','class']});
    stage._runtime?.onDispose(()=>{dead=true;observer.disconnect();if(menu){menu.hidden=true;menu.inert=true;more.disabled=true;more.setAttribute('aria-expanded','false');}});
    sync();
  };
  if(typeof document!=='undefined')document.addEventListener('intrx:boot',event=>{
    const demo=R.demos.find(d=>d.id===event.detail.id)||R.byId?.get(event.detail.id);
    if(demo)R.nameDockControls(event.target,demo.controls);
  });
  R.slug=value=>value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  // Staff picks: the audit's strongest components, most striking first. They lead
  // every default-sorted grid and each Home group.
  R.picks=['gallery-coverflow','agent-diff-review','fx-liquid-glass','form-date-range','text-ransom-note','data-world-clock','elastic-tabs','image-shatter-click','svg-signature-write','glass-refraction-card','data-line-tooltip','css3d-depth-hero','scroll-color-theme','form-signature-pad','gallery-apple-cards','fui-waveform-scope','btn-polish-stages','webgl-distortion','data-candlestick-crosshair','select-morph-dropdown','input-float-label','tilt-card','cursor-inverted-lens','led-segment-display','swap-widget','ui-file-tree','slider-progress-fraction','menu-letter-cascade','kinetic-marquee','micro-award-badge','nav-mobile-tabbar','masonry-filter','showcase-circular-gallery','css3d-isometric-hover','drams-001','copy-inline-feedback'];
  // Cut-or-merge candidates (duplicates and variants). They keep their URL and
  // registry entry but sort last and stay off Home.
  R.archived=new Set(['cursor-elastic-line','cursor-velocity-stretch','spring-cursor-follower','gravity-flip-page','wobbly-window-drag','ascii-webcam-style-wave','ascii-morph','ascii-fluid-stir','embossed-press','showcase-ripple-grid','showcase-orbital-path','showcase-elastic-slider','drams-028','drams-030','drams-020','drams-040','drams-035','drams-024']);
  R.feature=items=>{const pick=new Map(R.picks.map((id,i)=>[id,i])),score=d=>pick.has(d.id)?pick.get(d.id):R.archived.has(d.id)?1e6:1e3;return items.map((d,i)=>[d,i]).sort((a,b)=>score(a[0])-score(b[0])||a[1]-b[1]).map(([d])=>d);};
  R.views={};R.fontFaces={};R.resolveAssets=value=>value;
  const scripts=new Map();
  R.loadScript=url=>{
    if(!scripts.has(url))scripts.set(url,new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=url;script.async=true;script.onload=resolve;script.onerror=()=>{scripts.delete(url);script.remove();reject(Error('Could not load '+url));};document.head.appendChild(script);}));
    return scripts.get(url);
  };
  R.initCatalog=async()=>{
    const request=window.intrxCatalogRequest;delete window.intrxCatalogRequest;
    const response=await(request||fetch('registry/index.json',{cache:'no-cache'}));if(!response.ok)throw Error('Could not load component catalog');
    R.catalog=(await response.json()).map(item=>R.access?{...item,tier:R.access.tier(item)}:item);R.byId=new Map(R.catalog.map(item=>[item.id,item]));
    R.bundleUrls={assets:R.catalog[0]?.assetBundle||'js/demo-assets.js',export:R.catalog[0]?.exportBundle||'js/export-data.js'};
    const paths=Object.assign({},...R.catalog.map(item=>item.assetRefs));
    R.resolveAssets=value=>value.replace(/\{\{asset:([\w-]+)\}\}/g,(_,name)=>{if(!paths[name])throw Error('Unknown preview asset: '+name);return paths[name];});
    R.meta(Object.fromEntries(R.catalog.map(item=>[item.id,{designSize:item.designSize,thumbDesignSize:item.thumbDesignSize,stage:item.stage,trigger:item.trigger,controls:item.controls,a11y:item.a11y,tier:R.access?R.access.tier(item):item.tier,thumb:item.thumb,useCases:item.useCases,addedAt:item.addedAt,...(item.photoCredits?{photoCredits:item.photoCredits,fullAssetRefs:item.fullAssetRefs}:{})}])));
    return R.catalog;
  };
  const urls={gsap:'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',scrolltrigger:'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',lenis:'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js'};
  R.loadDemo=async id=>{
    let demo=R.demos.find(item=>item.id===id);
    if(!demo){const item=R.byId.get(id);if(!item)throw Error('Unknown component');await R.loadScript(item.module);demo=R.demos.find(item=>item.id===id);}
    if(!demo)throw Error('Component registration failed');
    for(const lib of demo.libs||[])if(urls[lib])await R.loadScript(urls[lib]);
    return demo;
  };
  R.getCode=async demo=>{if(R.access&&!R.access.canReadSource(demo))throw Error('Unlock with Pro to access source. The prompt is free.');await Promise.all([R.loadScript(R.bundleUrls.assets),R.loadScript(R.bundleUrls.export)]);return R.buildCode(demo);};
  R.rank=(items,query)=>{
    const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const fuzzy=(text,word)=>{let pos=0;for(const c of text)if(c===word[pos])pos++;return pos===word.length;};
    const score=item=>words.reduce((sum,word)=>{const title=item.title.toLowerCase(),tags=(item.tags||[]).join(' ').toLowerCase(),rest=((item.useCases||[]).join(' ')+' '+item.category+' '+item.sourceName+' '+item.desc).toLowerCase();return sum+(title===word?120:title.includes(word)?70:fuzzy(title,word)?15:0)+(tags.includes(word)?30:0)+(rest.includes(word)?8:0);},0);
    return items.map(item=>({item,score:score(item)})).filter(row=>!words.length||row.score>0).sort((a,b)=>b.score-a.score||a.item.title.localeCompare(b.item.title)).map(row=>row.item);
  };
})();
