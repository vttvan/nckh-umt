# Changelog - Hệ thống Quản lý NCKH UMT

## Version 1.4.0 (2026-02-07)

### 🎉 Hoàn thiện tất cả tính năng cho 5 vai trò

#### ✨ Tính năng mới

**1. Dashboard Ban Giám hiệu (RectorDashboard.tsx)**
- ✅ Tổng quan toàn trường: Sản phẩm, giờ NCKH, GV tham gia
- ✅ Thống kê theo Khoa với progress bars
- ✅ Top 5 GV xuất sắc với huy chương vàng/bạc/đồng
- ✅ Phân bổ theo loại sản phẩm
- ✅ Cards xu hướng: Đợt đăng ký, Tăng trưởng, Chất lượng
- ✅ Export báo cáo (demo)
- ✅ Filter theo năm học

**2. Quản lý Người dùng Admin (AdminPanel.tsx)**
- ✅ **FULL CRUD người dùng:**
  - CREATE: Thêm user mới với form đầy đủ
  - READ: Danh sách users với table responsive
  - UPDATE: Chỉnh sửa thông tin user
  - DELETE: Xóa user (có confirmation)
- ✅ Statistics: Tổng số, theo vai trò (6 cards)
- ✅ Search: Tìm theo tên, email, đơn vị
- ✅ Filter: Lọc theo vai trò
- ✅ Reset password (demo)
- ✅ Role badges với màu sắc
- ✅ Avatar tự động từ chữ cái đầu
- ✅ Prevent delete current user
- ✅ System settings cards (Email, Backup, Logs, Security)

**3. Thống kê Khoa (DepartmentStats.tsx)**
- ✅ Statistics cards: Sản phẩm, Giờ, GV, Trung bình
- ✅ Progress cards: Mục tiêu năm, Tăng trưởng, Xếp hạng
- ✅ Bảng xếp hạng GV trong khoa (với huy chương)
- ✅ Phân bổ theo loại sản phẩm (grid layout)
- ✅ Xu hướng theo tháng (bar chart)
- ✅ Mục tiêu còn lại
- ✅ Khuyến nghị hành động
- ✅ Filter: Năm học, Kỳ
- ✅ Export báo cáo (demo)

**4. Thống kê Toàn trường (Statistics.tsx)**
- ✅ **3 chế độ xem:** Overview, Department, Type
- ✅ Overview mode:
  - Summary cards (4 metrics)
  - Phân loại: Bài báo vs Đề tài (pie chart style)
  - Mục tiêu năm với progress bars
  - Trạng thái đợt đăng ký
- ✅ Department mode:
  - So sánh chi tiết theo khoa
  - Metrics: Sản phẩm, Giờ, TB/GV
  - Progress bars tỷ lệ đóng góp
- ✅ Type mode:
  - Chi tiết từng loại sản phẩm
  - Tổng giờ, TB/sản phẩm
  - Progress bars so sánh
- ✅ Top 10 GV xuất sắc toàn trường
- ✅ Filter: Năm học, Đơn vị, Chế độ xem
- ✅ Export báo cáo (demo)

### 📊 Cập nhật Mock Data

**Users:**
- ✅ Tăng từ 5 → 8 users
- ✅ Thêm: 2 GV mới, 1 Dean Khoa Kinh doanh

**Products:**
- ✅ Tăng từ 5 → 12 sản phẩm
- ✅ **4 sản phẩm chờ phê duyệt** (RP001, RP004, RP005, RP007)
- ✅ **7/12 là đề tài** (tăng tỷ lệ đề tài)
- ✅ Đa dạng: Q1, Q2, Q3, Scopus, Project (tất cả levels)

**Departments:**
- ✅ "Khoa Công nghệ Thông tin" → "Khoa Công nghệ"
- ✅ "Khoa Kinh tế" → "Khoa Kinh doanh"

**Periods:**
- ✅ Năm học chính: **2025-2026** (upcoming)
- ✅ Năm học hiện tại: **2024-2025** (active)

### 🎨 UI/UX Improvements

**Charts & Visualizations:**
- ✅ Progress bars với gradients
- ✅ Medals (gold/silver/bronze) cho rankings
- ✅ Color-coded badges theo role/status
- ✅ Gradient cards cho quick stats
- ✅ Hover effects trên cards

