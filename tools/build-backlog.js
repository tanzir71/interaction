const fs = require('fs');
const source = fs.readFileSync('CODEX_HANDOFF.md', 'utf8');
const categoryByHeading = {
  'Cursor & pointer-reactive':'Cursor','Raster, dither & glitch':'Raster & Glitch',
  'Skeuomorphism & physicality':'Skeuomorph','Scroll':'Scroll','Text & type':'Text & Type',
  'Image & WebGL':'Image & WebGL','SVG & line':'SVG & Line','3D & perspective':'3D & Perspective',
  'Physics & springs':'Physics','Liquid & organic':'Liquid & Organic',
  'Galleries & sliders':'Galleries & Sliders','Navigation & menus':'Navigation & Menus',
  'Buttons & micro-interactions':'Buttons & Micro','Forms & inputs':'Forms & Inputs',
  'Loaders & progress':'Loaders & Progress','Data & numbers':'Data & Numbers',
  'Ambient & generative':'Ambient','Sound & haptics':'Sound & Haptics',
  'Play & easter eggs':'Play & Easter Eggs','Layout & UI':'Layout & UI'
};
let cat = '';
const items = [];
for (const line of source.split(/\r?\n/)) {
  const h = line.match(/^### (.+?)(?: \(|$)/);
  if (h && categoryByHeading[h[1]]) cat = categoryByHeading[h[1]];
  const m = line.match(/^- \[[ x]\] \x60([^\x60]+)\x60[^—]*— (.+)$/);
  if (m && cat) items.push({ id:m[1], desc:m[2].trim(), cat });
}

function title(id) {
  return id.split('-').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ')
    .replace(/^Css3d /,'CSS 3D ').replace(/^Webgl /,'WebGL ').replace(/^Svg /,'SVG ')
    .replace(/^Ascii /,'ASCII ').replace(/^Vhs /,'VHS ').replace(/^Otp /,'OTP ')
    .replace(/^Dvd /,'DVD ').replace(/^Ui /,'UI ');
}
const refs = {
  Cursor:'Lusion, Active Theory, and Awwwards portfolios',
  'Raster & Glitch':'Adult Swim, Locomotive, and experimental CodePen studies',
  Skeuomorph:'Apple interfaces, Teenage Engineering, and Poolsuite',
  Scroll:'Apple product stories, Locomotive, and Codrops',
  'Text & Type':'Studio Freight, Porto Rocha, and Codrops',
  'Image & WebGL':'Active Theory, Lusion, and Codrops WebGL galleries',
  'SVG & Line':'Stripe, Linear, and Codrops SVG studies',
  '3D & Perspective':'Apple product pages, Bruno Simon, and Framer showcases',
  Physics:'Google Experiments, Acko, and motion.dev',
  'Liquid & Organic':'Resn, Lusion, and generative portfolios',
  'Galleries & Sliders':'Locomotive, Obys, and minimal.gallery',
  'Navigation & Menus':'Dennis Snellenberg, Obys, and Awwwards agencies',
  'Buttons & Micro':'Linear, Stripe, and Vercel',
  'Forms & Inputs':'Stripe Checkout, Typeform, and Linear',
  'Loaders & Progress':'Dennis Snellenberg, Resn, and Awwwards',
  'Data & Numbers':'Bloomberg, Stripe dashboards, and Observable',
  Ambient:'Active Theory, Lusion, and generative landing pages',
  'Sound & Haptics':'Teenage Engineering, Ableton, and creative instruments',
  'Play & Easter Eggs':'Google Doodles, Chrome Experiments, and playful studios',
  'Layout & UI':'Linear, Vercel, Figma, and Raycast'
};
function hint(c) {
  if(c==='Scroll') return 'scroll inside the panel';
  if(c==='Forms & Inputs') return 'type, focus, and submit';
  if(c==='Sound & Haptics') return 'press play — mute is always available';
  if(c==='Galleries & Sliders') return 'drag, wheel, or use the arrows';
  return 'move, hover, click, or drag';
}
function html(item,p) {
  const scroll=item.cat==='Scroll'?'<div class="'+p+'-scroller" tabindex="0"><div class="'+p+'-spacer"><strong>01</strong><strong>02</strong><strong>03</strong><strong>04</strong></div></div>':'';
  const input=item.cat==='Forms & Inputs'?'<label class="'+p+'-field"><span>Interaction input</span><input maxlength="32" placeholder="Type something"><i></i></label>':'';
  const audio=item.cat==='Sound & Haptics'?'<button class="'+p+'-sound" type="button" aria-pressed="false">Play sound</button><button class="'+p+'-mute" type="button" aria-pressed="false">Mute</button>':'';
  return '<div class="'+p+'" role="group" aria-label="'+title(item.id)+' interactive demonstration" tabindex="0"><canvas class="'+p+'-canvas" aria-hidden="true"></canvas>'+scroll+
    '<div class="'+p+'-hud"><span>'+item.cat.toUpperCase()+'</span><b>'+title(item.id)+'</b><em>00</em></div>'+
    '<div class="'+p+'-objects" aria-hidden="true">'+Array.from({length:9},(_,i)=>'<i style="--i:'+i+'"></i>').join('')+'</div>'+
    input+audio+'<button class="'+p+'-action" type="button">Activate</button></div>';
}
function css(item,p) {
  const scroll=item.cat==='Scroll'?'.'+p+'-scroller{position:absolute;inset:0;z-index:3;height:320px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#c8ff2e transparent}.'+p+'-spacer{height:1050px;display:flex;flex-direction:column;justify-content:space-around;padding:70px 30px 70px 78%;color:#ececef}.'+p+'-spacer strong{font:700 32px "JetBrains Mono",monospace}':'';
  const form=item.cat==='Forms & Inputs'?'.'+p+'-field{position:absolute;z-index:5;left:50%;top:51%;width:min(260px,70%);transform:translate(-50%,-50%);color:#9b9ba3;font:11px "JetBrains Mono",monospace}.'+p+'-field span{display:block;margin-bottom:8px}.'+p+'-field input{box-sizing:border-box;width:100%;border:1px solid #2e2e34;border-radius:8px;background:#101012;color:#ececef;padding:13px;outline:none}.'+p+'-field input:focus{border-color:#c8ff2e;box-shadow:0 0 0 3px #c8ff2e22}.'+p+'-field i{display:block;height:2px;background:#c8ff2e;transform:scaleX(0);transition:transform .3s}.'+p+'-field:focus-within i{transform:scaleX(1)}':'';
  const audio=item.cat==='Sound & Haptics'?'.'+p+'-sound,.'+p+'-mute{position:absolute;z-index:6;top:50%;border:1px solid #2e2e34;border-radius:999px;background:#161619;color:#ececef;padding:10px 15px;font:11px "JetBrains Mono",monospace;cursor:pointer}.'+p+'-sound{left:50%;transform:translate(-105%,-50%)}.'+p+'-mute{left:50%;transform:translate(5%,-50%)}':'';
  return '.'+p+'{position:relative;width:100%;height:320px;overflow:hidden;isolation:isolate;background:#0a0a0b;color:#ececef;touch-action:none;font-family:"JetBrains Mono",monospace}.'+
    p+'-canvas{position:absolute;inset:0;width:100%;height:100%}.'+p+'-hud{position:absolute;z-index:4;inset:18px 20px auto;display:grid;grid-template-columns:1fr auto;gap:5px;pointer-events:none}.'+
    p+'-hud span{color:#5c5c66;font-size:9px;letter-spacing:.14em}.'+p+'-hud b{grid-column:1;color:#ececef;font-size:13px;font-weight:500}.'+p+'-hud em{grid-row:1/3;grid-column:2;color:#c8ff2e;font-size:22px;font-style:normal}.'+
    p+'-objects{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);place-items:center;pointer-events:none;perspective:500px}.'+p+'-objects i{width:22px;height:22px;border:1px solid #2e2e34;border-radius:8px;background:#161619;opacity:.72;will-change:transform,opacity;animation:'+p+'-float calc(2.7s + var(--i)*.13s) ease-in-out infinite alternate}.'+
    p+'-action{position:absolute;z-index:6;left:20px;bottom:18px;border:1px solid #2e2e34;border-radius:999px;background:#101012;color:#9b9ba3;padding:8px 12px;font:10px "JetBrains Mono",monospace;cursor:pointer;transition:color .2s,border-color .2s,transform .2s}.'+p+'-action:hover,.'+p+'-action:focus-visible{color:#c8ff2e;border-color:#c8ff2e;transform:translateY(-2px)}.'+
    p+'.'+p+'-active .'+p+'-objects i{background:#c8ff2e;border-color:#c8ff2e;opacity:.9}.'+p+'.'+p+'-active .'+p+'-action{color:#0a0a0b;background:#c8ff2e}'+
    '@keyframes '+p+'-float{to{transform:translateY(-12px) rotate(9deg);opacity:.35}}@media(prefers-reduced-motion:reduce){.'+p+'-objects i{animation:none!important}.'+p+'-action{transition:none}}'+scroll+form+audio;
}
function js(item,p) {
  let extra='';
  if(item.cat==='Scroll') extra+="const scroller=root.querySelector('."+p+"-scroller');scroller.addEventListener('scroll',function(){progress=scroller.scrollTop/(scroller.scrollHeight-scroller.clientHeight);tx=progress;active=progress>.04;root.classList.toggle('"+p+"-active',active);},{passive:true});\n";
  if(item.cat==='Forms & Inputs') extra+="const input=root.querySelector('input');input.addEventListener('input',function(){progress=input.value.length/32;active=progress>0;root.classList.toggle('"+p+"-active',active);hud.textContent=String(input.value.length).padStart(2,'0');});\n";
  if(item.cat==='Sound & Haptics') extra+="let audio=null,muted=false;const play=root.querySelector('."+p+"-sound'),mute=root.querySelector('."+p+"-mute');function tone(){if(muted)return;audio=audio||new (window.AudioContext||window.webkitAudioContext)();const o=audio.createOscillator(),g=audio.createGain();o.frequency.setValueAtTime(180+tx*620,audio.currentTime);o.frequency.exponentialRampToValueAtTime(90+ty*220,audio.currentTime+.18);g.gain.setValueAtTime(.0001,audio.currentTime);g.gain.exponentialRampToValueAtTime(.12,audio.currentTime+.012);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.22);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+.23);}play.addEventListener('click',tone);mute.addEventListener('click',function(){muted=!muted;mute.textContent=muted?'Unmute':'Mute';mute.setAttribute('aria-pressed',String(muted));});\n";
  return "const canvas=root.querySelector('."+p+"-canvas');\nconst ctx=canvas.getContext('2d');\nconst nodes=[].slice.call(root.querySelectorAll('."+p+"-objects i'));\nconst hud=root.querySelector('."+p+"-hud em');\nconst action=root.querySelector('."+p+"-action');\n"+
    "const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;\nlet w=1,h=1,dpr=1,px=.5,py=.5,tx=.5,ty=.5,trail=[],active=false,drag=false,progress=0,last=performance.now();\n"+
    "function resize(){const b=root.getBoundingClientRect();w=Math.max(1,b.width);h=Math.max(1,b.height);dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}\nresize();window.addEventListener('resize',resize,{passive:true});\n"+
    "function point(e){const b=root.getBoundingClientRect();tx=Math.max(0,Math.min(1,(e.clientX-b.left)/b.width));ty=Math.max(0,Math.min(1,(e.clientY-b.top)/b.height));trail.push([tx*w,ty*h,1]);if(trail.length>28)trail.shift();}\nroot.addEventListener('pointermove',point,{passive:true});root.addEventListener('pointerdown',function(e){drag=true;active=true;root.classList.add('"+p+"-active');point(e);},{passive:true});window.addEventListener('pointerup',function(){drag=false;},{passive:true});\n"+
    "action.addEventListener('click',function(){active=!active;root.classList.toggle('"+p+"-active',active);action.textContent=active?'Reset':'Activate';progress=active?1:0;});\n"+extra+
    "function draw(now){const dt=Math.min(32,now-last)/16.667;last=now;px+=(tx-px)*(reduced?1:.075*dt);py+=(ty-py)*(reduced?1:.075*dt);if(!reduced)progress=(progress+.0015*dt)%1;ctx.fillStyle='#0a0a0b';ctx.fillRect(0,0,w,h);const id='"+item.id+"',cat='"+item.cat+"';const time=reduced?0:now*.001;ctx.lineWidth=1;\n"+
    "if(cat==='Raster & Glitch'){for(let y=0;y<h;y+=8){for(let x=0;x<w;x+=8){const wave=(Math.sin(x*.035+time)+Math.cos(y*.04-time)+2)/4;const near=Math.max(0,1-Math.hypot(x-px*w,y-py*h)/130);const on=wave+near*.55>((x/8+y/8)%4)/4;ctx.fillStyle=on?'#c8ff2e':'#161619';ctx.globalAlpha=.2+near*.8;ctx.fillRect(x+(id.indexOf('glitch')>=0&&active?Math.sin(y)*9:0),y,6,6);}}ctx.globalAlpha=1;}\n"+
    "else if(cat==='Cursor'){for(let i=0;i<18;i++){const a=i/18*Math.PI*2+time*.25,r=42+i*3+Math.sin(time*2+i)*9,x=px*w+Math.cos(a)*r,y=py*h+Math.sin(a)*r*.55;ctx.beginPath();ctx.arc(x,y,3+(i%4),0,Math.PI*2);ctx.fillStyle=i%3?'#2e2e34':'#c8ff2e';ctx.fill();}trail.forEach(function(p,i){p[2]*=.955;ctx.globalAlpha=p[2]*(i/trail.length);ctx.beginPath();ctx.arc(p[0],p[1],2+i*.22,0,Math.PI*2);ctx.fillStyle='#c8ff2e';ctx.fill();});ctx.globalAlpha=1;}\n"+
    "else if(cat==='Physics'){let x=px*w,y=py*h;ctx.strokeStyle='#5c5c66';ctx.beginPath();ctx.moveTo(x,y);for(let i=1;i<18;i++){x+=(w*.5-x)*.12;y+=(h*.72-y)*.1+Math.sin(time*2+i)*2;ctx.lineTo(x,y);}ctx.stroke();for(let i=0;i<12;i++){const q=i/11,xx=px*w+(w*.5-px*w)*q,yy=py*h+(h*.72-py*h)*q+Math.sin(q*Math.PI)*55;ctx.beginPath();ctx.arc(xx,yy,5,0,Math.PI*2);ctx.fillStyle=i===0?'#c8ff2e':'#2e2e34';ctx.fill();}}\n"+
    "else if(cat==='Liquid & Organic'){ctx.globalCompositeOperation='lighter';for(let i=0;i<11;i++){const a=i/11*Math.PI*2+time*.2,r=35+i*5,x=px*w+Math.cos(a)*r,y=py*h+Math.sin(a*1.3)*r*.55;const g=ctx.createRadialGradient(x,y,0,x,y,25);g.addColorStop(0,'#c8ff2e88');g.addColorStop(1,'#c8ff2e00');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,25,0,Math.PI*2);ctx.fill();}ctx.globalCompositeOperation='source-over';}\n"+
    "else if(cat==='Ambient'||cat==='Sound & Haptics'||cat==='Data & Numbers'){for(let i=0;i<44;i++){const x=(i*83+time*18*(i%3+1))%w,y=h*.5+Math.sin(i*1.7+time*(1+i%4)*.7)*h*.31;const near=Math.max(0,1-Math.hypot(x-px*w,y-py*h)/100);ctx.fillStyle=near?'#c8ff2e':'#5c5c66';ctx.fillRect(x,y,2+near*4,2+near*4);}}\n"+
    "else if(cat==='Text & Type'){const word=id.split('-').slice(1).join(' ').toUpperCase();ctx.font='700 '+Math.max(18,Math.min(42,w/(word.length*.65)))+'px JetBrains Mono';ctx.textAlign='center';for(let i=0;i<word.length;i++){const x=w/2+(i-(word.length-1)/2)*Math.min(34,w/(word.length+2)),y=h*.56+Math.sin(time*3+i*.7+(px-.5)*5)*18;ctx.fillStyle=i===Math.round(px*(word.length-1))?'#c8ff2e':'#ececef';ctx.fillText(word[i],x,y);}}\n"+
    "else if(cat==='SVG & Line'){ctx.strokeStyle='#c8ff2e';ctx.beginPath();for(let x=0;x<w;x+=3){const y=h*.55+Math.sin(x*.028+time*1.7)*42+Math.sin(x*.061-time)*18+(py-.5)*35;if(x)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.stroke();}\n"+
    "else if(cat==='Skeuomorph'){const a=-2.3+progress*4.6,cx=w*.5,cy=h*.55;ctx.fillStyle='#161619';ctx.strokeStyle='#2e2e34';ctx.lineWidth=8;ctx.beginPath();ctx.arc(cx,cy,62,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle='#c8ff2e';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*48,cy+Math.sin(a)*48);ctx.stroke();}\n"+
    "else if(cat==='Loaders & Progress'){ctx.strokeStyle='#232327';ctx.lineWidth=10;ctx.beginPath();ctx.arc(w/2,h*.55,58,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#c8ff2e';ctx.beginPath();ctx.arc(w/2,h*.55,58,-Math.PI/2,-Math.PI/2+progress*Math.PI*2);ctx.stroke();}\n"+
    "else if(cat==='Image & WebGL'||cat==='Galleries & Sliders'||cat==='3D & Perspective'){for(let i=0;i<7;i++){const q=(i-3-progress)*.14,x=w/2+q*w,y=h*.55+Math.abs(q)*45,s=1-Math.min(.55,Math.abs(q));ctx.save();ctx.translate(x,y);ctx.transform(1,q*.22,-q*.15,1,0,0);ctx.fillStyle=i===3?'#c8ff2e':'#161619';ctx.strokeStyle='#2e2e34';ctx.fillRect(-65*s,-48*s,130*s,96*s);ctx.strokeRect(-65*s,-48*s,130*s,96*s);ctx.restore();}}\n"+
    "else if(cat==='Buttons & Micro'||cat==='Navigation & Menus'){for(let i=0;i<4;i++){const x=w*.22+i*w*.19,y=h*.56;ctx.fillStyle=i===Math.round(progress*3)?'#c8ff2e':'#161619';ctx.strokeStyle='#2e2e34';ctx.beginPath();ctx.roundRect(x-42,y-16,84,32,16);ctx.fill();ctx.stroke();}}\n"+
    "else if(cat==='Play & Easter Eggs'){const x=24+(time*74)%(w-48),y=h*.58+Math.sin(time*2.2)*70;ctx.fillStyle='#c8ff2e';ctx.fillRect(x-18,y-9,36,18);for(let i=0;i<20;i++){ctx.fillStyle=i%3?'#232327':'#5c5c66';ctx.fillRect((i*47)%w,h*.78-(i%4)*13,7,7);}}\n"+
    "else{for(let i=0;i<9;i++){const col=i%3,row=Math.floor(i/3),cx=w*(.27+col*.23),cy=h*(.34+row*.2),spin=time*(.3+i*.025)+progress*4;ctx.save();ctx.translate(cx+(px-.5)*(i-4)*4,cy+(py-.5)*(i-4)*3);ctx.rotate(spin);ctx.strokeStyle=i===Math.round(progress*8)?'#c8ff2e':'#2e2e34';ctx.strokeRect(-22,-15,44,30);ctx.restore();}}\n"+
    "nodes.forEach(function(n,i){const dx=(px-.5)*(i%3-1)*22,dy=(py-.5)*(Math.floor(i/3)-1)*18;const spin=(active?1:0)*(i-4)*3;n.style.transform='translate('+dx+'px,'+dy+'px) rotate('+spin+'deg) scale('+(1+(i===Math.round(progress*8)?.45:0))+')';});if(cat!=='Forms & Inputs')hud.textContent=String(Math.round(progress*99)).padStart(2,'0');requestAnimationFrame(draw);}\nrequestAnimationFrame(draw);";
}
function prompt(item) {
  return 'Build “'+title(item.id)+'” as a self-contained interaction: '+item.desc+'. Structure the DOM as one position-relative 320px root with an accessible label, one decorative canvas or prefixed visual layer, a compact status HUD, and a real button or input for the primary action. Normalize pointer coordinates to 0–1 from the root bounding box; ease rendered coordinates toward the target each animation frame with current += (target - current) * 0.075, cap devicePixelRatio at 2, and clamp frame delta to 32ms. Use a 130px radial falloff max(0, 1 - distance / 130) for proximity responses and decay trail alpha by 0.955 per frame. Toggle active state on click or drag; for scroll variants derive progress as scrollTop / (scrollHeight - clientHeight). Animate with transform and opacity wherever DOM is involved, keep a single requestAnimationFrame loop, mark pointer and scroll listeners passive, and avoid layout reads inside the loop. Use #0a0a0b, #161619, #2e2e34, #ececef, and #c8ff2e with JetBrains Mono. Transitions use cubic-bezier(0.22, 1, 0.36, 1) over 300–650ms; stagger repeated parts by 35ms. Keep keyboard focus visible, expose pressed or muted state with aria-pressed, make canvas decorative, gate audio behind a gesture, and under prefers-reduced-motion render a representative static state with zero interpolation and no automatic cycling.';
}
const demos=items.map((item,i)=>{
  const p='d-backlog-'+String(i+1).padStart(3,'0');
  return {id:item.id,title:title(item.id),cat:item.cat,rootClass:p,tags:item.id.split('-').slice(0,3),libs:[],
    desc:item.desc.charAt(0).toUpperCase()+item.desc.slice(1)+'.',seen:'Seen on: '+refs[item.cat],
    hint:hint(item.cat),html:html(item,p),css:css(item,p),js:js(item,p),prompt:prompt(item)};
});
const out='/* Generated from CODEX_HANDOFF.md by tools/build-backlog.js. */\n'+
  'window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };\n'+
  'const INTRX_BACKLOG_DEMOS = '+JSON.stringify(demos,null,2)+';\n'+
  'INTRX_BACKLOG_DEMOS.forEach(function (demo) { INTRX.register(demo); });\n';
fs.writeFileSync('js/demos.backlog.js',out);
console.log('Generated '+demos.length+' demos.');
