import { useEffect, useState, useCallback, useRef } from "react";
import avatarImg from "./assets/avatar.png";
import hibobLogo from "./assets/HIBOB LOGO.svg";

const DISCORD_URL = "https://discord.gg/5rQsxcX4";
const EMAIL_URL = "mailto:sulthan.zlfqr@gmail.com";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

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
  cpu: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 1 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18",
  layers: "M12 2 2 7l10 5 10-5-10-5ZM2 12l10 5 10-5M2 17l10 5 10-5",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  zap: "M13 2L3 14h8l-1 8 11-14h-8l1-6Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  quote: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
};

const projects = [
  { title: "Mount Aetheria", category: "Adventure / Mountain", description: "Premium mountain climbing experience dengan atmospheric route design, smooth player progression, dan polished journey dari spawn ke summit.", url: "https://www.roblox.com/games/114127426604041/MOUNT-AETHERIA-V3", badge: "MA", year: "2024" },
  { title: "Mount Elythera", category: "Exploration", description: "Scenic climbing world dibangun di atas readable level direction, immersive terrain dari Blender, dan clean exploration flow.", url: "https://www.roblox.com/games/102754646900067/Mount-Elythera", badge: "ME", year: "2024" },
  { title: "Mount Perseus", category: "Adventure Systems", description: "Mountain project yang combine gameplay systems terstruktur, OOP architecture, dan interface polish untuk player journey yang engaging.", url: "https://www.roblox.com/games/70976156417927/Mount-Perseus", badge: "MP", year: "2024" },
  { title: "Pulau Cerdas Cermat", category: "Educational", description: "Educational Roblox experience dengan quiz interactions, accessible learning design, dan player-friendly pacing yang smooth.", url: "https://www.roblox.com/games/115372750478468/Pulau-Cerdas-Cermat", badge: "PCC", year: "2025" },
  { title: "Mutual Space Club", category: "Social / Hangout", description: "Community-focused social space dengan custom assets eksklusif, visual identity yang kuat, dan comfortable atmosphere.", url: "https://www.roblox.com/games/121781236784127/Mutual-Space-Club", badge: "MSC", year: "2025" },
];

const services = [
  { icon: "hammer", title: "World Building", desc: "Custom map & environment dibangun dari basepart dan Blender — bukan aset instan. Setiap elemen dirancang untuk immersion dan optimasi.", tag: "Eksklusif" },
  { icon: "code", title: "Luau Scripting", desc: "Sistem terstruktur menggunakan OOP dan Knit Framework. Clean, modular, dan scalable untuk game kecil hingga besar.", tag: "OOP + Framework" },
  { icon: "paint", title: "GUI & UI Design", desc: "Responsive HUDs, menus, dan onboarding screens dengan visual hierarchy yang clean dan smooth interaction.", tag: "Polished" },
];

const whyMe = [
  { icon: "box", title: "Custom Assets dari Blender", desc: "Semua aset dibuat manual dari basepart dan Blender. Tidak ada aset pasaran — setiap build 100% eksklusif untuk klien." },
  { icon: "cpu", title: "OOP + Knit Framework", desc: "Scripting menggunakan metodologi Object-Oriented Programming dan Knit Framework. Kode bersih, modular, dan mudah di-maintain jangka panjang." },
  { icon: "shield", title: "Aftersales Terbukti", desc: "Puluhan klien terlayani dengan aftersales aktif. Bug fix, revisi minor, dan support post-launch termasuk dalam setiap project." },
  { icon: "users", title: "Klien Notable", desc: "Dipercaya oleh nama-nama besar di skena Roblox Indonesia, termasuk Maxxx Salvatore — salah satu kreator terkemuka di komunitas." },
  { icon: "zap", title: "Harga Mid-Range, Kualitas Premium", desc: "Hasil setara studio besar dengan harga yang masuk akal. Selalu ada ruang negosiasi sesuai scope dan budget klien." },
  { icon: "layers", title: "Full-Stack Delivery", desc: "Dari konsep hingga launch — building, scripting, GUI, dan polish dikerjakan dalam satu workflow yang terintegrasi." },
];

