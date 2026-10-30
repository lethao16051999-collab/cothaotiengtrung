/* ===== HSK4 (trung cấp): bài học 7 tab. Nạp SAU js/app.js; dùng lại hàm chung của app.js (giọng đọc, nghe cả bài, lưu tiến độ…).
   Dữ liệu: data/hsk4/index.js (LT4, LD4, SPN4, NAP[4]) + data/hsk4/bNN.js (LD4[N], tải khi mở cấp, js/kho.js). Không cần sửa app.js. ===== */
LV[4]=LT4.length;LDS[4]=LD4;LTS[4]=LT4;
/* cấp 5 = "Mở rộng H4": cùng giao diện 7 tab, dữ liệu ở LD5 (data/h4mr/index.js + data/h4mr/bNN.js) */
if(typeof LD5!="undefined"){LV[5]=LT5.length;LDS[5]=LD5;LTS[5]=LT5}
const HL=()=>LDS[olLv][cur];
const lvN=l=>l==5?"Mở rộng H4":"HSK "+l;
const H4T=[["tv","🌱 Khởi động · Từ vựng"],["bk","📖 Bài khóa"],["gp","📐 Ngữ pháp"],["nd","🎧 Nghe – Đọc"],["ns","🗣 Nói"],["vt","✍️ Viết"],["sum","🎯 Tổng kết"]];
const H4K={tv:"fc",gp:"gp",nd:"dt",ns:"ns",vt:"vt"};
const H4N={fc:"Từ vựng (thẻ từ + cụm từ)",gp:"Ngữ pháp",dt:"Nghe – Đọc",ns:"Nói (đóng vai)",vt:"Viết"};
let H={};
function h4Reset(){const L=HL()||{};H={t:"tv",py:false,vi:false,fcI:0,fcS:false,fcF:-1,show:{},wm:{},cm:{},cmD:{},so:null,tr:{},trS:{},gpPy:false,gpVi:false,ndPy:false,n1:{},n1D:{},n2:{},n2D:{},d1:{},d2:[null,null,null,null],d2D:false,role:(L.roles||[]).map(x=>x[1]),rpR:{},rpM:{},rec:null,recK:null,rt:{txt:"",done:false,sec:0},tk:{txt:"",done:false,sec:0},v1t:null,v1D:false,para:null,paraD:false,self:{}}}
h4Reset();
const hanN=s=>(String(s||"").match(/[一-鿿]/g)||[]).length;
const hanOnly=s=>(String(s||"").match(/[一-鿿]/g)||[]).join("");
const kwHas=(v,m)=>m[1]?hasKw(v,m):String(v||"").includes(m[0]);
const grpOk=(v,groups)=>groups.some(g=>g.every(m=>kwHas(v,m)));
const pct=(a,b)=>b?Math.round(a/b*100):null;
const h4Save=f=>{const r=ldN(cur);f(r);svN(cur,r)};
function h4t(t){if(H.rec)try{H.rec.stop()}catch(e){}H.t=t;rr();const e=$("ltabs");if(e)e.scrollIntoView({block:"nearest"})}
const h4Next=k=>{const i=H4T.findIndex(t=>t[0]==k);return i<H4T.length-1?`<div class="row"><button class="btn" onclick="h4t('${H4T[i+1][0]}')">Tiếp: ${H4T[i+1][1]} →</button></div>`:""};
let h4HP=true,h4HV=true;try{const a=localStorage.getItem("ct_h4hpy"),b=localStorage.getItem("ct_h4hvi");if(a!=null)h4HP=a=="1";if(b!=null)h4HV=b=="1"}catch(e){}
function h4PvT(k){if(k=="p")h4HP=!h4HP;else h4HV=!h4HV;try{localStorage.setItem("ct_h4hpy",h4HP?"1":"0");localStorage.setItem("ct_h4hvi",h4HV?"1":"0")}catch(e){}rr()}
const h4PvBar=()=>`<div class="pvbar"><span>Hiển thị:</span><button class="tg ${h4HP?"":"on"}" onclick="h4PvT('p')" aria-pressed="${!h4HP}">${h4HP?"☐":"☑"} Pinyin</button><button class="tg ${h4HV?"":"on"}" onclick="h4PvT('v')" aria-pressed="${!h4HV}">${h4HV?"☐":"☑"} Tiếng Việt</button><small>áp dụng cho mọi phần của bài</small></div>`;
const h4Tog=(k,lb)=>`<button class="btn o sm" onclick="H.${k}=!H.${k};rr()">${H[k]?"Ẩn":"Hiện"} ${lb}</button>`;
/* Sao chép nội dung ô gõ (khung trang chặn clipboard thì bôi đen để học viên tự chép) */
function h4Copy(id){const t=$(id);if(!t)return;const v=t.value;if(!v.trim())return ask("Chưa có nội dung để sao chép.",null,1);
 const ok=()=>ask("✓ Đã sao chép. Em dán vào Zalo hoặc nơi cần gửi (giữ ngón tay vào ô nhập → Dán, hoặc Ctrl+V).",null,1);
 const fb=()=>{t.focus();t.select();try{t.setSelectionRange(0,v.length)}catch(e){}let d=false;try{d=document.execCommand("copy")}catch(e){}
  d?ok():ask("Máy chưa cho sao chép tự động. Nội dung đã được bôi đen: em giữ ngón tay (hoặc bấm chuột phải) rồi chọn Sao chép.",null,1)};
 try{navigator.clipboard.writeText(v).then(ok,fb)}catch(e){fb()}}
const h4CopyBtn=id=>`<button class="btn o sm" onclick="h4Copy('${id}')">📋 Sao chép bài</button>`;

/* ---------- Khung bài học ---------- */
function h4View(){const L=HL(),r=ldN(cur);
 return `<div class="lhead"><span class="no">${cur}</span><div><small>${lvN(olLv)} · Bài ${cur} · Trung cấp</small><div class="zh lt2">${L.t}</div><small>${L.tp}</small><div>${L.vi}</div></div>${vBtn()}</div>
${vBar()}<div class="stb" id="ltabs">${H4T.map(t=>{const k=H4K[t[0]],v=k?r[k]:null;return `<button class="${t[0]==H.t?"on":""}" onclick="h4t('${t[0]}')">${t[1]}${v!=null?` <i class="sc ${v>=80?"ok":"no"}">${v}%</i>`:""}</button>`}).join("")}</div>
${h4PvBar()}<div class="stack h4 ${h4HP?"hidepy h4nopy":""} ${h4HV?"hidevi h4novi":""}" id="lbody">${({tv:h4Tv,bk:h4Bk,gp:h4Gp,nd:h4Nd,ns:h4Ns,vt:h4Vt,sum:h4Sum})[H.t](L,r)}</div>`}

