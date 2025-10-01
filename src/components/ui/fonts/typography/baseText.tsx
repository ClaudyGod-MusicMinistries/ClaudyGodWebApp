// BaseText.tsx
import React from 'react';
import { useTheme } from '../../../../contexts/ThemeContext';

type FontWeight =
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'extraregular';

type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | string;

type TextVariant =
  | 'heading-xl'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'caption'
  | string;

interface BaseTextProps {
  children: React.ReactNode;
  /** Original prop */
  weight?: FontWeight;
  /** Alias to allow fontWeight usage in JSX */
  fontWeight?: FontWeight;
  color?: string;
  margin?: string;
  lineHeight?: string;
  textDecoration?: 'none' | 'underline' | 'line-through';
  fontSize?: FontSize;
  xsFontSize?: FontSize;
  smFontSize?: FontSize;
  mdFontSize?: FontSize;
  lgFontSize?: FontSize;
  xlFontSize?: FontSize;
  className?: string;
  fontFamily?: string;
  as?: React.ElementType;
  useThemeColor?: boolean;
  style?: React.CSSProperties;
  variant?: TextVariant;
}

const fontWeights: Record<FontWeight, number> = {
  extralight: 200,
  light: 200,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  extraregular: 400,
};

const fontFamilyMap: Record<FontWeight, string> = {
  extralight: 'Raleway, sans-serif',
  light: 'Raleway, sans-serif',
  regular: 'Bricolage, sans-serif',
  medium: 'Raleway, sans-serif',
  semibold: 'WorkSans, sans-serif',
  bold: 'Roboto, sans-serif',
  extrabold: 'Bricolage, sans-serif',
  extraregular: 'Bricolage, sans-serif',
};

// UPDATED: Custom font family map with Shadows added
const customFontFamilyMap: Record<string, string> = {
  LukiestGuy: 'LukiestGuy, cursive',
  Ultra: 'Ultra, serif',
  AbrilFatFace: 'AbrilFatFace, serif',
  Bricolage: 'Bricolage, sans-serif',
  Shadows: 'Shadows, cursive', // Added Shadows font
};

const fontSizeMap: Record<string, string> = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
};

const variantMap: Record<string, { fontSize: FontSize; weight: FontWeight }> = {
  'heading-xl': { fontSize: 'xxl', weight: 'extrabold' },
  'heading-lg': { fontSize: 'xl', weight: 'bold' },
  'heading-md': { fontSize: 'lg', weight: 'semibold' },
  'heading-sm': { fontSize: 'md', weight: 'medium' },
  'body-lg': { fontSize: 'lg', weight: 'regular' },
  'body-md': { fontSize: 'md', weight: 'regular' },
  'body-sm': { fontSize: 'sm', weight: 'regular' },
  caption: { fontSize: 'xs', weight: 'light' },
};

export const BaseText: React.FC<BaseTextProps> = ({
  children,
  weight,
  fontWeight, // alias
  color,
  margin,
  lineHeight,
  textDecoration = 'none',
  fontSize = 'md',
  className = '',
  fontFamily,
  as: Component = 'p',
  useThemeColor = false,
  style,
  variant,
  ...props
}) => {
  const { colorScheme } = useTheme();

  const variantSettings = variant ? variantMap[variant] : null;
  const finalWeight =
    weight || fontWeight || variantSettings?.weight || 'regular';
  const finalFontSize = fontSize || variantSettings?.fontSize || 'md';

  const textColor = useThemeColor && !color ? colorScheme.text : color;
  const resolvedFontSize = fontSizeMap[finalFontSize] || finalFontSize;

  // UPDATED: Now includes Shadows font in the resolution
  const resolvedFontFamily = fontFamily
    ? customFontFamilyMap[fontFamily] || fontFamily
    : fontFamilyMap[finalWeight];

  const styles: React.CSSProperties = {
    fontFamily: resolvedFontFamily,
    fontWeight: fontWeights[finalWeight],
    margin,
    lineHeight,
    textDecoration,
    fontSize: resolvedFontSize,
    ...(textColor && { color: textColor }),
    ...style,
  };

  return (
    <Component style={styles} className={className} {...props}>
      {children}
    </Component>
  );
};

// Derived components
export const ExtraLightText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} weight="extralight" />
);
export const LightText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} weight="light" />
);
export const RegularText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} weight="regular" />
);
export const MediumText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} weight="medium" />
);
export const SemiBoldText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} weight="semibold" />
);
export const BoldText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} weight="bold" />
);
export const ExtraBoldText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} weight="extrabold" />
);
export const ExtraRegularText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} weight="extraregular" />
);

// UPDATED: Convenience components with ShadowsText added
export const LukiestGuyText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} fontFamily="LukiestGuy" />
);
export const UltraText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} fontFamily="Ultra" />
);
export const AbrilFatFaceText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} fontFamily="AbrilFatFace" />
);
export const BricolageText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} fontFamily="Bricolage" />
);
export const ShadowsText: React.FC<BaseTextProps> = props => (
  <BaseText {...props} fontFamily="Shadows" />
);
