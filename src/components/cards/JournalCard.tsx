import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Link from '../ui/Link';
import clsx from 'clsx';
import { Paragraph } from '../ui/Paragraph';
import Card from '../layout/Card';

/**
 * JournalCard Component
 * 
 * Displays a journal entry in a card format featuring date, title, excerpt, and a read more link.
 * Features:
 * - Responsive design that adapts to container width
 * - Subtle hover animation for interactive feedback 
 * - Theme integration with apex/origin variants
 * - Support for highlighted/featured entries
 * - Truncated excerpt with configurable line count
 * 
 * @example
 * <JournalCard 
 *   date="04.12.2025"
 *   title="Underwater Visibility Enhancements"
 *   excerpt="Exploring new techniques for improving light shaft rendering..."
 *   href="/journal/underwater-visibility"
 *   isHighlighted={true}
 * />
 */
interface JournalCardProps {
  /** Additional classes to apply to the card */
  className?: string;
  /** Publication date of the journal entry */
  date: string;
  /** Title of the journal entry */
  title: string;
  /** Short excerpt or description of the entry */
  excerpt?: string;
  /** Link to the full journal entry */
  href: string;
  /** Whether this is a highlighted/featured card */
  isHighlighted?: boolean;
  /** Maximum number of lines to show in the excerpt */
  excerptLines?: number;
}

const JournalCard: React.FC<JournalCardProps> = ({
  className = '',
  date,
  title,
  excerpt,
  href,
  isHighlighted = false,
  excerptLines = 3,
}) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Date text color
  const dateColor = isLightTheme ? 'text-light-muted' : 'text-dark-muted';

  // Wrap the Card with Link
  return (
    <Link 
      href={href}
      aria-label={title} // Use title for accessibility
      variant="wrapper" // Use the new wrapper variant
      className={clsx(
        "block group rounded-lg", // Removed focus:outline-none, focus:ring-*, focus:ring-offset-*
        "transition-shadow duration-200 ease-in-out", // Add smooth shadow transition
        "hover:shadow-lg", // Add hover shadow effect directly to the link
        className // Apply external className to the Link wrapper
      )}
      role="article" // Move role to the link wrapper
    >
      <Card 
        // Defaults: border="thin", radius="large", shadow="default", padding="default"
        // Keep padding="default" here as JournalCard content relies on it?
        // Let's assume Card handles internal padding. If not, adjust below div.
        padding="default" // Keep padding for the card container itself
        // hoverable={true} // Removed: hover state now handled by Link's group hover
        className={clsx(
          'journal-card flex flex-col h-full', // Ensure card takes full height within link
          // Apply highlighted styles conditionally (group state comes from Link)
          isHighlighted && (isLightTheme 
            ? 'border-light-accent/20 bg-light-accent/5' 
            : 'border-dark-accent/20 bg-dark-accent/5'),
          // Do NOT pass className here, it's on the Link wrapper
        )}
        // Remove role="article" as it's moved to the Link wrapper
      >
        {/* Inner content - Keep existing padding? Check Card's default padding behavior */}
        {/* Assuming Card applies p-5 by default. If not, add p-5 here. */}
        <div className="flex flex-col flex-grow"> {/* Remove p-5 if Card provides it */}
          {/* Date and Tags */} 
          <div className="flex justify-between items-center mb-2">
            <time dateTime={date} className={`text-sm font-mono uppercase ${dateColor}`}>
              {date}
            </time>
            {/* Optional: Add tags here if needed */}
          </div>
        
          {/* Title - REMOVE Link wrapper */}
          <h2 className="text-xl font-bold mb-3 font-display">
            {/* Title is now plain text within the card link */}
            {title}
          </h2>
        
          {/* Excerpt - Apply line-clamp directly */}
          {excerpt && (
            <Paragraph 
              className={clsx(
                'text-sm opacity-80 mb-4 flex-grow',
                `line-clamp-${excerptLines}`
              )}
            >
              {excerpt}
            </Paragraph>
          )}
        
          {/* Read More Link - REMOVED */}
          {/* 
          <div className="mt-auto">
            <Link ...>
              Read More
              <span ...>→</span>
            </Link>
          </div> 
          */}
        </div>
      </Card>
    </Link>
  );
};

export default JournalCard; 