/* ---------- 1. Khởi động · Từ vựng ---------- */
function h4Tv(L,r){const W=L.warm,ws=L.words.map((w,j)=>j).filter(j=>H.fcF<0||L.words[j][4]==H.fcF);
 if(!ws.includes(H.fcI))H.fcI=ws[0];const w=L.words[H.fcI],k=r.fck||{},m=Object.values(k).filter(x=>x===1).length,n=L.words.length,cmk=r.cmk||{};
 let h=`<div class="card note"><b>🎯 Mục tiêu bài học</b><ol class="h4goal">${L.goals.map(g=>`<li><span class="zh">${g.zh}</span><small class="h4vi">${g.vi}</small></li>`).join("")}</ol></div>`;
 h+=`<div class="card"><h3>热身 · Khởi động</h3><p><b>1. Chọn từ đúng cho mỗi hình.</b></p><div class="h4pics">${W.pic.map((p,i)=>{const v=H.wm[i],ok=v!=null&&W.opts[v].split("|")[0]==p[1];
  return `<div class="h4pic ${v==null?"":ok?"ok":"no"}"><div class="ic">${p[0]}</div><select class="tin" onchange="H.wm[${i}]=this.value===''?null:+this.value;rr()"><option value="">— chọn —</option>${W.opts.map((o,j)=>`<option value="${j}" ${v===j?"selected":""}>${o.split("|")[0]}</option>`).join("")}</select>${v==null?"":ok?`<small class="okt">✓ ${W.opts[v].split("|")[1]}</small>`:`<small class="bad">✗ Thử lại</small>`}</div>`}).join("")}</div>
<p><b>2. Hai bạn một nhóm, hỏi đáp theo thực tế của mình.</b></p>${W.q.map(q=>`<div class="bub ref"><div class="hz">${q[0]} ${bS(q[0])}</div><div class="vi" style="display:block">${q[1]}</div><details><summary>Câu trả lời mẫu</summary><div class="zh">${q[2]} ${bS(q[2])}</div></details></div>`).join("")}</div>`;
 h+=`<div class="card"><h3>🃏 Thẻ từ – học theo cụm</h3><p class="ctx">Mặt trước chỉ có chữ Hán. Lật thẻ để xem phiên âm, nghĩa, cụm từ hay dùng và âm Hán Việt. Thẻ có dấu ⚠️ là từ dễ hiểu sai nghĩa.</p>
<div class="row">${["Tất cả","Bài khóa 1","Bài khóa 2","Bài khóa 3","Bài khóa 4"].map((t,i)=>`<button class="btn sm ${H.fcF==i-1?"":"o"}" onclick="H.fcF=${i-1};H.fcS=false;rr()">${t}</button>`).join("")}</div>
<div class="fc h4fc" onclick="H.fcS=!H.fcS;rr()">${H.fcS?`<div><div class="h">${w[0]}</div><div class="py">${w[1]}</div><b>${w[3]}</b> <small>(${w[2]})</small>
<div class="h4col">${w[5].map(c=>{const[a,b]=c.split("|");return `<span><span class="zh">${a}</span> <small class="h4py">${b}</small> ${bS(a)}</span>`}).join("")}</div>
<div class="h4hv">Hán Việt: <b>${w[6]}</b></div>${w[7]?`<div class="h4warn">⚠️ ${w[7]}</div>`:""}</div>`:`<div><div class="h">${w[0]}</div>${w[7]?`<div class="h4warn sm">⚠️</div>`:""}<small style="color:var(--sub)">Chạm để lật thẻ</small></div>`}</div>
<div class="row c">${bS(w[0],"🔊 Nghe")}<button class="btn o" onclick="h4Fc(-1)">←</button><button class="btn" onclick="h4FcMk(1)">✓ Đã nhớ</button><button class="btn o" onclick="h4FcMk(0)">✗ Chưa nhớ</button><button class="btn o" onclick="h4Fc(1)">→</button></div>
<p>Thẻ ${ws.indexOf(H.fcI)+1}/${ws.length} · Đã nhớ ${m}/${n} từ${r.fk==null?` · Đánh dấu đủ ${n} thẻ để tính điểm`:` · Điểm thẻ từ: <b>${r.fk}%</b>`}</p>
<div class="chips">${ws.map(j=>`<span class="chip ${k[j]===1?"ok":k[j]===0?"no":""} ${j==H.fcI?"cur":""}" onclick="H.fcI=${j};H.fcS=false;rr()">${L.words[j][0]}</span>`).join("")}</div></div>`;
 h+=`<div class="card"><h3>🔗 Test cụm từ</h3><p class="ctx">Từ trọng tâm kết hợp được với những từ nào? <b>Có thể chọn nhiều đáp án.</b> Chọn xong bấm Kiểm tra. Điểm tính theo lần kiểm tra đầu.</p>${L.cm.map((q,i)=>{const sel=H.cm[i]||[],d=H.cmD[i],ok=d&&sel.length==q.a.length&&q.a.every(x=>sel.includes(x));
  return `<div class="q ${d?ok?"ok":"no":""}" style="padding:10px 0"><b>${i+1}.</b> <span class="zh hd">${q.w}</span> <small class="h4py">${q.py}</small> ${bS(q.w)} <span class="ctx">+ …?</span>
<div class="opts">${q.o.map((o,j)=>{const[a,b]=o.split("|"),on=sel.includes(j),good=q.a.includes(j);return `<button class="opt h4m ${on?"sel":""} ${d&&good?"right":""} ${d&&on&&!good?"wrong":""}" ${d?"disabled":""} onclick="h4CmT(${i},${j})"><span class="h4box">${on?"☑":"☐"}</span> <span class="zh">${a}</span>${d?`<small class="opy">${b}</small>`:""}</button>`}).join("")}</div>
${d?`<div class="${ok?"okt":"bad"}">${ok?"✓ Đúng hết!":"✗ Chưa đúng. Ô xanh là các từ kết hợp được."} <span class="ctx h4vi">${q.e}</span></div><div class="row"><button class="btn o sm" onclick="H.cm[${i}]=[];H.cmD[${i}]=0;rr()">Làm lại</button></div>`:`<div class="row"><button class="btn sm" onclick="h4CmCk(${i})">Kiểm tra</button></div>`}</div>`}).join("")}
<p>${r.cm!=null?`Điểm test cụm từ: <b>${r.cm}%</b>`:`<span class="ctx">Đã làm ${Object.keys(cmk).length}/${L.cm.length} câu.</span>`}</p></div>`;
 h+=r.fc!=null?`<p>Điểm phần Từ vựng (thẻ từ + cụm từ): <b>${r.fc}%</b></p>`:`<p class="ctx">Điểm phần Từ vựng tính khi đã xong cả thẻ từ và test cụm từ.</p>`;
 return h+h4Next("tv")}
function h4Fc(d){const L=HL(),ws=L.words.map((w,j)=>j).filter(j=>H.fcF<0||L.words[j][4]==H.fcF),i=ws.indexOf(H.fcI);H.fcI=ws[(i+d+ws.length)%ws.length];H.fcS=false;rr()}
function h4TvScore(r){r.fc=r.fk!=null&&r.cm!=null?Math.round((r.fk+r.cm)/2):null;if(r.fc==null)delete r.fc}
function h4FcMk(v){const n=HL().words.length;h4Save(r=>{r.fck=r.fck||{};r.fck[H.fcI]=v;if(Object.keys(r.fck).length>=n)r.fk=pct(Object.values(r.fck).filter(x=>x===1).length,n);h4TvScore(r)});h4Fc(1)}
function h4CmT(i,j){const s=H.cm[i]=H.cm[i]||[],x=s.indexOf(j);x<0?s.push(j):s.splice(x,1);rr()}
function h4CmCk(i){const q=HL().cm[i],sel=H.cm[i]||[];if(!sel.length)return ask("Em hãy chọn ít nhất một từ.",null,1);
 const ok=sel.length==q.a.length&&q.a.every(x=>sel.includes(x));H.cmD[i]=1;
 h4Save(r=>{r.cmk=r.cmk||{};if(r.cmk[i]==null)r.cmk[i]=ok?1:0;const L=HL();if(Object.keys(r.cmk).length>=L.cm.length)r.cm=pct(Object.values(r.cmk).filter(x=>x===1).length,L.cm.length);h4TvScore(r)});rr()}

