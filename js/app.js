const LDS={1:LD1,2:LD2},LTS={1:LT1,2:LT2};let LD=LD1;
const GXIMG={"h2b1a":"img/gx/h2b1a.webp","h2b1b":"img/gx/h2b1b.webp","h2b2a":"img/gx/h2b2a.webp","h2b2b":"img/gx/h2b2b.webp","h2b3a":"img/gx/h2b3a.webp","h2b3b":"img/gx/h2b3b.webp","h2b4a":"img/gx/h2b4a.webp","h2b4b":"img/gx/h2b4b.webp","h2b5a":"img/gx/h2b5a.webp","h2b5b":"img/gx/h2b5b.webp","h2b6a":"img/gx/h2b6a.webp","h2b6b":"img/gx/h2b6b.webp","h2b7a":"img/gx/h2b7a.webp","h2b7b":"img/gx/h2b7b.webp","h2b8a":"img/gx/h2b8a.webp","h2b8b":"img/gx/h2b8b.webp","h2b9a":"img/gx/h2b9a.webp","h2b9b":"img/gx/h2b9b.webp","h2b10a":"img/gx/h2b10a.webp","h2b10b":"img/gx/h2b10b.webp","h2b11a":"img/gx/h2b11a.webp","h2b11b":"img/gx/h2b11b.webp"};

/* --- trạng thái & chấm --- */
let GX=null;
const gN=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/v/g,"u").replace(/[^a-z0-9一-鿿]/g,"");
const gH=s=>gN(s).replace(/儿/g,"");
const hasHan=s=>/[一-鿿]/.test(s||"");
const gxKey=()=>olLv+"-"+cur;
function gxInit(){const d=GXD[gxKey()];GX={k:gxKey(),so:d.so.map(it=>{let p;for(let k=0;k<12;k++){p=shuf(it.t.map((_,i)=>i));if(!it.ok.map(gH).includes(gH(p.map(i=>it.t[i].split("|")[0]).join(""))))break}return{pool:p,ch:[],st:null,first:null,show:false}}),tr:d.tr.map(()=>({v:"",st:null})),pc:d.pc.map(()=>({v:"",done:false}))}}
function gxTok(t,act){const[h,p]=t.split("|");return `<button class="tok" ${act}><span class="zh">${h}</span><small class="tpy">${p}</small></button>`}
function gxMv(k,from,i){const s=GX.so[k];if(s.st===true)return;s.st=null;if(from=="p")s.ch.push(s.pool.splice(i,1)[0]);else s.pool.push(s.ch.splice(i,1)[0]);rr()}
function gxSoCheck(k){const d=GXD[GX.k].so[k],s=GX.so[k];if(s.pool.length)return ask("Em hãy dùng hết các từ trước khi kiểm tra.",null,1);
 const a=gH(s.ch.map(i=>d.t[i].split("|")[0]).join(""));s.st=d.ok.map(gH).includes(a);if(s.first==null)s.first=s.st;gxSave();rr()}
function gxSoReset(k){const s=GX.so[k];s.pool=s.pool.concat(s.ch);s.ch=[];s.st=null;rr()}
function gxMatch(v,list,py){const x=gH(v);if(!x)return false;return list.some(a=>gH(a)===x)||(!!py&&gN(py)===gN(v))}
function gxTrCheck(k){const d=GXD[GX.k].tr[k],t=GX.tr[k];if(!gN(t.v))return ask("Em hãy nhập câu trả lời trước khi kiểm tra.",null,1);
 t.st=gxMatch(t.v,d.a.concat([d.r[0]]),d.r[1])?"ok":"self";gxSave();rr()}
function gxTrSelf(k,ok){GX.tr[k].st=ok?"sok":"sno";gxSave();rr()}
function gxPcSub(k){const t=GX.pc[k];if(!gN(t.v))return ask("Em hãy viết câu trả lời trước khi nộp.",null,1);t.done=true;rr()}
function gxSave(){const done=GX.so.every(s=>s.first!=null)&&GX.tr.every(t=>t.st&&t.st!="self");if(!done)return;
 const ok=GX.so.filter(s=>s.first).length+GX.tr.filter(t=>t.st=="ok"||t.st=="sok").length,n=GX.so.length+GX.tr.length;const r=ldN(cur);r.gp=Math.round(ok/n*100);svN(cur,r)}
function hasKw(v,m){const[h,py]=m;if(hasHan(v))return v.includes(h);const sq=gN(v);if(py.length>3)return sq.includes(py);
 const toks=String(v).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/v/g,"u").split(/[^a-z]+/).filter(Boolean);return toks.some(t=>t===py||t.startsWith(py)||t.endsWith(py))}
function gxPcFb(d,v){const han=hasHan(v),exact=d.r.some(r=>gH(r[0])===gH(v)||gN(r[1])===gN(v));
 let h=`<div class="ctx">Máy nhận diện: em nhập bằng <b>${han?"chữ Hán":"pinyin không dấu"}</b>.</div>`;
 if(exact)h+=`<div class="okt">✓ Câu của em khớp với câu tham khảo. Rất tốt!</div>`;
 else{h+=d.kw.map(g=>g.m.some(m=>hasKw(v,m))?`<div class="okt">✓ Em đã dùng ${g.l}.</div>`:`<div>💡 Gợi ý: thử dùng <b>${g.l}</b> trong câu.</div>`).join("");
  h+=`<div class="ctx">Câu mở có nhiều cách nói đúng, máy chỉ kiểm tra điểm ngữ pháp chính. Em đối chiếu với câu tham khảo bên dưới.</div>`}
 return h+`<div class="ans"><b>Câu tham khảo:</b>${d.r.map(r=>`<div class="bub ref"><div class="py">${r[1]}</div><div class="hz">${r[0]} ${bS(r[0])}</div><div class="vi">${r[2]}</div></div>`).join("")}</div>`}
