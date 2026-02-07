# Tổng hợp Tính năng - Hệ thống Quản lý NCKH UMT

## 📋 Tổng quan

Hệ thống có **8 trang chính** với đầy đủ tính năng CRUD cho 5 vai trò người dùng.

---

## 🎭 Phân quyền theo vai trò

### 1. Giảng viên (Lecturer)
- ✅ Trang chủ (Dashboard)
- ✅ Sản phẩm của tôi (My Products) - **READ**
- ✅ Đăng ký NCKH (Register Product) - **CREATE**
- ✅ Hồ sơ năng lực (Profile) - **READ**

### 2. Lãnh đạo Khoa (Dean)
- ✅ Trang chủ (Dashboard)
- ✅ Sản phẩm của tôi (My Products) - **READ**
- ✅ Chờ phê duyệt (Pending Approval) - **UPDATE** (Approve/Reject)
- 🚧 Thống kê Khoa (Department Stats) - Coming soon

### 3. Phòng KHCN (Research Department)
- ✅ Trang chủ (Dashboard)
- ✅ Quản lý đợt đăng ký (Manage Periods) - **FULL CRUD**
- ✅ Danh mục sản phẩm (Manage Categories) - **FULL CRUD**
- ✅ Chờ phê duyệt (Pending Approval) - **UPDATE** (Approve/Reject)
- 🚧 Thống kê toàn trường (Statistics) - Coming soon

### 4. Ban Giám hiệu (Rector)
- ✅ Trang chủ (Dashboard)
- 🚧 Dashboard BGH - Coming soon
- 🚧 Báo cáo tổng hợp - Coming soon

### 5. Quản trị viên (Admin)
- ✅ Trang chủ (Dashboard)
- 🚧 Quản lý người dùng - Coming soon
- 🚧 Cấu hình hệ thống - Coming soon

---

## 📄 Chi tiết từng trang

### 1. 🏠 TRANG CHỦ (Home.tsx)
**Vai trò:** Tất cả  
**Path:** `/`

#### Tính năng:
- 📊 Statistics cards theo vai trò
- 🎯 Quick action buttons (có navigation)
- 📅 Thông báo đợt đăng ký đang mở (cho Giảng viên)

#### Giảng viên thấy:
- Tổng sản phẩm
- Chờ phê duyệt
- Đã phê duyệt
- Tổng giờ NCKH

#### Lãnh đạo Khoa/Phòng KHCN thấy:
- Tổng sản phẩm (toàn bộ)
- Chờ duyệt (theo vai trò)
- Đã duyệt

---

### 2. 📝 SẢN PHẨM CỦA TÔI (MyProducts.tsx)
**Vai trò:** Giảng viên, Lãnh đạo Khoa  
**Path:** `/my-products`

#### ✅ CRUD Operations:
- **READ:** Xem danh sách sản phẩm của mình
- **READ:** Xem chi tiết từng sản phẩm

#### Tính năng:
- 🔍 Tìm kiếm sản phẩm
- 🎯 Lọc theo trạng thái:
  - Tất cả
  - Nháp
  - Chờ Khoa duyệt
  - Chờ Phòng KHCN
  - Đã phê duyệt
  - Từ chối
- 📊 Summary statistics
- 👁️ Modal xem chi tiết:
  - Thông tin sản phẩm
  - Danh sách tác giả
  - Giờ quy đổi
  - Lịch sử phê duyệt (comments)

#### Dữ liệu hiển thị:
```typescript
{
  id: string
  title: string
  type: ProductType
  authors: Author[]
  submittedDate: string
  status: ProductStatus
  hours: number
  evidence: string[]
  reviewComments: ReviewComment[]
  department: string
}
```

---

### 3. ➕ ĐĂNG KÝ SẢN PHẨM KHCN (RegisterProduct.tsx)
**Vai trò:** Giảng viên  
**Path:** `/register`

#### ✅ CRUD Operations:
- **CREATE:** Đăng ký sản phẩm KHCN mới (4 bước)

#### BƯỚC 1: Thông tin cơ bản
**Input fields:**
```typescript
{
  type: ProductType              // Dropdown - Required
  title: string                  // Text - Required
  abstract: string               // Textarea - Optional
}
```

**Loại sản phẩm:**
- Bài báo quốc tế:
  - Nature, Science (2340 giờ)
  - Q1 (1170 giờ)
  - Q2 (935 giờ)
  - Q3 (700 giờ)
  - Q4 (350 giờ)
  - Kỷ yếu Scopus/ISI (120 giờ)
- Đề tài nghiên cứu:
  - Quốc tế (2340 giờ)
  - Cấp Nhà nước (2040 giờ)
  - Nafosted/Bộ (1460 giờ)
  - Cấp Sở/Tỉnh/TP (870 giờ)
  - Cấp cơ sở (295 giờ)

