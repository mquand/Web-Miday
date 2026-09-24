// Web Audio API synthesized romantic micro-sound effects
// 100% client-side, zero external assets, instant 0ms latency

let audioCtx = null;
let soundEnabled = true;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const isSoundEnabled = () => soundEnabled;

export const toggleSound = (enabled) => {
  if (typeof enabled === 'boolean') {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
};

/**
 * Âm thanh lấp lánh như tiếng chuông gió pha lê khi thả tim
 */
export const playHeartChime = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Hợp âm pha lê ngân vang (C6, E6, G6, C7)
  const notes = [1046.5, 1318.51, 1567.98, 2093.0];

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.045);

    gain.gain.setValueAtTime(0.0001, now + i * 0.045);
    gain.gain.exponentialRampToValueAtTime(0.04, now + i * 0.045 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + i * 0.045 + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.045);
    osc.stop(now + i * 0.045 + 0.5);
  });
};

/**
 * Âm thanh chúc mừng ngọt ngào khi hoàn thành 1 điều ước trong Bucket List
 */
export const playSuccessChime = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + i * 0.07);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);

    gain.gain.setValueAtTime(0.0001, now + i * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.07, now + i * 0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + i * 0.07 + 0.55);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.07);
    osc.stop(now + i * 0.07 + 0.6);
  });
};

/**
 * Âm thanh click nhẹ nhàng êm ái
 */
export const playSoftTap = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
};
