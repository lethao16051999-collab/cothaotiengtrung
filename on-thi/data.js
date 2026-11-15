/* Dữ liệu trang Ôn thi HSK 3.0 (on-thi/). Sửa nội dung ở đây, không cần sửa index.html.
   Nguồn bài viết: "新版HSK（1-6级）考试结构与样题示例" (汉考国际, công bố 12/2025, áp dụng 7/2026).
   Nguồn bài nói: đề mẫu 样卷 "中文水平考试 HSK（三/四/五/六级）口语" (中外语言交流合作中心).
   Mỗi cấp: n (số câu viết), t (phút), sec = [kỹ năng, phút, [dạng...]], noi = bài thi nói (HSK3–6).
   Mỗi dạng: k (mã, dùng làm khóa lưu tiến độ ct_ot_<cấp>_<k>), p (phần), c (câu số), d (mô tả), vd (câu ví dụ trong đề mẫu),
   href ("" = Sắp ra mắt), x (ghi chú), on (link bài giáo trình / ngữ pháp để ôn lại khi dưới 80%), chk (dạng chưa rõ).
   Thi thử: mảng THI[cấp] {t, d, href, tag, k}. Ghi chú/mẹo của cô cho từng cấp: TIP[cấp] (HTML). */
const OT={
 1:{n:40,t:40,ten:"Sơ cấp 1",tu:300,sec:[
  ["Nghe",12,[
   {k:"n1",p:"Phần 1",c:"1–5",d:"Nghe cụm từ, chọn tranh đúng (A–C)",vd:"三个苹果"},
   {k:"n2",p:"Phần 2",c:"6–10",d:"Nghe câu hỏi, chọn câu trả lời (A–C)",vd:"今天天气怎么样？ → 非常热"},
   {k:"n3",p:"Phần 3",c:"11–15",d:"Nghe hội thoại ngắn, chọn tranh phù hợp (A–F)",vd:"女：你好！ 男：你好，很高兴认识你！"},
   {k:"n4",p:"Phần 4",c:"16–20",d:"Nghe 1 câu và câu hỏi, chọn đáp án (A–C)",vd:"下午我去超市，我想买一些水果。问：说话人下午去哪里？ → 超市"}]],
  ["Đọc",20,[
   {k:"d1",p:"Phần 1",c:"21–25",d:"Đọc câu (có phiên âm), chọn tranh phù hợp (A–F)",vd:"我很喜欢这本书。"},
   {k:"d2",p:"Phần 2",c:"26–30",d:"Nối câu hỏi với câu trả lời (A–F)",vd:"你喝水吗？ → 好的，谢谢！"},
   {k:"d3",p:"Phần 3",c:"31–35",d:"Chọn từ điền vào chỗ trống (A–F)",vd:"你（叫）什么名字？"},
   {k:"d4",p:"Phần 4",c:"36–40",d:"Đọc câu, trả lời câu hỏi ★ (A–C)",vd:"请问现在几点了？ ★说话人想知道什么？ → 时间"}]]]},
 2:{n:60,t:60,ten:"Sơ cấp 2",tu:500,sec:[
  ["Nghe",17,[
   {k:"n1",p:"Phần 1",c:"1–5",d:"Nghe câu, chọn tranh đúng (A–C)",vd:"我每天坐公交车去上班。"},
   {k:"n2",p:"Phần 2",c:"6–15",d:"Nghe hội thoại, chọn tranh phù hợp (A–F)",vd:"男：你喜欢什么运动？ 女：我最喜欢踢足球。"},
   {k:"n3",p:"Phần 3",c:"16–25",d:"Nghe hội thoại và câu hỏi, chọn đáp án (A–C)",vd:"给您笔，请在这儿写一下您的姓名。问：女的要写什么？ → 姓名"}]],
  ["Đọc",25,[
   {k:"d1",p:"Phần 1",c:"26–30",d:"Đọc câu, chọn tranh phù hợp (A–F)",vd:"每个星期六，我都去打篮球。"},
   {k:"d2",p:"Phần 2",c:"31–35",d:"Chọn từ điền vào chỗ trống (A–F)",vd:"我来这里已经三年（多）了。"},
   {k:"d3",p:"Phần 3",c:"36–45",d:"Nối câu hỏi với câu trả lời (A–F)",vd:"李老师在哪儿？你看见他了吗？ → 他出去了，一会儿就回来。"},
   {k:"d4",p:"Phần 4",c:"46–50",d:"Đọc câu, chọn ý đúng cho câu ★ (A–C)",vd:"我爱跳舞，但跳得不太好。 ★他： → 喜欢跳舞"}]],
  ["Viết",10,[
   {k:"v1",p:"Phần 1",c:"51–55",d:"Chọn bộ kiện ghép thành chữ Hán hoàn chỉnh (A–F)",vd:"亻 + 十 → 什（么）",x:"Dạng mới: nhìn chữ thiếu một bộ phận, chọn bộ phận còn thiếu"},
   {k:"v2",p:"Phần 2",c:"56–60",d:"Nhìn phiên âm, viết chữ Hán vào chỗ trống",vd:"你想喝（chá）还是喝咖啡？ → 茶"}]]]},
 3:{n:70,t:83,ten:"Sơ cấp 3",tu:1000,sec:[
  ["Nghe",23,[
   {k:"n1",p:"Phần 1",c:"1–10",d:"Nghe hội thoại, chọn tranh phù hợp (A–F)",vd:"男：喂，请问张经理在吗？ 女：他正在开会……"},
   {k:"n2",p:"Phần 2",c:"11–20",d:"Nghe hội thoại và câu hỏi, chọn đáp án (A–C)",vd:"我奶奶住院了…… 问：男的的奶奶怎么了？ → 住院了",x:"11–15: hội thoại 2 câu · 16–20: hội thoại 4 câu"},
   {k:"n3",p:"Phần 3",c:"21–30",d:"Nghe đoạn văn ngắn, trả lời câu hỏi (A–C)",vd:"这里的夏天没那么热…… 问：那里秋季的天气怎么样？ → 凉快"}]],
  ["Đọc",30,[
   {k:"d1",p:"Phần 1",c:"31–40",d:"Nối câu với câu đáp / câu hỏi tương ứng (A–F)",vd:"他休假了，你有事可以给他发邮件。 ← 经理怎么不在办公室？"},
   {k:"d2",p:"Phần 2",c:"41–50",d:"Chọn từ điền vào câu / hội thoại (A–F)",vd:"洗手间（地方）小…… / 然后跟你们（一块儿）聊天儿。",x:"41–45: câu đơn · 46–50: hội thoại A–B"},
   {k:"d3",p:"Phần 3",c:"51–60",d:"Đọc hiểu đoạn văn, trả lời câu hỏi (A–C)",vd:"兴趣是最好的老师……",x:"51–56: đoạn ngắn 1 câu hỏi · 57–60: đoạn dài 2 câu hỏi"}]],
  ["Viết",20,[
   {k:"v1",p:"Phần 1",c:"61–65",d:"Nhìn phiên âm, viết chữ Hán vào chỗ trống",vd:"咱们（yě）打出租车吧。 → 也"},
   {k:"v2",p:"Phần 2",c:"66–70",d:"Nhìn tranh, dùng từ cho sẵn đặt câu",vd:"羽毛球 → 她每周末都去打羽毛球。",x:"Dạng mới (giống viết HSK4 cũ) · Máy chấm trước, cô chấm sau"}]]],
  noi:{t:15,cb:6,d:[
   {k:"o1",p:"Phần 1",c:"8 câu",d:"Nghe rồi nhắc lại nguyên câu (听后重复)",x:"Mỗi câu 10 giây"},
   {k:"o2",p:"Phần 2",c:"5 câu",d:"Nhìn tranh nói 1 câu (看图说话)",vd:"Tranh: người đàn ông đọc báo / cô gái gọi điện cạnh xe hỏng…",x:"Mỗi tranh 1 câu, 15 giây"},
   {k:"o3",p:"Phần 3",c:"2 câu",d:"Trả lời câu hỏi (回答问题)",vd:"请介绍一下你的一位家人。 / 你喜欢做什么样的工作？为什么？",x:"Chuẩn bị 3 phút, trả lời 1,5 phút mỗi câu"}]}},
 4:{n:70,t:85,ten:"Trung cấp 1",tu:2000,sec:[
  ["Nghe",20,[
   {k:"n1",p:"Phần 1",c:"1–14",d:"Nghe hội thoại, trả lời câu hỏi (A–D)",vd:"这趟出差只有我一个人去吗？…… → 任务复杂",x:"1–7: hội thoại 2 câu · 8–14: hội thoại 4 câu · bỏ dạng phán đoán đúng sai"},
   {k:"n2",p:"Phần 2",c:"15–32",d:"Nghe đoạn văn, trả lời 1–2 câu hỏi (A–D)",vd:"我今天要给爷爷寄点儿茶叶…… 问：说话人让弟弟帮忙做什么？ → 寄快递",x:"15–19: 1 câu hỏi · 20–32: mỗi đoạn 2 câu hỏi"}]],
  ["Đọc",30,[
   {k:"d1",p:"Phần 1",c:"33–42",d:"Chọn từ điền vào câu / hội thoại (A–E)",vd:"（打扰）一下，同学…… / 给你（倒）一杯？",x:"33–37: câu đơn · 38–42: hội thoại"},
   {k:"d2",p:"Phần 2",c:"43–57",d:"Đọc hiểu, trả lời câu ★ (A–D)",vd:"记课堂笔记有很多好处…… ★记课堂笔记的好处是： → 加强理解",x:"43–50: 1 câu hỏi · 51–57: mỗi đoạn 2 câu hỏi"},
   {k:"d3",p:"Phần 3",c:"58–64",d:"Chọn vế câu điền vào đoạn văn",vd:"卖的食物既新鲜又便宜，（而且服务也值得一提）。",x:"Dạng mới (giống HSK5 cũ) · bỏ dạng sắp xếp câu"}]],
  ["Viết",25,[
   {k:"v1",p:"Phần 1",c:"65–69",d:"Nhìn tranh, dùng từ cho sẵn đặt câu",vd:"结账 → 我没带现金，请问能用信用卡结账吗？",x:"Máy chấm trước, cô chấm sau"},
   {k:"v2",p:"Phần 2",c:"70",d:"Viết đoạn văn ít nhất 80 chữ theo đề",vd:"请写一篇不少于80字的短文，介绍一下你最难忘的一次旅行。",x:"Dạng mới (giống HSK5 cũ) · Cô chấm · 2' dàn ý – 10' viết – 3' kiểm tra"}]]],
  noi:{t:20,cb:10,d:[
   {k:"o1",p:"Phần 1",c:"2 câu",d:"Nghe đoạn ngắn rồi kể lại (听后复述)",x:"Mỗi câu 40 giây"},
   {k:"o2",p:"Phần 2",c:"1 câu",d:"Nhìn chuỗi 3 tranh, kể thành câu chuyện (看图说话)",vd:"Học nhóm → tốt nghiệp tung mũ → cùng nhau ăn mừng",x:"Chuẩn bị 3 phút, nói 2 phút"},
   {k:"o3",p:"Phần 3",c:"2 câu",d:"Trả lời câu hỏi (回答问题)",vd:"如果给你七天假，你打算怎么安排？ / 刚到一个新公司工作时，你会怎么做？",x:"Chuẩn bị 3,5 phút, trả lời 2 phút mỗi câu"}]}},
 5:{n:72,t:110,ten:"Trung cấp 2",tu:3600,sec:[
  ["Nghe",25,[
   {k:"n1",p:"Phần 1",c:"1–19",d:"Nghe hội thoại ngắn và dài, trả lời câu hỏi (A–D)",vd:"国庆节我想去参观国家博物馆…… → 提前线上预约",x:"1–10: 1 câu hỏi · 11–19: hội thoại dài nhiều câu hỏi"},
   {k:"n2",p:"Phần 2",c:"20–35",d:"Nghe đoạn văn, trả lời câu hỏi (A–D)",vd:"苏洵少时不爱读书…… → 把书藏起来",x:"Mỗi đoạn 2–3 câu hỏi"}]],
  ["Đọc",35,[
   {k:"d1",p:"Phần 1",c:"36–45",d:"Chọn từ / vế câu điền vào đoạn văn (A–D)",vd:"首先是方便。（比起其他交通工具），电动自行车……占地（面积）小"},
   {k:"d2",p:"Phần 2",c:"46–55",d:"Sắp xếp các đoạn A–E thành bài hoàn chỉnh",vd:"范仲淹苦读 → B A E D C",x:"Dạng mới: cần nắm trình tự thời gian, nhân – quả, liên kết ý"},
   {k:"d3",p:"Phần 3",c:"56–70",d:"Đọc hiểu bài dài, trả lời câu hỏi (A–D)",vd:"桑国亚与中国茶文化……（có câu hỏi nghĩa phần gạch chân）"}]],
  ["Viết",40,[
   {k:"v1",p:"Phần 1",c:"71",d:"Viết câu chuyện ít nhất 100 chữ theo 4 tranh",vd:"根据四张图，写出发生在李明和伙伴们身上的故事。",x:"Cô chấm"},
   {k:"v2",p:"Phần 2",c:"72",d:"Viết bài ít nhất 200 chữ theo đề",vd:"分享你曾经做过的一次尝试，以及你尝试后的感受。",x:"Cô chấm"}]]],
  noi:{t:23,cb:10,d:[
   {k:"o1",p:"Phần 1",c:"2 câu",d:"Nghe đoạn văn rồi kể lại (听后复述)",x:"Mỗi câu 1,5 phút"},
   {k:"o2",p:"Phần 2",c:"1 câu",d:"Nhìn chuỗi 3 tranh, kể thành câu chuyện (看图说话)",vd:"Bé ngã xe → bố đỡ yên tập đi → bé tự đạp, bố chạy theo",x:"Chuẩn bị 3 phút, nói 2 phút"},
   {k:"o3",p:"Phần 3",c:"2 câu",d:"Trả lời câu hỏi, nêu quan điểm (回答问题)",vd:"你认为互联网对你的生活产生了哪些影响？ / “活到老，学到老。”你是怎么理解的？",x:"Chuẩn bị 3,5 phút, trả lời 2,5 phút mỗi câu"}]}},
 6:{n:82,t:125,ten:"Trung cấp 3",tu:5400,sec:[
  ["Nghe",30,[
   {k:"n1",p:"Phần 1",c:"1–8",d:"Nghe đoạn ngắn, chọn câu đúng với nội dung (A–D)",vd:"全红婵再现“水花消失术”…… → 全红婵跳水技艺高超",x:"Nội dung thời sự Trung Quốc"},
   {k:"n2",p:"Phần 2",c:"9–28",d:"Nghe bài nói / đoạn văn dài, trả lời câu hỏi (A–D)",vd:"微专业……",x:"Mỗi bài 3–4 câu hỏi"},
   {k:"n3",p:"Phần 3",c:"29–40",d:"Nghe phỏng vấn, trả lời câu hỏi (A–D)",vd:"《我的阿勒泰》的改编与文旅融合……",x:"Mỗi bài phỏng vấn 3–4 câu hỏi"}]],
  ["Đọc",40,[
   {k:"d1",p:"Phần 1",c:"41–50",d:"Chọn từ điền vào đoạn văn (A–D)",vd:"梅兰芳非常（好学）……受到了很多（启发）"},
   {k:"d2",p:"Phần 2",c:"51–60",d:"Chọn vế câu điền vào đoạn văn (A–F)",vd:"“蓝色循环”…… → B F E C D",x:"Có 1 phương án nhiễu · bỏ dạng tìm câu sai (找病句)"},
   {k:"d3",p:"Phần 3",c:"61–80",d:"Đọc hiểu bài dài, trả lời câu hỏi (A–D)",vd:"无陪护病房……"}]],
  ["Viết",45,[
   {k:"v1",p:"Phần 1",c:"81",d:"Viết văn bản thực dụng ít nhất 150 chữ theo tình huống",vd:"写一则招租信息，找一名室友跟你合租。",x:"Thông báo / thư / tin đăng · Cô chấm"},
   {k:"v2",p:"Phần 2",c:"82",d:"Viết bài nêu quan điểm ít nhất 300 chữ",vd:"科学发展是会促进还是抑制人的全面发展？",x:"Cô chấm"}]]],
  noi:{t:23,cb:10,d:[
   {k:"o1",p:"Phần 1",c:"2 câu",d:"Nghe đoạn văn rồi kể lại (听后复述)",x:"Mỗi câu 1,5 phút"},
   {k:"o2",p:"Phần 2",c:"1 câu",d:"Nhìn chuỗi 4 tranh, kể thành câu chuyện (看图说话)",vd:"Khám bệnh → phẫu thuật → thăm bệnh → khỏe lại đi cùng gia đình",x:"Chuẩn bị 3 phút, nói 2 phút"},
   {k:"o3",p:"Phần 3",c:"2 câu",d:"Trả lời câu hỏi, nêu quan điểm (回答问题)",vd:"你和父母那一代人有什么相同和不同？ / “最好的投资就是投资自己”，你赞成吗？",x:"Chuẩn bị 3,5 phút, trả lời 2,5 phút mỗi câu"}]}}
};
/* Ôn lại khi dạng dưới 80%: dạng có trường `on` thì dẫn tới đó; không có thì dẫn về giáo trình của cấp (ONL).
   Link bài cụ thể ở trang chính: "../#bai/<mã cấp>/<số bài>" (mã cấp trang chính: 1 HSK1 · 2 HSK2 · 3 HSK3 · 4 HSK4 · 5 Mở rộng H4). */
