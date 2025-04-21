import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Container from './Container';

/**
 * ContentContainer Component
 * 
 * A specialized container that applies glassmorphism effect and animation to content sections.
 * Features:
 * - Optional glassmorphism effect with backdrop blur
 * - Entrance animation option with fade-in and float-up effects
 * - Width variants (default, narrow, wide)
 * - Theme integration with apex/origin variants
 * - Customizable HTML element type via the "as" prop
 * 
 * @example
 * <ContentContainer withGlass withAnimation>
 *   <h2>Section Title</h2>
 *   <p>Content goes here...</p>
 * </ContentContainer>
 */
interface ContentContainerProps {
  /** Additional classes to apply to the container */
  className?: string;
  /** Content to render inside the container */
  children: React.ReactNode;
  /** Container width variation */
  variant?: 'default' | 'narrow' | 'wide';
  /** Whether to apply glassmorphism effect */
  withGlass?: boolean;
  /** Whether to apply entrance animation */
  withAnimation?: boolean;
  /** HTML element type to render as */
  as?: React.ElementType;
  /** ID attribute for the container */
  id?: string;
}

export default function ContentContainer({
  className = '',
  children,
  variant = 'default',
  withGlass = true,
  withAnimation = false,
  as: Component = 'section',
  id,
}: ContentContainerProps) {
  const { theme } = useTheme();
  const [hasAnimated, setHasAnimated] = React.useState(false);
  
  // Set up animation observer if animation is enabled
  React.useEffect(() => {
    if (!withAnimation) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    
    // Get the element to observe
    const element = document.getElementById(id || '');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [withAnimation, hasAnimated, id]);
  
  // Determine width class based on variant
  const widthClass = {
    narrow: 'max-w-3xl',
    default: 'max-w-5xl',
    wide: 'max-w-7xl',
  }[variant];
  
  // Determine background and border based on theme and glass effect
  const bgClass = withGlass
    ? theme === 'light' 
      ? 'bg-light-containerBg backdrop-blur-md' 
      : 'bg-dark-containerBg backdrop-blur-md'
    : theme === 'light'
      ? 'bg-light-bg'
      : 'bg-dark-bg';
      
  const borderClass = theme === 'light' 
    ? 'border-light-border'
    : 'border-dark-border';
    
  // Animation classes
  const animationClass = withAnimation && hasAnimated
    ? 'animate-floatIn opacity-100'
    : withAnimation && !hasAnimated
      ? 'opacity-0'
      : '';
  
  return (
    <Component
      id={id}
      className={`
        ${bgClass} ${borderClass}
        mx-auto my-16 px-4 py-12 sm:px-6 md:px-8
        rounded-lg shadow-md
        ${widthClass}
        ${animationClass}
        transition-all duration-500
        ${className}
      `}
    >
      <Container width={variant as any} padding="none" className="px-0">
        {children}
      </Container>
    </Component>
  );
} 