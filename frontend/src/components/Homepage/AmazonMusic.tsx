import { motion } from 'framer-motion';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AudioMackComponent = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Header */}
            <div className="flex flex-col items-center mb-6 md:mb-8">
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-100 rounded-full">
                <FontAwesomeIcon
                  icon={faAmazon}
                  className="text-yellow-500 text-4xl sm:text-5xl md:text-6xl"
                />
              </div>
              
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-roboto-condensed text-gray-800 mb-2 md:mb-3">
                  ClaudyGod Music Now Available on Amazon Music
                </h2>
                <div className="h-1 w-16 md:w-20 bg-purple-600 mx-auto mb-3 md:mb-4 rounded-full"></div>
                <p className="max-md:text-sm md:text-xl text-gray-600 font-work-sans">
                  Listen • Stream • Play
                </p>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 md:p-6">
                  <h3 className=" md:text-3xl max-md:text-2xl text-purple-800 mb-3 md:mb-4 font-roboto-condensed">
                    Latest Release
                  </h3>
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="ml-3 md:ml-4">
                      <p className="font-raleway-medium text-gray-800 text-xl md:text-lg mb-3">You Are Our Everything</p>
                      <p className="text-xs md:text-sm font-raleway-medium text-gray-600 mb-1">Experience the divine harmony of ClaudyGod’s latest worship release — 
                a soul-stirring single that captures the essence of true devotion.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="space-y-4 md:space-y-6">
                  <motion.a
                    href="https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-sm"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 5px 15px rgba(245, 158, 11, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2 md:mr-3 text-sm md:text-base" />
                      <span className="text-sm md:text-base lg:text-lg font-roboto-condensed">
                        Stream Now on Amazon Music
                      </span>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
            
            {/* Available Platforms - Responsive Section */}
            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-100">
              <h3 className="text-base md:text-lg font-roboto-condensed text-center text-gray-700 mb-4 md:mb-6">
                Also available on other platforms
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                {[
                  { name: "Spotify", color: "#1DB954" },
                  { name: "Apple Music", color: "#FA2C56" },
                  { name: "YouTube Music", color: "#FF0000" },
                  { name: "Deezer", color: "#00C7F2" },
                ].map((platform, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-center p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200"
                    whileHover={{ 
                      y: -3,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div 
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full mr-2 md:mr-3 flex-shrink-0" 
                      style={{ backgroundColor: platform.color }}
                    />
                    <span className="text-xs sm:text-sm md:text-base font-work-sans text-gray-700 truncate">
                      {platform.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};