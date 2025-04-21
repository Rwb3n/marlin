import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Container from '../layout/Container';
import Grid from '../layout/Grid';
import Heading from '../ui/Heading';
import JournalCard from '../cards/JournalCard'; // Assuming JournalCard is .tsx
import Text from '../ui/Text'; // Assuming Text is .tsx
import { getAllJournalEntries } from '../../data/journalData';
import { getPageMetadata, CombinedPageMetadata } from '../../data/metaData';

/**
 * JournalCollectionPage Component
 * 
 * Displays a grid listing all available journal entries.
 */
const JournalCollectionPage: React.FC = () => {
  // Type inference for entries
  const [entries, setEntries] = useState(getAllJournalEntries());
  const [loading, setLoading] = useState<boolean>(false); // Assuming synchronous fetch
  const [error, setError] = useState<string | null>(null);

  // Fetch journal entries on component mount - Adjusted for sync fetch
  useEffect(() => {
    try {
      const allEntries = getAllJournalEntries();
      setEntries(allEntries);
    } catch (err) {
      console.error("Error fetching journal entries:", err);
      setError(err instanceof Error ? err.message : 'Error loading entries');
    }
  }, []); // Empty dependency array means this runs once on mount

  // Get metadata for the page
  const pageMeta = getPageMetadata('journal');
  
  // Spread first, then set defaults using nullish coalescing
  const metadata: CombinedPageMetadata = {
    ...pageMeta, // Spread fetched metadata first
    title: pageMeta?.title ?? 'Journal Archive | BLUE MARLIN OS', // Use fetched title or default
    description: pageMeta?.description ?? 'Read through the latest updates, research notes, and articles.', // Use fetched description or default
  };

  return (
    <Layout pageTitle={metadata.title} description={metadata.description}>
      {/* Metadata tags rendered directly */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      {/* End of metadata tags */}

      {/* Main content container */}
      <Container className="py-12 md:py-16 lg:py-20">
        {/* Page Title */}
        <Heading level={1} className="text-center mb-10 md:mb-12 lg:mb-16">
          Journal Archive
        </Heading>

        {/* Loading state indicator */}
        {loading && (
          <div className="text-center">
            <Text>Loading entries...</Text>
          </div>
        )}

        {/* Error state message */}
        {error && (
          <div className="text-center text-danger-fg dark:text-danger-dark-fg">
            <Text weight="semibold">Error:</Text> {error}
          </div>
        )}

        {/* No entries found message */}
        {!loading && !error && entries.length === 0 && (
          <div className="text-center">
            <Text>No journal entries found.</Text>
          </div>
        )}

        {/* Entries grid */}
        {!loading && !error && entries.length > 0 && (
          <Grid 
            columns={{ sm: 1, md: 2, lg: 3 }} // Corrected responsive columns (adjust breakpoints as needed)
            gap="large"
            // Example responsive gap: gap={{ base: 'medium', md: 'large' }}
          >
            {/* Map through entries and render JournalCard */}
            {entries.map(entry => (
              <JournalCard
                key={entry.id}
                title={entry.title}
                date={entry.date}
                excerpt={entry.excerpt}
                href={entry.url || `/journal/${entry.id}`} // Use entry.url or construct link
                // Pass other necessary props from JournalEntrySummary if needed
              />
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default JournalCollectionPage; 