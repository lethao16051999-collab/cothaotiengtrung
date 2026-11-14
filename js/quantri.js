/* ===== Quản trị theo tuần · thêm 01/11/2026 =====
   Sắp xếp lại ⚙ Quản trị thành các tab: 🏠 Hôm nay · 👥 Lớp · ✍ Chấm bài · 🎭 Nhận xét nhóm · 📅 Chốt tuần · 🎯 Tuyển sinh · 💰 Học phí.
   - Lộ trình từng lớp (buổi, nội dung, bài trên web, buổi kiểm tra), ngày tự tính theo lịch học, "Nghỉ buổi này" tự lùi lịch.
   - Cô tự điểm danh (tick tên), nhắc buổi quên điểm danh; "Kết thúc buổi" soạn tin giao bài + hạn nộp (trước buổi sau 1 ngày).
   - Mỗi lớp: tuần này học gì, chuyên cần, ai thiếu / chưa đạt bài nào → tin nhắc soạn sẵn.
   - Kiểm tra định kỳ: Nghe, Nói, Đọc, Đọc chữ Hán, Tương tác (Tốt / Khá / Đạt / Cần cố gắng) + chuyên cần + kết quả web + nhận xét → tin phụ huynh.
   - Tuyển sinh: người hỏi học, nguồn, trạng thái, hẹn gọi lại; lớp sắp hết khóa.
   Lưu: Google Sheets (API qtget / qtset — đoạn mã huong-dan/quantri-api.gs.txt), dự phòng trên máy (ct_qt) khi chưa cài.
   02/11/2026: lớp học song song 2 quyển HSK1 (K49) — mọi tin nhắc ghi rõ 📙 QUYỂN CAM (Giáo trình chuẩn) / 📘 QUYỂN XANH (New HSK 1), xếp cam trước, xanh sau.
   Nạp SAU js/theodoi.js, cham.js, nhom.js, baocao.js. ===== */
const QT_TH=["CN","T2","T3","T4","T5","T6","T7"],QT_KT=["Nghe","Nói","Đọc","Đọc chữ Hán","Tương tác"],QT_LV=["Tốt","Khá","Đạt","Cần cố gắng"];
const QT_TS_ST=["Mới hỏi","Đã tư vấn","Học thử","Đã đăng ký","Không học"],QT_TS_NG=["Facebook","TikTok","YouTube","Zalo","Người quen giới thiệu","Học viên cũ","Khác"];
const QT_K={hoc:"Học bài",on:"Ôn tập",kt:"Kiểm tra"},QT_L6=[1,2,3,9,10,11,12,13,14,15],QT_L7=[1,2,3],QT_T7=["開學了","八折起","外套帶了沒有？"]; /* QT_L7 = các bài đã có trên trang tocfl-b1/ (cấp 7), thêm bài mới thì thêm số và tên vào đây */
const qtWebReq=w=>+String(w).split("-")[0]==7?"làm Luyện đọc, Từ vựng và đề TOCFL, đạt từ 80%.":"làm đủ các phần, bao gồm cả test nhanh đạt từ 80%.";
/* lộ trình cô gửi 01/11/2026 (chỉ dùng khi máy chủ / máy này chưa có lộ trình của lớp đó) */
const QT_SEED={
 "K49 HSK1":{days:[2,5],time:"20:30",lv:6,an:{n:21,d:"2026-10-30"},off:[],ex:[],s:[
  {n:18,cd:"Chủ đề 7: thời tiết, đau ốm",nd:"HSK1 3.0 · bản web",w:"",k:"hoc"},{n:19,cd:"",nd:"Bài 13",w:"6-13",k:"hoc"},
  {n:20,cd:"Chủ đề 6",nd:"HSK1 3.0 · bản web",w:"",k:"hoc"},{n:21,cd:"",nd:"Bài 14",w:"6-14",k:"hoc"},
  {n:22,cd:"Chủ đề 9",nd:"HSK1 3.0 · bản web",w:"",k:"hoc"},{n:23,cd:"",nd:"Bài 15",w:"6-15",k:"hoc"},
  {n:24,cd:"Chủ đề 4: địa điểm",nd:"bản web",w:"",k:"hoc"},{n:25,cd:"",nd:"Kiểm tra",w:"",k:"kt"}]},
 "K46 HSK2":{days:[3,5],time:"19:00",lv:2,an:{n:5,d:"2026-10-30"},off:[],ex:[],s:[
  ["","Bài 1"],["Tới một nơi mới","Bài 2"],["Lên kế hoạch","Bài 3"],["","Ôn tập"],["","Ôn tập luyện nói"],["Mua sắm","Bài 4"],["Xã giao","Bài 5"],["Sinh nhật","Bài 6"],
  ["","Ôn tập"],["","Ôn tập luyện nói"],["Thể thao – vận động","Bài 7"],["","Bài 8"],["","Bài 9"],["","Ôn tập"],["","Ôn tập luyện nói"],["","Bài 10"],["","Bài 11"],["","Bài 12"],
  ["","Ôn tập"],["","Ôn tập luyện nói"],["","Bài 13"],["","Bài 14"],["","Bài 15"],["","Ôn tập"],["","Ôn tập"],["","Kiểm tra"]].map((x,i)=>qtRow(i+1,x[0],x[1],2))},
 "K41 HSK3":{days:[1,4],time:"19:00",lv:3,an:{n:27,d:"2026-11-02"},off:[],ex:[],s:[["","Bài 20"],["","Ôn tập bài 18–19–20"],["","Ôn tập tổng hợp"],["","Kiểm tra đầu ra HSK3"]].map((x,i)=>qtRow(27+i,x[0],x[1],3))},
 "K45 HSK3":{days:[1,3],time:"20:30",lv:3,an:{n:1,d:"2026-11-09"},off:[],ex:[],s:Array.from({length:40},(_,i)=>({n:i+1,cd:"",nd:"",w:"",k:"hoc"}))},
 "K48 HSK2":{days:[3,5],time:"09:00",lv:2,an:{n:3,d:"2026-11-04"},off:[],ex:[],s:null}};
QT_SEED["K48 HSK2"].s=JSON.parse(JSON.stringify(QT_SEED["K46 HSK2"].s));
/* một dòng lộ trình từ chữ: "Bài 4" → bài web cấp lv (nếu bài đó có trên web), "Kiểm tra" → buổi kiểm tra, "Ôn tập…" → ôn */
function qtRow(n,cd,nd,lv){nd=String(nd||"").trim();cd=String(cd||"").trim();const m=nd.match(/^bài\s*(\d+)/i);let w=m&&lv?lv+"-"+m[1]:"";
 if(w&&!qtLesOpts().includes(w))w="";
 return{n,cd,nd,w,k:/kiểm tra/i.test(nd)?"kt":/^ôn/i.test(nd)?"on":"hoc"}}

