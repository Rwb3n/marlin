/**
 * Interfaces for Journal Data
 */
interface Author {
  name: string;
  role: string;
  image: string; // Path to the image file
}

interface RelatedEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  url?: string; // Optional URL generated from ID
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string; // Format: MM.DD.YYYY
  tags: string[];
  author: Author;
  excerpt: string;
  content: string; // HTML content
  relatedEntries: RelatedEntry[];
  url?: string; // Optional URL generated from ID
}

/**
 * Sample Journal Entry Data
 */
export const journalEntries: JournalEntry[] = [
  {
    id: 'underwater-visibility-enhancements',
    title: 'Underwater Visibility Enhancements',
    date: '04.12.2025',
    tags: ['RESEARCH', 'VISUALIZATION', 'RENDERING'],
    author: {
      name: 'Dr. Eliza Chen',
      role: 'Lead UX Researcher',
      image: '/images/placeholder_80x80.png'
    },
    excerpt: 'Exploring new techniques for improving light shaft rendering and water caustics simulation without sacrificing performance...',
    content: `
      <p class="lead-paragraph">
        As we continue to refine BLUE MARLIN OS's visual rendering systems, our team has been exploring new approaches to underwater light simulation that balance visual fidelity with performance requirements.
      </p>

      <p>
        The challenges of rendering convincing underwater environments go beyond simple visual aesthetics—they directly impact operator situational awareness and decision-making capacity. Our latest research has focused on three key areas: light shaft rendering, caustics simulation, and particulate scattering.
      </p>

      <h2>Light Shaft Optimization</h2>

      <p>
        Traditional volumetric light shafts are computationally expensive, especially in real-time applications. We've developed a hybrid approach that combines precomputed light maps with dynamic ray-marching techniques that activate only when environmental conditions change significantly.
      </p>

      <p>
        This adaptive rendering approach has reduced GPU load by approximately 42% while maintaining visual quality within acceptable parameters as defined by our user research studies.
      </p>

      <h2>Caustics Simulation</h2>

      <p>
        Water caustics—the patterns of light created as rays refract through water surfaces—add considerable realism to underwater scenes but have traditionally been performance-intensive to render accurately.
      </p>

      <p>
        Our new technique uses a combination of texture projection and procedural animation, with dynamically adjusted detail levels based on:
      </p>

      <ul>
        <li>Distance from viewer</li>
        <li>Current lighting conditions</li>
        <li>System performance headroom</li>
        <li>Task criticality (reducing effects during precision operations)</li>
      </ul>

      <h2>Results and Performance Metrics</h2>

      <p>
        Initial testing shows that our optimized rendering pipeline maintains frame rates above 90fps even on mid-range hardware, while scoring 87% on our visual fidelity assessment compared to 92% for the full-quality, performance-intensive rendering.
      </p>

      <p>
        Most importantly, operator performance metrics on identification and navigation tasks showed no statistically significant difference between the optimized and full-quality rendering systems.
      </p>
    `,
    relatedEntries: [
      {
        id: 'day-night-cycle-implementation',
        title: 'Day/Night Cycle Implementation',
        date: '04.05.2025',
        excerpt: 'Created a seamless transition between phase-origin and phase-apex modes...'
      },
      {
        id: 'modular-component-architecture',
        title: 'Modular Component Architecture',
        date: '03.28.2025',
        excerpt: 'Designed a flexible component system using React...'
      }
    ]
  },
  {
    id: 'day-night-cycle-implementation',
    title: 'Day/Night Cycle Implementation',
    date: '04.05.2025',
    tags: ['DESIGN', 'UI/UX', 'THEMES'],
    author: {
      name: 'Takashi Watanabe',
      role: 'Senior Visual Designer',
      image: '/images/placeholder_80x80.png'
    },
    excerpt: 'Created a seamless transition between the phase-origin (day) and phase-apex (night) modes with animated water surface reflections...',
    content: `
      <p class="lead-paragraph">
        One of the most distinctive features of BLUE MARLIN OS is its dual interface modes: phase-origin (day) and phase-apex (night). This journal entry details our implementation of smooth transitions between these modes.
      </p>

      <p>
        The transition between day and night modes in BLUE MARLIN OS is more than a simple color palette swap. It represents a comprehensive shift in the visual environment that affects every aspect of the interface, from lighting and shadows to water surface behavior and particle effects.
      </p>

      <h2>Animated Transition System</h2>

      <p>
        We've implemented a gradual transition system that animates the change between modes over a configurable duration (default: 1200ms). This includes:
      </p>

      <ul>
        <li>Color interpolation for all UI elements</li>
        <li>Light angle and intensity adjustments</li>
        <li>Particle behavior modification</li>
        <li>Water surface reflectivity changes</li>
      </ul>

      <p>
        Rather than using a linear transition, we employed an ease-in-out cubic function that feels more natural to users based on our testing.
      </p>

      <h2>Water Surface Reflection Changes</h2>

      <p>
        Perhaps the most technically challenging aspect was creating convincing transitions in the water surface rendering. In phase-origin (day) mode, the surface is more transparent with subtle caustics, while phase-apex (night) mode features more pronounced reflections and a darker, more opaque water surface.
      </p>

      <p>
        We implemented a dynamic shader that interpolates between these states, adjusting:
      </p>

      <ul>
        <li>Fresnel reflection coefficients</li>
        <li>Surface opacity and scatter</li>
        <li>Subsurface light penetration depth</li>
        <li>Light shaft intensity and color</li>
      </ul>

      <h2>User Response</h2>

      <p>
        Initial user testing has been overwhelmingly positive, with operators reporting that the transitions help maintain context when switching modes and reduce cognitive load compared to instant switches. The subtle animation also serves as a clear indicator that a mode change has been initiated, reducing user errors.
      </p>
    `,
    relatedEntries: [
      {
        id: 'underwater-visibility-enhancements',
        title: 'Underwater Visibility Enhancements',
        date: '04.12.2025',
        excerpt: 'Exploring new techniques for improving light shaft rendering...'
      },
      {
        id: 'modular-component-architecture',
        title: 'Modular Component Architecture',
        date: '03.28.2025',
        excerpt: 'Designed a flexible component system using React...'
      }
    ]
  },
  {
    id: 'modular-component-architecture',
    title: 'Modular Component Architecture',
    date: '03.28.2025',
    tags: ['DEVELOPMENT', 'ARCHITECTURE', 'REACT'],
    author: {
      name: 'Maya Patel',
      role: 'Lead Frontend Developer',
      image: '/images/placeholder_80x80.png'
    },
    excerpt: 'Designed a flexible component system using React that allows for easy content management and dynamic rendering...',
    content: `
      <p class="lead-paragraph">
        The BLUE MARLIN OS interface is now built on a completely modular architecture, enabling unprecedented flexibility and maintainability.
      </p>

      <p>
        Our transition to a fully componentized architecture marks a significant milestone in the evolution of BLUE MARLIN OS. This approach allows for independent development, testing, and deployment of UI elements while maintaining system-wide consistency.
      </p>

      <h2>Component Hierarchy</h2>

      <p>
        We've established a clear component hierarchy that separates concerns and promotes reusability:
      </p>

      <ul>
        <li><strong>Core Primitives:</strong> Buttons, inputs, typography elements</li>
        <li><strong>Compound Components:</strong> Cards, panels, navigation elements</li>
        <li><strong>Layout Components:</strong> Grids, containers, section wrappers</li>
        <li><strong>Page Templates:</strong> Pre-configured layouts for specific use cases</li>
        <li><strong>Visual Effects:</strong> Animation systems and environmental effects</li>
      </ul>

      <p>
        Each component is independently themeable, supporting both phase-origin and phase-apex modes through our theming system.
      </p>

      <h2>Integration with Device Systems</h2>

      <p>
        A key challenge was ensuring our component architecture could integrate seamlessly with the various hardware systems on deep-sea vehicles. We've implemented a standardized data interface layer that allows components to:
      </p>

      <ul>
        <li>Receive telemetry and sensor data</li>
        <li>Send commands to vehicle systems</li>
        <li>Access historical data for visualization</li>
        <li>Integrate with navigation and positioning systems</li>
      </ul>

      <h2>Performance Considerations</h2>

      <p>
        Given the critical nature of deep-sea operations, performance was a primary concern. Our component system implements several optimizations:
      </p>

      <ul>
        <li>Virtualized rendering for large data displays</li>
        <li>Component-level code splitting</li>
        <li>Memoized rendering for expensive visualizations</li>
        <li>Hardware acceleration for critical UI elements</li>
      </ul>

      <p>
        The result is a system that maintains consistent 60fps performance even on the limited computing hardware available in deep-sea vehicles.
      </p>
    `,
    relatedEntries: [
      {
        id: 'day-night-cycle-implementation',
        title: 'Day/Night Cycle Implementation',
        date: '04.05.2025',
        excerpt: 'Created a seamless transition between phase-origin and phase-apex modes...'
      },
      {
        id: 'underwater-visibility-enhancements',
        title: 'Underwater Visibility Enhancements',
        date: '04.12.2025',
        excerpt: 'Exploring new techniques for improving light shaft rendering...'
      }
    ]
  },
  {
    id: 'adaptive-ui-environments',
    title: 'Adaptive UI for Diverse Operating Environments',
    date: '03.15.2025',
    tags: ['UI/UX', 'ADAPTIVE DESIGN', 'HUMAN FACTORS'],
    author: {
      name: 'Dr. Jian Li',
      role: 'Human Factors Specialist',
      image: '/images/placeholder_80x80.png'
    },
    excerpt: 'Developing UI adaptations for varied ambient light conditions, operator fatigue levels, and emergency scenarios encountered in deep-sea missions...',
    content: `
      <p class="lead-paragraph">
        Deep-sea operations present unique challenges for user interface design. Our team has been focused on creating an adaptive UI that dynamically adjusts to environmental conditions and operator states.
      </p>

      <p>
        The BLUE MARLIN OS must perform reliably under a wide range of conditions, from the bright glare of surface operations to the complete darkness of the abyssal zone. Operator fatigue and high-stress emergency situations further demand UI flexibility.
      </p>

      <h2>Context-Aware Adaptations</h2>

      <p>
        We are implementing several context-aware UI adaptations:
      </p>

      <ul>
        <li><strong>Ambient Light Adaptation:</strong> Automatically adjusts brightness, contrast, and color palettes based on readings from ambient light sensors. This ensures optimal visibility without causing eye strain.</li>
        <li><strong>Operator Fatigue Monitoring:</strong> Integrates with biometric sensors (where available) or uses interaction pattern analysis to detect signs of fatigue. The UI can then simplify information density, increase font sizes, or introduce subtle alerting cues.</li>
        <li><strong>Emergency Mode:</strong> In critical situations (e.g., system malfunction, loss of communication), the UI prioritizes essential information, uses high-contrast color schemes, and provides clear, step-by-step guidance for emergency procedures.</li>
        <li><strong>Task-Specific Layouts:</strong> Dynamically reconfigures layout and information hierarchy based on the operator's current task (e.g., navigation, sample collection, system diagnostics).</li>
      </ul>

      <h2>Technical Implementation</h2>

      <p>
        These adaptations are powered by a rules engine that evaluates contextual data against predefined heuristics. The UI components are designed to respond fluidly to these changes, ensuring a seamless experience.
      </p>

      <p>
        We are leveraging CSS custom properties and React Context extensively to manage these dynamic styles and configurations efficiently.
      </p>

      <h2>Next Steps</h2>

      <p>
        We are currently conducting simulator-based user studies to validate the effectiveness of these adaptations across various scenarios. Feedback from these studies will inform further refinement of the adaptive algorithms and UI designs.
      </p>
    `,
    relatedEntries: [
      {
        id: 'modular-component-architecture',
        title: 'Modular Component Architecture',
        date: '03.28.2025',
        excerpt: 'Designed a flexible component system using React...'
      },
      {
        id: 'day-night-cycle-implementation',
        title: 'Day/Night Cycle Implementation',
        date: '04.05.2025',
        excerpt: 'Created a seamless transition between phase-origin and phase-apex modes...'
      }
    ]
  }
];

