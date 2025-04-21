/**
 * Textarea Component for BLUE MARLIN OS
 * 
 * This component implements multiline text inputs with labels, validation states,
 * and helper/error text. It shares patterns with the Input component and 
 * automatically adapts to the current theme.
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Unique ID for the textarea (required for label association) */
  id: string;
  /** Label text to display above the textarea */
  label: string;
  /** Error message to display (triggers error state) */
  error?: string;
  /** Whether the textarea has valid data */
  isValid?: boolean;
  /** Whether the textarea should take full width of its container */
  fullWidth?: boolean;
  /** Helper text to display below the textarea */
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  id,
  label,
  error,
  isValid,
  fullWidth = true,
  helperText,
  className,
  required,
  disabled,
  rows = 4,
  ...props
}, ref) => {
  // Determine validation state
  const hasError = !!error;
  const validationState = hasError ? 'error' : isValid ? 'success' : 'default';
  
  // Define base and theme-specific classes using dark: variant
  const baseTextClass = 'text-origin-text dark:text-apex-text';
  const baseBorderClass = 'border-origin-muted dark:border-apex-muted';
  const focusBorderClass = 'focus:border-origin-accent dark:focus:border-apex-accent';
  const focusRingClass = 'focus:ring-origin-accent/20 dark:focus:ring-apex-accent/20';
  const hoverBorderClass = 'hover:border-origin-accent dark:hover:border-apex-accent';
  const errorTextClass = 'text-danger'; // Assuming danger color is theme-independent
  const errorBorderClass = 'border-danger';
  const errorFocusRingClass = 'focus:ring-danger/20';
  const successBorderClass = 'border-success';
  const successFocusRingClass = 'focus:ring-success/20';
  const placeholderClass = 'placeholder:text-origin-muted dark:placeholder:text-apex-muted';
  const bgClass = 'bg-origin-bg-card dark:bg-apex-bg-card'; // Example, adjust if needed
  
  // Container classes
  const containerClasses = clsx(
    'relative',
    fullWidth && 'w-full',
    disabled && 'opacity-60',
    className
  );
  
  // Label classes
  const labelClasses = clsx(
    'block mb-2 font-medium',
    hasError ? 'text-danger' : 'text-apex-text theme-origin:text-origin-text'
  );
  
  // Textarea field classes
  const textareaClasses = clsx(
    'block rounded px-4 py-3 w-full bg-transparent border focus:outline-none transition-all',
    bgClass,
    placeholderClass,
    disabled ? 'opacity-50 cursor-not-allowed' : hoverBorderClass,
    hasError ? errorTextClass : baseTextClass,
    {
      // Apply error styling if hasError is true
      [clsx(errorBorderClass, errorFocusRingClass)]: hasError,
      // Apply success styling if success is true and no error
      [clsx(successBorderClass, successFocusRingClass)]: isValid && !hasError,
      // Apply default border and focus styling if no error or success state
      [clsx(baseBorderClass, focusBorderClass, focusRingClass)]: !hasError && !isValid,
    },
    rows === 4 ? 'resize-none' : 'resize-y',
    className
  );
  
  // Helper text classes
  const helperTextClasses = clsx(
    'text-sm mt-1',
    {
      'text-apex-muted theme-origin:text-origin-muted': !validationState,
      'text-success': validationState === 'success',
      'text-danger': validationState === 'error',
    }
  );
  
  return (
    <div className={containerClasses}>
      {/* Label */}
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
      </label>
      
      {/* Textarea field */}
      <textarea
        ref={ref}
        id={id}
        className={textareaClasses}
        aria-invalid={hasError}
        aria-describedby={helperText || error ? `${id}-helper` : undefined}
        disabled={disabled}
        required={required}
        rows={rows}
        {...props}
      />
      
      {/* Helper text or error message */}
      {(helperText || error) && (
        <div id={`${id}-helper`} className={helperTextClasses}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

// Display name for debugging
Textarea.displayName = 'Textarea';

export default Textarea; 