/* ===== HSK1 · Ngữ pháp trình bày lại (20/10, theo yêu cầu cô Thảo)
   Mỗi điểm ngữ pháp có đủ dạng: Khẳng định / Phủ định / Câu hỏi (+ Trả lời nếu cần); mỗi ý một dòng.
   File này nạp SAU các file bài HSK1 và ghi đè LD1[n].gp. Sửa ngữ pháp HSK1: sửa ở đây.
   G({d:[mô tả…], f:[[loại, công thức chữ Hán, pinyin]…], e:[[loại, [[chữ, pinyin, nghĩa(, chữ B, pinyin B)]…]]…], n:[ghi chú…], w:[lỗi hay gặp…]})
   loại: k = Khẳng định · p = Phủ định · h = Câu hỏi · t = Trả lời · c = Cấu trúc ===== */
(function(){
const LB={k:"✔ Khẳng định",p:"✘ Phủ định",h:"? Câu hỏi",t:"↳ Trả lời",c:"• Cấu trúc"};
const LE={k:"Ví dụ · Khẳng định",p:"Ví dụ · Phủ định",h:"Ví dụ · Câu hỏi",t:"Ví dụ · Hỏi – đáp",c:"Ví dụ"};
const ex=x=>`<li>${Z(x[0],x[1])}${x[2]?`<span class="vi">${x[2]}</span>`:""}${x[3]?`<span class="garr">→ ${Z(x[3],x[4])}</span>`:""}</li>`;
window.G=o=>(o.d||[]).map(x=>`<p class="gd">${x}</p>`).join("")
 +(o.f?`<div class="gfs">${o.f.map(r=>`<div class="gfr"><span class="gfl ${r[0]}">${LB[r[0]]}</span><span class="fm">${r[1]}${r[2]?`<small>${r[2]}</small>`:""}</span></div>`).join("")}</div>`:"")
 +(o.e||[]).map(g=>`<p class="gsub ${g[0]}">${g[2]||LE[g[0]]}</p><ul>${g[1].map(ex).join("")}</ul>`).join("")
 +(o.n&&o.n.length?`<div class="gn">${o.n.map(x=>`<p>💡 ${x}</p>`).join("")}</div>`:"")
 +(o.w&&o.w.length?`<div class="gw"><b>⚠️ Lỗi hay gặp</b>${o.w.map(x=>`<p>${x}</p>`).join("")}</div>`:"");
const st=document.createElement("style");st.textContent=`
.gpb .gd{margin:0 0 8px}
.gfs{display:grid;gap:8px;margin:6px 0 16px}
.gfr{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px}
.gfl{flex:none;min-width:112px;font:700 .82rem var(--ui);padding:5px 10px;border-radius:999px;text-align:center}
.gfl.k{background:rgba(46,125,79,.14);color:#2e7d4f}.gfl.p{background:rgba(178,58,72,.13);color:#b23a48}
.gfl.h{background:rgba(201,162,39,.22);color:#7a5f08}.gfl.t,.gfl.c{background:var(--k);color:var(--m);border:1px solid var(--b)}
.gpb .gfr .fm{margin:0;padding:8px 14px;font-size:1.08rem}
.gpb .gsub{font:800 .78rem var(--ui);letter-spacing:.04em;text-transform:uppercase;margin:12px 0 6px;color:var(--sub)}
.gpb .gsub.k{color:#2e7d4f}.gpb .gsub.p{color:#b23a48}.gpb .gsub.h,.gpb .gsub.t{color:#7a5f08}
.gpb li .vi{display:block;color:var(--sub);font-size:.95rem}
.gpb li .garr{display:flex;align-items:flex-start;gap:6px;margin:2px 0 4px;color:var(--m)}
.gpb li .garr .zp{margin:0}
.gn{margin:12px 0}.gpb .gn p{margin:0 0 6px}
.gw{background:var(--warnbg,#fbe9ec);border:1px solid rgba(178,58,72,.22);border-radius:14px;padding:10px 14px;margin:12px 0 4px}
.gw>b{color:#b23a48!important;display:block;margin-bottom:4px}.gpb .gw p{margin:0 0 6px}.gpb .gw p:last-child{margin:0}
@media(max-width:600px){.gfl{min-width:0}.gfr{gap:4px}}`;document.head.appendChild(st);
})();

/* ---------- Bài 1 ---------- */
if(LD1[1])LD1[1].gp=[
{h:"1. Chào hỏi: Đối tượng ＋ 好",b:G({
 f:[["c","你 / 您 / 你们 / 大家 ＋ 好！","nǐ / nín / nǐmen / dàjiā + hǎo!"],["c","Danh xưng ＋ ，＋ 你好 / 您好！","…, nǐ hǎo / nín hǎo!"],["t","Đáp lại: chào lại theo cùng mẫu","你好！→ 你好！"]],
 e:[["c",[["你好！","Nǐ hǎo!","Chào bạn (ngang hàng, bạn bè)."],["您好！","Nín hǎo!","Chào ông / bà / thầy cô (kính trọng)."],["你们好！","Nǐmen hǎo!","Chào các bạn."],["大家好！","Dàjiā hǎo!","Chào mọi người, chào cả lớp."]]],
    ["t",[["王老师，你好！","Wáng lǎoshī, nǐ hǎo!","","AI小语，你好！","AI Xiǎoyǔ, nǐ hǎo!"],["大家好！","Dàjiā hǎo!","","老师，您好！","Lǎoshī, nín hǎo!"]]]],
 n:["Danh xưng có thể đặt trước hoặc sau lời chào: 王老师，你好！ · 你好，小语！"],
 w:["Chào thầy cô bằng 你好 → nên nói 老师，您好！","✗ 你好们 → 你们好."]})},
{h:"2. Hậu tố 们: chỉ số nhiều",b:G({
 f:[["c","Đại từ / danh từ chỉ người ＋ 们","… + men"]],
 e:[["c",[["你 → 你们","nǐ → nǐmen","bạn → các bạn"],["学生 → 学生们","xuésheng → xuéshengmen","học sinh → các học sinh"],["同学 → 同学们","tóngxué → tóngxuémen","bạn học → các bạn học"]]]],
 n:["Muốn chào nhiều người một cách lịch sự, dùng 大家好！"],
 w:["们 chỉ dùng cho người, không dùng cho đồ vật, con vật.","Khẩu ngữ hầu như không nói 您们."]})},
{h:"3. Cảm ơn và đáp lại",b:G({
 f:[["c","A：谢谢！","A: Xièxie!"],["t","B：不客气！","B: Bú kèqi!"]],
 e:[["t",[["谢谢！","Xièxie!","Cảm ơn bạn!","不客气！","Bú kèqi!"]]]],
 n:["谢谢 đọc xièxie: chữ thứ hai đọc nhẹ, ngắn."],
 w:["Đọc nặng cả hai chữ thành ✗ xiè xiè.","Đáp lời cảm ơn bằng ✗ 没关系 (câu này dùng để đáp lời xin lỗi)."]})},
{h:"4. Tạm biệt",b:G({
 f:[["c","(Danh xưng，) 再见！","(…,) zàijiàn!"],["t","Đáp lại: (Danh xưng，) 再见！",""]],
 e:[["t",[["同学们，再见！","Tóngxuémen, zàijiàn!","","老师，再见！","Lǎoshī, zàijiàn!"]]]],
 n:["Tiếng Việt thêm “ạ” để lễ phép.","Tiếng Trung không có từ tương ứng; sự lịch sự thể hiện bằng danh xưng 老师 đặt trước."]})},
{h:"5. Phát âm: biến điệu",b:G({
 f:[["c","Thanh 3 ＋ thanh 3 → thanh 2 ＋ thanh 3","你好 nǐ hǎo → đọc ní hǎo"],["c","不 ＋ thanh 4 → bú","不客气 bú kèqi"]],
 w:["Đọc lẫn 您 nín (thanh 2, có âm cuối -n) với 你 nǐ (thanh 3) là mất sắc thái kính trọng.","Đọc ✗ bù kèqi."]})}];

