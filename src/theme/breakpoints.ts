/**
 * Breakpoints System for BLUE MARLIN OS
 * 
 * This module defines responsive breakpoints for consistent 
 * layout adaptations across different screen sizes.
 * 
 * The system follows a mobile-first approach with named breakpoints
 * that can be used throughout the component system.
 */

export const breakpoints = {
  // Named breakpoints (pixel values)
  // These match Tailwind's default breakpoints for consistency
  values: {
    xs: '360px',    // Extra small devices (phones)
    sm: '640px',    // Small devices (large phones, small tablets)
    md: '768px',    // Medium devices (tablets)
    lg: '1024px',   // Large devices (desktops)
    xl: '1280px',   // Extra large devices (large desktops)
    '2xl': '1536px' // Ultra large devices
  },
  
  // Breakpoint matchers for media queries
  // Usage: @media ${breakpoints.up.md} { ... }
  up: {
    xs: `(min-width: 360px)`,
    sm: `(min-width: 640px)`,
    md: `(min-width: 768px)`,
    lg: `(min-width: 1024px)`,
    xl: `(min-width: 1280px)`,
    '2xl': `(min-width: 1536px)`
  },
  
  // Down breakpoints (max-width queries)
  // Usage: @media ${breakpoints.down.lg} { ... }
  down: {
    xs: `(max-width: 359px)`,
    sm: `(max-width: 639px)`,
    md: `(max-width: 767px)`,
    lg: `(max-width: 1023px)`,
    xl: `(max-width: 1279px)`,
    '2xl': `(max-width: 1535px)`
  },
  
  // Between breakpoints
  // Usage: @media ${breakpoints.between.sm.lg} { ... }
  between: {
    xs: {
      sm: `(min-width: 360px) and (max-width: 639px)`,
      md: `(min-width: 360px) and (max-width: 767px)`,
      lg: `(min-width: 360px) and (max-width: 1023px)`,
      xl: `(min-width: 360px) and (max-width: 1279px)`,
      '2xl': `(min-width: 360px) and (max-width: 1535px)`
    },
    sm: {
      md: `(min-width: 640px) and (max-width: 767px)`,
      lg: `(min-width: 640px) and (max-width: 1023px)`,
      xl: `(min-width: 640px) and (max-width: 1279px)`,
      '2xl': `(min-width: 640px) and (max-width: 1535px)`
    },
    md: {
      lg: `(min-width: 768px) and (max-width: 1023px)`,
      xl: `(min-width: 768px) and (max-width: 1279px)`,
      '2xl': `(min-width: 768px) and (max-width: 1535px)`
    },
    lg: {
      xl: `(min-width: 1024px) and (max-width: 1279px)`,
      '2xl': `(min-width: 1024px) and (max-width: 1535px)`
    },
    xl: {
      '2xl': `(min-width: 1280px) and (max-width: 1535px)`
    }
  }
}; 