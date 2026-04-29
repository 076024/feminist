import { useEffect } from "react";

const SITE_NAME = "Feminist";
const DEFAULT_DESCRIPTION =
  "Feminist is a platform fighting for gender equality, protecting women from violence, and building community. Find support, join campaigns, and take action.";
const DEFAULT_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/sAjmLyRKwEgMKr6VfJsgAlEqKTu1/social-images/social-1776648463662-1000328878.webp";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  /** Additional structured-data object to inject as JSON-LD. */
  jsonLd?: Record<string, unknown>;
  /** Article-only metadata. */
  article?: {
    author?: string;
    section?: string;
    publishedTime?: string;
  };
}

const upsertMeta = (
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const removeMeta = (selector: string) => {
  document.head.querySelector(selector)?.remove();
};

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd,
  article,
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
    const url = window.location.href;
    const prevTitle = document.title;
    document.title = fullTitle;

    upsertMeta(`meta[name="description"]`, "name", "description", description);

    upsertMeta(`meta[property="og:type"]`, "property", "og:type", type);
    upsertMeta(`meta[property="og:site_name"]`, "property", "og:site_name", SITE_NAME);
    upsertMeta(`meta[property="og:title"]`, "property", "og:title", title);
    upsertMeta(`meta[property="og:description"]`, "property", "og:description", description);
    upsertMeta(`meta[property="og:url"]`, "property", "og:url", url);
    upsertMeta(`meta[property="og:image"]`, "property", "og:image", image);
    upsertMeta(`meta[property="og:image:alt"]`, "property", "og:image:alt", title);
    upsertMeta(`meta[property="og:locale"]`, "property", "og:locale", "en_US");

    upsertMeta(`meta[name="twitter:card"]`, "name", "twitter:card", "summary_large_image");
    upsertMeta(`meta[name="twitter:title"]`, "name", "twitter:title", title);
    upsertMeta(`meta[name="twitter:description"]`, "name", "twitter:description", description);
    upsertMeta(`meta[name="twitter:image"]`, "name", "twitter:image", image);

    if (article?.author) {
      upsertMeta(`meta[property="article:author"]`, "property", "article:author", article.author);
    } else {
      removeMeta(`meta[property="article:author"]`);
    }
    if (article?.section) {
      upsertMeta(`meta[property="article:section"]`, "property", "article:section", article.section);
    } else {
      removeMeta(`meta[property="article:section"]`);
    }
    if (article?.publishedTime) {
      upsertMeta(
        `meta[property="article:published_time"]`,
        "property",
        "article:published_time",
        article.publishedTime,
      );
    } else {
      removeMeta(`meta[property="article:published_time"]`);
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let ldEl = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld="true"]');
    if (jsonLd) {
      if (!ldEl) {
        ldEl = document.createElement("script");
        ldEl.type = "application/ld+json";
        ldEl.setAttribute("data-seo-jsonld", "true");
        document.head.appendChild(ldEl);
      }
      ldEl.textContent = JSON.stringify(jsonLd);
    } else if (ldEl) {
      ldEl.remove();
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image, type, jsonLd, article?.author, article?.section, article?.publishedTime]);

  return null;
};

export default SEO;