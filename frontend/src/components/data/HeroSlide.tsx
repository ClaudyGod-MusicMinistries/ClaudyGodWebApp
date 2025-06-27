import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  faMusic, 
  faVideo, 
  faNewspaper,
  faPodcast
} from '@fortawesome/free-solid-svg-icons';

import { DesktopBg, Back3 , Resize4, Main} from '../../assets';
import { bgVideo } from '../../assets';


export interface HeroSlide {
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
    streamingPlatforms?: { name: string; icon: IconDefinition; url: string }[];
    listenText?: string;
  };
}

export interface TextVariantsProps {
  children: ReactNode;
  className?: string;
}

export interface SlideContentProps {
  slide: HeroSlide;
  isMuted: boolean;
  toggleMute: () => void;
  navigate: ReturnType<typeof useNavigate>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

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
    transition: { duration: 1.5, ease: 'easeInOut' }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 2.5, ease: 'easeInOut' }
  })
};

export const modalVariants = {
  hidden: { opacity: 0, scale:1.5 },
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

export const heroSlides: HeroSlide[] = [
  { 
    id: 1, 
    imageUrlMobile: Main, 
    imageUrlDesktop: DesktopBg, 
    type: 'quote', 
    content: { 
      quote: "Enter Into His Gates With Thanksgiving And Into His Courts With Praise; Be Thankful Unto Him, and Bless His Name.", 
      reference: "— Psalm 100:4" 
    }
  },
  { 
    id: 2, 
    imageUrl: Resize4, 
    type: 'cta', 
    content: {}
  },
  { 
    id: 3, 
    imageUrl: Back3, 
    type: 'music', 
    content: { 
      listenText: "Experience the Divine Melody",
      streamingPlatforms: [
        { name: 'Spotify', icon: faMusic, url: 'https://open.spotify.com/album/2MY5xlrYfuvKXaYfdB5v2A?referral=labelaffiliate&utm_source=1101lBmnzTP8&utm_medium=Indie_CDBaby&utm_campaign=labelaffiliate' },
        { name: 'Apple Music', icon: faPodcast, url: 'https://music.apple.com/ng/album/very-glorious/1789665669' },
        { name: 'YouTube', icon: faVideo, url: 'https://youtube.com/@claudygodministries?si=6Ne99tTC48Ihv44s' },
        { name: 'Itunes', icon: faVideo, url: 'https://music.apple.com/ng/album/very-glorious/1789665669' },
        { name: 'Deezer', icon: faNewspaper, url: 'https://www.deezer.com/us/album/695949191' },
        { name: 'Pandora', icon: faNewspaper, url: 'https://found.ee/58RtlR' },
        { name: 'Amazon', icon: faNewspaper, url: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20' },
      ]
    }
  },
  { 
    id: 4, 
    videoUrl: bgVideo, 
    type: 'video', 
    content: { 
      quote: 'Praise the Lord Most High', 
      reference: '— Psalm 100:4' 
    }
  }
];