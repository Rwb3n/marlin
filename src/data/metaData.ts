/**
 * Site Metadata (TypeScript Version)
 * 
 * Provides global and page-specific metadata for SEO and site configuration.
 */

// --- Type Definitions ---

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrganizationInfo {
  name: string;
  foundingYear: number;
  logo: string; 
  address: Address;
  contactEmail: string;
  contactPhone: string;
}

interface SocialPlatform {
  handle?: string; 
  url: string;
}

interface SocialLinks {
  twitter: SocialPlatform;
  facebook: SocialPlatform;
  linkedin: SocialPlatform;
  instagram: SocialPlatform;
  youtube: SocialPlatform;
}

interface AlternateLocale {
    locale: string;
    hrefLang: string;
    href: string;
}

interface SeoDefaults {
  title: string;
  titleTemplate: string;
  defaultImage: string; 
  twitterCard: string; 
  language: string; 
  locale: string; 
  type: string; 
  themeColor?: string; 
  alternateLocales?: AlternateLocale[]; 
}

interface SiteMetadata {
  siteName: string;
  tagline: string;
  description: string;
  siteUrl: string;
  organization: OrganizationInfo;
  social: SocialLinks;
  seo: SeoDefaults;
}

interface PageMetadataOverrides {
  title?: string;
  description?: string;
  image?: string; 
  canonicalUrl?: string;
  robots?: string; 
}

// Redefine CombinedPageMetadata to avoid extension conflict and define final shape
export interface CombinedPageMetadata {
    // Properties from SeoDefaults
    title: string; // Make title required as it's always set in the function
    titleTemplate: string; 
    defaultImage: string; 
    twitterCard: string; 
    language: string; 
    locale: string; 
    type: string; 
    themeColor?: string; 
    alternateLocales?: AlternateLocale[]; 
    // Properties from PageMetadataOverrides (optional ones remain optional)
    description?: string;
    image?: string; 
    // Always present after processing
    canonicalUrl: string;
    robots?: string; 
}

// --- JSON-LD Types ---
interface JsonLdPostalAddress {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface JsonLdContactPoint {
  '@type': 'ContactPoint';
  telephone: string;
  email: string;
  contactType: string;
}

interface JsonLdOrganization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  foundingDate?: number;
  address: JsonLdPostalAddress;
  contactPoint: JsonLdContactPoint;
  sameAs: string[];
}

interface JsonLdImageObject {
    '@type': 'ImageObject';
    url: string;
}

interface JsonLdWebSite {
    '@type': 'WebSite';
    name: string;
    url: string;
}

interface JsonLdPublisher {
    '@type': 'Organization';
    name: string;
    logo: JsonLdImageObject;
}

interface JsonLdWebPage {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  url: string;
  name?: string; 
  description?: string; 
  inLanguage?: string; 
  isPartOf?: JsonLdWebSite; 
  publisher?: JsonLdPublisher; 
}

// --- Exported Data ---

export const siteMetadata: SiteMetadata = {
  siteName: 'Theseus Labs',
  tagline: 'Advancing Marine Exploration',
  description: 'Discover cutting-edge marine research and technology for the next generation of ocean exploration.',
  siteUrl: 'https://theseuslabs.com', // Ensure this is correct base URL
  
  organization: {
    name: 'Theseus Laboratories, Inc.',
    foundingYear: 2018,
    logo: '/images/theseus-logo.svg', // Ensure path is correct relative to siteUrl
    address: {
      street: '123 Ocean Avenue',
      city: 'Monterey',
      state: 'CA',
      zipCode: '93940',
      country: 'USA'
    },
    contactEmail: 'info@theseuslabs.com',
    contactPhone: '+1 (555) 123-4567'
  },
  
  social: {
    twitter: { handle: '@theseuslabs', url: 'https://twitter.com/theseuslabs' },
    facebook: { url: 'https://facebook.com/theseuslabs' },
    linkedin: { url: 'https://linkedin.com/company/theseuslabs' },
    instagram: { url: 'https://instagram.com/theseuslabs' },
    youtube: { url: 'https://youtube.com/c/theseuslabs' }
  },
  
  seo: {
    title: 'Theseus Labs | Advancing Marine Exploration',
    titleTemplate: '%s | Theseus Labs',
    defaultImage: '/images/og-default.jpg', // Ensure path is correct relative to siteUrl
    twitterCard: 'summary_large_image',
    language: 'en-US',
    locale: 'en_US',
    type: 'website',
    themeColor: '#0B5E8A',
    alternateLocales: [
      { locale: 'en_US', hrefLang: 'en-US', href: 'https://theseuslabs.com' }
    ]
  }
};

