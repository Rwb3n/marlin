import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BusinessSystemForm, { BusinessSystemFormData } from './BusinessSystemForm';

// Mock the child components
vi.mock('../ui/Input', () => ({
  default: ({ label, id, onChange, error, value, ...props }: any) => (
    <div data-testid={`mock-input-${id}`}>
      <label htmlFor={id}>{label} {props.required && '*'}</label>
      <input 
        id={id} 
        value={value} 
        onChange={onChange} 
        aria-invalid={!!error}
        data-testid={id}
        {...props}
      />
      {error && <div data-testid={`${id}-error`}>{error}</div>}
    </div>
  )
}));

vi.mock('../ui/RadioGroup', () => ({
  default: ({ label, id, options, value, onChange, error, ...props }: any) => (
    <div data-testid={`mock-radio-${id}`}>
      <span>{label} {props.required && '*'}</span>
      <div role="radiogroup">
        {options.map((option: any) => (
          <div key={option.value}>
            <input
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              data-testid={`${id}-${option.value}`}
              {...props}
            />
            <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
      {error && <div data-testid={`${id}-error`}>{error}</div>}
    </div>
  )
}));

vi.mock('../ui/CheckboxGroup', () => ({
  default: ({ label, id, options, value, onChange, error, ...props }: any) => (
    <div data-testid={`mock-checkbox-${id}`}>
      <span>{label} {props.required && '*'}</span>
      <div role="group">
        {options.map((option: any) => (
          <div key={option.value}>
            <input
              type="checkbox"
              id={`${id}-${option.value}`}
              checked={value.includes(option.value)}
              onChange={() => {
                const newValue = value.includes(option.value)
                  ? value.filter((v: string) => v !== option.value)
                  : [...value, option.value];
                onChange(newValue);
              }}
              data-testid={`${id}-${option.value}`}
              {...props}
            />
            <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
      {error && <div data-testid={`${id}-error`}>{error}</div>}
    </div>
  )
}));

vi.mock('../ui/NumberInput', () => ({
  default: ({ label, id, value, onChange, ...props }: any) => (
    <div data-testid={`mock-number-${id}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        data-testid={id}
        {...props}
      />
    </div>
  )
}));

vi.mock('../ui/Textarea', () => ({
  default: ({ label, id, value, onChange, ...props }: any) => (
    <div data-testid={`mock-textarea-${id}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        data-testid={id}
        {...props}
      />
    </div>
  )
}));

vi.mock('../ui/Button', () => ({
  default: ({ children, disabled, ...props }: any) => (
    <button disabled={disabled} data-testid="submit-button" {...props}>
      {children}
    </button>
  )
}));

describe('BusinessSystemForm', () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    isSubmitting: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all required form sections', () => {
    render(<BusinessSystemForm {...defaultProps} />);
    
    // Check for form sections
    expect(screen.getByText('About You')).toBeInTheDocument();
    expect(screen.getByText('Your Business System')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    
    // Check for form title and description
    expect(screen.getByText('Contact & Discovery Form')).toBeInTheDocument();
    expect(screen.getByText(/Let's understand your system and goals/)).toBeInTheDocument();
  });

  it('renders all form fields with correct props', () => {
    render(<BusinessSystemForm {...defaultProps} />);
    
    // Name and Email
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    
    // Current System Radio Group
    expect(screen.getByTestId('mock-radio-current-system')).toBeInTheDocument();
    
    // Goals Checkbox Group
    expect(screen.getByTestId('mock-checkbox-goals')).toBeInTheDocument();
    
    // User Count Number Input
    expect(screen.getByTestId('user-count')).toBeInTheDocument();
    
    // Message Textarea
    expect(screen.getByTestId('message')).toBeInTheDocument();
    
    // Submit Button
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted with empty required fields', async () => {
    render(<BusinessSystemForm {...defaultProps} />);
    
    // Submit form without filling required fields
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Wait for validation to complete
    await waitFor(() => {
      // Check for name error
      expect(screen.getByTestId('name-error')).toBeInTheDocument();
      
      // Check for email error
      expect(screen.getByTestId('email-error')).toBeInTheDocument();
      
      // Check for current system error
      expect(screen.getByTestId('current-system-error')).toBeInTheDocument();
      
      // Check for goals error
      expect(screen.getByTestId('goals-error')).toBeInTheDocument();
    });
    
    // Verify onSubmit wasn't called
    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  it('submits form data when all required fields are filled', async () => {
    render(<BusinessSystemForm {...defaultProps} />);
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'john@example.com' } });
    
    // Select a system option
    fireEvent.click(screen.getByTestId('current-system-salesforce'));
    
    // Select goals
    fireEvent.click(screen.getByTestId('goals-acquisition'));
    fireEvent.click(screen.getByTestId('goals-workflow'));
    
    // Set user count
    fireEvent.change(screen.getByTestId('user-count'), { target: { value: '50' } });
    
    // Add a message
    fireEvent.change(screen.getByTestId('message'), { 
      target: { value: 'This is a test message' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Verify onSubmit was called with the correct data
    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        currentSystem: 'salesforce',
        goals: ['acquisition', 'workflow'],
        userCount: 50,
        message: 'This is a test message'
      });
    });
  });

  it('validates email format', async () => {
    render(<BusinessSystemForm {...defaultProps} />);
    
    // Fill name
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'John Doe' } });
    
    // Fill invalid email
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'invalid-email' } });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check for email format error
    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toBeInTheDocument();
      expect(screen.getByTestId('email-error').textContent).toContain('valid email');
    });
    
    // Fix the email
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'john@example.com' } });
    
    // Check that error is cleared
    await waitFor(() => {
      expect(screen.queryByTestId('email-error')).not.toBeInTheDocument();
    });
  });

  it('disables all form fields when isSubmitting is true', () => {
    render(<BusinessSystemForm {...defaultProps} isSubmitting={true} />);
    
    // Check that fields are disabled
    expect(screen.getByTestId('name')).toBeDisabled();
    expect(screen.getByTestId('email')).toBeDisabled();
    expect(screen.getByTestId('current-system-salesforce')).toBeDisabled();
    expect(screen.getByTestId('goals-acquisition')).toBeDisabled();
    expect(screen.getByTestId('user-count')).toBeDisabled();
    expect(screen.getByTestId('message')).toBeDisabled();
    
    // Check that submit button is disabled
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });
}); 