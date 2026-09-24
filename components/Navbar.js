'use client';
import { useState, useEffect } from 'react';
import {
  FaHeart,
  FaBars,
  FaTimes,
  FaCog,
  FaCamera,
  FaEnvelope,
  FaListUl,
  FaCalendarAlt,
  FaClock,
  FaMobileAlt,
  FaLock
} from 'react-icons/fa';
import { playSoftTap } from '../utils/soundEffects';

export default function Navbar({
  coupleInfo,
  onBurstHearts,
  onOpenSettings,
  onOpenCardExport,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: "Đếm ngược", href: "#countdown", id: "countdown", icon: <FaClock className="text-xs" /> },
    { name: "Cột mốc", href: "#timeline", id: "timeline", icon: <FaCalendarAlt className="text-xs" /> },
    { name: "Kho ảnh", href: "#gallery", id: "gallery", icon: <FaCamera className="text-xs" /> },
    { name: "Thư tình", href: "#letters", id: "letters", icon: <FaEnvelope className="text-xs" /> },
    { name: "Ước nguyện", href: "#bucketlist", id: "bucketlist", icon: <FaListUl className="text-xs" /> },
    { name: "Hộp bí mật", href: "#vault", id: "vault", icon: <FaLock className="text-xs" /> },
  ];

  // ScrollSpy: Tự động highlight mục đang xem trên thanh menu
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-100/70 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-2.5 flex justify-between items-center">
        {/* Brand: Couple Name */}
        <a
          href="#"
          onClick={() => {
            playSoftTap();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <FaHeart className="text-sm animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 tracking-tight text-sm md:text-base group-hover:text-primary transition-colors">
              {coupleInfo.boyName} & {coupleInfo.girlName}
            </span>
            <span className="text-[10px] text-gray-400 font-medium -mt-1">Kỷ niệm tình yêu</span>
          </div>
        </a>

        {/* Desktop Menu with Smooth ScrollSpy */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-pink-50/50 p-1 rounded-full border border-pink-100/60">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={playSoftTap}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-primary shadow-xs font-bold'
                    : 'hover:text-primary hover:bg-white/60 text-gray-600'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              playSoftTap();
              onOpenCardExport();
            }}
            className="flex items-center gap-1.5 bg-gray-50 hover:bg-pink-50 hover:text-primary text-gray-600 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs border border-gray-200/80 active:scale-95"
            title="Tạo hình nền điện thoại"
          >
            <FaMobileAlt className="text-xs text-primary" />
            <span className="hidden md:inline">Xuất hình nền</span>
          </button>

          <button
            onClick={() => {
              onBurstHearts();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 text-primary border border-pink-200 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-xs"
            title="Thả tim bay"
          >
            <span>Thả tim</span> 💖
          </button>

          <button
            onClick={() => {
              playSoftTap();
              onOpenSettings();
            }}
            className="flex items-center gap-1.5 border border-gray-200 hover:border-primary hover:text-primary text-gray-600 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs active:scale-95"
            title="Chỉnh sửa thông tin hai bạn"
          >
            <FaCog className="text-xs" />
            <span className="hidden md:inline">Cài đặt</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => {
              playSoftTap();
              onOpenCardExport();
            }}
            className="p-2 text-primary bg-pink-50 rounded-full text-xs active:scale-95 sm:hidden"
            title="Xuất hình nền"
          >
            <FaMobileAlt />
          </button>
          <button
            onClick={onBurstHearts}
            className="p-2 text-primary bg-pink-50 rounded-full text-xs active:scale-95 sm:hidden"
            aria-label="Thả tim"
          >
            💖
          </button>
          <button
            className="p-2 text-gray-600 text-xl"
            onClick={() => {
              playSoftTap();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-pink-100 px-6 py-4 shadow-lg animate-in slide-in-from-top-2 duration-200 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2.5 py-2 hover:text-primary transition-colors border-b border-gray-50 text-xs"
                onClick={() => {
                  playSoftTap();
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-primary">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  playSoftTap();
                  setMobileMenuOpen(false);
                  onOpenCardExport();
                }}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-pink-50 hover:bg-pink-100 hover:text-primary px-4 py-2.5 rounded-full w-full justify-center transition-colors"
              >
                <FaMobileAlt className="text-primary" />
                <span>Tạo hình nền điện thoại đôi</span>
              </button>

              <button
                onClick={() => {
                  playSoftTap();
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-full w-full justify-center transition-colors"
              >
                <FaCog />
                <span>Chỉnh sửa thông tin hai bạn</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
