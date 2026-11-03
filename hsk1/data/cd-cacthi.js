/* ===== Chuyên đề ôn tập · Giáo trình chuẩn HSK 1 (quyển cam) · thêm 03/11/2026 =====
   "Các thì trong tiếng Trung: đã – đang – sẽ" · phạm vi: quyển cam Bài 12–14, quyển xanh Bài 11, 12, 14.
   Giống phiếu giấy làm trên lớp (Phieu-tren-lop-Cac-thi-K49.docx); về nhà học viên làm lại trên web.
   Mã bài gửi Sổ theo dõi / Chấm bài: cấp 6, bài 101. Thang 100 điểm, đạt từ 80. Thời gian làm bài 50 phút (time), tính từ lúc bấm Bắt đầu; hết giờ tự nộp.
   acc: các câu máy chấm Đúng (bỏ dấu câu, khoảng trắng). Viết gọn: {a|b} = một trong các cách, [x] = có hoặc không. Câu khác → gửi cô chấm. */
var CD=window.CD||{};
CD[6]=(CD[6]||[]).concat([{key:"cacthi",after:14,b:101,pass:80,time:50,
t:"Chuyên đề: Các thì",zh:"了 · 在……呢 · 要 / 会",sub:"Đã làm gì · Đang làm gì · Sẽ làm gì",
scope:"Quyển cam Bài 12–14 · Quyển xanh Bài 11, 12, 14",
remind:[
 ["ĐÃ","昨天 · 上午 · ……后","V + 了 + số lượng + O · (去 + nơi) V + O + 了","没 + V (bỏ 了)"],
 ["ĐANG","现在","在 / 正在 + V (+ O) + 呢","没 + V"],
 ["SẼ","明天 · 明年 · 下午","要 + V · 会 + V · …… + 吧","不 + V · 不会"]],
secs:[
{id:"f",kind:"fill",w:2,t:"Chọn từ điền vào chỗ trống",note:"Mỗi từ trong khung dùng một lần.",groups:[
 {bank:[["天气","tiānqì"],["有点儿","yǒudiǎnr"],["下雨","xià yǔ"],["生病","shēngbìng"],["起床","qǐchuáng"]],items:[
  ["明天 ___ 怎么样？","Míngtiān ___ zěnmeyàng?","天气"],
  ["雨 ___ 大，我觉得很冷。","Yǔ ___ dà, wǒ juéde hěn lěng.","有点儿"],
  ["今天 ___ 了，我没去学校。","Jīntiān ___ le, wǒ méi qù xuéxiào.","下雨"],
  ["你昨天没来学校，___ 了吗？","Nǐ zuótiān méi lái xuéxiào, ___ le ma?","生病"],
  ["弟弟还没 ___ 呢，他还在睡觉。","Dìdi hái méi ___ ne, tā hái zài shuìjiào.","起床"]]},
 {bank:[["看见","kànjiàn"],["听见","tīngjiàn"],["知道","zhīdào"],["打电话","dǎ diànhuà"],["衣服","yīfu"]],items:[
  ["你 ___ 王老师了吗？","Nǐ ___ Wáng lǎoshī le ma?","看见"],
  ["你说什么？我没 ___。","Nǐ shuō shénme? Wǒ méi ___.","听见"],
  ["他什么时候来？我不 ___。","Tā shénme shíhou lái? Wǒ bù ___.","知道"],
  ["我现在给妈妈 ___。","Wǒ xiànzài gěi māma ___.","打电话"],
  ["王方买了不少 ___，都很漂亮。","Wáng Fāng mǎile bùshǎo ___, dōu hěn piàoliang.","衣服"]]}]},
{id:"t",kind:"tr",w:4,t:"Dịch sang tiếng Trung",note:"Viết bằng chữ Hán. Câu trùng đáp án máy chấm ngay, câu khác gửi cô chấm (✓ 4 điểm · ½ 2 điểm · ✗ 0).",items:[
 {tag:"ĐÃ",vi:"Hôm qua mình đã xem một bộ phim.",acc:["{昨天我|我昨天}看了一个电影"],ref:"昨天我看了一个电影。",rp:"Zuótiān wǒ kànle yí ge diànyǐng."},
 {tag:"ĐÃ",vi:"Hôm qua em trai mình bị ốm, không đi học.",acc:["{昨天我弟弟|我弟弟昨天|昨天弟弟|弟弟昨天}生病了[他]没去{上学|学校}"],ref:"昨天我弟弟生病了，没去上学。",rp:"Zuótiān wǒ dìdi shēngbìng le, méi qù shàngxué."},
 {tag:"ĐÃ",vi:"Bạn có nhìn thấy cô Vương không?",acc:["你看见王老师了吗"],ref:"你看见王老师了吗？",rp:"Nǐ kànjiàn Wáng lǎoshī le ma?"},
 {tag:"ĐANG",vi:"Em trai chưa dậy, vẫn đang ngủ.",acc:["[我]弟弟{还没|没}起床[呢][他]还在睡觉[呢]"],ref:"弟弟没起床呢，还在睡觉。",rp:"Dìdi méi qǐchuáng ne, hái zài shuìjiào."},
 {tag:"ĐANG",vi:"Mẹ không xem tivi, mẹ đang gọi điện thoại.",acc:["[我]妈妈没看电视[她|妈妈]{在|正在}打电话[呢]"],ref:"妈妈没看电视，她在打电话呢。",rp:"Māma méi kàn diànshì, tā zài dǎ diànhuà ne."},
 {tag:"ĐANG",vi:"Bạn đang làm gì đấy?",acc:["你{在|正在}做什么[呢]"],ref:"你在做什么呢？",rp:"Nǐ zài zuò shénme ne?"},
 {tag:"SẼ",vi:"Ngày mai có mưa không?",acc:["明天会下雨吗"],ref:"明天会下雨吗？",rp:"Míngtiān huì xià yǔ ma?"},
 {tag:"SẼ",vi:"Ngày mai mình sẽ cùng mẹ đi cửa hàng mua quần áo.",acc:["{明天我|我明天}要和妈妈[一起]去商店买衣服"],ref:"明天我要和妈妈去商店买衣服。",rp:"Míngtiān wǒ yào hé māma qù shāngdiàn mǎi yīfu."},
 {tag:"SẼ",vi:"Muộn quá rồi, chúng mình đi ngủ thôi.",acc:["太晚了[我们][去]睡觉吧"],ref:"太晚了，我们睡觉吧。",rp:"Tài wǎn le, wǒmen shuìjiào ba."}]},
{id:"q",kind:"qa",w:2,t:"Trả lời câu hỏi để viết thành 3 đoạn văn",note:"Trả lời bằng câu đầy đủ về chính em. Đọc liền 5 câu là thành một đoạn văn. Phần này cô chấm (✓ 2 điểm · ½ 1 điểm · ✗ 0).",groups:[
 {tag:"ĐÃ",t:"我的昨天",zp:"Wǒ de zuótiān",vi:"Ngày hôm qua của em",need:/了|没/,hint:"Câu về hôm qua thường có <b>了</b> (hoặc <b>没</b> khi phủ định).",items:[
  ["昨天天气怎么样？下雨了吗？","Zuótiān tiānqì zěnmeyàng? Xià yǔ le ma?","昨天天气不太好，下雨了。"],
  ["昨天上午你去哪儿了？","Zuótiān shàngwǔ nǐ qù nǎr le?","昨天上午我去学校了。"],
  ["你买了什么？看了什么？","Nǐ mǎile shénme? Kànle shénme?","我买了一点儿水果。"],
  ["回家后，你做什么了？","Huí jiā hòu, nǐ zuò shénme le?","回家后，我看电视了。"],
  ["昨天你给谁打电话了？","Zuótiān nǐ gěi shéi dǎ diànhuà le?","我给妈妈打电话了。"]]},
 {tag:"ĐANG",t:"现在我们在做什么",zp:"Xiànzài wǒmen zài zuò shénme",vi:"Bây giờ mọi người đang làm gì",need:/在|呢/,hint:"Câu về bây giờ thường có <b>在 / 正在 …… 呢</b>.",skip:[0],items:[
  ["现在几点？你在哪儿？","Xiànzài jǐ diǎn? Nǐ zài nǎr?","现在八点，我在家。"],
  ["你现在在做什么呢？","Nǐ xiànzài zài zuò shénme ne?","我在写汉字呢。"],
  ["你爸爸在做什么呢？","Nǐ bàba zài zuò shénme ne?","爸爸在看电视呢。"],
  ["你妈妈在看电视吗？","Nǐ māma zài kàn diànshì ma?","妈妈没看电视，她在做饭呢。"],
  ["你的朋友还在学习吗？","Nǐ de péngyou hái zài xuéxí ma?","我的朋友还在学习呢。"]]},
 {tag:"SẼ",t:"明天我要做什么",zp:"Míngtiān wǒ yào zuò shénme",vi:"Ngày mai em sẽ làm gì",need:/要|会|吧|后|不/,hint:"Câu về ngày mai thường có <b>要</b>, <b>会</b> hoặc <b>吧</b>, không dùng 了.",items:[
  ["明天会下雨吗？","Míngtiān huì xià yǔ ma?","明天不会下雨。"],
  ["明天上午你要做什么？","Míngtiān shàngwǔ nǐ yào zuò shénme?","明天上午我要去学校。"],
  ["下午你要和谁去哪儿？","Xiàwǔ nǐ yào hé shéi qù nǎr?","下午我要和朋友去看电影。"],
  ["你几点回家？","Nǐ jǐ diǎn huí jiā?","我五点后回家。"],
  ["你想和朋友做什么？","Nǐ xiǎng hé péngyou zuò shénme?","我们去饭店吃饭吧！"]]}]},
{id:"n",kind:"say",w:2,t:"Nhìn bảng, nói về bạn 阮明 (Ruǎn Míng)",note:"Bấm 🎤 rồi nói một câu đầy đủ cho mỗi ô (hoặc gõ). Câu máy nghe trùng đáp án được chấm ngay, câu khác gửi cô chấm (✓ 2 điểm · ½ 1 điểm · ✗ 0).",
 table:[["昨天","zuótiān",[["上午","shàngwǔ","去医院看病","qù yīyuàn kànbìng"],["下午","xiàwǔ","在家睡觉","zài jiā shuìjiào"]]],
  ["现在","xiànzài",[["阮明","Ruǎn Míng","写汉字","xiě Hànzì"],["妈妈","māma","做饭","zuò fàn"],["爸爸","bàba","看电视","kàn diànshì"]]],
  ["明天","míngtiān",[["上午","shàngwǔ","去学校（会下雨）","qù xuéxiào (huì xià yǔ)"],["下午","xiàwǔ","和朋友去看电影","hé péngyou qù kàn diànyǐng"]]]],
 items:[
 {tag:"ĐÃ",cue:"昨天上午 · 去医院看病",cp:"zuótiān shàngwǔ · qù yīyuàn kànbìng",acc:["{昨天上午{阮明|他}|{阮明|他}昨天上午}去医院看病了"],ref:"昨天上午阮明去医院看病了。",rp:"Zuótiān shàngwǔ Ruǎn Míng qù yīyuàn kànbìng le."},
 {tag:"ĐÃ",cue:"昨天下午 · 在家睡觉",cp:"zuótiān xiàwǔ · zài jiā shuìjiào",acc:["{昨天下午{阮明|他}|{阮明|他}昨天下午}在家睡觉[了|呢]","{昨天下午{阮明|他}|{阮明|他}昨天下午}回家睡觉了"],ref:"昨天下午阮明在家睡觉。",rp:"Zuótiān xiàwǔ Ruǎn Míng zài jiā shuìjiào."},
 {tag:"ĐANG",cue:"现在 · 阮明 · 写汉字",cp:"xiànzài · Ruǎn Míng · xiě Hànzì",acc:["{[现在]{阮明|他}|{阮明|他}现在}{在|正在}写汉字[呢]"],ref:"现在阮明在写汉字呢。",rp:"Xiànzài Ruǎn Míng zài xiě Hànzì ne."},
 {tag:"ĐANG",cue:"现在 · 妈妈 · 做饭",cp:"xiànzài · māma · zuò fàn",acc:["{[现在][他]妈妈|[他]妈妈现在}{在|正在}做饭[呢]"],ref:"妈妈在做饭呢。",rp:"Māma zài zuò fàn ne."},
 {tag:"ĐANG",cue:"现在 · 爸爸 · 看电视",cp:"xiànzài · bàba · kàn diànshì",acc:["{[现在][他]爸爸|[他]爸爸现在}{在|正在}看电视[呢]"],ref:"爸爸在看电视呢。",rp:"Bàba zài kàn diànshì ne."},
 {tag:"SẼ",cue:"明天上午 · 去学校（会下雨）",cp:"míngtiān shàngwǔ · qù xuéxiào (huì xià yǔ)",acc:["{明天上午{阮明|他}|{阮明|他}明天上午}要去学校[明天]会下雨","明天会下雨{明天上午{阮明|他}|{阮明|他}明天上午}要去学校"],ref:"明天上午阮明要去学校，明天会下雨。",rp:"Míngtiān shàngwǔ Ruǎn Míng yào qù xuéxiào, míngtiān huì xià yǔ."},
 {tag:"SẼ",cue:"明天下午 · 和朋友去看电影",cp:"míngtiān xiàwǔ · hé péngyou qù kàn diànyǐng",acc:["{明天下午{阮明|他}|{阮明|他}明天下午}要和朋友[一起]去看电影"],ref:"明天下午阮明要和朋友去看电影。",rp:"Míngtiān xiàwǔ Ruǎn Míng yào hé péngyou qù kàn diànyǐng."}]}
]}]);
