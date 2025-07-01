// components/SecuredLink.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SecurityUtils, TRUSTED_DOMAINS } from './util/securityUtils';
import { MusicPlatform } from './types/types';
// import { MusicPlatform } from '../types';

interface SecuredLinkProps {
  platform: MusicPlatform;
  onClick: (url: string, e: React.MouseEvent) => void;
}

export const SecuredLink = ({ platform, onClick }: SecuredLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sanitizedUrl = SecurityUtils.sanitizeUrl(platform.url);
  const isTrusted = SecurityUtils.isTrustedDomain(sanitizedUrl, TRUSTED_DOMAINS);
  
  return (
    <motion.a
      href={sanitizedUrl}
      onClick={(e) => onClick(platform.url, e)}
      className={`flex items-center px-6 py-3 rounded-lg shadow-md transition-shadow ${platform.bgColor} ${platform.textColor} ${
        isHovered ? 'shadow-lg' : ''
      } ${isTrusted ? '' : 'opacity-80'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
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