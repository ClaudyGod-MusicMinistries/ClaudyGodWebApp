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

interface BaseTextProps {
  children: React.ReactNode;
  weight?: FontWeight;
  color?: string;
  margin?: string;
  lineHeight?: string;
  textDecoration?: "none" | "underline" | "line-through";
  fontSize?: string;
  className?: string;
  fontFamily?: string;
  as?: React.ElementType;
  useThemeColor?: boolean;
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
  regular: "Bricolage, sans-serif", // Now uses Bricolage for regular weight
  medium: "Raleway, sans-serif",
  semibold: "WorkSans, sans-serif",
  bold: "Roboto, sans-serif",
  extrabold: "RobotoCondensed, sans-serif",
  extraregular: "Bricolage, sans-serif",
};

export const BaseText: React.FC<BaseTextProps> = ({
  children,
  weight = "regular",
  color,
  margin,
  lineHeight,
  textDecoration = "none",
  fontSize = "16px",
  className = "",
  fontFamily,
  as: Component = "p",
  useThemeColor = false,
  ...props
}) => {
  const { colorScheme } = useTheme();

  const textColor = useThemeColor && !color ? colorScheme.text : color;

  const styles: React.CSSProperties = {
    fontFamily: fontFamily || fontFamilyMap[weight],
    fontWeight: fontWeights[weight],
    margin,
    lineHeight,
    textDecoration,
    fontSize,
    ...(textColor && { color: textColor }),
    ...props.style,
  };

  return (
    <Component style={styles} className={className}>
      {children}
    </Component>
  );
};

// Shorthand components
export const ExtraLightText = (props: Omit<BaseTextProps, "weight">) => (
  <BaseText {...props} weight="extralight" useThemeColor={props.useThemeColor ?? true} />
);

export const LightText = (props: Omit<BaseTextProps, "weight">) => (
  <BaseText {...props} weight="light" useThemeColor={props.useThemeColor ?? true} />
);

export const RegularText = (props: Omit<BaseTextProps, "weight">) => (
  <BaseText {...props} weight="regular" useThemeColor={props.useThemeColor ?? true} />
);

export const MediumText = (props: Omit<BaseTextProps, "weight">) => (
  <BaseText {...props} weight="medium" useThemeColor={props.useThemeColor ?? true} />
);

export const SemiBoldText = (props: Omit<BaseTextProps, "weight">) => (
  <BaseText {...props} weight="semibold" useThemeColor={props.useThemeColor ?? true} />
);

export const BoldText = (props: Omit<BaseTextProps, "weight">) => (
  <BaseText {...props} weight="bold" useThemeColor={props.useThemeColor ?? true} />
);

export const ExtraBoldText = (props: Omit<BaseTextProps, "weight">) => (
  <BaseText {...props} weight="extrabold" useThemeColor={props.useThemeColor ?? true} />
);

export const ExtraRegularText = (props: Omit<BaseTextProps, "weight">) => (
  <BaseText {...props} weight="extraregular" useThemeColor={props.useThemeColor ?? true} />
);