import { SEO } from '../components/util/SEO';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AudioMackComponent } from '../components/Homepage/AmazonMusic';
import { Cover } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownloadSection } from '../components/util/Download';
import { 
  faExternalLinkAlt,
  faShieldAlt,
  faInfoCircle,
  faTimes, 
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { latestReleasePlatforms,securedMusicPlatforms } from '../components/data/musicData';
import  {NewsletterForm}  from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport'; 


const albums = [
  {
    id: 1,
    title: 'You Are Our Everything',
    year: '2025',
    image: Cover,
    tracks: [
      { id: 1, title: 'Amazing Grace', duration: '3:45' },
      { id: 2, title: 'Heavenly Joy', duration: '4:20' },
      { id: 3, title: 'Soul Revival', duration: '5:15' },
      { id: 4, title: 'Worship Medley', duration: '3:30' }
    ]
  },
];
const SecurityUtils = {
  sanitizeUrl: (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const safeParams = ['si', 'referral', 'utm_source', 'utm_medium', 'utm_campaign', 'tag'];
      safeParams.forEach(param => parsedUrl.searchParams.delete(param));
      return parsedUrl.toString();
    } catch (error) {
      console.error('Invalid URL:', url);
      return '#';
    }
  },

  isTrustedDomain: (url: string, trustedDomains: string[]) => {
    try {
      const parsedUrl = new URL(url);
      return trustedDomains.some(domain => parsedUrl.hostname.endsWith(domain));
    } catch (error) {
      return false;
    }
  }
};
const TRUSTED_DOMAINS = [
  'spotify.com',
  'apple.com',
  'youtube.com',
  'deezer.com',
  'amazon.com'
];

