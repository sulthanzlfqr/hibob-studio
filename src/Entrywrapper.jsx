// src/EntryWrapper.jsx

import { useState, useEffect } from "react";
import App from "./App";

const DONATION_URL = "https://sociabuzz.com/hibobbb/tribe";

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 2300;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onDone, 550);
        }, 350);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#07031a",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 0,
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.55s cubic-bezier(0.22,1,0.36,1)",
    }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(120,40,220,.22) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      {/* Studio name */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <h1 style={{
          fontSize: "clamp(32px,5vw,52px)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          background: "linear-gradient(120deg, #a855f7 0%, #e879f9 50%, #38bdf8 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmer 3s ease infinite",
          margin: 0,
        }}>
          Hibob Studios
        </h1>
      </div>

      {/* Progress bar */}
      <div style={{ width: 160, marginBottom: 20 }}>
        <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,.07)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #7c3aed, #a855f7, #38bdf8)",
            borderRadius: 99,
            transition: "width 0.05s linear",
            boxShadow: "0 0 10px rgba(168,85,247,.7)",
          }} />
        </div>
      </div>

      {/* Bottom text */}
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
        color: "rgba(255,255,255,.25)", textTransform: "uppercase",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {progress}%
      </p>

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
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const ease = "0.7s cubic-bezier(0.22,1,0.36,1)";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9998,
      background: "#07031a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 24px",
    }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 65% at 15% 10%, rgba(110,35,190,.35) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 88% 85%, rgba(14,100,190,.18) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 360 }}>

        {/* Headline */}
        <div style={{
          textAlign: "center", marginBottom: 14,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: `opacity ${ease}, transform ${ease}`,
          transitionDelay: "0s",
        }}>
          <h1 style={{
            fontSize: "clamp(32px,6vw,48px)", fontWeight: 900,
            letterSpacing: "-0.04em", lineHeight: 1.1,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "white", margin: 0,
          }}>
            Selamat Datang,{" "}
            <span style={{
              background: "linear-gradient(120deg,#a855f7 0%,#e879f9 45%,#38bdf8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              guys!
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p style={{
          fontSize: 15, color: "rgba(255,255,255,.42)", lineHeight: 1.75,
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400,
          textAlign: "center", marginBottom: 48, maxWidth: 300,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: `opacity ${ease}, transform ${ease}`,
          transitionDelay: "0.1s",
        }}>
          Gua HibobTheDev — Roblox developer yang suka bikin game, ngoding, dan kadang streaming. Mau ngapain nih?
        </p>

        {/* Buttons — vertikal, equal width */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 10, width: "100%",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: `opacity ${ease}, transform ${ease}`,
          transitionDelay: "0.2s",
        }}>

          {/* Lihat Portfolio */}
          <button
            onClick={onContinue}
            style={{
              width: "100%", padding: "16px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "white", fontSize: 15, fontWeight: 800,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: "0 4px 24px rgba(168,85,247,.4)",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = ".88"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(168,85,247,.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 24px rgba(168,85,247,.4)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            Lihat Portfolio
          </button>

          {/* Donasi */}
          <a
            href={DONATION_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              width: "100%", padding: "16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,.1)",
              background: "rgba(255,255,255,.04)",
              color: "rgba(255,255,255,.6)", fontSize: 15, fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              textDecoration: "none",
              transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
              letterSpacing: "-0.01em",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(248,100,140,.09)"; e.currentTarget.style.borderColor = "rgba(248,100,140,.35)"; e.currentTarget.style.color = "#f8648c"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.6)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Dukung / Donasi
          </a>
        </div>

        {/* Caption */}
        <p style={{
          marginTop: 20, fontSize: 12,
          color: "rgba(255,255,255,.18)",
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500,
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transition: `opacity ${ease}`,
          transitionDelay: "0.35s",
        }}>
          Portfolio tersedia dalam Bahasa Indonesia & English
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
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