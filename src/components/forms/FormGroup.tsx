import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * FormGroup Component
 * 
 * A container for form elements that handles the layout of labels, inputs, and error messages.
 * Features:
 * - Consistent spacing and alignment for form elements
 * - Support for labels and error messages
 * - Optional help/description text
 * - Proper association between labels and form controls
 * - Theme integration with apex/origin variants
 * 
 * @example
 * <FormGroup
 *   label="Email"
 *   htmlFor="email"
 *   error="Please enter a valid email address"
 *   description="We'll never share your email with anyone else."
 * >
 *   <input id="email" type="email" />
 * </FormGroup>
 */
interface FormGroupProps {
  /** Additional classes to apply to the form group */
  className?: string;
  /** Form control element(s) */
  children: React.ReactNode;
  /** Label text for the form control */
  label?: string;
  /** ID of the form control (for associating the label) */
  htmlFor?: string;
  /** Error message to display */
  error?: string;
  /** Optional help/description text */
  description?: string;
}

export default function FormGroup({
  className = '',
  children,
  label,
  htmlFor,
  error,
  description,
}: FormGroupProps) {
  const { theme } = useTheme();
  
  // Base classes for structure
  const containerClasses = 'mb-4';
  const labelClasses = 'block text-sm font-medium mb-1';
  const descriptionClasses = 'text-xs opacity-70 mt-1';

  // Determine error state
  const hasError = !!error;

  // Conditional classes based on theme and error state
  const errorTextColor = theme === 'light'
    ? 'text-red-600' 
    : 'text-red-400';
    
  const labelColorClass = hasError 
    ? errorTextColor 
    : theme === 'light' ? 'text-light-text' : 'text-dark-text';

  const descriptionColor = hasError
    ? errorTextColor
    : theme === 'light' ? 'text-light-muted' : 'text-dark-muted';
    
  return (
    <div className={`${containerClasses} ${className}`}>
      {/* Label (if provided) */}
      {label && (
        <label 
          htmlFor={htmlFor}
          className={`
            ${labelClasses}
            ${hasError ? errorTextColor : ''}
          `}
        >
          {label}
        </label>
      )}
      
      {/* Form Control */}
      <div className="relative">
        {children}
      </div>
      
      {/* Error Message (if provided) */}
      {error && (
        <p className={`${descriptionClasses} ${errorTextColor}`}>
          {error}
        </p>
      )}
      
      {/* Description (if provided) */}
      {description && !error && (
        <p className={`${descriptionClasses} ${descriptionColor}`}>
          {description}
        </p>
      )}
    </div>
  );
} 