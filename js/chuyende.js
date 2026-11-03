/* ===== Chuyên đề ôn tập có chấm điểm (thêm 03/11/2026) =====
   Dữ liệu: CD[cấp theo Sổ theo dõi] (ví dụ hsk1/data/cd-cacthi.js → CD[6]). Mỗi chuyên đề hiện thành ô rộng ngay sau ô "Bài <after>".
   4 dạng: fill (chọn từ điền chỗ trống, máy chấm) · tr (dịch Việt → Trung) · qa (trả lời câu hỏi, cô chấm) · say (nói / gõ theo gợi ý).
   tr, say: câu trùng đáp án (acc) máy chấm Đúng, câu khác "Chờ cô". Nộp qua máy chủ Chấm bài (vnop, lv = cấp, b = mã chuyên đề),
   cô chấm ở Bảng theo dõi › ✍ Chấm bài như phần Dịch. Điểm: thang 100 theo trọng số w của từng dạng; câu chờ cô tạm tính 0.
   Bài đang làm lưu ct_cdd_{cấp}_{key}; bài đã nộp lưu ct_cdn_{cấp}_{key}. Nạp SAU js/cham.js. ===== */
var CD=window.CD||{};
let CDON=null,CDV=null,CDWAIT=false,CDSHOW={},CDPRAC=false,CDREC=null;
const cdLv=()=>typeof trkLv=="function"?trkLv():olLv;
const cdSet=()=>CD[cdLv()]&&CD[cdLv()].find(s=>s.key==CDON);
const cdJ=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const cdPut=(k,o)=>{try{localStorage.setItem(k,JSON.stringify(o))}catch(e){}};
const cdDK=s=>"ct_cdd_"+cdLv()+"_"+s.key, cdNK=s=>"ct_cdn_"+cdLv()+"_"+s.key;
const cdE=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const cdMe=()=>typeof trkIn=="function"&&trkIn();
const cdSrv=()=>typeof TRK_API!="undefined"&&!!TRK_API;
const cdKey=v=>hasHan(v)?gH(v):"py:"+gN(v);
/* {a|b} = một trong các cách, [x] hoặc [x|y] = có hoặc không */
function cdExp(p){const i=p.search(/[{\[]/);if(i<0)return [p];const o=p[i],c=o=="{"?"}":"]";let d=0,j=i;
 for(;j<p.length;j++){if(p[j]=="{"||p[j]=="[")d++;else if(p[j]=="}"||p[j]=="]"){d--;if(!d)break}}
 const inner=p.slice(i+1,j),parts=[];let s=0;d=0;for(let k=0;k<inner.length;k++){const ch=inner[k];if(ch=="{"||ch=="[")d++;else if(ch=="}"||ch=="]")d--;else if(ch=="|"&&!d){parts.push(inner.slice(s,k));s=k+1}}parts.push(inner.slice(s));
 if(o=="[")parts.push("");const pre=p.slice(0,i),rest=cdExp(p.slice(j+1)),out=[];
 parts.forEach(x=>cdExp(x).forEach(a=>rest.forEach(b=>out.push(pre+a+b))));return out}
const CDACC={};
function cdAccOk(it,v){const id=it.ref;if(!CDACC[id])CDACC[id]=new Set([].concat(...it.acc.map(cdExp)).concat([it.ref]).map(gH));return hasHan(v)&&CDACC[id].has(gH(v))}
/* danh sách câu gửi cô (tr, qa, say) theo thứ tự, mỗi câu có khóa k */
function cdItems(s){const L=[];s.secs.forEach(sc=>{
 if(sc.kind=="tr")sc.items.forEach((x,i)=>L.push({k:"t"+i,sec:sc,i,de:`[${x.tag}] ${x.vi}`,ref:x.ref,rp:x.rp,x}));
 if(sc.kind=="qa"){let n=0;sc.groups.forEach(g=>g.items.forEach((x,j)=>{L.push({k:"q"+n,sec:sc,i:n,g,j,de:`[${g.tag} · ${g.t}] ${x[0]}`,ref:x[2],rp:"",x});n++}))}
 if(sc.kind=="say")sc.items.forEach((x,i)=>L.push({k:"n"+i,sec:sc,i,de:`[Nói về 阮明 · ${x.tag}] ${x.cue}`,ref:x.ref,rp:x.rp,x}))});return L}
const cdFillN=s=>{const sc=s.secs.find(x=>x.kind=="fill");return sc?sc.groups.reduce((a,g)=>a+g.items.length,0):0};
function cdMax(s){const o={};s.secs.forEach(sc=>{const n=sc.kind=="fill"?cdFillN(s):sc.kind=="qa"?sc.groups.reduce((a,g)=>a+g.items.length,0):sc.items.length;o[sc.id]=n*sc.w});return o}
function cdDraft(s){const d=cdJ(cdDK(s),null)||{};d.f=d.f||{};d.v=d.v||{};return d}
const cdSaveD=()=>{const s=cdSet();if(s&&CDV)cdPut(cdDK(s),CDV)};
function cdOpen(k){CDON=k;CDSHOW={};CDPRAC=false;CDV=cdDraft(cdSet());rr();scrollTo(0,0);cdPoll()}
function cdClose(){CDON=null;CDV=null;rr();scrollTo(0,0)}
function cdF(k,el){CDV.f[k]=el.value;cdSaveD()}
function cdIn(k,el){CDV.v[k]=el.value;cdSaveD()}
function cdQHint(k,el){const s=cdSet(),it=cdItems(s).find(x=>x.k==k),v=(el.value||"").trim(),b=$("cdh_"+k);if(!b)return;
 if(!v||!hasHan(v)||(it.g.skip&&it.g.skip.includes(it.j))){b.innerHTML="";return}b.innerHTML=it.g.need.test(v)?"":`💡 ${it.g.hint}`}
/* ghi âm: nói vào ô */
let CDMIC=null;
function cdMic(k){if(CDMIC)return;if(typeof srListen!="function")return ask("Trình duyệt này chưa thu âm được. Em gõ vào ô nhé.",null,1);
 CDMIC=k;const b=$("cdm_"+k);if(b){b.textContent="⏺ Đang nghe…";b.disabled=true}
 srListen(t=>{CDMIC=null;CDV.v[k]=t;cdSaveD();rr()},c=>{CDMIC=null;rr();ask((typeof srMsg=="function"&&srMsg(c))||"Máy chưa nghe được, em thử lại hoặc gõ vào ô nhé.",null,1)})}
function cdTog(id){CDSHOW[id]=!CDSHOW[id];rr()}

/* ---------- chấm và nộp ---------- */
function cdGrade(s){const fill=[],its=[];const sc=s.secs.find(x=>x.kind=="fill");
 if(sc){let n=0;sc.groups.forEach(g=>g.items.forEach(x=>{const v=CDV.f["f"+n]||"";fill.push({v,a:x[2],ok:v===x[2]});n++}))}
 cdItems(s).forEach(it=>{const v=(CDV.v[it.k]||"").trim();let st;if(!gN(v))st="bo";else if(it.sec.kind!="qa"&&cdAccOk(it.x,v))st="ok";else st="cho";
  its.push({k:it.k,sec:it.sec.id,d:"tr",de:it.de,ref:it.ref,rp:it.rp,v,key:cdKey(v),st,g:st=="ok"?1:null,nx:""})});return {fill,its}}
function cdScore(s,rec){const m=cdMax(s),w={};s.secs.forEach(sc=>w[sc.id]=sc.w);const o={};
 s.secs.forEach(sc=>{if(sc.kind=="fill"){o.f={p:rec.fill.filter(x=>x.ok).length*sc.w,m:m.f,wt:0};return}
  const L=rec.it.filter(x=>x.sec==sc.id);o[sc.id]={p:L.reduce((a,x)=>a+(x.g==null||x.g===""?0:+x.g)*sc.w,0),m:m[sc.id],wt:L.filter(x=>x.st=="cho").length}});
 const tot=Object.values(o).reduce((a,x)=>a+x.p,0),wt=Object.values(o).reduce((a,x)=>a+x.wt,0);return {o,tot:Math.round(tot*10)/10,wt}}
function cdNop(){const s=cdSet();if(!s)return;
 if(!cdMe()){if(!(typeof trkOn=="function"&&trkOn()))return ask("Trang chưa kết nối Sổ theo dõi nên chưa nộp được. Em chụp màn hình gửi cô nhé.",null,1);CDWAIT=true;return trkOpen()}
 CDWAIT=false;const g=cdGrade(s),bF=g.fill.filter(x=>!x.v).length,bo=g.its.filter(x=>x.st=="bo");
 if(!g.fill.some(x=>x.v)&&bo.length==g.its.length)return ask("Em làm bài rồi mới nộp nhé.",null,1);
 const miss=[bF?bF+" câu điền từ":"",...s.secs.filter(sc=>sc.kind!="fill").map(sc=>{const n=bo.filter(x=>x.sec==sc.id).length;return n?n+" câu "+({tr:"dịch",qa:"trả lời",say:"nói"})[sc.kind]:""})].filter(Boolean);
 ask(`Nộp bài cho cô? Sau khi nộp em <b>không sửa được</b> nữa.${miss.length?`<br>Em còn bỏ trống: <b>${miss.join(", ")}</b> (câu trống được 0 điểm).`:""}`,()=>cdNopGo(g))}
function cdNopGo(g){const s=cdSet(),sid="N"+trkId(),now=Date.now();
 const rec={sid,at:now,lv:cdLv(),b:s.b,ten:s.t,fill:g.fill,it:g.its,sent:false};cdPut(cdNK(s),rec);
 g.fill.forEach((x,i)=>{if(x.v&&!x.ok&&typeof trkErr=="function"){const sc=s.secs.find(c=>c.kind=="fill");let n=0,q="";sc.groups.forEach(gg=>gg.items.forEach(it=>{if(n++==i)q=it[0]}));trkErr("Chuyên đề · Điền từ",q,x.v,x.a,s.b)}});
 try{localStorage.removeItem(cdDK(s))}catch(e){}CDV={f:{},v:{}};rr();scrollTo(0,0);cdUp(rec)}
async function cdUp(rec){const s=CD[rec.lv]&&CD[rec.lv].find(x=>x.b==rec.b);if(!s||!cdMe()||!cdSrv()||rec.sent)return;
 const send=rec.it.filter(x=>x.st!="bo");
 try{const r=await chPost({a:"vnop",code:TRKME.code,sid:rec.sid,lv:rec.lv,b:rec.b,ten:rec.ten,so:{ok:rec.fill.filter(x=>x.ok).length,n:rec.fill.filter(x=>x.v).length,all:rec.fill.length},
   it:send.map(x=>({k:x.k,d:"tr",de:x.de,ref:x.ref,rp:x.rp,img:"",v:x.v,key:x.key,st:x.st}))});
  if(r&&r.ok&&r.v){rec.sent=true;rec.msg="";(r.it||[]).forEach(o=>{const x=rec.it.find(y=>y.k==o.k);if(x&&x.st!="ok"){x.st=o.st;x.g=o.g;x.nx=o.nx||""}});
   const sc=cdScore(s,rec);trkEv({t:"Nộp "+s.t,lv:rec.lv,b:rec.b,s:`${sc.tot}/100${sc.wt?" (tạm tính, "+sc.wt+" câu chờ cô)":""}`})}
  else if(r&&r.err=="no_code")rec.msg="Mã học viên chưa đúng, bài chưa gửi được."}catch(e){}
 cdPut("ct_cdn_"+rec.lv+"_"+s.key,rec);if(CDON)rr()}
async function cdPoll(force){if(!cdMe()||!cdSrv())return;const L=CD[cdLv()]||[];
 for(const s of L){const rec=cdJ(cdNK(s),null);if(!rec)continue;if(!rec.sent){await cdUp(rec);continue}
  if(!rec.it.some(x=>x.st=="cho")&&!force)continue;
  try{const res=await chPost({a:"vkq",code:TRKME.code,sids:[rec.sid]});const kq=res&&res.ok&&res.kq&&res.kq[rec.sid];if(!kq)continue;let ch=0;
   kq.forEach(o=>{const x=rec.it.find(y=>y.k==o.k);if(x&&x.st!="ok"&&o.st!="cho"&&(x.st=="cho"||+x.g!==+o.g||(x.nx||"")!=(o.nx||""))){x.st=o.st;x.g=o.g;x.nx=o.nx||"";ch++;
    if(+o.g<1&&typeof trkErr=="function")trkErr("Chuyên đề · "+({t:"Dịch",q:"Trả lời câu hỏi",n:"Nói"})[x.k[0]],x.de,x.v,x.ref+(x.nx?" ("+x.nx+")":""),rec.b)}});
   if(ch){cdPut(cdNK(s),rec);const sc=cdScore(s,rec);if(!sc.wt)trkEv({t:"Cô chấm xong "+s.t,lv:rec.lv,b:rec.b,s:`${sc.tot}/100 · ${sc.tot>=s.pass?"Đạt":"Chưa đạt"}`});
    if(CDON||cur==null)rr();ask(`🎉 Cô đã chấm <b>${s.t}</b>. Điểm của em: <b>${sc.tot}/100</b>${sc.wt?" (còn "+sc.wt+" câu chờ cô)":""}.`,null,1)}}catch(e){}}}
function cdRedo(){CDPRAC=true;CDV={f:{},v:{}};CDSHOW={};rr();scrollTo(0,0)}
function cdPracCheck(){const s=cdSet(),g=cdGrade(s);CDSHOW.prac=g;rr()}

/* ---------- giao diện ---------- */
const cdTag=t=>`<span class="cdtag cd-${t=="ĐÃ"?"da":t=="ĐANG"?"dg":"se"}">${t}</span>`;
function cdScale(s){const m=cdMax(s),lbl={fill:"Điền từ",tr:"Dịch Việt → Trung",qa:"Trả lời câu hỏi (3 đoạn văn)",say:"Nói về 阮明"},who={fill:"máy chấm",tr:"máy + cô",qa:"cô chấm",say:"máy + cô"};
 return `<div class="cdscale">${s.secs.map((sc,i)=>`<div><b>${m[sc.id]}</b><small>${i+1}. ${lbl[sc.kind]}<br><i>${who[sc.kind]}</i></small></div>`).join("")}<div class="cdtot"><b>100</b><small>Tổng · đạt từ ${s.pass}</small></div></div>`}
function cdRemind(s){return `<div class="cdrem"><table><tr><th></th><th>Thời gian</th><th>Cấu trúc</th><th>Phủ định</th></tr>${s.remind.map(r=>`<tr><td>${cdTag(r[0])}</td><td class="zh">${r[1]}</td><td class="zh">${r[2]}</td><td class="zh">${r[3]}</td></tr>`).join("")}</table>
<p class="cdwarn">⚠ <span class="zh">她买了不少衣服</span> (không viết 她买不少衣服了) · <span class="zh">我没买</span> (không viết 我不买 / 我没买了) · thời gian đứng TRƯỚC động từ: <span class="zh">你下午打吧</span></p></div>`}
function cdSec(s,sc,ix,G){const head=`<h3 class="cdh">${ix+1}. ${sc.t} <small>(${cdMax(s)[sc.id]} điểm)</small></h3><p class="ctx">${sc.note}</p>`;
 const P=G&&CDPRAC,mark=(ok,ref)=>P?(ok?`<span class="chb ok">✓</span>`:`<span class="chb no">✗</span>${ref?` <span class="zh">${ref}</span>`:""}`):"";
 if(sc.kind=="fill"){let n=0;return `<div class="card">${head}${sc.groups.map(g=>`<div class="cdbank">${g.bank.map(w=>`<span><b class="zh">${w[0]}</b> <small class="py">${w[1]}</small></span>`).join("")}</div>
${g.items.map(x=>{const k="f"+n,v=CDV.f[k]||"",gi=G?G.fill[n]:null;n++;const sel=`<select class="cdsel" onchange="cdF('${k}',this)"><option value="">— chọn —</option>${g.bank.map(w=>`<option ${v==w[0]?"selected":""}>${w[0]}</option>`).join("")}</select>`;
 const zh=x[0].split("___");return `<div class="cdq"><b>${n}.</b> <span class="zh">${zh[0]}</span>${sel}<span class="zh">${zh[1]||""}</span> ${P?mark(gi.ok,gi.ok?"":gi.a):""}<div class="py">${x[1]}</div></div>`}).join("")}`).join("")}</div>`}
 if(sc.kind=="tr")return `<div class="card">${head}${sc.items.map((x,i)=>{const k="t"+i,gi=G&&G.its.find(y=>y.k==k);return `<div class="cdq">${cdTag(x.tag)} <b>${i+1}.</b> ${x.vi}
<input class="cdin" value="${cdE(CDV.v[k]||"")}" oninput="cdIn('${k}',this)" placeholder="Viết câu tiếng Trung (chữ Hán)" autocomplete="off" autocapitalize="off">${P?(gi.st=="ok"?mark(1):`<span class="chb wt">Khác đáp án</span> <span class="zh">${x.ref}</span>`):""}</div>`}).join("")}</div>`;
 if(sc.kind=="qa"){let n=0;return `<div class="card">${head}${sc.groups.map(g=>`<div class="cdpara"><h4>${cdTag(g.tag)} <span class="zh">${g.t}</span> <small class="py">${g.zp}</small> · ${g.vi}</h4>
${g.items.map(x=>{const k="q"+n;n++;return `<div class="cdq"><b>${n}.</b> <span class="zh">${x[0]}</span> ${bS(x[0])}<div class="py">${x[1]}</div>
<textarea class="cdta" rows="1" oninput="cdIn('${k}',this)" onblur="cdQHint('${k}',this)" placeholder="Trả lời bằng câu đầy đủ" autocomplete="off" autocapitalize="off">${cdE(CDV.v[k]||"")}</textarea><div class="cdhint" id="cdh_${k}"></div>${P?`<div class="ans">Câu mẫu: <span class="zh">${x[2]}</span></div>`:""}</div>`}).join("")}</div>`).join("")}</div>`}
 if(sc.kind=="say")return `<div class="card">${head}<table class="cdtab">${sc.table.map(r=>`<tr><th><span class="zh">${r[0]}</span><div class="py">${r[1]}</div></th><td>${r[2].map(c=>`<div><span class="zh">${c[0]}：${c[2]}</span> <small class="py">${c[1]}: ${c[3]}</small></div>`).join("")}</td></tr>`).join("")}</table>
${sc.items.map((x,i)=>{const k="n"+i,gi=G&&G.its.find(y=>y.k==k);return `<div class="cdq">${cdTag(x.tag)} <b>${i+1}.</b> <span class="zh">${x.cue}</span> <small class="py">${x.cp}</small>
<div class="cdsay"><button class="btn o sm" id="cdm_${k}" onclick="cdMic('${k}')">🎤 Nói</button><input class="cdin" value="${cdE(CDV.v[k]||"")}" oninput="cdIn('${k}',this)" placeholder="Nói hoặc gõ một câu đầy đủ" autocomplete="off" autocapitalize="off"></div>${P?(gi.st=="ok"?mark(1):`<span class="chb wt">Khác đáp án</span> <span class="zh">${x.ref}</span>`):""}</div>`}).join("")}
${typeof srWarn=="function"&&srWarn()?`<p class="ctx">${srWarn()}</p>`:""}</div>`;return ""}
function cdForm(s){const G=CDSHOW.prac||null;
 return `${CDPRAC?`<div class="card note">↻ Em đang <b>luyện lại</b>: không tính điểm, không gửi cô. Làm xong bấm "Kiểm tra" để xem câu đúng / sai.</div>`:""}
${s.secs.map((sc,i)=>cdSec(s,sc,i,G)).join("")}
<div class="card cdnop">${CDPRAC?`<button class="btn" onclick="cdPracCheck()">✔ Kiểm tra</button> <button class="btn o" onclick="CDPRAC=false;CDSHOW={};CDV=cdDraft(cdSet());rr()">← Xem bài đã nộp</button>`
 :`<p>Làm xong bấm <b>Nộp bài cho cô</b>. Phần máy chấm có điểm ngay; câu khác đáp án và phần trả lời câu hỏi chờ cô chấm, điểm tự cập nhật.</p><button class="btn" onclick="cdNop()">📤 Nộp bài cho cô</button>${cdMe()?"":`<p class="ctx">Cần mã học viên để nộp. Bấm nút là hiện ô nhập mã.</p>`}`}</div>`}
function cdDone(s,rec){const sc=cdScore(s,rec),lbl={f:"Điền từ",t:"Dịch",q:"Trả lời câu hỏi",n:"Nói"},g=x=>x.g==null||x.g===""?0:+x.g;
 const box=(id,o)=>`<div><b>${o.p}/${o.m}</b><small>${lbl[id]}${o.wt?` · ⏳ ${o.wt} câu chờ cô`:""}</small></div>`;
 const fin=!sc.wt,pass=sc.tot>=s.pass;
 let h=`<div class="card chsum"><h4>📤 Em đã nộp bài lúc ${chT(rec.at)}</h4><div class="chsc cdsc">${Object.entries(sc.o).map(([k,o])=>box(k,o)).join("")}
<div class="cdtot ${fin?(pass?"ok":"no"):""}"><b>${sc.tot}/100</b><small>${fin?(pass?"✓ Đạt":"Chưa đạt (cần "+s.pass+")"):"Tạm tính"}</small></div></div>
${sc.wt?`<p class="chwt">⏳ Còn <b>${sc.wt} câu</b> chờ cô chấm. Điểm sẽ tự cập nhật.${rec.sent?"":` <b class="bad">Bài chưa gửi được, trang sẽ tự gửi lại.</b>`}</p>`:`<p class="okt">Cô đã chấm xong.</p>`}
${rec.msg?`<p class="bad">${rec.msg}</p>`:""}<div class="row"><button class="btn o sm" onclick="cdPoll(1)">↻ Xem cô đã chấm chưa</button></div></div>`;
 const fs=s.secs.find(x=>x.kind=="fill");if(fs){let n=0;const wr=[];fs.groups.forEach(gg=>gg.items.forEach(x=>{const f=rec.fill[n++];if(!f.ok)wr.push(`<div><b>${n}.</b> <span class="zh">${x[0].replace("___",`<u>${f.a}</u>`)}</span> · em chọn: <span class="bad">${f.v||"(bỏ trống)"}</span></div>`)}));
  h+=`<div class="card"><h4>1. Điền từ: ${rec.fill.filter(x=>x.ok).length}/${rec.fill.length} câu đúng</h4>${wr.length?wr.join(""):`<p class="okt">Đúng hết!</p>`}</div>`}
 h+=rec.it.map(x=>{const w=s.secs.find(c=>c.id==x.sec).w;return `<div class="card chit ${x.st=="cho"?"":x.st=="bo"?"no":+g(x)>=1||x.st=="ok"?"ok":"no"}"><small>${lbl[x.k[0]]} ${+x.k.slice(1)+1}</small> ${cdE(x.de)}
<div class="chmy"><small>Bài em:</small> <span class="zh">${x.v?cdE(x.v):"(bỏ trống)"}</span></div>${x.st=="bo"?`<span class="chb no">0 điểm · bỏ trống</span>`:chBadge(x)+` <small>${x.st=="cho"?"":g(x)*w+"/"+w+" điểm"}</small>`}
${x.nx&&!/chấp nhận/.test(x.nx)?`<div class="chnx">💬 Cô nhận xét: ${cdE(x.nx)}</div>`:""}
<div class="ans"><b>${x.k[0]=="q"?"Câu mẫu":"Đáp án tham khảo"}:</b> <span class="zh">${cdE(x.ref)}</span> ${bS(x.ref)}${x.rp?`<br><span class="py">${cdE(x.rp)}</span>`:""}</div></div>`}).join("");
 return h+`<div class="row c"><button class="btn o" onclick="cdRedo()">↻ Luyện lại (không tính điểm, không gửi cô)</button></div>`}
function cdView(){const s=cdSet(),rec=cdJ(cdNK(s),null);
 if(CDWAIT&&cdMe()){CDWAIT=false;setTimeout(cdNop,300)}
 return `<div class="row noprint"><button class="btn o sm" onclick="cdClose()">← Danh sách bài</button></div>
<div class="lhead"><span class="no">⏱</span><div><small>${s.scope}</small><div class="lt2">${s.t}</div><div><span class="zh">${s.zh}</span> · ${s.sub}</div></div></div>
${pvBar()}<div class="stack cdw ${hidePy?"hidepy":""} ${hideVi?"hidevi":""}">${rec&&!CDPRAC?cdDone(s,rec):`${cdScale(s)}${cdRemind(s)}${cdForm(s)}`}</div>`}

/* ô chuyên đề chèn ngay sau ô Bài <after> */
const _cdLessons=lessons;lessons=function(mode){let h=_cdLessons(mode);const L=CD[cdLv()];if(mode!="ol"||!L)return h;
 L.forEach(s=>{const rec=cdJ(cdNK(s),null),sc=rec?cdScore(s,rec):null;
  const tile=`<div class="ls go cdls" onclick="cdOpen('${s.key}')"><b>⏱ ${s.t}</b><span class="lt">${s.sub}</span><small>${sc?`<i class="sc ${sc.wt?"no":sc.tot>=s.pass?"ok":"no"}">${sc.tot}/100${sc.wt?" · chờ cô":""}</i>`:"Làm bài →"}</small></div>`;
  const re=new RegExp(`(<div class="ls[^"]*"[^>]*openL\\(${s.after}\\)[^>]*>[\\s\\S]*?</small></div>)`);
  h=re.test(h)?h.replace(re,"$1"+tile):h.replace(/<\/div>$/,tile+"</div>")});return h};
const _cdDrawOl=drawOl;drawOl=function(){if(CDON&&!cur&&cdSet()){$("lp-ol").innerHTML=cdView();return}return _cdDrawOl()};
const _cdSetLv=setLv;setLv=function(l){CDON=null;return _cdSetLv(l)};
const _cdOpenL=openL;openL=function(n){CDON=null;return _cdOpenL(n)};
const _cdGoSub=goSub;goSub=function(id){if(id=="ol")CDON=null;return _cdGoSub(id)};
const _cdCrumb=crumbDraw;crumbDraw=function(){_cdCrumb();const c=$("crumb");if(!c||typeof SUBC=="undefined"||SUBC!="ol"||!CDON||cur)return;const s=cdSet();if(!s)return;
 c.innerHTML=`<a onclick="goSub('ol')">Ôn luyện theo bài</a> › <a onclick="cdClose()">${typeof shN=="function"?shN(olLv):"Danh sách bài"}</a> › ${s.t}`};
setTimeout(()=>cdPoll(),4000);
(function(){const st=document.createElement("style");st.textContent=`
.cdls{grid-column:1/-1;background:linear-gradient(120deg,#5c1730,#8e2a4f)!important;color:#fff!important;border:2px solid #c9a227!important;display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}
.cdls b{color:#f3d77a!important;font-size:1.1rem}.cdls .lt{color:#fff!important}.cdls small{color:#f3e2b8!important}
.cdw .card{margin:12px 0}.cdh{margin:0 0 4px;color:var(--m)}.cdh small{color:var(--sub);font-weight:600}
.cdscale{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:10px 0}.cdscale>div{background:var(--k);border:1px solid var(--b);border-radius:12px;padding:8px;text-align:center}
.cdscale b,.cdsc b{display:block;font-size:1.3rem;color:var(--m)}.cdscale small,.cdsc small{display:block;font-size:.8rem;color:var(--sub);line-height:1.3}.cdscale i{font-style:normal;color:#8a6a10}
.cdtot{background:linear-gradient(120deg,#5c1730,#8e2a4f)!important;border-color:#c9a227!important}.cdtot b,.cdtot small{color:#fff!important}.cdtot.ok{background:#2f7a3c!important}.cdtot.no{background:#a33!important}
.cdsc{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px}.cdsc>div{background:var(--k);border-radius:12px;padding:8px;text-align:center}
.cdrem table{width:100%;border-collapse:collapse;font-size:.92rem}.cdrem th{background:#8e2a4f;color:#fff;padding:6px;text-align:left}.cdrem td{border-bottom:1px solid var(--b);padding:6px;vertical-align:top}
.cdwarn{color:#a33;font-size:.9rem;margin:6px 0}
.cdtag{display:inline-block;font-size:.72rem;font-weight:800;border-radius:20px;padding:1px 8px;color:#fff;vertical-align:middle}.cd-da{background:#8e2a4f}.cd-dg{background:#2f7a3c}.cd-se{background:#c9a227;color:#3a2a10}
.cdbank{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;background:#fbf0d2;border:1px dashed #c9a227;border-radius:12px;padding:8px;margin:10px 0;color:#3a2a10}
.cdbank span{background:#fff;border-radius:20px;padding:2px 10px}.cdbank .zh{font-size:1.1rem}
.cdq{padding:8px 0;border-bottom:1px dashed var(--b)}.cdq:last-child{border-bottom:0}.cdq .zh{font-size:1.12rem}.cdq .py{font-size:.85rem;color:var(--sub)}
.cdsel{font:inherit;font-size:1rem;margin:0 6px;padding:4px 6px;border-radius:8px;border:2px solid #c9a227;background:var(--c);color:var(--t)}
.cdin,.cdta{display:block;width:100%;box-sizing:border-box;margin:6px 0 2px;padding:8px 10px;border-radius:10px;border:1px solid var(--b);font:inherit;font-size:1.05rem;background:var(--c);color:var(--t)}
.cdta{resize:vertical;min-height:42px}.cdhint{font-size:.85rem;color:#8a5a10}
.cdpara{margin:10px 0 4px}.cdpara h4{margin:6px 0;color:var(--m)}
.cdtab{width:100%;border-collapse:collapse;margin:8px 0 12px}.cdtab th{background:#fbf0d2;color:#5c1730;width:90px;padding:6px;border:1px solid var(--b)}.cdtab td{padding:6px 10px;border:1px solid var(--b)}.cdtab td div{margin:2px 0}
.cdsay{display:flex;gap:8px;align-items:center}.cdsay .cdin{margin:6px 0}
.cdnop{text-align:center}
@media(max-width:640px){.cdscale{grid-template-columns:repeat(2,1fr)}.cdscale .cdtot{grid-column:1/-1}.cdtab th{width:64px}.cdsel{margin:4px 2px}}`;document.head.appendChild(st)})();
