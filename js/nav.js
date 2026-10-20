/* ===== Điều hướng trong bài học: thanh mục lục bên phải + thanh tab dính trên cùng + nút lên đầu / xuống cuối.
   Áp dụng cho mọi cấp (HSK1, HSK2: app.js · HSK4, Mở rộng H4: hsk4.js). Nạp SAU js/hsk4.js. Không sửa file khác. ===== */
let NAVO=false;
const navH4=()=>olLv>=4;
const navTabs=()=>navH4()?H4T:LTABS;
const navCur=()=>navH4()?H.t:ltab;
const navKey=t=>navH4()?H4K[t]:(["fc","gp","dt","ns"].includes(t)?t:null);
const navLvName=l=>typeof lvN=="function"?lvN(l):"HSK "+l;
function navAvg(r){const ks=navH4()?["fc","gp","dt","ns","vt"]:["fc","gp","dt","ns"],v=ks.map(k=>r[k]).filter(x=>x!=null);return v.length?Math.round(v.reduce((a,b)=>a+b,0)/v.length):null}
function navLessons(){const D=LDS[olLv]||{};return Object.keys(D).map(Number).filter(n=>D[n]).sort((a,b)=>a-b)}
function navHdr(){const h=document.querySelector("header");if(!h)return;const top=parseFloat(getComputedStyle(h).top)||0;document.documentElement.style.setProperty("--hdr",(h.offsetHeight+top)+"px")}
function navTop(){const b=$("lbody"),e=$("ltabs");if(!b)return;const hd=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hdr"))||70;
 const y=b.getBoundingClientRect().top+scrollY-(hd+(e?e.offsetHeight:0)+18);if(scrollY>y)scrollTo(0,Math.max(0,y))}
function navTab(t){NAVO=false;(navH4()?h4t:lt)(t)}
function navOpen(n){if(n===cur)return;NAVO=false;openL(n)}
function navSide(){const r=ldN(cur),ls=navLessons(),i=ls.indexOf(cur),prev=ls[i-1],next=ls[i+1],tabs=navTabs(),ct=navCur();
 const ks=tabs.map(t=>navKey(t[0])).filter(Boolean),done=ks.filter(k=>r[k]!=null).length,avg=navAvg(r),T=LTS[olLv]||[];
 return `<aside class="lside ${NAVO?"open":""}" aria-label="Mục lục bài học">
<button class="lsx" onclick="NAVO=false;rr()" aria-label="Đóng mục lục">✕</button>
<button class="lsall" onclick="NAVO=false;closeL()">⌂ Tất cả bài học</button>
<div class="lsh">Mục lục · ${navLvName(olLv)} · Bài ${cur}</div>
<div class="lstabs">${tabs.map((t,j)=>{const k=navKey(t[0]),v=k?r[k]:null;return `<button class="${t[0]==ct?"on":""}" onclick="navTab('${t[0]}')"><span class="lsn">${j+1}</span><span class="lst">${t[1]}</span>${v!=null?`<i class="sc ${v>=80?"ok":"no"}">${v}%</i>`:""}</button>`}).join("")}</div>
<div class="lsh">Tiến độ bài ${cur}</div>
<div class="lsprog"><div class="tr"><i style="width:${ks.length?Math.round(done/ks.length*100):0}%"></i></div><small>Đã làm ${done}/${ks.length} phần${avg!=null?` · trung bình <b>${avg}%</b>`:""}</small></div>
<div class="lsnav">${prev?`<button class="btn o sm" onclick="navOpen(${prev})">← Bài ${prev}</button>`:"<span></span>"}${next?`<button class="btn sm" onclick="navOpen(${next})">Bài ${next} →</button>`:""}</div>
<div class="lsh">Các bài ${navLvName(olLv)}</div>
<div class="lsls">${ls.map(n=>{const a=n==cur?avg:navAvg(ldN(n)),t=T[n-1]?T[n-1].split("|")[0]:"";return `<button class="${n==cur?"on":""}" onclick="navOpen(${n})"><b>Bài ${n}</b><span class="zh">${t}</span>${a!=null?`<i class="sc ${a>=80?"ok":"no"}">${a}%</i>`:""}</button>`}).join("")}</div>
</aside>`}
function navBottom(){const ls=navLessons(),i=ls.indexOf(cur),next=ls[i+1],tabs=navTabs(),last=navCur()==tabs[tabs.length-1][0];
 return last?`<div class="card lsend"><b>Hết bài ${cur}.</b>${next?`<button class="btn" onclick="navOpen(${next})">Học tiếp Bài ${next} →</button>`:""}<button class="btn o" onclick="closeL()">⌂ Tất cả bài học</button></div>`:""}
function navFloat(){return `<div class="lfloat"><button class="lfm" onclick="NAVO=!NAVO;rr()" aria-label="Mục lục">☰<small>Mục lục</small></button><button onclick="scrollTo({top:0,behavior:'smooth'})" aria-label="Lên đầu trang">︿</button><button onclick="scrollTo({top:document.body.scrollHeight,behavior:'smooth'})" aria-label="Xuống cuối trang">﹀</button></div>`}
function navSync(){document.body.classList.toggle("inl",!!(cur&&SUBC=="ol"&&$("learn")&&$("learn").classList.contains("on")));document.body.classList.toggle("navo",NAVO);navHdr()}

/* gắn vào trang */
const _navLV=lessonView;lessonView=function(){return `<div class="lwrap"><div class="lmain">${_navLV()}${navBottom()}</div>${navSide()}</div>${navFloat()}${NAVO?`<div class="lsbg" onclick="NAVO=false;rr()"></div>`:""}`};
const _navRR=rr;rr=function(){_navRR();navSync()};
const _navGo=go;go=function(id){_navGo(id);navSync()};
const _navSub=sub;sub=function(id){_navSub(id);navSync()};
const _navLt=lt;lt=function(t){_navLt(t);navTop()};
const _navH4t=h4t;h4t=function(t){_navH4t(t);navTop()};
const _navCl=closeL;closeL=function(){NAVO=false;_navCl();navSync();scrollTo(0,0)};
addEventListener("resize",navHdr);addEventListener("load",navHdr);navHdr();
