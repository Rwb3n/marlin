import { render, screen } from '@testing-library/react';
import ValueProposition from './ValueProposition';

describe('ValueProposition', () => {
  const defaultProps = {
    hook: 'Test hook statement',
    description: 'Test description text that provides more details about the value proposition'
  };

  it('renders the hook and description correctly', () => {
    render(<ValueProposition {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.hook)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const customClass = 'test-custom-class';
    const { container } = render(
      <ValueProposition {...defaultProps} className={customClass} />
    );
    
    expect(container.firstChild).toHaveClass(customClass);
    expect(container.firstChild).toHaveClass('mb-8'); // Default class should also be present
  });

  it('renders the hook with italic styling', () => {
    render(<ValueProposition {...defaultProps} />);
    
    const hookElement = screen.getByText(defaultProps.hook);
    expect(hookElement).toHaveClass('italic');
  });

  it('renders the description with muted text color', () => {
    render(<ValueProposition {...defaultProps} />);
    
    const descriptionElement = screen.getByText(defaultProps.description);
    expect(descriptionElement).toHaveClass('text-muted-foreground');
  });
}); 