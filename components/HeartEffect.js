'use client';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const HeartEffect = forwardRef((props, ref) => {
  const [hearts, setHearts] = useState([]);

  // Hàm tạo tim khi click hoặc trigger
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

    setHearts((prev) => [...prev.slice(-25), ...newHearts]);
  };

  useImperativeHandle(ref, () => ({
    burst: () => {
      // Bắn 12 trái tim từ giữa màn hình
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight * 0.6;
      spawnHeart(centerX, centerY, 12);
    }
  }));

  useEffect(() => {
    const handleClick = (e) => {
      // Tránh click vào nút form hoặc input
      if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) return;
      spawnHeart(e.clientX, e.clientY, 3);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Tự động dọn dẹp các tim sau khi bay xong
  useEffect(() => {
    if (hearts.length === 0) return;
    const timer = setTimeout(() => {
      setHearts((prev) => prev.slice(1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [hearts]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none animate-float-up"
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
