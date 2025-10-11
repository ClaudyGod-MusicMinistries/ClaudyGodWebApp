/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/Home.tsx
import { SEO } from '../components/util/SEO';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LatestRelease from '../components/Homepage/latestRelease';
import { FeaturedVideos } from '../components/Homepage/Featuredvideos';
import { ShopPreview } from '../components/Homepage/ShopPreview';
import { NewsletterForm } from '../components/util/Newsletter';
import { AudioMackComponent } from '../components/Homepage/AmazonMusic';
import { ScrollToTop } from '../components/Homepage/ScrollToTop';
import { Welcome } from '../components/Homepage/welcome';
import { Hero } from '../components/HomeHero/MainHero';
import { DownloadSection } from '../components/util/Download';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { lazy, Suspense, memo, useCallback } from 'react';

// Lazy load heavier components
const LazyDonationCallToAction = lazy(() =>
  import('../components/util/DonationSupport').then(
    module =>
      ({
        default: module.DonationCallToAction,
      }) as { default: React.ComponentType<any> }
  )
);

const LazyDownloadSection = lazy(() =>
  import('../components/util/Download').then(
    module =>
      ({
        default: module.DownloadSection,
      }) as { default: React.ComponentType<any> }
  )
);

const LazyShopPreview = lazy(() =>
  import('../components/Homepage/ShopPreview').then(
    module =>
      ({
        default: module.ShopPreview,
      }) as { default: React.ComponentType<any> }
  )
);

const LazyFeaturedVideos = lazy(() =>
  import('../components/Homepage/Featuredvideos').then(
    module =>
      ({
        default: module.FeaturedVideos,
      }) as { default: React.ComponentType<any> }
  )
);

const LazyAudioMackComponent = lazy(() =>
  import('../components/Homepage/AmazonMusic').then(
    module =>
      ({
        default: module.AudioMackComponent,
      }) as { default: React.ComponentType<any> }
  )
);

const LazyLatestRelease = lazy(() =>
  import('../components/Homepage/latestRelease').then(
    module =>
      ({
        default: module.default,
      }) as { default: React.ComponentType<any> }
  )
);

// Skeleton loaders
const SectionSkeleton = () => (
  <div className="h-80 bg-gray-200 animate-pulse rounded-xl mb-8" />
);

const DonationSkeleton = () => (
  <div className="h-60 bg-gray-200 animate-pulse rounded-xl mb-8" />
);

const DownloadSkeleton = () => (
  <div className="h-40 bg-gray-200 animate-pulse rounded-xl mb-8" />
);

// Memoized components
const ScrollAnimationWrapper = memo(
  ({ children }: { children: React.ReactNode }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      rootMargin: '-100px 0px',
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    );
  }
);

const WelcomeSection = memo(() => (
  <ScrollAnimationWrapper>
    <section aria-labelledby="welcome">
      <Welcome />
    </section>
  </ScrollAnimationWrapper>
));

const LatestReleaseSection = memo(() => (
  <ScrollAnimationWrapper>
    <section aria-labelledby="latest-release">
      <Suspense fallback={<SectionSkeleton />}>
        <LazyLatestRelease />
      </Suspense>
    </section>
  </ScrollAnimationWrapper>
));

const ShopPreviewSection = memo(() => (
  <ScrollAnimationWrapper>
    <section aria-labelledby="shop-preview">
      <Suspense fallback={<SectionSkeleton />}>
        <LazyShopPreview />
      </Suspense>
    </section>
  </ScrollAnimationWrapper>
));

const DonationSection = memo(() => (
  <ScrollAnimationWrapper>
    <section aria-labelledby="donation">
      <Suspense fallback={<DonationSkeleton />}>
        <LazyDonationCallToAction
          title="Partner with Our Ministry"
          subtitle="Your Support Makes a Difference"
          description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
          goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
          donateUrl="/donate"
        />
      </Suspense>
    </section>
  </ScrollAnimationWrapper>
));

const FeaturedVideosSection = memo(() => (
  <ScrollAnimationWrapper>
    <section aria-labelledby="videos">
      <Suspense fallback={<SectionSkeleton />}>
        <LazyFeaturedVideos />
      </Suspense>
    </section>
  </ScrollAnimationWrapper>
));

const AudioMackSection = memo(() => (
  <ScrollAnimationWrapper>
    <section aria-labelledby="music">
      <Suspense fallback={<SectionSkeleton />}>
        <LazyAudioMackComponent />
      </Suspense>
    </section>
  </ScrollAnimationWrapper>
));

const DownloadSectionComponent = memo(() => (
  <ScrollAnimationWrapper>
    <section aria-labelledby="download">
      <Suspense fallback={<DownloadSkeleton />}>
        <LazyDownloadSection />
      </Suspense>
    </section>
  </ScrollAnimationWrapper>
));

const NewsletterSection = memo(() => (
  <ScrollAnimationWrapper>
    <section aria-labelledby="newsletter">
      <NewsletterForm />
    </section>
  </ScrollAnimationWrapper>
));

// Main Home Component
export const Home = () => {
  const seoStructuredData = useCallback(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ClaudyGod Ministries',
      url: 'https://claudygod.org/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://claudygod.org/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ClaudyGod Ministries',
      },
    }),
    []
  );

  return (
    <>
      <SEO
        title="ClaudyGod Ministries - Gospel Music & Worship Community"
        description="Experience transformative worship, biblical teachings, and Christian community. Join our spiritual gatherings and grow in faith."
        keywords="gospel music, christian worship, claudygod, worship community"
        structuredData={seoStructuredData()}
      />

      <div className="overflow-x-hidden">
        <ScrollToTop />

        {/* Hero Section - Add padding-top to account for fixed navbar */}
        <section aria-labelledby="hero" className="pt-20">
          <Hero />
        </section>

        <WelcomeSection />
        <LatestReleaseSection />
        <ShopPreviewSection />
        <DonationSection />
        <FeaturedVideosSection />
        <AudioMackSection />
        <DownloadSectionComponent />
        <NewsletterSection />
      </div>
    </>
  );
};

export default memo(Home);
