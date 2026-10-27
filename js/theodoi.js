/* ===== Bảng theo dõi cho cô Thảo · thêm 22/10/2026 =====
   Mở bằng liên kết "Dành cho giáo viên" ở cuối trang hoặc thêm #theodoi vào cuối địa chỉ trang.
   Đọc dữ liệu từ Google Sheets (cùng địa chỉ TRK_API của js/track.js), cần mật khẩu ở trang tính "Cài đặt".
   Nạp SAU js/track.js. ===== */
let GV={pass:"",data:null,tab:"tq",cls:"",days:30,lv:null,eb:"",es:"",stu:null,err:"",busy:false,more:0};
try{GV.pass=localStorage.getItem("ct_gv_pass")||sessionStorage.getItem("ct_gv_pass")||""}catch(e){}
const gvE=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const gvLv=l=>({1:"HSK 1",2:"HSK 2",3:"HSK 3",4:"HSK 4",5:"Mở rộng H4",6:"HSK1 · GT chuẩn"})[l]||("HSK "+l);
const gvT=ms=>{if(!ms)return"—";const d=new Date(ms),p=n=>String(n).padStart(2,"0");return `${p(d.getDate())}/${p(d.getMonth()+1)} ${p(d.getHours())}:${p(d.getMinutes())}`};
const gvAgo=ms=>{if(!ms)return"chưa vào";const d=Math.floor((Date.now()-ms)/864e5);return d<1?"hôm nay":d==1?"hôm qua":d+" ngày trước"};
const gvSc=v=>v==null?`<span class="gvna">—</span>`:`<b class="gvs ${v>=80?"ok":v>=50?"mid":"no"}">${v}%</b>`;
const PNM={rd:"Luyện đọc",fc:"Flashcard",gp:"Ngữ pháp",dt:"Nghe chép",ns:"Luyện nói",vt:"Viết",test:"Test"};

function gvSec(){let s=$("gv");if(!s){s=document.createElement("section");s.id="gv";document.querySelector("main").appendChild(s)}return s}
async function gvLoad(){if(!TRK_API){GV.err="Chưa gắn địa chỉ Google Sheets vào trang (TRK_URL trong js/track.js).";gvDraw();return}
 GV.busy=true;GV.err="";gvDraw();
 try{const r=await trkPost({a:"dash",pass:GV.pass,days:GV.days});
  if(r&&r.ok){GV.data=r;if(GV.lv==null){const ls=[...new Set(r.tt.map(x=>x.lv))].sort();GV.lv=ls[0]||1}}
  else{GV.err=r&&r.err=="pass"?"Mật khẩu chưa đúng.":"Lỗi máy chủ: "+(r&&(r.msg||r.err)||"không rõ");if(r&&r.err=="pass"){GV.data=null;try{localStorage.removeItem("ct_gv_pass");sessionStorage.removeItem("ct_gv_pass")}catch(e){}}}
 }catch(e){GV.err="Chưa kết nối được Google Sheets. Kiểm tra mạng rồi bấm Tải lại."}
 GV.busy=false;gvDraw()}
function gvLogin(){const v=($("gvpass").value||"").trim();if(!v)return;GV.pass=v;try{($("gvrem").checked?localStorage:sessionStorage).setItem("ct_gv_pass",v)}catch(e){}gvLoad()}
function gvLogout(){GV.pass="";GV.data=null;try{localStorage.removeItem("ct_gv_pass");sessionStorage.removeItem("ct_gv_pass")}catch(e){}gvDraw()}
function gvOpen(){go("gv");if(GV.pass&&!GV.data&&!GV.busy)gvLoad();else gvDraw()}
const gvSet=(k,v,re)=>{GV[k]=v;if(k!="more")GV.more=0;re?gvLoad():gvDraw()};

/* dữ liệu đã lọc theo lớp */
function gvF(){const D=GV.data,hv=D.hv.filter(h=>!GV.cls||h.cls==GV.cls),cs=new Set(hv.map(h=>h.code));
 return{hv,cs,tt:D.tt.filter(x=>cs.has(x.code)),tc:D.tc.filter(x=>cs.has(x.code)),ls:D.ls.filter(x=>cs.has(x.code)),nm:c=>(D.hv.find(h=>h.code==c)||{}).name||c}}

