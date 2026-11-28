(function(){
 const R=INTRX,positions=new Map();let current='',render,serial=0;
 R.normalizeRoute=hash=>{
  if(!hash||hash==='#top')return '#/';
  const legacy=hash.match(/^#\/library\/([^/?]+)$/);if(legacy&&R.legacyRoutes[legacy[1]])return R.legacyRoutes[legacy[1]];
  if(hash.startsWith('#/'))return hash;
  if(hash.startsWith('#cat-')){const category=[...Object.keys(R.families),...Object.values(R.groups).flat()].find(name=>('#cat-'+name.toLowerCase().replace(/[^a-z]+/g,'-')).replace(/-$/,'')===hash.replace(/-$/,''));return R.normalizeRoute('#/library/'+(category?R.slug(category):hash.slice(5).replace(/-$/,'')));}
  return R.byId?.has(hash.slice(1))?'#/c/'+hash.slice(1):'#/';
 };
 R.router={
  get current(){return current;},
  async go(hash,{replace=false,restore=false}={}){
   hash=R.normalizeRoute(hash);
   const entryHeading=current?null:document.querySelector('#app > .home-hero h1'),entryTop=entryHeading?scrollY:null;
   if(current)positions.set(current,scrollY);
   if(location.hash!==hash)history[replace?'replaceState':'pushState']({intrx:true},'',hash);
   const previous=current;current=hash;const turn=++serial;
   R.disposeView?.();R.closeOverlay?.();document.documentElement.dataset.route=hash.split('/')[1]||'home';
   await render(hash,{previous,turn,isCurrent:()=>turn===serial});
   if(turn!==serial)return;
   const top=restore?(positions.get(hash)||0):0,heading=document.querySelector('#app h1'),retained=entryHeading&&entryHeading===heading;
   // Home already painted this heading while the catalog loaded. Keep its
   // browser focus/top position; new headings retain normal navigation focus.
   if(!retained||entryTop!==0||top!==0)scrollTo({top,behavior:'instant'});
   if(!retained)heading?.focus({preventScroll:true});
   if(hash==='#/pricing')document.getElementById('pricing')?.scrollIntoView();
  },
  start(handler){render=handler;positions.set(R.normalizeRoute(location.hash),scrollY);history.scrollRestoration='manual';addEventListener('popstate',()=>this.go(location.hash,{restore:true,replace:true}));addEventListener('hashchange',()=>{if(location.hash!==current)this.go(location.hash,{restore:true,replace:true});});
   document.addEventListener('click',event=>{const a=event.target.closest('a[href^="#/"]');if(a&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();this.go(a.getAttribute('href'));}});
   return this.go(location.hash,{replace:true,restore:true});
  }
 };
})();
