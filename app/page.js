'use client';
import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import { FaHeart } from 'react-icons/fa';

import {
  DEFAULT_COUPLE_INFO,
  DEFAULT_TIMELINE,
  DEFAULT_GALLERY,
  DEFAULT_LETTERS,
  DEFAULT_BUCKET_LIST,
} from '../data/defaultData';

import Navbar from '../components/Navbar';
import HeartEffect from '../components/HeartEffect';
import CoupleHero from '../components/CoupleHero';
import TimelineSection from '../components/TimelineSection';
import GallerySection from '../components/GallerySection';
import LettersSection from '../components/LettersSection';
import BucketListSection from '../components/BucketListSection';
import MusicPlayer from '../components/MusicPlayer';
import EditCoupleModal from '../components/EditCoupleModal';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const heartRef = useRef(null);

  // States lưu trữ thông tin cặp đôi
  const [coupleInfo, setCoupleInfo] = useState(DEFAULT_COUPLE_INFO);
  const [milestones, setMilestones] = useState(DEFAULT_TIMELINE);
  const [photos, setPhotos] = useState(DEFAULT_GALLERY);
  const [letters, setLetters] = useState(DEFAULT_LETTERS);
  const [bucketList, setBucketList] = useState(DEFAULT_BUCKET_LIST);

  // Khởi tạo và đọc dữ liệu từ localStorage
  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      AOS.init({ duration: 700, once: true, offset: 60 });

      try {
        const savedCouple = localStorage.getItem('miday_couple_info');
        if (savedCouple) setCoupleInfo(JSON.parse(savedCouple));

        const savedMilestones = localStorage.getItem('miday_milestones');
        if (savedMilestones) setMilestones(JSON.parse(savedMilestones));

        const savedPhotos = localStorage.getItem('miday_gallery');
        if (savedPhotos) setPhotos(JSON.parse(savedPhotos));

        const savedLetters = localStorage.getItem('miday_letters');
        if (savedLetters) setLetters(JSON.parse(savedLetters));

        const savedBucketList = localStorage.getItem('miday_bucketlist');
        if (savedBucketList) setBucketList(JSON.parse(savedBucketList));
      } catch (err) {
        console.error('Error loading data from localStorage:', err);
      }
    }
  }, []);

  // Các hàm cập nhật State & lưu vào LocalStorage
  const handleSaveCoupleInfo = (newInfo) => {
    setCoupleInfo(newInfo);
    try {
      localStorage.setItem('miday_couple_info', JSON.stringify(newInfo));
    } catch (e) {
      console.error(e);
    }
    if (heartRef.current) heartRef.current.burst();
  };

  const handleAddMilestone = (newMilestone) => {
    const updated = [newMilestone, ...milestones];
    setMilestones(updated);
    try {
      localStorage.setItem('miday_milestones', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (heartRef.current) heartRef.current.burst();
  };

  const handleDeleteMilestone = (id) => {
    const updated = milestones.filter((m) => m.id !== id);
    setMilestones(updated);
    try {
      localStorage.setItem('miday_milestones', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddPhoto = (newPhoto) => {
    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    try {
      localStorage.setItem('miday_gallery', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (heartRef.current) heartRef.current.burst();
  };

  const handleDeletePhoto = (id) => {
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    try {
      localStorage.setItem('miday_gallery', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLikePhoto = (id) => {
    const updated = photos.map((p) =>
      p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
    );
    setPhotos(updated);
    try {
      localStorage.setItem('miday_gallery', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddLetter = (newLetter) => {
    const updated = [newLetter, ...letters];
    setLetters(updated);
    try {
      localStorage.setItem('miday_letters', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (heartRef.current) heartRef.current.burst();
  };

  const handleDeleteLetter = (id) => {
    const updated = letters.filter((l) => l.id !== id);
    setLetters(updated);
    try {
      localStorage.setItem('miday_letters', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleBucketItem = (id) => {
    const today = new Date().toLocaleDateString('vi-VN');
    const updated = bucketList.map((item) => {
      if (item.id === id) {
        const nextState = !item.completed;
        return {
          ...item,
          completed: nextState,
          completedDate: nextState ? today : null,
        };
      }
      return item;
    });
    setBucketList(updated);
    try {
      localStorage.setItem('miday_bucketlist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddBucketItem = (newItem) => {
    const updated = [...bucketList, newItem];
    setBucketList(updated);
    try {
      localStorage.setItem('miday_bucketlist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (heartRef.current) heartRef.current.burst();
  };

  const handleDeleteBucketItem = (id) => {
    const updated = bucketList.filter((item) => item.id !== id);
    setBucketList(updated);
    try {
      localStorage.setItem('miday_bucketlist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetDefault = () => {
    setCoupleInfo(DEFAULT_COUPLE_INFO);
    setMilestones(DEFAULT_TIMELINE);
    setPhotos(DEFAULT_GALLERY);
    setLetters(DEFAULT_LETTERS);
    setBucketList(DEFAULT_BUCKET_LIST);

    try {
      localStorage.removeItem('miday_couple_info');
      localStorage.removeItem('miday_milestones');
      localStorage.removeItem('miday_gallery');
      localStorage.removeItem('miday_letters');
      localStorage.removeItem('miday_bucketlist');
    } catch (e) {
      console.error(e);
    }
  };

  const handleBurstHearts = () => {
    if (heartRef.current) {
      heartRef.current.burst();
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <FaHeart className="text-primary text-4xl animate-bounce" />
          <p className="text-sm font-medium text-gray-500">Đang tải không gian tình yêu của hai bạn...</p>
        </div>
      </div>
    );
  }

  // Thống kê tóm tắt
  const stats = {
    milestonesCount: milestones.length,
    photosCount: photos.length,
    lettersCount: letters.length,
    bucketListCompleted: bucketList.filter((b) => b.completed).length,
    bucketListTotal: bucketList.length,
  };

  return (
    <main className="font-sans antialiased text-gray-800 bg-[#FCFCFD]">
      {/* Hiệu ứng thả tim */}
      <HeartEffect ref={heartRef} />

      {/* Navbar cố định */}
      <Navbar
        coupleInfo={coupleInfo}
        onBurstHearts={handleBurstHearts}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Hero: Thông tin cặp đôi & Bộ đếm ngày yêu thời gian thực */}
      <CoupleHero
        coupleInfo={coupleInfo}
        stats={stats}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onBurstHearts={handleBurstHearts}
      />

      {/* Hành trình tình yêu: Cột mốc đáng nhớ */}
      <TimelineSection
        milestones={milestones}
        onAddMilestone={handleAddMilestone}
        onDeleteMilestone={handleDeleteMilestone}
      />

      {/* Kho ảnh kỷ niệm */}
      <GallerySection
        photos={photos}
        onAddPhoto={handleAddPhoto}
        onDeletePhoto={handleDeletePhoto}
        onLikePhoto={handleLikePhoto}
      />

      {/* Hòm thư tình cảm */}
      <LettersSection
        letters={letters}
        coupleInfo={coupleInfo}
        onAddLetter={handleAddLetter}
        onDeleteLetter={handleDeleteLetter}
      />

      {/* Danh sách những điều cùng nhau làm */}
      <BucketListSection
        items={bucketList}
        onToggleItem={handleToggleBucketItem}
        onAddItem={handleAddBucketItem}
        onDeleteItem={handleDeleteBucketItem}
        onBurstHearts={handleBurstHearts}
      />

      {/* Trình phát nhạc nền piano lãng mạn */}
      <MusicPlayer />

      {/* Modal chỉnh sửa thông tin cặp đôi */}
      <EditCoupleModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        coupleInfo={coupleInfo}
        onSave={handleSaveCoupleInfo}
        onResetDefault={handleResetDefault}
      />

      {/* Footer ấm áp dành riêng cho 2 bạn */}
      <footer className="border-t border-pink-100/80 bg-white py-14 text-center text-sm text-gray-500">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FaHeart className="text-primary text-base animate-pulse" />
            <span className="font-bold text-gray-800 text-base">
              {coupleInfo.boyName} & {coupleInfo.girlName}
            </span>
          </div>
          <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
            Nơi lưu giữ từng khoảnh khắc ngọt ngào, những kỷ niệm vô giá và hành trình tình yêu đẹp đẽ của chúng mình.
          </p>

          <div className="flex justify-center gap-6 text-xs text-gray-500 mb-6">
            <a href="#timeline" className="hover:text-primary transition-colors">Cột mốc</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Kho ảnh</a>
            <a href="#letters" className="hover:text-primary transition-colors">Thư tình</a>
            <a href="#bucketlist" className="hover:text-primary transition-colors">Ước nguyện</a>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Tùy chỉnh
            </button>
          </div>

          <div className="border-t border-gray-100 max-w-sm mx-auto pt-6 text-[11px] text-gray-400">
            Dành tặng cho tình yêu của hai bạn • Được tạo với trọn vẹn 💖
          </div>
        </div>
      </footer>
    </main>
  );
}
