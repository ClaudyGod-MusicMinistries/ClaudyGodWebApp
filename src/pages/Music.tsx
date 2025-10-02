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
  faExternalLinkAlt,
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
  ExtraBoldText,
  BoldText,
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
      className="min-h-screen"
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
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 8px rgba(0,0,0,0.6)',
                // marginBottom: '1rem',
              }}
              useThemeColor={false}
            >
              Music
            </ExtraBoldText>
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
      <article
        className="max-w-7xl mx-auto 
      px-4 sm:px-6 lg:px-8 py-12 md:py-16"
      >
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
              Worship Through Music
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

        {/* Streaming Platforms */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <ExtraBoldText
              style={{ color: colorScheme.primary }}
              fontSize="1.75rem"
            >
              Available On All Platforms
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
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
        </section>

        {/* Latest Release */}
        <section
          className="mb-20"
          style={{ backgroundColor: colorScheme.background }}
        >
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <ExtraBoldText
              style={{ color: colorScheme.primary }}
              fontSize="2rem"
            >
              Latest Release: You Are Our Everything
            </ExtraBoldText>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-1 mx-auto mt-4 rounded-full"
              style={{ backgroundColor: colorScheme.accent }}
            />
          </motion.header>

          <div className="max-w-6xl mx-auto">
            {albums.map(album => (
              <motion.article
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-3 gap-10 items-start rounded-2xl shadow-lg p-6 md:p-8"
                style={{ backgroundColor: colorScheme.surface }}
              >
                {/* Album Cover */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-xl shadow-xl"
                >
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-auto object-cover transition-transform duration-500"
                  />
                </motion.div>

                {/* Album Info */}
                <div className="md:col-span-2 flex flex-col justify-between space-y-6">
                  <header>
                    <ExtraBoldText
                      className="text-3xl mb-2"
                      style={{ color: colorScheme.text }}
                    >
                      {album.title}
                    </ExtraBoldText>
                    <LightText
                      className="mb-4"
                      style={{ color: colorScheme.textSecondary }}
                    >
                      Released{' '}
                      <SemiBoldText style={{ color: colorScheme.primary }}>
                        {album.year}
                      </SemiBoldText>
                    </LightText>
                  </header>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center my-6"
                  >
                    <LightText
                      className="italic mb-4"
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
                        className="text-2xl"
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
                    className="flex flex-wrap justify-center gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-2xl mx-auto"
                  >
                    {securedMusicPlatforms.map(platform => {
                      const sanitizedUrl = SecurityUtils.sanitizeUrl(
                        platform.url
                      );
                      return (
                        <CustomButton
                          key={platform.name}
                          size="sm"
                          className="flex justify-between items-center w-[140px] sm:w-full gap-2 mx-1 mb-2"
                          style={{ backgroundColor: colorScheme.primary }}
                          onClick={e => {
                            e.preventDefault();
                            setRedirectUrl(sanitizedUrl);
                            setIsModalOpen(true);
                          }}
                        >
                          <BoldText
                            className="truncate text-left"
                            fontSize="11px"
                            style={{ color: colorScheme.white }}
                          >
                            Play on {platform.name}
                          </BoldText>
                          <FontAwesomeIcon
                            icon={faExternalLinkAlt}
                            className="text-xs"
                            style={{ color: colorScheme.white }}
                          />
                        </CustomButton>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </article>

      {/* AudioMack Component */}
      <AudioMackComponent />

      {/* Download Section */}
      <DownloadSection />

      {/* Donation Section */}
      <section className="my-12 md:my-16">
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
        className="py-12 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
};
