import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const defaultProps = {
    id: 'test-radio',
    label: 'Test Radio Group',
    options,
    value: '',
    onChange: vi.fn()
  };

  it('renders the label and all options correctly', () => {
    render(<RadioGroup {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    options.forEach(option => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('marks the correct option as checked', () => {
    const selectedValue = 'option2';
    render(<RadioGroup {...defaultProps} value={selectedValue} />);
    
    const selectedRadio = screen.getByLabelText('Option 2') as HTMLInputElement;
    const otherRadios = [
      screen.getByLabelText('Option 1') as HTMLInputElement,
      screen.getByLabelText('Option 3') as HTMLInputElement
    ];
    
    expect(selectedRadio.checked).toBe(true);
    otherRadios.forEach(radio => {
      expect(radio.checked).toBe(false);
    });
  });

  it('calls onChange when an option is selected', () => {
    const onChange = vi.fn();
    render(<RadioGroup {...defaultProps} onChange={onChange} />);
    
    fireEvent.click(screen.getByLabelText('Option 3'));
    
    expect(onChange).toHaveBeenCalledWith('option3');
  });

  it('shows an error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<RadioGroup {...defaultProps} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-destructive');
  });

  it('displays helper text when provided', () => {
    const helperText = 'Select your preferred option';
    render(<RadioGroup {...defaultProps} helperText={helperText} />);
    
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('disables all radio inputs when disabled prop is true', () => {
    render(<RadioGroup {...defaultProps} disabled={true} />);
    
    options.forEach(option => {
      const radio = screen.getByLabelText(option.label) as HTMLInputElement;
      expect(radio.disabled).toBe(true);
    });
  });

  it('renders in horizontal layout when direction is horizontal', () => {
    const { container } = render(<RadioGroup {...defaultProps} direction="horizontal" />);
    
    const radioGroup = container.querySelector('[role="radiogroup"]');
    expect(radioGroup).toHaveClass('flex');
  });

  it('adds required indicator when required prop is true', () => {
    render(<RadioGroup {...defaultProps} required={true} />);
    
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass('text-destructive');
  });
}); 