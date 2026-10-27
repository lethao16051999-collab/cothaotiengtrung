/* ===== Theo dõi học tập · thêm 22/10/2026 =====
   Học viên nhập MÃ HỌC VIÊN (cô cấp trong Google Sheets) → trang tải tiến trình cũ về, tự lưu tiến trình lên Sheet,
   ghi thời gian học, điểm test và các câu làm sai lần đầu. Khách không có mã: học bình thường, chỉ lưu trên máy, không gửi gì.
   Địa chỉ Sheet (ứng dụng web Apps Script) đặt ở TRK_URL. Để trống = tắt hẳn chức năng.
   Nạp SAU js/read.js. Không sửa file khác. Mã Sheet: apps-script/Code.gs (không đăng lên trang). ===== */
const TRK_URL="https://script.google.com/macros/s/AKfycbzwJj7bMam8_gZHPltogTqSvxVrxI6ikvzkj6gZLm1bnk2jmrRr57Dg6IStI23Og5HZOw/exec";
const TRK_API=(()=>{try{return localStorage.getItem("ct_trk_url")||TRK_URL}catch(e){return TRK_URL}})();
const TRK_KEY=/^ct_hsk\d+_b\d+$/;
/* Trang có đổi tên khóa (hsk1/ Giáo trình chuẩn: ct_hsk1_ → ct_hsk6_) khai CT_RAW (hàm gốc), CT_KMAP (đổi khóa), CT_LVMAP (đổi cấp) trước khi nạp file này */
const _trkRaw=window.CT_RAW||{s:Storage.prototype.setItem,g:Storage.prototype.getItem,r:Storage.prototype.removeItem};
const trkLv=()=>window.CT_LVMAP?CT_LVMAP(olLv):olLv;
const trkJ=(k,d)=>{try{const v=_trkRaw.g.call(localStorage,k);return v?JSON.parse(v):d}catch(e){return d}};
const _trkSet=_trkRaw.s;
const trkPut=(k,o)=>{try{_trkSet.call(localStorage,k,JSON.stringify(o))}catch(e){}};
let TRKME=trkJ("ct_trk_me",null),TRKQ=trkJ("ct_trk_q",{ev:[],err:[]}),TRKD=trkJ("ct_trk_dirty",[]),TRKBUSY=false,TRKLAST=trkJ("ct_trk_last",0),TRKMSG="",TRKBAN=false,TRKSEEN={};
const trkOn=()=>!!TRK_API;
const trkIn=()=>trkOn()&&!!TRKME;

/* ---------- gửi / nhận ---------- */
async function trkPost(o,keep){const r=await fetch(TRK_API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o),keepalive:!!keep,redirect:"follow"});return r.json()}
function trkMerge(a,b){if(a==null)return b;if(b==null)return a;if(typeof a=="number"&&typeof b=="number")return Math.max(a,b);if(typeof a=="boolean"&&typeof b=="boolean")return a||b;
 if(typeof a=="object"&&typeof b=="object"&&!Array.isArray(a)&&!Array.isArray(b)){const o=Object.assign({},a);Object.keys(b).forEach(k=>o[k]=trkMerge(a[k],b[k]));return o}return b}
function trkDirty(k){if(!TRKD.includes(k)){TRKD.push(k);trkPut("ct_trk_dirty",TRKD)}trkSoon()}
let TRKT=null;function trkSoon(ms){if(!trkIn())return;clearTimeout(TRKT);TRKT=setTimeout(()=>trkFlush(),ms||5000)}
function trkPending(){return TRKD.length+TRKQ.ev.length+TRKQ.err.length}
async function trkFlush(beacon){if(!trkIn()||TRKBUSY||!trkPending())return;
 const keys=TRKD.slice(),prog={};keys.forEach(k=>prog[k]=trkJ(k,{}));
 const ev=TRKQ.ev.slice(0,200),err=TRKQ.err.slice(0,300),body={a:"sync",code:TRKME.code,prog,ev,err};
 if(beacon){try{fetch(TRK_API,{method:"POST",mode:"no-cors",keepalive:true,headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(body)})}catch(e){}return}
 TRKBUSY=true;
 try{const r=await trkPost(body);
  if(r&&r.ok){TRKD=TRKD.filter(k=>!keys.includes(k)||JSON.stringify(trkJ(k,{}))!==JSON.stringify(prog[k]));
   TRKQ.ev=TRKQ.ev.slice(ev.length);TRKQ.err=TRKQ.err.slice(err.length);
   /* máy khác có kết quả tốt hơn → ghi về máy này */
   Object.keys(r.prog||{}).forEach(k=>{if(!TRKD.includes(k)&&JSON.stringify(trkJ(k,{}))!==JSON.stringify(r.prog[k]))trkPut(k,r.prog[k])});
   TRKLAST=Date.now();trkPut("ct_trk_last",TRKLAST);trkPut("ct_trk_dirty",TRKD);trkPut("ct_trk_q",TRKQ);TRKMSG=""}
  else if(r&&(r.err=="no_code"||r.err=="off")){TRKMSG=r.err=="off"?"Mã học viên đã tạm ngừng. Em hỏi cô Thảo nhé.":"Mã học viên không còn đúng. Em hỏi cô Thảo nhé."}
 }catch(e){TRKMSG="Chưa gửi được (có thể đang mất mạng). Trang sẽ tự gửi lại."}
 TRKBUSY=false;trkBadge();if(trkPending()&&!TRKMSG)trkSoon(30000)}