let QT={d:{lt:{},dd:{},kt:{},ts:{},en:{},ppt:{},tkb:{}},dirty:{},srv:null,err:"",busy:false,ui:{wk:null}};
try{const o=JSON.parse(localStorage.getItem("ct_qt")||"{}");if(o.d)Object.keys(QT.d).forEach(k=>QT.d[k]=o.d[k]||{});QT.dirty=o.dirty||{}}catch(e){}
const qtLocal=()=>{try{localStorage.setItem("ct_qt",JSON.stringify({d:QT.d,dirty:QT.dirty}))}catch(e){}};
const qtA=s=>gvE(s).replace(/'/g,"&#39;");
const qtJ=s=>gvE(JSON.stringify(String(s)));

/* ---------- ngày ---------- */
const qtP=n=>String(n).padStart(2,"0");
const qtYmd=d=>d.getFullYear()+"-"+qtP(d.getMonth()+1)+"-"+qtP(d.getDate());
const qtD=s=>new Date(s+"T12:00:00");
const qtToday=()=>qtYmd(new Date());
const qtAdd=(s,n)=>{const d=qtD(s);d.setDate(d.getDate()+n);return qtYmd(d)};
const qtDM=s=>s?s.slice(8,10)+"/"+s.slice(5,7):"";
const qtTD=s=>s?QT_TH[qtD(s).getDay()]+" "+qtDM(s):"";
const qtDiff=(a,b)=>Math.round((qtD(a)-qtD(b))/864e5);
function qtMon(s){const d=qtD(s);d.setDate(d.getDate()-(d.getDay()+6)%7);return qtYmd(d)}

/* ---------- lưu / tải ---------- */
function qtPut(t,k,v){v=Object.assign({},v,{_t:Date.now()});QT.d[t][k]=v;QT.dirty[t+"\u0001"+k]=1;qtLocal();clearTimeout(QT.ft);QT.ft=setTimeout(qtFlush,700);return v}
async function qtFlush(){if(QT.srv!==true||QT.saving)return;const ks=Object.keys(QT.dirty);if(!ks.length)return;QT.saving=true;
 const items=ks.map(x=>{const [t,k]=x.split("\u0001"),v=(QT.d[t]||{})[k];return v?{t,k,v:JSON.stringify(v),ts:v._t}:null}).filter(Boolean);
 try{const r=await trkPost({a:"qtset",pass:GV.pass,items});if(r&&r.ok){ks.forEach(x=>{const [t,k]=x.split("\u0001"),v=(QT.d[t]||{})[k];if(!v||v._t<=Date.now())delete QT.dirty[x]});qtLocal();QT.err=""}
  else QT.err="Chưa lưu được lên Google Sheets ("+(r&&(r.err||r.msg)||"lỗi")+"). Dữ liệu vẫn giữ trên máy này."}
 catch(e){QT.err="Mất kết nối khi lưu. Dữ liệu vẫn giữ trên máy này, trang sẽ tự gửi lại."}
 QT.saving=false;const b=document.querySelector(".qtsrv");if(b)b.outerHTML=qtSrvBar()}
async function qtLoad(){if(!GV.pass||typeof trkPost!="function")return;QT.busy=true;
 try{const r=await trkPost({a:"qtget",pass:GV.pass});
  if(r&&r.qt&&r.ok){QT.srv=true;QT.err="";(r.items||[]).forEach(it=>{const L=QT.d[it.t];if(!L)return;let v;try{v=JSON.parse(it.v)}catch(e){return}
    const cur=L[it.k];if(!cur||!QT.dirty[it.t+"\u0001"+it.k]||(cur._t||0)<=(+it.ts||0)){L[it.k]=v;delete QT.dirty[it.t+"\u0001"+it.k]}});qtLocal()}
  else QT.srv=false}catch(e){QT.srv=false}
 QT.busy=false;qtSeed();qtSync();if(QT.srv)qtFlush()}
const QT_SV=2;/* tăng khi sửa QT_SEED: lộ trình nạp sẵn mà cô chưa sửa (_t=1) sẽ được thay bằng bản mới */
function qtSeed(){Object.keys(QT_SEED).forEach(c=>{const o=QT.d.lt[c];if(!o||(o._t===1&&o._sv!==QT_SV)){QT.d.lt[c]=Object.assign(JSON.parse(JSON.stringify(QT_SEED[c])),{_t:1,_sv:QT_SV});QT.dirty["lt\u0001"+c]=1}});qtLocal()}
/* điểm danh cô ghi → gộp vào GV.data.dd để Báo cáo tuần, Điểm danh, Tổng quan cùng thấy */
/* QT.d.dd["lớp|ngày"] = {c:[có mặt, gồm cả đi muộn], m:[đi muộn], p:[vắng có phép], x:[bạn tự điểm danh nhưng cô sửa thành vắng]} */
function qtSync(){const D=GV.data;if(!D)return;if(!D._dd0)D._dd0=(D.dd||[]).slice();
 const V=(cls,d)=>QT.d.dd[cls+"|"+d]||{},dd=D._dd0.filter(x=>!(V(x.cls,x.d).x||[]).includes(x.code)&&!Object.keys(QT.d.dd).some(k=>k.endsWith("|"+x.d)&&(QT.d.dd[k].x||[]).includes(x.code)))
  .map(x=>{const v=Object.keys(QT.d.dd).filter(k=>k.endsWith("|"+x.d)).map(k=>QT.d.dd[k]).find(v=>(v.m||[]).includes(x.code));return v?Object.assign({},x,{late:1,t:((x.t||"")+" muộn").trim()}):x});
 Object.keys(QT.d.dd).forEach(k=>{const i=k.lastIndexOf("|"),cls=k.slice(0,i),d=k.slice(i+1),v=QT.d.dd[k];(v.c||[]).forEach(code=>{if(!dd.some(x=>x.d==d&&x.code==code)){const m=(v.m||[]).includes(code);dd.push({d,code,cls,t:m?"cô ghi · muộn":"cô ghi",late:m?1:0})}})});D.dd=dd}
/* trạng thái 1 bạn trong 1 buổi: co / muon / phep / vang */
function qtDdSt(cls,d,code){const v=QT.d.dd[cls+"|"+d]||{},dd=(GV.data&&GV.data.dd)||[];
 if((v.p||[]).includes(code))return"phep";const x=dd.find(z=>z.d==d&&z.code==code);if(!x)return"vang";return x.late?"muon":"co"}

/* ---------- lộ trình ---------- */
const qtL=cls=>{const L=QT.d.lt[cls];return L&&!L.hide?L:null};
function qtIsDay(L,s){return(L.ex||[]).includes(s)||((L.days||[]).includes(qtD(s).getDay())&&!(L.off||[]).includes(s))}
function qtNext(L,s,dir){let x=s;for(let i=0;i<400;i++){x=qtAdd(x,dir);if(qtIsDay(L,x))return x}return null}
/* [{s, d, han}] theo thứ tự buổi */
function qtFixed(L){return!!((L.days||[]).length||(L.ex||[]).length)}
/* [{s, d, han}] theo thứ tự buổi. Lịch cố định: tính từ mốc theo thứ học; buổi có ngày riêng (s.dt) dùng ngày đó và các buổi sau tính tiếp từ đó.
   Lịch không cố định (không tick thứ nào): mỗi buổi dùng ngày cô điền (s.dt). */
function qtSched(L){if(!L||!L.s)return[];const S=L.s.slice().sort((a,b)=>a.n-b.n),map={};
 if(qtFixed(L)&&L.an&&L.an.d&&L.an.n!=null){const n0=+L.an.n;
  S.filter(x=>x.n==n0).forEach(x=>map[x.n]=x.dt||L.an.d);
  let d=(S.find(x=>x.n==n0)||{}).dt||L.an.d;S.filter(x=>x.n>n0).forEach(x=>{d=x.dt||(d&&qtNext(L,d,1));map[x.n]=d||""});
  d=L.an.d;S.filter(x=>x.n<n0).reverse().forEach(x=>{d=x.dt||(d&&qtNext(L,d,-1));map[x.n]=d||""})}
 else S.forEach(x=>map[x.n]=x.dt||"");
 return S.map((s,i)=>{const d=map[s.n]||"",nx=S.slice(i+1).map(y=>map[y.n]).find(Boolean),en=QT.d.en[qtKey(L,d)];
  return{s,d,han:(en&&en.han)||(nx?qtAdd(nx,-1):d?qtAdd(d,6):"")}})}
function qtKey(L,d){const c=Object.keys(QT.d.lt).find(k=>QT.d.lt[k]===L);return c+"|"+d}
const qtHid=c=>!!(QT.d.lt[c]&&QT.d.lt[c].hide);
const qtCls=()=>{const D=GV.data,a=new Set(D.hv.filter(h=>h.st!="Nghỉ").map(h=>h.cls).filter(Boolean));Object.keys(QT.d.lt).forEach(c=>a.add(c));return[...a].filter(c=>!qtHid(c)).sort((x,y)=>x.localeCompare(y,"vi"))};
const qtHv=cls=>GV.data.hv.filter(h=>h.cls==cls&&h.st!="Nghỉ").sort((a,b)=>a.name.split(" ").pop().localeCompare(b.name.split(" ").pop(),"vi"));
const qtTime=L=>L&&L.time?L.time:"";

/* ---------- bài trên web ---------- */
function qtLesOpts(){const o=[];[1,2,3,4,5].forEach(lv=>{const b=(typeof NAP!="undefined"&&NAP[lv]&&NAP[lv].bai)||Object.keys((LDS||{})[lv]||{}).map(Number);b.forEach(n=>o.push(lv+"-"+n))});QT_L6.forEach(n=>o.push("6-"+n));QT_L7.forEach(n=>o.push("7-"+n));return o}
function qtLesT(w,short){if(!w)return"";const [lv,b]=w.split("-").map(Number);const T=lv==7?QT_T7[b-1]:((typeof LTS!="undefined"&&LTS[lv])||[])[b-1];
 return(lv==6?"GT chuẩn HSK1":gvLv(lv))+" · Bài "+b+(!short&&T?" ("+String(T).split("|")[0]+")":"")}
/* lớp học song song 2 quyển HSK1 (thêm 02/11/2026, lớp K49): 📙 bìa CAM = Giáo trình chuẩn (cấp web 6), 📘 bìa XANH = New HSK 1 (cấp web 1).
   Lớp "2 quyển" = lộ trình ghi cấp GT chuẩn hoặc có bài web 6-…; buổi không gắn bài web mà ghi "Chủ đề…" / "3.0" coi là quyển xanh.
   Mọi tin nhắc của lớp này ghi rõ màu bìa, xếp quyển CAM trước rồi đến quyển XANH. */
const QT_BK={cam:{i:"📙",t:"QUYỂN CAM",n:"Giáo trình chuẩn HSK1",web:"HSK1 · Giáo trình chuẩn"},xanh:{i:"📘",t:"QUYỂN XANH",n:"New HSK 1",web:"New HSK 1"}},QT_BKO=["cam","xanh",""];
function qtBk(w,s){if(w){const lv=+String(w).split("-")[0];return lv==6?"cam":lv==1?"xanh":""}
 if(s){if(s.w)return qtBk(s.w);return /3\.0|chủ đề/i.test([s.cd,s.nd].join(" "))?"xanh":""}return""}
const qtTwo=c=>{const L=qtL(c);return!!L&&(L.lv==6||(L.s||[]).some(y=>/^6-/.test(y.w||"")))};
const qtBkH=k=>`${QT_BK[k].i} ${QT_BK[k].t} (${QT_BK[k].n})`;
const qtBkS=(k,t)=>k?`${QT_BK[k].i} Quyển ${k=="cam"?"cam":"xanh"} · ${t}`:t;
const qtNoBk=t=>String(t).replace(/^[^·]*· /,"");
/* tên bài kèm màu quyển (lớp 2 quyển) hoặc như cũ */
const qtLesB=(c,w,short)=>qtTwo(c)?qtBkS(qtBk(w),qtNoBk(qtLesT(w,short))):qtLesT(w,short);
/* lớp 2 quyển: bỏ ghi chú riêng của cô ("HSK1 3.0 · bản web") khỏi tin gửi học viên */
const qtSesC=s=>s.cd&&/3\.0|bản web/i.test(s.nd||"")?s.cd:qtSesT(s);
const qtSesB=(c,s)=>qtTwo(c)?qtBkS(qtBk(s.w,s),qtSesC(s)):qtSesT(s);
/* gom theo quyển: cam trước, xanh sau, còn lại cuối */
const qtByBk=(arr,f)=>QT_BKO.map(k=>({k,a:arr.filter(x=>(f(x)||"")==k)})).filter(o=>o.a.length);
const QT_NAP={};
function qtNeed(lv){if(typeof napOk=="function"&&lv!=6&&!napOk(lv)&&!QT_NAP[lv]){QT_NAP[lv]=1;napLv(lv).then(()=>{["hn","lop","ct"].includes(GV.tab)&&gvDraw()},()=>{})}}
/* tình trạng một bài của một học viên: ok / do (làm dở) / low (<80%) / no (chưa làm) */
function qtLesSt(code,w){const [lv,b]=w.split("-").map(Number);qtNeed(lv);const r=GV.data.tt.find(x=>x.code==code&&x.lv==lv&&x.b==b);
 const P=(typeof bcParts=="function"&&bcParts(lv,b))||(r?Object.keys(PNM).filter(k=>k!="test"&&r[k]!=null).map(k=>[k,PNM[k]]):[]);
 if(!r)return{st:"no",miss:[],low:[],avg:null};const miss=P.filter(p=>r[p[0]]==null).map(p=>p[1]),low=P.filter(p=>r[p[0]]!=null&&r[p[0]]<80).map(p=>p[1]);
 return{st:miss.length&&miss.length==P.length?"no":miss.length?"do":low.length?"low":"ok",miss,low,avg:r.avg!=null?Math.round(r.avg):null,r}}
const QT_ST={ok:"✅ xong",do:"🟠 làm dở",low:"🟡 chưa đạt 80%",no:"🔴 chưa làm"};

/* bài phải làm của lớp đến ngày `to` (gồm bài của buổi hôm nay) */
function qtReq(cls,to){const L=qtL(cls);if(!L)return[];const seen={};
 return qtSched(L).filter(x=>x.d&&x.d<=to&&x.s.w&&x.s.k!="kt").reverse().filter(x=>seen[x.s.w]?0:(seen[x.s.w]=1)).reverse()}
/* tình trạng một học viên trong lớp */
function qtStu(h,cls,to){to=to||qtToday();const T=qtToday(),req=qtReq(cls,to),from=qtYmd(new Date(Date.now()-GV.days*864e5));
 const items=req.map(x=>{const S=qtLesSt(h.code,x.s.w);return Object.assign({w:x.s.w,han:x.han,d:x.d,n:x.s.n,over:x.han&&x.han<T},S)});
 const dd=GV.data.dd||[],cs=new Set(qtHv(cls).map(x=>x.code)),held=[...new Set(qtSched(qtL(cls)).filter(x=>x.d&&x.d<=to&&x.d>=from&&(x.d<T||(x.d==T&&dd.some(z=>z.d==T&&cs.has(z.code))))).map(x=>x.d).concat(qtDdExtra(cls).filter(d=>d<=to&&d>=from)))].sort();
 const pres=held.filter(d=>dd.some(x=>x.d==d&&x.code==h.code)),abs=held.filter(d=>!pres.includes(d)),late=pres.filter(d=>qtDdSt(cls,d,h.code)=="muon"),ex=abs.filter(d=>qtDdSt(cls,d,h.code)=="phep");
 const bad=items.filter(x=>x.st!="ok"),st=!bad.length?"ok":bad.some(x=>x.over)?"no":"low";
 return{items,bad,held,pres,abs,late,ex,st}}
/* ngày cô điểm danh ngoài lộ trình (học bù, buổi thêm) */
function qtDdExtra(cls){const L=qtL(cls),S=L?qtSched(L).map(x=>x.d):[];return Object.keys(QT.d.dd).filter(k=>k.startsWith(cls+"|")).map(k=>k.slice(cls.length+1)).filter(d=>!S.includes(d)&&((QT.d.dd[cls+"|"+d].c||[]).length||(QT.d.dd[cls+"|"+d].p||[]).length))}

/* ---------- copy ---------- */
async function qtCopy(t,btn){let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(e){}
 if(!ok){const a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0;top:0";document.body.appendChild(a);a.select();try{ok=document.execCommand("copy")}catch(e){}a.remove()}
 if(btn){const o=btn.dataset.o||btn.textContent;btn.dataset.o=o;btn.textContent=ok?"✅ Đã sao chép — dán vào Zalo":"Máy chặn sao chép, cô bôi đen tin rồi sao chép";setTimeout(()=>{btn.textContent=o},2500)}return ok}
const QT_MSG={};
function qtCp(id,btn){const t=QT_MSG[id];if(t!=null)qtCopy(typeof t=="function"?t():t,btn)}
const qtMsgBox=(id,t)=>{QT_MSG[id]=t;return `<div class="bcmsg" id="qtm_${id}">${gvE(t)}</div>`};

/* ---------- thanh trạng thái máy chủ ---------- */
function qtSrvBar(){const n=Object.keys(QT.dirty).length;
 if(QT.srv===true)return `<div class="qtsrv ok">${QT.err?`<span class="bad">${gvE(QT.err)}</span>`:n?`Đang lưu ${n} thay đổi…`:"✔ Lộ trình, điểm danh, phiếu kiểm tra, tuyển sinh đã lưu trên Google Sheets."}</div>`;
 if(QT.srv===false)return `<div class="qtsrv warn">⚠️ Google Sheets chưa cài phần Quản trị mới, nên lộ trình, điểm danh cô ghi, phiếu kiểm tra và tuyển sinh <b>đang lưu trên máy này</b> (${n} mục chờ gửi). Cô làm theo <b>huong-dan/quantri-api.gs.txt</b>; cài xong bấm ↻ Tải lại, trang tự gửi lên.</div>`;
 return ""}

/* ================= 🏠 HÔM NAY ================= */
function qtHn(F){const T=qtToday(),D=GV.data,cls=qtCls().filter(c=>!GV.cls||c==GV.cls),now=new Date(),hm=qtP(now.getHours())+":"+qtP(now.getMinutes());
 const today=[],miss=[],due=[],kts=[],past=[];
 cls.forEach(c=>{const L=qtL(c),hv=qtHv(c);if(!L)return;const S=qtSched(L),dd=D.dd||[];
  const x=S.find(y=>y.d==T);if(x)today.push({c,L,x,hv});else if(!S.length&&(L.days||[]).includes(now.getDay())&&!(L.off||[]).includes(T))today.push({c,L,x:null,hv});
  S.filter(y=>y.d&&y.d<T&&qtDiff(T,y.d)<=14&&hv.length&&!dd.some(z=>z.d==y.d&&hv.some(h=>h.code==z.code))).forEach(y=>miss.push({c,y}));
  S.filter(y=>y.s.w&&(y.han==T||y.han==qtAdd(T,1))&&y.d<=T).forEach(y=>{const nd=hv.filter(h=>qtLesSt(h.code,y.s.w).st!="ok");if(nd.length)due.push({c,y,nd})});
  S.filter(y=>y.s.k=="kt"&&y.d>=T&&qtDiff(y.d,T)<=7).forEach(y=>kts.push({c,y}));
  S.filter(y=>y.d&&y.d<T&&qtDiff(T,y.d)<=14&&hv.some(h=>dd.some(z=>z.d==y.d&&z.code==h.code))).map(y=>({c,d:y.d,n:"Buổi "+y.s.n})).concat(qtDdExtra(c).filter(d=>d<T&&qtDiff(T,d)<=14).map(d=>({c,d,n:"Buổi thêm"}))).forEach(o=>past.push(Object.assign(o,{hv})))});
 past.sort((a,b)=>b.d.localeCompare(a.d)||a.c.localeCompare(b.c,"vi"));
 today.sort((a,b)=>qtTime(a.L).localeCompare(qtTime(b.L)));
 const ts=((QT.d.ts.all||{}).list||[]).filter(p=>p.hen&&p.hen<=T&&!["Đã đăng ký","Không học"].includes(p.st));
 const chg=typeof CHG!="undefined"&&CHG.cnt||0,nh=typeof nhtCnt=="function"?nhtCnt():0,sun=now.getDay()==0;
 let h=`${qtSrvBar()}<div class="qthd"><b>${QT_TH[now.getDay()]}, ${qtDM(T)}/${T.slice(0,4)}</b>${sun?`<button class="btn sm" onclick="GV.tab='ct';gvDraw()">📅 Chủ nhật: chốt tuần →</button>`:""}</div>`;
 h+=`<h3 class="ab-h">Lớp hôm nay</h3>`+(today.length?`<div class="qtcards">${today.map(o=>qtTodayCard(o,T,hm)).join("")}</div>`:`<div class="card ctx">Hôm nay không có buổi học nào theo lộ trình${GV.cls?" của lớp này":""}.</div>`);
 if(miss.length)h+=`<div class="card qtwarn"><b>⚠️ Buổi học chưa điểm danh</b>${miss.map(m=>`<div class="qtln"><span>${gvE(m.c)} · ${qtTD(m.y.d)} · Buổi ${m.y.s.n}</span><span class="row"><button class="btn sm" onclick="qtDdOpen(${qtJ(m.c)},'${m.y.d}')">✋ Điểm danh</button><button class="btn o sm" onclick="qtOff(${qtJ(m.c)},'${m.y.d}')">Buổi này nghỉ</button></span></div>${QT.ui.dd==m.c+"|"+m.y.d?qtDdPanel(m.c,m.y.d):""}`).join("")}</div>`;
 if(past.length){const op=past.some(o=>QT.ui.dd==o.c+"|"+o.d);h+=`<details class="card qtpast" ${op?"open":""}><summary><b>✏️ Sửa điểm danh 2 tuần qua</b> <small>(thêm bạn đến muộn, đánh dấu có phép…)</small></summary>${past.map(o=>{const p=o.hv.filter(h=>qtDdSt(o.c,o.d,h.code)!="vang"&&qtDdSt(o.c,o.d,h.code)!="phep").length;
  return `<div class="qtln"><span>${gvE(o.c)} · ${qtTD(o.d)} · ${o.n}</span><span class="qtst">có mặt ${p}/${o.hv.length}${qtDdBadge(o.c,o.d,o.hv)} <button class="btn o sm" onclick="qtDdOpen(${qtJ(o.c)},'${o.d}')">✋ Sửa</button></span></div>${QT.ui.dd==o.c+"|"+o.d?qtDdPanel(o.c,o.d):""}`}).join("")}</details>`}
 const todo=[];
 if(chg)todo.push(`<button class="qtchip" onclick="GV.stu=null;GV.tab='cc';typeof chgLoad=='function'&&chgLoad();gvDraw()">✍ ${chg} bài chờ chấm</button>`);
 if(nh)todo.push(`<button class="qtchip" onclick="GV.stu=null;GV.tab='nh';typeof nhtLoad=='function'&&nhtLoad();gvDraw()">🎭 ${nh} nhóm chờ nhận xét</button>`);
 if(ts.length)todo.push(`<button class="qtchip" onclick="GV.tab='ts';gvDraw()">🎯 ${ts.length} người hẹn gọi lại hôm nay</button>`);
 kts.forEach(k=>todo.push(`<button class="qtchip" onclick="GV.cls=${qtJ(k.c)};QT.ui.kt='${k.y.d}';QT.ui.kto=${qtJ(k.c)};GV.tab='lop';gvDraw()">📝 ${gvE(k.c)} kiểm tra ${qtTD(k.y.d)}</button>`));
 if(todo.length)h+=`<h3 class="ab-h">Việc chờ cô</h3><div class="qtchips">${todo.join("")}</div>`;
 if(due.length)h+=`<h3 class="ab-h">⏰ Sắp hết hạn nộp</h3>${due.map(o=>{const id="due_"+o.c+o.y.d,L=[];
  L.push(`📌 Lớp ${o.c}: bài "${qtLesB(o.c,o.y.s.w,1)}" trên web hạn nộp ${o.y.han==T?"HÔM NAY":"ngày mai"} (${qtTD(o.y.han)}).`);if(qtTwo(o.c)&&qtBk(o.y.s.w))L.push(`(Trên web chọn mục "${QT_BK[qtBk(o.y.s.w)].web}".)`);L.push("Các bạn chưa xong: "+o.nd.map(h=>h.name).join(", ")+".");L.push("Các em làm đủ các phần, đạt từ 80% nhé! — Cô Thảo");
  return `<div class="card"><b>${gvE(o.c)}</b> · ${gvE(qtLesT(o.y.s.w))} · hạn ${qtTD(o.y.han)}<p>Chưa xong (${o.nd.length}): ${o.nd.map(h=>`<a onclick="GV.stu='${h.code}';gvDraw()">${gvE(h.name)}</a>`).join(", ")}</p>${qtMsgBox(id,L.join("\n"))}<button class="btn sm" onclick="qtCp('${qtA(id)}',this)">📋 Sao chép tin nhắc nhóm lớp</button></div>`}).join("")}`;
 return h+`<p class="ctx">Lịch "Lớp hôm nay" lấy theo lộ trình ở tab <b>👥 Lớp</b>. Lớp chưa có lộ trình thì vào tab Lớp › Lộ trình để nhập.</p>`}
function qtTodayCard(o,T,hm){const {c,L,x,hv}=o,dd=GV.data.dd||[],pr=hv.filter(h=>dd.some(z=>z.d==T&&z.code==h.code)),t=qtTime(L),late=t&&hm>=t;
 const pin=((GV.data.lop||[]).find(l=>l.cls==c)||{}).pin,en=QT.d.en[c+"|"+T];
 return `<div class="card qttd"><div class="qttdh"><div><b>${gvE(c)}</b><small>${t?t+" · ":""}${x?`Buổi ${x.s.n} · ${gvE(qtSesT(x.s))}`:"chưa có lộ trình"}</small></div>${pin?`<span class="qtpin" title="Mã điểm danh hôm nay">${gvE(pin)}</span>`:""}</div>
${x&&x.s.w?`<small class="ctx">Bài trên web: ${gvE(qtLesT(x.s.w))}</small>`:""}
<div class="qtdd ${pr.length?"ok":late?"no":""}">${pr.length?`Có mặt <b>${pr.length}/${hv.length}</b>`:late?"🔴 Chưa điểm danh":"Chưa điểm danh"}</div>
<div class="row"><button class="btn sm" onclick="qtDdOpen(${qtJ(c)},'${T}')">✋ Điểm danh</button>${x?`<button class="btn ${en?"o ":""}sm" onclick="qtEnOpen(${qtJ(c)},'${T}')">${en?"✔ Đã giao bài":"🏁 Kết thúc buổi · giao bài"}</button>`:""}</div>
${QT.ui.dd==c+"|"+T?qtDdPanel(c,T):""}${QT.ui.en==c+"|"+T&&x?qtEnPanel(c,x):""}</div>`}
const qtSesT=s=>[s.cd,s.nd].filter(Boolean).join(" — ")||QT_K[s.k]||"";

/* ---------- điểm danh nhanh ---------- */
function qtDdOpen(c,d){QT.ui.dd=QT.ui.dd==c+"|"+d?null:c+"|"+d;QT.ui.en=null;gvDraw()}
const QT_DS=[["co","✓ Có mặt"],["muon","⏰ Đi muộn"],["phep","📝 Có phép"],["vang","✗ Vắng"]];
function qtDdBadge(c,d,hv){const m=hv.filter(h=>qtDdSt(c,d,h.code)=="muon").length,p=hv.filter(h=>qtDdSt(c,d,h.code)=="phep").length;return (m?` <small>· ⏰ ${m} muộn</small>`:"")+(p?` <small>· 📝 ${p} có phép</small>`:"")}
function qtDdPanel(c,d){const hv=qtHv(c),self=(GV.data._dd0||[]).filter(x=>x.d==d);
 return `<div class="qtpan" id="qtdd"><b>Điểm danh ${gvE(c)} · ${qtTD(d)}</b><div class="qtdl">${hv.map(h=>{const s=self.find(x=>x.code==h.code),v=QT.d.dd[c+"|"+d]||{},cur=(v.x||[]).includes(h.code)?"vang":qtDdSt(c,d,h.code);
  return `<div class="qtdr ${cur}" data-code="${h.code}" data-self="${s?1:0}"><span>${gvE(h.name)}${s?` <small>(tự điểm danh${s.t&&/\d/.test(s.t)?" "+gvE(s.t.replace(/\s*muộn$/,"")):""})</small>`:""}</span><span class="qtrd">${QT_DS.map(o=>`<button type="button" class="${o[0]}${cur==o[0]?" on":""}" onclick="qtDdPick(this,'${o[0]}')">${o[1]}</button>`).join("")}</span></div>`}).join("")||"<span class='ctx'>Lớp chưa có học viên.</span>"}</div>
<div class="row"><button class="btn o sm" onclick="document.querySelectorAll('#qtdd .qtdr.vang').forEach(r=>qtDdPick(r.querySelector('.co'),'co'))">Các bạn còn lại: có mặt</button><button class="btn sm" onclick="qtDdSave(${qtJ(c)},'${d}')">💾 Lưu điểm danh</button><button class="btn o sm" onclick="QT.ui.dd=null;gvDraw()">Đóng</button></div>
<small class="ctx">Đi muộn vẫn tính là có mặt. Có phép vẫn tính vắng, nhưng ghi rõ "có phép" trong báo cáo.</small></div>`}
function qtDdPick(b,v){const r=b.closest(".qtdr");r.className="qtdr "+v;r.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x.classList.contains(v)))}
function qtDdSave(c,d){const o={c:[],m:[],p:[],x:[]};document.querySelectorAll("#qtdd .qtdr").forEach(r=>{const k=r.dataset.code,v=r.className.split(" ")[1],self=r.dataset.self=="1";
  if(v=="co"||v=="muon"){if(!self)o.c.push(k);if(v=="muon")o.m.push(k)}else{if(v=="phep")o.p.push(k);if(self)o.x.push(k)}});
 qtPut("dd",c+"|"+d,o);QT.ui.dd=null;qtSync();gvDraw()}
