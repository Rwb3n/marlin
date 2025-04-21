/**
 * Heading Component for BLUE MARLIN OS
 * 
 * This component implements responsive heading elements (h1-h6) with consistent
 * styling and spacing. It automatically adapts to the current theme.
 */

import React from 'react';
import clsx from 'clsx';

export interface HeadingProps {
  /** Heading level (1-6) which maps to h1-h6 HTML elements */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Content of the heading */
  children: React.ReactNode;
  /** Optional additional CSS classes */
  className?: string;
  /** Optional ID for direct linking */
  id?: string;
  /** Whether to remove the default bottom margin */
  noMargin?: boolean;
  /** Whether to center the text */
  centered?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  className,
  noMargin = false,
  centered = false,
  ...props
}) => {
  // Map the level to the appropriate HTML element
  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  // Base classes applied to all headings
  const baseClasses = clsx(
    'font-display tracking-wide',
    centered && 'text-center',
    !noMargin && 'mb-heading',
    'text-foreground'
  );
  
  // Size-specific classes based on heading level
  const sizeClasses = {
    1: 'text-4xl md:text-5xl leading-tight',
    2: 'text-3xl md:text-4xl leading-tight',
    3: 'text-2xl md:text-3xl leading-tight',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg',
  };
  
  // Combine all classes
  const classes = clsx(
    baseClasses,
    sizeClasses[level],
    className
  );
  
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Heading; 