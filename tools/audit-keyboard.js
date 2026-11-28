#!/usr/bin/env node
/* Keyboard and focus walk across the shell routes (advisory, like audit-stage-fit).
   For every Tab stop it checks that focus is visible, has a name, is not hidden
   under the sticky header, and that its focus ring is not clipped by an ancestor.
   Usage: node tools/audit-keyboard.js [base] [--json out.json] [--strict] */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const args=process.argv.slice(2),base=(args.find(a=>/^https?:/.test(a))||'http://127.0.0.1:4173').replace(/\/$/,'');
const jsonAt=args.indexOf('--json'),strict=args.includes('--strict'),verbose=args.includes('--verbose');
const desktop={width:1440,height:900},mobile={width:390,height:844};
const routes=[['#/',desktop,70],['#/library',desktop,90],['#/library/sections',desktop,60],['#/collections',desktop,60],['#/c/elastic-tabs',desktop,60],['#/docs',desktop,50],['#/agents',desktop,30],['#/',mobile,40],['#/c/form-date-range',mobile,40]];

async function stop(page){
  return page.evaluate(()=>{
    const el=document.activeElement;if(!el||el===document.body)return null;
    const label=el.getAttribute('aria-label')||(el.getAttribute('aria-labelledby')||'').split(/\s+/).map(id=>document.getElementById(id)?.textContent||'').join(' ').trim()||el.textContent.trim()||el.getAttribute('title')||el.getAttribute('alt')||el.querySelector?.('img[alt]')?.alt||(el.labels&&[...el.labels].map(l=>l.textContent).join(' ').trim())||el.getAttribute('placeholder')||'';
    const style=getComputedStyle(el),rect=el.getBoundingClientRect();
    const ring=(style.outlineStyle!=='none'&&parseFloat(style.outlineWidth)>0)||style.boxShadow!=='none';
    const within=el.closest('.tile,.stage-card,.demo-stage');
    // A focus-within ring on a wrapper (a tile or field) counts as visible focus.
    let wrapperRing=false;for(let n=el.parentElement;n&&n!==document.body&&!wrapperRing;n=n.parentElement){const s=getComputedStyle(n);if(n.matches(':focus-within')&&((s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>0)||s.boxShadow!=='none'))wrapperRing=n.matches('.tile,.field,label,[class*="input"],[class*="search"]');}
    const offset=parseFloat(style.outlineOffset)||0,pad=Math.max(0,(style.outlineStyle==='none'?0:parseFloat(style.outlineWidth)||0)+offset);
    let clipped=null;
    for(let n=el.parentElement;n&&n!==document.documentElement;n=n.parentElement){const s=getComputedStyle(n);if(/(hidden|clip|auto|scroll)/.test(s.overflowX+s.overflowY)){const r=n.getBoundingClientRect();if(rect.left-pad<r.left-.5||rect.top-pad<r.top-.5||rect.right+pad>r.right+.5||rect.bottom+pad>r.bottom+.5){clipped=(n.className&&typeof n.className==='string'?'.'+n.className.split(' ')[0]:n.tagName.toLowerCase());break;}}}
    const header=document.querySelector('#site-header'),hr=header?.getBoundingClientRect();
    const cx=Math.min(innerWidth-1,Math.max(0,rect.left+rect.width/2)),cy=Math.min(innerHeight-1,Math.max(0,rect.top+Math.min(rect.height/2,8))),hit=document.elementFromPoint(cx,cy);
    const underHeader=!!(hr&&header!==el&&!header.contains(el)&&rect.top<hr.bottom-2&&rect.bottom>hr.top&&hit&&header.contains(hit));
    const offscreen=rect.bottom<0||rect.top>innerHeight||rect.right<0||rect.left>innerWidth;
    const size=rect.width<1||rect.height<1;
    let opacity=1;for(let n=el;n;n=n.parentElement)opacity*=Number(getComputedStyle(n).opacity);const invisible=opacity<.5||style.visibility==='hidden';
    const id=el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(typeof el.className==='string'&&el.className?'.'+el.className.trim().split(/\s+/).slice(0,2).join('.'):'');
    return {id,label:label.replace(/\s+/g,' ').slice(0,60),ring:ring||wrapperRing,invisible,clipped,underHeader,offscreen,size,inDemo:!!el.closest('.demo-stage')};
  });
}