function qtOff(c,d){const L=qtL(c);if(!L)return;ask(`Đánh dấu ${qtTD(d)} lớp ${gvE(c)} <b>nghỉ</b>? Buổi đó và các buổi sau tự lùi một buổi.`,()=>{const o=JSON.parse(JSON.stringify(L));delete o._t;delete o._sv;o.off=[...new Set([...(L.off||[]),d])];(o.s||[]).forEach(x=>{if(x.dt==d)delete x.dt});
 if(o.an&&o.an.d==d){const nx=qtNext(o,d,1);o.an={n:o.an.n,d:nx}}qtPut("lt",c,o);gvDraw()})}

/* ---------- kết thúc buổi: giao bài ---------- */
function qtEnOpen(c,d){QT.ui.en=QT.ui.en==c+"|"+d?null:c+"|"+d;QT.ui.dd=null;gvDraw()}
function qtEnMsg(c,x){const e=QT.d.en[c+"|"+x.d]||{},w=e.w!=null?e.w:x.s.w,han=e.han||x.han,L=[];
 L.push("NHIỆM VỤ VỀ NHÀ");L.push("");
 const nb=qtSched(qtL(c)).find(y=>y.d&&y.d>x.d);
 if(qtTwo(c)){const B={cam:[],xanh:[],"":[]};
  if(w){const k=qtBk(w),bn=String(w).split("-")[1];
   B[k].push(`• Trên web cô Thảo${k?` (mục "${QT_BK[k].web}")`:""}: ${k?qtNoBk(qtLesT(w)):qtLesT(w)} — ${qtWebReq(w)}`);
   B[k].push(`• Ghi từ vựng bài ${bn}${k?" quyển "+(k=="cam"?"cam":"xanh"):""} vào vở, mỗi chữ 2-3 dòng + đặt câu với từ đó, buổi sau cô sẽ kiểm tra đột xuất.`)}
  else{const k=qtBk("",x.s);if(k)B[k].push(`• Ôn lại bài hôm nay: ${qtSesC(x.s)}.`)}
  if(nb){const k=qtBk(nb.s.w,nb.s),t=nb.s.w?(k?qtNoBk(qtLesT(nb.s.w)):qtLesT(nb.s.w)):qtSesC(nb.s);if(t)B[k].push(`• Chuẩn bị buổi sau (${qtTD(nb.d)}): ${t}.`)}
  ["cam","xanh"].forEach(k=>{if(B[k].length){L.push(qtBkH(k));B[k].forEach(t=>L.push(t));L.push("")}});
  B[""].forEach(t=>L.push(t));
  if(e.x){const k=qtBk(w,x.s);String(e.x).split(/\n+/).filter(Boolean).forEach(t=>B[k].push("• "+t.trim()))}
  if(L.length==2)L.push("• Ôn lại bài hôm nay.");
  while(L[L.length-1]==="")L.pop();
  if(han)L.push(`⏰ Hạn nộp: hết ngày ${qtTD(han)}.`);L.push("Các em nhìn đúng màu bìa để mở đúng quyển nhé!");return L.join("\n")}
 if(w){const bn=String(w).split("-")[1];L.push(`• Trên web cô Thảo: ${qtLesT(w)} — ${qtWebReq(w)}`);
  L.push(`• Ghi từ vựng của bài ${bn} vào vở, mỗi chữ 2-3 dòng + đặt câu với từ đó, buổi sau cô sẽ kiểm tra đột xuất.`)}
 if(e.x)String(e.x).split(/\n+/).filter(Boolean).forEach(s=>L.push("• "+s.trim()));
 if(!w&&!e.x)L.push("• Ôn lại bài hôm nay.");
 if(nb){const t=nb.s.w?qtLesT(nb.s.w):qtSesT(nb.s);if(t)L.push(`• Chuẩn bị bài: ${t}.`)}
 if(han)L.push(`⏰ Hạn nộp: hết ngày ${qtTD(han)}.`);return L.join("\n")}
