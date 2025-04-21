/**
 * Grid Component for BLUE MARLIN OS
 * 
 * A responsive grid layout component powered by CSS Grid.
 * Provides flexible column configurations, gap controls, and responsive behavior.
 * Used for creating aligned multi-column layouts that adapt to different screen sizes.
 */

import React from 'react';
import clsx from 'clsx';

export type GridGap = 'none' | 'small' | 'default' | 'large';
export type GridAlignment = 'start' | 'center' | 'end' | 'stretch';
export type GridAutoFit = boolean;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns (default responsive behavior if not specified) */
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  /** Gap size between grid items */
  gap?: GridGap;
  /** Auto-fit mode allows items to dynamically fill width with min/max sizes */
  autoFit?: boolean;
  /** Minimum item width when using autoFit mode */
  minItemWidth?: string;
  /** Vertical alignment of grid items */
  alignItems?: GridAlignment;
  /** Horizontal alignment of grid items */
  justifyItems?: GridAlignment;
  /** Children to render within the grid */
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
  columns,
  gap = 'default',
  autoFit = false,
  minItemWidth = '250px',
  alignItems = 'stretch',
  justifyItems = 'stretch',
  className,
  children,
  ...rest
}) => {
  // Gap classes for different spacing options
  const gapClasses = {
    none: 'gap-0',
    small: 'gap-3',
    default: 'gap-6',
    large: 'gap-8 md:gap-10',
  };

  // Alignment classes
  const alignItemsClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyItemsClasses = {
    start: 'justify-items-start',
    center: 'justify-items-center',
    end: 'justify-items-end',
    stretch: 'justify-items-stretch',
  };

  // Function to generate grid template columns CSS
  const getColumnsClass = () => {
    // const columns = columnsProp; // No longer needed

    // Handle explicit numeric value
    if (typeof columns === 'number') {
      return `grid-cols-${columns}`;
    }

    // Handle responsive column object
    if (typeof columns === 'object') {
      let gridColsClasses = `grid-cols-${columns.xs || 1}`;
      let lastCols = columns.xs || 1;
      if (columns.sm) { gridColsClasses += ` sm:grid-cols-${columns.sm}`; lastCols = columns.sm; }
      else if (lastCols) { gridColsClasses += ` sm:grid-cols-${lastCols}`; }
      
      if (columns.md) { gridColsClasses += ` md:grid-cols-${columns.md}`; lastCols = columns.md; }
      else if (lastCols) { gridColsClasses += ` md:grid-cols-${lastCols}`; }

      if (columns.lg) { gridColsClasses += ` lg:grid-cols-${columns.lg}`; lastCols = columns.lg; }
      else if (lastCols) { gridColsClasses += ` lg:grid-cols-${lastCols}`; }

      if (columns.xl) { gridColsClasses += ` xl:grid-cols-${columns.xl}`; lastCols = columns.xl; }
      else if (lastCols) { gridColsClasses += ` xl:grid-cols-${lastCols}`; }
      
      return gridColsClasses;
    }
    
    // Default only if columns prop is undefined (or null, technically)
    if (columns == null) { 
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }

    // Fallback if columns prop is something unexpected (e.g., a string)
    return 'grid-cols-1'; 
  };

  // Build the final class list
  const gridClasses = clsx(
    'grid',
    gapClasses[gap || 'default'],
    alignItemsClasses[alignItems || 'stretch'],
    justifyItemsClasses[justifyItems || 'stretch'],
    // Directly use the result, only if not autoFit
    !autoFit && getColumnsClass(),
    className
  );

  return (
    <div
      className={gridClasses}
      // Apply style only if autoFit is enabled
      style={autoFit ? { gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}, 1fr))` } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Grid; 