/**
 * All available tags from journal entries
 */
export const tags: string[] = [
  'RESEARCH', 'VISUALIZATION', 'RENDERING',
  'DESIGN', 'UI/UX', 'THEMES',
  'DEVELOPMENT', 'ARCHITECTURE', 'REACT',
  'ADAPTIVE DESIGN', 'HUMAN FACTORS'
];

// Helper function to add a 'url' property to entries
const addUrlToEntry = (entry: JournalEntry | RelatedEntry): JournalEntry | RelatedEntry => ({
  ...entry,
  url: `/journal/${entry.id}`
});

// Helper function to add URLs to all related entries within a main entry
const addUrlsToRelatedEntries = (entry: JournalEntry): JournalEntry => ({
  ...entry,
  relatedEntries: entry.relatedEntries.map(addUrlToEntry)
});

/**
 * Get a specific journal entry by its ID.
 * Adds 'url' properties to the main entry and its related entries.
 * @param id - The ID of the journal entry.
 * @returns The journal entry object with URLs added, or undefined if not found.
 */
export const getJournalEntryById = (id: string): JournalEntry | undefined => {
  const entry = journalEntries.find((entry) => entry.id === id);
  if (entry) {
    // Add URL to the main entry and its related entries
    const entryWithUrls = addUrlToEntry(entry) as JournalEntry;
    return addUrlsToRelatedEntries(entryWithUrls);
  }
  return undefined;
};