/* ---------- 2. Bài khóa ---------- */
function h4Bk(L,r){const bq=r.bq||{};
 let h=`<div class="card note">Ở trình độ trung cấp, em <b>nghe trước – trả lời câu hỏi – rồi mới xem chữ</b>. Phiên âm và nghĩa tiếng Việt mặc định ẩn; chỉ bật khi thật cần. Chạm vào từng câu để nghe riêng câu đó.</div>
<div>`;
 h+=L.texts.map((x,i)=>{const all=x.q.every((q,j)=>bq[i+"-"+j]!=null),show=x.task=="read"||H.show[i]||all;
  return `<div class="card"><h3>课文 ${i+1} · Bài khóa ${i+1}</h3><p class="ctx">📍 <span class="zh">${x.ctx}</span><br>${x.cv}</p>
<div class="h4task">${x.task=="read"?`<b>📖 Đọc nhanh đoạn văn (khoảng 2 phút) rồi trả lời.</b>`:`<b>🎧 Bước 1: Nghe cả bài, chưa nhìn chữ, rồi trả lời.</b><div class="pbar" id="pb${i}">${pbHtml(i)}</div>`}
${x.q.map((q,j)=>{const a=bq[i+"-"+j];return `<div class="q ${a==null?"":a===q.a?"ok":"no"}"><b>(${j+1})</b> <span class="zh">${q.q}</span> ${bS(q.q)}<div class="opts">${q.o.map((o,k)=>`<button class="opt ${a===k?"sel":""} ${a!=null&&k===q.a?"right":""}" onclick="h4Bq(${i},${j},${k})"><b>${"ABCD"[k]}.</b> <span class="zh">${o}</span></button>`).join("")}</div>${a==null?"":a===q.a?`<div class="okt">✓ Đúng rồi!</div>`:`<div class="bad">✗ Chưa đúng. Đáp án: ${"ABCD"[q.a]}. Nghe lại hoặc đọc lại bài khóa nhé.</div>`}</div>`}).join("")}</div>
${show?`${x.task=="read"?`<div class="pbar" id="pb${i}">${pbHtml(i)}</div>`:`<p class="ctx"><b>Bước 2:</b> Đọc theo bài khóa, chú ý từ mới và cấu trúc.</p>`}
<div class="${x.para?"h4para":""}">${x.l.map((y,j)=>x.para?`${y[0]=="¶"?`<div class="h4gap"></div>`:""}<div class="bub" id="bub${i}-${j}" onclick="spk(${S(y[1])})"><div class="py">${y[2]}</div><div class="hz">${y[1]}</div><div class="vi">${y[3]}</div></div>`:
`<div class="dl"><div class="who"><b>${y[0]}</b>${SPN4[y[0]]||""}</div><div class="bub" id="bub${i}-${j}" onclick="spk(${S(y[1])})"><div class="py">${y[2]}</div><div class="hz">${y[1]}</div><div class="vi">${y[3]}</div></div></div>`).join("")}</div>
<details><summary>Từ mới bài khóa ${i+1}</summary><table class="wt">${L.words.filter(w=>w[4]==i).map(w=>`<tr><td class="zh">${w[0]} ${bS(w[0])}</td><td class="h4py">${w[1]}</td><td class="h4vi"><small>${w[2]}</small> ${w[3]}</td></tr>`).join("")}</table></details>`
:`<div class="row"><button class="btn o sm" onclick="H.show[${i}]=1;rr()">👀 Hiện bài khóa</button><small class="ctx">Hoặc trả lời xong câu hỏi, bài khóa tự hiện.</small></div>`}</div>`}).join("");
 return h+`</div><p class="ctx">🎧 Hiện dùng giọng đọc máy. Khi cô gửi file nghe giáo trình, trang sẽ phát file thật.</p>`+h4Next("bk")}
function h4Bq(i,j,k){h4Save(r=>{r.bq=r.bq||{};if(r.bq[i+"-"+j]==null)r.bq[i+"-"+j]=k});rr()}

/* ---------- 3. Ngữ pháp ---------- */
function h4SoInit(L){H.so=L.so.map(it=>{let p;for(let k=0;k<12;k++){p=shuf(it.t.map((_,i)=>i));if(!it.ok.map(gH).includes(gH(p.map(i=>it.t[i]).join(""))))break}return{pool:p,ch:[],st:null}})}
function h4Gp(L,r){if(!H.so)h4SoInit(L);const trk=r.trk||{};
 let h=`<div class="card note">${GPN} Mỗi điểm: công thức → ví dụ (chạm để nghe) → lỗi người Việt hay mắc. Phiên âm và nghĩa mặc định ẩn; muốn xem thì bật ☑ Pinyin, ☑ Tiếng Việt ở thanh Hiển thị.</div>
<div>`;
 h+=L.gp.map(g=>`<div class="card gpb"><h4>${g.h}</h4><div class="fm">${g.f[0]}<small>${g.f[1]}</small></div><p>${g.d}</p><ul>${g.ex.map(e=>`<li onclick="spk(${S(e[0])})" style="cursor:pointer">${Z(e[0],e[1])}<div class="h4vi">${e[2]}</div> 🔊</li>`).join("")}</ul><p class="warn">${g.w}</p></div>`).join("")+`</div>`;
 h+=`<div class="card note"><b>Dạng A · Sắp xếp từ thành câu</b> (giống phần 完成句子 của đề HSK 4)<br>Chạm các từ theo đúng thứ tự. Chạm từ đã chọn để bỏ ra.</div>`;
 h+=L.so.map((it,k)=>{const s=H.so[k],ok=s.st===true,bad=s.st===false;return `<div class="card q ${ok?"ok":bad?"no":""}"><b>Câu ${k+1}.</b>
<div class="slots">${s.ch.map((i,j)=>`<button class="tok" ${ok?"disabled":`onclick="h4SoMv(${k},'c',${j})"`}>${it.t[i]}</button>`).join("")}</div>
<div class="bank">${s.pool.map((i,j)=>`<button class="tok" onclick="h4SoMv(${k},'p',${j})">${it.t[i]}</button>`).join("")}</div>
${ok?`<div class="${s.sh?"ctx":"okt"}">${s.sh?"Đáp án:":"✓ Đúng rồi!"} ${bS(it.f)}</div><div class="zh hd">${it.f}</div>`:bad?`<div class="bad">✗ Chưa đúng. Gợi ý: ${it.e}</div>`:""}
<div class="row">${ok?"":`<button class="btn sm" onclick="h4SoCk(${k})" ${s.pool.length?"disabled":""}>Kiểm tra</button>`}${bad?`<button class="btn o sm" onclick="H.so[${k}].st=true;H.so[${k}].ch=[];H.so[${k}].pool=[];H.so[${k}].sh=1;rr()">Xem đáp án</button>`:""}</div></div>`}).join("");
 h+=`<div class="card note"><b>Dạng B · Dịch câu Việt → Trung</b><br>Viết bằng chữ Hán (hoặc pinyin không dấu). Máy so với đáp án tham khảo.<br>⚠️ <b>Đáp án chỉ mang tính tham khảo</b>: một câu có thể có nhiều cách dịch đúng. Nếu câu của em khác đáp án, em tự đối chiếu, hoặc mang bài nhờ giáo viên hay một ứng dụng AI khác kiểm tra giúp.</div>`;
 h+=L.tr.map((it,k)=>{const st=H.trS[k],v=H.tr[k]||"";return `<div class="card q ${st=="ok"||st=="sok"?"ok":st=="sno"?"no":""}"><b>Câu ${k+1}.</b> ${it.vi}<div class="ctx">Gợi ý cấu trúc: <span class="zh">${it.g}</span></div>
<textarea class="tin h4ta" rows="2" id="h4tr-${k}" oninput="H.tr[${k}]=this.value" ${st?"disabled":""} placeholder="Viết câu tiếng Trung…">${esc(v)}</textarea>
${st?"":`<div class="row"><button class="btn sm" onclick="h4TrCk(${k})">Kiểm tra</button></div>`}
${st=="ok"?`<div class="okt">✓ Khớp với đáp án tham khảo.</div>`:st?`<div class="ctx">Câu của em chưa giống hẳn đáp án tham khảo. Em đối chiếu xem có cùng ý và đúng ngữ pháp không:</div>`:""}
${st?`<div class="ans"><b>Đáp án tham khảo:</b><div class="zh">${it.r[0]} ${bS(it.r[0])}</div><div class="py" style="display:block">${it.r[1]}</div></div>`:""}
${st=="self"?`<div class="row"><button class="btn sm" onclick="h4TrSelf(${k},1)">✓ Câu em đúng ý</button><button class="btn o sm" onclick="h4TrSelf(${k},0)">✗ Câu em chưa đúng</button></div>`:""}
${st=="sok"?`<div class="okt">Em tự xác nhận: đúng ý.</div>`:st=="sno"?`<div class="bad">Em tự xác nhận: chưa đúng. Đọc lại đáp án và lỗi hay gặp ở trên nhé.</div>`:""}
${st&&st!="ok"?`<div class="row"><button class="btn o sm" onclick="H.trS[${k}]=null;rr()">Sửa và kiểm tra lại</button></div>`:""}</div>`}).join("");
 const n=L.so.length+L.tr.length;
 h+=r.gp!=null?`<p>Điểm ngữ pháp (dạng A + B, tính lần làm đầu): <b>${r.gp}%</b></p>`:`<p class="ctx">Làm xong ${n} câu dạng A và B để tính điểm.</p>`;
 return h+h4Next("gp")}
