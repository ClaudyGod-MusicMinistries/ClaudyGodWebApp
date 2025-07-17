import React, { useState, useEffect } from 'react';
import { Herosection } from '../components/util/Herosection';
import { Log } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import SuccessModal from '../components/contact/SuccessModal';
import {NewsletterForm} from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { motion } from 'framer-motion';
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import 'react-toastify/dist/ReactToastify.css';

export const ContactData: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-400 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-300 blur-3xl"></div>
      </div>
      
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="relative">
        <div className="absolute inset-0 z-10" />
        <Herosection
          title="ClaudyGod Music & Ministries / Contact"
          backgroundImage={Log}
          className="relative rounded-2xl z-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl roboto-condensed text-purple-900 mb-6 inline-block px-4 md:px-16 py-2 md:py-4 border-b-4 border-purple-900 font-bold">
            We Are Here For You
          </h2>
          <p className="text-gray-700 robotoMedium mt-6 max-w-2xl mx-auto text-base md:text-lg">
            Please leave a prayer request, testimony or a comment...
          </p>
        </motion.div>

        <motion.h3 
          className="text-gray-900 mb-10 roboto-condensed text-2xl md:text-3xl lg:text-4xl text-center font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        > Get In Touch With Us </motion.h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <ContactForm onSuccess={() => setIsModalOpen(true)} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white rounded-2xl shadow-xl p-6 md:p-8"
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
          className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto"
        >
         
          <NewsletterForm />
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-500 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-600 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 roboto-condensed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ClaudyGod Music & Ministries
            </motion.h2>
            
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto my-6 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            
            <motion.p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Connect With Us On Various Social Platforms
            </motion.p>
            
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
                  className="bg-white/10 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 border border-white/20"
                  aria-label={`Follow us on ${social.label}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-white text-xl" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};