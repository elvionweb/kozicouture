# Kozi Couture landing page
    npm install
    npm run dev
    npm run build   # upload dist/ to Netlify / Vercel / any host

Before publishing: set your real domain in `site.config.js` (SITE_URL) — used for canonical link, social previews, sitemap.xml, robots.txt.
Then submit /sitemap.xml in Google Search Console and create a Google Business Profile with the same name/address/phone.
Content (phone, address, collections, gallery, FAQ) is in `src/data.js`. Photos in `public/images`.
Favicons/app icons (16–512px, Apple touch icon, maskable, manifest) are in `public/`.
