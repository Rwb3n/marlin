/**
 * Project Data and Utility Functions (TypeScript Version)
 * 
 * This file provides sample project data and utility functions for retrieving projects.
 * In a production environment, this would be replaced with data from an API or CMS.
 */

// Import placeholder images from the assets folder
// Assuming these images are handled correctly by the build process (e.g., Vite)
import placeholder16x9 from '../assets/placeholder_16x9.png';
import placeholder4x3 from '../assets/placeholder_4x3.png';
import placeholder3x2 from '../assets/placeholder_3x2.png';
import placeholder1x1 from '../assets/placeholder_1x1.png';

// --- Enums ---

export enum ProjectStatus {
  ACTIVE = 'Active',
  ARCHIVED = 'Archived',
  FIELD_TESTING = 'Field Testing',
  DEPLOYED = 'Deployed',
  OPERATIONAL_PILOT = 'Operational Pilot',
  DEVELOPMENT = 'Development',
  CONCEPT = 'Concept',
}

// --- Type Definitions ---

// Interface for individual specification items
interface Spec {
  label: string;
  value: string | ProjectStatus; // Allow ProjectStatus as a value type
}

// Interface for items listed in technical/interface sections
interface SectionListItem {
  title: string;
  description: string;
}

// Interface for the technical or interface data sections
interface ProjectSection {
  content: string;
  list: SectionListItem[];
  image?: string; // Make image optional as it might not always be present
  images?: string[]; // Optional array of images for interface section
}

// Interface for related project links
export interface RelatedProjectSummary {
  id: string;
  title: string;
  image: string; // Assuming image is always present for related projects
  intro?: string; // Make intro optional or ensure it's always provided by getRelatedProjects
}

// Main interface describing the structure of a project object
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  heroImage: string;
  intro: string;
  specs: Spec[];
  overview: string;
  technical: ProjectSection;
  interface: ProjectSection;
  results: string;
  relatedProjects: RelatedProjectSummary[];
}

// --- Sample Project Data (Typed) ---

