import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = "https://atlgbizgdchqtlxktqed.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0bGdiaXpnZGNocXRseGt0cWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTQwOTYsImV4cCI6MjA5MTA5MDA5Nn0.eG7VS2rpX-XZZg6mAGTM4KfU7ZEjHRC0O9jP12unuFM";

const STATIC_PATHS = [
  "/",
  "/about",
  "/awareness",
  "/support",
  "/community",
  "/events",
  "/campaigns",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const base = `${proto}://${host}`;

  let articles: Array<{ id: string; created_at: string }> = [];
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&select=id,created_at&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
        },
      },
    );
    if (r.ok) articles = await r.json();
  } catch {
    // fall through with empty list
  }

  const urls = [
    ...STATIC_PATHS.map(
      (p) => `<url><loc>${base}${p}</loc><changefreq>weekly</changefreq></url>`,
    ),
    ...articles.map(
      (a) =>
        `<url><loc>${base}/awareness/${a.id}</loc><lastmod>${new Date(a.created_at).toISOString()}</lastmod><changefreq>monthly</changefreq></url>`,
    ),
  ].join("\n  ");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=86400",
  );
  res.status(200).send(xml);
}