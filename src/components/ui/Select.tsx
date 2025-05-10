/**
 * Select Component for BLUE MARLIN OS
 * 
 * This component implements a custom select dropdown with theme support,
 * accessibility features, and validation states. It provides a native
 * select element enhanced with custom styling.
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface SelectOption {
  /** Value to be submitted when selected */
  value: string;
  /** Display text for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** Unique ID for the select (required for label association) */
  id: string;
  /** Label text to display above the select */
  label: string;
  /** Array of options to display in the dropdown */
  options: SelectOption[];
  /** Error message to display (triggers error state) */
  error?: string;
  /** Whether the input has valid data */
  isValid?: boolean;
  /** Whether the select is in a loading state */
  isLoading?: boolean;
  /** Helper text to display below the select */
  helperText?: string;
  /** Whether the select should take full width of its container */
  fullWidth?: boolean;
  /** Placeholder text to display when no option is selected */
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  id,
  label,
  options,
  error,
  isValid,
  isLoading,
  helperText,
  fullWidth = true,
  placeholder,
  className,
  required,
  disabled,
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
  const bgClass = 'bg-card';
  const iconColorClass = 'text-muted-foreground';
  const loadingSpinnerClass = 'border-accent border-t-transparent';
  
  // Container classes
  const containerClasses = clsx(
    'relative',
    fullWidth && 'w-full',
    (disabled || isLoading) && 'opacity-60',
    className
  );
  
  // Label classes
  const labelClasses = clsx(
    'block text-sm font-medium mb-1',
    hasError ? errorTextClass : 'text-foreground'
  );
  
  // Select wrapper classes
  const selectWrapperClasses = clsx(
    'relative'
  );
  
  // Select field classes
  const selectClasses = clsx(
    'block appearance-none rounded px-4 py-3 pr-8 w-full border focus:outline-none transition-all',
    bgClass,
    baseTextClass,
    disabled || isLoading ? 'opacity-50 cursor-not-allowed' : hoverBorderClass,
    {
      [clsx(errorBorderClass, errorFocusRingClass, 'text-destructive')]: hasError,
      [clsx(successBorderClass, successFocusRingClass)]: isValid && !hasError,
      [clsx(baseBorderClass, focusBorderClass, focusRingClass)]: !hasError && !isValid,
    },
    className
  );
  
  // Helper text classes
  const helperTextClasses = clsx(
    'text-xs mt-1',
    hasError ? errorTextClass : 'text-muted-foreground'
  );
  
  // Loading spinner classes
  const spinnerClasses = clsx(
    'animate-spin h-4 w-4 border-2 rounded-full',
    loadingSpinnerClass
  );
  
  return (
    <div className={containerClasses}>
      {/* Label */}
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
      </label>
      
      <div className={selectWrapperClasses}>
        {/* Select field */}
        <select
          ref={ref}
          id={id}
          className={selectClasses}
          aria-invalid={hasError}
          aria-describedby={helperText || error ? `${id}-helper` : undefined}
          disabled={disabled || isLoading}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        {isLoading ? (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <div className={spinnerClasses} />
          </div>
        ) : (
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className={clsx("w-4 h-4", iconColorClass)} fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          </div>
        )}
      </div>
      
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
Select.displayName = 'Select';

export default Select; 