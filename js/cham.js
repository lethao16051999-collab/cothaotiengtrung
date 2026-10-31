/* ===== Chấm bài Dịch Việt → Trung + Miêu tả tranh (phần Ngữ pháp · Mẫu câu) · thêm 28/10/2026 =====
   Học viên: máy chấm Đúng khi câu trùng đáp án (sách / cô đã chấp nhận); câu khác → máy soát lỗi gợi ý (sửa 1 lần) → "Chờ cô chấm".
   Làm xong bấm "📤 Nộp bài cho cô" (cần mã học viên). Nộp 1 lần là bài chính thức; sau đó chỉ luyện lại, không gửi.
   Cô: Bảng theo dõi › tab "✍ Chấm bài": bài làm gộp theo câu, câu giống nhau gộp 1 dòng, chấm ✓ / ½ / ✗ + nhận xét nhanh.
   Câu cô đã chấm được ghi vào trang tính "Đáp án học": bạn sau viết giống thế thì máy chấm theo cô.
   Máy chủ: đoạn mã chamApi_ (file huong-dan/cham-api.gs.txt) dán vào Code.gs.
   Nạp SAU js/track.js (và sau js/theodoi.js nếu trang có). Ghi đè gxHtml, gxSave, gxTrCheck, gxPcSub của js/app.js. ===== */
const CHV=2,CHOK={},CHG={tab:false,data:null,busy:false,err:"",mode:"cho",bai:"",hide:false,q:{},tc:{},qt:null,saving:false,saved:0,cnt:null,code:""};
const chLv=()=>typeof trkLv=="function"?trkLv():olLv;
const chSrv=()=>typeof TRK_API!="undefined"&&!!TRK_API;
const chMe=()=>typeof trkIn=="function"&&trkIn();
const chKey=v=>hasHan(v)?gH(v):"py:"+gN(v);
const chE=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const chSK=(lv,b)=>"ct_gxn_"+lv+"_"+b;
const chJ=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const chPut=(k,o)=>{try{localStorage.setItem(k,JSON.stringify(o))}catch(e){}};
const chTen=()=>{try{const t=LTS[olLv]&&LTS[olLv][cur-1];return t?t.split("|")[0]:""}catch(e){return ""}};
const chT=ms=>{if(!ms)return"";const d=new Date(ms),p=n=>String(n).padStart(2,"0");return `${p(d.getHours())}:${p(d.getMinutes())} ${p(d.getDate())}/${p(d.getMonth()+1)}`};
const chG=g=>g==null||g===""?"":g>=1?"✓":g>0?"½":"✗";
async function chPost(o){const r=await fetch(TRK_API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o),redirect:"follow"});return r.json()}

/* ---------- Soát lỗi: gợi ý, KHÔNG chấm sai ---------- */
const CHMK=[["了",/了解|为了|除了|了不起/g],["过",/难过|过年|不过|过来|过去/g],["着",/着急|睡着/g],["的",/的确|目的/g],["地",/地方|地铁|地图|地址/g],["得",/觉得|记得|得到|获得|懂得/g],
 ["吧",null],["吗",null],["呢",null],["比",/比较|比赛/g],["没有",null],["还是",null],["把",null],["被",null],["给",null],["就",null],["才",/刚才|人才/g],["都",/首都/g],["也",null],["又",null],
 ["越来越",null],["虽然",null],["但是",null],["因为",null],["所以",null],["如果",null],["最",/最近|最后/g],["更",null],["已经",null],["正在",null],["一点儿",null],["有点儿",null],["是",/还是|但是|可是|就是|要是|不是/g]];
const CHQW=/吗|呢|吧|什么|谁|哪|几|多少|怎么|为什么|还是|多大|多长|多久|(.)不\1|(.)没\2/;
function chHints(v,ref,vi,kw){const h=[],han=hasHan(v);
 if(kw)kw.forEach(g=>{if(!g.m.some(m=>hasKw(v,m)))h.push(`Yêu cầu dùng <b>${g.l}</b>, câu của em chưa có.`)});
 if(!han){if(!h.length&&gN(v).length<gN(ref).length*0.4)h.push("Câu của em hơi ngắn, em xem đã đủ ý chưa.");return h}
 const rc=ref.replace(/[，。！？、,.!?\s]/g,""),vc=v.replace(/[，。！？、,.!?\s]/g,"");
 if(/是很|很是/.test(vc)&&!/是很|很是/.test(rc))h.push("Trước tính từ không cần <b>是</b>: 我很忙, không nói 我是很忙.");
 if(/没[^，。！？,.!?]*了/.test(vc)&&!/没[^，。！？]*了/.test(rc))h.push("<b>没</b> (chưa / không làm) thường không đi với <b>了</b>: 我没去, không nói 我没去了.");
 if(/吗/.test(vc)&&/什么|谁|哪|几|多少|怎么|为什么/.test(vc))h.push("Câu đã có từ để hỏi (什么, 谁, 哪儿, 几…) thì không thêm <b>吗</b>.");
 if(/[?？]\s*\)?\s*$/.test(String(vi).replace(/\([^)]*\)\s*$/,"").trim())&&!CHQW.test(vc))h.push("Câu tiếng Việt là câu hỏi, câu của em chưa có <b>吗</b> hoặc từ để hỏi.");
 let n=0;for(const[m,ex]of CHMK){if(n>=2)break;const a=ex?rc.replace(ex,""):rc,b=ex?vc.replace(ex,""):vc;
  if(a.includes(m)&&!b.includes(m)&&!(kw&&kw.some(g=>g.m.some(x=>x[0]==m)))){h.push(`Câu tham khảo có dùng <b>${m}</b>. Em xem câu của mình có cần không.`);n++}}
 if(vc.length<rc.length*0.5)h.push("Câu của em hơi ngắn so với câu cần viết, em xem đã đủ ý chưa.");
 return h.slice(0,3)}

/* ---------- đáp án cô đã chấm (học dần) ---------- */
async function chLoadOk(lv,b){const k=lv+"-"+b;if(CHOK[k]||!chSrv())return;CHOK[k]={};
 try{const r=await chPost({a:"vdung",lv,b});if(r&&r.ok&&r.v){(r.ds||[]).forEach(x=>CHOK[k][x.k+"|"+x.key]={g:+x.g,nx:x.nx||""})}}catch(e){}}
