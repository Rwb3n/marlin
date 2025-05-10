/**
 * Button Component for BLUE MARLIN OS
 * 
 * This component implements buttons with different variants, sizes, and states.
 * It automatically adapts to the current theme (origin/apex) and provides
 * accessibility features.
 */

import React, { useState, MouseEvent, useRef } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'outline' | 'glass-dark' | 'glass-light';
export type ButtonSize = 'default' | 'small';

// Ripple state type
interface Ripple { 
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size variant of the button */
  size?: ButtonSize;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Optional icon to display within the button */
  icon?: React.ReactNode;
  /** Position of the icon relative to the text */
  iconPosition?: 'left' | 'right';
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  disabled,
  onClick,
  style,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Add ripple effect
  const handleRippleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current && (variant === 'glass-dark' || variant === 'glass-light')) {
      const rect = buttonRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const newRipple: Ripple = { id: Date.now(), x, y, size };

      setRipples(prev => [...prev, newRipple]);

      // Clean up ripple after animation (600ms based on CSS)
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    // Call original onClick if provided
    if (onClick) {
      onClick(event);
    }
  };

  // Base styles applied to all button variants
  const baseClasses = 'relative overflow-hidden inline-flex items-center justify-center rounded-full border font-medium transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50';
  
  // Styles specific to each button variant using semantic classes and dark: variants
  const variantClasses = {
    primary: clsx(
      'bg-primary text-primary-foreground border-transparent', 
      'hover:bg-primary/90 active:bg-primary/80 active:scale-[0.98]', 
      'focus-visible:ring-offset-2 focus-visible:ring-ring',
      'disabled:opacity-50 disabled:cursor-not-allowed' 
    ),
    outline: clsx(
      'bg-transparent border-border text-primary',
      'hover:bg-accent hover:text-accent-foreground active:bg-accent/90',
      'active:scale-[0.98]',
      'focus-visible:ring-offset-2 focus-visible:ring-ring',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    ),
    'glass-dark': clsx(
      'bg-transparent border-border text-accent',
      'hover:bg-accent hover:text-accent-foreground active:bg-accent/90',
      'active:scale-[0.98]', 
      'focus-visible:ring-offset-2 focus-visible:ring-ring', 
      'disabled:opacity-60 disabled:cursor-not-allowed'
    ),
    'glass-light': clsx(
      'bg-transparent border-border text-accent',
      'hover:bg-accent hover:text-accent-foreground active:bg-accent/90', 
      'active:scale-[0.98]',
      'focus-visible:ring-offset-2 focus-visible:ring-ring', 
      'disabled:opacity-60 disabled:cursor-not-allowed'
    ),
  };
  
  // Styles for different button sizes
  const sizeClasses = {
    default: 'px-5 py-2.5 text-base',
    small: 'px-4 py-2 text-sm',
  };
  
  // Optional full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className
  );
  
  // Simplified Ripple color logic (adjust if needed)
  // Consider if ripple effect is still desired and how it fits the new theme
  const rippleOpacity = 0.2;
  const hexToRgba = (hex: string, alpha: number) => {
      // ... hex to rgba logic (ensure it handles CSS variables if needed, unlikely here) ...
      // For now, let's use a simple white/black ripple based on semantic foreground
      // This is a placeholder and might need refinement based on design.
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
  };
  // The ripple color probably needs semantic definition, using white/black as placeholder
  const finalRippleColor = hexToRgba('#000000', rippleOpacity); 

  return (
    <button 
      ref={buttonRef}
      className={classes} 
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={handleRippleClick}
      style={style}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      <span className={clsx("inline-flex items-center", isLoading && 'invisible')}> 
        {icon && iconPosition === 'left' && <span className="mr-2 -ml-1">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2 -mr-1">{icon}</span>}
      </span>
    </button>
  );
};

export default Button; 