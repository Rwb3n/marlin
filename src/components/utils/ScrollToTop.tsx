import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 *
 * This component ensures that the window scrolls to the top (0, 0)
 * whenever the route location changes. It utilizes the `useLocation` hook
 * from `react-router-dom` to detect navigation events.
 *
 * Place this component within your main layout or router context so it's
 * active on all page navigations.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array ensures effect runs only when pathname changes

  return null; // This component does not render anything visual
} 