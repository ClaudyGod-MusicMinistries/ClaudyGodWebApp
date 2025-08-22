import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../contexts/ThemeContext";
import { ColorScheme } from "../color/colorScheme";

type Variant = "primary" | "secondary" | "outline" | "icon";
type Size = "sm" | "md" | "lg" | "xl";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string; 
  to?: string;  
  target?: string;
  rel?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  style?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  disabled = false,
  href,
  to,
  target,
  rel,
  isLoading = false,
  icon,
  iconPosition = "left",
  style = {},
}) => {
  const { colorScheme } = useTheme();
  
  const sizeStyles: Record<Size, React.CSSProperties> = {
    sm: { padding: "6px 12px", fontSize: "14px" },
    md: { padding: "8px 16px", fontSize: "16px" },
    lg: { padding: "12px 24px", fontSize: "18px" },
    xl: { padding: "18px 32px", fontSize: "20px" },
  };

 const getVariantStyles = (variant: Variant, colorScheme: ColorScheme): React.CSSProperties => {
  switch (variant) {
    case "primary":
      return {
        backgroundColor: colorScheme.button,
        color: colorScheme.buttonText,
        border: "none",
      };
    case "secondary":
      return {
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
        border: `1px solid ${colorScheme.border}`,
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        color: colorScheme.primary,
        border: `1px solid ${colorScheme.primary}`,
      };
    case "icon":
      return {
        backgroundColor: "transparent",
        color: colorScheme.text,
        border: "none",
        padding: "8px", // Adjust as needed
      };
    default:
      return {
        backgroundColor: colorScheme.button,
        color: colorScheme.buttonText,
        border: "none",
      };
  }
};

  const baseStyle: React.CSSProperties = {
    borderRadius: "8px",
    fontWeight: 600,
    fontFamily: "WorkSans, sans-serif",
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    opacity: disabled || isLoading ? 0.6 : 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: fullWidth ? "100%" : "auto",
    transition: "all 0.3s ease",
    textDecoration: "none",
    ...getVariantStyles(variant, colorScheme),
    ...sizeStyles[size],
  };

const hoverStyle = !disabled && !isLoading ? {
  backgroundColor: variant === "primary" 
    ? colorScheme.accent 
    : variant === "secondary" 
      ? colorScheme.background 
      : variant === "icon"
        ? "transparent"
        : colorScheme.primary + "10",
  transform: variant === "icon" ? "none" : "translateY(-1px)",
  boxShadow: variant === "icon" ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)",
} : {};

  const content = isLoading ? (
    <span
      className="animate-spin inline-block rounded-full border-2 border-current border-t-transparent"
      style={{ width: "1rem", height: "1rem" }}
    />
  ) : (
    <>
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
    </>
  );

  const sharedProps = {
    onClick: disabled || isLoading ? undefined : onClick,
    style: { ...baseStyle, ...style },
    className,
    target,
    rel,
    type: href || to ? undefined : type,
    "aria-disabled": disabled || isLoading,
    whileHover: !disabled && !isLoading ? hoverStyle : undefined,
    whileTap: !disabled && !isLoading ? { scale: 0.98 } : undefined,
    children: content,
  };

  if (href) {
    return <motion.a {...sharedProps} href={href} />;
  }

  if (to) {
    return (
      <motion.div {...sharedProps}>
        <Link 
          to={to} 
          className="flex items-center justify-center gap-2 w-full h-full"
          style={{ color: 'inherit' }}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return <motion.button {...sharedProps} disabled={disabled || isLoading} />;
};

export default CustomButton;