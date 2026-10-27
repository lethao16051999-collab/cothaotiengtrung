/* ===== Gửi kết quả trang game về Sổ theo dõi · thêm 27/10/2026 =====
   Nạp ở cuối mỗi trang game (vuon-chu-ong-vang*.html, thu-thach-hsk5*.html). Không sửa code game.
   Học viên đã nhập mã ở trang chính (ct_trk_me) → mỗi khi game lưu kết quả, gửi một dòng hoạt động
   "Game · <tên game>" kèm tóm tắt (kỷ lục / XP, sao, ải) và số phút chơi. Chưa nhập mã: không gửi gì.
   Gửi lỗi (mất mạng): đưa vào hàng đợi ct_trk_q, trang chính tự gửi lại lần sau. ===== */
(function(){
const URL0="https://script.google.com/macros/s/AKfycbzwJj7bMam8_gZHPltogTqSvxVrxI6ikvzkj6gZLm1bnk2jmrRr57Dg6IStI23Og5HZOw/exec";
const P=Storage.prototype,rawSet=P.setItem,rawGet=P.getItem;
const J=(k,d)=>{try{const v=rawGet.call(localStorage,k);return v?JSON.parse(v):d}catch(e){return d}};
const API=(()=>{try{return rawGet.call(localStorage,"ct_trk_url")||URL0}catch(e){return URL0}})();
const ME=J("ct_trk_me",null);if(!ME||!ME.code)return;
const NAME=(document.title||"Game").trim(),id=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
let gameKey=null,lastSum=J("ct_gtk_"+location.pathname,""),T=null,sec=0,act=Date.now(),start=Date.now();

/* tóm tắt kết quả từ dữ liệu game lưu */
const num=v=>typeof v=="number"&&isFinite(v);
function sum(S){if(!S||typeof S!="object")return "";const a=[];
 if(S.best&&typeof S.best=="object"){Object.keys(S.best).forEach(k=>{const v=S.best[k];
  if(num(v)&&v>0)a.push(k+" "+String(v).replace(".",","));
  else if(v&&typeof v=="object"){const n=Object.values(v).filter(num);if(n.length)a.push(k+" "+Math.max(...n))}});
  if(a.length)a.unshift("Kỷ lục:")}
 if(num(S.xp))a.push(S.xp+" XP");
 if(S.stars&&typeof S.stars=="object"){const t=Object.values(S.stars).filter(num).reduce((x,y)=>x+y,0);if(t)a.push(t+"⭐")}
 if(num(S.unlocked)&&S.unlocked>1)a.push("mở đến ải "+S.unlocked);
 if(Array.isArray(S.mistakes)&&S.mistakes.length)a.push(S.mistakes.length+" từ hay sai");
 if(Array.isArray(S.lessons)&&S.lessons.length)a.push("bài "+S.lessons.join(", "));
 return a.join(" · ").replace(/: · /,": ")}

function queue(ev){const q=J("ct_trk_q",{ev:[],err:[]});q.ev=(q.ev||[]).concat(ev).slice(-400);try{rawSet.call(localStorage,"ct_trk_q",JSON.stringify(q))}catch(e){}}
function send(beacon){const s=gameKey?sum(J(gameKey,null)):"",m=Math.round(sec/6)/10;
 if((!s||s===lastSum)&&m<0.5)return;
 const ev=[{id:id(),at:start,t:"Game · "+NAME,p:s!==lastSum?s:"",m:m>=0.5?m:undefined}];
 lastSum=s;sec=0;start=Date.now();try{rawSet.call(localStorage,"ct_gtk_"+location.pathname,JSON.stringify(s))}catch(e){}
 const body=JSON.stringify({a:"sync",code:ME.code,prog:{},ev,err:[]});
 if(beacon){try{fetch(API,{method:"POST",mode:"no-cors",keepalive:true,headers:{"Content-Type":"text/plain;charset=utf-8"},body})}catch(e){queue(ev)}return}
 fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body,redirect:"follow"}).then(r=>r.json()).then(r=>{if(!r||!r.ok)queue(ev)}).catch(()=>queue(ev))}
const soon=()=>{clearTimeout(T);T=setTimeout(()=>send(),20000)};

/* game lưu kết quả = mọi lần ghi khóa không phải ct_… */
P.setItem=function(k,v){rawSet.call(this,k,v);try{if(this===localStorage&&typeof k=="string"&&!/^ct_/.test(k)){gameKey=k;soon()}}catch(e){}};
/* thời gian chơi: cứ 15 giây, nếu có thao tác trong 2 phút gần nhất */
["pointerdown","keydown","touchstart"].forEach(e=>addEventListener(e,()=>act=Date.now(),{passive:true}));
setInterval(()=>{if(document.visibilityState=="visible"&&Date.now()-act<120000)sec+=15},15000);
addEventListener("visibilitychange",()=>{if(document.visibilityState=="hidden")send(true)});
addEventListener("pagehide",()=>send(true));
})();
