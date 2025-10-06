import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../contexts/ThemeContext';
import { ColorScheme } from '../color/colorScheme';

type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'outlined'
  | 'icon'
  | 'background'
  | 'text'
  | 'disabled'
  | 'appStore'
  | 'googlePlay';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'circle';

// Add this new type for responsive sizes
type ResponsiveSize = `${Size} ${string}:${Size}` | Size;

interface CustomButtonProps extends MotionProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  variant?: Variant;
  size?: ResponsiveSize; // Changed from Size to ResponsiveSize
  mdSize?: Size;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: React.CSSProperties;
  badge?: number | string;
  hoverStyle?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  mdSize,
  fullWidth = false,
  className = '',
  type = 'button',
  disabled = false,
  href,
  to,
  target,
  rel,
  isLoading = false,
  icon,
  iconPosition = 'left',
  style = {},
  badge,
  hoverStyle,
  whileHover,
  whileTap,
  ...motionRest
}) => {
  const { colorScheme } = useTheme();

  // Helper function to extract base size from responsive string
  const getBaseSize = (sizeValue: ResponsiveSize): Size => {
    if (typeof sizeValue === 'string' && sizeValue.includes(' ')) {
      // Extract the first size from responsive string like "sm md:lg"
      return sizeValue.split(' ')[0] as Size;
    }
    return sizeValue as Size;
  };

  const sizeStyles: Record<Size, React.CSSProperties> = {
    xs: { padding: '4px 8px', fontSize: '12px' },
    sm: { padding: '6px 12px', fontSize: '14px' },
    md: { padding: '8px 16px', fontSize: '16px' },
    lg: { padding: '12px 24px', fontSize: '18px' },
    xl: { padding: '18px 32px', fontSize: '20px' },
    circle: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      padding: 0,
      fontSize: '16px',
    },
  };

  const getVariantStyles = (
    v: Variant,
    cs: ColorScheme
  ): React.CSSProperties => {
    const effectiveVariant = v === 'outlined' ? 'outline' : v;
    switch (effectiveVariant) {
      case 'primary':
        return {
          backgroundColor: cs.button,
          color: cs.buttonText,
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: cs.background,
          color: cs.text,
          border: `1px solid ${cs.border}`,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: cs.primary,
          border: `1px solid ${cs.primary}`,
        };
      case 'icon':
        return {
          backgroundColor: 'transparent',
          color: cs.text,
          border: 'none',
          padding: '8px',
        };
      case 'background':
        return {
          backgroundColor: cs.background,
          color: cs.text,
          border: 'none',
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: cs.text,
          border: 'none',
          padding: '0',
        };
      case 'disabled':
        return { backgroundColor: '#ddd', color: '#888', border: 'none' };
      case 'appStore':
        return { backgroundColor: '#000', color: '#fff', border: 'none' };
      case 'googlePlay':
        return { backgroundColor: '#34A853', color: '#fff', border: 'none' };
      default:
        return {
          backgroundColor: cs.button,
          color: cs.buttonText,
          border: 'none',
        };
    }
  };

  const getEffectiveSize = (): Size => {
    // Use mdSize if provided, otherwise get base size from responsive string
    return mdSize || getBaseSize(size);
  };

  const baseStyle: React.CSSProperties = {
    borderRadius:
      getBaseSize(size) === 'circle' ? '50%' : variant === 'text' ? '0' : '8px',
    fontWeight: 600,
    fontFamily: 'WorkSans, sans-serif',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: fullWidth ? '100%' : undefined,
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    position: 'relative',
    ...getVariantStyles(variant, colorScheme),
    ...sizeStyles[getEffectiveSize()],
  };

  // Fixed: Use type assertion to handle the complex union type
  const getCombinedWhileHover = () => {
    if (disabled || isLoading) return undefined;

    // If we have both whileHover and hoverStyle, combine them
    if (whileHover && hoverStyle) {
      return {
        ...(typeof whileHover === 'object' && !Array.isArray(whileHover)
          ? whileHover
          : {}),
        ...hoverStyle,
      } as any; // Type assertion to handle complex type
    }

    // If we only have whileHover, return it
    if (whileHover) return whileHover;

    // If we only have hoverStyle, return it as TargetAndTransition
    if (hoverStyle) return hoverStyle as any;

    return undefined;
  };

  const customWhileHover = getCombinedWhileHover();

  const content = isLoading ? (
    <span
      className="animate-spin inline-block rounded-full border-2 border-current border-t-transparent"
      style={{ width: '1rem', height: '1rem' }}
    />
  ) : (
    <>
      {icon && iconPosition === 'left' && icon}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && icon}
      {badge !== undefined && (
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: 'red',
            color: 'white',
            fontSize: '0.7rem',
            padding: '2px 6px',
            borderRadius: '9999px',
            minWidth: '18px',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          {badge}
        </span>
      )}
    </>
  );

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled && !isLoading && onClick) onClick(e);
  };

  // Create separate props for each element type to avoid type complexity
  const baseMotionProps = {
    onClick: handleClick,
    style: { ...baseStyle, ...style },
    className,
    'aria-disabled': disabled || isLoading,
    whileHover: customWhileHover,
    whileTap: !disabled && !isLoading ? whileTap : undefined,
    ...motionRest,
  };

  if (href) {
    return (
      <motion.a {...baseMotionProps} href={href} target={target} rel={rel}>
        {content}
      </motion.a>
    );
  }

  if (to) {
    return (
      <motion.div {...baseMotionProps}>
        <Link
          to={to}
          className="flex items-center justify-center gap-2 w-full h-full"
          style={{ color: 'inherit', textDecoration: 'none' }}
          onClick={e => {
            if (disabled || isLoading) e.preventDefault();
          }}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...baseMotionProps}
      type={type}
      disabled={disabled || isLoading}
    >
      {content}
    </motion.button>
  );
};

export default CustomButton;
