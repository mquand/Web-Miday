'use client';
import { useState, useRef, useEffect } from 'react';
import { FaUtensils, FaMapMarkerAlt, FaPlus, FaTrash, FaRedo, FaHeart } from 'react-icons/fa';

export default function DateNightWheel({
  foodOptions,
  dateOptions,
  onUpdateFoods,
  onUpdateDates,
  onBurstHearts,
}) {
  const [activeTab, setActiveTab] = useState('food'); // 'food' | 'date'
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [newItemText, setNewItemText] = useState('');
  const canvasRef = useRef(null);
  const currentRotation = useRef(0);

  const items = activeTab === 'food' ? foodOptions : dateOptions;
  const updateItems = activeTab === 'food' ? onUpdateFoods : onUpdateDates;

  const colors = [
    '#FF6B81', '#FFA4B6', '#FF8597', '#FFC2CD',
    '#FA5252', '#F783AC', '#E599F7', '#FF922B'
  ];

  // Vẽ bánh xe lên canvas
  const drawWheel = (angle = currentRotation.current) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 15;
    const numItems = items.length;
    if (numItems === 0) return;

    const arcSize = (2 * Math.PI) / numItems;

    ctx.clearRect(0, 0, width, height);

    // Vẽ các lát cắt bánh xe
    for (let i = 0; i < numItems; i++) {
      const sliceAngle = angle + i * arcSize;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, sliceAngle, sliceAngle + arcSize);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Vẽ chữ
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sliceAngle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 3;
      
      // Giới hạn độ dài chữ
      const label = items[i].length > 15 ? items[i].slice(0, 14) + '...' : items[i];
      ctx.fillText(label, radius - 20, 4);
      ctx.restore();
    }

    // Tâm bánh xe
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FF6B81';
    ctx.stroke();

    // Icon tim ở tâm
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', centerX, centerY);
  };

  useEffect(() => {
    drawWheel();
  }, [items, activeTab]);

  // Hàm quay bánh xe
  const spinWheel = () => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    // Tính toán góc quay ngẫu nhiên: quay ít nhất 5 vòng (10 * PI) + góc ngẫu nhiên
    const extraRounds = 5 + Math.random() * 3;
    const totalAngle = extraRounds * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 4000; // 4 giây
    const startTime = performance.now();
    const startAngle = currentRotation.current;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing out cubic để quay chậm dần
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startAngle + totalAngle * easeOut;

      currentRotation.current = currentAngle;
      drawWheel(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        // Tính toán mục trúng thưởng (kim chỉ ở góc 3 giờ hoặc 12 giờ: ở đây kim ở góc trên 270 độ / -PI/2)
        const numItems = items.length;
        const arcSize = (2 * Math.PI) / numItems;
        // Chuẩn hóa góc quay về khoảng [0, 2*PI)
        const normalizedAngle = (currentAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        // Kim chỉ ở đỉnh bánh xe (góc 3*PI/2)
        const pointerAngle = (3 * Math.PI) / 2;
        const relativeAngle = (pointerAngle - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);
        const winningIndex = Math.floor(relativeAngle / arcSize);
        const selected = items[winningIndex % numItems];
        
        setWinner(selected);
        if (onBurstHearts) onBurstHearts();
      }
    };

    requestAnimationFrame(animate);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    updateItems([...items, newItemText.trim()]);
    setNewItemText('');
  };

  const handleDeleteItem = (index) => {
    if (items.length <= 2) {
      alert('Vòng quay cần có tối thiểu 2 lựa chọn nhé!');
      return;
    }
    const updated = items.filter((_, idx) => idx !== index);
    updateItems(updated);
  };

  return (
    <section id="wheel" className="py-20 bg-[#FCFCFD]">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 mb-3">
            <FaUtensils className="text-xs" />
            <span>Trò Chơi Hẹn Hò</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight" data-aos="fade-up">
            Vòng Quay Quyết Định
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="80">
            Hôm nay ăn gì, đi đâu? Hãy để chiếc bánh xe tình yêu bí mật chọn giúp hai đứa nhé!
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1 bg-white border border-pink-100 rounded-full mt-6 shadow-xs">
            <button
              onClick={() => {
                setActiveTab('food');
                setWinner(null);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'food'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <FaUtensils className="text-xs" />
              <span>Hôm nay ăn gì?</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('date');
                setWinner(null);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'date'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <FaMapMarkerAlt className="text-xs" />
              <span>Hẹn hò ở đâu?</span>
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-pink-100/80 rounded-3xl p-6 md:p-10 shadow-sm">
          {/* Wheel Canvas (Left) */}
          <div className="md:col-span-6 flex flex-col items-center justify-center relative">
            {/* Pointer Pin at top */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 text-primary drop-shadow-md">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-primary"></div>
            </div>

            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] drop-shadow-md"
            />

            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`mt-6 px-8 py-3 rounded-full text-sm font-bold text-white shadow-md transition-all active:scale-95 ${
                isSpinning
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary hover:bg-pink-600 shadow-pink-200 hover:shadow-lg'
              }`}
            >
              {isSpinning ? 'Đang quay...' : 'Quay Ngay! 🎡'}
            </button>
          </div>

          {/* Results & Items Manager (Right) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            {/* Winner Announcement */}
            {winner && (
              <div className="mb-6 p-4 rounded-2xl bg-pink-50 border border-pink-200 text-center animate-in zoom-in-95 duration-200">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">
                  🎉 Kết quả định mệnh:
                </span>
                <div className="text-xl font-black text-gray-800 mt-1">
                  {winner}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Đã có đáp án rồi nhé, cùng nhau đi thôi nào!
                </p>
              </div>
            )}

            {/* List of current options */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Các lựa chọn ({items.length})
                </span>
                <span className="text-[11px] text-gray-400">Tùy ý thêm/bớt</span>
              </div>

              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 mb-4">
                {items.map((it, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200/80 px-3 py-1.5 rounded-full text-xs text-gray-700 font-medium group"
                  >
                    <span>{it}</span>
                    <button
                      onClick={() => handleDeleteItem(idx)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-0.5"
                      title="Xóa lựa chọn này"
                    >
                      <FaTrash className="text-[10px]" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add new option form */}
              <form onSubmit={handleAddItem} className="flex gap-2">
                <input
                  type="text"
                  placeholder={activeTab === 'food' ? "Thêm món ăn mới..." : "Thêm điểm hẹn mới..."}
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  className="flex-1 text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-pink-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  <FaPlus className="text-[10px]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
