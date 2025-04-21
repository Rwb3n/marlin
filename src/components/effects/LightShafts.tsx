import React from 'react';
import styles from './LightShafts.module.css';

/**
 * Renders the animated light shaft elements for the underwater effect.
 * Uses CSS Modules for styling and animations.
 */
const LightShafts: React.FC = () => {
  // Add a console log to check if this updated component code is running
  console.log('Rendering LightShafts Component - VERSION WITH TEST CLASS!');

  // Array to define the unique class names for each shaft variation
  // These correspond to .lightShaft1, .lightShaft2, etc. in the CSS Module
  const shaftVariations = [
    styles.lightShaft1,
    styles.lightShaft2,
    styles.lightShaft3,
    styles.lightShaft4,
  ];

  return (
    // Container for all light shafts
    <div className={styles.lightShaftsContainer} aria-hidden="true">
      {
        // Map over the variations to render each light shaft div
        shaftVariations.map((variationClass, index) => (
          <div
            key={`light-shaft-${index}`}
            // Apply the specific variation class AND a static test class
            className={`${variationClass} my-test-shaft-class`}
          />
        ))
      }
    </div>
  );
};

export default LightShafts; 