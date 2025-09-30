import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Log } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StreamingModal from '../StreamingModel';
import { useNavContext } from '../../contexts/NavContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  faUser,
  faMusic,
  faVideo,
  faNewspaper,
  faBlog,
  faCalendar,
  faStore,
  faHandsPraying,
  faHandHoldingDollar,
  faEnvelope,
  faHouse,
  faHeadset,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { BoldText, LightText, SemiBoldText } from '../ui/fonts/typography';

interface NavbarProps {
  isInsideHero?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isInsideHero = false }) => {
  const { isNavOpen, toggleNav, closeNav } = useNavContext();
  const { colorScheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (to: string) => {
    if (location.pathname === to) {
      scrollToTop();
    } else {
      navigate(to);
    }
    closeNav();
  };

  const handleMobileNavigation = (to: string) => {
    handleNavigation(to);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToTop();
    closeNav();
  }, [location, closeNav]);

  // Define navigation items with proper icons
  const navigationItems = [
    { to: '/', name: 'Home', icon: faHouse },
    { to: '/biography', name: 'About', icon: faUser },
    { to: '/music', name: 'Music', icon: faMusic },
    { to: '/videos', name: 'Videos', icon: faVideo },
    { to: '/bookings', name: 'Bookings', icon: faCalendar },
    { to: '/blogs', name: 'Blogs', icon: faBlog },
    { to: '/ministry', name: 'Ministry', icon: faHandsPraying },
    { to: '/news', name: 'News', icon: faNewspaper },
    { to: '/store', name: 'Store', icon: faStore },
    { to: '/contact', name: 'Contact', icon: faEnvelope },
    { to: '/donate', name: 'Donate', icon: faHandHoldingDollar },
  ];

  return (
    <>
      {/* Spacer div that matches TopBanner height - only shows when navbar is scrolled */}
      <div
        className={`fixed top-0 left-0 right-0 h-8 bg-purple-900 transition-all duration-500 z-40 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl py-2 transform translate-y-0'
            : 'bg-transparent backdrop-blur-0 shadow-none py-0 transform translate-y-0'
        }`}
        style={{
          // Smooth background transition using theme colors when scrolled
          backgroundColor: scrolled
            ? `${colorScheme.background}95`
            : 'transparent',
          // Move navbar down when not scrolled to account for TopBanner
          marginTop: scrolled ? '0' : '2rem',
        }}
      >
        {/* Desktop Header */}
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          {/* Logo - Left */}
          <Link
            to="/"
            onClick={closeNav}
            className="flex items-center justify-start flex-shrink-0 hover:opacity-80 transition-all duration-300 hover:scale-105"
          >
            <div className="h-9 w-9 flex items-center justify-center transition-transform duration-300">
              <img
                src={Log}
                alt="Logo"
                className="h-7 w-7 transition-all duration-300"
              />
            </div>
            <div className="ml-2 transition-all duration-300">
              <BoldText
                variant="brand"
                style={{ color: scrolled ? colorScheme.text : 'white' }}
                className="text-sm transition-colors duration-300"
              >
                ClaudyGod
              </BoldText>
              <LightText
                style={{
                  color: scrolled
                    ? colorScheme.secondary
                    : 'rgba(255, 255, 255, 0.9)',
                }}
                fontSize="9px"
                className="transition-colors duration-300"
              >
                Music & Ministry
              </LightText>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center justify-center space-x-1 xl:space-x-2 transition-all duration-500">
              {navigationItems.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => {
                    if (location.pathname === link.to) {
                      scrollToTop();
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center text-[10px] xl:text-xs transition-all duration-300 hover:opacity-80 px-3 py-2 rounded-lg whitespace-nowrap transform hover:scale-105 ${
                      isActive
                        ? 'text-purple-400 font-semibold bg-white/10 shadow-lg'
                        : scrolled
                          ? 'text-gray-200 hover:text-white hover:bg-white/5'
                          : 'text-white hover:text-white/90 hover:bg-white/10'
                    }`
                  }
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="mr-1 text-[10px] xl:text-xs transition-all duration-300"
                    style={{
                      color: scrolled
                        ? location.pathname === link.to
                          ? '#a78bfa'
                          : '#e5e7eb'
                        : 'white',
                    }}
                  />
                  <span className="font-medium transition-colors duration-300">
                    {link.name}
                  </span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Desktop Streaming Button - Right */}
          <div className="hidden lg:flex items-center justify-end flex-shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-4 py-2 rounded-full text-xs transition-all duration-500 hover:opacity-90 flex items-center hover:scale-105 whitespace-nowrap transform ${
                scrolled
                  ? 'bg-purple-600 text-white shadow-lg border border-purple-400'
                  : 'bg-white/20 text-white border border-white/30 backdrop-blur-sm'
              }`}
              style={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <FontAwesomeIcon
                icon={faHeadset}
                className="mr-2 transition-all duration-300"
              />
              <SemiBoldText
                fontSize="11px"
                className="transition-all duration-300"
              >
                Listen Now
              </SemiBoldText>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center justify-end gap-2">
            <StreamingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <div className="flex justify-end flex-1">
              <button
                onClick={toggleNav}
                className={`p-2 hover:opacity-80 rounded transition-all duration-300 ${
                  scrolled
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/20 text-white backdrop-blur-sm'
                } transform hover:scale-110`}
              >
                <FontAwesomeIcon
                  icon={isNavOpen ? faTimes : faBars}
                  className="h-4 w-4 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-500 ease-out ${
            isNavOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-2xl transition-all duration-500"
            onClick={toggleNav}
          />

          <div className="relative w-3/4 h-full ml-auto transform transition-all duration-500 ease-out bg-white shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
              <Link to="/" onClick={closeNav} className="flex items-center">
                <div className="h-8 w-8 flex items-center justify-center bg-white rounded-full p-1">
                  <img src={Log} alt="Logo" className="h-6 w-6" />
                </div>
                <div className="ml-2">
                  <BoldText
                    variant="brand"
                    style={{ color: 'white' }}
                    className="text-base"
                  >
                    ClaudyGod
                  </BoldText>
                  <LightText
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    fontSize="10px"
                  >
                    Music & Ministry
                  </LightText>
                </div>
              </Link>
              <button
                onClick={toggleNav}
                className="p-2 hover:opacity-80 rounded-full bg-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
              </button>
            </div>

            <nav className="p-4 h-[calc(100vh-64px)] overflow-y-auto bg-gradient-to-b from-white to-gray-50">
              <ul className="space-y-3">
                {navigationItems.map(link => (
                  <li key={link.to}>
                    <button
                      onClick={() => handleMobileNavigation(link.to)}
                      className={`flex items-center w-full p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        location.pathname === link.to
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                          : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="mr-4 text-lg transition-transform duration-300"
                        style={{
                          color:
                            location.pathname === link.to
                              ? 'white'
                              : colorScheme.primary,
                        }}
                      />
                      <LightText
                        fontSize="14px"
                        className="font-medium transition-colors duration-300"
                      >
                        {link.name}
                      </LightText>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    closeNav();
                  }}
                  className="w-full px-4 py-3 rounded-full bg-white text-purple-600 text-sm font-bold flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <FontAwesomeIcon icon={faHeadset} className="mr-3 text-lg" />
                  <SemiBoldText fontSize="14px">Listen Now</SemiBoldText>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