function h4SoMv(k,from,j){const s=H.so[k];if(s.st===true)return;if(from=="p")s.ch.push(s.pool.splice(j,1)[0]);else s.pool.push(s.ch.splice(j,1)[0]);s.st=null;rr()}
function h4SoCk(k){const it=HL().so[k],s=H.so[k],ok=it.ok.map(gH).includes(gH(s.ch.map(i=>it.t[i]).join("")));s.st=ok;
 h4Save(r=>{r.so=r.so||{};if(r.so[k]==null)r.so[k]=ok?1:0;h4GpScore(r)});if(!ok){s.pool=s.pool.concat(s.ch);s.ch=[]}rr()}
function h4TrCk(k){const it=HL().tr[k],v=H.tr[k]||"";if(!gN(v))return ask("Em hãy viết câu dịch trước khi kiểm tra.",null,1);
 const ok=it.a.map(gH).includes(gH(v))||gN(v)===gN(it.r[1]);H.trS[k]=ok?"ok":"self";if(ok)h4Save(r=>{r.trk=r.trk||{};if(r.trk[k]==null)r.trk[k]=1;h4GpScore(r)});rr()}
function h4TrSelf(k,v){H.trS[k]=v?"sok":"sno";h4Save(r=>{r.trk=r.trk||{};if(r.trk[k]==null)r.trk[k]=v?1:0;h4GpScore(r)});rr()}
function h4GpScore(r){const L=HL(),so=r.so||{},tr=r.trk||{};if(Object.keys(so).length>=L.so.length&&Object.keys(tr).length>=L.tr.length)
 r.gp=pct(Object.values(so).filter(x=>x===1).length+Object.values(tr).filter(x=>x===1).length,L.so.length+L.tr.length)}

/* ---------- 4. Nghe – Đọc ---------- */
const h4NdTot=L=>L.n1.length+L.n2.length+L.d1.q.length+L.d2.a.length;
function h4NdMk(key,ok){h4Save(r=>{r.nd=r.nd||{};if(r.nd[key]==null)r.nd[key]=ok?1:0;const L=HL(),tot=h4NdTot(L),ks=Object.keys(r.nd).filter(k=>!/^d3-/.test(k));
 if(ks.length>=tot)r.dt=pct(ks.filter(k=>r.nd[k]===1).length,tot)})}
function h4Nd(L,r){const nd=r.nd||{};let h=`<div class="card note">Phần này luyện mục tiêu 1 và 3: nghe lấy thông tin, đọc hiểu đoạn văn. Các dạng bài giống đề HSK 4 (nghe – 选词填空 – sắp xếp đoạn). Điểm tính theo lần làm đầu. Phiên âm mặc định ẩn.</div>
<div>`;
 h+=`<div class="card"><h3>🎧 Nghe 1 · Nghe điền từ còn thiếu</h3><p class="ctx">Bấm nghe (nghe tối đa vài lần), gõ từ còn thiếu bằng chữ Hán hoặc pinyin không dấu.</p>${L.n1.map((x,i)=>{const d=H.n1D[i];
  return `<div class="q ${d==null?"":d?"ok":"no"}" style="padding:10px 0"><b>${i+1}.</b> ${bS(x[0],"🔊 Nghe")} <span class="zh">${x[1]}</span><div class="py h4py">${x[4]}</div><div class="row"><input class="tin" style="max-width:220px" value="${esc(H.n1[i]||"")}" oninput="H.n1[${i}]=this.value" ${d!=null?"disabled":""}>${d==null?`<button class="btn sm" onclick="h4N1(${i})">Kiểm tra</button>`:""}</div>${d==null?"":`<div class="${d?"okt":"bad"}">${d?"✓ Đúng.":"✗ Chưa đúng."} Đáp án: <span class="zh">${x[2]}</span> · <span class="zh">${x[0]}</span></div>`}</div>`}).join("")}</div>`;
 h+=`<div class="card"><h3>🎧 Nghe 2 · Chép nguyên câu</h3><p class="ctx">Ba câu ví dụ ngữ pháp quan trọng. Nghe rồi gõ lại cả câu bằng chữ Hán (không cần dấu câu). Đạt khi đúng từ 90% số chữ.</p>${L.n2.map((x,i)=>{const d=H.n2D[i];const m=d!=null?simi(hanOnly(H.n2[i]),hanOnly(x)):0;
  return `<div class="q ${d==null?"":d?"ok":"no"}" style="padding:10px 0"><b>${i+1}.</b> ${bS(x,"🔊 Nghe")}<div class="row"><input class="tin" value="${esc(H.n2[i]||"")}" oninput="H.n2[${i}]=this.value" ${d!=null?"disabled":""} placeholder="Gõ chữ Hán…">${d==null?`<button class="btn sm" onclick="h4N2(${i})">Kiểm tra</button>`:""}</div>${d==null?"":`<div>So với câu gốc: <span class="zh hd">${lcsMark(x,H.n2[i])}</span> <small>(chữ đỏ là chữ thiếu hoặc sai)</small></div><div class="${d?"okt":"bad"}">${d?"✓ Đạt":"✗ Chưa đạt"} · đúng ${m}% số chữ</div>`}</div>`}).join("")}</div>`;
 h+=`<div class="card"><h3>📖 Đọc 1 · 选词填空 Chọn từ điền vào chỗ trống</h3>${L.d1.q.map((q,i)=>{const a=H.d1[i],g=L.d1.g[q[0]],gp=L.d1.gp[q[0]];
  return `${i==0||L.d1.q[i-1][0]!=q[0]?`<p class="h4bank">${g.map((w,j)=>`<span class="pill"><b>${"ABCDE"[j]}</b> <span class="zh">${w}</span> <small class="h4py">${gp[j]}</small></span>`).join("")}</p>`:""}<div class="q ${a==null?"":a===q[2]?"ok":"no"}" style="padding:8px 0"><b>(${i+1})</b> <span class="zh">${q[1].replace("____",a!=null?`<u>${g[a]}</u>`:"____")}</span><div class="py h4py">${q[3]}</div><div class="opts h4abc">${g.map((w,j)=>`<button class="opt ${a===j?"sel":""} ${a!=null&&j===q[2]?"right":""}" ${a!=null?"disabled":""} onclick="h4D1(${i},${j})"><b>${"ABCDE"[j]}</b> <span class="zh">${w}</span></button>`).join("")}</div>${a!=null&&a!==q[2]?`<div class="bad">✗ Đáp án: ${"ABCDE"[q[2]]} <span class="zh">${g[q[2]]}</span></div>`:""}</div>`}).join("")}</div>`;
 const D=L.d2;h+=`<div class="card"><h3>📖 Đọc 2 · Chọn vế câu hoàn thành đoạn văn</h3><div class="h4bank" style="flex-direction:column;align-items:flex-start">${D.o.map((o,j)=>`<span class="pill"><b>${"ABCD"[j]}</b> <span class="zh">${o}</span><small class="h4py" style="display:block">${D.op[j]}</small></span>`).join("")}</div>
<div class="zh h4d2">${D.s.map((s,i)=>s+(i<D.a.length?`<select class="tin h4sel ${H.d2D?(H.d2[i]===D.a[i]?"ok":"no"):""}" ${H.d2D?"disabled":""} onchange="H.d2[${i}]=this.value===''?null:+this.value"><option value="">(${i+1}) …</option>${D.o.map((o,j)=>`<option value="${j}" ${H.d2[i]===j?"selected":""}>${"ABCD"[j]}</option>`).join("")}</select>`:"")).join("")}</div><div class="py h4py">${D.py}</div>
${H.d2D?`<div class="ans"><b>Đáp án:</b> ${D.a.map((a,i)=>`(${i+1}) ${"ABCD"[a]}`).join(" · ")}<div class="zh" style="margin-top:6px">${D.s.map((s,i)=>s+(i<D.a.length?`<u>${D.o[D.a[i]]}</u>`:"")).join("")}</div></div>`:`<div class="row"><button class="btn sm" onclick="h4D2()">Kiểm tra</button></div>`}</div></div>`;
 const tot=h4NdTot(L),done=Object.keys(nd).filter(k=>!/^d3-/.test(k)).length;
 h+=r.dt!=null?`<p>Điểm Nghe – Đọc: <b>${r.dt}%</b></p>`:`<p class="ctx">Đã làm ${done}/${tot} câu. Làm đủ để tính điểm.</p>`;
 return h+h4Next("nd")}
