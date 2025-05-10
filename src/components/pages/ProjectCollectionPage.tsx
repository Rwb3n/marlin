import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Container from '../layout/Container';
import Grid from '../layout/Grid';
import Heading from '../ui/Heading';
import ProjectCard from '../cards/ProjectCard';
import Text from '../ui/Text';
import { fetchProjects, ProjectSkeleton } from '../../services/contentful'; // Use ProjectSkeleton
import { getPageMetadata, CombinedPageMetadata } from '../../data/metaData';
import type { Entry } from 'contentful'; // Import Entry type

// Removed local ProjectSummary interface, will use ContentfulProject

// Type guard for ProjectSkeleton fields
function isProjectFields(fields: any): fields is ProjectSkeleton['fields'] {
  return (
    fields &&
    typeof fields.title === 'string' &&
    typeof fields.slug === 'string'
    // We can add more checks for other non-optional fields if necessary
  );
}

/**
 * ProjectCollectionPage Component
 * 
 * Displays a grid listing all available projects.
 */
const ProjectCollectionPage: React.FC = () => {
  const [projects, setProjects] = useState<Entry<ProjectSkeleton>[]>([]); // Updated type to Entry<ProjectSkeleton>[]
  const [loading, setLoading] = useState<boolean>(true); // Initialize loading to true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects from Contentful:", err);
        setError(err instanceof Error ? err.message : 'Error loading projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

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
            {projects.map(project => {
              if (!isProjectFields(project.fields)) {
                console.warn('Project with unexpected field structure encountered:', project.sys.id);
                return null; 
              }
              const fields = project.fields as ProjectSkeleton['fields'];

              let imageUrl: string | undefined = undefined;
              let imageAltText: string | undefined = undefined;

              // @ts-ignore
              const imageFile = fields.heroImage?.fields?.file;
              if (imageFile && typeof imageFile.url === 'string') {
                const urlString: string = imageFile.url;
                if (urlString.startsWith('//')) {
                  imageUrl = `https:${urlString}`;
                } else {
                  imageUrl = urlString;
                }

                // @ts-ignore
                const heroImageFields = fields.heroImage?.fields;
                if (typeof heroImageFields?.description === 'string' && heroImageFields.description.trim() !== '') {
                  imageAltText = heroImageFields.description;
                } else if (typeof heroImageFields?.title === 'string' && heroImageFields.title.trim() !== '') {
                  imageAltText = heroImageFields.title;
                } else {
                  // @ts-ignore
                  imageAltText = fields.title || 'Project image'; 
                }
              }
              
              // @ts-ignore
              const projectDescription = fields.overview || '';
              const truncatedDescription = projectDescription.length > 100 ? projectDescription.substring(0, 100) + '...' : projectDescription;

              return (
                <ProjectCard
                  key={project.sys.id}
                  id={project.sys.id} 
                  // @ts-ignore
                  title={fields.title || 'Untitled Project'} 
                  image={imageUrl}
                  imageAlt={imageAltText}
                  description={truncatedDescription}
                  // @ts-ignore
                  href={fields.slug ? `/projects/${fields.slug}` : '#'} 
                  // @ts-ignore
                  status={fields.status}
                  // @ts-ignore
                  category={fields.category} 
                  // @ts-ignore
                  year={fields.year}
                  displayMode="default" 
                />
              );
            })}
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default ProjectCollectionPage; 