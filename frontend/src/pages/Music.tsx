import { useState } from 'react';
import { motion } from 'framer-motion';
import { AudioMackComponent } from '../components/Homepage/audioMack';
import { Cover } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExternalLinkAlt,
  faShieldAlt,
  faInfoCircle,
  faTimes, 
  // faMusic, 
  faArrowDown,
  // faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { 
  faSpotify, 
  faApple, 
  faYoutube, 
  faDeezer, 
  faAmazon,
} from '@fortawesome/free-brands-svg-icons';
import  NewsletterForm  from '../components/Utils/Newsletter';

// Music platforms for main section
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

// Music platforms for latest release section buttons
const latestReleasePlatforms = [
  { 
    name: 'Spotify', 
    url: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd', 
    icon: faSpotify,
    bgColor: 'bg-[#1DB954]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'Apple Music', 
    url: 'https://music.apple.com/ng/album/you-are-our-everything-single/1803827230', 
    icon: faApple,
    bgColor: 'bg-[#000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'YouTube Music', 
    url: 'https://www.youtube.com/watch?v=fK_tCBcnqGs&list=OLAK5uy_nO6i6o85ojjKvu8QQlrV0keV4M_T7PPe4', 
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
const TRUSTED_DOMAINS = [
  'spotify.com',
  'apple.com',
  'youtube.com',
  'deezer.com',
  'amazon.com'
];

// SecureStreamButton Component

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
              Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel Songs through ClaudyGod's Inspirational Journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Streaming Platforms - Main Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl roboto-condensed mb-4">Available On All Platforms</h2>
            <p className="text-gray-600 mt-2  md:text-xl max-md:text-sm work-sans">
              Stream ClaudyGod's music everywhere, Anytime, Anyday, Anywhere.
            </p>
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
                  <div className="bg-gray-200 p-3  shadow-lg">
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
                  
                  <div className="mt-8 text-center flex flex-col items-center">
                    <p className="text-gray-700 work-sans mb-4 italic max-w-md mx-auto">
                      Now available on all major streaming platforms
                    </p>
                    
                    <div className="flex flex-col items-center">
                      <FontAwesomeIcon 
                        icon={faArrowDown} 
                        className="text-blue-500 mb-3 text-xl animate-bounce" 
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4 text-center text-gray-800 roboto-condensed">
                      Experience the Sound - Stream Now!
                    </h3>
                    
                    <div className="flex flex-wrap gap-3 justify-center">
                      {latestReleasePlatforms.slice(0, 3).map((platform, i) => {
                        const sanitizedUrl = SecurityUtils.sanitizeUrl(platform.url);
                        const isTrusted = SecurityUtils.isTrustedDomain(sanitizedUrl, TRUSTED_DOMAINS);
                        
                        return (
                          <button 
                            key={i}
                            onClick={(e) => {
                              e.preventDefault();
                              setRedirectUrl(sanitizedUrl);
                              setIsModalOpen(true);
                            }}
                            className={`inline-flex items-center text-sm px-4 py-2 border rounded-full transition-all ${
                              isTrusted 
                                ? 'border-blue-300 text-blue-700 hover:bg-blue-50 hover:shadow-sm' 
                                : 'border-red-300 text-red-700 hover:bg-red-50'
                            }`}
                          >
                            <span className="font-medium">Play on {platform.name}</span>
                            <FontAwesomeIcon 
                              icon={faExternalLinkAlt} 
                              className="ml-2 text-xs"
                            />
                          </button>
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
      <AudioMackComponent />
      <NewsletterForm />
    </div>
  );
};