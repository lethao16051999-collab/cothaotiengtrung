/* ===== TOCFL B1 · Làm lại đến khi đạt (10/11/2026 theo cô Thảo) =====
   1. Đề 50 câu (④ Luyện đề): chưa đạt 40/50 → khóa đáp án + giải thích câu sai, nút "🔁 Làm lại N câu sai (lần k)".
      Lần làm lại chỉ hiện nhóm có câu sai; câu đúng giữ nguyên. Đạt rồi mới mở đáp án và nút "Làm lại đề".
      Lưu trên máy: tbx{bài} = {lan, ans, s1 (điểm lần 1), pass}. Sổ theo dõi: "Nộp test … Làm lại câu sai (lần N) · lần 1: x/50".
   2. Dịch Việt → Trung (③ Ngữ pháp · Luyện nhanh 2): học viên có mã gõ câu, nộp cho cô chấm (tab ✍ Chấm bài, "TOCFL B1 · Bài N").
      Câu trùng đáp án (hoặc trùng câu cô đã chấm đúng) máy chấm ✓; còn lại chờ cô. Cô chấm xong mà chưa đạt (< 80% hoặc còn câu chưa làm)
      → câu ½ / ✗ / chưa làm tự mở lại, có "Lần trước em viết… · cô nhận xét…", nộp lần 2, 3… đến khi đạt. Đáp án câu sai mở khi đạt.
      Bài nộp lưu trên máy: ct_tdn_7_{bài} (khác ct_gxn_ của trang chính). Nháp: ct_tdd_7_{bài}. Máy chủ: chamApi_ sẵn có (vnop / vkq / vdung).
   Nạp SAU khối script chính (dùng C, N, D, EX, QS, $, $$, esc, store, TT). ===== */
