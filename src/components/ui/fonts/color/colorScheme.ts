// src/components/ui/fonts/colors.ts

// Base color interfaces
type BackgroundColor = string;
type Color = string;

interface GrayScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface BorderRadius {
  small: string;
  medium: string;
  large: string;
  xlarge: string;
  full: string;
}

export interface ColorScheme {
  black: any;
  // Base colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  error: string;
  success: string;
  warning: string;
  info: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverted: string;
  subtleText: string;

  // Background colors
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceVariant: string;
  card: string;
  body: string;
  footer: string;
  pageBackground: string; // 👈 NEW: Added #f8f9fa color

  // Interactive elements
  button: string;
  buttonText: string;
  buttonHover: string;
  buttonActive: string;

  // Borders and dividers
  border: string;
  borderLight: string;
  borderDark: string;

  // Gray scale
  gray: GrayScale;

  // Gradients
  primaryGradient: string;
  primaryGradientLight: string;
  secondaryGradient: string;

  // Focus states
  focusRing: string;

  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;

  // Border radius
  borderRadius: BorderRadius;

  // Additional colors
  heading: string;
  white: string;

  // Highlight color
  highlight: string;

  // Material-like color scheme additions
  tertiary?: BackgroundColor;
  onTertiary?: Color;
  onPrimary?: Color;
  onSecondary?: Color;
  outline?: string;
}

const baseGrayScale: GrayScale = {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
};

const baseBorderRadius: BorderRadius = {
  small: '4px',
  medium: '8px',
  large: '12px',
  xlarge: '16px',
  full: '9999px',
};

export const darkShades: ColorScheme = {
  primary: '#7C3AED',
  primaryLight: '#8B5CF6',
  primaryDark: '#5B21B6',
  secondary: '#10B981',
  accent: '#F59E0B',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Text colors
  text: '#FFFFFF',
  textSecondary: '#E5E7EB',
  textTertiary: '#9CA3AF',
  textInverted: '#1F2937',
  subtleText: '#9CA3AF',

  // Background colors
  background: '#1E1E2C',
  backgroundSecondary: '#252538',
  surface: '#252538',
  surfaceVariant: '#2D2D42',
  card: '#2D2D42',
  body: '#1E1E2C',
  footer: '#121220',
  pageBackground: '#1E1E2C', // 👈 For dark mode, use the same as background

  // Buttons
  button: '#7C3AED',
  buttonText: '#FFFFFF',
  buttonHover: '#8B5CF6',
  buttonActive: '#6D28D9',

  // Borders
  border: '#374151',
  borderLight: '#4B5563',
  borderDark: '#1F2937',

  gray: baseGrayScale,

  // Gradients
  primaryGradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
  primaryGradientLight:
    'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(91, 33, 182, 0.1) 100%)',
  secondaryGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',

  focusRing: '0 0 0 3px rgba(124, 58, 237, 0.5)',

  shadowSm: '0 1px 3px rgba(0,0,0,0.5)',
  shadowMd: '0 4px 6px -1px rgba(0,0,0,0.5),0 2px 4px -1px rgba(0,0,0,0.3)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.5),0 4px 6px -2px rgba(0,0,0,0.25)',

  borderRadius: baseBorderRadius,

  heading: '#FFFFFF',
  white: '#FFFFFF',
  highlight: '#FFB703',

  tertiary: '#2D2D42',
  onTertiary: '#FFFFFF',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  outline: '#4B5563',
};

export const lightShades: ColorScheme = {
  primary: '#6D28D9',
  primaryLight: '#8B5CF6',
  primaryDark: '#5B21B6',
  secondary: '#10B981',
  accent: '#F59E0B',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',

  text: '#1F2937',
  textSecondary: '#4B5563',
  textTertiary: '#6B7280',
  textInverted: '#FFFFFF',
  subtleText: '#6B7280',

  background: '#F8FAFC',
  backgroundSecondary: '#EDF2F7',
  surface: '#FFFFFF',
  surfaceVariant: '#F3F4F6',
  card: '#FFFFFF',
  body: '#F8FAFC',
  footer: '#EDF2F7',
  pageBackground: '#F8F9FA', // 👈 NEW: Added your color here

  button: '#6D28D9',
  buttonText: '#FFFFFF',
  buttonHover: '#7C3AED',
  buttonActive: '#5B21B6',

  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',

  gray: baseGrayScale,

  primaryGradient: 'linear-gradient(135deg, #6D28D9 0%, #5B21B6 100%)',
  primaryGradientLight:
    'linear-gradient(135deg, rgba(109, 40, 217, 0.1) 0%, rgba(91, 33, 182, 0.1) 100%)',
  secondaryGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',

  focusRing: '0 0 0 3px rgba(109, 40, 217, 0.3)',

  shadowSm: '0 1px 3px rgba(0,0,0,0.1)',
  shadowMd: '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)',

  borderRadius: baseBorderRadius,

  heading: '#1F2937',
  white: '#FFFFFF',
  highlight: '#FFD166',

  tertiary: '#F3F4F6',
  onTertiary: '#1F2937',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  outline: '#D1D5DB',
};

// Utility types for theme usage
export type ThemeColor = keyof Omit<ColorScheme, 'gray' | 'borderRadius'>;
export type GrayColor = keyof GrayScale;
export type BorderRadiusSize = keyof BorderRadius;
