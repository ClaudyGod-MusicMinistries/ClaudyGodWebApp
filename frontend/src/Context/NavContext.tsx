import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface NavContextType {
  isNavOpen: boolean;
  toggleNav: () => void;
  closeNav: () => void;
}

const NavContext = createContext<NavContextType | null>(null);

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = useCallback(() => {
    setIsNavOpen(prev => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <NavContext.Provider value={{ isNavOpen, toggleNav, closeNav }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('useNavContext must be used within a NavProvider');
  }
  return context;
};