(function(){
if(typeof TT=="undefined"||typeof paneGrammar!="function")return;
const LV=7;
const J=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const P=(k,o)=>{try{localStorage.setItem(k,JSON.stringify(o))}catch(e){}};
const nz=s=>String(s||"").replace(/[，。！？、,.!?\s「」『』：:；;（）()…—\-"“”'‘’]/g,"");
const gradeL=g=>g==null||g===""?"":+g>=1?"✓":+g>0?"½":"✗";
const tm=ms=>{const d=new Date(ms),p=n=>String(n).padStart(2,"0");return `${p(d.getHours())}:${p(d.getMinutes())} ${p(d.getDate())}/${p(d.getMonth()+1)}`};
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const st=document.createElement("style");st.textContent=`
.llbox{border-left:4px solid #c9a227;background:#fff8e6}.llold{background:#fdf0f3;border:1px dashed #c98a9e;border-radius:.6rem;padding:.45rem .7rem;margin:.4rem 0;font-size:.92rem;line-height:1.6}
.lllock{background:#f4efe3;border-radius:.5rem;padding:.4rem .7rem;margin:.4rem 0;color:#6b5a3a;font-size:.9rem}.llb{display:inline-block;border-radius:999px;padding:0 .55rem;font-weight:700;font-size:.85rem}
.llb.ok{background:var(--okb,#e3f3e6);color:var(--ok,#1e7a38)}.llb.no{background:var(--badb,#fbe4e4);color:var(--bad,#b3261e)}.llb.mid{background:#fdf1d6;color:#8a5a00}.llb.wt{background:#eee;color:#555}
.llin{width:100%;box-sizing:border-box;margin:.35rem 0;font-size:1.05rem}.llrow{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}.llnx{color:#7a1f3d;font-size:.92rem}
.eq.lldone{opacity:.55;pointer-events:none}.eq.lldone .qn::after{content:" ✓ đúng từ lần trước";color:var(--ok,#1e7a38);font-size:.8rem;font-weight:700}`;
document.head.appendChild(st);

/* =================== 1. ĐỀ 50 CÂU =================== */
const XK=n=>"tbx"+n;
const _paneExam=paneExam,_examView=examView,_finish=finish;
paneExam=function(){_paneExam();const x=J(XK(N),null);if(!x||x.pass)return;
 QS=allQ();const wrong=QS.filter(q=>x.ans[q.id]!==q.q.a).length,go=$("#go");if(!go)return;
 const card=document.createElement("div");card.className="note llbox";card.style.marginTop=".8rem";
 card.innerHTML=`🔁 <b>Lần ${x.lan} em được ${x.sc}/50, chưa đạt</b> (cần 40/50). Em làm lại <b>${wrong} câu sai</b>, câu đúng giữ nguyên.${x.lan>1?` <span class="muted">(lần 1: ${x.s1}/50)</span>`:""}<div class="row-flex" style="margin-top:.6rem"><button class="btn" id="llgo">🔁 Làm lại ${wrong} câu sai (lần ${x.lan+1})</button></div><p class="muted" style="margin:.4rem 0 0">Đạt 40/50 rồi em mới làm lại cả đề và xem đáp án.</p>`;
 go.closest(".row-flex").after(card);go.style.display="none";
 $("#llgo").onclick=()=>{const nm=($("#nm").value||"").trim()||x.name||"";if(!nm){$("#nmw").textContent="Em điền họ tên trước nhé.";return}store.set("tb_name",nm);
  const keep={};QS.forEach(q=>{if(x.ans[q.id]===q.q.a)keep[q.id]=q.q.a});
  Object.assign(EX,{on:true,name:nm,mode:"lai",redo:x.lan+1,ans:keep,played:{},t0:Date.now(),sec:QS.some(q=>q.sk=="L"&&keep[q.id]==null)?"L":"R",warned:0});examView()}};
examView=function(){_examView();if(!EX.redo)return;
 $$(".eq").forEach(e=>{const id=e.dataset.id;if(EX.ans[id]!=null){e.classList.add("lldone");$$(".opt",e).forEach(b=>b.classList.toggle("sel",+b.dataset.j===EX.ans[id]))}});
 $$(".grp").forEach(g=>{if(!g.querySelector(".eq:not(.lldone)"))g.style.display="none"});
 const tmE=$("#tm");if(tmE)tmE.textContent="Làm lại · lần "+EX.redo;
 const h=document.createElement("div");h.className="note llbox";h.innerHTML=`🔁 Em đang <b>làm lại lần ${EX.redo}</b>: chỉ hiện các đoạn có câu em sai. Câu đúng đã khóa. Đoạn nghe được nghe lại. Làm xong bấm <b>Nộp bài</b>.`;
 const head=$(".exam-head");if(head)head.after(h)};
finish=function(auto){const redo=EX.redo||0;
 /* điểm của lần này (trước khi hiện kết quả) */
 const sc=QS.filter(x=>EX.ans[x.id]===x.q.a).length,old=J(XK(N),null),pass=sc>=40;
 let x;if(redo&&old){x=old;x.lan=redo;x.ans=Object.assign({},EX.ans);x.sc=sc;x.pass=pass}
 else x={lan:1,ans:Object.assign({},EX.ans),s1:sc,sc,pass,name:EX.name};
 if(!redo&&old&&old.pass){x.s1=sc}
 P(XK(N),x);
 /* TT.exam được gọi trong finish gốc: thêm thông tin lần làm */
 const _ex=TT.exam;TT.exam=(n,o)=>{o.lan=x.lan;o.s1=x.s1;if(redo)o.mode="lai";return _ex(n,o)};
 try{_finish(auto)}finally{TT.exam=_ex}
 EX.redo=0;
 const p=$("#pane");if(!p)return;
 if(x.lan>1){const m=p.querySelector(".muted");if(m)m.insertAdjacentHTML("beforeend",` · <b>lần ${x.lan}</b> (lần 1: ${x.s1}/50)`)}
 const again=$("#again"),onl=$("#onlyx");
 if(!pass){
  const wrong=QS.filter(q=>x.ans[q.id]!==q.q.a).length;
  again.textContent=`🔁 Làm lại ${wrong} câu sai (lần ${x.lan+1})`;again.onclick=()=>{EX.on=false;paneExam();setTimeout(()=>{const b=$("#llgo");if(b)b.click()},30)};
  const hide=()=>{$$("#rvl .rv.x").forEach(r=>{[...r.children].forEach(c=>{if(/Đáp án:|💡/.test(c.textContent))c.remove()});if(!r.querySelector(".lllock"))r.insertAdjacentHTML("beforeend",`<div class="lllock">🔒 Đáp án và giải thích mở khi em <b>đạt 40/50</b>. Em làm lại câu này trước nhé.</div>`)})};
  hide();if(onl)onl.addEventListener("change",()=>setTimeout(hide,0));
  const box=document.createElement("section");box.className="card llbox";box.innerHTML=`<p style="margin:0">🔁 <b>Chưa đạt</b>: em làm lại <b>${wrong} câu sai</b> (câu đúng giữ nguyên) cho đến khi đạt 40/50. Lời đoạn nghe vẫn xem được để em nghe kỹ hơn.</p>`;
  p.firstElementChild.after(box)}
 else if(x.lan>1){const box=document.createElement("section");box.className="card llbox";box.innerHTML=`<p style="margin:0">🎉 <b>Đạt</b> sau ${x.lan} lần làm (lần 1: ${x.s1}/50). Giờ em xem đáp án, giải thích, và làm lại cả đề nếu muốn.</p>`;p.firstElementChild.after(box)}};

/* =================== 2. DỊCH VIỆT → TRUNG (cô chấm) =================== */
const RK=n=>"ct_tdn_"+LV+"_"+n,DK=n=>"ct_tdd_"+LV+"_"+n;
const OK={};   /* đáp án cô đã chấm: bài → {k|key: {g,nx}} */
const me=()=>TT.me&&TT.me();
function items(b){const G=b!=null?D.L[b]:C,o=[];let n=0;G.grammar.forEach((g,i)=>g.bt2.forEach((q,k)=>o.push({k:"t"+(n++),gi:i,qi:k,de:q[0],ref:q[1],rp:q[2],src:q[3],gt:g.t})));return o}
const keyOf=v=>nz(v);
const okIt=x=>x&&(x.st=="ok"||+x.g>=1);
function stat(rec,its){const by={};(rec&&rec.it||[]).forEach(x=>by[x.k]=x);
 const wt=its.some(i=>by[i.k]&&by[i.k].st=="cho"),bo=its.filter(i=>!by[i.k]||by[i.k].st=="bo").length,sum=its.reduce((a,i)=>a+(by[i.k]&&by[i.k].st!="cho"&&by[i.k].st!="bo"?(by[i.k].st=="ok"?1:+by[i.k].g||0):0),0);
 const pct=its.length?Math.round(sum/its.length*100):0,graded=!!rec&&!wt&&!bo;
 return {by,wt,bo,pct,graded,pass:graded&&pct>=80}}
/* câu nào em được (phải) làm lúc này */
function open(i,S){const x=S.by[i.k];if(!x||x.st=="bo")return true;if(S.wt)return false;return !S.pass&&!okIt(x)&&S.graded}
async function loadOk(){if(OK[N]||!me())return;OK[N]={};try{const r=await TT.post({a:"vdung",lv:LV,b:N});if(r&&r.ok)(r.ds||[]).forEach(x=>OK[N][x.k+"|"+x.key]={g:+x.g,nx:x.nx||""})}catch(e){}}
const learn=(k,v)=>(OK[N]||{})[k+"|"+keyOf(v)];

const _paneGrammar=paneGrammar;
paneGrammar=function(){_paneGrammar();if(!me()){gGuest();return}loadOk().then(()=>{});draw();poll(false)};
function gGuest(){const p=$("#pane");const b=p.querySelector(".gnav");if(b)b.insertAdjacentHTML("afterend",`<div class="note">🔑 Học viên lớp cô Thảo <a onclick="TT.open()" style="cursor:pointer;text-decoration:underline">nhập mã học viên</a> để làm phần <b>Dịch Việt → Trung</b> và nộp cho cô chấm.</div>`)}
function draw(){const p=$("#pane");if(!p)return;const its=items(),rec=J(RK(N),null),S=stat(rec,its),dr=J(DK(N),{});const lan=rec?(rec.lan||1):0;
 /* gỡ đáp án câu dịch khi chưa đạt (cả nút "Hiện tất cả đáp án" cũng không mở được) */
 its.forEach(i=>{const sec=document.getElementById("gp"+i.gi);if(!sec)return;const bt=sec.querySelectorAll(".bt")[1];if(!bt)return;const q=bt.querySelectorAll(".bq")[i.qi];if(!q)return;
  const x=S.by[i.k],o=open(i,S),showAns=S.pass||okIt(x);
  const ans=q.querySelector(".ans"),rb=q.querySelector(".rv1");
  if(!showAns){if(ans)ans.remove();if(rb)rb.remove()}
  else if(rb&&!o){/* đã đúng / đã đạt: giữ nút xem đáp án */}
  let h="";
  if(o){const old=x&&x.st!="bo"?x:null,v=dr[i.k]!=null?dr[i.k]:(old?old.v:"");
   h+=old?`<div class="llold">↩ <b>Lần trước</b> em viết: <span class="zh">${esc(old.v)}</span> <span class="llb ${+old.g>0?"mid":"no"}">${gradeL(old.g)}</span>${old.nx&&!/chấp nhận/.test(old.nx)?`<br>💬 Cô nhận xét: <span class="llnx">${esc(old.nx)}</span>`:""}<br><span class="muted">Em sửa lại theo nhận xét. Đáp án mở khi em đạt bài.</span></div>`:"";
   const L=dr["_h"+i.k];
   h+=`<input class="inp llin zh" data-k="${i.k}" value="${esc(v)}" placeholder="Gõ câu tiếng Trung (chữ phồn thể hoặc giản thể)" autocomplete="off" autocapitalize="off">${L?`<div class="llold">${L}</div>`:""}`}
  else if(x){h+=`<div class="llrow"><span class="muted">Bài em${x.lan>1?` (lần ${x.lan})`:""}:</span> <span class="zh">${esc(x.v)}</span> ${x.st=="cho"?`<span class="llb wt">⏳ Chờ cô chấm</span>`:okIt(x)?`<span class="llb ok">✓ ${x.st=="ok"?(/chấp nhận/.test(x.nx||"")?"Đúng (cô đã chấp nhận)":"Đúng · máy chấm"):"Cô chấm đúng"}</span>`:`<span class="llb ${+x.g>0?"mid":"no"}">${gradeL(x.g)} Cô chấm</span>`}</div>${x.nx&&!/chấp nhận/.test(x.nx)?`<div class="llnx">💬 Cô nhận xét: ${esc(x.nx)}</div>`:""}${!showAns&&x.st!="cho"?`<div class="lllock">🔒 Đáp án mở khi em đạt bài.</div>`:""}`}
  const box=document.createElement("div");box.className="llq";box.innerHTML=h;q.querySelector(".qq").after(box)});
 $$(".llin",p).forEach(e=>e.oninput=()=>{const d=J(DK(N),{});d[e.dataset.k]=e.value;delete d["_h"+e.dataset.k];P(DK(N),d)});
 /* khung tóm tắt + nộp (cuối trang và đầu trang) */
 const nOpen=its.filter(i=>open(i,S)).length,redo=S.graded&&!S.pass,nextLan=redo?lan+1:(lan||1);
 const sum=rec?`<p style="margin:.2rem 0">📤 Đã nộp: ${(rec.parts||[]).map((x,i)=>(i?(x.lan>1?` · lần ${x.lan} `:" · nộp tiếp "):"")+tm(x.at)).join("")}</p>
${S.wt?`<p>⏳ Còn <b>${its.filter(i=>S.by[i.k]&&S.by[i.k].st=="cho").length} câu</b> chờ cô chấm. Điểm tự cập nhật khi cô chấm xong.</p>`:""}
${S.graded?`<p>${S.pass?`✅ <b>Đạt</b>`:`🔁 <b>Chưa đạt</b>`} phần Dịch: <b>${S.pct}%</b>${lan>1&&rec.g1!=null?` <span class="muted">(làm ${lan} lần, lần 1: ${rec.g1}%)</span>`:""}. ${S.pass?"Em xem đáp án tham khảo ở từng câu.":`Cần từ 80%. Em sửa <b>${nOpen} câu</b> chưa đúng (đã mở sẵn bên dưới) rồi nộp lần ${nextLan}.`}</p>`:S.bo&&!S.wt?`<p>Em còn <b>${S.bo} câu</b> chưa làm.</p>`:""}
<div class="llrow"><button class="btn o s" id="llpoll">↻ Xem cô đã chấm chưa</button></div>`:"";
 const nop=nOpen?`<div class="llrow" style="margin-top:.5rem"><button class="btn" id="llnop">📤 ${redo?`Nộp lần ${nextLan} cho cô`:rec?"Nộp tiếp cho cô":"Nộp phần Dịch cho cô"}</button><span class="muted" id="llw"></span></div>`:"";
 const top=document.createElement("section");top.className="card llbox";top.id="lltop";
 top.innerHTML=`<h3 style="margin-top:0">🌐 Dịch Việt → Trung · nộp cho cô chấm</h3>${rec?"":`<p>Mỗi điểm ngữ pháp có phần <b>Luyện nhanh 2</b>. Em gõ câu tiếng Trung vào ô dưới từng câu, làm xong bấm <b>Nộp phần Dịch cho cô</b> ở cuối trang. Câu trùng đáp án máy chấm luôn, câu khác cô chấm. Chưa đạt 80% thì em sửa câu sai và nộp lại đến khi đạt.</p>`}${sum}`;
 const nav=p.querySelector(".gnav");if(nav)nav.after(top);
 const bot=document.createElement("section");bot.className="card llbox";bot.id="llbot";bot.innerHTML=`<p style="margin:.2rem 0">Đã gõ <b>${its.filter(i=>open(i,S)&&nz(J(DK(N),{})[i.k]!=null?J(DK(N),{})[i.k]:"")).length}/${nOpen}</b> câu cần làm.</p>${nop}`;
 if(nOpen)p.appendChild(bot);
 $$(".llin",p).forEach(e=>e.addEventListener("input",()=>{const b=$("#llbot p");if(b){const d=J(DK(N),{});b.innerHTML=`Đã gõ <b>${its.filter(i=>open(i,S)&&nz(d[i.k]!=null?d[i.k]:"")).length}/${nOpen}</b> câu cần làm.`}}));
 const pb=$("#llpoll");if(pb)pb.onclick=()=>poll(true);
 const nb=$("#llnop");if(nb)nb.onclick=()=>nopGo(its,rec,S,redo?nextLan:(lan||1),nb)}
async function nopGo(its,rec,S,lan,btn){const d=J(DK(N),{}),todo=its.filter(i=>open(i,S));
 const ch=todo.filter(i=>{const v=d[i.k]!=null?d[i.k]:(S.by[i.k]&&S.by[i.k].st!="bo"?S.by[i.k].v:"");const o=S.by[i.k];return nz(v)&&!(o&&o.st!="bo"&&keyOf(v)==o.key)});
 const w=$("#llw");if(!ch.length){w.innerHTML=S.graded&&!S.pass?"Em chưa sửa câu nào.":"Em gõ ít nhất một câu rồi nộp nhé.";return}
 if(!btn.dataset.ok){btn.dataset.ok=1;const left=todo.length-ch.length;w.innerHTML=`Nộp <b>${ch.length} câu</b>${left?`, còn ${left} câu ${S.graded?"chưa sửa":"chưa làm"} (lần sau em vẫn nộp được)`:""}. Bấm lần nữa để nộp.`;return}
 await loadOk();
 const sid=(lan>1?"R"+lan+"-":"N")+uid(),now=Date.now();
 rec=rec||{lv:LV,olv:LV,b:N,ten:C.meta&&C.meta.title||(D.lessons.find(x=>x[0]==N)||[])[1]||"",it:[],parts:[],lan:1};
 if(lan>(rec.lan||1)){if(rec.g1==null)rec.g1=S.pct;rec.lan=lan}
 const send=[];
 ch.forEach(i=>{const v=String(d[i.k]!=null?d[i.k]:"").trim(),key=keyOf(v),L=learn(i.k,v),hit=key==nz(i.ref)||(L&&L.g>=1);
  const x={k:i.k,d:"tr",de:i.de,ref:i.ref,rp:i.rp,img:"",v,key,st:hit?"ok":"cho",g:hit?1:null,nx:L&&L.g>=1&&key!=nz(i.ref)?"Cô đã chấp nhận cách viết này":"",sid,lan};
  const o=rec.it.find(y=>y.k==i.k);if(o){if(o.st!="bo")(rec.hist=rec.hist||[]).push({k:o.k,v:o.v,g:o.g,nx:o.nx||"",lan:o.lan||1});Object.assign(o,x)}else rec.it.push(x);send.push(x);delete d[i.k]});
 rec.parts.push({sid,at:now,sent:false,lan});P(RK(N),rec);P(DK(N),d);
 await up(rec);fin(rec);paneGrammar()}
async function up(rec){if(!me())return;for(const p of rec.parts.filter(p=>!p.sent)){const its=rec.it.filter(x=>x.sid==p.sid);
 try{const r=await TT.post({a:"vnop",code:me().code,sid:p.sid,lv:LV,b:rec.b,ten:rec.ten,so:{ok:0,n:0,all:0},it:its.map(x=>({k:x.k,d:"tr",de:x.de,ref:x.ref,rp:x.rp,img:"",v:x.v,key:x.key,st:x.st}))});
  if(r&&r.ok&&r.v){p.sent=true;(r.it||[]).forEach(s=>{const x=its.find(y=>y.k==s.k);if(x&&x.st!="ok"){x.st=s.st;x.g=s.g;x.nx=s.nx||x.nx}});
   TT.ev({t:p.lan>1?`Làm lại phần Dịch (lần ${p.lan})`:"Nộp phần Dịch",lv:LV,b:rec.b,s:`gửi ${its.length} câu · chờ cô ${its.filter(x=>x.st=="cho").length}`})}}catch(e){}}
 P(RK(rec.b),rec)}
/* kết quả cuối mỗi lần → tiến trình (gp) + Sổ theo dõi */
function fin(rec){const S=stat(rec,items(rec.b));if(!S.graded)return;
 if(rec.g1==null&&(rec.lan||1)==1){rec.g1=S.pct}
 const lan=rec.lan||1;TT.save(rec.b,r=>{r.gp=S.pct;if(lan>1){r.gpl=lan;r.gp1=rec.g1}});
 if(rec.evf!=lan){rec.evf=lan;TT.ev({t:"Kết quả Ngữ pháp",lv:LV,b:rec.b,s:`Dịch ${S.pct}% · ${S.pass?"Đạt":"Chưa đạt"}${lan>1?` · làm ${lan} lần (lần 1: ${rec.g1}%)`:""}`});TT.flush()}
 P(RK(rec.b),rec)}
async function poll(force){if(!me())return;
 try{if(!force&&Date.now()-(+sessionStorage.getItem("ct_tdp")||0)<3e5)return;sessionStorage.setItem("ct_tdp",Date.now())}catch(e){}
 const recs=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^ct_tdn_7_\d+$/.test(k)){const r=J(k,null);if(r)recs.push(r)}}
 for(const r of recs.filter(r=>r.parts.some(p=>!p.sent)))await up(r);
 const wait=recs.filter(r=>r.it.some(x=>x.st=="cho"));if(!wait.length){if(force)paneGrammar();return}
 let res;try{res=await TT.post({a:"vkq",code:me().code,sids:[].concat(...wait.map(r=>r.parts.filter(p=>p.sent).map(p=>p.sid)))})}catch(e){return}if(!res||!res.ok)return;
 const nw=[];wait.forEach(rec=>{let c=0;Object.keys(res.kq||{}).forEach(sid=>(res.kq[sid]||[]).forEach(s=>{const x=rec.it.find(y=>y.k==s.k&&y.sid==sid);
  if(x&&x.st=="cho"&&s.st!="cho"){x.st=s.st;x.g=s.g;x.nx=s.nx||"";c++;if(+s.g<1)TT.err(rec.b,"Ngữ pháp · Dịch",x.de,x.v,x.ref+(x.nx?" ("+x.nx+")":""))}}));
  if(c){P(RK(rec.b),rec);fin(rec);nw.push(rec)}});
 if(nw.length||force){if(/ngu-phap/.test(location.hash))paneGrammar();if(nw.length)note(`🎉 Cô đã chấm phần Dịch: ${nw.map(r=>"Bài "+r.b).join(", ")}. Em mở ③ Ngữ pháp của bài để xem nhận xét.`)}}
function note(m){const d=document.createElement("div");d.className="modal";d.onclick=e=>{if(e.target===d)d.remove()};d.innerHTML=`<div class="box"><p>${m}</p><div class="row-flex"><button class="btn">OK</button></div></div>`;document.body.appendChild(d);d.querySelector("button").onclick=()=>d.remove()}
setTimeout(()=>poll(false),4000);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState=="visible")poll(false)});
/* vẽ lại trang đang mở bằng bản có chế độ làm lại */
if(/ngu-phap|luyen-de/.test(location.hash))route();
})();
