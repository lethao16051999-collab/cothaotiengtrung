/* ===== Vấn đáp rảnh tay (HSK1) · thêm 26/11/2026 =====
   Dữ liệu: data/hsk1/vd.js (VD1 → LD1[n].vd). Tab "🎙 Vấn đáp" tự hiện ở bài có dữ liệu vd.
   Mỗi câu: máy đọc câu hỏi 2 lần (lần 2 chậm hơn) → đếm ngược cho học viên trả lời → hết giờ hiện đáp án mẫu (chỉ chữ, không đọc)
   → tự chuyển câu. Học viên tự chọn: ẩn chữ khi hỏi (luyện nghe) hay hiện chữ Hán + pinyin; thời gian trả lời; trộn câu.
   Không gọi rr() trong lúc chạy (rr dựng lại cả trang); rr() / đổi tab / đóng bài sẽ tự dừng phiên (vdStop). ===== */
(function(){
const K="ct_vd",TL={h:"Hỏi",d:"Đối đáp",t:"Tình huống",o:"Ôn bài trước"};
let CFG={tm:"auto",show:0,mix:0,sel:[],cnt:"all"};
/* sel: các bài đã chọn ở Vấn đáp tổng hợp; cnt: số câu ("all" hoặc 10/20/30 câu ngẫu nhiên) */try{Object.assign(CFG,JSON.parse(localStorage.getItem(K)||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(CFG))}catch(e){}};
const q$=id=>document.getElementById(id);
const E=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
/* thời gian trả lời: tự động = 8 giây (đối đáp, câu ngắn), 15 giây (câu dài) */
const hzN=s=>(String(s).split("/")[0].match(/[㐀-鿿…]/g)||[]).length;
const tOf=it=>CFG.tm!="auto"?+CFG.tm:(it.k=="d"||it.k=="o"||hzN(it.a)<=6?8:15);
let S=null; /* phiên đang chạy: {L,list,i,ph:"ask"|"ans"|"show"|"end",st:"run"|"pause",left,tok,n} */
let AC=null,WL=null;
function beep(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type="sine";o.frequency.value=880;
 g.gain.setValueAtTime(.0001,AC.currentTime);g.gain.exponentialRampToValueAtTime(.35,AC.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.45);
 o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+.5)}catch(e){}}
async function wake(on){try{if(on&&navigator.wakeLock&&!WL)WL=await navigator.wakeLock.request("screen");if(!on&&WL){WL.release();WL=null}}catch(e){WL=null}}
const viV=()=>{try{return speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){return null}};
/* đọc một câu, trả về Promise khi đọc xong (hoặc bị hủy) */
function speak(t,lang,rate,tok){return new Promise(ok=>{if(!S||S.tok!==tok)return ok();
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(lang=="vi"?t:(typeof ttsFix=="function"?ttsFix(t):t));
  if(lang=="vi"){const v=viV();if(!v)return ok("novoice");u.voice=v;u.lang=v.lang;u.rate=1}else{const zv=typeof zhV!="undefined"?zhV:null;u.lang=zv?zv.lang:"zh-CN";if(zv)u.voice=zv;u.rate=rate;u.pitch=.95}
  let done=false;const fin=()=>{if(!done){done=true;clearTimeout(gd);ok()}};u.onend=fin;u.onerror=fin;
  const gd=setTimeout(fin,Math.max(4000,t.length*450/rate));speechSynthesis.speak(u)}catch(e){ok()}})}
/* chờ ms, dừng khi phiên bị hủy; lúc tạm dừng thì đứng chờ */
function wait(ms,tok,tick){return new Promise(ok=>{let left=ms;const step=()=>{if(!S||S.tok!==tok)return ok(false);
  if(S.st=="pause")return setTimeout(step,150);left-=150;if(tick)tick(left);if(left<=0)return ok(true);setTimeout(step,150)};setTimeout(step,150)})}
const VR=()=>typeof VRATE!="undefined"&&VRATE?VRATE:.85,rateA=VR,rateB=()=>Math.max(.6,VR()-.2);
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}

/* ---------- giao diện ---------- */
const qText=(it,force)=>{if(it.k=="t")return `<div class="vd-sit">💬 ${E(it.q)}</div>`;
 if(!force&&!CFG.show)return `<div class="vd-ear" aria-label="Đang nghe">🎧<small>Nghe và trả lời</small></div>`;
 return `<div class="vd-hz zh">${E(it.q)}</div><div class="vd-py py">${E(it.qp)}</div>${it.vi?`<div class="vd-vi vi">${E(it.vi)}</div>`:""}`};