function gvDraw(){const s=gvSec(),D=GV.data;
 if(!D){s.innerHTML=`<h2>Bảng theo dõi học viên</h2><div class="card gvlog"><p>Trang dành cho cô Thảo. Nhập mật khẩu (ô B1 trang tính <b>Cài đặt</b> trong Google Sheets).</p>
<input class="tin" id="gvpass" type="password" placeholder="Mật khẩu" value="" onkeydown="if(event.key=='Enter')gvLogin()"><label class="gvck"><input type="checkbox" id="gvrem" checked> Ghi nhớ trên máy này</label>
<div class="row"><button class="btn" onclick="gvLogin()" ${GV.busy?"disabled":""}>${GV.busy?"Đang tải…":"Xem bảng theo dõi"}</button><button class="btn o" onclick="go('home')">Về trang chủ</button></div>${GV.err?`<p class="bad">${GV.err}</p>`:""}</div>`;return}
 const F=gvF(),cls=[...new Set(D.hv.map(h=>h.cls).filter(Boolean))].sort();
 s.innerHTML=`<h2>Bảng theo dõi học viên</h2>
<div class="gvbar"><label>Lớp <select onchange="gvSet('cls',this.value)"><option value="">Tất cả lớp</option>${cls.map(c=>`<option ${c==GV.cls?"selected":""}>${gvE(c)}</option>`).join("")}</select></label>
<label>Thời gian <select onchange="gvSet('days',+this.value,1)">${[7,30,60,120,365].map(d=>`<option value="${d}" ${d==GV.days?"selected":""}>${d} ngày qua</option>`).join("")}</select></label>
<button class="btn sm" onclick="gvLoad()" ${GV.busy?"disabled":""}>${GV.busy?"Đang tải…":"↻ Tải lại"}</button><button class="btn o sm" onclick="gvLogout()">Thoát</button>
<small>Cập nhật lúc ${gvT(D.now)}</small></div>${GV.err?`<p class="bad">${GV.err}</p>`:""}
<div class="stb gvtabs">${[["tq","👥 Tổng quan"],["dd","✋ Điểm danh"],["dg","📝 Tự đánh giá"],["td","📈 Tiến độ theo bài"],["ls","⚠️ Lỗi hay gặp"]].map(t=>`<button class="${GV.tab==t[0]&&!GV.stu?"on":""}" onclick="GV.stu=null;gvSet('tab','${t[0]}')">${t[1]}</button>`).join("")}</div>
${GV.stu?gvStu(F,GV.stu):({tq:gvTq,dd:gvDd,dg:gvDg,td:gvTd,ls:gvLs})[GV.tab](F)}`}

/* ---------- Tổng quan ---------- */
function gvPer(F,code){const tt=F.tt.filter(x=>x.code==code),tc=F.tc.filter(x=>x.code==code),last=Math.max(0,...tc.map(x=>x.at),...tt.map(x=>x.at||0),(GV.data.hv.find(h=>h.code==code)||{}).last||0);
 const study=tc.filter(x=>x.t=="Học bài"||x.t=="Làm test"),min=Math.round(study.reduce((a,x)=>a+(x.m||0),0)),days=new Set(tc.map(x=>new Date(x.at).toDateString())).size;
 const av=tt.map(x=>x.avg).filter(x=>x!=null),avg=av.length?Math.round(av.reduce((a,b)=>a+b,0)/av.length):null;
 const tests=tc.filter(x=>x.t=="Nộp test").sort((a,b)=>b.at-a.at),weak={};
 tt.forEach(x=>Object.keys(PNM).forEach(k=>{if(k!="test"&&x[k]!=null&&x[k]<80)weak[k]=(weak[k]||0)+1}));
 return{tt,tc,last,min,days,avg,test:tests[0],weak:Object.keys(weak).sort((a,b)=>weak[b]-weak[a]).slice(0,2)}}
