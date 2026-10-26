/* ===== Nền theo ngày lễ · thêm 24/10/2026 =====
   - Tự đổi nền + dải lời chúc theo lịch lễ Việt Nam / Trung Quốc (LE_DEF). Hiệu ứng rơi chỉ hiện ở Trang chủ.
   - Cài đặt dành cho giáo viên: Bảng theo dõi (#theodoi, cần mật khẩu) › tab "🎨 Nền ngày lễ".
   - Cài đặt lưu trên Google Sheets (API "nen", đoạn mã nenApi_ trong Code.gs) để mọi học viên thấy.
     Chưa có đoạn mã đó thì nền vẫn chạy theo lịch mặc định; cài đặt chỉ áp dụng trên máy của cô.
   - Ngày dạng "mm-dd" lặp lại mỗi năm; ngày âm lịch ghi đủ "yyyy-mm-dd" (năm sau cô sửa ngày trong cài đặt).
   Nạp CUỐI CÙNG (sau theodoi.js, nhac.js). ===== */
const LE_DEF=[
 {id:"nhagiao",vi:"Ngày Nhà giáo Việt Nam",zh:"越南教师节",day:"20/11",s:"11-14",e:"11-21",ic:"🌷"},
 {id:"dongchi",vi:"Đông chí",zh:"冬至",day:"22/12/2026",s:"2026-12-20",e:"2026-12-22",ic:"❄️"},
 {id:"giangsinh",vi:"Giáng sinh",zh:"圣诞节",day:"25/12",s:"12-18",e:"12-26",ic:"🎄"},
 {id:"duonglich",vi:"Tết Dương lịch",zh:"元旦",day:"1/1",s:"12-29",e:"01-03",ic:"🎆"},
 {id:"laba",vi:"Lễ Lạp Bát",zh:"腊八节",day:"15/1/2027",s:"2027-01-13",e:"2027-01-15",ic:"🥣"},
 {id:"ongtao",vi:"Ông Công Ông Táo",zh:"小年",day:"30/1/2027",s:"2027-01-28",e:"2027-01-30",ic:"🐟"},
 {id:"tet",vi:"Tết Nguyên đán",zh:"春节",day:"6/2/2027",s:"2027-01-31",e:"2027-02-14",ic:"🏮"},
 {id:"nguyentieu",vi:"Rằm tháng Giêng",zh:"元宵节",day:"20/2/2027",s:"2027-02-18",e:"2027-02-21",ic:"🏮"},
 {id:"valentine",vi:"Lễ Tình nhân",zh:"情人节",day:"14/2",s:"02-14",e:"02-14",ic:"💝"},
 {id:"phunu",vi:"Quốc tế Phụ nữ",zh:"三八妇女节",day:"8/3",s:"03-05",e:"03-08",ic:"🌷"},
 {id:"thanhminh",vi:"Thanh minh · Hàn thực",zh:"清明节 · 寒食节",day:"5/4 & 9/4/2027",s:"2027-04-02",e:"2027-04-09",ic:"🌿"},
 {id:"doanngo",vi:"Tết Đoan Ngọ",zh:"端午节",day:"9/6/2027",s:"2027-06-06",e:"2027-06-09",ic:"🐉"},
 {id:"thattich",vi:"Lễ Thất Tịch",zh:"七夕节",day:"8/8/2027",s:"2027-08-05",e:"2027-08-08",ic:"🌌"},
 {id:"trungthu",vi:"Tết Trung thu",zh:"中秋节",day:"15/9/2027",s:"2027-09-08",e:"2027-09-16",ic:"🥮"}];

/* ---------- lời chúc (chữ Hán · phiên âm · tiếng Việt) và tên lễ có phiên âm ---------- */
const LE_MSG={
 nhagiao:{z:"老师，您辛苦了！",p:"Lǎoshī, nín xīnkǔ le!",v:"Chúc mừng Ngày Nhà giáo Việt Nam 20/11 – thầy cô vất vả rồi ạ!",np:"Yuènán Jiàoshī Jié"},
 dongchi:{z:"冬至快乐！",p:"Dōngzhì kuàilè!",v:"Đông chí vui vẻ – nhớ ăn bát sủi cảo cho ấm nhé!",np:"Dōngzhì"},
 giangsinh:{z:"圣诞快乐！",p:"Shèngdàn kuàilè!",v:"Chúc mừng Giáng sinh!",np:"Shèngdàn Jié"},
 duonglich:{z:"新年快乐！",p:"Xīnnián kuàilè!",v:"Chúc mừng năm mới!",np:"Yuándàn"},
 laba:{z:"腊八节快乐！",p:"Làbā Jié kuàilè!",v:"Lễ Lạp Bát vui vẻ – không khí Tết bắt đầu rồi!",np:"Làbā Jié"},
 ongtao:{z:"小年快乐！",p:"Xiǎonián kuàilè!",v:"Tiễn ông Công ông Táo về trời – chúc nhà nhà bình an!",np:"Xiǎonián"},
 tet:{z:"春节快乐！恭喜发财！",p:"Chūnjié kuàilè! Gōngxǐ fācái!",v:"Chúc mừng năm mới Đinh Mùi 2027 – an khang thịnh vượng!",np:"Chūnjié"},
 nguyentieu:{z:"元宵节快乐！",p:"Yuánxiāo Jié kuàilè!",v:"Chúc mừng Rằm tháng Giêng – gia đình đoàn viên, bình an!",np:"Yuánxiāo Jié"},
 valentine:{z:"情人节快乐！",p:"Qíngrén Jié kuàilè!",v:"Chúc mừng ngày Lễ Tình nhân 14/2!",np:"Qíngrén Jié"},
 thanhminh:{z:"清明安康！",p:"Qīngmíng ānkāng!",v:"Tiết Thanh minh – tưởng nhớ tổ tiên, chúc cả nhà bình an!",np:"Qīngmíng Jié · Hánshí Jié"},
 doanngo:{z:"端午安康！",p:"Duānwǔ ānkāng!",v:"Tết Đoan Ngọ – chúc cả nhà mạnh khỏe, bình an!",np:"Duānwǔ Jié"},
 thattich:{z:"七夕快乐！",p:"Qīxī kuàilè!",v:"Lễ Thất Tịch – ngày Ngưu Lang Chức Nữ gặp nhau!",np:"Qīxī Jié"},
 trungthu:{z:"中秋节快乐！",p:"Zhōngqiū Jié kuàilè!",v:"Chúc mừng Tết Trung thu – trăng tròn, người đoàn viên!",np:"Zhōngqiū Jié"},
 phunu:{z:"妇女节快乐！",p:"Fùnǚ Jié kuàilè!",v:"Chúc mừng ngày Quốc tế Phụ nữ 8/3!",np:"Sān-Bā Fùnǚ Jié"}};

/* ---------- Khám phá văn hóa: vn = Việt Nam, cn = Trung Quốc; y = ý nghĩa, h = hoạt động chính, c = câu chúc.
   Trong chữ: {汉字|pīnyīn} hiện chữ Hán kèm phiên âm. Câu chúc tiếng Trung: [chữ Hán, phiên âm, nghĩa]. ---------- */
