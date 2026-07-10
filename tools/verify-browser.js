const port = process.argv[2] || '9223';
const targets = ['cursor-gooey-blob','dither-bayer','mechanical-switch','scroll-text-highlight','input-float-label','ui-sound-kit'];

async function browserCheck(ids) {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  for (let i=0; i<120 && document.querySelectorAll('.card').length<271; i++) await wait(100);
  document.documentElement.style.scrollBehavior='auto';
  const results = [];
  for (const id of ids) {
    const card = document.getElementById(id);
    if (!card) { results.push({id,missing:true}); continue; }
    window.scrollTo(0,card.offsetTop-120);
    await wait(700);
    const root = card.querySelector('.demo-stage > *');
    const canvas = card.querySelector('canvas');
    results.push({
      id,
      booted:!!root,
      failed:card.textContent.includes('demo failed to boot'),
      canvas:canvas?[canvas.width,canvas.height]:null,
      action:!!card.querySelector('.demo-stage button')
    });
  }
  return {
    cards:document.querySelectorAll('.card').length,
    count:document.getElementById('count-pill').textContent,
    categories:document.querySelectorAll('.cat-divider').length,
    results
  };
}

async function main() {
  const pages = await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();
  const page = pages.find(item => item.type === 'page');
  if (!page) throw new Error('No Chromium page target found');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve,reject) => {
    ws.addEventListener('open',resolve,{once:true});
    ws.addEventListener('error',reject,{once:true});
  });
  let seq=0;
  const pending=new Map(),errors=[];
  ws.addEventListener('message',event => {
    const msg=JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const pair=pending.get(msg.id); pending.delete(msg.id);
      return msg.error?pair.reject(new Error(msg.error.message)):pair.resolve(msg.result);
    }
    if (msg.method==='Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.text);
    if (msg.method==='Runtime.consoleAPICalled' && msg.params.type==='error') {
      errors.push(msg.params.args.map(arg => arg.value||arg.description||'').join(' '));
    }
  });
  const send=(method,params={}) => new Promise((resolve,reject) => {
    const id=++seq; pending.set(id,{resolve,reject});
    ws.send(JSON.stringify({id,method,params}));
  });
  await send('Runtime.enable');
  await send('Page.enable');
  const expression='('+browserCheck.toString()+')('+JSON.stringify(targets)+')';
  const evaluated=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});
  const result=evaluated.result.value;
  console.log(JSON.stringify({page:result,errors},null,2));
  ws.close();
  if(errors.length || result.cards!==271 || result.results.some(r=>!r.booted||r.failed||!r.canvas||!r.action)) process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1;});
