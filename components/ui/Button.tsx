'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  // Base
  [
    'inline-flex items-center justify-center gap-2',
    'font-bricolage font-semibold tracking-wide',
    'rounded-md border transition-all duration-250',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none cursor-pointer',
  ],
  {
    variants: {
      variant: {
        // Solid gold — primary CTA
        primary: [
          'bg-gradient-gold text-surface-base border-transparent',
          'hover:shadow-gold hover:brightness-110',
          'active:scale-[0.98]',
        ],
        // Outlined gold
        outline: [
          'bg-transparent text-gold-500 border-gold-500',
          'hover:bg-gold-500 hover:text-surface-base',
          'active:scale-[0.98]',
        ],
        // Ghost — minimal
        ghost: [
          'bg-transparent text-white border-transparent',
          'hover:bg-surface-elevated hover:text-gold-400',
          'active:scale-[0.98]',
        ],
        // Subtle gold tint
        soft: [
          'bg-gold-500/10 text-gold-400 border-gold-500/20',
          'hover:bg-gold-500/20 hover:border-gold-500/40',
          'active:scale-[0.98]',
        ],
        // White / inverted
        white: [
          'bg-white text-surface-base border-transparent',
          'hover:bg-neutral-100 hover:shadow-md',
          'active:scale-[0.98]',
        ],
        // Destructive
        danger: [
          'bg-status-error text-white border-transparent',
          'hover:bg-red-500',
          'active:scale-[0.98]',
        ],
        // Text-only link style
        link: [
          'bg-transparent border-transparent text-gold-500 underline-offset-4',
          'hover:underline hover:text-gold-400',
          'p-0 h-auto',
        ],
      },
      size: {
        xs:  'h-7  px-3    text-xs  rounded',
        sm:  'h-9  px-4    text-sm',
        md:  'h-11 px-6    text-sm',
        lg:  'h-13 px-8    text-base',
        xl:  'h-14 px-10   text-lg',
        icon:'h-10 w-10    p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
      uppercase: {
        true: 'uppercase tracking-widest',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      uppercase,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, fullWidth, uppercase }), className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
