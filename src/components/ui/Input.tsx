/**
 * Input Component for BLUE MARLIN OS
 * 
 * This component implements form inputs with labels, validation states,
 * and helper/error text. It automatically adapts to the current theme
 * and provides accessibility features.
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Unique ID for the input (required for label association) */
  id: string;
  /** Label text to display above the input */
  label: string;
  /** Error message to display (triggers error state) */
  error?: string;
  /** Whether the input has valid data */
  isValid?: boolean;
  /** Whether the input should take full width of its container */
  fullWidth?: boolean;
  /** Helper text to display below the input */
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  label,
  error,
  isValid,
  fullWidth = true,
  helperText,
  className,
  required,
  disabled,
  ...props
}, ref) => {
  // Determine validation state
  const hasError = !!error;
  const validationState = hasError ? 'error' : isValid ? 'success' : 'default';
  
  // Container classes
  const containerClasses = clsx(
    'relative',
    fullWidth && 'w-full',
    disabled && 'opacity-60',
    className
  );
  
  // Define base and theme-specific classes using dark: variant
  const baseTextClass = 'text-origin-text dark:text-apex-text';
  const baseBorderClass = 'border-origin-muted dark:border-apex-muted';
  const focusBorderClass = 'focus:border-origin-accent dark:focus:border-apex-accent';
  const focusRingClass = 'focus:ring-origin-accent/20 dark:focus:ring-apex-accent/20';
  const hoverBorderClass = 'hover:border-origin-accent dark:hover:border-apex-accent';
  const errorTextClass = 'text-danger'; 
  const errorBorderClass = 'border-danger';
  const errorFocusRingClass = 'focus:ring-danger/20';
  const successBorderClass = 'border-success';
  const successFocusRingClass = 'focus:ring-success/20';
  const placeholderClass = 'placeholder:text-origin-muted dark:placeholder:text-apex-muted';
  const bgClass = 'bg-origin-bg-card dark:bg-apex-bg-card'; // Example, adjust if needed
  
  // Combine classes for the input element
  const inputClasses = clsx(
    'block rounded px-4 py-3 w-full border focus:outline-none transition-all',
    bgClass,
    placeholderClass,
    disabled ? 'opacity-50 cursor-not-allowed' : hoverBorderClass,
    hasError ? errorTextClass : baseTextClass,
    {
      [clsx(errorBorderClass, errorFocusRingClass)]: hasError,
      [clsx(successBorderClass, successFocusRingClass)]: isValid && !hasError,
      [clsx(baseBorderClass, focusBorderClass, focusRingClass)]: !hasError && !isValid,
    },
    className
  );
  
  // Label classes
  const labelClasses = clsx(
    'block mb-2 font-medium',
    hasError ? errorTextClass : baseTextClass // Apply error or base text color
  );
  
  // Helper text classes
  const helperTextClasses = clsx(
    'text-sm mt-1',
    {
      [errorTextClass]: hasError,
      'text-origin-muted dark:text-apex-muted': !hasError, // Muted text color
    }
  );
  
  return (
    <div className={containerClasses}>
      {/* Label */}
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
      </label>
      
      {/* Input field */}
      <input
        ref={ref}
        id={id}
        className={inputClasses}
        aria-invalid={hasError}
        aria-describedby={helperText || error ? `${id}-helper` : undefined}
        disabled={disabled}
        required={required}
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
Input.displayName = 'Input';

export default Input; 