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
  DEFAULT_COUNTDOWNS,
  DEFAULT_WHEEL_FOODS,
  DEFAULT_WHEEL_DATES,
  DEFAULT_LOVE_MAP,
  DEFAULT_SECRET_VAULT,
} from '../data/defaultData';

import Navbar from '../components/Navbar';
import HeartEffect from '../components/HeartEffect';
import CoupleHero from '../components/CoupleHero';
import UpcomingCountdown from '../components/UpcomingCountdown';
import TimelineSection from '../components/TimelineSection';
import LoveMapSection from '../components/LoveMapSection';
import GallerySection from '../components/GallerySection';
import DateNightWheel from '../components/DateNightWheel';
import LettersSection from '../components/LettersSection';
import BucketListSection from '../components/BucketListSection';
import SecretLoveVault from '../components/SecretLoveVault';
import MusicPlayer from '../components/MusicPlayer';
import EditCoupleModal from '../components/EditCoupleModal';
import LoveCardExporter from '../components/LoveCardExporter';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCardExportOpen, setIsCardExportOpen] = useState(false);
  const heartRef = useRef(null);

  // States lưu trữ thông tin cặp đôi
  const [coupleInfo, setCoupleInfo] = useState(DEFAULT_COUPLE_INFO);
  const [milestones, setMilestones] = useState(DEFAULT_TIMELINE);
  const [photos, setPhotos] = useState(DEFAULT_GALLERY);
  const [letters, setLetters] = useState(DEFAULT_LETTERS);
  const [bucketList, setBucketList] = useState(DEFAULT_BUCKET_LIST);
  const [countdowns, setCountdowns] = useState(DEFAULT_COUNTDOWNS);
  const [wheelFoods, setWheelFoods] = useState(DEFAULT_WHEEL_FOODS);
  const [wheelDates, setWheelDates] = useState(DEFAULT_WHEEL_DATES);
  const [loveMap, setLoveMap] = useState(DEFAULT_LOVE_MAP);
  const [secretVault, setSecretVault] = useState(DEFAULT_SECRET_VAULT);

  // Khởi tạo và đọc dữ liệu từ localStorage
  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      AOS.init({ duration: 700, once: true, offset: 60 });

      try {
        const savedCouple = localStorage.getItem('miday_couple_info');
        if (savedCouple) {
          const parsed = JSON.parse(savedCouple);
          let changed = false;
          if (parsed.girlName === 'Phương Anh') {
            parsed.girlName = 'Chase Miee';
            changed = true;
          }
          if (parsed.startDate === '2024-02-10') {
            parsed.startDate = '2025-02-10';
            changed = true;
          }
          if (changed) {
            localStorage.setItem('miday_couple_info', JSON.stringify(parsed));
          }
          setCoupleInfo(parsed);
        }

        const savedMilestones = localStorage.getItem('miday_milestones');
        if (savedMilestones) setMilestones(JSON.parse(savedMilestones));

        const savedPhotos = localStorage.getItem('miday_gallery');
        if (savedPhotos) setPhotos(JSON.parse(savedPhotos));

        const savedLetters = localStorage.getItem('miday_letters');
        if (savedLetters) {
          let parsed = JSON.parse(savedLetters);
          let changed = false;
          parsed = parsed.map((l) => {
            let updated = { ...l };
            if (updated.to === 'Phương Anh') { updated.to = 'Chase Miee'; changed = true; }
            if (updated.from === 'Phương Anh') { updated.from = 'Chase Miee'; changed = true; }
            return updated;
          });
          if (changed) {
            localStorage.setItem('miday_letters', JSON.stringify(parsed));
          }
          setLetters(parsed);
        }

        const savedBucketList = localStorage.getItem('miday_bucketlist');
        if (savedBucketList) setBucketList(JSON.parse(savedBucketList));

        const savedCountdowns = localStorage.getItem('miday_countdowns');
        if (savedCountdowns) setCountdowns(JSON.parse(savedCountdowns));

        const savedFoods = localStorage.getItem('miday_wheel_foods');
        if (savedFoods) setWheelFoods(JSON.parse(savedFoods));

        const savedDates = localStorage.getItem('miday_wheel_dates');
        if (savedDates) setWheelDates(JSON.parse(savedDates));

        const savedMap = localStorage.getItem('miday_love_map');
        if (savedMap) setLoveMap(JSON.parse(savedMap));

        const savedVault = localStorage.getItem('miday_secret_vault');
        if (savedVault) setSecretVault(JSON.parse(savedVault));
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

  const handleAddCountdown = (newEvent) => {
    const updated = [...countdowns, newEvent];
    setCountdowns(updated);
    try {
      localStorage.setItem('miday_countdowns', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCountdown = (id) => {
    const updated = countdowns.filter((c) => c.id !== id);
    setCountdowns(updated);
    try {
      localStorage.setItem('miday_countdowns', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateWheelFoods = (newFoods) => {
    setWheelFoods(newFoods);
    try {
      localStorage.setItem('miday_wheel_foods', JSON.stringify(newFoods));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateWheelDates = (newDates) => {
    setWheelDates(newDates);
    try {
      localStorage.setItem('miday_wheel_dates', JSON.stringify(newDates));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddLocation = (newLoc) => {
    const updated = [...loveMap, newLoc];
    setLoveMap(updated);
    try {
      localStorage.setItem('miday_love_map', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteLocation = (id) => {
    const updated = loveMap.filter((l) => l.id !== id);
    setLoveMap(updated);
    try {
      localStorage.setItem('miday_love_map', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateVault = (newVault) => {
    setSecretVault(newVault);
    try {
      localStorage.setItem('miday_secret_vault', JSON.stringify(newVault));
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
    setCountdowns(DEFAULT_COUNTDOWNS);
    setWheelFoods(DEFAULT_WHEEL_FOODS);
    setWheelDates(DEFAULT_WHEEL_DATES);
    setLoveMap(DEFAULT_LOVE_MAP);
    setSecretVault(DEFAULT_SECRET_VAULT);

    try {
      localStorage.removeItem('miday_couple_info');
      localStorage.removeItem('miday_milestones');
      localStorage.removeItem('miday_gallery');
      localStorage.removeItem('miday_letters');
      localStorage.removeItem('miday_bucketlist');
      localStorage.removeItem('miday_countdowns');
      localStorage.removeItem('miday_wheel_foods');
      localStorage.removeItem('miday_wheel_dates');
      localStorage.removeItem('miday_love_map');
      localStorage.removeItem('miday_secret_vault');
    } catch (e) {
      console.error(e);
    }
  };

  const handleBurstHearts = () => {
    if (heartRef.current) {
      heartRef.current.burst();
    }
  };

  // Tính số ngày bên nhau
  const daysCount = coupleInfo.startDate
    ? Math.max(0, Math.floor((new Date() - new Date(coupleInfo.startDate + 'T00:00:00')) / (1000 * 60 * 60 * 24)))
    : 0;

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
        onOpenCardExport={() => setIsCardExportOpen(true)}
      />

      {/* Hero: Thông tin cặp đôi & Bộ đếm ngày yêu thời gian thực */}
      <CoupleHero
        coupleInfo={coupleInfo}
        stats={stats}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onBurstHearts={handleBurstHearts}
      />

      {/* 1. Bộ đếm ngược ngày kỷ niệm sắp tới */}
      <UpcomingCountdown
        countdowns={countdowns}
        onAddCountdown={handleAddCountdown}
        onDeleteCountdown={handleDeleteCountdown}
        onBurstHearts={handleBurstHearts}
      />

      {/* 2. Hành trình tình yêu: Cột mốc đáng nhớ */}
      <TimelineSection
        milestones={milestones}
        onAddMilestone={handleAddMilestone}
        onDeleteMilestone={handleDeleteMilestone}
      />

      {/* 3. Bản đồ kỷ niệm các điểm đến */}
      <LoveMapSection
        locations={loveMap}
        onAddLocation={handleAddLocation}
        onDeleteLocation={handleDeleteLocation}
        onBurstHearts={handleBurstHearts}
      />

      {/* 4. Kho ảnh kỷ niệm */}
      <GallerySection
        photos={photos}
        onAddPhoto={handleAddPhoto}
        onDeletePhoto={handleDeletePhoto}
        onLikePhoto={handleLikePhoto}
      />

      {/* 5. Vòng quay quyết định ăn gì / đi đâu */}
      <DateNightWheel
        foodOptions={wheelFoods}
        dateOptions={wheelDates}
        onUpdateFoods={handleUpdateWheelFoods}
        onUpdateDates={handleUpdateWheelDates}
        onBurstHearts={handleBurstHearts}
      />

      {/* 6. Hòm thư tình cảm */}
      <LettersSection
        letters={letters}
        coupleInfo={coupleInfo}
        onAddLetter={handleAddLetter}
        onDeleteLetter={handleDeleteLetter}
      />

      {/* 7. Danh sách những điều cùng nhau làm */}
      <BucketListSection
        items={bucketList}
        onToggleItem={handleToggleBucketItem}
        onAddItem={handleAddBucketItem}
        onDeleteItem={handleDeleteBucketItem}
        onBurstHearts={handleBurstHearts}
      />

      {/* 8. Chiếc hộp bí mật khóa mật mã PIN */}
      <SecretLoveVault
        vaultData={secretVault}
        onUpdateVault={handleUpdateVault}
        onBurstHearts={handleBurstHearts}
      />

      {/* Trình phát nhạc nền đa giai điệu */}
      <MusicPlayer />

      {/* Modal tùy chỉnh thông tin cặp đôi */}
      <EditCoupleModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        coupleInfo={coupleInfo}
        onSave={handleSaveCoupleInfo}
        onResetDefault={handleResetDefault}
      />

      {/* Modal xuất hình nền điện thoại đôi */}
      <LoveCardExporter
        isOpen={isCardExportOpen}
        onClose={() => setIsCardExportOpen(false)}
        coupleInfo={coupleInfo}
        daysCount={daysCount}
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

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-6">
            <a href="#countdown" className="hover:text-primary transition-colors">Đếm ngược</a>
            <a href="#timeline" className="hover:text-primary transition-colors">Cột mốc</a>
            <a href="#map" className="hover:text-primary transition-colors">Bản đồ</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Kho ảnh</a>
            <a href="#wheel" className="hover:text-primary transition-colors">Vòng quay</a>
            <a href="#letters" className="hover:text-primary transition-colors">Thư tình</a>
            <a href="#bucketlist" className="hover:text-primary transition-colors">Ước nguyện</a>
            <a href="#vault" className="hover:text-primary transition-colors">Hộp bí mật</a>
            <button
              onClick={() => setIsCardExportOpen(true)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Xuất hình nền
            </button>
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
