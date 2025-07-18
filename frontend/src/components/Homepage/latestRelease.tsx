import { motion } from 'framer-motion';
import { Cover } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCompactDisc, faMusic } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const LatestRelease: React.FC = () => {
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
              background: 'radial-gradient(circle, rgba(220, 38, 38, 0.6) 0%, transparent 70%)',
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <img
                    src={Cover}
                    alt="Album Cover"
                    className="w-full max-w-xs mx-auto md:max-w-none object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                {/* Reflection Effect - Desktop Only */}
                <div className="mt-6 opacity-60 hidden md:block">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform scale-y-[-1]">
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
                <div className="inline-flex items-center gap-2 bg-red-900/30 px-4 py-1.5 rounded-full mb-4 md:mb-6">
                  <FontAwesomeIcon icon={faCompactDisc} className="text-red-300 text-lg" />
                  <p className="text-sm work-sans text-red-300 tracking-widest">
                    LATEST RELEASE
                  </p>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold roboto-condensed text-white leading-tight mb-3 md:mb-4">
                  YOU ARE OUR EVERYTHING
                </h2>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMusic} className="text-purple-400" />
                    <h3 className="text-xl md:text-2xl raleway-medium text-purple-200">
                      CLAUDYGOD
                    </h3>
                  </div>
                  
                  <div className="w-px h-6 bg-white/30 hidden md:block"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm work-sans text-green-300">Now Streaming</p>
                  </div>
                </div>
                
                <p className="text-gray-300 max-w-xl mb-6 md:mb-8 font-work-sans leading-relaxed text-sm md:text-base">
                Experience the divine harmony of ClaudyGod’s latest worship release — 
                a soul-stirring single that captures the essence of true devotion.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-3 md:gap-4"
              >
                <Link to="/stream">
  <motion.div
    className="inline-flex items-center bg-gradient-to-r from-purple-700 to-red-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl gap-2 font-medium hover:from-purple-800 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <FontAwesomeIcon icon={faPlay} className="text-lg md:text-xl" />
    <span className="text-sm md:text-base tracking-wider">STREAM NOW</span>
  </motion.div>
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