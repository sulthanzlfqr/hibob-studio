import { useState, useRef } from "react";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../data/products";
import qrisImg from "../assets/qris.png";

const DISCORD_URL = "https://discord.gg/qzCdpasNhG";
const ORDER_API = import.meta.env.VITE_ORDER_API_URL || "/api/order";
const ORDERS_KEY = "hibob_orders_v1";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_BYTES = 5 * 1024 * 1024;

function saveOrderLocally(order) {
  try {
    const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    existing.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch {}
}

// ─── Reusable UI primitives (same design tokens as App.jsx) ──────────────────
const BG = "#03010f";
const SURFACE = "rgba(255,255,255,.04)";
const BORDER = "rgba(255,255,255,.08)";
const PURPLE = "#a855f7";
const PURPLE_BG = "rgba(168,85,247,.1)";
const PURPLE_BORDER = "rgba(168,85,247,.28)";

function inputStyle(focused) {
  return {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    background: SURFACE,
    border: `1px solid ${focused ? PURPLE_BORDER : BORDER}`,
    color: "white",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color .2s",
    boxSizing: "border-box",
  };
}

function Field({ label, required, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", letterSpacing: ".04em", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: PURPLE, marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {error && <span style={{ fontSize: 12, color: "#f87171", fontWeight: 500 }}>{error}</span>}
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────
function SuccessView({ orderId, onDone }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 24px", gap: 20 }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </div>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 8 }}>Order Berhasil Dikirim!</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>
          Bukti pembayaran sudah kami terima. Tim Hibob Studio akan memverifikasi dan menghubungi kamu via Discord.
        </p>
      </div>
      <div style={{ padding: "16px 24px", borderRadius: 14, background: PURPLE_BG, border: `1px solid ${PURPLE_BORDER}`, width: "100%", maxWidth: 320 }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.45)", marginBottom: 4, fontWeight: 600 }}>Order ID</p>
        <p style={{ fontSize: 22, fontWeight: 900, fontFamily: "monospace", color: "white", letterSpacing: ".08em" }}>{orderId}</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 4 }}>Simpan ID ini sebagai referensi</p>
      </div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.7, maxWidth: 380 }}>
        Estimasi verifikasi: <strong style={{ color: "rgba(255,255,255,.7)" }}>1–24 jam</strong> pada hari kerja. Jika lebih dari 24 jam belum ada konfirmasi, hubungi kami di Discord.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <a href={DISCORD_URL} target="_blank" rel="noreferrer"
          style={{ padding: "11px 22px", borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "1px solid rgba(168,85,247,.5)", color: "white", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37C18.787 3.58 17.147 3 15.432 3c-.179.339-.386.795-.53 1.156-1.893-.28-3.77-.28-5.63 0-.14-.36-.357-.817-.537-1.156C7.147 3 5.507 3.58 3.977 4.37 1.004 8.9.22 13.3.534 17.64c2.04 1.53 4.02 2.46 5.97 3.07.48-.66.907-1.37 1.27-2.12-.696-.27-1.36-.6-1.98-.99.165-.12.33-.25.487-.38 3.817 1.8 7.96 1.8 11.74 0 .16.13.32.26.487.38-.62.39-1.29.72-1.98.99.363.75.79 1.46 1.27 2.12 1.95-.61 3.93-1.54 5.97-3.07.38-4.96-.663-9.32-2.773-13.27zM8.02 15.33c-1.182 0-2.157-1.1-2.157-2.44 0-1.34.956-2.44 2.157-2.44 1.2 0 2.175 1.1 2.157 2.44 0 1.34-.956 2.44-2.157 2.44zm7.975 0c-1.183 0-2.157-1.1-2.157-2.44 0-1.34.955-2.44 2.157-2.44 1.2 0 2.175 1.1 2.157 2.44 0 1.34-.955 2.44-2.157 2.44z" /></svg>
          Hubungi di Discord
        </a>
        <button onClick={onDone}
          style={{ padding: "11px 22px", borderRadius: 12, background: SURFACE, border: `1px solid ${BORDER}`, color: "rgba(255,255,255,.6)", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

// ─── Main Checkout Page ───────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { enrichedItems, getTotal, clearCart } = useCart();
  const total = getTotal();

  const [form, setForm] = useState({ customerName: "", customerDiscord: "", customerEmail: "", website: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const fileRef = useRef(null);

  const goBack = () => { window.location.hash = ""; };

  // Empty cart guard
  if (enrichedItems.length === 0 && !orderId) {
    return (
      <PageShell onBack={goBack}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 24px", gap: 16, textAlign: "center" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(168,85,247,.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
          <p style={{ fontSize: 16, fontWeight: 700, color: "white" }}>Keranjang kosong</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)" }}>Tambahkan produk sebelum checkout.</p>
          <button onClick={goBack} style={{ padding: "11px 22px", borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "none", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
            Lihat Produk
          </button>
        </div>
      </PageShell>
    );
  }

  if (orderId) {
    return (
      <PageShell onBack={goBack}>
        <SuccessView orderId={orderId} onDone={goBack} />
      </PageShell>
    );
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrors((prev) => ({ ...prev, proofImage: undefined }));

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, proofImage: "Format tidak didukung. Gunakan JPG, PNG, atau WEBP." }));
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setErrors((prev) => ({ ...prev, proofImage: "Ukuran file maksimal 5 MB." }));
      return;
    }
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
  }

  function validate() {
    const errs = {};
    if (!form.customerName.trim()) errs.customerName = "Nama wajib diisi.";
    if (!form.customerDiscord.trim()) errs.customerDiscord = "Discord username wajib diisi.";
    if (!proofFile) errs.proofImage = "Bukti transfer wajib diunggah.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError(null);

    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);

    const itemsPayload = enrichedItems.map((ei) => ({
      productId: ei.productId,
      name: ei.product.name,
      price: ei.product.price,
      quantity: ei.quantity,
      subtotal: ei.subtotal,
    }));

    const fd = new FormData();
    fd.append("customerName", form.customerName.trim());
    fd.append("customerDiscord", form.customerDiscord.trim());
    fd.append("customerEmail", form.customerEmail.trim());
    fd.append("website", form.website); // honeypot
    fd.append("items", JSON.stringify(itemsPayload));
    fd.append("total", String(total));
    fd.append("proofImage", proofFile, proofFile.name);

    try {
      const res = await fetch(ORDER_API, { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Terjadi kesalahan. Coba lagi.");
        setSubmitting(false);
        return;
      }

      // Save order locally
      saveOrderLocally({
        orderId: data.orderId,
        createdAt: new Date().toISOString(),
        customerName: form.customerName.trim(),
        customerDiscord: form.customerDiscord.trim(),
        customerEmail: form.customerEmail.trim(),
        items: itemsPayload,
        total,
        paymentMethod: "QRIS",
        merchantName: "Mutual Space Store",
        status: "WAITING_VERIFICATION",
      });

      clearCart();
      setOrderId(data.orderId);
    } catch {
      setSubmitError("Gagal terhubung ke server. Pastikan koneksi internet aktif.");
      setSubmitting(false);
    }
  }

  return (
    <PageShell onBack={goBack}>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 32, padding: "0 0 48px" }}>

        {/* ── Order Summary ──────────────────────────────────────────────── */}
        <Section title="Ringkasan Pesanan">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {enrichedItems.map((ei) => (
              <div key={ei.productId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 12, background: SURFACE, border: `1px solid ${BORDER}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{ei.product.name}</span>
                  {ei.product.category === "plan" && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: PURPLE_BG, border: `1px solid ${PURPLE_BORDER}`, color: PURPLE }}>
                      {ei.product.duration}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: PURPLE }}>{ei.product.price}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: 12, background: PURPLE_BG, border: `1px solid ${PURPLE_BORDER}`, marginTop: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 800 }}>Total</span>
            <span style={{ fontSize: 20, fontWeight: 900, background: "linear-gradient(135deg,#a855f7,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {formatPrice(total)}
            </span>
          </div>
        </Section>

        {/* ── Payment ───────────────────────────────────────────────────── */}
        <Section title="Pembayaran">
          <div style={{ padding: "20px", borderRadius: 16, background: SURFACE, border: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 4 }}>Transfer melalui QRIS merchant resmi Hibob Studio</p>
              <p style={{ fontSize: 15, fontWeight: 800, color: "white" }}>Mutual Space Store</p>
            </div>

            <div style={{ padding: 12, background: "white", borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,.4)" }}>
              <img src={qrisImg} alt="QRIS Mutual Space Store" style={{ width: "min(260px, 72vw)", height: "auto", display: "block" }} />
            </div>

            <div style={{ textAlign: "center", padding: "12px 16px", borderRadius: 10, background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.25)", width: "100%" }}>
              <p style={{ fontSize: 13, color: "rgba(245,158,11,.9)", lineHeight: 1.6 }}>
                Scan QRIS di atas menggunakan GoPay, OVO, Dana, atau mobile banking manapun. Masukkan nominal sesuai total di atas.
              </p>
            </div>

            <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)", textAlign: "center", lineHeight: 1.6 }}>
              Setelah pembayaran berhasil, upload screenshot bukti transfer di bawah. Produk akan ditambahkan ke akun setelah verifikasi manual oleh tim Hibob Studio.
            </p>
          </div>
        </Section>

        {/* ── Buyer Info ────────────────────────────────────────────────── */}
        <Section title="Informasi Pembeli">
          <div style={{ display: "grid", gap: 16 }}>
            <Field label="Nama Lengkap" required error={errors.customerName}>
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => { setForm((f) => ({ ...f, customerName: e.target.value })); setErrors((err) => ({ ...err, customerName: undefined })); }}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Nama kamu"
                maxLength={80}
                style={inputStyle(focusedField === "name")}
              />
            </Field>
            <Field label="Discord Username" required error={errors.customerDiscord}>
              <input
                type="text"
                value={form.customerDiscord}
                onChange={(e) => { setForm((f) => ({ ...f, customerDiscord: e.target.value })); setErrors((err) => ({ ...err, customerDiscord: undefined })); }}
                onFocus={() => setFocusedField("discord")}
                onBlur={() => setFocusedField(null)}
                placeholder="username (tanpa #)"
                maxLength={64}
                style={inputStyle(focusedField === "discord")}
              />
            </Field>
            <Field label="Email" error={errors.customerEmail}>
              <input
                type="email"
                value={form.customerEmail}
                onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="email@example.com (opsional)"
                style={inputStyle(focusedField === "email")}
              />
            </Field>
            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
              tabIndex={-1}
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
              autoComplete="off"
            />
          </div>
        </Section>

        {/* ── Proof Upload ──────────────────────────────────────────────── */}
        <Section title="Bukti Transfer">
          <div
            onClick={() => fileRef.current?.click()}
            style={{ cursor: "pointer", borderRadius: 14, border: `2px dashed ${errors.proofImage ? "#f87171" : proofPreview ? PURPLE_BORDER : BORDER}`, padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transition: "border-color .2s", background: proofPreview ? PURPLE_BG : SURFACE }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) { fileRef.current.files = e.dataTransfer.files; handleFileChange({ target: fileRef.current }); } }}
          >
            {proofPreview ? (
              <>
                <img src={proofPreview} alt="Preview bukti transfer" style={{ maxHeight: 180, maxWidth: "100%", borderRadius: 10, objectFit: "contain" }} />
                <p style={{ fontSize: 12, color: PURPLE, fontWeight: 600 }}>{proofFile?.name}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>Klik untuk ganti file</p>
              </>
            ) : (
              <>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(168,85,247,.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 4 }}>Upload Bukti Transfer</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>JPG, PNG, WEBP · Maks 5 MB</p>
                </div>
              </>
            )}
            <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleFileChange} style={{ display: "none" }} />
          </div>
          {errors.proofImage && <span style={{ fontSize: 12, color: "#f87171", fontWeight: 500 }}>{errors.proofImage}</span>}
        </Section>

        {/* ── Submit ────────────────────────────────────────────────────── */}
        {submitError && (
          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.25)", fontSize: 13, color: "#f87171", lineHeight: 1.6 }}>
            {submitError}
          </div>
        )}

        <button type="submit" disabled={submitting}
          style={{ padding: "16px 0", borderRadius: 14, border: "none", background: submitting ? "rgba(168,85,247,.4)" : "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", fontSize: 15, fontWeight: 800, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "opacity .2s", boxShadow: submitting ? "none" : "0 0 30px rgba(168,85,247,.35)" }}>
          {submitting ? (
            <>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,.3)", borderTopColor: "white", animation: "spin .7s linear infinite" }} />
              Mengirim Order...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Kirim Order & Bukti Bayar
            </>
          )}
        </button>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </form>
    </PageShell>
  );
}

// ─── Layout shell ─────────────────────────────────────────────────────────────
function PageShell({ onBack, children }) {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "white" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#03010f} ::-webkit-scrollbar-thumb{background:linear-gradient(#a855f7,#38bdf8);border-radius:99px}
        ::selection{background:rgba(168,85,247,.35)}
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 10% 0%,rgba(110,35,190,.18) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,.06)", backdropFilter: "blur(20px)", background: "rgba(3,1,15,.6)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "rgba(255,255,255,.5)", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", padding: "6px 0", transition: "color .2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "white"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.5)"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Kembali
          </button>
          <span style={{ fontSize: 14, fontWeight: 900, letterSpacing: "-0.03em", background: "linear-gradient(120deg,#a855f7,#e879f9,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Hibob Studio
          </span>
          <div style={{ width: 60 }} />
        </div>
      </header>

      {/* Content */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 999, border: `1px solid ${PURPLE_BORDER}`, background: PURPLE_BG, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: PURPLE, letterSpacing: ".12em", textTransform: "uppercase" }}>Checkout</span>
          </div>
          <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Selesaikan Pembelian
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
    </div>
  );
}
