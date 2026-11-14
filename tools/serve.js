/* Zero-dependency static development server with production-style compression. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const root=path.resolve(__dirname,'..'),port=Number(process.argv[2]||4173);
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.md':'text/plain','.txt':'text/plain','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf'};
http.createServer((request,response)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}catch{response.writeHead(400).end();return;}
 const file=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
 if(!file.startsWith(root+path.sep)){response.writeHead(403).end();return;}
 fs.readFile(file,(error,data)=>{if(error){response.writeHead(404).end('Not found');return;}
  const ext=path.extname(file),headers={'Content-Type':(types[ext]||'application/octet-stream')+(/^\.(html|js|css|json|md|txt|svg)$/.test(ext)?'; charset=utf-8':''),'Cache-Control':'no-cache','Vary':'Accept-Encoding'};
  if(/\bgzip\b/.test(request.headers['accept-encoding']||'')&&/^\.(html|js|css|json|md|txt|svg)$/.test(ext)){data=zlib.gzipSync(data);headers['Content-Encoding']='gzip';}
  headers['Content-Length']=data.length;response.writeHead(200,headers);response.end(request.method==='HEAD'?undefined:data);
 });
}).listen(port,'127.0.0.1',()=>console.log('INTRX: http://127.0.0.1:'+port));
