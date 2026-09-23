'use client';
import { useState } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaHeart, FaPlus, FaTrash, FaTimes, FaFeatherAlt } from 'react-icons/fa';

export default function LettersSection({ letters, coupleInfo, onAddLetter, onDeleteLetter }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLetter, setNewLetter] = useState({
    from: coupleInfo.boyName,
    to: coupleInfo.girlName,
    title: '',
    date: new Date().toLocaleDateString('vi-VN'),
    tag: 'Thư Tình',
    content: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newLetter.title || !newLetter.content) return;

    onAddLetter({
      ...newLetter,
      id: Date.now(),
    });

    setNewLetter({
      from: coupleInfo.boyName,
      to: coupleInfo.girlName,
      title: '',
      date: new Date().toLocaleDateString('vi-VN'),
      tag: 'Thư Tình',
      content: '',
    });

    setIsModalOpen(false);
  };

  return (
    <section id="letters" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 mb-3">
            <FaFeatherAlt className="text-xs" />
            <span>Tâm Tình Gửi Người Thương</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight" data-aos="fade-up">
            Hộp Thư Tình Yêu
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="80">
            Nơi cất giữ những lá thư tay, lời tâm sự và lời hứa chân thành của hai đứa
          </p>

          <div className="mt-6" data-aos="fade-up" data-aos-delay="120">
            <button
              onClick={() => {
                setNewLetter((prev) => ({
                  ...prev,
                  from: coupleInfo.boyName,
                  to: coupleInfo.girlName,
                }));
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-pink-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <FaPlus className="text-xs" />
              <span>Viết thư gửi người ấy</span>
            </button>
          </div>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {letters.map((letter, i) => (
            <div
              key={letter.id}
              className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedLetter(letter)}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              {/* Wax Seal / Stamp Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 text-white shadow-md ring-2 ring-rose-200/80 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                  <FaHeart className="text-white text-xs drop-shadow-xs" />
                </div>
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                  {letter.tag || 'Thư Tình'}
                </span>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-1">
                  <span>Từ: </span>
                  <strong className="text-gray-700">{letter.from}</strong>
                  <span> → Gửi: </span>
                  <strong className="text-gray-700">{letter.to}</strong>
                </div>

                <h3 className="font-bold text-gray-800 text-base mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {letter.title}
                </h3>

                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 italic bg-pink-50/30 p-3 rounded-xl mb-4 border border-pink-50">
                  "{letter.content}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span>{letter.date}</span>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-medium text-[11px] group-hover:underline">
                    Mở thư xem →
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Bạn có chắc muốn xóa bức thư "${letter.title}"?`)) {
                        onDeleteLetter(letter.id);
                      }
                    }}
                    className="text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Xóa thư"
                  >
                    <FaTrash className="text-[10px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {letters.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Hộp thư hiện đang trống. Hãy viết bức thư đầu tiên gửi người thương nhé!
          </div>
        )}
      </div>

      {/* Read Letter Modal */}
      {selectedLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedLetter(null)}
        >
          <div
            className="bg-[#FFFDFB] border border-pink-200/80 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLetter(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 text-lg"
            >
              <FaTimes />
            </button>

            {/* Letter Header */}
            <div className="text-center pb-4 mb-4 border-b border-pink-100">
              <div className="w-12 h-12 rounded-full bg-pink-50 border border-pink-200 text-primary flex items-center justify-center mx-auto mb-2 text-lg">
                <FaHeart className="animate-pulse" />
              </div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {selectedLetter.tag || 'Thư Tình'}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mt-1">{selectedLetter.title}</h3>
              <div className="text-xs text-gray-400 mt-1">
                Ngày viết: {selectedLetter.date}
              </div>
            </div>

            {/* Letter Content */}
            <div className="py-2">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Thương gửi {selectedLetter.to},
              </p>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-white/70 p-4 rounded-2xl border border-pink-100/60 shadow-inner">
                {selectedLetter.content}
              </div>
              <p className="text-right text-sm font-semibold text-primary mt-4">
                Người thương: {selectedLetter.from} 💖
              </p>
            </div>

            <div className="flex justify-end pt-4 mt-2 border-t border-pink-100">
              <button
                onClick={() => setSelectedLetter(null)}
                className="bg-primary hover:bg-pink-600 text-white px-6 py-2 rounded-full text-xs font-semibold shadow-xs"
              >
                Gấp lại và cất giữ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Write New Letter Modal */}
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
              <FaFeatherAlt className="text-primary text-base" />
              <span>Viết Thư Gửi Người Thương</span>
            </h3>
            <p className="text-xs text-gray-500 mb-6">Gửi trao những suy nghĩ và lời yêu thương chân thành nhất</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Người gửi *</label>
                  <input
                    type="text"
                    required
                    value={newLetter.from}
                    onChange={(e) => setNewLetter({ ...newLetter, from: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Gửi tới *</label>
                  <input
                    type="text"
                    required
                    value={newLetter.to}
                    onChange={(e) => setNewLetter({ ...newLetter, to: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tiêu đề thư *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Gửi em ngày mưa..."
                    value={newLetter.title}
                    onChange={(e) => setNewLetter({ ...newLetter, title: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nhãn thư</label>
                  <input
                    type="text"
                    placeholder="Thư tình, Kỷ niệm, Nhắn nhủ..."
                    value={newLetter.tag}
                    onChange={(e) => setNewLetter({ ...newLetter, tag: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nội dung thư *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Viết những lời từ tận đáy lòng gửi đến người bạn yêu..."
                  value={newLetter.content}
                  onChange={(e) => setNewLetter({ ...newLetter, content: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary leading-relaxed"
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
                  Gửi thư
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
