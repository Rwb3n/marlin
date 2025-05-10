import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';
import Link from './Link';
import clsx from 'clsx';

/**
 * ErrorDisplay Component
 * 
 * A standardized error UI component that displays error messages with
 * consistent styling based on severity level. It supports different
 * error types and provides a way to retry or go back.
 * 
 * Features:
 * - Different severity levels (info, warning, error, critical)
 * - Theme-aware design that adapts to light/dark modes
 * - Optional retry and back actions
 * - Customizable error title and message
 */
export interface ErrorDisplayProps {
  /** Title of the error */
  title: string;
  /** Detailed error message */
  message: string;
  /** Severity level of the error */
  severity?: 'info' | 'warning' | 'error' | 'critical';
  /** Function to retry the operation that caused the error */
  onRetry?: () => void;
  /** URL to navigate back to */
  backLink?: string;
  /** Label for the back button */
  backLabel?: string;
  /** Icon element to display alongside the error */
  icon?: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * ErrorDisplay component renders a themed error message with customizable severity and actions
 */
export default function ErrorDisplay({
  title,
  message,
  severity = 'error',
  onRetry,
  backLink,
  backLabel = 'Go Back',
  icon,
  className = '',
}: ErrorDisplayProps) {
  const { theme } = useTheme();

  // --- Determine Semantic Color Classes based on Severity ---
  let severityPrefix: 'destructive' | 'warning' | 'info';
  switch (severity) {
    case 'info':
      severityPrefix = 'info';
      break;
    case 'warning':
      severityPrefix = 'warning';
      break;
    case 'critical':
    case 'error':
    default:
      severityPrefix = 'destructive';
      break;
  }

  const containerBgClass = `bg-${severityPrefix}/10`; // Use a subtle background tint
  const containerBorderClass = `border-${severityPrefix}/40`;
  const textColorClass = `text-${severityPrefix}`; // Main text color
  const iconColorClass = `text-${severityPrefix}`; // Icon color same as text
  // For buttons/links, use the main color as bg and foreground as text
  const actionBgClass = `bg-${severityPrefix}`; 
  const actionTextClass = `text-${severityPrefix}-foreground`;
  const actionHoverBgClass = `hover:bg-${severityPrefix}/80`; // Slightly faded hover

  // Default icons for each severity type if none provided
  const defaultIcon = () => {
    switch (severity) {
      case 'info':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'critical':
      case 'error':
      default:
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div
      role="alert"
      className={clsx(
        'border rounded-md p-4 flex items-start space-x-3',
        containerBgClass,
        containerBorderClass,
        className
      )}
    >
      <div className={clsx("flex-shrink-0", iconColorClass)}>
        {icon || defaultIcon()}
      </div>
      <div className="flex-1">
        <h3 className={clsx("font-medium", textColorClass)}>{title}</h3>
        <div className={clsx("mt-1 text-sm", textColorClass, 'opacity-90')}>
          {message}
        </div>
        
        {/* Action buttons */}
        {(onRetry || backLink) && (
          <div className="mt-4 flex gap-4">
            {onRetry && (
              <Button 
                onClick={onRetry}
                size="small"
                className={clsx(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  actionBgClass,
                  actionTextClass,
                  actionHoverBgClass
                )}
              >
                Try Again
              </Button>
            )}
            
            {backLink && (
              <Link 
                href={backLink}
                className={clsx(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors inline-flex items-center justify-center no-underline',
                  actionBgClass,
                  actionTextClass,
                  actionHoverBgClass
                )}
              >
                {backLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 