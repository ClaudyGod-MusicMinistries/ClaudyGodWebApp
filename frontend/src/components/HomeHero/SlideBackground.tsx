import { motion } from 'framer-motion';
import { HeroSlide, imageVariants } from '../types/homeHero';

const SlideBackground = ({
  slide,
  isMuted,
  videoRef
}: {
  slide: HeroSlide;
  isMuted: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}) => (
  <motion.div
    variants={imageVariants}
    initial="hidden"
    animate="visible"
    className="absolute inset-0 h-full w-full"
  >
    {slide.type === 'video' ? (
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="h-full w-full object-cover object-center brightness-60"
      >
        <source src={slide.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : ( 
      <div className="relative h-full w-full">
        {slide.imageUrlMobile && slide.imageUrlDesktop ? (
          <>
            <img
              src={slide.imageUrlMobile}
              alt="Background"
              className="md:hidden h-full w-full object-cover object-center saturate-[1.2]"
            />
            <img
              src={slide.imageUrlDesktop}
              alt="Background"
              className="hidden md:block h-full w-full object-cover object-center"
            />
          </>
        ) : (
          <img
            src={slide.imageUrl}
            alt="Background"
            className="h-full w-full object-cover object-center"
          />
        )}
        <div className={`absolute inset-0 ${
          slide.type === 'cta' || slide.type === 'music' 
            ? 'bg-gradient-to-t from-black/60 via-black/30 to-transparent'
            : 'bg-gradient-to-t from-black/100 via-black/50 to-black/10'
        }`} />
      </div>
    )}
  </motion.div>
);

export default SlideBackground;