function card(){if(!S)return"";const it=S.list[S.i],n=S.list.length;
 if(S.ph=="end"&&S.multi)return `<div class="vd-end"><div style="font-size:3rem">🎉</div><h3>Xong ${n} câu vấn đáp!</h3><p>Các bài: ${S.bs.join(", ")}. Luyện thêm một lượt với chế độ ẩn chữ để nhớ lâu hơn nhé.</p>
<div class="row c"><button class="btn" onclick="vdMixGo()">🔁 Luyện lại các bài này</button><button class="btn o" onclick="vdStop(1)">📚 Chọn bài khác</button></div></div>`;
 if(S.ph=="end")return `<div class="vd-end"><div style="font-size:3rem">🎉</div><h3>Xong ${n} câu vấn đáp Bài ${S.n}!</h3><p>Em đã luyện ${S.done} lượt bài này. Muốn nhớ lâu, luyện thêm một lượt nữa với chế độ ẩn chữ nhé.</p>
<div class="row c"><button class="btn" onclick="vdGo(0)">🔁 Luyện lại</button><button class="btn o" onclick="vdGo(1)">🔀 Luyện lại, trộn câu</button></div></div>`;
 const tag=`<div class="vd-top"><span class="pill">Câu ${S.i+1}/${n}</span>${S.multi?`<span class="pill">Bài ${it.b}</span>`:""}<span class="pill">${TL[it.k]||""}</span>${it.n?`<span class="pill">👉 ${E(it.n)}</span>`:""}</div>`;
 if(S.ph=="ask")return tag+qText(it)+`<div class="vd-st">🔊 Đang đọc câu hỏi…</div>`;
 if(S.ph=="ans"){const T=tOf(it),l=Math.max(0,Math.ceil(S.left/1000)),pc=Math.max(0,S.left/(T*1000));
  return tag+qText(it)+`<div class="vd-ring" style="--p:${pc}"><b id="vd-sec">${l}</b><small>giây</small></div><div class="vd-st">🗣 Em trả lời to thành tiếng!</div>`}
 return tag+qText(it,1)+`<div class="vd-ans"><small>Đáp án mẫu</small><div class="vd-hz zh">${E(it.a)}</div><div class="vd-py py">${E(it.ap)}</div>${/……/.test(it.a)?`<div class="vd-vi">Chỗ “……” em tự điền theo bản thân.</div>`:""}</div><div class="vd-st">⏭ Tự chuyển sang câu sau…</div>`}
function ctl(){if(!S||S.ph=="end")return"";return `<div class="row c vd-ctl">${S.st=="pause"?`<button class="btn" onclick="vdPause()">▶ Tiếp tục</button>`:`<button class="btn" onclick="vdPause()">⏸ Tạm dừng</button>`}
<button class="btn o" onclick="vdAgain()">🔁 Nghe lại câu</button><button class="btn o" onclick="vdNext()">⏭ Câu sau</button><button class="btn o" onclick="vdStop(1)">⏹ Dừng</button></div>`}
function paint(){const b=q$("vd-stage");if(!b){stopAll();return}b.innerHTML=card();const c=q$("vd-ctl");if(c)c.innerHTML=ctl()}
function tickRing(){const it=S.list[S.i],T=tOf(it),r=document.querySelector(".vd-ring"),s=q$("vd-sec");if(!r||!s)return;
 r.style.setProperty("--p",Math.max(0,S.left/(T*1000)));s.textContent=Math.max(0,Math.ceil(S.left/1000))}
