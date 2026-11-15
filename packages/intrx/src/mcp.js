import {McpServer,ResourceTemplate} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {z} from 'zod';
const id=z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const trigger=z.enum(['hover','press','drag','scroll','type','ambient']);
const result=value=>({content:[{type:'text',text:typeof value==='string'?value:JSON.stringify(value,null,2)}]});
export function createMcp(registry){
 const server=new McpServer({name:'intrx',version:'3.0.0'});
 const register=(name,description,inputSchema,handler)=>server.registerTool(name,{description,inputSchema,annotations:{readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:true}},async args=>result(await handler(args)));
 register('search_components','Find native interactions ranked by title, tags, use cases and description.',{query:z.string().optional(),trigger:trigger.optional(),category:z.string().optional(),stack:z.enum(['vanilla','gsap','webgl','canvas']).optional(),tier:z.enum(['free','pro']).optional(),limit:z.number().int().min(1).max(100).default(12)},async args=>(await registry.search(args)).map(({id,title,category,trigger,desc,url,tier})=>({id,title,category,trigger,desc,url,tier})));
 register('get_component','Fetch source, motion prompt and accessibility notes. Locked items expose the prompt only.',{id,format:z.enum(['html','parts','react','vue']).default('html')},async({id,format})=>{
  const item=await registry.component(id,format);if(item.locked)return item;
  return {files:item.files,libs:item.libs,designSize:item.designSize,...(item.thumbDesignSize!==undefined?{thumb:item.thumb,thumbDesignSize:item.thumbDesignSize}:{}),a11y:item.a11y,prompt:item.prompt,notes:item.notes,...(format==='parts'?{parts:item.parts}:{}),...(item.portInstruction?{portInstruction:item.portInstruction}:{})};
 });
 register('get_prompt','Get the complete implementation prompt for a component.',{id},async({id})=>(await registry.component(id)).prompt);
 register('list_categories','List registry category names, groups and live counts.',{},async()=>(await registry.read('categories.json')).map(({name,group,count})=>({name,group,count})));
 register('get_tokens','Get INTRX tokens as CSS, JSON or a Tailwind theme extension.',{format:z.enum(['css','json','tailwind']).default('json')},async({format})=>{const tokens=await registry.read('tokens.json');return format==='json'?tokens:tokens[format];});
 register('get_stage_contract','Get stage sizes, safe areas and contributor rules.',{},()=>registry.read('stage-contract.json'));
 register('related_components','Find related components with an explanation.',{id,limit:z.number().int().min(1).max(20).default(4)},({id,limit})=>registry.related(id,limit));
 const resource=(uri,data)=>({contents:[{uri:uri.href,mimeType:'application/json',text:JSON.stringify(data,null,2)}]});
 server.registerResource('component',new ResourceTemplate('intrx://component/{id}',{list:async()=>({resources:(await registry.read('index.json')).map(item=>({uri:'intrx://component/'+item.id,name:item.title,mimeType:'application/json'}))})}),{description:'Component source and implementation contract'},async(uri,{id})=>resource(uri,await registry.component(String(id))));
 server.registerResource('category',new ResourceTemplate('intrx://category/{slug}',{list:async()=>({resources:(await registry.read('categories.json')).map(cat=>({uri:'intrx://category/'+cat.slug,name:cat.name,mimeType:'application/json'}))})}),{description:'Components in a category'},async(uri,{slug})=>{
  const category=(await registry.read('categories.json')).find(cat=>cat.slug===slug);if(!category)throw Error('Unknown category');return resource(uri,await registry.search({category:category.name,limit:Infinity}));
 });
 server.registerResource('tokens','intrx://tokens',{description:'Design and motion tokens',mimeType:'application/json'},async uri=>resource(uri,await registry.read('tokens.json')));
 server.registerPrompt('add-interaction',{description:'Find and adapt a component to the host project.',argsSchema:{brief:z.string(),framework:z.string()}},async({brief,framework})=>({messages:[{role:'user',content:{type:'text',text:'Add this interaction in '+framework+': '+brief+'\nSearch INTRX for candidates, favor the requested gesture, then use get_component on the best match. Preserve durations, easings, interaction math, keyboard support and reduced motion. Map colors to the host tokens. Add GSAP or Lenis only when libs requires them. Candidates: '+(await registry.search({query:brief,limit:5})).map(item=>item.id).join(', ')}}]}));
 server.registerPrompt('audit-motion',{description:'Review a host file against INTRX motion and stage rules.',argsSchema:{path:z.string()}},async({path})=>({messages:[{role:'user',content:{type:'text',text:'Read '+path+' in the host project and review its interactions against this stage contract and motion tokens. Check interruptibility, faster exits, pointer-only hover, keyboard access, cleanup and a designed reduced-motion state. Report evidence and concrete fixes.\n'+JSON.stringify(await registry.read('stage-contract.json'))+'\n'+(await registry.read('tokens.json')).css}}]}));
 return server;
}
export async function startMcp(registry){const server=createMcp(registry);await server.connect(new StdioServerTransport());return server;}
