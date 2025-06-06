import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const ContactInfo: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl md:text-2xl roboto-condensed text-gray-900 mb-6">
        Management & General Inquiries
      </h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <FontAwesomeIcon icon={faMapPin} className="text-purple-900 mt-1 mr-3 text-lg" />
          <div>
            <p className="font-medium">ClaudyGod Music & Ministries</p>
            <p>San Ramon, California</p>
          </div>
        </div>

        <div className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="text-purple-900 mr-3 text-lg" />
          <a href="tel:+13852196632" className="hover:text-purple-800 transition-colors">
            +1 (385) 219-6632
          </a>
        </div>

        <div className="flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-purple-900 mr-3 text-lg" />
          <a
            href="mailto:info@ClaudyGod.com"
            className="hover:text-purple-800 transition-colors"
          >
            info@ClaudyGod.com
          </a>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Connect With Us</h4>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Follow us on Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} className="text-purple-900" />
          </a>

          <a
            href="https://x.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Follow us on X"
          >
            <FontAwesomeIcon icon={faXTwitter} className="text-purple-900" />
          </a>

          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Follow us on Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-purple-900" />
          </a>

          <a
            href="https://www.youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Follow us on YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} className="text-purple-900" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
