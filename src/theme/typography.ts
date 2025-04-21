/**
 * Typography System for BLUE MARLIN OS
 * 
 * This module extracts typography tokens from the legacy CSS variables
 * and organizes them for use with Tailwind CSS.
 * 
 * The system includes font families, sizes, weights, line heights,
 * and letter spacing values from the original design.
 */

export const typography = {
  // Merged font families (ensure names with spaces are quoted)
  fontFamily: {
    sans: ["Archivo", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
    display: ["Instrument Serif", "serif"],
    logoFont: ["Prosto One", "sans-serif"],
    mono: ["monospace"],
    // Removed old serif definition unless needed
  },

  // Font sizes with responsive values
  fontSize: {
    base: 'clamp(16px, 4vw, 24px)', // Responsive base font size
    code: '0.9em', // Slightly smaller than body text
    // Standard sizing scale - we'll add more based on actual usage in components
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  // Line heights extracted from legacy CSS
  lineHeight: {
    tight: '1.2', // For headings
    normal: '1.6', // Body text
  },

  // Letter spacing extracted from legacy CSS
  letterSpacing: {
    normal: '0',
    wide: '0.05em', // For headings
  },

  // Extracted text styling attributes
  paragraphSpacing: '1rem',
  headingSpacing: '1rem',
  
  // Text wrapping rules
  wordBreak: {
    normal: 'normal',
    breakWord: 'break-word',
  },
  
  // Additional typographic features
  textDecoration: {
    none: 'none',
    underline: 'underline',
  },
}; 