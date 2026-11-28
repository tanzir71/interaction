import fs from 'node:fs/promises';
import path from 'node:path';
import {Registry,validId} from './registry.js';
export function parseArgs(args){
 const positional=[],options={};
 for(let i=0;i<args.length;i++){
  if(args[i]==='--json'){options.json=true;continue;}
  if(args[i].startsWith('--')){const name=args[i].slice(2);if(!['registry','dir','format','trigger','category'].includes(name))throw Error('Unknown option --'+name);if(!args[i+1]||args[i+1].startsWith('--'))throw Error('Missing value for --'+name);options[name]=args[++i];}
  else positional.push(args[i]);
 }
 return {positional,options};
}
export async function addComponent(registry,id,{dir='src/components/intrx',format='html'}={}){
 if(!validId(id))throw Error('Invalid component id');if(!['html','parts'].includes(format))throw Error('add format must be html or parts');
 const item=await registry.component(id,format);if(item.locked)return item;
 const files=format==='parts'?Object.entries(item.parts).map(([ext,content])=>({path:id+'.'+ext,content})):item.files;
 const root=path.resolve(dir),planned=[];
 for(const file of files){const target=path.resolve(root,file.path);if(!target.startsWith(root+path.sep))throw Error('Component path escapes destination');try{await fs.access(target);throw Error('File already exists: '+target);}catch(error){if(error.code!=='ENOENT')throw error;}planned.push({target,content:file.content});}
 await fs.mkdir(root,{recursive:true});
 for(const file of planned)await fs.writeFile(file.target,file.content,{flag:'wx'});
 return {files:planned.map(file=>file.target),libs:item.libs};
}
export async function run(args,write=console.log){
 const {positional:[command,...rest],options}=parseArgs(args),registry=new Registry(options.registry);
 if(command==='mcp'){const {startMcp}=await import('./mcp.js');await startMcp(registry);return;}
 if(command==='add'){if(rest.length!==1)throw Error('Usage: intrx add <id>');const result=await addComponent(registry,rest[0],options);write(result.locked?'Locked. '+result.upgradeUrl:result.files.join('\n'));return;}
 if(command==='search'||command==='list'){const result=await registry.search({...options,query:rest.join(' '),limit:command==='list'?Infinity:12});write(options.json?JSON.stringify(result,null,2):result.map(item=>item.id+' — '+item.title+' · '+item.trigger+' · '+item.category).join('\n'));return;}
 if(command&&command!=='help')throw Error('Unknown command: '+command);
 write('intrx mcp [--registry URL|PATH]\nintrx add <id> [--dir PATH] [--format html|parts] [--registry URL|PATH]\nintrx search <query> [--trigger press] [--category "Cards, Lists & Layout"] [--json]\nintrx list [--category CATEGORY]');
}
