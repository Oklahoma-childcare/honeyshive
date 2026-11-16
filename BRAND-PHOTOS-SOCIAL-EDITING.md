# Logo, photographs, favicon, Facebook — easy swap guide

## 1. Logo — one PNG replacement

Overwrite **`public/branding/logo.png`** with your authorized logo. Keep the filename, preferably use a square transparent PNG (500x500 pixels or larger). The header, footer, the hero sticker and the map-marker graphic all use this single file. No code changes needed.

The included bee is ORIGINAL temporary artwork, **not** a verified official logo.

## 2. Favicon — one PNG replacement

Overwrite **`public/branding/favicon.png`** with a square 64x64 PNG. Browser favicons cache strongly: hard-refresh or test in an incognito window after deployment.

## 3. Photos — all image locations in one file

Open `src/config/photos.ts`. Its six simple labels are:

| Photo key | Used for |
| --- | --- |
| `hero` | Home hero image |
| `art` | The Day main image |
| `reading` | Home story feature / The Day feature |
| `blocks` | Home Eufaula section |
| `group` | Our Hive intro |
| `portrait` | For Families FAQ image |

To use your own images, place files in `public/photos/` and change e.g. `hero: "/photos/home-hero.jpg"`. This one place controls all appearances. Do not change layout components.

Current external photo URLs are free Pexels stock images; they illustrate generic childcare activities and **do not depict Honey's Hive or its enrolled children**. If offline, original custom SVG illustrations remain visible. Pexels photo credits and sources are in `SOURCES-AND-REVIEW.md`.

## 4. Facebook, social links and business data

Open `src/config/site.ts` to edit `facebook`, `instagram`, `phoneDisplay`, `phoneDial`, `email`, `street`, `city`, `state`, `zip`, `director`, `hours`, `weekdays`, and `siteUrl`.

Facebook appears **under the brand in the footer**, as a blue circular icon with the label “Follow along on Facebook.” It is *not* mixed into the licensing information.

Instagram is intentionally blank because no reliable official Instagram profile was supplied. Don't invent one.

## 5. Production domain / search indexing

Set `siteUrl` to your real production HTTPS domain (without trailing slash). `npm run build` will create canonical tags on every page, `sitemap.xml`, and a `robots.txt` referencing that sitemap. The default lets crawlers access pages but does not create false canonical URLs for an unknown domain.

## 6. Contact form behavior

The form is a native `mailto:` form; it opens the visitor's email application to message `honeys.hive22@gmail.com`. It does not submit to a server or quietly store visitor information.
