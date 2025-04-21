/**
 * Button Component for BLUE MARLIN OS
 * 
 * This component implements buttons with different variants, sizes, and states.
 * It automatically adapts to the current theme (origin/apex) and provides
 * accessibility features.
 */

import React, { useState, MouseEvent, useRef } from 'react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';

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
  const { theme: themeName } = useTheme();
  const currentColors = themeName === 'light' ? colors.light : colors.dark;
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
  const baseClasses = 'relative overflow-hidden inline-flex items-center justify-center rounded-full border font-medium transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50';
  
  // Function to slightly adjust hex color brightness
  // Note: This is a simple approximation
  const adjustColor = (color: string, amount: number): string => {
    let usePound = false;
    if (color[0] === '#') {
      color = color.slice(1);
      usePound = true;
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amount;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000FF) + amount;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
  };

  // Define gradient based on theme for glass variants
  let gradientStyle = {};
  if (variant === 'glass-dark' || variant === 'glass-light') {
    // Use ACCENT color as the base for the gradient
    const baseColor = currentColors.accent || (themeName === 'light' ? '#ff4400' : '#0084ff'); // Use accent color
    let topColor = baseColor;
    let bottomColor = baseColor;
    // Adjust brightness slightly for bevel effect
    if (themeName === 'dark') {
      topColor = adjustColor(baseColor, 20); // Lighter top for dark accent
      bottomColor = adjustColor(baseColor, -10); // Darker bottom for dark accent
    } else {
      topColor = adjustColor(baseColor, 25); // Lighter top for light accent
      bottomColor = adjustColor(baseColor, -15); // Darker bottom for light accent
    }
    gradientStyle = { background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})` };
  }

  // Determine text color based on variant and theme
  let finalTextColorClass = ''
  if (variant === 'primary') {
     // Primary button usually has inverted text for contrast
     finalTextColorClass = themeName === 'light' ? `text-[${colors.dark.text}]` : `text-[${colors.light.text}]`; 
  } else if (variant === 'outline') {
     // Outline button uses accent color for text
     finalTextColorClass = themeName === 'light' ? `text-[${colors.light.accent}]` : `text-[${colors.dark.accent}]`;
  } else if (variant === 'glass-light') {
     // Glass light (orange bg) -> use inverted text (light)
     finalTextColorClass = `text-[${colors.light['text-inverted']}]`;
  } else { // glass-dark (blue bg) -> use default text (light)
     finalTextColorClass = `text-[${colors.dark.text}]`;
  }

  // Styles specific to each button variant
  const variantClasses = {
    primary: clsx(
      'border-transparent', 
      finalTextColorClass, 
      `bg-[${currentColors.accent}]`, 
      'hover:opacity-90 active:opacity-100 active:scale-[0.98]', 
      'focus-visible:ring-offset-2',
      `focus-visible:ring-[${currentColors.accent}]`, 
      'disabled:opacity-50 disabled:cursor-not-allowed' 
    ),
    outline: clsx(
      'bg-transparent',
      `border-[${currentColors.accent}]`, 
      finalTextColorClass,
      themeName === 'light' 
        ? 'hover:bg-black/5 active:bg-black/10' 
        : 'hover:bg-white/10 active:bg-white/20',
      'active:scale-[0.98]',
      'focus-visible:ring-offset-2',
      `focus-visible:ring-[${currentColors.accent}]`,
      'disabled:opacity-50 disabled:cursor-not-allowed'
    ),
    'glass-dark': clsx(
      'border-transparent',
      finalTextColorClass, // Now uses colors.dark.text
      'hover:brightness-110 active:scale-[0.98]',
      'focus-visible:ring-blue-400 focus-visible:ring-offset-2', // Consider using accent ring color? 
      'disabled:opacity-60 disabled:cursor-not-allowed'
    ),
    'glass-light': clsx(
      'border-transparent',
      finalTextColorClass, // Now uses colors.light['text-inverted']
      'hover:brightness-110 active:scale-[0.98]', // Adjusted hover slightly
      'focus-visible:ring-orange-400 focus-visible:ring-offset-2', // Use orange focus ring to match accent
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
  
  // Ripple color: Light theme uses inverted text, Dark theme uses default text
  const rippleBaseColor = themeName === 'light' 
    ? colors.light['text-inverted'] || '#ffffff' 
    : colors.dark.text || '#ffffff'; // Use inverted text for light theme ripple
  
  const rippleOpacity = 0.7; 
  const hexToRgba = (hex: string, alpha: number) => {
      hex = hex.replace('#', '');
      // Add check for short hex codes (e.g., #fff)
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      // Handle NaN results from parseInt if hex is invalid
      if (isNaN(r) || isNaN(g) || isNaN(b)) {
        console.error(`Invalid hex color for ripple: ${hex}`);
        return themeName === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.2)'; // Fallback
      }
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const finalRippleColor = hexToRgba(rippleBaseColor, rippleOpacity);

  // Combine gradient style with passed style
  let buttonStyle = { ...style }; 
  if (variant === 'glass-dark' || variant === 'glass-light') {
     // Merge gradient and filter for glass variants
     buttonStyle = { ...buttonStyle, ...gradientStyle, filter: 'url(#water-surface)' }; 
  }

  return (
    <button 
      ref={buttonRef}
      className={classes} 
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={handleRippleClick}
      style={buttonStyle}
      {...props}
    >
      {(variant === 'glass-dark' || variant === 'glass-light') && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="button-ripple z-0"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: finalRippleColor,
          }}
        />
      ))}
      
      <span className="relative z-10 flex items-center justify-center"> 
        {isLoading && (
          <span className="mr-2 inline-block animate-spin" aria-hidden="true">⟳</span>
        )}
        
        {icon && iconPosition === 'left' && (
          <span className={children ? "mr-2" : ""} aria-hidden="true">{icon}</span>
        )}
        
        <span>{children}</span>
        
        {icon && iconPosition === 'right' && (
          <span className={children ? "ml-2" : ""} aria-hidden="true">{icon}</span>
        )}
      </span>
    </button>
  );
};

export default Button; 