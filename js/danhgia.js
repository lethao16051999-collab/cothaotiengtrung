/* ===== 🎓 Đánh giá giữa khóa / cuối khóa · thêm 12/11/2026 =====
   Tab mới trong ⚙ Quản trị. Mỗi lớp có nhiều "đợt đánh giá" (Giữa khóa / Cuối khóa, ngày, thang điểm).
   Form cố định cho từng học viên:
     1. Bài thi tổng hợp: Nghe / Đọc / Viết (thang điểm từng phần cô đặt cho đợt; phần nào thang 0 thì bỏ).
     2. Khẩu ngữ: Phát âm · Lưu loát · Từ vựng – ngữ pháp · Phản xạ (mỗi tiêu chí /10).
     3. Chuyên cần: tự tính từ điểm danh theo lộ trình + bài về nhà trên web (cô sửa tay được).
     4. Thái độ học: Tốt / Khá / Trung bình / Cần cố gắng.
     5. Điểm mạnh · Cần cải thiện · Khóa học tiếp theo · Nhận xét.
     6. Kết quả ĐẠT / CHƯA ĐẠT: máy chỉ GỢI Ý theo ngưỡng, cô bấm chốt.
   Phiếu báo cáo: vẽ thành ảnh PNG (gửi Zalo), có nút In / Lưu PDF, bản cho Phụ huynh hoặc Học viên.
   Lưu: QT.d.dg (cùng kho "Quản trị (dữ liệu)" — API qtget/qtset) + chép sang trang tính đọc được
   "Đánh giá khóa" nếu đã cài huong-dan/danhgia-api.gs.txt (API dgsheet).
   Nạp SAU js/quantri.js. ===== */
const DG_TD=["Tốt","Khá","Trung bình","Cần cố gắng"];
const DG_TH=[["n","Nghe"],["r","Đọc"],["w","Viết"]];
const DG_KN=[["pa","Phát âm"],["ll","Lưu loát"],["tv","Từ vựng – ngữ pháp"],["px","Phản xạ"]];
const DG_CI=["Nghe","Đọc hiểu","Viết chữ Hán","Phát âm · thanh điệu","Phản xạ nói","Từ vựng","Ngữ pháp","Làm bài về nhà đều đặn","Đi học đầy đủ, đúng giờ","Tập trung trên lớp"];
const DG_K={gk:"Giữa khóa",ck:"Cuối khóa"};
let DG={ui:{c:"",e:"",to:{},open:null},sheet:null,sheetErr:"",ft:null,q:{}};
try{Object.assign(DG.ui.to,JSON.parse(localStorage.getItem("ct_dg_to")||"{}"))}catch(e){}
if(typeof QT!="undefined"&&!QT.d.dg){QT.d.dg={};try{const o=JSON.parse(localStorage.getItem("ct_qt")||"{}");if(o.d&&o.d.dg)QT.d.dg=o.d.dg}catch(e){}}

/* ---------- dữ liệu ---------- */
const dgList=c=>Object.keys(QT.d.dg).filter(k=>k.startsWith(c+"|")&&QT.d.dg[k]&&!QT.d.dg[k].del).map(k=>Object.assign({key:k},QT.d.dg[k])).sort((a,b)=>(a.d||"").localeCompare(b.d||""));
const dgE=k=>{const E=QT.d.dg[k];return E&&!E.del?E:null};
function dgGet(k){const E=JSON.parse(JSON.stringify(QT.d.dg[k]||{}));delete E._t;E.r=E.r||{};return E}
function dgPut(k,E){qtPut("dg",k,E);dgSheetLater(k)}
function dgR(k,code){const E=dgGet(k);E.r[code]=E.r[code]||{};return E}
const dgNum=v=>{if(v==null||v==="")return null;const n=parseFloat(String(v).replace(",","."));return isNaN(n)?null:n};
const dgFmt=n=>n==null?"—":(Math.round(n*10)/10).toString().replace(".",",");
const dgCls=c=>(QT.d.lt[c]||{}).lv||(GV.data.hv.find(h=>h.cls==c)||{}).lv||null;
function dgLvName(c){const lv=(QT.d.lt[c]||{}).lv;return lv?gvLv(lv):""}
/* phần thi tổng hợp đang dùng của đợt */
const dgThParts=E=>DG_TH.filter(p=>(+((E.mx||{})[p[0]])||0)>0);
function dgTh(E,r){const P=dgThParts(E),th=(r&&r.th)||{};if(!P.length)return null;let s=0,m=0,ok=true;
 P.forEach(p=>{const v=dgNum(th[p[0]]),mx=+E.mx[p[0]];if(v==null)ok=false;else s+=v;m+=mx});
 return{s,m,p:ok?Math.round(s/m*100):null,ok,P:P.map(p=>({k:p[0],t:p[1],v:dgNum(th[p[0]]),m:+E.mx[p[0]]}))}}
function dgKn(E,r){const kn=(r&&r.kn)||{},mx=+E.knm||10;let s=0,ok=true;
 const P=DG_KN.map(p=>{const v=dgNum(kn[p[0]]);if(v==null)ok=false;else s+=v;return{k:p[0],t:p[1],v,m:mx}});
 return{s,m:mx*4,p:ok?Math.round(s/(mx*4)*100):null,ok,P}}
/* chuyên cần: tự tính theo lộ trình (điểm danh) đến ngày đánh giá; cô ghi tay "x/y" thì ưu tiên */
function dgCc(c,E,hh,r){let a=null;try{if(typeof qtKtData=="function"&&qtL(c))a=qtKtData(c,E.d||qtToday(),hh)}catch(e){a=null}
 const o={auto:a&&a.all.length?{p:a.pres.length,t:a.all.length}:null,web:a&&a.R.items.length?{ok:a.ok.length,t:a.R.items.length,avg:a.avg}:null};
 const m=String((r&&r.cc)||"").match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);o.man=m&&+m[2]?{p:+m[1],t:+m[2]}:null;
 o.use=o.man||o.auto;o.pc=o.use?Math.round(o.use.p/o.use.t*100):null;return o}
