import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Back1, Back2, Back3, Back4 } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faMusic, faVideo, faNewspaper } from '@fortawesome/free-solid-svg-icons';

interface HeroSlide {
  id: number;
  imageUrl: string;
  type: 'quote' | 'form' | 'streaming';
  content?: {
    quote?: string;
    reference?: string;
    formTitle?: string;
    streamingPlatforms?: { name: string; icon: any; url: string }[];
  };
}

const heroSlides: HeroSlide[] = [
  { id: 1, imageUrl: Back1, type: 'quote', content: { quote: "Enter Into His Gates With Thanksgiving And Into His Courts With Praise; Be Thankful Unto Him, and Bless His Name.", reference: "— Psalm 100:4" } },
  { id: 2, imageUrl: Back2, type: 'streaming', content: { streamingPlatforms: [ { name: 'Spotify', icon: faMusic, url: '#' }, { name: 'YouTube Music', icon: faVideo, url: '#' }, { name: 'Apple Music', icon: faMusic, url: '#' }, { name: 'Deezer', icon: faNewspaper, url: '#' } ] } },
  { id: 3, imageUrl: Back3, type: 'form', content: { formTitle: 'Book Us for Your Event' } },
  { id: 4, imageUrl: Back4, type: 'quote', content: { quote: 'Praise the Lord Most High', reference: '— Psalm 100:4' } }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } }
};

const textBounce = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(prev => (prev + 1) % heroSlides.length), 10000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative overflow-hidden">
      <div className="w-full h-screen md:h-[90vh] relative">
        <AnimatePresence initial={false} custom={isMobile}>
          {heroSlides.map((slide, idx) => idx === currentSlide && (
            <motion.div
              key={slide.id}
              className="absolute inset-0 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Image container preserving original size */}
              <div className="absolute inset-0">
                <img
                  src={slide.imageUrl}
                  alt="Hero"
                  className="w-full h-full object-contain object-center"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60" />
              {/* Content container aligned left */}
              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="max-w-3xl flex flex-col items-start text-white"
                >
                  {slide.type === 'quote' && (
                    <>
                      <motion.h1 {...textBounce} className="text-xl md:text-4xl font-roboto-condensed mb-4">
                        {slide.content?.quote}
                      </motion.h1>
                      <motion.p {...textBounce} className="text-lg md:text-xl italic mb-6">
                        {slide.content?.reference}
                      </motion.p>
                    </>
                  )}
                  {slide.type === 'streaming' && (
                    <>
                      <motion.h2 {...textBounce} className="text-2xl md:text-3xl mb-4">
                        Stream Our Music On
                      </motion.h2>
                      <motion.div {...textBounce} className="flex flex-wrap gap-4">
                        {slide.content?.streamingPlatforms?.map(p => (
                          <a key={p.name} href={p.url} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded">
                            <FontAwesomeIcon icon={p.icon} /> {p.name}
                          </a>
                        ))}
                      </motion.div>
                    </>
                  )}
                  {slide.type === 'form' && (
                    <>
                      <motion.h2 {...textBounce} className="text-2xl md:text-3xl mb-4">
                        {slide.content?.formTitle}
                      </motion.h2>
                      <motion.form {...textBounce} className="space-y-4 w-full md:w-1/2">
                        <input type="text" placeholder="Your Name" className="w-full p-3 rounded bg-white/20 placeholder-white" />
                        <input type="email" placeholder="Your Email" className="w-full p-3 rounded bg-white/20 placeholder-white" />
                        <button type="submit" className="bg-purple-900 px-6 py-3 rounded-full">
                          Submit
                        </button>
                      </motion.form>
                    </>
                  )}
                </motion.div>
              </div>
              {/* Pagination dots */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`w-3 h-3 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
