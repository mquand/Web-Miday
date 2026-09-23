'use client';
import { useState } from 'react';
import { FaHeart, FaBars, FaTimes, FaCog, FaCamera, FaEnvelope, FaListUl, FaCalendarAlt } from 'react-icons/fa';

export default function Navbar({ coupleInfo, onBurstHearts, onOpenSettings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Cột mốc", href: "#timeline", icon: <FaCalendarAlt className="text-xs" /> },
    { name: "Kho ảnh", href: "#gallery", icon: <FaCamera className="text-xs" /> },
    { name: "Thư tình", href: "#letters", icon: <FaEnvelope className="text-xs" /> },
    { name: "Ước nguyện", href: "#bucketlist", icon: <FaListUl className="text-xs" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100/60 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
        {/* Brand: Couple Name */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <FaHeart className="text-sm animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 tracking-tight text-base group-hover:text-primary transition-colors">
              {coupleInfo.boyName} & {coupleInfo.girlName}
            </span>
            <span className="text-[11px] text-gray-400 font-medium -mt-1">Kỷ niệm tình yêu</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-1.5 hover:text-primary transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onBurstHearts}
            className="flex items-center gap-1.5 bg-pink-50 hover:bg-pink-100 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-sm"
            title="Thả tim bay"
          >
            <span>Thả tim</span> 💖
          </button>
          
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 border border-gray-200 hover:border-primary hover:text-primary text-gray-600 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm"
            title="Chỉnh sửa thông tin hai bạn"
          >
            <FaCog className="text-xs" />
            <span>Tùy chỉnh</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onBurstHearts}
            className="p-2 text-primary bg-pink-50 rounded-full text-sm active:scale-95"
            aria-label="Thả tim"
          >
            💖
          </button>
          <button
            className="p-2 text-gray-600 text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-pink-100 px-6 py-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 py-2 hover:text-primary transition-colors border-b border-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-pink-50 hover:text-primary px-4 py-2 rounded-full w-full justify-center transition-colors"
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
