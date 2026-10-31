/* ===== HSK4 + Mở rộng H4: Ngữ pháp · Dạng B (dịch Việt → Trung) nộp bài cho cô chấm · thêm 31/10/2026 =====
   Giống phần Ngữ pháp · Mẫu câu của HSK1–3 (js/cham.js): câu trùng đáp án máy chấm đúng; câu khác → máy soát gợi ý (sửa 1 lần)
   → ⏳ Chờ cô chấm. Bấm "📤 Nộp bài cho cô" (cần mã học viên; chưa có mã thì bấm nộp → nhập mã → nộp luôn).
   Bỏ nút học viên tự xác nhận "đúng ý". Dạng A (sắp xếp) giữ nguyên, kết quả lần làm đầu gửi kèm.
   Bài nộp cùng định dạng với cham.js (ct_gxn_{cấp}_{bài}, API vnop / vkq), cô chấm ở tab "✍ Chấm bài" như các cấp khác.
   Nạp SAU js/hsk4.js và js/cham.js. Ghi đè h4Gp, h4TrCk, h4TrSelf. ===== */
(function(){
if(typeof h4Gp!="function"||typeof chDone!="function")return;
const _h4Gp=h4Gp;
let H4W=false;
const h4On=()=>chMe()&&!H.prac;
const h4Srv=()=>typeof trkOn=="function"&&trkOn();
const h4St=()=>{H.trS=H.trS||{};H.trH=H.trH||{};H.trN=H.trN||{};H.trSa=H.trSa||{};if(!H.chL){H.chL=1;chLoadOk(chLv(),cur)}};
const h4Refs=it=>it.a.concat([it.r[0]]);
const h4Hit=(it,v)=>h4Refs(it).some(a=>gH(a)===gH(v))||gN(it.r[1])===gN(v);
const h4Has=k=>!!gN(H.tr[k]||"");
const h4Sod=()=>{const L=HL(),so=ldN(cur).so||{};return L.so.map((_,k)=>so[k]==null?null:so[k]===1)};
function h4Clear(prac){const L=HL();H.tr={};H.trS={};H.trH={};H.trN={};H.trSa={};H.prac=!!prac;H.cont=false;h4SoInit(L)}
function h4GuestSave(k,ok){if(H.prac||chMe())return;h4Save(r=>{r.trk=r.trk||{};if(r.trk[k]==null)r.trk[k]=ok?1:0;h4GpScore(r)})}

h4TrCk=function(k){h4St();const it=HL().tr[k],v=H.tr[k]||"";if(!gN(v))return ask("Em hãy viết câu dịch trước khi kiểm tra.",null,1);
 if(h4Hit(it,v)){H.trS[k]="ok";H.trH[k]=[];h4GuestSave(k,1);return rr()}
 const Ln=chLearn("t"+k,v);
 if(Ln&&Ln.g>=1){H.trS[k]="ok";H.trH[k]=[];H.trS["lc"+k]=1;h4GuestSave(k,1);return rr()}
 const h=Ln?[`Cô đã chấm cách viết này: <b>${chG(Ln.g)}</b>${Ln.nx?" · "+chE(Ln.nx):""}. Em thử sửa lại nhé.`]:chHints(v,it.r[0],it.vi,null);
 if(!H.prac&&h.length&&!(H.trN[k]>=1)){H.trN[k]=(H.trN[k]||0)+1;H.trS[k]="hint";H.trH[k]=h;return rr()}
 H.trH[k]=h;H.trS[k]=h4On()?"cho":"ref";if(H.trS[k]=="ref")h4GuestSave(k,0);rr()};
h4TrSelf=function(k){h4TrCk(k)};
window.h4cSend=function(k){h4St();if(!h4Has(k))return ask("Em hãy viết câu trả lời trước.",null,1);H.trS[k]=h4On()?"cho":"ref";if(H.trS[k]=="ref")h4GuestSave(k,0);rr()};
window.h4cEdit=function(k){h4St();H.trS[k]=null;H.trS["lc"+k]=0;rr()};

/* ---------- nộp ---------- */
const h4Ready=()=>{const L=HL(),rec=H.cont?chFix(chRec()):null,old=rec&&rec.sod||[];
 return h4Sod().some((v,k)=>v!=null&&old[k]==null)||L.tr.some((_,k)=>h4Has(k)&&H.trS[k]!="sub")};
window.h4Nop=function(){if(!chMe()){if(!h4Srv())return;H4W=true;return trkOpen()}H4W=false;h4St();
 if(!h4Ready())return ask("Em làm ít nhất một câu rồi mới nộp nhé.",null,1);
 const L=HL(),bS0=h4Sod().filter(v=>v==null).length,bT=L.tr.filter((_,k)=>!h4Has(k)).length,miss=[bS0?bS0+" câu sắp xếp":"",bT?bT+" câu dịch":""].filter(Boolean);
 ask(`${H.cont?"Nộp tiếp phần em vừa làm":"Nộp bài cho cô"}? Sau khi nộp em <b>không sửa được</b> câu đã nộp.${miss.length?`<br>Em chưa làm: <b>${miss.join(", ")}</b>. Phần chưa làm không tính điểm, buổi sau em vẫn nộp tiếp được.`:""}`,h4NopGo)};
function h4NopGo(){const L=HL(),lv=chLv(),b=cur,sid="N"+trkId(),now=Date.now();h4St();
 L.tr.forEach((it,k)=>{const st=H.trS[k];if(st=="sub")return;if(!h4Has(k)){H.trS[k]="bo";return}if(st=="ok"||st=="cho")return;
  const Ln=chLearn("t"+k,H.tr[k]);if(h4Hit(it,H.tr[k])||(Ln&&Ln.g>=1)){H.trS[k]="ok";if(Ln&&Ln.g>=1&&!h4Hit(it,H.tr[k]))H.trS["lc"+k]=1}else H.trS[k]="cho"});
 const it=L.tr.map((x,k)=>{const st=H.trS[k];return {k:"t"+k,d:"tr",de:x.vi,ref:x.r[0],rp:x.r[1],img:"",v:String(H.tr[k]||"").trim(),key:chKey(H.tr[k]||""),st,g:st=="ok"?1:null,
  nx:H.trS["lc"+k]?"Cô đã chấp nhận cách viết này":"",h:(H.trH[k]||[]).map(trkTxt),sid:st=="bo"?"":sid}}).filter(x=>x.st!="sub"),sod=h4Sod();
 let rec=H.cont?chFix(chRec()):null;
 if(rec){rec.sod=(rec.sod||[]).length?rec.sod.map((v,i)=>v!=null?v:sod[i]):sod;
  it.forEach(x=>{const o=rec.it.find(y=>y.k==x.k);if(o&&o.st=="bo"&&x.st!="bo")Object.assign(o,x)});
  rec.so={ok:rec.sod.filter(v=>v===true).length,n:rec.sod.filter(v=>v!=null).length,all:L.so.length};rec.parts.push({sid,at:now,sent:false});rec.seen=true}
 else rec={sid,at:now,lv,olv:olLv,b,ten:chTen(),so:{ok:sod.filter(v=>v===true).length,n:sod.filter(v=>v!=null).length,all:L.so.length},sod,it,parts:[{sid,at:now,sent:false}],seen:true};
 chPut(chSK(lv,b),rec);chApply(rec);h4Clear(false);rr();chUp(rec)}
window.h4cCont=function(){const rec=chFix(chRec());if(!rec)return;h4Clear(false);H.cont=true;
 rec.it.forEach(x=>{if(x.st=="bo")return;const k=+x.k.slice(1);H.tr[k]=x.v;H.trS[k]="sub"});rr()};
window.h4cPrac=function(){h4Clear(true);rr()};

/* ---------- giao diện ---------- */
function h4Item(it,k){const st=H.trS[k],v=H.tr[k]||"",lock=st&&st!="hint";
 const refH=`<div class="ans"><b>Đáp án tham khảo:</b><div class="zh">${it.r[0]} ${bS(it.r[0])}</div><div class="py" style="display:block">${it.r[1]}</div></div>`;
 let fb="",btn="";
 if(st=="sub")return `<div class="card q chsub"><b>Câu ${k+1}.</b> ${it.vi}<textarea class="tin h4ta" rows="2" disabled>${esc(v)}</textarea><div class="chwt">📤 Câu này em đã nộp lần trước.</div></div>`;
 if(st=="ok"){fb=`<div class="okt">✓ Đúng rồi!${H.trS["lc"+k]?" (Cô đã chấp nhận cách viết này.)":" Khớp với đáp án."}</div>`+refH;btn=`<button class="btn o sm" onclick="h4cEdit(${k})">${h4On()?"✎ Sửa":"↻ Làm lại"}</button>`}
 else if(st=="hint"){fb=`<div class="chhint"><b>🔎 Máy soát giúp em:</b><ul>${H.trH[k].map(x=>`<li>${x}</li>`).join("")}</ul><small>Đây chỉ là gợi ý. Em sửa rồi bấm Kiểm tra lại, hoặc giữ nguyên và gửi cô chấm.</small></div>`;
  btn=`<button class="btn sm" onclick="h4TrCk(${k})">Kiểm tra lại</button><button class="btn o sm" onclick="h4cSend(${k})">${h4On()?"Giữ nguyên, gửi cô chấm":"Giữ nguyên"}</button>`}
 else if(st=="cho"){fb=`<div class="chwt">⏳ Câu này cô sẽ chấm sau khi em nộp bài.${H.trH[k]&&H.trH[k].length?` <small>(Máy vẫn còn lưu ý: ${H.trH[k].map(trkTxt).join(" · ")})</small>`:""}</div>`;btn=`<button class="btn o sm" onclick="h4cEdit(${k})">✎ Sửa câu này</button>`}
 else if(st=="ref"){const gui=!H.prac&&h4Srv();
  fb=`<div class="ctx">${H.prac?"Đang luyện lại: em tự đối chiếu với đáp án.":gui?"⏳ Câu của em khác đáp án mẫu, có thể vẫn đúng. Em bấm <b>📤 Nộp bài cho cô</b> ở cuối bài để cô chấm câu này.":"Câu của em khác đáp án mẫu, có thể vẫn đúng."}</div>${H.trH[k]&&H.trH[k].length?`<div class="chhint"><ul>${H.trH[k].map(x=>`<li>${x}</li>`).join("")}</ul></div>`:""}`
   +(gui&&!H.trSa[k]?`<div class="row"><button class="btn o sm" onclick="H.trSa[${k}]=1;rr()">👁 Xem đáp án tham khảo</button><small class="ctx">Nên nộp cho cô chấm trước rồi hãy xem.</small></div>`:refH);
  btn=`<button class="btn o sm" onclick="h4cEdit(${k})">↻ Làm lại</button>`}
 else btn=`<button class="btn sm" onclick="h4TrCk(${k})">Kiểm tra</button>`;
 return `<div class="card q ${st=="ok"?"ok":""}"><b>Câu ${k+1}.</b> ${it.vi}<div class="ctx">Gợi ý cấu trúc: <span class="zh">${it.g}</span></div>
<textarea class="tin h4ta" rows="2" id="h4tr-${k}" oninput="H.tr[${k}]=this.value" ${lock?"disabled":""} placeholder="Viết câu tiếng Trung…">${esc(v)}</textarea>${fb}<div class="row">${btn}</div></div>`}

function h4Done(rec){let o=chDone(rec).replace(/onclick="chCont\(\)"/g,'onclick="h4cCont()"');
 const i=o.lastIndexOf(`<div class="row c"><button class="btn o" onclick="GX=null;gxInit()`);if(i>0)o=o.slice(0,i);
 return o+`<div class="row c"><button class="btn o" onclick="h4cPrac()">↻ Luyện lại (không tính điểm, không gửi cô)</button></div>`+h4Next("gp")}

h4Gp=function(L,r){h4St();const rec=chRec();
 if(rec&&chMe()&&!H.prac&&!H.cont){H4W=false;const o=_h4Gp(L,r),a=o.indexOf(`<div class="card note"><b>Dạng A`);return (a>0?o.slice(0,a):"")+h4Done(rec)}
 if(H4W&&chMe()){H4W=false;setTimeout(h4Nop,300)}
 const o=_h4Gp(L,r),a=o.indexOf(`<div class="card note"><b>Dạng A`),bI=o.indexOf(`<div class="card note"><b>Dạng B`);
 let h=a>0?o.slice(0,a):"";
 if(H.cont)h+=`<div class="card note">➕ Em đang <b>làm tiếp phần chưa làm</b>. Câu đã nộp được khóa lại. Làm xong bấm <b>Nộp tiếp</b> ở cuối. <button class="btn o sm" onclick="H.cont=false;rr()">← Xem bài đã nộp</button></div>`;
 else if(H.prac)h+=`<div class="card note">↻ Em đang <b>luyện lại</b>, không tính điểm, không gửi cô.${rec&&chMe()?` <button class="btn o sm" onclick="h4Clear0()">← Xem bài đã nộp</button>`:""}</div>`;
 else if(!chMe()&&h4Srv())h+=`<div class="card trkban"><span>🔑 Học viên lớp cô Thảo nhập <b>mã học viên</b> để nộp bài, cô chấm câu dịch cho em.</span><button class="btn sm" onclick="trkOpen()">Nhập mã</button></div>`;
 else if(chMe())h+=`<div class="card note">📤 Làm xong dạng A và B thì bấm <b>Nộp bài cho cô</b> ở cuối. Câu máy chưa chấm được cô sẽ chấm.</div>`;
 h+=a>0&&bI>a?o.slice(a,bI):"";
 h+=`<div class="card note"><b>Dạng B · Dịch câu Việt → Trung</b><br>Viết bằng <b>chữ Hán</b> (hoặc pinyin không dấu). Câu trùng đáp án máy chấm luôn; câu viết khác, máy soát lỗi gợi ý rồi gửi cô chấm (một câu có thể có nhiều cách dịch đúng).</div>`;
 h+=L.tr.map((it,k)=>h4Item(it,k)).join("");
 const sod=h4Sod(),all=L.so.length+L.tr.length,dn=sod.filter(v=>v!=null).length+L.tr.filter((_,k)=>h4Has(k)).length;
 const card=lb=>`<div class="card res chnop"><p>Đã làm <b>${dn}/${all}</b> câu.${lb}</p><div class="row c"><button class="btn" onclick="h4Nop()" ${h4Ready()?"":"disabled"}>📤 ${H.cont?"Nộp tiếp cho cô":"Nộp bài cho cô"}</button></div>`;
 if(h4On())h+=card(dn<all?" Hết giờ thì em vẫn nộp được, phần chưa làm không tính điểm.":"")+`</div>`;
 else{if(!H.prac&&h4Srv())h+=card(" Máy chỉ chấm được câu trùng đáp án; câu em viết khác, <b>cô sẽ chấm</b> khi em nộp bài.")+`<small class="ctx">Cần <b>mã học viên</b> cô Thảo đã gửi. Bấm nộp, nhập mã, bài em làm vẫn giữ nguyên.</small></div>`;
  const ok=sod.filter(v=>v===true).length+L.tr.filter((_,k)=>H.trS[k]=="ok").length,dd=sod.filter(v=>v!=null).length+L.tr.filter((_,k)=>H.trS[k]=="ok"||H.trS[k]=="ref").length;
  h+=dd>=all?`<p>Máy chấm được <b>${ok}/${all}</b> câu (sắp xếp + dịch trùng đáp án).${H.prac?" Bài luyện lại không tính điểm.":r.gp!=null?` Điểm ngữ pháp: <b>${r.gp}%</b>.`:""}</p>`:`<p class="ctx">Đã làm ${dd}/${all} câu dạng A và B.</p>`}
 return h+h4Next("gp")};
window.h4Clear0=function(){h4Clear(false);rr()};
window.h4Clear=h4Clear;
})();
