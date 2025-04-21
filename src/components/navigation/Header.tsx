import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
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
  const { theme } = useTheme();
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
  
  // Determine if it's the home page
  const isHomePage = location.pathname === '/';

  // Determine styles based on scroll state and theme
  const isTransparent = !isScrolled && isHomePage;
  const headerBgClass = isTransparent
    ? 'bg-transparent'
    : theme === 'light'
      ? 'bg-white/80 backdrop-blur-md shadow-sm'
      : 'bg-dark-bg-dark/80 backdrop-blur-md shadow-sm';

  const textColorClass = isTransparent 
    ? 'text-white'
    : theme === 'light'
      ? 'text-light-text'
      : 'text-dark-text';
      
  const borderClass = theme === 'light'
    ? 'border-light-border'
    : 'border-dark-border';

  const hoverFocusColor = theme === 'light' ? 'text-light-primary' : 'text-dark-primary';
  const underlineColor = theme === 'light' ? 'bg-light-accent' : 'bg-dark-accent';

  // Static navigation items (could be fetched or passed as props)
  const navItems = [
    { label: 'PROJECTS', href: '/projects' },
    { label: 'JOURNAL', href: '/journal' },
  ];

  return (
    <header 
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        headerBgClass,
        textColorClass,
      )}
    >
      <Container className="relative flex h-16 items-center justify-between">
        {/* Depth/Time Display (Left flex item) */}
        <div className={clsx(
          'flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full border',
          theme === 'light' ? 'border-light-border' : 'border-dark-border'
        )}>
          <div className={clsx(
            'w-2 h-2 rounded-full animate-pulse',
            theme === 'light' ? 'bg-light-accent' : 'bg-dark-accent'
          )} />
          <span className={clsx(
            theme === 'light' 
              ? 'text-light-text' // Light theme always uses dark text
              : isTransparent // Only check transparency if theme is dark
                ? 'text-white' // Dark theme, transparent -> white text
                : 'text-dark-text' // Dark theme, not transparent -> light text
          )}>
            [UK : LDN] {time}
          </span> 
        </div>

        {/* Desktop Navigation (Absolutely centered) */}
        <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) => clsx(
                'relative px-1 py-2 text-sm font-medium group transition-colors duration-150 ease-in-out',
                theme === 'light' 
                  ? 'text-light-text' 
                  : isTransparent 
                    ? 'text-white' 
                    : 'text-dark-text',
                `hover:${hoverFocusColor} focus:${hoverFocusColor}`,
              )}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={clsx(
                    'absolute inset-x-0 bottom-0 h-0.5 transition-transform duration-200 ease-out transform',
                    underlineColor,
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )} />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right side controls (Right flex item) */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </Container>

      {/* Mobile Navigation Links (Added below main container) */}
      <div className="flex md:hidden justify-center items-center py-2 border-t border-white/10">
        {navItems.map((item) => (
          <NavLink
            key={`${item.label}-mobile`}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) => clsx(
              'relative px-3 py-1 text-sm font-medium group transition-colors duration-150 ease-in-out',
              theme === 'light' 
                ? 'text-light-text' 
                : isTransparent 
                  ? 'text-white' 
                  : 'text-dark-text',
              `hover:${hoverFocusColor} focus:${hoverFocusColor}`,
            )}
          >
            {({ isActive }) => (
              <>
                {item.label}
                <span className={clsx(
                  'absolute inset-x-0 bottom-0 h-0.5 transition-transform duration-200 ease-out transform',
                  isActive ? 'scale-x-100' : 'scale-x-0',
                  underlineColor
                )} />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </header>
  );
} 