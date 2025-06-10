import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
  className?: string; 
  children?: React.ReactNode;
}

export const Herosection: React.FC<HeroSectionProps> = ({ title, backgroundImage }) => {
  return (
    <section className="relative w-full bg-black h-[500px] overflow-hidden">
      <div className="h-full flex flex-col md:flex-row">
        {/* Text Column - Desktop Only */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex w-full md:w-1/2 text-white flex-col justify-center h-full py-8 lg:py-0"
        >
          <div className="max-w-2xl px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <div className="border-l-4 border-white pl-4">
              <p className="text-gray-300 t md:text-base work-sans leading-relaxed">
                Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel Songs through ClaudyGod's Inspirational Journey.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Image Column - Padding added to left/right on desktop */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 h-full flex items-center justify-center"
        >
          {/* Mobile: Full screen image */}
          <div className="block md:hidden w-full h-full">
            <img
              src={backgroundImage}
              alt="ClaudyGod"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          
          {/* Desktop: Full-height image with side padding */}
          <div className="hidden md:flex items-center justify-center w-full h-full px-8"> 
            {/* 👆 THIS LINE ADDS PADDING TO LEFT/RIGHT - px-8 */}
            <div className="relative w-full h-full max-w-[500px]">
              <img
                src={backgroundImage}
                alt="ClaudyGod"
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Mobile Title Overlay */}
      <div className="absolute inset-0 flex items-end pb-8 md:hidden px-4 z-10">
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>
      </div>
    </section>
  );
};