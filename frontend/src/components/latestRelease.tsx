import React from 'react';
import { motion } from 'framer-motion';
import { Cover } from '../assets/';

const LatestRelease: React.FC = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
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
      <div className="container-custom w-[750px] h-[400px] relative z-10">
        <div className="relative h-full backdrop-blur-sm bg-transparent rounded-lg shadow-md overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg" />
          
          <div className="relative z-10 p-2 h-full top-10 left-10">
            <div className="flex flex-row gap-2 h-full">
              {/* Album Art Column */}
              <motion.div 
                className="w-2/5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-lg ">
                  <img 
                    src={Cover}
                    alt="Album Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div 
  className="w-3/5 flex flex-col justify-center items-center mb-20"
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
    <p className="text-[20px] font-medium slider-font  text-red-100 mb-1">Latest Release</p>
    <h2 className="text-[30px]  roboto-condensed font-serif text-white leading-tight">
      YOU ARE OUR EVERYTHING
    </h2>
    <h3 className="text-[15px] font-medium text-light text-red-50 mt-1">CLAUDYGOD</h3>
  </motion.div>

  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="w-full text-center"
  >


    <a 
      href="#" 
      className="mt-2 mx-auto inline-flex items-center medium-font bg-purple-900 text-white px-2 py-1 rounded-full gap-1 backdrop-blur-sm border border-white/10"
      style={{ fontSize: '12px' }}
    >
      <span className='w-[150px] p-2 text-center '>STREAM NOW</span>
    
    </a>
  </motion.div>
</motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestRelease;