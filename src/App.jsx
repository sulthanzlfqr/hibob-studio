import { useEffect, useState } from "react";
import founderAvatar from "./assets/founder-avatar.png";
import logoImg from "./assets/HibobStudio-Logo.png";
import { useCart } from "./hooks/useCart";
import { COMMERCIAL_PRODUCTS, CREATOR_PLANS } from "./data/products";
import { sfxClick, sfxHover } from "./sfx";

const DISCORD_URL = "https://discord.gg/qzCdpasNhG";
const PANEL_URL = "https://panel.hibobstudio.com";
const ROBLOX_PROFILE_URL = "https://www.roblox.com/users/8949415735/profile";
const ROBLOX_USERNAME = "HibobTheDev";

// ─── Navigation ───────────────────────────────────────────────────────────────
const navItems = [
  { label: "Beranda", href: "#home" },
  { label: "Produk", href: "#products" },
  { label: "Paket", href: "#pricing" },
  { label: "Tentang", href: "#about" },
];

// ─── Icon paths ───────────────────────────────────────────────────────────────
const iconPaths = {
  arrowRight: "M5 12h14M13 5l7 7-7 7",
  code: "M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14",
  hammer: "M14 6l4 4M11 3l5 5-9 9H2v-5l9-9ZM15 9l6 6-3 3-6-6",
  paint: "M12 3a9 9 0 0 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a2 2 0 0 1 0-4h2a7 7 0 0 0 0-11h-2ZM7 10h.01M9 6.8h.01M14 6.8h.01M17 10h.01",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM22 6l-10 7L2 6",
  message: "M21 15a4 4 0 0 1-4 4H7l-5 3V7a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4v8Z",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1L12 2Z",
  check: "M20 6 9 17l-5-5",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M18 6 6 18M6 6l12 12",
  box: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  cpu: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM13 2v7h7",
  layers: "M12 2 2 7l10 5 10-5-10-5ZM2 12l10 5 10-5M2 17l10 5 10-5",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  zap: "M13 2L3 14h8l-1 8 11-14h-8l1-6Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  music: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
  play: "M5 3l14 9-14 9V3z",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  externalLink: "M15 3h6v6M10 14L21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5",
  cart: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
};

// ─── Games / Projects ─────────────────────────────────────────────────────────
const games = [
  { title: "Mount Aetheria", category: "Adventure / Mountain", roles: ["Scripting", "GUI", "Building"], desc: "Premium mountain experience dengan atmospheric route design, smooth progression, dan polished journey dari spawn ke summit.", url: "https://www.roblox.com/games/114127426604041/MOUNT-AETHERIA-V3", badge: "MA", year: "2024" },
  { title: "Mount Elythera", category: "Exploration", roles: ["Full Handle"], desc: "Scenic climbing world dengan immersive terrain dari Blender dan clean exploration flow yang enak dimainkan.", url: "https://www.roblox.com/games/102754646900067/Mount-Elythera", badge: "ME", year: "2024" },
  { title: "Mount Perseus", category: "Adventure Systems", roles: ["Full Handle"], desc: "Mountain project dengan OOP architecture, gameplay systems terstruktur, dan interface yang polished.", url: "https://www.roblox.com/games/70976156417927/Mount-Perseus", badge: "MP", year: "2024" },
  { title: "Mount Exodus", category: "Adventure / Mountain", roles: ["Full Handle"], desc: "Mountain experience dengan full development dari building sampai sistem dan polish akhir.", url: "https://www.roblox.com/games/93648214389456/Mount-Exodus", badge: "MX", year: "2024" },
  { title: "Pulau Cerdas Cermat", category: "Educational", roles: ["Scripting", "Building"], desc: "Educational experience dengan quiz interactions dan player-friendly pacing yang smooth.", url: "https://www.roblox.com/games/115372750478468/Pulau-Cerdas-Cermat", badge: "PCC", year: "2025" },
  { title: "Mutual Space Club", category: "Social / Hangout", roles: ["Full Handle"], desc: "Social space dengan custom assets eksklusif, visual identity kuat, dan atmosphere yang nyaman untuk hangout.", url: "https://www.roblox.com/games/121781236784127/Mutual-Space-Club", badge: "MSC", year: "2025" },
  { title: "Podblox ID", category: "Social / Hangout", roles: ["Building"], desc: "Social experience dengan custom building yang detail dan environment yang immersive.", url: "https://www.roblox.com/games/127647754933864/PODBLOX-ID", badge: "PB", year: "2025" },
  { title: "Frost Reaper Club", category: "Club / Social", roles: ["Scripting", "GUI"], desc: "Club map dengan sistem scripting yang solid dan GUI yang clean dan interaktif.", url: "https://www.roblox.com/games/116765847157533/NEW-FROST-REAPER-CLUB", badge: "FR", year: "2025" },
  { title: "Escape from Robby", category: "Horror / Escape", roles: ["Full Handle"], desc: "Horror escape experience dengan full development — building, scripting, dan GUI dari awal sampai launch.", url: "https://www.roblox.com/games/117308005555854/Escape-from-Robby", badge: "ER", year: "2025" },
];

// commercialProducts dan pricingPlans dipindah ke src/data/products.js

