import { useEffect, useState, useCallback, useRef } from "react";
import avatarImg from "./assets/avatar.png";
import CheckoutPage from "./CheckoutPage";

const DISCORD_URL = "https://discord.gg/qzCdpasNhG";
const EMAIL_URL = "mailto:sulthan.zlfqr@gmail.com";
const ROBLOX_URL = "https://www.roblox.com/users/8949415735/profile";

const navItems = {
  id: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Products", href: "#products" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  en: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Products", href: "#products" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
};

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
  quote: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
};

const content = {
  id: {
    hero: { badge: "Full-Stack Roblox Developer", h1a: "Hai, Gua", h1b: "HibobTheDev.", h1c: "Gua Bikin Roblox", h1d: "Experiences.", sub: "2 tahun develop game Roblox bareng tim — custom Blender assets, OOP + Knit Framework, dan aftersales yang beneran aktif. Harga mid-range, hasil premium.", cta1: "Hire Me", cta2: "Lihat Projects" },
    why: { label: "Kenapa Gua?", h2a: "Bukan Sekadar", h2b: "Developer Biasa.", sub: "Gua gabungin craftsmanship, sistem yang solid, dan aftersales yang beneran ada — bukan cuma janji." },
    services: { label: "Services", h2a: "Apa yang Gua", h2b: "Bisa Bikin.", sub: "Full-stack Roblox development — dari map sampai sistem, dari GUI sampai launch." },
    projects: { label: "Projects", h2a: "Game yang", h2b: "Udah Gua Bikin.", sub: "Dikerjain bareng tim — gua, Anoj1ng, dan Naka. Dari map, sistem, sampai polish terakhir.", play: "Main Sekarang" },
    products: { label: "Products", h2a: "Ready-to-Use", h2b: "Roblox Systems.", sub: "Sistem siap pakai yang bisa langsung lu integrasi ke game lu. Dibeli sekali, update selamanya.", showcase: "Lihat Showcase", buy: "Beli Produk" },
    pricing: { label: "Commission Pricing", h2a: "Harga", h2b: "Transparan.", sub: "Mid-range price, premium quality. Semua bisa dinegosiasiin sesuai scope dan budget lu.", note: "* Semua harga bisa dinegosiasikan. Pembayaran via Robux juga tersedia.", startFrom: "mulai dari" },
    testimonials: { label: "Testimonials", h2a: "Kata", h2b: "Klien Gua.", sub: "Bukan sekadar review — ini feedback nyata dari orang-orang yang udah kerja bareng gua." },
    contact: { label: "Open for Commission", h2a: "Ada Project?", h2b: "Let's Work Together.", sub: "Reach out lewat Discord atau Email. Gua fast reply dan siap diskusi scope, timeline, sama budget.", cta1: "Discord — Paling Cepet", cta2: "Email" },
  },
  en: {
    hero: { badge: "Full-Stack Roblox Developer", h1a: "Hi, I'm", h1b: "HibobTheDev.", h1c: "I Build Roblox", h1d: "Experiences.", sub: "2 years developing Roblox games with my team — custom Blender assets, OOP + Knit Framework, and real active aftersales. Mid-range price, premium results.", cta1: "Hire Me", cta2: "View Projects" },
    why: { label: "Why Me?", h2a: "More Than Just", h2b: "A Developer.", sub: "I combine craftsmanship, solid systems, and real aftersales — not just promises." },
    services: { label: "Services", h2a: "What I", h2b: "Can Build.", sub: "Full-stack Roblox development — from maps and systems to GUI and launch polish." },
    projects: { label: "Projects", h2a: "Games I've", h2b: "Built.", sub: "From solo projects to team collabs — building, scripting, GUI, all the way to launch.", play: "Play Now" },
    products: { label: "Products", h2a: "Ready-to-Use", h2b: "Roblox Systems.", sub: "Plug-and-play systems you can integrate directly into your game. Buy once, update forever.", showcase: "View Showcase", buy: "Buy Product" },
    pricing: { label: "Commission Pricing", h2a: "Transparent", h2b: "Pricing.", sub: "Mid-range price, premium quality. Everything is negotiable based on your scope and budget.", note: "* All prices are negotiable. Robux payment is also available.", startFrom: "starting from" },
    testimonials: { label: "Testimonials", h2a: "What Clients", h2b: "Say.", sub: "Not just reviews — real feedback from people who've worked with me." },
    contact: { label: "Open for Commission", h2a: "Have a Project?", h2b: "Let's Work Together.", sub: "Reach out via Discord or Email. I reply fast and I'm ready to discuss scope, timeline, and budget.", cta1: "Discord — Fastest", cta2: "Email" },
  },
};