function gxHtml(L){if(!GX||GX.k!=gxKey())gxInit();const d=GXD[GX.k];let h="";
 h+=`<div class="card note"><b>Dạng 1 · Sắp xếp từ thành câu</b><br>Chạm vào các từ theo đúng thứ tự để tạo thành câu hoàn chỉnh. Chạm vào từ đã chọn để bỏ ra.</div>`;
 h+=d.so.map((it,k)=>{const s=GX.so[k],ok=s.st===true,bad=s.st===false;
  return `<div class="card q ${ok?"ok":bad?"no":""}"><b>Câu ${k+1}.</b><div class="slots">${s.ch.map((i,j)=>gxTok(it.t[i],ok?"disabled":`onclick="gxMv(${k},'c',${j})"`)).join("")}</div><div class="bank">${s.pool.map((i,j)=>gxTok(it.t[i],`onclick="gxMv(${k},'p',${j})"`)).join("")}</div>
${ok?`<div class="okt">✓ Đúng rồi!</div><div class="zh hd">${it.f}</div><div class="py" style="color:var(--m)">${it.p}</div>`:bad?`<div class="bad">✗ Chưa đúng. ${it.e}</div>`:""}
<div class="row">${ok?"":`<button class="btn sm" onclick="gxSoCheck(${k})">Kiểm tra</button>`}${bad?`<button class="btn o sm" onclick="gxSoReset(${k})">↻ Làm lại câu này</button><button class="btn o sm" onclick="GX.so[${k}].show=!GX.so[${k}].show;rr()">${s.show?"Ẩn":"Xem"} đáp án</button>`:""}</div>
${bad&&s.show?`<div class="ans"><span class="zh hd">${it.f}</span><br><span class="py">${it.p}</span></div>`:""}</div>`}).join("");
 h+=`<div class="card note"><b>Dạng 2 · Dịch Việt → Trung</b><br>Gõ câu tiếng Trung bằng <b>chữ Hán</b> (hoặc pinyin không dấu, ví dụ: <i>women haishi dache qu ba</i>). Không cần gõ dấu câu.</div>`;
 h+=d.tr.map((it,k)=>{const t=GX.tr[k],st=t.st;
  return `<div class="card dt ${st=="ok"||st=="sok"?"ok":st=="sno"?"no":""}"><b>${k+1}.</b> ${it.vi}<input value="${esc(t.v)}" oninput="GX.tr[${k}].v=this.value" placeholder="Nhập câu tiếng Trung" autocomplete="off" autocapitalize="off" ${st&&st!="self"?"disabled":""}>
${st=="ok"?`<div class="okt">✓ Đúng rồi!</div>`:""}
${st=="self"?`<div class="ans">Câu của em chưa khớp với các đáp án mẫu. Có thể em vẫn đúng nhưng dùng cách nói khác, máy không chấm chắc chắn được. Em tự đối chiếu nhé:</div>`:""}
${st?`<div class="ans"><b>Đáp án tham khảo:</b> <span class="zh hd">${it.r[0]}</span> ${bS(it.r[0])}<br><span class="py" style="color:var(--m)">${it.r[1]}</span></div>`:""}
${st=="self"?`<div class="row"><button class="btn sm" onclick="gxTrSelf(${k},1)">✓ Câu em đúng ý</button><button class="btn o sm" onclick="gxTrSelf(${k},0)">✗ Câu em chưa đúng</button></div>`:""}
${st=="sok"?`<div class="okt">✓ Em tự xác nhận câu đúng ý.</div>`:st=="sno"?`<div class="bad">Ghi nhận: cần xem lại câu này.</div>`:""}
<div class="row">${!st?`<button class="btn sm" onclick="gxTrCheck(${k})">Kiểm tra</button>`:st=="self"?`<button class="btn o sm" onclick="gxTrCheck(${k})">Kiểm tra lại</button>`:`<button class="btn o sm" onclick="GX.tr[${k}].st=null;GX.tr[${k}].v='';rr()">↻ Làm lại</button>`}</div></div>`}).join("");
 h+=`<div class="card note"><b>Dạng 3 · Miêu tả tranh và xử lý tình huống</b><br>Xem tranh, đọc yêu cầu rồi viết câu tiếng Trung bằng <b>chữ Hán</b> hoặc <b>pinyin không dấu</b> (ví dụ: <i>wo rang ta zai jia xuexi</i>). Câu tham khảo hiện sau khi nộp.</div>`;
 h+=d.pc.map((it,k)=>{const t=GX.pc[k],src=it.img&&(GXIMG[it.img]||"img/gx/"+it.img+".webp");
  return `<div class="card"><b>Tranh ${k+1}.</b><div class="gxpic">${src?`<img src="${src}" alt="Tranh ${k+1} trong giáo trình">`:`<div class="gxph">🖼️<br>Khung ảnh trống<br><small>${it.ph||"Cô chèn ảnh vào đây"}</small></div>`}</div>
<p class="goal">${it.req}</p><textarea class="tin" rows="2" oninput="GX.pc[${k}].v=this.value" placeholder="Viết câu tiếng Trung (chữ Hán hoặc pinyin không dấu)" autocomplete="off" autocapitalize="off" ${t.done?"disabled":""}>${esc(t.v)}</textarea>
${t.done?gxPcFb(it,t.v)+`<div class="row"><button class="btn o sm" onclick="GX.pc[${k}].done=false;rr()">✎ Sửa câu trả lời</button></div>`:`<div class="row"><button class="btn sm" onclick="gxPcSub(${k})">Nộp câu trả lời</button></div>`}</div>`}).join("");
 const nS=GX.so.filter(s=>s.first!=null).length,nT=GX.tr.filter(t=>t.st&&t.st!="self").length,tot=GX.so.length+GX.tr.length;
 if(nS+nT==tot){const ok=GX.so.filter(s=>s.first).length+GX.tr.filter(t=>t.st=="ok"||t.st=="sok").length,pct=Math.round(ok/tot*100);
  h+=`<div class="card res"><div class="big ${pct>=80?"ok":"no"}">${pct}%</div><p style="text-align:center">Dạng 1 + 2: ${ok}/${tot} câu đúng (dạng 1 tính lần kiểm tra đầu tiên). Dạng 3 là bài mở, không tính điểm.</p><div class="row c"><button class="btn o" onclick="GX=null;rr()">↻ Làm lại toàn bộ</button>${nextBtn("gp")}</div></div>`}
 else h+=`<p class="ctx">Đã làm ${nS+nT}/${tot} câu tính điểm (dạng 1 và 2).</p>`;
 return h}


/* ===== Lưu tiến độ (trên máy này) ===== */
const ldN=n=>{try{const o=JSON.parse(localStorage.getItem("ct_hsk"+olLv+"_b"+n)||"{}");if(o.nsk){delete o.nsk;delete o.ns}return o}catch(e){return {}}};
const svN=(n,o)=>{try{localStorage.setItem("ct_hsk"+olLv+"_b"+n,JSON.stringify(o))}catch(e){}};
/* ===== Âm thanh ===== */
let zhVs=[],zhV=null,VPREF="",VRATE=.85,vOpen=false;try{VPREF=localStorage.getItem("ct_voice")||"";VRATE=+localStorage.getItem("ct_rate")||.85}catch(e){}
/* Xếp hạng giọng: ưu tiên giọng nữ tự nhiên (neural) tiếng Phổ thông */
const vScore=v=>{const n=v.name;let s=0;
 if(/zh[-_]?(CN|Hans)|cmn/i.test(v.lang))s+=20;else if(/HK|yue/i.test(v.lang))s-=80;else if(/TW/i.test(v.lang))s-=8;
 if(/Natural|Online|Neural/i.test(n))s+=50;if(/Premium|Enhanced|增强|高级|优化/i.test(n))s+=40;if(/Google/i.test(n))s+=30;
 if(/Xiaoxiao|Xiaoyi|Xiaohan|Xiaomo|Xiaoxuan|Xiaoyan|Xiaorui|Xiaoshuang|Tingting|Ting-Ting|Lili|Lilian|Yaoyao|Huihui|Meijia|Yu-shu|Shanshan|婷婷|晓晓|晓伊|瑶瑶|慧慧|美佳/i.test(n))s+=15;
 if(/Kangkang|Yunxi|Yunjian|Yunyang|Yunze|Yunfeng|Yunhao|Yunxia|Li-mu|Liang|云/i.test(n))s-=35;return s};
const vMale=v=>/Kangkang|Yunxi|Yunjian|Yunyang|Yunze|Yunfeng|Yunhao|Yunxia|Li-mu|Liang|云/i.test(v.name);
const vLab=v=>v.name.replace(/^Microsoft\s+/,"").replace(/\s*-\s*Chinese.*$/i,"").replace(/\(Natural\)/i,"")+(/HK|yue/i.test(v.lang)?" (Quảng Đông)":vMale(v)?" (nam)":"")+(vScore(v)>=50?" ★ tự nhiên":"");
function voices(){try{zhVs=speechSynthesis.getVoices().filter(v=>/^(zh|cmn)/i.test(v.lang)).sort((a,b)=>vScore(b)-vScore(a));zhV=zhVs.find(v=>v.name==VPREF)||zhVs[0]||null}catch(e){}}
try{voices();speechSynthesis.onvoiceschanged=()=>{const n=zhVs.length;voices();if(zhVs.length!=n&&(cur||tcur)&&vOpen)rr()}}catch(e){}
function setV(n){VPREF=n;try{localStorage.setItem("ct_voice",n)}catch(e){}voices();say("你好，我叫王一雪。很高兴认识你。")}
function setR(r){VRATE=+r;try{localStorage.setItem("ct_rate",r)}catch(e){}say("你好，我叫王一雪。很高兴认识你。")}
function vTog(){vOpen=!vOpen;const p=$("vpanel");if(p)p.hidden=!vOpen}
const vBtn=()=>`<button class="vbtn" onclick="vTog()">🔊 Giọng đọc</button>`;
function vBar(){voices();return `<div class="card vset" id="vpanel" ${vOpen?"":"hidden"}><div style="display:flex;justify-content:space-between;align-items:center"><b>🔊 Giọng đọc · tốc độ</b><button class="btn o sm" onclick="vTog()">Đóng</button></div><div class="row">
<select class="tin" style="flex:2;min-width:180px" onchange="setV(this.value)">${zhVs.length?zhVs.map(v=>`<option value="${esc(v.name)}" ${zhV&&v.name==zhV.name?"selected":""}>${esc(vLab(v))}</option>`).join(""):`<option>Giọng mặc định của máy</option>`}</select>
<select class="tin" style="flex:1;min-width:110px" onchange="setR(this.value)">${[[.7,"Chậm"],[.85,"Vừa"],[1,"Bình thường"]].map(o=>`<option value="${o[0]}" ${Math.abs(VRATE-o[0])<.01?"selected":""}>${o[1]}</option>`).join("")}</select>
<button class="btn o sm" onclick="say('你好，我叫王一雪。很高兴认识你。')">▶ Nghe thử</button></div>
<small class="ctx">Giọng đọc lấy từ máy của em. Giọng có ★ nghe tự nhiên nhất. Máy tính: mở trang bằng <b>Microsoft Edge</b> (giọng Xiaoxiao) hoặc <b>Google Chrome</b> (giọng Google). iPhone/iPad: vào Cài đặt › Trợ năng › Nội dung được đọc › Giọng nói › Tiếng Trung, tải giọng <b>Tingting (Nâng cao)</b>.</small></div>`}
let SPK=[];const S=t=>(SPK.push(t),SPK.length-1);
function say(t){const k=typeof t=="object"?t.k:null,x=typeof t=="object"?t.t:t;
 if(k&&AUD[k]){try{new Audio(AUD[k]).play();return}catch(e){}}
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(x);u.lang=zhV?zhV.lang:"zh-CN";u.rate=VRATE;u.pitch=.95;if(zhV)u.voice=zhV;speechSynthesis.speak(u)}catch(e){ask("Trình duyệt này chưa hỗ trợ đọc tiếng Trung.",null,1)}}
function spk(n){plStop();say(SPK[n])}
/* ===== Trình phát "Nghe cả bài": đọc lần lượt từng câu, tạm dừng / nghe tiếp / dừng ===== */
let PL=null,PLT=0;
const plSrc=i=>{const L=LD[cur];if(i==="r")return{a:L.rhyme.a,l:L.rhyme.l.map(y=>y[0])};const x=L.texts[i];return{a:x.a,l:x.l.map(y=>y[1])}};
function pbHtml(i){const on=PL&&PL.i===i,st=on?PL.st:null,n=plSrc(i).l.length;
 return `${st=="play"?`<button class="btn sm" onclick="plPause()">⏸ Tạm dừng</button>`:`<button class="btn sm" onclick="plPlay(${JSON.stringify(i).replace(/"/g,"'")})">▶ ${st=="pause"?"Nghe tiếp":"Nghe cả bài"}</button>`}${on?`<button class="btn o sm" onclick="plStop()">⏹ Dừng</button><small class="ctx">${PL.aud?(st=="play"?"Đang phát…":"Đã tạm dừng"):`Câu ${Math.min(PL.j+1,n)}/${n}`}</small>`:""}`}
