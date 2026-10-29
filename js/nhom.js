/* ===== Cặp / nhóm + Cô nhận xét theo barem · Luyện nói theo nhiệm vụ · thêm 29/10/2026 =====
   Học viên (chung 1 máy / nhóm): ghi tên các bạn trong cặp hoặc nhóm (số người tùy ý, có thể có cô), chọn vai A / B.
   Đã nhập mã học viên thì chạm tên bạn cùng lớp (API nlop); chưa có mã thì gõ tên.
   Mở thẻ nhiệm vụ là gửi nhóm về Google Sheets (trang tính "Nhận xét nhóm"); báo cáo và trạng thái "Xong" tự gửi theo.
   Cô: Quản trị › tab "🎭 Nhận xét nhóm": barem 6 tiêu chí × 3 mức (Tốt / Đạt / Chưa đạt) + nhận xét nhanh + chú thích, tự lưu.
   Nhóm thấy nhận xét của cô ngay trên thẻ (tự cập nhật mỗi 30 giây khi đang mở bộ ôn).
   Máy chủ: huong-dan/nhom-api.gs.txt (nhomApi_). Nạp SAU js/ontap.js và js/cham.js. ===== */
const NHV=1;
const NHB=[["Hoàn thành nhiệm vụ","Đạt kết quả ghi trên thẻ"],["Ngữ pháp trọng tâm","Dùng đúng mẫu ở mục “Cần dùng”"],["Phát âm · thanh điệu","Rõ âm, đúng thanh"],
 ["Trôi chảy","Nói bằng lời mình, không nhìn mẫu"],["Hỏi – đáp, phối hợp","Hỏi lại, phản hồi bạn, mọi bạn đều nói"],["Báo cáo kết quả","2–3 câu, rõ ý"]];