const projects = [
  { title: "Mount Aetheria", category: "Adventure / Mountain", roles: ["Scripting","GUI","Building"], desc: { id: "Premium mountain experience dengan atmospheric route design, smooth progression, dan polished journey dari spawn ke summit.", en: "Premium mountain experience with atmospheric route design, smooth progression, and a polished journey from spawn to summit." }, url: "https://www.roblox.com/games/114127426604041/MOUNT-AETHERIA-V3", badge: "MA", year: "2024" },
  { title: "Mount Elythera", category: "Exploration", roles: ["Full Handle"], desc: { id: "Scenic climbing world dengan immersive terrain dari Blender dan clean exploration flow yang enak dimainin.", en: "Scenic climbing world with immersive Blender terrain and a clean exploration flow." }, url: "https://www.roblox.com/games/102754646900067/Mount-Elythera", badge: "ME", year: "2024" },
  { title: "Mount Perseus", category: "Adventure Systems", roles: ["Full Handle"], desc: { id: "Mountain project dengan OOP architecture, gameplay systems terstruktur, dan interface yang polished.", en: "Mountain project with OOP architecture, structured gameplay systems, and a polished interface." }, url: "https://www.roblox.com/games/70976156417927/Mount-Perseus", badge: "MP", year: "2024" },
  { title: "Mount Exodus", category: "Adventure / Mountain", roles: ["Full Handle"], desc: { id: "Mountain experience dengan full development dari building sampai sistem dan polish akhir.", en: "Mountain experience with full development from building to systems and final polish." }, url: "https://www.roblox.com/games/93648214389456/Mount-Exodus", badge: "MX", year: "2024" },
  { title: "Pulau Cerdas Cermat", category: "Educational", roles: ["Scripting","Building"], desc: { id: "Educational experience dengan quiz interactions dan player-friendly pacing yang smooth.", en: "Educational experience with quiz interactions and smooth player-friendly pacing." }, url: "https://www.roblox.com/games/115372750478468/Pulau-Cerdas-Cermat", badge: "PCC", year: "2025" },
  { title: "Mutual Space Club", category: "Social / Hangout", roles: ["Full Handle"], desc: { id: "Social space dengan custom assets eksklusif, visual identity kuat, dan atmosphere yang nyaman buat hangout.", en: "Social space with exclusive custom assets, strong visual identity, and a comfortable hangout atmosphere." }, url: "https://www.roblox.com/games/121781236784127/Mutual-Space-Club", badge: "MSC", year: "2025" },
  { title: "Podblox ID", category: "Social / Hangout", roles: ["Building"], desc: { id: "Social experience dengan custom building yang detail dan environment yang immersive.", en: "Social experience with detailed custom building and an immersive environment." }, url: "https://www.roblox.com/games/127647754933864/PODBLOX-ID", badge: "PB", year: "2025" },
  { title: "Frost Reaper Club", category: "Club / Social", roles: ["Scripting","GUI"], desc: { id: "Club map dengan sistem scripting yang solid dan GUI yang clean dan interaktif.", en: "Club map with solid scripting systems and a clean, interactive GUI." }, url: "https://www.roblox.com/games/116765847157533/NEW-FROST-REAPER-CLUB", badge: "FR", year: "2025" },
  { title: "Escape from Robby", category: "Horror / Escape", roles: ["Full Handle"], desc: { id: "Horror escape experience dengan full development — building, scripting, dan GUI dari awal sampai launch.", en: "Horror escape experience with full development — building, scripting, and GUI from start to launch." }, url: "https://www.roblox.com/games/117308005555854/Escape-from-Robby", badge: "ER", year: "2025" },
];

