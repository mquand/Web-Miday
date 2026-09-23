'use client';
import { useState, useEffect, useRef } from 'react';
import { FaMusic, FaPlay, FaPause, FaHeart, FaStepForward, FaStepBackward, FaLink } from 'react-icons/fa';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [customAudioUrl, setCustomAudioUrl] = useState('');
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const audioElementRef = useRef(null);

  // Danh sách các giai điệu Web Audio du dương
  const tracks = [
    {
      id: 0,
      title: "Canon in D Piano",
      type: "synth",
      notes: [
        261.63, 329.63, 392.00, 523.25,
        196.00, 246.94, 293.66, 392.00,
        220.00, 261.63, 329.63, 440.00,
        174.61, 220.00, 261.63, 349.23
      ],
      speed: 750,
      wave: 'triangle',
      cutoff: 900,
    },
    {
      id: 1,
      title: "Lofi Hoàng Hôn",
      type: "synth",
      notes: [
        174.61, 261.63, 329.63, 392.00,
        164.81, 246.94, 293.66, 392.00,
        146.83, 220.00, 261.63, 329.63,
        130.81, 196.00, 261.63, 329.63
      ],
      speed: 900,
      wave: 'sine',
      cutoff: 750,
    },
    {
      id: 2,
      title: "Hộp Nhạc Kỷ Niệm",
      type: "synth",
      notes: [
        523.25, 659.25, 783.99, 1046.50,
        587.33, 698.46, 880.00, 1174.66,
        659.25, 783.99, 987.77, 1318.51,
        523.25, 659.25, 783.99, 1046.50
      ],
      speed: 600,
      wave: 'sine',
      cutoff: 1400,
    },
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Phát một nốt nhạc bằng Web Audio API
  const playTone = (freq, duration, wave = 'triangle', cutoff = 900) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = wave;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const startMusic = (track = currentTrack) => {
    stopMusic();

    // Nếu người dùng nhập URL MP3 riêng
    if (customAudioUrl) {
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio(customAudioUrl);
        audioElementRef.current.loop = true;
      }
      audioElementRef.current.play().catch((err) => console.log('Audio element play:', err));
      setIsPlaying(true);
      return;
    }

    // Phát giai điệu Web Audio API
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      let noteIndex = 0;
      playTone(track.notes[noteIndex], 1.5, track.wave, track.cutoff);
      noteIndex = (noteIndex + 1) % track.notes.length;

      intervalRef.current = setInterval(() => {
        playTone(track.notes[noteIndex], 1.5, track.wave, track.cutoff);
        noteIndex = (noteIndex + 1) % track.notes.length;
      }, track.speed);

      setIsPlaying(true);
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      startMusic(tracks[nextIdx]);
    }
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
    if (isPlaying) {
      startMusic(tracks[prevIdx]);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
      if (audioElementRef.current) audioElementRef.current.pause();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        className={`flex items-center gap-2 bg-white/95 backdrop-blur-md border border-pink-100 p-2 pr-3.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl ${
          isPlaying ? 'border-primary shadow-pink-100' : ''
        }`}
      >
        {/* Vinyl Record Icon */}
        <button
          onClick={toggleMusic}
          className={`w-11 h-11 rounded-full bg-gray-900 border-2 border-pink-200 flex items-center justify-center text-primary relative overflow-hidden transition-transform shadow-xs ${
            isPlaying ? 'animate-spin-slow' : 'hover:scale-105'
          }`}
          title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc tình yêu"}
        >
          <div className="absolute inset-1 rounded-full border border-gray-800 pointer-events-none"></div>
          <div className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center text-[10px]">
            <FaHeart className="text-primary text-[8px]" />
          </div>
        </button>

        {/* Info */}
        <div className="flex flex-col cursor-pointer max-w-[130px]" onClick={toggleMusic}>
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 truncate">
            <span>{customAudioUrl ? 'Bài Hát Riêng' : currentTrack.title}</span>
            {isPlaying && (
              <span className="flex items-center gap-0.5 h-2 shrink-0">
                <span className="w-0.5 h-2 bg-primary rounded-full animate-bounce"></span>
                <span className="w-0.5 h-3 bg-primary rounded-full animate-bounce delay-75"></span>
                <span className="w-0.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></span>
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-400 truncate">
            {isPlaying ? "Đang phát • Nhấn để dừng" : "Nhấn để phát nhạc"}
          </span>
        </div>

        {/* Controls: Prev, Play/Pause, Next */}
        <div className="flex items-center gap-1 pl-1">
          <button
            onClick={prevTrack}
            className="w-6 h-6 rounded-full text-gray-400 hover:text-primary flex items-center justify-center text-[10px] transition-colors"
            title="Bài trước"
          >
            <FaStepBackward />
          </button>

          <button
            onClick={toggleMusic}
            className="w-7 h-7 rounded-full bg-pink-50 hover:bg-pink-100 text-primary flex items-center justify-center text-xs transition-colors"
            aria-label={isPlaying ? "Dừng" : "Phát"}
          >
            {isPlaying ? <FaPause className="text-[10px]" /> : <FaPlay className="text-[10px] ml-0.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="w-6 h-6 rounded-full text-gray-400 hover:text-primary flex items-center justify-center text-[10px] transition-colors"
            title="Bài tiếp theo"
          >
            <FaStepForward />
          </button>
        </div>
      </div>
    </div>
  );
}
