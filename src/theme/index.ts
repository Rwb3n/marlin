/**
 * Theme System for BLUE MARLIN OS
 * 
 * This is the main entry point for all theme-related modules.
 * It exports everything from the individual theme files for easy access.
 */

import { colors } from './colors';
import { typography } from './typography';
import { animations } from './animations';
import { spacing } from './spacing';
import { breakpoints } from './breakpoints';

export {
  colors,
  typography,
  animations,
  spacing,
  breakpoints
};

// For direct theme module access
export * from './colors';
export * from './typography';
export * from './animations';
export * from './spacing';
export * from './breakpoints';

// Default export for convenience
const theme = {
  colors,
  typography,
  animations,
  spacing,
  breakpoints
};

export default theme; 