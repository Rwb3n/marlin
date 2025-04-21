/**
 * ========================================================================
 * BLUE MARLIN OS JavaScript
 * ------------------------------------------------------------------------
 * Handles interactive user interface elements and visual effects
 *
 * Main responsibilities:
 * - Theme toggling (day/night modes)
 * - Underwater background effects (particles, ripples)
 * - Live time display in the header
 * - Navigation highlighting and smooth scrolling
 * - Scroll-triggered animations for content
 * - Accessibility features (reduced motion)
 * - Device capability detection for performance
 * ========================================================================
 */

// ----------------------
// Theme Toggle Functionality
// ----------------------
// Handles switching between day (phase-origin) and night (phase-apex) themes
// Updates the toggle button icon and aria-label for accessibility

document.getElementById('themeToggle').addEventListener('click', function() {
    // Toggle theme classes on html element
    document.documentElement.classList.toggle('phase-origin');
    
    // Update the toggle button appearance and aria-label
    const isDarkMode = !document.documentElement.classList.contains('phase-origin');
    const toggleKnob = document.querySelector('.theme-toggle-knob');
    const icon = toggleKnob.querySelector('.theme-toggle-icon');
    
    // Update the aria-label for screen readers
    this.setAttribute('aria-label', isDarkMode ? 'Switch to day mode' : 'Switch to night mode');
    
    // Update the icon (moon for night, sun for day)
    if (icon) {
      icon.textContent = isDarkMode ? '☾' : '☀';
    }
});

// ----------------------
// Live Time Display
// ----------------------
// Updates the time in the header every second
(function updateClock() {
    const timeElement = document.querySelector('.location-time span');
    if (!timeElement) return;
    
    function updateTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeString = `${hours}:${minutes}:${seconds}`;
      
      timeElement.textContent = `UK:LDN | ${timeString}`;
    }
    
    // Update immediately and then set interval
    updateTime();
    setInterval(updateTime, 1000);
})();

// ----------------------
// Navigation Highlighting & Smooth Scroll
// ----------------------
// Keeps active nav link in sync between desktop and mobile nav
// Enables smooth scrolling to anchor sections
(function setupNavigation() {
    // Helper to set active nav link by href
    function setActiveNavLink(href) {
      // Update desktop navigation
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
          link.classList.add('active');
        }
      });
      // Update mobile navigation
      document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
          link.classList.add('active');
        }
      });
    }
    // Listen for nav link clicks
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          setActiveNavLink(href);
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
})();

// ----------------------
// Scroll-triggered Animations
// ----------------------
// Adds entrance animation to .content-container elements as they enter viewport
(function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.content-container');
    // Helper: is element in viewport?
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    }
    // On scroll, animate elements that enter viewport
    function handleScroll() {
      animateElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('has-animated')) {
          element.classList.add('has-animated');
          element.style.animationDelay = '0s';
          element.style.animationDuration = '0.8s';
          element.style.animationName = 'floatIn';
          element.style.animationFillMode = 'backwards';
        }
      });
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
})();

// ----------------------
// Accessibility: Reduced Motion
// ----------------------
// Disables all animations and transitions if user prefers reduced motion
(function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Remove all animations
      const style = document.createElement('style');
      style.textContent = '* { animation: none !important; transition: none !important; }';
      document.head.appendChild(style);
      // Hide particles for accessibility
      const particlesContainer = document.getElementById('particles');
      if (particlesContainer) {
        particlesContainer.style.display = 'none';
      }
    }
})();

// ----------------------
// Device Capability Detection
// ----------------------
// Adjusts visual effects for low-end devices (less particles, less blur, etc.)
(function detectDeviceCapabilities() {
    // Simple device capability detection based on screen size and pixel ratio
    const isMobile = window.innerWidth < 768;
    const isHighDPI = window.devicePixelRatio > 1.5;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    // Adjust visual effects based on device capabilities
    if (isLowEndDevice || (isMobile && !isHighDPI)) {
      // Reduce visual effects for low-end devices
      document.querySelectorAll('.light-shaft').forEach(shaft => {
        shaft.style.opacity = '0.3';
        shaft.style.filter = 'blur(5px)';
      });
      // Reduce shadow effects
      document.querySelectorAll('.journal-card').forEach(card => {
        card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
      });
    }
})();

// ----------------------
// Particle System
// ----------------------
// Creates and animates floating particles in all underwater backgrounds
function createParticles() {
  console.log("Creating particles...");
  // Select all .particles containers (main and demo)
  document.querySelectorAll('.particles').forEach(particlesContainer => {
    if (!particlesContainer) return;
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    const particleCount = 100; // Adjust number of particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      // Random size for each particle
      const size = Math.random() * 4 + 1; // 1px to 5px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      // Random position within the container
      particle.style.left = `${Math.random() * 90 + 5}%`;
      particle.style.top = `${Math.random() * 90 + 5}%`;
      // Random animation duration and delay for natural movement
      const duration = Math.random() * 20 + 15; // 15s to 35s
      const delay = Math.random() * 15;  // 0s to 15s
      particle.style.animation = `drift ${duration}s linear ${delay}s infinite`;
      particlesContainer.appendChild(particle);
    }
    console.log(`${particleCount} particles created and animated in`, particlesContainer);
  });
}

