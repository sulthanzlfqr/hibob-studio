import { useEffect, useState, useCallback, useRef } from "react";
import avatarImg from "./assets/avatar.png";
import hibobLogo from "./assets/HIBOB LOGO.svg";

const DISCORD_URL = "https://discord.gg/5rQsxcX4";
const EMAIL_URL = "mailto:sulthan.zlfqr@gmail.com";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
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
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M18 6 6 18M6 6l12 12",
  externalLink: "M15 3h6v6M10 14L21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5",
};

const projects = [
  { title: "Mount Aetheria", category: "Adventure / Mountain", description: "A premium mountain experience with atmospheric route design, smooth player progression, and a polished journey from spawn to summit.", url: "https://www.roblox.com/games/114127426604041/MOUNT-AETHERIA-V3", badge: "MA" },
  { title: "Mount Elythera", category: "Exploration", description: "A scenic climbing world built around readable level direction, immersive terrain, and a clean exploration flow for Roblox players.", url: "https://www.roblox.com/games/102754646900067/Mount-Elythera", badge: "ME" },
  { title: "Mount Perseus", category: "Adventure Systems", description: "A mountain-themed project combining gameplay systems, world structure, and interface polish to create a more engaging player journey.", url: "https://www.roblox.com/games/70976156417927/Mount-Perseus", badge: "MP" },
  { title: "Pulau Cerdas Cermat", category: "Educational / Quiz", description: "An educational Roblox experience centered around quiz interactions, accessible learning design, and player-friendly pacing.", url: "https://www.roblox.com/games/115372750478468/Pulau-Cerdas-Cermat", badge: "PCC" },
  { title: "Mutual Space Club", category: "Social / Hangout", description: "A community-focused social space designed for interaction, visual identity, and a comfortable atmosphere for players to hang out together.", url: "https://www.roblox.com/games/121781236784127/Mutual-Space-Club", badge: "MSC" },
];

const services = [
  { icon: "code", title: "Roblox Scripting", description: "Custom Luau systems, gameplay mechanics, client-server logic, progression, tools, interactions, and core gameplay features." },
  { icon: "hammer", title: "World Building", description: "Playable Roblox environments, themed maps, optimized layouts, mountain routes, social spaces, and worlds built for real player flow." },
  { icon: "paint", title: "GUI & Game Polish", description: "Responsive HUDs, menus, onboarding screens, clean visual hierarchy, smooth interactions, and player-friendly interface design." },
];

const skills = ["Luau", "Roblox Studio", "Gameplay Systems", "Building", "GUI Design", "UI/UX Flow", "Remote Events", "TweenService", "DataStore", "Optimization", "Community Experiences", "Educational Games"];
const stats = [{ value: "5+", label: "Published Games" }, { value: "3-in-1", label: "Script, Build, GUI" }, { value: "100%", label: "Roblox Focused" }];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3, rootMargin: "-18% 0px -45% 0px" }
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
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useMagneticButton(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [ref]);
}

function scrollToSection(e, href) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", href);
}

// ─── Icon ─────────────────────────────────────────────────────────────────────
function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  );
}