function gvTq(F){const per=F.hv.map(h=>Object.assign({h},gvPer(F,h.code))),w7=Date.now()-7*864e5,act=F.hv.filter(h=>h.st!="Nghỉ");
 const on7=per.filter(p=>p.last>=w7).length,min=per.reduce((a,p)=>a+p.min,0),idle=per.filter(p=>p.h.st!="Nghỉ"&&p.last<w7);
 const low=per.filter(p=>p.avg!=null&&p.avg<80).sort((a,b)=>a.avg-b.avg);
 per.sort((a,b)=>b.last-a.last);
 return `<div class="gvst"><div class="card"><b>${act.length}</b><span>học viên đang học</span></div><div class="card"><b>${on7}/${act.length}</b><span>bạn vào học trong 7 ngày</span></div><div class="card"><b>${min>=120?Math.round(min/6)/10+" giờ":min+" phút"}</b><span>thời gian học (${GV.days} ngày)</span></div><div class="card"><b>${F.ls.length}</b><span>lượt làm sai ghi nhận</span></div></div>
${idle.length||low.length?`<div class="card gvwarn"><b>Cần chú ý</b><ul>${idle.length?`<li>Chưa vào học 7 ngày qua: ${idle.map(p=>`<a onclick="GV.stu='${p.h.code}';gvDraw()">${gvE(p.h.name)}</a>`).join(", ")}</li>`:""}${low.length?`<li>Điểm trung bình dưới 80%: ${low.map(p=>`<a onclick="GV.stu='${p.h.code}';gvDraw()">${gvE(p.h.name)}</a> (${p.avg}%)`).join(", ")}</li>`:""}</ul></div>`:""}
<div class="card gvtw"><table class="gvt"><thead><tr><th>Học viên</th><th>Lớp</th><th>Lần cuối vào</th><th>Số ngày học</th><th>Thời gian</th><th>Bài đã học</th><th>Điểm TB</th><th>Test gần nhất</th><th>Phần yếu</th></tr></thead><tbody>
${per.map(p=>`<tr onclick="GV.stu='${p.h.code}';gvDraw()" class="${p.h.st=="Nghỉ"?"off":""}"><td><b>${gvE(p.h.name)}</b><small>${p.h.code}</small></td><td>${gvE(p.h.cls)}</td><td>${gvAgo(p.last)}<small>${p.last?gvT(p.last):""}</small></td><td>${p.days}</td><td>${p.min} phút</td><td>${p.tt.length}</td><td>${gvSc(p.avg)}</td><td>${p.test?`${p.test.s} <small>${gvLv(p.test.lv)} · B${p.test.b}</small>`:"—"}</td><td>${p.weak.map(k=>`<span class="pill">${PNM[k]}</span>`).join("")||"—"}</td></tr>`).join("")||`<tr><td colspan="9">Chưa có học viên. Cô thêm Họ tên, Lớp vào trang tính "Học viên" rồi chọn menu Cô Thảo › Tạo mã.</td></tr>`}
</tbody></table></div><p class="ctx">Bấm vào tên học viên để xem chi tiết. "Thời gian" chỉ tính lúc học viên đang mở bài và có thao tác.</p>`}

/* ---------- Tiến độ theo bài ---------- */
function gvTd(F){const lvs=[...new Set(GV.data.tt.map(x=>x.lv))].sort();if(!lvs.length)return `<div class="card">Chưa có học viên nào làm bài.</div>`;
 if(!lvs.includes(GV.lv))GV.lv=lvs[0];const rows=F.tt.filter(x=>x.lv==GV.lv),bs=[...new Set(rows.map(x=>x.b))].sort((a,b)=>a-b);
 const cell=(c,b)=>{const x=rows.find(r=>r.code==c&&r.b==b);if(!x)return `<td class="gvna">·</td>`;
  const tip=Object.keys(PNM).filter(k=>x[k]!=null).map(k=>PNM[k]+" "+x[k]+"%").join(" · ");
  return `<td title="${gvE(tip)}">${gvSc(x.avg)}${x.test!=null?`<small>test ${x.test}%</small>`:""}</td>`};
 const avgB=b=>{const v=rows.filter(r=>r.b==b&&r.avg!=null).map(r=>r.avg);return v.length?Math.round(v.reduce((a,c)=>a+c,0)/v.length):null};
 return `<div class="row">${lvs.map(l=>`<button class="btn sm ${l==GV.lv?"":"o"}" onclick="gvSet('lv',${l})">${gvLv(l)}</button>`).join("")}</div>
<div class="card gvtw"><table class="gvt gvm"><thead><tr><th>Học viên</th>${bs.map(b=>`<th>Bài ${b}</th>`).join("")}</tr></thead><tbody>
${F.hv.map(h=>`<tr><td onclick="GV.stu='${h.code}';gvDraw()"><b>${gvE(h.name)}</b></td>${bs.map(b=>cell(h.code,b)).join("")}</tr>`).join("")}
<tr class="gvavg"><td>Trung bình</td>${bs.map(b=>`<td>${gvSc(avgB(b))}</td>`).join("")}</tr></tbody></table></div>
<p class="ctx">Ô màu = điểm trung bình các phần của bài (xanh từ 80%, vàng 50–79%, đỏ dưới 50%). Di chuột / chạm giữ vào ô để xem điểm từng phần.</p>`}

