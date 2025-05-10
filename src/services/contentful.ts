import * as contentful from 'contentful';
import type { Asset, Entry, EntryFields, EntriesQueries, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// --- Type Definitions ---

// Project Skeleton Type (using EntrySkeletonType)
export type ProjectSkeleton = EntrySkeletonType<{
  contentTypeId: 'project',
  fields: {
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    category?: EntryFields.Symbol[];
    year?: EntryFields.Integer;
    type?: EntryFields.Symbol;
    scope?: EntryFields.Symbol;
    timeline?: EntryFields.Symbol;
    heroImage?: Asset;
    overview?: EntryFields.Text;
    technical?: Document;
    interface?: Document;
    results?: Document;
    status?: EntryFields.Symbol;
    isFeatured?: EntryFields.Boolean;
    relatedProjects?: Entry<EntrySkeletonType>[]; // Keep generic for now, or define a minimal related skeleton if needed
  }
}>;

// Journal Entry Skeleton Type (using EntrySkeletonType)
export type JournalEntrySkeleton = EntrySkeletonType<{
  contentTypeId: 'journalEntry',
  fields: {
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    date?: EntryFields.Date;
    content?: Document;
    excerpt?: EntryFields.Text;
    tags?: EntryFields.Symbol[];
    relatedEntries?: Entry<EntrySkeletonType>[]; // Keep generic for now
  }
}>;

// --- Contentful Client Initialization ---

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const previewToken = import.meta.env.VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN;
const deliveryToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !deliveryToken || !previewToken) {
  throw new Error(
    'Contentful environment variables are not properly set. Ensure VITE_CONTENTFUL_SPACE_ID, VITE_CONTENTFUL_ACCESS_TOKEN, and VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN are defined.'
  );
}

// Determine API and token based on environment
// VITE_VERCEL_ENV is 'production', 'preview', or 'development' (for `vercel dev`)
// import.meta.env.MODE is Vite's mode ('production' or 'development')
const usePreviewApi =
  import.meta.env.VITE_VERCEL_ENV === 'preview' ||
  import.meta.env.VITE_VERCEL_ENV === 'development' || // covers `vercel dev`
  (import.meta.env.MODE === 'development' && !import.meta.env.VITE_VERCEL_ENV); // covers local `npm run dev`

const accessToken = usePreviewApi ? previewToken : deliveryToken;
const host = usePreviewApi ? 'preview.contentful.com' : 'cdn.contentful.com';

console.log(`Contentful client initialized with host: ${host}`); // For debugging

export const contentfulClient = contentful.createClient({
  space: spaceId,
  accessToken: accessToken,
  host: host,
});

// --- Fetch Functions ---

// Helper to extract fields and sys from an entry
// function parseContentfulEntry<T extends Entry<any>>(entry: T): T['fields'] & { id: string; updatedAt: string; createdAt: string } {
//   return {
//     id: entry.sys.id,
//     ...entry.fields,
//     updatedAt: entry.sys.updatedAt,
//     createdAt: entry.sys.createdAt,
//   };
// }


// Fetch All Projects
export async function fetchProjects(query?: any): Promise<Entry<ProjectSkeleton>[]> {
  try {
    const defaultQuery = {
      content_type: 'project',
      order: ['-fields.year', 'fields.title'],
    };
    const combinedQuery = { ...defaultQuery, ...query };

    const entries = await contentfulClient.getEntries<ProjectSkeleton>(combinedQuery);
    return entries.items;
  } catch (error) {
    console.error('Error fetching projects from Contentful:', error);
    return [];
  }
}

// Fetch a Single Project by Slug
export async function fetchProjectBySlug(slug: string): Promise<Entry<ProjectSkeleton> | null> {
  try {
    const query = {
      content_type: 'project',
      'fields.slug': slug,
      limit: 1,
    };
    const entries = await contentfulClient.getEntries<ProjectSkeleton>(query as any); // Cast to any to bypass strict type check for now
    if (entries.items.length > 0) {
      return entries.items[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug} from Contentful:`, error);
    return null;
  }
}

// Fetch Project Navigation List (Lightweight)
export async function fetchProjectNavigationList(): Promise<Pick<Entry<ProjectSkeleton>, 'sys' | 'fields'>[]> {
  try {
    const query = {
      content_type: 'project',
      select: ['sys.id', 'fields.slug', 'fields.title', 'fields.year'] as const,
      order: ['-fields.year', 'fields.title'],
    };
    const entries = await contentfulClient.getEntries<ProjectSkeleton>(query as any); // Cast to any
    return entries.items.map(item => ({ sys: item.sys, fields: item.fields }));
  } catch (error) {
    console.error('Error fetching project navigation list from Contentful:', error);
    return [];
  }
}

// Fetch All Journal Entries
export async function fetchJournalEntries(query?: any): Promise<Entry<JournalEntrySkeleton>[]> {
  try {
    const defaultQuery = {
      content_type: 'journalEntry',
      order: ['-fields.date'], // Standard Contentful order syntax
    };
    const combinedQuery = { ...defaultQuery, ...query };
    // If strict EntriesQueries<JournalEntrySkeleton['fields'], undefined> causes issues for query parameter,
    // we might need to cast combinedQuery to 'any' similar to fetchProjectBySlug if linter errors appear.
    const entries = await contentfulClient.getEntries<JournalEntrySkeleton>(combinedQuery as any);
    return entries.items;
  } catch (error) {
    console.error('Error fetching journal entries from Contentful:', error);
    return [];
  }
}

// Fetch a Single Journal Entry by Slug
export async function fetchJournalEntryBySlug(slug: string): Promise<Entry<JournalEntrySkeleton> | null> {
  try {
    const query = {
      content_type: 'journalEntry',
      'fields.slug': slug, // Standard Contentful field query syntax
      limit: 1,
    };
    // Cast to any to bypass strict type check for now, similar to fetchProjectBySlug
    const entries = await contentfulClient.getEntries<JournalEntrySkeleton>(query as any);
    if (entries.items.length > 0) {
      return entries.items[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching journal entry with slug ${slug} from Contentful:`, error);
    return null;
  }
}

// Fetch Journal Navigation List (Lightweight)
export async function fetchJournalNavigationList(): Promise<Pick<Entry<JournalEntrySkeleton>, 'sys' | 'fields'>[]> {
  try {
    const query = {
      content_type: 'journalEntry',
      select: ['sys.id', 'fields.slug', 'fields.title', 'fields.date'] as const,
      order: ['-fields.date'],
    };
    const entries = await contentfulClient.getEntries<JournalEntrySkeleton>(query as any); // Cast to any
    return entries.items.map(item => ({ sys: item.sys, fields: item.fields }));
  } catch (error) {
    console.error('Error fetching journal navigation list from Contentful:', error);
    return [];
  }
} 