const dgCcLv=p=>p==null?"":p>=90?"Rất tốt":p>=80?"Tốt":p>=65?"Khá":"Cần cố gắng";
/* gợi ý đạt: tổng hợp và khẩu ngữ ≥ ngưỡng, chuyên cần ≥ 80% (nếu có số liệu) */
function dgHint(c,E,hh,r){const ng=+E.ng||60,T=dgTh(E,r),K=dgKn(E,r),C=dgCc(c,E,hh,r),why=[];
 if(T&&T.p==null||K.p==null)return{st:null,why:["chưa nhập đủ điểm"]};
 if(T&&T.p<ng)why.push(`tổng hợp ${T.p}% < ${ng}%`);if(K.p<ng)why.push(`khẩu ngữ ${K.p}% < ${ng}%`);if(C.pc!=null&&C.pc<80)why.push(`chuyên cần ${C.pc}% < 80%`);
 return{st:why.length?"c":"d",why}}
function dgNext(c){const lv=(QT.d.lt[c]||{}).lv,o=[];
 const up={1:"HSK 2",2:"HSK 3",3:"HSK 4",4:"HSK 5",5:"HSK 5",6:"HSK 2",7:"TOCFL B2"}[lv];
 if(up)o.push(`Lên lớp ${up}`);if(lv)o.push(`Học lại / củng cố ${gvLv(lv)}`);if(lv&&lv<=4)o.push(`Luyện đề thi ${gvLv(lv)}`);if(lv&&lv>=2&&lv<=4)o.push(`HSKK ${lv<=2?"Sơ cấp":lv==3?"Trung cấp":"Trung cấp"}`);
 o.push("Kèm 1-1 củng cố","Tiếng Trung giao tiếp");return o}
const dgTo=c=>DG.ui.to[c]||((typeof BCS!="undefined"&&BCS.to[c])||"ph");
function dgSetTo(c,v){DG.ui.to[c]=v;try{localStorage.setItem("ct_dg_to",JSON.stringify(DG.ui.to))}catch(e){}gvDraw()}

/* ---------- chép sang trang tính "Đánh giá khóa" ---------- */
function dgSheetLater(k){DG.q[k]=1;clearTimeout(DG.ft);DG.ft=setTimeout(dgSheetPush,1800)}
function dgRows(k){const E=dgE(k);if(!E)return[];const c=k.split("|")[0];
 return Object.keys(E.r||{}).map(code=>{const r=E.r[code],hh=GV.data.hv.find(x=>x.code==code)||{code,name:code};
  const T=dgTh(E,r),K=dgKn(E,r),C=dgCc(c,E,hh,r),has=T&&T.P.some(p=>p.v!=null)||K.P.some(p=>p.v!=null)||r.td!=null||r.kq||r.nx||r.mt;if(!has)return null;
  const th=k2=>{const p=T&&T.P.find(x=>x.k==k2);return p?(p.v==null?"":dgFmt(p.v)+"/"+p.m):""},kn=k2=>{const p=K.P.find(x=>x.k==k2);return p.v==null?"":dgFmt(p.v)};
  return{key:k+"|"+code,v:[c,DG_K[E.k]||"",E.d||"",code,hh.name,th("n"),th("r"),th("w"),T&&T.p!=null?T.p+"%":"",kn("pa"),kn("ll"),kn("tv"),kn("px"),K.p!=null?K.p+"%":"",
   C.use?`${C.use.p}/${C.use.t} (${C.pc}%)`:"",C.web?`${C.web.ok}/${C.web.t} bài đạt`:"",r.td!=null?DG_TD[r.td]:"",r.kq=="d"?"ĐẠT":r.kq=="c"?"CHƯA ĐẠT":"",
   r.mt||"",[...(r.ci||[]),r.ct||""].filter(Boolean).join("; "),r.kt||"",r.nx||"",[r.sent&&r.sent.ph?"PH":"",r.sent&&r.sent.hv?"HV":""].filter(Boolean).join(", ")]}}).filter(Boolean)}
async function dgSheetPush(){if(QT.srv!==true||typeof trkPost!="function"){return}const ks=Object.keys(DG.q);if(!ks.length)return;DG.q={};
 const rows=[],dels=[];ks.forEach(k=>{if(QT.d.dg[k]&&QT.d.dg[k].del)dels.push(k+"|");else rows.push(...dgRows(k))});if(!rows.length&&!dels.length)return;
 try{const r=await trkPost({a:"dgsheet",pass:GV.pass,rows,dels});if(r&&r.dg&&r.ok){DG.sheet=true;DG.sheetErr=""}else if(r&&r.dg){DG.sheet=true;DG.sheetErr="Chưa chép được sang trang tính Đánh giá khóa ("+(r.err||r.msg||"lỗi")+")."}else DG.sheet=false}
 catch(e){DG.sheetErr="Mất kết nối khi chép sang trang tính Đánh giá khóa.";ks.forEach(k=>DG.q[k]=1)}
 const b=$("dgsh");if(b)b.outerHTML=dgSheetBar()}
function dgSheetAll(){Object.keys(QT.d.dg).forEach(k=>DG.q[k]=1);clearTimeout(DG.ft);DG.sheet=null;dgSheetPush().then(()=>{const b=$("dgsh");if(b)b.outerHTML=dgSheetBar()})}
function dgSheetBar(){let t="";
 if(QT.srv!==true)t="";
 else if(DG.sheet===false)t=`<div class="qtsrv warn" id="dgsh">Kết quả đánh giá đã lưu (cùng chỗ với lộ trình). Muốn xem thành <b>bảng</b> trên Google Sheets (trang tính <b>Đánh giá khóa</b>, mỗi học viên một dòng), cô cài thêm đoạn mã <b>huong-dan/danhgia-api.gs.txt</b> rồi bấm <button class="btn o sm" onclick="dgSheetAll()">↻ Chép lại toàn bộ</button></div>`;
 else if(DG.sheetErr)t=`<div class="qtsrv warn" id="dgsh">${gvE(DG.sheetErr)} <button class="btn o sm" onclick="dgSheetAll()">Thử lại</button></div>`;
 else if(DG.sheet)t=`<div class="qtsrv ok" id="dgsh">✔ Đã chép sang trang tính <b>Đánh giá khóa</b> trên Google Sheets.</div>`;
 return t||`<div id="dgsh"></div>`}