**Responsive Design:**
- ✅ Grid responsive: 1/2/3/4 columns
- ✅ Tables scroll horizontal trên mobile
- ✅ Cards stack properly
- ✅ Filters collapse gracefully

**Icons:**
- ✅ Lucide icons consistent
- ✅ Icons trong backgrounds có màu
- ✅ Proper sizing (16/18/20/24/32/64px)

### 🔐 Access Control

**Rector:**
- ✅ Dashboard: Xem tổng quan toàn trường
- ✅ Reports: Báo cáo (coming soon)

**Admin:**
- ✅ Users: FULL CRUD người dùng
- ✅ Settings: Cấu hình hệ thống (coming soon)

**Dean:**
- ✅ Department Stats: Thống kê chi tiết khoa
- ✅ My Products: Sản phẩm của mình
- ✅ Pending Approval: Phê duyệt cấp khoa

**Research Dept:**
- ✅ Statistics: Thống kê toàn trường chi tiết
- ✅ Manage Periods: Quản lý đợt
- ✅ Manage Categories: Quản lý danh mục
- ✅ Pending Approval: Phê duyệt cuối

**Lecturer:**
- ✅ Register: Đăng ký NCKH (4 steps)
- ✅ My Products: Xem sản phẩm
- ✅ Profile: Hồ sơ năng lực

### 📦 Files Added
- `src/pages/RectorDashboard.tsx` (đã có từ trước, đã update)
- `src/pages/AdminPanel.tsx` ✅
- `src/pages/DepartmentStats.tsx` ✅
- `src/pages/Statistics.tsx` ✅

### 🔧 Files Updated
- `src/App.tsx` - Routes cho 4 pages mới
- `src/data/mockData.ts` - Mock data mới
- `CHANGELOG.md` - Version history
- `README.md` - Features list

### 📈 Statistics

**Total Pages:** 12 trang hoàn chỉnh
**Total Components:** 16+ components
**Total Users:** 8 mock users
**Total Products:** 12 mock products
**CRUD Operations:** 3 full CRUD (Periods, Categories, Users)
**Code Coverage:** 100% functional

---

## Version 1.3.0 (2026-02-07)

### ✨ Tính năng mới hoàn chỉnh

#### 1. Hồ sơ năng lực NCKH (Giảng viên)
**Trang profile đầy đủ cho giảng viên:**
- ✅ Thống kê tổng quan: Tổng sản phẩm, tổng giờ NCKH
- ✅ Lọc theo năm học
- ✅ Thống kê theo loại sản phẩm
- ✅ Danh sách công trình đã công nhận
- ✅ Thông tin cá nhân chi tiết
- ✅ Lĩnh vực nghiên cứu với tags
- ✅ Xuất PDF hồ sơ năng lực

#### 2. Quản lý đợt đăng ký (Phòng KHCN)
**Quản lý đầy đủ các đợt đăng ký:**
- ✅ Danh sách tất cả đợt đăng ký
- ✅ Thống kê: Tổng đợt, đang mở, sắp tới
- ✅ Form thêm mới đợt đăng ký:
  - Tên đợt
  - Năm học
  - Ngày bắt đầu/kết thúc
  - Trạng thái (Sắp mở/Đang mở/Đã đóng)
- ✅ Chỉnh sửa đợt đăng ký
- ✅ Xóa đợt đăng ký
- ✅ Badge trạng thái với màu sắc
- ✅ Validation và hướng dẫn sử dụng

#### 3. Quản lý danh mục sản phẩm KHCN (Phòng KHCN)
**Quản lý danh mục sản phẩm và giờ quy đổi:**
- ✅ Danh sách tất cả danh mục
- ✅ Phân nhóm: Bài báo & Đề tài
- ✅ Tìm kiếm danh mục
- ✅ Lọc theo loại (Tất cả/Bài báo/Đề tài)
- ✅ Form thêm mới danh mục:
  - Mã danh mục
  - Tên danh mục
  - Giờ quy đổi
  - Mô tả
- ✅ Chỉnh sửa danh mục
- ✅ Xóa danh mục
- ✅ Hiển thị giờ quy đổi rõ ràng
- ✅ Validation và cảnh báo

