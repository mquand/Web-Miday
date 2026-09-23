'use client';
import { useState } from 'react';
import { FaHeart, FaPlus, FaTrash, FaTimes, FaCamera, FaCalendarAlt, FaExpand } from 'react-icons/fa';

export default function GallerySection({ photos, onAddPhoto, onDeletePhoto, onLikePhoto }) {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Hẹn hò',
    date: new Date().toLocaleDateString('vi-VN'),
    url: '',
    caption: '',
  });

  const categories = ['Tất cả', 'Hẹn hò', 'Du lịch', 'Kỷ niệm', 'Đời thường'];

  const filteredPhotos = activeCategory === 'Tất cả'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPhoto.url) return;

    onAddPhoto({
      ...newPhoto,
      id: Date.now(),
      likes: 1,
      title: newPhoto.title || 'Khoảnh khắc đáng yêu',
    });

    setNewPhoto({
      title: '',
      category: 'Hẹn hò',
      date: new Date().toLocaleDateString('vi-VN'),
      url: '',
      caption: '',
    });

    setIsModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto((prev) => ({ ...prev, url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 mb-3">
            <FaCamera className="text-xs" />
            <span>Khoảnh Khắc Của Hai Ta</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight" data-aos="fade-up">
            Kho Ảnh Kỷ Niệm
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="80">
            Mỗi bức ảnh là một mảnh ghép lưu giữ nụ cười và ánh mắt ta trao nhau
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6" data-aos="fade-up" data-aos-delay="120">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-1.5 bg-gray-50 p-1.5 rounded-full border border-gray-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Add Photo Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-pink-50 hover:bg-pink-100 text-primary px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95"
            >
              <FaPlus className="text-xs" />
              <span>Thêm ảnh mới</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filteredPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className="group bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative"
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 80}
            >
              {/* Image Frame */}
              <div
                className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100 cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.title || 'Kỷ niệm'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <FaExpand className="text-xl drop-shadow-md" />
                </div>

                {/* Category tag */}
                <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-gray-700 px-2 py-0.5 rounded-md shadow-xs">
                  {photo.category}
                </span>
              </div>

              {/* Caption and Info */}
              <div className="pt-3.5 pb-1 px-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{photo.title}</h4>
                  {photo.caption && (
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2 italic">
                      "{photo.caption}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-50">
                  <span className="flex items-center gap-1 text-[11px]">
                    <FaCalendarAlt className="text-[10px] text-pink-400" />
                    {photo.date}
                  </span>

                  <div className="flex items-center gap-3">
                    {/* Like button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikePhoto(photo.id);
                      }}
                      className="flex items-center gap-1 text-primary hover:scale-110 active:scale-95 transition-transform"
                      title="Thích bức ảnh này"
                    >
                      <FaHeart className="text-xs" />
                      <span className="text-[11px] font-semibold">{photo.likes || 1}</span>
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Bạn có muốn xóa bức ảnh này khỏi album?')) {
                          onDeletePhoto(photo.id);
                        }
                      }}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      title="Xóa ảnh"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Chưa có bức ảnh nào trong danh mục này. Hãy nhấn nút "Thêm ảnh mới" để lưu lại nhé!
          </div>
        )}
      </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center text-sm transition-all"
              >
                <FaTimes />
              </button>

              <div className="max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{selectedPhoto.title}</h3>
                  <span className="text-xs font-semibold text-primary bg-pink-50 px-2.5 py-1 rounded-full">
                    {selectedPhoto.category}
                  </span>
                </div>
                {selectedPhoto.caption && (
                  <p className="text-sm text-gray-600 italic mb-3">"{selectedPhoto.caption}"</p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                  <span>Chụp ngày: {selectedPhoto.date}</span>
                  <div className="flex items-center gap-1.5 text-primary font-semibold">
                    <FaHeart className="text-sm" />
                    <span>{selectedPhoto.likes || 1} lượt yêu thích</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Add Photo Modal */}
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
              <FaCamera className="text-primary text-base" />
              <span>Thêm Ảnh Kỷ Niệm Mới</span>
            </h3>
            <p className="text-xs text-gray-500 mb-6">Lưu lại một khoảnh khắc đẹp của hai bạn vào album</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tiêu đề ảnh</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hoàng hôn trên biển, Nụ cười em..."
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Chủ đề</label>
                  <select
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary bg-white"
                  >
                    {categories.filter(c => c !== 'Tất cả').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Ngày chụp</label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={newPhoto.date}
                    onChange={(e) => setNewPhoto({ ...newPhoto, date: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Hình ảnh *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Dán URL ảnh hoặc nhấn nút Tải ảnh..."
                    value={newPhoto.url}
                    onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Dòng chú thích (Caption)</label>
                <textarea
                  rows={2}
                  placeholder="Ghi chú lại cảm xúc hoặc câu chuyện nhỏ về bức ảnh này..."
                  value={newPhoto.caption}
                  onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
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
                  Lưu vào album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