/* ---------- Bài 2 ---------- */
if(LD1[2])LD1[2].gp=[
{h:"1. Trật tự từ cơ bản: Chủ ngữ ＋ Vị ngữ ＋ Tân ngữ",b:G({
 d:["Trật tự giống tiếng Việt: “Tôi tên là…”, “Tôi là học sinh”."],
 f:[["k","Chủ ngữ ＋ 叫 / 是 ＋ tân ngữ","… + jiào / shì + …"],["p","Chủ ngữ ＋ 不 ＋ 叫 / 是 ＋ tân ngữ","… + bú jiào / bú shì + …"],["h","Chủ ngữ ＋ 叫 ＋ 什么 ＋ 名字？","… + jiào shénme míngzi?"]],
 e:[["k",[["我叫陈天中。","Wǒ jiào Chén Tiānzhōng.","Mình tên là Trần Thiên Trung."],["我是学生。","Wǒ shì xuésheng.","Mình là học sinh."]]],
    ["p",[["我不是安妮。","Wǒ bú shì Ānnī.","Mình không phải là Annie."]]],
    ["h",[["你叫什么名字？","Nǐ jiào shénme míngzi?","Bạn tên là gì?"]]]],
 n:["Câu hỏi có 什么 giữ nguyên trật tự: 什么 đứng đúng chỗ của thông tin cần hỏi."],
 w:["✗ 我叫是陈天中 → 我叫陈天中.","Câu đã có 什么 lại thêm 吗: ✗ 你叫什么名字吗？"]})},
{h:"2. Hỏi tên và nói tên",b:G({
 f:[["h","请问，你叫什么名字？","Qǐngwèn, nǐ jiào shénme míngzi?"],["t","我叫 ＋ họ tên。","Wǒ jiào …"],["p","我不叫 ＋ họ tên。","Wǒ bú jiào …"]],
 e:[["t",[["请问，你叫什么名字？","Qǐngwèn, nǐ jiào shénme míngzi?","Xin hỏi, bạn tên là gì?","我叫白家月。","Wǒ jiào Bái Jiāyuè."]]],
    ["p",[["我不叫安妮，我叫白家月。","Wǒ bú jiào Ānnī, wǒ jiào Bái Jiāyuè.","Mình không tên là Annie, mình tên là Bạch Gia Nguyệt."]]]],
 n:["请问 là kính ngữ, đặt đầu câu khi hỏi lịch sự (“Xin hỏi…”).","Họ tên người Trung Quốc: họ ＋ tên, giống tiếng Việt: 陈 + 天中, 白 + 家月, 李 + 文."],
 w:["Người Việt quen gọi bằng chữ cuối. Với tên Trung Quốc, người mới quen gọi cả họ tên 陈天中; bạn thân gọi 天中, không gọi riêng ✗ 中.","什么 đọc shénme: sh uốn lưỡi, 么 đọc nhẹ."]})},
{h:"3. Phủ định với 不: 不是",b:G({
 f:[["k","A ＋ 是 ＋ B","A + shì + B"],["p","A ＋ 不是 ＋ B","A + bú shì + B"],["h","A ＋ 是 ＋ B ＋ 吗？","A + shì + B + ma? (吗 học kỹ ở Bài 3)"]],
 e:[["k",[["我是白家月。","Wǒ shì Bái Jiāyuè.","Mình là Bạch Gia Nguyệt."]]],
    ["p",[["我不是安妮，我是白家月。","Wǒ bú shì Ānnī, wǒ shì Bái Jiāyuè.","Mình không phải Annie, mình là Bạch Gia Nguyệt."],["我不是老师，我是学生。","Wǒ bú shì lǎoshī, wǒ shì xuésheng.","Mình không phải giáo viên, mình là học sinh."]]],
    ["h",[["你是安妮吗？","Nǐ shì Ānnī ma?","Bạn là Annie à?","我不是安妮。","Wǒ bú shì Ānnī."]]]],
 n:["不 đứng TRƯỚC từ bị phủ định.","不 vốn đọc thanh 4 (bù); trước thanh 4 đọc thành thanh 2: 不是 bú shì."],
 w:["Thấy 没关系 có 没 nên nói ✗ 我没是安妮. Phủ định 是 luôn dùng 不."]})},
{h:"4. Xin lỗi và đáp lại",b:G({
 f:[["c","A：对不起！","A: Duìbuqǐ!"],["t","B：没关系！ / 没事！","B: Méi guānxi! / Méishì!"]],
 e:[["t",[["对不起！","Duìbuqǐ!","Xin lỗi bạn!","没关系！","Méi guānxi!"],["对不起！","Duìbuqǐ!","Xin lỗi!","没事没事。","Méishì méishì."]]]],
 n:["没事 dùng nhiều trong khẩu ngữ, nghĩa giống 没关系.","对不起: chữ 不 ở giữa đọc nhẹ; 没关系: chữ 系 đọc nhẹ."],
 w:["Nhầm cặp đáp: 谢谢 → 不客气; 对不起 → 没关系."]})},
{h:"5. 很 ＋ tính từ · vị trí của 也",b:G({
 f:[["k","Chủ ngữ ＋ (也) ＋ 很 ＋ tính từ","… + (yě) + hěn + …"],["p","Chủ ngữ ＋ 也 ＋ 不 ＋ 是 …","… + yě bú shì …"],["h","Chủ ngữ ＋ 也 ＋ 是 … ＋ 吗？","… + yě shì … ma?"]],
 e:[["k",[["很高兴认识你。","Hěn gāoxìng rènshi nǐ.","Rất vui được làm quen với bạn."],["认识你我也很高兴。","Rènshi nǐ wǒ yě hěn gāoxìng.","Mình cũng rất vui được làm quen với bạn."],["我也是学生。","Wǒ yě shì xuésheng.","Mình cũng là học sinh."]]],
    ["p",[["我也不是安妮。","Wǒ yě bú shì Ānnī.","Mình cũng không phải Annie."]]],
    ["h",[["你也是学生吗？","Nǐ yě shì xuésheng ma?","Bạn cũng là học sinh à?"]]]],
 n:["也 đứng sau chủ ngữ, trước động từ hoặc 很; 也 đứng trước 不.","Tính từ (高兴) làm vị ngữ thì không cần 是, thường có 很 đi kèm."],
 w:["✗ 我是很高兴 (thêm 是 theo kiểu “I am happy”).","✗ 也我很高兴, ✗ 我很高兴也, ✗ 我不也是 (đặt sai vị trí 也)."]})}];

