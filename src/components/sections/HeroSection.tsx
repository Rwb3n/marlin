import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import useTypingEffect from '../../hooks/useTypingEffect';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';

interface HeroSectionProps {
  /**
   * Hero title (supports HTML string with line breaks)
   */
  title?: string | React.ReactNode;
  
  /**
   * Text displayed before the animated typing text
   */
  subtitle?: string;
  
  /**
   * Array of text phrases to cycle through in the typing animation
   */
  typingTexts?: string[];
  
  /**
   * Main descriptive text below the title
   */
  description?: string | React.ReactNode;
  
  /**
   * Text for the call-to-action button
   */
  buttonText?: string;
  
  /**
   * URL or anchor link for the button
   */
  buttonLink?: string;
  
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
}

/**
 * Hero section component for the landing page with animated typing effect
 * 
 * This component recreates the hero section from the legacy design with:
 * - Large title with optional line break
 * - Animated typing effect for subtitle text
 * - Descriptive paragraph
 * - Call-to-action button
 * 
 * The text patterns and animation behavior exactly match the legacy implementation.
 */
export function HeroSection({
  title = "DEEP SEA<br>INTERFACE",
  subtitle = "Operating at",
  typingTexts = ["extreme depths", "high pressure", "zero visibility", "absolute precision"],
  description = "BLUE MARLIN OS is an advanced operating system designed for deep-sea engineering, exploration, and research operations. Built for specialized submersibles and remote equipment, it functions reliably where conventional systems fail.",
  buttonText = "View Projects",
  buttonLink = "#projects",
  className = "",
}: HeroSectionProps) {
  const { theme } = useTheme();
  const typedText = useTypingEffect({ texts: typingTexts });
  
  // Handle title rendering with HTML line break if needed
  const renderTitle = () => {
    if (typeof title === 'string' && title.includes('<br>')) {
      const parts = title.split('<br>');
      return (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-title font-display">
          {parts[0]}
          <br />
          <span>{parts[1]}</span>
        </h1>
      );
    }
    
    return (
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-title font-display">
        {title}
      </h1>
    );
  };
  
  return (
    <Section className={clsx("py-12 lg:py-20 hero", className)}>
      <Container>
        <div className="text-center hero-content">
          {renderTitle()}
          
          <p className="hero-subtitle text-lg md:text-xl mb-4">
            {subtitle}{" "}
            <span className={clsx(
              "typing",
              theme === "apex" ? "text-apex-accent" : "text-origin-accent"
            )}>
              {typedText}
            </span>
          </p>
          
          <p className="hero-desc max-w-2xl mx-auto mb-8 text-base md:text-lg opacity-80">
            {description}
          </p>
          
          <Button 
            onClick={() => window.location.href = buttonLink}
            variant="glass-light" 
            className="primary-button"
          >
            {buttonText}
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export default HeroSection; 