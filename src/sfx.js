// UI Sound Effects — file-based with Web Audio API fallback

let _ctx = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  try {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (_ctx.state === "suspended") _ctx.resume().catch(() => {});
    return _ctx;
  } catch { return null; }
}

function osc(freq, type, startTime, duration, volume, freqEnd) {
  const c = getCtx();
  if (!c) return;
  const oscillator = c.createOscillator();
  const gain = c.createGain();
  oscillator.connect(gain);
  gain.connect(c.destination);
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, startTime);
  if (freqEnd) oscillator.frequency.exponentialRampToValueAtTime(freqEnd, startTime + duration);
  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.01);
}

const cache = {};

function playFile(src, volume, fallback) {
  if (typeof window === "undefined") return;
  if (cache[src] === "failed") { fallback?.(); return; }
  if (!cache[src]) {
    const a = new Audio(src);
    a.preload = "auto";
    a.addEventListener("error", () => { cache[src] = "failed"; }, { once: true });
    cache[src] = a;
  }
  const audio = cache[src];
  audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(() => fallback?.());
}

let lastHover = 0;
export function sfxHover() {
  const now = Date.now();
  if (now - lastHover < 80) return;
  lastHover = now;
  playFile("/sfx/sfx-hover.mp3", 0.4, () => {
    const c = getCtx();
    if (!c) return;
    osc(1400, "sine", c.currentTime, 0.04, 0.04, 1800);
  });
}

export function sfxClick() {
  playFile("/sfx/sfx-click.mp3", 0.6, () => {
    const c = getCtx();
    if (!c) return;
    osc(500, "sine", c.currentTime, 0.08, 0.12, 220);
    osc(220, "sine", c.currentTime + 0.02, 0.06, 0.04);
  });
}

export function sfxLoadDone() {
  playFile("/sfx/sfx-load-done.mp3", 0.7, () => {
    const c = getCtx();
    if (!c) return;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      osc(freq, "sine", c.currentTime + i * 0.1, 0.4, 0.08);
    });
  });
}

export function sfxStart() {
  playFile("/sfx/sfx-start.mp3", 0.8, () => {
    const c = getCtx();
    if (!c) return;
    osc(180, "sine", c.currentTime, 0.35, 0.14, 700);
    osc(1760, "sine", c.currentTime + 0.18, 0.3, 0.06, 2200);
    osc(90, "sine", c.currentTime, 0.15, 0.08, 55);
  });
}
