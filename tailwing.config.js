// tailwind.config.js
import { darkShades } from './src/components/ui/fonts/color';

export const content = ['./src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      primary: darkShades.primary, // "#4C1D95"
    },
  },
};