(async()=>{
  const browser=await chromium.launch(),issues=[],summary=[];
  for(const [route,viewport,limit] of routes){
    const page=await browser.newPage({viewport});
    await page.goto(base+'/'+route,{waitUntil:'networkidle'});await page.waitForTimeout(600);
    const seen=new Map();let stops=0,demoStops=0;
    for(let i=0;i<limit;i++){
      await page.keyboard.press('Tab');await page.waitForTimeout(160);
      const s=await stop(page);if(!s)continue;stops++;if(s.inDemo)demoStops++;if(verbose)console.log(route,viewport.width,i+1,s.id,JSON.stringify(s.label),s.inDemo?'[demo]':'');
      const key=s.id+'|'+s.label;if(seen.has(key)){seen.set(key,seen.get(key)+1);continue;}seen.set(key,1);
      const problems=[!s.ring&&'no visible focus',!s.label&&'no name',s.clipped&&'ring clipped by '+s.clipped,s.underHeader&&'under sticky header',s.offscreen&&'offscreen',s.size&&'zero size',s.invisible&&'focused while invisible'].filter(Boolean);
      if(problems.length)issues.push({route,viewport:viewport.width,stop:i+1,element:s.id,label:s.label,problems});
    }
    summary.push({route,viewport:viewport.width,stops,unique:seen.size,demoStops});
    await page.close();
  }
  // Command palette: open, arrow through results, close with Escape and check focus returns.
  {const page=await browser.newPage({viewport:desktop});await page.goto(base+'/#/library',{waitUntil:'networkidle'});
   await page.locator('#search-trigger').focus();await page.keyboard.press('Enter');await page.waitForTimeout(300);
   const opened=await page.evaluate(()=>document.activeElement?.id);await page.keyboard.type('tabs');await page.keyboard.press('ArrowDown');
   const active=await page.evaluate(()=>document.querySelector('#palette-search')?.getAttribute('aria-activedescendant'));
   await page.keyboard.press('Escape');await page.waitForTimeout(300);const back=await page.evaluate(()=>document.activeElement?.id);
   summary.push({route:'palette',opened,active,back});
   if(opened!=='palette-search')issues.push({route:'palette',problems:['search input not focused on open ('+opened+')']});
   if(!active)issues.push({route:'palette',problems:['no aria-activedescendant after ArrowDown']});
   if(back!=='search-trigger')issues.push({route:'palette',problems:['focus did not return to the trigger ('+back+')']});
   await page.close();}
  for(const [name,route,viewport,trigger] of [['connect agent','#/',desktop,'#connect-agent'],['browse sheet','#/',mobile,'#browse-trigger']]){
    const page=await browser.newPage({viewport});await page.goto(base+'/'+route,{waitUntil:'networkidle'});
    await page.locator(trigger).focus();await page.keyboard.press('Enter');await page.waitForTimeout(400);
    const inside=()=>page.evaluate(()=>!!document.activeElement?.closest('dialog[open]'));
    const opened=await inside();let escaped=false;for(let i=0;i<40;i++){await page.keyboard.press('Tab');if(!(await inside())&&await page.evaluate(()=>document.activeElement!==document.body)){escaped=true;break;}}
    await page.keyboard.press('Escape');await page.waitForTimeout(300);
    const back=await page.evaluate(trigger=>document.activeElement===document.querySelector(trigger),trigger),closed=await page.evaluate(()=>!document.querySelector('dialog[open]'));
    summary.push({route:name,opened,back});
    if(!opened)issues.push({route:name,problems:['focus not moved into the dialog']});
    if(escaped)issues.push({route:name,problems:['Tab left the open dialog']});
    if(!closed||!back)issues.push({route:name,problems:['Escape did not close and return focus']});
    await page.close();
  }
  await browser.close();
  console.table(summary);
  for(const issue of issues)console.log(issue.route+(issue.viewport?' @'+issue.viewport:'')+(issue.stop?' #'+issue.stop:'')+' '+(issue.element||'')+' "'+(issue.label||'')+'": '+issue.problems.join(', '));
  console.log('audit-keyboard: '+issues.length+' issue(s)');
  if(jsonAt>=0)require('node:fs').writeFileSync(args[jsonAt+1],JSON.stringify({summary,issues},null,2));
  if(strict&&issues.length)process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});
