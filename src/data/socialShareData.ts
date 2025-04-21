/**
 * Social Sharing Configuration and Utilities (TypeScript Version)
 */

// --- Type Definitions ---

// Use const assertion for PLATFORMS to get literal types
export const PLATFORMS = {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin',
  REDDIT: 'reddit',
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  COPY: 'copy'
} as const; // Const assertion

// Type for platform identifiers derived from PLATFORMS keys
type PlatformID = typeof PLATFORMS[keyof typeof PLATFORMS];

// Interface for platform configuration
interface PlatformConfigItem {
  name: string;
  icon: string; // Assuming string identifier for icons
  shareUrl: string; // URL template
  color?: string; // Optional theme color
}

// Type for the platform configuration object
// Ensures all PLATFORMS values are keys
type PlatformConfig = Record<PlatformID, PlatformConfigItem>;

// Interface for sharing metadata (used internally and as return type)
interface ShareMetadata {
  title: string; // Make required after defaulting
  description: string; // Make required after defaulting
  url: string; // Make required after defaulting
  image?: string; // Keep optional
  twitterHandle?: string; // Keep optional
}

// Interface for content-specific metadata input (flexible input)
interface ContentMetadataInput {
  title?: string;
  description?: string;
  url?: string; // Can be relative or absolute
  image?: string; // Can be relative or absolute
  twitterHandle?: string;
}

// Interface for the platform object returned by getSharePlatforms
interface SharePlatform extends PlatformConfigItem {
    id: PlatformID;
}

// --- Exported Data & Config ---

/**
 * Configuration for each supported sharing platform
 */
export const platformConfig: PlatformConfig = {
  [PLATFORMS.TWITTER]: {
    name: 'Twitter',
    icon: 'twitter',
    shareUrl: 'https://twitter.com/intent/tweet?text={title}&url={url}&via={twitterHandle}',
    color: '#1DA1F2'
  },
  [PLATFORMS.FACEBOOK]: {
    name: 'Facebook',
    icon: 'facebook',
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    color: '#1877F2'
  },
  [PLATFORMS.LINKEDIN]: {
    name: 'LinkedIn',
    icon: 'linkedin',
    shareUrl: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
    color: '#0A66C2'
  },
  [PLATFORMS.REDDIT]: {
    name: 'Reddit',
    icon: 'reddit',
    shareUrl: 'https://www.reddit.com/submit?url={url}&title={title}',
    color: '#FF4500'
  },
  [PLATFORMS.EMAIL]: {
    name: 'Email',
    icon: 'email',
    shareUrl: 'mailto:?subject={title}&body={description}%0A%0A{url}',
    color: '#757575'
  },
  [PLATFORMS.WHATSAPP]: {
    name: 'WhatsApp',
    icon: 'whatsapp',
    shareUrl: 'https://api.whatsapp.com/send?text={title}%20{url}',
    color: '#25D366'
  },
  [PLATFORMS.TELEGRAM]: {
    name: 'Telegram',
    icon: 'telegram',
    shareUrl: 'https://t.me/share/url?url={url}&text={title}',
    color: '#0088CC'
  },
  [PLATFORMS.COPY]: {
    name: 'Copy Link',
    icon: 'copy',
    shareUrl: '{url}',
    color: '#333333'
  }
};

/**
 * Default platforms to show in sharing interface
 */
export const defaultPlatforms: PlatformID[] = [
  PLATFORMS.TWITTER,
  PLATFORMS.FACEBOOK,
  PLATFORMS.LINKEDIN,
  PLATFORMS.EMAIL,
  PLATFORMS.COPY
];

/**
 * Default metadata for sharing when specific data is not provided
 */
export const defaultMetadata: Required<ShareMetadata> = {
  title: 'Theseus Labs | Advancing Marine Exploration',
  description: 'Discover cutting-edge marine research and technology for the next generation of ocean exploration.',
  url: 'https://theseuslabs.com', // Ensure this is the correct base URL
  image: 'https://theseuslabs.com/images/og-default.jpg', // Ensure this exists
  twitterHandle: 'theseuslabs' // Ensure this is correct
};

// --- Utility Functions ---

/**
 * Generate a share URL for a given platform
 */
export const getShareUrl = (platform: PlatformID, metadata: ShareMetadata): string => {
  if (!platformConfig[platform]) {
    console.error(`Unknown platform: ${platform}`);
    return '';
  }

  let shareUrl = platformConfig[platform].shareUrl;

  // Use type-safe access to metadata properties
  shareUrl = shareUrl.replace(/{title}/g, encodeURIComponent(metadata.title));
  shareUrl = shareUrl.replace(/{description}/g, encodeURIComponent(metadata.description));
  shareUrl = shareUrl.replace(/{url}/g, encodeURIComponent(metadata.url));
  
  if (metadata.twitterHandle) {
    const handle = metadata.twitterHandle.replace(/^@/, '');
    shareUrl = shareUrl.replace(/{twitterHandle}/g, encodeURIComponent(handle));
  }
  
  // Handle case where twitterHandle placeholder exists but no handle provided
  shareUrl = shareUrl.replace(/&via={twitterHandle}/g, '');
  shareUrl = shareUrl.replace(/\?via={twitterHandle}/g, '');

  return shareUrl;
};

/**
 * Get platforms to display for sharing
 */
export const getSharePlatforms = (customPlatforms?: PlatformID[]): SharePlatform[] => {
  const platformsToShow = customPlatforms || defaultPlatforms;
  
  return platformsToShow.map((platformId): SharePlatform | null => {
    if (!platformConfig[platformId]) {
      console.error(`Unknown platform: ${platformId}`);
      return null;
    }
    return {
      id: platformId,
      ...platformConfig[platformId]
    };
  }).filter((p): p is SharePlatform => p !== null); // Type guard to filter out nulls
};

/**
 * Prepare complete sharing metadata for a content item
 */
export const prepareSharingData = (contentMetadata: ContentMetadataInput = {}): ShareMetadata => {
  // Start with default values
  const metadata: ShareMetadata = { ...defaultMetadata }; 

  // Override with content-specific data
  if (contentMetadata.title) metadata.title = contentMetadata.title;
  if (contentMetadata.description) metadata.description = contentMetadata.description;
  if (contentMetadata.twitterHandle) metadata.twitterHandle = contentMetadata.twitterHandle;

  // Construct absolute URLs if relative paths are given
  const baseSiteUrl = defaultMetadata.url.replace(/\/$/, '');

  if (contentMetadata.url) {
    metadata.url = contentMetadata.url.startsWith('http')
      ? contentMetadata.url
      : `${baseSiteUrl}/${contentMetadata.url.replace(/^\//, '')}`;
  }

  if (contentMetadata.image) {
    metadata.image = contentMetadata.image.startsWith('http')
      ? contentMetadata.image
      : `${baseSiteUrl}/${contentMetadata.image.replace(/^\//, '')}`;
  }
  
  return metadata;
};

// Optional: Export all functions and data individually or keep default export
export default {
  PLATFORMS,
  platformConfig,
  defaultPlatforms,
  defaultMetadata,
  getShareUrl,
  getSharePlatforms,
  prepareSharingData
}; 