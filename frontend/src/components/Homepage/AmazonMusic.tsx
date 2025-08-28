/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faAmazon, faAppStore, faDeezer, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { NotAvailableModal } from '../util/modals/Notavailable';
import { BoldText, ExtraBoldText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

export const AudioMackComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const { colorScheme } = useTheme();

  const platforms = [
    { name: "Spotify", icon: faSpotify, color: "#1DB954" },
    { name: "Apple Music", icon: faAppStore, color: "#FA2C56" },
    { name: "YouTube Music", icon: faYoutube, color: "#FF0000" },
    { name: "Deezer", icon: faDeezer, color: "#00C7F2" },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 relative">
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
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-primary rounded-full">
                <FontAwesomeIcon
                  icon={faAmazon}
                  className="text-black text-4xl sm:text-5xl md:text-6xl"
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
            <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 md:p-6">
                <ExtraBoldText
                  fontSize="20px"
                  style={{ color: colorScheme.primary }}
                  useThemeColor={false}
                >
                  <span style={{ color: colorScheme.button }}>Latest Release: You Are Our Everything</span>
                </ExtraBoldText>

                <p className="text-xs md:text-sm font-raleway-medium text-gray-600 mb-6">
                  Experience the divine harmony of ClaudyGod's latest worship release — a soul-stirring single that captures the essence of true devotion.
                </p>

                <CustomButton
                  href="https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="mr-2 text-sm md:text-base"
                  />
                  <span className="text-sm md:text-base lg:text-lg">
                    Stream Now on Amazon Music
                  </span>
                </CustomButton>
              </div>
            </div>

            {/* Platform Buttons */}
            <div className=" md:mt-4 pt-2 border-t border-gray-100">
              <h3 className="text-base md:text-lg font-roboto-condensed text-center text-gray-700 mb-4 md:mb-6">
                Also available on other platforms
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                {platforms.map((platform, idx) => (
                  // <CustomButton
                  //   key={`platform-${idx}`}
                  //   variant="outline"
                  //   size="sm"
                  //   fullWidth
                  //   className="flex items-center justify-center p-2 md:p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  //   onClick={handleOpenModal}
                  // >
                  //   <FontAwesomeIcon
                  //     icon={platform.icon}
                  //     color={platform.color}
                  //     className="text-base md:text-lg"
                  //   />
                  //   <span className="ml-2 text-xs sm:text-sm md:text-base font-work-sans text-gray-700 truncate">
                  //     {platform.name}
                  //   </span>
                  // </CustomButton>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <NotAvailableModal isOpen={modalOpen} onClose={handleCloseModal} />
    </section>
  );
};
