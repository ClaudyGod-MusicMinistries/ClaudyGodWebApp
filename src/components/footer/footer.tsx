import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faEnvelope,
  faPhone,
  faCopyright,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Social } from '../Social';
import { Streaming } from '../Streaming';
import { useTheme } from '../../contexts/ThemeContext';
import {
  SemiBoldText,
  LightText,
  ExtraBoldText,
  BoldText,
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
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="w-full relative overflow-hidden mt-20"
      style={{
        backgroundColor: colorScheme.footer,
        color: colorScheme.white,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-500 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      {/* Top gradient border */}
      <div
        className="h-1 relative z-10"
        style={{
          background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.primary}, ${colorScheme.accent})`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
        {/* Main Footer Content - More Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div
                className="p-1 rounded-xl mr-3 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colorScheme.accent}, ${colorScheme.primary})`,
                }}
              >
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: colorScheme.footer }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${colorScheme.accent}, ${colorScheme.primary})`,
                    }}
                  >
                    <span
                      className="text-white font-bold text-lg"
                      style={{ color: colorScheme.white }}
                    >
                      CG
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <ExtraBoldText
                  fontSize="24px"
                  className="lg:text-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${colorScheme.accent}, ${colorScheme.secondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ClaudyGod
                </ExtraBoldText>
                <LightText
                  fontSize="12px"
                  style={{ color: colorScheme.gray[400] }}
                  className="mt-1"
                >
                  Music & Ministries
                </LightText>
              </div>
            </div>

            <LightText
              fontSize="13px"
              style={{ color: colorScheme.gray[300] }}
              className="mb-4 leading-relaxed"
            >
              Creating inspirational music that uplifts the soul and brings
              people closer to faith through melody and message.
            </LightText>

            {/* Live Status Badge */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2 animate-pulse"
                  style={{ backgroundColor: colorScheme.success }}
                ></div>
                <LightText
                  fontSize="11px"
                  style={{ color: colorScheme.gray[300] }}
                  className="uppercase tracking-wide"
                >
                  Online Now
                </LightText>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <SemiBoldText
              fontSize="16px"
              className="mb-4 pb-2 tracking-wide relative"
              style={{
                color: colorScheme.accent,
              }}
            >
              Quick Links
              <div
                className="absolute bottom-0 left-0 w-10 h-0.5 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${colorScheme.accent}, transparent)`,
                }}
              ></div>
            </SemiBoldText>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="transition-all duration-300 flex items-center group py-1"
                    style={{ color: colorScheme.gray[300] }}
                  >
                    <div
                      className="w-1 h-1 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125"
                      style={{ backgroundColor: colorScheme.accent }}
                    ></div>
                    <LightText
                      fontSize="13px"
                      className="group-hover:translate-x-1 transition-transform duration-300 hover:text-purple-400"
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
          <div className="lg:col-span-1">
            <SemiBoldText
              fontSize="16px"
              className="mb-4 pb-2 tracking-wide relative"
              style={{
                color: colorScheme.accent,
              }}
            >
              Contact Info
              <div
                className="absolute bottom-0 left-0 w-10 h-0.5 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${colorScheme.accent}, transparent)`,
                }}
              ></div>
            </SemiBoldText>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colorScheme.accent + '20' }}
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ color: colorScheme.accent }}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <SemiBoldText
                    fontSize="12px"
                    style={{ color: colorScheme.gray[300] }}
                    className="mb-0.5"
                  >
                    Our Location
                  </SemiBoldText>
                  <LightText
                    fontSize="12px"
                    style={{ color: colorScheme.gray[400] }}
                  >
                    San Ramon, California
                  </LightText>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colorScheme.accent + '20' }}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ color: colorScheme.accent }}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <SemiBoldText
                    fontSize="12px"
                    style={{ color: colorScheme.gray[300] }}
                    className="mb-0.5"
                  >
                    Email Address
                  </SemiBoldText>
                  <a
                    href="mailto:info@claudygod.com"
                    className="transition-colors duration-300 hover:text-purple-400"
                    style={{ color: colorScheme.gray[400] }}
                  >
                    <LightText fontSize="12px">info@claudygod.com</LightText>
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colorScheme.accent + '20' }}
                  >
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{ color: colorScheme.accent }}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <SemiBoldText
                    fontSize="12px"
                    style={{ color: colorScheme.gray[300] }}
                    className="mb-0.5"
                  >
                    Phone Number
                  </SemiBoldText>
                  <LightText
                    fontSize="12px"
                    style={{ color: colorScheme.gray[400] }}
                  >
                    +1 (385) 219‑6632
                  </LightText>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="lg:col-span-1">
            <SemiBoldText
              fontSize="16px"
              className="mb-4 pb-2 tracking-wide relative"
              style={{
                color: colorScheme.accent,
              }}
            >
              Connect With Us
              <div
                className="absolute bottom-0 left-0 w-10 h-0.5 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${colorScheme.accent}, transparent)`,
                }}
              ></div>
            </SemiBoldText>

            {/* Social Media */}
            <div className="mb-6">
              <Social />
            </div>
          </div>
        </div>

        {/* Newsletter Section - More Compact */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div
            className="rounded-xl p-6 lg:p-8 mb-8 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.gray[800]}80, ${colorScheme.gray[900]}80)`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colorScheme.gray[700]}50`,
            }}
          >
            <div className="text-center mb-6">
              <ExtraBoldText
                fontSize="24px"
                className="lg:text-2xl mb-3"
                style={{ color: colorScheme.accent }}
              >
                Join Our Newsletter
              </ExtraBoldText>
              <LightText
                fontSize="14px"
                style={{ color: colorScheme.gray[300] }}
                className="max-w-md mx-auto leading-relaxed"
              >
                Stay updated with our latest music releases, ministry events,
                and inspirational content.
              </LightText>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg focus:outline-none w-full text-sm border-2 transition-all duration-300 focus:scale-105 focus:border-purple-500"
                style={{
                  backgroundColor: colorScheme.gray[800],
                  color: colorScheme.white,
                  borderColor: colorScheme.gray[600],
                }}
              />
              <CustomButton
                variant="primary"
                size="md"
                className="whitespace-nowrap transform hover:scale-105 transition-transform duration-300 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colorScheme.accent}, ${colorScheme.secondary})`,
                }}
              >
                <BoldText className="text-white text-sm">Subscribe</BoldText>
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Streaming Section */}
        <div className="w-full mb-8">
          <Streaming />
        </div>

        {/* Copyright Section */}
        <div
          className="w-full my-6"
          style={{ borderTop: `1px solid ${colorScheme.gray[700]}` }}
        ></div>

        <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            {/* Copyright */}
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCopyright}
                className="mr-2 text-xs"
                style={{ color: colorScheme.text }}
              />
              <LightText
                fontSize="12px"
                style={{ color: colorScheme.text }}
                className="hover:text-purple-400 transition-colors duration-300"
              >
                {currentYear} ClaudyGod Music & Ministries. All rights reserved.
              </LightText>
            </div>

            {/* Legal Links with dots */}
            <div className="flex flex-wrap justify-center items-center space-x-3">
              {legalLinks.map((link, index) => (
                <div key={link.name} className="flex items-center">
                  {/* Dot separator (not for first item) */}
                  {index > 0 && (
                    <span
                      className="mx-2 text-xs"
                      style={{ color: colorScheme.text }}
                    >
                      •
                    </span>
                  )}
                  <Link
                    to={link.path}
                    className="transition-colors duration-300 hover:text-purple-400"
                    style={{ color: colorScheme.text }}
                  >
                    <LightText fontSize="12px">{link.name}</LightText>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-purple-600 hover:text-white group"
            style={{
              backgroundColor: colorScheme.gray[800],
              color: colorScheme.text,
            }}
          >
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-xs group-hover:animate-bounce"
              style={{ color: 'inherit' }}
            />
            {/* <LightText fontSize="12px" style={{ color: 'inherit' }}>
              Back to Top
            </LightText> */}
          </button>
        </div>
      </div>
    </footer>
  );
};
