import { ProjectStatus } from './projectsData';

// Import images - assuming you have a declaration file (e.g., image.d.ts) for image imports
import projectAImage from '../assets/images/projects/project-a-cover.jpg';
import projectBImage from '../assets/images/projects/project-b-cover.jpg';
import projectCImage from '../assets/images/projects/project-c-cover.jpg';

interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string; // Path to the image
  status: ProjectStatus;
}

interface JournalEntryData {
  id: string;
  title: string;
  date: string; // Consider using Date type if more manipulation is needed
  excerpt: string;
  url: string;
}

const projectsData: ProjectData[] = [
  {
    id: 'theseus-platform',
    title: 'Theseus Platform',
    category: 'Web Application',
    description: 'A comprehensive platform for managing design systems and component libraries.',
    image: projectAImage,
    status: ProjectStatus.DEPLOYED,
  },
  {
    id: 'sentinel-dashboard',
    title: 'Sentinel Dashboard',
    category: 'Data Visualization',
    description: 'Real-time monitoring dashboard for security operations centers.',
    image: projectBImage,
    status: ProjectStatus.DEVELOPMENT,
  },
  {
    id: 'nomad-travel-app',
    title: 'Nomad Travel App',
    category: 'Mobile Application',
    description: 'A mobile app designed for planning and tracking travel itineraries.',
    image: projectCImage,
    status: ProjectStatus.CONCEPT,
  },
];

const recentJournalEntries: JournalEntryData[] = [
  {
    id: 'component-testing-strategies',
    title: 'Advanced Component Testing Strategies',
    date: '2024-07-15',
    excerpt: 'Exploring effective techniques for unit, integration, and end-to-end testing in component-based architectures.',
    url: '/journal/component-testing-strategies',
  },
  {
    id: 'design-system-governance',
    title: 'Establishing Design System Governance',
    date: '2024-06-28',
    excerpt: 'Best practices for maintaining consistency and managing contributions within a growing design system.',
    url: '/journal/design-system-governance',
  },
  {
    id: 'state-management-react-2024',
    title: 'State Management in React: 2024 Edition',
    date: '2024-06-10',
    excerpt: 'A review of modern state management libraries and patterns for complex React applications.',
    url: '/journal/state-management-react-2024',
  },
];

const homeData = {
  projectsData,
  recentJournalEntries,
};

export type { ProjectData, JournalEntryData };
export default homeData; 