function h4N1(i){const x=HL().n1[i],v=H.n1[i]||"";if(!gN(v))return ask("Em hãy gõ từ còn thiếu trước.",null,1);const ok=gH(v)===gH(x[2])||gN(v)===x[3];H.n1D[i]=ok;h4NdMk("n1-"+i,ok);rr()}
function h4N2(i){const x=HL().n2[i],v=H.n2[i]||"";if(!hanN(v))return ask("Em hãy gõ câu bằng chữ Hán.",null,1);const ok=simi(hanOnly(v),hanOnly(x))>=90;H.n2D[i]=ok;h4NdMk("n2-"+i,ok);rr()}
function h4D1(i,j){const q=HL().d1.q[i];H.d1[i]=j;h4NdMk("d1-"+i,j===q[2]);rr()}
function h4D2(){const D=HL().d2;if(H.d2.some(x=>x==null))return ask("Em hãy chọn đủ 4 chỗ trống.",null,1);H.d2D=true;D.a.forEach((a,i)=>h4NdMk("d2-"+i,H.d2[i]===a));rr()}

/* ---------- 5. Nói ---------- */
const h4Tgt=s=>s.replace(/（[^）]*）/g,"");
const h4Mine=(who,role)=>who==role||who.split("、").includes(role);
function h4RpNeed(L){return L.rp.flatMap((ti,a)=>L.texts[ti].l.map((y,j)=>h4Mine(y[0],H.role[a])?ti+"-"+j:null).filter(Boolean))}
function h4Ns(L,r){const nk=r.nk||{},noSR=!SRC||srBlocked;
 let h=`<div class="card note">Ba mức, từ dễ đến khó: <b>Mức 1</b> đóng vai theo bài khóa (máy chấm theo câu mẫu, đạt từ 70%) · <b>Mức 2</b> kể lại bài khóa 3 theo từ khóa · <b>Mức 3</b> ${L.tasks?"task thực tế (chọn 1 trong "+L.tasks.length+" task)":"tự trình bày khoảng 1 phút"}. Ở mức 2 và 3, em nói (máy tự ghi vào khung) hoặc gõ thẳng vào khung; máy kiểm tra từ khóa, cấu trúc, không chấm đúng sai. Làm xong bấm <b>📋 Sao chép bài</b> để gửi cô.${noSR?`<br><span class="bad">Trình duyệt này chưa nghe được giọng nói (cần Chrome hoặc Edge và cho phép micro). Mức 1 cần micro; mức 2, 3 em gõ vào khung.</span>`:""}</div>`;
 h+=L.rp.map((ti,a)=>{const x=L.texts[ti],ro=L.roles[a];return `<div class="card"><h3>Mức 1 · Đóng vai bài khóa ${ti+1}</h3><p class="ctx">📍 ${x.cv}</p>
<div class="row">Em đóng vai: ${ro.map((p,pi)=>`<button class="btn sm ${H.role[a]==p?"":"o"}" onclick="H.role[${a}]=HL().roles[${a}][${pi}];h4RpScore();rr()">${p} · ${SPN4[p]}</button>`).join("")}</div>
${x.l.map((y,j)=>{const me=h4Mine(y[0],H.role[a]),k=ti+"-"+j,st=nk[k],R=H.rpR[k];
 return me?`<div class="dl me"><div class="who"><b>${y[0]}</b>Em nói</div><div class="bub h4me ${st===1?"ok":st===0?"no":""}"><div class="vi" style="display:block">💬 ${y[3]}</div>
<div class="row">${noSR?"":`<button class="btn sm" onclick="h4Rp('${k}')">${H.recK===k?"⏹ Dừng":"🎤 Nói"}</button>`}<button class="btn o sm" onclick="H.rpM['${k}']=1;rr()">👁 Xem mẫu</button></div>
${H.rpM[k]?`<div class="zh">${h4Tgt(y[1])} ${bS(h4Tgt(y[1]))}</div><div class="py" style="display:block">${y[2]}</div>`:""}${R||""}</div></div>`
 :`<div class="dl"><div class="who"><b>${y[0]}</b>${SPN4[y[0]]}</div><div class="bub" onclick="spk(${S(h4Tgt(y[1]))})"><div class="hz">${y[1]} 🔊</div></div></div>`}).join("")}</div>`}).join("");
 const need=h4RpNeed(L),done=need.filter(k=>nk[k]===1).length;
 h+=`<p>Mức 1: đạt ${done}/${need.length} lượt${r.ns!=null?` · Điểm nói: <b>${r.ns}%</b>`:" · Nói đủ các lượt của vai đã chọn để tính điểm"}.</p>`;
 const RT=L.retell,T=L.texts[RT.t];
 h+=`<div class="card"><h3>Mức 2 · Kể lại bài khóa ${RT.t+1} (复述)</h3><p class="ctx">Nhìn chuỗi từ khóa, kể lại nội dung bằng lời của em. Không cần thuộc lòng nguyên văn.</p>
<ol class="h4steps">${RT.steps.map(s=>`<li><span class="zh">${s[0]}</span><small class="h4py">${s[1]}</small></li>`).join("")}</ol>${h4LongUI("rt")}
${H.rt.done?`<div class="h4fb"><div>Số chữ: <b>${hanN(H.rt.txt)}</b>${H.rt.sec?` · Thời gian nói: <b>${H.rt.sec} giây</b>`:""}</div><div>Từ khóa đã dùng: ${RT.kw.map(m=>`<span class="pill ${kwHas(H.rt.txt,m)?"ok":""}">${kwHas(H.rt.txt,m)?"✓":"○"} <span class="zh">${m[0]}</span></span>`).join("")}</div>
<p class="ctx">Dùng được từ 7/${RT.kw.length} từ khóa là kể khá đầy đủ.</p><details><summary>Đối chiếu với bài khóa ${RT.t+1}</summary><div class="zh">${T.l.map(y=>y[1]).join("")}</div></details></div>`:""}</div>`;
 if(L.tasks)return h+h4Tasks(L,r)+h4Next("ns");
 const K=L.talk;
 h+=`<div class="card"><h3>Mức 3 · Trình bày: <span class="zh">${K.title}</span></h3><p>${K.vi}</p><p><b>Dàn ý gợi ý:</b></p><ol class="h4steps">${K.out.map(s=>`<li><span class="zh">${s[0]}</span><small class="h4vi">${s[1]}</small></li>`).join("")}</ol>${h4LongUI("tk")}
${H.tk.done?`<div class="h4fb"><div>Số chữ: <b>${hanN(H.tk.txt)}</b>${H.tk.sec?` · Thời gian nói: <b>${H.tk.sec} giây</b>`:""} <small class="ctx">(nói khoảng 1 phút thường được 80–120 chữ)</small></div>
<div>Cấu trúc bắt buộc: ${K.req.map(q=>`<span class="pill ${grpOk(H.tk.txt,q.slice(1))?"ok":""}">${grpOk(H.tk.txt,q.slice(1))?"✓":"○"} <span class="zh">${q[0]}</span></span>`).join("")}</div>
<details open><summary>Bài nói mẫu</summary><div class="zh">${K.m[0]} ${bS(K.m[0])}</div><div class="py" style="display:block">${K.m[1]}</div><div class="ctx h4vi">${K.m[2]}</div></details>
<p class="ctx">📲 Muốn cô nghe và sửa phát âm: ghi âm bài nói trên điện thoại rồi gửi cô qua Zalo.</p></div>`:""}</div>`;
 return h+h4Next("ns")}