// ─── Platform Products ────────────────────────────────────────────────────────
const platformProducts = [
  {
    id: "creator-panel",
    name: "Creator Panel",
    badge: "Core Platform",
    icon: "layers",
    status: "available",
    isHub: true,
    desc: "Command center terpusat untuk mengelola lisensi, audio assets, donasi, identitas, dan semua creator tools dari satu dashboard.",
    highlights: ["Discord Identity", "Roblox Identity", "License Management", "Asset Management", "Donation Tracking", "Unified Creator Dashboard"],
    ctaPrimary: "Buka Panel",
    ctaSecondary: "Pelajari Lebih",
  },
  {
    id: "audio-forge",
    name: "Audio Forge",
    badge: "Audio Pipeline",
    icon: "music",
    status: "coming-soon",
    desc: "Convert, proses, preview, publish, dan kelola Roblox audio assets lewat workflow creator yang profesional.",
    highlights: ["Preview Engine", "Roblox Upload Pipeline", "Asset Library", "Quota Management", "Audio Processing"],
    ctaPrimary: "Coba Audio Forge",
  },
  {
    id: "license-manager",
    name: "License Manager",
    badge: "Creator Security",
    icon: "shield",
    status: "coming-soon",
    desc: "Lindungi sistem Roblox premium dengan verifikasi kepemilikan berbasis Discord dan pengiriman lisensi otomatis.",
    highlights: ["Discord Verification", "Ownership Tracking", "Automatic Delivery", "License Revocation", "Universe Binding"],
    ctaPrimary: "Lihat Sistem",
  },
  {
    id: "asset-manager",
    name: "Asset Manager",
    badge: "Creator Assets",
    icon: "box",
    status: "coming-soon",
    desc: "Kelola Roblox assets, ownership records, permissions, dan creator resources dari satu tempat.",
    highlights: ["Asset Library", "Ownership Records", "Version Tracking", "Team Access", "Resource Organization"],
    ctaPrimary: "Lihat Sistem",
  },
];

// ─── Why Creators Choose ──────────────────────────────────────────────────────
const whyCreators = [
  {
    icon: "layers",
    title: "Creator Infrastructure",
    desc: "Bukan sekadar kumpulan tools. Hibob Studio adalah lapisan infrastruktur yang berdiri antara creator dan semua kerumitan operasional yang menghambat fokus membangun.",
  },
  {
    icon: "globe",
    title: "Roblox Native",
    desc: "Setiap keputusan produk dibuat dengan pemahaman mendalam tentang cara creator Roblox bekerja — bukan adaptasi dari platform lain yang dipaksakan masuk ke ekosistem Roblox.",
  },
  {
    icon: "cpu",
    title: "Connected Ecosystem",
    desc: "Semua produk dirancang bekerja bersama. Creator Identity menjadi fondasi, Creator Panel menjadi hub, dan setiap produk lain memiliki nilai lebih karena terhubung satu sama lain.",
  },
  {
    icon: "shield",
    title: "Professional Workflow",
    desc: "Creator yang menggunakan Hibob Studio beroperasi dengan infrastruktur yang terasa profesional — kepada komunitas, kepada pembeli produk, dan kepada sesama creator.",
  },
  {
    icon: "users",
    title: "Dibangun Oleh Creator",
    desc: "Hibob Studio dibangun oleh creator yang benar-benar aktif di ekosistem Roblox. Setiap masalah yang dipecahkan adalah masalah yang sudah dirasakan sendiri.",
  },
  {
    icon: "zap",
    title: "Terus Berkembang",
    desc: "Ekosistem Hibob Studio terus diperluas. Dari Audio Forge hingga API Infrastructure — setiap produk baru menambah nilai ke seluruh ekosistem yang sudah ada.",
  },
];

// pricingPlans dipindah ke src/data/products.js sebagai CREATOR_PLANS

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setP(max > 0 ? window.scrollY / max : 0); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.2, rootMargin: "-15% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); } }),
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function scrollTo(e, href) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", href);
}

// ─── Components ───────────────────────────────────────────────────────────────
function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  );
}

function Divider() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(168,85,247,.35),rgba(56,189,248,.3),transparent)" }} />
    </div>
  );
}

function Label({ text, center = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: center ? "center" : "flex-start" }}>
      <div style={{ width: 24, height: 2, background: "linear-gradient(90deg,#a855f7,transparent)", borderRadius: 2 }} />
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", color: "#a855f7", textTransform: "uppercase" }}>{text}</p>
    </div>
  );
}

function Btn({ href, children, primary = false, onClick, style: extraStyle = {}, className = "" }) {
  return (
    <a href={href} onClick={(e) => { sfxClick(); onClick?.(e); }} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 26px", borderRadius: 12, fontWeight: 800, fontSize: 14, color: "white", textDecoration: "none", cursor: "pointer", transition: "all .22s cubic-bezier(.22,1,.36,1)", ...(primary ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.5)", boxShadow: "0 0 24px rgba(168,85,247,.3)" } : { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)" }), ...extraStyle }}
      onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.opacity = ".85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}>
      {children}
    </a>
  );
}

function Card({ children, style: extraStyle = {}, highlight = false }) {
  return (
    <div style={{ background: highlight ? "rgba(168,85,247,.08)" : "rgba(255,255,255,.03)", border: highlight ? "1px solid rgba(168,85,247,.4)" : "1px solid rgba(255,255,255,.07)", borderRadius: 20, transition: "transform .3s cubic-bezier(.22,1,.36,1), border-color .3s", ...extraStyle }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; if (!highlight) e.currentTarget.style.borderColor = "rgba(168,85,247,.3)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; if (!highlight) e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"; }}>
      {children}
    </div>
  );
}

