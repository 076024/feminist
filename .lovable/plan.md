# Get the site working again on Vercel

## What I found

I checked `feminist-one.vercel.app` directly. Every address on it — the home page, the articles page, the sitemap — returns the same Vercel message:

```text
The deployment could not be found on Vercel.
DEPLOYMENT_NOT_FOUND
```

This is not a problem in the site's code. That message means Vercel has no live deployment behind that address any more — the project there was removed, disconnected from its code source, or its last deployment was deleted. Nothing I change in the code can bring it back on its own; the site has to be deployed to Vercel again.

## Two ways forward

**Option A — keep using Vercel.** You (or I, if you give me access details) re-create the deployment: connect the project's GitHub repository to Vercel again and deploy. The settings it needs are the standard Vite ones (build command `npm run build`, output folder `dist`), and the three backend connection values from the project's environment need to be added in Vercel's settings. Once it deploys, the address works again — and the article link previews and sitemap keep working, because those small server files are already in the project.

**Option B — use Lovable hosting instead.** The site is already published at `feminist.lovable.app`. Pressing Publish there gets you a working live site immediately with no external setup. The trade-off: rich link previews for individual articles (the picture and headline that show up on Facebook/WhatsApp) only work on Vercel, since those depend on the small server files Lovable hosting doesn't run.

## What I'll do once you choose

- **If Vercel:** I'll double-check every file Vercel needs is correct and complete (routing rules, the article-preview handler, the sitemap handler, the build settings), fix anything off, and give you a short click-by-click list for re-connecting the project in Vercel. I can't log into your Vercel account myself, so the final connect-and-deploy step is yours.
- **If Lovable hosting:** I'll publish the site and confirm the live address responds, then tell you what changes about link previews.

## Technical notes

- Probe result: `curl -I https://feminist-one.vercel.app/` → 404 `DEPLOYMENT_NOT_FOUND` on all paths, meaning the domain has no assigned production deployment.
- Repo is Vercel-ready already: `vercel.json` has the SPA catch-all, the `/sitemap.xml` rewrite, and the crawler-only rewrite to `/api/og/awareness/:id`; `@vercel/node` is in devDependencies; both API handlers exist.
- Env vars required in Vercel: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.
- Framework preset: Vite. Build `npm run build`, output `dist`, install `npm install`.
