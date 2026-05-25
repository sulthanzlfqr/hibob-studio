import { useState, useRef } from "react";
import qrisImg from "./assets/qris.png";

const DISCORD_URL = "https://discord.gg/qzCdpasNhG";
const PURCHASE_HUB_URL = "https://www.roblox.com/games/95916036763591/Hibob-Purchase-Hub";
const PARCEL_URL = "https://cockpit.parcelroblox.com/";

// ─── GANTI INI NANTI ────────────────────────────────────────────────
const WEBHOOK_URL = "https://discord.com/api/webhooks/1508425500564000820/1UYOB8QtG15PWHlgDW1IPC0l_rpHz_tShPW37GN51Twh0fg60EZumgQq_UT3eTfmo-1J";

const PAYMENT_METHODS = {
  bank: {
    label: "Bank Transfer",
    icon: "🏦",
    accounts: [
      { bank: "BRI", norek: "004601073296501", atas: "Rafli Sulthan Z" },
    ],
  },
  ewallet: {
    label: "Informasi E-Wallet",
    icon: "📱",
    accounts: [
      { name: "GoPay", no: "081223840395", atas: "Rafli Sulthan Z" },
      { name: "Dana", no: "081223840395", atas: "Rafli Sulthan Z" },
    ],
  },
  qris: {
    label: "QRIS",
    icon: "📷",
    image: qrisImg,
  },
  robux: {
    label: "Robux",
    icon: "🟡",
  },
};
// ────────────────────────────────────────────────────────────────────

const iconPaths = {
  arrowLeft: "M19 12H5M12 5l-7 7 7 7",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  copy: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M8 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2M8 4h8",
  discord: "",
};

function Icon({ name, size = 20 }) {
  if (name === "discord") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3671C18.7975 3.5952 17.147 3.15372 15.4322 3C15.191 3.48697 14.9279 4.09496 14.7648 4.52599C12.9707 4.2236 11.1888 4.2236 9.41964 4.52599C9.25635 4.09496 8.98151 3.48697 8.74019 3C7.02464 3.15372 5.27502 3.60545 3.75703 4.3671C0.533642 9.54744 -0.319348 14.383 0.0991031 19.1577C2.04063 20.7879 3.92315 21.5633 5.75449 22.0976C6.29886 21.305 6.78464 20.4664 7.20039 19.5833C6.27339 19.265 5.37631 18.8688 4.51533 18.3791C4.69579 18.2346 4.87261 18.0922 5.04362 17.9429C9.35872 20.1343 14.1141 20.1343 18.4492 17.9429C18.6202 18.0922 18.797 18.2346 18.9775 18.3791C18.1165 18.8688 17.2194 19.265 16.2924 19.5833C16.7082 20.4664 17.194 21.305 17.7384 22.0976C19.5701 21.5633 21.4526 20.7879 23.3941 19.1577C23.9139 13.3949 22.7008 8.63644 20.317 4.3671ZM8.02109 16.6432C6.8581 16.6432 5.91247 15.6266 5.91247 14.3871C5.91247 13.1476 6.84051 12.1309 8.02109 12.1309C9.20167 12.1309 10.1472 13.1476 10.1472 14.3871C10.1472 15.6266 9.20167 16.6432 8.02109 16.6432ZM15.9775 16.6432C14.8145 16.6432 13.8689 15.6266 13.8689 14.3871C13.8689 13.1476 14.7969 12.1309 15.9775 12.1309C17.1581 12.1309 18.1036 13.1476 18.1036 14.3871C18.1036 15.6266 17.1581 16.6432 15.9775 16.6432Z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={iconPaths[name]} />
    </svg>
  );
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={{ background: "rgba(168,85,247,.15)", border: "1px solid rgba(168,85,247,.3)", borderRadius: 8, padding: "4px 10px", color: copied ? "#4ade80" : "#c084fc", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all .2s", fontFamily: "inherit" }}>
      {copied ? <><Icon name="check" size={12} /> Copied!</> : <><Icon name="copy" size={12} /> Copy</>}
    </button>
  );
}

