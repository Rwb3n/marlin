/**
 * Stack Component for BLUE MARLIN OS
 * 
 * A layout component for creating vertical or horizontal stacks with consistent spacing.
 * Simplifies flex layouts with appropriate spacing and alignment controls.
 * Can switch direction responsively based on screen size breakpoints.
 */

import React from 'react';
import clsx from 'clsx';

export type StackDirection = 'vertical' | 'horizontal' | 'horizontal-reverse' | 'responsive';
export type StackSpacing = 'none' | 'xsmall' | 'small' | 'default' | 'large' | 'xlarge';
export type StackAlignment = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the stack layout */
  direction?: StackDirection;
  /** Spacing between stack items */
  spacing?: StackSpacing;
  /** Alignment of items along the main axis */
  align?: StackAlignment;
  /** Cross-axis alignment of items */
  crossAlign?: StackAlignment;
  /** Whether the stack should wrap items */
  wrap?: boolean;
  /** Whether this stack is an inline element */
  inline?: boolean;
  /** Breakpoint at which responsive stacks switch from vertical to horizontal */
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  /** Children to render within the stack */
  children: React.ReactNode;
}

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  spacing = 'default',
  align = 'start',
  crossAlign = 'start',
  wrap = false,
  inline = false,
  breakpoint = 'md',
  className,
  children,
  ...props
}) => {
  // Direction classes
  const getDirectionClasses = () => {
    switch (direction) {
      case 'horizontal':
        return 'flex-row';
      case 'horizontal-reverse':
        return 'flex-row-reverse';
      case 'responsive':
        return `flex-col ${breakpoint}:flex-row`;
      case 'vertical':
      default:
        return 'flex-col';
    }
  };

  // Spacing classes
  const spacingClasses = {
    none: 'gap-0',
    xsmall: 'gap-1',
    small: 'gap-2',
    default: 'gap-4',
    large: 'gap-6',
    xlarge: 'gap-8',
  };

  // Alignment classes along the main axis
  const alignmentClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  // Cross-axis alignment classes
  const crossAlignmentClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    between: 'items-stretch', // Special case for 'between' on cross-axis
    around: 'items-stretch',  // Special case for 'around' on cross-axis
  };

  // Build the final class list
  const stackClasses = clsx(
    // Base flex display type
    inline ? 'inline-flex' : 'flex',
    // Direction based on props
    getDirectionClasses(),
    // Gap between items
    spacingClasses[spacing],
    // Alignment along main axis
    alignmentClasses[align],
    // Cross-axis alignment
    crossAlignmentClasses[crossAlign],
    // Wrapping behavior
    wrap && 'flex-wrap',
    // Custom classes
    className
  );

  return (
    <div className={stackClasses} {...props}>
      {children}
    </div>
  );
};

export default Stack; 