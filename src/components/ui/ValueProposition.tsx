import React from 'react';
import clsx from 'clsx';

interface ValuePropositionProps {
  /**
   * The hook or attention-grabbing statement
   */
  hook: string;
  
  /**
   * The detailed description text
   */
  description: string;
  
  /**
   * Optional additional className
   */
  className?: string;
}

export const ValueProposition: React.FC<ValuePropositionProps> = ({
  hook,
  description,
  className
}) => {
  return (
    <div className={clsx('mb-8', className)}>
      <p className="text-xl font-medium italic mb-3">
        {hook}
      </p>
      <p className="text-base text-muted-foreground max-w-2xl">
        {description}
      </p>
    </div>
  );
};

export default ValueProposition; 