const opt=(k,v,lab)=>`<button class="tg ${String(CFG[k])==String(v)?"on":""}" onclick="vdSet('${k}','${v}')">${lab}</button>`;
function setup(L){const n=L.vd.length,r=typeof ldN=="function"?ldN(cur):{};
 return `<div class="card note"><b>🎙 Vấn đáp rảnh tay · ${n} câu</b><p>Máy đọc câu hỏi 2 lần, em trả lời to thành tiếng trong thời gian đếm ngược. Hết giờ, đáp án mẫu hiện lên để em tự so, rồi máy tự chuyển câu. Em không cần bấm gì, cứ nghe và nói.</p>${r.vdn?`<small>Em đã luyện ${r.vdn} lượt bài này.</small>`:""}</div>
<div class="card vd-set">${opts()}
<div class="row c"><button class="btn vd-go" onclick="vdGo()">▶ Bắt đầu vấn đáp</button></div><small class="ctx">Mẹo: đặt điện thoại ra xa, bật loa to. Giọng đọc chỉnh ở nút 🔊 Giọng đọc phía trên.</small></div>`}
function opts(){return `<div class="vd-opt"><span>Lúc máy hỏi:</span>${opt("show",0,"🙈 Ẩn chữ (luyện nghe)")}${opt("show",1,"👀 Hiện chữ Hán + pinyin")}</div>
<div class="vd-opt"><span>Thời gian trả lời:</span>${opt("tm","auto","Tự động (8–15 giây)")}${[5,10,15,20,30].map(s=>opt("tm",s,s+" giây")).join("")}</div>
<div class="vd-opt"><span>Thứ tự câu:</span>${opt("mix",0,"Theo thứ tự")}${opt("mix",1,"🔀 Trộn câu")}</div>`}
function list(L){return `<details class="card vd-list"><summary><b>📋 Xem trước danh sách câu hỏi</b></summary><ol>${L.vd.map(it=>`<li><span class="pill">${TL[it.k]}</span> ${it.k=="t"?E(it.q):`<span class="zh">${E(it.q)}</span> <span class="py">${E(it.qp)}</span>`}<br><small>→ <span class="zh">${E(it.a)}</span> <span class="py">${E(it.ap)}</span></small></li>`).join("")}</ol></details>`}
window.vVd=function(L){if(S&&!S.multi&&S.n===cur)return `<div class="card vd-box" id="vd-box"><div id="vd-stage">${card()}</div><div id="vd-ctl">${ctl()}</div></div>`;
 return `<div id="vd-box">${setup(L)}</div>${list(L)}`+(typeof nextBtn=="function"?`<div class="row c">${nextBtn("vd")}</div>`:"")};
window.vdSet=function(k,v){CFG[k]=(k=="tm"||k=="cnt")&&v=="all"||v=="auto"?v:+v;save();
 if(q$("vd-mixset")){mixPaint();return}const L=LD[cur],b=q$("vd-box");if(b&&L)b.outerHTML=`<div id="vd-box">${setup(L)}</div>`};

/* ---------- chạy ---------- */
async function run(tok){while(S&&S.tok===tok&&S.i<S.list.length){const it=S.list[S.i];
  S.ph="ask";paint();
  if(it.k=="t"){const r=await speak(it.q,"vi",1,tok);if(r=="novoice"&&!(await wait(2500,tok)))return}
  else{await speak(it.q,"zh",rateA(),tok);if(!(await wait(700,tok)))return;await speak(it.q,"zh",rateB(),tok)}
  if(!S||S.tok!==tok||S.st=="pause")return; /* tạm dừng lúc đang đọc: Tiếp tục sẽ đọc lại câu */
  S.ph="ans";S.left=tOf(it)*1000;paint();
  if(!(await wait(S.left,tok,l=>{S.left=l;tickRing()})))return;
  beep();S.ph="show";paint();
  const hold=Math.min(9000,4000+hzN(it.a)*250);if(!(await wait(hold,tok)))return;
  S.i++}
 if(S&&S.tok===tok){S.ph="end";S.done=1;if(!S.multi)try{const r=ldN(cur);r.vdn=(r.vdn||0)+1;svN(cur,r);S.done=r.vdn}catch(e){}wake(false);paint()}}
window.vdGo=function(mix){const L=LD[cur];if(!L||!L.vd)return;if(mix!=null){CFG.mix=mix;save()}
 try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state=="suspended")AC.resume()}catch(e){}
 const tok=(S?S.tok:0)+1;S={L,n:cur,list:CFG.mix?shuffle(L.vd):L.vd.slice(),i:0,ph:"ask",st:"run",left:0,tok,done:0};
 const b=q$("vd-box");if(b)b.outerHTML=window.vVd(L);else return;
 const ls=document.querySelector(".vd-list");if(ls)ls.remove();
 wake(true);q$("vd-box").scrollIntoView({block:"nearest"});run(tok)};
window.vdPause=function(){if(!S)return;if(S.st=="pause"){S.st="run";
  if(S.ph=="ask"){restart();return}}else{S.st="pause";try{speechSynthesis.cancel()}catch(e){}}
 const c=q$("vd-ctl");if(c)c.innerHTML=ctl()};
