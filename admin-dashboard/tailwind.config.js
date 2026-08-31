/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#FFF8F3',
        ink: '#14151F',
        navy: {
          950: '#0F1019',
          900: '#14151F',
          800: '#1C1E2B',
          700: '#262838',
        },
        brand: {
          50: '#FFF1EA',
          100: '#FFE1D0',
          300: '#FFA579',
          500: '#FF6A3D',
          600: '#F0501F',
          700: '#C93D14',
        },
        mint: {
          400: '#4FD8C7',
          500: '#2EC4B6',
          600: '#22A395',
        },
        plum: {
          400: '#8B85A0',
          500: '#6B6478',
          600: '#4A4459',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 12px rgba(20,21,31,0.06)',
        card: '0 4px 24px rgba(20,21,31,0.08)',
        glow: '0 0 0 3px rgba(255,106,61,0.15)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        pulseDot: {
          '0%,100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(1.4)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        popIn: {
          '0%': { transform: 'scale(0.96)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
        slideIn: 'slideIn 0.35s cubic-bezier(0.16,1,0.3,1)',
        popIn: 'popIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
