import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot,
  faEnvelope,
  faPhone,
  faCopyright
} from '@fortawesome/free-solid-svg-icons';
import { Social } from '../Social';
import { Streaming } from '../Streaming';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0d0219] text-white w-full">
      <div className="h-1 bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900"></div>   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-800 p-1 rounded-xl mr-4">
                <div className="bg-[#0d0219] p-2 rounded-lg">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-400 w-12 h-12 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">CG</span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-roboto-condensed
 tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ClaudyGod
                </h2>
                <p className="text-gray-400 font-work-sans-light text-sm">Music & Ministries</p>
              </div>
            </div>
            
            <p className="text-gray-300 font-work-sans mb-6 text-sm leading-relaxed">
              Creating inspirational music that uplifts the soul and brings people closer to faith through melody and message.
            </p>
            
            <div className="flex space-x-3">
              <div className="bg-gray-800 p-3 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
                <span className="text-xs text-gray-300 font-raleway-medium
">Connect with us</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-roboto-condensed mb-6 pb-2 border-b border-gray-700 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Music', 'Events', 'Ministries', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 font-work-sans
 hover:text-purple-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="flex flex-col">
            <h3 className="text-lg font-roboto-condensed mb-6 pb-2 border-b border-gray-700 tracking-wide">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <FontAwesomeIcon icon={faLocationDot} className="text-purple-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-300">Our Location</h4>
                  <p className="text-gray-400 text-sm">San Ramon, California</p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <FontAwesomeIcon icon={faEnvelope} className="text-purple-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-300">Email Address</h4>
                  <a href="mailto:info@claudygod.com" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                    info@claudygod.com
                  </a>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <FontAwesomeIcon icon={faPhone} className="text-purple-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-300">Phone Number</h4>
                  <p className="text-gray-400 text-sm">+1 (385) 219‑6632</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Connect With Us Column */}
          <div className="flex flex-col">
            <h3 className="text-lg font-roboto-condensed mb-6 pb-2 border-b border-gray-700 tracking-wide">Connect With Us</h3>
            <div className="mb-8">
              <Social />
            </div>
          </div>
        </div>
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-roboto-condensed text-white tracking-wide mb-3">
              Join Our Newsletter
            </h3>
            <p className="text-gray-300 font-raleway-medium
 text-sm max-w-lg mx-auto">
              Stay updated with our latest music releases, ministry events, and inspirational content.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-5 py-3 rounded-lg font-work-sans-light bg-gray-800 text-white focus:outline-none w-full text-base border border-gray-700 focus:border-purple-500"
            />
            <button className="bg-gradient-to-r font-work-sans from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-lg transition duration-300 text-base font-medium hover:opacity-90 whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
        
        {/* Divider before Streaming */}
        <div className="w-full border-t border-gray-800 my-8"></div>
        
        {/* Streaming Section - Centered */}
        <div className="w-full">
          <Streaming />
        </div>
        
        {/* Copyright Section */}
        <div className="w-full border-t border-gray-800 my-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="flex items-center text-gray-500 text-sm mb-4 md:mb-0 font-roboto-condensed">
            <FontAwesomeIcon icon={faCopyright} className="mr-2 text-xs" />
            <span>{currentYear} ClaudyGod Music & Ministries. All rights reserved.</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 font-work-sans
 hover:text-purple-400 transition duration-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 font-work-sans
 hover:text-purple-400 transition duration-300 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 font-work-sans
 hover:text-purple-400 transition duration-300 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};