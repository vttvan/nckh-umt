import React, { useState } from 'react';
import { User, ProductCategory, ProductType } from '../types';
import { productCategories as initialCategories } from '../data/mockData';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Clock
} from 'lucide-react';

interface ManageCategoriesProps {
  currentUser: User;
}

const ManageCategories: React.FC<ManageCategoriesProps> = ({ currentUser }) => {
  const [categories, setCategories] = useState<ProductCategory[]>(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'paper' | 'project'>('all');
  
  const [formData, setFormData] = useState({
    type: '' as ProductType | '',
    name: '',
    hours: 0,
    description: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing
      setCategories(prev => prev.map(c => 
        c.type === editingCategory.type 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      // Add new
      const newCategory: ProductCategory = {
        type: formData.type as ProductType,
        name: formData.name,
        hours: formData.hours,
        description: formData.description
      };
      setCategories(prev => [...prev, newCategory]);
    }
    
    handleCloseForm();
  };

  const handleEdit = (category: ProductCategory) => {
    setEditingCategory(category);
    setFormData({
      type: category.type,
      name: category.name,
      hours: category.hours,
      description: category.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = (type: ProductType) => {
    if (confirm('Bạn có chắc muốn xóa danh mục này? Thao tác không thể hoàn tác.')) {
      setCategories(prev => prev.filter(c => c.type !== type));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      type: '',
      name: '',
      hours: 0,
      description: ''
    });
  };

  // Filter categories
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'paper' && !category.type.startsWith('project_')) ||
                         (filterType === 'project' && category.type.startsWith('project_'));
    
    return matchesSearch && matchesFilter;
  });

  // Group by type
  const paperCategories = filteredCategories.filter(c => !c.type.startsWith('project_'));
  const projectCategories = filteredCategories.filter(c => c.type.startsWith('project_'));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Quản lý danh mục sản phẩm KHCN
            </h2>
            <p className="text-gray-600">
              Cấu hình các loại sản phẩm và giờ quy đổi theo quy định
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Thêm danh mục
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Tổng danh mục</p>
          <p className="text-3xl font-bold text-gray-800">{categories.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Bài báo/Kỷ yếu</p>
          <p className="text-3xl font-bold text-blue-600">
            {categories.filter(c => !c.type.startsWith('project_')).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Đề tài nghiên cứu</p>
          <p className="text-3xl font-bold text-purple-600">
            {categories.filter(c => c.type.startsWith('project_')).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="paper">Bài báo/Kỷ yếu</option>
              <option value="project">Đề tài</option>
            </select>
          </div>
        </div>
      </div>

      {/* Paper Categories */}
      {(filterType === 'all' || filterType === 'paper') && paperCategories.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Bài báo & Kỷ yếu quốc tế ({paperCategories.length})
          </h3>
          
          <div className="space-y-3">
            {paperCategories.map(category => (
              <div 
                key={category.type}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="text-blue-600" size={20} />
                      <h4 className="font-semibold text-gray-800">{category.name}</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {category.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-[#1e3a8a] font-bold">{category.hours} giờ</span>
                      </div>
                      {category.description && (
                        <span className="text-gray-600">{category.description}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.type)}
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
      )}

      {/* Project Categories */}
      {(filterType === 'all' || filterType === 'project') && projectCategories.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Đề tài nghiên cứu ({projectCategories.length})
          </h3>
          
          <div className="space-y-3">
            {projectCategories.map(category => (
              <div 
                key={category.type}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="text-purple-600" size={20} />
                      <h4 className="font-semibold text-gray-800">{category.name}</h4>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {category.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-[#1e3a8a] font-bold">{category.hours} giờ</span>
                      </div>
                      {category.description && (
                        <span className="text-gray-600">{category.description}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.type)}
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
      )}

      {/* No Results */}
      {filteredCategories.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <BookOpen className="mx-auto mb-4 text-gray-400" size={64} />
          <p className="text-gray-500 text-lg">Không tìm thấy danh mục nào</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
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
                  Mã danh mục <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Q1, Q2, project_international"
                  disabled={!!editingCategory}
                  required
                />
                {editingCategory && (
                  <p className="text-sm text-gray-500 mt-1">
                    Không thể thay đổi mã danh mục
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên danh mục <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Bài báo Q1 (Scopus/ISI)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giờ quy đổi <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.hours}
                  onChange={(e) => handleInputChange('hours', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: 1170"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mô tả thêm về danh mục (không bắt buộc)"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Lưu ý:</strong> Giờ quy đổi phải tuân thủ theo quy định NCKH hiện hành của Nhà trường.
                  Thay đổi giờ quy đổi sẽ không ảnh hưởng đến các sản phẩm đã được công nhận trước đó.
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
                  {editingCategory ? 'Cập nhật' : 'Thêm danh mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
