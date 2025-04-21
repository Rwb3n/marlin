import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

// Define the type for individual navigation items
interface NavItem {
  name: string;
  href: string;
  end?: boolean; // Optional 'end' prop for NavLink exact matching
}

// Define the props for the UnderlineNav component
interface UnderlineNavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  className?: string;
}

function UnderlineNav({ items, className, ...props }: UnderlineNavProps) {
  return (
    <nav className={clsx('flex space-x-4', className)} aria-label="Tabs">
      {items.map((item) => {
        // Determine active and inactive classes (assuming these are defined elsewhere or passed)
        // For demonstration, using placeholder classes - replace with actual theme/style classes
        const activeClasses = 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'; // Example active style
        const inactiveClasses =
          'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-700'; // Example inactive style

        return (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.end ?? false} // Use end prop if provided, default to false
            className={({ isActive }) =>
              clsx(
                'group relative inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
                isActive ? activeClasses : inactiveClasses
              )
            }
          >
            {item.name}
            {/* Underline element - shown based on isActive or hover of the parent group */}
            {/* This approach might need refinement based on exact desired hover behavior */}
            {/* <span
              className={clsx(
                'absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500 dark:bg-indigo-400 transition-transform duration-150 ease-in-out',
                // Apply underline style if active, or on group hover if inactive
                isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100' 
              )}
              aria-hidden="true"
            /> */}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default UnderlineNav; 