import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { mockResearchProducts, registrationPeriods } from '../data/mockData';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar 
} from 'lucide-react';

interface HomeProps {
  currentUser: User;
}

const Home: React.FC<HomeProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  
  const userProducts = mockResearchProducts.filter(
    p => p.submittedBy === currentUser.id
  );
  
  const pendingProducts = userProducts.filter(
    p => p.status === 'pending_dean' || p.status === 'pending_research'
  );
  
  const approvedProducts = userProducts.filter(p => p.status === 'approved');
  const totalHours = approvedProducts.reduce((sum, p) => sum + p.hours, 0);

  const activePeriod = registrationPeriods.find(p => p.status === 'active');

  return (
    <div className="space-y-6">
      {/* Active Registration Period */}
      {activePeriod && currentUser.role === 'lecturer' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Calendar className="text-emerald-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-emerald-800 mb-1">
                Đợt đăng ký đang mở
              </h3>
              <p className="text-emerald-700 mb-2">{activePeriod.name}</p>
              <p className="text-sm text-emerald-600">
                Từ {new Date(activePeriod.startDate).toLocaleDateString('vi-VN')} đến{' '}
                {new Date(activePeriod.endDate).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentUser.role === 'lecturer' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileText className="text-[#1e3a8a]" size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Tổng sản phẩm</p>
              <p className="text-3xl font-bold text-gray-800">{userProducts.length}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-amber-50 p-3 rounded-lg">
                  <Clock className="text-amber-600" size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Chờ phê duyệt</p>
              <p className="text-3xl font-bold text-gray-800">{pendingProducts.length}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <CheckCircle className="text-emerald-600" size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Đã phê duyệt</p>
              <p className="text-3xl font-bold text-gray-800">{approvedProducts.length}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Tổng giờ NCKH</p>
              <p className="text-3xl font-bold text-gray-800">{totalHours}</p>
            </div>
          </>
        )}

        {(currentUser.role === 'dean' || currentUser.role === 'research_dept') && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileText className="text-[#1e3a8a]" size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Tổng sản phẩm</p>
              <p className="text-3xl font-bold text-gray-800">
                {mockResearchProducts.length}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-amber-50 p-3 rounded-lg">
                  <AlertCircle className="text-amber-600" size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Chờ duyệt</p>
              <p className="text-3xl font-bold text-gray-800">
                {mockResearchProducts.filter(
                  p => currentUser.role === 'dean' 
                    ? p.status === 'pending_dean'
                    : p.status === 'pending_research'
                ).length}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <CheckCircle className="text-emerald-600" size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Đã duyệt</p>
              <p className="text-3xl font-bold text-gray-800">
                {mockResearchProducts.filter(p => p.status === 'approved').length}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentUser.role === 'lecturer' && (
            <>
              <button 
                onClick={() => navigate('/register')}
                className="bg-blue-50 hover:bg-blue-100 text-[#1e3a8a] p-4 rounded-lg text-left transition-colors"
              >
                <FileText className="mb-2" size={24} />
                <p className="font-semibold">Đăng ký sản phẩm mới</p>
              </button>
              <button 
                onClick={() => navigate('/my-products')}
                className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-lg text-left transition-colors"
              >
                <Clock className="mb-2" size={24} />
                <p className="font-semibold">Xem sản phẩm chờ duyệt</p>
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-4 rounded-lg text-left transition-colors"
              >
                <CheckCircle className="mb-2" size={24} />
                <p className="font-semibold">Xem hồ sơ năng lực</p>
              </button>
            </>
          )}
          
          {currentUser.role === 'dean' && (
            <>
              <button 
                onClick={() => navigate('/pending-approval')}
                className="bg-amber-50 hover:bg-amber-100 text-amber-700 p-4 rounded-lg text-left transition-colors"
              >
                <AlertCircle className="mb-2" size={24} />
                <p className="font-semibold">Phê duyệt hồ sơ</p>
              </button>
              <button 
                onClick={() => navigate('/department-stats')}
                className="bg-blue-50 hover:bg-blue-100 text-[#1e3a8a] p-4 rounded-lg text-left transition-colors"
              >
                <TrendingUp className="mb-2" size={24} />
                <p className="font-semibold">Thống kê Khoa</p>
              </button>
            </>
          )}

          {currentUser.role === 'research_dept' && (
            <>
              <button 
                onClick={() => navigate('/manage-periods')}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-4 rounded-lg text-left transition-colors"
              >
                <Calendar className="mb-2" size={24} />
                <p className="font-semibold">Tạo đợt đăng ký</p>
              </button>
              <button 
                onClick={() => navigate('/pending-approval')}
                className="bg-amber-50 hover:bg-amber-100 text-amber-700 p-4 rounded-lg text-left transition-colors"
              >
                <AlertCircle className="mb-2" size={24} />
                <p className="font-semibold">Phê duyệt cuối</p>
              </button>
              <button 
                onClick={() => navigate('/statistics')}
                className="bg-blue-50 hover:bg-blue-100 text-[#1e3a8a] p-4 rounded-lg text-left transition-colors"
              >
                <TrendingUp className="mb-2" size={24} />
                <p className="font-semibold">Thống kê toàn trường</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
