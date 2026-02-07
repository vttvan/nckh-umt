# API Reference - Backend Integration Guide

## 📖 Tổng quan

Tài liệu này mô tả các API endpoints cần thiết để tích hợp backend cho hệ thống Quản lý NCKH UMT.

---

## 🔐 Authentication

### Base URL
```
Production: https://api.qlnckh.umt.edu.vn/api/v1
Development: http://localhost:3000/api/v1
```

### Headers
```http
Content-Type: application/json
Authorization: Bearer {token}
```

---

## 🔑 AUTH - Xác thực

### POST /auth/login
Đăng nhập hệ thống

**Request:**
```json
{
  "email": "nvana@umt.edu.vn",
  "password": "demo123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "1",
      "name": "TS. Nguyễn Văn An",
      "email": "nvana@umt.edu.vn",
      "role": "lecturer",
      "department": "Khoa Công nghệ Thông tin"
    }
  }
}
```

**Response (401):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email hoặc mật khẩu không đúng"
  }
}
```

---

### POST /auth/logout
Đăng xuất

**Request:** (chỉ cần token trong header)

**Response (200):**
```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

---

### GET /auth/me
Lấy thông tin user hiện tại

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "TS. Nguyễn Văn An",
    "email": "nvana@umt.edu.vn",
    "role": "lecturer",
    "department": "Khoa Công nghệ Thông tin"
  }
}
```

---

## 📝 PRODUCTS - Sản phẩm KHCN

### GET /products
Lấy danh sách sản phẩm (có phân trang, filter)

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 10)
status: string (pending_dean | pending_research | approved | rejected)
type: string (Q1 | Q2 | Q3 | Q4 | project_*)
department: string
submittedBy: string (user_id)
search: string (tìm theo tiêu đề)
```

**Request:**
```http
GET /products?page=1&limit=10&status=pending_dean&department=Khoa CNTT
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "RP001",
        "title": "Machine Learning Approaches...",
        "type": "Q1",
        "authors": [
          {
            "name": "Nguyễn Văn An",
            "percentage": 60,
            "isCorresponding": true
          }
        ],
        "submittedBy": "1",
        "submittedDate": "2025-02-05",
        "status": "pending_dean",
        "hours": 1170,
        "evidence": ["paper_q1_001.pdf"],
        "department": "Khoa Công nghệ Thông tin",
        "createdAt": "2025-02-05T10:30:00Z",
        "updatedAt": "2025-02-05T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

---

### GET /products/:id
Lấy chi tiết một sản phẩm

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "RP001",
    "title": "Machine Learning Approaches...",
    "type": "Q1",
    "authors": [...],
    "submittedBy": "1",
    "submittedDate": "2025-02-05",
    "status": "pending_dean",
    "hours": 1170,
    "evidence": ["paper_q1_001.pdf"],
    "department": "Khoa Công nghệ Thông tin",
    "journalName": "IEEE Transactions...",
    "doi": "10.1109/...",
    "issn": "2162-237X",
    "abstract": "This paper presents...",
    "reviewComments": [
      {
        "reviewer": "PGS.TS. Trần Thị Bình",
        "role": "Trưởng khoa CNTT",
        "comment": "Bài báo có chất lượng tốt...",
        "date": "2025-02-06T14:30:00Z",
        "action": "approved"
      }
    ],
    "createdAt": "2025-02-05T10:30:00Z",
    "updatedAt": "2025-02-06T14:30:00Z"
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Không tìm thấy sản phẩm"
  }
}
```

---

### POST /products
Tạo sản phẩm mới (Đăng ký NCKH)

**Request:**
```json
{
  "title": "Machine Learning Approaches for Predicting...",
  "type": "Q1",
  "abstract": "This paper presents...",
  "authors": [
    {
      "name": "Nguyễn Văn An",
      "percentage": 60,
      "isCorresponding": true
    },
    {
      "name": "Trần Thị Bình",
      "percentage": 40,
      "isCorresponding": false
    }
  ],
  "journalName": "IEEE Transactions on Neural Networks",
  "doi": "10.1109/TNNLS.2024.123456",
  "issn": "2162-237X",
  "evidence": [
    "base64_encoded_file_1",
    "base64_encoded_file_2"
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "RP006",
    "title": "Machine Learning Approaches...",
    "status": "pending_dean",
    "createdAt": "2025-02-07T10:00:00Z"
  },
  "message": "Đăng ký sản phẩm thành công"
}
```

**Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      {
        "field": "authors",
        "message": "Tổng tỷ lệ đóng góp phải bằng 100%"
      }
    ]
  }
}
```

---

### PUT /products/:id
Cập nhật sản phẩm (chỉ khi status = draft)

**Request:** (tương tự POST)

**Response (200):**
```json
{
  "success": true,
  "data": {...},
  "message": "Cập nhật sản phẩm thành công"
}
```

---

### DELETE /products/:id
Xóa sản phẩm (chỉ khi status = draft)

**Response (200):**
```json
{
  "success": true,
  "message": "Xóa sản phẩm thành công"
}
```

**Response (403):**
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Không thể xóa sản phẩm đã gửi phê duyệt"
  }
}
```

