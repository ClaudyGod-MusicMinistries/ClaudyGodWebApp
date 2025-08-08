import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot,
  faEnvelope,
  faPhone,
  faCopyright
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Social } from '../Social';
import { Streaming } from '../Streaming';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  SemiBoldText,
  LightText,
  ExtraBoldText,
  BoldText
} from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';

export const Footer: React.FC = () => {
  const { colorScheme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/biography' },
    { name: 'Music', path: '/music' },
    { name: 'Store', path: '/store' },
    { name: 'Contact', path: '/contact' }
  ];
  
  return (
    <footer 
      className="w-full"
      style={{ 
        backgroundColor: colorScheme.footer,
        color: colorScheme.white
      }}
    >
      {/* Top gradient border */}
      <div 
        className="h-1"
        style={{ 
          background: `linear-gradient(to right, ${colorScheme.accent}90, ${colorScheme.primary}, ${colorScheme.accent}90)`
        }}
      ></div>   
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div 
                className="p-1 rounded-xl mr-4"
                style={{ 
                  background: `linear-gradient(to bottom right, ${colorScheme.accent}, ${colorScheme.accent})`
                }}
              >
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: colorScheme.footer }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${colorScheme.accent}, ${colorScheme.primary})`
                    }}
                  >
                    <span 
                      className="text-white font-bold text-xl"
                      style={{ color: colorScheme.white }}
                    >
                      CG
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <ExtraBoldText 
                  fontSize="32px"
                  style={{ 
                    background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.secondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  ClaudyGod
                </ExtraBoldText>
                <LightText 
                  fontSize="14px"
                  style={{ color: colorScheme.gray[400] }}
                >
                  Music & Ministries
                </LightText>
              </div>
            </div>
            
            <LightText 
              fontSize="14px"
              style={{ color: colorScheme.gray[300] }}
              className="mb-6 leading-relaxed"
            >
              Creating inspirational music that uplifts the soul and brings people closer to faith through melody and message.
            </LightText>
            
            <div className="flex space-x-3">
              <div 
                className="p-3 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colorScheme.gray[800] }}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2 animate-pulse"
                  style={{ backgroundColor: colorScheme.success }}
                ></div>
                <LightText 
                  fontSize="12px"
                  style={{ color: colorScheme.gray[300] }}
                >
                  Connect with us
                </LightText>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col">
            <SemiBoldText 
              fontSize="18px"
              className="mb-6 pb-2 tracking-wide"
              style={{ 
                color: colorScheme.accent,
                borderBottom: `1px solid ${colorScheme.gray[700]}`
              }}
            >
              Quick Links
            </SemiBoldText>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="transition-all duration-300 flex items-center group"
                    style={{ color: colorScheme.gray[300] }}
                  >
                    <span 
                      className="w-1 h-1 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: colorScheme.accent }}
                    ></span>
                    <LightText 
                      fontSize="14px"
                      className="group-hover:text-purple-400"
                      style={{ color: 'inherit' }}
                    >
                      {link.name}
                    </LightText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="flex flex-col">
            <SemiBoldText 
              fontSize="18px"
              className="mb-6 pb-2 tracking-wide"
              style={{ 
                color: colorScheme.accent,
                borderBottom: `1px solid ${colorScheme.gray[700]}`
              }}
            >
              Contact Us
            </SemiBoldText>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <FontAwesomeIcon 
                    icon={faLocationDot} 
                    style={{ color: colorScheme.accent }} 
                  />
                </div>
                <div className="ml-4">
                  <SemiBoldText fontSize="14px" style={{ color: colorScheme.gray[300] }}>
                    Our Location
                  </SemiBoldText>
                  <LightText fontSize="14px" style={{ color: colorScheme.gray[400] }}>
                    San Ramon, California
                  </LightText>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <FontAwesomeIcon 
                    icon={faEnvelope} 
                    style={{ color: colorScheme.accent }} 
                  />
                </div>
                <div className="ml-4">
                  <SemiBoldText fontSize="14px" style={{ color: colorScheme.gray[300] }}>
                    Email Address
                  </SemiBoldText>
                  <a 
                    href="mailto:info@claudygod.com" 
                    className="transition-colors"
                    style={{ color: colorScheme.gray[400] }}
                  >
                    <LightText fontSize="14px" className="hover:text-purple-400">
                      info@claudygod.com
                    </LightText>
                  </a>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <FontAwesomeIcon 
                    icon={faPhone} 
                    style={{ color: colorScheme.accent }} 
                  />
                </div>
                <div className="ml-4">
                  <SemiBoldText fontSize="14px" style={{ color: colorScheme.gray[300] }}>
                    Phone Number
                  </SemiBoldText>
                  <LightText fontSize="14px" style={{ color: colorScheme.gray[400] }}>
                    +1 (385) 219‑6632
                  </LightText>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Social Column */}
          <div className="flex flex-col">
            <SemiBoldText 
              fontSize="18px"
              className="mb-6 pb-2 tracking-wide"
              style={{ 
                color: colorScheme.accent,
                borderBottom: `1px solid ${colorScheme.gray[700]}`
              }}
            >
              Connect With Us
            </SemiBoldText>
            <div className="mb-8">
              <Social />
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <ExtraBoldText 
              fontSize="36px"
      
              style={{ color: colorScheme.accent}}
            >
              Join Our Newsletter
            </ExtraBoldText>
            <LightText 
              fontSize="14px"
              style={{ color: colorScheme.gray[300] }}
              className="max-w-lg mx-auto"
            >
              Stay updated with our latest music releases, ministry events, and inspirational content.
            </LightText>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-5 py-3 rounded-lg focus:outline-none w-full text-base border focus:border-purple-500"
              style={{
                backgroundColor: colorScheme.gray[800],
                color: colorScheme.white,
                borderColor: colorScheme.gray[700]
              }}
            />
            <CustomButton
              variant="primary"
              size="md"
              className="whitespace-nowrap"
              style={{
                background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.secondary})`
              }}
            >
              <BoldText>Subscribe Now</BoldText>
            </CustomButton>
          </div>
        </div>
        
        {/* Divider */}
        <div 
          className="w-full my-8"
          style={{ borderTop: `1px solid ${colorScheme.gray[800]}` }}
        ></div>
        
        {/* Streaming Section */}
        <div className="w-full">
          <Streaming />
        </div>
        
        {/* Copyright Section */}
        <div 
          className="w-full my-8"
          style={{ borderTop: `1px solid ${colorScheme.gray[800]}` }}
        ></div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="flex items-center mb-4 md:mb-0">
            <FontAwesomeIcon 
              icon={faCopyright} 
              className="mr-2 text-xs"
              style={{ color: colorScheme.gray[500] }}
            />
            <LightText 
              fontSize="12px"
              style={{ color: colorScheme.gray[500] }}
            >
              {currentYear} ClaudyGod Music & Ministries. All rights reserved.
            </LightText>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="transition duration-300 text-sm"
              style={{ color: colorScheme.gray[500] }}
            >
              <LightText fontSize="12px" className="hover:text-purple-400">
                Privacy Policy
              </LightText>
            </a>
            <a 
              href="#" 
              className="transition duration-300 text-sm"
              style={{ color: colorScheme.gray[500] }}
            >
              <LightText fontSize="12px" className="hover:text-purple-400">
                Terms of Service
              </LightText>
            </a>
            <a 
              href="#" 
              className="transition duration-300 text-sm"
              style={{ color: colorScheme.gray[500] }}
            >
              <LightText fontSize="12px" className="hover:text-purple-400">
                Cookies
              </LightText>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};