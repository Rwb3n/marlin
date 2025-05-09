/**
 * Section Component for BLUE MARLIN OS
 * 
 * A standardized page section wrapper that provides consistent vertical spacing,
 * background options, and optional container integration. Used to create
 * well-structured page sections with proper spacing and visual styling.
 */

import React from 'react';
import clsx from 'clsx';
import Container from './Container';

export type SectionSpacing = 'none' | 'small' | 'default' | 'large';
export type SectionBackground = 'none' | 'light' | 'dark' | 'accent';
export type SectionWidth = 'default' | 'narrow' | 'wide' | 'full';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical spacing size for the section */
  spacing?: SectionSpacing;
  /** Background style of the section */
  background?: SectionBackground;
  /** Whether to include a container within the section */
  withContainer?: boolean;
  /** Container width when withContainer is true */
  containerWidth?: SectionWidth;
  /** Whether to include a divider at the bottom of the section */
  withDivider?: boolean;
  /** Component to use for the section (defaults to section HTML element) */
  as?: React.ElementType;
  /** Children to render within the section */
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  spacing = 'default',
  background = 'none',
  withContainer = true,
  containerWidth = 'default',
  withDivider = false,
  as: Component = 'section',
  className,
  children,
  ...props
}) => {
  // Vertical spacing classes
  const spacingClasses = {
    none: 'py-0',
    small: 'py-4 md:py-6',
    default: 'py-8 md:py-12 lg:py-16',
    large: 'py-12 md:py-16 lg:py-24',
  };

  // Determine background classes based on prop using dark: variant
  // We map the prop values to semantic classes
  const backgroundClasses = {
    none: '', // No background class
    default: 'bg-background text-foreground', // Use standard bg/text
    light: 'bg-card text-card-foreground', // Use card bg/text (often slightly off-white/dark)
    dark: 'bg-foreground text-background', // Use inverted bg/text (e.g., black on white / white on black)
    accent: 'bg-accent text-accent-foreground', // Use accent bg/text
  };

  // Divider styling
  const dividerClass = withDivider 
    ? 'border-b border-border' // Use semantic border
    : '';

  // Combine all section classes
  const sectionClasses = clsx(
    // Apply vertical spacing
    spacingClasses[spacing],
    // Apply background styling
    backgroundClasses[background],
    // Apply bottom divider if enabled
    dividerClass,
    // Add custom classes
    className
  );

  // Return the section with proper container wrapping based on props
  return (
    <Component className={sectionClasses} {...props}>
      {withContainer ? (
        <Container width={containerWidth} background="none">
          {children}
        </Container>
      ) : (
        children
      )}
    </Component>
  );
};

export default Section; 