/* ================= 🎓 TAB ĐÁNH GIÁ ================= */
function dgTab(F){const cls=qtCls();if(!DG.ui.c||!cls.includes(DG.ui.c))DG.ui.c=GV.cls&&cls.includes(GV.cls)?GV.cls:"";
 let h=`${qtSrvBar()}${dgSheetBar()}<div class="card"><b>Chọn lớp</b><div class="row dgcls">${cls.map(c=>{const n=dgList(c).length;return `<button class="btn sm ${c==DG.ui.c?"":"o"}" onclick="DG.ui.c=${qtJ(c)};DG.ui.e='';gvDraw()">${gvE(c)}${n?` <small>· ${n} đợt</small>`:""}</button>`}).join("")}</div></div>`;
 if(!DG.ui.c)return h+`<p class="ctx">Chọn một lớp để tạo đợt đánh giá giữa khóa / cuối khóa. Mỗi đợt có form cố định cho từng học viên; kết quả lưu lên Google Sheets và in được phiếu báo cáo (ảnh / PDF) gửi phụ huynh, học viên qua Zalo.</p>`;
 const c=DG.ui.c,L=dgList(c);if(DG.ui.e&&DG.ui.e!="new"&&!dgE(DG.ui.e))DG.ui.e="";if(!DG.ui.e&&L.length&&DG.ui.e!=="new")DG.ui.e=L[L.length-1].key;
 h+=`<div class="card"><div class="dghd"><b>Đợt đánh giá lớp ${gvE(c)}</b><span class="row">${L.map(E=>`<button class="btn sm ${E.key==DG.ui.e?"":"o"}" onclick="DG.ui.e=${qtJ(E.key)};gvDraw()">${DG_K[E.k]} · ${qtDM(E.d)}</button>`).join("")}<button class="btn sm ${DG.ui.e=="new"||!L.length?"":"o"}" onclick="DG.ui.e='new';gvDraw()">＋ Đợt mới</button></span></div>`;
 if(DG.ui.e=="new"||!L.length)return h+dgNewForm(c)+`</div>`;
 const k=DG.ui.e,E=dgE(k),hv=qtHv(c);
 h+=dgCfg(c,k,E)+`</div>`;
 h+=dgSum(c,k,E,hv);
 h+=`<div class="dglist">${hv.map(x=>dgCard(c,k,E,x)).join("")}</div>`;
 if(!hv.length)h+=`<p class="ctx">Lớp chưa có học viên (trang tính Học viên).</p>`;
 return h}
/* tạo đợt mới: ngày mặc định = buổi "Kiểm tra" gần nhất trong lộ trình */
function dgNewForm(c){const L=qtL(c),T=qtToday();let d=T;
 if(L){const S=qtSched(L).filter(x=>x.s.k=="kt"&&x.d);const f=S.find(x=>x.d>=T)||S[S.length-1];if(f)d=f.d}
 const lv=(QT.d.lt[c]||{}).lv||0,w=lv>=3&&lv!=6?100:0;
 return `<div class="dgnew"><p class="ctx">Tạo đợt đánh giá mới. Thang điểm từng phần theo đề cô ra (phần nào không thi thì để 0). Ngày mặc định lấy theo buổi "Kiểm tra" trong lộ trình.</p>
<div class="qtedg"><label class="qtf">Loại<select class="tin" id="dgn_k"><option value="ck">Cuối khóa</option><option value="gk">Giữa khóa</option></select></label>
<label class="qtf">Ngày đánh giá<input class="tin" type="date" id="dgn_d" value="${d}"></label>
<label class="qtf">Thang điểm Nghe<input class="tin" type="number" min="0" inputmode="decimal" id="dgn_n" value="100"></label>
<label class="qtf">Thang điểm Đọc<input class="tin" type="number" min="0" inputmode="decimal" id="dgn_r" value="100"></label>
<label class="qtf">Thang điểm Viết<input class="tin" type="number" min="0" inputmode="decimal" id="dgn_w" value="${w}"></label>
<label class="qtf">Khẩu ngữ: mỗi tiêu chí /<input class="tin" type="number" min="1" inputmode="decimal" id="dgn_km" value="10"></label>
<label class="qtf">Ngưỡng gợi ý Đạt (%)<input class="tin" type="number" min="0" max="100" id="dgn_ng" value="60"></label></div>
<button class="btn" onclick="dgNew(${qtJ(c)})">Tạo đợt đánh giá</button></div>`}
function dgNew(c){const g=id=>($(id)||{}).value,k=g("dgn_k")||"ck",d=g("dgn_d")||qtToday(),key=c+"|"+k+"|"+d;
 if(dgE(key)){DG.ui.e=key;gvDraw();return}
 dgPut(key,{k,d,mx:{n:+g("dgn_n")||0,r:+g("dgn_r")||0,w:+g("dgn_w")||0},knm:+g("dgn_km")||10,ng:+g("dgn_ng")||60,r:{}});DG.ui.e=key;gvDraw()}
function dgCfg(c,k,E){const P=dgThParts(E);
 return `<details class="dgcfg"><summary>${DG_K[E.k]} · ${qtTD(E.d)}/${(E.d||"").slice(0,4)} · Tổng hợp: ${P.map(p=>p[1]+" /"+E.mx[p[0]]).join(", ")||"chưa đặt thang"} · Khẩu ngữ 4 tiêu chí /${E.knm||10} · Gợi ý đạt ≥ ${E.ng||60}% <small>(bấm để sửa)</small></summary>
<div class="qtedg"><label class="qtf">Ngày<input class="tin" type="date" value="${E.d}" onchange="dgCfgSet(${qtJ(k)},'d',this.value)"></label>
${DG_TH.map(p=>`<label class="qtf">Thang ${p[1]}<input class="tin" type="number" min="0" value="${(E.mx||{})[p[0]]||0}" onchange="dgCfgSet(${qtJ(k)},'mx.${p[0]}',+this.value||0)"></label>`).join("")}
<label class="qtf">Khẩu ngữ /tiêu chí<input class="tin" type="number" min="1" value="${E.knm||10}" onchange="dgCfgSet(${qtJ(k)},'knm',+this.value||10)"></label>
<label class="qtf">Ngưỡng gợi ý (%)<input class="tin" type="number" min="0" max="100" value="${E.ng||60}" onchange="dgCfgSet(${qtJ(k)},'ng',+this.value||60)"></label></div>
<button class="btn o sm" onclick="dgDel(${qtJ(k)})">🗑 Xóa đợt này</button></details>`}
function dgCfgSet(k,f,v){const E=dgGet(k);if(f=="d"){if(!v||v==E.d)return;const nk=k.split("|").slice(0,2).join("|")+"|"+v;if(dgE(nk)){ask("Đã có đợt cùng loại vào ngày này.",null,1);gvDraw();return}
  E.d=v;dgPut(nk,E);dgPut(k,{del:1,r:{}});DG.ui.e=nk;gvDraw();return}
 if(f.startsWith("mx.")){E.mx=E.mx||{};E.mx[f.slice(3)]=v}else E[f]=v;dgPut(k,E);gvDraw()}
