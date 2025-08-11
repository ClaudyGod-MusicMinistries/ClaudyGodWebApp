/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { latestReleasePlatforms, securedMusicPlatforms } from '../components/data/musicData';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { useTheme } from '../contexts/ThemeContext';

import { 
  SemiBoldText,
  LightText,
  ExtraBoldText,
  BoldText
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';

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
  const { colorScheme } = useTheme();
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
        <BoldText style={{ color: colorScheme.buttonText }}>
          {platform.name}
          {!isTrusted && <LightText className="text-xs ml-1">(unverified)</LightText>}
        </BoldText>
      </motion.a>
    );
  };

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: colorScheme.gray[100] }}
    >
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
            className="max-w-md w-full overflow-hidden"
            style={{ backgroundColor: colorScheme.gray[200] }}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div 
              className="p-5"
              style={{ 
                background: `linear-gradient(to right, ${colorScheme.gray[100]}, ${colorScheme.gray[100]})`
              }}
            >
              <div className="flex justify-between items-center">
                <ExtraBoldText className=" flex items-center" style={{ color: colorScheme.primary}}>
                  <FontAwesomeIcon icon={faShieldAlt} className="mr-3 text-amber-300" />
                  Security Notice
                </ExtraBoldText>
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
                <LightText className="mb-4" style={{ color: colorScheme.primary}}>
                  Stream our Music on various Streaming Platforms
                </LightText>
                <div 
                  className="p-3 rounded-lg break-words text-sm font-mono"
                  style={{ 
                    backgroundColor: colorScheme.gray[100],
                    border: `1px solid ${colorScheme.gray[200]}`,
                    color: colorScheme.gray[800]
                  }}
                >
                  {redirectUrl}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <CustomButton
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  variant="primary"
                  onClick={handleRedirect}
                  className="flex-1"
                  style={{
                    background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})`
                  }}
                >
                  Continue to Site
                </CustomButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Hero Section */}
      <section 
        className="pt-32 pb-24 relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom right, ${colorScheme.primary}, ${colorScheme.primary})`
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: colorScheme.accent }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: colorScheme.secondary }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ExtraBoldText fontSize='3rem' style={{ color: colorScheme.gray[300] }}>
              Music
            </ExtraBoldText>
            <div 
              className="w-24 h-1.5 rounded-full mb-8"
              style={{
                background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.highlight})`
              }}
            ></div>
            <LightText style={{ color: colorScheme.text }}>
              Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel Songs through ClaudyGod's Inspirational Journey.
            </LightText>
          </motion.div>
        </div>
      </section>

      {/* Streaming Platforms - Main Section */}
      <section className="py-16 relative">
        <div 
          className="absolute inset-x-0 top-0 h-16 -translate-y-full"
          style={{
            background: `linear-gradient(to bottom, ${colorScheme.primary}10, transparent)`
          }}
        ></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ExtraBoldText fontSize='1.5rem' style={{ color: colorScheme.primary }}>
                Available On All Platforms
              </ExtraBoldText>
              <LightText 
                className="md:text-xl max-md:text-base max-w-2xl mx-auto"
                style={{ color: colorScheme.gray[600] }}
              >
                Stream ClaudyGod's music everywhere, Anytime, Anyday, Anywhere.
              </LightText>
            </motion.div>
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
            <div 
              className="inline-flex items-center px-5 py-3 rounded-full border"
              style={{
                backgroundColor: colorScheme.gray[100],
                borderColor: colorScheme.gray[200]
              }}
            >
              <FontAwesomeIcon 
                icon={faInfoCircle} 
                className="mr-3 text-lg"
                style={{ color: colorScheme.primary }}
              />
              <LightText style={{ color: colorScheme.primary }}>
                We verify all external links for your security
              </LightText>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Release Section */}
      <section 
        className="py-16"
        style={{
          background: `linear-gradient(to bottom right, ${colorScheme.background}, ${colorScheme.gray[50]})`
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="p-8 rounded-2xl shadow-xl mb-16 text-center overflow-hidden relative"
            style={{
              background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.accent})`
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 opacity-20">
              <div 
                className="absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl"
                style={{ backgroundColor: colorScheme.accent }}
              ></div>
              <div 
                className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl"
                style={{ backgroundColor: colorScheme.secondary }}
              ></div>
            </div>
            <ExtraBoldText fontSize='2rem'>
              Latest Release: You Are Our Everything
            </ExtraBoldText>
            <div 
              className="w-32 h-1 rounded-full mx-auto mt-4"
              style={{
                background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.highlight})`
              }}
            ></div>
          </motion.div>
          
          <div className="space-y-16">
            {albums.map((album) => (
              <motion.div
                key={album.id}
                className="grid md:grid-cols-3 gap-10 items-start rounded-2xl shadow-lg p-6 max-w-6xl mx-auto"
                style={{ backgroundColor: colorScheme.card }}
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
                  <ExtraBoldText className="text-3xl mb-2" 
                  style={{ color: colorScheme.text }}
                  fontSize='2rem'
                  >
                    {album.title}
                  </ExtraBoldText>
                  <LightText className="mb-8" style={{ color: colorScheme.gray[200] }}>
                    Released 
                    <SemiBoldText style={{ color: colorScheme.primary }}
                    fontSize='1rem'
                    >{album.year}</SemiBoldText>
                  </LightText>
                  
                  <div className="my-10 text-center">
                    <LightText className="mb-6 italic max-w-md mx-auto" 
                    style={{ color: colorScheme.text }}
                    fontSize='1rem'>
                      Now available on all major streaming platforms
                    </LightText>
                    
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <FontAwesomeIcon 
                          icon={faArrowDown} 
                          className="mb-3 text-2xl"
                          style={{ color: colorScheme.primary }}
                        />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <ExtraBoldText className="max-md:text-2xl md:text-4xl mb-6 text-center" 
                    style={{ color: colorScheme.text }}>
                      Experience the Sound - Stream Now!
                    </ExtraBoldText>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                      {latestReleasePlatforms.map((platform, i) => {
                        const sanitizedUrl = SecurityUtils.sanitizeUrl(platform.url);
                        const isTrusted = SecurityUtils.isTrustedDomain(sanitizedUrl, TRUSTED_DOMAINS);
                        
                        return (
                          <motion.div 
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                         <CustomButton
  // variant="primary"
  size="sm"
  style={{ BackgroundColor: colorScheme.accent }}
  onClick={(e) => {
    e.preventDefault();
    setRedirectUrl(sanitizedUrl);
    setIsModalOpen(true);
  }}
  fullWidth
  // className="rounded-xl px-6 py-3"
>
                              <BoldText fontSize='0.8rem'>
                                Play on {platform.name}
                              </BoldText>
                              <FontAwesomeIcon 
                                icon={faExternalLinkAlt} 
                                // className="ml-3 text-sm"
                              />
                            </CustomButton>
                          </motion.div>
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