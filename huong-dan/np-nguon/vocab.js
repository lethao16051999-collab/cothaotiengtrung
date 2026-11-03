const vm=require('vm'),fs=require('fs');
const dir=__dirname+'/../../data/hsk1/';
const ctx={Z:(h,p)=>h,G:()=>'',window:{},LD1:{},GXD:{},WG:{},console};ctx.window=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(dir+'index.js','utf8').replace(/^const /gm,'var '),ctx);
const out={};
for(const n of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]){
 const f=dir+'b'+String(n).padStart(2,'0')+'.js';
 try{vm.runInContext(fs.readFileSync(f,'utf8').replace(/^(const|let) /gm,'var '),ctx)}catch(e){console.error(n,e.message)}
 const L=ctx.LD1[n];if(!L){console.error('no',n);continue}
 out[n]={words:L.words.map(w=>[w[0],w[1],w[3]||w[2]]),texts:(L.texts||[]).flatMap(t=>t.l.map(x=>x[1]))};
}
fs.writeFileSync('vocab.json',JSON.stringify(out));
for(const n in out)console.log(n,out[n].words.map(w=>w[0]).join(' '));