#### BƯỚC 2: Tác giả
**Input fields:**
```typescript
Author[] {
  name: string                   // Text - Required
  percentage: number             // Number (0-100) - Required
  isCorresponding: boolean       // Checkbox - Optional
}
```

**Tính năng:**
- ➕ Thêm tác giả (unlimited)
- 🗑️ Xóa tác giả (min 1)
- ✅ Validation: Tổng % = 100
- ✅ Validation: Có ít nhất 1 corresponding author

#### BƯỚC 3: Chi tiết & Minh chứng
**Input fields cho Bài báo:**
```typescript
{
  journalName: string            // Text - Required
  doi: string                    // Text - Required
  issn: string                   // Text - Optional
  evidence: File[]               // File upload - Required
}
```

**Input fields cho Đề tài:**
```typescript
{
  projectCode: string            // Text - Required
  projectDuration: string        // Text - Optional
  fundingAmount: string          // Text - Optional
  evidence: File[]               // File upload - Required
}
```

**Upload file:**
- Formats: PDF, DOC, DOCX, JPG, PNG
- Max size: 10MB per file
- Multiple files allowed
- Preview uploaded files
- Remove uploaded files

#### BƯỚC 4: Xác nhận
- 👁️ Review toàn bộ thông tin
- ✅ Submit button
- 🎊 Success message

---

### 4. 👤 HỒ SƠ NĂNG LỰC (Profile.tsx)
**Vai trò:** Giảng viên  
**Path:** `/profile`

#### ✅ CRUD Operations:
- **READ:** Xem hồ sơ năng lực NCKH

#### Tính năng:
- 📊 **Statistics:**
  - Tổng sản phẩm đã công nhận
  - Tổng giờ NCKH
  - Năm học hiện tại

- 📅 **Lọc theo năm học:**
  - Dropdown chọn năm
  - Hiển thị data theo năm

- 📈 **Thống kê theo loại:**
  - Số lượng từng loại sản phẩm
  - Grouped by type

- 📚 **Danh sách công trình:**
  - STT
  - Loại sản phẩm (badge)
  - Giờ quy đổi (badge)
  - Tiêu đề
  - Tác giả và tỷ lệ
  - Ngày công nhận

- 👨‍🎓 **Thông tin cá nhân:**
  - Họ tên
  - Email
  - Đơn vị
  - Chức danh
  - Trình độ
  - Chuyên ngành
  - ✏️ Button chỉnh sửa (demo)

- 🏷️ **Lĩnh vực nghiên cứu:**
  - Tags hiển thị
  - ➕ Button thêm (demo)

- 📥 **Xuất PDF:**
  - Button download (demo)

#### Dữ liệu hiển thị:
```typescript
{
  // Personal info
  name: string
  email: string
  department: string
  position: string
  degree: string
  major: string
  
  // Statistics
  totalProducts: number
  totalHours: number
  productsByType: Record<ProductType, number>
  
  // Publications (filtered by year)
  publications: ResearchProduct[]
  
  // Research interests
  interests: string[]
}
```

---

### 5. ✅ PHÊ DUYỆT (PendingApproval.tsx)
**Vai trò:** Lãnh đạo Khoa, Phòng KHCN  
**Path:** `/pending-approval`

#### ✅ CRUD Operations:
- **READ:** Xem danh sách chờ phê duyệt
- **UPDATE:** Phê duyệt/Từ chối sản phẩm

#### Tính năng:
- 📋 Danh sách sản phẩm chờ duyệt (theo vai trò):
  - **Lãnh đạo Khoa:** Status = pending_dean
  - **Phòng KHCN:** Status = pending_research

- 👁️ **Modal chi tiết sản phẩm:**
  - Tất cả thông tin sản phẩm
  - Tác giả
  - Giờ quy đổi
  - Minh chứng (links)

- ✅ **Phê duyệt:**
  - Button "Phê duyệt"
  - Form nhập nhận xét (optional)
  - Confirm button
  
- ❌ **Từ chối:**
  - Button "Từ chối"
  - Form nhập lý do (required)
  - Confirm button

#### Flow phê duyệt:
```
1. Click "Xem chi tiết"
2. Review thông tin sản phẩm
3. Click "Phê duyệt" hoặc "Từ chối"
4. Nhập nhận xét/lý do
5. Confirm
6. Status updated
```

#### Dữ liệu cần:
```typescript
ReviewComment {
  reviewer: string               // Auto from currentUser
  role: string                   // Auto from currentUser
  comment: string                // Required if reject
  date: string                   // Auto generate
  action: 'approved' | 'rejected' | 'needs_revision'
}
```

