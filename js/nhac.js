/* ===== Nhắc bài cô giao · thêm 23/10/2026 =====
   Học viên đã nhập mã: trang hỏi Sheet bài lớp đang được giao (API "today": lesson {lv,b}, có thể kèm han = hạn "yyyy-mm-dd",
   nhac = lời nhắn của cô), rồi so với tiến trình trên máy (ct_hsk{cấp}_b{bài}) để biết phần nào chưa làm / chưa đạt 80%.
   Khung nhắc hiện ở: Trang chủ (dưới cột nút), đầu Ôn luyện theo bài, trang Vào lớp; chấm đỏ trên nút 👤.
   Bấm từng phần → mở đúng phần đó. "Ẩn" chỉ ẩn trong lần mở trang này.
   Nạp SAU js/home.js. Cần js/track.js (trkPost, TRKME, trkIn). ===== */
let NB={st:null,hide:false,busy:false};
const NB_P12=[["rd","bk","Luyện đọc bài khóa"],["fc","fc","Flashcard"],["gp","gp","Ngữ pháp · Mẫu câu"],["dt","dt","Nghe chép"],["ns","ns","Luyện nói"],["test","ts","Test nhanh"]];
const NB_P45=[["fc","tv","Khởi động · Từ vựng"],["gp","gp","Ngữ pháp"],["dt","nd","Nghe – Đọc"],["ns","ns","Nói"],["vt","vt","Viết"]];
const NB_OK=80;
const nbE=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const nbLvN=l=>typeof lvN=="function"?lvN(l):"HSK "+l;
try{NB.hide=sessionStorage.getItem("ct_nb_hide")==="1"}catch(e){}

/* ---------- dữ liệu ---------- */
async function nbLoad(force){
 if(!trkIn()){NB.st=null;nbDraw();return}
 let c=null;try{c=JSON.parse(sessionStorage.getItem("ct_nb")||"null")}catch(e){}
 if(!force&&c&&c.code==TRKME.code&&Date.now()-c.at<15*60000){NB.st=c.st;nbDraw();return}
 if(NB.busy)return;NB.busy=true;
 try{const r=await trkPost({a:"today",code:TRKME.code});if(r&&r.ok){NB.st=r;try{sessionStorage.setItem("ct_nb",JSON.stringify({code:TRKME.code,at:Date.now(),st:r}))}catch(e){}}}
 catch(e){}
 NB.busy=false;nbDraw()}
function nbProg(lv,b){try{return JSON.parse(localStorage.getItem("ct_hsk"+lv+"_b"+b)||"{}")||{}}catch(e){return{}}}
/* hạn: "yyyy-mm-dd" hoặc "dd/mm[/yyyy]" → số ngày còn lại (0 = hôm nay, âm = quá hạn) */
function nbDue(h){if(!h)return null;let y,m,d,s=String(h).trim(),x;
 if(x=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)){y=+x[1];m=+x[2];d=+x[3]}
 else if(x=s.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/)){d=+x[1];m=+x[2];y=x[3]?(+x[3]<100?2000+ +x[3]:+x[3]):new Date().getFullYear()}else return null;
 const due=new Date(y,m-1,d),t=new Date();t.setHours(0,0,0,0);
 return{left:Math.round((due-t)/864e5),txt:["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"][due.getDay()]+" "+String(d).padStart(2,"0")+"/"+String(m).padStart(2,"0")}}
function nbInfo(){const s=NB.st;if(!trkIn()||!s||!s.lesson)return null;
 const lv=+s.lesson.lv,b=+s.lesson.b,L=(LDS[lv]||{})[b];if(!L)return null;
 const r=nbProg(lv,b),P=(lv>=4?NB_P45:NB_P12).filter(p=>p[0]!="test"||(L.tsort&&L.tlis)).filter(p=>p[0]!="rd"||(L.texts&&L.texts.length));
 const parts=P.map(p=>({k:p[0],tab:p[1],n:p[2],v:r[p[0]]!=null?Math.round(r[p[0]]):null}));
 parts.forEach(p=>p.st=p.v==null?"no":p.v>=NB_OK?"ok":"low");
 const todo=parts.filter(p=>p.st!="ok"),T=(LTS[lv]||[])[b-1];
 return{lv,b,title:T?T.split("|")[0]:"",parts,todo,due:nbDue(s.han),note:s.nhac||""}}

