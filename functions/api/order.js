/**
 * Cloudflare Pages Function — Order Webhook Proxy
 * Route: POST /api/order
 *
 * Environment Variables (set in Cloudflare Pages dashboard):
 *   DISCORD_ORDER_WEBHOOK  — Discord webhook URL (never exposed to browser)
 *
 * Responsibilities:
 *   - Rate limiting: 3 orders per 10 minutes per IP
 *   - Honeypot anti-spam check
 *   - Input validation
 *   - File validation (type + size)
 *   - Generate order ID (HBS-XXXXXX)
 *   - Send Discord embed + proof image attachment
 */

// In-memory rate limit store (resets on cold start — sufficient for V1)
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

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
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function buildDiscordEmbed(order) {
  const itemList = order.items
    .map((item) => `• **${item.name}** — ${item.price}`)
    .join("\n");

  return {
    embeds: [
      {
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
          { name: "Metode Pembayaran", value: "QRIS — Mutual Space Store", inline: true },
        ],
        footer: { text: "Hibob Studio Commerce" },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function onRequestPost(context) {
  const { request, env } = context;

  // ── CORS headers ──────────────────────────────────────────────────────────
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // ── Webhook URL check ──────────────────────────────────────────────────────
  const webhookUrl = env.DISCORD_ORDER_WEBHOOK;
  if (!webhookUrl) {
    return new Response(
      JSON.stringify({ error: "Service tidak tersedia. Hubungi admin." }),
      { status: 503, headers: corsHeaders }
    );
  }

  // ── Rate limiting ──────────────────────────────────────────────────────────
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Terlalu banyak permintaan. Coba lagi dalam 10 menit." }),
      { status: 429, headers: corsHeaders }
    );
  }

  // ── Parse multipart form data ──────────────────────────────────────────────
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(
      JSON.stringify({ error: "Format request tidak valid." }),
      { status: 400, headers: corsHeaders }
    );
  }

  // ── Honeypot check ────────────────────────────────────────────────────────
  const honeypot = formData.get("website");
  if (honeypot && honeypot.trim() !== "") {
    // Silently reject bots — return fake success
    return new Response(
      JSON.stringify({ success: true, orderId: generateOrderId() }),
      { status: 200, headers: corsHeaders }
    );
  }

  // ── Field extraction ───────────────────────────────────────────────────────
  const customerName = (formData.get("customerName") || "").trim();
  const customerDiscord = (formData.get("customerDiscord") || "").trim();
  const customerEmail = (formData.get("customerEmail") || "").trim();
  const itemsRaw = formData.get("items");
  const totalRaw = formData.get("total");
  const proofFile = formData.get("proofImage");

  // ── Input validation ───────────────────────────────────────────────────────
  const errors = [];
  if (!customerName) errors.push("Nama wajib diisi.");
  if (!customerDiscord) errors.push("Discord username wajib diisi.");
  if (!itemsRaw) errors.push("Keranjang kosong.");
  if (!proofFile || proofFile.size === 0) errors.push("Bukti transfer wajib diunggah.");

  let items = [];
  try {
    items = JSON.parse(itemsRaw);
    if (!Array.isArray(items) || items.length === 0) errors.push("Minimal 1 produk.");
  } catch {
    errors.push("Data produk tidak valid.");
  }

  const total = Number(totalRaw);
  if (isNaN(total) || total <= 0) errors.push("Total tidak valid.");

  if (errors.length > 0) {
    return new Response(
      JSON.stringify({ error: errors.join(" ") }),
      { status: 422, headers: corsHeaders }
    );
  }

  // ── File validation ────────────────────────────────────────────────────────
  if (!ALLOWED_TYPES.includes(proofFile.type)) {
    return new Response(
      JSON.stringify({ error: "Format file tidak didukung. Gunakan JPG, PNG, atau WEBP." }),
      { status: 422, headers: corsHeaders }
    );
  }

  if (proofFile.size > MAX_FILE_SIZE) {
    return new Response(
      JSON.stringify({ error: "Ukuran file maksimal 5 MB." }),
      { status: 422, headers: corsHeaders }
    );
  }

  // ── Build order ────────────────────────────────────────────────────────────
  const orderId = generateOrderId();
  const order = {
    orderId,
    createdAt: new Date().toISOString(),
    customerName,
    customerDiscord,
    customerEmail,
    items,
    total,
    paymentMethod: "QRIS",
    merchantName: "Mutual Space Store",
    status: "WAITING_VERIFICATION",
  };

  // ── Send to Discord ────────────────────────────────────────────────────────
  try {
    const embed = buildDiscordEmbed(order);
    const discordForm = new FormData();
    discordForm.append("payload_json", JSON.stringify(embed));

    // Attach proof image
    const ext = proofFile.name.split(".").pop() || "jpg";
    const fileName = `bukti-${orderId}.${ext}`;
    discordForm.append("files[0]", proofFile, fileName);

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      body: discordForm,
    });

    if (!discordRes.ok) {
      const errText = await discordRes.text();
      console.error("Discord error:", errText);
      return new Response(
        JSON.stringify({ error: "Gagal mengirim notifikasi. Coba beberapa saat lagi." }),
        { status: 502, headers: corsHeaders }
      );
    }
  } catch (err) {
    console.error("Fetch error:", err);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan jaringan. Coba lagi." }),
      { status: 500, headers: corsHeaders }
    );
  }

  // ── Success ────────────────────────────────────────────────────────────────
  return new Response(
    JSON.stringify({ success: true, orderId }),
    { status: 200, headers: corsHeaders }
  );
}

// Handle preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
