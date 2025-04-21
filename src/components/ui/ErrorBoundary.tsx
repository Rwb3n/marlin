import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorDisplay from './ErrorDisplay';

/**
 * ErrorBoundary Component
 * 
 * A class component that catches JavaScript errors anywhere in its child component tree
 * and displays a fallback UI instead of crashing the whole application.
 * Features:
 * - Catches errors in component rendering, lifecycle methods, and constructors
 * - Displays a user-friendly error message
 * - Provides options to recover or navigate away
 * - Logs detailed error information
 *
 * @example
 * <ErrorBoundary>
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 */
interface ErrorBoundaryProps {
  /** Child components that might throw errors */
  children: ReactNode;
  /** Custom fallback component to show instead of the default ErrorDisplay */
  fallback?: React.ReactNode;
  /** Function to call when trying to recover from the error */
  onReset?: () => void;
  /** Link to navigate to when error occurs */
  backLink?: string;
}

interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The error that was caught */
  error: Error | null;
  /** Error info with component stack */
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  /**
   * Update state when an error occurs
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  /**
   * Log error information when an error is caught
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Update state with error info for displaying details
    this.setState({
      errorInfo
    });
    
    // Here you could also send error reports to a logging service
  }

  /**
   * Reset the error state to try recovering
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // Call custom reset handler if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };
  
  /**
   * Get a user-friendly error message based on the error type
   */
  getUserFriendlyMessage = (): string => {
    const { error } = this.state;
    
    if (!error) {
      return "An unknown error occurred.";
    }
    
    // Check for common error types and provide helpful messages
    if (error.message.includes("Cannot read properties of undefined")) {
      return "We encountered a data loading issue. Some required information may be missing.";
    }
    
    if (error.message.includes("Failed to fetch") || error.message.includes("Network")) {
      return "We couldn't connect to the server. Please check your internet connection and try again.";
    }
    
    if (error.message.includes("JSON")) {
      return "We received an invalid response from the server. Our team has been notified of this issue.";
    }
    
    // Generic error message as fallback
    return "Something unexpected happened while loading this page. You can try again or navigate back.";
  };

  render(): ReactNode {
    // If there's an error, show fallback UI
    if (this.state.hasError) {
      // If custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Get appropriate error title and message
      const errorMessage = this.getUserFriendlyMessage();
      // Only show detailed error info in development environments
      // Checking for localhost is a simple way to determine if we're in development
      const isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
      const errorDetails = isDevelopment
        ? `${this.state.error?.toString()}\n\n${this.state.errorInfo?.componentStack || ''}`
        : undefined;
      
      // Otherwise use default ErrorDisplay
      return (
        <ErrorDisplay
          title="Something went wrong"
          message={errorMessage}
          severity="error"
          onRetry={this.handleReset}
          backLink={this.props.backLink || '/'}
          details={errorDetails}
        />
      );
    }

    // Otherwise, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary; 