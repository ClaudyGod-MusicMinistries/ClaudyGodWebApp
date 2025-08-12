// src/components/ui/buttons/IconButton.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ColorScheme, GrayScale } from '../fonts/colors';
import { useTheme } from '../../contexts/ThemeContext';

type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonColor = 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'warning' | 'info' | 'gray' | 'white';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface IconButtonProps {
  icon: IconDefinition;
  onClick?: () => void;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'p-1.5 text-xs',
  sm: 'p-2 text-sm',
  md: 'p-2.5 text-base',
  lg: 'p-3 text-lg'
};

const baseClasses = "rounded-full transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2";

export const IconButton = ({
  icon,
  onClick,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  className = '',
  ariaLabel,
  disabled = false
}: IconButtonProps) => {
  const { colorScheme } = useTheme();

  const getColorClasses = () => {
    if (color === 'white') {
      return {
        solid: `bg-${colorScheme.white} text-${colorScheme.textInverted}`,
        outline: `border border-${colorScheme.white} text-${colorScheme.white} hover:bg-${colorScheme.white}/10`,
        ghost: `text-${colorScheme.white} hover:bg-${colorScheme.white}/10`
      };
    }

    if (color === 'gray') {
      return {
        solid: `bg-${colorScheme.gray[200]} text-${colorScheme.text} hover:bg-${colorScheme.gray[300]}`,
        outline: `border border-${colorScheme.gray[300]} text-${colorScheme.text} hover:bg-${colorScheme.gray[100]}`,
        ghost: `text-${colorScheme.textSecondary} hover:bg-${colorScheme.gray[100]}`
      };
    }

    const colorKey = color === 'accent' ? 'warning' : color; // Map accent to warning for your scheme
    const colorValue = colorScheme[colorKey as keyof ColorScheme];

    return {
      solid: `bg-${colorValue} text-${colorScheme.buttonText} hover:bg-${colorScheme.buttonHover}`,
      outline: `border border-${colorValue} text-${colorValue} hover:bg-${colorValue}/10`,
      ghost: `text-${colorValue} hover:bg-${colorValue}/10`
    };
  };

  const colorClasses = getColorClasses();
  const variantClass = colorClasses[variant];
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClass} ${disabledClasses} ${className}`}
      aria-label={ariaLabel}
      disabled={disabled}
      style={{
        focusRing: colorScheme.focusRing
      }}
    >
      <FontAwesomeIcon 
        icon={icon} 
        className={size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : 'text-base'}
      />
    </button>
  );
};