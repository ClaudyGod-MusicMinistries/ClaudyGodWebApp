
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
  <div className="max-w-5xl mx-auto py-6 px-2 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-8 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3">
          {/* Col 1: Logo & Title */}
        <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left px-4 py-6">
        <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-2xl overflow-hidden shadow-lg mb-2">
          <img
            src={Log}
            alt="CMM Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg md:text-4xl roboto-condensed text-white hover:text-indigo-600 transition duration-300 cursor-pointer mb-2">
          ClaudyGod
        </h2>
        <p className="text-base md:text-xl raleway-light text-gray-300 font-light tracking-wide hover:text-indigo-500 transition duration-300 cursor-pointer">
          Music & Ministries
        </p>
      </div>
          
          {/* Col 2: Contact info */}
                <div className="w-full flex flex-col items-center sm:text-center px-4 py-6">
        <h3 className="text-lg font-bold mb-4 roboto-condensed">Keep In Touch With Us</h3>
        <div className="flex items-center mb-3 px-2 py-1">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          <a href="mailto:info@ClaudyGod.com" className="raleway-medium hover:underline text-sm sm:text-base">
            info@ClaudyGod.com
          </a>
        </div>
        <div className="flex items-center mb-3 px-2 py-1">
          <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
          <span className="text-sm sm:text-base  raleway-medium">San Ramon, California</span>
        </div>
        <div className="flex items-center px-2 py-1">
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          <span className="text-sm sm:text-base raleway-medium">+1 (385) 219‑6632</span>
        </div>
      </div>

      {/* Col 3: Social links */}
      <div className="w-full flex flex-col items-center sm:text-right px-4 py-6">
        <h3 className="text-lg font-bold mb-4 roboto-condensed">Connect With Us</h3>
        <Social />
      </div>
    </div>
  </div>

      {/* Rest of the footer remains the same */}
        <div className="w-full border-t border-purple-800" />

    <div className="max-w-5xl mx-auto py-8 px-2 sm:px-6 lg:px-8 text-center">
    <h3 className="text-xl font-bold mb-6 px-4 roboto-condensed">STREAM ACROSS ALL PLATFORMS</h3>
    <div className="flex justify-center px-4">
      <Streaming />
    </div>
  </div>

  <div className="mt-4 mb-6 text-center text-sm work-sans text-gray-300 px-4 py-2">
    © 2025 CLAUDYGOD. All Rights Reserved. Built & Maintained by Peter4tech.
  </div>
</footer>
  );
};