const chLearn=(k,v)=>{const m=CHOK[chLv()+"-"+cur];return m?m[k+"|"+chKey(v)]:null};

/* ---------- trạng thái làm bài ---------- */
const chRec=()=>chJ(chSK(chLv(),cur),null);
function chPrep(){if(!GX.ch){GX.ch=1;GX.prac=false;GX.tr.forEach(t=>{t.h=[];t.n=0});GX.pc.forEach(t=>{t.st=null;t.h=[];t.n=0});chLoadOk(chLv(),cur).then(()=>{})}}
const chOn=()=>chMe()&&!GX.prac;   /* đang làm bài chính thức có gửi cô */
function chCheck(kind,k){const d=GXD[GX.k][kind][k],t=GX[kind][k];
 if(!gN(t.v))return ask("Em hãy viết câu trả lời trước khi kiểm tra.",null,1);
 const refs=kind=="tr"?d.a.concat([d.r[0]]):d.r.map(r=>r[0]),pys=kind=="tr"?[d.r[1]]:d.r.map(r=>r[1]);
 if(refs.some(a=>gH(a)===gH(t.v))||pys.some(p=>gN(p)===gN(t.v))){t.st="ok";t.h=[];chSave();return rr()}
 const L=chLearn((kind=="tr"?"t":"p")+k,t.v);
 if(L&&L.g>=1){t.st="ok";t.h=[];t.lc=1;chSave();return rr()}
 let h=L?[`Cô đã chấm cách viết này: <b>${chG(L.g)}</b>${L.nx?" · "+chE(L.nx):""}. Em thử sửa lại nhé.`]:chHints(t.v,kind=="tr"?d.r[0]:d.r[0][0],kind=="tr"?d.vi:"",kind=="pc"?d.kw:null);
 if(h.length&&t.n<1){t.n++;t.st="hint";t.h=h;return rr()}
 t.h=h;t.st=chOn()?"cho":"ref";chSave();rr()}
function chSend(kind,k){const t=GX[kind][k];if(!gN(t.v))return ask("Em hãy viết câu trả lời trước.",null,1);t.st=chOn()?"cho":"ref";chSave();rr()}
function chEdit(kind,k){const t=GX[kind][k];t.st=null;t.lc=0;rr()}
gxTrCheck=k=>chCheck("tr",k);
gxPcSub=k=>chCheck("pc",k);

/* điểm: chỉ lưu khi luyện không có mã (khách); học viên có mã → lưu khi nộp và khi cô chấm xong */
gxSave=chSave;
function chSave(){if(!GX||GX.prac||chMe())return;
 const done=GX.so.every(s=>s.first!=null)&&GX.tr.every(t=>t.st=="ok"||t.st=="ref");if(!done)return;
 const ok=GX.so.filter(s=>s.first).length+GX.tr.filter(t=>t.st=="ok").length,r=ldN(cur);r.gp=Math.round(ok/(GX.so.length+GX.tr.length)*100);svN(cur,r)}
function chApply(rec){if(!rec||rec.olv!=olLv)return;const r=ldN(rec.b);let tr=rec.it.filter(x=>x.d=="tr"),pc=rec.it.filter(x=>x.d=="pc");
 const g=x=>x.g==null||x.g===""?0:+x.g;tr=tr.filter(x=>x.st!="bo");pc=pc.filter(x=>x.st!="bo");const nn=rec.so.n+tr.length;
 if(nn){r.gp=Math.round((rec.so.ok+tr.reduce((a,x)=>a+g(x),0))/nn*100);r.gpn=nn}
 r.gpw=rec.it.filter(x=>x.st=="cho").length;if(pc.length&&pc.every(x=>x.st!="cho"))r.gpt=Math.round(pc.reduce((a,x)=>a+g(x),0)/pc.length*100);svN(rec.b,r)}

/* ---------- nộp bài ---------- */
const chHas=t=>!!gN(t.v);
const chNew=t=>chHas(t)&&t.st!="sub";
const chReady=()=>GX.so.some(s=>s.first!=null&&!s.sub)||GX.tr.some(chNew)||GX.pc.some(chNew);
function chFin(kind){GX[kind].forEach((t,k)=>{if(t.st=="sub")return;if(!chHas(t)){t.st="bo";return}if(t.st=="ok"||t.st=="cho")return;
 const d=GXD[GX.k][kind][k],refs=kind=="tr"?d.a.concat([d.r[0]]):d.r.map(r=>r[0]),pys=kind=="tr"?[d.r[1]]:d.r.map(r=>r[1]),L=chLearn((kind=="tr"?"t":"p")+k,t.v);
 if(refs.some(a=>gH(a)===gH(t.v))||pys.some(p=>gN(p)===gN(t.v))||(L&&L.g>=1)){t.st="ok";if(L&&L.g>=1&&!refs.some(a=>gH(a)===gH(t.v)))t.lc=1}else t.st="cho"})}
let CHWAIT=false;
function chNop(){if(!chMe()){if(!(typeof trkOn=="function"&&trkOn()))return;CHWAIT=true;return trkOpen()}CHWAIT=false;if(!chReady())return ask("Em làm ít nhất một câu rồi mới nộp nhé.",null,1);
 const bS0=GX.so.filter(s=>s.first==null).length,bT=GX.tr.filter(t=>!chHas(t)).length,bP=GX.pc.filter(t=>!chHas(t)).length,miss=[bS0?bS0+" câu sắp xếp":"",bT?bT+" câu dịch":"",bP?bP+" tranh":""].filter(Boolean);
 ask(`${GX.cont?"Nộp tiếp phần em vừa làm":"Nộp bài cho cô"}? Sau khi nộp em <b>không sửa được</b> câu đã nộp.${miss.length?`<br>Em chưa làm: <b>${miss.join(", ")}</b>. Phần chưa làm không tính điểm, buổi sau em vẫn nộp tiếp được.`:""}`,chNopGo)}
