import { createBrowserRouter, RouteObject } from 'react-router-dom';
import React, { LazyExoticComponent } from 'react';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ErrorDisplay from './components/ui/ErrorDisplay';
import Layout from './components/layout/Layout';

/**
 * Application Router Configuration
 * 
 * Defines all application routes using React Router's createBrowserRouter.
 * Routes are lazily loaded when needed to improve initial load performance.
 * Each route points to a page component in the pages directory.
 * Error handling is implemented with ErrorBoundary and ErrorDisplay components.
 */

// Import page components with lazy loading
const HomePage = React.lazy(() => import('./components/pages/HomePage'));
const ProjectDetail = React.lazy(() => import('./components/pages/ProjectDetail'));
const JournalEntry = React.lazy(() => import('./components/pages/JournalEntry'));
// const Collection = React.lazy(() => import('./components/pages/Collection')); // Removing potentially incorrect/unused Collection import
const NotFound = React.lazy(() => import('./components/pages/NotFound'));
const ProjectCollectionPage = React.lazy(() => import('./components/pages/ProjectCollectionPage'));
const JournalCollectionPage = React.lazy(() => import('./components/pages/JournalCollectionPage'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="loading-state" style={{ padding: '3rem', textAlign: 'center' }}>
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
    </div>
  </div>
);

// Router error component
const RouterError: React.FC = () => (
  <Layout>
    <div className="container mx-auto py-12 px-4">
      <ErrorDisplay
        title="Navigation Error"
        message="We couldn't find the page you're looking for or encountered an error while loading it."
        severity="error"
        backLink="/"
        backLabel="Return to Homepage"
      />
    </div>
  </Layout>
);

// Wrap component with error boundary and suspense
// Use generic type for the Component argument
const withErrorBoundary = (
  Component: LazyExoticComponent<React.FC<any>> | React.FC<any>, // Accept lazy or regular components
  backLink: string = "/"
): React.ReactElement => (
  <ErrorBoundary backLink={backLink}>
    <React.Suspense fallback={<LoadingFallback />}>
      <Component />
    </React.Suspense>
  </ErrorBoundary>
);

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: withErrorBoundary(HomePage),
    errorElement: <RouterError />,
  },
  {
    path: '/projects/:projectId',
    element: withErrorBoundary(ProjectDetail, "/projects"),
    errorElement: <RouterError />,
  },
  {
    path: '/journal/:entryId',
    element: withErrorBoundary(JournalEntry, "/journal"),
    errorElement: <RouterError />,
  },
  // Remove or update the route using the generic Collection component if it doesn't exist
  // {
  //   path: '/collections/:collectionId',
  //   element: withErrorBoundary(Collection, "/"),
  //   errorElement: <RouterError />,
  // },
  {
    path: '/journal/tag/:tagId',
    element: withErrorBoundary(JournalEntry, "/journal"),
    errorElement: <RouterError />,
  },
  {
    path: '/projects',
    element: withErrorBoundary(ProjectCollectionPage, "/"),
    errorElement: <RouterError />,
  },
  {
    path: '/journal',
    element: withErrorBoundary(JournalCollectionPage, "/"),
    errorElement: <RouterError />,
  },
  {
    path: '*',
    element: withErrorBoundary(NotFound),
    errorElement: <RouterError />,
  }
] as RouteObject[]); // Add type assertion for the array

export default router; 