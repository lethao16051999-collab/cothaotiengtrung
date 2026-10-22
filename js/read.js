/* ===== Luyện đọc bài khóa (HSK1, HSK2) · thêm 22/10/2026 =====
   Dưới phần Bài khóa: đọc từng câu của mọi bài khóa vào micro, máy so với câu gốc.
   Một câu đạt khi giống câu gốc từ 80% (RD_OK). Lưu điểm cao nhất mỗi câu ở r.rk["bàikhóa-câu"].
   Điểm phần (r.rd) = số câu đạt / tổng số câu, tính khi đã đọc đủ mọi câu; có trong Tổng kết và mục lục.
   Nạp SAU js/write.js. Dùng lại srListen, lcsMark, simi, np của js/app.js. ===== */
const RD_OK=80;let RDS=0,RDR={},RDON=null;
/* số Ả Rập → chữ Hán để so (máy nghe có thể ghi 11 hoặc 十一) */
function rdNum(n){n=+n;const d="零一二三四五六七八九";if(n<10)return d[n];if(n<20)return "十"+(n%10?d[n%10]:"");if(n<100)return d[Math.floor(n/10)]+"十"+(n%10?d[n%10]:"");
 if(n<1000){const r=n%100;return d[Math.floor(n/100)]+"百"+(r?(r<10?"零":"")+(r<20&&r>=10?"一"+rdNum(r):rdNum(r)):"")}return String(n).split("").map(c=>d[c]).join("")}
const rdN=s=>np(String(s).replace(/\d+/g,m=>rdNum(m)).replace(/两/g,"二"));
const rdAll=L=>(L.texts||[]).flatMap((x,i)=>x.l.map((y,j)=>({i,j,y})));
function rdScore(L,r){const all=rdAll(L),k=r.rk||{},ok=all.filter(o=>(k[o.i+"-"+o.j]||0)>=RD_OK).length,did=all.filter(o=>k[o.i+"-"+o.j]!=null).length;return{all:all.length,ok,did}}
function rdSave(key,m){const L=LD[cur],r=ldN(cur);r.rk=r.rk||{};r.rk[key]=Math.max(r.rk[key]||0,m);const s=rdScore(L,r);if(s.did>=s.all)r.rd=Math.round(s.ok/s.all*100);svN(cur,r)}
function rdRec(i,j){if(curRec){try{curRec.stop()}catch(e){}return}
 const key=i+"-"+j,tgt=LD[cur].texts[i].l[j][1];RDON=key;RDR[key]=srLiveHtml();rr();
 srListen(t=>{RDON=null;const m=simi(rdN(t),rdN(tgt)),ok=m>=RD_OK;
  RDR[key]=`<div>Máy nghe được: <span class="zh hd">${esc(t)}</span></div><div>So với câu gốc: <span class="zh hd">${lcsMark(tgt,t)}</span> <small>(chữ đỏ là chữ đọc thiếu hoặc sai)</small></div><div class="${ok?"okt":"bad"}">${ok?"✓ Đạt":"✗ Chưa đạt (cần từ "+RD_OK+"%), nghe mẫu rồi đọc lại nhé"} · giống câu gốc ${m}%</div>`;rdSave(key,m);rr()},
 k=>{RDON=null;RDR[key]=k=="deny"?`<span class="bad">Trang chưa được phép dùng micro. Hãy bấm cho phép micro rồi đọc lại.</span>`:`<span class="bad">Chưa nghe thấy gì, bấm 🎤 Đọc lại nhé.</span>`;rr()})}