function chItObj(kind,x,k,sid){const t=GX[kind][k],tr=kind=="tr";return {k:(tr?"t":"p")+k,d:kind,de:tr?x.vi:x.req,ref:tr?x.r[0]:x.r[0][0],rp:tr?x.r[1]:x.r[0][1],
 img:!tr&&x.img?(GXIMG[x.img]&&!/^data:/.test(GXIMG[x.img])?GXIMG[x.img]:"img/gx/"+x.img+".webp"):"",v:t.v.trim(),key:chKey(t.v),st:t.st,g:t.st=="ok"?1:null,
 nx:t.lc?"Cô đã chấp nhận cách viết này":"",h:(t.h||[]).map(trkTxt),sid:t.st=="bo"?"":sid}}
/* bài cũ (chưa có parts) → đổi sang dạng nhiều lần nộp */
function chFix(rec){if(rec&&!rec.parts){rec.parts=[{sid:rec.sid,at:rec.at,sent:!!rec.sent}];rec.it.forEach(x=>{if(x.st!="bo"&&!x.sid)x.sid=rec.sid})}return rec}
function chNopGo(){chFin("tr");chFin("pc");const d=GXD[GX.k],lv=chLv(),b=cur,sid="N"+trkId(),now=Date.now();
 const it=d.tr.map((x,k)=>chItObj("tr",x,k,sid)).concat(d.pc.map((x,k)=>chItObj("pc",x,k,sid))),sod=GX.so.map(s=>s.first==null?null:!!s.first);
 let rec=GX.cont?chFix(chRec()):null;
 if(rec){/* nộp tiếp: chỉ thêm phần mới làm */
  rec.sod=(rec.sod||[]).length?rec.sod.map((v,i)=>v!=null?v:sod[i]):sod;
  it.forEach(x=>{const o=rec.it.find(y=>y.k==x.k);if(o&&o.st=="bo"&&x.st!="bo")Object.assign(o,x)});
  rec.so={ok:rec.sod.filter(v=>v===true).length,n:rec.sod.filter(v=>v!=null).length,all:GX.so.length};rec.parts.push({sid,at:now,sent:false});rec.seen=true}
 else rec={sid,at:now,lv,olv:olLv,b,ten:chTen(),so:{ok:sod.filter(v=>v===true).length,n:sod.filter(v=>v!=null).length,all:GX.so.length},sod,it,parts:[{sid,at:now,sent:false}],seen:true};
 chPut(chSK(lv,b),rec);chApply(rec);GX=null;rr();chUp(rec)}
async function chUp(rec){if(!chMe()||!chSrv())return;chFix(rec);
 for(const p of rec.parts.filter(p=>!p.sent)){const its=rec.it.filter(x=>x.sid==p.sid);
  try{const r=await chPost({a:"vnop",code:TRKME.code,sid:p.sid,lv:rec.lv,b:rec.b,ten:rec.ten,so:rec.so,it:its.map(x=>({k:x.k,d:x.d,de:x.de,ref:x.ref,rp:x.rp,img:x.img,v:x.v,key:x.key,st:x.st}))});
   if(r&&r.ok&&r.v){p.sent=true;rec.msg="";(r.it||[]).forEach(s=>{const x=its.find(y=>y.k==s.k);if(x&&x.st!="ok"){x.st=s.st;x.g=s.g;x.nx=s.nx||x.nx}});
    trkEv({t:rec.parts.length>1&&p!==rec.parts[0]?"Nộp tiếp bài Ngữ pháp":"Nộp bài Ngữ pháp",lv:rec.lv,b:rec.b,s:`Sắp xếp ${rec.so.ok}/${rec.so.n} · gửi ${its.length} câu · chờ cô ${its.filter(x=>x.st=="cho").length}`})}
   else if(r&&r.err=="no_code")rec.msg="Mã học viên chưa đúng, bài chưa gửi được."}catch(e){}}
 rec.sent=rec.parts.every(p=>p.sent);chPut(chSK(rec.lv,rec.b),rec);chApply(rec);if(typeof rr=="function")rr()}
/* gửi lại bài chưa gửi được + lấy kết quả cô chấm (tối đa 5 phút/lần) */
async function chPoll(force){if(!chMe()||!chSrv())return;
 try{if(!force&&Date.now()-(+sessionStorage.getItem("ct_chp")||0)<3e5)return;sessionStorage.setItem("ct_chp",Date.now())}catch(e){}
 const recs=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^ct_gxn_\d+_\d+$/.test(k)){const r=chJ(k,null);if(r)recs.push(chFix(r))}}
 for(const r of recs.filter(r=>r.parts.some(p=>!p.sent)))await chUp(r);
 const wait=recs.filter(r=>r.parts.some(p=>p.sent)&&(r.it.some(x=>x.st=="cho")||Date.now()-r.parts[r.parts.length-1].at<7*864e5));if(!wait.length)return;
 try{const res=await chPost({a:"vkq",code:TRKME.code,sids:[].concat(...wait.map(r=>r.parts.filter(p=>p.sent).map(p=>p.sid)))});if(!res||!res.ok||!res.v)return;let nw=[];
  wait.forEach(rec=>{let ch=0;rec.parts.forEach(p=>{const kq=res.kq&&res.kq[p.sid];if(!kq)return;
   kq.forEach(s=>{const x=rec.it.find(y=>y.k==s.k&&y.sid==p.sid);if(x&&x.st!="ok"&&s.st!="cho"&&(x.st=="cho"||+x.g!==+s.g||(x.nx||"")!=(s.nx||""))){x.st=s.st;x.g=s.g;x.nx=s.nx||"";ch++;
    if(+s.g<1&&typeof trkErr=="function")trkErr(x.d=="tr"?"Ngữ pháp · Dịch":"Ngữ pháp · Miêu tả tranh",x.de,x.v,x.ref+(x.nx?" ("+x.nx+")":""),rec.b)}})});
   if(ch){rec.seen=false;chPut(chSK(rec.lv,rec.b),rec);chApply(rec);nw.push(rec)}});
  if(nw.length){if(typeof rr=="function")rr();ask(`🎉 Cô đã chấm bài Ngữ pháp: ${nw.map(r=>`<b>Bài ${r.b}</b>${r.ten?" · "+chE(r.ten):""}`).join(", ")}. Em mở phần Ngữ pháp · Mẫu câu của bài để xem nhận xét.`,null,1)}
 }catch(e){}}
