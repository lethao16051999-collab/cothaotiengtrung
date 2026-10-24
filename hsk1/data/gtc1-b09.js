/* ===== Giáo trình chuẩn HSK 1 · Bài 9: 你儿子在哪儿工作？ (sách trang 76–83) ===== */
LD1[9]={t:"你儿子在哪儿工作？",tp:"Nǐ érzi zài nǎr gōngzuò?",vi:"Con trai anh làm việc ở đâu?",
gpNote:"Ngữ pháp lấy từ mục Chú thích (注释) của sách: động từ 在, đại từ nghi vấn 哪儿, giới từ 在, trợ từ nghi vấn 呢 (2), kèm lỗi người Việt hay mắc.",
goals:["Hỏi và nói vị trí của người, vật bằng 在 + nơi chốn (小狗在椅子下面。) và 哪儿 / 呢.","Nói nơi làm việc bằng 在 + nơi chốn + động từ (我儿子在医院工作。).","Phân biệt 这儿 / 那儿 / 哪儿 (nàr – nǎr)."],
texts:[
{ctx:"在家 · Ở nhà: hỏi con mèo, con chó ở đâu.",a:"c9-1",l:[
["A","小猫在哪儿？","Xiǎo māo zài nǎr?","Con mèo đâu rồi?"],
["B","小猫在那儿。","Xiǎo māo zài nàr.","Nó ở đó kìa."],
["A","小狗在哪儿？","Xiǎo gǒu zài nǎr?","Còn con chó đâu?"],
["B","小狗在椅子下面。","Xiǎo gǒu zài yǐzi xiàmiàn.","Ở dưới ghế dựa."]]},
{ctx:"在车站 · Ở bến xe: hai người hỏi nhau nơi làm việc.",a:"c9-2",l:[
["A","你在哪儿工作？","Nǐ zài nǎr gōngzuò?","Anh làm việc ở đâu?"],
["B","我在学校工作。","Wǒ zài xuéxiào gōngzuò.","Tôi làm việc ở trường học."],
["A","你儿子在哪儿工作？","Nǐ érzi zài nǎr gōngzuò?","Vậy còn con trai anh?"],
["B","我儿子在医院工作，他是医生。","Wǒ érzi zài yīyuàn gōngzuò, tā shì yīshēng.","Con trai tôi làm việc ở bệnh viện, nó là bác sĩ."]]},
{ctx:"打电话 · Gọi điện thoại: hỏi bố của bạn có ở nhà không.",a:"c9-3",l:[
["A","你爸爸在家吗？","Nǐ bàba zài jiā ma?","Bố bạn có ở nhà không?"],
["B","不在家。","Bú zài jiā.","Không có."],
["A","他在哪儿呢？","Tā zài nǎr ne?","Ông ấy đâu rồi?"],
["B","他在医院。","Tā zài yīyuàn.","Ông ấy ở bệnh viện."]]}],
words:[
["小","xiǎo","tính từ","nhỏ, bé",0],["猫","māo","danh từ","mèo",0],["在","zài","động từ","ở",0],["那儿","nàr","đại từ","chỗ đó",0],["狗","gǒu","danh từ","chó",0],["椅子","yǐzi","danh từ","ghế dựa",0],["下面","xiàmiàn (xià)","danh từ","bên dưới, phía dưới",0],
["在","zài","giới từ","ở, vào",1],["哪儿","nǎr","đại từ","đâu",1],["工作","gōngzuò","động từ / danh từ","làm việc; công việc",1],["儿子","érzi","danh từ","con trai",1],["医院","yīyuàn","danh từ","bệnh viện",1],["医生","yīshēng","danh từ","bác sĩ",1],
["爸爸","bàba","danh từ","cha, bố",2]],
gp:[
{h:"1. Động từ 在: ở (chỉ vị trí)",b:`<span class="fm">Người / vật ＋ 在 ＋ nơi chốn<small>… zài …</small></span><ul><li>${Z("我朋友在学校。","Wǒ péngyou zài xuéxiào.")}</li><li>${Z("我妈妈在家。","Wǒ māma zài jiā.")}</li><li>${Z("小狗在椅子下面。","Xiǎo gǒu zài yǐzi xiàmiàn.")}</li></ul><p>Phủ định: ${Z("不在","bú zài")} — ${Z("他不在家。","Tā bú zài jiā.")}</p>`+W1(`Lỗi hay gặp: dùng 是 thay 在 theo kiểu “bố ở nhà” ✗ 爸爸是家; nói “dưới ghế” theo trật tự tiếng Việt ✗ 在下面椅子. Đúng: ${Z("在椅子下面","zài yǐzi xiàmiàn")} (vật mốc trước, 下面 sau).`)},
{h:"2. Đại từ nghi vấn 哪儿",b:`<span class="fm">Người / vật ＋ 在哪儿？<small>… zài nǎr?</small></span><ul><li>${Z("我的杯子在哪儿？","Wǒ de bēizi zài nǎr?")}</li><li>${Z("你的中国朋友在哪儿？","Nǐ de Zhōngguó péngyou zài nǎr?")}</li><li>${Z("小猫在哪儿？","Xiǎo māo zài nǎr?")} → ${Z("小猫在那儿。","Xiǎo māo zài nàr.")}</li></ul>`+W1(`Phân biệt: ${Z("哪儿","nǎr")} (đâu, thanh 3) — ${Z("那儿","nàr")} (đó, thanh 4) — ${Z("这儿","zhèr")} (đây). Câu có 哪儿 không thêm 吗 ✗ 小猫在哪儿吗？`)},
{h:"3. Giới từ 在: làm việc gì ở đâu",b:`<span class="fm">Chủ ngữ ＋ 在 ＋ nơi chốn ＋ động từ<small>… zài … + động từ</small></span><ul><li>${Z("我在朋友家喝茶。","Wǒ zài péngyou jiā hē chá.")}</li><li>${Z("他们在学校看书。","Tāmen zài xuéxiào kàn shū.")}</li><li>${Z("我儿子在医院工作。","Wǒ érzi zài yīyuàn gōngzuò.")}</li></ul>`+W1(`Lỗi hay gặp: đặt nơi chốn cuối câu như tiếng Việt “làm việc ở bệnh viện” ✗ 我儿子工作在医院. Trong tiếng Trung, 在 + nơi chốn đứng <b>trước</b> động từ.`)},
{h:"4. Trợ từ nghi vấn 呢 (2): hỏi vị trí",b:`<span class="fm">Người / vật ＋ 呢？ (= … ở đâu?)<small>… ne?</small></span><ul><li>${Z("我的小猫呢？","Wǒ de xiǎo māo ne?")} Con mèo của tôi đâu?</li><li>${Z("我的杯子呢？","Wǒ de bēizi ne?")}</li><li>${Z("他在哪儿呢？","Tā zài nǎr ne?")}</li></ul><p>💡 Khi đứng một mình không có ngữ cảnh trước, ${Z("……呢？","… ne?")} hỏi “… đâu rồi?”.</p>`}],
gq:[
{q:"Hỏi “Con mèo ở đâu?”:",o:["小猫在哪儿？|Xiǎo māo zài nǎr?","小猫是哪儿？|Xiǎo māo shì nǎr?","小猫在哪儿吗？|Xiǎo māo zài nǎr ma?"],e:"在 + 哪儿; không thêm 吗."},
{q:"“Con chó ở dưới ghế” nói là:",o:["小狗在椅子下面。|Xiǎo gǒu zài yǐzi xiàmiàn.","小狗在下面椅子。|Xiǎo gǒu zài xiàmiàn yǐzi.","小狗是椅子下面。|Xiǎo gǒu shì yǐzi xiàmiàn."],e:"在 + vật mốc + 下面."},
{q:"“Tôi làm việc ở trường học” nói là:",o:["我在学校工作。|Wǒ zài xuéxiào gōngzuò.","我工作在学校。|Wǒ gōngzuò zài xuéxiào.","我学校在工作。|Wǒ xuéxiào zài gōngzuò."],e:"在 + nơi chốn đứng trước động từ."},
{q:"“Bố tôi không ở nhà” nói là:",o:["我爸爸不在家。|Wǒ bàba bú zài jiā.","我爸爸没是家。|Wǒ bàba méi shì jiā.","我爸爸在不家。|Wǒ bàba zài bù jiā."],e:"Phủ định: 不在."},
{q:"Từ nào nghĩa là “chỗ đó”?",o:["那儿|nàr","哪儿|nǎr","这儿|zhèr"],e:"那儿 nàr (thanh 4) = chỗ đó; 哪儿 nǎr (thanh 3) = đâu."},
{q:"“我的杯子呢？” nghĩa là:",o:["Cái cốc của tôi đâu rồi?","Cái cốc của tôi đẹp không?","Đây là cốc của tôi."],e:"Danh từ + 呢？ hỏi vị trí."},
{q:"Hỏi “你儿子在哪儿工作？”, câu trả lời đúng:",o:["他在医院工作。|Tā zài yīyuàn gōngzuò.","他是医院。|Tā shì yīyuàn.","他工作医生。|Tā gōngzuò yīshēng."],e:"在 + nơi chốn + 工作."},
{q:"“Con trai tôi là bác sĩ” nói là:",o:["我儿子是医生。|Wǒ érzi shì yīshēng.","我儿子在医生。|Wǒ érzi zài yīshēng.","我儿子医生是。|Wǒ érzi yīshēng shì."],e:"Nghề nghiệp dùng 是; nơi chốn dùng 在."}],
dt:[["小猫在哪儿？","Xiǎo māo zài nǎr?"],["小猫在那儿。","Xiǎo māo zài nàr."],["小狗在椅子下面。","Xiǎo gǒu zài yǐzi xiàmiàn."],["你在哪儿工作？","Nǐ zài nǎr gōngzuò?"],["我在学校工作。","Wǒ zài xuéxiào gōngzuò."],["你儿子在哪儿工作？","Nǐ érzi zài nǎr gōngzuò?"],["我儿子在医院工作，他是医生。","Wǒ érzi zài yīyuàn gōngzuò, tā shì yīshēng."],["你爸爸在家吗？","Nǐ bàba zài jiā ma?"],["他在哪儿呢？","Tā zài nǎr ne?"],["他在医院。","Tā zài yīyuàn."]],
tsort:[
{t:["小狗","在","椅子","下面","。"],ok:["小狗在椅子下面。"],p:"Xiǎo gǒu zài yǐzi xiàmiàn.",e:"在 + vật mốc + 下面."},
{t:["你","在","哪儿","工作","？"],ok:["你在哪儿工作？"],p:"Nǐ zài nǎr gōngzuò?",e:"在哪儿 đứng trước động từ."},
{t:["我","儿子","在","医院","工作","。"],ok:["我儿子在医院工作。"],p:"Wǒ érzi zài yīyuàn gōngzuò.",e:"在 + nơi chốn + động từ."},
{t:["你","爸爸","在","家","吗","？"],ok:["你爸爸在家吗？"],p:"Nǐ bàba zài jiā ma?",e:"在 + nơi chốn + 吗."},
{t:["他","在","哪儿","呢","？"],ok:["他在哪儿呢？"],p:"Tā zài nǎr ne?",e:"呢 cuối câu hỏi vị trí."}],
tlis:[
{a:"小猫在哪儿？",o:["小猫在那儿。|Xiǎo māo zài nàr.","我在学校工作。|Wǒ zài xuéxiào gōngzuò.","不在家。|Bú zài jiā."]},
{a:"你在哪儿工作？",o:["我在学校工作。|Wǒ zài xuéxiào gōngzuò.","小狗在椅子下面。|Xiǎo gǒu zài yǐzi xiàmiàn.","他是医生。|Tā shì yīshēng."]},
{a:"你爸爸在家吗？",o:["不在家。|Bú zài jiā.","他是医生。|Tā shì yīshēng.","小猫在那儿。|Xiǎo māo zài nàr."]},
{a:"我儿子在医院工作，他是医生。",qz:"他儿子在哪儿工作？",qp:"Tā érzi zài nǎr gōngzuò?",o:["医院|yīyuàn","学校|xuéxiào","家|jiā"]},
{a:"小狗在椅子下面。",qz:"小狗在哪儿？",qp:"Xiǎo gǒu zài nǎr?",o:["椅子下面|yǐzi xiàmiàn","那儿|nàr","医院|yīyuàn"]}],
sit:[
{title:"Tình huống 1 · Ở nhà",ctx:"Hỏi con mèo, con chó ở đâu.",turns:[
{w:"A",vi:"Hỏi con mèo ở đâu.",h:[["小猫","xiǎo māo"],["在","zài"],["哪儿","nǎr"]],r:["小猫在哪儿？","Xiǎo māo zài nǎr?","Con mèo đâu rồi?"]},
{w:"B",vi:"Trả lời: nó ở đó kìa.",h:[["小猫","xiǎo māo"],["在","zài"],["那儿","nàr"]],r:["小猫在那儿。","Xiǎo māo zài nàr.","Nó ở đó kìa."]},
{w:"A",vi:"Hỏi con chó ở đâu.",h:[["小狗","xiǎo gǒu"],["在","zài"],["哪儿","nǎr"]],r:["小狗在哪儿？","Xiǎo gǒu zài nǎr?","Còn con chó đâu?"]},
{w:"B",vi:"Trả lời: ở dưới ghế.",h:[["小狗","xiǎo gǒu"],["在","zài"],["椅子","yǐzi"],["下面","xiàmiàn"]],r:["小狗在椅子下面。","Xiǎo gǒu zài yǐzi xiàmiàn.","Ở dưới ghế dựa."]}]},
{title:"Tình huống 2 · Ở bến xe",ctx:"Hai người hỏi nhau nơi làm việc.",turns:[
{w:"A",vi:"Hỏi anh làm việc ở đâu.",h:[["你","nǐ"],["在哪儿","zài nǎr"],["工作","gōngzuò"]],r:["你在哪儿工作？","Nǐ zài nǎr gōngzuò?","Anh làm việc ở đâu?"]},
{w:"B",vi:"Nói mình làm việc ở trường học.",h:[["我","wǒ"],["在学校","zài xuéxiào"],["工作","gōngzuò"]],r:["我在学校工作。","Wǒ zài xuéxiào gōngzuò.","Tôi làm việc ở trường học."]},
{w:"A",vi:"Hỏi con trai anh làm việc ở đâu.",h:[["你儿子","nǐ érzi"],["在哪儿","zài nǎr"],["工作","gōngzuò"]],r:["你儿子在哪儿工作？","Nǐ érzi zài nǎr gōngzuò?","Con trai anh làm việc ở đâu?"]},
{w:"B",vi:"Nói con trai làm việc ở bệnh viện, là bác sĩ.",h:[["我儿子","wǒ érzi"],["在医院","zài yīyuàn"],["工作","gōngzuò"],["他是医生","tā shì yīshēng"]],r:["我儿子在医院工作，他是医生。","Wǒ érzi zài yīyuàn gōngzuò, tā shì yīshēng.","Con trai tôi làm việc ở bệnh viện, nó là bác sĩ."]}]},
{title:"Tình huống 3 · Gọi điện thoại",ctx:"Gọi điện hỏi bố của bạn có ở nhà không.",turns:[
{w:"A",vi:"Hỏi bố bạn có ở nhà không.",h:[["你爸爸","nǐ bàba"],["在家","zài jiā"],["吗","ma"]],r:["你爸爸在家吗？","Nǐ bàba zài jiā ma?","Bố bạn có ở nhà không?"]},
{w:"B",vi:"Trả lời: không ở nhà.",h:[["不在","bú zài"],["家","jiā"]],r:["不在家。","Bú zài jiā.","Không có."]},
{w:"A",vi:"Hỏi ông ấy ở đâu.",h:[["他","tā"],["在哪儿","zài nǎr"],["呢","ne"]],r:["他在哪儿呢？","Tā zài nǎr ne?","Ông ấy đâu rồi?"]},
{w:"B",vi:"Trả lời: ông ấy ở bệnh viện.",h:[["他","tā"],["在","zài"],["医院","yīyuàn"]],r:["他在医院。","Tā zài yīyuàn.","Ông ấy ở bệnh viện."]}]},
{title:"Tình huống 4 · Vận dụng: hỏi về gia đình bạn mới",ctx:"Giờ ra chơi, em hỏi bạn mới về nơi làm việc của bố mẹ bạn ấy.",turns:[
{w:"我",vi:"Hỏi bố bạn làm việc ở đâu.",h:[["你爸爸","nǐ bàba"],["在哪儿","zài nǎr"],["工作","gōngzuò"]],r:["你爸爸在哪儿工作？","Nǐ bàba zài nǎr gōngzuò?","Bố bạn làm việc ở đâu?"]},
{w:"同学",vi:"Nói bố làm việc ở bệnh viện, là bác sĩ.",h:[["我爸爸","wǒ bàba"],["在医院工作","zài yīyuàn gōngzuò"],["他是医生","tā shì yīshēng"]],r:["我爸爸在医院工作，他是医生。","Wǒ bàba zài yīyuàn gōngzuò, tā shì yīshēng.","Bố mình làm ở bệnh viện, bố là bác sĩ."]},
{w:"我",vi:"Hỏi mẹ bạn làm việc ở đâu.",h:[["你妈妈","nǐ māma"],["在哪儿","zài nǎr"],["工作","gōngzuò"]],r:["你妈妈在哪儿工作？","Nǐ māma zài nǎr gōngzuò?","Mẹ bạn làm việc ở đâu?"]},
{w:"同学",vi:"Nói mẹ làm việc ở trường học, là giáo viên.",h:[["我妈妈","wǒ māma"],["在学校工作","zài xuéxiào gōngzuò"],["她是老师","tā shì lǎoshī"]],r:["我妈妈在学校工作，她是老师。","Wǒ māma zài xuéxiào gōngzuò, tā shì lǎoshī.","Mẹ mình làm ở trường học, mẹ là giáo viên."]},
{w:"我",vi:"Hỏi bây giờ mẹ bạn có ở nhà không.",h:[["你妈妈","nǐ māma"],["在家","zài jiā"],["吗","ma"]],r:["你妈妈在家吗？","Nǐ māma zài jiā ma?","Mẹ bạn có ở nhà không?"]},
{w:"同学",vi:"Nói mẹ không ở nhà, mẹ ở trường.",h:[["她","tā"],["不在家","bú zài jiā"],["在学校","zài xuéxiào"]],r:["她不在家，她在学校。","Tā bú zài jiā, tā zài xuéxiào.","Mẹ không ở nhà, mẹ ở trường."]}]}],
act:[
{title:"双人活动 · Hoạt động theo cặp: hỏi đáp theo thực tế",ctx:"Hai người một nhóm, hỏi đáp theo tình hình thật: người / vật ở đâu, làm việc ở đâu.",
req:["两人一组，根据实际情况进行问答练习。","Liǎng rén yì zǔ, gēnjù shíjì qíngkuàng jìnxíng wèndá liànxí.","Ghép thành từng cặp, luyện tập đặt câu hỏi và trả lời."],
roles:["A","B"],
l:[
["A","你妈妈在哪儿？","Nǐ māma zài nǎr?","Mẹ bạn ở đâu?","Hỏi theo mẫu ……在哪儿？"],
["B","我妈妈在家。","Wǒ māma zài jiā.","Mẹ mình ở nhà.","Trả lời theo mẫu ……在……"],
["A","你爸爸在哪儿工作？","Nǐ bàba zài nǎr gōngzuò?","Bố bạn làm việc ở đâu?","Hỏi theo mẫu ……在哪儿工作？"],
["B","我爸爸在医院工作，他是医生。","Wǒ bàba zài yīyuàn gōngzuò, tā shì yīshēng.","Bố mình làm việc ở bệnh viện, bố là bác sĩ.","Trả lời theo mẫu ……在……工作，他/她是……"]],
note:"Mẫu câu theo sách (……在哪儿？/ ……在哪儿工作？); nội dung cụ thể Claude điền mẫu. Các em thay bằng thông tin thật.",
sub:[["Nơi chốn",[["家","jiā","nhà"],["学校","xuéxiào","trường học"],["医院","yīyuàn","bệnh viện"],["商店","shāngdiàn","cửa hàng"]]],["Nghề nghiệp",[["老师","lǎoshī","giáo viên"],["医生","yīshēng","bác sĩ"],["学生","xuésheng","học sinh"]]]]},
{title:"小组活动 · Hoạt động nhóm: công việc của bạn bè",ctx:"Nhóm 3–4 người giới thiệu công việc của bạn bè, bạn cùng lớp; ghi vào bảng (bạn · công việc), rồi cử một bạn báo cáo. Bảng mẫu: 李朋 · 是医生，在医院工作。",
req:["3~4人一组，互相介绍自己的朋友、同学的工作情况并记录，每组请一位同学报告情况。","Sān dào sì rén yì zǔ, hùxiāng jièshào zìjǐ de péngyou, tóngxué de gōngzuò qíngkuàng bìng jìlù, měi zǔ qǐng yí wèi tóngxué bàogào qíngkuàng.","Lập nhóm từ 3 đến 4 người, trao đổi tình hình công việc của bạn bè, bạn cùng lớp, ghi lại và cử một đại diện trình bày."],
roles:["我","同学"],
l:[
["我","你朋友在哪儿工作？","Nǐ péngyou zài nǎr gōngzuò?","Bạn của bạn làm việc ở đâu?","Hỏi bạn của bạn làm việc ở đâu."],
["同学","我朋友李朋是医生，在医院工作。","Wǒ péngyou Lǐ Péng shì yīshēng, zài yīyuàn gōngzuò.","Bạn mình là Lý Bằng, là bác sĩ, làm việc ở bệnh viện.","Giới thiệu theo bảng mẫu trong sách."]],
note:"Câu trả lời theo bảng mẫu trong sách (李朋 Lǐ Péng); câu hỏi Claude soạn.",
sub:[["Báo cáo",[["李朋是医生，在医院工作。","Lǐ Péng shì yīshēng, zài yīyuàn gōngzuò.","Lý Bằng là bác sĩ, làm việc ở bệnh viện."]]]]}]};
GXD["1-9"]={so:[
{t:["小猫|xiǎo māo","在|zài","哪儿|nǎr"],ok:["小猫在哪儿"],f:"小猫在哪儿？",p:"Xiǎo māo zài nǎr?",e:"在 + 哪儿."},
{t:["小狗|xiǎo gǒu","在|zài","椅子|yǐzi","下面|xiàmiàn"],ok:["小狗在椅子下面"],f:"小狗在椅子下面。",p:"Xiǎo gǒu zài yǐzi xiàmiàn.",e:"Vật mốc + 下面."},
{t:["我|wǒ","在|zài","学校|xuéxiào","工作|gōngzuò"],ok:["我在学校工作"],f:"我在学校工作。",p:"Wǒ zài xuéxiào gōngzuò.",e:"在 + nơi chốn + động từ."},
{t:["他们|tāmen","在|zài","学校|xuéxiào","看书|kàn shū"],ok:["他们在学校看书"],f:"他们在学校看书。",p:"Tāmen zài xuéxiào kàn shū.",e:"Ví dụ trong sách."},
{t:["我的|wǒ de","杯子|bēizi","呢|ne"],ok:["我的杯子呢"],f:"我的杯子呢？",p:"Wǒ de bēizi ne?",e:"Danh từ + 呢 hỏi vị trí."}],
tr:[
{vi:"Con mèo ở đâu?",a:["小猫在哪儿","小猫在哪"],r:["小猫在哪儿？","Xiǎo māo zài nǎr?"]},
{vi:"Con chó ở dưới ghế.",a:["小狗在椅子下面","狗在椅子下面"],r:["小狗在椅子下面。","Xiǎo gǒu zài yǐzi xiàmiàn."]},
{vi:"Bạn làm việc ở đâu?",a:["你在哪儿工作","你在哪工作"],r:["你在哪儿工作？","Nǐ zài nǎr gōngzuò?"]},
{vi:"Con trai tôi làm việc ở bệnh viện.",a:["我儿子在医院工作"],r:["我儿子在医院工作。","Wǒ érzi zài yīyuàn gōngzuò."]},
{vi:"Bố tôi không ở nhà.",a:["我爸爸不在家"],r:["我爸爸不在家。","Wǒ bàba bú zài jiā."]}],
pc:[
{img:"h1cb9a",req:"Nói con mèo ở đâu (gợi ý trong sách: ___在___。).",kw:[{l:"在",m:[["在","zai"]]},{l:"椅子",m:[["椅子","yizi"]]}],r:[["小猫在椅子上面。","Xiǎo māo zài yǐzi shàngmiàn.","Con mèo ở trên ghế."],["小猫在椅子上。","Xiǎo māo zài yǐzi shang.","Con mèo ở trên ghế."]]},
{img:"h1cb9b",req:"Nói bạn nhỏ ở đâu (gợi ý trong sách: ___在___。).",kw:[{l:"在",m:[["在","zai"]]},{l:"椅子下面",m:[["椅子下面","yizixiamian"]]}],r:[["小朋友在椅子下面。","Xiǎopéngyou zài yǐzi xiàmiàn.","Bạn nhỏ ở dưới ghế."]]},
{img:"h1cb9c",req:"Mẹ là bác sĩ, làm ở bệnh viện (gợi ý trong sách: 我妈妈是___，她在___。).",kw:[{l:"医生",m:[["医生","yisheng"]]},{l:"医院",m:[["医院","yiyuan"]]}],r:[["我妈妈是医生，她在医院工作。","Wǒ māma shì yīshēng, tā zài yīyuàn gōngzuò.","Mẹ tôi là bác sĩ, mẹ làm việc ở bệnh viện."]]},
{img:"h1cb9d",req:"Con gái là học sinh, không ở nhà (gợi ý trong sách: 我女儿是___，她不___。).",kw:[{l:"学生",m:[["学生","xuesheng"]]},{l:"不在家",m:[["不在家","buzaijia"]]}],r:[["我女儿是学生，她不在家。","Wǒ nǚ'ér shì xuésheng, tā bú zài jiā.","Con gái tôi là học sinh, nó không ở nhà."]]}]};
var TKP=Object.assign(window.TKP||{},{"小猫":"xiǎo māo","小狗":"xiǎo gǒu","在":"zài","哪儿":"nǎr","那儿":"nàr","椅子":"yǐzi","下面":"xiàmiàn","工作":"gōngzuò","学校":"xuéxiào","儿子":"érzi","医院":"yīyuàn","医生":"yīshēng","爸爸":"bàba","家":"jiā","呢":"ne"});