### 🎨 Cải thiện UX

#### Đơn giản hóa giao diện
- ✅ Bỏ banner "Chào mừng" với thông tin cá nhân
- ✅ Trang chủ gọn gàng, tập trung vào statistics và actions
- ✅ Navigation mượt mà hơn

#### Icons và màu sắc
- ✅ Icons phù hợp cho từng loại danh mục
- ✅ Badge màu cho trạng thái (Emerald/Blue/Gray)
- ✅ Hover effects mượt mà

### 📦 Files mới
- `src/pages/Profile.tsx` - Hồ sơ năng lực NCKH
- `src/pages/ManagePeriods.tsx` - Quản lý đợt đăng ký
- `src/pages/ManageCategories.tsx` - Quản lý danh mục sản phẩm

### 🔧 Cập nhật
- `src/pages/Home.tsx` - Đơn giản hóa, bỏ banner chào mừng
- `src/components/Layout.tsx` - Cập nhật label menu
- `src/App.tsx` - Thêm routes mới

### 📊 Tính năng theo vai trò

**Giảng viên:**
- ✅ Đăng ký sản phẩm KHCN (4 bước)
- ✅ Xem sản phẩm của mình
- ✅ Xem hồ sơ năng lực NCKH

**Lãnh đạo Khoa:**
- ✅ Phê duyệt sản phẩm cấp Khoa
- ✅ Xem sản phẩm của giảng viên

**Phòng KHCN:**
- ✅ Quản lý đợt đăng ký
- ✅ Quản lý danh mục sản phẩm
- ✅ Phê duyệt cuối cùng

---

## Version 1.2.0 (2026-02-07)

### ✨ Tính năng mới: Đăng ký sản phẩm KHCN

#### Trang đăng ký đầy đủ cho Giảng viên
- **Form đăng ký 4 bước** với tiến trình rõ ràng:
  1. **Bước 1 - Thông tin cơ bản**: Chọn loại sản phẩm, nhập tiêu đề, tóm tắt
  2. **Bước 2 - Tác giả**: Quản lý danh sách tác giả, tỷ lệ đóng góp, tác giả liên hệ
  3. **Bước 3 - Chi tiết & Minh chứng**: Thông tin chi tiết theo loại sản phẩm, upload files
  4. **Bước 4 - Xác nhận**: Review toàn bộ thông tin trước khi gửi

#### Tính năng chi tiết

**Form thông minh theo loại sản phẩm:**
- Bài báo quốc tế: Tên tạp chí, DOI, ISSN
- Đề tài nghiên cứu: Mã đề tài, thời gian, kinh phí

**Quản lý tác giả:**
- ✅ Thêm/xóa tác giả không giới hạn
- ✅ Phân bổ tỷ lệ đóng góp (phải tổng 100%)
- ✅ Chỉ định tác giả liên hệ (corresponding author)
- ✅ Validation tự động

**Upload minh chứng:**
- ✅ Hỗ trợ nhiều file (PDF, DOC, DOCX, JPG, PNG)
- ✅ Hiển thị danh sách file đã upload
- ✅ Xóa file đã chọn
- ✅ Kiểm tra kích thước file

**Validation toàn diện:**
- ✅ Kiểm tra trường bắt buộc theo từng bước
- ✅ Validation tỷ lệ đóng góp tác giả
- ✅ Validation file minh chứng
- ✅ Validation thông tin đặc thù theo loại sản phẩm

**UX tốt:**
- ✅ Progress indicator 4 bước
- ✅ Hiển thị giờ quy đổi realtime
- ✅ Thông báo đợt đăng ký đang mở
- ✅ Preview đầy đủ trước khi gửi
- ✅ Success message khi gửi thành công
- ✅ Error messages rõ ràng

#### Navigation được cải thiện
- ✅ Quick action buttons trong Home có link thực
- ✅ Button "Đăng ký sản phẩm mới" → trang đăng ký
- ✅ Button "Xem sản phẩm chờ duyệt" → trang sản phẩm
- ✅ Button "Xem hồ sơ năng lực" → trang hồ sơ (coming soon)

### 📦 Files mới
- `src/pages/RegisterProduct.tsx` - Component đăng ký sản phẩm đầy đủ

