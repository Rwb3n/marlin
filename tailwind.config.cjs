/** @type {import('tailwindcss').Config} */

// Import our theme tokens
const colors = require('./src/theme/colors.ts').colors;
const typography = require('./src/theme/typography.ts').typography;
const animations = require('./src/theme/animations').animations;
const spacing = require('./src/theme/spacing').spacing;
const breakpoints = require('./src/theme/breakpoints').breakpoints;


module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // Set screens based on our breakpoints
    screens: {
      xs: breakpoints.values.xs,
      sm: breakpoints.values.sm,
      md: breakpoints.values.md,
      lg: breakpoints.values.lg,
      xl: breakpoints.values.xl,
      '2xl': breakpoints.values['2xl'],
    },
    extend: {
      // Extend colors with our theme tokens
      colors: {
        // Map semantic keys to CSS Variables using hsl() consistently
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
           DEFAULT: 'hsl(var(--success))',
           foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
           DEFAULT: 'hsl(var(--warning))',
           foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
           DEFAULT: 'hsl(var(--info))',
           foreground: 'hsl(var(--info-foreground))',
        },
        // Keep original light/dark objects if they are imported/used directly elsewhere
        // If not, they can be fully removed.
        // light: colors.light,
        // dark: colors.dark,
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      
      // Extend typography with our theme tokens
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
      
      // Extend spacing with our spacing system
      spacing: spacing.scale,
      
      // Extend layout-specific spacing tokens
      height: {
        header: spacing.layout.headerHeight,
      },
      padding: {
        container: spacing.container,
        section: spacing.section,
        footer: spacing.layout.footerPadding,
      },
      gap: {
        navigation: spacing.layout.navigationGap,
        card: spacing.layout.cardGap,
        grid: spacing.layout.gridGap,
        paragraph: spacing.content.paragraphGap,
        heading: spacing.content.headingGap,
        listItem: spacing.content.listItemGap,
      },
      
      // Extend animations with our theme tokens
      keyframes: animations.keyframes,
      animation: {
        shaftMove1: `${animations.keyframes.shaftMove1} ${animations.durations.shaft1} ${animations.timingFunctions.easeInOut} ${animations.iterations.infinite}`,
        shaftMove2: `${animations.keyframes.shaftMove2} ${animations.durations.shaft2} ${animations.timingFunctions.easeInOut} ${animations.iterations.infinite}`,
        shaftMove3: `${animations.keyframes.shaftMove3} ${animations.durations.shaft3} ${animations.timingFunctions.easeInOut} ${animations.iterations.infinite}`,
        shaftMove4: `${animations.keyframes.shaftMove4} ${animations.durations.shaft1} ${animations.timingFunctions.easeInOut} ${animations.iterations.infinite}`,
        shaftGlow: `${animations.keyframes.shaftGlow} 15s ${animations.timingFunctions.easeInOut} ${animations.iterations.infinite}`,
        drift: `${animations.keyframes.drift} ${animations.durations.drift} ${animations.timingFunctions.linear} ${animations.iterations.infinite}`,
        floatIn: `${animations.keyframes.floatIn} ${animations.durations.floatIn} ${animations.timingFunctions.easeOut} ${animations.fillModes.backwards}`,
        pulse: `${animations.keyframes.pulse} 2s ${animations.timingFunctions.easeInOut} ${animations.iterations.infinite}`,
        ripple: `${animations.keyframes.rippleEffect} ${animations.durations.ripple} ${animations.timingFunctions.easeOut} ${animations.fillModes.forwards}`,
      },
      // Add animation utilities
      transitionDuration: {
        ...animations.durations,
      },
      transitionTimingFunction: {
        ...animations.timingFunctions,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}