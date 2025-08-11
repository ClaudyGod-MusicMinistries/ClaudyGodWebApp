import { motion } from 'framer-motion';
import { Cover } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCompactDisc, faMusic } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { 
  SemiBoldText,
  BoldText,
  LightText,
  ExtraBoldText,
  ExtraLightText 
} from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../ui/fonts/buttons/CustomButton';

const LatestRelease: React.FC = () => {
  const { colorScheme } = useTheme();

  return (
    <section className="relative h-auto md:h-[80vh] flex items-center justify-center overflow-hidden py-16 md:py-0">
      {/* Enhanced Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          poster="/BG3.jpg"
        >
          <source src="/mainBanner.mp4" type="video/mp4; codecs=avc1" />
          <source src="/testVideo.webm" type="video/webm; codecs=vp9" />
        </video>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 to-purple-900/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-red-500" />
      </div>

      {/* Floating Particles - Only on desktop */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${colorScheme.accent} 0%, transparent 70%)`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-4">
        <motion.div 
          className="relative bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 border-b-white/30 border-r-white/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            borderRadius: colorScheme.borderRadius.xlarge,
            borderColor: colorScheme.gray[100]
          }}
        >
          {/* Glow Effect - Only on desktop */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-soft-light filter blur-[100px] opacity-40 hidden md:block" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-500 rounded-full mix-blend-soft-light filter blur-[100px] opacity-30 hidden md:block" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            {/* Album Art Column */}
            <motion.div
              className="w-full md:w-2/5 p-4 md:p-8 lg:p-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-4"
                  style={{
                    borderColor: colorScheme.gray[200],
                    borderRadius: colorScheme.borderRadius.large
                  }}
                >
                  <img
                    src={Cover}
                    alt="Album Cover"
                    className="w-full max-w-xs mx-auto md:max-w-none object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                {/* Reflection Effect - Desktop Only */}
                <div className="mt-6 opacity-60 hidden md:block">
                  <div 
                    className="relative rounded-2xl overflow-hidden shadow-2xl border-4 transform scale-y-[-1]"
                    style={{
                      borderColor: colorScheme.gray[200],
                      borderRadius: colorScheme.borderRadius.large
                    }}
                  >
                    <img
                      src={Cover}
                      alt="Album Reflection"
                      className="w-full object-cover opacity-30 blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              className="w-full md:w-3/5 flex flex-col justify-center p-6 md:p-8 lg:p-10 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div 
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 md:mb-6"
                  style={{
                    backgroundColor: colorScheme.error + '30',
                    borderRadius: colorScheme.borderRadius.full
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faCompactDisc} 
                    style={{ color: colorScheme.gray[200] }}
                    fontSize="30px"
                  />
                  <LightText 
                    style={{ color: colorScheme.gray[300] }}
                    fontSize="20px"
                    // className="tracking-widest"
                  >
                    LATEST RELEASE
                  </LightText>
                </div>
                
                <ExtraBoldText 
                  style={{ color: colorScheme.accent }}
                  fontSize="2.5rem"
                  // className="mb-3 md:mb-4 leading-tight"
                >
                  YOU ARE OUR EVERYTHING
                </ExtraBoldText>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon 
                      icon={faMusic} 
                      style={{ color: colorScheme.accent }} 
                    />
                    <SemiBoldText 
                      style={{ color: colorScheme.accent }}
                      fontSize="20px"
                    >
                      CLAUDYGOD
                    </SemiBoldText>
                  </div>
                  
                  <div 
                    className="w-px h-6 hidden md:block"
                    style={{ backgroundColor: colorScheme.gray[300] }}
                  ></div>
                  
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: colorScheme.success }}
                    ></div>
                    <LightText 
                      style={{ color: colorScheme.gray[100]}}
                      fontSize="15px"
                    >
                      Now Streaming
                    </LightText>
                  </div>
                </div>
                
                <LightText 
                  style={{ color: colorScheme.gray[300] }}
                  fontSize="14px"
                  className="max-w-xl mb-6 md:mb-8 leading-relaxed"
                >
                  Experience the divine harmony of ClaudyGod's latest worship release — 
                  a soul-stirring single that captures the essence of true devotion.
                </LightText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-3 md:gap-4"
              >
                <Link to="/stream">
                  <CustomButton
                    variant="primary"
                    size="lg"
                    icon={<FontAwesomeIcon icon={faPlay} />}
                    className="shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BoldText className="tracking-wider">
                      STREAM NOW
                    </BoldText>
                  </CustomButton>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestRelease;