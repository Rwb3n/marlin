import React, { useState, useMemo } from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import Grid from '../layout/Grid';
import ProjectCard from '../cards/ProjectCard';
import { useTheme } from '../../context/ThemeContext';
import SectionHeader from '../ui/SectionHeader';
import clsx from 'clsx';
import { Heading } from '../ui/Heading';
import { Paragraph } from '../ui/Paragraph';

// Define the Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  category?: string;
  status?: 'active' | 'maintenance' | 'development';
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
  projects: Project[];
  
  /**
   * Number of columns at different breakpoints
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
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Projects Section Component
 * 
 * Displays a grid of project cards with optional category filtering.
 * Features:
 * - Responsive grid layout matching legacy implementation
 * - Optional filtering UI for project categories
 * - Consistent card styling and hover effects
 * - Theme-aware styling with apex/origin variants
 */
export function ProjectsSection({
  title = "Projects",
  subtitle,
  projects = [],
  columns = { sm: 1, md: 2, lg: 4 },
  withFiltering = false,
  categories: propCategories,
  className = "",
}: ProjectsSectionProps) {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Extract unique categories from projects if not provided
  const categories = useMemo(() => {
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
  }, [projects, propCategories]);
  
  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (!activeFilter) return projects;
    
    return projects.filter(project => 
      project.category && project.category === activeFilter
    );
  }, [projects, activeFilter]);
  
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
                  ? theme === 'dark' 
                    ? 'bg-dark-accent text-white' 
                    : 'bg-light-accent text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
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
                    ? theme === 'dark' 
                      ? 'bg-dark-accent text-white' 
                      : 'bg-light-accent text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
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
            columns={columns}
            gap="large"
            className="project-grid"
          >
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imageSrc={project.image}
                imageAlt={project.title}
                href={project.url}
                id={project.id}
                status={project.status}
              />
            ))}
            
            {/* No projects message */}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-lg opacity-70">
                  No projects found{activeFilter ? ` in ${activeFilter} category` : ''}.
                </p>
                {activeFilter && (
                  <button
                    className="mt-4 text-sm underline"
                    onClick={handleResetFilters}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </Grid>
        ) : (
          <div className="text-center py-12">
            <Heading level={3} className="mb-4">No Projects Found</Heading>
            <Paragraph>Try adjusting the filter or check back later.</Paragraph>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default ProjectsSection; 