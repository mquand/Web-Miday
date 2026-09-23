/**
 * ===============================================================================
 * 💖 TỆP CẤU HÌNH THÔNG TIN TÌNH YÊU CỦA HAI BẠN (COUPLE CONFIGURATION) 💖
 * ===============================================================================
 * Bạn có thể dễ dàng chỉnh sửa toàn bộ nội dung của trang web tại tệp này:
 * - Tên của hai bạn, biệt danh, ảnh đại diện, ngày bắt đầu yêu
 * - Câu châm ngôn tình yêu
 * - Danh sách sự kiện đếm ngược, cột mốc hành trình, kho ảnh kỷ niệm
 * - Hòm thư tình, danh sách điều ước cùng nhau thực hiện
 * - Mật mã mở hộp bí mật (Secret Vault)
 * ===============================================================================
 */

// Đổi số phiên bản này mỗi khi bạn muốn web xóa cache cũ và nhận ngay cấu hình mới
export const CONFIG_VERSION = "1.0.3";

/* -------------------------------------------------------------------------------
   1. THÔNG TIN CẶP ĐÔI (COUPLE PROFILE)
------------------------------------------------------------------------------- */
export const COUPLE_CONFIG = {
  // Thông tin Chàng
  boyName: "Minh Quân",
  boyNickname: "Chàng trai của em",
  boyAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",

  // Thông tin Nàng
  girlName: "Chase Miee",
  girlNickname: "Cô bé của anh",
  girlAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",

  // Ngày bắt đầu yêu nhau (Định dạng: YYYY-MM-DD)
  startDate: "2025-02-10",

  // Câu nói / Châm ngôn tình yêu của hai bạn
  quote: "Mỗi ngày trôi qua, anh lại thấy yêu em nhiều hơn ngày hôm qua và ít hơn ngày mai.",

  // Tiêu đề câu chuyện
  loveStoryTitle: "Câu chuyện tình yêu của chúng mình",
};

/* -------------------------------------------------------------------------------
   2. ĐẾM NGƯỢC CÁC SỰ KIỆN SẮP TỚI (UPCOMING COUNTDOWN)
------------------------------------------------------------------------------- */
export const COUNTDOWN_CONFIG = [
  {
    id: 1,
    title: "Kỷ Niệm 2 Năm Yêu Nhau",
    date: "2027-02-10T00:00:00",
    icon: "🥂",
    note: "Cột mốc 730 ngày đong đầy yêu thương",
  },
  {
    id: 2,
    title: "Sinh Nhật Chase Miee",
    date: "2026-11-20T00:00:00",
    icon: "🎂",
    note: "Ngày đặc biệt của cô công chúa nhỏ",
  },
  {
    id: 3,
    title: "Sinh Nhật Minh Quân",
    date: "2026-10-15T00:00:00",
    icon: "🎁",
    note: "Ngày sinh chàng trai ấm áp của em",
  },
  {
    id: 4,
    title: "Chuyến Du Lịch Đón Giáng Sinh",
    date: "2026-12-24T00:00:00",
    icon: "✈️",
    note: "Cùng nhau đón một mùa đông tuyết trắng",
  },
];

