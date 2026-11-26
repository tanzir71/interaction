/* Explicit text targets. Photograph overlays are checked separately for preservation. */
module.exports=async function scrollPaletteInk(page,item){return page.evaluate(item=>{
 const stage=document.querySelector('.stage'),root=stage._root,rows=[],rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
 const over=(a,b)=>a.slice(0,3).map((v,i)=>v*(a[3]??1)+b[i]*(1-(a[3]??1)));
 const lum=c=>c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
 const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
 const definitions=item.selectors.map(selector=>({selector,kind:'text'}));if(item.fill)definitions.push({selector:item.fill,kind:'fill'});if(item.gradient)definitions.push({selector:item.gradient,kind:'gradient'});
 for(const{selector,kind}of definitions){for(const n of root.querySelectorAll(selector)){
  const box=n.getBoundingClientRect(),s=getComputedStyle(n);if(!box.width||!box.height||n.closest('[inert]'))continue;
  let opacity=1,hidden=false;const layers=[];
  for(let p=n;p&&p!==stage;p=p.parentElement){const c=getComputedStyle(p);opacity*=Number(c.opacity);hidden ||= c.display==='none'||c.visibility==='hidden';layers.push(rgb(c.backgroundColor));}
  if(hidden||opacity<.01)continue;
  let background=rgb(getComputedStyle(stage).backgroundColor).slice(0,3);for(const layer of layers.reverse())background=over(layer,background);
  let colors=kind==='fill'?[s.fill]:kind==='gradient'?[...s.backgroundImage.matchAll(/rgba?\([^)]*\)/g)].map(m=>m[0]):[s.color];
  if(kind==='gradient'&&!colors.length)throw Error('Missing actual gradient '+selector);
  for(const color of colors){const raw=rgb(color);if(raw.length<3)throw Error('Unresolved foreground '+color);const foreground=over([...raw.slice(0,3),(raw[3]??1)*opacity],background);
   const row={selector,kind,text:n.textContent,color,background,opacity,ratio:contrast(foreground,background),fontSize:s.fontSize,box:box.toJSON()};
   if(n.closest('.d-inertiagrid-meters')){const panel=n.closest('.d-inertiagrid-meters'),minimum=over(rgb(getComputedStyle(panel).backgroundColor),[0,0,0]);row.minimumPhotoBacking=minimum;row.minimumPhotoRatio=contrast(over([...raw.slice(0,3),(raw[3]??1)*opacity],minimum),minimum);}
   rows.push(row);
  }
 }}return{theme:stage.dataset.stageTheme,background:getComputedStyle(stage).backgroundColor,rows};
},item);};
