/* ===== Ôn tập · Luyện nói theo nhiệm vụ (task-based, bốc thăm – đóng vai) · thêm 28/10/2026 =====
   Dữ liệu: OT[cấp] trong data/hsk{cấp}/ot.js (nạp cùng cấp qua NAP "them"). Mỗi bộ ôn {key, after, bai, tasks[]}
   hiện thành ô rộng ngay sau ô "Bài <after>" trong danh sách Ôn luyện theo bài.
   Luồng: bộ thẻ úp → bốc thăm (bấm 1 thẻ hoặc 🎲) → nhận vai A/B (thẻ riêng, úp) → chuẩn bị → đóng vai
   (thẻ phát sinh, tiêu chí) → báo cáo (gõ / 🎤, 📋 sao chép gửi cô) → hội thoại mẫu + lỗi hay gặp.
   Không chấm điểm, không gửi Sổ theo dõi; thẻ đã làm lưu trên máy (ct_ot_{cấp}). Nạp SAU js/nhanvat.js. ===== */
var OT=window.OT||{};
let OTON=null,OTC=null,OTF=0,OTALL=false,OTORD=[],OTS={},OTREC=false,OTTM=null;
const otLS=(k,v)=>{try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||"null");localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}};
const otSet=()=>OT[olLv]&&OT[olLv].find(s=>s.key==OTON);
const otTask=id=>{const s=otSet();return s&&s.tasks.find(t=>t.id==id)};
const otDoneL=()=>otLS("ct_ot_"+olLv)||[];
const otTxt=()=>otLS("ct_ott_"+olLv)||{};
const otPool=()=>{const s=otSet();return s?s.tasks.filter(t=>!OTF||t.bai==OTF):[]};
function otShuf(){OTORD=shuf(otPool().map(t=>t.id))}
function otOpen(k){OTON=k;OTC=null;OTF=0;OTALL=false;otShuf();rr();scrollTo(0,0)}
function otClose(){otStopT();OTON=null;OTC=null;OTALL=false;rr();scrollTo(0,0)}
function otFil(b){OTF=b;otShuf();rr()}
function otBack(){otStopT();OTC=null;OTALL=false;otShuf();rr();scrollTo(0,0)}
function otAll(v){otStopT();OTALL=v;OTC=null;rr();scrollTo(0,0)}
function otDraw(id){otStopT();if(!id){const P=otPool(),dn=otDoneL(),fr=P.filter(t=>!dn.includes(t.id)&&t.id!=OTC),pool=fr.length?fr:P.filter(t=>t.id!=OTC);if(!pool.length)return;id=pool[Math.floor(Math.random()*pool.length)].id}
 OTC=id;OTS[id]={a:0,b:0,h:0,tw:0,sm:0,er:0,ck:{}};OTALL=false;rr();const v=$("otv");if(v){v.classList.remove("otpop");void v.offsetWidth;v.classList.add("otpop")}scrollTo(0,0)}
function otPick(el,id){if(el.classList.contains("flip"))return;el.classList.add("flip");setTimeout(()=>otDraw(id),520)}
function otRand(){const P=otPool();if(!P.length)return;const dn=otDoneL(),ids=OTORD.filter(i=>!dn.includes(i)),pick=(ids.length?ids:OTORD)[Math.floor(Math.random()*(ids.length||OTORD.length))];
 const el=document.querySelector(`.otb[data-id="${pick}"]`);const all=[...document.querySelectorAll(".otb")];let n=0;
 const hop=setInterval(()=>{all.forEach(x=>x.classList.remove("hot"));if(n>=9){clearInterval(hop);el?otPick(el,pick):otDraw(pick);return}const x=all[Math.floor(Math.random()*all.length)];x&&x.classList.add("hot");n++},110)}
