// Single source of truth untuk semua produk Hibob Studio.
// Gunakan file ini di seluruh codebase. Jangan hardcode data produk di komponen.

export const COMMERCIAL_PRODUCTS = [
  {
    id: "hibob-club-kit",
    name: "Hibob Club Kit",
    tag: "Full System",
    icon: "box",
    price: "Rp1.000.000 / R$20.000",
    priceIDR: 1000000,
    category: "commercial",
    active: true,
    description: "Sistem manajemen club Roblox yang lengkap dan terintegrasi. Dirancang untuk komunitas yang membutuhkan operasional profesional, efisien, dan realtime.",
    features: [
      "Centralized Admin Panel", "Role & Permission System", "NameTag & Title System",
      "VIP / VVIP Shop Integration", "Dance, Sync & Carry System", "Donation System",
      "Leaderboard System", "Leveling & Progression", "Realtime Sync System", "Knit Framework Architecture",
    ],
    showcase: "https://www.tiktok.com/@hibobbb67/video/7638638271001595143",
    highlight: true,
  },
  {
    id: "hibob-music-system",
    name: "Hibob Music System",
    tag: "Audio System",
    icon: "music",
    price: "Rp300.000 / R$6.000",
    priceIDR: 300000,
    category: "commercial",
    active: true,
    description: "Solusi audio management profesional untuk Roblox Club Map. Dibangun untuk sinkronisasi sempurna, interaktivitas tinggi, dan sound processing yang advanced.",
    features: [
      "Full Server Sync — realtime audio sync", "Smart Playback — Auto Queue & Request",
      "Playlist grouping + Smart Search UI", "Players can add songs via Asset ID",
      "MusicZones — area-based sound", "Crossfade, EQ, Reverb, Compressor",
      "DJ Mode — authorized-only control", "Script obfuscation for security",
      "Whitelist via Roblox & Discord", "Dedicated Discord support",
    ],
    showcase: "https://www.tiktok.com/@hibobbb67/video/7629686621918498055",
    highlight: false,
  },
  {
    id: "hibob-visual-system",
    name: "Hibob Visual System",
    tag: "Stage Visual",
    icon: "zap",
    price: "Rp300.000 / R$6.000",
    priceIDR: 300000,
    category: "commercial",
    active: true,
    description: "Video tron untuk stage Roblox. GIF dikonversi menjadi spritesheet lalu diputar frame-by-frame sehingga terlihat seperti video nyata di dalam experience Roblox.",
    features: [
      "GIF to Spritesheet Pipeline", "Frame-by-frame Playback", "Stage / Screen Ready",
      "Custom Resolution Support", "Loop & Autoplay Control", "Multi-screen Sync",
      "Plug & Play Setup", "Performance Optimized", "Roblox Surface GUI Ready", "Dedicated Discord support",
    ],
    showcase: "https://discord.gg/qzCdpasNhG",
    highlight: false,
  },
  {
    id: "hibob-donation-system",
    name: "Hibob Donation System",
    tag: "Donation Platform",
    icon: "heart",
    price: "Rp350.000 / R$6.500",
    priceIDR: 350000,
    category: "commercial",
    active: true,
    description: "Hubungkan donasi Bagibagi langsung ke experience Roblox dengan realtime events, visual effects, analytics, dan creator tracking.",
    features: [
      "Bagibagi Integration", "Realtime Donation Events", "Roblox Effects Trigger",
      "Creator Analytics", "Donation History", "Plug & Play Setup",
      "Web Dashboard Control", "Discord Notification", "Custom Reward System", "Dedicated Discord support",
    ],
    showcase: "https://discord.gg/qzCdpasNhG",
    highlight: false,
  },
];

// Creator Panel Plans — Free tidak perlu checkout
export const CREATOR_PLANS = [
  {
    id: "creator-free",
    name: "Creator Free",
    price: "Gratis",
    priceIDR: 0,
    duration: null,
    category: "plan",
    active: true,
    description: "Akses dasar platform Hibob Studio. Mulai tanpa komitmen.",
    features: ["Creator Panel Access", "2x Konversi Audio", "2x Upload Audio", "Akses komunitas Discord"],
    cta: "Mulai Gratis",
    highlight: false,
  },
  {
    id: "creator-basic",
    name: "Creator Basic",
    price: "Rp50.000",
    priceIDR: 50000,
    duration: "7 Hari",
    category: "plan",
    active: true,
    description: "Untuk creator yang mulai aktif membangun dan membutuhkan kapasitas lebih.",
    features: ["Creator Panel Access", "100x Konversi Audio", "100x Upload Audio", "Priority support Discord"],
    cta: "Pilih Basic",
    highlight: false,
  },
  {
    id: "creator-pro",
    name: "Creator Pro",
    price: "Rp100.000",
    priceIDR: 100000,
    duration: "30 Hari",
    category: "plan",
    active: true,
    description: "Akses penuh untuk creator yang beroperasi secara profesional.",
    features: ["Unlimited Konversi Audio", "Unlimited Upload Audio", "Asset Manager Access", "All future features"],
    cta: "Upgrade ke Pro",
    highlight: true,
  },
];

// Semua produk yang bisa dibeli (commercial + paid plans)
export const ALL_PURCHASABLE = [
  ...COMMERCIAL_PRODUCTS,
  ...CREATOR_PLANS.filter((p) => p.priceIDR > 0),
];

export function getProductById(id) {
  return ALL_PURCHASABLE.find((p) => p.id === id) ?? null;
}

export function formatPrice(priceIDR) {
  return `Rp${priceIDR.toLocaleString("id-ID")}`;
}
