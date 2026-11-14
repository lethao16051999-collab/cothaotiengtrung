/* ===== Lưu tiến trình trang TOCFL B1 · thêm 08/11/2026 =====
   Dùng chung MÃ HỌC VIÊN và Sổ theo dõi (Google Sheets) với trang chính; cùng tên khóa ct_trk_* nên đã nhập mã ở trang chính thì vào đây không phải nhập lại.
   Tiến trình lưu ở ct_hsk7_b{bài} (cấp 7 = "TOCFL B1"), đơn vị %, Sheet gộp theo số lớn hơn:
     rd = Luyện đọc · fc = Từ vựng đục lỗ · test = Đề thi thật (tốt nhất) · ltap = Đề luyện tập · nghe, doc = số câu đúng tốt nhất /25 (thi thật).
   Trang này có $ riêng (querySelector) nên không nạp được js/track.js. Nạp TRƯỚC khối script chính. ===== */
window.TT=(function(){
const URL_="https://script.google.com/macros/s/AKfycbzwJj7bMam8_gZHPltogTqSvxVrxI6ikvzkj6gZLm1bnk2jmrRr57Dg6IStI23Og5HZOw/exec";
const API=(()=>{try{return localStorage.getItem("ct_trk_url")||URL_}catch(e){return URL_}})();
const LV=7,KEY=/^ct_hsk\d+_b\d+$/,key=n=>"ct_hsk"+LV+"_b"+n;
const J=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const put=(k,o)=>{try{localStorage.setItem(k,JSON.stringify(o))}catch(e){}};
const E=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const G=id=>document.getElementById(id);
let ME=J("ct_trk_me",null),Q=J("ct_trk_q",{ev:[],err:[]}),DIRTY=J("ct_trk_dirty",[]),BUSY=false,LAST=J("ct_trk_last",0),MSG="",SEEN={},T=null,HOLD=[];
const inn=()=>!!ME;
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const pending=()=>DIRTY.length+Q.ev.length+Q.err.length;
async function post(o){const r=await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o),redirect:"follow"});return r.json()}
function merge(a,b){if(a==null)return b;if(b==null)return a;if(typeof a=="number"&&typeof b=="number")return Math.max(a,b);if(typeof a=="boolean"&&typeof b=="boolean")return a||b;
 if(typeof a=="object"&&typeof b=="object"&&!Array.isArray(a)&&!Array.isArray(b)){const o=Object.assign({},a);Object.keys(b).forEach(k=>o[k]=merge(a[k],b[k]));return o}return b}
function soon(ms){if(!inn())return;clearTimeout(T);T=setTimeout(flush,ms||5000)}
function dirty(k){if(!DIRTY.includes(k)){DIRTY.push(k);put("ct_trk_dirty",DIRTY)}soon()}
async function flush(beacon){if(!inn()||BUSY||!pending())return;
 const keys=DIRTY.slice(),prog={};keys.forEach(k=>prog[k]=J(k,{}));
 const ev=Q.ev.slice(0,200),err=Q.err.slice(0,300),body={a:"sync",code:ME.code,prog,ev,err};
 if(beacon===true){try{fetch(API,{method:"POST",mode:"no-cors",keepalive:true,headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(body)})}catch(e){}return}
 BUSY=true;
 try{const r=await post(body);
  if(r&&r.ok){DIRTY=DIRTY.filter(k=>!keys.includes(k)||JSON.stringify(J(k,{}))!==JSON.stringify(prog[k]));
   Q.ev=Q.ev.slice(ev.length);Q.err=Q.err.slice(err.length);
   Object.keys(r.prog||{}).forEach(k=>{if(!DIRTY.includes(k)&&JSON.stringify(J(k,{}))!==JSON.stringify(r.prog[k]))put(k,r.prog[k])});
   LAST=Date.now();put("ct_trk_last",LAST);put("ct_trk_dirty",DIRTY);put("ct_trk_q",Q);MSG="";paint()}
  else if(r&&(r.err=="no_code"||r.err=="off"))MSG=r.err=="off"?"Mã học viên đã tạm ngừng. Em hỏi cô Thảo nhé.":"Mã học viên không còn đúng. Em hỏi cô Thảo nhé."
 }catch(e){MSG="Chưa gửi được (có thể đang mất mạng). Trang sẽ tự gửi lại."}
 BUSY=false;badge();if(pending()&&!/Mã học viên/.test(MSG))soon(30000)}

