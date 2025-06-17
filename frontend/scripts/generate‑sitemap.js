import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://claudygod.org';

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/biography', changefreq: 'monthly', priority: 0.8 },
  { url: '/music', changefreq: 'monthly', priority: 0.8 },
  { url: '/videos', changefreq: 'monthly', priority: 0.8 },
  { url: '/bookings', changefreq: 'monthly', priority: 0.8 },
  { url: '/blogs', changefreq: 'monthly', priority: 0.8 },
  { url: '/ministry', changefreq: 'monthly', priority: 0.8 },
  { url: '/news', changefreq: 'monthly', priority: 0.8 },
  { url: '/store', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/donate', changefreq: 'monthly', priority: 0.7 },
];

// Output to dist directory (Vite's build folder)
const outputPath = path.resolve(__dirname, '../dist/sitemap.xml');

const generateSitemap = async () => {
  try {
    const sitemap = new SitemapStream({ hostname: baseUrl });
    
    // Add all routes
    routes.forEach(route => sitemap.write(route));
    sitemap.end();

    // Generate XML
    const data = await streamToPromise(sitemap);
    
    // Ensure dist directory exists
    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }
    
    // Write file
    fs.writeFileSync(outputPath, data.toString());
    console.log('✅ Sitemap generated at:', outputPath);
  } catch (err) {
    console.error('❌ Sitemap generation failed:', err);
    process.exit(1); // Exit with error code
  }
};

generateSitemap();