/* ===== HSK1 · Bài 1 ===== */
LD1[1]={t:"AI小语，你好！",tp:"AI Xiǎoyǔ, nǐ hǎo!",vi:"Xin chào AI Tiểu Ngữ!",
goals:["Nghe hiểu và dùng được ngôn ngữ lịch sự để chào hỏi, cảm ơn và tạm biệt.","Hiểu nghi thức giao tiếp của người Trung Quốc; nghe hiểu và dùng được đại từ kính trọng “您”."],
texts:[
{ctx:"Ngày đầu tiên đi học, Vương Nhất Phi chào hỏi trợ giảng AI Tiểu Ngữ trong văn phòng.",a:"1-1",l:[
["王一飞","AI小语，你好！","AI Xiǎoyǔ, nǐ hǎo!","Xin chào AI Tiểu Ngữ!"],
["小语","王老师，你好！","Wáng lǎoshī, nǐ hǎo!","Chào cô Vương!"]]},
{ctx:"Ngày đầu tiên đi học, các bạn học sinh học cách chào hỏi tại lớp.",a:"1-3",l:[
["王一飞","大家好！","Dàjiā hǎo!","Chào cả lớp!"],
["学生们","老师，您好！","Lǎoshī, nín hǎo!","Chào cô ạ!"],
["小语","你们好！","Nǐmen hǎo!","Chào các bạn!"],
["学生们","你好，小语！","Nǐ hǎo, Xiǎoyǔ!","Chào Tiểu Ngữ!"]]},
{ctx:"Ngày đầu tiên đi học, các bạn học sinh học cách cảm ơn và tạm biệt trong lớp.",a:"1-5",l:[
["学生们","谢谢！","Xièxie!","Cảm ơn bạn!"],
["小语","不客气！","Bú kèqi!","Đừng khách sáo!"],
["王一飞","同学们，再见！","Tóngxuémen, zàijiàn!","Tạm biệt các em!"],
["学生们","老师，再见！","Lǎoshī, zàijiàn!","Tạm biệt cô ạ!"]]}],
words:[["你好","nǐ hǎo","","xin chào, chào bạn",0],
["大家","dàjiā","đại từ","mọi người",1],["好","hǎo","tính từ","tốt, khỏe",1],["学生","xuéshēng","danh từ","học sinh, sinh viên",1],["们","men","hậu tố","đặt sau đại từ nhân xưng hoặc danh từ chỉ người để chỉ số nhiều",1],["老师","lǎoshī","danh từ","thầy giáo, cô giáo, giáo viên",1],["您","nín","đại từ","ngài, ông, bà… (ngôi thứ hai, trang trọng)",1],["你们","nǐmen","đại từ","các bạn, các anh, các chị… (ngôi thứ hai số nhiều)",1],
["谢谢","xièxie","động từ","cảm ơn",2],["不客气","bú kèqi","","đừng khách sáo, không cần khách khí",2],["同学","tóngxué","danh từ","bạn học",2],["再见","zàijiàn","động từ","tạm biệt",2],
["王老师","Wáng lǎoshī","danh từ riêng","cô Vương",0]],
rhyme:{a:"1-7",l:[["妈种麻，我放马。","Mā zhòng má, wǒ fàng mǎ.","Mẹ trồng cây gai, tôi thả ngựa."],["马吃麻，妈骂马。","Mǎ chī má, mā mà mǎ.","Ngựa ăn cây gai, mẹ mắng ngựa."]]},
gp:[
{h:"1. Chào hỏi: Đối tượng + 好",b:`<span class="fm">你 / 您 / 你们 / 大家 / 老师 ＋ 好！<small>nǐ / nín / nǐmen / dàjiā / lǎoshī ＋ hǎo!</small></span><ul><li>${Z("你好！","Nǐ hǎo!")} chào một người ngang hàng, bạn bè.</li><li>${Z("您好！","Nín hǎo!")} chào người lớn tuổi, thầy cô, khách hàng (kính trọng).</li><li>${Z("你们好！","Nǐmen hǎo!")} ${Z("大家好！","Dàjiā hǎo!")} chào nhiều người, chào cả lớp.</li><li>Thêm danh xưng phía trước hoặc phía sau: ${Z("王老师，你好！","Wáng lǎoshī, nǐ hǎo!")} ${Z("你好，小语！","Nǐ hǎo, Xiǎoyǔ!")}</li></ul><p class="warn">⚠️ Lỗi hay gặp: chào thầy cô bằng ${Z("你好","nǐ hǎo")} (nên nói ${Z("老师，您好！","Lǎoshī, nín hǎo!")}); nói ${Z("✗你好们","")} thay vì ${Z("你们好","nǐmen hǎo")}.</p>`},
{h:"2. Hậu tố 们 (men): chỉ số nhiều",b:`<span class="fm">Đại từ / danh từ chỉ người ＋ 们<small>+ men</small></span><p>${Z("你","nǐ")} → ${Z("你们","nǐmen")} · ${Z("学生","xuéshēng")} → ${Z("学生们","xuéshengmen")} · ${Z("同学","tóngxué")} → ${Z("同学们","tóngxuémen")}</p><p class="warn">⚠️ 们 chỉ dùng cho người, không dùng cho đồ vật, con vật. Khẩu ngữ hầu như không nói ${Z("您们","nínmen")}; muốn chào nhiều người lịch sự, dùng ${Z("大家好！","Dàjiā hǎo!")}</p>`},
{h:"3. Cảm ơn và đáp lại",b:`<span class="fm">A：谢谢！ B：不客气！<small>A: Xièxie! B: Bú kèqi!</small></span><p>Đọc <b>xièxie</b>: chữ thứ hai đọc nhẹ, ngắn. Người Việt hay đọc nặng cả hai thành “xiè xiè”.</p>`},
{h:"4. Tạm biệt",b:`<span class="fm">(Danh xưng，) 再见！<small>(…,) zàijiàn!</small></span><p>${Z("同学们，再见！","Tóngxuémen, zàijiàn!")} ${Z("老师，再见！","Lǎoshī, zàijiàn!")}</p><p>Tiếng Việt thêm “ạ” để lễ phép; tiếng Trung không có từ tương ứng, sự lịch sự thể hiện bằng danh xưng ${Z("老师","lǎoshī")} đặt trước.</p>`},
{h:"5. Phát âm: biến điệu",b:`<ul><li>Hai thanh 3 đứng liền, thanh 3 đầu đọc thành thanh 2: ${Z("你好","nǐ hǎo")} → đọc <b>ní hǎo</b>.</li><li>不 đứng trước thanh 4 đọc thành thanh 2: ${Z("不客气","bú kèqi")} (không đọc bù kèqi).</li></ul><p class="warn">⚠️ Phân biệt ${Z("您","nín")} (thanh 2, có âm cuối -n) với ${Z("你","nǐ")} (thanh 3). Đọc lẫn là mất sắc thái kính trọng.</p>`}],
gq:[
{q:"Gặp cô giáo ở trường, em chào:",o:["老师，您好！|Lǎoshī, nín hǎo!","老师，你们好！|Lǎoshī, nǐmen hǎo!","你好们，老师！|Nǐ hǎo men, lǎoshī!"],e:"Chào thầy cô dùng 您 để thể hiện kính trọng."},
{q:"Cô giáo bước vào lớp, chào cả lớp:",o:["大家好！|Dàjiā hǎo!","您好！|Nín hǎo!","谢谢！|Xièxie!"],e:"大家好 dùng để chào nhiều người."},
{q:"Bạn nói “谢谢！” (Xièxie!) với em, em đáp:",o:["不客气！|Bú kèqi!","再见！|Zàijiàn!","您好！|Nín hǎo!"],e:"Đáp lại lời cảm ơn: 不客气."},
{q:"Hết giờ, cô nói “同学们，再见！” (Tóngxuémen, zàijiàn!). Cả lớp đáp:",o:["老师，再见！|Lǎoshī, zàijiàn!","不客气！|Bú kèqi!","大家好！|Dàjiā hǎo!"],e:"Đáp lời tạm biệt: 老师，再见！"},
{q:"Chào hai người bạn cùng lúc:",o:["你们好！|Nǐmen hǎo!","您好！|Nín hǎo!","你好们！|Nǐ hǎo men!"],e:"你们 = các bạn; không nói 你好们."},
{q:"Từ dùng để xưng hô kính trọng với người lớn tuổi:",o:["您|nín","你|nǐ","你们|nǐmen"],e:"您 nín là đại từ ngôi thứ hai trang trọng."},
{q:"“同学们” (tóngxuémen) nghĩa là:",o:["các bạn học","một bạn học","thầy giáo"],e:"同学 + 们 → số nhiều."},
{q:"Khi đọc liền, “你好” được đọc là:",o:["ní hǎo","nǐ hǎo (giữ hai thanh 3)","nì hǎo"],e:"Hai thanh 3 liền nhau: thanh 3 đầu đọc thành thanh 2."},
{q:"“不客气” đọc đúng là:",o:["bú kèqi","bù kèqi","bū kèqi"],e:"不 trước thanh 4 đọc thành bú."}],
dt:[["AI小语，你好！","AI Xiǎoyǔ, nǐ hǎo!"],["王老师，你好！","Wáng lǎoshī, nǐ hǎo!"],["大家好！","Dàjiā hǎo!"],["老师，您好！","Lǎoshī, nín hǎo!"],["你们好！","Nǐmen hǎo!"],["你好，小语！","Nǐ hǎo, Xiǎoyǔ!"],["谢谢！","Xièxie!"],["不客气！","Bú kèqi!"],["同学们，再见！","Tóngxuémen, zàijiàn!"],["老师，再见！","Lǎoshī, zàijiàn!"]],
tsort:[
{t:["老师","，","您","好","！"],ok:["老师，您好！"],p:"Lǎoshī, nín hǎo!",e:"Chào thầy cô: danh xưng đặt trước, dùng 您 để kính trọng."},
{t:["你","们","好","！"],ok:["你们好！"],p:"Nǐmen hǎo!",e:"们 đi liền sau 你, không nói 你好们."},
{t:["王","老师","，","你","好","！"],ok:["王老师，你好！"],p:"Wáng lǎoshī, nǐ hǎo!",e:"Họ đứng trước 老师: 王老师 (không nói 老师王)."},
{t:["同学","们","，","再见","！"],ok:["同学们，再见！"],p:"Tóngxuémen, zàijiàn!",e:"同学们 = các bạn học; 再见 = tạm biệt."},
{t:["你","好","，","小语","！"],ok:["你好，小语！"],p:"Nǐ hǎo, Xiǎoyǔ!",e:"Câu trong bài khóa 2: lời chào đứng trước, tên người đứng sau."}],
tlis:[
{a:"谢谢！",o:["不客气！|Bú kèqi!","再见！|Zàijiàn!","你们好！|Nǐmen hǎo!"]},
{a:"同学们，再见！",o:["老师，再见！|Lǎoshī, zàijiàn!","不客气！|Bú kèqi!","你好！|Nǐ hǎo!"]},
{a:"大家好！",o:["老师，您好！|Lǎoshī, nín hǎo!","谢谢！|Xièxie!","再见！|Zàijiàn!"]},
{a:"AI小语，你好！",o:["王老师，你好！|Wáng lǎoshī, nǐ hǎo!","不客气！|Bú kèqi!","同学们，再见！|Tóngxuémen, zàijiàn!"]},
{a:"老师，您好！",o:["你们好！|Nǐmen hǎo!","不客气！|Bú kèqi!","老师，再见！|Lǎoshī, zàijiàn!"]}]};