function ev(o){if(!inn())return;o.at=o.at||Date.now();o.id=uid();Q.ev.push(o);if(Q.ev.length>400)Q.ev=Q.ev.slice(-400);put("ct_trk_q",Q);soon()}
function err(b,sec,q,a,c){if(!inn())return;const k=[LV,b,sec,q].join("|");if(SEEN[k])return;SEEN[k]=1;
 Q.err.push({id:uid(),at:Date.now(),lv:LV,b,sec,q,a:a||"(bỏ trống)",c});if(Q.err.length>600)Q.err=Q.err.slice(-600);put("ct_trk_q",Q);soon()}
function save(n,f){const r=J(key(n),{})||{};f(r);put(key(n),r);if(inn())dirty(key(n));paint()}

/* ---------- ghi kết quả (trang chính gọi) ---------- */
const RQ={},FL={};
function reading(n,i,ok,total){const a=RQ[n]=RQ[n]||{};if(i in a)return;a[i]=ok;if(Object.keys(a).length<total)return;
 const pct=Math.round(Object.values(a).filter(Boolean).length/total*100);save(n,r=>{r.rd=Math.max(r.rd||0,pct)});delete RQ[n]}
function fill(n,gi,ok,tot,groups){const a=FL[n]=FL[n]||{};a[gi]=[ok,tot];if(Object.keys(a).length<groups)return;
 const v=Object.values(a),pct=Math.round(v.reduce((s,x)=>s+x[0],0)/v.reduce((s,x)=>s+x[1],0)*100);save(n,r=>{r.fc=Math.max(r.fc||0,pct)})}
function exam(n,o){const that=o.mode==="that"||o.mode==="lai",pct=o.pct;
 save(n,r=>{if(that){r.test=Math.max(r.test||0,pct);r.nghe=Math.max(r.nghe||0,o.L);r.doc=Math.max(r.doc||0,o.R)}else r.ltap=Math.max(r.ltap||0,pct)});
 const e={t:"Nộp test",lv:LV,b:n,s:`${o.score}/50 (Nghe ${o.L}/25 · Đọc ${o.R}/25) · ${o.mode==="lai"?`Làm lại câu sai (lần ${o.lan})`:that?"Thi thật":"Luyện tập"}${o.lan>1&&o.s1!=null?` · lần 1: ${o.s1}/50`:""}${o.lan>1?(o.pct>=80?" · Đạt":" · Chưa đạt"):""}`};
 if(inn()){ev(e);o.wrong.forEach(w=>err(n,w[0],w[1],w[2],w[3]));flush()}else HOLD=[e,n,o.wrong]}

/* ---------- hiển thị ---------- */
const pc=v=>`<b class="${v>=80?"ttok":"ttno"}">${v}%</b>`;
function line(n){const r=J(key(n),{})||{},p=[];
 if(r.rd!=null)p.push("Luyện đọc "+pc(r.rd));if(r.fc!=null)p.push("Từ vựng "+pc(r.fc));
 if(r.test!=null)p.push(`Đề ${pc(r.test)} (Nghe ${r.nghe||0}/25 · Đọc ${r.doc||0}/25)`);
 return p.join(" · ")}
function bar(n){return `<div class="ttbar" data-n="${n}">${barIn(n)}</div>`}
function barIn(n){const l=line(n);return (l?`📊 <b>Kết quả của em:</b> ${l}`:`📊 Chưa có kết quả bài này.`)+(inn()?`<span class="ttwho">👤 ${E(ME.name)} · đang lưu tiến trình</span>`:`<span class="ttwho">Chỉ lưu trên máy này. <a onclick="TT.open()">🔑 Nhập mã học viên</a> để lưu cho cô và học tiếp trên máy khác.</span>`)}
function chip(n){const r=J(key(n),{})||{};return r.test!=null?`<span class="ttchip ${r.test>=80?"ok":""}">Đề ${r.test}%</span>`:""}
function note(){return inn()?`✅ Kết quả đã lưu và gửi cho cô Thảo.`:`⚠ Em chưa nhập mã học viên nên kết quả <b>chưa gửi cho cô</b>. <a onclick="TT.open()" style="cursor:pointer;text-decoration:underline">🔑 Nhập mã</a> là điểm bài này tự gửi. Hoặc chụp ảnh kết quả gửi cô qua Zalo nhé.`}
function paint(){document.querySelectorAll(".ttbar").forEach(e=>e.innerHTML=barIn(+e.dataset.n));document.querySelectorAll(".ttslot").forEach(e=>e.innerHTML=chip(+e.dataset.n));document.querySelectorAll(".ttnote").forEach(e=>e.innerHTML=note())}
function badge(){const h=document.querySelector(".hbtns");if(!h)return;let b=G("ttme");if(!b){b=document.createElement("button");b.id="ttme";b.className="hb";b.onclick=open;h.insertBefore(b,h.firstChild)}
 b.innerHTML=inn()?`👤 ${E((ME.name||"").split(/\s+/).pop()||ME.code)}${pending()&&MSG?" ⚠":""}`:"🔑 Mã học viên";b.title=inn()?"Đang học: "+ME.name:"Nhập mã học viên để lưu tiến trình"}
