export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 3.5vw + 1rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 2vw + 1rem, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'title-sm': ['1.25rem', { lineHeight: '1.3' }],
        caption: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      maxWidth: {
        measure: '38rem',
        content: '42rem',
        shell: '72rem',
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
      boxShadow: {
        soft: '0 10px 40px rgba(44, 36, 32, 0.06)',
        card: '0 4px 24px rgba(44, 36, 32, 0.05)',
        lift: '0 12px 32px rgba(44, 36, 32, 0.08)',
      },
      transitionDuration: {
        250: '250ms',
      },
      zIndex: {
        header: '50',
        overlay: '60',
        modal: '70',
        toast: '80',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        reveal: 'reveal 1s ease-out both',
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
        reveal: {
          '0%': { opacity: '0', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
