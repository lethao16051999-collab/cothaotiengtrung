/* ===== Giáo trình chuẩn HSK 1 · Bài 8: 我想喝茶 (sách trang 68–75) ===== */
LD1[8]={t:"我想喝茶",tp:"Wǒ xiǎng hē chá",vi:"Tôi muốn uống trà",
gpNote:"Ngữ pháp lấy từ mục Chú thích (注释) của sách: động từ năng nguyện 想, đại từ nghi vấn 多少, lượng từ 个 và 口, cách nói số tiền (元 / 块); thêm 这个 / 那个 trong bài khóa 3, kèm lỗi người Việt hay mắc.",
goals:["Nói mong muốn, dự định bằng 想 + động từ: 我想喝茶。下午我想去商店。","Hỏi số lượng trên 10 và hỏi giá bằng 多少: 这个杯子多少钱？— 28块。","Dùng đúng lượng từ 个 / 口 và 这个 / 那个 khi chỉ đồ vật."],
texts:[
{ctx:"在饭馆儿 · Ở quán ăn: người phục vụ hỏi khách muốn uống gì, ăn gì.",a:"c8-1",l:[
["A","你想喝什么？","Nǐ xiǎng hē shénme?","Cô muốn uống gì?"],
["B","我想喝茶。","Wǒ xiǎng hē chá.","Tôi muốn uống trà."],
["A","你想吃什么？","Nǐ xiǎng chī shénme?","Cô muốn dùng món gì?"],
["B","我想吃米饭。","Wǒ xiǎng chī mǐfàn.","Tôi muốn ăn cơm."]]},
{ctx:"在客厅 · Trong phòng khách: hai bạn nói chuyện về kế hoạch buổi chiều.",a:"c8-2",l:[
["A","下午你想做什么？","Xiàwǔ nǐ xiǎng zuò shénme?","Buổi chiều bạn muốn làm gì?"],
["B","下午我想去商店。","Xiàwǔ wǒ xiǎng qù shāngdiàn.","Mình muốn đến cửa hàng."],
["A","你想买什么？","Nǐ xiǎng mǎi shénme?","Bạn muốn mua gì vậy?"],
["B","我想买一个杯子。","Wǒ xiǎng mǎi yí ge bēizi.","Mình muốn mua một cái ly."]]},
{ctx:"在商店 · Ở cửa hàng: khách hỏi giá hai cái ly.",a:"c8-3",l:[
["A","你好！这个杯子多少钱？","Nǐ hǎo! Zhège bēizi duōshao qián?","Chào cô! Cái ly này bao nhiêu tiền?"],
["B","28块。","Èrshíbā kuài.","28 đồng."],
["A","那个杯子多少钱？","Nàge bēizi duōshao qián?","Còn cái ly đó?"],
["B","那个杯子18块钱。","Nàge bēizi shíbā kuài qián.","Ly đó 18 đồng."]]}],
words:[
["想","xiǎng","động từ năng nguyện","muốn",0],["喝","hē","động từ","uống",0],["茶","chá","danh từ","trà",0],["吃","chī","động từ","ăn",0],["米饭","mǐfàn","danh từ","cơm",0],
["下午","xiàwǔ","danh từ","buổi chiều",1],["商店","shāngdiàn","danh từ","cửa hàng",1],["买","mǎi","động từ","mua",1],["个","gè","lượng từ","cái (lượng từ chung)",1],["杯子","bēizi","danh từ","ly, tách",1],
["这","zhè","đại từ","đây, này",2],["多少","duōshao","đại từ","bao nhiêu",2],["钱","qián","danh từ","tiền",2],["块","kuài","lượng từ","đồng (đơn vị tiền tệ)",2],["那","nà","đại từ","kia, đó",2]],
gp:[
{h:"1. Động từ năng nguyện 想: muốn, định",b:`<span class="fm">Chủ ngữ ＋ 想 ＋ động từ (＋ tân ngữ)<small>… xiǎng + …</small></span><p>想 đứng trước động từ, diễn tả mong muốn hay dự định.</p><ul><li>${Z("我想学汉语。","Wǒ xiǎng xué Hànyǔ.")}</li><li>${Z("明天我想去学校看书。","Míngtiān wǒ xiǎng qù xuéxiào kàn shū.")}</li><li>${Z("我想买一个杯子。","Wǒ xiǎng mǎi yí ge bēizi.")}</li><li>${Z("你想喝什么？","Nǐ xiǎng hē shénme?")}</li></ul><p>💡 Thời gian (下午, 明天) đặt <b>trước</b> chủ ngữ hoặc ngay sau chủ ngữ, không đặt cuối câu: ${Z("下午我想去商店。","Xiàwǔ wǒ xiǎng qù shāngdiàn.")}</p>`+W1(`Lỗi hay gặp: bỏ động từ sau 想 ✗ 我想茶 (nên nói ${Z("我想喝茶","wǒ xiǎng hē chá")}); đặt thời gian cuối câu theo tiếng Việt ✗ 我想去商店下午. 想 đọc thanh 3 <b>xiǎng</b> (đừng nhầm với 香 xiāng).`)},
{h:"2. Đại từ nghi vấn 多少",b:`<span class="fm">多少 ＋ (lượng từ) ＋ danh từ？ · …… 多少钱？<small>duōshao + (gè) + … ? · … duōshao qián?</small></span><p>Hỏi số lượng <b>trên 10</b> (hoặc không đoán được); lượng từ sau 多少 có thể bỏ. Hỏi giá dùng ……多少钱？</p><ul><li>${Z("你们学校有多少（个）学生？","Nǐmen xuéxiào yǒu duōshao (ge) xuésheng?")}</li><li>${Z("你有多少（个）汉语老师？","Nǐ yǒu duōshao (ge) Hànyǔ lǎoshī?")}</li><li>${Z("这个杯子多少钱？","Zhège bēizi duōshao qián?")}</li></ul><p>💡 So sánh với 几 (Bài 5): 几 hỏi số dưới 10 và <b>bắt buộc</b> có lượng từ (几口人); 多少 hỏi số lớn, lượng từ có thể bỏ.</p>`+W1(`Lỗi hay gặp: hỏi giá theo kiểu “bao nhiêu tiền cái ly này” ✗ 多少钱这个杯子？ — đúng: ${Z("这个杯子多少钱？","Zhège bēizi duōshao qián?")}; thêm 吗 ✗ 多少钱吗？ 多少 đọc <b>duōshao</b> (shao thanh nhẹ).`)},
{h:"3. Lượng từ 个 và 口",b:`<span class="fm">Số ＋ 个 ＋ danh từ · 家 ＋ 有 ＋ số ＋ 口 ＋ 人<small>sān ge lǎoshī · liù kǒu rén</small></span><p>个 là lượng từ thường gặp nhất, dùng trước danh từ không có lượng từ riêng. 口 dùng để nói số người trong gia đình (xem Bài 5).</p><ul><li>${Z("三个老师","sān ge lǎoshī")} · ${Z("五个学生","wǔ ge xuésheng")} · ${Z("一个杯子","yí ge bēizi")}</li><li>${Z("李老师家有六口人。","Lǐ lǎoshī jiā yǒu liù kǒu rén.")}</li><li>${Z("你家有几口人？","Nǐ jiā yǒu jǐ kǒu rén?")} — ${Z("我家有三口人。","Wǒ jiā yǒu sān kǒu rén.")}</li></ul><p>💡 个 thường đọc nhẹ <b>ge</b>; 一 trước 个 (vốn thanh 4) đọc thành <b>yí</b>: ${Z("一个","yí ge")}.</p>`+W1(`Lỗi hay gặp: bỏ lượng từ theo kiểu tiếng Việt ✗ 我想买一杯子 · ✗ 三老师. Số 2 đứng trước lượng từ thì dùng ${Z("两个","liǎng ge")}, không nói ✗ 二个.`)},
{h:"4. Cách nói số tiền: 元 / 块",b:`<span class="fm">Số ＋ 块 (＋ 钱)<small>èrshíbā kuài (qián)</small></span><p>Đơn vị cơ bản của nhân dân tệ là 元 (yuán); trong văn nói thường dùng 块 (kuài).</p><ul><li>${Z("一块","yí kuài")} = 一元 · ${Z("五块","wǔ kuài")} · ${Z("十块","shí kuài")} · ${Z("五十块","wǔshí kuài")} · ${Z("一百块","yìbǎi kuài")}</li><li>${Z("28块。","Èrshíbā kuài.")} · ${Z("那个杯子18块钱。","Nàge bēizi shíbā kuài qián.")}</li></ul><p>💡 钱 sau 块 có thể có hoặc không. Câu nói giá không cần 是: ${Z("这个杯子28块。","Zhège bēizi èrshíbā kuài.")}</p>`+W1(`Lỗi hay gặp: đặt 钱 trước số ✗ 钱28块; thêm 是 ✗ 这个杯子是28块 (không sai hẳn nhưng không tự nhiên). 块 đọc <b>kuài</b> (u-a-i lướt nhanh), đừng đọc “khoai”.`)},
{h:"5. 这个 / 那个: cái này, cái kia",b:`<span class="fm">这 / 那 ＋ 个 ＋ danh từ<small>zhège bēizi · nàge bēizi</small></span><ul><li>${Z("这个杯子多少钱？","Zhège bēizi duōshao qián?")}</li><li>${Z("那个杯子18块钱。","Nàge bēizi shíbā kuài qián.")}</li><li>${Z("这个字怎么读？","Zhège zì zěnme dú?")}</li></ul><p>💡 这 = gần người nói (này), 那 = xa người nói (kia, đó). Trong khẩu ngữ, 这个 / 那个 hay đọc là zhèige / nèige.</p>`+W1(`Lỗi hay gặp: đặt 这 / 那 sau danh từ theo tiếng Việt “cái ly này” ✗ 杯子这个 · ✗ 杯子这. Đúng: ${Z("这个杯子","zhège bēizi")}. Đừng bỏ 个 ✗ 这杯子多少钱 (khẩu ngữ đôi khi bỏ, nhưng người mới học nên giữ 个).`)}],
gq:[
{q:"“Tôi muốn uống trà” nói là:",o:["我想喝茶。|Wǒ xiǎng hē chá.","我想茶。|Wǒ xiǎng chá.","我喝想茶。|Wǒ hē xiǎng chá."],e:"想 + động từ + tân ngữ."},
{q:"“Buổi chiều tôi muốn đến cửa hàng”:",o:["下午我想去商店。|Xiàwǔ wǒ xiǎng qù shāngdiàn.","我想去商店下午。|Wǒ xiǎng qù shāngdiàn xiàwǔ.","我下午去想商店。|Wǒ xiàwǔ qù xiǎng shāngdiàn."],e:"Thời gian đặt trước; 想 + 去 + nơi chốn."},
{q:"Hỏi giá “Cái ly này bao nhiêu tiền?”:",o:["这个杯子多少钱？|Zhège bēizi duōshao qián?","多少钱这个杯子？|Duōshao qián zhège bēizi?","这个杯子多少钱吗？|Zhège bēizi duōshao qián ma?"],e:"Đồ vật đứng trước, 多少钱 cuối câu."},
{q:"“Tôi muốn mua một cái ly”:",o:["我想买一个杯子。|Wǒ xiǎng mǎi yí ge bēizi.","我想买一杯子。|Wǒ xiǎng mǎi yì bēizi.","我想买杯子一个。|Wǒ xiǎng mǎi bēizi yí ge."],e:"Số + lượng từ 个 + danh từ."},
{q:"Hỏi “Trường bạn có bao nhiêu học sinh?”:",o:["你们学校有多少学生？|Nǐmen xuéxiào yǒu duōshao xuésheng?","你们学校有几学生？|Nǐmen xuéxiào yǒu jǐ xuésheng?","你们学校学生有多少个吗？|Nǐmen xuéxiào xuésheng yǒu duōshao ge ma?"],e:"Số lớn dùng 多少; 几 phải có lượng từ."},
{q:"“一个” đọc đúng là:",o:["yí ge","yī gè","yì ge"],e:"一 trước thanh 4 (个 gè) đọc thành yí; 个 thường đọc nhẹ."},
{q:"“Cái ly đó 18 đồng”:",o:["那个杯子18块钱。|Nàge bēizi shíbā kuài qián.","杯子那个18块钱。|Bēizi nàge shíbā kuài qián.","那个杯子钱18块。|Nàge bēizi qián shíbā kuài."],e:"那个 + danh từ; số + 块 + 钱."},
{q:"Trong văn nói, đơn vị 元 thường được nói là:",o:["块|kuài","钱|qián","个|gè"],e:"元 → 块 trong khẩu ngữ."}],
dt:[["你想喝什么？","Nǐ xiǎng hē shénme?"],["我想喝茶。","Wǒ xiǎng hē chá."],["我想吃米饭。","Wǒ xiǎng chī mǐfàn."],["下午你想做什么？","Xiàwǔ nǐ xiǎng zuò shénme?"],["下午我想去商店。","Xiàwǔ wǒ xiǎng qù shāngdiàn."],["你想买什么？","Nǐ xiǎng mǎi shénme?"],["我想买一个杯子。","Wǒ xiǎng mǎi yí ge bēizi."],["这个杯子多少钱？","Zhège bēizi duōshao qián?"],["二十八块。","Èrshíbā kuài."],["那个杯子十八块钱。","Nàge bēizi shíbā kuài qián."]],
tsort:[
{t:["你","想","吃","什么","？"],ok:["你想吃什么？"],p:"Nǐ xiǎng chī shénme?",e:"想 + động từ + 什么."},
{t:["下午","我","想","去","商店","。"],ok:["下午我想去商店。","我下午想去商店。"],p:"Xiàwǔ wǒ xiǎng qù shāngdiàn.",e:"Thời gian đặt trước; 想 + 去 + nơi chốn."},
{t:["我","想","买","一","个","杯子","。"],ok:["我想买一个杯子。"],p:"Wǒ xiǎng mǎi yí ge bēizi.",e:"一 + 个 + 杯子."},
{t:["这","个","杯子","多少","钱","？"],ok:["这个杯子多少钱？"],p:"Zhège bēizi duōshao qián?",e:"这个 + danh từ + 多少钱."},
{t:["那","个","杯子","十八","块","钱","。"],ok:["那个杯子十八块钱。"],p:"Nàge bēizi shíbā kuài qián.",e:"Số + 块 + 钱."}],
tlis:[
{a:"你想喝什么？",o:["我想喝茶。|Wǒ xiǎng hē chá.","我想吃米饭。|Wǒ xiǎng chī mǐfàn.","二十八块。|Èrshíbā kuài."]},
{a:"你想买什么？",o:["我想买一个杯子。|Wǒ xiǎng mǎi yí ge bēizi.","我想去商店。|Wǒ xiǎng qù shāngdiàn.","我想喝茶。|Wǒ xiǎng hē chá."]},
{a:"这个杯子多少钱？",o:["二十八块。|Èrshíbā kuài.","一个杯子。|Yí ge bēizi.","我想买杯子。|Wǒ xiǎng mǎi bēizi."]},
{a:"这个杯子二十八块，那个杯子十八块钱。",qz:"那个杯子多少钱？",qp:"Nàge bēizi duōshao qián?",o:["十八块|shíbā kuài","二十八块|èrshíbā kuài","八块|bā kuài"]},
{a:"下午我想去商店买一个杯子。",qz:"她下午想做什么？",qp:"Tā xiàwǔ xiǎng zuò shénme?",o:["去商店买杯子|qù shāngdiàn mǎi bēizi","去学校看书|qù xuéxiào kàn shū","喝茶|hē chá"]}],
sit:[
{title:"Tình huống 1 · Ở quán ăn: muốn uống gì, ăn gì?",ctx:"Người phục vụ hỏi khách muốn uống gì, ăn gì.",turns:[
{w:"A",vi:"Hỏi khách muốn uống gì.",h:[["你","nǐ"],["想喝","xiǎng hē"],["什么","shénme"]],r:["你想喝什么？","Nǐ xiǎng hē shénme?","Cô muốn uống gì?"]},
{w:"B",vi:"Trả lời muốn uống trà.",h:[["我","wǒ"],["想喝","xiǎng hē"],["茶","chá"]],r:["我想喝茶。","Wǒ xiǎng hē chá.","Tôi muốn uống trà."]},
{w:"A",vi:"Hỏi khách muốn ăn gì.",h:[["你","nǐ"],["想吃","xiǎng chī"],["什么","shénme"]],r:["你想吃什么？","Nǐ xiǎng chī shénme?","Cô muốn dùng món gì?"]},
{w:"B",vi:"Trả lời muốn ăn cơm.",h:[["我","wǒ"],["想吃","xiǎng chī"],["米饭","mǐfàn"]],r:["我想吃米饭。","Wǒ xiǎng chī mǐfàn.","Tôi muốn ăn cơm."]}]},
{title:"Tình huống 2 · Trong phòng khách: chiều nay làm gì?",ctx:"Hai bạn nói chuyện về kế hoạch buổi chiều.",turns:[
{w:"A",vi:"Hỏi buổi chiều bạn muốn làm gì.",h:[["下午","xiàwǔ"],["你想","nǐ xiǎng"],["做什么","zuò shénme"]],r:["下午你想做什么？","Xiàwǔ nǐ xiǎng zuò shénme?","Buổi chiều bạn muốn làm gì?"]},
{w:"B",vi:"Trả lời buổi chiều muốn đến cửa hàng.",h:[["下午","xiàwǔ"],["我想去","wǒ xiǎng qù"],["商店","shāngdiàn"]],r:["下午我想去商店。","Xiàwǔ wǒ xiǎng qù shāngdiàn.","Mình muốn đến cửa hàng."]},
{w:"A",vi:"Hỏi bạn muốn mua gì.",h:[["你","nǐ"],["想买","xiǎng mǎi"],["什么","shénme"]],r:["你想买什么？","Nǐ xiǎng mǎi shénme?","Bạn muốn mua gì vậy?"]},
{w:"B",vi:"Trả lời muốn mua một cái ly.",h:[["我想买","wǒ xiǎng mǎi"],["一个","yí ge"],["杯子","bēizi"]],r:["我想买一个杯子。","Wǒ xiǎng mǎi yí ge bēizi.","Mình muốn mua một cái ly."]}]},
{title:"Tình huống 3 · Ở cửa hàng: hỏi giá",ctx:"Khách hỏi giá hai cái ly trong cửa hàng.",turns:[
{w:"A",vi:"Chào, hỏi cái ly này bao nhiêu tiền.",h:[["你好","nǐ hǎo"],["这个杯子","zhège bēizi"],["多少钱","duōshao qián"]],r:["你好！这个杯子多少钱？","Nǐ hǎo! Zhège bēizi duōshao qián?","Chào cô! Cái ly này bao nhiêu tiền?"]},
{w:"B",vi:"Trả lời 28 đồng.",h:[["二十八","èrshíbā"],["块","kuài"]],r:["二十八块。","Èrshíbā kuài.","28 đồng."]},
{w:"A",vi:"Hỏi cái ly kia bao nhiêu tiền.",h:[["那个杯子","nàge bēizi"],["多少钱","duōshao qián"]],r:["那个杯子多少钱？","Nàge bēizi duōshao qián?","Còn cái ly đó?"]},
{w:"B",vi:"Trả lời ly đó 18 đồng.",h:[["那个杯子","nàge bēizi"],["十八块钱","shíbā kuài qián"]],r:["那个杯子十八块钱。","Nàge bēizi shíbā kuài qián.","Ly đó 18 đồng."]}]},
{title:"Tình huống 4 · Vận dụng: đi mua đồ gần trường",ctx:"Em đang du học ở Bắc Kinh. Chiều nay em vào cửa hàng gần trường mua ly và trà.",turns:[
{w:"我",vi:"Chào người bán, nói mình muốn mua một cái ly.",h:[["你好","nǐ hǎo"],["我想买","wǒ xiǎng mǎi"],["一个杯子","yí ge bēizi"]],r:["你好！我想买一个杯子。","Nǐ hǎo! Wǒ xiǎng mǎi yí ge bēizi.","Chào cô! Cháu muốn mua một cái ly."]},
{w:"同学",vi:"(Người bán) Giới thiệu cái ly này 35 đồng.",h:[["这个杯子","zhège bēizi"],["三十五块","sānshíwǔ kuài"]],r:["这个杯子三十五块。","Zhège bēizi sānshíwǔ kuài.","Cái ly này 35 đồng."]},
{w:"我",vi:"Hỏi cái ly kia bao nhiêu tiền.",h:[["那个杯子","nàge bēizi"],["多少钱","duōshao qián"]],r:["那个杯子多少钱？","Nàge bēizi duōshao qián?","Cái ly kia bao nhiêu tiền?"]},
{w:"同学",vi:"(Người bán) Trả lời cái kia 20 đồng.",h:[["那个","nàge"],["二十块钱","èrshí kuài qián"]],r:["那个二十块钱。","Nàge èrshí kuài qián.","Cái kia 20 đồng."]},
{w:"我",vi:"Nói mình muốn mua cái kia.",h:[["我想买","wǒ xiǎng mǎi"],["那个","nàge"]],r:["我想买那个。","Wǒ xiǎng mǎi nàge.","Cháu muốn mua cái kia."]},
{w:"同学",vi:"(Người bán) Hỏi khách có muốn uống trà không.",h:[["你","nǐ"],["想喝","xiǎng hē"],["茶","chá"],["吗","ma"]],r:["你想喝茶吗？","Nǐ xiǎng hē chá ma?","Cháu có muốn uống trà không?"]},
{w:"我",vi:"Cảm ơn, mình muốn uống trà Trung Quốc.",h:[["谢谢","xièxie"],["我想喝","wǒ xiǎng hē"],["中国茶","Zhōngguó chá"]],r:["谢谢！我想喝中国茶。","Xièxie! Wǒ xiǎng hē Zhōngguó chá.","Cảm ơn cô! Cháu muốn uống trà Trung Quốc."]}]}],
act:[
{title:"双人活动 · Hoạt động theo cặp: em muốn làm gì? Có bao nhiêu…?",ctx:"Hai người một nhóm, hỏi và trả lời theo tình hình thật: chiều nay, ngày mai muốn làm gì; lớp, trường có bao nhiêu học sinh, thầy cô.",
req:["两人一组，根据实际情况进行问答练习。","Liǎng rén yì zǔ, gēnjù shíjì qíngkuàng jìnxíng wèndá liànxí.","Ghép thành từng cặp, luyện tập đặt câu hỏi và trả lời."],
roles:["A","B"],
l:[
["A","今天下午你想做什么？","Jīntiān xiàwǔ nǐ xiǎng zuò shénme?","Chiều nay bạn muốn làm gì?","Hỏi chiều nay bạn muốn làm gì (ví dụ trong sách)."],
["B","今天下午我想去商店。","Jīntiān xiàwǔ wǒ xiǎng qù shāngdiàn.","Chiều nay mình muốn đến cửa hàng.","Trả lời theo thật: ……我想……"],
["A","明天你想做什么？","Míngtiān nǐ xiǎng zuò shénme?","Ngày mai bạn muốn làm gì?","Hỏi ngày mai bạn muốn làm gì."],
["B","明天我想去学校看书。","Míngtiān wǒ xiǎng qù xuéxiào kàn shū.","Ngày mai mình muốn đến trường đọc sách.","Trả lời: 想 + 去 + nơi chốn + việc làm."],
["A","你们班有多少个学生？","Nǐmen bān yǒu duōshao ge xuésheng?","Lớp các bạn có bao nhiêu học sinh?","Hỏi lớp có bao nhiêu học sinh (班 bān: lớp)."],
["B","我们班有十二个学生。","Wǒmen bān yǒu shí'èr ge xuésheng.","Lớp mình có 12 học sinh.","Trả lời theo sĩ số thật của lớp."],
["A","你们学校有多少个老师？","Nǐmen xuéxiào yǒu duōshao ge lǎoshī?","Trường các bạn có bao nhiêu thầy cô?","Hỏi trường có bao nhiêu thầy cô."],
["B","我们学校有三十个老师。","Wǒmen xuéxiào yǒu sānshí ge lǎoshī.","Trường mình có 30 thầy cô.","Trả lời: 有 + số + 个 + 老师."]],
note:"Câu hỏi của A theo ví dụ trong sách; câu trả lời của B là câu mẫu. Các em trả lời theo thông tin thật.",
sub:[["Từ trong câu hỏi",[["班","bān","lớp"],["学生","xuésheng","học sinh"],["老师","lǎoshī","thầy cô giáo"]]]]},
{title:"小组活动 · Hoạt động nhóm: kế hoạch tuần này",ctx:"Nhóm 3–4 người hỏi nhau kế hoạch các ngày trong tuần này, ghi vào bảng (họ tên · thứ hai … chủ nhật), rồi cử một bạn báo cáo.",
req:["3~4人一组，互相询问这个星期的计划并记录，每组请一位同学报告情况。","Sān dào sì rén yì zǔ, hùxiāng xúnwèn zhège xīngqī de jìhuà bìng jìlù, měi zǔ qǐng yí wèi tóngxué bàogào qíngkuàng.","Lập nhóm từ 3 đến 4 người, hỏi nhau và ghi lại kế hoạch tuần này, sau đó cử một đại diện trình bày kết quả trao đổi của nhóm."],
roles:["A","B"],
l:[
["A","星期一你想做什么？","Xīngqī yī nǐ xiǎng zuò shénme?","Thứ hai bạn muốn làm gì?","Hỏi kế hoạch thứ hai."],
["B","星期一我想去学校。","Xīngqī yī wǒ xiǎng qù xuéxiào.","Thứ hai mình muốn đến trường.","Trả lời (dòng mẫu trong sách: 谢朋 thứ hai 去学校)."],
["A","星期六呢？","Xīngqī liù ne?","Còn thứ bảy?","Hỏi tiếp thứ bảy bằng 呢."],
["B","星期六我想去商店买杯子。","Xīngqī liù wǒ xiǎng qù shāngdiàn mǎi bēizi.","Thứ bảy mình muốn đến cửa hàng mua ly.","Trả lời (sách: thứ bảy 去商店)."],
["A","谢朋星期一想去学校，星期六想去商店。","Xiè Péng xīngqī yī xiǎng qù xuéxiào, xīngqī liù xiǎng qù shāngdiàn.","Tạ Bằng thứ hai muốn đến trường, thứ bảy muốn đến cửa hàng.","Đại diện nhóm báo cáo theo bảng."]],
note:"Dòng mẫu 谢朋 Xiè Péng (thứ hai 去学校, thứ bảy 去商店) lấy từ bảng trong sách; các câu hỏi – trả lời là câu mẫu. Các em hỏi kế hoạch thật của bạn và điền bảng.",
sub:[["Việc có thể làm",[["去学校","qù xuéxiào","đến trường"],["去商店","qù shāngdiàn","đến cửa hàng"],["看书","kàn shū","đọc sách"],["学汉语","xué Hànyǔ","học tiếng Trung"],["吃中国菜","chī Zhōngguó cài","ăn món Trung Quốc"],["买杯子","mǎi bēizi","mua ly"]]]]}]};
GXD["1-8"]={so:[
{t:["你|nǐ","想|xiǎng","喝|hē","什么|shénme"],ok:["你想喝什么"],f:"你想喝什么？",p:"Nǐ xiǎng hē shénme?",e:"想 + động từ + 什么."},
{t:["我|wǒ","想|xiǎng","吃|chī","米饭|mǐfàn"],ok:["我想吃米饭"],f:"我想吃米饭。",p:"Wǒ xiǎng chī mǐfàn.",e:"想 + 吃 + 米饭."},
{t:["下午|xiàwǔ","我|wǒ","想|xiǎng","去|qù","商店|shāngdiàn"],ok:["下午我想去商店","我下午想去商店"],f:"下午我想去商店。",p:"Xiàwǔ wǒ xiǎng qù shāngdiàn.",e:"Thời gian đứng trước 想."},
{t:["这|zhè","个|ge","杯子|bēizi","多少|duōshao","钱|qián"],ok:["这个杯子多少钱"],f:"这个杯子多少钱？",p:"Zhège bēizi duōshao qián?",e:"这个 + danh từ + 多少钱."},
{t:["我|wǒ","想|xiǎng","买|mǎi","一|yí","个|ge","杯子|bēizi"],ok:["我想买一个杯子"],f:"我想买一个杯子。",p:"Wǒ xiǎng mǎi yí ge bēizi.",e:"一个 + 杯子."}],
tr:[
{vi:"Tôi muốn uống trà.",a:["我想喝茶"],r:["我想喝茶。","Wǒ xiǎng hē chá."]},
{vi:"Buổi chiều bạn muốn làm gì?",a:["下午你想做什么","你下午想做什么"],r:["下午你想做什么？","Xiàwǔ nǐ xiǎng zuò shénme?"]},
{vi:"Tôi muốn mua một cái ly.",a:["我想买一个杯子"],r:["我想买一个杯子。","Wǒ xiǎng mǎi yí ge bēizi."]},
{vi:"Cái ly này bao nhiêu tiền?",a:["这个杯子多少钱"],r:["这个杯子多少钱？","Zhège bēizi duōshao qián?"]},
{vi:"Cái ly kia 18 đồng.",a:["那个杯子十八块钱","那个杯子18块钱","那个杯子十八块","那个杯子18块"],r:["那个杯子十八块钱。","Nàge bēizi shíbā kuài qián."]}],
pc:[
{img:"h1cb8a",req:"Ngày mai buổi chiều em muốn đến cửa hàng mua ly (gợi ý trong sách: 明天___我想去___买___。).",kw:[{l:"下午",m:[["下午","xiawu"]]},{l:"商店",m:[["商店","shangdian"]]},{l:"杯子",m:[["杯子","beizi"]]}],r:[["明天下午我想去商店买杯子。","Míngtiān xiàwǔ wǒ xiǎng qù shāngdiàn mǎi bēizi.","Chiều mai tôi muốn đến cửa hàng mua ly."]]},
{img:"h1cb8b",req:"Hôm nay em muốn ăn món Trung Quốc (gợi ý trong sách: 今天我想吃___。).",kw:[{l:"想吃",m:[["想吃","xiangchi"]]},{l:"中国菜",m:[["中国菜","zhongguocai"]]}],r:[["今天我想吃中国菜。","Jīntiān wǒ xiǎng chī Zhōngguó cài.","Hôm nay tôi muốn ăn món Trung Quốc."]]},
{img:"h1cb8c",req:"Buổi chiều em muốn đến trường đọc sách (gợi ý trong sách: 下午我想去___看___。).",kw:[{l:"学校",m:[["学校","xuexiao"]]},{l:"看书",m:[["看书","kanshu"]]}],r:[["下午我想去学校看书。","Xiàwǔ wǒ xiǎng qù xuéxiào kàn shū.","Buổi chiều tôi muốn đến trường đọc sách."]]},
{img:"h1cb8d",req:"Nhìn tem giá, hỏi người bán cái ly này bao nhiêu tiền (gợi ý trong sách: 你好，请问这个杯子___？).",kw:[{l:"多少钱",m:[["多少钱","duoshaoqian"]]}],r:[["你好，请问这个杯子多少钱？","Nǐ hǎo, qǐngwèn zhège bēizi duōshao qián?","Chào cô, xin hỏi cái ly này bao nhiêu tiền?"]]}]};
var TKP=Object.assign(window.TKP||{},{"你":"nǐ","我":"wǒ","想":"xiǎng","喝":"hē","吃":"chī","什么":"shénme","下午":"xiàwǔ","去":"qù","商店":"shāngdiàn","买":"mǎi","一":"yí","个":"ge","杯子":"bēizi","这":"zhè","那":"nà","多少":"duōshao","钱":"qián","十八":"shíbā","块":"kuài"});