function close(){const d=G("ttbox");if(d)d.remove()}
function open(){box("")}
function box(msg,wait){close();const d=document.createElement("div");d.id="ttbox";d.className="modal";d.onclick=e=>{if(e.target===d)close()};
 const p=pending(),ago=LAST?Math.max(0,Math.round((Date.now()-LAST)/60000)):null;
 d.innerHTML=`<div class="box">`+(inn()?`<h2 style="margin-top:0">👤 ${E(ME.name)}</h2><p>${ME.cls?`Lớp: <b>${E(ME.cls)}</b> · `:""}Mã: <b>${E(ME.code)}</b></p>
<p class="muted">${p?`Còn ${p} mục chưa gửi cho cô.`:"Đã lưu hết."}${ago!=null?` Lần lưu gần nhất: ${ago<1?"vừa xong":ago+" phút trước"}.`:""}</p>${MSG?`<p style="color:var(--bad)">${E(MSG)}</p>`:""}
<div class="row-flex"><button class="btn" id="ttsv">💾 Lưu ngay</button><button class="btn o" id="ttout">Đăng xuất</button><button class="btn o" id="ttx">Đóng</button></div>`:
`<h2 style="margin-top:0">🔑 Mã học viên</h2><p>Em là học viên lớp cô Thảo? Nhập mã cô gửi để <b>lưu tiến trình</b> và học tiếp trên điện thoại, máy tính khác.</p>
<input class="inp" id="ttcode" placeholder="Ví dụ: KIET-4821" autocomplete="off" autocapitalize="characters" style="text-transform:uppercase" ${wait?"disabled":""}>
${msg?`<p style="color:${wait?"var(--mut)":"var(--bad)"}">${E(msg)}</p>`:""}
<div class="row-flex" style="margin-top:.7rem"><button class="btn" id="ttgo" ${wait?"disabled":""}>Vào học</button><button class="btn o" id="ttx">Để sau</button></div>
<p class="muted" style="font-size:.85rem">Khi dùng mã, kết quả học (điểm từng phần, câu làm sai, thời gian học) được gửi cho cô Thảo để cô theo dõi và hướng dẫn em. Chưa có mã thì em vẫn học bình thường, kết quả chỉ lưu trên máy này.</p>`)+`</div>`;
 document.body.appendChild(d);
 G("ttx").onclick=close;
 if(inn()){G("ttsv").onclick=()=>flush().then(open);G("ttout").onclick=out}
 else{const i=G("ttcode");G("ttgo").onclick=login;i.onkeydown=e=>{if(e.key==="Enter")login()};if(!wait)setTimeout(()=>i.focus(),30)}}
async function login(){const el=G("ttcode"),code=(el&&el.value||"").trim().toUpperCase();if(!code){box("Em hãy nhập mã học viên cô Thảo đã gửi.");return}
 box("Đang kiểm tra mã…",true);let r;try{r=await post({a:"login",code})}catch(e){box("Chưa kết nối được. Em kiểm tra mạng rồi thử lại nhé.");return}
 if(!r||!r.ok){box(r&&r.err=="off"?"Mã này đã tạm ngừng. Em hỏi cô Thảo nhé.":"Mã chưa đúng. Em xem lại mã cô gửi (ví dụ KIET-4821).");return}
 ME={code:r.code,name:r.name,cls:r.cls};put("ct_trk_me",ME);setName();
 const sv=r.prog||{},loc=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(KEY.test(k))loc.push(k)}
 new Set(Object.keys(sv).concat(loc)).forEach(k=>{const m=merge(sv[k],J(k,null));put(k,m||{});if(JSON.stringify(m)!==JSON.stringify(sv[k]))dirty(k)});
 adopt();ev({t:"Vào học (nhập mã)"});
 if(HOLD.length){const[e,n,w]=HOLD;HOLD=[];ev(e);w.forEach(x=>err(n,x[0],x[1],x[2],x[3]))}
 close();badge();paint();flush()}
