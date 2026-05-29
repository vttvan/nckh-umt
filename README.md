# Hệ thống Quản lý NCKH (for Demonstration only)

Hệ thống Quản lý hoạt động Nghiên cứu Khoa học

## 📋 Mô tả

Hệ thống được xây dựng để số hóa quy trình quản lý hoạt động nghiên cứu khoa học của giảng viên, bao gồm:
- Đăng ký sản phẩm KHCN
- Phê duyệt nhiều cấp (Khoa → Phòng KHCN)
- Quy đổi giờ nghiên cứu
- Thống kê và báo cáo

## 🎯 Các vai trò người dùng

1. **Giảng viên**: Đăng ký và theo dõi sản phẩm KHCN
2. **Lãnh đạo Khoa**: Phê duyệt cấp Khoa
3. **Phòng KHCN**: Phê duyệt cuối cùng, quản lý hệ thống
4. **Ban Giám hiệu**: Xem báo cáo tổng hợp
5. **Quản trị viên**: Quản lý người dùng và cấu hình

## 🚀 Cài đặt và Chạy

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Chạy development server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Bước 3: Build cho production
```bash
npm run build
```

### Bước 4: Preview production build
```bash
npm run preview
```

## 🔐 Tài khoản demo

Tất cả tài khoản đều có mật khẩu: **demo123**

| Email | Vai trò | Mô tả |
|-------|---------|-------|
| an.nguyen@umt.edu.vn | Giảng viên | TS. Nguyễn Văn An - Khoa Công nghệ |
| thu.tran@umt.edu.vn | Lãnh đạo Khoa | PGS.TS. Trần Thị Bình - Trưởng khoa Công nghệ |
| hung.ngo@umt.edu.vn | Phòng KHCN | TS. Ngô Minh Hùng |
| tuan.nguyen@umt.edu.vn | Ban Giám hiệu | TS. Nguyễn Cảnh Tuấn |
| admin@umt.edu.vn | Quản trị viên | Admin |

## 📦 Công nghệ sử dụng

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📁 Cấu trúc thư mục

```
src/
├── components/      # Các component tái sử dụng
│   ├── Layout.tsx
│   └── ProductCard.tsx
├── pages/          # Các trang chính
│   ├── Login.tsx
│   ├── Home.tsx
│   ├── MyProducts.tsx
│   └── PendingApproval.tsx
├── types/          # TypeScript type definitions
│   └── index.ts
├── data/           # Mock data
│   └── mockData.ts
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## ✨ Tính năng đã triển khai

### 👨‍🏫 Giảng viên
- ✅ Xem danh sách sản phẩm KHCN của mình
- ✅ Xem chi tiết sản phẩm và trạng thái phê duyệt
- ✅ Thống kê giờ NCKH cá nhân
- ✅ **Đăng ký sản phẩm KHCN mới** - Form đầy đủ 4 bước
  - Chọn loại sản phẩm và nhập thông tin cơ bản
  - Quản lý danh sách tác giả và tỷ lệ đóng góp
  - Upload minh chứng và nhập thông tin chi tiết
  - Xem lại và xác nhận trước khi gửi
- ✅ **Hồ sơ năng lực NCKH**
  - Thống kê tổng quan sản phẩm và giờ NCKH
  - Danh sách công trình đã công nhận
  - Thông tin cá nhân và lĩnh vực nghiên cứu
  - Lọc theo năm học
  - Xuất PDF (demo)

### 👔 Lãnh đạo Khoa
- ✅ Xem danh sách chờ phê duyệt cấp Khoa
- ✅ Phê duyệt/Từ chối sản phẩm KHCN
- ✅ Thêm nhận xét cho sản phẩm
- ✅ **Thống kê Khoa**
  - Summary cards: Sản phẩm, Giờ, GV, Trung bình
  - Bảng xếp hạng giảng viên
  - Phân bổ theo loại sản phẩm
  - Xu hướng theo tháng
  - Mục tiêu và khuyến nghị
  - Export báo cáo

### 🏢 Phòng KHCN
- ✅ **Quản lý đợt đăng ký** - FULL CRUD
  - Xem danh sách tất cả đợt
  - Thêm mới đợt đăng ký
  - Chỉnh sửa và xóa đợt
  - Quản lý trạng thái (Sắp mở/Đang mở/Đã đóng)
- ✅ **Quản lý danh mục sản phẩm KHCN** - FULL CRUD
  - Xem danh sách danh mục
  - Thêm mới danh mục
  - Chỉnh sửa giờ quy đổi
  - Xóa danh mục
  - Tìm kiếm và lọc
- ✅ **Thống kê toàn trường**
  - 3 chế độ xem: Overview, Department, Type
  - Phân loại Bài báo vs Đề tài
  - Mục tiêu năm học
  - Top 10 GV xuất sắc
  - So sánh theo khoa
  - Chi tiết theo loại sản phẩm
  - Export báo cáo
- ✅ Xem danh sách chờ phê duyệt cuối
- ✅ Phê duyệt/Từ chối sản phẩm KHCN

### 🎓 Ban Giám hiệu
- ✅ **Dashboard BGH**
  - Tổng quan toàn trường
  - Thống kê theo Khoa
  - Top 5 GV xuất sắc
  - Phân bổ theo loại sản phẩm
  - Cards xu hướng (Đợt đăng ký, Tăng trưởng, Chất lượng)
  - Filter năm học
  - Export báo cáo
- 🚧 Báo cáo tổng hợp (coming soon)

### ⚙️ Quản trị viên
- ✅ **Quản lý người dùng** - FULL CRUD
  - Xem danh sách tất cả users
  - Thêm user mới
  - Chỉnh sửa thông tin user
  - Xóa user
  - Reset password
  - Search và filter
  - Statistics theo vai trò
- 🚧 Cấu hình hệ thống (coming soon)
- 🚧 Logs và audit trail (coming soon)

### Ban Giám hiệu
- 🚧 Dashboard tổng quan (coming soon)
- 🚧 Báo cáo tổng hợp (coming soon)

### Quản trị viên
- 🚧 Quản lý người dùng (coming soon)
- 🚧 Cấu hình hệ thống (coming soon)

## 📊 Danh mục sản phẩm KHCN

### Nghiên cứu công bố quốc tế
- Nature, Science: 2340 giờ
- Q1 (Scopus/ISI): 1170 giờ
- Q2: 935 giờ
- Q3: 700 giờ
- Q4: 350 giờ
- Kỷ yếu Scopus/ISI: 120 giờ

### Đề tài nghiên cứu
- Đề tài quốc tế: 2340 giờ
- Đề tài cấp Nhà nước: 2040 giờ
- Đề tài Nafosted/cấp Bộ: 1460 giờ
- Đề tài cấp Sở/Tỉnh/TP: 870 giờ
- Đề tài cấp cơ sở (Trường): 295 giờ

## 🔄 Luồng phê duyệt

```
Giảng viên đăng ký
        ↓
    Lãnh đạo Khoa phê duyệt
        ↓
    Phòng KHCN phê duyệt
        ↓
    Công nhận giờ NCKH
```

## 🎨 Giao diện

- Modern, responsive design
- Tailwind CSS cho styling
- Lucide React icons
- User-friendly interface
- Vietnamese language support

## 📝 License

Copyright © 2026 UMT - Trường Đại học Quản lý và Công nghệ TP.HCM

---

**Lưu ý**: Đây là phiên bản mockup dùng để demo. Dữ liệu là dữ liệu mẫu và không kết nối với backend thực tế.