function qtEnPanel(c,x){const e=QT.d.en[c+"|"+x.d]||{},w=e.w!=null?e.w:x.s.w,han=e.han||x.han,id="en_"+c+x.d;
 return `<div class="qtpan"><b>Giao bài sau buổi ${x.s.n}</b>
<label class="qtf">Bài trên web <select onchange="qtEn(${qtJ(c)},'${x.d}','w',this.value)"><option value="">(không giao bài web)</option>${qtLesOpts().map(o=>`<option value="${o}" ${o==w?"selected":""}>${gvE(qtLesT(o))}</option>`).join("")}</select></label>
<label class="qtf">Bài tập thêm (sách, vở…) <textarea class="tin" rows="2" placeholder="Ví dụ: Viết mỗi chữ mới 1 dòng" onchange="qtEn(${qtJ(c)},'${x.d}','x',this.value)">${gvE(e.x||"")}</textarea></label>
<label class="qtf">Hạn nộp <input type="date" class="tin" value="${han}" onchange="qtEn(${qtJ(c)},'${x.d}','han',this.value)"> <small class="ctx">Mặc định: trước buổi sau 1 ngày.</small></label>
${qtMsgBox(id,qtEnMsg(c,x))}<div class="row"><button class="btn sm" onclick="qtEnDone(${qtJ(c)},'${x.d}');qtCp('${qtA(id)}',this)">📋 Sao chép tin giao bài</button><button class="btn o sm" onclick="QT.ui.en=null;gvDraw()">Đóng</button></div></div>`}
function qtEn(c,d,k,v){const e=Object.assign({},QT.d.en[c+"|"+d]||{});e[k]=v;qtPut("en",c+"|"+d,e);
 if(k=="w"){const L=qtL(c),s=L&&L.s.find(y=>qtSched(L).some(z=>z.s===y&&z.d==d));if(s){const o=JSON.parse(JSON.stringify(L));o.s.find(y=>y.n==s.n).w=v;delete o._t;qtPut("lt",c,o)}}
 gvDraw()}
function qtEnDone(c,d){const e=Object.assign({},QT.d.en[c+"|"+d]||{});if(!e.ok){e.ok=1;qtPut("en",c+"|"+d,e)}}

/* ================= 👥 LỚP ================= */
function qtLop(F){const cls=qtCls();
 if(!GV.cls||!cls.includes(GV.cls))return `${qtSrvBar()}<div class="card note">Chọn một lớp để xem tuần này học gì, chuyên cần và ai còn thiếu bài.</div><div class="qtpick">${cls.map(c=>{const L=qtL(c),hv=qtHv(c),bad=hv.filter(h=>qtStu(h,c).st=="no").length,S=qtSched(L),T=qtToday(),nx=S.find(x=>x.d>=T);
  return `<button class="card" onclick="gvSet('cls',${qtJ(c)})"><b>${gvE(c)}</b><small>${hv.length} học viên${L&&L.days?" · "+L.days.map(d=>QT_TH[d]).join("+")+(L.time?" "+L.time:""):""}</small>${nx?`<small>Buổi tới: ${qtTD(nx.d)} · ${gvE(qtSesT(nx.s))}</small>`:`<small class="ctx">${S.length?"Đã học hết lộ trình":"Chưa có lộ trình"}</small>`}${bad?`<small class="bad">🔴 ${bad} bạn quá hạn bài</small>`:""}</button>`}).join("")}
<div class="card qtnew"><b>➕ Thêm lớp mới</b><input class="tin" id="qtnewc" placeholder="Ví dụ: K50 HSK1" onkeydown="if(event.key=='Enter')qtNewCls()"><button class="btn sm" onclick="qtNewCls()">Tạo lớp</button><small class="ctx">Tên lớp nên giống cột Lớp ở trang tính Học viên.</small></div></div>
${(()=>{const hd=Object.keys(QT.d.lt).filter(qtHid).sort();return hd.length?`<div class="card"><b>Lớp đã ẩn</b> <small class="ctx">(lớp đã kết thúc; lộ trình, điểm danh, phiếu kiểm tra vẫn giữ)</small><div class="row">${hd.map(c=>`<button class="btn o sm" onclick="qtHide(${qtJ(c)},0)">↩ Hiện lại ${gvE(c)}</button>`).join("")}</div></div>`:""})()}${qtMore()}`;
 const c=GV.cls,L=qtL(c),hv=qtHv(c),S=qtSched(L),T=qtToday(),lw=QT.ui.lw||0,mon=qtAdd(qtMon(T),7*lw),sun=qtAdd(mon,6),dd=GV.data.dd||[],
  wk=S.filter(x=>x.d>=mon&&x.d<=sun).concat(qtDdExtra(c).filter(d=>d>=mon&&d<=sun).map(d=>({d,s:{n:"thêm",cd:"Buổi học thêm / học bù",k:"hoc"},xt:1}))).sort((a,b)=>a.d.localeCompare(b.d)),
  wkT=lw==0?"Tuần này":lw==-1?"Tuần trước":lw==1?"Tuần sau":(lw<0?-lw+" tuần trước":"");
 const last=S.filter(x=>x.d&&x.d<=T).pop(),nx=S.find(x=>x.d>T),end=S.length?S[S.length-1]:null;
 const per=hv.map(h=>({h,R:qtStu(h,c)})),ord={no:0,low:1,ok:2};per.sort((a,b)=>ord[a.R.st]-ord[b.R.st]);
 let h=`${qtSrvBar()}<div class="card qtlh"><div><b class="qtbig">${gvE(c)}</b><small>${L&&L.days&&L.days.length?L.days.map(d=>QT_TH[d]).join(" + ")+(L.time?" · "+L.time:""):"Chưa có lịch"} · ${hv.length} học viên</small>
${end&&end.d?`<small>Lộ trình: ${S.length} buổi, kết thúc ${qtTD(end.d)}${last?` · đã học đến buổi ${last.s.n}`:""}</small>`:""}</div>
${nx?`<div class="qtnx"><small>Buổi tới</small><b>${qtTD(nx.d)}</b><small>Buổi ${nx.s.n} · ${gvE(qtSesT(nx.s))}</small></div>`:""}</div>`;
 const oth=QT.ui.dd&&QT.ui.dd.startsWith(c+"|")?QT.ui.dd.slice(c.length+1):"",othShow=oth&&!wk.some(x=>x.d==oth);
 h+=`<div class="qtwkh"><h3 class="ab-h">${wkT} (${qtDM(mon)} – ${qtDM(sun)})</h3><span class="row"><button class="btn o sm" ${lw<=-8?"disabled":""} onclick="QT.ui.lw=${lw-1};gvDraw()">‹ Tuần trước</button>${lw?`<button class="btn o sm" onclick="QT.ui.lw=0;gvDraw()">Tuần này</button>`:""}<button class="btn o sm" ${lw>=1?"disabled":""} onclick="QT.ui.lw=${lw+1};gvDraw()">Tuần sau ›</button></span></div>`+(wk.length?`<div class="card qtwk">${wk.map(x=>{const p=hv.filter(hh=>dd.some(z=>z.d==x.d&&z.code==hh.code)).length,st=x.d<T?(p?`✓ có mặt ${p}/${hv.length}${qtDdBadge(c,x.d,hv)}`:`<span class="bad">chưa điểm danh</span>`):x.d==T?`<b>hôm nay</b>${p?` · có mặt ${p}/${hv.length}`:""}`:"sắp tới";
  return `<div class="qtln ${x.d<T?"past":""}"><span><b>${qtTD(x.d)}</b> · ${x.xt?"":"Buổi "}${x.s.n} · ${gvE(qtSesT(x.s))}${x.s.w?` <small>· web: ${gvE(qtLesT(x.s.w,1))}</small>`:""}${x.s.k=="kt"?` <span class="pill">📝 Kiểm tra</span>`:""}</span><span class="qtst">${st} ${x.d<=T?`<button class="btn o sm" onclick="qtDdOpen(${qtJ(c)},'${x.d}')">✋ ${x.d<T&&p?"Sửa":"Điểm danh"}</button>`:""}</span></div>${QT.ui.dd==c+"|"+x.d?qtDdPanel(c,x.d):""}`}).join("")}</div>`
  :`<div class="card ctx">${S.length?"Tuần này lớp không có buổi theo lộ trình.":"Lớp chưa có lộ trình — mở mục Lộ trình bên dưới để nhập."}</div>`);
 h+=`<div class="card qtoth"><label class="qtf in">✋ Điểm danh ngày khác (học bù, buổi thêm) <input class="tin" type="date" id="qtothd" max="${T}" value="${othShow?oth:""}"></label><button class="btn o sm" onclick="const v=$('qtothd').value;if(v){QT.ui.dd=${qtJ(c)}+'|'+v;QT.ui.en=null;gvDraw()}">Mở</button>${othShow?qtDdPanel(c,oth):""}</div>`;
 const bad=per.filter(p=>p.R.bad.length),G=k=>per.filter(p=>p.R.st==k);
 const L2=[`📌 Lớp ${c} — bài trên web còn thiếu (đến ${qtDM(T)}):`],bl=(p,a)=>`• ${p.h.name}: ${a.map(x=>qtLesT(x.w,1).replace(/^.*· /,"")+" ("+QT_ST[x.st].replace(/^\S+ /,"")+")").join(", ")}`;
 if(qtTwo(c)){QT_BKO.forEach(k=>{const rs=bad.map(p=>({p,a:p.R.bad.filter(x=>qtBk(x.w)==k)})).filter(o=>o.a.length);if(!rs.length)return;L2.push("");
   if(k){L2.push(qtBkH(k));L2.push(`(Trên web chọn mục "${QT_BK[k].web}")`)}rs.forEach(o=>L2.push(bl(o.p,o.a)))});L2.push("")}
 else bad.forEach(p=>L2.push(bl(p,p.R.bad)));
 L2.push(nx?`Các em hoàn thành trước buổi ${qtTD(nx.d)} nhé! — Cô Thảo`:"Các em hoàn thành sớm nhé! — Cô Thảo");
 h+=`<h3 class="ab-h">Học viên · bài tập · chuyên cần</h3><div class="card qtsum"><span class="ok">✅ Đủ bài ${G("ok").length}</span><span class="low">🟠 Còn thiếu, chưa quá hạn ${G("low").length}</span><span class="no">🔴 Quá hạn ${G("no").length}</span>
${bad.length?`<button class="btn sm" onclick="qtCp('lop_${qtA(c)}',this)">📋 Tin nhắc cả nhóm lớp</button>`:""}</div>${bad.length?`<div hidden>${qtMsgBox("lop_"+c,L2.join("\n"))}</div>`:""}
<div class="qtlist">${per.map(p=>qtStuCard(p.h,p.R,c,nx)).join("")||`<div class="card">Lớp chưa có học viên đang học (trang tính Học viên).</div>`}</div>
<p class="ctx">"Bài phải làm" = bài trên web của các buổi đã học theo lộ trình. Hạn nộp = trước buổi sau 1 ngày. Chuyên cần tính các buổi trong ${GV.days} ngày qua (đổi ở ô Thời gian).</p>`;
 h+=qtKtSec(c,S,hv)+qtEdSec(c,L,S)+qtMore();return h}