---

### 6. 📅 QUẢN LÝ ĐỢT ĐĂNG KÝ (ManagePeriods.tsx)
**Vai trò:** Phòng KHCN  
**Path:** `/manage-periods`

#### ✅ FULL CRUD Operations:

#### **CREATE - Tạo đợt mới**
**Form fields:**
```typescript
{
  name: string                   // Text - Required
  academicYear: string           // Text - Required (e.g., "2025-2026")
  startDate: string              // Date - Required
  endDate: string                // Date - Required
  status: 'upcoming' | 'active' | 'closed'  // Select - Required
}
```

**Validation:**
- Name không được trống
- Ngày kết thúc > Ngày bắt đầu
- Chỉ nên có 1 đợt "active" cùng lúc (warning)

#### **READ - Danh sách đợt**
**Hiển thị:**
- Tên đợt
- Badge trạng thái (màu sắc):
  - Sắp mở (Blue)
  - Đang mở (Emerald)
  - Đã đóng (Gray)
- Icon theo trạng thái
- Năm học
- Ngày bắt đầu
- Ngày kết thúc

**Statistics:**
- Tổng số đợt
- Số đợt đang mở
- Số đợt sắp tới

#### **UPDATE - Chỉnh sửa**
- Click icon Edit (✏️)
- Form hiển thị với data hiện tại
- Có thể sửa tất cả fields
- Save → Update in list

#### **DELETE - Xóa**
- Click icon Delete (🗑️)
- Confirm dialog
- Xóa khỏi danh sách

#### Dữ liệu:
```typescript
RegistrationPeriod {
  id: string                     // Auto generate
  name: string
  startDate: string              // ISO date
  endDate: string                // ISO date
  academicYear: string
  status: 'upcoming' | 'active' | 'closed'
}
```

#### Use cases:
1. **Tạo đợt mới cho HK1 2025-2026**
2. **Sửa ngày kết thúc của đợt hiện tại**
3. **Đóng đợt đã hết hạn** (update status)
4. **Xóa đợt nhập nhầm**

---

### 7. 📚 QUẢN LÝ DANH MỤC SẢN PHẨM (ManageCategories.tsx)
**Vai trò:** Phòng KHCN  
**Path:** `/all-products`

#### ✅ FULL CRUD Operations:

#### **CREATE - Thêm danh mục mới**
**Form fields:**
```typescript
{
  type: ProductType              // Text - Required (unique)
  name: string                   // Text - Required
  hours: number                  // Number - Required
  description: string            // Textarea - Optional
}
```

**Examples:**
- type: "Q1A", name: "Bài báo Q1 tạp chí A*", hours: 1500
- type: "project_eu", name: "Đề tài EU", hours: 3000

**Validation:**
- Type không được trùng
- Hours > 0
- Name không được trống

#### **READ - Danh sách danh mục**
**Hiển thị:**
- Phân nhóm:
  - 📰 Bài báo & Kỷ yếu (không có prefix "project_")
  - 🔬 Đề tài nghiên cứu (có prefix "project_")
- Tên danh mục
- Mã danh mục (badge)
- Giờ quy đổi (highlighted)
- Mô tả
- Icon theo loại

**Statistics:**
- Tổng danh mục
- Số bài báo/kỷ yếu
- Số đề tài

**Search & Filter:**
- 🔍 Tìm kiếm: Theo tên hoặc mã
- 🎯 Lọc: 
  - Tất cả
  - Bài báo/Kỷ yếu
  - Đề tài

#### **UPDATE - Chỉnh sửa**
- Click icon Edit (✏️)
- Form hiển thị với data hiện tại
- Không thể sửa "type" (disabled)
- Có thể sửa: name, hours, description
- Save → Update in list

#### **DELETE - Xóa**
- Click icon Delete (🗑️)
- Confirm dialog với warning
- Xóa khỏi danh sách

#### Dữ liệu:
```typescript
ProductCategory {
  type: ProductType              // Unique identifier
  name: string
  hours: number
  description?: string
}
```

#### Use cases:
1. **Thêm loại sản phẩm mới** (Q1A, Q1B...)
2. **Cập nhật giờ quy đổi** theo quy định mới
3. **Sửa tên danh mục** cho rõ ràng hơn
4. **Xóa danh mục không còn dùng**
5. **Tìm kiếm danh mục** cụ thể
6. **Lọc chỉ xem bài báo** hoặc đề tài

---

## 🎯 Tổng kết CRUD

### ✅ Hoàn chỉnh CRUD
1. **Quản lý đợt đăng ký** - FULL CRUD ✅
2. **Quản lý danh mục sản phẩm** - FULL CRUD ✅

