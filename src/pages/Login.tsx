import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { mockUsers } from '../data/mockData';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'demo123') {
      onLogin(user);
      navigate('/');
    } else {
      setError('Email hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/umt-logo.png" 
                alt="UMT Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Hệ thống Quản lý NCKH
            </h1>
            <p className="text-gray-600">Trường Đại học Quản lý và Công nghệ TP.HCM</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@umt.edu.vn"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <LogIn size={20} />
              Đăng nhập
            </button>
          </form>

          {/* <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-semibold">Tài khoản demo (mật khẩu: demo123):</p>
            <div className="space-y-2 text-sm">
              {mockUsers.map(user => (
                <div key={user.id} className="flex justify-between items-center py-1">
                  <span className="text-gray-700">{user.email}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {user.role === 'lecturer' ? 'GV' : 
                     user.role === 'dean' ? 'Khoa' :
                     user.role === 'research_dept' ? 'KHCN' :
                     user.role === 'rector' ? 'BGH' : 'Admin'}
                  </span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