// ----------------------
// Mouse Water Ripple Effect
// ----------------------
// Creates a ripple effect at the mouse position on movement
function initMouseWaterEffect() {
  const body = document.body;
  let throttled = false;
  body.addEventListener('mousemove', (e) => {
    // Throttle the effect creation to avoid performance issues
    if (!throttled) {
      throttled = true;
      setTimeout(() => { throttled = false; }, 150); // Only create a new ripple every 150ms
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.classList.add('water-ripple');
      // Position at mouse coordinates
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      // Add to DOM
      body.appendChild(ripple);
      // Animate
      ripple.style.animation = 'rippleEffect 2.5s ease-out forwards'; // Slower animation
      // Remove after animation completes
      setTimeout(() => {
        body.removeChild(ripple);
      }, 2500); // Match the animation duration
    }
  });
}

// ----------------------
// Form Validation and Interaction
// ----------------------
// Handles form input validation, feedback, and accessibility enhancements
function initFormInteractions() {
  // Form validation
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Input focus effects
    const formInputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
    formInputs.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', () => {
        const label = input.previousElementSibling;
        if (label && label.classList.contains('form-label')) {
          label.classList.add('label-active');
        }
      });
      
      input.addEventListener('blur', () => {
        const label = input.previousElementSibling;
        if (label && label.classList.contains('form-label') && !input.value) {
          label.classList.remove('label-active');
        }
      });
      
      // Live validation feedback
      input.addEventListener('input', () => {
        validateInput(input);
      });
    });
    
    // For checkboxes and radio buttons
    const checkInputs = form.querySelectorAll('.form-check-input');
    checkInputs.forEach(input => {
      // Enhance keyboard accessibility
      input.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          input.click();
        }
      });
    });
    
    // Form submission with validation
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      formInputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        // For demo purposes, show success message instead of submitting
        const successMessage = document.createElement('div');
        successMessage.className = 'form-feedback valid';
        successMessage.style.padding = '0.75rem';
        successMessage.style.marginTop = '1rem';
        successMessage.innerHTML = 'Form submitted successfully! <small>(This is a demo, no actual submission)</small>';
        
        // Replace submit button with success message
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.parentNode.insertBefore(successMessage, submitBtn.nextSibling);
          submitBtn.disabled = true;
        }
      }
    });
  });
}

// Validate a single input and show appropriate feedback
function validateInput(input) {
  // Skip validation if input has no required attribute
  if (!input.hasAttribute('required') && !input.value) {
    clearValidationState(input);
    return true;
  }
  
  let isValid = true;
  const errorMessage = getErrorMessage(input);
  
  if (errorMessage) {
    setInvalidState(input, errorMessage);
    isValid = false;
  } else {
    setValidState(input);
  }
  
  return isValid;
}

// Get appropriate error message based on validation rules
function getErrorMessage(input) {
  if (input.hasAttribute('required') && !input.value.trim()) {
    return 'This field is required';
  }
  
  if (input.type === 'email' && input.value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.value)) {
      return 'Please enter a valid email address';
    }
  }
  
  // Add more validation rules as needed
  
  return null;
}

// Set invalid state with feedback
function setInvalidState(input, message) {
  clearValidationState(input);
  input.classList.add('is-invalid');
  
  // Add feedback message
  let feedback = input.nextElementSibling;
  if (!feedback || !feedback.classList.contains('form-feedback')) {
    feedback = document.createElement('div');
    feedback.className = 'form-feedback invalid';
    input.parentNode.insertBefore(feedback, input.nextSibling);
  }
  
  feedback.textContent = message;
  feedback.classList.add('invalid');
  feedback.classList.remove('valid');
  
  // Accessibility
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', feedback.id || `${input.id}-feedback`);
}

// Set valid state with feedback
function setValidState(input) {
  clearValidationState(input);
  input.classList.add('is-valid');
  
  // Add feedback message for required fields
  if (input.hasAttribute('required') && input.value.trim()) {
    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains('form-feedback')) {
      feedback = document.createElement('div');
      feedback.className = 'form-feedback valid';
      input.parentNode.insertBefore(feedback, input.nextSibling);
    }
    
    feedback.textContent = 'Looks good!';
    feedback.classList.add('valid');
    feedback.classList.remove('invalid');
  }
  
  // Accessibility
  input.setAttribute('aria-invalid', 'false');
}

// Clear validation state
function clearValidationState(input) {
  input.classList.remove('is-valid', 'is-invalid');
  
  // Remove feedback if it exists
  const feedback = input.nextElementSibling;
  if (feedback && feedback.classList.contains('form-feedback')) {
    feedback.textContent = '';
  }
  
  // Clear accessibility attributes
  input.removeAttribute('aria-invalid');
}

// ----------------------
// Initialization
// ----------------------
// Runs after DOM is loaded to set up all effects and listeners
function init() {
  console.log("Initializing BLUE MARLIN OS interface...");
  
  // Set default theme to day mode (phase-origin)
  document.documentElement.classList.add('phase-origin');
  // Update theme toggle button to show sun icon and appropriate aria-label
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', 'Switch to night mode');
    const icon = themeToggle.querySelector('.theme-toggle-icon');
    if (icon) {
      icon.textContent = '☀';
    }
  }
  
  // Theme toggle is already set up above via event listener
  // Create particles for underwater effect
  createParticles();
  // Initialize form interactions
  initFormInteractions();
  // Log initialization complete
  console.log("Interface initialization complete");
}

// Ensure init runs after DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}