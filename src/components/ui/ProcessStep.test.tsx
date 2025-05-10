import { render, screen } from '@testing-library/react';
import ProcessStep from './ProcessStep';

describe('ProcessStep', () => {
  const defaultProps = {
    title: 'Test Step',
    description: 'This is a test step description',
    icon: '🔍'
  };

  it('renders the title, description, and icon correctly', () => {
    render(<ProcessStep {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.icon)).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const customClass = 'test-custom-class';
    const { container } = render(
      <ProcessStep {...defaultProps} className={customClass} />
    );
    
    expect(container.firstChild).toHaveClass(customClass);
    expect(container.firstChild).toHaveClass('flex'); // Default class should also be present
  });

  it('renders the icon with proper styling', () => {
    render(<ProcessStep {...defaultProps} />);
    
    // Find the icon container
    const iconContainer = screen.getByText(defaultProps.icon).parentElement;
    expect(iconContainer).toHaveClass('bg-accent/10');
    expect(iconContainer).toHaveClass('rounded-full');
  });

  it('renders the description with muted text color', () => {
    render(<ProcessStep {...defaultProps} />);
    
    const descriptionElement = screen.getByText(defaultProps.description);
    expect(descriptionElement).toHaveClass('text-muted-foreground');
  });
}); 