/* ===== Báo cáo tuần · thêm 01/11/2026 =====
   Tab "📅 Báo cáo tuần" trong ⚙ Quản trị (Bảng theo dõi). Chọn lớp + tuần (Thứ Hai → Chủ nhật).
   - Tóm tắt lớp: bài được giao, ai đã xong / làm dở / chưa làm, buổi học, lỗi cả lớp hay gặp.
   - Mỗi học viên một tin nhắn riêng gửi phụ huynh (hoặc gửi thẳng học viên), cô thêm nhận xét, bấm 📋 Sao chép rồi dán vào Zalo.
   Dữ liệu lấy từ GV.data (API dash) — không cần sửa Google Sheets.
   Nhận xét của cô, "Đã gửi", bài được giao chọn tay, người nhận: lưu trên máy này (ct_bc).
   Nạp SAU js/theodoi.js và js/nhac.js (dùng NB_P12 / NB_P45 nếu có). ===== */
let BC={w:0,cache:{}};
let BCS={ls:{},to:{},note:{},sent:{}};
try{BCS=Object.assign(BCS,JSON.parse(localStorage.getItem("ct_bc")||"{}"))}catch(e){}
const bcSave=()=>{try{localStorage.setItem("ct_bc",JSON.stringify(BCS))}catch(e){}};
const bcP=n=>String(n).padStart(2,"0");
const bcYmd=d=>d.getFullYear()+"-"+bcP(d.getMonth()+1)+"-"+bcP(d.getDate());
const bcDM=d=>bcP(d.getDate())+"/"+bcP(d.getMonth()+1);
const BC_TH=["CN","T2","T3","T4","T5","T6","T7"];
/* tuần thứ `ago` tính lùi từ tuần này; tuần = Thứ Hai 00:00 → Thứ Hai tuần sau */
function bcWeek(ago){const s=new Date();s.setHours(0,0,0,0);s.setDate(s.getDate()-(s.getDay()+6)%7-7*ago);
 const e=new Date(s);e.setDate(e.getDate()+7);const l=new Date(e);l.setDate(l.getDate()-1);
 return{s:+s,e:+e,ds:bcYmd(s),de:bcYmd(e),key:bcYmd(s),txt:bcDM(s)+" – "+bcDM(l)}}
const bcLsKey=(lv,b)=>lv+"-"+b;

/* bài được giao của lớp: chọn tay > cột "Bài cần làm" trang Lớp (nếu dash trả) > bài cả lớp làm nhiều nhất trong tuần */
function bcAuto(info){if(!info)return null;
 if(info.lesson&&info.lesson.lv&&info.lesson.b)return{lv:+info.lesson.lv,b:+info.lesson.b};
 if(info.lv&&info.b)return{lv:+info.lv,b:+info.b};
 const cap=String(info.cap||info.level||""),bai=String(info.bai||info.giao||"");
 const m=bai.match(/(\d+)/),lv=/mở rộng|h4mr/i.test(cap)?5:/chuẩn/i.test(cap)?6:(cap.match(/(\d)/)||[])[1];
 return m&&lv?{lv:+lv,b:+m[1]}:null}
function bcLesson(cls,W,hv){const D=GV.data,man=(BCS.ls[cls]||{})[W.key];
 if(man==="none")return{les:null,src:"none"};
 if(man){const [lv,b]=man.split("-").map(Number);return{les:{lv,b},src:"tay"}}
 const a=bcAuto((D.lop||[]).find(l=>l.cls==cls));if(a)return{les:a,src:"lop"};
 const cs=new Set(hv.map(h=>h.code)),cnt={};
 D.tt.filter(x=>cs.has(x.code)&&x.at>=W.s&&x.at<W.e).forEach(x=>{const k=bcLsKey(x.lv,x.b);cnt[k]=(cnt[k]||0)+1});
 const k=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0];
 if(!k)return{les:null,src:"none"};const [lv,b]=k.split("-").map(Number);return{les:{lv,b},src:"doan"}}
function bcTitle(les){if(!les)return"";const T=((typeof LTS!="undefined"&&LTS[les.lv])||[])[les.b-1];
 return gvLv(les.lv)+" · Bài "+les.b+(T?" ("+String(T).split("|")[0]+")":"")}

