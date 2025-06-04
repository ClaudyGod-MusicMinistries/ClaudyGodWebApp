// components/AlbumRelease.tsx
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { SecureStreamButton } from './SecureStreamButton';
import { MusicPlatform } from './types/types';
import { SecurityUtils, TRUSTED_DOMAINS } from './Utils/securityUtils';

interface AlbumReleaseProps {
  album: {
    id: number;
    title: string;
    year: string;
    image: string;
    tracks: Array<{ id: number; title: string; duration: string }>;
  };
  platforms: MusicPlatform[];
  onLinkClick: (url: string, e: React.MouseEvent) => void;
}

export const AlbumRelease = ({ album, platforms, onLinkClick }: AlbumReleaseProps) => (
  <motion.div
    className="grid md:grid-cols-3 gap-8 items-start"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
  >
    <div className="md:col-span-1">
      <div className="bg-gray-200 p-3 shadow-lg">
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
          <SecureStreamButton />
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800 roboto-condensed">
          Experience the Sound - Stream Now!
        </h3>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {platforms.slice(0, 3).map((platform, i) => {
            const sanitizedUrl = SecurityUtils.sanitizeUrl(platform.url);
            const isTrusted = SecurityUtils.isTrustedDomain(sanitizedUrl, TRUSTED_DOMAINS);
            
            return (
              <a 
                key={i}
                href={sanitizedUrl}
                onClick={(e) => onLinkClick(platform.url, e)}
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
              </a>
            );
          })}
        </div>
      </div>
    </div>
  </motion.div>
);