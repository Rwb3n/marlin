import React from 'react';
// import { Helmet } from 'react-helmet-async'; // Removed
import Layout from '../layout/Layout'; // Assuming .tsx
import Container from '../layout/Container'; // Assuming .tsx
import Heading from '../ui/Heading'; // Assuming .tsx
// Removed Layout import as NotFoundComponent will handle it
// Removed Container import
import NotFoundComponent from '../ui/NotFoundComponent'; 

/**
 * NotFound Page (TypeScript Version)
 * 
 * Displayed for non-existent routes. Renders NotFoundComponent directly.
 */
const NotFound: React.FC = () => {
  return (
    <Layout pageTitle="404: Page Not Found">
      {/* Metadata tags rendered directly */}
      <title>404: Page Not Found | BLUE MARLIN OS</title>
      <meta name="description" content="The page you requested could not be found." />
      {/* End of metadata tags */}

      <Container className="py-16 text-center">
      {/* Render NotFoundComponent directly. It should include Layout. */}
      <NotFoundComponent 
        title="Page Not Found" 
        message="Oops! The page you're looking for doesn't seem to exist or may have been moved."
        linkHref="/" // Link back to Home
        linkText="Return to Home"
        suggestionType="general" 
      />
      </Container>
    </Layout>
  );
};

export default NotFound; 