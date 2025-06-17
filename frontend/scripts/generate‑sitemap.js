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
  { url: '/music', changefreq: 'weekly', priority: 0.9 },
  { url: '/videos', changefreq: 'weekly', priority: 0.9 },
  { url: '/bookings', changefreq: 'monthly', priority: 0.7 },
  { url: '/blogs', changefreq: 'weekly', priority: 0.8 },
  { url: '/ministry', changefreq: 'monthly', priority: 0.8 },
  { url: '/news', changefreq: 'weekly', priority: 0.8 },
  { url: '/store', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/donate', changefreq: 'monthly', priority: 0.7 },
  
  // Add more dynamic routes here as needed
  // { url: '/blog/post-1', lastmod: new Date() },
];

const outputPath = path.resolve(__dirname, '../dist/sitemap.xml');

const generateSitemap = async () => {
  try {
    const sitemap = new SitemapStream({ 
      hostname: baseUrl,
      xmlns: {
        // Enable these if needed
        news: false,
        xhtml: false,
        image: false
      }
    });
    
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
    
    // Verify output
    console.log('ℹ️ Sitemap preview:');
    console.log(data.toString().substring(0, 200) + '...');
    
    return true;
  } catch (err) {
    console.error('❌ Sitemap generation failed:', err);
    process.exit(1);
  }
};

generateSitemap();