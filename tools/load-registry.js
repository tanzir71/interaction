/* Dependency-free loader shared by registry verifiers and generators. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
module.exports = function loadRegistry(root = path.resolve(__dirname,'..')) {
  const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  const files = [...html.matchAll(/<script src="(js\/demos\.[^"]+\.js)"><\/script>/g)].map(match=>match[1]);
  const context = { console }; context.window = context;
  context.INTRX = { demos:[], register(demo) { this.demos.push(demo); }, fontFaces:{}, resolveAssets:value=>value };
  vm.createContext(context);
  ['js/shell/registry.js',...files,'js/meta.stage.js'].forEach(file=>vm.runInContext(fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n'),context,{filename:file}));
  return { demos:context.INTRX.demos, metadata:context.INTRX.stageMeta, files, context };
};