/* nộp tiếp phần chưa làm: mở lại bài, phần đã nộp khóa lại */
function chCont(){const rec=chFix(chRec());if(!rec)return;GX=null;gxInit();chPrep();GX.cont=true;
 const sod=rec.sod||[];GX.so.forEach((s,k)=>{if(sod.length?sod[k]!=null:rec.so.n==rec.so.all){s.sub=true;s.first=sod.length?sod[k]:true}});
 rec.it.forEach(x=>{if(x.st=="bo")return;const t=GX[x.d][+x.k.slice(1)];if(t){t.v=x.v;t.st="sub"}});rr()}
const chLeft=rec=>{const sod=rec.sod||[];return (sod.length?sod.some(v=>v==null):rec.so.n<(rec.so.all||rec.so.n))||rec.it.some(x=>x.st=="bo")};

/* ---------- giao diện học viên ---------- */
function chBadge(x){return x.st=="ok"?`<span class="chb ok">✓ ${x.nx&&/chấp nhận/.test(x.nx)?"Đúng (cô đã chấp nhận)":"Đúng · máy chấm"}</span>`:x.st=="cho"?`<span class="chb wt">⏳ Chờ cô chấm</span>`:
 `<span class="chb ${+x.g>=1?"ok":+x.g>0?"mid":"no"}">${chG(+x.g)} ${x.st=="hoc"?"Máy chấm theo lần cô chấm trước":"Cô chấm"}</span>`}
function chDone(rec){const tr=rec.it.filter(x=>x.d=="tr"&&x.st!="bo"),pc=rec.it.filter(x=>x.d=="pc"&&x.st!="bo"),wt=rec.it.filter(x=>x.st=="cho").length,g=x=>x.g==null||x.g===""?0:+x.g;
 const trs=tr.reduce((a,x)=>a+g(x),0),pcs=pc.reduce((a,x)=>a+g(x),0),nn=rec.so.n+tr.length,tot=nn?Math.round((rec.so.ok+trs)/nn*100):null,box=(n,v,l,w)=>`<div${n?"":` class="chno"`}>${n?`<b>${v}/${n}</b>`:`<b>—</b>`}<small>${l}${n?w:" · không làm"}</small></div>`;
 if(!rec.seen){rec.seen=true;chPut(chSK(rec.lv,rec.b),rec)}
 let h=`<div class="card chsum"><h4>📤 Em đã nộp bài lúc ${chFix(rec).parts.map(p=>chT(p.at)).join(" · nộp tiếp ")}</h4>
<div class="chsc">${box(rec.so.n,rec.so.ok,"Sắp xếp câu","")}${box(tr.length,trs,"Dịch Việt → Trung",tr.some(x=>x.st=="cho")?" (chờ cô)":"")}${rec.it.some(x=>x.d=="pc")?box(pc.length,pcs,"Miêu tả tranh",pc.some(x=>x.st=="cho")?" (chờ cô)":""):""}</div>
${wt?`<p class="chwt">⏳ Còn <b>${wt} câu</b> chờ cô chấm. Điểm sẽ tự cập nhật khi cô chấm xong.${rec.sent?"":` <b class="bad">Bài chưa gửi được (mạng hoặc máy chủ), trang sẽ tự gửi lại.</b>`}</p>`:`<p class="okt">Cô đã chấm xong. ${tot!=null?`Điểm phần Ngữ pháp (sắp xếp + dịch, ${nn} câu em làm): <b>${tot}%</b>.`:""}</p>`}
${rec.msg?`<p class="bad">${rec.msg}</p>`:""}<div class="row"><button class="btn o sm" onclick="chPoll(1)">↻ Xem cô đã chấm chưa</button></div></div>`;
 if(chLeft(rec))h+=`<div class="card note chleft">Em còn phần chưa làm. Buổi sau có thời gian thì làm tiếp và nộp bổ sung cho cô. <button class="btn sm" onclick="chCont()">➕ Làm tiếp phần chưa làm</button></div>`;
 h+=rec.it.filter(x=>x.st!="bo").map(x=>{const n=+x.k.slice(1)+1;return `<div class="card chit ${x.st=="cho"?"":+x.g>=1||x.st=="ok"?"ok":"no"}"><b>${x.d=="tr"?"Dịch "+n:"Tranh "+n}.</b> ${chE(x.de)}
${x.d=="pc"&&x.img?`<div class="gxpic chsm"><img src="${x.img}" alt="Tranh ${n}"></div>`:""}
<div class="chmy"><small>Bài em:</small> <span class="zh">${chE(x.v)}</span></div>${chBadge(x)}${x.nx&&!/chấp nhận/.test(x.nx)?`<div class="chnx">💬 Cô nhận xét: ${chE(x.nx)}</div>`:""}
${x.h&&x.h.length&&x.st!="ok"&&!(+x.g>=1)?`<div class="ctx">Máy đã gợi ý: ${x.h.map(chE).join(" · ")}</div>`:""}
<div class="ans"><b>Đáp án tham khảo:</b> <span class="zh hd">${chE(x.ref)}</span> ${bS(x.ref)}<br><span class="py" style="color:var(--m)">${chE(x.rp||"")}</span></div>
${x.st!="cho"&&!(+x.g>=1||x.st=="ok")?`<p class="ctx">✍ Em chép lại câu đúng vào vở 2 lần.</p>`:""}</div>`}).join("");
 return h+`<div class="row c"><button class="btn o" onclick="GX=null;gxInit();chPrep();GX.prac=true;rr()">↻ Luyện lại (không tính điểm, không gửi cô)</button>${nextBtn("gp")}</div>`}

