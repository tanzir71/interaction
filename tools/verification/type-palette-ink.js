/* Explicit solid text and SVG/stroked type; photographic glyph pixels are separate. */
module.exports=async function typePaletteInk(page,item){return page.evaluate(item=>{
 const stage=document.querySelector('.stage'),root=stage._root,rgb=s=>{const values=(s.match(/[\d.]+/g)||[]).map(Number);if(s.startsWith('color(srgb '))return values.map((v,i)=>i<3?v*255:v);if(!/^rgba?\(/.test(s))throw Error('Unsupported computed color '+s);return values;},over=(a,b)=>a.slice(0,3).map((v,i)=>v*(a[3]??1)+b[i]*(1-(a[3]??1))),lum=c=>c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0),contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05),rows=[];
 const targets=[...item.selectors.map(selector=>({selector,property:'color'})),...item.fill.map(selector=>({selector,property:'fill'})),...item.stroke.map(selector=>({selector,property:'webkitTextStrokeColor'}))];
 for(const {selector,property}of targets)for(const n of root.querySelectorAll(selector)){
  const s=getComputedStyle(n),box=n.getBoundingClientRect();if(!box.width||!box.height||!n.textContent.trim()||n.closest('[inert]'))continue;
  let opacity=1,hidden=false;const layers=[];for(let p=n;p&&p!==stage;p=p.parentElement){const c=getComputedStyle(p);opacity*=Number(c.opacity);hidden ||= c.display==='none'||c.visibility==='hidden';layers.push(rgb(c.backgroundColor));}if(hidden||opacity<.01)continue;
  let background=rgb(getComputedStyle(stage).backgroundColor).slice(0,3);for(const layer of layers.reverse())background=over(layer,background);
  const color=s[property],raw=rgb(color);if(raw.length<3)throw Error('Unresolved foreground '+color);const foreground=over([...raw.slice(0,3),(raw[3]??1)*opacity],background);rows.push({selector,property,text:n.textContent,color,background,opacity,ratio:contrast(foreground,background),font:s.fontSize,filter:s.filter,box:box.toJSON()});
 }return{theme:stage.dataset.stageTheme,background:getComputedStyle(stage).backgroundColor,rows};
},item);};
