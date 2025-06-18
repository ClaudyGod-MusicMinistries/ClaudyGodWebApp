import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://claudygod.org';

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/biography', changefreq: 'monthly', priority: 0.8 },
  { url: '/music', changefreq: 'weekly', priority: 0.9 },
  { url: '/videos', changefreq: 'weekly', priority: 0.9 },
  { url: '/bookings', changefreq: 'monthly', priority: 0.7 },
  { url: '/blogs', changefreq: 'weekly', priority: 0.8 },
  { url: '/ministry', changefreq: 'monthly', priority: 0.8 },
  { url: '/news', changefreq: 'weekly', priority: 0.8 },
  { url: '/store', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/donate', changefreq: 'monthly', priority: 0.7 },
  
  // Add dynamic blog routes from your CMS
  ...getDynamicBlogRoutes()
];

function getDynamicBlogRoutes() {
  // In a real app, you would fetch these from your CMS/API
  return [
    { url: '/blog/why-worship-matters', lastmod: new Date('2023-10-15') },
    { url: '/blog/spiritual-growth-tips', lastmod: new Date('2023-09-20') }
  ];
}

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');

const generateSitemap = async () => {
  try {
    const sitemap = new SitemapStream({ 
      hostname: baseUrl,
      lastmodDateOnly: true,
      xmlns: { news: false, xhtml: true, image: true }
    });
    
    routes.forEach(route => sitemap.write(route));
    sitemap.end();

    const data = await streamToPromise(sitemap);
    
    // Create public directory if doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(outputPath, data);
    console.log('✅ Sitemap generated at:', outputPath);
    
    return true;
  } catch (err) {
    console.error('❌ Sitemap generation failed:', err);
    process.exit(1);
  }
};

generateSitemap();