const products = [
  { id: "club-kit", name: "Hibob Club Kit", tag: "Full System", icon: "box", price: { id: "Rp1.000.000 / R$20.000", en: "IDR 1,000,000 / R$20,000" }, update: { id: "Free updates selamanya!", en: "Free updates forever!" }, desc: { id: "Sistem manajemen club Roblox yang lengkap dan terintegrasi. Dirancang buat komunitas yang butuh operasional profesional, efisien, dan realtime.", en: "A complete, integrated club management system for Roblox. Designed for communities that need professional, efficient, and real-time operations." }, features: ["Centralized Admin Panel","Role & Permission System","NameTag & Title System","VIP / VVIP Shop Integration","Dance, Sync & Carry System","Donation System","Leaderboard System","Leveling & Progression","Realtime Sync System","Knit Framework Architecture"], showcase: "https://www.tiktok.com/@hibobbb67/video/7638638271001595143", highlight: true },
  { id: "music-system", name: "Hibob Music System", tag: "Audio System", icon: "music", price: { id: "Rp300.000 / R$6.000", en: "IDR 300,000 / R$6,000" }, update: { id: "Launch price — harga naik sebentar lagi!", en: "Launch price — going up soon!" }, desc: { id: "Solusi audio management profesional buat Roblox Club Map lu. Dibangun untuk sinkronisasi sempurna, interaktivitas tinggi, dan sound processing yang advanced.", en: "A professional-grade audio management solution for your Roblox Club Map. Built for perfect sync, high interactivity, and advanced sound processing." }, features: ["Full Server Sync — realtime audio sync","Smart Playback — Auto Queue & Request System","Playlist grouping + Smart Search UI","Players can add songs via Asset ID","MusicZones — area-based sound","Crossfade, EQ, Reverb, Compressor","DJ Mode — authorized-only control","Script obfuscation for asset security","Whitelist via Roblox & Discord (Parcel)","Dedicated Discord support"], showcase: "https://www.tiktok.com/@hibobbb67/video/7629686621918498055", highlight: false },
];

const services = [
  { icon: "hammer", title: { id: "World Building", en: "World Building" }, desc: { id: "Custom map dan environment dari basepart dan Blender — bukan aset instan. Tiap elemen dirancang untuk immersion dan optimasi.", en: "Custom maps and environments built from baseparts and Blender — no instant assets. Every element crafted for immersion and optimization." }, tag: "Eksklusif" },
  { icon: "code", title: { id: "Luau Scripting", en: "Luau Scripting" }, desc: { id: "Sistem terstruktur pakai OOP dan Knit Framework. Clean, modular, dan scalable untuk game kecil hingga besar.", en: "Structured systems using OOP and Knit Framework. Clean, modular, and scalable for any game size." }, tag: "OOP + Framework" },
  { icon: "paint", title: { id: "GUI & UI Design", en: "GUI & UI Design" }, desc: { id: "Responsive HUDs, menu, dan onboarding screens dengan visual hierarchy yang clean dan interaksi yang smooth.", en: "Responsive HUDs, menus, and onboarding screens with clean visual hierarchy and smooth interactions." }, tag: "Polished" },
];

const whyMe = [
  { icon: "box", title: { id: "Assets Fleksibel", en: "Flexible Assets" }, desc: { id: "Asset disesuaikan sama scope dan budget lu — bisa custom Blender, basepart manual, atau marketplace. Yang penting hasilnya maksimal.", en: "Assets are tailored to your scope and budget — custom Blender, manual baseparts, or marketplace. What matters is the result." } },
  { icon: "cpu", title: { id: "OOP + Knit Framework", en: "OOP + Knit Framework" }, desc: { id: "Scripting pakai OOP dan Knit Framework. Kode bersih, modular, dan gampang di-maintain jangka panjang.", en: "Scripting with OOP and Knit Framework. Clean, modular code that's easy to maintain long-term." } },
  { icon: "shield", title: { id: "Aftersales Aktif", en: "Active Aftersales" }, desc: { id: "Puluhan klien udah tim gua handle, termasuk bug fix dan revisi minor post-launch yang masuk dalam setiap project.", en: "Dozens of clients handled by our team, including bug fixes and minor post-launch revisions included in every project." } },
  { icon: "users", title: { id: "Tim yang Solid", en: "Solid Team" }, desc: { id: "Gua kerja bareng Anoj1ng dan Naka. Project besar/medium dikerjain bareng, project kecil bisa solo — fleksibel sesuai kebutuhan.", en: "I work alongside Anoj1ng and Naka. Medium/large projects are team efforts, smaller ones can go solo — flexible to your needs." } },
  { icon: "zap", title: { id: "Harga Mid-Range, Hasil Premium", en: "Mid-Range Price, Premium Results" }, desc: { id: "Hasil setara developer profesional dengan harga yang masuk akal. Selalu ada ruang negosiasi.", en: "Professional-level results at a reasonable price. Negotiation is always welcome." } },
  { icon: "layers", title: { id: "Full-Stack Delivery", en: "Full-Stack Delivery" }, desc: { id: "Dari konsep sampai launch — building, scripting, GUI, dan polish dikerjain bareng tim dalam satu workflow yang solid.", en: "From concept to launch — building, scripting, GUI, and polish handled by our team in one solid workflow." } },
];