function plUI(){document.querySelectorAll(".bub.play").forEach(e=>e.classList.remove("play"));
 document.querySelectorAll(".pbar").forEach(e=>{const i=e.id=="pbr"?"r":+e.id.slice(2);e.innerHTML=pbHtml(i)});
 if(PL&&!PL.aud){const b=document.getElementById("bub"+PL.i+"-"+PL.j);if(b){b.classList.add("play");if(PL.st=="play")b.scrollIntoView({block:"nearest",behavior:"smooth"})}}}
function plPlay(i){if(PL&&PL.i===i&&PL.st=="pause"){PL.st="play";if(PL.aud){PL.aud.play();plUI()}else plNext();return}
 plStop();const src=plSrc(i);PL={i,j:0,st:"play"};
 if(src.a&&AUD[src.a]){try{const a=new Audio(AUD[src.a]);PL.aud=a;a.onended=()=>plStop();a.play();plUI();return}catch(e){PL.aud=null}}
 plNext()}
function plNext(){if(!PL||PL.st!="play")return;const l=plSrc(PL.i).l;if(PL.j>=l.length)return plStop();plUI();
 const tk=++PLT;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(l[PL.j]);u.lang=zhV?zhV.lang:"zh-CN";u.rate=VRATE;u.pitch=.95;if(zhV)u.voice=zhV;
  u.onend=()=>{if(tk!==PLT||!PL||PL.st!="play")return;PL.j++;setTimeout(()=>{if(tk===PLT)plNext()},450)};
  u.onerror=u.onend;PL.u=u;speechSynthesis.speak(u)}catch(e){plStop();ask("Trình duyệt này chưa hỗ trợ đọc tiếng Trung.",null,1)}}
function plPause(){if(!PL)return;PL.st="pause";PLT++;if(PL.aud)PL.aud.pause();else try{speechSynthesis.cancel()}catch(e){}plUI()}
function plStop(){if(!PL)return;PLT++;if(PL.aud){try{PL.aud.pause()}catch(e){}}else try{speechSynthesis.cancel()}catch(e){}PL=null;plUI()}

const bS=(t,l="🔊")=>`<button class="snd" onclick="event.stopPropagation();spk(${S(t)})">${l}</button>`;
const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const np=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z一-鿿]/g,"");
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
function simi(a,b){if(!b.length)return 0;const d=Array(a.length+1).fill(0).map(()=>Array(b.length+1).fill(0));for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=a[i-1]==b[j-1]?d[i-1][j-1]+1:Math.max(d[i-1][j],d[i][j-1]);return Math.round(d[a.length][b.length]/b.length*100)}

/* ===== Danh sách bài ===== */
let cur=null,tcur=null,ltab="bk",fcI=0,fcShow=false;
function rr(){plStop();SPK=[];drawOl();drawTs();crumbDraw()}
function setLv(l){olLv=l;LD=LDS[l]||{};cur=null;tcur=null;rr()}
function avgOf(r){const v=["fc","gp","dt","ns"].map(k=>r[k]).filter(x=>x!=null);return v.length?Math.round(v.reduce((a,b)=>a+b,0)/v.length):null}
function lessons(mode){return `<div class="lessons">${Array.from({length:LV[olLv]},(_,k)=>{const n=k+1,ok=!!LD[n],t=LTS[olLv]&&LTS[olLv][k]?LTS[olLv][k].split("|"):null,r=ok?ldN(n):{};
 const sc=mode=="ts"?r.test:avgOf(r);
 return `<div class="ls ${ok?"go":""}" ${ok?`onclick="${mode=="ts"?"openTest":"openL"}(${n})"`:""}><b>Bài ${n}</b>${t?`<span class="zh lt" title="${t[1]}">${t[0]}</span>`:""}<small>${ok?(sc!=null?`<i class="sc ${sc>=80?"ok":"no"}">${sc}%</i>`:(mode=="ts"?"Làm test →":"Vào học →")):"Sắp ra mắt"}</small></div>`}).join("")}</div>`}
function drawOl(){if(cur){$("lp-ol").innerHTML=lessonView();return}
 const cv=document.querySelectorAll("img.bk")[olLv-1];
 $("lp-ol").innerHTML=lvBar()+`<div class="bookrow">${cv?`<img class="bk" src="${cv.src}" alt="Bìa giáo trình New HSK ${olLv}">`:""}<div class="card"><b>Mỗi bài ôn gồm:</b><br>${PARTS.map((p,k)=>`<span class="pill">${k+1}. ${p}</span>`).join("")}<p>Cuối bài, hệ thống tổng kết kết quả. Phần nào dưới 80% sẽ được ghi rõ để ôn lại.</p><small style="color:var(--sub)">Tiến độ lưu trên máy này.</small></div></div>`+lessons("ol")}
function drawTs(){if(tcur){$("lp-ts").innerHTML=testView();return}
 $("lp-ts").innerHTML=lvBar()+`<div class="card"><b>Bài test nhanh HSK ${olLv} theo bài</b><p>Kiểm tra vận dụng: sắp xếp câu, nghe hiểu, nói theo tình huống. 15 điểm, đạt từ 12/15 (80%).</p></div>`+lessons("ts")}

/* ===== Trang bài học ===== */
const LTB0=[["bk","📖 Bài khóa"],["fc","🃏 Flashcard"],["gp","📐 Ngữ pháp · Mẫu câu"],["dt","🎧 Nghe chép"],["ns","🗣 Luyện nói"],["sum","📊 Tổng kết"]],LTABS=[];
/* Bài nào có warm (Khởi động) / act (Hoạt động trên lớp) thì tự thêm phần tương ứng */
function setTabs(L){LTABS.length=0;if(L&&L.warm)LTABS.push(["wu","🔥 Khởi động"]);LTB0.forEach(t=>{LTABS.push(t);if(t[0]=="ns"&&L&&L.act)LTABS.push(["hd","🎭 Hoạt động"])})}
setTabs(null);
function openL(n){cur=n;setTabs(LD[n]);ltab=LD[n]&&LD[n].warm?"wu":"bk";WU={};ACR={};ACS={};ACRL={};fcI=0;fcShow=false;DTV={};DTR={};DTD=false;NSR={};NSH={};NSM={};nsS=0;delete QS.gp;GX=null;rr();scrollTo(0,0)}
function closeL(){cur=null;rr()}
function lt(t){ltab=t;rr();const e=$("ltabs");if(e)e.scrollIntoView({block:"nearest"})}
function lessonView(){const L=LD[cur],r=ldN(cur);setTabs(L);if(!LTABS.some(t=>t[0]==ltab))ltab="bk";
 return `
<div class="lhead"><span class="no">${cur}</span><div><small>HSK ${olLv} · Bài ${cur}</small><div class="zh lt2">${L.t}</div><small>${L.tp}</small><div>${L.vi}</div></div>${vBtn()}</div>
${vBar()}<div class="stb" id="ltabs">${LTABS.map(t=>`<button class="${t[0]==ltab?"on":""}" onclick="lt('${t[0]}')">${t[1]}${r[t[0]]!=null?` <i class="sc ${r[t[0]]>=80?"ok":"no"}">${r[t[0]]}%</i>`:""}</button>`).join("")}</div>
${pvBar()}<div class="stack ${hidePy?"hidepy":""} ${hideVi?"hidevi":""}" id="lbody">${({wu:vWu,hd:vHd,bk:vBk,fc:vFc,gp:vGp,dt:vDt,ns:vNs,sum:vSum})[ltab](L,r)}</div>`}
const nextBtn=k=>{const i=LTABS.findIndex(t=>t[0]==k);return i<LTABS.length-1?`<button class="btn" onclick="lt('${LTABS[i+1][0]}')">Tiếp: ${LTABS[i+1][1]} →</button>`:""};