/* ---------- Lỗi hay gặp ---------- */
function gvGroup(ls){const G={};ls.forEach(e=>{const k=[e.lv,e.b,e.sec,e.c].join("|");const g=G[k]||(G[k]={lv:e.lv,b:e.b,sec:e.sec,q:e.q,c:e.c,who:new Set(),n:0,ans:{},last:0});g.who.add(e.code);g.n++;g.last=Math.max(g.last,e.at);
 const a=(e.a||"").trim();if(a&&a!=="(bỏ trống)"&&a!=="Chưa nhớ")g.ans[a]=(g.ans[a]||0)+1});
 return Object.values(G).sort((a,b)=>b.who.size-a.who.size||b.n-a.n)}
function gvLs(F){let ls=F.ls.filter(e=>e.lv==GV.lv||!GV.lv);const lvs=[...new Set(F.ls.map(e=>e.lv))].sort();if(lvs.length&&!lvs.includes(GV.lv))GV.lv=lvs[0];ls=F.ls.filter(e=>e.lv==GV.lv);
 const bs=[...new Set(ls.map(e=>e.b))].sort((a,b)=>a-b),secs=[...new Set(ls.map(e=>e.sec))].sort();
 if(GV.eb)ls=ls.filter(e=>e.b==GV.eb);if(GV.es)ls=ls.filter(e=>e.sec==GV.es);
 const G=gvGroup(ls),bySec={};ls.forEach(e=>bySec[e.sec]=(bySec[e.sec]||0)+1);const mx=Math.max(1,...Object.values(bySec));
 const did=(lv,b)=>F.tt.filter(x=>x.lv==lv&&x.b==b).length,lim=40+GV.more;
 if(!F.ls.length)return `<div class="card">Chưa ghi nhận lỗi sai nào${GV.cls?" của lớp này":""} trong ${GV.days} ngày qua.</div>`;
 return `<div class="row">${lvs.map(l=>`<button class="btn sm ${l==GV.lv?"":"o"}" onclick="GV.eb='';GV.es='';gvSet('lv',${l})">${gvLv(l)}</button>`).join("")}</div>
<div class="gvbar"><label>Bài <select onchange="gvSet('eb',this.value)"><option value="">Tất cả bài</option>${bs.map(b=>`<option value="${b}" ${b==GV.eb?"selected":""}>Bài ${b}</option>`).join("")}</select></label>
<label>Phần <select onchange="gvSet('es',this.value)"><option value="">Tất cả phần</option>${secs.map(x=>`<option ${x==GV.es?"selected":""}>${gvE(x)}</option>`).join("")}</select></label></div>
<div class="card"><b>Sai nhiều nhất theo phần</b>${Object.keys(bySec).sort((a,b)=>bySec[b]-bySec[a]).map(k=>`<div class="gvbr" onclick="gvSet('es','${gvE(k)}')"><span>${gvE(k)}</span><div class="tr"><i style="width:${Math.round(bySec[k]/mx*100)}%"></i></div><b>${bySec[k]}</b></div>`).join("")}</div>
<h3 class="ab-h">Câu / chỗ nhiều bạn sai (gợi ý chữa trên lớp)</h3>
${G.slice(0,lim).map((g,i)=>{const d=did(g.lv,g.b),top=Object.entries(g.ans).sort((a,b)=>b[1]-a[1]).slice(0,3);
 return `<div class="card gve"><div class="gveh"><span class="gvn">${i+1}</span><div><small>${gvLv(g.lv)} · Bài ${g.b} · ${gvE(g.sec)}</small>${g.q&&g.q!==g.c?`<div class="gvq">${gvE(g.q)}</div>`:""}<div>Đáp án đúng: <span class="zh gvc">${gvE(g.c)}</span></div></div>
<div class="gvcnt"><b>${g.who.size}${d?"/"+Math.max(d,g.who.size):""}</b><small>bạn sai</small></div></div>
${top.length?`<div class="gvans">Học viên thường viết / nói: ${top.map(a=>`<span><span class="zh">${gvE(a[0])}</span>${a[1]>1?` <i>×${a[1]}</i>`:""}</span>`).join("")}</div>`:""}
<small class="gvwho">${[...g.who].map(c=>gvE(F.nm(c))).join(", ")} · lần gần nhất ${gvT(g.last)}</small></div>`}).join("")}
${G.length>lim?`<div class="row c"><button class="btn o" onclick="gvSet('more',GV.more+40)">Xem thêm (${G.length-lim})</button></div>`:""}
<p class="ctx">Mỗi câu chỉ ghi lần sai đầu tiên của mỗi lần học viên làm bài. "x/y bạn sai": y là số bạn đã học bài đó.</p>`}

