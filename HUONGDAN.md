# HƯỚNG DẪN MỞ VÀ CHẠY ỨNG DỤNG "CẨM NANG TÂN SINH VIÊN"

Chào mừng bạn đến với dự án **"Cẩm nang Tân Sinh viên"** - Sản phẩm dự thi Thử thách Vibe Coding (Bộ GD&ĐT & ĐH RMIT Việt Nam)!

---

## 📁 1. CẤU TRÚC MÃ NGUỒN ĐÃ ĐƯỢC TÁCH FILE

Dự án được phân tách cấu trúc mã nguồn sạch sẽ, dễ bảo trì và mở rộng:

```
cam_nang_tan_sinh_vien/
├── index.html              # Trang chủ HTML5 chuẩn UI/UX Responsive
├── css/
│   └── style.css           # File CSS tùy chỉnh, font chữ, hiệu ứng animation
├── js/
│   ├── data.js             # Dữ liệu cẩm nang bài viết, checklist, FAQ và các trường
│   └── app.js              # Mã nguồn xử lý LocalStorage, 3 công cụ & tương tác
├── images/                 # Thư mục chứa hình ảnh 100% Sinh viên Việt Nam chân thực
│   ├── hero_hoi_truong.png # Sinh viên Việt Nam hào hứng trong hội trường đại học lớn
│   ├── ngay_hoi_sinh_vien.png # Ngày hội CLB & tình nguyện sinh viên Việt Nam (BK)
│   ├── thu_vien_sinh_vien.png # Nhóm sinh viên Việt Nam cùng thảo luận bài trong thư viện
│   └── khuon_vien_dai_hoc.png # Sinh viên Việt Nam trao đổi bài trên đường khuôn viên trường
└── HUONGDAN.md             # File hướng dẫn chạy & nộp bài
```

---

## 🚀 2. HƯỚNG DẪN MỞ VÀ CHẠY TRỰC TIẾP TRÊN MÁY TÍNH

Ứng dụng chạy theo kiến trúc **FRONTEND-ONLY (100% Client-side)**.
**Không cần cài đặt Node.js, Python, Server hay Backend phức tạp.**

### Các bước chạy:
1. Giải nén tệp `cam_nang_tan_sinh_vien.zip`.
2. Mở thư mục `cam_nang_tan_sinh_vien`.
3. Nhấp đúp chuột vào tệp **`index.html`** để mở trực tiếp bằng bất kỳ trình duyệt web nào (Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari,...).
4. Website sẽ khởi chạy ngay lập tức với đầy đủ hình ảnh sinh viên Việt Nam, biểu tượng icon và 3 công cụ tương tác.

---

## 🌐 3. HƯỚNG DẪN TRIỂN KHAI MIỄN PHÍ TRÊN CLOUDFLARE PAGES HOẶC GITHUB PAGES

Để lấy link URL công khai điền vào **Mục 7 trên Google Forms**:

### Phương án A: Cloudflare Pages (Nhanh nhất - 1 phút)
1. Truy cập [dash.cloudflare.com](https://dash.cloudflare.com/) và đăng nhập.
2. Chọn menu **Workers & Pages** -> Chọn tab **Pages** -> Bấm **Create a project**.
3. Chọn **Upload assets** (Tải thư mục lên).
4. Kéo thả nguyên thư mục `cam_nang_tan_sinh_vien` vào khung tải lên.
5. Bấm **Deploy**. Bạn sẽ nhận ngay đường link URL công khai (VD: `https://cam-nang-tan-sinh-vien.pages.dev`).

### Phương án B: GitHub Pages
1. Tạo một repository mới trên GitHub (Public).
2. Tải toàn bộ các file trong thư mục `cam_nang_tan_sinh_vien` lên repository.
3. Vào **Settings** -> **Pages** -> Chọn Branch `main` (hoặc `master`) -> Chọn thư mục `/ (root)` -> Bấm **Save**.
4. Sau 1 phút, nhận link tại `https://username.github.io/repo-name`.

---

## 🧪 4. BẢNG KIỂM THỬ TÍNH NĂNG (DÀNH CHO BGM)

| STT | Tính năng | Thao tác kiểm thử |
|---|---|---|
| 1 | **Hình ảnh Sinh viên VN** | Quan sát Banner chính và các thẻ bài viết cẩm nang $ightarrow$ Tất cả là ảnh chân thực sinh viên Việt Nam tại trường đại học. |
| 2 | **Checklist Nhập Học** | Tick chọn giấy tờ $ightarrow$ Thanh % tiến độ nhảy realtime. Thử nhập việc mới hoặc bấm "Đặt lại". F5 lại trang để kiểm tra dữ liệu vẫn được lưu qua `LocalStorage`. |
| 3 | **Tính Chi phí Sinh hoạt** | Thay đổi số tiền ngân sách hoặc các khoản chi trọ/ăn uống $ightarrow$ Hộp cảnh báo tự đổi màu (Green/Amber/Red) kèm phân tích tài chính. |
| 4 | **Sổ Task & Deadline** | Nhập tên môn học + chọn ngày deadline + chọn độ ưu tiên $ightarrow$ Lưu task. Thử bấm tick hoàn thành hoặc xóa task. |
| 5 | **Bộ Cẩm Nang Tri Thức** | Click từng tab danh mục để lọc bài viết. Click "Đọc chi tiết" để hiển thị Popup Modal xem nội dung đầy đủ kèm ảnh minh họa. |
| 6 | **Tìm kiếm toàn trang** | Nhấn phím tắt `Ctrl + K` hoặc `Cmd + K` (hoặc click nút Tìm kiếm) $ightarrow$ Gõ từ khóa để lọc bài viết & FAQ. |

Chúc dự án đạt kết quả cao nhất trong Thử thách Vibe Coding!