function dgDel(k){ask("Xóa đợt đánh giá này cùng toàn bộ điểm đã nhập?",()=>{dgPut(k,{del:1,r:{}});DG.ui.e="";gvDraw()})}

/* tóm tắt cả lớp */
function dgSum(c,k,E,hv){const rows=hv.map(hh=>{const r=(E.r||{})[hh.code]||{},T=dgTh(E,r),K=dgKn(E,r),C=dgCc(c,E,hh,r),H=dgHint(c,E,hh,r);return{hh,r,T,K,C,H}});
 const d=rows.filter(x=>x.r.kq=="d").length,cn=rows.filter(x=>x.r.kq=="c").length,sent=rows.filter(x=>x.r.sent&&(x.r.sent.ph||x.r.sent.hv)).length;
 const th=dgThParts(E).length;
 return `<div class="card dgsum" id="dgsum"><div class="dghd"><b>Tổng hợp lớp</b><span class="dgpills"><span class="ok">✅ Đạt ${d}</span><span class="no">⛔ Chưa đạt ${cn}</span><span>⏳ Chưa chốt ${hv.length-d-cn}</span><span>📤 Đã gửi phiếu ${sent}/${hv.length}</span></span></div>
<div class="dgtw"><table class="gvt dgt"><thead><tr><th>Học viên</th>${th?"<th>Tổng hợp</th>":""}<th>Khẩu ngữ</th><th>Chuyên cần</th><th>Thái độ</th><th>Kết quả</th></tr></thead><tbody>
${rows.map(x=>`<tr onclick="dgGo('${x.hh.code}')"><td><b>${gvE(x.hh.name)}</b></td>${th?`<td>${x.T&&x.T.p!=null?gvSc(x.T.p):"<span class='gvna'>—</span>"}</td>`:""}<td>${x.K.p!=null?gvSc(x.K.p):"<span class='gvna'>—</span>"}</td><td>${x.C.pc!=null?`${x.C.use.p}/${x.C.use.t}`:"—"}</td><td>${x.r.td!=null?DG_TD[x.r.td]:"—"}</td><td>${x.r.kq=="d"?`<b class="dgok">ĐẠT</b>`:x.r.kq=="c"?`<b class="dgno">CHƯA ĐẠT</b>`:`<small class="ctx">${x.H.st=="d"?"gợi ý: đạt":x.H.st=="c"?"gợi ý: chưa đạt":"chưa đủ điểm"}</small>`}</td></tr>`).join("")}</tbody></table></div>
<small class="ctx">Bấm tên để tới phiếu của bạn đó. Gửi phiếu cho: <button class="btn sm ${dgTo(c)=="ph"?"":"o"}" onclick="dgSetTo(${qtJ(c)},'ph')">Phụ huynh</button> <button class="btn sm ${dgTo(c)=="hv"?"":"o"}" onclick="dgSetTo(${qtJ(c)},'hv')">Học viên</button></small></div>`}
function dgGo(code){const e=$("dgc_"+code);if(e){e.scrollIntoView({behavior:"smooth",block:"start"});e.classList.add("hl");setTimeout(()=>e.classList.remove("hl"),1500)}}