let hidePy=false,hideVi=false;try{hidePy=localStorage.getItem("ct_hpy")=="1";hideVi=localStorage.getItem("ct_hvi")=="1"}catch(e){}
function pvT(k){if(k=="p")hidePy=!hidePy;else hideVi=!hideVi;try{localStorage.setItem("ct_hpy",hidePy?"1":"0");localStorage.setItem("ct_hvi",hideVi?"1":"0")}catch(e){}rr()}
const pvBar=()=>`<div class="pvbar"><span>Hiển thị:</span><button class="tg ${hidePy?"":"on"}" onclick="pvT('p')" aria-pressed="${!hidePy}">${hidePy?"☐":"☑"} Pinyin</button><button class="tg ${hideVi?"":"on"}" onclick="pvT('v')" aria-pressed="${!hideVi}">${hideVi?"☐":"☑"} Tiếng Việt</button><small>áp dụng cho mọi phần của bài</small></div>`;
function vBk(L){const sp=x=>`<div class="who"><b>${x}</b>${SPN[x][1]}</div>`;
 return (L.warm?"":`<div class="card note"><b>🎯 Mục tiêu</b><ul>${L.goals.map(g=>`<li>${g}</li>`).join("")}</ul></div>`)+`
<div>`+L.texts.map((x,i)=>`<div class="card"><h3>课文 ${i+1} · Bài khóa ${i+1}</h3><p class="ctx">📍 ${x.ctx}</p><div class="pbar" id="pb${i}">${pbHtml(i)}</div>
${x.l.map((y,j)=>`<div class="dl">${sp(y[0])}<div class="bub" id="bub${i}-${j}" onclick="spk(${S(y[1])})"><div class="py">${y[2]}</div><div class="hz">${y[1]}</div><div class="vi">${y[3]}</div></div></div>`).join("")}
<details><summary>Từ mới bài khóa ${i+1}</summary><table class="wt">${L.words.filter(w=>w[4]==i&&!(i==0&&w[2]=="danh từ riêng")||(i==0&&w[2]=="danh từ riêng")).filter(w=>w[4]==i).map(w=>`<tr><td class="zh">${w[0]} ${bS(w[0])}</td><td class="py">${w[1]}</td><td class="vi">${w[2]?`<small>${w[2]}</small> `:""}${w[3]}</td></tr>`).join("")}</table></details></div>`).join("")+
(L.rhyme?`<div class="card"><h3>跟读绕口令 · Cùng đọc bài vè</h3><p class="ctx">${L.rhyme.n||"Luyện phân biệt 4 thanh điệu với âm “ma”."}</p><div class="pbar" id="pbr">${pbHtml("r")}</div>${L.rhyme.l.map((y,j)=>`<div class="bub" id="bubr-${j}" style="margin-top:8px"><div class="py">${y[1]}</div><div class="hz">${y[0]}</div><div class="vi">${y[2]}</div></div>`).join("")}</div>`:"")+`</div>
<p class="ctx">🎧 Hiện đang dùng giọng đọc máy của trình duyệt. File nghe giáo trình sẽ được gắn vào sau. Chạm vào từng câu để nghe riêng câu đó.</p>`+nextBtn("bk")}

function vFc(L,r){const w=L.words[fcI],k=r.fck||{},n=L.words.length,m=Object.values(k).filter(x=>x).length;
 return `<div class="fc" onclick="fcShow=!fcShow;rr()">${fcShow?`<div><div class="h">${w[0]}</div><div class="py">${w[1]}</div><b class="vi">${w[3]}</b>${w[2]?`<br><small class="vi">(${w[2]})</small>`:""}</div>`:`<div><div class="h">${w[0]}</div><small style="color:var(--sub)">Chạm để lật thẻ</small></div>`}</div>
<div class="row c">${bS(w[0],"🔊 Nghe")}<button class="btn o" onclick="fcNx(-1)">←</button><button class="btn" onclick="fcMk(1)">✓ Đã nhớ</button><button class="btn o" onclick="fcMk(0)">✗ Chưa nhớ</button><button class="btn o" onclick="fcNx(1)">→</button></div>
<p>Thẻ ${fcI+1}/${n} · Đã nhớ ${m}/${n}${r.fc==null?` · Đánh dấu đủ ${n} thẻ để tính điểm`:` · Điểm: <b>${r.fc}%</b>`}</p>
<div class="chips">${L.words.map((x,j)=>`<span class="chip ${k[j]===1?"ok":k[j]===0?"no":""} ${j==fcI?"cur":""}" onclick="fcI=${j};fcShow=false;rr()">${x[0]}</span>`).join("")}</div>
<div class="row"><button class="btn o sm" onclick="fcOnlyNo()">Chỉ ôn thẻ chưa nhớ</button></div>`+(r.fc!=null?nextBtn("fc"):"")}
function fcNx(d){const n=LD[cur].words.length;fcI=(fcI+d+n)%n;fcShow=false;rr()}
function fcMk(v){const r=ldN(cur),n=LD[cur].words.length;r.fck=r.fck||{};r.fck[fcI]=v;if(Object.keys(r.fck).length>=n)r.fc=Math.round(Object.values(r.fck).filter(x=>x).length/n*100);svN(cur,r);fcNx(1)}
function fcOnlyNo(){const k=ldN(cur).fck||{},n=LD[cur].words.length;for(let s=1;s<=n;s++){const j=(fcI+s)%n;if(k[j]!==1){fcI=j;fcShow=false;rr();return}}ask("Bạn đã nhớ hết các thẻ!",null,1)}

/* Trắc nghiệm dùng chung */
const QS={},QA={},QD={};
function prepQ(key,src){if(!QS[key]){QS[key]=src.map(q=>({q:q.q,s:q.s,c:q.o[0],e:q.e,o:shuf(q.o.slice())}));QA[key]={};QD[key]=false}return QS[key]}
function quizHtml(key,src){const qs=prepQ(key,src),a=QA[key],d=QD[key];let ok=0;
 const h=qs.map((q,i)=>{const right=a[i]!=null&&q.o[a[i]]===q.c;if(right)ok++;return `<div class="card q ${d?(right?"ok":"no"):""}"><b>Câu ${i+1}.</b> ${q.q} ${q.s?bS(q.s,"🔊 Nghe"):""}<div class="opts">${q.o.map((o,j)=>`<button class="opt ${a[i]===j?"sel":""} ${d&&o===q.c?"right":""}" ${d?"disabled":""} onclick="QA['${key}'][${i}]=${j};rr()">${OP(o)}</button>`).join("")}</div>${d?`<small class="ex">${right?"✓ Đúng.":"✗ Đáp án: "+q.c.split("|")[0]+"."} ${q.e||""}</small>`:""}</div>`}).join("");
 const pct=Math.round(ok/qs.length*100);
 return h+(d?`<div class="card res"><div class="big ${pct>=80?"ok":"no"}">${pct}%</div><p style="text-align:center">${ok}/${qs.length} câu đúng · ${pct>=80?"🎉 Đạt":"Chưa đạt 80%, xem lại các câu sai ở trên rồi làm lại nhé."}</p><div class="row c"><button class="btn o" onclick="delete QS['${key}'];rr()">↻ Làm lại</button></div></div>`
 :`<div class="row"><button class="btn" onclick="qDone('${key}')">Nộp bài</button><small style="color:var(--sub)">Đã chọn ${Object.keys(a).length}/${qs.length}</small></div>`)}
function qDone(key,f){const qs=QS[key],a=QA[key];if(!f&&Object.keys(a).length<qs.length)return ask("Còn câu chưa chọn. Vẫn nộp bài?",()=>qDone(key,1));
 QD[key]=true;const pct=Math.round(qs.filter((q,i)=>a[i]!=null&&q.o[a[i]]===q.c).length/qs.length*100);
 if(key[0]=="g"){const r=ldN(cur);r.gp=pct;svN(cur,r)}else{const n=+key.slice(1),r=ldN(n);r.test=pct;svN(n,r)}rr()}

function vGp(L){return `<div class="card note">${L.gpNote||"Bài 1 trong sách chưa có mục ngữ pháp riêng. Dưới đây là các mẫu câu trọng tâm cần nắm, kèm lỗi người Việt hay mắc."}</div>`+
 L.gp.map(g=>`<div class="card gpb"><h4>${g.h}</h4>${g.b}</div>`).join("")+`<h3 class="ab-h">Luyện tập</h3>`+(GXD[gxKey()]?gxHtml(L):quizHtml("gp",L.gq)+(QD.gp?nextBtn("gp"):""))}

let DTV={},DTR={},DTD=false;
function vDt(L,r){return `<div class="card note">Nghe từng câu rồi gõ lại cả câu bằng <b>pinyin không dấu</b> (ví dụ: <i>laoshi nin hao</i>) hoặc <b>chữ Hán</b>. Không cần gõ dấu câu. Mỗi câu nghe lại được nhiều lần.</div>`+
 L.dt.map((x,i)=>{const st=DTR[i];return `<div class="card dt ${DTD?(st?"ok":"no"):""}"><b>${i+1}.</b> ${bS(x[0],"🔊 Nghe")}<input value="${esc(DTV[i]||"")}" oninput="DTV[${i}]=this.value" placeholder="Gõ điều bạn nghe được" autocomplete="off" autocapitalize="off" ${DTD?"disabled":""}>${DTD?`<div class="ans">${st?"✓":"✗"} <span class="zh">${x[0]}</span> <span class="py">· ${x[1]}</span></div>`:""}</div>`}).join("")+
 (DTD?`<div class="card res"><div class="big ${r.dt>=80?"ok":"no"}">${r.dt}%</div><div class="row c"><button class="btn o" onclick="DTV={};DTR={};DTD=false;rr()">↻ Làm lại</button>${nextBtn("dt")}</div></div>`:`<button class="btn" onclick="dtCheck()">Chấm điểm</button>`)}
