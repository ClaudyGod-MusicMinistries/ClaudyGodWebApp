// src/components/Footer/Social.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks } from './data/Socials';

export const Social: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            text-white transition-all duration-300 transform hover:-translate-y-1
            shadow-lg ${social.color} ${social.hover}
            group relative overflow-hidden
          `}
          aria-label={`Visit our ${social.label} page`}
        >
          <FontAwesomeIcon
            icon={social.icon}
            className="text-xl z-10 relative"
          />

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </a>
      ))}
    </div>
  );
};
