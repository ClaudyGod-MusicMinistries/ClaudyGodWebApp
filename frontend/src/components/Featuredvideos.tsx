import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { About2 ,Cover , MusicBan5, 
  MusicBan6, MusicBan7, MusicBan8,
MusicBan4, MusicBan2, MusicBan3 } from '../assets';


interface VideoProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  date: string;
  youtubeUrl?: string; // Optional property for YouTube URL
}

const videos: VideoProps[] = [
  {
    id: "1",
    title: "You Are Our Everything",
    thumbnailUrl:Cover,
    duration: "4:20",
    views: "1.2M",
    date: "2024-03-15",
      youtubeUrl: "https://youtu.be/fK_tCBcnqGs?si=iDxJPfwKsurLM-YJ"
  },
  {
    id: "2",
    title: "King of Heaven",
    thumbnailUrl: MusicBan5,
    duration: "5:45",
    views: "890K",
    date: "2024-02-28",
      youtubeUrl: "https://youtu.be/W_Gfia-R3Ec?si=U76g5kbcdESlY-yT"
  },
  {
    id: "3",
    title: "We Would Reign",
    thumbnailUrl: MusicBan6,
    duration: "3:55",
    views: "2.1M",
    date: "2024-04-02",
      youtubeUrl: "https://youtu.be/iOil3NAE9V4?si=jx0MNOVe5D9MLh3b"
  },
  {
    id: "4",
    title: "Affirmation",
    thumbnailUrl: MusicBan7,
    duration: "6:10",
    views: "950K",
    date: "2024-01-10",
      youtubeUrl: "https://youtu.be/xH9alRoEfbI?si=MpR6N9k9eP8OHQrw"
  },
  {
    id: "5",
    title: "Divine Connection",
    thumbnailUrl: MusicBan8,
    duration: "4:30",
    views: "750K",
    date: "2024-03-01",
      youtubeUrl: "https://youtu.be/hto6hlHSpac?si=JE7Ie9Rv6J_vAA9W"
  },
  {
    id: "6",
    title: "Eternal Grace",
    thumbnailUrl:MusicBan4,
    duration: "5:15",
    views: "1.5M",
    date: "2024-04-15",
    youtubeUrl: "https://youtu.be/mK26U9psCCI?si=pfzzYdmBVyRKN9ZS"
    // 
  },
    {
    id: "7",
    title: "Eternal Grace",
    thumbnailUrl:MusicBan2,
    duration: "5:15",
    views: "1.5M",
    date: "2024-04-15",
      youtubeUrl: "https://youtu.be/Nct_ivFongM?si=QGXswk97mx3BSEzF"
  },
    {
    id: "8",
    title: "Eternal Grace",
    thumbnailUrl: MusicBan3,
    duration: "5:15",
    views: "1.5M",
    date: "2024-04-15",
      youtubeUrl: "https://youtu.be/lqDbkGpJqqE?si=r083DVVq5-2MmSJz"
  },
];

const VideoCard: React.FC<VideoProps> = ({  title, thumbnailUrl, duration, views, date, youtubeUrl }) => {
  return (
    <motion.div 
      className="group relative flex flex-col w-full h-full"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
    <a 
  href={youtubeUrl} // Add youtubeUrl to your VideoProps interface
  target="_blank"
  rel="noopener noreferrer"
  className="block relative rounded-xl overflow-hidden aspect-video"
>
  <img 
    src={thumbnailUrl} 
    alt={title} 
    className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
    loading="lazy"
  />
  <div className="absolute inset-0 bg-black/40 flex items-end p-4">
    <span className="text-white raleway-medium bg-black/60 px-2 py-1 rounded-md text-sm">
      {duration}
    </span>
  </div>
</a>
      <div className="mt-3">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <div className="flex justify-between text-gray-400 text-sm mt-1">
          <span className='work-sans'>{views} views</span>
          <span className='work-sans'>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedVideos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left'|'right'>('right');
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth >= 768 ? 4 : window.innerWidth >= 640 ? 2 : 1);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, activeIndex]);

  const totalSlides = Math.ceil(videos.length / itemsPerSlide);

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setDirection('right');
    setActiveIndex(prev => (prev + 1) % totalSlides);
  };

  const visibleVideos = videos.slice(
    activeIndex * itemsPerSlide,
    (activeIndex * itemsPerSlide) + itemsPerSlide
  );

  return (
    <section 
  className="relative py-16 min-h-[750px] flex items-center overflow-hidden"
  style={{ 
    backgroundImage: `url(${About2})`,
    backgroundSize: '100% auto',  // Reduced width size
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
  }}
>
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto relative z-10 px-4">
        {/* <div className="flex bg-red-900 
        flex-col md:flex-row 
        justify-between items-center mb-8"> */}
        <div className="flex  flex-col
         md:flex-row justify-between 
        items-start md:items-center mb-40">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl 
           roboto-condensed text-white mb-4 md:mb-0"
          >
            Featured Videos
          </motion.h2>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">

          {/* <div className="flex gap-4"> */}
            <Link
              to="/music"
              className="bg-purple-900 text-white font-medium 
              hover:bg-transparent transition-all duration-300 flex 
              items-center border-2 border-purple-900 work-sans rounded-full px-6 py-2 hover:text-white"
            >
              Latest Music Release
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>

            <Link
                 to="/videos"
      className="text-white font-medium hover:text-white work-sans hover:bg-purple-900 transition-colors duration-300 flex items-center border-2 border-purple-900 rounded-full px-4 py-1.5 md:px-6 md:py-2 hover:border-white"
            >
              More Videos
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
       

        <div 
          className="relative max-w-7xl mx-auto overflow-hidden p-8 border-2  border-green-500 rounded-xl bg-black/30"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            >
              {visibleVideos.map((video) => (
                <motion.div 
                  key={video.id}
                  className="w-full"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <VideoCard {...video} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
   <div className="flex justify-center mt-8 space-x-2">  {/* Changed mb-90 to mt-8 */}
  {Array.from({ length: totalSlides }).map((_, index) => (
    <button
      key={index}
      onClick={() => {
        setDirection(index > activeIndex ? 'right' : 'left');
        setActiveIndex(index);
      }}
      className={`w-3 h-3 rounded-full transition-colors ${
        index === activeIndex ? 'bg-green-500' : 'bg-gray-500'
      }`}
    />
  ))}
</div>
      </div>
    </section>
  );
};