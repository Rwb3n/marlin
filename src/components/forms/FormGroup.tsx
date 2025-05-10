import React from 'react';

/**
 * FormGroup Component
 * 
 * A container for form elements that provides consistent vertical spacing.
 * Labels, error messages, and helper text should be handled by the child form control component.
 */
interface FormGroupProps {
  /** Additional classes to apply to the form group */
  className?: string;
  /** Form control element(s) */
  children: React.ReactNode;
}

export default function FormGroup({
  className = '',
  children,
}: FormGroupProps) {
  // Base classes for structure
  const containerClasses = 'mb-4';
    
  return (
    <div className={`${containerClasses} ${className}`}>
      {children}
    </div>
  );
} 