const pricing = [
  { name: { id: "GUI Design", en: "GUI Design" }, price: "500rb", desc: { id: "Interface yang polished dan responsive.", en: "Polished and responsive interface design." }, features: { id: ["HUD & Menu design","Onboarding screens","Visual hierarchy","Smooth animations","1x revisi gratis"], en: ["HUD & Menu design","Onboarding screens","Visual hierarchy","Smooth animations","1 free revision"] }, highlight: false, cta: { id: "Diskusi Project", en: "Discuss Project" } },
  { name: { id: "Scripting / Building", en: "Scripting / Building" }, price: "1.5jt", desc: { id: "Sistem terstruktur atau world building eksklusif.", en: "Structured systems or exclusive world building." }, features: { id: ["OOP + Knit Framework","Assets menyesuaikan budget","Optimized performance","Clean & modular code","Aftersales support","2x revisi gratis"], en: ["OOP + Knit Framework","Assets menyesuaikan budget","Optimized performance","Clean & modular code","Aftersales support","2 free revisions"] }, highlight: true, cta: { id: "Diskusi Project", en: "Discuss Project" } },
  { name: { id: "Full Game Dev", en: "Full Game Dev" }, price: "Custom", desc: { id: "End-to-end development dari konsep sampai launch.", en: "End-to-end development from concept to launch." }, features: { id: ["Building + Scripting + GUI","Game design consultation","Full OOP architecture","Launch support","Aftersales aktif","Revisi minor unlimited"], en: ["Building + Scripting + GUI","Game design consultation","Full OOP architecture","Launch support","Active aftersales","Unlimited minor revisions"] }, highlight: false, cta: { id: "Hubungi Dulu", en: "Get in Touch" } },
];

const testimonials = [
  { name: "Maxxx Salvatore", role: { id: "Roblox Creator — Indonesia", en: "Roblox Creator — Indonesia" }, quote: { id: "Kerjaan Hibob rapi dan sistematis. Build-nya eksklusif, kode-nya bersih, dan aftersales-nya aktif.", en: "Hibob's work is clean and systematic. Exclusive builds, clean code, and active aftersales." } },
  { name: "Anonymous Client", role: { id: "Game Owner", en: "Game Owner" }, quote: { id: "Puas sama hasilnya. Komunikasi lancar dan deliver tepat waktu.", en: "Satisfied with the results. Smooth communication and on-time delivery." } },
  { name: "Anonymous Client", role: { id: "Indie Developer", en: "Indie Developer" }, quote: { id: "GUI dan scripting-nya seamless. Gua rekomendasiin ke siapapun yang butuh developer Roblox yang serius.", en: "The GUI and scripting are seamless. I'd recommend Hibob to anyone looking for a serious Roblox developer." } },
];

const stats = [
  { value: "30+", label: { id: "Klien Terlayani", en: "Clients Served" } },
  { value: "2+", label: { id: "Tahun Experience", en: "Years Experience" } },
  { value: "100%", label: { id: "Client Satisfied", en: "Client Satisfied" } },
];

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

