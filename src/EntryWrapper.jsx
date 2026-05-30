// src/EntryWrapper.jsx

import { useState, useEffect } from "react";
import App from "./App";
import logoImg from "./assets/HibobStudio-Logo.png";
import { sfxHover, sfxClick, sfxLoadDone, sfxStart } from "./sfx";

const DISCORD_URL = "https://discord.gg/qzCdpasNhG";
const PANEL_URL = "https://panel.hibobstudio.com";

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        sfxLoadDone();
        setTimeout(() => { setFadeOut(true); setTimeout(onDone, 500); }, 200);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: fadeOut ? 0 : 1, transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(120,40,220,.22) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <img src={logoImg} alt="Hibob Studio" style={{ height: "clamp(36px,5vw,52px)", width: "auto", objectFit: "contain", marginBottom: 12, animation: "shimmer 3s ease infinite", filter: "drop-shadow(0 0 20px rgba(168,85,247,.4))" }} />
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "rgba(168,85,247,.45)", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 40, textTransform: "uppercase" }}>
        Creator Infrastructure Platform
      </p>

      <div style={{ width: 140, marginBottom: 14 }}>
        <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,.07)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#7c3aed,#a855f7,#38bdf8)", borderRadius: 99, transition: "width 0.05s linear", boxShadow: "0 0 10px rgba(168,85,247,.7)" }} />
        </div>
      </div>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(168,85,247,.45)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{progress}%</p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
      `}</style>
    </div>
  );
}

// ─── Entry Page ───────────────────────────────────────────────────────────────
function EntryPage({ onContinue }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const ease = "0.75s cubic-bezier(0.22,1,0.36,1)";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998, background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", overflowY: "auto" }}>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 15% 0%, rgba(110,35,190,.35) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 90% 100%, rgba(14,100,190,.2) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", top: "8%", right: "6%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.15) 0%,transparent 70%)", filter: "blur(35px)", animation: "orbFloat1 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,.12) 0%,transparent 70%)", filter: "blur(28px)", animation: "orbFloat2 9s ease-in-out infinite" }} />
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 600, paddingTop: 20, paddingBottom: 40 }}>

        {/* Brand badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(168,85,247,.3)", background: "rgba(168,85,247,.08)", marginBottom: 20, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: `opacity ${ease}, transform ${ease}`, transitionDelay: "0s" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#c084fc", letterSpacing: ".16em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Creator Infrastructure Platform</span>
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: 14, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity ${ease}, transform ${ease}`, transitionDelay: "0.08s" }}>
          <img src={logoImg} aria-label="Hibob Studio" alt="Hibob Studio" style={{ height: "clamp(44px,8vw,72px)", width: "auto", objectFit: "contain", display: "block", margin: "0 auto", filter: "drop-shadow(0 0 28px rgba(168,85,247,.35))" }} />
        </div>

        {/* Subtext */}
        <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.75, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 400, textAlign: "center", marginBottom: 32, maxWidth: 440, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: `opacity ${ease}, transform ${ease}`, transitionDelay: "0.15s" }}>
          Ekosistem infrastruktur untuk creator Roblox yang serius. Kelola audio, aset, lisensi, identitas, dan komunitas dari satu platform yang terhubung.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 340, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: `opacity ${ease}, transform ${ease}`, transitionDelay: "0.3s" }}>
          <button onClick={() => { sfxStart(); onContinue(); }}
            style={{ width: "100%", padding: "15px 24px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", fontSize: 15, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)", boxShadow: "0 4px 28px rgba(168,85,247,.4)", letterSpacing: "-0.01em" }}
            onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.boxShadow = "0 8px 50px rgba(168,85,247,.65)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 28px rgba(168,85,247,.4)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            Let's Get Started
          </button>

          <a href={PANEL_URL} target="_blank" rel="noreferrer" onClick={sfxClick}
            style={{ width: "100%", padding: "13px 24px", borderRadius: 12, border: "1px solid rgba(168,85,247,.25)", background: "rgba(168,85,247,.06)", color: "rgba(255,255,255,.65)", fontSize: 14, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)", letterSpacing: "-0.01em", boxSizing: "border-box" }}
            onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.borderColor = "rgba(168,85,247,.5)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,.25)"; e.currentTarget.style.color = "rgba(255,255,255,.65)"; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5ZM2 12l10 5 10-5M2 17l10 5 10-5" /></svg>
            Buka Creator Panel
          </a>
        </div>

        <p style={{ marginTop: 22, fontSize: 12, color: "rgba(255,255,255,.18)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 500, textAlign: "center", opacity: visible ? 1 : 0, transition: `opacity ${ease}`, transitionDelay: "0.4s" }}>
          hibobstudio.com
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes orbFloat1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.08)} }
        @keyframes orbFloat2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(18px) scale(0.94)} }
      `}</style>
    </div>
  );
}

// ─── Main Wrapper ─────────────────────────────────────────────────────────────
const AURORA_CSS = `
  @keyframes bgBlob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-4%,5%) scale(1.07)} 66%{transform:translate(5%,-4%) scale(0.93)} }
  @keyframes bgBlob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(5%,-7%) scale(1.1)} 66%{transform:translate(-5%,6%) scale(0.9)} }
  @keyframes bgBlob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-7%,7%) scale(1.13)} }
  @keyframes bgBlob4 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(6%,-5%) scale(0.93)} 66%{transform:translate(-4%,7%) scale(1.07)} }
  @keyframes bgBlob5 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(5%,-6%) scale(1.08)} 70%{transform:translate(-3%,4%) scale(0.95)} }
