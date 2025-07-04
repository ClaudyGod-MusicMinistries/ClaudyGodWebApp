// src/components/Bio/Biography.tsx
import { SEO } from '../components/util/SEO';
import React from 'react';
import { motion } from 'framer-motion';
import { Herosection } from '../components/util/Herosection';
import { About1, About2 } from '../assets';
import { NewsletterForm } from '../components/util/Newsletter';
import { BioSection } from '../components/Bio/BioSectio';
import { firstSectionTexts, secondSectionTexts } from '../components/data/Biography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt, faHandsPraying, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { DonationCallToAction } from '../components/util/DonationSupport';

export const Biography: React.FC = () => {
  return (
    <>
      <SEO
        title="ClaudyGod Biography - American Gospel Artist & Ministry Leader"
        description="Discover ClaudyGod's journey from Nigeria to becoming a California-based gospel artist. Learn about her music ministry, albums, and family life."
        keywords="claudygod biography, gospel artist bio, christian musician, worship leader, american gospel artist"
        canonical="https://claudygod.org/biography"
        image="https://claudygod.org/images/bio-og.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "ClaudyGod",
          "url": "https://claudygod.org/biography",
          "image": "https://claudygod.org/images/claudygod-profile.jpg",
          "sameAs": [
            "https://www.instagram.com/singerclaudygod/?hl=en",
            "https://www.youtube.com/@ClaudyGODMinistries",
            "https://www.facebook.com/ClaudyGod/",
            "https://twitter.com/claudygod",
            "https://www.linkedin.com/in/claudygod-music-and-ministries-b2887094",
            "https://www.tiktok.com/@claudygod",
            "https://music.apple.com/ng/artist/claudygod/1440081695",
            "https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ",
            "https://music.youtube.com/channel/UCBZR8mELmaD5EpyuKMFUlaw",
            "https://www.deezer.com/artist/53266602"
          ],
          "description": "American Gospel artist and worship leader",
          "birthPlace": "Nigeria",
          "birthDate": "1975-01-01",
          "alumniOf": "Victory Bible Institute",
          "award": ["Gospel Music Awards"],
          "genre": ["Gospel", "Contemporary Christian", "Afro-gospel"]
        }}
      />
      
      <div className="bg-white">
        {/* Enhanced Hero Section */}
        <Herosection
          title="ClaudyGod Music & Ministries"
          backgroundImage={About1}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 z-10" />
          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-roboto-condensed mb-4"
            >
              ClaudyGod
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-red-500 mb-6"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white font-work-sans max-w-3xl"
            >
              American Contemporary Christian Music & Afro-Gospel Artist
            </motion.p>
          </motion.div>
        </Herosection>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          {/* Section Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-purple-100 px-5 py-2 rounded-full mb-6"
            >
              <FontAwesomeIcon icon={faMicrophoneAlt} className="text-purple-700" />
              <span className="text-sm font-medium text-purple-800 tracking-wider">
                ARTIST BIOGRAPHY
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 font-roboto-condensed mb-4 leading-tight"
            >
              The Journey of Faith & Music
            </motion.h1>
            
            {/* ADDED HEADER SECTION */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-3xl text-purple-800 font-work-sans mb-8 leading-relaxed max-w-4xl"
            >
              ClaudyGod: American Contemporary Christian music and Afro-Gospel Artist
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
            />
          </div>

          {/* Biography Sections */}
          <div className="space-y-20">
            <BioSection
              imageSrc={About2}
              altText="ClaudyGod portrait"
              texts={firstSectionTexts}
            />
            
            {/* Enhanced Responsive Quote Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative my-16 py-8 md:py-12 px-4 xs:px-6 sm:px-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-50 to-gray-50 border border-purple-100"
            >
              <div className="absolute top-4 right-4 text-purple-200 text-3xl md:text-5xl lg:text-6xl">
                <FontAwesomeIcon icon={faQuoteRight} />
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="flex items-start">
                  <FontAwesomeIcon 
                    icon={faHandsPraying} 
                    className="text-purple-500 mt-1 mr-3 text-lg md:text-xl" 
                  />
                  <blockquote className="text-lg md:text-xl lg:text-2xl text-purple-800 font-work-sans leading-relaxed italic">
                    "I heard God say to me, 'I love your worship.' That moment defined my calling and ministry."
                  </blockquote>
                </div>
                <p className="text-right mt-4 text-purple-900 font-medium text-base md:text-lg">
                  - ClaudyGod
                </p>
              </div>
            </motion.div>
            
            <BioSection
              imageSrc={About2}
              altText="ClaudyGod performing"
              texts={secondSectionTexts}
              reverse
              hideOnSmall
            />
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-gray-500">
              <FontAwesomeIcon icon={faMicrophoneAlt} className="text-purple-600" />
            </span>
          </div>
        </div>
      <DonationCallToAction
  title="Partner with Our Ministry"
  subtitle="Your Support Makes a Difference"
  description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
  goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
  donateUrl="/donate"
/>
        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-purple-50 to-gray-50 py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </>
  );
};