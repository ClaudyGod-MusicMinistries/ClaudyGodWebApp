import { SEO } from '../components/Utils/SEO';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import { Hero } from '../components/HomepageHero';
import LatestRelease from '../components/Homepage/latestRelease';
import { FeaturedVideos } from '../components/Homepage/Featuredvideos';
import { ShopPreview } from '../components/Homepage/ShopPreview';
import NewsletterForm  from '../components/Utils/Newsletter';
import { AudioMackComponent } from '../components/Homepage/audioMack';
import { ScrollToTop } from '../components/Homepage/ScrollToTop';
import { Welcome } from '../components/Homepage/welcome';
import { Hero } from '../components/HomeHero/MainHero';
import { DownloadSection } from '../components/Utils/download';


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

 

      <ScrollAnimationWrapper>
        <AudioMackComponent />
      </ScrollAnimationWrapper>
 <ScrollAnimationWrapper>
     <DownloadSection />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <FeaturedVideos />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <NewsletterForm />
      </ScrollAnimationWrapper>
    </div>
    </>
  );
};