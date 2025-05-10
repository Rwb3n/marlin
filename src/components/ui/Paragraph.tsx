/**
 * Paragraph Component for BLUE MARLIN OS
 * 
 * This component implements paragraph text elements with consistent
 * styling, spacing, and size variants. It automatically adapts to the current theme.
 * It leverages the Text component for core styling.
 */

import React from 'react';
import clsx from 'clsx';
import { Text, TextSize, TextWeight, TextColor } from './Text'; // Import Text component and types

export type ParagraphSize = 'small' | 'medium' | 'large';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Size variant for the paragraph */
  size?: ParagraphSize;
  /** Content of the paragraph */
  children: React.ReactNode;
  /** Optional additional CSS classes */
  className?: string;
  /** Whether to remove the default bottom margin */
  noMargin?: boolean;
  /** Whether to use a lead (larger, emphasized) style */
  lead?: boolean;
  /** Whether to mute the text color */
  muted?: boolean;
  /** Whether to center the text */
  centered?: boolean;
}

// Mapping from ParagraphSize to TextSize
const paragraphToTextSize: Record<ParagraphSize, TextSize> = {
  small: 'sm',
  medium: 'base',
  large: 'lg',
};

export const Paragraph: React.FC<ParagraphProps> = ({
  size = 'medium',
  children,
  className,
  noMargin = false,
  lead = false,
  muted = false,
  centered = false,
  ...props
}) => {
  // Base classes applied to all paragraphs - keep font-sans and margin
  const baseClasses = clsx(
    'font-sans',
    !noMargin && 'mb-paragraph'
    // Removed text-center (handled by Text align prop)
    // Removed theme color classes (handled by Text color prop)
  );

  // Determine Text component props based on Paragraph props
  const textSize: TextSize = lead ? 'xl' : paragraphToTextSize[size];
  const textWeight: TextWeight = lead ? 'medium' : 'normal';
  const textAlign = centered ? 'center' : undefined;
  
  // Combine classes - add external className here
  const classes = clsx(
    baseClasses,
    className
    // Removed size/lead classes (handled by Text size/weight props)
  );
  
  return (
    // Use Text component, passing relevant props
    <Text
      as="p"
      size={textSize}
      weight={textWeight}
      color={ (muted ? 'muted' : 'default') satisfies TextColor }
      align={textAlign}
      className={classes} // Apply font-sans, margin, and external class
      {...props}
    >
      {children}
    </Text>
  );
};

export default Paragraph; 