// Use Record for flexibility or define specific keys if fixed
export const pageMetadata: Record<string, PageMetadataOverrides> = {
  '/': {
    title: 'Theseus Labs | Advancing Marine Exploration',
    description: 'Discover cutting-edge marine research and technology for the next generation of ocean exploration.',
    image: '/images/home-og.jpg',
    canonicalUrl: 'https://theseuslabs.com',
    robots: 'index, follow'
  },
  // ... (rest of pageMetadata definitions as in .js file)
  '/404': {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    canonicalUrl: 'https://theseuslabs.com/404',
    robots: 'noindex, follow'
  }
};

// --- Utility Functions ---

export const getPageMetadata = (path: string): CombinedPageMetadata => {
  const pageMeta: PageMetadataOverrides = pageMetadata[path] || {};
  const defaults = siteMetadata.seo;
  
  // Combine defaults and page-specific data
  const combined: Partial<CombinedPageMetadata> = { 
      ...defaults,
      ...pageMeta 
  };

  // Ensure required fields like canonicalUrl are set
  if (!combined.canonicalUrl) {
    combined.canonicalUrl = `${siteMetadata.siteUrl}${path === '/' ? '' : path}`;
  }
  // Ensure title uses template if not overridden explicitly
  if (pageMeta.title && defaults.titleTemplate) {
    combined.title = defaults.titleTemplate.replace('%s', pageMeta.title);
  } else {
      combined.title = pageMeta.title || defaults.title; // Use page title or default site title
  }

  // Add default robots if not specified
  if (!combined.robots) {
      combined.robots = 'index, follow';
  }
  
  // Type assertion: Assert that the combined object matches CombinedPageMetadata
  // This assumes the logic above correctly populates all required fields.
  return combined as CombinedPageMetadata; 
};

export const getOrganizationSchema = (): JsonLdOrganization => {
  const org = siteMetadata.organization;
  const social = siteMetadata.social;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}${org.logo.startsWith('/') ? org.logo : '/' + org.logo}`,
    foundingDate: org.foundingYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: org.address.street,
      addressLocality: org.address.city,
      addressRegion: org.address.state,
      postalCode: org.address.zipCode,
      addressCountry: org.address.country
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: org.contactPhone,
      email: org.contactEmail,
      contactType: 'customer service' // Or appropriate type
    },
    sameAs: [
      social.twitter.url,
      social.facebook.url,
      social.linkedin.url,
      social.instagram.url,
      social.youtube.url
    ].filter((url): url is string => !!url) // Filter out undefined if any social URL is optional
  };
};

export const getWebpageSchema = (path: string): JsonLdWebPage => {
  const meta = getPageMetadata(path);
  const org = siteMetadata.organization;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: meta.canonicalUrl,
    name: meta.title, 
    description: meta.description,
    inLanguage: siteMetadata.seo.language,
    isPartOf: {
      '@type': 'WebSite',
      name: siteMetadata.siteName,
      url: siteMetadata.siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: org.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${org.logo.startsWith('/') ? org.logo : '/' + org.logo}`
      }
    }
  };
};

// Optional: Export all individually or keep default
export default {
  siteMetadata,
  pageMetadata,
  getPageMetadata,
  getOrganizationSchema,
  getWebpageSchema
}; 