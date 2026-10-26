/* ===== Nền theo ngày lễ · thêm 24/10/2026 =====
   - Tự đổi nền + dải lời chúc theo lịch lễ Việt Nam / Trung Quốc (LE_DEF). Hiệu ứng rơi chỉ hiện ở Trang chủ.
   - Cài đặt dành cho giáo viên: Bảng theo dõi (#theodoi, cần mật khẩu) › tab "🎨 Nền ngày lễ".
   - Cài đặt lưu trên Google Sheets (API "nen", đoạn mã nenApi_ trong Code.gs) để mọi học viên thấy.
     Chưa có đoạn mã đó thì nền vẫn chạy theo lịch mặc định; cài đặt chỉ áp dụng trên máy của cô.
   - Ngày dạng "mm-dd" lặp lại mỗi năm; ngày âm lịch ghi đủ "yyyy-mm-dd" (năm sau cô sửa ngày trong cài đặt).
   Nạp CUỐI CÙNG (sau theodoi.js, nhac.js). ===== */
const LE_DEF=[
 {id:"nhagiao",vi:"Ngày Nhà giáo Việt Nam",zh:"越南教师节",day:"20/11",s:"11-14",e:"11-21",ic:"🌷",m:"Chúc mừng Ngày Nhà giáo Việt Nam 20/11 · 老师，您辛苦了！"},
 {id:"dongchi",vi:"Đông chí",zh:"冬至",day:"22/12/2026",s:"2026-12-20",e:"2026-12-22",ic:"❄️",m:"冬至快乐！Đông chí rồi – ăn bát sủi cảo 饺子 cho ấm nhé"},
 {id:"giangsinh",vi:"Giáng sinh",zh:"圣诞节",day:"25/12",s:"12-18",e:"12-26",ic:"🎄",m:"圣诞快乐！Chúc mừng Giáng sinh"},
 {id:"duonglich",vi:"Tết Dương lịch",zh:"元旦",day:"1/1",s:"12-29",e:"01-03",ic:"🎆",m:"元旦快乐！Chúc mừng năm mới – 新年快乐"},
 {id:"laba",vi:"Lễ Lạp Bát",zh:"腊八节",day:"15/1/2027",s:"2027-01-13",e:"2027-01-15",ic:"🥣",m:"腊八节快乐！Ăn cháo 腊八粥 – không khí Tết bắt đầu rồi"},
 {id:"ongtao",vi:"Ông Công Ông Táo",zh:"小年",day:"30/1/2027",s:"2027-01-28",e:"2027-01-30",ic:"🐟",m:"Tiễn ông Công ông Táo về trời · 小年快乐！"},
 {id:"tet",vi:"Tết Nguyên đán",zh:"春节",day:"6/2/2027",s:"2027-01-31",e:"2027-02-14",ic:"🏮",m:"春节快乐！Chúc mừng năm mới Đinh Mùi 2027 · 羊年大吉"},
 {id:"nguyentieu",vi:"Rằm tháng Giêng",zh:"元宵节",day:"20/2/2027",s:"2027-02-18",e:"2027-02-21",ic:"🏮",m:"元宵节快乐！Rằm tháng Giêng – ngắm đèn lồng, ăn bánh trôi 汤圆"},
 {id:"phunu",vi:"Quốc tế Phụ nữ",zh:"三八妇女节",day:"8/3",s:"03-05",e:"03-08",ic:"🌷",m:"Chúc mừng ngày 8/3 · 三八妇女节快乐！"}];

