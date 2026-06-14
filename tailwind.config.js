/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'wc-bg':      '#04090F',
        'wc-surface': '#0A1628',
        'wc-card':    '#0D1E38',
        'wc-border':  'rgba(245,197,24,0.15)',
        'wc-gold':    '#F5C518',
        'wc-gold2':   '#C99A0A',
        'wc-live':    '#00FF88',
        'wc-blue':    '#38BDF8',
        'wc-red':     '#FF4565',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'pulse-live': 'pulseLive 1.4s ease-in-out infinite',
        'glow-gold':  'glowGold 2s ease-in-out infinite alternate',
        'slide-up':   'slideUp 0.4s ease-out forwards',
        'fade-in':    'fadeIn 0.3s ease-out forwards',
        'shimmer':    'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseLive: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.85)' },
        },
        glowGold: {
          from: { boxShadow: '0 0 5px rgba(245,197,24,0.3)' },
          to:   { boxShadow: '0 0 25px rgba(245,197,24,0.6), 0 0 50px rgba(245,197,24,0.2)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
