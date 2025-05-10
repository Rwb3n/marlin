import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Layout from '../layout/Layout';
import Container from '../layout/Container';
import Section from '../layout/Section';
import Grid from '../layout/Grid';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';
import Text from '../ui/Text';
import Link from '../ui/Link'; // Uncommented for Rich Text
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../cards/ProjectCard';
// @ts-ignore // Ignoring for NotFoundComponent.jsx as it's a JS file
import NotFoundComponent from '../ui/NotFoundComponent';
import AdjacentNavigation from '../ui/AdjacentNavigation';
import { 
  fetchProjectBySlug, 
  fetchProjectNavigationList,
  ProjectSkeleton,
  // fetchProjects // May need this or a more specific function for adjacent later
} from '../../services/contentful';
import type { Entry } from 'contentful'; // Added
import { 
  getPageMetadata, 
  CombinedPageMetadata
} from '../../data/metaData';
// Rich Text Renderer - Imports Added/Uncommented
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

interface ProjectParams extends Record<string, string | undefined> {
  projectId: string; // This should probably be slug for Contentful
}

// Define AdjacentItem type locally based on expected props for AdjacentNavigation
interface AdjacentItem {
  id: string;
  title: string;
  pathPrefix: string;
}

const ProjectDetail: React.FC = () => {
  const { projectId: projectSlug } = useParams<ProjectParams>();
  const [project, setProject] = useState<Entry<ProjectSkeleton> | null>(null);
  const [projectNavList, setProjectNavList] = useState<Pick<Entry<ProjectSkeleton>, 'sys' | 'fields'>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const adjacentProjects = useMemo(() => {
    const currentFields = project?.fields; // Keep as is, cast below
    if (!(currentFields as any)?.slug || projectNavList.length === 0) {
      return { prev: null, next: null };
    }
    const currentSlug = (currentFields as any).slug;
    const currentIndex = projectNavList.findIndex(p => ((p.fields as any))?.slug === currentSlug);
    if (currentIndex === -1) {
      return { prev: null, next: null };
    }

    const prevProjectData = currentIndex > 0 ? projectNavList[currentIndex - 1] : null;
    const nextProjectData = currentIndex < projectNavList.length - 1 ? projectNavList[currentIndex + 1] : null;

    const formatNavItem = (navData: Pick<Entry<ProjectSkeleton>, 'sys' | 'fields'> | null): AdjacentItem | null => {
      const navFields = navData?.fields;
      if (!(navFields as any)?.slug) {
        return null;
      }
      return {
        id: String((navFields as any).slug),
        title: String((navFields as any).title || 'Project'),
        pathPrefix: '/projects'
      };
    };

    return {
      prev: formatNavItem(prevProjectData),
      next: formatNavItem(nextProjectData)
    };
  }, [project, projectNavList]);

  useEffect(() => {
    if (!projectSlug) {
      setError('No project slug provided.');
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);
      setProject(null);
      setProjectNavList([]);

      try {
        const [projectData, navListData] = await Promise.all([
          fetchProjectBySlug(projectSlug),
          fetchProjectNavigationList()
        ]);

        if (!projectData) {
          setError('Project not found');
        } else {
          setProject(projectData);
        }
        setProjectNavList(navListData);

      } catch (err) {
        console.error("Error fetching project data from Contentful:", err);
        setError(err instanceof Error ? err.message : 'Error loading project data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [projectSlug]);

  const absoluteImageUrl = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    return url.startsWith('//') ? `https:${url}` : (url.startsWith('http') || url.startsWith('/') ? url : `/${url}`);
  }
  
  if (loading) {
    return (
      <Layout pageTitle="Loading Project...">
        <Container className="py-16 text-center">
          <Text>Loading project details...</Text>
        </Container>
      </Layout>
    );
  }

  if (error || !project) {
    const specificErrorMessage = (error && error !== 'Project not found') ? error : undefined;
    return (
      <NotFoundComponent 
        title={error === 'Project not found' ? "Project Not Found" : "Error Loading Project"}
        message={specificErrorMessage}
        linkHref="/projects"
        linkText="View All Projects"
      />
    );
  }

  // --- Metadata Generation ---
  const currentProjectFieldsForMeta = project?.fields;
  const projectTitle = String((currentProjectFieldsForMeta as any)?.title || 'Project');
  const projectDescription = String((currentProjectFieldsForMeta as any)?.overview || 'Detailed project information.'); 
  const heroImageFile = (currentProjectFieldsForMeta as any)?.heroImage?.fields?.file;
  const heroImageUrl = heroImageFile && typeof heroImageFile.url === 'string' ? heroImageFile.url : undefined;
  const currentSlugForMeta = String((currentProjectFieldsForMeta as any)?.slug || projectSlug || 'unknown-project');

  const metadata: CombinedPageMetadata = getPageMetadata(`/projects/${currentSlugForMeta}`) || {
    title: projectTitle,
    description: projectDescription,
    titleTemplate: '%s | Project',
    defaultImage: '/images/og-default.jpg',
    twitterCard: 'summary_large_image',
    language: 'en-US',
    locale: 'en_US',
    type: 'article',
    canonicalUrl: `/projects/${currentSlugForMeta}`,
    image: heroImageUrl ? absoluteImageUrl(heroImageUrl) : '/images/og-default.jpg' 
  };
  
  // --- Rich Text Options ---
  const richTextOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: text => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: text => <em className="italic">{text}</em>,
      [MARKS.CODE]: text => <code className="bg-muted dark:bg-muted/50 p-1 rounded text-sm font-mono">{text}</code>,
      // Add other marks like UNDERLINE if needed
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <Heading level={1} className="text-3xl md:text-4xl font-bold mb-6 mt-8">{children}</Heading>,
      [BLOCKS.HEADING_2]: (node, children) => <Heading level={2} className="text-2xl md:text-3xl font-bold mb-5 mt-7">{children}</Heading>,
      [BLOCKS.HEADING_3]: (node, children) => <Heading level={3} className="text-xl md:text-2xl font-bold mb-4 mt-6">{children}</Heading>,
      [BLOCKS.HEADING_4]: (node, children) => <Heading level={4} className="text-lg md:text-xl font-bold mb-4 mt-5">{children}</Heading>,
      [BLOCKS.HEADING_5]: (node, children) => <Heading level={5} className="text-base md:text-lg font-bold mb-3 mt-4">{children}</Heading>,
      [BLOCKS.HEADING_6]: (node, children) => <Heading level={6} className="text-base font-bold mb-3 mt-4">{children}</Heading>,
      [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph className="mb-4 leading-relaxed">{children}</Paragraph>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className="mb-1">{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote className="border-l-4 border-accent dark:border-dark-accent pl-4 italic my-6 text-muted-foreground">{children}</blockquote>,
      [BLOCKS.HR]: () => <hr className="my-8 border-border" />,
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return <Link href={uri} className="text-accent dark:text-dark-accent hover:underline" target={uri.startsWith('http') ? '_blank' : undefined} rel={uri.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</Link>;
      },
      // TODO: Add BLOCKS.EMBEDDED_ASSET renderer if needed
      // [BLOCKS.EMBEDDED_ASSET]: (node) => {
      //   const asset = node.data.target as Asset;
      //   if (!asset?.fields?.file) return null;
      //   const { url, details } = asset.fields.file;
      //   const { width, height } = details.image || {};
      //   return <img src={absoluteImageUrl(url as string)} alt={String(asset.fields.description || asset.fields.title || '')} width={width} height={height} className="my-4 rounded-md" />;
      // },
    },
  };

  return (
    <Layout>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={metadata.type || 'article'} />
      <meta property="og:url" content={metadata.canonicalUrl} />
      {metadata.image && <meta property="og:image" content={metadata.image} />}
      
      <Section className="pt-16 pb-8 md:pt-24 md:pb-12 bg-background" withContainer={false}>
        <Container>
          <Grid columns={{ md: 2 }} gap="large" className="items-center">
            <div className="order-1 md:order-2">
              {heroImageUrl ? (
                <img 
                  src={absoluteImageUrl(heroImageUrl)} 
                  alt={String((project.fields as any).heroImage?.fields?.description || (project.fields as any).heroImage?.fields?.title || projectTitle)}
                  className="w-full h-auto rounded-lg shadow-lg object-cover aspect-video"
                />
              ) : (
                <div className="w-full aspect-video bg-muted dark:bg-muted/50 rounded-lg flex items-center justify-center">
                  <Text className="text-muted-foreground">No image available</Text>
                </div>
              )}
            </div>
            <div className="order-2 md:order-1">
              <div className="mb-4 flex items-center space-x-4 text-sm font-medium font-mono uppercase tracking-wider">
                {(project.fields as any).category && (project.fields as any).category.length > 0 && (
                  <Text as="span" className="text-accent border-r pr-4 border-border">
                    {(project.fields as any).category.join(', ')}
                  </Text>
                )}
                {(project.fields as any).year && (
                  <Text as="span" className="text-muted-foreground">{(project.fields as any).year}</Text>
                )}
              </div>
              <Heading level={1} className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                {projectTitle}
              </Heading>
              {(project.fields as any).excerpt && (
                <Paragraph className="mb-6 text-lg font-medium text-accent dark:text-dark-accent">
                  {String((project.fields as any).excerpt)}
                </Paragraph>
              )}

              {/* New Project Meta Section: Type, Scope, Timeline */}
              {((project.fields as any).type || (project.fields as any).scope || (project.fields as any).timeline) && (
                <div className="mb-8 mt-2 pt-6 border-t border-border/60">
                  <Grid 
                    columns={3}
                    gap="default" 
                    className="text-center md:text-left" 
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
                  >
                    {(project.fields as any).type && (
                      <div>
                        <Text as="h3" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          TYPE
                        </Text>
                        <Text as="p" className="text-sm sm:text-base text-foreground">
                          {String((project.fields as any).type)}
                        </Text>
                      </div>
                    )}
                    {(project.fields as any).scope && (
                      <div>
                        <Text as="h3" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          SCOPE
                        </Text>
                        <Text as="p" className="text-sm sm:text-base text-foreground">
                          {String((project.fields as any).scope)}
                        </Text>
                      </div>
                    )}
                    {(project.fields as any).timeline && (
                      <div>
                        <Text as="h3" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          STATUS
                        </Text>
                        <Text as="p" className="text-sm sm:text-base text-foreground">
                          {String((project.fields as any).timeline)}
                        </Text>
                      </div>
                    )}
                  </Grid>
                </div>
              )}
            </div>
          </Grid>
        </Container>
      </Section>
      
      <Container width="default" padding="default" className="py-12 md:py-16 lg:py-20 space-y-6 md:space-y-8">
        
        {/* Overview Section - Relocated and styled consistently */}
        {(project.fields as any).overview && (
          <Section className="py-8 md:py-12" withContainer={false}>
            <SectionHeader title="Overview" />
            <div className="prose max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-accent dark:prose-a:text-dark-accent hover:prose-a:underline">
              <Paragraph className="mb-4 leading-relaxed">
                {(project.fields as any).overview}
              </Paragraph>
            </div>
          </Section>
        )}
        
        {/* Technical Details Section */}
        {(project.fields as any).technical && (
          <Section className="py-8 md:py-12" withContainer={false}>
            <SectionHeader title="Technical Deep Dive" />
            <div className="prose max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-accent dark:prose-a:text-dark-accent hover:prose-a:underline">
              {documentToReactComponents((project.fields as any).technical, richTextOptions)}
            </div>
          </Section>
        )}

        {/* Interface & Experience Section */}
        {(project.fields as any).interface && (
          <Section className="py-8 md:py-12 bg-muted/30 dark:bg-muted/10" withContainer={false}>
            <SectionHeader title="Interface &amp; User Experience" />
            <div className="prose max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-accent dark:prose-a:text-dark-accent hover:prose-a:underline">
              {documentToReactComponents((project.fields as any).interface, richTextOptions)}
            </div>
          </Section>
        )}

        {/* Results & Impact Section */}
        {(project.fields as any).results && (
          <Section className="py-8 md:py-12" withContainer={false}>
             <SectionHeader title="Results &amp; Impact" />
            <div className="prose max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-accent dark:prose-a:text-dark-accent hover:prose-a:underline">
              {documentToReactComponents((project.fields as any).results, richTextOptions)}
            </div>
          </Section>
        )}

        {/* Related Projects Section */}
        {(project.fields as any).relatedProjects && (project.fields as any).relatedProjects.length > 0 && (
          <Section aria-labelledby="related-projects-heading">
            <SectionHeader title="Related Projects" centered={false} className="mb-8 md:mb-10" />
            <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="large">
              {(project.fields as any).relatedProjects.map((relatedProject: Entry<ProjectSkeleton>) => {
                const rpFields = relatedProject.fields;
                if (!rpFields) return null;
                const rpTitle = String((rpFields as any).title || 'Related Project');
                const rpHeroImage = (rpFields as any).heroImage;
                let rpImageUrl: string | undefined = undefined;
                let rpImageAltText: string | undefined = undefined;

                if (rpHeroImage && rpHeroImage.fields && rpHeroImage.fields.file && typeof rpHeroImage.fields.file.url === 'string') {
                  const urlString: string = rpHeroImage.fields.file.url;
                  rpImageUrl = urlString.startsWith('//') ? `https:${urlString}` : urlString;
                  rpImageAltText = String(rpHeroImage.fields.description || rpHeroImage.fields.title || rpTitle);
                }

                return (
                  <ProjectCard
                    key={relatedProject.sys.id}
                    id={relatedProject.sys.id}
                    title={rpTitle}
                    image={rpImageUrl}
                    imageAlt={rpImageAltText}
                    description={String((rpFields as any).overview || '').substring(0, 100) + ((rpFields as any).overview && (rpFields as any).overview.length > 100 ? '...' : '')}
                    href={`/projects/${(rpFields as any).slug}`}
                  />
                );
              })}
            </Grid>
          </Section>
        )}

        {/* Adjacent Navigation Section */}
        {(adjacentProjects.prev || adjacentProjects.next) && (
          <Section aria-labelledby="adjacent-projects-navigation" className="pt-8 mt-8 border-t border-border">
            <AdjacentNavigation 
              prevItem={adjacentProjects.prev}
              nextItem={adjacentProjects.next}
                prevLabel="Previous Project"
                nextLabel="Next Project"
            />
          </Section>
        )}
      </Container>
    </Layout>
  );
};

export default ProjectDetail; 