// ─── Ecosystem Visual (Hero right panel) ─────────────────────────────────────
function EcosystemVisual() {
  const tools = [
    { name: "Audio Forge", badge: "Audio", color: "#38bdf8", status: "soon" },
    { name: "License Manager", badge: "Security", color: "#34d399", status: "soon" },
    { name: "Asset Manager", badge: "Assets", color: "#f59e0b", status: "soon" },
    { name: "Creator Identity", badge: "Identity", color: "#f472b6", status: "soon" },
  ];

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Panel mock header */}
      <div style={{ background: "rgba(8,5,28,.92)", border: "1px solid rgba(168,85,247,.35)", borderRadius: 18, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,.7), 0 0 60px rgba(120,60,250,.12)" }}>
        {/* Top bar */}
        <div style={{ background: "rgba(168,85,247,.08)", borderBottom: "1px solid rgba(168,85,247,.18)", padding: "12px 18px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#f87171", "#fbbf24", "#34d399"].map((c, i) => (
              <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: .7 }} />
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 22, background: "rgba(255,255,255,.05)", borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 10 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,.3)", fontWeight: 500 }}>panel.hibobstudio.com</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 8, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.22)" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#34d399" }}>Live</span>
          </div>
        </div>

        {/* Panel content */}
        <div style={{ padding: "18px" }}>
          {/* Creator Panel hub */}
          <div style={{ padding: "14px 16px", borderRadius: 12, background: "linear-gradient(135deg,rgba(120,50,250,.18),rgba(56,189,248,.06))", border: "1px solid rgba(168,85,247,.35)", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(168,85,247,.2)", border: "1px solid rgba(168,85,247,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5ZM2 12l10 5 10-5M2 17l10 5 10-5" /></svg>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 800, color: "white" }}>Creator Panel</p>
                <p style={{ fontSize: 10, color: "rgba(168,85,247,.7)", fontWeight: 600 }}>Command Center · Hub Utama</p>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.25)", color: "#34d399" }}>● Available</div>
            </div>
            {/* Activity summary */}
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
              {[{ label: "Lisensi Aktif", val: "—" }, { label: "Audio Diproses", val: "—" }, { label: "Donasi Diterima", val: "—" }].map((s, i) => (
                <div key={i} style={{ padding: "8px 10px", borderRadius: 8, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", textAlign: "center" }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,.5)", marginBottom: 2 }}>{s.val}</p>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tool grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {tools.map((t, i) => (
              <div key={i} style={{ padding: "11px 13px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: t.color, textTransform: "uppercase", letterSpacing: ".08em" }}>{t.badge}</span>
                  <span style={{ fontSize: 9, color: t.status === "live" ? "#34d399" : "rgba(255,255,255,.25)", fontWeight: 600 }}>{t.status === "live" ? "● Live" : "Soon"}</span>
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.8)" }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Float chips */}
      <div style={{ position: "absolute", top: -16, right: -18, padding: "7px 13px", borderRadius: 999, background: "rgba(8,5,28,.9)", border: "1px solid rgba(52,211,153,.35)", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 8px 32px rgba(0,0,0,.5)" }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#34d399" }}>Creator Panel Live</span>
      </div>
      <div style={{ position: "absolute", bottom: -14, left: -16, padding: "7px 13px", borderRadius: 999, background: "rgba(8,5,28,.9)", border: "1px solid rgba(168,85,247,.35)", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 8px 32px rgba(0,0,0,.5)" }}>
        <Icon name="zap" size={11} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#a855f7" }}>8 Produk Terhubung</span>
      </div>
    </div>
  );
}

// ─── Roblox Avatar ───────────────────────────────────────────────────────────
function RobloxAvatar() {
  const [failed, setFailed] = useState(false);

  const containerStyle = {
    width: 200, height: 200, borderRadius: 24, overflow: "hidden",
    border: "2px solid rgba(168,85,247,.35)", boxShadow: "0 0 60px rgba(168,85,247,.2)",
    background: "rgba(168,85,247,.08)", display: "flex", alignItems: "center", justifyContent: "center",
  };

  if (failed) {
    return (
      <div style={containerStyle}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(168,85,247,.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <img
        src={founderAvatar}
        alt={`${ROBLOX_USERNAME} — Founder Hibob Studio`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ isOpen, active, onClose }) {
  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: isOpen ? "auto" : "none", opacity: isOpen ? 1 : 0, transition: "opacity .4s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(24px)", background: "rgba(7,3,22,.97)" }} />
      <nav style={{ position: "relative", display: "flex", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        {navItems.map((item, i) => {
          const id = item.href.replace("#", "");
          const isActive = active === id;
          return (
            <a key={item.href} href={item.href}
              onClick={(e) => { sfxClick(); scrollTo(e, item.href); onClose(); }}
              style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", textDecoration: "none", transition: `all .5s cubic-bezier(.22,1,.36,1) ${i * 50}ms`, transform: isOpen ? "translateY(0)" : "translateY(20px)", opacity: isOpen ? 1 : 0, ...(isActive ? { background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "rgba(255,255,255,.55)" }) }}>
              {item.label}
            </a>
          );
        })}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18, width: "100%", maxWidth: 320, transition: `all .5s cubic-bezier(.22,1,.36,1) 250ms`, transform: isOpen ? "translateY(0)" : "translateY(20px)", opacity: isOpen ? 1 : 0 }}>
          <a href={PANEL_URL} target="_blank" rel="noreferrer" onClick={() => { sfxClick(); onClose(); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 20px", borderRadius: 12, fontWeight: 800, fontSize: 15, color: "white", textDecoration: "none", background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.4)" }}>
            Buka Creator Panel <Icon name="arrowRight" size={16} />
          </a>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" onClick={() => { sfxClick(); onClose(); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, color: "white", textDecoration: "none", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>
            <Icon name="message" size={16} /> Discord
          </a>
        </div>
      </nav>
    </div>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer({ items, total, onClose, onRemove, onCheckout }) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,.55)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 61, width: "min(100vw, 400px)", background: "#0d0920", borderLeft: "1px solid rgba(168,85,247,.2)", display: "flex", flexDirection: "column", boxShadow: "-32px 0 80px rgba(0,0,0,.7)" }}>
        {/* Header */}
        <div style={{ padding: "22px 24px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="cart" size={18} />
            <span style={{ fontSize: 16, fontWeight: 800 }}>Keranjang Produk</span>
            {items.length > 0 && (
              <span style={{ padding: "2px 8px", borderRadius: 999, background: "rgba(168,85,247,.2)", border: "1px solid rgba(168,85,247,.35)", fontSize: 11, fontWeight: 700, color: "#c084fc" }}>{items.length}</span>
            )}
          </div>
          <button onClick={() => { sfxClick(); onClose(); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,.5)", cursor: "pointer", padding: 4, borderRadius: 8, transition: "color .2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "white"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.5)"}>
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
              <Icon name="cart" size={36} />
              <p style={{ color: "rgba(255,255,255,.35)", fontSize: 14, textAlign: "center" }}>Keranjang kosong.<br />Tambahkan produk untuk checkout.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((item) => (
                <div key={item.productId} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(168,85,247,.15)", border: "1px solid rgba(168,85,247,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#a855f7" }}>
                    <Icon name={item.product.icon} size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{item.product.name}</p>
                    <p style={{ fontSize: 12, color: "#a855f7", fontWeight: 600 }}>{item.product.price}</p>
                  </div>
                  <button onClick={() => { sfxClick(); onRemove(item.productId); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", cursor: "pointer", padding: 6, borderRadius: 8, transition: "color .2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#f87171"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.3)"}>
                    <Icon name="trash" size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "18px 24px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,.5)", fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 900, background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Rp{total.toLocaleString("id-ID")}</span>
            </div>
            <button onClick={() => { sfxClick(); onCheckout(); }}
              style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit", transition: "opacity .2s" }}
              onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.opacity = ".85"; }}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
              Lanjut ke Checkout <Icon name="arrowRight" size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const progress = useScrollProgress();
  const activeSection = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { enrichedItems, addItem, removeItem, getTotal, getItemCount, isInCart } = useCart();
  useReveal();

  useEffect(() => {
    const fn = () => { setShowTop(window.scrollY > 500); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const itemCount = getItemCount();
  const cartTotal = getTotal();

  return (
    <div style={{ background: "#03010f", minHeight: "100vh", color: "white", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        [data-reveal] { opacity:0; transform:translateY(28px); filter:blur(5px); transition:opacity .72s cubic-bezier(.22,1,.36,1),transform .72s cubic-bezier(.22,1,.36,1),filter .72s cubic-bezier(.22,1,.36,1); }
        [data-reveal].revealed { opacity:1; transform:translateY(0); filter:blur(0); }
        [data-d="1"]{transition-delay:.08s!important} [data-d="2"]{transition-delay:.16s!important} [data-d="3"]{transition-delay:.24s!important} [data-d="4"]{transition-delay:.32s!important} [data-d="5"]{transition-delay:.40s!important}
        .gt { background:linear-gradient(120deg,#a855f7 0%,#e879f9 45%,#38bdf8 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:gs 5s ease infinite; }
        @keyframes gs { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .gborder { position:relative; }
        .gborder::before { content:''; position:absolute; inset:0; border-radius:inherit; padding:1px; background:linear-gradient(135deg,rgba(168,85,247,.4),rgba(56,189,248,.2),rgba(168,85,247,.1)); -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none; }
        .pulse { animation:pg 3s ease-in-out infinite; }
        @keyframes pg { 0%,100%{box-shadow:0 0 20px rgba(168,85,247,.35)} 50%{box-shadow:0 0 55px rgba(168,85,247,.7),0 0 90px rgba(168,85,247,.2)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#03010f} ::-webkit-scrollbar-thumb{background:linear-gradient(#a855f7,#38bdf8);border-radius:99px}
        ::selection{background:rgba(168,85,247,.35)}
        .nav-link:hover{color:white!important;background:rgba(255,255,255,.06)!important}
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important}
          .hero-right{display:none!important}
          .why-grid{grid-template-columns:1fr!important}
          .pricing-grid{grid-template-columns:1fr!important}
          .products-grid{grid-template-columns:1fr!important}
          .platform-grid{grid-template-columns:1fr!important}
          .hub-inner{grid-template-columns:1fr!important}
          .hub-features{display:none!important}
          .games-grid{grid-template-columns:1fr!important}
          .hide-mob{display:none!important}
          .show-mob{display:flex!important}
          .founder-grid{grid-template-columns:1fr!important}
        }
        @media(min-width:769px){.show-mob{display:none!important}}
        @media(prefers-reduced-motion:reduce){ *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important} [data-reveal]{opacity:1!important;transform:none!important;filter:none!important} }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 8% 0%,rgba(110,35,190,.22) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 95% 15%,rgba(14,100,190,.12) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 50% at 50% 100%,rgba(90,25,170,.12) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <MobileMenu isOpen={menuOpen} active={activeSection} onClose={() => setMenuOpen(false)} />
      {cartOpen && <CartDrawer items={enrichedItems} total={cartTotal} onClose={() => setCartOpen(false)} onRemove={removeItem} onCheckout={() => { setCartOpen(false); window.location.hash = "/checkout"; }} />}

      <div style={{ position: "relative", zIndex: 1, animation: "fadeIn .6s ease both", paddingTop: 66 }}>

        {/* ── HEADER ─────────────────────────────────────────────────────────── */}
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,.06)", backdropFilter: "blur(20px)", background: "rgba(3,1,15,.55)" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: `${progress * 100}%`, background: "linear-gradient(90deg,#a855f7,#e879f9,#38bdf8)", transition: "width .1s linear", borderRadius: "0 2px 2px 0" }} />
          <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
            <a href="#home" onClick={(e) => scrollTo(e, "#home")} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = ".8"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
              <img src={logoImg} alt="Hibob Studio" style={{ height: 30, width: "auto", objectFit: "contain", display: "block" }} />
            </a>
            <div className="hide-mob" style={{ display: "flex", alignItems: "center", gap: 2, padding: 5, borderRadius: 999, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a key={item.href} href={item.href} className="nav-link" onClick={(e) => scrollTo(e, item.href)}
                    style={{ padding: "7px 15px", borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all .2s", color: isActive ? "white" : "rgba(255,255,255,.5)", background: isActive ? "rgba(168,85,247,.18)" : "transparent", border: isActive ? "1px solid rgba(168,85,247,.35)" : "1px solid transparent" }}>
                    {item.label}
                  </a>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Cart button */}
              <button onClick={() => { sfxClick(); setCartOpen(true); }}
                style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.7)", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.borderColor = "rgba(168,85,247,.4)"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.7)"; }}>
                <Icon name="cart" size={17} />
                {itemCount > 0 && (
                  <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: "#a855f7", fontSize: 9, fontWeight: 900, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>{itemCount}</span>
                )}
              </button>
              <Btn href={DISCORD_URL} primary className="hide-mob pulse" style={{ padding: "9px 20px", borderRadius: 999, fontSize: 13 }}>
                Join Discord
              </Btn>
              <button onClick={() => { sfxClick(); setMenuOpen((v) => !v); }} className="show-mob"
                style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, width: 42, height: 42, alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer", transition: "all .2s" }}>
                <Icon name={menuOpen ? "x" : "menu"} size={20} />
              </button>
            </div>
          </nav>
        </header>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section id="home" className="hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", minHeight: "calc(100vh - 66px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, padding: "80px 0 100px" }}>
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(168,85,247,.32)", background: "rgba(168,85,247,.09)", width: "fit-content" }}>
              <Icon name="star" size={12} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#c084fc", letterSpacing: ".07em", textTransform: "uppercase" }}>Creator Infrastructure Platform</span>
            </div>
            <div data-reveal data-d="1">
              <h1 style={{ fontSize: "clamp(40px,5.5vw,76px)", fontWeight: 900, lineHeight: 1.03, letterSpacing: "-0.04em" }}>
                Infrastruktur untuk<br />creator Roblox <span className="gt">yang serius.</span>
              </h1>
            </div>
            <p data-reveal data-d="2" style={{ fontSize: 17, color: "rgba(255,255,255,.5)", lineHeight: 1.78, maxWidth: 480, fontWeight: 400 }}>
              Berhenti mengelola audio, aset, identitas, dan lisensi secara manual. Hibob Studio adalah platform yang terhubung, dibangun untuk cara creator Roblox profesional bekerja.
            </p>
            <div data-reveal data-d="3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn href={PANEL_URL} primary style={{ padding: "14px 28px" }}>
                Buka Creator Panel <Icon name="arrowRight" size={17} />
              </Btn>
              <Btn href="#products" onClick={(e) => scrollTo(e, "#products")} style={{ padding: "14px 28px" }}>
                Jelajahi Produk
              </Btn>
            </div>
            {/* Integration logos */}
            <div data-reveal data-d="4" style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 8 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>Terintegrasi dengan</span>
              {[{ label: "Discord", color: "#5865f2" }, { label: "Roblox", color: "#e42b2b" }].map((i) => (
                <span key={i.label} style={{ fontSize: 12, fontWeight: 700, color: i.color, padding: "4px 10px", borderRadius: 6, background: `${i.color}18`, border: `1px solid ${i.color}30` }}>{i.label}</span>
              ))}
            </div>
          </div>

          <div className="hero-right" data-reveal data-d="2" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 0 80px" }}>
            <EcosystemVisual />
          </div>
        </section>

        <div style={{ paddingTop: 96 }}><Divider /></div>

        {/* ── PRODUCTS ECOSYSTEM ─────────────────────────────────────────────── */}
        <section id="products" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Ekosistem Produk" />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Satu platform. <span className="gt">Delapan alat terhubung.</span>
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 560, lineHeight: 1.78 }}>
              Dari command center creator hingga audio pipeline, license management, dan sistem club — semua bagian dari satu ekosistem yang dirancang bekerja bersama.
            </p>
          </div>

          {/* Creator Panel — Hub Card */}
          <div data-reveal style={{ marginBottom: 14, position: "relative", background: "rgba(120,50,250,.07)", border: "1px solid rgba(168,85,247,.45)", borderRadius: 24, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#7c3aed,#a855f7,#e879f9,#38bdf8)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 90% at 85% 50%,rgba(168,85,247,.1) 0%,transparent 65%)", pointerEvents: "none" }} />
            <div className="hub-inner" style={{ position: "relative", padding: "40px 44px", display: "grid", gridTemplateColumns: "1fr 240px", gap: 48, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(120,50,250,.3),rgba(56,189,248,.15))", border: "1px solid rgba(168,85,247,.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a855f7" }}>
                    <Icon name="layers" size={22} />
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 999, background: "rgba(168,85,247,.18)", border: "1px solid rgba(168,85,247,.4)", color: "#c084fc", letterSpacing: ".08em", textTransform: "uppercase" }}>Core Platform</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 999, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.25)", color: "#34d399" }}>● Tersedia</span>
                  </div>
                </div>
                <h3 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, letterSpacing: "-0.035em", marginBottom: 12 }}>Creator Panel</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.8, maxWidth: 540, marginBottom: 26 }}>
                  Command center terpusat untuk mengelola lisensi, audio assets, donasi, identitas, dan semua creator tools dari satu dashboard.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Btn href={PANEL_URL} primary style={{ padding: "12px 24px" }}>
                    Buka Panel <Icon name="arrowRight" size={16} />
                  </Btn>
                  <Btn href={PANEL_URL} style={{ padding: "12px 24px" }}>
                    Pelajari Lebih <Icon name="externalLink" size={14} />
                  </Btn>
                </div>
              </div>
              <div className="hub-features" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {platformProducts[0].highlights.map((h, hi) => (
                  <div key={hi} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 14px", borderRadius: 11, background: "rgba(168,85,247,.07)", border: "1px solid rgba(168,85,247,.15)" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#a855f7,#38bdf8)", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.65)" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Tools — 4 columns */}
          <div className="platform-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 28 }}>
            {platformProducts.filter((p) => !p.isHub).map((prod, i) => {
              const isAvail = prod.status === "available";
              return (
                <div key={prod.id} data-reveal data-d={`${i + 1}`}
                  style={{ position: "relative", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: "24px 22px", transition: "transform .3s cubic-bezier(.22,1,.36,1), border-color .3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(168,85,247,.28)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"; }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a855f7" }}>
                      <Icon name={prod.icon} size={18} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999, letterSpacing: ".05em", ...(isAvail ? { background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.22)", color: "#34d399" } : { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.35)" }) }}>
                      {isAvail ? "● Tersedia" : "Segera Hadir"}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#38bdf8", textTransform: "uppercase", marginBottom: 5, display: "block" }}>{prod.badge}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 7, letterSpacing: "-0.02em" }}>{prod.name}</h3>
                  <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.42)", lineHeight: 1.72, marginBottom: 14 }}>{prod.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
                    {prod.highlights.slice(0, 3).map((h, hi) => (
                      <div key={hi} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 14, height: 14, borderRadius: 4, background: "rgba(168,85,247,.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#a855f7" }}>
                          <Icon name="check" size={9} />
                        </div>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,.48)", fontWeight: 500 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                  <a href={isAvail ? PANEL_URL : undefined}
                    onClick={!isAvail ? (e) => e.preventDefault() : undefined}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 0", borderRadius: 10, fontWeight: 700, fontSize: 12.5, textDecoration: "none", transition: "all .2s", ...(isAvail ? { background: "rgba(168,85,247,.14)", border: "1px solid rgba(168,85,247,.28)", color: "white", cursor: "pointer" } : { background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.28)", cursor: "default" }) }}
                    onMouseEnter={(e) => { if (isAvail) e.currentTarget.style.background = "rgba(168,85,247,.24)"; }}
                    onMouseLeave={(e) => { if (isAvail) e.currentTarget.style.background = "rgba(168,85,247,.14)"; }}>
                    {isAvail ? (<><Icon name="arrowRight" size={13} /> {prod.ctaPrimary}</>) : prod.ctaPrimary}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Divider label */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase" }}>Produk Komersial</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
          </div>

          {/* Commercial Products — 2×2 grid */}
          <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {COMMERCIAL_PRODUCTS.map((prod, i) => {
              const inCart = isInCart(prod.id);
              return (
                <div key={prod.id} data-reveal data-d={`${i + 1}`}
                  style={{ position: "relative", background: prod.highlight ? "rgba(168,85,247,.07)" : "rgba(255,255,255,.03)", border: prod.highlight ? "1px solid rgba(168,85,247,.4)" : "1px solid rgba(255,255,255,.07)", borderRadius: 22, overflow: "hidden", transition: "transform .3s cubic-bezier(.22,1,.36,1), border-color .3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; if (!prod.highlight) e.currentTarget.style.borderColor = "rgba(168,85,247,.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; if (!prod.highlight) e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"; }}>
                  {prod.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#7c3aed,#a855f7,#38bdf8)" }} />}
                  <div style={{ padding: "28px 28px 0" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(168,85,247,.15)", border: "1px solid rgba(168,85,247,.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a855f7" }}><Icon name={prod.icon} size={19} /></div>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,.08)", border: "1px solid rgba(56,189,248,.18)", color: "#38bdf8", letterSpacing: ".06em" }}>{prod.tag}</span>
                        </div>
                        <h3 style={{ fontSize: 21, fontWeight: 900, letterSpacing: "-0.02em" }}>{prod.name}</h3>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 15, fontWeight: 900, ...(prod.highlight ? { background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "white" }) }}>{prod.price}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,.48)", lineHeight: 1.78, marginBottom: 20 }}>{prod.desc}</p>
                  </div>
                  <div style={{ padding: "0 28px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px 12px", marginBottom: 24 }}>
                      {prod.features.map((f, fi) => (
                        <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                          <div style={{ width: 16, height: 16, borderRadius: 5, background: "rgba(168,85,247,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#a855f7", marginTop: 2 }}><Icon name="check" size={10} /></div>
                          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.58)", fontWeight: 500, lineHeight: 1.5 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <a href={prod.showcase} target="_blank" rel="noreferrer" onClick={sfxClick}
                        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 0", borderRadius: 11, fontWeight: 700, fontSize: 13, color: "white", textDecoration: "none", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", transition: "all .2s" }}
                        onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.background = "rgba(255,255,255,.1)"; }}
                        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,.06)"}>
                        <Icon name="play" size={13} /> Lihat Showcase
                      </a>
                      <button
                        onClick={() => { sfxClick(); if (inCart) { setCartOpen(true); } else { addItem(prod.id); setCartOpen(true); } }}
                        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 0", borderRadius: 11, fontWeight: 700, fontSize: 13, color: "white", background: inCart ? "rgba(52,211,153,.15)" : (prod.highlight ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(168,85,247,.15)"), border: inCart ? "1px solid rgba(52,211,153,.3)" : (prod.highlight ? "1px solid rgba(168,85,247,.5)" : "1px solid rgba(168,85,247,.3)"), transition: "all .2s", cursor: "pointer", fontFamily: "inherit" }}
                        onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.opacity = ".85"; }}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                        <Icon name={inCart ? "check" : "cart"} size={13} />
                        {inCart ? "Ditambahkan" : "Tambah ke Keranjang"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* ── WHY CREATORS CHOOSE ─────────────────────────────────────────────── */}
        <section id="why" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Mengapa Hibob Studio" />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Mengapa creator memilih <span className="gt">Hibob Studio.</span>
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 540, lineHeight: 1.78 }}>
              Platform infrastruktur yang dibangun dengan pemahaman mendalam tentang ekosistem Roblox — bukan adaptasi dari platform lain.
            </p>
          </div>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {whyCreators.map((w, i) => (
              <Card key={i} style={{ padding: 28 }}>
                <div data-reveal data-d={`${(i % 3) + 1}`}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "#a855f7" }}>
                    <Icon name={w.icon} size={21} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}>{w.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.46)", lineHeight: 1.78 }}>{w.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── ABOUT FOUNDER ──────────────────────────────────────────────────── */}
        <section id="about" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Tentang Founder" />
          <div className="founder-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 60, alignItems: "center" }}>
            {/* Avatar */}
            <div data-reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <RobloxAvatar />
                <div style={{ position: "absolute", bottom: -8, right: -8, padding: "5px 12px", borderRadius: 999, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.3)", display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#34d399" }}>Active Creator</span>
                </div>
              </div>
              <p style={{ fontSize: 15, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>{ROBLOX_USERNAME}</p>
              <a href={ROBLOX_PROFILE_URL} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontWeight: 600, textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#a855f7"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.4)"}>
                Lihat Profil Roblox →
              </a>
            </div>

            {/* Content */}
            <div data-reveal data-d="2">
              <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 20 }}>
                Dibangun oleh creator,<br />untuk <span className="gt">creator.</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.85 }}>
                  Hibob adalah Roblox developer yang aktif membangun experience dan komunitas di platform Roblox. Setelah bertahun-tahun menghadapi hambatan operasional yang sama — upload audio satu per satu, whitelist pembeli secara manual, mengelola identitas lintas Discord dan Roblox tanpa sistem — keputusan diambil untuk membangun infrastruktur yang menyelesaikan masalah ini satu kali untuk semua creator.
                </p>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.85 }}>
                  Hibob Studio lahir dari pengalaman nyata sebagai creator, bukan dari riset pasar. Setiap produk yang dibangun adalah solusi untuk masalah yang sudah dirasakan sendiri — dan sekarang tersedia untuk semua creator Roblox yang menghadapi masalah yang sama.
                </p>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
                {[
                  { val: "2+", label: "Tahun di Roblox" },
                  { val: "20+", label: "Experience Dibangun" },
                  { val: "8", label: "Produk Platform" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "14px 20px", borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)" }}>
                    <div style={{ fontSize: 26, fontWeight: 900, background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── GAMES BUILT ─────────────────────────────────────────────────────── */}
        <section id="games" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Proof of Experience" />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Experience yang <span className="gt">sudah dibangun.</span>
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 560, lineHeight: 1.78 }}>
              Produk Hibob Studio dibangun oleh creator yang benar-benar aktif membangun experience Roblox — bukan teori, tapi pengalaman nyata dari lapangan.
            </p>
          </div>
          <div className="games-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
            {games.map((g, i) => (
              <Card key={i} style={{ overflow: "hidden" }}>
                <div data-reveal data-d={`${(i % 4) + 1}`}>
                  <div style={{ padding: "20px 22px 14px", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(168,85,247,.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", color: "#a855f7", textTransform: "uppercase" }}>{g.category}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)", fontWeight: 500 }}>{g.year}</span>
                        <span style={{ fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 999, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.25)", color: "#c084fc" }}>{g.badge}</span>
                      </div>
                    </div>
                    <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>{g.title}</h3>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {g.roles.map((r, ri) => (
                        <span key={ri} style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: r === "Full Handle" ? "rgba(56,189,248,.1)" : "rgba(168,85,247,.1)", border: r === "Full Handle" ? "1px solid rgba(56,189,248,.25)" : "1px solid rgba(168,85,247,.2)", color: r === "Full Handle" ? "#38bdf8" : "#c084fc", letterSpacing: ".05em", textTransform: "uppercase" }}>{r}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: "14px 22px 20px" }}>
                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.46)", lineHeight: 1.78, marginBottom: 16 }}>{g.desc}</p>
                    <a href={g.url} target="_blank" rel="noreferrer" onClick={sfxClick}
                      style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, fontWeight: 700, fontSize: 13, color: "white", textDecoration: "none", background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.4)", transition: "all .2s" }}
                      onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.boxShadow = "0 0 20px rgba(168,85,247,.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}>
                      Main Sekarang <Icon name="arrowRight" size={13} />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── CREATOR PANEL PLANS ─────────────────────────────────────────────── */}
        <section id="pricing" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Paket Creator Panel" />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Pilih level <span className="gt">akses kamu.</span>
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>
              Akses platform untuk setiap tahap perjalanan creator. Mulai gratis, tingkatkan kapasitas saat siap.
            </p>
          </div>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "start" }}>
            {CREATOR_PLANS.map((p, i) => {
              const inPlanCart = isInCart(p.id);
              return (
                <div key={p.id} data-reveal data-d={`${i + 1}`}
                  style={{ position: "relative", background: p.highlight ? "rgba(168,85,247,.08)" : "rgba(255,255,255,.03)", border: p.highlight ? "1px solid rgba(168,85,247,.45)" : "1px solid rgba(255,255,255,.07)", borderRadius: 22, padding: "28px 24px", transition: "transform .3s cubic-bezier(.22,1,.36,1)" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  {p.highlight && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", padding: "5px 16px", borderRadius: 999, background: "linear-gradient(135deg,#7c3aed,#a855f7)", fontSize: 10, fontWeight: 800, color: "white", letterSpacing: ".08em", whiteSpace: "nowrap" }}>PALING POPULER</div>}
                  <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em" }}>{p.name}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 900, ...(p.highlight ? { background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "white" }) }}>
                      {p.price}
                    </span>
                    {p.duration && <span style={{ fontSize: 12, color: "rgba(255,255,255,.3)", fontWeight: 600 }}>/ {p.duration}</span>}
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.7, marginBottom: 20, minHeight: 44 }}>{p.description}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                    {p.features.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 17, height: 17, borderRadius: 6, background: "rgba(168,85,247,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#a855f7" }}><Icon name="check" size={10} /></div>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)", fontWeight: 500 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  {p.priceIDR === 0 ? (
                    <a href={PANEL_URL} target="_blank" rel="noreferrer" onClick={sfxClick}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "12px 0", borderRadius: 12, fontWeight: 800, fontSize: 13.5, color: "white", textDecoration: "none", width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", transition: "all .2s" }}
                      onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.opacity = ".85"; }}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                      {p.cta} <Icon name="arrowRight" size={14} />
                    </a>
                  ) : (
                    <button
                      onClick={() => { sfxClick(); if (inPlanCart) { setCartOpen(true); } else { addItem(p.id); setCartOpen(true); } }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "12px 0", borderRadius: 12, fontWeight: 800, fontSize: 13.5, color: "white", width: "100%", border: "none", cursor: "pointer", fontFamily: "inherit", transition: "all .2s", ...(inPlanCart ? { background: "rgba(52,211,153,.15)", border: "1px solid rgba(52,211,153,.3)" } : p.highlight ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.5)", boxShadow: "0 0 20px rgba(168,85,247,.25)" } : { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }) }}
                      onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.opacity = ".85"; }}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                      <Icon name={inPlanCart ? "check" : "cart"} size={14} />
                      {inPlanCart ? "Ditambahkan" : p.cta}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
        <section id="contact" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px 112px" }}>
          <div data-reveal className="gborder" style={{ textAlign: "center", padding: "88px 40px", background: "rgba(168,85,247,.05)", borderRadius: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -100, left: -100, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.18) 0%,transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: -100, right: -100, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,.12) 0%,transparent 70%)" }} />
            <div style={{ position: "relative" }}>
              <Label text="Mulai Sekarang" center />
              <h2 style={{ fontSize: "clamp(28px,4vw,54px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "12px 0 16px" }}>
                Infrastruktur creator<br /><span className="gt">kamu sudah siap.</span>
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,.46)", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.78 }}>
                Buka Creator Panel untuk mengakses Audio Forge, License Manager, Donation System, dan lebih banyak lagi — semuanya dari satu ekosistem yang terhubung.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Btn href={PANEL_URL} primary style={{ padding: "16px 32px", borderRadius: 14, fontSize: 16 }} className="pulse">
                  Buka Creator Panel <Icon name="arrowRight" size={20} />
                </Btn>
                <Btn href={DISCORD_URL} style={{ padding: "16px 32px", borderRadius: 14, fontSize: 16 }}>
                  <Icon name="message" size={20} /> Gabung Komunitas
                </Btn>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "48px 24px 28px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* Top footer */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>

              {/* Brand */}
              <div>
                <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.03em", background: "linear-gradient(120deg,#a855f7,#e879f9,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "block", marginBottom: 10 }}>Hibob Studio</span>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", lineHeight: 1.7, maxWidth: 220 }}>Creator Infrastructure Platform untuk Roblox creator yang serius.</p>
                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer" style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(88,101,242,.1)", border: "1px solid rgba(88,101,242,.25)", fontSize: 12, fontWeight: 700, color: "#5865f2", textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(88,101,242,.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(88,101,242,.1)"}>Discord</a>
                  <a href={PANEL_URL} target="_blank" rel="noreferrer" style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(168,85,247,.1)", border: "1px solid rgba(168,85,247,.25)", fontSize: 12, fontWeight: 700, color: "#a855f7", textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(168,85,247,.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(168,85,247,.1)"}>Creator Panel</a>
                </div>
              </div>

              {/* Products */}
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Produk</p>
                {["Creator Panel", "Audio Forge", "License Manager", "Asset Manager", "Donation System"].map((item) => (
                  <a key={item} href={PANEL_URL} target="_blank" rel="noreferrer" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,.45)", textDecoration: "none", marginBottom: 9, fontWeight: 500, transition: "color .2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.45)"}>
                    {item}
                  </a>
                ))}
              </div>

              {/* Resources */}
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Komunitas</p>
                {[
                  { label: "Discord Server", href: DISCORD_URL },
                  { label: "Creator Panel", href: PANEL_URL },
                  { label: "Profil Roblox", href: ROBLOX_PROFILE_URL },
                ].map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,.45)", textDecoration: "none", marginBottom: 9, fontWeight: 500, transition: "color .2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.45)"}>
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Legal */}
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Legal</p>
                {[
                  { label: "Kebijakan Privasi", href: "#/privacy" },
                  { label: "Syarat Layanan", href: "#/terms" },
                  { label: "Kepatuhan Roblox", href: "#/roblox-compliance" },
                ].map((item) => (
                  <a key={item.label} href={item.href} style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,.45)", textDecoration: "none", marginBottom: 9, fontWeight: 500, transition: "color .2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.45)"}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom footer */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 22, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.22)", fontWeight: 500 }}>© 2026 Hibob Studio. Seluruh hak cipta dilindungi.</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.18)", fontWeight: 500 }}>Tidak berafiliasi dengan Roblox Corporation.</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Back to top */}
      <button onClick={() => { sfxClick(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Kembali ke atas"
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 99, width: 44, height: 44, borderRadius: 12, background: "rgba(168,85,247,.18)", border: "1px solid rgba(168,85,247,.35)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", transition: "all .3s cubic-bezier(.22,1,.36,1)", opacity: showTop ? 1 : 0, transform: showTop ? "translateY(0) scale(1)" : "translateY(12px) scale(.8)", pointerEvents: showTop ? "auto" : "none" }}
        onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.background = "rgba(168,85,247,.35)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(168,85,247,.18)"; }}>
        <Icon name="arrowUp" size={18} />
      </button>
    </div>
  );
}
