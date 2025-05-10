import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async'; // Removed

// Data Imports
// import homeData from '../../data/homeData'; // REMOVED
// import { getAllProjects } from '../../data/projectsData'; // REMOVED
// import { getAllJournalEntries } from '../../data/journalData'; // REMOVED
// import { ProjectStatus } from '../../data/projectsData'; // REMOVED
import { getPageMetadata, CombinedPageMetadata } from '../../data/metaData'; // Import type

// Service Imports
import { fetchProjects, fetchJournalEntries } from '../../services/contentful'; // Added fetchJournalEntries
// Assuming ProjectEntry and JournalEntry are types exported from contentful.ts
// For now, let's assume Project and JournalEntry are the correct types or local definitions are needed.
// import { Project as ContentfulProject, JournalEntry as ContentfulJournalEntry } from '../../services/contentful'; // Example

// Interface for props expected by ProjectsSection cards
interface ProjectCardProps {
  id: string;
  title: string;
  slug: string;
  category?: string;
  heroImage: { url: string; alt: string };
  excerpt?: string;
  status?: string;
  url: string;
}

// Interface for props expected by JournalSection cards
interface JournalCardProps {
  id: string;
  title: string;
  slug: string;
  date: string; // Contentful date will be mapped to a string for display
  excerpt: string; // Made non-optional, will default to empty string in mapping if not present
  url: string;
}

// Section Imports
import HeroSection from '../sections/HeroSection'; // Assuming default export based on previous attempts, adjust if named
import ProjectsSection from '../sections/ProjectsSection'; // Assuming default export
import JournalSection from '../sections/JournalSection'; // Assuming default export
import ContactSection from '../sections/ContactSection'; // Default import
import Layout from '../layout/Layout'; // Assuming named export

/**
 * @function HomePage
 * @description The main landing page for the BLUE MARLIN OS website.
 * It orchestrates the assembly of various sections like Hero, Projects, Journal, and Contact.
 * Maintains the visual appearance and behavior of the legacy home page.
 * @returns {JSX.Element} The rendered home page component.
 */
const HomePage: React.FC = () => {
  const [featuredProjectsContentful, setFeaturedProjectsContentful] = useState<any[]>([]); // Using any[] as placeholder
  const [recentJournalEntriesContentful, setRecentJournalEntriesContentful] = useState<any[]>([]); // Added for journal entries

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [projects, journalEntries] = await Promise.all([
          fetchProjects({ 'fields.isFeatured': true, limit: 3 }),
          fetchJournalEntries({ order: '-fields.date', limit: 3 })
        ]);
        setFeaturedProjectsContentful(projects || []);
        setRecentJournalEntriesContentful(journalEntries || []);
      } catch (error) {
        console.error("Error fetching initial homepage data:", error);
        setFeaturedProjectsContentful([]);
        setRecentJournalEntriesContentful([]);
      }
    };

    loadInitialData();
  }, []);

  // Remove old static data fetching for projects
  // const projectsFromHome = homeData.projectsData;
  // const featuredJournalEntries = homeData.recentJournalEntries; // This will be removed now

  // Map Contentful projects to the structure expected by ProjectsSection
  const mappedFeaturedProjects: ProjectCardProps[] = featuredProjectsContentful.map((item: any) => {
    const heroImageFile = item.fields.heroImage?.fields?.file;
    const heroImageAlt = item.fields.heroImage?.fields?.description || item.fields.heroImage?.fields?.title || 'Project image';
    return {
      id: item.sys.id,
      title: item.fields.title || 'Untitled Project',
      slug: item.fields.slug || item.sys.id, // Fallback slug to id if not present
      category: item.fields.category || undefined,
      heroImage: {
        url: heroImageFile?.url ? `https:${heroImageFile.url}` : '/placeholder-image.jpg', // Add https: and a placeholder
        alt: heroImageAlt,
      },
      excerpt: item.fields.excerpt || undefined,
      status: item.fields.status || undefined,
      url: `/projects/${item.fields.slug || item.sys.id}`,
    };
  });

  // Map Contentful journal entries to the structure expected by JournalSection
  const mappedRecentJournalEntries: JournalCardProps[] = recentJournalEntriesContentful.map((item: any) => {
    // Basic date formatting, can be improved with a library like date-fns if needed
    const formattedDate = item.fields.date ? new Date(item.fields.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) : 'Date unavailable';

    return {
      id: item.sys.id,
      title: item.fields.title || 'Untitled Entry',
      slug: item.fields.slug || item.sys.id, // Fallback slug to id
      date: formattedDate,
      excerpt: typeof item.fields.excerpt === 'string' ? item.fields.excerpt : '', // Ensure excerpt is always a string
      url: `/journal/${item.fields.slug || item.sys.id}`,
    };
  });

  const metadata: CombinedPageMetadata = getPageMetadata('home');

  // Define Hero section data locally or adjust structure
  const heroData = {
      title: "BLUE MARLIN OS", // Example
      subtitle: "Deep Dive into Design & Development", // Example
      // ctaText and ctaLink if needed by HeroSection
      // socialLinks if needed
      // profileImage if needed
  };

  return (
    <Layout>
      {/* Metadata tags rendered directly */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {/* Add other standard meta tags if needed */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      {/* Add og:image, og:url etc. */}
      {/* End of metadata tags */}

      {/* Hero Section - Adjust props based on HeroSection definition */}
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        // Pass other required props from heroData or defaults
      />

      {/* Projects Section - Adjust props based on ProjectsSection definition */}
      <ProjectsSection
        title="Featured Projects" // Provide title directly
        // subtitle="Recent work and case studies" // Optional subtitle
        projects={mappedFeaturedProjects} // Pass mapped Contentful projects
        // viewAllLink="/projects" // Provide link directly if needed
        cardDisplayMode='homepage'
        forceSingleColumn={true}
      />

      {/* Journal Section - Adjust props based on JournalSection definition */}
      <JournalSection
        title={{ text: "Recent Journal Entries" }} // Wrap title in object
        // subtitle="Updates, thoughts, and findings" // Optional subtitle
        entries={mappedRecentJournalEntries} // Pass mapped Contentful journal entries
        // viewAllLink="/journal" // Provide link directly if needed
      />

      {/* Contact Section - Adjust props based on ContactSection definition */}
      <ContactSection
        title="Get In Touch" // Provide title directly
        // subtitle="Contact information and social links" // Optional subtitle
        // email="contact@example.com" // Provide email directly if needed
        // socialLinks={...} // Provide social links if needed
      />
    </Layout>
  );
};

export default HomePage; // Use default export if that's the standard 