/* ---------- đăng nhập bằng mã ---------- */
async function trkLogin(){const el=$("trkcode"),code=(el&&el.value||"").trim().toUpperCase();
 if(!code){trkBox("Em hãy nhập mã học viên cô Thảo đã gửi.");return}
 trkBox("Đang kiểm tra mã…",true);
 let r;try{r=await trkPost({a:"login",code})}catch(e){trkBox("Chưa kết nối được. Em kiểm tra mạng rồi thử lại nhé.");return}
 if(!r||!r.ok){trkBox(r&&r.err=="off"?"Mã này đã tạm ngừng. Em hỏi cô Thảo nhé.":"Mã chưa đúng. Em xem lại mã cô gửi (ví dụ KIET-4821).");return}
 TRKME={code:r.code,name:r.name,cls:r.cls};trkPut("ct_trk_me",TRKME);
 try{if(r.name)_trkSet.call(localStorage,"ct_name",r.name)}catch(e){}
 /* gộp: kết quả trên Sheet + kết quả đang có trên máy, giữ phần tốt hơn */
 const sv=r.prog||{},loc=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(TRK_KEY.test(k))loc.push(k)}
 new Set(Object.keys(sv).concat(loc)).forEach(k=>{const m=trkMerge(sv[k],trkJ(k,null));trkPut(k,m||{});if(JSON.stringify(m)!==JSON.stringify(sv[k]))trkDirty(k)});
 trkEv({t:"Vào học (nhập mã)"});trkClose();trkBadge();
 if(typeof rr=="function")rr();
 ask(`Chào <b>${esc(r.name)}</b>${r.cls?" · "+esc(r.cls):""}! Tiến trình của em đã được tải về. Từ giờ trang tự lưu cho em.`,null,1);
 trkFlush()}
function trkOut(){trkClose();ask("Đăng xuất khỏi máy này? Kết quả của em đã lưu cho cô, lần sau nhập lại mã là học tiếp được.",async()=>{
 await trkFlush();if(trkPending())await trkFlush();
 const ks=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(TRK_KEY.test(k))ks.push(k)}
 ks.concat(["ct_trk_me","ct_trk_q","ct_trk_dirty","ct_trk_last","ct_trk_s","ct_name"]).forEach(k=>{try{_trkRaw.r.call(localStorage,k)}catch(e){}});
 TRKME=null;TRKQ={ev:[],err:[]};TRKD=[];TRKSESS=null;trkBadge();if(typeof rr=="function")rr()})}

/* ---------- giao diện: nút ở thanh menu + hộp nhập mã ---------- */
function trkBadge(){if(!trkOn())return;let b=$("trkme");const h=document.querySelector("header");if(!h)return;
 if(!b){b=document.createElement("button");b.id="trkme";b.className="trkme";b.onclick=()=>trkOpen();h.insertBefore(b,$("mbtn"))}
 const p=trkPending();b.innerHTML=trkIn()?`👤 <span>${esc(TRKME.name.split(/\s+/).pop()||TRKME.code)}</span>${p&&TRKMSG?`<i class="trkdot" title="Chưa gửi được"></i>`:""}`:`🔑 <span class="trkl">Mã học viên</span><span class="trks">Mã</span>`;
 b.title=trkIn()?"Học viên đang học: "+TRKME.name:"Nhập mã học viên để lưu tiến trình"}
