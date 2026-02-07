import React, { useState } from 'react';
import { User, ResearchProduct } from '../types';
import { mockResearchProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface PendingApprovalProps {
  currentUser: User;
}

const PendingApproval: React.FC<PendingApprovalProps> = ({ currentUser }) => {
  const [selectedProduct, setSelectedProduct] = useState<ResearchProduct | null>(null);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null);
  const [reviewComment, setReviewComment] = useState('');

  const getPendingProducts = () => {
    if (currentUser.role === 'dean') {
      return mockResearchProducts.filter(
        p => p.status === 'pending_dean' && p.department === currentUser.department
      );
    } else if (currentUser.role === 'research_dept') {
      return mockResearchProducts.filter(p => p.status === 'pending_research');
    }
    return [];
  };

  const pendingProducts = getPendingProducts();

  const handleReview = (action: 'approve' | 'reject') => {
    setReviewAction(action);
  };

  const submitReview = () => {
    if (!selectedProduct || !reviewAction) return;

    alert(`Đã ${reviewAction === 'approve' ? 'phê duyệt' : 'từ chối'} sản phẩm: ${selectedProduct.title}\nNhận xét: ${reviewComment}`);
    
    setSelectedProduct(null);
    setReviewAction(null);
    setReviewComment('');
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setReviewAction(null);
    setReviewComment('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Sản phẩm chờ phê duyệt
        </h2>
        <p className="text-gray-600">
          {currentUser.role === 'dean' 
            ? `Phê duyệt cấp Khoa - ${currentUser.department}`
            : 'Phê duyệt cuối cùng - Phòng KHCN'}
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-amber-600" size={20} />
          <p className="text-amber-800 font-medium">
            Có {pendingProducts.length} sản phẩm đang chờ phê duyệt
          </p>
        </div>
      </div>

      {pendingProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <CheckCircle className="mx-auto mb-4 text-emerald-500" size={64} />
          <p className="text-gray-500 text-lg">Không có sản phẩm nào chờ phê duyệt</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pendingProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onView={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Phê duyệt sản phẩm KHCN</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Product Details */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
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

                {selectedProduct.evidence && selectedProduct.evidence.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Minh chứng:</label>
                    <div className="mt-2 space-y-1">
                      {selectedProduct.evidence.map((file, idx) => (
                        <div key={idx} className="text-sm text-[#1e3a8a] hover:underline cursor-pointer">
                          📄 {file}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Review Actions */}
              {!reviewAction && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleReview('approve')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <CheckCircle size={20} />
                    Phê duyệt
                  </button>
                  <button
                    onClick={() => handleReview('reject')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <XCircle size={20} />
                    Từ chối
                  </button>
                </div>
              )}

              {/* Review Form */}
              {reviewAction && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    reviewAction === 'approve' 
                      ? 'bg-emerald-50 border border-emerald-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className="font-semibold mb-2">
                      {reviewAction === 'approve' ? '✓ Phê duyệt sản phẩm' : '✗ Từ chối sản phẩm'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Vui lòng nhập nhận xét của bạn
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nhận xét {reviewAction === 'reject' && '(bắt buộc)'}:
                    </label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={
                        reviewAction === 'approve'
                          ? 'Nhập nhận xét về sản phẩm (không bắt buộc)...'
                          : 'Nhập lý do từ chối...'
                      }
                      required={reviewAction === 'reject'}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={submitReview}
                      disabled={reviewAction === 'reject' && !reviewComment.trim()}
                      className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                        reviewAction === 'approve'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
                      }`}
                    >
                      Xác nhận {reviewAction === 'approve' ? 'phê duyệt' : 'từ chối'}
                    </button>
                    <button
                      onClick={() => setReviewAction(null)}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                    >
                      Hủy
                    </button>
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

export default PendingApproval;
