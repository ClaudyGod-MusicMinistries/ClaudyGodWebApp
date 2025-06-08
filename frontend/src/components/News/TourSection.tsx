import { useState } from 'react';
import { motion } from 'framer-motion';
import { newsBanner } from '../../assets/';
import { TourDetailsModal } from '../News/TourDetailsModal'

export const TourSection = ({ 
  onCitySelect 
}: { 
  onCitySelect: (city: string) => void 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={newsBanner}
            alt="Nigeria Tour"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl roboto-condensed text-white mb-6">
            Min. ClaudyGod Visits Nigeria
          </h2>
          <p className="md:text-base work-sans text-purple-200 mb-8">
            Exciting News! ClaudyGod is coming to Nigeria for an inspiring music tour, evangelism, and outreach. 
            Stay tuned for upcoming dates, our curated list of gospel concerts, worship nights, and join us for a transformative experience!
          </p>
          
          <p className="work-sans text-white mb-4">
            Select a city to see event details:
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
            {['Lagos', 'Aba', 'Owerri', 'Portharcourt', 'Abuja'].map((city) => (
              <motion.button
                key={city}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
                onClick={() => onCitySelect(city)}
              >
                {city}
              </motion.button>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors focus:outline-none"
          >
            Read more about the tour &rarr;
          </button>
        </motion.div>
      </div>

      <TourDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};