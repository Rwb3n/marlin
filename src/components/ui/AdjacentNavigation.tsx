import React from 'react';
import { Link } from 'react-router-dom'; // Use react-router-dom Link
import clsx from 'clsx';

interface AdjacentItem {
  id: string;
  title: string;
  pathPrefix: string; // e.g., '/projects' or '/journal'
}

interface AdjacentNavigationProps {
  prevItem: AdjacentItem | null;
  nextItem: AdjacentItem | null;
  prevLabel: string;
  nextLabel: string;
  className?: string;
  // Add theme-related props if necessary, or use context
  themeBorderColor?: string; // Example: pass border color from parent
}

const AdjacentNavigation: React.FC<AdjacentNavigationProps> = ({
  prevItem,
  nextItem,
  prevLabel,
  nextLabel,
  className = '',
  themeBorderColor = 'border-border' // Default border color
}) => {
  // Only render the nav if there's at least one item
  if (!prevItem && !nextItem) {
    return null;
  }

  return (
    <nav 
      className={clsx(
        'mt-12 pt-8 border-t',
        themeBorderColor, 
        'flex flex-col sm:flex-row justify-between gap-4',
        className
      )}
      aria-label="Adjacent Content Navigation"
    >
      {/* Previous Item Link */}
      {prevItem ? (
        <Link 
          to={`${prevItem.pathPrefix}/${prevItem.id}`} 
          className="block p-4 bg-card border border-gray-300 dark:border-border rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-lg text-left group no-underline focus:outline-none"
        >
          <span className="text-sm text-muted-foreground group-hover:text-primary block mb-1 transition-colors">
            {prevLabel}
          </span>
          <span className="font-semibold text-foreground text-base group-hover:text-primary transition-colors">
            {prevItem.title}
          </span>
        </Link>
      ) : (
        // Render an empty div to maintain spacing with justify-between
        <div />
      )}
      
      {/* Next Item Link */}
      {nextItem ? (
        <Link 
          to={`${nextItem.pathPrefix}/${nextItem.id}`} 
          className="block p-4 bg-card border border-gray-300 dark:border-border rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-lg text-left sm:text-right group no-underline focus:outline-none"
        >
          <span className="text-sm text-muted-foreground group-hover:text-primary block mb-1 transition-colors">
            {nextLabel}
          </span>
          <span className="font-semibold text-foreground text-base group-hover:text-primary transition-colors">
            {nextItem.title}
          </span>
        </Link>
      ) : (
         // Render an empty div to maintain spacing with justify-between
        <div />
      )}
    </nav>
  );
};

export default AdjacentNavigation; 