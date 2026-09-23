'use client';
import { useState } from 'react';
import { FaHeart, FaPlus, FaTrash, FaMapMarkerAlt, FaCalendarAlt, FaTimes, FaCamera } from 'react-icons/fa';

export default function TimelineSection({ milestones, onAddMilestone, onDeleteMilestone }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Kỷ niệm',
    location: '',
    image: '',
    description: '',
  });

  const categories = ['Gặp gỡ', 'Tỏ tình', 'Hẹn hò', 'Du lịch', 'Kỷ niệm', 'Bất ngờ'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMilestone.title || !newMilestone.date) return;

    onAddMilestone({
      ...newMilestone,
      id: Date.now(),
    });

    setNewMilestone({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Kỷ niệm',
      location: '',
      image: '',
      description: '',
    });

    setIsModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMilestone((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Sắp xếp theo ngày tăng dần
  const sortedMilestones = [...milestones].sort((a, b) => new Date(a.date) - new Date(b.date));

  const formatDisplayDate = (dateStr) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="timeline" className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 mb-3">
            <FaHeart className="text-xs" />
            <span>Dấu Ấn Thời Gian</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight" data-aos="fade-up">
            Hành Trình Tình Yêu
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="80">
            Những cột mốc và bước ngoặt đáng nhớ chúng mình đã cùng nhau viết nên
          </p>

          <div className="mt-6" data-aos="fade-up" data-aos-delay="120">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-pink-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <FaPlus className="text-xs" />
              <span>Thêm cột mốc mới</span>
            </button>
          </div>
        </div>

        {/* Timeline list */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100"></div>

          <div className="space-y-10 md:space-y-12">
            {sortedMilestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  data-aos={isEven ? 'fade-left' : 'fade-right'}
                >
                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-md z-10">
                    <FaHeart className="text-primary text-xs animate-pulse" />
                  </div>

                  {/* Spacer for mobile margin */}
                  <div className="w-10 shrink-0 md:hidden"></div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-[44%] bg-white rounded-2xl p-5 md:p-6 border border-pink-100/80 shadow-sm hover:shadow-md transition-shadow relative group ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    {/* Delete button */}
                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc muốn xóa cột mốc "${item.title}"?`)) {
                          onDeleteMilestone(item.id);
                        }
                      }}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1.5"
                      title="Xóa cột mốc này"
                    >
                      <FaTrash className="text-xs" />
                    </button>

                    {/* Metadata Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-pink-50 px-2.5 py-0.5 rounded-full">
                        <FaCalendarAlt className="text-[10px]" />
                        {formatDisplayDate(item.date)}
                      </span>
                      {item.category && (
                        <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      )}
                      {item.location && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                          <FaMapMarkerAlt className="text-[10px] text-pink-400" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>

                    {/* Milestone Image */}
                    {item.image && (
                      <div className="mb-3 overflow-hidden rounded-xl bg-gray-50 max-h-56">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal: Thêm Cột Mốc Mới */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 text-lg"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <FaHeart className="text-primary text-base" />
              <span>Ghi Lại Cột Mốc Mới</span>
            </h3>
            <p className="text-xs text-gray-500 mb-6">Thêm một khoảnh khắc ý nghĩa vào hành trình của hai bạn</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tiêu đề cột mốc *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Chuyến du lịch đầu tiên, Lời tỏ tình..."
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Ngày diễn ra *</label>
                  <input
                    type="date"
                    required
                    value={newMilestone.date}
                    onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Chủ đề</label>
                  <select
                    value={newMilestone.category}
                    onChange={(e) => setNewMilestone({ ...newMilestone, category: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Địa điểm</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Đà Lạt, Cà phê The Muse, Hà Nội..."
                  value={newMilestone.location}
                  onChange={(e) => setNewMilestone({ ...newMilestone, location: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Hình ảnh kỷ niệm</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Dán link ảnh hoặc tải ảnh bên cạnh..."
                    value={newMilestone.image}
                    onChange={(e) => setNewMilestone({ ...newMilestone, image: e.target.value })}
                    className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                  <label className="cursor-pointer bg-gray-100 hover:bg-pink-50 hover:text-primary px-3 py-2.5 rounded-xl border border-gray-200 flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <FaCamera />
                    <span>Tải ảnh</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Câu chuyện / Cảm xúc</label>
                <textarea
                  rows={3}
                  placeholder="Ghi lại những cảm xúc và ký ức chân thật nhất của khoảnh khắc ấy..."
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                ></textarea>
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
                  Lưu cột mốc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