// ─── Cursor Trail ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const dot = useRef(null);
  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      if (dot.current) dot.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0, transition: "opacity 0.3s", willChange: "transform" }} />
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ isOpen, active, onClose }) {
  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: isOpen ? "auto" : "none", opacity: isOpen ? 1 : 0, transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(24px)", background: "rgba(8,4,28,0.97)" }} />
      <nav style={{ position: "relative", display: "flex", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
        {navItems.map((item, i) => {
          const id = item.href.replace("#", "");
          const isActive = active === id;
          return (
            <a key={item.href} href={item.href}
              onClick={(e) => { scrollToSection(e, item.href); onClose(); }}
              style={{ fontSize: "42px", fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.04em", textDecoration: "none", transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms`, transform: isOpen ? "translateY(0)" : "translateY(24px)", opacity: isOpen ? 1 : 0, background: isActive ? "linear-gradient(135deg, #a855f7, #38bdf8)" : "none", WebkitBackgroundClip: isActive ? "text" : "none", WebkitTextFillColor: isActive ? "transparent" : "rgba(255,255,255,0.6)", color: "rgba(255,255,255,0.6)" }}>
              {item.label}
            </a>
          );
        })}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "260px", marginTop: "16px", transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) 320ms`, transform: isOpen ? "translateY(0)" : "translateY(24px)", opacity: isOpen ? 1 : 0 }}>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" onClick={onClose}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "15px", borderRadius: "14px", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", color: "white", textDecoration: "none", background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "1px solid rgba(168,85,247,0.4)" }}>
            <Icon name="message" size={17} /> Join Discord
          </a>
          <a href={EMAIL_URL} onClick={onClose}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "15px", borderRadius: "14px", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", color: "white", textDecoration: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Icon name="mail" size={17} /> Email Us
          </a>
        </div>
      </nav>
    </div>
  );
}

// ─── Magnetic CTA Button ───────────────────────────────────────────────────────
function MagneticBtn({ href, children, primary = false, target, style = {} }) {
  const ref = useRef(null);
  useMagneticButton(ref);
  const base = {
    display: "inline-flex", alignItems: "center", gap: "10px",
    padding: "14px 28px", borderRadius: "12px", fontWeight: 800,
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", color: "white",
    textDecoration: "none", transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
    cursor: "pointer", ...style,
  };
  const themed = primary
    ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "1px solid rgba(168,85,247,0.5)", boxShadow: "0 0 24px rgba(168,85,247,0.3)" }
    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" };
  return (
    <a ref={ref} href={href} target={target} rel={target ? "noreferrer" : undefined} style={{ ...base, ...themed }}>
      {children}
    </a>
  );
}

// ─── Card with hover tilt ──────────────────────────────────────────────────────
function TiltCard({ children, style = {}, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      el.style.borderColor = "rgba(168,85,247,0.35)";
    };
    const onLeave = () => { el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)"; el.style.borderColor = "rgba(255,255,255,0.07)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return <div ref={ref} className={className} style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s", willChange: "transform", ...style }}>{children}</div>;
}

// ─── Number Counter ────────────────────────────────────────────────────────────
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
      const dur = 1200, start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const cur = num < 10 ? (ease * num).toFixed(0) : Math.round(ease * num);
        setDisplay(`${cur}${suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{display}</span>;
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const progress = useScrollProgress();
  const activeSection = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 20); setShowTop(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#08041c", minHeight: "100vh", color: "white", overflowX: "hidden", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Google Fonts - Plus Jakarta Sans (like Nova reference) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Scroll reveal ─────────────────────── */
        [data-reveal] {
          opacity: 0;
          transform: translateY(32px);
          filter: blur(6px);
          transition:
            opacity 0.75s cubic-bezier(0.22,1,0.36,1),
            transform 0.75s cubic-bezier(0.22,1,0.36,1),
            filter 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); filter: blur(0); }

        /* ── Stagger delays ────────────────────── */
        [data-delay="1"] { transition-delay: 0.08s !important; }
        [data-delay="2"] { transition-delay: 0.16s !important; }
        [data-delay="3"] { transition-delay: 0.24s !important; }
        [data-delay="4"] { transition-delay: 0.32s !important; }
        [data-delay="5"] { transition-delay: 0.40s !important; }

        /* ── Gradient text ─────────────────────── */
        .gt {
          background: linear-gradient(120deg, #a855f7 0%, #e879f9 45%, #38bdf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gs 5s ease infinite;
        }
        @keyframes gs { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        /* ── Float animation ────────────────────── */
        @keyframes float { 0%,100%{transform:translateY(0) rotate(-0.4deg)} 50%{transform:translateY(-16px) rotate(0.4deg)} }

        /* ── Gradient border on card ────────────── */
        .gborder {
          position: relative;
        }
        .gborder::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(168,85,247,0.4), rgba(56,189,248,0.2), rgba(168,85,247,0.1));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* ── Pulse glow on CTA ──────────────────── */
        .pulse { animation: pg 3s ease-in-out infinite; }
        @keyframes pg {
          0%,100% { box-shadow: 0 0 20px rgba(168,85,247,0.35); }
          50% { box-shadow: 0 0 55px rgba(168,85,247,0.7), 0 0 100px rgba(168,85,247,0.2); }
        }

        /* ── Scrollbar ──────────────────────────── */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #08041c; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#a855f7, #38bdf8); border-radius: 99px; }

        /* ── Selection ──────────────────────────── */
        ::selection { background: rgba(168,85,247,0.35); }

        /* ── Skill pill hover ────────────────────── */
        .skill-pill { transition: all 0.2s ease !important; }
        .skill-pill:hover { background: rgba(168,85,247,0.15) !important; border-color: rgba(168,85,247,0.4) !important; color: white !important; transform: translateY(-2px); }

        /* ── Nav link hover ─────────────────────── */
        .nav-link { transition: all 0.2s ease !important; }
        .nav-link:hover { color: white !important; background: rgba(255,255,255,0.06) !important; }

        /* ── Responsive ─────────────────────────── */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }

        /* ── Page load fade ─────────────────────── */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .page-enter { animation: fadeIn 0.6s ease both; }

        /* ── Reduced motion ─────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          [data-reveal] { opacity: 1 !important; transform: none !important; filter: none !important; }
          .gt { animation: none !important; }
        }
      `}</style>

      {/* Cursor glow */}
      <CursorGlow />

      {/* BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 65% at 5% 0%, rgba(120,40,200,0.4) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 95% 15%, rgba(14,120,200,0.22) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 45% at 50% 100%, rgba(100,30,180,0.22) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <MobileMenu isOpen={menuOpen} active={activeSection} onClose={() => setMenuOpen(false)} />

      <div className="page-enter" style={{ position: "relative", zIndex: 1 }}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "transparent"}`, backdropFilter: scrolled ? "blur(24px)" : "none", background: scrolled ? "rgba(8,4,28,0.8)" : "transparent", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
          {/* progress bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, height: "2px", width: `${progress * 100}%`, background: "linear-gradient(90deg, #a855f7, #e879f9, #38bdf8)", transition: "width 0.1s linear", borderRadius: "0 2px 2px 0" }} />

          <nav style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
            <a href="#home" onClick={(e) => scrollToSection(e, "#home")} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
              <img src={hibobLogo} alt="Hibob Studio" style={{ height: "38px", width: "auto" }} />
            </a>

            {/* Desktop nav */}
            <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2px", padding: "5px", borderRadius: "999px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a key={item.href} href={item.href} className="nav-link"
                    onClick={(e) => scrollToSection(e, item.href)}
                    style={{ padding: "8px 18px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", color: isActive ? "white" : "rgba(255,255,255,0.5)", background: isActive ? "rgba(168,85,247,0.18)" : "transparent", border: isActive ? "1px solid rgba(168,85,247,0.35)" : "1px solid transparent", textDecoration: "none" }}>
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <MagneticBtn href={DISCORD_URL} target="_blank" primary className="hide-mobile pulse"
                style={{ padding: "10px 22px", borderRadius: "999px", fontSize: "14px" }}>
                Discord
              </MagneticBtn>
              <button onClick={() => setMenuOpen((v) => !v)} className="show-mobile"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", width: "42px", height: "42px", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer", transition: "all 0.2s" }}
                aria-label="Toggle menu">
                <Icon name={menuOpen ? "x" : "menu"} size={20} />
              </button>
            </div>
          </nav>
        </header>

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section id="home" className="hero-grid" style={{ maxWidth: "1280px", margin: "0 auto", padding: "88px 24px 112px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "56px", alignItems: "center", minHeight: "calc(100vh - 68px)" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Badge */}
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 18px", borderRadius: "999px", border: "1px solid rgba(168,85,247,0.35)", background: "rgba(168,85,247,0.1)", width: "fit-content" }}>
              <Icon name="star" size={13} />
              <span style={{ fontSize: "12px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#c084fc", letterSpacing: "0.08em", textTransform: "uppercase" }}>Roblox Game Development Studio</span>
            </div>

            {/* Headline */}
            <div data-reveal data-delay="1">
              <h1 style={{ fontSize: "clamp(44px, 6vw, 80px)", fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.02, letterSpacing: "-0.04em" }}>
                The <span className="gt">Best</span><br />
                Roblox <span className="gt">Experience</span><br />
                Developer.
              </h1>
            </div>

            {/* Subtext */}
            <p data-reveal data-delay="2" style={{ fontSize: "17px", color: "rgba(255,255,255,0.52)", lineHeight: 1.75, maxWidth: "500px", fontWeight: 400 }}>
              Hibob Studio builds complete Roblox experiences — combining clean scripting, immersive building, and polished GUI design into games that feel smooth and ready for players.
            </p>

            {/* CTA buttons */}
            <div data-reveal data-delay="3" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <MagneticBtn href="#projects" primary onClick={(e) => scrollToSection(e, "#projects")}>
                View Projects <Icon name="arrowRight" size={17} />
              </MagneticBtn>
              <MagneticBtn href={DISCORD_URL} target="_blank">
                <Icon name="message" size={17} /> Join Discord
              </MagneticBtn>
            </div>

            {/* Stats */}
            <div data-reveal data-delay="4" style={{ display: "flex", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", overflow: "hidden", width: "fit-content" }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{ padding: "18px 28px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", textAlign: "center" }}>
                  <div className="gt" style={{ fontSize: "24px", fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <Counter value={s.value} />
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", marginTop: "5px", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-right" data-reveal data-delay="2" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            {/* outer glow */}
            <div style={{ position: "absolute", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)", filter: "blur(60px)", animation: "float 6s ease-in-out infinite" }} />
            {/* card */}
            <div className="gborder" style={{ position: "relative", background: "rgba(255,255,255,0.03)", borderRadius: "28px", padding: "36px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {/* grid bg */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(168,85,247,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.06) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
              <img
                src={avatarImg}
                alt="Hibob Studio Roblox Character"
                style={{ width: "280px", height: "280px", objectFit: "contain", objectPosition: "center", position: "relative", zIndex: 1, filter: "drop-shadow(0 0 50px rgba(168,85,247,0.55))", animation: "float 5.5s ease-in-out infinite", imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </section>

        {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
        <Divider />

        {/* ── SERVICES ────────────────────────────────────────────────────── */}
        <section id="services" style={{ maxWidth: "1280px", margin: "0 auto", padding: "96px 24px" }}>
          <SectionLabel label="Our Focus" />
          <div data-reveal style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              <span className="gt">Premium</span> Experience.
            </h2>
            <p style={{ marginTop: "14px", fontSize: "16px", color: "rgba(255,255,255,0.48)", maxWidth: "500px", lineHeight: 1.75 }}>
              Featuring a complete workflow — from scripts and buildings to polished GUI.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
            {services.map((s, i) => (
              <TiltCard key={s.title} className="gborder" style={{ background: "rgba(255,255,255,0.03)", borderRadius: "20px", padding: "32px" }}>
                <div data-reveal data-delay={`${i + 1}`}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.22)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "22px", color: "#a855f7" }}>
                    <Icon name={s.icon} size={22} />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "10px" }}>{s.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.48)", lineHeight: 1.75 }}>{s.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── PROJECTS ────────────────────────────────────────────────────── */}
        <section id="projects" style={{ maxWidth: "1280px", margin: "0 auto", padding: "96px 24px" }}>
          <SectionLabel label="Selected Work" />
          <div data-reveal style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              <span className="gt">Featured</span> Experiences.
            </h2>
            <p style={{ marginTop: "14px", fontSize: "16px", color: "rgba(255,255,255,0.48)", maxWidth: "500px", lineHeight: 1.75 }}>
              A collection of Roblox projects built with gameplay, environment design, and user experience in mind.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
            {projects.map((p, i) => (
              <TiltCard key={p.title} className="gborder" style={{ background: "rgba(255,255,255,0.03)", borderRadius: "20px", overflow: "hidden" }}>
                <div data-reveal data-delay={`${(i % 4) + 1}`}>
                  <div style={{ padding: "26px 26px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(168,85,247,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "#a855f7", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.category}</span>
                      <span style={{ fontSize: "11px", fontWeight: 800, padding: "4px 10px", borderRadius: "999px", background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.28)", color: "#c084fc", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.badge}</span>
                    </div>
                    <h3 style={{ fontSize: "21px", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.title}</h3>
                  </div>
                  <div style={{ padding: "18px 26px 26px" }}>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.48)", lineHeight: 1.75, marginBottom: "18px" }}>{p.description}</p>
                    <a href={p.url} target="_blank" rel="noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", color: "white", textDecoration: "none", background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "1px solid rgba(168,85,247,0.4)", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 24px rgba(168,85,247,0.45)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      Play Experience <Icon name="arrowRight" size={15} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── ABOUT ───────────────────────────────────────────────────────── */}
        <section id="about" style={{ maxWidth: "1280px", margin: "0 auto", padding: "96px 24px" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
            <div data-reveal>
              <SectionLabel label="About Hibob" />
              <h2 style={{ fontSize: "clamp(34px, 4.5vw, 56px)", fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "20px" }}>
                <span className="gt">Built</span> for Roblox.
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "32px" }}>
                Hibob Studio focuses on practical, playable, and polished Roblox development. The goal is not only to make experiences look good, but to make them feel complete — clear progression, stable systems, readable UI, and worlds players want to explore.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                {stats.map((s) => (
                  <div key={s.label} className="gborder" style={{ background: "rgba(255,255,255,0.03)", borderRadius: "14px", padding: "20px 14px", textAlign: "center" }}>
                    <div className="gt" style={{ fontSize: "26px", fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <Counter value={s.value} />
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", marginTop: "6px", fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal data-delay="2" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Process */}
              <div className="gborder" style={{ background: "rgba(255,255,255,0.03)", borderRadius: "20px", padding: "26px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#a855f7", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "18px" }}>Development Process</p>
                {["Concept planning & feature breakdown", "Core scripting, map structure, and GUI flow", "Testing, polish, optimization, and launch support"].map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.1)", borderRadius: "12px", marginBottom: i < 2 ? "8px" : "0" }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "9px", background: "rgba(168,85,247,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 900, color: "#c084fc", flexShrink: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>0{i + 1}</div>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.68)", fontWeight: 500 }}>{step}</p>
                  </div>
                ))}
              </div>
              {/* Skills */}
              <div className="gborder" style={{ background: "rgba(255,255,255,0.03)", borderRadius: "20px", padding: "26px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#38bdf8", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "14px" }}>Skills & Tools</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {skills.map((sk) => (
                    <span key={sk} className="skill-pill" style={{ padding: "6px 13px", borderRadius: "999px", background: "rgba(56,189,248,0.07)", border: "1px solid rgba(56,189,248,0.14)", fontSize: "13px", color: "rgba(255,255,255,0.58)", fontWeight: 600, cursor: "default" }}>{sk}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── CONTACT ─────────────────────────────────────────────────────── */}
        <section id="contact" style={{ maxWidth: "1280px", margin: "0 auto", padding: "96px 24px 112px" }}>
          <div data-reveal className="gborder" style={{ textAlign: "center", padding: "88px 40px", background: "rgba(168,85,247,0.05)", borderRadius: "28px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)" }} />
            <div style={{ position: "relative" }}>
              <SectionLabel label="Contact" center />
              <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.04em", lineHeight: 1.05, margin: "12px 0 16px" }}>
                Ready to Build Your Next<br /><span className="gt">Roblox Experience?</span>
              </h2>
              <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.48)", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.75 }}>
                Connect with Hibob Studio for development, collaboration, commissions, or community projects.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <MagneticBtn href={DISCORD_URL} target="_blank" primary style={{ padding: "16px 32px", borderRadius: "14px", fontSize: "16px" }} className="pulse">
                  <Icon name="message" size={20} /> Join Discord
                </MagneticBtn>
                <MagneticBtn href={EMAIL_URL} style={{ padding: "16px 32px", borderRadius: "14px", fontSize: "16px" }}>
                  <Icon name="mail" size={20} /> Email Us
                </MagneticBtn>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={hibobLogo} alt="Hibob Studio" style={{ height: "28px", width: "auto" }} />
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.28)", fontWeight: 500 }}>© 2026 Hibob Studio — Roblox Game Development</span>
            </div>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer"
              style={{ fontSize: "13px", color: "rgba(255,255,255,0.28)", textDecoration: "none", transition: "color 0.2s", fontWeight: 500 }}
              onMouseEnter={(e) => e.currentTarget.style.color = "white"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.28)"}>
              discord.gg/5rQsxcX4
            </a>
          </div>
        </footer>
      </div>

      {/* ── SCROLL TO TOP ────────────────────────────────────────────────── */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 99, width: "44px", height: "44px", borderRadius: "12px", background: "rgba(168,85,247,0.18)", border: "1px solid rgba(168,85,247,0.35)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)", opacity: showTop ? 1 : 0, transform: showTop ? "translateY(0) scale(1)" : "translateY(12px) scale(0.8)", pointerEvents: showTop ? "auto" : "none", backdropFilter: "blur(12px)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(168,85,247,0.35)"; e.currentTarget.style.transform = "translateY(-2px) scale(1.05)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(168,85,247,0.18)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
        aria-label="Back to top">
        <Icon name="arrowUp" size={18} />
      </button>
    </div>
  );
}

// ─── Small helpers ─────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.35), rgba(56,189,248,0.35), transparent)" }} />
    </div>
  );
}

function SectionLabel({ label, center = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", justifyContent: center ? "center" : "flex-start" }}>
      <div style={{ width: "28px", height: "2px", background: "linear-gradient(90deg, #a855f7, #38bdf8)", borderRadius: "2px" }} />
      <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", color: "#a855f7", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</p>
    </div>
  );
}