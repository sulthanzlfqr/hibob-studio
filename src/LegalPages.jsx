// src/LegalPages.jsx — Privacy Policy, Terms of Service, Roblox Compliance

const PANEL_URL = "https://panel.hibobstudio.com";
const DISCORD_URL = "https://discord.gg/qzCdpasNhG";

function LegalLayout({ title, badge, children }) {
  return (
    <div style={{ background: "#03010f", minHeight: "100vh", color: "white" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#03010f} ::-webkit-scrollbar-thumb{background:linear-gradient(#a855f7,#38bdf8);border-radius:99px}
        ::selection{background:rgba(168,85,247,.35)}
        .legal-h2 { font-size: 18px; font-weight: 800; color: white; margin-top: 36px; margin-bottom: 12px; }
        .legal-h3 { font-size: 15px; font-weight: 700; color: rgba(255,255,255,.85); margin-top: 22px; margin-bottom: 8px; }
        .legal-p { font-size: 14px; color: rgba(255,255,255,.5); line-height: 1.85; margin-bottom: 12px; }
        .legal-ul { padding-left: 20px; margin-bottom: 14px; }
        .legal-ul li { font-size: 14px; color: rgba(255,255,255,.5); line-height: 1.85; margin-bottom: 6px; }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 10% 0%,rgba(110,35,190,.18) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,.06)", backdropFilter: "blur(20px)", background: "rgba(3,1,15,.6)", padding: "0 24px" }}>
        <nav style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
          <a href="#home" onClick={() => { window.location.hash = ""; window.location.reload(); }} style={{ fontSize: 15, fontWeight: 900, letterSpacing: "-0.03em", background: "linear-gradient(120deg,#a855f7,#e879f9,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textDecoration: "none", cursor: "pointer" }}>
            Hibob Studio
          </a>
          <a href="#home" onClick={(e) => { e.preventDefault(); window.location.hash = ""; window.location.reload(); }} style={{ fontSize: 13, color: "rgba(255,255,255,.5)", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "color .2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "white"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.5)"}>
            ← Kembali ke Beranda
          </a>
        </nav>
      </header>

      {/* Content */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "64px 24px 96px" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 999, border: "1px solid rgba(168,85,247,.25)", background: "rgba(168,85,247,.07)", marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#c084fc", letterSpacing: ".12em", textTransform: "uppercase" }}>{badge}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 12, background: "linear-gradient(120deg,#a855f7 0%,#e879f9 45%,#38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {title}
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.3)", marginBottom: 48, fontWeight: 500 }}>
          Terakhir diperbarui: 30 Mei 2026
        </p>

        {/* Legal Content */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 40 }}>
          {children}
        </div>
      </main>

      {/* Footer minimal */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "20px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.2)" }}>© 2026 Hibob Studio. Seluruh hak cipta dilindungi.</span>
          <div style={{ display: "flex", gap: 18 }}>
            {[
              { label: "Kebijakan Privasi", href: "#/privacy" },
              { label: "Syarat Layanan", href: "#/terms" },
              { label: "Kepatuhan Roblox", href: "#/roblox-compliance" },
            ].map((l) => (
              <a key={l.label} href={l.href} style={{ fontSize: 12, color: "rgba(255,255,255,.3)", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.3)"}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Privacy Policy ───────────────────────────────────────────────────────────
export function PrivacyPage() {
  return (
    <LegalLayout title="Kebijakan Privasi" badge="Legal · Privacy Policy">
      <p className="legal-p">
        Kebijakan Privasi ini menjelaskan bagaimana Hibob Studio mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan platform kami, termasuk Creator Panel, Audio Forge, License Manager, Donation System, dan layanan terkait lainnya.
      </p>

      <h2 className="legal-h2">1. Informasi yang Kami Kumpulkan</h2>

      <h3 className="legal-h3">1.1 Login Discord</h3>
      <p className="legal-p">Saat Anda menghubungkan akun Discord, kami mengumpulkan:</p>
      <ul className="legal-ul">
        <li>ID pengguna Discord (user ID)</li>
        <li>Nama pengguna dan avatar Discord</li>
        <li>Email yang terdaftar di Discord (hanya untuk keperluan verifikasi)</li>
        <li>Server Discord yang Anda ikuti (hanya server yang relevan untuk fitur whitelist)</li>
      </ul>

      <h3 className="legal-h3">1.2 Login Roblox</h3>
      <p className="legal-p">Saat Anda menghubungkan akun Roblox, kami mengumpulkan:</p>
      <ul className="legal-ul">
        <li>ID pengguna Roblox (user ID)</li>
        <li>Nama pengguna Roblox</li>
        <li>Avatar Roblox (untuk tampilan profil di platform)</li>
        <li>Grup Roblox yang Anda ikuti (hanya yang relevan untuk fitur verifikasi)</li>
      </ul>

      <h3 className="legal-h3">1.3 Data Aset dan Audio</h3>
      <p className="legal-p">Saat Anda menggunakan Audio Forge atau Asset Manager, kami menyimpan:</p>
      <ul className="legal-ul">
        <li>Metadata file audio yang Anda upload (nama file, durasi, format)</li>
        <li>Asset ID Roblox yang dihasilkan dari proses upload</li>
        <li>Riwayat proses konversi dan publikasi</li>
        <li>File audio yang diupload disimpan sementara untuk keperluan proses dan dihapus setelah selesai</li>
      </ul>

      <h3 className="legal-h3">1.4 Data Lisensi</h3>
      <p className="legal-p">Untuk License Manager, kami menyimpan:</p>
      <ul className="legal-ul">
        <li>Identitas pembeli (ID Discord dan/atau ID Roblox)</li>
        <li>Produk yang dibeli dan tanggal pembelian</li>
        <li>Status lisensi (aktif, kedaluwarsa, dicabut)</li>
        <li>Universe ID Roblox yang terdaftar untuk lisensi</li>
      </ul>

      <h3 className="legal-h3">1.5 Data Donasi</h3>
      <p className="legal-p">Untuk Donation System, kami memproses:</p>
      <ul className="legal-ul">
        <li>Data transaksi dari platform donasi pihak ketiga (Bagibagi)</li>
        <li>Identitas donator (sesuai yang diberikan platform donasi)</li>
        <li>Jumlah dan pesan donasi</li>
      </ul>

      <h2 className="legal-h2">2. Cara Kami Menggunakan Informasi</h2>
      <p className="legal-p">Informasi yang dikumpulkan digunakan untuk:</p>
      <ul className="legal-ul">
        <li>Menyediakan dan menjalankan layanan platform Hibob Studio</li>
        <li>Memverifikasi identitas pengguna lintas Discord dan Roblox</li>
        <li>Mengotomasi proses whitelist dan distribusi lisensi</li>
        <li>Memproses dan meneruskan notifikasi donasi ke experience Roblox</li>
        <li>Mengelola quota dan batasan penggunaan sesuai paket Creator Panel</li>
        <li>Meningkatkan kualitas layanan dan mengidentifikasi masalah teknis</li>
      </ul>

      <h2 className="legal-h2">3. Penyimpanan dan Keamanan Data</h2>
      <p className="legal-p">
        Kami menyimpan data pengguna di server yang aman dengan enkripsi standar industri. Token akses Discord dan Roblox tidak pernah disimpan dalam bentuk plaintext. File audio yang diupload untuk proses dienkripsi saat transit dan dihapus setelah proses selesai.
      </p>
      <p className="legal-p">
        Kami tidak menjual, menyewakan, atau membagikan data pengguna kepada pihak ketiga untuk tujuan komersial. Data hanya dibagikan kepada penyedia layanan infrastruktur yang diperlukan untuk menjalankan platform (hosting, database, CDN).
      </p>

      <h2 className="legal-h2">4. Hak Pengguna</h2>
      <p className="legal-p">Anda memiliki hak untuk:</p>
      <ul className="legal-ul">
        <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
        <li>Meminta penghapusan akun dan seluruh data terkait</li>
        <li>Memutuskan koneksi akun Discord atau Roblox dari platform</li>
        <li>Mengekspor data lisensi dan riwayat penggunaan Anda</li>
      </ul>
      <p className="legal-p">
        Untuk mengajukan permintaan terkait data, hubungi kami melalui Discord server Hibob Studio.
      </p>

      <h2 className="legal-h2">5. Cookie dan Penyimpanan Lokal</h2>
      <p className="legal-p">
        Platform kami menggunakan session token yang disimpan di browser untuk menjaga sesi login Anda. Token ini kedaluwarsa secara otomatis setelah periode tidak aktif. Kami tidak menggunakan cookie tracking atau analytics pihak ketiga.
      </p>

      <h2 className="legal-h2">6. Perubahan Kebijakan</h2>
      <p className="legal-p">
        Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan signifikan akan diumumkan melalui Discord server Hibob Studio. Penggunaan platform setelah perubahan dianggap sebagai penerimaan kebijakan yang diperbarui.
      </p>

      <h2 className="legal-h2">7. Kontak</h2>
      <p className="legal-p">
        Pertanyaan terkait kebijakan privasi dapat diajukan melalui:{" "}
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" style={{ color: "#a855f7", textDecoration: "none" }}>Discord Server Hibob Studio</a>
      </p>
    </LegalLayout>
  );
}

// ─── Terms of Service ─────────────────────────────────────────────────────────
export function TermsPage() {
  return (
    <LegalLayout title="Syarat Layanan" badge="Legal · Terms of Service">
      <p className="legal-p">
        Dengan menggunakan layanan Hibob Studio, Anda menyetujui syarat dan ketentuan yang dijelaskan dalam dokumen ini. Baca dengan seksama sebelum menggunakan platform.
      </p>

      <h2 className="legal-h2">1. Penerimaan Syarat</h2>
      <p className="legal-p">
        Dengan mengakses atau menggunakan platform Hibob Studio (termasuk Creator Panel, Audio Forge, License Manager, Donation System, dan layanan terkait), Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh syarat layanan ini.
      </p>
      <p className="legal-p">
        Jika Anda tidak menyetujui syarat ini, Anda tidak diizinkan untuk menggunakan layanan kami.
      </p>

      <h2 className="legal-h2">2. Deskripsi Layanan</h2>
      <p className="legal-p">
        Hibob Studio menyediakan platform infrastruktur untuk creator Roblox, mencakup:
      </p>
      <ul className="legal-ul">
        <li>Creator Panel — dashboard manajemen terpusat</li>
        <li>Audio Forge — pipeline konversi dan publikasi audio ke Roblox</li>
        <li>License Manager — sistem lisensi dan distribusi produk digital</li>
        <li>Asset Manager — repositori dan manajemen aset</li>
        <li>Donation System — sistem donasi terintegrasi Roblox</li>
        <li>Produk komersial (Club Kit, Music System, Visual System)</li>
      </ul>

      <h2 className="legal-h2">3. Akun dan Keamanan</h2>
      <p className="legal-p">
        Akun platform dibuat melalui autentikasi Discord dan/atau Roblox. Anda bertanggung jawab untuk menjaga keamanan akses ke akun Anda. Hibob Studio tidak bertanggung jawab atas kerugian yang timbul dari akses tidak sah ke akun Anda akibat kelalaian Anda sendiri.
      </p>

      <h2 className="legal-h2">4. Paket dan Pembayaran</h2>
      <h3 className="legal-h3">4.1 Paket Creator Panel</h3>
      <p className="legal-p">
        Paket berbayar (Creator Basic dan Creator Pro) diaktifkan untuk periode yang ditentukan sejak tanggal pembayaran. Paket tidak diperpanjang secara otomatis kecuali dinyatakan sebaliknya. Tidak ada pengembalian dana setelah aktivasi paket.
      </p>

      <h3 className="legal-h3">4.2 Produk Komersial</h3>
      <p className="legal-p">
        Pembelian produk komersial (Club Kit, Music System, Visual System) bersifat permanen (one-time purchase) dan mencakup akses seumur hidup ke versi yang dibeli beserta pembaruan pada versi yang sama. Hibob Studio berhak merilis versi baru dengan harga terpisah.
      </p>

      <h2 className="legal-h2">5. Penggunaan yang Diizinkan</h2>
      <p className="legal-p">Anda diizinkan untuk:</p>
      <ul className="legal-ul">
        <li>Menggunakan layanan untuk keperluan pribadi atau komersial yang sah</li>
        <li>Mengintegrasikan produk ke dalam experience Roblox milik Anda</li>
        <li>Menggunakan API (jika tersedia) sesuai dokumentasi dan batas yang ditetapkan</li>
      </ul>
      <p className="legal-p">Anda tidak diizinkan untuk:</p>
      <ul className="legal-ul">
        <li>Mendistribusikan ulang, menjual, atau memberikan akses produk berlisensi kepada pihak lain</li>
        <li>Melakukan reverse engineering, deobfuscation, atau modifikasi produk yang dilindungi</li>
        <li>Menggunakan layanan untuk tujuan yang melanggar hukum atau Ketentuan Layanan Roblox</li>
        <li>Mencoba mengakses sistem atau data pengguna lain tanpa izin</li>
        <li>Menyalahgunakan kuota upload atau konversi melebihi batas paket</li>
      </ul>

      <h2 className="legal-h2">6. Hak Kekayaan Intelektual</h2>
      <p className="legal-p">
        Seluruh produk, kode, desain, dan konten yang dibuat oleh Hibob Studio adalah kekayaan intelektual eksklusif Hibob Studio. Pembelian memberikan lisensi penggunaan, bukan kepemilikan produk.
      </p>
      <p className="legal-p">
        Konten yang Anda upload ke platform (audio, aset) tetap menjadi milik Anda. Hibob Studio hanya menggunakannya untuk keperluan layanan yang Anda minta.
      </p>

      <h2 className="legal-h2">7. Pembatasan Tanggung Jawab</h2>
      <p className="legal-p">
        Hibob Studio menyediakan layanan "sebagaimana adanya" tanpa jaminan ketersediaan 100%. Kami tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan, termasuk kerugian akibat downtime, perubahan kebijakan Roblox, atau kejadian di luar kendali kami.
      </p>

      <h2 className="legal-h2">8. Penghentian Layanan</h2>
      <p className="legal-p">
        Hibob Studio berhak menangguhkan atau menghentikan akun yang melanggar syarat layanan ini tanpa pemberitahuan sebelumnya. Hibob Studio juga berhak menghentikan atau memodifikasi layanan dengan pemberitahuan yang wajar kepada pengguna aktif.
      </p>

      <h2 className="legal-h2">9. Perubahan Syarat</h2>
      <p className="legal-p">
        Syarat layanan ini dapat diperbarui. Perubahan akan diumumkan melalui Discord server dan/atau email. Penggunaan layanan setelah perubahan dianggap sebagai penerimaan syarat yang diperbarui.
      </p>

      <h2 className="legal-h2">10. Hukum yang Berlaku</h2>
      <p className="legal-p">
        Syarat layanan ini diatur oleh hukum Republik Indonesia. Sengketa yang timbul akan diselesaikan secara musyawarah terlebih dahulu melalui Discord server Hibob Studio.
      </p>

      <h2 className="legal-h2">11. Kontak</h2>
      <p className="legal-p">
        Pertanyaan terkait syarat layanan:{" "}
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" style={{ color: "#a855f7", textDecoration: "none" }}>Discord Server Hibob Studio</a>
      </p>
    </LegalLayout>
  );
}

// ─── Roblox Compliance ────────────────────────────────────────────────────────
export function RobloxCompliancePage() {
  return (
    <LegalLayout title="Kepatuhan Roblox" badge="Legal · Roblox Compliance">
      <p className="legal-p">
        Halaman ini menjelaskan posisi Hibob Studio dalam kaitannya dengan Roblox Corporation dan platform Roblox, serta komitmen kami terhadap kepatuhan terhadap kebijakan dan ketentuan yang berlaku.
      </p>

      <h2 className="legal-h2">1. Bukan Afiliasi Resmi</h2>
      <p className="legal-p">
        <strong style={{ color: "white" }}>Hibob Studio tidak berafiliasi, didukung, disponsori, atau disetujui secara resmi oleh Roblox Corporation.</strong>
      </p>
      <p className="legal-p">
        Roblox, Roblox Studio, Robux, dan merek terkait adalah merek dagang milik Roblox Corporation. Penggunaan nama dan istilah Roblox di platform Hibob Studio dilakukan semata-mata untuk tujuan deskriptif dan referensial — menjelaskan kompatibilitas dan integrasi layanan kami dengan platform Roblox.
      </p>

      <h2 className="legal-h2">2. Penggunaan Roblox Open Cloud API</h2>
      <p className="legal-p">
        Layanan Hibob Studio yang berinteraksi dengan platform Roblox (termasuk Audio Forge untuk publikasi audio, dan integrasi lainnya) menggunakan Roblox Open Cloud API secara resmi.
      </p>
      <ul className="legal-ul">
        <li>Semua interaksi dengan API Roblox mengikuti dokumentasi resmi Roblox Open Cloud</li>
        <li>Kami tidak menggunakan metode akses tidak resmi, scraping, atau bypass sistem Roblox</li>
        <li>Rate limits dan batasan API diterapkan sesuai kebijakan Roblox</li>
        <li>API key pengguna disimpan dengan enkripsi dan tidak pernah dibagikan</li>
      </ul>

      <h2 className="legal-h2">3. Kepatuhan Ketentuan Layanan Roblox</h2>
      <p className="legal-p">Hibob Studio berkomitmen untuk mematuhi Roblox Terms of Service, termasuk:</p>
      <ul className="legal-ul">
        <li>Tidak memfasilitasi pembuatan konten yang melanggar Community Guidelines Roblox</li>
        <li>Tidak membantu upaya untuk memanipulasi, mengeksploitasi, atau menyalahgunakan sistem Roblox</li>
        <li>Tidak memfasilitasi penjualan atau distribusi item Roblox yang melanggar kebijakan ekonomi Roblox</li>
        <li>Menggunakan Roblox API hanya sesuai dengan tujuan yang diizinkan dalam Roblox API Terms of Use</li>
      </ul>

      <h2 className="legal-h2">4. Konten yang Diproses</h2>
      <h3 className="legal-h3">4.1 Audio Upload melalui Audio Forge</h3>
      <p className="legal-p">
        Audio Forge memfasilitasi upload audio ke akun Roblox pengguna menggunakan Open Cloud API. Pengguna bertanggung jawab penuh atas konten audio yang mereka upload:
      </p>
      <ul className="legal-ul">
        <li>Pengguna harus memiliki hak cipta atau lisensi yang diperlukan atas audio yang diupload</li>
        <li>Audio yang melanggar kebijakan Roblox akan dimoderasi oleh sistem moderasi Roblox secara otomatis</li>
        <li>Hibob Studio tidak bertanggung jawab atas keputusan moderasi Roblox terhadap konten yang diupload</li>
      </ul>

      <h3 className="legal-h3">4.2 Produk Roblox (License Manager)</h3>
      <p className="legal-p">
        License Manager membantu developer dalam mendistribusikan produk Roblox (script, sistem, modul) kepada pembeli yang sah. Platform ini tidak memfasilitasi:
      </p>
      <ul className="legal-ul">
        <li>Distribusi konten yang melanggar kebijakan Roblox</li>
        <li>Eksploitasi atau bypass sistem keamanan Roblox</li>
        <li>Penjualan item yang melanggar kebijakan monetisasi Roblox</li>
      </ul>

      <h2 className="legal-h2">5. Perubahan Kebijakan Roblox</h2>
      <p className="legal-p">
        Roblox Corporation dapat memperbarui kebijakan, API, dan ketentuan layanan mereka sewaktu-waktu. Hibob Studio berkomitmen untuk menyesuaikan layanan kami dengan perubahan tersebut. Dalam kasus perubahan signifikan yang mempengaruhi fungsi platform, kami akan memberikan pemberitahuan kepada pengguna melalui Discord server.
      </p>
      <p className="legal-p">
        Hibob Studio tidak bertanggung jawab atas gangguan layanan yang disebabkan oleh perubahan kebijakan atau API dari pihak Roblox Corporation.
      </p>

      <h2 className="legal-h2">6. Pelaporan Kepatuhan</h2>
      <p className="legal-p">
        Jika Anda menemukan penggunaan platform Hibob Studio yang tampaknya melanggar ketentuan Roblox atau kebijakan kami, laporkan melalui Discord server kami. Laporan akan ditangani dengan serius dan segera.
      </p>

      <h2 className="legal-h2">7. Kontak</h2>
      <p className="legal-p">
        Pertanyaan terkait kepatuhan Roblox:{" "}
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" style={{ color: "#a855f7", textDecoration: "none" }}>Discord Server Hibob Studio</a>
      </p>
    </LegalLayout>
  );
}