/* tải tiến trình từ máy khác (14/11/2026): mở trang / quay lại trang thì hỏi Sheet, gộp giữ phần tốt hơn */
let PULLT=0;
async function pull(force){if(!inn()||BUSY)return;if(!force&&Date.now()-PULLT<60000)return;PULLT=Date.now();
 let r;try{r=await post({a:"login",code:ME.code})}catch(e){return}
 if(!r||!r.ok)return;const sv=r.prog||{};let ch=false;
 Object.keys(sv).forEach(k=>{const loc=J(k,null),m=merge(sv[k],loc);if(JSON.stringify(m)!==JSON.stringify(loc)){put(k,m);ch=true}if(JSON.stringify(m)!==JSON.stringify(sv[k]))dirty(k)});
 if(ch)paint();flush()}
async function out(){if(pending())await flush();try{["ct_trk_me","ct_trk_q","ct_trk_dirty","ct_trk_last","ct_trk_s","ct_name","tb_name"].forEach(k=>localStorage.removeItem(k));
 for(let i=localStorage.length-1;i>=0;i--){const k=localStorage.key(i);if(KEY.test(k))localStorage.removeItem(k)}}catch(e){}
ME=null;SS=null;Q={ev:[],err:[]};DIRTY=[];LAST=0;MSG="";close();badge();paint()}
function setName(){try{if(ME&&ME.name)localStorage.setItem("tb_name",JSON.stringify(ME.name))}catch(e){}}
/* điểm đề đã làm trước khi có chức năng này (tb_last{bài}) — chỉ nhận khi tên trùng người đang đăng nhập */
function adopt(){if(!inn())return;const low=s=>String(s||"").trim().toLowerCase();
 for(let n=1;n<=12;n++){const l=J("tb_last"+n,null),r=J(key(n),null);if(l&&low(l.name)===low(ME.name)&&(!r||r.test==null))save(n,x=>{x.test=l.pct})}}

/* ---------- thời gian học ---------- */
let SS=J("ct_trk_s",null),ACT=Date.now();
function ctx(){const m=(location.hash||"").match(/^#bai-(\d+)/);if(!m)return null;return{t:document.querySelector(".exam-head")?"Làm test":"Học bài",lv:LV,b:+m[1]}}
function part(){const b=document.querySelector(".sub .tabs button.on");return b?b.textContent.replace(/^[^A-Za-zÀ-ỹ]+/,"").trim():""}
function end(){const s=SS;SS=null;try{localStorage.removeItem("ct_trk_s")}catch(e){}if(s&&s.sec>=30&&inn())ev({t:s.t,lv:s.lv,b:s.b,p:(s.p||[]).join(", "),m:Math.round(s.sec/6)/10,at:s.at})}
function tick(){if(!inn())return;const c=ctx();if(SS&&(!c||c.t!=SS.t||c.lv!=SS.lv||c.b!=SS.b))end();if(!c)return;
 if(!SS)SS={t:c.t,lv:c.lv,b:c.b,at:Date.now(),sec:0,p:[]};
 if(document.visibilityState=="visible"&&Date.now()-ACT<120000){SS.sec+=15;if(c.t=="Học bài"){const p=part();if(p&&!SS.p.includes(p))SS.p.push(p)}}put("ct_trk_s",SS)}
["pointerdown","keydown","scroll","touchstart"].forEach(t=>addEventListener(t,()=>{ACT=Date.now()},{passive:true}));
setInterval(tick,15000);
if(SS&&inn()){end()}
addEventListener("visibilitychange",()=>{if(document.visibilityState=="hidden"){tick();flush(true)}else{soon(1500);pull()}});
addEventListener("pagehide",()=>{tick();flush(true)});

const st=document.createElement("style");st.textContent=`.ttbar{margin-top:.6rem;padding:.5rem .7rem;border-radius:.6rem;background:var(--c2);font-size:.9rem}.ttbar a{cursor:pointer;text-decoration:underline}.ttwho{display:block;color:var(--mut);font-size:.82rem}.ttok{color:var(--ok)}.ttno{color:var(--bad)}.ttchip{display:inline-block;font-size:.75rem;font-weight:700;border-radius:999px;padding:0 .5rem;background:var(--badb);color:var(--bad)}.ttchip.ok{background:var(--okb);color:var(--ok)}`;document.head.appendChild(st);
badge();setName();
if(inn()){const d=new Date().toDateString();if(J("ct_trk_day","")!==d){put("ct_trk_day",d);ev({t:"Vào trang"})}adopt();soon(2000);setTimeout(()=>pull(true),1200)}
return{reading,fill,exam,bar,chip,note,open,paint,me:()=>ME,api:()=>API,post,ev,err,save,flush,key};
})();