function trkClose(){const d=$("trkbox");if(d){d.hidden=true;d.innerHTML=""}}
function trkOpen(){trkBox("")}
function trkBox(msg,wait){let d=$("trkbox");if(!d){d=document.createElement("div");d.id="trkbox";document.body.appendChild(d)}d.hidden=false;
 const ago=TRKLAST?Math.max(0,Math.round((Date.now()-TRKLAST)/60000)):null,p=trkPending();
 d.innerHTML=`<div class="askw" onclick="if(event.target===this)trkClose()"><div class="card trkc">`+(trkIn()?`
<h3>👤 ${esc(TRKME.name)}</h3><p>${TRKME.cls?`Lớp: <b>${esc(TRKME.cls)}</b> · `:""}Mã: <b>${esc(TRKME.code)}</b></p>
<p class="ctx">${p?`Còn ${p} mục chưa gửi cho cô.`:"Đã lưu hết."}${ago!=null?` Lần lưu gần nhất: ${ago<1?"vừa xong":ago+" phút trước"}.`:""}</p>${TRKMSG?`<p class="bad">${TRKMSG}</p>`:""}
<div class="row c"><button class="btn" onclick="trkFlush().then(()=>trkOpen())">💾 Lưu ngay</button><button class="btn o" onclick="trkOut()">Đăng xuất (đổi người học)</button><button class="btn o" onclick="trkClose()">Đóng</button></div>`:`
<h3>🔑 Mã học viên</h3><p>Em là học viên lớp cô Thảo? Nhập mã cô gửi để <b>lưu tiến trình</b> và học tiếp trên điện thoại, máy tính khác.</p>
<input class="tin" id="trkcode" placeholder="Ví dụ: KIET-4821" autocomplete="off" autocapitalize="characters" onkeydown="if(event.key=='Enter')trkLogin()" ${wait?"disabled":""}>
${msg?`<p class="${wait?"ctx":"bad"}">${msg}</p>`:""}
<div class="row c"><button class="btn" onclick="trkLogin()" ${wait?"disabled":""}>Vào học</button><button class="btn o" onclick="trkClose()">Để sau</button></div>
<p class="ctx">Khi dùng mã, kết quả học (điểm từng phần, câu làm sai, thời gian học) được gửi cho cô Thảo để cô theo dõi và hướng dẫn em. Chưa có mã thì em vẫn học bình thường, kết quả chỉ lưu trên máy này.</p>`)+`</div></div>`;
 const i=$("trkcode");if(i&&!wait)setTimeout(()=>i.focus(),30)}
/* lời nhắc nhỏ ở đầu bài học / bài test khi chưa nhập mã */
function trkBanner(){return trkOn()&&!trkIn()&&!TRKBAN?`<div class="card trkban"><span>🔑 Em là học viên lớp cô Thảo? Nhập <b>mã học viên</b> để lưu tiến trình và học tiếp trên máy khác.</span><button class="btn sm" onclick="trkOpen()">Nhập mã</button><button class="btn o sm" onclick="TRKBAN=true;rr()">Để sau</button></div>`:trkIn()?`<div class="trkwho">👤 ${esc(TRKME.name)} · đang lưu tiến trình</div>`:""}

/* ---------- ghi hoạt động ---------- */
const trkId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
function trkEv(o){if(!trkIn())return;o.at=o.at||Date.now();o.id=trkId();TRKQ.ev.push(o);if(TRKQ.ev.length>400)TRKQ.ev=TRKQ.ev.slice(-400);trkPut("ct_trk_q",TRKQ);trkSoon()}
const trkTxt=s=>{const d=document.createElement("div");d.innerHTML=String(s==null?"":s);return d.textContent.replace(/\s+/g," ").trim()};
function trkErr(sec,q,a,c,b){if(!trkIn())return;const lv=trkLv(),bb=b||cur,k=[lv,bb,sec,q].join("|");if(TRKSEEN[k])return;TRKSEEN[k]=1;
 TRKQ.err.push({id:trkId(),at:Date.now(),lv,b:bb,sec,q:trkTxt(q),a:trkTxt(a)||"(bỏ trống)",c:trkTxt(c)});if(TRKQ.err.length>600)TRKQ.err=TRKQ.err.slice(-600);trkPut("ct_trk_q",TRKQ);trkSoon()}

/* thời gian học: cứ 15 giây, nếu trang đang mở một bài và em có thao tác trong 2 phút gần nhất thì cộng 15 giây */
let TRKSESS=trkJ("ct_trk_s",null),TRKACT=Date.now();
["pointerdown","keydown","scroll","touchstart"].forEach(e=>addEventListener(e,()=>TRKACT=Date.now(),{passive:true}));
function trkPartName(){try{const tabs=navTabs(),k=navCur(),t=tabs.find(x=>x[0]==k);return t?t[1].replace(/^[^A-Za-zÀ-ỹ]+/,"").trim():""}catch(e){return ""}}
function trkCtx(){const L=$("learn");if(!L||!L.classList.contains("on"))return null;
 if(SUBC=="ol"&&cur)return{t:"Học bài",lv:trkLv(),b:cur};if(SUBC=="ts"&&tcur)return{t:"Làm test",lv:trkLv(),b:tcur};return null}