/* Luyện nói theo tình huống: w=người nói, vi=mục đích, h=gợi ý [chữ,pinyin], r=[câu mẫu, pinyin, nghĩa] */
LD1[1].sit=[
{title:"Tình huống 1 · Chào trợ giảng",ctx:"Ngày đầu đi học, cô Vương Nhất Phi gặp trợ giảng AI Tiểu Ngữ trong văn phòng.",turns:[
{w:"王一飞",vi:"Chào AI Tiểu Ngữ.",h:[["AI小语","AI Xiǎoyǔ"],["你好","nǐ hǎo"]],r:["AI小语，你好！","AI Xiǎoyǔ, nǐ hǎo!","Xin chào AI Tiểu Ngữ!"]},
{w:"小语",vi:"Chào lại cô Vương (họ + 老师).",h:[["王","Wáng"],["老师","lǎoshī"],["你好","nǐ hǎo"]],r:["王老师，你好！","Wáng lǎoshī, nǐ hǎo!","Chào cô Vương!"]}]},
{title:"Tình huống 2 · Chào hỏi trong lớp",ctx:"Cô Vương bước vào lớp, chào học sinh; Tiểu Ngữ cũng chào các bạn.",turns:[
{w:"王一飞",vi:"Chào cả lớp.",h:[["大家","dàjiā"],["好","hǎo"]],r:["大家好！","Dàjiā hǎo!","Chào cả lớp!"]},
{w:"学生们",vi:"Chào cô giáo một cách kính trọng (dùng 您).",h:[["老师","lǎoshī"],["您","nín"],["好","hǎo"]],r:["老师，您好！","Lǎoshī, nín hǎo!","Chào cô ạ!"]},
{w:"小语",vi:"Chào các bạn học sinh (số nhiều).",h:[["你们","nǐmen"],["好","hǎo"]],r:["你们好！","Nǐmen hǎo!","Chào các bạn!"]},
{w:"学生们",vi:"Chào lại Tiểu Ngữ.",h:[["你好","nǐ hǎo"],["小语","Xiǎoyǔ"]],r:["你好，小语！","Nǐ hǎo, Xiǎoyǔ!","Chào Tiểu Ngữ!"]}]},
{title:"Tình huống 3 · Cảm ơn và tạm biệt",ctx:"Cuối buổi học, học sinh cảm ơn Tiểu Ngữ, cô Vương chào tạm biệt cả lớp.",turns:[
{w:"学生们",vi:"Cảm ơn Tiểu Ngữ.",h:[["谢谢","xièxie"]],r:["谢谢！","Xièxie!","Cảm ơn bạn!"]},
{w:"小语",vi:"Đáp lại lời cảm ơn.",h:[["不","bú"],["客气","kèqi"]],r:["不客气！","Bú kèqi!","Đừng khách sáo!"]},
{w:"王一飞",vi:"Chào tạm biệt các em học sinh.",h:[["同学们","tóngxuémen"],["再见","zàijiàn"]],r:["同学们，再见！","Tóngxuémen, zàijiàn!","Tạm biệt các em!"]},
{w:"学生们",vi:"Chào tạm biệt cô giáo.",h:[["老师","lǎoshī"],["再见","zàijiàn"]],r:["老师，再见！","Lǎoshī, zàijiàn!","Tạm biệt cô ạ!"]}]},
{title:"Tình huống 4 · Vận dụng: lớp tiếng Trung buổi tối",ctx:"Bạn đi học lớp tiếng Trung buổi tối ở công ty. Gặp cô Vương ở cửa lớp, giúp bạn học, rồi chào tạm biệt khi hết giờ.",turns:[
{w:"我",vi:"Gặp cô Vương ở cửa lớp, chào cô một cách kính trọng.",h:[["王老师","Wáng lǎoshī"],["您","nín"],["好","hǎo"]],r:["王老师，您好！","Wáng lǎoshī, nín hǎo!","Em chào cô Vương ạ!"]},
{w:"王老师",vi:"Chào lại bạn và nhóm bạn đi cùng (số nhiều).",h:[["你们","nǐmen"],["好","hǎo"]],r:["你们好！","Nǐmen hǎo!","Chào các em!"]},
{w:"同学",vi:"Bạn đưa sách cho bạn học, bạn ấy cảm ơn.",h:[["谢谢","xièxie"]],r:["谢谢！","Xièxie!","Cảm ơn nhé!"]},
{w:"我",vi:"Đáp lại lời cảm ơn.",h:[["不客气","bú kèqi"]],r:["不客气！","Bú kèqi!","Không có gì!"]},
{w:"我",vi:"Hết giờ, chào tạm biệt cô Vương.",h:[["王老师","Wáng lǎoshī"],["再见","zàijiàn"]],r:["王老师，再见！","Wáng lǎoshī, zàijiàn!","Em chào cô Vương ạ!"]},
{w:"王老师",vi:"Chào tạm biệt cả lớp (gọi các bạn học).",h:[["同学们","tóngxuémen"],["再见","zàijiàn"]],r:["同学们，再见！","Tóngxuémen, zàijiàn!","Tạm biệt các em!"]}]}];
Object.assign(SPN,{"我":["wǒ","Bạn"],"王老师":["Wáng lǎoshī","Cô Vương"],"同学":["tóngxué","Bạn học"]});
/* Bài tập Ngữ pháp · Mẫu câu (3 dạng) */
GXD["1-1"]={so:[
{t:["老师|lǎoshī","您|nín","好|hǎo"],ok:["老师您好","您好老师"],f:"老师，您好！",p:"Lǎoshī, nín hǎo!",e:"Chào thầy cô: danh xưng + 您好 (dùng 您 để kính trọng)."},
{t:["你|nǐ","们|men","好|hǎo"],ok:["你们好"],f:"你们好！",p:"Nǐmen hǎo!",e:"们 đi liền sau 你: 你们. Không nói 你好们."},
{t:["王|Wáng","老师|lǎoshī","你|nǐ","好|hǎo"],ok:["王老师你好","你好王老师"],f:"王老师，你好！",p:"Wáng lǎoshī, nǐ hǎo!",e:"Họ đứng trước 老师: 王老师 (không nói 老师王)."},
{t:["AI|AI","小语|Xiǎoyǔ","你|nǐ","好|hǎo"],ok:["ai小语你好","你好ai小语"],f:"AI小语，你好！",p:"AI Xiǎoyǔ, nǐ hǎo!",e:"Tên người + 你好, hoặc 你好 + tên người."},
{t:["同学|tóngxué","们|men","再见|zàijiàn"],ok:["同学们再见","再见同学们"],f:"同学们，再见！",p:"Tóngxuémen, zàijiàn!",e:"们 đi liền sau 同学: 同学们 = các bạn học."}],
tr:[
{vi:"Chào cô ạ! (học sinh chào cô giáo, thể hiện sự kính trọng)",a:["老师您好","您好老师"],r:["老师，您好！","Lǎoshī, nín hǎo!"]},
{vi:"Chào các bạn!",a:["你们好"],r:["你们好！","Nǐmen hǎo!"]},
{vi:"Chào cả lớp! (cô giáo chào mọi người)",a:["大家好","同学们好"],r:["大家好！","Dàjiā hǎo!"]},
{vi:"Đừng khách sáo! (đáp lại lời cảm ơn)",a:["不客气"],r:["不客气！","Bú kèqi!"]},
{vi:"Tạm biệt các em! (cô giáo nói với học sinh)",a:["同学们再见","再见同学们"],r:["同学们，再见！","Tóngxuémen, zàijiàn!"]}],
pc:[
{img:null,ph:"Tranh gợi ý: học sinh gặp cô giáo ở cửa lớp",req:"Em gặp cô giáo ở cửa lớp buổi sáng. Hãy chào cô sao cho lễ phép.",kw:[{l:"您 (kính trọng)",m:[["您","nin"]]}],r:[["老师，您好！","Lǎoshī, nín hǎo!","Em chào cô ạ!"],["王老师，您好！","Wáng lǎoshī, nín hǎo!","Em chào cô Vương ạ!"]]},
{img:null,ph:"Tranh gợi ý: hết giờ học, cô giáo vẫy tay chào cả lớp",req:"Hết giờ học, cô giáo nói “同学们，再见！”. Em đáp lại lời chào của cô.",kw:[{l:"再见",m:[["再见","zaijian"]]},{l:"老师",m:[["老师","laoshi"]]}],r:[["老师，再见！","Lǎoshī, zàijiàn!","Em chào cô ạ! (tạm biệt)"]]}]};
