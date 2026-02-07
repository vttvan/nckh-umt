import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User } from './types';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import MyProducts from './pages/MyProducts';
import PendingApproval from './pages/PendingApproval';
import RegisterProduct from './pages/RegisterProduct';
import Profile from './pages/Profile';
import ManagePeriods from './pages/ManagePeriods';
import ManageCategories from './pages/ManageCategories';
import RectorDashboard from './pages/RectorDashboard';
import AdminPanel from './pages/AdminPanel';
import DepartmentStats from './pages/DepartmentStats';
import Statistics from './pages/Statistics';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout currentUser={currentUser} onLogout={handleLogout} />}>
          <Route index element={<Home currentUser={currentUser} />} />
          
          {/* Routes for Lecturer */}
          {currentUser.role === 'lecturer' && (
            <>
              <Route path="my-products" element={<MyProducts currentUser={currentUser} />} />
              <Route path="register" element={<RegisterProduct currentUser={currentUser} />} />
              <Route path="profile" element={<Profile currentUser={currentUser} />} />
            </>
          )}

          {/* Routes for Dean */}
          {currentUser.role === 'dean' && (
            <>
              <Route path="my-products" element={<MyProducts currentUser={currentUser} />} />
              <Route path="pending-approval" element={<PendingApproval currentUser={currentUser} />} />
              <Route path="department-stats" element={<DepartmentStats currentUser={currentUser} />} />
            </>
          )}

          {/* Routes for Research Department */}
          {currentUser.role === 'research_dept' && (
            <>
              <Route path="manage-periods" element={<ManagePeriods currentUser={currentUser} />} />
              <Route path="pending-approval" element={<PendingApproval currentUser={currentUser} />} />
              <Route path="all-products" element={<ManageCategories currentUser={currentUser} />} />
              <Route path="statistics" element={<Statistics currentUser={currentUser} />} />
            </>
          )}

          {/* Routes for Rector */}
          {currentUser.role === 'rector' && (
            <>
              <Route path="dashboard" element={<RectorDashboard currentUser={currentUser} />} />
              <Route path="reports" element={<ComingSoon title="Báo cáo tổng hợp" />} />
            </>
          )}

          {/* Routes for Admin */}
          {currentUser.role === 'admin' && (
            <>
              <Route path="users" element={<AdminPanel currentUser={currentUser} />} />
              <Route path="settings" element={<ComingSoon title="Cấu hình hệ thống" />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const ComingSoon: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-white rounded-lg shadow-md p-12 text-center">
    <div className="text-6xl mb-4">🚧</div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-600">Chức năng đang được phát triển</p>
  </div>
);

export default App;
