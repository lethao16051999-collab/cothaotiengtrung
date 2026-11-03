# Bản nguồn Ngữ pháp HSK1 dạng mới
- `src/bNN.js`: nội dung từng bài (chỉ chữ Hán + tiếng Việt). Định dạng xem đầu `compile.js`.
- Sinh file trang: `npm i pinyin-pro` → `node vocab.js` (tạo vocab.json từ data/hsk1/bNN.js) → `node compile.js [số bài]` → ghi data/hsk1/npNN.js, báo chữ ngoài phạm vi từ vựng.
- Sau khi sinh: tăng `v` trong NAP[1] (data/hsk1/index.js) và `?v=` trong index.html.
