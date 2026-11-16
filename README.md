# Honey's Hive Early Child Learning Center — Eufaula, Oklahoma

A six-page, original, photo-forward childcare website with a distinctive editorial/field-guide design, original brand illustrations, and real HTML for every route.

## Run locally (VS Code)

1. Open THIS folder in VS Code. Do not open only an HTML file in a browser.
2. Install Node.js 20 or later.
3. In the terminal:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL shown in the terminal (normally http://localhost:5173).

## Production

```bash
npm run typecheck
npm run build
npm run preview
```

Deploy the `dist/` directory to Vercel or Cloudflare Pages. Build command: `npm run build`; output: `dist`. No SPA rewrite is needed because the six routes are pre-rendered as real `index.html` pages.

### Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 20+

### Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `dist`

## Pages

- `/` — Home
- `/our-hive/` — About / Our Hive
- `/age-groups/` — Ages accepted
- `/the-day/` — Childcare routine questions and learning themes
- `/for-families/` — Verified center details, FAQs and subsidy information
- `/contact/` — Contact, directions and email-composition form

## Edit in one place

- All business details, Facebook link: `src/config/site.ts`
- All six photograph URLs: `src/config/photos.ts`
- Change the logo everywhere: overwrite `public/branding/logo.png`
- Change the favicon: overwrite `public/branding/favicon.png`
- Editing guide: `BRAND-PHOTOS-SOCIAL-EDITING.md`

## Important setup before publishing

1. Get the operator's approval before representing this as their official website.
2. Replace the temporary illustrated bee logo with an authorized logo, if supplied.
3. Replace illustrative Pexels stock photos with actual center photos **only with appropriate permissions**, especially for children's identifiable photos.
4. Set `SITE.siteUrl` to the correct canonical HTTPS URL in `src/config/site.ts`. This adds canonical URLs and creates `sitemap.xml` automatically when you run `npm run build`.
5. Confirm all hours, star level, staff details, enrollment and services with the center before publishing.
6. The inquiry form uses `mailto:` — it opens the visitor's own email application. It does NOT send a message from the website or store data; no backend or misleading submission-success screen is present.

## Technical notes

- Vite + React 18 + TypeScript
- `tsx scripts/generate-pages.tsx` creates six crawler-readable HTML entrypoints before Vite starts or builds.
- CSS animations respect `prefers-reduced-motion`.
- `<details>` FAQs work without JavaScript; mobile navigation needs JavaScript.
- External photo URLs use Pexels CDN, with original SVG fallback illustrations behind them if the image fails to load.
- No external icon package, auth service, tracking, or hidden collection backend.
- No `static-preview` folder.

## Verification

Public facts from Oklahoma Human Services, provider ID `K830058324`. Read `SOURCES-AND-REVIEW.md` before launch for details and the other similarly named McAlester center to avoid mixing information.
