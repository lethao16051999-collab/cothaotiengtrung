/* ===== Giáo trình chuẩn HSK 1 · Bài 11: 现在几点？ (sách trang 94–101) ===== */
LD1[11]={t:"现在几点？",tp:"Xiànzài jǐ diǎn?",vi:"Bây giờ là mấy giờ?",
gpNote:"Ngữ pháp lấy từ mục Chú thích (注释) của sách: cách nói giờ, từ chỉ thời gian làm trạng ngữ, danh từ 前; thêm câu hỏi 什么时候 / 几点 và thanh nhẹ phân biệt nghĩa (mục Ghép âm), kèm lỗi người Việt hay mắc.",
goals:["Hỏi và nói giờ bằng 点、分 (现在几点？— 现在十点十分。), phân biệt 上午 / 中午 / 下午.","Đặt từ chỉ thời gian đúng chỗ trong câu (我星期一去北京。) và dùng 前 (星期五前, 八点前).","Hỏi thời gian bằng 什么时候 / 几点, nói được lịch sinh hoạt một ngày."],
texts:[
{ctx:"在图书馆 · Ở thư viện: hai bạn hỏi nhau giờ và giờ ăn trưa.",a:"c11-1",l:[
["A","现在几点？","Xiànzài jǐ diǎn?","Bây giờ là mấy giờ rồi?"],
["B","现在十点十分。","Xiànzài shí diǎn shí fēn.","10 giờ 10 phút."],
["A","中午几点吃饭？","Zhōngwǔ jǐ diǎn chī fàn?","Mấy giờ thì ăn cơm trưa vậy?"],
["B","十二点吃饭。","Shí'èr diǎn chī fàn.","12 giờ."]]},
{ctx:"在家 · Ở nhà: con hỏi mẹ khi nào bố về và khi nào đi xem phim.",a:"c11-2",l:[
["A","爸爸什么时候回家？","Bàba shénme shíhou huí jiā?","Chừng nào cha mới về đến nhà?"],
["B","下午五点。","Xiàwǔ wǔ diǎn.","5 giờ chiều."],
["A","我们什么时候去看电影？","Wǒmen shénme shíhou qù kàn diànyǐng?","Khi nào chúng ta đi xem phim?"],
["B","六点三十分。","Liù diǎn sānshí fēn.","6 giờ rưỡi."]]},
{ctx:"在家 · Ở nhà: anh chồng chuẩn bị đi công tác Bắc Kinh.",a:"c11-3",l:[
["A","我星期一去北京。","Wǒ xīngqīyī qù Běijīng.","Thứ hai anh sẽ đi Bắc Kinh."],
["B","你想在北京住几天？","Nǐ xiǎng zài Běijīng zhù jǐ tiān?","Anh định ở Bắc Kinh mấy ngày?"],
["A","住三天。","Zhù sān tiān.","Ba ngày."],
["B","星期五前能回家吗？","Xīngqīwǔ qián néng huí jiā ma?","Anh có thể về nhà trước thứ sáu được không?"],
["A","能。","Néng.","Chắc là được."]]}],
words:[
["现在","xiànzài","danh từ","bây giờ, hiện tại",0],["点","diǎn","lượng từ","giờ",0],["分","fēn","lượng từ","phút",0],["中午","zhōngwǔ","danh từ","buổi trưa",0],["吃饭","chī fàn","động từ","ăn cơm",0],
["时候","shíhou","danh từ","lúc, khi",1],["回","huí","động từ","về, trở về",1],["我们","wǒmen","đại từ","chúng ta",1],["电影","diànyǐng","danh từ","phim",1],
["住","zhù","động từ","ở",2],["前","qián","danh từ","trước",2],["北京","Běijīng","danh từ riêng","Bắc Kinh (thủ đô của Trung Quốc)",2]],
gp:[
{h:"1. Cách nói giờ: 点 · 分",b:`<span class="fm">…… 点 …… 分 (từ đơn vị lớn đến nhỏ)<small>… diǎn … fēn</small></span><ul><li>Giờ chẵn dùng 点: 9:00 → ${Z("九点","jiǔ diǎn")} · 11:00 → ${Z("十一点","shíyī diǎn")} · 2:00 → ${Z("两点","liǎng diǎn")}</li><li>Giờ lẻ thêm 分: 5:30 → ${Z("五点三十分","wǔ diǎn sānshí fēn")} · 11:10 → ${Z("十一点十分","shíyī diǎn shí fēn")} · 2:05 → ${Z("两点零五分","liǎng diǎn líng wǔ fēn")}</li><li>Phân biệt sáng / chiều: ${Z("上午八点","shàngwǔ bā diǎn")} · ${Z("下午三点十分","xiàwǔ sān diǎn shí fēn")} · ${Z("下午五点二十五分","xiàwǔ wǔ diǎn èrshíwǔ fēn")}</li></ul>`+W1(`Lỗi hay gặp: “2 giờ” nói ✗ 二点 (đúng: ${Z("两点","liǎng diǎn")}); 2:05 bỏ 零 ✗ 两点五分 nghe như 2:50 với người mới học; nói theo trật tự tiếng Việt “5 giờ chiều” ✗ 五点下午 (đúng: ${Z("下午五点","xiàwǔ wǔ diǎn")}).`)},
{h:"2. Từ chỉ thời gian làm trạng ngữ",b:`<span class="fm">Chủ ngữ ＋ thời gian ＋ động từ · Thời gian ＋ chủ ngữ ＋ động từ<small>Wǒ xīngqīyī qù Běijīng. · Qī diǎn wǒ chī fàn.</small></span><ul><li>${Z("妈妈六点做饭。","Māma liù diǎn zuò fàn.")}</li><li>${Z("李老师上午八点去学校。","Lǐ lǎoshī shàngwǔ bā diǎn qù xuéxiào.")}</li><li>${Z("我星期一去北京。","Wǒ xīngqīyī qù Běijīng.")}</li><li>${Z("七点我吃饭。","Qī diǎn wǒ chī fàn.")} · ${Z("中午十二点我们回家。","Zhōngwǔ shí'èr diǎn wǒmen huí jiā.")} · ${Z("下午五点他们去看电影。","Xiàwǔ wǔ diǎn tāmen qù kàn diànyǐng.")}</li></ul>`+W1(`Lỗi hay gặp: đặt thời gian cuối câu như tiếng Việt “Tôi đi Bắc Kinh thứ hai” ✗ 我去北京星期一. Thời gian luôn đứng <b>trước động từ</b>.`)},
{h:"3. Danh từ 前 (trước)",b:`<span class="fm">Thời gian ＋ 前<small>… qián</small></span><ul><li>${Z("三天前","sān tiān qián")} · ${Z("一个星期前","yí ge xīngqī qián")} · ${Z("四点前","sì diǎn qián")} · ${Z("星期五前","xīngqīwǔ qián")}</li><li>${Z("你什么时候去学校？","Nǐ shénme shíhou qù xuéxiào?")} — ${Z("八点前。","Bā diǎn qián.")}</li><li>${Z("你什么时候回北京？","Nǐ shénme shíhou huí Běijīng?")} — ${Z("星期六前。","Xīngqīliù qián.")}</li><li>${Z("（你）星期五前能回家吗？","(Nǐ) Xīngqīwǔ qián néng huí jiā ma?")} — ${Z("能。","Néng.")}</li></ul>`+W1(`“trước 4 giờ” theo trật tự tiếng Việt dễ thành ✗ 前四点. Đúng: ${Z("四点前","sì diǎn qián")} (前 đứng sau).`)},
{h:"4. Hỏi thời gian: 几点 · 什么时候",b:`<span class="fm">……几点 + động từ？ · ……什么时候 + động từ？<small>jǐ diǎn · shénme shíhou</small></span><ul><li>${Z("现在几点？","Xiànzài jǐ diǎn?")} → ${Z("现在十点十分。","Xiànzài shí diǎn shí fēn.")}</li><li>${Z("中午几点吃饭？","Zhōngwǔ jǐ diǎn chī fàn?")} → ${Z("十二点吃饭。","Shí'èr diǎn chī fàn.")}</li><li>${Z("爸爸什么时候回家？","Bàba shénme shíhou huí jiā?")} → ${Z("下午五点。","Xiàwǔ wǔ diǎn.")}</li></ul><p>💡 几点 hỏi giờ cụ thể; 什么时候 hỏi thời điểm nói chung (giờ, ngày, thứ…). Trả lời thay đúng vào chỗ từ để hỏi.</p>`+W1(`Lỗi hay gặp: thêm 吗 vào câu đã có 几 / 什么时候 ✗ 你几点吃饭吗？; đặt từ hỏi cuối câu ✗ 爸爸回家什么时候？`)},
{h:"5. Thanh nhẹ phân biệt nghĩa (轻声的功能)",b:`<span class="fm">Đọc nhẹ hay đủ thanh có thể đổi nghĩa<small>dōngxī · dōngxi</small></span><ul><li>东西: <b>dōngxī</b> hướng đông và hướng tây · <b>dōngxi</b> đồ vật</li><li>老子: <b>lǎozi</b> bố, cha (từ lóng) · <b>Lǎozǐ</b> Lão Tử</li><li>买卖: <b>mǎimai</b> việc buôn bán · <b>mǎimài</b> mua và bán</li><li>大意: <b>dàyi</b> lơ là · <b>dàyì</b> đại ý</li></ul><p>💡 Trong bài: ${Z("时候","shíhou")} đọc nhẹ chữ 候.</p>`}],
gq:[
{q:"2:00 nói là:",o:["两点|liǎng diǎn","二点|èr diǎn","两个点|liǎng ge diǎn"],e:"Nói 2 giờ dùng 两点, không nói 二点."},
{q:"5:30 nói là:",o:["五点三十分|wǔ diǎn sānshí fēn","三十分五点|sānshí fēn wǔ diǎn","五分三十点|wǔ fēn sānshí diǎn"],e:"Từ đơn vị lớn đến nhỏ: 点 trước, 分 sau."},
{q:"2:05 nói là:",o:["两点零五分|liǎng diǎn líng wǔ fēn","两点五零分|liǎng diǎn wǔ líng fēn","二点零五分|èr diǎn líng wǔ fēn"],e:"Phút dưới 10 thêm 零; 2 giờ dùng 两点."},
{q:"“3 giờ 10 phút chiều” nói là:",o:["下午三点十分|xiàwǔ sān diǎn shí fēn","三点十分下午|sān diǎn shí fēn xiàwǔ","下午十分三点|xiàwǔ shí fēn sān diǎn"],e:"上午 / 下午 đứng trước giờ."},
{q:"“Thứ hai tôi đi Bắc Kinh” nói là:",o:["我星期一去北京。|Wǒ xīngqīyī qù Běijīng.","我去北京星期一。|Wǒ qù Běijīng xīngqīyī.","我去星期一北京。|Wǒ qù xīngqīyī Běijīng."],e:"Từ chỉ thời gian đứng trước động từ."},
{q:"“Trước 8 giờ” nói là:",o:["八点前|bā diǎn qián","前八点|qián bā diǎn","八前点|bā qián diǎn"],e:"Thời gian + 前."},
{q:"Hỏi “Khi nào bố về nhà?”:",o:["爸爸什么时候回家？|Bàba shénme shíhou huí jiā?","爸爸回家什么时候？|Bàba huí jiā shénme shíhou?","爸爸什么时候回家吗？|Bàba shénme shíhou huí jiā ma?"],e:"什么时候 đứng trước động từ; câu đã có từ hỏi không thêm 吗."},
{q:"Hỏi “你想在北京住几天？”, câu trả lời đúng:",o:["住三天。|Zhù sān tiān.","三点。|Sān diǎn.","星期五前。|Xīngqīwǔ qián."],e:"几天 hỏi số ngày → 三天."}],
dt:[["现在几点？","Xiànzài jǐ diǎn?"],["现在十点十分。","Xiànzài shí diǎn shí fēn."],["中午几点吃饭？","Zhōngwǔ jǐ diǎn chī fàn?"],["十二点吃饭。","Shí'èr diǎn chī fàn."],["爸爸什么时候回家？","Bàba shénme shíhou huí jiā?"],["下午五点。","Xiàwǔ wǔ diǎn."],["我们什么时候去看电影？","Wǒmen shénme shíhou qù kàn diànyǐng?"],["六点三十分。","Liù diǎn sānshí fēn."],["我星期一去北京。","Wǒ xīngqīyī qù Běijīng."],["星期五前能回家吗？","Xīngqīwǔ qián néng huí jiā ma?"]],
tsort:[
{t:["中午","几点","吃饭","？"],ok:["中午几点吃饭？"],p:"Zhōngwǔ jǐ diǎn chī fàn?",e:"Thời gian (中午) + 几点 + động từ."},
{t:["我们","什么时候","去","看","电影","？"],ok:["我们什么时候去看电影？"],p:"Wǒmen shénme shíhou qù kàn diànyǐng?",e:"什么时候 đứng trước động từ."},
{t:["我","星期一","去","北京","。"],ok:["我星期一去北京。","星期一我去北京。"],p:"Wǒ xīngqīyī qù Běijīng.",e:"Thời gian đứng trước động từ."},
{t:["你","想","在","北京","住","几","天","？"],ok:["你想在北京住几天？"],p:"Nǐ xiǎng zài Běijīng zhù jǐ tiān?",e:"在 + nơi chốn + 住 + 几天."},
{t:["星期五","前","能","回家","吗","？"],ok:["星期五前能回家吗？"],p:"Xīngqīwǔ qián néng huí jiā ma?",e:"星期五前: thời gian + 前."}],
tlis:[
{a:"现在几点？",o:["现在十点十分。|Xiànzài shí diǎn shí fēn.","我星期一去北京。|Wǒ xīngqīyī qù Běijīng.","住三天。|Zhù sān tiān."]},
{a:"爸爸什么时候回家？",o:["下午五点。|Xiàwǔ wǔ diǎn.","住三天。|Zhù sān tiān.","能。|Néng."]},
{a:"你想在北京住几天？",o:["住三天。|Zhù sān tiān.","六点三十分。|Liù diǎn sānshí fēn.","十二点吃饭。|Shí'èr diǎn chī fàn."]},
{a:"我们六点三十分去看电影。",qz:"他们几点去看电影？",qp:"Tāmen jǐ diǎn qù kàn diànyǐng?",o:["六点三十分|liù diǎn sānshí fēn","六点十分|liù diǎn shí fēn","十点三十分|shí diǎn sānshí fēn"]},
{a:"我星期一去北京，住三天。",qz:"他在北京住几天？",qp:"Tā zài Běijīng zhù jǐ tiān?",o:["三天|sān tiān","一天|yì tiān","五天|wǔ tiān"]}],
sit:[
{title:"Tình huống 1 · Ở thư viện",ctx:"Hai bạn ở thư viện hỏi nhau giờ và giờ ăn trưa.",turns:[
{w:"A",vi:"Hỏi bây giờ là mấy giờ.",h:[["现在","xiànzài"],["几点","jǐ diǎn"]],r:["现在几点？","Xiànzài jǐ diǎn?","Bây giờ là mấy giờ rồi?"]},
{w:"B",vi:"Trả lời bây giờ là 10 giờ 10 phút.",h:[["现在","xiànzài"],["十点","shí diǎn"],["十分","shí fēn"]],r:["现在十点十分。","Xiànzài shí diǎn shí fēn.","10 giờ 10 phút."]},
{w:"A",vi:"Hỏi buổi trưa mấy giờ ăn cơm.",h:[["中午","zhōngwǔ"],["几点","jǐ diǎn"],["吃饭","chī fàn"]],r:["中午几点吃饭？","Zhōngwǔ jǐ diǎn chī fàn?","Mấy giờ thì ăn cơm trưa vậy?"]},
{w:"B",vi:"Trả lời 12 giờ ăn cơm.",h:[["十二点","shí'èr diǎn"],["吃饭","chī fàn"]],r:["十二点吃饭。","Shí'èr diǎn chī fàn.","12 giờ."]}]},
{title:"Tình huống 2 · Ở nhà: hỏi lịch của cả nhà",ctx:"Con hỏi mẹ khi nào bố về và khi nào cả nhà đi xem phim.",turns:[
{w:"A",vi:"Hỏi khi nào bố về nhà.",h:[["爸爸","bàba"],["什么时候","shénme shíhou"],["回家","huí jiā"]],r:["爸爸什么时候回家？","Bàba shénme shíhou huí jiā?","Chừng nào bố mới về nhà?"]},
{w:"B",vi:"Trả lời 5 giờ chiều.",h:[["下午","xiàwǔ"],["五点","wǔ diǎn"]],r:["下午五点。","Xiàwǔ wǔ diǎn.","5 giờ chiều."]},
{w:"A",vi:"Hỏi khi nào chúng ta đi xem phim.",h:[["我们","wǒmen"],["什么时候","shénme shíhou"],["去看","qù kàn"],["电影","diànyǐng"]],r:["我们什么时候去看电影？","Wǒmen shénme shíhou qù kàn diànyǐng?","Khi nào chúng ta đi xem phim?"]},
{w:"B",vi:"Trả lời 6 giờ 30 phút.",h:[["六点","liù diǎn"],["三十分","sānshí fēn"]],r:["六点三十分。","Liù diǎn sānshí fēn.","6 giờ rưỡi."]}]},
{title:"Tình huống 3 · Ở nhà: đi công tác Bắc Kinh",ctx:"Anh chồng chuẩn bị đi Bắc Kinh, chị vợ hỏi lịch trình.",turns:[
{w:"A",vi:"Nói thứ hai mình đi Bắc Kinh.",h:[["我","wǒ"],["星期一","xīngqīyī"],["去","qù"],["北京","Běijīng"]],r:["我星期一去北京。","Wǒ xīngqīyī qù Běijīng.","Thứ hai anh sẽ đi Bắc Kinh."]},
{w:"B",vi:"Hỏi anh định ở Bắc Kinh mấy ngày.",h:[["你","nǐ"],["想","xiǎng"],["在北京","zài Běijīng"],["住几天","zhù jǐ tiān"]],r:["你想在北京住几天？","Nǐ xiǎng zài Běijīng zhù jǐ tiān?","Anh định ở Bắc Kinh mấy ngày?"]},
{w:"A",vi:"Trả lời ở ba ngày.",h:[["住","zhù"],["三天","sān tiān"]],r:["住三天。","Zhù sān tiān.","Ba ngày."]},
{w:"B",vi:"Hỏi trước thứ sáu có về nhà được không.",h:[["星期五","xīngqīwǔ"],["前","qián"],["能","néng"],["回家吗","huí jiā ma"]],r:["星期五前能回家吗？","Xīngqīwǔ qián néng huí jiā ma?","Anh có thể về nhà trước thứ sáu được không?"]},
{w:"A",vi:"Trả lời: được.",h:[["能","néng"]],r:["能。","Néng.","Được."]}]},
{title:"Tình huống 4 · Vận dụng: hỏi lịch của bạn cùng phòng",ctx:"Buổi sáng ở ký túc xá, em hỏi bạn cùng phòng giờ giấc trong ngày.",turns:[
{w:"我",vi:"Hỏi bây giờ là mấy giờ.",h:[["现在","xiànzài"],["几点","jǐ diǎn"]],r:["现在几点？","Xiànzài jǐ diǎn?","Bây giờ là mấy giờ?"]},
{w:"同学",vi:"Trả lời bây giờ là 11 giờ 40 phút.",h:[["现在","xiànzài"],["十一点","shíyī diǎn"],["四十分","sìshí fēn"]],r:["现在十一点四十分。","Xiànzài shíyī diǎn sìshí fēn.","Bây giờ là 11 giờ 40 phút."]},
{w:"我",vi:"Hỏi bạn mấy giờ ăn cơm.",h:[["你","nǐ"],["几点","jǐ diǎn"],["吃饭","chī fàn"]],r:["你几点吃饭？","Nǐ jǐ diǎn chī fàn?","Bạn mấy giờ ăn cơm?"]},
{w:"同学",vi:"Trả lời 12 giờ ăn cơm.",h:[["十二点","shí'èr diǎn"],["吃饭","chī fàn"]],r:["十二点吃饭。","Shí'èr diǎn chī fàn.","12 giờ mình ăn cơm."]},
{w:"我",vi:"Hỏi bạn khi nào về nhà.",h:[["你","nǐ"],["什么时候","shénme shíhou"],["回家","huí jiā"]],r:["你什么时候回家？","Nǐ shénme shíhou huí jiā?","Khi nào bạn về nhà?"]},
{w:"同学",vi:"Trả lời trước 5 giờ chiều.",h:[["下午","xiàwǔ"],["五点","wǔ diǎn"],["前","qián"]],r:["下午五点前。","Xiàwǔ wǔ diǎn qián.","Trước 5 giờ chiều."]}]}],
act:[
{title:"双人活动 · Hoạt động theo cặp: nói giờ",ctx:"Hai người một nhóm, nhìn 10 đồng hồ trong sách (trang 100), một bạn hỏi, một bạn trả lời bằng 现在……点……分.",
req:["两人一组，用“现在……点……分”说说下面的时间。","Liǎng rén yì zǔ, yòng “xiànzài … diǎn … fēn” shuōshuo xiàmiàn de shíjiān.","Ghép thành từng cặp, sử dụng cấu trúc 现在……点……分 để nói về thời gian."],
roles:["A","B"],
l:[
["A","现在几点？","Xiànzài jǐ diǎn?","Bây giờ là mấy giờ?","Hỏi bây giờ là mấy giờ."],
["B","现在八点十八分。","Xiànzài bā diǎn shíbā fēn.","Bây giờ là 8 giờ 18 phút.","Trả lời: 8 giờ 18 phút (ví dụ trong sách)."],
["A","现在几点？","Xiànzài jǐ diǎn?","Bây giờ là mấy giờ?","Hỏi tiếp đồng hồ số 1."],
["B","现在三点三十分。","Xiànzài sān diǎn sānshí fēn.","Bây giờ là 3 giờ 30 phút.","Đồng hồ 03:30."],
["A","现在几点？","Xiànzài jǐ diǎn?","Bây giờ là mấy giờ?","Hỏi tiếp đồng hồ số 2."],
["B","现在十一点二十三分。","Xiànzài shíyī diǎn èrshísān fēn.","Bây giờ là 11 giờ 23 phút.","Đồng hồ 11:23."]],
note:"Hai lượt đầu là ví dụ trong sách; các lượt sau đổi theo từng đồng hồ. Đổi vai sau mỗi 5 đồng hồ.",
sub:[["10 đồng hồ trong sách",[["三点三十分","sān diǎn sānshí fēn","03:30"],["十一点二十三分","shíyī diǎn èrshísān fēn","11:23"],["十点四十三分","shí diǎn sìshísān fēn","10:43"],["四点十五分","sì diǎn shíwǔ fēn","04:15"],["五点五十八分","wǔ diǎn wǔshíbā fēn","05:58"],["一点二十七分","yī diǎn èrshíqī fēn","01:27"],["十二点二十七分","shí'èr diǎn èrshíqī fēn","12:27"],["两点三十四分","liǎng diǎn sānshísì fēn","02:34"],["七点四十五分","qī diǎn sìshíwǔ fēn","07:45"],["十点零五分","shí diǎn líng wǔ fēn","10:05"]]]]},
{title:"小组活动 · Hoạt động nhóm: giờ giấc một ngày",ctx:"Nhóm 3–4 người hỏi nhau giờ sinh hoạt trong ngày, ghi vào bảng, rồi cử một bạn báo cáo. Bảng mẫu trong sách là lịch của Tiểu Vương (小王).",
req:["3~4人一组，互相询问并记录一日作息习惯，每组请一位同学报告情况。","Sān dào sì rén yì zǔ, hùxiāng xúnwèn bìng jìlù yí rì zuòxī xíguàn, měi zǔ qǐng yí wèi tóngxué bàogào qíngkuàng.","Lập nhóm từ 3 đến 4 người, hỏi và ghi lại thói quen làm việc, nghỉ ngơi trong ngày của nhau, sau đó cử một đại diện trình bày kết quả."],
roles:["我","小王"],
l:[
["我","你几点吃早饭？","Nǐ jǐ diǎn chī zǎofàn?","Bạn mấy giờ ăn sáng?","Hỏi bạn mấy giờ ăn sáng (ví dụ trong sách)."],
["小王","我七点吃早饭。","Wǒ qī diǎn chī zǎofàn.","Mình ăn sáng lúc 7 giờ.","Trả lời: 7 giờ ăn sáng."],
["我","你几点来学校？","Nǐ jǐ diǎn lái xuéxiào?","Bạn mấy giờ đến trường?","Hỏi mấy giờ đến trường."],
["小王","八点二十分。","Bā diǎn èrshí fēn.","8 giờ 20 phút.","Trả lời: 8:20."],
["我","你什么时候看书？","Nǐ shénme shíhou kàn shū?","Khi nào bạn đọc sách?","Hỏi khi nào đọc sách."],
["小王","下午三点。","Xiàwǔ sān diǎn.","3 giờ chiều.","Trả lời: 15:00."],
["我","你什么时候回家？","Nǐ shénme shíhou huí jiā?","Khi nào bạn về nhà?","Hỏi khi nào về nhà."],
["小王","下午六点前。","Xiàwǔ liù diǎn qián.","Trước 6 giờ chiều.","Trả lời: trước 18:00."]],
note:"Hai lượt đầu là ví dụ trong sách; các lượt sau theo bảng của Tiểu Vương. 早饭 (zǎofàn, bữa sáng), 来 (lái, đến) và 晚上 (wǎnshang, buổi tối) sách cho sẵn phiên âm trong bảng.",
sub:[["Hỏi",[["你几点吃早饭？","Nǐ jǐ diǎn chī zǎofàn?","Bạn mấy giờ ăn sáng?"],["你几点来学校？","Nǐ jǐ diǎn lái xuéxiào?","Bạn mấy giờ đến trường?"],["你什么时候看书？","Nǐ shénme shíhou kàn shū?","Khi nào bạn đọc sách?"],["你什么时候回家？","Nǐ shénme shíhou huí jiā?","Khi nào bạn về nhà?"]]],
["Báo cáo",[["小王七点吃早饭。","Xiǎo Wáng qī diǎn chī zǎofàn.","Tiểu Vương ăn sáng lúc 7 giờ."],["他八点二十分来学校。","Tā bā diǎn èrshí fēn lái xuéxiào.","Bạn ấy đến trường lúc 8:20."],["他下午六点前回家。","Tā xiàwǔ liù diǎn qián huí jiā.","Bạn ấy về nhà trước 6 giờ chiều."]]]]}]};
GXD["1-11"]={so:[
{t:["现在|xiànzài","十点|shí diǎn","十分|shí fēn"],ok:["现在十点十分"],f:"现在十点十分。",p:"Xiànzài shí diǎn shí fēn.",e:"点 trước, 分 sau."},
{t:["中午|zhōngwǔ","几点|jǐ diǎn","吃饭|chī fàn"],ok:["中午几点吃饭"],f:"中午几点吃饭？",p:"Zhōngwǔ jǐ diǎn chī fàn?",e:"Thời gian đứng trước động từ."},
{t:["我|wǒ","星期一|xīngqīyī","去|qù","北京|Běijīng"],ok:["我星期一去北京","星期一我去北京"],f:"我星期一去北京。",p:"Wǒ xīngqīyī qù Běijīng.",e:"Thời gian đứng sau hoặc trước chủ ngữ, luôn trước động từ."},
{t:["星期五|xīngqīwǔ","前|qián","能|néng","回家|huí jiā","吗|ma"],ok:["星期五前能回家吗"],f:"星期五前能回家吗？",p:"Xīngqīwǔ qián néng huí jiā ma?",e:"Thời gian + 前."},
{t:["妈妈|māma","六点|liù diǎn","做饭|zuò fàn"],ok:["妈妈六点做饭","六点妈妈做饭"],f:"妈妈六点做饭。",p:"Māma liù diǎn zuò fàn.",e:"Ví dụ trong sách: chủ ngữ + thời gian + động từ."}],
tr:[
{vi:"Bây giờ là 3 giờ 10 phút.",a:["现在三点十分"],r:["现在三点十分。","Xiànzài sān diǎn shí fēn."]},
{vi:"Bây giờ là 2 giờ.",a:["现在两点"],r:["现在两点。","Xiànzài liǎng diǎn."]},
{vi:"Khi nào chúng ta đi xem phim?",a:["我们什么时候去看电影"],r:["我们什么时候去看电影？","Wǒmen shénme shíhou qù kàn diànyǐng?"]},
{vi:"Tôi về nhà trước 6 giờ.",a:["我六点前回家","六点前我回家"],r:["我六点前回家。","Wǒ liù diǎn qián huí jiā."]},
{vi:"Thứ hai tôi đi Bắc Kinh.",a:["我星期一去北京","星期一我去北京"],r:["我星期一去北京。","Wǒ xīngqīyī qù Běijīng."]}],
pc:[
{img:"h1cb11a",req:"Nhìn đồng hồ trong tranh (9:45), nói bạn ấy đọc sách ở trường lúc mấy giờ (gợi ý trong sách: 她___在学校___。).",kw:[{l:"九点四十五分",m:[["九点四十五分","jiudiansishiwufen"]]},{l:"看书",m:[["看书","kanshu"]]}],r:[["她九点四十五分在学校看书。","Tā jiǔ diǎn sìshíwǔ fēn zài xuéxiào kàn shū.","Bạn ấy đọc sách ở trường lúc 9 giờ 45."],["她上午九点四十五分在学校看书。","Tā shàngwǔ jiǔ diǎn sìshíwǔ fēn zài xuéxiào kàn shū.","9 giờ 45 sáng, bạn ấy đọc sách ở trường."]]},
{img:"h1cb11c",req:"Hai người rất bận, thứ bảy cũng làm việc; đồng hồ chỉ 6 giờ (gợi ý trong sách: 他们很忙，星期六___也工作。).",kw:[{l:"六点",m:[["六点","liudian"]]},{l:"也工作",m:[["也工作","yegongzuo"]]}],r:[["他们很忙，星期六六点也工作。","Tāmen hěn máng, xīngqīliù liù diǎn yě gōngzuò.","Họ rất bận, thứ bảy 6 giờ cũng làm việc."],["他们很忙，星期六下午六点也工作。","Tāmen hěn máng, xīngqīliù xiàwǔ liù diǎn yě gōngzuò.","Họ rất bận, 6 giờ chiều thứ bảy cũng làm việc."]]},
{img:"h1cb11d",req:"Bà cụ buổi sáng không uống trà, buổi chiều uống trà trước 4 giờ (gợi ý trong sách: 她上午不喝茶，下午___前喝茶。).",kw:[{l:"四点前",m:[["四点前","sidianqian"]]}],r:[["她上午不喝茶，下午四点前喝茶。","Tā shàngwǔ bù hē chá, xiàwǔ sì diǎn qián hē chá.","Buổi sáng bà không uống trà, buổi chiều uống trà trước 4 giờ."]]}]};
var TKP=Object.assign(window.TKP||{},{"现在":"xiànzài","几":"jǐ","点":"diǎn","几点":"jǐ diǎn","分":"fēn","中午":"zhōngwǔ","吃饭":"chī fàn","什么时候":"shénme shíhou","回家":"huí jiā","我们":"wǒmen","去":"qù","看":"kàn","电影":"diànyǐng","星期一":"xīngqīyī","星期五":"xīngqīwǔ","北京":"Běijīng","想":"xiǎng","在":"zài","住":"zhù","天":"tiān","前":"qián","能":"néng"});
