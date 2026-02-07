import React, { useState } from 'react';
import { User } from '../types';
import { mockResearchProducts, mockUsers, productCategories } from '../data/mockData';
import {
  TrendingUp,
  Users,
  FileText,
  Award,
  BarChart3,
  Building2,
  Target,
  Download,
  Calendar
} from 'lucide-react';

interface RectorDashboardProps {
  currentUser: User;
}

const RectorDashboard: React.FC<RectorDashboardProps> = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  
  // Tính toán thống kê
  const totalProducts = mockResearchProducts.filter(p => p.status === 'approved').length;
  const totalHours = mockResearchProducts
    .filter(p => p.status === 'approved')
    .reduce((sum, p) => sum + p.hours, 0);
  
  const pendingProducts = mockResearchProducts.filter(
    p => p.status === 'pending_dean' || p.status === 'pending_research'
  ).length;
  
  const departments = ['Khoa Công nghệ', 'Khoa Kinh doanh'];
  const lecturers = mockUsers.filter(u => u.role === 'lecturer');
  
  // Thống kê theo khoa
  const statsByDept = departments.map(dept => {
    const deptProducts = mockResearchProducts.filter(
      p => p.department === dept && p.status === 'approved'
    );
    return {
      name: dept,
      products: deptProducts.length,
      hours: deptProducts.reduce((sum, p) => sum + p.hours, 0),
      lecturers: mockUsers.filter(u => u.department === dept && u.role === 'lecturer').length
    };
  });
  
  // Thống kê theo loại
  const statsByType = productCategories.map(cat => {
    const count = mockResearchProducts.filter(
      p => p.type === cat.type && p.status === 'approved'
    ).length;
    return {
      type: cat.name,
      shortType: cat.type,
      count,
      hours: count > 0 ? count * cat.hours : 0
    };
  }).filter(s => s.count > 0).sort((a, b) => b.hours - a.hours);
  
  // Top giảng viên
  const topLecturers = lecturers.map(lecturer => {
    const products = mockResearchProducts.filter(
      p => p.submittedBy === lecturer.id && p.status === 'approved'
    );
    return {
      name: lecturer.name,
      department: lecturer.department,
      products: products.length,
      hours: products.reduce((sum, p) => sum + p.hours, 0)
    };
  }).sort((a, b) => b.hours - a.hours).slice(0, 5);

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
              Dashboard Ban Giám hiệu
            </h2>
            <p className="text-gray-600">
              Tổng quan hoạt động NCKH toàn trường
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

      {/* Year Selector */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">Năm học:</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="2025-2026">2025-2026</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <FileText className="text-[#1e3a8a]" size={24} />
            </div>
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <p className="text-gray-600 text-sm mb-1">Tổng sản phẩm</p>
          <p className="text-3xl font-bold text-gray-800">{totalProducts}</p>
          <p className="text-sm text-emerald-600 mt-2">+15% so với năm trước</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <p className="text-gray-600 text-sm mb-1">Tổng giờ NCKH</p>
          <p className="text-3xl font-bold text-gray-800">{totalHours.toLocaleString()}</p>
          <p className="text-sm text-emerald-600 mt-2">+25% so với năm trước</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-3 rounded-lg">
              <Users className="text-emerald-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Giảng viên tham gia</p>
          <p className="text-3xl font-bold text-gray-800">{lecturers.length}</p>
          <p className="text-sm text-gray-500 mt-2">
            {Math.round((lecturers.length / mockUsers.length) * 100)}% tổng số GV
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-50 p-3 rounded-lg">
              <Award className="text-amber-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Trung bình giờ/GV</p>
          <p className="text-3xl font-bold text-gray-800">
            {lecturers.length > 0 ? Math.round(totalHours / lecturers.length) : 0}
          </p>
          <p className="text-sm text-gray-500 mt-2">Giờ/người</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <Calendar className="mb-3 opacity-80" size={32} />
          <p className="text-sm opacity-90 mb-1">Đợt đăng ký hiện tại</p>
          <p className="text-2xl font-bold mb-2">Đang mở</p>
          <p className="text-xs opacity-75">HK2 năm 2024-2025</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg shadow-md p-6 text-white">
          <TrendingUp className="mb-3 opacity-80" size={32} />
          <p className="text-sm opacity-90 mb-1">Tăng trưởng năm nay</p>
          <p className="text-2xl font-bold mb-2">+25%</p>
          <p className="text-xs opacity-75">So với năm học trước</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <Award className="mb-3 opacity-80" size={32} />
          <p className="text-sm opacity-90 mb-1">Đánh giá chung</p>
          <p className="text-2xl font-bold mb-2">Xuất sắc</p>
          <p className="text-xs opacity-75">Vượt chỉ tiêu 20%</p>
        </div>
      </div>

      {/* Statistics by Department */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="text-[#1e3a8a]" size={24} />
          <h3 className="text-lg font-bold text-gray-800">
            Thống kê theo Khoa
          </h3>
        </div>
        <div className="space-y-4">
          {statsByDept.map((dept, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{dept.name}</h4>
                  <p className="text-sm text-gray-500">{dept.lecturers} giảng viên</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Sản phẩm</p>
                    <p className="text-lg font-bold text-[#1e3a8a]">{dept.products}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Giờ NCKH</p>
                    <p className="text-lg font-bold text-purple-600">{dept.hours}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">TB/GV</p>
                    <p className="text-lg font-bold text-emerald-600">
                      {dept.lecturers > 0 ? Math.round(dept.hours / dept.lecturers) : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Tiến độ</span>
                  <span>{Math.round((dept.hours / totalHours) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] h-2 rounded-full transition-all"
                    style={{ width: `${(dept.hours / totalHours) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Lecturers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-emerald-600" size={24} />
          <h3 className="text-lg font-bold text-gray-800">
            Top 5 Giảng viên xuất sắc
          </h3>
        </div>
        <div className="space-y-3">
          {topLecturers.map((lecturer, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md ${
                  idx === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                  idx === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                  idx === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                  'bg-gradient-to-r from-blue-400 to-blue-500'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{lecturer.name}</p>
                  <p className="text-sm text-gray-500">{lecturer.department}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#1e3a8a]">{lecturer.hours} giờ</p>
                <p className="text-sm text-gray-500">{lecturer.products} sản phẩm</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics by Type */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="text-purple-600" size={24} />
          <h3 className="text-lg font-bold text-gray-800">
            Phân bổ theo loại sản phẩm
          </h3>
        </div>
        <div className="space-y-3">
          {statsByType.slice(0, 6).map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{item.type}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.shortType}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Số lượng</p>
                    <span className="text-lg font-bold text-blue-600">{item.count}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Giờ quy đổi</p>
                    <span className="text-lg font-bold text-purple-600">{item.hours}</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-purple-500 h-1.5 rounded-full"
                  style={{ width: `${(item.hours / statsByType[0].hours) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Trạng thái xử lý
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-700 mb-1">Chờ xử lý</p>
            <p className="text-3xl font-bold text-amber-600">{pendingProducts}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm text-emerald-700 mb-1">Đã duyệt</p>
            <p className="text-3xl font-bold text-emerald-600">{totalProducts}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-1">Tỷ lệ hoàn thành</p>
            <p className="text-3xl font-bold text-blue-600">
              {Math.round((totalProducts / (totalProducts + pendingProducts)) * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RectorDashboard;
