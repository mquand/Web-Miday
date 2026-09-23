'use client';
import { useState } from 'react';
import { FaCheckCircle, FaRegCircle, FaPlus, FaTrash, FaTimes, FaListUl, FaStar } from 'react-icons/fa';

export default function BucketListSection({
  items,
  onToggleItem,
  onAddItem,
  onDeleteItem,
  onBurstHearts,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState('Trải nghiệm');

  const categories = ['Trải nghiệm', 'Du lịch', 'Đời thường', 'Tương lai', 'Mãi mãi'];

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    onAddItem({
      id: Date.now(),
      text: newText.trim(),
      category: newCategory,
      completed: false,
    });

    setNewText('');
    setIsModalOpen(false);
  };

  const handleToggle = (id) => {
    const item = items.find((i) => i.id === id);
    if (item && !item.completed && onBurstHearts) {
      // Bắn tim ăn mừng khi hoàn thành một điều ước!
      onBurstHearts();
    }
    onToggleItem(id);
  };

  return (
    <section id="bucketlist" className="py-20 md:py-28 bg-[#FFF9FA] border-y border-pink-100/50">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 mb-3">
            <FaStar className="text-xs" />
            <span>Ước Nguyện Của Hai Ta</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight" data-aos="fade-up">
            Những Điều Cùng Nhau Thực Hiện
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="80">
            Hành trình hạnh phúc được dệt nên từ những ước mơ và dự định chúng mình cùng nhau trải qua
          </p>

          <div className="mt-6" data-aos="fade-up" data-aos-delay="120">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-pink-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <FaPlus className="text-xs" />
              <span>Thêm điều ước mới</span>
            </button>
          </div>
        </div>

        {/* Progress Card */}
        <div
          className="bg-pink-50/50 border border-pink-100 rounded-3xl p-6 md:p-8 mb-8 shadow-xs"
          data-aos="fade-up"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <FaListUl className="text-primary text-sm" />
              <span className="font-bold text-gray-800 text-sm md:text-base">
                Tiến độ hành trình ước mơ
              </span>
            </div>
            <div className="text-sm font-semibold text-primary">
              Đã hoàn thành {completedCount}/{totalCount} mục ({percentage}%)
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-3.5 bg-white border border-pink-200/60 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border transition-all duration-200 group ${
                item.completed
                  ? 'bg-pink-50/30 border-pink-100/70 text-gray-400'
                  : 'bg-white border-gray-100 hover:border-pink-200 hover:shadow-xs text-gray-800'
              }`}
              data-aos="fade-up"
              data-aos-delay={(i % 5) * 50}
            >
              <div
                className="flex items-center gap-3.5 flex-1 cursor-pointer select-none"
                onClick={() => handleToggle(item.id)}
              >
                <button
                  type="button"
                  className="text-xl shrink-0 transition-transform active:scale-90"
                >
                  {item.completed ? (
                    <FaCheckCircle className="text-primary" />
                  ) : (
                    <FaRegCircle className="text-gray-300 group-hover:text-primary transition-colors" />
                  )}
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-sm md:text-base font-medium transition-all ${
                      item.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    {item.text}
                  </span>

                  {item.category && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      {item.category}
                    </span>
                  )}

                  {item.completed && item.completedDate && (
                    <span className="text-[11px] text-pink-500 font-medium">
                      ✓ Đạt được ngày {item.completedDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn xóa điều ước này?')) {
                    onDeleteItem(item.id);
                  }
                }}
                className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Xóa điều ước"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Chưa có điều ước nào. Hãy bấm "Thêm điều ước mới" để cùng nhau lên kế hoạch nhé!
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 text-lg"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <FaStar className="text-primary text-base" />
              <span>Thêm Điều Ước Mới</span>
            </h3>
            <p className="text-xs text-gray-500 mb-6">Thêm một điều hai đứa nhất định sẽ cùng nhau làm</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nội dung điều ước *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cùng nhau đón bình minh trên đỉnh núi..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Chủ đề</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-pink-600 text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  Thêm vào danh sách
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
