/** Nala Studio design tokens */

export const tokens = {
  nav: {
    height: 'h-16 lg:h-[68px]',
    heightPx: { mobile: 64, desktop: 68 },
  },
  container: {
    default: 'mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8',
    narrow: 'mx-auto w-full max-w-3xl px-5 sm:px-6',
    prose: 'max-w-2xl',
  },
  section: {
    sm: 'py-12 md:py-14',
    md: 'py-14 md:py-20',
    lg: 'py-16 md:py-24',
  },
  radius: {
    sm: 'rounded-sm',
    md: 'rounded-md',
  },
  elevation: {
    nav: 'shadow-[0_4px_24px_-4px_rgba(44,36,32,0.08)]',
    navScrolled: 'shadow-[0_8px_32px_-8px_rgba(44,36,32,0.12)]',
    card: 'shadow-sm hover:shadow-lg',
  },
  transition: {
    fast: 'duration-150 ease-out',
    base: 'duration-200 ease-out',
    slow: 'duration-300 ease-out',
  },
  type: {
    hero: 'font-display font-medium tracking-tight leading-[1.05]',
    h1: 'font-display font-medium tracking-tight leading-tight text-3xl md:text-4xl lg:text-5xl',
    h2: 'font-display font-medium tracking-tight leading-tight text-2xl md:text-3xl',
    h3: 'font-display font-medium leading-tight text-lg md:text-xl',
    lead: 'text-sm md:text-base leading-relaxed text-nala-muted',
    body: 'font-sans text-sm leading-relaxed text-nala-muted',
    overline:
      'text-xs font-medium uppercase tracking-[0.16em] text-nala-rose',
    label: 'text-xs font-medium text-nala-charcoal tracking-wide',
  },
  surface: {
    page: 'bg-nala-ivory',
    muted: 'bg-nala-soft',
    cream: 'bg-nala-cream',
    elevated: 'bg-white/70 border border-nala-border/80',
    dark: 'bg-nala-charcoal text-nala-ivory',
  },
  focus:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nala-blush focus-visible:ring-offset-2 focus-visible:ring-offset-nala-ivory',
} as const;

export const HEADER_OFFSET = 'pt-14 lg:pt-16';
