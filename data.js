/* DỮ LIỆU BAN ĐẦU CHO CẨM NANG TÂN SINH VIÊN */

// Checklist Mặc Định (3 Giai Đoạn)
const DEFAULT_CHECKLIST = [
    { id: 'c1', text: 'Giấy báo nhập học (Bản gốc + Bản sao công chứng)', category: 'truoc', completed: false },
    { id: 'c2', text: 'Bằng tốt nghiệp THPT hoặc Giấy chứng nhận tốt nghiệp tạm thời', category: 'truoc', completed: false },
    { id: 'c3', text: 'Học bạ THPT (Bản sao công chứng 2-3 bản)', category: 'truoc', completed: false },
    { id: 'c4', text: 'Căn cước công dân (CCCD) công chứng (mỗi loại 3-5 bản)', category: 'truoc', completed: false },
    { id: 'c5', text: 'Ảnh thẻ 3x4 và 4x6 (Mỗi loại 6-8 ảnh nền trắng)', category: 'truoc', completed: false },
    { id: 'c6', text: 'Giấy khai sinh (Bản sao trích lục có dấu đỏ)', category: 'truoc', completed: false },
    { id: 'c7', text: 'Sổ đoàn viên hoặc Hồ sơ chuyển sinh hoạt Đảng (nếu có)', category: 'ngay', completed: false },
    { id: 'c8', text: 'Giấy đăng ký nghĩa vụ quân sự (đối với nam sinh viên)', category: 'ngay', completed: false },
    { id: 'c9', text: 'Thanh toán học phí tạm thu học kỳ I qua chuyển khoản/tiền mặt', category: 'ngay', completed: false },
    { id: 'c10', text: 'Đăng ký KTX hoặc ký hợp đồng thuê phòng trọ sinh viên', category: 'tuan', completed: false },
    { id: 'c11', text: 'Kích hoạt Email sinh viên (.edu.vn) & Nhận tài khoản Cổng học vụ', category: 'tuan', completed: false },
    { id: 'c12', text: 'Khám sức khỏe đầu khóa & Đăng ký Bảo hiểm y tế bắt buộc', category: 'tuan', completed: false }
];

