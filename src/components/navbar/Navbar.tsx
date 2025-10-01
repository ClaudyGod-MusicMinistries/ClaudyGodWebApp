import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Log } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StreamingModal from '../StreamingModel';
import { useNavContext } from '../../contexts/NavContext';
import { useTheme } from '../../contexts/ThemeContext';
import { faHeadset, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { navigationItems } from '../data/navbar';
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

  return (
    <>
      {/* Spacer div for TopBanner */}
      <div
        className={`fixed top-0 left-0 right-0 h-8 bg-purple-900 transition-all duration-500 z-40 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
        style={{ marginTop: scrolled ? '0' : '2rem' }}
      >
        {/* Desktop Header */}
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo - Left */}
          <Link
            to="/"
            onClick={closeNav}
            className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity -ml-6"
          >
            <div className="h-10 w-10 flex items-center justify-center bg-white/10 rounded-full p-1 ml-3">
              <img src={Log} alt="Logo" className="h-7 w-7 rounded-full" />
            </div>

            <div className="h-8 w-px bg-white/40 mx-3" />

            <div>
              <BoldText
                style={{ color: scrolled ? colorScheme.text : 'white' }}
                className="text-base leading-snug"
              >
                ClaudyGod
              </BoldText>
              <LightText
                style={{
                  color: scrolled
                    ? colorScheme.secondary
                    : 'rgba(255, 255, 255, 0.9)',
                }}
                className="text-[11px] leading-snug"
              >
                Music & Ministry
              </LightText>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-2">
              {navigationItems.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => location.pathname === link.to && scrollToTop()}
                  className={({ isActive }) =>
                    `flex items-center text-xs transition-colors duration-200 px-2 py-1.5 rounded-md ${
                      isActive
                        ? 'text-purple-300 font-medium bg-white/10'
                        : scrolled
                          ? 'text-gray-200 hover:text-white hover:bg-white/5'
                          : 'text-white hover:text-white/90 hover:bg-white/10'
                    }`
                  }
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="mr-1.5 text-[10px]"
                  />
                  <span className="text-xs">{link.name}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Desktop Streaming Button - Right */}
          <div className="hidden lg:flex items-center justify-end flex-shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center whitespace-nowrap ${
                scrolled
                  ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700'
                  : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
              }`}
            >
              <FontAwesomeIcon
                icon={faHeadset}
                className="mr-1.5 text-[10px]"
              />
              <LightText className="text-[5px] font-medium">
                Listen Now
              </LightText>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={toggleNav}
              className={`p-2 rounded-md transition-colors ${
                scrolled
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
              }`}
            >
              <FontAwesomeIcon
                icon={isNavOpen ? faTimes : faBars}
                className="h-5 w-5"
              />
            </button>
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

          <div className="relative w-80 h-full ml-auto bg-white shadow-xl">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-purple-700">
              <Link to="/" onClick={closeNav} className="flex items-center">
                <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full">
                  <img src={Log} alt="Logo" className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <BoldText style={{ color: 'white' }} className="text-lg">
                    ClaudyGod
                  </BoldText>
                  <LightText
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    className="text-xs"
                  >
                    Music & Ministry
                  </LightText>
                </div>
              </Link>

              <button
                onClick={toggleNav}
                className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
              <ul className="space-y-2">
                {navigationItems.map(link => (
                  <li key={link.to}>
                    <button
                      onClick={() => handleMobileNavigation(link.to)}
                      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                        location.pathname === link.to
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FontAwesomeIcon icon={link.icon} className="mr-3" />
                      <LightText className="text-base">{link.name}</LightText>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-purple-500 rounded-lg">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    closeNav();
                  }}
                  className="w-full px-4 py-3 rounded-full bg-white text-purple-600 text-sm font-medium flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <FontAwesomeIcon icon={faHeadset} className="mr-2" />
                  <SemiBoldText>Listen Now</SemiBoldText>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <StreamingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
