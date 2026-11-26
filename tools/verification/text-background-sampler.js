/* Background measurement only. A reviewer must establish the final foreground paint. */
const assert=require('node:assert/strict'),{decode}=require('./sound-png');
const channel=x=>{const s=x/255;return s<=.04045?s/12.92:Math.pow((s+.055)/1.055,2.4);},luminance=a=>.2126*channel(a[0])+.7152*channel(a[1])+.0722*channel(a[2]);
function lower(fill,bg){const low=bg.map(c=>Math.max(0,c-1)),high=bg.map(c=>Math.min(255,c+1)),a=fill[3],fLow=fill.slice(0,3).map((c,i)=>Math.max(0,a*c+(1-a)*low[i]-1)),fHigh=fill.slice(0,3).map((c,i)=>Math.min(255,a*c+(1-a)*high[i]+1)),bl=luminance(low),bh=luminance(high),fl=luminance(fLow),fh=luminance(fHigh);return fl>bh?(fl+.05)/(bh+.05):bl>fh?(bl+.05)/(fh+.05):1;}
module.exports=async function sample(page,target,save){
 if(target.problems.length)return{...target,outcome:'pending',requiresManualForegroundReview:true,reasons:target.problems};
 const frames=()=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 const capture=async name=>{await frames();const bytes=await page.screenshot({clip:target.clip});save(name,bytes);return decode(bytes);};
 let result;try{
  const normalA=await capture('normal-a'),normalB=await capture('normal-b');
  if(!normalA.pixels.equals(normalB.pixels))return{...target,outcome:'pending',requiresManualForegroundReview:true,reasons:['unstable original pixels']};
  const steps=[];
  for(const[name,fill]of[['background','transparent'],['black','#000'],['white','#fff']]){const state=await page.evaluate(({key,fill})=>contrastProbe.fill(key,fill),{key:target.key,fill});assert.deepEqual(state.ranges,target.ranges,'Glyph fill preserves exact layout');assert.equal(state.color,target.color,'Glyph fill preserves CSS currentColor');assert.deepEqual(state.fill,fill==='transparent'?[0,0,0,0]:fill==='#000'?[0,0,0,1]:[255,255,255,1],'Probe fill is immediate and exact');steps.push(await capture(name));}
  const secondBackgroundState=await page.evaluate(key=>contrastProbe.fill(key,'transparent'),target.key);assert.deepEqual(secondBackgroundState.ranges,target.ranges);
  const backgroundB=await capture('background-b');await page.evaluate(()=>contrastProbe.restore());const restored=await capture('restored');assert.deepEqual(await page.evaluate(key=>contrastProbe.inspect(key),target.key),target,'Exact style/geometry restoration');
  if(!normalA.pixels.equals(restored.pixels)||!steps[0].pixels.equals(backgroundB.pixels))return{...target,outcome:'pending',requiresManualForegroundReview:true,reasons:['unstable ablated/restored pixels']};
  const[background,black,white]=steps;assert.equal(black.width,white.width);assert.equal(black.height,white.height);
  const mask=new Uint8Array(black.width*black.height);let ink=0;for(let i=0;i<mask.length;i++){const p=i*4;if(black.pixels[p]!==white.pixels[p]||black.pixels[p+1]!==white.pixels[p+1]||black.pixels[p+2]!==white.pixels[p+2]){ink++;const x=i%black.width,y=Math.floor(i/black.width);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(x+dx>=0&&x+dx<black.width&&y+dy>=0&&y+dy<black.height)mask[(y+dy)*black.width+x+dx]=1;}}
  let bound=Infinity,pixels=0,minRGB=[255,255,255],maxRGB=[0,0,0];for(let i=0;i<mask.length;i++)if(mask[i]){const p=i*4;assert.equal(background.pixels[p+3],255);const rgb=[...background.pixels.subarray(p,p+3)];bound=Math.min(bound,lower(target.fill,rgb));for(let j=0;j<3;j++){minRGB[j]=Math.min(minRGB[j],rgb[j]);maxRGB[j]=Math.max(maxRGB[j],rgb[j]);}pixels++;}
  result={...target,outcome:ink&&bound>=4.5?'candidate-at-least-4.5':'review',requiresManualForegroundReview:true,contrastLowerBound:Number.isFinite(bound)?bound:null,inkPixels:ink,sampledPixels:pixels,minRGB,maxRGB,method:'Conditional authored-fill/background bound, not a WCAG result. A reviewer must establish that CSS fill is the final foreground: a sibling scrim can change glyph colors without changing this measurement. Every background pixel under a viewport-wide black/white differential glyph mask is sampled, dilated one physical pixel. Background and composited foreground channels have conservative ±1 intervals. Group opacity, filters, blending, masks, strokes, shadows and text-clipped backgrounds stay pending. Exact geometry/currentColor/style restoration and stable original/background stills are required.'};
 }finally{await page.evaluate(()=>contrastProbe.restore());}
 return result;
};