// Danh sách Bài viết Cẩm nang Tri thức
const ARTICLES_DATA = [
    {
        id: 'art-1',
        category: 'hocvu',
        categoryLabel: 'Học vụ & Tín chỉ',
        title: 'Hệ thống Đào tạo theo Tín chỉ là gì? Cách tính GPA & CPA',
        summary: 'Hiểu rõ khái niệm Tín chỉ, Lớp học phần, Học kỳ hè và công thức tính điểm trung bình tích lũy GPA.',
        image: 'images/thu_vien_sinh_vien.png',
        content: `
            <p>Đào tạo theo tín chỉ là phương thức đào tạo đại học phổ biến tại Việt Nam. Một tín chỉ thường tương đương 15 tiết lý thuyết trên lớp hoặc 30-45 tiết thực hành phòng thí nghiệm.</p>
            <h4 class="font-bold text-slate-900 mt-4 mb-2">Các thuật ngữ học vụ cốt lõi:</h4>
            <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li><b>Học phần bắt buộc:</b> Môn học sinh viên bắt buộc phải tích lũy để đủ điều kiện tốt nghiệp.</li>
                <li><b>Học phần tự chọn:</b> Môn học sinh viên lựa chọn theo định hướng chuyên ngành cá nhân.</li>
                <li><b>GPA (Grade Point Average):</b> Điểm trung bình học tập của riêng một học kỳ.</li>
                <li><b>CPA (Cumulative Grade Point Average):</b> Điểm trung bình tích lũy của toàn bộ các học kỳ từ năm nhất.</li>
            </ul>
            <p class="mt-3">Thang điểm đại học thường dùng hệ điểm 4 (A=4, B=3, C=2, D=1, F=0). Đạt từ 2.0/4.0 trở lên để giữ mức học lực Khá/Trung bình và tránh cảnh báo học tập.</p>
        `
    },
    {
        id: 'art-2',
        category: 'nhaphoc',
        categoryLabel: 'Thủ tục & Hồ sơ',
        title: 'Kinh nghiệm chuẩn bị Hồ sơ và Làm thủ tục Nhập học',
        summary: 'Danh sách chi tiết các loại giấy tờ cần công chứng và lưu ý khi đóng học phí đợt 1.',
        image: 'images/hero_hoi_truong.png',
        content: `
            <p>Ngày nhập học tại hội trường các trường đại học thường rất đông đúc. Chuẩn bị sẵn bộ hồ sơ trong túi đựng tài liệu (sơ mi lá) sẽ giúp bạn làm thủ tục nhanh gọn trong 15-20 phút.</p>
            <h4 class="font-bold text-slate-900 mt-4 mb-2">Lưu ý quan trọng cho Tân sinh viên:</h4>
            <ol class="list-decimal pl-5 space-y-1 text-slate-700">
                <li>Luôn tự chụp ảnh hoặc photo công chứng sẵn 3-5 bản Giấy báo trúng tuyển trước khi nộp bản gốc cho nhà trường.</li>
                <li>Chuẩn bị sẵn ứng dụng Ngân hàng trên điện thoại (đã tăng hạn mức chuyển tiền) để nộp học phí nhanh chóng.</li>
                <li>Giữ cẩn thận phiếu thu học phí và giấy hẹn trả thẻ sinh viên.</li>
            </ol>
        `
    },
    {
        id: 'art-3',
        category: 'hocbong',
        categoryLabel: 'Học bổng & Hỗ trợ',
        title: 'Bí quyết Săn Học bổng Khuyến khích Học tập & Doanh nghiệp',
        summary: 'Điều kiện xét học bổng KKHT, miễn giảm học phí và các nguồn học bổng ngoài ngân sách.',
        image: 'images/ngay_hoi_sinh_vien.png',
        content: `
            <p>Học bổng Đại học chia làm 2 nhóm chính: Học bổng khuyến khích học tập (KKHT) trích từ ngân sách nhà trường và Học bổng từ các doanh nghiệp, tập đoàn đối tác.</p>
            <h4 class="font-bold text-slate-900 mt-4 mb-2">Điều kiện xét Học bổng KKHT:</h4>
            <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li>Điểm học tập (GPA) đạt loại Giỏi (từ 3.2/4.0) hoặc Xuất sắc (từ 3.6/4.0).</li>
                <li>Điểm Rèn luyện (ĐRL) đạt từ loại Tốt (80 điểm) trở lên.</li>
                <li>Không vi phạm kỷ luật và không có môn học nào bị nợ/thi lại trong kỳ xét duyệt.</li>
            </ul>
        `
    },
    {
        id: 'art-4',
        category: 'doisong',
        categoryLabel: 'KTX & Thuê nhà',
        title: 'Ký Túc Xá hay Thuê Trọ Bên Ngoài: Lựa Chọn Nào Phù Hợp?',
        summary: 'So sánh chi phí, sự an toàn, độ tự do và môi trường sinh hoạt giữa KTX và nhà trọ.',
        image: 'images/khuon_vien_dai_hoc.png',
        content: `
            <p>Việc lựa chọn nơi ở ảnh hưởng rất lớn đến sinh hoạt và kết quả học tập trong năm nhất đại học.</p>
            <h4 class="font-bold text-slate-900 mt-4 mb-2">Ký túc xá (KTX):</h4>
            <p>Ưu điểm: Chi phí rất rẻ (200k - 800k/tháng), an ninh 24/7, nằm ngay trong khuôn viên trường. Hạn chế: Giờ giấc quy định (thường đóng cửa lúc 23h), sinh hoạt chung phòng 4-8 người.</p>
            <h4 class="font-bold text-slate-900 mt-4 mb-2">Thuê nhà trọ bên ngoài:</h4>
            <p>Ưu điểm: Tự do giờ giấc, không gian riêng tư. Hạn chế: Chi phí cao (1.5tr - 4tr/tháng), tự thanh toán tiền điện nước và tự bảo quản tài sản cá nhân.</p>
        `
    },
    {
        id: 'art-5',
        category: 'kynang',
        categoryLabel: 'Kỹ năng sống',
        title: 'Kỹ năng Quản lý Thời gian & Thích nghi Môi trường Mới',
        summary: 'Làm sao để vừa học tốt tín chỉ, vừa tham gia CLB phong trào mà không bị quá tải?',
        image: 'images/ngay_hoi_sinh_vien.png',
        content: `
            <p>Môi trường đại học mang lại sự tự do lớn nhưng đòi hỏi tính tự giác cao hơn hẳn cấp 3. Không còn thầy cô nhắc nhở chép bài hay kiểm tra bài cũ hàng ngày.</p>
            <h4 class="font-bold text-slate-900 mt-4 mb-2">Phương pháp thích nghi hiệu quả:</h4>
            <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li>Sử dụng ứng dụng quản lý deadline (như công cụ Sổ Task tích hợp trên website) để không bị sót bài tập.</li>
                <li>Áp dụng quy tắc Pomodoro (25 phút tập trung - 5 phút nghỉ) khi tự học tại thư viện.</li>
                <li>Năm nhất chỉ nên đăng ký tham gia 1-2 Câu lạc bộ phù hợp nhất với sở thích để cân bằng thời gian học.</li>
            </ul>
        `
    },
    {
        id: 'art-6',
        category: 'hocvu',
        categoryLabel: 'Học vụ & Tín chỉ',
        title: 'Email Sinh Viên (.edu.vn) & Các Tiện Ích Miễn Phí Đáng Giá',
        summary: 'Tận dụng email sinh viên để nhận miễn phí Microsoft 365, Canva Pro, Github Student Pack, Notion...',
        image: 'images/thu_vien_sinh_vien.png',
        content: `
            <p>Email sinh viên đuôi <b>.edu.vn</b> là "tấm vé vàng" giúp bạn sử dụng hàng loạt phần mềm bản quyền trị giá hàng triệu đồng hoàn toàn miễn phí.</p>
            <h4 class="font-bold text-slate-900 mt-4 mb-2">Các ưu đãi bản quyền nổi bật:</h4>
            <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li><b>Microsoft 365:</b> Tải về Word, Excel, PowerPoint bản quyền miễn phí trên 5 thiết bị.</li>
                <li><b>GitHub Student Developer Pack:</b> Miễn phí GitHub Copilot, tên miền `.me`, và hơn 100 công cụ lập trình.</li>
                <li><b>Canva / Notion / Figma:</b> Nâng cấp tài khoản Giáo dục / Education miễn phí 100%.</li>
                <li><b>Ưu đãi dịch vụ:</b> Giảm giá vé xem phim, vé xe bus, Spotify Student, Apple Music Student...</li>
            </ul>
        `
    }
];