function qtStuCard(h,R,c,nx){const ph=(typeof BCS!="undefined"&&(BCS.to[c]||"ph"))=="ph",id="nh_"+h.code;
 const L=[ph?`Kính gửi phụ huynh bạn ${h.name}!`:`Chào ${h.name}!`,`Cô Thảo nhắc ${ph?"con":"em"} bài trên web còn thiếu (lớp ${c}):`];
 const two=qtTwo(c),ln=(x,t)=>`• ${t}: ${QT_ST[x.st].replace(/^\S+ /,"")}${x.miss.length&&x.st=="do"?" — còn thiếu "+x.miss.join(", "):""}${x.low.length?" — chưa đạt 80%: "+x.low.join(", "):""}${x.han?` (hạn ${qtDM(x.han)}${x.over?", đã quá hạn":""})`:""}`;
 if(two){qtByBk(R.bad,x=>qtBk(x.w)).forEach(o=>{L.push("");if(o.k){L.push(qtBkH(o.k));L.push(`(Trên web chọn mục "${QT_BK[o.k].web}")`)}o.a.forEach(x=>L.push(ln(x,o.k?qtNoBk(qtLesT(x.w)):qtLesT(x.w))))});L.push("")}
 else R.bad.forEach(x=>L.push(ln(x,qtLesT(x.w))));
 L.push(nx?`${ph?"Nhờ phụ huynh nhắc con":"Em"} hoàn thành trước buổi học ${qtTD(nx.d)} ${ph?"giúp cô ạ":"nhé"}.`:`${ph?"Nhờ phụ huynh nhắc con":"Em"} hoàn thành sớm ${ph?"giúp cô ạ":"nhé"}.`);L.push("— Cô Thảo tiếng Trung");
 const cc=R.held.length?`<span class="qtcc ${R.abs.length?"no":"ok"}">Đi học ${R.pres.length}/${R.held.length}</span>`:"";
 return `<div class="card qtsc ${R.st}"><div class="qtsch"><a onclick="GV.stu='${h.code}';gvDraw()"><b>${gvE(h.name)}</b></a>${cc}</div>
${R.abs.length?`<small class="ctx">Vắng: ${R.abs.map(d=>qtTD(d)+(R.ex.includes(d)?" (có phép)":"")).join(", ")}</small>`:""}${R.late.length?`<small class="ctx">⏰ Đi muộn: ${R.late.map(qtTD).join(", ")}</small>`:""}
${R.items.length?`<div class="qtles">${(two?qtByBk(R.items,x=>qtBk(x.w)).flatMap(o=>o.a):R.items).map(x=>`<span class="qtl ${x.st}${x.over&&x.st!="ok"?" over":""}" title="${gvE(qtLesB(c,x.w))}">${two&&qtBk(x.w)?QT_BK[qtBk(x.w)].i+" ":""}${gvE(qtLesT(x.w,1).replace(/^.*· /,""))}: ${QT_ST[x.st]}${x.st=="ok"&&x.avg!=null?" "+x.avg+"%":""}${x.st=="do"&&x.miss.length?` <small>thiếu ${gvE(x.miss.join(", "))}</small>`:""}${x.st=="low"?` <small>${gvE(x.low.join(", "))}</small>`:""}</span>`).join("")}</div>`:`<small class="ctx">Chưa có bài trên web phải làm.</small>`}
${R.bad.length?`<details><summary>Tin nhắc riêng</summary>${qtMsgBox(id,L.join("\n"))}<button class="btn sm" onclick="qtCp('${id}',this)">📋 Sao chép</button></details>`:""}</div>`}
function qtMore(){return `<div class="qtmore"><small>Xem thêm:</small>${[["tq","Tổng quan"],["dd","Lịch sử điểm danh"],["dg","Phiếu tự đánh giá"],["ls","Lỗi hay gặp"]].map(t=>`<button class="btn o sm" onclick="GV.stu=null;gvSet('tab','${t[0]}')">${t[1]}</button>`).join("")}</div>`}

/* ---------- kiểm tra định kỳ ---------- */
function qtKtSec(c,S,hv){const T=qtToday(),ks=S.filter(x=>x.s.k=="kt"&&x.d).map(x=>x.d),own=Object.keys(QT.d.kt).filter(k=>k.startsWith(c+"|")).map(k=>k.split("|")[1]);
 const ds=[...new Set([...ks,...own])].sort();if(!QT.ui.kt||!ds.includes(QT.ui.kt))QT.ui.kt=ds.find(d=>d>=T)||ds[ds.length-1]||null;
 const op=QT.ui.kto==c||(QT.ui.kt&&QT.ui.kt>=T&&qtDiff(QT.ui.kt,T)<=7);
 let h=`<details class="qtktw" ${op?"open":""} ontoggle="QT.ui.kto=this.open?${qtJ(c)}:null"><summary class="ab-h">📝 Kiểm tra định kỳ ${QT.ui.kt?`<small>· ${qtTD(QT.ui.kt)}</small>`:""}</summary><div class="card"><div class="row">${ds.map(d=>`<button class="btn sm ${d==QT.ui.kt?"":"o"}" onclick="QT.ui.kt='${d}';gvDraw()">${qtTD(d)}${QT.d.kt[c+"|"+d]?" ✎":""}</button>`).join("")}
<label class="qtf in">Thêm ngày kiểm tra <input type="date" class="tin" onchange="if(this.value){QT.ui.kt=this.value;qtPut('kt',${qtJ(c)}+'|'+this.value,{r:{}});gvDraw()}"></label></div>`;
 if(!QT.ui.kt)return h+`<p class="ctx">Chưa có buổi kiểm tra. Đánh dấu "Kiểm tra" trong lộ trình hoặc thêm ngày ở trên.</p></div></details>`;
 const d=QT.ui.kt,K=QT.d.kt[c+"|"+d]||{r:{}};
 h+=`<p class="ctx">Phiếu ${qtTD(d)}${d>T?" (chưa tới ngày — cô vẫn chấm trước được)":""}. Chuyên cần và kết quả web tự tính đến ngày kiểm tra. Bấm mức để chấm, bấm lại để bỏ.</p></div><div class="qtlist">`;
 return h+hv.map(x=>qtKtCard(c,d,x,K)).join("")+`</div></details>`}
function qtKtData(c,d,hh){const R=qtStu(hh,c,d),S=qtSched(qtL(c)),all=S.filter(x=>x.d&&x.d<=d&&x.d<=qtToday()).map(x=>x.d),dd=GV.data.dd||[];
 const pres=all.filter(x=>dd.some(z=>z.d==x&&z.code==hh.code)),ok=R.items.filter(x=>x.st=="ok"),av=R.items.map(x=>x.avg).filter(v=>v!=null),wk={};
 R.items.forEach(x=>(x.low||[]).concat(x.miss||[]).forEach(p=>wk[p]=(wk[p]||0)+1));
 return{all,pres,R,ok,avg:av.length?Math.round(av.reduce((a,b)=>a+b,0)/av.length):null,weak:Object.keys(wk).sort((a,b)=>wk[b]-wk[a]).slice(0,2)}}
function qtKtMsg(c,d,hh){const K=QT.d.kt[c+"|"+d]||{r:{}},r=K.r[hh.code]||{},X=qtKtData(c,d,hh),ph=(typeof BCS!="undefined"&&(BCS.to[c]||"ph"))=="ph",L=[];
 L.push(ph?`Kính gửi phụ huynh bạn ${hh.name}!`:`Chào ${hh.name}!`);L.push(`Cô Thảo gửi kết quả kiểm tra định kỳ lớp ${c} (${qtTD(d)}):`);
 const cr=QT_KT.map((k,i)=>r.c&&r.c[i]!=null?k+": "+QT_LV[r.c[i]]:null).filter(Boolean);if(cr.length)L.push("• "+cr.join(" · "));
 if(X.all.length)L.push(`• Chuyên cần: ${X.pres.length}/${X.all.length} buổi.`);
 if(X.R.items.length)L.push(`• Luyện tập trên web: ${X.ok.length}/${X.R.items.length} bài đạt yêu cầu`+(X.avg!=null?`, điểm trung bình ${X.avg}%`:"")+(X.weak.length?`; phần cần ôn thêm: ${X.weak.join(", ")}`:"")+".");
 if(r.nx&&r.nx.trim())L.push(`Nhận xét của cô: ${r.nx.trim()}`);
 L.push("");L.push(ph?"Cảm ơn phụ huynh đã đồng hành cùng cô!":"Cô cảm ơn em, cố gắng tiếp nhé!");L.push("— Cô Thảo tiếng Trung");return L.join("\n")}
function qtKtCard(c,d,hh,K){const r=K.r[hh.code]||{},X=qtKtData(c,d,hh),id="kt_"+hh.code;QT_MSG[id]=()=>qtKtMsg(c,d,hh);
 return `<div class="card qtkt ${r.sent?"sent":""}"><div class="qtsch"><b>${gvE(hh.name)}</b><span class="qtcc ${X.all.length&&X.pres.length<X.all.length?"no":"ok"}">Chuyên cần ${X.pres.length}/${X.all.length}</span></div>
<div class="qtcr">${QT_KT.map((k,i)=>`<div><span>${k}</span><div class="qtlv">${QT_LV.map((v,j)=>`<button class="${r.c&&r.c[i]===j?"on l"+j:""}" onclick="qtKt(${qtJ(c)},'${d}','${hh.code}',${i},${j})">${v}</button>`).join("")}</div></div>`).join("")}</div>
<small class="ctx">Web: ${X.R.items.length?`${X.ok.length}/${X.R.items.length} bài đạt${X.avg!=null?" · TB "+X.avg+"%":""}${X.weak.length?" · yếu: "+gvE(X.weak.join(", ")):""}`:"chưa có bài web trong lộ trình"}</small>
<textarea class="tin" rows="2" placeholder="Nhận xét của cô" oninput="qtKtNx(${qtJ(c)},'${d}','${hh.code}',this.value)">${gvE(r.nx||"")}</textarea>
<details><summary>Xem tin gửi phụ huynh</summary><div class="bcmsg" id="qtm_${id}">${gvE(qtKtMsg(c,d,hh))}</div></details>
<div class="row"><button class="btn sm" onclick="qtCp('${id}',this);qtKtSet(${qtJ(c)},'${d}','${hh.code}','sent',1)">📋 Sao chép tin</button><label class="gvck"><input type="checkbox" ${r.sent?"checked":""} onchange="qtKtSet(${qtJ(c)},'${d}','${hh.code}','sent',this.checked?1:0)"> Đã gửi</label></div></div>`}
function qtKtGet(c,d,code){const K=JSON.parse(JSON.stringify(QT.d.kt[c+"|"+d]||{r:{}}));delete K._t;K.r=K.r||{};K.r[code]=K.r[code]||{};return K}
function qtKt(c,d,code,i,j){const K=qtKtGet(c,d,code),r=K.r[code];r.c=r.c||[null,null,null,null,null];r.c[i]=r.c[i]===j?null:j;qtPut("kt",c+"|"+d,K);gvDraw()}
function qtKtSet(c,d,code,k,v){const K=qtKtGet(c,d,code);K.r[code][k]=v;qtPut("kt",c+"|"+d,K);const e=document.activeElement;e&&e.closest&&e.closest(".qtkt")&&e.closest(".qtkt").classList.toggle("sent",!!K.r[code].sent)}
function qtKtNx(c,d,code,v){const K=qtKtGet(c,d,code);K.r[code].nx=v;qtPut("kt",c+"|"+d,K);const hh=GV.data.hv.find(x=>x.code==code),m=$("qtm_kt_"+code);if(m&&hh)m.textContent=qtKtMsg(c,d,hh)}

