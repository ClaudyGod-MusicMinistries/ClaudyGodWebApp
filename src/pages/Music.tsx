import React, { useState } from 'react';
import { SEO } from '../components/util/SEO';
import { motion } from 'framer-motion';
import { AudioMackComponent } from '../components/Homepage/AmazonMusic';
import { Cover, Back3 } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownloadSection } from '../components/util/Download';
import {
  faInfoCircle,
  faArrowDown,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
import { securedMusicPlatforms } from '../components/data/musicData';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { SecurityModal } from '../components/util/modals/SecurityModal';
import { useTheme } from '../contexts/ThemeContext';
import { LayoutTemplate } from '../components/util/hero';

import {
  SemiBoldText,
  LightText,
  BoldText,
  ShadowsText,
  AbrilFatFaceText,
  UltraText,
  BricolageText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';

const albums = [
  {
    id: 1,
    title: 'You Are Our Everything',
    year: '2025',
    image: Cover,
    tracks: [
      { id: 1, title: 'Amazing Grace', duration: '3:45' },
      { id: 2, title: 'Heavenly Joy', duration: '4:20' },
      { id: 3, title: 'Soul Revival', duration: '5:15' },
      { id: 4, title: 'Worship Medley', duration: '3:30' },
    ],
  },
];

const SecurityUtils = {
  sanitizeUrl: (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const safeParams = [
        'si',
        'referral',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'tag',
      ];
      safeParams.forEach(param => parsedUrl.searchParams.delete(param));
      return parsedUrl.toString();
    } catch {
      return '#';
    }
  },
  isTrustedDomain: (url: string, trustedDomains: string[]) => {
    try {
      const parsedUrl = new URL(url);
      return trustedDomains.some(domain => parsedUrl.hostname.endsWith(domain));
    } catch {
      return false;
    }
  },
};

const TRUSTED_DOMAINS = [
  'spotify.com',
  'apple.com',
  'youtube.com',
  'deezer.com',
  'amazon.com',
];

export const MusicData = () => {
  const { colorScheme } = useTheme();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    setRedirectUrl(SecurityUtils.sanitizeUrl(url));
    setIsModalOpen(true);
  };

  const handleRedirect = () => {
    if (redirectUrl) window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  const SecuredLink = ({
    platform,
  }: {
    platform: (typeof securedMusicPlatforms)[0];
  }) => {
    const sanitizedUrl = SecurityUtils.sanitizeUrl(platform.url);
    const isTrusted = SecurityUtils.isTrustedDomain(
      sanitizedUrl,
      TRUSTED_DOMAINS
    );

    return (
      <motion.a
        href={sanitizedUrl}
        onClick={e => handleLinkClick(platform.url, e)}
        className={`flex items-center px-6 py-4 rounded-xl shadow-md transition-all ${platform.bgColor} ${platform.textColor} ${
          isTrusted ? 'ring-2 ring-white/30' : 'opacity-80'
        }`}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        <FontAwesomeIcon icon={platform.icon} className="mr-3 text-xl" />
        <BoldText style={{ color: colorScheme.buttonText }}>
          {platform.name}
          {!isTrusted && (
            <LightText className="text-xs ml-1">(unverified)</LightText>
          )}
        </BoldText>
      </motion.a>
    );
  };

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: `${colorScheme.gray}200` }}
    >
      <SEO
        title="ClaudyGod Music - Stream Gospel Albums & Singles"
        description="Stream ClaudyGod's gospel music on all platforms. Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel."
        keywords="claudygod music, gospel albums, worship songs, christian music, streaming platforms"
        canonical="https://claudygod.org/music"
        image="https://claudygod.org/images/music-og.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'MusicAlbum',
          name: 'You Are Our Everything',
          byArtist: {
            '@type': 'MusicGroup',
            name: 'ClaudyGod',
          },
          datePublished: '2025',
          albumReleaseType: 'AlbumRelease',
          numTracks: 4,
        }}
      />

      {/* Security Modal */}
      <SecurityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinue={handleRedirect}
        redirectUrl={redirectUrl || ''}
      />

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={Back3}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[100vh] md:h-[100vh]"
        title={''}
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
            <AbrilFatFaceText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 8px rgba(0,0,0,0.6)',
                letterSpacing: '0.02em',
              }}
              useThemeColor={false}
            >
              Music
            </AbrilFatFaceText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-5 mx-auto"
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
                letterSpacing: '0.01em',
              }}
              useThemeColor={false}
            >
              Experience the divine fusion of American Contemporary Christian
              and Afro-Gospel
            </SemiBoldText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Music Content */}
      <article className="w-full">
        {/* Section Header */}
        <section className="w-full py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-12 md:mb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-opacity-10 mb-8"
                style={{ backgroundColor: `${colorScheme.primary}20` }}
              >
                <FontAwesomeIcon
                  icon={faMusic}
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
                  MUSIC COLLECTION
                </LightText>
              </motion.div>

              {/* Main Title with Professional Font Combination */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex flex-col items-center">
                  <AbrilFatFaceText
                    style={{
                      color: colorScheme.primary,
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      lineHeight: '1.1',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.02em',
                    }}
                    useThemeColor={false}
                  >
                    Worship Through
                  </AbrilFatFaceText>
                  <ShadowsText
                    style={{
                      color: colorScheme.accent,
                      fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                      lineHeight: '1',
                      letterSpacing: '0.03em',
                    }}
                    useThemeColor={false}
                  >
                    Music
                  </ShadowsText>
                </div>
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
                    letterSpacing: '0.01em',
                  }}
                  useThemeColor={false}
                >
                  Stream ClaudyGod's gospel music everywhere, anytime, anyday,
                  anywhere across all major platforms
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
          </div>
        </section>

        {/* Streaming Platforms */}
        <section className="w-full pt-2 md:pt-4 pb-6 md:pb-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex flex-col items-center">
                <UltraText
                  style={{
                    color: colorScheme.primary,
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    lineHeight: '1.1',
                    marginBottom: '0.25rem',
                    letterSpacing: '0.02em',
                  }}
                  useThemeColor={false}
                >
                  Available On
                </UltraText>
                <BricolageText
                  style={{
                    color: colorScheme.accent,
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    lineHeight: '1',
                    letterSpacing: '0.01em',
                  }}
                  useThemeColor={false}
                >
                  All Platforms
                </BricolageText>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full"
            >
              {securedMusicPlatforms.map(platform => (
                <SecuredLink key={platform.name} platform={platform} />
              ))}
            </motion.div>

            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex justify-center"
            >
              <div
                className="inline-flex items-center px-5 py-3 rounded-full border"
                style={{
                  backgroundColor: colorScheme.gray[100],
                  borderColor: colorScheme.gray[200],
                }}
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="mr-3 text-lg"
                  style={{ color: colorScheme.primary }}
                />
                <LightText style={{ color: colorScheme.primary }}>
                  We verify all external links for your security
                </LightText>
              </div>
            </motion.footer>
          </div>
        </section>

        {/* Latest Release - PROFESSIONAL FULL WIDTH */}
        <section
          className="w-full py-12 md:py-16"
          style={{ backgroundColor: colorScheme.background }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <div className="flex flex-col items-center">
                <AbrilFatFaceText
                  style={{
                    color: colorScheme.textSecondary,
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    lineHeight: '1.2',
                    marginBottom: '0.5rem',
                    opacity: 0.9,
                    letterSpacing: '0.02em',
                  }}
                  useThemeColor={false}
                >
                  Latest Release
                </AbrilFatFaceText>
                <ShadowsText
                  style={{
                    color: colorScheme.primary,
                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                    lineHeight: '1',
                    letterSpacing: '0.02em',
                  }}
                  useThemeColor={false}
                >
                  You Are Our Everything
                </ShadowsText>
              </div>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: '6rem' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 mx-auto mt-6 rounded-full"
                style={{ backgroundColor: colorScheme.accent }}
              />
            </motion.header>

            <div className="w-full">
              {albums.map(album => (
                <motion.article
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full"
                  style={{ backgroundColor: colorScheme.surface }}
                >
                  {/* Album Cover */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden rounded-xl shadow-xl w-full"
                  >
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-auto object-cover transition-transform duration-500"
                    />
                  </motion.div>

                  {/* Album Info */}
                  <div className="md:col-span-2 flex flex-col justify-between space-y-4 md:space-y-6 w-full">
                    <header>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <UltraText
                          className="text-xl sm:text-2xl md:text-3xl mb-2"
                          style={{
                            color: colorScheme.text,
                            letterSpacing: '0.02em',
                            lineHeight: '1.1',
                          }}
                        >
                          {album.title}
                        </UltraText>
                        <LightText
                          className="mb-4 text-sm sm:text-base"
                          style={{
                            color: colorScheme.textSecondary,
                            letterSpacing: '0.05em',
                          }}
                        >
                          Released{' '}
                          <SemiBoldText
                            style={{
                              color: colorScheme.primary,
                            }}
                          >
                            {album.year}
                          </SemiBoldText>
                        </LightText>
                      </motion.div>
                    </header>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-center my-4 md:my-6"
                    >
                      <LightText
                        className="italic mb-4 text-sm sm:text-base md:text-lg"
                        style={{ color: colorScheme.text }}
                      >
                        Now available on all major streaming platforms
                      </LightText>
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          className="text-xl sm:text-2xl"
                          style={{ color: colorScheme.primary }}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Platform Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full"
                    >
                      {securedMusicPlatforms.map(platform => {
                        const sanitizedUrl = SecurityUtils.sanitizeUrl(
                          platform.url
                        );
                        const isTrusted = SecurityUtils.isTrustedDomain(
                          sanitizedUrl,
                          TRUSTED_DOMAINS
                        );

                        return (
                          <motion.button
                            key={platform.name}
                            onClick={e => {
                              e.preventDefault();
                              setRedirectUrl(sanitizedUrl);
                              setIsModalOpen(true);
                            }}
                            className={`flex items-center justify-between w-full gap-3 px-4 py-3 rounded-xl shadow-lg transition-all font-semibold ${platform.bgColor} ${platform.textColor} opacity-90 hover:opacity-100 hover:shadow-xl active:scale-95`}
                            whileHover={{
                              scale: 1.02,
                              y: -2,
                              transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Left side - Platform icon and name */}
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FontAwesomeIcon
                                icon={platform.icon}
                                className="text-base sm:text-lg md:text-xl flex-shrink-0"
                              />
                              <BoldText className="truncate text-left text-sm sm:text-base md:text-lg font-bold">
                                {platform.name}
                              </BoldText>
                            </div>

                            {/* Right side - Play text (optional) */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <BoldText className="text-xs sm:text-sm opacity-90 hidden sm:inline-block">
                                Play
                              </BoldText>
                            </div>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </article>

      {/* AudioMack Component */}
      <AudioMackComponent />

      {/* Download Section */}
      <DownloadSection />

      {/* Donation Section */}
      <section className="w-full my-12 md:my-16">
        <DonationCallToAction
          title="Partner with Our Ministry"
          subtitle="Your Support Makes a Difference"
          description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts."
          goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
          donateUrl="/donate"
        />
      </section>

      {/* Newsletter Section */}
      <section
        className="w-full py-12 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
      >
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
};