/* các phần cần làm của bài (giống khung Nhắc bài) — null nếu chưa biết */
function bcParts(lv,b){if(typeof NB_P12=="undefined"||typeof LDS=="undefined")return null;
 if(typeof napOk=="function"&&!napOk(lv)){if(!BC["nap"+lv]){BC["nap"+lv]=1;napLv(lv).then(()=>{GV.tab=="bc"&&gvDraw()},()=>{})}return null}
 const L=(LDS[lv]||{})[b];if(!L)return null;
 return(lv>=4&&lv!=6?NB_P45:NB_P12).filter(p=>p[0]!="test"||(L.tsort&&L.tlis)).filter(p=>p[0]!="rd"||(L.texts&&L.texts.length)).map(p=>[p[0],p[2]])}

/* số liệu một học viên trong tuần */
function bcStu(h,W,les,cls,ses){const D=GV.data,inW=t=>t>=W.s&&t<W.e;
 const tc=D.tc.filter(x=>x.code==h.code&&inW(x.at)),days=new Set(tc.map(x=>new Date(x.at).toDateString())).size;
 const min=Math.round(tc.filter(x=>x.t=="Học bài"||x.t=="Làm test").reduce((a,x)=>a+(x.m||0),0));
 const dd=D.dd||[],abs=ses.filter(d=>!dd.some(x=>x.d==d&&x.code==h.code));
 const tests=tc.filter(x=>x.t=="Nộp test").sort((a,b)=>a.at-b.at);
 const errs=D.ls.filter(e=>e.code==h.code&&inW(e.at)),bySec={};errs.forEach(e=>bySec[e.sec]=(bySec[e.sec]||0)+1);
 const dg=(D.dg||[]).filter(x=>x.code==h.code&&x.d>=W.ds&&x.d<W.de),stars=dg.map(x=>x.star).filter(Boolean);
 const R={days,min,abs,ses:ses.length,tests,errs:errs.length,weakSec:Object.keys(bySec).sort((a,b)=>bySec[b]-bySec[a]).slice(0,2).map(k=>k+" ("+bySec[k]+" câu)"),
  star:stars.length?Math.round(stars.reduce((a,b)=>a+b,0)/stars.length*10)/10:null,les};
 if(les){const r=D.tt.find(x=>x.code==h.code&&x.lv==les.lv&&x.b==les.b),P=bcParts(les.lv,les.b)||Object.keys(PNM).filter(k=>k!="test"&&r&&r[k]!=null).map(k=>[k,PNM[k]]);
  const done=P.filter(p=>r&&r[p[0]]!=null);R.avg=r&&r.avg!=null?Math.round(r.avg):null;
  R.miss=P.filter(p=>!r||r[p[0]]==null).map(p=>p[1]);R.low=done.filter(p=>r[p[0]]<80).map(p=>p[1]+" "+Math.round(r[p[0]])+"%");
  R.st=!done.length?"no":R.miss.length||R.low.length?"low":"ok"}
 else R.st=days>=3?"ok":days>=1?"low":"no";
 if(R.st=="no"&&!days&&!h.last)R.never=1;
 return R}

/* tin nhắn gửi phụ huynh / học viên */
function bcMsg(h,R,W,cls){const ph=(BCS.to[cls]||"ph")=="ph",ng=ph?"con":"em",L=[];
 L.push(ph?`Kính gửi phụ huynh bạn ${h.name}!`:`Chào ${h.name}!`);
 L.push(`Cô Thảo gửi ${ph?"kết quả học tiếng Trung của con":"em kết quả học"} tuần ${W.txt} (lớp ${cls}):`);
 if(R.ses)L.push(`• Đi học: ${R.ses-R.abs.length}/${R.ses} buổi`+(R.abs.length?` (vắng ${R.abs.map(d=>BC_TH[new Date(d+"T12:00:00").getDay()]+" "+d.slice(8,10)+"/"+d.slice(5,7)).join(", ")})`:"")+".");
 if(R.les){const t=bcTitle(R.les);
  if(R.st=="ok")L.push(`• Bài về nhà ${t}: ✅ ${ng} đã hoàn thành`+(R.avg!=null?`, điểm trung bình ${R.avg}%`:"")+".");
  else if(R.st=="low"){let s=`• Bài về nhà ${t}: 🟠 ${ng} mới làm một phần`;const x=[];if(R.miss.length)x.push("còn thiếu "+R.miss.join(", "));if(R.low.length)x.push("chưa đạt 80%: "+R.low.join(", "));L.push(s+(x.length?" — "+x.join("; "):"")+".")}
  else L.push(`• Bài về nhà ${t}: ❌ ${ng} chưa làm.`)}
 L.push(R.days?`• Ôn bài trên web: ${R.days} ngày${R.min?`, khoảng ${R.min} phút`:""}.`:R.never?`• ${ph?"Con":"Em"} chưa đăng nhập web ôn bài bằng mã học viên lần nào.`:`• Tuần này ${ng} chưa vào web ôn bài.`);
 if(R.tests.length)L.push(`• Bài test: `+R.tests.map(t=>`${gvLv(t.lv)} Bài ${t.b} được ${t.s}`).join("; ")+".");
 if(R.weakSec.length)L.push(`• Phần ${ng} hay sai: ${R.weakSec.join(", ")} — cô sẽ chữa lại trên lớp.`);
 const nt=(BCS.note[W.key+"|"+h.code]||"").trim();if(nt)L.push(`Nhận xét của cô: ${nt}`);
 L.push("");
 if(R.st=="ok")L.push(ph?"Con học chăm và làm bài đầy đủ, phụ huynh khen con giúp cô nhé!":"Em học rất chăm, cố gắng giữ phong độ nhé!");
 else L.push(ph?"Nhờ phụ huynh nhắc con dành khoảng 15 phút mỗi tối hoàn thành bài trên web trước buổi học tới ạ.":"Em nhớ dành khoảng 15 phút mỗi tối hoàn thành bài trên web trước buổi học tới nhé.");
 L.push(ph?"Cảm ơn phụ huynh đã đồng hành cùng cô!":"Cô cảm ơn em!");
 L.push("— Cô Thảo tiếng Trung");return L.join("\n")}

