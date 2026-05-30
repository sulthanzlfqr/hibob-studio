/**
 * Vercel Edge Function — Order Webhook Proxy
 * Route: POST /api/order
 *
 * Set di Vercel Dashboard → Project → Settings → Environment Variables:
 *   DISCORD_ORDER_WEBHOOK  = Discord webhook URL (tidak pernah ke browser)
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
      title: "🛒 ORDER BARU",
      color: 0xa855f7,
      fields: [
        { name: "Order ID", value: `\`${order.orderId}\``, inline: true },
        { name: "Status", value: `\`${order.status}\``, inline: true },
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
const MAX_FILE_SIZE = 5 * 1024 * 1024;
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
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const webhookUrl = process.env.DISCORD_ORDER_WEBHOOK;
  if (!webhookUrl) return json({ error: "Service tidak tersedia." }, 503);

  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return json({ error: "Terlalu banyak permintaan. Coba lagi dalam 10 menit." }, 429);
  }

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
  const itemsRaw        = formData.get("items");
  const totalRaw        = formData.get("total");
  const proofFile       = formData.get("proofImage");

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
  if (proofFile.size > MAX_FILE_SIZE) {
    return json({ error: "Ukuran file maksimal 5 MB." }, 422);
  }

  const orderId = generateOrderId();
  const order = {
    orderId, customerName, customerDiscord, customerEmail, items, total,
    paymentMethod: "QRIS", merchantName: "Mutual Space Store",
    status: "WAITING_VERIFICATION",
  };

  try {
    const discordForm = new FormData();
    discordForm.append("payload_json", JSON.stringify(buildEmbed(order)));
    const ext = proofFile.name.split(".").pop() || "jpg";
    discordForm.append("files[0]", proofFile, `bukti-${orderId}.${ext}`);

    const res = await fetch(webhookUrl, { method: "POST", body: discordForm });
    if (!res.ok) return json({ error: "Gagal mengirim notifikasi. Coba beberapa saat lagi." }, 502);
  } catch {
    return json({ error: "Terjadi kesalahan jaringan. Coba lagi." }, 500);
  }

  return json({ success: true, orderId });
}
