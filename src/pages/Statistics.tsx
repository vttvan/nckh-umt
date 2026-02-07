import React, { useState } from 'react';
import { User } from '../types';
import { mockResearchProducts, mockUsers, productCategories, registrationPeriods } from '../data/mockData';
import {
  TrendingUp,
  FileText,
  Award,
  Download,
  BarChart3,
  PieChart,
  Building2,
  Users as UsersIcon,
  Target,
  Calendar
} from 'lucide-react';

interface StatisticsProps {
  currentUser: User;
}

const Statistics: React.FC<StatisticsProps> = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [selectedDept, setSelectedDept] = useState('all');
  const [viewMode, setViewMode] = useState<'overview' | 'department' | 'type'>('overview');

  const departments = ['Khoa Công nghệ', 'Khoa Kinh doanh'];
  
  // Filter products
  const filteredProducts = mockResearchProducts.filter(p => {
    if (p.status !== 'approved') return false;
    if (selectedDept !== 'all' && p.department !== selectedDept) return false;
    return true;
  });

  // Overall statistics
  const totalProducts = filteredProducts.length;
  const totalHours = filteredProducts.reduce((sum, p) => sum + p.hours, 0);
  const totalLecturers = mockUsers.filter(u => u.role === 'lecturer').length;
  const activeLecturers = [...new Set(filteredProducts.map(p => p.submittedBy))].length;

  // Statistics by department
  const statsByDept = departments.map(dept => {
    const deptProducts = filteredProducts.filter(p => p.department === dept);
    const deptLecturers = mockUsers.filter(u => u.department === dept && u.role === 'lecturer');
    return {
      name: dept,
      products: deptProducts.length,
      hours: deptProducts.reduce((sum, p) => sum + p.hours, 0),
      lecturers: deptLecturers.length,
      avgPerLecturer: deptLecturers.length > 0 
        ? Math.round(deptProducts.reduce((sum, p) => sum + p.hours, 0) / deptLecturers.length)
        : 0
    };
  });

  // Statistics by type
  const statsByType = productCategories.map(cat => {
    const count = filteredProducts.filter(p => p.type === cat.type).length;
    return {
      type: cat.name,
      shortType: cat.type,
      count,
      hours: count > 0 ? count * cat.hours : 0,
      avgHours: cat.hours
    };
  }).filter(s => s.count > 0).sort((a, b) => b.hours - a.hours);

  // Category distribution
  const paperProducts = filteredProducts.filter(p => !p.type.toString().startsWith('project_'));
  const projectProducts = filteredProducts.filter(p => p.type.toString().startsWith('project_'));

  // Top performers
  const topLecturers = mockUsers.filter(u => u.role === 'lecturer').map(lecturer => {
    const products = filteredProducts.filter(p => p.submittedBy === lecturer.id);
    return {
      name: lecturer.name,
      department: lecturer.department,
      products: products.length,
      hours: products.reduce((sum, p) => sum + p.hours, 0)
    };
  }).sort((a, b) => b.hours - a.hours).slice(0, 10);

  const handleExport = () => {
    alert('Xuất báo cáo tổng hợp Excel/PDF - Tính năng đang phát triển');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Thống kê toàn trường
            </h2>
            <p className="text-gray-600">
              Báo cáo tổng hợp hoạt động NCKH các đơn vị
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              Đơn vị:
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Chế độ xem:
            </label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="overview">Tổng quan</option>
              <option value="department">Theo đơn vị</option>
              <option value="type">Theo loại sản phẩm</option>
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
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <p className="text-gray-600 text-sm mb-1">Tổng sản phẩm</p>
          <p className="text-3xl font-bold text-gray-800">{totalProducts}</p>
          <p className="text-sm text-emerald-600 mt-2">+18% so với năm trước</p>
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
          <p className="text-sm text-emerald-600 mt-2">+23% so với năm trước</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-3 rounded-lg">
              <UsersIcon className="text-emerald-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">GV tham gia</p>
          <p className="text-3xl font-bold text-gray-800">{activeLecturers}</p>
          <p className="text-sm text-gray-500 mt-2">
            {Math.round((activeLecturers / totalLecturers) * 100)}% tổng số
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-50 p-3 rounded-lg">
              <Award className="text-amber-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Trung bình/GV</p>
          <p className="text-3xl font-bold text-gray-800">
            {activeLecturers > 0 ? Math.round(totalHours / activeLecturers) : 0}
          </p>
          <p className="text-sm text-gray-500 mt-2">Giờ/người</p>
        </div>
      </div>

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <>
          {/* Category Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="text-blue-600" size={24} />
                <h3 className="text-lg font-bold text-gray-800">
                  Phân loại sản phẩm
                </h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Bài báo & Kỷ yếu</span>
                    <span className="text-2xl font-bold text-blue-600">{paperProducts.length}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(paperProducts.length / totalProducts) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round((paperProducts.length / totalProducts) * 100)}% tổng số
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Đề tài nghiên cứu</span>
                    <span className="text-2xl font-bold text-purple-600">{projectProducts.length}</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(projectProducts.length / totalProducts) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round((projectProducts.length / totalProducts) * 100)}% tổng số
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="text-emerald-600" size={24} />
                <h3 className="text-lg font-bold text-gray-800">
                  Mục tiêu năm học
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Tổng giờ NCKH</span>
                    <span>{totalHours} / 10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full"
                      style={{ width: `${(totalHours / 10000) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Đạt {Math.round((totalHours / 10000) * 100)}%
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Sản phẩm Q1-Q2</span>
                    <span>{filteredProducts.filter(p => p.type === 'Q1' || p.type === 'Q2').length} / 10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                      style={{ width: `${(filteredProducts.filter(p => p.type === 'Q1' || p.type === 'Q2').length / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Đạt {Math.round((filteredProducts.filter(p => p.type === 'Q1' || p.type === 'Q2').length / 10) * 100)}%
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Đề tài cấp Bộ trở lên</span>
                    <span>{filteredProducts.filter(p => ['project_international', 'project_national', 'project_ministry'].includes(p.type)).length} / 5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                      style={{ width: `${(filteredProducts.filter(p => ['project_international', 'project_national', 'project_ministry'].includes(p.type)).length / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Đạt {Math.round((filteredProducts.filter(p => ['project_international', 'project_national', 'project_ministry'].includes(p.type)).length / 5) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Periods */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">
                Đợt đăng ký
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {registrationPeriods.map((period, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-2 ${
                  period.status === 'active' ? 'bg-emerald-50 border-emerald-500' :
                  period.status === 'upcoming' ? 'bg-blue-50 border-blue-500' :
                  'bg-gray-50 border-gray-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      period.status === 'active' ? 'bg-emerald-500 text-white' :
                      period.status === 'upcoming' ? 'bg-blue-500 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      {period.status === 'active' ? 'Đang mở' :
                       period.status === 'upcoming' ? 'Sắp mở' : 'Đã đóng'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{period.name}</h4>
                  <p className="text-xs text-gray-600">
                    {new Date(period.startDate).toLocaleDateString('vi-VN')} - {new Date(period.endDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Department View */}
      {viewMode === 'department' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="text-[#1e3a8a]" size={24} />
            <h3 className="text-lg font-bold text-gray-800">
              So sánh theo đơn vị
            </h3>
          </div>
          <div className="space-y-4">
            {statsByDept.map((dept, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{dept.name}</h4>
                    <p className="text-sm text-gray-500">{dept.lecturers} giảng viên</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Sản phẩm</p>
                      <p className="text-xl font-bold text-blue-600">{dept.products}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Giờ NCKH</p>
                      <p className="text-xl font-bold text-purple-600">{dept.hours}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">TB/GV</p>
                      <p className="text-xl font-bold text-emerald-600">{dept.avgPerLecturer}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Tỷ lệ đóng góp</span>
                    <span>{Math.round((dept.hours / totalHours) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] h-2 rounded-full"
                      style={{ width: `${(dept.hours / totalHours) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Type View */}
      {viewMode === 'type' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-purple-600" size={24} />
            <h3 className="text-lg font-bold text-gray-800">
              Chi tiết theo loại sản phẩm
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
                  <span className="text-2xl font-bold text-blue-600">{item.count}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
                  <div>
                    <span className="text-gray-500">Tổng giờ:</span>
                    <span className="ml-1 font-semibold text-purple-600">{item.hours}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">TB/SP:</span>
                    <span className="ml-1 font-semibold text-emerald-600">{item.avgHours}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${(item.count / statsByType[0].count) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Lecturers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="text-amber-600" size={24} />
          <h3 className="text-lg font-bold text-gray-800">
            Top 10 Giảng viên xuất sắc
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topLecturers.map((lecturer, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                  idx === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                  idx === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                  idx === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                  'bg-gradient-to-r from-blue-400 to-blue-500'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{lecturer.name}</p>
                  <p className="text-xs text-gray-500">{lecturer.department}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#1e3a8a]">{lecturer.hours}h</p>
                <p className="text-xs text-gray-500">{lecturer.products} SP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
