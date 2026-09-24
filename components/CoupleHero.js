'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHeart, FaEdit, FaCalendarAlt, FaCamera, FaEnvelope, FaCheckCircle, FaSparkles } from 'react-icons/fa';
import InfinityLoveKnot from './InfinityLoveKnot';

export default function CoupleHero({
  coupleInfo,
  stats,
  onOpenSettings,
  onBurstHearts,
}) {
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Tính toán thời gian từ ngày bắt đầu
  useEffect(() => {
    const calculateTime = () => {
      if (!coupleInfo.startDate) return;
      const start = new Date(coupleInfo.startDate + 'T00:00:00');
      const now = new Date();
      const diff = now - start;

      if (diff < 0) {
        setTimeElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [coupleInfo.startDate]);

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
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

  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [0, 400], [0, -30]);

  return (
    <section ref={ref} className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-pink-50/70 via-white to-pink-50/30">
      {/* Ambient background glowing light orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-pink-200/40 via-rose-100/30 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        {/* Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-200 shadow-sm text-primary text-xs font-semibold mb-8 hover:shadow-md transition-all cursor-default"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span>Ngôi Nhà Tình Yêu Của Riêng Chúng Mình</span>
          <span className="text-[10px] text-pink-400 font-mono">✨ 2025</span>
        </motion.div>

        {/* Couple Avatars with 3D Heart Connection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex items-center justify-center gap-4 sm:gap-8 md:gap-12 mb-8"
        >
          {/* Subtle connecting golden-pink destiny thread in the background */}
          <div className="absolute top-1/2 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-pink-300 to-transparent -translate-y-4 pointer-events-none opacity-60" />

          {/* Chàng (Minh Quân) */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 shadow-xl group-hover:scale-105 transition-transform duration-300 ring-4 ring-white/80">
                <img
                  src={coupleInfo.boyAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                  alt={coupleInfo.boyName}
                  className="w-full h-full object-cover rounded-full bg-white shadow-inner"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-white text-xs p-1 rounded-full shadow-md text-blue-500">
                👦
              </span>
            </div>
            <h3 className="font-bold text-gray-800 text-base md:text-lg mt-2.5 tracking-tight group-hover:text-primary transition-colors">
              {coupleInfo.boyName}
            </h3>
            <p className="text-xs text-primary font-semibold bg-pink-50 px-2.5 py-0.5 rounded-full mt-0.5 border border-pink-100">
              {coupleInfo.boyNickname || "Anh"}
            </p>
          </div>

          {/* Biểu tượng Dây Tơ Hồng Vô Cực (Infinity Love Knot) */}
          <InfinityLoveKnot onBurstHearts={onBurstHearts} />

          {/* Nàng (Chase Miee) */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-200 shadow-xl group-hover:scale-105 transition-transform duration-300 ring-4 ring-white/80">
                <img
                  src={coupleInfo.girlAvatar || "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"}
                  alt={coupleInfo.girlName}
                  className="w-full h-full object-cover rounded-full bg-white shadow-inner"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-white text-xs p-1 rounded-full shadow-md text-pink-500">
                👧
              </span>
            </div>
            <h3 className="font-bold text-gray-800 text-base md:text-lg mt-2.5 tracking-tight group-hover:text-primary transition-colors">
              {coupleInfo.girlName}
            </h3>
            <p className="text-xs text-primary font-semibold bg-pink-50 px-2.5 py-0.5 rounded-full mt-0.5 border border-pink-100">
              {coupleInfo.girlNickname || "Em"}
            </p>
          </div>
        </motion.div>

        {/* Romantic Quote */}
        {coupleInfo.quote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl mx-auto mb-10 px-6 py-2"
          >
            <p className="text-gray-600 text-sm md:text-base italic leading-relaxed">
              "{coupleInfo.quote}"
            </p>
          </motion.div>
        )}

        {/* Glassmorphic Days Counter Card */}
        <div
          className="mx-auto bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 md:p-12 max-w-2xl shadow-[0_20px_60px_-15px_rgba(255,107,129,0.2)] mb-10 transition-all hover:shadow-[0_25px_70px_-15px_rgba(255,107,129,0.28)]"
          data-aos="zoom-in"
        >
          {/* Subtle top indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50/80 text-primary text-[11px] font-semibold mb-4 border border-pink-100">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Đang đếm từng khoảnh khắc ngọt ngào</span>
          </div>

          {/* Giant Gradient Number */}
          <div className="text-7xl sm:text-8xl md:text-9xl font-black mb-2 tracking-tight bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent drop-shadow-xs">
            {timeElapsed.days.toLocaleString()}
          </div>

          <div className="text-gray-800 text-lg md:text-xl font-bold tracking-tight">
            Ngày Bên Nhau Trọn Vẹn
          </div>

          <div className="text-gray-500 text-xs md:text-sm mt-2 flex items-center justify-center gap-1.5">
            <FaCalendarAlt className="text-xs text-primary" />
            <span>Kể từ ngày chính thức yêu: <strong>{formatDisplayDate(coupleInfo.startDate)}</strong></span>
          </div>

          {/* Sub counters: hours, minutes, seconds */}
          <div className="grid grid-cols-3 gap-3 md:gap-5 mt-8 max-w-md mx-auto">
            <div className="bg-gradient-to-b from-white to-pink-50/70 border border-pink-100/90 px-3 py-3.5 rounded-2xl shadow-xs group hover:border-primary transition-colors">
              <div className="text-2xl md:text-3xl font-black text-gray-800 group-hover:text-primary transition-colors font-mono">
                {timeElapsed.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mt-1">Giờ</div>
            </div>

            <div className="bg-gradient-to-b from-white to-pink-50/70 border border-pink-100/90 px-3 py-3.5 rounded-2xl shadow-xs group hover:border-primary transition-colors">
              <div className="text-2xl md:text-3xl font-black text-gray-800 group-hover:text-primary transition-colors font-mono">
                {timeElapsed.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mt-1">Phút</div>
            </div>

            <div className="bg-gradient-to-b from-white to-pink-50/70 border border-pink-100/90 px-3 py-3.5 rounded-2xl shadow-xs group hover:border-primary transition-colors">
              <div className="text-2xl md:text-3xl font-black text-primary font-mono animate-pulse">
                {timeElapsed.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mt-1">Giây</div>
            </div>
          </div>
        </div>

        {/* Micro-stats Bar */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <a
            href="#timeline"
            className="flex items-center gap-3 bg-white/90 backdrop-blur-xs border border-gray-100 p-3.5 rounded-2xl shadow-xs hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-primary flex items-center justify-center text-base group-hover:scale-110 transition-transform">
              <FaCalendarAlt />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{stats.milestonesCount}</div>
              <div className="text-[11px] text-gray-500 font-medium">Cột mốc</div>
            </div>
          </a>

          <a
            href="#gallery"
            className="flex items-center gap-3 bg-white/90 backdrop-blur-xs border border-gray-100 p-3.5 rounded-2xl shadow-xs hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-primary flex items-center justify-center text-base group-hover:scale-110 transition-transform">
              <FaCamera />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{stats.photosCount}</div>
              <div className="text-[11px] text-gray-500 font-medium">Kho ảnh</div>
            </div>
          </a>

          <a
            href="#letters"
            className="flex items-center gap-3 bg-white/90 backdrop-blur-xs border border-gray-100 p-3.5 rounded-2xl shadow-xs hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-primary flex items-center justify-center text-base group-hover:scale-110 transition-transform">
              <FaEnvelope />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{stats.lettersCount}</div>
              <div className="text-[11px] text-gray-500 font-medium">Bức thư</div>
            </div>
          </a>

          <a
            href="#bucketlist"
            className="flex items-center gap-3 bg-white/90 backdrop-blur-xs border border-gray-100 p-3.5 rounded-2xl shadow-xs hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-primary flex items-center justify-center text-base group-hover:scale-110 transition-transform">
              <FaCheckCircle />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{stats.bucketListCompleted}/{stats.bucketListTotal}</div>
              <div className="text-[11px] text-gray-500 font-medium">Ước nguyện</div>
            </div>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3.5" data-aos="fade-up" data-aos-delay="150">
          <a
            href="#timeline"
            className="bg-gradient-to-r from-primary to-pink-600 text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 hover:scale-102 transition-all active:scale-95 flex items-center gap-2"
          >
            <FaHeart className="text-xs" />
            <span>Khám phá hành trình của chúng mình</span>
          </a>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 border border-gray-200 px-6 py-3.5 rounded-full font-semibold text-sm text-gray-700 hover:border-primary hover:text-primary bg-white/90 backdrop-blur-xs shadow-xs hover:shadow-md hover:scale-102 transition-all active:scale-95"
          >
            <FaEdit className="text-xs text-primary" />
            <span>Chỉnh sửa thông tin cặp đôi</span>
          </button>
        </div>
      </div>
    </section>
  );
}