/* ---------- tab ---------- */
function gvBc(F){const D=GV.data,lops=[...new Set(D.hv.filter(h=>h.st!="Nghỉ").map(h=>h.cls).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"vi"));
 const maxW=Math.min(8,Math.floor(GV.days/7)),W=bcWeek(Math.min(BC.w,maxW));
 const wsel=`<label>Tuần <select onchange="bcWk(+this.value)">${[...Array(Math.max(8,maxW+1)).keys()].slice(0,8).map(i=>{const w=bcWeek(i);return `<option value="${i}" ${i==BC.w?"selected":""}>${i==0?"Tuần này":i==1?"Tuần trước":i+" tuần trước"} · ${w.txt}</option>`}).join("")}</select></label>`;
 if(!GV.cls)return `<div class="gvbar">${wsel}</div><div class="card note">Chọn một lớp để xem báo cáo tuần và tin nhắn gửi từng phụ huynh.</div>
<div class="bcpick">${lops.map(c=>`<button class="btn o" onclick="gvSet('cls','${gvE(c)}')">${gvE(c)}<small>${D.hv.filter(h=>h.cls==c&&h.st!="Nghỉ").length} học viên</small></button>`).join("")||`<div class="card">Chưa có lớp nào.</div>`}</div>`;
 const cls=GV.cls,hv=D.hv.filter(h=>h.cls==cls&&h.st!="Nghỉ"),{les,src}=bcLesson(cls,W,hv);
 const ses=[...new Set((D.dd||[]).filter(x=>x.cls==cls&&x.d>=W.ds&&x.d<W.de).map(x=>x.d))].sort();
 BC.cache={};const per=hv.map(h=>{const R=bcStu(h,W,les,cls,ses);BC.cache[h.code]={h,R,W,cls};return{h,R}});
 const ord={no:0,low:1,ok:2};per.sort((a,b)=>ord[a.R.st]-ord[b.R.st]||a.h.name.localeCompare(b.h.name,"vi"));
 const G=k=>per.filter(p=>p.R.st==k),nm=ps=>ps.map(p=>`<a onclick="bcGo('${p.h.code}')">${gvE(p.h.name)}</a>`).join(", ")||"—";
 const cs=new Set(hv.map(h=>h.code)),errW=D.ls.filter(e=>cs.has(e.code)&&e.at>=W.s&&e.at<W.e),EG=gvGroup(errW).slice(0,3);
 const opts={};D.tt.filter(x=>cs.has(x.code)).forEach(x=>opts[bcLsKey(x.lv,x.b)]={lv:x.lv,b:x.b});if(les)opts[bcLsKey(les.lv,les.b)]=les;
 const cur=les?bcLsKey(les.lv,les.b):"none",to=BCS.to[cls]||"ph",sent=per.filter(p=>BCS.sent[W.key+"|"+p.h.code]).length;
 const okN=G("ok").length;
 return `<div class="gvbar">${wsel}
<label>Bài được giao <select onchange="bcLs(this.value)"><option value="none" ${cur=="none"?"selected":""}>(Không giao bài trên web)</option>${Object.values(opts).sort((a,b)=>a.lv-b.lv||a.b-b.b).map(o=>{const k=bcLsKey(o.lv,o.b);return `<option value="${k}" ${k==cur?"selected":""}>${gvE(bcTitle(o))}</option>`}).join("")}</select></label>
<label>Gửi cho <select onchange="bcTo(this.value)"><option value="ph" ${to=="ph"?"selected":""}>Phụ huynh</option><option value="hv" ${to=="hv"?"selected":""}>Học viên</option></select></label></div>
${src=="doan"?`<p class="ctx">Bài được giao đang <b>đoán</b> theo bài cả lớp làm nhiều nhất tuần này. Nếu chưa đúng, cô chọn lại ở ô <b>Bài được giao</b>.</p>`:""}
<div class="card bcsum"><div class="bch"><div><b>${gvE(cls)}</b> · Tuần ${W.txt}<br><small>${les?gvE(bcTitle(les)):"Không giao bài trên web — xếp theo số ngày vào web ôn"}</small></div>
<div class="gvcnt"><b class="${okN==hv.length?"ok":""}">${okN}/${hv.length}</b><small>${les?"bạn xong bài":"bạn ôn đều"}</small></div></div>
<div class="bcg"><div class="bcr ok"><span>✅ ${les?"Đã xong, đạt từ 80%":"Ôn từ 3 ngày"} (${G("ok").length})</span><div>${nm(G("ok"))}</div></div>
<div class="bcr low"><span>🟠 ${les?"Làm dở / chưa đạt 80%":"Ôn 1–2 ngày"} (${G("low").length})</span><div>${nm(G("low"))}</div></div>
<div class="bcr no"><span>🔴 ${les?"Chưa làm bài":"Không vào web"} (${G("no").length})</span><div>${nm(G("no"))}</div></div></div>
<p>Buổi học trong tuần: <b>${ses.length}</b>${ses.length?` (${ses.map(d=>gvDay(d)).join(", ")})`:" — chưa có điểm danh"}${ses.length?` · vắng: ${per.filter(p=>p.R.abs.length).map(p=>gvE(p.h.name)+(p.R.abs.length>1?" ×"+p.R.abs.length:"")).join(", ")||"không ai"}`:""}</p>
${EG.length?`<div class="bcerr"><b>Cả lớp hay sai (chữa đầu giờ)</b>${EG.map(g=>`<div><small>${gvLv(g.lv)} B${g.b} · ${gvE(g.sec)} · ${g.who.size} bạn</small> <span class="zh">${gvE(g.c)}</span></div>`).join("")}</div>`:""}</div>
<h3 class="ab-h">Tin nhắn gửi ${to=="ph"?"từng phụ huynh":"từng học viên"} <small class="bcsent">Đã gửi ${sent}/${hv.length}</small></h3>
<p class="ctx">Mỗi ${to=="ph"?"phụ huynh":"bạn"} chỉ nhận phần của ${to=="ph"?"con mình":"mình"}. Cô thêm nhận xét (nếu muốn), bấm <b>📋 Sao chép</b> rồi dán vào Zalo. Nhận xét và dấu "Đã gửi" lưu trên máy này.</p>
<div class="bclist">${per.map(p=>bcCard(p.h,p.R,W,cls)).join("")||`<div class="card">Lớp chưa có học viên đang học.</div>`}</div>`}
function bcCard(h,R,W,cls){const k=W.key+"|"+h.code,s=BCS.sent[k];
 const chip={ok:["ok","✅ Tốt"],low:["low","🟠 Cần cố gắng"],no:["no",R.never?"🔴 Chưa vào web lần nào":"🔴 Chưa làm"]}[R.st];
 return `<div class="card bcc ${s?"sent":""}" id="bc_${h.code}"><div class="bcch"><b>${gvE(h.name)}</b><span class="bcchip ${chip[0]}">${chip[1]}</span></div>
<div class="bcmsg" id="bcm_${h.code}">${gvE(bcMsg(h,R,W,cls))}</div>
<textarea class="tin bcnote" rows="2" placeholder="Nhận xét thêm của cô (tùy chọn), ví dụ: Con phát âm thanh 3 tiến bộ rõ." oninput="bcNote('${h.code}',this.value)">${gvE(BCS.note[k]||"")}</textarea>
<div class="row"><button class="btn sm" id="bcb_${h.code}" onclick="bcCopy('${h.code}')">📋 Sao chép tin nhắn</button>
<label class="gvck"><input type="checkbox" ${s?"checked":""} onchange="bcSent('${h.code}',this.checked)"> Đã gửi</label>
<button class="btn o sm" onclick="GV.stu='${h.code}';gvDraw()">Xem chi tiết</button></div></div>`}

