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
    ? 'bg-muted'      // Use semantic background for block
    : 'bg-muted/50';  // Use lighter semantic background for inline

  // Base classes applied to all code elements
  const baseClasses = clsx(
    'font-mono',
    bgClass,
    'text-accent', // Use semantic text color
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