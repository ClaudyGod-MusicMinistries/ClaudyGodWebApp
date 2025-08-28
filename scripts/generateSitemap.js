import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base site URL
const baseUrl = 'https://claudygod.org';

// Today's date in YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// All site routes
const routes = [
  { path: '/', priority: '1.00' },
  { path: '/biography', priority: '0.80' },
  { path: '/music', priority: '0.90' },
  { path: '/videos', priority: '0.90' },
  { path: '/bookings', priority: '0.70' },
  { path: '/blogs', priority: '0.80' },
  { path: '/ministry', priority: '0.80' },
  { path: '/news', priority: '0.80' },
  { path: '/store', priority: '0.80' },
  { path: '/contact', priority: '0.70' },
  { path: '/donate', priority: '0.70' },
  { path: '/blog/why-worship-matters', priority: '0.80', lastmod: '2023-10-15' },
  { path: '/blog/spiritual-growth-tips', priority: '0.80', lastmod: '2023-09-20' }
];

// Start building the XML
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

routes.forEach(route => {
  const loc = `${baseUrl}${route.path}`;
  const lastmod = route.lastmod || today;
  const priority = route.priority || '0.80';

  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${loc}</loc>\n`;
  sitemapXml += `    <lastmod>${lastmod}</lastmod>\n`;
  sitemapXml += `    <priority>${priority}</priority>\n`;
  sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>`;

// Save to /public/sitemap.xml
const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sitemapXml);

console.log('✅ Sitemap saved to:', outputPath);
