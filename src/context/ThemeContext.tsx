/**
 * ThemeContext
 * 
 * Provides theming context for the application, handling:
 * - Color theme selection and persistence (light mode, dark mode)
 * - Theme toggle functionality
 * - OS level preference detection
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Available theme options
// 'light' is light mode, 'dark' is dark mode
export type ThemeOption = 'dark' | 'light';

interface ThemeContextType {
  /**
   * Current active theme
   */
  theme: ThemeOption;
  
  /**
   * Function to set theme explicitly
   */
  setTheme: (theme: ThemeOption) => void;
  
  /**
   * Toggle between themes in sequence: light → dark → light
   */
  toggleTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light', // Default to light
  setTheme: () => {},
  toggleTheme: () => {},
});

// Custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  /**
   * Initial theme to use, falls back to OS preference or 'light'
   */
  initialTheme?: ThemeOption;
  
  /**
   * Whether to persist theme choice in localStorage
   * @default true
   */
  persistTheme?: boolean;
  
  /**
   * Children components
   */
  children: React.ReactNode;
}

/**
 * Theme provider component that manages theme state
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialTheme,
  persistTheme = true,
  children,
}) => {
  // Initialize theme state
  const [theme, setThemeState] = useState<ThemeOption>(() => {
    // Check for stored theme preference if persistence is enabled
    if (persistTheme && typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      
      // Handle migration from old theme names (origin/apex if needed)
      if (storedTheme === 'origin') return 'light';
      if (storedTheme === 'apex') return 'dark';
      
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme as ThemeOption;
      }
    }
    
    // Use provided initial theme if available
    if (initialTheme) {
      return initialTheme;
    }
    
    // Default to OS preference or light mode
    if (typeof window !== 'undefined' && 
        window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'; // Use dark as the dark mode theme
    }
    
    return 'light'; // Use light as the light mode theme
  });
  
  // Update document classes when theme changes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    // Remove only the 'dark' class before potentially re-adding it.
    root.classList.remove('dark'); 
    
    // Add .dark class only if the theme is dark
    if (theme === 'dark') {
      root.classList.add('dark'); 
    }
    
    // Persist theme preference if enabled
    if (persistTheme && typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme, persistTheme]);
  
  // Listen for OS theme preference changes (Optional: keep or remove if manual toggle is primary)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no theme is explicitly set via localStorage
      if (!localStorage.getItem('theme')) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Set theme function that updates state
  const setTheme = (newTheme: ThemeOption) => {
    setThemeState(newTheme);
  };
  
  // Toggle between themes in sequence
  const toggleTheme = () => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 