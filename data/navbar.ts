import {
  FaHouse,
  FaUser,
  FaMusic,
  FaVideo,
  FaCalendar,
  FaBookOpen,
  FaHandsPraying,
  FaNewspaper,
  FaStore,
  FaEnvelope,
  FaHandHoldingDollar,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export interface NavItem {
  to: string;
  name: string;
  icon: IconType;
}

export const navigationItems: NavItem[] = [
  { to: '/', name: 'Home', icon: FaHouse },
  { to: '/about', name: 'About', icon: FaUser },
  { to: '/music', name: 'Music', icon: FaMusic },
  { to: '/videos', name: 'Videos', icon: FaVideo },
  { to: '/bookings', name: 'Bookings', icon: FaCalendar },
  { to: '/blog', name: 'Blog', icon: FaBookOpen },
  { to: '/ministry', name: 'Ministry', icon: FaHandsPraying },
  { to: '/news', name: 'News', icon: FaNewspaper },
  { to: '/store', name: 'Store', icon: FaStore },
  { to: '/contact', name: 'Contact', icon: FaEnvelope },
  { to: '/donate', name: 'Donate', icon: FaHandHoldingDollar },
];
