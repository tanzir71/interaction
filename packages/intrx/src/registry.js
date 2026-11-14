import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {createHash} from 'node:crypto';
export const DEFAULT_REGISTRY='https://intrx.vercel.app/registry';
export const FALLBACK_REGISTRY='https://tanzir71.github.io/interaction/registry';
export const validId=id=>typeof id==='string'&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id);
export function rankComponents(items,{query='',trigger,category,stack,tier,limit=12}={}){
 const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 const score=item=>words.reduce((sum,word)=>sum+(item.id.toLowerCase()===word?150:0)+(item.title.toLowerCase()===word?120:item.title.toLowerCase().includes(word)?70:0)+(item.tags.some(tag=>tag.toLowerCase().includes(word))?30:0)+(item.useCases.some(use=>use.toLowerCase().includes(word))?20:0)+(item.desc.toLowerCase().includes(word)?5:0),0);
 return items.filter(item=>(!trigger||item.trigger===trigger)&&(!category||item.category.toLowerCase()===category.toLowerCase())&&(!tier||item.tier===tier)&&(!stack||(stack==='vanilla'?!item.libs.length&&!/webgl|canvas/i.test(item.tags.join(' ')):stack==='gsap'?item.libs.includes('gsap'):new RegExp(stack,'i').test(item.tags.join(' ')+' '+item.desc))))
  .map(item=>({item,score:score(item)})).filter(row=>!words.length||row.score>0).sort((a,b)=>b.score-a.score||a.item.title.localeCompare(b.item.title)).slice(0,limit).map(row=>row.item);
}
export class Registry{
 constructor(source=process.env.INTRX_REGISTRY_URL||DEFAULT_REGISTRY,{cacheDir=path.join(os.homedir(),'.cache','intrx')}={}){this.source=source.replace(/\/$/,'');this.remote=/^https?:\/\//i.test(source);this.cacheDir=cacheDir;}
 async read(file){
  if(!/^[a-z0-9/-]+\.json$/.test(file)||file.includes('..'))throw Error('Invalid registry path');
  if(!this.remote)return JSON.parse(await fs.readFile(path.join(path.resolve(this.source),...file.split('/')),'utf8'));
  try{return await this.readRemote(this.source+'/'+file);}catch(error){if(this.source!==DEFAULT_REGISTRY)throw error;return this.readRemote(FALLBACK_REGISTRY+'/'+file);}
 }
 async readRemote(url){
  const key=createHash('sha256').update(url).digest('hex'),cacheFile=path.join(this.cacheDir,key+'.json');
  let cached;try{cached=JSON.parse(await fs.readFile(cacheFile,'utf8'));}catch{}
  const response=await fetch(url,{headers:cached?.etag?{'If-None-Match':cached.etag}:{},signal:AbortSignal.timeout(15000)});
  if(response.status===304&&cached)return cached.data;
  if(!response.ok)throw Error('Registry request failed: '+response.status+' '+url);
  const data=await response.json();await fs.mkdir(this.cacheDir,{recursive:true});await fs.writeFile(cacheFile,JSON.stringify({etag:response.headers.get('etag'),data}));return data;
 }
 async search(options){return rankComponents(await this.read('index.json'),options);}
 async component(id,format='html'){
  if(!validId(id))throw Error('Invalid component id');
  const item=await this.read('c/'+id+'.json');
  if(item.locked||item.tier==='pro')return {id,locked:true,prompt:item.prompt,upgradeUrl:item.upgradeUrl||'https://intrx.vercel.app/#/pricing'};
  if(!['html','parts','react','vue'].includes(format))throw Error('Unknown component format');
  return {...item,...(['react','vue'].includes(format)?{portInstruction:'Port the included vanilla component to '+format+'. Preserve timing, easing, interaction math, keyboard support and reduced motion; map colors to the host tokens.'}:{})};
 }
 async related(id,limit=4){const item=await this.read('c/'+id+'.json'),index=await this.read('index.json');return (item.related||[]).slice(0,limit).map(id=>{const related=index.find(row=>row.id===id);return related&&{id,title:related.title,reason:related.trigger===item.trigger?'Same gesture and category':'Same category'};}).filter(Boolean);}
}