/* -------------------------------------------------------------------------------
   3. DÒNG THỜI GIAN CÁC CỘT MỐC ĐÁNG NHỚ (LOVE STORY TIMELINE)
------------------------------------------------------------------------------- */
export const TIMELINE_CONFIG = [
  {
    id: 1,
    date: "2025-02-10",
    title: "Lần Đầu Tiên Gặp Gỡ",
    category: "Gặp gỡ",
    location: "Quán Cà Phê The Muse, Hà Nội",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    description: "Một buổi chiều đông se lạnh, ánh mắt chúng mình vô tình chạm nhau bên khung cửa sổ. Nụ cười rạng rỡ của em hôm ấy đã sưởi ấm cả một mùa đông trong lòng anh.",
  },
  {
    id: 2,
    date: "2025-02-14",
    title: "Chính Thức Ngỏ Lời Yêu",
    category: "Tỏ tình",
    location: "Cầu Ánh Sao, Hồ Bán Nguyệt",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
    description: "Dưới bầu trời lấp lánh ánh đèn cùng bó hoa hồng đỏ thắm, anh đã lấy hết dũng khí nắm chặt tay em và nói: 'Làm người yêu anh nhé!'. Khoảnh khắc em gật đầu, thế giới xung quanh như bừng sáng.",
  },
  {
    id: 3,
    date: "2025-05-01",
    title: "Chuyến Đi Đà Lạt Đầu Tiên",
    category: "Du lịch",
    location: "Đà Lạt Mộng Mơ",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Cùng nhau ngồi trên chiếc xe máy vi vu qua những con dốc mờ sương, uống ly sữa đậu nành nóng hổi giữa tiết trời se lạnh và ngắm hoàng hôn buông xuống đồi thông.",
  },
  {
    id: 4,
    date: "2025-10-20",
    title: "Sinh Nhật Đáng Nhớ Cùng Nhau",
    category: "Kỷ niệm",
    location: "Góc ban công nhỏ của chúng mình",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80",
    description: "Chiếc bánh kem tự tay chuẩn bị tuy không hoàn hảo nhưng chứa đựng trọn vẹn sự chân thành. Điều ước lúc thổi nến chỉ giản đơn là được bên nhau thật lâu.",
  },
  {
    id: 5,
    date: "2026-02-14",
    title: "Tròn 1 Năm Yêu Nhau",
    category: "Cột mốc",
    location: "Bữa tối ấm cúng bên sông",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
    description: "365 ngày với vô vàn cung bậc cảm xúc, có những nụ cười rạng rỡ và cả những lúc giận hờn, nhưng sau tất cả là sự thấu hiểu và gắn kết bền chặt hơn mỗi ngày.",
  },
];

/* -------------------------------------------------------------------------------
   4. BẢN ĐỒ DẤU CHÂN KỶ NIỆM (ĐÃ LƯỢC BỎ KHỎI GIAO DIỆN CHÍNH DO ĐÃ CÓ CỘT MỐC)
   * Lưu ý: Phần Cột Mốc Tình Yêu (#journey) đã có đầy đủ địa điểm, ảnh & câu chuyện
------------------------------------------------------------------------------- */
export const LOVE_MAP_CONFIG = [
  {
    id: 1,
    city: "Hà Nội",
    title: "Nơi Tình Yêu Bắt Đầu",
    date: "10/02/2025",
    coords: { x: 48, y: 16 },
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    story: "Những con phố cổ thân quen, quán trà nhỏ nơi hai ánh mắt lần đầu chạm nhau và lời ngỏ lời yêu chân thành dưới ánh đèn đường.",
  },
  {
    id: 2,
    city: "Đà Nẵng - Hội An",
    title: "Đêm Hoa Đăng Lung Linh",
    date: "02/09/2025",
    coords: { x: 58, y: 48 },
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80",
    story: "Cùng nhau thả chiếc đèn hoa đăng trôi theo dòng sông Hoài, thầm ước cho hai đứa mãi luôn bên nhau bình yên như thế này.",
  },
  {
    id: 3,
    city: "Đà Lạt",
    title: "Thành Phố Mộng Mơ",
    date: "01/05/2025",
    coords: { x: 55, y: 72 },
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    story: "Chuyến vi vu xe máy đầu tiên, đi qua những dốc thông mù sương và uống ly sữa đậu nành nóng hổi xua tan giá rét.",
  },
  {
    id: 4,
    city: "Phú Quốc",
    title: "Hoàng Hôn Nhuộm Vàng Biển",
    date: "30/04/2025",
    coords: { x: 38, y: 88 },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    story: "Cùng nhau ngắm ánh hoàng hôn đỏ rực buông xuống bãi cát trắng, tiếng sóng vỗ rì rào như lời thì thầm ngọt ngào.",
  },
];

