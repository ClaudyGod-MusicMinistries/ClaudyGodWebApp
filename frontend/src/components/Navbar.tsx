import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Log } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StreamingModal from './StreamingModel';
import { useNavContext } from '../context/NavContext';
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

export const Navbar: React.FC = () => {
  const { isNavOpen, toggleNav, closeNav } = useNavContext();
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
    <header className={`sticky top-0 z-50 h-20 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      {/* Desktop Header */}
      <div className="container-custom grid grid-cols-3 items-center gap-4">
        {/* Logo */}
        <Link to="/" onClick={closeNav} className="flex items-center justify-start">
          <div className="h-15 w-15 ml-5 flex items-center justify-center">
            <img src={Log} alt="Logo" className="h-12 w-12" />
          </div>
          <div className="ml-2">
            <span className={`text-purple-900 text-lg roboto-condensed ${
              !scrolled && 'text-white'
            }`}>
              ClaudyGod
            </span>
            <span className={`text-xs block -mt-1 raleway-light ${
              !scrolled ? 'text-white/80' : 'text-gray-700'
            }`}>
              Music & Ministry
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center items-center space-x-4 xl:space-x-8 work-sans">
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
            { to: "/help", name: "Help" },
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
              className={({ isActive }) => `flex items-center text-xs work-sans transition-colors ${
                scrolled 
                  ? (isActive 
                      ? 'text-purple-800 roboto-condensed underline underline-offset-4' 
                      : 'text-purple-900 hover:text-purple-700') 
                  : (isActive 
                      ? 'text-purple-900 roboto-condensed ' 
                      : 'text-gray-700 hover:text-amber-500')
              }`}
            >
              {link.icon && <FontAwesomeIcon 
                icon={link.icon} 
                className={`${link.name === 'Home' ? 'mr-2' : 'mr-1'} text-sm`} 
              />}
              <span>{link.name}</span>
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
              className="p-3 bg-purple-900 hover:bg-purple-800 text-white rounded-lg shadow-sm transition-colors absolute right-4 top-4"
            >
              <FontAwesomeIcon 
                icon={isNavOpen ? faTimes : faBars} 
                className="h-6 w-6" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Updated with larger icons */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-transform duration-300 ${
        isNavOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleNav} />
        
        <div className="relative bg-white/95 w-3/4 h-full ml-auto transform transition-all">
          <div className="flex justify-between items-center p-4 border-b">
            <Link to="/" onClick={closeNav} className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center">
                <img src={Log} alt="Logo" className="h-10 w-10" />
              </div>
              <div className="ml-2">
                <span className="text-purple-900 font-bold text-lg">ClaudyGod</span>
                <span className="text-gray-700 text-xs block -mt-1">Music & Ministry</span>
              </div>
            </Link>
            <button 
              onClick={toggleNav} 
              className="p-2 bg-purple-900 hover:bg-purple-800 text-white rounded-full"
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
                    className={`flex items-center w-full p-4 rounded-lg transition-colors ${
                      location.pathname === link.to 
                        ? 'bg-purple-900 text-white' 
                        : 'text-gray-800 hover:bg-purple-900 hover:text-white'
                    }`}
                  >
                    <FontAwesomeIcon 
                      icon={link.icon} 
                      className="mr-4 text-xl"
                      style={{ width: '24px', height: '24px' }}
                    />
                    <span className="text-lg">{link.name}</span>
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
                className="w-full bg-purple-900 hover:bg-purple-800 text-white px-4 py-3 rounded-full text-base font-medium flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon 
                  icon={faHeadset} 
                  className="mr-3 text-xl"
                  style={{ width: '24px', height: '24px' }}
                />
                Listen Now
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};