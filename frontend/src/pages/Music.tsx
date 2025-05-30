import { useState } from 'react';
import { motion } from 'framer-motion';
import { AudioMackComponent } from '../components/audioMack';
import { Back3, Back1 } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExternalLinkAlt,
  faShieldAlt,
  faInfoCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { 
  faSpotify, 
  faApple, 
  faYoutube, 
  faDeezer, 
  faAmazon,
} from '@fortawesome/free-brands-svg-icons';
import { NewsletterForm } from '../components/Newsletter';

// Updated music platforms
const securedMusicPlatforms = [
  { 
    name: 'Spotify', 
    url: 'https://open.spotify.com/album/2MY5xlrYfuvKXaYfdB5v2A?referral=labelaffiliate&utm_source=1101lBmnzTP8&utm_medium=Indie_CDBaby&utm_campaign=labelaffiliate', 
    icon: faSpotify,
    bgColor: 'bg-[#1DB954]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'Apple Music', 
    url: 'https://music.apple.com/ng/album/very-glorious/1789665669', 
    icon: faApple,
    bgColor: 'bg-[#000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'YouTube Music', 
    url: 'https://youtube.com/@claudygodministries?si=6Ne99tTC48Ihv44s', 
    icon: faYoutube,
    bgColor: 'bg-[#FF0000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'Deezer', 
    url: 'https://www.deezer.com/us/album/695949191', 
    icon: faDeezer,
    bgColor: 'bg-[#FEAA2D]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'Amazon Music', 
    url: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20', 
    icon: faAmazon,
    bgColor: 'bg-[#FF9900]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true
  }
];

const albums = [
  {
    id: 1,
    title: 'You Are Our Everything',
    year: '2023',
    image: Back3,
    tracks: [
      { id: 1, title: 'Amazing Grace', duration: '3:45' },
      { id: 2, title: 'Heavenly Joy', duration: '4:20' },
      { id: 3, title: 'Soul Revival', duration: '5:15' },
      { id: 4, title: 'Worship Medley', duration: '3:30' }
    ]
  },
 
];

// Security utility functions
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

// Trusted domains for whitelisting
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

  // Handle link click - opens modal instead of redirecting
  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    const sanitizedUrl = SecurityUtils.sanitizeUrl(url);
    setRedirectUrl(sanitizedUrl);
    setIsModalOpen(true);
  };

  // Handle redirect confirmation
  const handleRedirect = () => {
    if (redirectUrl) {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    }
    setIsModalOpen(false);
  };

  // SecuredLink component
  const SecuredLink = ({ platform }: { platform: typeof securedMusicPlatforms[0] }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Sanitize URL and verify domain
    const sanitizedUrl = SecurityUtils.sanitizeUrl(platform.url);
    const isTrusted = SecurityUtils.isTrustedDomain(sanitizedUrl, TRUSTED_DOMAINS);
    
    return (
      <motion.a
        href={sanitizedUrl}
        onClick={(e) => handleLinkClick(platform.url, e)}
        className={`flex items-center px-6 py-3 rounded-lg shadow-md transition-shadow ${platform.bgColor} ${platform.textColor} ${
          isHovered ? 'shadow-lg' : ''
        } ${isTrusted ? '' : 'opacity-80'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * securedMusicPlatforms.indexOf(platform) }}
      >
        <FontAwesomeIcon 
          icon={platform.icon} 
          className="mr-2 text-lg"
        />
        <span>
          {platform.name}
          {!isTrusted && <span className="text-xs ml-1">(unverified)</span>}
        </span>
      </motion.a>
    );
  };

  return (
    <div className="bg-white min-h-screen relative">
      {/* Security Confirmation Modal */}
      {isModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-900 flex items-center">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Security Notice
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-3">
                Stream our Music on various Streaming Platforms
              </p>
              <div className="bg-gray-100 p-3 rounded-lg break-words text-sm font-mono">
                {redirectUrl}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRedirect}
                className="flex-1 py-3 px-4 bg-purple-700 hover:bg-purple-800 rounded-lg text-white font-medium transition-colors"
              >
                Continue to Site
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Music Intro Section */}
      <section className="pt-32 pb-20 bg-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl roboto-condensed mb-6">Music</h1>
            <div className="w-20 h-1 bg-white mb-8"></div>
            <p className="text-sm max-w-2xl work-sans">
              Experience the inspirational sound of ClaudyGod's gospel music – with a unique blend of American Gospel and Afro-gospel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl roboto-condensed mb-4">Available On All Platforms</h2>
            <p className="text-gray-600 mt-2  md:text-xl max-md:text-sm work-sans">
              Stream ClaudyGod's music everywhere, Anytime, Anyday, Anywhere.
            </p>
            {/* <div className="mt-4 text-sm text-gray-500 flex items-center justify-center">
              <FontAwesomeIcon icon={faShieldAlt} className="mr-2 text-green-500" />
              <span>All links are secured with our protection system</span>
            </div> */}
          </div>
          
          <div className="flex flex-wrap raleway-medium justify-center gap-4">
            {securedMusicPlatforms.map((platform) => (
              <SecuredLink key={platform.name} platform={platform} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500" />
              <span className="text-sm text-blue-700 work-sans">
                We verify all external links for your security
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Release */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="bg-purple-900 p-10 text-white max-md:text-sm  md:text-5xl roboto-condensed mb-12 text-center rounded-lg">
            Latest Release: You Are Our Everything
          </h2>
          <div className="space-y-10">
            {albums.map((album) => (
              <motion.div
                key={album.id}
                className="grid md:grid-cols-3 gap-8 items-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="md:col-span-1">
                  <div className="bg-purple-200 p-4 rounded-lg shadow-lg">
                    <img 
                      src={album.image} 
                      alt={album.title} 
                      className="w-full h-100 object-cover rounded"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-2xl roboto-condensed mb-2">{album.title}</h3>
                  <p className="text-gray-600 work-sans mb-6">Released: {album.year}</p>
                  
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b">
                      <span className="font-medium">Tracks</span>
                    </div>
                    
                    <div className="divide-y">
                      {album.tracks.map((track) => (
                        <div 
                          key={track.id} 
                          className="p-4 flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <span className="text-gray-800 raleway-light">{track.title}</span>
                          </div>
                          {/* <span className="text-gray-500">{track.duration}</span> */}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    {securedMusicPlatforms.slice(0, 3).map((platform, i) => {
                      const sanitizedUrl = SecurityUtils.sanitizeUrl(platform.url);
                      const isTrusted = SecurityUtils.isTrustedDomain(sanitizedUrl, TRUSTED_DOMAINS);
                      
                      return (
                        <a 
                          key={i}
                          href={sanitizedUrl}
                          onClick={(e) => handleLinkClick(platform.url, e)}
                          className={`inline-flex items-center text-sm px-3 py-1 border rounded-full ${
                            isTrusted 
                              ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                              : 'border-red-300 text-red-700 hover:bg-red-50'
                          }`}
                        >
                          <span>Listen on {platform.name}</span>
                          <FontAwesomeIcon 
                            icon={faExternalLinkAlt} 
                            className="ml-1 text-xs"
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiomack Section */}
      <AudioMackComponent />

      {/* Newsletter Section */}
      <NewsletterForm />
    </div>
  );
};