
import { motion } from 'framer-motion';
import { AudioMackComponent } from '../components/audioMack';

import { Back3} from '../assets/'; // Make sure to import your Audiomack logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faExternalLinkAlt 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faSpotify, 
  faApple, 
  faYoutube, 
  faDeezer, 
  faAmazon,
} from '@fortawesome/free-brands-svg-icons';
import { NewsletterForm } from '../components/Newsletter';

// Updated music platforms
const musicPlatforms = [
    { 
      name: 'Spotify', 
      url: '#', 
      icon: faSpotify,
      bgColor: 'bg-[#1DB954]',
      textColor: 'text-white'
    },
    { 
      name: 'Apple Music', 
      url: '#', 
      icon: faApple,
      bgColor: 'bg-[#000]',
      textColor: 'text-white'
    },
    { 
      name: 'YouTube Music', 
      url: '#', 
      icon: faYoutube,
      bgColor: 'bg-[#FF0000]',
      textColor: 'text-white'
    },
    { 
      name: 'Deezer', 
      url: '#', 
      icon: faDeezer,
      bgColor: 'bg-[#FEAA2D]',
      textColor: 'text-black'
    },
    { 
      name: 'Amazon Music', 
      url: '#', 
      icon: faAmazon,
      bgColor: 'bg-[#FF9900]',
      textColor: 'text-black'
    }
  ];


const albums = [
  {
    id: 1,
    title: 'Album Title 1',
    year: '2023',
    image: Back3,
    tracks: [
      { id: 1, title: 'Amazing Grace', duration: '3:45' },
      { id: 2, title: 'Heavenly Joy', duration: '4:20' },
      { id: 3, title: 'Soul Revival', duration: '5:15' },
      { id: 4, title: 'Worship Medley', duration: '3:30' }
    ]
  }
];

export const MusicData: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      {/* <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <HeroSection 
          title="ClaudyGod Music & Ministry / Music"
          backgroundImage={Back3}
          className="relative z-0"
        />
      </div> */}

      {/* Music Intro Section */}
      <section className="pt-32 pb-20 bg-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl roboto-condensed mb-6">Music</h1>
            <div className="w-20 h-1 bg-white mb-8"></div>
            <p className="text-xl max-w-2xl raleway-medium text-20">Experience the inspirational sound of ClaudyGod's gospel music – with a unique blend of American Gospel and Afro-gospel.</p>
          </motion.div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="roboto-condensed text-40">Available On All Platforms</h2>
            <p className="text-gray-600 mt-2 raleway-medium md:text-2xl max-md:text-xm">Stream ClaudyGod's music everywhere, Anytime, Anyday, Anywhere.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
  {musicPlatforms.map((platform, index) => (
    <motion.a
      key={index}
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow ${platform.bgColor} ${platform.textColor}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <FontAwesomeIcon 
        icon={platform.icon} 
        className="mr-2 text-lg"
      />
      <span>{platform.name}</span>
    </motion.a>
  ))}
</div>
        </div>
      </section>

      {/* Latest Release */}
      <section className="py-16">
        <div className="container mx-auto px-4">
   
          <h2 className=" bg-purple-900 p-10 text-white max-md:text-2xl md:text-5xl roboto-condensed mb-12 max-md:text-center">Latest Release: You Are Our Everything</h2>
          <div className="space-y-10">
            {albums.map((album) => (
              <motion.div
                key={album.id}
                className="grid md:grid-cols-3 gap-8 items-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="md:col-span-1">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img 
                      src={album.image} 
                      alt={album.title} 
                      className="w-full h-auto rounded object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-2 robotoMedium">{album.title}</h3>
                  <p className="text-gray-600 mb-6 slider-font">Released: {album.year}</p>
                  
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                      <span className="slider-font">Tracks</span>
                      <button className="text-purple-800 hover:text-purple-900 slider-font flex items-center gap-1">
                        <FontAwesomeIcon icon={faPlay} className="text-sm" />
                        <span>Play All</span>
                      </button>
                    </div>
                    
                    <div className="divide-y">
                      {album.tracks.map((track) => (
                        <div key={track.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                          <div className="flex items-center">
                            <button className="mr-3 text-purple-800 hover:text-purple-900">
                              <FontAwesomeIcon icon={faPlay} className="text-sm" />
                            </button>
                            <span>{track.title}</span>
                          </div>
                          <span className="text-gray-500">{track.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    {musicPlatforms.slice(0, 3).map((platform, i) => (
                      <a 
                        key={i}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm px-3 py-1 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
                      >
                        <span>Listen on {platform.name}</span>
                        <FontAwesomeIcon 
                          icon={faExternalLinkAlt} 
                          className="ml-1 text-xs"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiomack Section */}
      <AudioMackComponent />

      {/* Newsletter Section */}
      <NewsletterForm />
    </div>
  );
};