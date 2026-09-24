'use client';
import { useState } from 'react';
import { FaHeart, FaSparkles } from 'react-icons/fa';
import { playHeartChime } from '../utils/soundEffects';

export default function InfinityLoveKnot({ onBurstHearts }) {
  const [isSparkling, setIsSparkling] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setIsSparkling(true);
    setClickCount((prev) => prev + 1);
    playHeartChime();
    if (onBurstHearts) {
      onBurstHearts();
    }
    setTimeout(() => {
      setIsSparkling(false);
    }, 1200);
  };

  return (
    <div className="relative flex flex-col items-center group select-none">
      {/* Vầng hào quang ấm áp phía sau biểu tượng */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-28 bg-gradient-to-r from-pink-400/20 via-rose-300/25 to-amber-200/20 rounded-full blur-2xl pointer-events-none transition-all duration-700 ${
          isSparkling ? 'scale-130 opacity-90' : 'scale-100 opacity-60'
        }`}
      />

      {/* Vòng sóng năng lượng lan tỏa khi click */}
      {isSparkling && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-pink-400/60 animate-ping pointer-events-none" />
      )}

      {/* Khung chứa SVG Dây Tơ Hồng Vô Cực */}
      <div
        onClick={handleClick}
        className="relative w-36 h-24 sm:w-40 sm:h-28 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-108 active:scale-95 z-10"
        title="Dây Tơ Hồng Vô Cực • Nhấn để lan tỏa yêu thương!"
      >
        <svg
          viewBox="0 0 160 90"
          className="w-full h-full overflow-visible drop-shadow-[0_8px_16px_rgba(255,77,109,0.22)]"
        >
          <defs>
            {/* Gradient màu dải tơ hồng kết hợp chỉ vàng hoàng gia */}
            <linearGradient id="destinyThread" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF4D6D" />
              <stop offset="25%" stopColor="#FFA4B6" />
              <stop offset="50%" stopColor="#FFD166" />
              <stop offset="75%" stopColor="#FF758F" />
              <stop offset="100%" stopColor="#FF4D6D" />
            </linearGradient>

            {/* Gradient phát sáng của dòng chảy ánh sáng */}
            <linearGradient id="streamGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFE066" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF4D6D" stopOpacity="0.1" />
            </linearGradient>

            {/* Bộ lọc phát quang mềm mại */}
            <filter id="knotGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Lớp bóng mờ phía dưới tạo độ sâu 3D */}
          <path
            d="M 80,45 C 55,20 25,20 25,45 C 25,70 55,70 80,45 C 105,20 135,20 135,45 C 135,70 105,70 80,45 Z"
            fill="none"
            stroke="rgba(255, 77, 109, 0.25)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#knotGlow)"
          />

          {/* 2. Dải tơ hồng chính (Infinity Loop) */}
          <path
            d="M 80,45 C 55,20 25,20 25,45 C 25,70 55,70 80,45 C 105,20 135,20 135,45 C 135,70 105,70 80,45 Z"
            fill="none"
            stroke="url(#destinyThread)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. Dòng chảy hạt bụi sao chuyển động chạy dọc theo dây tơ hồng */}
          <path
            d="M 80,45 C 55,20 25,20 25,45 C 25,70 55,70 80,45 C 105,20 135,20 135,45 C 135,70 105,70 80,45 Z"
            fill="none"
            stroke="url(#streamGlow)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="22 140"
            className="animate-destiny-flow"
          />

          {/* Dòng hạt sao thứ hai đối xứng chạy ngược chiều */}
          <path
            d="M 80,45 C 105,70 135,70 135,45 C 135,20 105,20 80,45 C 55,70 25,70 25,45 C 25,20 55,20 80,45 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="14 160"
            className="animate-destiny-flow-reverse"
          />

          {/* 4. Viên ngọc Hồng Ngọc Ruby ở tâm điểm giao thoa */}
          <g transform="translate(80, 45)" className="cursor-pointer">
            {/* Hào quang trung tâm */}
            <circle
              r="13"
              fill="rgba(255, 77, 109, 0.2)"
              className="animate-pulse"
            />
            {/* Đĩa thủy tinh viền vàng */}
            <circle
              r="9.5"
              fill="url(#destinyThread)"
              stroke="#FFFFFF"
              strokeWidth="2"
              className="shadow-sm"
            />
            {/* Ánh sáng chớp lấp lánh ở tâm */}
            <circle
              cx="-2.5"
              cy="-2.5"
              r="2"
              fill="#FFFFFF"
              opacity="0.85"
            />
          </g>

          {/* 5. Các tia sáng lấp lánh (Sparkle Stars) bay quanh */}
          {/* Ngôi sao nhỏ bên trái */}
          <g transform="translate(36, 26)" className="animate-pulse">
            <path
              d="M 0,-4 L 1,-1 L 4,0 L 1,1 L 0,4 L -1,1 L -4,0 L -1,-1 Z"
              fill="#FFD166"
              opacity="0.9"
            />
          </g>
          {/* Ngôi sao nhỏ bên phải */}
          <g transform="translate(124, 64)" className="animate-pulse delay-300">
            <path
              d="M 0,-5 L 1.2,-1.2 L 5,0 L 1.2,1.2 L 0,5 L -1.2,1.2 L -5,0 L -1.2,-1.2 Z"
              fill="#FFD166"
              opacity="0.9"
            />
          </g>
          {/* Đốm sáng đỉnh cao */}
          <circle cx="80" cy="22" r="1.5" fill="#FFFFFF" opacity="0.8" className="animate-ping" />
        </svg>

        {/* Trái tim hồng ngọc nhỏ ở chính giữa tâm */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <FaHeart
            className={`text-white text-[10px] drop-shadow-sm transition-transform duration-300 ${
              isSparkling ? 'scale-140' : 'group-hover:scale-120'
            }`}
          />
        </div>
      </div>

      {/* Huy hiệu tình yêu sang trọng bên dưới */}
      <div className="flex items-center gap-1.5 -mt-1 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-pink-200/80 shadow-xs z-20 group-hover:border-primary transition-all">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
          Duyên Định Vĩnh Cửu
        </span>
        <span className="text-[10px] text-amber-500 font-mono">✨ ∞</span>
      </div>
    </div>
  );
}