function rdHtml(L,r){const T=L.texts||[];if(!T.length)return"";if(RDS>=T.length)RDS=0;
 const k=r.rk||{},s=rdScore(L,r),x=T[RDS],sp=w=>SPN[w]?SPN[w][1]:w;
 const okN=i=>T[i].l.filter((y,j)=>(k[i+"-"+j]||0)>=RD_OK).length;
 return `<div class="card rd" id="rdbox"><h3>🎙 Luyện đọc bài khóa</h3>
<p class="ctx">Đọc to từng câu rồi bấm <b>🎤 Đọc</b>, máy nghe và so với câu gốc. Câu nào giống từ <b>${RD_OK}%</b> trở lên mới tính đạt; chưa đạt thì bấm 🔊 nghe mẫu rồi đọc lại (máy giữ lần đọc tốt nhất). Muốn tự kiểm tra kỹ hơn, bỏ chọn ☐ Pinyin ở thanh Hiển thị để chỉ nhìn chữ Hán.</p>
${SRC&&!srBlocked?"":`<p class="warn">Trình duyệt này chưa dùng được chức năng máy nghe. Mở trang bằng Google Chrome hoặc Microsoft Edge và cho phép micro để luyện đọc.</p>`}
<div class="stb sit">${T.map((t,i)=>`<button class="${i==RDS?"on":""}" onclick="RDS=${i};rr();$('rdbox').scrollIntoView({block:'start'})">课文 ${i+1}<i class="sc ${okN(i)==t.l.length?"ok":"no"}">${okN(i)}/${t.l.length}</i></button>`).join("")}</div>
${x.l.map((y,j)=>{const key=RDS+"-"+j,v=k[key];return `<div class="rdl ${v==null?"":v>=RD_OK?"ok":"no"}">
<div class="rdw"><b>${j+1}</b><span class="zh">${y[0]}</span> <small>${sp(y[0])}</small>${v!=null?`<i class="sc ${v>=RD_OK?"ok":"no"}">${v}%</i>`:""}</div>
<div class="hz">${y[1]}</div><div class="py">${y[2]}</div>
<div class="row"><button class="btn sm mic ${RDON===key?"rec":""}" onclick="rdRec(${RDS},${j})">${RDON===key?"⏹ Đọc xong":"🎤 Đọc"}</button>${bS(y[1],"🔊 Nghe mẫu")}</div>
<div class="out">${RDR[key]||""}</div></div>`}).join("")}
<div class="row">${RDS<T.length-1?`<button class="btn" onclick="RDS++;rr();$('rdbox').scrollIntoView({block:'start'})">Bài khóa ${RDS+2} →</button>`:""}</div>
<p>${r.rd!=null?`Điểm luyện đọc: <b class="${r.rd>=80?"okt":"bad"}">${r.rd}%</b> (${s.ok}/${s.all} câu đạt)${r.rd<80?" · chưa đạt, đọc lại các câu màu đỏ nhé":" · ✓ Đạt"}`:`<span style="color:var(--sub)">Đã đọc ${s.did}/${s.all} câu, đạt ${s.ok} câu. Điểm được tính khi đã đọc đủ ${s.all} câu của ${T.length} bài khóa.</span>`}</p></div>`}

/* gắn vào phần Bài khóa (trước nút Tiếp) */
const _rdBk=vBk;vBk=function(L,r){const h=_rdBk(L,r),nb=nextBtn("bk"),x=rdHtml(L,r||ldN(cur));return nb&&h.endsWith(nb)?h.slice(0,-nb.length)+x+nb:h+x};
const _rdOpen=openL;openL=function(n){RDS=0;RDR={};RDON=null;_rdOpen(n)};
/* tính vào điểm trung bình, Tổng kết */
avgOf=function(r){const v=["rd","fc","gp","dt","ns"].map(k=>r[k]).filter(x=>x!=null);return v.length?Math.round(v.reduce((a,b)=>a+b,0)/v.length):null};
(function(){const o=Object.assign({},PN);Object.keys(PN).forEach(k=>delete PN[k]);PN.rd="Luyện đọc bài khóa";Object.assign(PN,o)})();
const _rdSum=vSum;vSum=function(L,r){return _rdSum(L,r).replace(`onclick="lt('rd')"`,`onclick="lt('bk');setTimeout(()=>{const e=$('rdbox');e&&e.scrollIntoView()},60)"`)};
(function(){const st=document.createElement("style");st.textContent=`
.rd .rdl{border:1.5px solid #eadfca;border-radius:14px;padding:10px 12px;margin-top:10px;background:#fffdf7}
.rd .rdl.ok{border-color:#7cb88a;background:#f3fbf4}.rd .rdl.no{border-color:#e3a3a3;background:#fff6f6}
.rd .rdw{display:flex;align-items:center;gap:8px;color:var(--sub);font-size:.88rem}
.rd .rdw b{display:inline-grid;place-items:center;min-width:22px;height:22px;border-radius:50%;background:var(--m);color:#fff;font-size:.8rem}
.rd .rdw .sc{margin-left:auto}.rd .hz{font-size:1.35rem;margin:6px 0 2px;line-height:1.5}.rd .py{color:var(--m);font-size:.95rem;margin-bottom:6px}
.rd .warn{color:#a3324c}`;document.head.appendChild(st)})();