function trkEnd(){const s=TRKSESS;TRKSESS=null;try{localStorage.removeItem("ct_trk_s")}catch(e){}
 if(s&&s.sec>=30)trkEv({t:s.t,lv:s.lv,b:s.b,p:(s.p||[]).join(", "),m:Math.round(s.sec/6)/10,at:s.at})}
function trkTick(){if(!trkIn())return;const c=trkCtx();
 if(TRKSESS&&(!c||c.t!=TRKSESS.t||c.lv!=TRKSESS.lv||c.b!=TRKSESS.b))trkEnd();
 if(!c)return;if(!TRKSESS)TRKSESS={t:c.t,lv:c.lv,b:c.b,at:Date.now(),sec:0,p:[]};
 if(document.visibilityState=="visible"&&Date.now()-TRKACT<120000){TRKSESS.sec+=15;if(c.t=="Học bài"){const p=trkPartName();if(p&&!TRKSESS.p.includes(p))TRKSESS.p.push(p)}}
 trkPut("ct_trk_s",TRKSESS)}
setInterval(trkTick,15000);
/* phiên học dở từ lần trước (đóng trang đột ngột) */
if(TRKSESS&&Date.now()-(TRKSESS.at||0)>0){const s=TRKSESS;if(s.sec>=30&&trkIn()){TRKQ.ev.push({id:trkId(),t:s.t,lv:s.lv,b:s.b,p:(s.p||[]).join(", "),m:Math.round(s.sec/6)/10,at:s.at});trkPut("ct_trk_q",TRKQ)}TRKSESS=null;try{localStorage.removeItem("ct_trk_s")}catch(e){}}
addEventListener("visibilitychange",()=>{if(document.visibilityState=="hidden"){trkTick();trkFlush(true)}else trkSoon(1500)});
addEventListener("pagehide",()=>{trkTick();trkFlush(true)});