/**
 * Get all journal entries.
 * Adds 'url' properties to each entry and their related entries.
 * @returns An array of all journal entries with URLs added.
 */
export const getAllJournalEntries = (): JournalEntry[] => {
  return journalEntries.map(entry => {
    const entryWithUrl = addUrlToEntry(entry) as JournalEntry;
    return addUrlsToRelatedEntries(entryWithUrl);
  });
};

/**
 * Get all unique tags from all journal entries.
 * @returns An array of unique tags.
 */
export const getAllTags = (): string[] => {
  const allTags = journalEntries.flatMap(entry => entry.tags);
  return [...new Set(allTags)]; // Remove duplicates
};

/**
 * Get the most popular tags based on their frequency.
 * @param limit - The maximum number of popular tags to return.
 * @returns An array of the most frequent tags.
 */
export const getPopularTags = (limit: number = 10): string[] => {
  const tagCounts: { [key: string]: number } = {};
  journalEntries.flatMap(entry => entry.tags).forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });

  return Object.entries(tagCounts)
    .sort(([, countA], [, countB]) => countB - countA) // Sort by count descending
    .slice(0, limit) // Take the top 'limit' tags
    .map(([tag]) => tag); // Return only the tag names
};

/**
 * Get journal entries that include a specific tag.
 * Adds 'url' properties to the matching entries and their related entries.
 * @param tag - The tag to filter by.
 * @returns An array of journal entries containing the specified tag, with URLs added.
 */
