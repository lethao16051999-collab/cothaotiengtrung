/* ===== HSK1 (New HSK 3.0) · Bài mở đầu: Tóm tắt nội dung và nhân vật chính (sách tr.VI–VII) =====
   Ảnh: img/nv/*.webp (cắt từ sách). Hiện ở đầu danh sách bài HSK 1 (Ôn luyện theo bài), trước Bài 1.
   Móc vào app.js qua window.NVH[cấp] = {card(), view()}. Không tính điểm, không gửi Sổ theo dõi. */
(function(){
const NV=[
{k:"xiaoyu",zh:"AI小语",py:"AI Xiǎoyǔ",vi:"AI Tiểu Ngữ",g:"ai",tag:["Trợ giảng AI"],
 dz:"新教程智慧导学助教。",dv:"Trợ giảng thông minh của “Giáo trình New HSK”. Xuất hiện ở mục 小语讲堂 (Lớp học của Tiểu Ngữ), 小语助力 (Tiểu Ngữ giúp sức) và 小语的彩蛋 (Món quà của Tiểu Ngữ)."},
{k:"yifei",zh:"王一飞",py:"Wáng Yīfēi",vi:"Vương Nhất Phi",g:"hn",tag:["Nữ","Bắc Kinh","~30 tuổi","Giáo viên"],
 dz:"女，北京人，30岁左右，中国派驻海外某国某高校的中文教师。",dv:"Nữ, người Bắc Kinh, khoảng 30 tuổi, giảng viên tiếng Trung được Trung Quốc cử sang dạy ở một trường đại học nước ngoài. Học sinh gọi là 王老师 (cô Vương)."},
{k:"jiayue",zh:"白家月",py:"Bái Jiāyuè",vi:"Bạch Gia Nguyệt",g:"hn",tag:["Nữ","Người Pháp","20+ tuổi","Sinh viên"],
 dz:"女，法国人，20多岁，某国某高校大学生，在王一飞班里学中文。",dv:"Nữ, người Pháp, hơn 20 tuổi, sinh viên đại học ở nước ngoài, học tiếng Trung trong lớp của cô Vương Nhất Phi."},
{k:"anni",zh:"安妮",py:"Ānnī",vi:"Annie",g:"hn",tag:["Nữ","Người Canada","20+ tuổi","Sinh viên"],
 dz:"女，加拿大人，20多岁，某国某高校大学生，在王一飞班里学中文。",dv:"Nữ, người Canada, hơn 20 tuổi, sinh viên đại học ở nước ngoài, học tiếng Trung trong lớp của cô Vương Nhất Phi."},
{k:"tianzhong",zh:"陈天中",py:"Chén Tiānzhōng",vi:"Trần Thiên Trung",g:"hn",tag:["Nam","Người Thái Lan","20+ tuổi","Sinh viên"],
 dz:"男，泰国人，20多岁，某国某高校大学生，在王一飞班里学中文。",dv:"Nam, người Thái Lan, hơn 20 tuổi, sinh viên đại học ở nước ngoài, học tiếng Trung trong lớp của cô Vương Nhất Phi."},
{k:"liwen",zh:"李文",py:"Lǐ Wén",vi:"Lý Văn",g:"hn",tag:["Nam","Bắc Kinh","20+ tuổi","Du học sinh ngành Y"],
 dz:"男，北京人，20多岁，某国某高校中国留学生，学医。与白家月、安妮和陈天中在同一所学校，和他们是好朋友。",dv:"Nam, người Bắc Kinh, hơn 20 tuổi, du học sinh Trung Quốc ở nước ngoài, học ngành Y. Học cùng trường và là bạn thân của Bạch Gia Nguyệt, Annie và Trần Thiên Trung."},
{k:"yixue",zh:"王一雪",py:"Wáng Yīxuě",vi:"Vương Nhất Tuyết",g:"tq",tag:["Nữ","Bắc Kinh","30+ tuổi","Nhân viên văn phòng"],
 dz:"女，北京人，30多岁，某跨国公司北京分公司办公室工作人员，王一飞的堂姐。",dv:"Nữ, người Bắc Kinh, hơn 30 tuổi, nhân viên văn phòng ở chi nhánh Bắc Kinh của một công ty đa quốc gia; chị họ của Vương Nhất Phi."},
{k:"liuming",zh:"刘明",py:"Liú Míng",vi:"Lưu Minh",g:"tq",tag:["Nam","Bắc Kinh","~40 tuổi","Bác sĩ"],
 dz:"男，北京人，40岁左右，医生，王一雪的丈夫。",dv:"Nam, người Bắc Kinh, khoảng 40 tuổi, bác sĩ, chồng của Vương Nhất Tuyết."},
{k:"xiaoxue",zh:"刘小雪",py:"Liú Xiǎoxuě",vi:"Lưu Tiểu Tuyết",g:"tq",tag:["Nữ","Bắc Kinh","12 tuổi","Học sinh tiểu học"],
 dz:"女，北京人，12岁，小学生，刘明和王一雪的女儿。",dv:"Nữ, người Bắc Kinh, 12 tuổi, học sinh tiểu học; con gái của Lưu Minh và Vương Nhất Tuyết."},
{k:"xiaoming",zh:"刘小明",py:"Liú Xiǎomíng",vi:"Lưu Tiểu Minh",g:"tq",tag:["Nam","Bắc Kinh","5 tuổi","Mẫu giáo"],
 dz:"男，北京人，5岁，幼儿园学生，刘明和王一雪的儿子。",dv:"Nam, người Bắc Kinh, 5 tuổi, học mẫu giáo; con trai của Lưu Minh và Vương Nhất Tuyết."},
{k:"tongle",zh:"杨同乐",py:"Yáng Tónglè",vi:"Dương Đồng Lạc",g:"tq",tag:["Nam","Thượng Hải","30+ tuổi","Đồng nghiệp"],
 dz:"男，上海人，30多岁，王一雪的同事。",dv:"Nam, người Thượng Hải, hơn 30 tuổi, đồng nghiệp của Vương Nhất Tuyết."}];
const BY={};NV.forEach(n=>BY[n.k]=n);
const GR=[["ai","小语 · Trợ giảng AI",""],["hn","海外场景 · Bối cảnh tại nước ngoài","Ở trường đại học: cô giáo Vương Nhất Phi, các bạn trong lớp và du học sinh Lý Văn."],["tq","中国国内场景 · Bối cảnh tại Trung Quốc","Ở Bắc Kinh: gia đình chị Vương Nhất Tuyết, công việc ở bệnh viện và ở công ty."]];
/* Câu hỏi "Ai là ai?" do cô Thảo soạn theo phần giới thiệu nhân vật */
const QZ=[
["Ai là giáo viên tiếng Trung của lớp?","yifei",["yifei","yixue","jiayue"]],
["Ai là người Pháp?","jiayue",["anni","jiayue","yifei"]],
["Ai là người Canada?","anni",["anni","jiayue","xiaoxue"]],
["Ai là sinh viên người Thái Lan?","tianzhong",["liwen","tianzhong","tongle"]],
["Ai là du học sinh Trung Quốc học ngành Y?","liwen",["tianzhong","liuming","liwen"]],
["Ai là bác sĩ, chồng của Vương Nhất Tuyết?","liuming",["tongle","liuming","liwen"]],
["Ai là chị họ của Vương Nhất Phi?","yixue",["yixue","xiaoxue","anni"]],
["Ai là con gái 12 tuổi của Lưu Minh?","xiaoxue",["xiaoxue","yixue","jiayue"]],
["Ai là con trai 5 tuổi, học mẫu giáo?","xiaoming",["liwen","xiaoming","tianzhong"]],
["Ai là đồng nghiệp người Thượng Hải của Vương Nhất Tuyết?","tongle",["liuming","tongle","liwen"]]];
let Q={i:0,ok:0,pick:null,done:false};
window.NVOPEN=false;
const av=(k,c)=>`<img class="nv-av ${c||""}" src="img/nv/${k}.webp" alt="${BY[k].vi}">`;
const sp=t=>`<button class="nv-sp" onclick="event.stopPropagation();say('${t}')" aria-label="Nghe">🔊</button>`;
function card(n){return `<div class="nv-card"><div class="nv-top">${av(n.k)}<div><div class="nv-nm">${Z(n.zh,n.py)}${sp(n.zh)}</div><b class="nv-vi">${n.vi}</b><div class="nv-tags">${n.tag.map(t=>`<span>${t}</span>`).join("")}</div></div></div><p class="nv-dz zh">${n.dz}</p><p class="nv-dv">${n.dv}</p></div>`}
function fam(){const b=k=>`<div class="fm-p">${av(k,"sm")}<span class="zh">${BY[k].zh}</span><small>${BY[k].vi}</small></div>`;
 return `<div class="nv-fam"><b>Gia đình chị Vương Nhất Tuyết</b><div class="fm-row">${b("liuming")}<span class="fm-l">— 夫妻 —<br>vợ chồng</span>${b("yixue")}</div><div class="fm-down">↓ 女儿 con gái · 儿子 con trai ↓</div><div class="fm-row">${b("xiaoxue")}${b("xiaoming")}</div><div class="fm-row fm-o">${b("yifei")}<span class="fm-l">堂姐妹 · em họ<br>của chị Tuyết</span>${b("tongle")}<span class="fm-l">同事 · đồng nghiệp<br>của chị Tuyết</span></div></div>`}
function quiz(){if(Q.done)return `<div class="nv-q"><b>🎯 Ai là ai?</b><p class="nv-res">Em đúng <b>${Q.ok}/${QZ.length}</b> câu. ${Q.ok>=8?"Em đã nhớ các nhân vật rồi, vào Bài 1 thôi!":"Đọc lại phần giới thiệu rồi làm lại nhé."}</p><button class="btn o" onclick="nv1Q(-1)">↻ Làm lại</button></div>`;
 const q=QZ[Q.i];return `<div class="nv-q"><b>🎯 Ai là ai?</b> <small>Câu ${Q.i+1}/${QZ.length} · đúng ${Q.ok}</small><p class="nv-qq">${q[0]}</p><div class="nv-opt">${q[2].map(k=>`<button class="${Q.pick==null?"":k==q[1]?"ok":k==Q.pick?"no":""}" ${Q.pick!=null?"disabled":""} onclick="nv1Q('${k}')">${av(k,"sm")}<span class="zh">${BY[k].zh}</span><small>${BY[k].py}</small></button>`).join("")}</div>${Q.pick!=null?`<p class="nv-fb ${Q.pick==q[1]?"ok":"no"}">${Q.pick==q[1]?"✅ Đúng rồi!":"❌ Chưa đúng."} ${BY[q[1]].zh} (${BY[q[1]].vi}): ${BY[q[1]].tag.join(" · ")}</p><button class="btn" onclick="nv1Q(0)">${Q.i+1<QZ.length?"Câu tiếp →":"Xem kết quả"}</button>`:""}</div>`}
window.nv1Q=function(k){if(k===-1)Q={i:0,ok:0,pick:null,done:false};else if(k===0){Q.pick=null;if(++Q.i>=QZ.length)Q.done=true}else{if(Q.pick!=null)return;Q.pick=k;if(k==QZ[Q.i][1])Q.ok++}
 const e=document.getElementById("nvq");if(e)e.innerHTML=quiz()};
window.nv1Open=function(){NVOPEN=true;rr();scrollTo(0,0)};
window.nv1Close=function(){NVOPEN=false;rr()};
const SUMZ="本册内容在海外和中国国内两大场景中展开。海外场景为中国外派国际中文教师王一飞和其学生以及在海外的中国留学生李文共同演绎的校园学习和生活故事；中国国内场景主要展示王一飞的堂姐王一雪一家的日常家庭生活，以及刘明和王一雪夫妇等人在医院、公司的职场生活。";
const SUMV="Nội dung của “Giáo trình New HSK 1” diễn ra trong hai bối cảnh lớn: ở nước ngoài và tại Trung Quốc. Bối cảnh ở nước ngoài xoay quanh chuyện học tập và đời sống học đường của cô giáo Vương Nhất Phi (giảng viên tiếng Trung được cử ra nước ngoài), các học sinh của cô và Lý Văn, một du học sinh Trung Quốc. Bối cảnh tại Trung Quốc xoay quanh đời sống gia đình của chị Vương Nhất Tuyết (chị họ của Vương Nhất Phi), cùng công việc của hai vợ chồng Lưu Minh – Vương Nhất Tuyết và những người khác ở bệnh viện, ở công ty.";
window.NVH=window.NVH||{};
NVH[1]={
card:()=>`<div class="ls go nv-ls" onclick="nv1Open()"><b>Bài mở đầu</b><span class="zh lt">认识书里的人物</span><span class="nv-mini">${["yifei","jiayue","liwen","yixue","liuming","tongle"].map(k=>av(k,"xs")).join("")}</span><small>Làm quen 11 nhân vật trong sách · Xem →</small></div>`,
view:()=>`<div class="nv"><div class="row"><button class="btn o" onclick="nv1Close()">← Danh sách bài</button></div>
<div class="nv-hero"><span class="nv-k">Bài mở đầu · New HSK 1</span><h2>${Z("内容梗概及主要人物","Nèiróng gěnggài jí zhǔyào rénwù")}</h2><p>Tóm tắt nội dung và nhân vật chính. Đọc trước khi vào Bài 1 để biết ai đang nói chuyện trong các bài khóa.</p></div>
<div class="card nv-sum"><p class="zh">${SUMZ} ${sp(SUMZ)}</p><p>${SUMV}</p></div>
${GR.map(g=>`<h3 class="nv-h">${g[1]}</h3>${g[2]?`<p class="nv-gd">${g[2]}</p>`:""}<div class="nv-grid">${NV.filter(n=>n.g==g[0]).map(card).join("")}</div>${g[0]=="tq"?fam():""}`).join("")}
<div class="card nv-tip"><b>💡 Mẹo đọc tên</b><p>Họ đứng trước tên: 王一飞 = họ 王 (Vương) + tên 一飞 (Nhất Phi). Trong bài khóa, người thân và bạn bè thường chỉ gọi tên: 一飞, 家月, 同乐. Học sinh gọi cô giáo bằng họ + 老师: ${Z("王老师","Wáng lǎoshī")}.</p><p>Sách ghi 一飞 là <b>Yīfēi</b>, 一雪 là <b>Yīxuě</b>: trong tên riêng, 一 thường giữ thanh 1, không biến điệu như trong ${Z("一个","yí ge")}.</p></div>
<div id="nvq">${quiz()}</div>
<div class="row nv-go"><button class="btn" onclick="nv1Close();openL(1)">Vào Bài 1 →</button></div></div>`};
})();
