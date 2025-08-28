// src/components/Footer/Social.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faXTwitter, 
  faFacebookF, 
  faInstagram, 
  faLinkedinIn, 
  faTiktok 
} from '@fortawesome/free-brands-svg-icons';

export const Social: React.FC = () => {
  const socialLinks = [
    {
      icon: faFacebookF,
      url: "https://www.facebook.com/ClaudyGod/",
      label: "Facebook",
      color: "bg-[#1877F2]",
      hover: "hover:bg-[#166FE5]"
    },
    {
      icon: faXTwitter,
      url: "https://twitter.com/claudygod",
      label: "Twitter",
      color: "bg-black",
      hover: "hover:bg-[#0D0D0D]"
    },
    {
      icon: faInstagram,
      url: "https://www.instagram.com/singerclaudygod/?hl=en",
      label: "Instagram",
      color: "bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C]",
      hover: "hover:from-[#8F47B9] hover:via-[#C73E8C] hover:to-[#E63C74]"
    },
    {
      icon: faLinkedinIn,
      url: "https://www.linkedin.com/in/claudygod-music-and-ministries-b2887094",
      label: "LinkedIn",
      color: "bg-[#0A66C2]",
      hover: "hover:bg-[#095DB9]"
    },
    {
      icon: faTiktok,
      url: "https://www.tiktok.com/@claudygod",
      label: "TikTok",
      color: "bg-[#000000]",
      hover: "hover:bg-[#111111]"
    }
  ];

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