// node compile.js 1 2 3 ... → ghi data/hsk1/npNN.js từ src/bNN.js; in ký tự ngoài phạm vi từ vựng
const fs=require('fs'),{py}=require('./pin.js'),V=require('./vocab.json');
const OUT=__dirname+'/../../data/hsk1/';
const LESS=[1,2,3,4,5,6,7,8,9,10,11,12,14];
const HAN=/[一-鿿]/;
const lc=s=>py(s,{lc:true});
const inl=s=>String(s||'').replace(/\[\[(.+?)\]\]/g,(m,z)=>`<span class="npz"><span class="zh">${z}</span> <small class="opy">${lc(z)}</small></span>`);
function tokPy(tks){return tks.map((t,i)=>{let p=lc(t);if(t==='不'||t==='一'){const nx=tks[i+1]||'';p=py(t+nx,{lc:true}).split(' ')[0]}return p})}
function allowed(n){const s=new Set('一二三四五六七八九十零两');for(const k of LESS){if(k>n)break;const v=V[k];v.words.forEach(w=>[...w[0]].forEach(c=>s.add(c)));v.texts.forEach(t=>[...t].forEach(c=>s.add(c)))}return s}
const EXTRA_OK=new Set([...'李文安妮白家月王一飞小语陈天中阮明越南美河内北京']);
function build(n){
 const src=require('./src/b'+String(n).padStart(2,'0')+'.js');
 const ok=allowed(n),miss={};
 const chk=(s,where)=>{[...String(s||'').replace(/\[\[|\]\]/g,'')].forEach(c=>{if(HAN.test(c)&&!ok.has(c)&&!EXTRA_OK.has(c))(miss[c]=miss[c]||[]).push(where)})};
 const np=[],so=[],tr=[];
 src.forEach((P,g)=>{
  const o={h:P.h,cd:inl(P.cd),m:inl(P.m),x:(P.x||[]).map(inl)};
  o.f=(P.f||[]).map(r=>{chk(r[2],P.h+' f');return [r[0],r[1],r[2]||'',r[2]?py(r[2]):'',r[3]||'']});
  o.w=(P.w||[]).map(w=>{chk(w[1],P.h+' w');return [w[0],py(w[0]),w[1],py(w[1]),inl(w[2]||'')]});
  o.d=(P.d||[]).map((D,j)=>{const t=D[0],e=x=>inl(x||'');let r;
   if(t==='chen'){const raw=D[2].split('|'),tk=[],a=[];raw.forEach(x=>{if(x==='^')a.push(tk.length);else tk.push(x)});
    if(!a.length)throw new Error('chen no ^ '+P.h+' '+j);const full=tk.slice(0,a[0]).join('')+D[1]+tk.slice(a[0]).join('');const tp=tokPy(tk);chk(full,P.h+' chen');
    r={t,w:D[1],wp:lc(D[1]),tk:tk.map((x,i)=>[x,/^[，。？！]$/.test(x)?'':tp[i]]),a,r:[full,py(full)],e:e(D[3])};if(D[4])r.vi=D[4]}
   else if(t==='nghe'){const o2=D[3].split('|');r={t,s:D[1],l:D[2]||undefined,o:o2,a:D[4],e:e(D[5])};if(o2.some(x=>HAN.test(x)))r.op=o2.map(x=>HAN.test(x)?lc(x):'')}
   else if(t==='dung'){const o2=D[2].split('|');o2.forEach(x=>chk(x,P.h+' dung'));r={t,vi:D[1],o:o2,op:o2.map(x=>py(x)),a:D[3],e:e(D[4])}}
   else{const o2=D[2].split('|');chk(D[1],P.h+' q');o2.forEach(x=>chk(x,P.h+' '+t));r={t,q:D[1],qp:py(D[1]),o:o2,op:o2.map(x=>HAN.test(x)&&!/[A-Za-zÀ-ỹ]/.test(x)?(x.length<=3&&!/[。？！]/.test(x)?lc(x):py(x)):''),a:D[3],e:e(D[4])};if(D[5])r.vi=D[5];if(D[6])r.l=D[6]}
   if(r.a==null||(r.o&&(r.a<0||r.a>=r.o.length)))throw new Error('bad answer '+P.h+' #'+j);
   if(r.o){if(new Set(r.o).size!==r.o.length)throw new Error('dup option '+P.h+' #'+j);
    if(!r.o.some(x=>/[A-Za-zÀ-ỹ]{3,}/.test(x)&&!/^[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ' ]+$/i.test(x))){let h=0;const key=(r.q||r.vi||r.s||'')+j+P.h;for(const ch of key)h=(Math.imul(h,31)+ch.codePointAt(0))>>>0;h=h||7;
     const idx=r.o.map((_,i)=>i);for(let i=idx.length-1;i>0;i--){h^=h<<13;h>>>=0;h^=h>>>17;h^=h<<5;h>>>=0;const k=h%(i+1);[idx[i],idx[k]]=[idx[k],idx[i]]}
     const o=idx.map(i=>r.o[i]),op=r.op?idx.map(i=>r.op[i]):null;r.a=idx.indexOf(r.a);r.o=o;if(op)r.op=op}}
   return r});
  np.push(o);
  (P.s||[]).forEach(S=>{const f=S[0],tks=f.replace(/[，。？！]$/,'').split('/').map(x=>x.trim()).filter(x=>x&&!/^[，。？！、：]$/.test(x));const full=f.replace(/\//g,'');chk(full,P.h+' so');
   const tp=tokPy(tks);so.push({g,t:tks.map((x,i)=>x+'|'+tp[i]),ok:[tks.join('')].concat(S[2]||[]),f:full,p:py(full),e:inl(S[1]||''),vi:S[3]||undefined})});
  (P.c||[]).forEach(C=>{chk(C[1],P.h+' c');(C[2]||[]).forEach(x=>chk(x,P.h+' c-alt'));tr.push({g,vi:C[0],a:[C[1]].concat(C[2]||[]),r:[C[1],py(C[1])]})});
 });
 const js=`/* ===== HSK1 · Bài ${n} · Ngữ pháp dạng mới (sinh tự động từ bản nguồn, 03/11/2026) — js/np1.js hiển thị ===== */
(function(){const L=LD1[${n}];if(!L)return;
L.np=${JSON.stringify(np)};
L.gp=L.np.map((p,i)=>({h:(i+1)+". "+p.h,b:""}));delete L.gpWip;
const o=GXD["1-${n}"]||{};GXD["1-${n}"]={so:${JSON.stringify(so)},tr:${JSON.stringify(tr)},pc:o.pc||[]};
})();
`;
 fs.writeFileSync(OUT+'np'+String(n).padStart(2,'0')+'.js',js);
 const nd=np.reduce((a,p)=>a+p.d.length,0);
 console.log(`Bài ${n}: ${np.length} điểm · drill ${nd} · sắp xếp ${so.length} · tạo câu ${tr.length} · ${(js.length/1024).toFixed(1)} KB`);
 const mk=Object.keys(miss);if(mk.length)console.log('  ⚠ ngoài phạm vi:',mk.map(c=>c+'('+[...new Set(miss[c])].slice(0,2).join(';')+')').join(' '));
}
const args=process.argv.slice(2).map(Number);(args.length?args:LESS).forEach(n=>{try{build(n)}catch(e){console.log('Bài',n,'LỖI',e.message)}});
