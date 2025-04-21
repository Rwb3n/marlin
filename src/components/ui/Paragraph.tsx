/**
 * Paragraph Component for BLUE MARLIN OS
 * 
 * This component implements paragraph text elements with consistent
 * styling, spacing, and size variants. It automatically adapts to the current theme.
 */

import React from 'react';
import clsx from 'clsx';

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
  // Base classes applied to all paragraphs
  const baseClasses = clsx(
    'font-sans',
    !noMargin && 'mb-paragraph',
    centered && 'text-center',
    // Determine text color based on muted prop and theme using dark: prefix
    muted ? 'text-origin-muted dark:text-apex-muted' : 'text-origin-text dark:text-apex-text'
  );
  
  // Size-specific classes
  const sizeClasses = {
    small: 'text-sm leading-normal',
    medium: 'text-base leading-normal',
    large: 'text-lg leading-normal',
  };
  
  // If lead style is applied, override with lead-specific styling
  const leadClasses = lead ? 'text-xl md:text-2xl leading-tight font-medium' : '';
  
  // Combine all classes
  const classes = clsx(
    baseClasses,
    lead ? leadClasses : sizeClasses[size],
    className
  );
  
  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
};

export default Paragraph; 