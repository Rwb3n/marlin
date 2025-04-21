/**
 * Color System for BLUE MARLIN OS
 * 
 * This module extracts color tokens from the legacy CSS variables
 * and organizes them for use with Tailwind CSS.
 * 
 * The system is organized into two themes:
 * - light: Day theme with light, warm colors and orange accent
 * - dark: Night theme with dark, cool colors and blue accent
 */

// 1. Define base palettes
const lightColors = {
  primary: '#ff4400',
  secondary: '#ff9900',
  accent: '#ff4400',
  text: '#0e0e0e', // Define base text color here
  'text-inverted': '#e6edf5',
  border: '#cccccc',
  muted: '#666666',
};

const darkColors = {
  primary: '#00aaff',
  secondary: '#00ddff',
  accent: '#0084ff',
  text: '#e6edf5', // Define base text color here
  'text-inverted': '#0e0e0e',
  border: '#4a5568',
  muted: '#9ca3af',
};

// 2. Define semantic colors, referencing base palettes
const semanticColors = {
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

// 3. Combine into the final export object
const colors = {
  light: lightColors,
  dark: darkColors,
  semantic: semanticColors,
};

export { colors }; // Use ES Module export 