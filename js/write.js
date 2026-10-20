/* ===== Flashcard · Hướng dẫn viết (HSK1, HSK2) =====
   Dưới thẻ flashcard: từ + phiên âm + nghĩa, chữ chạy từng nét (Hanzi Writer, nét vàng = bộ thủ),
   nút Xem lại / Tập viết, mẹo nhớ theo bộ thủ, câu ví dụ.
   Nội dung mẹo nhớ + ví dụ khai trong file bài: var WG=Object.assign(window.WG||{},{"1-8":{"病人":["mẹo nhớ",["câu","pinyin","nghĩa"]]}})
   Dữ liệu nét chữ theo cấp: data/hz-h{cấp}.js (HZD), nạp khi mở flashcard. Nạp SAU js/nav.js. ===== */
var WG=window.WG||{},HZD=window.HZD||{};
const WGL={},WGW=[];let WGQ=false,WGK="";
function wgLoad(src){if(WGL[src])return WGL[src];return WGL[src]=new Promise((ok,no)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=()=>{delete WGL[src];no()};document.head.appendChild(s)})}
const wgHan=w=>[...w].filter(c=>/\p{Script=Han}/u.test(c));
function wgCard(w){const T=WG[olLv+"-"+cur]||{},t=T[w[0]],cs=wgHan(w[0]);if(!cs.length)return"";
 return `<div class="card wg"><h3>✍️ Hướng dẫn viết</h3>
<div class="wgh"><span class="zh">${w[0]}</span><span class="py">${w[1]}</span><span class="vi">${w[3]}</span>${bS(w[0],"🔊")}</div>
<div class="wgc" id="wgc">${cs.map((c,j)=>`<div class="wgb"><div class="wgg" id="wgg${j}"></div><small id="wgn${j}"></small></div>`).join("")}</div>
<p class="wgl"><i></i> nét màu vàng là bộ thủ · chữ tự viết lần lượt từng nét</p>
<div class="row c"><button class="btn o sm" onclick="WGQ=false;wgRun()">▶ Xem lại</button><button class="btn sm" onclick="WGQ=true;wgRun()">✍ Tập viết</button></div>
<p class="wgq" id="wgq" hidden>Dùng ngón tay hoặc chuột viết lần lượt từng nét vào ô. Viết sai 3 lần, máy sẽ gợi ý nét đúng.</p>
${t?`<div class="wgm"><b>💡 Ghi nhớ</b><p>${t[0]}</p></div>${t[1]?`<div class="wge"><b>📝 Ví dụ</b> ${bS(t[1][0],"🔊")}<div class="hz">${t[1][0]}</div><div class="py">${t[1][1]}</div><div class="vi">${t[1][2]}</div></div>`:""}`:""}
</div>`}
function wgRun(){const el=$("wgc");if(!el||typeof HanziWriter=="undefined")return;WGW.length=0;
 const cs=[...el.querySelectorAll(".wgg")],sz=innerWidth<600?84:104,txt=wgHan(LD[cur].words[fcI][0]);$("wgq")&&($("wgq").hidden=!WGQ);
 cs.forEach((g,j)=>{g.innerHTML="";const c=txt[j],d=HZD[c];const n=$("wgn"+j);
  if(!d){g.innerHTML=`<span class="zh wgx">${c}</span>`;if(n)n.textContent="";return}
  if(n)n.textContent=d.strokes.length+" nét";
  const w=HanziWriter.create(g,c,{width:sz,height:sz,padding:6,strokeColor:"#5c1730",radicalColor:"#c9a227",outlineColor:"#e9dcc4",drawingColor:"#5c1730",highlightColor:"#c9a227",showOutline:true,showCharacter:false,strokeAnimationSpeed:1,delayBetweenStrokes:260,charDataLoader:(ch,ok,no)=>HZD[ch]?ok(HZD[ch]):no()});
  WGW.push(w)});
 if(WGQ){WGW.forEach(w=>w.quiz({showHintAfterMisses:3,onComplete:()=>{}}));return}
 let k=0;const nx=()=>{if(k<WGW.length&&$("wgc")===el)WGW[k++].animateCharacter({onComplete:()=>setTimeout(nx,300)})};nx()}
function wgInit(){if(!$("wgc"))return;const k=olLv+"-"+cur+"-"+fcI;if(k!==WGK){WGQ=false;WGK=k}
 wgLoad("js/hanzi-writer.min.js").then(()=>wgLoad(`data/hz-h${olLv}.js?v=3`)).then(wgRun).catch(()=>{const e=$("wgc");if(e)e.innerHTML=`<small>Chưa tải được dữ liệu nét chữ. Tải lại trang hoặc kiểm tra mạng.</small>`})}
const _wgFc=vFc;vFc=function(L,r){return _wgFc(L,r)+wgCard(L.words[fcI])};
const _wgRR=rr;rr=function(){_wgRR();if(olLv<=2&&ltab=="fc")wgInit()};
(function(){const st=document.createElement("style");st.textContent=`
.wg h3{margin-top:0}.wgh{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px;margin-bottom:10px}
.wgh .zh{font-size:2rem;color:var(--m)}.wgh .py{color:var(--m);font-weight:700}.wgh .vi{color:var(--t)}
.wgc{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:6px 0}
.wgb{display:flex;flex-direction:column;align-items:center;gap:4px}.wgb small{color:var(--sub)}
.wgg{border:1.5px solid #c9a227;border-radius:10px;background:linear-gradient(transparent calc(50% - .5px),#e9dcc4 calc(50% - .5px),#e9dcc4 calc(50% + .5px),transparent calc(50% + .5px)),linear-gradient(90deg,transparent calc(50% - .5px),#e9dcc4 calc(50% - .5px),#e9dcc4 calc(50% + .5px),transparent calc(50% + .5px)),#fffdf7;min-width:84px;min-height:84px;display:grid;place-items:center;touch-action:none}
.wgx{font-size:3.4rem;color:var(--m)}
.wgl{text-align:center;color:var(--sub);font-size:.88rem;margin:4px 0 8px}.wgl i{display:inline-block;width:12px;height:12px;border-radius:3px;background:#c9a227;vertical-align:-1px}
.wgq{text-align:center;font-size:.9rem;color:var(--m)}
.wgm,.wge{background:var(--k);border-radius:14px;padding:10px 14px;margin-top:10px}.wgm p{margin:6px 0 0}
.wge .hz{font-size:1.25rem;margin-top:6px}.wge .py{color:var(--m);font-size:.92rem}
.hidepy .wg .py{display:none}.hidevi .wg .vi{display:none}`;document.head.appendChild(st)})();
