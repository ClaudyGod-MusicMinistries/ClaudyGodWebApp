import { useState, useEffect } from 'react';
import { Herosection } from '../components/Herosection';
import NewsletterForm  from '../components/Newsletter';
import { About1, music6, music7, music9, } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';

type TeachingType = {
  id: number;
  title: string;
  thumbnail: string;
  youtubeId: string;
  scripture: string;
  teacher: string;
  date: string;
};

const teachingsData: TeachingType[] = [
  {
    id: 1,
    title: "Discussing Matters that affect the Modern day church",
    thumbnail: music6,
    youtubeId: '0e-JsLgoa00',
    scripture: "Live Teachings",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 2,
    title: "Three Operations of the Gift of Tongues",
    thumbnail: music7,
    youtubeId: 'EQGJdGfS9Ak',
    scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 3,
    title: "How to identify a demon in a person. What is God will for such person.",
    thumbnail: music9,
    youtubeId: 'ZmIt4Pk1y2o',
     scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 4,
    title: "How to Start Living Holy",
   thumbnail: music7,
    youtubeId: '9VlbbmHlzFc',
   scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 5,
    title: "Walking by the Spirit (ClaudyGod's Nugget of Truth)",
      thumbnail: music6,
    youtubeId: 'HUMjBLKTq7Q',
   scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 6,
    title: "God's Plan for Israel",
    thumbnail: music9,
    youtubeId: 'swOlMakN570',
      scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 7,
    title: "Don't be stuck in moments - (ClaudyGod's Nugget of Truth)",
thumbnail: music6,
    youtubeId: 'tyxSeRXxaSE',
 scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 8,
    title: "The Day of the Lord according to the Book of Malachi - (Series on the Coming of the Lord).",
     thumbnail: music7,
    youtubeId: '95N205rkScs',
     scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 9,
    title: "Not all storms are from the devil",
  thumbnail: music9,
    youtubeId: 'EtAvn6NAwMY',
     scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 10,
    title: "Faith like Abraham's",
    thumbnail: music7,
    youtubeId: 'U_Is76egy9I',
        scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
   {
    id: 11,
    title: "When God goes against normal - He defies regular! ",
 thumbnail: music6,
    youtubeId: 'DmGi7BVtS8U',
    scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 12,
    title: "When God Hides His Face From Us",
   thumbnail: music9,
    youtubeId: 'lEBNS-rP8D4',
     scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 13,
    title: "The love of this world is hostility to God. James 4:4",
   thumbnail: music6,
    youtubeId: 'Tm8b1ZP-P5g',
    scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 14,
    title: "Who are the 144,000 in the book of Revelation?",
      thumbnail: music7,
    youtubeId: '/l3iEa2tbdvU',
scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 15,
    title: "How's your ASK?(You do not have what you want because you don't ask)",
   thumbnail: music9,
    youtubeId: 'SHwQVf35oxM',
    scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 16,
    title: "The Lord is a Jealous God",
   thumbnail: music7,
    youtubeId: 'VDPSqmpFRs8',
    scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 17,
    title: "How the Lord expects us to behave",
    thumbnail: music6,
    youtubeId: 'FlHxLnpwyNk',
  scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 18,
    title: "What's your Motive for Asking God for help?",
       thumbnail: music9,
    youtubeId: 'hishWNwR1v8',
  scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 19,
    title: "Why God blesses us (ClaudyGod's Nugget of Truth)",
    thumbnail: music6,
    youtubeId: 'qrruANQhLKI',
scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 20,
    title: "What kind of relationship do you have with God - a Mary or Martha kind?",
    thumbnail: music7,
    youtubeId: 'PhVKzo1IKrU',
scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
  ,
     {
    id: 21,
    title: "Understanding God's Endtime plan for Israel",
   thumbnail: music9,
    youtubeId: '/swOlMakN570',
scripture: "CGM Podcasts",
    teacher: "Min. Claudy",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
];


const VideoCard: React.FC<{
  content: TeachingType;
  onClick: () => void;
}> = ({ content, onClick }) => {
  // Dynamically build YouTube thumbnail URL
  const ytThumbnail = `https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`;
  const [imgSrc, setImgSrc] = useState<string>(ytThumbnail);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackThumbnail);
      setHasError(true);
    }
    setLoading(false);
  };

  return (
    <div
      className="relative cursor-pointer group transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      <figure className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}

        <img
          src={imgSrc}
          alt={content.title}
          className={
            `w-full h-full object-cover transform transition-transform duration-300 ` +
            (loading ? 'opacity-0' : 'opacity-100 group-hover:scale-105')
          }
          onLoad={() => setLoading(false)}
          onError={handleError}
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faPlay}
            className="text-white text-4xl opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </figure>

      <div className="mt-4 space-y-2">
        <h3 className="text-lg roboto-condensed text-gray-800">{content.title}</h3>
        <p className="text-sm text-purple-600 robotoMedium">{content.scripture}</p>
        <div className="flex justify-between raleway-slider text-sm text-gray-500">
          <span>{content.teacher}</span>
          <span>{content.date}</span>
        </div>
      </div>
    </div>
  );
};

