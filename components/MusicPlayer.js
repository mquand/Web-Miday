'use client';
import { useState, useEffect, useRef } from 'react';
import { FaMusic, FaPlay, FaPause, FaHeart } from 'react-icons/fa';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  // Giai điệu Canon lãng mạn nhẹ nhàng (tần số nốt nhạc Hz)
  const notes = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    523.25, // C5
    196.00, // G3
    246.94, // B3
    293.66, // D4
    392.00, // G4
    220.00, // A3
    261.63, // C4
    329.63, // E4
    440.00, // A4
    174.61, // F3
    220.00, // A3
    261.63, // C4
    349.23, // F4
  ];

  // Phát một nốt piano mềm
  const playTone = (freq, duration = 1.2) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Dạng sóng hình sin ấm
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Filter làm âm thanh dịu ngọt như tiếng chuông/kalimba
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, ctx.currentTime);

    // Envelope âm lượng: mềm mại tan dần
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const startMusic = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      let noteIndex = 0;
      // Phát nốt đầu tiên ngay lập tức
      playTone(notes[noteIndex]);
      noteIndex = (noteIndex + 1) % notes.length;

      // Chu kỳ phát giai điệu
      intervalRef.current = setInterval(() => {
        playTone(notes[noteIndex], 1.5);
        noteIndex = (noteIndex + 1) % notes.length;
      }, 750);

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
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        className={`flex items-center gap-3 bg-white/95 backdrop-blur-md border border-pink-100 p-2 pr-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl ${
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
          {/* Vinyl grooves */}
          <div className="absolute inset-1 rounded-full border border-gray-800 pointer-events-none"></div>
          <div className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center text-[10px]">
            <FaHeart className="text-primary text-[8px]" />
          </div>
        </button>

        {/* Info & Control */}
        <div className="flex flex-col cursor-pointer" onClick={toggleMusic}>
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
            <span>Giai Điệu Tình Yêu</span>
            {isPlaying && (
              <span className="flex items-center gap-0.5 h-2">
                <span className="w-0.5 h-2 bg-primary rounded-full animate-bounce"></span>
                <span className="w-0.5 h-3 bg-primary rounded-full animate-bounce delay-75"></span>
                <span className="w-0.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></span>
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-400">
            {isPlaying ? "Đang phát • Nhấn để dừng" : "Nhấn để phát nhạc nền"}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={toggleMusic}
          className="w-7 h-7 rounded-full bg-pink-50 hover:bg-pink-100 text-primary flex items-center justify-center text-xs ml-1 transition-colors"
          aria-label={isPlaying ? "Dừng" : "Phát"}
        >
          {isPlaying ? <FaPause className="text-[10px]" /> : <FaPlay className="text-[10px] ml-0.5" />}
        </button>
      </div>
    </div>
  );
}