function Counter({ value }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  useEffect(() => {
    const num = parseFloat(value);
    const suffix = value.replace(/[\d.]/g, "");
    if (isNaN(num)) { setDisplay(value); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const dur = 1400, start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setDisplay(`${Math.round(ease * num)}${suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{display}</span>;
}

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

function Btn({ href, children, primary = false, onClick, style: extraStyle = {} }) {
  return (
    <a href={href} onClick={onClick} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 26px", borderRadius: 12, fontWeight: 800, fontSize: 14, color: "white", textDecoration: "none", cursor: "pointer", transition: "all .22s cubic-bezier(.22,1,.36,1)", ...(primary ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.5)", boxShadow: "0 0 24px rgba(168,85,247,.3)" } : { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)" }), ...extraStyle }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = ".85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
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

function MobileMenu({ isOpen, active, onClose, nav }) {
  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: isOpen ? "auto" : "none", opacity: isOpen ? 1 : 0, transition: "opacity .4s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(24px)", background: "rgba(7,3,22,.97)" }} />
      <nav style={{ position: "relative", display: "flex", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
        {nav.map((item, i) => {
          const id = item.href.replace("#", "");
          const isActive = active === id;
          return (
            <a key={item.href} href={item.href}
              onClick={(e) => { scrollTo(e, item.href); onClose(); }}
              style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.04em", textDecoration: "none", transition: `all .5s cubic-bezier(.22,1,.36,1) ${i * 50}ms`, transform: isOpen ? "translateY(0)" : "translateY(20px)", opacity: isOpen ? 1 : 0, ...(isActive ? { background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "rgba(255,255,255,.55)" }) }}>
              {item.label}
            </a>
          );
        })}
        <div style={{ display: "flex", gap: 10, marginTop: 20, transition: `all .5s cubic-bezier(.22,1,.36,1) 280ms`, transform: isOpen ? "translateY(0)" : "translateY(20px)", opacity: isOpen ? 1 : 0 }}>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 20px", borderRadius: 12, fontWeight: 800, fontSize: 14, color: "white", textDecoration: "none", background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.4)" }}>
            <Icon name="message" size={16} /> Discord
          </a>
          <a href={EMAIL_URL} onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 20px", borderRadius: 12, fontWeight: 800, fontSize: 14, color: "white", textDecoration: "none", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>
            <Icon name="mail" size={16} /> Email
          </a>
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  const progress = useScrollProgress();
  const activeSection = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [lang, setLang] = useState("en");
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  useReveal();

  useEffect(() => {
    const fn = () => { setShowTop(window.scrollY > 500); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const c = content[lang];
  const nav = navItems[lang];

  if (checkoutProduct) {
    return <CheckoutPage product={checkoutProduct} onBack={() => setCheckoutProduct(null)} />;
  }

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
        @keyframes float { 0%,100%{transform:translateY(0) rotate(-.3deg)} 50%{transform:translateY(-18px) rotate(.3deg)} }
        @keyframes glow-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#03010f} ::-webkit-scrollbar-thumb{background:linear-gradient(#a855f7,#38bdf8);border-radius:99px}
        ::selection{background:rgba(168,85,247,.35)}
        .nav-link:hover{color:white!important;background:rgba(255,255,255,.06)!important}
        .lang-btn:hover{background:rgba(168,85,247,.2)!important;color:white!important}
        @media(max-width:768px){ .hero-grid{grid-template-columns:1fr!important} .hero-right{display:none!important} .why-grid{grid-template-columns:1fr!important} .pricing-grid{grid-template-columns:1fr!important} .products-grid{grid-template-columns:1fr!important} .hide-mob{display:none!important} .show-mob{display:flex!important} }
        @media(min-width:769px){.show-mob{display:none!important}}
        @media(prefers-reduced-motion:reduce){ *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important} [data-reveal]{opacity:1!important;transform:none!important;filter:none!important} }
      `}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 8% 0%,rgba(110,35,190,.22) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 95% 15%,rgba(14,100,190,.12) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 50% at 50% 100%,rgba(90,25,170,.12) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <MobileMenu isOpen={menuOpen} active={activeSection} onClose={() => setMenuOpen(false)} nav={nav} />

      <div style={{ position: "relative", zIndex: 1, animation: "fadeIn .6s ease both", paddingTop: 66 }}>

        {/* HEADER — always visible */}
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,.06)", backdropFilter: "blur(20px)", background: "rgba(3,1,15,.55)" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: `${progress * 100}%`, background: "linear-gradient(90deg,#a855f7,#e879f9,#38bdf8)", transition: "width .1s linear", borderRadius: "0 2px 2px 0" }} />
          <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
            <a href="#home" onClick={(e) => scrollTo(e, "#home")} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", transition: "opacity .2s" }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = ".8"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
              <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.03em", background: "linear-gradient(120deg,#a855f7,#e879f9,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>HibobTheDev</span>
            </a>
            <div className="hide-mob" style={{ display: "flex", alignItems: "center", gap: 2, padding: 5, borderRadius: 999, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
              {nav.map((item) => {
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
              <button onClick={() => setLang(l => l === "id" ? "en" : "id")} className="lang-btn"
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 13px", borderRadius: 999, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.6)", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .2s", letterSpacing: ".06em" }}>
                <Icon name="globe" size={13} /> {lang === "id" ? "EN" : "ID"}
              </button>
              <Btn href={DISCORD_URL} primary className="hide-mob pulse" style={{ padding: "9px 20px", borderRadius: 999, fontSize: 13 }}>
                Hire Me
              </Btn>
              <button onClick={() => setMenuOpen((v) => !v)} className="show-mob"
                style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, width: 42, height: 42, alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer", transition: "all .2s" }}>
                <Icon name={menuOpen ? "x" : "menu"} size={20} />
              </button>
            </div>
          </nav>
        </header>

        {/* HERO */}
        <section id="home" className="hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, alignItems: "stretch", minHeight: "calc(100vh - 66px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, padding: "90px 0 110px" }}>
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(168,85,247,.32)", background: "rgba(168,85,247,.09)", width: "fit-content" }}>
              <Icon name="star" size={12} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#c084fc", letterSpacing: ".07em", textTransform: "uppercase" }}>{c.hero.badge}</span>
            </div>
            <div data-reveal data-d="1">
              <h1 style={{ fontSize: "clamp(44px,6vw,82px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.04em" }}>
                {c.hero.h1a} <span className="gt">{c.hero.h1b}</span><br />
                {c.hero.h1c}<br />
                <span className="gt">{c.hero.h1d}</span>
              </h1>
            </div>
            <p data-reveal data-d="2" style={{ fontSize: 17, color: "rgba(255,255,255,.5)", lineHeight: 1.78, maxWidth: 500, fontWeight: 400 }}>{c.hero.sub}</p>
            <div data-reveal data-d="3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn href="#contact" primary onClick={(e) => scrollTo(e, "#contact")} style={{ padding: "14px 28px" }}>
                {c.hero.cta1} <Icon name="arrowRight" size={17} />
              </Btn>
              <Btn href="#projects" onClick={(e) => scrollTo(e, "#projects")} style={{ padding: "14px 28px" }}>{c.hero.cta2}</Btn>
              <Btn href={ROBLOX_URL} style={{ padding: "14px 18px", borderRadius: 12 }} title="Roblox Profile">
                <Icon name="globe" size={17} />
              </Btn>
            </div>
          </div>

          <div className="hero-right" data-reveal data-d="2" style={{ position: "relative", alignSelf: "stretch", minHeight: 560, overflow: "visible" }}>

            {/* glow under character */}
            <div style={{ position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(140,60,255,.38) 0%,rgba(80,0,200,.15) 45%,transparent 70%)", filter: "blur(56px)", animation: "glow-pulse 4s ease-in-out infinite", zIndex: 0 }} />

            {/* character */}
            <img
              src={avatarImg}
              alt="HibobTheDev"
              style={{
                position: "absolute",
                bottom: 1,
                left: "18%",
                transform: "translateX(-50%)",
                height: "min(900px, calc(100% - 40px))",
                width: "auto",
                maxWidth: "none",
                objectFit: "contain",
                objectPosition: "bottom center",
                zIndex: 2,
                filter: "drop-shadow(0 0 50px rgba(168,85,247,.55)) drop-shadow(0 30px 50px rgba(0,0,0,.8))",
                animation: "float 5.5s ease-in-out infinite",
                imageRendering: "auto",
              }}
            />

            {/* stats bar */}
            <div style={{ position: "absolute", bottom: 250, left: "18%", right: 0, zIndex: 4, background: "rgba(8,5,28,.82)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 18, padding: "18px 0", backdropFilter: "blur(24px)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", boxShadow: "0 8px 40px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.06)" }}>
              {stats.map((s, i) => (
                <div key={i} style={{ textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,.08)" : "none", padding: "0 10px" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.32)", fontWeight: 600, marginBottom: 5, letterSpacing: ".07em", textTransform: "uppercase" }}>{s.label[lang]}</div>
                  <div className="gt" style={{ fontSize: 21, fontWeight: 900 }}><Counter value={s.value} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ paddingTop: 96 }}><Divider /></div>

        {/* WHY ME */}
        <section id="about" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text={c.why.label} />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>{c.why.h2a} <span className="gt">{c.why.h2b}</span></h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>{c.why.sub}</p>
          </div>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {whyMe.map((w, i) => (
              <Card key={i} style={{ padding: 26 }}>
                <div data-reveal data-d={`${(i % 3) + 1}`}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: "#a855f7" }}><Icon name={w.icon} size={20} /></div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{w.title[lang]}</h3>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.46)", lineHeight: 1.75 }}>{w.desc[lang]}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* SERVICES */}
        <section id="services" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text={c.services.label} />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>{c.services.h2a} <span className="gt">{c.services.h2b}</span></h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>{c.services.sub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
            {services.map((s, i) => (
              <Card key={i} style={{ padding: 28 }}>
                <div data-reveal data-d={`${i + 1}`}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a855f7" }}><Icon name={s.icon} size={20} /></div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,.08)", border: "1px solid rgba(56,189,248,.18)", color: "#38bdf8", letterSpacing: ".06em" }}>{s.tag}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 9 }}>{s.title[lang]}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.46)", lineHeight: 1.78 }}>{s.desc[lang]}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* PROJECTS */}
        <section id="projects" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text={c.projects.label} />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>{c.projects.h2a} <span className="gt">{c.projects.h2b}</span></h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>{c.projects.sub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
            {projects.map((p, i) => (
              <Card key={i} style={{ overflow: "hidden" }}>
                <div data-reveal data-d={`${(i % 4) + 1}`}>
                  <div style={{ padding: "22px 22px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(168,85,247,.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: "#a855f7", textTransform: "uppercase" }}>{p.category}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)", fontWeight: 500 }}>{p.year}</span>
                        <span style={{ fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 999, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.25)", color: "#c084fc" }}>{p.badge}</span>
                      </div>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{p.title}</h3>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {p.roles.map((r, ri) => (
                        <span key={ri} style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: r === "Full Handle" ? "rgba(56,189,248,.1)" : "rgba(168,85,247,.1)", border: r === "Full Handle" ? "1px solid rgba(56,189,248,.25)" : "1px solid rgba(168,85,247,.2)", color: r === "Full Handle" ? "#38bdf8" : "#c084fc", letterSpacing: ".05em", textTransform: "uppercase" }}>{r}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: "16px 22px 22px" }}>
                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.46)", lineHeight: 1.78, marginBottom: 18 }}>{p.desc[lang]}</p>
                    <a href={p.url} target="_blank" rel="noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, fontWeight: 700, fontSize: 13.5, color: "white", textDecoration: "none", background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.4)", transition: "all .2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 20px rgba(168,85,247,.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}>
                      {c.projects.play} <Icon name="arrowRight" size={14} />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* PRODUCTS */}
        <section id="products" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text={c.products.label} />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>{c.products.h2a} <span className="gt">{c.products.h2b}</span></h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>{c.products.sub}</p>
          </div>
          <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {products.map((prod, i) => (
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
                      <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>{prod.name}</h3>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 18, fontWeight: 900, ...(prod.highlight ? { background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "white" }) }}>{prod.price[lang]}</div>
                      <div style={{ fontSize: 11, color: prod.highlight ? "#a855f7" : "rgba(255,255,255,.4)", fontWeight: 600, marginTop: 4 }}>{prod.update[lang]}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.48)", lineHeight: 1.78, marginBottom: 20 }}>{prod.desc[lang]}</p>
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
                    <a href={prod.showcase} target="_blank" rel="noreferrer"
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 0", borderRadius: 11, fontWeight: 700, fontSize: 13.5, color: "white", textDecoration: "none", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", transition: "all .2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,.06)"}>
                      <Icon name="play" size={14} /> {c.products.showcase}
                    </a>
                    <button onClick={() => setCheckoutProduct({ name: prod.name, price: prod.price[lang], hasRobux: true })}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 0", borderRadius: 11, fontWeight: 700, fontSize: 13.5, color: "white", textDecoration: "none", background: prod.highlight ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(168,85,247,.15)", border: prod.highlight ? "1px solid rgba(168,85,247,.5)" : "1px solid rgba(168,85,247,.3)", transition: "all .2s", cursor: "pointer", fontFamily: "inherit" }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = ".85"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                      <Icon name="message" size={14} /> {c.products.buy}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* PRICING */}
        <section id="pricing" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text={c.pricing.label} />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>{c.pricing.h2a} <span className="gt">{c.pricing.h2b}</span></h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>{c.pricing.sub}</p>
          </div>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "start" }}>
            {pricing.map((p, i) => (
              <div key={i} data-reveal data-d={`${i + 1}`}
                style={{ position: "relative", background: p.highlight ? "rgba(168,85,247,.08)" : "rgba(255,255,255,.03)", border: p.highlight ? "1px solid rgba(168,85,247,.45)" : "1px solid rgba(255,255,255,.07)", borderRadius: 22, padding: "28px 24px", transition: "transform .3s cubic-bezier(.22,1,.36,1)" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                {p.highlight && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", padding: "5px 16px", borderRadius: 999, background: "linear-gradient(135deg,#7c3aed,#a855f7)", fontSize: 10, fontWeight: 800, color: "white", letterSpacing: ".08em", whiteSpace: "nowrap" }}>MOST POPULAR</div>}
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>{p.name[lang]}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 900, ...(p.highlight ? { background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "white" }) }}>
                    {p.price === "Custom" ? "Custom" : `Rp${p.price}`}
                  </span>
                  {p.price !== "Custom" && <span style={{ fontSize: 12, color: "rgba(255,255,255,.3)", fontWeight: 600 }}>{c.pricing.startFrom}</span>}
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.7, marginBottom: 20, minHeight: 40 }}>{p.desc[lang]}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {p.features[lang].map((f, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 17, height: 17, borderRadius: 6, background: "rgba(168,85,247,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#a855f7" }}><Icon name="check" size={10} /></div>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)", fontWeight: 500 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={DISCORD_URL} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "12px 0", borderRadius: 12, fontWeight: 800, fontSize: 13.5, color: "white", textDecoration: "none", width: "100%", transition: "all .2s", ...(p.highlight ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.5)", boxShadow: "0 0 20px rgba(168,85,247,.25)" } : { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }) }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = ".85"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                  {p.cta[lang]} <Icon name="arrowRight" size={14} />
                </a>
              </div>
            ))}
          </div>
          <p data-reveal style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "rgba(255,255,255,.3)", fontWeight: 500 }}>{c.pricing.note}</p>
        </section>

        <Divider />

        {/* TESTIMONIALS */}
        <section id="testimonials" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text={c.testimonials.label} />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>{c.testimonials.h2a} <span className="gt">{c.testimonials.h2b}</span></h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>{c.testimonials.sub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
            {testimonials.map((t, i) => (
              <Card key={i} style={{ padding: 26 }}>
                <div data-reveal data-d={`${i + 1}`}>
                  <div style={{ color: "rgba(168,85,247,.45)", marginBottom: 14 }}><Icon name="quote" size={26} /></div>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>"{t.quote[lang]}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#a855f7,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "white", flexShrink: 0 }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 800 }}>{t.name}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,.36)", fontWeight: 500, marginTop: 2 }}>{t.role[lang]}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* CONTACT */}
        <section id="contact" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px 112px" }}>
          <div data-reveal className="gborder" style={{ textAlign: "center", padding: "88px 40px", background: "rgba(168,85,247,.05)", borderRadius: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -100, left: -100, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.18) 0%,transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: -100, right: -100, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,.12) 0%,transparent 70%)" }} />
            <div style={{ position: "relative" }}>
              <Label text={c.contact.label} center />
              <h2 style={{ fontSize: "clamp(28px,4vw,54px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "12px 0 16px" }}>{c.contact.h2a}<br /><span className="gt">{c.contact.h2b}</span></h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,.46)", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.78 }}>{c.contact.sub}</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Btn href={DISCORD_URL} primary style={{ padding: "16px 32px", borderRadius: 14, fontSize: 16 }} className="pulse">
                  <Icon name="message" size={20} /> {c.contact.cta1}
                </Btn>
                <Btn href={EMAIL_URL} style={{ padding: "16px 32px", borderRadius: 14, fontSize: 16 }}>
                  <Icon name="mail" size={20} /> {c.contact.cta2}
                </Btn>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "26px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 900, letterSpacing: "-0.03em", background: "linear-gradient(120deg,#a855f7,#e879f9,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>HibobTheDev</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.25)", fontWeight: 500 }}>© 2026 HibobTheDev</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {[{ label: "Discord", href: DISCORD_URL }, { label: "Roblox", href: ROBLOX_URL }, { label: "Email", href: EMAIL_URL }].map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  style={{ fontSize: 13, color: "rgba(255,255,255,.28)", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.28)"}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 99, width: 44, height: 44, borderRadius: 12, background: "rgba(168,85,247,.18)", border: "1px solid rgba(168,85,247,.35)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", transition: "all .3s cubic-bezier(.22,1,.36,1)", opacity: showTop ? 1 : 0, transform: showTop ? "translateY(0) scale(1)" : "translateY(12px) scale(.8)", pointerEvents: showTop ? "auto" : "none" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(168,85,247,.35)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(168,85,247,.18)"; }}>
        <Icon name="arrowUp" size={18} />
      </button>
    </div>
  );
}