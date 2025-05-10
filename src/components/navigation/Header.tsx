import React, { useState, useEffect } from 'react';
import Link from '../ui/Link';
import Container from '../layout/Container';
import ThemeToggle from './ThemeToggle';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

/**
 * Header Component
 * 
 * The main site header containing the logo, navigation links, and controls.
 * Features:
 * - Sticky positioning option
 * - Transparent background option
 * - Responsive design with mobile considerations
 * - Theme integration (apex/origin variants)
 * - Logo with customizable variant
 * 
 * @example
 * <Header
 *   logoVariant="default"
 *   showThemeToggle={true}
 *   transparent={false}
 *   sticky={true}
 * />
 */
interface HeaderProps {
  /** Additional classes to apply to the header */
  className?: string;
  /** Logo size variant */
  logoVariant?: 'default' | 'compact';
  /** Whether to show the theme toggle */
  showThemeToggle?: boolean;
  /** Whether the header should have a transparent background */
  transparent?: boolean;
  /** Whether the header should stick to the top of the viewport */
  sticky?: boolean;
}

export default function Header() {
  // const { theme } = useTheme(); // No longer needed for direct class logic
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const location = useLocation();

  // Effect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect to update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(
          now.getMinutes()
        ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      );
    };
    updateTime(); // Initial call
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId); // Cleanup
  }, []);
  
  // Determine if it's the home page and scrolled state
  const isHomePage = location.pathname === '/';
  const isTransparent = !isScrolled && isHomePage;

  // Static navigation items (can remain as is)
  const navItems = [
    { label: 'PROJECTS', href: '/projects' },
    { label: 'JOURNAL', href: '/journal' },
  ];

  // Consolidated header classes using data attributes and CSS variables implicitly via Tailwind
  const headerClasses = clsx(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
    // Background and text color based on transparency
    isTransparent
      ? 'bg-transparent text-white'
      : 'bg-background/80 dark:bg-background/80 backdrop-blur-md shadow-sm text-foreground' 
  );
  
  const depthTimeClasses = clsx(
      'flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full border',
      // Border color adjusts automatically with text color based on header state
      isTransparent ? 'border-white/50' : 'border-border'
  );

  const depthTimeIndicatorClasses = clsx(
    'w-2 h-2 rounded-full animate-pulse',
    isTransparent ? 'bg-white' : 'bg-accent' // Use accent color when not transparent
  );
  
  const depthTimeTextClasses = clsx(
    // Text color is handled by headerClasses
  );
  
  const navLinkClasses = (isActive: boolean) => clsx(
    'relative px-1 py-2 text-sm font-medium group transition-colors duration-150 ease-in-out',
    // Text color handled by headerClasses
    'hover:text-primary focus:text-primary' // Use semantic primary for hover/focus
  );
  
  const mobileNavLinkClasses = (isActive: boolean) => clsx(
    'relative px-3 py-1 text-sm font-medium group transition-colors duration-150 ease-in-out',
    // Text color handled by headerClasses
    'hover:text-primary focus:text-primary' // Use semantic primary for hover/focus
  );
  
  const underlineClasses = (isActive: boolean) => clsx(
    'absolute inset-x-0 bottom-0 h-0.5 transition-transform duration-200 ease-out transform',
    'bg-accent', // Always use accent color
    isActive ? 'scale-x-100' : 'scale-x-0', // Mobile version doesn't use group-hover for underline
  );
  
  const desktopUnderlineClasses = (isActive: boolean) => clsx(
    'absolute inset-x-0 bottom-0 h-0.5 transition-transform duration-200 ease-out transform',
    'bg-accent', // Always use accent color
    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
  );

  return (
    <header className={headerClasses}>
      <Container className="relative flex h-16 items-center justify-between">
        {/* Depth/Time Display */}
        <div className={depthTimeClasses}>
          <div className={depthTimeIndicatorClasses} />
          <span className={depthTimeTextClasses}>
            [UK : LDN] {time}
          </span> 
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) => navLinkClasses(isActive)}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={desktopUnderlineClasses(isActive)} />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </Container>

      {/* Mobile Navigation Links */}
      <div className={clsx(
        "flex md:hidden justify-center items-center py-2 border-t",
        isTransparent ? 'border-white/10' : 'border-border' // Adjust border based on transparency
      )}>
        {navItems.map((item) => (
          <NavLink
            key={`${item.label}-mobile`}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) => mobileNavLinkClasses(isActive)}
          >
            {({ isActive }) => (
              <>
                {item.label}
                <span className={underlineClasses(isActive)} />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </header>
  );
} 