/* ---------- Bài 3 ---------- */
if(LD1[3])LD1[3].gp=[
{h:"1. Câu chữ 是",b:G({
 d:["Dùng để nói người hoặc sự vật là ai, là gì, thuộc nhóm nào."],
 f:[["k","A ＋ 是 ＋ B","A + shì + B"],["p","A ＋ 不是 ＋ B","A + bú shì + B"],["h","A ＋ 是 ＋ B ＋ 吗？ · A ＋ 是 ＋ 谁 / 哪国人？","A + shì + B + ma? · … shì shéi / nǎ guó rén?"]],
 e:[["k",[["我是法国人。","Wǒ shì Fǎguó rén.","Mình là người Pháp."],["她是中文老师。","Tā shì Zhōngwén lǎoshī.","Cô ấy là giáo viên tiếng Trung."]]],
    ["p",[["我老师不是法国人。","Wǒ lǎoshī bú shì Fǎguó rén.","Cô giáo mình không phải người Pháp."]]],
    ["h",[["你是中国人吗？","Nǐ shì Zhōngguó rén ma?","Bạn là người Trung Quốc à?"],["她是谁？","Tā shì shéi?","Cô ấy là ai?"]]]],
 w:["Nói theo kiểu tiếng Việt “Tôi người Pháp” thành ✗ 我法国人 (thiếu 是).","Thêm 是 trước tính từ ✗ 我是忙 → 我很忙."]})},
{h:"2. Trợ từ kết cấu 的",b:G({
 d:["Biểu thị quan hệ sở hữu: định ngữ ＋ 的 ＋ trung tâm ngữ."],
 f:[["k","Người / vật ＋ 的 ＋ danh từ","… + de + …"],["p","这 ＋ 不是 ＋ … ＋ 的 ＋ danh từ","Zhè bú shì … de …"],["h","这是 ＋ 谁的 ＋ danh từ？","Zhè shì shéi de …?"]],
 e:[["k",[["白家月的中文老师","Bái Jiāyuè de Zhōngwén lǎoshī","giáo viên tiếng Trung của Bạch Gia Nguyệt"],["你的名字","nǐ de míngzi","tên của bạn"]]],
    ["p",[["她不是我的中文老师。","Tā bú shì wǒ de Zhōngwén lǎoshī.","Cô ấy không phải giáo viên tiếng Trung của mình."]]],
    ["h",[["你是他的中文老师吗？","Nǐ shì tā de Zhōngwén lǎoshī ma?","Chị là giáo viên tiếng Trung của anh ấy à?"]]]],
 n:["Trước 的 là đại từ nhân xưng, sau 的 là người thân / người có quan hệ gần thì có thể bỏ 的: 我老师 · 我学生 · 你同学 · 我妈妈 · 我女朋友."],
 w:["Trật tự ngược tiếng Việt: “tên của bạn” → 你的名字, không nói ✗ 名字的你.","“giáo viên tiếng Trung của mình” → 我的中文老师."]})},
{h:"3. Câu hỏi với 吗",b:G({
 f:[["k","Câu trần thuật。","Nǐ shì lǎoshī."],["h","Câu trần thuật ＋ 吗？","… + ma?"],["t","对 / 是，… · 不，… 不 …","Duì / Shì, … · Bù, … bù …"]],
 e:[["h",[["你也很忙吗？","Nǐ yě hěn máng ma?","Chị cũng rất bận à?","我不太忙。","Wǒ bú tài máng."],["你是他的中文老师吗？","Nǐ shì tā de Zhōngwén lǎoshī ma?","Chị là giáo viên tiếng Trung của anh ấy à?","对，我是他的中文老师。","Duì, wǒ shì tā de Zhōngwén lǎoshī."],["你有姐姐吗？","Nǐ yǒu jiějie ma?","Bạn có chị gái không?"]]]],
 w:["Câu đã có từ để hỏi (谁, 哪, 什么) lại thêm 吗: ✗ 你是哪国人吗？ Mỗi câu hỏi chỉ dùng một cách hỏi."]})},
{h:"4. Hỏi người, hỏi quốc tịch: 谁, 哪国人",b:G({
 f:[["h","这是谁？ · … 是哪国人？","Zhè shì shéi? · … shì nǎ guó rén?"],["t","这是 ＋ người。 · … 是 ＋ tên nước ＋ 人。","Zhè shì … · … shì … rén."],["p","她不是 ＋ tên nước ＋ 人。","Tā bú shì … rén."]],
 e:[["t",[["这是谁？","Zhè shì shéi?","Đây là ai?","这是我女朋友。","Zhè shì wǒ nǚpéngyou."],["你是哪国人？","Nǐ shì nǎ guó rén?","Bạn là người nước nào?","我是中国人。","Wǒ shì Zhōngguó rén."]]],
    ["p",[["她不是泰国人，她是中国人。","Tā bú shì Tàiguó rén, tā shì Zhōngguó rén.","Cô ấy không phải người Thái, cô ấy là người Trung Quốc."]]]],
 n:["Câu trả lời thay đúng vào chỗ của 谁 / 哪国.","谁 đọc shéi hoặc shuí đều được.","Tên nước ＋ 人 = người nước đó: 中国人 · 法国人 · 泰国人."],
 w:["Dịch “người nước gì” thành ✗ 你是什么国人？","Hỏi quốc tịch dùng 哪 (nǎ, thanh 3), đừng nhầm với 那 (nà, kia)."]})},
{h:"5. 还 (vẫn) và 不太 (không … lắm)",b:G({
 f:[["k","还 ＋ (很) ＋ tính từ","hái + (hěn) + …"],["p","不太 ＋ tính từ","bú tài + …"],["h","… 还 ＋ tính từ ＋ 吗？","… hái + … + ma?"]],
 e:[["h",[["你工作还忙吗？","Nǐ gōngzuò hái máng ma?","Công việc của chị vẫn bận à?"]]],
    ["k",[["对，还很忙。","Duì, hái hěn máng.","Vâng, vẫn rất bận."]]],
    ["p",[["我不太忙。","Wǒ bú tài máng.","Chị không bận lắm."]]]],
 n:["想 trong bài nghĩa là “nhớ”: 我们很想你。 · 我也想你们。"],
 w:["“không bận lắm” theo trật tự tiếng Việt dễ thành ✗ 不忙太. Đúng: 不太忙.","不 trước 太 (thanh 4) đọc thành bú."]})}];

