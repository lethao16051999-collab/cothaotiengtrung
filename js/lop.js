/* ===== Vào lớp: điểm danh + tự đánh giá cuối buổi (学习小结) · thêm 23/10/2026 =====
   Học viên đã nhập mã học viên → mục "✋ Vào lớp" (menu) hoặc địa chỉ có #vaolop.
   Điểm danh: nhập mã buổi học 4 số cô đọc / ghi trên bảng (mỗi lớp một mã, đổi mỗi ngày).
   Tự đánh giá: mẫu cố định 学习小结 · Đã hiểu / Đã dùng được, mỗi điểm ngữ pháp của bài là một dòng
   + dòng "Từ vựng trọng tâm của Bài N-1"; thêm mức hiểu bài, tốc độ dạy, phần thấy khó, câu hỏi cho cô.
   Nạp SAU js/theodoi.js. Cần js/track.js (TRK_API, TRKME, trkPost). ===== */
let VL={st:null,busy:false,msg:"",pin:"",f:null,edit:false,sent:""};
const VL_GEN=["Từ vựng mới của buổi học","Ngữ pháp · mẫu câu của buổi học","Bài khóa: nghe – đọc hiểu","Nói theo chủ đề buổi học","Viết chữ Hán"];
const VL_HARD=["Từ vựng","Ngữ pháp","Nghe","Nói","Đọc","Viết chữ Hán"];
const vlE=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const vlLvN=l=>typeof lvN=="function"?lvN(l):"HSK "+l;
function vlLessons(){const o=[];[1,2].forEach(l=>{if(typeof napOk=="function"&&!napOk(l)){(napBai(l)||[]).forEach(n=>o.push([l,n]));return}const D=LDS[l]||{};Object.keys(D).map(Number).filter(n=>D[n]&&D[n].gp).sort((a,b)=>a-b).forEach(n=>o.push([l,n]))});return o}
function vlRows(lv,b){const L=(LDS[lv]||{})[b];if(!L||!L.gp)return VL_GEN.slice();
 const r=L.gp.map(g=>String(g.h).replace(/<[^>]+>/g,"").replace(/^\s*\d+\.\s*/,"").trim()).filter(h=>h&&!/^(Mẹo dùng từ|Văn hóa)/i.test(h));
 r.push("Từ vựng trọng tâm của Bài "+(b>1?b-1:b));return r}
function vlFormNew(){const st=VL.st,ls=vlLessons(),les=st&&st.lesson&&ls.some(x=>x[0]==st.lesson.lv&&x[1]==st.lesson.b)?st.lesson.lv+"-"+st.lesson.b:"gen";
 VL.f={les,rows:null,star:0,speed:"",hard:[],q:""};vlSetRows()}
function vlSetRows(){const f=VL.f;let t;if(f.les=="gen")t=VL_GEN.slice();else{const[l,b]=f.les.split("-").map(Number);
 if(typeof napOk=="function"&&!napOk(l)){f.rows=[];f.wait=1;const les=f.les;napLv(l).then(()=>{if(VL.f===f&&f.les==les){vlSetRows();vlDraw()}},()=>{if(VL.f===f&&f.les==les){f.wait=0;f.rows=VL_GEN.map(x=>[x,false,false]);vlDraw()}});return}
 t=vlRows(l,b)}f.wait=0;f.rows=t.map(x=>[x,false,false])}
function vlSec(){let s=$("vaolop");if(!s){s=document.createElement("section");s.id="vaolop";document.querySelector("main").appendChild(s)}return s}
function vlOpen(){go("vaolop");mMenu(false);vlDraw();if(trkIn())vlLoad()}
async function vlLoad(){if(!trkIn())return vlDraw();VL.busy=true;VL.msg="";vlDraw();
 try{const r=await trkPost({a:"today",code:TRKME.code});if(r&&r.ok){VL.st=r;if(!VL.f)vlFormNew()}else VL.msg=r&&r.err=="off"?"Mã học viên đã tạm ngừng. Em hỏi cô Thảo nhé.":r&&r.err=="no_code"?"Mã học viên không còn đúng. Em hỏi cô Thảo nhé.":"Chưa tải được thông tin lớp, em thử lại nhé."}
 catch(e){VL.msg="Chưa kết nối được. Em kiểm tra mạng rồi bấm Tải lại nhé."}
 VL.busy=false;vlDraw()}
