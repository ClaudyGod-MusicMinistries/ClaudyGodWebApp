import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { 
  SemiBoldText,
  BoldText,
  LightText
} from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ContactInfo: React.FC = () => {
  const { colorScheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SemiBoldText 
        style={{ color: colorScheme.accent }}
        fontSize="22px"
        className="mb-6"
      >
        Management & General Inquiries
      </SemiBoldText>
      
      <div className="space-y-4">
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-start"
        >
          <FontAwesomeIcon 
            icon={faMapPin} 
            style={{ color: colorScheme.accent }}
            className="mt-1 mr-3 text-lg" 
          />
          <div>
            <BoldText style={{ color: colorScheme.primary }}>
              ClaudyGod Music & Ministries
            </BoldText>
            <LightText style={{ color: colorScheme.primary }}>
              San Ramon, California
            </LightText>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-center"
        >
          <FontAwesomeIcon 
            icon={faPhone} 
            style={{ color: colorScheme.accent }}
            className="mr-3 text-lg" 
          />
          <a 
            href="tel:+13852196632" 
            style={{ color: colorScheme.primary }}
           
          >
            <LightText style={{ color: colorScheme.primary }}>+1 (385) 219-6632</LightText>
          </a>
        </motion.div>

        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-center"
        >
          <FontAwesomeIcon 
            icon={faEnvelope} 
            style={{ color: colorScheme.accent }}
            className="mr-3 text-lg" 
          />
          <a
            href="mailto:info@ClaudyGod.com"
            style={{ color: colorScheme.primary }}
            className="hover:text-purple-800 transition-colors"
          >
            <LightText style={{ color: colorScheme.primary }}>info@ClaudyGod.com</LightText>
          </a>
        </motion.div>
      </div>

      <div className="mt-8">
        <SemiBoldText 
          style={{ color: colorScheme.accent }}
          fontSize="18px"
          className="mb-3"
        >
          Connect With Us
        </SemiBoldText>
        
        <div className="flex space-x-4">
          <motion.a
            whileHover={{ y: -3 }}
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              backgroundColor: colorScheme.gray[100],
              borderRadius: '50%'
            }}
            className="w-10 h-10 flex items-center justify-center transition-colors duration-300 hover:bg-purple-100"
            aria-label="Follow us on Facebook"
          >
            <FontAwesomeIcon 
              icon={faFacebookF} 
              style={{ color: colorScheme.accent }} 
            />
          </motion.a>

          <motion.a
            whileHover={{ y: -3 }}
            href="https://x.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              backgroundColor: colorScheme.gray[100],
              borderRadius: '50%'
            }}
            className="w-10 h-10 flex items-center justify-center transition-colors duration-300 hover:bg-purple-100"
            aria-label="Follow us on X"
          >
            <FontAwesomeIcon 
              icon={faXTwitter} 
              style={{ color: colorScheme.accent }} 
            />
          </motion.a>

          <motion.a
            whileHover={{ y: -3 }}
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              backgroundColor: colorScheme.gray[100],
              borderRadius: '50%'
            }}
            className="w-10 h-10 flex items-center justify-center transition-colors duration-300 hover:bg-purple-100"
            aria-label="Follow us on Instagram"
          >
            <FontAwesomeIcon 
              icon={faInstagram} 
              style={{ color: colorScheme.accent }} 
            />
          </motion.a>

          <motion.a
            whileHover={{ y: -3 }}
            href="https://www.youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              backgroundColor: colorScheme.gray[100],
              borderRadius: '50%'
            }}
            className="w-10 h-10 flex items-center justify-center transition-colors duration-300 hover:bg-purple-100"
            aria-label="Follow us on YouTube"
          >
            <FontAwesomeIcon 
              icon={faYoutube} 
              style={{ color: colorScheme.accent }} 
            />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;