import { motion } from 'framer-motion';
import { Cover } from '../../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faSpotify, faApple, faDeezer, faSoundcloud, faTiktok } from '@fortawesome/free-brands-svg-icons';

export const NewsCards = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
      {/* New Singles Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2"
      >
        <div className="flex flex-col">
          <div className="w-full h-60 bg-gradient-to-br from-[#0a061a] to-[#1a0a2e] flex items-center justify-center p-6">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d94] to-[#6a11cb] opacity-20 rounded-xl" />
              <img src={Cover} alt="You Are Our Everything" className="w-full h-full object-cover rounded-xl" loading="lazy" />
            </div>
          </div>
          <div className="p-4 md:p-6">
            <h3 className="font-bold text-lg md:text-xl roboto-condensed mb-4 text-white text-center">
              New Singles out: You Are Our Everything
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {[
                { icon: faSpotify, name: 'Spotify', color: '#1DB954' },
                { icon: faApple, name: 'Apple Music', color: '#FF2D55' },
                { icon: faYoutube, name: 'YouTube', color: '#FF0000' },
                { icon: faDeezer, name: 'Deezer', color: '#FEAA2D' },
                { icon: faSoundcloud, name: 'SoundCloud', color: '#FF7700' },
                { icon: faTiktok, name: 'TikTok', color: '#000000' },
              ].map((platform, idx) => (
                <a key={idx} href="#" target="_blank" rel="noopener noreferrer" className="inline-block w-full">
                  <button
                    className="w-full py-2 text-xs md:text-sm font-semibold rounded-lg flex items-center justify-center transition-all hover:scale-[1.02] transform cursor-pointer"
                    style={{ backgroundColor: platform.color }}
                  >
                    <FontAwesomeIcon icon={platform.icon} className="mr-1 md:mr-2 text-white" />
                    <span className="text-white">{platform.name}</span>
                  </button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* New Albums Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2"
      >
        <div className="flex flex-col">
          <div className="p-6 bg-gradient-to-br from-[#0a061a] to-[#1a0a2e] flex justify-center">
            <FontAwesomeIcon icon={faRecordVinyl} className="text-4xl md:text-5xl text-[#ff4d94]" />
          </div>
          <div className="p-4 md:p-6">
            <h3 className="font-bold text-lg md:text-xl roboto-condensed mb-2 text-white">
              3 New Albums Out Now
            </h3>
            <ul className="space-y-2 text-gray-300 work-sans text-sm md:text-base">
              {['Very Glorious', 'King of Heaven', 'Lover of My Soul'].map((title, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                  {title}
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full py-2.5 font-semibold bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white raleway-medium rounded-lg hover:opacity-90 transition-all text-sm md:text-base">
              Listen on All Platforms
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tour & Concerts Card (Reduced to 3 items) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2"
      >
        <div className="p-4 md:p-6 bg-gradient-to-r from-[#6a11cb]/30 to-[#ff4d94]/30 border-b border-[#6a11cb]/30">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-2xl md:text-3xl text-[#5c4b61] mr-2 md:mr-3" />
            <h2 className="font-bold text-xl md:text-2xl roboto-condensed">2024 TOUR AND CONCERT</h2>
          </div>
        </div>
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {[
            { date: '22nd Dec 2024', title: 'ONE MILLION MAN WORSHIP', location: 'Port Harcourt, Nigeria' },
           
          ].map((event, i) => (
            <div key={i} className="border-b border-[#4e2a8e] pb-3 md:pb-4">
              <div className="text-[#ff4d94] text-base md:text-lg font-bold mb-1 md:mb-2">{event.date}</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{event.title}</h3>
              <p className="text-gray-300 text-sm md:text-base">{event.location}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