async function vlAtt(){const v=(($("vlpin")||{}).value||"").replace(/\D/g,"");VL.pin=v;if(v.length!=4){VL.msg="Mã buổi học gồm 4 chữ số cô ghi trên bảng.";return vlDraw()}
 VL.busy=true;VL.msg="";vlDraw();
 try{const r=await trkPost({a:"att",code:TRKME.code,pin:v});
  if(r&&r.ok){VL.st.att=r.att;VL.pin="";VL.msg=""}
  else VL.msg=r&&r.err=="pin"?`Mã buổi học chưa đúng. Em xem lại mã của <b>lớp ${vlE(VL.st.cls)}</b> nhé${r.left!=null&&r.left<4?` (còn ${Math.max(0,r.left)} lần thử)`:""}.`:r&&r.err=="too_many"?"Em nhập sai quá nhiều lần hôm nay. Em báo cô Thảo điểm danh giúp nhé.":r&&r.err=="no_class"?"Em chưa được xếp lớp. Em báo cô Thảo nhé.":"Chưa điểm danh được, em thử lại nhé."}
 catch(e){VL.msg="Chưa kết nối được. Em kiểm tra mạng rồi thử lại nhé."}
 VL.busy=false;vlDraw()}
async function vlSend(){const f=VL.f;if(f.wait){VL.msg="Đang tải nội dung bài, em đợi vài giây rồi gửi nhé.";return vlDraw()}if(!f.star){VL.msg="Em chọn mức hiểu bài (số sao) trước khi gửi nhé.";return vlDraw()}
 VL.busy=true;VL.msg="";vlDraw();const bai=f.les=="gen"?"Bài khác (không có trên web)":(()=>{const[l,b]=f.les.split("-");return vlLvN(+l)+" · Bài "+b})();
 try{const r=await trkPost({a:"eval",code:TRKME.code,bai,rows:f.rows,star:f.star,speed:f.speed,hard:f.hard,q:f.q});
  if(r&&r.ok){VL.st.ev=r.ev;VL.edit=false;VL.sent=r.ev;scrollTo(0,0)}
  else VL.msg=r&&r.err=="need_att"?"Em cần điểm danh trước rồi mới gửi phiếu nhé.":"Chưa gửi được, em thử lại nhé."}
 catch(e){VL.msg="Chưa kết nối được. Bài của em vẫn còn trên màn hình, có mạng thì bấm Gửi lại nhé."}
 VL.busy=false;vlDraw()}
