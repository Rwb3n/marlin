import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import router from './router';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

/**
 * Main Application Component
 * 
 * Wraps the entire application with necessary providers:
 * - ThemeProvider: For theme context (light/dark mode)
 * - RouterProvider: For client-side routing
 */
function App(): React.ReactElement {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  );
}

export default App; 