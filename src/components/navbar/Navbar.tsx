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

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isNavOpen) {
      // Add overflow hidden to body when menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      // Remove overflow hidden when menu is closed
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    // Cleanup function to remove styles when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isNavOpen]);

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
        {/* Desktop Header - KEEPING YOUR ORIGINAL DESIGN */}
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

          {/* Desktop Navigation - Center - YOUR ORIGINAL SPACING */}
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

          {/* Desktop Streaming Button - Right - YOUR ORIGINAL DESIGN */}
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
              className={`p-3 rounded-xl transition-all ${
                scrolled
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                  : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20'
              }`}
            >
              <FontAwesomeIcon
                icon={isNavOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu - FIXED BACKGROUND & PREVENT SCROLLING */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-500 ${
            isNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Solid Backdrop - No Fading */}
          <div
            className={`absolute inset-0 bg-black/80 transition-opacity duration-500 ${
              isNavOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={toggleNav}
          />

          {/* Solid Background Menu - Won't Fade */}
          <div
            className={`absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 to-purple-900 shadow-2xl transform transition-transform duration-500 ease-out ${
              isNavOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              background: 'linear-gradient(135deg, #1f2937 0%, #4c1d95 100%)', // Solid gradient
            }}
          >
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-700 to-purple-800 border-b border-purple-600/50">
              <Link
                to="/"
                onClick={closeNav}
                className="flex items-center gap-4"
              >
                <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full p-2 shadow-lg">
                  <img src={Log} alt="Logo" className="h-7 w-7" />
                </div>
                <div>
                  <BoldText style={{ color: 'white' }} className="text-lg">
                    ClaudyGod
                  </BoldText>
                  <LightText
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    className="text-sm"
                  >
                    Music & Ministry
                  </LightText>
                </div>
              </Link>

              <button
                onClick={toggleNav}
                className="p-3 text-white hover:bg-white/20 rounded-xl transition-all duration-300 shadow-lg"
              >
                <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
              </button>
            </div>

            <nav className="p-6 h-[calc(100vh-96px)] overflow-y-auto">
              <ul className="space-y-3">
                {navigationItems.map(link => (
                  <li key={link.to}>
                    <button
                      onClick={() => handleMobileNavigation(link.to)}
                      className={`flex items-center w-full p-4 rounded-xl transition-all duration-300 ${
                        location.pathname === link.to
                          ? 'bg-purple-600 text-white shadow-2xl border border-purple-400/50'
                          : 'bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center h-10 w-10 rounded-lg mr-4 ${
                          location.pathname === link.to
                            ? 'bg-white/20'
                            : 'bg-purple-500/20'
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={link.icon}
                          className={`text-lg ${
                            location.pathname === link.to
                              ? 'text-white'
                              : 'text-purple-300'
                          }`}
                        />
                      </div>
                      <LightText
                        className={`text-base font-medium ${
                          location.pathname === link.to
                            ? 'text-white'
                            : 'text-gray-200'
                        }`}
                      >
                        {link.name}
                      </LightText>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl border border-purple-400/30 shadow-2xl">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    closeNav();
                  }}
                  className="w-full px-6 py-4 rounded-xl bg-white text-purple-600 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FontAwesomeIcon icon={faHeadset} className="text-xl" />
                  <SemiBoldText className="text-base tracking-wide">
                    Listen Now
                  </SemiBoldText>
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
