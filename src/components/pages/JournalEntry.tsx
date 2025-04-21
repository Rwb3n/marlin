import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async'; // Removed
import Layout from '../layout/Layout'; // Assuming .tsx
import Container from '../layout/Container'; // Assuming .tsx
import Link from '../ui/Link'; // Import the enhanced custom Link component
import { 
  getJournalEntryById, 
  getAdjacentEntries, // Import the new function
  JournalEntry as JournalEntryType 
} from '../../data/journalData'; // Import type
import { getPageMetadata, CombinedPageMetadata } from '../../data/metaData'; // Import type
import NotFoundComponent from '../ui/NotFoundComponent'; // Assuming .tsx
import AdjacentNavigation from '../ui/AdjacentNavigation'; // Import the new component
import { useTheme } from '../../context/ThemeContext'; // Import useTheme for border color

// --- Type Definitions ---

// Type for the params from react-router-dom
interface EntryParams extends Record<string, string | undefined> {
  entryId: string;
}

/**
 * JournalEntry Component (TypeScript Version)
 * 
 * Displays a full journal entry/blog post.
 */
const JournalEntry: React.FC = () => {
  const { entryId } = useParams<EntryParams>();
  const [entry, setEntry] = useState<JournalEntryType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme(); // Get theme for border color
  
  // Fetch journal entry data based on the URL parameter
  useEffect(() => {
    setLoading(true);
    setError(null);
    setEntry(null); // Reset entry on ID change

    if (!entryId) {
      setError('No journal entry ID provided.');
      setLoading(false);
      return;
    }

    try {
      const entryData = getJournalEntryById(entryId); // Fetch data
      
      if (!entryData) {
        setError('Journal entry not found');
      } else {
        setEntry(entryData);
      }
    } catch (err) {
      console.error("Error fetching journal entry:", err);
      setError(err instanceof Error ? err.message : 'Error loading journal entry');
    } finally {
        setLoading(false);
    }
  }, [entryId]);
  
  // Calculate adjacent entries using useMemo
  const adjacentEntries = useMemo(() => {
    if (!entryId) return { prev: null, next: null };
    return getAdjacentEntries(entryId);
  }, [entryId]);

  // Determine theme border color
  const themeBorderColor = theme === 'light' ? 'border-light-border' : 'border-dark-border';

  // Handle loading state
  if (loading) {
    return (
      <Layout pageTitle="Loading Journal Entry...">
        <Container className="py-10 text-center">
          <div className="loading-state">Loading journal entry...</div>
          {/* Add Spinner? */}
        </Container>
      </Layout>
    );
  }
  
  // Handle error state or entry not found
  if (error || !entry) {
    const specificErrorMessage = (error && error !== 'Journal entry not found') ? error : undefined;
    
    return (
      <NotFoundComponent 
        title={error === 'Journal entry not found' ? "Journal Entry Not Found" : "Error Loading Entry"}
        message={specificErrorMessage} // Pass specific error message if it exists
        linkHref="/journal" // Link to the main journal collection
        linkText="View All Journal Entries"
        // Suggestion type could be dynamic based on error, but keeping simple
        suggestionType="journal" 
      />
    );
  }
  
  // Get metadata for the journal entry page (use fetched entry)
  // Provide fallback object to getPageMetadata if needed
  const metadata: CombinedPageMetadata = getPageMetadata(`/journal/${entry.id}`) || {
    title: entry.title, 
    description: entry.excerpt,
    // Add other required fields from CombinedPageMetadata with defaults
    titleTemplate: '%s | Journal', 
    defaultImage: '/images/og-default.jpg', 
    twitterCard: 'summary_large_image', 
    language: 'en-US', 
    locale: 'en_US', 
    type: 'article', // Correct type for blog post
    canonicalUrl: `/journal/${entry.id}`
  };
  
  // Construct full image URL if author image path is relative
  const authorImageUrl = entry.author?.image?.startsWith('/') 
    ? entry.author.image 
    : undefined; // Handle case where image is not available or absolute

  return (
    <Layout>
      {/* Metadata tags rendered directly */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={metadata.type || 'article'} /> 
      <meta property="og:url" content={metadata.canonicalUrl} /> 
      {metadata.image && <meta property="og:image" content={metadata.image} />}
      {/* Add article specific meta tags if desired */}
      {entry.author?.name && <meta property="article:author" content={entry.author.name} />} 
      {entry.date && <meta property="article:published_time" content={new Date(entry.date).toISOString()} />} 
      {entry.tags?.map(tag => <meta property="article:tag" content={tag} key={tag} />)} 
      {/* End of metadata tags */}
      
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Main Content Column */}
          <div className="lg:col-span-2 blog-main prose prose-lg dark:prose-invert max-w-none">
            {/* Entry Header */}
            <div className="mb-8 border-b border-border pb-8">
              {/* Metadata: Date and Tags - Apply font-mono here */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4 font-mono">
                <span className="blog-date">{entry.date}</span>
                {entry.tags?.map((tag) => (
                  <Link 
                    href={`/journal/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} 
                    // Using a variant similar to 'tag', but maybe slightly different visually for header context
                    // Let's reuse 'tag' for now, but potentially create a new variant if needed
                    variant="tag" 
                    className="hover:bg-accent hover:text-accent-foreground transition-colors" // Specific hover for header tags
                    key={tag}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-display">
                {entry.title}
              </h1>
              
              {/* Author Info */}
              {entry.author && (
                <div className="flex items-center gap-4">
                  {authorImageUrl && (
                    <img 
                      src={authorImageUrl} 
                      alt={entry.author.name} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold">{entry.author.name}</div>
                    <div className="text-sm text-muted-foreground">{entry.author.role}</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Rendered Content */}
            <div 
              className="blog-content prose prose-lg dark:prose-invert max-w-none prose-pre:bg-apex-bg-code dark:prose-pre:bg-origin-bg-code"
              dangerouslySetInnerHTML={{ __html: entry.content }}
            />
            
            {/* Post Navigation - Using AdjacentNavigation Component */}
            <AdjacentNavigation
              prevItem={adjacentEntries.prev ? { ...adjacentEntries.prev, pathPrefix: '/journal' } : null}
              nextItem={adjacentEntries.next ? { ...adjacentEntries.next, pathPrefix: '/journal' } : null}
              prevLabel="Previous Entry"
              nextLabel="Next Entry"
              themeBorderColor={themeBorderColor} // Pass theme border color
            />
          </div>
          
          {/* Sidebar Column */}
          <aside className="lg:col-span-1 border-t border-border pt-8 mt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0 lg:mt-0">
            {/* Related Entries */}
            {entry.relatedEntries && entry.relatedEntries.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Related Entries</h3>
                <ul className="space-y-4">
                  {entry.relatedEntries.map((related) => (
                    <li key={related.id}>
                      {/* Apply font-mono to the date span */}
                      <span className="text-xs text-muted-foreground block mb-0.5 font-mono">{related.date}</span>
                      <Link 
                        href={`/journal/${related.id}`} 
                        variant="subtle" // Use subtle variant for less emphasis
                        className="font-medium" // Keep font-medium override
                      >
                        {related.title}
                      </Link>
                      {/* <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{related.excerpt}</p> */}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Popular Topics/Tags - Applying no-underline here too for consistency */}
            {entry.tags && entry.tags.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                     <Link 
                      href={`/journal/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} 
                      variant="tag" // Use the standard tag variant
                      key={tag}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </Layout>
  );
};

export default JournalEntry; 