function dtCheck(){const L=LD[cur];let ok=0;L.dt.forEach((x,i)=>{const v=np(DTV[i]||"");DTR[i]=!!v&&(v===np(x[0])||v===np(x[1]));if(DTR[i])ok++});DTD=true;const r=ldN(cur);r.dt=Math.round(ok/L.dt.length*100);svN(cur,r);rr()}

const SRC=window.SpeechRecognition||window.webkitSpeechRecognition;
let nsS=0,NSR={},NSH={},NSM={},recOn=null,srBlocked=false;
const nsAll=L=>L.sit.flatMap((x,si)=>x.turns.map((t,ti)=>({si,ti,t})));
const nsIdx=(L,si,ti)=>nsAll(L).findIndex(o=>o.si==si&&o.ti==ti);
function lcsMark(m,h){const a=[...m].filter(c=>/[一-鿿A-Za-z]/.test(c)),b=[...np(h)];const d=Array(a.length+1).fill(0).map(()=>Array(b.length+1).fill(0));
 for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)d[i][j]=a[i]==b[j]?d[i+1][j+1]+1:Math.max(d[i+1][j],d[i][j+1]);
 const ok=new Set();let i=0,j=0;while(i<a.length&&j<b.length){if(a[i]==b[j]){ok.add(i);i++;j++}else if(d[i+1][j]>=d[i][j+1])i++;else j++}
 let k=0;return [...m].map(c=>/[一-鿿A-Za-z]/.test(c)?`<span class="${ok.has(k++)?"g":"r"}">${c}</span>`:c).join("")}
function vNs(L,r){const k=r.nk||{},all=nsAll(L),S=L.sit[nsS];
 const done=si=>L.sit[si].turns.filter((t,ti)=>k[nsIdx(L,si,ti)]===1).length;
 return `<div class="card note">Đọc mục đích bằng tiếng Việt, tự nói câu tiếng Trung rồi bấm <b>🎤 Nói</b> để máy nghe và so với câu mẫu (đạt từ 70% là qua). Bí thì bấm <b>💡 Xem gợi ý</b> (từ khóa có pinyin) hoặc <b>👁 Xem mẫu</b>.${SRC&&!srBlocked?"":`<br><span class="warn">Trình duyệt này chưa dùng được chức năng máy nghe. Mở bằng Google Chrome hoặc Microsoft Edge và cho phép micro; trong lúc chờ, hãy tự đọc và tự chấm.</span>`}</div>
<div class="stb sit">${L.sit.map((x,si)=>`<button class="${si==nsS?"on":""}" onclick="nsS=${si};rr()">${x.title}<i class="sc ${done(si)==x.turns.length?"ok":"no"}">${done(si)}/${x.turns.length}</i></button>`).join("")}</div>
<div class="card note"><b>${S.title}</b><br>📍 ${S.ctx}</div>`+
 S.turns.map((t,ti)=>{const n=nsIdx(L,nsS,ti),st=k[n],nm=SPN[t.w]||[t.w,""];
 return `<div class="card ns ${st===1?"ok":st===0?"no":""}"><div class="who2"><b class="zh">${t.w}</b> <small>${nm[0]} · ${nm[1]}</small></div><div class="goal">🎯 ${t.vi}</div>
<div class="row"><button class="btn sm mic ${recOn===n?"rec":""}" onclick="rec(${n})">${recOn===n?"⏹ Đang nghe… bấm để dừng":"🎤 Nói"}</button><button class="snd" onclick="NSH[${n}]=!NSH[${n}];rr()">💡 ${NSH[n]?"Ẩn":"Xem"} gợi ý</button><button class="snd" onclick="NSM[${n}]=!NSM[${n}];rr()">👁 ${NSM[n]?"Ẩn":"Xem"} mẫu</button></div>
${NSH[n]?`<div class="hints">${t.h.map(x=>`<span><b class="zh">${x[0]}</b><small>${x[1]}</small></span>`).join("")}</div>`:""}
${NSM[n]?`<div class="bub ref"><div class="py">${t.r[1]}</div><div class="hz">${t.r[0]}</div><div class="vi">${t.r[2]}</div>${bS(t.r[0],"🔊 Nghe mẫu")}</div>`:""}
<div class="out" id="nsr${n}">${NSR[n]||""}</div>
${!SRC||srBlocked?`<div class="row"><button class="btn sm ${st===1?"":"o"}" onclick="nsMk(${n},1)">✓ Mình nói đúng</button><button class="btn sm ${st===0?"":"o"}" onclick="nsMk(${n},0)">✗ Chưa đúng</button></div>`:""}</div>`}).join("")+
 `<div class="row">${nsS<L.sit.length-1?`<button class="btn" onclick="nsS++;rr();$('ltabs').scrollIntoView()">Tình huống tiếp →</button>`:""}</div>`+
 (r.ns!=null?`<p>Điểm luyện nói: <b>${r.ns}%</b> (${Object.values(k).filter(x=>x===1).length}/${all.length} lượt đạt)</p>`+nextBtn("ns"):`<p style="color:var(--sub)">Điểm được tính khi đã nói đủ ${all.length} lượt của 4 tình huống.</p>`)}
function nsMk(i,v){const L=LD[cur],n=nsAll(L).length,r=ldN(cur);r.nk=r.nk||{};if(r.nk[i]!==1||v===1)r.nk[i]=v;if(Object.keys(r.nk).length>=n)r.ns=Math.round(Object.values(r.nk).filter(x=>x===1).length/n*100);svN(cur,r);rr()}
let curRec=null;
function rec(i){if(curRec){try{curRec.stop()}catch(e){}return}
 const o=nsAll(LD[cur])[i],tgt=o.t.r[0];let s;try{s=new SRC()}catch(e){srBlocked=true;rr();return}
 s.lang="zh-CN";s.interimResults=false;s.maxAlternatives=1;let fin=false;curRec=s;recOn=i;NSR[i]="";rr();
 const end=()=>{curRec=null;recOn=null};
 s.onresult=e=>{fin=true;const t=e.results[0][0].transcript,m=simi(np(t),np(tgt)),ok=m>=70;end();
  NSR[i]=`<div>Máy nghe được: <span class="zh hd">${esc(t)}</span></div><div>So với mẫu: <span class="zh hd">${lcsMark(tgt,t)}</span> <small>(chữ đỏ là chữ bị thiếu hoặc sai)</small></div><div class="${ok?"okt":"bad"}">${ok?"✓ Tốt lắm!":"✗ Chưa đúng mẫu, thử lại nhé"} · giống câu mẫu ${m}%</div>`;nsMk(i,ok?1:0)};
 s.onerror=e=>{fin=true;end();if(/not-allowed|service-not-allowed/.test(e.error)){srBlocked=true;NSR[i]=`<span class="bad">Trang chưa được phép dùng micro. Hãy cho phép micro, hoặc tự đọc rồi tự chấm.</span>`}else NSR[i]=`<span class="bad">Chưa nghe rõ, bấm 🎤 Nói lại nhé.</span>`;rr()};
 s.onend=()=>{if(!fin){end();NSR[i]=`<span class="bad">Chưa nghe thấy gì, bấm 🎤 Nói lại nhé.</span>`;rr()}};
 try{s.start()}catch(e){end();srBlocked=true;rr()}}

/* ===== Khởi động: nhìn tranh chọn từ (L.warm) ===== */
let WU={};
function vWu(L){const W=L.warm,n=W.pics.length,ok=W.pics.filter((p,i)=>WU[i]===p[1]).length,sel=Object.keys(WU).length;
 return `${L.goals?`<div class="card note"><b>🎯 目标 · Mục tiêu bài học</b><ul>${L.goals.map(g=>`<li>${g}</li>`).join("")}</ul></div>`:""}
<div class="card"><h3>热身 · Khởi động</h3><p><span class="zh">${W.q}</span><br><span class="vi">${W.qv}</span></p>
<div class="wuw">${W.w.map(w=>`<span class="wuc" onclick="spk(${S(w[1])})"><b class="wul">${w[0]}</b><span class="zp"><span class="zh">${w[1]}</span><small>${w[2]}</small></span><span class="vi">${w[3]}</span></span>`).join("")}</div>
<p class="ctx">Chạm vào từ để nghe. Dưới mỗi tranh, chọn chữ cái của từ phù hợp.</p></div>
<div class="wug">${W.pics.map((p,i)=>{const v=WU[i],w=W.w.find(x=>x[0]==p[1]),st=v?(v==p[1]?"ok":"no"):"";
 return `<div class="card wup ${st}"><img src="img/gx/${p[0]}.webp" alt="Tranh ${i+1}" loading="lazy"><div class="wubs">${W.w.map(x=>`<button class="wub ${v==x[0]?"sel":""}" ${st=="ok"?"disabled":""} onclick="WU[${i}]='${x[0]}';rr()">${x[0]}</button>`).join("")}</div>
${st=="ok"?`<div class="okt">✓ ${w[0]} · <span class="zh">${w[1]}</span> <span class="py">${w[2]}</span> <span class="vi">· ${w[3]}</span> ${bS(w[1])}</div>`:st=="no"?`<div class="bad">✗ Chưa đúng, em chọn lại nhé.</div>`:""}</div>`}).join("")}</div>
${sel?`<div class="card res"><div class="big ${ok==n?"ok":"no"}">${ok}/${n}</div><p style="text-align:center">${ok==n?"🎉 Em đã nối đúng tất cả các tranh!":"Tranh viền đỏ là chưa đúng, em chọn lại nhé."}</p></div>`:""}
<div class="row"><button class="btn o sm" onclick="WU={};rr()">↻ Làm lại</button>${nextBtn("wu")}</div>`}