/* ---------- Bài 8 ---------- */
if(LD1[8])LD1[8].gp=[
{h:"1. Phương vị từ: 上, 下, 前, 后, 里, 外",b:G({
 d:["上 trên · 下 dưới · 前 trước · 后 sau · 里 trong · 外 ngoài."],
 f:[["k","Người / vật ＋ 在 ＋ danh từ ＋ phương vị từ","… + zài + … + shàng / xià / qián / hòu / lǐ / wài"],["p","Người / vật ＋ 不在 ＋ danh từ ＋ phương vị từ","… + bú zài + …"],["h","Người / vật ＋ 在哪儿？ · … 在 … 吗？","… zài nǎr? · … zài … ma?"]],
 e:[["k",[["它在桌子下呢。","Tā zài zhuōzi xià ne.","Nó ở dưới cái bàn kia kìa."],["房间外有一只小猫。","Fángjiān wài yǒu yì zhī xiǎo māo.","Bên ngoài phòng có một con mèo nhỏ."]]],
    ["p",[["小猫不在桌子下。","Xiǎo māo bú zài zhuōzi xià.","Con mèo nhỏ không ở dưới bàn."]]],
    ["h",[["它在哪儿呢？","Tā zài nǎr ne?","Nó ở đâu thế?","它在桌子下呢。","Tā zài zhuōzi xià ne."],["小猫在房间外吗？","Xiǎo māo zài fángjiān wài ma?","Con mèo nhỏ ở ngoài phòng à?"]]]],
 w:["Trật tự ngược với tiếng Việt: “dưới bàn” → 桌子下, “trước hiệu sách” → 书店前.","Không nói ✗ 下桌子, ✗ 前书店."]})},
{h:"2. Giới từ 在: làm việc gì ở đâu",b:G({
 f:[["k","Chủ ngữ ＋ 在 ＋ nơi chốn ＋ động từ","… + zài + … + V"],["p","Chủ ngữ ＋ 不在 ＋ nơi chốn ＋ động từ","… + bú zài + … + V"],["h","Chủ ngữ ＋ 在哪儿 ＋ động từ？ · … 在 … V 吗？","… zài nǎr + V? · … zài … V ma?"]],
 e:[["k",[["我在学校吃午饭。","Wǒ zài xuéxiào chī wǔfàn.","Mình ăn trưa ở trường."],["我爸爸也在医院工作。","Wǒ bàba yě zài yīyuàn gōngzuò.","Bố em cũng làm việc ở bệnh viện."]]],
    ["p",[["我不在学校吃午饭。","Wǒ bú zài xuéxiào chī wǔfàn.","Mình không ăn trưa ở trường."]]],
    ["h",[["我们在哪儿见呢？","Wǒmen zài nǎr jiàn ne?","Chúng mình gặp nhau ở đâu nhỉ?","在学校书店前见吧。","Zài xuéxiào shūdiàn qián jiàn ba."],["你在医院工作吗？","Nǐ zài yīyuàn gōngzuò ma?","Bạn làm việc ở bệnh viện à?"]]]],
 n:["Chỉ nói người / vật ở đâu (không có động từ khác) thì 在 là động từ: 它在桌子下呢。","也 và 不 đứng trước 在: 也在医院工作 · 不在学校吃饭."],
 w:["Theo tiếng Việt “Bố em làm việc ở bệnh viện” đặt nơi chốn ra cuối ✗ 我爸爸工作在医院.","Đúng: 我爸爸在医院工作 (在 + nơi chốn đứng TRƯỚC động từ)."]})},
{h:"3. Động từ năng nguyện 能",b:G({
 d:["能 đứng trước động từ, biểu thị có năng lực, điều kiện hoặc khả năng làm việc gì."],
 f:[["k","Chủ ngữ ＋ 能 ＋ động từ","… + néng + V"],["p","Chủ ngữ ＋ 不能 ＋ động từ","… + bù néng + V"],["h","Chủ ngữ ＋ 能 ＋ động từ ＋ 吗？","… + néng + V + ma?"],["t","能。 / 不能。","Néng. / Bù néng."]],
 e:[["k",[["爸爸能去。","Bàba néng qù.","Bố đi được."],["我能到。","Wǒ néng dào.","Mình đến được."]]],
    ["p",[["我不能去学校吃午饭。","Wǒ bù néng qù xuéxiào chī wǔfàn.","Mình không đến trường ăn trưa được."],["我现在有事，不能去。","Wǒ xiànzài yǒu shì, bù néng qù.","Bây giờ mình có việc, không đi được."]]],
    ["h",[["下午两点你能到吗？","Xiàwǔ liǎng diǎn nǐ néng dào ma?","2 giờ chiều bạn đến được không?","我能到。","Wǒ néng dào."]]]],
 w:["Trả lời ngắn chỉ cần 能。 / 不能。, không nói ✗ 我是能.","Phủ định 能 dùng 不, không dùng 没 (ở trình độ này)."]})},
{h:"4. 没 ＋ động từ: chưa / không (việc đã xảy ra)",b:G({
 d:["没 phủ định việc đã / chưa xảy ra.","不 phủ định thói quen, ý muốn."],
 f:[["k","Chủ ngữ ＋ động từ (＋ 了)","… + V (+ le) · 了 học kỹ ở Bài 12, 14"],["p","Chủ ngữ ＋ 没 ＋ động từ · 还没 ＋ động từ ＋ 呢","… + méi + V · hái méi + V + ne"],["h","… 还没 ＋ động từ ＋ 呢？","… hái méi + V + ne?"]],
 e:[["p",[["我没看见。","Wǒ méi kànjiàn.","Mình không nhìn thấy."],["没吃呢。","Méi chī ne.","Chưa ăn ạ."]]],
    ["h",[["小胡，还没吃饭呢？","Xiǎo Hú, hái méi chī fàn ne?","Tiểu Hồ, em vẫn chưa ăn cơm à?","没吃呢。","Méi chī ne."]]],
    ["c",[["我不吃。 ≠ 我没吃。","Wǒ bù chī. ≠ Wǒ méi chī.","Tôi không ăn (không muốn) ≠ Tôi chưa ăn."]],"So sánh 不 và 没"]],
 w:["“Mình chưa ăn” nói thành ✗ 我不吃饭 (nghĩa thành “mình không ăn cơm”).","Hỏi “chưa ăn à?” nhớ có 还没 … 呢."]})},
{h:"5. Lượng từ 只 và 真 ＋ tính từ",b:G({
 f:[["k","一 / 这 ＋ 只 ＋ danh từ · 真 ＋ tính từ！","yì / zhè + zhī + … · zhēn + …!"],["p","这只小猫不 ＋ tính từ。","Zhè zhī xiǎo māo bù + …"],["h","这只小猫 ＋ tính từ ＋ 吗？","Zhè zhī xiǎo māo + … + ma?"]],
 e:[["k",[["房间外有一只小猫。","Fángjiān wài yǒu yì zhī xiǎo māo.","Bên ngoài phòng có một con mèo nhỏ."],["这只小猫真漂亮！","Zhè zhī xiǎo māo zhēn piàoliang!","Con mèo nhỏ này xinh thật!"],["你家有两个医生？","Nǐ jiā yǒu liǎng ge yīshēng?","Nhà em có hai bác sĩ à? (người dùng 个)"]]],
    ["p",[["这只小猫不大。","Zhè zhī xiǎo māo bú dà.","Con mèo nhỏ này không to."]]],
    ["h",[["这只小猫漂亮吗？","Zhè zhī xiǎo māo piàoliang ma?","Con mèo nhỏ này có xinh không?"]]]],
 w:["Bỏ lượng từ: ✗ 一小猫, ✗ 这小猫.","Con vật nhỏ dùng 只, người dùng 个. 只 ở đây đọc zhī (thanh 1)."]})}];

