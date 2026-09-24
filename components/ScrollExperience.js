'use client';
import { useState, useEffect } from 'react';
import { FaChevronUp, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { isSoundEnabled, toggleSound, playSoftTap } from '../utils/soundEffects';

export default function ScrollExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
          setShowScrollTop(window.scrollY > 320);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playSoftTap();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playSoftTap();
    }
  };

  // SVG Circular progress geometry
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* 1. Thanh chỉ báo tiến trình cuộn trang siêu mượt (Reading Progress Bar) */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-pink-100/40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-primary transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,107,129,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Nút Cuộn lên đầu trang & Nút bật/tắt âm thanh tương tác */}
      <div
        className={`fixed bottom-6 left-6 z-40 flex items-center gap-2 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Nút Cuộn lên đầu trang hình tròn kèm vòng tiến trình */}
        <button
          onClick={scrollToTop}
          className="relative w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-pink-200/90 shadow-md hover:shadow-xl hover:scale-108 active:scale-95 transition-all flex items-center justify-center text-primary group"
          title={`Cuộn lên đầu trang (${Math.round(scrollProgress)}%)`}
          aria-label="Cuộn lên đầu trang"
        >
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-11 h-11 -rotate-90 pointer-events-none">
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-pink-100"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-primary transition-all duration-150 ease-out"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          <FaChevronUp className="text-xs group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Nút bật/tắt âm thanh phản hồi nhẹ */}
        <button
          onClick={handleToggleSound}
          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/80 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-gray-500 hover:text-primary text-xs"
          title={soundOn ? 'Âm thanh phản hồi: Đang bật' : 'Âm thanh phản hồi: Đang tắt'}
          aria-label="Bật/Tắt âm thanh"
        >
          {soundOn ? <FaVolumeUp className="text-[11px] text-primary" /> : <FaVolumeMute className="text-[11px]" />}
        </button>
      </div>
    </>
  );
}
