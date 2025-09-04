import React, { useState } from 'react';
import { SEO } from '../components/util/SEO';
import { motion } from 'framer-motion';
import { AudioMackComponent } from '../components/Homepage/AmazonMusic';
import { Cover } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownloadSection } from '../components/util/Download';
import {
  faInfoCircle,
  faArrowDown,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { securedMusicPlatforms } from '../components/data/musicData';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { SecurityModal } from '../components/util/modals/SecurityModal';
import { useTheme } from '../contexts/ThemeContext';

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
      style={{ backgroundColor: colorScheme.gray[100] }}
    >
      <SEO
        title="ClaudyGod Music - Stream Gospel Albums & Singles"
        description="Stream ClaudyGod's gospel music on all platforms."
        keywords="gospel music, christian albums, worship songs, claudygod music"
      />

      {/* Security Modal */}
      <SecurityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinue={handleRedirect}
        redirectUrl={redirectUrl || ''}
      />

      {/* Hero */}
      <section
        className="py-24 px-6 text-center relative flex flex-col items-center justify-center"
        style={{
          background: `linear-gradient(to bottom right, ${colorScheme.primary}, ${colorScheme.primary})`,
        }}
      >
        <ExtraBoldText fontSize="3rem" style={{ color: colorScheme.gray[300] }}>
          Music
        </ExtraBoldText>
        <div
          className="w-24 h-1.5 rounded-full my-6"
          style={{ backgroundColor: colorScheme.accent }}
        />
        <LightText style={{ color: colorScheme.text }} className="max-w-2xl">
          Experience the divine fusion of American Contemporary Christian and
          Afro-Gospel songs.
        </LightText>
      </section>

      {/* Streaming Platforms */}
      <section className="py-16 px-6">
        <header className="text-center mb-12">
          <ExtraBoldText
            fontSize="1.5rem"
            style={{ color: colorScheme.primary }}
          >
            Available On All Platforms
          </ExtraBoldText>
          <LightText
            className="max-w-xl mx-auto"
            style={{ color: colorScheme.gray[600] }}
          >
            Stream ClaudyGod's music everywhere, anytime, anyday, anywhere.
          </LightText>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {securedMusicPlatforms.map(platform => (
            <SecuredLink key={platform.name} platform={platform} />
          ))}
        </div>

        <footer className="mt-10 flex justify-center">
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
        </footer>
      </section>

      {/* Latest Release */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: colorScheme.background }}
      >
        <header className="text-center mb-16">
          <ExtraBoldText fontSize="2rem">
            Latest Release: You Are Our Everything
          </ExtraBoldText>
          <div
            className="w-32 h-1 rounded-full mx-auto mt-4"
            style={{ backgroundColor: colorScheme.accent }}
          />
        </header>

        <div className="max-w-6xl mx-auto grid gap-16">
          {albums.map(album => (
            <article
              key={album.id}
              className="grid md:grid-cols-3 gap-10 items-start rounded-2xl shadow-lg p-6"
              style={{ backgroundColor: colorScheme.card }}
            >
              {/* Album Cover */}
              <div className="overflow-hidden rounded-xl shadow-xl">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Album Info */}
              {/* Album Info */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <header>
                  <ExtraBoldText
                    className="text-3xl mb-2"
                    style={{ color: colorScheme.text }}
                  >
                    {album.title}
                  </ExtraBoldText>
                  <LightText
                    className="mb-8"
                    style={{ color: colorScheme.gray[200] }}
                  >
                    Released{' '}
                    <SemiBoldText style={{ color: colorScheme.primary }}>
                      {album.year}
                    </SemiBoldText>
                  </LightText>
                </header>

                <div className="text-center my-8">
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
                </div>

                {/* Platform Buttons */}
                <div
                  className="
      flex flex-wrap justify-center gap-2
      sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      max-w-2xl mx-auto
    "
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
                        style={{ backgroundColor: colorScheme.body }}
                        onClick={e => {
                          e.preventDefault();
                          setRedirectUrl(sanitizedUrl);
                          setIsModalOpen(true);
                        }}
                      >
                        <BoldText
                          className="truncate text-left"
                          fontSize="11px"
                        >
                          Play on {platform.name}
                        </BoldText>

                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className="text-xs"
                        />
                      </CustomButton>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer CTAs */}
      <DonationCallToAction
        title="Partner with Our Ministry"
        subtitle="Your Support Makes a Difference"
        description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts."
        goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
        donateUrl="/donate"
      />
      <AudioMackComponent />
      <DownloadSection />
      <NewsletterForm />
    </main>
  );
};
