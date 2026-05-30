// UI Sound Effects

const cache = {};

function play(src, volume = 1) {
  if (typeof window === "undefined") return;
  if (!cache[src]) {
    const a = new Audio(src);
    a.preload = "auto";
    cache[src] = a;
  }
  const audio = cache[src];
  audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

let lastHover = 0;
export function sfxHover() {
  const now = Date.now();
  if (now - lastHover < 80) return;
  lastHover = now;
  play("/sfx/sfx-hover.mp3", 0.4);
}

export function sfxClick() {
  play("/sfx/sfx-click.mp3", 0.6);
}

export function sfxLoadDone() {
  play("/sfx/sfx-load-done.mp3", 0.7);
}

export function sfxStart() {
  play("/sfx/sfx-start.mp3", 0.8);
}
