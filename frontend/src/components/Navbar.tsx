import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Log } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StreamingModal from './StreamingModel'; // Fixed typo in component name
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

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      {/* Desktop Header */}
      <div className="container-custom grid grid-cols-3 items-center gap-4">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center justify-start">
          <div className="h-10 w-10 flex items-center justify-center">
            <img src={Log} alt="Logo" />
          </div>
          <div className="ml-2">
            <span className="text-purple-900 font-bold text-lg roboto-condensed">ClaudyGod</span>
            <span className="text-gray-700 text-xs block -mt-1 raleway-slider">Music & Ministry</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center items-center space-x-4 xl:space-x-8 raleway-slider">
          {[
            { to: "/", name: "Home", icon: faHouse },
            { to: "/biography", name: "About" },
            { to: "/music", name: "Music" },
            { to: "/videos", name: "Videos" },
            { to: "/bookings", name: "Bookings" },
            { to: "/blogs", name: "Blogs" },
            { to: "/ministry", name: "Ministry" },
            { to: "/store", name: "Store" },
            { to: "/contact", name: "Contact" },
            { to: "/donate", name: "Donate" },
            { to: "/help", name: "Help" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) => `flex items-center text-sm font-medium transition-colors hover:text-primary-light ${
                scrolled 
                  ? (isActive ? 'text-primary' : 'text-purple-900') 
                  : 'text-gray-900 hover:text-purple-900 cursor-pointer'
              }`}
            >
              {link.icon && <FontAwesomeIcon icon={link.icon} className={`${link.name === 'Home' ? 'mr-2' : 'mr-1'} text-sm`} />}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right Section - Listen Button & Mobile Menu Toggle */}
        <div className="flex items-center justify-end mr-12 gap-4">
         

         <StreamingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
        </div>
      </div>

      {/* Streaming Modal */}
   

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex justify-between items-center p-4 border-b">
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <div className="h-10 w-10 flex items-center justify-center">
              <img src={Log} alt="Logo" />
            </div>
            <div className="ml-2">
              <span className="text-purple-900 font-bold text-lg">ClaudyGod</span>
              <span className="text-gray-700 text-xs block -mt-1">Music & Ministry</span>
            </div>
          </Link>
          <button onClick={toggleMenu} className="text-purple-900 hover:text-purple-800 p-2">
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
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
                <NavLink
                  to={link.to}
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={link.icon} className="mr-3 w-5" />
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <button 
              onClick={() => {
                setIsModalOpen(true);
                closeMenu();
              }}
              className="w-full bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center transition duration-150 ease-in-out"
            >
              <FontAwesomeIcon icon={faHeadset} className="mr-2" />
              Listen Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};