/* -------------------------------------------------------------------------------
   5. KHO ẢNH KỶ NIỆM (SWEET MOMENTS GALLERY & VAULT)
------------------------------------------------------------------------------- */
export const GALLERY_CONFIG = [
  {
    id: 1,
    title: "Nụ cười tỏa nắng",
    category: "Hẹn hò",
    date: "15/03/2025",
    likes: 58,
    url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    caption: "Bắt trọn khoảnh khắc Chase Miee cười tươi như hoa trong buổi hẹn hò cuối tuần bên hồ Tây.",
  },
  {
    id: 2,
    title: "Hoàng hôn bên bờ biển",
    category: "Du lịch",
    date: "30/04/2025",
    likes: 85,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    caption: "Ánh hoàng hôn buông xuống nhuộm vàng bãi cát và bóng hình hai đứa nắm tay nhau thật chặt.",
  },
  {
    id: 3,
    title: "Bó hoa ngày lễ tình nhân",
    category: "Kỷ niệm",
    date: "14/02/2025",
    likes: 92,
    url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80",
    caption: "Bó hoa đầu tiên anh tặng kèm lá thiệp viết tay ngập tràn tình cảm ngay sau ngày hai ta chính thức bên nhau.",
  },
  {
    id: 4,
    title: "Góc cà phê quen",
    category: "Đời thường",
    date: "12/07/2025",
    likes: 44,
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    caption: "Những sáng Chủ Nhật bình yên ngồi đọc sách và nhấp từng ngụm latte ấm áp bên em.",
  },
  {
    id: 5,
    title: "Đồi thông lộng gió",
    category: "Du lịch",
    date: "02/05/2025",
    likes: 97,
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    caption: "Không khí se lạnh của Đà Lạt, sương mù bảng lảng và chiếc áo len ấm đôi hai đứa mặc cùng nhau.",
  },
  {
    id: 6,
    title: "Bữa tối ấm cúng",
    category: "Đời thường",
    date: "20/10/2025",
    likes: 63,
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    caption: "Cùng nhau vào bếp nấu nướng, tuy hơi vụng về nhưng đồ ăn tự làm lúc nào cũng đong đầy yêu thương.",
  },
  {
    id: 7,
    title: "Nắm tay dưới cơn mưa rào",
    category: "Hẹn hò",
    date: "18/06/2025",
    likes: 112,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    caption: "Cơn mưa rào bất chợt của mùa hạ, chung một chiếc ô nhỏ và bàn tay chẳng nỡ buông ra.",
  },
  {
    id: 8,
    title: "Chiều dạo phố lá vàng",
    category: "Hẹn hò",
    date: "22/09/2025",
    likes: 76,
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    caption: "Mùa thu Hà Nội đẹp dịu dàng, những bước chân chậm rãi và nụ cười em làm tan biến mọi muộn phiền.",
  },
  {
    id: 9,
    title: "Sinh nhật bất ngờ của Chase Miee",
    category: "Kỷ niệm",
    date: "25/08/2025",
    likes: 128,
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    caption: "Chiếc bánh kem dâu tây nến lung linh và điều ước cho hai đứa sẽ cùng nhau đón thêm thật nhiều mùa sinh nhật.",
  },
  {
    id: 10,
    title: "Buổi picnic ngày nắng trong",
    category: "Đời thường",
    date: "15/11/2025",
    likes: 54,
    url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    caption: "Chiếc thảm caro trải dưới bãi cỏ xanh, gió hiu hiu thổi và những giai điệu acoustic êm đềm.",
  },
];

/* -------------------------------------------------------------------------------
   6. VÒNG QUAY ĂN GÌ & ĐI ĐÂU (ĐÃ LƯỢC BỎ KHỎI GIAO DIỆN CHÍNH THEO YÊU CẦU)
------------------------------------------------------------------------------- */
export const WHEEL_CONFIG = {
  foods: [
    "Lẩu Haidilao",
    "Nướng Hàn Quốc BBQ",
    "Sushi & Sashimi Nhật",
    "Bún Bò Huế & Trà Sữa",
    "Pizza & Mỳ Ý",
    "Cùng nhau nấu tại nhà",
    "Gà Rán Giòn Rụm",
    "Phở Bò & Cà Phê Trứng",
  ],
  dates: [
    "Đi xem phim rạp & ăn bắp",
    "Cà phê rooftop ngắm hoàng hôn",
    "Lượn phố hồ Tây hóng gió",
    "Đi dạo công viên nắm tay",
    "Đi bảo tàng & chụp ảnh đôi",
    "Cùng xem phim chill tại nhà",
    "Đi dạo phố mua sắm",
    "Đi ăn vặt đêm vỉa hè",
  ],
};

