/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import {
  ColorScheme,
  darkShades,
  lightShades,
} from '../components/ui/fonts/color/colorScheme';

type ThemeContextType = {
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const colorScheme = isDarkMode ? darkShades : lightShades;

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
