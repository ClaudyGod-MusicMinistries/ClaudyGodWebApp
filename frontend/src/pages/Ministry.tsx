/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faTimes,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Herosection } from '../components/util/Herosection';
import { NewsletterForm } from '../components/util/Newsletter';
import { About1 } from '../assets/';
import { teachingsData, TeachingType } from '../components/data/MinistryData';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { BoldText, ExtraBoldText, LightText, RegularText } from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { useTheme } from '../contexts/ThemeContext';



const VideoCard = ({ 
  content, 
  onClick 
}: { 
  content: TeachingType; 
  onClick: () => void; 
}) => {
  const { colorScheme } = useTheme();

  return (
    <motion.div
      className="relative cursor-pointer group overflow-hidden rounded-xl shadow-lg"
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`}
          alt={content.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center border-2"
            style={{
              backgroundColor: `${colorScheme.textSecondary}20`,
              backdropFilter: 'blur(8px)',
              borderColor: `${colorScheme.textSecondary}30`
            }}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="text-xl pl-1"
              style={{ color: colorScheme.text }}
            />
          </div>
        </div>
      </div>

      <div className="p-4" style={{ backgroundColor: colorScheme.surface }}>
      <div className="flex items-center gap-15">
  <LightText
    className="px-2 py-1 rounded-full"
    style={{
      color: colorScheme.text,
      fontSize: "0.8rem",
      backgroundColor: `${colorScheme.primary}20`
    }}
  >
    {content.scripture}
  </LightText>

  <LightText style={{ color: colorScheme.gray[300]
    ,fontSize: "0.8rem",
   }}>
    {content.date}
  </LightText>
</div>

        <BoldText style={{ color: colorScheme.text }}>
 {content.title}
        </BoldText>
    
        <LightText 
         style={{ color: colorScheme.accent }}>
          {content.teacher}
          </LightText>
       
      </div>
    </motion.div>
  );
};

/* ---------- VIDEO MODAL ---------- */
const VideoModal = ({ 
  videoId, 
  onClose 
}: { 
  videoId: string | null; 
  onClose: () => void; 
}) => {
  const { colorScheme } = useTheme();
  if (!videoId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: `${colorScheme.background}90`, backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={e => e.stopPropagation()}
        >
          <CustomButton
            onClick={onClose}
            variant="icon"
            size="sm"
            className="absolute -top-12 right-0 z-10"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </CustomButton>
          
          <div 
            className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${colorScheme.primary}50` }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ---------- PAGINATION DOTS ---------- */
const PaginationDots = ({
  totalSlides,
  currentSlide,
  setCurrentSlide,
  colorScheme
}: {
  totalSlides: number;
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  colorScheme: any;
}) => {
  const maxDots = 5;
  const startIndex = Math.floor(currentSlide / maxDots) * maxDots;
  const endIndex = Math.min(startIndex + maxDots, totalSlides);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: endIndex - startIndex }).map((_, i) => {
        const slideIndex = startIndex + i;
        return (
          <button
            key={slideIndex}
            onClick={() => setCurrentSlide(slideIndex)}
            className="w-2 h-2 rounded-full transition-colors"
            style={{
              backgroundColor:
                slideIndex === currentSlide
                  ? colorScheme.primary
                  : colorScheme.textSecondary
            }}
          />
        );
      })}
    </div>
  );
};

/* ---------- CONTENT SECTION ---------- */
const ContentSection = ({ 
  title, 
  description, 
  contents 
}: { 
  title: string; 
  description: string; 
  contents: TeachingType[]; 
}) => {
  const { colorScheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setItemsPerPage(4);
      else if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(contents.length / itemsPerPage);
  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  const visibleItems = contents.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  return (
    <section className="py-16 px-4" style={{ backgroundColor: colorScheme.gray[50] }}>
      <div className="max-w-7xl mx-auto">
        <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-4">
            <div className="w-12 h-0.5 mr-4" style={{ backgroundColor: colorScheme.primary }}></div>
            <RegularText fontSize="1rem" bold style={{ color: colorScheme.primary }} className="tracking-wider">
              {title}
            </RegularText>
            <div className="w-12 h-0.5 ml-4" style={{ backgroundColor: colorScheme.primary }}></div>
          </div>
          <ExtraBoldText fontSize="2rem" mdFontSize="2.5rem" style={{ color: colorScheme.background }} className="max-w-3xl mx-auto leading-tight mb-6">
            Min. ClaudyGod Teachings & Podcasts
          </ExtraBoldText>
          <RegularText fontSize="1rem" style={{ color: colorScheme.button }} className="max-w-2xl mx-auto">
            {description}
          </RegularText>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {visibleItems.map(content => (
              <VideoCard key={content.id} content={content} onClick={() => setSelectedVideo(content.youtubeId)} />
            ))}
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <CustomButton onClick={prevSlide} variant="icon" size="lg" disabled={currentSlide === 0}
                  style={{
                    backgroundColor: colorScheme.surface,
                    color: currentSlide === 0 ? colorScheme.textSecondary : colorScheme.primary
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </CustomButton>
                
                <PaginationDots totalSlides={totalSlides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} colorScheme={colorScheme} />
                
                <CustomButton onClick={nextSlide} variant="icon" size="lg" disabled={currentSlide === totalSlides - 1}
                  style={{
                    backgroundColor: colorScheme.surface,
                    color: currentSlide === totalSlides - 1 ? colorScheme.textSecondary : colorScheme.primary
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </CustomButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------- MINISTRY DATA PAGE ---------- */
export const MinistryData = () => {
  const { colorScheme } = useTheme();

  return (
    <div style={{ backgroundColor: colorScheme.background }}>
      <Herosection 
        title="ClaudyGod Music & Ministries"
        subtitle="Spiritual Teachings & Podcasts"
        backgroundImage={About1}
        overlayColor={`${colorScheme.primary}dd`}
        className="h-[70vh]"
      />
      
      <ContentSection
        title="PODCASTS & TEACHINGS"
        description="Minister Claudy's passion for sharing the Gospel radiates through both her writing and speaking. As a gospel artist, devoted teacher, and lover of God, she has also shared her inspiring presence on national television."
        contents={teachingsData}
      />

      <DonationCallToAction
        title="Partner with Our Ministry"
        subtitle="Your Support Makes a Difference"
        description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
        goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
        donateUrl="/donate"
      />

      <div className="py-16" style={{
        background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.accent})`
      }}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <ExtraBoldText fontSize="2rem" mdFontSize="2.5rem" style={{ color: colorScheme.text }} className="mb-6">
            Stay Connected With Our Ministry
          </ExtraBoldText>
          <RegularText fontSize="1.125rem" style={{ color: colorScheme.textSecondary }} className="mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates on new teachings, podcasts, and ministry events
          </RegularText>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};
