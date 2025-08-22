import React from "react";
import { useTheme } from "../../../../contexts/ThemeContext";

type FontWeight =
  | "extralight"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "extraregular";

// Define a type for standard font sizes
type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | string;

interface BaseTextProps {
  children: React.ReactNode;
  weight?: FontWeight;
  color?: string;
  margin?: string;
  lineHeight?: string;
  textDecoration?: "none" | "underline" | "line-through";
  fontSize?: FontSize;
  mdFontSize?: FontSize; // Added medium font size prop
  className?: string;
  fontFamily?: string;
  as?: React.ElementType;
  useThemeColor?: boolean;
  style?: React.CSSProperties;
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
  extralight: "Raleway, sans-serif",
  light: "Raleway, sans-serif",
  regular: "Bricolage, sans-serif",
  medium: "Raleway, sans-serif",
  semibold: "WorkSans, sans-serif",
  bold: "Roboto, sans-serif",
  extrabold: "RobotoCondensed, sans-serif",
  extraregular: "Bricolage, sans-serif",
};

// Map of standard font sizes
const fontSizeMap: Record<string, string> = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  xxl: "24px",
};

export const BaseText: React.FC<BaseTextProps> = ({
  children,
  weight = "regular",
  color,
  margin,
  lineHeight,
  textDecoration = "none",
  fontSize = "md",
  mdFontSize,
  className = "",
  fontFamily,
  as: Component = "p",
  useThemeColor = false,
  style,
  ...props
}) => {
  const { colorScheme } = useTheme();

  const textColor = useThemeColor && !color ? colorScheme.text : color;

  // Resolve font sizes from the map or use direct values
  const resolvedFontSize = fontSizeMap[fontSize] || fontSize;
  const resolvedMdFontSize = mdFontSize ? (fontSizeMap[mdFontSize] || mdFontSize) : undefined;

  const styles: React.CSSProperties = {
    fontFamily: fontFamily || fontFamilyMap[weight],
    fontWeight: fontWeights[weight],
    margin,
    lineHeight,
    textDecoration,
    fontSize: resolvedFontSize,
    ...(resolvedMdFontSize && {
      '@media (min-width: 768px)': {
        fontSize: resolvedMdFontSize
      }
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
type TextPropsWithoutWeight = Omit<BaseTextProps, "weight">;

// Shorthand components
export const ExtraLightText: React.FC<TextPropsWithoutWeight> = (props) => (
  <BaseText {...props} weight="extralight" useThemeColor={props.useThemeColor ?? true} />
);

export const LightText: React.FC<TextPropsWithoutWeight> = (props) => (
  <BaseText {...props} weight="light" useThemeColor={props.useThemeColor ?? true} />
);

export const RegularText: React.FC<TextPropsWithoutWeight> = (props) => (
  <BaseText {...props} weight="regular" useThemeColor={props.useThemeColor ?? true} />
);

export const MediumText: React.FC<TextPropsWithoutWeight> = (props) => (
  <BaseText {...props} weight="medium" useThemeColor={props.useThemeColor ?? true} />
);

export const SemiBoldText: React.FC<TextPropsWithoutWeight> = (props) => (
  <BaseText {...props} weight="semibold" useThemeColor={props.useThemeColor ?? true} />
);

export const BoldText: React.FC<TextPropsWithoutWeight> = (props) => (
  <BaseText {...props} weight="bold" useThemeColor={props.useThemeColor ?? true} />
);

export const ExtraBoldText: React.FC<TextPropsWithoutWeight> = (props) => (
  <BaseText {...props} weight="extrabold" useThemeColor={props.useThemeColor ?? true} />
);

export const ExtraRegularText: React.FC<TextPropsWithoutWeight> = (props) => (
  <BaseText {...props} weight="extraregular" useThemeColor={props.useThemeColor ?? true} />
);