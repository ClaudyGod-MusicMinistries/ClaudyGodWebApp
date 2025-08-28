import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';
import { socialPlatforms } from '../data/newsData';

export const FollowUs: React.FC = () => {
  const { colorScheme } = useTheme();

  return (
    <section 
      className="py-12 md:py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${colorScheme.text}, ${colorScheme.surface}, ${colorScheme.surfaceVariant})`
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72 rounded-full" style={{ backgroundColor: colorScheme.accent }}></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 md:w-96 md:h-96 rounded-full" style={{ backgroundColor: colorScheme.primary }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ExtraBoldText 
              fontSize="2rem"
              mdFontSize="3rem"
              lgFontSize="3.5rem"
              className="mb-4 md:mb-6"
              style={{ color: colorScheme.background }}
            >
              Stay Connected with <span style={{ color: colorScheme.accent }}>ClaudyGod</span>
            </ExtraBoldText>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 mb-6 md:mb-8 mx-auto"
            style={{ backgroundColor: colorScheme.primary }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <RegularText 
              fontSize="0.9rem"
              mdFontSize="1.1rem"
              lgFontSize="1.25rem"
              className="max-w-3xl mx-auto mb-8 md:mb-10 px-2"
              style={{ color: colorScheme.background }}
            >
              Never miss a beat! Follow ClaudyGod across all platforms for exclusive content, 
              behind-the-scenes moments, tour updates, and new music releases.
            </RegularText>
          </motion.div>
        </div>

        {/* Social Media Grid - Responsive layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 px-2">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => window.open(platform.url, '_blank')}
            >
              <div 
                className="rounded-xl md:rounded-2xl p-4 md:p-6 h-full transition-all duration-300"
                style={{
                  backgroundColor: colorScheme.surface,
                  border: `1px solid ${colorScheme.primary}20`,
                  boxShadow: `0 4px 12px ${colorScheme.primary}10`
                }}
              >
                <div className="text-center">
                  <div 
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${platform.color}15` }}
                  >
                    <FontAwesomeIcon 
                      icon={platform.icon} 
                      className="text-lg md:text-2xl"
                      style={{ color: platform.color }}
                    />
                  </div>
                  
                  <ExtraBoldText 
                    fontSize="0.9rem"
                    mdFontSize="1.1rem"
                    className="mb-1 md:mb-2"
                    style={{ color: colorScheme.text }}
                  >
                    {platform.name}
                  </ExtraBoldText>
                  
                  <RegularText 
                    className="mb-2 text-xs md:text-sm"
                    style={{ color: platform.color }}
                  >
                    {platform.handle}
                  </RegularText>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div 
            className="rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 mx-auto max-w-4xl"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15 0%, ${colorScheme.accent}15 100%)`,
              border: `1px solid ${colorScheme.primary}30`
            }}
          >
            <ExtraBoldText 
              fontSize="1.25rem"
              mdFontSize="1.5rem"
              lgFontSize="2rem"
              className="mb-3 md:mb-4"
              style={{ color: colorScheme.text }}
            >
              Join the ClaudyGod Family
            </ExtraBoldText>
            
            <RegularText 
              className="mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base"
              style={{ color: colorScheme.accent}}
            >
              Be the first to know about new music, exclusive events, and special announcements. 
              Your support means everything!
            </RegularText>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <CustomButton
                href="https://instagram.com/claudygod"
                target="_blank"
                variant="primary"
                size="md"
                className="min-w-[160px] md:min-w-[200px] text-sm md:text-base"
              >
                Follow on Instagram
              </CustomButton>
              
              <CustomButton
                href="https://youtube.com/claudygod"
                target="_blank"
                variant="secondary"
                size="md"
                className="min-w-[160px] md:min-w-[200px] text-sm md:text-base"
              >
                Subscribe on YouTube
              </CustomButton>
            </div>
          </div>
        </motion.div>

        {/* Real-time stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16"
        >
          {[
    
            { number: '24/7', label: 'Active Community' },
            { number: '1M+', label: 'Monthly Reach' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="text-center p-3 md:p-4 rounded-lg"
              style={{ backgroundColor: `${colorScheme.primary}10` }}
            >
              <ExtraBoldText 
                fontSize="1.5rem"
                mdFontSize="2rem"
                style={{ color: colorScheme.accent }}
                className="mb-1 md:mb-2"
              >
                {stat.number}
              </ExtraBoldText>
              <RegularText 
                className="text-xs md:text-sm"
                style={{ color: colorScheme.text }}
              >
                {stat.label}
              </RegularText>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating social icons - Hidden on mobile, shown on desktop */}
      <div className="fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-3 md:gap-4">
          {socialPlatforms.slice(0, 4).map((platform) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, x: -5 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: platform.color }}
              aria-label={`Follow on ${platform.name}`}
            >
              <FontAwesomeIcon 
                icon={platform.icon} 
                className="text-white text-sm md:text-lg"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};