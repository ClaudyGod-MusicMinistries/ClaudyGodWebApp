// src/components/news/LiveSession.tsx
import { motion } from 'framer-motion';
import { Cover } from '../../assets/';

export const LiveSession = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl h-full"
    >
      <h3 className="text-xl md:text-2xl roboto-condensed text-white mb-6 text-center">
        Upcoming Live Worship Session
      </h3>

      <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
        <img
          src={Cover}
          alt="Live Worship Session"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <p className="text-purple-200 mb-4 text-sm md:text-base">
        Join us for an intimate live worship session. Experience the presence of
        God through powerful worship and spontaneous moments.
      </p>

      <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
        <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-900/50 rounded-full text-xs md:text-sm text-purple-200">
          Spontaneous Worship
        </span>
        <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-900/50 rounded-full text-xs md:text-sm text-purple-200">
          Pray
        </span>
        <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-900/50 rounded-full text-xs md:text-sm text-purple-200">
          Teachings
        </span>
      </div>

      <div className="mt-6 md:mt-8 text-center">
        <button className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg shadow-lg hover:opacity-90 transition-all text-sm md:text-base">
          Stay Updated
        </button>
      </div>
    </motion.div>
  );
};