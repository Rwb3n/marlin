import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxGroup from './CheckboxGroup';

describe('CheckboxGroup', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const defaultProps = {
    id: 'test-checkbox',
    label: 'Test Checkbox Group',
    options,
    value: [],
    onChange: vi.fn()
  };

  it('renders the label and all options correctly', () => {
    render(<CheckboxGroup {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    options.forEach(option => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('marks the correct options as checked', () => {
    const selectedValues = ['option1', 'option3'];
    render(<CheckboxGroup {...defaultProps} value={selectedValues} />);
    
    const selectedCheckboxes = [
      screen.getByLabelText('Option 1') as HTMLInputElement,
      screen.getByLabelText('Option 3') as HTMLInputElement
    ];
    const unselectedCheckbox = screen.getByLabelText('Option 2') as HTMLInputElement;
    
    selectedCheckboxes.forEach(checkbox => {
      expect(checkbox.checked).toBe(true);
    });
    expect(unselectedCheckbox.checked).toBe(false);
  });

  it('adds value when unchecked option is clicked', () => {
    const onChange = vi.fn();
    const selectedValues = ['option1'];
    render(<CheckboxGroup {...defaultProps} value={selectedValues} onChange={onChange} />);
    
    fireEvent.click(screen.getByLabelText('Option 2'));
    
    expect(onChange).toHaveBeenCalledWith(['option1', 'option2']);
  });

  it('removes value when checked option is clicked', () => {
    const onChange = vi.fn();
    const selectedValues = ['option1', 'option2'];
    render(<CheckboxGroup {...defaultProps} value={selectedValues} onChange={onChange} />);
    
    fireEvent.click(screen.getByLabelText('Option 1'));
    
    expect(onChange).toHaveBeenCalledWith(['option2']);
  });

  it('shows an error message when provided', () => {
    const errorMessage = 'Please select at least one option';
    render(<CheckboxGroup {...defaultProps} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-destructive');
  });

  it('displays helper text when provided', () => {
    const helperText = 'Select all that apply';
    render(<CheckboxGroup {...defaultProps} helperText={helperText} />);
    
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('disables all checkbox inputs when disabled prop is true', () => {
    render(<CheckboxGroup {...defaultProps} disabled={true} />);
    
    options.forEach(option => {
      const checkbox = screen.getByLabelText(option.label) as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
    });
  });

  it('renders in horizontal layout when direction is horizontal', () => {
    const { container } = render(<CheckboxGroup {...defaultProps} direction="horizontal" />);
    
    const checkboxGroup = container.querySelector('[role="group"]');
    expect(checkboxGroup).toHaveClass('flex');
  });

  it('adds required indicator when required prop is true', () => {
    render(<CheckboxGroup {...defaultProps} required={true} />);
    
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass('text-destructive');
  });
}); 