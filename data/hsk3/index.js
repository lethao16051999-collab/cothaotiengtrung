/* ===== HSK3 · tên bài, nhân vật, danh sách file bài (nạp ngay khi mở trang). Mỗi bài nằm ở data/hsk3/bNN.js ===== */
var LT3=[
"我们去机场接你们|Anh chị sẽ đến sân bay đón các em",
"你们想吃什么就点什么|Các em muốn ăn món gì thì gọi món đó",
"这个小区挺好的|Khu dân cư này khá tốt",
"这家宾馆跟别的都不一样|Khách sạn này không giống như những khách sạn khác",
"这样的照片才好看|Những bức ảnh như thế này mới đẹp",
"高铁上还可以点外卖|Trên tàu cao tốc vẫn có thể đặt đồ ăn giao tận nơi",
"那条裙子比短裤更好看|Chiếc váy đó đẹp hơn quần soóc",
"今天我出院了|Hôm nay tôi xuất viện rồi",
"打不好没关系|Chơi không tốt cũng không sao",
"你明天再把书还给我|Ngày mai em trả lại sách cho cô nhé",
"看来我没办法解决这个问题|Xem ra em không thể giải quyết vấn đề này",
"这个季节天气变化很快|Thời tiết thay đổi rất nhanh vào mùa này",
"我的新邻居来自英国|Hàng xóm mới của tôi đến từ Vương quốc Anh",
"这本书被别人借走了|Quyển sách này đã bị người khác mượn rồi",
"我是半个南京人|Em cũng là một nửa người Nam Kinh",
"我听说有的熊猫出国了|Con nghe nói có một số con gấu trúc đã ra nước ngoài",
"我要多向认真的人学习|Mình sẽ học hỏi từ những người cẩn thận",
"我学会了包饺子|Cháu đã học được cách gói sủi cảo"];
Object.assign(SPN,{"刘明":["Liú Míng","Lưu Minh"],"王一雪":["Wáng Yīxuě","Vương Nhất Tuyết"],"白家月":["Bái Jiāyuè","Bạch Gia Nguyệt"],"李文":["Lǐ Wén","Lý Văn"],"服务员":["fúwùyuán","Nhân viên"],"王先生":["Wáng xiānsheng","Anh Vương"],"同事":["tóngshì","Đồng nghiệp"],"杨同乐":["Yáng Tónglè","Dương Đồng Lạc"],"王一飞":["Wáng Yīfēi","Vương Nhất Phi"],"小李":["Xiǎo Lǐ","Tiểu Lý"],"店员":["diànyuán","Nhân viên bán hàng"],"陈天中":["Chén Tiānzhōng","Trần Thiên Trung"],"安妮":["Ānnī","An Ni"]});
var LD3={};
/* Danh sách file của cấp này (tải khi học viên mở HSK 3, js/kho.js). Thêm bài N: tạo data/hsk3/bNN.js, thêm N vào "bai", tăng "v". */
var NAP=window.NAP||{};NAP[3]={dir:"data/hsk3/",bai:[1,2,3,4,5,6,7,8],them:["wg.js"],ts:true,v:3};
