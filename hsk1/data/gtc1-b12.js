/* ===== Giáo trình chuẩn HSK 1 · Bài 12: 明天天气怎么样？ (sách trang 102–109) ===== */
LD1[12]={t:"明天天气怎么样？",tp:"Míngtiān tiānqì zěnmeyàng?",vi:"Ngày mai thời tiết thế nào?",
gpNote:"Ngữ pháp lấy từ mục Chú thích (注释) của sách: 怎么样, câu vị ngữ chủ – vị, phó từ 太, động từ năng nguyện 会 (2); thêm cách nói 多 + động từ trong bài khóa 3, kèm lỗi người Việt hay mắc.",
goals:["Hỏi và nói về thời tiết, sức khỏe bằng 怎么样 (明天天气怎么样？ 你身体怎么样？).","Nhận xét mức độ bằng 太……了 / 不太……; nói khả năng xảy ra bằng 会 / 不会 (今天会下雨吗？).","Khuyên người khác bằng 多 + động từ (多吃些水果，多喝水)."],
texts:[
{ctx:"在路上 · Trên đường: hai người nói chuyện về thời tiết Bắc Kinh.",a:"c12-1",l:[
["A","昨天北京的天气怎么样？","Zuótiān Běijīng de tiānqì zěnmeyàng?","Hôm qua thời tiết ở Bắc Kinh thế nào?"],
["B","太热了。","Tài rè le.","Nóng lắm."],
["A","明天呢？明天天气怎么样？","Míngtiān ne? Míngtiān tiānqì zěnmeyàng?","Còn ngày mai thì sao? Thời tiết thế nào?"],
["B","明天天气很好，不冷不热。","Míngtiān tiānqì hěn hǎo, bù lěng bú rè.","Ngày mai thời tiết rất đẹp, không lạnh cũng không nóng."]]},
{ctx:"在健身房 · Ở phòng tập thể dục: trời âm u, hai người hỏi nhau có mưa không.",a:"c12-2",l:[
["A","今天会下雨吗？","Jīntiān huì xià yǔ ma?","Hôm nay có mưa không nhỉ?"],
["B","今天不会下雨。","Jīntiān bú huì xià yǔ.","Hôm nay không mưa đâu."],
["A","王小姐今天会来吗？","Wáng xiǎojiě jīntiān huì lái ma?","Hôm nay cô Vương có đến không nhỉ?"],
["B","不会来，天气太冷了。","Bú huì lái, tiānqì tài lěng le.","Cô ấy không đến đâu, trời lạnh quá mà."]]},
{ctx:"在病房 · Trong phòng bệnh: bác sĩ hỏi thăm sức khỏe bệnh nhân.",a:"c12-3",l:[
["A","你身体怎么样？","Nǐ shēntǐ zěnmeyàng?","Sức khỏe của anh thế nào?"],
["B","我身体不太好。天气太热了，不爱吃饭。","Wǒ shēntǐ bú tài hǎo. Tiānqì tài rè le, bú ài chī fàn.","Tôi không được khỏe lắm. Trời nóng quá, tôi chẳng muốn ăn cơm."],
["A","你多吃些水果，多喝水。","Nǐ duō chī xiē shuǐguǒ, duō hē shuǐ.","Anh hãy ăn thêm một ít trái cây và uống thêm nước nhé."],
["B","谢谢你，医生。","Xièxie nǐ, yīshēng.","Cảm ơn bác sĩ."]]}],
words:[
["天气","tiānqì","danh từ","thời tiết",0],["怎么样","zěnmeyàng","đại từ","như thế nào (hỏi tính chất, tình trạng, cách thức…)",0],["太","tài","phó từ","quá, lắm (太……了 tài…le)",0],["热","rè","tính từ","nóng",0],["冷","lěng","tính từ","lạnh",0],
["下雨","xià yǔ","động từ","có mưa, đổ mưa (下 xià: rơi; 雨 yǔ: mưa)",1],["小姐","xiǎojiě","danh từ","cô",1],["来","lái","động từ","đến, tới",1],
["身体","shēntǐ","danh từ","sức khỏe, cơ thể",2],["爱","ài","động từ","yêu, thích",2],["些","xiē","lượng từ","một ít, một vài",2],["水果","shuǐguǒ","danh từ","trái cây",2],["水","shuǐ","danh từ","nước",2]],
gp:[
{h:"1. Đại từ nghi vấn 怎么样",b:`<span class="fm">Chủ ngữ ＋ 怎么样？<small>… zěnmeyàng?</small></span><p>Dùng để hỏi tình hình, tình trạng.</p><ul><li>${Z("你的汉语怎么样？","Nǐ de Hànyǔ zěnmeyàng?")}</li><li>${Z("你妈妈身体怎么样？","Nǐ māma shēntǐ zěnmeyàng?")}</li><li>${Z("明天天气怎么样？","Míngtiān tiānqì zěnmeyàng?")} → ${Z("明天天气很好。","Míngtiān tiānqì hěn hǎo.")}</li></ul>`+W1(`Lỗi hay gặp: đưa 怎么样 lên đầu ✗ 怎么样明天天气？; thêm 吗 ✗ 明天天气怎么样吗？. 怎么样 luôn đứng cuối câu hỏi.`)},
{h:"2. Câu có vị ngữ là kết cấu chủ – vị",b:`<span class="fm">Chủ ngữ cả câu ＋ (chủ ngữ ＋ vị ngữ)<small>Wǒ + shēntǐ bú tài hǎo.</small></span><ul><li>${Z("我身体不太好。","Wǒ shēntǐ bú tài hǎo.")}</li><li>${Z("明天天气很好。","Míngtiān tiānqì hěn hǎo.")}</li><li>${Z("你身体怎么样？","Nǐ shēntǐ zěnmeyàng?")}</li></ul><p>💡 Chủ ngữ nhỏ (身体, 天气) thường là một bộ phận của chủ ngữ lớn hoặc liên quan đến nó.</p>`+W1(`Lỗi hay gặp: thêm 是 trước tính từ ✗ 我身体是不太好 · ✗ 天气是很热. Vị ngữ là tính từ thì không dùng 是, thường thêm 很.`)},
{h:"3. Phó từ chỉ mức độ 太",b:`<span class="fm">太 ＋ tính từ ＋ 了 · Phủ định: 不太 ＋ tính từ (không có 了)<small>tài … le · bú tài …</small></span><ul><li>${Z("太热了。","Tài rè le.")}</li><li>${Z("天气太冷了。","Tiānqì tài lěng le.")}</li><li>${Z("我身体不太好。","Wǒ shēntǐ bú tài hǎo.")}</li></ul>`+W1(`Lỗi hay gặp: câu khẳng định quên 了 ✗ 天气太冷; câu phủ định lại thêm 了 ✗ 我身体不太好了; đặt sai vị trí ✗ 冷太了.`)},
{h:"4. Động từ năng nguyện 会 (2): khả năng xảy ra",b:`<span class="fm">会 ＋ động từ · 不会 ＋ động từ<small>huì … · bú huì …</small></span><ul><li>${Z("爸爸八点前会回家吗？","Bàba bā diǎn qián huì huí jiā ma?")} — ${Z("会。","Huì.")}</li><li>${Z("明天她会来吗？","Míngtiān tā huì lái ma?")} — ${Z("她会来。","Tā huì lái.")}</li><li>${Z("今天会下雨吗？","Jīntiān huì xià yǔ ma?")} — ${Z("今天不会下雨。","Jīntiān bú huì xià yǔ.")}</li></ul><p>💡 Phân biệt với 会 (1) ở Bài 6: <b>biết</b> (kỹ năng học được) — ${Z("我会说汉语。","Wǒ huì shuō Hànyǔ.")}. Ở bài này 会 = <b>sẽ, có khả năng</b>.</p>`+W1(`不会 đọc là <b>bú huì</b> (不 trước thanh 4). Trả lời ngắn chỉ cần ${Z("会","huì")} / ${Z("不会","bú huì")}.`)},
{h:"5. 多 ＋ động từ: làm thêm, làm nhiều hơn",b:`<span class="fm">多 ＋ động từ ＋ (些) ＋ danh từ<small>duō + … + (xiē) + …</small></span><ul><li>${Z("你多吃些水果，多喝水。","Nǐ duō chī xiē shuǐguǒ, duō hē shuǐ.")}</li><li>${Z("多喝茶。","Duō hē chá.")}</li></ul><p>💡 Dùng để khuyên, dặn. 些 (một ít, một vài) đứng trước danh từ.</p>`+W1(`Người Việt nói “ăn nhiều trái cây” dễ thành ✗ 吃多水果. 多 đứng <b>trước</b> động từ: ${Z("多吃水果","duō chī shuǐguǒ")}.`)}],
gq:[
{q:"Hỏi “Ngày mai thời tiết thế nào?”:",o:["明天天气怎么样？|Míngtiān tiānqì zěnmeyàng?","明天天气怎么样吗？|Míngtiān tiānqì zěnmeyàng ma?","怎么样明天天气？|Zěnmeyàng míngtiān tiānqì?"],e:"怎么样 đứng cuối, không thêm 吗."},
{q:"“Nóng quá!” nói là:",o:["太热了！|Tài rè le!","热太了！|Rè tài le!","太了热！|Tài le rè!"],e:"太 + tính từ + 了."},
{q:"“Tôi không được khỏe lắm” nói là:",o:["我身体不太好。|Wǒ shēntǐ bú tài hǎo.","我身体不太好了。|Wǒ shēntǐ bú tài hǎo le.","我身体是不太好。|Wǒ shēntǐ shì bú tài hǎo."],e:"Phủ định 不太 không dùng 了; tính từ làm vị ngữ không dùng 是."},
{q:"Hỏi “Hôm nay có mưa không?”:",o:["今天会下雨吗？|Jīntiān huì xià yǔ ma?","今天下雨会吗？|Jīntiān xià yǔ huì ma?","今天会吗下雨？|Jīntiān huì ma xià yǔ?"],e:"会 + động từ; 吗 cuối câu."},
{q:"“不会” đọc đúng là:",o:["bú huì","bù huì","bū huì"],e:"不 trước thanh 4 đọc thành bú."},
{q:"Bác sĩ dặn “Ăn thêm trái cây”:",o:["多吃些水果。|Duō chī xiē shuǐguǒ.","吃多些水果。|Chī duō xiē shuǐguǒ.","些多吃水果。|Xiē duō chī shuǐguǒ."],e:"多 đứng trước động từ."},
{q:"“王小姐今天会来吗？” Trả lời phủ định:",o:["不会来。|Bú huì lái.","没会来。|Méi huì lái.","不来会。|Bù lái huì."],e:"Phủ định của 会 là 不会."},
{q:"Trong câu “明天她会来吗？”, 会 có nghĩa là:",o:["sẽ, có khả năng","biết (kỹ năng)","muốn"],e:"会 (2): khả năng xảy ra."}],
dt:[["昨天北京的天气怎么样？","Zuótiān Běijīng de tiānqì zěnmeyàng?"],["太热了。","Tài rè le."],["明天天气怎么样？","Míngtiān tiānqì zěnmeyàng?"],["明天天气很好，不冷不热。","Míngtiān tiānqì hěn hǎo, bù lěng bú rè."],["今天会下雨吗？","Jīntiān huì xià yǔ ma?"],["今天不会下雨。","Jīntiān bú huì xià yǔ."],["王小姐今天会来吗？","Wáng xiǎojiě jīntiān huì lái ma?"],["不会来，天气太冷了。","Bú huì lái, tiānqì tài lěng le."],["你身体怎么样？","Nǐ shēntǐ zěnmeyàng?"],["你多吃些水果，多喝水。","Nǐ duō chī xiē shuǐguǒ, duō hē shuǐ."]],
tsort:[
{t:["明天","天气","怎么样","？"],ok:["明天天气怎么样？"],p:"Míngtiān tiānqì zěnmeyàng?",e:"怎么样 đứng cuối câu."},
{t:["今天","不","会","下雨","。"],ok:["今天不会下雨。"],p:"Jīntiān bú huì xià yǔ.",e:"不会 + động từ."},
{t:["天气","太","冷","了","。"],ok:["天气太冷了。"],p:"Tiānqì tài lěng le.",e:"太 + tính từ + 了."},
{t:["我","身体","不","太","好","。"],ok:["我身体不太好。"],p:"Wǒ shēntǐ bú tài hǎo.",e:"Câu vị ngữ chủ – vị; 不太 + tính từ."},
{t:["你","多","吃","些","水果","。"],ok:["你多吃些水果。"],p:"Nǐ duō chī xiē shuǐguǒ.",e:"多 + động từ + 些 + danh từ."}],
tlis:[
{a:"明天天气怎么样？",o:["明天天气很好，不冷不热。|Míngtiān tiānqì hěn hǎo, bù lěng bú rè.","谢谢你，医生。|Xièxie nǐ, yīshēng.","住三天。|Zhù sān tiān."]},
{a:"今天会下雨吗？",o:["今天不会下雨。|Jīntiān bú huì xià yǔ.","我身体不太好。|Wǒ shēntǐ bú tài hǎo.","下午五点。|Xiàwǔ wǔ diǎn."]},
{a:"你身体怎么样？",o:["我身体不太好。|Wǒ shēntǐ bú tài hǎo.","明天天气很好。|Míngtiān tiānqì hěn hǎo.","今天不会下雨。|Jīntiān bú huì xià yǔ."]},
{a:"王小姐今天不会来，天气太冷了。",qz:"王小姐今天会来吗？",qp:"Wáng xiǎojiě jīntiān huì lái ma?",o:["不会来|bú huì lái","会来|huì lái","下午来|xiàwǔ lái"]},
{a:"我身体不太好。天气太热了，不爱吃饭。",qz:"他身体怎么样？",qp:"Tā shēntǐ zěnmeyàng?",o:["不太好|bú tài hǎo","很好|hěn hǎo","太好了|tài hǎo le"]}],
sit:[
{title:"Tình huống 1 · Trên đường: hỏi thời tiết",ctx:"Hai người nói chuyện về thời tiết Bắc Kinh hôm qua và ngày mai.",turns:[
{w:"A",vi:"Hỏi hôm qua thời tiết Bắc Kinh thế nào.",h:[["昨天","zuótiān"],["北京的","Běijīng de"],["天气","tiānqì"],["怎么样","zěnmeyàng"]],r:["昨天北京的天气怎么样？","Zuótiān Běijīng de tiānqì zěnmeyàng?","Hôm qua thời tiết ở Bắc Kinh thế nào?"]},
{w:"B",vi:"Trả lời: nóng quá.",h:[["太","tài"],["热","rè"],["了","le"]],r:["太热了。","Tài rè le.","Nóng lắm."]},
{w:"A",vi:"Hỏi tiếp thời tiết ngày mai thế nào.",h:[["明天","míngtiān"],["天气","tiānqì"],["怎么样","zěnmeyàng"]],r:["明天天气怎么样？","Míngtiān tiānqì zěnmeyàng?","Ngày mai thời tiết thế nào?"]},
{w:"B",vi:"Nói ngày mai thời tiết rất đẹp, không lạnh không nóng.",h:[["明天天气","míngtiān tiānqì"],["很好","hěn hǎo"],["不冷不热","bù lěng bú rè"]],r:["明天天气很好，不冷不热。","Míngtiān tiānqì hěn hǎo, bù lěng bú rè.","Ngày mai thời tiết rất đẹp, không lạnh cũng không nóng."]}]},
{title:"Tình huống 2 · Ở phòng tập: có mưa không?",ctx:"Trời âm u, hai người hỏi nhau hôm nay có mưa không và cô Vương có đến không.",turns:[
{w:"A",vi:"Hỏi hôm nay có mưa không.",h:[["今天","jīntiān"],["会","huì"],["下雨","xià yǔ"],["吗","ma"]],r:["今天会下雨吗？","Jīntiān huì xià yǔ ma?","Hôm nay có mưa không nhỉ?"]},
{w:"B",vi:"Trả lời hôm nay không mưa đâu.",h:[["今天","jīntiān"],["不会","bú huì"],["下雨","xià yǔ"]],r:["今天不会下雨。","Jīntiān bú huì xià yǔ.","Hôm nay không mưa đâu."]},
{w:"A",vi:"Hỏi hôm nay cô Vương có đến không.",h:[["王小姐","Wáng xiǎojiě"],["今天","jīntiān"],["会来吗","huì lái ma"]],r:["王小姐今天会来吗？","Wáng xiǎojiě jīntiān huì lái ma?","Hôm nay cô Vương có đến không nhỉ?"]},
{w:"B",vi:"Trả lời cô ấy không đến, trời lạnh quá.",h:[["不会来","bú huì lái"],["天气","tiānqì"],["太冷了","tài lěng le"]],r:["不会来，天气太冷了。","Bú huì lái, tiānqì tài lěng le.","Cô ấy không đến đâu, trời lạnh quá mà."]}]},
{title:"Tình huống 3 · Trong phòng bệnh",ctx:"Bác sĩ hỏi thăm sức khỏe bệnh nhân.",turns:[
{w:"A",vi:"Bác sĩ hỏi sức khỏe bệnh nhân thế nào.",h:[["你","nǐ"],["身体","shēntǐ"],["怎么样","zěnmeyàng"]],r:["你身体怎么样？","Nǐ shēntǐ zěnmeyàng?","Sức khỏe của anh thế nào?"]},
{w:"B",vi:"Nói mình không khỏe lắm; trời nóng quá, không muốn ăn cơm.",h:[["我身体","wǒ shēntǐ"],["不太好","bú tài hǎo"],["天气太热了","tiānqì tài rè le"],["不爱吃饭","bú ài chī fàn"]],r:["我身体不太好。天气太热了，不爱吃饭。","Wǒ shēntǐ bú tài hǎo. Tiānqì tài rè le, bú ài chī fàn.","Tôi không được khỏe lắm. Trời nóng quá, tôi chẳng muốn ăn cơm."]},
{w:"A",vi:"Dặn ăn thêm trái cây, uống thêm nước.",h:[["你","nǐ"],["多吃些","duō chī xiē"],["水果","shuǐguǒ"],["多喝水","duō hē shuǐ"]],r:["你多吃些水果，多喝水。","Nǐ duō chī xiē shuǐguǒ, duō hē shuǐ.","Anh hãy ăn thêm trái cây và uống thêm nước nhé."]},
{w:"B",vi:"Cảm ơn bác sĩ.",h:[["谢谢你","xièxie nǐ"],["医生","yīshēng"]],r:["谢谢你，医生。","Xièxie nǐ, yīshēng.","Cảm ơn bác sĩ."]}]},
{title:"Tình huống 4 · Vận dụng: hỏi thăm bạn ở Bắc Kinh",ctx:"Em nhắn tin thoại hỏi thăm một người bạn đang học ở Bắc Kinh.",turns:[
{w:"我",vi:"Hỏi sức khỏe của bạn thế nào.",h:[["你","nǐ"],["身体","shēntǐ"],["怎么样","zěnmeyàng"]],r:["你身体怎么样？","Nǐ shēntǐ zěnmeyàng?","Bạn có khỏe không?"]},
{w:"同学",vi:"Nói mình không khỏe lắm.",h:[["我身体","wǒ shēntǐ"],["不太好","bú tài hǎo"]],r:["我身体不太好。","Wǒ shēntǐ bú tài hǎo.","Mình không khỏe lắm."]},
{w:"我",vi:"Hỏi hôm nay thời tiết Bắc Kinh thế nào.",h:[["今天","jīntiān"],["北京的天气","Běijīng de tiānqì"],["怎么样","zěnmeyàng"]],r:["今天北京的天气怎么样？","Jīntiān Běijīng de tiānqì zěnmeyàng?","Hôm nay thời tiết Bắc Kinh thế nào?"]},
{w:"同学",vi:"Trả lời: lạnh quá.",h:[["太","tài"],["冷","lěng"],["了","le"]],r:["太冷了。","Tài lěng le.","Lạnh quá."]},
{w:"我",vi:"Hỏi ngày mai có mưa không.",h:[["明天","míngtiān"],["会","huì"],["下雨","xià yǔ"],["吗","ma"]],r:["明天会下雨吗？","Míngtiān huì xià yǔ ma?","Ngày mai có mưa không?"]},
{w:"同学",vi:"Trả lời ngày mai không mưa.",h:[["明天","míngtiān"],["不会","bú huì"],["下雨","xià yǔ"]],r:["明天不会下雨。","Míngtiān bú huì xià yǔ.","Ngày mai không mưa đâu."]},
{w:"我",vi:"Dặn bạn uống nhiều nước.",h:[["你","nǐ"],["多","duō"],["喝水","hē shuǐ"]],r:["你多喝水。","Nǐ duō hē shuǐ.","Bạn uống nhiều nước vào nhé."]}]}],
act:[
{title:"双人活动 · Hoạt động theo cặp: nhận xét bằng 太……了",ctx:"Hai người một nhóm, một bạn hỏi 怎么样, bạn kia nhận xét bằng 太……了 hoặc 不太……",
req:["两人一组，用“太……了”做出评价。","Liǎng rén yì zǔ, yòng “tài … le” zuòchū píngjià.","Ghép thành từng cặp, sử dụng cấu trúc 太……了 để đưa ra nhận định về những vấn đề được gợi ý."],
roles:["A","B"],
l:[
["A","她的汉语怎么样？","Tā de Hànyǔ zěnmeyàng?","Tiếng Trung của cô ấy thế nào?","Hỏi tiếng Trung của cô ấy thế nào (ví dụ trong sách)."],
["B","太好了！","Tài hǎo le!","Giỏi lắm!","Nhận xét: rất tốt (hoặc 不太好)."],
["A","北京的天气怎么样？","Běijīng de tiānqì zěnmeyàng?","Thời tiết Bắc Kinh thế nào?","Hỏi thời tiết Bắc Kinh."],
["B","太冷了！","Tài lěng le!","Lạnh quá!","Nhận xét: lạnh quá (hoặc nóng quá)."],
["A","中国菜怎么样？","Zhōngguó cài zěnmeyàng?","Món ăn Trung Quốc thế nào?","Hỏi món ăn Trung Quốc."],
["B","太好吃了！","Tài hǎochī le!","Ngon quá!","Nhận xét: ngon quá."],
["A","那个电影怎么样？","Nàge diànyǐng zěnmeyàng?","Bộ phim đó thế nào?","Hỏi bộ phim đó."],
["B","太好看了！","Tài hǎokàn le!","Hay quá!","Nhận xét: hay quá."],
["A","王老师写的汉字怎么样？","Wáng lǎoshī xiě de Hànzì zěnmeyàng?","Chữ Hán thầy Vương viết thế nào?","Hỏi chữ Hán thầy Vương viết."],
["B","太好了！","Tài hǎo le!","Đẹp quá!","Nhận xét: rất đẹp."]],
note:"Các chủ đề và từ gợi ý (冷 / 热, 好吃, 好看 hǎokàn, 好) lấy từ phần Vận dụng của sách.",
sub:[["Nhận xét",[["太好了！","Tài hǎo le!","Tốt quá!"],["不太好。","Bú tài hǎo.","Không tốt lắm."],["太冷了！","Tài lěng le!","Lạnh quá!"],["太热了！","Tài rè le!","Nóng quá!"],["太好吃了！","Tài hǎochī le!","Ngon quá!"],["太好看了！","Tài hǎokàn le!","Hay quá! / Đẹp quá!"]]]]},
{title:"小组活动 · Hoạt động nhóm: thời tiết các thành phố",ctx:"Nhóm 3–4 người hỏi nhau thời tiết mấy ngày gần đây ở một số thành phố, ghi vào bảng (thành phố · hôm qua · hôm nay · ngày mai), rồi cử một bạn báo cáo.",
req:["3~4人一组，互相询问并记录不同城市最近几天的天气情况，每组请一位同学报告情况。","Sān dào sì rén yì zǔ, hùxiāng xúnwèn bìng jìlù bù tóng chéngshì zuìjìn jǐ tiān de tiānqì qíngkuàng, měi zǔ qǐng yí wèi tóngxué bàogào qíngkuàng.","Lập nhóm từ 3 đến 4 người, hỏi nhau về thời tiết những ngày gần đây ở một số thành phố, ghi lại rồi cử một đại diện trình bày."],
roles:["A","B"],
l:[
["A","昨天北京天气好吗？","Zuótiān Běijīng tiānqì hǎo ma?","Hôm qua thời tiết Bắc Kinh đẹp không?","Hỏi thời tiết Bắc Kinh hôm qua (ví dụ trong sách)."],
["B","昨天很好。不冷不热。","Zuótiān hěn hǎo. Bù lěng bú rè.","Hôm qua rất đẹp. Không lạnh không nóng.","Trả lời: rất đẹp, không lạnh không nóng."],
["A","明天会下雨吗？","Míngtiān huì xià yǔ ma?","Ngày mai có mưa không?","Hỏi ngày mai có mưa không."],
["B","明天不会下雨。","Míngtiān bú huì xià yǔ.","Ngày mai không mưa.","Trả lời: không mưa."],
["A","今天天气怎么样？","Jīntiān tiānqì zěnmeyàng?","Hôm nay thời tiết thế nào?","Hỏi thời tiết hôm nay."],
["B","不太好，太冷了。","Bú tài hǎo, tài lěng le.","Không đẹp lắm, lạnh quá.","Trả lời theo bảng mẫu: hôm nay 不太好."]],
note:"4 lượt đầu là ví dụ trong sách; lượt 5–6 theo bảng mẫu (北京: hôm qua 很好, hôm nay 不太好, ngày mai 不好，很冷). Các em thay bằng thành phố khác.",
sub:[["Thời tiết",[["很好","hěn hǎo","rất đẹp"],["不太好","bú tài hǎo","không đẹp lắm"],["不冷不热","bù lěng bú rè","không lạnh không nóng"],["很冷","hěn lěng","rất lạnh"],["太热了","tài rè le","nóng quá"],["会下雨","huì xià yǔ","sẽ mưa"],["不会下雨","bú huì xià yǔ","không mưa"]]]]}]};
GXD["1-12"]={so:[
{t:["今天|jīntiān","会|huì","下雨|xià yǔ","吗|ma"],ok:["今天会下雨吗"],f:"今天会下雨吗？",p:"Jīntiān huì xià yǔ ma?",e:"会 + động từ; 吗 cuối câu."},
{t:["你|nǐ","身体|shēntǐ","怎么样|zěnmeyàng"],ok:["你身体怎么样"],f:"你身体怎么样？",p:"Nǐ shēntǐ zěnmeyàng?",e:"Câu vị ngữ chủ – vị; 怎么样 cuối câu."},
{t:["天气|tiānqì","太|tài","热|rè","了|le"],ok:["天气太热了"],f:"天气太热了。",p:"Tiānqì tài rè le.",e:"太 + tính từ + 了."},
{t:["王小姐|Wáng xiǎojiě","不|bú","会|huì","来|lái"],ok:["王小姐不会来"],f:"王小姐不会来。",p:"Wáng xiǎojiě bú huì lái.",e:"不会 + động từ."},
{t:["你|nǐ","多|duō","喝|hē","水|shuǐ"],ok:["你多喝水"],f:"你多喝水。",p:"Nǐ duō hē shuǐ.",e:"多 + động từ."}],
tr:[
{vi:"Ngày mai thời tiết thế nào?",a:["明天天气怎么样"],r:["明天天气怎么样？","Míngtiān tiānqì zěnmeyàng?"]},
{vi:"Lạnh quá!",a:["太冷了","天气太冷了"],r:["太冷了！","Tài lěng le!"]},
{vi:"Hôm nay không mưa đâu.",a:["今天不会下雨"],r:["今天不会下雨。","Jīntiān bú huì xià yǔ."]},
{vi:"Tôi không khỏe lắm.",a:["我身体不太好"],r:["我身体不太好。","Wǒ shēntǐ bú tài hǎo."]},
{vi:"Bạn ăn thêm trái cây nhé.",a:["你多吃些水果","你多吃水果","多吃些水果","多吃水果"],r:["你多吃些水果。","Nǐ duō chī xiē shuǐguǒ."]}],
pc:[
{img:"h1cb12a",req:"Mẹ đang ốm, không được khỏe lắm (gợi ý trong sách: 妈妈___不太好。).",kw:[{l:"身体",m:[["身体","shenti"]]},{l:"不太好",m:[["不太好","butaihao"]]}],r:[["妈妈身体不太好。","Māma shēntǐ bú tài hǎo.","Mẹ không được khỏe lắm."]]},
{img:"h1cb12b",req:"Trời trong xanh, ngày mai thời tiết đẹp (gợi ý trong sách: 明天天气很好，不会___。).",kw:[{l:"不会下雨",m:[["不会下雨","buhuixiayu"]]}],r:[["明天天气很好，不会下雨。","Míngtiān tiānqì hěn hǎo, bú huì xià yǔ.","Ngày mai thời tiết rất đẹp, sẽ không mưa."]]},
{img:"h1cb12c",req:"Cô Vương thích ăn trái cây, không thích ăn cơm (gợi ý trong sách: 王小姐爱吃___，不爱吃饭。).",kw:[{l:"水果",m:[["水果","shuiguo"]]}],r:[["王小姐爱吃水果，不爱吃饭。","Wáng xiǎojiě ài chī shuǐguǒ, bú ài chī fàn.","Cô Vương thích ăn trái cây, không thích ăn cơm."]]},
{img:"h1cb12d",req:"Trời nóng, khuyên người trong tranh uống nhiều nước (gợi ý trong sách: 今天天气___，你多喝水。).",kw:[{l:"太热了",m:[["太热了","tairele"]]},{l:"多喝水",m:[["多喝水","duoheshui"]]}],r:[["今天天气太热了，你多喝水。","Jīntiān tiānqì tài rè le, nǐ duō hē shuǐ.","Hôm nay trời nóng quá, bạn uống nhiều nước vào."]]}]};
var TKP=Object.assign(window.TKP||{},{"明天":"míngtiān","今天":"jīntiān","天气":"tiānqì","怎么样":"zěnmeyàng","会":"huì","下雨":"xià yǔ","太":"tài","冷":"lěng","热":"rè","了":"le","身体":"shēntǐ","好":"hǎo","多":"duō","吃":"chī","些":"xiē","水果":"shuǐguǒ"});
