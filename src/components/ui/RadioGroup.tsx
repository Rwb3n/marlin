/**
 * RadioGroup Component for BLUE MARLIN OS
 * 
 * This component implements a group of radio buttons with labels, validation states,
 * and helper/error text. It automatically adapts to the current theme and provides
 * accessibility features.
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Unique ID for the radio group (required for label association) */
  id: string;
  /** Label text to display above the radio group */
  label: string;
  /** Array of radio options */
  options: RadioOption[];
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Error message to display (triggers error state) */
  error?: string;
  /** Whether the radio group has valid data */
  isValid?: boolean;
  /** Whether the radio group should take full width of its container */
  fullWidth?: boolean;
  /** Helper text to display below the radio group */
  helperText?: string;
  /** Layout direction of the radio options */
  direction?: 'vertical' | 'horizontal';
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({
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
  
  // Radio group classes
  const radioGroupClasses = clsx(
    'space-y-2',
    direction === 'horizontal' && 'flex flex-wrap gap-4'
  );
  
  // Radio option container classes
  const radioOptionClasses = clsx(
    'flex items-center',
    direction === 'horizontal' && 'flex-1 min-w-[200px]'
  );
  
  // Radio input classes
  const radioInputClasses = clsx(
    'h-4 w-4 border-2 rounded-full',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transition-colors duration-150',
    {
      'border-border hover:border-accent focus:ring-accent/20': !hasError && !isValid,
      'border-destructive hover:border-destructive focus:ring-destructive/20': hasError,
      'border-success hover:border-success focus:ring-success/20': isValid && !hasError,
      'opacity-50 cursor-not-allowed': disabled
    }
  );
  
  // Radio label classes
  const radioLabelClasses = clsx(
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
  
  return (
    <div ref={ref} className={containerClasses}>
      {/* Group Label */}
      <label className={labelClasses}>
        {label}
        {required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
      </label>
      
      {/* Radio Options */}
      <div 
        role="radiogroup" 
        aria-labelledby={id}
        aria-invalid={hasError}
        className={radioGroupClasses}
      >
        {options.map((option) => (
          <div key={option.value} className={radioOptionClasses}>
            <input
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled || option.disabled}
              className={radioInputClasses}
              aria-describedby={helperText || error ? `${id}-helper` : undefined}
              {...props}
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className={radioLabelClasses}
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
RadioGroup.displayName = 'RadioGroup';

export default RadioGroup; 