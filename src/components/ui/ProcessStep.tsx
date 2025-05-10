import React from 'react';
import clsx from 'clsx';

interface ProcessStepProps {
  /**
   * Title of the process step
   */
  title: string;
  
  /**
   * Description of the process step
   */
  description: string;
  
  /**
   * Icon character (emoji or symbol)
   */
  icon: string;
  
  /**
   * Optional additional className
   */
  className?: string;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({
  title,
  description,
  icon,
  className
}) => {
  return (
    <div className={clsx('flex space-x-4', className)}>
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-xl">
        {icon}
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep; 