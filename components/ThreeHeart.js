'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeart({ onBurstHearts }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 140;
    const height = container.clientHeight || 140;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. 3D Heart Geometry (Đường cong Bezier trái tim chuẩn)
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 2.5, y + 2.5);
    heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2.0, y, x, y);
    heartShape.bezierCurveTo(x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5);
    heartShape.bezierCurveTo(x - 3.0, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    heartShape.bezierCurveTo(x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5);
    heartShape.bezierCurveTo(x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y);
    heartShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      depth: 2.2,
      bevelEnabled: true,
      bevelSegments: 12,
      steps: 2,
      bevelSize: 1.2,
      bevelThickness: 1.2,
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();
    // Quay ngược lại để đỉnh nhọn hướng xuống dưới
    geometry.rotateZ(Math.PI);

    // 3. Vật liệu bóng bẩy như đá quý pha lê Ruby
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff3b60,
      emissive: 0x4a0a16,
      roughness: 0.12,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.scale.set(0.9, 0.9, 0.9);
    scene.add(heartMesh);

    // 4. Các hạt bụi vàng lấp lánh (Sparkle Particles)
    const particleCount = 28;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffd166,
      size: 0.45,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Hệ thống Ánh Sáng
    const ambientLight = new THREE.AmbientLight(0xfff0f3, 1.2);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight1.position.set(5, 10, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xff6b81, 1.8);
    directionalLight2.position.set(-8, -5, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xff2a55, 3.5, 25);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // 6. Nhịp tim đập (Heartbeat math pulse)
    let animationFrameId;
    let clock = new THREE.Clock();
    let speedMultiplier = 1;

    // Tương tác chuột kéo xoay nhẹ
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

    // Nhấp vào để đập rộn ràng hơn
    const handleClick = () => {
      speedMultiplier = 2.2;
      setTimeout(() => {
        speedMultiplier = 1;
      }, 1200);
      if (onBurstHearts) onBurstHearts();
    };

    container.addEventListener('click', handleClick);

    // 7. Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime() * speedMultiplier;

      // Nhịp đập chuẩn: Thình... thịch... (2 nhịp liên tiếp rồi nghỉ)
      const beatCycle = (elapsedTime * 2.2) % (Math.PI * 2);
      let scale = 1;

      if (beatCycle < 0.8) {
        // Nhịp 1 (Thình)
        scale = 1 + 0.16 * Math.sin(beatCycle * (Math.PI / 0.8));
      } else if (beatCycle >= 0.9 && beatCycle < 1.6) {
        // Nhịp 2 (Thịch)
        const subCycle = (beatCycle - 0.9) / 0.7;
        scale = 1 + 0.11 * Math.sin(subCycle * Math.PI);
      } else {
        // Khoảng nghỉ giữa các nhịp
        scale = 1;
      }

      heartMesh.scale.set(0.9 * scale, 0.9 * scale, 0.9 * scale);

      // Xoay nhẹ nhàng tự nhiên khi không kéo chuột
      if (!isDragging) {
        heartMesh.rotation.y = Math.sin(elapsedTime * 0.8) * 0.25;
        heartMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.12;
      }

      // Xoay nhẹ các hạt sao lấp lánh
      particles.rotation.y = elapsedTime * 0.15;
      particles.rotation.x = elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [onBurstHearts]);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="w-28 h-28 md:w-32 md:h-32 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform relative select-none"
        title="Trái tim 3D Three.js • Nhấn hoặc kéo để tương tác!"
      ></div>
      <div className="flex items-center gap-1.5 -mt-1 bg-pink-50/80 px-2.5 py-0.5 rounded-full border border-pink-100/60 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
          Đang yêu
        </span>
      </div>
    </div>
  );
}
