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
  const baseTextClass = 'text-foreground';
  const baseBorderClass = 'border-border';
  const focusBorderClass = 'focus:border-accent';
  const focusRingClass = 'focus:ring-accent/20';
  const hoverBorderClass = 'hover:border-accent';
  const errorTextClass = 'text-destructive';
  const errorBorderClass = 'border-destructive';
  const errorFocusRingClass = 'focus:ring-destructive/20';
  const successBorderClass = 'border-success';
  const successFocusRingClass = 'focus:ring-success/20';
  const placeholderClass = 'placeholder:text-muted-foreground';
  const bgClass = 'bg-card';
  
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
    hasError ? 'text-destructive' : 'text-foreground'
  );
  
  // Textarea field classes
  const textareaClasses = clsx(
    'block rounded px-4 py-3 w-full border focus:outline-none transition-all',
    bgClass,
    placeholderClass,
    baseTextClass,
    disabled ? 'opacity-50 cursor-not-allowed' : hoverBorderClass,
    {
      // Apply error styling if hasError is true
      [clsx(errorBorderClass, errorFocusRingClass, 'text-destructive')]: hasError,
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
      'text-muted-foreground': !hasError && !isValid,
      'text-success': isValid && !hasError,
      'text-destructive': hasError,
    }
  );
  
  return (
    <div className={containerClasses}>
      {/* Label */}
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
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