const NHL=[["Chưa đạt","no"],["Đạt","mid"],["Tốt","ok"]];
const NHCHIP=["Nói to, rõ","Còn nhìn mẫu câu","Sai thanh điệu","Sai trật tự từ","Thiếu 了 / 过","Dùng tốt ngữ pháp mới","Hỏi – đáp tự nhiên","Một bạn nói nhiều, một bạn ít"];
let NHE=null,NHR={},NHBUSY=false,NHSRV=null,NHLAST=0,NHDEB=null,NHPEND=false;
const nhLS=otLS;
const nhDay=(t)=>{const d=t?new Date(t):new Date(),p=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`};
const nhHm=ms=>{if(!ms)return"";const d=new Date(ms),p=n=>String(n).padStart(2,"0");return `${p(d.getHours())}:${p(d.getMinutes())} ${p(d.getDate())}/${p(d.getMonth()+1)}`};
const nhApi=()=>typeof TRK_API!="undefined"&&TRK_API?TRK_API:"";
const nhMe=()=>(typeof trkIn=="function"&&trkIn())?TRKME:null;
async function nhPost(o){const r=await fetch(nhApi(),{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o),redirect:"follow"});return r.json()}
/* nhóm hiện tại trên máy (theo cấp); nhóm của ngày hôm trước tự bỏ */
function nhG(){const g=nhLS("ct_otg_"+olLv);return g&&g.day==nhDay()&&g.m&&g.m.length?g:null}
const nhSig=m=>m.map(x=>(x.c||x.n)+":"+(x.r||"")).sort().join("|");
const nhRecs=()=>nhLS("ct_otr_"+olLv)||{};
const nhPutR=R=>{const ks=Object.keys(R).sort((a,b)=>(R[b].up||0)-(R[a].up||0));ks.slice(80).forEach(k=>delete R[k]);nhLS("ct_otr_"+olLv,R)};
const nhMap=()=>nhLS("ct_otn_"+olLv)||{};
function nhRecOf(tid){const M=nhMap()[tid],g=nhG();if(!M||!g||M.sig!=nhSig(g.m)||M.day!=nhDay())return null;return nhRecs()[M.gid]||null}
const nhNm=x=>x.t?"👩‍🏫 "+esc(x.n):esc(x.n);
const nhChip=x=>`<span class="nhm ${x.r?"r"+x.r.toLowerCase():""}">${x.r?`<i>${x.r}</i>`:""}${nhNm(x)}</span>`;

/* ---------- soạn nhóm ---------- */
function nhEdit(){const g=nhG(),me=nhMe();NHE={m:g?JSON.parse(JSON.stringify(g.m)):(me?[{n:me.name,c:me.code,r:"A"}]:[]),txt:""};nhRoster();rr()}
function nhCancel(){NHE=null;rr()}
const nhNextR=()=>{const a=NHE.m.filter(x=>x.r=="A").length,b=NHE.m.filter(x=>x.r=="B").length;return a<=b?"A":"B"};
function nhAddN(n,c,t){n=String(n||"").replace(/\s+/g," ").trim();if(!n)return;if(NHE.m.some(x=>(c&&x.c==c)||(!c&&!x.c&&x.n.toLowerCase()==n.toLowerCase())))return;NHE.m.push({n,c:c||"",r:nhNextR(),t:t?1:0});rr()}
function nhAdd(){const i=$("nhIn");const v=i?i.value:NHE.txt;NHE.txt="";nhAddN(v);setTimeout(()=>{const j=$("nhIn");j&&j.focus()},30)}
function nhAddC(c){const R=NHR[nhMe()&&nhMe().code]||{},h=(R.hv||[]).find(x=>x.code==c);if(!h)return;const i=NHE.m.findIndex(x=>x.c==c);if(i>=0){NHE.m.splice(i,1);rr()}else nhAddN(h.name,h.code)}
function nhDel(i){NHE.m.splice(i,1);rr()}
function nhRole(i,v){NHE.m[i].r=v;rr()}
function nhCo(on){const i=NHE.m.findIndex(x=>x.t);if(on&&i<0)nhAddN("Cô Thảo","",1);else if(!on&&i>=0)nhDel(i)}
function nhSave(){if(!NHE)return;const t=$("nhIn");if(t&&t.value.trim())nhAddN(t.value);const m=NHE.m;
 if(!m.length)return ask("Em ghi tên ít nhất một bạn nhé.",null,1);
 const go=()=>{const me=nhMe();nhLS("ct_otg_"+olLv,{m,cls:me?me.cls:"",day:nhDay()});NHE=null;if(OTC)nhStart(OTC);rr()};
 if(m.length==1)return ask(`Nhóm chỉ có <b>${esc(m[0].n)}</b>. Em tự đóng cả hai vai? (Lớp lẻ thì tích “Cô cùng đóng một vai”.)`,go);
 if(!m.some(x=>x.r=="A")||!m.some(x=>x.r=="B"))return ask("Nhóm chưa có đủ cả vai A và vai B. Vẫn lưu nhóm?",go);
 go()}
async function nhRoster(){const me=nhMe();if(!me||!nhApi()||NHR[me.code])return;NHR[me.code]={busy:1};
 try{const r=await nhPost({a:"nlop",code:me.code});NHR[me.code]=r&&r.nh&&r.ok?{hv:r.hv||[],cls:r.cls}:{fail:r&&r.nh?"code":"srv"}}catch(e){NHR[me.code]={fail:"net"}}
 if(NHE)nhKeep(rr)}
/* vẽ lại mà không làm mất chữ đang gõ */
function nhKeep(f){const a=document.activeElement,id=a&&a.id,v=a&&a.value,s=a&&a.selectionStart;f();if(id){const b=$(id);if(b&&b!==a){if(v!=null)b.value=v;b.focus();try{b.setSelectionRange(s,s)}catch(e){}}}}
function nhEditor(){const me=nhMe(),R=me?NHR[me.code]:null,inG=c=>NHE.m.some(x=>x.c==c),co=NHE.m.some(x=>x.t);
 return `<div class="card nhcard nhed"><h3>👥 Cặp / nhóm của em</h3>
<p class="otsm">Ghi tên <b>tất cả</b> các bạn cùng làm thẻ này (2 bạn, 3 bạn hay cả nhóm đều được) và chọn vai. Cô nhận xét theo nhóm này, các bạn có mã học viên được lưu vào Sổ theo dõi.</p>
${NHE.m.length?`<div class="nhls">${NHE.m.map((x,i)=>`<div class="nhrow"><span class="nhn">${nhNm(x)}${x.c?` <small>${esc(x.c)}</small>`:""}</span>
<span class="nhrs">${["A","B"].map(r=>`<button class="${x.r==r?"on r"+r.toLowerCase():""}" onclick="nhRole(${i},'${r}')">Vai ${r}</button>`).join("")}</span><button class="nhx" onclick="nhDel(${i})" aria-label="Bỏ ${esc(x.n)}">✕</button></div>`).join("")}</div>`:`<p class="nhem">Chưa có ai trong nhóm.</p>`}
${me?(R&&R.hv?`<div class="nhrt"><b>Bạn cùng lớp ${esc(R.cls||"")}</b> <small>(chạm để thêm / bỏ)</small></div><div class="nhrc">${R.hv.map(h=>`<button class="${inG(h.code)?"on":""}" onclick="nhAddC('${esc(h.code)}')">${inG(h.code)?"✓ ":""}${esc(h.name)}</button>`).join("")}</div>`
 :R&&R.busy?`<p class="otsm">Đang tải danh sách lớp…</p>`:R&&R.fail?`<p class="otsm">${R.fail=="net"?"Chưa tải được danh sách lớp (mạng yếu).":"Chưa có danh sách lớp."} Em gõ tên bạn ở dưới nhé.</p>`:""):`<p class="otsm">💡 Nhập <a href="javascript:void 0" onclick="trkOpen()">🔑 Mã học viên</a> để chọn tên bạn cùng lớp; không thì gõ tên ở dưới.</p>`}
<div class="row nhin"><input id="nhIn" placeholder="Gõ tên bạn rồi bấm Thêm…" value="${esc(NHE.txt)}" oninput="NHE.txt=this.value" onkeydown="if(event.key=='Enter'){event.preventDefault();nhAdd()}"><button class="btn o sm" onclick="nhAdd()">+ Thêm</button></div>
<label class="nhco"><input type="checkbox" ${co?"checked":""} onchange="nhCo(this.checked)"> 👩‍🏫 Cô cùng đóng một vai (lớp lẻ)</label>
<div class="row"><button class="btn" onclick="nhSave()">✓ Lưu nhóm</button>${nhG()?`<button class="btn o" onclick="nhCancel()">Hủy</button>`:""}</div></div>`}
function nhBarHtml(inTask){const g=nhG();if(NHE)return nhEditor();
 if(!g)return `<div class="card nhcard nhnone"><div><b>👥 Ghi tên cặp / nhóm</b><p class="otsm">${inTask?"Ghi tên các bạn cùng làm thẻ này để cô nhận xét nhóm em.":"Trước khi bốc thẻ, ghi tên các bạn trong cặp / nhóm để cô nhận xét."}</p></div><button class="btn" onclick="nhEdit()">👥 Lập cặp / nhóm</button></div>`;
 const r=inTask&&OTC?nhRecOf(OTC):null;
 return `<div class="card nhcard nhbar"><div class="nhbt"><b>👥 Nhóm em</b> ${g.m.map(nhChip).join("")}</div><div class="nhbs">${r?`<small class="nhst ${r.sent>=r.up?"ok":""}">${r.sent>=r.up?"📤 Cô đã thấy nhóm em":NHSRV===false?"⏳ Cô chưa bật phần nhận xét nhóm":"⏳ Đang gửi cho cô…"}</small>`:""}<button class="btn o sm" onclick="nhEdit()">✏ Đổi nhóm</button></div></div>`}

/* ---------- ghi nhận nhóm làm thẻ + gửi ---------- */
function nhStart(tid){const g=nhG(),set=otSet(),T=set&&set.tasks.find(t=>t.id==tid);if(!g||!T)return;
 const M=nhMap(),sig=nhSig(g.m),R=nhRecs();let cur0=M[tid];
 if(!cur0||cur0.sig!=sig||cur0.day!=nhDay()||!R[cur0.gid]){cur0=M[tid]={gid:"G"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),sig,day:nhDay()};nhLS("ct_otn_"+olLv,M)}
 const r=R[cur0.gid]||{gid:cur0.gid,lv:olLv,set:set.key,st:set.t,tid,tt:T.t,zh:T.zh,at:Date.now(),stt:"Đang làm",sent:0};
 r.m=g.m;r.cls=g.cls||"";r.dev=nhMe()?nhMe().code:"";r.rep=(otTxt()[tid]||"").trim();r.up=Date.now();R[r.gid]=r;nhPutR(R);nhFlush()}
function nhTouch(tid,stt){const r=nhRecOf(tid);if(!r)return;const R=nhRecs(),x=R[r.gid],rep=(otTxt()[tid]||"").trim();if(stt)x.stt=stt;if(rep!=x.rep||stt){x.rep=rep;x.up=Date.now();nhPutR(R)}clearTimeout(NHDEB);NHDEB=setTimeout(nhFlush,stt?10:3000)}
async function nhFlush(){if(NHBUSY||!nhApi())return;const R=nhRecs(),todo=Object.values(R).filter(r=>!(r.sent>=r.up)).slice(0,6);if(!todo.length)return;NHBUSY=true;let ch=false;
 for(const r of todo){const up=r.up;try{const o=await nhPost({a:"ngui",g:{gid:r.gid,lv:r.lv,set:r.set,st:r.st,tid:r.tid,tt:r.tt,zh:r.zh,m:r.m,cls:r.cls,dev:r.dev,stt:r.stt,rep:r.rep}});
  if(o&&o.nh){NHSRV=true;if(o.ok){const R2=nhRecs();if(R2[r.gid]){R2[r.gid].sent=up;if(o.cls)R2[r.gid].cls=o.cls;nhPutR(R2)}ch=true}}else{NHSRV=false;ch=true;break}}catch(e){break}}
 NHBUSY=false;if(ch&&OTON&&!NHE)nhSoft()}
async function nhPoll(force){if(!nhApi()||!OTON||document.visibilityState=="hidden")return;if(!force&&Date.now()-NHLAST<25000)return;NHLAST=Date.now();
 nhTouch(OTC||"_");await nhFlush();
 const R=nhRecs(),from=Date.now()-14*864e5,ids=Object.values(R).filter(r=>r.at>from&&r.sent).map(r=>r.gid);if(!ids.length)return;
 try{const o=await nhPost({a:"nkq",gids:ids});if(!(o&&o.nh&&o.ok))return;let ch=false;const R2=nhRecs();
  Object.keys(o.kq||{}).forEach(k=>{if(R2[k]&&JSON.stringify(R2[k].ev)!=JSON.stringify(o.kq[k])){const fresh=!R2[k].ev;R2[k].ev=o.kq[k];ch=true;if(fresh)NHPEND=true}});
  if(ch){nhPutR(R2);try{navigator.vibrate&&navigator.vibrate(120)}catch(e){}nhSoft()}}catch(e){}}
/* vẽ lại khi không có ai đang gõ */
function nhSoft(){const a=document.activeElement;if(a&&(a.tagName=="TEXTAREA"||a.tagName=="INPUT")){setTimeout(nhSoft,4000);return}if(OTON&&!cur)rr()}
setInterval(()=>nhPoll(),30000);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState=="visible")nhPoll()});

/* ---------- nhận xét của cô (học viên xem) ---------- */
function nhEvHtml(ev,big){const bm=ev.bm||[],has=bm.filter(v=>v!=null),tot=has.reduce((a,v)=>a+v,0),cnt=[2,1,0].map(l=>has.filter(v=>v==l).length);
 const nx=(ev.nx||"").split("; ").filter(Boolean),ch=nx.filter(c=>NHCHIP.includes(c)),fr=nx.filter(c=>!NHCHIP.includes(c));
 return `<div class="nhev ${big?"big":""}">${has.length?`<div class="nhevs"><b>${tot}/${has.length*2}</b><small>${cnt[0]} Tốt · ${cnt[1]} Đạt · ${cnt[2]} Chưa đạt</small></div>`:""}
<table class="nhevt">${NHB.map((b,i)=>bm[i]==null?"":`<tr><td>${b[0]}</td><td><span class="nhlv ${NHL[bm[i]][1]}">${NHL[bm[i]][0]}</span></td></tr>`).join("")}</table>
${ch.length?`<div class="nhevc">${ch.map(c=>`<span class="pill">${esc(c)}</span>`).join("")}</div>`:""}${fr.length?`<p class="nhevn">💬 ${esc(fr.join("; "))}</p>`:""}</div>`}
function nhEvCard(tid){const M=nhMap()[tid],R=nhRecs(),g=nhG(),sg=g?nhSig(g.m):"",rs=Object.values(R).filter(r=>r.tid==tid&&r.ev&&(!sg||nhSig(r.m)==sg)).sort((a,b)=>b.at-a.at),r=rs[0];if(!r)return"";
 return `<div class="card nhcard nhevcard"><h3>👩‍🏫 Cô nhận xét nhóm em</h3><p class="otsm">${r.m.map(nhChip).join("")} · ${nhHm(r.at)}${M&&M.gid!=r.gid?" (lần làm trước)":""}</p>${nhEvHtml(r.ev,1)}</div>`}
function nhEvList(){const set=otSet(),R=nhRecs(),rs=Object.values(R).filter(r=>r.set==set.key&&r.ev).sort((a,b)=>b.at-a.at);if(!rs.length)return"";
 return `<div class="card nhcard"><h3>⭐ Cô đã nhận xét (${rs.length})</h3>${rs.slice(0,8).map(r=>`<div class="nhevi" onclick="otDraw('${esc(r.tid)}')"><div><b>Thẻ ${esc(r.tid)} · ${esc(r.tt)}</b><small>${r.m.map(x=>esc(x.n)).join(", ")} · ${nhHm(r.at)}</small></div>${r.ev.bm&&r.ev.bm.some(v=>v!=null)?`<span class="nhlv ${(()=>{const h=r.ev.bm.filter(v=>v!=null),a=h.reduce((s,v)=>s+v,0)/h.length;return a>=1.5?"ok":a>=.75?"mid":"no"})()}">${r.ev.bm.filter(v=>v!=null).reduce((s,v)=>s+v,0)}/${r.ev.bm.filter(v=>v!=null).length*2}</span>`:"💬"}</div>`).join("")}</div>`}

/* ---------- móc vào js/ontap.js ---------- */
const _nhDeck=otDeck;otDeck=function(){const h=_nhDeck();const i=h.indexOf(`<div class="row otfil">`);const add=nhBarHtml(false)+nhEvList();return i>=0?h.slice(0,i)+add+h.slice(i):add+h};
const _nhView1=otView1;otView1=function(){let h=_nhView1();const k=`<div class="card"><h3>① Nhận vai</h3>`;const add=nhEvCard(OTC)+nhBarHtml(true);return h.includes(k)?h.replace(k,add+k):add+h};
const _nhRole=otRole;otRole=function(T,r,open){const h=_nhRole(T,r,open),g=nhG();if(!g)return h;const ns=g.m.filter(x=>x.r==r).map(x=>esc(x.n)).join(", ");
 return ns?h.replace(`<small>Vai ${r}</small>`,`<small>Vai ${r} · <b class="nhwho">${ns}</b></small>`):h};
const _nhDraw=otDraw;otDraw=function(id){NHE=null;_nhDraw(id);if(OTC)nhStart(OTC)};
const _nhIn=otIn;otIn=function(el){_nhIn(el);nhTouch(OTC)};
const _nhDone=otDone;otDone=function(){nhTouch(OTC,"Xong");return _nhDone()};
const _nhOpen=otOpen;otOpen=function(k){NHE=null;_nhOpen(k);setTimeout(()=>nhPoll(1),300)};
const _nhCopy=otCopy;otCopy=function(){const g=nhG();if(!g)return _nhCopy();const T=otTask(OTC),set=otSet(),x=(otTxt()[OTC]||"").trim();
 if(!x)return ask("Em chưa có nội dung báo cáo để sao chép.",null,1);
 cpTxt(`[HSK ${olLv} · ${set.t} · Nhiệm vụ ${T.id}: ${T.t} ${T.zh}]\nNhóm: ${g.m.map(m=>m.n+(m.r?" ("+m.r+")":"")).join(", ")}\n${x}`)};

/* ================= GIÁO VIÊN: tab "🎭 Nhận xét nhóm" trong Bảng theo dõi ================= */
const NHT={data:null,busy:false,err:"",srv:null,day:"0",mode:"all",q:{},qt:null,saving:false,saved:0,open:{},iv:null,ord:[],tc:{}};
if(typeof gvDraw=="function"){
 const _gvDraw=gvDraw,_gvLoad=gvLoad;
 gvLoad=async function(){await _gvLoad();if(GV.data)nhtLoad(true)};
 gvDraw=function(){const isN=GV.tab=="nh"&&!GV.stu;if(isN)GV.tab="tq";_gvDraw();if(isN)GV.tab="nh";
  const s=$("gv");if(!s||!GV.data)return;const tb=s.querySelector(".gvtabs");if(!tb)return;
  if(isN)tb.querySelectorAll("button").forEach(b=>b.classList.remove("on"));
  const n=nhtCnt(),b=document.createElement("button");b.className=isN?"on":"";b.innerHTML=`🎭 Nhận xét nhóm${n?` <i class="chcnt">${n}</i>`:""}`;b.onclick=()=>{GV.stu=null;GV.tab="nh";nhtLoad();gvDraw()};
  tb.insertBefore(b,tb.children[2]||null);
  if(isN){while(tb.nextSibling)tb.nextSibling.remove();const d=document.createElement("div");d.id="nht";d.innerHTML=nhtHtml();s.appendChild(d)}
  clearInterval(NHT.iv);if(isN)NHT.iv=setInterval(()=>{if(GV.tab=="nh"&&$("nht")&&!Object.keys(NHT.q).length&&!NHT.saving&&document.visibilityState=="visible"){const a=document.activeElement;if(!(a&&a.closest&&a.closest("#nht")&&a.tagName=="INPUT"))nhtLoad(true)}},30000)};
}
if(typeof gvStu=="function"){const _gvStu=gvStu;gvStu=function(F,code){let h=_gvStu(F,code);const L=(NHT.data||[]).filter(g=>g.m.some(x=>x.c==code)).sort((a,b)=>b.at-a.at);if(!L.length)return h;
 return h+`<h3 class="ab-h">🎭 Luyện nói theo nhiệm vụ (nhóm)</h3>${L.slice(0,12).map(g=>`<div class="card nhtc"><div class="nhth"><div><b>Thẻ ${gvE(g.tid)} · ${gvE(g.tt)}</b><small>${gvLv(g.lv)} · ${gvE(g.st)} · ${gvT(g.at)}</small></div></div><div class="nhtm">${g.m.map(nhChip).join("")}</div>${g.ev?nhEvHtml(g.ev):`<p class="ctx">Cô chưa nhận xét.</p>`}</div>`).join("")}`}}
const nhtF=()=>{if(!NHT.data)return[];const d0=NHT.day=="0"?new Date(nhDay()+"T00:00").getTime():Date.now()-(+NHT.day)*864e5;
 return NHT.data.filter(g=>g.at>=d0&&(!GV.cls||g.cls==GV.cls))};
const nhtCnt=()=>nhtF().filter(g=>!g.ev).length;
async function nhtLoad(quiet){if(NHT.busy||!nhApi())return;NHT.busy=true;NHT.err="";if(!quiet&&GV.tab=="nh")nhtDraw();
 try{const r=await nhPost({a:"ncho",pass:GV.pass,days:30});
  if(r&&r.nh&&r.ok){NHT.srv=true;NHT.data=(r.g||[]).map(g=>{const q=NHT.q[g.gid];if(q)g.ev={bm:q.bm,nx:q.nx};return g});
   /* thứ tự cố định giữa các lần tải: nhóm mới (chưa nhận xét) lên đầu, nhóm cũ giữ chỗ để thẻ không nhảy khi cô đang chấm */
   const nw=NHT.data.filter(g=>!NHT.ord.includes(g.gid)).sort((a,b)=>(!!a.ev-!!b.ev)||b.at-a.at).map(g=>g.gid);NHT.ord=nw.concat(NHT.ord.filter(id=>NHT.data.some(g=>g.gid==id)))}
  else if(r&&r.nh&&r.err=="pass")NHT.err="Mật khẩu chưa đúng.";else{NHT.srv=false;NHT.data=null}
 }catch(e){NHT.err="Chưa kết nối được Google Sheets."}
 NHT.busy=false;if(GV.tab=="nh"&&!GV.stu)nhtDraw();else if(GV.data&&$("gv")&&$("gv").classList.contains("on")){const tb=document.querySelector(".gvtabs");if(tb)gvDraw()}}
function nhtDraw(){const d=$("nht");if(!d){if(typeof gvDraw=="function")gvDraw();return}nhKeep(()=>{d.innerHTML=nhtHtml()});const c=[...document.querySelectorAll(".gvtabs button")].find(b=>/Nhận xét nhóm/.test(b.textContent));if(c){const n=nhtCnt();c.innerHTML=`🎭 Nhận xét nhóm${n?` <i class="chcnt">${n}</i>`:""}`}}
function nhtHtml(){
 if(NHT.busy&&!NHT.data)return `<p class="ctx">Đang tải các nhóm…</p>`;
 if(NHT.err)return `<p class="bad">${NHT.err}</p><button class="btn sm" onclick="nhtLoad()">↻ Tải lại</button>`;
 if(NHT.srv===false||!NHT.data)return nhtSetup();
 const all=nhtF(),oi=id=>{const i=NHT.ord.indexOf(id);return i<0?-1:i},L=all.filter(g=>NHT.mode=="all"||!g.ev||NHT.tc[g.gid]).sort((a,b)=>oi(a.gid)-oi(b.gid)||b.at-a.at),dn=all.filter(g=>g.ev).length;
 let h=`<div class="gvbar chgbar"><label>Ngày <select onchange="NHT.day=this.value;nhtDraw()">${[["0","Hôm nay"],["7","7 ngày"],["30","30 ngày"]].map(x=>`<option value="${x[0]}" ${NHT.day==x[0]?"selected":""}>${x[1]}</option>`).join("")}</select></label>
<label>Xem <select onchange="NHT.mode=this.value;nhtDraw()"><option value="all" ${NHT.mode=="all"?"selected":""}>Tất cả nhóm</option><option value="cho" ${NHT.mode=="cho"?"selected":""}>Chưa nhận xét</option></select></label>
<button class="btn sm" onclick="nhtLoad()" ${NHT.busy?"disabled":""}>${NHT.busy?"Đang tải…":"↻ Tải lại"}</button><small class="chsv" id="nhtsv">${nhtSv()}</small></div>
<p class="ctx">${all.length} nhóm${GV.cls?" lớp "+gvE(GV.cls):""} · đã nhận xét ${dn}/${all.length}. Trang tự cập nhật nhóm mới mỗi 30 giây. Bấm mức cho từng tiêu chí; nhận xét tự lưu và hiện ngay trên máy của nhóm.</p>`;
 if(!L.length)return h+`<div class="card"><p>${all.length?"🎉 Cô đã nhận xét hết các nhóm.":"Chưa có nhóm nào"+(NHT.day=="0"?" hôm nay":"")+". Học viên mở bộ “🎲 Ôn tập” › ghi tên cặp / nhóm › bốc thẻ là nhóm hiện ở đây."}</p></div>`;
 return h+L.map(nhtCard).join("")}
function nhtCard(g){const ev=g.ev||{bm:[null,null,null,null,null,null],nx:""},bm=ev.bm||[],id=gvE(g.gid),nx=(ev.nx||"").split("; ").filter(Boolean),fr=nx.filter(c=>!NHCHIP.includes(c)).join("; "),op=NHT.open[g.gid];
 const has=bm.filter(v=>v!=null),tot=has.reduce((a,v)=>a+v,0);
 return `<div class="card nhtc ${g.ev?"done":""}"><div class="nhth"><div><b>Thẻ ${gvE(g.tid)} · ${gvE(g.tt)}</b> <span class="zh">${gvE(g.zh||"")}</span><small>${gvE(g.cls||"(chưa rõ lớp)")} · ${gvLv(g.lv)} · ${gvE(g.st)} · ${gvT(g.at)}</small></div>
<span class="nhst2 ${g.stt=="Xong"?"ok":""}">${g.stt=="Xong"?"✓ Xong":"● Đang làm"}</span></div>
<div class="nhtm">${g.m.map(nhChip).join("")}</div>
${g.rep?`<button class="nhtrb" onclick="NHT.open['${id}']=!NHT.open['${id}'];nhtDraw()">${op?"▲":"▼"} Báo cáo của nhóm</button>${op?`<div class="nhtrep zh">${gvE(g.rep).replace(/\n/g,"<br>")}</div>`:""}`:""}
<div class="nhtb">${NHB.map((b,i)=>`<div class="nhtr"><div><b>${b[0]}</b><small>${b[1]}</small></div><div class="nhtl">${[2,1,0].map(l=>`<button class="${bm[i]===l?"on "+NHL[l][1]:""}" onclick="nhtSet('${id}',${i},${l})">${NHL[l][0]}</button>`).join("")}</div></div>`).join("")}</div>
<div class="nhtq"><span>⚡ Đặt nhanh cả 6:</span><button onclick="nhtAll('${id}',2)">Tốt</button><button onclick="nhtAll('${id}',1)">Đạt</button>${has.length?`<b class="nhtt">${tot}/${has.length*2}</b>`:""}</div>
<div class="chgc">${NHCHIP.map(c=>`<button class="${nx.includes(c)?"on":""}" onclick="nhtChip('${id}',this.textContent)">${gvE(c)}</button>`).join("")}
<input class="chgi" id="nhti-${id}" placeholder="Chú thích thêm (nếu có)…" value="${gvE(fr)}" onchange="nhtTxt('${id}',this.value)"></div></div>`}
const nhtG=id=>NHT.data.find(g=>g.gid==id);
const nhtEv=g=>g.ev||(g.ev={bm:[null,null,null,null,null,null],nx:""});
function nhtSet(id,i,l){const g=nhtG(id);if(!g)return;const e=nhtEv(g);e.bm[i]=e.bm[i]===l?null:l;nhtQ(g);nhtDraw()}
function nhtAll(id,l){const g=nhtG(id);if(!g)return;const e=nhtEv(g);e.bm=e.bm.map(()=>l);nhtQ(g);nhtDraw()}
function nhtChip(id,c){const g=nhtG(id);if(!g)return;const e=nhtEv(g),a=(e.nx||"").split("; ").filter(Boolean);e.nx=(a.includes(c)?a.filter(x=>x!=c):a.concat([c])).join("; ");nhtQ(g);nhtDraw()}
function nhtTxt(id,v){const g=nhtG(id);if(!g)return;const e=nhtEv(g),ch=(e.nx||"").split("; ").filter(c=>NHCHIP.includes(c)),t=v.trim();e.nx=ch.concat(t?[t]:[]).join("; ");nhtQ(g);nhtDraw()}
function nhtQ(g){NHT.tc[g.gid]=1;NHT.q[g.gid]={gid:g.gid,bm:g.ev.bm.slice(),nx:g.ev.nx};clearTimeout(NHT.qt);NHT.qt=setTimeout(nhtSave,1000);nhtBar()}
async function nhtSave(){if(NHT.saving){NHT.qt=setTimeout(nhtSave,1500);return}const Q=Object.values(NHT.q);if(!Q.length)return;NHT.q={};NHT.saving=true;nhtBar();let bad=0;
 for(const q of Q){try{const r=await nhPost({a:"nnx",pass:GV.pass,gid:q.gid,bm:q.bm,nx:q.nx});if(!(r&&r.ok)){bad++;if(!NHT.q[q.gid])NHT.q[q.gid]=q}}catch(e){bad++;if(!NHT.q[q.gid])NHT.q[q.gid]=q}}
 NHT.saving=false;if(!bad)NHT.saved=Date.now();nhtBar();if(bad)ask("Chưa lưu được nhận xét (mạng hoặc Google Sheets). Cô bấm lại một ô để thử lưu lại.",null,1)}
const nhtSv=()=>NHT.saving?"Đang lưu…":Object.keys(NHT.q).length?"Chưa lưu…":NHT.saved?"✓ Đã lưu "+nhHm(NHT.saved).split(" ")[0]:"";
function nhtBar(){const e=$("nhtsv");if(e)e.textContent=nhtSv()}
window.addEventListener("beforeunload",e=>{if(Object.keys(NHT.q).length){nhtSave();e.preventDefault();e.returnValue=""}});
let NHCODE="";
function nhtSetup(){setTimeout(()=>{const p=$("nhcode");if(p&&!NHCODE)fetch("huong-dan/nhom-api.gs.txt?v="+NHV).then(r=>r.text()).then(t=>{NHCODE=t;const q=$("nhcode");if(q)q.textContent=t}).catch(()=>{const q=$("nhcode");if(q)q.textContent="(Không tải được đoạn mã. Cô lấy file nhom-api.gs.txt Claude gửi trong chat.)"});else if(p)p.textContent=NHCODE},50);
 return `<div class="card"><h3>Cài phần Nhận xét nhóm vào Google Sheets (làm 1 lần)</h3>
<ol><li>Mở Google Sheets "Sổ theo dõi học viên" › Tiện ích mở rộng › Apps Script. Dán đoạn mã bên dưới vào <b>cuối</b> file Code.gs (Mã.gs).</li>
<li>Trong hàm <code>doPost(e)</code>, thêm dòng này ở <b>đầu</b> hàm (ngay dưới dòng chamApi_):<br><code>var _nh = nhomApi_(e); if (_nh) return _nh;</code></li>
<li>Lưu › Triển khai › Quản lý tác vụ triển khai › ✏ › Phiên bản: <b>Phiên bản mới</b> › Triển khai (địa chỉ giữ nguyên).</li>
<li>Quay lại đây bấm ↻ Tải lại. Trang tính "Nhận xét nhóm" tự tạo khi có nhóm đầu tiên.</li></ol>
<div class="row"><button class="btn sm" onclick="nhtCopy()">📋 Sao chép đoạn mã</button><button class="btn o sm" onclick="nhtLoad()">↻ Tải lại</button></div>
<pre class="chcode" id="nhcode">${NHCODE?gvE(NHCODE):"Đang tải đoạn mã…"}</pre></div>`}
function nhtCopy(){const go=t=>{try{navigator.clipboard.writeText(t).then(()=>ask("Đã sao chép đoạn mã.",null,1),()=>ask("Trình duyệt chặn sao chép: cô bôi đen đoạn mã rồi Ctrl+C.",null,1))}catch(e){ask("Cô bôi đen đoạn mã rồi Ctrl+C.",null,1)}};
 if(NHCODE)go(NHCODE);else fetch("huong-dan/nhom-api.gs.txt?v="+NHV).then(r=>r.text()).then(t=>{NHCODE=t;go(t)})}

(function(){const st=document.createElement("style");st.textContent=`
.nhcard{border:2px solid #c9a227}
.nhnone{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:#fff7dd}.nhnone p{margin:4px 0 0}
.nhbar{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:10px 14px}
.nhbt{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.nhbs{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.nhm{display:inline-flex;align-items:center;gap:5px;background:var(--k);border:1px solid var(--b);border-radius:20px;padding:2px 10px 2px 4px;font-size:.95rem;margin:2px 4px 2px 0}
.nhm i{font-style:normal;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:.72rem;font-weight:800;color:#fff;background:#999}
.nhm.ra i{background:#c9a227}.nhm.rb i{background:#8e2a4f}.nhm:not(.ra):not(.rb){padding-left:10px}
.nhst{color:#9a6a10}.nhst.ok{color:#2f7a3d}
.nhed h3{margin-top:0}.nhls{display:grid;gap:6px;margin:8px 0}
.nhrow{display:flex;align-items:center;gap:8px;background:var(--k);border-radius:12px;padding:6px 8px 6px 12px;flex-wrap:wrap}
.nhn{flex:1;min-width:120px;font-weight:600}.nhn small{font-weight:400;color:var(--sub)}
.nhrs{display:flex;gap:4px}.nhrs button{border:1px solid var(--b);background:var(--c);color:var(--t);border-radius:20px;padding:4px 12px;font:inherit;font-size:.88rem;cursor:pointer}
.nhrs button.on.ra{background:#c9a227;border-color:#c9a227;color:#fff}.nhrs button.on.rb{background:#8e2a4f;border-color:#8e2a4f;color:#fff}
.nhx{border:0;background:none;color:#b23a3a;font-size:1.1rem;cursor:pointer;padding:4px 8px}
.nhem{color:var(--sub);font-style:italic}
.nhrt{margin:10px 0 4px}.nhrt small{color:var(--sub)}
.nhrc{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}.nhrc button{border:1px solid var(--b);background:var(--c);color:var(--t);border-radius:20px;padding:5px 12px;font:inherit;font-size:.92rem;cursor:pointer}
.nhrc button.on{background:#e3f4e6;border-color:#3b8a4a;color:#1f5a2a}
.nhin{gap:8px;margin:8px 0}.nhin input{flex:1;min-width:160px;border-radius:12px;border:1px solid var(--b);padding:8px 12px;font:inherit;background:var(--c);color:var(--t)}
.nhco{display:flex;gap:8px;align-items:center;margin:6px 0 10px;cursor:pointer}
.nhwho{color:var(--m)}
.nhevcard{background:#f2faf3;border-color:#3b8a4a;color:#1d2a1f}.nhevcard h3{margin-top:0;color:#2f7a3d}
.nhev{display:grid;gap:8px}.nhevs{display:flex;gap:10px;align-items:baseline}.nhevs b{font-size:1.5rem;color:#2f7a3d}.nhevs small{color:#4a5a4c}
.nhevt{border-collapse:collapse;width:100%;max-width:460px}.nhevt td{padding:4px 6px;border-bottom:1px solid rgba(0,0,0,.08)}.nhevt td:last-child{text-align:right}
.nhlv{display:inline-block;border-radius:20px;padding:1px 10px;font-size:.85rem;font-weight:700}
.nhlv.ok{background:#dff3e3;color:#1f6a2e}.nhlv.mid{background:#fbf0d2;color:#7a5a10}.nhlv.no{background:#fde4e4;color:#a12a2a}
.nhevc .pill{margin:2px 4px 2px 0}.nhevn{margin:0;color:#1d2a1f}
.nhevi{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;background:var(--k);margin:6px 0;cursor:pointer}
.nhevi small{display:block;color:var(--sub)}
.nhtc{border-left:5px solid #c9a227}.nhtc.done{border-left-color:#3b8a4a}
.nhth{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.nhth small{display:block;color:var(--sub);margin-top:2px}
.nhst2{font-size:.82rem;font-weight:700;color:#9a6a10;white-space:nowrap}.nhst2.ok{color:#2f7a3d}
.nhtm{margin:8px 0}
.nhtrb{border:0;background:none;color:var(--m);font:inherit;font-weight:600;cursor:pointer;padding:2px 0}
.nhtrep{background:var(--k);border-radius:10px;padding:8px 12px;margin:4px 0 8px;line-height:1.6}
.nhtb{display:grid;gap:4px;margin:8px 0}
.nhtr{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:6px 0;border-bottom:1px dashed var(--b);flex-wrap:wrap}
.nhtr small{display:block;color:var(--sub);font-size:.8rem}
.nhtl{display:flex;gap:4px}.nhtl button{border:1px solid var(--b);background:var(--c);color:var(--t);border-radius:20px;padding:5px 12px;font:inherit;font-size:.88rem;cursor:pointer;min-width:58px}
.nhtl button.on.ok{background:#2f7a3d;border-color:#2f7a3d;color:#fff}.nhtl button.on.mid{background:#c9a227;border-color:#c9a227;color:#fff}.nhtl button.on.no{background:#b23a3a;border-color:#b23a3a;color:#fff}
.nhtq{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:6px 0;font-size:.9rem;color:var(--sub)}
.nhtq button{border:1px solid var(--b);background:var(--k);color:var(--t);border-radius:20px;padding:3px 10px;font:inherit;font-size:.85rem;cursor:pointer}.nhtt{margin-left:auto;color:var(--m);font-size:1.1rem}
@media(max-width:640px){.nhtr{flex-direction:column;align-items:stretch}.nhtl button{flex:1}.nhrow{padding:8px;flex-wrap:nowrap}.nhn{min-width:0;font-size:.92rem}.nhn small{display:block}.nhrs button{padding:6px 10px}}
@media print{.nhcard{display:none!important}}`;document.head.appendChild(st)})();
