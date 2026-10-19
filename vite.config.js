import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE_URL } from './site.config.js'

// Fills in %SITE_URL% in index.html and writes robots.txt + sitemap.xml at build time.
const seo = () => ({
  name: 'seo-files',
  transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL) },
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n` })
    const today = new Date().toISOString().slice(0, 10)
    this.emitFile({
      type: 'asset', fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
    })
  },
})

export default defineConfig({ plugins: [react(), seo()] })