/* -------------------------------------------------------------------------------
   7. HỘP THƯ TÌNH CẢM (LOVE LETTERS)
------------------------------------------------------------------------------- */
export const LETTERS_CONFIG = [
  {
    id: 1,
    from: "Minh Quân",
    to: "Chase Miee",
    title: "Gửi người đặc biệt nhất cuộc đời anh",
    date: "14/02/2025",
    tag: "Thư Kỷ Niệm",
    content: "Em à, cảm ơn em vì đã bước vào cuộc sống của anh và mang theo muôn vàn màu sắc rực rỡ. Mỗi sáng thức dậy, nghĩ về nụ cười của em là động lực lớn nhất để anh phấn đấu. Anh hứa sẽ luôn lắng nghe, kiên nhẫn và yêu thương em nhiều hơn mỗi ngày.",
  },
  {
    id: 2,
    from: "Chase Miee",
    to: "Minh Quân",
    title: "Cảm ơn vì đã luôn dịu dàng với em",
    date: "01/01/2025",
    tag: "Thư Năm Mới",
    content: "Gửi anh, chàng trai ấm áp của em. Cảm ơn anh vì những lần nhẫn nại dỗ dành khi em dỗi hờn vu vơ, cảm ơn vì những cái ôm thật chặt xua tan mọi mỏi mệt. Năm mới và nhiều năm sau nữa, em chỉ mong chúng mình mãi nắm chặt tay nhau như bây giờ nhé!",
  },
  {
    id: 3,
    from: "Minh Quân",
    to: "Chase Miee",
    title: "Một ngày mưa nhớ em rất nhiều",
    date: "18/08/2025",
    tag: "Nhắn Nhủ",
    content: "Chiều nay thành phố đổ một cơn mưa rào bất chợt. Ngồi nhìn từng giọt mưa rơi, anh lại nhớ những lúc hai đứa trú mưa dưới mái hiên nhỏ, cùng nhau uống chung một ly trà sữa. Giữ ấm nhé cô bé, lát tan làm anh sẽ qua đón em đi ăn món em thích.",
  },
];

/* -------------------------------------------------------------------------------
   8. DANH SÁCH NHỮNG ĐIỀU CÙNG LÀM (COUPLE BUCKET LIST)
------------------------------------------------------------------------------- */
export const BUCKET_LIST_CONFIG = [
  { id: 1, text: "Cùng nhau ngắm bình minh trên bờ biển", completed: true, completedDate: "30/04/2025", category: "Du lịch" },
  { id: 2, text: "Nấu một bữa tối lãng mạn dưới ánh nến tại nhà", completed: true, completedDate: "20/10/2025", category: "Đời thường" },
  { id: 3, text: "Cùng nhau đi du lịch Đà Lạt mùa hoa dã quỳ", completed: true, completedDate: "02/05/2025", category: "Du lịch" },
  { id: 4, text: "Nuôi chung một bé mèo/cún thật đáng yêu", completed: false, category: "Tương lai" },
  { id: 5, text: "Cùng đi xem concert âm nhạc của nghệ sĩ hai đứa yêu thích", completed: false, category: "Trải nghiệm" },
  { id: 6, text: "Cùng nhau có một chuyến du lịch nước ngoài", completed: false, category: "Du lịch" },
  { id: 7, text: "Cùng nắm tay bước vào lễ đường hôn lễ thiêng liêng 💍", completed: false, category: "Mãi mãi" },
];

/* -------------------------------------------------------------------------------
   9. HỘP BÍ MẬT & MẬT MÃ (SECRET LOVE VAULT)
------------------------------------------------------------------------------- */
export const SECRET_VAULT_CONFIG = {
  // Mật mã PIN 4 chữ số mặc định
  passcode: "1002",

  // Lời nhắn bí mật hiện ra khi nhập đúng mã
  secretMessage: "Chúc mừng em/anh đã mở khóa được chiếc hộp bí mật của hai đứa! 💖 Đây là nơi cất giữ những lời thì thầm chân thành nhất: Dù cuộc sống ngoài kia có xoay vần ra sao, Minh Quân vẫn luôn dành trọn vẹn sự yêu thương, chở che và đồng hành cùng Chase Miee mỗi ngày. Yêu em nhiều lắm!",

  // Các ghi chú bí mật
  secretItems: [
    {
      id: 1,
      title: "Lời Hứa Bí Mật",
      date: "10/02/2025",
      content: "Anh hứa sẽ không bao giờ để em phải rơi nước mắt một mình, luôn lắng nghe và ôm em thật chặt mỗi khi em thấy yếu lòng.",
    },
    {
      id: 2,
      title: "Khoảnh Khắc Đáng Yêu Nhất",
      date: "15/03/2025",
      content: "Lúc em giận dỗi nhưng nghe anh rủ đi ăn kem thì mắt lại sáng rực lên. Nụ cười ấy là điều tuyệt vời nhất trần đời!",
    },
  ],
};