### ✅ Partial CRUD (theo nghiệp vụ)
3. **Đăng ký sản phẩm** - CREATE only ✅
4. **Sản phẩm của tôi** - READ only ✅
5. **Hồ sơ năng lực** - READ only ✅
6. **Phê duyệt** - READ + UPDATE (approve/reject) ✅

### 🚧 Cần bổ sung (nếu yêu cầu)
- **User Management** - FULL CRUD cho Admin
- **System Settings** - UPDATE configs
- **Reports** - READ + EXPORT

---

## 📊 Ma trận tính năng

| Trang | Create | Read | Update | Delete | Search | Filter | Export |
|-------|--------|------|--------|--------|--------|--------|--------|
| Home | - | ✅ | - | - | - | - | - |
| My Products | - | ✅ | - | - | ✅ | ✅ | - |
| Register Product | ✅ | - | - | - | - | - | - |
| Profile | - | ✅ | - | - | - | ✅ | ✅ |
| Pending Approval | - | ✅ | ✅ | - | - | - | - |
| Manage Periods | ✅ | ✅ | ✅ | ✅ | - | - | - |
| Manage Categories | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - |

---

## 🔐 Mock Data Location

Tất cả mock data ở: `/src/data/mockData.ts`

```typescript
// Users
export const mockUsers: User[]

// Research Products
export const mockResearchProducts: ResearchProduct[]

// Product Categories
export const productCategories: ProductCategory[]

// Registration Periods
export const registrationPeriods: RegistrationPeriod[]
```

---

## 💡 Hướng dẫn sử dụng CRUD

### Quản lý đợt đăng ký:
1. Login: `lvcuong@umt.edu.vn` / `demo123`
2. Click menu "Quản lý đợt đăng ký"
3. Click "Tạo đợt mới"
4. Điền form → Save
5. Edit: Click icon ✏️
6. Delete: Click icon 🗑️

### Quản lý danh mục:
1. Login: `lvcuong@umt.edu.vn` / `demo123`
2. Click menu "Danh mục sản phẩm"
3. Click "Thêm danh mục"
4. Điền form → Save
5. Tìm kiếm: Gõ vào search box
6. Lọc: Chọn dropdown filter
7. Edit: Click icon ✏️
8. Delete: Click icon 🗑️

### Đăng ký sản phẩm:
1. Login: `nvana@umt.edu.vn` / `demo123`
2. Click menu "Đăng ký NCKH"
3. Làm theo 4 bước wizard
4. Submit → Success

---

## 🎨 UI Components

### Forms:
- Text Input
- Textarea
- Number Input
- Date Picker
- Dropdown Select
- Checkbox
- File Upload

### Actions:
- Primary Button (Blue)
- Success Button (Emerald)
- Danger Button (Red)
- Secondary Button (Gray)

### Feedback:
- Success Message (Green)
- Error Message (Red)
- Warning Message (Amber)
- Info Message (Blue)

### Navigation:
- Modal Dialog
- Confirmation Dialog
- Wizard Steps (1-4)

---

## ✅ Checklist triển khai Backend (tham khảo)

### API Endpoints cần có:

**Authentication:**
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`

**Research Products:**
- GET `/api/products` (with filters)
- GET `/api/products/:id`
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`
- PUT `/api/products/:id/approve`
- PUT `/api/products/:id/reject`

**Registration Periods:**
- GET `/api/periods`
- GET `/api/periods/:id`
- POST `/api/periods`
- PUT `/api/periods/:id`
- DELETE `/api/periods/:id`

**Product Categories:**
- GET `/api/categories`
- GET `/api/categories/:type`
- POST `/api/categories`
- PUT `/api/categories/:type`
- DELETE `/api/categories/:type`

**Users:**
- GET `/api/users`
- GET `/api/users/:id`
- POST `/api/users`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

**Profile:**
- GET `/api/profile`
- PUT `/api/profile`
- GET `/api/profile/products`
- GET `/api/profile/export-pdf`

**Statistics:**
- GET `/api/stats/overview`
- GET `/api/stats/by-department`
- GET `/api/stats/by-year`

---

## 📝 Notes quan trọng

1. **Mock data** hiện tại chỉ lưu trong memory, sẽ reset khi refresh page
2. **File upload** chỉ demo UI, không thực sự upload lên server
3. **PDF export** chỉ show alert, chưa generate file thực
4. **Email notifications** chưa implement
5. **Real-time updates** chưa có (cần WebSocket)

Để production, cần:
- Backend API
- Database (PostgreSQL/MySQL)
- File storage (S3/MinIO)
- Authentication (JWT/OAuth)
- Email service
- PDF generation library

---

🎉 **Hệ thống đã sẵn sàng cho demo đầy đủ!**
