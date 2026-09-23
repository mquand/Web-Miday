'use client';
import { useState, useEffect } from 'react';
import { FaClock, FaPlus, FaTrash, FaTimes, FaCalendarCheck } from 'react-icons/fa';

export default function UpcomingCountdown({ countdowns, onAddCountdown, onDeleteCountdown, onBurstHearts }) {
  const [timeLefts, setTimeLefts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    icon: '💖',
    note: '',
  });

  const icons = ['🥂', '🎂', '🎁', '✈️', '💍', '💖', '🏖️', '🎆'];

  // Cập nhật đếm ngược mỗi giây
  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date().getTime();
      const newTimeLefts = {};

      countdowns.forEach((item) => {
        const target = new Date(item.date).getTime();
        const diff = target - now;

        if (diff <= 0) {
          newTimeLefts[item.id] = { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true };
        } else {
          newTimeLefts[item.id] = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
            isToday: false,
          };
        }
      });

      setTimeLefts(newTimeLefts);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [countdowns]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    onAddCountdown({
      ...newEvent,
      id: Date.now(),
      date: newEvent.date.includes('T') ? newEvent.date : `${newEvent.date}T00:00:00`,
    });

    setNewEvent({
      title: '',
      date: '',
      icon: '💖',
      note: '',
    });

    setIsModalOpen(false);
    if (onBurstHearts) onBurstHearts();
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN');
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="countdown" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 mb-3">
            <FaClock className="text-xs" />
            <span>Chờ Đón Tương Lai</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight" data-aos="fade-up">
            Đếm Ngược Ngày Kỷ Niệm
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="80">
            Từng ngày trôi qua là thêm một bước chúng mình cùng chạm tới những cột mốc đặc biệt
          </p>

          <div className="mt-6" data-aos="fade-up" data-aos-delay="120">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-primary text-xs font-semibold px-4 py-2 rounded-full transition-all active:scale-95"
            >
              <FaPlus className="text-xs" />
              <span>Thêm sự kiện đếm ngược</span>
            </button>
          </div>
        </div>

        {/* Countdowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {countdowns.map((item, i) => {
            const time = timeLefts[item.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
            return (
              <div
                key={item.id}
                className="bg-[#FFFDFD] border border-pink-100 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between group"
                data-aos="fade-up"
                data-aos-delay={(i % 4) * 80}
              >
                {/* Delete button */}
                <button
                  onClick={() => {
                    if (confirm(`Bạn có chắc muốn xóa sự kiện "${item.title}"?`)) {
                      onDeleteCountdown(item.id);
                    }
                  }}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Xóa sự kiện"
                >
                  <FaTrash className="text-xs" />
                </button>

                {/* Top info */}
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-2xl p-2 rounded-2xl bg-pink-50 border border-pink-100">
                      {item.icon || '💖'}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.title}</h3>
                      <span className="text-[11px] text-gray-400">{formatDate(item.date)}</span>
                    </div>
                  </div>

                  {item.note && (
                    <p className="text-xs text-gray-500 italic mb-4 line-clamp-1">"{item.note}"</p>
                  )}
                </div>

                {/* Counter boxes */}
                {time.isToday ? (
                  <div className="bg-pink-100 text-primary font-bold text-center py-4 rounded-2xl animate-pulse text-sm">
                    🎉 Hôm nay là ngày đặc biệt!
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-1.5 text-center pt-2 border-t border-pink-50">
                    <div className="bg-white border border-pink-100/70 p-2 rounded-xl">
                      <div className="text-lg font-black text-primary leading-tight">{time.days}</div>
                      <div className="text-[10px] text-gray-400 font-medium">ngày</div>
                    </div>
                    <div className="bg-white border border-pink-100/70 p-2 rounded-xl">
                      <div className="text-lg font-black text-primary leading-tight">
                        {time.hours.toString().padStart(2, '0')}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium">giờ</div>
                    </div>
                    <div className="bg-white border border-pink-100/70 p-2 rounded-xl">
                      <div className="text-lg font-black text-primary leading-tight">
                        {time.minutes.toString().padStart(2, '0')}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium">phút</div>
                    </div>
                    <div className="bg-white border border-pink-100/70 p-2 rounded-xl">
                      <div className="text-lg font-black text-primary leading-tight">
                        {time.seconds.toString().padStart(2, '0')}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium">giây</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Add Countdown */}
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
              <FaCalendarCheck className="text-primary text-base" />
              <span>Thêm Sự Kiện Đếm Ngược</span>
            </h3>
            <p className="text-xs text-gray-500 mb-6">Thêm một ngày ý nghĩa sắp tới để hai bạn cùng chờ đón</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên sự kiện *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Kỷ niệm 2 năm, Chuyến đi Phú Quốc..."
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Ngày diễn ra *</label>
                <input
                  type="date"
                  required
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Biểu tượng</label>
                <div className="flex gap-2">
                  {icons.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, icon: ic })}
                      className={`text-xl p-2 rounded-xl border transition-all ${
                        newEvent.icon === ic ? 'border-primary bg-pink-50 scale-110' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Lời nhắn nhủ</label>
                <input
                  type="text"
                  placeholder="Ghi chú ngắn về ngày đặc biệt này..."
                  value={newEvent.note}
                  onChange={(e) => setNewEvent({ ...newEvent, note: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
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
                  Lưu sự kiện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
