import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Layout from '../layout/Layout';
import Container from '../layout/Container';
import Heading from './Heading'; // Assuming Heading component exists
import Text from './Text';       // Assuming Text/Paragraph component exists
import Button from './Button';     // Assuming Button component exists
import Link from './Link';       // Assuming Link component exists

// Import data functions - adjust paths as needed
import { getAllJournalEntries } from '../../data/journalData'; 
import { getAllProjects } from '../../data/projectsData';

/**
 * NotFoundComponent
 * 
 * Displays a user-friendly message for "Not Found" or error states,
 * optionally showing suggestions for related content.
 */
const NotFoundComponent = ({
  title,
  message,
  linkHref,
  linkText,
  suggestionType, // 'journal' or 'project'
  suggestionLimit = 3,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const navigate = useNavigate(); // Get navigate function

  // --- Add console log for debugging message prop ---
  console.log('NotFoundComponent received message:', message);

  useEffect(() => {
    if (!suggestionType) return; // Don't fetch if no type specified

    let fetchFunc;
    if (suggestionType === 'journal') {
      fetchFunc = getAllJournalEntries;
    } else if (suggestionType === 'project') {
      fetchFunc = getAllProjects;
    } else {
      return; // Invalid suggestion type
    }

    const loadSuggestions = async () => {
      setLoadingSuggestions(true);
      try {
        const allItems = await fetchFunc(); // Assuming data functions might be async in future
        // Ensure items have needed properties for display
        const formattedSuggestions = allItems
          .slice(0, suggestionLimit)
          .map(item => ({ 
            id: item.id,
            title: item.title,
            // Include date and excerpt if available (for styling consistency)
            date: item.date, 
            excerpt: item.excerpt,
            href: item.url || item.href || (suggestionType === 'journal' ? `/journal/${item.id}` : `/projects/${item.id}`)
          }));
        setSuggestions(formattedSuggestions);
      } catch (error) {
        console.error(`Error loading ${suggestionType} suggestions:`, error);
        setSuggestions([]); // Clear suggestions on error
      } finally {
        setLoadingSuggestions(false);
      }
    };

    loadSuggestions();

  }, [suggestionType, suggestionLimit]);

  // Basic Icon (replace with a proper SVG icon component if available)
  const Icon = () => (
    <svg className="w-16 h-16 mb-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <Layout pageTitle={title}> {/* Use title for page title as well */}
      <Container>
        <div className="not-found-container text-center flex flex-col items-center py-12 md:py-20">
          {/* Optional Icon */}
          <Icon /> 

          {/* Title - Ensure only Heading is used */}
          <Heading level={2} className="mb-4 text-2xl md:text-3xl font-bold">
            {title}
          </Heading>

          {/* Message - Corrected display logic check */}
          {message && (
            <Text 
              // Use props for text styling 
              size="lg" // Set desired size (base or lg)
              color="muted" // Use muted color for less emphasis
              // Keep layout/structural classes in className
              className="mb-8 max-w-md mx-auto" 
            >
              {message}
            </Text>
          )}

          {/* Primary Action Button - Refactored to use onClick + navigate */} 
          {linkHref && linkText && (
            <Button 
              variant="primary" 
              className="mb-12"
              onClick={() => navigate(linkHref)} // Use onClick handler
            >
              {linkText} 
            </Button>
          )}

          {/* Suggestions Section */}
          {suggestionType && (
            <div className="w-full max-w-lg border-t border-gray-200 dark:border-gray-700 pt-8">
              {loadingSuggestions ? (
                <Text className="text-sm text-gray-500">Loading suggestions...</Text>
              ) : suggestions.length > 0 ? (
                <>
                  <Heading level={4} className="mb-4 text-lg font-semibold">
                    Maybe you were looking for:
                  </Heading>
                  {/* Use structure similar to JournalEntry sidebar */}
                  <div className="entry-list space-y-4 text-left"> {/* Added entry-list class */}
                    {suggestions.map((suggestion) => (
                      <div key={suggestion.id} className="entry-list-item"> {/* Mimic structure */} 
                        {suggestion.date && <div className="entry-list-meta">{suggestion.date}</div>} {/* Optional Date */}
                        <Link href={suggestion.href} className="entry-list-title hover:underline">
                          {suggestion.title}
                        </Link>
                        {suggestion.excerpt && <p className="entry-list-excerpt">{suggestion.excerpt}</p>} {/* Optional Excerpt */}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <Text className="text-sm text-gray-500">No suggestions found.</Text>
              )}
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default NotFoundComponent; 