/* ---------- Bài 9 ---------- */
if(LD1[9])LD1[9].gp=[
{h:"1. Câu tồn hiện: nơi chốn ＋ 有 / 是 ＋ người, vật",b:G({
 d:["有: cho biết ở đó CÓ cái gì (người nghe chưa biết).","是: cho biết thứ ở đó LÀ cái gì."],
 f:[["k","Nơi chốn ＋ 有 ＋ (số ＋ lượng từ) ＋ danh từ · Nơi chốn ＋ 是 ＋ danh từ","… + yǒu + … · … + shì + …"],["p","Nơi chốn ＋ 没有 ＋ danh từ · Nơi chốn ＋ 不是 ＋ danh từ","… + méiyǒu + … · … + bú shì + …"],["h","Nơi chốn ＋ 有 ＋ danh từ ＋ 吗？ · Nơi chốn ＋ 有 / 是 ＋ 什么？","… yǒu … ma? · … yǒu / shì shénme?"]],
 e:[["k",[["学校前边有一家电影院。","Xuéxiào qiánbian yǒu yì jiā diànyǐngyuàn.","Phía trước trường có một rạp chiếu phim."],["椅子上有一本中文书。","Yǐzi shang yǒu yì běn Zhōngwén shū.","Trên ghế có một quyển sách tiếng Trung."],["学校外边是一家小店。","Xuéxiào wàibian shì yì jiā xiǎo diàn.","Bên ngoài trường là một cửa hàng nhỏ."]]],
    ["p",[["椅子上没有书。","Yǐzi shang méiyǒu shū.","Trên ghế không có sách."]]],
    ["h",[["学校前边有什么？","Xuéxiào qiánbian yǒu shénme?","Phía trước trường có gì?","学校前边有一家电影院。","Xuéxiào qiánbian yǒu yì jiā diànyǐngyuàn."]]]],
 w:["Theo tiếng Việt “Có một rạp chiếu phim ở phía trước trường” thành ✗ 有一家电影院在学校前边.","Nơi chốn đứng đầu câu, không thêm 在: ✗ 在椅子上有一本书.","Phủ định 有 là 没有, không nói ✗ 不有."]})},
{h:"2. Trật tự: thời gian ＋ nơi chốn ＋ động từ",b:G({
 f:[["k","Chủ ngữ ＋ thời gian ＋ 在 ＋ nơi chốn ＋ động từ","… + thời gian + zài + … + V"],["p","Chủ ngữ ＋ thời gian ＋ 不在 ＋ nơi chốn ＋ động từ","… + thời gian + bú zài + … + V"],["h","Chủ ngữ ＋ thời gian ＋ 在哪儿 ＋ động từ？","… + thời gian + zài nǎr + V?"]],
 e:[["k",[["我明天上午在学校学习。","Wǒ míngtiān shàngwǔ zài xuéxiào xuéxí.","Sáng mai mình học ở trường."],["我们七点在电影院外边见。","Wǒmen qī diǎn zài diànyǐngyuàn wàibian jiàn.","Bảy giờ chúng mình gặp ở bên ngoài rạp chiếu phim."],["我白天在家里读书。","Wǒ báitiān zài jiā li dúshū.","Ban ngày em ở nhà đọc sách."]]],
    ["p",[["我明天上午不在学校学习。","Wǒ míngtiān shàngwǔ bú zài xuéxiào xuéxí.","Sáng mai mình không học ở trường."]]],
    ["h",[["你明天上午在哪儿学习？","Nǐ míngtiān shàngwǔ zài nǎr xuéxí?","Sáng mai bạn học ở đâu?","我明天上午在学校学习。","Wǒ míngtiān shàngwǔ zài xuéxiào xuéxí."]]]],
 n:["Thời gian cũng có thể đứng trước chủ ngữ: 明天上午我在学校学习。"],
 w:["Đặt thời gian, nơi chốn ra cuối như tiếng Việt: ✗ 我学习在学校明天上午.","Nhớ thứ tự: thời gian → nơi chốn → việc làm."]})},
{h:"3. Tiền tố 第: số thứ tự",b:G({
 f:[["k","第 ＋ số ＋ lượng từ ＋ danh từ","dì + số + …"],["p","这不是 ＋ 第 ＋ số ＋ lượng từ ＋ danh từ","zhè bú shì dì …"],["h","第几 ＋ lượng từ ＋ danh từ？","dì jǐ + …?"]],
 e:[["k",[["第一 · 第二 · 第三","dì-yī · dì-èr · dì-sān","thứ nhất · thứ hai · thứ ba"],["这是我的第二本中文书。","Zhè shì wǒ de dì-èr běn Zhōngwén shū.","Đây là quyển sách tiếng Trung thứ hai của mình."],["第一只小狗是我的。","Dì-yī zhī xiǎo gǒu shì wǒ de.","Con chó nhỏ thứ nhất là của mình."]]],
    ["p",[["这不是我的第一本中文书。","Zhè bú shì wǒ de dì-yī běn Zhōngwén shū.","Đây không phải quyển sách tiếng Trung đầu tiên của mình."]]],
    ["h",[["这是你的第几本中文书？","Zhè shì nǐ de dì jǐ běn Zhōngwén shū?","Đây là quyển sách tiếng Trung thứ mấy của bạn?"]]]],
 w:["Phân biệt 两本书 (hai quyển – số lượng) với 第二本书 (quyển thứ hai – thứ tự).","Có 第 thì dùng 二, không dùng 两: ✗ 第两本.","Lượng từ vẫn phải có: ✗ 第二书."]})},
{h:"4. Lượng từ 家, 本 · 这个 / 那个",b:G({
 f:[["k","一 ＋ 家 ＋ 电影院 / 小店 · 一 ＋ 本 ＋ 书 · 那 ＋ 个 ＋ danh từ","yì jiā … · yì běn … · nàge …"],["p","不去 ＋ 那个 ＋ danh từ","bú qù nàge …"],["h","哪 ＋ 个 / 家 ＋ danh từ？ · 那是谁的书？","nǎ ge / nǎ jiā …? · Nà shì shéi de shū?"]],
 e:[["k",[["一家电影院 · 一本中文书","yì jiā diànyǐngyuàn · yì běn Zhōngwén shū","một rạp chiếu phim · một quyển sách tiếng Trung"],["我们晚上去那个电影院看电影吧。","Wǒmen wǎnshang qù nàge diànyǐngyuàn kàn diànyǐng ba.","Tối nay chúng mình đến rạp đó xem phim nhé."]]],
    ["p",[["我不去那个电影院。","Wǒ bú qù nàge diànyǐngyuàn.","Mình không đi rạp chiếu phim đó."]]],
    ["h",[["你去哪个电影院？","Nǐ qù nǎge diànyǐngyuàn?","Bạn đi rạp chiếu phim nào?"],["那是谁的书？","Nà shì shéi de shū?","Kia là sách của ai? (那 đứng một mình làm chủ ngữ)"]]]],
 w:["“Rạp chiếu phim đó” không nói ✗ 电影院那 mà nói 那个电影院.","Đừng dùng 个 cho mọi thứ: cửa hàng, rạp dùng 家; sách dùng 本."]})},
{h:"5. 和 ＋ người ＋ động từ: làm gì với ai",b:G({
 f:[["k","Chủ ngữ ＋ (thời gian) ＋ 和 ＋ người ＋ động từ","… + hé + … + V"],["p","Chủ ngữ ＋ 不和 ＋ người ＋ động từ","… + bù hé + … + V"],["h","Chủ ngữ ＋ 和谁 ＋ động từ？","… + hé shéi + V?"]],
 e:[["k",[["晚上和朋友们去外边唱歌。","Wǎnshang hé péngyoumen qù wàibian chàng gē.","Buổi tối đi hát ở ngoài với các bạn."],["我和孩子们、小狗玩。","Wǒ hé háizimen, xiǎo gǒu wán.","Chị chơi với các con và con chó nhỏ."]]],
    ["p",[["我不和他去。","Wǒ bù hé tā qù.","Mình không đi với anh ấy."]]],
    ["h",[["你和谁去唱歌？","Nǐ hé shéi qù chàng gē?","Bạn đi hát với ai?","我和朋友们去。","Wǒ hé péngyoumen qù."]]]],
 n:["Khen hát hay dùng 好听, không dùng 好看: 你唱歌很好听。"],
 w:["Theo tiếng Việt “chơi với các con” đặt ra cuối ✗ 我玩和孩子们.","Đúng: 和 + người đứng TRƯỚC động từ: 我和孩子们玩."]})}];

