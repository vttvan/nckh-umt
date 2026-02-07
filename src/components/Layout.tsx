import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  LogOut,
  BookOpen,
  CheckSquare,
  FolderOpen
} from 'lucide-react';

interface LayoutProps {
  currentUser: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const getMenuItems = (role: UserRole) => {
    const commonItems = [
      { path: '/', icon: Home, label: 'Trang chủ' }
    ];

    switch (role) {
      case 'lecturer':
        return [
          ...commonItems,
          { path: '/my-products', icon: FileText, label: 'Sản phẩm của tôi' },
          { path: '/register', icon: BookOpen, label: 'Đăng ký NCKH' },
          { path: '/profile', icon: Users, label: 'Hồ sơ năng lực' }
        ];
      case 'dean':
        return [
          ...commonItems,
          { path: '/my-products', icon: FileText, label: 'Sản phẩm của tôi' },
          { path: '/pending-approval', icon: CheckSquare, label: 'Chờ phê duyệt' },
          { path: '/department-stats', icon: BarChart3, label: 'Thống kê Khoa' }
        ];
      case 'research_dept':
        return [
          ...commonItems,
          { path: '/manage-periods', icon: FolderOpen, label: 'Quản lý đợt đăng ký' },
          { path: '/pending-approval', icon: CheckSquare, label: 'Chờ phê duyệt' },
          { path: '/all-products', icon: FileText, label: 'Danh mục sản phẩm' },
          { path: '/statistics', icon: BarChart3, label: 'Thống kê toàn trường' }
        ];
      case 'rector':
        return [
          ...commonItems,
          { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
          { path: '/reports', icon: FileText, label: 'Báo cáo tổng hợp' }
        ];
      case 'admin':
        return [
          ...commonItems,
          { path: '/users', icon: Users, label: 'Quản lý người dùng' },
          { path: '/settings', icon: Settings, label: 'Cấu hình hệ thống' }
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems(currentUser.role);

  const getRoleLabel = (role: UserRole): string => {
    const labels: Record<UserRole, string> = {
      lecturer: 'Giảng viên',
      dean: 'Lãnh đạo Khoa',
      research_dept: 'Phòng KHCN',
      rector: 'Ban Giám hiệu',
      admin: 'Quản trị viên'
    };
    return labels[role];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img 
                src="/umt-logo.png" 
                alt="UMT Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold">Hệ thống Quản lý NCKH</h1>
                <p className="text-blue-200 text-sm">Trường Đại học Quản lý và Công nghệ TP.HCM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{currentUser.name}</p>
                <p className="text-sm text-blue-100">{getRoleLabel(currentUser.role)}</p>
                {currentUser.department && (
                  <p className="text-xs text-blue-200">{currentUser.department}</p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="bg-[#1e40af] hover:bg-[#1e3a8a] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <LogOut size={18} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-lg shadow-md p-4 h-fit sticky top-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-[#1e3a8a] transition-colors"
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
