/* Native interactive studies. References are credited per component. */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};

INTRX.register({
  id: "showcase-dot-field",
  title: "Inertial Dot Field",
  cat: "Interactive Showcase",
  rootClass: "d-show-dot-field",
  tags: ["canvas","pointer","spring"],
  libs: [],
  hint: "Move the pointer · click to send a wave",
  desc: "A precise dot lattice yields around the pointer with damped spring inertia. Click emits a radial impulse; each dot returns to its original position.",
  seen: "An original vanilla implementation inspired by React Bits / Dot Grid.",
  source: {"name":"React Bits / Dot Grid","url":"https://reactbits.dev/backgrounds/dot-grid"},
  html: `<div class="d-show-dot-field" tabindex="0" role="region" aria-label="Inertial Dot Field. Arrow keys move the pointer; Enter activates the effect."><canvas aria-hidden="true"></canvas><div class="d-show-dot-field-meta"><span>INTERACTION STUDY</span><b>SPRING</b></div></div>`,
  css: `.d-show-dot-field{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-dot-field *{box-sizing:border-box}.d-show-dot-field:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-dot-field canvas{display:block;width:100%;height:100%}.d-show-dot-field .d-show-dot-field-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-dot-field .d-show-dot-field-meta b{font-weight:400;color:#fa7319}.d-show-dot-field button{font:inherit;cursor:pointer}.d-show-dot-field button:focus-visible,.d-show-dot-field input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-dot-field *, .d-show-dot-field *:before{animation:none!important;transition:none!important}}.d-show-dot-field{touch-action:pan-y}
/* Refined type, spacing and quiet interaction controls. */
.d-show-dot-field{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-dot-field :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-dot-field button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-dot-field-meta{display:none}.d-show-dot-field button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-dot-field [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-dot-field .d-show-dot-field-meta{display:none}`,
  js: `return (function canvasRuntime(root, factory) {
    const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    if (!ctx) { root.textContent = 'Canvas is unavailable in this browser.'; return; }
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const api = { ctx, w: 400, h: 320, x: 220, y: 164, down: false, active: false, inside: false, reduced: media.matches };
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    const scene = factory(api);
    const draw = dt => { ctx.clearRect(0,0,api.w,api.h); scene.draw(elapsed,dt); };
    const tick = now => {
      if (disposed || !root.isConnected) return;
      const dt = Math.min((now - (last || now))/1000, .032); last = now;
      if (visible && !document.hidden) { elapsed += dt; draw(dt); }
      if (!api.reduced) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      api.w = root.clientWidth; api.h = root.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1,2);
      canvas.width = Math.round(api.w*dpr); canvas.height = Math.round(api.h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (scene.resize) scene.resize();
      draw(0);
    };
    const locate = e => {
      const box = root.getBoundingClientRect();
      api.x = (e.clientX-box.left)*api.w/box.width; api.y = (e.clientY-box.top)*api.h/box.height;
      api.active = true; api.inside = true; root.dataset.interacted = 'true';
    };
    const move = e => { locate(e); if(scene.move)scene.move(); if(api.reduced)draw(0); };
    const down = e => { locate(e); api.down=true; root.setPointerCapture(e.pointerId); if(scene.down)scene.down(); if(api.reduced)draw(0); };
    const up = () => { api.down=false; if(scene.up)scene.up(); if(api.reduced)draw(0); };
    const key = e => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)) return;
      e.preventDefault(); api.active = true; api.inside = true; root.dataset.interacted = 'true';
      if(e.key==='ArrowLeft')api.x-=20; if(e.key==='ArrowRight')api.x+=20;
      if(e.key==='ArrowUp')api.y-=20; if(e.key==='ArrowDown')api.y+=20;
      api.x=Math.max(0,Math.min(api.w,api.x)); api.y=Math.max(0,Math.min(api.h,api.y));
      if(e.key===' '||e.key==='Enter'){ if(scene.down)scene.down(); }
      if(scene.move)scene.move(); draw(0);
    };
    root.addEventListener('pointermove',move); root.addEventListener('pointerdown',down);
    root.addEventListener('pointerup',up); root.addEventListener('pointercancel',up);
    root.addEventListener('pointerleave',()=>{if(!api.down){api.inside=false;if(api.reduced)draw(0);}});
    root.addEventListener('lostpointercapture',up); root.addEventListener('keydown',key);
    const observer=new ResizeObserver(resize); observer.observe(root);
    const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}); viewport.observe(root);
    const change=()=>{api.reduced=media.matches;cancelAnimationFrame(frame);last=0;draw(0);if(!api.reduced)frame=requestAnimationFrame(tick);};
    media.addEventListener('change',change); resize(); change();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();media.removeEventListener('change',change);};
  })(root, function(a){
    let dots=[], waves=[];
    return {resize(){dots=[];for(let y=50;y<a.h-20;y+=18)for(let x=20;x<a.w-10;x+=18)dots.push({x,y,dx:0,dy:0,vx:0,vy:0});},down(){waves.push({x:a.x,y:a.y,r:0});},draw(t,dt){
      const c=a.ctx,px=a.active?(a.inside?a.x:-1000):a.w*.52+Math.cos(t*.6)*45,py=a.active?(a.inside?a.y:-1000):170+Math.sin(t*.7)*30;
      waves=waves.filter(w=>w.r<Math.max(a.w,a.h)*1.5);waves.forEach(w=>w.r+=dt*330);
      dots.forEach(d=>{let x=d.x-px,y=d.y-py,dist=Math.hypot(x,y)||1,force=Math.max(0,1-dist/95)*19,tx=x/dist*force,ty=y/dist*force;
        waves.forEach(w=>{const wx=d.x-w.x,wy=d.y-w.y,wd=Math.hypot(wx,wy)||1,f=Math.exp(-Math.pow((wd-w.r)/18,2))*20;tx+=wx/wd*f;ty+=wy/wd*f;});
        if(a.reduced){d.dx=tx;d.dy=ty;}else{const step=Math.min(dt*60,2);d.vx=(d.vx+(tx-d.dx)*.075*step)*Math.pow(.77,step);d.vy=(d.vy+(ty-d.dy)*.075*step)*Math.pow(.77,step);d.dx+=d.vx*step;d.dy+=d.vy*step;}
        c.fillStyle=dist<90?'#fa7319':dist<150?'#8b8b90':'#3b3b40';c.beginPath();c.arc(d.x+d.dx,d.y+d.dy,dist<95?1.7:1.15,0,Math.PI*2);c.fill();
      });
    }};
  });`,
  prompt: `Build a self-contained Inertial Dot Field interaction. A precise dot lattice yields around the pointer with damped spring inertia. Click emits a radial impulse; each dot returns to its original position. Use a 320px-high near-black stage, a disciplined grayscale palette with #fa7319 as the only accent, and crisp 1px linework. Move the pointer · click to send a wave. Support Pointer Events, proportional local coordinates, arrow-key navigation and Enter activation. Cap canvas DPR at 2 and delta time at 32ms; resize using ResizeObserver. Stop rendering when offscreen, and cancel animation frames and disconnect observers on unmount. Respect live prefers-reduced-motion changes with a representative static state and direct input updates. Keep HTML, CSS, and JavaScript standalone with no network dependencies.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-threads",
  title: "Reactive Threads",
  cat: "Interactive Showcase",
  rootClass: "d-show-threads",
  tags: ["canvas","pointer","field"],
  libs: [],
  hint: "Move across the threads · pull them into focus",
  desc: "Thirty-six fine filaments bend as a continuous field around the pointer. A Gaussian falloff keeps the edges quiet while the center feels elastic.",
  seen: "An original vanilla implementation inspired by React Bits / Threads.",
  source: {"name":"React Bits / Threads","url":"https://reactbits.dev/backgrounds/threads"},
  html: `<div class="d-show-threads" tabindex="0" role="region" aria-label="Reactive Threads. Arrow keys move the pointer; Enter activates the effect."><canvas aria-hidden="true"></canvas><div class="d-show-threads-meta"><span>INTERACTION STUDY</span><b>FIELD</b></div></div>`,
  css: `.d-show-threads{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-threads *{box-sizing:border-box}.d-show-threads:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-threads canvas{display:block;width:100%;height:100%}.d-show-threads .d-show-threads-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-threads .d-show-threads-meta b{font-weight:400;color:#fa7319}.d-show-threads button{font:inherit;cursor:pointer}.d-show-threads button:focus-visible,.d-show-threads input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-threads *, .d-show-threads *:before{animation:none!important;transition:none!important}}.d-show-threads{touch-action:pan-y}
/* Refined type, spacing and quiet interaction controls. */
.d-show-threads{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-threads :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-threads button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-threads-meta{display:none}.d-show-threads button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-threads [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-threads .d-show-threads-meta{display:none}`,
  js: `return (function canvasRuntime(root, factory) {
    const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    if (!ctx) { root.textContent = 'Canvas is unavailable in this browser.'; return; }
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const api = { ctx, w: 400, h: 320, x: 220, y: 164, down: false, active: false, inside: false, reduced: media.matches };
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    const scene = factory(api);
    const draw = dt => { ctx.clearRect(0,0,api.w,api.h); scene.draw(elapsed,dt); };
    const tick = now => {
      if (disposed || !root.isConnected) return;
      const dt = Math.min((now - (last || now))/1000, .032); last = now;
      if (visible && !document.hidden) { elapsed += dt; draw(dt); }
      if (!api.reduced) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      api.w = root.clientWidth; api.h = root.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1,2);
      canvas.width = Math.round(api.w*dpr); canvas.height = Math.round(api.h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (scene.resize) scene.resize();
      draw(0);
    };
    const locate = e => {
      const box = root.getBoundingClientRect();
      api.x = (e.clientX-box.left)*api.w/box.width; api.y = (e.clientY-box.top)*api.h/box.height;
      api.active = true; api.inside = true; root.dataset.interacted = 'true';
    };
    const move = e => { locate(e); if(scene.move)scene.move(); if(api.reduced)draw(0); };
    const down = e => { locate(e); api.down=true; root.setPointerCapture(e.pointerId); if(scene.down)scene.down(); if(api.reduced)draw(0); };
    const up = () => { api.down=false; if(scene.up)scene.up(); if(api.reduced)draw(0); };
    const key = e => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)) return;
      e.preventDefault(); api.active = true; api.inside = true; root.dataset.interacted = 'true';
      if(e.key==='ArrowLeft')api.x-=20; if(e.key==='ArrowRight')api.x+=20;
      if(e.key==='ArrowUp')api.y-=20; if(e.key==='ArrowDown')api.y+=20;
      api.x=Math.max(0,Math.min(api.w,api.x)); api.y=Math.max(0,Math.min(api.h,api.y));
      if(e.key===' '||e.key==='Enter'){ if(scene.down)scene.down(); }
      if(scene.move)scene.move(); draw(0);
    };
    root.addEventListener('pointermove',move); root.addEventListener('pointerdown',down);
    root.addEventListener('pointerup',up); root.addEventListener('pointercancel',up);
    root.addEventListener('pointerleave',()=>{if(!api.down){api.inside=false;if(api.reduced)draw(0);}});
    root.addEventListener('lostpointercapture',up); root.addEventListener('keydown',key);
    const observer=new ResizeObserver(resize); observer.observe(root);
    const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}); viewport.observe(root);
    const change=()=>{api.reduced=media.matches;cancelAnimationFrame(frame);last=0;draw(0);if(!api.reduced)frame=requestAnimationFrame(tick);};
    media.addEventListener('change',change); resize(); change();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();media.removeEventListener('change',change);};
  })(root, function(a){return{draw(t){
    const c=a.ctx,px=a.active?a.x:a.w*.55,py=a.active?a.y:170+Math.sin(t*.5)*25;
    for(let i=0;i<36;i++){c.beginPath();for(let x=-10;x<=a.w+10;x+=5){const envelope=Math.exp(-Math.pow((x-px)/(a.w*.27),2));const y=104+i*3.4+Math.sin(x/a.w*5+i*.11+t*.35)*7+(py-160)*envelope+Math.sin(i*.085)*42*envelope;x===-10?c.moveTo(x,y):c.lineTo(x,y);}c.strokeStyle=i%9===0?'#fa7319':'rgba(210,210,215,'+(.14+i/100)+')';c.lineWidth=i%9===0?1:.6;c.stroke();}
  }};});`,
  prompt: `Build a self-contained Reactive Threads interaction. Thirty-six fine filaments bend as a continuous field around the pointer. A Gaussian falloff keeps the edges quiet while the center feels elastic. Use a 320px-high near-black stage, a disciplined grayscale palette with #fa7319 as the only accent, and crisp 1px linework. Move across the threads · pull them into focus. Support Pointer Events, proportional local coordinates, arrow-key navigation and Enter activation. Cap canvas DPR at 2 and delta time at 32ms; resize using ResizeObserver. Stop rendering when offscreen, and cancel animation frames and disconnect observers on unmount. Respect live prefers-reduced-motion changes with a representative static state and direct input updates. Keep HTML, CSS, and JavaScript standalone with no network dependencies.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-ballpit",
  title: "Tactile Ballpit",
  cat: "Interactive Showcase",
  rootClass: "d-show-ballpit",
  tags: ["canvas","pointer","physics"],
  libs: [],
  hint: "Push the spheres · click to scatter",
  desc: "A small pile of dimensional spheres responds to pointer collisions, gravity, and impulse. Pairwise collision resolution separates the bodies, while damping keeps the motion controlled.",
  seen: "An original vanilla implementation inspired by React Bits / Ballpit.",
  source: {"name":"React Bits / Ballpit","url":"https://reactbits.dev/backgrounds/ballpit"},
  html: `<div class="d-show-ballpit" tabindex="0" role="region" aria-label="Tactile Ballpit. Arrow keys move the pointer; Enter activates the effect."><canvas aria-hidden="true"></canvas><div class="d-show-ballpit-meta"><span>INTERACTION STUDY</span><b>PHYSICS</b></div></div>`,
  css: `.d-show-ballpit{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-ballpit *{box-sizing:border-box}.d-show-ballpit:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-ballpit canvas{display:block;width:100%;height:100%}.d-show-ballpit .d-show-ballpit-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-ballpit .d-show-ballpit-meta b{font-weight:400;color:#fa7319}.d-show-ballpit button{font:inherit;cursor:pointer}.d-show-ballpit button:focus-visible,.d-show-ballpit input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-ballpit *, .d-show-ballpit *:before{animation:none!important;transition:none!important}}.d-show-ballpit{touch-action:pan-y}
/* Refined type, spacing and quiet interaction controls. */
.d-show-ballpit{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-ballpit :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-ballpit button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-ballpit-meta{display:none}.d-show-ballpit button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-ballpit [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-ballpit .d-show-ballpit-meta{display:none}`,
  js: `return (function canvasRuntime(root, factory) {
    const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    if (!ctx) { root.textContent = 'Canvas is unavailable in this browser.'; return; }
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const api = { ctx, w: 400, h: 320, x: 220, y: 164, down: false, active: false, inside: false, reduced: media.matches };
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    const scene = factory(api);
    const draw = dt => { ctx.clearRect(0,0,api.w,api.h); scene.draw(elapsed,dt); };
    const tick = now => {
      if (disposed || !root.isConnected) return;
      const dt = Math.min((now - (last || now))/1000, .032); last = now;
      if (visible && !document.hidden) { elapsed += dt; draw(dt); }
      if (!api.reduced) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      api.w = root.clientWidth; api.h = root.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1,2);
      canvas.width = Math.round(api.w*dpr); canvas.height = Math.round(api.h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (scene.resize) scene.resize();
      draw(0);
    };
    const locate = e => {
      const box = root.getBoundingClientRect();
      api.x = (e.clientX-box.left)*api.w/box.width; api.y = (e.clientY-box.top)*api.h/box.height;
      api.active = true; api.inside = true; root.dataset.interacted = 'true';
    };
    const move = e => { locate(e); if(scene.move)scene.move(); if(api.reduced)draw(0); };
    const down = e => { locate(e); api.down=true; root.setPointerCapture(e.pointerId); if(scene.down)scene.down(); if(api.reduced)draw(0); };
    const up = () => { api.down=false; if(scene.up)scene.up(); if(api.reduced)draw(0); };
    const key = e => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)) return;
      e.preventDefault(); api.active = true; api.inside = true; root.dataset.interacted = 'true';
      if(e.key==='ArrowLeft')api.x-=20; if(e.key==='ArrowRight')api.x+=20;
      if(e.key==='ArrowUp')api.y-=20; if(e.key==='ArrowDown')api.y+=20;
      api.x=Math.max(0,Math.min(api.w,api.x)); api.y=Math.max(0,Math.min(api.h,api.y));
      if(e.key===' '||e.key==='Enter'){ if(scene.down)scene.down(); }
      if(scene.move)scene.move(); draw(0);
    };
    root.addEventListener('pointermove',move); root.addEventListener('pointerdown',down);
    root.addEventListener('pointerup',up); root.addEventListener('pointercancel',up);
    root.addEventListener('pointerleave',()=>{if(!api.down){api.inside=false;if(api.reduced)draw(0);}});
    root.addEventListener('lostpointercapture',up); root.addEventListener('keydown',key);
    const observer=new ResizeObserver(resize); observer.observe(root);
    const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}); viewport.observe(root);
    const change=()=>{api.reduced=media.matches;cancelAnimationFrame(frame);last=0;draw(0);if(!api.reduced)frame=requestAnimationFrame(tick);};
    media.addEventListener('change',change); resize(); change();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();media.removeEventListener('change',change);};
  })(root, function(a){
    let balls=[];
    return{resize(){balls=Array.from({length:16},(_,i)=>({x:45+(i%6)*Math.max(30,(a.w-90)/5),y:80+Math.floor(i/6)*58,r:16+(i%4)*5,vx:Math.sin(i)*.4,vy:0}));},down(){balls.forEach(b=>{const dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy)||1;b.vx+=dx/l*9;b.vy+=dy/l*9-4;if(a.reduced){b.x=Math.max(b.r+8,Math.min(a.w-b.r-8,b.x+dx/l*22));b.y=Math.max(50+b.r,Math.min(a.h-b.r-15,b.y+dy/l*22));}});},draw(t,dt){
      const c=a.ctx,step=Math.min(dt*60,1.9);
      if(!a.reduced)for(let pass=0;pass<2;pass++){
        balls.forEach(b=>{b.vy+=.15*step;b.vx*=.995;b.x+=b.vx*step/2;b.y+=b.vy*step/2;
          const px=a.active?a.x:a.w*.5+Math.sin(t*.7)*70,py=a.active?a.y:245,dx=b.x-px,dy=b.y-py,dist=Math.hypot(dx,dy)||1,reach=b.r+30;
          if(dist<reach){b.x+=dx/dist*(reach-dist)*.3;b.y+=dy/dist*(reach-dist)*.3;b.vx+=dx/dist*.8;b.vy+=dy/dist*.8;}
          if(b.x<b.r+8){b.x=b.r+8;b.vx=Math.abs(b.vx)*.7;}if(b.x>a.w-b.r-8){b.x=a.w-b.r-8;b.vx=-Math.abs(b.vx)*.7;}
          if(b.y>a.h-b.r-15){b.y=a.h-b.r-15;b.vy=-Math.abs(b.vy)*.65;}if(b.y<50+b.r){b.y=50+b.r;b.vy=Math.abs(b.vy)*.65;}
        });
        for(let i=0;i<balls.length;i++)for(let j=i+1;j<balls.length;j++){const b=balls[i],d=balls[j],dx=d.x-b.x,dy=d.y-b.y,l=Math.hypot(dx,dy)||1,min=b.r+d.r+1;if(l<min){const nx=dx/l,ny=dy/l,p=(min-l)*.5;b.x-=nx*p;b.y-=ny*p;d.x+=nx*p;d.y+=ny*p;const v=(d.vx-b.vx)*nx+(d.vy-b.vy)*ny;if(v<0){b.vx+=v*nx*.7;b.vy+=v*ny*.7;d.vx-=v*nx*.7;d.vy-=v*ny*.7;}}}
      }
      c.strokeStyle='#27272b';c.beginPath();c.moveTo(18,a.h-13);c.lineTo(a.w-18,a.h-13);c.stroke();
      balls.forEach((b,i)=>{const warm=i===6;const shadow=c.createRadialGradient(b.x+2,b.y+b.r*.64,0,b.x+2,b.y+b.r*.64,b.r*1.18);shadow.addColorStop(0,'rgba(0,0,0,.24)');shadow.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=shadow;c.beginPath();c.ellipse(b.x+2,b.y+b.r*.72,b.r*1.18,b.r*.5,0,0,Math.PI*2);c.fill();const g=c.createRadialGradient(b.x-b.r*.32,b.y-b.r*.42,b.r*.03,b.x-b.r*.08,b.y-b.r*.08,b.r*1.16);const stops=warm?['#caa782','#bea080','#ad9073','#92765e','#77634f']:['#818785','#757b79','#636b68','#505956','#3f4845'];[0,.27,.54,.8,1].forEach((at,k)=>g.addColorStop(at,stops[k]));c.fillStyle=g;c.beginPath();c.arc(b.x,b.y,b.r,0,Math.PI*2);c.fill();c.strokeStyle=warm?'rgba(244,222,199,.05)':'rgba(216,225,235,.04)';c.lineWidth=.3;c.stroke();});
    }};
  });`,
  prompt: `Build a self-contained Tactile Ballpit interaction. A small pile of dimensional spheres responds to pointer collisions, gravity, and impulse. Pairwise collision resolution separates the bodies, while damping keeps the motion controlled. Use a 320px-high near-black stage, a disciplined grayscale palette with #fa7319 as the only accent, and crisp 1px linework. Push the spheres · click to scatter. Support Pointer Events, proportional local coordinates, arrow-key navigation and Enter activation. Cap canvas DPR at 2 and delta time at 32ms; resize using ResizeObserver. Stop rendering when offscreen, and cancel animation frames and disconnect observers on unmount. Respect live prefers-reduced-motion changes with a representative static state and direct input updates. Keep HTML, CSS, and JavaScript standalone with no network dependencies.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-ripple-grid",
  title: "Ripple Grid",
  cat: "Interactive Showcase",
  rootClass: "d-show-ripple-grid",
  tags: ["canvas","pointer","wave"],
  libs: [],
  hint: "Move to bend the grid · click for a ripple",
  desc: "A continuous wire lattice ripples outward from the pointer. Distance-based sine displacement and exponential falloff create the impression of a flexible mesh without WebGL.",
  seen: "An original vanilla implementation inspired by React Bits / Ripple Grid.",
  source: {"name":"React Bits / Ripple Grid","url":"https://reactbits.dev/backgrounds/ripple-grid"},
  html: `<div class="d-show-ripple-grid" tabindex="0" role="region" aria-label="Ripple Grid. Arrow keys move the pointer; Enter activates the effect."><canvas aria-hidden="true"></canvas><div class="d-show-ripple-grid-meta"><span>INTERACTION STUDY</span><b>WAVE</b></div></div>`,
  css: `.d-show-ripple-grid{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-ripple-grid *{box-sizing:border-box}.d-show-ripple-grid:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-ripple-grid canvas{display:block;width:100%;height:100%}.d-show-ripple-grid .d-show-ripple-grid-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-ripple-grid .d-show-ripple-grid-meta b{font-weight:400;color:#fa7319}.d-show-ripple-grid button{font:inherit;cursor:pointer}.d-show-ripple-grid button:focus-visible,.d-show-ripple-grid input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-ripple-grid *, .d-show-ripple-grid *:before{animation:none!important;transition:none!important}}.d-show-ripple-grid{touch-action:pan-y}
/* Refined type, spacing and quiet interaction controls. */
.d-show-ripple-grid{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-ripple-grid :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-ripple-grid button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-ripple-grid-meta{display:none}.d-show-ripple-grid button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-ripple-grid [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-ripple-grid .d-show-ripple-grid-meta{display:none}`,
  js: `return (function canvasRuntime(root, factory) {
    const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    if (!ctx) { root.textContent = 'Canvas is unavailable in this browser.'; return; }
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const api = { ctx, w: 400, h: 320, x: 220, y: 164, down: false, active: false, inside: false, reduced: media.matches };
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    const scene = factory(api);
    const draw = dt => { ctx.clearRect(0,0,api.w,api.h); scene.draw(elapsed,dt); };
    const tick = now => {
      if (disposed || !root.isConnected) return;
      const dt = Math.min((now - (last || now))/1000, .032); last = now;
      if (visible && !document.hidden) { elapsed += dt; draw(dt); }
      if (!api.reduced) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      api.w = root.clientWidth; api.h = root.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1,2);
      canvas.width = Math.round(api.w*dpr); canvas.height = Math.round(api.h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (scene.resize) scene.resize();
      draw(0);
    };
    const locate = e => {
      const box = root.getBoundingClientRect();
      api.x = (e.clientX-box.left)*api.w/box.width; api.y = (e.clientY-box.top)*api.h/box.height;
      api.active = true; api.inside = true; root.dataset.interacted = 'true';
    };
    const move = e => { locate(e); if(scene.move)scene.move(); if(api.reduced)draw(0); };
    const down = e => { locate(e); api.down=true; root.setPointerCapture(e.pointerId); if(scene.down)scene.down(); if(api.reduced)draw(0); };
    const up = () => { api.down=false; if(scene.up)scene.up(); if(api.reduced)draw(0); };
    const key = e => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)) return;
      e.preventDefault(); api.active = true; api.inside = true; root.dataset.interacted = 'true';
      if(e.key==='ArrowLeft')api.x-=20; if(e.key==='ArrowRight')api.x+=20;
      if(e.key==='ArrowUp')api.y-=20; if(e.key==='ArrowDown')api.y+=20;
      api.x=Math.max(0,Math.min(api.w,api.x)); api.y=Math.max(0,Math.min(api.h,api.y));
      if(e.key===' '||e.key==='Enter'){ if(scene.down)scene.down(); }
      if(scene.move)scene.move(); draw(0);
    };
    root.addEventListener('pointermove',move); root.addEventListener('pointerdown',down);
    root.addEventListener('pointerup',up); root.addEventListener('pointercancel',up);
    root.addEventListener('pointerleave',()=>{if(!api.down){api.inside=false;if(api.reduced)draw(0);}});
    root.addEventListener('lostpointercapture',up); root.addEventListener('keydown',key);
    const observer=new ResizeObserver(resize); observer.observe(root);
    const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}); viewport.observe(root);
    const change=()=>{api.reduced=media.matches;cancelAnimationFrame(frame);last=0;draw(0);if(!api.reduced)frame=requestAnimationFrame(tick);};
    media.addEventListener('change',change); resize(); change();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();media.removeEventListener('change',change);};
  })(root, function(a){let pulse=0;return{down(){pulse=1;},draw(t,dt){
    pulse=Math.max(0,pulse-dt*.5);const c=a.ctx,px=a.active?a.x:a.w*.52,py=a.active?a.y:170;
    const point=(x,y)=>{const dx=x-px,dy=y-py,l=Math.hypot(dx,dy)||1;const f=Math.sin(l*.065-t*2.4)*Math.exp(-l/125)*(8+pulse*18);return[x+dx/l*f,y+dy/l*f];};
    for(let axis=0;axis<2;axis++)for(let k=0;k<(axis?a.h:a.w)+20;k+=22){c.beginPath();for(let q=0;q<(axis?a.w:a.h)+5;q+=5){const p=point(axis?q:k,axis?k:q);q?c.lineTo(...p):c.moveTo(...p);}c.strokeStyle=k%66===0?'#6a4a36':'#303035';c.lineWidth=.8;c.stroke();}
    c.strokeStyle='#fa7319';c.beginPath();c.arc(px,py,5+pulse*10,0,Math.PI*2);c.stroke();
  }};});`,
  prompt: `Build a self-contained Ripple Grid interaction. A continuous wire lattice ripples outward from the pointer. Distance-based sine displacement and exponential falloff create the impression of a flexible mesh without WebGL. Use a 320px-high near-black stage, a disciplined grayscale palette with #fa7319 as the only accent, and crisp 1px linework. Move to bend the grid · click for a ripple. Support Pointer Events, proportional local coordinates, arrow-key navigation and Enter activation. Cap canvas DPR at 2 and delta time at 32ms; resize using ResizeObserver. Stop rendering when offscreen, and cancel animation frames and disconnect observers on unmount. Respect live prefers-reduced-motion changes with a representative static state and direct input updates. Keep HTML, CSS, and JavaScript standalone with no network dependencies.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-magnet-lines",
  title: "Magnetic Line Field",
  cat: "Interactive Showcase",
  rootClass: "d-show-magnet-lines",
  tags: ["canvas","pointer","pointer"],
  libs: [],
  hint: "Move the pointer · watch the field align",
  desc: "A grid of short needles rotates toward a local attractor. Proximity controls line length and contrast, turning a simple angle calculation into a tactile magnetic field.",
  seen: "An original vanilla implementation inspired by React Bits / Magnet Lines.",
  source: {"name":"React Bits / Magnet Lines","url":"https://reactbits.dev/animations/magnet-lines"},
  html: `<div class="d-show-magnet-lines" tabindex="0" role="region" aria-label="Magnetic Line Field. Arrow keys move the pointer; Enter activates the effect."><canvas aria-hidden="true"></canvas><div class="d-show-magnet-lines-meta"><span>INTERACTION STUDY</span><b>POINTER</b></div></div>`,
  css: `.d-show-magnet-lines{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-magnet-lines *{box-sizing:border-box}.d-show-magnet-lines:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-magnet-lines canvas{display:block;width:100%;height:100%}.d-show-magnet-lines .d-show-magnet-lines-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-magnet-lines .d-show-magnet-lines-meta b{font-weight:400;color:#fa7319}.d-show-magnet-lines button{font:inherit;cursor:pointer}.d-show-magnet-lines button:focus-visible,.d-show-magnet-lines input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-magnet-lines *, .d-show-magnet-lines *:before{animation:none!important;transition:none!important}}.d-show-magnet-lines{touch-action:pan-y}
/* Refined type, spacing and quiet interaction controls. */
.d-show-magnet-lines{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-magnet-lines :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-magnet-lines button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-magnet-lines-meta{display:none}.d-show-magnet-lines button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-magnet-lines [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-magnet-lines .d-show-magnet-lines-meta{display:none}`,
  js: `return (function canvasRuntime(root, factory) {
    const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    if (!ctx) { root.textContent = 'Canvas is unavailable in this browser.'; return; }
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const api = { ctx, w: 400, h: 320, x: 220, y: 164, down: false, active: false, inside: false, reduced: media.matches };
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    const scene = factory(api);
    const draw = dt => { ctx.clearRect(0,0,api.w,api.h); scene.draw(elapsed,dt); };
    const tick = now => {
      if (disposed || !root.isConnected) return;
      const dt = Math.min((now - (last || now))/1000, .032); last = now;
      if (visible && !document.hidden) { elapsed += dt; draw(dt); }
      if (!api.reduced) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      api.w = root.clientWidth; api.h = root.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1,2);
      canvas.width = Math.round(api.w*dpr); canvas.height = Math.round(api.h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (scene.resize) scene.resize();
      draw(0);
    };
    const locate = e => {
      const box = root.getBoundingClientRect();
      api.x = (e.clientX-box.left)*api.w/box.width; api.y = (e.clientY-box.top)*api.h/box.height;
      api.active = true; api.inside = true; root.dataset.interacted = 'true';
    };
    const move = e => { locate(e); if(scene.move)scene.move(); if(api.reduced)draw(0); };
    const down = e => { locate(e); api.down=true; root.setPointerCapture(e.pointerId); if(scene.down)scene.down(); if(api.reduced)draw(0); };
    const up = () => { api.down=false; if(scene.up)scene.up(); if(api.reduced)draw(0); };
    const key = e => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)) return;
      e.preventDefault(); api.active = true; api.inside = true; root.dataset.interacted = 'true';
      if(e.key==='ArrowLeft')api.x-=20; if(e.key==='ArrowRight')api.x+=20;
      if(e.key==='ArrowUp')api.y-=20; if(e.key==='ArrowDown')api.y+=20;
      api.x=Math.max(0,Math.min(api.w,api.x)); api.y=Math.max(0,Math.min(api.h,api.y));
      if(e.key===' '||e.key==='Enter'){ if(scene.down)scene.down(); }
      if(scene.move)scene.move(); draw(0);
    };
    root.addEventListener('pointermove',move); root.addEventListener('pointerdown',down);
    root.addEventListener('pointerup',up); root.addEventListener('pointercancel',up);
    root.addEventListener('pointerleave',()=>{if(!api.down){api.inside=false;if(api.reduced)draw(0);}});
    root.addEventListener('lostpointercapture',up); root.addEventListener('keydown',key);
    const observer=new ResizeObserver(resize); observer.observe(root);
    const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}); viewport.observe(root);
    const change=()=>{api.reduced=media.matches;cancelAnimationFrame(frame);last=0;draw(0);if(!api.reduced)frame=requestAnimationFrame(tick);};
    media.addEventListener('change',change); resize(); change();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();media.removeEventListener('change',change);};
  })(root, function(a){return{draw(t){
    const c=a.ctx,px=a.active?a.x:a.w*.54+Math.cos(t*.5)*50,py=a.active?a.y:170+Math.sin(t*.6)*40;
    for(let y=65;y<a.h-30;y+=23)for(let x=28;x<a.w-15;x+=23){const angle=Math.atan2(py-y,px-x),dist=Math.hypot(px-x,py-y),len=dist<100?7:5;c.strokeStyle=dist<80?'#fa7319':dist<150?'#a0a0a6':'#4b4b50';c.lineWidth=1.4;c.beginPath();c.moveTo(x-Math.cos(angle)*len,y-Math.sin(angle)*len);c.lineTo(x+Math.cos(angle)*len,y+Math.sin(angle)*len);c.stroke();}
  }};});`,
  prompt: `Build a self-contained Magnetic Line Field interaction. A grid of short needles rotates toward a local attractor. Proximity controls line length and contrast, turning a simple angle calculation into a tactile magnetic field. Use a 320px-high near-black stage, a disciplined grayscale palette with #fa7319 as the only accent, and crisp 1px linework. Move the pointer · watch the field align. Support Pointer Events, proportional local coordinates, arrow-key navigation and Enter activation. Cap canvas DPR at 2 and delta time at 32ms; resize using ResizeObserver. Stop rendering when offscreen, and cancel animation frames and disconnect observers on unmount. Respect live prefers-reduced-motion changes with a representative static state and direct input updates. Keep HTML, CSS, and JavaScript standalone with no network dependencies.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-pixel-trail",
  title: "Fading Pixel Trail",
  cat: "Interactive Showcase",
  rootClass: "d-show-pixel-trail",
  tags: ["canvas","pointer","trail"],
  libs: [],
  hint: "Draw with the pointer · click to stamp",
  desc: "A quantized pointer trail leaves crisp square cells that fade at independent rates. Stamps overlap naturally, with no DOM elements created during pointer movement.",
  seen: "An original vanilla implementation inspired by React Bits / Pixel Trail.",
  source: {"name":"React Bits / Pixel Trail","url":"https://reactbits.dev/animations/pixel-trail"},
  html: `<div class="d-show-pixel-trail" tabindex="0" role="region" aria-label="Fading Pixel Trail. Arrow keys move the pointer; Enter activates the effect."><canvas aria-hidden="true"></canvas><div class="d-show-pixel-trail-meta"><span>INTERACTION STUDY</span><b>TRAIL</b></div></div>`,
  css: `.d-show-pixel-trail{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-pixel-trail *{box-sizing:border-box}.d-show-pixel-trail:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-pixel-trail canvas{display:block;width:100%;height:100%}.d-show-pixel-trail .d-show-pixel-trail-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-pixel-trail .d-show-pixel-trail-meta b{font-weight:400;color:#fa7319}.d-show-pixel-trail button{font:inherit;cursor:pointer}.d-show-pixel-trail button:focus-visible,.d-show-pixel-trail input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-pixel-trail *, .d-show-pixel-trail *:before{animation:none!important;transition:none!important}}.d-show-pixel-trail{touch-action:pan-y}
/* Refined type, spacing and quiet interaction controls. */
.d-show-pixel-trail{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-pixel-trail :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-pixel-trail button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-pixel-trail-meta{display:none}.d-show-pixel-trail button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-pixel-trail [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-pixel-trail .d-show-pixel-trail-meta{display:none}`,
  js: `return (function canvasRuntime(root, factory) {
    const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    if (!ctx) { root.textContent = 'Canvas is unavailable in this browser.'; return; }
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const api = { ctx, w: 400, h: 320, x: 220, y: 164, down: false, active: false, inside: false, reduced: media.matches };
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    const scene = factory(api);
    const draw = dt => { ctx.clearRect(0,0,api.w,api.h); scene.draw(elapsed,dt); };
    const tick = now => {
      if (disposed || !root.isConnected) return;
      const dt = Math.min((now - (last || now))/1000, .032); last = now;
      if (visible && !document.hidden) { elapsed += dt; draw(dt); }
      if (!api.reduced) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      api.w = root.clientWidth; api.h = root.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1,2);
      canvas.width = Math.round(api.w*dpr); canvas.height = Math.round(api.h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (scene.resize) scene.resize();
      draw(0);
    };
    const locate = e => {
      const box = root.getBoundingClientRect();
      api.x = (e.clientX-box.left)*api.w/box.width; api.y = (e.clientY-box.top)*api.h/box.height;
      api.active = true; api.inside = true; root.dataset.interacted = 'true';
    };
    const move = e => { locate(e); if(scene.move)scene.move(); if(api.reduced)draw(0); };
    const down = e => { locate(e); api.down=true; root.setPointerCapture(e.pointerId); if(scene.down)scene.down(); if(api.reduced)draw(0); };
    const up = () => { api.down=false; if(scene.up)scene.up(); if(api.reduced)draw(0); };
    const key = e => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)) return;
      e.preventDefault(); api.active = true; api.inside = true; root.dataset.interacted = 'true';
      if(e.key==='ArrowLeft')api.x-=20; if(e.key==='ArrowRight')api.x+=20;
      if(e.key==='ArrowUp')api.y-=20; if(e.key==='ArrowDown')api.y+=20;
      api.x=Math.max(0,Math.min(api.w,api.x)); api.y=Math.max(0,Math.min(api.h,api.y));
      if(e.key===' '||e.key==='Enter'){ if(scene.down)scene.down(); }
      if(scene.move)scene.move(); draw(0);
    };
    root.addEventListener('pointermove',move); root.addEventListener('pointerdown',down);
    root.addEventListener('pointerup',up); root.addEventListener('pointercancel',up);
    root.addEventListener('pointerleave',()=>{if(!api.down){api.inside=false;if(api.reduced)draw(0);}});
    root.addEventListener('lostpointercapture',up); root.addEventListener('keydown',key);
    const observer=new ResizeObserver(resize); observer.observe(root);
    const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}); viewport.observe(root);
    const change=()=>{api.reduced=media.matches;cancelAnimationFrame(frame);last=0;draw(0);if(!api.reduced)frame=requestAnimationFrame(tick);};
    media.addEventListener('change',change); resize(); change();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();media.removeEventListener('change',change);};
  })(root, function(a){let cells=new Map();const stamp=()=>{const x=Math.floor(a.x/16),y=Math.floor(a.y/16);cells.set(x+','+y,{x,y,life:1});};return{move:stamp,down(){stamp();for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++)cells.set((Math.floor(a.x/16)+i)+','+(Math.floor(a.y/16)+j),{x:Math.floor(a.x/16)+i,y:Math.floor(a.y/16)+j,life:1});},draw(t,dt){const c=a.ctx;if(!a.active){const x=Math.floor((a.w*.5+Math.sin(t*.9)*a.w*.26)/16),y=Math.floor((170+Math.sin(t*1.8)*50)/16);cells.set(x+','+y,{x,y,life:1});}
      c.fillStyle='#242428';for(let y=48;y<a.h;y+=16)for(let x=0;x<a.w;x+=16)c.fillRect(x,y,1,1);
      cells.forEach((p,key)=>{c.fillStyle='rgba(250,115,25,'+p.life+')';c.fillRect(p.x*16+1,p.y*16+1,14,14);if(!a.reduced)p.life-=dt*.45;if(p.life<=0)cells.delete(key);});
    }};});`,
  prompt: `Build a self-contained Fading Pixel Trail interaction. A quantized pointer trail leaves crisp square cells that fade at independent rates. Stamps overlap naturally, with no DOM elements created during pointer movement. Use a 320px-high near-black stage, a disciplined grayscale palette with #fa7319 as the only accent, and crisp 1px linework. Draw with the pointer · click to stamp. Support Pointer Events, proportional local coordinates, arrow-key navigation and Enter activation. Cap canvas DPR at 2 and delta time at 32ms; resize using ResizeObserver. Stop rendering when offscreen, and cancel animation frames and disconnect observers on unmount. Respect live prefers-reduced-motion changes with a representative static state and direct input updates. Keep HTML, CSS, and JavaScript standalone with no network dependencies.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-ribbons",
  title: "Elastic Ribbons",
  cat: "Interactive Showcase",
  rootClass: "d-show-ribbons",
  tags: ["canvas","pointer","spring"],
  libs: [],
  hint: "Move in wide arcs · the ribbons follow",
  desc: "Five trailing lines follow a chain of damped positions. Each strand uses a slightly different response, creating a layered ribbon that stretches during quick movements and settles smoothly.",
  seen: "An original vanilla implementation inspired by React Bits / Ribbons.",
  source: {"name":"React Bits / Ribbons","url":"https://reactbits.dev/animations/ribbons"},
  html: `<div class="d-show-ribbons" tabindex="0" role="region" aria-label="Elastic Ribbons. Arrow keys move the pointer; Enter activates the effect."><canvas aria-hidden="true"></canvas><div class="d-show-ribbons-meta"><span>INTERACTION STUDY</span><b>SPRING</b></div></div>`,
  css: `.d-show-ribbons{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-ribbons *{box-sizing:border-box}.d-show-ribbons:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-ribbons canvas{display:block;width:100%;height:100%}.d-show-ribbons .d-show-ribbons-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-ribbons .d-show-ribbons-meta b{font-weight:400;color:#fa7319}.d-show-ribbons button{font:inherit;cursor:pointer}.d-show-ribbons button:focus-visible,.d-show-ribbons input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-ribbons *, .d-show-ribbons *:before{animation:none!important;transition:none!important}}.d-show-ribbons{touch-action:pan-y}
/* Refined type, spacing and quiet interaction controls. */
.d-show-ribbons{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-ribbons :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-ribbons button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-ribbons-meta{display:none}.d-show-ribbons button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-ribbons [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-ribbons .d-show-ribbons-meta{display:none}`,
  js: `return (function canvasRuntime(root, factory) {
    const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    if (!ctx) { root.textContent = 'Canvas is unavailable in this browser.'; return; }
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const api = { ctx, w: 400, h: 320, x: 220, y: 164, down: false, active: false, inside: false, reduced: media.matches };
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    const scene = factory(api);
    const draw = dt => { ctx.clearRect(0,0,api.w,api.h); scene.draw(elapsed,dt); };
    const tick = now => {
      if (disposed || !root.isConnected) return;
      const dt = Math.min((now - (last || now))/1000, .032); last = now;
      if (visible && !document.hidden) { elapsed += dt; draw(dt); }
      if (!api.reduced) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      api.w = root.clientWidth; api.h = root.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1,2);
      canvas.width = Math.round(api.w*dpr); canvas.height = Math.round(api.h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (scene.resize) scene.resize();
      draw(0);
    };
    const locate = e => {
      const box = root.getBoundingClientRect();
      api.x = (e.clientX-box.left)*api.w/box.width; api.y = (e.clientY-box.top)*api.h/box.height;
      api.active = true; api.inside = true; root.dataset.interacted = 'true';
    };
    const move = e => { locate(e); if(scene.move)scene.move(); if(api.reduced)draw(0); };
    const down = e => { locate(e); api.down=true; root.setPointerCapture(e.pointerId); if(scene.down)scene.down(); if(api.reduced)draw(0); };
    const up = () => { api.down=false; if(scene.up)scene.up(); if(api.reduced)draw(0); };
    const key = e => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)) return;
      e.preventDefault(); api.active = true; api.inside = true; root.dataset.interacted = 'true';
      if(e.key==='ArrowLeft')api.x-=20; if(e.key==='ArrowRight')api.x+=20;
      if(e.key==='ArrowUp')api.y-=20; if(e.key==='ArrowDown')api.y+=20;
      api.x=Math.max(0,Math.min(api.w,api.x)); api.y=Math.max(0,Math.min(api.h,api.y));
      if(e.key===' '||e.key==='Enter'){ if(scene.down)scene.down(); }
      if(scene.move)scene.move(); draw(0);
    };
    root.addEventListener('pointermove',move); root.addEventListener('pointerdown',down);
    root.addEventListener('pointerup',up); root.addEventListener('pointercancel',up);
    root.addEventListener('pointerleave',()=>{if(!api.down){api.inside=false;if(api.reduced)draw(0);}});
    root.addEventListener('lostpointercapture',up); root.addEventListener('keydown',key);
    const observer=new ResizeObserver(resize); observer.observe(root);
    const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}); viewport.observe(root);
    const change=()=>{api.reduced=media.matches;cancelAnimationFrame(frame);last=0;draw(0);if(!api.reduced)frame=requestAnimationFrame(tick);};
    media.addEventListener('change',change); resize(); change();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();media.removeEventListener('change',change);};
  })(root, function(a){const strands=Array.from({length:5},()=>Array.from({length:30},()=>({x:200,y:170})));return{draw(t,dt){const c=a.ctx,px=a.active?a.x:a.w*.5+Math.cos(t*.8)*a.w*.24,py=a.active?a.y:170+Math.sin(t*1.6)*65;
    strands.forEach((points,j)=>{points.forEach((p,i)=>{if(a.reduced){p.x=px-i*5;p.y=py+Math.sin(i*.15+j*.2)*22+j*4;return;}const target=i?points[i-1]:{x:px,y:py+j*3},factor=1-Math.pow(1-(.35-j*.035),Math.max(dt*60,.01));p.x+=(target.x-p.x)*factor;p.y+=(target.y-p.y)*factor;});c.beginPath();points.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.strokeStyle=j===0?'#fa7319':'rgba(190,190,200,'+(.6-j*.09)+')';c.lineWidth=2-j*.25;c.lineCap='round';c.stroke();});
  }};});`,
  prompt: `Build a self-contained Elastic Ribbons interaction. Five trailing lines follow a chain of damped positions. Each strand uses a slightly different response, creating a layered ribbon that stretches during quick movements and settles smoothly. Use a 320px-high near-black stage, a disciplined grayscale palette with #fa7319 as the only accent, and crisp 1px linework. Move in wide arcs · the ribbons follow. Support Pointer Events, proportional local coordinates, arrow-key navigation and Enter activation. Cap canvas DPR at 2 and delta time at 32ms; resize using ResizeObserver. Stop rendering when offscreen, and cancel animation frames and disconnect observers on unmount. Respect live prefers-reduced-motion changes with a representative static state and direct input updates. Keep HTML, CSS, and JavaScript standalone with no network dependencies.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-mesh-surface",
  title: "Contour Mesh Surface",
  cat: "Interactive Showcase",
  rootClass: "d-show-mesh-surface",
  tags: ["canvas","pointer","surface"],
  libs: [],
  hint: "Move to reshape the material",
  desc: "A sculptural contour surface folds in response to pointer position. This lightweight Canvas 2D study translates the reference’s material movement into fine orange and graphite linework rather than reproducing its shader.",
  seen: "An original vanilla implementation inspired by Paper Shaders / Mesh Gradient.",
  source: {"name":"Paper Shaders / Mesh Gradient","url":"https://shaders.paper.design"},
  html: `<div class="d-show-mesh-surface" tabindex="0" role="region" aria-label="Contour Mesh Surface. Arrow keys move the pointer; Enter activates the effect."><canvas aria-hidden="true"></canvas><div class="d-show-mesh-surface-meta"><span>INTERACTION STUDY</span><b>SURFACE</b></div></div>`,
  css: `.d-show-mesh-surface{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-mesh-surface *{box-sizing:border-box}.d-show-mesh-surface:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-mesh-surface canvas{display:block;width:100%;height:100%}.d-show-mesh-surface .d-show-mesh-surface-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-mesh-surface .d-show-mesh-surface-meta b{font-weight:400;color:#fa7319}.d-show-mesh-surface button{font:inherit;cursor:pointer}.d-show-mesh-surface button:focus-visible,.d-show-mesh-surface input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-mesh-surface *, .d-show-mesh-surface *:before{animation:none!important;transition:none!important}}.d-show-mesh-surface{touch-action:pan-y}
/* Refined type, spacing and quiet interaction controls. */
.d-show-mesh-surface{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-mesh-surface :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-mesh-surface button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-mesh-surface-meta{display:none}.d-show-mesh-surface button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-mesh-surface [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-mesh-surface .d-show-mesh-surface-meta{display:none}`,
  js: `return (function canvasRuntime(root, factory) {
    const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    if (!ctx) { root.textContent = 'Canvas is unavailable in this browser.'; return; }
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const api = { ctx, w: 400, h: 320, x: 220, y: 164, down: false, active: false, inside: false, reduced: media.matches };
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    const scene = factory(api);
    const draw = dt => { ctx.clearRect(0,0,api.w,api.h); scene.draw(elapsed,dt); };
    const tick = now => {
      if (disposed || !root.isConnected) return;
      const dt = Math.min((now - (last || now))/1000, .032); last = now;
      if (visible && !document.hidden) { elapsed += dt; draw(dt); }
      if (!api.reduced) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      api.w = root.clientWidth; api.h = root.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1,2);
      canvas.width = Math.round(api.w*dpr); canvas.height = Math.round(api.h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (scene.resize) scene.resize();
      draw(0);
    };
    const locate = e => {
      const box = root.getBoundingClientRect();
      api.x = (e.clientX-box.left)*api.w/box.width; api.y = (e.clientY-box.top)*api.h/box.height;
      api.active = true; api.inside = true; root.dataset.interacted = 'true';
    };
    const move = e => { locate(e); if(scene.move)scene.move(); if(api.reduced)draw(0); };
    const down = e => { locate(e); api.down=true; root.setPointerCapture(e.pointerId); if(scene.down)scene.down(); if(api.reduced)draw(0); };
    const up = () => { api.down=false; if(scene.up)scene.up(); if(api.reduced)draw(0); };
    const key = e => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)) return;
      e.preventDefault(); api.active = true; api.inside = true; root.dataset.interacted = 'true';
      if(e.key==='ArrowLeft')api.x-=20; if(e.key==='ArrowRight')api.x+=20;
      if(e.key==='ArrowUp')api.y-=20; if(e.key==='ArrowDown')api.y+=20;
      api.x=Math.max(0,Math.min(api.w,api.x)); api.y=Math.max(0,Math.min(api.h,api.y));
      if(e.key===' '||e.key==='Enter'){ if(scene.down)scene.down(); }
      if(scene.move)scene.move(); draw(0);
    };
    root.addEventListener('pointermove',move); root.addEventListener('pointerdown',down);
    root.addEventListener('pointerup',up); root.addEventListener('pointercancel',up);
    root.addEventListener('pointerleave',()=>{if(!api.down){api.inside=false;if(api.reduced)draw(0);}});
    root.addEventListener('lostpointercapture',up); root.addEventListener('keydown',key);
    const observer=new ResizeObserver(resize); observer.observe(root);
    const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}); viewport.observe(root);
    const change=()=>{api.reduced=media.matches;cancelAnimationFrame(frame);last=0;draw(0);if(!api.reduced)frame=requestAnimationFrame(tick);};
    media.addEventListener('change',change); resize(); change();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();media.removeEventListener('change',change);};
  })(root, function(a){return{draw(t){const c=a.ctx,px=a.active?a.x:a.w*.5,py=a.active?a.y:165;c.save();c.translate(a.w/2,170);const sx=(px/a.w-.5)*1.5,sy=(py/a.h-.5)*1.3;
    for(let j=0;j<48;j++){const v=j/47*Math.PI;c.beginPath();for(let i=0;i<=100;i++){const u=i/100*Math.PI*2,r=80+Math.sin(u*3+v*2+t*.55)*10;const x=Math.cos(u)*Math.sin(v)*r,y=Math.cos(v)*83+Math.sin(u)*Math.sin(v)*23;const xx=x+Math.sin(v*2)*sx*24,yy=y+Math.cos(u)*sy*18;i?c.lineTo(xx,yy):c.moveTo(xx,yy);}c.strokeStyle=j>17&&j<26?'rgba(250,115,25,.8)':'rgba(180,180,189,.35)';c.lineWidth=.75;c.stroke();}c.restore();
  }};});`,
  prompt: `Build a self-contained Contour Mesh Surface interaction. A sculptural contour surface folds in response to pointer position. This lightweight Canvas 2D study translates the reference’s material movement into fine orange and graphite linework rather than reproducing its shader. Use a 320px-high near-black stage, a disciplined grayscale palette with #fa7319 as the only accent, and crisp 1px linework. Move to reshape the material. Support Pointer Events, proportional local coordinates, arrow-key navigation and Enter activation. Cap canvas DPR at 2 and delta time at 32ms; resize using ResizeObserver. Stop rendering when offscreen, and cancel animation frames and disconnect observers on unmount. Respect live prefers-reduced-motion changes with a representative static state and direct input updates. Keep HTML, CSS, and JavaScript standalone with no network dependencies.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-warp-tunnel",
  title: "Perspective Warp",
  cat: "Interactive Showcase",
  rootClass: "d-show-warp-tunnel",
  tags: ["canvas","pointer","depth"],
  libs: [],
  hint: "Move the vanishing point · click to accelerate",
  desc: "Nested wire rectangles travel out of a shared vanishing point. Pointer position shifts the perspective, while a brief click impulse changes the speed of the tunnel.",
  seen: "An original vanilla implementation inspired by Magic UI / Warp Background.",
  source: {"name":"Magic UI / Warp Background","url":"https://magicui.design/docs/components/warp-background"},
  html: `<div class="d-show-warp-tunnel" tabindex="0" role="region" aria-label="Perspective Warp. Arrow keys move the pointer; Enter activates the effect."><canvas aria-hidden="true"></canvas><div class="d-show-warp-tunnel-meta"><span>INTERACTION STUDY</span><b>DEPTH</b></div></div>`,
  css: `.d-show-warp-tunnel{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-warp-tunnel *{box-sizing:border-box}.d-show-warp-tunnel:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-warp-tunnel canvas{display:block;width:100%;height:100%}.d-show-warp-tunnel .d-show-warp-tunnel-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-warp-tunnel .d-show-warp-tunnel-meta b{font-weight:400;color:#fa7319}.d-show-warp-tunnel button{font:inherit;cursor:pointer}.d-show-warp-tunnel button:focus-visible,.d-show-warp-tunnel input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-warp-tunnel *, .d-show-warp-tunnel *:before{animation:none!important;transition:none!important}}.d-show-warp-tunnel{touch-action:pan-y}
/* Refined type, spacing and quiet interaction controls. */
.d-show-warp-tunnel{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-warp-tunnel :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-warp-tunnel button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-warp-tunnel-meta{display:none}.d-show-warp-tunnel button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-warp-tunnel [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-warp-tunnel .d-show-warp-tunnel-meta{display:none}`,
  js: `return (function canvasRuntime(root, factory) {
    const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    if (!ctx) { root.textContent = 'Canvas is unavailable in this browser.'; return; }
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const api = { ctx, w: 400, h: 320, x: 220, y: 164, down: false, active: false, inside: false, reduced: media.matches };
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    const scene = factory(api);
    const draw = dt => { ctx.clearRect(0,0,api.w,api.h); scene.draw(elapsed,dt); };
    const tick = now => {
      if (disposed || !root.isConnected) return;
      const dt = Math.min((now - (last || now))/1000, .032); last = now;
      if (visible && !document.hidden) { elapsed += dt; draw(dt); }
      if (!api.reduced) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      api.w = root.clientWidth; api.h = root.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1,2);
      canvas.width = Math.round(api.w*dpr); canvas.height = Math.round(api.h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (scene.resize) scene.resize();
      draw(0);
    };
    const locate = e => {
      const box = root.getBoundingClientRect();
      api.x = (e.clientX-box.left)*api.w/box.width; api.y = (e.clientY-box.top)*api.h/box.height;
      api.active = true; api.inside = true; root.dataset.interacted = 'true';
    };
    const move = e => { locate(e); if(scene.move)scene.move(); if(api.reduced)draw(0); };
    const down = e => { locate(e); api.down=true; root.setPointerCapture(e.pointerId); if(scene.down)scene.down(); if(api.reduced)draw(0); };
    const up = () => { api.down=false; if(scene.up)scene.up(); if(api.reduced)draw(0); };
    const key = e => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)) return;
      e.preventDefault(); api.active = true; api.inside = true; root.dataset.interacted = 'true';
      if(e.key==='ArrowLeft')api.x-=20; if(e.key==='ArrowRight')api.x+=20;
      if(e.key==='ArrowUp')api.y-=20; if(e.key==='ArrowDown')api.y+=20;
      api.x=Math.max(0,Math.min(api.w,api.x)); api.y=Math.max(0,Math.min(api.h,api.y));
      if(e.key===' '||e.key==='Enter'){ if(scene.down)scene.down(); }
      if(scene.move)scene.move(); draw(0);
    };
    root.addEventListener('pointermove',move); root.addEventListener('pointerdown',down);
    root.addEventListener('pointerup',up); root.addEventListener('pointercancel',up);
    root.addEventListener('pointerleave',()=>{if(!api.down){api.inside=false;if(api.reduced)draw(0);}});
    root.addEventListener('lostpointercapture',up); root.addEventListener('keydown',key);
    const observer=new ResizeObserver(resize); observer.observe(root);
    const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}); viewport.observe(root);
    const change=()=>{api.reduced=media.matches;cancelAnimationFrame(frame);last=0;draw(0);if(!api.reduced)frame=requestAnimationFrame(tick);};
    media.addEventListener('change',change); resize(); change();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();media.removeEventListener('change',change);};
  })(root, function(a){let boost=0;return{down(){boost=1;},draw(t,dt){boost=Math.max(0,boost-dt*.4);const c=a.ctx,cx=a.active?a.x:a.w*.5,cy=a.active?a.y:166;for(let i=0;i<18;i++){const z=((i/18+t*(.025+boost*.05))%1),s=z*z,w=a.w*s*1.7,h=a.h*s*1.4;c.strokeStyle=i%4===0?'rgba(250,115,25,'+(s*.7)+')':'rgba(150,150,160,'+(s*.38)+')';c.lineWidth=.8;c.strokeRect(cx-w/2,cy-h/2,w,h);}c.strokeStyle='#2c2c31';[[0,0],[a.w,0],[0,a.h],[a.w,a.h],[0,a.h/2],[a.w,a.h/2]].forEach(p=>{c.beginPath();c.moveTo(cx,cy);c.lineTo(...p);c.stroke();});c.fillStyle='#fa7319';c.fillRect(cx-2,cy-2,4,4);
  }};});`,
  prompt: `Build a self-contained Perspective Warp interaction. Nested wire rectangles travel out of a shared vanishing point. Pointer position shifts the perspective, while a brief click impulse changes the speed of the tunnel. Use a 320px-high near-black stage, a disciplined grayscale palette with #fa7319 as the only accent, and crisp 1px linework. Move the vanishing point · click to accelerate. Support Pointer Events, proportional local coordinates, arrow-key navigation and Enter activation. Cap canvas DPR at 2 and delta time at 32ms; resize using ResizeObserver. Stop rendering when offscreen, and cancel animation frames and disconnect observers on unmount. Respect live prefers-reduced-motion changes with a representative static state and direct input updates. Keep HTML, CSS, and JavaScript standalone with no network dependencies.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-converging-paths",
  title: "Converging Paths",
  cat: "Interactive Showcase",
  rootClass: "d-show-converging-paths",
  tags: ["svg","scroll","path"],
  libs: [],
  hint: "Scroll inside the canvas · trace the signal",
  desc: "Five independently drawn SVG paths converge into a single signal. A local scroll container maps progress to normalized stroke lengths, keeping the effect usable inside a component preview.",
  source: {"name":"Aceternity / Google Gemini Effect","url":"https://ui.aceternity.com/components/google-gemini-effect"},
  seen: "Original vanilla study inspired by Aceternity / Google Gemini Effect.",
  html: `<div class="d-show-converging-paths"><div class="d-show-converging-paths-scroll" tabindex="0" aria-label="Scroll to draw converging paths"><div class="d-show-converging-paths-track"><div class="d-show-converging-paths-sticky"><div class="d-show-converging-paths-meta"><span>FIVE INPUTS / ONE SIGNAL</span><b class="d-show-converging-paths-value">0%</b></div><svg viewBox="0 0 500 260" aria-label="Five paths converge into one output"></svg><span class="d-show-converging-paths-label">Everything, connected.</span></div></div></div></div>`,
  css: `.d-show-converging-paths{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-converging-paths *{box-sizing:border-box}.d-show-converging-paths:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-converging-paths canvas{display:block;width:100%;height:100%}.d-show-converging-paths .d-show-converging-paths-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-converging-paths .d-show-converging-paths-meta b{font-weight:400;color:#fa7319}.d-show-converging-paths button{font:inherit;cursor:pointer}.d-show-converging-paths button:focus-visible,.d-show-converging-paths input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-converging-paths *, .d-show-converging-paths *:before{animation:none!important;transition:none!important}}.d-show-converging-paths-scroll{height:320px;overflow-y:auto;overscroll-behavior:contain}.d-show-converging-paths-track{height:1000px}.d-show-converging-paths-sticky{position:sticky;top:0;height:320px}.d-show-converging-paths svg{position:absolute;inset:45px 0 0;width:100%;height:230px;overflow:visible}.d-show-converging-paths-label{position:absolute;bottom:27px;left:0;right:0;text-align:center;font-size:11px;color:#909097}
/* Refined type, spacing and quiet interaction controls. */
.d-show-converging-paths{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-converging-paths :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-converging-paths button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-converging-paths-meta{display:none}.d-show-converging-paths button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-converging-paths [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-converging-paths .d-show-converging-paths-meta{display:none}`,
  js: `return (function(root){const svg=root.querySelector('svg'),scroller=root.querySelector('[tabindex]'),ns='http://www.w3.org/2000/svg',paths=[];for(let i=0;i<5;i++){const y=30+i*50,d='M -20 '+y+' C 120 '+y+' 125 130 255 130 S 400 130 520 130';['#25252a',i===2?'#fa7319':'#c5c5ce'].forEach((color,j)=>{const path=document.createElementNS(ns,'path');path.setAttribute('d',d);path.setAttribute('fill','none');path.setAttribute('stroke',color);path.setAttribute('stroke-width',j?1.5:1);path.setAttribute('pathLength','1');if(j){path.style.strokeDasharray='1';paths.push(path);}svg.appendChild(path);});}
      const update=()=>{const progress=scroller.scrollTop/(scroller.scrollHeight-scroller.clientHeight);root.dataset.progress=progress.toFixed(3);paths.forEach((p,i)=>p.style.strokeDashoffset=String(1-Math.min(1,.12+progress*1.2-i*.025)));root.querySelector('[class$="-value"]').textContent=Math.round(progress*100)+'%';};scroller.addEventListener('scroll',update,{passive:true});update();})(root);`,
  prompt: `Create Converging Paths as a self-contained, responsive web interaction. Five independently drawn SVG paths converge into a single signal. A local scroll container maps progress to normalized stroke lengths, keeping the effect usable inside a component preview. Interaction: Scroll inside the canvas · trace the signal. Use the Pointer Events API and keyboard-accessible native controls. Keep the stage 320px tall, near-black #0a0a0b with subtle graphite structural edges, Inter interface type with regular Inter measurements, and a single #fa7319 accent. Use deliberate negative space and smooth damped motion, with broad realistic material lighting and gentle gradient falloffs. Respect prefers-reduced-motion, provide a static initial composition, scope every selector to the root, clean up observers and animation frames on removal, and include HTML, CSS and JavaScript in a copyable standalone document.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-orbital-path",
  title: "Path Follower",
  cat: "Interactive Showcase",
  rootClass: "d-show-orbital-path",
  tags: ["svg","path","drag"],
  libs: [],
  hint: "Scrub the range · move the object along its route",
  desc: "A small object follows the exact geometry of an SVG curve. An accessible range input scrubs distance along the path, demonstrating a portable primitive for scroll-driven route and orbit animations.",
  source: {"name":"Motion / SVG animation","url":"https://motion.dev/docs/react-svg-animation"},
  seen: "Original vanilla study inspired by Motion / SVG animation.",
  html: `<div class="d-show-orbital-path"><div class="d-show-orbital-path-meta"><span>OFFSET / PATH STUDY</span><b>01 → 100</b></div><svg viewBox="0 0 400 235" aria-label="An object follows a curved route"><path class="d-show-orbital-path-route" d="M60 145 C60 15 340 15 340 125 S110 220 110 135 S280 65 280 140"/><circle class="d-show-orbital-path-node" r="7"/></svg><label class="d-show-orbital-path-control">POSITION<input type="range" min="0" max="100" value="28" aria-label="Position along path"><output>28%</output></label></div>`,
  css: `.d-show-orbital-path{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-orbital-path *{box-sizing:border-box}.d-show-orbital-path:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-orbital-path canvas{display:block;width:100%;height:100%}.d-show-orbital-path .d-show-orbital-path-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-orbital-path .d-show-orbital-path-meta b{font-weight:400;color:#fa7319}.d-show-orbital-path button{font:inherit;cursor:pointer}.d-show-orbital-path button:focus-visible,.d-show-orbital-path input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-orbital-path *, .d-show-orbital-path *:before{animation:none!important;transition:none!important}}.d-show-orbital-path svg{position:absolute;top:28px;width:100%;height:225px}.d-show-orbital-path-route{fill:none;stroke:#515158;stroke-width:1;stroke-dasharray:3 5}.d-show-orbital-path-node{fill:#fa7319;stroke:#ffbd92;stroke-width:1}.d-show-orbital-path-control{position:absolute;bottom:25px;left:25px;right:25px;display:flex;align-items:center;gap:15px;font-size:8px;color:#93939b}.d-show-orbital-path input{min-width:0;flex:1;accent-color:#fa7319;height:3px}.d-show-orbital-path output{width:32px;color:#fa7319}
/* Refined type, spacing and quiet interaction controls. */
.d-show-orbital-path{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-orbital-path :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-orbital-path button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-orbital-path-meta{display:none}.d-show-orbital-path button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-orbital-path [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-orbital-path .d-show-orbital-path-meta{display:none}`,
  js: `return (function(root){const path=root.querySelector('path'),node=root.querySelector('circle'),input=root.querySelector('input');const length=path.getTotalLength();const update=()=>{const p=path.getPointAtLength(Number(input.value)/100*length);node.setAttribute('cx',p.x);node.setAttribute('cy',p.y);root.querySelector('output').value=input.value+'%';root.dataset.position=input.value;};input.addEventListener('input',update);update();})(root);`,
  prompt: `Create Path Follower as a self-contained, responsive web interaction. A small object follows the exact geometry of an SVG curve. An accessible range input scrubs distance along the path, demonstrating a portable primitive for scroll-driven route and orbit animations. Interaction: Scrub the range · move the object along its route. Use the Pointer Events API and keyboard-accessible native controls. Keep the stage 320px tall, near-black #0a0a0b with subtle graphite structural edges, Inter interface type with regular Inter measurements, and a single #fa7319 accent. Use deliberate negative space and smooth damped motion, with broad realistic material lighting and gentle gradient falloffs. Respect prefers-reduced-motion, provide a static initial composition, scope every selector to the root, clean up observers and animation frames on removal, and include HTML, CSS and JavaScript in a copyable standalone document.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-mask-reveal",
  title: "Pointer Mask Reveal",
  cat: "Interactive Showcase",
  rootClass: "d-show-mask-reveal",
  tags: ["pointer","mask","type"],
  libs: [],
  hint: "Move to uncover the message · click to expand",
  desc: "A circular pointer mask reveals a second, contrasting typographic composition. Click expands the aperture; keyboard activation and arrow-key positioning expose the same interaction.",
  source: {"name":"Aceternity / SVG Mask Effect","url":"https://ui.aceternity.com/components/svg-mask-effect"},
  seen: "Original vanilla study inspired by Aceternity / SVG Mask Effect.",
  html: `<div class="d-show-mask-reveal"><button class="d-show-mask-reveal-field" aria-label="Reveal the hidden message" aria-pressed="false"><span class="d-show-mask-reveal-copy">LOOK<br>CLOSER.</span><span class="d-show-mask-reveal-layer"><span class="d-show-mask-reveal-copy">FEEL<br>SOMETHING.</span></span><span class="d-show-mask-reveal-reticle" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"/></svg></span></button><div class="d-show-mask-reveal-meta"><span>A DIFFERENT PERSPECTIVE</span><b>MASK / 02</b></div></div>`,
  css: `.d-show-mask-reveal{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-mask-reveal *{box-sizing:border-box}.d-show-mask-reveal:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-mask-reveal canvas{display:block;width:100%;height:100%}.d-show-mask-reveal .d-show-mask-reveal-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-mask-reveal .d-show-mask-reveal-meta b{font-weight:400;color:#fa7319}.d-show-mask-reveal button{font:inherit;cursor:pointer}.d-show-mask-reveal button:focus-visible,.d-show-mask-reveal input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-mask-reveal *, .d-show-mask-reveal *:before{animation:none!important;transition:none!important}}.d-show-mask-reveal-field{--x:50%;--y:53%;--r:65px;position:absolute;inset:0;border:0;background:#0a0a0b;color:#36363c;text-align:left;overflow:hidden;width:100%;height:100%;padding:0}.d-show-mask-reveal-copy{position:absolute;left:8%;top:90px;font-size:clamp(28px,11cqw,65px);font-weight:500;letter-spacing:-0.025em;line-height:1.05}.d-show-mask-reveal-layer{position:absolute;inset:0;background:#fa7319;color:#0a0a0b;clip-path:circle(var(--r) at var(--x) var(--y));transition:clip-path .18s ease-out}.d-show-mask-reveal-layer .d-show-mask-reveal-copy{font-size:clamp(25px,9cqw,56px)}.d-show-mask-reveal-field[aria-pressed=true]{--r:130px}.d-show-mask-reveal-reticle{position:absolute;left:var(--x);top:var(--y);transform:translate(-50%,-50%);font-size:17px;color:#ffffff80;pointer-events:none}
/* Refined type, spacing and quiet interaction controls. */
.d-show-mask-reveal{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-mask-reveal :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-mask-reveal button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-mask-reveal-meta{display:none}.d-show-mask-reveal button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-mask-reveal [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-mask-reveal .d-show-mask-reveal-meta{display:none}
.d-show-mask-reveal-reticle{width:14px;height:14px;display:grid;place-items:center;line-height:1}.d-show-mask-reveal-reticle svg{display:block}`,
  js: `return (function(root){const field=root.querySelector('button');field.addEventListener('pointermove',e=>{const r=field.getBoundingClientRect();field.style.setProperty('--x',(e.clientX-r.left)/r.width*100+'%');field.style.setProperty('--y',(e.clientY-r.top)/r.height*100+'%');});field.addEventListener('click',()=>field.setAttribute('aria-pressed',String(field.getAttribute('aria-pressed')!=='true')));field.addEventListener('keydown',e=>{if(!e.key.startsWith('Arrow'))return;e.preventDefault();const x=parseFloat(field.style.getPropertyValue('--x'))||50,y=parseFloat(field.style.getPropertyValue('--y'))||53;field.style.setProperty('--x',Math.max(0,Math.min(100,x+(e.key==='ArrowRight'?5:e.key==='ArrowLeft'?-5:0)))+'%');field.style.setProperty('--y',Math.max(0,Math.min(100,y+(e.key==='ArrowDown'?5:e.key==='ArrowUp'?-5:0)))+'%');});})(root);`,
  prompt: `Create Pointer Mask Reveal as a self-contained, responsive web interaction. A circular pointer mask reveals a second, contrasting typographic composition. Click expands the aperture; keyboard activation and arrow-key positioning expose the same interaction. Interaction: Move to uncover the message · click to expand. Use the Pointer Events API and keyboard-accessible native controls. Keep the stage 320px tall, near-black #0a0a0b with subtle graphite structural edges, Inter interface type with regular Inter measurements, and a single #fa7319 accent. Use deliberate negative space and smooth damped motion, with broad realistic material lighting and gentle gradient falloffs. Respect prefers-reduced-motion, provide a static initial composition, scope every selector to the root, clean up observers and animation frames on removal, and include HTML, CSS and JavaScript in a copyable standalone document.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-circular-gallery",
  title: "Curved Gallery",
  cat: "Interactive Showcase",
  rootClass: "d-show-circular-gallery",
  tags: ["drag","gallery","inertia"],
  libs: [],
  hint: "Drag sideways · or use the arrow controls",
  desc: "Seven original line studies travel along a curved carousel. Drag displacement feeds a damped position, release snaps to the nearest artwork, and the gallery wraps infinitely in either direction.",
  source: {"name":"React Bits / Circular Gallery","url":"https://reactbits.dev/components/circular-gallery"},
  seen: "Original vanilla study inspired by React Bits / Circular Gallery.",
  html: `<div class="d-show-circular-gallery"><div class="d-show-circular-gallery-meta"><span>FORM ARCHIVE</span><b>DRAG TO EXPLORE</b></div><div class="d-show-circular-gallery-track" tabindex="0" aria-label="Curved gallery. Use left and right arrows."></div><div class="d-show-circular-gallery-nav"><button type="button" aria-label="Previous artwork"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M19 12H5m7-7-7 7 7 7"/></svg></button><output aria-live="polite">01 / 07</output><button type="button" aria-label="Next artwork"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button></div></div>`,
  css: `.d-show-circular-gallery{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-circular-gallery *{box-sizing:border-box}.d-show-circular-gallery:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-circular-gallery canvas{display:block;width:100%;height:100%}.d-show-circular-gallery .d-show-circular-gallery-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-circular-gallery .d-show-circular-gallery-meta b{font-weight:400;color:#fa7319}.d-show-circular-gallery button{font:inherit;cursor:pointer}.d-show-circular-gallery button:focus-visible,.d-show-circular-gallery input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-circular-gallery *, .d-show-circular-gallery *:before{animation:none!important;transition:none!important}}.d-show-circular-gallery-track{position:absolute;inset:45px 0 52px;touch-action:pan-y;cursor:grab}.d-show-circular-gallery-track:active{cursor:grabbing}.d-show-circular-gallery-card{position:absolute;left:50%;top:18px;width:130px;height:164px;margin-left:-65px;border:1px solid #49494f;background:#171719;transform-origin:50% 260%;pointer-events:none;overflow:hidden}.d-show-circular-gallery-card svg,.d-show-circular-gallery-card img{width:100%;height:134px;object-fit:cover;display:block}.d-show-circular-gallery-card span{display:block;border-top:1px solid #333337;padding:8px 10px;font:7px "Inter",system-ui,sans-serif;color:#909099;letter-spacing:0.06em}.d-show-circular-gallery-nav{position:absolute;bottom:20px;left:22px;right:22px;display:flex;align-items:center;justify-content:center;gap:27px}.d-show-circular-gallery-nav button{border:1px solid #36363c;background:#171719;color:#d8d8de;width:30px;height:26px;font-size:12px}.d-show-circular-gallery-nav output{font-size:9px;color:#92929a}
/* Refined type, spacing and quiet interaction controls. */
.d-show-circular-gallery{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-circular-gallery :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-circular-gallery button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-circular-gallery-meta{display:none}.d-show-circular-gallery button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-circular-gallery [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-circular-gallery .d-show-circular-gallery-meta{display:none}
.d-show-circular-gallery-nav button{display:grid;place-items:center;padding:0}.d-show-circular-gallery-nav button svg{display:block}`,
  js: `return (function(root){const track=root.querySelector('[class$="-track"]'),p=root.className,cards=[];for(let i=0;i<7;i++){const card=document.createElement('div');card.className=p+'-card';const lines=Array.from({length:15},(_,j)=>'<ellipse cx="65" cy="65" rx="'+(12+j*2.8)+'" ry="'+(47-j*1.8)+'" transform="rotate('+(i*22+j*5)+' 65 65)" fill="none" stroke="'+(i===0?'#fa7319':'#a4a4ac')+'" stroke-width=".6"/>').join('');const photos=['{{asset:coastal-stack}}','{{asset:limestone-pavilion}}','{{asset:atlantic-shore}}'];card.innerHTML='<img src="'+photos[i%3]+'" alt="Landscape study" style="object-position:'+(30+i*7)+'% center"><span>STUDY / 00'+(i+1)+'</span>';track.appendChild(card);cards.push(card);}
      let target=0,current=0,dragging=false,start=0,origin=0,disposed=false,frame;const media=matchMedia('(prefers-reduced-motion: reduce)');
      const paint=()=>{cards.forEach((card,i)=>{let d=((i-current+3.5)%7+7)%7-3.5;card.style.transform='translate('+d*145+'px,'+Math.abs(d)*14+'px) rotate('+d*7+'deg)';card.style.opacity=String(Math.max(.15,1-Math.abs(d)*.2));card.style.zIndex=String(10-Math.round(Math.abs(d)));});const index=((Math.round(target)%7)+7)%7;root.querySelector('output').textContent=String(index+1).padStart(2,'0')+' / 07';root.dataset.index=String(index);};
      const tick=()=>{if(disposed||!root.isConnected)return;current=media.matches?target:current+(target-current)*.13;paint();if(Math.abs(target-current)>.001)frame=requestAnimationFrame(tick);};const update=()=>{cancelAnimationFrame(frame);tick();};
      track.addEventListener('pointerdown',e=>{dragging=true;start=e.clientX;origin=target;track.setPointerCapture(e.pointerId);});track.addEventListener('pointermove',e=>{if(!dragging)return;target=origin-(e.clientX-start)/145;update();});const end=()=>{if(!dragging)return;dragging=false;target=Math.round(target);update();};track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);track.addEventListener('lostpointercapture',end);
      root.querySelectorAll('button').forEach((b,i)=>b.addEventListener('click',()=>{target+=i?1:-1;update();}));track.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();target+=e.key==='ArrowRight'?1:-1;update();}});paint();return()=>{disposed=true;cancelAnimationFrame(frame);};})(root);`,
  prompt: `Create Curved Gallery as a self-contained, responsive web interaction. Seven original line studies travel along a curved carousel. Drag displacement feeds a damped position, release snaps to the nearest artwork, and the gallery wraps infinitely in either direction. Interaction: Drag sideways · or use the arrow controls. Use the Pointer Events API and keyboard-accessible native controls. Keep the stage 320px tall, near-black #0a0a0b with subtle graphite structural edges, Inter interface type with regular Inter measurements, and a single #fa7319 accent. Use deliberate negative space and smooth damped motion, with broad realistic material lighting and gentle gradient falloffs. Respect prefers-reduced-motion, provide a static initial composition, scope every selector to the root, clean up observers and animation frames on removal, and include HTML, CSS and JavaScript in a copyable standalone document.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-card-swap",
  title: "Toss & Stack",
  cat: "Interactive Showcase",
  rootClass: "d-show-card-swap",
  tags: ["drag","cards","spring"],
  libs: [],
  hint: "Drag the front card away · or press Next",
  desc: "A three-card stack combines distinct layers, restrained depth, and direct manipulation. Drag beyond a threshold to cycle the front card to the back; smaller gestures spring back into place.",
  source: {"name":"React Bits / Card Swap","url":"https://reactbits.dev/components/card-swap"},
  seen: "Original vanilla study inspired by React Bits / Card Swap.",
  html: `<div class="d-show-card-swap"><div class="d-show-card-swap-meta"><span>COLLECTED OBJECTS</span><b>STACK / 03</b></div><div class="d-show-card-swap-deck"><div class="d-show-card-swap-card"><small>INTERACTION / 001</small><strong>Make<br>it move.</strong><span>FORM &amp; FEEL <b aria-hidden="true"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></b></span></div><div class="d-show-card-swap-card"><small>INTERACTION / 002</small><strong>Less,<br>but better.</strong><span>SPACE &amp; RHYTHM <b aria-hidden="true"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></b></span></div><div class="d-show-card-swap-card"><small>INTERACTION / 003</small><strong>Stay<br>curious.</strong><span>PLAY &amp; DISCOVER <b aria-hidden="true"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></b></span></div></div><button class="d-show-card-swap-next" type="button"><span>Next card</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></button><output class="d-show-card-swap-count" aria-live="polite">01 / 03</output></div>`,
  css: `.d-show-card-swap{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-card-swap *{box-sizing:border-box}.d-show-card-swap:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-card-swap canvas{display:block;width:100%;height:100%}.d-show-card-swap .d-show-card-swap-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-card-swap .d-show-card-swap-meta b{font-weight:400;color:#fa7319}.d-show-card-swap button{font:inherit;cursor:pointer}.d-show-card-swap button:focus-visible,.d-show-card-swap input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-card-swap *, .d-show-card-swap *:before{animation:none!important;transition:none!important}}.d-show-card-swap-deck{position:absolute;width:220px;height:170px;left:50%;top:79px;transform:translateX(-50%);touch-action:pan-y}.d-show-card-swap-card{position:absolute;inset:0;padding:18px;border:1px solid #55555c;background:#202022;transition:transform .5s cubic-bezier(.2,.8,.2,1);cursor:grab;user-select:none;box-shadow:0 8px 20px #0003}.d-show-card-swap-card small{font-size:7px;color:#85858e;letter-spacing:0.06em}.d-show-card-swap-card strong{display:block;margin-top:14px;font-size:30px;font-weight:500;letter-spacing:-0.025em;line-height:1}.d-show-card-swap-card span{display:flex;justify-content:space-between;margin-top:17px;font-size:7px;color:#8b8b93}.d-show-card-swap-card span b{color:#fa7319}.d-show-card-swap-card[data-front=true]{border-top:2px solid #fa7319}.d-show-card-swap-next{position:absolute;bottom:20px;left:22px;padding:6px 0;background:none;border:0;color:#9b9ba3;font-size:9px!important}.d-show-card-swap-count{position:absolute;bottom:25px;right:22px;font-size:9px;color:#fa7319}
/* Refined type, spacing and quiet interaction controls. */
.d-show-card-swap{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-card-swap :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-card-swap button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-card-swap-meta{display:none}.d-show-card-swap button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-card-swap [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-card-swap .d-show-card-swap-meta{display:none}
.d-show-card-swap-card span{align-items:center}.d-show-card-swap-card span b{display:grid;place-items:center;flex:none;width:10px;height:10px}.d-show-card-swap svg{display:block;flex:none}.d-show-card-swap .d-show-card-swap-next{display:inline-flex;align-items:center;gap:6px;line-height:1.25}`,
  js: `return (function(root){const cards=[...root.querySelectorAll('[class$="-card"]')];let index=0,start=0,dx=0,active=null;const update=()=>{cards.forEach((card,i)=>{const depth=(i-index+3)%3;card.style.zIndex=String(3-depth);card.style.transform='translate('+depth*7+'px,'+(-depth*8)+'px) rotate('+depth*4+'deg)';card.dataset.front=String(!depth);});root.dataset.index=String(index);root.querySelector('output').textContent='0'+(index+1)+' / 03';};const next=()=>{index=(index+1)%3;update();};cards.forEach(card=>{card.addEventListener('pointerdown',e=>{if(card.dataset.front!=='true')return;active=card;start=e.clientX;dx=0;card.style.transition='none';card.setPointerCapture(e.pointerId);});card.addEventListener('pointermove',e=>{if(active!==card)return;dx=e.clientX-start;card.style.transform='translateX('+dx+'px) rotate('+dx*.07+'deg)';});const end=e=>{if(active!==card)return;card.style.transition='';active=null;if(e.type!=='pointercancel'&&Math.abs(dx)>55)next();else update();};card.addEventListener('pointerup',end);card.addEventListener('pointercancel',end);card.addEventListener('lostpointercapture',end);});root.querySelector('button').addEventListener('click',next);update();})(root);`,
  prompt: `Create Toss & Stack as a self-contained, responsive web interaction. A three-card stack combines distinct layers, restrained depth, and direct manipulation. Drag beyond a threshold to cycle the front card to the back; smaller gestures spring back into place. Interaction: Drag the front card away · or press Next. Use the Pointer Events API and keyboard-accessible native controls. Keep the stage 320px tall, near-black #0a0a0b with subtle graphite structural edges, Inter interface type with regular Inter measurements, and a single #fa7319 accent. Use deliberate negative space and smooth damped motion, with broad realistic material lighting and gentle gradient falloffs. Respect prefers-reduced-motion, provide a static initial composition, scope every selector to the root, clean up observers and animation frames on removal, and include HTML, CSS and JavaScript in a copyable standalone document.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-tracing-story",
  title: "Tracing Story",
  cat: "Interactive Showcase",
  rootClass: "d-show-tracing-story",
  tags: ["scroll","sticky","path"],
  libs: [],
  hint: "Scroll inside · follow the story as it unfolds",
  desc: "A thin accent beam traces the reading position beside three chapters. A sticky companion panel updates its title and geometric symbol as each chapter becomes active.",
  source: {"name":"Aceternity / Tracing Beam & Sticky Scroll","url":"https://ui.aceternity.com/components/tracing-beam"},
  seen: "Original vanilla study inspired by Aceternity / Tracing Beam & Sticky Scroll.",
  html: `<div class="d-show-tracing-story"><div class="d-show-tracing-story-scroll" tabindex="0" aria-label="Scroll through three chapters"><div class="d-show-tracing-story-rail"><i></i></div><div class="d-show-tracing-story-sticky"><span>PROCESS / <b>01</b></span><strong>Observe.</strong><div class="d-show-tracing-story-symbol" aria-hidden="true">◎</div></div><section><small>01 / NOTICE THE DETAILS</small><h3>Observe.</h3><p>Good interaction begins with paying attention.</p></section><section><small>02 / REMOVE THE NOISE</small><h3>Refine.</h3><p>Give every movement a reason to exist.</p></section><section><small>03 / MAKE IT TANGIBLE</small><h3>Respond.</h3><p>A small response can make the whole thing feel alive.</p></section></div></div>`,
  css: `.d-show-tracing-story{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-tracing-story *{box-sizing:border-box}.d-show-tracing-story:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-tracing-story canvas{display:block;width:100%;height:100%}.d-show-tracing-story .d-show-tracing-story-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-tracing-story .d-show-tracing-story-meta b{font-weight:400;color:#fa7319}.d-show-tracing-story button{font:inherit;cursor:pointer}.d-show-tracing-story button:focus-visible,.d-show-tracing-story input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-tracing-story *, .d-show-tracing-story *:before{animation:none!important;transition:none!important}}.d-show-tracing-story-scroll{height:320px;overflow-y:auto;position:relative;overscroll-behavior:contain;padding-left:22px}.d-show-tracing-story-rail{position:absolute;left:18px;top:30px;width:1px;height:760px;background:#333339}.d-show-tracing-story-rail i{display:block;width:1px;height:var(--progress,12%);background:#fa7319}.d-show-tracing-story-sticky{position:sticky;top:0;float:right;width:42%;height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-left:1px solid #232328;background:#101012}.d-show-tracing-story-sticky span{font-size:7px;color:#72727a}.d-show-tracing-story-sticky b{color:#fa7319;font-weight:400}.d-show-tracing-story-sticky strong{font-size:17px;font-weight:400;letter-spacing:-0.025em;margin-top:14px}.d-show-tracing-story-symbol{font-size:74px;line-height:1.6;color:#fa7319;font-family:"Inter",system-ui,sans-serif}.d-show-tracing-story section{width:54%;height:275px;padding:55px 14px 0}.d-show-tracing-story section small{font-size:7px;color:#777780;letter-spacing:0.02em}.d-show-tracing-story section h3{font-size:21px;letter-spacing:-0.025em;font-weight:500;margin:18px 0 12px}.d-show-tracing-story section p{font-size:10px;line-height:1.9;color:#97979e}
/* Refined type, spacing and quiet interaction controls. */
.d-show-tracing-story{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-tracing-story :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-tracing-story button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-tracing-story-meta{display:none}.d-show-tracing-story button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-tracing-story [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-tracing-story .d-show-tracing-story-meta{display:none}`,
  js: `return (function(root){const scroller=root.querySelector('[tabindex]'),words=['Observe.','Refine.','Respond.'],symbols=['◎','◇','↗'];const update=()=>{const progress=scroller.scrollTop/(scroller.scrollHeight-scroller.clientHeight),index=Math.min(2,Math.floor(progress*3));root.style.setProperty('--progress',(12+88*progress)+'%');root.querySelector('b').textContent='0'+(index+1);root.querySelector('strong').textContent=words[index];root.querySelector('[class$="-symbol"]').textContent=symbols[index];root.dataset.chapter=String(index);};scroller.addEventListener('scroll',update,{passive:true});update();})(root);`,
  prompt: `Create Tracing Story as a self-contained, responsive web interaction. A thin accent beam traces the reading position beside three chapters. A sticky companion panel updates its title and geometric symbol as each chapter becomes active. Interaction: Scroll inside · follow the story as it unfolds. Use the Pointer Events API and keyboard-accessible native controls. Keep the stage 320px tall, near-black #0a0a0b with subtle graphite structural edges, Inter interface type with regular Inter measurements, and a single #fa7319 accent. Use deliberate negative space and smooth damped motion, with broad realistic material lighting and gentle gradient falloffs. Respect prefers-reduced-motion, provide a static initial composition, scope every selector to the root, clean up observers and animation frames on removal, and include HTML, CSS and JavaScript in a copyable standalone document.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

INTRX.register({
  id: "showcase-elastic-slider",
  title: "Elastic Range",
  cat: "Interactive Showcase",
  rootClass: "d-show-elastic-slider",
  tags: ["drag","range","spring"],
  libs: [],
  hint: "Drag beyond the ends · release to settle",
  desc: "A native accessible range control gains a rubber-band response at its limits. Values remain clamped while excess drag distance stretches the track with square-root resistance, then settles on release.",
  source: {"name":"React Bits / Elastic Slider","url":"https://reactbits.dev/components/elastic-slider"},
  seen: "Original vanilla study inspired by React Bits / Elastic Slider.",
  html: `<div class="d-show-elastic-slider"><div class="d-show-elastic-slider-meta"><span>JUST THE RIGHT AMOUNT</span><b>VOLUME</b></div><div class="d-show-elastic-slider-value"><output>64</output><span>%</span></div><div class="d-show-elastic-slider-track"><span aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/></svg></span><div class="d-show-elastic-slider-rail"><i></i><b></b><input type="range" min="0" max="100" value="64" aria-label="Volume"></div><span aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"/></svg></span></div><p>Small details. Better feel.</p></div>`,
  css: `.d-show-elastic-slider{position:relative;width:100%;height:320px;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:"Inter",system-ui,sans-serif;isolation:isolate;container-type:inline-size}.d-show-elastic-slider *{box-sizing:border-box}.d-show-elastic-slider:focus-visible{outline:1px solid #fa7319;outline-offset:-5px}.d-show-elastic-slider canvas{display:block;width:100%;height:100%}.d-show-elastic-slider .d-show-elastic-slider-meta{position:absolute;inset:18px 20px auto;display:flex;justify-content:space-between;pointer-events:none;font:8px/1.4 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#727279;z-index:3}.d-show-elastic-slider .d-show-elastic-slider-meta b{font-weight:400;color:#fa7319}.d-show-elastic-slider button{font:inherit;cursor:pointer}.d-show-elastic-slider button:focus-visible,.d-show-elastic-slider input:focus-visible{outline:2px solid #fa7319;outline-offset:4px}@media(prefers-reduced-motion:reduce){.d-show-elastic-slider *, .d-show-elastic-slider *:before{animation:none!important;transition:none!important}}.d-show-elastic-slider-value{position:absolute;top:72px;left:0;right:0;text-align:center}.d-show-elastic-slider-value output{font-size:67px;letter-spacing:-0.025em;font-weight:400}.d-show-elastic-slider-value>span{color:#686870;font-size:13px;margin-left:8px}.d-show-elastic-slider-track{position:absolute;top:194px;left:12%;right:12%;display:flex;align-items:center;gap:18px;color:#77777f}.d-show-elastic-slider-rail{position:relative;height:36px;flex:1;touch-action:none;transform:translateX(var(--stretch,0px));transition:transform .5s cubic-bezier(.2,1.7,.4,1)}.d-show-elastic-slider-rail:before{content:"";position:absolute;inset:15px 0;height:4px;background:#333338}.d-show-elastic-slider-rail i{position:absolute;top:15px;left:0;height:4px;width:64%;background:#fa7319}.d-show-elastic-slider-rail b{position:absolute;top:8px;left:64%;width:3px;height:18px;background:#fff;transform:translateX(-50%);box-shadow:0 0 0 3px #0a0a0b}.d-show-elastic-slider input{position:absolute;inset:0;width:100%;height:36px;opacity:0;cursor:ew-resize;margin:0}.d-show-elastic-slider-rail:focus-within{outline:1px solid #686870;outline-offset:5px}.d-show-elastic-slider p{position:absolute;bottom:33px;left:0;right:0;text-align:center;font-size:9px;color:#717179}
/* Refined type, spacing and quiet interaction controls. */
.d-show-elastic-slider{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-show-elastic-slider :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-show-elastic-slider button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-show-elastic-slider-meta{display:none}.d-show-elastic-slider button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;border-radius:5px;border-color:#ffffff1c}.d-show-elastic-slider [class$="-readout"]{font-family:"Inter",system-ui,sans-serif;font-weight:400;letter-spacing:0;font-variant-numeric:tabular-nums}.d-show-elastic-slider-value{font:400 61px/1 "Inter",system-ui,sans-serif;letter-spacing:-.02em;font-variant-numeric:tabular-nums}.d-show-elastic-slider-value small{font:400 17px "Inter",system-ui,sans-serif}.d-show-elastic-slider .d-show-elastic-slider-meta{display:none}
.d-show-elastic-slider-track>span{display:grid;place-items:center;width:14px;height:14px;flex:none}.d-show-elastic-slider-track>span svg{display:block}.d-show-elastic-slider-rail:before,.d-show-elastic-slider-rail i{top:16px}.d-show-elastic-slider-rail b{top:9px}`,
  js: `return (function(root){const input=root.querySelector('input'),rail=root.querySelector('[class$="-rail"]');let down=false,bounds;const update=()=>{const v=input.value;root.querySelector('output').value=v;rail.querySelector('i').style.width=v+'%';rail.querySelector('b').style.left=v+'%';root.dataset.value=v;};input.addEventListener('input',update);input.addEventListener('pointerdown',e=>{down=true;bounds=rail.getBoundingClientRect();input.setPointerCapture(e.pointerId);});input.addEventListener('pointermove',e=>{if(!down)return;const x=e.clientX-bounds.left,w=bounds.width,over=x<0?x:x>w?x-w:0;root.style.setProperty('--stretch',Math.sign(over)*Math.sqrt(Math.abs(over))*2+'px');input.value=Math.round(Math.max(0,Math.min(1,x/w))*100);update();});const release=()=>{down=false;root.style.setProperty('--stretch','0px');};input.addEventListener('pointerup',release);input.addEventListener('pointercancel',release);input.addEventListener('lostpointercapture',release);update();})(root);`,
  prompt: `Create Elastic Range as a self-contained, responsive web interaction. A native accessible range control gains a rubber-band response at its limits. Values remain clamped while excess drag distance stretches the track with square-root resistance, then settles on release. Interaction: Drag beyond the ends · release to settle. Use the Pointer Events API and keyboard-accessible native controls. Keep the stage 320px tall, near-black #0a0a0b with subtle graphite structural edges, Inter interface type with regular Inter measurements, and a single #fa7319 accent. Use deliberate negative space and smooth damped motion, with broad realistic material lighting and gentle gradient falloffs. Respect prefers-reduced-motion, provide a static initial composition, scope every selector to the root, clean up observers and animation frames on removal, and include HTML, CSS and JavaScript in a copyable standalone document.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});