function otTog(k){const s=OTS[OTC];s[k]=s[k]?0:1;rr()}
function otCk(i){const s=OTS[OTC];s.ck[i]=!s.ck[i];const b=document.getElementById("otck"+i);if(b)b.classList.toggle("on",!!s.ck[i]);const n=Object.values(s.ck).filter(Boolean).length,t=otTask(OTC).check.length,e=$("otckn");if(e)e.textContent=`${n}/${t}`}
function otDone(){const d=otDoneL();if(!d.includes(OTC))d.push(OTC);otLS("ct_ot_"+olLv,d);const P=otSet().tasks,left=P.filter(t=>!d.includes(t.id)).length;
 ask(left?`🎉 Hoàn thành nhiệm vụ! Còn ${left} thẻ chưa làm. Bốc thẻ tiếp nhé?`:"🎉 Em đã làm hết các thẻ nhiệm vụ của bộ ôn này. Giỏi lắm!",left?()=>otDraw():null,!left);rr()}
function otReset(){ask("Xóa đánh dấu “đã làm” của tất cả thẻ trên máy này?",()=>{otLS("ct_ot_"+olLv,[]);rr()})}
/* đồng hồ chuẩn bị / đóng vai: chỉ cập nhật ô #otTm, không vẽ lại trang */
function otFmt(s){return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`}
function otStopT(){if(OTTM){clearInterval(OTTM.iv);OTTM=null}}
function otTm(k){const set=otSet();if(OTTM&&OTTM.k==k){otStopT();rr();return}otStopT();const tot=k=="p"?set.prep:set.time;OTTM={k,left:tot,tot,iv:0};rr();
 OTTM.iv=setInterval(()=>{if(!OTTM)return;OTTM.left--;const e=document.getElementById("otTm"+k),b=document.getElementById("otBar"+k);
  if(e)e.textContent=otFmt(Math.max(0,OTTM.left));if(b)b.style.width=(100*Math.max(0,OTTM.left)/OTTM.tot)+"%";
  if(OTTM.left<=0){const kk=OTTM.k;otStopT();try{navigator.vibrate&&navigator.vibrate([200,100,200])}catch(e){}
   if(e){e.textContent="⏰ Hết giờ!";e.classList.add("end")}
   ask(kk=="p"?"⏰ Hết 2 phút chuẩn bị! Bắt đầu đóng vai nhé.":"⏰ Hết giờ đóng vai! Chuyển sang báo cáo kết quả.",null,1)}},1000)}
function otTmBox(k,lb){const set=otSet(),on=OTTM&&OTTM.k==k,left=on?OTTM.left:(k=="p"?set.prep:set.time),tot=k=="p"?set.prep:set.time;
 return `<div class="ottm"><button class="btn sm ${on?"o":""}" onclick="otTm('${k}')">${on?"⏹ Dừng":"▶ "+lb}</button><b id="otTm${k}" class="ottv">${otFmt(left)}</b><span class="otbar"><i id="otBar${k}" style="width:${100*left/tot}%"></i></span></div>`}
/* báo cáo: gõ hoặc nói vào khung */
function otIn(el){const t=otTxt();t[OTC]=el.value;otLS("ct_ott_"+olLv,t)}
function otRec(){if(OTREC)return;if(typeof srListen!="function")return ask("Trình duyệt này chưa thu âm được. Em gõ vào khung nhé.",null,1);
 OTREC=true;const b=$("otmic"),lv=$("srLive");if(b){b.textContent="⏺ Đang nghe… nói xong dừng lại";b.disabled=true}if(lv){lv.hidden=false;lv.textContent="…"}
 srListen(t=>{OTREC=false;const x=otTxt();x[OTC]=((x[OTC]||"").trim()?x[OTC].trim()+"\n":"")+t;otLS("ct_ott_"+olLv,x);rr()},
  c=>{OTREC=false;rr();ask((typeof srMsg=="function"&&srMsg(c))||"Máy chưa nghe được, em thử lại nhé.",null,1)})}
function otCopy(){const T=otTask(OTC),set=otSet(),x=(otTxt()[OTC]||"").trim();
 if(!x)return ask("Em chưa có nội dung báo cáo để sao chép.",null,1);
 const nm=(typeof TRKME!="undefined"&&TRKME)?[TRKME.ten||TRKME.name||"",TRKME.ma||TRKME.code||""].filter(Boolean).join(" · "):"";
 cpTxt(`[HSK ${olLv} · ${set.t} · Nhiệm vụ ${T.id}: ${T.t} ${T.zh}]${nm?"\nHọc viên: "+nm:""}\n${x}`)}
/* ---------- giao diện ---------- */
const otSen=(x,big)=>`<div class="ots ${big?"big":""}"><div><span class="zh">${x[0]}</span> ${bS(x[0].replace(/……/g,""))}</div><div class="py">${x[1]}</div><div class="vi">${x[2]}</div></div>`;
const otTag=T=>`<span class="pill">Bài ${T.bai} · Hội thoại ${T.bk}</span>`;
function otRole(T,r,open){const R=T[r],k=r.toLowerCase();
 return `<div class="otrole orl-${k} ${open?"open":""}"><div class="otrh"><span class="otrl">${r}</span><div><small>Vai ${r}</small><b>${R.who}</b></div></div>
${open?`<div class="otrb"><h4>📌 Thông tin chỉ em biết</h4><ul>${R.info.map(x=>`<li>${x}</li>`).join("")}</ul><h4>✅ Nhiệm vụ của em</h4><ol>${R.task.map(x=>`<li>${x}</li>`).join("")}</ol>
<button class="btn o sm" onclick="otTog('${k}')">🙈 Úp thẻ lại</button></div>`:`<div class="otrb lock"><p>🔒 Thẻ úp. Chỉ bạn đóng <b>vai ${r}</b> được xem.</p><button class="btn sm" onclick="otTog('${k}')">👁 Lật thẻ vai ${r}</button></div>`}</div>`}
function otDeck(){const set=otSet(),dn=otDoneL(),P=otPool(),nd=set.tasks.filter(t=>dn.includes(t.id)).length;
 return `<div class="card note otguide"><b>🎲 Cách chơi</b><ol><li><b>Bốc thăm:</b> bấm vào một thẻ úp (hoặc 🎲 Bốc ngẫu nhiên). Mỗi thẻ là một nhiệm vụ nói gắn với một đoạn hội thoại của bài, nhưng bối cảnh <b>khác sách</b>.</li><li><b>Nhận vai:</b> hai bạn chọn vai A / B. Mỗi bạn chỉ lật thẻ vai của mình – thẻ có thông tin bạn kia không biết, nên phải hỏi – đáp mới hoàn thành được.</li><li><b>Chuẩn bị ${set.prep/60} phút → đóng vai ${set.time/60} phút.</b> Không đọc theo sách, nói bằng lời của em.</li><li><b>Báo cáo:</b> nói 2–3 câu về kết quả nhiệm vụ trước lớp (hoặc gõ / nói vào khung rồi 📋 sao chép gửi cô).</li></ol><small>Học một mình: lật cả hai thẻ và tự đóng hai vai.</small></div>
<div class="row otfil"><span>Bốc trong:</span>${[0,...set.bai].map(b=>`<button class="btn sm ${OTF==b?"":"o"}" onclick="otFil(${b})">${b?"Bài "+b:"Cả "+set.bai.length+" bài"}</button>`).join("")}</div>
<div class="otdeck">${OTORD.map((id,i)=>{const T=set.tasks.find(t=>t.id==id),d=dn.includes(id);return `<button class="otb ${d?"dn":""}" data-id="${id}" onclick="otPick(this,'${id}')" aria-label="Thẻ nhiệm vụ số ${i+1}${d?" (đã làm)":""}"><span class="otbi"><span class="otbf"><img src="img/logo.webp" alt=""><span class="zh">任务</span><small>Thẻ ${i+1}</small>${OTF?"":`<i>Bài ${T.bai}</i>`}${d?`<em>✓ đã làm</em>`:""}</span><span class="otbk"><span class="zh">${T.ic}</span></span></span></button>`}).join("")}</div>
<div class="row c"><button class="btn otbig" onclick="otRand()">🎲 Bốc ngẫu nhiên</button></div>
<p class="otsm">Đã làm <b>${nd}/${set.tasks.length}</b> thẻ trên máy này.${nd?` <a href="javascript:void 0" onclick="otReset()">Làm lại từ đầu</a>`:""} · <a href="javascript:void 0" onclick="otAll(true)">👩‍🏫 Giáo viên: xem / in tất cả thẻ</a></p>`}
function otView1(){const set=otSet(),T=otTask(OTC),s=OTS[OTC]||(OTS[OTC]={ck:{}}),dn=otDoneL().includes(T.id),tx=otTxt()[T.id]||"",ckn=Object.values(s.ck).filter(Boolean).length,rw=T.rep.who=="AB"?"Cả hai bạn":"Vai "+T.rep.who;
 return `<div class="row noprint"><button class="btn o sm" onclick="otBack()">← Bộ thẻ</button><button class="btn o sm" onclick="otDraw()">🎲 Bốc thẻ khác</button></div>
<div id="otv" class="ottask"><div class="otfront"><div class="otic">${T.ic}</div><div class="otft"><small>Thẻ nhiệm vụ ${T.id} ${otTag(T)}${dn?` <span class="pill ok">✓ đã làm</span>`:""}</small>
<h3>${T.t}</h3><div><span class="zh">${T.zh}</span> <span class="py">${T.zp}</span></div></div></div>
<div class="otsc"><p><b>📍 Bối cảnh:</b> ${T.scene}</p><p class="otgoal"><b>🎯 Kết quả cần đạt:</b> ${T.goal}</p><p class="otgr"><b>🧩 Cần dùng:</b> ${T.gram.map(g=>`<span class="pill">${g}</span>`).join("")}</p></div></div>
<div class="card"><h3>① Nhận vai</h3><p class="otsm">Mỗi bạn chọn một vai và chỉ lật thẻ của mình. Hai thẻ có thông tin khác nhau.</p><div class="otroles">${otRole(T,"A",s.a)}${otRole(T,"B",s.b)}</div></div>
<div class="card"><h3>② Chuẩn bị · ${set.prep/60} phút</h3>${otTmBox("p","Bắt đầu chuẩn bị")}
<p class="otsm">Nghĩ xem em cần nói những câu gì để làm xong nhiệm vụ trên thẻ vai. Cố tự nói trước; bí thì mở mẫu câu.</p>
<div class="otwd"><b>📚 Từ gợi ý (ngoài bài / tên riêng):</b> ${T.words.map(w=>`<span class="otw"><span class="zh">${w[0]}</span> <span class="py">${w[1]}</span> <span class="vi">${w[2]}</span> ${bS(w[0])}</span>`).join("")}</div>
<button class="btn o sm" onclick="otTog('h')">${s.h?"▲ Ẩn mẫu câu":"💡 Xem mẫu câu hỗ trợ"}</button>${s.h?`<div class="otsl">${T.help.map(x=>otSen(x)).join("")}</div>`:""}</div>
<div class="card"><h3>③ Đóng vai · ${set.time/60} phút</h3>${otTmBox("t","Bắt đầu đóng vai")}
<p class="otsm">Nói tự nhiên, không nhìn mẫu câu. Giữa chừng có thể rút <b>thẻ phát sinh</b> để tình huống khó hơn.</p>
<button class="btn o sm" onclick="otTog('tw')">${s.tw?"🃏 Úp thẻ phát sinh":"🃏 Rút thẻ phát sinh"}</button>
${s.tw?`<div class="ottw"><b>🃏 Thẻ phát sinh · chỉ vai ${T.twist.to} đọc</b><p>${T.twist.vi}</p>${otSen(T.twist.h)}</div>`:""}
<h4 class="otckh">Tiêu chí hoàn thành <span id="otckn">${ckn}/${T.check.length}</span></h4><div class="otck">${T.check.map((c,i)=>`<button id="otck${i}" class="otcb ${s.ck[i]?"on":""}" onclick="otCk(${i})"><i></i>${c}</button>`).join("")}</div></div>
<div class="card"><h3>④ Báo cáo kết quả</h3><p><b>${rw}</b> báo cáo trước lớp (2–3 câu): ${T.rep.q}</p>
<div class="otsl">${T.rep.f.map(x=>otSen(x)).join("")}</div>
<textarea id="otTa" class="otta" rows="4" placeholder="Gõ (chữ Hán hoặc pinyin) hoặc bấm 🎤 để nói vào khung…" oninput="otIn(this)">${esc(tx)}</textarea>
<div class="sr-live" id="srLive" hidden></div>
<div class="row"><button class="btn o sm" id="otmic" onclick="otRec()">🎤 Nói vào khung</button><button class="btn sm" onclick="otCopy()">📋 Sao chép gửi cô</button></div>${srWarn()?`<p class="otsm">${srWarn()}</p>`:""}</div>
<div class="card"><h3>⑤ Tự kiểm tra</h3><p class="otsm">Làm xong mới mở để so sánh. Hội thoại mẫu chỉ là <b>một</b> cách làm; em nói khác mà đúng nhiệm vụ vẫn tốt.</p>
<div class="row"><button class="btn o sm" onclick="otTog('sm')">${s.sm?"▲ Ẩn hội thoại mẫu":"👁 Xem hội thoại mẫu"}</button><button class="btn o sm" onclick="otTog('er')">${s.er?"▲ Ẩn lỗi hay gặp":"⚠️ Lỗi người Việt hay mắc"}</button></div>
${s.sm?`<div class="otdl">${T.sample.map(l=>`<div class="otdr orl-${l[0].toLowerCase()}"><span class="otrl">${l[0]}</span><div><span class="zh">${l[1]}</span> ${bS(l[1])}<div class="py">${l[2]}</div><div class="vi">${l[3]}</div></div></div>`).join("")}</div>`:""}
${s.er?`<div class="oter">${T.err.map(e=>`<div><div>❌ <span class="zh">${e[0]}</span></div><div>✅ <span class="zh">${e[1]}</span></div><small>${e[2]}</small></div>`).join("")}</div>`:""}</div>
<div class="row c noprint"><button class="btn" onclick="otDone()">✓ Hoàn thành nhiệm vụ</button><button class="btn o" onclick="otDraw()">🎲 Bốc thẻ khác</button></div>`}
function otPrint(){try{window.print()}catch(e){ask("Trình duyệt chặn in ở đây. Em bấm Ctrl + P (máy tính) hoặc Chia sẻ › In (điện thoại).",null,1)}}
function otAllView(){const set=otSet();
 return `<div class="row noprint"><button class="btn o sm" onclick="otAll(false)">← Bộ thẻ</button><button class="btn sm" onclick="otPrint()">🖨 In thẻ</button></div>
<div class="card note noprint">Dành cho cô: in ra, cắt theo đường ✂ – mỗi nhiệm vụ gồm <b>thẻ nhiệm vụ</b> (úp để học viên bốc), <b>thẻ vai A</b>, <b>thẻ vai B</b> và <b>thẻ phát sinh</b> (cô phát giữa chừng). Mẫu câu, hội thoại mẫu, lỗi hay gặp có trên web.</div>
${set.tasks.map(T=>`<div class="otpr"><div class="otpc otpf"><small>Thẻ nhiệm vụ ${T.id} · Bài ${T.bai} · Hội thoại ${T.bk}</small><h3>${T.ic} ${T.t} <span class="zh">${T.zh}</span></h3><p><b>Bối cảnh:</b> ${T.scene}</p><p><b>Kết quả cần đạt:</b> ${T.goal}</p><p><b>Cần dùng:</b> <span class="zh">${T.gram.join(" · ")}</span></p></div>
${["A","B"].map(r=>`<div class="otpc otp${r.toLowerCase()}"><small>${T.id} · Vai ${r}</small><h4>${T[r].who}</h4><b>Thông tin chỉ em biết</b><ul>${T[r].info.map(x=>`<li>${x}</li>`).join("")}</ul><b>Nhiệm vụ của em</b><ol>${T[r].task.map(x=>`<li>${x}</li>`).join("")}</ol></div>`).join("")}
<div class="otpc otpt"><small>${T.id} · Thẻ phát sinh · vai ${T.twist.to}</small><p>${T.twist.vi}</p><p class="zh">${T.twist.h[0]}</p><p class="py">${T.twist.h[1]}</p></div></div>`).join("")}`}
function otView(){const set=otSet();
 return `<div class="row noprint"><button class="btn o sm" onclick="otClose()">← Danh sách bài</button></div>
<div class="lhead"><span class="no">🎲</span><div><small>HSK ${olLv} · ${set.t}</small><div class="zh lt2">${set.zh}</div><div>${set.sub}</div></div></div>
${pvBar()}<div class="stack ot ${hidePy?"hidepy":""} ${hideVi?"hidevi":""}">${OTALL?otAllView():OTC?otView1():otDeck()}</div>`}
/* ô "Ôn tập" chèn ngay sau ô Bài <after> */
const _otLessons=lessons;lessons=function(mode){let h=_otLessons(mode);if(mode!="ol"||!OT[olLv])return h;
 OT[olLv].forEach(s=>{const dn=otDoneL().filter(id=>s.tasks.some(t=>t.id==id)).length;
  const tile=`<div class="ls go otls" onclick="otOpen('${s.key}')"><b>🎲 ${s.t}</b><span class="lt">${s.sub}</span><small>${dn?`<i class="sc ${dn==s.tasks.length?"ok":"no"}">${dn}/${s.tasks.length} thẻ</i>`:"Bốc thăm →"}</small></div>`;
  const re=new RegExp(`(<div class="ls[^"]*"[^>]*openL\\(${s.after}\\)[^>]*>[\\s\\S]*?</small></div>)`);
  h=re.test(h)?h.replace(re,"$1"+tile):h.replace(/<\/div>$/,tile+"</div>")});return h};
