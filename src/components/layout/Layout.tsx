import React, { ReactNode } from 'react';
// Removed commented import { Helmet } from 'react-helmet-async';
// import { useLocation } from 'react-router-dom'; // No longer needed
import clsx from 'clsx';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';
// import MobileNav from '../navigation/MobileNav';
import UnderwaterEnvironment from '../effects/UnderwaterEnvironment';
// LightBackgroundEffect component removed
import { useTheme } from '../../context/ThemeContext';
import ScrollToTop from '../utils/ScrollToTop';
import styles from './Layout.module.css'; // Import CSS Module

/**
 * Layout Component
 * 
 * Provides consistent layout structure for all pages with:
 * // Removed comment about SEO metadata through react-helmet-async
 * - Underwater background effect
 * - Header with navigation
 * - Main content area
 * - Footer
 * - Mobile navigation for small viewports
 * 
 * The component applies theme classes to the root element and handles
 * SEO metadata including title and description.
 */
export interface LayoutProps {
  /** Page content */
  children: ReactNode;
  /** Page title to be displayed in the browser tab */
  pageTitle?: string;
  /** Page description for SEO */
  description?: string;
  // showUnderwaterEffect prop removed
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle,
  description,
  // showUnderwaterEffect removed
}) => {
  const { theme } = useTheme();
  // const isApexTheme = theme === 'apex'; // No longer needed for background
  // const location = useLocation(); // No longer needed here
  
  console.log('Current theme:', theme);

  // Data URI for the grain filter - WITH base rectangle
  const grainDataUri = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainy'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.1' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='black'/%3E%3Crect width='100%25' height='100%25' filter='url(%23grainy)'/%3E%3C/svg%3E";

  return (
    <div 
      className={clsx(
        "site-container",
        // Conditionally apply the CSS module classes for the light theme background
        theme === 'light' && [
          // Applies base gradient and layered radial gradients via ::before pseudo-element
          styles.subtleGradientBackground, 
          // Applies grain texture via ::after pseudo-element
          styles.grainPseudo, 
        ]
      )}
      // Remove inline style
      style={undefined}
    >
      {/* Inline SVG definition removed */}

      <ScrollToTop />
      
      {/* Metadata tags rendered directly */}
      <title>
        {pageTitle ? `${pageTitle} | BLUE MARLIN OS` : 'BLUE MARLIN OS | Deep Sea Engineering'}
      </title>
      <meta 
        name="description" 
        content={description || 'BLUE MARLIN OS is an advanced operating system designed for deep-sea engineering, exploration, and research operations.'}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      {/* Open Graph tags for social sharing */}
      <meta property="og:title" content={pageTitle ? `${pageTitle} | BLUE MARLIN OS` : 'BLUE MARLIN OS'} />
      <meta 
        property="og:description" 
        content={description || 'BLUE MARLIN OS is an advanced operating system designed for deep-sea engineering, exploration, and research operations.'}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BLUE MARLIN OS" />
      {/* End of metadata tags */}

      {/* Render Dark theme environment only */}
      {theme === 'dark' && (
        <UnderwaterEnvironment />
      )}
      
      {/* Main site structure (now sits above the light theme background) */}
      <Header />
      
      {/* Apply responsive padding-top: more space on mobile due to two-row header */}
      <main className="pt-24 md:pt-16">
        {children}
      </main>
      
      <Footer />
      
      {/* Mobile navigation (hidden on desktop) - REMOVED */}
      {/* <MobileNav /> */}
    </div>
  );
};

export default Layout; 