const crypto=require('node:crypto'),{fs,A,ids,same,ok,open,finish}=require('./liquid-core-harness');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),allowed=new Set(Object.values(A.assets).map(a=>a.sha256));
(async()=>{let r;try{
 for(const preference of['no-preference','reduce'])for(const mode of['thumb','full'])for(let i=0;i<ids.length;i++){
  r=await open({blank:true,context:{reducedMotion:preference}});await r.context.route(/^https?:/,route=>route.abort());same(await r.page.evaluate(()=>typeof window.INTRX),'undefined','fresh offline context');
  const record=JSON.parse(fs.readFileSync('registry/c/'+ids[i]+'.json'));same(record.libs,[],'no runtime dependency');let html=record.files[0].content;
  if(mode==='thumb'){const next=html.replace(',"full");})();',',"thumb");})();');ok(next!==html,'native portable mode selected');html=next}
  ok(!html.includes('www.figma.com/api/mcp/asset'),'no temporary Figma asset URL');ok(!html.includes('{{asset:'),'all portable assets resolved');await r.page.setContent(html,{waitUntil:'load'});await r.page.waitForFunction(()=>{const s=document.querySelector('.stage');if(s?.dataset.bootError==='true')throw Error('Offline Liquid boot failed');return s?._root?.__LiquidInspect?.().ready});
  const data=await r.page.evaluate(()=>{const root=document.querySelector('.stage')._root;return{state:root.__LiquidInspect(),images:[...root.querySelectorAll('img')].map(n=>({src:n.src,loaded:n.complete&&n.naturalWidth>0}))}});same(data.state.mode,mode,'correct offline composition');
  for(const image of data.images){ok(image.loaded,'offline SVG decodes');ok(image.src.startsWith('data:'),'SVG fully embedded');ok(allowed.has(sha(Buffer.from(image.src.split(',')[1],'base64'))),'exact original SVG bytes offline')}
  const m=data.state.motion;if(i===0)same(m.nodes.length,mode==='thumb'?2:3,'complete membrane population');if(i===1){same(m.dots.length,35,'all original scalar sources');same([m.width,m.height],[288,180],'complete scalar grid')}if(i===2)same([m.width,m.height],[128,80],'complete water buffers');if(i===3){same(m.bodies.length,7,'all seven original thermal bodies');if(mode==='thumb')same(m.texture.bands.length,3,'all supplied colored regions')}

  await r.page.locator('[data-action="activate"]').click();await r.page.waitForTimeout(300);const next=await r.page.evaluate(()=>document.querySelector('.stage')._root.__LiquidInspect());same(next.motion.auto,false,'offline deliberate action takes over');if(preference==='reduce')same(next.frames,0,'offline reduced feedback stops');
  if(preference!=='reduce'&&i===1)ok(next.motion.frameCount>0,'offline complete scalar solver runs');if(preference!=='reduce'&&i===2)ok(next.motion.energy>0,'offline complete wave solver runs');if(preference!=='reduce'&&i===3)ok(next.motion.frames>0,'offline complete convection runs');
  const clean=await r.page.evaluate(()=>{const s=document.querySelector('.stage'),root=s._root;s._runtime.dispose();return root.__LiquidInspect()});same(clean.cleaned,true,'offline disposal');same(clean.frames,0,'offline callbacks canceled');await r.close();
 }
 finish('portable');
}catch(e){if(r)await r.browser.close();throw e}})().catch(e=>{console.error(e);process.exitCode=1});
