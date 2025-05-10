/**
 * Card Component for BLUE MARLIN OS
 * 
 * A flexible card component providing a container with consistent styling for content.
 * Supports various border, shadow, and padding options for different visual appearances.
 * Commonly used for displaying grouped content with a distinct visual boundary.
 * 
 * @note For full-card link behavior, the recommended pattern is to wrap this Card
 *       (with hoverable=false and clickable=false) inside a <Link variant="wrapper"> component.
 *       The Link wrapper will handle the hover/focus states and accessibility.
 */

import React from 'react';
import clsx from 'clsx';

export type CardPadding = 'none' | 'small' | 'default' | 'large';
export type CardBorder = 'none' | 'thin' | 'default' | 'thick';
export type CardShadow = 'none' | 'small' | 'default' | 'large';
export type CardRadius = 'none' | 'small' | 'default' | 'large' | 'full';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding size inside the card */
  padding?: CardPadding;
  /** Border style of the card */
  border?: CardBorder;
  /** Shadow depth of the card */
  shadow?: CardShadow;
  /** Border radius of the card corners */
  radius?: CardRadius;
  /** Whether to apply hover effects to the card */
  hoverable?: boolean;
  /** Whether the card should be displayed as clickable */
  clickable?: boolean;
  /** Optional element to render as the card header */
  header?: React.ReactNode;
  /** Optional element to render as the card footer */
  footer?: React.ReactNode;
  /** Main content of the card */
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  padding = 'default',
  border = 'thin',
  shadow = 'default',
  radius = 'large',
  hoverable = false,
  clickable = false,
  header,
  footer,
  className,
  children,
  ...props
}) => {
  // Theme-specific classes using light/dark convention
  const themeBgClass = 'bg-light-bg-card dark:bg-dark-bg-card';
  const themeTextClass = 'text-light-text dark:text-dark-text';
  const themeBorderClass = 'border-light-border dark:border-dark-border';
  const themeFocusRingClass = 'focus:ring-light-accent dark:focus:ring-dark-accent';
  
  // Combine base theme classes
  const baseThemeClasses = clsx(themeBgClass, themeTextClass);

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    default: 'p-5',
    large: 'p-6 md:p-8',
  };

  // Border classes (updated to use themeBorderClass)
  const borderClasses = {
    none: 'border-0',
    thin: `border ${themeBorderClass}`,
    default: `border-2 ${themeBorderClass}`,
    thick: `border-4 ${themeBorderClass}`,
  };

  // Shadow classes
  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    default: 'shadow',
    large: 'shadow-md',
  };

  // Border radius classes
  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    default: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full',
  };

  // Hover effect classes
  const hoverClasses = hoverable
    ? 'transition-all duration-200 ease-in-out hover:shadow-lg'
    : '';

  // Clickable style classes (updated focus ring)
  const clickableClasses = clickable
    ? `cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 ${themeFocusRingClass}`
    : '';

  // Combine all classes
  const cardClasses = clsx(
    'rounded-lg transition-shadow duration-200 ease-in-out', 
    baseThemeClasses, // Apply base theme bg/text
    paddingClasses[padding],
    borderClasses[border], // Apply themed border
    shadowClasses[shadow],
    radiusClasses[radius],
    hoverClasses,
    clickableClasses, // Apply themed clickable focus
    className
  );

  // Common padding for header and footer
  const headerFooterPadding = padding === 'none' ? 'p-0' : paddingClasses[padding];
  
  return (
    <div className={cardClasses} {...props}>
      {header && (
        // Use themed border for header/footer dividers
        <div className={clsx(
          `border-b ${themeBorderClass} mb-4`,
          padding !== 'none' && '-mx-5 -mt-5 mb-5',
          headerFooterPadding
        )}>
          {header}
        </div>
      )}
      
      {children}
      
      {footer && (
        // Use themed border for header/footer dividers
        <div className={clsx(
          `border-t ${themeBorderClass} mt-4`,
          padding !== 'none' && '-mx-5 -mb-5 mt-5',
          headerFooterPadding
        )}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 