function chItem(kind,it,k){const t=GX[kind][k],st=t.st,tr=kind=="tr",lock=st=="ok"||st=="cho"||st=="ref"||st=="sub";
 const head=tr?`<b>${k+1}.</b> ${it.vi}`:`<b>Tranh ${k+1}.</b>`;
 const pic=tr?"":(()=>{const src=it.img&&(GXIMG[it.img]||"img/gx/"+it.img+".webp");return `<div class="gxpic">${src?`<img src="${src}" alt="Tranh ${k+1} trong giáo trình">`:`<div class="gxph">🖼️<br>Khung ảnh trống<br><small>${it.ph||"Cô chèn ảnh vào đây"}</small></div>`}</div><p class="goal">${it.req}</p>`})();
 const box=tr?`<input value="${chE(t.v)}" oninput="GX.tr[${k}].v=this.value" placeholder="Nhập câu tiếng Trung" autocomplete="off" autocapitalize="off" ${lock?"disabled":""}>`
  :`<textarea class="tin" rows="2" oninput="GX.pc[${k}].v=this.value" placeholder="Viết câu tiếng Trung (chữ Hán hoặc pinyin không dấu)" autocomplete="off" autocapitalize="off" ${lock?"disabled":""}>${chE(t.v)}</textarea>`;
 const ref=tr?[[it.r[0],it.r[1],""]]:it.r,refH=`<div class="ans"><b>Đáp án tham khảo:</b>${ref.map(r=>`<div><span class="zh hd">${r[0]}</span> ${bS(r[0])}<br><span class="py" style="color:var(--m)">${r[1]}</span>${r[2]?`<div class="vi">${r[2]}</div>`:""}</div>`).join("")}</div>`;
 let fb="";
 if(st=="sub")return `<div class="card ${tr?"dt":""} chsub">${head}${tr?"":pic}${box}<div class="chwt">📤 Câu này em đã nộp lần trước.</div></div>`;
 if(st=="ok")fb=`<div class="okt">✓ Đúng rồi!${t.lc?" (Cô đã chấp nhận cách viết này.)":""}</div>`+(GX.prac||!chMe()?refH:"");
 else if(st=="hint")fb=`<div class="chhint"><b>🔎 Máy soát giúp em:</b><ul>${t.h.map(x=>`<li>${x}</li>`).join("")}</ul><small>Đây chỉ là gợi ý. Em sửa rồi bấm Kiểm tra lại, hoặc giữ nguyên và gửi cô chấm.</small></div>`;
 else if(st=="cho")fb=`<div class="chwt">⏳ Câu này cô sẽ chấm sau khi em nộp bài.${t.h&&t.h.length?` <small>(Máy vẫn còn lưu ý: ${t.h.map(trkTxt).join(" · ")})</small>`:""}</div>`;
 else if(st=="ref"){const gui=!GX.prac&&typeof trkOn=="function"&&trkOn();fb=`<div class="ctx">${GX.prac?"Đang luyện lại: em tự đối chiếu với đáp án.":gui?"⏳ Câu của em khác đáp án mẫu, có thể vẫn đúng. Em bấm <b>📤 Nộp bài cho cô</b> ở cuối bài để cô chấm câu này.":"Câu của em khác đáp án mẫu, có thể vẫn đúng."}</div>${t.h&&t.h.length?`<div class="chhint"><ul>${t.h.map(x=>`<li>${x}</li>`).join("")}</ul></div>`:""}`+(gui?(t.sa?refH:`<div class="row"><button class="btn o sm" onclick="GX.${kind}[${k}].sa=1;rr()">👁 Xem đáp án tham khảo</button><small class="ctx">Nên nộp cho cô chấm trước rồi hãy xem.</small></div>`):refH)}
 const btn=st=="ok"||st=="ref"?(GX.prac||!chMe()?`<button class="btn o sm" onclick="chEdit('${kind}',${k})">↻ Làm lại</button>`:`<button class="btn o sm" onclick="chEdit('${kind}',${k})">✎ Sửa</button>`)
  :st=="cho"?`<button class="btn o sm" onclick="chEdit('${kind}',${k})">✎ Sửa câu này</button>`
  :st=="hint"?`<button class="btn sm" onclick="chCheck('${kind}',${k})">Kiểm tra lại</button>${chOn()?`<button class="btn o sm" onclick="chSend('${kind}',${k})">Giữ nguyên, gửi cô chấm</button>`:""}`
  :`<button class="btn sm" onclick="chCheck('${kind}',${k})">Kiểm tra</button>`;
 return `<div class="card ${tr?"dt":""} ${st=="ok"?"ok":""}">${head}${pic}${box}${fb}<div class="row">${btn}</div></div>`}