/* ---------- sửa lộ trình ---------- */
function qtEdSec(c,L,S){const o=L||{days:[],time:"",lv:1,an:null,off:[],ex:[],s:[]},op=QT.ui.ed==c,T=qtToday(),fx=qtFixed(o);
 const lvs=[[1,"HSK 1"],[6,"GT chuẩn HSK1"],[2,"HSK 2"],[3,"HSK 3"],[4,"HSK 4"],[5,"Mở rộng H4"],[7,"TOCFL B1"]];
 return `<details class="card qted" ${op?"open":""} ontoggle="QT.ui.ed=this.open?${qtJ(c)}:null"><summary><b>🗓 Lộ trình lớp ${gvE(c)}</b> <small>(${S.length} buổi · sửa, thêm buổi, báo nghỉ)</small></summary>
${fx?"":`<div class="card note">Lớp <b>không có lịch cố định</b>: cô điền ngày ở cột <b>Ngày</b> cho từng buổi (buổi chưa có ngày sẽ không hiện ở Hôm nay / Chốt tuần). Muốn ngày tự tính thì tick thứ học bên dưới và điền mốc.</div>`}
<div class="qtedg"><div class="qtf"><span>Lịch học <small class="ctx">(không tick thứ nào = lịch linh hoạt)</small></span><div class="qtdays">${[1,2,3,4,5,6,0].map(d=>`<label><input type="checkbox" ${(o.days||[]).includes(d)?"checked":""} onchange="qtEd(${qtJ(c)},'day',${d},this.checked)">${QT_TH[d]}</label>`).join("")}</div></div>
<label class="qtf">Giờ <input class="tin" type="time" value="${gvE(o.time||"")}" onchange="qtEd(${qtJ(c)},'time',this.value)"></label>
<label class="qtf">Cấp bài web mặc định <select class="tin" onchange="qtEd(${qtJ(c)},'lv',+this.value)">${lvs.map(l=>`<option value="${l[0]}" ${l[0]==o.lv?"selected":""}>${l[1]}</option>`).join("")}</select></label>
${fx?"":"<!--"}<div class="qtf"><span>Mốc tính ngày: buổi số … học ngày …</span><div class="row"><input class="tin qtn" type="number" min="1" value="${o.an?o.an.n:""}" onchange="qtEd(${qtJ(c)},'ann',this.value)"><input class="tin" type="date" value="${o.an?o.an.d:""}" onchange="qtEd(${qtJ(c)},'and',this.value)"></div></div>${fx?"":"-->"}</div>
${(o.off||[]).length||(o.ex||[]).length?`<p>${(o.off||[]).map(d=>`<span class="pill">Nghỉ ${qtTD(d)} <a onclick="qtEd(${qtJ(c)},'unoff','${d}')">✕</a></span>`).join("")}${(o.ex||[]).map(d=>`<span class="pill">Học bù ${qtTD(d)} <a onclick="qtEd(${qtJ(c)},'unex','${d}')">✕</a></span>`).join("")}</p>`:""}
${fx?"":"<!--"}<div class="row"><label class="qtf in">Thêm buổi học bù <input type="date" class="tin" onchange="this.value&&qtEd(${qtJ(c)},'ex',this.value)"></label><label class="qtf in">Báo nghỉ ngày <input type="date" class="tin" onchange="this.value&&qtEd(${qtJ(c)},'off',this.value)"></label></div>${fx?"":"-->"}
<div class="gvtw"><table class="gvt qtet"><thead><tr><th>Buổi</th><th>Ngày</th><th>Chủ đề</th><th>Nội dung</th><th>Bài trên web</th><th>Loại</th><th></th></tr></thead><tbody>
${S.map(x=>`<tr class="${x.d&&x.d<T?"past":x.d==T?"now":""}"><td><b>${x.s.n}</b></td><td class="qtdt ${x.s.dt?"own":""}"><input class="tin" type="date" value="${x.d}" title="${x.s.dt?"Ngày cô tự đặt":"Ngày tự tính theo lịch"}" onchange="qtEdS(${qtJ(c)},${x.s.n},'dt',this.value)"><small>${x.d?QT_TH[qtD(x.d).getDay()]:"chưa có ngày"}${x.s.dt&&fx?` · <a onclick="qtEdS(${qtJ(c)},${x.s.n},'dt','')">↺ theo lịch</a>`:""}</small></td>
<td><input class="tin" value="${gvE(x.s.cd)}" onchange="qtEdS(${qtJ(c)},${x.s.n},'cd',this.value)"></td><td><input class="tin" value="${gvE(x.s.nd)}" onchange="qtEdS(${qtJ(c)},${x.s.n},'nd',this.value)"></td>
<td><select class="tin" onchange="qtEdS(${qtJ(c)},${x.s.n},'w',this.value)"><option value="">—</option>${qtLesOpts().map(w=>`<option value="${w}" ${w==x.s.w?"selected":""}>${gvE(qtLesT(w,1))}</option>`).join("")}</select></td>
<td><select class="tin" onchange="qtEdS(${qtJ(c)},${x.s.n},'k',this.value)">${Object.keys(QT_K).map(k=>`<option value="${k}" ${k==x.s.k?"selected":""}>${QT_K[k]}</option>`).join("")}</select></td>
<td class="qtact">${fx&&x.d&&x.d>=T?`<button class="btn o sm" title="Ngày này nghỉ, lùi các buổi sau" onclick="qtOff(${qtJ(c)},'${x.d}')">Nghỉ</button>`:""}<button class="btn o sm" title="Xóa buổi" onclick="qtEdS(${qtJ(c)},${x.s.n},'del')">✕</button></td></tr>`).join("")||`<tr><td colspan="7" class="ctx">Chưa có buổi nào.</td></tr>`}</tbody></table></div>
<div class="row"><button class="btn o sm" onclick="qtEd(${qtJ(c)},'add')">➕ Thêm 1 buổi cuối</button><label class="qtf in">Tạo sẵn <input class="tin qtn" type="number" min="1" max="60" id="qtaddn" value="10"> buổi</label><button class="btn o sm" onclick="qtEd(${qtJ(c)},'addn',+$('qtaddn').value)">➕ Tạo</button></div>
<div class="qtf"><span>Dán nhanh lộ trình (mỗi dòng một buổi: <i>Buổi 6 ⇥ Mua sắm ⇥ Bài 4</i>, dán thẳng từ Excel / Zalo được)</span><textarea class="tin" id="qtpaste" rows="4" placeholder="Buổi 1		Bài 1&#10;Buổi 2	Tới một nơi mới	Bài 2&#10;Buổi 26		Kiểm tra"></textarea>
<div class="row"><button class="btn sm" onclick="qtPaste(${qtJ(c)},0)">Thay toàn bộ lộ trình</button><button class="btn o sm" onclick="qtPaste(${qtJ(c)},1)">Thêm / ghi đè các buổi này</button></div></div>
<div class="row qtdel"><button class="btn o sm" onclick="qtHide(${qtJ(c)},1)">🗑 Ẩn lớp này (lớp đã kết thúc / không dạy nữa)</button></div>
<p class="ctx">Ngày các buổi tự tính từ <b>mốc</b> theo lịch học, bỏ qua ngày nghỉ. Lộ trình đổi ở đây là đổi cho mọi máy (khi đã cài Google Sheets).</p></details>`}
function qtLc(c){const L=qtL(c);const o=JSON.parse(JSON.stringify(L||{days:[],time:"",lv:1,an:null,off:[],ex:[],s:[]}));delete o._t;o.off=o.off||[];o.ex=o.ex||[];o.s=o.s||[];return o}
function qtEd(c,k,a,b){const o=qtLc(c);QT.ui.ed=c;
 if(k=="day"){o.days=(o.days||[]).filter(x=>x!=a);if(b)o.days.push(a);o.days.sort()}
 else if(k=="time")o.time=a;else if(k=="lv")o.lv=a;
 else if(k=="ann"){o.an=Object.assign({d:qtToday()},o.an||{},{n:+a})}else if(k=="and"){o.an=Object.assign({n:(o.s[0]||{n:1}).n},o.an||{},{d:a})}
 else if(k=="off"){o.off=[...new Set([...o.off,a])];o.ex=o.ex.filter(x=>x!=a)}else if(k=="unoff")o.off=o.off.filter(x=>x!=a);
 else if(k=="ex"){o.ex=[...new Set([...o.ex,a])];o.off=o.off.filter(x=>x!=a)}else if(k=="unex")o.ex=o.ex.filter(x=>x!=a);
 else if(k=="addn"){const N=Math.max(1,Math.min(60,a|0));let n=o.s.length?Math.max(...o.s.map(x=>x.n)):0;for(let i=0;i<N;i++)o.s.push({n:++n,cd:"",nd:"",w:"",k:"hoc"});if(!o.an&&qtFixed(o))o.an={n:o.s[0].n,d:qtToday()}}
 else if(k=="add"){const n=o.s.length?Math.max(...o.s.map(x=>x.n))+1:1;o.s.push({n,cd:"",nd:"",w:"",k:"hoc"});if(!o.an&&qtFixed(o))o.an={n,d:qtToday()}}
 qtPut("lt",c,o);gvDraw()}
function qtEdS(c,n,k,v){const o=qtLc(c);if(k=="dt"){const s=o.s.find(x=>x.n==n);if(!s)return;
  const auto=qtFixed(o)?qtSched(Object.assign({},o,{s:o.s.map(x=>x.n==n?Object.assign({},x,{dt:""}):x)})).find(x=>x.s.n==n):null;
  if(!v||(auto&&auto.d==v))delete s.dt;else s.dt=v;QT.ui.ed=c;qtPut("lt",c,o);gvDraw();return}QT.ui.ed=c;if(k=="del"){ask(`Xóa buổi ${n} khỏi lộ trình ${gvE(c)}?`,()=>{o.s=o.s.filter(x=>x.n!=n);qtPut("lt",c,o);gvDraw()});return}
 const s=o.s.find(x=>x.n==n);if(!s)return;s[k]=v;if(k=="nd"&&!s.w){const r=qtRow(n,s.cd,v,o.lv);s.w=r.w;s.k=r.k}qtPut("lt",c,o);gvDraw()}
function qtPaste(c,merge){const t=($("qtpaste")||{}).value||"",o=qtLc(c),rows=[];
 t.split(/\r?\n/).forEach(line=>{if(!line.trim())return;const m=line.match(/^\s*(?:buổi\s*)?(\d+)\s*[\t:.\-–]?\s*(.*)$/i);if(!m)return;
  let p=m[2].split(/\t+/).map(x=>x.trim()).filter(Boolean),cd="",nd="";
  if(p.length>=2){cd=p[0];nd=p.slice(1).join(" — ")}else nd=p[0]||"";
  nd=nd.replace(/\s*\d{1,2}\/\d{1,2}(\/\d{2,4})?\s*$/,"");rows.push(qtRow(+m[1],cd,nd,o.lv))});
 if(!rows.length){ask("Chưa đọc được dòng nào. Mỗi dòng cần bắt đầu bằng số buổi, ví dụ: Buổi 6 ⇥ Mua sắm ⇥ Bài 4",null,1);return}
 if(merge){rows.forEach(r=>{const i=o.s.findIndex(x=>x.n==r.n);i>=0?o.s[i]=r:o.s.push(r)})}else o.s=rows;
 if(!o.an)o.an={n:rows[0].n,d:qtToday()};QT.ui.ed=c;qtPut("lt",c,o);
 ask(`Đã nhập ${rows.length} buổi.${o.an?` Ngày đang tính từ mốc: buổi ${o.an.n} = ${qtTD(o.an.d)}. Nếu chưa đúng, cô sửa ô <b>Mốc tính ngày</b>.`:""}`,null,1);gvDraw()}

function qtNewCls(){const n=(($("qtnewc")||{}).value||"").replace(/\s+/g," ").trim();if(!n)return;
 const o=QT.d.lt[n];if(o&&o.hide){qtHide(n,0);return}if(qtCls().includes(n)){gvSet("cls",n);return}
 qtPut("lt",n,{days:[],time:"",lv:1,an:null,off:[],ex:[],s:[]});QT.ui.ed=n;GV.cls=n;gvDraw()}
function qtHide(c,on){const go=()=>{const o=JSON.parse(JSON.stringify(QT.d.lt[c]||{days:[],time:"",lv:1,an:null,off:[],ex:[],s:[]}));delete o._t;delete o._sv;if(on)o.hide=1;else delete o.hide;qtPut("lt",c,o);GV.cls=on?"":c;gvDraw()};
 on?ask(`Ẩn lớp <b>${gvE(c)}</b> khỏi tab Hôm nay, Lớp, Chốt tuần? Dữ liệu vẫn giữ, cô hiện lại được ở cuối tab Lớp. (Học viên lớp này cô đổi Trạng thái thành "Nghỉ" ở trang tính Học viên.)`,go):go()}

/* ================= 📅 CHỐT TUẦN ================= */
function qtCt(F){const T=qtToday(),sun=new Date().getDay()==0;if(QT.ui.wk==null)QT.ui.wk=sun?1:0;
 const mon=qtAdd(qtMon(T),7*QT.ui.wk),end=qtAdd(mon,6),cls=qtCls().filter(c=>!GV.cls||c==GV.cls),all=[];
 const per=cls.map(c=>{const L=qtL(c),S=qtSched(L).filter(x=>x.d>=mon&&x.d<=end);S.forEach(x=>all.push({c,x}));return{c,L,S}}).filter(o=>o.S.length);
 all.sort((a,b)=>a.x.d.localeCompare(b.x.d)||qtTime(qtL(a.c)).localeCompare(qtTime(qtL(b.c))));
 const msg=o=>{const L=[`📅 Lịch học lớp ${o.c} tuần ${qtDM(mon)} – ${qtDM(end)}:`];o.S.forEach(x=>L.push(`• ${qtTD(x.d)}${qtTime(o.L)?" "+qtTime(o.L):""} — Buổi ${x.s.n}: ${qtSesB(o.c,x.s)}${x.s.k=="kt"?" (KIỂM TRA)":""}`));
  const pv=qtSched(o.L).filter(x=>x.d<mon&&x.s.w).pop();if(pv)L.push(`Trước buổi đầu tuần, các em hoàn thành bài trên web: ${qtLesB(o.c,pv.s.w)}.`);if(qtTwo(o.c))L.push("📙 = quyển bìa cam (Giáo trình chuẩn HSK1) · 📘 = quyển bìa xanh (New HSK 1).");L.push("— Cô Thảo tiếng Trung");return L.join("\n")};
 const wk=QT.ui.wk,wkN=w=>w==0?"Tuần này":w==1?"Tuần sau":w==2?"Tuần sau nữa":w==-1?"Tuần trước":w>0?w+" tuần nữa":-w+" tuần trước";
 let h=`${qtSrvBar()}<div class="row qtctw"><button class="btn o sm" ${wk<=-8?"disabled":""} onclick="QT.ui.wk=${wk-1};gvDraw()">‹</button>${[0,1,2].map(i=>`<button class="btn sm ${wk==i?"":"o"}" onclick="QT.ui.wk=${i};gvDraw()">${wkN(i)}</button>`).join("")}<button class="btn o sm" ${wk>=26?"disabled":""} onclick="QT.ui.wk=${wk+1};gvDraw()">›</button>
<input type="date" class="tin" style="width:auto" title="Chọn một ngày bất kỳ để xem tuần đó" value="${mon}" onchange="if(this.value){QT.ui.wk=Math.round((new Date(qtMon(this.value))-new Date(qtMon(qtToday())))/864e5/7);gvDraw()}"><b>${wkN(wk)}: ${qtDM(mon)} – ${qtDM(end)}</b></div>
<div class="card note">Tối Chủ nhật: (1) gửi lịch tuần mới cho từng lớp · (2) xem PPT cần soạn · (3) gửi báo cáo tuần cho phụ huynh ở phía dưới.</div>
`+tkbHtml()+`<h3 class="ab-h">1. Thông báo lịch · tiến độ từng lớp</h3>`+(per.length?`<div class="qtlist">${per.map(o=>`<div class="card"><b>${gvE(o.c)}</b>${qtMsgBox("ct_"+o.c,msg(o))}<button class="btn sm" onclick="qtCp('ct_${qtA(o.c)}',this)">📋 Sao chép gửi nhóm lớp</button></div>`).join("")}</div>`:`<div class="card ctx">${wkN(wk)} chưa có buổi nào theo lộ trình.</div>`);
 h+=`<h3 class="ab-h">2. PPT cần soạn</h3><div class="card">${all.map(o=>{const k=o.c+"|"+o.x.d,ok=(QT.d.ppt[k]||{}).ok;return `<label class="qtln qtppt ${ok?"done":""}"><span><input type="checkbox" ${ok?"checked":""} onchange="qtPut('ppt',${qtJ(k)},{ok:this.checked?1:0});this.closest('label').classList.toggle('done',this.checked)"> <b>${qtTD(o.x.d)}</b> · ${gvE(o.c)} · Buổi ${o.x.s.n}: ${gvE(qtSesT(o.x.s))}</span>${o.x.s.k!="hoc"?`<small class="pill">${QT_K[o.x.s.k]}</small>`:""}</label>`}).join("")||`<span class="ctx">Không có buổi nào.</span>`}</div>`;
 return h+`<h3 class="ab-h">3. Báo cáo tuần gửi phụ huynh</h3>`+(typeof gvBc=="function"?gvBc(F):"")}

