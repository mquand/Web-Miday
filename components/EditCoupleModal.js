'use client';
import { useState } from 'react';
import { FaTimes, FaHeart, FaCamera, FaUndo } from 'react-icons/fa';

export default function EditCoupleModal({
  isOpen,
  onClose,
  coupleInfo,
  onSave,
  onResetDefault,
}) {
  const [formData, setFormData] = useState({ ...coupleInfo });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleAvatarUpload = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 text-lg"
        >
          <FaTimes />
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
          <FaHeart className="text-primary text-base" />
          <span>Tùy Chỉnh Thông Tin Cặp Đôi</span>
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Chỉnh sửa thông tin để biến website thành không gian của riêng hai bạn
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Thông tin Chàng */}
          <div className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              Thông Tin Chàng Trai
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên bạn nam *</label>
                <input
                  type="text"
                  required
                  value={formData.boyName}
                  onChange={(e) => setFormData({ ...formData, boyName: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Biệt danh / Danh xưng</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Anh người yêu hay cười..."
                  value={formData.boyNickname}
                  onChange={(e) => setFormData({ ...formData, boyNickname: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Ảnh đại diện chàng</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Dán link ảnh hoặc tải ảnh..."
                    value={formData.boyAvatar}
                    onChange={(e) => setFormData({ ...formData, boyAvatar: e.target.value })}
                    className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary bg-white"
                  />
                  <label className="cursor-pointer bg-white hover:bg-pink-100 hover:text-primary px-3 py-2 rounded-xl border border-gray-200 flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <FaCamera />
                    <span>Tải ảnh</span>
                    <input type="file" accept="image/*" onChange={(e) => handleAvatarUpload('boyAvatar', e)} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin Nàng */}
          <div className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              Thông Tin Cô Gái
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên bạn nữ *</label>
                <input
                  type="text"
                  required
                  value={formData.girlName}
                  onChange={(e) => setFormData({ ...formData, girlName: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Biệt danh / Danh xưng</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cô bé đáng yêu của anh..."
                  value={formData.girlNickname}
                  onChange={(e) => setFormData({ ...formData, girlNickname: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Ảnh đại diện nàng</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Dán link ảnh hoặc tải ảnh..."
                    value={formData.girlAvatar}
                    onChange={(e) => setFormData({ ...formData, girlAvatar: e.target.value })}
                    className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary bg-white"
                  />
                  <label className="cursor-pointer bg-white hover:bg-pink-100 hover:text-primary px-3 py-2 rounded-xl border border-gray-200 flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <FaCamera />
                    <span>Tải ảnh</span>
                    <input type="file" accept="image/*" onChange={(e) => handleAvatarUpload('girlAvatar', e)} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Ngày Bắt Đầu Yêu */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Ngày bắt đầu yêu (Ngày kỷ niệm) *
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Châm ngôn tình yêu */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Câu châm ngôn / Lời gửi gắm
            </label>
            <textarea
              rows={2}
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                if (confirm('Khôi phục lại tất cả thông tin và dữ liệu mẫu ban đầu?')) {
                  onResetDefault();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              <FaUndo className="text-[10px]" />
              <span>Khôi phục dữ liệu mẫu</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-full"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-pink-600 text-white px-6 py-2 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-all"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
