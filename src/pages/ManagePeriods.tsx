import React, { useState } from 'react';
import { User, RegistrationPeriod } from '../types';
import { registrationPeriods as initialPeriods } from '../data/mockData';
import { 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface ManagePeriodsProps {
  currentUser: User;
}

const ManagePeriods: React.FC<ManagePeriodsProps> = () => {
  const [periods, setPeriods] = useState<RegistrationPeriod[]>(initialPeriods);
  const [showForm, setShowForm] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<RegistrationPeriod | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    academicYear: '',
    status: 'upcoming' as 'upcoming' | 'active' | 'closed'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPeriod) {
      // Update existing
      setPeriods(prev => prev.map(p => 
        p.id === editingPeriod.id 
          ? { ...editingPeriod, ...formData }
          : p
      ));
    } else {
      // Add new
      const newPeriod: RegistrationPeriod = {
        id: `P${Date.now()}`,
        ...formData
      };
      setPeriods(prev => [newPeriod, ...prev]);
    }
    
    handleCloseForm();
  };

  const handleEdit = (period: RegistrationPeriod) => {
    setEditingPeriod(period);
    setFormData({
      name: period.name,
      startDate: period.startDate,
      endDate: period.endDate,
      academicYear: period.academicYear,
      status: period.status
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa đợt đăng ký này?')) {
      setPeriods(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPeriod(null);
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      academicYear: '',
      status: 'upcoming'
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sắp mở' },
      active: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Đang mở' },
      closed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Đã đóng' }
    };
    const badge = badges[status as keyof typeof badges] || badges.upcoming;
    return (
      <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-full text-sm font-medium`}>
        {badge.label}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    if (status === 'active') return <CheckCircle className="text-emerald-500" size={20} />;
    if (status === 'closed') return <XCircle className="text-gray-500" size={20} />;
    return <AlertCircle className="text-blue-500" size={20} />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Quản lý đợt đăng ký NCKH
            </h2>
            <p className="text-gray-600">
              Tạo và quản lý các đợt đăng ký sản phẩm KHCN
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Tạo đợt mới
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Tổng số đợt</p>
          <p className="text-3xl font-bold text-gray-800">{periods.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Đang mở</p>
          <p className="text-3xl font-bold text-emerald-600">
            {periods.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Sắp tới</p>
          <p className="text-3xl font-bold text-blue-600">
            {periods.filter(p => p.status === 'upcoming').length}
          </p>
        </div>
      </div>

      {/* Periods List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Danh sách đợt đăng ký
        </h3>
        
        <div className="space-y-4">
          {periods.map(period => (
            <div 
              key={period.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(period.status)}
                    <h4 className="font-semibold text-gray-800">{period.name}</h4>
                    {getStatusBadge(period.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Năm học:</span> {period.academicYear}
                    </div>
                    <div>
                      <span className="font-medium">Bắt đầu:</span>{' '}
                      {new Date(period.startDate).toLocaleDateString('vi-VN')}
                    </div>
                    <div>
                      <span className="font-medium">Kết thúc:</span>{' '}
                      {new Date(period.endDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(period)}
                    className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition-colors"
                    title="Chỉnh sửa"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(period.id)}
                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {editingPeriod ? 'Chỉnh sửa đợt đăng ký' : 'Tạo đợt đăng ký mới'}
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên đợt đăng ký <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Đợt đăng ký NCKH học kỳ 1 năm 2025-2026"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Năm học <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => handleInputChange('academicYear', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: 2025-2026"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày bắt đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày kết thúc <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="upcoming">Sắp mở</option>
                  <option value="active">Đang mở</option>
                  <option value="closed">Đã đóng</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Lưu ý:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Chỉ nên có 1 đợt ở trạng thái "Đang mở" cùng lúc</li>
                      <li>Giảng viên chỉ có thể đăng ký trong đợt "Đang mở"</li>
                      <li>Không thể xóa đợt đã có sản phẩm đăng ký</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {editingPeriod ? 'Cập nhật' : 'Tạo đợt đăng ký'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePeriods;
