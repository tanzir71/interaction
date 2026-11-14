/* Stage only public, static deliverables; npm dependencies stay out of hosting. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),output=path.resolve(root,'.artifacts','site');
if(!output.startsWith(root+path.sep)||path.dirname(output)!==path.join(root,'.artifacts'))throw Error('Unsafe static-site staging path');
fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output,{recursive:true});
for(const entry of ['index.html','.nojekyll','css','js','assets','registry','r','docs','llms.txt','llms-full.txt','LICENSE']){
 fs.cpSync(path.join(root,entry),path.join(output,entry),{recursive:true});
}
console.log('Staged public static files in '+path.relative(root,output));
