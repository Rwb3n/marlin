import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Container from '../layout/Container';
import Grid from '../layout/Grid';
import Heading from '../ui/Heading';
import ProjectCard from '../cards/ProjectCard'; // Assuming ProjectCard is already .tsx
import Text from '../ui/Text'; // Assuming Text is already .tsx
import { getAllProjects } from '../../data/projectsData'; // Removed ProjectSummary type import
import { getPageMetadata, CombinedPageMetadata } from '../../data/metaData'; // Import type

// Define ProjectSummary locally based on usage
interface ProjectSummary {
  id: string;
  title: string;
  image?: { // Make image optional or provide a default
    src: string;
    alt: string;
  };
  intro: string; 
  // Add other fields if needed by ProjectCard
}

// Define PageMetadata locally if needed, or rely on inferred type
// interface PageMetadata { ... }

/**
 * ProjectCollectionPage Component
 * 
 * Displays a grid listing all available projects.
 */
const ProjectCollectionPage: React.FC = () => {
  // Type inference for projects
  const [projects, setProjects] = useState(getAllProjects()); 
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading to false if data is fetched synchronously
  const [error, setError] = useState<string | null>(null);

  // Fetch projects data on component mount - Adjusted for synchronous fetch
  useEffect(() => {
    // If getAllProjects is potentially async in the future, add loading/error handling back
    try {
      const allProjects = getAllProjects(); // Fetch data synchronously
      setProjects(allProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err instanceof Error ? err.message : 'Error loading projects');
    }
  }, []); // Empty dependency array means this runs once on mount

  // Get metadata for the page
  const pageMeta = getPageMetadata('projects');
  
  // Spread first, then set defaults using nullish coalescing
  const metadata: CombinedPageMetadata = {
    ...pageMeta, // Spread fetched metadata first
    title: pageMeta?.title ?? 'Projects | BLUE MARLIN OS', // Use fetched title or default
    description: pageMeta?.description ?? 'Browse through various engineering and research projects.', // Use fetched description or default
  };

  return (
    <Layout pageTitle={metadata.title} description={metadata.description}>
      {/* Metadata tags rendered directly */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {/* Standard Open Graph meta tags */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" /> 
      {/* Consider adding og:image and og:url */}
      {/* End of metadata tags */}

      {/* Main content container */}
      <Container className="py-12 md:py-16 lg:py-20">
        {/* Page Title */}
        <Heading level={1} className="text-center mb-10 md:mb-12 lg:mb-16">
          Projects
        </Heading>

        {/* Loading state indicator */}
        {loading && (
          <div className="text-center">
            <Text>Loading projects...</Text>
            {/* Consider adding a spinner component here */}
          </div>
        )}

        {/* Error state message */}
        {error && (
          <div className="text-center text-danger-fg dark:text-danger-dark-fg">
            <Text weight="semibold">Error:</Text> {error}
          </div>
        )}

        {/* No projects found message */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center">
            <Text>No projects found.</Text>
          </div>
        )}

        {/* Projects grid */}
        {!loading && !error && projects.length > 0 && (
          <Grid 
            columns={{ sm: 1, md: 2, lg: 3 }} // Corrected responsive columns (adjust as needed)
            gap="large" // Simplified gap or use responsive object if Grid supports it
            // Example responsive gap if supported: gap={{ base: 'medium', md: 'large' }}
          >
            {/* Map through projects and render ProjectCard for each */}
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                id={project.id} 
                title={project.title}
                image={project.heroImage} // Use heroImage instead of image
                description={project.intro} // Use the intro as the description
                // Pass other necessary props if ProjectCard requires them
              />
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default ProjectCollectionPage; 