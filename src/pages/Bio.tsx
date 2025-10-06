import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophoneAlt,
  faHandsPraying,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';

import { SEO } from '../components/util/SEO';
import { LayoutTemplate } from '../components/util/hero';
import { About1, About2 } from '../assets';
import { NewsletterForm } from '../components/util/Newsletter';
import { BioSection } from '../components/Bio/BioSectio';
import {
  firstSectionTexts,
  secondSectionTexts,
} from '../components/data/Biography';
import { DonationCallToAction } from '../components/util/DonationSupport';
import {
  SemiBoldText,
  LightText,
  ExtraBoldText,
} from '../components/ui/fonts/typography';

export const Biography: React.FC = () => {
  const { colorScheme } = useTheme();

  return (
    <main
      className="relative overflow-hidden"
      style={{
        backgroundColor: colorScheme.text,
      }}
    >
      <SEO
        title="ClaudyGod Biography - American Gospel Artist & Ministry Leader"
        description="Discover ClaudyGod's journey from Nigeria to becoming a California-based gospel artist. Learn about her music ministry, albums, and family life."
        keywords="claudygod biography, gospel artist bio, christian musician, worship leader, american gospel artist"
        canonical="https://claudygod.org/biography"
        image="https://claudygod.org/images/bio-og.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'ClaudyGod',
          url: 'https://claudygod.org/biography',
          image: 'https://claudygod.org/images/claudygod-profile.jpg',
          sameAs: [
            'https://www.instagram.com/singerclaudygod/?hl=en',
            'https://www.youtube.com/@ClaudyGODMinistries',
            'https://www.facebook.com/ClaudyGod/',
            'https://twitter.com/claudygod',
            'https://www.linkedin.com/in/claudygod-music-and-ministries-b2887094',
            'https://www.tiktok.com/@claudygod',
            'https://music.apple.com/ng/artist/claudygod/1440081695',
            'https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ',
            'https://music.youtube.com/channel/UCBZR8mELmaD5EpyuKMFUlaw',
            'https://www.deezer.com/artist/53266602',
          ],
          description: 'American Gospel artist and worship leader',
          birthPlace: 'Nigeria',
          birthDate: '1975-01-01',
          alumniOf: 'Victory Bible Institute',
          award: ['Gospel Music Awards'],
          genre: ['Gospel', 'Contemporary Christian', 'Afro-gospel'],
        }}
      />

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={About2}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[500px]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                marginBottom: '0.5rem',
              }}
              useThemeColor={false}
            >
              ClaudyGod
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-4 sm:mb-6 md:mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.125rem, 4vw, 1.75rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                lineHeight: '1.4',
              }}
              useThemeColor={false}
            >
              American Contemporary Christian Music & Afro-Gospel Artist
            </SemiBoldText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Biography Content */}
      <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Section Header */}
        <header className="mb-8 sm:mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-opacity-10 mb-4 sm:mb-6"
            style={{ backgroundColor: `${colorScheme.primary}20` }}
          >
            <FontAwesomeIcon
              icon={faMicrophoneAlt}
              style={{ color: colorScheme.primary }}
              className="text-sm sm:text-base"
            />
            <LightText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
                letterSpacing: '0.05em',
              }}
              useThemeColor={false}
            >
              ARTIST BIOGRAPHY
            </LightText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ExtraBoldText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(1.75rem, 6vw, 3rem)',
                lineHeight: '1.1',
                marginBottom: '0.75rem',
              }}
              useThemeColor={false}
            >
              The Journey of Faith & Music
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: colorScheme.accent,
                fontSize: 'clamp(1rem, 3vw, 1.375rem)',
                lineHeight: '1.5',
              }}
              useThemeColor={false}
            >
              ClaudyGod: American Contemporary Christian music and Afro-Gospel
              Artist
            </SemiBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 sm:w-20 md:w-24 h-1 mx-auto mt-4 sm:mt-6 rounded-full"
            style={{ backgroundColor: colorScheme.accent }}
          />
        </header>

        {/* Biography Sections */}
        <section className="space-y-12 sm:space-y-16 md:space-y-20">
          {/* First Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <BioSection
              imageSrc={About2}
              altText="ClaudyGod portrait"
              texts={firstSectionTexts}
            />
          </motion.div>

          {/* Quote Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 sm:mb-16 md:mb-20"
          >
            <blockquote
              className="relative p-6 sm:p-8 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${colorScheme.gray[900]}, ${colorScheme.gray[800]})`,
                border: `1px solid ${colorScheme.gray[700]}`,
              }}
            >
              <div
                className="absolute top-4 right-4 text-2xl sm:text-3xl opacity-90"
                style={{ color: colorScheme.accent }}
              >
                <FontAwesomeIcon icon={faQuoteRight} />
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex items-start">
                  <FontAwesomeIcon
                    icon={faHandsPraying}
                    className="mt-1 mr-3 sm:mr-4 text-base sm:text-lg"
                    style={{ color: colorScheme.accent }}
                  />
                  <LightText
                    style={{
                      color: 'white',
                      fontSize: 'clamp(1.025rem, 2vw, 1.375rem)',
                      lineHeight: '1.6',
                      fontStyle: 'italic',
                    }}
                    useThemeColor={false}
                  >
                    I heard God say to me, 'I love your worship.' That moment
                    defined my calling and ministry.
                  </LightText>
                </div>
                <SemiBoldText
                  style={{
                    textAlign: 'right',
                    marginTop: '1rem',
                    color: colorScheme.primary,
                    fontSize: '1rem',
                  }}
                  useThemeColor={false}
                >
                  - ClaudyGod
                </SemiBoldText>
              </div>
            </blockquote>
          </motion.section>

          {/* Second Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <BioSection
              imageSrc={About2}
              altText="ClaudyGod performing"
              texts={secondSectionTexts}
              reverse
              hideOnSmall
            />
          </motion.div>
        </section>
      </article>

      {/* Donation Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-12 sm:mb-16 md:mb-20"
      >
        <DonationCallToAction
          title="Partner with Our Ministry"
          subtitle="Your Support Makes a Difference"
          description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
          goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
          donateUrl="/donate"
        />
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{
          borderRadius: colorScheme.borderRadius.xlarge,
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
        className="p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-sm max-w-4xl mx-auto"
      >
        <NewsletterForm />
      </motion.section>
    </main>
  );
};
