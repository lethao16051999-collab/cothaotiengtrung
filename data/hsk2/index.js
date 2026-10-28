/* ===== HSK2 · tên bài, nhân vật, danh sách file bài (nạp ngay khi mở trang). Mỗi bài nằm ở data/hsk2/bNN.js ===== */
const LT2=[
"她请我们吃了北京烤鸭|Chị ấy mời chúng tôi ăn vịt quay Bắc Kinh",
"还是打车去北大吧|Hay là bắt taxi đến Đại học Bắc Kinh đi",
"我想去西安旅游|Em muốn đi Tây An du lịch",
"你穿红色的很好看|Con mặc đồ màu đỏ rất đẹp",
"第一次去中国朋友家|Lần đầu đến thăm nhà bạn người Trung Quốc",
"小雪，生日快乐！|Chúc mừng sinh nhật Tiểu Tuyết!",
"他篮球打得很好|Bạn ấy chơi bóng rổ rất hay",
"虽然你忘了，但是我记得|Mặc dù em quên, nhưng anh vẫn nhớ",
"我去买杯奶茶|Em đi mua một cốc trà sữa",
"就要考试了|Sắp thi rồi",
"我最喜欢吃中国菜|Em thích ăn món Trung Quốc nhất",
"这里比北京冷多了|Ở đây lạnh hơn Bắc Kinh nhiều",
"我们爱上中文课|Chúng tôi yêu thích môn tiếng Trung Quốc",
"一个人过年多没意思啊|Một mình đón năm mới thì thật vô vị",
"我想再去一次中国|Em muốn đi Trung Quốc một lần nữa"];
Object.assign(SPN,{"白家月":["Bái Jiāyuè","Bạch Gia Nguyệt"],"安妮":["Ānnī","An Ni"],"王一雪":["Wáng Yīxuě","Vương Nhất Tuyết"],"陈天中":["Chén Tiānzhōng","Trần Thiên Trung"],"白家月、安妮":["Jiāyuè, Ānnī","Gia Nguyệt & An Ni"],"服务员":["fúwùyuán","Nhân viên"],"李先生":["Lǐ xiānsheng","Anh Lý"]});
Object.assign(SPN,{"刘明":["Liú Míng","Lưu Minh"],"刘小雪":["Liú Xiǎoxuě","Lưu Tiểu Tuyết"],"小王":["Xiǎo Wáng","Tiểu Vương"]});
Object.assign(SPN,{"刘爷爷":["Liú yéye","Ông Lưu"],"刘小明":["Liú Xiǎomíng","Lưu Tiểu Minh"]});
Object.assign(SPN,{"王一飞":["Wáng Yīfēi","Vương Nhất Phi"],"李文":["Lǐ Wén","Lý Văn"]});
Object.assign(SPN,{"杨同乐":["Yáng Tónglè","Dương Đồng Lạc"]});
const GPN="Ngữ pháp lấy từ mục Lớp học của Tiểu Ngữ (小语讲堂) trong sách, kèm lỗi người Việt hay mắc.";
const LD2={};
/* Danh sách file của cấp này (tải khi học viên mở HSK 2, js/kho.js). Thêm bài N: tạo data/hsk2/bNN.js, thêm N vào "bai", tăng "v". */
var NAP=window.NAP||{};NAP[2]={dir:"data/hsk2/",bai:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],them:["wg.js","ot.js"],ts:true,v:2};