/* ---------- thao tác ---------- */
function bcWk(i){BC.w=i;const W=bcWeek(i),need=Math.ceil((Date.now()-W.s)/864e5)+1;
 if(need>GV.days){const d=[7,30,60,120,365].find(x=>x>=need)||365;gvSet("days",d,1)}else gvDraw()}
function bcLs(v){const W=bcWeek(BC.w);(BCS.ls[GV.cls]=BCS.ls[GV.cls]||{})[W.key]=v;bcSave();gvDraw()}
function bcTo(v){BCS.to[GV.cls]=v;bcSave();gvDraw()}
function bcNote(code,v){const c=BC.cache[code];if(!c)return;BCS.note[c.W.key+"|"+code]=v;bcSave();const m=$("bcm_"+code);if(m)m.textContent=bcMsg(c.h,c.R,c.W,c.cls)}
function bcSent(code,on){const c=BC.cache[code];if(!c)return;const k=c.W.key+"|"+code;on?BCS.sent[k]=1:delete BCS.sent[k];bcSave();
 const e=$("bc_"+code);e&&e.classList.toggle("sent",on);const n=Object.keys(BC.cache).filter(x=>BCS.sent[c.W.key+"|"+x]).length,t=document.querySelector(".bcsent");if(t)t.textContent=`Đã gửi ${n}/${Object.keys(BC.cache).length}`}
