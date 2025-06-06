import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const ContactFooter: React.FC = () => {
  return (
    <div className="bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">ClaudyGod Music & Ministries</h2>
        <p className="text-lg mb-6">Connect With Us On Various Social Platforms</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Follow us on Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} className="text-white" />
          </a>

          <a
            href="https://x.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Follow us on X"
          >
            <FontAwesomeIcon icon={faXTwitter} className="text-white" />
          </a>

          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Follow us on Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-white" />
          </a>

          <a
            href="https://www.youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Follow us on YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} className="text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactFooter;
