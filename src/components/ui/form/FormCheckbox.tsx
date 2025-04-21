/**
 * FormCheckbox Component
 * 
 * A custom styled checkbox component with validation states and theme support.
 * Supports the indeterminate state for partial selection.
 * 
 * Features:
 * - Theme support (apex/origin) for consistent styling
 * - Custom styled checkbox with animation
 * - Support for indeterminate state
 * - Error and success validation states
 * - Integration with FormGroup for labels and errors
 * - Accessibility attributes
 */

import React, { forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';
import clsx from 'clsx';

export interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Checkbox ID (required for accessibility and label association)
   */
  id: string;
  
  /**
   * Checkbox name attribute
   */
  name: string;
  
  /**
   * Error message to display when checkbox is invalid
   */
  error?: string;
  
  /**
   * Indicates successful validation state
   */
  success?: boolean;
  
  /**
   * Indeterminate state (partially checked)
   */
  indeterminate?: boolean;
  
  /**
   * Label text to display alongside checkbox
   */
  label?: string;
  
  /**
   * Custom CSS class names
   */
  className?: string;
}

/**
 * FormCheckbox component with custom styling and theme support
 */
export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ 
    id, 
    name, 
    error, 
    success, 
    indeterminate, 
    label, 
    className, 
    checked, 
    disabled, 
    ...restProps 
  }, ref) => {
    // Create internal ref for handling indeterminate state
    const internalRef = useRef<HTMLInputElement>(null);
    
    // Merge external and internal refs
    const setRefs = (element: HTMLInputElement) => {
      // Update internal ref
      if (internalRef) {
        (internalRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
      
      // Update forwarded ref
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(element);
      } else {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
    };
    
    // Set indeterminate property (can't be set via HTML attribute)
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);
    
    // Determine validation state classes
    const validationStateClass = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : success
      ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-600';
    
    // Checkbox and wrapper classes with theme support
    const checkboxClasses = clsx(
      'appearance-none w-4 h-4 rounded',
      'border transition-colors duration-150 ease-in-out',
      validationStateClass,
      'bg-white dark:bg-slate-800',
      'focus:outline-none focus:ring-2',
      'checked:bg-blue-500 dark:checked:bg-blue-400 checked:border-transparent',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    );
    
    // Wrapper classes for the checkbox and custom visual elements
    const wrapperClasses = clsx(
      'relative flex items-center',
      disabled && 'opacity-60 cursor-not-allowed'
    );
    
    // Custom checkmark styles
    const checkmarkClasses = clsx(
      'absolute left-0 top-0 w-4 h-4 flex items-center justify-center',
      'text-white opacity-0 scale-90 transition-transform duration-150',
      'peer-checked:opacity-100 peer-checked:scale-100',
    );
    
    // Label classes
    const labelClasses = clsx(
      'ml-2 text-sm text-slate-700 dark:text-slate-200',
      disabled && 'text-slate-400 dark:text-slate-500'
    );
    
    return (
      <div className={wrapperClasses}>
        <input
          ref={setRefs}
          type="checkbox"
          id={id}
          name={name}
          className={clsx(checkboxClasses, 'peer')}
          checked={checked}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          {...restProps}
        />
        <div className={checkmarkClasses} aria-hidden="true">
          {indeterminate ? (
            // Indeterminate dash
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4.5" width="6" height="1" rx="0.5" fill="currentColor" />
            </svg>
          ) : (
            // Checkmark
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3L4.5 7L2 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        {label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

// Display name for debugging
FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox; 