import React from 'react';
import { ResearchProduct } from '../types';
import { FileText, Users, Calendar, Clock } from 'lucide-react';
import { productCategories } from '../data/mockData';

interface ProductCardProps {
  product: ResearchProduct;
  onView?: (product: ResearchProduct) => void;
  showActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView, showActions = true }) => {
  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      draft: 'Nháp',
      pending_dean: 'Chờ Khoa duyệt',
      pending_research: 'Chờ Phòng KHCN',
      approved: 'Đã phê duyệt',
      rejected: 'Từ chối'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-700',
      pending_dean: 'bg-amber-100 text-amber-700',
      pending_research: 'bg-blue-100 text-blue-700',
      approved: 'bg-emerald-100 text-emerald-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const category = productCategories.find(c => c.type === product.type);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <FileText size={16} />
            <span className="font-medium">{category?.name || product.type}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
          {getStatusLabel(product.status)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} />
          <span>
            {product.authors.map((a, i) => (
              <span key={i}>
                {a.name} ({a.percentage}%)
                {i < product.authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>Ngày nộp: {new Date(product.submittedDate).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} />
          <span className="font-semibold text-[#1e3a8a]">{product.hours} giờ NCKH</span>
        </div>
      </div>

      {product.evidence && product.evidence.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Minh chứng đính kèm:</p>
          <div className="flex flex-wrap gap-2">
            {product.evidence.map((file, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 px-2 py-1 rounded"
              >
                📄 {file}
              </span>
            ))}
          </div>
        </div>
      )}

      {showActions && (
        <div className="flex gap-2 pt-4 border-t">
          <button
            onClick={() => onView?.(product)}
            className="flex-1 bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Xem chi tiết
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
