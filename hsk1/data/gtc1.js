/* ===== Giáo trình chuẩn HSK 1 (标准教程 HSK 1, bản cũ) – trang ôn tập riêng ở thư mục hsk1/ =====
   Nội dung lấy từ PDF sách: Bài 1 trang 14–19, Bài 2 trang 20–25, Bài 3 trang 26–32.
   Cấu trúc dữ liệu giống HSK1 3.0 (LD1[N], GXD["1-N"]) để dùng chung js/app.js của trang chính. ===== */
const LT1=["你好！|Chào anh!","谢谢你！|Cảm ơn anh!","你叫什么名字？|Cô tên gì?","她是我的汉语老师|Cô ấy là cô giáo dạy tiếng Trung Quốc của tôi","她女儿今年二十岁|Con gái cô ấy năm nay 20 tuổi","我会说汉语|Tôi biết nói tiếng Trung Quốc","今天几号？|Hôm nay là ngày mấy?","我想喝茶|Tôi muốn uống trà","你儿子在哪儿工作？|Con trai anh làm việc ở đâu?","我能坐这儿吗？|Tôi có thể ngồi ở đây được không?","现在几点？|Bây giờ là mấy giờ?","明天天气怎么样？|Thời tiết ngày mai thế nào?","他在学做中国菜呢|Anh ấy đang học nấu món ăn Trung Quốc","她买了不少衣服|Cô ấy đã mua không ít quần áo","我是坐飞机来的|Tôi đến bằng máy bay"];
const AUD={};
const SPN={"A":["A","Người A"],"B":["B","Người B"],"老师":["lǎoshī","Cô giáo"],"我":["wǒ","Em"],"同学":["tóngxué","Bạn học"],"李月":["Lǐ Yuè","Lý Nguyệt"],"阮明":["Ruǎn Míng","Nguyễn Minh"]};
const LD1={};
const W1=(t)=>`<p class="warn">⚠️ ${t}</p>`;

