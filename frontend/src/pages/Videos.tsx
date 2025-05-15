import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NewsletterForm } from '../components/Newsletter';
import { MusicBan1, MusicBan2,
   AudioMack, MusicBan3,
  MusicBan8, Back3,
   MusicBan5, MusicBan4,
    MusicBan6, MusicBan7 , 
    VideoBanner1, VideoBanner2, 
    VideoBanner3, Back1, About1,
    Back2,
    Back4
  } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faChevronLeft,faVideo, faChevronRight , faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

type VideoType = {
  id: number;
  title: string;
  thumbnail: string;
  youtubeId: string;
  category: 'music' | 'Concerts' | 'Live Recordings';
  description: string;
  date: string;
};

const videos: VideoType[] = [
  {
    id: 1,
    title: 'Lover of my soul',
    thumbnail: MusicBan1,
    youtubeId: 'UZPaupINXYI',
    category: 'music',
    description: 'Official music video for "You Are Our Everything"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 2,
    title: 'Step Aside - Lover of my soul(Album)',
    thumbnail: MusicBan2,
    youtubeId: 'dQw4w9WgXcQ',
    category: 'music',
    description: 'Live worship performance of "In His Presence"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 3,
    title: 'Alleluia Chorus',
    thumbnail: MusicBan3,
    youtubeId: 'GgUSNW7dpH4',
    category: 'music',
    description: 'Official music video for "Affirmation"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 4,
    title: 'You Are Our Everything',
    thumbnail: MusicBan4,
    youtubeId: 'jkl012',
    category: 'Concerts',
    description: 'Full Sunday worship service with special ministry',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 5,
    title: 'My Testimony',
    thumbnail: MusicBan7,
    youtubeId: 'mno345',
    category: 'Live Recordings',
    description: 'Personal testimony about God\'s grace and mercy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 6,
    title: 'Worship Experience',
    thumbnail: MusicBan6,
    youtubeId: 'pqr678',
    category: 'Live Recordings',
    description: 'Worship Experience',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 7,
    title: 'Lover of my soul',
    thumbnail: MusicBan5,
    youtubeId: 'UZPaupINXYI',
    category: 'music',
    description: 'Official music video for "You Are Our Everything"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 8,
    title: 'Love of My Heart - Lover of my soul(Album)',
    thumbnail: MusicBan8,
    youtubeId: 'dQw4w9WgXcQ',
    category: 'music',
    description: 'Live worship performance of "In His Presence"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 9,
    title: 'Worship Experience - 1.0',
    thumbnail: Back3,
    youtubeId: 'GgUSNW7dpH4',
    category: 'music',
    description: 'Live Worship Session with ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 10,
    title: 'You Are Our Everything',
    thumbnail: VideoBanner1,
    youtubeId: 'jkl012',
    category: 'Concerts',
    description: 'Full Sunday worship service with special ministry',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 11,
    title: 'My Testimony',
    thumbnail: VideoBanner2,
    youtubeId: 'mno345',
    category: 'Live Recordings',
    description: 'Personal testimony about God\'s grace and mercy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 12,
    title: 'Worship Experience',
    thumbnail: VideoBanner3,
    youtubeId: 'pqr678',
    category: 'Live Recordings',
    description: 'Worship Experience',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 13,
    title: 'Lover of my soul',
    thumbnail: Back1,
    youtubeId: 'UZPaupINXYI',
    category: 'music',
    description: 'Official music video for "You Are Our Everything"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 14,
    title: 'Step Aside - Lover of my soul(Album)',
    thumbnail: Back2,
    youtubeId: 'dQw4w9WgXcQ',
    category: 'music',
    description: 'Live worship performance of "In His Presence"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 15,
    title: 'Alleluia Chorus',
    thumbnail: Back4,
    youtubeId: 'GgUSNW7dpH4',
    category: 'music',
    description: 'Official music video for "Affirmation"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 16,
    title: 'You Are Our Everything',
    thumbnail: About1,
    youtubeId: 'jkl012',
    category: 'Concerts',
    description: 'Full Sunday worship service with special ministry',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 17,
    title: 'My Testimony',
    thumbnail: MusicBan7,
    youtubeId: 'mno345',
    category: 'Live Recordings',
    description: 'Personal testimony about God\'s grace and mercy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 18,
    title: 'Worship Experience',
    thumbnail: MusicBan6,
    youtubeId: 'pqr678',
    category: 'Live Recordings',
    description: 'Worship Experience',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
];

const VIDEOS_PER_PAGE = 6;

const VideoCard: React.FC<{ 
  content: VideoType;
  onSelect: (videoId: string) => void;
}> = ({ content, onSelect }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={content.thumbnail} 
          alt={content.title} 
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
        <button 
            onClick={() => onSelect(content.youtubeId)}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-purple-900/80 hover:bg-purple-800 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FontAwesomeIcon icon={faPlay} className="text-lg" />
            </div>
          </button>
       
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white robotoMedium">{content.title}</h3>
          <p className="text-gray-300 slider-font ">{content.date}</p>
        </div>
      </div>
    </div>
  );
};
const VideoPlayerModal: React.FC<{
  videoId: string | null;
  onClose: () => void;
}> = ({ videoId, onClose }) => {
  if (!videoId) return null;
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <button 
          onClick={onClose}
          className="absolute -top-8 right-0 text-white hover:text-purple-300"
        >
          <FontAwesomeIcon icon={faTimes} className="text-2xl" />
        </button>
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
const PaginationControls: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50 disabled:cursor-not-allowed text-purple-900 hover:text-purple-700"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === index + 1
              ? 'bg-purple-900 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {index + 1}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50 disabled:cursor-not-allowed text-purple-900 hover:text-purple-700"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export const VideosData: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'music' | 'Concerts' | 'Live Recordings'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  return (
    <div className="bg-white">
      <VideoPlayerModal 
        videoId={selectedVideoId} 
        onClose={() => setSelectedVideoId(null)} 
      />
      
      {/* Rest of your existing layout */}
        <section className="pt-32 pb-20 bg-purple-900 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl roboto-condensed mb-6">Videos</h1>
              <div className="w-20 h-1 bg-white mb-8"></div>
              <p className="text-xl max-w-2xl robotoMedium text-20">Watch our Latest Music Videos, Live Recordings and Concerts </p>
            </motion.div>
          </div>
        </section>

      <div className="pt-24">
        <div className="container mx-auto px-4 md:px-8 py-16">
          {/* Category buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="relative group">
  <a href="#videos-section" className="flex flex-col items-center justify-center bg-purple-900 border-2 border-purple-900 rounded-full w-45 h-45 transition-all duration-300 hover:scale-105 hover:shadow-lg">
    {/* Bounce animation container */}
    <motion.div 
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-center"
    >
      <h1 className="text-gray-300 roboto-condensed text-2xl mb-2">Latest Videos</h1>
      <FontAwesomeIcon 
        icon={faVideo} 
        className="text-red-600 text-4xl animate-pulse"
      />
    </motion.div>
  </a>
  
  {/* Subtle background pulse effect */}
  <div className="absolute inset-0 rounded-full border-2 border-purple-200 opacity-0 group-hover:opacity-100 group-hover:animate-ping w-40 h-40 -z-10"></div>
</div>
          </div>

          {/* Video grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVideos.map((video) => (
              <VideoCard
                key={video.id}
                content={video}
                onSelect={setSelectedVideoId}
              />
            ))}
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <hr className="h-px w-full bg-purple-900 border-0 mt-4" />
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 inline-block p-4 bg-white rounded-full shadow-lg">
              <img 
                src={AudioMack} 
                alt="Audiomack Logo" 
                className="w-[150px] h-[150px] object-contain" 
              />
            </div>
            <h2 className="text-3xl md:text-4xl roboto-condensed font-bold mb-4">
              ClaudyGod Music is Now on AudioMack
            </h2>
            <p className="text-xl text-gray-600 mb-8 slider-font">
              Listen • Stream • Play
            </p>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-purple-800 text-white rounded-full hover:bg-purple-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
              <span className="robotoMedium">Stream Now on Audiomack</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
      <NewsletterForm />
    </div>
  );
};

