import { SEO } from '../components/util/SEO';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LatestRelease from '../components/Homepage/latestRelease';
import { FeaturedVideos } from '../components/Homepage/Featuredvideos';
import { ShopPreview } from '../components/Homepage/ShopPreview';
import {NewsletterForm}  from '../components/util/Newsletter';
import { AudioMackComponent } from '../components/Homepage/AmazonMusic';
import { ScrollToTop } from '../components/Homepage/ScrollToTop';
import { Welcome } from '../components/Homepage/welcome';
import { Hero } from '../components/HomeHero/MainHero';
import { DownloadSection } from '../components/util/Download';
import { DonationCallToAction } from '../components/util/DonationSupport';

const ScrollAnimationWrapper = ({ children }: { children: React.ReactNode }) => {
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
};

export const Home = () => {
  return (
    <>
     <SEO
        title="ClaudyGod Ministries - Gospel Music & Worship Community"
        description="Experience transformative worship, biblical teachings, and Christian community. Join our spiritual gatherings and grow in faith."
        keywords="gospel music, christian worship, claudygod, worship community"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "ClaudyGod Ministries",
          "url": "https://claudygod.org/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://claudygod.org/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
    <div className="overflow-x-hidden">
      
      <ScrollToTop />
 
      <ScrollAnimationWrapper>
        <Hero />
      </ScrollAnimationWrapper>
    <ScrollAnimationWrapper>
       <Welcome />
      </ScrollAnimationWrapper>
           <ScrollAnimationWrapper>
        <LatestRelease />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <ShopPreview />
      </ScrollAnimationWrapper>
<DonationCallToAction
  title="Partner with Our Ministry"
  subtitle="Your Support Makes a Difference"
  description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, 
  and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
  goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
  donateUrl="/donate"
/>
  <ScrollAnimationWrapper>
        <FeaturedVideos />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <AudioMackComponent />
      </ScrollAnimationWrapper>
 <ScrollAnimationWrapper>
     <DownloadSection />
      </ScrollAnimationWrapper>
     

      <ScrollAnimationWrapper>
        <NewsletterForm />
      </ScrollAnimationWrapper>
    </div>
    </>
  );
};