async function bcCopy(code){const c=BC.cache[code];if(!c)return;const t=bcMsg(c.h,c.R,c.W,c.cls);let ok=false;
 try{await navigator.clipboard.writeText(t);ok=true}catch(e){}
 if(!ok){const a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0;top:0";document.body.appendChild(a);a.select();try{ok=document.execCommand("copy")}catch(e){}a.remove()}
 const b=$("bcb_"+code);
 if(ok){if(b){b.textContent="✅ Đã sao chép — dán vào Zalo";setTimeout(()=>{b.textContent="📋 Sao chép tin nhắn"},2500)}
  const cb=document.querySelector(`#bc_${code} input[type=checkbox]`);if(cb&&!cb.checked){cb.checked=true;bcSent(code,true)}}
 else{const m=$("bcm_"+code);if(m){const r=document.createRange();r.selectNodeContents(m);const s=getSelection();s.removeAllRanges();s.addRange(r)}if(b)b.textContent="Máy chặn sao chép — đã bôi đen, cô bấm giữ để sao chép"}}
function bcGo(code){const e=$("bc_"+code);if(e){e.scrollIntoView({behavior:"smooth",block:"center"});e.classList.add("hl");setTimeout(()=>e.classList.remove("hl"),1600)}}

(function(){const st=document.createElement("style");st.textContent=`
.bcpick{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.bcpick .btn{display:flex;flex-direction:column;align-items:center;gap:2px}.bcpick small{font-weight:400;opacity:.75}
.bcsum .bch{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.bcsum .bch small{color:var(--sub)}.bcsum .gvcnt b.ok{color:#2e7d4f}
.bcg{display:grid;gap:8px;margin:10px 0}.bcr{border-radius:12px;padding:8px 12px;border:1px solid var(--b)}.bcr span{font-weight:800;display:block;margin-bottom:2px}
.bcr.ok{background:rgba(46,125,79,.08)}.bcr.low{background:rgba(201,162,39,.12)}.bcr.no{background:rgba(178,58,72,.08)}.bcr a{color:var(--m);cursor:pointer;text-decoration:underline}
.bcerr{background:var(--k);border-radius:12px;padding:8px 12px;display:grid;gap:4px}.bcerr small{color:var(--sub)}
.bcsent{font-size:.85rem;color:var(--sub);font-weight:400;margin-left:6px}
.bclist{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:12px}.bcc{margin:0;transition:box-shadow .3s}.bcc.sent{opacity:.7}.bcc.hl{box-shadow:0 0 0 3px var(--g)}
.bcch{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:8px}
.bcchip{font-size:.8rem;border-radius:999px;padding:2px 10px;font-weight:700;white-space:nowrap}.bcchip.ok{background:rgba(46,125,79,.15);color:#2e7d4f}.bcchip.low{background:rgba(201,162,39,.2);color:#8a6d0b}.bcchip.no{background:rgba(178,58,72,.15);color:#b23a48}
.bcmsg{white-space:pre-wrap;background:var(--k);border:1px solid var(--b);border-radius:12px;padding:10px 12px;font-size:.92rem;line-height:1.5;user-select:text}
.bcnote{width:100%;box-sizing:border-box;margin:8px 0;font:inherit;resize:vertical}
@media(max-width:600px){.bclist{grid-template-columns:1fr}.bcmsg{font-size:.88rem}}`;document.head.appendChild(st)})();