export const projects: Project[] = [
  {
    id: 'autonomous-mapping-vehicle',
    title: 'Autonomous Mapping Vehicle',
    category: 'EXPLORATION SYSTEMS',
    year: '2025',
    heroImage: placeholder16x9,
    intro: 'Advanced seafloor mapping system using ML-enhanced sonar interpretation for high-resolution terrain modeling in near-zero visibility conditions.',
    specs: [
      { label: 'Depth Rating', value: '2,500m' },
      { label: 'Deployment', value: ProjectStatus.ACTIVE },
      { label: 'Status', value: ProjectStatus.FIELD_TESTING }
    ],
    overview: 'The Autonomous Mapping Vehicle (AMV) represents the latest in BLUE MARLIN OS applications, designed to create high-resolution seafloor maps in environments where traditional mapping techniques fail. The AMV operates at depths up to 2,500 meters and can function in total darkness, turbid waters, and varied terrain types. Using an advanced neural network trained on millions of sonar readings, the AMV can identify, classify, and map geological features with precision that exceeds human capabilities. The system\'s multi-beam sensors work in conjunction with its ML processing unit to build accurate 3D models even in challenging conditions.',
    technical: {
      content: 'The AMV system integrates several BLUE MARLIN OS core modules to achieve its mapping capabilities:',
      list: [
        { title: 'Acoustic Sensor Array', description: 'Multi-frequency sonar system with 360° coverage and variable resolution modes' },
        { title: 'ML Processing Unit', description: 'Real-time feature recognition and classification system' },
        { title: 'Autonomous Navigation', description: 'Terrain-relative positioning that functions without GPS' },
        { title: 'Data Compression', description: 'Efficient storage of massive point-cloud datasets' }
      ],
      image: placeholder4x3
    },
    interface: {
      images: [
        placeholder4x3,
        placeholder4x3
      ],
      content: 'The AMV control system uses BLUE MARLIN OS\'s phase-adaptive interface, automatically adjusting contrast and information density based on operator depth and ambient conditions. The system provides multiple control modes:',
      list: [
        { title: 'Direct Control', description: 'Real-time operator guidance with haptic feedback' },
        { title: 'Mission Planning', description: 'Pre-programmed survey patterns with terrain adaptation' },
        { title: 'Autonomous Mode', description: 'AI-driven exploration with objective-based decision making' }
      ]
    },
    results: 'The AMV has successfully mapped over 50 square kilometers of deep ocean floor, revealing previously unknown geological formations and hydrothermal vent systems. Data collected by the AMV is being used by research institutions worldwide to study underwater volcanology, plate tectonics, and marine habitat distribution. The system\'s high precision and efficiency have reduced mapping costs by 65% compared to traditional methods, while increasing data resolution by an order of magnitude.',
    relatedProjects: [
      {
        id: 'hydrothermal-research-platform',
        title: 'Hydrothermal Research Platform',
        image: placeholder16x9
      },
      {
        id: 'abyssal-communication-network',
        title: 'Abyssal Communication Network',
        image: placeholder16x9
      }
    ]
  },
  {
    id: 'hydrothermal-research-platform',
    title: 'Hydrothermal Research Platform',
    category: 'RESEARCH EQUIPMENT',
    year: '2024',
    heroImage: placeholder16x9,
    intro: 'Monitoring tools for extreme temperature environments near underwater vents, capable of withstanding caustic conditions and collecting long-term data sets.',
    specs: [
      { label: 'Depth Rating', value: '3,800m' },
      { label: 'Temperature', value: 'Up to 450°C' },
      { label: 'Status', value: ProjectStatus.DEPLOYED }
    ],
    overview: 'The Hydrothermal Research Platform (HRP) is a stationary monitoring system designed to withstand the extreme conditions found near deep-sea hydrothermal vents. Using specialized heat-resistant alloys and advanced insulation systems, the HRP can operate continuously in environments where temperatures reach 450°C and pH levels fluctuate dramatically. The system collects comprehensive data on vent chemistry, microbial activity, and geological processes, transmitting information to surface vessels via acoustic networking.',
    technical: {
      content: 'The HRP employs several breakthrough technologies to survive and operate in extreme hydrothermal environments:',
      list: [
        { title: 'Ceramic-Titanium Composite Shell', description: 'Multi-layered protection system with active cooling channels' },
        { title: 'Chemical Sampling Array', description: 'Automated collection and analysis of vent fluids for real-time chemistry monitoring' },
        { title: 'Thermal Imaging System', description: 'High-resolution temperature mapping with microsecond response time' },
        { title: 'Biological Sample Preservation', description: 'Cryogenic storage of biological specimens for later retrieval and analysis' }
      ],
      image: placeholder4x3
    },
    interface: {
      images: [
        placeholder4x3,
        placeholder4x3
      ],
      content: 'The HRP is monitored and controlled through BLUE MARLIN OS\'s research console, which provides:',
      list: [
        { title: 'Real-time Data Visualization', description: 'Interactive displays of thermal, chemical, and biological metrics' },
        { title: 'Sampling Control', description: 'Remote triggering of sample collection based on event detection' },
        { title: 'System Health Monitoring', description: 'Continuous assessment of platform integrity and remaining operational lifetime' }
      ]
    },
    results: 'Since deployment, the HRP has revolutionized hydrothermal vent research by providing continuous data streams rather than the brief snapshots previously available from submersible visits. Research enabled by the platform has led to the discovery of seven new extremophile species and improved understanding of how these unique ecosystems function. The platform\'s technology is now being adapted for potential use in exploring liquid environments on other planetary bodies.',
    relatedProjects: [
      {
        id: 'autonomous-mapping-vehicle',
        title: 'Autonomous Mapping Vehicle',
        image: placeholder16x9
      },
      {
        id: 'pressure-adaptive-interface',
        title: 'Pressure-Adaptive Interface',
        image: placeholder16x9
      }
    ]
  },
  {
    id: 'abyssal-communication-network',
    title: 'Abyssal Communication Network',
    category: 'INFRASTRUCTURE',
    year: '2023',
    heroImage: placeholder16x9,
    intro: 'High-bandwidth, low-latency communication system utilizing neutrino beams for deep-sea data transmission, overcoming limitations of acoustic methods.',
    specs: [
      { label: 'Range', value: 'Trans-oceanic' },
      { label: 'Bandwidth', value: '10 Gbps' },
      { label: 'Status', value: ProjectStatus.OPERATIONAL_PILOT }
    ],
    overview: 'The Abyssal Communication Network (ACN) addresses the critical bottleneck of data transmission from deep-sea installations. Traditional acoustic modems suffer from low bandwidth and high latency. The ACN leverages modulated neutrino beams, capable of penetrating vast distances of water and rock with minimal attenuation, to establish a near-real-time communication link between benthic nodes and surface or orbital relays.',
    technical: {
      content: 'The ACN relies on novel physics and engineering:',
      list: [
        { title: 'Neutrino Modulator', description: 'Device capable of encoding data onto a focused neutrino beam.' },
        { title: 'Deep-Sea Detector Array', description: 'Highly sensitive detectors optimized for neutrino interaction events.' },
        { title: 'Error Correction Protocol', description: 'Advanced algorithms to handle the probabilistic nature of neutrino detection.' },
        { title: 'Beam Steering System', description: 'Precision targeting for maintaining link stability despite geological shifts.' }
      ],
      image: placeholder4x3
    },
    interface: {
      images: [
        placeholder4x3,
        placeholder4x3
      ],
      content: 'Network management and monitoring are handled via BLUE MARLIN OS, providing:',
      list: [
        { title: 'Link Status Monitoring', description: 'Real-time visualization of connection quality and data throughput.' },
        { title: 'Node Management', description: 'Configuration and diagnostics for individual communication nodes.' },
        { title: 'Bandwidth Allocation', description: 'Prioritization of data streams based on mission requirements.' }
      ]
    },
    results: 'The pilot ACN has successfully linked research stations across the Mariana Trench, enabling unprecedented data transfer rates from the deepest parts of the ocean. This facilitates remote operation of complex equipment and real-time analysis of high-resolution sensor data, accelerating deep-sea research efforts.',
    relatedProjects: [
      {
        id: 'autonomous-mapping-vehicle',
        title: 'Autonomous Mapping Vehicle',
        image: placeholder16x9
      },
      {
        id: 'hydrothermal-research-platform',
        title: 'Hydrothermal Research Platform',
        image: placeholder16x9
      }
    ]
  },
  {
    id: 'pressure-adaptive-interface',
    title: 'Pressure-Adaptive Interface',
    category: 'HUMAN-MACHINE INTERFACE',
    year: '2024',
    heroImage: placeholder16x9,
    intro: 'UI system that dynamically adjusts information density and interaction models based on ambient pressure and operator cognitive load.',
    specs: [
      { label: 'Control Depth', value: 'Real-time' },
      { label: 'Latency', value: '< 10ms' },
      { label: 'Status', value: ProjectStatus.ACTIVE }
    ],
    overview: 'Operating complex machinery in high-pressure deep-sea environments poses unique challenges to human operators. The Pressure-Adaptive Interface (PAI) integrated into BLUE MARLIN OS dynamically modifies the user interface based on sensor readings of ambient pressure and biometric data indicating operator stress or fatigue. As pressure increases, non-critical information is automatically de-emphasized, interaction targets become larger, and control schemes may simplify to reduce cognitive load.',
    technical: {
      content: 'PAI functionality relies on tight integration between sensors and the UI rendering engine:',
      list: [
        { title: 'Cognitive Load Sensor Fusion', description: 'Combines eye-tracking, galvanic skin response, and heart rate variability to estimate operator state.' },
        { title: 'Dynamic Layout Engine', description: 'Algorithmically adjusts component visibility, size, and position.' },
        { title: 'Contextual Information Filtering', description: 'Prioritizes data display based on current task and environmental parameters.' },
        { title: 'Adaptive Input Mapping', description: 'Modifies control sensitivity and input methods (e.g., voice vs. haptic) based on conditions.' }
      ],
      image: placeholder4x3
    },
    interface: {
      images: [
        placeholder4x3,
        placeholder4x3
      ],
      content: 'The PAI settings are configurable within BLUE MARLIN OS:',
      list: [
        { title: 'Sensitivity Tuning', description: 'Operators can adjust how aggressively the interface adapts.' },
        { title: 'Profile Management', description: 'Different adaptation profiles can be saved for various tasks or operators.' },
        { title: 'Manual Override', description: 'Full manual control over the interface layout is always available.' }
      ]
    },
    results: 'Simulation testing and initial field trials indicate that PAI can reduce critical operator errors by up to 30% during high-stress, high-pressure scenarios. It enhances situational awareness by ensuring the most relevant information is always prominent, contributing to safer and more effective deep-sea operations.',
    relatedProjects: [
      {
        id: 'hydrothermal-research-platform',
        title: 'Hydrothermal Research Platform',
        image: placeholder16x9
      },
      {
        id: 'autonomous-mapping-vehicle',
        title: 'Autonomous Mapping Vehicle',
        image: placeholder16x9
      }
    ]
  }
  // Additional projects can be added here
];

