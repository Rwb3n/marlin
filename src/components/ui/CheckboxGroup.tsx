/**
 * CheckboxGroup Component for BLUE MARLIN OS
 * 
 * This component implements a group of checkboxes with labels, validation states,
 * and helper/error text. It automatically adapts to the current theme and provides
 * accessibility features.
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Unique ID for the checkbox group (required for label association) */
  id: string;
  /** Label text to display above the checkbox group */
  label: string;
  /** Array of checkbox options */
  options: CheckboxOption[];
  /** Currently selected values */
  value: string[];
  /** Callback when selection changes */
  onChange: (values: string[]) => void;
  /** Error message to display (triggers error state) */
  error?: string;
  /** Whether the checkbox group has valid data */
  isValid?: boolean;
  /** Whether the checkbox group should take full width of its container */
  fullWidth?: boolean;
  /** Helper text to display below the checkbox group */
  helperText?: string;
  /** Layout direction of the checkbox options */
  direction?: 'vertical' | 'horizontal';
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(({
  id,
  label,
  options,
  value,
  onChange,
  error,
  isValid,
  fullWidth = true,
  helperText,
  className,
  required,
  disabled,
  direction = 'vertical',
  ...props
}, ref) => {
  // Determine validation state
  const hasError = !!error;
  const validationState = hasError ? 'error' : isValid ? 'success' : 'default';
  
  // Define base and theme-specific classes
  const baseTextClass = 'text-foreground';
  const errorTextClass = 'text-destructive';
  const successTextClass = 'text-success';
  
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
    hasError ? errorTextClass : baseTextClass
  );
  
  // Checkbox group classes
  const checkboxGroupClasses = clsx(
    'space-y-2',
    direction === 'horizontal' && 'flex flex-wrap gap-4'
  );
  
  // Checkbox option container classes
  const checkboxOptionClasses = clsx(
    'flex items-center',
    direction === 'horizontal' && 'flex-1 min-w-[200px]'
  );
  
  // Checkbox input classes
  const checkboxInputClasses = clsx(
    'h-4 w-4 rounded border-2',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transition-colors duration-150',
    {
      'border-border hover:border-accent focus:ring-accent/20': !hasError && !isValid,
      'border-destructive hover:border-destructive focus:ring-destructive/20': hasError,
      'border-success hover:border-success focus:ring-success/20': isValid && !hasError,
      'opacity-50 cursor-not-allowed': disabled
    }
  );
  
  // Checkbox label classes
  const checkboxLabelClasses = clsx(
    'ml-2 text-sm',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  );
  
  // Helper text classes
  const helperTextClasses = clsx(
    'text-sm mt-2',
    {
      'text-muted-foreground': !hasError && !isValid,
      'text-success': isValid && !hasError,
      'text-destructive': hasError
    }
  );
  
  // Handle checkbox change
  const handleChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };
  
  return (
    <div ref={ref} className={containerClasses}>
      {/* Group Label */}
      <label className={labelClasses}>
        {label}
        {required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
      </label>
      
      {/* Checkbox Options */}
      <div 
        role="group" 
        aria-labelledby={id}
        aria-invalid={hasError}
        className={checkboxGroupClasses}
      >
        {options.map((option) => (
          <div key={option.value} className={checkboxOptionClasses}>
            <input
              type="checkbox"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={() => handleChange(option.value)}
              disabled={disabled || option.disabled}
              className={checkboxInputClasses}
              aria-describedby={helperText || error ? `${id}-helper` : undefined}
              {...props}
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className={checkboxLabelClasses}
            >
              {option.label}
            </label>
          </div>
        ))}
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
CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup; 