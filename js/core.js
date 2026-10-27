const TABS=[["home","Trang chủ"],["about","Giới thiệu"],["courses","Khóa học"],["learn","Học tiếng Trung"],["share","Chia sẻ"],["notes","Sổ tay"],["refs","Tài liệu"],["contact","Liên hệ"]];
const COURSES=[
{n:"HSK 1",o:["Phát âm pinyin chuẩn, đọc viết được chữ Hán cơ bản","Tự giới thiệu, hỏi đáp, mua sắm, gọi món bằng tiếng Trung","Nắm ~300 từ và ~40 điểm ngữ pháp, sẵn sàng thi HSK 1"],s:"30–32 buổi · nhóm 6-12 bạn",t:"Nền tảng từ con số 0: phát âm chuẩn, 300 từ vựng, chào hỏi và giao tiếp hằng ngày.",i:["Chào hỏi, làm quen, mua sắm, gọi món, hỏi ngày giờ","Đọc viết chữ Hán cơ bản, gõ tiếng Trung trên điện thoại/máy tính","Nghe hiểu hội thoại ngắn; tìm hiểu văn hóa Trung Quốc","Giáo trình New HSK 3.0 (HSK 1) + tài liệu biên soạn riêng","Phù hợp: người chưa từng học, học sinh – sinh viên, người đi làm"]},
{n:"HSK 2",o:["Giao tiếp được các tình huống du lịch, hẹn gặp, đi khám bệnh","Dùng được câu so sánh 比, câu 把, câu 被, các loại bổ ngữ","Tích lũy 500 từ, đọc hiểu và viết đoạn ngắn, sẵn sàng thi HSK 2"],s:"25–28 buổi · nhóm 6-12 bạn",t:"500 từ vựng, 45+ điểm ngữ pháp, luyện đủ 4 kỹ năng, đủ kiến thức thi HSK 2.",i:["Du lịch, mua sắm, hỏi giá, thời tiết, sở thích, kế hoạch","Đọc hiểu đoạn ngắn, viết câu và đoạn văn ngắn","Hướng dẫn phương pháp tự học hiệu quả","Giáo trình New HSK 3.0 (HSK 2) + tài liệu biên soạn riêng","Phù hợp: học viên đã xong HSK 1, muốn thi HSK 2"]},
{n:"HSK 3 + giao tiếp thực tế",o:["Hội thoại dài hơn về công việc, học tập, kế hoạch cá nhân","Dùng câu phức: 因为…所以…, 如果…就…, 只要…就…, 不但…而且…","Tích lũy 1.000 từ, luyện đề HSK 3 + HSKK, giao tiếp công việc cơ bản"],s:"38–40 buổi · nhóm 6-12 bạn",t:"1000 từ vựng, 60+ ngữ pháp, luyện đề HSK 3 + HSKK, giao tiếp công việc cơ bản.",i:["Du lịch, đặt khách sạn, sức khỏe, kế hoạch cá nhân","Email, họp ngắn, trao đổi với khách hàng","Giáo trình New HSK 3.0 (HSK 3) + tài liệu biên soạn riêng","Phù hợp: học viên đã xong HSK 2, muốn thi HSK 3 hoặc dùng trong công việc"]}];
const WORDS={1:[["你好","nǐ hǎo","xin chào"],["谢谢","xièxie","cảm ơn"],["老师","lǎoshī","giáo viên"],["学生","xuéshēng","học sinh"],["朋友","péngyou","bạn bè"],["吃","chī","ăn"]],
2:[["工作","gōngzuò","công việc"],["便宜","piányi","rẻ"],["旅游","lǚyóu","du lịch"],["准备","zhǔnbèi","chuẩn bị"],["生日","shēngrì","sinh nhật"],["天气","tiānqì","thời tiết"]],
3:[["健康","jiànkāng","sức khỏe"],["经理","jīnglǐ","quản lý"],["会议","huìyì","cuộc họp"],["价格","jiàgé","giá cả"],["打算","dǎsuan","dự định"],["酒店","jiǔdiàn","khách sạn"]],
4:[["谈判","tánpàn","đàm phán"],["合同","hétong","hợp đồng"],["经验","jīngyàn","kinh nghiệm"],["提高","tígāo","nâng cao"],["参加","cānjiā","tham gia"],["复习","fùxí","ôn tập"]]};
const $=id=>document.getElementById(id);
let ASKF=null;function ask(m,f,one){ASKF=f||null;let d=$("askbox");if(!d){d=document.createElement("div");d.id="askbox";document.body.appendChild(d)}d.hidden=false;d.innerHTML=`<div class="askw"><div class="card"><p>${m}</p><div class="row c"><button class="btn" onclick="askOk(1)">${one?"OK":"Đồng ý"}</button>${one?"":`<button class="btn o" onclick="askOk(0)">Hủy</button>`}</div></div></div>`}
function askOk(v){const d=$("askbox");if(d){d.hidden=true;d.innerHTML=""}const f=ASKF;ASKF=null;if(v&&f)f()}
function go(id){document.querySelectorAll("section").forEach(s=>s.classList.toggle("on",s.id===id));document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.id===id));window.scrollTo(0,0)}
function mMenu(f){const h=document.querySelector("header");h.classList.toggle("mopen",f===undefined?!h.classList.contains("mopen"):f)}
$("nav").innerHTML=TABS.map(t=>t[0]=="learn"?`<div class="ni" id="nilearn"><button data-id="learn" onclick="goSub('ol')">${t[1]}<span class="car">▾</span></button><div class="dd" id="ddlearn"></div></div>`:`<button data-id="${t[0]}" onclick="go('${t[0]}');mMenu(false)">${t[1]}</button>`).join("");go("home");
document.addEventListener("click",e=>{if(!e.target.closest("header"))mMenu(false)});
$("cl").innerHTML=COURSES.map(c=>`<div class="card cc"><h3>🎓 ${c.n}</h3><span class="sub">${c.s}</span><ul>${c.o.map(x=>`<li>${x}</li>`).join("")}</ul><details><summary>Xem chi tiết</summary><p>${c.t}</p><ul>${c.i.map(x=>`<li>${x}</li>`).join("")}</ul><p>💰 Học phí và lịch học: nhắn trực tiếp để được tư vấn.</p></details><a class="btn" href="https://zalo.me/0366534081">Đăng ký tư vấn</a></div>`).join("");
let lv=1,i=0,show=false,known={};
try{known=JSON.parse(localStorage.getItem("ct_known")||"{}")}catch(e){}
function draw(){const w=WORDS[lv][i];$("fc").innerHTML=show?`<div><div class="h">${w[0]}</div><div>${w[1]}</div><b>${w[2]}</b></div>`:`<div class="h">${w[0]}</div>`;
const n=WORDS[lv].filter((_,j)=>known[lv+"-"+j]).length;$("st").textContent=`Từ ${i+1}/${WORDS[lv].length} · Đã nhớ ${n} từ (lưu trên máy này)`;
$("lv").innerHTML=[1,2,3,4].map(l=>`<button class="btn ${l==lv?"":"o"}" onclick="lv=${l};i=0;show=false;draw()">HSK ${l}</button>`).join("")}
function flip(){show=!show;draw()}function nx(d){i=(i+d+WORDS[lv].length)%WORDS[lv].length;show=false;draw()}
function mark(v){known[lv+"-"+i]=v;try{localStorage.setItem("ct_known",JSON.stringify(known))}catch(e){}nx(1)}
draw();
const LV={1:15,2:15,3:18},PARTS=["Flashcard","Ngữ pháp trọng tâm","Nghe chép chính tả","Luyện nói"];let olLv=1;
const SUBS=[["ol","Ôn luyện theo bài"],["ts","Test nhanh"],["fl","Flashcard"],["bt","Bộ thủ"],["py","Phiên âm"],["hk","HSKK nói"],["gm","Game"]];
$("ddlearn").innerHTML=SUBS.map(s=>`<button data-sub="${s[0]}" onclick="event.stopPropagation();goSub('${s[0]}')">${s[1]}</button>`).join("");
let SUBC="ol";
function goSub(id){go("learn");sub(id);mMenu(false);const n=$("nilearn");n.classList.remove("open");n.style.pointerEvents="none";setTimeout(()=>n.style.pointerEvents="",300)}
function crumbDraw(){const s=SUBS.find(x=>x[0]==SUBC),c=$("crumb");if(!c)return;
 const inNv=SUBC=="ol"&&!cur&&window.NVOPEN,inL=SUBC=="ol"&&cur,inT=SUBC=="ts"&&tcur;
 c.innerHTML=`<a onclick="go('home')">Trang chủ</a> › <a onclick="goSub('ol')">Học tiếng Trung</a> › `+(inNv?`<a onclick="nv1Close()">${s[1]}</a> › HSK ${olLv} · Bài mở đầu`:inL?`<a onclick="closeL()">${s[1]}</a> › HSK ${olLv} · Bài ${cur}`:inT?`${s[1]} › HSK ${olLv} · Bài ${tcur}`:s[1]);
 $("lh2").textContent=s[1]}
