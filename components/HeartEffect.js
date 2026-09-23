'use client';
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';

const HeartEffect = forwardRef((props, ref) => {
  const [clickHearts, setClickHearts] = useState([]);
  const [trailHearts, setTrailHearts] = useState([]);
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });

  // Hàm tạo tim khi click hoặc trigger burst
  const spawnHeart = (x, y, count = 1) => {
    const newHearts = [];
    for (let i = 0; i < count; i++) {
      const offsetX = (Math.random() - 0.5) * 60;
      const size = Math.floor(Math.random() * 16) + 16; // 16px - 32px
      const emojis = ['💖', '💕', '💗', '💓', '✨', '❤️'];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      newHearts.push({
        id: Date.now() + Math.random(),
        x: (x || window.innerWidth / 2) + offsetX,
        y: y || window.innerHeight * 0.7,
        size,
        emoji,
      });
    }

    setClickHearts((prev) => [...prev.slice(-25), ...newHearts]);
  };

  useImperativeHandle(ref, () => ({
    burst: () => {
      // Bắn 12 trái tim từ giữa màn hình
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight * 0.6;
      spawnHeart(centerX, centerY, 12);
    }
  }));

  // Lắng nghe click để tạo tim bay
  useEffect(() => {
    const handleClick = (e) => {
      if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) return;
      spawnHeart(e.clientX, e.clientY, 3);
    };

    // Tạo vệt tim nhỏ li ti khi di chuyển chuột (Cursor Trail)
    const handleMouseMove = (e) => {
      const now = Date.now();
      const dist = Math.hypot(e.clientX - lastMousePos.current.x, e.clientY - lastMousePos.current.y);

      // Throttling: chỉ tạo tim khi di chuyển đủ xa (> 28px) và cách nhau tối thiểu 70ms
      if (dist > 28 && now - lastMousePos.current.time > 70) {
        lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
        
        const emojis = ['💖', '💕', '✨', '💓', '🌸'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const size = Math.floor(Math.random() * 5) + 11; // 11px - 15px

        setTrailHearts((prev) => [
          ...prev.slice(-15),
          {
            id: now + Math.random(),
            x: e.clientX + (Math.random() * 8 - 4),
            y: e.clientY + (Math.random() * 8 - 4),
            size,
            emoji,
          }
        ]);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Tự động dọn dẹp các tim click sau khi bay xong
  useEffect(() => {
    if (clickHearts.length === 0) return;
    const timer = setTimeout(() => {
      setClickHearts((prev) => prev.slice(1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [clickHearts]);

  // Tự động dọn dẹp các vệt tim chuột sau 800ms
  useEffect(() => {
    if (trailHearts.length === 0) return;
    const timer = setTimeout(() => {
      setTrailHearts((prev) => prev.slice(1));
    }, 700);
    return () => clearTimeout(timer);
  }, [trailHearts]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Vệt tim li ti bay theo con trỏ chuột */}
      {trailHearts.map((t) => (
        <span
          key={t.id}
          className="absolute select-none animate-trail-fade pointer-events-none"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            fontSize: `${t.size}px`,
            filter: 'drop-shadow(0 1px 4px rgba(255, 107, 129, 0.5))',
          }}
        >
          {t.emoji}
        </span>
      ))}

      {/* Tim bay lớn khi click / thả tim */}
      {clickHearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none animate-float-up pointer-events-none"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
            fontSize: `${h.size}px`,
            filter: 'drop-shadow(0 2px 8px rgba(255, 107, 129, 0.4))',
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
});

HeartEffect.displayName = 'HeartEffect';

export default HeartEffect;