const _otDrawOl=drawOl;drawOl=function(){if(OTON&&!cur&&otSet()&&(typeof napOk!="function"||napOk(olLv))){$("lp-ol").innerHTML=otView();return}return _otDrawOl()};
const _otSetLv=setLv;setLv=function(l){otStopT();OTON=null;OTC=null;return _otSetLv(l)};
const _otOpenL=openL;openL=function(n){otStopT();OTON=null;OTC=null;return _otOpenL(n)};
const _otGoSub=goSub;goSub=function(id){if(id=="ol"){otStopT();OTON=null;OTC=null}return _otGoSub(id)};
const _otCrumb=crumbDraw;crumbDraw=function(){_otCrumb();const c=$("crumb");if(!c||SUBC!="ol"||!OTON||cur)return;const set=otSet();if(!set)return;
 c.innerHTML=`<a onclick="go('home')">Trang chủ</a> › <a onclick="goSub('ol')">Học tiếng Trung</a> › <a onclick="olShelf()">Ôn luyện theo bài</a> › <a onclick="otClose()">${shN(olLv)}</a> › `+(OTC||OTALL?`<a onclick="otBack()">${set.t}</a> › ${OTALL?"Tất cả thẻ":"Thẻ "+OTC}`:set.t)};
(function(){const st=document.createElement("style");st.textContent=`
.otls{grid-column:1/-1;background:linear-gradient(120deg,#5c1730,#8e2a4f)!important;color:#fff!important;border:2px solid #c9a227!important;display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}
.otls b{color:#f3d77a!important;font-size:1.1rem}.otls .lt{color:#fff!important}.otls small{color:#f3e2b8!important}
.ot .otsm{color:var(--sub);font-size:.92rem}
.otguide ol{margin:6px 0 4px 18px;padding:0}.otguide li{margin:4px 0}
.otfil{align-items:center;gap:8px;margin:12px 0}
.otdeck{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:16px;margin:14px 0 18px}
.otb{border:0;background:none;padding:0;cursor:pointer;perspective:900px;aspect-ratio:3/4;font:inherit}
.otbi{position:relative;display:block;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d}
.otb:hover .otbi,.otb:focus-visible .otbi,.otb.hot .otbi{transform:translateY(-6px) rotate(-2deg)}
.otb.flip .otbi{transform:rotateY(180deg)}
.otbf,.otbk{position:absolute;inset:0;border-radius:16px;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;box-shadow:0 8px 18px rgba(60,10,30,.28)}
.otbf{background:repeating-linear-gradient(45deg,rgba(255,255,255,.05) 0 10px,transparent 10px 20px),linear-gradient(160deg,#8e2a4f,#3d0d20);border:3px solid #c9a227;color:#fff}
.otbf img{width:42px;height:42px;border-radius:50%;background:#fff;border:2px solid #c9a227}
.otbf .zh{font-size:1.9rem;color:#f3d77a;font-weight:700;line-height:1.1}.otbf small{opacity:.9}
.otbf i{font-style:normal;font-size:.75rem;background:rgba(201,162,39,.25);border:1px solid #c9a227;border-radius:20px;padding:1px 8px}
.otbf em{font-style:normal;font-size:.75rem;color:#b8f0c4}
.otb.hot .otbf{box-shadow:0 0 0 4px #f3d77a,0 8px 18px rgba(60,10,30,.35)}
.otb.dn .otbf{filter:saturate(.55) brightness(.9)}
.otbk{transform:rotateY(180deg);background:#fbf5e6;border:3px solid #c9a227}.otbk .zh{font-size:3rem}
.otbig{font-size:1.1rem;padding:12px 26px}
.ottask{background:var(--c);border:2px solid #c9a227;border-radius:22px;box-shadow:var(--sh);overflow:hidden;margin:10px 0 16px}
.otpop{animation:otpop .55s ease}@keyframes otpop{from{transform:perspective(900px) rotateY(80deg) scale(.9);opacity:.2}to{transform:none;opacity:1}}
.otfront{display:flex;gap:14px;align-items:center;background:linear-gradient(120deg,#5c1730,#8e2a4f);color:#fff;padding:16px 18px}
.otic{font-size:2.6rem;width:64px;height:64px;display:grid;place-items:center;background:#fbf5e6;border-radius:50%;border:3px solid #c9a227;flex:none}
.otft h3{margin:4px 0;color:#f3d77a;font-size:1.35rem;border:0;padding:0}.otft .zh{font-size:1.15rem}.otft .py{color:#f3e2b8}
.otft small{display:flex;flex-wrap:wrap;gap:6px;align-items:center;opacity:.95}.otft .pill{background:rgba(255,255,255,.15);color:#fff;border-color:#c9a227}
.otsc{padding:12px 18px 6px}.otsc p{margin:6px 0;line-height:1.6}.otgoal{background:#fff7dd;border-left:4px solid #c9a227;padding:8px 10px;border-radius:8px;color:#3a2a10}
.otgr .pill{margin:2px 4px 2px 0}
.otroles{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.otrole{border-radius:16px;border:2px solid #c9a227;overflow:hidden;background:var(--c)}.otrole.orl-b{border-color:#8e2a4f}
.otrh{display:flex;gap:10px;align-items:center;padding:10px 12px;background:#fbf0d2;color:#3a2a10}.orl-b .otrh{background:#f6e3ea}
.otrh small{display:block;color:#7a5a20}.otrl{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:800;background:#c9a227;color:#fff;flex:none}
.orl-b .otrl{background:#8e2a4f}
.otrb{padding:10px 14px}.otrb h4{margin:8px 0 4px;color:var(--m)}.otrb ul,.otrb ol{margin:0 0 8px 18px;padding:0}.otrb li{margin:3px 0;line-height:1.5}
.otrb.lock{text-align:center;padding:20px 12px;background:repeating-linear-gradient(45deg,rgba(201,162,39,.08) 0 10px,transparent 10px 20px)}
.ottm{display:flex;align-items:center;gap:12px;margin:6px 0 10px;flex-wrap:wrap}.ottv{font-size:1.5rem;font-variant-numeric:tabular-nums;color:var(--m);min-width:64px}.ottv.end{color:#b23a3a}
.otbar{flex:1;min-width:120px;height:8px;border-radius:8px;background:#efe3c4;overflow:hidden}.otbar i{display:block;height:100%;background:linear-gradient(90deg,#c9a227,#8e2a4f);transition:width 1s linear}
.otwd{margin:8px 0}.otw{display:inline-flex;gap:4px;align-items:center;background:var(--k);border:1px solid var(--b);border-radius:20px;padding:2px 10px;margin:3px 4px 3px 0}
.otsl{display:grid;gap:8px;margin:10px 0}.ots{background:var(--k);border-radius:12px;padding:8px 12px}.ots .zh{font-size:1.15rem}.ots .py{font-size:.9rem;color:var(--sub)}
.ottw{margin:10px 0;padding:10px 12px;border:2px dashed #b23a3a;border-radius:12px;background:#fff1f1;color:#3a1010}.ottw .ots{background:#fff}
.otckh{margin:14px 0 6px;color:var(--m)}.otck{display:grid;gap:6px}
.otcb{display:flex;gap:10px;align-items:center;text-align:left;background:var(--k);border:1px solid var(--b);border-radius:12px;padding:8px 12px;font:inherit;color:var(--t);cursor:pointer}
.otcb i{width:20px;height:20px;border-radius:6px;border:2px solid #c9a227;flex:none;display:grid;place-items:center;font-style:normal}
.otcb.on{background:#e3f4e6;border-color:#3b8a4a;color:#1f5a2a}.otcb.on i{background:#3b8a4a;border-color:#3b8a4a}.otcb.on i::after{content:"✓";color:#fff;font-size:.8rem}
.otta{width:100%;box-sizing:border-box;border-radius:12px;border:1px solid var(--b);padding:10px;font:inherit;font-size:1.05rem;margin:6px 0;background:var(--c);color:var(--t)}
.otdl{display:grid;gap:8px;margin:10px 0}.otdr{display:flex;gap:10px;align-items:flex-start;background:var(--k);border-radius:12px;padding:8px 10px}.otdr .zh{font-size:1.1rem}.otdr .py{font-size:.9rem;color:var(--sub)}
.oter{display:grid;gap:8px;margin:10px 0}.oter>div{background:#fff7f0;border-left:4px solid #e08a2c;border-radius:10px;padding:8px 12px;color:#3a2410}.oter small{display:block;margin-top:4px;color:#6a4a2a}
.otpr{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0;page-break-inside:avoid;break-inside:avoid}
.otpc{border:2px dashed #8e2a4f;border-radius:12px;padding:10px 12px;background:var(--c)}.otpc h3,.otpc h4{margin:4px 0;border:0}.otpc ul,.otpc ol{margin:2px 0 6px 18px;padding:0}.otpc small{color:var(--sub)}
.otpf{grid-column:1/-1;border-color:#c9a227;background:#fffaf0;color:#2a1a10}.otpt{grid-column:1/-1;border-color:#b23a3a}
@media(max-width:640px){.otroles,.otpr{grid-template-columns:1fr}.otdeck{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.otbf .zh{font-size:1.4rem}.otbf img{width:30px;height:30px}.otic{width:52px;height:52px;font-size:2rem}.otfront{padding:12px}}
@media print{header,footer,nav,#crumb,#lh2,.pvbar,.noprint,.lhead,#mbtn,.navside,.lside,.le-band{display:none!important}body,main{background:#fff!important}.otpc{background:#fff!important;color:#000!important}}`;document.head.appendChild(st)})();
