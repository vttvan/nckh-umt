import React, { useState } from 'react';
import { User, ProductType, Author } from '../types';
import { productCategories, registrationPeriods } from '../data/mockData';
import { 
  FileText, 
  Upload, 
  Plus, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Users,
  Calendar
} from 'lucide-react';

interface RegisterProductProps {
  currentUser: User;
}

interface FormData {
  title: string;
  type: ProductType | '';
  authors: Author[];
  submittedDate: string;
  evidence: File[];
  journalName?: string;
  doi?: string;
  issn?: string;
  projectCode?: string;
  projectDuration?: string;
  fundingAmount?: string;
  abstract?: string;
}

const RegisterProduct: React.FC<RegisterProductProps> = ({ currentUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    type: '',
    authors: [{ name: currentUser.name, percentage: 100, isCorresponding: true }],
    submittedDate: new Date().toISOString().split('T')[0],
    evidence: [],
    abstract: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const activePeriod = registrationPeriods.find(p => p.status === 'active');

  // Validation
  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề';
    }
    
    if (!formData.type) {
      newErrors.type = 'Vui lòng chọn loại sản phẩm';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (formData.authors.length === 0) {
      newErrors.authors = 'Phải có ít nhất 1 tác giả';
    }
    
    const totalPercentage = formData.authors.reduce((sum, a) => sum + a.percentage, 0);
    if (Math.abs(totalPercentage - 100) > 0.01) {
      newErrors.percentage = `Tổng tỷ lệ đóng góp phải bằng 100% (hiện tại: ${totalPercentage}%)`;
    }
    
    const hasCorresponding = formData.authors.some(a => a.isCorresponding);
    if (!hasCorresponding) {
      newErrors.corresponding = 'Phải có ít nhất 1 tác giả liên hệ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (formData.evidence.length === 0) {
      newErrors.evidence = 'Vui lòng tải lên ít nhất 1 file minh chứng';
    }
    
    // Validation theo loại sản phẩm
    if (['Q1', 'Q2', 'Q3', 'Q4', 'Scopus', 'nature_science'].includes(formData.type as string)) {
      if (!formData.doi?.trim()) {
        newErrors.doi = 'Vui lòng nhập DOI';
      }
      if (!formData.journalName?.trim()) {
        newErrors.journalName = 'Vui lòng nhập tên tạp chí';
      }
    }
    
    if (formData.type.toString().startsWith('project_')) {
      if (!formData.projectCode?.trim()) {
        newErrors.projectCode = 'Vui lòng nhập mã đề tài';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddAuthor = () => {
    setFormData(prev => ({
      ...prev,
      authors: [...prev.authors, { name: '', percentage: 0, isCorresponding: false }]
    }));
  };

  const handleRemoveAuthor = (index: number) => {
    if (formData.authors.length > 1) {
      setFormData(prev => ({
        ...prev,
        authors: prev.authors.filter((_, i) => i !== index)
      }));
    }
  };

  const handleAuthorChange = (index: number, field: keyof Author, value: any) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.map((author, i) => 
        i === index ? { ...author, [field]: value } : author
      )
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        evidence: [...prev.evidence, ...files]
      }));
      if (errors.evidence) {
        setErrors(prev => ({ ...prev, evidence: '' }));
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }
    
    if (isValid && step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep3()) {
      // Simulate submission
      console.log('Submitting:', formData);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setStep(1);
        setFormData({
          title: '',
          type: '',
          authors: [{ name: currentUser.name, percentage: 100, isCorresponding: true }],
          submittedDate: new Date().toISOString().split('T')[0],
          evidence: [],
          abstract: ''
        });
      }, 3000);
    }
  };

  const selectedCategory = productCategories.find(c => c.type === formData.type);

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <CheckCircle className="mx-auto mb-4 text-emerald-500" size={80} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Đăng ký thành công!
          </h2>
          <p className="text-gray-600 mb-6">
            Sản phẩm KHCN của bạn đã được gửi đến Lãnh đạo Khoa để phê duyệt.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-700">
              <strong>Tiêu đề:</strong> {formData.title}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Loại:</strong> {selectedCategory?.name}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Giờ quy đổi:</strong> {selectedCategory?.hours} giờ
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Đăng ký sản phẩm KHCN
        </h2>
        <p className="text-gray-600">
          Vui lòng điền đầy đủ thông tin để đăng ký sản phẩm nghiên cứu khoa học
        </p>
      </div>

      {/* Active Period Info */}
      {activePeriod && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
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

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s, idx) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s < step ? 'bg-emerald-500 text-white' :
                  s === step ? 'bg-[#1e3a8a] text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {s < step ? '✓' : s}
                </div>
                <span className={`text-sm mt-2 ${
                  s === step ? 'text-[#1e3a8a] font-semibold' : 'text-gray-500'
                }`}>
                  {s === 1 ? 'Thông tin cơ bản' :
                   s === 2 ? 'Tác giả' :
                   s === 3 ? 'Chi tiết & Minh chứng' : 'Xác nhận'}
                </span>
              </div>
              {idx < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  s < step ? 'bg-emerald-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Bước 1: Thông tin cơ bản
            </h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loại sản phẩm KHCN <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value as ProductType)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.type ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Chọn loại sản phẩm --</option>
                <optgroup label="Bài báo quốc tế">
                  {productCategories.filter(c => ['nature_science', 'Q1', 'Q2', 'Q3', 'Q4', 'Scopus'].includes(c.type)).map(cat => (
                    <option key={cat.type} value={cat.type}>
                      {cat.name} - {cat.hours} giờ
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Đề tài nghiên cứu">
                  {productCategories.filter(c => c.type.startsWith('project_')).map(cat => (
                    <option key={cat.type} value={cat.type}>
                      {cat.name} - {cat.hours} giờ
                    </option>
                  ))}
                </optgroup>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {selectedCategory && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Giờ quy đổi:</strong> {selectedCategory.hours} giờ
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập tiêu đề sản phẩm KHCN..."
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tóm tắt
              </label>
              <textarea
                value={formData.abstract}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập tóm tắt nội dung (không bắt buộc)..."
              />
            </div>
          </div>
        )}

        {/* Step 2: Authors */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Bước 2: Thông tin tác giả
              </h3>
              <button
                onClick={handleAddAuthor}
                className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} />
                Thêm tác giả
              </button>
            </div>

            {errors.authors && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{errors.authors}</p>
              </div>
            )}

            {errors.percentage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{errors.percentage}</p>
              </div>
            )}

            {errors.corresponding && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{errors.corresponding}</p>
              </div>
            )}

            <div className="space-y-4">
              {formData.authors.map((author, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Users size={20} className="text-gray-500" />
                      <span className="font-semibold text-gray-700">
                        Tác giả {index + 1}
                      </span>
                    </div>
                    {formData.authors.length > 1 && (
                      <button
                        onClick={() => handleRemoveAuthor(index)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={author.name}
                        onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập họ tên tác giả..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tỷ lệ đóng góp (%) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={author.percentage}
                        onChange={(e) => handleAuthorChange(index, 'percentage', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center pt-8">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={author.isCorresponding || false}
                          onChange={(e) => handleAuthorChange(index, 'isCorresponding', e.target.checked)}
                          className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Tác giả liên hệ
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Tổng tỷ lệ đóng góp:</strong>{' '}
                {formData.authors.reduce((sum, a) => sum + a.percentage, 0).toFixed(1)}%
                {Math.abs(formData.authors.reduce((sum, a) => sum + a.percentage, 0) - 100) > 0.01 && (
                  <span className="text-red-600 ml-2">(Phải bằng 100%)</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Details & Evidence */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Bước 3: Chi tiết và minh chứng
            </h3>

            {/* Conditional fields based on product type */}
            {['Q1', 'Q2', 'Q3', 'Q4', 'Scopus', 'nature_science'].includes(formData.type as string) && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên tạp chí <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.journalName || ''}
                    onChange={(e) => handleInputChange('journalName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.journalName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ví dụ: IEEE Transactions on Neural Networks"
                  />
                  {errors.journalName && (
                    <p className="text-red-500 text-sm mt-1">{errors.journalName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      DOI <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.doi || ''}
                      onChange={(e) => handleInputChange('doi', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.doi ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="10.xxxx/xxxxxx"
                    />
                    {errors.doi && (
                      <p className="text-red-500 text-sm mt-1">{errors.doi}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ISSN
                    </label>
                    <input
                      type="text"
                      value={formData.issn || ''}
                      onChange={(e) => handleInputChange('issn', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="xxxx-xxxx"
                    />
                  </div>
                </div>
              </>
            )}

            {formData.type.toString().startsWith('project_') && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mã đề tài <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.projectCode || ''}
                    onChange={(e) => handleInputChange('projectCode', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.projectCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ví dụ: B2023-01-123"
                  />
                  {errors.projectCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectCode}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Thời gian thực hiện
                    </label>
                    <input
                      type="text"
                      value={formData.projectDuration || ''}
                      onChange={(e) => handleInputChange('projectDuration', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ví dụ: 24 tháng"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kinh phí (VNĐ)
                    </label>
                    <input
                      type="text"
                      value={formData.fundingAmount || ''}
                      onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ví dụ: 100.000.000"
                    />
                  </div>
                </div>
              </>
            )}

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tải lên minh chứng <span className="text-red-500">*</span>
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.evidence ? 'border-red-500' : 'border-gray-300'
              }`}>
                <Upload className="mx-auto mb-3 text-gray-400" size={40} />
                <p className="text-gray-600 mb-2">
                  Kéo thả file hoặc click để chọn
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  PDF, DOC, DOCX, JPG, PNG (Tối đa 10MB mỗi file)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Chọn file
                </label>
              </div>
              {errors.evidence && (
                <p className="text-red-500 text-sm mt-1">{errors.evidence}</p>
              )}
            </div>

            {/* Uploaded Files */}
            {formData.evidence.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">
                  File đã tải lên ({formData.evidence.length})
                </h4>
                <div className="space-y-2">
                  {formData.evidence.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-3 rounded border border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        <FileText size={20} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">Lưu ý về minh chứng:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Bài báo: File PDF bài báo đã xuất bản</li>
                    <li>Đề tài: Quyết định giao đề tài, hợp đồng, nghiệm thu</li>
                    <li>File phải rõ ràng, đầy đủ thông tin</li>
                    <li>Tên tác giả phải khớp với danh sách đã khai báo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Bước 4: Xem lại thông tin
            </h3>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-1">Loại sản phẩm:</h4>
                <p className="text-gray-800">{selectedCategory?.name}</p>
                <p className="text-sm text-[#1e3a8a] font-semibold mt-1">
                  Giờ quy đổi: {selectedCategory?.hours} giờ
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-1">Tiêu đề:</h4>
                <p className="text-gray-800">{formData.title}</p>
              </div>

              {formData.abstract && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Tóm tắt:</h4>
                  <p className="text-gray-800 text-sm">{formData.abstract}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Tác giả:</h4>
                <div className="space-y-2">
                  {formData.authors.map((author, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                      <span className="text-gray-800">
                        {author.name}
                        {author.isCorresponding && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-2">
                            Tác giả liên hệ
                          </span>
                        )}
                      </span>
                      <span className="text-sm text-gray-600">{author.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {formData.journalName && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Tạp chí:</h4>
                  <p className="text-gray-800">{formData.journalName}</p>
                  {formData.doi && (
                    <p className="text-sm text-gray-600 mt-1">DOI: {formData.doi}</p>
                  )}
                </div>
              )}

              {formData.projectCode && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Mã đề tài:</h4>
                  <p className="text-gray-800">{formData.projectCode}</p>
                  {formData.projectDuration && (
                    <p className="text-sm text-gray-600 mt-1">
                      Thời gian: {formData.projectDuration}
                    </p>
                  )}
                  {formData.fundingAmount && (
                    <p className="text-sm text-gray-600 mt-1">
                      Kinh phí: {formData.fundingAmount} VNĐ
                    </p>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">
                  Minh chứng ({formData.evidence.length} file):
                </h4>
                <div className="space-y-1">
                  {formData.evidence.map((file, idx) => (
                    <div key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                      <FileText size={16} />
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Xác nhận thông tin:</p>
                  <p>
                    Tôi xác nhận rằng các thông tin trên là chính xác và đầy đủ.
                    Sản phẩm sẽ được gửi đến Lãnh đạo Khoa để phê duyệt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              step === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Quay lại
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Tiếp tục
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <CheckCircle size={20} />
              Gửi đăng ký
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
