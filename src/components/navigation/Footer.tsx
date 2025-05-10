import React from 'react';
import Link from '../ui/Link';
import Container from '../layout/Container';
import { socialLinks as importedSocialLinks } from '../../data/navigationData'; // Import actual social links
// Import the new icon components
import { TwitterIcon, FacebookIcon, LinkedInIcon, InstagramIcon, YouTubeIcon } from '../icons/SocialIcons';
import clsx from 'clsx';

// Map icon names from data to imported components
const iconMap: { [key: string]: React.FC<any> } = {
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
};

/**
 * Footer Component
 * 
 * The main site footer containing copyright information, links, and social media.
 * Features:
 * - Responsive grid layout for varied content
 * - Multiple variant options (default/minimal)
 * - Social media integration
 * - Copyright section with current year
 * - Theme integration (apex/origin variants)
 * 
 * @example
 * <Footer 
 *   showSocialLinks={true}
 *   showCopyright={true}
 *   variant="default"
 * />
 */
interface FooterProps {
  /** Additional classes to apply to the footer */
  className?: string;
  /** Footer display style */
  variant?: 'default' | 'minimal';
  /** Whether to display social media links */
  showSocialLinks?: boolean;
  /** Whether to display copyright information */
  showCopyright?: boolean;
}

export default function Footer({
  className = '',
  variant = 'default',
  showSocialLinks = true,
  showCopyright = true,
}: FooterProps) {
  const currentYear = React.useMemo(() => new Date().getFullYear(), []);
  
  // Use imported social media links
  const socialLinks = importedSocialLinks;

  // If minimal variant, render simple footer
  if (variant === 'minimal') {
    return (
      <footer className={clsx(
        'w-full z-10 py-4',
        'relative min-h-[56px]',
        'text-foreground',
        className
      )}>
        <Container>
          <div className="flex justify-center items-center opacity-95 text-sm">
            {showCopyright && (
              <p>&copy; {String(currentYear)} BLUE MARLIN OS &mdash; All rights reserved.</p>
            )}
          </div>
        </Container>
      </footer>
    );
  }

  // Default variant with full content
  return (
    <footer className={clsx(
      'w-full z-10 py-8',
      'relative md:pb-4 pb-16',
      'text-foreground',
      className
    )}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              <span className="text-accent">
                BLUE MARLIN
              </span> OS
            </h3>
            <p className="mb-4 text-sm">
              Our team is based at the Pacific Deep Sea Research Institute. 
              We collaborate with research teams worldwide on advancing 
              deep-sea technologies.
            </p>
            <p className="text-sm">
              For urgent inquiries related to active deployments, 
              please contact our operations team directly at{' '}
              <Link 
                href="mailto:ops@bluemarlinos.com"
                variant="default"
              >
                ops@bluemarlinos.com
              </Link>
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/projects"
                  variant="subtle"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/journal"
                  variant="subtle"
                >
                  Journal
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  variant="subtle"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          {showSocialLinks && socialLinks && socialLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon || 'default'];
                  return (
                    <Link 
                      key={social.id} 
                      href={social.url || '#'} 
                      className={clsx(
                        'p-2 rounded-full',
                        'hover:bg-muted/50 dark:hover:bg-muted/50',
                        'transition-colors duration-200'
                      )}
                      aria-label={social.label} 
                      showExternalIcon={false}
                    >
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6" /> 
                      ) : (
                        <span className="w-6 h-6 flex items-center justify-center">?</span> 
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Divider */}
        <div className={clsx(
          'my-6 h-px',
          'bg-border'
        )} />
        
        {/* Copyright */}
        {showCopyright && (
          <div className="text-center opacity-95 text-sm">
            <p>&copy; {String(currentYear)} BLUE MARLIN OS &mdash; All rights reserved.</p>
          </div>
        )}
      </Container>
    </footer>
  );
} 