---

### PUT /products/:id/approve
Phê duyệt sản phẩm

**Request:**
```json
{
  "comment": "Bài báo có chất lượng tốt, đóng góp rõ ràng."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "RP001",
    "status": "pending_research", // hoặc "approved" nếu là Phòng KHCN
    "reviewComments": [...]
  },
  "message": "Phê duyệt sản phẩm thành công"
}
```

**Response (403):**
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Bạn không có quyền phê duyệt sản phẩm này"
  }
}
```

---

### PUT /products/:id/reject
Từ chối sản phẩm

**Request:**
```json
{
  "comment": "Kỷ yếu hội nghị chưa được xác nhận trong Scopus. Yêu cầu bổ sung minh chứng."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "RP001",
    "status": "rejected",
    "reviewComments": [...]
  },
  "message": "Từ chối sản phẩm thành công"
}
```

---

## 📅 PERIODS - Đợt đăng ký

### GET /periods
Lấy danh sách đợt đăng ký

**Query Parameters:**
```
status: string (upcoming | active | closed)
academicYear: string (2024-2025)
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Đợt đăng ký NCKH học kỳ 1 năm 2025-2026",
      "startDate": "2025-09-01",
      "endDate": "2025-09-30",
      "academicYear": "2025-2026",
      "status": "upcoming",
      "createdAt": "2025-02-01T10:00:00Z",
      "updatedAt": "2025-02-01T10:00:00Z"
    }
  ]
}
```

---

### GET /periods/:id
Lấy chi tiết một đợt

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Đợt đăng ký NCKH học kỳ 1 năm 2025-2026",
    "startDate": "2025-09-01",
    "endDate": "2025-09-30",
    "academicYear": "2025-2026",
    "status": "upcoming",
    "totalProducts": 0,
    "createdAt": "2025-02-01T10:00:00Z",
    "updatedAt": "2025-02-01T10:00:00Z"
  }
}
```

---

### POST /periods
Tạo đợt đăng ký mới

**Request:**
```json
{
  "name": "Đợt đăng ký NCKH học kỳ 1 năm 2025-2026",
  "startDate": "2025-09-01",
  "endDate": "2025-09-30",
  "academicYear": "2025-2026",
  "status": "upcoming"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "4",
    "name": "Đợt đăng ký NCKH học kỳ 1 năm 2025-2026",
    ...
  },
  "message": "Tạo đợt đăng ký thành công"
}
```

---

### PUT /periods/:id
Cập nhật đợt đăng ký

**Request:** (tương tự POST)

**Response (200):**
```json
{
  "success": true,
  "data": {...},
  "message": "Cập nhật đợt đăng ký thành công"
}
```

---

### DELETE /periods/:id
Xóa đợt đăng ký

**Response (200):**
```json
{
  "success": true,
  "message": "Xóa đợt đăng ký thành công"
}
```

**Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Không thể xóa đợt đã có sản phẩm đăng ký"
  }
}
```

---

## 📚 CATEGORIES - Danh mục sản phẩm

### GET /categories
Lấy danh sách danh mục

**Query Parameters:**
```
type: string (paper | project)
search: string
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "type": "Q1",
      "name": "Bài báo Q1 (Scopus/ISI)",
      "hours": 1170,
      "description": "Tạp chí hàng đầu",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### GET /categories/:type
Lấy chi tiết một danh mục

**Response (200):**
```json
{
  "success": true,
  "data": {
    "type": "Q1",
    "name": "Bài báo Q1 (Scopus/ISI)",
    "hours": 1170,
    "description": "Tạp chí hàng đầu",
    "totalProducts": 15,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

---

### POST /categories
Tạo danh mục mới

**Request:**
```json
{
  "type": "Q1A",
  "name": "Bài báo Q1 tạp chí A*",
  "hours": 1500,
  "description": "Tạp chí thuộc danh sách A*"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "type": "Q1A",
    ...
  },
  "message": "Tạo danh mục thành công"
}
```

**Response (409):**
```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "Mã danh mục đã tồn tại"
  }
}
```

---

### PUT /categories/:type
Cập nhật danh mục

**Request:**
```json
{
  "name": "Bài báo Q1 tạp chí A* (cập nhật)",
  "hours": 1600,
  "description": "Tạp chí thuộc danh sách A* - Cập nhật 2025"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {...},
  "message": "Cập nhật danh mục thành công"
}
```

---

### DELETE /categories/:type
Xóa danh mục

**Response (200):**
```json
{
  "success": true,
  "message": "Xóa danh mục thành công"
}
```

**Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Không thể xóa danh mục đang có sản phẩm sử dụng"
  }
}
```

---

## 👤 PROFILE - Hồ sơ năng lực

### GET /profile
Lấy hồ sơ năng lực của user hiện tại