/* ---------- Bài 1 · 你好！ ---------- */
LD1[1]={t:"你好！",tp:"Nǐ hǎo!",vi:"Chào anh!",
gpNote:"Bài 1 trong sách chưa có mục ngữ pháp. Phần này gồm mẫu câu chào hỏi, xin lỗi, kiến thức phát âm của bài (thanh điệu, âm tiết, biến điệu 3 + 3) và mẫu câu dùng trong lớp, kèm lỗi người Việt hay mắc.",
goals:["Chào hỏi được bằng 你好、您好、你们好; xin lỗi và đáp lại bằng 对不起、没关系.","Đọc đúng bốn thanh điệu và biến điệu khi hai thanh 3 đi liền nhau (你好 → ní hǎo).","Nhận biết 5 nét cơ bản (横、竖、撇、点、捺) và các chữ 一、二、三、十、八、六."],
texts:[
{ctx:"Hai người gặp nhau và chào hỏi.",a:"c1-1",l:[
["A","你好！","Nǐ hǎo!","Chào anh!"],
["B","你好！","Nǐ hǎo!","Chào anh!"]]},
{ctx:"Hai bạn trẻ gặp một người lớn tuổi và chào hỏi lịch sự.",a:"c1-2",l:[
["A","您好！","Nín hǎo!","Chào ông!"],
["B","你们好！","Nǐmen hǎo!","Chào anh chị!"]]},
{ctx:"Một bạn nhỏ làm phiền người khác và xin lỗi.",a:"c1-3",l:[
["A","对不起！","Duìbuqǐ!","Xin lỗi!"],
["B","没关系！","Méi guānxi!","Không sao đâu!"]]}],
words:[
["你","nǐ","đại từ","(số ít) anh, chị, bạn…",0],["好","hǎo","tính từ","khỏe, tốt",0],
["您","nín","đại từ","(lịch sự) ông, bà, ngài…",1],["你们","nǐmen","đại từ","(số nhiều) các anh, các chị, các bạn…",1],
["对不起","duìbuqǐ","động từ","xin lỗi",2],["没关系","méi guānxi","","không sao đâu, không có vấn đề gì đâu",2]],
gp:[
{h:"1. Chào hỏi: 你好 · 您好 · 你们好",b:`<span class="fm">你 / 您 / 你们 ＋ 好！<small>nǐ / nín / nǐmen ＋ hǎo!</small></span><ul><li>${Z("你好！","Nǐ hǎo!")} chào một người ngang hàng, bạn bè.</li><li>${Z("您好！","Nín hǎo!")} chào người lớn tuổi, người cần tôn trọng (lịch sự).</li><li>${Z("你们好！","Nǐmen hǎo!")} chào hai người trở lên.</li></ul>`+W1(`Lỗi hay gặp: chào ông bà, thầy cô bằng ${Z("你好","nǐ hǎo")} (nên dùng ${Z("您好","nín hǎo")}); nói ✗ 你好们 thay vì ${Z("你们好","nǐmen hǎo")}.`)},
{h:"2. Xin lỗi và đáp lại: 对不起 — 没关系",b:`<span class="fm">A：对不起！ — B：没关系！<small>Duìbuqǐ! — Méi guānxi!</small></span><p>${Z("对不起","duìbuqǐ")} dùng khi làm phiền, làm sai; người kia đáp ${Z("没关系","méi guānxi")} (không sao đâu).</p>`+W1(`Lỗi hay gặp: đọc 对不起 thành “tuây bu chi”. <b>d</b> không bật hơi (gần “t” nhẹ của tiếng Việt), <b>q</b> bật hơi mạnh; 没 đọc <b>méi</b> (thanh 2), 关 đọc <b>guān</b>.`)},
{h:"3. Bốn thanh điệu: mā · má · mǎ · mà",b:`<span class="fm">Thanh 1 (55) · Thanh 2 (35) · Thanh 3 (214) · Thanh 4 (51)<small>ā · á · ǎ · à</small></span><ul><li>${Z("妈","mā")} mẹ · ${Z("麻","má")} cây gai · ${Z("马","mǎ")} con ngựa · ${Z("骂","mà")} mắng</li></ul><p>Thanh điệu phân biệt nghĩa của từ: cùng “ma” nhưng đổi thanh là đổi nghĩa.</p>`+W1(`Người Việt hay đọc thanh 1 thấp như thanh ngang tiếng Việt (cần giữ <b>cao và đều</b>); thanh 3 đọc như dấu hỏi rồi lên quá cao; thanh 4 đọc như dấu nặng bị cụt. Thanh 4 phải <b>rơi mạnh từ cao xuống thấp</b>.`)},
{h:"4. Âm tiết = thanh mẫu + vận mẫu + thanh điệu",b:`<span class="fm">māo = m + ao + ˉ<small>thanh mẫu + vận mẫu + thanh điệu</small></span><p>Một chữ Hán thường là một âm tiết. Âm tiết có thể không có thanh mẫu nhưng bắt buộc có vận mẫu và thanh điệu: ${Z("鱼","yú")} (cá), ${Z("二","èr")} (hai).</p><p>💡 i, ü, u đứng một mình thì viết: i → <b>yi</b> (${Z("一","yī")}), ü → <b>yu</b> (bỏ hai chấm, ${Z("鱼","yú")}), u → <b>wu</b> (${Z("五","wǔ")}).</p>`},
{h:"5. Biến điệu: hai thanh 3 đi liền nhau",b:`<span class="fm">Thanh 3 ＋ Thanh 3 → Thanh 2 ＋ Thanh 3<small>nǐ + hǎo → ní hǎo</small></span><ul><li>${Z("你好","nǐ hǎo")} đọc là <b>ní hǎo</b></li><li>${Z("可以","kěyǐ")} đọc là <b>kéyǐ</b></li><li>${Z("辅导","fǔdǎo")} đọc là <b>fúdǎo</b></li></ul>`+W1(`Khi viết phiên âm vẫn ghi thanh gốc (nǐ hǎo), chỉ đổi khi đọc. Học viên hay viết nhầm thành ✗ ní hǎo.`)},
{h:"6. Mẫu câu thường dùng trong lớp (课堂用语)",b:`<ul><li>${Z("上课！","Shàng kè!")} Vào học đi!</li><li>${Z("下课！","Xià kè!")} Đã hết giờ học rồi!</li><li>${Z("现在休息！","Xiànzài xiūxi!")} Nghỉ giải lao nhé!</li><li>${Z("看黑板！","Kàn hēibǎn!")} Hãy nhìn lên bảng!</li><li>${Z("跟我读！","Gēn wǒ dú!")} Hãy đọc theo tôi!</li></ul><p>💡 Chỉ cần nghe hiểu và làm theo, chưa cần viết.</p>`}],
gq:[
{q:"Gặp một bạn cùng tuổi, em chào:",o:["你好！|Nǐ hǎo!","你们好！|Nǐmen hǎo!","没关系！|Méi guānxi!"],e:"Chào một người ngang hàng: 你好."},
{q:"Gặp ông bà hàng xóm, em chào lịch sự:",o:["您好！|Nín hǎo!","你好们！|Nǐ hǎo men!","对不起！|Duìbuqǐ!"],e:"您 là cách gọi lịch sự với người lớn tuổi."},
{q:"Chào hai người bạn cùng lúc:",o:["你们好！|Nǐmen hǎo!","你好们！|Nǐ hǎo men!","您好！|Nín hǎo!"],e:"你们 = các bạn; không nói 你好们."},
{q:"Em lỡ va vào một người, em nói:",o:["对不起！|Duìbuqǐ!","没关系！|Méi guānxi!","你好！|Nǐ hǎo!"],e:"Xin lỗi: 对不起."},
{q:"Bạn nói “对不起！” với em, em đáp:",o:["没关系！|Méi guānxi!","对不起！|Duìbuqǐ!","您好！|Nín hǎo!"],e:"Đáp lời xin lỗi: 没关系."},
{q:"Khi đọc liền, “你好” được đọc là:",o:["ní hǎo","nǐ hǎo (giữ hai thanh 3)","nì hǎo"],e:"Hai thanh 3 liền nhau: thanh 3 đầu đọc thành thanh 2."},
{q:"Chữ “妈” (mẹ) đọc là:",o:["mā","má","mà"],e:"妈 mā thanh 1; 麻 má cây gai; 骂 mà mắng."},
{q:"Cô giáo nói “跟我读！”, em cần:",o:["đọc theo cô","nhìn lên bảng","nghỉ giải lao"],e:"跟我读 = Hãy đọc theo tôi."}],
dt:[["你好！","Nǐ hǎo!"],["您好！","Nín hǎo!"],["你们好！","Nǐmen hǎo!"],["对不起！","Duìbuqǐ!"],["没关系！","Méi guānxi!"],["一","yī"],["二","èr"],["三","sān"],["十","shí"],["八","bā"]],
tsort:[
{t:["你","们","好","！"],ok:["你们好！"],p:"Nǐmen hǎo!",e:"们 đi liền sau 你, không nói 你好们."},
{t:["您","好","！"],ok:["您好！"],p:"Nín hǎo!",e:"您 + 好: chào lịch sự."},
{t:["对","不","起","！"],ok:["对不起！"],p:"Duìbuqǐ!",e:"对不起 = xin lỗi."},
{t:["没","关","系","！"],ok:["没关系！"],p:"Méi guānxi!",e:"没关系 = không sao đâu."},
{t:["你","好","！"],ok:["你好！"],p:"Nǐ hǎo!",e:"Đọc liền: ní hǎo."}],
tlis:[
{a:"你好！",o:["你好！|Nǐ hǎo!","没关系！|Méi guānxi!","对不起！|Duìbuqǐ!"]},
{a:"对不起！",o:["没关系！|Méi guānxi!","你们好！|Nǐmen hǎo!","对不起！|Duìbuqǐ!"]},
{a:"您好！",o:["你们好！|Nǐmen hǎo!","没关系！|Méi guānxi!","对不起！|Duìbuqǐ!"]},
{a:"你们好！",qz:"Người nói đang chào mấy người?",qp:"",o:["hai người trở lên","một người","không chào ai"]},
{a:"没关系！",qz:"Người nói muốn nói gì?",qp:"",o:["Không sao đâu!","Xin lỗi!","Chào ông!"]}],
sit:[
{title:"Tình huống 1 · Chào bạn",ctx:"Hai người gặp nhau và chào hỏi.",turns:[
{w:"A",vi:"Chào bạn.",h:[["你","nǐ"],["好","hǎo"]],r:["你好！","Nǐ hǎo!","Chào bạn!"]},
{w:"B",vi:"Chào lại.",h:[["你","nǐ"],["好","hǎo"]],r:["你好！","Nǐ hǎo!","Chào bạn!"]}]},
{title:"Tình huống 2 · Chào người lớn tuổi",ctx:"Hai bạn trẻ gặp một ông cụ.",turns:[
{w:"A",vi:"Chào ông một cách lịch sự.",h:[["您","nín"],["好","hǎo"]],r:["您好！","Nín hǎo!","Chào ông!"]},
{w:"B",vi:"Ông chào lại hai bạn trẻ.",h:[["你们","nǐmen"],["好","hǎo"]],r:["你们好！","Nǐmen hǎo!","Chào các cháu!"]}]},
{title:"Tình huống 3 · Xin lỗi",ctx:"Em lỡ làm đổ nước lên bàn của bạn.",turns:[
{w:"A",vi:"Xin lỗi bạn.",h:[["对不起","duìbuqǐ"]],r:["对不起！","Duìbuqǐ!","Xin lỗi!"]},
{w:"B",vi:"Đáp: không sao đâu.",h:[["没关系","méi guānxi"]],r:["没关系！","Méi guānxi!","Không sao đâu!"]}]},
{title:"Tình huống 4 · Vận dụng: giờ học tiếng Trung",ctx:"Cô giáo vào lớp, cả lớp chào cô, sau đó cô dùng các câu lệnh trong lớp.",turns:[
{w:"我",vi:"Chào cô giáo một cách lịch sự.",h:[["您","nín"],["好","hǎo"]],r:["您好！","Nín hǎo!","Em chào cô ạ!"]},
{w:"老师",vi:"Cô chào cả lớp.",h:[["你们","nǐmen"],["好","hǎo"]],r:["你们好！","Nǐmen hǎo!","Chào các em!"]},
{w:"老师",vi:"Cô bảo cả lớp nhìn lên bảng.",h:[["看","kàn"],["黑板","hēibǎn"]],r:["看黑板！","Kàn hēibǎn!","Hãy nhìn lên bảng!"]},
{w:"老师",vi:"Cô bảo cả lớp đọc theo cô.",h:[["跟","gēn"],["我","wǒ"],["读","dú"]],r:["跟我读！","Gēn wǒ dú!","Hãy đọc theo cô!"]},
{w:"我",vi:"Em đến muộn, xin lỗi cô.",h:[["对不起","duìbuqǐ"]],r:["对不起！","Duìbuqǐ!","Em xin lỗi ạ!"]},
{w:"老师",vi:"Cô đáp: không sao.",h:[["没关系","méi guānxi"]],r:["没关系！","Méi guānxi!","Không sao đâu!"]},
{w:"老师",vi:"Cô cho cả lớp nghỉ giải lao.",h:[["现在","xiànzài"],["休息","xiūxi"]],r:["现在休息！","Xiànzài xiūxi!","Nghỉ giải lao nhé!"]}]}]};
GXD["1-1"]={so:[
{t:["你|nǐ","们|men","好|hǎo"],ok:["你们好"],f:"你们好！",p:"Nǐmen hǎo!",e:"们 đi liền sau 你: 你们."},
{t:["对|duì","不|bu","起|qǐ"],ok:["对不起"],f:"对不起！",p:"Duìbuqǐ!",e:"对不起 = xin lỗi."},
{t:["没|méi","关|guān","系|xi"],ok:["没关系"],f:"没关系！",p:"Méi guānxi!",e:"没关系 = không sao đâu."},
{t:["跟|gēn","我|wǒ","读|dú"],ok:["跟我读"],f:"跟我读！",p:"Gēn wǒ dú!",e:"Câu lệnh trong lớp: đọc theo tôi."}],
tr:[
{vi:"Chào ông! (lịch sự)",a:["您好"],r:["您好！","Nín hǎo!"]},
{vi:"Chào các bạn!",a:["你们好"],r:["你们好！","Nǐmen hǎo!"]},
{vi:"Xin lỗi!",a:["对不起"],r:["对不起！","Duìbuqǐ!"]},
{vi:"Không sao đâu!",a:["没关系"],r:["没关系！","Méi guānxi!"]}],
pc:[
{img:null,ph:"Tranh gợi ý: hai bạn trẻ gặp một ông cụ ở cổng công viên",req:"Em và bạn gặp ông hàng xóm. Viết câu em chào ông và câu ông chào lại hai bạn.",kw:[{l:"您好",m:[["您好","ninhao"]]},{l:"你们好",m:[["你们好","nimenhao"]]}],r:[["您好！——你们好！","Nín hǎo! — Nǐmen hǎo!","Cháu chào ông! — Chào các cháu!"]]},
{img:null,ph:"Tranh gợi ý: một bạn giẫm vào chân bạn khác",req:"Em lỡ giẫm vào chân bạn. Viết câu em xin lỗi và câu bạn đáp lại.",kw:[{l:"对不起",m:[["对不起","duibuqi"]]},{l:"没关系",m:[["没关系","meiguanxi"]]}],r:[["对不起！——没关系！","Duìbuqǐ! — Méi guānxi!","Xin lỗi! — Không sao đâu!"]]}]};

