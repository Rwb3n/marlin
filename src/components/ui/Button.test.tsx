// src/components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button'; // Adjust path if necessary
import React from 'react';

describe('Button', () => {
  it('renders the button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
}); 