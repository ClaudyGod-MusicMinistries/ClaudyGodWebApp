/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faApple, faYoutube, faDeezer } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../contexts/ThemeContext";
import { BoldText, LightText, RegularText } from "../ui/fonts/typography";

export const MusicSlide = ({
  setIsModalOpen,
}: {
  slide: any;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { colorScheme } = useTheme();

  const streamingPlatforms = [
    { name: "Spotify", icon: faSpotify, url: "#" },
    { name: "Apple Music", icon: faApple, url: "#" },
    { name: "YouTube Music", icon: faYoutube, url: "#" },
    { name: "Deezer", icon: faDeezer, url: "#" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-12 w-full px-4 sm:px-6 lg:px-20 xl:px-28">
      {/* Title */}
      <motion.div>
        <BoldText  
          style={{ color: colorScheme.heading }}
          fontSize="40px"
          className="text-left leading-tight drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]"
        >
          MUSIC
        </BoldText>
      </motion.div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6 mt-6">
        <motion.div
          style={{background:colorScheme.background}}
          className="w-10 sm:w-16 h-1  rounded-full"
        />

        <motion.div>
          <RegularText
            style={{ color: colorScheme.textSecondary }}
            className="leading-snug max-w-sm sm:max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-left"
          >
            Dive into spiritual worship through sacred melodies that uplift the
            soul and glorify His name
          </RegularText>
        </motion.div>

        <motion.div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="shadow-lg py-3 sm:py-4 text-base sm:text-lg w-full rounded-lg font-medium"
            style={{ 
              backgroundColor: colorScheme.primary,
              color: colorScheme.buttonText || '#fff'
            }}
          >
            Stream across platforms
          </button>
        </motion.div>
      </div>

      {/* Desktop / Tablet View */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-14 items-start text-left">
          {/* Header Text */}
          <motion.div className="space-y-6 max-w-5xl ml-0">
            <RegularText
              className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] italic"
              style={{ color: colorScheme.accent }}
              fontSize="25px"
            >
              Experience the Divine Melody
            </RegularText>
            <LightText
              className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] italic"
              style={{ color: colorScheme.textSecondary }}
              fontSize="30px"
            >
              Dive into spiritual worship through sacred melodies that uplift the
              soul and glorify His name
            </LightText>
          </motion.div>

          {/* Play Button Section */}
          <motion.div className="flex flex-col items-start gap-4 mt-4">
            <div
              className="w-10 md:w-14 lg:w-16 h-2 rounded-full"
              style={{ backgroundColor: colorScheme.heading }}
            ></div>

            <motion.div className="relative group">
              <div
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                  backgroundColor: `${colorScheme.primary}40`,
                  backdropFilter: "blur(12px)",
                }}
              >
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hover:scale-105 transition-transform bg-transparent border-none"
                  aria-label="Play latest album"
                >
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className="text-4xl md:text-5xl lg:text-6xl pl-1"
                    style={{ color: colorScheme.primary }}
                  />
                </button>
              </div>
            </motion.div>
            
            <h2
              className="tracking-widest drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] font-extrabold text-xl md:text-2xl lg:text-3xl"
              style={{ color: colorScheme.text }}
            >
              Play Latest Album
            </h2>
          </motion.div>

          {/* Streaming Platforms */}
          <motion.div className="space-y-8 mt-12 w-full max-w-6xl ml-0">
            <BoldText
              style={{ color: colorScheme.accent}}
              className="tracking-wide drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]"
            >
              STREAM EVERYWHERE
            </BoldText>

            {/* Improved Streaming Platforms Grid */}
            <div className="flex flex-wrap gap-4 lg:gap-6 justify-start">
              {streamingPlatforms.map((platform) => (
                <motion.div 
                  key={platform.name} 
                  whileHover={{ y: -8 }}
                  className="flex-none min-w-[180px] max-w-[240px] flex-grow"
                >
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 lg:px-6 py-3 lg:py-4 shadow-lg hover:shadow-xl flex items-center justify-start gap-3 rounded-lg transition-all"
                    style={{
                      backgroundColor: colorScheme.background || 'rgba(255, 255, 255, 0.1)',
                      color: colorScheme.text
                    }}
                  >
                    <FontAwesomeIcon
                      icon={platform.icon}
                      className="text-xl md:text-2xl lg:text-3xl flex-none"
                      style={{ color: colorScheme.primary }}
                    />
                    <span className="font-bold text-sm md:text-base lg:text-lg whitespace-nowrap">
                      {platform.name}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};