/* ================= 🗓 THỜI KHÓA BIỂU CỐ ĐỊNH (Chốt tuần · thêm 02/11/2026) =================
   Bảng ca × thứ như bảng Excel của cô. Chế độ "Đánh dấu": bấm ô → đổi màu (Trống → Đã mở → Dự kiến → Lớp mới sắp mở → Tạm nghỉ → Trống).
   Chế độ "Sửa chữ": gõ trực tiếp vào ô, đổi tên ca, thêm / xóa ca. Lưu: QT.d.tkb.all = {rows:[{id,lb}], c:{"id|thứ":{x,s}}} (qtset loại tkb). */
const TKB_D=["T2","T3","T4","T5","T6","T7","CN"];
const TKB_ST=["Trống","Đã mở","Dự kiến · chưa chốt","Lớp mới sắp mở","Tạm nghỉ"],TKB_IC=["⬜","🟡","🔵","🔴","⚫"];
function tkbSeed(){const N="Nhà trống — có thể cân nhắc thuê giáo viên dạy thay nếu dạy lớp doanh nghiệp; còn không thì mình dạy",
 DN="Dự kiến có thể dạy lớp doanh nghiệp\n(mất thời gian đi từ 4h30 – 7h30)\nHiện tại lớp này chưa chốt",MOI="Mở lớp mới HSK1 tại nhà\ndự kiến vào 12/11";
 const rows=[{id:"sa",lb:"Sáng (9h – 10h30)"},{id:"ch",lb:"Chiều (2h – 3h30)"},{id:"t1",lb:"Tối (7h – 8h30)"},{id:"t2",lb:"Tối (8h30 – 10h)"}],c={};
 const put=(r,d,x,st)=>c[r+"|"+d]={x,s:st};
 put("sa",2,"K44 HSK2 (2 bạn)",1);put("sa",3,"GIÀU (3h30)\n(có thể chuyển)",1);put("sa",4,"K44 HSK2 (2 bạn)",1);put("sa",6,N,0);
 put("ch",1,DN,2);put("ch",3,DN,2);
 put("t1",0,"K41 HSK3 (cố định lên H4)",1);put("t1",1,N,0);put("t1",2,"K46 HSK2 (cố định)",1);
 put("t1",3,"K41 HSK3 (cố định lên H4)\ncó thể chuyển sang tối thứ 7 nếu đi dạy doanh nghiệp",1);put("t1",4,"K46 HSK2 (cố định)",1);
 put("t1",5,"K41 HSK3 (cố định lên H4)\ncó thể chuyển sang tối thứ 7",2);
 put("t2",0,"K45 HSK2 (cố định lên H3)",1);put("t2",1,"K49 HSK1 (cố định lên H2)",1);put("t2",2,"K45 HSK2 (cố định lên H3)",1);
 put("t2",3,MOI,3);put("t2",4,"K49 HSK1 (cố định lên H2)",1);put("t2",5,MOI,3);
 return{rows,c}}
let TKB=null;
function tkbGet(){const o=QT.d.tkb.all;return JSON.parse(JSON.stringify(o&&o.rows?{rows:o.rows,c:o.c||{}}:tkbSeed()))}
function tkbSave(){qtPut("tkb","all",{rows:TKB.rows,c:TKB.c})}
const tkbCell=k=>TKB.c[k]||(TKB.c[k]={x:"",s:0});
function tkbSum(){const n=[0,0,0,0,0],free=[];
 TKB.rows.forEach(r=>{const f=[];TKB_D.forEach((d,i)=>{const v=TKB.c[r.id+"|"+i]||{s:0,x:""};if(v.s||v.x.trim())n[v.s||0]++;if(!v.s)f.push(d)});if(f.length)free.push(`<b>${gvE(r.lb)}</b>: ${f.join(", ")}`)});
 return `<div class="tkbsum">${[1,2,3,4].map(i=>`<span class="tkbp s${i}">${TKB_IC[i]} ${TKB_ST[i]}: <b>${n[i]}</b> ca</span>`).join("")}
<div class="tkbfree">⬜ Ca còn trống: ${free.join(" · ")||"không còn ca trống"}</div></div>`}
function tkbHtml(){TKB=tkbGet();const ed=!!QT.ui.tkbEd;
 const head=`<tr><th>Ca</th>${TKB_D.map(d=>`<th>${d}</th>`).join("")}${ed?"<th></th>":""}</tr>`;
 const body=TKB.rows.map((r,ri)=>`<tr><th>${ed?`<input class="tin" value="${gvE(r.lb)}" oninput="TKB.rows[${ri}].lb=this.value;tkbSave()">`:gvE(r.lb)}</th>${TKB_D.map((d,i)=>{const k=r.id+"|"+i,v=TKB.c[k]||{x:"",s:0};
  return ed?`<td class="s${v.s||0}"><textarea class="tin" rows="3" placeholder="${d}" oninput="tkbCell(${qtJ(k)}).x=this.value;tkbSave()">${gvE(v.x)}</textarea></td>`
   :`<td class="s${v.s||0}" onclick="tkbTap(this,${qtJ(k)})" title="Bấm để đổi màu"><span>${gvE(v.x)}</span></td>`}).join("")}${ed?`<td class="tkbact"><button class="btn o sm" title="Chuyển lên" ${ri?"":"disabled"} onclick="tkbMv(${ri},-1)">▲</button><button class="btn o sm" title="Chuyển xuống" ${ri<TKB.rows.length-1?"":"disabled"} onclick="tkbMv(${ri},1)">▼</button><button class="btn o sm" title="Thêm ca ngay dưới ca này" onclick="tkbAdd(${ri})">➕</button><button class="btn o sm" title="Xóa ca này" onclick="tkbDel(${ri})">🗑</button></td>`:""}</tr>`).join("");
 return `<details class="card tkbw" ${QT.ui.tkbC?"":"open"} ontoggle="QT.ui.tkbC=!this.open"><summary>🗓 Thời khóa biểu cố định cả tuần</summary>
<div class="row tkbbar"><button class="btn sm ${ed?"o":""}" onclick="QT.ui.tkbEd=0;gvDraw()">🎨 Đánh dấu màu</button><button class="btn sm ${ed?"":"o"}" onclick="QT.ui.tkbEd=1;gvDraw()">✏️ Sửa chữ</button>
<small>${ed?"Gõ thẳng vào ô, tự lưu. Cột cuối: ▲ ▼ chuyển ca lên / xuống · ➕ thêm ca ngay dưới · 🗑 xóa ca. Xong thì bấm 🎨 Đánh dấu màu.":"Bấm vào ô để đổi màu: "+TKB_ST.map((t,i)=>TKB_IC[i]+" "+t).join(" → ")+" → ⬜"}</small></div>
${tkbSum()}<div class="tkbsc"><table class="tkb ${ed?"ed":""}"><thead>${head}</thead><tbody>${body}</tbody></table></div>
${ed?`<div class="row"><button class="btn o sm" onclick="tkbAdd()">➕ Thêm ca cuối bảng</button><button class="btn o sm" onclick="tkbReset()">↺ Về bảng ban đầu</button></div>`:""}</details>`}
function tkbTap(el,k){const v=tkbCell(k);v.s=((v.s||0)+1)%TKB_ST.length;el.className="s"+v.s;tkbSave();const b=document.querySelector(".tkbsum");if(b)b.outerHTML=tkbSum()}
function tkbAdd(i){const r={id:"r"+Date.now().toString(36),lb:"Ca mới"};if(i==null)TKB.rows.push(r);else TKB.rows.splice(i+1,0,r);tkbSave();gvDraw()}
function tkbMv(i,d){const j=i+d;if(j<0||j>=TKB.rows.length)return;const r=TKB.rows.splice(i,1)[0];TKB.rows.splice(j,0,r);tkbSave();gvDraw()}
function tkbDel(i){const r=TKB.rows[i];ask(`Xóa ca <b>${gvE(r.lb)}</b> và chữ trong các ô của ca này?`,()=>{TKB.rows.splice(i,1);Object.keys(TKB.c).forEach(k=>{if(k.startsWith(r.id+"|"))delete TKB.c[k]});tkbSave();gvDraw()})}
function tkbReset(){ask("Đưa thời khóa biểu về bảng ban đầu (theo ảnh cô gửi 02/11)? Các chỉnh sửa sau đó sẽ mất.",()=>{TKB=tkbSeed();tkbSave();gvDraw()})}

/* ================= 🎯 TUYỂN SINH ================= */
function qtTsL(){return JSON.parse(JSON.stringify((QT.d.ts.all||{}).list||[]))}
function qtTs(F){const T=qtToday(),list=qtTsL(),f=QT.ui.tsf||"dang",ed=QT.ui.tse;
 const show=list.filter(p=>f=="all"||(f=="dang"?!["Đã đăng ký","Không học"].includes(p.st):p.st==f)).sort((a,b)=>(a.hen||"9").localeCompare(b.hen||"9"));
 const by=(k,arr)=>{const m={};list.forEach(p=>{const v=p[k]||"(chưa ghi)";m[v]=(m[v]||0)+1});return Object.keys(m).sort((a,b)=>m[b]-m[a]).map(v=>`<span class="pill">${gvE(v)}: ${m[v]}</span>`).join("")};
 const ending=qtCls().map(c=>{const S=qtSched(qtL(c)),e=S[S.length-1];return e&&e.d&&e.d>=T&&qtDiff(e.d,T)<=21?{c,e}:null}).filter(Boolean);
 const form=p=>{p=p||{};return `<div class="card qtform"><b>${p.id?"Sửa thông tin":"➕ Thêm người hỏi học"}</b><div class="qtedg">
<label class="qtf">Họ tên <input class="tin" id="ts_ten" value="${gvE(p.ten||"")}"></label><label class="qtf">SĐT / Zalo <input class="tin" id="ts_sdt" inputmode="tel" value="${gvE(p.sdt||"")}"></label>
<label class="qtf">Trình độ <input class="tin" id="ts_td" placeholder="Mới bắt đầu, HSK2…" value="${gvE(p.td||"")}"></label><label class="qtf">Lịch muốn học <input class="tin" id="ts_lich" placeholder="Tối T2+T4, 7h" value="${gvE(p.lich||"")}"></label>
<label class="qtf">Lớp dự kiến <input class="tin" id="ts_lop" list="ts_cls" value="${gvE(p.lop||"")}"><datalist id="ts_cls">${qtCls().map(c=>`<option>${gvE(c)}</option>`).join("")}</datalist></label>
<label class="qtf">Nguồn biết đến cô <select class="tin" id="ts_ng"><option value=""></option>${QT_TS_NG.map(n=>`<option ${n==p.ng?"selected":""}>${n}</option>`).join("")}</select></label>
<label class="qtf">Trạng thái <select class="tin" id="ts_st">${QT_TS_ST.map(n=>`<option ${n==(p.st||"Mới hỏi")?"selected":""}>${n}</option>`).join("")}</select></label>
<label class="qtf">Hẹn liên hệ lại <input class="tin" type="date" id="ts_hen" value="${gvE(p.hen||"")}"></label></div>
<label class="qtf">Ghi chú <textarea class="tin" id="ts_gc" rows="2">${gvE(p.gc||"")}</textarea></label>
<div class="row"><button class="btn sm" onclick="qtTsSave('${p.id||""}')">💾 Lưu</button>${p.id?`<button class="btn o sm" onclick="QT.ui.tse=null;gvDraw()">Hủy</button><button class="btn o sm" onclick="qtTsDel('${p.id}')">Xóa</button>`:""}</div></div>`};
 let h=`${qtSrvBar()}<div class="row">${[["dang","Đang theo dõi"],...QT_TS_ST.map(s=>[s,s]),["all","Tất cả"]].map(x=>`<button class="btn sm ${f==x[0]?"":"o"}" onclick="QT.ui.tsf='${x[0]}';gvDraw()">${x[1]}</button>`).join("")}</div>`;
 if(ending.length)h+=`<div class="card note"><b>Lớp sắp hết lộ trình</b> — mời học viên đăng ký khóa tiếp:${ending.map(o=>`<div>${gvE(o.c)}: buổi cuối ${qtTD(o.e.d)} (${gvE(qtSesT(o.e.s))})</div>`).join("")}</div>`;
 h+=ed&&ed!="new"?form(list.find(p=>p.id==ed)):form();
 h+=`<div class="qtlist">${show.map(p=>{const tel=String(p.sdt||"").replace(/[^\d+]/g,""),due=p.hen&&p.hen<=T&&!["Đã đăng ký","Không học"].includes(p.st);
  return `<div class="card qtts ${due?"due":""}"><div class="qtsch"><b>${gvE(p.ten||"(chưa có tên)")}</b><select onchange="qtTsSt('${p.id}',this.value)">${QT_TS_ST.map(n=>`<option ${n==p.st?"selected":""}>${n}</option>`).join("")}</select></div>
<small>${tel?`<a href="tel:${tel}">📞 ${gvE(p.sdt)}</a> · <a href="https://zalo.me/${tel.replace(/^\+84/,"0")}" target="_blank" rel="noopener">Zalo</a>`:"Chưa có SĐT"}${p.td?" · "+gvE(p.td):""}${p.lich?" · "+gvE(p.lich):""}${p.lop?" · lớp "+gvE(p.lop):""}${p.ng?" · nguồn: "+gvE(p.ng):""}</small>
${p.hen?`<small class="${due?"bad":"ctx"}">Hẹn liên hệ lại: ${qtTD(p.hen)}${due?" — đến hạn":""}</small>`:""}${p.gc?`<small>${gvE(p.gc)}</small>`:""}
<div class="row"><button class="btn o sm" onclick="QT.ui.tse='${p.id}';gvDraw();scrollTo(0,0)">✏ Sửa</button></div></div>`}).join("")||`<div class="card ctx">Chưa có ai trong mục này.</div>`}</div>`;
 return h+(list.length?`<div class="card"><b>Thống kê</b><p>Nguồn: ${by("ng")}</p><p>Trạng thái: ${by("st")}</p></div>`:"")}
