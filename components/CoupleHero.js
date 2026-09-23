'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHeart, FaEdit, FaCalendarAlt, FaCamera, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import ThreeHeart from './ThreeHeart';

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
        // Nếu ngày bắt đầu ở tương lai
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

  // Format ngày hiển thị DD/MM/YYYY
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
    <section ref={ref} className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-pink-100/60 via-pink-50/30 to-transparent rounded-full blur-3xl opacity-70"></div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/60 text-primary text-xs font-semibold mb-6 shadow-xs"
        >
          <FaHeart className="text-xs animate-pulse" />
          <span>Ngôi Nhà Tình Yêu Của Riêng Chúng Mình</span>
        </motion.div>

        {/* Couple Avatars with Heart Connection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-4 md:gap-8 mb-6"
        >
          {/* Chàng */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-pink-400 to-rose-300 shadow-md">
                <img
                  src={coupleInfo.boyAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                  alt={coupleInfo.boyName}
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>
            </div>
            <h3 className="font-bold text-gray-800 text-base md:text-lg mt-2">{coupleInfo.boyName}</h3>
            <p className="text-xs text-gray-500 font-medium">{coupleInfo.boyNickname || "Anh"}</p>
          </div>

          {/* 3D Heart Beat Center with Three.js */}
          <ThreeHeart onBurstHearts={onBurstHearts} />

          {/* Nàng */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-rose-400 to-pink-300 shadow-md">
                <img
                  src={coupleInfo.girlAvatar || "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"}
                  alt={coupleInfo.girlName}
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>
            </div>
            <h3 className="font-bold text-gray-800 text-base md:text-lg mt-2">{coupleInfo.girlName}</h3>
            <p className="text-xs text-gray-500 font-medium">{coupleInfo.girlNickname || "Em"}</p>
          </div>
        </motion.div>

        {/* Romantic Quote */}
        {coupleInfo.quote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-sm md:text-base italic max-w-xl mx-auto mb-8 px-4"
          >
            "{coupleInfo.quote}"
          </motion.p>
        )}

        {/* Counter Card */}
        <div
          className="mx-auto bg-white/90 backdrop-blur-sm border border-pink-100 rounded-3xl p-8 md:p-12 max-w-2xl shadow-xl shadow-pink-50/50 mb-8 transition-all hover:shadow-pink-100/60"
          data-aos="zoom-in"
        >
          <div className="text-7xl md:text-8xl font-black mb-3 text-primary tracking-tight">
            {timeElapsed.days.toLocaleString()}
          </div>
          <div className="text-gray-700 text-lg md:text-xl font-semibold">ngày bên nhau trọn vẹn</div>
          <div className="text-gray-400 text-sm mt-1.5 flex items-center justify-center gap-1.5">
            <FaCalendarAlt className="text-xs text-pink-400" />
            <span>Kể từ ngày {formatDisplayDate(coupleInfo.startDate)}</span>
          </div>

          {/* Sub counters: hours, minutes, seconds */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-8 max-w-md mx-auto">
            <div className="bg-pink-50/60 border border-pink-100/80 px-3 py-3 rounded-2xl shadow-2xs">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {timeElapsed.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">giờ</div>
            </div>
            <div className="bg-pink-50/60 border border-pink-100/80 px-3 py-3 rounded-2xl shadow-2xs">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {timeElapsed.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">phút</div>
            </div>
            <div className="bg-pink-50/60 border border-pink-100/80 px-3 py-3 rounded-2xl shadow-2xs">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {timeElapsed.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">giây</div>
            </div>
          </div>
        </div>

        {/* Micro-stats Bar */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <a
            href="#timeline"
            className="flex items-center gap-3 bg-white border border-gray-100 p-3.5 rounded-2xl shadow-2xs hover:border-pink-200 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-primary flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              <FaCalendarAlt />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{stats.milestonesCount}</div>
              <div className="text-[11px] text-gray-500">Cột mốc</div>
            </div>
          </a>

          <a
            href="#gallery"
            className="flex items-center gap-3 bg-white border border-gray-100 p-3.5 rounded-2xl shadow-2xs hover:border-pink-200 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-primary flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              <FaCamera />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{stats.photosCount}</div>
              <div className="text-[11px] text-gray-500">Kho ảnh</div>
            </div>
          </a>

          <a
            href="#letters"
            className="flex items-center gap-3 bg-white border border-gray-100 p-3.5 rounded-2xl shadow-2xs hover:border-pink-200 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-primary flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              <FaEnvelope />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{stats.lettersCount}</div>
              <div className="text-[11px] text-gray-500">Bức thư</div>
            </div>
          </a>

          <a
            href="#bucketlist"
            className="flex items-center gap-3 bg-white border border-gray-100 p-3.5 rounded-2xl shadow-2xs hover:border-pink-200 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-primary flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              <FaCheckCircle />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{stats.bucketListCompleted}/{stats.bucketListTotal}</div>
              <div className="text-[11px] text-gray-500">Ước nguyện</div>
            </div>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3" data-aos="fade-up" data-aos-delay="150">
          <a
            href="#timeline"
            className="bg-primary text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-pink-600 shadow-md shadow-pink-200 hover:shadow-lg transition-all active:scale-95"
          >
            Xem câu chuyện của chúng mình
          </a>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-full font-medium text-sm text-gray-700 hover:border-primary hover:text-primary bg-white shadow-2xs hover:shadow-xs transition-all"
          >
            <FaEdit className="text-xs" />
            <span>Tùy chỉnh thông tin cặp đôi</span>
          </button>
        </div>
      </div>
    </section>
  );
}