const VideoModal: React.FC<{
  videoId: string | null;
  onClose: () => void;
}> = ({ videoId, onClose }) => {
  if (!videoId) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="cursor-pointer absolute -top-12 right-0 text-white text-2xl z-10 hover:text-purple-300 transition-colors"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const ContentSection: React.FC<{
  title: string;
  description: string;
  contents: TeachingType[];
}> = ({ title, description, contents }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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
        <div className="mt-16 space-y-8 px-4 max-w-7xl mx-auto">
      <VideoModal 
        videoId={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
      
      <div className="text-left">
        <h2 className="text-2xl md:text-xl roboto-condensed text-purple-900">{title}</h2>
        <div className="w-[150px] h-2 bg-purple-900 my-4"></div>
        <p className="text-gray-600 work-sans  md:text-base max-md:text-xx  max-w-2xl">{description}</p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visibleItems.map(content => (
            <div key={content.id} className="w-full">
              <VideoCard
                content={content}
                onClick={() => setSelectedVideo(content.youtubeId)}
              />
            </div>
          ))}
        </div>

       

         <div className="flex items-center p-3 justify-between mt-6 md:mt-8">
  {/* Moved button group to left side */}
  <div className="flex items-center space-x-3 md:space-x-4">
    <button
      onClick={prevSlide}
      className="bg-purple-900 text-white p-1.5 md:p-2 rounded-full hover:bg-purple-800 transition-colors"
      disabled={currentSlide === 0}
    >
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <span className="text-sm md:text-base text-gray-600">
      {currentSlide + 1} / {totalSlides}
    </span>

    <button
      onClick={nextSlide}
      className="bg-purple-900 text-white p-1.5 md:p-2 rounded-full hover:bg-purple-800 transition-colors"
      disabled={currentSlide === totalSlides - 1}
    >
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>

  {/* Pagination indicators remain centered */}
  <div className="hidden md:flex justify-center w-full absolute left-0">
    <div className="flex space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`h-2 w-6 md:w-8 rounded-full transition-colors ${
            index === currentSlide ? 'bg-purple-900' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  </div>
</div>
        </div>
      </div>

  );
};

export const MinistryData: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative">
        <div className="absolute inset-0  z-10"></div>
        <Herosection 
          title="ClaudyGod Music & Ministry / Ministry"
          backgroundImage={About1}
          className="relative z-0"
        />
      </div>
      
      <ContentSection
        title="ClaudyGod Podcasts"
       
        description="Minister Claudy's passion for sharing the Gospel radiates through both her writing and speaking. As a gospel artist, devoted teacher, and lover of God, she has also shared her inspiring presence on national television, guest-hosting programs such as Breakfast in Bed and The Sunday Show."
        contents={teachingsData}
      />
      
      <hr className="h-px w-full bg-purple-900 border-0 mt-4" />
      <NewsletterForm />
    </div>
  );
};