import React, { useState } from 'react';
import { User } from '../types';
import { mockResearchProducts } from '../data/mockData';
import { 
  FileText, 
  Award, 
  TrendingUp, 
  Calendar,
  Download,
  Edit,
  Plus
} from 'lucide-react';

interface ProfileProps {
  currentUser: User;
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');

  const userProducts = mockResearchProducts.filter(
    p => p.submittedBy === currentUser.id && p.status === 'approved'
  );

  // Group by year
  const years = ['2024-2025', '2023-2024', '2022-2023', '2021-2022'];
  
  // Statistics
  const totalProducts = userProducts.length;
  const totalHours = userProducts.reduce((sum, p) => sum + p.hours, 0);
  
  const productsByType = userProducts.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleExportPDF = () => {
    alert('Xuất file PDF hồ sơ năng lực NCKH');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Hồ sơ năng lực NCKH
            </h2>
            <p className="text-gray-600">{currentUser.name}</p>
            {currentUser.department && (
              <p className="text-sm text-gray-500">{currentUser.department}</p>
            )}
          </div>
          <button
            onClick={handleExportPDF}
            className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download size={18} />
            Xuất PDF
          </button>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <FileText className="text-[#1e3a8a]" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Tổng sản phẩm</p>
          <p className="text-3xl font-bold text-gray-800">{totalProducts}</p>
          <p className="text-sm text-gray-500 mt-2">Đã được công nhận</p>
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
              <Award className="text-emerald-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Năm học hiện tại</p>
          <p className="text-2xl font-bold text-gray-800">{selectedYear}</p>
          <p className="text-sm text-gray-500 mt-2">Đang cập nhật</p>
        </div>
      </div>

      {/* Year Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Lọc theo năm học</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products by Type */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Thống kê theo loại sản phẩm
        </h3>
        <div className="space-y-3">
          {Object.entries(productsByType).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{type}</span>
              <span className="font-semibold text-[#1e3a8a]">{count} sản phẩm</span>
            </div>
          ))}
          {Object.keys(productsByType).length === 0 && (
            <p className="text-gray-500 text-center py-4">Chưa có sản phẩm nào</p>
          )}
        </div>
      </div>

      {/* Publications List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Danh sách công trình ({userProducts.length})
        </h3>
        
        {userProducts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto mb-4 text-gray-400" size={64} />
            <p className="text-gray-500 text-lg mb-2">Chưa có công trình nào</p>
            <p className="text-gray-400 text-sm">
              Bắt đầu đăng ký sản phẩm KHCN để xây dựng hồ sơ của bạn
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userProducts.map((product, index) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-500">
                        #{index + 1}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {product.type}
                      </span>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                        {product.hours} giờ
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {product.title}
                    </h4>
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Tác giả:</strong>{' '}
                        {product.authors.map((a, i) => (
                          <span key={i}>
                            {a.name} ({a.percentage}%)
                            {i < product.authors.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                      <p className="mt-1">
                        <strong>Ngày công nhận:</strong>{' '}
                        {new Date(product.submittedDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Thông tin cá nhân
          </h3>
          <button className="text-[#1e3a8a] hover:text-[#1e40af] flex items-center gap-1 transition-colors">
            <Edit size={18} />
            <span className="text-sm">Chỉnh sửa</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">Họ và tên:</label>
            <p className="text-gray-800 mt-1">{currentUser.name}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Email:</label>
            <p className="text-gray-800 mt-1">{currentUser.email}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Đơn vị:</label>
            <p className="text-gray-800 mt-1">{currentUser.department || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Chức danh:</label>
            <p className="text-gray-800 mt-1">Giảng viên</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Trình độ:</label>
            <p className="text-gray-800 mt-1">Tiến sĩ</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Chuyên ngành:</label>
            <p className="text-gray-800 mt-1">Công nghệ Thông tin</p>
          </div>
        </div>
      </div>

      {/* Research Interests */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Lĩnh vực nghiên cứu
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            Machine Learning
          </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            Artificial Intelligence
          </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            Data Science
          </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            Deep Learning
          </span>
          <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors">
            <Plus size={14} />
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