/* ---------- hình vẽ (SVG) ---------- */
const LEM={
 lantern:c=>`<line y1="-34" y2="-21" stroke="#c9a227" stroke-width="2"/><rect x="-11" y="-22" width="22" height="6" rx="2" fill="#c9a227"/><ellipse rx="22" ry="18" fill="${c||"#d7263d"}"/><path d="M-9-17Q-15 0-9 17M9-17Q15 0 9 17M0-18V18" stroke="rgba(0,0,0,.18)" stroke-width="1.6" fill="none"/><rect x="-11" y="16" width="22" height="6" rx="2" fill="#c9a227"/><path d="M-5 22v13M0 22v16M5 22v13" stroke="#c9a227" stroke-width="1.6"/>`,
 flower:(c,k)=>[0,72,144,216,288].map(a=>`<ellipse cy="-9" rx="6.5" ry="9" fill="${c}" transform="rotate(${a})"/>`).join("")+`<circle r="4.5" fill="${k||"#c9a227"}"/>`,
 snow:c=>`<g stroke="${c}" stroke-width="2.2" stroke-linecap="round" fill="none">`+[0,60,120].map(a=>`<g transform="rotate(${a})"><line y1="-20" y2="20"/><path d="M-6-14L0-9L6-14M-6 14L0 9L6 14"/></g>`).join("")+`</g>`,
 star:c=>`<path d="M0-18L5.3-6.5L18-5.6L8.3 2.8L11.1 15.4L0 8.7L-11.1 15.4L-8.3 2.8L-18-5.6L-5.3-6.5Z" fill="${c}"/>`,
 burst:c=>`<g stroke="${c}" stroke-width="2.4" stroke-linecap="round">`+Array.from({length:12},(_,i)=>`<line y1="-9" y2="-23" transform="rotate(${i*30})"/>`).join("")+`</g>`+Array.from({length:12},(_,i)=>`<circle cy="-28" r="2.2" fill="${c}" transform="rotate(${i*30+15})"/>`).join(""),
 book:c=>`<path d="M0-12C-8-18-18-18-26-15V14C-18 11-8 11 0 17C8 11 18 11 26 14V-15C18-18 8-18 0-12Z" fill="#fff" stroke="${c}" stroke-width="2.2"/><path d="M0-12V17" stroke="${c}" stroke-width="2"/><path d="M-20-7H-6M-20-1H-6M-20 5H-6M6-7H20M6-1H20M6 5H20" stroke="${c}" stroke-width="1.4" opacity=".6"/>`,
 bowl:(c,k)=>`<circle cx="-9" cy="-6" r="7" fill="${k||"#fff"}" stroke="#e2cfae"/><circle cx="6" cy="-7" r="7" fill="${k||"#fff"}" stroke="#e2cfae"/><circle cx="-1" cy="-12" r="6" fill="#f7c6d0"/><path d="M-26-3H26C25 14 12 22 0 22S-25 14-26-3Z" fill="${c}"/><path d="M-26-3H26" stroke="#c9a227" stroke-width="3"/><rect x="-9" y="21" width="18" height="4" rx="2" fill="${c}"/>`,
 moon:c=>`<circle r="25" fill="${c}" opacity=".25"/><circle r="18" fill="${c}"/>`,
 carp:c=>`<path d="M-26 0C-14-14 10-14 18 0C10 14-14 14-26 0Z" fill="${c}"/><path d="M16 0L32-12L28 0L32 12Z" fill="${c}"/><path d="M-2-10L4-20L8-10Z" fill="${c}"/><circle cx="-16" cy="-3" r="2.4" fill="#3a0d1d"/><path d="M-4-9Q2 0-4 9M4-9Q10 0 4 9" stroke="rgba(255,255,255,.6)" stroke-width="1.6" fill="none"/>`,
 fu:()=>`<rect x="-20" y="-20" width="40" height="40" rx="4" fill="#d7263d" transform="rotate(45)"/><text y="10" text-anchor="middle" font-size="28" font-weight="900" fill="#f6d36b" font-family="Noto Serif SC, KaiTi, serif" transform="rotate(180)">福</text>`,
 tree:c=>`<path d="M0-26L14-6H7L18 10H-18L-7-6H-14Z" fill="${c}"/><rect x="-3" y="10" width="6" height="8" fill="#8b5a2b"/><circle r="2.5" cx="-5" cy="2" fill="#d7263d"/><circle r="2.5" cx="6" cy="-6" fill="#c9a227"/><circle r="2.5" cx="7" cy="6" fill="#d7263d"/><path d="M0-33L2-28L7-28L3-25L5-20L0-23L-5-20L-3-25L-7-28L-2-28Z" fill="#c9a227"/>`,
 tulip:c=>`<path d="M0 26V2" stroke="#4f8a4b" stroke-width="2.4"/><path d="M0 14Q-12 6-14-2Q-4 2 0 10" fill="#5fa15a"/><path d="M-11-16Q-12 4 0 6Q12 4 11-16L5-8L0-18L-5-8Z" fill="${c}"/>`,
 heart:c=>`<path d="M0 14C-18 2-18-12-9-14C-4-15-1-11 0-8C1-11 4-15 9-14C18-12 18 2 0 14Z" fill="${c}"/>`,
 cloud:c=>`<path d="M-24 6Q-28-6-16-6Q-14-18 0-16Q12-20 16-8Q28-8 26 4Q24 12 14 10H-18Q-24 12-24 6Z" fill="none" stroke="${c}" stroke-width="2.2"/>`,
 txt:(t,c)=>`<text y="10" text-anchor="middle" font-size="28" font-weight="700" fill="${c}" font-family="Noto Serif SC, KaiTi, serif">${t}</text>`};
