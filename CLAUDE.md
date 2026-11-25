# Trang web cô Thảo tiếng Trung — quy tắc cho Claude

## Trang khóa mật khẩu (từ 25/11/2026)
Các thư mục sau chỉ được chứa bản **đã mã hóa**: `on-thi-hsk6/`, `luyen-viet-hsk6/`.

- Thêm hoặc sửa một trang trong các thư mục này: làm bản gốc ở ngoài repo, rồi khóa bằng
  `KHOA_MK='<mật khẩu>' python3 tools/khoa-trang.py <file-gốc.html> <đích-trong-repo.html>`.
- Mật khẩu KHÔNG ghi vào repo, commit, file hay log. Hỏi cô Thảo mật khẩu khi cần.
- Tuyệt đối không commit bản chưa khóa vào các thư mục trên (lịch sử git công khai).

## PPT giáo trình (`ppt/`) — chỉ học viên có mã
`ppt/` KHÔNG mã hóa. Mỗi file slide phải có đoạn script chặn ngay sau thẻ `<head>` (chép từ một file có sẵn trong `ppt/`): chưa có mã học viên (`ct_trk_me`) thì chuyển về `../#ma`. Nút PPT trên trang chủ (`js/ppt.js`) cũng đòi mã trước khi mở.
- Muốn sửa một trang đã khóa: cần file gốc; nếu không có, giải mã bằng mật khẩu (thuật toán trong `tools/khoa-trang.py`: base64 → salt 16 byte, iv 12 byte, AES-256-GCM, PBKDF2-SHA256 250.000 vòng).
