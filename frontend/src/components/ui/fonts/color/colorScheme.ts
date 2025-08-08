// src/components/ui/fonts/colors.ts
export interface ColorScheme {
  surfaceVariant: any;
  surfaceVariant: any;
  heading: any;
  white: any;
  backgroundSecondary: any;
  backgroundSecondary: any;
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
  
  // Background colors
  background: string;
  surface: string;
  card: string;
  body: string;
  footer: string;
  
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
  gray: {
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
  };
  
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
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    full: string;
  };
}

export const darkShades: ColorScheme = {
  // Base colors
  primary: "#7C3AED",
  primaryLight: "#8B5CF6",
  primaryDark: "#5B21B6",
  secondary: "#10B981",
  accent: "#F59E0B",
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
  
  // Text colors
  text: "#FFFFFF",
  textSecondary: "#E5E7EB",
  textTertiary: "#9CA3AF",
  textInverted: "#1F2937",
  
  // Background colors
  background: "#1E1E2C",
  surface: "#252538",
  card: "#2D2D42",
  body: "#1E1E2C",
  footer: "#121220",
  
  // Interactive elements
  button: "#7C3AED",
  buttonText: "#FFFFFF",
  buttonHover: "#8B5CF6",
  buttonActive: "#6D28D9",
  
  // Borders
  border: "#374151",
  borderLight: "#4B5563",
  borderDark: "#1F2937",
  
  // Gray scale
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  
  // Gradients
  primaryGradient: "from-purple-600 to-purple-800",
  primaryGradientLight: "from-purple-500/10 to-purple-700/10",
  secondaryGradient: "from-emerald-500 to-emerald-700",
  
  // Focus states
  focusRing: "ring-2 ring-purple-500",
  
  // Shadows
  shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
  shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
  shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)",
  
  // Border radius
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
    xlarge: "16px",
    full: "9999px",
  },
};

export const lightShades: ColorScheme = {
  // Base colors
  primary: "#6D28D9",
  primaryLight: "#8B5CF6",
  primaryDark: "#5B21B6",
  secondary: "#10B981",
  accent: "#F59E0B",
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
  
  // Text colors
  text: "#1F2937",
  textSecondary: "#4B5563",
  textTertiary: "#6B7280",
  textInverted: "#FFFFFF",
  
  // Background colors
  background: "#F8FAFC",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  body: "#F8FAFC",
  footer: "#EDF2F7",
  
  // Interactive elements
  button: "#6D28D9",
  buttonText: "#FFFFFF",
  buttonHover: "#7C3AED",
  buttonActive: "#5B21B6",
  
  // Borders
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  borderDark: "#D1D5DB",
  
  // Gray scale
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  
  // Gradients
  primaryGradient: "from-purple-500 to-purple-700",
  primaryGradientLight: "from-purple-400/10 to-purple-600/10",
  secondaryGradient: "from-emerald-400 to-emerald-600",
  
  // Focus states
  focusRing: "ring-2 ring-purple-300",
  
  // Shadows
  shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  
  // Border radius
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
    xlarge: "16px",
    full: "9999px",
  },
};