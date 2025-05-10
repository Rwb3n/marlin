/**
 * Checkbox Component for BLUE MARLIN OS
 * 
 * This component implements a custom checkbox with label, validation states,
 * and theme support. It provides accessibility features and visual customization.
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Unique ID for the checkbox (required for label association) */
  id: string;
  /** Label text to display next to the checkbox */
  label: string;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
  /** Error message to display (triggers error state) */
  error?: string;
  /** Helper text to display below the checkbox */
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  id,
  label,
  indeterminate = false,
  error,
  helperText,
  className,
  disabled,
  checked,
  ...props
}, ref) => {
  // Set indeterminate attribute using a callback ref
  const handleRef = (element: HTMLInputElement | null) => {
    if (element) {
      element.indeterminate = indeterminate;
      if (ref) {
        if (typeof ref === 'function') {
          ref(element);
        } else {
          ref.current = element;
        }
      }
    }
  };

  // Determine validation state
  const hasError = !!error;
  
  // Define base and theme-specific classes using dark: variant
  const baseBorderClass = 'border-border';
  const hoverBorderClass = 'hover:border-accent';
  const checkedBorderClass = 'border-accent';
  const checkedBgClass = 'bg-accent';
  const checkedIconColor = 'text-accent-foreground';
  const errorTextClass = 'text-destructive';
  const mutedTextClass = 'text-muted-foreground';

  let customCheckboxStateClasses = '';
  if (checked || indeterminate) {
    customCheckboxStateClasses = clsx(checkedBorderClass, checkedBgClass, checkedIconColor);
  } else {
    customCheckboxStateClasses = clsx('bg-background', baseBorderClass, hoverBorderClass);
  }
  
  // Base container classes
  const containerClasses = clsx(
    'flex items-center',
    className
  );
  
  // Checkbox input (hidden) classes
  const inputClasses = 'absolute opacity-0 w-4 h-4 cursor-pointer';
  
  // Custom checkbox visual element classes
  const customCheckboxClasses = clsx(
    'w-4 h-4 border rounded-sm flex items-center justify-center transition-all duration-150 ease-in-out',
    customCheckboxStateClasses,
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  );
  
  // Checkmark icon classes
  const checkmarkClasses = clsx(
    'w-3 h-3 transition-opacity duration-100 ease-in-out',
    checked ? 'opacity-100' : 'opacity-0'
  );
  
  // Label classes
  const labelClasses = clsx(
    'ml-2',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    hasError ? errorTextClass : 'text-foreground'
  );
  
  // Helper text classes
  const helperTextClasses = clsx(
    'text-xs mt-1',
    hasError ? errorTextClass : mutedTextClass
  );

  return (
    <div className="flex flex-col">
      <div className={containerClasses}>
        <div className="flex items-start">
          <input
            ref={handleRef}
            type="checkbox"
            id={id}
            className={inputClasses}
            disabled={disabled}
            checked={checked}
            aria-invalid={hasError}
            aria-describedby={helperText || error ? `${id}-helper` : undefined}
            {...props}
          />
          
          <div className={customCheckboxClasses}>
            {checked && (
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d="M10 3L4.5 8.5L2 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
            
            {indeterminate && !checked && (
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d="M2.5 6H9.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      </div>
      
      {(helperText || error) && (
        <div id={`${id}-helper`} className={helperTextClasses}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

// Display name for debugging
Checkbox.displayName = 'Checkbox';

export default Checkbox; 