const _gxHtml=gxHtml;
gxHtml=function(L){if(!GX||GX.k!=gxKey()){const rec=chRec();if(rec&&chMe()){GX=null;return chDone(rec)}gxInit()}
 chPrep();const rec=chRec();if(rec&&chMe()&&!GX.prac&&!GX.cont){GX=null;CHWAIT=false;return chDone(rec)}
 if(CHWAIT&&chMe()){CHWAIT=false;setTimeout(chNop,300)}
 const d=GXD[GX.k];let h="";
 if(GX.cont)h+=`<div class="card note">➕ Em đang <b>làm tiếp phần chưa làm</b>. Câu đã nộp được khóa lại. Làm xong bấm <b>Nộp tiếp</b> ở cuối. <button class="btn o sm" onclick="GX=null;rr()">← Xem bài đã nộp</button></div>`;
 else if(GX.prac)h+=`<div class="card note">↻ Em đang <b>luyện lại</b>, không tính điểm, không gửi cô. <button class="btn o sm" onclick="GX=null;rr()">← Xem bài đã nộp</button></div>`;
 else if(!chMe()&&typeof trkOn=="function"&&trkOn())h+=`<div class="card trkban"><span>🔑 Học viên lớp cô Thảo nhập <b>mã học viên</b> để nộp bài, cô chấm câu dịch và miêu tả tranh cho em.</span><button class="btn sm" onclick="trkOpen()">Nhập mã</button></div>`;
 else if(chMe())h+=`<div class="card note">📤 Làm xong cả 3 dạng thì bấm <b>Nộp bài cho cô</b> ở cuối. Bài nộp <b>một lần</b>; câu máy chưa chấm được cô sẽ chấm.</div>`;
 /* Dạng 1 giữ nguyên của app.js: lấy phần Dạng 1 từ bản gốc */
 const o=_gxHtml(L),i2=o.indexOf(`<div class="card note"><b>Dạng 2`);let d1=i2>0?o.slice(0,i2):"";
 if(GX.cont&&GX.so.some(s=>s.sub)){const parts=d1.split(`<div class="card q `);d1=parts[0]+parts.slice(1).map((c,k)=>GX.so[k]&&GX.so[k].sub?`<div class="card chsub"><b>Câu ${k+1}.</b> <span class="chwt">📤 Đã nộp lần trước.</span></div>`:`<div class="card q `+c).join("")}
 h+=d1;
 h+=`<div class="card note"><b>Dạng 2 · Dịch Việt → Trung</b><br>Gõ câu tiếng Trung bằng <b>chữ Hán</b> (hoặc pinyin không dấu). Không cần gõ dấu câu. Câu trùng đáp án máy chấm luôn; câu viết khác, máy soát lỗi gợi ý rồi gửi cô chấm.</div>`;
 h+=d.tr.map((it,k)=>chItem("tr",it,k)).join("");
 if(d.pc&&d.pc.length){h+=`<div class="card note"><b>Dạng 3 · Miêu tả tranh</b><br>Xem tranh, đọc yêu cầu rồi viết câu bằng <b>chữ Hán</b> hoặc <b>pinyin không dấu</b>. Cô chấm: đúng nội dung tranh + dùng đúng cấu trúc.</div>`;h+=d.pc.map((it,k)=>chItem("pc",it,k)).join("")}
 const all=GX.so.length+GX.tr.length+GX.pc.length,dn=GX.so.filter(s=>s.first!=null).length+GX.tr.concat(GX.pc).filter(chHas).length;
 if(chOn())h+=`<div class="card res chnop"><p>Đã làm <b>${dn}/${all}</b> câu.${dn<all?" Hết giờ thì em vẫn nộp được, phần chưa làm không tính điểm.":""}</p><div class="row c"><button class="btn" onclick="chNop()" ${chReady()?"":"disabled"}>📤 ${GX.cont?"Nộp tiếp cho cô":"Nộp bài cho cô"}</button></div></div>`;
 else{if(!GX.prac&&typeof trkOn=="function"&&trkOn())h+=`<div class="card res chnop"><p>Đã làm <b>${dn}/${all}</b> câu. Máy chỉ chấm được câu trùng đáp án; câu em viết khác, <b>cô sẽ chấm</b> khi em nộp bài.</p><div class="row c"><button class="btn" onclick="chNop()" ${chReady()?"":"disabled"}>📤 Nộp bài cho cô</button></div><small class="ctx">Cần <b>mã học viên</b> cô Thảo đã gửi. Bấm nộp, nhập mã, bài em làm vẫn giữ nguyên.</small></div>`;
  const nS=GX.so.filter(s=>s.first!=null).length,nT=GX.tr.filter(t=>t.st=="ok"||t.st=="ref").length,tot=GX.so.length+GX.tr.length;
  if(nS+nT==tot){const ok=GX.so.filter(s=>s.first).length+GX.tr.filter(t=>t.st=="ok").length,pct=Math.round(ok/tot*100);
   h+=`<div class="card res"><div class="big ${pct>=80?"ok":"no"}">${pct}%</div><p style="text-align:center">Máy chấm được ${ok}/${tot} câu (sắp xếp + dịch trùng đáp án).${GX.prac?" Bài luyện lại không tính điểm.":""}</p><div class="row c"><button class="btn o" onclick="const p=GX.prac;GX=null;gxInit();chPrep();GX.prac=p;rr()">↻ Làm lại toàn bộ</button>${nextBtn("gp")}</div></div>`}
  else h+=`<p class="ctx">Đã làm ${nS+nT}/${tot} câu tính điểm (dạng 1 và 2).</p>`}
 return h};

/* ================= GIÁO VIÊN: tab "✍ Chấm bài" trong Bảng theo dõi ================= */
if(typeof gvDraw=="function"){
 const _gvDraw=gvDraw,_gvLoad=gvLoad;
 gvLoad=async function(){await _gvLoad();if(GV.data)chgLoad(true)};
 gvDraw=function(){const isC=GV.tab=="cc"&&!GV.stu;if(isC)GV.tab="tq";_gvDraw();if(isC)GV.tab="cc";
  const s=$("gv");if(!s||!GV.data)return;const tb=s.querySelector(".gvtabs");if(!tb)return;
  if(isC)tb.querySelectorAll("button").forEach(b=>b.classList.remove("on"));
  const b=document.createElement("button");b.className=isC?"on":"";b.innerHTML=`✍ Chấm bài${CHG.cnt?` <i class="chcnt">${CHG.cnt}</i>`:""}`;b.onclick=()=>{GV.stu=null;GV.tab="cc";chgLoad();gvDraw()};tb.insertBefore(b,tb.children[1]||null);
  if(isC){while(tb.nextSibling)tb.nextSibling.remove();const d=document.createElement("div");d.id="chg";d.innerHTML=chgHtml();s.appendChild(d)}};
}
async function chgLoad(quiet){if(CHG.busy||!chSrv())return;CHG.busy=true;CHG.err="";if(!quiet&&GV.tab=="cc")chgDraw();
 try{const r=await chPost({a:"vcho",pass:GV.pass,days:Math.max(GV.days||30,30)});
  if(r&&r.ok&&r.v){CHG.data=r.rows||[];CHG.srv=true}else if(r&&r.v&&r.err=="pass")CHG.err="Mật khẩu chưa đúng.";else{CHG.srv=false;CHG.data=null}
 }catch(e){CHG.err="Chưa kết nối được Google Sheets."}
 CHG.busy=false;chgCount();if(GV.tab=="cc")chgDraw();else if(typeof gvDraw=="function"&&GV.data&&$("gv")&&$("gv").classList.contains("on"))gvDraw()}