const LE_VH={
 nhagiao:{vn:{y:"Ngày 20/11 tôn vinh nghề dạy học, là dịp học trò bày tỏ lòng biết ơn thầy cô theo truyền thống “Tôn sư trọng đạo”, “Uống nước nhớ nguồn”.",
   h:["Học sinh tặng hoa, thiệp, viết lời tri ân thầy cô","Trường tổ chức mít tinh, văn nghệ, thi làm báo tường","Học trò cũ về thăm thầy cô giáo cũ"],c:["Chúc thầy cô luôn mạnh khỏe, hạnh phúc!","Em cảm ơn thầy cô đã tận tình dạy dỗ!"]},
  cn:{y:"Ngày Nhà giáo của Trung Quốc ({教师节|Jiàoshī Jié}) là ngày 10/9, rơi vào đầu năm học mới (có từ năm 1985). Câu {一日为师，终身为父|yí rì wéi shī, zhōngshēn wéi fù} “một ngày là thầy, cả đời là cha” thể hiện truyền thống tôn sư.",
   h:["Học sinh tặng thầy cô hoa cẩm chướng {康乃馨|kāngnǎixīn}, thiệp tự làm","Gửi tin nhắn tri ân thầy cô cũ"],
   c:[["老师，您辛苦了！","Lǎoshī, nín xīnkǔ le!","Thầy cô vất vả rồi ạ!"],["教师节快乐！","Jiàoshī Jié kuàilè!","Chúc mừng Ngày Nhà giáo!"],["谢谢您，老师！","Xièxie nín, lǎoshī!","Em cảm ơn thầy cô!"],["祝老师身体健康，工作顺利！","Zhù lǎoshī shēntǐ jiànkāng, gōngzuò shùnlì!","Chúc thầy cô mạnh khỏe, công việc thuận lợi!"]]},
  tip:"Người Việt hay nhầm: Ngày Nhà giáo Trung Quốc là 10/9, không phải 20/11."},
 dongchi:{vn:{y:"Ở Việt Nam, Đông chí không phải ngày lễ lớn. Đây là một tiết khí trong năm: ngày có ban ngày ngắn nhất, đêm dài nhất.",
   h:["Một số gia đình người Hoa ở Việt Nam vẫn cúng tổ tiên và ăn chè trôi nước","Miền Bắc bắt đầu vào những ngày rét nhất trong năm"],c:["Chúc cả nhà ngày đông ấm áp!"]},
  cn:{y:"{冬至|Dōngzhì} là một trong 24 tiết khí, ngày có đêm dài nhất năm. Người xưa rất coi trọng ngày này, nên có câu {冬至大如年|Dōngzhì dà rú nián} “Đông chí lớn như Tết”.",
   h:["Miền Bắc ăn sủi cảo {饺子|jiǎozi}; dân gian nói ăn sủi cảo thì mùa đông không bị cóng tai","Miền Nam ăn bánh trôi nước {汤圆|tāngyuán}, tượng trưng cho đoàn viên","Cúng tổ tiên, gia đình sum họp"],
   c:[["冬至快乐！","Dōngzhì kuàilè!","Đông chí vui vẻ!"],["冬至到了，记得吃饺子！","Dōngzhì dào le, jìde chī jiǎozi!","Đông chí rồi, nhớ ăn sủi cảo nhé!"]]}},
 giangsinh:{vn:{y:"Giáng sinh 25/12 là lễ của người theo đạo Thiên Chúa, nay cũng là dịp vui chơi chung của nhiều người, nhất là giới trẻ.",
   h:["Đêm 24/12 đi lễ nhà thờ, xem hang đá, dạo phố","Trang trí cây thông, tặng quà, gặp gỡ bạn bè"],c:["Chúc mừng Giáng sinh!","Giáng sinh an lành!"]},
  cn:{y:"Ở Trung Quốc, {圣诞节|Shèngdàn Jié} không phải ngày nghỉ, nhưng rất phổ biến ở thành phố, nhất là với giới trẻ.",
   h:["Đêm 24/12 gọi là {平安夜|Píng'ānyè} “đêm bình an”: mọi người tặng nhau táo {平安果|píng'ānguǒ}, vì {苹|píng} trong {苹果|píngguǒ} đồng âm với {平|píng} trong {平安|píng'ān}","Trung tâm thương mại trang trí cây thông, có nhiều khuyến mãi"],
   c:[["圣诞快乐！","Shèngdàn kuàilè!","Giáng sinh vui vẻ!"],["平安夜快乐！","Píng'ānyè kuàilè!","Chúc đêm bình an vui vẻ!"],["祝你平平安安！","Zhù nǐ píngpíng ān'ān!","Chúc bạn bình bình an an!"]]}},
 duonglich:{vn:{y:"Tết Dương lịch 1/1 mở đầu năm mới theo lịch quốc tế; người lao động được nghỉ 1 ngày.",
   h:["Đêm 31/12 xem bắn pháo hoa, đếm ngược","Đặt mục tiêu, kế hoạch cho năm mới"],c:["Chúc mừng năm mới!","Năm mới vạn sự như ý!"]},
  cn:{y:"Ở Trung Quốc, ngày 1/1 dương lịch gọi là {元旦|Yuándàn}, được nghỉ 1 ngày (thường nối với cuối tuần). Tết âm lịch thì gọi là {春节|Chūnjié}.",
   h:["Đêm 31/12 đếm ngược đón năm mới {跨年|kuànián}, xem chương trình ca nhạc trên TV","Đi du lịch ngắn ngày, gặp gỡ bạn bè"],
   c:[["新年快乐！","Xīnnián kuàilè!","Chúc mừng năm mới!"],["元旦快乐！","Yuándàn kuàilè!","Chúc mừng Tết Dương lịch!"],["祝你新的一年万事如意！","Zhù nǐ xīn de yì nián wànshì rúyì!","Chúc bạn năm mới vạn sự như ý!"]]},
  tip:"Người Việt hay nhầm: “Tết Nguyên đán” của Việt Nam (Tết âm lịch) trong tiếng Trung là 春节, còn 元旦 là ngày 1/1 dương lịch."},
 laba:{vn:{y:"Việt Nam không có lễ Lạp Bát. Tháng Chạp là lúc mọi nhà bắt đầu chuẩn bị đón Tết.",
   h:["Dọn dẹp nhà cửa, sắm sửa đồ Tết","Đi tảo mộ, thăm mộ tổ tiên cuối năm"],c:["Chúc cả nhà tháng Chạp bình an, sắm Tết đủ đầy!"]},
  cn:{y:"{腊八节|Làbā Jié} là ngày mùng 8 tháng Chạp âm lịch. Dân gian nói {过了腊八就是年|guòle Làbā jiù shì nián} “qua Lạp Bát là đến Tết”.",
   h:["Nấu cháo Lạp Bát {腊八粥|Làbā zhōu} từ gạo, các loại đậu, táo đỏ, hạt sen…","Miền Bắc ngâm tỏi giấm {腊八蒜|Làbā suàn}, đến Tết ăn kèm sủi cảo"],
   c:[["腊八节快乐！","Làbā Jié kuàilè!","Lễ Lạp Bát vui vẻ!"],["你喝腊八粥了吗？","Nǐ hē Làbā zhōu le ma?","Bạn ăn cháo Lạp Bát chưa?"]]}},
 ongtao:{vn:{y:"Ngày 23 tháng Chạp, người Việt tiễn ông Công ông Táo (thần Bếp) về trời, báo cáo với Ngọc Hoàng mọi việc trong nhà suốt một năm.",
   h:["Cúng mâm cỗ, mũ áo ông Công ông Táo","Thả cá chép ra sông, hồ – cá chép đưa ông Táo về trời","Dọn dẹp nhà cửa, bắt đầu sắm Tết"],c:["Chúc gia đình năm mới bình an, ấm no!"]},
  cn:{y:"{小年|Xiǎonián} (Tết nhỏ) là ngày cúng Táo quân {祭灶|jì zào}: miền Bắc vào ngày 23, miền Nam vào ngày 24 tháng Chạp. Từ hôm nay, cả nhà chuẩn bị đón Tết.",
   h:["Cúng Táo quân bằng kẹo mạch nha {糖瓜|tángguā}, mong Táo quân “ngọt miệng”, nói điều tốt về gia đình","Tổng vệ sinh nhà cửa {扫尘|sǎochén}, dán hoa giấy cắt lên cửa sổ"],
   c:[["小年快乐！","Xiǎonián kuàilè!","Tết ông Táo vui vẻ!"],["上天言好事，下界保平安。","Shàng tiān yán hǎo shì, xià jiè bǎo píng'ān.","Lên trời nói việc tốt, xuống trần giữ bình an (câu đối dán ở bếp)."]]}},
 tet:{vn:{y:"Tết Nguyên đán là lễ lớn nhất năm, dịp gia đình đoàn tụ, tiễn năm cũ, đón năm mới.",
   h:["Gói bánh chưng, bánh tét; chơi hoa đào (miền Bắc), hoa mai (miền Nam)","Cúng tất niên, đón giao thừa","Xông đất, chúc Tết, mừng tuổi (lì xì) cho trẻ em","Đi chùa, hái lộc đầu năm"],c:["Chúc mừng năm mới!","An khang thịnh vượng!","Vạn sự như ý!"]},
  cn:{y:"{春节|Chūnjié} là Tết âm lịch, lễ quan trọng nhất của người Trung Quốc. Dù ở xa, mọi người đều cố về nhà đoàn tụ, tạo nên mùa cao điểm đi lại {春运|chūnyùn}.",
   h:["Đêm giao thừa ăn bữa cơm đoàn viên {年夜饭|niányèfàn}; miền Bắc gói sủi cảo","Dán câu đối đỏ {春联|chūnlián}, dán ngược chữ {福|fú}: {福倒了|fú dào le} (phúc ngược) đồng âm với {福到了|fú dào le} (phúc đến rồi)","Mừng tuổi bằng bao lì xì đỏ {红包|hóngbāo}, xem chương trình Xuân Vãn {春晚|Chūnwǎn}","Đốt pháo, thức đón giao thừa {守岁|shǒusuì}"],
   c:[["新年快乐！","Xīnnián kuàilè!","Chúc mừng năm mới!"],["春节快乐！","Chūnjié kuàilè!","Chúc Tết vui vẻ!"],["恭喜发财！","Gōngxǐ fācái!","Chúc phát tài!"],["万事如意！","Wànshì rúyì!","Vạn sự như ý!"],["身体健康！","Shēntǐ jiànkāng!","Chúc sức khỏe!"],["羊年大吉！","Yáng nián dàjí!","Năm Mùi đại cát!"]]}},
 nguyentieu:{vn:{y:"Rằm tháng Giêng (Tết Nguyên tiêu) là ngày rằm đầu tiên của năm. Dân gian có câu “Lễ Phật quanh năm không bằng Rằm tháng Giêng”.",
   h:["Đi chùa lễ Phật, cầu bình an cho cả năm","Làm mâm cúng rằm tại gia","Ngày Thơ Việt Nam được tổ chức vào dịp này"],c:["Chúc gia đình một năm bình an, may mắn!"]},
  cn:{y:"{元宵节|Yuánxiāo Jié} là đêm trăng tròn đầu tiên của năm mới, đánh dấu kết thúc dịp Tết.",
   h:["Ăn bánh trôi nước có nhân {元宵|yuánxiāo} / {汤圆|tāngyuán}, tượng trưng cho đoàn tụ, tròn đầy","Ngắm đèn lồng {赏花灯|shǎng huādēng}, đoán câu đố trên đèn {猜灯谜|cāi dēngmí}","Múa lân, múa rồng"],
   c:[["元宵节快乐！","Yuánxiāo Jié kuàilè!","Chúc mừng Tết Nguyên tiêu!"],["团团圆圆！","Tuántuán yuányuán!","Đoàn viên tròn đầy!"],["花好月圆！","Huā hǎo yuè yuán!","Hoa thắm trăng tròn!"]]}},
 valentine:{vn:{y:"Lễ Tình nhân 14/2 có nguồn gốc phương Tây, được giới trẻ Việt Nam hưởng ứng rộng rãi.",
   h:["Tặng hoa hồng, sô-cô-la, quà cho người yêu","Hẹn hò, đi ăn tối, xem phim"],c:["Chúc mừng Valentine!","Chúc hai bạn mãi hạnh phúc!"]},
  cn:{y:"Ở Trung Quốc, 14/2 gọi là {情人节|Qíngrén Jié}, có khi gọi {西方情人节|Xīfāng Qíngrén Jié} (Lễ Tình nhân phương Tây) để phân biệt với {七夕|Qīxī} – ngày lễ tình nhân truyền thống.",
   h:["Tặng hoa hồng, sô-cô-la, hẹn hò","Gửi lì xì qua WeChat với những con số có ý nghĩa: 520 (đọc gần giống {我爱你|wǒ ài nǐ}), 1314 (gần âm {一生一世|yìshēng yíshì} – trọn đời)"],
   c:[["情人节快乐！","Qíngrén Jié kuàilè!","Chúc mừng Lễ Tình nhân!"],["我爱你！","Wǒ ài nǐ!","Anh yêu em / Em yêu anh!"],["愿得一心人，白首不相离。","Yuàn dé yì xīn rén, bái shǒu bù xiāng lí.","Nguyện có được người một lòng, bạc đầu không chia lìa."]]}},
 thanhminh:{vn:{y:"Tết Hàn thực (mùng 3/3 âm) và tiết Thanh minh (khoảng 4–5/4 dương) là hai dịp gần nhau. Truyện Kiều có câu: “Thanh minh trong tiết tháng Ba, / Lễ là tảo mộ, hội là đạp thanh.”",
   h:["Tết Hàn thực: làm bánh trôi, bánh chay cúng tổ tiên","Thanh minh: đi tảo mộ, sửa sang, thắp hương mộ ông bà"],c:["Nhân tiết Thanh minh, con cháu kính nhớ ông bà tổ tiên."]},
  cn:{y:"{清明节|Qīngmíng Jié} là dịp tảo mộ lớn nhất trong năm, được nghỉ lễ. {寒食节|Hánshí Jié} ngay trước Thanh minh: xưa kiêng đun lửa, chỉ ăn đồ nguội để tưởng nhớ Giới Tử Thôi {介子推|Jiè Zǐtuī}; nay phần lớn đã gộp vào Thanh minh.",
   h:["Tảo mộ {扫墓|sǎomù}, viếng tổ tiên","Đi dạo ngắm xuân {踏青|tàqīng} (đạp thanh), thả diều","Vùng Giang Nam ăn bánh thanh đoàn {青团|qīngtuán} màu xanh lá"],
   c:[["清明安康！","Qīngmíng ānkāng!","Thanh minh an khang!"],["清明时节雨纷纷，路上行人欲断魂。","Qīngmíng shíjié yǔ fēnfēn, lù shang xíngrén yù duàn hún.","Tiết Thanh minh mưa lất phất, người đi đường lòng buồn da diết (thơ Đỗ Mục)."]]},
  tip:"Không nói 清明快乐 vì đây là dịp tưởng nhớ người đã khuất; nên nói 清明安康."},
 doanngo:{vn:{y:"Tết Đoan Ngọ (mùng 5/5 âm) còn gọi là Tết diệt sâu bọ: người xưa tin đây là lúc sâu bọ, dịch bệnh phát sinh nhiều.",
   h:["Sáng sớm ăn rượu nếp, hoa quả chua (mận, vải…) để “diệt sâu bọ”","Hái lá thuốc vào giờ Ngọ","Một số nơi buộc chỉ ngũ sắc cho trẻ em"],c:["Chúc cả nhà Tết Đoan Ngọ mạnh khỏe!"]},
  cn:{y:"{端午节|Duānwǔ Jié} gắn với tích tưởng nhớ nhà thơ Khuất Nguyên {屈原|Qū Yuán} trầm mình xuống sông Mịch La; là ngày nghỉ lễ ở Trung Quốc.",
   h:["Đua thuyền rồng {赛龙舟|sài lóngzhōu}","Ăn bánh ú {粽子|zòngzi}, nhân ngọt hoặc mặn","Treo ngải cứu {艾草|àicǎo}, đeo túi thơm {香囊|xiāngnáng} để trừ tà"],
   c:[["端午安康！","Duānwǔ ānkāng!","Đoan Ngọ an khang!"],["端午节快乐！","Duānwǔ Jié kuàilè!","Chúc Tết Đoan Ngọ vui vẻ!"],["吃粽子了吗？","Chī zòngzi le ma?","Ăn bánh ú chưa?"]]},
  tip:"Nhiều người Trung Quốc chúc 端午安康 (an khang) thay vì 快乐, vì gốc của ngày lễ là tưởng nhớ Khuất Nguyên."},
 thattich:{vn:{y:"Thất Tịch (mùng 7/7 âm) gắn với tích Ngưu Lang – Chức Nữ, mỗi năm chỉ được gặp nhau một lần trên cầu Ô Thước. Mưa dịp này gọi là “mưa ngâu” – nước mắt của đôi lứa.",
   h:["Giới trẻ coi là Lễ Tình nhân phương Đông: tặng quà, hẹn hò","Một số bạn trẻ ăn chè đậu đỏ để “cầu duyên”"],c:["Chúc bạn sớm gặp được nửa kia!","Chúc hai bạn mãi bên nhau!"]},
  cn:{y:"{七夕节|Qīxī Jié} được coi là ngày lễ tình nhân truyền thống của Trung Quốc. Ngưu Lang {牛郎|Niúláng} và Chức Nữ {织女|Zhīnǚ} gặp nhau trên cầu chim khách {鹊桥|quèqiáo}.",
   h:["Đôi lứa tặng hoa, quà, hẹn hò","Xưa các cô gái “khất xảo” {乞巧|qǐqiǎo}: cầu xin Chức Nữ cho mình khéo tay"],
   c:[["七夕快乐！","Qīxī kuàilè!","Thất Tịch vui vẻ!"],["有情人终成眷属。","Yǒuqíngrén zhōng chéng juànshǔ.","Người có tình rồi sẽ nên duyên."],["金风玉露一相逢，便胜却人间无数。","Jīn fēng yù lù yì xiāngféng, biàn shèngquè rénjiān wúshù.","Gió vàng sương ngọc một lần gặp, hơn bao lần gặp gỡ chốn nhân gian (thơ Tần Quán)."]]}},
 trungthu:{vn:{y:"Ở Việt Nam, Tết Trung thu (rằm tháng Tám) là Tết thiếu nhi, cũng là dịp gia đình sum họp ngắm trăng.",
   h:["Rước đèn ông sao, đèn lồng; múa lân","Phá cỗ trông trăng với bánh nướng, bánh dẻo, hoa quả","Kể chuyện chú Cuội, chị Hằng"],c:["Chúc các con Trung thu vui vẻ!","Chúc gia đình đoàn viên, hạnh phúc!"]},
  cn:{y:"{中秋节|Zhōngqiū Jié} là dịp đoàn viên quan trọng thứ hai sau Tết, được nghỉ lễ. Trăng tròn tượng trưng cho sự sum họp.",
   h:["Ăn bánh trung thu {月饼|yuèbing}, ngắm trăng {赏月|shǎng yuè}","Cả nhà ăn bữa cơm đoàn viên","Kể truyện Hằng Nga bay lên cung trăng {嫦娥奔月|Cháng'é bēn yuè}"],
   c:[["中秋节快乐！","Zhōngqiū Jié kuàilè!","Chúc Trung thu vui vẻ!"],["月圆人团圆。","Yuè yuán rén tuányuán.","Trăng tròn, người đoàn viên."],["但愿人长久，千里共婵娟。","Dàn yuàn rén chángjiǔ, qiānlǐ gòng chánjuān.","Chỉ mong người mãi bên nhau, nghìn dặm cùng ngắm một vầng trăng (thơ Tô Thức)."]]},
  tip:"Ở Việt Nam, Trung thu chủ yếu là Tết của thiếu nhi; ở Trung Quốc, trọng tâm là gia đình đoàn viên."},
 phunu:{vn:{y:"Ngày Quốc tế Phụ nữ 8/3 tôn vinh phụ nữ; ở Việt Nam còn là dịp kỷ niệm khởi nghĩa Hai Bà Trưng.",
   h:["Tặng hoa, quà cho mẹ, cô giáo, bạn nữ, đồng nghiệp nữ","Cơ quan, trường học tổ chức gặp mặt, liên hoan"],c:["Chúc mẹ, chúc cô luôn xinh đẹp, hạnh phúc!"]},
  cn:{y:"Ở Trung Quốc, ngày 8/3 gọi là {三八妇女节|Sān-Bā Fùnǚ Jié}; theo quy định, phụ nữ được nghỉ nửa ngày. Giới trẻ còn gọi vui là {女神节|Nǚshén Jié} “Ngày nữ thần”.",
   h:["Nhiều cơ quan cho nữ nhân viên nghỉ buổi chiều, tặng hoa, quà","Cửa hàng, trang mua sắm có nhiều khuyến mãi"],
   c:[["妇女节快乐！","Fùnǚ Jié kuàilè!","Chúc mừng ngày Phụ nữ!"],["女神节快乐！","Nǚshén Jié kuàilè!","Chúc mừng Ngày nữ thần!"],["祝你越来越漂亮！","Zhù nǐ yuè lái yuè piàoliang!","Chúc bạn ngày càng xinh đẹp!"]]}}};