/* thẻ của một học viên */
function dgCard(c,k,E,hh){const r=(E.r||{})[hh.code]||{},T=dgTh(E,r),K=dgKn(E,r),C=dgCc(c,E,hh,r),H=dgHint(c,E,hh,r),J=qtJ(k),co=`'${hh.code}'`;
 const inp=(grp,f,v,mx)=>`<label class="dgin"><span>${f}</span><span><input class="tin" type="number" min="0" max="${mx}" step="0.5" inputmode="decimal" value="${v==null?"":gvE(v)}" oninput="dgIn(${J},${co},'${grp}',this)" data-f="${grp=="th"?DG_TH.find(p=>p[1]==f)[0]:DG_KN.find(p=>p[1]==f)[0]}"><i>/${mx}</i></span></label>`;
 return `<div class="card dgc ${r.kq=="d"?"d":r.kq=="c"?"c":""}" id="dgc_${hh.code}"><div class="qtsch"><b>${gvE(hh.name)}</b><small class="ctx">${gvE(hh.code)}</small></div>
${T?`<div class="dgsec"><div class="dgsh">1. Bài thi tổng hợp <b id="dgth_${hh.code}">${T.p!=null?`${dgFmt(T.s)}/${T.m} · ${T.p}%`:""}</b></div><div class="dggr">${T.P.map(p=>inp("th",p.t,(r.th||{})[p.k],p.m)).join("")}</div></div>`:""}
<div class="dgsec"><div class="dgsh">${T?2:1}. Khẩu ngữ <b id="dgkn_${hh.code}">${K.p!=null?`${dgFmt(K.s)}/${K.m} · ${K.p}%`:""}</b></div><div class="dggr">${K.P.map(p=>inp("kn",p.t,(r.kn||{})[p.k],p.m)).join("")}</div></div>
<div class="dgsec"><div class="dgsh">Chuyên cần</div><div class="dgcc"><span>${C.auto?`Điểm danh theo lộ trình: <b>${C.auto.p}/${C.auto.t}</b> buổi (${Math.round(C.auto.p/C.auto.t*100)}%)`:"Chưa có lộ trình / điểm danh"}${C.web?` · Bài về nhà web: <b>${C.web.ok}/${C.web.t}</b> bài đạt`:""}</span>
<label class="qtf in">Sửa tay (có mặt/tổng)<input class="tin dgsm" placeholder="vd 22/24" value="${gvE(r.cc||"")}" onchange="dgSet(${J},${co},'cc',this.value.trim())"></label></div></div>
<div class="dgsec"><div class="dgsh">Thái độ học</div><div class="qtlv">${DG_TD.map((v,j)=>`<button class="${r.td===j?"on l"+j:""}" onclick="dgSet(${J},${co},'td',${r.td===j?"null":j},1)">${v}</button>`).join("")}</div></div>
<div class="dgsec"><div class="dgsh">Điểm mạnh</div><textarea class="tin" rows="2" placeholder="vd: phát âm chuẩn, chăm phát biểu, viết chữ đẹp" oninput="dgSet(${J},${co},'mt',this.value)">${gvE(r.mt||"")}</textarea></div>
<div class="dgsec"><div class="dgsh">Cần cải thiện</div><div class="dgchips">${DG_CI.map(x=>`<button class="${(r.ci||[]).includes(x)?"on":""}" onclick="dgCi(${J},${co},${qtJ(x)})">${gvE(x)}</button>`).join("")}</div>
<textarea class="tin" rows="2" placeholder="Ghi cụ thể thêm (vd: thanh 3 còn lên giọng, chưa phân biệt 的/得)" oninput="dgSet(${J},${co},'ct',this.value)">${gvE(r.ct||"")}</textarea></div>
<div class="dgsec"><div class="dgsh">Khóa học tiếp theo</div><input class="tin" list="dgnx_${hh.code}" value="${gvE(r.kt||"")}" placeholder="Chọn hoặc gõ" onchange="dgSet(${J},${co},'kt',this.value.trim())"><datalist id="dgnx_${hh.code}">${dgNext(c).map(x=>`<option value="${gvE(x)}">`).join("")}</datalist></div>
<div class="dgsec"><div class="dgsh">Nhận xét của cô</div><textarea class="tin" rows="3" placeholder="Nhận xét chung về quá trình học" oninput="dgSet(${J},${co},'nx',this.value)">${gvE(r.nx||"")}</textarea></div>
<div class="dgsec dgkq"><div class="dgsh">Kết quả <small class="ctx" id="dghi_${hh.code}">${dgHintTxt(H)}</small></div><div class="row"><button class="btn sm dgbd ${r.kq=="d"?"on":""}" onclick="dgSet(${J},${co},'kq',${r.kq=="d"?"null":"'d'"},1)">✅ ĐẠT</button><button class="btn sm dgbc ${r.kq=="c"?"on":""}" onclick="dgSet(${J},${co},'kq',${r.kq=="c"?"null":"'c'"},1)">⛔ CHƯA ĐẠT</button></div></div>
<div class="row dgact"><button class="btn" onclick="dgOpen(${J},${co})">📄 Phiếu báo cáo</button>${r.sent&&(r.sent.ph||r.sent.hv)?`<small class="dgsent">📤 Đã gửi ${[r.sent.ph?"phụ huynh":"",r.sent.hv?"học viên":""].filter(Boolean).join(", ")}</small>`:""}</div></div>`}
const dgHintTxt=H=>H.st==null?"· máy gợi ý khi nhập đủ điểm":H.st=="d"?"· máy gợi ý: ĐẠT (cô quyết định)":`· máy gợi ý: chưa đạt — ${H.why.join(", ")} (cô quyết định)`;
function dgIn(k,code,grp,el){const E=dgR(k,code),r=E.r[code];r[grp]=r[grp]||{};r[grp][el.dataset.f]=el.value;dgPut(k,E);
 const hh=GV.data.hv.find(x=>x.code==code)||{code},c=k.split("|")[0],T=dgTh(E,r),K=dgKn(E,r),H=dgHint(c,E,hh,r);
 const a=$("dgth_"+code),b=$("dgkn_"+code),hi=$("dghi_"+code);if(a)a.textContent=T&&T.p!=null?`${dgFmt(T.s)}/${T.m} · ${T.p}%`:"";if(b)b.textContent=K.p!=null?`${dgFmt(K.s)}/${K.m} · ${K.p}%`:"";if(hi)hi.textContent=dgHintTxt(H);
 clearTimeout(DG.st);DG.st=setTimeout(()=>{const o=$("dgsum"),E2=dgE(k);if(o&&E2)o.outerHTML=dgSum(c,k,E2,qtHv(c))},400)}
function dgSet(k,code,f,v,re){const E=dgR(k,code);if(v===null||v==="")delete E.r[code][f];else E.r[code][f]=v;dgPut(k,E);if(re)gvDraw()}
function dgCi(k,code,x){const E=dgR(k,code),r=E.r[code],a=r.ci||[];r.ci=a.includes(x)?a.filter(y=>y!=x):[...a,x];dgPut(k,E);gvDraw()}

