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

function buildPayload(order) {
  const itemList = order.items
    .map((i) => `• **${i.name}** — ${i.price}`)
    .join("\n") || "—";

  // content = plain text fallback, embeds = rich format
  return {
    content: `🛒 **ORDER BARU** — \`${order.orderId}\`\n👤 ${order.customerName} | 💬 ${order.customerDiscord}\n📦 ${itemList}\n💰 **Rp${Number(order.total).toLocaleString("id-ID")}** — QRIS Mutual Space Store`,
    embeds: [
      {
        title: "🛒 ORDER BARU — Hibob Studio",
        color: 11031031,
        fields: [
          { name: "Order ID", value: `\`${order.orderId}\``, inline: true },
          { name: "Status", value: "`WAITING_VERIFICATION`", inline: true },
          { name: "Nama", value: order.customerName || "—", inline: false },
          { name: "Discord", value: order.customerDiscord || "—", inline: true },
          { name: "Email", value: order.customerEmail || "—", inline: true },
          { name: "Produk", value: itemList, inline: false },
          { name: "Total", value: `Rp${Number(order.total).toLocaleString("id-ID")}`, inline: true },
          { name: "Pembayaran", value: "QRIS — Mutual Space Store", inline: true },
        ],
        footer: { text: "Hibob Studio Commerce" },
        timestamp: new Date().toISOString(),
      },
    ],
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
  if (!webhookUrl) {
    console.error("DISCORD_ORDER_WEBHOOK is not set");
    return json({ error: "Service tidak tersedia." }, 503);
  }

  // Log URL prefix for debugging (never log full token)
  console.log("Webhook URL prefix:", webhookUrl.slice(0, 50));

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
  const itemsRaw        = formData.get("items") || "";
  const totalRaw        = formData.get("total") || "0";
  const proofFile       = formData.get("proofImage");

  const errors = [];
  if (!customerName)    errors.push("Nama wajib diisi.");
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

  if (!ALLOWED_TYPES.includes(proofFile.type))
    return json({ error: "Format file tidak didukung. Gunakan JPG, PNG, atau WEBP." }, 422);
  if (proofFile.size > MAX_FILE_BYTES)
    return json({ error: "Ukuran file maksimal 5 MB." }, 422);

  const orderId = generateOrderId();
  const order   = { orderId, customerName, customerDiscord, customerEmail, items, total };

  // ── Step 1: Kirim content + embed ke Discord ───────────────────────────────
  console.log(`[${orderId}] POSTing to Discord...`);
  try {
    const payload = buildPayload(order);
    const body    = JSON.stringify(payload);
    console.log(`[${orderId}] Payload size: ${body.length} bytes`);

    const res1 = await fetch(webhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const responseText = await res1.text();
    console.log(`[${orderId}] Discord response: ${res1.status} | ${responseText.slice(0, 200)}`);

    if (!res1.ok) {
      console.error(`[${orderId}] Discord rejected the message`);
      return json({ error: "Gagal mengirim ke Discord. Coba beberapa saat lagi." }, 502);
    }

    console.log(`[${orderId}] Discord message sent OK`);
  } catch (err) {
    console.error(`[${orderId}] Discord fetch error:`, err?.message);
    return json({ error: "Terjadi kesalahan server. Coba lagi." }, 500);
  }

  // ── Step 2: Kirim gambar bukti (best-effort, max 7 detik) ─────────────────
  console.log(`[${orderId}] Sending proof image...`);
  await Promise.race([
    (async () => {
      try {
        const fileBuffer = await proofFile.arrayBuffer();
        const blob = new Blob([fileBuffer], { type: proofFile.type });
        const ext  = (proofFile.name || "img").split(".").pop();
        const form = new FormData();
        form.append("content",  `📎 Bukti Transfer — \`${orderId}\``);
        form.append("files[0]", blob, `bukti-${orderId}.${ext}`);
        const res2 = await fetch(webhookUrl, { method: "POST", body: form });
        console.log(`[${orderId}] Image response: ${res2.status}`);
      } catch (err) {
        console.warn(`[${orderId}] Image upload failed:`, err?.message);
      }
    })(),
    new Promise(resolve => setTimeout(resolve, 7000)),
  ]);

  console.log(`[${orderId}] Done. Returning success.`);
  return json({ success: true, orderId });
}
