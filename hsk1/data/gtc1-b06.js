/* ===== Giáo trình chuẩn HSK 1 · Bài 6: 我会说汉语 (sách trang 52–59) ===== */
LD1[6]={t:"我会说汉语",tp:"Wǒ huì shuō Hànyǔ",vi:"Tôi biết nói tiếng Trung Quốc",
gpNote:"Ngữ pháp lấy từ mục Chú thích (注释) của sách: động từ năng nguyện 会 (1), câu vị ngữ tính từ, đại từ nghi vấn 怎么 (1); thêm cách nói “biết A, không biết B” trong bài khóa 3 và phần kết hợp thanh 1 + các thanh (mục Ghép âm), kèm lỗi người Việt hay mắc.",
goals:["Hỏi và nói về khả năng có được nhờ học tập bằng 会 / 不会 (你会说汉语吗？— 我会说汉语。/ 她不会说。).","Nhận xét người, sự vật bằng câu vị ngữ tính từ: 中国菜很好吃。","Hỏi cách làm bằng 怎么 + động từ (这个字怎么写？) và nói “biết đọc, không biết viết”."],
texts:[
{ctx:"在学校 · Ở trường: thầy giáo hỏi một em học sinh có biết nói tiếng Trung không.",a:"c6-1",l:[
["A","你会说汉语吗？","Nǐ huì shuō Hànyǔ ma?","Em có biết nói tiếng Trung Quốc không?"],
["B","我会说汉语。","Wǒ huì shuō Hànyǔ.","Em có biết."],
["A","你妈妈会说汉语吗？","Nǐ māma huì shuō Hànyǔ ma?","Mẹ em biết nói tiếng Trung Quốc không?"],
["B","她不会说。","Tā bú huì shuō.","Mẹ em thì không."]]},
{ctx:"在厨房 · Trong nhà bếp: hai người nói chuyện về món ăn Trung Quốc.",a:"c6-2",l:[
["A","中国菜好吃吗？","Zhōngguó cài hǎochī ma?","Món ăn Trung Quốc có ngon không?"],
["B","中国菜很好吃。","Zhōngguó cài hěn hǎochī.","Rất ngon."],
["A","你会做中国菜吗？","Nǐ huì zuò Zhōngguó cài ma?","Anh có biết nấu món Trung Quốc không?"],
["B","我不会做。","Wǒ bú huì zuò.","Tôi không biết."]]},
{ctx:"在图书馆 · Ở thư viện: hai bạn hỏi nhau cách viết một chữ Hán.",a:"c6-3",l:[
["A","你会写汉字吗？","Nǐ huì xiě Hànzì ma?","Anh có biết viết chữ Hán không?"],
["B","我会写。","Wǒ huì xiě.","Tôi có biết."],
["A","这个字怎么写？","Zhège zì zěnme xiě?","Vậy chữ này anh viết thế nào?"],
["B","对不起，这个字我会读，不会写。","Duìbuqǐ, zhège zì wǒ huì dú, bú huì xiě.","Xin lỗi, chữ này tôi biết đọc chứ không biết viết."]]}],
words:[
["会","huì","động từ năng nguyện","biết (làm việc gì đó nhờ học tập)",0],["说","shuō","động từ","nói",0],["妈妈","māma","danh từ","mẹ",0],
["菜","cài","danh từ","món ăn, thức ăn",1],["很","hěn","phó từ","rất",1],["好吃","hǎochī","tính từ","ngon",1],["做","zuò","động từ","làm, nấu",1],
["写","xiě","động từ","viết",2],["汉字","Hànzì","danh từ","chữ Hán",2],["字","zì","danh từ","chữ",2],["怎么","zěnme","đại từ","(hỏi tính chất, tình trạng, cách thức…) như thế nào",2],["读","dú","động từ","đọc",2]],
gp:[
{h:"1. Động từ năng nguyện 会 (1): biết (nhờ học mà có)",b:`<span class="fm">Chủ ngữ ＋ (不) 会 ＋ động từ (＋ tân ngữ)<small>… (bú) huì + …</small></span><ul><li>${Z("我会写汉字。","Wǒ huì xiě Hànzì.")}</li><li>${Z("我不会做中国菜。","Wǒ bú huì zuò Zhōngguó cài.")}</li><li>${Z("你妈妈会说汉语吗？","Nǐ māma huì shuō Hànyǔ ma?")} — ${Z("她不会说。","Tā bú huì shuō.")}</li></ul><p>💡 Trả lời ngắn chỉ cần ${Z("会。","Huì.")} / ${Z("不会。","Bú huì.")} hoặc 会 / 不会 + động từ, không cần nhắc lại tân ngữ: ${Z("我会写。","Wǒ huì xiě.")}</p>`+W1(`Lỗi hay gặp: bỏ động từ sau 会 ✗ 我会汉语 (nên nói ${Z("我会说汉语","wǒ huì shuō Hànyǔ")}); phủ định bằng 没 ✗ 我没会做. Phủ định của 会 luôn là <b>不会 bú huì</b> (不 trước thanh 4 đọc thành bú).`)},
{h:"2. Câu có vị ngữ là tính từ",b:`<span class="fm">Chủ ngữ ＋ 很 ＋ tính từ · Phủ định: Chủ ngữ ＋ 不 ＋ tính từ<small>… hěn + … · … bù + …</small></span><ul><li>${Z("我很好。","Wǒ hěn hǎo.")}</li><li>${Z("中国菜很好吃。","Zhōngguó cài hěn hǎochī.")}</li><li>${Z("我妈妈的汉语不好。","Wǒ māma de Hànyǔ bù hǎo.")}</li><li>${Z("中国菜好吃吗？","Zhōngguó cài hǎochī ma?")}</li></ul><p>💡 很 ở đây thường đọc nhẹ, không nhất thiết nghĩa là “rất”; câu khẳng định bỏ 很 nghe như đang so sánh.</p>`+W1(`Lỗi hay gặp (do dịch từ “là” tiếng Việt): ✗ 中国菜是好吃 · ✗ 我是很好. Vị ngữ là tính từ thì <b>không dùng 是</b>. Phủ định không thêm 很: ✗ 中国菜很不好吃 (nghĩa khác: rất dở) — câu thường dùng là ${Z("中国菜不好吃。","Zhōngguó cài bù hǎochī.")}`)},
{h:"3. Đại từ nghi vấn 怎么 (1): hỏi cách làm",b:`<span class="fm">怎么 ＋ động từ？<small>zěnme + … ?</small></span><ul><li>${Z("这个汉字怎么读？","Zhège Hànzì zěnme dú?")}</li><li>${Z("你的汉语名字怎么写？","Nǐ de Hànyǔ míngzi zěnme xiě?")}</li><li>${Z("这个字怎么写？","Zhège zì zěnme xiě?")}</li></ul><p>💡 Người được hỏi thường làm mẫu luôn hoặc trả lời ${Z("这样写。","Zhèyàng xiě.")} (viết thế này).</p>`+W1(`Lỗi hay gặp: đặt 怎么 sau động từ theo kiểu tiếng Việt “viết thế nào” ✗ 这个字写怎么？. 怎么 luôn đứng <b>trước</b> động từ. Không thêm 吗 ✗ 这个字怎么写吗？`)},
{h:"4. Biết A, không biết B: ……我会 A，不会 B",b:`<span class="fm">Sự vật ＋ 我 ＋ 会 ＋ V₁，不会 ＋ V₂<small>zhège zì wǒ huì dú, bú huì xiě</small></span><ul><li>${Z("这个字我会读，不会写。","Zhège zì wǒ huì dú, bú huì xiě.")}</li><li>${Z("汉语我会说，不会写。","Hànyǔ wǒ huì shuō, bú huì xiě.")}</li><li>${Z("中国菜我会吃，不会做。","Zhōngguó cài wǒ huì chī, bú huì zuò.")}</li></ul><p>💡 Sự vật đang nói tới (这个字, 汉语) được đưa lên đầu câu làm chủ đề; vế sau không cần nhắc lại 我.</p>`+W1(`Đừng nối hai vế bằng 但是 hay 可是 khi chưa học; chỉ cần dấu phẩy: ${Z("会读，不会写","huì dú, bú huì xiě")}.`)},
{h:"5. Phát âm: thanh 1 kết hợp với các thanh",b:`<span class="fm">Thanh 1 + thanh 1 / 2 / 3 / 4<small>kāfēi · gōngyuán · jīchǎng · chēzhàn</small></span><ul><li>${Z("咖啡","kāfēi")} · ${Z("公园","gōngyuán")} · ${Z("机场","jīchǎng")} · ${Z("车站","chēzhàn")}</li><li>${Z("今天","jīntiān")} · ${Z("今年","jīnnián")} · ${Z("说汉语","shuō Hànyǔ")} · ${Z("中国菜","Zhōngguó cài")}</li></ul><p>💡 Thanh 1 giữ cao và đều suốt âm tiết, không hạ giọng ở cuối. Thanh 3 đứng trước âm tiết khác chỉ đọc nửa (thấp, không lên lại: 211).</p>`+W1(`Người Việt hay đọc thanh 1 thấp như thanh ngang tiếng Việt (shuō nghe như “sua”). Hãy nâng giọng cao hơn bình thường một chút và giữ đều.`)}],
gq:[
{q:"“Tôi biết nói tiếng Trung” nói là:",o:["我会说汉语。|Wǒ huì shuō Hànyǔ.","我会汉语说。|Wǒ huì Hànyǔ shuō.","我说会汉语。|Wǒ shuō huì Hànyǔ."],e:"会 + động từ + tân ngữ."},
{q:"Phủ định của “我会做中国菜” là:",o:["我不会做中国菜。|Wǒ bú huì zuò Zhōngguó cài.","我没会做中国菜。|Wǒ méi huì zuò Zhōngguó cài.","我会不做中国菜。|Wǒ huì bú zuò Zhōngguó cài."],e:"Phủ định của 会 là 不会."},
{q:"“不会” đọc là:",o:["bú huì","bù huì","bū huì"],e:"不 trước thanh 4 đọc thành bú."},
{q:"“Món Trung Quốc rất ngon” nói là:",o:["中国菜很好吃。|Zhōngguó cài hěn hǎochī.","中国菜是好吃。|Zhōngguó cài shì hǎochī.","中国菜好吃很。|Zhōngguó cài hǎochī hěn."],e:"Vị ngữ tính từ: 很 + tính từ, không dùng 是."},
{q:"Hỏi “Chữ này viết thế nào?”:",o:["这个字怎么写？|Zhège zì zěnme xiě?","这个字写怎么？|Zhège zì xiě zěnme?","这个字怎么写吗？|Zhège zì zěnme xiě ma?"],e:"怎么 đứng trước động từ, không thêm 吗."},
{q:"“Chữ này tôi biết đọc, không biết viết”:",o:["这个字我会读，不会写。|Zhège zì wǒ huì dú, bú huì xiě.","这个字我会读，没会写。|Zhège zì wǒ huì dú, méi huì xiě.","这个字我读会，写不会。|Zhège zì wǒ dú huì, xiě bú huì."],e:"会 / 不会 đứng trước động từ."},
{q:"“你妈妈会说汉语吗？” Mẹ không biết, trả lời:",o:["她不会说。|Tā bú huì shuō.","她会不说。|Tā huì bù shuō.","她不说会。|Tā bù shuō huì."],e:"不会 + động từ."},
{q:"Từ nào là tính từ?",o:["好吃|hǎochī","做|zuò","写|xiě"],e:"好吃 (ngon) là tính từ; 做, 写 là động từ."}],
dt:[["你会说汉语吗？","Nǐ huì shuō Hànyǔ ma?"],["我会说汉语。","Wǒ huì shuō Hànyǔ."],["你妈妈会说汉语吗？","Nǐ māma huì shuō Hànyǔ ma?"],["她不会说。","Tā bú huì shuō."],["中国菜好吃吗？","Zhōngguó cài hǎochī ma?"],["中国菜很好吃。","Zhōngguó cài hěn hǎochī."],["你会做中国菜吗？","Nǐ huì zuò Zhōngguó cài ma?"],["我不会做。","Wǒ bú huì zuò."],["这个字怎么写？","Zhège zì zěnme xiě?"],["这个字我会读，不会写。","Zhège zì wǒ huì dú, bú huì xiě."]],
tsort:[
{t:["你","会","说","汉语","吗","？"],ok:["你会说汉语吗？"],p:"Nǐ huì shuō Hànyǔ ma?",e:"会 + động từ; 吗 cuối câu."},
{t:["我","不","会","做","中国菜","。"],ok:["我不会做中国菜。"],p:"Wǒ bú huì zuò Zhōngguó cài.",e:"不会 + động từ."},
{t:["中国菜","很","好吃","。"],ok:["中国菜很好吃。"],p:"Zhōngguó cài hěn hǎochī.",e:"Chủ ngữ + 很 + tính từ."},
{t:["这个","字","怎么","写","？"],ok:["这个字怎么写？"],p:"Zhège zì zěnme xiě?",e:"怎么 + động từ."},
{t:["你","会","写","汉字","吗","？"],ok:["你会写汉字吗？"],p:"Nǐ huì xiě Hànzì ma?",e:"会 + 写 + 汉字."}],
tlis:[
{a:"你会说汉语吗？",o:["我会说汉语。|Wǒ huì shuō Hànyǔ.","中国菜很好吃。|Zhōngguó cài hěn hǎochī.","我家有三口人。|Wǒ jiā yǒu sān kǒu rén."]},
{a:"中国菜好吃吗？",o:["中国菜很好吃。|Zhōngguó cài hěn hǎochī.","我不会做。|Wǒ bú huì zuò.","我会写。|Wǒ huì xiě."]},
{a:"这个字怎么写？",o:["对不起，这个字我会读，不会写。|Duìbuqǐ, zhège zì wǒ huì dú, bú huì xiě.","我会说汉语。|Wǒ huì shuō Hànyǔ.","中国菜很好吃。|Zhōngguó cài hěn hǎochī."]},
{a:"中国菜很好吃，我会吃，不会做。",qz:"他会做中国菜吗？",qp:"Tā huì zuò Zhōngguó cài ma?",o:["不会|bú huì","会|huì","很好吃|hěn hǎochī"]},
{a:"我会说汉语，我妈妈不会说汉语。",qz:"谁不会说汉语？",qp:"Shéi bú huì shuō Hànyǔ?",o:["他妈妈|tā māma","他|tā","他爸爸|tā bàba"]}],
sit:[
{title:"Tình huống 1 · Ở trường: em có biết nói tiếng Trung không?",ctx:"Thầy giáo hỏi một em học sinh và mẹ em có biết nói tiếng Trung không.",turns:[
{w:"A",vi:"Hỏi em có biết nói tiếng Trung không.",h:[["你","nǐ"],["会说","huì shuō"],["汉语","Hànyǔ"],["吗","ma"]],r:["你会说汉语吗？","Nǐ huì shuō Hànyǔ ma?","Em có biết nói tiếng Trung Quốc không?"]},
{w:"B",vi:"Trả lời mình biết nói tiếng Trung.",h:[["我","wǒ"],["会说","huì shuō"],["汉语","Hànyǔ"]],r:["我会说汉语。","Wǒ huì shuō Hànyǔ.","Em có biết."]},
{w:"A",vi:"Hỏi mẹ em có biết nói tiếng Trung không.",h:[["你妈妈","nǐ māma"],["会说汉语","huì shuō Hànyǔ"],["吗","ma"]],r:["你妈妈会说汉语吗？","Nǐ māma huì shuō Hànyǔ ma?","Mẹ em biết nói tiếng Trung Quốc không?"]},
{w:"B",vi:"Trả lời mẹ không biết nói.",h:[["她","tā"],["不会","bú huì"],["说","shuō"]],r:["她不会说。","Tā bú huì shuō.","Mẹ em thì không."]}]},
{title:"Tình huống 2 · Trong nhà bếp: món ăn Trung Quốc",ctx:"Hai người nói chuyện về món ăn Trung Quốc.",turns:[
{w:"A",vi:"Hỏi món Trung Quốc có ngon không.",h:[["中国菜","Zhōngguó cài"],["好吃","hǎochī"],["吗","ma"]],r:["中国菜好吃吗？","Zhōngguó cài hǎochī ma?","Món ăn Trung Quốc có ngon không?"]},
{w:"B",vi:"Trả lời rất ngon.",h:[["中国菜","Zhōngguó cài"],["很","hěn"],["好吃","hǎochī"]],r:["中国菜很好吃。","Zhōngguó cài hěn hǎochī.","Rất ngon."]},
{w:"A",vi:"Hỏi bạn có biết nấu món Trung Quốc không.",h:[["你","nǐ"],["会做","huì zuò"],["中国菜","Zhōngguó cài"],["吗","ma"]],r:["你会做中国菜吗？","Nǐ huì zuò Zhōngguó cài ma?","Anh có biết nấu món Trung Quốc không?"]},
{w:"B",vi:"Trả lời mình không biết nấu.",h:[["我","wǒ"],["不会","bú huì"],["做","zuò"]],r:["我不会做。","Wǒ bú huì zuò.","Tôi không biết."]}]},
{title:"Tình huống 3 · Ở thư viện: chữ này viết thế nào?",ctx:"Hai bạn hỏi nhau cách viết một chữ Hán.",turns:[
{w:"A",vi:"Hỏi bạn có biết viết chữ Hán không.",h:[["你","nǐ"],["会写","huì xiě"],["汉字","Hànzì"],["吗","ma"]],r:["你会写汉字吗？","Nǐ huì xiě Hànzì ma?","Anh có biết viết chữ Hán không?"]},
{w:"B",vi:"Trả lời mình biết viết.",h:[["我","wǒ"],["会写","huì xiě"]],r:["我会写。","Wǒ huì xiě.","Tôi có biết."]},
{w:"A",vi:"Hỏi chữ này viết thế nào.",h:[["这个字","zhège zì"],["怎么","zěnme"],["写","xiě"]],r:["这个字怎么写？","Zhège zì zěnme xiě?","Vậy chữ này anh viết thế nào?"]},
{w:"B",vi:"Xin lỗi, chữ này mình biết đọc nhưng không biết viết.",h:[["对不起","duìbuqǐ"],["这个字","zhège zì"],["我会读","wǒ huì dú"],["不会写","bú huì xiě"]],r:["对不起，这个字我会读，不会写。","Duìbuqǐ, zhège zì wǒ huì dú, bú huì xiě.","Xin lỗi, chữ này tôi biết đọc chứ không biết viết."]}]},
{title:"Tình huống 4 · Vận dụng: bạn mới ở trung tâm tiếng Trung",ctx:"Em làm quen với một bạn mới ở trung tâm tiếng Trung, hỏi bạn ấy biết làm những gì.",turns:[
{w:"我",vi:"Hỏi bạn có biết nói tiếng Trung không.",h:[["你","nǐ"],["会说汉语","huì shuō Hànyǔ"],["吗","ma"]],r:["你会说汉语吗？","Nǐ huì shuō Hànyǔ ma?","Bạn có biết nói tiếng Trung không?"]},
{w:"同学",vi:"Trả lời mình biết nói, nhưng không biết viết chữ Hán.",h:[["我会说","wǒ huì shuō"],["不会写","bú huì xiě"],["汉字","Hànzì"]],r:["我会说，不会写汉字。","Wǒ huì shuō, bú huì xiě Hànzì.","Mình biết nói, không biết viết chữ Hán."]},
{w:"我",vi:"Hỏi bạn có biết nấu món Việt Nam (越南菜 Yuènán cài) không.",h:[["你","nǐ"],["会做","huì zuò"],["越南菜","Yuènán cài"],["吗","ma"]],r:["你会做越南菜吗？","Nǐ huì zuò Yuènán cài ma?","Bạn có biết nấu món Việt Nam không?"]},
{w:"同学",vi:"Trả lời mình biết nấu; món Việt Nam rất ngon.",h:[["我会做","wǒ huì zuò"],["越南菜","Yuènán cài"],["很好吃","hěn hǎochī"]],r:["我会做。越南菜很好吃。","Wǒ huì zuò. Yuènán cài hěn hǎochī.","Mình biết nấu. Món Việt Nam rất ngon."]},
{w:"我",vi:"Chỉ vào chữ 茶 trong sách, hỏi bạn chữ này đọc thế nào.",h:[["这个字","zhège zì"],["怎么","zěnme"],["读","dú"]],r:["这个字怎么读？","Zhège zì zěnme dú?","Chữ này đọc thế nào?"]},
{w:"同学",vi:"Xin lỗi, chữ này mình không biết đọc.",h:[["对不起","duìbuqǐ"],["这个字","zhège zì"],["我不会读","wǒ bú huì dú"]],r:["对不起，这个字我不会读。","Duìbuqǐ, zhège zì wǒ bú huì dú.","Xin lỗi, chữ này mình không biết đọc."]}]}],
act:[
{title:"双人活动 · Hoạt động theo cặp: em biết làm gì?",ctx:"Hai người một nhóm, hỏi và trả lời theo khả năng thật của bản thân.",
req:["两人一组，根据实际情况进行问答练习。","Liǎng rén yì zǔ, gēnjù shíjì qíngkuàng jìnxíng wèndá liànxí.","Ghép thành từng cặp, luyện tập đặt câu hỏi và sử dụng thông tin về bản thân để trả lời."],
roles:["A","B"],
l:[
["A","你会说汉语吗？","Nǐ huì shuō Hànyǔ ma?","Bạn có biết nói tiếng Trung không?","Hỏi bạn có biết nói tiếng Trung không (ví dụ trong sách)."],
["B","我会说汉语。","Wǒ huì shuō Hànyǔ.","Mình biết nói tiếng Trung.","Trả lời theo thật: 我会…… / 我不会……"],
["A","你会写汉字吗？","Nǐ huì xiě Hànzì ma?","Bạn có biết viết chữ Hán không?","Hỏi bạn có biết viết chữ Hán không."],
["B","我会写汉字。","Wǒ huì xiě Hànzì.","Mình biết viết chữ Hán.","Trả lời theo thật."],
["A","你的汉语名字叫什么？","Nǐ de Hànyǔ míngzi jiào shénme?","Tên tiếng Trung của bạn là gì?","Hỏi tên tiếng Trung của bạn."],
["B","我的汉语名字叫阮明。","Wǒ de Hànyǔ míngzi jiào Ruǎn Míng.","Tên tiếng Trung của mình là Nguyễn Minh.","Nói tên tiếng Trung của mình: 我的汉语名字叫……"],
["A","你会写你的汉语名字吗？","Nǐ huì xiě nǐ de Hànyǔ míngzi ma?","Bạn có biết viết tên tiếng Trung của mình không?","Hỏi bạn có biết viết tên tiếng Trung không."],
["B","我会写。","Wǒ huì xiě.","Mình biết viết.","Trả lời, rồi viết tên mình ra giấy cho bạn xem."]],
note:"Câu hỏi của A theo ví dụ trong sách; câu trả lời của B là câu mẫu (tên 阮明 Ruǎn Míng). Các em trả lời bằng thông tin thật.",
sub:[["Mẫu trả lời",[["我会……","Wǒ huì …","Mình biết …"],["我不会……","Wǒ bú huì …","Mình không biết …"],["我会读，不会写。","Wǒ huì dú, bú huì xiě.","Mình biết đọc, không biết viết."]]]]},
{title:"小组活动 · Hoạt động nhóm: bạn biết nói tiếng gì?",ctx:"Nhóm 3–4 người hỏi nhau biết nói những tiếng gì, ghi vào bảng (họ tên · tiếng Anh · tiếng Pháp · tiếng Trung · tiếng Nhật), rồi cử một bạn báo cáo.",
req:["3~4人一组，互相询问所掌握的言语技能并记录，每组请一位同学报告情况。","Sān dào sì rén yì zǔ, hùxiāng xúnwèn suǒ zhǎngwò de yányǔ jìnéng bìng jìlù, měi zǔ qǐng yí wèi tóngxué bàogào qíngkuàng.","Lập nhóm từ 3 đến 4 người, hỏi về những kỹ năng ngôn ngữ của nhau và ghi lại, sau đó cử một đại diện trình bày."],
roles:["A","B"],
l:[
["A","你会说英语吗？","Nǐ huì shuō Yīngyǔ ma?","Bạn có biết nói tiếng Anh không?","Hỏi bạn có biết nói tiếng Anh không."],
["B","我会说英语。","Wǒ huì shuō Yīngyǔ.","Mình biết nói tiếng Anh.","Trả lời theo thật."],
["A","你会说法语吗？","Nǐ huì shuō Fǎyǔ ma?","Bạn có biết nói tiếng Pháp không?","Hỏi tiếp tiếng Pháp."],
["B","我不会说法语。","Wǒ bú huì shuō Fǎyǔ.","Mình không biết nói tiếng Pháp.","Trả lời theo thật."],
["A","你会说日语吗？","Nǐ huì shuō Rìyǔ ma?","Bạn có biết nói tiếng Nhật không?","Hỏi tiếp tiếng Nhật."],
["B","我不会说日语。","Wǒ bú huì shuō Rìyǔ.","Mình không biết nói tiếng Nhật.","Trả lời theo thật."],
["A","大卫会说英语、法语，不会说汉语、日语。","Dàwèi huì shuō Yīngyǔ, Fǎyǔ, bú huì shuō Hànyǔ, Rìyǔ.","David biết nói tiếng Anh, tiếng Pháp, không biết nói tiếng Trung, tiếng Nhật.","Đại diện nhóm báo cáo theo dòng mẫu trong bảng của sách (大卫 Dàwèi: ✓ Anh, ✓ Pháp, ✗ Trung, ✗ Nhật)."]],
note:"Từ bổ sung và dòng mẫu 大卫 lấy từ sách; các câu hỏi – trả lời là câu mẫu. Các em hỏi thật và điền bảng của nhóm.",
sub:[["Từ vựng bổ sung (sách)",[["英语","Yīngyǔ","tiếng Anh"],["法语","Fǎyǔ","tiếng Pháp"],["日语","Rìyǔ","tiếng Nhật"],["汉语","Hànyǔ","tiếng Trung Quốc"]]]]}]};
GXD["1-6"]={so:[
{t:["你|nǐ","会|huì","说|shuō","汉语|Hànyǔ","吗|ma"],ok:["你会说汉语吗"],f:"你会说汉语吗？",p:"Nǐ huì shuō Hànyǔ ma?",e:"会 + động từ + tân ngữ; 吗 cuối câu."},
{t:["她|tā","不|bú","会|huì","说|shuō"],ok:["她不会说"],f:"她不会说。",p:"Tā bú huì shuō.",e:"不会 + động từ."},
{t:["中国菜|Zhōngguó cài","很|hěn","好吃|hǎochī"],ok:["中国菜很好吃"],f:"中国菜很好吃。",p:"Zhōngguó cài hěn hǎochī.",e:"Chủ ngữ + 很 + tính từ."},
{t:["这个|zhège","字|zì","怎么|zěnme","读|dú"],ok:["这个字怎么读"],f:"这个字怎么读？",p:"Zhège zì zěnme dú?",e:"怎么 + động từ."},
{t:["我|wǒ","会|huì","读|dú","不|bú","会|huì","写|xiě"],ok:["我会读不会写"],f:"我会读，不会写。",p:"Wǒ huì dú, bú huì xiě.",e:"会 V₁，不会 V₂."}],
tr:[
{vi:"Bạn có biết nói tiếng Trung không?",a:["你会说汉语吗"],r:["你会说汉语吗？","Nǐ huì shuō Hànyǔ ma?"]},
{vi:"Tôi không biết nấu món Trung Quốc.",a:["我不会做中国菜"],r:["我不会做中国菜。","Wǒ bú huì zuò Zhōngguó cài."]},
{vi:"Món Trung Quốc rất ngon.",a:["中国菜很好吃"],r:["中国菜很好吃。","Zhōngguó cài hěn hǎochī."]},
{vi:"Chữ này viết thế nào?",a:["这个字怎么写","这个汉字怎么写"],r:["这个字怎么写？","Zhège zì zěnme xiě?"]},
{vi:"Chữ này tôi biết đọc, không biết viết.",a:["这个字我会读不会写","这个字我会读，不会写","这个汉字我会读不会写","这个汉字我会读，不会写"],r:["这个字我会读，不会写。","Zhège zì wǒ huì dú, bú huì xiě."]}],
pc:[
{img:"h1cb6a",req:"Mọi người trong tranh đều biết nói tiếng Trung (gợi ý trong sách: 我们都会___。 · 都 dōu: đều).",kw:[{l:"会",m:[["会","hui"]]},{l:"说汉语",m:[["说汉语","shuohanyu"]]}],r:[["我们都会说汉语。","Wǒmen dōu huì shuō Hànyǔ.","Chúng tôi đều biết nói tiếng Trung Quốc."]]},
{img:"h1cb6b",req:"Hai người đang ăn món Trung Quốc và khen ngon (gợi ý trong sách: 中国菜很___。).",kw:[{l:"很",m:[["很","hen"]]},{l:"好吃",m:[["好吃","haochi"]]}],r:[["中国菜很好吃。","Zhōngguó cài hěn hǎochī.","Món ăn Trung Quốc rất ngon."]]},
{img:"h1cb6c",req:"Đầu bếp trong tranh biết nấu món Trung Quốc (gợi ý trong sách: 他会做___。).",kw:[{l:"会做",m:[["会做","huizuo"]]},{l:"中国菜",m:[["中国菜","zhongguocai"]]}],r:[["他会做中国菜。","Tā huì zuò Zhōngguó cài.","Anh ấy biết nấu món ăn Trung Quốc."]]},
{img:"h1cb6d",req:"Chữ 床 trong tranh: em biết đọc nhưng không biết viết (gợi ý trong sách: 这个汉字我会___，不会___。).",kw:[{l:"会读",m:[["会读","huidu"]]},{l:"不会写",m:[["不会写","buhuixie"]]}],r:[["这个汉字我会读，不会写。","Zhège Hànzì wǒ huì dú, bú huì xiě.","Chữ Hán này tôi biết đọc, không biết viết."]]}]};
var TKP=Object.assign(window.TKP||{},{"你":"nǐ","我":"wǒ","她":"tā","会":"huì","不":"bú","说":"shuō","汉语":"Hànyǔ","吗":"ma","做":"zuò","中国菜":"Zhōngguó cài","很":"hěn","好吃":"hǎochī","这个":"zhège","字":"zì","怎么":"zěnme","写":"xiě","读":"dú","汉字":"Hànzì"});
