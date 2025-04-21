import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout'; // Assuming .tsx
import Container from '../layout/Container'; // Assuming .tsx
import Section from '../layout/Section'; // Assuming .tsx
import Grid from '../layout/Grid'; // Assuming .tsx
import Heading from '../ui/Heading'; // Assuming .tsx
import Paragraph from '../ui/Paragraph'; // Assuming .tsx
import Text from '../ui/Text'; // Assuming .tsx
import Link from '../ui/Link'; // Assuming .tsx
import SectionHeader from '../ui/SectionHeader'; // Assuming .tsx
import ProjectCard from '../cards/ProjectCard'; // Assuming .tsx
import NotFoundComponent from '../ui/NotFoundComponent'; // Import for error state
import AdjacentNavigation from '../ui/AdjacentNavigation'; // Import the new component
import { 
  getProjectById, 
  getRelatedProjects, 
  getAdjacentProjects, // Import the new function
  Project as ProjectType, // Full Project type
  RelatedProjectSummary // Type for related projects
} from '../../data/projectsData';
import { 
  getPageMetadata, 
  CombinedPageMetadata // Type for combined metadata
} from '../../data/metaData';
import { useTheme } from '../../context/ThemeContext'; // Keep named import for hook
// Removed type-only import as useTheme provides the type implicitly

// --- Type Definitions ---

// Type for the params from react-router-dom
interface ProjectParams extends Record<string, string | undefined> {
  projectId: string;
}

/**
 * ProjectDetail Component (TypeScript Version)
 * 
 * Displays detailed information about a specific project.
 */
