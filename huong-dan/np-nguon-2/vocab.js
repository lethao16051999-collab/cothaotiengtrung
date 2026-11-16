// node vocab.js → vocab.json: từ + bài khóa HSK1 (khóa "1-n") và HSK2 (khóa "2-n")
const vm=require('vm'),fs=require('fs');
const out={};
for(const lv of [1,2]){
 const dir=__dirname+'/../../data/hsk'+lv+'/';
 const ctx={Z:(h,p)=>h,G:()=>'',window:{},LD1:{},LD2:{},GXD:{},WG:{},SPN:{},console};ctx.window=ctx;vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(dir+'index.js','utf8').replace(/^const /gm,'var '),ctx);
 for(let n=1;n<=15;n++){
  try{vm.runInContext(fs.readFileSync(dir+'b'+String(n).padStart(2,'0')+'.js','utf8').replace(/^(const|let) /gm,'var '),ctx)}catch(e){console.error(lv,n,e.message)}
  const L=ctx['LD'+lv][n];if(!L){console.error('no',lv,n);continue}
  out[lv+'-'+n]={words:L.words.map(w=>[w[0],w[1]]),texts:(L.texts||[]).flatMap(t=>t.l.map(x=>x[1]))};
 }}
fs.writeFileSync(__dirname+'/vocab.json',JSON.stringify(out));
console.log(Object.keys(out).length,'bài');
