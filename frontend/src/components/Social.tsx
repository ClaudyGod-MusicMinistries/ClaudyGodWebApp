
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter , faFacebookF, faInstagram} from '@fortawesome/free-brands-svg-icons';


export const Social: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
      <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
      <FontAwesomeIcon icon={faXTwitter} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
      <FontAwesomeIcon icon={faInstagram} />
      </a>
    </div>
  );
};