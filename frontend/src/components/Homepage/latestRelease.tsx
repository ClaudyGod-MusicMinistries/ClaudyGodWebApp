
import { motion } from 'framer-motion';
import { Cover } from '../../assets';

const LatestRelease: React.FC = () => {
  return (
    <section className="relative h-auto md:h-[600px] flex items-center justify-center overflow-hidden py-8 md:py-0">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90 mix-blend-screen"
          poster="/BG3.jpg"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <source src="/mainBanner.mp4" type="video/mp4; codecs=avc1" />
          <source src="/testVideo.webm" type="video/webm; codecs=vp9" />
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-white">
            <p>Video unavailable</p>
          </div>
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-3xl px-4">
        <div className="relative bg-transparent rounded-lg shadow-md overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch">
            {/* Album Art Column */}
            <motion.div
              className="w-full md:w-2/5 h-48 md:h-64"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <img
                  src={Cover}
                  alt="Album Cover"
                  className="w-[300px]  m-auto h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              className="w-full md:w-3/5 flex flex-col justify-center mx-auto items-center p-4 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <p className="text-sm work-sans text-red-100 mb-1">Latest Release</p>
                <h2 className="text-xl md:text-2xl roboto-condensed text-white leading-tight">
                  YOU ARE OUR EVERYTHING
                </h2>
                <h3 className="text-base md:text-lg raleway-medium text-red-50 mt-1">
                  CLAUDYGOD
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full text-center mt-4"
              >
                <a
                  href="#"
                  className="inline-flex items-center bg-purple-900 text-white px-4 py-2 rounded-full gap-2 backdrop-blur-sm border border-white/10 text-sm"
                >
                  STREAM NOW
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestRelease;
