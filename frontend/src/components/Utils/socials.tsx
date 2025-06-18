import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faYoutube, 
  faFacebookF, 
  faTwitter, 
  faLinkedinIn, 
  faTiktok,
  faApple,
  faDeezer
} from '@fortawesome/free-brands-svg-icons';

export const SocialLinks = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const iconSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : '1x';
  const containerClass = size === 'sm' 
    ? 'flex space-x-3' 
    : size === 'lg' 
      ? 'flex space-x-6' 
      : 'flex space-x-4';

  return (
    <div className={`${containerClass} ${className}`}>
      <a 
        href="https://www.instagram.com/singerclaudygod/?hl=en" 
        aria-label="Instagram"
        className="bg-purple-800 hover:bg-purple-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faInstagram} className="text-white" size={iconSize} />
      </a>
      
      <a 
        href="https://www.youtube.com/@ClaudyGODMinistries" 
        aria-label="YouTube"
        className="bg-purple-800 hover:bg-purple-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faYoutube} className="text-white" size={iconSize} />
      </a>
      
      <a 
        href="https://www.facebook.com/ClaudyGod/" 
        aria-label="Facebook"
        className="bg-purple-800 hover:bg-purple-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faFacebookF} className="text-white" size={iconSize} />
      </a>
      
      <a 
        href="https://twitter.com/claudygod" 
        aria-label="Twitter"
        className="bg-purple-800 hover:bg-purple-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faTwitter} className="text-white" size={iconSize} />
      </a>
      
      <a 
        href="https://www.tiktok.com/@claudygod" 
        aria-label="TikTok"
        className="bg-purple-800 hover:bg-purple-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faTiktok} className="text-white" size={iconSize} />
      </a>
      
      <a 
        href="https://music.apple.com/ng/artist/claudygod/1440081695" 
        aria-label="Apple Music"
        className="bg-purple-800 hover:bg-purple-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faApple} className="text-white" size={iconSize} />
      </a>
      
      <a 
        href="https://www.deezer.com/artist/53266602" 
        aria-label="Deezer"
        className="bg-purple-800 hover:bg-purple-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faDeezer} className="text-white" size={iconSize} />
      </a>
      
      <a 
        href="https://www.linkedin.com/in/claudygod-music-and-ministries-b2887094" 
        aria-label="LinkedIn"
        className="bg-purple-800 hover:bg-purple-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faLinkedinIn} className="text-white" size={iconSize} />
      </a>
    </div>
  );
};