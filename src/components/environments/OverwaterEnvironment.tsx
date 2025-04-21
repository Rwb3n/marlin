import React from 'react';
import Particles from '../effects/Particles';
import styles from '../effects/OverwaterParticles.module.css';

/**
 * Renders a gentle, uplifting particle effect resembling dandelion seeds
 * drifting upwards, suitable for calm or ethereal background environments.
 */
const OverwaterEnvironment: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000, // Set high z-index to render on top
        overflow: 'hidden', // Prevent scrollbars if particles go slightly out
        pointerEvents: 'none', // Allow clicks to pass through
      }}
    >
      <Particles
        // quantity={30} // Number of dandelion seeds - Removed as per refactoring
        particleClassName={styles.dandelionParticle} // Apply specific styles
        animationName={styles.dandelionDrift}
      />
    </div>
  );
};

export default OverwaterEnvironment; 