/* ---------- hình vẽ (SVG) ---------- */
const LEM={
 lantern:c=>`<line y1="-34" y2="-21" stroke="#c9a227" stroke-width="2"/><rect x="-11" y="-22" width="22" height="6" rx="2" fill="#c9a227"/><ellipse rx="22" ry="18" fill="${c||"#d7263d"}"/><path d="M-9-17Q-15 0-9 17M9-17Q15 0 9 17M0-18V18" stroke="rgba(0,0,0,.18)" stroke-width="1.6" fill="none"/><rect x="-11" y="16" width="22" height="6" rx="2" fill="#c9a227"/><path d="M-5 22v13M0 22v16M5 22v13" stroke="#c9a227" stroke-width="1.6"/>`,
 flower:(c,k)=>[0,72,144,216,288].map(a=>`<ellipse cy="-9" rx="6.5" ry="9" fill="${c}" transform="rotate(${a})"/>`).join("")+`<circle r="4.5" fill="${k||"#c9a227"}"/>`,
 snow:c=>`<g stroke="${c}" stroke-width="2.2" stroke-linecap="round" fill="none">`+[0,60,120].map(a=>`<g transform="rotate(${a})"><line y1="-20" y2="20"/><path d="M-6-14L0-9L6-14M-6 14L0 9L6 14"/></g>`).join("")+`</g>`,
 star:c=>`<path d="M0-18L5.3-6.5L18-5.6L8.3 2.8L11.1 15.4L0 8.7L-11.1 15.4L-8.3 2.8L-18-5.6L-5.3-6.5Z" fill="${c}"/>`,
 burst:c=>`<g stroke="${c}" stroke-width="2.4" stroke-linecap="round">`+Array.from({length:12},(_,i)=>`<line y1="-9" y2="-23" transform="rotate(${i*30})"/>`).join("")+`</g>`+Array.from({length:12},(_,i)=>`<circle cy="-28" r="2.2" fill="${c}" transform="rotate(${i*30+15})"/>`).join(""),
 book:c=>`<path d="M0-12C-8-18-18-18-26-15V14C-18 11-8 11 0 17C8 11 18 11 26 14V-15C18-18 8-18 0-12Z" fill="#fff" stroke="${c}" stroke-width="2.2"/><path d="M0-12V17" stroke="${c}" stroke-width="2"/><path d="M-20-7H-6M-20-1H-6M-20 5H-6M6-7H20M6-1H20M6 5H20" stroke="${c}" stroke-width="1.4" opacity=".6"/>`,
 bowl:(c,k)=>`<circle cx="-9" cy="-6" r="7" fill="${k||"#fff"}" stroke="#e2cfae"/><circle cx="6" cy="-7" r="7" fill="${k||"#fff"}" stroke="#e2cfae"/><circle cx="-1" cy="-12" r="6" fill="#f7c6d0"/><path d="M-26-3H26C25 14 12 22 0 22S-25 14-26-3Z" fill="${c}"/><path d="M-26-3H26" stroke="#c9a227" stroke-width="3"/><rect x="-9" y="21" width="18" height="4" rx="2" fill="${c}"/>`,
 moon:c=>`<circle r="25" fill="${c}" opacity=".25"/><circle r="18" fill="${c}"/>`,
 carp:c=>`<path d="M-26 0C-14-14 10-14 18 0C10 14-14 14-26 0Z" fill="${c}"/><path d="M16 0L32-12L28 0L32 12Z" fill="${c}"/><path d="M-2-10L4-20L8-10Z" fill="${c}"/><circle cx="-16" cy="-3" r="2.4" fill="#3a0d1d"/><path d="M-4-9Q2 0-4 9M4-9Q10 0 4 9" stroke="rgba(255,255,255,.6)" stroke-width="1.6" fill="none"/>`,
 fu:()=>`<rect x="-20" y="-20" width="40" height="40" rx="4" fill="#d7263d" transform="rotate(45)"/><text y="10" text-anchor="middle" font-size="28" font-weight="900" fill="#f6d36b" font-family="Noto Serif SC, KaiTi, serif" transform="rotate(180)">福</text>`,
 tree:c=>`<path d="M0-26L14-6H7L18 10H-18L-7-6H-14Z" fill="${c}"/><rect x="-3" y="10" width="6" height="8" fill="#8b5a2b"/><circle r="2.5" cx="-5" cy="2" fill="#d7263d"/><circle r="2.5" cx="6" cy="-6" fill="#c9a227"/><circle r="2.5" cx="7" cy="6" fill="#d7263d"/><path d="M0-33L2-28L7-28L3-25L5-20L0-23L-5-20L-3-25L-7-28L-2-28Z" fill="#c9a227"/>`,
 tulip:c=>`<path d="M0 26V2" stroke="#4f8a4b" stroke-width="2.4"/><path d="M0 14Q-12 6-14-2Q-4 2 0 10" fill="#5fa15a"/><path d="M-11-16Q-12 4 0 6Q12 4 11-16L5-8L0-18L-5-8Z" fill="${c}"/>`,
 heart:c=>`<path d="M0 14C-18 2-18-12-9-14C-4-15-1-11 0-8C1-11 4-15 9-14C18-12 18 2 0 14Z" fill="${c}"/>`,
 cloud:c=>`<path d="M-24 6Q-28-6-16-6Q-14-18 0-16Q12-20 16-8Q28-8 26 4Q24 12 14 10H-18Q-24 12-24 6Z" fill="none" stroke="${c}" stroke-width="2.2"/>`,
 zongzi:c=>`<path d="M0-22L22 16H-22Z" fill="${c}" stroke="#2f6b3a" stroke-width="2" stroke-linejoin="round"/><path d="M-14 4H14M-8-8L8 8" stroke="#f3e1a0" stroke-width="2.4"/>`,
 boat:c=>`<path d="M-30 4H26Q24 14 10 16H-20Q-30 14-30 4Z" fill="${c}"/><path d="M26 4Q34-2 30-12Q38-8 36 2" fill="${c}"/><circle cx="31" cy="-6" r="1.6" fill="#fff"/><path d="M-20 4L-24-6M-8 4L-12-6M4 4L0-6M16 4L12-6" stroke="#8b5a2b" stroke-width="2"/><path d="M-34 20Q-26 16-18 20T-2 20T14 20T30 20" stroke="#6fa8dc" stroke-width="2" fill="none"/>`,
 willow:c=>`<path d="M-24-24Q0-28 24-20" stroke="#8b5a2b" stroke-width="2" fill="none"/>`+[-18,-8,2,12,20].map((x,i)=>`<path d="M${x}-23Q${x-3} ${-6+i*2} ${x+2} ${14-i*3}" stroke="${c}" stroke-width="1.6" fill="none"/>`+[0,1,2].map(k=>`<ellipse cx="${x-1+k}" cy="${-14+k*9}" rx="2" ry="4.5" fill="${c}" transform="rotate(${15-k*10} ${x-1+k} ${-14+k*9})"/>`).join("")).join(""),
 kite:c=>`<path d="M0-24L16 0L0 24L-16 0Z" fill="${c}"/><path d="M0-24V24M-16 0H16" stroke="#fff" stroke-width="1.4" opacity=".7"/><path d="M0 24Q6 32 0 38Q-6 44 2 50" stroke="${c}" stroke-width="1.4" fill="none"/>`,
 mooncake:c=>`<circle r="22" fill="${c}"/><circle r="16" fill="none" stroke="#8b5a2b" stroke-width="1.6" opacity=".6"/>`+Array.from({length:10},(_,i)=>`<circle cy="-22" r="4" fill="${c}" transform="rotate(${i*36})"/>`).join("")+`<text y="7" text-anchor="middle" font-size="18" font-weight="700" fill="#8b5a2b" font-family="Noto Serif SC, KaiTi, serif">月</text>`,
 bird:c=>`<path d="M-22 4Q-8-14 6-2Q14-10 24-8Q16-2 12 6Q0 14-22 4Z" fill="${c}"/><path d="M-6 0Q2-16 14-14Q6-6 2 2Z" fill="#fff" opacity=".5"/><circle cx="16" cy="-6" r="1.6" fill="#fff"/>`,
 txt:(t,c)=>`<text y="10" text-anchor="middle" font-size="28" font-weight="700" fill="${c}" font-family="Noto Serif SC, KaiTi, serif">${t}</text>`};
