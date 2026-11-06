/* Trang chủ: nút "PPT giáo trình" thay "Điểm danh" (6/11/2026). Mở cửa sổ chọn HSK1-2-3 → danh sách bài → link slide. */
(function(){
 const LV=[["hsk1","PPT HSK 1","img/bia-hsk1.webp"],["hsk2","PPT HSK 2","img/bia-hsk2.webp"],["hsk3","PPT HSK 3","img/bia-hsk3.webp"]];
 function lt(i){try{if(i==0&&typeof LT1!="undefined")return LT1;if(i==1&&typeof LT2!="undefined")return LT2;if(i==2&&typeof LT3!="undefined")return LT3}catch(e){}return []}
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 let box;
 function make(){box=document.createElement("div");box.id="ppt-m";box.innerHTML='<div class="ppt-p" role="dialog" aria-label="PPT giáo trình"><button class="ppt-x" aria-label="Đóng">×</button><div class="ppt-c"></div></div>';
  box.addEventListener("click",e=>{if(e.target===box||e.target.classList.contains("ppt-x"))close()});document.body.appendChild(box)}
 function close(){box.classList.remove("on")}
 function home(){box.querySelector(".ppt-c").innerHTML='<h3>📊 PPT giáo trình</h3><p class="ppt-s">Chọn cấp độ để xem slide bài giảng</p><div class="ppt-lv">'+LV.map((l,i)=>{const n=lt(i).length,c=Object.values(PPT_LINK[l[0]]||{}).filter(Boolean).length;return `<button class="ppt-b" data-i="${i}"><img src="${l[2]}" alt=""><b>${l[1]}</b><small>${c}/${n} bài đã có slide</small></button>`}).join("")+'</div>';
  box.querySelectorAll(".ppt-b").forEach(b=>b.onclick=()=>list(+b.dataset.i))}
 function list(i){const l=LV[i],L=PPT_LINK[l[0]]||{},T=lt(i);
  box.querySelector(".ppt-c").innerHTML=`<button class="ppt-bk">‹ Chọn cấp khác</button><h3>${l[1]}</h3><ol class="ppt-l">`+T.map((t,k)=>{const [zh,vi]=String(t).split("|"),u=L[k+1];
   return `<li class="${u?"":"no"}"><span class="ppt-n">Bài ${k+1}</span><span class="ppt-t"><span class="zh">${esc(zh)}</span><small>${esc(vi||"")}</small></span>`+(u?(/^https?:/i.test(u)?`<a href="${esc(u)}" target="_blank" rel="noopener">Mở slide ›</a>`:`<a href="#" data-u="${esc(u)}">Mở slide ›</a>`):`<em>Sắp có</em>`)+`</li>`}).join("")+`</ol>`;
  box.querySelector(".ppt-bk").onclick=home;box.querySelectorAll("a[data-u]").forEach(a=>a.onclick=e=>{e.preventDefault();view(a.dataset.u,l[1]+" · Bài "+a.closest("li").querySelector(".ppt-n").textContent.replace(/\D/g,""))});box.querySelector(".ppt-p").scrollTop=0}
 /* Slide của trang (file trong ppt/) mở ngay trong trang, không mở tab mới */
 let vw;
 function view(u,t){if(!vw){vw=document.createElement("div");vw.id="ppt-v";vw.innerHTML='<div class="ppt-vb"><button class="ppt-vx">‹ Đóng</button><b></b><button class="ppt-vf">⛶ Toàn màn hình</button></div><iframe allow="fullscreen; autoplay" allowfullscreen></iframe>';document.body.appendChild(vw);
   vw.querySelector(".ppt-vx").onclick=shut;
   vw.querySelector(".ppt-vf").onclick=()=>{try{const f=vw.querySelector("iframe");(f.requestFullscreen||f.webkitRequestFullscreen).call(f)}catch(e){}}}
  vw.querySelector("b").textContent=t;vw.querySelector("iframe").src=u;vw.classList.add("on");close();document.documentElement.style.overflow="hidden"}
 function shut(){if(!vw)return;vw.classList.remove("on");vw.querySelector("iframe").src="about:blank";document.documentElement.style.overflow="";try{if(document.fullscreenElement)document.exitFullscreen()}catch(e){}}
 window.pptOpen=function(){if(!box)make();home();box.classList.add("on")};
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){if(vw&&vw.classList.contains("on"))shut();else if(box)close()}});
})();
