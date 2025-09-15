import {
  faSpotify,
  faYoutube,
  faApple,
  faDeezer,
} from '@fortawesome/free-brands-svg-icons';
export const streamingPlatforms = [
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/artist/53266602',
    icon: 'https://img.icons8.com/color/48/000000/deezer.png',
    color: 'bg-[#FEAA2D]',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@ClaudyGODMinistries',
    icon: 'https://img.icons8.com/color/48/000000/youtube-play.png',
    color: 'bg-[#FF0000]',
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/albums/B0DSM7QGLF',
    icon: 'https://img.icons8.com/color/48/000000/amazon-music.png',
    color: 'bg-[#00A8E1]',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/album/2MY5xlrYfuvKXaYfdB5v2A',
    icon: 'https://img.icons8.com/color/48/000000/spotify.png',
    color: 'bg-[#1DB954]',
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/ng/artist/claudygod/1440081695',
    icon: 'https://img.icons8.com/ios-filled/50/ffffff/apple-music.png',
    color: 'bg-gradient-to-r from-[#FA2C56] to-[#8A2BE2]',
  },
];
export const streamingPlatform = [
  { name: 'Spotify', icon: faSpotify, color: 'text-green-500', link: '#' },
  {
    name: 'YouTube Music',
    icon: faYoutube,
    color: 'text-red-500',
    link: '#',
  },
  { name: 'Apple Music', icon: faApple, color: 'text-black', link: '#' },
  { name: 'Deezer', icon: faDeezer, color: 'text-pink-500', link: '#' },
];
