/**
 * FormInput Component
 * 
 * A customizable input field component with validation states and theme support.
 * Seamlessly integrates with FormGroup for label and error message handling.
 * 
 * Features:
 * - Theme support (apex/origin) for consistent styling
 * - Error and success validation states
 * - Focus and hover states with transitions
 * - Accessibility attributes
 * - Integration with form validation systems
 */

import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input ID (required for accessibility and label association)
   */
  id: string;
  
  /**
   * Input name attribute
   */
  name: string;
  
  /**
   * Error message to display when input is invalid
   */
  error?: string;
  
  /**
   * Indicates successful validation state
   */
  success?: boolean;
  
  /**
   * Custom CSS class names
   */
  className?: string;
}

/**
 * FormInput component with validation and theme support
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, name, error, success, className, disabled, ...restProps }, ref) => {
    // Determine validation state classes
    const validationStateClass = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : success
      ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-600';

    // Base input classes with theme support
    const inputClasses = clsx(
      'block w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-md',
      'text-slate-900 dark:text-slate-100',
      'placeholder:text-slate-400 dark:placeholder:text-slate-500',
      validationStateClass,
      'transition-colors duration-150 ease-in-out',
      'focus:outline-none focus:ring-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    );

    return (
      <input
        ref={ref}
        id={id}
        name={name}
        className={inputClasses}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        {...restProps}
      />
    );
  }
);

// Display name for debugging
FormInput.displayName = 'FormInput';

export default FormInput; 