export default function CheckoutPage({ product, onBack }) {
  const [form, setForm] = useState({ name: "", discord: "", roblox: "", method: "" });
  const [proof, setProof] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { setError("Ukuran file tidak boleh melebihi 8MB."); return; }
    setProof(file);
    setProofPreview(URL.createObjectURL(file));
    setError("");
  };

  const canNext = form.name && form.discord && form.roblox;
  const canSubmit = form.method === "robux" ? true : (form.method && proof);

  const handleRobux = () => {
    window.open(PURCHASE_HUB_URL, "_blank");
  };

  const handleSubmit = async () => {
    if (form.method === "robux") { handleRobux(); return; }
    if (!canNext || !canSubmit) return;
    setSubmitting(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("files[0]", proof, proof.name);

      const payload = {
        embeds: [{
          title: `🛒 Order Baru — ${product.name}`,
          color: 0xa855f7,
          fields: [
            { name: "👤 Nama Lengkap", value: form.name, inline: true },
            { name: "💬 Discord", value: form.discord, inline: true },
            { name: "🎮 Roblox", value: form.roblox, inline: true },
            { name: "📦 Product", value: product.name, inline: true },
            { name: "💰 Metode Bayar", value: form.method.toUpperCase(), inline: true },
            { name: "⚠️ Reminder", value: "Cek bukti pembayaran di attachment. Whitelist via Parcel setelah terverifikasi.", inline: false },
          ],
          footer: { text: "HibobTheDev • Checkout System" },
          timestamp: new Date().toISOString(),
        }],
      };

      fd.append("payload_json", JSON.stringify(payload));

      const res = await fetch(WEBHOOK_URL, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Webhook gagal");

      setDone(true);
    } catch (e) {
      setError("Gagal mengirim pesanan. Silakan coba lagi atau hubungi kami melalui Discord.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: "#03010f", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap'); @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ textAlign: "center", maxWidth: 480, animation: "fadeIn .6s ease both" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>✓</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", marginBottom: 12, letterSpacing: "-0.03em" }}>Pesanan Terkirim!</h2>
          <p style={{ color: "rgba(255,255,255,.5)", lineHeight: 1.75, marginBottom: 8 }}>Bukti pembayaran Anda telah kami terima. Pesanan akan diverifikasi secara manual, dan akun Anda akan di-whitelist setelah pembayaran terkonfirmasi.</p>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>Pastikan akun Discord Anda telah terhubung dengan akun Roblox Anda di Parcel — karena sistem whitelist kami menggunakan Parcel.</p>
          <a href={PARCEL_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.3)", color: "#c084fc", fontWeight: 700, fontSize: 13, textDecoration: "none", marginBottom: 20 }}>🔗 Hubungkan Akun di Parcel →</a>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", fontWeight: 800, fontSize: 15, textDecoration: "none", marginBottom: 16 }}>
            <Icon name="discord" size={18} /> Bergabung ke Discord
          </a>
          <br />
          <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,.4)", fontSize: 14, cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}>← Kembali ke Portfolio</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#03010f", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "white" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .inp:focus { outline: none; border-color: rgba(168,85,247,.6) !important; background: rgba(168,85,247,.06) !important; }
        .method-card:hover { border-color: rgba(168,85,247,.4) !important; background: rgba(168,85,247,.06) !important; }
        .upload-zone:hover { border-color: rgba(168,85,247,.5) !important; background: rgba(168,85,247,.05) !important; }
      `}</style>

      {/* BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 20% 0%,rgba(110,35,190,.18) 0%,transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 620, margin: "0 auto", padding: "40px 24px 80px", animation: "fadeIn .5s ease both" }}>

        {/* Back */}
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "rgba(255,255,255,.45)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginBottom: 32, transition: "color .2s", padding: 0 }}
          onMouseEnter={(e) => e.currentTarget.style.color = "white"}
          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.45)"}>
          <Icon name="arrowLeft" size={16} /> Kembali
        </button>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", color: "#a855f7", textTransform: "uppercase", marginBottom: 8 }}>Pemesanan Produk</p>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 6 }}>{product.name}</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)" }}>{product.price}</p>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36 }}>
          {["Informasi Diri", "Pembayaran"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, transition: "all .3s", ...(step > i + 1 ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white" } : step === i + 1 ? { background: "rgba(168,85,247,.2)", border: "2px solid #a855f7", color: "#a855f7" } : { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.3)" }) }}>
                  {step > i + 1 ? <Icon name="check" size={12} /> : i + 1}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: step === i + 1 ? "white" : "rgba(255,255,255,.3)" }}>{s}</span>
              </div>
              {i < 1 && <div style={{ width: 32, height: 1, background: step > 1 ? "#a855f7" : "rgba(255,255,255,.1)", transition: "background .3s" }} />}
            </div>
          ))}
        </div>

        {/* STEP 1 — Info Diri */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "rgba(168,85,247,.06)", border: "1px solid rgba(168,85,247,.2)", borderRadius: 14, padding: "14px 18px", fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.65 }}>
              ⚠️ Setelah pesanan dikonfirmasi, pastikan akun Discord Anda telah terhubung dengan akun Roblox Anda di <a href={PARCEL_URL} target="_blank" rel="noreferrer" style={{color:"#a855f7",fontWeight:700}}>Parcel</a> — karena sistem whitelist kami menggunakan Parcel. Belum terhubung? <a href={PARCEL_URL} target="_blank" rel="noreferrer" style={{color:"#c084fc",fontWeight:700,textDecoration:"underline"}}>Klik di sini untuk menghubungkan akun →</a>
            </div>

            {[
              { key: "name", label: "Nama Lengkap", placeholder: "Masukkan nama lengkap Anda" },
              { key: "discord", label: "Username Discord", placeholder: "Contoh: username atau username#0000" },
              { key: "roblox", label: "Username Roblox", placeholder: "Masukkan username Roblox Anda" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 8 }}>{label}</label>
                <input className="inp" value={form[key]} onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: 12, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", color: "white", fontSize: 14, fontFamily: "inherit", transition: "all .2s" }} />
              </div>
            ))}

            <button onClick={() => canNext && setStep(2)} disabled={!canNext}
              style={{ marginTop: 8, padding: "14px", borderRadius: 12, border: "none", background: canNext ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(255,255,255,.06)", color: canNext ? "white" : "rgba(255,255,255,.3)", fontSize: 15, fontWeight: 800, cursor: canNext ? "pointer" : "not-allowed", transition: "all .2s", fontFamily: "inherit" }}>
              Lanjut ke Pembayaran →
            </button>
          </div>
        )}

        {/* STEP 2 — Pembayaran */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Pilih metode */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 12 }}>Metode Pembayaran</label>
              <div style={{ display: "flex", gap: 10 }}>
                {Object.entries(PAYMENT_METHODS).filter(([key]) => key !== "robux" || product.hasRobux).map(([key, val]) => (
                  <button key={key} className="method-card" onClick={() => setForm(f => ({ ...f, method: key }))}
                    style={{ flex: 1, padding: "12px 8px", borderRadius: 12, border: form.method === key ? "2px solid #a855f7" : "1px solid rgba(255,255,255,.1)", background: form.method === key ? "rgba(168,85,247,.12)" : "rgba(255,255,255,.03)", color: "white", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", transition: "all .2s", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 22 }}>{val.icon}</span>
                    <span style={{ color: form.method === key ? "#c084fc" : "rgba(255,255,255,.5)" }}>{val.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail pembayaran */}
            {form.method === "bank" && (
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", textTransform: "uppercase" }}>Rekening Bank</p>
                {PAYMENT_METHODS.bank.accounts.map((acc, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(255,255,255,.04)", borderRadius: 10 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 800, marginBottom: 3 }}>{acc.bank}</p>
                      <p style={{ fontSize: 15, fontWeight: 900, letterSpacing: ".04em", color: "#c084fc" }}>{acc.norek}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>a/n {acc.atas}</p>
                    </div>
                    <CopyBtn text={acc.norek} />
                  </div>
                ))}
              </div>
            )}

            {form.method === "ewallet" && (
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", textTransform: "uppercase" }}>E-Wallet</p>
                {PAYMENT_METHODS.ewallet.accounts.map((acc, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(255,255,255,.04)", borderRadius: 10 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 800, marginBottom: 3 }}>{acc.name}</p>
                      <p style={{ fontSize: 15, fontWeight: 900, letterSpacing: ".04em", color: "#c084fc" }}>{acc.no}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>a/n {acc.atas}</p>
                    </div>
                    <CopyBtn text={acc.no} />
                  </div>
                ))}
              </div>
            )}

            {form.method === "qris" && (
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 18, textAlign: "center" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Scan QRIS</p>
                <img src={PAYMENT_METHODS.qris.image} alt="QRIS" style={{ width: 200, height: 200, objectFit: "contain", borderRadius: 12, background: "white", padding: 8 }} />
              </div>
            )}

            {/* Upload bukti — sembunyikan kalau robux */}
            {form.method !== "robux" && <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.6)", display: "block", marginBottom: 10 }}>Upload Bukti Pembayaran <span style={{color:"#f87171",fontWeight:900}}>*</span></label>
              <div className="upload-zone" onClick={() => fileRef.current.click()}
                style={{ border: "2px dashed rgba(255,255,255,.15)", borderRadius: 14, padding: "24px 16px", textAlign: "center", cursor: "pointer", transition: "all .2s", position: "relative" }}>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
                {proofPreview ? (
                  <div>
                    <img src={proofPreview} alt="Bukti" style={{ maxHeight: 180, maxWidth: "100%", borderRadius: 10, objectFit: "contain" }} />
                    <p style={{ fontSize: 12, color: "#4ade80", fontWeight: 600, marginTop: 10 }}>✓ {proof.name}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 4 }}>Klik untuk mengganti file</p>
                  </div>
                ) : (
                  <div>
                    <div style={{ color: "rgba(255,255,255,.3)", marginBottom: 10 }}><Icon name="upload" size={28} /></div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.5)" }}>Klik untuk mengunggah bukti pembayaran</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,.25)", marginTop: 6 }}>Format: JPG, PNG, WEBP — Maksimal 8MB</p>
                  </div>
                )}
              </div>
            </div>}

            {/* Discord reminder */}
            <div style={{ background: "rgba(88,101,242,.08)", border: "1px solid rgba(88,101,242,.25)", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ color: "#5865f2", flexShrink: 0, marginTop: 2 }}><Icon name="discord" size={18} /></div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 4 }}>Wajib Bergabung ke Discord!</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>Setelah pesanan dikonfirmasi, produk dapat diambil melalui server Discord kami. Pastikan Anda telah bergabung sebelum proses whitelist dilakukan.</p>
                <a href={DISCORD_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 12, fontWeight: 700, color: "#5865f2", textDecoration: "none" }}>
                  Bergabung ke Discord →
                </a>
              </div>
            </div>

            {error && <p style={{ fontSize: 13, color: "#f87171", fontWeight: 600, textAlign: "center" }}>{error}</p>}

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ padding: "14px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "rgba(255,255,255,.6)", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}>
                ← Kembali
              </button>
              <button onClick={handleSubmit} disabled={!canSubmit || submitting}
                style={{ flex: 1, padding: "14px", borderRadius: 12, border: "none", background: canSubmit && !submitting ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(255,255,255,.06)", color: canSubmit && !submitting ? "white" : "rgba(255,255,255,.3)", fontSize: 15, fontWeight: 800, cursor: canSubmit && !submitting ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all .2s" }}>
                {form.method === "robux" ? "Beli di Purchase Hub →" : submitting ? "Mengirim Pesanan..." : "Kirim Pesanan ✓"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}