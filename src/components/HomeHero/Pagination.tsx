import { motion } from 'framer-motion';

export const PaginationDots = ({
  currentSlide,
  totalSlides,
  goToSlide,
  className = '',
}: {
  currentSlide: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  className?: string;
}) => (
  <div
    className={`absolute bottom-4 md:bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 md:gap-2 ${className}`}
  >
    {Array.from({ length: totalSlides }).map((_, i) => (
      <motion.div
        key={i}
        onClick={() => goToSlide(i)}
        className="relative cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-1 rounded-full"
          animate={{
            width: i === currentSlide ? '1.5rem' : '0.75rem',
            backgroundColor:
              i === currentSlide ? '#fff' : 'rgba(255,255,255,0.3)',
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      </motion.div>
    ))}
  </div>
);