/* ô mẫu 300×300: [hình, x, y, cỡ, xoay, tham số 1, tham số 2] */
const LET={
 nhagiao:{bg:["#fff3f1","#fbeaf0"],ac:"#c2477a",fx:["🌷","🌸","✿"],p:[["book",50,55,1,-10,"#8e2a4f"],["flower",195,45,1,0,"#f2a7bd"],["txt",125,150,1.2,0,"师","#c2477a"],["tulip",255,180,1,12,"#e8608a"],["flower",55,245,.8,20,"#f6c453","#c2477a"],["book",195,255,.8,8,"#c9a227"]]},
 dongchi:{bg:["#f1f5fb","#fbf5e6"],ac:"#3a6ea5",fx:["❄","❅","❆"],p:[["snow",50,55,1,0,"#8db3dc"],["bowl",195,50,1,0,"#3a6ea5"],["txt",125,150,1.1,0,"冬至","#3a6ea5"],["snow",255,180,.8,15,"#b7cfe8"],["snow",55,245,.7,30,"#8db3dc"],["bowl",195,255,.8,0,"#8e2a4f"]]},
 giangsinh:{bg:["#f2f8f2","#fbefec"],ac:"#1f7a4d",fx:["❄","❅","✦"],p:[["tree",50,60,1.1,0,"#2f8f5b"],["snow",195,45,.9,0,"#a9c9e6"],["star",125,150,1,0,"#d7263d"],["tree",255,185,.9,0,"#1f7a4d"],["snow",55,245,.7,20,"#a9c9e6"],["star",195,255,.8,15,"#c9a227"]]},
 duonglich:{bg:["#fff8e6","#fbeef3"],ac:"#b8860b",fx:["✨","✦","🎉"],p:[["burst",50,55,1,0,"#d7263d"],["burst",195,45,.8,10,"#c9a227"],["star",125,150,.9,0,"#c9a227"],["burst",255,180,1,0,"#8e2a4f"],["star",55,245,.7,15,"#d7263d"],["burst",195,255,.7,0,"#e6a23c"]]},
 laba:{bg:["#fbf3e3","#f6e8d5"],ac:"#a0522d",fx:[],p:[["bowl",50,55,1,0,"#a0522d","#f3e1c0"],["flower",195,45,.8,0,"#d7263d","#f6d36b"],["txt",125,150,1.1,0,"腊八","#8e2a4f"],["flower",255,180,.7,25,"#e05a6d","#f6d36b"],["cloud",55,245,.9,0,"#c9a227"],["bowl",195,255,.8,0,"#8e2a4f","#f3e1c0"]]},
 ongtao:{bg:["#fff5e9","#fdeee2"],ac:"#d1621f",fx:[],p:[["carp",55,55,1,-15,"#f08a24"],["cloud",195,45,1,0,"#c9a227"],["carp",130,150,1,10,"#d7263d"],["cloud",255,180,.8,0,"#e6a23c"],["carp",60,245,.8,-5,"#e6a23c"],["txt",195,255,.9,0,"小年","#d1621f"]]},
 tet:{bg:["#fff1ec","#fdf3e0"],ac:"#d7263d",fx:["🌸","🌼","✿"],p:[["lantern",50,60,1,0,"#d7263d"],["flower",195,45,.9,10,"#f4a6b8","#c9a227"],["fu",125,150,1,0],["flower",255,180,.8,25,"#f6c453","#d7263d"],["flower",55,245,.7,0,"#f4a6b8","#c9a227"],["lantern",195,255,.85,0,"#d7263d"]]},
 nguyentieu:{bg:["#fbf1e8","#f4eef8"],ac:"#c0392b",fx:["✨","✦"],p:[["lantern",50,60,1,0,"#d7263d"],["moon",195,45,1,0,"#f6c453"],["bowl",125,150,1,0,"#8e2a4f"],["lantern",255,185,.9,0,"#e6a23c"],["star",55,245,.6,0,"#c9a227"],["lantern",195,255,.8,0,"#d7263d"]]},
 valentine:{bg:["#fdf0f3","#fbeaf0"],ac:"#d6336c",fx:["💗","♥","🌹"],p:[["heart",50,55,1,-10,"#e8608a"],["flower",195,45,.9,0,"#d6336c","#f6c453"],["txt",125,150,1,0,"爱","#d6336c"],["heart",255,180,.8,12,"#f2a7bd"],["tulip",55,245,.8,0,"#d6336c"],["heart",195,255,.7,-5,"#c2477a"]]},
 thanhminh:{bg:["#f1f7ef","#f6f8ea"],ac:"#3f7d4f",fx:["🍃","🌿"],p:[["willow",50,55,1,0,"#6aa86f"],["kite",195,50,.8,10,"#e8608a"],["txt",125,150,1.1,0,"清明","#3f7d4f"],["willow",255,180,.9,0,"#8bbf7a"],["flower",55,245,.7,0,"#f4c2d0","#f6d36b"],["kite",195,255,.7,-10,"#6fa8dc"]]},
 doanngo:{bg:["#eef6f1","#fbf5e6"],ac:"#2f7d5b",fx:["🍃"],p:[["boat",55,55,1,0,"#d7263d"],["zongzi",195,45,.9,0,"#5fa15a"],["txt",125,150,1.1,0,"端午","#2f7d5b"],["zongzi",255,180,.8,15,"#7cb46b"],["boat",60,245,.8,0,"#e6a23c"],["willow",195,255,.8,0,"#6aa86f"]]},
 thattich:{bg:["#f1eef9","#fbeef3"],ac:"#6a4c93",fx:["✦","✧","⭐"],p:[["bird",55,55,1,0,"#6a4c93"],["star",195,45,.8,0,"#c9a227"],["txt",125,150,1.1,0,"七夕","#6a4c93"],["bird",255,180,.8,0,"#8e7cc3"],["star",55,245,.6,15,"#c9a227"],["heart",195,255,.7,0,"#e8608a"]]},
 trungthu:{bg:["#fff6e6","#f6eef8"],ac:"#c27c0e",fx:["✨","⭐"],p:[["moon",50,55,1,0,"#f6c453"],["lantern",195,55,.9,0,"#e6a23c"],["mooncake",125,150,1,0,"#d9a05b"],["star",255,180,.7,0,"#c9a227"],["lantern",55,245,.8,0,"#d7263d"],["mooncake",195,255,.7,0,"#e2b06a"]]},
 phunu:{bg:["#fdf0f4","#fbf5e6"],ac:"#c2477a",fx:["🌷","🌸","♥"],p:[["tulip",50,55,1,-8,"#e8608a"],["heart",195,45,.9,10,"#f2a7bd"],["flower",125,150,1,0,"#f2a7bd","#c9a227"],["tulip",255,180,.9,10,"#c2477a"],["heart",55,245,.7,-10,"#e8608a"],["tulip",195,255,.8,0,"#f6c453"]]}};

