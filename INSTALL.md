# Hướng dẫn Cài đặt Chi tiết

## 📋 Yêu cầu hệ thống

- **Node.js**: Phiên bản 18.0.0 trở lên
- **npm**: Phiên bản 9.0.0 trở lên (đi kèm với Node.js)
- **Hệ điều hành**: Windows, macOS, hoặc Linux
- **RAM**: Tối thiểu 4GB
- **Dung lượng ổ cứng**: ~500MB cho node_modules

## 🔧 Cài đặt Node.js

### Windows
1. Tải Node.js từ: https://nodejs.org/
2. Chọn phiên bản LTS (Long Term Support)
3. Chạy file cài đặt và làm theo hướng dẫn
4. Kiểm tra cài đặt:
```bash
node --version
npm --version
```

### macOS
```bash
# Sử dụng Homebrew
brew install node

# Hoặc tải từ website
# https://nodejs.org/
```

### Linux (Ubuntu/Debian)
```bash
# Cài đặt Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Kiểm tra
node --version
npm --version
```

## 📦 Cài đặt Dự án

### Bước 1: Giải nén file
Giải nén file `ql-nckh-umt.zip` vào thư mục bạn muốn

### Bước 2: Mở Terminal/Command Prompt
```bash
# Di chuyển vào thư mục dự án
cd ql-nckh-umt
```

### Bước 3: Cài đặt dependencies
```bash
npm install
```

**Lưu ý**: Quá trình này có thể mất 2-5 phút tùy vào tốc độ mạng

Nếu gặp lỗi, thử:
```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Cài lại
npm install
```

### Bước 4: Chạy ứng dụng
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:5173**

Mở trình duyệt và truy cập địa chỉ trên để sử dụng

## 🎯 Đăng nhập

Sử dụng một trong các tài khoản sau (mật khẩu: **demo123**):

### Giảng viên
- Email: `nvana@umt.edu.vn`
- Mật khẩu: `demo123`

### Lãnh đạo Khoa
- Email: `ttbinh@umt.edu.vn`
- Mật khẩu: `demo123`

### Phòng KHCN
- Email: `lvcuong@umt.edu.vn`
- Mật khẩu: `demo123`

### Ban Giám hiệu
- Email: `ptdung@umt.edu.vn`
- Mật khẩu: `demo123`

### Admin
- Email: `admin@umt.edu.vn`
- Mật khẩu: `demo123`

## 🛠️ Các lệnh hữu ích

### Chạy development server
```bash
npm run dev
```
Chế độ phát triển với hot reload

### Build cho production
```bash
npm run build
```
Tạo bản build tối ưu trong thư mục `dist/`

### Preview production build
```bash
npm run preview
```
Xem trước bản build production

### Dừng server
Nhấn `Ctrl + C` trong terminal

## ⚠️ Xử lý lỗi thường gặp

### Lỗi: "npm: command not found"
**Nguyên nhân**: Node.js chưa được cài đặt hoặc chưa được thêm vào PATH

**Giải pháp**: 
- Cài đặt lại Node.js
- Khởi động lại terminal/command prompt
- Kiểm tra PATH environment variable

### Lỗi: "EACCES: permission denied"
**Nguyên nhân**: Không có quyền truy cập

**Giải pháp** (Linux/macOS):
```bash
sudo npm install
# Hoặc
sudo chown -R $USER ~/.npm
```

### Lỗi: "Port 5173 is already in use"
**Nguyên nhân**: Cổng 5173 đang được sử dụng

**Giải pháp**:
```bash
# Dừng process đang dùng port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:5173 | xargs kill
```

### Lỗi: Module not found
**Giải pháp**:
```bash
# Xóa và cài lại dependencies
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: "Cannot find module 'vite'"
**Giải pháp**:
```bash
npm install vite --save-dev
```

## 🌐 Thay đổi Port

Nếu muốn chạy trên port khác (ví dụ: 3000):

Chỉnh sửa file `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Thêm dòng này
  },
})
```

## 📱 Truy cập từ thiết bị khác

Để truy cập từ điện thoại hoặc máy tính khác trong cùng mạng:

1. Chỉnh sửa `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Cho phép truy cập từ bên ngoài
    port: 5173,
  },
})
```

2. Tìm địa chỉ IP của máy:
```bash
# Windows
ipconfig

# Linux/macOS
ifconfig
```

3. Truy cập từ thiết bị khác: `http://<IP-address>:5173`

## 💡 Tips

- Sử dụng Chrome hoặc Edge để có trải nghiệm tốt nhất
- Mở DevTools (F12) để xem console logs nếu có lỗi
- Refresh trang (F5) nếu gặp lỗi hiển thị
- Xóa cache trình duyệt nếu thay đổi không hiển thị

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Node.js version: `node --version` (phải >= 18.0.0)
2. npm version: `npm --version` (phải >= 9.0.0)
3. Console logs trong terminal
4. Browser console (F12)

## 🔒 Bảo mật

**LƯU Ý**: Đây là ứng dụng demo/mockup:
- Mật khẩu là hardcoded
- Không có backend thực tế
- Dữ liệu không được lưu trữ
- Chỉ dùng cho mục đích demo/testing

Để triển khai production, cần:
- Backend API
- Database
- Authentication system
- HTTPS/SSL
- Proper security measures

---

**Chúc bạn sử dụng thành công!** 🎉
