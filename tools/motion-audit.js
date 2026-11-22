/* Audit rendered motion without rewriting immutable virtual source programs. */
'use strict';
const crypto=require('node:crypto');
const {declaration}=require('./verification/skeuo-original/source-function.cjs');
const curves=new Set(['cubic-bezier(.22,1,.36,1)','cubic-bezier(.4,0,.2,1)','cubic-bezier(.34,1.36,.64,1)','cubic-bezier(.34,1.25,.64,1)','cubic-bezier(.34,1.35,.64,1)','cubic-bezier(.34,1.96,.64,1)','cubic-bezier(.35,-.02,.43,1)']);
const durations=new Set([40,50,80,100,130,150,160,180,200,250,260,280,300,350,400,455,500,600,740]);
const norm=s=>s.replace(/\s/g,'').replace(/(^|[,(])0\./g,'$1.');
function renderedSource(d,models=[]){
 let js=d.js||'';const excluded=[];
 for(const entry of models.filter(r=>r.id===d.id)){
  if(!/^[A-Za-z_$][\w$]*$/.test(entry.functionName)||!entry.reason?.trim()||!Number.isInteger(entry.occurrences)||entry.occurrences<1||!/^[a-f0-9]{64}$/.test(entry.sha256))throw Error(d.id+': invalid virtual model declaration');
  const needle='function '+entry.functionName+'(';let cursor=0,count=0,index;
  while((index=js.indexOf(needle,cursor))>=0){
   const body=declaration(js.slice(index),entry.functionName);
   if(crypto.createHash('sha256').update(body).digest('hex')!==entry.sha256)throw Error(d.id+': virtual model hash changed: '+entry.functionName);
   // A malformed boundary must fail before it can hide renderer code.
   new Function('return ('+body+')');
   js=js.slice(0,index)+' '.repeat(body.length)+js.slice(index+body.length);cursor=index+body.length;count++;
  }
  if(count!==entry.occurrences)throw Error(d.id+': virtual model occurrence count changed: '+entry.functionName);
  excluded.push({functionName:entry.functionName,occurrences:count,sha256:entry.sha256});
 }
 return{source:(d.css||'')+'\n'+js,excluded};
}
function audit(d,models=[]){
 let scoped;try{scoped=renderedSource(d,models);}catch(error){return['model '+error.message];}
 const src=scoped.source,out=[];
 for(const curve of new Set((src.match(/cubic-bezier\([^)]*\)/g)||[]).map(norm)))if(!curves.has(curve))out.push('curve '+curve);
 const times=[];
 for(const match of src.matchAll(/(?<![\w.])(?:\d*\.)?\d+(?:ms|s)\b/g)){
  const value=match[0].endsWith('ms')?parseFloat(match[0]):Math.round(parseFloat(match[0])*1000);
  if(value<40||value>=1000)continue;
  const start=Math.max(src.lastIndexOf(';',match.index),src.lastIndexOf('{',match.index),src.lastIndexOf('}',match.index))+1;
  const end=src.slice(match.index).search(/[;}]/),declaration=src.slice(start,end<0?src.length:match.index+end);
  // Source frequencies belong to continuous loops; UI transitions still gate.
  if(/(?:^|\s)animation\s*:/.test(declaration)&&/\binfinite\b/.test(declaration))continue;
  // A recipe's 40ms stagger may produce 120/240ms delays, capped at 300ms.
  if(/(?:^|\s)animation-delay\s*:/.test(declaration)&&value<=300&&value%40===0)continue;
  if(!durations.has(value)&&!times.includes(value))times.push(value);
 }
 for(const time of times)out.push('duration '+time+'ms');
 if(!/prefers-reduced-motion|reducedMotion|matchMedia\(['"]\(prefers/.test(src))out.push('reduced no reduced-motion path');
 if(/transition[^;{}]*\blinear\b/.test(src))out.push('linear linear easing on a UI transition');
 return out;
}
module.exports={audit,renderedSource,curves,durations,norm};
