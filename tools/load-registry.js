/* Dependency-free loader shared by registry verifiers and generators. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
module.exports = function loadRegistry(root = path.resolve(__dirname,'..')) {
  const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  const manifest=path.join(root,'js/registry-files.json');
  const files = fs.existsSync(manifest)?JSON.parse(fs.readFileSync(manifest,'utf8')):[...html.matchAll(/<script src="(js\/demos\.[^"]+\.js)"><\/script>/g)].map(match=>match[1]);
  const context = { console }; context.window = context;
  context.INTRX = { demos:[], register(demo) { this.demos.push(demo); }, fontFaces:{}, resolveAssets:value=>value };
  vm.createContext(context);
  const filesById={};
  ['js/shell/registry.js',...files,'js/meta.stage.js'].forEach(file=>{const before=context.INTRX.demos.length;vm.runInContext(fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n'),context,{filename:file});context.INTRX.demos.slice(before).forEach(d=>filesById[d.id]=file);});
  return { demos:context.INTRX.demos, metadata:context.INTRX.stageMeta, files, filesById, context };
};