/* ===== Hoạt động trên lớp: đóng vai (L.act) ===== */
let ACR={},ACS={},ACRL={},HDT="";
function cpTxt(t){const done=()=>ask("Đã sao chép. Em dán vào Zalo để gửi cô nhé.",null,1);
 if(!String(t||"").trim())return ask("Em chưa viết gì để sao chép.",null,1);
 try{navigator.clipboard.writeText(t).then(done,()=>cpOld(t,done))}catch(e){cpOld(t,done)}}
function cpOld(t,cb){const a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(e){}a.remove();cb()}
function vHd(L){return `<div class="card note"><b>课堂活动 · Hoạt động trên lớp</b><br>Chọn vai của em. Lượt của bạn kia: chạm để nghe. Lượt của em: đọc gợi ý tiếng Việt, tự nói rồi bấm <b>🎤 Nói</b> (đạt từ 70%). Bí thì bấm <b>👁 Xem mẫu</b>. Muốn xem cả đoạn, chọn <b>Xem cả đoạn mẫu</b>.${SRC&&!srBlocked?"":`<br><span class="warn">Trình duyệt này chưa dùng được máy nghe. Mở bằng Chrome hoặc Edge và cho phép micro.</span>`}</div>`+
 L.act.map((A,ai)=>{const me=ACRL[ai]==null?null:ACRL[ai];
 return `<div class="card"><h3>${A.title}</h3><p class="ctx">📍 ${A.ctx}</p>${A.req?`<div class="bub ref"><div class="py">${A.req[1]}</div><div class="hz">${A.req[0]}</div><div class="vi">${A.req[2]}</div></div>`:""}
<p><b>Em đóng vai:</b></p><div class="row">${A.roles.map((r,ri)=>`<button class="btn sm ${me===ri?"":"o"}" onclick="ACRL[${ai}]=${ri};rr()"><span class="zh">${r}</span> · ${(SPN[r]||["",r])[1]}</button>`).join("")}<button class="btn sm ${me===null?"":"o"}" onclick="ACRL[${ai}]=null;rr()">Xem cả đoạn mẫu</button></div>
${A.l.map((y,j)=>{const k=ai+"-"+j,mine=me!==null&&y[0]==A.roles[me],nm=SPN[y[0]]||[y[0],""],st=ACS[k];
 if(!mine)return `<div class="dl"><div class="who"><b>${y[0]}</b>${nm[1]}</div><div class="bub" onclick="spk(${S(y[1])})"><div class="py">${y[2]}</div><div class="hz">${y[1]}</div><div class="vi">${y[3]}</div></div></div>`;
 return `<div class="card ns ${st===1?"ok":st===0?"no":""}"><div class="who2"><b class="zh">${y[0]}</b> <small>${nm[1]} (em)</small></div><div class="goal">🎯 ${y[4]}</div>
<div class="row"><button class="btn sm mic ${recOn===k?"rec":""}" onclick="acRec(${ai},${j})">${recOn===k?"⏹ Đang nghe… bấm để dừng":"🎤 Nói"}</button><button class="snd" onclick="NSM['${k}']=!NSM['${k}'];rr()">👁 ${NSM[k]?"Ẩn":"Xem"} mẫu</button></div>
${NSM[k]?`<div class="bub ref"><div class="py">${y[2]}</div><div class="hz">${y[1]}</div><div class="vi">${y[3]}</div>${bS(y[1],"🔊 Nghe mẫu")}</div>`:""}<div class="out">${ACR[k]||""}</div></div>`}).join("")}
${A.sub?`<details class="hdsub"><summary>💡 Gợi ý thay đổi để nói theo cách của nhóm em</summary>${A.sub.map(g=>`<p><b>${g[0]}</b></p><div class="hints">${g[1].map(x=>`<span onclick="spk(${S(x[0])})"><b class="zh">${x[0]}</b><small>${x[1]}</small><em class="vi">${x[2]}</em></span>`).join("")}</div>`).join("")}</details>`:""}
${A.note?`<p class="ctx">${A.note}</p>`:""}</div>`}).join("")+
 `<div class="card"><b>✍️ Đoạn đóng vai của nhóm em</b><p class="ctx">Hai bạn một nhóm: viết lại hoặc viết tiếp đoạn hội thoại (chữ Hán hoặc pinyin), luyện nói cùng nhau rồi sao chép gửi cô qua Zalo.</p><textarea class="tin hdta" rows="6" oninput="HDT=this.value" placeholder="病人：医生，我病了。&#10;医生：……">${esc(HDT)}</textarea><div class="row"><button class="btn sm" onclick="cpTxt(HDT)">📋 Sao chép bài</button></div></div>`+nextBtn("hd")}
function acRec(ai,j){if(curRec){try{curRec.stop()}catch(e){}return}
 const k=ai+"-"+j,tgt=LD[cur].act[ai].l[j][1];
 if(!SRC||srBlocked){ACR[k]=`<span class="bad">Trình duyệt chưa dùng được micro. Mở bằng Chrome hoặc Edge và cho phép micro.</span>`;rr();return}
 let s;try{s=new SRC()}catch(e){srBlocked=true;rr();return}
 s.lang="zh-CN";s.interimResults=false;s.maxAlternatives=1;let fin=false;curRec=s;recOn=k;ACR[k]="";rr();
 const end=()=>{curRec=null;recOn=null};
 s.onresult=e=>{fin=true;const t=e.results[0][0].transcript,m=simi(np(t),np(tgt)),ok=m>=70;end();ACS[k]=ok?1:0;
  ACR[k]=`<div>Máy nghe được: <span class="zh hd">${esc(t)}</span></div><div>So với mẫu: <span class="zh hd">${lcsMark(tgt,t)}</span> <small>(chữ đỏ là chữ thiếu hoặc sai)</small></div><div class="${ok?"okt":"bad"}">${ok?"✓ Tốt lắm!":"✗ Chưa đúng mẫu, thử lại nhé"} · giống câu mẫu ${m}%</div>`;rr()};
 s.onerror=e=>{fin=true;end();if(/not-allowed|service-not-allowed/.test(e.error)){srBlocked=true;ACR[k]=`<span class="bad">Trang chưa được phép dùng micro.</span>`}else ACR[k]=`<span class="bad">Chưa nghe rõ, bấm 🎤 Nói lại nhé.</span>`;rr()};
 s.onend=()=>{if(!fin){end();ACR[k]=`<span class="bad">Chưa nghe thấy gì, bấm 🎤 Nói lại nhé.</span>`;rr()}};
 try{s.start()}catch(e){end();srBlocked=true;rr()}}

const PN={fc:"Flashcard từ vựng",gp:"Ngữ pháp · Mẫu câu",dt:"Nghe chép chính tả",ns:"Luyện nói"};
function vSum(L,r){const ks=Object.keys(PN),avg=avgOf(r),weak=ks.filter(k=>r[k]!=null&&r[k]<80),todo=ks.filter(k=>r[k]==null);
 const msg=todo.length?`Còn ${todo.length} phần chưa làm: ${todo.map(k=>PN[k]).join(", ")}.`:weak.length?`Cần ôn lại: <b>${weak.map(k=>PN[k]).join(", ")}</b> (dưới 80%).`:`🎉 Hoàn thành Bài ${cur}! Làm test nhanh để chốt bài nhé.`;
 return `<div class="card"><div class="big ${avg!=null&&avg>=80&&!todo.length?"ok":"no"}">${avg==null?"—":avg+"%"}</div><p style="text-align:center">${msg}</p></div>
<div class="card">${ks.map(k=>`<div class="bar"><span>${PN[k]}</span><div class="tr"><i style="width:${r[k]||0}%" class="${r[k]>=80?"ok":"no"}"></i></div><b>${r[k]==null?"chưa làm":r[k]+"%"}</b>${r[k]==null||r[k]<80?`<button class="btn o sm" onclick="lt('${k}')">${r[k]==null?"Làm":"Ôn lại"}</button>`:"<span>✓</span>"}</div>`).join("")}
${r.test!=null?`<div class="bar"><span>Test nhanh</span><div class="tr"><i style="width:${r.test}%" class="${r.test>=80?"ok":"no"}"></i></div><b>${r.test}%</b><span>${r.test>=80?"✓":""}</span></div>`:""}</div>
<div class="row c"><button class="btn" onclick="sub('ts');openTest(${cur})">📝 Làm test nhanh Bài ${cur}</button><button class="btn o sm" onclick="ask('Xóa toàn bộ kết quả Bài ${cur} trên máy này?',()=>{svN(${cur},{});DTV={};DTR={};DTD=false;NSR={};NSH={};NSM={};nsS=0;delete QS.gp;GX=null;rr()})">Làm lại từ đầu</button></div>`}

