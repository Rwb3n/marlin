/**
 * Text Component for BLUE MARLIN OS
 * 
 * This component provides a consistent way to display inline text
 * with different sizes, weights, styles, and colors based on the
 * current theme.
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextStyle = 'normal' | 'italic' | 'underline';
export type TextColor = 'default' | 'muted' | 'accent' | 'white';
export type TextAlign = 'left' | 'center' | 'right';
export type TextTruncate = boolean | number;

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Font size variant */
  size?: TextSize;
  /** Font weight variant */
  weight?: TextWeight;
  /** Text style variant */
  textStyle?: TextStyle;
  /** Text color variant */
  color?: TextColor;
  /** Text alignment */
  align?: TextAlign;
  /** Whether to truncate text with ellipsis (or specify max lines) */
  truncate?: TextTruncate;
  /** Whether text should not wrap */
  nowrap?: boolean;
  /** HTML element to render text as */
  as?: React.ElementType;
}

export const Text = forwardRef<HTMLSpanElement, TextProps>(({
  children,
  size = 'base',
  weight = 'normal',
  textStyle = 'normal',
  color = 'default',
  align,
  truncate = false,
  nowrap = false,
  className,
  as: Component = 'span',
  ...props
}, ref) => {
  // Size classes
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  
  // Weight classes
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  // Style classes
  const styleClasses = {
    normal: '',
    italic: 'italic',
    underline: 'underline',
  };
  
  // Color classes
  const colorClasses: Record<TextColor, string> = {
    default: 'text-origin-text dark:text-apex-text',
    muted: 'text-origin-muted dark:text-apex-muted',
    accent: 'text-origin-accent dark:text-apex-accent',
    white: 'text-white',
  };
  
  // Alignment classes
  const alignClasses = align ? `text-${align}` : '';
  
  // Truncation and wrapping classes
  let truncateClasses = '';
  if (truncate === true) {
    truncateClasses = 'truncate';
  } else if (typeof truncate === 'number' && truncate > 1) {
    truncateClasses = `line-clamp-${truncate}`;
  }
  
  const wrapClasses = nowrap ? 'whitespace-nowrap' : '';
  
  // Combined classes
  const classes = clsx(
    sizeClasses[size],
    weightClasses[weight],
    styleClasses[textStyle],
    colorClasses[color],
    alignClasses,
    truncateClasses,
    wrapClasses,
    className
  );
  
  return (
    <Component 
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
});

// Display name for debugging
Text.displayName = 'Text';

export default Text; 