const vlDay=d=>{const x=new Date(d+"T12:00:00"),t=["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"][x.getDay()];return `${t}, ${d.slice(8,10)}/${d.slice(5,7)}/${d.slice(0,4)}`};
function vlForm(){const f=VL.f,ls=vlLessons();
 return `<div class="card vlf"><div class="vlh"><span class="vlbadge zh">学习小结</span><h3>Tổng kết học tập – Em tự đánh giá</h3></div>
<label class="vll">Bài học hôm nay <select onchange="VL.f.les=this.value;vlSetRows();vlDraw()">${ls.map(x=>`<option value="${x[0]}-${x[1]}" ${f.les==x[0]+"-"+x[1]?"selected":""}>${vlLvN(x[0])} · Bài ${x[1]}${(LTS[x[0]]||[])[x[1]-1]?" · "+LTS[x[0]][x[1]-1].split("|")[0]:""}</option>`).join("")}<option value="gen" ${f.les=="gen"?"selected":""}>Bài khác (lớp HSK3, YCT, TOCFL…)</option></select></label>
<table class="vlt"><thead><tr><th>Nội dung</th><th>Đã hiểu</th><th>Đã dùng được</th></tr></thead><tbody>
${f.wait?`<tr><td colspan="3"><span class="napsp" style="display:inline-block;vertical-align:middle;margin-right:8px"></span>Đang tải nội dung bài…</td></tr>`:""}${f.rows.map((r,i)=>`<tr><td>${vlE(r[0])}</td><td><label class="vlck"><input type="checkbox" ${r[1]?"checked":""} onchange="VL.f.rows[${i}][1]=this.checked"><span></span></label></td><td><label class="vlck"><input type="checkbox" ${r[2]?"checked":""} onchange="VL.f.rows[${i}][2]=this.checked"><span></span></label></td></tr>`).join("")}</tbody></table>
<p class="vlq"><b>Hôm nay em hiểu bài ở mức nào?</b></p><div class="vlstar">${[1,2,3,4,5].map(n=>`<button class="${f.star>=n?"on":""}" onclick="VL.f.star=${n};vlDraw()" aria-label="${n} sao">★</button>`).join("")}<small>${["","Chưa hiểu","Hiểu một ít","Hiểu khoảng một nửa","Hiểu gần hết","Hiểu hết"][f.star]||"Chạm để chọn"}</small></div>
<p class="vlq"><b>Tốc độ cô dạy hôm nay</b></p><div class="row">${["Chậm","Vừa","Nhanh"].map(x=>`<button class="btn sm ${f.speed==x?"":"o"}" onclick="VL.f.speed='${x}';vlDraw()">${x}</button>`).join("")}</div>
<p class="vlq"><b>Phần em thấy khó nhất</b> <small>(chọn được nhiều)</small></p><div class="row">${VL_HARD.map(x=>`<button class="btn sm ${f.hard.includes(x)?"":"o"}" onclick="const h=VL.f.hard,i=h.indexOf('${x}');i<0?h.push('${x}'):h.splice(i,1);vlDraw()">${x}</button>`).join("")}</div>
<p class="vlq"><b>Em muốn hỏi cô / ghi chú</b> <small>(không bắt buộc)</small></p><textarea class="tin vlta" rows="3" placeholder="Ví dụ: em chưa phân biệt được 有点儿 và 一点儿" oninput="VL.f.q=this.value">${vlE(f.q)}</textarea>
${VL.msg?`<p class="bad">${VL.msg}</p>`:""}
<div class="row"><button class="btn" onclick="vlSend()" ${VL.busy?"disabled":""}>${VL.busy?"Đang gửi…":"📨 Gửi cho cô"}</button>${VL.edit?`<button class="btn o" onclick="VL.edit=false;vlDraw()">Hủy</button>`:""}</div></div>`}
function vlDraw(){const s=vlSec();
 if(!trkOn()){s.innerHTML=`<h2>Vào lớp</h2><div class="card">Chức năng điểm danh chưa bật.</div>`;return}
 if(!trkIn()){s.innerHTML=`<h2>✋ Vào lớp</h2><div class="card vlc"><p>Em nhập <b>mã học viên</b> cô Thảo gửi để điểm danh và gửi phiếu tự đánh giá cuối buổi.</p><button class="btn" onclick="trkOpen()">🔑 Nhập mã học viên</button></div>`;return}
 const st=VL.st;
 let h=`<h2>✋ Vào lớp</h2><div class="vlwho">👤 <b>${vlE(TRKME.name)}</b>${st&&st.cls?` · Lớp <b>${vlE(st.cls)}</b>`:""}${st?` · ${vlDay(st.day)}`:""} <button class="btn o sm" onclick="vlLoad()" ${VL.busy?"disabled":""}>↻ Tải lại</button></div>`;
 if(!st){s.innerHTML=h+`<div class="card">${VL.busy?"Đang tải…":VL.msg||""}</div>`;return}
 h+=`<div class="card vlc"><h3>1. Điểm danh</h3>`+(st.att?`<p class="vlok">✓ Em đã điểm danh lúc <b>${vlE(st.att)}</b>. Chúc em học tốt!</p>`:
  `<p>Nhập <b>mã buổi học</b> (4 số cô đọc hoặc ghi trên bảng).</p><div class="vlpinw"><input class="tin vlpin" id="vlpin" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="····" value="${vlE(VL.pin)}" onkeydown="if(event.key=='Enter')vlAtt()"><button class="btn" onclick="vlAtt()" ${VL.busy?"disabled":""}>${VL.busy?"Đang gửi…":"✋ Điểm danh"}</button></div>${VL.msg?`<p class="bad">${VL.msg}</p>`:""}`)+`</div>`;
 h+=`<h3 class="ab-h">2. Tự đánh giá cuối buổi</h3>`;
 if(!st.att)h+=`<div class="card vlc"><p class="ctx">Điểm danh xong, cuối buổi em quay lại đây để làm phiếu tự đánh giá nhé.</p></div>`;
 else if(st.ev&&!VL.edit)h+=`<div class="card vlc"><p class="vlok">✓ Em đã gửi phiếu tự đánh giá lúc <b>${vlE(st.ev)}</b>. Cảm ơn em!</p><div class="row"><button class="btn o sm" onclick="VL.edit=true;vlDraw()">Sửa lại phiếu</button><button class="btn sm" onclick="goSub('ol')">📖 Ôn bài trên web</button></div></div>`;
 else h+=vlForm();
 s.innerHTML=h;const i=$("vlpin");if(i&&!st.att&&document.activeElement===document.body)setTimeout(()=>i.focus(),50)}

