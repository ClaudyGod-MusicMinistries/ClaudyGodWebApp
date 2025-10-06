import {
  faSpotify,
  faYoutube,
  faApple,
  faDeezer,
  faAmazon,
  faSoundcloud,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

export interface StreamingPlatform {
  name: string;
  url: string;
  icon: any; // FontAwesome icon
  color: string;
}

export const streamingPlatforms: StreamingPlatform[] = [
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/artist/53266602',
    icon: faDeezer,
    color: 'bg-[#FEAA2D] hover:bg-[#e6951a]',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@ClaudyGODMinistries',
    icon: faYoutube,
    color: 'bg-[#FF0000] hover:bg-[#cc0000]',
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/albums/B0DSM7QGLF',
    icon: faAmazon,
    color: 'bg-[#00A8E1] hover:bg-[#0087b8]',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/album/2MY5xlrYfuvKXaYfdB5v2A',
    icon: faSpotify,
    color: 'bg-[#1DB954] hover:bg-[#1aa34a]',
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/ng/artist/claudygod/1440081695',
    icon: faApple,
    color:
      'bg-gradient-to-r from-[#FA2C56] to-[#8A2BE2] hover:from-[#e11c46] hover:to-[#7a1ac7]',
  },
  {
    name: 'SoundCloud',
    url: '#', // Add your SoundCloud URL
    icon: faSoundcloud,
    color: 'bg-[#FF7700] hover:bg-[#e66800]',
  },
  {
    name: 'TikTok',
    url: '#', // Add your TikTok URL
    icon: faTiktok,
    color: 'bg-black hover:bg-gray-800',
  },
  {
    name: 'More Platforms',
    url: '#', // Add your general music page URL
    icon: faMusic,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
];