/* ---------- Chi tiết một học viên ---------- */
function gvStu(F,code){const h=GV.data.hv.find(x=>x.code==code);if(!h)return"";const p=gvPer(F,code),errs=F.ls.filter(e=>e.code==code).sort((a,b)=>b.at-a.at),acts=p.tc.slice().sort((a,b)=>b.at-a.at).slice(0,25);
 const tt=p.tt.slice().sort((a,b)=>a.lv-b.lv||a.b-b.b),bySec={};errs.forEach(e=>bySec[e.sec]=(bySec[e.sec]||0)+1);
 return `<div class="row"><button class="btn o sm" onclick="GV.stu=null;gvDraw()">← Danh sách</button></div>
<div class="card"><h3 style="margin:0">${gvE(h.name)}</h3><p>${gvE(h.cls)} · Mã ${h.code} · ${h.st||"Đang học"}</p><p>Lần cuối vào: <b>${gvAgo(p.last)}</b> · ${p.days} ngày học · ${p.min} phút trong ${GV.days} ngày qua · Điểm TB ${gvSc(p.avg)}</p>
${Object.keys(bySec).length?`<p>Hay sai ở: ${Object.keys(bySec).sort((a,b)=>bySec[b]-bySec[a]).map(k=>`<span class="pill">${gvE(k)} · ${bySec[k]}</span>`).join("")}</p>`:""}</div>
<div class="card gvtw"><b>Tiến độ từng bài</b><table class="gvt"><thead><tr><th>Bài</th><th>TB</th>${Object.keys(PNM).map(k=>`<th>${PNM[k]}</th>`).join("")}<th>Cập nhật</th></tr></thead><tbody>
${tt.map(x=>`<tr><td>${gvLv(x.lv)} · B${x.b}</td><td>${gvSc(x.avg)}</td>${Object.keys(PNM).map(k=>`<td>${x[k]==null?`<span class="gvna">—</span>`:gvSc(x[k])}</td>`).join("")}<td><small>${gvT(x.at)}</small></td></tr>`).join("")||`<tr><td colspan="10">Chưa làm bài nào.</td></tr>`}</tbody></table></div>
<div class="card"><b>Hoạt động gần đây</b><ul class="gvact">${acts.map(a=>`<li><small>${gvT(a.at)}</small> ${gvE(a.t)}${a.lv?` · ${gvLv(a.lv)} Bài ${a.b}`:""}${a.m?` · ${a.m} phút`:""}${a.s?` · <b>${gvE(a.s)}</b>`:""}${a.p?`<br><small>${gvE(a.p)}</small>`:""}</li>`).join("")||"<li>Chưa có.</li>"}</ul></div>
<div class="card"><b>Câu làm sai (${errs.length})</b>${errs.slice(0,60).map(e=>`<div class="gvel"><small>${gvT(e.at)} · ${gvLv(e.lv)} B${e.b} · ${gvE(e.sec)}</small>${e.q&&e.q!==e.c?`<div>${gvE(e.q)}</div>`:""}<div>Em trả lời: <span class="zh bad">${gvE(e.a)}</span></div><div>Đúng: <span class="zh">${gvE(e.c)}</span></div></div>`).join("")||"<p>Không có.</p>"}</div>`}

/* ---------- Điểm danh ---------- */
const gvDay=d=>{const x=new Date(d+"T12:00:00");return ["CN","T2","T3","T4","T5","T6","T7"][x.getDay()]+" "+d.slice(8,10)+"/"+d.slice(5,7)};
function gvLops(){const D=GV.data,act=D.hv.filter(h=>h.st!="Nghỉ"),cs=[...new Set(act.map(h=>h.cls).filter(Boolean))].filter(c=>!GV.cls||c==GV.cls).sort((a,b)=>a.localeCompare(b,"vi"));
 return cs.map(c=>({cls:c,hv:act.filter(h=>h.cls==c),pin:((D.lop||[]).find(l=>l.cls==c)||{}).pin||"—",info:(D.lop||[]).find(l=>l.cls==c)||{}}))}