function chgCount(){CHG.cnt=CHG.data?CHG.data.filter(x=>x.st=="Chờ cô"&&(!GV.cls||x.cls==GV.cls)).length:null}
function chgDraw(){const d=$("chg");if(d){d.innerHTML=chgHtml();const c=document.querySelector(".gvtabs .chcnt");if(c){if(CHG.cnt)c.textContent=CHG.cnt;else c.remove()}}else if(typeof gvDraw=="function")gvDraw()}
const chgLvN=l=>typeof gvLv=="function"?gvLv(l):"HSK "+l;
function chgHtml(){
 if(CHG.busy&&!CHG.data)return `<p class="ctx">Đang tải bài nộp…</p>`;
 if(CHG.err)return `<p class="bad">${CHG.err}</p><button class="btn sm" onclick="chgLoad()">↻ Tải lại</button>`;
 if(CHG.srv===false||!CHG.data)return chgSetup();
 const rows=CHG.data.filter(x=>!GV.cls||x.cls==GV.cls),pend=x=>x.st=="Chờ cô";
 const bais={};rows.forEach(x=>{const k=x.lv+"-"+x.b;(bais[k]=bais[k]||{lv:x.lv,b:x.b,ten:x.ten,n:0,p:0,sv:new Set()});bais[k].n++;if(pend(x))bais[k].p++;bais[k].sv.add(x.code)});
 const list=Object.values(bais).sort((a,b)=>b.p-a.p||a.lv-b.lv||a.b-b.b);
 if(!list.length)return `<div class="card"><p>Chưa có bài nộp nào${GV.cls?" của lớp "+chE(GV.cls):""} trong ${Math.max(GV.days,30)} ngày qua.</p><button class="btn sm" onclick="chgLoad()">↻ Tải lại</button></div>`;
 if(!CHG.bai||!bais[CHG.bai])CHG.bai=list[0].lv+"-"+list[0].b;
 const B=bais[CHG.bai];let h=`<div class="gvbar chgbar"><label>Bài <select onchange="CHG.bai=this.value;chgDraw()">${list.map(x=>`<option value="${x.lv}-${x.b}" ${x.lv+"-"+x.b==CHG.bai?"selected":""}>${chgLvN(x.lv)} · Bài ${x.b}${x.ten?" · "+chE(x.ten):""} — ${x.p?x.p+" câu chờ chấm":"đã chấm xong"} (${x.sv.size} bạn)</option>`).join("")}</select></label>
<label>Xem <select onchange="CHG.mode=this.value;chgDraw()"><option value="cho" ${CHG.mode=="cho"?"selected":""}>Câu chờ chấm</option><option value="all" ${CHG.mode=="all"?"selected":""}>Tất cả (sửa điểm đã chấm)</option></select></label>
<label class="gvck"><input type="checkbox" ${CHG.hide?"checked":""} onchange="CHG.hide=this.checked;chgDraw()"> Ẩn tên (chiếu lên lớp)</label>
<button class="btn sm" onclick="chgLoad()" ${CHG.busy?"disabled":""}>${CHG.busy?"Đang tải…":"↻ Tải lại"}</button><small class="chsv">${CHG.saving?"Đang lưu…":Object.keys(CHG.q).length?"Chưa lưu…":CHG.saved?"✓ Đã lưu "+chT(CHG.saved).split(" ")[0]:""}</small></div>`;
 const R=rows.filter(x=>x.lv+"-"+x.b==CHG.bai),ks=[...new Set(R.map(x=>x.k))].sort((a,b)=>(a[0]==b[0]?0:a[0]=="t"?-1:1)||(+a.slice(1))-(+b.slice(1)));
 h+=`<p class="ctx">Câu giống nhau đã gộp một dòng: bấm một lần là chấm cho cả nhóm. Cô chấm xong, lần sau bạn khác viết giống thế máy tự chấm theo cô. ✓ = đúng (tranh: đúng nội dung + đúng cấu trúc), ½ = gần đúng, ✗ = sai.</p>`;
 let shown=0;
 ks.forEach(k=>{const rk=R.filter(x=>x.k==k),f=rk[0],grp={};rk.forEach(x=>{(grp[x.key]=grp[x.key]||[]).push(x)});
  let G=Object.values(grp);if(CHG.mode=="cho")G=G.filter(g=>g.some(x=>pend(x)||CHG.tc[x.sid+"|"+x.k]));if(!G.length)return;shown++;
  G.sort((a,b)=>(b.some(pend)-a.some(pend))||b.length-a.length);
  h+=`<div class="card chgq"><div class="chgh"><b>${f.d=="tr"?"Dịch "+(+k.slice(1)+1):"Tranh "+(+k.slice(1)+1)}.</b> ${chE(f.de)}</div>
${f.d=="pc"&&f.img?`<div class="gxpic chsm"><img src="${chE(f.img)}" alt=""></div>`:""}
<div class="chgref">Đáp án tham khảo: <span class="zh">${chE(f.ref)}</span> <small class="py">${chE(f.rp||"")}</small></div>
${G.map(g=>{const x=g[0],ids=g.map(y=>y.sid+"|"+y.k),cg=g.find(y=>y.g!==""&&y.g!=null),gv=cg?+cg.g:null,nx=cg?cg.nx||"":"",p=g.some(pend),mac=g.every(y=>/Máy/.test(y.st));
  const id=chE(JSON.stringify(ids));
  return `<div class="chgg ${p?"p":gv>=1?"ok":gv>0?"mid":"no"}"><div class="chga"><span class="zh">${chE(x.v)}</span>${!hasHan(x.v)?` <small class="ctx">(pinyin)</small>`:""}
<div class="chgw">${g.length>1?`<b>${g.length} bạn</b>${CHG.hide?"":": "}`:""}${CHG.hide?"":g.map(y=>chE(y.name||y.code)).join(", ")}${mac?` · <i>máy chấm</i>`:""}</div></div>
<div class="chgb">${[[1,"✓"],[0.5,"½"],[0,"✗"]].map(([v,l])=>`<button class="${gv===v?"on":""} g${String(v).replace(".","")}" data-ids="${id}" onclick="chgMark(this,${v})">${l}</button>`).join("")}</div>
<div class="chgc">${["Sai trật tự từ","Thiếu 了","Sai / thiếu từ","Thiếu ý","Sai ngữ pháp","Đúng nhưng chưa tự nhiên","Sai chữ Hán"].map(c=>`<button class="${nx.split("; ").includes(c)?"on":""}" data-ids="${id}" onclick="chgNx(this,'${c}')">${c}</button>`).join("")}
<input class="chgi" data-ids="${id}" placeholder="Nhận xét khác…" value="${chE(nx.split("; ").filter(c=>!["Sai trật tự từ","Thiếu 了","Sai / thiếu từ","Thiếu ý","Sai ngữ pháp","Đúng nhưng chưa tự nhiên","Sai chữ Hán"].includes(c)).join("; "))}" onchange="chgNxT(this)"></div></div>`}).join("")}</div>`});
 if(!R.some(pend))h+=`<div class="card"><p class="okt">🎉 Bài này cô đã chấm xong. Chọn "Tất cả" để xem lại hoặc sửa điểm.</p></div>`;
 return h}
