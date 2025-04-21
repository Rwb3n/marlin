import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Define SVG components for Sun and Moon icons for better readability and reuse
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

/**
 * ThemeToggle Component
 * 
 * A switch-like component for toggling between application themes.
 * Provides accessibility features and visual feedback.
 * 
 * Toggles between 'light' and 'dark' themes using ThemeContext.
 */
interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Additional classes to apply to the toggle button container */
  className?: string;
  /** Whether to use a minimal design variant (currently only standard is implemented) */
  minimal?: boolean; // Note: Only standard toggle is implemented in this refactor
  /** Label ID for aria-labelledby association */
  labelId?: string;
}

/**
 * ThemeToggle Component
 *
 * Renders an accessible theme toggle switch button with a sliding knob animation,
 * similar to the legacy implementation but using React and Tailwind CSS.
 * Toggles between 'origin' (light) and 'apex' themes using ThemeContext.
 */
export default function ThemeToggle({
  className = '',
  minimal = false,
  labelId,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering on server or before mount to avoid hydration mismatch
  if (!isMounted) {
    return <div className="w-10 h-6" />; // Placeholder for size
  }

  // Determine current state based on theme
  const isDarkTheme = theme === 'dark';
  const label = isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme';

  // Styling based on theme and state
  // Use specific lighter shades for the background track
  const bgClass = isDarkTheme
    ? 'bg-slate-700' // Further lighter shade for dark theme track
    : 'bg-slate-200'; // Lighter shade for light theme track

  const knobBgClass = isDarkTheme ? 'bg-dark-accent' : 'bg-light-accent'; // Keep knob color as is
  // Keep the tweaked transform value
  const transformClass = isDarkTheme ? 'translate-x-[23px]' : 'translate-x-0';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  // TODO: Implement minimal variant if needed in the future.
  // if (minimal) { ... return minimal version ... }

  // Render the standard toggle switch
  return (
    <button
      type="button"
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={isDarkTheme}
      aria-label={label}
      aria-labelledby={labelId}
      title={label}
      className={`
        p-0 /* Override external button padding */
        relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full
        border border-transparent /* Explicit border + transparent color */ 
        hover:border-transparent /* Override global button hover border */
        transition-colors duration-200 ease-in-out /* Note: transition applies to colors, not border */
        /* Reset focus and active outlines */
        focus:outline-none active:outline-none 
        ${bgClass}
        ${className}
      `}
    >
      <span className="sr-only">Use {isDarkTheme ? 'Light' : 'Dark'} theme</span>
      
      <span
        aria-hidden="true"
        className={`
          box-border pointer-events-none inline-block h-5 w-5 transform rounded-full
          /* Remove shadow class entirely */
          bg-white dark:bg-slate-300 ring-0 
          transition duration-200 ease-in-out
          ${knobBgClass}
          ${transformClass}
        `}
      >
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out ${isDarkTheme ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <MoonIcon /> 
        </span>
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out ${isDarkTheme ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        >
          <SunIcon />
        </span>
      </span>
    </button>
  );
} 