**Query Parameters:**
```
year: string (2024-2025)
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "name": "TS. Nguyễn Văn An",
      "email": "nvana@umt.edu.vn",
      "department": "Khoa Công nghệ Thông tin",
      "position": "Giảng viên",
      "degree": "Tiến sĩ",
      "major": "Công nghệ Thông tin"
    },
    "statistics": {
      "totalProducts": 5,
      "totalHours": 3500,
      "productsByType": {
        "Q1": 2,
        "Q2": 1,
        "project_university": 2
      }
    },
    "products": [...], // Danh sách sản phẩm đã công nhận
    "interests": ["Machine Learning", "AI", "Data Science"]
  }
}
```

---

### PUT /profile
Cập nhật thông tin cá nhân

**Request:**
```json
{
  "position": "Giảng viên chính",
  "major": "Công nghệ Thông tin",
  "interests": ["Machine Learning", "AI", "Deep Learning"]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {...},
  "message": "Cập nhật hồ sơ thành công"
}
```

---

### GET /profile/export-pdf
Xuất PDF hồ sơ năng lực

**Response (200):**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="ho-so-nckh-nguyen-van-an.pdf"

[Binary PDF data]
```

---

## 📊 STATISTICS - Thống kê

### GET /stats/overview
Thống kê tổng quan

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalProducts": 150,
    "totalHours": 175000,
    "byStatus": {
      "pending_dean": 10,
      "pending_research": 5,
      "approved": 120,
      "rejected": 15
    },
    "byType": {
      "Q1": 20,
      "Q2": 30,
      "Q3": 25,
      "Q4": 15,
      "project_international": 5,
      "project_national": 10,
      ...
    },
    "byDepartment": {
      "Khoa Công nghệ Thông tin": 60,
      "Khoa Kinh tế": 40,
      "Khoa Kỹ thuật": 50
    }
  }
}
```

---

### GET /stats/by-department/:departmentId
Thống kê theo Khoa

**Response (200):**
```json
{
  "success": true,
  "data": {
    "department": "Khoa Công nghệ Thông tin",
    "totalProducts": 60,
    "totalHours": 70000,
    "byLecturer": [
      {
        "id": "1",
        "name": "TS. Nguyễn Văn An",
        "totalProducts": 5,
        "totalHours": 3500
      },
      ...
    ]
  }
}
```

---

### GET /stats/by-year/:year
Thống kê theo năm học

**Response (200):**
```json
{
  "success": true,
  "data": {
    "year": "2024-2025",
    "totalProducts": 80,
    "totalHours": 95000,
    "byMonth": {
      "2024-09": 10,
      "2024-10": 15,
      "2024-11": 12,
      ...
    }
  }
}
```

---

## 🔔 NOTIFICATIONS - Thông báo (Optional)

### GET /notifications
Lấy danh sách thông báo

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "type": "product_approved",
      "title": "Sản phẩm đã được phê duyệt",
      "message": "Sản phẩm 'Machine Learning...' đã được Phòng KHCN phê duyệt",
      "read": false,
      "createdAt": "2025-02-07T10:00:00Z"
    }
  ]
}
```

---

### PUT /notifications/:id/read
Đánh dấu đã đọc

**Response (200):**
```json
{
  "success": true,
  "message": "Đã đánh dấu thông báo"
}
```

---

## 📁 FILES - Upload files (Optional)

### POST /files/upload
Upload file minh chứng

**Request:** (multipart/form-data)
```
file: [binary data]
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.umt.edu.vn/evidence/paper_q1_001.pdf",
    "filename": "paper_q1_001.pdf",
    "size": 1024000,
    "mimeType": "application/pdf"
  }
}
```

---

## 🚨 Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Dữ liệu không hợp lệ |
| UNAUTHORIZED | 401 | Chưa đăng nhập |
| FORBIDDEN | 403 | Không có quyền |
| NOT_FOUND | 404 | Không tìm thấy |
| CONFLICT | 409 | Conflict (duplicate key) |
| INTERNAL_ERROR | 500 | Lỗi server |

---

## 🔒 Security

### Rate Limiting
```
Login: 5 requests / 15 minutes
API: 100 requests / minute
```

### CORS
```
Allowed Origins: https://qlnckh.umt.edu.vn
```

### JWT Expiration
```
Access Token: 1 hour
Refresh Token: 7 days
```

---

## 🧪 Testing

### Postman Collection
Tải tại: `docs/postman/QLNCKH_API.postman_collection.json`

### Sample cURL
```bash
# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nvana@umt.edu.vn","password":"demo123"}'

# Get products
curl -X GET http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer {token}"
```

---

## 📝 Notes

1. Tất cả dates theo ISO 8601 format
2. Pagination mặc định: page=1, limit=10
3. File upload max size: 10MB
4. Token refresh tự động khi expire
5. WebSocket endpoint (optional): `/ws` cho real-time notifications

---

🎉 **Happy Coding!**
