/* ===== Ngữ pháp HSK1 dạng mới (03/11/2026, theo bảng lỗi sai cô Thảo điền) =====
   Mỗi điểm ngữ pháp: Lý thuyết 5 khối (Công dụng · Công thức ✔ ✘ ? · Nhớ nhanh · Lỗi hay gặp · Xem thêm)
   → bấm "Em đã đọc xong" (hoặc "Bỏ qua, em đã biết") → Bậc 1 Drill → Bậc 2 Sắp xếp → Bậc 3 Tạo câu.
   Dữ liệu: data/hsk1/npNN.js khai LD1[n].np (sinh từ bản nguồn, có pinyin) + GXD["1-n"] (so/tr có g = số thứ tự điểm).
   Sắp xếp, Tạo câu dùng chung máy chấm + "Nộp bài cho cô" của js/cham.js (câu khác đáp án → cô chấm).
   Bài không có L.np vẫn dùng vGp cũ. Nạp SAU js/cham.js. ===== */
(function(){
const NPL={chon:"Chọn từ đúng điền vào chỗ trống",dung:"Chọn câu tiếng Trung đúng",phu:"Chọn câu phủ định đúng",hoi:"Chọn câu hỏi đúng",tl:"Chọn câu trả lời đúng",nghe:"Nghe và chọn đáp án đúng",chen:"Chạm vào chỗ đặt từ cho đúng",ki:"Chọn đáp án đúng"};
const FL={k:"✔ Khẳng định",p:"✘ Phủ định",h:"? Câu hỏi",t:"↳ Trả lời",c:"• Cấu trúc"};
let NP=null;
const npK=()=>"ct_np_"+olLv+"_"+cur;
function npLoad(){if(NP&&NP.k==npK())return NP;let o={};try{o=JSON.parse(localStorage.getItem(npK())||"{}")}catch(e){}NP={k:npK(),o:o.o||{},d:o.d||{}};return NP}
function npPut(){try{localStorage.setItem(NP.k,JSON.stringify({o:NP.o,d:NP.d}))}catch(e){}}
/* bài nộp theo dạng cũ (đã gửi xong) thì bỏ khỏi máy để em làm dạng mới */
function npMig(){const f="ct_npv_"+olLv+"_"+cur;try{if(localStorage.getItem(f))return;const k="ct_gxn_"+(typeof chLv=="function"?chLv():olLv)+"_"+cur,r=JSON.parse(localStorage.getItem(k)||"null");
 if(r&&!r.np){const ps=r.parts||[{sent:r.sent}];if(ps.every(p=>p.sent))localStorage.removeItem(k)}localStorage.setItem(f,"1")}catch(e){}}
const zp=(h,p)=>Z(h,p);
function npTheory(P){let h="";
 if(P.cd)h+=`<div class="npcd"><b>🎯 Công dụng · Dùng khi nào?</b><p>${P.cd}</p></div>`;
 if(P.f&&P.f.length)h+=`<div class="npsec">📐 Công thức</div><div class="npfs">${P.f.map(r=>`<div class="npfr"><div class="gfr"><span class="gfl ${r[0]}">${FL[r[0]]}</span><span class="fm">${r[1]}</span></div>${r[2]?`<div class="npex">${zp(r[2],r[3])} ${bS(r[2])}${r[4]?`<span class="vi">${r[4]}</span>`:""}</div>`:""}</div>`).join("")}</div>`;
 if(P.m)h+=`<div class="gn"><p>💡 <b>Nhớ nhanh:</b> ${P.m}</p></div>`;
 if(P.w&&P.w.length)h+=`<div class="gw"><b>⚠️ Lỗi hay gặp</b>${P.w.map(w=>`<div class="npw"><div class="npwx">✗ ${zp(w[0],w[1])}</div><div class="npwo">✔ ${zp(w[2],w[3])} ${bS(w[2])}</div>${w[4]?`<div class="vi">${w[4]}</div>`:""}</div>`).join("")}</div>`;
 if(P.x&&P.x.length)h+=`<details class="npx"><summary>📚 Xem thêm</summary>${P.x.map(x=>`<p>${x}</p>`).join("")}</details>`;
 return `<div class="gpb">${h}</div>`}
const npFm=P=>P.f&&P.f.length?`<div class="npmini"><b>Nhắc công thức:</b>${P.f.map(r=>`<div><span class="gfl ${r[0]}">${FL[r[0]]}</span> ${r[1]}</div>`).join("")}</div>`:"";
/* ---------- Bậc 1 · Drill ---------- */
function npDr(i,j,D){const s=NP.d[i+"-"+j],L=NPL[D.t]||NPL.ki;let h=`<div class="card q npq ${s?(s.ok?"ok":"no"):""}"><b>Câu ${j+1}.</b> <span class="npl">${D.l||L}</span>`;
 if(D.vi)h+=`<div class="npvi">🇻🇳 ${D.vi}</div>`;
 if(D.t=="nghe")h+=`<div class="npq0">${bS(D.s,"🔊 Nghe")}${D.q?` <span class="zh hd">${D.q}</span>`:""}</div>`;
 else if(D.q)h+=`<div class="npq0">${zp(D.q,D.qp)}</div>`;
 if(D.t=="chen"){h+=`<div class="npw0">Từ cần đặt: <span class="zh hd">${D.w}</span>${D.wp?` <small class="opy">${D.wp}</small>`:""}</div><div class="npchen">`;
  D.tk.forEach((t,g)=>{h+=npGap(i,j,g,D,s)+`<span class="nptk">${zp(t[0],t[1])}</span>`});h+=npGap(i,j,D.tk.length,D,s)+`</div>`}
 else h+=`<div class="npo">${D.o.map((o,x)=>{const c=s?(x==D.a?"ok":x==s.p?"no":"dim"):"";return `<button class="npop ${c}" ${s?"disabled":`onclick="npPick(${i},${j},${x})"`}>${D.op&&D.op[x]?zp(o,D.op[x]):`<span class="${hasHan(o)?"zh":""}">${o}</span>`}</button>`}).join("")}</div>`;
 if(s){h+=s.ok?`<div class="okt">✓ Đúng rồi!</div>`:`<div class="bad">✗ Chưa đúng.</div>`;
  if(D.r)h+=`<div class="ans">${zp(D.r[0],D.r[1])} ${bS(D.r[0])}</div>`;
  if(D.e)h+=`<div class="npe">💡 ${D.e}</div>`}
 return h+`</div>`}
function npGap(i,j,g,D,s){const ok=D.a.includes(g),c=s?(ok&&g==D.a[0]?"ok":g==s.p&&!s.ok?"no":"dim"):"";
 return `<button class="npgap ${c}" ${s?"disabled":`onclick="npPick(${i},${j},${g})"`} aria-label="Đặt ${D.w} vào đây">${s&&ok&&g==D.a[0]?D.w:s&&g==s.p&&!s.ok?D.w:"＋"}</button>`}
window.npPick=function(i,j,x){const L=LD[cur],D=L.np[i].d[j];if(NP.d[i+"-"+j])return;
 const ok=D.t=="chen"?D.a.includes(x):x==D.a;NP.d[i+"-"+j]={p:x,ok};npPut();npScore(L);
 if(!ok&&typeof trkErr=="function"){try{const q=(D.vi?D.vi+" · ":"")+(D.q||D.s||(D.tk?D.tk.map(t=>t[0]).join(""):""))+(D.w?" ["+D.w+"]":""),
  a=D.t=="chen"?"Đặt ở vị trí "+(x+1):D.o[x],c=D.t=="chen"?D.r[0]:D.o[D.a];trkErr("Ngữ pháp · Drill",q,a,c)}catch(e){}}
 rr()};
window.npRedo=function(i){Object.keys(NP.d).forEach(k=>{if(k.split("-")[0]==i)delete NP.d[k]});npPut();rr()};
function npScore(L){let n=0,ok=0,all=0;L.np.forEach((P,i)=>(P.d||[]).forEach((D,j)=>{all++;const s=NP.d[i+"-"+j];if(s){n++;if(s.ok)ok++}}));
 if(all&&n==all){const r=ldN(cur);r.gpd=Math.round(ok/all*100);svN(cur,r)}}
window.npOpen=function(i,m){NP.o[i]=m;npPut();rr();setTimeout(()=>{const e=document.getElementById("npx"+i);if(e)e.scrollIntoView({behavior:"smooth",block:"start"})},60)};
window.npGo=function(i){const e=document.getElementById("np"+i);if(e)e.scrollIntoView({behavior:"smooth",block:"start"})};
/* ---------- Bậc 2 · Sắp xếp (cùng dữ liệu GXD.so, cùng hàm chấm gxSoCheck) ---------- */
function npSo(k,n){const it=GXD[GX.k].so[k],s=GX.so[k],ok=s.st===true,bad=s.st===false;
 if(s.sub)return `<div class="card chsub"><b>Câu ${n}.</b> <span class="chwt">📤 Đã nộp lần trước.</span></div>`;
 return `<div class="card q ${ok?"ok":bad?"no":""}"><b>Câu ${n}.</b>${it.vi?` <span class="vi">${it.vi}</span>`:""}<div class="slots">${s.ch.map((i,j)=>gxTok(it.t[i],ok?"disabled":`onclick="gxMv(${k},'c',${j})"`)).join("")}</div><div class="bank">${s.pool.map((i,j)=>gxTok(it.t[i],`onclick="gxMv(${k},'p',${j})"`)).join("")}</div>
${ok?`<div class="okt">✓ Đúng rồi!</div><div class="zh hd">${it.f}</div><div class="py" style="color:var(--m)">${it.p}</div>`:bad?`<div class="bad">✗ Chưa đúng. ${it.e||""}</div>`:""}
<div class="row">${ok?"":`<button class="btn sm" onclick="gxSoCheck(${k})">Kiểm tra</button>`}${bad?`<button class="btn o sm" onclick="gxSoReset(${k})">↻ Làm lại câu này</button><button class="btn o sm" onclick="GX.so[${k}].show=!GX.so[${k}].show;rr()">${s.show?"Ẩn":"Xem"} đáp án</button>`:""}</div>
${bad&&s.show?`<div class="ans"><span class="zh hd">${it.f}</span><br><span class="py">${it.p}</span></div>`:""}</div>`}
/* ---------- một điểm ngữ pháp ---------- */
function npPoint(L,i,done){const P=L.np[i],st=NP.o[i],d=GXD[GX.k],so=[],tr=[];
 d.so.forEach((x,k)=>{if(x.g===i)so.push(k)});d.tr.forEach((x,k)=>{if(x.g===i)tr.push(k)});
 const nD=(P.d||[]).length,hasEx=nD||so.length||tr.length;
 let h=`<div class="card npt" id="np${i}"><div class="nphd"><span class="npn">Điểm ${i+1}/${L.np.length}</span><h4>${P.h}</h4></div>`;
 if(!st){h+=npTheory(P)+`<div class="npgate">${hasEx?`<p class="ctx">Em đọc kỹ lý thuyết (bấm 🔊 nghe câu ví dụ), rồi làm bài tập ngay bên dưới.</p>`:""}<div class="row c"><button class="btn" onclick="npOpen(${i},1)">✓ Em đã đọc xong${hasEx?" → Làm bài tập":""}</button>${hasEx?`<button class="btn o sm" onclick="npOpen(${i},2)">⏭ Bỏ qua lý thuyết (em đã biết)</button>`:""}</div></div></div>`;return h}
 h+=`<details class="npre"><summary>📖 ${st==2?"Xem lý thuyết":"Xem lại lý thuyết"}</summary>${npTheory(P)}</details></div>`;
 if(!hasEx)return h+`<p class="ctx npok">✓ Điểm này chỉ cần đọc hiểu, không có bài tập.</p>`;
 h+=`<div id="npx${i}"></div>`+npFm(P);
 if(nD){const dn=P.d.filter((_,j)=>NP.d[i+"-"+j]).length,ok=P.d.filter((_,j)=>(NP.d[i+"-"+j]||{}).ok).length;
  h+=`<div class="npb"><span>Bậc 1</span> Drill nhớ công thức <small>${dn}/${nD} câu</small></div>`+P.d.map((D,j)=>npDr(i,j,D)).join("");
  if(dn==nD)h+=`<div class="card nprs ${ok/nD>=0.8?"ok":"no"}">Drill: đúng <b>${ok}/${nD}</b> câu (tính lần chọn đầu tiên).${ok<nD?` Em xem lại lý thuyết rồi làm lại cho chắc nhé.`:" Giỏi lắm!"} <button class="btn o sm" onclick="npRedo(${i})">↻ Làm lại drill</button></div>`}
 if(so.length){h+=`<div class="npb"><span>Bậc 2</span> Sắp xếp thành câu <small>chạm từ theo đúng thứ tự</small></div>`;
  h+=done?`<div class="card note">📤 Phần này em đã nộp, kết quả ở cuối trang.</div>`:so.map((k,n)=>npSo(k,n+1)).join("")}
 if(tr.length){h+=`<div class="npb"><span>Bậc 3</span> Tạo câu <small>gõ chữ Hán hoặc pinyin không dấu</small></div>`;
  h+=done?`<div class="card note">📤 Phần này em đã nộp, kết quả ở cuối trang.</div>`:tr.map((k,n)=>chItem("tr",d.tr[k],k).replace(/<b>\d+\.<\/b>/,`<b>Câu ${n+1}.</b>`)).join("")}
 if(i<L.np.length-1)h+=`<div class="row c npnx"><button class="btn o sm" onclick="npGo(${i+1})">Sang điểm ${i+2}: ${String(L.np[i+1].h).replace(/<[^>]+>/g,"")} ↓</button></div>`;
 return h}
function npHtml(L){npMig();npLoad();
 if(!GX||GX.k!=gxKey())gxInit();chPrep();
 const rec=chRec(),done=!!(rec&&chMe()&&!GX.prac&&!GX.cont);
 if(CHWAIT&&chMe()){CHWAIT=false;setTimeout(chNop,300)}
 const d=GXD[GX.k];let h=`<div class="card note npintro">📐 Mỗi điểm ngữ pháp học theo 4 bước: <b>đọc lý thuyết</b> → <b>Bậc 1 Drill</b> (chọn đáp án) → <b>Bậc 2 Sắp xếp</b> → <b>Bậc 3 Tạo câu</b>. Bạn nào đã nắm chắc có thể bấm <b>Bỏ qua lý thuyết</b>.</div>`;
 if(GX.cont)h+=`<div class="card note">➕ Em đang <b>làm tiếp phần chưa làm</b>. Câu đã nộp được khóa lại. Làm xong bấm <b>Nộp tiếp</b> ở cuối. <button class="btn o sm" onclick="GX=null;rr()">← Xem bài đã nộp</button></div>`;
 else if(GX.prac)h+=`<div class="card note">↻ Em đang <b>luyện lại</b>, không tính điểm, không gửi cô. <button class="btn o sm" onclick="GX=null;rr()">← Xem bài đã nộp</button></div>`;
 else if(!done&&!chMe()&&typeof trkOn=="function"&&trkOn())h+=`<div class="card trkban"><span>🔑 Học viên lớp cô Thảo nhập <b>mã học viên</b> để nộp bài, cô chấm các câu Tạo câu máy chưa chấm được.</span><button class="btn sm" onclick="trkOpen()">Nhập mã</button></div>`;
 h+=`<div class="nptoc">${L.np.map((P,i)=>{const nD=(P.d||[]).length,dn=(P.d||[]).filter((_,j)=>NP.d[i+"-"+j]).length;return `<button class="${NP.o[i]?(nD&&dn<nD?"half":"on"):""}" onclick="npGo(${i})">${NP.o[i]&&(!nD||dn==nD)?"✓ ":""}${i+1}. ${String(P.h).replace(/<[^>]+>/g,"")}</button>`}).join("")}</div>`;
 h+=L.np.map((P,i)=>npPoint(L,i,done)).join("");
 if(!done&&d.pc&&d.pc.length){h+=`<div class="npb npbx"><span>Thử thách</span> Miêu tả tranh</div><div class="card note">Xem tranh, đọc yêu cầu rồi viết câu bằng <b>chữ Hán</b> hoặc <b>pinyin không dấu</b>. Cô chấm: đúng nội dung tranh + dùng đúng cấu trúc.</div>`;h+=d.pc.map((it,k)=>chItem("pc",it,k)).join("")}
 if(done)return h+`<div class="npb npbx"><span>Kết quả</span> Bài em đã nộp (Sắp xếp + Tạo câu)</div>`+chDone(rec).replace(/Dịch Việt → Trung/g,"Tạo câu").replace(/<b>Dịch (\d+)\.<\/b>/g,"<b>Tạo câu $1.</b>");
 const all=GX.so.length+GX.tr.length+GX.pc.length,dn=GX.so.filter(s=>s.first!=null).length+GX.tr.concat(GX.pc).filter(chHas).length;
 if(chOn())h+=`<div class="card res chnop"><p>Phần Sắp xếp + Tạo câu: đã làm <b>${dn}/${all}</b> câu.${dn<all?" Hết giờ thì em vẫn nộp được, phần chưa làm không tính điểm.":""}</p><div class="row c"><button class="btn" onclick="chNop()" ${chReady()?"":"disabled"}>📤 ${GX.cont?"Nộp tiếp cho cô":"Nộp bài cho cô"}</button></div></div>`;
 else{if(!GX.prac&&typeof trkOn=="function"&&trkOn())h+=`<div class="card res chnop"><p>Phần Sắp xếp + Tạo câu: đã làm <b>${dn}/${all}</b> câu. Máy chỉ chấm được câu trùng đáp án; câu em viết khác, <b>cô sẽ chấm</b> khi em nộp bài.</p><div class="row c"><button class="btn" onclick="chNop()" ${chReady()?"":"disabled"}>📤 Nộp bài cho cô</button></div><small class="ctx">Cần <b>mã học viên</b> cô Thảo đã gửi. Bấm nộp, nhập mã, bài em làm vẫn giữ nguyên.</small></div>`;
  const nS=GX.so.filter(s=>s.first!=null).length,nT=GX.tr.filter(t=>t.st=="ok"||t.st=="ref").length,tot=GX.so.length+GX.tr.length;
  if(tot&&nS+nT==tot){const ok=GX.so.filter(s=>s.first).length+GX.tr.filter(t=>t.st=="ok").length,pct=Math.round(ok/tot*100);
   h+=`<div class="card res"><div class="big ${pct>=80?"ok":"no"}">${pct}%</div><p style="text-align:center">Máy chấm được ${ok}/${tot} câu (sắp xếp + tạo câu trùng đáp án).${GX.prac?" Bài luyện lại không tính điểm.":""}</p><div class="row c"><button class="btn o" onclick="const p=GX.prac;GX=null;gxInit();chPrep();GX.prac=p;rr()">↻ Làm lại toàn bộ</button>${nextBtn("gp")}</div></div>`}
  else h+=`<p class="ctx">Phần Sắp xếp + Tạo câu: đã làm ${nS+nT}/${tot} câu.</p><div class="row c">${nextBtn("gp")}</div>`}
 return h}
const _vGp=vGp;
vGp=function(L){return L&&L.np?npHtml(L):_vGp(L)};
})();