export const getJournalEntriesByTag = (tag: string): JournalEntry[] => {
  return journalEntries
    .filter(entry => entry.tags.some(t => t.toLowerCase() === tag.toLowerCase()))
    .map(addUrlsToRelatedEntries)
    .map(addUrlToEntry as (entry: JournalEntry) => JournalEntry); // Ensure correct typing for map
};

// Define a simple type for the adjacent entry summary
type AdjacentEntrySummary = { id: string; title: string } | null;

/**
 * Retrieves the chronologically adjacent journal entries (previous/next) for a given entry ID
 * based on the order in the main 'journalEntries' array.
 * Assumes journalEntries are sorted chronologically (newest first or oldest first).
 * @param {string} currentEntryId - The ID of the current entry.
 * @returns {{ prev: AdjacentEntrySummary, next: AdjacentEntrySummary }} Object containing prev/next entry summaries or null.
 */
export const getAdjacentEntries = (currentEntryId: string): { prev: AdjacentEntrySummary, next: AdjacentEntrySummary } => {
  const result: { prev: AdjacentEntrySummary, next: AdjacentEntrySummary } = { prev: null, next: null };

  if (!currentEntryId) {
    console.error('getAdjacentEntries: Invalid currentEntryId provided.');
    return result;
  }

  // Consider pre-sorting journalEntries by date if not already guaranteed
  // const sortedEntries = [...journalEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Example: newest first
  const sortedEntries = journalEntries; // Assuming they are already sorted appropriately

  try {
    const currentIndex = sortedEntries.findIndex(p => p.id === currentEntryId);

    if (currentIndex === -1) {
      console.warn(`getAdjacentEntries: Entry with ID '${currentEntryId}' not found in the main list.`);
      return result;
    }

    // Get previous entry (relative to the sort order)
    if (currentIndex > 0) {
      const prevEntry = sortedEntries[currentIndex - 1];
      result.prev = { id: prevEntry.id, title: prevEntry.title };
    }

    // Get next entry (relative to the sort order)
    if (currentIndex < sortedEntries.length - 1) {
      const nextEntry = sortedEntries[currentIndex + 1];
      result.next = { id: nextEntry.id, title: nextEntry.title };
    }

    return result;

  } catch (error) {
    console.error(`Error retrieving adjacent entries for ID '${currentEntryId}':`, error);
    return { prev: null, next: null }; // Return empty on error
  }
}; 