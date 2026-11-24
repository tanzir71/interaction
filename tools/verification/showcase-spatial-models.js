const fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto'),zlib=require('zlib');
const {open,chromium,root,dir}=require('./showcase-spatial-harness'),R=require('../load-registry')();
const configs=require('../fixtures/showcase-spatial/native-configs.json'),demos=R.demos.filter(d=>configs.some(c=>c.id===d.id));
const captures=require('../fixtures/showcase-spatial/original-captures-v2.json'),originals=require('../fixtures/showcase-spatial/original-definitions.json');
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex'),sourceFile=path.join(root,'js/demos.showcase.js'),sourceSHA256=hash(fs.readFileSync(sourceFile));
function guard(){assert.equal(hash(fs.readFileSync(sourceFile)),sourceSHA256,'Source changed during verification');}
(async()=>{const browser=await chromium.launch(),rows=[];try{
  for(const row of captures.cases){
    const raw=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'tools/fixtures/showcase-spatial',row.file)))),d=demos.find(d=>d.id===raw.id),rig=await open(browser,{reduced:raw.reduced});
    const original=originals.find(value=>value.id===raw.id),start=original.js.indexOf('})(root, function(a)'),anchor=original.js.slice(start+9),referenceFactory=anchor.slice(0,anchor.lastIndexOf(');'));
    assert(start>=0&&referenceFactory.startsWith('function(a)'), 'Complete independent original factory');
    try{
      await rig.page.evaluate(raw=>window.__spatialRawCapture=raw,raw);
      for(const hz of[60,120,240]){
        const custom={...d,designSize:[raw.width,320],js:d.js.replace('root.__SpatialModel=model;','root.__SpatialModel=model;root.__SpatialReadPainter=painter;')};
        await rig.mount(custom,{mode:'full',width:640,height:540,clock:true});
        const result=await rig.page.evaluate(({hz,referenceFactory})=>{
          const raw=window.__spatialRawCapture,stage=document.querySelector('.stage'),root=stage._root,model=root.__SpatialModel;
          Object.assign(stage.style,{border:0,position:'static'});Object.assign(root.parentElement.style,{inset:'0',display:'block',transform:'none'});
          Object.assign(root.style,{position:'fixed',left:'0',top:'0',zoom:'1',transform:'none',margin:'0'});
          const rect=root.getBoundingClientRect();if(rect.x!==0||rect.y!==0||rect.width!==raw.width||rect.height!==320)throw Error('Raw replay coordinate plane '+JSON.stringify(rect.toJSON()));
          const encode=value=>JSON.stringify(value,(key,item)=>typeof item==='number'&&Object.is(item,-0)?{$negativeZero:true}:item);
          function equal(a,b,label){if(encode(a)===encode(b))return;function find(x,y,p){if(Object.is(x,y))return;if(typeof x!=='object'||x===null||typeof y!=='object'||y===null)return{path:p,actual:x,expected:y};for(const k of new Set([...Object.keys(x),...Object.keys(y)])){const mismatch=find(x[k],y[k],p+'.'+k);if(mismatch)return mismatch;}}throw Error(label+' '+JSON.stringify(find(JSON.parse(encode(a)),JSON.parse(encode(b)),'root')));}
          // The immutable original factory runs independently in this browser.
          // Captured clocks and input API values drive it; site model state is never copied.
          const canvas=document.createElement('canvas');canvas.width=raw.width;canvas.height=320;
          const context=canvas.getContext('2d'),values={},gradients=new Map();let gradientId=0,witness=null;
          const record=(...command)=>{if(witness)witness.push(command);};
          const referenceContext=new Proxy({}, {
            get(target,key){if(key in values)return values[key];if(typeof context[key]!=='function')return context[key];
              if(key==='createRadialGradient'||key==='createLinearGradient')return(...args)=>{const id=++gradientId,value=context[key](...args);gradients.set(id,value);record(key,id,...args);return{gradient:id,addColorStop(...stop){record('addColorStop',id,...stop);value.addColorStop(...stop);}};};
              return(...args)=>{record(key,...args);return context[key](...args);};},
            set(target,key,value){values[key]=value;record('set',key,value&&typeof value==='object'&&'gradient'in value?{gradient:value.gradient}:value);context[key]=value&&typeof value==='object'&&'gradient'in value?gradients.get(value.gradient):value;return true;}
          });
          const api={...raw.initial.api,ctx:referenceContext},scene=Function('return ('+referenceFactory+')')()(api),clock={...raw.initial.clock};
          function draw(dt){referenceContext.clearRect(0,0,raw.width,320);scene.draw(clock.elapsed,dt);}
          scene.resize?.();draw(0);draw(0);
          function advance(target){while(clock.last<target.last-1e-7){const next=(Math.round(clock.last*60/1000)+1)*1000/60,dt=Math.min((next-(clock.last||next))/1000,.032);clock.last=next;clock.elapsed+=dt;draw(dt);}equal(clock,target,'Independent original clock');}
          function input(capture){advance(capture.clock);Object.assign(api,capture.api);const e=capture.event;let paint=false;
            if(e.type==='pointerdown'){scene.down?.();paint=api.reduced;}else if(e.type==='pointermove'){scene.move?.();paint=api.reduced;}
            else if(['pointerup','pointercancel','lostpointercapture'].includes(e.type)){scene.up?.();paint=api.reduced;}
            else if(e.type==='pointerleave')paint=!api.down&&api.reduced;
            else if(e.type==='keydown'&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Enter'].includes(e.key)){if(e.key===' '||e.key==='Enter')scene.down?.();scene.move?.();paint=true;}
            if(paint)draw(0);
          }
          function pixelHash(data){let value=2166136261;for(const byte of data)value=Math.imul(value^byte,16777619);return(value>>>0).toString(16);}
          const rasterizationChanges=[],commandChanges=[];let event=0,states=1,paints=0,pixels=0;
          equal(model.inspect(),{api:raw.initial.api,clock:raw.initial.clock,state:raw.initial.state},'initial');
          for(let frame=1;frame<=360;frame++){
            const ms=frame*1000/60,prev=(frame-1)*1000/60;
            for(let time=prev+1000/hz;time<ms-1e-7;time+=1000/hz){root.__SetNow(time);root.__Flush();}root.__SetNow(ms);
            const w=raw.witnesses.find(w=>w.frame===frame);if(w){model.beginWitness();witness=[];}
            while(event<raw.dispatched.length&&raw.dispatched[event].actualAt<=ms+1e-7){
              const e=raw.dispatched[event++],packet={bubbles:true,cancelable:true,pointerId:1,clientX:e.event.x??0,clientY:e.event.y??0,key:e.event.key};
              input(e);root.dispatchEvent(e.event.type==='keydown'?new KeyboardEvent(e.event.type,packet):new PointerEvent(e.event.type,packet));
              equal(model.inspect(),{api:e.api,clock:e.clock,state:e.state},'event '+event);
            }
            root.__Flush();const expected=raw.frames[frame];advance(expected.clock);
            equal(model.inspect(),{api:expected.api,clock:expected.clock,state:expected.state},'frame '+frame+' @'+hz);states++;
            if(w){
              const actual=model.endWitness();equal(actual,witness,'Same-browser original paint '+frame+' @'+hz);paints++;
              if(encode(actual)!==encode(w.paint))commandChanges.push({frame,historicalCommands:w.paint.length,currentOriginalCommands:witness.length});witness=null;
              if(hz===60){
                root.__SpatialReadPainter.paint(model.paint,{originalPalette:true});
                const actualCanvas=root.querySelector('.'+root.className+'-full-art:not([data-retained]) > canvas'),data=actualCanvas.getContext('2d').getImageData(0,0,actualCanvas.width,actualCanvas.height).data,reference=context.getImageData(0,0,canvas.width,canvas.height).data;
                if(data.length!==reference.length)throw Error('Original Canvas extent '+frame);
                for(let channel=0;channel<data.length;channel++)if(data[channel]!==reference[channel])throw Error('Same-browser original Canvas channel '+frame+' at '+channel+': '+data[channel]+'/'+reference[channel]);
                const actualHash=pixelHash(data),referenceHash=pixelHash(reference);if(referenceHash===w.pixelHash)equal(actualHash,w.pixelHash,'Historical original pixels');else rasterizationChanges.push({frame,historical:w.pixelHash,originalInThisBrowser:referenceHash,actual:actualHash});
                pixels++;root.__SpatialReadPainter.paint(model.paint);
              }
            }
          }
          return{hz,states,events:event,paintWitnesses:paints,pixelChecks:pixels,rasterizationChanges,commandChanges};
        },{hz,referenceFactory});
        rows.push({key:row.key,...result});console.log({key:row.key,...result});
      }
    }finally{await rig.close();}
  }
  guard();fs.writeFileSync(dir+'/models.json',JSON.stringify({at:new Date().toISOString(),sourceSHA256,harnessSHA256:hash(fs.readFileSync(__filename)),browser:browser.version(),method:'Exact captured states and clocks; exact commands and RGBA against the complete original factory in the same browser. Historical command and pixel captures stay immutable; backend differences are retained.',rows,states:rows.reduce((n,row)=>n+row.states,0),pixelChecks:rows.reduce((n,row)=>n+row.pixelChecks,0)},null,2)+'\n');
  console.log({cases:rows.length,states:rows.reduce((n,row)=>n+row.states,0)});
}finally{await browser.close();}})().catch(error=>{console.error(error.stack?.slice(0,3500));process.exitCode=1;});
