'use client';
import { useState, useEffect, useRef } from 'react';
import {
  FaHeart,
  FaRegHeart,
  FaPlus,
  FaTrash,
  FaTimes,
  FaCamera,
  FaCalendarAlt,
  FaExpand,
  FaFilm,
  FaThLarge,
  FaPlay,
  FaPause,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaFolderOpen,
  FaSortAmountDown,
  FaThumbtack,
} from 'react-icons/fa';

export default function GallerySection({ photos, onAddPhoto, onDeletePhoto, onLikePhoto }) {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'likes'
  const [viewMode, setViewMode] = useState('polaroid'); // 'polaroid' | 'masonry' | 'film'
  
  // Lightbox & Slideshow state
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);
  
  // Add photo modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Hẹn hò',
    date: new Date().toLocaleDateString('vi-VN'),
    url: '',
    caption: '',
  });

  const filmScrollRef = useRef(null);
  const slideshowTimerRef = useRef(null);

  const categories = ['Tất cả', 'Hẹn hò', 'Du lịch', 'Kỷ niệm', 'Đời thường'];

  // Tính toán bộ lọc & sắp xếp
  const filteredPhotos = photos
    .filter((p) => {
      const matchCat = activeCategory === 'Tất cả' || p.category === activeCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.caption && p.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
      if (sortBy === 'oldest') return (a.id || 0) - (b.id || 0);
      return (b.id || 0) - (a.id || 0); // newest
    });

  const totalLikes = photos.reduce((sum, p) => sum + (p.likes || 1), 0);

  // Keyboard navigation for Lightbox & Slideshow
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex !== null) {
        if (e.key === 'ArrowRight') handleNextPhoto();
        if (e.key === 'ArrowLeft') handlePrevPhoto();
        if (e.key === 'Escape') setSelectedPhotoIndex(null);
      }
      if (isSlideshowOpen) {
        if (e.key === 'ArrowRight') handleNextSlide();
        if (e.key === 'ArrowLeft') handlePrevSlide();
        if (e.key === 'Escape') setIsSlideshowOpen(false);
        if (e.key === ' ') {
          e.preventDefault();
          setIsSlideshowPlaying((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, isSlideshowOpen, filteredPhotos.length]);

  // Slideshow timer
  useEffect(() => {
    if (isSlideshowOpen && isSlideshowPlaying && filteredPhotos.length > 0) {
      slideshowTimerRef.current = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % filteredPhotos.length);
      }, 4500);
    }
    return () => clearInterval(slideshowTimerRef.current);
  }, [isSlideshowOpen, isSlideshowPlaying, filteredPhotos.length]);

  // Điều khiển Slideshow
  const startSlideshow = () => {
    if (filteredPhotos.length === 0) return;
    setSlideshowIndex(0);
    setIsSlideshowPlaying(true);
    setIsSlideshowOpen(true);
  };

  const handleNextSlide = () => {
    setSlideshowIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrevSlide = () => {
    setSlideshowIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  // Điều khiển Lightbox
  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  // Cuộn phim dải 35mm
  const scrollFilm = (direction) => {
    if (filmScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      filmScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Thêm ảnh mới
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

  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;
  const currentSlide = isSlideshowOpen ? filteredPhotos[slideshowIndex] : null;

  // Góc nghiêng ngẫu hứng cho phong cách Polaroid
  const tiltClasses = [
    '-rotate-1.5',
    'rotate-1',
    '-rotate-1',
    'rotate-2',
    '-rotate-2',
    'rotate-1.5',
  ];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#FCFBF9] relative overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* ========================================================
            HEADER: KHO LƯU TRỮ KỶ NIỆM (MEMORY ARCHIVE VAULT)
            ======================================================== */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold px-4 py-1.5 rounded-full bg-pink-50 border border-pink-100 shadow-xs mb-3">
            <FaFolderOpen className="text-xs text-primary" />
            <span className="tracking-wide uppercase">Hệ Thống Kho Lưu Trữ Kỷ Niệm • Memory Vault</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight" data-aos="fade-up">
            Kho Ảnh Kỷ Niệm Của Hai Ta
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto" data-aos="fade-up" data-aos-delay="60">
            Nơi gìn giữ từng nụ cười, góc phố, chuyến đi và ánh mắt trao nhau qua năm tháng.
          </p>

          {/* Vault Stats Bar: Thống kê đúng chất một kho lưu trữ */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-7 p-3.5 bg-white/90 backdrop-blur-md rounded-2xl border border-pink-100/80 shadow-xs"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-3 px-3 py-2 border-r border-gray-100 last:border-0">
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-primary shrink-0">
                <FaCamera className="text-base" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-gray-800 leading-tight">{photos.length}</p>
                <p className="text-[11px] text-gray-400 font-medium">Ảnh lưu trữ</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 border-r border-gray-100 last:border-0">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                <FaFolderOpen className="text-base" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-gray-800 leading-tight">
                  {categories.filter((c) => c !== 'Tất cả').length}
                </p>
                <p className="text-[11px] text-gray-400 font-medium">Bộ sưu tập</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 border-r border-gray-100 last:border-0">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                <FaHeart className="text-base" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-gray-800 leading-tight">{totalLikes}</p>
                <p className="text-[11px] text-gray-400 font-medium">Lượt thả tim</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <FaFilm className="text-base" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-gray-800 leading-tight">35mm</p>
                <p className="text-[11px] text-gray-400 font-medium">Chất phim retro</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            VAULT TOOLBAR: TÌM KIẾM, CHẾ ĐỘ XEM, TRÌNH CHIẾU & THÊM ẢNH
            ======================================================== */}
        <div
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, caption, địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-gray-50 border border-gray-200/80 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex flex-wrap items-center gap-2.5 justify-between lg:justify-end">
            {/* View Mode Switcher */}
            <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200/60">
              <button
                onClick={() => setViewMode('polaroid')}
                title="Chế độ Album Polaroid"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'polaroid'
                    ? 'bg-white text-primary shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaThumbtack className="text-xs" />
                <span className="hidden sm:inline">Polaroid</span>
              </button>

              <button
                onClick={() => setViewMode('masonry')}
                title="Chế độ Phòng tranh Nghệ thuật"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'masonry'
                    ? 'bg-white text-primary shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaThLarge className="text-xs" />
                <span className="hidden sm:inline">Phòng tranh</span>
              </button>

              <button
                onClick={() => setViewMode('film')}
                title="Chế độ Cuộn phim 35mm"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'film'
                    ? 'bg-white text-primary shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaFilm className="text-xs" />
                <span className="hidden sm:inline">Cuộn phim</span>
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200/80 px-2.5 py-1.5 rounded-xl">
              <FaSortAmountDown className="text-gray-400 text-xs" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none text-xs font-medium cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="likes">Nhiều tim nhất</option>
              </select>
            </div>

            {/* Cinema Slideshow Button */}
            <button
              onClick={startSlideshow}
              className="inline-flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200/70 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-xs"
              title="Khởi chiếu rạp chiếu ký niệm toàn màn hình"
            >
              <FaPlay className="text-[10px]" />
              <span>Trình chiếu</span>
            </button>

            {/* Add Photo Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-primary hover:bg-pink-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-xs"
            >
              <FaPlus className="text-[10px]" />
              <span>Nhập ảnh mới</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            CATEGORY ALBUM TABS (BỘ SƯU TẬP THEO CHỦ ĐỀ)
            ======================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const count =
              cat === 'Tất cả'
                ? photos.length
                : photos.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-pink-200 scale-105'
                    : 'bg-white text-gray-600 hover:text-primary border border-gray-200 hover:border-pink-200 shadow-xs'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            VIEW MODE 1: POLAROID SCRAPBOOK (ALBUM ẢNH CHỤP LẤY LIỀN)
            ======================================================== */}
        {viewMode === 'polaroid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-4">
            {filteredPhotos.map((photo, i) => {
              const tilt = tiltClasses[i % tiltClasses.length];
              return (
                <div
                  key={photo.id}
                  className={`group relative bg-white p-4 pb-5 rounded-md shadow-md hover:shadow-2xl transition-all duration-300 transform ${tilt} hover:rotate-0 hover:scale-[1.03] hover:z-20 border border-gray-200/60 cursor-pointer flex flex-col justify-between`}
                  onClick={() => setSelectedPhotoIndex(i)}
                  data-aos="fade-up"
                  data-aos-delay={(i % 3) * 70}
                >
                  {/* Decorative Washi Tape on top */}
                  <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-xs opacity-90 group-hover:opacity-100 transition-opacity z-10" />

                  {/* Photo Frame Container */}
                  <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden rounded-xs mb-3.5 shadow-inner">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                      <span className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors">
                        <FaExpand className="text-sm" />
                      </span>
                    </div>

                    {/* Category pill on image */}
                    <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      {photo.category}
                    </span>
                  </div>

                  {/* Handwritten Polaroid Info Area */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-gray-800 text-sm tracking-tight line-clamp-1">
                        {photo.title}
                      </h4>
                      {/* Retro camera date stamp */}
                      <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-xs shrink-0 tracking-widest border border-amber-200/60">
                        '{photo.date.slice(-8)}
                      </span>
                    </div>

                    {photo.caption && (
                      <p className="text-xs text-gray-600 italic line-clamp-2 leading-relaxed mb-3">
                        "{photo.caption}"
                      </p>
                    )}
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-dashed border-gray-200 text-xs text-gray-400 mt-auto">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                      <FaCalendarAlt className="text-[10px] text-primary" />
                      {photo.date}
                    </span>

                    <div className="flex items-center gap-3">
                      {/* Like button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLikePhoto(photo.id);
                        }}
                        className="flex items-center gap-1.5 text-primary hover:scale-115 active:scale-95 transition-transform"
                        title="Thả tim kỷ niệm này"
                      >
                        <FaHeart className="text-xs" />
                        <span className="text-xs font-bold">{photo.likes || 1}</span>
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Bạn có chắc muốn xóa bức ảnh này khỏi kho kỷ niệm?')) {
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
              );
            })}
          </div>
        )}

        {/* ========================================================
            VIEW MODE 2: MASONRY / ART GALLERY (PHÒNG TRƯNG BÀY NGHỆ THUẬT)
            ======================================================== */}
        {viewMode === 'masonry' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
                onClick={() => setSelectedPhotoIndex(i)}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 70}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <p className="text-xs italic text-gray-200 line-clamp-2 mb-2">
                      "{photo.caption || photo.title}"
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] text-gray-300">{photo.date}</span>
                      <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold">
                        <FaExpand className="text-[10px]" /> Phóng to
                      </span>
                    </div>
                  </div>

                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {photo.category}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{photo.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{photo.date}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikePhoto(photo.id);
                    }}
                    className="flex items-center gap-1.5 text-primary bg-pink-50 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors"
                  >
                    <FaHeart className="text-xs" />
                    <span className="text-xs font-bold">{photo.likes || 1}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            VIEW MODE 3: 35MM VINTAGE FILM REEL STRIP (CUỘN PHIM HOÀI NIỆM)
            ======================================================== */}
        {viewMode === 'film' && (
          <div className="relative bg-neutral-950 py-10 px-4 md:px-8 rounded-3xl shadow-2xl border border-neutral-800">
            {/* Film brand heading */}
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-amber-500/80 px-2">
              <span className="tracking-widest flex items-center gap-2">
                <FaFilm className="text-amber-500" /> KODAK PORTRA 400 • COLOR REVERSAL FILM • 35MM
              </span>
              <span className="text-gray-400 text-[11px]">Cuộn ngang để xem cuộn phim ký ức</span>
            </div>

            {/* Sprocket holes on top */}
            <div className="h-6 film-sprockets mb-4 opacity-50" />

            {/* Horizontal Film Reel Carousel */}
            <div
              ref={filmScrollRef}
              className="flex items-center gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth"
            >
              {filteredPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="group relative shrink-0 w-72 md:w-80 bg-neutral-900 border-2 border-neutral-800 rounded-xl overflow-hidden p-3 shadow-lg hover:border-amber-500/60 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedPhotoIndex(i)}
                >
                  {/* Film frame number header */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mb-2 px-1">
                    <span>FRAME #{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-amber-500 font-bold">{photo.category}</span>
                  </div>

                  {/* Frame image */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black mb-3">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <FaExpand className="text-lg drop-shadow-md" />
                    </div>
                  </div>

                  {/* Film Caption */}
                  <div className="text-left px-1">
                    <h4 className="text-neutral-100 text-xs font-semibold line-clamp-1 mb-1">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-2 italic mb-2">
                      "{photo.caption || 'Khoảnh khắc đáng nhớ'}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-2 border-t border-neutral-800">
                      <span>{photo.date}</span>
                      <span className="text-rose-400 flex items-center gap-1 font-sans">
                        <FaHeart className="text-[9px]" /> {photo.likes || 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sprocket holes on bottom */}
            <div className="h-6 film-sprockets mt-4 opacity-50" />

            {/* Scroll Navigation Arrows */}
            <button
              onClick={() => scrollFilm('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all z-10 border border-white/20"
              title="Cuộn sang trái"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={() => scrollFilm('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all z-10 border border-white/20"
              title="Cuộn sang phải"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 shadow-xs">
            <div className="w-16 h-16 bg-pink-50 text-primary rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
              <FaCamera />
            </div>
            <h4 className="text-base font-bold text-gray-800 mb-1">Không tìm thấy khoảnh khắc nào</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-5">
              Chưa có bức ảnh nào khớp với bộ lọc "{activeCategory}" hoặc từ khóa "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setActiveCategory('Tất cả');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* ========================================================
          FULLSCREEN CINEMA SLIDESHOW (RẠP CHIẾU KỶ NIỆM TOÀN MÀN HÌNH)
          ======================================================== */}
      {isSlideshowOpen && currentSlide && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 md:p-8 animate-in fade-in duration-300">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-gray-300">
                Cinema Slideshow • Kỷ niệm {slideshowIndex + 1}/{filteredPhotos.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm"
                title={isSlideshowPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
              >
                {isSlideshowPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <button
                onClick={() => setIsSlideshowOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-base"
                title="Đóng trình chiếu (ESC)"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Main Slide Image Display */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
            <div className="relative max-h-[70vh] max-w-5xl w-full h-full flex items-center justify-center">
              <img
                key={currentSlide.id}
                src={currentSlide.url}
                alt={currentSlide.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl animate-kenburns transition-all duration-700"
              />
            </div>

            {/* Prev / Next slide controls */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-lg backdrop-blur-md transition-all border border-white/10"
              title="Kỷ niệm trước (Mũi tên trái)"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-lg backdrop-blur-md transition-all border border-white/10"
              title="Kỷ niệm tiếp theo (Mũi tên phải)"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Bottom Captions & Slide Details */}
          <div className="max-w-2xl mx-auto w-full text-center text-white pb-2 z-10">
            <span className="text-[11px] font-semibold text-primary bg-primary/20 border border-primary/40 px-3 py-1 rounded-full uppercase tracking-wider">
              {currentSlide.category}
            </span>
            <h3 className="text-xl md:text-2xl font-bold mt-2">{currentSlide.title}</h3>
            {currentSlide.caption && (
              <p className="text-sm text-gray-300 italic mt-1 max-w-lg mx-auto">
                "{currentSlide.caption}"
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2 font-mono">{currentSlide.date}</p>
          </div>
        </div>
      )}

      {/* ========================================================
          FULL LIGHTBOX MODAL (XEM CHI TIẾT TỪNG BỨC ẢNH)
          ======================================================== */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 z-20 text-white bg-black/60 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center text-sm transition-all shadow-md"
              title="Đóng (ESC)"
            >
              <FaTimes />
            </button>

            {/* Left: Image Canvas with Navigation Arrows */}
            <div className="relative md:w-3/5 bg-neutral-950 flex items-center justify-center min-h-[320px] md:min-h-[500px] overflow-hidden">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain p-2"
              />

              {/* Prev / Next photo buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-sm backdrop-blur-md transition-all"
                title="Ảnh trước"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-sm backdrop-blur-md transition-all"
                title="Ảnh tiếp theo"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Right: Info & Actions Sidebar */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold text-primary bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                    {currentPhoto.category}
                  </span>
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                    <FaCalendarAlt className="text-pink-400 text-[11px]" />
                    {currentPhoto.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                  {currentPhoto.title}
                </h3>

                {currentPhoto.caption && (
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-600 leading-relaxed italic mb-4">
                    "{currentPhoto.caption}"
                  </div>
                )}
              </div>

              {/* Action Buttons: Like, Download, Delete */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onLikePhoto(currentPhoto.id)}
                    className="flex items-center gap-2 text-primary font-bold text-sm bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-xl transition-all active:scale-95"
                  >
                    <FaHeart className="text-base" />
                    <span>{currentPhoto.likes || 1} lượt yêu thích</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={currentPhoto.url}
                      download={`kyniem_${currentPhoto.id}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors text-xs"
                      title="Tải ảnh về máy"
                    >
                      <FaDownload />
                    </a>

                    <button
                      onClick={() => {
                        if (confirm('Bạn có chắc muốn xóa bức ảnh này khỏi kho kỷ niệm?')) {
                          onDeletePhoto(currentPhoto.id);
                          setSelectedPhotoIndex(null);
                        }
                      }}
                      className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors text-xs"
                      title="Xóa bức ảnh này"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 text-center font-mono pt-1">
                  Kỷ niệm {selectedPhotoIndex + 1} trên {filteredPhotos.length} ảnh
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          ADD PHOTO MODAL: NHẬP KHO ẢNH KỶ NIỆM MỚI
          ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 text-lg"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <FaCamera className="text-primary text-base" />
              <span>Nhập Kho Ảnh Kỷ Niệm Mới</span>
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Lưu giữ vĩnh viễn thêm một khoảnh khắc ngọt ngào của hai bạn
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tiêu đề ảnh *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng hôn trên biển, Nụ cười em..."
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Chủ đề / Album</label>
                  <select
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary bg-white"
                  >
                    {categories
                      .filter((c) => c !== 'Tất cả')
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
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
                    placeholder="Dán URL ảnh hoặc chọn Tải ảnh..."
                    value={newPhoto.url}
                    onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                    className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                  <label className="cursor-pointer bg-gray-100 hover:bg-pink-50 hover:text-primary px-3.5 py-2.5 rounded-xl border border-gray-200 flex items-center gap-1.5 text-xs font-medium text-gray-600 transition-colors">
                    <FaCamera />
                    <span>Tải ảnh</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preview Thumbnail if image uploaded */}
                {newPhoto.url && (
                  <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={newPhoto.url}
                      alt="Xem trước ảnh"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md">
                      Xem trước ảnh tải lên
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Dòng nhật ký / Chú thích (Caption)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ghi chú lại cảm xúc, câu chuyện hoặc kỷ niệm về bức ảnh này..."
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
                  className="bg-primary hover:bg-pink-600 text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Lưu vào kho ảnh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
