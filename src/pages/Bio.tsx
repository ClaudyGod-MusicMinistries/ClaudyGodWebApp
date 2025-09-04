// src/components/Bio/Biography.tsx
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
        {/* Enhanced Hero Section */}
        <header>
          <Herosection
            title="ClaudyGod Music & Ministries"
            backgroundImage={About1}
            className="relative"
          >
            <div className="absolute inset-0 z-10" />
            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <ExtraBoldText
                  style={{
                    color: colorScheme.text,
                    fontSize: '3rem',
                    lineHeight: '1.2',
                  }}
                  useThemeColor={false}
                >
                  ClaudyGod
                </ExtraBoldText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{
                  width: '6rem',
                  height: '0.25rem',
                  background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.primary})`,
                  marginBottom: '1.5rem',
                }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <SemiBoldText
                  style={{
                    color: colorScheme.text,
                    fontSize: '1.5rem',
                    maxWidth: '48rem',
                  }}
                  useThemeColor={false}
                >
                  American Contemporary Christian Music & Afro-Gospel Artist
                </SemiBoldText>
              </motion.div>
            </motion.div>
          </Herosection>
        </header>

        {/* Main Content */}
        <article
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '3rem 1rem',
          }}
        >
          {/* Section Header */}
          <header style={{ marginBottom: '4rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
              }}
            >
              <FontAwesomeIcon
                icon={faMicrophoneAlt}
                style={{
                  color: colorScheme.primary,
                }}
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
                  fontSize: '3rem',
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
            >
              <SemiBoldText
                style={{
                  color: colorScheme.accent,
                  fontSize: '1.5rem',
                  lineHeight: '1.6',
                  maxWidth: '64rem',
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
              style={{
                width: '6rem',
                height: '0.25rem',
                borderRadius: '9999px',
              }}
            />
          </header>

          {/* Biography Sections */}
          <section style={{ display: 'grid', gap: '5rem' }}>
            <BioSection
              imageSrc={About2}
              altText="ClaudyGod portrait"
              texts={firstSectionTexts}
            />

            {/* Enhanced Responsive Quote Section */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'relative',
                margin: '4rem 0',
                padding: '2rem',
                borderRadius: colorScheme.borderRadius.large,
                background: `linear-gradient(to bottom right, 
                ${colorScheme.primary}, 
                ${colorScheme.gray[100]})`,
                border: `1px solid ${colorScheme.gray[200]}`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  color: colorScheme.gray[300],
                  fontSize: '3rem',
                }}
              >
                <FontAwesomeIcon icon={faQuoteRight} />
              </div>
              <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <FontAwesomeIcon
                    icon={faHandsPraying}
                    style={{
                      color: colorScheme.accent,
                      marginTop: '0.25rem',
                      marginRight: '0.75rem',
                      fontSize: '1.25rem',
                    }}
                  />
                  <LightText
                    style={{
                      color: colorScheme.text,
                      fontSize: '1.25rem',
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

        {/* Divider */}
        <div
          style={{
            position: 'relative',
            margin: '2.5rem 0',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '0',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                borderTop: `1px solid ${colorScheme.gray[200]}`,
              }}
            ></div>
          </div>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                padding: '0 1rem',
              }}
            >
              <FontAwesomeIcon
                icon={faMicrophoneAlt}
                style={{ color: colorScheme.primary }}
              />
            </span>
          </div>
        </div>

        <section>
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
          style={{
            background: `linear-gradient(to bottom right, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
            padding: '4rem 0',
          }}
        >
          <div
            style={{
              maxWidth: '48rem',
              margin: '0 auto',
              padding: '0 1rem',
            }}
          >
            <NewsletterForm />
          </div>
        </section>
      </main>
    </>
  );
};
