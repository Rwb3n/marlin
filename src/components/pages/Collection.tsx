import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout'; // Assuming .tsx
import Container from '../layout/Container'; // Assuming .tsx
import SectionHeader from '../ui/SectionHeader'; // Assuming .tsx
import ProjectCard from '../cards/ProjectCard'; // Assuming .tsx
import Grid from '../layout/Grid'; // Use Grid layout component
import Button from '../ui/Button'; // Use Button component for filters
import Text from '../ui/Text'; // For loading/empty states
import { getAllProjects, Project } from '../../data/projectsData'; // Keep Project for potential future use, but use summary type
import { getPageMetadata, CombinedPageMetadata } from '../../data/metaData'; // Named export should work now
// import { getCollection } from '../../data/collectionsData'; // Removed incorrect import

// --- Type Definitions ---

// Infer Project Summary type from getAllProjects return type
type ProjectSummary = ReturnType<typeof getAllProjects>[number];

// Type for the params from react-router-dom
interface CollectionParams extends Record<string, string | undefined> {
  collectionId: string;
}

// Type for the internal collectionData structure
interface CollectionInfo {
  title: string;
  description: string;
  categories: string[]; // Assuming categories are strings
}

// Type for the collectionData mapping object
type CollectionDataMap = Record<string, CollectionInfo>;

/**
 * Collection Component (TypeScript Version)
 * 
 * Displays a filtered collection of projects.
 */
const Collection: React.FC = () => {
  // Get collectionId from URL parameters
  const { collectionId } = useParams<CollectionParams>();
  
  // State variables with types
  const [allProjects, setAllProjects] = useState<ProjectSummary[]>([]); // Use ProjectSummary
  const [filteredProjects, setFilteredProjects] = useState<ProjectSummary[]>([]); // Use ProjectSummary
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded or fetched collection definitions
  const collectionData: CollectionDataMap = {
    'exploration-tools': {
      title: 'Exploration Tools',
      description: 'Advanced systems for mapping, navigation, and data collection in deep-sea environments.',
      categories: ['EXPLORATION SYSTEMS'] // Match category strings in projectsData
    },
    'research-equipment': {
      title: 'Research Equipment',
      description: 'Specialized hardware for scientific study of extreme underwater environments.',
      categories: ['RESEARCH EQUIPMENT']
    },
    'interface-systems': {
      title: 'Interface Systems',
      description: 'Human-machine interfaces optimized for deep-sea operations and situational awareness.',
      categories: ['HUMAN-MACHINE INTERFACE']
    },
    // Add more collections if needed
  };
  
  // Determine current collection based on ID, provide default
  const collection: CollectionInfo = collectionId && collectionData[collectionId] 
    ? collectionData[collectionId] 
    : {
        title: 'Project Collection', 
        description: 'Browse all BLUE MARLIN OS projects and applications.',
        categories: [] // Empty means show all initially
      };
  
  // Get page metadata
  // Assuming a generic key like 'collection' exists or using defaults
  const metadata: CombinedPageMetadata = getPageMetadata(collectionId ? `/collections/${collectionId}` : '/projects') || {
    // Provide fallbacks if getPageMetadata might return null/undefined
    title: collection.title,
    description: collection.description,
    // ... include other required fields from CombinedPageMetadata with defaults
    titleTemplate: '%s | Projects', 
    defaultImage: '/images/og-default.jpg', 
    twitterCard: 'summary_large_image', 
    language: 'en-US', 
    locale: 'en_US', 
    type: 'website', 
    canonicalUrl: `/projects/${collectionId || ''}`.replace(/\/$/, '')
  };
  
  // Effect to fetch and filter projects
  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const fetchedProjects: ProjectSummary[] = getAllProjects(); // Type matches return type now
      setAllProjects(fetchedProjects);

      // Filter projects based on the current collection's categories
      let initialFiltered: ProjectSummary[]; // Use ProjectSummary
      if (collectionId && collection.categories.length > 0) {
        initialFiltered = fetchedProjects.filter(project => 
          collection.categories.includes(project.category)
        );
      } else {
        initialFiltered = fetchedProjects; // Show all if no collection ID or categories defined
      }
      setFilteredProjects(initialFiltered);

      // Extract unique categories *from the initially filtered projects*
      const uniqueCategories = [...new Set(initialFiltered.map(project => project.category))];
      setCategories(uniqueCategories.sort()); // Sort categories alphabetically
      setActiveCategory('all'); // Reset active category

    } catch (err) {
      console.error("Error processing projects:", err);
      setError(err instanceof Error ? err.message : 'Failed to load project data.');
    } finally {
      setLoading(false);
    }
  // Depend on collectionId to refetch/refilter when URL changes
  }, [collectionId]); 
  
  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Determine the base set of projects for this collection
    let baseFiltered: ProjectSummary[]; // Use ProjectSummary
    if (collectionId && collection.categories.length > 0) {
      baseFiltered = allProjects.filter(project => 
        collection.categories.includes(project.category)
      );
    } else {
      baseFiltered = allProjects;
    }

    // Apply the category filter
    if (category === 'all') {
      setFilteredProjects(baseFiltered);
    } else {
      const categoryFiltered = baseFiltered.filter(project => project.category === category); // Use ProjectSummary
      setFilteredProjects(categoryFiltered);
    }
  };
  
  return (
    <Layout>
      {/* Metadata tags rendered directly */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      {/* Add og:image, og:url etc. if needed */}
      {/* End of metadata tags */}

      <Container className="py-12 md:py-16 lg:py-20">
        {/* Collection Header */}
        <SectionHeader
          title={collection.title} // Assuming SectionHeader takes string title
          subtitle={collection.description} // Assuming SectionHeader takes string subtitle
          className="mb-8 md:mb-12"
        />
        
        {/* Category Filters - Only show if multiple categories exist */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8 md:mb-12">
            <Button 
              variant={activeCategory === 'all' ? 'primary' : 'outline'}
              onClick={() => handleCategoryChange('all')}
            >
              All {collectionId ? 'in this collection' : 'Projects'} 
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'primary' : 'outline'}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-10">
            <Text>Loading projects...</Text>
            {/* Add Spinner? */}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10 text-danger-fg dark:text-danger-dark-fg">
            <Text weight="semibold">Error:</Text> {error}
          </div>
        )}

        {/* Content Grid / Empty State */}
        {!loading && !error && (
          filteredProjects.length > 0 ? (
            <Grid 
              columns={{ sm: 1, md: 2, lg: 3 }} // Corrected columns, remove base
              gap="large" // Simplified gap
            >
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  id={project.id} // Pass ID for link generation
                  title={project.title}
                  description={project.intro} // Use intro field
                  image={project.heroImage} // Use heroImage field
                  // href={`/projects/${project.id}`} // ProjectCard likely handles its own link
                />
              ))}
            </Grid>
          ) : (
            <div className="text-center py-10">
              <Text>No projects found matching the criteria.</Text>
            </div>
          )
        )}
      </Container>
    </Layout>
  );
};

export default Collection; 