/**
 * SectionHeader Component for BLUE MARLIN OS
 * 
 * A standardized section header component that provides consistent title, subtitle, 
 * and optional accent styling for page sections throughout the application.
 */

import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';

export interface SectionHeaderProps {
  /**
   * Main title text for the section
   */
  title: string;
  
  /**
   * Optional accent word within the title (will be highlighted)
   */
  accentWord?: string;
  
  /**
   * Optional subtitle or description text
   */
  subtitle?: string | React.ReactNode;
  
  /**
   * Whether to center the header content
   */
  centered?: boolean;
  
  /**
   * Whether to include a divider below the header
   */
  withDivider?: boolean;
  
  /**
   * Spacing below the header component
   */
  spacing?: 'small' | 'default' | 'large';
  
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * SectionHeader component
 * 
 * Provides a consistent pattern for section headers across the application with:
 * - Main title with optional accent word highlighting
 * - Optional subtitle or description
 * - Configurable alignment and spacing
 * - Optional divider below the header
 * 
 * Used across different section components to maintain visual consistency.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  accentWord,
  subtitle,
  centered = true, 
  withDivider = false,
  spacing = 'default',
  className = '',
}) => {
  const { theme } = useTheme();
  
  // Determine accent color using Tailwind dark: variant
  const accentColorClass = 'text-origin-accent dark:text-apex-accent';
  
  // Configure spacing classes based on the spacing prop
  const spacingClasses = {
    small: 'mb-4',
    default: 'mb-8',
    large: 'mb-12',
  };
  
  // Create a title with an optional highlighted accent word if provided
  const renderTitle = () => {
    if (accentWord) {
      // Split the title to find the accent word position
      const titleParts = title.split(accentWord);
      
      return (
        <h2 className="text-3xl font-bold mb-4 font-display">
          {titleParts[0]}
          <span className={accentColorClass}>{accentWord}</span>
          {titleParts[1]}
        </h2>
      );
    }
    
    return <h2 className="text-3xl font-bold mb-4 font-display">{title}</h2>;
  };
  
  return (
    <div 
      className={clsx(
        'section-header',
        centered && 'text-center',
        spacingClasses[spacing],
        withDivider && 'border-b border-origin-border dark:border-apex-border pb-4',
        className
      )}
    >
      {renderTitle()}
      
      {subtitle && (
        typeof subtitle === 'string' 
          ? <p className="text-lg opacity-80 max-w-2xl mx-auto">{subtitle}</p>
          : subtitle
      )}
    </div>
  );
};

export default SectionHeader; 