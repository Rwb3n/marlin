/**
 * Heading Component for BLUE MARLIN OS
 * 
 * This component implements responsive heading elements (h1-h6) with consistent
 * styling and spacing. It automatically adapts to the current theme.
 * It leverages the Text component for core styling.
 */

import React from 'react';
import clsx from 'clsx';
import { Text, TextSize } from './Text'; // Import Text and TextSize

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

// Mapping from heading level to Text component size prop
const levelToTextSize: Record<1 | 2 | 3 | 4 | 5 | 6, TextSize> = {
  1: 'xl', // Map level 1 to largest available TextSize
  2: 'xl', // Map level 2 to largest available TextSize
  3: 'lg', // Map level 3 to lg
  4: 'base', // Map level 4 to base
  5: 'sm', // Map level 5 to sm
  6: 'xs', // Map level 6 to xs
};

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  className,
  noMargin = false,
  centered = false,
  ...props
}) => {
  // Base classes applied to all headings - keep font-display and margin
  const baseClasses = clsx(
    'font-display tracking-wide',
    !noMargin && 'mb-heading'
    // Removed text-center (handled by Text align prop)
    // Removed text-foreground (handled by Text color prop)
  );
  
  // Combine classes - add external className here
  const classes = clsx(
    baseClasses,
    className
  );
  
  return (
    // Use Text component, passing relevant props
    <Text
      as={`h${level}`}
      size={levelToTextSize[level]}
      weight="bold" // Headings are typically bold
      color="default" // Use default text color from Text component
      align={centered ? 'center' : undefined}
      className={classes} // Apply font-display, margin, and external class
      {...props}
    >
      {children}
    </Text>
  );
};

export default Heading; 