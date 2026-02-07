import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { mockUsers as initialUsers } from '../data/mockData';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Shield,
  UserX,
  Settings,
  Mail,
  Building2
} from 'lucide-react';

interface AdminPanelProps {
  currentUser: User;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | UserRole>('all');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'lecturer' as UserRole,
    department: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData }
          : u
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: `U${Date.now()}`,
        ...formData
      };
      setUsers(prev => [...prev, newUser]);
    }
    
    handleCloseForm();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (id === currentUser.id) {
      alert('Không thể xóa tài khoản đang đăng nhập!');
      return;
    }
    
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'lecturer',
      department: ''
    });
  };

  const handleResetPassword = (user: User) => {
    alert(`Đặt lại mật khẩu cho ${user.name}. Link reset đã gửi đến ${user.email}`);
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.department?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  // Statistics
  const stats = {
    total: users.length,
    lecturers: users.filter(u => u.role === 'lecturer').length,
    deans: users.filter(u => u.role === 'dean').length,
    research: users.filter(u => u.role === 'research_dept').length,
    rectors: users.filter(u => u.role === 'rector').length,
    admins: users.filter(u => u.role === 'admin').length
  };

  const getRoleBadge = (role: UserRole) => {
    const badges = {
      lecturer: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Giảng viên' },
      dean: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Lãnh đạo Khoa' },
      research_dept: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Phòng KHCN' },
      rector: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Ban Giám hiệu' },
      admin: { bg: 'bg-red-100', text: 'text-red-700', label: 'Quản trị viên' }
    };
    const badge = badges[role];
    return (
      <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-full text-sm font-medium`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Quản lý Người dùng
            </h2>
            <p className="text-gray-600">
              Quản lý tài khoản và phân quyền hệ thống
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Thêm người dùng
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm mb-1">Tổng số</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4">
          <p className="text-blue-600 text-sm mb-1">Giảng viên</p>
          <p className="text-2xl font-bold text-blue-700">{stats.lecturers}</p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow-md p-4">
          <p className="text-purple-600 text-sm mb-1">Lãnh đạo</p>
          <p className="text-2xl font-bold text-purple-700">{stats.deans}</p>
        </div>
        <div className="bg-emerald-50 rounded-lg shadow-md p-4">
          <p className="text-emerald-600 text-sm mb-1">Phòng KHCN</p>
          <p className="text-2xl font-bold text-emerald-700">{stats.research}</p>
        </div>
        <div className="bg-amber-50 rounded-lg shadow-md p-4">
          <p className="text-amber-600 text-sm mb-1">BGH</p>
          <p className="text-2xl font-bold text-amber-700">{stats.rectors}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow-md p-4">
          <p className="text-red-600 text-sm mb-1">Admin</p>
          <p className="text-2xl font-bold text-red-700">{stats.admins}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, đơn vị..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="lecturer">Giảng viên</option>
            <option value="dean">Lãnh đạo Khoa</option>
            <option value="research_dept">Phòng KHCN</option>
            <option value="rector">Ban Giám hiệu</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn vị
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                          {user.id === currentUser.id && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Bạn</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-500">{user.department || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleResetPassword(user)}
                        className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition-colors"
                        title="Đặt lại mật khẩu"
                      >
                        <Shield size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-emerald-600 hover:text-emerald-700 p-2 hover:bg-emerald-50 rounded transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                        title="Xóa"
                        disabled={user.id === currentUser.id}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserX className="mx-auto mb-4 text-gray-400" size={64} />
            <p className="text-gray-500 text-lg">Không tìm thấy người dùng nào</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
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
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: TS. Nguyễn Văn An"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@umt.edu.vn"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vai trò <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="lecturer">Giảng viên</option>
                  <option value="dean">Lãnh đạo Khoa</option>
                  <option value="research_dept">Phòng KHCN</option>
                  <option value="rector">Ban Giám hiệu</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Đơn vị
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Chọn đơn vị --</option>
                  <option value="Khoa Công nghệ">Khoa Công nghệ</option>
                  <option value="Khoa Kinh doanh">Khoa Kinh doanh</option>
                  <option value="Khoa Ngoại ngữ">Khoa Ngoại ngữ</option>
                  <option value="Phòng KHCN">Phòng KHCN</option>
                  <option value="Ban Giám hiệu">Ban Giám hiệu</option>
                  <option value="Phòng Hành chính">Phòng Hành chính</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Lưu ý:</strong> Mật khẩu mặc định là "demo123". Người dùng nên đổi mật khẩu sau lần đăng nhập đầu tiên.
                </p>
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
                  {editingUser ? 'Cập nhật' : 'Thêm người dùng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* System Settings (Optional) */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="text-gray-600" size={24} />
          <h3 className="text-lg font-bold text-gray-800">
            Cấu hình hệ thống
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <p className="font-semibold text-gray-800 mb-1">Cấu hình Email</p>
            <p className="text-sm text-gray-500">SMTP, templates, thông báo</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <p className="font-semibold text-gray-800 mb-1">Sao lưu dữ liệu</p>
            <p className="text-sm text-gray-500">Backup, restore database</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <p className="font-semibold text-gray-800 mb-1">Log hệ thống</p>
            <p className="text-sm text-gray-500">Xem lịch sử hoạt động</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <p className="font-semibold text-gray-800 mb-1">Bảo mật</p>
            <p className="text-sm text-gray-500">Chính sách mật khẩu, 2FA</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
