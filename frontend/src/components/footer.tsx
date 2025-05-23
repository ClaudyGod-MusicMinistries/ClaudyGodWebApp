
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Social } from '../components/Social';
import { Streaming }  from '../components/Streaming';
import { Log } from '../assets/';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgba(24,0,44,1)] text-white">
      {/* --- three‑column grid --- */}
      <div className="max-w-5xl mx-auto py-6 px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          {/* Col 1: Logo & Title, left‑aligned */}
          <div className="justify-self-start flex flex-col items-center text-center">
            <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden shadow-lg mb-2">
              <img
                src={Log}
                alt="CMM Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl md:text-3xl font-bold text-white hover:text-indigo-600 transition duration-300 cursor-pointer">
              ClaudyGod
            </h2>
            <p className="text-xl md:text-xl text-gray-100 font-light tracking-wide hover:text-indigo-500 transition duration-300 cursor-pointer">
              Music & Ministries
            </p>
          </div>
          
          {/* Col 2: Contact info, center‑aligned */}
          <div className="justify-self-center">
            <h3 className="text-xl font-bold mb-4">Keep In Touch With Us</h3>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <a href="mailto:info@ClaudyGod.com" className="hover:underline">
                info@ClaudyGod.com
              </a>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
              <span>San Ramon, California</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <span>+1 (385) 219‑6632</span>
            </div>
          </div>
          
          {/* Col 3: Social links, right‑aligned */}
          <div className="justify-self-end">
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <Social />
          </div>
        </div>
      </div>
      
      {/* --- full‑width top border --- */}
      <div className="w-full border-t border-purple-800" />

      {/* --- streaming section, centered --- */}
      <div className="max-w-5xl mx-auto py-8 px-2 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl font-bold mb-4">STREAM ACROSS ALL PLATFORMS</h3>
        <div className="flex justify-center">
          <Streaming />
        </div>
      </div>

      {/* --- copyright --- */}
      <div className="mt-4 mb-6 text-center text-sm text-gray-300">
        © 2025 CLAUDYGOD. All Rights Reserved. Built & Maintained by Peter4tech.
      </div>
    </footer>
  );
};

export default Footer;