/* ---------- Bài 11 ---------- */
if(LD1[11])LD1[11].gp=[
{h:"1. 正反问: Câu hỏi chính phản",b:G({
 d:["Cấu trúc “× ＋ 不 / 没 ＋ ×”, “×” là động từ hoặc tính từ.","Động từ dùng 不 / 没; tính từ dùng 不."],
 f:[["h","Động từ ＋ 不 ＋ động từ？ · Tính từ ＋ 不 ＋ tính từ？","V + bu + V? · … + bu + …?"],["h","Động từ ＋ 没 ＋ động từ？ (việc đã xảy ra chưa)","V + méi + V?"],["k","Trả lời khẳng định: nhắc lại động từ / tính từ","去。 · 贵。"],["p","Trả lời phủ định: 不 / 没 ＋ động từ / tính từ","不去。 · 没去。 · 不贵。"]],
 e:[["h",[["它是不是在超市后边？","Tā shì bu shì zài chāoshì hòubian?","Nó có phải ở phía sau siêu thị không?"],["你去没去学校？","Nǐ qù méi qù xuéxiào?","Bạn có đến trường không?"],["这件衣服好看不好看？","Zhè jiàn yīfu hǎokàn bu hǎokàn?","Chiếc áo này có đẹp không?"]]],
    ["t",[["他去哪儿了？你知道不知道？","Tā qù nǎr le? Nǐ zhīdào bu zhīdào?","Anh ấy đi đâu rồi? Bạn có biết không?","我不知道。","Wǒ bù zhīdào."],["昨天你去没去书店？","Zuótiān nǐ qù méi qù shūdiàn?","Hôm qua bạn có đi hiệu sách không?","我没去。","Wǒ méi qù."],["这件衣服贵不贵？","Zhè jiàn yīfu guì bu guì?","Chiếc áo này có đắt không?","不贵。","Bú guì."]]]],
 n:["不 ở giữa đọc nhẹ."],
 w:["Thêm 吗 vào câu chính phản: ✗ 你去不去吗？","Thêm 很: ✗ 很忙不忙？ Câu đã có “A 不 A” thì không dùng 吗, không dùng 很."]})},
{h:"2. Phó từ chỉ thời gian 在 / 正在: đang",b:G({
 d:["在 / 正在 đứng trước động từ, biểu thị hành động đang diễn ra hoặc tình huống đang tiếp diễn."],
 f:[["k","(1) 在 / 正在 ＋ V","zài / zhèngzài + V"],["k","(2) 在 / 正在 ＋ V ＋ 呢","zài / zhèngzài + V + ne"],["k","(3) V ＋ 呢","V + ne"],["p","没（有）＋ V","méi (yǒu) + V"],["h","… 在做什么呢？ · … 在 ＋ V ＋ 吗？","… zài zuò shénme ne? · … zài + V + ma?"]],
 e:[["k",[["你还在读大学吗？","Nǐ hái zài dú dàxué ma?","Em vẫn đang học đại học à?"],["学生们在 / 正在上课呢。","Xuéshengmen zài / zhèngzài shàngkè ne.","Các học sinh đang học."],["我们读书呢。","Wǒmen dú shū ne.","Chúng tôi đang đọc sách."]]],
    ["p",[["我没买菜，买水果呢。","Wǒ méi mǎi cài, mǎi shuǐguǒ ne.","Tôi không mua rau, đang mua hoa quả."]]],
    ["t",[["你在做什么呢？","Nǐ zài zuò shénme ne?","Bạn đang làm gì thế?","我正在看电视。","Wǒ zhèngzài kàn diànshì."],["我去看电影，你去不去？","Wǒ qù kàn diànyǐng, nǐ qù bu qù?","Mình đi xem phim, bạn có đi không?","我在学习呢，不想去。","Wǒ zài xuéxí ne, bù xiǎng qù."],["你在买菜吗？","Nǐ zài mǎi cài ma?","Bạn đang mua rau à?","我没买菜，买水果呢。","Wǒ méi mǎi cài, mǎi shuǐguǒ ne."]]]],
 w:["Phân biệt hai chữ 在: 我在学校 (ở trường – sau 在 là nơi chốn) và 我在学习 (đang học – sau 在 là động từ).","Phủ định “đang” dùng 没, không dùng ✗ 不在看电视 (nghĩa thành “không có ở…”)."]})},
{h:"3. Động từ năng nguyện 要",b:G({
 d:["要 đặt trước động từ, biểu thị mong muốn hoặc dự định làm việc gì đó."],
 f:[["k","Chủ ngữ ＋ 要 ＋ động từ","… + yào + V"],["p","Chủ ngữ ＋ 不想 ＋ động từ","… + bù xiǎng + V"],["h","Chủ ngữ ＋ 要 ＋ động từ ＋ 吗？ · … 要做什么？","… + yào + V + ma? · … yào zuò shénme?"]],
 e:[["k",[["他今天要和小朋友玩。","Tā jīntiān yào hé xiǎopéngyǒu wán.","Hôm nay em ấy muốn chơi với các bạn nhỏ."],["妈妈要去超市。","Māma yào qù chāoshì.","Mẹ định đi siêu thị."],["白家月要在家里学中文。","Bái Jiāyuè yào zài jiā li xué Zhōngwén.","Bạch Gia Nguyệt định học tiếng Trung ở nhà."]]],
    ["p",[["我不想去超市。","Wǒ bù xiǎng qù chāoshì.","Mình không muốn đi siêu thị."]]],
    ["h",[["弟弟今天要做什么？","Dìdi jīntiān yào zuò shénme?","Hôm nay em trai định làm gì?","他要和小朋友玩。","Tā yào hé xiǎopéngyǒu wán."]]]],
 w:["Đặt 要 sau động từ: ✗ 我去要超市. 要 luôn đứng TRƯỚC động từ chính.","Từ chối nhẹ nhàng nói 我不想去。; ✗ 我不要去 nghe gay gắt."]})},
{h:"4. 什么时候: khi nào",b:G({
 f:[["h","Chủ ngữ ＋ 什么时候 ＋ động từ？","… + shénme shíhou + V?"],["t","Chủ ngữ ＋ thời gian ＋ động từ。","… + thời gian + V."],["p","还不知道。","Hái bù zhīdào."]],
 e:[["t",[["你什么时候能到饭店？","Nǐ shénme shíhou néng dào fàndiàn?","Khi nào em đến được nhà hàng?","还不知道，正在找呢。","Hái bù zhīdào, zhèngzài zhǎo ne."],["你什么时候去超市？","Nǐ shénme shíhou qù chāoshì?","Khi nào bạn đi siêu thị?","我下午去超市。","Wǒ xiàwǔ qù chāoshì."]]]],
 w:["Người Việt hay đặt “khi nào” ở cuối câu: ✗ 你到饭店什么时候？","Trong tiếng Trung, từ hỏi thời gian đứng TRƯỚC động từ."]})},
{h:"5. 还: vẫn, vẫn còn",b:G({
 f:[["k","还 ＋ 在 ＋ động từ · 还是 ＋ danh từ","hái zài + V · hái shì + …"],["p","还 ＋ 不 / 没 ＋ động từ","hái bù / hái méi + V"],["h","… 还 ＋ (在) ＋ động từ ＋ 吗 / 呢？","… hái (zài) + V + ma / ne?"]],
 e:[["k",[["没起床呢，还在睡觉。","Méi qǐchuáng ne, hái zài shuìjiào.","Chưa dậy ạ, em vẫn đang ngủ."],["我还是大学生。","Wǒ hái shì dàxuéshēng.","Em vẫn là sinh viên."]]],
    ["p",[["还不知道。","Hái bù zhīdào.","Vẫn chưa biết."]]],
    ["h",[["你还在读大学吗？","Nǐ hái zài dú dàxué ma?","Em vẫn đang học đại học à?"],["还睡呢？","Hái shuì ne?","Vẫn còn ngủ à?"]]]],
 w:["还 đứng trước 在 / 不 / 没: 还在读, 还不知道; không nói ✗ 在还读."]})},
{h:"6. 对 ＋ người ＋ 说: nói với ai",b:G({
 f:[["k","A ＋ 对 ＋ B ＋ 说 ……","A + duì + B + shuō …"],["p","A ＋ 没 ＋ 对 ＋ B ＋ 说","A + méi duì B shuō"],["h","A ＋ 对 ＋ B ＋ 说什么？","A + duì + B + shuō shénme?"]],
 e:[["k",[["我昨天问他，他对我说，他不去。","Wǒ zuótiān wèn tā, tā duì wǒ shuō, tā bú qù.","Hôm qua con hỏi em, em nói với con là em không đi."]]],
    ["p",[["他没对我说。","Tā méi duì wǒ shuō.","Anh ấy không nói với mình."]]],
    ["h",[["他对你说什么？","Tā duì nǐ shuō shénme?","Anh ấy nói gì với bạn?"]]]],
 w:["Tiếng Việt “nói với tôi” để “với tôi” ở sau; tiếng Trung 对我 đứng TRƯỚC 说: ✗ 他说对我.","问 + người thì không cần giới từ: 我问他 (không nói ✗ 我对他问)."]})}];

