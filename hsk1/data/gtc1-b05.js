/* ===== Giáo trình chuẩn HSK 1 · Bài 5: 她女儿今年二十岁 (sách trang 42–51) =====
   Bản scan cô gửi 15/11 thiếu trang 44–45 (Chú thích 注释 + Bài tập 练习): ngữ pháp soạn theo các điểm của bài khóa;
   tranh miêu tả lấy ảnh ở phần Khởi động và Bài khóa (img/gx/h1cb5a–d). ===== */
LD1[5]={t:"她女儿今年二十岁",tp:"Tā nǚ'ér jīnnián èrshí suì",vi:"Con gái cô ấy năm nay 20 tuổi",
gpNote:"Bản scan thiếu 2 trang Chú thích (注释) và Bài tập của bài này, nên phần ngữ pháp soạn theo các điểm có trong bài khóa: đại từ nghi vấn 几, số đếm dưới 100, trợ từ 了 cuối câu, hỏi tuổi bằng 多大; thêm âm cuốn lưỡi 儿 và dấu cách âm (mục Ghép âm), kèm lỗi người Việt hay mắc.",
goals:["Hỏi và nói số người trong gia đình: 你家有几口人？— 我家有三口人。","Hỏi và nói tuổi: 你女儿几岁了？(trẻ nhỏ) · 李老师多大了？(người lớn) — 她今年……岁了。","Đếm và đọc đúng các số từ 1 đến 99; đọc đúng âm cuốn lưỡi 儿 (小孩儿) và dấu cách âm (女儿 nǚ'ér)."],
texts:[
{ctx:"在学校 · Ở trường: hai người hỏi nhau về gia đình.",a:"c5-1",l:[
["A","你家有几口人？","Nǐ jiā yǒu jǐ kǒu rén?","Nhà anh có mấy người vậy?"],
["B","我家有三口人。","Wǒ jiā yǒu sān kǒu rén.","Nhà tôi có ba người."]]},
{ctx:"在办公室 · Trong văn phòng: đồng nghiệp hỏi tuổi con gái nhỏ của nhau.",a:"c5-2",l:[
["A","你女儿几岁了？","Nǐ nǚ'ér jǐ suì le?","Con gái của cô mấy tuổi rồi?"],
["B","她今年四岁了。","Tā jīnnián sì suì le.","Năm nay cháu được bốn tuổi rồi."]]},
{ctx:"在办公室 · Trong văn phòng: hai người nói chuyện về cô Lý và con gái cô ấy.",a:"c5-3",l:[
["A","李老师多大了？","Lǐ lǎoshī duō dà le?","Cô Lý bao nhiêu tuổi rồi?"],
["B","她今年50岁了。","Tā jīnnián wǔshí suì le.","Năm nay cô ấy 50 tuổi rồi."],
["A","她女儿呢？","Tā nǚ'ér ne?","Còn con gái cô ấy?"],
["B","她女儿今年20岁。","Tā nǚ'ér jīnnián èrshí suì.","Con gái cô ấy năm nay 20 tuổi."]]}],
words:[
["家","jiā","danh từ","nhà",0],["有","yǒu","động từ","có",0],["口","kǒu","lượng từ","lượng từ, dùng cho người (đếm người trong gia đình)",0],
["女儿","nǚ'ér","danh từ","con gái",1],["几","jǐ","đại từ","mấy",1],["岁","suì","lượng từ","tuổi",1],["了","le","trợ từ","dùng ở giữa hay cuối câu để chỉ sự thay đổi hoặc tình huống mới",1],["今年","jīnnián","danh từ","năm nay",1],
["多","duō","phó từ","(chỉ mức độ) bao nhiêu (多大 duō dà: bao nhiêu tuổi)",2],["大","dà","tính từ","lớn",2]],
gp:[
{h:"1. Đại từ nghi vấn 几",b:`<span class="fm">几 ＋ lượng từ ＋ danh từ？<small>jǐ + … ?</small></span><p>Hỏi số lượng, thường là số <b>dưới 10</b>. Sau 几 phải có lượng từ.</p><ul><li>${Z("你家有几口人？","Nǐ jiā yǒu jǐ kǒu rén?")} → ${Z("我家有三口人。","Wǒ jiā yǒu sān kǒu rén.")}</li><li>${Z("你女儿几岁了？","Nǐ nǚ'ér jǐ suì le?")} → ${Z("她今年四岁了。","Tā jīnnián sì suì le.")}</li></ul><p>💡 Trả lời: thay 几 bằng con số, giữ nguyên lượng từ (口, 岁). Đếm người trong gia đình dùng lượng từ <b>口</b>.</p>`+W1(`Lỗi hay gặp: bỏ lượng từ ✗ 你家有几人？ · ✗ 我家有三人。 Phải nói ${Z("几口人","jǐ kǒu rén")} / ${Z("三口人","sān kǒu rén")}. Câu có 几 đã là câu hỏi, không thêm 吗 ✗ 你家有几口人吗？`)},
{h:"2. Số đếm dưới 100",b:`<span class="fm">Số chục ＋ 十 ＋ số đơn vị<small>èr + shí + wǔ = 二十五 (25)</small></span><ul><li>${Z("十一","shíyī")} (11) · ${Z("十五","shíwǔ")} (15) · ${Z("十九","shíjiǔ")} (19)</li><li>${Z("二十","èrshí")} (20) · ${Z("二十四","èrshísì")} (24) · ${Z("五十","wǔshí")} (50)</li><li>${Z("七十","qīshí")} (70) · ${Z("九十九","jiǔshíjiǔ")} (99)</li></ul><p>💡 Giống tiếng Việt: “hai mươi lăm” = 二 (hai) + 十 (mươi) + 五 (lăm). Số 10–19 nói thẳng 十 + đơn vị, không thêm 一 ở đầu.</p>`+W1(`Lỗi hay gặp: bỏ 十 ✗ 二五 (25) — đúng là ${Z("二十五","èrshíwǔ")}; nói ✗ 一十五 (15) — đúng là ${Z("十五","shíwǔ")}; nói ✗ 两十 (20) — đúng là ${Z("二十","èrshí")}. Đọc 十 là <b>shí</b> (sh uốn lưỡi), đừng đọc thành “sư” hay “xư”.`)},
{h:"3. Trợ từ 了 cuối câu: thay đổi, tình huống mới",b:`<span class="fm">Chủ ngữ ＋ (今年) ＋ số ＋ 岁 ＋ 了<small>… suì le</small></span><p>了 cuối câu cho biết tình hình đã thay đổi so với trước, giống “rồi” trong tiếng Việt.</p><ul><li>${Z("她今年四岁了。","Tā jīnnián sì suì le.")} (năm ngoái mới 3 tuổi, nay đã 4)</li><li>${Z("李老师今年50岁了。","Lǐ lǎoshī jīnnián wǔshí suì le.")}</li><li>${Z("你女儿几岁了？","Nǐ nǚ'ér jǐ suì le?")}</li></ul><p>💡 Chỉ nêu tuổi bình thường thì có thể không dùng 了: ${Z("她女儿今年20岁。","Tā nǚ'ér jīnnián èrshí suì.")}</p>`+W1(`Lỗi hay gặp: đặt 了 ngay sau chủ ngữ hoặc trước số ✗ 她了四岁 · ✗ 她今年了四岁. 了 đứng <b>cuối câu</b>, sau 岁. 了 đọc nhẹ là <b>le</b>, không đọc liǎo.`)},
{h:"4. Hỏi tuổi: 几岁 · 多大",b:`<span class="fm">Trẻ nhỏ: 几岁了？ · Người lớn, bạn bè: 多大了？<small>jǐ suì le? · duō dà le?</small></span><ul><li>${Z("你女儿几岁了？","Nǐ nǚ'ér jǐ suì le?")} (hỏi trẻ em, thường dưới 10 tuổi)</li><li>${Z("李老师多大了？","Lǐ lǎoshī duō dà le?")} → ${Z("她今年50岁了。","Tā jīnnián wǔshí suì le.")}</li><li>${Z("你今年多大了？","Nǐ jīnnián duō dà le?")} → ${Z("我今年二十岁。","Wǒ jīnnián èrshí suì.")}</li></ul><p>💡 多 + tính từ dùng để hỏi mức độ: 多大 = “lớn bao nhiêu” → bao nhiêu tuổi. Câu trả lời không cần 是: ${Z("我二十岁。","Wǒ èrshí suì.")}</p>`+W1(`Lỗi hay gặp: hỏi người lớn tuổi bằng 几岁 (không lịch sự); trả lời thêm 是 ✗ 我是二十岁; bỏ 岁 ✗ 她今年五十. Đáp án đúng: ${Z("她今年五十岁。","Tā jīnnián wǔshí suì.")}`)},
{h:"5. Phát âm: âm cuốn lưỡi 儿 và dấu cách âm (')",b:`<span class="fm">Chữ ＋ 儿 → thêm r vào cuối phiên âm<small>xiǎohái + r = xiǎoháir</small></span><ul><li>${Z("小孩儿","xiǎoháir")} (trẻ con) · ${Z("小鸟儿","xiǎoniǎor")} (con chim) · ${Z("饭馆儿","fànguǎnr")} (quán ăn) · ${Z("香水儿","xiāngshuǐr")} (nước hoa)</li></ul><span class="fm">Âm tiết bắt đầu bằng a, o, e đứng sau âm tiết khác → thêm dấu '<small>nǚ'ér · pí'ǎo · Xī'ān</small></span><ul><li>${Z("女儿","nǚ'ér")} (con gái) — nếu không có dấu ' dễ đọc nhầm.</li><li>pí'ǎo (áo khoác da) ≠ piāo (nổi) · Xī'ān (Tây An) ≠ xiān (trước)</li></ul>`+W1(`儿 cuốn lưỡi đọc liền với âm trước thành <b>một</b> âm tiết (fànguǎnr), không tách thành hai (✗ fànguǎn ér). 女儿 thì 儿 là một âm tiết riêng: nǚ'ér.`)}],
gq:[
{q:"Hỏi “Nhà bạn có mấy người?”:",o:["你家有几口人？|Nǐ jiā yǒu jǐ kǒu rén?","你家有几人？|Nǐ jiā yǒu jǐ rén?","你家有几口人吗？|Nǐ jiā yǒu jǐ kǒu rén ma?"],e:"几 + lượng từ 口 + 人; câu có 几 không thêm 吗."},
{q:"Số 25 viết đúng là:",o:["二十五|èrshíwǔ","二五|èrwǔ","两十五|liǎngshíwǔ"],e:"Số chục + 十 + số đơn vị."},
{q:"Số 15 viết đúng là:",o:["十五|shíwǔ","一十五|yīshíwǔ","五十|wǔshí"],e:"10–19: 十 + đơn vị. 五十 là 50."},
{q:"Hỏi tuổi bé gái 4 tuổi:",o:["你女儿几岁了？|Nǐ nǚ'ér jǐ suì le?","你女儿几了岁？|Nǐ nǚ'ér jǐ le suì?","你女儿几岁吗？|Nǐ nǚ'ér jǐ suì ma?"],e:"几岁了 — 了 cuối câu."},
{q:"Hỏi tuổi cô giáo (lịch sự) dùng:",o:["李老师多大了？|Lǐ lǎoshī duō dà le?","李老师几岁了？|Lǐ lǎoshī jǐ suì le?","李老师大多了？|Lǐ lǎoshī dà duō le?"],e:"Người lớn hỏi bằng 多大; 几岁 dùng cho trẻ nhỏ."},
{q:"“Năm nay cô ấy 50 tuổi rồi” nói là:",o:["她今年五十岁了。|Tā jīnnián wǔshí suì le.","她今年了五十岁。|Tā jīnnián le wǔshí suì.","她是今年五十岁。|Tā shì jīnnián wǔshí suì."],e:"了 đứng cuối câu; tuổi không cần 是."},
{q:"Phiên âm đúng của 女儿 là:",o:["nǚ'ér","nǚér","nǚr"],e:"ér bắt đầu bằng e nên cần dấu cách âm '."},
{q:"Trong câu “她今年四岁了。”, 了 cho biết:",o:["tình hình đã thay đổi (đã 4 tuổi rồi)","câu hỏi","phủ định"],e:"了 cuối câu: thay đổi, tình huống mới."}],
dt:[["你家有几口人？","Nǐ jiā yǒu jǐ kǒu rén?"],["我家有三口人。","Wǒ jiā yǒu sān kǒu rén."],["你女儿几岁了？","Nǐ nǚ'ér jǐ suì le?"],["她今年四岁了。","Tā jīnnián sì suì le."],["李老师多大了？","Lǐ lǎoshī duō dà le?"],["她今年五十岁了。","Tā jīnnián wǔshí suì le."],["她女儿呢？","Tā nǚ'ér ne?"],["她女儿今年二十岁。","Tā nǚ'ér jīnnián èrshí suì."],["我家有六口人。","Wǒ jiā yǒu liù kǒu rén."],["你今年多大了？","Nǐ jīnnián duō dà le?"]],
tsort:[
{t:["你","家","有","几","口","人","？"],ok:["你家有几口人？"],p:"Nǐ jiā yǒu jǐ kǒu rén?",e:"几 + 口 + 人."},
{t:["我","家","有","三","口","人","。"],ok:["我家有三口人。"],p:"Wǒ jiā yǒu sān kǒu rén.",e:"Số + lượng từ 口 + 人."},
{t:["你","女儿","几","岁","了","？"],ok:["你女儿几岁了？"],p:"Nǐ nǚ'ér jǐ suì le?",e:"几岁了 — 了 cuối câu."},
{t:["李老师","多","大","了","？"],ok:["李老师多大了？"],p:"Lǐ lǎoshī duō dà le?",e:"多大了: hỏi tuổi người lớn."},
{t:["她","今年","五十","岁","了","。"],ok:["她今年五十岁了。"],p:"Tā jīnnián wǔshí suì le.",e:"Thời gian 今年 trước số tuổi; 了 cuối câu."}],
tlis:[
{a:"你家有几口人？",o:["我家有三口人。|Wǒ jiā yǒu sān kǒu rén.","她今年四岁了。|Tā jīnnián sì suì le.","我是老师。|Wǒ shì lǎoshī."]},
{a:"你女儿几岁了？",o:["她今年四岁了。|Tā jīnnián sì suì le.","我家有四口人。|Wǒ jiā yǒu sì kǒu rén.","她是我女儿。|Tā shì wǒ nǚ'ér."]},
{a:"李老师多大了？",o:["她今年五十岁了。|Tā jīnnián wǔshí suì le.","她女儿今年二十岁。|Tā nǚ'ér jīnnián èrshí suì.","她是汉语老师。|Tā shì Hànyǔ lǎoshī."]},
{a:"李老师今年五十岁了，她女儿今年二十岁。",qz:"李老师的女儿多大？",qp:"Lǐ lǎoshī de nǚ'ér duō dà?",o:["二十岁|èrshí suì","五十岁|wǔshí suì","四岁|sì suì"]},
{a:"我家有六口人：爸爸、妈妈、哥哥、姐姐、妹妹和我。",qz:"他家有几口人？",qp:"Tā jiā yǒu jǐ kǒu rén?",o:["六口人|liù kǒu rén","三口人|sān kǒu rén","五口人|wǔ kǒu rén"]}],
sit:[
{title:"Tình huống 1 · Ở trường: hỏi về gia đình",ctx:"Hai người hỏi nhau nhà có mấy người.",turns:[
{w:"A",vi:"Hỏi nhà bạn có mấy người.",h:[["你家","nǐ jiā"],["有","yǒu"],["几口人","jǐ kǒu rén"]],r:["你家有几口人？","Nǐ jiā yǒu jǐ kǒu rén?","Nhà anh có mấy người vậy?"]},
{w:"B",vi:"Trả lời nhà mình có ba người.",h:[["我家","wǒ jiā"],["有","yǒu"],["三口人","sān kǒu rén"]],r:["我家有三口人。","Wǒ jiā yǒu sān kǒu rén.","Nhà tôi có ba người."]}]},
{title:"Tình huống 2 · Trong văn phòng: hỏi tuổi con gái nhỏ",ctx:"Đồng nghiệp hỏi tuổi con gái của nhau.",turns:[
{w:"A",vi:"Hỏi con gái của đồng nghiệp mấy tuổi rồi.",h:[["你女儿","nǐ nǚ'ér"],["几岁","jǐ suì"],["了","le"]],r:["你女儿几岁了？","Nǐ nǚ'ér jǐ suì le?","Con gái của cô mấy tuổi rồi?"]},
{w:"B",vi:"Trả lời năm nay cháu bốn tuổi rồi.",h:[["她","tā"],["今年","jīnnián"],["四岁了","sì suì le"]],r:["她今年四岁了。","Tā jīnnián sì suì le.","Năm nay cháu được bốn tuổi rồi."]}]},
{title:"Tình huống 3 · Trong văn phòng: cô Lý bao nhiêu tuổi?",ctx:"Hai người nói chuyện về tuổi của cô Lý và con gái cô ấy.",turns:[
{w:"A",vi:"Hỏi cô Lý bao nhiêu tuổi rồi.",h:[["李老师","Lǐ lǎoshī"],["多大","duō dà"],["了","le"]],r:["李老师多大了？","Lǐ lǎoshī duō dà le?","Cô Lý bao nhiêu tuổi rồi?"]},
{w:"B",vi:"Trả lời năm nay cô ấy 50 tuổi rồi.",h:[["她","tā"],["今年","jīnnián"],["五十岁了","wǔshí suì le"]],r:["她今年五十岁了。","Tā jīnnián wǔshí suì le.","Năm nay cô ấy 50 tuổi rồi."]},
{w:"A",vi:"Hỏi còn con gái cô ấy thì sao.",h:[["她女儿","tā nǚ'ér"],["呢","ne"]],r:["她女儿呢？","Tā nǚ'ér ne?","Còn con gái cô ấy?"]},
{w:"B",vi:"Trả lời con gái cô ấy năm nay 20 tuổi.",h:[["她女儿","tā nǚ'ér"],["今年","jīnnián"],["二十岁","èrshí suì"]],r:["她女儿今年二十岁。","Tā nǚ'ér jīnnián èrshí suì.","Con gái cô ấy năm nay 20 tuổi."]}]},
{title:"Tình huống 4 · Vận dụng: làm quen gia đình bạn cùng lớp",ctx:"Giờ ra chơi, em hỏi bạn cùng lớp về gia đình bạn ấy.",turns:[
{w:"我",vi:"Hỏi nhà bạn có mấy người.",h:[["你家","nǐ jiā"],["有","yǒu"],["几口人","jǐ kǒu rén"]],r:["你家有几口人？","Nǐ jiā yǒu jǐ kǒu rén?","Nhà bạn có mấy người?"]},
{w:"同学",vi:"Trả lời nhà mình có bốn người.",h:[["我家","wǒ jiā"],["有","yǒu"],["四口人","sì kǒu rén"]],r:["我家有四口人。","Wǒ jiā yǒu sì kǒu rén.","Nhà mình có bốn người."]},
{w:"我",vi:"Hỏi mẹ bạn bao nhiêu tuổi rồi.",h:[["你妈妈","nǐ māma"],["多大","duō dà"],["了","le"]],r:["你妈妈多大了？","Nǐ māma duō dà le?","Mẹ bạn bao nhiêu tuổi rồi?"]},
{w:"同学",vi:"Trả lời năm nay mẹ 45 tuổi rồi.",h:[["她","tā"],["今年","jīnnián"],["四十五岁了","sìshíwǔ suì le"]],r:["她今年四十五岁了。","Tā jīnnián sìshíwǔ suì le.","Năm nay mẹ mình 45 tuổi rồi."]},
{w:"我",vi:"Hỏi năm nay bạn bao nhiêu tuổi.",h:[["你","nǐ"],["今年","jīnnián"],["多大了","duō dà le"]],r:["你今年多大了？","Nǐ jīnnián duō dà le?","Năm nay bạn bao nhiêu tuổi?"]},
{w:"同学",vi:"Trả lời năm nay mình 19 tuổi.",h:[["我","wǒ"],["今年","jīnnián"],["十九岁","shíjiǔ suì"]],r:["我今年十九岁。","Wǒ jīnnián shíjiǔ suì.","Năm nay mình 19 tuổi."]}]}],
act:[
{title:"双人活动 · Hoạt động theo cặp: hỏi về gia đình",ctx:"Hai người một nhóm, hỏi và trả lời theo tình hình thật của bản thân: nhà có mấy người, bố mẹ bao nhiêu tuổi.",
req:["两人一组，根据实际情况进行问答练习。","Liǎng rén yì zǔ, gēnjù shíjì qíngkuàng jìnxíng wèndá liànxí.","Ghép thành từng cặp, luyện tập đặt câu hỏi và sử dụng thông tin về bản thân để trả lời."],
roles:["A","B"],
l:[
["A","你家有几口人？","Nǐ jiā yǒu jǐ kǒu rén?","Nhà bạn có mấy người?","Hỏi nhà bạn có mấy người (ví dụ trong sách)."],
["B","我家有五口人。","Wǒ jiā yǒu wǔ kǒu rén.","Nhà mình có năm người.","Trả lời theo nhà mình: 我家有……口人。"],
["A","你今年多大了？","Nǐ jīnnián duō dà le?","Năm nay bạn bao nhiêu tuổi?","Hỏi tuổi của bạn (ví dụ trong sách)."],
["B","我今年二十岁。","Wǒ jīnnián èrshí suì.","Năm nay mình 20 tuổi.","Trả lời tuổi thật của mình."],
["A","你爸爸今年多大了？","Nǐ bàba jīnnián duō dà le?","Bố bạn năm nay bao nhiêu tuổi?","Hỏi tuổi bố của bạn."],
["B","我爸爸今年五十岁。","Wǒ bàba jīnnián wǔshí suì.","Bố mình năm nay 50 tuổi.","Trả lời: 我爸爸今年……岁。"],
["A","你妈妈呢？","Nǐ māma ne?","Còn mẹ bạn?","Hỏi tiếp về mẹ bằng 呢."],
["B","我妈妈今年四十八岁。","Wǒ māma jīnnián sìshíbā suì.","Mẹ mình năm nay 48 tuổi.","Trả lời tuổi của mẹ."]],
note:"Lượt 1–4 theo ví dụ trong sách; lượt 5–8 là câu mẫu nối tiếp. Các em thay bằng thông tin thật của gia đình mình.",
sub:[["Từ vựng bổ sung (sách)",[["爷爷","yéye","ông nội"],["奶奶","nǎinai","bà nội"],["爸爸","bàba","bố"],["妈妈","māma","mẹ"],["哥哥","gēge","anh trai"],["姐姐","jiějie","chị gái"],["弟弟","dìdi","em trai"],["妹妹","mèimei","em gái"]]]]},
{title:"小组活动 · Hoạt động nhóm: giới thiệu ảnh gia đình",ctx:"Nhóm 3–4 người. Mỗi bạn chuẩn bị một tấm ảnh cả gia đình, giới thiệu với nhóm: nhà có mấy người, đây là ai, tên gì, năm nay bao nhiêu tuổi.",
req:["3~4人一组，每人准备一张自己全家的合影，向同组成员介绍家庭成员的情况。","Sān dào sì rén yì zǔ, měi rén zhǔnbèi yì zhāng zìjǐ quánjiā de héyǐng, xiàng tóng zǔ chéngyuán jièshào jiātíng chéngyuán de qíngkuàng.","Lập nhóm từ 3 đến 4 người. Mỗi người chuẩn bị một tấm ảnh chụp cả gia đình mình và giới thiệu với nhóm về các thành viên trong gia đình."],
roles:["A","B"],
l:[
["A","我家有四口人。","Wǒ jiā yǒu sì kǒu rén.","Nhà mình có bốn người.","Mở đầu: 我家有……口人。"],
["A","这是我爸爸，他今年五十二岁了。","Zhè shì wǒ bàba, tā jīnnián wǔshí'èr suì le.","Đây là bố mình, năm nay bố 52 tuổi rồi.","Giới thiệu bố: 这是我……，他今年……岁了。"],
["A","这是我妈妈，她今年四十八岁了。","Zhè shì wǒ māma, tā jīnnián sìshíbā suì le.","Đây là mẹ mình, năm nay mẹ 48 tuổi rồi.","Giới thiệu mẹ."],
["A","这是我妹妹，她叫阮兰，她今年十岁了。","Zhè shì wǒ mèimei, tā jiào Ruǎn Lán, tā jīnnián shí suì le.","Đây là em gái mình, em ấy tên là Nguyễn Lan, năm nay 10 tuổi rồi.","Giới thiệu em: ……叫……，他/她今年……岁了。"],
["B","你妹妹几岁了？","Nǐ mèimei jǐ suì le?","Em gái bạn mấy tuổi rồi?","Bạn trong nhóm hỏi lại tuổi em gái (trẻ nhỏ dùng 几岁)."],
["A","她今年十岁了。","Tā jīnnián shí suì le.","Năm nay em ấy 10 tuổi rồi.","Trả lời."]],
note:"Khung câu theo ví dụ trong sách (我家有……人。这是我……，……叫……，他/她是……，他/她今年……了。). Câu mẫu và tên 阮兰 do cô soạn để tham khảo; các em giới thiệu gia đình thật của mình.",
sub:[["Khung câu",[["我家有……口人。","Wǒ jiā yǒu … kǒu rén.","Nhà mình có … người."],["这是我……","Zhè shì wǒ …","Đây là … của mình."],["他/她叫……","Tā jiào …","Anh ấy / cô ấy tên là …"],["他/她今年……岁了。","Tā jīnnián … suì le.","Năm nay … tuổi rồi."]]]]}]};
GXD["1-5"]={so:[
{t:["你|nǐ","家|jiā","有|yǒu","几|jǐ","口|kǒu","人|rén"],ok:["你家有几口人"],f:"你家有几口人？",p:"Nǐ jiā yǒu jǐ kǒu rén?",e:"几 + lượng từ 口 + 人."},
{t:["她|tā","今年|jīnnián","四|sì","岁|suì","了|le"],ok:["她今年四岁了"],f:"她今年四岁了。",p:"Tā jīnnián sì suì le.",e:"了 cuối câu: đã 4 tuổi rồi."},
{t:["李老师|Lǐ lǎoshī","多|duō","大|dà","了|le"],ok:["李老师多大了"],f:"李老师多大了？",p:"Lǐ lǎoshī duō dà le?",e:"多大了: hỏi tuổi người lớn."},
{t:["我|wǒ","家|jiā","有|yǒu","三|sān","口|kǒu","人|rén"],ok:["我家有三口人"],f:"我家有三口人。",p:"Wǒ jiā yǒu sān kǒu rén.",e:"Số + 口 + 人."},
{t:["她|tā","女儿|nǚ'ér","今年|jīnnián","二十|èrshí","岁|suì"],ok:["她女儿今年二十岁"],f:"她女儿今年二十岁。",p:"Tā nǚ'ér jīnnián èrshí suì.",e:"Câu nói tuổi không cần 是."}],
tr:[
{vi:"Nhà bạn có mấy người?",a:["你家有几口人"],r:["你家有几口人？","Nǐ jiā yǒu jǐ kǒu rén?"]},
{vi:"Nhà tôi có ba người.",a:["我家有三口人","我家有3口人"],r:["我家有三口人。","Wǒ jiā yǒu sān kǒu rén."]},
{vi:"Con gái bạn mấy tuổi rồi?",a:["你女儿几岁了"],r:["你女儿几岁了？","Nǐ nǚ'ér jǐ suì le?"]},
{vi:"Cô Lý bao nhiêu tuổi rồi?",a:["李老师多大了"],r:["李老师多大了？","Lǐ lǎoshī duō dà le?"]},
{vi:"Năm nay cô ấy 50 tuổi rồi.",a:["她今年五十岁了","她今年50岁了"],r:["她今年五十岁了。","Tā jīnnián wǔshí suì le."]}],
pc:[
{img:"h1cb5a",req:"Gia đình trong tranh có ba người. Hãy nói nhà họ có mấy người (bắt đầu bằng 他家……).",kw:[{l:"有",m:[["有","you"]]},{l:"三口人",m:[["三口人","sankouren"],["3口人","3kouren"]]}],r:[["他家有三口人。","Tā jiā yǒu sān kǒu rén.","Nhà anh ấy có ba người."]]},
{img:"h1cb5b",req:"Bé gái trong tranh năm nay 4 tuổi. Nói tuổi của bé (dùng 今年……了).",kw:[{l:"今年",m:[["今年","jinnian"]]},{l:"四岁了",m:[["四岁了","sisuile"],["4岁了","4suile"]]}],r:[["她今年四岁了。","Tā jīnnián sì suì le.","Năm nay bé 4 tuổi rồi."]]},
{img:"h1cb5c",req:"Cô Lý (bên trái) 50 tuổi, con gái cô ấy (bên phải) 20 tuổi. Nói tuổi của hai người.",kw:[{l:"五十岁",m:[["五十岁","wushisui"],["50岁","50sui"]]},{l:"女儿",m:[["女儿","nver"],["女儿","nüer"]]},{l:"二十岁",m:[["二十岁","ershisui"],["20岁","20sui"]]}],r:[["李老师今年五十岁了，她女儿今年二十岁。","Lǐ lǎoshī jīnnián wǔshí suì le, tā nǚ'ér jīnnián èrshí suì.","Năm nay cô Lý 50 tuổi rồi, con gái cô ấy năm nay 20 tuổi."]]},
{img:"h1cb5d",req:"Bà cụ trong tranh năm nay 70 tuổi (từ gợi ý ở phần Khởi động: 70 岁).",kw:[{l:"今年",m:[["今年","jinnian"]]},{l:"七十岁",m:[["七十岁","qishisui"],["70岁","70sui"]]}],r:[["她今年七十岁了。","Tā jīnnián qīshí suì le.","Năm nay bà ấy 70 tuổi rồi."]]}]};
var TKP=Object.assign(window.TKP||{},{"你":"nǐ","我":"wǒ","她":"tā","家":"jiā","有":"yǒu","几":"jǐ","口":"kǒu","人":"rén","三":"sān","女儿":"nǚ'ér","岁":"suì","了":"le","李老师":"Lǐ lǎoshī","多":"duō","大":"dà","今年":"jīnnián","五十":"wǔshí","二十":"èrshí"});
