'use client';
import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHeart, FaCalendarAlt, FaGift, FaShareAlt, FaBars, FaTimes } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export default function Home() {
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const startDate = useRef(new Date('2025-10-10T00:00:00'));

  useEffect(() => {
    setMounted(true);
    
    // init AOS once
    if (typeof window !== 'undefined') {
      AOS.init({ duration: 700, once: true, offset: 80 });
    }

    // Hàm tính toán thời gian đã trôi qua
    const calculateTimeElapsed = () => {
      const now = new Date();
      const diff = now - startDate.current;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };

    // Cập nhật ngay lập tức
    calculateTimeElapsed();

    // Cập nhật mỗi giây
    const interval = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(interval);
  }, []);

  const reviews = [
    { name: "Minh & Hương", text: "Ứng dụng đơn giản nhưng rất ý nghĩa. Mỗi ngày nhìn thấy con số tăng lên, chúng tôi lại trân trọng tình yêu của mình hơn.", time: "3 năm yêu nhau" },
    { name: "Nam & Linh", text: "MiDay giúp chúng tôi lưu giữ từng cột mốc quan trọng trong chuyện tình của mình.", time: "2 năm yêu nhau" },
    { name: "Phúc & Trang", text: "Giao diện nhẹ, dễ dùng, cảm giác rất thân thiện và ấm áp.", time: "1 năm yêu nhau" },
  ];

  // Parallax effect for hero background using framer-motion
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [0, 300], [0, -40]);

  if (!mounted) {
    return null; // Hoặc return loading spinner
  }

  return (
    <main className="font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white flex justify-between items-center px-4 md:px-8 py-4 shadow-sm">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FaHeart className="text-primary" />
          <span>MiDay</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-600 text-sm">
          <a href="#features" className="hover:text-primary transition-colors">Tính năng</a>
          <a href="#reviews" className="hover:text-primary transition-colors">Đánh giá</a>
          <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
            Bắt đầu
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <div className="flex flex-col p-4 gap-4">
              <a 
                href="#features" 
                className="hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tính năng
              </a>
              <a 
                href="#reviews" 
                className="hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đánh giá
              </a>
              <button 
                className="bg-primary text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bắt đầu
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      {/* Hero with parallax */}
      <section ref={ref} className="relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
          <div className="h-72 md:h-96 bg-white"></div>
        </motion.div>

        <div className="relative z-10 text-center py-12 md:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-4"
          >
            Lưu trữ khoảng khắc <span className="text-primary">bên nhau</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-gray-500 mb-10">
            Ghi nhận và tôn vinh từng khoảnh khắc đặc biệt trong hành trình của bạn
          </motion.p>

          <div className="mx-auto bg-gray-50 rounded-2xl p-12 max-w-2xl mb-8" data-aos="zoom-in">
            <div className="text-7xl md:text-8xl font-bold mb-3 text-primary">{timeElapsed.days.toLocaleString()}</div>
            <div className="text-gray-600 text-lg font-medium">ngày đã bên nhau</div>
            <div className="text-gray-400 text-sm mt-1 italic">Kể từ 10/10/2025</div>
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-primary">{timeElapsed.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-500 mt-1">giờ</div>
              </div>
              <div className="bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-primary">{timeElapsed.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-500 mt-1">phút</div>
              </div>
              <div className="bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-primary">{timeElapsed.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-500 mt-1">giây</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4" data-aos="fade-up" data-aos-delay="100">
            <button className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-pink-600 shadow-sm hover:shadow-md transition-all">Tạo bộ đếm</button>
            <button className="border border-gray-300 px-6 py-3 rounded-full font-medium text-gray-700 hover:border-primary hover:text-primary shadow-sm hover:shadow-md transition-all">Xem demo</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-3" data-aos="fade-up">Tính năng đơn giản</h2>
          <p className="text-gray-500 mb-12" data-aos="fade-up" data-aos-delay="80">Tập trung vào những gì quan trọng nhất</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          {[
            { icon: <FaCalendarAlt />, title: "Đếm ngày tự động", desc: "Theo dõi chính xác số ngày, giờ, phút kể từ ngày đầu tiên bạn gặp nhau." },
            { icon: <FaGift />, title: "Kỷ niệm đặc biệt", desc: "Đánh dấu những cột mốc quan trọng và nhận thông báo cho các ngày kỷ niệm." },
            { icon: <FaShareAlt />, title: "Chia sẻ dễ dàng", desc: "Chia sẻ bộ đếm của bạn với bạn bè và người thân chỉ bằng một cú chạm." },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay={120 + i*80}>
              <div className="bg-pink-100 text-primary text-3xl p-4 rounded-2xl mb-4">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500 max-w-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Review (swiper) */}
      <section id="reviews" className="bg-gray-50 py-32">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-2xl font-medium mb-2" data-aos="fade-up">Người dùng nói gì</h3>
          <p className="text-gray-500 mb-8" data-aos="fade-up" data-aos-delay="60">Vuốt để xem thêm đánh giá</p>

          <div data-aos="fade-up" data-aos-delay="120">
            <Swiper 
              spaceBetween={40} 
              slidesPerView={1} 
              loop
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              {reviews.map((r, i) => (
                <SwiperSlide key={i}>
                  <div className="max-w-2xl mx-auto p-8 text-center">
                    <p className="text-lg text-gray-700 mb-6 italic">"{r.text}"</p>
                    <p className="text-sm text-gray-600">— {r.name}, {r.time}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-3" data-aos="fade-up">Bắt đầu lưu trữ những ngày của bạn</h2>
          <p className="text-gray-500 mb-6" data-aos="fade-up" data-aos-delay="60">Miễn phí, đơn giản và đầy ý nghĩa</p>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-pink-600 shadow-sm hover:shadow-md transition-all" data-aos="zoom-in">Lưu trữ cho riêng bạn</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-16 text-center text-sm text-gray-500">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-6xl mx-auto mb-4">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <FaHeart className="text-primary" />
            <span className="font-semibold text-gray-700">MiDay</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Điều khoản</a>
            <a href="#" className="hover:text-primary">Bảo mật</a>
            <a href="#" className="hover:text-primary">Liên hệ</a>
          </div>
        </div>
        <div className="border-t border-gray-100 mx-auto max-w-6xl mb-4"></div>
        <p>© 2025 MiDay. Được tạo với 💖</p>
      </footer>
    </main>
  );
}
