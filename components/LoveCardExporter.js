'use client';
import { useState, useRef } from 'react';
import { FaDownload, FaTimes, FaMobileAlt, FaHeart, FaMagic } from 'react-icons/fa';

export default function LoveCardExporter({
  isOpen,
  onClose,
  coupleInfo,
  daysCount,
}) {
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // 1. Nền Gradient hoàng hôn hồng ấm áp
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#FFE8EC');
    bgGradient.addColorStop(0.4, '#FFF5F6');
    bgGradient.addColorStop(0.8, '#FFD1DA');
    bgGradient.addColorStop(1, '#FFB3C1');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Viền trang trí và hoa văn mờ
    ctx.strokeStyle = 'rgba(255, 107, 129, 0.25)';
    ctx.lineWidth = 12;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    // 3. Header badge
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(width / 2 - 250, 160, 500, 70, 35);
    ctx.fill();
    ctx.strokeStyle = '#FF6B81';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#FF6B81';
    ctx.font = 'bold 30px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('💖 HÀNH TRÌNH TÌNH YÊU 💖', width / 2, 206);

    // 4. Tên cặp đôi
    ctx.fillStyle = '#2D3748';
    ctx.font = 'bold 72px Inter, sans-serif';
    ctx.fillText(`${coupleInfo.boyName} & ${coupleInfo.girlName}`, width / 2, 380);

    ctx.fillStyle = '#718096';
    ctx.font = '32px Inter, sans-serif';
    ctx.fillText('Nơi tình yêu bắt đầu & mãi mãi đong đầy', width / 2, 440);

    // 5. Thẻ trắng trung tâm chứa số ngày yêu
    const cardX = 120;
    const cardY = 560;
    const cardW = width - 240;
    const cardH = 680;

    ctx.save();
    ctx.shadowColor = 'rgba(255, 107, 129, 0.3)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 20;

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 50);
    ctx.fill();
    ctx.restore();

    // Tim trang trí trên card
    ctx.fillStyle = '#FF6B81';
    ctx.font = '60px sans-serif';
    ctx.fillText('❤️', width / 2, cardY + 110);

    // Số ngày bên nhau
    ctx.fillStyle = '#FF6B81';
    ctx.font = '900 160px Inter, sans-serif';
    ctx.fillText(daysCount.toLocaleString(), width / 2, cardY + 310);

    ctx.fillStyle = '#4A5568';
    ctx.font = 'bold 42px Inter, sans-serif';
    ctx.fillText('NGÀY BÊN NHAU', width / 2, cardY + 390);

    ctx.fillStyle = '#A0AEC0';
    ctx.font = '32px Inter, sans-serif';
    ctx.fillText(`Kể từ ngày 10/02/2025`, width / 2, cardY + 460);

    // Đường gạch mảnh trang trí
    ctx.strokeStyle = '#FFE8EC';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 180, cardY + 520);
    ctx.lineTo(width / 2 + 180, cardY + 520);
    ctx.stroke();

    ctx.fillStyle = '#FF6B81';
    ctx.font = 'italic 28px Inter, sans-serif';
    ctx.fillText('Từng giây phút đều là vô giá ✨', width / 2, cardY + 580);

    // 6. Câu Quote tình yêu phía dưới
    ctx.fillStyle = '#4A5568';
    ctx.font = 'italic 34px Inter, sans-serif';
    const quote = `"${coupleInfo.quote || 'Mỗi ngày trôi qua, anh lại thấy yêu em nhiều hơn'}"`;
    ctx.fillText(quote, width / 2, 1400);

    // 7. Footer Watermark
    ctx.fillStyle = '#A0AEC0';
    ctx.font = '28px Inter, sans-serif';
    ctx.fillText('MiDay • Được tạo với trọn vẹn yêu thương 💖', width / 2, 1780);

    // 8. Tải ảnh về
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `Hinh_Nen_${coupleInfo.boyName}_va_${coupleInfo.girlName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setIsExporting(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 text-lg"
        >
          <FaTimes />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-pink-50 border border-pink-200 text-primary flex items-center justify-center text-xl mx-auto mb-2">
            <FaMobileAlt />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Tạo Hình Nền Điện Thoại Đôi</h3>
          <p className="text-xs text-gray-400 mt-1">
            Xuất thiệp kỷ niệm chất lượng cao để cài làm màn hình khóa hoặc chia sẻ Story
          </p>
        </div>

        {/* Live Mini Preview Box */}
        <div className="bg-gradient-to-b from-pink-100 via-pink-50 to-pink-200 p-6 rounded-2xl border border-pink-200 text-center shadow-inner mb-6 relative overflow-hidden">
          <div className="text-[11px] font-bold text-primary tracking-wider uppercase mb-1">
            {coupleInfo.boyName} ❤️ {coupleInfo.girlName}
          </div>
          <div className="text-4xl font-black text-primary my-2">
            {daysCount.toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-gray-700">ngày bên nhau</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Kể từ ngày 10/02/2025</div>
          <p className="text-[11px] text-gray-500 italic mt-3 line-clamp-2">
            "{coupleInfo.quote}"
          </p>
        </div>

        {/* Hidden Canvas for High-Res 1080x1920 Export */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Action Button */}
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="w-full bg-primary hover:bg-pink-600 text-white font-bold py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:bg-gray-300"
        >
          <FaDownload />
          <span>{isExporting ? 'Đang xuất ảnh...' : 'Tải Hình Nền Về Máy (.PNG)'}</span>
        </button>
      </div>
    </div>
  );
}
