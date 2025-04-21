/**
 * Code Component for BLUE MARLIN OS
 * 
 * This component implements styled code elements for both inline
 * and block display. It automatically adapts to the current theme.
 */

import React from 'react';
import clsx from 'clsx';

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of the code block */
  children: React.ReactNode;
  /** Optional additional CSS classes */
  className?: string;
  /** Whether to display as a block (pre) rather than inline */
  block?: boolean;
}

export const Code: React.FC<CodeProps> = ({
  children,
  className,
  block = false,
  ...props
}) => {
  // Determine background color based on inline prop and theme
  const bgClass = block 
    ? 'bg-origin-bg-code dark:bg-apex-bg-code'      // Default background for block
    : 'bg-origin-bg-code/10 dark:bg-apex-bg-code/10'; // Lighter background for inline

  // Base classes applied to all code elements
  const baseClasses = clsx(
    'font-mono',
    bgClass,
    'text-origin-accent dark:text-apex-accent',
    'rounded',
    block 
      ? 'block p-4 overflow-x-auto mb-paragraph' 
      : 'inline-block px-1.5 py-0.5',
    className
  );
  
  if (block) {
    return (
      <pre className={baseClasses} {...props}>
        <code>{children}</code>
      </pre>
    );
  }
  
  return (
    <code className={baseClasses} {...props}>
      {children}
    </code>
  );
};

export default Code; 