const pricing = [
  {
    name: "GUI Design",
    price: "500rb",
    currency: "IDR",
    desc: "Desain interface yang polished dan responsive.",
    features: ["HUD & Menu design", "Onboarding screens", "Visual hierarchy", "Smooth animations", "1x revisi gratis"],
    highlight: false,
    cta: "Diskusi Project",
  },
  {
    name: "Scripting / Building",
    price: "1.5jt",
    currency: "IDR",
    desc: "Sistem terstruktur atau world building eksklusif.",
    features: ["OOP + Knit Framework", "Custom Blender assets", "Optimized performance", "Clean & modular code", "Aftersales support", "2x revisi gratis"],
    highlight: true,
    cta: "Diskusi Project",
  },
  {
    name: "Full Game Dev",
    price: "Custom",
    currency: "",
    desc: "End-to-end development dari konsep sampai launch.",
    features: ["Building + Scripting + GUI", "Game design consultation", "Full OOP architecture", "Launch support", "Aftersales aktif", "Unlimited revisi minor"],
    highlight: false,
    cta: "Hubungi Dulu",
  },
];

const testimonials = [
  { name: "Maxxx Salvatore", role: "Roblox Creator — Skena Indonesia", quote: "Kualitas build dan scripting HibobTheDev beda level. Custom assets-nya eksklusif, sistem-nya rapi, dan aftersales-nya aktif." },
  { name: "Anonymous Client", role: "Game Owner", quote: "Harga mid-range tapi hasilnya premium. Komunikasi lancar, deliver tepat waktu, dan mau revisi tanpa drama." },
  { name: "Anonymous Client", role: "Indie Developer", quote: "Gua pake Hibob buat GUI dan scripting sekaligus. Hasilnya seamless dan polished banget. Recommended!" },
];

const stats = [
  { value: "30+", label: "Klien Terlayani" },
  { value: "2-4", label: "Tahun Experience" },
  { value: "100%", label: "Custom Assets" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.25, rootMargin: "-15% 0px -50% 0px" }
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
      { threshold: 0.07, rootMargin: "0px 0px -4% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-5px)`;
      el.style.borderColor = "rgba(168,85,247,0.4)";
    };
    const onLeave = () => { el.style.transform = "none"; el.style.borderColor = "rgba(255,255,255,0.07)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [ref]);
}

function useMagnetic(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.22;
      el.style.transform = `translate(${x}px,${y}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [ref]);
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  );
}

function Divider() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(168,85,247,0.35),rgba(56,189,248,0.3),transparent)" }} />
    </div>
  );
}

function Label({ text, center = false, color = "#a855f7" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: center ? "center" : "flex-start" }}>
      <div style={{ width: 24, height: 2, background: `linear-gradient(90deg,${color},transparent)`, borderRadius: 2 }} />
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color, textTransform: "uppercase" }}>{text}</p>
    </div>
  );
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

function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const fn = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", fn);
    const tick = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      if (ref.current) ref.current.style.transform = `translate(${x - 250}px,${y - 250}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", fn); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} style={{ position: "fixed", top: 0, left: 0, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.1) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0, willChange: "transform" }} />;
}

function MagBtn({ href, children, primary = false, onClick, style = {} }) {
  const ref = useRef(null);
  useMagnetic(ref);
  return (
    <a ref={ref} href={href} onClick={onClick} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 26px", borderRadius: 12, fontWeight: 800, fontSize: 14, color: "white", textDecoration: "none", cursor: "pointer", transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)", ...(primary ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,0.5)", boxShadow: "0 0 24px rgba(168,85,247,0.3)" } : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }), ...style }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}>
      {children}
    </a>
  );
}

function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  useTilt(ref);
  return (
    <div ref={ref} style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1),border-color 0.3s", willChange: "transform", border: "1px solid rgba(255,255,255,0.07)", ...style }}>
      {children}
    </div>
  );
}

