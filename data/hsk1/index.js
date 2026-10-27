/* ===== HSK1 · tên bài, nhân vật, danh sách file bài (nạp ngay khi mở trang) =====
   Dữ liệu từng bài nằm ở data/hsk1/bNN.js, chỉ tải khi học viên mở HSK 1 (js/kho.js). ===== */
const LT1=["AI小语，你好！|Xin chào AI Tiểu Ngữ!","我叫李文|Mình tên là Lý Văn","我是中国人|Mình là người Trung Quốc","我有两个孩子|Chị có hai con","今天我休息|Hôm nay anh được nghỉ","你的手机号是多少？|Số điện thoại của bạn là bao nhiêu?","我晚上六点半下班|Em tan làm lúc 6 rưỡi tối","我爸爸也在医院工作|Bố em cũng làm việc ở bệnh viện","我明天上午在学校学习|Sáng mai mình học ở trường","这儿的苹果真便宜！|Táo ở đây rẻ thật!","我读大学呢|Em đang học đại học","昨天下雪了|Hôm qua tuyết rơi rồi","请给我一杯茶|Cho tôi một cốc trà","我看了一个电影|Mình đã xem một bộ phim","大兴机场见！|Hẹn gặp ở sân bay Đại Hưng!"];
/* File nghe giáo trình: điền link/asset theo mã bài, ví dụ "1-1":"…mp3". Chưa có thì dùng giọng đọc máy. */
const AUD={};
const SPN={"王一飞":["Wáng Yīfēi","Vương Nhất Phi"],"小语":["Xiǎoyǔ","Tiểu Ngữ"],"学生们":["xuéshengmen","Học sinh"]};
const LD1={};
/* Vai dùng chung cho mọi cấp (trước đây khai trong file bài HSK1; HSK2 cũng dùng 我, 王老师, 医生) */
Object.assign(SPN,{"我":["wǒ","Bạn"],"王老师":["Wáng lǎoshī","Cô Vương"],"同学":["tóngxué","Bạn học"],"胡医生":["Hú yīshēng","Bác sĩ Hồ"],"A":["A","Người A"],"B":["B","Người B"],"医生":["yīshēng","Bác sĩ"],"病人":["bìngrén","Bệnh nhân"]});
/* Danh sách file của cấp này. Thêm bài N: tạo data/hsk1/bNN.js (số bài 2 chữ số, vd b04.js), thêm N vào "bai", tăng "v". */
var NAP=window.NAP||{};NAP[1]={dir:"data/hsk1/",bai:[1,2,3,8,9,11,12,14],them:["gp.js","wg.js"],ts:true,v:1};
