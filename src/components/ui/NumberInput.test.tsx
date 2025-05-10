import { render, screen, fireEvent } from '@testing-library/react';
import NumberInput from './NumberInput';

describe('NumberInput', () => {
  const defaultProps = {
    id: 'test-number',
    label: 'Test Number Input',
    value: 5,
    onChange: vi.fn()
  };

  it('renders the label and input correctly', () => {
    render(<NumberInput {...defaultProps} />);
    
    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.label)).toHaveValue(5);
  });

  it('calls onChange with numeric value when input changes', () => {
    const onChange = vi.fn();
    render(<NumberInput {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByLabelText(defaultProps.label);
    fireEvent.change(input, { target: { value: '10' } });
    
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('handles empty input and converts to 0', () => {
    const onChange = vi.fn();
    render(<NumberInput {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByLabelText(defaultProps.label);
    fireEvent.change(input, { target: { value: '' } });
    
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('shows an error message when provided', () => {
    const errorMessage = 'Please enter a positive number';
    render(<NumberInput {...defaultProps} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-destructive');
  });

  it('displays helper text when provided', () => {
    const helperText = 'Enter value between 1-100';
    render(<NumberInput {...defaultProps} helperText={helperText} />);
    
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('disables the input when disabled prop is true', () => {
    render(<NumberInput {...defaultProps} disabled={true} />);
    
    const input = screen.getByLabelText(defaultProps.label) as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('applies min and max attributes to the input', () => {
    render(<NumberInput {...defaultProps} min={0} max={100} />);
    
    const input = screen.getByLabelText(defaultProps.label) as HTMLInputElement;
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });

  it('applies step attribute to the input', () => {
    render(<NumberInput {...defaultProps} step={5} />);
    
    const input = screen.getByLabelText(defaultProps.label) as HTMLInputElement;
    expect(input).toHaveAttribute('step', '5');
  });

  it('adds required indicator when required prop is true', () => {
    render(<NumberInput {...defaultProps} required={true} />);
    
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass('text-destructive');
  });

  it('applies different styles based on validation state', () => {
    const { rerender } = render(<NumberInput {...defaultProps} isValid={true} />);
    
    let input = screen.getByLabelText(defaultProps.label);
    expect(input.parentElement).toHaveClass('border-success');
    
    rerender(<NumberInput {...defaultProps} error="Error message" />);
    input = screen.getByLabelText(defaultProps.label);
    expect(input.parentElement).toHaveClass('border-destructive');
  });
}); 