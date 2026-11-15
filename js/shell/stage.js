/* The shell owns geometry, actions, the dock, and the live preview budget. */
(function () {
  const R = window.INTRX;
  const PRESETS = R.sizePresets = { sm:[320,240], md:[480,360], lg:[720,480] };
  R.resolveSize = size => Array.isArray(size) ? size : PRESETS[size];
  R.fitStage = function(stage,root,meta,mode) {
    const content = root.parentElement;
    const size = mode==='thumb'&&meta.thumb==='hero'&&meta.thumbDesignSize!==undefined ? meta.thumbDesignSize : meta.designSize;
    const bleed = size === 'bleed';
    content.dataset.bleed = String(bleed);
    const pad = mode === 'thumb' ? 24 : 32;
    const dock = (meta.controls || []).length ? 48 : 0;
    content.style.inset = bleed ? '0' : pad+'px '+pad+'px '+(pad+dock)+'px';
    let width = stage.clientWidth, height = stage.clientHeight, scale = 1;
    if (!bleed) {
      [width,height] = R.resolveSize(size);
      scale = Math.max(.01,Math.min(1,(stage.clientWidth-pad*2)/width,(stage.clientHeight-pad*2-dock)/height));
    }
    Object.assign(root.style,{width:width+'px',height:height+'px',minWidth:'0',minHeight:'0',maxWidth:'none',maxHeight:'none',flex:'none',zoom:String(scale)});
    stage.dataset.scale = scale.toFixed(4);
    return scale;
  };
  const TIMER_NAMES = ['requestAnimationFrame','cancelAnimationFrame','setTimeout','clearTimeout','setInterval','clearInterval','ResizeObserver','IntersectionObserver'];
  R.mountStage = function(demo,stage,mode='thumb') {
    if (stage._runtime) stage._runtime.dispose();
    if (!demo._styled) {
      const style = document.createElement('style');
      style.textContent = R.resolveAssets(demo.css); document.head.appendChild(style); demo._styled = true;
    }
    stage.classList.add('stage'); stage.dataset.stage = demo.id; stage.dataset.mode = mode;
    stage.dataset.stageTheme = demo.stage.theme; stage.dataset.overflow = demo.stage.overflow;
    stage.dataset.suspended = 'false'; delete stage.dataset.bootError;
    stage.replaceChildren();
    const content = document.createElement('div'); content.className = 'stage-content';
    content.innerHTML = R.resolveAssets(demo.html); stage.appendChild(content);
    const root = content.querySelector('.'+demo.rootClass) || content.firstElementChild;
    const runtime = stage._runtime = R.createRuntime(stage);
    const actions = new Map();
    const ctx = {
      mode, theme:demo.stage.theme, reducedMotion:matchMedia('(prefers-reduced-motion:reduce)').matches,
      scale:1, size:{w:0,h:0},
      onAction(name,fn) { if (typeof fn !== 'function') throw new TypeError('Action must be a function'); actions.set(name,fn); },
      emit(name,detail) { stage.dispatchEvent(new CustomEvent('intrx:'+name,{detail,bubbles:true})); }
    };
    stage._ctx = ctx; stage._root = root;
    const fit = () => {
      ctx.scale = R.fitStage(stage,root,demo,mode);
      ctx.size = { w:stage.clientWidth, h:stage.clientHeight };
    };
    try {
      fit();
      const observer = new ResizeObserver(fit); observer.observe(stage); runtime.onDispose(()=>observer.disconnect());
      actions.set('replay',()=>R.mountStage(demo,stage,mode));
      // Older canvas demos use a local `const ctx` for their drawing context.
      // A block lets that binding coexist with the new shell context parameter.
      const code='{\n'+R.resolveAssets(demo.js)+'\n}';
      const result = new Function('root','stage','ctx',...TIMER_NAMES,code)(root,stage,ctx,...TIMER_NAMES.map(name=>runtime[name]));
      if (typeof result === 'function') runtime.cleanup = result;
      else if (result) {
        runtime.cleanup = result.cleanup;
        Object.entries(result.actions || {}).forEach(([name,fn])=>ctx.onAction(name,fn));
      }
      const dock = document.createElement('div'); dock.className = 'stage-dock'; dock.setAttribute('role','group'); dock.setAttribute('aria-label',demo.title+' controls');
      (demo.controls || []).forEach(control=>{
        const button=document.createElement('button'); button.type='button'; button.className='dock-btn'; button.textContent=control.label;
        button.dataset.action=control.action;
        button.disabled=!actions.has(control.action);
        button.addEventListener('click',()=>{ const action=actions.get(control.action); if (action) action(); }); dock.appendChild(button);
      });
      if (dock.childElementCount) stage.appendChild(dock);
      if (mode==='thumb') content.querySelectorAll('a,button,input,textarea,select,[tabindex]').forEach(element=>element.setAttribute('tabindex','-1'));
      stage.dispatchEvent(new CustomEvent('intrx:boot',{detail:{id:demo.id,mode},bubbles:true}));
    } catch(error) {
      runtime.dispose(); stage.dataset.bootError='true';
      stage.textContent='Demo failed to boot. See console for details.';
      console.error('[INTRX] demo "'+demo.id+'" failed:',error);
    }
    return runtime;
  };

  R.LiveTiles = class LiveTiles {
    constructor() {
      this.records = new Map(); this.holding = false; this.frame = 0;
      this.touch = matchMedia('(pointer:coarse)').matches || navigator.maxTouchPoints > 0;
      this.cap = this.touch ? 1 : 6;
      this.observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{ const record=this.records.get(entry.target); if(record) record.ratio=entry.intersectionRatio; }); this.schedule();
      },{threshold:[0,.5,1]});
      this.onScroll=()=>this.schedule();
      addEventListener('scroll',this.onScroll,{passive:true}); addEventListener('resize',this.onScroll,{passive:true});
    }
    add(demo,tile) {
      const stage=tile.querySelector('.demo-stage');
      const poster=document.createElement('button'); poster.type='button'; poster.className='stage-play';
      poster.setAttribute('aria-label','Play '+demo.title); poster.hidden=true;
      const icon=document.createElement('img');icon.src='assets/kit/play.svg';icon.alt='';poster.appendChild(icon);
      tile.appendChild(poster);
      const record={demo,tile,stage,poster,ratio:0,unlocked:!this.touch||!['hover','drag'].includes(demo.trigger),manualPause:false};
      this.records.set(tile,record); poster.addEventListener('click',()=>this.toggle(tile));
      tile.querySelector('.tile-details').addEventListener('keydown',event=>{if(event.code==='Space'){event.preventDefault();this.toggle(tile);}});
      this.observer.observe(tile);
    }
    toggle(tile) {
      const record=this.records.get(tile);if(!record)return;
      if (!record.unlocked) record.unlocked=true;
      else record.manualPause=record.stage._runtime&&!record.stage._runtime.suspended;
      this.preferred=tile;this.update();
    }
    schedule() { if(!this.frame)this.frame=requestAnimationFrame(()=>{this.frame=0;this.update();}); }
    update() {
      const visible=[...this.records.values()].filter(record=>record.ratio>=.5&&!record.tile.classList.contains('hidden'));
      visible.sort((a,b)=>{
        if(a.tile===this.preferred)return -1;if(b.tile===this.preferred)return 1;
        const center=record=>{const rect=record.stage.getBoundingClientRect();return Math.abs(rect.top+rect.height/2-innerHeight/2);};
        return center(a)-center(b);
      });
      const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
      const live=new Set(this.holding?[]:visible.filter(record=>record.unlocked&&!record.manualPause&&(!reduced||record.tile===this.preferred)).slice(0,this.cap));
      // Don't boot newly intersecting previews behind an open detail view.
      if(!this.holding)visible.forEach(record=>{
        if(record.stage._runtime||record.pending)return;
        if(!R.loadDemo){R.mountStage(record.demo,record.stage,'thumb');return;}
        record.pending=true;
        R.loadDemo(record.demo.id).then(demo=>{
          record.pending=false;if(!this.records.has(record.tile)||!record.tile.isConnected)return;
          record.ready=demo;
          if(!this.holding){R.mountStage(demo,record.stage,'thumb');this.schedule();}
        }).catch(error=>{record.pending=false;if(!this.records.has(record.tile)||!record.tile.isConnected)return;record.stage.dataset.bootError='true';record.stage.textContent='Preview unavailable';console.error('[INTRX]',error);});
      });
      this.records.forEach(record=>{
        const active=live.has(record),runtime=record.stage._runtime;
        if(runtime)active?runtime.resume():runtime.suspend();
        record.stage._visible=active;record.tile.classList.toggle('preview-idle',!active);
        record.stage.inert=!active;
        const content=record.stage.querySelector('.stage-content');if(content)content.inert=!active;
        const captured=active&&this.touch&&record.unlocked&&['drag','hover'].includes(record.demo.trigger);
        record.stage.style.touchAction=captured?'none':'pan-y';
        record.poster.hidden=active||record.ratio<.5||this.holding;
        record.poster.setAttribute('aria-label',(active?'Pause ':'Play ')+record.demo.title);
      });
    }
    suspendAll() { this.holding=true;this.update(); }
    resumeAll() { this.holding=false;this.preferred=null;this.update(); }
    destroy() {
      this.observer.disconnect();cancelAnimationFrame(this.frame);removeEventListener('scroll',this.onScroll);removeEventListener('resize',this.onScroll);
      this.records.forEach(record=>{if(record.stage._runtime)record.stage._runtime.dispose();});this.records.clear();
    }
  };
})();
