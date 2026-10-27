/* ===== Giới thiệu nhân vật của giáo trình (thêm 27/10/2026) =====
   Dữ liệu: NV[cấp] trong data/hsk{cấp}/nv.js (nạp cùng cấp qua NAP "them"). Hiện ô "Giới thiệu nhân vật"
   đầu danh sách Ôn luyện theo bài (trước Bài 1); bấm vào mở trang nhân vật. Nạp SAU js/shelf.js. ===== */
var NV=window.NV||{};
let NVON=false,NVQ={};
function nvOpen(){NVON=true;NVQ={};rr();scrollTo(0,0)}
function nvClose(){NVON=false;rr();scrollTo(0,0)}
function nvAns(i,k){if(NVQ[i]!=null)return;NVQ[i]=k;rr()}
/* thứ tự đáp án cố định theo câu (không để đáp án đúng luôn đứng đầu) */
const nvOrd=(n,i)=>[[1,0,2],[2,1,0],[0,2,1],[1,2,0],[2,0,1],[0,1,2]][i%6].slice(0,n);
function nvCard(x){return `<div class="nvc"><img src="${x.img}" alt="${x.vn}" loading="lazy"><div><div class="nvn"><span class="zh">${x.n}</span> <span class="py">${x.p}</span> ${bS(x.n,"🔊")}${x.tag?`<span class="pill">${x.tag}</span>`:""}</div><div class="vi nvvn">${x.vn}</div>${x.zh?`<div class="zh nvz">${x.zh}</div>`:""}${x.zp?`<div class="py nvp">${x.zp}</div>`:""}<div class="vi nvv">${x.vi}</div></div></div>`}
function nvView(){const D=NV[olLv];let ok=0;const qn=D.quiz.length;Object.keys(NVQ).forEach(i=>{if(NVQ[i]==D.quiz[i].a)ok++});
 return `<div class="row"><button class="btn o sm" onclick="nvClose()">← Danh sách bài</button></div>
<div class="lhead"><span class="no">👥</span><div><small>HSK ${olLv} · Mở đầu</small><div class="zh lt2">${D.title}</div><div>${D.titleVi}</div></div></div>
${pvBar()}<div class="stack ${hidePy?"hidepy":""} ${hideVi?"hidevi":""}">
<div class="card"><h3>📖 Tóm tắt câu chuyện</h3><p class="zh nvz">${D.sum[0]}</p><p class="vi">${D.sum[1]}</p>${D.sum2?`<p class="zh nvz">${D.sum2[0]}</p><p class="vi">${D.sum2[1]}</p>`:""}</div>
${D.ai?`<div class="card">${nvCard(D.ai)}</div>`:""}
${D.groups.map(g=>`<div class="card"><h3>📍 ${g.h} · ${g.hv}</h3><div class="nvg">${g.ppl.map(nvCard).join("")}</div></div>`).join("")}
${D.rel?`<div class="card"><h3>🔗 Quan hệ giữa các nhân vật</h3><ul class="nvr">${D.rel.map(r=>`<li><span class="zh">${r[0]}</span> — <span class="zh">${r[1]}</span>: ${r[2]}</li>`).join("")}</ul></div>`:""}
${D.quiz?`<div class="card"><h3>❓ Em nhớ nhân vật chưa?</h3><p><small>Chọn đáp án đúng. Đúng ${ok}/${qn}${Object.keys(NVQ).length==qn?(ok==qn?" · 🎉 Giỏi lắm!":" · Đọc lại phần giới thiệu rồi làm lại nhé."):""}</small></p>
${D.quiz.map((q,i)=>`<div class="nvq"><div><b>${i+1}.</b> <span class="zh">${q.q}</span> ${bS(q.q,"🔊")}<div class="py">${q.qp}</div></div><div class="row">${nvOrd(q.o.length,i).map(k=>{const st=NVQ[i]==null?"":k==q.a?"ok":NVQ[i]==k?"no":"";return `<button class="btn sm o nvo ${st}" onclick="nvAns(${i},${k})"><span class="zh">${q.o[k]}</span>${st=="ok"?" ✓":st=="no"?" ✗":""}</button>`}).join("")}</div></div>`).join("")}
${Object.keys(NVQ).length?`<div class="row"><button class="btn o sm" onclick="NVQ={};rr()">↻ Làm lại</button></div>`:""}</div>`:""}
<div class="row"><button class="btn" onclick="NVON=false;openL(1)">Bắt đầu Bài 1 →</button></div></div>`}
/* ô đầu danh sách bài */
const _nvLessons=lessons;lessons=function(mode){const h=_nvLessons(mode);if(mode!="ol"||!NV[olLv])return h;
 return h.replace('<div class="lessons">',`<div class="lessons"><div class="ls go nvls" onclick="nvOpen()"><b>👥 Mở đầu</b><span class="lt">Giới thiệu nhân vật</span><small>Xem →</small></div>`)};
const _nvDrawOl=drawOl;drawOl=function(){if(NVON&&!cur&&NV[olLv]&&(typeof napOk!="function"||napOk(olLv))){$("lp-ol").innerHTML=nvView();return}return _nvDrawOl()};
const _nvSetLv=setLv;setLv=function(l){NVON=false;return _nvSetLv(l)};
const _nvOpenL=openL;openL=function(n){NVON=false;return _nvOpenL(n)};
(function(){const st=document.createElement("style");st.textContent=`
.nvls{background:linear-gradient(135deg,#fbf5e6,#f3e2b8)!important;border-color:#c9a227!important}
.nvg{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:12px}
.nvc{display:flex;gap:12px;align-items:flex-start;background:var(--k);border-radius:14px;padding:12px}
.nvc img{width:76px;height:76px;border-radius:50%;border:3px solid #c9a227;flex:none;background:#fff}
.nvn .zh{font-size:1.3rem;color:var(--m);font-weight:700}.nvn .py{color:var(--m)}.nvn .pill{margin-left:6px}
.nvvn{font-weight:600}.nvz{margin:6px 0 2px;line-height:1.7}.nvp{font-size:.88rem;color:var(--sub)}.nvv{margin-top:4px}
.nvr li{margin:4px 0}.nvq{border-top:1px dashed #e0cfa6;padding:10px 0}.nvq .py{font-size:.88rem;color:var(--sub)}
.nvo.ok{background:#e3f4e6!important;border-color:#3b8a4a!important;color:#1f5a2a!important}.nvo.no{background:#fbe4e4!important;border-color:#b23a3a!important;color:#7a1f1f!important}
.hidepy .nvc .py,.hidepy .nvq .py{display:none}.hidevi .nvc .vi{display:none}
@media(max-width:560px){.nvg{grid-template-columns:1fr}.nvc img{width:64px;height:64px}}`;document.head.appendChild(st)})();