const ONL={
 1:{t:"Giáo trình HSK1",href:"../#hoc/1"},
 2:{t:"Giáo trình HSK2",href:"../#hoc/2"},
 3:{t:"Giáo trình HSK3",href:"../#hoc/3"},
 4:{t:"Giáo trình HSK4",href:"../#hoc/4"},
 5:{t:"Ôn HSK5",href:"../on-hsk5/"},
 6:{t:"Luyện viết HSK6",href:"../luyen-viet-hsk6/"}};
/* Bài luyện đã có: gắn href vào dạng tương ứng (đường dẫn tính từ on-thi/) */
OT[5].sec[2][2][0].href="../on-hsk5/ta-tranh.html";
OT[5].sec[2][2][0].x="Đang có bản tả 1 tranh (đề cũ); bản 4 tranh sắp ra mắt · Cô chấm";
/* Thi thử full đề (tính giờ). Đề cũ dạng 2.0 ghi tag "Đề 2.0". k = khóa lưu điểm ct_ot_<cấp>_<k> (đề 3.0) */
const THI={
 1:[],2:[],3:[],4:[],
 5:[
  {t:"Thử thách HSK5 · Đề 5 (bản trọng tâm)",d:"Từ vựng cốt lõi, cấu trúc trọng tâm, viết câu 99 và 100.",href:"../thu-thach-hsk5-de5.html",tag:"Đề 2.0"},
  {t:"Thử thách HSK5 · Đề 4",d:"Flashcard 4 chủ đề, sắp xếp câu, viết đoạn văn.",href:"../thu-thach-hsk5-de4.html",tag:"Đề 2.0"},
  {t:"Thử thách HSK5 · Đề 3",d:"Điền từ vào đoạn văn, chọn câu đúng, đọc hiểu.",href:"../thu-thach-hsk5-de3.html",tag:"Đề 2.0"},
  {t:"Thử thách từ vựng HSK5 · Đề 1–2",d:"Cặp từ dễ nhầm, từ trọng tâm, test gõ phiên âm.",href:"../thu-thach-hsk5.html",tag:"Đề 2.0"}],
 6:[]
};
/* Điểm mới so với đề 2.0 + mẹo của cô cho từng cấp (hiện ở mục Tìm hiểu đề). Để trống thì không hiện. */
const TIP={
 1:`<p><b>Điểm cần nhớ:</b> chỉ có Nghe và Đọc, 40 câu trong khoảng 40 phút. Câu đọc có in phiên âm.</p>
<p><b>Mẹo:</b> phần nối tranh và nối câu (A–F) – làm câu chắc chắn trước, gạch đáp án đã dùng để loại trừ.</p>`,
 2:`<p><b>Điểm mới:</b> HSK2 có thêm phần <b>Viết 10 câu</b>: ghép bộ kiện thành chữ Hán (51–55) và nhìn phiên âm viết chữ Hán (56–60).</p>
<p><b>Mẹo:</b> ôn chữ Hán theo bộ thủ (亻、氵、口、讠…) và tập viết tay các từ hay gặp, không chỉ nhận mặt chữ.</p>`,
 3:`<p><b>Điểm mới:</b> 70 câu (Nghe 30 – Đọc 30 – Viết 10), khoảng 83 phút. Viết có <b>5 câu nhìn tranh đặt câu</b> (66–70) giống viết HSK4 cũ – khó nhất trong đề.</p>
<p><b>Mẹo đặt câu:</b> câu đủ chủ ngữ – vị ngữ, thêm thời gian/địa điểm cho tự nhiên (她<u>每周末都</u>去打羽毛球). Chỉ dùng từ và cấu trúc mình chắc chắn viết đúng.</p>`,
 4:`<p><b>Điểm mới:</b> 70 câu, khoảng 85 phút. Bỏ phán đoán đúng sai (Nghe) và sắp xếp câu (Đọc, Viết). Thêm <b>điền vế câu vào đoạn văn</b> (58–64) và <b>viết đoạn văn ≥ 80 chữ</b> (câu 70).</p>
<p><b>Mẹo điền vế câu:</b> đọc lướt cả đoạn trước, rồi dựa vào từ nối và logic câu trước – câu sau (而且、不光、而…).</p>
<p><b>Câu 70 – 6 bước:</b> ① đọc đề, gạch chân động từ yêu cầu (介绍、谈谈、说说) và phạm vi (一次、一位、好处和坏处) ② lập dàn ý 2 phút ③ mở bài 1–2 câu trả lời thẳng vào đề ④ thân bài 2–3 ý, mỗi ý có ví dụ cụ thể, nối bằng 首先…其次…、因为…所以…、虽然…但是… ⑤ kết bài 1 câu quay lại ý mở bài ⑥ kiểm tra 3 phút: đủ 80 chữ (nên 100–140), không viết pinyin, đúng 的/得/地 và dấu câu tiếng Trung.</p>
<p><b>Lỗi hay gặp của học viên Việt:</b> đặt trạng ngữ sau động từ (✗ 我学习汉语在大学 → ✓ 我在大学学习汉语); lặp chủ ngữ liên tục (我起床。我吃饭。); đề hỏi "một lần" nhưng kể chung chung.</p>`,
 5:`<p><b>Điểm mới:</b> 72 câu, khoảng 110 phút. Đọc thêm dạng <b>sắp xếp đoạn A–E thành bài</b> (46–55). Viết còn 2 bài: <b>4 tranh ≥ 100 chữ</b> và <b>bài nêu trải nghiệm/quan điểm ≥ 200 chữ</b>.</p>
<p><b>Mẹo sắp xếp đoạn:</b> tìm đoạn mở (giới thiệu nhân vật, bối cảnh), rồi lần theo thời gian, đại từ (他、这…) và quan hệ nhân – quả.</p>`,
 6:`<p><b>Điểm mới:</b> 82 câu, khoảng 125 phút. Bỏ dạng tìm câu sai (找病句). Viết thành 2 bài: <b>văn bản thực dụng ≥ 150 chữ</b> (thông báo, thư, tin đăng) và <b>nghị luận ≥ 300 chữ</b>.</p>
<p><b>Mẹo:</b> phần Nghe dùng nhiều chủ đề thời sự Trung Quốc (thể thao, giáo dục, phim ảnh – du lịch) → nên đọc tin tức tiếng Trung hằng tuần để quen từ mới.</p>`
};
