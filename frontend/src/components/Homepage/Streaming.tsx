import React from 'react';
import { Cover } from '../../assets';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const platforms = [
  {
    name: 'Spotify',
    color: '#1DB954',
    link: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    description: 'Stream your favorite tracks on Spotify.'
  },
  {
    name: 'Apple Music',
    color: '#FA2C56',
    link: 'https://music.apple.com/ng/album/you-are-our-everything-single/1803827230',
    description: 'Enjoy premium sound and curated playlists on Apple Music.'
  },
  {
    name: 'YouTube Music',
    color: '#FF0000',
    link: 'https://www.youtube.com/watch?v=fK_tCBcnqGs',
    description: 'Watch and listen to the latest music videos on YouTube Music.'
  },
  {
    name: 'Deezer',
    color: '#00C7F2',
    link: 'https://www.deezer.com/us/album/695949191',
    description: 'Discover new sounds every day with Deezer.'
  }
];

const StreamingPlatforms: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 via-white to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <div className="w-full lg:w-1/2">
            <img
              src={Cover}
              alt="Album Cover"
              className="rounded-2xl shadow-2xl object-cover w-full h-auto"
            />
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">
              YOU ARE OUR EVERYTHING
            </h1>
            <p className="text-xl text-purple-600 mb-4 font-medium">CLAUDYGOD</p>
            <p className="text-gray-600">
             STREAM . PLAY . REPEAT
            </p>
          </div>
        </div>

        {/* Platform Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {platforms.map((p, idx) => (
            <motion.a
              key={idx}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 bg-white border border-gray-100 flex flex-col gap-4 hover:-translate-y-1"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg"
                  style={{ backgroundColor: p.color }}
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                  <p className="text-sm text-gray-500 leading-snug">
                    {p.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default StreamingPlatforms;
