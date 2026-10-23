/* Trang chủ: nút "Nhập mã học viên" hiện tên khi học viên đã nhập mã (23/10/2026). Nạp cuối. */
(function(){const b=document.getElementById("hm-ma");if(!b)return;
 function up(){const t=b.querySelector(".hm-t");if(typeof trkIn=="function"&&trkIn()){b.classList.add("in");t.innerHTML=`Mã học viên<small>👤 ${String(TRKME.name).replace(/</g,"&lt;")}</small>`}else{b.classList.remove("in");t.textContent="Nhập mã học viên"}}
 up();if(typeof trkBadge=="function"){const o=trkBadge;trkBadge=function(){o.apply(this,arguments);up()}}})();
