'use client';
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { playHeartChime } from '../utils/soundEffects';

const EMOJIS = ['💖', '💕', '💗', '✨', '🌸', '❤️'];

const HeartEffect = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const isRunningRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });

  // Bắt đầu vòng lặp render canvas (chỉ chạy khi có particles)
  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        isRunningRef.current = false;
        return;
      }

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Cập nhật vị trí & vật lý
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.rotation += p.vRot;
        p.wobble += 0.08;
        p.x += Math.sin(p.wobble) * p.wobbleSpeed;

        p.life -= 1;
        p.alpha = Math.max(0, p.life / p.maxLife);

        if (p.life <= 0 || p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Vẽ particle lên canvas
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(255, 107, 129, 0.45)';
        ctx.shadowBlur = 6;
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      }

      if (particles.length > 0) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        isRunningRef.current = false;
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);
  };

  // Thêm particle vào danh sách
  const addParticles = (x, y, count = 1, type = 'click') => {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const canvasX = x * dpr;
    const canvasY = y * dpr;

    for (let i = 0; i < count; i++) {
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

      if (type === 'trail') {
        // Vệt tim nhỏ nhẹ khi di chuột
        particlesRef.current.push({
          x: canvasX + (Math.random() * 12 - 6) * dpr,
          y: canvasY + (Math.random() * 12 - 6) * dpr,
          vx: (Math.random() - 0.5) * 1.2 * dpr,
          vy: (-Math.random() * 1.5 - 0.5) * dpr,
          gravity: -0.015 * dpr,
          size: (Math.floor(Math.random() * 5) + 12) * dpr,
          emoji,
          alpha: 1,
          life: 45,
          maxLife: 45,
          rotation: (Math.random() - 0.5) * 0.4,
          vRot: (Math.random() - 0.5) * 0.04,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: (Math.random() * 0.4 + 0.2) * dpr,
        });
      } else if (type === 'burst') {
        // Pháo hoa tim nở rộ bay bổng hình cánh cung
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 7 + 4) * dpr;
        particlesRef.current.push({
          x: canvasX,
          y: canvasY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3 * dpr,
          gravity: 0.12 * dpr,
          size: (Math.floor(Math.random() * 14) + 18) * dpr,
          emoji,
          alpha: 1,
          life: Math.floor(Math.random() * 30) + 70,
          maxLife: 90,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.08,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: (Math.random() * 0.6 + 0.2) * dpr,
        });
      } else {
        // Click thông thường
        particlesRef.current.push({
          x: canvasX + (Math.random() * 20 - 10) * dpr,
          y: canvasY,
          vx: (Math.random() - 0.5) * 3 * dpr,
          vy: (-Math.random() * 4 - 3) * dpr,
          gravity: 0.06 * dpr,
          size: (Math.floor(Math.random() * 10) + 18) * dpr,
          emoji,
          alpha: 1,
          life: 60,
          maxLife: 60,
          rotation: (Math.random() - 0.5) * 0.5,
          vRot: (Math.random() - 0.5) * 0.05,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: (Math.random() * 0.5 + 0.3) * dpr,
        });
      }
    }

    // Giới hạn số lượng particle tối đa để giữ mượt 60-120fps tuyệt đối
    if (particlesRef.current.length > 80) {
      particlesRef.current.splice(0, particlesRef.current.length - 80);
    }

    startLoop();
  };

  useImperativeHandle(ref, () => ({
    burst: () => {
      if (typeof window === 'undefined') return;
      playHeartChime();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight * 0.55;
      addParticles(centerX, centerY, 24, 'burst');
    },
  }));

  // Khởi tạo Canvas và lắng nghe sự kiện
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const handleClick = (e) => {
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'SELECT'].includes(e.target.tagName)) return;
      if (e.target.closest('button, a, input, select, textarea, [role="button"]')) return;
      addParticles(e.clientX, e.clientY, 3, 'click');
    };

    const handleMouseMove = (e) => {
      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastMousePos.current.x, e.clientY - lastMousePos.current.y);

      // Throttling di chuyển chuột: tối ưu hóa không gây giật lag
      if (dist > 25 && now - lastMousePos.current.time > 45) {
        lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
        addParticles(e.clientX, e.clientY, 1, 'trail');
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ willChange: 'transform' }}
    />
  );
});

HeartEffect.displayName = 'HeartEffect';

export default HeartEffect;
