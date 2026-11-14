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
    return demo;
  };
  const register = R.register;
  R.register = function(demo) { R.applyMeta(demo); return register.call(R,demo); };
  R.groups={Interface:['Buttons & Micro','Forms & Inputs','Navigation & Menus','Layout & UI','Loaders & Progress','Galleries & Sliders'],Motion:['Scroll','Text & Type','SVG & Line','3D & Perspective'],'Pointer & Physics':['Cursor','Physics','Liquid & Organic','Play & Easter Eggs'],'Data & AI':['Agent & AI UI','Data & Numbers','Maps & Geo','FUI & Terminal'],'Visual FX':['Image & WebGL','Raster & Glitch','Ambient','Skeuomorph','Sound & Haptics'],Collections:['Interactive Showcase','DRAMS','Framer Collection']};
  R.triggers=['hover','press','drag','scroll','type','ambient'];
  R.slug=value=>value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  R.picks=['elastic-tabs','toast-stack','command-palette','masonry-filter','password-strength-bar','scrollsnap-carousel','css3d-isometric-hover','showcase-dot-field','showcase-circular-gallery','input-float-label','btn-border-beam','drams-001'];
  R.views={};R.fontFaces={};R.resolveAssets=value=>value;
  const scripts=new Map();
  R.loadScript=url=>{
    if(!scripts.has(url))scripts.set(url,new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=url;script.async=true;script.onload=resolve;script.onerror=()=>{scripts.delete(url);script.remove();reject(Error('Could not load '+url));};document.head.appendChild(script);}));
    return scripts.get(url);
  };
  R.initCatalog=async()=>{
    const response=await fetch('registry/index.json',{cache:'no-cache'});if(!response.ok)throw Error('Could not load component catalog');
    R.catalog=await response.json();R.byId=new Map(R.catalog.map(item=>[item.id,item]));
    R.meta(Object.fromEntries(R.catalog.map(item=>[item.id,{designSize:item.designSize,stage:item.stage,trigger:item.trigger,controls:item.controls,a11y:item.a11y,tier:item.tier,thumb:item.thumb,useCases:item.useCases,addedAt:item.addedAt}])));
    return R.catalog;
  };
  const urls={gsap:'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',scrolltrigger:'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',lenis:'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js'};
  R.loadDemo=async id=>{
    let demo=R.demos.find(item=>item.id===id);
    if(!demo){const item=R.byId.get(id);if(!item)throw Error('Unknown component');await R.loadScript(item.module);demo=R.demos.find(item=>item.id===id);}
    if(!demo)throw Error('Component registration failed');
    for(const lib of demo.libs||[])if(urls[lib])await R.loadScript(urls[lib]);
    if(/\{\{asset:/.test(demo.html+demo.css+demo.js))await R.loadScript('js/demo-assets.js');
    return demo;
  };
  R.getCode=async demo=>{await Promise.all([R.loadScript('js/demo-assets.js'),R.loadScript('js/export-data.js')]);return R.buildCode(demo);};
  R.rank=(items,query)=>{
    const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const fuzzy=(text,word)=>{let pos=0;for(const c of text)if(c===word[pos])pos++;return pos===word.length;};
    const score=item=>words.reduce((sum,word)=>{const title=item.title.toLowerCase(),tags=(item.tags||[]).join(' ').toLowerCase(),rest=((item.useCases||[]).join(' ')+' '+item.category+' '+item.sourceName+' '+item.desc).toLowerCase();return sum+(title===word?120:title.includes(word)?70:fuzzy(title,word)?15:0)+(tags.includes(word)?30:0)+(rest.includes(word)?8:0);},0);
    return items.map(item=>({item,score:score(item)})).filter(row=>!words.length||row.score>0).sort((a,b)=>b.score-a.score||a.item.title.localeCompare(b.item.title)).map(row=>row.item);
  };
})();
