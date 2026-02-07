import React, { useState } from 'react';
import { User, ResearchProduct } from '../types';
import { mockResearchProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Filter, Search } from 'lucide-react';

interface MyProductsProps {
  currentUser: User;
}

const MyProducts: React.FC<MyProductsProps> = ({ currentUser }) => {
  const [selectedProduct, setSelectedProduct] = useState<ResearchProduct | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const userProducts = mockResearchProducts.filter(
    p => p.submittedBy === currentUser.id
  );

  const filteredProducts = userProducts.filter(product => {
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sản phẩm KHCN của tôi</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="draft">Nháp</option>
              <option value="pending_dean">Chờ Khoa duyệt</option>
              <option value="pending_research">Chờ Phòng KHCN</option>
              <option value="approved">Đã phê duyệt</option>
              <option value="rejected">Từ chối</option>
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#1e3a8a]">{userProducts.length}</p>
              <p className="text-sm text-gray-600">Tổng sản phẩm</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">
                {userProducts.filter(p => p.status === 'pending_dean' || p.status === 'pending_research').length}
              </p>
              <p className="text-sm text-gray-600">Chờ duyệt</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">
                {userProducts.filter(p => p.status === 'approved').length}
              </p>
              <p className="text-sm text-gray-600">Đã duyệt</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {userProducts.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.hours, 0)}
              </p>
              <p className="text-sm text-gray-600">Giờ NCKH</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onView={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Chi tiết sản phẩm KHCN</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Tiêu đề:</label>
                <p className="text-gray-800 mt-1">{selectedProduct.title}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Loại sản phẩm:</label>
                <p className="text-gray-800 mt-1">{selectedProduct.type}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Tác giả:</label>
                <ul className="mt-1 space-y-1">
                  {selectedProduct.authors.map((author, idx) => (
                    <li key={idx} className="text-gray-800">
                      {author.name} - {author.percentage}%
                      {author.isCorresponding && ' (Tác giả liên hệ)'}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Giờ quy đổi:</label>
                <p className="text-gray-800 mt-1 font-bold text-lg text-[#1e3a8a]">
                  {selectedProduct.hours} giờ
                </p>
              </div>

              {selectedProduct.reviewComments && selectedProduct.reviewComments.length > 0 && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Ý kiến phê duyệt:</label>
                  <div className="mt-2 space-y-3">
                    {selectedProduct.reviewComments.map((comment, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-800">{comment.reviewer}</p>
                            <p className="text-sm text-gray-600">{comment.role}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            comment.action === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                            comment.action === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {comment.action === 'approved' ? 'Đã duyệt' :
                             comment.action === 'rejected' ? 'Từ chối' : 'Yêu cầu sửa'}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.comment}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(comment.date).toLocaleString('vi-VN')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
