#!/usr/bin/env node
/* Stage metadata is mandatory now. Existing chrome/control debt is recorded
   explicitly until Phase 4; --strict requires all that debt to be resolved. */
const fs=require('node:fs');
const path=require('node:path');
const componentControls=require('./stage-component-controls');
const componentControlPolicy=JSON.parse(fs.readFileSync(path.join(__dirname,'stage-component-controls.json'),'utf8'));
const {demos,metadata}=require('./load-registry')();
const presets=new Set(['sm','md','lg','bleed']);
const errors=[],debt={};
errors.push(...componentControls.validate(demos,componentControlPolicy));
const allowlist=JSON.parse(fs.readFileSync(path.join(__dirname,'stage-allowlist.json'),'utf8'));
const fitAllowlist=JSON.parse(fs.readFileSync(path.join(__dirname,'stage-fit-allowlist.json'),'utf8')).lowFill;
for(const [id,reason]of Object.entries(allowlist))if(typeof reason!=='string'||!reason.trim())errors.push(id+': root exception needs a written reason');
for(const [id,item]of Object.entries(fitAllowlist)){
 if(!demos.some(d=>d.id===id)||!item.reason?.trim()||!/^\d+:\d+$/.test(item.figmaNode)||!item.figmaUrl?.startsWith('https://www.figma.com/design/')||!item.selector||!Array.isArray(item.designSize)||item.designSize.length!==2||item.designSize.some(n=>!Number.isFinite(n)||n<=0))errors.push(id+': invalid documented Figma fill exception');
}
for(const d of demos){
 const issues=[];
 if(!metadata[d.id])errors.push(d.id+': missing sidecar metadata');
 const size=d.designSize;
 if(!(typeof size==='string'&&presets.has(size))&&!(Array.isArray(size)&&size.length===2&&size.every(n=>Number.isFinite(n)&&n>0)))errors.push(d.id+': invalid designSize');
 const thumb=d.thumbDesignSize;
 if(thumb!==undefined&&(d.thumb!=='hero'||!(typeof thumb==='string'&&presets.has(thumb))&&!(Array.isArray(thumb)&&thumb.length===2&&thumb.every(n=>Number.isFinite(n)&&n>0))))errors.push(d.id+': invalid hero thumbDesignSize');
 if(!d.stage||!['dark','light'].includes(d.stage.theme)||!['clip','scroll','intentional'].includes(d.stage.overflow))errors.push(d.id+': invalid stage');
 if(!['hover','press','drag','scroll','type','ambient'].includes(d.trigger))errors.push(d.id+': invalid trigger');
 if(!Array.isArray(d.controls)||d.controls.length>3||d.controls.some(c=>!c.label||!c.action||typeof c.label!=='string'||typeof c.action!=='string'))errors.push(d.id+': invalid controls');
 if(d.controls?.some(c=>c.ariaLabel!==undefined&&(typeof c.ariaLabel!=='string'||!c.ariaLabel.trim())))errors.push(d.id+': invalid control ariaLabel');
 if(!d.a11y||typeof d.a11y.keyboard!=='boolean'||typeof d.a11y.reducedMotion!=='boolean')errors.push(d.id+': invalid a11y');
 if(!['free','pro'].includes(d.tier))errors.push(d.id+': invalid tier');
 if(!['full','hero'].includes(d.thumb))errors.push(d.id+': invalid thumb');
 if(!Array.isArray(d.useCases)||d.useCases.some(s=>typeof s!=='string'))errors.push(d.id+': invalid useCases');
 if(!/^\d{4}-\d{2}$/.test(d.addedAt))errors.push(d.id+': invalid addedAt');
 for(const match of d.html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)){
  const label=match[1].replace(/<[^>]*>/g,'').trim();
  if(/^(replay|reset|animate|restart|play again)$/i.test(label)&&!componentControls.intrinsicControl(d.id,match[0],componentControlPolicy))issues.push('own-control: '+label);
 }
 const root=d.rootClass.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const rules=[...d.css.matchAll(new RegExp('(?:^|})\\s*\\.'+root+'\\s*\\{([^}]*)\\}','g'))];
 if(d.stage?.overflow!=='intentional'&&!allowlist[d.id]&&rules.some(m=>/(?:^|;)\s*(?:background(?:-color)?|border)\s*:\s*(?!none\b|transparent\b|0(?:px)?\s*(?:;|$))[^;]+/.test(m[1])))issues.push('own-chrome: root background or border');
 if(issues.length)debt[d.id]=[...new Set(issues)];
 if(process.argv.includes('--list-controls')){
  const count=(d.html.match(/<button\b/gi)||[]).length;
  if(count>=2||/class="[^"]*(controls|actions|toolbar|chips)/i.test(d.html))console.log(d.id+' ('+count+' buttons)');
 }
}
for(const id of Object.keys(metadata))if(!demos.some(d=>d.id===id))errors.push(id+': orphan metadata');
const baselinePath=path.join(__dirname,'stage-baseline.json');
if(process.argv.includes('--update-baseline')){
 const previous=fs.existsSync(baselinePath)?JSON.parse(fs.readFileSync(baselinePath,'utf8')):null;
 if(previous)for(const [id,issues]of Object.entries(debt))for(const issue of issues)if(!previous[id]?.includes(issue))errors.push(id+': baseline cannot grow: '+issue);
 if(!errors.length){fs.writeFileSync(baselinePath,JSON.stringify(debt,null,2)+'\n');console.log('Recorded '+Object.keys(debt).length+' existing demo chrome/control debts');}
}else{
 const baseline=JSON.parse(fs.readFileSync(baselinePath,'utf8'));
 for(const [id,issues]of Object.entries(debt))for(const issue of issues)if(process.argv.includes('--strict')||!baseline[id]?.includes(issue))errors.push(id+': '+issue);
}
console.log('verify-stage: '+demos.length+' metadata records; '+Object.keys(debt).length+' existing chrome/control debts'+(process.argv.includes('--strict')?' (strict)':''));
errors.forEach(error=>console.error('FAIL: '+error));
if(errors.length)process.exitCode=1;else console.log('PASS: stage metadata and no new chrome/control violations');
