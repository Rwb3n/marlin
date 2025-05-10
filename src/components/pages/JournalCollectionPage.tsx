import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Container from '../layout/Container';
import Grid from '../layout/Grid';
import Heading from '../ui/Heading';
import JournalCard from '../cards/JournalCard';
import Text from '../ui/Text';
import { fetchJournalEntries, ContentfulJournalEntry } from '../../services/contentful';
import { getPageMetadata, CombinedPageMetadata } from '../../data/metaData';

/**
 * JournalCollectionPage Component
 * 
 * Displays a grid listing all available journal entries.
 */
const JournalCollectionPage: React.FC = () => {
  const [entries, setEntries] = useState<ContentfulJournalEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedEntries = await fetchJournalEntries();
        setEntries(fetchedEntries);
      } catch (err) {
        console.error("Error fetching journal entries from Contentful:", err);
        setError(err instanceof Error ? err.message : 'Error loading entries');
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  const pageMeta = getPageMetadata('journal');
  
  const metadata: CombinedPageMetadata = {
    ...pageMeta,
    title: pageMeta?.title ?? 'Journal Archive | BLUE MARLIN OS',
    description: pageMeta?.description ?? 'Read through the latest updates, research notes, and articles.',
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
            columns={{ sm: 1, md: 2, lg: 3 }}
            gap="large"
          >
            {entries.map(entry => (
              <JournalCard
                key={entry.sys.id}
                title={entry.fields.title}
                date={entry.fields.date || ''}
                href={`/journal/${entry.fields.slug}`}
              />
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default JournalCollectionPage; 