import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = "https://atlgbizgdchqtlxktqed.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0bGdiaXpnZGNocXRseGt0cWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTQwOTYsImV4cCI6MjA5MTA5MDA5Nn0.eG7VS2rpX-XZZg6mAGTM4KfU7ZEjHRC0O9jP12unuFM";

const DEFAULT_IMAGE = "https://feminist.lovable.app/social-share.jpg";
const SITE_NAME = "Feminist";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const truncate = (s: string, n: number) =>
  s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = (req.query.id as string) || "";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const pageUrl = `${proto}://${host}/awareness/${id}`;

  let title = SITE_NAME;
  let description = "Read this article on Feminist.";
  let image = DEFAULT_IMAGE;
  let author = "";
  let category = "";
  let publishedAt = "";

  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${encodeURIComponent(id)}&published=eq.true&select=title,content,category,author,image_url,created_at`,
      {
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
        },
      },
    );
    if (r.ok) {
      const rows = (await r.json()) as Array<{
        title: string;
        content: string;
        category: string;
        author: string;
        image_url: string | null;
        created_at: string;
      }>;
      const post = rows[0];
      if (post) {
        title = post.title;
        description = truncate(
          (post.content || "").replace(/\s+/g, " ").trim(),
          200,
        );
        if (post.image_url) image = post.image_url;
        author = post.author || "";
        category = post.category || "";
        publishedAt = post.created_at || "";
      }
    }
  } catch {
    // fall through to defaults
  }

  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const img = escapeHtml(image);
  const url = escapeHtml(pageUrl);
  const a = escapeHtml(author);
  const c = escapeHtml(category);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${t} — ${SITE_NAME}</title>
<meta name="description" content="${d}" />
<link rel="canonical" href="${url}" />

<meta property="og:type" content="article" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta property="og:title" content="${t}" />
<meta property="og:description" content="${d}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${img}" />
<meta property="og:image:alt" content="${t}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
${a ? `<meta property="article:author" content="${a}" />` : ""}
${c ? `<meta property="article:section" content="${c}" />` : ""}
${publishedAt ? `<meta property="article:published_time" content="${escapeHtml(publishedAt)}" />` : ""}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@Feminist" />
<meta name="twitter:title" content="${t}" />
<meta name="twitter:description" content="${d}" />
<meta name="twitter:image" content="${img}" />

<script type="application/ld+json">
${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: title,
  description,
  image: [image],
  author: author ? [{ "@type": "Person", name: author }] : undefined,
  datePublished: publishedAt || undefined,
  mainEntityOfPage: pageUrl,
  articleSection: category || undefined,
})}
</script>

<meta http-equiv="refresh" content="0; url=${url}" />
</head>
<body>
<p>Redirecting to <a href="${url}">${t}</a>…</p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=86400",
  );
  res.status(200).send(html);
}