/* ---------- mở đúng phần ---------- */
function nbGo(tab){const i=nbInfo();if(!i)return;
 if(tab=="ts"){goSub("ts");setLv(i.lv);openTest(i.b);return}
 goSub("ol");if(typeof OLPICK!="undefined")OLPICK=true;setLv(i.lv);openL(i.b);
 if(tab)(i.lv>=4?h4t:lt)(tab);
 if(tab=="bk")setTimeout(()=>{const e=$("rdbox");if(e)e.scrollIntoView({behavior:"smooth",block:"start"})},150)}
function nbHide(){NB.hide=true;try{sessionStorage.setItem("ct_nb_hide","1")}catch(e){}nbDraw()}
function nbShow(){NB.hide=false;try{sessionStorage.removeItem("ct_nb_hide")}catch(e){}nbDraw()}

/* ---------- giao diện ---------- */
function nbCard(where){const i=nbInfo();if(!i)return"";
 const done=!i.todo.length,d=i.due,late=d&&d.left<0&&!done,soon=d&&d.left>=0&&d.left<=1&&!done;
 if(NB.hide&&!late)return where=="home"&&!done?`<button class="nbmini" onclick="nbShow()">📌 Bài cô giao: còn ${i.todo.length} phần</button>`:"";
 const cls=done?"ok":late?"late":soon?"soon":"";
 const dueTxt=d?(done?`Hạn ${d.txt}`:late?`<b>Đã quá hạn ${-d.left} ngày</b> (hạn ${d.txt})`:d.left==0?`<b>Hạn hôm nay</b> (${d.txt})`:d.left==1?`<b>Hạn ngày mai</b> (${d.txt})`:`Hạn ${d.txt} · còn ${d.left} ngày`):"";
 const next=i.parts.find(p=>p.st=="no")||i.todo[0];
 const chip=p=>`<button class="nbc ${p.st}" onclick="nbGo('${p.tab}')"><i>${p.st=="ok"?"✓":p.st=="low"?"!":"○"}</i><span>${p.n}</span><small>${p.st=="ok"?p.v+"%":p.st=="low"?p.v+"% · làm lại":"chưa làm"}</small></button>`;
 return `<div class="card nbx ${cls}" role="status">
<div class="nbh"><span class="nbi">${done?"🎉":late?"⏰":"📌"}</span><div class="nbt"><b>Bài cô giao: ${nbLvN(i.lv)} · Bài ${i.b}</b>${i.title?`<span class="zh">${nbE(i.title)}</span>`:""}${dueTxt?`<small>${dueTxt}</small>`:""}</div>${late?"":`<button class="nbx-x" onclick="nbHide()" aria-label="Ẩn lời nhắc">✕</button>`}</div>
${i.note?`<p class="nbnote">💬 Cô nhắn: ${nbE(i.note)}</p>`:""}
${done?`<p class="nbmsg">Em đã làm xong mọi phần của bài cô giao, phần nào cũng từ ${NB_OK}% trở lên. Giỏi lắm! 👏</p>`:
`<p class="nbmsg">Em còn <b>${i.todo.length}</b> phần cần làm${i.todo.some(p=>p.st=="low")?" (phần có dấu ! làm lại cho đạt từ "+NB_OK+"%)":""}:</p>`}
<div class="nbcs">${i.parts.map(chip).join("")}</div>
${done?"":`<div class="row"><button class="btn" onclick="nbGo('${next.tab}')">Làm ngay: ${next.n} →</button></div>`}</div>`}
function nbSlot(id,after){let e=$(id);if(!e&&after){e=document.createElement("div");e.id=id;after.insertAdjacentElement("afterend",e)}return e}
function nbDraw(){
 const h=nbSlot("nbhome",document.querySelector("#home .hero"));if(h)h.innerHTML=nbCard("home");
 if(typeof SUBC!="undefined"&&SUBC=="ol"&&!cur){const p=$("lp-ol");if(p){const o=$("nbol");if(o)o.remove();const c=nbCard("ol");if(c)p.insertAdjacentHTML("afterbegin",`<div id="nbol">${c}</div>`)}}
 const v=$("vaolop");if(v&&v.classList.contains("on")&&VL&&VL.st&&VL.st.att){const o=$("nbvl");if(o)o.remove();const c=nbCard("vl");if(c)v.insertAdjacentHTML("beforeend",`<div id="nbvl"><h3 class="ab-h">3. Bài cô giao về nhà</h3>${c}</div>`)}
 const b=$("trkme"),i=nbInfo();if(b){b.classList.toggle("nbdot",!!(i&&i.todo.length));if(i&&i.todo.length)b.title+=` · Còn ${i.todo.length} phần bài cô giao`}}

