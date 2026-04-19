/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f8f1',
          100: '#def0df',
          200: '#bfdfc1',
          300: '#92c596',
          400: '#61a566',
          500: '#408945',
          600: '#2f6e33',
          700: '#28582b',
          800: '#234626',
          900: '#1e3a21',
          950: '#0d220f',
        },
        accent: '#FFD700',
        dark: '#1A1A1A',
        slate: '#4A4A4A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