function gvDd(F){const D=GV.data,T=D.today,dd=D.dd||[],L=gvLops();
 const card=l=>{const pr=l.hv.filter(h=>dd.some(x=>x.d==T&&x.code==h.code)),ab=l.hv.filter(h=>!pr.includes(h));
  return `<div class="card gvpin"><div class="gvph"><b>${gvE(l.cls)}</b><small>${l.hv.length} học viên</small></div><div class="gvpn">${gvE(l.pin)}</div>
<div class="gvpc ${pr.length?"":"none"}">Có mặt <b>${pr.length}/${l.hv.length}</b></div>
${pr.length?`<details><summary>${ab.length?`Chưa điểm danh (${ab.length})`:"Đủ cả lớp 🎉"}</summary><small>${ab.map(h=>gvE(h.name)).join(", ")||"—"}</small><br><small class="gvok">Có mặt: ${pr.map(h=>gvE(h.name)+" "+((dd.find(x=>x.d==T&&x.code==h.code)||{}).t||"")).join(", ")}</small></details>`:`<small class="ctx">Chưa ai điểm danh</small>`}</div>`};
 let h=`<div class="card note">Mã buổi học hôm nay <b>${gvDay(T)}</b>: đọc hoặc ghi mã của lớp lên bảng, học viên vào mục <b>✋ Vào lớp</b> trên trang web để tự điểm danh. Mã đổi mỗi ngày, lớp nào dùng mã lớp đó. Bấm ↻ Tải lại để xem ai đã điểm danh.</div>
<div class="gvpins">${L.map(card).join("")||`<div class="card">Chưa có lớp nào.</div>`}</div>`;
 if(!GV.cls)return h+`<p class="ctx">Chọn một lớp ở ô <b>Lớp</b> phía trên để xem lịch sử điểm danh từng buổi.</p>`;
 const l=L[0];if(!l)return h;const ds=[...new Set(dd.filter(x=>x.cls==l.cls).map(x=>x.d))].sort().slice(-12);
 if(!ds.length)return h+`<div class="card">Lớp ${gvE(l.cls)} chưa có buổi điểm danh nào trong ${GV.days} ngày qua.</div>`;
 const at=(c,d)=>dd.find(x=>x.code==c&&x.d==d);
 return h+`<h3 class="ab-h">Lịch sử điểm danh · ${gvE(l.cls)}</h3><div class="card gvtw"><table class="gvt gvm"><thead><tr><th>Học viên</th>${ds.map(d=>`<th>${gvDay(d)}</th>`).join("")}<th>Có mặt</th></tr></thead><tbody>
${l.hv.map(hv=>{const n=ds.filter(d=>at(hv.code,d)).length;return `<tr><td onclick="GV.stu='${hv.code}';gvDraw()"><b>${gvE(hv.name)}</b></td>${ds.map(d=>{const x=at(hv.code,d);return x?`<td class="gvy">✓<small>${gvE(x.t)}</small></td>`:`<td class="gvx">✗</td>`}).join("")}<td>${gvSc(Math.round(n/ds.length*100))}<small>${n}/${ds.length}</small></td></tr>`}).join("")}
<tr class="gvavg"><td>Sĩ số có mặt</td>${ds.map(d=>`<td>${l.hv.filter(hv=>at(hv.code,d)).length}/${l.hv.length}</td>`).join("")}<td></td></tr></tbody></table></div>
<p class="ctx">Một ngày được tính là buổi học khi có ít nhất một bạn trong lớp điểm danh.</p>`}

