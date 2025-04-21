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
 * - Image container with consistent aspect ratio
 * - Optional status indicator for project state
 * - Supports both vertical and horizontal layouts
 * - Subtle hover animations for interactive feedback
 * - Theme integration with apex/origin variants
 * 
 * @example
 * <ProjectCard 
 *   title="Autonomous Mapping Vehicle"
 *   description="Advanced seafloor mapping systems using ML-enhanced sonar interpretation."
 *   imageSrc="/images/projects/mapping-vehicle.jpg"
 *   imageAlt="Autonomous Mapping Vehicle"
 *   href="/projects/mapping-vehicle"
 *   status="active"
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
  status?: 'active' | 'maintenance' | 'development';
  /** Whether this is a highlighted/featured card */
  isHighlighted?: boolean;
  /** Card layout direction */
  layout?: 'vertical' | 'horizontal';
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
  isHighlighted = false,
  layout = 'vertical',
  intro, // Added for compatibility
}) => {
  // Handle prop compatibility
  const actualImageSrc = imageSrc || image || '';
  const actualDescription = description || intro || '';
  const actualImageAlt = imageAlt || title || 'Project image';
  const actualHref = href || (id ? `/projects/${id}` : '#');
  
  const { theme } = useTheme();

  // Determine theme-based classes needed for elements *inside* the card
  const isLightTheme = theme === 'light';
  const textColorClass = isLightTheme ? 'text-light-text' : 'text-dark-text';
  const accentColorClass = isLightTheme ? 'text-light-accent' : 'text-dark-accent';

  // Status indicator styling
  const statusColors = {
    active: isLightTheme ? 'bg-green-500' : 'bg-green-400',
    maintenance: isLightTheme ? 'bg-yellow-500' : 'bg-yellow-400',
    development: isLightTheme ? 'bg-blue-500' : 'bg-blue-400',
  };
  
  // Status label text
  const statusLabels = {
    active: 'Active',
    maintenance: 'Maintenance',
    development: 'Development',
  };
  
  // Layout classes
  const layoutClasses = layout === 'horizontal'
    ? 'md:flex md:flex-row md:items-center'
    : 'flex flex-col';
    
  const imageContainerClasses = layout === 'horizontal'
    ? 'md:w-2/5 md:h-auto md:flex-shrink-0'
    : 'w-full';
    
  const contentClasses = layout === 'horizontal'
    ? 'md:w-3/5 md:pl-6'
    : 'w-full';
  
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
        padding="none"
        className={clsx(
          'project-card h-full',
          layoutClasses,
          isHighlighted && (isLightTheme 
            ? 'border-light-accent/20 bg-light-accent/5' 
            : 'border-dark-accent/20 bg-dark-accent/5'),
        )}
      >
        <div className={`relative ${imageContainerClasses}`}>
          {status && (
            <div 
              className={clsx(
                'absolute top-3 left-3 z-10',
                'px-2 py-1 rounded-full text-xs font-medium',
                statusColors[status], 
                'text-white',
                'shadow-sm'
              )}
            >
              {statusLabels[status]}
            </div>
          )}
          
          {/* Apply conditional rounding based on layout */}
          <div className={clsx(
            "relative aspect-video overflow-hidden bg-gray-800",
            layout === 'vertical' && 'rounded-t-lg', // Round top corners for vertical layout
            layout === 'horizontal' && 'md:rounded-l-lg md:rounded-tr-none' // Round left corners for horizontal layout (override top-right)
          )}>
            {actualImageSrc ? (
              <img
                src={actualImageSrc}
                alt={actualImageAlt}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>
        </div>
        
        <div className={clsx('p-5', contentClasses)}>
          <h3 className="text-xl font-bold mb-2 font-display">{title}</h3>
          <p className="text-sm opacity-80 mb-4">{actualDescription}</p>
        </div>
      </Card>
    </Link>
  );
}

export default ProjectCard; 