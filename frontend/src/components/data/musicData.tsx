import { 
  faSpotify, 
  faApple, 
  faYoutube, 
  faDeezer, 
  faAmazon,
} from '@fortawesome/free-brands-svg-icons';
import { Cover } from '../../assets';
import { MusicPlatform, Album } from '../types/types'; // Import types

export const securedMusicPlatforms: MusicPlatform[] = [
  { 
    name: 'Spotify', 
    url: 'https://open.spotify.com/album/2MY5xlrYfuvKXaYfdB5v2A?referral=labelaffiliate&utm_source=1101lBmnzTP8&utm_medium=Indie_CDBaby&utm_campaign=labelaffiliate', 
    icon: faSpotify,
    bgColor: 'bg-[#1DB954]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'Apple Music', 
    url: 'https://music.apple.com/ng/album/very-glorious/1789665669', 
    icon: faApple,
    bgColor: 'bg-[#000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'YouTube Music', 
    url: 'https://youtube.com/@claudygodministries?si=6Ne99tTC48Ihv44s', 
    icon: faYoutube,
    bgColor: 'bg-[#FF0000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'Deezer', 
    url: 'https://www.deezer.com/us/album/695949191', 
    icon: faDeezer,
    bgColor: 'bg-[#FEAA2D]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true
  },
  { 
    name: 'Amazon Music', 
    url: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20', 
    icon: faAmazon,
    bgColor: 'bg-[#FF9900]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true
  }
];

export const albums: Album[] = [
  {
    id: 1,
    title: 'You Are Our Everything',
    year: '2025',
    image: Cover,
    tracks: [
      { id: 1, title: 'Amazing Grace', duration: '3:45' },
      { id: 2, title: 'Heavenly Joy', duration: '4:20' },
      { id: 3, title: 'Soul Revival', duration: '5:15' },
      { id: 4, title: 'Worship Medley', duration: '3:30' }
    ]
  },
];