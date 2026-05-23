// src/EntryWrapper.jsx

import { useState, useEffect } from "react";
import App from "./App";

const DISCORD_URL = "https://discord.gg/qzCdpasNhG";
const DONATION_URL = "https://sociabuzz.com/hibobbb/tribe";

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 2400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => { setFadeOut(true); setTimeout(onDone, 600); }, 300);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#07031a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: fadeOut ? 0 : 1, transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(120,40,220,.22) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, letterSpacing: "-0.04em", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "linear-gradient(120deg,#a855f7 0%,#e879f9 50%,#38bdf8 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s ease infinite", marginBottom: 40 }}>
        Hibob Studios
      </h1>

      <div style={{ width: 160, marginBottom: 16 }}>
        <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,.07)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#7c3aed,#a855f7,#38bdf8)", borderRadius: 99, transition: "width 0.05s linear", boxShadow: "0 0 10px rgba(168,85,247,.7)" }} />
        </div>
      </div>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(168,85,247,.55)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{progress}%</p>

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
  const [hoverBtn, setHoverBtn] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const ease = "0.75s cubic-bezier(0.22,1,0.36,1)";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998, background: "#07031a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", overflow: "hidden" }}>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 15% 0%, rgba(110,35,190,.4) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 90% 100%, rgba(14,100,190,.22) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(100,30,200,.12) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", top: "10%", right: "8%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.18) 0%,transparent 70%)", filter: "blur(30px)", animation: "orbFloat1 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "6%", width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,.14) 0%,transparent 70%)", filter: "blur(24px)", animation: "orbFloat2 9s ease-in-out infinite" }} />
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 400 }}>

        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: 20, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity ${ease}, transform ${ease}`, transitionDelay: "0s" }}>
          <h1 style={{ fontSize: "clamp(36px,6vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "white", margin: 0 }}>
            Hey, I'm{" "}
            <span style={{ background: "linear-gradient(120deg,#a855f7 0%,#e879f9 45%,#38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              HibobTheDev.
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", lineHeight: 1.75, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 400, textAlign: "center", marginBottom: 36, maxWidth: 300, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity ${ease}, transform ${ease}`, transitionDelay: "0.1s" }}>
          Roblox developer. I code, build worlds, and stream sometimes. Let's see what I've made.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity ${ease}, transform ${ease}`, transitionDelay: "0.2s" }}>

          {/* View Portfolio */}
          <button onClick={onContinue}
            style={{ width: "100%", padding: "15px 24px", borderRadius: 12, border: "none", background: hoverBtn === "port" ? "linear-gradient(135deg,#6d28d9,#9333ea)" : "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", fontSize: 15, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)", boxShadow: hoverBtn === "port" ? "0 8px 50px rgba(168,85,247,.65)" : "0 4px 28px rgba(168,85,247,.38)", transform: hoverBtn === "port" ? "translateY(-2px)" : "translateY(0)", letterSpacing: "-0.01em" }}
            onMouseEnter={() => setHoverBtn("port")}
            onMouseLeave={() => setHoverBtn(null)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            View Portfolio
          </button>

          {/* Join Discord */}
          <a href={DISCORD_URL} target="_blank" rel="noreferrer"
            style={{ width: "100%", padding: "15px 24px", borderRadius: 12, border: hoverBtn === "discord" ? "1px solid rgba(88,101,242,.5)" : "1px solid rgba(255,255,255,.1)", background: hoverBtn === "discord" ? "rgba(88,101,242,.12)" : "rgba(255,255,255,.04)", color: hoverBtn === "discord" ? "#5865f2" : "rgba(255,255,255,.6)", fontSize: 15, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", backdropFilter: "blur(12px)", transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)", transform: hoverBtn === "discord" ? "translateY(-2px)" : "translateY(0)", letterSpacing: "-0.01em", boxSizing: "border-box" }}
            onMouseEnter={() => setHoverBtn("discord")}
            onMouseLeave={() => setHoverBtn(null)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3671C18.7975 3.5952 17.147 3.15372 15.4322 3C15.191 3.48697 14.9279 4.09496 14.7648 4.52599C12.9707 4.2236 11.1888 4.2236 9.41964 4.52599C9.25635 4.09496 8.98151 3.48697 8.74019 3C7.02464 3.15372 5.27502 3.60545 3.75703 4.3671C0.533642 9.54744 -0.319348 14.383 0.0991031 19.1577C2.04063 20.7879 3.92315 21.5633 5.75449 22.0976C6.29886 21.305 6.78464 20.4664 7.20039 19.5833C6.27339 19.265 5.37631 18.8688 4.51533 18.3791C4.69579 18.2346 4.87261 18.0922 5.04362 17.9429C9.35872 20.1343 14.1141 20.1343 18.4492 17.9429C18.6202 18.0922 18.797 18.2346 18.9775 18.3791C18.1165 18.8688 17.2194 19.265 16.2924 19.5833C16.7082 20.4664 17.194 21.305 17.7384 22.0976C19.5701 21.5633 21.4526 20.7879 23.3941 19.1577C23.9139 13.3949 22.7008 8.63644 20.317 4.3671ZM8.02109 16.6432C6.8581 16.6432 5.91247 15.6266 5.91247 14.3871C5.91247 13.1476 6.84051 12.1309 8.02109 12.1309C9.20167 12.1309 10.1472 13.1476 10.1472 14.3871C10.1472 15.6266 9.20167 16.6432 8.02109 16.6432ZM15.9775 16.6432C14.8145 16.6432 13.8689 15.6266 13.8689 14.3871C13.8689 13.1476 14.7969 12.1309 15.9775 12.1309C17.1581 12.1309 18.1036 13.1476 18.1036 14.3871C18.1036 15.6266 17.1581 16.6432 15.9775 16.6432Z" /></svg>
            Join Discord
          </a>

          {/* Donate */}
          <a href={DONATION_URL} target="_blank" rel="noreferrer"
            style={{ width: "100%", padding: "15px 24px", borderRadius: 12, border: hoverBtn === "don" ? "1px solid rgba(248,100,140,.45)" : "1px solid rgba(255,255,255,.1)", background: hoverBtn === "don" ? "rgba(248,100,140,.1)" : "rgba(255,255,255,.04)", color: hoverBtn === "don" ? "#f8648c" : "rgba(255,255,255,.6)", fontSize: 15, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", backdropFilter: "blur(12px)", transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)", transform: hoverBtn === "don" ? "translateY(-2px)" : "translateY(0)", letterSpacing: "-0.01em", boxSizing: "border-box" }}
            onMouseEnter={() => setHoverBtn("don")}
            onMouseLeave={() => setHoverBtn(null)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            Donate Me
          </a>
        </div>

        {/* Caption */}
        <p style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,.18)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 500, textAlign: "center", opacity: visible ? 1 : 0, transition: `opacity ${ease}`, transitionDelay: "0.32s" }}>
          English language version
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
export default function EntryWrapper() {
  const [phase, setPhase] = useState("loading");
  const [portfolioVisible, setPortfolioVisible] = useState(false);

  const handleLoadingDone = () => setPhase("entry");
  const handleContinue = () => {
    setPhase("portfolio");
    setTimeout(() => setPortfolioVisible(true), 80);
  };

  return (
    <>
      {phase === "loading" && <LoadingScreen onDone={handleLoadingDone} />}
      {phase === "entry" && <EntryPage onContinue={handleContinue} />}
      {phase === "portfolio" && (
        <div style={{ opacity: portfolioVisible ? 1 : 0, transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)" }}>
          <App />
        </div>
      )}
    </>
  );
}