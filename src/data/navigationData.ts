/**
 * Navigation Data (TypeScript Version)
 * 
 * This file contains all navigation-related data structures and utility functions for the site.
 */

// --- Type Definitions ---

// Interface for a single navigation link (can be nested)
interface NavLink {
  id: string;
  label: string;
  path: string;
  exact?: boolean; // Optional for primary nav
  icon?: string; // Optional for utility nav
  children?: NavLink[]; // Optional for nested links
}

// Interface for Footer Navigation categories
interface FooterNavCategory {
  label: string;
  path: string;
}

// Type for Footer Navigation (object with arrays of categories)
// Uses a more specific type than Record<string, ...> if categories are fixed
type FooterNavigation = {
  company: FooterNavCategory[];
  research: FooterNavCategory[];
  technology: FooterNavCategory[];
  resources: FooterNavCategory[];
  legal: FooterNavCategory[];
  // Add other categories if they exist
};

// Interface for Mobile Navigation Config
interface MobileNavConfig {
  breakpoint: number;
  transitionDuration: number;
  menuOpenDefault: boolean;
  expandedDefault: string[];
}

// Interface for Social Media Links
interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon?: string; // Optional icon
}

// Interface for Breadcrumb Config
interface BreadcrumbConfig {
  showHome: boolean;
  homeLabel: string;
  separator: string;
  maxItems: number;
  truncationIndicator: string;
}

// Interface for a Breadcrumb Item
interface BreadcrumbItem {
  label: string;
  path: string;
}

// --- Exported Data ---

/**
 * Primary Navigation
 */
export const primaryNavigation: NavLink[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    exact: true
  },
  // ... (rest of the primaryNavigation array as in the .js file)
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact'
  }
];

/**
 * Footer Navigation
 */
export const footerNavigation: FooterNavigation = {
  company: [
    { label: 'About Us', path: '/about' },
    // ... (rest of company links)
    { label: 'Contact Us', path: '/contact' }
  ],
  research: [
    { label: 'Research Areas', path: '/research/areas' },
    // ... (rest of research links)
    { label: 'Data Access', path: '/research/data' }
  ],
  technology: [
    { label: 'Platforms', path: '/technology/platforms' },
    // ... (rest of technology links)
    { label: 'Data Systems', path: '/technology/data-systems' }
  ],
  resources: [
    { label: 'Blog', path: '/blog' },
    // ... (rest of resources links)
    { label: 'FAQs', path: '/faqs' }
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    // ... (rest of legal links)
    { label: 'Accessibility', path: '/accessibility' }
  ]
};

/**
 * Utility Navigation
 */
export const utilityNavigation: NavLink[] = [
  {
    id: 'search',
    label: 'Search',
    path: '/search',
    icon: 'search' // Assuming icon is a string identifier
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    path: '/newsletter',
    icon: 'mail' // Assuming icon is a string identifier
  }
];

/**
 * Mobile Navigation
 */
export const mobileNavConfig: MobileNavConfig = {
  breakpoint: 768, 
  transitionDuration: 300, 
  menuOpenDefault: false, 
  expandedDefault: [], 
};

/**
 * Social Media Links
 */
export const socialLinks: SocialLink[] = [
  {
    id: 'twitter',
    label: 'Twitter',
    url: 'https://twitter.com/theseuslabs',
    icon: 'twitter'
  },
  // ... (rest of socialLinks array as in the .js file)
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://youtube.com/c/theseuslabs',
    icon: 'youtube'
  }
];

/**
 * Breadcrumb Configuration
 */
export const breadcrumbConfig: BreadcrumbConfig = {
  showHome: true,
  homeLabel: 'Home',
  separator: '/',
  maxItems: 4,
  truncationIndicator: '...'
};

// --- Utility Functions ---

/**
 * Create a breadcrumb trail based on the current path
 */
export const createBreadcrumbs = (
  currentPath: string | undefined | null, 
  routeLabels: Record<string, string> = {}
): BreadcrumbItem[] => {
  if (!currentPath) return [];
  
  const breadcrumbs: BreadcrumbItem[] = breadcrumbConfig.showHome 
    ? [{ label: breadcrumbConfig.homeLabel, path: '/' }]
    : [];
  
  if (currentPath === '/') return breadcrumbs;
  
  const segments = currentPath.split('/').filter(Boolean);
  let currentRoute = '';
  
  segments.forEach((segment) => {
    currentRoute += `/${segment}`;
    let label = routeLabels[currentRoute] || segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        
    breadcrumbs.push({ label, path: currentRoute });
  });

  // Truncate breadcrumbs if necessary
  if (breadcrumbConfig.maxItems > 0 && breadcrumbs.length > breadcrumbConfig.maxItems) {
    const truncated = [
        breadcrumbs[0], // Always keep the first item (usually Home)
        { label: breadcrumbConfig.truncationIndicator, path: '' }, // Add indicator
        ...breadcrumbs.slice(breadcrumbs.length - (breadcrumbConfig.maxItems - 2)) // Keep the last few items
    ];
    // Ensure the indicator isn't directly after the first item if maxItems <= 2
    if (breadcrumbConfig.maxItems <= 2 && truncated.length > 1) {
        return [breadcrumbs[0], breadcrumbs[breadcrumbs.length - 1]];
    }
    return truncated;
  }

  return breadcrumbs;
};

/**
 * Find the active navigation item based on the current path
 */
export const findActiveItem = (
  currentPath: string | undefined | null, 
  navigationItems: NavLink[]
): NavLink | null => {
  if (!currentPath || !navigationItems) return null;

  let activeItem: NavLink | null = null;

  const searchItems = (items: NavLink[]) => {
    for (const item of items) {
      // Check for exact match or if path starts with item path (for parent highlighting)
      if (item.path === currentPath || (item.exact !== true && currentPath.startsWith(item.path) && item.path !== '/')) {
        activeItem = item;
        // If it's a parent item, keep searching children for a more specific match
        if (item.children && item.children.length > 0) {
          searchItems(item.children);
        }
        // If it's an exact match or no children, stop searching this branch
        if (item.path === currentPath || !item.children) return; 
      }
      // If no match yet, search children recursively
      if (item.children && item.children.length > 0) {
        searchItems(item.children);
        // If found in children, stop searching this branch
        if (activeItem?.path === currentPath) return;
      }
    }
  };

  searchItems(navigationItems);
  return activeItem;
};

/**
 * Get direct child navigation items for a given parent path
 */
export const getChildNavItems = (
  parentPath: string | undefined | null, 
  navigationItems: NavLink[]
): NavLink[] => {
  if (!parentPath || !navigationItems) return [];

  const findParent = (items: NavLink[]): NavLink | null => {
    for (const item of items) {
      if (item.path === parentPath) {
        return item;
      }
      if (item.children) {
        const foundInChildren = findParent(item.children);
        if (foundInChildren) return foundInChildren;
      }
    }
    return null;
  };

  const parentItem = findParent(navigationItems);
  return parentItem?.children || [];
}; 