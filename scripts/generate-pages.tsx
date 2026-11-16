/**
 * Generates real HTML for every route BEFORE Vite builds. This makes page
 * content, headings, schema, metadata and internal links readable by crawlers
 * without waiting for JavaScript.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { App } from "../src/App";
import { PAGE_META, ROUTES, type PagePath } from "../src/config/pages";
import { SITE } from "../src/config/site";

const root = process.cwd();
const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
const domain = SITE.siteUrl.replace(/\/+$/, "");

function head(route: PagePath) {
  const meta = PAGE_META[route];
  const url = domain ? `${domain}${route}` : "";
  const schema = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    "name": SITE.name,
    "identifier": SITE.licenseId,
    "telephone": SITE.phoneDial,
    "email": SITE.email,
    "address": { "@type": "PostalAddress", "streetAddress": SITE.street, "addressLocality": SITE.city, "addressRegion": SITE.state, "postalCode": SITE.zip, "addressCountry": "US" },
    "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "07:00", "closes": "17:30" }],
    "sameAs": [SITE.licenseUrl, SITE.facebook],
    ...(url ? { "url": url } : {})
  };
  return `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}" />
<meta name="theme-color" content="#f8f5ea" />
<link rel="icon" type="image/png" href="/branding/favicon.png" />
<link rel="apple-touch-icon" href="/branding/logo.png" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${escapeHtml(meta.title)}" />
<meta property="og:description" content="${escapeHtml(meta.description)}" />
${url ? `<link rel="canonical" href="${escapeHtml(url)}" /><meta property="og:url" content="${escapeHtml(url)}" />` : ""}
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
<script type="module" src="/src/main.tsx"></script>`;
}

for (const route of ROUTES) {
  const dest = route === "/" ? root : join(root, route.slice(1));
  mkdirSync(dest, { recursive: true });
  const html = `<!doctype html><html lang="en"><head>${head(route)}</head><body><div id="root">${renderToString(createElement(App, { route }))}</div></body></html>\n`;
  writeFileSync(join(dest, "index.html"), html);
  console.log(`Generated: ${route} | ${html.length} bytes`);
}

if (domain) {
  const entries = ROUTES.map((route) => `  <url><loc>${escapeHtml(`${domain}${route}`)}</loc><changefreq>monthly</changefreq></url>`).join("\n");
  writeFileSync(join(root, "public", "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
  writeFileSync(join(root, "public", "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`);
} else {
  rmSync(join(root, "public", "sitemap.xml"), { force: true });
  writeFileSync(join(root, "public", "robots.txt"), "User-agent: *\nAllow: /\n");
}
