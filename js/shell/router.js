(function(){
 const R=INTRX,positions=new Map();let current='',render,serial=0;
 R.normalizeRoute=hash=>{
  if(!hash||hash==='#top')return '#/';if(hash.startsWith('#/'))return hash;
  if(hash.startsWith('#cat-')){const category=Object.values(R.groups).flat().find(name=>('#cat-'+name.toLowerCase().replace(/[^a-z]+/g,'-')).replace(/-$/,'')===hash.replace(/-$/,''));return '#/library/'+(category?R.slug(category):hash.slice(5).replace(/-$/,''));}
  return R.byId?.has(hash.slice(1))?'#/c/'+hash.slice(1):'#/';
 };
 R.router={
  get current(){return current;},
  async go(hash,{replace=false,restore=false}={}){
   hash=R.normalizeRoute(hash);if(current)positions.set(current,scrollY);
   if(location.hash!==hash)history[replace?'replaceState':'pushState']({intrx:true},'',hash);
   const previous=current;current=hash;const turn=++serial;
   R.disposeView?.();R.closeOverlay?.();document.documentElement.dataset.route=hash.split('/')[1]||'home';
   await render(hash,{previous,turn,isCurrent:()=>turn===serial});
   if(turn!==serial)return;
   scrollTo({top:restore?(positions.get(hash)||0):0,behavior:'instant'});
   document.querySelector('#app h1')?.focus({preventScroll:true});
   if(hash==='#/pricing')document.getElementById('pricing')?.scrollIntoView();
  },
  start(handler){render=handler;history.scrollRestoration='manual';addEventListener('popstate',()=>this.go(location.hash,{restore:true,replace:true}));addEventListener('hashchange',()=>{if(location.hash!==current)this.go(location.hash,{restore:true,replace:true});});
   document.addEventListener('click',event=>{const a=event.target.closest('a[href^="#/"]');if(a&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();this.go(a.getAttribute('href'));}});
   return this.go(location.hash,{replace:true});
  }
 };
})();
