import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {createServer} from 'node:http';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import {Registry,rankComponents} from '../src/registry.js';
import {addComponent} from '../src/cli.js';
const root=fileURLToPath(new URL('../../../',import.meta.url));
const registry=new Registry(path.join(root,'registry'));
const temp=()=>fs.mkdtemp(path.join(os.tmpdir(),'intrx-test-'));
test('search ranks an exact title above tags and descriptions, and applies gesture filters',()=>{
 const entry=(id,title,tags=[],desc='')=>({id,title,tags,desc,useCases:[],libs:[],category:'Layout & UI',trigger:'press',tier:'free'});
 const items=[entry('tag','Other',['elastic tabs']),entry('description','Other',[],'elastic tabs'),entry('exact','Elastic Tabs')];
 assert.deepEqual(rankComponents(items,{query:'elastic tabs'}).map(item=>item.id),['exact','tag','description']);assert.equal(rankComponents(items,{trigger:'drag'}).length,0);
});
test('add writes a working single-file export and preserves existing files',async()=>{
 const dir=await temp();try{const result=await addComponent(registry,'elastic-tabs',{dir});const html=await fs.readFile(result.files[0],'utf8');assert.ok(html.startsWith('<!DOCTYPE html>'));assert.ok(html.includes('Next tab'));assert.ok(html.includes('prefers-reduced-motion'));await assert.rejects(addComponent(registry,'elastic-tabs',{dir}),/already exists/);assert.equal(await fs.readFile(result.files[0],'utf8'),html);}finally{await fs.rm(dir,{recursive:true,force:true});}
});
test('parts format writes distinct HTML, CSS and JS files; invalid ids cannot escape the destination',async()=>{
 const dir=await temp();try{const result=await addComponent(registry,'elastic-tabs',{dir,format:'parts'});assert.equal(result.files.length,3);assert.ok((await fs.readFile(path.join(dir,'elastic-tabs.js'),'utf8')).includes('onAction'));await assert.rejects(addComponent(registry,'../escape',{dir}),/Invalid component id/);}finally{await fs.rm(dir,{recursive:true,force:true});}
});
test('locked registry entries never produce source files',async()=>{
 const dir=await temp();try{const stub={component:async()=>({locked:true,prompt:'Adapt this interaction',upgradeUrl:'https://example.test/pro'})};const result=await addComponent(stub,'locked-demo',{dir});assert.ok(result.locked);assert.deepEqual(await fs.readdir(dir),[]);}finally{await fs.rm(dir,{recursive:true,force:true});}
});
test('registry client strips source from Pro entries even if a registry includes it',async()=>{
 const client=new Registry('.');client.read=async()=>({tier:'pro',prompt:'Available prompt',files:[{content:'secret source'}],parts:{js:'secret source'}});
 const item=await client.component('pro-example');assert.equal(item.locked,true);assert.equal(item.prompt,'Available prompt');assert.equal(item.files,undefined);assert.equal(item.parts,undefined);
});
test('HTTP cache revalidates with ETag and uses the cached JSON for a 304',async()=>{
 const dir=await temp(),requests=[];const server=createServer((req,res)=>{requests.push(req.headers['if-none-match']);if(requests.length>1){res.writeHead(304);res.end();}else{res.writeHead(200,{'Content-Type':'application/json',ETag:'"v1"'});res.end('[{"id":"cached"}]');}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));try{const client=new Registry('http://127.0.0.1:'+server.address().port,{cacheDir:dir});assert.equal((await client.read('index.json'))[0].id,'cached');assert.equal((await client.read('index.json'))[0].id,'cached');assert.deepEqual(requests,[undefined,'"v1"']);}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));await fs.rm(dir,{recursive:true,force:true});}
});
test('stdio initialize exposes seven tools, resources, prompts and a real component',async()=>{
 const client=new Client({name:'intrx-test',version:'1.0.0'}),transport=new StdioClientTransport({command:process.execPath,args:[path.join(root,'packages/intrx/bin/intrx.js'),'mcp','--registry',path.join(root,'registry')],stderr:'pipe'});
 try{await client.connect(transport);const {tools}=await client.listTools();assert.deepEqual(tools.map(t=>t.name).sort(),['get_component','get_prompt','get_stage_contract','get_tokens','list_categories','related_components','search_components']);const found=await client.callTool({name:'search_components',arguments:{query:'elastic tabs'}});assert.equal(JSON.parse(found.content[0].text)[0].id,'elastic-tabs');const fetched=await client.callTool({name:'get_component',arguments:{id:'elastic-tabs'}});assert.ok(JSON.parse(fetched.content[0].text).files[0].content.startsWith('<!DOCTYPE html>'));const resource=await client.readResource({uri:'intrx://component/elastic-tabs'});assert.equal(JSON.parse(resource.contents[0].text).id,'elastic-tabs');assert.equal((await client.listPrompts()).prompts.length,2);assert.ok((await client.listResourceTemplates()).resourceTemplates.length>=2);}finally{await client.close();}
});
