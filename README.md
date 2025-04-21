**Project Requirement Document (PRD)**

**Objective:**  
Surgically dissect the existing webpages (located in /legacy folder) (DOM, CSS, JS) and reconstruct its architecture into a **React-ready component system**. This is not blind migration, but controlled **deconstruction** and **reconstruction**—a **Ship of Theseus** operation where every piece is replaced until no original fragment remains, yet the functional and aesthetic identity is preserved or enhanced. The final output must be optimized for **Vercel deployment** using Vite, with SEO-critical structures intact.

---

**Project Requirement Document (PRD)**

**Objective:**  
Surgically dissect the existing webpage (DOM, CSS, JS) and reconstruct its architecture into a **React-ready component system**. This is not blind migration, but controlled **deconstruction** and **reconstruction**—a **Ship of Theseus** operation where every piece is replaced until no original fragment remains, yet the functional and aesthetic identity is preserved or enhanced. The final output must be optimized for **Vercel deployment** using Next.js (if necessary), with SEO-critical structures intact.

---

**Migration Phases & Complexity Plan:**  

Tailwind Migration Plan — **Complexity Rating: 5**

**Phase 1: Project Setup (React + TailwindCSS) — Complexity: 2**  
• Initialize React application with Next.js or Vite and modern build tooling.  
• Configure Tailwind CSS with custom theme extension from extracted tokens.  
• Establish component-based folder structure.  
• Create migration index document to track component-by-component builds.

**Phase 2: Core Component System — Complexity: 4**  
• Build ThemeContext for day/night modes with ThemeProvider and useTheme hook.  
• Abstract Radix UI primitives into custom UI components immediately.  
• Develop core layout primitives (Container, Grid, Section).  
• Implement Typography components (Heading, Paragraph).  
• Create Button and Link variants consistent with design tokens.

**Phase 3: Global Layout & Navigation — Complexity: 3**  
• Assemble Header component with logo, status, and controls.  
• Implement responsive Navigation (desktop NavBar and bottom mobile Nav).  
• Create Footer component and ThemeToggle with animation.  
• Build UnderwaterEffect background component.

**Phase 4: Card & Content Components — Complexity: 4**  
• Implement ProjectCard and JournalCard as composable units.  
• Build ContentContainer component with glassmorphism styling.  
• Develop Form components with validation hooks.  
• Create LandingHero section and grid layout systems for projects/journal.

**Phase 5: Page Templates — Complexity: 3**  
• Scaffold homepage, ProjectDetail, JournalEntry, and Collection page templates.  
• Implement Contact page/section template.

**Phase 6: Interactive Elements & Hooks — Complexity: 3**  
• Create hooks for theme toggling and scroll animations.  
• Develop form validation and submission hooks.  
• Build particle system for underwater effect and responsive navigation behaviors.

**Phase 7: Performance Optimization — Complexity: 3**  
• Configure code-splitting and lazy loading for components and images.  
• Optimize animation performance and Tailwind purge.  
• Implement reduced-motion accessibility features.

**Phase 8: Deployment & Testing — Complexity: 2**  
• Configure Vercel deployment via Github.
 

---

**Surgical Extraction Order (Foundation → Atoms → Molecules → Organisms → Pages → Enhancements):**  
1. **Foundation Layer**: Typography & Color Tokens (theme module)  
2. **Atoms**: Buttons & Form Inputs (UI primitives)  
3. **Layout Primitives**: Container, Grid, Section (structural wrappers)  
4. **Navigation & Footer**: Custom header, nav bars & footer components  
5. **Cards**: JournalCard, ProjectCard  
6. **Sections**: LandingHero, RecentJournal, ProjectsOverview, ContactForm  
7. **Pages**: index.tsx, journal/[id].tsx
8. **Enhancement Layer**: Visual effects & animations (useParallax, FullPageEffect)  
9. **Design System**: Living styleguide (`design-system/index.tsx`)

Below is the **minimal file‑tree blueprint** enforcing this order:

```plaintext
src/
│
├─ theme/
│   ├─ colors.ts          # color primitives (primary, accent, neutral)
│   └─ typography.ts      # font sizes, line‑heights, weights
│
├─ components/
│   ├─ ui/
│   │   ├─ Button.tsx     # primary, secondary, disabled states
│   │   └─ Input.tsx      # text, textarea, validation
│   │
│   ├─ layout/
│   │   ├─ Container.tsx  # width, padding tokens
│   │   ├─ Grid.tsx       # responsive columns
│   │   └─ Section.tsx    # spacing, background wrappers
│   │
│   ├─ navigation/
│   │   ├─ NavBar.tsx
│   │   └─ Footer.tsx
│   │
│   ├─ cards/
│   │   ├─ JournalCard.tsx
│   │   └─ ProjectCard.tsx
│   │
│   └─ sections/
│       ├─ LandingHero.tsx
│       ├─ RecentJournal.tsx
│       ├─ ProjectsOverview.tsx
│       └─ ContactForm.tsx
│
├─ visuals/
│   └─ FullPageEffect.tsx # wraps WebGL/animation hooks
│
├─ hooks/
│   ├─ useParallax.ts
│   └─ useScrollReveal.ts
│
├─ pages/
│   ├─ index.tsx
│   ├─ journal/
│   │   └─ [id].tsx
│   
│
├─ design-system/
│   └─ index.tsx          # living styleguide
│
└─ utils/
    ├─ dateFormat.ts
    └─ seo.ts
```  

---

**Scope:**  
- **Extract** only essential, reusable, high-impact elements (DOM nodes, CSS rules, JS behaviors).  
- **Reconstruct** into isolated, atomic React components.  
- **Pattern System**: Enforce naming conventions, folder structure, and reusable logic.  
- **Style Guide**: Normalize typography, color palette, spacing rules, button styles, and animation patterns.  

**Optimize:**  
- Eliminate redundant or bloated assets.  
- Rewrite legacy scripts into React hooks and clean utility functions.  
- Implement code-splitting and lazy loading.  

**Deployability:**  
- Fully Vercel-optimized with Vite conventions.  
- Preserve and enhance SEO structures (metadata, alt tags, heading hierarchy).  

**Structural Layers & Vendor Isolation:**  
1. **React Structural Layer:** Build pure React components (DOM composition, state, event handling) with no styling or vendor coupling.  
2. **Styling Layer:** Apply styling via TailwindCSS (mapping tokens 1:1) or CSS Modules/SASS; avoid ad-hoc class chaos.  
3. **Behavior Enhancement Layer (Radix):** Wrap any Radix primitives immediately in your own UI abstractions (e.g., `components/ui/Dialog.tsx`) to prevent vendor coupling.  

**Critical Caution:**  
- Modularize Radix usage from day one.  
- Never import Radix primitives directly in pages or organisms; always wrap them behind your abstractions.  

**Constraints:**  
- Mobile-first: all components and layouts must be designed starting at the smallest viewport, progressively enhanced for larger screens with responsive breakpoints.
- No direct DOM copy-paste into JSX.  
- No CSS-overwrite hacks; styling must be modular (TailwindCSS, CSS Modules, or clean SASS).  
- All JS logic must follow modern React paradigms: hooks, context, and clean event handling.  
- Progressive enhancement permitted only if it preserves the interface’s identity.  

**Success Metrics:**  
- **Performance:** First Contentful Paint < 1.5s; Lighthouse > 90 across Performance, Accessibility, Best Practices, and SEO.  
- **Maintainability:** Codebase is readable, modular, and free of hidden dependencies.  
- **Scalability:** New components and pages can be added without restructuring existing layers.  