function h4LongUI(k){const o=H[k],on=H.recK===k,noSR=!SRC||srBlocked;
 return `<div class="row">${noSR?"":`<button class="btn" onclick="h4Long('${k}')">${on?"⏹ Dừng, nói xong rồi":"🎤 Bắt đầu nói"}</button>`}${on?`<span class="h4tm" id="h4tm-${k}">0 giây</span>`:""}</div>
<textarea class="tin h4ta" rows="5" id="h4ta-${k}" oninput="H.${k}.txt=this.value" placeholder="${noSR?"Gõ bài nói của em bằng chữ Hán…":"Bấm 🎤 để nói (máy tự ghi vào đây), hoặc gõ bằng chữ Hán…"}">${esc(o.txt||"")}</textarea>
<div class="row"><button class="btn sm" onclick="h4LongDone('${k}')">✅ Kiểm tra</button>${h4CopyBtn("h4ta-"+k)}</div>`}
function h4Long(k){if(H.rec){try{H.rec.stop()}catch(e){}return}let s;try{s=new SRC()}catch(e){srBlocked=true;rr();return}
 s.lang="zh-CN";s.continuous=true;s.interimResults=true;const base=H[k].txt?H[k].txt.replace(/\s+$/,"")+"\n":"";let fin="";H.rec=s;H.recK=k;H[k].done=false;H.t0=Date.now();
 s.onresult=e=>{let it="";for(let i=e.resultIndex;i<e.results.length;i++){const x=e.results[i];if(x.isFinal)fin+=x[0].transcript;else it+=x[0].transcript}H[k].txt=base+fin+it;const d=$("h4ta-"+k);if(d)d.value=H[k].txt};
 s.onerror=e=>{if(/not-allowed|service-not-allowed/.test(e.error))srBlocked=true};
 s.onend=()=>{clearInterval(H.tmI);H.rec=null;H.recK=null;H[k].sec=Math.round((Date.now()-H.t0)/1000);if(hanN(fin))h4LongDone(k);else{if(!srBlocked)ask("Máy chưa nghe thấy gì. Em bấm 🎤 nói lại, hoặc gõ vào khung nhé.",null,1);rr()}};
 try{s.start()}catch(e){H.rec=null;H.recK=null;srBlocked=true;rr();return}
 clearInterval(H.tmI);H.tmI=setInterval(()=>{const t=$("h4tm-"+k);if(t)t.textContent=Math.round((Date.now()-H.t0)/1000)+" giây"},500);rr()}
function h4LongDone(k){if(!hanN(H[k].txt))return ask("Khung còn trống. Em nói hoặc gõ bài bằng chữ Hán trước nhé.",null,1);H[k].done=true;h4Save(r=>{r[k=="rt"?"s2":"s3"]=1;if(/^tk\d/.test(k)){r.tks=r.tks||{};r.tks[k]=1}});rr()}
function h4Rp(k){if(H.rec){try{H.rec.stop()}catch(e){}return}const[ti,j]=k.split("-").map(Number),y=HL().texts[ti].l[j],tgt=h4Tgt(y[1]);
 H.recK=k;H.rpR[k]=srLiveHtml();rr();const end=()=>{H.rec=null;H.recK=null};
 srListen((t,a)=>{end();const m=sayPct(t,tgt,a),ok=m>=70;
  H.rpR[k]=`<div>Máy nghe được: <span class="zh hd">${sayHeard(t,tgt,a)}</span></div><div>So với mẫu: <span class="zh hd">${sayMark(tgt,t,a)}</span></div><div class="${ok?"okt":"bad"}">${ok?"✓ Tốt lắm!":"✗ Chưa đúng mẫu, thử lại nhé"} · giống câu mẫu ${m}%</div>`;h4RpMk(k,ok?1:0)},
 x=>{end();H.rpR[k]=x=="deny"?`<span class="bad">Trang chưa được phép dùng micro.</span>`:`<span class="bad">Chưa nghe thấy gì, bấm 🎤 Nói lại nhé.</span>`;rr()});H.rec=curRec}
function h4RpMk(k,v){h4Save(r=>{r.nk=r.nk||{};if(r.nk[k]!==1||v===1)r.nk[k]=v});h4RpScore();rr()}
function h4RpScore(){const L=HL(),need=h4RpNeed(L);h4Save(r=>{const nk=r.nk||{};if(need.every(k=>nk[k]!=null))r.ns=pct(need.filter(k=>nk[k]===1).length,need.length);else delete r.ns})}