function qtTsPut(list){qtPut("ts","all",{list})}
function qtTsSave(id){const g=k=>(($("ts_"+k)||{}).value||"").trim(),list=qtTsL(),p=list.find(x=>x.id==id)||{id:"p"+Date.now().toString(36),tao:qtToday()};
 Object.assign(p,{ten:g("ten"),sdt:g("sdt"),td:g("td"),lich:g("lich"),lop:g("lop"),ng:g("ng"),st:g("st"),hen:g("hen"),gc:g("gc")});
 if(!p.ten&&!p.sdt){ask("Cô ghi ít nhất họ tên hoặc số điện thoại nhé.",null,1);return}
 if(!list.includes(p))list.push(p);qtTsPut(list);QT.ui.tse=null;gvDraw()}
function qtTsSt(id,v){const list=qtTsL(),p=list.find(x=>x.id==id);if(p){p.st=v;qtTsPut(list);gvDraw()}}
function qtTsDel(id){ask("Xóa người này khỏi danh sách tuyển sinh?",()=>{qtTsPut(qtTsL().filter(x=>x.id!=id));QT.ui.tse=null;gvDraw()})}

/* ================= gắn vào Bảng theo dõi ================= */
if(typeof gvDraw=="function"){
 const _d=gvDraw,_l=gvLoad;
 gvLoad=async function(){await _l();if(GV.data){await qtLoad();gvDraw()}};
 gvDraw=function(){if(GV.data){if(!GV.data._dd0){qtSeed();qtSync()}if(QT.srv===null&&!QT.busy&&GV.pass)qtLoad().then(()=>gvDraw())}_d();const s=$("gv");if(!s||!GV.data)return;const tb=s.querySelector(".gvtabs");if(!tb)return;
  const bs=[...tb.children],f=t=>bs.find(b=>b.textContent.indexOf(t)>=0),lop=f("Lớp");
  if(lop&&tb.children[1]!==lop)tb.insertBefore(lop,tb.children[1]);
  if(["tq","dd","dg","ls","td"].includes(GV.tab)&&!GV.stu&&lop){lop.classList.add("on");const bk=document.createElement("div");bk.className="row";bk.innerHTML=`<button class="btn o sm" onclick="gvSet('tab','lop')">← Về tab Lớp</button>`;tb.after(bk)}};
 if(GV.tab=="tq")GV.tab="hn";
 if(GV.data){qtSeed();qtSync()}
}
(function(){const st=document.createElement("style");st.textContent=`
.qtsrv{border-radius:12px;padding:8px 12px;margin:0 0 12px;font-size:.88rem}.qtsrv.ok{background:rgba(46,125,79,.08);color:#2e7d4f}.qtsrv.warn{background:#fff8e1;border:1px dashed var(--g)}
.qthd{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;font-size:1.1rem}
.qtcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}.qtcards .card{margin:0}
.qttdh{display:flex;justify-content:space-between;gap:8px}.qttdh small{display:block;color:var(--sub)}.qtpin{font-weight:900;letter-spacing:.12em;color:var(--m);font-size:1.3rem}
.qtdd{margin:8px 0;font-size:.95rem}.qtdd.ok{color:#2e7d4f}.qtdd.no{color:#b23a48;font-weight:800}
.qtpan{margin-top:10px;padding:10px 12px;border-radius:12px;background:var(--k);border:1px solid var(--b)}.qtck{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:6px;margin:8px 0}.qtck label{display:flex;gap:6px;align-items:center}.qtck .self{color:#2e7d4f}.qtck small{color:var(--sub)}
.qtdl{display:grid;gap:6px;margin:8px 0}.qtdr{display:flex;justify-content:space-between;align-items:center;gap:6px 10px;flex-wrap:wrap;padding:6px 8px;border-radius:10px;background:var(--c);border-left:4px solid var(--b)}.qtdr small{color:var(--sub)}
.qtdr.co{border-left-color:#2e7d4f}.qtdr.muon{border-left-color:var(--g)}.qtdr.phep{border-left-color:#5a7bb5}.qtdr.vang{border-left-color:#b23a48}
.qtrd{display:flex;gap:4px;flex-wrap:wrap}.qtrd button{border:1px solid var(--b);background:var(--k);border-radius:10px;padding:5px 9px;font:500 .82rem inherit;cursor:pointer}
.qtrd button.on{color:#fff;font-weight:700;border-color:transparent}.qtrd .co.on{background:#2e7d4f}.qtrd .muon.on{background:#c9a227}.qtrd .phep.on{background:#5a7bb5}.qtrd .vang.on{background:#b23a48}
.qtwkh{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}.qtwkh .ab-h{margin-bottom:6px}.qtoth{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.qtoth .qtf{flex-wrap:wrap;margin:0}.qtoth .tin{margin:0}.qtoth .qtpan{flex-basis:100%}.qtsc>small.ctx{display:block}.qtpast summary{cursor:pointer}.qtpast summary small{color:var(--sub)}.qtpast[open] summary{margin-bottom:6px}
.qtwarn{background:#fff6f6;border:1px dashed #e3a3a3}.qtln{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding:6px 0;border-bottom:1px dashed var(--b)}.qtln:last-child{border-bottom:0}.qtln.past{opacity:.75}.qtln small{color:var(--sub)}.qtst{display:flex;gap:6px;align-items:center;font-size:.88rem}
.qtchips{display:flex;flex-wrap:wrap;gap:8px}.qtchip{border:1px solid var(--g);background:#fff8e1;border-radius:20px;padding:7px 14px;font:600 .9rem inherit;cursor:pointer}
.qtpick{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px}.qtpick .card{margin:0;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:3px;font:inherit;border:1px solid var(--b)}.qtpick small{color:var(--sub)}.qtpick small.bad{color:#b23a48}
.qtlh{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.qtlh small{display:block;color:var(--sub)}.qtbig{font-size:1.4rem;color:var(--m)}.qtnx{text-align:right}.qtnx b{display:block;color:var(--m);font-size:1.1rem}.qtnx small{display:block;color:var(--sub)}
.qtsum{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center}.qtsum .ok{color:#2e7d4f}.qtsum .low{color:#8a6d0b}.qtsum .no{color:#b23a48}.qtsum .btn{margin-left:auto}
.qtlist{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}.qtlist .card{margin:0}
.qtsc{border-left:5px solid #2e7d4f}.qtsc.low{border-left-color:var(--g)}.qtsc.no{border-left-color:#b23a48}.qtsch{display:flex;justify-content:space-between;align-items:center;gap:8px}.qtsch a{cursor:pointer;color:var(--m)}
.qtcc{font-size:.8rem;border-radius:10px;padding:2px 8px}.qtcc.ok{background:rgba(46,125,79,.12);color:#2e7d4f}.qtcc.no{background:rgba(178,58,72,.12);color:#b23a48}
.qtles{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.qtl{font-size:.82rem;border-radius:10px;padding:3px 8px;border:1px solid var(--b);background:var(--k)}.qtl small{display:block;color:var(--sub);font-size:.72rem}.qtl.ok{background:rgba(46,125,79,.08)}.qtl.no,.qtl.over{background:#fff6f6;border-color:#e3a3a3}
.qtsc details,.qtkt details{margin-top:6px}.qtsc summary,.qtkt summary{cursor:pointer;color:var(--m);font-weight:700;font-size:.88rem}
.qtmore{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:16px 0 4px}.qtmore small{color:var(--sub)}
.qtcr{display:grid;gap:6px;margin:8px 0}.qtcr>div{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}.qtcr span{font-weight:700;font-size:.9rem}
.qtlv{display:flex;gap:4px;flex-wrap:wrap}.qtlv button{border:1px solid var(--b);background:var(--c);border-radius:10px;padding:4px 8px;font:500 .8rem inherit;cursor:pointer}.qtlv button.on{color:#fff;font-weight:700}.qtlv .l0{background:#2e7d4f}.qtlv .l1{background:#4f8a3a}.qtlv .l2{background:#c9a227}.qtlv .l3{background:#b23a48}
.qtktw>summary{cursor:pointer;list-style:none}.qtktw>summary small{color:var(--sub);font-size:.9rem}.qtktw[open]>summary{margin-bottom:8px}.qtkt.sent{opacity:.8;border:1px solid rgba(46,125,79,.4)}
.qted summary{cursor:pointer}.qtedg{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px 14px;margin:10px 0}
.qtf{display:flex;flex-direction:column;gap:2px;font-weight:600;font-size:.88rem;margin:4px 0}.qtf .tin{margin:2px 0;font-weight:400}.qtf.in{flex-direction:row;align-items:center;gap:6px}.qtf.in .tin{width:auto}
.qtdays{display:flex;flex-wrap:wrap;gap:8px}.qtdays label{display:flex;gap:3px;align-items:center;font-weight:500}.qtn{max-width:90px}
.qtet .tin{padding:6px 8px;font-size:.85rem;min-width:110px}.qtet td{vertical-align:middle}.qtet tbody tr{cursor:default}.qtet tr.past{opacity:.6}.qtet tr.now{background:#fff8e1}.qtact{white-space:nowrap}
.qtnew{display:flex;flex-direction:column;gap:6px}.qtnew .tin{margin:0}.qtdel{margin-top:14px}.qtdt .tin{min-width:130px}.qtdt small{display:block;color:var(--sub);font-size:.72rem}.qtdt.own .tin{border-color:var(--g);background:#fff8e1}.qtdt a{cursor:pointer;color:var(--m)}.qtppt.done span{text-decoration:line-through;opacity:.6}.qtppt{cursor:pointer}
.qtts.due{border:1px solid #e3a3a3;background:#fff6f6}.qtts small{display:block;margin-top:3px}.qtts select{font:inherit;border-radius:10px;border:1px solid var(--b);padding:3px 6px}
.tkbw>summary{cursor:pointer;font-weight:700;color:var(--m);font-size:1.02rem}.tkbw[open]>summary{margin-bottom:8px}.tkbbar{align-items:center;gap:6px;flex-wrap:wrap}.tkbbar small{color:var(--sub);flex-basis:100%}
.tkbsum{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.tkbp{font-size:.82rem;border-radius:10px;padding:3px 9px;border:1px solid var(--b)}.tkbfree{flex-basis:100%;font-size:.85rem;color:var(--sub)}.tkbfree b{color:var(--t)}
.tkbsc{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--b);border-radius:12px}
.tkb{border-collapse:collapse;width:100%;min-width:760px;table-layout:fixed;font-size:.82rem}.tkb th,.tkb td{border:1px solid var(--b);padding:6px;vertical-align:top;text-align:left}
.tkb thead th{background:var(--m);color:#fff;text-align:center;font-size:.85rem}.tkb thead th:first-child{width:118px}.tkb.ed thead th:last-child{width:76px}.tkb.ed thead th:first-child{width:150px}.tkbact{text-align:center!important}.tkbact .btn{min-width:30px;padding:3px 6px;margin:1px}.tkbact .btn:disabled{opacity:.35}
.tkb tbody th{background:var(--k);font-weight:700;position:sticky;left:0;z-index:1}.tkb td{height:64px;white-space:pre-line;line-height:1.35;transition:background .15s}
.tkb:not(.ed) td{cursor:pointer;user-select:none}.tkb:not(.ed) td:active{filter:brightness(.92)}
.tkb .s0,.tkbp.s0{background:transparent}.tkb .s1,.tkbp.s1{background:rgba(201,162,39,.32)}.tkb .s1 span{font-weight:700}.tkb .s2,.tkbp.s2{background:rgba(66,133,214,.22)}.tkb .s3,.tkbp.s3{background:rgba(214,74,74,.32)}.tkb .s4,.tkbp.s4{background:rgba(120,120,120,.25)}.tkb .s4 span{text-decoration:line-through;opacity:.75}
.tkb.ed td textarea{width:100%;min-height:58px;font-size:.8rem;padding:4px;resize:vertical;margin:0;background:rgba(255,255,255,.7)}.tkb.ed th .tin{width:100%;font-size:.8rem;padding:4px;margin:0}
@media(max-width:600px){.qtcards,.qtlist{grid-template-columns:1fr}.qtsum .btn{margin-left:0}.qtnx{text-align:left}.qtck{grid-template-columns:1fr 1fr}.qtlv button{padding:4px 6px}}`;document.head.appendChild(st)})();
