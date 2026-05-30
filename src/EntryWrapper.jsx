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
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(120,40,220,.18) 0%, transparent 65%)", pointerEvents: "none" }} />

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

  const glass = {
    position: "relative", width: "100%", padding: "15px 24px", borderRadius: 20,
    border: "1px solid rgba(255,255,255,.22)",
    background: "linear-gradient(180deg,rgba(255,255,255,.17) 0%,rgba(255,255,255,.07) 100%)",
    backdropFilter: "blur(28px) saturate(160%)", WebkitBackdropFilter: "blur(28px) saturate(160%)",
    color: "white", fontSize: 15, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    textDecoration: "none", boxSizing: "border-box", letterSpacing: "-0.01em",
    transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.42), inset 0 -1px 0 rgba(0,0,0,.12), 0 4px 24px rgba(0,0,0,.22)",
    overflow: "hidden",
  };

  const shine = { position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(255,255,255,.14) 0%,transparent 52%)", borderRadius: 20, pointerEvents: "none" };
  const onEnter = (e) => { sfxHover(); e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,.52), inset 0 -1px 0 rgba(0,0,0,.12), 0 14px 40px rgba(0,0,0,.32)"; };
  const onLeave = (e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,.42), inset 0 -1px 0 rgba(0,0,0,.12), 0 4px 24px rgba(0,0,0,.22)"; };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998, background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 360 }}>

        {/* Logo + Wordmark */}
        <div style={{ marginBottom: 52, display: "flex", alignItems: "center", gap: 20, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity ${ease}, transform ${ease}` }}>
          <img src={logoImg} alt="Hibob Studio" style={{ height: "clamp(56px,10vw,84px)", width: "auto", objectFit: "contain", filter: "drop-shadow(0 0 32px rgba(168,85,247,.45))" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.0 }}>
            <span style={{ fontSize: "clamp(34px,6vw,54px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Hibob</span>
            <span style={{ fontSize: "clamp(34px,6vw,54px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Studio</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: `opacity ${ease}, transform ${ease}`, transitionDelay: "0.18s" }}>
          <button onClick={() => { sfxStart(); onContinue(); }} style={{ ...glass, fontWeight: 800 }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div style={shine} />
            <svg style={{ position: "relative" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            <span style={{ position: "relative" }}>Let's Get Started</span>
          </button>
          <a href={PANEL_URL} target="_blank" rel="noreferrer" onClick={sfxClick} style={glass} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div style={shine} />
            <svg style={{ position: "relative" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5ZM2 12l10 5 10-5M2 17l10 5 10-5" /></svg>
            <span style={{ position: "relative" }}>Buka Creator Panel</span>
          </a>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
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