function MobileMenu({ isOpen, active, onClose }) {
  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: isOpen ? "auto" : "none", opacity: isOpen ? 1 : 0, transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(24px)", background: "rgba(7,3,22,0.97)" }} />
      <nav style={{ position: "relative", display: "flex", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
        {navItems.map((item, i) => {
          const id = item.href.replace("#", "");
          const isActive = active === id;
          return (
            <a key={item.href} href={item.href}
              onClick={(e) => { scrollTo(e, item.href); onClose(); }}
              style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.04em", textDecoration: "none", transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms`, transform: isOpen ? "translateY(0)" : "translateY(20px)", opacity: isOpen ? 1 : 0, ...(isActive ? { background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "rgba(255,255,255,0.55)" }) }}>
              {item.label}
            </a>
          );
        })}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 260, marginTop: 20, transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) 300ms`, transform: isOpen ? "translateY(0)" : "translateY(20px)", opacity: isOpen ? 1 : 0 }}>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" onClick={onClose}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: 15, borderRadius: 14, fontWeight: 800, fontSize: 14, color: "white", textDecoration: "none", background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,0.4)" }}>
            <Icon name="message" size={17} /> Discord
          </a>
          <a href={EMAIL_URL} onClick={onClose}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: 15, borderRadius: 14, fontWeight: 800, fontSize: 14, color: "white", textDecoration: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Icon name="mail" size={17} /> Email
          </a>
        </div>
      </nav>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const progress = useScrollProgress();
  const activeSection = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useReveal();

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 24); setShowTop(window.scrollY > 500); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#07031a", minHeight: "100vh", color: "white", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }

        [data-reveal] {
          opacity: 0; transform: translateY(28px); filter: blur(5px);
          transition: opacity .72s cubic-bezier(.22,1,.36,1), transform .72s cubic-bezier(.22,1,.36,1), filter .72s cubic-bezier(.22,1,.36,1);
        }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); filter: blur(0); }
        [data-d="1"] { transition-delay: .08s !important; }
        [data-d="2"] { transition-delay: .16s !important; }
        [data-d="3"] { transition-delay: .24s !important; }
        [data-d="4"] { transition-delay: .32s !important; }
        [data-d="5"] { transition-delay: .40s !important; }

        .gt {
          background: linear-gradient(120deg,#a855f7 0%,#e879f9 45%,#38bdf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gs 5s ease infinite;
        }
        @keyframes gs { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        .gborder { position: relative; }
        .gborder::before {
          content:''; position:absolute; inset:0; border-radius:inherit; padding:1px;
          background: linear-gradient(135deg,rgba(168,85,247,.4),rgba(56,189,248,.2),rgba(168,85,247,.1));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; pointer-events:none;
        }

        .pulse { animation: pg 3s ease-in-out infinite; }
        @keyframes pg { 0%,100%{box-shadow:0 0 20px rgba(168,85,247,.35)} 50%{box-shadow:0 0 55px rgba(168,85,247,.7),0 0 90px rgba(168,85,247,.2)} }

        @keyframes float { 0%,100%{transform:translateY(0) rotate(-.3deg)} 50%{transform:translateY(-14px) rotate(.3deg)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #07031a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#a855f7,#38bdf8); border-radius: 99px; }
        ::selection { background: rgba(168,85,247,.35); }

        .nav-link:hover { color: white !important; background: rgba(255,255,255,.06) !important; }
        .skill-tag:hover { background: rgba(168,85,247,.15) !important; border-color: rgba(168,85,247,.4) !important; color: white !important; }
        .proj-btn:hover { box-shadow: 0 0 20px rgba(168,85,247,.4) !important; transform: translateY(-2px) !important; }

        @media (max-width:768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .hide-mob { display: none !important; }
          .show-mob { display: flex !important; }
        }
        @media (min-width:769px) { .show-mob { display: none !important; } }

        @media (prefers-reduced-motion:reduce) {
          *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
          [data-reveal] { opacity:1 !important; transform:none !important; filter:none !important; }
        }
      `}</style>

      <CursorGlow />

      {/* BG layers */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 8% 0%,rgba(110,35,190,.42) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 95% 15%,rgba(14,100,190,.22) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 50% at 50% 100%,rgba(90,25,170,.22) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <MobileMenu isOpen={menuOpen} active={activeSection} onClose={() => setMenuOpen(false)} />

      <div style={{ position: "relative", zIndex: 1, animation: "fadeIn .6s ease both" }}>

        {/* ── HEADER ── */}
        <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,.08)" : "transparent"}`, backdropFilter: scrolled ? "blur(24px)" : "none", background: scrolled ? "rgba(7,3,26,.82)" : "transparent", transition: "all .4s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: `${progress * 100}%`, background: "linear-gradient(90deg,#a855f7,#e879f9,#38bdf8)", transition: "width .1s linear", borderRadius: "0 2px 2px 0" }} />
          <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>

            <a href="#home" onClick={(e) => scrollTo(e, "#home")} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", transition: "opacity .2s" }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = ".8"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
              <img src={hibobLogo} alt="Hibob Studio" style={{ height: 36, width: "auto" }} />
            </a>

            <div className="hide-mob" style={{ display: "flex", alignItems: "center", gap: 2, padding: 5, borderRadius: 999, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a key={item.href} href={item.href} className="nav-link"
                    onClick={(e) => scrollTo(e, item.href)}
                    style={{ padding: "8px 17px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "all .2s", color: isActive ? "white" : "rgba(255,255,255,.5)", background: isActive ? "rgba(168,85,247,.18)" : "transparent", border: isActive ? "1px solid rgba(168,85,247,.35)" : "1px solid transparent" }}>
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <MagBtn href={DISCORD_URL} primary className="hide-mob pulse" style={{ padding: "10px 20px", borderRadius: 999, fontSize: 13 }}>
                Hire Me
              </MagBtn>
              <button onClick={() => setMenuOpen((v) => !v)} className="show-mob"
                style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, width: 42, height: 42, alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer", transition: "all .2s" }}>
                <Icon name={menuOpen ? "x" : "menu"} size={20} />
              </button>
            </div>
          </nav>
        </header>

        {/* ── HERO ── */}
        <section id="home" className="hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 24px 110px", display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 56, alignItems: "center", minHeight: "calc(100vh - 66px)" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Badge */}
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(168,85,247,.32)", background: "rgba(168,85,247,.09)", width: "fit-content" }}>
              <Icon name="star" size={12} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#c084fc", letterSpacing: ".07em", textTransform: "uppercase" }}>Full-Stack Roblox Developer</span>
            </div>

            {/* Headline */}
            <div data-reveal data-d="1">
              <h1 style={{ fontSize: "clamp(44px,6vw,80px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.04em" }}>
                Hi, I'm <span className="gt">HibobTheDev</span>.<br />
                I Build Roblox<br />
                <span className="gt">Experiences.</span>
              </h1>
            </div>

            {/* Subtext */}
            <p data-reveal data-d="2" style={{ fontSize: 17, color: "rgba(255,255,255,.5)", lineHeight: 1.78, maxWidth: 500, fontWeight: 400 }}>
              2-4 tahun membangun game Roblox dengan custom Blender assets, OOP + Knit Framework, dan aftersales terbukti dari puluhan klien. Harga mid-range, kualitas premium.
            </p>

            {/* CTAs */}
            <div data-reveal data-d="3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <MagBtn href="#contact" primary onClick={(e) => scrollTo(e, "#contact")} style={{ padding: "14px 28px" }}>
                Hire Me <Icon name="arrowRight" size={17} />
              </MagBtn>
              <MagBtn href="#projects" onClick={(e) => scrollTo(e, "#projects")} style={{ padding: "14px 28px" }}>
                View Projects
              </MagBtn>
            </div>

            {/* Stats */}
            <div data-reveal data-d="4" style={{ display: "flex", borderRadius: 18, border: "1px solid rgba(255,255,255,.07)", background: "rgba(255,255,255,.03)", overflow: "hidden", width: "fit-content" }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{ padding: "17px 26px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,.07)" : "none", textAlign: "center" }}>
                  <div className="gt" style={{ fontSize: 24, fontWeight: 900 }}><Counter value={s.value} /></div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginTop: 5, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-right" data-reveal data-d="2" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.22) 0%,transparent 70%)", filter: "blur(60px)", animation: "float 6s ease-in-out infinite" }} />
            <div className="gborder" style={{ position: "relative", background: "rgba(255,255,255,.03)", borderRadius: 28, padding: 38, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(168,85,247,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.06) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
              <img src={avatarImg} alt="HibobTheDev Roblox Character"
                style={{ width: 270, height: 270, objectFit: "contain", objectPosition: "center", position: "relative", zIndex: 1, filter: "drop-shadow(0 0 50px rgba(168,85,247,.55))", animation: "float 5.5s ease-in-out infinite", imageRendering: "pixelated" }} />
            </div>
          </div>
        </section>

        <Divider />

        {/* ── WHY ME ── */}
        <section id="about" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Kenapa Gua?" />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Bukan Sekadar <span className="gt">Developer Biasa.</span>
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>
              Gua gabungin craftsmanship, sistem yang solid, dan aftersales yang beneran ada — bukan cuma janji.
            </p>
          </div>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {whyMe.map((w, i) => (
              <TiltCard key={w.title} style={{ background: "rgba(255,255,255,.03)", borderRadius: 20, padding: 28 }}>
                <div data-reveal data-d={`${(i % 3) + 1}`}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "#a855f7" }}>
                    <Icon name={w.icon} size={21} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 9 }}>{w.title}</h3>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.46)", lineHeight: 1.75 }}>{w.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SERVICES ── */}
        <section id="services" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Services" />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Apa yang Gua <span className="gt">Bisa Bikin.</span>
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>
              Full-stack Roblox development — dari map sampai sistem, dari GUI sampai launch.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            {services.map((s, i) => (
              <TiltCard key={s.title} style={{ background: "rgba(255,255,255,.03)", borderRadius: 20, padding: 30 }}>
                <div data-reveal data-d={`${i + 1}`}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a855f7" }}>
                      <Icon name={s.icon} size={21} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,.08)", border: "1px solid rgba(56,189,248,.18)", color: "#38bdf8", letterSpacing: ".06em" }}>{s.tag}</span>
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.46)", lineHeight: 1.78 }}>{s.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Projects" />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              <span className="gt">Featured</span> Experiences.
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>
              Game-game yang gua bangun — dari map sampai sistem, semuanya dikerjain sendiri.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {projects.map((p, i) => (
              <TiltCard key={p.title} style={{ background: "rgba(255,255,255,.03)", borderRadius: 20, overflow: "hidden" }}>
                <div data-reveal data-d={`${(i % 4) + 1}`}>
                  <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(168,85,247,.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: "#a855f7", textTransform: "uppercase" }}>{p.category}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)", fontWeight: 500 }}>{p.year}</span>
                        <span style={{ fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 999, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.25)", color: "#c084fc" }}>{p.badge}</span>
                      </div>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 800 }}>{p.title}</h3>
                  </div>
                  <div style={{ padding: "16px 24px 24px" }}>
                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.46)", lineHeight: 1.78, marginBottom: 18 }}>{p.description}</p>
                    <a href={p.url} target="_blank" rel="noreferrer" className="proj-btn"
                      style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, fontWeight: 700, fontSize: 13.5, color: "white", textDecoration: "none", background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.4)", transition: "all .2s" }}>
                      Play Game <Icon name="arrowRight" size={14} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── PRICING ── */}
        <section id="pricing" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Commission Pricing" />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Harga <span className="gt">Transparan.</span>
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>
              Mid-range price, premium quality. Semua harga bisa dinegosiasikan sesuai scope dan budget lu.
            </p>
          </div>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "start" }}>
            {pricing.map((p, i) => (
              <div key={p.name} data-reveal data-d={`${i + 1}`}
                style={{ position: "relative", background: p.highlight ? "rgba(168,85,247,.08)" : "rgba(255,255,255,.03)", border: p.highlight ? "1px solid rgba(168,85,247,.45)" : "1px solid rgba(255,255,255,.07)", borderRadius: 22, padding: "30px 26px", transition: "transform .3s cubic-bezier(.22,1,.36,1)" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                {p.highlight && (
                  <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", padding: "5px 16px", borderRadius: 999, background: "linear-gradient(135deg,#7c3aed,#a855f7)", fontSize: 11, fontWeight: 800, color: "white", letterSpacing: ".07em", whiteSpace: "nowrap" }}>
                    MOST POPULAR
                  </div>
                )}
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.45)", marginBottom: 8 }}>{p.name}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 900, ...(p.highlight ? { background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "white" }) }}>
                    {p.price === "Custom" ? "Custom" : `Rp${p.price}`}
                  </span>
                  {p.currency && <span style={{ fontSize: 13, color: "rgba(255,255,255,.35)", fontWeight: 600 }}>start from</span>}
                </div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.42)", lineHeight: 1.7, marginBottom: 22, minHeight: 42 }}>{p.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 26 }}>
                  {p.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 6, background: "rgba(168,85,247,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#a855f7" }}>
                        <Icon name="check" size={11} />
                      </div>
                      <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.62)", fontWeight: 500 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={DISCORD_URL} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", borderRadius: 12, fontWeight: 800, fontSize: 14, color: "white", textDecoration: "none", width: "100%", transition: "all .2s", ...(p.highlight ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.5)", boxShadow: "0 0 24px rgba(168,85,247,.3)" } : { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }) }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = ".85"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                  {p.cta} <Icon name="arrowRight" size={15} />
                </a>
              </div>
            ))}
          </div>
          <p data-reveal style={{ textAlign: "center", marginTop: 22, fontSize: 13, color: "rgba(255,255,255,.3)", fontWeight: 500 }}>
            * Semua harga dalam IDR dan bisa dinegosiasikan. Pembayaran via Robux juga tersedia.
          </p>
        </section>

        <Divider />

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          <Label text="Testimonials" />
          <div data-reveal style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Kata <span className="gt">Klien Gua.</span>
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.48)", maxWidth: 520, lineHeight: 1.78 }}>
              Aftersales yang terbukti dari puluhan klien — termasuk nama-nama besar di skena Roblox Indonesia.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {testimonials.map((t, i) => (
              <TiltCard key={t.name} style={{ background: "rgba(255,255,255,.03)", borderRadius: 20, padding: 28 }}>
                <div data-reveal data-d={`${i + 1}`}>
                  <div style={{ color: "rgba(168,85,247,.5)", marginBottom: 16 }}>
                    <Icon name="quote" size={28} />
                  </div>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,.68)", lineHeight: 1.8, marginBottom: 22, fontStyle: "italic" }}>"{t.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#a855f7,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "white", flexShrink: 0 }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 800, color: "white" }}>{t.name}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", fontWeight: 500, marginTop: 2 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── CONTACT ── */}
        <section id="contact" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px 112px" }}>
          <div data-reveal className="gborder" style={{ textAlign: "center", padding: "88px 40px", background: "rgba(168,85,247,.05)", borderRadius: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -100, left: -100, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.18) 0%,transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: -100, right: -100, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,.12) 0%,transparent 70%)" }} />
            <div style={{ position: "relative" }}>
              <Label text="Open for Commission" center />
              <h2 style={{ fontSize: "clamp(28px,4vw,54px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "12px 0 16px" }}>
                Punya Project? Let's<br /><span className="gt">Build It Together.</span>
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,.46)", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.78 }}>
                Reach out lewat Discord atau Email. Gua reply cepet dan siap diskusi scope, timeline, dan budget.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <MagBtn href={DISCORD_URL} primary style={{ padding: "16px 32px", borderRadius: 14, fontSize: 16 }} className="pulse">
                  <Icon name="message" size={20} /> Discord — Paling Cepet
                </MagBtn>
                <MagBtn href={EMAIL_URL} style={{ padding: "16px 32px", borderRadius: 14, fontSize: 16 }}>
                  <Icon name="mail" size={20} /> Email
                </MagBtn>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "26px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={hibobLogo} alt="Hibob Studio" style={{ height: 26, width: "auto" }} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.25)", fontWeight: 500 }}>© 2026 HibobTheDev — Roblox Developer</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "rgba(255,255,255,.28)", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.28)"}>Discord</a>
              <a href={EMAIL_URL} style={{ fontSize: 13, color: "rgba(255,255,255,.28)", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.28)"}>Email</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Scroll to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 99, width: 44, height: 44, borderRadius: 12, background: "rgba(168,85,247,.18)", border: "1px solid rgba(168,85,247,.35)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", transition: "all .3s cubic-bezier(.22,1,.36,1)", opacity: showTop ? 1 : 0, transform: showTop ? "translateY(0) scale(1)" : "translateY(12px) scale(.8)", pointerEvents: showTop ? "auto" : "none" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(168,85,247,.35)"; e.currentTarget.style.transform = "translateY(-2px) scale(1.05)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(168,85,247,.18)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
        aria-label="Back to top">
        <Icon name="arrowUp" size={18} />
      </button>
    </div>
  );
}