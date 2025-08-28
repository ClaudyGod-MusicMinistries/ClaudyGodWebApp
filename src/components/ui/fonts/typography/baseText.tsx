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

// Define a type for standard font sizes
type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | string;

// Define variant types
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
  weight?: FontWeight;
  color?: string;
  margin?: string;
  lineHeight?: string;
  textDecoration?: 'none' | 'underline' | 'line-through';
  fontSize?: FontSize;
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
  extrabold: 'RobotoCondensed, sans-serif',
  extraregular: 'Bricolage, sans-serif',
};

// Map of standard font sizes
const fontSizeMap: Record<string, string> = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
};

// Variant mappings
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
  color,
  margin,
  lineHeight,
  textDecoration = 'none',
  fontSize = 'md',
  smFontSize,
  mdFontSize,
  lgFontSize,
  xlFontSize,
  className = '',
  fontFamily,
  as: Component = 'p',
  useThemeColor = false,
  style,
  variant,
  ...props
}) => {
  const { colorScheme } = useTheme();

  // Apply variant settings if provided
  const variantSettings = variant ? variantMap[variant] : null;
  const finalWeight = weight || variantSettings?.weight || 'regular';
  const finalFontSize = fontSize || variantSettings?.fontSize || 'md';

  const textColor = useThemeColor && !color ? colorScheme.text : color;

  // Resolve font sizes from the map or use direct values
  const resolvedFontSize = fontSizeMap[finalFontSize] || finalFontSize;
  const resolvedSmFontSize = smFontSize
    ? fontSizeMap[smFontSize] || smFontSize
    : undefined;
  const resolvedMdFontSize = mdFontSize
    ? fontSizeMap[mdFontSize] || mdFontSize
    : undefined;
  const resolvedLgFontSize = lgFontSize
    ? fontSizeMap[lgFontSize] || lgFontSize
    : undefined;
  const resolvedXlFontSize = xlFontSize
    ? fontSizeMap[xlFontSize] || xlFontSize
    : undefined;

  const styles: React.CSSProperties = {
    fontFamily: fontFamily || fontFamilyMap[finalWeight],
    fontWeight: fontWeights[finalWeight],
    margin,
    lineHeight,
    textDecoration,
    fontSize: resolvedFontSize,
    ...(resolvedSmFontSize && {
      '@media (min-width: 640px)': {
        fontSize: resolvedSmFontSize,
      },
    }),
    ...(resolvedMdFontSize && {
      '@media (min-width: 768px)': {
        fontSize: resolvedMdFontSize,
      },
    }),
    ...(resolvedLgFontSize && {
      '@media (min-width: 1024px)': {
        fontSize: resolvedLgFontSize,
      },
    }),
    ...(resolvedXlFontSize && {
      '@media (min-width: 1280px)': {
        fontSize: resolvedXlFontSize,
      },
    }),
    ...(textColor && { color: textColor }),
    ...style,
  };

  return (
    <Component style={styles} className={className} {...props}>
      {children}
    </Component>
  );
};

// Create a type for all shorthand components
type TextPropsWithoutWeight = Omit<BaseTextProps, 'weight'>;

// Shorthand components
export const ExtraLightText: React.FC<TextPropsWithoutWeight> = props => (
  <BaseText
    {...props}
    weight="extralight"
    useThemeColor={props.useThemeColor ?? true}
  />
);

export const LightText: React.FC<TextPropsWithoutWeight> = props => (
  <BaseText
    {...props}
    weight="light"
    useThemeColor={props.useThemeColor ?? true}
  />
);

export const RegularText: React.FC<TextPropsWithoutWeight> = props => (
  <BaseText
    {...props}
    weight="regular"
    useThemeColor={props.useThemeColor ?? true}
  />
);

export const MediumText: React.FC<TextPropsWithoutWeight> = props => (
  <BaseText
    {...props}
    weight="medium"
    useThemeColor={props.useThemeColor ?? true}
  />
);

export const SemiBoldText: React.FC<TextPropsWithoutWeight> = props => (
  <BaseText
    {...props}
    weight="semibold"
    useThemeColor={props.useThemeColor ?? true}
  />
);

export const BoldText: React.FC<TextPropsWithoutWeight> = props => (
  <BaseText
    {...props}
    weight="bold"
    useThemeColor={props.useThemeColor ?? true}
  />
);

export const ExtraBoldText: React.FC<TextPropsWithoutWeight> = props => (
  <BaseText
    {...props}
    weight="extrabold"
    useThemeColor={props.useThemeColor ?? true}
  />
);

export const ExtraRegularText: React.FC<TextPropsWithoutWeight> = props => (
  <BaseText
    {...props}
    weight="extraregular"
    useThemeColor={props.useThemeColor ?? true}
  />
);
