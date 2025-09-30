// Biography.tsx
import { SEO } from '../components/util/SEO';
import React from 'react';
import { motion } from 'framer-motion';
import { Herosection } from '../components/util/Herosection';
import { About1, About2 } from '../assets';
import { NewsletterForm } from '../components/util/Newsletter';
import { BioSection } from '../components/Bio/BioSectio';
import {
  firstSectionTexts,
  secondSectionTexts,
} from '../components/data/Biography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophoneAlt,
  faHandsPraying,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';
import { DonationCallToAction } from '../components/util/DonationSupport';
import {
  SemiBoldText,
  LightText,
  ExtraBoldText,
} from '../components/ui/fonts/typography';
import { useTheme } from '../contexts/ThemeContext';

export const Biography: React.FC = () => {
  const { colorScheme } = useTheme();

  return (
    <>
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

      <main>
        {/* Hero Section */}
        <Herosection
          title=""
          subtitle=""
          backgroundImage={About1}
          overlayColor="rgba(0,0,0,0.3)"
          backgroundPosition="center 30%"
          className="min-h-[90vh] md:min-h-[95vh]"
          style={{
            backgroundAttachment: 'fixed',
          }}
        >
          <motion.div
            className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6"
            >
              <ExtraBoldText
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight: '1.1',
                  textShadow: '0 4px 8px rgba(0,0,0,0.6)',
                  marginBottom: '1rem',
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
              className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-8 mx-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-3xl"
            >
              <SemiBoldText
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  lineHeight: '1.4',
                }}
                useThemeColor={false}
              >
                American Contemporary Christian Music & Afro-Gospel Artist
              </SemiBoldText>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="animate-bounce w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
              </div>
            </motion.div>
          </motion.div>
        </Herosection>

        {/* Biography Content */}
        <article className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Section Header */}
          <header className="mb-12 md:mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-opacity-10 mb-6"
              style={{ backgroundColor: `${colorScheme.primary}20` }}
            >
              <FontAwesomeIcon
                icon={faMicrophoneAlt}
                style={{ color: colorScheme.primary }}
              />
              <LightText
                style={{
                  color: colorScheme.primary,
                  fontSize: '0.875rem',
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
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ExtraBoldText
                style={{
                  color: colorScheme.primary,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: '1.2',
                  marginBottom: '1rem',
                }}
                useThemeColor={false}
              >
                The Journey of Faith & Music
              </ExtraBoldText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <SemiBoldText
                style={{
                  color: colorScheme.accent,
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  lineHeight: '1.6',
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
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-24 h-1 mx-auto mt-6 rounded-full"
              style={{ backgroundColor: colorScheme.accent }}
            />
          </header>

          {/* Biography Sections */}
          <section className="space-y-12 md:space-y-20">
            <BioSection
              imageSrc={About2}
              altText="ClaudyGod portrait"
              texts={firstSectionTexts}
            />

            {/* Quote Section */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative my-12 md:my-16 p-6 md:p-8 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.gray[100]})`,
                border: `1px solid ${colorScheme.gray[200]}`,
              }}
            >
              <div
                className="absolute top-4 right-4 text-3xl md:text-4xl opacity-20"
                style={{ color: colorScheme.primary }}
              >
                <FontAwesomeIcon icon={faQuoteRight} />
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start">
                  <FontAwesomeIcon
                    icon={faHandsPraying}
                    className="mt-1 mr-4 text-lg"
                    style={{ color: colorScheme.accent }}
                  />
                  <LightText
                    style={{
                      color: colorScheme.text,
                      fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                      lineHeight: '1.6',
                      fontStyle: 'italic',
                    }}
                    useThemeColor={false}
                  >
                    "I heard God say to me, 'I love your worship.' That moment
                    defined my calling and ministry."
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
            </motion.blockquote>

            <BioSection
              imageSrc={About2}
              altText="ClaudyGod performing"
              texts={secondSectionTexts}
              reverse
              hideOnSmall
            />
          </section>
        </article>

        {/* Donation Section */}
        <section className="my-12 md:my-16">
          <DonationCallToAction
            title="Partner with Our Ministry"
            subtitle="Your Support Makes a Difference"
            description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
            goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
            donateUrl="/donate"
          />
        </section>

        {/* Newsletter Section */}
        <section
          className="py-12 md:py-16"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
          }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <NewsletterForm />
          </div>
        </section>
      </main>
    </>
  );
};
