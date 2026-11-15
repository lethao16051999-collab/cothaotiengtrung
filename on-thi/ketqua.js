/* ===== Ôn thi HSK 3.0 · lưu kết quả (16/11/2026) =====
   Dùng chung cho các trang luyện dạng / thi thử trong on-thi/. Nạp SAU data.js.
   OTKQ.dang(lv, k, pct, sai)  — nộp 1 lần luyện dạng (Test nhanh). lv = cấp HSK 1–6, k = mã dạng trong data.js (n1, d3, v2, o1…),
                                 pct = điểm %, sai = [{q:"câu hỏi", a:"em chọn", c:"đáp án đúng"}] (câu sai, có thể bỏ trống).
   OTKQ.thi(lv, k, pct, sai)   — nộp 1 lần thi thử full đề (k = mã đề trong THI[lv]).
   Lưu trên máy: ct_ot_<lv>_<k> = {best, first, n, last, at}. Đạt khi ≥ 80%; chưa đạt thì trang luyện cho làm lại câu sai đến khi đạt.
   Gửi Sổ theo dõi: đẩy vào hàng đợi ct_trk_q (giống js/track.js) → trang chính tự gửi lần tới em mở.
     Sự kiện: {t:"Ôn thi" | "Thi thử HSK", lv: 20 + cấp, b: số thứ tự dạng, s:"HSK4 Đọc 3: … · 65%"} (lv 21–26 = Ôn thi HSK1–6, không trùng mã bài học 1–7).
     Câu sai: đổ vào Lỗi sai như bài thường (sec = tên dạng). ===== */
window.OTKQ=(function(){
const J=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const id=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const txt=s=>{const d=document.createElement("div");d.innerHTML=String(s==null?"":s);return d.textContent.replace(/\s+/g," ").trim()};
const DAT=80;
function dangOf(lv,k){const L=OT[lv];if(!L)return null;let i=0,r=null;
  L.sec.forEach(s=>s[2].forEach(d=>{i++;if(d.k==k)r={...d,sk:s[0],i}}));
  if(!r&&L.noi)L.noi.d.forEach(d=>{i++;if(d.k==k)r={...d,sk:"Nói",i}});
  return r}
function luu(lv,k,pct){pct=Math.max(0,Math.min(100,Math.round(+pct||0)));const K=`ct_ot_${lv}_${k}`,o=J(K,null)||{best:0,first:pct,n:0};
  o.n++;o.last=pct;o.at=Date.now();if(o.n==1)o.first=pct;o.best=Math.max(o.best||0,pct);put(K,o);return o}
function gui(ev,sai,sec,b,lv){const me=J("ct_trk_me",null);if(!me)return;const Q=J("ct_trk_q",{ev:[],err:[]});Q.ev=Q.ev||[];Q.err=Q.err||[];
  ev.at=Date.now();ev.id=id();Q.ev.push(ev);if(Q.ev.length>400)Q.ev=Q.ev.slice(-400);
  (sai||[]).forEach(x=>Q.err.push({id:id(),at:Date.now(),lv,b,sec,q:txt(x.q),a:txt(x.a)||"(bỏ trống)",c:txt(x.c)}));
  if(Q.err.length>600)Q.err=Q.err.slice(-600);put("ct_trk_q",Q)}
function dang(lv,k,pct,sai){const d=dangOf(lv,k),o=luu(lv,k,pct);if(!d)return o;
  const ten=`HSK${lv} ${d.sk} ${d.p.replace("Phần ","")}: ${d.d}`;
  gui({t:"Ôn thi",lv:20+lv,b:d.i,s:`${ten} · ${o.last}%${o.n>1?` (lần ${o.n}, lần 1: ${o.first}%)`:""}`},sai,ten,d.i,20+lv);return o}
function thi(lv,k,pct,sai){const x=(THI[lv]||[]).find(t=>t.k==k),o=luu(lv,k,pct),ten=`HSK${lv} · ${x?x.t:k}`;
  gui({t:"Thi thử HSK",lv:20+lv,b:0,s:`${ten} · ${o.last}%${o.n>1?` (lần ${o.n}, lần 1: ${o.first}%)`:""}`},sai,ten,0,20+lv);return o}
return{dang,thi,dangOf,DAT}})();