function sub(id){SUBC=id;SUBS.forEach(s=>$("lp-"+s[0]).classList.toggle("on",s[0]===id));document.querySelectorAll("#ddlearn button").forEach(b=>b.classList.toggle("on",b.dataset.sub===id));crumbDraw()}
function lvBar(){return `<div class="row">${[1,2,3].map(l=>`<button class="btn ${l==olLv?"":"o"}" onclick="setLv(${l})">HSK ${l}</button>`).join("")}</div>`}
const TIPS=[["Tips đi thi HSK","thi hsk đề phòng thi mẹo làm bài"],["Tips thi HSKK (nói)","hskk nói thi"],["Tự học nghe","nghe luyện nghe"],["Tự học nói","nói phát âm khẩu ngữ"],["Tự học đọc","đọc từ vựng đọc hiểu"],["Tự học viết","viết chữ hán bộ thủ nét"]];
const nz=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d");
function drawTips(){const q=nz($("q").value.trim());const r=TIPS.filter(t=>nz(t[0]+" "+t[1]).includes(q));$("tips").innerHTML=r.length?r.map(t=>`<div class="card"><h3>${t[0]}</h3><span class="pill">Nội dung sắp cập nhật</span></div>`).join(""):`<div class="ph">Chưa có bài phù hợp. Nhắn Zalo để cô hỗ trợ trực tiếp.</div>`}

const Z=(h,p)=>`<span class="zp"><span class="zh">${h}</span>${p?`<small>${p}</small>`:""}</span>`;
const OP=o=>{const [h,p]=o.split("|");return p?`<span class="zh">${h}</span><small class="opy">${p}</small>`:h};

const GXD={};
