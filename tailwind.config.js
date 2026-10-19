/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost Variable"', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: { 950: '#0a0908', 900: '#100e0c', 800: '#1a1714', 700: '#27221d' },
        gold: { 200: '#efe0b8', 300: '#e2cb8e', 400: '#cfb06a', 500: '#b8934a', 600: '#8f6f31' },
        ivory: { 50: '#faf7f1', 100: '#f2ece0', 200: '#e6dcc9' },
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: 0.55 }, '100%': { transform: 'scale(1.8)', opacity: 0 } },
      },
      animation: { marquee: 'marquee 40s linear infinite', pulseRing: 'pulseRing 2s ease-out infinite' },
    },
  },
  plugins: [],
}