/* ================= PHIẾU BÁO CÁO ================= */
function dgMsg(k,code,to){const E=dgE(k),c=k.split("|")[0],r=(E.r||{})[code]||{},hh=GV.data.hv.find(x=>x.code==code)||{name:code},ph=to=="ph";
 const T=dgTh(E,r),K=dgKn(E,r),C=dgCc(c,E,hh,r),L=[];
 L.push(ph?`Kính gửi phụ huynh bạn ${hh.name}!`:`Chào ${hh.name}!`);
 L.push(`Cô Thảo gửi ${ph?"phụ huynh ":"em "}kết quả đánh giá ${(DG_K[E.k]||"").toLowerCase()} lớp ${c} (${qtTD(E.d)}/${(E.d||"").slice(0,4)}):`);
 if(T&&T.P.some(p=>p.v!=null))L.push(`• Bài thi tổng hợp: ${T.p!=null?dgFmt(T.s)+"/"+T.m+` (${T.p}%)`:"chưa đủ điểm"} — ${T.P.map(p=>p.t+" "+(p.v==null?"—":dgFmt(p.v))+"/"+p.m).join(" · ")}`);
 if(K.P.some(p=>p.v!=null))L.push(`• Khẩu ngữ: ${K.p!=null?dgFmt(K.s)+"/"+K.m+` (${K.p}%)`:"chưa đủ điểm"} — ${K.P.map(p=>p.t+" "+(p.v==null?"—":dgFmt(p.v))).join(" · ")}`);
 if(C.use||C.web)L.push(`• Chuyên cần: ${C.use?`${C.use.p}/${C.use.t} buổi (${dgCcLv(C.pc)})`:""}${C.use&&C.web?" · ":""}${C.web?`bài về nhà trên web ${C.web.ok}/${C.web.t} bài đạt`:""}`);
 if(r.td!=null)L.push(`• Thái độ học: ${DG_TD[r.td]}`);
 if(r.kq)L.push(`• Kết quả: ${r.kq=="d"?"ĐẠT ✅":"CHƯA ĐẠT"}`);
 if(r.mt&&r.mt.trim())L.push(`• Điểm mạnh: ${r.mt.trim()}`);
 const ci=[...(r.ci||[]),(r.ct||"").trim()].filter(Boolean);if(ci.length)L.push(`• Cần cải thiện: ${ci.join("; ")}`);
 if(r.kt)L.push(`• Khóa học tiếp theo cô đề xuất: ${r.kt}`);
 if(r.nx&&r.nx.trim())L.push(`Nhận xét của cô: ${r.nx.trim()}`);
 L.push("");L.push(ph?"Cảm ơn phụ huynh đã luôn đồng hành cùng con và cô!":"Cô cảm ơn em đã cố gắng, tiếp tục giữ vững tinh thần nhé!");L.push("— Cô Thảo tiếng Trung · 0366 534 081");return L.join("\n")}

let DG_LOGO=null;function dgLogo(){if(DG_LOGO)return Promise.resolve(DG_LOGO);return new Promise(ok=>{const i=new Image();i.onload=()=>{DG_LOGO=i;ok(i)};i.onerror=()=>ok(null);i.src="img/logo.webp"})}
/* vẽ phiếu lên canvas: chạy 2 lượt (đo chiều cao rồi vẽ) */
function dgDraw(cv,k,code,to,logo){const E=dgE(k),c=k.split("|")[0],r=(E.r||{})[code]||{},hh=GV.data.hv.find(x=>x.code==code)||{name:code},ph=to=="ph";
 const T=dgTh(E,r),K=dgKn(E,r),C=dgCc(c,E,hh,r),W=1080,P=64,F='"Be Vietnam Pro","Segoe UI",Arial,sans-serif',M="#5c1730",M2="#8e2a4f",G="#c9a227",KM="#fbf5e6",TX="#2b1a20",SB="#6b5560",GR="#2e7d4f",RD="#b23a48";
 const run=(x)=>{let y=0;const fnt=(w,s)=>{x.font=`${w} ${s}px ${F}`};
  const wrap=(t,mw)=>{const out=[];String(t).split("\n").forEach(par=>{let line="";par.split(" ").forEach(w=>{const tt=line?line+" "+w:w;if(x.measureText(tt).width>mw&&line){out.push(line);line=w}else line=tt});out.push(line)});return out};
  const text=(t,xx,yy,col,al)=>{x.fillStyle=col||TX;x.textAlign=al||"left";x.fillText(t,xx,yy)};
  const rr=(xx,yy,w,h,rad,col)=>{x.fillStyle=col;x.beginPath();x.roundRect?x.roundRect(xx,yy,w,h,rad):x.rect(xx,yy,w,h);x.fill()};
  /* nền */
  x.fillStyle=KM;x.fillRect(0,0,W,cv.height);
  /* đầu phiếu */
  const g=x.createLinearGradient(0,0,W,0);g.addColorStop(0,M);g.addColorStop(1,M2);x.fillStyle=g;x.fillRect(0,0,W,250);x.fillStyle=G;x.fillRect(0,250,W,8);
  if(logo){x.save();x.beginPath();x.arc(P+62,125,62,0,Math.PI*2);x.fillStyle="#fff";x.fill();x.clip();x.drawImage(logo,P,63,124,124);x.restore();x.strokeStyle=G;x.lineWidth=5;x.beginPath();x.arc(P+62,125,62,0,Math.PI*2);x.stroke()}
  const tx=logo?P+156:P;fnt(700,26);text("CÔ THẢO TIẾNG TRUNG",tx,92,"#f3d98b");
  fnt(800,42);text(`PHIẾU KẾT QUẢ ${(DG_K[E.k]||"").toUpperCase()}`,tx,148,"#fff");
  fnt(500,24);text(`Lớp ${c}${dgLvName(c)?" · "+dgLvName(c):""} · Ngày đánh giá ${qtDM(E.d)}/${(E.d||"").slice(0,4)}`,tx,194,"#f1d9e1");
  y=258+44;
  /* học viên + kết quả */
  fnt(500,24);text(ph?"Kính gửi phụ huynh học viên":"Học viên",P,y,SB);
  fnt(800,40);text(hh.name,P,y+50,M);
  if(r.kq){const ok=r.kq=="d",bw=280,bx=W-P-bw;rr(bx,y-26,bw,84,18,ok?GR:RD);fnt(800,36);text(ok?"ĐẠT":"CHƯA ĐẠT",bx+bw/2,y+30,"#fff","center")}
  y+=96;
  const sec=(n,t)=>{y+=18;fnt(800,28);text(`${n}. ${t}`,P,y,M);x.fillStyle=G;x.fillRect(P,y+12,90,4);y+=44};
  const bar=(lb,v,m,sfx)=>{fnt(600,24);text(lb,P,y,TX);fnt(700,24);text(v==null?"—":`${dgFmt(v)}/${m}${sfx||""}`,W-P,y,TX,"right");
   const bx=P+330,bw=W-P-bx-150;rr(bx,y-18,bw,18,9,"#eadfc4");if(v!=null&&m)rr(bx,y-18,Math.max(18,bw*Math.min(1,v/m)),18,9,v/m>=0.8?GR:v/m>=(+E.ng||60)/100?G:RD);y+=46};
  const tot=(o)=>{rr(P,y-30,W-2*P,52,12,"#fff");fnt(800,26);text("Tổng điểm",P+18,y+4,M);text(o.p!=null?`${dgFmt(o.s)}/${o.m}  ·  ${o.p}%`:"chưa đủ điểm",W-P-18,y+4,M,"right");y+=62};
  let n=1;
  if(T){sec(n++,"Bài thi tổng hợp");T.P.forEach(p=>bar(p.t,p.v,p.m));tot(T)}
  sec(n++,"Khẩu ngữ");K.P.forEach(p=>bar(p.t,p.v,p.m));tot(K);
  sec(n++,"Chuyên cần và thái độ học");
  const kv=(a,b,col)=>{fnt(600,24);text(a,P,y,TX);fnt(700,24);const ls=wrap(b,W-2*P-340);ls.forEach((l,i)=>text(l,W-P,y+i*34,col||TX,"right"));y+=34*ls.length+12};
  kv("Đi học",C.use?`${C.use.p}/${C.use.t} buổi · ${C.pc}% (${dgCcLv(C.pc)})`:"—");
  if(C.web)kv("Bài về nhà trên web",`${C.web.ok}/${C.web.t} bài đạt`);
  kv("Thái độ học",r.td!=null?DG_TD[r.td]:"—",r.td==null?TX:r.td<=1?GR:r.td==2?"#8a6d0b":RD);
  const para=(t,body)=>{if(!body)return;sec(n++,t);fnt(400,25);wrap(body,W-2*P).forEach(l=>{text(l,P,y,TX);y+=38});y+=6};
  para("Điểm mạnh",(r.mt||"").trim());
  const ci=[...(r.ci||[])],ct=(r.ct||"").trim();
  if(ci.length||ct){sec(n++,"Cần cải thiện");if(ci.length){fnt(600,22);let cx=P;ci.forEach(t=>{const w=x.measureText(t).width+32;if(cx+w>W-P){cx=P;y+=50}rr(cx,y-28,w,40,20,"#fff3d0");x.strokeStyle=G;x.lineWidth=1.5;x.beginPath();x.roundRect?x.roundRect(cx,y-28,w,40,20):x.rect(cx,y-28,w,40);x.stroke();text(t,cx+16,y,"#6d5208");cx+=w+10});y+=56}
   if(ct){fnt(400,25);wrap(ct,W-2*P).forEach(l=>{text(l,P,y,TX);y+=38})}y+=6}
  if(r.kt){sec(n++,"Khóa học tiếp theo cô đề xuất");rr(P,y-32,W-2*P,58,14,"#fff");x.fillStyle=G;x.fillRect(P,y-32,8,58);fnt(700,27);text(r.kt,P+26,y+6,M);y+=60}
  para("Nhận xét của cô",(r.nx||"").trim());
  /* chân phiếu */
  y+=24;x.fillStyle=G;x.fillRect(P,y,W-2*P,2);y+=48;
  const y0=y;fnt(400,23);wrap(ph?"Cảm ơn phụ huynh đã luôn đồng hành cùng con và cô!":"Cô cảm ơn em đã cố gắng, tiếp tục giữ vững tinh thần nhé!",W-2*P-400).forEach(l=>{text(l,P,y,SB);y+=34});
  fnt(700,26);text("Cô Thảo tiếng Trung",W-P,y0,M,"right");fnt(400,21);text("0366 534 081 · KĐT Thanh Hà, Hà Đông",W-P,y0+34,SB,"right");
  return Math.max(y,y0+34)+50};
 return run}