/* ===== Test nhanh (kiểm tra vận dụng) ===== */
let T=null,TIV=null,TPY=true;const TMIN=10;
function openTest(n){tStop();tcur=n;T=null;rr();scrollTo(0,0)}
function tStop(){if(TIV){clearInterval(TIV);TIV=null}try{speechSynthesis.cancel()}catch(e){}}
function testView(){const L=LD[tcur];
 return `<button class="btn o sm" onclick="const q=()=>{tStop();tcur=null;T=null;rr()};(!T||T.done)?q():ask('Thoát sẽ hủy bài đang làm. Thoát?',q)">← Danh sách bài</button>
<div class="lhead"><span class="no">${tcur}</span><div><div>Kiểm tra HSK ${olLv} · Bài ${tcur} · ${TMIN} phút</div><div class="zh lt2">${L.t}</div></div>${vBtn()}</div>${vBar()}<div class="stack">${T?tBody(L):tIntro(L)}</div>`}
function tIntro(L){let nm="";try{nm=localStorage.getItem("ct_name")||""}catch(e){}
 return `<div class="card"><b>Bài kiểm tra Bài ${tcur} · ${TMIN} phút · 15 điểm</b>
<p>Phần 1A: ${L.tsort.length} câu sắp xếp thành câu đúng.<br>Phần 1B: ${L.tlis.length} câu nghe và chọn cách đáp lại / hiểu ý (mỗi câu nghe tối đa 2 lượt).<br>Phần 2: nói 5 lượt lấy ngẫu nhiên từ phần Luyện nói, <b>không có gợi ý</b>, mỗi lượt nói một lần.<br>Đạt từ 12/15 (80%). Hết giờ bài tự nộp.</p>
<label><b>Họ và tên học sinh <span class="bad">*</span></b></label><input class="tin" id="tname" value="${esc(nm)}" placeholder="Nhập họ và tên của em" autocomplete="name" oninput="try{localStorage.setItem('ct_name',this.value)}catch(e){};$('tnerr').hidden=true"><div class="bad" id="tnerr" hidden>Em cần điền họ và tên trước khi bắt đầu.</div>
<p><b>Em chọn cách làm bài:</b></p><div class="row"><button class="btn sm ${TPY?"":"o"}" onclick="TPY=true;rr()">Có pinyin</button><button class="btn sm ${TPY?"o":""}" onclick="TPY=false;rr()">Chỉ chữ Hán (pinyin hiện khi chấm)</button></div>
<p class="ctx">Phần nói cần Google Chrome hoặc Microsoft Edge và cho phép dùng micro.</p><button class="btn" onclick="tStart()">▶ Bắt đầu làm bài</button></div>`}
function tStart(){const nm=($("tname").value||"").trim();if(!nm){$("tnerr").hidden=false;$("tname").focus();return}
 try{localStorage.setItem("ct_name",nm)}catch(e){}
 const L=LD[tcur],all=nsAll(L),seen=new Set(),pool=[];shuf(all.map((_,i)=>i)).forEach(i=>{const r=all[i].t.r[0];if(np(r).length>=3&&!seen.has(r)){seen.add(r);pool.push(i)}});
 T={name:nm,han:!TPY,left:TMIN*60,done:false,
  so:L.tsort.map(it=>{let p;for(let k=0;k<10;k++){p=shuf(it.t.map((_,i)=>i));if(!it.ok.includes(p.map(i=>it.t[i]).join("")))break}return{pool:p,ch:[]}}),
  li:L.tlis.map(q=>({o:shuf(q.o.slice()),pick:null,plays:0})),sp:pool.slice(0,5),spk:[],spo:[],spr:[]};
 tStop();TIV=setInterval(()=>{if(!T||T.done)return tStop();T.left--;const e=$("tm");if(e){e.textContent=tClock();e.classList.toggle("low",T.left<=120)}if(T.left<=0)tSubmit(true)},1000);rr();scrollTo(0,0)}
