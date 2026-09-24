'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeart({ onBurstHearts }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 150;
    const height = container.clientHeight || 150;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Trái tim 3D Hữu cơ Căng tròn (Volumetric Organic 3D Parametric Heart)
    // Không dùng extrude 2D phẳng! Dùng phương trình hình học 3 chiều căng mọng, mềm mại ở mọi góc nhìn
    const createOrganicHeartGeometry = (subdivisions = 48) => {
      const geom = new THREE.BufferGeometry();
      const vertices = [];
      const indices = [];

      const uSteps = subdivisions * 2;
      const vSteps = subdivisions;

      for (let i = 0; i <= uSteps; i++) {
        const u = (Math.PI * 2 * i) / uSteps;
        for (let j = 0; j <= vSteps; j++) {
          const v = (Math.PI * j) / vSteps;

          // Đường cong Cardioid chuẩn
          const sinU = Math.sin(u);
          const cosU = Math.cos(u);
          const x0 = 16 * Math.pow(sinU, 3);
          const y0 = 13 * cosU - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u);

          // Độ dày Z tròn đều và thuôn nhọn về đuôi
          const r = Math.sin(v);
          const zFactor = Math.cos(v);

          const heightRatio = Math.max(0.04, (y0 + 17) / 33);
          const plumpness = Math.pow(heightRatio, 0.65) * 6.8;

          const scale = 0.19;
          const x = (x0 * (0.82 + 0.18 * r)) * scale;
          const y = y0 * scale;
          const z = (zFactor * plumpness) * scale;

          vertices.push(x, y, z);
        }
      }

      for (let i = 0; i < uSteps; i++) {
        for (let j = 0; j < vSteps; j++) {
          const a = i * (vSteps + 1) + j;
          const b = (i + 1) * (vSteps + 1) + j;
          const c = (i + 1) * (vSteps + 1) + (j + 1);
          const d = i * (vSteps + 1) + (j + 1);

          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geom.setIndex(indices);
      geom.computeVertexNormals();
      geom.center();
      return geom;
    };

    const geometry = createOrganicHeartGeometry(48);

    // 3. Vật liệu Pha lê Ruby Sang Trọng (Luxury Ruby Glass & Satin Glow)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff2858,
      emissive: 0x480816,
      emissiveIntensity: 0.6,
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.35,
      ior: 1.48,
      reflectivity: 0.9,
    });

    const heartMesh = new THREE.Mesh(geometry, material);
    scene.add(heartMesh);

    // 4. Lõi hào quang phát sáng nhẹ bên trong (Inner Glow Core)
    const innerGeometry = createOrganicHeartGeometry(24);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b8b,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    innerMesh.scale.set(0.85, 0.85, 0.85);
    heartMesh.add(innerMesh);

    // 5. Bụi sao vàng lấp lánh quay quanh (Golden Stardust Fireflies)
    const particleCount = 36;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 3.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i + 1] = radius * Math.sin(phi);
      particlePositions[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffe082,
      size: 0.38,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Ánh Sáng Studio Chuyên Nghiệp
    const ambientLight = new THREE.AmbientLight(0xffedf1, 1.4);
    scene.add(ambientLight);

    // Key light (Ánh sáng chính tạo vệt phản chiếu lấp lánh)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    // Rim light (Ánh sáng viền hồng tạo độ sâu 3D sắc sảo)
    const rimLight = new THREE.DirectionalLight(0xff6b81, 2.5);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Top fill light (Hắt sáng dịu từ trên xuống)
    const topLight = new THREE.PointLight(0xff8da1, 2.0, 15);
    topLight.position.set(0, 5, 4);
    scene.add(topLight);

    // 7. Nhịp tim đập & Tương tác chuột
    let animationFrameId;
    let clock = new THREE.Clock();
    let speedMultiplier = 1;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      heartMesh.rotation.y += deltaX * 0.015;
      heartMesh.rotation.x += deltaY * 0.015;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const handleClick = () => {
      speedMultiplier = 2.4;
      setTimeout(() => {
        speedMultiplier = 1;
      }, 1200);
      if (onBurstHearts) onBurstHearts();
    };

    container.addEventListener('click', handleClick);

    // 8. Vòng lặp Render (Animation Loop) - Tự động tạm dừng khi cuộn ra khỏi tầm nhìn để siêu mượt
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime() * speedMultiplier;

      // Nhịp đập tim chuẩn tự nhiên: Thình... Thịch... Nghỉ...
      const cycle = (elapsedTime * 2.2) % (Math.PI * 2);
      let scale = 1;

      if (cycle < 0.7) {
        // Nhịp 1
        scale = 1 + 0.15 * Math.sin(cycle * (Math.PI / 0.7));
      } else if (cycle >= 0.8 && cycle < 1.4) {
        // Nhịp 2
        const sub = (cycle - 0.8) / 0.6;
        scale = 1 + 0.1 * Math.sin(sub * Math.PI);
      } else {
        // Nghỉ ngơi nhẹ
        scale = 1;
      }

      heartMesh.scale.set(scale, scale, scale);

      // Dao động lơ lửng tự nhiên
      if (!isDragging) {
        heartMesh.rotation.y = Math.sin(elapsedTime * 0.7) * 0.22;
        heartMesh.rotation.x = Math.sin(elapsedTime * 0.4) * 0.1;
        heartMesh.position.y = Math.sin(elapsedTime * 1.2) * 0.12;
      }

      // Xoay dải sao bụi vàng
      particles.rotation.y = elapsedTime * 0.2;
      particles.rotation.z = elapsedTime * 0.1;

      renderer.render(scene, camera);
    };

    // Theo dõi hiển thị viewport
    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting;
          if (visible !== isVisible) {
            isVisible = visible;
            if (isVisible) {
              animate();
            } else if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    animate();

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', handleClick);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.innerHTML = '';
        rendererRef.current.dispose();
      }
      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [onBurstHearts]);

  return (
    <div className="relative flex flex-col items-center group">
      {/* Soft romantic pulsating aura halo behind the 3D heart */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-r from-pink-500/25 to-rose-400/20 rounded-full blur-2xl pointer-events-none animate-pulse" />

      {/* WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-32 h-32 md:w-36 md:h-36 cursor-grab active:cursor-grabbing hover:scale-108 transition-transform duration-300 relative select-none z-10 drop-shadow-[0_12px_24px_rgba(255,40,88,0.28)]"
        title="Trái tim 3D Pha Lê • Nhấn hoặc kéo để tương tác xoay!"
      />

      {/* Status Badge */}
      <div className="flex items-center gap-1.5 -mt-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-pink-200/80 shadow-xs z-20 group-hover:border-primary transition-colors">
        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
          Đang yêu
        </span>
      </div>
    </div>
  );
}