export const MusicData = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    const sanitizedUrl = SecurityUtils.sanitizeUrl(url);
    setRedirectUrl(sanitizedUrl);
    setIsModalOpen(true);
  };
  const handleRedirect = () => {
    if (redirectUrl) {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    }
    setIsModalOpen(false);
  };
  const SecuredLink = ({ platform }: { platform: typeof securedMusicPlatforms[0] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const sanitizedUrl = SecurityUtils.sanitizeUrl(platform.url);
    const isTrusted = SecurityUtils.isTrustedDomain(sanitizedUrl, TRUSTED_DOMAINS);
    
    return (
      <motion.a
        href={sanitizedUrl}
        onClick={(e) => handleLinkClick(platform.url, e)}
        className={`flex items-center px-6 py-4 rounded-xl shadow-lg transition-all ${platform.bgColor} ${platform.textColor} ${
          isHovered ? 'scale-[1.03] shadow-xl -translate-y-1' : ''
        } ${isTrusted ? 'ring-2 ring-white/30' : 'opacity-80'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.1 * securedMusicPlatforms.indexOf(platform),
          type: "spring",
          stiffness: 300
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <FontAwesomeIcon 
          icon={platform.icon} 
          className="mr-3 text-xl"
        />
        <span className="font-medium">
          {platform.name}
          {!isTrusted && <span className="text-xs ml-1">(unverified)</span>}
        </span>
      </motion.a>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen relative overflow-x-hidden">
      <SEO
        title="ClaudyGod Music - Stream Gospel Albums & Singles"
        description="Stream ClaudyGod's gospel music on all platforms. New albums 'Very Glorious', 'Lover of My Soul', and 'King of Heaven' available now."
        keywords="gospel music, christian albums, worship songs, claudygod music"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          "name": "ClaudyGod",
          "url": "https://claudygod.org/music",
          "genre": "Gospel, Contemporary Christian, Afro-Gospel",
          "image": "https://claudygod.org/music/src/assets/album-cover.jpg",
          "sameAs": [
            "https://open.spotify.com/artist/...",
            "https://music.apple.com/artist/..."
          ]
        }}
      />
      
      {/* Security Modal */}
      {isModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="bg-gradient-to-r from-purple-800 to-purple-600 p-5">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <FontAwesomeIcon icon={faShieldAlt} className="mr-3 text-amber-300" />
                  Security Notice
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Stream our Music on various Streaming Platforms
                </p>
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg break-words text-sm font-mono">
                  {redirectUrl}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRedirect}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 rounded-lg text-white font-medium transition-all shadow-md"
                >
                  Continue to Site
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-purple-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-500 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-600 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="md:text-7xl max-md:text-4xl font-bold font-roboto-condensed mb-6 tracking-tight">
              Music
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-8"></div>
            <p className="text-lg max-w-2xl font-work-sans opacity-90">
              Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel Songs through ClaudyGod's Inspirational Journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Streaming Platforms - Main Section */}
      <section className="py-16 relative">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-purple-900/10 to-transparent -translate-y-full"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-roboto-condensed mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Available On All Platforms
            </motion.h2>
            <motion.p 
              className="text-gray-600 md:text-xl max-md:text-base font-work-sans max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Stream ClaudyGod's music everywhere, Anytime, Anyday, Anywhere.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {securedMusicPlatforms.map((platform) => (
              <SecuredLink key={platform.name} platform={platform} />
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-flex items-center bg-blue-50 px-5 py-3 rounded-full border border-blue-100">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-3 text-blue-500 text-lg" />
              <span className="text-sm text-blue-700 font-work-sans">
                We verify all external links for your security
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Release Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-purple-900 to-indigo-800 p-8 rounded-2xl shadow-xl mb-16 text-center overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-purple-500 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-indigo-600 blur-3xl"></div>
            </div>
            <h2 className="max-md:text-3xl md:text-5xl font-bold font-roboto-condensed mb-2 text-white relative z-10">
              Latest Release: You Are Our Everything
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mt-4"></div>
          </motion.div>
          
          <div className="space-y-16">
            {albums.map((album) => (
              <motion.div
                key={album.id}
                className="grid md:grid-cols-3 gap-10 items-start bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="md:col-span-1">
                  <div className="overflow-hidden rounded-xl shadow-xl">
                    <img 
                      src={album.image} 
                      alt={album.title} 
                      className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-3xl font-bold font-roboto-condensed mb-2 text-gray-900">
                    {album.title}
                  </h3>
                  <p className="text-gray-600 font-work-sans mb-8">
                    Released: <span className="font-medium text-purple-700">{album.year}</span>
                  </p>
                  
                  <div className="my-10 text-center">
                    <p className="text-gray-700 font-work-sans mb-6 italic max-w-md mx-auto text-lg">
                      Now available on all major streaming platforms
                    </p>
                    
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <FontAwesomeIcon 
                          icon={faArrowDown} 
                          className="text-blue-500 mb-3 text-2xl" 
                        />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="max-md:text-2xl md:text-4xl mb-6 text-center text-gray-800 font-bold font-roboto-condensed">
                      Experience the Sound - Stream Now!
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                      {latestReleasePlatforms.map((platform, i) => {
                        const sanitizedUrl = SecurityUtils.sanitizeUrl(platform.url);
                        const isTrusted = SecurityUtils.isTrustedDomain(sanitizedUrl, TRUSTED_DOMAINS);
                        
                        return (
                          <motion.button 
                            key={i}
                            onClick={(e) => {
                              e.preventDefault();
                              setRedirectUrl(sanitizedUrl);
                              setIsModalOpen(true);
                            }}
                            className={`inline-flex items-center px-5 py-3 rounded-full transition-all shadow-md ${
                              isTrusted 
                                ? 'bg-gradient-to-br from-blue-50 to-white text-blue-700 hover:from-blue-100 hover:to-blue-50 hover:shadow-lg border border-blue-100' 
                                : 'bg-gradient-to-br from-red-50 to-white text-red-700 hover:from-red-100 hover:to-red-50 border border-red-100'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="font-medium font-raleway">
                              Play on {platform.name}
                            </span>
                            <FontAwesomeIcon 
                              icon={faExternalLinkAlt} 
                              className="ml-3 text-sm"
                            />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <DonationCallToAction
  title="Partner with Our Ministry"
  subtitle="Your Support Makes a Difference"
  description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
  goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
  donateUrl="/donate"
/>
      <AudioMackComponent />
      <DownloadSection />
      <NewsletterForm />
    </div>
  );
};