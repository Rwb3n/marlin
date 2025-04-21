/**
 * Container Component for BLUE MARLIN OS
 * 
 * A responsive container component that provides consistent width constraints,
 * padding options, and background variations. Used as a layout primitive for
 * wrapping content with standardized horizontal spacing.
 */

import React from 'react';
import clsx from 'clsx';

export type ContainerWidth = 'default' | 'narrow' | 'wide' | 'full';
export type ContainerPadding = 'none' | 'small' | 'default' | 'large';
export type ContainerBackground = 'none' | 'light' | 'dark' | 'accent';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width preset of the container */
  width?: ContainerWidth;
  /** Padding preset for the container */
  padding?: ContainerPadding;
  /** Background color variant */
  background?: ContainerBackground;
  /** Whether to center the container */
  centered?: boolean;
  /** Children content to render inside the container */
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  width = 'default',
  padding = 'default',
  background = 'none',
  centered = true,
  className,
  children,
  ...props
}) => {
  // Width classes based on container width preset
  const widthClasses = {
    // Standard content width with responsive breakpoints
    default: 'max-w-screen-xl',
    // Narrower container for focused content
    narrow: 'max-w-screen-md',
    // Wider container for expanded content
    wide: 'max-w-screen-2xl',
    // Full width container (only respects padding)
    full: 'w-full',
  };

  // Padding classes for different spacing options
  const paddingClasses = {
    // No padding
    none: 'px-0',
    // Small padding for tight layouts
    small: 'px-3 sm:px-4',
    // Standard padding that increases with screen size
    default: 'px-4 sm:px-6 md:px-8',
    // Large padding for spacious layouts
    large: 'px-6 sm:px-8 md:px-12',
  };

  // Define background classes using dark: variant
  const backgroundClasses = {
    none: '',
    light: 'bg-origin-bg-light dark:bg-apex-bg-light',
    dark: 'bg-origin-bg-dark text-origin-text-inverted dark:bg-apex-bg-dark dark:text-apex-text-inverted',
    accent: 'bg-origin-accent text-origin-text-inverted dark:bg-apex-accent dark:text-apex-text-inverted',
  };

  // Combine all classes
  const containerClasses = clsx(
    // Apply width constraints
    widthClasses[width],
    // Apply padding
    paddingClasses[padding],
    // Apply background color if specified
    backgroundClasses[background],
    // Center the container if requested
    centered && 'mx-auto',
    // Add custom classes
    className
  );

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

export default Container; 