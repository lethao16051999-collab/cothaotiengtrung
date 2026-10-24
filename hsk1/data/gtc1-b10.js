/* ===== Giáo trình chuẩn HSK 1 · Bài 10: 我能坐这儿吗？ (sách trang 84–92) ===== */
Object.assign(SPN,{"王方":["Wáng Fāng","Vương Phương"]});
LD1[10]={t:"我能坐这儿吗？",tp:"Wǒ néng zuò zhèr ma?",vi:"Tôi có thể ngồi ở đây được không?",
gpNote:"Ngữ pháp lấy từ mục Chú thích (注释) của sách: câu chữ 有 diễn tả sự tồn tại, liên từ 和, động từ năng nguyện 能, câu cầu khiến với 请, kèm lỗi người Việt hay mắc.",
goals:["Nói ở đâu có gì bằng 有 / 没有 (桌子上有一个电脑和一本书。).","Xin phép bằng 能……吗？ và mời lịch sự bằng 请 (请坐。).","Nói vị trí bằng 上 / 里 / 前面 / 后面; nối hai thứ bằng 和."],
texts:[
{ctx:"在办公室 · Trong văn phòng: hỏi trên bàn có gì, cái cốc ở đâu.",a:"c10-1",l:[
["A","桌子上有什么？","Zhuōzi shang yǒu shénme?","Trên bàn có gì vậy?"],
["B","桌子上有一个电脑和一本书。","Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū.","Có một chiếc máy vi tính và một quyển sách."],
["A","杯子在哪儿？","Bēizi zài nǎr?","Vậy cái ly đâu?"],
["B","杯子在桌子里。","Bēizi zài zhuōzi li.","Ở trong bàn."]]},
{ctx:"在健身房 · Ở phòng tập thể dục: hỏi tên người phía trước, phía sau.",a:"c10-2",l:[
["A","前面那个人叫什么名字？","Qiánmiàn nàge rén jiào shénme míngzi?","Người ở phía trước tên gì vậy?"],
["B","她叫王方，在医院工作。","Tā jiào Wáng Fāng, zài yīyuàn gōngzuò.","Cô ấy tên là Vương Phương, làm việc ở bệnh viện."],
["A","后面那个人呢？他叫什么名字？","Hòumiàn nàge rén ne? Tā jiào shénme míngzi?","Còn người ở phía sau? Anh ấy tên gì?"],
["B","他叫谢朋，在商店工作。","Tā jiào Xiè Péng, zài shāngdiàn gōngzuò.","Anh ấy tên Tạ Bằng, làm việc ở cửa hàng."]]},
{ctx:"在图书馆 · Ở thư viện: hỏi xin ngồi chỗ trống.",a:"c10-3",l:[
["A","这儿有人吗？","Zhèr yǒu rén ma?","Chỗ này có ai ngồi chưa?"],
["B","没有。","Méiyǒu.","Chưa."],
["A","我能坐这儿吗？","Wǒ néng zuò zhèr ma?","Tôi có thể ngồi ở đây được không?"],
["B","请坐。","Qǐng zuò.","Được, xin mời."]]}],
words:[
["桌子","zhuōzi","danh từ","bàn",0],["上","shang","danh từ","trên, phía trên",0],["电脑","diànnǎo","danh từ","máy vi tính",0],["和","hé","liên từ","và",0],["本","běn","lượng từ","quyển, cuốn",0],["里","li","danh từ","trong, bên trong",0],
["前面","qiánmiàn","danh từ","phía trước",1],["后面","hòumiàn","danh từ","phía sau",1],["王方","Wáng Fāng","danh từ riêng","Vương Phương (tên người)",1],["谢朋","Xiè Péng","danh từ riêng","Tạ Bằng (tên người)",1],
["这儿","zhèr","đại từ","chỗ này, ở đây",2],["没有","méiyǒu (méi)","phó từ","không có",2],["能","néng","động từ năng nguyện","có thể",2],["坐","zuò","động từ","ngồi",2]],
gp:[
{h:"1. Câu chữ 有: ở đâu có gì",b:`<span class="fm">Nơi chốn / vị trí ＋ 有 ＋ người / vật<small>… yǒu …</small></span><ul><li>${Z("椅子下面有一只小狗。","Yǐzi xiàmiàn yǒu yì zhī xiǎo gǒu.")}</li><li>${Z("学校里有一个商店。","Xuéxiào li yǒu yí ge shāngdiàn.")}</li><li>${Z("桌子上有一个电脑和一本书。","Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū.")}</li></ul><p><b>Phủ định:</b> 没有, và <b>không</b> kèm số lượng trước tân ngữ: ${Z("椅子下面没有小狗。","Yǐzi xiàmiàn méiyǒu xiǎo gǒu.")} · ${Z("学校里没有商店。","Xuéxiào li méiyǒu shāngdiàn.")} · ${Z("桌子上没有电脑和书。","Zhuōzi shang méiyǒu diànnǎo hé shū.")}</p>`+W1(`Lỗi hay gặp: phủ định bằng 不 ✗ 桌子上不有书; giữ số lượng ✗ 桌子上没有一本书; nói theo trật tự tiếng Việt “có một quyển sách trên bàn” ✗ 有一本书在桌子上. Nơi chốn đứng <b>đầu câu</b>. So sánh: ${Z("杯子在桌子里。","Bēizi zài zhuōzi li.")} (biết vật, hỏi vị trí → 在) và ${Z("桌子上有什么？","Zhuōzi shang yǒu shénme?")} (biết vị trí, hỏi có gì → 有).`)},
{h:"2. Liên từ 和",b:`<span class="fm">A 和 B<small>A hé B</small></span><ul><li>${Z("我有一个中国朋友和一个美国朋友。","Wǒ yǒu yí ge Zhōngguó péngyou hé yí ge Měiguó péngyou.")}</li><li>${Z("我家有三口人，爸爸、妈妈和我。","Wǒ jiā yǒu sān kǒu rén, bàba, māma hé wǒ.")}</li><li>${Z("桌子上有一个电脑和一本书。","Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū.")}</li></ul>`+W1(`和 chỉ nối danh từ / cụm danh từ, không nối hai câu như chữ “và” tiếng Việt ✗ 我喝茶和他看书. Nối ba thứ: A、B 和 C.`)},
{h:"3. Động từ năng nguyện 能",b:`<span class="fm">能 ＋ động từ · 能……吗？ (xin phép)<small>néng … · néng … ma?</small></span><ul><li>${Z("明天下午我能去商店。","Míngtiān xiàwǔ wǒ néng qù shāngdiàn.")}</li><li>${Z("你能在这儿写你的名字吗？","Nǐ néng zài zhèr xiě nǐ de míngzi ma?")}</li><li>${Z("我能坐这儿吗？","Wǒ néng zuò zhèr ma?")} — ${Z("请坐。","Qǐng zuò.")}</li></ul><p>💡 Phân biệt: ${Z("会","huì")} = biết (học mà có) · ${Z("能","néng")} = có thể, được phép.</p>`+W1(`Lỗi hay gặp: đặt 能 sau động từ ✗ 我坐能这儿吗？. 能 luôn đứng <b>trước</b> động từ.`)},
{h:"4. Câu cầu khiến với 请",b:`<span class="fm">请 ＋ động từ (＋ tân ngữ)<small>qǐng …</small></span><ul><li>${Z("请写您的名字。","Qǐng xiě nín de míngzi.")}</li><li>${Z("请喝茶。","Qǐng hē chá.")}</li><li>${Z("请坐。","Qǐng zuò.")}</li></ul><p>Lời mời, đề nghị mềm mỏng, lịch sự.</p>`},
{h:"5. Từ chỉ vị trí: 上 · 里 · 下面 · 前面 · 后面",b:`<span class="fm">Vật mốc ＋ 上 / 里 / 下面 / 前面 / 后面<small>… shang / li / xiàmiàn / qiánmiàn / hòumiàn</small></span><ul><li>${Z("桌子上","zhuōzi shang")} trên bàn · ${Z("桌子里","zhuōzi li")} trong bàn · ${Z("椅子下面","yǐzi xiàmiàn")} dưới ghế</li><li>${Z("前面那个人","qiánmiàn nàge rén")} người ở phía trước · ${Z("后面那个人","hòumiàn nàge rén")} người ở phía sau</li></ul>`+W1(`Trật tự ngược với tiếng Việt: “trên bàn” → ${Z("桌子上","zhuōzi shang")}, không nói ✗ 上桌子. 上, 里 trong bài đọc nhẹ (shang, li).`)}],
gq:[
{q:"“Trên bàn có gì?” nói là:",o:["桌子上有什么？|Zhuōzi shang yǒu shénme?","上桌子有什么？|Shàng zhuōzi yǒu shénme?","桌子上是什么吗？|Zhuōzi shang shì shénme ma?"],e:"Vị trí + 有 + 什么."},
{q:"“Trên bàn không có máy tính” nói là:",o:["桌子上没有电脑。|Zhuōzi shang méiyǒu diànnǎo.","桌子上不有电脑。|Zhuōzi shang bù yǒu diànnǎo.","桌子上没有一个电脑。|Zhuōzi shang méiyǒu yí ge diànnǎo."],e:"Phủ định 没有, không kèm số lượng."},
{q:"“Một máy tính và một quyển sách”:",o:["一个电脑和一本书|yí ge diànnǎo hé yì běn shū","一本电脑和一个书|yì běn diànnǎo hé yí ge shū","一个电脑和一个书|yí ge diànnǎo hé yí ge shū"],e:"Sách dùng lượng từ 本."},
{q:"Xin phép “Tôi ngồi đây được không?”:",o:["我能坐这儿吗？|Wǒ néng zuò zhèr ma?","我坐能这儿吗？|Wǒ zuò néng zhèr ma?","我能这儿坐吗？|Wǒ néng zhèr zuò ma?"],e:"能 + động từ + 这儿 + 吗."},
{q:"Mời khách ngồi:",o:["请坐。|Qǐng zuò.","坐请。|Zuò qǐng.","你能坐。|Nǐ néng zuò."],e:"请 + động từ."},
{q:"Hỏi “这儿有人吗？”, chỗ còn trống thì trả lời:",o:["没有。|Méiyǒu.","不有。|Bù yǒu.","不是。|Bú shì."],e:"Phủ định của 有 là 没有."},
{q:"“Cái cốc ở trong bàn”:",o:["杯子在桌子里。|Bēizi zài zhuōzi li.","杯子在里桌子。|Bēizi zài li zhuōzi.","杯子有桌子里。|Bēizi yǒu zhuōzi li."],e:"Biết vật, nói vị trí → 在 + vật mốc + 里."},
{q:"“Người phía trước tên gì?”:",o:["前面那个人叫什么名字？|Qiánmiàn nàge rén jiào shénme míngzi?","那个人前面叫什么名字？|Nàge rén qiánmiàn jiào shénme míngzi?","前面那个人叫什么名字吗？|Qiánmiàn nàge rén jiào shénme míngzi ma?"],e:"前面 đứng trước 那个人."}],
dt:[["桌子上有什么？","Zhuōzi shang yǒu shénme?"],["桌子上有一个电脑和一本书。","Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū."],["杯子在哪儿？","Bēizi zài nǎr?"],["杯子在桌子里。","Bēizi zài zhuōzi li."],["前面那个人叫什么名字？","Qiánmiàn nàge rén jiào shénme míngzi?"],["她叫王方，在医院工作。","Tā jiào Wáng Fāng, zài yīyuàn gōngzuò."],["他叫谢朋，在商店工作。","Tā jiào Xiè Péng, zài shāngdiàn gōngzuò."],["这儿有人吗？","Zhèr yǒu rén ma?"],["我能坐这儿吗？","Wǒ néng zuò zhèr ma?"],["请坐。","Qǐng zuò."]],
tsort:[
{t:["桌子","上","有","什么","？"],ok:["桌子上有什么？"],p:"Zhuōzi shang yǒu shénme?",e:"Vị trí + 有 + 什么."},
{t:["桌子","上","有","一个","电脑","和","一本","书","。"],ok:["桌子上有一个电脑和一本书。","桌子上有一本书和一个电脑。"],p:"Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū.",e:"A 和 B."},
{t:["杯子","在","桌子","里","。"],ok:["杯子在桌子里。"],p:"Bēizi zài zhuōzi li.",e:"在 + vật mốc + 里."},
{t:["这儿","有","人","吗","？"],ok:["这儿有人吗？"],p:"Zhèr yǒu rén ma?",e:"Nơi chốn + 有 + 人 + 吗."},
{t:["我","能","坐","这儿","吗","？"],ok:["我能坐这儿吗？"],p:"Wǒ néng zuò zhèr ma?",e:"能 + động từ."}],
tlis:[
{a:"桌子上有什么？",o:["桌子上有一个电脑和一本书。|Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū.","杯子在桌子里。|Bēizi zài zhuōzi li.","请坐。|Qǐng zuò."]},
{a:"这儿有人吗？",o:["没有。|Méiyǒu.","她叫王方。|Tā jiào Wáng Fāng.","在桌子里。|Zài zhuōzi li."]},
{a:"我能坐这儿吗？",o:["请坐。|Qǐng zuò.","没有。|Méiyǒu.","他叫谢朋。|Tā jiào Xiè Péng."]},
{a:"她叫王方，在医院工作。",qz:"王方在哪儿工作？",qp:"Wáng Fāng zài nǎr gōngzuò?",o:["医院|yīyuàn","商店|shāngdiàn","学校|xuéxiào"]},
{a:"杯子在桌子里。",qz:"杯子在哪儿？",qp:"Bēizi zài nǎr?",o:["桌子里|zhuōzi li","桌子上|zhuōzi shang","椅子下面|yǐzi xiàmiàn"]}],
sit:[
{title:"Tình huống 1 · Trong văn phòng",ctx:"Hỏi trên bàn có gì, cái cốc ở đâu.",turns:[
{w:"A",vi:"Hỏi trên bàn có gì.",h:[["桌子上","zhuōzi shang"],["有","yǒu"],["什么","shénme"]],r:["桌子上有什么？","Zhuōzi shang yǒu shénme?","Trên bàn có gì vậy?"]},
{w:"B",vi:"Nói có một máy tính và một quyển sách.",h:[["桌子上有","zhuōzi shang yǒu"],["一个电脑","yí ge diànnǎo"],["和","hé"],["一本书","yì běn shū"]],r:["桌子上有一个电脑和一本书。","Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū.","Có một chiếc máy vi tính và một quyển sách."]},
{w:"A",vi:"Hỏi cái cốc ở đâu.",h:[["杯子","bēizi"],["在","zài"],["哪儿","nǎr"]],r:["杯子在哪儿？","Bēizi zài nǎr?","Vậy cái ly đâu?"]},
{w:"B",vi:"Nói cái cốc ở trong bàn.",h:[["杯子","bēizi"],["在","zài"],["桌子里","zhuōzi li"]],r:["杯子在桌子里。","Bēizi zài zhuōzi li.","Ở trong bàn."]}]},
{title:"Tình huống 2 · Ở phòng tập thể dục",ctx:"Hỏi tên người phía trước và phía sau.",turns:[
{w:"A",vi:"Hỏi người phía trước tên gì.",h:[["前面","qiánmiàn"],["那个人","nàge rén"],["叫什么名字","jiào shénme míngzi"]],r:["前面那个人叫什么名字？","Qiánmiàn nàge rén jiào shénme míngzi?","Người ở phía trước tên gì vậy?"]},
{w:"B",vi:"Nói cô ấy tên Vương Phương, làm việc ở bệnh viện.",h:[["她叫","tā jiào"],["王方","Wáng Fāng"],["在医院","zài yīyuàn"],["工作","gōngzuò"]],r:["她叫王方，在医院工作。","Tā jiào Wáng Fāng, zài yīyuàn gōngzuò.","Cô ấy tên là Vương Phương, làm việc ở bệnh viện."]},
{w:"A",vi:"Hỏi còn người phía sau tên gì.",h:[["后面","hòumiàn"],["那个人呢","nàge rén ne"],["他叫","tā jiào"],["什么名字","shénme míngzi"]],r:["后面那个人呢？他叫什么名字？","Hòumiàn nàge rén ne? Tā jiào shénme míngzi?","Còn người ở phía sau? Anh ấy tên gì?"]},
{w:"B",vi:"Nói anh ấy tên Tạ Bằng, làm việc ở cửa hàng.",h:[["他叫","tā jiào"],["谢朋","Xiè Péng"],["在商店","zài shāngdiàn"],["工作","gōngzuò"]],r:["他叫谢朋，在商店工作。","Tā jiào Xiè Péng, zài shāngdiàn gōngzuò.","Anh ấy tên Tạ Bằng, làm việc ở cửa hàng."]}]},
{title:"Tình huống 3 · Ở thư viện",ctx:"Em thấy một chỗ trống, hỏi xin ngồi.",turns:[
{w:"A",vi:"Hỏi chỗ này có ai ngồi chưa.",h:[["这儿","zhèr"],["有人","yǒu rén"],["吗","ma"]],r:["这儿有人吗？","Zhèr yǒu rén ma?","Chỗ này có ai ngồi chưa?"]},
{w:"B",vi:"Trả lời: không có.",h:[["没有","méiyǒu"]],r:["没有。","Méiyǒu.","Chưa."]},
{w:"A",vi:"Xin phép ngồi ở đây.",h:[["我","wǒ"],["能","néng"],["坐","zuò"],["这儿吗","zhèr ma"]],r:["我能坐这儿吗？","Wǒ néng zuò zhèr ma?","Tôi có thể ngồi ở đây được không?"]},
{w:"B",vi:"Mời ngồi.",h:[["请","qǐng"],["坐","zuò"]],r:["请坐。","Qǐng zuò.","Được, xin mời."]}]},
{title:"Tình huống 4 · Vận dụng: tìm chỗ ngồi trong lớp tiếng Trung",ctx:"Em đến lớp muộn, thấy một ghế trống bên cạnh bạn học.",turns:[
{w:"我",vi:"Hỏi chỗ này có ai ngồi chưa.",h:[["这儿","zhèr"],["有人吗","yǒu rén ma"]],r:["这儿有人吗？","Zhèr yǒu rén ma?","Chỗ này có ai ngồi chưa?"]},
{w:"同学",vi:"Trả lời: không có.",h:[["没有","méiyǒu"]],r:["没有。","Méiyǒu.","Chưa có."]},
{w:"我",vi:"Xin phép ngồi đây.",h:[["我","wǒ"],["能坐","néng zuò"],["这儿吗","zhèr ma"]],r:["我能坐这儿吗？","Wǒ néng zuò zhèr ma?","Mình ngồi đây được không?"]},
{w:"同学",vi:"Mời ngồi.",h:[["请坐","qǐng zuò"]],r:["请坐。","Qǐng zuò.","Mời bạn ngồi."]},
{w:"我",vi:"Hỏi trên bàn có gì (sách của ai).",h:[["桌子上","zhuōzi shang"],["有","yǒu"],["什么","shénme"]],r:["桌子上有什么？","Zhuōzi shang yǒu shénme?","Trên bàn có gì vậy?"]},
{w:"同学",vi:"Nói trên bàn có một quyển sách tiếng Trung và một cái cốc.",h:[["桌子上有","zhuōzi shang yǒu"],["一本汉语书","yì běn Hànyǔ shū"],["和","hé"],["一个杯子","yí ge bēizi"]],r:["桌子上有一本汉语书和一个杯子。","Zhuōzi shang yǒu yì běn Hànyǔ shū hé yí ge bēizi.","Trên bàn có một quyển sách tiếng Trung và một cái cốc."]}]}],
act:[
{title:"双人活动 · Hoạt động theo cặp: trên bàn, dưới ghế có gì?",ctx:"Hai người một nhóm, hỏi đáp theo tình hình thật trong lớp.",
req:["两人一组，根据实际情况进行问答练习。","Liǎng rén yì zǔ, gēnjù shíjì qíngkuàng jìnxíng wèndá liànxí.","Ghép thành từng cặp, luyện tập đặt câu hỏi và trả lời."],
roles:["A","B"],
l:[
["A","你的桌子上面有什么？","Nǐ de zhuōzi shàngmiàn yǒu shénme?","Trên bàn của bạn có gì?","Hỏi trên bàn bạn có gì (ví dụ trong sách)."],
["B","我的桌子上面有一本书和一个杯子。","Wǒ de zhuōzi shàngmiàn yǒu yì běn shū hé yí ge bēizi.","Trên bàn mình có một quyển sách và một cái cốc.","Trả lời bằng 有……和……"],
["A","你的椅子下面有什么？","Nǐ de yǐzi xiàmiàn yǒu shénme?","Dưới ghế của bạn có gì?","Hỏi dưới ghế bạn có gì (ví dụ trong sách)."],
["B","我的椅子下面没有东西。","Wǒ de yǐzi xiàmiàn méiyǒu dōngxi.","Dưới ghế mình không có gì.","Trả lời bằng 没有."]],
note:"Câu hỏi lượt 1, 3 là ví dụ trong sách; câu trả lời Claude điền mẫu. 上面 (shàngmiàn): phía trên.",
sub:[["Đồ vật",[["书","shū","sách"],["杯子","bēizi","cốc"],["电脑","diànnǎo","máy tính"],["汉语书","Hànyǔ shū","sách tiếng Trung"]]]]},
{title:"小组活动 · Hoạt động nhóm: ai ngồi ở đâu?",ctx:"Nhóm 3–4 người giới thiệu vị trí ngồi của từng thành viên, ghi vào bảng (họ tên · vị trí), rồi cử một bạn báo cáo. Từ bổ sung: 后面 hòumiàn (phía sau), 左边 zuǒbian (bên trái), 右边 yòubian (bên phải).",
req:["3~4人一组，互相介绍小组各成员的座位位置并记录，每组请一位同学报告情况。","Sān dào sì rén yì zǔ, hùxiāng jièshào xiǎozǔ gè chéngyuán de zuòwèi wèizhi bìng jìlù, měi zǔ qǐng yí wèi tóngxué bàogào qíngkuàng.","Lập nhóm từ 3 đến 4 người, giới thiệu cho nhau biết các thành viên ngồi ở đâu, ghi lại và cử một đại diện trình bày."],
roles:["我","同学"],
l:[
["我","大卫在哪儿？","Dàwèi zài nǎr?","David ngồi ở đâu?","Hỏi David ngồi ở đâu."],
["同学","大卫在我左边。","Dàwèi zài wǒ zuǒbian.","David ở bên trái mình.","Trả lời theo bảng mẫu (cách 1)."],
["我","你右边是谁？","Nǐ yòubian shì shéi?","Bên phải bạn là ai?","Hỏi bên phải bạn là ai."],
["同学","我右边是王方。","Wǒ yòubian shì Wáng Fāng.","Bên phải mình là Vương Phương.","Trả lời theo cách 2: ……边是……"]],
note:"Câu mẫu 大卫在我左边。/ 我左边是大卫。 lấy từ bảng trong sách; câu hỏi và lượt 3–4 Claude soạn.",
sub:[["Vị trí",[["左边","zuǒbian","bên trái"],["右边","yòubian","bên phải"],["前面","qiánmiàn","phía trước"],["后面","hòumiàn","phía sau"]]]]}]};
GXD["1-10"]={so:[
{t:["桌子|zhuōzi","上|shang","有|yǒu","一本|yì běn","书|shū"],ok:["桌子上有一本书"],f:"桌子上有一本书。",p:"Zhuōzi shang yǒu yì běn shū.",e:"Vị trí + 有 + vật."},
{t:["学校|xuéxiào","里|li","没有|méiyǒu","商店|shāngdiàn"],ok:["学校里没有商店"],f:"学校里没有商店。",p:"Xuéxiào li méiyǒu shāngdiàn.",e:"Phủ định 没有, không kèm số lượng."},
{t:["我|wǒ","能|néng","坐|zuò","这儿|zhèr","吗|ma"],ok:["我能坐这儿吗"],f:"我能坐这儿吗？",p:"Wǒ néng zuò zhèr ma?",e:"能 + động từ."},
{t:["请|qǐng","喝|hē","茶|chá"],ok:["请喝茶"],f:"请喝茶。",p:"Qǐng hē chá.",e:"请 + động từ."},
{t:["我家|wǒ jiā","有|yǒu","爸爸|bàba","妈妈|māma","和|hé","我|wǒ"],ok:["我家有爸爸妈妈和我"],f:"我家有爸爸、妈妈和我。",p:"Wǒ jiā yǒu bàba, māma hé wǒ.",e:"A、B 和 C."}],
tr:[
{vi:"Trên bàn có gì?",a:["桌子上有什么"],r:["桌子上有什么？","Zhuōzi shang yǒu shénme?"]},
{vi:"Trên bàn có một máy tính và một quyển sách.",a:["桌子上有一个电脑和一本书","桌子上有一本书和一个电脑"],r:["桌子上有一个电脑和一本书。","Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū."]},
{vi:"Chỗ này có ai ngồi chưa?",a:["这儿有人吗"],r:["这儿有人吗？","Zhèr yǒu rén ma?"]},
{vi:"Tôi có thể ngồi ở đây không?",a:["我能坐这儿吗","我能坐在这儿吗"],r:["我能坐这儿吗？","Wǒ néng zuò zhèr ma?"]},
{vi:"Mời ngồi.",a:["请坐"],r:["请坐。","Qǐng zuò."]}],
pc:[
{img:"h1cb10a",req:"Nói ở chỗ này có gì (gợi ý trong sách: ___有___。).",kw:[{l:"有",m:[["有","you"]]},{l:"桌子 / 椅子 / 杯子",m:[["桌子","zhuozi"],["椅子","yizi"],["杯子","beizi"]]}],r:[["这儿有一个桌子和一个椅子。","Zhèr yǒu yí ge zhuōzi hé yí ge yǐzi.","Ở đây có một cái bàn và một cái ghế."],["桌子上有一个杯子。","Zhuōzi shang yǒu yí ge bēizi.","Trên bàn có một cái cốc."]]},
{img:"h1cb10b",req:"Nói trên bàn có những gì (gợi ý trong sách: ___有___和___。).",kw:[{l:"有",m:[["有","you"]]},{l:"电脑",m:[["电脑","diannao"]]},{l:"和",m:[["和","he"]]}],r:[["桌子上有一个电脑和一本书。","Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū.","Trên bàn có một máy tính và một quyển sách."],["桌子上有一个电脑和书。","Zhuōzi shang yǒu yí ge diànnǎo hé shū.","Trên bàn có một máy tính và sách."]]},
{img:"h1cb10c",req:"Người đàn ông xin ngồi (gợi ý trong sách: 我能___吗？).",kw:[{l:"能",m:[["能","neng"]]},{l:"坐这儿",m:[["坐这儿","zuozher"],["坐这","zuozhe"]]}],r:[["我能坐这儿吗？","Wǒ néng zuò zhèr ma?","Tôi có thể ngồi đây không?"]]},
{img:"h1cb10d",req:"Anh ấy làm việc ở cửa hàng (gợi ý trong sách: 他在___工作。).",kw:[{l:"商店",m:[["商店","shangdian"]]}],r:[["他在商店工作。","Tā zài shāngdiàn gōngzuò.","Anh ấy làm việc ở cửa hàng."]]}]};
var TKP=Object.assign(window.TKP||{},{"桌子":"zhuōzi","上":"shang","里":"li","有":"yǒu","没有":"méiyǒu","什么":"shénme","一个":"yí ge","电脑":"diànnǎo","和":"hé","一本":"yì běn","书":"shū","杯子":"bēizi","在":"zài","这儿":"zhèr","人":"rén","吗":"ma","能":"néng","坐":"zuò","我":"wǒ"});
