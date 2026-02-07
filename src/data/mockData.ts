import { User, ResearchProduct, ProductCategory, RegistrationPeriod } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'TS. Nguyễn Văn An',
    email: 'an.nguyen@umt.edu.vn',
    role: 'lecturer',
    department: 'Khoa Công nghệ'
  },
  {
    id: '2',
    name: 'PGS.TS. Trần Đan Thư',
    email: 'thu.tran@umt.edu.vn',
    role: 'dean',
    department: 'Khoa Công nghệ'
  },
  {
    id: '3',
    name: 'TS. Ngô Minh Hùng',
    email: 'hung.ngo@umt.edu.vn',
    role: 'research_dept',
    department: 'Phòng KHCN'
  },
  {
    id: '4',
    name: 'TS. Nguyễn Cảnh Tuấn',
    email: 'tuan.nguyen@umt.edu.vn',
    role: 'rector',
    department: 'Ban Giám hiệu'
  },
  {
    id: '5',
    name: 'Admin',
    email: 'admin@umt.edu.vn',
    role: 'admin',
    department: 'Phòng Hành chính'
  },
  {
    id: '6',
    name: 'TS. Hoàng Văn Minh',
    email: 'hvminh@umt.edu.vn',
    role: 'lecturer',
    department: 'Khoa Công nghệ'
  },
  {
    id: '7',
    name: 'ThS. Vũ Thị Hoa',
    email: 'vthoa@umt.edu.vn',
    role: 'lecturer',
    department: 'Khoa Kinh doanh'
  },
  {
    id: '8',
    name: 'PGS.TS. Đặng Văn Nam',
    email: 'dvnam@umt.edu.vn',
    role: 'dean',
    department: 'Khoa Kinh doanh'
  }
];

// Product Categories
export const productCategories: ProductCategory[] = [
  {
    type: 'nature_science',
    name: 'Bài báo Nature, Science',
    hours: 2340,
    description: 'Tạp chí hàng đầu thế giới'
  },
  {
    type: 'Q1',
    name: 'Bài báo Q1 (Scopus/ISI)',
    hours: 1170,
    description: 'Tạp chí xếp hạng Q1'
  },
  {
    type: 'Q2',
    name: 'Bài báo Q2 (Scopus/ISI)',
    hours: 935,
    description: 'Tạp chí xếp hạng Q2'
  },
  {
    type: 'Q3',
    name: 'Bài báo Q3 (Scopus/ISI)',
    hours: 700,
    description: 'Tạp chí xếp hạng Q3'
  },
  {
    type: 'Q4',
    name: 'Bài báo Q4 (Scopus/ISI)',
    hours: 350,
    description: 'Tạp chí xếp hạng Q4'
  },
  {
    type: 'Scopus',
    name: 'Kỷ yếu hội nghị quốc tế (Scopus/ISI)',
    hours: 120,
    description: 'Kỷ yếu có trong Scopus/ISI'
  },
  {
    type: 'project_international',
    name: 'Đề tài cấp quốc tế',
    hours: 2340,
    description: 'Đề tài nghiên cứu quốc tế'
  },
  {
    type: 'project_national',
    name: 'Đề tài cấp Nhà nước',
    hours: 2040,
    description: 'Đề tài cấp Bộ, Nhà nước'
  },
  {
    type: 'project_ministry',
    name: 'Đề tài Nafosted, Bộ',
    hours: 1460,
    description: 'Đề tài cấp Bộ, Nafosted'
  },
  {
    type: 'project_provincial',
    name: 'Đề tài cấp Sở/Tỉnh/TP',
    hours: 870,
    description: 'Đề tài cấp địa phương'
  },
  {
    type: 'project_university',
    name: 'Đề tài cấp cơ sở',
    hours: 295,
    description: 'Đề tài cấp trường'
  }
];