/* ---------- 6. Viết ---------- */
function h4Vt(L,r){const P=L.para;if(H.para==null)H.para=r.vp||"";if(H.v1t==null)H.v1t=r.v1t||"";
 let h=`<div class="card note">Phần này luyện mục tiêu 2: <b>viết</b> về chuyên ngành và dự định nghề nghiệp. Máy kiểm tra từ, cấu trúc và đếm chữ; nội dung cô sẽ chữa khi em gửi bài. Làm xong bấm <b>📋 Sao chép bài</b> rồi dán vào Zalo gửi cô.</div>`;
 h+=`<div class="card"><h3>Dạng 1 · 看图，用词造句 Nhìn tranh, dùng từ cho sẵn đặt câu</h3><p class="ctx">Mỗi tranh đặt một câu có từ cho sẵn, <b>viết tất cả vào một khung, mỗi câu một dòng</b>. Tranh tạm minh họa bằng biểu tượng; sẽ thay bằng tranh trong sách.</p>
<div class="h4pics">${L.v1.map((it,i)=>`<div class="h4pic"><div class="ic">${it.ic}</div><b>(${i+1}) <span class="zh hd">${it.w}</span></b><small class="h4py">${it.py}</small><small class="ctx">${it.sc}</small></div>`).join("")}</div>
<textarea class="tin h4ta" rows="4" id="h4ta-v1" oninput="H.v1t=this.value" placeholder="(1) ……&#10;(2) ……&#10;(3) ……">${esc(H.v1t)}</textarea>
<div class="row"><button class="btn sm" onclick="h4V1()">✅ Kiểm tra</button>${h4CopyBtn("h4ta-v1")}</div>
${H.v1D?`<div class="h4fb"><div>Từ đã dùng: ${L.v1.map(it=>{const ok=kwHas(H.v1t,[it.w,gN(it.py)]);return `<span class="pill ${ok?"ok":""}">${ok?"✓":"○"} <span class="zh">${it.w}</span></span>`}).join("")}</div><div class="ans"><b>Câu tham khảo:</b>${L.v1.map((it,i)=>`<div><b>(${i+1})</b> ${it.r.map(x=>`<span class="zh">${x}</span> ${bS(x)}`).join(" · ")}</div>`).join("")}</div></div>`:""}</div>`;
 h+=`<div class="card"><h3>Dạng 2 · ${P.max?"":"Viết đoạn văn: "}<span class="zh">${P.title}</span></h3><p>${P.vi}</p>${P.ctx?`<p class="ctx">${P.ctx}</p>`:""}
<textarea class="tin h4ta" rows="7" id="h4ta-p" oninput="H.para=this.value;h4PL()" placeholder="Viết bằng chữ Hán…">${esc(H.para)}</textarea>
<div id="h4pl">${h4PLh()}</div>
<p><b>Tự kiểm tra trước khi nộp:</b></p>${P.self.map((s,i)=>`<label class="h4chk"><input type="checkbox" ${H.self[i]?"checked":""} onchange="H.self[${i}]=this.checked"> ${s}</label>`).join("")}
<div class="row"><button class="btn" onclick="h4ParaSub()">Nộp bài</button>${h4CopyBtn("h4ta-p")}</div>
${H.paraD||r.vp?`<div class="h4fb">${r.vp?`<div class="okt">✓ Đã lưu bài trên máy này (${hanN(r.vp)} chữ).</div>`:""}<p>📲 Bấm <b>📋 Sao chép bài</b> rồi dán vào Zalo gửi cô để cô chữa nội dung và cách dùng từ.</p>
<details><summary>Bài tham khảo</summary><div class="zh">${P.m[0]} ${bS(P.m[0])}</div><div class="ctx h4vi">${P.m[1]}</div></details></div>`:""}</div>`;
 h+=r.vt!=null?`<p>Điểm phần viết: <b>${r.vt}%</b> <small class="ctx">(dạng 1 dùng đủ 3 từ: 60%; dạng 2 đủ ${P.min} chữ và đủ 2 cấu trúc đầu: 40%)</small></p>`:`<p class="ctx">Kiểm tra dạng 1 và nộp đoạn văn để tính điểm.</p>`;
 return h+h4Next("vt")}
function h4PLh(){const P=HL().para,c=hanN(H.para);return `<div>Số chữ Hán: <b class="${c>=P.min?"okt":""}">${c}</b> / ${P.min}–${P.max||100}</div><div>${P.req.map(q=>`<span class="pill ${grpOk(H.para,q.slice(1))?"ok":""}">${grpOk(H.para,q.slice(1))?"✓":"○"} <span class="zh">${q[0]}</span></span>`).join("")}</div>`}
function h4PL(){const d=$("h4pl");if(d)d.innerHTML=h4PLh()}
function h4V1(){const L=HL();if(!gN(H.v1t))return ask("Em hãy viết câu vào khung trước khi kiểm tra.",null,1);H.v1D=true;
 h4Save(r=>{r.v1t=H.v1t;r.v1={};L.v1.forEach((it,i)=>r.v1[i]=kwHas(H.v1t,[it.w,gN(it.py)])?1:0);h4VtScore(r)});rr()}
function h4ParaSub(){const P=HL().para,c=hanN(H.para);if(c<20)return ask("Đoạn văn còn quá ngắn. Em viết thêm nhé.",null,1);
 const go=()=>{H.paraD=true;h4Save(r=>{r.vp=H.para;h4VtScore(r)});rr()};c<P.min?ask(`Đoạn văn mới có ${c} chữ, yêu cầu từ ${P.min} chữ. Vẫn nộp?`,go):go()}
function h4VtScore(r){const L=HL(),P=L.para,v1=r.v1||{};if(Object.keys(v1).length<L.v1.length||!r.vp)return;
 const main=P.req.slice(0,2).every(q=>grpOk(r.vp,q.slice(1)));r.vt=Math.round(Object.values(v1).filter(x=>x===1).length/L.v1.length*60+(hanN(r.vp)>=P.min&&main?40:hanN(r.vp)>=P.min||main?20:0))}

/* ---------- 7. Tổng kết theo mục tiêu ---------- */
function h4Sum(L,r){const bq=r.bq||{},nd=r.nd||{};
 const bqP=ts=>{const ks=ts.flatMap(i=>L.texts[i].q.map((q,j)=>[i+"-"+j,q.a]));return ks.every(k=>bq[k[0]]!=null)?pct(ks.filter(k=>bq[k[0]]===k[1]).length,ks.length):null};
 const ndP=(p,n)=>{const ks=Array.from({length:n},(_,i)=>p+"-"+i);return ks.every(k=>nd[k]!=null)?pct(ks.filter(k=>nd[k]===1).length,n):null};
 const G=[
  [["Nghe bài khóa 1, 2 (câu hỏi sách)",bqP([0,1]),"bk"],["Nghe điền từ",ndP("n1",L.n1.length),"nd"],["Đóng vai bài khóa 1, 2",r.ns,"ns"]],
  [["Ngữ pháp (sắp xếp + dịch câu)",r.gp,"gp"],[L.tasks?"Task nói (Nói mức 3)":"Trình bày 1 phút (Nói mức 3)",r.s3?100:null,"ns"],["Viết câu + đoạn văn",r.vt,"vt"]],
  [["Nghe, đọc bài khóa 3, 4 (câu hỏi sách)",bqP([2,3]),"bk"],["选词填空",ndP("d1",L.d1.q.length),"nd"],["Hoàn thành đoạn văn",ndP("d2",L.d2.a.length),"nd"]]];
 const bar=(lb,v,t)=>`<div class="bar"><span>${lb}</span><div class="tr"><i style="width:${v||0}%" class="${v>=80?"ok":"no"}"></i></div><b>${v==null?"chưa làm":v+"%"}</b>${v==null||v<80?`<button class="btn o sm" onclick="h4t('${t}')">${v==null?"Làm":"Ôn lại"}</button>`:"<span>✓</span>"}</div>`;
 let h=`<div class="card note">Tổng kết theo <b>mục tiêu bài học</b>: mỗi mục tiêu đạt khi các phần liên quan đều từ 80% trở lên.</div>`;
 h+=G.map((g,i)=>{const vs=g.map(x=>x[1]),miss=vs.some(v=>v==null),av=vs.filter(v=>v!=null),a=av.length?Math.round(av.reduce((s,v)=>s+v,0)/av.length):null,ok=!miss&&vs.every(v=>v>=80);
  return `<div class="card h4g ${ok?"ok":""}"><div class="h4gh"><span class="h4gn">${ok?"✓":i+1}</span><div><b>Mục tiêu ${i+1}</b><div class="zh">${L.goals[i].zh}</div><small class="h4vi">${L.goals[i].vi}</small></div><div class="h4gp ${ok?"okt":""}">${a==null?"—":a+"%"}</div></div>
${g.map(x=>bar(x[0],x[1],x[2])).join("")}<p class="${ok?"okt":"ctx"}">${ok?"🎉 Đã đạt mục tiêu này.":miss?"Còn phần chưa làm, làm xong để biết đã đạt chưa.":"Chưa đạt: ôn lại các phần dưới 80%."}</p></div>`}).join("");
 h+=`<div class="card"><b>Điểm theo từng tab</b>${Object.keys(H4N).map(k=>bar(H4N[k],r[k],Object.keys(H4K).find(t=>H4K[t]==k))).join("")}</div>`;
 return h}