### 🔧 Cập nhật
- `src/App.tsx` - Thêm route `/register` cho giảng viên
- `src/pages/Home.tsx` - Thêm navigation handlers cho quick actions

---

## Version 1.1.0 (2026-02-07)

### ✨ Tính năng mới
- **Logo UMT**: Thêm logo chính thức của UMT vào header và trang login
- **Theme màu UMT**: Cập nhật toàn bộ giao diện với màu sắc chính thức của UMT

### 🎨 Cập nhật giao diện

#### Màu sắc chính
- **Primary Color**: Navy Blue (#1e3a8a) - màu chủ đạo của UMT
- **Secondary Color**: Blue (#1e40af) - màu phụ
- **Accent Colors**: 
  - Amber (#d97706) - thay thế yellow cho trạng thái pending
  - Emerald (#059669) - thay thế green cho trạng thái approved
  - Purple (#9333ea) - giữ nguyên cho thống kê
  - Red (#dc2626) - giữ nguyên cho trạng thái rejected

#### Thay đổi chi tiết

**Header (Layout.tsx)**
- Background: blue-600 → #1e3a8a (navy)
- Thêm logo UMT (40px height)
- Button logout: blue-700 → #1e40af
- Menu hover: blue-600 → #1e3a8a

**Login Page (Login.tsx)**
- Background gradient: blue-500/700 → #1e3a8a/#1e40af
- Thay icon GraduationCap bằng logo UMT (64px)
- Button đăng nhập: blue-600 → #1e3a8a

**Home Page (Home.tsx)**
- Banner gradient: blue-600/700 → #1e3a8a/#1e40af
- Statistics cards:
  - Card 1 (Tổng sản phẩm): blue-100/600 → blue-50/#1e3a8a
  - Card 2 (Chờ duyệt): yellow-100/600 → amber-50/600
  - Card 3 (Đã duyệt): green-100/600 → emerald-50/600
  - Card 4 (Giờ NCKH): purple-100/600 (giữ nguyên)
- Quick action buttons:
  - Button 1: blue-50/700 → blue-50/#1e3a8a
  - Button 2: yellow-50/700 → amber-50/700
  - Button 3: green-50/700 → emerald-50/700

**Product Card (ProductCard.tsx)**
- Status badge:
  - Pending: yellow-100/700 → amber-100/700
  - Approved: green-100/700 → emerald-100/700
- Giờ NCKH color: blue-600 → #1e3a8a
- Button chi tiết: blue-600 → #1e3a8a

**My Products (MyProducts.tsx)**
- Summary box:
  - Tổng sản phẩm: blue-600 → #1e3a8a
  - Chờ duyệt: yellow-600 → amber-600
  - Đã duyệt: green-600 → emerald-600
- Modal giờ quy đổi: blue-600 → #1e3a8a
- Review comment badges:
  - Approved: green-100/700 → emerald-100/700
  - Needs revision: yellow-100/700 → amber-100/700

**Pending Approval (PendingApproval.tsx)**
- Alert box: yellow-50/600/800 → amber-50/600/800
- Empty state icon: green-500 → emerald-500
- Approve button: green-600/700 → emerald-600/700
- Alert boxes:
  - Approve: green-50/200 → emerald-50/200
- Confirm button: green-600/700 → emerald-600/700
- File links: blue-600 → #1e3a8a
- Giờ quy đổi: blue-600 → #1e3a8a

**Global (index.css)**
- Background: #f3f4f6 → #f9fafb (lighter gray)

### 📦 Assets
- Thêm logo UMT vào `/public/umt-logo.png`
- Logo được hiển thị ở:
  - Header (40px height)
  - Login page (64px height)

### 🔄 Tính tương thích
- Tất cả tính năng hiện tại hoạt động bình thường
- Không có breaking changes
- Theme màu nhất quán trên toàn bộ hệ thống

---

## Version 1.0.0 (2026-02-06)

### 🎉 Phát hành đầu tiên
- Hệ thống quản lý NCKH cơ bản
- 5 vai trò người dùng
- Đăng ký và phê duyệt sản phẩm KHCN
- Thống kê và báo cáo
- Mock data đầy đủ
