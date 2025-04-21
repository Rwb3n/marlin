import React, { useState, useEffect } from 'react';
import styles from './Particles.module.css';

// Define the structure for individual particle data
interface ParticleStyle {
  id: number;
  left: string;
  top: string;
  width: string;
  height: string;
  animationDuration: string;
  animationDelay: string;
}

// Define props for the Particles component
interface ParticlesProps {
  count?: number; // Optional prop to set the number of particles
  particleClassName?: string; // Optional custom CSS class for each particle
  animationName?: string; // Optional custom animation name
}

/**
 * Generates and renders animated particle elements for the underwater effect.
 * Uses React hooks to manage particle data and CSS Modules for base styling.
 * Randomizes position, size, and animation timing for each particle.
 */
const Particles: React.FC<ParticlesProps> = ({
  count = 100, // Default particle count
  particleClassName = styles.particle, // Default to underwater particle style
  animationName, // No default animation name, rely on CSS class or inline style
}) => {
  // State to hold the style properties for all particles
  const [particles, setParticles] = useState<ParticleStyle[]>([]);

  // Effect hook to generate particle data on component mount
  useEffect(() => {
    const newParticles: ParticleStyle[] = [];
    for (let i = 0; i < count; i++) {
      // Generate random properties for each particle
      const size = Math.random() * 3 + 1; // Size: 1px to 4px
      const duration = Math.random() * 20 + 15; // Duration: 15s to 35s
      const delay = Math.random() * 15; // Delay: 0s to 15s

      newParticles.push({
        id: i,
        left: `${Math.random() * 90 + 5}%`, // Left position: 5% to 95%
        top: `${Math.random() * 90 + 5}%`, // Top position: 5% to 95%
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      });
    }
    // Update the state with the generated particle data
    setParticles(newParticles);
  }, [count]); // Rerun effect if the count prop changes

  return (
    // Container for all particle elements
    <div className={styles.particlesContainer} aria-hidden="true">
      {
        // Map over the particles state to render each particle div
        particles.map((p) => (
          <div
            key={p.id}
            // Apply the provided class name, defaulting to styles.particle
            className={particleClassName}
            style={{
              // Apply randomized styles inline
              left: p.left,
              top: p.top, // Note: Top position will be controlled by animation for overwater effect
              width: p.width,
              height: p.height,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
              // Conditionally apply animation name if provided
              ...(animationName && { animationName: animationName }),
            }}
          />
        ))
      }
    </div>
  );
};

export default Particles; 