async function dgRender(k,code,to){const logo=await dgLogo();try{await document.fonts.ready}catch(e){}
 const cv=document.createElement("canvas");cv.width=1080;cv.height=4000;const x=cv.getContext("2d");
 const h=dgDraw(cv,k,code,to,logo)(x);cv.height=Math.ceil(h);dgDraw(cv,k,code,to,logo)(cv.getContext("2d"));return cv}
async function dgOpen(k,code){const c=k.split("|")[0];DG.ui.open={k,code,to:dgTo(c)};dgModal()}
async function dgModal(){const o=DG.ui.open;if(!o)return;let d=$("dgmod");if(!d){d=document.createElement("div");d.id="dgmod";document.body.appendChild(d)}
 const hh=GV.data.hv.find(x=>x.code==o.code)||{name:o.code},r=((dgE(o.k)||{}).r||{})[o.code]||{};
 d.hidden=false;d.innerHTML=`<div class="dgmw" onclick="if(event.target===this)dgClose()"><div class="card dgmc"><div class="dghd"><b>Phiếu báo cáo · ${gvE(hh.name)}</b><button class="btn o sm" onclick="dgClose()">✕ Đóng</button></div>
<div class="row"><small>Bản cho:</small><button class="btn sm ${o.to=="ph"?"":"o"}" onclick="DG.ui.open.to='ph';dgModal()">Phụ huynh</button><button class="btn sm ${o.to=="hv"?"":"o"}" onclick="DG.ui.open.to='hv';dgModal()">Học viên</button></div>
<div class="dgimg" id="dgimg"><p class="ctx">Đang vẽ phiếu…</p></div>
<div class="row dgbtns"><button class="btn" onclick="dgShare(this)">📤 Gửi ảnh (Zalo…)</button><button class="btn o" onclick="dgDl()">⬇ Tải ảnh PNG</button><button class="btn o" onclick="dgPrint()">🖨 In / Lưu PDF</button><button class="btn o" onclick="qtCopy(dgMsg(DG.ui.open.k,DG.ui.open.code,DG.ui.open.to),this)">📋 Sao chép tin nhắn</button></div>
<label class="gvck"><input type="checkbox" ${r.sent&&r.sent[o.to]?"checked":""} onchange="dgSent(this.checked)"> Đã gửi ${o.to=="ph"?"phụ huynh":"học viên"}</label>
<small class="ctx">Trên điện thoại, "Gửi ảnh" mở bảng chia sẻ để chọn Zalo. Trên máy tính, cô tải ảnh rồi kéo vào Zalo, hoặc In / Lưu PDF.</small></div></div>`;
 const cv=await dgRender(o.k,o.code,o.to);DG.cv=cv;const im=$("dgimg");if(im){im.innerHTML="";const i=new Image();i.src=cv.toDataURL("image/png");i.alt="Phiếu báo cáo";im.appendChild(i)}}
