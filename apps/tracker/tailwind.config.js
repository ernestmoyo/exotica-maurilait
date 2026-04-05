/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pulse: {
          bg: '#F5F7FA',
          card: '#FFFFFF',
          'card-light': '#F1F5F9',
          cyan: '#0068B8',
          amber: '#F59E0B',
          teal: '#2E9E6B',
          purple: '#E85D75',
          brand: '#003D7A',
          text: '#003D7A',
          heading: '#1E3A5F',
          body: '#334155',
          meta: '#94A3B8',
          success: '#16A34A',
          danger: '#DC2626',
          border: '#E2E8F0',
          yoplait: '#E30613',
          candia: '#0068B8',
          juice: '#F7A823',
          creme: '#8B4513',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
