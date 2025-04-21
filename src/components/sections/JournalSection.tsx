/**
 * JournalSection Component for BLUE MARLIN OS
 * 
 * Displays a grid of journal entries with an optional "view all" link.
 * Uses the SectionHeader component for consistent heading styling.
 */

import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import Grid from '../layout/Grid';
import JournalCard from '../cards/JournalCard';
import SectionHeader from '../ui/SectionHeader';
import clsx from 'clsx';

// Define the JournalEntry interface
export interface JournalEntry {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
}

interface JournalSectionProps {
  /**
   * Title configuration with optional accent word
   */
  title?: { text: string; accent?: string };
  
  /**
   * Array of journal entry objects to display
   */
  entries: JournalEntry[];
  
  /**
   * Maximum number of entries to show
   */
  limit?: number;
  
  /**
   * Number of columns at different breakpoints
   */
  columns?: { sm?: number; md?: number; lg?: number };
  
  /**
   * Text for the view all link
   */
  viewAllText?: string;
  
  /**
   * URL for the view all link
   */
  viewAllUrl?: string;
  
  /**
   * Whether to include a divider below the header
   */
  withDivider?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Journal Section Component
 * 
 * Displays a grid of journal entries with a consistent header and optional "view all" link.
 * Features:
 * - Section header with accent word styling
 * - Responsive grid layout matching legacy implementation
 * - Journal cards with date, title, excerpt and read-more link
 * - Optional section divider
 * - "View all" link at the bottom
 */
export function JournalSection({
  title = { text: "JOURNAL", accent: "RECENT" },
  entries = [],
  limit = 3,
  columns = { sm: 1, md: 2, lg: 3 },
  viewAllText = "VIEW ALL JOURNAL ENTRIES",
  viewAllUrl = "/journal",
  withDivider = true,
  className = "",
}: JournalSectionProps) {
  // Limit the number of entries to display
  const displayEntries = entries.slice(0, limit);
  
  // Determine the title and accent parts
  const fullTitle = title.accent ? `${title.accent} ${title.text}` : title.text;
  
  return (
    <Section className={clsx("journal-section py-12", className)} id="journal">
      <Container>
        {/* Section Header */}
        <SectionHeader
          title={fullTitle}
          accentWord={title.accent}
          centered={true}
          withDivider={withDivider}
          spacing="large"
        />
        
        {/* Journal Entries Grid */}
        <Grid 
          columns={columns}
          gap="large"
          className="journal-grid"
        >
          {displayEntries.map(entry => (
            <JournalCard
              key={entry.id}
              title={entry.title}
              excerpt={entry.excerpt}
              date={entry.date}
              href={entry.url || `/journal/${entry.id}`}
            />
          ))}
          
          {/* Empty state if no entries */}
          {displayEntries.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg opacity-70">
                No journal entries found.
              </p>
            </div>
          )}
        </Grid>
        
        {/* View All Link */}
        {entries.length > limit && (
          <div className="text-center mt-10">
            <a 
              href={viewAllUrl} 
              className="inline-flex items-center justify-center text-sm font-medium uppercase tracking-wider hover:underline"
            >
              {viewAllText}
              <svg 
                className="ml-2 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </a>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default JournalSection; 