/* ---------- Bài 12 ---------- */
if(LD1[12])LD1[12].gp=[
{h:"1. Câu phi chủ vị (非主谓句)",b:G({
 d:["Câu không chia rõ chủ ngữ và vị ngữ, dùng nhiều trong khẩu ngữ."],
 f:[["k","Từ / cụm từ ＋ 了 / ！","… + le / !"],["p","没 ＋ động từ","méi + V"],["h","Từ / cụm từ ＋ 了吗？","… + le ma?"]],
 e:[["k",[["下雨了。","Xià yǔ le.","Mưa rồi."],["下雪了。","Xià xuě le.","Tuyết rơi rồi."],["上课了。","Shàngkè le.","Vào học rồi."],["真漂亮！","Zhēn piàoliang!","Đẹp thật!"]]],
    ["p",[["没下雨。","Méi xià yǔ.","Không mưa."]]],
    ["h",[["下雨了吗？","Xià yǔ le ma?","Mưa chưa?","下雨了。","Xià yǔ le."]]]],
 n:["Tiếng Việt cũng nói “Mưa rồi!”, “Đẹp quá!” mà không cần chủ ngữ, nên dễ dùng."],
 w:["Dịch theo kiểu tiếng Anh “It's raining” thành ✗ 它下雨了.","Nói về thời tiết chỉ cần 下雨了, hoặc thêm thời gian / nơi chốn: 昨天下雪了, 这里下雨了."]})},
{h:"2. Trợ từ ngữ khí 了 (1): có thay đổi, xuất hiện tình huống mới",b:G({
 d:["了 (1) đặt ở cuối câu hoặc chỗ ngắt quãng, cho biết tình hình đã thay đổi hoặc có tình huống mới (gần với “rồi”)."],
 f:[["k","Câu ＋ 了。","… + le."],["p","没 ＋ động từ (bỏ 了)","méi + V"],["h","Câu ＋ 了吗？","… + le ma?"]],
 e:[["k",[["下雨了。","Xià yǔ le.","Mưa rồi (lúc nãy chưa mưa)."],["十二点了，吃午饭吧。","Shí'èr diǎn le, chī wǔfàn ba.","12 giờ rồi, ăn trưa thôi."]]],
    ["p",[["我昨天没来公司。","Wǒ zuótiān méi lái gōngsī.","Hôm qua tôi không đến công ty."]]],
    ["t",[["弟弟起床了吗？","Dìdi qǐchuáng le ma?","Em trai dậy chưa?","没起床呢。","Méi qǐchuáng ne."],["你昨天没来公司，生病了？","Nǐ zuótiān méi lái gōngsī, shēngbìng le?","Hôm qua em không đến công ty, bị ốm à?","对，我昨天去医院看病了。","Duì, wǒ zuótiān qù yīyuàn kànbìng le."]]]],
 w:["Phủ định vẫn giữ 了: ✗ 我昨天没来公司了.","Trả lời “chưa dậy” bằng ✗ 不起床了 → đúng là 没起床呢."]})},
{h:"3. Cấu trúc 太……了！",b:G({
 d:["Dùng để cảm thán, mức độ rất cao (“… quá!”)."],
 f:[["k","太 ＋ tính từ ＋ 了！","tài + … + le!"],["p","不太 ＋ tính từ","bú tài + … (không … lắm)"],["h","Tính từ ＋ 吗？ · Tính từ ＋ 不 ＋ tính từ？","… ma? · … bu …?"]],
 e:[["k",[["太冷了！","Tài lěng le!","Lạnh quá!"],["这个杯子太小了。","Zhège bēizi tài xiǎo le.","Cái cốc này nhỏ quá."],["我们今天太高兴了！","Wǒmen jīntiān tài gāoxìng le!","Hôm nay chúng mình vui quá!"]]],
    ["p",[["今天不太冷。","Jīntiān bú tài lěng.","Hôm nay không lạnh lắm."]]],
    ["t",[["今天冷不冷？","Jīntiān lěng bu lěng?","Hôm nay có lạnh không?","太冷了！","Tài lěng le!"]]]],
 w:["Quên 了 ở cuối: ✗ 太冷！","Nói ✗ 很冷了 khi muốn cảm thán “lạnh quá”. Câu cảm thán dùng đủ cặp 太……了."]})},
{h:"4. 有点儿 ＋ tính từ · động từ ＋ 一点儿 ＋ danh từ (bổ sung)",b:G({
 d:["有点儿 đứng TRƯỚC tính từ, thường nói điều không như ý (hơi lạnh, hơi to).","一点儿 đứng SAU động từ, trước danh từ, chỉ số lượng ít."],
 f:[["k","有点儿 ＋ tính từ · động từ ＋ 一点儿 ＋ danh từ","yǒudiǎnr + … · … + yìdiǎnr + …"],["p","不 ＋ tính từ","bù + …"],["h","你觉得 ＋ tính từ ＋ 吗？ · 你觉得怎么样？","Nǐ juéde … ma? · Nǐ juéde zěnmeyàng?"]],
 e:[["k",[["雨有点儿大。","Yǔ yǒudiǎnr dà.","Mưa hơi to."],["吃一点儿药。","Chī yìdiǎnr yào.","Uống một ít thuốc."]]],
    ["p",[["我不冷。","Wǒ bù lěng.","Tôi không lạnh."]]],
    ["t",[["你觉得冷吗？","Nǐ juéde lěng ma?","Bạn thấy lạnh không?","有点儿冷。","Yǒudiǎnr lěng."]]]],
 w:["Dịch “lạnh một chút” thành ✗ 冷一点儿 / ✗ 一点儿冷 → nói 有点儿冷.","“Uống thuốc” là 吃药, không nói ✗ 喝药."]})},
{h:"5. 看看 và lời khuyên 喝热水 (Tiểu Ngữ giúp sức)",b:G({
 d:["看看 là hình thức lặp lại của 看, chỉ hành động diễn ra trong thời gian ngắn, nghe nhẹ nhàng.","Chữ 看 thứ hai đọc nhẹ."],
 f:[["c","Động từ một âm tiết lặp lại: 看 → 看看","kàn → kànkan"]],
 e:[["c",[["我看看。","Wǒ kànkan.","Để tôi xem."],["回家后再喝些热水。","Huí jiā hòu zài hē xiē rè shuǐ.","Về nhà rồi uống thêm ít nước ấm."]]]],
 n:["Người Trung Quốc thích uống nước ấm, cho rằng tốt cho sức khỏe.","Khi bị ốm, họ hay khuyên nhau 喝些热水."],
 w:["热水 ở đây là “nước ấm”, không phải nước sôi nóng bỏng."]})}];

