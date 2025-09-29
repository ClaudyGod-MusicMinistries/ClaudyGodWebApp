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

  const handleMobileNavigation = (to: string) => {
    if (location.pathname === to) {
      scrollToTop();
    } else {
      navigate(to);
    }
    closeNav();
  };

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect if navbar is inside hero
      if (isInsideHero) {
        setScrolled(window.scrollY > 100);
      } else {
        // Always show background if not in hero
        setScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInsideHero]);

  useEffect(() => {
    scrollToTop();
    closeNav();
  }, [location, closeNav]);

  // Determine navbar styles based on position and scroll state
  const getNavbarStyles = () => {
    if (!isInsideHero) {
      // Regular navbar (for other pages)
      return {
        background: colorScheme.background,
        textColor: colorScheme.text,
        buttonBg: colorScheme.primary,
        buttonText: colorScheme.buttonText,
      };
    }

    // Hero navbar
    if (scrolled) {
      // Scrolled state in hero
      return {
        background: `${colorScheme.background}95`,
        textColor: colorScheme.text,
        buttonBg: colorScheme.primary,
        buttonText: colorScheme.buttonText,
      };
    } else {
      // Top state in hero (transparent)
      return {
        background: 'transparent',
        textColor: 'white',
        buttonBg: 'rgba(255, 255, 255, 0.2)',
        buttonText: 'white',
      };
    }
  };

  const styles = getNavbarStyles();

  return (
    <header
      className={`sticky top-0 z-50 h-20 transition-all duration-300 ${
        scrolled && isInsideHero ? 'shadow-lg py-2 backdrop-blur-md' : 'py-4'
      }`}
      style={{
        backgroundColor: styles.background,
      }}
    >
      {/* Desktop Header */}
      <div className="container-custom grid grid-cols-3 items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeNav}
          className="flex items-center justify-start"
        >
          <div className="h-15 w-15 ml-5 flex items-center justify-center">
            <img src={Log} alt="Logo" className="h-12 w-12" />
          </div>
          <div className="ml-2">
            <BoldText
              variant="brand"
              style={{ color: styles.textColor }}
              className="text-lg"
            >
              ClaudyGod
            </BoldText>
            <LightText
              style={{
                color:
                  scrolled && isInsideHero
                    ? colorScheme.secondary
                    : 'rgba(255, 255, 255, 0.9)',
              }}
              fontSize="12px"
            >
              Music & Ministry
            </LightText>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center items-center space-x-4 xl:space-x-8">
          {[
            { to: '/', name: 'Home', icon: faHouse },
            { to: '/biography', name: 'About' },
            { to: '/music', name: 'Music' },
            { to: '/videos', name: 'Videos' },
            { to: '/bookings', name: 'Bookings' },
            { to: '/blogs', name: 'Blogs' },
            { to: '/ministry', name: 'Ministry' },
            { to: '/news', name: 'News' },
            { to: '/store', name: 'Store' },
            { to: '/contact', name: 'Contact' },
            { to: '/donate', name: 'Donate' },
          ].map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={() => {
                if (location.pathname === link.to) {
                  scrollToTop();
                }
              }}
              className={({ isActive }) =>
                `flex items-center text-xs transition-colors hover:opacity-80 ${
                  isActive
                    ? 'text-purple-400'
                    : scrolled && isInsideHero
                      ? 'text-gray-800'
                      : 'text-white'
                }`
              }
            >
              {link.icon && (
                <FontAwesomeIcon
                  icon={link.icon}
                  className={`${link.name === 'Home' ? 'mr-2' : 'mr-1'} text-sm`}
                />
              )}
              <LightText fontSize="13px">{link.name}</LightText>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center justify-end gap-4">
          <StreamingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <div className="lg:hidden flex justify-end flex-1">
            <button
              onClick={toggleNav}
              className={`p-3 hover:opacity-80 rounded-lg shadow-sm transition-colors absolute right-4 top-4 ${
                scrolled && isInsideHero
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/20 text-white backdrop-blur-sm'
              }`}
            >
              <FontAwesomeIcon
                icon={isNavOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-transform duration-300 ${
          isNavOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleNav}
        />

        <div className="relative w-3/4 h-full ml-auto transform transition-all bg-white">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <Link to="/" onClick={closeNav} className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center">
                <img src={Log} alt="Logo" className="h-10 w-10" />
              </div>
              <div className="ml-2">
                <BoldText
                  variant="brand"
                  style={{ color: colorScheme.text }}
                  className="text-lg"
                >
                  ClaudyGod
                </BoldText>
                <LightText style={{ color: colorScheme.text }} fontSize="12px">
                  Music & Ministry
                </LightText>
              </div>
            </Link>
            <button
              onClick={toggleNav}
              className="p-2 hover:opacity-80 rounded-full bg-purple-600 text-white"
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>

          <nav className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
            <ul className="space-y-4">
              {[
                { to: '/', name: 'Home', icon: faHouse },
                { to: '/biography', name: 'About', icon: faUser },
                { to: '/music', name: 'Music', icon: faMusic },
                { to: '/videos', name: 'Videos', icon: faVideo },
                { to: '/news', name: 'News', icon: faNewspaper },
                { to: '/blogs', name: 'Blogs', icon: faBlog },
                { to: '/bookings', name: 'Bookings', icon: faCalendar },
                { to: '/store', name: 'Store', icon: faStore },
                { to: '/ministry', name: 'Ministry', icon: faHandsPraying },
                { to: '/donate', name: 'Donate', icon: faHandHoldingDollar },
                { to: '/contact', name: 'Contact', icon: faEnvelope },
              ].map(link => (
                <li key={link.to}>
                  <button
                    onClick={() => handleMobileNavigation(link.to)}
                    className={`flex items-center w-full p-4 rounded-lg transition-colors hover:opacity-80 ${
                      location.pathname === link.to
                        ? 'bg-purple-600 text-white'
                        : 'bg-transparent text-gray-800'
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="mr-4 text-xl"
                      style={{
                        width: '24px',
                        height: '24px',
                      }}
                    />
                    <LightText fontSize="14px">{link.name}</LightText>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  closeNav();
                }}
                className="w-full px-4 py-3 rounded-full bg-purple-600 text-white text-base font-medium flex items-center justify-center transition-colors hover:opacity-80"
              >
                <FontAwesomeIcon
                  icon={faHeadset}
                  className="mr-3 text-xl"
                  style={{ width: '24px', height: '24px' }}
                />
                <SemiBoldText fontSize="14px">Listen Now</SemiBoldText>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
