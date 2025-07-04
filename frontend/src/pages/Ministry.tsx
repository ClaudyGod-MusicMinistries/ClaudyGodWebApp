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


const VideoCard = ({ 
  content, 
  onClick 
}: { 
  content: TeachingType; 
  onClick: () => void; 
}) => {
  return (
    <motion.div
      className="relative cursor-pointer group overflow-hidden rounded-xl shadow-lg"
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="relative h-full">
          <img
            src={`https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`}
            alt={content.title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <FontAwesomeIcon
                icon={faPlay}
                className="text-white text-xl pl-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white">
        <div className="flex items-center mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
            {content.scripture}
          </span>
          <span className="ml-2 text-xs text-gray-500">{content.date}</span>
        </div>
        <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight mb-1">
          {content.title}
        </h3>
        <p className="text-sm text-purple-600 font-medium">{content.teacher}</p>
      </div>
    </motion.div>
  );
};

const VideoModal = ({ 
  videoId, 
  onClose 
}: { 
  videoId: string | null; 
  onClose: () => void; 
}) => {
  if (!videoId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
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
          <button
            className="cursor-pointer absolute -top-12 right-0 text-white text-2xl z-10 hover:text-purple-300 transition-colors"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
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

const ContentSection = ({ 
  title, 
  description, 
  contents 
}: { 
  title: string; 
  description: string; 
  contents: TeachingType[]; 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(4);
      } else if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(contents.length / itemsPerPage);
  
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);

  const visibleItems = contents.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <VideoModal 
          videoId={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-4">
            <div className="w-12 h-0.5 bg-purple-600 mr-4"></div>
            <h2 className="text-xl font-semibold text-purple-600 tracking-wider">
              {title}
            </h2>
            <div className="w-12 h-0.5 bg-purple-600 ml-4"></div>
          </div>
          <p className="text-3xl font-bold roboto-condensed text-gray-900 max-w-3xl mx-auto leading-tight mb-6">
           Min. ClaudyGod Teachings & Podcasts
          </p>
          <p className="text-base text-gray-600 work-sans max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {visibleItems.map(content => (
              <VideoCard
                key={content.id}
                content={content}
                onClick={() => setSelectedVideo(content.youtubeId)}
              />
            ))}
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-6">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-purple-50 transition-colors"
                  disabled={currentSlide === 0}
                >
                  <FontAwesomeIcon 
                    icon={faChevronLeft} 
                    className={`text-lg ${currentSlide === 0 ? 'text-gray-300' : 'text-purple-600'}`}
                  />
                </button>
                
                <div className="flex space-x-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-purple-50 transition-colors"
                  disabled={currentSlide === totalSlides - 1}
                >
                  <FontAwesomeIcon 
                    icon={faChevronRight} 
                    className={`text-lg ${currentSlide === totalSlides - 1 ? 'text-gray-300' : 'text-purple-600'}`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const MinistryData = () => {
  return (
    <div className="bg-white">
      <Herosection 
        title="ClaudyGod Music & Ministries"
        subtitle="Spiritual Teachings & Podcasts"
        backgroundImage={About1}
        overlayColor="rgba(79, 70, 229, 0.85)"
        className="h-[70vh]"
      />
      
      <ContentSection
        title="PODCASTS & TEACHINGS"
        description="Minister Claudy's passion for sharing the Gospel radiates through both her writing and speaking. As a gospel artist, devoted teacher, and lover of God, she has also shared her inspiring presence on national television."
        contents={teachingsData}
      />
      
      <div className="py-16 bg-gradient-to-r from-purple-900 to-indigo-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-6">
            Stay Connected With Our Ministry
          </h3>
          <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates on new teachings, podcasts, and ministry events
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};