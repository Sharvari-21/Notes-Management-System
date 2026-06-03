/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        // Base palette — deep charcoal editorial dark theme
        ink: {
          950: '#0d0d0f',
          900: '#141416',
          800: '#1c1c20',
          700: '#26262c',
          600: '#33333b',
          500: '#4a4a55',
        },
        // Warm amber accent
        amber: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // Muted text tones
        stone: {
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
        },
        // Semantic colors
        danger: '#ef4444',
        success: '#22c55e',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.35s ease forwards',
        'scale-in': 'scaleIn 0.25s ease forwards',
        'spin-slow': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.4)',
        glow: '0 0 20px rgba(251,191,36,0.15)',
      },
    },
  },
  plugins: [],
};