import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import ThemeProvider from './context/ThemeContext';
import router from './router';
import './index.css';

// Find the root element
const rootElement = document.getElementById('root');

// Ensure the root element exists before creating the root
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider>
          <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  );
  // Add class to body after rendering starts to hide preloader
  document.body.classList.add('app-loaded');
} else {
  console.error('Failed to find the root element');
} 