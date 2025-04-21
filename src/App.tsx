import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import router from './router';
import './App.css';

/**
 * Main Application Component
 * 
 * Wraps the entire application with necessary providers:
 * - HelmetProvider: For managing document head/SEO
 * - ThemeProvider: For theme context (light/dark mode)
 * - RouterProvider: For client-side routing
 */
function App(): React.ReactElement {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App; 