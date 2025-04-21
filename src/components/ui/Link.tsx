/**
 * Link Component for BLUE MARLIN OS
 * 
 * This component implements styled links with external/internal detection,
 * hover effects, and consistent styling. It automatically adapts to the current theme.
 */

import React from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

// Define link variants
export type LinkVariant = 'default' | 'muted' | 'cardAction' | 'tag' | 'subtle' | 'nav' | 'wrapper';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** URL the link points to (can be internal or external) */
  href: string;
  /** Content of the link */
  children: React.ReactNode;
  /** Optional additional CSS classes */
  className?: string;
  /** Link style variant */
  variant?: LinkVariant;
  /** @deprecated Use variant="muted" instead */
  muted?: boolean; 
  /** Whether the link should not have the default underline hover effect (overrides variant default) */
  noUnderline?: boolean;
  /** Whether to show an external icon for external links */
  showExternalIcon?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href = '#', 
  children,
  className,
  variant = 'default', // Default variant
  muted, // Keep for backward compatibility check
  noUnderline = false,
  showExternalIcon = true,
  ...props
}) => {
  // Determine if this is an external link
  const isExternal = href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:');

  // Set appropriate props for external links
  const externalProps = isExternal ? {
    target: '_blank',
    rel: 'noopener noreferrer',
  } : {};

  // Handle deprecated `muted` prop
  const effectiveVariant = muted ? 'muted' : variant;

  // Base classes applied to all links
  const baseClasses = 'transition-colors duration-fast focus:outline-none';
  
  // Variant-specific classes
  const variantClasses = clsx({
    // Default: Accent color, underline hover
    'text-origin-accent dark:text-apex-accent hover:opacity-80': effectiveVariant === 'default',
    // Muted: Muted color, underline hover
    'text-origin-muted dark:text-apex-muted hover:text-origin-text dark:hover:text-apex-text': effectiveVariant === 'muted',
    // Card Action: Accent color, bold, slightly different hover, often used with icons
    'inline-flex items-center text-sm font-semibold text-origin-accent dark:text-apex-accent hover:opacity-90': effectiveVariant === 'cardAction',
    // Tag: Badge-like appearance
    'inline-block text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded no-underline': effectiveVariant === 'tag',
    // Subtle: Explicit foreground color, primary on hover, NO underline on hover
    'text-foreground hover:text-primary hover:no-underline focus:text-primary': effectiveVariant === 'subtle',
    // Nav: Explicit foreground color, specific hover/focus
    'text-sm font-medium text-foreground hover:opacity-80 focus:text-primary': effectiveVariant === 'nav',
    // Wrapper: No specific color, allows content to define color. No underline.
    '': effectiveVariant === 'wrapper',
  });

  // Hover underline logic (do not apply for wrapper)
  const hoverUnderline = !noUnderline && effectiveVariant !== 'tag' && effectiveVariant !== 'cardAction' && effectiveVariant !== 'wrapper' ? 'hover:underline' : '';

  const combinedClasses = clsx(
    baseClasses,
    variantClasses,
    hoverUnderline,
    className // Allow external overrides
  );

  // External link rendering
  if (isExternal) {
    return (
      <a
        href={href}
        className={combinedClasses}
        {...externalProps}
        {...props} // Pass remaining props
      >
        {children}
        {showExternalIcon && (
          <span className="ml-1 inline-block align-middle text-xs" aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }

  // Internal link rendering using React Router
  // NOTE: If activeClassName logic is needed, use NavLink from react-router-dom directly
  return (
    <RouterLink
      to={href} // Use 'to' prop for React Router Link
      className={combinedClasses}
      {...props} // Pass remaining props (aria-label, etc.)
    >
      {children}
    </RouterLink>
  );
};

export default Link; 