/* ---------- Bài 2 · 谢谢你！ ---------- */
LD1[2]={t:"谢谢你！",tp:"Xièxie nǐ!",vi:"Cảm ơn anh!",
gpNote:"Bài 2 trong sách chưa có mục ngữ pháp. Phần này gồm mẫu câu cảm ơn, tạm biệt, kiến thức phát âm của bài (thanh nhẹ, cách ghi dấu thanh, viết giản lược) và mẫu câu dùng trong lớp, kèm lỗi người Việt hay mắc.",
goals:["Cảm ơn và đáp lại lời cảm ơn (谢谢 — 不谢 / 不客气); chào tạm biệt bằng 再见.","Đọc đúng thanh nhẹ (谢谢 xièxie, 妈妈 māma), biết ghi dấu thanh và cách viết giản lược iu, ui, un.","Nhận biết nét 横折、竖折、竖钩 và các chữ 口、见、山、小、不."],
texts:[
{ctx:"Một người giúp bạn xếp hành lý lên xe.",a:"c2-1",l:[
["A","谢谢！","Xièxie!","Cảm ơn!"],
["B","不谢！","Bú xiè!","Không cần cảm ơn đâu!"]]},
{ctx:"Cô hộ lý mang đồ ăn đến cho bà cụ.",a:"c2-2",l:[
["A","谢谢你！","Xièxie nǐ!","Cảm ơn cô!"],
["B","不客气！","Bú kèqi!","Đừng khách sáo!"]]},
{ctx:"Bạn nhỏ ngồi trong xe vẫy tay chào tạm biệt.",a:"c2-3",l:[
["A","再见！","Zàijiàn!","Tạm biệt!"],
["B","再见！","Zàijiàn!","Tạm biệt!"]]}],
words:[
["谢谢","xièxie","động từ","cảm ơn",0],["不","bù","phó từ","không cần, không, đừng",0],
["不客气","bú kèqi","","đừng khách sáo",1],
["再见","zàijiàn","động từ","tạm biệt",2]],
gp:[
{h:"1. Cảm ơn và đáp lại",b:`<span class="fm">谢谢！/ 谢谢你！ — 不谢！/ 不客气！<small>Xièxie! / Xièxie nǐ! — Bú xiè! / Bú kèqi!</small></span><ul><li>${Z("谢谢！","Xièxie!")} → ${Z("不谢！","Bú xiè!")} Không cần cảm ơn đâu!</li><li>${Z("谢谢你！","Xièxie nǐ!")} → ${Z("不客气！","Bú kèqi!")} Đừng khách sáo!</li><li>Với người lớn tuổi: ${Z("谢谢您！","Xièxie nín!")}</li></ul>`+W1(`Lỗi hay gặp: đáp lời cảm ơn bằng ✗ 没关系 (没关系 dùng để đáp lời xin lỗi 对不起).`)},
{h:"2. Chào tạm biệt: 再见",b:`<span class="fm">再见！<small>Zàijiàn!</small></span><p>Hai người cùng nói ${Z("再见！","Zàijiàn!")} khi chia tay.</p>`+W1(`Người Việt hay đọc <b>z</b> thành “d” hoặc “ch” bật hơi. z đọc gần “ch” nhẹ, <b>không bật hơi</b>; <b>j</b> trong jiàn đọc gần “ch” mặt lưỡi.`)},
{h:"3. Thanh nhẹ (轻声)",b:`<span class="fm">Âm tiết đọc ngắn và nhẹ, không ghi dấu<small>xièxie · māma · bàba</small></span><ul><li>${Z("谢谢","xièxie")} cảm ơn</li><li>${Z("妈妈","māma")} mẹ · ${Z("爸爸","bàba")} bố · ${Z("爷爷","yéye")} ông nội · ${Z("奶奶","nǎinai")} bà nội</li></ul>`+W1(`Lỗi hay gặp: đọc âm tiết sau với đủ thanh ✗ xièxiè. Âm tiết thanh nhẹ phải đọc <b>ngắn, nhẹ</b>, không nhấn.`)},
{h:"4. Cách ghi dấu thanh điệu",b:`<span class="fm">Thứ tự ưu tiên: a → o → e → i, u, ü<small>xuéxiào · hǎochī · kèqi</small></span><p>Dấu thanh ghi trên nguyên âm mở miệng rộng hơn: ${Z("学校","xuéxiào")} (trên a), ${Z("好吃","hǎochī")}. Ngoại lệ: <b>iu</b> (dạng gọn của iou) ghi dấu trên <b>u</b>: ${Z("六","liù")}. Thanh nhẹ không ghi dấu.</p>`},
{h:"5. Cách viết giản lược iou, uei, uen",b:`<span class="fm">iou → iu · uei → ui · uen → un (khi có thanh mẫu đứng trước)<small>niú · guì · lún</small></span><p>Ví dụ trong sách: ${Z("休息","xiūxi")} · ${Z("睡觉","shuì jiào")} · ${Z("足球","zúqiú")}.</p>`+W1(`Khi đọc vẫn phải phát âm đủ âm giữa: xiū nghe như “xi-ơu”, guì nghe như “quây”.`)},
{h:"6. Mẫu câu thường dùng trong lớp (课堂用语)",b:`<ul><li>${Z("打开书。","Dǎkāi shū.")} Hãy mở sách ra.</li><li>${Z("请大声读。","Qǐng dà shēng dú.")} Hãy đọc to lên.</li><li>${Z("再读一遍。","Zài dú yí biàn.")} Hãy đọc lại lần nữa.</li><li>${Z("一起读。","Yìqǐ dú.")} Hãy cùng đọc nào.</li><li>${Z("有问题吗？","Yǒu wèntí ma?")} Có thắc mắc gì không?</li></ul>`}],
gq:[
{q:"Bạn giúp em xách vali, em nói:",o:["谢谢！|Xièxie!","不客气！|Bú kèqi!","再见！|Zàijiàn!"],e:"Cảm ơn: 谢谢."},
{q:"Bạn nói “谢谢你！” với em, em đáp:",o:["不客气！|Bú kèqi!","没关系！|Méi guānxi!","对不起！|Duìbuqǐ!"],e:"Đáp lời cảm ơn: 不客气 / 不谢. 没关系 dùng để đáp lời xin lỗi."},
{q:"Cảm ơn bà cụ một cách lịch sự:",o:["谢谢您！|Xièxie nín!","您谢谢！|Nín xièxie!","谢谢你们！|Xièxie nǐmen!"],e:"谢谢 + 您 (lịch sự)."},
{q:"Tan học, em chào các bạn:",o:["再见！|Zàijiàn!","你好！|Nǐ hǎo!","不谢！|Bú xiè!"],e:"Tạm biệt: 再见."},
{q:"“不谢” đọc đúng là:",o:["bú xiè","bù xiè","bū xiè"],e:"不 đứng trước thanh 4 đọc thành bú."},
{q:"“谢谢” đọc đúng là:",o:["xièxie (chữ sau đọc nhẹ)","xièxiè (đủ hai thanh 4)","xiéxie"],e:"Chữ 谢 thứ hai đọc thanh nhẹ."},
{q:"Từ “六” (sáu) ghi phiên âm đúng là:",o:["liù","lìu","liòu"],e:"iu ghi dấu trên u."},
{q:"Cô giáo nói “一起读。”, em cần:",o:["cùng đọc với cả lớp","mở sách ra","hỏi cô"],e:"一起读 = Hãy cùng đọc nào."}],
dt:[["谢谢！","Xièxie!"],["不谢！","Bú xiè!"],["谢谢你！","Xièxie nǐ!"],["不客气！","Bú kèqi!"],["再见！","Zàijiàn!"],["谢谢您！","Xièxie nín!"],["你好！","Nǐ hǎo!"],["对不起！","Duìbuqǐ!"],["没关系！","Méi guānxi!"],["你们好！","Nǐmen hǎo!"]],
tsort:[
{t:["你","谢谢","！"],ok:["谢谢你！"],p:"Xièxie nǐ!",e:"谢谢 + người được cảm ơn."},
{t:["客气","不","！"],ok:["不客气！"],p:"Bú kèqi!",e:"不 đứng trước 客气."},
{t:["您","谢谢","！"],ok:["谢谢您！"],p:"Xièxie nín!",e:"谢谢 + 您 (lịch sự)."},
{t:["见","再","！"],ok:["再见！"],p:"Zàijiàn!",e:"再见 = tạm biệt."},
{t:["们","好","你","！"],ok:["你们好！"],p:"Nǐmen hǎo!",e:"Ôn Bài 1: 你们 + 好."}],
tlis:[
{a:"谢谢！",o:["不谢！|Bú xiè!","没关系！|Méi guānxi!","你好！|Nǐ hǎo!"]},
{a:"谢谢你！",o:["不客气！|Bú kèqi!","对不起！|Duìbuqǐ!","你们好！|Nǐmen hǎo!"]},
{a:"再见！",o:["再见！|Zàijiàn!","谢谢！|Xièxie!","您好！|Nín hǎo!"]},
{a:"对不起！",o:["没关系！|Méi guānxi!","不客气！|Bú kèqi!","再见！|Zàijiàn!"]},
{a:"不客气！",qz:"Người nói muốn nói gì?",qp:"",o:["Đừng khách sáo!","Cảm ơn!","Tạm biệt!"]}],
sit:[
{title:"Tình huống 1 · Cảm ơn người giúp đỡ",ctx:"Một người giúp em xếp hành lý lên xe.",turns:[
{w:"A",vi:"Cảm ơn người giúp mình.",h:[["谢谢","xièxie"]],r:["谢谢！","Xièxie!","Cảm ơn!"]},
{w:"B",vi:"Đáp: không cần cảm ơn đâu.",h:[["不","bú"],["谢","xiè"]],r:["不谢！","Bú xiè!","Không cần cảm ơn đâu!"]}]},
{title:"Tình huống 2 · Cảm ơn cô hộ lý",ctx:"Cô hộ lý mang đồ ăn đến cho bà cụ.",turns:[
{w:"A",vi:"Bà cảm ơn cô hộ lý.",h:[["谢谢","xièxie"],["你","nǐ"]],r:["谢谢你！","Xièxie nǐ!","Cảm ơn cô!"]},
{w:"B",vi:"Cô hộ lý đáp: đừng khách sáo.",h:[["不客气","bú kèqi"]],r:["不客气！","Bú kèqi!","Đừng khách sáo!"]}]},
{title:"Tình huống 3 · Chào tạm biệt",ctx:"Bạn nhỏ ngồi trong xe vẫy tay chào.",turns:[
{w:"A",vi:"Chào tạm biệt.",h:[["再见","zàijiàn"]],r:["再见！","Zàijiàn!","Tạm biệt!"]},
{w:"B",vi:"Chào tạm biệt lại.",h:[["再见","zàijiàn"]],r:["再见！","Zàijiàn!","Tạm biệt!"]}]},
{title:"Tình huống 4 · Vận dụng: cuối buổi học",ctx:"Cuối buổi học, em mượn bút của bạn, rồi cảm ơn cô và chào tạm biệt.",turns:[
{w:"我",vi:"Cảm ơn bạn đã cho mượn bút.",h:[["谢谢","xièxie"],["你","nǐ"]],r:["谢谢你！","Xièxie nǐ!","Cảm ơn bạn!"]},
{w:"同学",vi:"Bạn đáp: đừng khách sáo.",h:[["不客气","bú kèqi"]],r:["不客气！","Bú kèqi!","Đừng khách sáo!"]},
{w:"老师",vi:"Cô hỏi cả lớp có thắc mắc gì không.",h:[["有","yǒu"],["问题","wèntí"],["吗","ma"]],r:["有问题吗？","Yǒu wèntí ma?","Có thắc mắc gì không?"]},
{w:"我",vi:"Cảm ơn cô một cách lịch sự.",h:[["谢谢","xièxie"],["您","nín"]],r:["谢谢您！","Xièxie nín!","Em cảm ơn cô ạ!"]},
{w:"老师",vi:"Cô chào tạm biệt cả lớp.",h:[["再见","zàijiàn"]],r:["再见！","Zàijiàn!","Tạm biệt các em!"]}]}]};
GXD["1-2"]={so:[
{t:["谢谢|xièxie","你|nǐ"],ok:["谢谢你"],f:"谢谢你！",p:"Xièxie nǐ!",e:"谢谢 + người được cảm ơn."},
{t:["不|bú","客气|kèqi"],ok:["不客气"],f:"不客气！",p:"Bú kèqi!",e:"不 đứng trước 客气."},
{t:["谢谢|xièxie","您|nín"],ok:["谢谢您"],f:"谢谢您！",p:"Xièxie nín!",e:"Cảm ơn người lớn tuổi: 谢谢您."},
{t:["一起|yìqǐ","读|dú"],ok:["一起读"],f:"一起读。",p:"Yìqǐ dú.",e:"Câu lệnh trong lớp: hãy cùng đọc."}],
tr:[
{vi:"Cảm ơn bạn!",a:["谢谢你"],r:["谢谢你！","Xièxie nǐ!"]},
{vi:"Đừng khách sáo!",a:["不客气"],r:["不客气！","Bú kèqi!"]},
{vi:"Không cần cảm ơn đâu!",a:["不谢"],r:["不谢！","Bú xiè!"]},
{vi:"Tạm biệt!",a:["再见"],r:["再见！","Zàijiàn!"]}],
pc:[
{img:null,ph:"Tranh gợi ý: một người giúp bà cụ xách túi đồ",req:"Bà cụ cảm ơn người giúp mình. Viết câu bà cảm ơn và câu người kia đáp lại.",kw:[{l:"谢谢",m:[["谢谢","xiexie"]]},{l:"不客气 / 不谢",m:[["不客气","bukeqi"],["不谢","buxie"]]}],r:[["谢谢你！——不客气！","Xièxie nǐ! — Bú kèqi!","Cảm ơn cháu! — Bà đừng khách sáo!"],["谢谢！——不谢！","Xièxie! — Bú xiè!","Cảm ơn! — Không cần cảm ơn đâu!"]]},
{img:null,ph:"Tranh gợi ý: hai bạn vẫy tay chia tay ở cổng trường",req:"Tan học, em và bạn chia tay ở cổng trường. Viết lời chào của hai bạn.",kw:[{l:"再见",m:[["再见","zaijian"]]}],r:[["再见！——再见！","Zàijiàn! — Zàijiàn!","Tạm biệt! — Tạm biệt!"]]}]};

