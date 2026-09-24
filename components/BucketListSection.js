'use client';
import { useState } from 'react';
import { FaCheckCircle, FaRegCircle, FaPlus, FaTrash, FaTimes, FaListUl, FaStar, FaFilter } from 'react-icons/fa';
import { playSuccessChime, playSoftTap } from '../utils/soundEffects';

export default function BucketListSection({
  items,
  onToggleItem,
  onAddItem,
  onDeleteItem,
  onBurstHearts,
}) {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState('Trải nghiệm');

  const categories = ['Trải nghiệm', 'Du lịch', 'Đời thường', 'Tương lai', 'Mãi mãi'];
  const filterTabs = ['Tất cả', ...categories, 'Đã xong'];

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Lọc danh sách theo tab
  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'Tất cả') return true;
    if (selectedCategory === 'Đã xong') return item.completed;
    return item.category === selectedCategory;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    playSoftTap();
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
    if (item && !item.completed) {
      // Âm thanh chúc mừng + hiệu ứng bắn tim khi hoàn thành!
      playSuccessChime();
      if (onBurstHearts) onBurstHearts();
    } else {
      playSoftTap();
    }
    onToggleItem(id);
  };

  return (
    <section id="bucketlist" className="py-20 md:py-28 bg-[#FFF9FA] border-y border-pink-100/50">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold px-3.5 py-1 rounded-full bg-pink-50 mb-3 border border-pink-100">
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
              onClick={() => {
                playSoftTap();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all active:scale-95"
            >
              <FaPlus className="text-xs" />
              <span>Thêm điều ước mới</span>
            </button>
          </div>
        </div>

        {/* Progress Card */}
        <div
          className="bg-white/90 backdrop-blur-md border border-pink-200/80 rounded-3xl p-6 md:p-8 mb-8 shadow-sm transition-all hover:shadow-md"
          data-aos="fade-up"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <FaListUl className="text-primary text-sm" />
              <span className="font-bold text-gray-800 text-sm md:text-base">
                Tiến độ hành trình ước mơ
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-primary font-mono bg-pink-50 px-3.5 py-1 rounded-full border border-pink-100 flex items-center gap-1.5 self-start sm:self-auto">
              <span>Đã hoàn thành</span>
              <span className="text-pink-600 font-extrabold">{completedCount}/{totalCount}</span>
              <span>({percentage}%)</span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-3.5 bg-gray-100 border border-pink-100 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-primary rounded-full transition-all duration-700 ease-out shadow-xs"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {percentage === 100 && totalCount > 0 && (
            <p className="text-xs text-primary font-semibold text-center mt-3 animate-pulse">
              🎉 Thật tuyệt vời! Hai bạn đã hoàn thành trọn vẹn tất cả mục tiêu tình yêu!
            </p>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none text-xs font-semibold select-none" data-aos="fade-up">
          {filterTabs.map((tab) => {
            const count = tab === 'Tất cả' 
              ? items.length 
              : tab === 'Đã xong'
              ? completedCount
              : items.filter((i) => i.category === tab).length;

            const isActive = selectedCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  playSoftTap();
                  setSelectedCategory(tab);
                }}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-primary text-white shadow-xs font-bold'
                    : 'bg-white/80 hover:bg-pink-50 text-gray-600 border border-pink-100/70 hover:border-pink-200'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Wishlist Items List */}
        <div className="space-y-3">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border transition-all duration-200 group ${
                item.completed
                  ? 'bg-pink-50/30 border-pink-100/60 text-gray-400'
                  : 'bg-white border-pink-100/80 hover:border-primary hover:shadow-md hover:-translate-y-0.5 text-gray-800'
              }`}
              data-aos="fade-up"
              data-aos-delay={(i % 5) * 40}
            >
              <div
                className="flex items-center gap-3.5 flex-1 cursor-pointer select-none"
                onClick={() => handleToggle(item.id)}
              >
                <button
                  type="button"
                  className="text-xl shrink-0 transition-transform active:scale-90"
                  aria-label={item.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}
                >
                  {item.completed ? (
                    <FaCheckCircle className="text-primary animate-check-pop" />
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
                      ✓ Hoàn thành: {item.completedDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => {
                  playSoftTap();
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

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm bg-white/60 rounded-3xl border border-dashed border-pink-200">
            {selectedCategory === 'Tất cả'
              ? 'Chưa có điều ước nào. Hãy bấm "Thêm điều ước mới" để cùng nhau lên kế hoạch nhé!'
              : `Chưa có mục nào trong danh mục "${selectedCategory}".`}
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm modal-backdrop-smooth">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                playSoftTap();
                setIsModalOpen(false);
              }}
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
                  placeholder="Ví dụ: Cùng nhau ngắm cực quang ở Na Uy..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Chủ đề</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary bg-white transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    playSoftTap();
                    setIsModalOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-pink-600 text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
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
