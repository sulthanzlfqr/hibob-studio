/**
 * Vercel Edge Function — Order Webhook Proxy
 * Route: POST /api/order
 *
 * Set di Vercel Dashboard → Settings → Environment Variables:
 *   DISCORD_ORDER_WEBHOOK = Discord webhook URL
 */

export const config = { runtime: "edge" };

const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "HBS-";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function buildEmbed(order) {
  const itemList = order.items.map((i) => `• **${i.name}** — ${i.price}`).join("\n");
  return {
    embeds: [{
      title: "🛒 ORDER BARU — Hibob Studio",
      color: 0xa855f7,
      fields: [
        { name: "Order ID", value: `\`${order.orderId}\``, inline: true },
        { name: "Status", value: "`WAITING_VERIFICATION`", inline: true },
        { name: "Nama", value: order.customerName, inline: false },
        { name: "Discord", value: order.customerDiscord, inline: true },
        { name: "Email", value: order.customerEmail || "—", inline: true },
        { name: "Produk", value: itemList || "—", inline: false },
        { name: "Total", value: `**Rp${Number(order.total).toLocaleString("id-ID")}**`, inline: true },
        { name: "Pembayaran", value: "QRIS — Mutual Space Store", inline: true },
      ],
      footer: { text: "Hibob Studio Commerce" },
      timestamp: new Date().toISOString(),
    }],
  };
}

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: cors });
}

export default async function handler(req) {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const webhookUrl = process.env.DISCORD_ORDER_WEBHOOK;
  if (!webhookUrl) return json({ error: "Service tidak tersedia." }, 503);

  // Rate limit
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (!checkRateLimit(ip)) {
    return json({ error: "Terlalu banyak permintaan. Coba lagi dalam 10 menit." }, 429);
  }

  // Parse form
  let formData;
  try { formData = await req.formData(); }
  catch { return json({ error: "Format request tidak valid." }, 400); }

  // Honeypot
  if ((formData.get("website") || "").trim() !== "") {
    return json({ success: true, orderId: generateOrderId() });
  }

  const customerName    = (formData.get("customerName") || "").trim();
  const customerDiscord = (formData.get("customerDiscord") || "").trim();
  const customerEmail   = (formData.get("customerEmail") || "").trim();
  const itemsRaw        = formData.get("items") || "";
  const totalRaw        = formData.get("total") || "0";
  const proofFile       = formData.get("proofImage");

  // Validate
  const errors = [];
  if (!customerName) errors.push("Nama wajib diisi.");
  if (!customerDiscord) errors.push("Discord username wajib diisi.");
  if (!proofFile || proofFile.size === 0) errors.push("Bukti transfer wajib diunggah.");

  let items = [];
  try {
    items = JSON.parse(itemsRaw);
    if (!Array.isArray(items) || items.length === 0) errors.push("Minimal 1 produk.");
  } catch { errors.push("Data produk tidak valid."); }

  const total = Number(totalRaw);
  if (isNaN(total) || total <= 0) errors.push("Total tidak valid.");
  if (errors.length > 0) return json({ error: errors.join(" ") }, 422);

  if (!ALLOWED_TYPES.includes(proofFile.type)) {
    return json({ error: "Format file tidak didukung. Gunakan JPG, PNG, atau WEBP." }, 422);
  }
  if (proofFile.size > MAX_FILE_BYTES) {
    return json({ error: "Ukuran file maksimal 5 MB." }, 422);
  }

  const orderId = generateOrderId();
  const order = { orderId, customerName, customerDiscord, customerEmail, items, total };

  // ── Step 1: Kirim embed teks (order details) ─────────────────────────────
  console.log(`[${orderId}] Sending embed to Discord...`);
  try {
    const ctrl1 = new AbortController();
    const t1 = setTimeout(() => ctrl1.abort(), 8000);
    const embedBody = JSON.stringify(buildEmbed(order));
    const res1 = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: embedBody,
      signal: ctrl1.signal,
    });
    clearTimeout(t1);
    const res1Text = await res1.text();
    console.log(`[${orderId}] Discord embed response: ${res1.status} | ${res1Text}`);
    if (!res1.ok) {
      return json({ error: "Gagal mengirim ke Discord. Coba beberapa saat lagi." }, 502);
    }
  } catch (err) {
    console.error(`[${orderId}] Discord embed error:`, err?.message);
    return json({ error: "Terjadi kesalahan server. Coba lagi." }, 500);
  }

  console.log(`[${orderId}] Embed sent. Sending proof image...`);
  // ── Step 2: Kirim gambar bukti transfer (best-effort, max 7 detik) ────────
  // Promise.race memastikan fungsi selalu lanjut meski upload lambat/hang.
  await Promise.race([
    (async () => {
      try {
        const fileBuffer = await proofFile.arrayBuffer();
        const blob = new Blob([fileBuffer], { type: proofFile.type });
        const ext = (proofFile.name || "jpg").split(".").pop();
        const fileForm = new FormData();
        fileForm.append("content", `📎 **Bukti Transfer** — \`${orderId}\``);
        fileForm.append("files[0]", blob, `bukti-${orderId}.${ext}`);
        await fetch(webhookUrl, { method: "POST", body: fileForm });
      } catch (err) {
        console.warn("Image upload error:", err?.message);
      }
    })(),
    new Promise(resolve => setTimeout(resolve, 7000)),
  ]);

  return json({ success: true, orderId });
}