/* ô mẫu 300×300: [hình, x, y, cỡ, xoay, tham số 1, tham số 2] */
const LET={
 nhagiao:{bg:["#fff3f1","#fbeaf0"],ac:"#c2477a",fx:["🌷","🌸","✿"],p:[["book",50,55,1,-10,"#8e2a4f"],["flower",195,45,1,0,"#f2a7bd"],["txt",125,150,1.2,0,"师","#c2477a"],["tulip",255,180,1,12,"#e8608a"],["flower",55,245,.8,20,"#f6c453","#c2477a"],["book",195,255,.8,8,"#c9a227"]]},
 dongchi:{bg:["#f1f5fb","#fbf5e6"],ac:"#3a6ea5",fx:["❄","❅","❆"],p:[["snow",50,55,1,0,"#8db3dc"],["bowl",195,50,1,0,"#3a6ea5"],["txt",125,150,1.1,0,"冬至","#3a6ea5"],["snow",255,180,.8,15,"#b7cfe8"],["snow",55,245,.7,30,"#8db3dc"],["bowl",195,255,.8,0,"#8e2a4f"]]},
 giangsinh:{bg:["#f2f8f2","#fbefec"],ac:"#1f7a4d",fx:["❄","❅","✦"],p:[["tree",50,60,1.1,0,"#2f8f5b"],["snow",195,45,.9,0,"#a9c9e6"],["star",125,150,1,0,"#d7263d"],["tree",255,185,.9,0,"#1f7a4d"],["snow",55,245,.7,20,"#a9c9e6"],["star",195,255,.8,15,"#c9a227"]]},
 duonglich:{bg:["#fff8e6","#fbeef3"],ac:"#b8860b",fx:["✨","✦","🎉"],p:[["burst",50,55,1,0,"#d7263d"],["burst",195,45,.8,10,"#c9a227"],["star",125,150,.9,0,"#c9a227"],["burst",255,180,1,0,"#8e2a4f"],["star",55,245,.7,15,"#d7263d"],["burst",195,255,.7,0,"#e6a23c"]]},
 laba:{bg:["#fbf3e3","#f6e8d5"],ac:"#a0522d",fx:[],p:[["bowl",50,55,1,0,"#a0522d","#f3e1c0"],["flower",195,45,.8,0,"#d7263d","#f6d36b"],["txt",125,150,1.1,0,"腊八","#8e2a4f"],["flower",255,180,.7,25,"#e05a6d","#f6d36b"],["cloud",55,245,.9,0,"#c9a227"],["bowl",195,255,.8,0,"#8e2a4f","#f3e1c0"]]},
 ongtao:{bg:["#fff5e9","#fdeee2"],ac:"#d1621f",fx:[],p:[["carp",55,55,1,-15,"#f08a24"],["cloud",195,45,1,0,"#c9a227"],["carp",130,150,1,10,"#d7263d"],["cloud",255,180,.8,0,"#e6a23c"],["carp",60,245,.8,-5,"#e6a23c"],["txt",195,255,.9,0,"小年","#d1621f"]]},
 tet:{bg:["#fff1ec","#fdf3e0"],ac:"#d7263d",fx:["🌸","🌼","✿"],p:[["lantern",50,60,1,0,"#d7263d"],["flower",195,45,.9,10,"#f4a6b8","#c9a227"],["fu",125,150,1,0],["flower",255,180,.8,25,"#f6c453","#d7263d"],["flower",55,245,.7,0,"#f4a6b8","#c9a227"],["lantern",195,255,.85,0,"#d7263d"]]},
 nguyentieu:{bg:["#fbf1e8","#f4eef8"],ac:"#c0392b",fx:["✨","✦"],p:[["lantern",50,60,1,0,"#d7263d"],["moon",195,45,1,0,"#f6c453"],["bowl",125,150,1,0,"#8e2a4f"],["lantern",255,185,.9,0,"#e6a23c"],["star",55,245,.6,0,"#c9a227"],["lantern",195,255,.8,0,"#d7263d"]]},
 phunu:{bg:["#fdf0f4","#fbf5e6"],ac:"#c2477a",fx:["🌷","🌸","♥"],p:[["tulip",50,55,1,-8,"#e8608a"],["heart",195,45,.9,10,"#f2a7bd"],["flower",125,150,1,0,"#f2a7bd","#c9a227"],["tulip",255,180,.9,10,"#c2477a"],["heart",55,245,.7,-10,"#e8608a"],["tulip",195,255,.8,0,"#f6c453"]]}};

