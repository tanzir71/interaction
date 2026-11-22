const test=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {audit,renderedSource}=require('./motion-audit');
const body="function originalModel(){return 'cubic-bezier(.1,.2,.3,.4)';}";
const model={id:'example',functionName:'originalModel',occurrences:1,sha256:crypto.createHash('sha256').update(body).digest('hex'),reason:'Isolated original model fixture.'};
const demo={id:'example',css:'@media(prefers-reduced-motion:reduce){.example{transition:none}}',js:'const original='+body+';'};
test('only exact model bodies are excluded; complete CSS and surrounding JS remain checked',()=>{
 assert.deepEqual(audit(demo,[model]),[]);assert.equal(renderedSource(demo,[model]).excluded.length,1);
 assert(audit({...demo,css:demo.css+'.example{transition:transform 250ms cubic-bezier(.1,.2,.3,.4)}'},[model]).some(s=>s.startsWith('curve ')));
 assert(audit({...demo,js:demo.js+";const painted='cubic-bezier(.1,.2,.3,.4)';"},[model]).some(s=>s.startsWith('curve ')));
});
test('changed, missing and duplicated virtual model bodies fail closed',()=>{
 for(const js of[demo.js.replace("return '","return 'changed "),'',demo.js+body])assert(audit({...demo,js},[model]).some(s=>s.startsWith('model ')));
});
test('ordinary demos receive no model exemption',()=>assert(audit({...demo,id:'other'},[model]).some(s=>s.startsWith('curve '))));
test('reduced motion, duration and linear transition gates remain active outside models',()=>{
 assert(audit({...demo,css:'.example{transition:transform 530ms linear}'},[model]).includes('duration 530ms'));
 assert(audit({...demo,css:'.example{transition:transform 530ms linear}'},[model]).some(s=>s.startsWith('reduced ')));
 assert(audit({...demo,css:'.example{transition:transform 530ms linear}'},[model]).some(s=>s.startsWith('linear ')));
});
test('fractional seconds retain their decimal point',()=>{
 for(const time of['.55s','0.55s','550ms'])assert(audit({...demo,css:demo.css+'.example{transition:opacity '+time+' ease-in-out}'},[model]).includes('duration 550ms'));
 assert(!audit({...demo,css:demo.css+'.example{transition:opacity .15s ease-in-out}'},[model]).some(s=>s.startsWith('duration ')));
});
test('continuous model frequencies and bounded recipe stagger do not exempt UI durations',()=>{
 assert.deepEqual(audit({...demo,css:demo.css+'.example{animation:buzz .065s infinite alternate;animation-delay:.12s}'},[model]),[]);
 assert(audit({...demo,css:demo.css+'.example{transition:transform .065s}'},[model]).includes('duration 65ms'));
 assert(audit({...demo,css:demo.css+'.example{animation-delay:.32s}'},[model]).includes('duration 320ms'));
});
