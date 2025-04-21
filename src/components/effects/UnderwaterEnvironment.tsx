import React from 'react';
import { useTheme } from '../../context/ThemeContext'; // Adjust path if necessary
import LightShafts from './LightShafts';
import Particles from './Particles';
import styles from './UnderwaterEnvironment.module.css';

/**
 * Main component for the underwater visual effect.
 * - Conditionally renders based on the current theme (only visible in 'dark' mode).
 * - Acts as a container for the LightShafts and Particles components.
 * - Uses a fixed position to sit behind the main application content.
 */
const UnderwaterEnvironment: React.FC = () => {
  // Get the current theme from the context
  const { theme } = useTheme();

  // Only render the effect if the theme is 'dark'
  if (theme !== 'dark') {
    return null; // Don't render if not dark theme
  }

  // Render the main container and the effect sub-components
  return (
    <div className={styles.underwaterEnvironment} aria-hidden="true">
      {/* Render the light shaft elements */}
      <LightShafts />
      {/* Render the particle elements (default count is 100) */}
      <Particles />
    </div>
  );
};

export default UnderwaterEnvironment; 