function dgClose(){DG.ui.open=null;const d=$("dgmod");if(d){d.hidden=true;d.innerHTML=""}gvDraw()}
function dgSent(v){const o=DG.ui.open;if(!o)return;const E=dgR(o.k,o.code),r=E.r[o.code];r.sent=Object.assign({},r.sent||{});if(v)r.sent[o.to]=1;else delete r.sent[o.to];dgPut(o.k,E)}
const dgFile=()=>{const o=DG.ui.open,hh=GV.data.hv.find(x=>x.code==o.code)||{name:o.code},E=dgE(o.k);return `Phieu-${(DG_K[E.k]||"").replace(/\s/g,"")}-${hh.name.normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").replace(/\s+/g,"-")}.png`};
function dgDl(){if(!DG.cv)return;const a=document.createElement("a");a.download=dgFile();a.href=DG.cv.toDataURL("image/png");document.body.appendChild(a);a.click();a.remove();dgSent(true);const c=document.querySelector("#dgmod .gvck input");if(c)c.checked=true}
async function dgShare(btn){if(!DG.cv)return;const b=await new Promise(ok=>DG.cv.toBlob(ok,"image/png"));const f=new File([b],dgFile(),{type:"image/png"}),o=DG.ui.open;
 if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:dgMsg(o.k,o.code,o.to)});dgSent(true);const c=document.querySelector("#dgmod .gvck input");if(c)c.checked=true}catch(e){}}
 else{dgDl();btn.textContent="Máy không hỗ trợ chia sẻ — đã tải ảnh về";setTimeout(()=>{btn.textContent="📤 Gửi ảnh (Zalo…)"},2600)}}
function dgPrint(){if(!DG.cv)return;let p=$("dgpr");if(!p){p=document.createElement("div");p.id="dgpr";document.body.appendChild(p)}p.innerHTML=`<img src="${DG.cv.toDataURL("image/png")}">`;
 document.body.classList.add("dgprint");const done=()=>{document.body.classList.remove("dgprint");p.innerHTML="";window.removeEventListener("afterprint",done)};window.addEventListener("afterprint",done);setTimeout(()=>window.print(),120)}

/* ================= gắn vào Bảng theo dõi ================= */
(function(){const st=document.createElement("style");st.textContent=`
.dghd{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}.dghd .row{margin:0}
.dgcls small{opacity:.8}.dgnew .qtedg{grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}.dgcfg{margin-top:10px}.dgcfg summary{cursor:pointer;font-size:.9rem;color:var(--m)}.dgcfg summary small{color:var(--sub)}
.dgpills{display:flex;flex-wrap:wrap;gap:6px}.dgpills span{font-size:.82rem;border-radius:12px;padding:3px 10px;background:var(--k);border:1px solid var(--b)}.dgpills .ok{color:#2e7d4f}.dgpills .no{color:#b23a48}
.dgtw{overflow-x:auto;margin:8px 0}.dgt tbody tr{cursor:pointer}.dgt td,.dgt th{white-space:nowrap}.dgok{color:#2e7d4f}.dgno{color:#b23a48}
.dglist{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:12px;margin-top:12px}.dglist .card{margin:0}
.dgc{border-top:5px solid var(--b);scroll-margin-top:80px;transition:box-shadow .3s}.dgc.d{border-top-color:#2e7d4f}.dgc.c{border-top-color:#b23a48}.dgc.hl{box-shadow:0 0 0 3px var(--g)}
.dgsec{margin:10px 0 0;padding-top:8px;border-top:1px dashed var(--b)}.dgsh{font-weight:800;font-size:.9rem;color:var(--m);display:flex;justify-content:space-between;gap:6px;flex-wrap:wrap;margin-bottom:4px}.dgsh b{color:var(--t)}.dgsh small{font-weight:400}
.dggr{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:8px 10px}.dgin{display:flex;flex-direction:column;gap:2px;font-size:.84rem;font-weight:600}.dgin>span:last-child{display:flex;align-items:center;gap:4px}.dgin .tin{width:72px;margin:0;padding:6px;text-align:center;font-size:1rem}.dgin i{color:var(--sub);font-style:normal;font-size:.8rem}
.dgcc{display:flex;flex-direction:column;gap:4px;font-size:.88rem}.dgsm{max-width:110px}
.dgchips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px}.dgchips button{border:1px solid var(--b);background:var(--c);border-radius:14px;padding:4px 10px;font:500 .8rem inherit;cursor:pointer;color:var(--t)}.dgchips button.on{background:#fff3d0;border-color:var(--g);color:#6d5208;font-weight:700}
.dgsec .tin{margin:2px 0}.dgkq .btn.on.dgbd{background:#2e7d4f;border-color:#2e7d4f;color:#fff}.dgkq .btn.on.dgbc{background:#b23a48;border-color:#b23a48;color:#fff}.dgkq .btn:not(.on){background:var(--c);color:var(--t);border:1px solid var(--b)}
.dgact{margin-top:12px;align-items:center}.dgsent{color:#2e7d4f}
#dgmod[hidden]{display:none}.dgmw{position:fixed;inset:0;background:rgba(30,10,18,.55);z-index:200;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:16px}
.dgmc{max-width:620px;width:100%;margin:0}.dgimg{margin:10px 0;max-height:62vh;overflow:auto;border-radius:12px;border:1px solid var(--b);background:#fbf5e6}.dgimg img{width:100%;display:block}.dgbtns{margin:8px 0}
#dgpr{display:none}
@media print{body.dgprint>*:not(#dgpr){display:none!important}body.dgprint #dgpr{display:block!important}body.dgprint #dgpr img{width:100%;max-width:190mm;display:block;margin:0 auto}body.dgprint{background:#fff!important;padding:0!important}@page{margin:10mm}}`;document.head.appendChild(st)})();
