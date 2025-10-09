import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faHandsPraying,
  faMicrophoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  SemiBoldText,
  BoldText,
  LightText,
  ExtraBoldText,
  ExtraLightText,
} from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../ui/fonts/buttons/CustomButton';

export const Welcome = () => {
  const navigate = useNavigate();
  const { colorScheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-[60vh] md:min-h-[70vh] overflow-hidden"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
        {/* Left Column - Ministry Focus */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 20,
            duration: 0.8,
          }}
          className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-400"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-10 md:right-10 text-purple-200/10 text-6xl sm:text-7xl md:text-8xl">
            <FontAwesomeIcon icon={faHandsPraying} />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto w-full space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 15,
                duration: 0.7,
                delay: 0.2,
              }}
              className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full backdrop-blur-sm"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-300 rounded-full animate-pulse"></div>
              <LightText className="text-xs sm:text-sm tracking-wider">
                MINISTRY FOCUS
              </LightText>
            </motion.div>

            <div className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 15,
                  duration: 0.7,
                  delay: 0.4,
                }}
              >
                <SemiBoldText fontSize="24px sm:text-2xl md:text-3xl lg:text-[30px]">
                  Intimacy Through Sacred Praise
                </SemiBoldText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 15,
                  duration: 0.7,
                  delay: 0.6,
                }}
                className="relative pl-6 md:pl-8 py-4 md:py-5 border-l-2 border-purple-500/30"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-700"></div>
                <div className="space-y-3 md:space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 15,
                      duration: 0.7,
                      delay: 0.8,
                    }}
                  >
                    <ExtraLightText
                      fontSize="16px sm:text-lg md:text-xl lg:text-2xl"
                      className="italic leading-relaxed"
                    >
                      "From the rising of the sun to its going down,
                      <br className="hidden sm:block" />
                      The Lord's name is to be praised."
                    </ExtraLightText>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 15,
                      duration: 0.7,
                      delay: 1.0,
                    }}
                  >
                    <SemiBoldText className="text-base sm:text-lg text-purple-200">
                      — Psalm 113:3
                    </SemiBoldText>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Artist Biography */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 20,
            duration: 0.8,
            delay: 0.2,
          }}
          style={{
            background: colorScheme.gray[200],
            borderRadius: colorScheme.borderRadius.large,
          }}
          className="relative p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-white"></div>
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 text-gray-100 text-6xl sm:text-7xl md:text-8xl">
            <FontAwesomeIcon icon={faMicrophoneAlt} />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto w-full space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 15,
                duration: 0.7,
                delay: 0.4,
              }}
              style={{ borderRadius: colorScheme.borderRadius.medium }}
              className="inline-flex items-center gap-2 sm:gap-3 bg-purple-300 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full backdrop-blur-sm"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></div>
              <LightText
                style={{ color: colorScheme.primary }}
                useThemeColor={false}
                className="text-xs sm:text-sm"
              >
                ARTIST BIOGRAPHY
              </LightText>
            </motion.div>

            <div className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 15,
                  duration: 0.7,
                  delay: 0.6,
                }}
              >
                <SemiBoldText
                  style={{
                    color: colorScheme.primary,
                    lineHeight: '1.4',
                  }}
                  useThemeColor={false}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[30px]"
                >
                  The Spiritual Journey of <br className="hidden md:block" />
                  <span style={{ color: colorScheme.accent }}>ClaudyGod</span>
                </SemiBoldText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 15,
                  duration: 0.7,
                  delay: 0.8,
                }}
              >
                <LightText
                  style={{
                    color: colorScheme.primary,
                    lineHeight: '1.6',
                  }}
                  useThemeColor={false}
                  className="text-sm sm:text-base md:text-[15px]"
                >
                  ClaudyGod is a California-based Christian & Gospel artist of
                  Nigerian and Sierra Leonean heritage. Her musical journey
                  began in childhood choirs in Nigeria, culminating in a divine
                  encounter in 2003 Nashville where she heard God affirm, "I
                  love your worship." This moment ignited her calling to create
                  music that bridges cultural traditions and contemporary
                  worship.
                </LightText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 15,
                  duration: 0.7,
                  delay: 1.0,
                }}
              >
                <CustomButton
                  onClick={() => navigate('/biography')}
                  variant="primary"
                  size="md sm:lg"
                  icon={<FontAwesomeIcon icon={faArrowRight} />}
                  iconPosition="right"
                  className="mt-3 md:mt-4 group shadow-lg hover:shadow-xl"
                >
                  <BoldText className="tracking-wide text-sm sm:text-base">
                    Read More
                  </BoldText>
                </CustomButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
