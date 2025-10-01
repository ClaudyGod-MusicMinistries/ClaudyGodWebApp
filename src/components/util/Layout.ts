// constants/layout.ts
export const LAYOUT_CONSTANTS = {
  // Container widths
  CONTAINER_MAX_WIDTH: 'max-w-7xl',
  CONTAINER_PADDING: 'px-4 sm:px-6 lg:px-8',

  // Hero heights
  HERO_HEIGHT: {
    mobile: 'min-h-[100vh]',
    desktop: 'min-h-[100vh]',
  },

  // Section spacing
  SECTION_SPACING: {
    mobile: 'space-y-8',
    desktop: 'space-y-12',
  },

  // Typography scales
  TYPOGRAPHY: {
    title: {
      mobile: 'text-4xl',
      desktop: 'text-6xl',
    },
    subtitle: {
      mobile: 'text-lg',
      desktop: 'text-xl',
    },
  },
} as const;