const ProjectDetail: React.FC = () => {
  // --- State and Context Hooks ---
  const { projectId } = useParams<ProjectParams>();
  const [project, setProject] = useState<ProjectType | null>(null);
  // Initialize relatedProjects in state, fetched in useEffect
  const [relatedProjects, setRelatedProjects] = useState<RelatedProjectSummary[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme(); // Get theme

  // Calculate adjacent projects using useMemo
  const adjacentProjects = useMemo(() => {
    if (!projectId) return { prev: null, next: null };
    return getAdjacentProjects(projectId);
  }, [projectId]);

  // --- Data Fetching Effect ---
  useEffect(() => {
    // Reset state on ID change
    setLoading(true);
    setError(null);
    setProject(null);
    setRelatedProjects([]); // Reset related projects state

    if (!projectId) {
        setError('No project ID provided.');
        setLoading(false);
        return;
    }

    try {
      const projectData = getProjectById(projectId);
      
      if (!projectData) {
        setError('Project not found');
      } else {
        setProject(projectData);
        // Fetch and set related projects in state
        setRelatedProjects(getRelatedProjects(projectId)); 
      }
    } catch (err) {
      console.error("Error fetching project data:", err);
      setError(err instanceof Error ? err.message : 'Error loading project data');
    } finally {
        setLoading(false);
    }
  }, [projectId]); 

  // --- Theme-Specific Variables (Derived from theme state) ---
  const themeAccentColor = theme === 'light' ? 'text-light-accent' : 'text-dark-accent';
  const themeBorderColor = theme === 'light' ? 'border-light-border' : 'border-dark-border';
  const themeBgColor = theme === 'light' ? 'bg-light-background' : 'bg-dark-background';

  // --- Helper Functions ---
  const absoluteImageUrl = (url: string | undefined): string | undefined => {
      if (!url) return undefined;
      // Simple check if it starts with http or /
      return url.startsWith('http') || url.startsWith('/') ? url : `/${url}`;
  }
  
  // --- Loading State Rendering ---
  if (loading) {
    return (
      <Layout pageTitle="Loading Project...">
        <Container className="py-16 text-center">
          <Text>Loading project details...</Text>
          {/* Consider adding a Spinner component */}
        </Container>
      </Layout>
    );
  }

  // --- Error State Rendering ---
  if (error || !project) {
    const specificErrorMessage = (error && error !== 'Project not found') ? error : undefined;
    return (
        <NotFoundComponent 
            title={error === 'Project not found' ? "Project Not Found" : "Error Loading Project"}
            message={specificErrorMessage}
            linkHref="/projects" // Link to projects collection
            linkText="View All Projects"
            suggestionType="project" 
        />
    );
  }

  // --- Metadata Generation (React 19 native) ---
  // Metadata object prepared for rendering
  const metadata: CombinedPageMetadata = getPageMetadata(`/projects/${project.id}`) || {
    title: project.title, 
    description: project.intro, // Use intro for description
    titleTemplate: '%s | Project', 
    defaultImage: '/images/og-default.jpg', 
    twitterCard: 'summary_large_image', 
    language: 'en-US', 
    locale: 'en_US', 
    type: 'article', // Treat project page as an article type
    canonicalUrl: `/projects/${project.id}`,
    image: project.heroImage // Use heroImage for fallback OG image
  };

  // --- Main Component Rendering ---
  return (
    <Layout>
      {/* Render Metadata Tags Directly */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={metadata.type || 'article'} />
      <meta property="og:url" content={metadata.canonicalUrl} />
      {metadata.image && <meta property="og:image" content={absoluteImageUrl(metadata.image)} />}
      
      {/* Project Hero Section */}
      <Section className={`pt-16 pb-8 md:pt-24 md:pb-12 ${themeBgColor}`} withContainer={false}>
        <Container>
          <Grid 
            columns={{ md: 2 }}
            gap="large"
            className="items-center"
          >
            {/* Image Column */}
            <div className="order-1 md:order-2">
              {project.heroImage ? (
                <img 
                  src={absoluteImageUrl(project.heroImage)} 
                  alt={project.title} 
                  className="w-full h-auto rounded-lg shadow-lg object-cover aspect-video"
                />
              ) : (
                <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Text className="text-muted-foreground">No image available</Text>
                </div>
              )}
            </div>

            {/* Text Content Column */}
            <div className="order-2 md:order-1">
              <div className="mb-4 flex items-center space-x-4 text-sm font-medium font-mono uppercase tracking-wider">
                {project.category && (
                  <Text 
                    as="span" 
                    className={`${themeAccentColor} border-r pr-4 ${themeBorderColor}`} // Apply theme accent & border
                  >
                    {project.category}
                  </Text>
                )}
                {project.year && (
                  <Text as="span" className="text-muted-foreground">{project.year}</Text>
                )}
              </div>
              <Heading level={1} className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                {project.title}
              </Heading>
              <Paragraph className="mb-6 text-lg text-foreground/80">
                {project.intro}
              </Paragraph>
              
              {/* Specifications */}
              {project.specs && project.specs.length > 0 && (
                <div className={`flex flex-wrap gap-x-6 gap-y-3 border-t pt-4 ${themeBorderColor}`}> {/* Apply theme border */}
                  {project.specs.map((spec, index) => (
                    <div key={index}>
                      <Text as="div" size="sm" className="font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                        {spec.label}
                      </Text>
                      <Text as="div" size="lg" className="font-medium">
                        {/* Render spec.value directly (enum members are strings at runtime) */}
                        {spec.value}
                      </Text>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Grid>
        </Container>
      </Section>
      
      {/* Main Content Sections Container */}
      <Container width="default" padding="default" className="py-12 md:py-16 lg:py-20 space-y-12 md:space-y-16">
        
        {/* Overview Section */}
        {project.overview && (
          <Section aria-labelledby="overview-heading">
            <SectionHeader title="Overview" centered={false} className="mb-4 md:mb-6" />
            <div className="prose prose-lg max-w-none dark:prose-invert text-left">
              {/* Assuming overview is simple text; use dangerouslySetInnerHTML if it contains HTML */}
              <Paragraph>{project.overview}</Paragraph> 
            </div>
          </Section>
        )}
        
        {/* Technical Approach Section */}
        {project.technical && (project.technical.content || project.technical.list?.length > 0) && (
          <Section aria-labelledby="technical-heading">
            <SectionHeader title="Technical Approach" centered={false} className="mb-4 md:mb-6" />
            <Grid 
              columns={{ md: 2 }}
              gap="large" 
              className="items-start"
            >
              {/* Text content */}
              <div className="prose prose-lg max-w-none dark:prose-invert text-left space-y-4">
                {project.technical.content && <Paragraph>{project.technical.content}</Paragraph>}
                {project.technical.list && project.technical.list.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2">
                    {project.technical.list.map((item, index) => (
                      <li key={index}>
                        <span className="font-semibold">{item.title}:</span> {item.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Image */}
              {project.technical.image && (
                <div className="mt-6 md:mt-0">
                   <img 
                    src={absoluteImageUrl(project.technical.image)} 
                    alt="Technical diagram or illustration" 
                    className="w-full h-auto rounded-lg shadow-md object-contain" // Use contain for diagrams
                  />
                </div>
              )}
            </Grid>
          </Section>
        )}
        
        {/* Interface Section */}
        {project.interface && (project.interface.content || project.interface.list?.length > 0 || (project.interface.images && project.interface.images.length > 0)) && (
          <Section aria-labelledby="interface-heading">
             <SectionHeader title="Interface & Control" centered={false} className="mb-4 md:mb-6" />
             {(project.interface.content || project.interface.list?.length > 0) && (
                <div className="prose prose-lg max-w-none dark:prose-invert text-left mb-6">
                  {project.interface.content && <Paragraph>{project.interface.content}</Paragraph>}
                  {project.interface.list && project.interface.list.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 mt-4">
                      {project.interface.list.map((item, index) => (
                        <li key={index}>
                          <span className="font-semibold">{item.title}:</span> {item.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
             )}
              {/* Interface Images Grid - Check images exists before mapping */}
              {project.interface.images && project.interface.images.length > 0 && (() => {
                // Assign to variable inside block to help type narrowing
                const images = project.interface.images;
                return (
                  <Grid columns={{ sm: 2 }} gap="large">
                    {/* Map the guaranteed array */}
                    {images.map((imgSrc, index) => (
                      <img 
                        key={index}
                        src={absoluteImageUrl(imgSrc)} 
                        alt={`Interface screenshot ${index + 1}`}
                        className="w-full h-auto rounded-md shadow object-cover aspect-video"
                      />
                    ))}
                  </Grid>
                );
              })()}
          </Section>
        )}

        {/* Results Section */}
        {project.results && (
          <Section aria-labelledby="results-heading">
            <SectionHeader title="Results & Impact" centered={false} className="mb-4 md:mb-6" />
            <div className="prose prose-lg max-w-none dark:prose-invert text-left">
              <Paragraph>{project.results}</Paragraph>
            </div>
          </Section>
        )}

        {/* Related Projects Section (Uses state variable) */}
        {relatedProjects && relatedProjects.length > 0 && (
           <Section aria-labelledby="related-projects-heading">
            <SectionHeader title="Related Projects" centered={true} className="mb-8 md:mb-12" />
            <Grid 
              columns={{ sm: 1, md: 2, lg: 3 }}
              gap="large"
            >
              {relatedProjects.map((related) => (
                <ProjectCard
                  key={related.id}
                  id={related.id}
                  title={related.title}
                  // Pass image and description from summary type
                  image={related.image} 
                  description={related.intro || ''} 
                />
              ))}
            </Grid>
          </Section>
        )}

        {/* Project Navigation (Prev/Next) - Uses adjacentProjects from useMemo */}
        <AdjacentNavigation
          prevItem={adjacentProjects.prev ? { ...adjacentProjects.prev, pathPrefix: '/projects' } : null}
          nextItem={adjacentProjects.next ? { ...adjacentProjects.next, pathPrefix: '/projects' } : null}
          prevLabel="Previous Project"
          nextLabel="Next Project"
          themeBorderColor={themeBorderColor} // Pass theme border color
        />
      </Container>
      
      {/* Back to Projects Link */}
      <Container className="pb-12 text-center">
        <Link href="/projects" variant="default">
          ← Back to All Projects
        </Link>
      </Container>
    </Layout>
  );
};

export default ProjectDetail; 