// Danh sách Câu Hỏi Thường Gặp (FAQ)
const FAQ_DATA = [
    {
        q: 'Tôi có thể thay đổi lớp học phần sau khi đã đăng ký tín chỉ không?',
        a: 'Có. Trong tuần đầu tiên của học kỳ (gọi là tuần Đăng ký bổ sung / Hủy học phần), sinh viên được phép rút môn hoặc chuyển sang lớp học phần khác nếu còn chỗ trống theo quy định của Phòng Đào tạo.'
    },
    {
        q: 'Điểm Rèn Luyện (ĐRL) là gì và có ảnh hưởng đến xét tốt nghiệp không?',
        a: 'ĐRL đánh giá sự tham gia của bạn vào các hoạt động phong trào, tình nguyện, chấp hành quy chế. ĐRL ảnh hưởng trực tiếp đến việc xét Học bổng khuyến khích, xét khen thưởng và xếp loại bằng Tốt nghiệp.'
    },
    {
        q: 'Nếu bị ốm vào đúng ngày thi kết thúc học phần thì phải xử lý thế nào?',
        a: 'Bạn cần xin Giấy xác nhận khám chữa bệnh từ Bệnh viện quận/huyện trở lên và nộp Đơn xin Hoãn thi cho Phòng Đào tạo trong vòng 03 ngày làm việc kể từ ngày thi để được xét thi bổ sung đợt sau.'
    },
    {
        q: 'Mức chi phí sinh hoạt trung bình của tân sinh viên tại các thành phố lớn là bao nhiêu?',
        a: 'Chi phí trung bình dao động từ 3.500.000 VNĐ đến 5.500.000 VNĐ/tháng (nếu ở trọ ngoài) và từ 2.000.000 VNĐ đến 3.500.000 VNĐ/tháng (nếu ở KTX), tùy thuộc vào nhu cầu chi tiêu cá nhân.'
    }
];

// Thông tin chi tiết theo từng trường Đại học
const SCHOOLS_DATA = {
    'all': {
        title: 'Phạm vi hiện tại: Hướng dẫn chung toàn quốc',
        desc: 'Các hướng dẫn mang tính chất tham khảo chung cho sinh viên Việt Nam. Khi có thông báo từ trường của bạn, hãy luôn đối chiếu với cổng thông tin chính thức của trường.'
    },
    'rmit': {
        title: 'Trường: Đại học RMIT Việt Nam',
        desc: 'Lưu ý: Học phí và quy chế tín chỉ tuân theo chuẩn RMIT Melbourne. Vui lòng kiểm tra Canvas & Student Portal RMIT.'
    },
    'vnu': {
        title: 'Trường: Đại học Quốc gia Hà Nội (VNU)',
        desc: 'Áp dụng quy chế đào tạo tín chỉ VNU. Theo dõi Cổng thông tin đào tạo (vnu.edu.vn).'
    },
    'vnuhcm': {
        title: 'Trường: Đại học Quốc gia TP.HCM (VNU-HCM)',
        desc: 'Vui lòng kiểm tra thông tin nhập học và đăng ký môn tại portal chính thức của các trường thành viên.'
    },
    'hust': {
        title: 'Trường: Đại học Bách Khoa Hà Nội (HUST)',
        desc: 'Lưu ý kiểm tra trang ctt-daotao.hust.edu.vn về mã học phần và quy định điểm phạt cảnh cáo.'
    },
    'neu': {
        title: 'Trường: Đại học Kinh tế Quốc dân (NEU)',
        desc: 'Xem thông báo chi tiết từ Phòng Quản lý Đào tạo NEU (neu.edu.vn).'
    },
    'ueh': {
        title: 'Trường: Đại học Kinh tế TP.HCM (UEH)',
        desc: 'Tra cứu lịch học và nộp hồ sơ tại portal ueh.edu.vn.'
    }
};