/* ---------- gắn vào trang ---------- */
(function(){if(typeof trkOn!="function"||!trkOn())return;
 const _go=go;go=function(id){_go(id);if(id=="home")nbDraw()};
 const _rr=rr;rr=function(){_rr();nbDraw()};
 const _tb=trkBadge;trkBadge=function(){_tb.apply(this,arguments);nbDraw()};
 const _tl=trkLogin;trkLogin=async function(){await _tl();if(trkIn())nbLoad(true)};
 const _to=trkOut;trkOut=function(){try{sessionStorage.removeItem("ct_nb")}catch(e){}NB.st=null;_to();setTimeout(nbDraw,600)};
 if(typeof vlDraw=="function"){const _vd=vlDraw;vlDraw=function(){_vd();if(VL&&VL.st&&VL.st.lesson&&(!NB.st||VL.st.day!=NB.st.day||JSON.stringify(VL.st.lesson)!=JSON.stringify(NB.st.lesson)||VL.st.han!=NB.st.han))NB.st=VL.st;nbDraw()}}
 /* tiến trình đổi (làm xong một phần) → vẽ lại khung khi quay ra */
 addEventListener("visibilitychange",()=>{if(document.visibilityState=="visible")nbLoad()});
 const st=document.createElement("style");st.textContent=`
.nbx{border:2px solid var(--g,#c9a227);background:#fffaf0;margin:14px 0}
.nbx.late{border-color:#c0392b;background:#fff3f1}.nbx.soon{border-color:#e67e22;background:#fff6ec}.nbx.ok{border-color:#2e7d4f;background:#f2faf4}
.nbh{display:flex;align-items:flex-start;gap:12px}.nbi{flex:none;font-size:1.7rem;line-height:1.2}
.nbt{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.nbt b{color:var(--m,#5c1730);font-size:1.08rem}.nbt .zh{font-size:1.05rem}.nbt small{color:var(--sub,#6b5a4a);font-size:.9rem}
.nbx.late .nbt small b{color:#c0392b}.nbx.soon .nbt small b{color:#c25e00}
.nbx-x{flex:none;border:0;background:none;font-size:1.1rem;color:#9a8670;cursor:pointer;padding:2px 6px;border-radius:8px}.nbx-x:hover{background:rgba(0,0,0,.06)}
.nbnote{margin:10px 0 0;padding:8px 12px;border-radius:12px;background:#fff;border:1px dashed var(--g,#c9a227)}
.nbmsg{margin:10px 0 8px}
.nbcs{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin-bottom:10px}
.nbc{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:8px;align-items:center;text-align:left;padding:8px 10px;border-radius:12px;border:1.5px solid #e2cfa6;background:#fff;cursor:pointer;font:inherit;color:inherit}
.nbc i{grid-row:1/3;font-style:normal;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:.9rem}
.nbc span{font-weight:700;font-size:.92rem;line-height:1.2}.nbc small{font-size:.8rem;color:var(--sub,#6b5a4a)}
.nbc.ok{border-color:#a8d5b5}.nbc.ok i{background:#2e7d4f;color:#fff}
.nbc.low{border-color:#f0b27a;background:#fff8f0}.nbc.low i{background:#e67e22;color:#fff}.nbc.low small{color:#b85c00;font-weight:700}
.nbc.no{border-color:#e8a9a1;border-style:dashed}.nbc.no i{border:2px solid #c0392b;color:#c0392b}.nbc.no small{color:#c0392b;font-weight:700}
.nbc:hover{transform:translateY(-1px);box-shadow:0 3px 8px rgba(0,0,0,.08)}.nbc:focus-visible{outline:3px solid var(--g,#c9a227);outline-offset:2px}
.nbmini{display:block;margin:12px auto 0;border:1.5px dashed var(--g,#c9a227);background:#fffaf0;color:var(--m,#5c1730);border-radius:999px;padding:8px 16px;font:700 .95rem var(--ui,Nunito,sans-serif);cursor:pointer}
#nbhome .nbx{margin-top:16px}
.trkme.nbdot::after{content:"";position:absolute;top:-2px;right:-2px;width:11px;height:11px;border-radius:50%;background:#e74c3c;border:2px solid #fff}
@media(max-width:560px){.nbcs{grid-template-columns:1fr 1fr}.nbc{padding:7px 8px}.nbc span{font-size:.86rem}.nbh{gap:8px}.nbi{font-size:1.4rem}}`;document.head.appendChild(st);
 nbLoad()})();
