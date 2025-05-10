import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Container from '../layout/Container';
import Heading from './Heading';
import Text from './Text';
import Button from './Button';
import Link from './Link';

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
}) => {
  const navigate = useNavigate();

  console.log('NotFoundComponent received message:', message);

  const Icon = () => (
    <svg className="w-16 h-16 mb-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <Layout pageTitle={title}>
      <Container>
        <div className="not-found-container text-center flex flex-col items-center py-12 md:py-20">
          <Icon /> 
          <Heading level={2} className="mb-4 text-2xl md:text-3xl font-bold">
            {title}
          </Heading>
          {message && (
            <Text 
              size="lg"
              color="muted"
              className="mb-8 max-w-md mx-auto" 
            >
              {message}
            </Text>
          )}
          {linkHref && linkText && (
            <Button 
              variant="primary" 
              className="mb-12"
              onClick={() => navigate(linkHref)}
            >
              {linkText} 
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default NotFoundComponent; 