function restart(){const tok=S.tok+1;S.tok=tok;S.st="run";try{speechSynthesis.cancel()}catch(e){}run(tok)}
window.vdAgain=function(){if(!S||S.ph=="end")return;restart()};
window.vdNext=function(){if(!S||S.ph=="end")return;S.i++;restart()};
function stopAll(){if(!S)return;S=null;try{speechSynthesis.cancel()}catch(e){}wake(false)}
window.vdStop=function(ui){const m=S&&S.multi;stopAll();if(ui&&m){if(typeof rr=="function")rr();return}if(ui){const L=LD[cur],b=q$("vd-box");if(b&&L){b.outerHTML=`<div id="vd-box">${setup(L)}</div>`;const lb=q$("lbody");if(lb&&!document.querySelector(".vd-list"))lb.insertAdjacentHTML("beforeend",list(L))}}};
/* ---------- Vấn đáp tổng hợp: chọn nhiều bài (ô ở đầu danh sách bài, cạnh "Bài mở đầu") ---------- */
const vdLs=()=>Object.keys(LD).map(Number).filter(n=>LD[n]&&LD[n].vd).sort((a,b)=>a-b);
const selOk=()=>{const ok=vdLs();return (CFG.sel||[]).filter(n=>ok.includes(n))};
const estMin=list=>Math.max(1,Math.round(list.reduce((a,it)=>a+tOf(it)+10,0)/60));
function pool(){return selOk().flatMap(n=>LD[n].vd.map((it,i)=>Object.assign({b:n,_i:i},it)))}
function mixSet(){const ls=vdLs(),sel=selOk(),P=pool(),N=CFG.cnt=="all"?P.length:Math.min(+CFG.cnt,P.length);
 const qb=(lab,a,b)=>`<button class="tg" onclick="vdSelR(${a},${b})">${lab}</button>`;
 return `<div id="vd-mixset"><div class="card vd-set"><div class="vd-opt"><span>Chọn bài (bấm để chọn/bỏ):</span></div>
<div class="vd-bais">${ls.map(n=>{const t=LTS[olLv]&&LTS[olLv][n-1]?LTS[olLv][n-1].split("|")[0]:"";return `<button class="vd-bai ${sel.includes(n)?"on":""}" onclick="vdSel(${n})"><b>Bài ${n}</b><span class="zh">${E(t)}</span><small>${LD[n].vd.length} câu</small></button>`}).join("")}</div>
<div class="vd-opt"><span>Chọn nhanh:</span>${qb("Tất cả",1,99)}${qb("Bài 1–5",1,5)}${qb("Bài 6–10",6,10)}${qb("Bài 11–15",11,15)}${qb("Bỏ chọn",0,0)}</div>
<div class="vd-opt"><span>Số câu:</span>${opt("cnt","all","Tất cả")}${[10,20,30].map(c=>opt("cnt",c,c+" câu ngẫu nhiên")).join("")}</div>
${opts()}
<div class="vd-sum">${sel.length?`Đã chọn <b>${sel.length} bài</b> · sẽ hỏi <b>${N} câu</b> · khoảng <b>${estMin(P.slice(0,N))} phút</b>`:`Em chưa chọn bài nào.`}</div>
<div class="row c"><button class="btn vd-go" onclick="vdMixGo()" ${sel.length?"":"disabled"}>▶ Bắt đầu vấn đáp</button></div><small class="ctx">Mẹo: đặt điện thoại ra xa, bật loa to. Mỗi câu có ghi “Bài mấy” để em biết câu đó ở bài nào.</small></div></div>`}
function mixPaint(){const b=q$("vd-box");if(b)b.innerHTML=mixSet()}
window.vdSel=function(n){let a=selOk();a=a.includes(n)?a.filter(x=>x!=n):a.concat(n).sort((x,y)=>x-y);CFG.sel=a;save();mixPaint()};
window.vdSelR=function(a,b){CFG.sel=vdLs().filter(n=>n>=a&&n<=b);save();mixPaint()};
window.vdMixOpen=function(){window.NVOPEN=false;window.VDOPEN=true;cur=null;rr();window.scrollTo(0,0)};
window.vdMixClose=function(){window.VDOPEN=false;rr()};
window.vdMixGo=function(){let P=pool();if(!P.length)return;
 if(CFG.cnt!="all"&&+CFG.cnt<P.length){P=shuffle(P).slice(0,+CFG.cnt);if(!CFG.mix)P.sort((x,y)=>x.b-y.b||x._i-y._i)}
 else if(CFG.mix)P=shuffle(P);
 try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state=="suspended")AC.resume()}catch(e){}
 const tok=(S?S.tok:0)+1;S={multi:1,bs:[...new Set(P.map(x=>x.b))].sort((a,b)=>a-b),list:P,i:0,ph:"ask",st:"run",left:0,tok,done:0};
 const b=q$("vd-box");if(!b)return;b.className="card vd-box";b.innerHTML=`<div id="vd-stage">${card()}</div><div id="vd-ctl">${ctl()}</div>`;
 wake(true);b.scrollIntoView({block:"nearest"});run(tok)};