`;

function AuroraBackground({ zIndex = 9990 }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex, background: "#010112", overflow: "hidden", pointerEvents: "none" }}>
      <style>{AURORA_CSS}</style>
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "70%", height: "80%", borderRadius: "50%", background: "#4a6cf7", filter: "blur(110px)", opacity: 0.35, animation: "bgBlob1 14s ease-in-out infinite", willChange: "transform" }} />
      <div style={{ position: "absolute", top: "15%", right: "-15%", width: "62%", height: "72%", borderRadius: "50%", background: "#c828c0", filter: "blur(100px)", opacity: 0.38, animation: "bgBlob2 18s ease-in-out infinite", willChange: "transform" }} />
      <div style={{ position: "absolute", top: "0%", right: "8%", width: "42%", height: "52%", borderRadius: "50%", background: "#8090ff", filter: "blur(80px)", opacity: 0.25, animation: "bgBlob3 11s ease-in-out infinite", willChange: "transform" }} />
      <div style={{ position: "absolute", bottom: "-15%", left: "-5%", width: "48%", height: "58%", borderRadius: "50%", background: "#5518a8", filter: "blur(120px)", opacity: 0.2, animation: "bgBlob4 22s ease-in-out infinite", willChange: "transform" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "5%", width: "40%", height: "50%", borderRadius: "50%", background: "#d020a0", filter: "blur(100px)", opacity: 0.28, animation: "bgBlob5 16s ease-in-out infinite", willChange: "transform" }} />
    </div>
  );
}

export default function EntryWrapper() {
  const [phase, setPhase] = useState("loading");
  const [mainVisible, setMainVisible] = useState(false);

  const handleLoadingDone = () => setPhase("entry");
  const handleContinue = () => {
    setPhase("main");
    setTimeout(() => setMainVisible(true), 80);
  };

  return (
    <>
      {phase !== "main" && <AuroraBackground zIndex={9990} />}
      {phase === "loading" && <LoadingScreen onDone={handleLoadingDone} />}
      {phase === "entry" && <EntryPage onContinue={handleContinue} />}
      {phase === "main" && (
        <div style={{ opacity: mainVisible ? 1 : 0, transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)" }}>
          <App />
        </div>
      )}
    </>
  );
}
