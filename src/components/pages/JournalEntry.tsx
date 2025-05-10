import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import Container from '../layout/Container';
import Link from '../ui/Link';
import { 
  fetchJournalEntryBySlug, 
  fetchJournalNavigationList,
  JournalEntrySkeleton
} from '../../services/contentful';
import type { Entry } from 'contentful';
import { getPageMetadata, CombinedPageMetadata } from '../../data/metaData';
// @ts-ignore // Ignoring for NotFoundComponent.jsx as it's a JS file
import NotFoundComponent from '../ui/NotFoundComponent';
import AdjacentNavigation from '../ui/AdjacentNavigation';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';

interface EntryParams extends Record<string, string | undefined> {
  entryId: string;
}

interface AdjacentItem {
  id: string;
  title: string;
  pathPrefix: string;
}

const JournalEntry: React.FC = () => {
  const { entryId: entrySlug } = useParams<EntryParams>();
  const [entry, setEntry] = useState<Entry<JournalEntrySkeleton> | null>(null);
  const [journalNavList, setJournalNavList] = useState<Pick<Entry<JournalEntrySkeleton>, 'sys' | 'fields'>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!entrySlug) {
      setError('No journal entry slug provided.');
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);
      setEntry(null);
      setJournalNavList([]);
      try {
        const [entryData, navListData] = await Promise.all([
          fetchJournalEntryBySlug(entrySlug),
          fetchJournalNavigationList()
        ]);

        if (!entryData) {
          setError('Journal entry not found');
        } else {
          setEntry(entryData);
        }
        setJournalNavList(navListData);
      } catch (err) {
        console.error("Error fetching journal entry data:", err);
        setError(err instanceof Error ? err.message : 'Error loading journal entry');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [entrySlug]);
  
  const adjacentEntries = useMemo(() => {
    const currentFields = entry?.fields;
    if (!(currentFields as any)?.slug || journalNavList.length === 0) {
      return { prev: null, next: null };
    }
    const currentSlug = (currentFields as any).slug;
    const currentIndex = journalNavList.findIndex(p => ((p.fields as any))?.slug === currentSlug);

    if (currentIndex === -1) {
      return { prev: null, next: null };
    }

    const prevEntryData = currentIndex > 0 ? journalNavList[currentIndex - 1] : null;
    const nextEntryData = currentIndex < journalNavList.length - 1 ? journalNavList[currentIndex + 1] : null;

    const formatNavItem = (navData: Pick<Entry<JournalEntrySkeleton>, 'sys' | 'fields'> | null): AdjacentItem | null => {
      const navFields = navData?.fields;
      if (!(navFields as any)?.slug) return null;
      return {
        id: String((navFields as any).slug),
        title: String((navFields as any).title || 'Entry'),
        pathPrefix: '/journal'
      };
    };

    return {
      prev: formatNavItem(prevEntryData),
      next: formatNavItem(nextEntryData)
    };
  }, [entry, journalNavList]);

  if (loading) {
    return (
      <Layout pageTitle="Loading Journal Entry...">
        <Container className="py-10 text-center">
          <div>Loading journal entry...</div>
        </Container>
      </Layout>
    );
  }
  
  if (error || !entry) {
    const specificErrorMessage = (error && error !== 'Journal entry not found') ? error : undefined;
    return (
      <NotFoundComponent 
        title={error === 'Journal entry not found' ? "Journal Entry Not Found" : "Error Loading Entry"}
        message={specificErrorMessage}
        linkHref="/journal"
        linkText="View All Journal Entries"
        suggestionType="journal" 
      />
    );
  }
  
  const entryTitle = String((entry.fields as any)?.title || 'Journal Entry');
  const entryDescription = String((entry.fields as any)?.excerpt || 'An entry from the journal.');
  const entrySlugForMeta = String((entry.fields as any)?.slug || entrySlug || 'unknown-entry');

  const metadata: CombinedPageMetadata = getPageMetadata(`/journal/${entrySlugForMeta}`) || {
    title: entryTitle,
    description: entryDescription,
    titleTemplate: '%s | Journal',
    defaultImage: '/images/og-default.jpg',
    twitterCard: 'summary_large_image',
    language: 'en-US',
    locale: 'en_US',
    type: 'article',
    canonicalUrl: `/journal/${entrySlugForMeta}`,
  };
  
  const richTextOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: text => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: text => <em className="italic">{text}</em>,
      [MARKS.CODE]: text => <code className="bg-muted dark:bg-muted/50 p-1 rounded text-sm font-mono">{text}</code>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <Heading level={1} className="text-3xl md:text-4xl font-bold mb-4 mt-6">{children}</Heading>,
      [BLOCKS.HEADING_2]: (node, children) => <Heading level={2} className="text-2xl md:text-3xl font-bold mb-3 mt-5">{children}</Heading>,
      [BLOCKS.HEADING_3]: (node, children) => <Heading level={3} className="text-xl md:text-2xl font-bold mb-3 mt-5">{children}</Heading>,
      [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph className="mb-4 text-base leading-relaxed">{children}</Paragraph>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote className="border-l-4 border-border pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return <Link href={uri} variant="default" target={uri.startsWith('http') ? '_blank' : undefined} rel={uri.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</Link>;
      },
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
      {(entry.fields as any)?.date && <meta property="article:published_time" content={new Date((entry.fields as any).date).toISOString()} />} 
      {(entry.fields as any)?.tags?.map((tag: string) => <meta property="article:tag" content={tag} key={tag} />)} 
      
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2 blog-main">
            <div className="mb-8 border-b border-border pb-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4 font-mono">
                {(entry.fields as any)?.date && <span className="blog-date">{new Date((entry.fields as any).date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
                {(entry.fields as any)?.tags?.map((tag: string) => (
                  <Link 
                    href={`/journal/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} 
                    variant="tag" 
                    className="hover:bg-accent hover:text-accent-foreground transition-colors"
                    key={tag}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-display">
                {entryTitle}
              </h1>
            </div>
            
            <div className="blog-content prose prose-lg dark:prose-invert max-w-none prose-pre:bg-muted dark:prose-pre:bg-muted/50">
              {(entry.fields as any)?.content ? documentToReactComponents((entry.fields as any).content, richTextOptions) : <Paragraph>No content available.</Paragraph>}
            </div>
          </div>
          
          <aside className="lg:col-span-1 border-t border-border pt-8 mt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0 lg:mt-0">
            {(entry.fields as any)?.relatedEntries && (entry.fields as any).relatedEntries.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Related Entries</h3>
                <ul className="space-y-4">
                  {(entry.fields as any).relatedEntries.map((related: Entry<JournalEntrySkeleton>) => {
                    const relEntryFields = related.fields;
                    if (!relEntryFields) return null;
                    return (
                      <li key={related.sys.id}>
                        {(relEntryFields as any).date && <span className="text-xs text-muted-foreground block mb-0.5 font-mono">{new Date((relEntryFields as any).date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'})}</span>}
                        <Link 
                          href={`/journal/${(relEntryFields as any).slug}`} 
                          variant="subtle"
                          className="font-medium"
                        >
                          {String((relEntryFields as any).title)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            
            {(entry.fields as any)?.tags && (entry.fields as any).tags.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {(entry.fields as any).tags.map((tag: string) => (
                     <Link 
                      href={`/journal/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} 
                      variant="tag"
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

        {(adjacentEntries.prev || adjacentEntries.next) && (
            <AdjacentNavigation 
                prevItem={adjacentEntries.prev}
                nextItem={adjacentEntries.next}
                prevLabel="Previous Entry"
                nextLabel="Next Entry"
            />
        )}
      </Container>
    </Layout>
  );
};

export default JournalEntry; 