/**
 * Spacing System for BLUE MARLIN OS
 * 
 * This module defines spacing tokens for consistent layout measurements
 * throughout the application.
 * 
 * The system includes base spacing units, component-specific spacing,
 * and layout measurements extracted from the legacy design.
 */

export const spacing = {
  // Base spacing scale (in rem units)
  scale: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  
  // Container padding (responsive)
  container: {
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '5rem',
  },
  
  // Section spacing
  section: {
    sm: '2rem',
    md: '4rem',
    lg: '6rem',
    xl: '8rem',
  },
  
  // Component spacing
  component: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  // Layout-specific tokens
  layout: {
    headerHeight: '4rem',
    footerPadding: '2rem',
    navigationGap: '1.5rem',
    cardGap: '1rem',
    gridGap: '2rem',
  },
  
  // Content spacing
  content: {
    paragraphGap: '1.5rem',
    headingGap: '1rem',
    listItemGap: '0.5rem',
  }
}; 