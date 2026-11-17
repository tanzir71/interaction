const crypto=require('node:crypto'),{fs,A,ids,open,same,near,ok,finish}=require('./physics-remaining-harness');
const classes=['d-collisions','d-softbody','d-cloth','d-wreck','d-inertia','d-snap'];
const slots=[[80,14.8],[120,14.8],[160,14.8],[60,49.4],[100,49.4],[140,49.4],[180,49.4],[40,84],[80,84],[120,84],[160,84],[200,84],[60,118.6],[100,118.6],[140,118.6],[180,118.6],[80,153.2],[120,153.2],[160,153.2]];
const references=[[
 ...slots.map(([x,y])=>['collision-bubble',x-19,y-19,38,38]),['collision-pointer',113.125,77.625,28.5,29.25]
],[['soft-body',38,70,164,88],['soft-highlight',78,76,62,30]],[['cloth-flag',46.5,18.04,151,81.9278]],[['wreck-cable',119.4,-18.6,1.2,63.2],['wreck-ball',90,38,60,60]],[['inertia-window',38,22,164,114]],[['snap-pointer',173.125,111.625,28.5,29.25]]];
(async()=>{
 for(const a of Object.values(A.assets)){
  const bytes=fs.readFileSync(a.file);ok(bytes.length>0,'nonempty supplied SVG');same(crypto.createHash('sha256').update(bytes).digest('hex'),a.sha256,'exact supplied SVG bytes');
  const tag=bytes.toString('utf8').match(/<svg\b[^>]*>/)[0];near(Number(tag.match(/\bwidth="([\d.]+)"/)[1]),a.width,'original SVG width');near(Number(tag.match(/\bheight="([\d.]+)"/)[1]),a.height,'original SVG height');
 }
 for(const reducedMotion of['no-preference','reduce']){
  const r=await open({context:{reducedMotion}});try{
   for(let i=0;i<ids.length;i++)for(const width of[372,330,280,234]){
    await r.mount(ids[i],{mode:'thumb',width,hold:true});
    const data=await r.page.evaluate(C=>{const root=document.querySelector('#physics-test')._root,b=root.getBoundingClientRect(),scale=b.width/root.offsetWidth;return{images:[...root.querySelectorAll('.'+C+'-native-image')].map(n=>{const p=n.getBoundingClientRect();return{src:n.getAttribute('src'),loaded:n.complete&&n.naturalWidth>0,width:Number(n.getAttribute('width')),height:Number(n.getAttribute('height')),x:(p.x-b.x)/scale,y:(p.y-b.y)/scale,w:p.width/scale,h:p.height/scale}}),hscroll:root.scrollWidth>root.clientWidth+1}},classes[i]);
    same(data.images.length,references[i].length,'every supplied artwork slot');same(data.hscroll,false,'no root horizontal scrolling');
    data.images.forEach((n,j)=>{const[key,x,y,w,h]=references[i][j],asset=A.assets[key];ok(n.loaded,'supplied image decodes');ok(n.src.endsWith(asset.file),'exact supplied asset callsite');near(n.width,w,'intrinsic image width');near(n.height,h,'intrinsic image height');near(n.x,x,'native artwork x',.035);near(n.y,y-2,'native artwork y',.035);near(n.w,w,'native artwork painted width',.035);near(n.h,h,'native artwork painted height',.035)});
    if(width===372)await r.page.locator('#physics-test').screenshot({path:'.artifacts/physics-remaining/'+ids[i]+'-native-'+reducedMotion+'.png'});
   }
   for(let i=0;i<ids.length;i++)for(const width of[390,375,360]){
    await r.mount(ids[i],{mode:'full',width,height:420,hold:true});
    const fonts=await r.page.evaluate(()=>{const root=document.querySelector('#physics-test')._root,scale=root.getBoundingClientRect().width/root.offsetWidth,out=[];for(const n of root.querySelectorAll('*')){if(n.closest('[class*="-sr"],[class*="-status"]')||!n.getClientRects().length)continue;const style=getComputedStyle(n);if(style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0||![...n.childNodes].some(c=>c.nodeType===3&&c.textContent.trim()))continue;const b=n.getBoundingClientRect();if(b.width&&b.height)out.push({text:n.textContent.trim(),font:parseFloat(style.fontSize)*scale})}return out});
    for(const f of fonts)ok(f.font>=10.99,'full optical type '+ids[i]+': '+f.text+' '+f.font);
    if(width===390)await r.page.locator('#physics-test').screenshot({path:'.artifacts/physics-remaining/'+ids[i]+'-full-'+reducedMotion+'.png'});
   }
   await r.close();
  }catch(e){await r.browser.close();throw e}
 }
 finish('artwork');
})().catch(e=>{console.error(e);process.exitCode=1});
