/* Dữ liệu trang Ôn thi HSK 3.0 (on-thi/). Sửa nội dung ở đây, không cần sửa index.html.
   Nguồn cấu trúc đề: "新版HSK（1-6级）考试结构与样题示例" (汉考国际, công bố 12/2025, áp dụng 2026);
   phần Nói HSK3–6 (口语) theo các bản tóm tắt đề mẫu – cần đối chiếu lại khi có đề mẫu nói chính thức.
   Mỗi cấp: n (số câu viết), t (phút), sec = [kỹ năng, phút, [dạng...]], noi = bài thi nói (HSK3–6).
   Mỗi dạng: k (mã, dùng làm khóa lưu tiến độ ct_ot_<cấp>_<k>), p (phần), c (câu số), d (mô tả), href ("" = Sắp ra mắt), x (ghi chú), chk (dạng chưa rõ, cần đối chiếu).
   Thi thử: mảng THI[cấp] {t, d, href, tag}. Ghi chú/mẹo của cô cho từng cấp: TIP[cấp]. */
const OT={
 1:{n:40,t:40,ten:"Sơ cấp 1",tu:300,sec:[
  ["Nghe",12,[
   {k:"n1",p:"Phần 1",c:"1–5",d:"Nghe cụm từ, chọn tranh đúng (A–C)"},
   {k:"n2",p:"Phần 2",c:"6–10",d:"Nghe câu hỏi, chọn câu trả lời"},
   {k:"n3",p:"Phần 3",c:"11–15",d:"Nghe hội thoại ngắn, chọn tranh / từ phù hợp (A–F)"},
   {k:"n4",p:"Phần 4",c:"16–20",d:"Nghe đoạn ngắn, trả lời câu hỏi (A–C)"}]],
  ["Đọc",20,[
   {k:"d1",p:"Phần 1",c:"21–25",d:"Nối câu với tranh (A–F)"},
   {k:"d2",p:"Phần 2",c:"26–30",d:"Nối câu hỏi với câu trả lời (A–F)"},
   {k:"d3",p:"Phần 3",c:"31–35",d:"Chọn từ điền vào chỗ trống (A–F)"},
   {k:"d4",p:"Phần 4",c:"36–40",d:"Đọc đoạn ngắn, chọn đáp án đúng (A–C)"}]]]},
 2:{n:60,t:60,ten:"Sơ cấp 2",tu:500,sec:[
  ["Nghe",17,[
   {k:"n1",p:"Phần 1",c:"1–5",d:"Nghe câu, chọn tranh đúng (A–C)"},
   {k:"n2",p:"Phần 2",c:"6–15",d:"Nghe hội thoại, chọn tranh phù hợp (A–F)"},
   {k:"n3",p:"Phần 3",c:"16–25",d:"Nghe hội thoại, trả lời câu hỏi (A–C)"}]],
  ["Đọc",25,[
   {k:"d1",p:"Phần 1",c:"26–30",d:"Nối câu với tranh (A–F)"},
   {k:"d2",p:"Phần 2",c:"31–35",d:"Chọn từ điền vào chỗ trống (A–F)"},
   {k:"d3",p:"Phần 3",c:"36–45",d:"Nối câu / hội thoại tương ứng (A–F)"},
   {k:"d4",p:"Phần 4",c:"46–50",d:"Đọc đoạn ngắn, trả lời câu ★ (A–C)"}]],
  ["Viết",10,[
   {k:"v1",p:"Phần 1",c:"51–55",d:"Viết phần 1 (dạng câu đang cập nhật theo đề mẫu)",chk:1},
   {k:"v2",p:"Phần 2",c:"56–60",d:"Viết chữ Hán theo phiên âm cho sẵn trong câu"}]]]},
 3:{n:70,t:83,ten:"Sơ cấp 3",tu:1000,sec:[
  ["Nghe",23,[
   {k:"n1",p:"Phần 1",c:"1–10",d:"Nghe hội thoại, chọn tranh phù hợp (A–F)"},
   {k:"n2",p:"Phần 2",c:"11–20",d:"Nghe hội thoại, trả lời câu hỏi (A–C)"},
   {k:"n3",p:"Phần 3",c:"21–30",d:"Nghe đoạn văn, trả lời câu hỏi (A–C)"}]],
  ["Đọc",30,[
   {k:"d1",p:"Phần 1",c:"31–40",d:"Nối câu với câu đáp / câu hỏi tương ứng (A–F)"},
   {k:"d2",p:"Phần 2",c:"41–50",d:"Chọn từ điền vào đoạn văn / hội thoại (A–F)"},
   {k:"d3",p:"Phần 3",c:"51–60",d:"Đọc hiểu đoạn văn, trả lời câu hỏi (A–C)"}]],
  ["Viết",20,[
   {k:"v1",p:"Phần 1",c:"61–65",d:"Viết chữ Hán theo phiên âm gợi ý"},
   {k:"v2",p:"Phần 2",c:"66–70",d:"Đặt câu với từ cho sẵn",x:"Máy chấm trước, cô chấm sau"}]]],
  noi:{t:15,cb:6,d:[
   {k:"o1",p:"Phần 1",c:"8 câu",d:"Nghe rồi nhắc lại (听后重复)"},
   {k:"o2",p:"Phần 2",c:"5 câu",d:"Nhìn tranh nói (看图说话)"},
   {k:"o3",p:"Phần 3",c:"2 câu",d:"Trả lời câu hỏi (回答问题)"}]}},
 4:{n:70,t:85,ten:"Trung cấp 1",tu:2000,sec:[
  ["Nghe",20,[
   {k:"n1",p:"Phần 1",c:"1–14",d:"Nghe hội thoại, trả lời câu hỏi (A–D)"},
   {k:"n2",p:"Phần 2",c:"15–32",d:"Nghe đoạn văn, trả lời 1–2 câu hỏi (A–D)"}]],
  ["Đọc",30,[
   {k:"d1",p:"Phần 1",c:"33–42",d:"Chọn từ điền vào câu / hội thoại"},
   {k:"d2",p:"Phần 2",c:"43–57",d:"Đọc hiểu, trả lời câu ★ (A–D)"},
   {k:"d3",p:"Phần 3",c:"58–64",d:"Chọn câu điền vào đoạn văn"}]],
  ["Viết",25,[
   {k:"v1",p:"Phần 1",c:"65–69",d:"Đặt câu với từ cho sẵn",x:"Máy chấm trước, cô chấm sau"},
   {k:"v2",p:"Phần 2",c:"70",d:"Viết đoạn văn ít nhất 80 chữ theo đề",x:"Cô chấm"}]]],
  noi:{t:20,cb:10,d:[
   {k:"o1",p:"Phần 1",c:"2 câu",d:"Nghe rồi kể lại (听后复述)"},
   {k:"o2",p:"Phần 2",c:"1 câu",d:"Nhìn tranh nói (看图说话)"},
   {k:"o3",p:"Phần 3",c:"2 câu",d:"Trả lời câu hỏi (回答问题)"}]}},
 5:{n:72,t:110,ten:"Trung cấp 2",tu:3600,sec:[
  ["Nghe",25,[
   {k:"n1",p:"Phần 1",c:"1–19",d:"Nghe hội thoại ngắn và dài, trả lời câu hỏi (A–D)"},
   {k:"n2",p:"Phần 2",c:"20–35",d:"Nghe đoạn văn, trả lời câu hỏi (A–D)"}]],
  ["Đọc",35,[
   {k:"d1",p:"Phần 1",c:"36–45",d:"Chọn từ điền vào đoạn văn (A–D)"},
   {k:"d2",p:"Phần 2",c:"46–55",d:"Sắp xếp các đoạn A–E thành bài hoàn chỉnh"},
   {k:"d3",p:"Phần 3",c:"56–70",d:"Đọc hiểu, trả lời câu hỏi (A–D)"}]],
  ["Viết",40,[
   {k:"v1",p:"Phần 1",c:"71",d:"Viết câu chuyện ít nhất 100 chữ theo 4 tranh",x:"Cô chấm"},
   {k:"v2",p:"Phần 2",c:"72",d:"Viết bài ít nhất 200 chữ theo đề",x:"Cô chấm"}]]],
  noi:{t:23,d:[
   {k:"o1",p:"Phần 1",c:"",d:"Nghe rồi kể lại (听后复述)"},
   {k:"o2",p:"Phần 2",c:"",d:"Nhìn tranh nói (看图说话)"},
   {k:"o3",p:"Phần 3",c:"",d:"Trả lời câu hỏi (回答问题)"}],x:"Tổng 5 câu; số câu từng phần cập nhật khi có đề mẫu nói"}},
 6:{n:82,t:125,ten:"Trung cấp 3",tu:5400,sec:[
  ["Nghe",30,[
   {k:"n1",p:"Phần 1",c:"1–8",d:"Nghe đoạn ngắn, chọn câu đúng với nội dung (A–D)"},
   {k:"n2",p:"Phần 2",c:"9–28",d:"Nghe đoạn văn, trả lời câu hỏi (A–D)"},
   {k:"n3",p:"Phần 3",c:"29–40",d:"Nghe phỏng vấn, trả lời câu hỏi (A–D)"}]],
  ["Đọc",40,[
   {k:"d1",p:"Phần 1",c:"41–50",d:"Chọn từ điền vào đoạn văn (A–D)"},
   {k:"d2",p:"Phần 2",c:"51–60",d:"Chọn câu điền vào đoạn văn (A–F)"},
   {k:"d3",p:"Phần 3",c:"61–80",d:"Đọc hiểu, trả lời câu hỏi (A–D)"}]],
  ["Viết",45,[
   {k:"v1",p:"Phần 1",c:"81",d:"Viết văn bản thực dụng ít nhất 150 chữ theo tình huống",x:"Cô chấm"},
   {k:"v2",p:"Phần 2",c:"82",d:"Viết bài nêu quan điểm ít nhất 300 chữ",x:"Cô chấm"}]]],
  noi:{t:23,d:[
   {k:"o1",p:"Phần 1",c:"",d:"Nghe rồi kể lại (听后复述)"},
   {k:"o2",p:"Phần 2",c:"",d:"Nhìn tranh nói (看图说话)"},
   {k:"o3",p:"Phần 3",c:"",d:"Trả lời câu hỏi (回答问题)"}],x:"Tổng 5 câu; số câu từng phần cập nhật khi có đề mẫu nói"}}
};
/* Bài luyện đã có: gắn href vào dạng tương ứng (đường dẫn tính từ on-thi/) */
OT[5].sec[2][2][0].href="../on-hsk5/ta-tranh.html";
OT[5].sec[2][2][0].x="Đang có bản tả 1 tranh (đề cũ); bản 4 tranh sắp ra mắt";
/* Thi thử full đề (tính giờ). Đề cũ dạng 2.0 ghi tag "Đề 2.0" */
const THI={
 1:[],2:[],3:[],4:[],
 5:[
  {t:"Thử thách HSK5 · Đề 5 (bản trọng tâm)",d:"Từ vựng cốt lõi, cấu trúc trọng tâm, viết câu 99 và 100.",href:"../thu-thach-hsk5-de5.html",tag:"Đề 2.0"},
  {t:"Thử thách HSK5 · Đề 4",d:"Flashcard 4 chủ đề, sắp xếp câu, viết đoạn văn.",href:"../thu-thach-hsk5-de4.html",tag:"Đề 2.0"},
  {t:"Thử thách HSK5 · Đề 3",d:"Điền từ vào đoạn văn, chọn câu đúng, đọc hiểu.",href:"../thu-thach-hsk5-de3.html",tag:"Đề 2.0"},
  {t:"Thử thách từ vựng HSK5 · Đề 1–2",d:"Cặp từ dễ nhầm, từ trọng tâm, test gõ phiên âm.",href:"../thu-thach-hsk5.html",tag:"Đề 2.0"}],
 6:[]
};
/* Mẹo / ghi chú của cô cho từng cấp (hiện ở mục Tìm hiểu đề). Để trống thì không hiện. */
const TIP={1:"",2:"",3:"",4:"",5:"",6:""};