/* ---------- Bài 3 · 你叫什么名字？ ---------- */
LD1[3]={t:"你叫什么名字？",tp:"Nǐ jiào shénme míngzi?",vi:"Cô tên gì?",
gpNote:"Ngữ pháp lấy từ mục Chú thích (注释) của sách: đại từ nghi vấn 什么, câu chữ 是, câu hỏi với 吗; thêm biến điệu của 不 và quy tắc viết ü (mục Ghép âm), kèm lỗi người Việt hay mắc.",
goals:["Hỏi và nói tên: 你叫什么名字？— 我叫……","Dùng câu chữ 是 (khẳng định, phủ định) để nói mình là ai, người nước nào; hỏi bằng 吗.","Đọc đúng j, q, x / z, c, s và i, u, ü; biết biến điệu của 不 (不是 bú shì)."],
warm:{q:"给下面的词语选择对应的图片。",qv:"Chọn hình tương ứng với các từ ngữ bên dưới.",
w:[["A","中国","Zhōngguó","Trung Quốc"],["B","美国","Měiguó","nước Mỹ"],["C","中国人","Zhōngguó rén","người Trung Quốc"],["D","美国人","Měiguó rén","người Mỹ"],["E","老师","lǎoshī","thầy/cô giáo"],["F","学生","xuésheng","học sinh"]],
pics:[["h1cb3-laoshi","E"],["h1cb3-xuesheng","F"],["h1cb3-zhongguo","A"],["h1cb3-meiguo","B"],["h1cb3-meiguoren","D"],["h1cb3-zhongguoren","C"]]},
texts:[
{ctx:"在学校 · Ở trường: hai người gặp nhau lần đầu, hỏi tên nhau.",a:"c3-1",l:[
["A","你叫什么名字？","Nǐ jiào shénme míngzi?","Cô tên gì?"],
["B","我叫李月。","Wǒ jiào Lǐ Yuè.","Tôi tên là Lý Nguyệt."]]},
{ctx:"在教室 · Trong lớp học: một người hỏi cô gái có phải giáo viên không.",a:"c3-2",l:[
["A","你是老师吗？","Nǐ shì lǎoshī ma?","Cô là cô giáo phải không?"],
["B","我不是老师，我是学生。","Wǒ bú shì lǎoshī, wǒ shì xuésheng.","Không phải, tôi là học sinh."]]},
{ctx:"在学校 · Ở trường: hai bạn nhỏ ngồi cạnh nhau ở phòng máy tính.",a:"c3-3",l:[
["A","你是中国人吗？","Nǐ shì Zhōngguó rén ma?","Bạn là người Trung Quốc phải không?"],
["B","我不是中国人，我是美国人。","Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén.","Không phải, mình là người Mỹ."]]}],
words:[
["叫","jiào","động từ","tên (là), gọi",0],["什么","shénme","đại từ","gì, cái gì",0],["名字","míngzi","danh từ","tên",0],["我","wǒ","đại từ","tôi, ta, mình…",0],["李月","Lǐ Yuè","danh từ riêng","Lý Nguyệt (tên người)",0],
["是","shì","động từ","là",1],["老师","lǎoshī","danh từ","thầy/cô giáo",1],["吗","ma","trợ từ","dùng ở cuối câu hỏi",1],["学生","xuésheng","danh từ","học sinh",1],
["人","rén","danh từ","người",2],["中国","Zhōngguó","danh từ riêng","Trung Quốc",2],["美国","Měiguó","danh từ riêng","nước Mỹ",2]],
gp:[
{h:"1. Đại từ nghi vấn 什么",b:`<span class="fm">Chủ ngữ ＋ 叫 ＋ 什么名字？ → 我叫 ＋ tên<small>… jiào shénme míngzi? → Wǒ jiào …</small></span><p>什么 dùng trong câu hỏi, đứng một mình làm tân ngữ hoặc đứng trước danh từ: ${Z("什么名字","shénme míngzi")} (tên gì).</p><ul><li>${Z("你叫什么名字？","Nǐ jiào shénme míngzi?")} → ${Z("我叫李月。","Wǒ jiào Lǐ Yuè.")}</li><li>Ví dụ sách: ${Z("这是什么？","Zhè shì shénme?")} (这 zhè: đây) · ${Z("这是什么书？","Zhè shì shénme shū?")} (书 shū: sách)</li></ul>`+W1(`Lỗi hay gặp: dịch theo trật tự tiếng Việt “Bạn tên gì” thành ✗ 你名字什么？; câu đã có 什么 lại thêm 吗 ✗ 你叫什么名字吗？. Trả lời thay đúng vào chỗ của 什么: 我叫李月 (không nói ✗ 我是叫李月).`)},
{h:"2. Câu chữ 是",b:`<span class="fm">Chủ ngữ ＋ (不)是 ＋ danh từ / cụm danh từ<small>… + (bú) shì + …</small></span><ul><li>${Z("李月是老师。","Lǐ Yuè shì lǎoshī.")}</li><li>${Z("我是美国人。","Wǒ shì Měiguó rén.")}</li><li>Phủ định: thêm 不 trước 是 — ${Z("我不是老师。","Wǒ bú shì lǎoshī.")}</li></ul><p>💡 Tên nước ＋ 人 = người nước đó: ${Z("中国人","Zhōngguó rén")} · ${Z("美国人","Měiguó rén")}.</p>`+W1(`Lỗi hay gặp: bỏ 是 như tiếng Việt “Tôi người Mỹ” ✗ 我美国人; đặt 不 sau 是 ✗ 我是不老师; nói ✗ 人中国 theo trật tự “người Trung Quốc”.`)},
{h:"3. Câu hỏi với 吗",b:`<span class="fm">Câu trần thuật ＋ 吗？<small>… + ma?</small></span><ul><li>${Z("你是美国人吗？","Nǐ shì Měiguó rén ma?")}</li><li>${Z("你是中国人吗？","Nǐ shì Zhōngguó rén ma?")}</li><li>${Z("你是老师吗？","Nǐ shì lǎoshī ma?")}</li></ul><p>Trả lời: ${Z("是，我是老师。","Shì, wǒ shì lǎoshī.")} hoặc ${Z("我不是老师，我是学生。","Wǒ bú shì lǎoshī, wǒ shì xuésheng.")}</p>`+W1(`吗 luôn đứng <b>cuối câu</b> và đọc nhẹ (ma). Không đặt 吗 giữa câu ✗ 你吗是老师？`)},
{h:"4. Biến điệu của 不",b:`<span class="fm">不 ＋ thanh 1, 2, 3 → bù · 不 ＋ thanh 4 → bú<small>bù chī · bù xíng · bù hǎo · bú shì</small></span><ul><li>Giữ <b>bù</b>: ${Z("不吃","bù chī")} không ăn · ${Z("不行","bù xíng")} không được · ${Z("不好","bù hǎo")} không tốt</li><li>Đổi thành <b>bú</b>: ${Z("不是","bú shì")} không phải · ${Z("不看","bú kàn")} không xem · ${Z("不会","bú huì")} không thể</li></ul><p>Bài 2 đã gặp: ${Z("不谢","bú xiè")} · ${Z("不客气","bú kèqi")}.</p>`},
{h:"5. Phát âm j, q, x — z, c, s và i, u, ü",b:`<span class="fm">j q x (mặt lưỡi) · z c s (đầu lưỡi) · i — ü (môi dẹt — môi tròn)<small>jījí · xiǎoqū · zǎoshang · Hànzì</small></span><ul><li><b>j</b> không bật hơi, <b>q</b> bật hơi mạnh, <b>x</b> mặt lưỡi gần ngạc cứng nhưng không chạm.</li><li><b>z</b> không bật hơi, <b>c</b> bật hơi rõ, <b>s</b> đầu lưỡi không chạm răng.</li><li>ü: giữ vị trí lưỡi của i rồi tròn môi.</li></ul><p>💡 ü ghép với j, q, x thì bỏ hai chấm: <b>ju, qu, xu</b>; ghép với l, n thì giữ: <b>lü, nü</b>.</p>`+W1(`Người Việt hay đọc q như “ch” không bật hơi, x như “x” tiếng Việt (đầu lưỡi), và đọc qu, ju, xu thành “u” (thực ra là <b>ü</b>).`)}],
gq:[
{q:"Hỏi tên một bạn mới:",o:["你叫什么名字？|Nǐ jiào shénme míngzi?","你名字什么？|Nǐ míngzi shénme?","你叫什么名字吗？|Nǐ jiào shénme míngzi ma?"],e:"叫 + 什么名字; câu có 什么 không thêm 吗."},
{q:"Trả lời “Tôi tên là Lý Nguyệt”:",o:["我叫李月。|Wǒ jiào Lǐ Yuè.","我是叫李月。|Wǒ shì jiào Lǐ Yuè.","李月我叫。|Lǐ Yuè wǒ jiào."],e:"我叫 + tên."},
{q:"“Tôi không phải là giáo viên” nói là:",o:["我不是老师。|Wǒ bú shì lǎoshī.","我是不老师。|Wǒ shì bù lǎoshī.","我不老师。|Wǒ bù lǎoshī."],e:"不 đứng trước 是."},
{q:"Hỏi bạn có phải người Trung Quốc không:",o:["你是中国人吗？|Nǐ shì Zhōngguó rén ma?","你中国人吗？|Nǐ Zhōngguó rén ma?","你吗是中国人？|Nǐ ma shì Zhōngguó rén?"],e:"Câu chữ 是 + 吗 ở cuối câu."},
{q:"“Người Mỹ” nói là:",o:["美国人|Měiguó rén","人美国|rén Měiguó","美人国|Měi rén guó"],e:"Tên nước + 人."},
{q:"“不是” đọc đúng là:",o:["bú shì","bù shì","bū shì"],e:"不 trước thanh 4 đọc thành bú."},
{q:"Hỏi “你是老师吗？”, bạn là học sinh trả lời:",o:["我不是老师，我是学生。|Wǒ bú shì lǎoshī, wǒ shì xuésheng.","我是老师，我不是学生。|Wǒ shì lǎoshī, wǒ bú shì xuésheng.","我叫学生。|Wǒ jiào xuésheng."],e:"Phủ định 不是, rồi nói mình là gì."},
{q:"“qu” trong 去 (qù) có vận mẫu là:",o:["ü (bỏ hai chấm khi đi với q)","u","ou"],e:"ü ghép với j, q, x viết thành u nhưng vẫn đọc ü."}],
dt:[["你叫什么名字？","Nǐ jiào shénme míngzi?"],["我叫李月。","Wǒ jiào Lǐ Yuè."],["你是老师吗？","Nǐ shì lǎoshī ma?"],["我不是老师，我是学生。","Wǒ bú shì lǎoshī, wǒ shì xuésheng."],["你是中国人吗？","Nǐ shì Zhōngguó rén ma?"],["我不是中国人，我是美国人。","Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén."],["李月是老师。","Lǐ Yuè shì lǎoshī."],["你是美国人吗？","Nǐ shì Měiguó rén ma?"],["我是学生。","Wǒ shì xuésheng."],["我是中国人。","Wǒ shì Zhōngguó rén."]],
tsort:[
{t:["你","叫","什么","名字","？"],ok:["你叫什么名字？"],p:"Nǐ jiào shénme míngzi?",e:"叫 + 什么名字."},
{t:["我","不","是","老师","。"],ok:["我不是老师。"],p:"Wǒ bú shì lǎoshī.",e:"不 đứng trước 是."},
{t:["你","是","中国","人","吗","？"],ok:["你是中国人吗？"],p:"Nǐ shì Zhōngguó rén ma?",e:"吗 đứng cuối câu."},
{t:["我","是","美国","人","。"],ok:["我是美国人。"],p:"Wǒ shì Měiguó rén.",e:"Tên nước + 人."},
{t:["我","叫","李月","。"],ok:["我叫李月。"],p:"Wǒ jiào Lǐ Yuè.",e:"我叫 + tên."}],
tlis:[
{a:"你叫什么名字？",o:["我叫李月。|Wǒ jiào Lǐ Yuè.","我是学生。|Wǒ shì xuésheng.","不客气！|Bú kèqi!"]},
{a:"你是老师吗？",o:["我不是老师，我是学生。|Wǒ bú shì lǎoshī, wǒ shì xuésheng.","我叫李月。|Wǒ jiào Lǐ Yuè.","没关系！|Méi guānxi!"]},
{a:"你是中国人吗？",o:["我不是中国人，我是美国人。|Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén.","我叫李月。|Wǒ jiào Lǐ Yuè.","谢谢你！|Xièxie nǐ!"]},
{a:"我叫李月，我是学生。",qz:"李月是老师吗？",qp:"Lǐ Yuè shì lǎoshī ma?",o:["不是，她是学生。|Bú shì, tā shì xuésheng.","是，她是老师。|Shì, tā shì lǎoshī.","她是美国人。|Tā shì Měiguó rén."]},
{a:"我不是中国人，我是美国人。",qz:"他是中国人吗？",qp:"Tā shì Zhōngguó rén ma?",o:["不是，他是美国人。|Bú shì, tā shì Měiguó rén.","是，他是中国人。|Shì, tā shì Zhōngguó rén.","他是老师。|Tā shì lǎoshī."]}],
sit:[
{title:"Tình huống 1 · Hỏi tên",ctx:"Ở trường, hai người gặp nhau lần đầu.",turns:[
{w:"A",vi:"Hỏi tên người kia.",h:[["你","nǐ"],["叫","jiào"],["什么","shénme"],["名字","míngzi"]],r:["你叫什么名字？","Nǐ jiào shénme míngzi?","Cô tên gì?"]},
{w:"B",vi:"Nói mình tên là Lý Nguyệt.",h:[["我","wǒ"],["叫","jiào"],["李月","Lǐ Yuè"]],r:["我叫李月。","Wǒ jiào Lǐ Yuè.","Tôi tên là Lý Nguyệt."]}]},
{title:"Tình huống 2 · Trong lớp học",ctx:"Một người hỏi cô gái trong lớp có phải là giáo viên không.",turns:[
{w:"A",vi:"Hỏi cô gái có phải là giáo viên không.",h:[["你","nǐ"],["是","shì"],["老师","lǎoshī"],["吗","ma"]],r:["你是老师吗？","Nǐ shì lǎoshī ma?","Cô là cô giáo phải không?"]},
{w:"B",vi:"Nói mình không phải giáo viên, mình là học sinh.",h:[["我","wǒ"],["不是","bú shì"],["老师","lǎoshī"],["我是","wǒ shì"],["学生","xuésheng"]],r:["我不是老师，我是学生。","Wǒ bú shì lǎoshī, wǒ shì xuésheng.","Không phải, tôi là học sinh."]}]},
{title:"Tình huống 3 · Hỏi quốc tịch",ctx:"Hai bạn nhỏ ngồi cạnh nhau ở phòng máy tính.",turns:[
{w:"A",vi:"Hỏi bạn có phải người Trung Quốc không.",h:[["你","nǐ"],["是","shì"],["中国人","Zhōngguó rén"],["吗","ma"]],r:["你是中国人吗？","Nǐ shì Zhōngguó rén ma?","Bạn là người Trung Quốc phải không?"]},
{w:"B",vi:"Nói mình không phải người Trung Quốc, mình là người Mỹ.",h:[["我","wǒ"],["不是","bú shì"],["中国人","Zhōngguó rén"],["我是","wǒ shì"],["美国人","Měiguó rén"]],r:["我不是中国人，我是美国人。","Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén.","Không phải, mình là người Mỹ."]}]},
{title:"Tình huống 4 · Vận dụng: làm quen bạn mới ở lớp tiếng Trung",ctx:"Buổi học đầu tiên, em (Nguyễn Minh) làm quen với bạn ngồi bên cạnh là Lý Nguyệt.",turns:[
{w:"我",vi:"Chào bạn.",h:[["你","nǐ"],["好","hǎo"]],r:["你好！","Nǐ hǎo!","Chào bạn!"]},
{w:"李月",vi:"Chào lại và hỏi tên em.",h:[["你好","nǐ hǎo"],["你","nǐ"],["叫","jiào"],["什么名字","shénme míngzi"]],r:["你好！你叫什么名字？","Nǐ hǎo! Nǐ jiào shénme míngzi?","Chào bạn! Bạn tên gì?"]},
{w:"我",vi:"Nói tên mình là Nguyễn Minh.",h:[["我","wǒ"],["叫","jiào"],["阮明","Ruǎn Míng"]],r:["我叫阮明。","Wǒ jiào Ruǎn Míng.","Mình tên là Nguyễn Minh."]},
{w:"我",vi:"Hỏi bạn có phải là giáo viên không.",h:[["你","nǐ"],["是","shì"],["老师","lǎoshī"],["吗","ma"]],r:["你是老师吗？","Nǐ shì lǎoshī ma?","Bạn là giáo viên phải không?"]},
{w:"李月",vi:"Nói mình không phải giáo viên, mình là học sinh.",h:[["我","wǒ"],["不是","bú shì"],["老师","lǎoshī"],["我是","wǒ shì"],["学生","xuésheng"]],r:["我不是老师，我是学生。","Wǒ bú shì lǎoshī, wǒ shì xuésheng.","Mình không phải giáo viên, mình là học sinh."]},
{w:"我",vi:"Hỏi bạn có phải người Trung Quốc không.",h:[["你","nǐ"],["是","shì"],["中国人","Zhōngguó rén"],["吗","ma"]],r:["你是中国人吗？","Nǐ shì Zhōngguó rén ma?","Bạn là người Trung Quốc phải không?"]},
{w:"李月",vi:"Trả lời: mình là người Trung Quốc.",h:[["我","wǒ"],["是","shì"],["中国人","Zhōngguó rén"]],r:["我是中国人。","Wǒ shì Zhōngguó rén.","Mình là người Trung Quốc."]}]}]};
GXD["1-3"]={so:[
{t:["你|nǐ","叫|jiào","什么|shénme","名字|míngzi"],ok:["你叫什么名字"],f:"你叫什么名字？",p:"Nǐ jiào shénme míngzi?",e:"叫 + 什么名字."},
{t:["我|wǒ","不|bú","是|shì","老师|lǎoshī"],ok:["我不是老师"],f:"我不是老师。",p:"Wǒ bú shì lǎoshī.",e:"不 đứng trước 是."},
{t:["你|nǐ","是|shì","美国|Měiguó","人|rén","吗|ma"],ok:["你是美国人吗"],f:"你是美国人吗？",p:"Nǐ shì Měiguó rén ma?",e:"Câu trần thuật + 吗."},
{t:["我|wǒ","是|shì","学生|xuésheng"],ok:["我是学生"],f:"我是学生。",p:"Wǒ shì xuésheng.",e:"A + 是 + B."},
{t:["李月|Lǐ Yuè","是|shì","老师|lǎoshī"],ok:["李月是老师"],f:"李月是老师。",p:"Lǐ Yuè shì lǎoshī.",e:"Câu chữ 是 (ví dụ trong sách)."}],
tr:[
{vi:"Bạn tên gì?",a:["你叫什么名字"],r:["你叫什么名字？","Nǐ jiào shénme míngzi?"]},
{vi:"Tôi tên là Lý Nguyệt.",a:["我叫李月"],r:["我叫李月。","Wǒ jiào Lǐ Yuè."]},
{vi:"Bạn là giáo viên phải không?",a:["你是老师吗"],r:["你是老师吗？","Nǐ shì lǎoshī ma?"]},
{vi:"Mình không phải người Trung Quốc, mình là người Mỹ.",a:["我不是中国人我是美国人"],r:["我不是中国人，我是美国人。","Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén."]},
{vi:"Tôi không phải là giáo viên, tôi là học sinh.",a:["我不是老师我是学生"],r:["我不是老师，我是学生。","Wǒ bú shì lǎoshī, wǒ shì xuésheng."]}],
pc:[
{img:"h1cb3a",req:"Đóng vai bạn nhỏ trong tranh: bạn ấy không phải giáo viên, bạn ấy là học sinh (gợi ý trong sách: 我不是___，我是学生。).",kw:[{l:"不是",m:[["不是","bushi"]]},{l:"学生",m:[["学生","xuesheng"]]}],r:[["我不是老师，我是学生。","Wǒ bú shì lǎoshī, wǒ shì xuésheng.","Mình không phải giáo viên, mình là học sinh."]]},
{img:"h1cb3b",req:"Đóng vai thầy giáo trong tranh, thầy là người Mỹ (gợi ý trong sách: 我是___，我不是学生，我是___人。).",kw:[{l:"老师",m:[["老师","laoshi"]]},{l:"不是学生",m:[["不是学生","bushixuesheng"]]},{l:"美国人",m:[["美国人","meiguoren"]]}],r:[["我是老师，我不是学生，我是美国人。","Wǒ shì lǎoshī, wǒ bú shì xuésheng, wǒ shì Měiguó rén.","Tôi là giáo viên, tôi không phải học sinh, tôi là người Mỹ."]]}]};
var TKP=Object.assign(window.TKP||{},{"你":"nǐ","们":"men","好":"hǎo","您":"nín","对":"duì","不":"bù","起":"qǐ","没":"méi","关":"guān","系":"xi","谢谢":"xièxie","客气":"kèqi","见":"jiàn","再":"zài","叫":"jiào","什么":"shénme","名字":"míngzi","我":"wǒ","是":"shì","老师":"lǎoshī","吗":"ma","中国":"Zhōngguó","美国":"Měiguó","人":"rén","李月":"Lǐ Yuè"});
