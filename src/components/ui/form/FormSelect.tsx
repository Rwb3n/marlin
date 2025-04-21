/**
 * FormSelect Component
 * 
 * A custom styled select dropdown with options and validation states.
 * Provides consistent styling with other form elements in the design system.
 * 
 * Features:
 * - Theme support (apex/origin) for consistent styling
 * - Custom dropdown styling with chevron icon
 * - Support for disabled state and validation states
 * - Error and success validation states
 * - Integration with FormGroup for labels and errors
 * - Accessibility attributes
 */

import React, { forwardRef, SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

/**
 * Option for the select dropdown
 */
export interface SelectOption {
  /**
   * Option value (submitted with form)
   */
  value: string;
  
  /**
   * Display label for the option
   */
  label: string;
  
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Select ID (required for accessibility and label association)
   */
  id: string;
  
  /**
   * Select name attribute
   */
  name: string;
  
  /**
   * Options for the select dropdown
   */
  options?: SelectOption[];
  
  /**
   * Error message to display when select is invalid
   */
  error?: string;
  
  /**
   * Indicates successful validation state
   */
  success?: boolean;
  
  /**
   * Whether the select is in a loading state
   */
  isLoading?: boolean;
  
  /**
   * Custom CSS class names
   */
  className?: string;
}

/**
 * FormSelect component with validation and theme support
 */
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ 
    id, 
    name, 
    options = [], 
    error, 
    success, 
    isLoading,
    className, 
    disabled, 
    children,
    ...restProps 
  }, ref) => {
    // Determine validation state classes
    const validationStateClass = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : success
      ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-600';

    // Base select classes with theme support
    const selectClasses = clsx(
      'block w-full appearance-none',
      'pl-3 pr-10 py-2 bg-gray-100 dark:bg-slate-800 rounded-md',
      'text-slate-900 dark:text-slate-100',
      validationStateClass,
      'transition-colors duration-150 ease-in-out',
      'focus:outline-none focus:ring-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    );

    // Wrapper classes for adding the dropdown arrow
    const wrapperClasses = clsx(
      'relative',
      isLoading && 'opacity-70'
    );

    // Dropdown arrow styles
    const arrowClasses = clsx(
      'absolute right-3 top-1/2 -translate-y-1/2',
      'pointer-events-none text-slate-400'
    );

    // Loading indicator styles
    const loadingClasses = clsx(
      'absolute right-8 top-1/2 -translate-y-1/2',
      'animate-spin h-4 w-4'
    );

    return (
      <div className={wrapperClasses}>
        <select
          ref={ref}
          id={id}
          name={name}
          className={selectClasses}
          disabled={disabled || isLoading}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-busy={isLoading ? 'true' : 'false'}
          {...restProps}
        >
          {children || options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Loading spinner */}
        {isLoading && (
          <div className={loadingClasses} aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        
        {/* Dropdown arrow */}
        <div className={arrowClasses} aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    );
  }
);

// Display name for debugging
FormSelect.displayName = 'FormSelect';

export default FormSelect; 