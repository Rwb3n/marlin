/**
 * FormTextarea Component
 * 
 * A multi-line text input component with resizing capability and validation states.
 * Designed to match the styling of FormInput for consistency in forms.
 * 
 * Features:
 * - Theme support (apex/origin) for consistent styling
 * - Optional auto-resizing functionality
 * - Error and success validation states
 * - Focus and hover states with transitions
 * - Accessibility attributes
 * - Integration with FormGroup component
 */

import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Textarea ID (required for accessibility and label association)
   */
  id: string;
  
  /**
   * Textarea name attribute
   */
  name: string;
  
  /**
   * Error message to display when textarea is invalid
   */
  error?: string;
  
  /**
   * Indicates successful validation state
   */
  success?: boolean;
  
  /**
   * Number of rows for the textarea
   * @default 3
   */
  rows?: number;
  
  /**
   * Whether the textarea should be resizable
   * @default true
   */
  resizable?: boolean;
  
  /**
   * Custom CSS class names
   */
  className?: string;
}

/**
 * FormTextarea component with validation and theme support
 */
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ 
    id, 
    name, 
    error, 
    success, 
    rows = 3, 
    resizable = true, 
    className, 
    disabled, 
    ...restProps 
  }, ref) => {
    // Determine validation state classes
    const validationStateClass = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : success
      ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-600';

    // Resizing style
    const resizeClass = resizable ? 'resize-y' : 'resize-none';

    // Base textarea classes with theme support
    const textareaClasses = clsx(
      'block w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-md',
      'text-slate-900 dark:text-slate-100',
      'placeholder:text-slate-400 dark:placeholder:text-slate-500',
      validationStateClass,
      resizeClass,
      'transition-colors duration-150 ease-in-out',
      'focus:outline-none focus:ring-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    );

    return (
      <textarea
        ref={ref}
        id={id}
        name={name}
        rows={rows}
        className={textareaClasses}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        {...restProps}
      />
    );
  }
);

// Display name for debugging
FormTextarea.displayName = 'FormTextarea';

export default FormTextarea; 