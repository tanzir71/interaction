const H=require('./raster-instruments-harness');
const fs=require('node:fs'),crypto=require('node:crypto'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const {unpack}=require('./raster-instruments-codec.js');
const dir=H.dir,hash=b=>crypto.createHash('sha256').update(b).digest('hex'),selected=process.argv.find(x=>x.startsWith('--case='))?.slice(7);
let checks=0,maxError=0;
const equal=(a,b,message)=>{checks++;assert.deepEqual(a,b,message);};
const close=(a,b,message,tolerance=2e-10)=>{checks++;const error=Math.abs(a-b);maxError=Math.max(maxError,error);assert(error<=tolerance*(1+Math.abs(b)),message+' '+a+' != '+b);};
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const U32=v=>BigInt.asUintN(32,v),imul=(a,b)=>U32(U32(BigInt(a))*U32(BigInt(b)));
// BigInt arithmetic provides an independent unsigned implementation of the
// terminal's seeded character timings and the engraving noise offsets.
function typingDelay(cycle,index,char){let v=U32(0x9e3779b9n^imul(cycle+1,0x85ebca6b)^imul(index+1,0xc2b2ae35)^imul(char+1,0x27d4eb2f));v=imul(v^(v>>16n),0x7feb352d);v=imul(v^(v>>15n),0x846ca68b);return clamp(Math.round(35+(Number(U32(v^(v>>16n)))/4294967296*2-1)*20),15,55);}
const commands=[['pwd',['/workspaces/intrx','branch / interaction-lab']],['ls interactions/',['ascii/  fui/  motion/','288 demos indexed']],['npm run build',['10 frames rendered','build complete / 0 errors']],['git status --short',['M  motion/terminal-window.js','checks / deterministic']],['node verify.js',['registry ........ ok','motion ......... ok','ready / 288 demos']]];
const spinner=['[|]','[/]','[-]','[\\]','[|]','[/]','[-]','[\\]','[|]','[/]'];
function schedule(cycle){return [...commands,['clear',[]]].map(([command,outputs],index)=>({command,delays:Array.from(command,(_,c)=>typingDelay(cycle,index,c)),outputOffsets:outputs.map((_,i)=>i*300/(outputs.length-1))}));}
function terminalAt(time){let at=0,cycle=0,executed=0,outputLines=0,spinnerRuns=0,spinnerFrames=0;const history=[];let serial=0;
  for(let guard=0;guard<100;guard++){
    const plan=schedule(cycle);
    for(let index=0;index<6;index++){
      const p=plan[index],waitingStart=at;at+=900;
      const result=(phase,phaseStart,extra={})=>({phase,phaseStart,cycle,commandIndex:index,executed,outputLines,spinnerRuns,spinnerFrames,history:history.map(x=>({...x})),serial,...extra});
      if(time<at)return result('waiting',waitingStart,{typed:'',cursor:0,offsets:[]});
      const typingStart=at;let cursor=0;
      for(const delay of p.delays){at+=delay;if(time<at)return result('typing',typingStart,{typed:p.command.slice(0,cursor),cursor,delays:p.delays});cursor++;}
      history.push({id:++serial,kind:'command',prompt:'➜ intrx',text:p.command,tone:'',commandIndex:index,cycle});
      if(index===5){history.length=0;cycle++;break;}
      if(index===2){const start=at;spinnerRuns++;const visited=Math.min(10,Math.floor((time-start)/200)+1);spinnerFrames+=visited;
        const tone=time<start+2000?'accent':'ok',text=time<start+2000?spinner[visited-1]+' compiling interaction atlas':'[ok] 10 frames / 2.00s';
        history.push({id:++serial,kind:'spinner',prompt:'',text,tone,commandIndex:index,cycle});
        if(time<start+2000)return result('spinner',start,{typed:p.command,cursor:p.command.length,spinnerIndex:visited-1,spinnerVisited:Array.from({length:visited},(_,i)=>i),offsets:[]});at+=2000;
      }
      const outputStart=at;let visible=0;for(let i=0;i<commands[index][1].length;i++)if(time>=at+p.outputOffsets[i]){history.push({id:++serial,kind:'output',prompt:'',text:commands[index][1][i],tone:'',commandIndex:index,cycle});visible++;outputLines++;}
      if(time<at+300)return result('output',outputStart,{typed:p.command,cursor:p.command.length,offsets:p.outputOffsets,visible});
      at+=300;executed++;
    }
  }throw Error('Terminal chronology guard');
}
function verifyTerminal(m,reduced){
  equal(m.config.commands,commands.map(([command,outputs],i)=>({command,outputs,spinner:i===2})),'Original command copy');
  equal(m.config.spinnerFrames,spinner,'Every spinner frame');
  equal([m.config.typingBase,m.config.typingJitter,m.config.pauseDuration,m.config.outputDuration,m.config.spinnerDuration,m.config.crossfadeDuration,m.config.dragLerp,m.config.releaseDecay,m.config.maxReleaseSpeed],[35,20,900,300,2000,150,.15,.88,420],'Terminal timing');
  equal(m.schedules.currentCycle,schedule(m.state.cycle),'Every independent seeded delay and output time');
  if(reduced){equal(m.counters.commandsExecuted,5,'Reduced complete commands');equal(m.counters.outputLines,11,'Reduced complete outputs');equal(m.counters.spinnerFramesRendered,10,'Reduced complete spinner');equal(m.history.filter(x=>x.kind==='command').map(x=>x.text),commands.map(x=>x[0]),'Reduced full copy');}
  else{
    const e=terminalAt(m.state.activeTime);equal(m.state.phase,e.phase,'Terminal phase');close(m.state.phaseStart,e.phaseStart,'Phase deadline');equal(m.state.cycle,e.cycle,'Clear cycles');equal(m.state.commandIndex,e.commandIndex,'Command index');
    equal(m.history,e.history,'Complete original terminal history');equal(m.counters.commandsExecuted,e.executed,'All executed commands');equal(m.counters.outputLines,e.outputLines,'All output lines');equal(m.counters.spinnerRuns,e.spinnerRuns,'Spinner runs');equal(m.counters.spinnerFramesRendered,e.spinnerFrames,'No skipped spinner frames');
    if(e.phase==='typing'){equal(m.state.typedText,e.typed,'Exact typed prefix');equal(m.state.typingDelays,e.delays,'Character delays');equal(m.state.typingCursor,e.cursor,'Typing cursor');}
    if(e.phase==='spinner'){equal(m.state.spinnerIndex,e.spinnerIndex,'Spinner index');equal(m.state.spinnerVisited,e.spinnerVisited,'Every visited frame');}
    if(e.phase==='output'){equal(m.state.outputOffsets,e.offsets,'Output offsets');equal(m.state.outputVisible,e.visible,'Visible outputs');}
  }
  close(m.drag.maxX,Math.max(0,m.data&&Number(m.data.maxX)),'Drag max exposure');
  for(const name of ['currentX','targetX'])assert(m.drag[name]>=0&&m.drag[name]<=m.drag.maxX);
  for(const name of ['currentY','targetY'])assert(m.drag[name]>=0&&m.drag[name]<=m.drag.maxY);
  close(m.tabs.progress,m.tabs.transitioning?clamp((m.state.activeTime-m.tabs.start)/150,0,1):1,'Tab crossfade');
}
const bumps=[{x:180,y:70,rx:63,ry:56,amplitude:.86},{x:139,y:108,rx:49,ry:44,amplitude:.64},{x:221,y:108,rx:49,ry:44,amplitude:.64}];
function noiseOffset(i){let v=U32(19470219n^imul(i+1,374761393));v=imul(v^(v>>13n),1274126177);return Number(U32(v^(v>>16n)))/4294967296*2*Math.PI;}
const offsets=[0,1,2].map(noiseOffset);
function verifyEngraving(m){
  equal(m.fixtures.bumps,bumps,'Every original relief bump');equal([m.config.lineCount,m.config.samplesPerLine,m.config.vertexCount,m.config.sampleStep,m.config.driftPeriod,m.config.cursorLerp],[46,85,3910,4,60000,.1],'Engraving topology and clock');
  offsets.forEach((v,i)=>close(m.config.noiseOffsets[i],v,'Independent hash noise'));
  const expectedPhase=((m.state.activeTime/60000*2*Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);close(m.state.phase,expectedPhase,'Full drift phase');
  const scores=[];let strong=0,accent=0,reliefMin=Infinity,reliefMax=-Infinity,displacementMin=Infinity,displacementMax=-Infinity,widthMin=Infinity,widthMax=-Infinity;
  equal(m.lines.polylines.length,46,'All lines');
  m.lines.polylines.forEach((line,li)=>{const baseY=30.5+li*3;close(line.baseY,baseY,'Original base line');equal(line.vertices.length,85,'All line vertices');
    line.vertices.forEach((p,j)=>{const x=12+j*4;let crest=0;for(const b of bumps){const r=Math.sqrt(((x-b.x)/b.rx)**2+((baseY-b.y)/b.ry)**2);if(r<1)crest+=b.amplitude*(1-r*r)**2*Math.cos(Math.PI*r);}crest=clamp(crest,-1,1);
      const phase=m.state.phase,noise=.22*(.55*Math.sin(x*.030+baseY*.017+phase+offsets[0])+.30*Math.sin(x*.016-baseY*.027-2*phase+offsets[1])+.15*Math.sin(x*.041+baseY*.009+3*phase+offsets[2]));
      const distance=Math.sqrt((x-m.pointer.currentX)**2+(baseY-m.pointer.currentY)**2),falloff=Math.max(0,1-distance/100)**2,multiplier=1+m.pointer.gain*falloff,relief=clamp(crest+noise,-1,1)*multiplier,displacement=relief*4,width=.5+1.3*Math.min(1,Math.abs(relief)),score=Math.abs(relief);
      const expected={lineIndex:li,sampleIndex:j,x,baseY,crest,noise,baseRelief:clamp(crest+noise,-1,1),distance,falloff,multiplier,effectiveRelief:relief,displacement,y:baseY+displacement,width,score};
      for(const[k,v]of Object.entries(expected))close(p[k],v,'Engraving '+k);scores.push(score);reliefMin=Math.min(reliefMin,relief);reliefMax=Math.max(reliefMax,relief);displacementMin=Math.min(displacementMin,displacement);displacementMax=Math.max(displacementMax,displacement);widthMin=Math.min(widthMin,width);widthMax=Math.max(widthMax,width);
    });
  });
  const ordered=scores.slice().sort((a,b)=>a-b),threshold=ordered[Math.ceil(3910*.9)-1];close(m.lines.threshold,threshold,'Top decile accent');
  for(const line of m.lines.polylines){for(const p of line.vertices){equal(p.strong,p.score>=m.lines.threshold,'Actual accent vertex');if(p.strong)strong++;}for(let j=1;j<85;j++)if((line.vertices[j-1].score+line.vertices[j].score)/2>=m.lines.threshold)accent++;}
  equal(m.lines.strongCount,strong,'All accent points');equal(m.lines.accentSegments,accent,'All painted accent segments');
  for(const[k,v]of Object.entries({reliefMin,reliefMax,displacementMin,displacementMax,widthMin,widthMax}))close(m.lines[k],v,'Complete '+k+' bound');
}
function ease(t){if(t===0||t===1)return t;let parameter=t;for(let i=0;i<12;i++){const x=3*(1-parameter)**2*parameter*.65+3*(1-parameter)*parameter*parameter*.35+parameter**3;const slope=1.95*(1-parameter)**2-1.8*(1-parameter)*parameter+1.95*parameter**2;parameter=clamp(parameter-(x-t)/slope,0,1);}return 3*(1-parameter)*parameter*parameter+parameter**3;}
function verifyLissajous(m){
  equal([m.config.sampleCount,m.config.gridSize,m.config.phiStep,m.config.initialPhi,m.config.tweenDuration,m.config.persistenceFactor,m.config.fadeAlpha],[600,4,.008,1.72,800,.96,.04],'Original trail and phase model');
  equal(m.points.samples.length,600,'All samples');close(m.state.phi,1.72+m.state.frameCount*.008,'Unwrapped phase');equal(m.trail.drawnPerFrame,400,'Complete visible age range');equal(m.trail.gonePerFrame,200,'Complete expired range');
  const counts={gone:0,txt2:0,txt1:0,recent:0,head:0,drawn:0};
  m.points.samples.forEach((p,i)=>{const t=i/599*2*Math.PI,x=Math.sin(m.state.currentA*t+m.state.phi),y=Math.sin(m.state.currentB*t),lx=180+152*x,ly=98+76*y,px=clamp(Math.round((lx-2)/4)*4,0,356),py=clamp(Math.round((ly-2)/4)*4,0,192),tone=i<200?'gone':i<350?'txt2':i<499?'txt1':i<599?'recent':'head';
    close(p.t,t,'Sample parameter');close(p.rawX,x,'Lissajous X');close(p.rawY,y,'Lissajous Y');close(p.logicalX,lx,'Full X');close(p.logicalY,ly,'Full Y');equal([p.index,p.age,p.pixelX,p.pixelY,p.width,p.height,p.tone,p.drawn],[i,599-i,px,py,4,4,tone,i>=200],'Exact grid, age and drawing');counts[tone]++;if(i>=200)counts.drawn++;
  });equal(m.points.toneCounts,counts,'Every age bucket');
  if(m.state.tweenActive){const e=ease(m.state.tweenElapsed/800);close(m.state.tweenEasedProgress,e,'Independent cubic inversion',1e-12);close(m.state.currentA,m.state.tweenStartA+(m.state.targetA-m.state.tweenStartA)*e,'Interrupted A');close(m.state.currentB,m.state.tweenStartB+(m.state.targetB-m.state.tweenStartB)*e,'Interrupted B');}
  equal(m.input.a,m.state.targetA,'Native frequency A');equal(m.input.b,m.state.targetB,'Native frequency B');equal(m.input.readout,'a:'+m.state.targetA+' b:'+m.state.targetB+' φ:'+m.state.phi.toFixed(2),'Complete readout');
}
function randomRGB(seed){let v=U32(seed);return()=>{v=U32(v^(v<<13n));v=U32(v^(v>>17n));v=U32(v^(v<<5n));return Number(v)/4294967296;};}
function verifyRGB(m,focusAtBurst){
  equal(m.config,{burstDuration:860,automaticBase:3200,automaticIncrement:470,bandCount:10,concentratedCount:6},'Original burst schedule');
  equal(m.ui.pressed,String(m.state.burstActive),'Pressed state');equal(m.ui.active,m.state.burstActive,'Native active class');equal(m.ui.meter,m.state.burstActive?'10':'00','Full slice count');
  if(!m.state.burstId){equal(m.bands,[],'Initial bands');return;}
  equal(m.bands.length,10,'All original channel slices');const random=randomRGB(0x9e3779b9n^U32(BigInt(m.state.burstId)*2654435761n)),bands=[];
  for(let i=0;i<10;i++){const y=i<6?clamp(focusAtBurst*m.state.height+(random()-.5)*m.state.height*.58,0,m.state.height-3):random()*(m.state.height-3);bands.push({y,h:3+random()*17,shift:(random()*2-1)*22,split:3+random()*8,phase:random()*2*Math.PI});}bands.sort((a,b)=>a.y-b.y);
  for(let i=0;i<10;i++)for(const[k,v]of Object.entries(bands[i]))close(m.bands[i][k],v,'Independent RGB '+k+' burst '+m.state.burstId+' clock '+m.state.clock+' generationFocus '+focusAtBurst);
}
const files=H.manifest.cases.map(c=>c.key+'.json.gz').filter(f=>!selected||f===selected+'.json.gz');assert(files.length);
const results=[];
for(const file of files){const fixture=H.fixture(H.manifest.cases.find(c=>c.key+'.json.gz'===file)),{config}=fixture,generations=new Map();let activeTime=0,visible=true,documentVisible=true,previousNow=0,focus=.5,observed=0,maxActiveTime=0;
  for(const row of fixture.rows){
    for(const e of row.events){if(e.type==='intersection')visible=e.visible;else if(e.type==='document')documentVisible=e.visible;
      if(e.type==='reset'||(config.id==='pixel-lissajous-lab'&&e.type==='key'&&/^[rR]$/.test(e.key)))activeTime=0;
      if(config.id==='glitch-rgb-slices'){
        if(e.type==='pointer'&&/enter|move/.test(e.event))focus=clamp(e.v,0,1);
        if(e.type==='key'){if(e.key==='Home')focus=.5;else if(e.key==='ArrowDown')focus=clamp(focus+.08,0,1);else if(e.key==='ArrowUp')focus=clamp(focus-.08,0,1);}
      }
    }
    if(row.frame&&!config.reduced&&visible&&documentVisible)activeTime+=Math.min(50,Math.max(0,row.now-previousNow));previousNow=row.now;maxActiveTime=Math.max(maxActiveTime,activeTime);
    if(row.model){const m=unpack(row.model);equal(hash(JSON.stringify(row.model)),row.modelSHA256,'Stored model digest');observed++;
      if(config.id!=='glitch-rgb-slices')close(m.state.activeTime,activeTime,'Independent composed original clock',1e-11);
      if(config.id==='terminal-window')verifyTerminal(m,config.reduced);
      else if(config.id==='engraving-lines-warp')verifyEngraving(m);
      else if(config.id==='pixel-lissajous-lab')verifyLissajous(m);
      else{
        // Resizing rebuilds channel planes but preserves already-created bands.
        // Reconstruct generation dimensions/focus from the checkpoint at burst.
        if(m.state.burstId&&!generations.has(m.state.burstId))generations.set(m.state.burstId,{height:m.state.height,focus});
        const generation=generations.get(m.state.burstId);
        if(generation){const clone={...m,state:{...m.state,height:generation.height}};verifyRGB(clone,generation.focus);}else verifyRGB(m,focus);
        close(m.state.clock,row.now,'Original raw rAF clock');close(m.state.focusY,focus,'Independent scan focus');
      }
    }
  }
  if(config.id==='engraving-lines-warp'&&!config.reduced)assert(maxActiveTime>=60000,'Complete drift period');
  if(config.id==='terminal-window'&&!config.reduced){const last=unpack(fixture.rows.at(-1).model);assert(last.counters.clearCommands>=2,'Two complete terminal cycles');}
  results.push({file,sha256:H.manifest.cases.find(c=>c.key+'.json.gz'===file).sha256,checkpoints:observed,maxActiveTime,originalCleanupDebt:fixture.summary.originalCleanupDebt});console.log('Verified '+file+' / '+observed+' full checkpoints');
}
const completeMatrix=!selected&&files.length===32;
if(completeMatrix){const expected=H.manifest.cases.map(c=>c.key+'.json.gz').sort();equal(files.slice().sort(),expected,'Complete expected case matrix');}
const sourceHashes={...H.hashes(__filename),...Object.fromEntries([...H.manifest.cases.map(c=>c.file),H.manifest.vectorPool.file,H.manifest.vectorPool.indexFile,'tools/verification/raster-instruments-pool.js'].map(f=>[f,hash(fs.readFileSync(f))]))};const report={sourceHashes,recordedAt:new Date().toISOString(),verifierSHA256:hash(fs.readFileSync(__filename)),completeMatrix,cases:results.length,checks,maxError,results,errors:[]};fs.writeFileSync(dir+'/mathematics'+(selected?'-'+selected:completeMatrix?'':'-partial')+'-proof.json',JSON.stringify(report,null,2));console.log('PASS '+checks+' independent model checks');
