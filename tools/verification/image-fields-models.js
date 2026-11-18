const {fs,crypto,zlib,A,F,same,ok,addChecks,open,finish}=require('./image-fields-harness');
const raw=zlib.gunzipSync(fs.readFileSync('tools/fixtures/image-fields-original-models.json.gz'));
const mathRaw=zlib.gunzipSync(fs.readFileSync('tools/fixtures/image-fields-original-math.json.gz')),G=JSON.parse(mathRaw);
(async()=>{
 same(crypto.createHash('sha256').update(raw).digest('hex'),A.captureSHA256,'Immutable original capture');
 same(crypto.createHash('sha256').update(mathRaw).digest('hex'),A.mathSHA256,'Independent original shader samples');
 same(G.sourceCaptureSHA256,A.captureSHA256,'Shader samples bind original source capture');
 const h=await open();try{
  for(const c of A.configs){await h.mount(c.id,{clock:true,hold:true});
   addChecks(await h.page.evaluate(({c,spec})=>{
    const M=document.querySelector('#image-fields-test')._root.__ImageFieldsModels;let checks=0;
    function compare(a,b,label){if(typeof b==='number'){if(!Number.isFinite(a)||Math.abs(a-b)>1e-10)throw Error(label+': '+a+' / '+b);checks++}else if(b&&typeof b==='object'){if(JSON.stringify(Object.keys(a))!==JSON.stringify(Object.keys(b)))throw Error(label+' fields');checks++;for(const k of Object.keys(b))compare(a[k],b[k],label+'.'+k)}else{if(a!==b)throw Error(label);checks++}}
    for(const pref of['normal','reduced']){const reduced=pref==='reduced',m=M.initial(c.kind,reduced);for(const f of spec[pref].frames){for(const e of f.events){const type={pointerenter:'enter',pointerleave:'leave',pointermove:'move',click:'latch',reset:'center',key:e[1]==='ArrowUp'?'up':e[1]==='ArrowDown'?'down':'escape'}[e[0]]||e[0];let point=e.slice(1);if(c.kind==='vertex'&&['enter','move','latch'].includes(type))point=[f.state.targetPointer.x/1.72+.5,.5-f.state.targetPointer.y/1.15];if(c.kind==='slice'&&['enter','move'].includes(type))point=[(f.state.bearing+1)/2,.5];if(c.kind==='zoom'&&['enter','move'].includes(type))point=[f.state.target.x,f.state.target.y];M.input(c.kind,m,type,point,reduced)}M.advance(c.kind,m,f.dt,reduced);compare(m,f.state,c.id+' '+pref+' frame'+f.frame)}}return checks;
   },{c,spec:F.models[c.id]}));
   if(c.kind==='tv'||c.kind==='vertex'){
    const actual=await h.page.locator('canvas[class$="-paint"]').evaluate(n=>({shaders:n.__Shaders,buffers:n.__Buffers,draw:n.__Draw})),expected=F.models[c.id].normal;
    same(actual.shaders,expected.shaders,'Literal original shader pair '+c.id);same(actual.buffers.map(b=>b.values),expected.buffers.map(b=>b.values),'Complete original typed buffers '+c.id);same(actual.draw,expected.draw,'Actual original draw call '+c.id);
   }
  }
  await h.mount(A.configs[0].id,{clock:true,hold:true});
  addChecks(await h.page.evaluate(({G,F})=>{const r=document.querySelector('#image-fields-test')._root,M=r.__ImageFieldsModels,E=r.__ImageFieldsEffects,base={width:64,height:48,data:new Uint8ClampedArray(64*48*4)};let checks=0;for(let y=0;y<48;y++)for(let x=0;x<64;x++){const i=(y*64+x)*4;base.data[i]=(x*17+y*3)%256;base.data[i+1]=(x*3+y*7)%256;base.data[i+2]=(x*11+y*13)%256;base.data[i+3]=255}for(const row of G.tv)for(const sample of row.samples){const actual=E.tv(row.model,base,...sample.fragment,...row.size);for(let channel=0;channel<4;channel++){if(Math.abs(actual[channel]-sample.rgba[channel])>.000002)throw Error('Original TV fragment '+row.frame);checks++}}const vertices=F.models['webgl-vertex-wave'].normal.buffers[0].values;for(const row of G.vertex){if(row.points.length!==1189)throw Error('Incomplete original vertex fixture');for(let i=0;i<1189;i++){const p=M.vertex(row.model,vertices[i*4],vertices[i*4+1],row.aspect),a=[p.x,p.y,p.z,p.light];for(let channel=0;channel<4;channel++){if(Math.abs(a[channel]-row.points[i][channel])>1e-12)throw Error('Original deformed vertex '+i);checks++}}}return checks},{G,F}));
 }finally{await h.close()}finish('models',{originalStates:2888,tvFragments:1152,completeVertexSamples:28536});
})().catch(e=>{console.error(e);process.exitCode=1});