// --- Utility Functions (Typed) ---

/**
 * Retrieves a project by its ID
 * @param {string} id - The project ID to search for
 * @returns {Project|null} The project object or null if not found
 */
export const getProjectById = (id: string): Project | null => {
  if (!id) {
    console.error('Invalid project ID: ', id);
    return null;
  }
  try {
    const project = projects.find(p => p.id === id);
    if (!project) {
      console.error(`Project with ID '${id}' not found`);
      return null;
    }
    return project;
  } catch (error) {
    console.error('Error retrieving project:', error);
    return null;
  }
};

/**
 * Retrieves all project summaries (id, title, category, intro, heroImage)
 * @returns {Array<Partial<Project>>} Array of project summary objects
 */
export const getAllProjects = (): Pick<Project, 'id' | 'title' | 'category' | 'intro' | 'heroImage'>[] => {
  try {
    return projects.map(({ id, title, category, intro, heroImage }) => ({
      id,
      title,
      category,
      intro,
      heroImage,
    }));
  } catch (error) {
    console.error('Error retrieving all projects:', error);
    return [];
  }
};

/**
 * Retrieves related project summaries for a given project ID
 * This function looks at the 'relatedProjects' field defined *within* the project data.
 * @param {string} currentProjectId - The ID of the project to find related projects for
 * @returns {Array<RelatedProjectSummary>} Array of related project summary objects
 */