function chgRows(el){return JSON.parse(el.dataset.ids).map(id=>CHG.data.find(x=>x.sid+"|"+x.k==id)).filter(Boolean)}
function chgMark(el,g){chgRows(el).forEach(x=>{x.g=g;x.st="Cô chấm";CHG.tc[x.sid+"|"+x.k]=1;chgQ(x)});chgCount();chgDraw()}
const CHCHIP=["Sai trật tự từ","Thiếu 了","Sai / thiếu từ","Thiếu ý","Sai ngữ pháp","Đúng nhưng chưa tự nhiên","Sai chữ Hán"];
function chgNx(el,c){const rs=chgRows(el),cur0=(rs[0].nx||"").split("; ").filter(Boolean),has=cur0.includes(c),nx=(has?cur0.filter(x=>x!=c):cur0.concat([c])).join("; ");
 rs.forEach(x=>{x.nx=nx;if(x.g!==""&&x.g!=null)chgQ(x)});if(rs[0].g===""||rs[0].g==null)CHG.err="";chgDraw();if(rs[0].g===""||rs[0].g==null)ask("Cô chọn ✓, ½ hoặc ✗ cho câu này để lưu cả nhận xét.",null,1)}
function chgNxT(el){const rs=chgRows(el),chips=(rs[0].nx||"").split("; ").filter(c=>CHCHIP.includes(c)),t=el.value.trim(),nx=chips.concat(t?[t]:[]).join("; ");
 rs.forEach(x=>{x.nx=nx;if(x.g!==""&&x.g!=null)chgQ(x)});chgDraw()}
function chgQ(x){CHG.q[x.sid+"|"+x.k]={sid:x.sid,k:x.k,g:x.g,nx:x.nx||""};clearTimeout(CHG.qt);CHG.qt=setTimeout(chgSave,1200)}
async function chgSave(){if(CHG.saving){CHG.qt=setTimeout(chgSave,1500);return}const marks=Object.values(CHG.q);if(!marks.length)return;CHG.q={};CHG.saving=true;chgBar();
 try{const r=await chPost({a:"vcham",pass:GV.pass,marks});if(r&&r.ok){CHG.saved=Date.now()}else{marks.forEach(m=>CHG.q[m.sid+"|"+m.k]=m);ask("Chưa lưu được điểm: "+chE(r&&(r.msg||r.err)||"lỗi")+". Cô bấm lại một ô điểm để thử lưu lại.",null,1)}}
 catch(e){marks.forEach(m=>CHG.q[m.sid+"|"+m.k]=m);ask("Mất kết nối, điểm chưa lưu. Kiểm tra mạng rồi bấm lại một ô điểm.",null,1)}
 CHG.saving=false;chgBar()}
function chgBar(){const e=document.querySelector("#chg .chsv");if(e)e.textContent=CHG.saving?"Đang lưu…":Object.keys(CHG.q).length?"Chưa lưu…":CHG.saved?"✓ Đã lưu "+chT(CHG.saved).split(" ")[0]:""}
window.addEventListener("beforeunload",e=>{if(Object.keys(CHG.q).length){chgSave();e.preventDefault();e.returnValue=""}});
function chgSetup(){return `<div class="card"><h3>Cài phần chấm bài vào Google Sheets (làm 1 lần)</h3>
<p>Google Sheets chưa có đoạn mã nhận bài nộp. Cô làm theo 4 bước:</p>
<ol><li>Mở Google Sheets "Sổ theo dõi học viên" › Tiện ích mở rộng › Apps Script. Dán đoạn mã bên dưới vào <b>cuối</b> file Code.gs.</li>
<li>Trong hàm <code>doPost(e)</code>, thêm dòng này làm <b>dòng đầu tiên</b> bên trong hàm (ngay dưới dòng có nenApi_ nếu đã có):<br><code>var _ch = chamApi_(e); if (_ch) return _ch;</code></li>
<li>Lưu › Triển khai › Quản lý tác vụ triển khai › ✏ › Phiên bản: <b>Phiên bản mới</b> › Triển khai (địa chỉ giữ nguyên).</li>
<li>Quay lại đây bấm ↻ Tải lại. Hai trang tính "Chấm bài" và "Đáp án học" tự tạo khi có bài nộp đầu tiên.</li></ol>
<div class="row"><button class="btn sm" onclick="chgCopy()">📋 Sao chép đoạn mã</button><button class="btn o sm" onclick="chgLoad()">↻ Tải lại</button></div>
<pre class="chcode" id="chcode">Đang tải đoạn mã…</pre></div>`}
let CHCODE="";
async function chgCode(){if(CHCODE)return CHCODE;try{CHCODE=await (await fetch("huong-dan/cham-api.gs.txt?v="+CHV)).text()}catch(e){CHCODE="(Không tải được đoạn mã. Cô lấy file cham-api.gs.txt Claude gửi trong chat.)"}return CHCODE}
function chgCopy(){chgCode().then(t=>{try{navigator.clipboard.writeText(t).then(()=>ask("Đã sao chép đoạn mã.",null,1),()=>ask("Trình duyệt chặn sao chép: cô bôi đen đoạn mã rồi Ctrl+C.",null,1))}catch(e){ask("Cô bôi đen đoạn mã rồi Ctrl+C.",null,1)}})}
new MutationObserver(()=>{const p=$("chcode");if(p&&p.textContent=="Đang tải đoạn mã…")chgCode().then(t=>{p.textContent=t})}).observe(document.body,{childList:true,subtree:true});

/* mở trang: gửi bài chưa gửi + lấy điểm cô chấm */
setTimeout(()=>chPoll(),4000);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState=="visible")chPoll()});
