
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter , faFacebookF, faInstagram , faLinkedinIn, faTiktok} from '@fortawesome/free-brands-svg-icons';


export const Social: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <a href="https://www.facebook.com/ClaudyGod/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
      <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a href="https://twitter.com/claudygod" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
      <FontAwesomeIcon icon={faXTwitter} />
      </a>
      <a href="https://www.instagram.com/singerclaudygod/?hl=en" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
      <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="https://www.linkedin.com/in/claudygod-music-and-ministries-b2887094
" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
      <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a href="https://www.tiktok.com/@claudygod" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
      <FontAwesomeIcon icon={faTiktok} />
      </a>
    </div>
  );
};