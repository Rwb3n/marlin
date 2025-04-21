/**
 * Animation System for BLUE MARLIN OS
 * 
 * This module extracts animation keyframes and timing values from the legacy CSS
 * and organizes them for use with Tailwind CSS.
 * 
 * The system includes keyframes, durations, and timing functions for:
 * - Light shaft movements
 * - Particle effects
 * - UI element animations
 */

export const animations = {
  // Animation keyframes
  keyframes: {
    // Light shaft movement animations
    shaftMove1: {
      '0%, 100%': {
        transform: 'translateX(0) rotate(-4deg) scaleX(1)',
      },
      '33%': {
        transform: 'translateX(-20px) rotate(-4.5deg) scaleX(0.95)',
      },
      '66%': {
        transform: 'translateX(20px) rotate(-3.5deg) scaleX(1.05)',
      },
    },
    
    shaftMove2: {
      '0%, 100%': {
        transform: 'translateX(0) rotate(-5.5deg) scaleX(1)',
      },
      '33%': {
        transform: 'translateX(25px) rotate(-5deg) scaleX(1.05)',
      },
      '66%': {
        transform: 'translateX(-25px) rotate(-6deg) scaleX(0.95)',
      },
    },
    
    shaftMove3: {
      '0%, 100%': {
        transform: 'translateX(0) rotate(-3deg) scaleX(1)',
      },
      '33%': {
        transform: 'translateX(-15px) rotate(-3.5deg) scaleX(0.9)',
      },
      '66%': {
        transform: 'translateX(15px) rotate(-2.5deg) scaleX(1.1)',
      },
    },
    
    shaftMove4: {
      '0%, 100%': {
        transform: 'translateX(0) rotate(-6deg) scaleX(1)',
      },
      '33%': {
        transform: 'translateX(-20px) rotate(-6.5deg) scaleX(0.95)',
      },
      '66%': {
        transform: 'translateX(20px) rotate(-5.5deg) scaleX(1.05)',
      },
    },
    
    // Light shaft glow animation
    shaftGlow: {
      '0%, 100%': {
        opacity: '0.4',
        filter: 'blur(20px)',
      },
      '50%': {
        opacity: '0.7',
        filter: 'blur(15px)',
      },
    },
    
    // Status indicator pulsing
    pulse: {
      '0%, 100%': { opacity: '0.4' },
      '50%': { opacity: '1' },
    },
    
    // Content entrance animation
    floatIn: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    
    // Button glow effect (day mode)
    pulseGlow: {
      '0%, 100%': { 
        boxShadow: '0 0 8px rgba(255, 68, 0, 0.4), inset 0 0 3px rgba(255,255,255,0.2)'
      },
      '50%': { 
        boxShadow: '0 0 25px rgba(255, 68, 0, 0.8), inset 0 0 8px rgba(255,255,255,0.4)'
      },
    },
    
    // Particle floating animation
    drift: {
      '0%': {
        transform: 'translateY(50px) translateX(0px)',
        opacity: '0',
      },
      '10%': {
        opacity: '0.6',
      },
      '20%': {
        transform: 'translateY(-20px) translateX(-5px)',
      },
      '40%': {
        transform: 'translateY(-40px) translateX(3px)',
      },
      '60%': {
        transform: 'translateY(-60px) translateX(-2px)',
      },
      '80%': {
        transform: 'translateY(-80px) translateX(4px)',
      },
      '90%': {
        opacity: '0.6',
      },
      '100%': {
        transform: 'translateY(-150px) translateX(0px)',
        opacity: '0',
      },
    },
    
    // Water ripple effect (for mouse interaction)
    rippleEffect: {
      '0%': {
        transform: 'scale(0)',
        opacity: '0.8',
      },
      '100%': {
        transform: 'scale(2)',
        opacity: '0',
      },
    }
  },
  
  // Animation durations extracted from legacy CSS usage
  durations: {
    fast: '300ms',
    normal: '500ms',
    slow: '800ms',
    themed: '1s', // Used for theme transitions
    
    // Custom durations for specific animations
    shaft1: '20s',
    shaft2: '25s',
    shaft3: '30s',
    drift: '30s',
    floatIn: '0.8s',
    ripple: '2.5s',
  },
  
  // Animation timing functions
  timingFunctions: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    linear: 'linear',
  },
  
  // Animation fill modes
  fillModes: {
    none: 'none',
    forwards: 'forwards',
    backwards: 'backwards',
    both: 'both',
  },
  
  // Animation iteration settings
  iterations: {
    infinite: 'infinite',
    once: '1',
  },
}; 