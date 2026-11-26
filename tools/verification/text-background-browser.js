/* Diagnostic only: remove glyph fill while preserving layout and CSS currentColor. */
window.installContrastProbe=function(root){
 const saved=new Map(),targets=[];let serial=0;
 const rect=r=>({x:r.x,y:r.y,width:r.width,height:r.height});
 const split=value=>{const out=[];let depth=0,start=0;for(let i=0;i<value.length;i++){if(value[i]==='(')depth++;else if(value[i]===')')depth--;else if(value[i]===','&&!depth){out.push(value.slice(start,i).trim());start=i+1;}}out.push(value.slice(start).trim());return out;};
 const direct=n=>[...n.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE&&n.data.trim());
 function color(value){
  if(value==='transparent')return[0,0,0,0];
  const rgb=value.match(/^rgba?\((.*)\)$/);if(rgb){const a=rgb[1].split(/\s*[,/]\s*|\s+/).filter(Boolean).map(Number);if(a.length===3)a.push(1);return a.length===4&&a.every(Number.isFinite)?a:null;}
  return null;
 }
 function info(el){
  const text=direct(el).map(n=>n.data).join(''),styles=getComputedStyle(el),problems=[];
  const ranges=direct(el).flatMap(n=>{const r=document.createRange();r.selectNodeContents(n);return[...r.getClientRects()].map(rect);});
  if(el.namespaceURI!=='http://www.w3.org/1999/xhtml')problems.push('non-HTML text');
  if(!ranges.length||styles.visibility!=='visible'||styles.display==='none')problems.push('not visible');
  if(/\p{Extended_Pictographic}|\uFE0F/u.test(text))problems.push('possibly intrinsic-color glyph');
  const fill=color(styles.webkitTextFillColor||styles.color);if(!fill)problems.push('unsupported color');
  if(styles.textShadow!=='none')problems.push('text shadow');
  if(parseFloat(styles.webkitTextStrokeWidth)!==0)problems.push('text stroke');
  for(const pseudo of ['::before','::after']){const p=getComputedStyle(el,pseudo);if(!['none','normal','""',"''"].includes(p.content))problems.push('pseudo text');}
  let bounds={x:0,y:0,right:innerWidth,bottom:innerHeight};
  for(let n=el;n;n=n.parentElement){
   const s=getComputedStyle(n),r=n.getBoundingClientRect();
   if(+s.opacity!==1)problems.push('group opacity');
   if(s.filter!=='none')problems.push('filter');
   if(s.mixBlendMode!=='normal')problems.push('blend mode');
   if(s.maskImage!=='none'||s.webkitMaskImage!=='none')problems.push('mask');
   if(s.backgroundClip.includes('text')||s.webkitBackgroundClip?.includes('text'))problems.push('text-clipped background');
   if(s.clipPath!=='none')problems.push('clip path');
   if(['hidden','clip','scroll','auto'].includes(s.overflowX)){bounds.x=Math.max(bounds.x,r.left);bounds.right=Math.min(bounds.right,r.right);}
   if(['hidden','clip','scroll','auto'].includes(s.overflowY)){bounds.y=Math.max(bounds.y,r.top);bounds.bottom=Math.min(bounds.bottom,r.bottom);}
  }
  const visible=ranges.map(r=>({x:Math.max(r.x,bounds.x),y:Math.max(r.y,bounds.y),right:Math.min(r.x+r.width,bounds.right),bottom:Math.min(r.y+r.height,bounds.bottom)})).filter(r=>r.right>r.x&&r.bottom>r.y);
  // Capture the viewport: glyph ink can overhang Range advance boxes.
  let clip=null;if(visible.length)clip={x:0,y:0,width:innerWidth,height:innerHeight};else problems.push('no visible text range');
  return{text,tag:el.localName,className:el.className,style:el.getAttribute('style'),color:styles.color,fill,fillCSS:styles.webkitTextFillColor,fontSize:styles.fontSize,fontWeight:styles.fontWeight,ranges,clip,problems:[...new Set(problems)],ariaHidden:el.closest('[aria-hidden=true]')!==null,inert:el.closest('[inert]')!==null};
 }
 for(const el of[root,...root.querySelectorAll('*')])if(direct(el).length)targets.push({key:++serial,el,original:info(el)});
 function restore(){
  // Flush the original fill while its probe transition is still instantaneous.
  // Restoring transition:all and the original fill together would animate back.
  for(const[el,record]of saved)el.style.setProperty('-webkit-text-fill-color',record.fill,'important');
  for(const[el]of saved)void getComputedStyle(el).webkitTextFillColor;
  for(const[el,record]of saved){if(record.style===null)el.removeAttribute('style');else el.setAttribute('style',record.style);}saved.clear();
 }
 return{
  list:()=>targets.map(t=>({key:t.key,...t.original})),
  inspect:key=>({key,...info(targets.find(t=>t.key===key).el)}),
  fill(key,value){restore();const t=targets.find(t=>t.key===key);if(!t)throw Error('Unknown probe target');const descendants=[...t.el.querySelectorAll('*')].map(el=>({el,fill:getComputedStyle(el).webkitTextFillColor}));for(const{el,fill}of descendants)saved.set(el,{style:el.getAttribute('style'),fill});saved.set(t.el,{style:t.el.getAttribute('style'),fill:getComputedStyle(t.el).webkitTextFillColor});for(const{el,fill}of descendants)el.style.setProperty('-webkit-text-fill-color',fill,'important');
   const s=getComputedStyle(t.el),properties=split(s.transitionProperty),durations=split(s.transitionDuration),delays=split(s.transitionDelay),easings=split(s.transitionTimingFunction),behaviors=split(s.transitionBehavior||'normal'),transitions=properties.map((p,i)=>p==='none'?null:p+' '+durations[i%durations.length]+' '+easings[i%easings.length]+' '+delays[i%delays.length]+' '+behaviors[i%behaviors.length]).filter(Boolean);transitions.push('-webkit-text-fill-color 0s linear 0s');t.el.style.setProperty('transition',transitions.join(', '),'important');
   t.el.style.setProperty('-webkit-text-fill-color',value,'important');return info(t.el);},
  restore(){restore();},
  restorable:()=>saved.size===0
 };
};
