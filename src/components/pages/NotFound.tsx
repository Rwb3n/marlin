import React from 'react';
import Layout from '../layout/Layout'; // Assuming .tsx
import Container from '../layout/Container'; // Assuming .tsx
import Heading from '../ui/Heading'; // Assuming .tsx
import NotFoundComponent from '../ui/NotFoundComponent'; 

/**
 * NotFound Page (TypeScript Version)
 * 
 * Displayed for non-existent routes. Renders NotFoundComponent directly.
 */
const NotFound: React.FC = () => {
  return (
    <Layout pageTitle="404: Page Not Found">
      <title>404: Page Not Found | BLUE MARLIN OS</title>
      <meta name="description" content="The page you requested could not be found." />

      <Container className="py-16 text-center">
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