/* lối vào: menu "✋ Vào lớp", nút trong hộp mã học viên, #vaolop */
(function(){if(!trkOn())return;
 const nv=$("nav"),li=$("nilearn");if(nv&&!nv.querySelector('[data-id="vaolop"]')){const b=document.createElement("button");b.dataset.id="vaolop";b.className="vlnav";b.textContent="✋ Vào lớp";b.onclick=vlOpen;li&&li.nextSibling?nv.insertBefore(b,li.nextSibling):nv.appendChild(b)}
 vlSec();
 const _tb=trkBox;trkBox=function(m,w){_tb(m,w);if(trkIn()){const r=document.querySelector("#trkbox .trkc .row");if(r)r.insertAdjacentHTML("afterbegin",`<button class="btn" onclick="trkClose();vlOpen()">✋ Vào lớp</button>`)}};
 const _tl=trkLogin;trkLogin=async function(){await _tl();if(trkIn()&&$("vaolop").classList.contains("on")){VL.st=null;VL.f=null;vlLoad()}};
 const _to=trkOut;trkOut=function(){VL={st:null,busy:false,msg:"",pin:"",f:null,edit:false,sent:""};_to()};
 const hs=()=>{if(/vaolop/.test(location.hash))vlOpen()};hs();addEventListener("hashchange",hs);
 const st=document.createElement("style");st.textContent=`
nav .vlnav{background:var(--g)!important;color:#3b2a1e!important;font-weight:800}
#vaolop .vlwho{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:-4px 0 12px;color:var(--sub)}#vaolop .vlwho b{color:var(--t)}
#vaolop .vlc h3{margin-top:0;color:var(--m)}.vlok{font-size:1.05rem;color:#2e7d4f;margin:4px 0}
.vlpinw{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.vlpin{width:170px;font-size:2rem;letter-spacing:.35em;text-align:center;padding:8px 10px;font-weight:800}
.vlf .vlh{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:10px}.vlf .vlh h3{margin:0}
.vlbadge{background:var(--m);color:#fff;border-radius:999px;padding:4px 14px;font-size:1.05rem}
.vll{display:flex;flex-direction:column;gap:6px;font-weight:700;margin-bottom:12px}.vll select{padding:8px 10px;border-radius:12px;border:1px solid var(--b);font:inherit;font-weight:400;max-width:100%}
.vlt{width:100%;border-collapse:separate;border-spacing:0;border-radius:14px;overflow:hidden;border:1px solid var(--b)}
.vlt th{background:#3b2a1e;color:#e6c46a;padding:10px;text-align:left;font-size:.9rem}.vlt th:not(:first-child),.vlt td:not(:first-child){text-align:center;width:92px}
.vlt td{padding:10px;border-top:1px solid var(--b)}.vlt tbody tr:nth-child(odd){background:#f3e6d0}.vlt tbody tr:nth-child(even){background:#fffaf0}
.vlck{display:inline-grid;place-items:center;cursor:pointer}.vlck input{position:absolute;opacity:0}.vlck span{width:28px;height:28px;border:2px solid #8b6f4e;border-radius:6px;background:#fff;display:grid;place-items:center}
.vlck input:checked+span{background:#2e7d4f;border-color:#2e7d4f}.vlck input:checked+span::after{content:"✓";color:#fff;font-weight:800}.vlck input:focus-visible+span{outline:2px solid var(--g);outline-offset:2px}
.vlq{margin:16px 0 6px}.vlq small{color:var(--sub);font-weight:400}
.vlstar{display:flex;align-items:center;gap:4px;flex-wrap:wrap}.vlstar button{border:0;background:none;font-size:2.1rem;line-height:1;color:#d9cbb3;cursor:pointer;padding:0 2px}.vlstar button.on{color:#e0a800}.vlstar small{margin-left:8px;color:var(--sub)}
.vlta{width:100%;box-sizing:border-box;font:inherit;resize:vertical}
@media(max-width:560px){.vlt th:not(:first-child),.vlt td:not(:first-child){width:62px;padding:8px 4px}.vlt th{font-size:.78rem}.vlt td{font-size:.92rem}}`;document.head.appendChild(st)})();