window.VDH=window.VDH||{};
VDH[1]={card:()=>vdLs().length?`<div class="ls go vd-ls" onclick="vdMixOpen()"><b>🎙 Vấn đáp tổng hợp</b><span class="vd-mini">Chọn bài muốn ôn · nghe câu hỏi · trả lời to</span><small>${vdLs().reduce((a,n)=>a+LD[n].vd.length,0)} câu · ${vdLs().length} bài · Vào luyện →</small></div>`:"",
 view:()=>`<div class="row"><button class="btn o" onclick="vdMixClose()">← Danh sách bài</button></div>
<div class="card note"><b>🎙 Vấn đáp tổng hợp HSK 1</b><p>Em chọn một hoặc nhiều bài muốn ôn. Máy đọc câu hỏi 2 lần, em trả lời to thành tiếng trong thời gian đếm ngược. Hết giờ, đáp án mẫu hiện lên, rồi máy tự chuyển câu. Em không cần bấm gì, cứ nghe và nói.</p></div>
<div id="vd-box">${mixSet()}</div>`};
document.addEventListener("visibilitychange",()=>{if(S&&!document.hidden&&S.st=="run")wake(true)});

const st=document.createElement("style");st.textContent=`
.vd-set .tg{border:1px solid var(--b);background:var(--k);color:var(--t);border-radius:999px;padding:6px 14px;font:700 .92rem var(--ui,sans-serif);cursor:pointer}.vd-set .tg.on{background:var(--g);border-color:var(--g);color:#fff}
.vd-set .vd-opt{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0}.vd-set .vd-opt>span{font-weight:700;min-width:150px}
.vd-box{text-align:center;padding:18px 12px}.vd-top{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.vd-hz{font-size:clamp(2rem,7vw,3.4rem);font-weight:700;line-height:1.3;margin:8px 0}
.vd-py{color:var(--m);font-size:clamp(1.3rem,4.6vw,2.1rem);font-weight:600;margin:2px 0 6px}
.vd-vi{color:var(--sub);font-size:1.05rem}.vd-sit{font-size:clamp(1.3rem,4.5vw,1.9rem);font-weight:700;line-height:1.4;margin:10px 0}
.vd-ear{font-size:4.5rem;line-height:1;margin:18px 0 6px;display:flex;flex-direction:column;align-items:center;gap:8px}.vd-ear small{font-size:1rem;color:var(--sub)}
.vd-ring{--p:1;width:130px;height:130px;border-radius:50%;margin:14px auto 6px;display:flex;flex-direction:column;align-items:center;justify-content:center;
 background:radial-gradient(closest-side,var(--c) 78%,transparent 80% 100%),conic-gradient(var(--g) calc(var(--p)*360deg),var(--b) 0)}
.vd-ring b{font:900 3rem "Be Vietnam Pro",sans-serif;line-height:1}.vd-ring small{color:var(--sub)}
.vd-ans{background:var(--k);border:2px solid var(--g);border-radius:14px;padding:10px;margin:12px auto 4px;max-width:640px}.vd-ans>small{font-weight:700;color:var(--sub)}
.vd-st{color:var(--sub);margin-top:8px}.vd-ctl{margin-top:10px}.vd-go{font-size:1.1rem;padding:14px 26px}
.vd-bais{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px;margin:6px 0 10px}
.vd-bai{border:2px solid var(--b);background:var(--k);border-radius:12px;padding:8px 6px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;color:var(--t);font:inherit}
.vd-bai b{font-size:1rem}.vd-bai .zh{font-size:.85rem;line-height:1.2;text-align:center}.vd-bai small{color:var(--sub);font-size:.75rem}
.vd-bai.on{background:var(--g);border-color:var(--g);color:#fff}.vd-bai.on small{color:#fff}
.vd-sum{text-align:center;margin:10px 0 4px;font-size:1.05rem}.vd-go[disabled]{opacity:.45;cursor:not-allowed}
.vd-ls{grid-column:1/-1;background:linear-gradient(135deg,var(--k),var(--c));border:2px solid var(--g)}.vd-mini{display:block;font-size:1rem;margin:4px 0}
.vd-list ol{padding-left:22px}.vd-list li{margin:8px 0;line-height:1.5}.vd-list .zh{font-size:1.1rem}.vd-list .py{color:var(--m)}
.hidepy .vd-box .py{display:block}`;document.head.appendChild(st);
})();
