/* ===== Ôn luyện theo bài: kệ sách chọn cấp =====
   Mở "Ôn luyện theo bài" → hiện bìa các giáo trình (HSK 1, 2, 3, 4, Mở rộng H4).
   Bấm vào một cuốn → mới hiện danh sách bài của cấp đó. Nạp SAU js/write.js. Không sửa file khác. ===== */
let OLPICK=false;
const SHELF=[
 {l:1,img:"img/bia-hsk1.webp",t:"New HSK 1",s:"Sơ cấp 1"},
 {l:2,img:"img/bia-hsk2.webp",t:"New HSK 2",s:"Sơ cấp 2"},
 {l:3,img:"img/bia-hsk3.webp",t:"New HSK 3",s:"Trung cấp 1"},
 {l:4,img:"",t:"HSK 4",s:"Trung cấp · du học",zh:"汉语",c:"#5c1730"},
 {l:5,img:"",t:"Mở rộng H4",s:"Trung cấp · đời sống",zh:"生活",c:"#8e2a4f"},
 {href:"hsk1/",img:"img/bia-hsk1-chuan.webp",t:"HSK1",s:"Giáo trình chuẩn (标准教程)",n:3,tot:15}];
/* Cuốn có href = trang ôn tập riêng (thư mục hsk1/, 24/10/2026); chỉ hiện ở Ôn luyện theo bài */
const shN=l=>typeof lvN=="function"?lvN(l):"HSK "+l;
function shCount(l){const D=LDS[l]||{};return Object.keys(D).filter(n=>D[n]).length}
function shelfView(pk="olPick",hint="Chọn giáo trình để xem các bài ôn luyện.",cnt=shCount,unit="bài đã có"){return `<p class="shint">${hint}</p><div class="shelf">${SHELF.filter(b=>b.href?pk=="olPick":(b.l<5||LDS[5])).map(b=>{if(b.href)return `<a class="shb" href="${b.href}"><div class="shimg"><img src="${b.img}" alt="Bìa ${b.t} ${b.s}" loading="lazy"></div><b class="sht">${b.t}</b><small>${b.s}</small><span class="pill ok">${b.n}/${b.tot} ${unit}</span></a>`;const n=cnt(b.l),tot=LV[b.l]||0;
 const cov=b.img?`<img src="${b.img}" alt="Bìa giáo trình ${b.t}" loading="lazy">`:`<div class="shcv" style="--cc:${b.c}"><span class="zh">${b.zh}</span><b>${b.t}</b><i>Cô Thảo tiếng Trung</i></div>`;
 return `<button class="shb ${n?"":"soon"}" onclick="${pk}(${b.l})"><div class="shimg">${cov}</div><b class="sht">${b.t}</b><small>${b.s}</small><span class="pill ${n?"ok":""}">${n?`${n}/${tot} ${unit}`:"Sắp ra mắt"}</span></button>`}).join("")}</div>`}
function olPick(l){OLPICK=true;setLv(l);scrollTo(0,0)}
function olShelf(){OLPICK=false;cur=null;rr();scrollTo(0,0)}
const _shDrawOl=drawOl;drawOl=function(){
 if(!cur&&!OLPICK){$("lp-ol").innerHTML=shelfView();return}
 if(cur)return _shDrawOl();
 const lb=lvBar;lvBar=()=>`<div class="row shback"><button class="btn o sm" onclick="olShelf()">← Tất cả giáo trình</button><b class="shcur">${shN(olLv)}</b></div>`;
 try{_shDrawOl()}finally{lvBar=lb}
 if(!shCount(olLv))$("lp-ol").insertAdjacentHTML("beforeend",`<div class="card note">Các bài ${shN(olLv)} đang được biên soạn. Em quay lại sau nhé!</div>`)};
const _shCrumb=crumbDraw;crumbDraw=function(){_shCrumb();const c=$("crumb");if(!c||SUBC!="ol")return;
 if(!cur&&OLPICK){c.innerHTML=`<a onclick="go('home')">Trang chủ</a> › <a onclick="goSub('ol')">Học tiếng Trung</a> › <a onclick="olShelf()">Ôn luyện theo bài</a> › ${shN(olLv)}`}
 else if(cur){c.innerHTML=`<a onclick="go('home')">Trang chủ</a> › <a onclick="goSub('ol')">Học tiếng Trung</a> › <a onclick="olShelf()">Ôn luyện theo bài</a> › <a onclick="closeL()">${shN(olLv)}</a> › Bài ${cur}`}};
