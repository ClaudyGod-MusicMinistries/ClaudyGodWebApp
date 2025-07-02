import { motion } from 'framer-motion';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MusicBan1 } from '../../assets';

export const AudioMackComponent = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="mb-6 p-5 bg-gray-100 rounded-full">
                <FontAwesomeIcon
                  icon={faAmazon}
                  className="text-yellow-500 text-5xl md:text-6xl"
                />
              </div>
              
              <div className="text-center">
                <h2 className="text-5xl md:text-5xl max-md:text-base font-roboto-condensed text-gray-800 mb-3">
                  ClaudyGod Music Now Available on Amazon Music
                </h2>
                <div className="h-1 w-24 bg-purple-600 mx-auto mb-4 rounded-full"></div>
                <p className="text-xl text-gray-600 font-work-sans">
                  Listen • Stream • Play
                </p>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 font-roboto-condensed
">Latest Release</h3>
                  <div className="flex items-center mb-6">
                    
                    <div className="ml-4">
                      <p className="font-work-sans text-gray-800">You Are Our Everything</p>
                      <p className="text-sm font-work-sans-light text-gray-600">12 tracks • 45 minutes</p>
                    </div>
                  </div>
                  
                  {/* <ul className="space-y-3">
                    {[
                      "1. Faithful Beginnings",
                      "2. Graceful Melodies",
                      "3. Divine Harmony",
                      "4. Sacred Journey"
                    ].map((track, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-xs text-gray-700">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{track}</span>
                      </li>
                    ))}
                  </ul> */}
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="space-y-6">
                  
                  
                  <motion.a
                    href="https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-sm"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 5px 15px rgba(245, 158, 11, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-3" />
                      <span className="text-lg font-roboto-condensed
">Stream Now on Amazon Music</span>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
            
            {/* Available Platforms */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-roboto-condensed
 text-center text-gray-700 mb-6">Also available on other platforms</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: "Spotify", color: "#1DB954" },
                  { name: "Apple Music", color: "#FA2C56" },
                  { name: "YouTube Music", color: "#FF0000" },
                  { name: "Deezer", color: "#00C7F2" },
                 
                ].map((platform, index) => (
                  <div 
                    key={index} 
                    className="flex items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div 
                      className="w-8 h-8 rounded-full mr-3" 
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="text-gray-700 font-work-sans
">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};