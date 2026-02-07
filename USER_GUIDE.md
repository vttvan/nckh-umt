# Hướng dẫn Sử dụng - Hệ thống Quản lý NCKH UMT

## 📚 Mục lục
1. [Đăng nhập](#đăng-nhập)
2. [Giảng viên](#giảng-viên)
3. [Lãnh đạo Khoa](#lãnh-đạo-khoa)
4. [Phòng KHCN](#phòng-khcn)
5. [Mẹo sử dụng](#mẹo-sử-dụng)

---

## 🔐 Đăng nhập

### Tài khoản demo (mật khẩu: `demo123`)

| Email | Vai trò | Tính năng chính |
|-------|---------|-----------------|
| an.nguywn@umt.edu.vn | Giảng viên | Đăng ký, xem sản phẩm, hồ sơ |
| thu.tran@umt.edu.vn | Lãnh đạo Khoa | Phê duyệt cấp Khoa |
| hung.ngo@umt.edu.vn | Phòng KHCN | Quản lý hệ thống, phê duyệt cuối |
| tuan.nguyen@umt.edu.vn | Ban Giám hiệu | Xem báo cáo |
| admin@umt.edu.vn | Admin | Quản trị |

### Bước đăng nhập:
1. Mở trình duyệt: `http://localhost:5173`
2. Nhập email và mật khẩu
3. Click "Đăng nhập"

---

## 👨‍🏫 GIẢNG VIÊN

### A. ĐĂNG KÝ SẢN PHẨM KHCN MỚI

#### Bước 1: Thông tin cơ bản

**1.1. Chọn loại sản phẩm**
- Click dropdown "Loại sản phẩm KHCN"
- Chọn một trong các loại:
  - **Bài báo quốc tế:** Q1, Q2, Q3, Q4, Nature/Science, Kỷ yếu Scopus
  - **Đề tài nghiên cứu:** Quốc tế, Nhà nước, Bộ, Tỉnh, Trường
- Giờ quy đổi sẽ hiển thị tự động

💡 **Tip:** Xem kỹ giờ quy đổi để biết sản phẩm được tính bao nhiêu giờ NCKH

**1.2. Nhập tiêu đề**
- Gõ tiêu đề đầy đủ của sản phẩm
- Ví dụ: "Machine Learning Approaches for Predicting Student Performance..."

**1.3. Nhập tóm tắt (không bắt buộc)**
- Mô tả ngắn gọn nội dung sản phẩm
- Giúp người phê duyệt hiểu nhanh

**1.4. Click "Tiếp tục"**

#### Bước 2: Thông tin tác giả

**2.1. Tác giả đầu tiên (tự động là bạn)**
- Họ tên: Đã điền sẵn
- Tỷ lệ đóng góp: Mặc định 100%
- Tác giả liên hệ: Mặc định checked

**2.2. Thêm tác giả khác**
- Click button "➕ Thêm tác giả"
- Nhập họ tên
- Nhập tỷ lệ đóng góp (%)
- Check "Tác giả liên hệ" nếu là corresponding author

**2.3. Phân bổ tỷ lệ**
```
Ví dụ 1: Bài báo 2 tác giả
- Tác giả A: 60%
- Tác giả B: 40%
✅ Tổng = 100%

Ví dụ 2: Đề tài 3 tác giả
- Tác giả A: 50%
- Tác giả B: 30%
- Tác giả C: 20%
✅ Tổng = 100%
```

⚠️ **Lưu ý:**
- Tổng tỷ lệ PHẢI bằng 100%
- Phải có ít nhất 1 tác giả liên hệ
- Để xóa tác giả, click icon 🗑️

**2.4. Click "Tiếp tục"**

#### Bước 3: Chi tiết và minh chứng

**3.1. Nhập thông tin bài báo** (nếu chọn Q1-Q4, Scopus)
- Tên tạp chí: Ví dụ "IEEE Transactions on Neural Networks"
- DOI: Ví dụ "10.1109/TNNLS.2024.123456"
- ISSN (không bắt buộc): Ví dụ "2162-237X"

**3.2. Nhập thông tin đề tài** (nếu chọn project_*)
- Mã đề tài: Ví dụ "B2024-01-123"
- Thời gian thực hiện: Ví dụ "24 tháng"
- Kinh phí: Ví dụ "100.000.000"

**3.3. Upload minh chứng**

**Cách upload:**
1. Click vào khung "Kéo thả file hoặc click để chọn"
2. Hoặc click button "Chọn file"
3. Chọn 1 hoặc nhiều file từ máy tính
4. File sẽ hiển thị trong danh sách

**Loại file chấp nhận:**
- PDF (bài báo, quyết định)
- DOC, DOCX (tài liệu)
- JPG, PNG (scan giấy tờ)

**Kích thước:** Tối đa 10MB/file

**Xóa file:** Click icon 🗑️ bên cạnh file

📌 **Minh chứng cần thiết:**
- **Bài báo:** File PDF bài báo đã publish
- **Đề tài:** Quyết định giao đề tài, hợp đồng, nghiệm thu

**3.4. Click "Tiếp tục"**

#### Bước 4: Xác nhận

**4.1. Xem lại thông tin**
- Kiểm tra lại tất cả thông tin đã nhập
- Đảm bảo không có sai sót

**4.2. Gửi đăng ký**
- Click button "✅ Gửi đăng ký"
- Chờ message thành công
- Sản phẩm sẽ được gửi đến Lãnh đạo Khoa để phê duyệt

✅ **Thành công!** Bạn sẽ thấy thông báo xanh với thông tin sản phẩm vừa đăng ký.

---

### B. XEM SẢN PHẨM CỦA TÔI

**B.1. Vào trang Sản phẩm**
- Click menu "Sản phẩm của tôi" hoặc
- Click button "Xem sản phẩm chờ duyệt" ở trang chủ

**B.2. Tìm kiếm sản phẩm**
- Gõ từ khóa vào ô tìm kiếm
- Hệ thống tự động lọc theo tiêu đề

**B.3. Lọc theo trạng thái**
- Chọn dropdown "Tất cả trạng thái"
- Các lựa chọn:
  - **Nháp:** Chưa gửi (không có trong demo này)
  - **Chờ Khoa duyệt:** Đang chờ Trưởng khoa phê duyệt
  - **Chờ Phòng KHCN:** Đang chờ phòng KHCN phê duyệt cuối
  - **Đã phê duyệt:** Đã được công nhận, tính giờ NCKH
  - **Từ chối:** Không được duyệt, cần chỉnh sửa

**B.4. Xem chi tiết sản phẩm**
1. Click button "Xem chi tiết" trên card sản phẩm
2. Modal hiển thị:
   - Tiêu đề
   - Loại sản phẩm
   - Danh sách tác giả và tỷ lệ
   - Giờ quy đổi
   - Lịch sử phê duyệt (comments từ Khoa, Phòng KHCN)

**B.5. Đọc ý kiến phê duyệt**
- Nếu có comments, xem:
  - Người phê duyệt
  - Vai trò
  - Nhận xét
  - Hành động (Đã duyệt/Từ chối/Yêu cầu sửa)
  - Ngày giờ

💡 **Tip:** Nếu bị từ chối, đọc kỹ lý do để chỉnh sửa và nộp lại.

---

### C. XEM HỒ SƠ NĂNG LỰC

**C.1. Vào trang Hồ sơ**
- Click menu "Hồ sơ năng lực" hoặc
- Click button "Xem hồ sơ năng lực" ở trang chủ

**C.2. Xem thống kê tổng quan**
- **Card 1:** Tổng sản phẩm đã công nhận
- **Card 2:** Tổng giờ NCKH tích lũy
- **Card 3:** Năm học hiện tại đang xét

**C.3. Lọc theo năm học**
- Chọn dropdown "Lọc theo năm học"
- Chọn năm muốn xem (2024-2025, 2023-2024...)
- Dữ liệu tự động cập nhật

**C.4. Xem thống kê theo loại**
- Xem số lượng từng loại sản phẩm (Q1, Q2, đề tài...)
- Biết mình mạnh về loại nào

**C.5. Xem danh sách công trình**
- Tất cả sản phẩm đã được công nhận
- Hiển thị:
  - STT
  - Loại (badge màu)
  - Giờ quy đổi (badge màu)
  - Tiêu đề
  - Tác giả và %
  - Ngày công nhận

**C.6. Xem thông tin cá nhân**
- Họ tên, Email, Đơn vị
- Chức danh, Trình độ, Chuyên ngành
- Click "✏️ Chỉnh sửa" để update (demo)

**C.7. Xem/Thêm lĩnh vực nghiên cứu**
- Các lĩnh vực hiện tại: Machine Learning, AI, Data Science...
- Click "➕ Thêm" để thêm lĩnh vực mới (demo)

**C.8. Xuất PDF**
- Click button "📥 Xuất PDF"
- Tải xuống hồ sơ năng lực (demo - chỉ show alert)

---

## 👔 LÃNH ĐẠO KHOA

### A. XEM DANH SÁCH CHỜ PHÊ DUYỆT

**A.1. Vào trang Chờ phê duyệt**
- Click menu "Chờ phê duyệt"
- Hoặc click button "Phê duyệt hồ sơ" ở trang chủ

**A.2. Xem danh sách**
- Hiển thị các sản phẩm có status = "pending_dean"
- Chỉ hiển thị sản phẩm của Khoa mình
- Ví dụ: Khoa CNTT chỉ thấy sản phẩm của CNTT

**A.3. Click "Xem chi tiết"**
- Modal mở ra với đầy đủ thông tin

---

### B. PHÊ DUYỆT SẢN PHẨM

**B.1. Trong modal chi tiết, xem kỹ:**
- Tiêu đề
- Loại sản phẩm
- Tác giả và tỷ lệ
- Giờ quy đổi
- Minh chứng (click để xem)

**B.2. Quyết định phê duyệt**

#### ✅ PHƯƠNG ÁN 1: Phê duyệt
1. Click button "✅ Phê duyệt"
2. Nhập nhận xét (không bắt buộc)
   - Ví dụ: "Bài báo có chất lượng tốt, đóng góp rõ ràng. Phê duyệt."
3. Click "Xác nhận phê duyệt"
4. Status chuyển sang "pending_research" (chờ Phòng KHCN)

#### ❌ PHƯƠNG ÁN 2: Từ chối
1. Click button "❌ Từ chối"
2. Nhập lý do (BẮT BUỘC)
   - Ví dụ: "Kỷ yếu hội nghị chưa được xác nhận trong Scopus. Yêu cầu bổ sung minh chứng."
3. Click "Xác nhận từ chối"
4. Status chuyển sang "rejected"
5. Giảng viên sẽ thấy lý do và có thể nộp lại

💡 **Tip phê duyệt tốt:**
- Kiểm tra tên tác giả khớp với giảng viên
- Kiểm tra minh chứng đầy đủ, rõ ràng
- Nếu từ chối, viết lý do cụ thể để GV sửa được

---

## 🏢 PHÒNG KHCN

### A. QUẢN LÝ ĐỢT ĐĂNG KÝ

#### A.1. Xem danh sách đợt

**Vào trang:**
- Click menu "Quản lý đợt đăng ký"

**Xem thống kê:**
- Tổng số đợt
- Số đợt đang mở
- Số đợt sắp tới

**Danh sách hiển thị:**
- Tên đợt
- Badge trạng thái (Sắp mở/Đang mở/Đã đóng)
- Icon trạng thái
- Năm học
- Ngày bắt đầu - Ngày kết thúc

---

#### A.2. TẠO ĐỢT MỚI

**Bước 1: Click button "➕ Tạo đợt mới"**

**Bước 2: Điền form**

| Field | Bắt buộc | Ví dụ | Ghi chú |
|-------|----------|-------|---------|
| Tên đợt | ✅ | Đợt đăng ký NCKH học kỳ 1 năm 2025-2026 | Tên rõ ràng, đầy đủ |
| Năm học | ✅ | 2025-2026 | Theo định dạng YYYY-YYYY |
| Ngày bắt đầu | ✅ | 01/09/2025 | Click date picker |
| Ngày kết thúc | ✅ | 30/09/2025 | Phải sau ngày bắt đầu |
| Trạng thái | ✅ | Sắp mở | Upcoming/Active/Closed |

**Bước 3: Click "Tạo đợt đăng ký"**

✅ **Kết quả:** Đợt mới xuất hiện ở đầu danh sách

⚠️ **Lưu ý:**
- Chỉ nên có 1 đợt "Đang mở" cùng lúc
- Giảng viên chỉ đăng ký được trong đợt "Đang mở"
- Đợt "Sắp mở" sẽ tự động chuyển sang "Đang mở" khi đến ngày (thủ công trong demo)

---

#### A.3. CHỈNH SỬA ĐỢT

**Use case:** Cần gia hạn thời gian đăng ký

**Bước 1: Click icon ✏️ bên cạnh đợt cần sửa**

**Bước 2: Form hiển thị với dữ liệu hiện tại**

**Bước 3: Sửa các field cần thiết**
- Ví dụ: Sửa "Ngày kết thúc" từ 30/09 thành 15/10

**Bước 4: Click "Cập nhật"**

✅ **Kết quả:** Thông tin đợt được cập nhật

---

#### A.4. XÓA ĐỢT

**Use case:** Tạo nhầm hoặc hủy đợt

**Bước 1: Click icon 🗑️ bên cạnh đợt cần xóa**

**Bước 2: Confirm dialog xuất hiện**
- "Bạn có chắc muốn xóa đợt đăng ký này?"

**Bước 3: Click "OK"**

✅ **Kết quả:** Đợt bị xóa khỏi danh sách

⚠️ **Cảnh báo:** Không nên xóa đợt đã có sản phẩm đăng ký

---

### B. QUẢN LÝ DANH MỤC SẢN PHẨM

#### B.1. Xem danh sách danh mục

**Vào trang:**
- Click menu "Danh mục sản phẩm"

**Xem thống kê:**
- Tổng danh mục
- Số bài báo/kỷ yếu
- Số đề tài

**Danh sách hiển thị:**
- Phân 2 nhóm:
  - 📰 **Bài báo & Kỷ yếu quốc tế** (không có prefix project_)
  - 🔬 **Đề tài nghiên cứu** (có prefix project_)
- Mỗi item hiển thị:
  - Icon theo loại
  - Tên danh mục
  - Mã (type) - badge
  - Giờ quy đổi - highlighted
  - Mô tả

---

#### B.2. TÌM KIẾM DANH MỤC

**Use case:** Tìm nhanh danh mục Q1

**Bước 1: Gõ "Q1" vào ô search**

**Bước 2: Kết quả tự động lọc**
- Chỉ hiển thị danh mục có "Q1" trong tên hoặc mã

💡 **Tip:** Có thể tìm theo tên tiếng Việt hoặc mã tiếng Anh

---

#### B.3. LỌC THEO LOẠI

**Use case:** Chỉ xem các đề tài

**Bước 1: Click dropdown "Filter"**

**Bước 2: Chọn "Đề tài"**

**Bước 3: Chỉ hiển thị các đề tài (project_*)**

**Các lựa chọn:**
- Tất cả (hiện tất cả)
- Bài báo/Kỷ yếu (không có project_)
- Đề tài (có project_)

---

#### B.4. THÊM DANH MỤC MỚI

**Use case:** Thêm loại Q1A (tạp chí A*)

**Bước 1: Click button "➕ Thêm danh mục"**

**Bước 2: Điền form**

| Field | Bắt buộc | Ví dụ | Ghi chú |
|-------|----------|-------|---------|
| Mã danh mục | ✅ | Q1A | Unique, không trùng |
| Tên danh mục | ✅ | Bài báo Q1 tạp chí A* | Tên đầy đủ |
| Giờ quy đổi | ✅ | 1500 | Số nguyên > 0 |
| Mô tả | ❌ | Tạp chí thuộc danh sách A* | Thêm chi tiết |

**Bước 3: Click "Thêm danh mục"**

✅ **Kết quả:** Danh mục mới xuất hiện trong danh sách (đúng nhóm)

**Ví dụ khác:**
```
Mã: project_eu
Tên: Đề tài EU Horizon
Giờ: 3000
Mô tả: Đề tài hợp tác EU Horizon 2020/2030
```

---

#### B.5. CHỈNH SỬA DANH MỤC

**Use case:** Cập nhật giờ quy đổi theo quy định mới

**Bước 1: Click icon ✏️ bên cạnh danh mục**

**Bước 2: Form hiển thị với data hiện tại**

**Chú ý:**
- ⚠️ Field "Mã danh mục" bị **disable** (không sửa được)
- Lý do: Mã là unique ID, đã có sản phẩm dùng mã này

**Bước 3: Sửa các field khác**
- Ví dụ: Sửa giờ quy đổi Q1 từ 1170 thành 1200

**Bước 4: Click "Cập nhật"**

✅ **Kết quả:** Thông tin cập nhật

⚠️ **Quan trọng:** Thay đổi giờ quy đổi KHÔNG ảnh hưởng sản phẩm đã công nhận trước đó.

---

#### B.6. XÓA DANH MỤC

**Use case:** Xóa danh mục không còn dùng

**Bước 1: Click icon 🗑️**

**Bước 2: Confirm dialog**
- "Bạn có chắc muốn xóa danh mục này? Thao tác không thể hoàn tác."

**Bước 3: Click "OK"**

✅ **Kết quả:** Danh mục bị xóa

⚠️ **Cảnh báo:** Không nên xóa danh mục đang/đã có sản phẩm sử dụng.

---

### C. PHÊ DUYỆT CUỐI CÙNG

**C.1. Vào trang Chờ phê duyệt**

**C.2. Xem danh sách**
- Hiển thị các sản phẩm có status = "pending_research"
- Là các sản phẩm đã được Khoa phê duyệt

**C.3. Quy trình phê duyệt**
- Tương tự Lãnh đạo Khoa
- Click "Xem chi tiết"
- Kiểm tra thông tin + minh chứng
- Click "✅ Phê duyệt" hoặc "❌ Từ chối"
- Nhập nhận xét/lý do
- Confirm

**C.4. Sau khi phê duyệt**
- Status chuyển sang "approved"
- Giờ NCKH được công nhận
- Tính vào hồ sơ năng lực của giảng viên

💡 **Tip kiểm tra:**
- Kiểm tra minh chứng đầy đủ, hợp lệ
- Kiểm tra DOI/mã đề tài có thật
- Kiểm tra tên tác giả đúng giảng viên trong hệ thống

---

## 💡 MẸO SỬ DỤNG

### 🔍 Tìm kiếm nhanh
- Dùng Ctrl+F (Cmd+F trên Mac) để tìm trong trang
- Gõ từ khóa vào search box để lọc

### ⌨️ Phím tắt
- Tab: Di chuyển giữa các field trong form
- Enter: Submit form (khi focus ở button)
- Esc: Đóng modal

### 📱 Responsive
- Hệ thống hoạt động tốt trên mobile
- Menu tự động collapse trên màn hình nhỏ
- Bảng tự động scroll ngang

### 🎨 Màu sắc trạng thái
- **Blue (Xanh dương):** Đang chờ, sắp mở
- **Emerald (Xanh lá):** Đã duyệt, đang mở, thành công
- **Amber (Vàng cam):** Cảnh báo, chờ xử lý
- **Red (Đỏ):** Từ chối, lỗi
- **Gray (Xám):** Đã đóng, không hoạt động

### 💾 Lưu dữ liệu
- **Mock data:** Dữ liệu chỉ lưu trong memory
- **Reset khi refresh:** F5 sẽ mất dữ liệu đã nhập
- **Giải pháp:** Cần backend API để lưu vĩnh viễn

### 🐛 Xử lý lỗi
- Đọc message lỗi màu đỏ dưới field
- Kiểm tra required fields (có dấu *)
- Kiểm tra format dữ liệu (email, số, ngày tháng)

### 📊 Export dữ liệu
- Button "Xuất PDF" hiện tại chỉ demo (alert)
- Cần backend để generate PDF thực

### 🔄 Refresh dữ liệu
- Click logo/tên hệ thống để về trang chủ
- Dữ liệu tự động load mới (trong production)

---

## ❓ FAQ

**Q: Tại sao không thấy sản phẩm vừa đăng ký?**
A: Kiểm tra trạng thái filter, có thể đang lọc trạng thái khác.

**Q: Làm sao biết sản phẩm đã được duyệt?**
A: Vào "Sản phẩm của tôi", tìm sản phẩm, xem badge màu xanh "Đã phê duyệt".

**Q: Upload file bị lỗi?**
A: Kiểm tra kích thước < 10MB, format đúng (PDF, DOC, JPG, PNG).

**Q: Quên mật khẩu?**
A: Demo dùng mật khẩu cố định "demo123". Production cần tính năng reset password.

**Q: Làm sao liên hệ hỗ trợ?**
A: Production cần có button/link "Liên hệ hỗ trợ" với email/hotline.

**Q: Tại sao tổng % tác giả không đủ 100%?**
A: Kiểm tra lại từng tác giả, tính lại tổng. Hệ thống sẽ báo lỗi nếu ≠ 100%.

**Q: Có giới hạn số sản phẩm đăng ký không?**
A: Không giới hạn trong demo. Production có thể giới hạn theo quy định.

---

## 📞 Liên hệ hỗ trợ

**Email:** support@umt.edu.vn  
**Hotline:** 1900-xxxx  
**Giờ làm việc:** 8:00 - 17:00 (Thứ 2 - Thứ 6)

---

🎉 **Chúc bạn sử dụng hệ thống hiệu quả!**
