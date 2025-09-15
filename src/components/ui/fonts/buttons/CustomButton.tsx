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
  | 'googlePlay'; // added

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'circle';

interface CustomButtonProps extends MotionProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  variant?: Variant;
  size?: Size;
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
  whileHover,
  whileTap,
  ...motionRest
}) => {
  const { colorScheme } = useTheme();

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
        return { backgroundColor: '#000', color: '#fff', border: 'none' }; // custom Apple style
      case 'googlePlay':
        return { backgroundColor: '#34A853', color: '#fff', border: 'none' }; // custom Google style
      default:
        return {
          backgroundColor: cs.button,
          color: cs.buttonText,
          border: 'none',
        };
    }
  };

  const getEffectiveSize = (): Size => mdSize || size;

  const baseStyle: React.CSSProperties = {
    borderRadius: size === 'circle' ? '50%' : variant === 'text' ? '0' : '8px',
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

  const sharedProps = {
    onClick: handleClick,
    style: { ...baseStyle, ...style },
    className,
    'aria-disabled': disabled || isLoading,
    whileHover: !disabled && !isLoading ? whileHover : undefined,
    whileTap: !disabled && !isLoading ? whileTap : undefined,
    children: content,
    ...motionRest,
  };

  if (href)
    return <motion.a {...sharedProps} href={href} target={target} rel={rel} />;
  if (to) {
    return (
      <motion.div {...sharedProps}>
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
      {...sharedProps}
      type={type}
      disabled={disabled || isLoading}
    />
  );
};

export default CustomButton;