/* ---------- Tự đánh giá ---------- */
function gvDg(F){const D=GV.data,dg=(D.dg||[]).filter(x=>!GV.cls||x.cls==GV.cls),dd=D.dd||[],nm=c=>(D.hv.find(h=>h.code==c)||{}).name||c;
 if(!dg.length)return `<div class="card">Chưa có phiếu tự đánh giá nào${GV.cls?" của lớp này":""} trong ${GV.days} ngày qua. Học viên làm phiếu ở mục <b>✋ Vào lớp</b> sau khi điểm danh.</div>`;
 const G={};dg.forEach(x=>{const k=x.cls+"|"+x.d;(G[k]=G[k]||{cls:x.cls,d:x.d,list:[]}).list.push(x)});
 const gs=Object.values(G).sort((a,b)=>b.d.localeCompare(a.d)||a.cls.localeCompare(b.cls)).slice(0,10+GV.more);
 return gs.map(g=>{const ls=g.list,n=ls.length,att=dd.filter(x=>x.cls==g.cls&&x.d==g.d).map(x=>x.code),miss=att.filter(c=>!ls.some(x=>x.code==c));
  const st=ls.map(x=>x.star).filter(Boolean),avg=st.length?(st.reduce((a,b)=>a+b,0)/st.length).toFixed(1):"—";
  const sp={};ls.forEach(x=>{if(x.speed)sp[x.speed]=(sp[x.speed]||0)+1});const hd={};ls.forEach(x=>String(x.hard||"").split(/,\s*/).filter(Boolean).forEach(k=>hd[k]=(hd[k]||0)+1));
  const R={},ord=[];ls.forEach(x=>(x.rows||[]).forEach(r=>{if(!R[r[0]]){R[r[0]]={u:[],d:[],n:0};ord.push(r[0])}R[r[0]].n++;if(!r[1])R[r[0]].u.push(x.code);if(!r[2])R[r[0]].d.push(x.code)}));
  const bais=[...new Set(ls.map(x=>x.bai))].join(", "),qs=ls.filter(x=>x.q&&x.q.trim()),low=ls.filter(x=>x.star&&x.star<=2);
  return `<div class="card gvdg"><div class="gvdgh"><div><b>${gvE(g.cls)}</b> · ${gvDay(g.d)}<br><small>${gvE(bais)}</small></div><div class="gvcnt"><b>${avg}★</b><small>${n}${att.length?"/"+att.length:""} bạn gửi phiếu</small></div></div>
<div class="row gvchips">${Object.keys(sp).map(k=>`<span class="pill">Tốc độ ${k.toLowerCase()}: ${sp[k]}</span>`).join("")}${Object.keys(hd).sort((a,b)=>hd[b]-hd[a]).map(k=>`<span class="pill gvhard">Khó ${k}: ${hd[k]}</span>`).join("")}</div>
<table class="gvt gvdt"><thead><tr><th>Nội dung</th><th>Chưa hiểu</th><th>Chưa dùng được</th></tr></thead><tbody>
${ord.map(k=>{const r=R[k],c=(a)=>a.length?`<b class="gvs ${a.length/r.n>=.5?"no":"mid"}">${a.length}/${r.n}</b><small>${a.map(x=>gvE(nm(x))).join(", ")}</small>`:`<b class="gvs ok">0</b>`;return `<tr><td>${gvE(k)}</td><td>${c(r.u)}</td><td>${c(r.d)}</td></tr>`}).join("")}</tbody></table>
${low.length?`<p class="bad">Hiểu dưới 3★: ${low.map(x=>gvE(nm(x.code))+" ("+x.star+"★)").join(", ")}</p>`:""}
${qs.length?`<div class="gvqs"><b>Học viên muốn hỏi cô</b>${qs.map(x=>`<div><small>${gvE(nm(x.code))} · ${gvE(x.t)}</small><div>${gvE(x.q)}</div></div>`).join("")}</div>`:""}
${miss.length?`<small class="ctx">Có mặt nhưng chưa gửi phiếu: ${miss.map(c=>gvE(nm(c))).join(", ")}</small>`:""}</div>`}).join("")+(Object.keys(G).length>gs.length?`<div class="row c"><button class="btn o" onclick="gvSet('more',GV.more+10)">Xem thêm buổi cũ</button></div>`:"")}

