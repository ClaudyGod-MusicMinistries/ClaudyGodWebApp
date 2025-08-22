import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../contexts/ThemeContext";
import { ColorScheme } from "../color/colorScheme";

// Add "outlined" as an alias for "outline"
type Variant = "primary" | "secondary" | "outline" | "outlined" | "icon" | "background" | "text";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  variant?: Variant;
  size?: Size;
  mdSize?: Size;  // ✅ added here
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
    xs: { padding: "4px 8px", fontSize: "12px" },
    sm: { padding: "6px 12px", fontSize: "14px" },
    md: { padding: "8px 16px", fontSize: "16px" },
    lg: { padding: "12px 24px", fontSize: "18px" },
    xl: { padding: "18px 32px", fontSize: "20px" },
  };

  const getVariantStyles = (variant: Variant, colorScheme: ColorScheme): React.CSSProperties => {
    // Map "outlined" to "outline" for styling
    const effectiveVariant = variant === "outlined" ? "outline" : variant;
    
    switch (effectiveVariant) {
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
          padding: "8px",
        };
      case "background":
        return {
          backgroundColor: colorScheme.background,
          color: colorScheme.text,
          border: "none",
        };
      case "text":
        return {
          backgroundColor: "transparent",
          color: colorScheme.text,
          border: "none",
          padding: "0",
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
    borderRadius: variant === "text" ? "0" : "8px",
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
        : variant === "background"
          ? colorScheme.background + "CC"
          : variant === "icon" || variant === "text" || variant === "outlined"
            ? "transparent"
            : colorScheme.primary + "10",
    transform: variant === "icon" || variant === "text" || variant === "outlined" ? "none" : "translateY(-1px)",
    boxShadow: variant === "icon" || variant === "text" || variant === "outlined" ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)",
    textDecoration: variant === "text" ? "underline" : "none",
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

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled && !isLoading && onClick) {
      onClick(e);
    }
  };

  const buttonProps = {
    onClick: handleClick,
    style: { ...baseStyle, ...style },
    className,
    type: href || to ? undefined : type,
    "aria-disabled": disabled || isLoading,
    whileHover: !disabled && !isLoading ? hoverStyle : undefined,
    whileTap: !disabled && !isLoading ? { scale: 0.98 } : undefined,
    disabled: disabled || isLoading,
    children: content,
  };

  const linkProps = {
    onClick: handleClick,
    style: { ...baseStyle, ...style },
    className,
    target,
    rel,
    "aria-disabled": disabled || isLoading,
    whileHover: !disabled && !isLoading ? hoverStyle : undefined,
    whileTap: !disabled && !isLoading ? { scale: 0.98 } : undefined,
    children: content,
  };

  if (href) {
    return <motion.a {...linkProps} href={href} />;
  }

  if (to) {
    return (
      <motion.div {...linkProps}>
        <Link 
          to={to} 
          className="flex items-center justify-center gap-2 w-full h-full"
          style={{ color: 'inherit', textDecoration: 'none' }}
          onClick={(e) => {
            if (disabled || isLoading) {
              e.preventDefault();
            }
          }}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return <motion.button {...buttonProps} />;
};

export default CustomButton;