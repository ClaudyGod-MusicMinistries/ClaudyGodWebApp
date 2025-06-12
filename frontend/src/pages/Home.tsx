
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import { Hero } from '../components/HomepageHero';
import LatestRelease from '../components/latestRelease';
import { FeaturedVideos } from '../components/Featuredvideos';
import { ShopPreview } from '../components/ShopPreview';
import NewsletterForm  from '../components/Newsletter';
import { AudioMackComponent } from '../components/audioMack';
import { ScrollToTop } from '../components/ScrollToTop';
import { Welcome } from '../components/welcome';
import { Hero } from '../components/HomeHero/MainHero';


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
        <FeaturedVideos />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <NewsletterForm />
      </ScrollAnimationWrapper>
    </div>
  );
};