/* ---------- cài đặt ---------- */
const LE_KEY="ct_le",LE_PV="ct_le_pv";
const leJ=(st,k,d)=>{try{const v=st.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const leCfg0=()=>({mode:"auto",theme:"tet",fx:true,bn:true,off:[],d:{},m:{}});
let LE={cfg:Object.assign(leCfg0(),(leJ(localStorage,LE_KEY,{})||{}).cfg||{}),pv:leJ(sessionStorage,LE_PV,null),cur:null,msg:"",busy:false,draft:null};
const leE=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const leDs=d=>{const p=n=>String(n).padStart(2,"0");return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())};
const leToday=()=>leDs(new Date());
/* khoảng ngày của một lễ: [bắt đầu, kết thúc] đầy đủ, lần gần nhất chưa qua (hoặc đang diễn ra) tính từ hôm nay */
function leRange(h,cfg,today){const r=(cfg.d||{})[h.id]||[h.s,h.e];today=today||leToday();
 if(r[0].length>5)return r;const y=+today.slice(0,4);
 for(const yy of [y-1,y,y+1]){const S=yy+"-"+r[0],E=(r[1]<r[0]?yy+1:yy)+"-"+r[1];if(E>=today)return[S,E]}return[y+"-"+r[0],y+"-"+r[1]]}
const leDays=(a,b)=>Math.round((new Date(b)-new Date(a))/864e5);
/* lễ đang áp dụng hôm nay */
function lePick(cfg){cfg=cfg||LE.cfg;if(cfg.mode=="off")return null;if(cfg.mode=="fixed")return LE_DEF.find(h=>h.id==cfg.theme)||null;
 const t=leToday();let best=null,bl=1e9;LE_DEF.forEach(h=>{if((cfg.off||[]).includes(h.id))return;const[s,e]=leRange(h,cfg,t);if(t>=s&&t<=e&&leDays(s,e)<bl){best=h;bl=leDays(s,e)}});return best}
const leMsg=(h,cfg)=>{const d=LE_MSG[h.id],m=((cfg||LE.cfg).m||{})[h.id];return Object.assign({},d,m&&typeof m=="object"?m:{})};
const leZp=s=>leE(s).replace(/\{([^|}]+)\|([^}]+)\}/g,'<ruby class="le-zh">$1<rt>$2</rt></ruby>');
function leSay(t){try{const u=new SpeechSynthesisUtterance(t);u.lang="zh-CN";u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function leVh(id){const h=LE_DEF.find(x=>x.id==id),V=LE_VH[id],M=leMsg(h);if(!V)return;
 const col=(f,t,o,zh)=>`<div class="lev-c"><h4>${f} ${t}</h4><b>Ý nghĩa</b><p>${leZp(o.y)}</p><b>Hoạt động chính</b><ul>${o.h.map(x=>`<li>${leZp(x)}</li>`).join("")}</ul><b>Câu chúc thường dùng</b><ul class="lev-w">${o.c.map(c=>zh?`<li><button onclick="leSay('${c[0]}')" aria-label="Nghe">🔊</button><div><span class="zh">${c[0]}</span><i>${leE(c[1])}</i><small>${leE(c[2])}</small></div></li>`:`<li><div>${leE(c)}</div></li>`).join("")}</ul></div>`;
 let d=document.getElementById("levh");if(!d){d=document.createElement("div");d.id="levh";document.body.appendChild(d)}d.hidden=false;
 d.innerHTML=`<div class="askw" onclick="if(event.target===this)leVhX()"><div class="card lev" role="dialog" aria-label="Khám phá văn hóa"><button class="lev-x" onclick="leVhX()" aria-label="Đóng">✕</button>
<div class="lev-h"><span class="lev-ic">${h.ic}</span><div><h3>${h.vi}</h3><div class="zh">${h.zh} <i>${leE(M.np||"")}</i> · ${h.day}</div></div></div>
<div class="lev-g">${col("🇻🇳","Ở Việt Nam",V.vn,0)}${col("🇨🇳","Ở Trung Quốc",V.cn,1)}</div>${V.tip?`<p class="lev-tip">⚠️ ${leE(V.tip)}</p>`:""}</div></div>`}
function leVhX(){const d=document.getElementById("levh");if(d){d.hidden=true;d.innerHTML="";try{speechSynthesis.cancel()}catch(e){}}}
addEventListener("keydown",e=>{if(e.key=="Escape")leVhX()});
const leTile=id=>{const T=LET[id];return "data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">`+T.p.map(([m,x,y,s,r,a,b])=>`<g transform="translate(${x} ${y}) rotate(${r||0}) scale(${s||1})">${LEM[m](a,b)}</g>`).join("")+`</svg>`)};

/* ---------- vẽ nền ---------- */
function leApply(){const pv=LE.pv&&LE_DEF.find(h=>h.id==LE.pv),h=pv||lePick(),cfg=LE.cfg,root=document.documentElement;
 let bg=document.getElementById("lebg"),bn=document.getElementById("lebn"),fx=document.getElementById("lefx");
 LE.cur=h?h.id:null;
 if(!h){root.classList.remove("le-on");[bg,bn,fx].forEach(x=>x&&x.remove());return}
 const T=LET[h.id];root.classList.add("le-on");root.style.setProperty("--le-ac",T.ac);
 if(!bg){bg=document.createElement("div");bg.id="lebg";bg.setAttribute("aria-hidden","true");document.body.prepend(bg)}
 bg.innerHTML=`<i class="le-t" style="background:linear-gradient(160deg,${T.bg[0]},${T.bg[1]})"></i><i class="le-p" style="background-image:url('${leTile(h.id)}')"></i>`;
 /* dải lời chúc đầu trang */
 const hid=leJ(sessionStorage,"ct_le_x","")==h.id&&!pv,main=document.querySelector("main");
 if((cfg.bn||pv)&&!hid&&main){if(!bn){bn=document.createElement("div");bn.id="lebn";main.prepend(bn)}
  const M=leMsg(h);bn.innerHTML=`<span class="le-ic">${h.ic}</span><div class="le-tx"><div class="le-z"><span class="zh">${leE(M.z)}</span><button class="le-say" onclick="leSay('${leE(M.z)}')" aria-label="Nghe câu chúc">🔊</button></div><div class="le-py">${leE(M.p)}</div><div class="le-vi">${leE(M.v)}</div>${LE_VH[h.id]?`<button class="btn sm le-vhb" onclick="leVh('${h.id}')">🏮 Khám phá văn hóa</button>`:""}</div>${pv?`<b class="le-pv">Xem thử</b>`:`<button class="le-x" aria-label="Ẩn lời chúc" onclick="leHide('${h.id}')">✕</button>`}`}
 else if(bn)bn.remove();
 /* hiệu ứng rơi (chỉ Trang chủ) */
 if((cfg.fx||pv)&&T.fx.length&&!matchMedia("(prefers-reduced-motion: reduce)").matches){if(!fx){fx=document.createElement("div");fx.id="lefx";fx.setAttribute("aria-hidden","true");document.body.appendChild(fx)}
  if(fx.dataset.id!=h.id){fx.dataset.id=h.id;fx.innerHTML=Array.from({length:14},(_,i)=>`<span style="left:${(i*7.3+Math.random()*5)%100}%;font-size:${13+Math.random()*10|0}px;animation-duration:${9+Math.random()*8}s;animation-delay:${-Math.random()*15}s">${T.fx[i%T.fx.length]}</span>`).join("")}}
 else if(fx)fx.remove();
 leHome()}
function leHide(id){try{sessionStorage.setItem("ct_le_x",JSON.stringify(id))}catch(e){}const b=document.getElementById("lebn");if(b)b.remove()}
function leHome(){const h=document.getElementById("home");document.documentElement.classList.toggle("le-home",!!(h&&h.classList.contains("on")))}
if(typeof go=="function"){const _go=go;go=function(){const r=_go.apply(this,arguments);leHome();return r}}

/* ---------- lấy cài đặt của cô từ Google Sheets (3 giờ / lần) ---------- */
async function leSync(force){const api=typeof TRK_API!="undefined"?TRK_API:"";if(!api)return;
 const c=leJ(localStorage,LE_KEY,{});if(!force&&c.t&&Date.now()-c.t<3*36e5)return;
 try{const r=await (await fetch(api,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({a:"nen"}),redirect:"follow"})).json();
  if(r&&r.ok&&"set" in r){const cfg=Object.assign(leCfg0(),r.set||{});
   try{localStorage.setItem(LE_KEY,JSON.stringify({t:Date.now(),cfg,srv:1}))}catch(e){}LE.cfg=cfg;leApply()}}catch(e){}}

/* ---------- tab "🎨 Nền ngày lễ" trong Bảng theo dõi của cô ---------- */
function lePanel(){const D=LE.draft||(LE.draft=JSON.parse(JSON.stringify(LE.cfg))),t=leToday(),now=lePick(D);
 const rows=LE_DEF.map(h=>{const[s,e]=leRange(h,D,t),on=!(D.off||[]).includes(h.id),st=t>=s&&t<=e?"đang hiện":t<s?"còn "+leDays(t,s)+" ngày":"đã qua";return{h,s,e,on,st}}).sort((a,b)=>a.s<b.s?-1:1);
 const srv=(leJ(localStorage,LE_KEY,{})||{}).srv;
 return `<div class="lep">
<p class="ctx">Nền và lời chúc hiện cho <b>mọi người xem trang</b> (học viên, khách). Hiệu ứng rơi chỉ hiện ở Trang chủ, không làm rối bài học.${srv?"":` <b class="bad">Hiện cài đặt mới chỉ lưu trên máy này</b> – cô cần thêm đoạn mã <i>nenApi_</i> vào Google Sheets (xem cuối trang) thì học viên mới thấy.`}</p>
<div class="card lep-c"><b>Chế độ</b>
<label><input type="radio" name="lem" ${D.mode=="auto"?"checked":""} onchange="leD('mode','auto')"> Tự động theo lịch lễ bên dưới</label>
<label><input type="radio" name="lem" ${D.mode=="fixed"?"checked":""} onchange="leD('mode','fixed')"> Luôn dùng một nền: <select onchange="leD('theme',this.value);leD('mode','fixed')">${LE_DEF.map(h=>`<option value="${h.id}" ${D.theme==h.id?"selected":""}>${h.ic} ${h.vi}</option>`).join("")}</select></label>
<label><input type="radio" name="lem" ${D.mode=="off"?"checked":""} onchange="leD('mode','off')"> Tắt nền lễ (dùng nền kem mặc định)</label>
<div class="lep-ck"><label><input type="checkbox" ${D.bn?"checked":""} onchange="leD('bn',this.checked)"> Dải lời chúc ở đầu trang</label><label><input type="checkbox" ${D.fx?"checked":""} onchange="leD('fx',this.checked)"> Hiệu ứng rơi (hoa, tuyết) ở Trang chủ</label></div>
<p class="ctx">Hôm nay (${t.split("-").reverse().join("/")}): ${now?`<b>${now.ic} ${now.vi}</b>`:"nền mặc định"}</p></div>
<div class="lep-tb">${rows.map(({h,s,e,on,st})=>`<div class="card lep-r ${on?"":"off"} ${st=="đang hiện"?"now":""}">
<div class="lep-h"><label><input type="checkbox" ${on?"checked":""} onchange="leOn('${h.id}',this.checked)"> <span class="lep-i">${h.ic}</span><b>${h.vi}</b> <span class="zh">${h.zh}</span></label><span class="lep-st">${h.day} · ${st}</span></div>
<div class="lep-sw" style="background:linear-gradient(160deg,${LET[h.id].bg[0]},${LET[h.id].bg[1]});"><i style="background-image:url('${leTile(h.id)}')"></i></div>
<div class="lep-f"><label>Từ <input type="date" value="${s}" onchange="leDt('${h.id}',0,this.value)"></label><label>đến <input type="date" value="${e}" onchange="leDt('${h.id}',1,this.value)"></label>${(D.d||{})[h.id]?`<button class="btn o sm" onclick="leDt('${h.id}')">↺ Ngày mặc định</button>`:""}</div>
${(()=>{const M=leMsg(h,D);return `<div class="lep-m">Lời chúc<label>Chữ Hán <input class="tin zh" value="${leE(M.z)}" onchange="leM('${h.id}','z',this.value)"></label><label>Phiên âm <input class="tin" value="${leE(M.p)}" onchange="leM('${h.id}','p',this.value)"></label><label>Tiếng Việt <input class="tin" value="${leE(M.v)}" onchange="leM('${h.id}','v',this.value)"></label></div>`})()}
<button class="btn o sm" onclick="lePv('${h.id}')">👁 Xem thử trên trang</button></div>`).join("")}</div>
${LE.msg?`<p class="${LE.msg[0]=="✓"?"good":"bad"}">${LE.msg}</p>`:""}
<div class="row"><button class="btn" onclick="leSave()" ${LE.busy?"disabled":""}>${LE.busy?"Đang lưu…":"💾 Lưu cho mọi học viên"}</button><button class="btn o" onclick="LE.draft=null;LE.msg='';gvDraw()">Bỏ thay đổi</button><button class="btn o" onclick="ask('Đưa toàn bộ về lịch mặc định?',()=>{LE.draft=leCfg0();gvDraw()})">↺ Mặc định</button></div>
<details class="card lep-code"><summary>Đoạn mã cho Google Sheets (làm một lần)</summary>
<p>1. Mở Google Sheets › Tiện ích mở rộng › Apps Script. Dán đoạn dưới vào <b>cuối</b> file Code.gs.<br>2. Trong hàm <code>doPost(e)</code>, thêm dòng này làm <b>dòng đầu tiên</b> bên trong hàm: <code>var _nen = nenApi_(e); if (_nen) return _nen;</code><br>3. Lưu › Triển khai › Quản lý tác vụ triển khai › ✏ › Phiên bản: Phiên bản mới › Triển khai (địa chỉ giữ nguyên).<br>4. Quay lại đây bấm 💾 Lưu cho mọi học viên.</p>
<textarea class="tin" id="lecode" rows="8" readonly>${leE(LE_GS)}</textarea><button class="btn o sm" onclick="const t=document.getElementById('lecode');t.select();try{navigator.clipboard.writeText(t.value)}catch(e){document.execCommand('copy')}">📋 Sao chép đoạn mã</button></details></div>`}
const LE_GS=`/* ===== Nền ngày lễ cho trang web (24/10/2026) ===== */
function nenApi_(e) {
  var o;
  try { o = JSON.parse(e.postData.contents); } catch (x) { return null; }
  if (!o || o.a != "nen") return null;
  var P = PropertiesService.getScriptProperties(), r;
  if (o.set) {
    var pw = String(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Cài đặt").getRange("B1").getValue()).trim();
    if (String(o.pass || "").trim() != pw) r = {ok: false, err: "pass"};
    else { P.setProperty("nen", JSON.stringify(o.set)); r = {ok: true, set: o.set}; }
  } else {
    var s = P.getProperty("nen");
    r = {ok: true, set: s ? JSON.parse(s) : null};
  }
  return ContentService.createTextOutput(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON);
}`;
const leDr=()=>LE.draft||(LE.draft=JSON.parse(JSON.stringify(LE.cfg)));
function leD(k,v){leDr()[k]=v;LE.msg="";gvDraw()}
function leOn(id,v){leDr();const o=LE.draft.off=(LE.draft.off||[]).filter(x=>x!=id);if(!v)o.push(id);LE.msg="";gvDraw()}
function leDt(id,i,v){leDr();const d=LE.draft.d=LE.draft.d||{};if(i==null){delete d[id]}else{const h=LE_DEF.find(x=>x.id==id),r=d[id]||leRange(h,LE.draft).slice();r[i]=v;if(r[1]<r[0])r[1-i]=v;d[id]=r}LE.msg="";gvDraw()}
function leM(id,k,v){leDr();const m=LE.draft.m=LE.draft.m||{},o=m[id]&&typeof m[id]=="object"?m[id]:{};v=v.trim().slice(0,160);if(!v||v==LE_MSG[id][k])delete o[k];else o[k]=v;if(Object.keys(o).length)m[id]=o;else delete m[id]}
function lePv(id){LE.pv=id;try{sessionStorage.setItem(LE_PV,JSON.stringify(id))}catch(e){}leApply();lePvBar();scrollTo(0,0)}
function lePvOff(){LE.pv=null;try{sessionStorage.removeItem(LE_PV)}catch(e){}leApply();lePvBar()}
function lePvBar(){let b=document.getElementById("lepvb");if(!LE.pv){if(b)b.remove();return}const h=LE_DEF.find(x=>x.id==LE.pv);
 if(!b){b=document.createElement("div");b.id="lepvb";document.body.appendChild(b)}b.innerHTML=`👁 Đang xem thử nền <b>${h.ic} ${h.vi}</b> (chỉ máy này) <button class="btn sm" onclick="lePvOff()">Bỏ xem thử</button>`}
async function leSave(){const cfg=LE.draft||LE.cfg;LE.busy=true;LE.msg="";gvDraw();let ok=false;
 try{const r=await trkPost({a:"nen",pass:GV.pass,set:cfg});
  if(r&&r.ok&&"set" in r){ok=true;LE.msg="✓ Đã lưu. Học viên sẽ thấy nền mới khi mở lại trang (trong vòng 3 giờ)."}
  else if(r&&r.err=="pass")LE.msg="Mật khẩu chưa đúng, chưa lưu được.";
  else LE.msg="Google Sheets chưa có đoạn mã nenApi_ (xem cuối trang). Cài đặt đang áp dụng trên máy này."}
 catch(e){LE.msg="Chưa kết nối được Google Sheets. Cài đặt đang áp dụng trên máy này."}
 LE.cfg=JSON.parse(JSON.stringify(cfg));try{localStorage.setItem(LE_KEY,JSON.stringify({t:ok?Date.now():0,cfg:LE.cfg,srv:ok?1:0}))}catch(e){}
 LE.busy=false;LE.draft=null;leApply();gvDraw()}
if(typeof gvDraw=="function"){const _gd=gvDraw;gvDraw=function(){const nen=GV.tab=="nen";if(nen&&!GV.stu)GV.tab="tq";_gd.apply(this,arguments);if(nen)GV.tab="nen";
 const s=document.getElementById("gv"),tb=s&&s.querySelector(".gvtabs");if(!tb)return;
 const b=document.createElement("button");b.textContent="🎨 Nền ngày lễ";b.onclick=()=>{GV.stu=null;GV.tab="nen";gvDraw()};tb.appendChild(b);
 if(nen&&!GV.stu){tb.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));let n=tb.nextSibling;while(n){const x=n.nextSibling;n.remove();n=x}tb.insertAdjacentHTML("afterend",lePanel())}}}

(function(){const st=document.createElement("style");st.textContent=`
#lebg{position:fixed;inset:0;z-index:-1;pointer-events:none}#lebg i{position:absolute;inset:0}
#lebg .le-p{background-size:300px 300px;opacity:.75;-webkit-mask-image:var(--le-mk);mask-image:var(--le-mk)}
:root{--le-mk:linear-gradient(90deg,#000 calc(50% - 600px),transparent calc(50% - 535px),transparent calc(50% + 535px),#000 calc(50% + 600px))}
#lefx{-webkit-mask-image:var(--le-mk);mask-image:var(--le-mk)}
@media(max-width:1120px){#lebg .le-p,#lefx{opacity:0!important}}
#lebn{display:flex;align-items:flex-start;gap:10px;margin:0 0 14px;padding:10px 14px;border-radius:16px;background:var(--c,#fff);color:var(--t,#2b1a20);border:2px solid var(--le-ac);box-shadow:var(--sh2,0 4px 12px rgba(0,0,0,.08));font-weight:700}
#lebn .le-ic{font-size:1.9rem;flex:none;line-height:1.2}#lebn .le-tx{flex:1;min-width:0}
#lebn .le-z{display:flex;align-items:center;gap:6px;flex-wrap:wrap}#lebn .le-z .zh{font:700 1.3rem "Noto Serif SC",serif;color:var(--le-ac)}
#lebn .le-py{color:var(--m);font-weight:600;font-size:.95rem}#lebn .le-vi{font-weight:600}
#lebn .le-x,#lebn .le-say{flex:none;border:0;background:none;color:var(--sub,#8a7380);font-size:1rem;cursor:pointer;padding:4px 6px}
#lebn .le-vhb{margin-top:8px;background:var(--le-ac);border-color:var(--le-ac);color:#fff}
#levh .lev{position:relative;max-width:860px;width:calc(100vw - 32px);max-height:calc(100vh - 40px);overflow:auto;text-align:left}
.lev-x{position:absolute;top:10px;right:10px;border:0;background:var(--k);border-radius:50%;width:34px;height:34px;cursor:pointer;color:var(--t)}
.lev-h{display:flex;gap:12px;align-items:center;margin:0 36px 12px 0}.lev-ic{font-size:2.4rem}.lev-h h3{margin:0;color:var(--m)}.lev-h .zh{color:var(--sub)}.lev-h i{font-style:normal;color:var(--m)}
.lev-g{display:grid;grid-template-columns:1fr 1fr;gap:14px}.lev-c{background:var(--k);border:1px solid var(--b);border-radius:16px;padding:12px 14px}
.lev-c h4{margin:0 0 8px;font-size:1.05rem}.lev-c>b{display:block;color:var(--m);font-size:.82rem;text-transform:uppercase;letter-spacing:.05em;margin-top:8px}.lev-c p{margin:4px 0}.lev-c ul{margin:4px 0;padding-left:20px}
.lev-w{list-style:none;padding:0!important;display:grid;gap:6px}.lev-w li{display:flex;gap:8px;align-items:flex-start;background:var(--c);border-radius:10px;padding:6px 8px}
.lev-w button{border:0;background:none;cursor:pointer;font-size:1rem;padding:2px}.lev-w .zh{display:block;font:600 1.1rem "Noto Serif SC",serif}.lev-w i{display:block;color:var(--m);font-size:.88rem}.lev-w small{color:var(--sub)}
ruby.le-zh{font-family:"Noto Serif SC",serif;ruby-position:over}ruby.le-zh rt{font:500 .68rem var(--ui,sans-serif);color:var(--m)}.lev-c li,.lev-c p{line-height:2}
.lev-tip{margin:12px 0 0;background:var(--warnbg,#fbe9ec);border-radius:12px;padding:8px 12px}
@media(max-width:700px){.lev-g{grid-template-columns:1fr}}
.lep-m label{display:block;margin-top:4px}
#lebn .le-pv{flex:none;font-size:.75rem;background:var(--le-ac);color:#fff;border-radius:999px;padding:2px 10px}
#lefx{position:fixed;inset:0;z-index:3;pointer-events:none;overflow:hidden;display:none}html.le-home #lefx{display:block}
#lefx span{position:absolute;top:-30px;opacity:.75;color:var(--le-ac);animation:lefall linear infinite}
@keyframes lefall{0%{transform:translateY(-30px) translateX(0) rotate(0)}50%{transform:translateY(50vh) translateX(18px) rotate(160deg)}100%{transform:translateY(105vh) translateX(-10px) rotate(320deg)}}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]) #lebg .le-t{opacity:0}:root:not([data-theme="light"]) #lebg .le-p{opacity:.16}}
:root[data-theme="dark"] #lebg .le-t{opacity:0}:root[data-theme="dark"] #lebg .le-p{opacity:.16}
@media(max-width:600px){#lebg .le-p{background-size:220px 220px}#lebn{font-size:.9rem;padding:8px 10px}}
#lepvb{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:20;background:#3a0d1d;color:#fff;border-radius:999px;padding:8px 10px 8px 16px;display:flex;gap:10px;align-items:center;box-shadow:0 8px 20px rgba(0,0,0,.3);font-size:.9rem;max-width:calc(100vw - 24px)}
.lep .lep-c label{display:block;margin:6px 0}.lep-ck{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:8px;border-top:1px dashed var(--b);padding-top:8px}.lep-ck label{display:inline!important}
.lep-tb{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:12px;margin:12px 0}
.lep-r{display:flex;flex-direction:column;gap:8px;padding:12px}.lep-r.off{opacity:.55}.lep-r.now{outline:3px solid var(--g)}
.lep-h{display:flex;justify-content:space-between;gap:8px;align-items:flex-start;flex-wrap:wrap}.lep-i{font-size:1.2rem}.lep-st{font-size:.8rem;color:var(--sub)}
.lep-sw{position:relative;height:74px;border-radius:12px;overflow:hidden;border:1px solid var(--b)}.lep-sw i{position:absolute;inset:0;background-size:150px 150px;opacity:.7}
.lep-f{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;font-size:.9rem}.lep-f input{font:inherit;padding:4px 6px;border:1px solid var(--b);border-radius:8px;background:var(--k);color:var(--t)}
.lep-m{font-size:.85rem;color:var(--sub)}.lep-m .tin.zh{font-family:'Noto Serif SC',serif}.lep-m .tin{margin:2px 0 0;padding:6px 8px;font-size:.9rem}
.lep-code textarea{font:12px/1.4 ui-monospace,monospace}.lep .good{color:#2e7d32;font-weight:700}`;document.head.appendChild(st)})();

leApply();lePvBar();leSync();
