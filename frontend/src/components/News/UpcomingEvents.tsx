import { motion } from 'framer-motion';
import { newsBanner } from '../../assets/';

interface UpcomingEvent {
  date: string;
  title: string;
  location: string;
}

const events: UpcomingEvent[] = [
  {
    date: '22nd December 2024',
    title: 'ONE MILLION MAN WORSHIP',
    location: 'Yakubu Gowon Stadium, Elekahia, Port Harcourt',
  },
  {
    date: '31st December 2024',
    title: 'OPENS HEAVENS CALGARY 2024',
    location: 'BMO Centre: 338-13 A/ENUE SE, Calgary, Canada',
  },

];

export const UpcomingEvents = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-b from-[#0a061a] to-[#1a0a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" md:text-6xl max-md:text-2xl font-roboto-condensed
 lg:text-6xl text-red-900"
          >
            Upcoming Events
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-purple-500 mx-auto my-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-purple-900/30 p-6 rounded-lg"
            >
              <h3 className="text-xl text-purple-300 mb-2">{event.date}</h3>
              <h4 className="text-2xl text-white mb-3">{event.title}</h4>
              <p className="text-purple-200">{event.location}</p>
            </motion.div>
          ))}
        </div>

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
            <p className="text-lg md:text-xl work-sans text-purple-200 mb-8">
              Min. ClaudyGod will be sharing the love of God through music in 5 different
              states in Nigeria.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {['Lagos', 'Aba', 'Owerri', 'Portharcourt', 'Abuja'].map((city) => (
                <motion.button
                  key={city}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
                  onClick={() => {
                    /* will be wired up in News.tsx via props */
                  }}
                >
                  {city}
                </motion.button>
              ))}
            </div>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
              Read more about the tour &rarr;
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