/* ---------- Gắn vào trang chung (không sửa app.js) ---------- */
const _h4LessonView=lessonView;lessonView=function(){return olLv>=4?h4View():_h4LessonView()};
const _h4OpenL=openL;openL=function(n){if(olLv>=4){if(H.rec)try{H.rec.stop()}catch(e){}cur=n;h4Reset()}_h4OpenL(n)};
const _h4CloseL=closeL;closeL=function(){if(H.rec)try{H.rec.stop()}catch(e){}_h4CloseL()};
lvBar=function(){return `<div class="row">${[1,2,3,4].concat(LDS[5]?[5]:[]).map(l=>`<button class="btn ${l==olLv?"":"o"}" onclick="setLv(${l})">${lvN(l)}</button>`).join("")}</div>`};
crumbDraw=function(){const s=SUBS.find(x=>x[0]==SUBC),c=$("crumb");if(!c)return;
 const inL=SUBC=="ol"&&cur,inT=SUBC=="ts"&&tcur;
 c.innerHTML=`<a onclick="go('home')">Trang chủ</a> › <a onclick="goSub('ol')">Học tiếng Trung</a> › `+(inL?`<a onclick="closeL()">${s[1]}</a> › ${lvN(olLv)} · Bài ${cur}`:inT?`${s[1]} › ${lvN(olLv)} · Bài ${tcur}`:s[1]);
 $("lh2").textContent=s[1]};
const _h4DrawOl=drawOl;drawOl=function(){if(olLv<4||cur)return _h4DrawOl();
 $("lp-ol").innerHTML=lvBar()+(olLv==5?`<div class="card note"><b>Mở rộng H4</b> · Dùng lại từ vựng và ngữ pháp trọng tâm của HSK 4 theo <b>chủ đề đời sống</b> (nhận nhà, khu dân cư, phòng tập, sinh hoạt ngoài giờ), kèm các <b>task thực tế</b> để nói và viết.</div>`:"")+`<div class="card"><b>${lvN(olLv)} · Trung cấp — mỗi bài gồm 7 phần:</b><br>${H4T.map(t=>`<span class="pill">${t[1]}</span>`).join("")}<p>Khác với HSK 1–2: nghe trước rồi mới xem chữ, phiên âm ẩn mặc định, có thêm phần đọc hiểu, nói tự do và viết đoạn văn. Tổng kết theo mục tiêu bài học.</p><small style="color:var(--sub)">Tiến độ lưu trên máy này.</small></div>`+lessons("ol")};
const _h4DrawTs=drawTs;drawTs=function(){if(olLv<4)return _h4DrawTs();if(tcur){tcur=null}
 $("lp-ts").innerHTML=lvBar()+`<div class="card"><b>Bài test nhanh ${lvN(olLv)}</b><p>Sẽ làm theo dạng đề HSK 4 (nghe, đọc, viết) sau khi cô duyệt 7 phần của Bài 1. Hiện em làm phần ôn luyện tại mục <a href="#" onclick="goSub('ol');return false">Ôn luyện theo bài</a>.</p></div>`};

/* ---------- Mức 3 dạng task (Mở rộng H4) ---------- */
function h4Tasks(L,r){const ti=H.tki||0,T=L.tasks[ti],k="tk"+ti;if(!H[k])H[k]={txt:"",done:false,sec:0};const o=H[k],ts=r.tks||{};
 return `<div class="card"><h3>Mức 3 · Task thực tế</h3><p class="ctx">Chọn một task. Làm với bạn hoặc cô trong lớp, rồi nói (máy ghi vào khung) hoặc gõ kịch bản của em vào khung. Máy kiểm tra các cấu trúc bắt buộc; nội dung cô sẽ góp ý khi em gửi bài.</p>
<div class="row">${L.tasks.map((t,i)=>`<button class="btn sm ${i==ti?"":"o"}" onclick="if(H.rec)try{H.rec.stop()}catch(e){};H.tki=${i};rr()">${ts["tk"+i]?"✓ ":""}${t.n} · ${t.zh}</button>`).join("")}</div>
<div class="h4task"><b>${T.n} · <span class="zh">${T.zh}</span> — ${T.title}</b><p>${T.ctx}</p>
<p><b>Vai trò:</b></p><ul>${T.roles.map(x=>`<li>${x}</li>`).join("")}</ul>
<p><b>Sản phẩm đầu ra:</b></p><ul>${T.out.map(x=>`<li>${x}</li>`).join("")}</ul>
<p><b>Mẫu câu bắt buộc áp dụng</b> (chạm để nghe):</p>${T.ex.map(e=>`<div class="bub ref" onclick="spk(${S(e[0])})" style="cursor:pointer"><div class="hz">${e[0]} 🔊</div><div class="py" style="display:block">${e[1]}</div><div class="vi" style="display:block">${e[2]}</div></div>`).join("")}</div>
${h4LongUI(k)}
${o.done?`<div class="h4fb"><div>Số chữ: <b>${hanN(o.txt)}</b>${o.sec?` · Thời gian nói: <b>${o.sec} giây</b>`:""}</div>
<div>Cấu trúc bắt buộc: ${T.req.map(q=>`<span class="pill ${grpOk(o.txt,q.slice(1))?"ok":""}">${grpOk(o.txt,q.slice(1))?"✓":"○"} <span class="zh">${q[0]}</span></span>`).join("")}</div>
<details><summary>Bài mẫu gợi ý</summary><div class="zh" style="white-space:pre-line">${T.m[0]}</div> ${bS(T.m[0].replace(/\n/g,""))}<div class="ctx h4vi">${T.m[1]}</div></details>
<p class="ctx">📲 Bấm <b>📋 Sao chép bài</b> rồi dán vào Zalo gửi cô; muốn cô sửa phát âm thì gửi kèm ghi âm.</p></div>`:""}</div>`}

/* ---------- Phiên âm tự thêm (30/10/2026) ----------
   Chữ Hán trong bài (câu hỏi, đáp án, ngữ cảnh, câu nghe, thẻ sắp xếp, lời đóng vai…) chưa có pinyin
   thì tra bảng APY (khai ở cuối file bài: var APY=Object.assign(window.APY||{},{"chữ Hán":"pinyin"})) và gắn
   <small class="h4py apy"> ngay sau. Bật/tắt chung bằng thanh "Hiển thị: Pinyin". Câu chưa có trong APY thì để nguyên. */
const APYC=/(^|\s)(py|h4py|opy|tpy|apy)(\s|$)/;
const apyKey=e=>{const c=e.cloneNode(true);c.querySelectorAll("select").forEach(s=>s.replaceWith("____"));c.querySelectorAll("button,small,.py,.h4py,.opy,.apy").forEach(s=>s.remove());
 return c.textContent.replace(/🔊/g,"").replace(/[ \t ]+/g,"").replace(/\n+/g,"\n").trim()};
const apyHas=e=>{const p=e.parentElement;if(p&&p.classList.contains("zp"))return true;
 for(const s of [e.previousElementSibling,e.nextElementSibling])if(s&&APYC.test(s.className))return true;return !!e.querySelector(".py,.h4py,.opy,.apy")};
function h4Apy(){const b=$("lbody");if(!b||!b.classList.contains("h4"))return;const A=window.APY||{},M=window.APYMISS;
 b.querySelectorAll(".zh,.hz,button.tok").forEach(e=>{if(e.closest(".h4fc,.chips,.h4m,.h4pics,select,textarea,.apy"))return;
  const k=apyKey(e);if(!/[一-鿿]/.test(k)||/[A-Za-zÀ-ỹ]/.test(k)||apyHas(e))return;
  const p=A[k];if(!p){if(M)M.add(k);return}
  const s=document.createElement("small"),blk=e.tagName!="SPAN"||k.length>5;s.className="h4py apy"+(blk?" apyb":"");s.textContent=p;
  if(e.tagName=="SPAN")e.after(s);else e.appendChild(s)})}
{const _rrA=rr;rr=function(){const v=_rrA.apply(this,arguments);try{h4Apy()}catch(e){}return v}}