// Mock Research Products - Nhiều đề tài và 4 sản phẩm chờ phê duyệt
export const mockResearchProducts: ResearchProduct[] = [
  // 4 sản phẩm chờ phê duyệt
  {
    id: 'RP001',
    title: 'Machine Learning Approaches for Predicting Student Performance in Online Learning Environments',
    type: 'Q1',
    authors: [
      { name: 'Nguyễn Văn An', percentage: 60, isCorresponding: true },
      { name: 'Trần Thị Bình', percentage: 40, isCorresponding: false }
    ],
    submittedBy: '1',
    submittedDate: '2025-02-05',
    status: 'pending_dean',
    hours: 1170,
    evidence: ['paper_q1_001.pdf', 'acceptance_letter.pdf'],
    reviewComments: [],
    department: 'Khoa Công nghệ'
  },
  {
    id: 'RP004',
    title: 'Phát triển hệ thống IoT thông minh cho nông nghiệp bền vững',
    type: 'project_provincial',
    authors: [
      { name: 'Hoàng Văn Minh', percentage: 60, isCorresponding: true },
      { name: 'Trần Thị Bình', percentage: 25, isCorresponding: false },
      { name: 'Nguyễn Văn An', percentage: 15, isCorresponding: false }
    ],
    submittedBy: '6',
    submittedDate: '2025-02-01',
    status: 'pending_dean',
    hours: 870,
    evidence: ['project_sso_decision.pdf', 'project_proposal.pdf'],
    reviewComments: [],
    department: 'Khoa Công nghệ'
  },
  {
    id: 'RP005',
    title: 'Nghiên cứu hành vi tiêu dùng trực tuyến của người dùng Việt Nam',
    type: 'project_university',
    authors: [
      { name: 'Vũ Thị Hoa', percentage: 100, isCorresponding: true }
    ],
    submittedBy: '7',
    submittedDate: '2025-02-03',
    status: 'pending_dean',
    hours: 295,
    evidence: ['project_umt_decision.pdf'],
    reviewComments: [],
    department: 'Khoa Kinh doanh'
  },
  {
    id: 'RP007',
    title: 'Ứng dụng AI trong dự đoán xu hướng thị trường chứng khoán',
    type: 'project_ministry',
    authors: [
      { name: 'Vũ Thị Hoa', percentage: 55, isCorresponding: true },
      { name: 'Đặng Văn Nam', percentage: 45, isCorresponding: false }
    ],
    submittedBy: '7',
    submittedDate: '2025-02-04',
    status: 'pending_dean',
    hours: 1460,
    evidence: ['project_nafosted.pdf', 'research_plan.pdf'],
    reviewComments: [],
    department: 'Khoa Kinh doanh'
  },
  
  // 1 sản phẩm chờ phê duyệt Phòng KHCN
  {
    id: 'RP003',
    title: 'Deep Learning for Medical Image Analysis: A Survey',
    type: 'Q2',
    authors: [
      { name: 'Hoàng Văn Minh', percentage: 70, isCorresponding: true },
      { name: 'Nguyễn Văn An', percentage: 30, isCorresponding: false }
    ],
    submittedBy: '6',
    submittedDate: '2025-01-20',
    status: 'pending_research',
    hours: 935,
    evidence: ['paper_q2_medical.pdf'],
    reviewComments: [
      {
        reviewer: 'PGS.TS. Trần Đan Thư',
        role: 'Trưởng khoa Công nghệ',
        comment: 'Bài báo chất lượng cao, đăng trên tạp chí uy tín. Phê duyệt.',
        date: '2025-01-25',
        action: 'approved'
      }
    ],
    department: 'Khoa Công nghệ'
  },
  
  // Các sản phẩm đã được phê duyệt (nhiều đề tài)
  {
    id: 'RP002',
    title: 'Nghiên cứu ứng dụng Blockchain trong quản lý chuỗi cung ứng',
    type: 'project_university',
    authors: [
      { name: 'Nguyễn Văn An', percentage: 50, isCorresponding: true },
      { name: 'Hoàng Văn Minh', percentage: 30, isCorresponding: false },
      { name: 'Ngô Minh Hùng', percentage: 20, isCorresponding: false }
    ],
    submittedBy: '1',
    submittedDate: '2024-09-15',
    status: 'approved',
    hours: 295,
    evidence: ['project_decision.pdf', 'project_report.pdf'],
    reviewComments: [
      {
        reviewer: 'PGS.TS. Trần Đan Thư',
        role: 'Trưởng khoa Công nghệ',
        comment: 'Đề tài có ý nghĩa thực tiễn cao, phù hợp định hướng của khoa',
        date: '2024-09-20',
        action: 'approved'
      },
      {
        reviewer: 'TS. Ngô Minh Hùng',
        role: 'Phòng KHCN',
        comment: 'Đề tài đã hoàn thành đúng tiến độ, nghiệm thu đạt yêu cầu',
        date: '2024-10-05',
        action: 'approved'
      }
    ],
    department: 'Khoa Công nghệ'
  },
  {
    id: 'RP006',
    title: 'Natural Language Processing for Vietnamese Text Classification',
    type: 'Q3',
    authors: [
      { name: 'Nguyễn Văn An', percentage: 100, isCorresponding: true }
    ],
    submittedBy: '1',
    submittedDate: '2024-11-10',
    status: 'approved',
    hours: 700,
    evidence: ['paper_q3_nlp.pdf'],
    reviewComments: [
      {
        reviewer: 'PGS.TS. Trần Đan Thư',
        role: 'Trưởng khoa Công nghệ',
        comment: 'Nghiên cứu có giá trị, đóng góp cho lĩnh vực NLP tiếng Việt',
        date: '2024-11-15',
        action: 'approved'
      },
      {
        reviewer: 'TS. Ngô Minh Hùng',
        role: 'Phòng KHCN',
        comment: 'Phê duyệt',
        date: '2024-11-20',
        action: 'approved'
      }
    ],
    department: 'Khoa Công nghệ'
  },
  {
    id: 'RP008',
    title: 'Cybersecurity Threats Detection using Machine Learning',
    type: 'Scopus',
    authors: [
      { name: 'Hoàng Văn Minh', percentage: 100, isCorresponding: true }
    ],
    submittedBy: '6',
    submittedDate: '2024-12-05',
    status: 'approved',
    hours: 120,
    evidence: ['conference_paper.pdf', 'acceptance_email.pdf'],
    reviewComments: [
      {
        reviewer: 'PGS.TS. Trần Đan Thư',
        role: 'Trưởng khoa Công nghệ',
        comment: 'Kỷ yếu hội nghị quốc tế uy tín, phê duyệt',
        date: '2024-12-10',
        action: 'approved'
      },
      {
        reviewer: 'TS. Ngô Minh Hùng',
        role: 'Phòng KHCN',
        comment: 'Đã xác nhận trong Scopus, phê duyệt',
        date: '2024-12-15',
        action: 'approved'
      }
    ],
    department: 'Khoa Công nghệ'
  },
  {
    id: 'RP009',
    title: 'Phát triển ứng dụng mobile hỗ trợ học tập trực tuyến',
    type: 'project_university',
    authors: [
      { name: 'Nguyễn Văn An', percentage: 50, isCorresponding: true },
      { name: 'Hoàng Văn Minh', percentage: 50, isCorresponding: false }
    ],
    submittedBy: '1',
    submittedDate: '2024-10-01',
    status: 'approved',
    hours: 295,
    evidence: ['project_umt_2024.pdf'],
    reviewComments: [
      {
        reviewer: 'PGS.TS. Trần Đan Thư',
        role: 'Trưởng khoa Công nghệ',
        comment: 'Đề tài ứng dụng tốt, phê duyệt',
        date: '2024-10-05',
        action: 'approved'
      },
      {
        reviewer: 'TS. Ngô Minh Hùng',
        role: 'Phòng KHCN',
        comment: 'Nghiệm thu đạt',
        date: '2024-10-10',
        action: 'approved'
      }
    ],
    department: 'Khoa Công nghệ'
  },
  {
    id: 'RP010',
    title: 'Quản trị rủi ro tài chính trong doanh nghiệp vừa và nhỏ',
    type: 'project_university',
    authors: [
      { name: 'Vũ Thị Hoa', percentage: 70, isCorresponding: true },
      { name: 'Đặng Văn Nam', percentage: 30, isCorresponding: false }
    ],
    submittedBy: '7',
    submittedDate: '2024-09-01',
    status: 'approved',
    hours: 295,
    evidence: ['project_finance.pdf'],
    reviewComments: [
      {
        reviewer: 'PGS.TS. Đặng Văn Nam',
        role: 'Trưởng khoa Kinh doanh',
        comment: 'Đề tài có giá trị thực tiễn cao, phê duyệt',
        date: '2024-09-10',
        action: 'approved'
      },
      {
        reviewer: 'TS. Ngô Minh Hùng',
        role: 'Phòng KHCN',
        comment: 'Phê duyệt',
        date: '2024-09-15',
        action: 'approved'
      }
    ],
    department: 'Khoa Kinh doanh'
  },
  {
    id: 'RP011',
    title: 'Xây dựng hệ thống quản lý kho thông minh sử dụng RFID',
    type: 'project_university',
    authors: [
      { name: 'Hoàng Văn Minh', percentage: 100, isCorresponding: true }
    ],
    submittedBy: '6',
    submittedDate: '2024-08-15',
    status: 'approved',
    hours: 295,
    evidence: ['project_rfid.pdf'],
    reviewComments: [
      {
        reviewer: 'PGS.TS. Trần Đan Thư',
        role: 'Trưởng khoa Công nghệ',
        comment: 'Đề tài ứng dụng công nghệ mới, phê duyệt',
        date: '2024-08-20',
        action: 'approved'
      },
      {
        reviewer: 'TS. Ngô Minh Hùng',
        role: 'Phòng KHCN',
        comment: 'Nghiệm thu đạt yêu cầu',
        date: '2024-08-25',
        action: 'approved'
      }
    ],
    department: 'Khoa Công nghệ'
  },
  {
    id: 'RP012',
    title: 'Nghiên cứu mô hình kinh doanh điện tử cho doanh nghiệp SMEs',
    type: 'project_provincial',
    authors: [
      { name: 'Vũ Thị Hoa', percentage: 60, isCorresponding: true },
      { name: 'Đặng Văn Nam', percentage: 40, isCorresponding: false }
    ],
    submittedBy: '7',
    submittedDate: '2024-07-01',
    status: 'approved',
    hours: 870,
    evidence: ['project_ecommerce.pdf'],
    reviewComments: [
      {
        reviewer: 'PGS.TS. Đặng Văn Nam',
        role: 'Trưởng khoa Kinh doanh',
        comment: 'Đề tài có ý nghĩa thực tiễn cao cho SMEs, phê duyệt',
        date: '2024-07-10',
        action: 'approved'
      },
      {
        reviewer: 'TS. Ngô Minh Hùng',
        role: 'Phòng KHCN',
        comment: 'Kết quả nghiên cứu tốt, phê duyệt',
        date: '2024-07-15',
        action: 'approved'
      }
    ],
    department: 'Khoa Kinh doanh'
  }
];

// Registration Periods - Năm học 2025-2026
export const registrationPeriods: RegistrationPeriod[] = [
  {
    id: '1',
    name: 'Đợt đăng ký NCKH học kỳ 1 năm 2025-2026',
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    academicYear: '2025-2026',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'Đợt đăng ký NCKH học kỳ 2 năm 2024-2025',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    academicYear: '2024-2025',
    status: 'active'
  },
  {
    id: '3',
    name: 'Đợt đăng ký NCKH học kỳ 1 năm 2024-2025',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    academicYear: '2024-2025',
    status: 'closed'
  }
];
