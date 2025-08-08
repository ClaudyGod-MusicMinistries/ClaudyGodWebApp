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
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { BoldText, ExtraLightText, LightText, SemiBoldText } from '../ui/fonts/typography';

export const Navbar: React.FC = () => {
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
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToTop();
    closeNav();
  }, [location, closeNav]);

  return (
    <header 
      className={`sticky top-0 z-50 h-20 transition-all duration-300 ${
        scrolled ? 'shadow-md py-2' : 'py-4'
      }`}
      style={{
        backgroundColor: scrolled ? colorScheme.background : colorScheme.background,
      }}
    >
      {/* Desktop Header */}
      <div className="container-custom grid grid-cols-3 items-center gap-4">
        {/* Logo */}
        <Link to="/" onClick={closeNav} className="flex items-center justify-start">
          <div className="h-15 w-15 ml-5 flex items-center justify-center">
            <img src={Log} alt="Logo" className="h-12 w-12" />
          </div>
          <div className="ml-2">
            <BoldText
              variant="brand" 
              style={{ color: scrolled ? colorScheme.text : 'white' }}
              className="text-lg"
            >
              ClaudyGod
            </BoldText>
            <LightText 
              style={{ color: scrolled ? colorScheme.secondaryText : 'rgba(255, 255, 255, 0.8)' }}
            fontSize="12px"  >
              Music & Ministry
            </LightText>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center items-center space-x-4 xl:space-x-8">
          {[
            { to: "/", name: "Home", icon: faHouse },
            { to: "/biography", name: "About" },
            { to: "/music", name: "Music" },
            { to: "/videos", name: "Videos" },
            { to: "/bookings", name: "Bookings" },
            { to: "/blogs", name: "Blogs" },
            { to: "/ministry", name: "Ministry" },
            { to: "/news", name: "News" },
            { to: "/store", name: "Store" },
            { to: "/contact", name: "Contact" },
            { to: "/donate", name: "Donate" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={() => {
                if (location.pathname === link.to) {
                  scrollToTop();
                }
              }}
              style={({ isActive }) => ({
                color: isActive 
                  ? colorScheme.accent 
                  : scrolled 
                    ? colorScheme.text 
                    : 'white',
                textDecoration: isActive ? 'underline' : 'none',
                textUnderlineOffset: isActive ? '4px' : 'none'
              })}
              className="flex items-center text-xs transition-colors hover:opacity-80"
            >
              {link.icon && (
                <FontAwesomeIcon 
                  icon={link.icon} 
                  className={`${link.name === 'Home' ? 'mr-2' : 'mr-1'} text-sm`} 
                />
              )}
              <LightText fontSize='13px'>
                {link.name}
              </LightText>
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
              style={{
                backgroundColor: scrolled ? colorScheme.button : 'white',
                color: scrolled ? colorScheme.buttonText : 'trans'
              }}
              className="p-3 hover:opacity-80 rounded-lg shadow-sm transition-colors absolute right-4 top-4"
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
      <div className={`lg:hidden fixed inset-0 z-50 transition-transform duration-300 ${
        isNavOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleNav} />
        
        <div 
          className="relative w-3/4 h-full ml-auto transform transition-all"
          style={{ backgroundColor: colorScheme.background }}
        >
          <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: colorScheme.border }}>
            <Link to="/" onClick={closeNav} className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center">
                <img src={Log} alt="Logo" className="h-10 w-10" />
              </div>
              <div className="ml-2">
                <LightText
                  variant="brand" 
                  style={{ color: colorScheme.text }}
                 font-size='5px'
                >
                  ClaudyGod
                </LightText>
                <LightText 
                  variant="caption" 
                  style={{ color: colorScheme.secondaryText }}
                  font-size='5px'
                >
                  Music & Ministry
                </LightText>
              </div>
            </Link>
            <button 
              onClick={toggleNav} 
              style={{
                backgroundColor: colorScheme.button,
                color: colorScheme.buttonText
              }}
              className="p-2 hover:opacity-80 rounded-full"
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>

          <nav className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
            <ul className="space-y-4">
              {[
                { to: "/", name: "Home", icon: faHouse },
                { to: "/biography", name: "About", icon: faUser },
                { to: "/music", name: "Music", icon: faMusic },
                { to: "/videos", name: "Videos", icon: faVideo },
                { to: "/news", name: "News", icon: faNewspaper },
                { to: "/blogs", name: "Blogs", icon: faBlog },
                { to: "/bookings", name: "Bookings", icon: faCalendar },
                { to: "/store", name: "Store", icon: faStore },
                { to: "/ministry", name: "Ministry", icon: faHandsPraying },
                { to: "/donate", name: "Donate", icon: faHandHoldingDollar },
                { to: "/contact", name: "Contact", icon: faEnvelope },
              ].map((link) => (
                <li key={link.to}>
                  <button
                    onClick={() => handleMobileNavigation(link.to)}
                    style={{
                      backgroundColor: location.pathname === link.to 
                        ? colorScheme.primary 
                        : 'transparent',
                      color: location.pathname === link.to 
                        ? colorScheme.buttonText 
                        : colorScheme.text
                    }}
                    className="flex items-center w-full p-4 rounded-lg transition-colors hover:opacity-80"
                  >
                    <FontAwesomeIcon 
                      icon={link.icon} 
                      className="mr-4 text-xl"
                      style={{ 
                        width: '24px', 
                        height: '24px',
                        color: location.pathname === link.to 
                          ? colorScheme.buttonText 
                          : colorScheme.text
                      }}
                    />
                    <LightText variant="mobileNav">
                      {link.name}
                    </LightText>
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
                style={{
                  backgroundColor: colorScheme.button,
                  color: colorScheme.buttonText
                }}
                className="w-full px-4 py-3 rounded-full text-base font-medium flex items-center justify-center transition-colors hover:opacity-80"
              >
                <FontAwesomeIcon 
                  icon={faHeadset} 
                  className="mr-3 text-xl"
                  style={{ width: '24px', height: '24px' }}
                />
                <SemiBoldText variant="button">
                  Listen Now
                </SemiBoldText>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};