/* ---------- cài đặt ---------- */
const LE_KEY="ct_le",LE_PV="ct_le_pv";
const leJ=(st,k,d)=>{try{const v=st.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const leCfg0=()=>({mode:"auto",theme:"tet",fx:true,bn:true,off:[],d:{},m:{}});
let LE={cfg:Object.assign(leCfg0(),(leJ(localStorage,LE_KEY,{})||{}).cfg||{}),pv:leJ(sessionStorage,LE_PV,null),cur:null,msg:"",busy:false,draft:null};
const leE=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const leDs=d=>{const p=n=>String(n).padStart(2,"0");return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())};
const leToday=()=>leDs(new Date());
/* khoảng ngày của một lễ: [bắt đầu, kết thúc] đầy đủ, lần gần nhất chưa qua (hoặc đang diễn ra) tính từ hôm nay */
function leRange(h,cfg,today){const r=(cfg.d||{})[h.id]||[h.s,h.e];today=today||leToday();
 if(r[0].length>5)return r;const y=+today.slice(0,4);
 for(const yy of [y-1,y,y+1]){const S=yy+"-"+r[0],E=(r[1]<r[0]?yy+1:yy)+"-"+r[1];if(E>=today)return[S,E]}return[y+"-"+r[0],y+"-"+r[1]]}
const leDays=(a,b)=>Math.round((new Date(b)-new Date(a))/864e5);
/* lễ đang áp dụng hôm nay */
function lePick(cfg){cfg=cfg||LE.cfg;if(cfg.mode=="off")return null;if(cfg.mode=="fixed")return LE_DEF.find(h=>h.id==cfg.theme)||null;
 const t=leToday();let best=null,bl=1e9;LE_DEF.forEach(h=>{if((cfg.off||[]).includes(h.id))return;const[s,e]=leRange(h,cfg,t);if(t>=s&&t<=e&&leDays(s,e)<bl){best=h;bl=leDays(s,e)}});return best}
const leMsg=(h,cfg)=>{const m=((cfg||LE.cfg).m||{})[h.id]||h.m,e=leRange(h,cfg||LE.cfg)[1];return m.replace(/\{Y\}/g,e.slice(0,4))};
const leTile=id=>{const T=LET[id];return "data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">`+T.p.map(([m,x,y,s,r,a,b])=>`<g transform="translate(${x} ${y}) rotate(${r||0}) scale(${s||1})">${LEM[m](a,b)}</g>`).join("")+`</svg>`)};

/* ---------- vẽ nền ---------- */
function leApply(){const pv=LE.pv&&LE_DEF.find(h=>h.id==LE.pv),h=pv||lePick(),cfg=LE.cfg,root=document.documentElement;
 let bg=document.getElementById("lebg"),bn=document.getElementById("lebn"),fx=document.getElementById("lefx");
 LE.cur=h?h.id:null;
 if(!h){root.classList.remove("le-on");[bg,bn,fx].forEach(x=>x&&x.remove());return}
 const T=LET[h.id];root.classList.add("le-on");root.style.setProperty("--le-ac",T.ac);
 if(!bg){bg=document.createElement("div");bg.id="lebg";bg.setAttribute("aria-hidden","true");document.body.prepend(bg)}
 bg.innerHTML=`<i class="le-t" style="background:linear-gradient(160deg,${T.bg[0]},${T.bg[1]})"></i><i class="le-p" style="background-image:url('${leTile(h.id)}')"></i>`;
 /* dải lời chúc đầu trang */
 const hid=leJ(sessionStorage,"ct_le_x","")==h.id&&!pv,main=document.querySelector("main");
 if((cfg.bn||pv)&&!hid&&main){if(!bn){bn=document.createElement("div");bn.id="lebn";main.prepend(bn)}
  bn.innerHTML=`<span class="le-ic">${h.ic}</span><span class="le-tx">${leE(leMsg(h))}</span>${pv?`<b class="le-pv">Xem thử</b>`:`<button aria-label="Ẩn lời chúc" onclick="leHide('${h.id}')">✕</button>`}`}
 else if(bn)bn.remove();
 /* hiệu ứng rơi (chỉ Trang chủ) */
 if((cfg.fx||pv)&&T.fx.length&&!matchMedia("(prefers-reduced-motion: reduce)").matches){if(!fx){fx=document.createElement("div");fx.id="lefx";fx.setAttribute("aria-hidden","true");document.body.appendChild(fx)}
  if(fx.dataset.id!=h.id){fx.dataset.id=h.id;fx.innerHTML=Array.from({length:14},(_,i)=>`<span style="left:${(i*7.3+Math.random()*5)%100}%;font-size:${13+Math.random()*10|0}px;animation-duration:${9+Math.random()*8}s;animation-delay:${-Math.random()*15}s">${T.fx[i%T.fx.length]}</span>`).join("")}}
 else if(fx)fx.remove();
 leHome()}
function leHide(id){try{sessionStorage.setItem("ct_le_x",JSON.stringify(id))}catch(e){}const b=document.getElementById("lebn");if(b)b.remove()}
function leHome(){const h=document.getElementById("home");document.documentElement.classList.toggle("le-home",!!(h&&h.classList.contains("on")))}
if(typeof go=="function"){const _go=go;go=function(){const r=_go.apply(this,arguments);leHome();return r}}

/* ---------- lấy cài đặt của cô từ Google Sheets (3 giờ / lần) ---------- */
async function leSync(force){const api=typeof TRK_API!="undefined"?TRK_API:"";if(!api)return;
 const c=leJ(localStorage,LE_KEY,{});if(!force&&c.t&&Date.now()-c.t<3*36e5)return;
 try{const r=await (await fetch(api,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({a:"nen"}),redirect:"follow"})).json();
  if(r&&r.ok&&"set" in r){const cfg=Object.assign(leCfg0(),r.set||{});
   try{localStorage.setItem(LE_KEY,JSON.stringify({t:Date.now(),cfg,srv:1}))}catch(e){}LE.cfg=cfg;leApply()}}catch(e){}}

/* ---------- tab "🎨 Nền ngày lễ" trong Bảng theo dõi của cô ---------- */
function lePanel(){const D=LE.draft||(LE.draft=JSON.parse(JSON.stringify(LE.cfg))),t=leToday(),now=lePick(D);
 const rows=LE_DEF.map(h=>{const[s,e]=leRange(h,D,t),on=!(D.off||[]).includes(h.id),st=t>=s&&t<=e?"đang hiện":t<s?"còn "+leDays(t,s)+" ngày":"đã qua";return{h,s,e,on,st}}).sort((a,b)=>a.s<b.s?-1:1);
 const srv=(leJ(localStorage,LE_KEY,{})||{}).srv;
 return `<div class="lep">
<p class="ctx">Nền và lời chúc hiện cho <b>mọi người xem trang</b> (học viên, khách). Hiệu ứng rơi chỉ hiện ở Trang chủ, không làm rối bài học.${srv?"":` <b class="bad">Hiện cài đặt mới chỉ lưu trên máy này</b> – cô cần thêm đoạn mã <i>nenApi_</i> vào Google Sheets (xem cuối trang) thì học viên mới thấy.`}</p>
<div class="card lep-c"><b>Chế độ</b>
<label><input type="radio" name="lem" ${D.mode=="auto"?"checked":""} onchange="leD('mode','auto')"> Tự động theo lịch lễ bên dưới</label>
<label><input type="radio" name="lem" ${D.mode=="fixed"?"checked":""} onchange="leD('mode','fixed')"> Luôn dùng một nền: <select onchange="leD('theme',this.value);leD('mode','fixed')">${LE_DEF.map(h=>`<option value="${h.id}" ${D.theme==h.id?"selected":""}>${h.ic} ${h.vi}</option>`).join("")}</select></label>
<label><input type="radio" name="lem" ${D.mode=="off"?"checked":""} onchange="leD('mode','off')"> Tắt nền lễ (dùng nền kem mặc định)</label>
<div class="lep-ck"><label><input type="checkbox" ${D.bn?"checked":""} onchange="leD('bn',this.checked)"> Dải lời chúc ở đầu trang</label><label><input type="checkbox" ${D.fx?"checked":""} onchange="leD('fx',this.checked)"> Hiệu ứng rơi (hoa, tuyết) ở Trang chủ</label></div>
<p class="ctx">Hôm nay (${t.split("-").reverse().join("/")}): ${now?`<b>${now.ic} ${now.vi}</b>`:"nền mặc định"}</p></div>
<div class="lep-tb">${rows.map(({h,s,e,on,st})=>`<div class="card lep-r ${on?"":"off"} ${st=="đang hiện"?"now":""}">
<div class="lep-h"><label><input type="checkbox" ${on?"checked":""} onchange="leOn('${h.id}',this.checked)"> <span class="lep-i">${h.ic}</span><b>${h.vi}</b> <span class="zh">${h.zh}</span></label><span class="lep-st">${h.day} · ${st}</span></div>
<div class="lep-sw" style="background:linear-gradient(160deg,${LET[h.id].bg[0]},${LET[h.id].bg[1]});"><i style="background-image:url('${leTile(h.id)}')"></i></div>
<div class="lep-f"><label>Từ <input type="date" value="${s}" onchange="leDt('${h.id}',0,this.value)"></label><label>đến <input type="date" value="${e}" onchange="leDt('${h.id}',1,this.value)"></label>${(D.d||{})[h.id]?`<button class="btn o sm" onclick="leDt('${h.id}')">↺ Ngày mặc định</button>`:""}</div>
<label class="lep-m">Lời chúc <input class="tin" value="${leE((D.m||{})[h.id]||h.m)}" onchange="leM('${h.id}',this.value)"></label>
<button class="btn o sm" onclick="lePv('${h.id}')">👁 Xem thử trên trang</button></div>`).join("")}</div>
${LE.msg?`<p class="${LE.msg[0]=="✓"?"good":"bad"}">${LE.msg}</p>`:""}
<div class="row"><button class="btn" onclick="leSave()" ${LE.busy?"disabled":""}>${LE.busy?"Đang lưu…":"💾 Lưu cho mọi học viên"}</button><button class="btn o" onclick="LE.draft=null;LE.msg='';gvDraw()">Bỏ thay đổi</button><button class="btn o" onclick="ask('Đưa toàn bộ về lịch mặc định?',()=>{LE.draft=leCfg0();gvDraw()})">↺ Mặc định</button></div>
<details class="card lep-code"><summary>Đoạn mã cho Google Sheets (làm một lần)</summary>
<p>1. Mở Google Sheets › Tiện ích mở rộng › Apps Script. Dán đoạn dưới vào <b>cuối</b> file Code.gs.<br>2. Trong hàm <code>doPost(e)</code>, thêm dòng này làm <b>dòng đầu tiên</b> bên trong hàm: <code>var _nen = nenApi_(e); if (_nen) return _nen;</code><br>3. Lưu › Triển khai › Quản lý tác vụ triển khai › ✏ › Phiên bản: Phiên bản mới › Triển khai (địa chỉ giữ nguyên).<br>4. Quay lại đây bấm 💾 Lưu cho mọi học viên.</p>
<textarea class="tin" id="lecode" rows="8" readonly>${leE(LE_GS)}</textarea><button class="btn o sm" onclick="const t=document.getElementById('lecode');t.select();try{navigator.clipboard.writeText(t.value)}catch(e){document.execCommand('copy')}">📋 Sao chép đoạn mã</button></details></div>`}
const LE_GS=`/* ===== Nền ngày lễ cho trang web (24/10/2026) ===== */
function nenApi_(e) {
  var o;
  try { o = JSON.parse(e.postData.contents); } catch (x) { return null; }
  if (!o || o.a != "nen") return null;
  var P = PropertiesService.getScriptProperties(), r;
  if (o.set) {
    var pw = String(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Cài đặt").getRange("B1").getValue()).trim();
    if (String(o.pass || "").trim() != pw) r = {ok: false, err: "pass"};
    else { P.setProperty("nen", JSON.stringify(o.set)); r = {ok: true, set: o.set}; }
  } else {
    var s = P.getProperty("nen");
    r = {ok: true, set: s ? JSON.parse(s) : null};
  }
  return ContentService.createTextOutput(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON);
}`;
const leDr=()=>LE.draft||(LE.draft=JSON.parse(JSON.stringify(LE.cfg)));
function leD(k,v){leDr()[k]=v;LE.msg="";gvDraw()}
function leOn(id,v){leDr();const o=LE.draft.off=(LE.draft.off||[]).filter(x=>x!=id);if(!v)o.push(id);LE.msg="";gvDraw()}
function leDt(id,i,v){leDr();const d=LE.draft.d=LE.draft.d||{};if(i==null){delete d[id]}else{const h=LE_DEF.find(x=>x.id==id),r=d[id]||leRange(h,LE.draft).slice();r[i]=v;if(r[1]<r[0])r[1-i]=v;d[id]=r}LE.msg="";gvDraw()}
function leM(id,v){leDr();const h=LE_DEF.find(x=>x.id==id),m=LE.draft.m=LE.draft.m||{};v=v.trim();if(!v||v==h.m)delete m[id];else m[id]=v.slice(0,160)}
function lePv(id){LE.pv=id;try{sessionStorage.setItem(LE_PV,JSON.stringify(id))}catch(e){}leApply();lePvBar();scrollTo(0,0)}
function lePvOff(){LE.pv=null;try{sessionStorage.removeItem(LE_PV)}catch(e){}leApply();lePvBar()}
function lePvBar(){let b=document.getElementById("lepvb");if(!LE.pv){if(b)b.remove();return}const h=LE_DEF.find(x=>x.id==LE.pv);
 if(!b){b=document.createElement("div");b.id="lepvb";document.body.appendChild(b)}b.innerHTML=`👁 Đang xem thử nền <b>${h.ic} ${h.vi}</b> (chỉ máy này) <button class="btn sm" onclick="lePvOff()">Bỏ xem thử</button>`}
async function leSave(){const cfg=LE.draft||LE.cfg;LE.busy=true;LE.msg="";gvDraw();let ok=false;
 try{const r=await trkPost({a:"nen",pass:GV.pass,set:cfg});
  if(r&&r.ok&&"set" in r){ok=true;LE.msg="✓ Đã lưu. Học viên sẽ thấy nền mới khi mở lại trang (trong vòng 3 giờ)."}
  else if(r&&r.err=="pass")LE.msg="Mật khẩu chưa đúng, chưa lưu được.";
  else LE.msg="Google Sheets chưa có đoạn mã nenApi_ (xem cuối trang). Cài đặt đang áp dụng trên máy này."}
 catch(e){LE.msg="Chưa kết nối được Google Sheets. Cài đặt đang áp dụng trên máy này."}
 LE.cfg=JSON.parse(JSON.stringify(cfg));try{localStorage.setItem(LE_KEY,JSON.stringify({t:ok?Date.now():0,cfg:LE.cfg,srv:ok?1:0}))}catch(e){}
 LE.busy=false;LE.draft=null;leApply();gvDraw()}
if(typeof gvDraw=="function"){const _gd=gvDraw;gvDraw=function(){const nen=GV.tab=="nen";if(nen&&!GV.stu)GV.tab="tq";_gd.apply(this,arguments);if(nen)GV.tab="nen";
 const s=document.getElementById("gv"),tb=s&&s.querySelector(".gvtabs");if(!tb)return;
 const b=document.createElement("button");b.textContent="🎨 Nền ngày lễ";b.onclick=()=>{GV.stu=null;GV.tab="nen";gvDraw()};tb.appendChild(b);
 if(nen&&!GV.stu){tb.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));let n=tb.nextSibling;while(n){const x=n.nextSibling;n.remove();n=x}tb.insertAdjacentHTML("afterend",lePanel())}}}

(function(){const st=document.createElement("style");st.textContent=`
#lebg{position:fixed;inset:0;z-index:-1;pointer-events:none}#lebg i{position:absolute;inset:0}
#lebg .le-p{background-size:300px 300px;opacity:.75}
#lebn{display:flex;align-items:center;gap:10px;margin:0 0 14px;padding:10px 14px;border-radius:16px;background:var(--c,#fff);color:var(--t,#2b1a20);border:2px solid var(--le-ac);box-shadow:var(--sh2,0 4px 12px rgba(0,0,0,.08));font-weight:700}
#lebn .le-ic{font-size:1.5rem;flex:none}#lebn .le-tx{flex:1;min-width:0;font-family:var(--ui),"Noto Serif SC",sans-serif}
#lebn button{flex:none;border:0;background:none;color:var(--sub,#8a7380);font-size:1rem;cursor:pointer;padding:4px 6px}
#lebn .le-pv{flex:none;font-size:.75rem;background:var(--le-ac);color:#fff;border-radius:999px;padding:2px 10px}
#lefx{position:fixed;inset:0;z-index:3;pointer-events:none;overflow:hidden;display:none}html.le-home #lefx{display:block}
#lefx span{position:absolute;top:-30px;opacity:.75;color:var(--le-ac);animation:lefall linear infinite}
@keyframes lefall{0%{transform:translateY(-30px) translateX(0) rotate(0)}50%{transform:translateY(50vh) translateX(18px) rotate(160deg)}100%{transform:translateY(105vh) translateX(-10px) rotate(320deg)}}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]) #lebg .le-t{opacity:0}:root:not([data-theme="light"]) #lebg .le-p{opacity:.16}}
:root[data-theme="dark"] #lebg .le-t{opacity:0}:root[data-theme="dark"] #lebg .le-p{opacity:.16}
@media(max-width:600px){#lebg .le-p{background-size:220px 220px}#lebn{font-size:.9rem;padding:8px 10px}}
#lepvb{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:20;background:#3a0d1d;color:#fff;border-radius:999px;padding:8px 10px 8px 16px;display:flex;gap:10px;align-items:center;box-shadow:0 8px 20px rgba(0,0,0,.3);font-size:.9rem;max-width:calc(100vw - 24px)}
.lep .lep-c label{display:block;margin:6px 0}.lep-ck{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:8px;border-top:1px dashed var(--b);padding-top:8px}.lep-ck label{display:inline!important}
.lep-tb{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:12px;margin:12px 0}
.lep-r{display:flex;flex-direction:column;gap:8px;padding:12px}.lep-r.off{opacity:.55}.lep-r.now{outline:3px solid var(--g)}
.lep-h{display:flex;justify-content:space-between;gap:8px;align-items:flex-start;flex-wrap:wrap}.lep-i{font-size:1.2rem}.lep-st{font-size:.8rem;color:var(--sub)}
.lep-sw{position:relative;height:74px;border-radius:12px;overflow:hidden;border:1px solid var(--b)}.lep-sw i{position:absolute;inset:0;background-size:150px 150px;opacity:.7}
.lep-f{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;font-size:.9rem}.lep-f input{font:inherit;padding:4px 6px;border:1px solid var(--b);border-radius:8px;background:var(--k);color:var(--t)}
.lep-m{font-size:.85rem;color:var(--sub)}.lep-m .tin{margin:2px 0 0;padding:6px 8px;font-size:.9rem}
.lep-code textarea{font:12px/1.4 ui-monospace,monospace}.lep .good{color:#2e7d32;font-weight:700}`;document.head.appendChild(st)})();

leApply();lePvBar();leSync();
