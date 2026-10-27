/* ===== Kho bài học: chỉ tải dữ liệu của một cấp khi học viên mở cấp đó · thêm 27/10/2026 =====
   Mỗi cấp có một thư mục riêng:
     data/hsk1/  data/hsk2/  data/hsk4/  data/h4mr/ (Mở rộng H4)  … (HSK3 sau này: data/hsk3/)
   Trong mỗi thư mục:
     index.js  = tên bài, nhân vật, danh sách file (NAP). Nạp ngay khi mở trang (rất nhẹ).
     b01.js, b02.js … = dữ liệu từng bài (số bài 2 chữ số). CHỈ tải khi học viên bấm vào cấp đó.
     hz.js (nét chữ, tải khi mở flashcard), wg.js (mẹo nhớ), gp.js (ngữ pháp HSK1) …
   NAP[cấp] = {dir:"data/hsk2/", bai:[1,2,…], them:["wg.js"], ts:true (có Test nhanh), can:[cấp cần tải trước], v:1}
   Thêm bài N: tạo file bNN.js trong thư mục cấp, thêm N vào "bai" ở index.js của cấp, tăng "v".
   Nạp SAU js/write.js, TRƯỚC js/shelf.js. ===== */
var NAP=window.NAP||{};
const NAPP={},NAPX={};
/* cấp đã sẵn dữ liệu chưa (cấp không khai NAP coi như đã sẵn, ví dụ trang hsk1/ Giáo trình chuẩn) */
function napOk(l){return !NAP[l]||NAPX[l]===1}
/* số bài theo danh sách, dùng khi chưa tải cấp (kệ sách, Test nhanh, Tự đánh giá) */
function napBai(l,ts){const c=NAP[l];if(!c)return null;return ts&&!c.ts?[]:c.bai.slice()}
function napFiles(l){const c=NAP[l];return c.bai.map(n=>"b"+String(n).padStart(2,"0")+".js").concat(c.them||[]).map(f=>c.dir+f+"?v="+(c.v||1))}
/* tải cả cấp: các file tải song song, chạy đúng thứ tự (async=false) */
function napLv(l){const c=NAP[l];if(!c||NAPX[l]===1)return Promise.resolve();if(NAPP[l])return NAPP[l];
 return NAPP[l]=Promise.all((c.can||[]).map(napLv)).then(()=>new Promise((ok,no)=>{const fs=napFiles(l);let left=fs.length,bad=null;if(!left)return ok();
  fs.forEach(src=>{const s=document.createElement("script");s.src=src;s.async=false;
   s.onload=()=>{if(--left==0)bad?no(bad):ok()};s.onerror=()=>{bad=src;if(--left==0)no(bad)};document.head.appendChild(s)})}))
 .then(()=>{NAPX[l]=1},e=>{delete NAPP[l];throw e})}
/* khung chờ / lỗi trong lúc tải */
function napView(l,err){const n=typeof lvN=="function"?lvN(l):"HSK "+l;
 return err?`<div class="card note napbox">Chưa tải được bài ${n}. Em kiểm tra mạng rồi bấm <button class="btn sm" onclick="setLv(${l})">Thử lại</button></div>`
 :`<div class="card napbox" role="status"><span class="napsp" aria-hidden="true"></span>Đang tải bài ${n}…</div>`}
let NAPERR=0;
const _napSetLv=setLv;
setLv=function(l){if(napOk(l)){NAPERR=0;return _napSetLv(l)}
 olLv=l;LD={};cur=null;tcur=null;NAPERR=0;rr();
 napLv(l).then(()=>{if(olLv==l&&!cur&&!tcur)_napSetLv(l)},()=>{if(olLv==l){NAPERR=1;rr()}})};
const _napDrawOl=drawOl;drawOl=function(){if(!cur&&!napOk(olLv)){$("lp-ol").innerHTML=lvBar()+napView(olLv,NAPERR);return}return _napDrawOl()};
const _napDrawTs=drawTs;drawTs=function(){if(!tcur&&!napOk(olLv)){$("lp-ts").innerHTML=lvBar()+napView(olLv,NAPERR);return}return _napDrawTs()};
(function(){const st=document.createElement("style");st.textContent=`
.napbox{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.napsp{width:22px;height:22px;border-radius:50%;border:3px solid var(--g,#c9a227);border-right-color:transparent;animation:napr .8s linear infinite;flex:none}
@keyframes napr{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.napsp{animation:none}}`;document.head.appendChild(st)})();