const _shGoSub=goSub;goSub=function(id){if(id=="ol"){OLPICK=false;cur=null}if(id=="ts"&&!(T&&!T.done&&tcur)){TSPICK=false;tcur=null}_shGoSub(id);if(id=="ol"||id=="ts")rr()};
/* Test nhanh: mở ra là kệ chọn cấp độ trước, bấm cấp mới hiện danh sách bài (24/10/2026) */
let TSPICK=false;
const tsCount=l=>{const D=LDS[l]||{};return Object.keys(D).filter(n=>D[n]&&D[n].tsort&&D[n].tsort.length).length};
function tsPick(l){TSPICK=true;setLv(l);scrollTo(0,0)}
function tsShelf(){const q=()=>{tStop();TSPICK=false;tcur=null;T=null;rr();scrollTo(0,0)};(!tcur||!T||T.done)?q():ask("Thoát sẽ hủy bài đang làm. Thoát?",q)}
function tsList(){const q=()=>{tStop();tcur=null;T=null;rr();scrollTo(0,0)};(!T||T.done)?q():ask("Thoát sẽ hủy bài đang làm. Thoát?",q)}
const _shOpenTest=openTest;openTest=function(n){TSPICK=true;_shOpenTest(n)};
const _shDrawTs=drawTs;drawTs=function(){
 if(!tcur&&!TSPICK){$("lp-ts").innerHTML=shelfView("tsPick","Chọn cấp độ để làm bài test nhanh.",tsCount,"bài có test");return}
 if(tcur)return _shDrawTs();
 const lb=lvBar;lvBar=()=>`<div class="row shback"><button class="btn o sm" onclick="tsShelf()">← Chọn cấp độ khác</button><b class="shcur">${shN(olLv)}</b></div>`;
 try{_shDrawTs()}finally{lvBar=lb}};
const _shCrumb2=crumbDraw;crumbDraw=function(){_shCrumb2();const c=$("crumb");if(!c||SUBC!="ts"||!TSPICK)return;
 c.innerHTML=`<a onclick="go('home')">Trang chủ</a> › <a onclick="goSub('ol')">Học tiếng Trung</a> › <a onclick="tsShelf()">Test nhanh</a> › `+(tcur?`<a onclick="tsList()">${shN(olLv)}</a> › Bài ${tcur}`:shN(olLv))};
(function(){const st=document.createElement("style");st.textContent=`
.shint{color:var(--sub);margin:4px 0 14px}
.shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:18px;margin:6px 0 18px}
.shb{text-decoration:none;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;background:var(--c);border:1px solid var(--b);border-radius:22px;padding:14px 12px 16px;box-shadow:var(--sh);cursor:pointer;font:inherit;color:var(--t);transition:transform .15s,box-shadow .15s}
.shb:hover,.shb:focus-visible{transform:translateY(-4px);border-color:var(--g);outline:none}
.shimg{width:100%;aspect-ratio:3/4;display:grid;place-items:center;margin-bottom:4px}
.shimg img{max-width:100%;max-height:100%;border-radius:10px;box-shadow:0 6px 16px rgba(0,0,0,.25);object-fit:cover}
.shcv{width:78%;height:100%;border-radius:10px;background:linear-gradient(160deg,var(--cc),#2a0a17);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;box-shadow:0 6px 16px rgba(0,0,0,.25);border-left:6px solid var(--g);padding:8px}
.shcv .zh{font-size:2.4rem;color:var(--g);line-height:1.1}.shcv b{font-size:1.05rem}.shcv i{font-size:.7rem;opacity:.8;font-style:normal}
.sht{font-size:1.08rem;color:var(--m)}.shb small{color:var(--sub)}
.shb.soon{opacity:.8}.shb.soon .shimg{filter:grayscale(.35)}
.shback{align-items:center;gap:12px}.shcur{font-size:1.15rem;color:var(--m)}
@media(max-width:560px){.shelf{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.shb{padding:10px 8px 12px}}`;document.head.appendChild(st)})();
rr();
