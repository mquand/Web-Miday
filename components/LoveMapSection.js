'use client';
import { useState } from 'react';
import { FaMapMarkedAlt, FaMapPin, FaPlus, FaTrash, FaTimes, FaCamera, FaCalendarAlt } from 'react-icons/fa';

export default function LoveMapSection({
  locations,
  onAddLocation,
  onDeleteLocation,
  onBurstHearts,
}) {
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLoc, setNewLoc] = useState({
    city: '',
    title: '',
    date: new Date().toLocaleDateString('vi-VN'),
    image: '',
    story: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newLoc.city || !newLoc.title) return;

    onAddLocation({
      ...newLoc,
      id: Date.now(),
      image: newLoc.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    });

    setNewLoc({
      city: '',
      title: '',
      date: new Date().toLocaleDateString('vi-VN'),
      image: '',
      story: '',
    });

    setIsModalOpen(false);
    if (onBurstHearts) onBurstHearts();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewLoc((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="map" className="py-20 bg-[#FCFCFD]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 mb-3">
            <FaMapMarkedAlt className="text-xs" />
            <span>Dấu Chân Của Hai Ta</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight" data-aos="fade-up">
            Bản Đồ Kỷ Niệm
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="80">
            Nơi ghi dấu những cung đường, miền đất và hành trình khám phá thế giới cùng nhau
          </p>

          <div className="mt-6" data-aos="fade-up" data-aos-delay="120">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-pink-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all active:scale-95 shadow-sm"
            >
              <FaPlus className="text-xs" />
              <span>Ghi dấu điểm đến mới</span>
            </button>
          </div>
        </div>

        {/* Travel Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, i) => (
            <div
              key={loc.id}
              className="bg-white border border-pink-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 80}
            >
              {/* Image Frame */}
              <div
                className="relative aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => setSelectedLoc(loc)}
              >
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-primary font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <FaMapPin className="text-[10px]" />
                  <span>{loc.city}</span>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Bạn có chắc muốn xóa điểm đến "${loc.city}"?`)) {
                      onDeleteLocation(loc.id);
                    }
                  }}
                  className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/40 hover:bg-red-500/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  title="Xóa điểm đến"
                >
                  <FaTrash className="text-[10px]" />
                </button>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-primary transition-colors">
                    {loc.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-3">
                    {loc.story}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-50">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-pink-400" />
                    {loc.date}
                  </span>
                  <button
                    onClick={() => setSelectedLoc(loc)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Xem chi tiết →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Postcard Lightbox Modal */}
      {selectedLoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedLoc(null)}
        >
          <div
            className="bg-[#FFFDFB] border border-pink-200 max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLoc(null)}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/80 rounded-full w-8 h-8 flex items-center justify-center text-xs"
            >
              <FaTimes />
            </button>

            <div className="aspect-video bg-black overflow-hidden">
              <img src={selectedLoc.image} alt={selectedLoc.city} className="w-full h-full object-cover" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary bg-pink-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <FaMapPin />
                  {selectedLoc.city}
                </span>
                <span className="text-xs text-gray-400">{selectedLoc.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{selectedLoc.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed bg-white/70 p-4 rounded-2xl border border-pink-100/60 shadow-inner">
                {selectedLoc.story}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Destination Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 text-lg"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <FaMapMarkedAlt className="text-primary text-base" />
              <span>Ghi Dấu Điểm Đến Mới</span>
            </h3>
            <p className="text-xs text-gray-500 mb-6">Thêm một thành phố hai bạn đã cùng nhau đặt chân tới</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tên địa danh/Tỉnh *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Đà Lạt, Phú Quốc..."
                    value={newLoc.city}
                    onChange={(e) => setNewLoc({ ...newLoc, city: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Ngày đi</label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={newLoc.date}
                    onChange={(e) => setNewLoc({ ...newLoc, date: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tiêu đề kỷ niệm *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng hôn trên biển, Đồi thông sương mù..."
                  value={newLoc.title}
                  onChange={(e) => setNewLoc({ ...newLoc, title: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Hình ảnh kỷ niệm</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Dán link ảnh hoặc tải ảnh..."
                    value={newLoc.image}
                    onChange={(e) => setNewLoc({ ...newLoc, image: e.target.value })}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kỷ niệm đáng nhớ</label>
                <textarea
                  rows={3}
                  placeholder="Ghi lại cảm xúc hoặc câu chuyện nhỏ về chuyến đi..."
                  value={newLoc.story}
                  onChange={(e) => setNewLoc({ ...newLoc, story: e.target.value })}
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
                  Lưu điểm đến
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
