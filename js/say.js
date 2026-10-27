/* ===== Chấm phần nói theo PHIÊN ÂM (27/10/2026) =====
   Máy nghe chỉ trả về chữ Hán và tự chọn chữ theo ngữ cảnh, nên 他/她, 在/再, 做/坐, tên riêng (白家月 → 白佳悦)
   từng bị chấm sai dù học viên đọc đúng. Nay so từng ÂM TIẾT (cô chọn cách a):
     đúng âm + đúng thanh = 1 điểm · đúng âm, sai thanh = ½ điểm · sai âm / thiếu = 0.
   Chữ đa âm (还, 得, 长…): chấp nhận mọi cách đọc của chữ. Thanh nhẹ khớp mọi thanh. 二 = 两. Số Ả Rập đổi sang chữ Hán.
   Máy nghe trả nhiều phương án (tối đa 5): lấy phương án gần câu mẫu nhất.
   Bảng chữ → phiên âm: js/pyd.js (≈80KB), chỉ tải khi học viên bấm 🎤 lần đầu. Chưa tải được thì so chữ như cũ.
   Nạp NGAY SAU js/app.js. Dùng ở: Luyện nói, 🎭 Hoạt động, Test nhanh (app.js), Luyện đọc (read.js), Nói lại bài khóa HSK4 (hsk4.js). */
let PYM=null,PYST=0,PYCB=[];
function pyLoad(){if(PYST)return;PYST=1;const s=document.createElement("script");s.src="js/pyd.js?v=1";
 const fin=ok=>{PYST=ok?2:3;if(ok&&window.PYD){PYM={};PYD.split("|").forEach(x=>{const k=x.match(/^[a-z]+\d/)[0];for(const c of x.slice(k.length))(PYM[c]=PYM[c]||[]).push(k)})}PYCB.splice(0).forEach(f=>f())};
 s.onload=()=>fin(true);s.onerror=()=>fin(false);document.head.appendChild(s)}
function pyReady(cb){if(PYST>=2)return cb();pyLoad();let t=0;const go=()=>{if(t<0)return;clearTimeout(t);t=-1;cb()};PYCB.push(go);t=setTimeout(go,4000)}
/* số → chữ Hán (11 → 十一, 2025 → 二零二五) */
function sayNum(n){const d="零一二三四五六七八九";if(n.length>3||n[0]=="0")return [...n].map(c=>d[c]).join("");n=+n;if(n<10)return d[n];if(n<20)return "十"+(n%10?d[n%10]:"");
 if(n<100)return d[Math.floor(n/10)]+"十"+(n%10?d[n%10]:"");const r=n%100;return d[Math.floor(n/100)]+"百"+(r?(r<10?"零"+d[r]:sayNum(String(r)).replace(/^十/,"一十")):"")}
const sayCh=s=>[...String(s).replace(/\d+/g,sayNum).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()].filter(c=>/[一-鿿a-z]/.test(c));
const pyOf=c=>c=="两"?["liang3","er4"]:c=="二"?["er4","liang3"]:(PYM&&PYM[c])||null;
/* điểm một cặp chữ: 1 / 0.5 / 0, kèm cách đọc mẫu và cách đọc máy nghe khi lệch thanh */
function sayPair(a,b){if(a==b)return{s:1};const A=pyOf(a),B=pyOf(b);if(!A||!B)return{s:0};
 for(const x of A)for(const y of B){if(x==y)return{s:1};const bx=x.slice(0,-1),by=y.slice(0,-1);if(bx==by&&(x.endsWith("5")||y.endsWith("5")))return{s:1}}
 for(const x of A)for(const y of B)if(x.slice(0,-1)==y.slice(0,-1))return{s:.5,a:x,b:y};return{s:0}}
/* số thanh → dấu thanh: mai3 → mǎi */
function pyTone(p){const t=+p.slice(-1);let s=p.slice(0,-1).replace(/v/g,"ü");if(t<1||t>4)return s;const M={a:"āáǎà",e:"ēéěè",i:"īíǐì",o:"ōóǒò",u:"ūúǔù","ü":"ǖǘǚǜ"};
 const i=/[ae]/.test(s)?s.search(/[ae]/):s.includes("ou")?s.indexOf("o"):(()=>{let k=-1;for(let j=0;j<s.length;j++)if("aeiouü".includes(s[j]))k=j;return k})();
 return i<0?s:s.slice(0,i)+M[s[i]][t-1]+s.slice(i+1)}
