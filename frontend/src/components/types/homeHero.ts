
import { useNavigate } from 'react-router-dom';

// Interfaces
interface HeroSlide {
  id: number;
  imageUrl?: string;
  imageUrlMobile?: string; 
  imageUrlDesktop?: string; 
  videoUrl?: string;
  type: 'quote' | 'form' | 'streaming' | 'cta' | 'music' | 'video';
  content?: {
    quote?: string;
    reference?: string;
    formTitle?: string;
    streamingPlatforms?: { name: string; icon: any; url: string }[];
    listenText?: string;
  };
}

interface TextVariantsProps {
  children: React.ReactNode;
  className?: string;
}

interface SlideContentProps {
  slide: HeroSlide;
  isMuted: boolean;
  toggleMute: () => void;
  navigate: ReturnType<typeof useNavigate>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Animation Variants
export const textVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
      duration: 0.5
    }
  }
};

export const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeInOut'
    }
  }
};

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeInOut' }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.8, ease: 'easeInOut' }
  })
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring', 
      damping: 25, 
      stiffness: 300 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { 
      duration: 0.2 
    } 
  }
};
