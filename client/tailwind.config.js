/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Full structured type scale (readable floor at 13px)
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.25rem' }], // 13px
      sm: ['0.875rem', { lineHeight: '1.35rem' }], // 14px
      base: ['1rem', { lineHeight: '1.5rem' }], // 16px
      lg: ['1.125rem', { lineHeight: '1.65rem' }], // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
      '2xl': ['1.5rem', { lineHeight: '1.9rem' }], // 24px
      '3xl': ['1.875rem', { lineHeight: '2.2rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
      '5xl': ['3rem', { lineHeight: '1.15' }], // 48px
      '6xl': ['3.75rem', { lineHeight: '1.1' }], // 60px
      '7xl': ['4.5rem', { lineHeight: '1.05' }], // 72px
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        ui: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        nala: {
          ivory: '#FBF7F2',
          cream: '#F5EDE4',
          beige: '#E8D9CB',
          nude: '#DCC4B0',
          blush: '#D4A59A',
          rose: '#C4877A',
          brown: '#8B6F5C',
          charcoal: '#2C2420',
          soft: '#F8F1EA',
          mist: '#EFE6DC',
          border: '#E6D8CC',
          muted: '#7A6A5E',
        },
      },
      maxWidth: {
        '8xl': '90rem',
      },
      boxShadow: {
        soft: '0 10px 40px rgba(44, 36, 32, 0.06)',
        card: '0 4px 24px rgba(44, 36, 32, 0.05)',
        lift: '0 12px 32px rgba(44, 36, 32, 0.08)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