/* ---------- Bài 14 ---------- */
if(LD1[14])LD1[14].gp=[
{h:"1. Cách nói hành động đã xảy ra: động từ ＋ 了 (trợ từ động thái 了 (2))",b:G({
 d:["了 (2) đứng sau động từ, biểu thị hành động đã xảy ra hoặc đã hoàn thành."],
 f:[["k","Chủ ngữ ＋ động từ ＋ 了 ＋ (số lượng) ＋ tân ngữ","… + V + le + …"],["p","Chủ ngữ ＋ 没 ＋ động từ ＋ tân ngữ (bỏ 了)","… + méi + V + …"],["h","… ＋ động từ ＋ 了 ＋ tân ngữ ＋ 吗？ · … động từ ＋ 没 ＋ động từ？","… V le … ma? · … V méi V?"]],
 e:[["k",[["我看了一个电影。","Wǒ kànle yí ge diànyǐng.","Mình đã xem một bộ phim."],["我买了一个新电脑。","Wǒ mǎile yí ge xīn diànnǎo.","Mình đã mua một cái máy tính mới."],["我今天有课，去学校上了课，还在那儿吃了午饭。","Wǒ jīntiān yǒu kè, qù xuéxiào shàngle kè, hái zài nàr chīle wǔfàn.","Hôm nay mình có tiết, đến trường học, còn ăn trưa ở đó."]]],
    ["p",[["我昨天没去商店买东西。","Wǒ zuótiān méi qù shāngdiàn mǎi dōngxi.","Hôm qua mình không đi cửa hàng mua đồ."],["没看见。","Méi kànjiàn.","Không nhìn thấy."]]],
    ["t",[["你们上火车后看见王老师了吗？","Nǐmen shàng huǒchē hòu kànjiàn Wáng lǎoshī le ma?","Lên tàu rồi các bạn có thấy cô Vương không?","没看见。","Méi kànjiàn."],["我昨天看了电影，没去超市。你呢？","Wǒ zuótiān kànle diànyǐng, méi qù chāoshì. Nǐ ne?","Hôm qua mình xem phim, không đi siêu thị. Còn bạn?","我昨天去了超市，没看电影。","Wǒ zuótiān qùle chāoshì, méi kàn diànyǐng."]]]],
 w:["Phủ định vẫn giữ 了: ✗ 我没看了.","是, 喜欢, 知道 không chỉ động tác nên không thêm 了 ngay sau: ✗ 我是了学生.","“Đã” trong tiếng Việt không phải lúc nào cũng dịch là 了; nói thói quen thì không dùng."]})},
{h:"2. Từ li hợp (1)",b:G({
 d:["Các từ như 上课, 下课, 上班, 下班, 说话, 读书, 睡觉, 看病, 生病 là cấu trúc động từ đặc biệt.","Hợp lại là từ; chen thành phần khác vào giữa thì thành cụm từ. Chỉ một số thành phần chen được vào giữa."],
 f:[["k","Động từ ＋ 了 / số lượng / định ngữ ＋ tân ngữ","睡了一觉 · 上了中文课 · 说了很多话"],["p","没 ＋ từ li hợp","méi shuìjiào · méi shàngkè"],["h","Từ li hợp ＋ 了吗？","shuìjiào le ma?"]],
 e:[["c",[["睡觉 → 睡了觉；睡了一觉","shuìjiào → shuìle jiào; shuìle yí jiào","ngủ → đã ngủ; đã ngủ một giấc"],["上课 → 上了课；上中文课","shàngkè → shàngle kè; shàng Zhōngwén kè","học → đã học; học tiết tiếng Trung"],["下班 → 下了班","xiàbān → xiàle bān","tan làm → đã tan làm"],["生病 → 生了病；生了大病","shēngbìng → shēngle bìng; shēngle dà bìng","ốm → đã ốm; ốm nặng"],["说话 → 说了话；说了很多话","shuōhuà → shuōle huà; shuōle hěn duō huà","nói chuyện → đã nói; nói rất nhiều"]],"Hợp → Tách"],
    ["p",[["我昨天没上课。","Wǒ zuótiān méi shàngkè.","Hôm qua mình không đi học."]]],
    ["h",[["你睡觉了吗？","Nǐ shuìjiào le ma?","Bạn ngủ chưa?","我睡了一觉。","Wǒ shuìle yí jiào."]]]],
 w:["Từ li hợp đã có tân ngữ bên trong, không thêm tân ngữ phía sau: ✗ 说话老师 → 和老师说话.","Người Việt hay viết ✗ 我睡觉了一觉, ✗ 生病了大病."]})},
{h:"3. Phó từ chỉ phạm vi 都",b:G({
 d:["都 biểu thị toàn bộ, tất cả. Đối tượng được bao quát đứng TRƯỚC 都.","Khi phủ định, từ phủ định đứng SAU 都."],
 f:[["k","Chủ ngữ (số nhiều) ＋ 都 ＋ động từ / tính từ","… + dōu + …"],["p","Chủ ngữ ＋ 都 ＋ 不 / 没 ＋ động từ","… + dōu bù / dōu méi + …"],["h","Chủ ngữ ＋ 都 ＋ động từ ＋ 吗？ · … 都 ＋ động từ ＋ 什么 / 哪些？","… dōu … ma? · … dōu … shénme / nǎxiē?"]],
 e:[["k",[["我们都会写了。","Wǒmen dōu huì xiě le.","Chúng em đều biết viết rồi."],["我和我的朋友们都去。","Wǒ hé wǒ de péngyoumen dōu qù.","Mình và các bạn của mình đều đi."],["上学后，他们都忙了。","Shàngxué hòu, tāmen dōu máng le.","Đi học rồi, các con đều bận cả."]]],
    ["p",[["同学们都没听见。","Tóngxuémen dōu méi tīngjiàn.","Các bạn đều không nghe thấy."]]],
    ["h",[["你们都会写哪些汉字了？","Nǐmen dōu huì xiě nǎxiē Hànzì le?","Các em đã biết viết những chữ Hán nào rồi?"],["你们都会写汉字了吗？","Nǐmen dōu huì xiě Hànzì le ma?","Các em đều biết viết chữ Hán rồi chứ?"]]]],
 w:["Dịch “Tất cả chúng tôi…” thành ✗ 都我们会写. 都 không đứng trước chủ ngữ.","Đi cùng 也 thì 也 trước: 我们也都去."]})},
{h:"4. Tiểu Ngữ giúp sức: 有些 / 有的 · 他们 / 她们 / 它们",b:G({
 d:["Trong bài này, 有些 cũng có thể nói là 有的.","他们: họ (nam, hoặc có cả nam cả nữ) · 她们: các chị ấy, các cô ấy (nhóm nữ) · 它们: chúng (vật, con vật).","Ba từ đọc giống nhau nhưng nghĩa khác nhau."],
 f:[["c","有些人 ＋ V，有些人 ＋ V（＝ 有的人……）","yǒuxiē rén …, yǒuxiē rén … (= yǒude rén …)"]],
 e:[["c",[["有些人在看书，有些人睡觉了。","Yǒuxiē rén zài kàn shū, yǒuxiē rén shuìjiào le.","Có người đọc sách, có người ngủ."],["我看了一本书，有的人在睡觉。","Wǒ kànle yì běn shū, yǒude rén zài shuìjiào.","Mình đọc một quyển sách, có người đang ngủ."]]]],
 w:["有些 / 有的 đứng ĐẦU câu, trước danh từ; không nói ✗ 人有些在看书.","Nhóm toàn nữ viết 她们; có cả nam và nữ dùng 他们."]})},
{h:"5. 请大家不要 ＋ V · 听 và 听见",b:G({
 d:["听 = nghe (hành động) · 听见 = nghe thấy (có kết quả)."],
 f:[["k","请 ＋ người ＋ động từ","qǐng + … + V"],["p","请 ＋ người ＋ 不要 ＋ động từ！ · 听不见 / 没听见","qǐng … búyào + V! · tīng bú jiàn / méi tīngjiàn"],["h","你听见了吗？","Nǐ tīngjiàn le ma?"]],
 e:[["k",[["请听老师的问题。","Qǐng tīng lǎoshī de wèntí.","Hãy nghe câu hỏi của cô."]]],
    ["p",[["请大家不要说话！","Qǐng dàjiā búyào shuōhuà!","Mọi người đừng nói chuyện!"],["老师，我听不见。","Lǎoshī, wǒ tīng bú jiàn.","Thưa cô, em không nghe thấy."],["他没听见老师说什么。","Tā méi tīngjiàn lǎoshī shuō shénme.","Bạn ấy không nghe thấy cô nói gì."]]],
    ["h",[["你听见了吗？","Nǐ tīngjiàn le ma?","Bạn nghe thấy chưa?","我没听见。","Wǒ méi tīngjiàn."]]]],
 w:["不要 đọc búyào.","Muốn lịch sự thêm 请 ở đầu; không nói ✗ 不要请说话."]})}];
