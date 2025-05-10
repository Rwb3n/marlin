import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Link from '../ui/Link';
import Card from '../layout/Card';
import clsx from 'clsx';

/**
 * ProjectCard Component
 * 
 * Displays project information in a card format with image, title, description, and link.
 * Features:
 * - Image container with consistent aspect ratio (conditionally rendered)
 * - Optional status indicator for project state (position adapts to display mode)
 * - Supports both vertical and horizontal layouts
 * - Subtle hover animations for interactive feedback
 * - Theme integration with apex/origin variants
 * - 'homepage' display mode for a minimal, full-width layout
 * 
 * @example Default:
 * <ProjectCard 
 *   title="Autonomous Mapping Vehicle"
 *   description="Advanced seafloor mapping systems using ML-enhanced sonar interpretation."
 *   imageSrc="/images/projects/mapping-vehicle.jpg"
 *   imageAlt="Autonomous Mapping Vehicle"
 *   href="/projects/mapping-vehicle"
 *   status="active"
 * />
 * @example Homepage:
 * <ProjectCard 
 *   title="Autonomous Mapping Vehicle"
 *   description="Advanced seafloor mapping systems..."
 *   href="/projects/mapping-vehicle"
 *   status="active"
 *   displayMode="homepage"
 * />
 */
interface ProjectCardProps {
  /** Additional classes to apply to the card */
  className?: string;
  /** Title of the project */
  title: string;
  /** Short description of the project */
  description?: string;
  /** Image source URL */
  imageSrc?: string;
  /** Image source URL (alias for imageSrc for backward compatibility) */
  image?: string;
  /** Image alt text for accessibility */
  imageAlt?: string;
  /** Link to the project detail page */
  href?: string;
  /** Project ID (used for generating href if not provided) */
  id?: string;
  /** Current status of the project */
  status?: string;
  /** Project category or categories */
  category?: string | string[];
  /** Project year */
  year?: string | number;
  /** Whether this is a highlighted/featured card */
  isHighlighted?: boolean;
  /** Card layout direction (applies to 'default' displayMode) */
  layout?: 'vertical' | 'horizontal';
  /** Display mode: 'default' shows image, 'homepage' shows minimal text/status layout */
  displayMode?: 'default' | 'homepage';
  /** Intro text (alias for description for backward compatibility) */
  intro?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  className = '',
  title,
  description,
  imageSrc,
  image, // Added for compatibility
  imageAlt,
  href,
  id, // Added for compatibility
  status,
  category,
  year,
  isHighlighted = false,
  layout = 'vertical',
  displayMode = 'default', // Default to 'default' mode
  intro, // Added for compatibility
}) => {
  // Handle prop compatibility
  const actualImageSrc = imageSrc || image || '';
  const actualDescription = description || intro || '';
  const actualImageAlt = imageAlt || title || 'Project image';
  const actualHref = href || (id ? `/projects/${id}` : '#');
  
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  // Helper function to capitalize string
  const capitalize = (s?: string): string => {
    if (!s) return '';
    // Handle multi-word statuses like "On Hold" -> "On hold"
    return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  // --- Extracted Status Indicator Component ---
  const StatusIndicator: React.FC<{ currentDisplayMode: 'default' | 'homepage' }> = ({ currentDisplayMode }) => {
    if (!status) return null; // status is from the outer scope (ProjectCardProps)

    const pillColorClasses = getStatusPillClasses(status);
    const basePillStyling = 'px-3 py-1 text-xs font-semibold rounded-full inline-block shadow-sm';
    // const isHomepageMode = currentDisplayMode === 'homepage'; // No longer strictly needed here for positioning

    // Position adjustment: For default mode, ensure it's at the top-right of the content area if image is not shown,
    // or top-left of the image if image is shown. For homepage, it's handled by its own flex container.
    const positionClasses = 
      currentDisplayMode === 'default' && actualImageSrc 
        ? 'absolute top-3 left-3 z-10' // On top of image
        : currentDisplayMode === 'default' && !actualImageSrc 
        ? 'absolute top-3 right-3 z-10' // Top-right of content if no image
        : 'z-10'; // For homepage mode, let flex layout handle it.

    return (
      <div 
        className={clsx(
          basePillStyling,
          pillColorClasses,
          positionClasses
        )}
      >
        {capitalize(status)}
      </div>
    );
  };
  
  // --- Layout Calculation (applies mostly to default mode now) ---
  // Base layout classes for the Card itself (flex direction)
  const cardLayoutClasses = layout === 'horizontal' && displayMode === 'default'
    ? 'md:flex md:flex-row md:items-stretch' // Stretch items in horizontal default mode
    : 'flex flex-col'; // Vertical default or homepage mode

  // Classes for the image container (only relevant in default mode)
  const imageContainerClasses = layout === 'horizontal' && displayMode === 'default'
    ? 'md:w-2/5 md:h-auto md:flex-shrink-0'
    : 'w-full'; // Full width in vertical default mode
    
  // Classes for the main content area wrapper div
  const contentWrapperClasses = clsx(
    // Base padding/width
    'w-full', 
    // Specific adjustments for different modes
    displayMode === 'default' && layout === 'horizontal' && 'md:w-3/5 md:pl-6', // Horizontal default needs padding
    // Align items to the start (top) instead of center for homepage mode
    displayMode === 'homepage' && 'flex justify-between items-start gap-4' 
  );
  
  // --- Status Pill Styling ---
  const getStatusPillClasses = (statusValue?: string): string => {
    const normalizedStatus = statusValue?.toLowerCase().replace(/\s+/g, '-') || 'default';
    
    const statusColorMap = {
      'active': 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100',
      'development': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100',
      'maintenance': 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100',
      'completed': 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200',
      'on-hold': 'bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100',
      'concept': 'bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-purple-100',
      'deployed': 'bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-100',
      'field-testing': 'bg-teal-100 text-teal-700 dark:bg-teal-700 dark:text-teal-100',
      'operational-pilot': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100',
      'default': 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200',
    } as const; // Use 'as const' for stricter key typing

    type StatusKey = keyof typeof statusColorMap;

    if (normalizedStatus in statusColorMap) {
      return statusColorMap[normalizedStatus as StatusKey];
    }
    return statusColorMap.default;
  };

  return (
    <Link 
      href={actualHref}
      aria-label={title}
      variant="wrapper"
      className={clsx(
        "block group rounded-lg",
        "transition-shadow duration-200 ease-in-out",
        "hover:shadow-lg",
        className
      )}
    >
      <Card
        border="thin"
        radius="large"
        shadow="default"
        padding="default" // Keep default padding from Card
        className={clsx(
          'project-card h-full',
          cardLayoutClasses, // Use calculated card layout classes
          isHighlighted && (isLightTheme 
            ? 'border-light-accent/20 bg-light-accent/5' 
            : 'border-dark-accent/20 bg-dark-accent/5'),
        )}
      >
        {/* Conditionally render Image container only in default mode */}
        {displayMode === 'default' && (
          <div className={`relative ${imageContainerClasses}`}>
            {/* Status indicator for default mode (inside image container if image exists) */}
            {actualImageSrc && <StatusIndicator currentDisplayMode={displayMode} />}
            
            {/* Category Label for default mode (bottom-right of image container) */}
            {actualImageSrc && category && (
              <div className="absolute bottom-3 right-3 z-10">
                <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-accent/20 text-accent">
                  {Array.isArray(category) ? category.join(', ') : category}
                </span>
              </div>
            )}

            {/* Apply conditional rounding based on layout */}
            <div className={clsx(
              "relative aspect-video overflow-hidden bg-muted dark:bg-muted/50 rounded-lg", // Apply rounded-lg to the image wrapper
              // layout === 'vertical' && 'rounded-t-lg', // No longer needed, handled by parent Card or direct rounding
              // layout === 'horizontal' && 'md:rounded-l-lg md:rounded-tr-none' // No longer needed
            )}>
              {actualImageSrc ? (
                <img
                  src={actualImageSrc}
                  alt={actualImageAlt}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-lg" // Apply rounded-lg to the image itself
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Main Content Area */}
        <div className={contentWrapperClasses}>
          {/* Status indicator for default mode if no image exists (top-right of content) */}
          {displayMode === 'default' && !actualImageSrc && <StatusIndicator currentDisplayMode={displayMode} />}

          {/* Text Content Wrapper (Left side in homepage mode) */}
          {/* Remove bottom margin from paragraph in homepage mode */}
          <div className={clsx(displayMode === 'homepage' && 'flex-grow')}> 
            {/* Conditionally render category/year text in content area ONLY if NOT (default mode WITH an image) */}
            {(category || year) && !(displayMode === 'default' && actualImageSrc) && (
              <div className="mb-2 flex items-center space-x-2 text-xs text-muted-foreground">
                {category && (
                  <span className="inline-block px-2 py-0.5 font-medium rounded-full bg-accent/20 text-accent">
                    {Array.isArray(category) ? category.join(', ') : category}
                  </span>
                )}
                {year && <span>{year}</span>}
              </div>
            )}
            <h3 className={clsx(
              // Conditional & Responsive font size for title
              displayMode === 'homepage' ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl',
              "font-bold font-display",
              displayMode === 'default' ? "mb-2" : "mb-1" // Reduce margin in homepage mode
            )}>
              {title}
            </h3>
            {actualDescription && (
              <p className={clsx(
                // Conditional & Responsive font size for description
                displayMode === 'homepage' ? 'text-sm sm:text-base' : 'text-sm',
                "opacity-80",
                 displayMode === 'default' && "mb-4" // Only add bottom margin in default mode
              )}>
                {actualDescription}
              </p>
            )}
          </div>

          {/* Status Indicator (Right side in homepage mode) */}
          {displayMode === 'homepage' && (
            <div className="flex-shrink-0"> {/* Prevent status from shrinking */}
                {/* Pass displayMode down */} 
                <StatusIndicator currentDisplayMode={displayMode} />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default ProjectCard; 