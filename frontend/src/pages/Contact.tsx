import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Herosection } from '../components/util/Herosection';
import { Log } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import SuccessModal from '../components/contact/SuccessModal';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { motion } from 'framer-motion';
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { SemiBoldText, BoldText, LightText, ExtraBoldText } from '../components/ui/fonts/typography';


export const ContactData: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorScheme } = useTheme();

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/health`);
        const data = await res.json();
        console.log("Backend status:", data.status);
        console.log("Environment:", data.environment);
      } catch (error) {
        console.error("Backend connection failed:", error);
      }
    };
    checkBackendHealth();
  }, []);

  return (
    <div 
      className="relative overflow-hidden"
      style={{ background: `linear-gradient(to bottom, white, ${colorScheme.gray[50]})` }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl"
          // style={{ backgroundColor: colorScheme.accent }}
        ></div>
        <div 
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
          // style={{ backgroundColor: colorScheme.secondary }}
        ></div>
      </div>
      
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="relative">
        <div className="absolute inset-0 z-10" />
        <Herosection
          title="ClaudyGod Music & Ministries / Contact"
          backgroundImage={Log}
          className="relative z-0"
          style={{ borderRadius: colorScheme.borderRadius.large }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ExtraBoldText
            style={{ color: colorScheme.primary }}
         fontSize='2.5rem'          >
            We Are Here For You
          </ExtraBoldText>
          <LightText
            style={{ color: colorScheme.background}}
        fontSize='15px'
          >
            Please leave a prayer request, testimony or a comment...
          </LightText>
        </motion.div>

        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SemiBoldText 
            style={{ color: colorScheme.accent }}
            fontSize='1.5rem'
          >
            Get In Touch With Us
          </SemiBoldText>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 
        gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            style={{ 
              borderRadius: colorScheme.borderRadius.large,
              // backgroundColor: colorScheme.background
            }}
          >
            <ContactForm onSuccess={() => setIsModalOpen(true)} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl shadow-xl p-6 md:p-8"
            style={{
              borderRadius: colorScheme.borderRadius.large,
              background: `linear-gradient(to bottom right, ${colorScheme.primary}, ${colorScheme.secondary})`
            }}
          >
            <ContactInfo />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <DonationCallToAction
            title="Partner with Our Ministry"
            subtitle="Your Support Makes a Difference"
            description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
            goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
            donateUrl="/donate"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto"
          style={{
            borderRadius: colorScheme.borderRadius.large,
            background: `linear-gradient(to right, ${colorScheme.gray[100]}, ${colorScheme.gray[200]})`
          }}
        >
          <NewsletterForm />
        </motion.div>
      </div>

      <div 
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})`
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: colorScheme.accent }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: colorScheme.secondary }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BoldText className="text-3xl md:text-4xl mb-6">
                ClaudyGod Music & Ministries
              </BoldText>
            </motion.div>
            
            <motion.div 
              className="w-24 h-1 rounded-full mx-auto my-6"
              style={{
                background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.highlight})`
              }}
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <LightText className="text-lg mb-8 max-w-2xl mx-auto">
                Connect With Us On Various Social Platforms
              </LightText>
            </motion.div>
            
            <motion.div 
              className="flex justify-center space-x-4 sm:space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              {[
                { icon: faFacebookF, url: "https://www.facebook.com/yourpage", label: "Facebook" },
                { icon: faXTwitter, url: "https://x.com/yourhandle", label: "X (Twitter)" },
                { icon: faInstagram, url: "https://www.instagram.com/yourprofile", label: "Instagram" },
                { icon: faYoutube, url: "https://www.youtube.com/yourchannel", label: "YouTube" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border"
                  style={{
                    backgroundColor: `${colorScheme.white}10`,
                    backdropFilter: 'blur(10px)',
                    borderColor: `${colorScheme.white}20`
                  }}
                  aria-label={`Follow us on ${social.label}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <FontAwesomeIcon 
                    icon={social.icon} 
                    className="text-xl"
                    style={{ color: colorScheme.white }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};