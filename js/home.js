/* Trang chủ: nút "Nhập mã học viên" hiện tên khi học viên đã nhập mã (23/10/2026). Nạp cuối. */
(function(){const b=document.getElementById("hm-ma");if(!b)return;
 function up(){const t=b.querySelector(".hm-t");if(typeof trkIn=="function"&&trkIn()){b.classList.add("in");t.innerHTML=`Mã học viên<small>👤 ${String(TRKME.name).replace(/</g,"&lt;")}</small>`}else{b.classList.remove("in");t.textContent="Nhập mã học viên"}}
 up();if(typeof trkBadge=="function"){const o=trkBadge;trkBadge=function(){o.apply(this,arguments);up()}}})();
/* Nút "Ôn thi" (16/11/2026): chỉ học viên có mã. Chưa có mã → mở ô nhập mã kèm lời nhắc; đã có → mở on-thi/.
   Trang on-thi/ khi chưa có mã dẫn về "../#ma" → tự mở ô nhập mã. */
function otOpen(){if(typeof trkIn=="function"&&trkIn()){location.href="on-thi/";return}
 window.OT_AFTER=1;
 if(typeof trkBox=="function")trkBox("🎯 Mục Ôn thi dành cho học viên của cô. Em nhập mã học viên để vào.");else if(typeof trkOpen=="function")trkOpen()}
(function(){if(location.hash=="#ma"&&typeof trkOpen=="function"){history.replaceState(null,"",location.pathname+location.search);setTimeout(()=>{if(!(typeof trkIn=="function"&&trkIn()))trkOpen()},300)}})();
/* nhập mã xong sau khi bấm Ôn thi → vào luôn trang Ôn thi */
(function(){if(typeof trkBadge!="function")return;const o=trkBadge;trkBadge=function(){o.apply(this,arguments);if(window.OT_AFTER&&trkIn()){window.OT_AFTER=0;setTimeout(()=>location.href="on-thi/",600)}}})();