const tClock=()=>`${String(Math.floor(T.left/60)).padStart(2,"0")}:${String(T.left%60).padStart(2,"0")}`;
const tTokPy={"老师":"lǎoshī","您":"nín","好":"hǎo","你":"nǐ","们":"men","王":"Wáng","同学":"tóngxué","再见":"zàijiàn","小语":"Xiǎoyǔ","谢谢":"xièxie","不":"bù","客气":"kèqi","大家":"dàjiā"};
Object.assign(tTokPy,{"就": "jiù", "什么时候": "shénme shíhou", "都": "dōu", "好": "hǎo", "也": "yě", "学习": "xuéxí"});
Object.assign(tTokPy,{"我":"wǒ","是":"shì","今天":"jīntiān","早上":"zǎoshang","到":"dào","的":"de","想":"xiǎng","请":"qǐng","帮忙":"bāngmáng","一飞":"Yīfēi","让":"ràng","来":"lái","接":"jiē","你们":"nǐmen","她":"tā","我们":"wǒmen","吃":"chī","了":"le","北京烤鸭":"Běijīng kǎoyā","学生":"xuésheng","吧":"ba","还是":"háishi","打车":"dǎchē","去":"qù","北京大学":"Běijīng Dàxué","有":"yǒu","四万":"sìwàn","多":"duō","名":"míng","他们":"tāmen","卖":"mài","电影票":"diànyǐngpiào","很":"hěn","便宜":"piányi","别":"bié","看":"kàn","电影":"diànyǐng","这儿":"zhèr","公交车":"gōngjiāochē","吗":"ma"});
Object.assign(tTokPy,{"菜":"cài","做好":"zuòhǎo","还":"hái","没":"méi","想好":"xiǎnghǎo","呢":"ne","就":"jiù","在":"zài","桌子":"zhuōzi","上":"shang","自己":"zìjǐ","拿":"ná","看了看":"kànle kàn","网上":"wǎngshang","介绍":"jièshào","为什么":"wèi shénme","西安":"Xī'ān","过":"guo","这":"zhè","家":"jiā","商场":"shāngchǎng","穿":"chuān","红色":"hóngsè","因为":"yīnwèi","喜欢":"xǐhuan","白色":"báisè","啊":"a","条":"tiáo","裤子":"kùzi","觉得":"juéde","绿色":"lǜsè","更":"gèng","好看":"hǎokàn","买":"mǎi"});
Object.assign(tTokPy,{"上去":"shàngqù","下面":"xiàmiàn","等":"děng","一会儿":"yíhuìr","下去":"xiàqù","那":"nà","送":"sòng","你们":"nǐmen","礼物":"lǐwù","12点":"shí'èr diǎn","吃饭":"chī fàn","奶茶":"nǎichá","爷爷":"yéye","明天":"míngtiān","女儿":"nǚ'ér","生日":"shēngrì","打开":"dǎkāi","看看":"kànkan","喜欢不喜欢":"xǐhuan bu xǐhuan","画笔":"huàbǐ","真":"zhēn","孩子们":"háizimen","早早地":"zǎozǎo de","上床":"shàng chuáng","运动":"yùndòng","踢":"tī","可以":"kěyǐ","跑得不快":"pǎo de bú kuài","不太":"bú tài","跑步":"pǎobù","游泳":"yóuyǒng","游":"yóu","快":"kuài","一":"yī","时间":"shíjiān","左边的":"zuǒbian de","比":"bǐ","右边的":"yòubian de","记得":"jìde","爱情片":"àiqíngpiàn","怎么":"zěnme","点":"diǎn","这么":"zhème","虽然":"suīrán","忘了":"wàng le","但是":"dànshì","左边":"zuǒbian","这个":"zhège","得":"de","什么":"shénme","不":"bù","可以":"kěyǐ"});
const tTok=(x,act)=>/^[，。！？]$/.test(x)?`<button class="tok p" ${act}>${x}</button>`:`<button class="tok" ${act}><span class="zh">${x}</span><small class="tpy">${tTokPy[x]||(window.TKP||{})[x]||""}</small></button>`;
function tSo(k,from,i){const s=T.so[k];if(T.done)return;if(from=="p"){s.ch.push(s.pool.splice(i,1)[0])}else{s.pool.push(s.ch.splice(i,1)[0])}rr()}
function tPlay(k){const q=T.li[k];if(T.done||q.plays>=2)return;q.plays++;say(LD[tcur].tlis[k].a);rr()}
function tBody(L){const d=T.done;let h="";
 if(d)h+=tResult(L);else h+=`<div class="timer" id="tm">${tClock()}</div>`;
 h+=`<div class="${T.han&&!d?"hanonly":""}"><h3 class="ab-h">Phần 1A · Sắp xếp câu (${L.tsort.length} điểm)</h3><p class="ctx">Bấm các từ bên dưới để ghép thành câu đúng; bấm từ đã chọn để bỏ ra.</p>`;
 L.tsort.forEach((it,k)=>{const s=T.so[k],ans=s.ch.map(i=>it.t[i]).join(""),ok=it.ok.includes(ans);
  h+=`<div class="card q ${d?(ok?"ok":"no"):""}"><b>Câu ${k+1}.</b><div class="slots">${s.ch.length?s.ch.map((i,j)=>tTok(it.t[i],`onclick="tSo(${k},'c',${j})"`)).join(""):`<span class="ctx">Chọn từ để ghép câu…</span>`}</div><div class="bank">${s.pool.map((i,j)=>tTok(it.t[i],`onclick="tSo(${k},'p',${j})"`)).join("")}</div>
  ${d?`<div class="${ok?"okt":"bad"}">${ok?"✓ Đúng":"✗ Chưa đúng"}</div><div class="zh hd">${it.ok[0]}</div><div class="py">${it.p}</div><small class="ex">💡 ${it.e}</small>`:""}</div>`});
 h+=`<h3 class="ab-h">Phần 1B · Nghe hiểu (${L.tlis.length} điểm)</h3><p class="ctx">Mỗi câu nghe tối đa 2 lượt.</p>`;
 L.tlis.forEach((q,k)=>{const s=T.li[k],ok=s.pick!=null&&s.o[s.pick]===q.o[0];
  h+=`<div class="card q ${d?(ok?"ok":"no"):""}"><b>Câu ${k+1+L.tsort.length}.</b> <span class="zh hd">${q.qz||"听后选择正确的回答。"}</span><small class="opy">${q.qp||"Tīng hòu xuǎnzé zhèngquè de huídá."}</small><div class="row"><button class="snd" ${d||s.plays>=2?"disabled":""} onclick="tPlay(${k})">🔊 ${s.plays>=2?"Đã nghe đủ 2 lượt":`Nghe (còn ${2-s.plays} lượt)`}</button></div>
  <div class="opts">${s.o.map((o,j)=>`<button class="opt ${s.pick===j?"sel":""} ${d&&o===q.o[0]?"right":""}" ${d?"disabled":""} onclick="T.li[${k}].pick=${j};rr()">${OP(o)}</button>`).join("")}</div>
  ${d?`<small class="ex">${ok?"✓ Đúng.":"✗ Chưa đúng."} Nội dung nghe: <span class="zh">${q.a}</span></small>`:""}</div>`});
 h+=`<h3 class="ab-h">Phần 2 · Nói theo tình huống (5 điểm)</h3><p class="ctx">Không có gợi ý: đọc mục đích, tự nói câu tiếng Trung. Mỗi câu nói <b>một lần</b>; máy nghe xong mới hiện câu mẫu (đạt từ 60%).</p>`;
 const all=nsAll(L);T.sp.forEach((ix,k)=>{const t=all[ix].t,nm=SPN[t.w]||[t.w,""],ok=!!T.spk[k],self=!SRC||srBlocked;
  h+=`<div class="card ns ${d?(ok?"ok":"no"):""}"><div class="who2"><b class="zh">${t.w}</b> <small>${nm[1]}</small></div><div class="ctx">${L.sit[all[ix].si].ctx}</div><div class="goal">🎯 ${t.vi}</div>
  ${d||T.spr[k]?"":self?`<div class="bad">Phần nói cần mở trang bằng Google Chrome hoặc Microsoft Edge và cho phép micro.</div>`:`<div class="row"><button class="btn sm mic ${recOn==="t"+k?"rec":""}" onclick="tRec(${k})">${recOn==="t"+k?"⏹ Đang nghe… bấm để dừng":"🎤 Nói"}</button></div>`}
  <div class="out">${T.spo[k]||""}</div>${d&&!T.spr[k]?`<div class="bad">✗ Chưa nói</div>`:""}${d||T.spr[k]?`<div class="bub ref"><small>Câu mẫu:</small><div class="py">${t.r[1]}</div><div class="hz">${t.r[0]}</div></div>`:""}</div>`});
 h+=`</div>`+(d?`<div class="row c"><button class="btn" onclick="T=null;rr();scrollTo(0,0)">↻ Làm lại bài</button><button class="btn o" onclick="sub('ol');openL(${tcur})">📖 Ôn lại Bài ${tcur}</button></div>`:`<div class="row c"><button class="btn" onclick="tSubmit(false)">Nộp bài</button></div>`);
 return h}
function tRec(k){if(curRec){try{curRec.stop()}catch(e){}return}if(T.spr[k]||T.done)return;
 const L=LD[tcur],tgt=nsAll(L)[T.sp[k]].t.r[0];let s;try{s=new SRC()}catch(e){srBlocked=true;rr();return}
 s.lang="zh-CN";s.interimResults=false;s.maxAlternatives=1;let fin=false;curRec=s;recOn="t"+k;T.spo[k]="";rr();
 const end=()=>{curRec=null;recOn=null};
 s.onresult=e=>{fin=true;end();if(T.done)return;const t=e.results[0][0].transcript,m=simi(np(t),np(tgt)),ok=m>=60;T.spk[k]=ok;T.spr[k]=true;
  T.spo[k]=`Máy nghe được: <span class="zh hd">${esc(t)}</span> · <span class="${ok?"okt":"bad"}">${ok?"✓ Đạt":"✗ Chưa đạt"}</span> <small>(giống câu mẫu ${m}%)</small>`;rr()};
 s.onerror=e=>{fin=true;end();if(/not-allowed|service-not-allowed/.test(e.error)){srBlocked=true;T.spo[k]=`<span class="bad">Trang chưa được phép dùng micro. Hãy cho phép micro rồi bấm 🎤 Nói lại.</span>`}else T.spo[k]=`<span class="bad">Chưa nghe rõ, bấm 🎤 Nói lại.</span>`;rr()};
 s.onend=()=>{if(!fin){end();T.spo[k]=`<span class="bad">Chưa nghe thấy gì, bấm 🎤 Nói lại.</span>`;rr()}};
 try{s.start()}catch(e){end();srBlocked=true;rr()}}
function tSubmit(auto,f){if(!T||T.done)return;
 if(!auto&&!f){const miss=T.so.filter(s=>s.pool.length).length+T.li.filter(s=>s.pick==null).length+T.sp.filter((_,k)=>T.spk[k]==null).length;if(miss)return ask(`Còn ${miss} câu chưa làm. Vẫn nộp bài?`,()=>tSubmit(false,1))}
 tStop();if(curRec){try{curRec.stop()}catch(e){}}const L=LD[tcur];
 const a=L.tsort.filter((it,k)=>it.ok.includes(T.so[k].ch.map(i=>it.t[i]).join(""))).length,b=L.tlis.filter((q,k)=>T.li[k].pick!=null&&T.li[k].o[T.li[k].pick]===q.o[0]).length,c=T.sp.filter((_,k)=>T.spk[k]===true).length;
 T.res={a,b,c,auto};T.done=true;const r=ldN(tcur);r.test=Math.round((a+b+c)/15*100);svN(tcur,r);rr();scrollTo(0,0)}
function tResult(L){const {a,b,c,auto}=T.res,tot=a+b+c,pass=tot>=12,ns=L.tsort.length,nl=L.tlis.length;
 const weak=[];if(a<ns*.8)weak.push(["gp","Sắp xếp câu → ôn Ngữ pháp · Mẫu câu"]);if(b<nl*.8)weak.push(["bk","Nghe hiểu → nghe lại Bài khóa"]);if(c<4)weak.push(["ns","Nói → ôn Luyện nói"]);
 return `<div class="card res"><p style="text-align:center;margin:0">${auto?"⏰ Hết giờ! ":""}Học sinh: <b>${esc(T.name)}</b></p><div class="big ${pass?"ok":"no"}">${tot}/15</div>
<p style="text-align:center">Sắp xếp câu ${a}/${ns} · Nghe hiểu ${b}/${nl} · Nói ${c}/5<br><b>${tot>=14?"Xuất sắc! 🎉":pass?"Đạt. Ôn thêm các câu sai bên dưới nhé.":"Chưa đạt 80%. Em ôn lại rồi làm lại bài nhé."}</b></p>
${weak.length?`<div class="row c">${weak.map(w=>`<button class="btn o sm" onclick="tStop();T=null;sub('ol');openL(${tcur});lt('${w[0]}')">${w[1]}</button>`).join("")}</div>`:""}
<p class="ctx" style="text-align:center">Chụp màn hình kết quả gửi cô qua <a href="https://zalo.me/0366534081">Zalo</a> để cô theo dõi.</p></div>`}

rr();drawTips();sub("ol");
