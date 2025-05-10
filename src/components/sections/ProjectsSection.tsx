import React, { useState, useMemo } from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import Grid from '../layout/Grid';
import ProjectCard from '../cards/ProjectCard';
import SectionHeader from '../ui/SectionHeader';
import clsx from 'clsx';
import { Heading } from '../ui/Heading';
import { Paragraph } from '../ui/Paragraph';

// Define the Project interface (assuming ProjectCard imports/defines its required props)
// We mainly care about passing necessary data from this level
export interface ProjectSummary {
  id: string;
  title: string;
  description?: string; // Or intro?
  image?: string; // Or imageSrc? Align with ProjectCard
  url?: string;
  category?: string;
  status?: string; // Changed to string to align with ProjectCard and Contentful flexibility
  // Add other fields ProjectCard might expect
  intro?: string; 
  imageSrc?: string;
}

interface ProjectsSectionProps {
  /**
   * Section title
   */
  title?: string;
  
  /**
   * Section subtitle or description
   */
  subtitle?: string | React.ReactNode;
  
  /**
   * Array of project objects to display
   */
  projects: ProjectSummary[]; // Use the summary type
  
  /**
   * Number of columns at different breakpoints (used when forceSingleColumn is false)
   */
  columns?: { sm?: number; md?: number; lg?: number };
  
  /**
   * Whether to show category filtering
   */
  withFiltering?: boolean;
  
  /**
   * Optional array of categories for filtering
   */
  categories?: string[];
  
  /**
   * Forces the grid to render as a single column, ignoring the 'columns' prop.
   * Useful for list-style layouts.
   */
  forceSingleColumn?: boolean; // New prop

  /**
   * Display mode to pass down to ProjectCard components.
   * 'default' shows standard card with image, 'homepage' shows minimal layout.
   */
  cardDisplayMode?: 'default' | 'homepage'; // New prop
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Projects Section Component
 * 
 * Displays a grid (or list) of project cards with optional category filtering.
 * Features:
 * - Responsive grid layout (configurable or force single column)
 * - Optional filtering UI for project categories
 * - Can pass different display modes to ProjectCard
 * - Consistent card styling and hover effects
 * - Theme-aware styling with apex/origin variants
 */
export function ProjectsSection({
  title = "Projects",
  subtitle,
  projects = [],
  columns = { sm: 1, md: 2, lg: 4 }, // Default grid columns
  withFiltering = false,
  categories: propCategories,
  forceSingleColumn = false, // Default to false
  cardDisplayMode = 'default', // Default to 'default'
  className = "",
}: ProjectsSectionProps) {
  // const { theme } = useTheme(); // No longer needed for this logic
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Extract unique categories from projects if not provided
  const categories = useMemo(() => {
    if (!withFiltering) return []; // Don't calculate if filtering is off
    if (propCategories && propCategories.length > 0) {
      return propCategories;
    }
    
    // Extract unique categories from projects
    const uniqueCategories = Array.from(
      new Set(
        projects
          .map(project => project.category)
          .filter(category => !!category) as string[]
      )
    );
    
    return uniqueCategories;
  }, [projects, propCategories, withFiltering]);
  
  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (!withFiltering || !activeFilter) return projects;
    
    return projects.filter(project => 
      project.category && project.category === activeFilter
    );
  }, [projects, activeFilter, withFiltering]);
  
  // Handle filter click
  const handleFilterClick = (category: string) => {
    setActiveFilter(currentFilter => 
      currentFilter === category ? null : category
    );
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setActiveFilter(null);
  };

  // Determine grid columns based on forceSingleColumn prop
  const gridColumns = forceSingleColumn 
    ? { sm: 1, md: 1, lg: 1 } // Force single column
    : columns; // Use provided columns prop otherwise
  
  return (
    <Section className={clsx("projects-section py-12", className)} id="projects">
      <Container>
        {/* Section Header */}
        <SectionHeader
          title={title}
          subtitle={subtitle}
          centered={true}
          spacing="large"
          className="mb-2"
        />
        
        {/* Category Filters */}
        {withFiltering && categories.length > 0 && (
          <div className="filter-controls mt-6 mb-8 flex flex-wrap justify-center gap-2">
            <button
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                !activeFilter 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-card text-muted-foreground hover:bg-muted/20 dark:hover:bg-muted/20'
              )}
              onClick={handleResetFilters}
            >
              All
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeFilter === category
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-card text-muted-foreground hover:bg-muted/20 dark:hover:bg-muted/20'
                )}
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <Grid 
            columns={gridColumns} // Use calculated grid columns
            gap="large"
            className="project-grid"
          >
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                // Pass all relevant props from ProjectSummary down
                // Ensure ProjectCard handles potential undefined values if needed
                id={project.id}
                title={project.title}
                description={project.description || project.intro}
                imageSrc={project.imageSrc || project.image}
                imageAlt={project.title} // Default alt text
                href={project.url}
                status={project.status}
                displayMode={cardDisplayMode} // Pass down the display mode
                // Pass layout prop only if needed and not homepage? For now, ProjectCard defaults handle it.
                // layout={cardDisplayMode === 'homepage' ? 'vertical' : undefined} 
              />
            ))}
          </Grid>
        ) : (
            /* No projects message */
            <div className="col-span-full text-center py-12">
              <Heading level={3} className="mb-4">No Projects Found</Heading>
              <Paragraph className="text-muted-foreground">
                {withFiltering && activeFilter 
                  ? `No projects found in the "${activeFilter}" category.` 
                  : "No projects available at this time."
                }
              </Paragraph>
              {withFiltering && activeFilter && (
                <button
                  className="mt-4 text-sm underline text-primary hover:text-primary/80"
                  onClick={handleResetFilters}
                >
                  Clear filter
                </button>
              )}
            </div>
        )}
      </Container>
    </Section>
  );
}

export default ProjectsSection; 