export const getRelatedProjects = (currentProjectId: string): RelatedProjectSummary[] => {
  try {
    const currentProject = projects.find(p => p.id === currentProjectId);
    if (!currentProject || !currentProject.relatedProjects) {
      return [];
    }
    // Ensure the related projects actually exist in the main projects list
    return currentProject.relatedProjects
      .map(related => projects.find(p => p.id === related.id))
      .filter((p): p is Project => !!p) // Type guard to filter out undefined
      .map(({ id, title, heroImage }) => ({ id, title, image: heroImage })); // Map to summary format
  } catch (error) {
    console.error(`Error retrieving related projects for ID '${currentProjectId}':`, error);
    return [];
  }
};

// Define a simple type for the adjacent project summary
type AdjacentProjectSummary = { id: string; title: string } | null;

/**
 * Retrieves the chronologically adjacent projects (previous/next) for a given project ID
 * based on the order in the main 'projects' array.
 * @param {string} currentProjectId - The ID of the current project.
 * @returns {{ prev: AdjacentProjectSummary, next: AdjacentProjectSummary }} Object containing prev/next project summaries or null.
 */
export const getAdjacentProjects = (currentProjectId: string): { prev: AdjacentProjectSummary, next: AdjacentProjectSummary } => {
  const result: { prev: AdjacentProjectSummary, next: AdjacentProjectSummary } = { prev: null, next: null };

  if (!currentProjectId) {
    console.error('getAdjacentProjects: Invalid currentProjectId provided.');
    return result;
  }
  
  try {
    const currentIndex = projects.findIndex(p => p.id === currentProjectId);

    if (currentIndex === -1) {
      console.warn(`getAdjacentProjects: Project with ID '${currentProjectId}' not found in the main list.`);
      return result;
    }

    // Get previous project
    if (currentIndex > 0) {
      const prevProject = projects[currentIndex - 1];
      result.prev = { id: prevProject.id, title: prevProject.title };
    }

    // Get next project
    if (currentIndex < projects.length - 1) {
      const nextProject = projects[currentIndex + 1];
      result.next = { id: nextProject.id, title: nextProject.title };
    }

    return result;

  } catch (error) {
    console.error(`Error retrieving adjacent projects for ID '${currentProjectId}':`, error);
    return { prev: null, next: null }; // Return empty on error
  }
}; 