/* lối vào: chân trang + #theodoi */
(function(){const f=document.querySelector("footer");if(f&&!$("gvlink"))f.insertAdjacentHTML("beforeend",` · <a id="gvlink" href="#" onclick="gvOpen();return false">Dành cho giáo viên</a>`);
 gvSec();if(/theodoi/.test(location.hash))gvOpen();addEventListener("hashchange",()=>{if(/theodoi/.test(location.hash))gvOpen()});
 const st=document.createElement("style");st.textContent=`
footer #gvlink{color:var(--m);text-decoration:none;font-weight:700}#gv .gvlog{max-width:420px}#gv .gvlog .tin{width:100%;box-sizing:border-box;margin:6px 0}.gvck{display:flex;gap:6px;align-items:center;margin:4px 0 10px;font-size:.9rem}
.gvbar{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;margin:6px 0 12px}.gvbar label{display:flex;gap:6px;align-items:center;font-weight:700}.gvbar select{padding:6px 10px;border-radius:10px;border:1px solid var(--b);font:inherit}.gvbar small{color:var(--sub)}
.gvtabs{margin-bottom:14px}
.gvpins{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;margin-bottom:12px}.gvpin{margin:0;text-align:center}.gvph{display:flex;flex-direction:column}.gvph small{color:var(--sub)}
.gvpn{font-size:2.6rem;font-weight:900;letter-spacing:.18em;color:var(--m);margin:4px 0;font-variant-numeric:tabular-nums}.gvpc{font-size:.95rem}.gvpc.none{color:var(--sub)}
.gvpin details{margin-top:6px;text-align:left}.gvpin summary{cursor:pointer;color:#b23a48;font-weight:700;font-size:.88rem}.gvok{color:#2e7d4f}
td.gvy{color:#2e7d4f;font-weight:800}td.gvx{color:#b23a48;font-weight:800;background:#fff6f6}
.gvdgh{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.gvdgh small{color:var(--sub)}.gvchips{margin:8px 0}.gvhard{background:#fff6f6;border-color:#e3a3a3}
.gvdt{margin-top:6px}.gvdt tbody tr{cursor:default}.gvdt td small{display:block;color:var(--sub)}.gvdt td:not(:first-child),.gvdt th:not(:first-child){width:28%}
.gvqs{margin-top:10px;background:var(--k);border-radius:12px;padding:10px 12px;display:grid;gap:8px}.gvqs small{color:var(--sub)}
.gvst{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:12px}.gvst .card{display:flex;flex-direction:column;gap:2px;margin:0}.gvst b{font-size:1.6rem;color:var(--m)}.gvst span{color:var(--sub);font-size:.9rem}
.gvwarn{background:#fff8e1;border:1px dashed var(--g)}.gvwarn ul{margin:6px 0 0;padding-left:20px}.gvwarn a,.gvt td a{color:var(--m);cursor:pointer;text-decoration:underline}
.gvtw{overflow-x:auto;padding:10px}.gvt{width:100%;border-collapse:collapse;font-size:.9rem}.gvt th{text-align:left;color:var(--sub);font-size:.78rem;text-transform:uppercase;letter-spacing:.04em;padding:8px;border-bottom:2px solid var(--b);white-space:nowrap}
.gvt td{padding:8px;border-bottom:1px solid var(--b);vertical-align:top}.gvt tbody tr{cursor:pointer}.gvt tbody tr:hover{background:var(--k)}.gvt td small{display:block;color:var(--sub);font-size:.75rem}.gvt tr.off{opacity:.5}
.gvm td,.gvm th{text-align:center;white-space:nowrap}.gvm td:first-child,.gvm th:first-child{text-align:left;position:sticky;left:0;background:var(--c)}.gvavg td{font-weight:700;background:var(--k)}
.gvs{display:inline-block;min-width:42px;text-align:center;border-radius:8px;padding:2px 6px;font-size:.85rem}.gvs.ok{background:rgba(46,125,79,.15);color:#2e7d4f}.gvs.mid{background:rgba(201,162,39,.2);color:#8a6d0b}.gvs.no{background:rgba(178,58,72,.15);color:#b23a48}.gvna{color:#bbb}
.gvbr{display:grid;grid-template-columns:minmax(120px,220px) 1fr 40px;gap:10px;align-items:center;margin-top:8px;cursor:pointer}.gvbr .tr{height:10px;border-radius:8px;background:var(--k);overflow:hidden;border:1px solid var(--b)}.gvbr .tr i{display:block;height:100%;background:#b23a48}
.gve .gveh{display:flex;gap:12px;align-items:flex-start}.gvn{flex:none;width:30px;height:30px;border-radius:50%;background:var(--m);color:#fff;display:grid;place-items:center;font-weight:800;font-size:.85rem}.gveh>div:nth-child(2){flex:1;min-width:0}.gveh small{color:var(--sub)}
.gvq{margin:4px 0;color:var(--t)}.gvc{font-size:1.1rem;color:#2e7d4f}.gvcnt{text-align:center;flex:none}.gvcnt b{display:block;font-size:1.4rem;color:#b23a48}.gvcnt small{color:var(--sub)}
.gvans{margin:8px 0 4px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}.gvans>span{background:#fff6f6;border:1px solid #e3a3a3;border-radius:10px;padding:2px 8px}.gvans i{color:#b23a48;font-style:normal;font-size:.8rem}.gvwho{color:var(--sub)}
.gvact{padding-left:18px;margin:6px 0 0}.gvact li{margin:6px 0}.gvact small{color:var(--sub)}.gvel{border-top:1px dashed var(--b);padding:8px 0}.gvel small{color:var(--sub)}
@media(max-width:600px){.gvpins{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.gvpin{padding:10px}.gvpn{font-size:1.8rem;letter-spacing:.1em}.gvdt{font-size:.82rem}.gvdt th,.gvdt td{padding:6px 4px}.gvdt td:not(:first-child),.gvdt th:not(:first-child){width:22%}.gvdt td small{font-size:.7rem}.gvbr{grid-template-columns:110px 1fr 32px}.gvst b{font-size:1.3rem}}`;document.head.appendChild(st)})();
