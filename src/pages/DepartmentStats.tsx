import React, { useState } from 'react';
import { User } from '../types';
import { mockResearchProducts, mockUsers, productCategories } from '../data/mockData';
import {
  TrendingUp,
  Users as UsersIcon,
  FileText,
  Award,
  Download,
  BarChart3,
  Target,
  PieChart
} from 'lucide-react';

interface DepartmentStatsProps {
  currentUser: User;
}

const DepartmentStats: React.FC<DepartmentStatsProps> = ({ currentUser }) => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const department = currentUser.department;
  
  // Filter products by department
  const deptProducts = mockResearchProducts.filter(
    p => p.department === department && p.status === 'approved'
  );
  
  const deptLecturers = mockUsers.filter(
    u => u.department === department && u.role === 'lecturer'
  );

  // Statistics
  const totalProducts = deptProducts.length;
  const totalHours = deptProducts.reduce((sum, p) => sum + p.hours, 0);
  const avgHoursPerLecturer = deptLecturers.length > 0 
    ? Math.round(totalHours / deptLecturers.length) 
    : 0;

  // Products by type
  const statsByType = productCategories.map(cat => {
    const count = deptProducts.filter(p => p.type === cat.type).length;
    return {
      type: cat.name,
      shortType: cat.type,
      count,
      hours: count > 0 ? count * cat.hours : 0
    };
  }).filter(s => s.count > 0).sort((a, b) => b.count - a.count);

  // Lecturer rankings
  const lecturerStats = deptLecturers.map(lecturer => {
    const products = deptProducts.filter(p => p.submittedBy === lecturer.id);
    return {
      name: lecturer.name,
      products: products.length,
      hours: products.reduce((sum, p) => sum + p.hours, 0)
    };
  }).sort((a, b) => b.hours - a.hours);

  // Monthly trend (mock data)
  const monthlyTrend = [
    { month: 'T9', products: 2, hours: 590 },
    { month: 'T10', products: 1, hours: 295 },
    { month: 'T11', products: 1, hours: 700 },
    { month: 'T12', products: 1, hours: 120 },
    { month: 'T1', products: 0, hours: 0 },
    { month: 'T2', products: 2, hours: 2465 }
  ];

  const handleExport = () => {
    alert('Xuất báo cáo Excel/PDF - Tính năng đang phát triển');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Thống kê {department}
            </h2>
            <p className="text-gray-600">
              Tổng quan hoạt động NCKH của Khoa
            </p>
          </div>
          <button
            onClick={handleExport}
            className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download size={18} />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Năm học:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kỳ:
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Cả năm</option>
              <option value="1">Học kỳ 1</option>
              <option value="2">Học kỳ 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <FileText className="text-[#1e3a8a]" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Tổng sản phẩm</p>
          <p className="text-3xl font-bold text-gray-800">{totalProducts}</p>
          <p className="text-sm text-emerald-600 mt-2">Đã công nhận</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Tổng giờ NCKH</p>
          <p className="text-3xl font-bold text-gray-800">{totalHours}</p>
          <p className="text-sm text-gray-500 mt-2">Giờ quy đổi</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-3 rounded-lg">
              <UsersIcon className="text-emerald-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Giảng viên</p>
          <p className="text-3xl font-bold text-gray-800">{deptLecturers.length}</p>
          <p className="text-sm text-gray-500 mt-2">Đang hoạt động</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-50 p-3 rounded-lg">
              <Award className="text-amber-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Trung bình/GV</p>
          <p className="text-3xl font-bold text-gray-800">{avgHoursPerLecturer}</p>
          <p className="text-sm text-gray-500 mt-2">Giờ/người</p>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <Target className="mb-3 opacity-80" size={32} />
          <p className="text-sm opacity-90 mb-1">Mục tiêu năm</p>
          <p className="text-2xl font-bold mb-2">5,000 giờ</p>
          <div className="w-full bg-blue-700 rounded-full h-2 mb-2">
            <div
              className="bg-white h-2 rounded-full"
              style={{ width: `${(totalHours / 5000) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs opacity-75">
            Đạt {Math.round((totalHours / 5000) * 100)}% mục tiêu
          </p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg shadow-md p-6 text-white">
          <TrendingUp className="mb-3 opacity-80" size={32} />
          <p className="text-sm opacity-90 mb-1">Tăng trưởng</p>
          <p className="text-2xl font-bold mb-2">+20%</p>
          <p className="text-xs opacity-75">So với năm trước</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <Award className="mb-3 opacity-80" size={32} />
          <p className="text-sm opacity-90 mb-1">Xếp hạng</p>
          <p className="text-2xl font-bold mb-2">#1</p>
          <p className="text-xs opacity-75">Trong toàn trường</p>
        </div>
      </div>

      {/* Lecturer Rankings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-emerald-600" size={24} />
          <h3 className="text-lg font-bold text-gray-800">
            Bảng xếp hạng Giảng viên
          </h3>
        </div>
        <div className="space-y-3">
          {lecturerStats.map((lecturer, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  idx === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                  idx === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                  idx === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                  'bg-gradient-to-r from-blue-400 to-blue-500'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{lecturer.name}</p>
                  <p className="text-sm text-gray-500">{lecturer.products} sản phẩm</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#1e3a8a]">{lecturer.hours} giờ</p>
                <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-[#1e3a8a] h-1.5 rounded-full"
                    style={{ width: `${(lecturer.hours / lecturerStats[0].hours) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics by Type */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="text-purple-600" size={24} />
          <h3 className="text-lg font-bold text-gray-800">
            Phân bổ theo loại sản phẩm
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statsByType.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{item.type}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.shortType}</p>
                </div>
                <span className="text-lg font-bold text-blue-600">{item.count}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Giờ quy đổi:</span>
                <span className="font-semibold text-purple-600">{item.hours}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div
                  className="bg-purple-500 h-1.5 rounded-full"
                  style={{ width: `${(item.count / statsByType[0].count) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="text-blue-600" size={24} />
          <h3 className="text-lg font-bold text-gray-800">
            Xu hướng theo tháng
          </h3>
        </div>
        <div className="space-y-3">
          {monthlyTrend.map((month, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-16 text-center">
                <span className="text-sm font-semibold text-gray-700">{month.month}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-600">{month.products} sản phẩm</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-purple-600 font-semibold">{month.hours} giờ</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] h-2 rounded-full"
                    style={{ width: `${month.products > 0 ? (month.hours / Math.max(...monthlyTrend.map(m => m.hours))) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Mục tiêu còn lại
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Sản phẩm Q1-Q2</span>
              <span className="font-bold text-blue-600">Cần thêm 3</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Đề tài cấp Bộ</span>
              <span className="font-bold text-purple-600">Cần thêm 1</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
              <span className="text-gray-700">Tổng giờ NCKH</span>
              <span className="font-bold text-emerald-600">Còn 830 giờ</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Khuyến nghị
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
              <p className="text-sm text-gray-700">
                Khuyến khích GV nộp bài báo Q1-Q2 trong quý tới
              </p>
            </div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-gray-700">
                Tổ chức hội thảo chia sẻ kinh nghiệm viết bài khoa học
              </p>
            </div>
            <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded">
              <p className="text-sm text-gray-700">
                Xem xét hỗ trợ tài chính cho các đề tài tiềm năng
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentStats;
