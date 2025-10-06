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

  // Scroll to top on navigation
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

  // Disable body scroll when nav open
  useEffect(() => {
    document.body.style.overflow = isNavOpen ? 'hidden' : '';
    document.body.style.height = isNavOpen ? '100vh' : '';
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isNavOpen]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close nav on route change
  useEffect(() => {
    scrollToTop();
    closeNav();
  }, [location, closeNav]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-gray-900 shadow-lg py-2' : 'bg-transparent py-6'
        }`}
        style={{
          marginTop: scrolled ? '0' : '1.5rem',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo - Moved more to the left */}
          <Link
            to="/"
            onClick={closeNav}
            className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity -ml-2"
          >
            <div
              className={`flex items-center justify-center bg-white rounded-full p-1 transition-all duration-300 ${
                scrolled ? 'h-10 w-10' : 'h-12 w-12'
              }`}
            >
              <img
                src={Log}
                alt="Logo"
                className={`rounded-full transition-all duration-300 ${
                  scrolled ? 'h-7 w-7' : 'h-8 w-8'
                }`}
              />
            </div>

            <div
              className={`h-8 w-px bg-white/30 mx-3 transition-all duration-300 ${
                scrolled ? 'opacity-70' : 'opacity-100'
              }`}
            />

            <div>
              <BoldText
                className={`text-white transition-all duration-300 leading-snug ${
                  scrolled ? 'text-base' : 'text-lg'
                }`}
              >
                ClaudyGod
              </BoldText>
              <LightText
                className={`transition-all duration-300 leading-snug ${
                  scrolled
                    ? 'text-gray-300 text-[11px]'
                    : 'text-white/90 text-xs'
                }`}
              >
                Music & Ministry
              </LightText>
            </div>
          </Link>

          {/* Desktop Nav - More centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-12">
            <div className="flex items-center space-x-1">
              {navigationItems.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => location.pathname === link.to && scrollToTop()}
                  className={({ isActive }) =>
                    `flex items-center text-sm px-2 py-2 rounded-md transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-600 text-white font-semibold shadow-sm'
                        : scrolled
                          ? 'text-gray-200 hover:text-white hover:bg-purple-700/40'
                          : 'text-white hover:text-white hover:bg-white/20'
                    }`
                  }
                >
                  <FontAwesomeIcon icon={link.icon} className="mr-1 text-xs" />
                  {link.name}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Right Section - Moved more to the right */}
          <div className="hidden lg:flex items-center justify-end flex-shrink-0 -mr-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-4 py-2 rounded-full shadow-md transition-all duration-300 flex items-center ${
                scrolled
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/30'
              }`}
            >
              <FontAwesomeIcon icon={faHeadset} className="mr-2 text-xs" />
              <LightText className="text-sm font-medium">Listen Now</LightText>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={toggleNav}
              className={`p-3 rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'bg-purple-700 text-white hover:bg-purple-800'
                  : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/30'
              }`}
            >
              <FontAwesomeIcon
                icon={isNavOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu - ALWAYS SOLID BACKGROUND */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
            isNavOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/70 transition-opacity duration-500 ${
              isNavOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={toggleNav}
          />

          {/* Drawer - ALWAYS SOLID */}
          <div
            className={`absolute right-0 top-0 h-full w-80 bg-gray-900 shadow-2xl transform transition-transform duration-500 ease-out ${
              isNavOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <Link
                to="/"
                onClick={closeNav}
                className="flex items-center gap-3"
              >
                <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full p-2">
                  <img src={Log} alt="Logo" className="h-7 w-7" />
                </div>
                <div>
                  <BoldText className="text-white text-lg">ClaudyGod</BoldText>
                  <LightText className="text-gray-300 text-sm">
                    Music & Ministry
                  </LightText>
                </div>
              </Link>
              <button
                onClick={toggleNav}
                className="p-3 text-white hover:bg-white/10 rounded-lg"
              >
                <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
              </button>
            </div>

            <nav className="p-6">
              <ul className="space-y-2">
                {navigationItems.map(link => (
                  <li key={link.to}>
                    <button
                      onClick={() => handleNavigation(link.to)}
                      className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                        location.pathname === link.to
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-gray-300 hover:bg-purple-700/30 hover:text-white'
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="mr-3 text-sm"
                      />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    closeNav();
                  }}
                  className="w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-md"
                >
                  <FontAwesomeIcon icon={faHeadset} className="mr-2" />
                  Listen Now
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
