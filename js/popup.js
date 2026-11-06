/* Ảnh nhắc làm bài tập: hiện phủ toàn màn hình khi mở trang chủ (06/11/2026).
   Tắt bằng nút ✕, bấm ra ngoài ảnh hoặc phím Esc. Chỉ hiện lúc vừa mở trang, không hiện lại khi chuyển mục. */
(function(){
 const home=document.getElementById("home");
 if(!home||!home.classList.contains("on"))return;
 const css=`.pbt{position:fixed;inset:0;z-index:99999;background:rgba(30,8,16,.82);display:flex;align-items:center;justify-content:center;padding:16px;animation:pbtIn .25s ease}
.pbt-box{position:relative;width:min(92vw,520px);max-height:92vh;background:#7a1f3d;border:3px solid #d4a63a;border-radius:18px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.5);display:flex;flex-direction:column}
.pbt-msg{background:#7a1f3d;color:#fff8e7;font:800 clamp(1.15rem,4.6vw,1.6rem)/1.35 "Be Vietnam Pro","Nunito",sans-serif;text-align:center;padding:16px 52px 14px}
.pbt-msg b{color:#f2c94c}
.pbt-box img{display:block;width:100%;height:auto;max-height:calc(92vh - 120px);object-fit:cover;object-position:center top}
.pbt-x{position:absolute;top:8px;right:8px;width:40px;height:40px;border-radius:50%;border:2px solid #d4a63a;background:#fff8e7;color:#7a1f3d;font-size:1.3rem;font-weight:800;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2}
.pbt-x:hover{background:#d4a63a;color:#fff}
@keyframes pbtIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}`;
 const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
 const d=document.createElement("div");d.className="pbt";d.setAttribute("role","dialog");d.setAttribute("aria-label","Lời nhắn làm bài tập");
 d.innerHTML=`<div class="pbt-box"><button class="pbt-x" aria-label="Đóng">✕</button>
<div class="pbt-msg">Các em làm bài tập đi,<br>không anh và <b>cô Thảo</b> buồn 🥺</div>
<img src="img/popup-bt.webp" alt="Lời nhắn làm bài tập"></div>`;
 const close=()=>{d.remove();document.removeEventListener("keydown",esc);document.body.style.overflow=""};
 const esc=e=>{if(e.key=="Escape")close()};
 d.addEventListener("click",e=>{if(e.target===d||e.target.closest(".pbt-x"))close()});
 document.addEventListener("keydown",esc);
 document.body.style.overflow="hidden";
 document.body.appendChild(d);
})();
