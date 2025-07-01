import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import VideoPlayerModal from '../components/videos/VideoPlayerModel';
import VideoCard from '../components/videos/VideoCard';
import PaginationControls from '../components/videos/PaginationControls';
import DiagonalSection from '../components/videos/DiagonalSection';
import  {NewsletterForm} from '../components/util/Newsletter';
import { AudioMackComponent } from '../components/Homepage/audioMack';
import { DownloadSection } from '../components/util/Download';


type VideoType = {
  id: number;
  title: string;
  youtubeId: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions';
  description: string;
  date: string;
};

const videos: VideoType[] = [
  {
    id: 1,
    title: 'STEP ASIDE. ',
    youtubeId: '3nvGauo7kjA',
    category: 'Music Videos',
    description: 'Song by Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
 
  {
    id: 2,
    title: 'Nothing Compares To You',
    youtubeId: 'Dw5S-jzzboA',
    category: 'Visualizers',
    description: 'Official Music Video/Visualizer',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 3,
    title: 'Dwelling Place (Forever God)',
    youtubeId: 'KoVkhbrRjf8',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 4,
    title: 'Look To You (Official Visualizer/ Music Video)',
    youtubeId: '7BN7i4puuis',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 5,
    title: 'NEW! I Love You Lord by ClaudyGod',
    youtubeId: 'SqaOeGLDPLY',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
       {
    id: 6,
    title: `'It's A New Day (Thank You For Today)'`,
    youtubeId: 'Ak0LZgfHMa0',
    category: 'Music Videos',
    description: 'Song by Min. Claudy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 7,
    title: 'All of Me (Official Music Video)',
    youtubeId: 'L-AVa2qC5Ic',
   category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 8,
    title: 'VERY GLORIOUS Live Recording (Angel Inspired Song)',
    youtubeId: 'xY4508hwPfw',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
   {
    id: 9,
    title: 'Joyful Alleluia by ClaudyGod',
    youtubeId: 'ih4SrEgnV60',
    category: 'Music Videos',
    description: 'Song by Min. Claudy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 10,
    title: 'NOW OUT! King of the Nations',
    youtubeId: 'UZPaupINXYI',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 11,
    title: 'Love Me So Much',
    youtubeId: 'uro0EWsYdxc',
    category: 'Music Videos',
    description: 'Song by Min. Claudy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 12,
    title: 'Nothing Compares To You(Official Music Video/Visualizer)',
    youtubeId: 'Dw5S-jzzboA',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 13,
    title: 'NEW! Very Glorious LIVE WORSHIP SESSION (An Angel Inspired Song)',
    youtubeId: '6pDDMP9Xprg',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 14,
    title: 'Affirmation',
    youtubeId: 'bVOAeBAer4U',
    category: 'Music Videos',
    description: 'Song by Min Claudy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 15,
    title: 'Lover of My Soul',
    youtubeId: 'lrKaURkswT0',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    })
  },
  {
    id: 16,
    title: `I Love You Lord ( Official Music Video) '`,
    youtubeId: 'r8rp58DqavM',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 17,
    title: 'Look to You',
    youtubeId: 'vS8myyETQP4',
    category: 'Visualizers',
    description: 'official Visualizer/Music Videos"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  
]

const VIDEOS_PER_PAGE = 6;

export const VideosData: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Music Videos' | 'Visualizers' | 'Live Sessions'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const videoGridRef = useRef<HTMLDivElement>(null);

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  const scrollToVideoGrid = () => {
    videoGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
     <section className="pt-32 pb-20 bg-purple-900 text-white">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl roboto-condensed mb-6">Videos</h1>
                <div className="w-20 h-1 bg-white mb-8"></div>
                <p className="text-sm max-w-2xl work-sans">
                      Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel Songs through ClaudyGod's Inspirational Journey.
                </p>
              </motion.div>
            </div>
          </section>
    <div className="bg-white">
      <VideoPlayerModal 
        videoId={selectedVideoId} 
        onClose={() => setSelectedVideoId(null)} 
      />
      
      <section className="pt-24">
    <DiagonalSection
          title="Music Videos"
          description="Experience our professionally produced music videos..."
          category="Music Videos"
          videos={videos}  // Pass videos array
          onExplore={() => {
            setActiveCategory('Music Videos');
            scrollToVideoGrid();
          }}
        />

       <DiagonalSection
          title="Visualizers"
          description="Immerse yourself in our mesmerizing audio visualizers..."
          category="Visualizers"
          videos={videos}  // Pass videos array
          reverse
          onExplore={() => {
            setActiveCategory('Visualizers');
            scrollToVideoGrid();
          }}
        />

<DiagonalSection
          title="Live Sessions"
          description="Relive the energy of our live performances..."
          category="Live Sessions"
          videos={videos}  // Pass videos array
          onExplore={() => {
            setActiveCategory('Live Sessions');
            scrollToVideoGrid();
          }}
        />
      </section>

      <div className="py-16 bg-purple-900 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToVideoGrid}
          className="px-10 py-4 bg-white text-purple-900 md:text-2xl rounded-full roboto-condensed flex items-center gap-3 mx-auto"
        >
          Browse All Videos <FontAwesomeIcon icon={faArrowRight} />
        </motion.button>
      </div>

      <div ref={videoGridRef} className="pt-16 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center max-md:text-sm  work-sans gap-4 mb-12">
            {(['All', 'Music Videos', 'Visualizers', 'Live Sessions'] as const).map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 rounded-full md:text-sm work-sans max-md:text-purple-900 cursor-pointer  transition-colors ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-purple-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {paginatedVideos.map((video) => (
              <VideoCard
                key={video.id}
                content={video}
                onSelect={setSelectedVideoId}
              />
            ))}
          </motion.div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <hr className="h-px w-full bg-purple-900 border-0 mt-4" />
      <AudioMackComponent />
      <DownloadSection />
      <NewsletterForm />
    </div>
    </>
  );
};

