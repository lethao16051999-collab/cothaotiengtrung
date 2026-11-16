# Bản nguồn Ngữ pháp HSK2 dạng mới (16/11/2026)
Cùng khung với Ngữ pháp HSK1 (huong-dan/np-nguon), căn cứ bảng "Bang-dien-loi-sai-ngu-phap-HSK2.xlsx" cô Thảo điền.
- `src/bNN.js`: nội dung từng bài (chỉ chữ Hán + tiếng Việt). Định dạng giống HSK1 (xem đầu huong-dan/np-nguon/compile.js).
  Dạng drill mới của HSK2 (Ghép vế, Chọn hướng 来/去, Đổi câu 了→是……的, 比→没有) dùng dạng "ki" + nhãn riêng ở ô thứ 7.
- Sinh file trang: `npm i pinyin-pro` → `node vocab.js` (vocab.json từ data/hsk1 + data/hsk2) → `node compile.js [số bài]` → ghi data/hsk2/npNN.js, báo chữ ngoài phạm vi (từ HSK1 + HSK2 đến bài đó).
- Sau khi sinh: tăng `v` trong NAP[2] (data/hsk2/index.js) và `?v=` của data/hsk2/index.js trong index.html.
- Không commit node_modules / vocab.json.
