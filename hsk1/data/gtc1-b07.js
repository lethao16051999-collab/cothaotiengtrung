/* ===== Giáo trình chuẩn HSK 1 · Bài 7: 今天几号？ (sách trang 60–67) ===== */
LD1[7]={t:"今天几号？",tp:"Jīntiān jǐ hào?",vi:"Hôm nay là ngày mấy?",
gpNote:"Ngữ pháp lấy từ mục Chú thích (注释) của sách: cách nói ngày tháng (月、日/号、星期), câu vị ngữ danh từ, câu liên động (1) 去 + nơi chốn + làm gì; thêm cách hỏi 几月几号 / 星期几 và phần kết hợp thanh 2 + các thanh (mục Ghép âm), kèm lỗi người Việt hay mắc.",
goals:["Hỏi và nói ngày, tháng, thứ: 今天几号？今天星期几？— 今天9月1号，星期三。","Nói ngày tháng theo thứ tự lớn → nhỏ (tháng → ngày → thứ), không cần 是: 明天9月2号。","Nói đi đâu làm gì bằng câu liên động: 我去学校看书。"],
texts:[
{ctx:"在银行 · Ở ngân hàng: một khách hỏi nhân viên hôm nay ngày mấy, thứ mấy.",a:"c7-1",l:[
["A","请问，今天几号？","Qǐngwèn, jīntiān jǐ hào?","Xin hỏi hôm nay là ngày mấy?"],
["B","今天9月1号。","Jīntiān jiǔ yuè yī hào.","Ngày 1 tháng 9."],
["A","今天星期几？","Jīntiān xīngqī jǐ?","Hôm nay là thứ mấy?"],
["B","星期三。","Xīngqī sān.","Thứ tư."]]},
{ctx:"看日历 · Xem lịch: hai người xem lịch, hỏi ngày hôm qua và ngày mai.",a:"c7-2",l:[
["A","昨天是几月几号？","Zuótiān shì jǐ yuè jǐ hào?","Hôm qua là ngày mấy tháng mấy?"],
["B","昨天是8月31号，星期二。","Zuótiān shì bā yuè sānshíyī hào, xīngqī èr.","Hôm qua là thứ ba, ngày 31 tháng 8."],
["A","明天呢？","Míngtiān ne?","Còn ngày mai?"],
["B","明天是9月2号，星期四。","Míngtiān shì jiǔ yuè èr hào, xīngqī sì.","Ngày mai là thứ năm, ngày 2 tháng 9."]]},
{ctx:"在咖啡馆儿 · Ở quán cà phê: hai bạn hỏi nhau ngày mai thứ bảy có đến trường không.",a:"c7-3",l:[
["A","明天星期六，你去学校吗？","Míngtiān xīngqī liù, nǐ qù xuéxiào ma?","Ngày mai là thứ bảy, bạn có đến trường không?"],
["B","我去学校。","Wǒ qù xuéxiào.","Có, tôi đến trường."],
["A","你去学校做什么？","Nǐ qù xuéxiào zuò shénme?","Bạn đến trường để làm gì?"],
["B","我去学校看书。","Wǒ qù xuéxiào kàn shū.","Để đọc sách."]]}],
words:[
["请","qǐng","động từ","(lịch sự) mời, xin",0],["问","wèn","động từ","hỏi (请问 qǐngwèn: xin hỏi)",0],["今天","jīntiān","danh từ","hôm nay",0],["号","hào","danh từ","ngày",0],["月","yuè","danh từ","tháng",0],["星期","xīngqī","danh từ","tuần, thứ",0],
["昨天","zuótiān","danh từ","hôm qua",1],["明天","míngtiān","danh từ","ngày mai",1],
["去","qù","động từ","đi, đi đến",2],["学校","xuéxiào","danh từ","trường",2],["看","kàn","động từ","nhìn, xem (看书 kàn shū: đọc sách)",2],["书","shū","danh từ","sách",2]],
gp:[
{h:"1. Cách nói ngày tháng (1): 月 → 日/号 → 星期",b:`<span class="fm">… 月 ＋ … 号 ＋ 星期 …<small>jiǔ yuè yī hào, xīngqī sān</small></span><p>Tiếng Trung nói từ đơn vị <b>lớn</b> đến đơn vị <b>nhỏ</b>: tháng → ngày → thứ (ngược với tiếng Việt “thứ tư, ngày 1 tháng 9”). Văn nói thường dùng 号 thay cho 日 (rì).</p><ul><li>${Z("9月1号，星期三。","Jiǔ yuè yī hào, xīngqī sān.")}</li><li>${Z("9月2号，星期四。","Jiǔ yuè èr hào, xīngqī sì.")}</li><li>${Z("8月31号，星期二。","Bā yuè sānshíyī hào, xīngqī èr.")}</li></ul><p>💡 Thứ: 星期一 (thứ hai) … 星期六 (thứ bảy), Chủ nhật là ${Z("星期日","xīngqīrì")} / ${Z("星期天","xīngqītiān")}. Số sau 星期 = số thứ tiếng Việt <b>trừ 1</b>.</p>`+W1(`Lỗi hay gặp: nói theo thứ tự tiếng Việt ✗ 星期三，1号9月; dịch “thứ tư” thành ✗ 星期四 (đúng là ${Z("星期三","xīngqī sān")}); “Chủ nhật” nói ✗ 星期七.`)},
{h:"2. Câu có vị ngữ là danh từ",b:`<span class="fm">Chủ ngữ ＋ danh từ (tuổi, thời gian, ngày tháng)<small>Jīntiān + jiǔ yuè yī hào.</small></span><ul><li>${Z("我的汉语老师33岁。","Wǒ de Hànyǔ lǎoshī sānshísān suì.")}</li><li>${Z("明天星期三。","Míngtiān xīngqī sān.")}</li><li>${Z("今天9月1号。","Jīntiān jiǔ yuè yī hào.")}</li></ul><p>💡 Có thể thêm 是 (昨天是8月31号), nhưng câu khẳng định thường bỏ. Câu <b>phủ định</b> thì phải dùng ${Z("不是","bú shì")}: ${Z("今天不是星期三。","Jīntiān bú shì xīngqī sān.")}</p>`+W1(`Lỗi hay gặp: phủ định thiếu 是 ✗ 今天不星期三. Đúng: ${Z("今天不是星期三。","Jīntiān bú shì xīngqī sān.")}`)},
{h:"3. Câu liên động (1): 去 ＋ nơi chốn ＋ làm gì",b:`<span class="fm">Chủ ngữ ＋ 去 ＋ (nơi chốn) ＋ động từ 2 (làm gì)<small>Wǒ qù xuéxiào kàn shū.</small></span><p>Động từ sau cho biết mục đích của động từ trước. Nơi chốn sau 去 đôi khi có thể lược bỏ.</p><ul><li>${Z("我去中国学习汉语。","Wǒ qù Zhōngguó xuéxí Hànyǔ.")}</li><li>${Z("我们去中国饭馆儿吃中国菜。","Wǒmen qù Zhōngguó fànguǎnr chī Zhōngguó cài.")}</li><li>${Z("我去学校看书。","Wǒ qù xuéxiào kàn shū.")}</li><li>${Z("你去学校做什么？","Nǐ qù xuéxiào zuò shénme?")}</li></ul>`+W1(`Lỗi hay gặp (theo kiểu “đến trường để đọc sách”): ✗ 我看书去学校 · ✗ 我去学校为了看书. Thứ tự đúng: <b>去 + nơi + việc</b>. Hỏi “đi đâu làm gì” thì 做什么 đứng cuối: ${Z("你去学校做什么？","Nǐ qù xuéxiào zuò shénme?")}`)},
{h:"4. Hỏi ngày, thứ: 几月几号？星期几？",b:`<span class="fm">… 几月几号？ · … 星期几？<small>jǐ yuè jǐ hào? · xīngqī jǐ?</small></span><ul><li>${Z("请问，今天几号？","Qǐngwèn, jīntiān jǐ hào?")}</li><li>${Z("昨天是几月几号？","Zuótiān shì jǐ yuè jǐ hào?")}</li><li>${Z("明天星期几？","Míngtiān xīngqī jǐ?")} → ${Z("明天星期四。","Míngtiān xīngqī sì.")}</li></ul><p>💡 Trả lời: thay 几 bằng con số. ${Z("请问","qǐngwèn")} (xin hỏi) đặt ở đầu câu khi hỏi người lạ cho lịch sự.</p>`+W1(`Lỗi hay gặp: ✗ 今天是星期什么？ · ✗ 今天几星期？ Đúng: ${Z("今天星期几？","Jīntiān xīngqī jǐ?")} (几 đứng <b>sau</b> 星期 nhưng đứng <b>trước</b> 月, 号).`)},
{h:"5. Phát âm: thanh 2 kết hợp với các thanh",b:`<span class="fm">Thanh 2 + thanh 1 / 2 / 3 / 4<small>shíjiān · yínháng · cídiǎn · lánsè</small></span><ul><li>${Z("时间","shíjiān")} · ${Z("银行","yínháng")} · ${Z("词典","cídiǎn")} · ${Z("蓝色","lánsè")}</li><li>${Z("昨天","zuótiān")} · ${Z("明天","míngtiān")} · ${Z("学校","xuéxiào")} · ${Z("明年","míngnián")}</li></ul><p>💡 Thanh 2 đi lên từ giữa lên cao (35), giống dấu sắc tiếng Việt nhưng kéo dài và lên đều hơn.</p>`+W1(`Người Việt hay đọc 学校 xuéxiào thành “xuế xeo” hoặc hạ thấp 学. Hãy để 学 đi lên rõ (thanh 2) rồi 校 rơi mạnh từ cao xuống (thanh 4).`)}],
gq:[
{q:"“Thứ tư, ngày 1 tháng 9” nói theo thứ tự đúng là:",o:["9月1号，星期三|jiǔ yuè yī hào, xīngqī sān","星期三，1号9月|xīngqī sān, yī hào jiǔ yuè","1号9月，星期四|yī hào jiǔ yuè, xīngqī sì"],e:"Tháng → ngày → thứ; thứ tư = 星期三."},
{q:"“Chủ nhật” tiếng Trung là:",o:["星期日 / 星期天|xīngqīrì / xīngqītiān","星期七|xīngqī qī","星期一|xīngqī yī"],e:"Không có 星期七."},
{q:"Hỏi “Hôm nay thứ mấy?”:",o:["今天星期几？|Jīntiān xīngqī jǐ?","今天几星期？|Jīntiān jǐ xīngqī?","今天星期什么？|Jīntiān xīngqī shénme?"],e:"星期几 — 几 đứng sau 星期."},
{q:"Phủ định của “今天星期三” là:",o:["今天不是星期三。|Jīntiān bú shì xīngqī sān.","今天不星期三。|Jīntiān bù xīngqī sān.","今天没星期三。|Jīntiān méi xīngqī sān."],e:"Câu vị ngữ danh từ phủ định phải có 不是."},
{q:"“Tôi đến trường để đọc sách” nói là:",o:["我去学校看书。|Wǒ qù xuéxiào kàn shū.","我看书去学校。|Wǒ kàn shū qù xuéxiào.","我学校去看书。|Wǒ xuéxiào qù kàn shū."],e:"去 + nơi chốn + làm gì."},
{q:"Hỏi “Bạn đến trường làm gì?”:",o:["你去学校做什么？|Nǐ qù xuéxiào zuò shénme?","你做什么去学校？|Nǐ zuò shénme qù xuéxiào?","你去学校什么做？|Nǐ qù xuéxiào shénme zuò?"],e:"做什么 đứng sau nơi chốn."},
{q:"Hỏi “Hôm qua là ngày mấy tháng mấy?”:",o:["昨天是几月几号？|Zuótiān shì jǐ yuè jǐ hào?","昨天是几号几月？|Zuótiān shì jǐ hào jǐ yuè?","昨天是月几号几？|Zuótiān shì yuè jǐ hào jǐ?"],e:"几月几号 — tháng trước ngày sau."},
{q:"Ngày mai là ngày 2 tháng 9 nói là:",o:["明天9月2号。|Míngtiān jiǔ yuè èr hào.","明天2号9月。|Míngtiān èr hào jiǔ yuè.","昨天9月2号。|Zuótiān jiǔ yuè èr hào."],e:"明天 = ngày mai; 9月 trước 2号."}],
dt:[["请问，今天几号？","Qǐngwèn, jīntiān jǐ hào?"],["今天九月一号。","Jīntiān jiǔ yuè yī hào."],["今天星期几？","Jīntiān xīngqī jǐ?"],["星期三。","Xīngqī sān."],["昨天是几月几号？","Zuótiān shì jǐ yuè jǐ hào?"],["昨天是八月三十一号，星期二。","Zuótiān shì bā yuè sānshíyī hào, xīngqī èr."],["明天是九月二号，星期四。","Míngtiān shì jiǔ yuè èr hào, xīngqī sì."],["明天星期六，你去学校吗？","Míngtiān xīngqī liù, nǐ qù xuéxiào ma?"],["你去学校做什么？","Nǐ qù xuéxiào zuò shénme?"],["我去学校看书。","Wǒ qù xuéxiào kàn shū."]],
tsort:[
{t:["今天","星期","几","？"],ok:["今天星期几？"],p:"Jīntiān xīngqī jǐ?",e:"星期几 — 几 sau 星期."},
{t:["昨天","是","几","月","几","号","？"],ok:["昨天是几月几号？"],p:"Zuótiān shì jǐ yuè jǐ hào?",e:"几月几号."},
{t:["明天","是","9月","2号","，","星期四","。"],ok:["明天是9月2号，星期四。"],p:"Míngtiān shì jiǔ yuè èr hào, xīngqī sì.",e:"Tháng → ngày → thứ."},
{t:["我","去","学校","看","书","。"],ok:["我去学校看书。"],p:"Wǒ qù xuéxiào kàn shū.",e:"去 + nơi chốn + làm gì."},
{t:["你","去","学校","做","什么","？"],ok:["你去学校做什么？"],p:"Nǐ qù xuéxiào zuò shénme?",e:"做什么 đứng cuối."}],
tlis:[
{a:"请问，今天几号？",o:["今天九月一号。|Jīntiān jiǔ yuè yī hào.","我去学校。|Wǒ qù xuéxiào.","我会说汉语。|Wǒ huì shuō Hànyǔ."]},
{a:"今天星期几？",o:["星期三。|Xīngqī sān.","九月一号。|Jiǔ yuè yī hào.","我去学校看书。|Wǒ qù xuéxiào kàn shū."]},
{a:"你去学校做什么？",o:["我去学校看书。|Wǒ qù xuéxiào kàn shū.","明天星期六。|Míngtiān xīngqī liù.","我不去学校。|Wǒ bú qù xuéxiào."]},
{a:"昨天是八月三十一号，星期二。",qz:"昨天星期几？",qp:"Zuótiān xīngqī jǐ?",o:["星期二|xīngqī èr","星期三|xīngqī sān","星期四|xīngqī sì"]},
{a:"明天星期六，我去学校看书。",qz:"他明天去学校做什么？",qp:"Tā míngtiān qù xuéxiào zuò shénme?",o:["看书|kàn shū","吃中国菜|chī Zhōngguó cài","学习汉语|xuéxí Hànyǔ"]}],
sit:[
{title:"Tình huống 1 · Ở ngân hàng: hôm nay ngày mấy?",ctx:"Một khách hỏi nhân viên ngân hàng hôm nay ngày mấy, thứ mấy.",turns:[
{w:"A",vi:"Xin hỏi hôm nay là ngày mấy.",h:[["请问","qǐngwèn"],["今天","jīntiān"],["几号","jǐ hào"]],r:["请问，今天几号？","Qǐngwèn, jīntiān jǐ hào?","Xin hỏi hôm nay là ngày mấy?"]},
{w:"B",vi:"Trả lời hôm nay ngày 1 tháng 9.",h:[["今天","jīntiān"],["九月","jiǔ yuè"],["一号","yī hào"]],r:["今天九月一号。","Jīntiān jiǔ yuè yī hào.","Ngày 1 tháng 9."]},
{w:"A",vi:"Hỏi hôm nay thứ mấy.",h:[["今天","jīntiān"],["星期几","xīngqī jǐ"]],r:["今天星期几？","Jīntiān xīngqī jǐ?","Hôm nay là thứ mấy?"]},
{w:"B",vi:"Trả lời: thứ tư.",h:[["星期三","xīngqī sān"]],r:["星期三。","Xīngqī sān.","Thứ tư."]}]},
{title:"Tình huống 2 · Xem lịch: hôm qua và ngày mai",ctx:"Hai người xem lịch, hỏi ngày tháng hôm qua và ngày mai.",turns:[
{w:"A",vi:"Hỏi hôm qua là ngày mấy tháng mấy.",h:[["昨天","zuótiān"],["是","shì"],["几月几号","jǐ yuè jǐ hào"]],r:["昨天是几月几号？","Zuótiān shì jǐ yuè jǐ hào?","Hôm qua là ngày mấy tháng mấy?"]},
{w:"B",vi:"Trả lời hôm qua là thứ ba, ngày 31 tháng 8.",h:[["昨天是","zuótiān shì"],["八月三十一号","bā yuè sānshíyī hào"],["星期二","xīngqī èr"]],r:["昨天是八月三十一号，星期二。","Zuótiān shì bā yuè sānshíyī hào, xīngqī èr.","Hôm qua là thứ ba, ngày 31 tháng 8."]},
{w:"A",vi:"Hỏi còn ngày mai thì sao.",h:[["明天","míngtiān"],["呢","ne"]],r:["明天呢？","Míngtiān ne?","Còn ngày mai?"]},
{w:"B",vi:"Trả lời ngày mai là thứ năm, ngày 2 tháng 9.",h:[["明天是","míngtiān shì"],["九月二号","jiǔ yuè èr hào"],["星期四","xīngqī sì"]],r:["明天是九月二号，星期四。","Míngtiān shì jiǔ yuè èr hào, xīngqī sì.","Ngày mai là thứ năm, ngày 2 tháng 9."]}]},
{title:"Tình huống 3 · Ở quán cà phê: thứ bảy có đến trường không?",ctx:"Hai bạn hỏi nhau ngày mai thứ bảy có đến trường không và đến làm gì.",turns:[
{w:"A",vi:"Nói ngày mai thứ bảy, hỏi bạn có đến trường không.",h:[["明天","míngtiān"],["星期六","xīngqī liù"],["你去学校吗","nǐ qù xuéxiào ma"]],r:["明天星期六，你去学校吗？","Míngtiān xīngqī liù, nǐ qù xuéxiào ma?","Ngày mai là thứ bảy, bạn có đến trường không?"]},
{w:"B",vi:"Trả lời mình có đến trường.",h:[["我","wǒ"],["去","qù"],["学校","xuéxiào"]],r:["我去学校。","Wǒ qù xuéxiào.","Có, tôi đến trường."]},
{w:"A",vi:"Hỏi bạn đến trường làm gì.",h:[["你","nǐ"],["去学校","qù xuéxiào"],["做什么","zuò shénme"]],r:["你去学校做什么？","Nǐ qù xuéxiào zuò shénme?","Bạn đến trường để làm gì?"]},
{w:"B",vi:"Trả lời mình đến trường đọc sách.",h:[["我","wǒ"],["去学校","qù xuéxiào"],["看书","kàn shū"]],r:["我去学校看书。","Wǒ qù xuéxiào kàn shū.","Để đọc sách."]}]},
{title:"Tình huống 4 · Vận dụng: hẹn cuối tuần",ctx:"Thứ sáu, em hỏi bạn cùng lớp về ngày mai và rủ bạn đi ăn món Trung Quốc.",turns:[
{w:"我",vi:"Hỏi ngày mai là ngày mấy tháng mấy.",h:[["明天","míngtiān"],["是","shì"],["几月几号","jǐ yuè jǐ hào"]],r:["明天是几月几号？","Míngtiān shì jǐ yuè jǐ hào?","Ngày mai là ngày mấy tháng mấy?"]},
{w:"同学",vi:"Trả lời ngày mai là thứ bảy, ngày 15 tháng 11.",h:[["明天是","míngtiān shì"],["十一月十五号","shíyī yuè shíwǔ hào"],["星期六","xīngqī liù"]],r:["明天是十一月十五号，星期六。","Míngtiān shì shíyī yuè shíwǔ hào, xīngqī liù.","Ngày mai là thứ bảy, ngày 15 tháng 11."]},
{w:"我",vi:"Hỏi ngày mai bạn có đến trường không.",h:[["明天","míngtiān"],["你去学校吗","nǐ qù xuéxiào ma"]],r:["明天你去学校吗？","Míngtiān nǐ qù xuéxiào ma?","Ngày mai bạn có đến trường không?"]},
{w:"同学",vi:"Trả lời không đến trường; mình đi quán ăn Trung Quốc ăn món Trung Quốc.",h:[["我不去学校","wǒ bú qù xuéxiào"],["我去","wǒ qù"],["中国饭馆儿","Zhōngguó fànguǎnr"],["吃中国菜","chī Zhōngguó cài"]],r:["我不去学校，我去中国饭馆儿吃中国菜。","Wǒ bú qù xuéxiào, wǒ qù Zhōngguó fànguǎnr chī Zhōngguó cài.","Mình không đến trường, mình đi quán ăn Trung Quốc ăn món Trung Quốc."]},
{w:"我",vi:"Hỏi Chủ nhật bạn đi đâu làm gì.",h:[["星期日","xīngqīrì"],["你去哪儿","nǐ qù nǎr"],["做什么","zuò shénme"]],r:["星期日你去哪儿做什么？","Xīngqīrì nǐ qù nǎr zuò shénme?","Chủ nhật bạn đi đâu làm gì?"]},
{w:"同学",vi:"Trả lời Chủ nhật mình đến trường đọc sách.",h:[["星期日","xīngqīrì"],["我去学校","wǒ qù xuéxiào"],["看书","kàn shū"]],r:["星期日我去学校看书。","Xīngqīrì wǒ qù xuéxiào kàn shū.","Chủ nhật mình đến trường đọc sách."]}]}],
act:[
{title:"双人活动 · Hoạt động theo cặp: hỏi ngày, thứ và kế hoạch",ctx:"Hai người một nhóm, hỏi và trả lời theo ngày tháng thật của hôm nay và kế hoạch thật của bản thân.",
req:["两人一组，根据实际情况进行问答练习。","Liǎng rén yì zǔ, gēnjù shíjì qíngkuàng jìnxíng wèndá liànxí.","Ghép thành từng cặp, luyện tập đặt câu hỏi và sử dụng thông tin về bản thân cũng như thời gian hiện tại để trả lời."],
roles:["A","B"],
l:[
["A","今天是几月几号？","Jīntiān shì jǐ yuè jǐ hào?","Hôm nay là ngày mấy tháng mấy?","Hỏi hôm nay ngày mấy tháng mấy (ví dụ trong sách)."],
["B","今天是十一月十四号。","Jīntiān shì shíyī yuè shísì hào.","Hôm nay là ngày 14 tháng 11.","Trả lời theo ngày thật của hôm nay."],
["A","今天星期几？","Jīntiān xīngqī jǐ?","Hôm nay thứ mấy?","Hỏi hôm nay thứ mấy."],
["B","今天星期五。","Jīntiān xīngqī wǔ.","Hôm nay thứ sáu.","Trả lời theo thứ thật (nhớ: thứ tiếng Việt trừ 1)."],
["A","明天是几月几号？","Míngtiān shì jǐ yuè jǐ hào?","Ngày mai là ngày mấy tháng mấy?","Hỏi ngày mai."],
["B","明天是十一月十五号。","Míngtiān shì shíyī yuè shíwǔ hào.","Ngày mai là ngày 15 tháng 11.","Trả lời ngày mai."],
["A","明天星期几？","Míngtiān xīngqī jǐ?","Ngày mai thứ mấy?","Hỏi ngày mai thứ mấy."],
["B","明天星期六。","Míngtiān xīngqī liù.","Ngày mai thứ bảy.","Trả lời."],
["A","明天你做什么？","Míngtiān nǐ zuò shénme?","Ngày mai bạn làm gì?","Hỏi kế hoạch ngày mai (ví dụ trong sách)."],
["B","明天我去学校看书。","Míngtiān wǒ qù xuéxiào kàn shū.","Ngày mai mình đến trường đọc sách.","Trả lời: 明天我去……(nơi chốn + việc làm)."]],
note:"Câu hỏi của A theo ví dụ trong sách; câu trả lời của B là câu mẫu (thứ sáu 14/11). Các em trả lời theo ngày tháng thật lúc học.",
sub:[["Thứ trong tuần (sách)",[["星期一","xīngqī yī","thứ hai"],["星期二","xīngqī èr","thứ ba"],["星期三","xīngqī sān","thứ tư"],["星期四","xīngqī sì","thứ năm"],["星期五","xīngqī wǔ","thứ sáu"],["星期六","xīngqī liù","thứ bảy"],["星期日 / 星期天","xīngqīrì / xīngqītiān","chủ nhật"]]]]},
{title:"小组活动 · Hoạt động nhóm: sinh nhật của bạn ngày nào?",ctx:"Nhóm 3–4 người hỏi ngày sinh của nhau, ghi vào bảng (họ tên · ngày sinh), rồi cử một bạn báo cáo.",
req:["3~4人一组，互相询问出生日期并记录，每组请一位同学报告情况。","Sān dào sì rén yì zǔ, hùxiāng xúnwèn chūshēng rìqī bìng jìlù, měi zǔ qǐng yí wèi tóngxué bàogào qíngkuàng.","Lập nhóm từ 3 đến 4 người, hỏi ngày sinh của nhau và ghi lại, sau đó cử một đại diện trình bày những thông tin đã ghi chép."],
roles:["A","B"],
l:[
["A","你的生日是几月几号？","Nǐ de shēngrì shì jǐ yuè jǐ hào?","Sinh nhật của bạn là ngày mấy tháng mấy?","Hỏi ngày sinh của bạn (生日 shēngrì: từ bổ sung trong sách)."],
["B","我的生日是八月三十一号。","Wǒ de shēngrì shì bā yuè sānshíyī hào.","Sinh nhật của mình là ngày 31 tháng 8.","Trả lời theo ngày sinh thật (dòng mẫu trong sách: 李月 8月31号)."],
["A","你叫什么名字？","Nǐ jiào shénme míngzi?","Bạn tên là gì?","Hỏi tên để ghi vào bảng."],
["B","我叫李月。","Wǒ jiào Lǐ Yuè.","Mình tên là Lý Nguyệt.","Trả lời tên."],
["A","李月的生日是八月三十一号。","Lǐ Yuè de shēngrì shì bā yuè sānshíyī hào.","Sinh nhật của Lý Nguyệt là ngày 31 tháng 8.","Đại diện nhóm báo cáo: ……的生日是……月……号。"]],
note:"Từ bổ sung 生日 và dòng mẫu 李月 · 8月31号 lấy từ sách; các câu nối tiếp do cô soạn. Các em hỏi ngày sinh thật của bạn trong nhóm.",
sub:[["Từ vựng bổ sung (sách)",[["生日","shēngrì","ngày sinh / sinh nhật"]]],["Khung câu",[["你的生日是几月几号？","Nǐ de shēngrì shì jǐ yuè jǐ hào?","Sinh nhật bạn ngày mấy tháng mấy?"],["我的生日是……月……号。","Wǒ de shēngrì shì … yuè … hào.","Sinh nhật mình là ngày … tháng …"]]]]}]};
GXD["1-7"]={so:[
{t:["今天|jīntiān","星期|xīngqī","几|jǐ"],ok:["今天星期几"],f:"今天星期几？",p:"Jīntiān xīngqī jǐ?",e:"星期几 — 几 sau 星期."},
{t:["明天|míngtiān","是|shì","几|jǐ","月|yuè","几|jǐ","号|hào"],ok:["明天是几月几号"],f:"明天是几月几号？",p:"Míngtiān shì jǐ yuè jǐ hào?",e:"几月几号: tháng trước, ngày sau."},
{t:["今天|jīntiān","九月|jiǔ yuè","一号|yī hào","星期三|xīngqī sān"],ok:["今天九月一号星期三"],f:"今天九月一号，星期三。",p:"Jīntiān jiǔ yuè yī hào, xīngqī sān.",e:"Tháng → ngày → thứ; không cần 是."},
{t:["我|wǒ","去|qù","学校|xuéxiào","看|kàn","书|shū"],ok:["我去学校看书"],f:"我去学校看书。",p:"Wǒ qù xuéxiào kàn shū.",e:"去 + nơi chốn + làm gì."},
{t:["你|nǐ","去|qù","学校|xuéxiào","做|zuò","什么|shénme"],ok:["你去学校做什么"],f:"你去学校做什么？",p:"Nǐ qù xuéxiào zuò shénme?",e:"做什么 đứng cuối câu."}],
tr:[
{vi:"Xin hỏi hôm nay là ngày mấy?",a:["请问今天几号","请问，今天几号","今天几号"],r:["请问，今天几号？","Qǐngwèn, jīntiān jǐ hào?"]},
{vi:"Hôm nay thứ mấy?",a:["今天星期几"],r:["今天星期几？","Jīntiān xīngqī jǐ?"]},
{vi:"Ngày mai là thứ năm, ngày 2 tháng 9.",a:["明天是9月2号星期四","明天9月2号星期四","明天是九月二号星期四","明天九月二号星期四","明天是9月2号，星期四","明天是九月二号，星期四"],r:["明天是九月二号，星期四。","Míngtiān shì jiǔ yuè èr hào, xīngqī sì."]},
{vi:"Tôi đến trường đọc sách.",a:["我去学校看书"],r:["我去学校看书。","Wǒ qù xuéxiào kàn shū."]},
{vi:"Hôm nay không phải thứ tư.",a:["今天不是星期三"],r:["今天不是星期三。","Jīntiān bú shì xīngqī sān."]}],
pc:[
{img:"h1cb7a",req:"Tờ lịch ngày 1 tháng 1 năm 2013, hôm đó là thứ ba (gợi ý trong sách: 今天是___月___号，星期___。).",kw:[{l:"一月一号",m:[["一月一号","yiyueyihao"],["1月1号","1yue1hao"]]},{l:"星期二",m:[["星期二","xingqier"]]}],r:[["今天是一月一号，星期二。","Jīntiān shì yī yuè yī hào, xīngqī èr.","Hôm nay là thứ ba, ngày 1 tháng 1."]]},
{img:"h1cb7b",req:"Tờ lịch ghi May 18 (gợi ý trong sách: 今天___月___号。).",kw:[{l:"五月",m:[["五月","wuyue"],["5月","5yue"]]},{l:"十八号",m:[["十八号","shibahao"],["18号","18hao"]]}],r:[["今天五月十八号。","Jīntiān wǔ yuè shíbā hào.","Hôm nay ngày 18 tháng 5."]]},
{img:"h1cb7c",req:"Xem lịch: ngày 22 và ngày 23 là thứ mấy? (gợi ý trong sách: 22号是___，23号是___。 · cột Wed = 星期三, Thu = 星期四).",kw:[{l:"星期三",m:[["星期三","xingqisan"]]},{l:"星期四",m:[["星期四","xingqisi"]]}],r:[["二十二号是星期三，二十三号是星期四。","Èrshí'èr hào shì xīngqī sān, èrshísān hào shì xīngqī sì.","Ngày 22 là thứ tư, ngày 23 là thứ năm."]]},
{img:"h1cb7d",req:"Các bạn đang đọc sách ở trường. Nói ngày mai em đi đâu làm gì (gợi ý trong sách: 明天我去___看___。).",kw:[{l:"去学校",m:[["去学校","quxuexiao"]]},{l:"看书",m:[["看书","kanshu"]]}],r:[["明天我去学校看书。","Míngtiān wǒ qù xuéxiào kàn shū.","Ngày mai tôi đến trường đọc sách."]]}]};
var TKP=Object.assign(window.TKP||{},{"今天":"jīntiān","明天":"míngtiān","昨天":"zuótiān","星期":"xīngqī","几":"jǐ","是":"shì","月":"yuè","号":"hào","9月":"jiǔ yuè","2号":"èr hào","星期四":"xīngqī sì","，":"","我":"wǒ","你":"nǐ","去":"qù","学校":"xuéxiào","看":"kàn","书":"shū","做":"zuò","什么":"shénme"});