/* ---------- gắn vào các phần chấm điểm (HSK1, HSK2) ---------- */
/* tiến trình: mọi lần trang lưu ct_hsk{cấp}_b{bài} */
const _trkPrev=Storage.prototype.setItem;
Storage.prototype.setItem=function(k,v){_trkPrev.call(this,k,v);try{const kk=window.CT_KMAP?CT_KMAP(k):k;if(this===localStorage&&TRK_KEY.test(kk)&&trkIn())trkDirty(kk)}catch(e){}};
/* câu máy nghe được (luyện nói, luyện đọc, test nói) */
let TRKHEARD={};
if(typeof srListen=="function"){const _o=srListen;srListen=function(done,fail){const tag=recOn!=null?recOn:(typeof RDON!="undefined"&&RDON!=null?"rd"+RDON:"x");return _o((t,a)=>{TRKHEARD[tag]=t;TRKHEARD.last=t;return done(t,a)},fail)}}
const trkWrap=(n,f)=>{if(typeof window[n]=="function"){const o=window[n];window[n]=function(...a){return f(o,a)}}};
trkWrap("gxSoCheck",(o,[k])=>{const r=o(k);try{const d=GXD[GX.k].so[k],s=GX.so[k];if(s.st===false)trkErr("Ngữ pháp · Sắp xếp câu",d.f||d.ok[0],s.ch.map(i=>d.t[i].split("|")[0]).join(" "),d.f||d.ok[0])}catch(e){}return r});
trkWrap("gxTrSelf",(o,[k,ok])=>{const r=o(k,ok);try{if(!ok){const d=GXD[GX.k].tr[k];trkErr("Ngữ pháp · Dịch Việt → Trung",d.vi,GX.tr[k].v,d.r[0])}}catch(e){}return r});
trkWrap("qDone",(o,a)=>{const key=a[0],was=QD[key],r=o(...a);try{if(!was&&QD[key]){const qs=QS[key],an=QA[key];qs.forEach((q,i)=>{const p=an[i]!=null?q.o[an[i]]:null;if(p!==q.c)trkErr(key=="gp"?"Ngữ pháp · Trắc nghiệm":"Trắc nghiệm",q.q,p?p.split("|")[0]:"",q.c.split("|")[0])})}}catch(e){}return r});
trkWrap("dtCheck",(o,a)=>{const r=o(...a);try{LD[cur].dt.forEach((x,i)=>{if(!DTR[i])trkErr("Nghe chép",x[0],DTV[i]||"",x[0])})}catch(e){}return r});
trkWrap("nsMk",(o,[i,v])=>{try{if(v===0){const t=nsAll(LD[cur])[i].t;trkErr("Luyện nói",t.vi,TRKHEARD[i]||"(tự chấm: chưa đúng)",t.r[0])}}catch(e){}return o(i,v)});
trkWrap("rdSave",(o,[key,m])=>{try{if(m<RD_OK){const[i,j]=key.split("-").map(Number),y=LD[cur].texts[i].l[j][1];trkErr("Luyện đọc bài khóa",y,TRKHEARD["rd"+key]||TRKHEARD.last||"",y)}}catch(e){}return o(key,m)});
trkWrap("fcMk",(o,[v])=>{try{if(v===0){const w=LD[cur].words[fcI];trkErr("Flashcard · chưa nhớ",w[0]+" ("+w[1]+")","Chưa nhớ",w[0]+" · "+w[1]+" · "+(w[3]||w[2]||""))}}catch(e){}return o(v)});
trkWrap("tSubmit",(o,a)=>{const was=T&&T.done,r=o(...a);try{if(T&&T.done&&!was){const L=LD[tcur],b=tcur,all=nsAll(L),{a:x,b:y,c:z}=T.res;
 L.tsort.forEach((it,k)=>{const s=T.so[k].ch.map(i=>it.t[i]).join("");if(!it.ok.includes(s))trkErr("Test · Sắp xếp câu",it.ok[0],T.so[k].ch.map(i=>it.t[i]).join(" "),it.ok[0],b)});
 L.tlis.forEach((q,k)=>{const s=T.li[k],p=s.pick!=null?s.o[s.pick]:null;if(p!==q.o[0])trkErr("Test · Nghe hiểu",(q.qz?q.qz+" · ":"")+"Nghe: "+q.a,p?p.split("|")[0]:"",q.o[0].split("|")[0],b)});
 T.sp.forEach((ix,k)=>{if(T.spk[k]!==true){const t=all[ix].t;trkErr("Test · Nói",t.vi,T.spr[k]?(TRKHEARD["t"+k]||""):"(chưa nói)",t.r[0],b)}});
 (T.vw||[]).forEach((wi,k)=>{if(T.vsc[k]<2){const w=L.words[wi];trkErr("Test · Gõ phiên âm",w[0],T.vin[k]||"(bỏ trống)",w[1]+" · "+w[3],b)}});
 const f=n=>String(Math.round(n*10)/10).replace(".",","),nv=(T.vw||[]).length;trkEv({t:"Nộp test",lv:trkLv(),b,s:`NNC ${f((x+y+z)/1.5)}/10`+(nv?` · Chữ Hán ${f((T.res.v||0)/nv*10)}/10`:"")})}}catch(e){}return r});

/* lời nhắc nhập mã ở đầu bài học và bài test */
if(typeof lessonView=="function"){const _lv=lessonView;lessonView=function(){return trkBanner()+_lv()}}
if(typeof testView=="function"){const _tv=testView;testView=function(){return trkBanner()+_tv()}}

(function(){const st=document.createElement("style");st.textContent=`
.trkme{border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.12);color:#fff;border-radius:999px;padding:6px 12px;font:700 .85rem var(--ui,sans-serif);cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;margin-left:8px;position:relative}
.trkme span{max-width:110px;overflow:hidden;text-overflow:ellipsis}.trkme:hover{background:rgba(255,255,255,.22)}
.trks{display:none}.trkdot{width:8px;height:8px;border-radius:50%;background:#f0b429;display:inline-block}
#trkbox .trkc{max-width:440px;width:calc(100vw - 40px)}#trkbox .trkc h3{margin-top:0;color:var(--m)}#trkbox .tin{width:100%;box-sizing:border-box;font-size:1.1rem;letter-spacing:.06em;text-transform:uppercase}
.trkban{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;background:#fff8e1;border:1px dashed var(--g);margin-bottom:12px}.trkban span{flex:1 1 260px}
.trkwho{font-size:.82rem;color:var(--sub);margin:0 0 8px 4px}
@media(max-width:900px){.trkme{flex:none;margin-left:auto;margin-right:6px;padding:6px 10px}.trkme span{max-width:64px}.trkl{display:none}.trks{display:inline}}@media(max-width:380px){.trkme span{display:none!important}.trkme{padding:6px 9px;margin-right:4px}}`;document.head.appendChild(st)})();

trkBadge();
if(trkIn()){const d=new Date().toDateString();if(trkJ("ct_trk_day","")!==d){trkPut("ct_trk_day",d);trkEv({t:"Vào trang"})}trkSoon(2000)}
if(typeof rr=="function"&&trkOn())rr();
