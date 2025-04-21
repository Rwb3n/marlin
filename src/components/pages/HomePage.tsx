import React from 'react';
// import { Helmet } from 'react-helmet-async'; // Removed

// Data Imports
import homeData from '../../data/homeData'; // Default import
import { getAllProjects } from '../../data/projectsData'; // Use getAllProjects
import { getAllJournalEntries } from '../../data/journalData'; // Use getAllJournalEntries
import { ProjectStatus } from '../../data/projectsData'; // Import ProjectStatus
import { getPageMetadata, CombinedPageMetadata } from '../../data/metaData'; // Import type

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
  // Fetch projects and journal entries directly from homeData or use slicing
  const projectsFromHome = homeData.projectsData; 
  const featuredJournalEntries = homeData.recentJournalEntries;

  // Map projects from homeData to match the structure expected by ProjectsSection (Project[])
  const featuredProjects = projectsFromHome.map(proj => {
    // Map ProjectStatus enum to the string literal type expected by ProjectSection
    let mappedStatus: 'active' | 'maintenance' | 'development' | undefined;
    switch (proj.status) {
      case ProjectStatus.ACTIVE:
      case ProjectStatus.DEPLOYED:
      case ProjectStatus.FIELD_TESTING:
      case ProjectStatus.OPERATIONAL_PILOT:
        mappedStatus = 'active'; // Or map more granularly if needed
        break;
      case ProjectStatus.DEVELOPMENT:
        mappedStatus = 'development';
        break;
      // Add cases for 'maintenance' if applicable in ProjectStatus enum
      default:
        mappedStatus = undefined;
    }

    return {
      ...proj, // Spread existing properties from ProjectData
      category: proj.category || 'Unknown Category', // Provide default if category is missing
      intro: proj.description, // Map description to intro
      heroImage: proj.image, // Map image to heroImage
      year: '', // Add missing required properties with defaults if necessary
      specs: [],
      overview: proj.description, // Use description as overview if needed
      technical: { content: '', list: [] },
      interface: { content: '', list: [] },
      results: '',
      relatedProjects: [],
      url: `/projects/${proj.id}`, // Add the required url property
      status: mappedStatus, // Use the mapped status
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
        projects={featuredProjects} // Pass fetched projects
        // viewAllLink="/projects" // Provide link directly if needed
      />

      {/* Journal Section - Adjust props based on JournalSection definition */}
      <JournalSection
        title={{ text: "Recent Journal Entries" }} // Wrap title in object
        // subtitle="Updates, thoughts, and findings" // Optional subtitle
        entries={featuredJournalEntries} // Pass fetched entries
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