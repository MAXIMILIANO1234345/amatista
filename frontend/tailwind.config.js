/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base': '#121212',
        'superficie': '#1E1E1E',
        'amatista': '#9B59B6',
        'amatista-claro': '#C39BD3',
        'amatista-oscuro': '#3D1F52',
        'neon': '#00E5FF',
        'texto': '#E0E0E0',
        'blender': '#F5792A',
      },
      fontFamily: {
        sans: ['"Outfit Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