/* so câu: quy hoạch động (LCS có trọng số) trên từng âm tiết */
function sayCmp(tgt,heard){const a=sayCh(tgt),b=sayCh(heard),n=a.length,m=b.length;if(!n)return{m:0,mk:[],hv:[...heard],ton:[]};
 const P=a.map(x=>b.map(y=>sayPair(x,y)));const d=Array(n+1).fill(0).map(()=>new Float64Array(m+1));
 for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--){const s=P[i][j].s;d[i][j]=Math.max(d[i+1][j],d[i][j+1],s?d[i+1][j+1]+s:0)}
 const mk=Array(n).fill(0),hv=b.slice(),ton=[];let i=0,j=0;
 while(i<n&&j<m){const s=P[i][j].s;if(s&&d[i][j]==d[i+1][j+1]+s){mk[i]=s;if(s==1)hv[j]=a[i];else ton.push([a[i],pyTone(P[i][j].a),hv[j],pyTone(P[i][j].b)]);i++;j++}else if(d[i+1][j]>=d[i][j+1])i++;else j++}
 return{m:Math.min(100,Math.round(d[0][0]/n*100)),mk,hv,ton}}
const SAYC={k:null,v:null};
function sayRes(heard,tgt,alts){const key=tgt+"\u0001"+heard+"\u0001"+(alts||[]).join("\u0002");if(SAYC.k===key)return SAYC.v;
 let best=null;[heard,...(alts||[])].filter((x,i,l)=>x&&l.indexOf(x)==i).forEach((c,ci)=>{const r=sayCmp(tgt,c);r.t=c;if(!best||r.m>best.m)best=r});SAYC.k=key;SAYC.v=best;return best}
/* % giống câu mẫu */
const sayPct=(heard,tgt,alts)=>sayRes(heard,tgt,alts).m;
/* "Máy nghe được": chữ đọc đúng âm hiện theo chữ của câu mẫu */
function sayHeard(heard,tgt,alts){const r=sayRes(heard,tgt,alts);return r.hv.length?esc(r.hv.join("")):esc(r.t)}
/* câu mẫu tô màu: xanh đúng, cam sai thanh, đỏ thiếu / sai âm; kèm dòng ghi chú sai thanh */
function sayMark(tgt,heard,alts){const r=sayRes(heard,tgt,alts);let k=0;
 const h=[...tgt].map(c=>/[一-鿿A-Za-z]/.test(c)?`<span class="${({1:"g",.5:"o",0:"r"})[r.mk[k++]||0]}">${c}</span>`:c).join("");
 return h+(r.ton.length?`<div class="saynote">🟠 Sai thanh: ${r.ton.filter((x,i,l)=>l.findIndex(y=>y.join()==x.join())==i).map(x=>`<b class="zh">${x[0]}</b> đọc <b>${x[1]}</b> (máy nghe thành ${x[3]})`).join(" · ")}</div>`:"")}
/* gợi ý phiên âm tên riêng trong câu (lấy từ danh sách nhân vật SPN) */
function nameHint(s,cls){if(!s||typeof SPN!="object")return "";const got=[];
 Object.keys(SPN).filter(k=>k.length>=2&&!/[、，,]/.test(k)&&SPN[k]&&/^[A-ZĀÁǍÀĒÉĚÈŌÓǑÒ]/.test(SPN[k][0]||"")&&s.includes(k)).sort((x,y)=>y.length-x.length).forEach(k=>{if(!got.some(g=>g.includes(k)))got.push(k)});
 return got.length?`<div class="nmh ${cls||""}">🏷 Tên riêng: ${got.map(k=>`<span><b class="zh">${k}</b> ${SPN[k][0]}</span>`).join(" · ")}</div>`:""}
/* bọc srListen: tải bảng phiên âm khi bấm 🎤, chờ bảng sẵn sàng rồi mới chấm */
(function(){const o=srListen;srListen=function(done,fail){pyLoad();return o((t,a)=>pyReady(()=>done(t,a)),fail)}})();
(function(){const st=document.createElement("style");st.textContent=`
.out .o{color:#c66a00;font-weight:700;background:#fff1d6;border-radius:4px}
.saynote{font:400 .88rem/1.6 var(--ui,Nunito,system-ui,sans-serif);color:#8a4b00;margin-top:4px;line-height:1.6}
.nmh{font-size:.88rem;color:var(--sub);margin:4px 0}.nmh span{white-space:nowrap}.nmh b{color:var(--m);font-weight:600}
.nmh.ifhide{display:none}.hidepy .nmh.ifhide{display:block}`;document.head.appendChild(st)})();
