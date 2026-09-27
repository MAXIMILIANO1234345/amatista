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
        'neon': '#00E5FF'
      }
    },
  },
  plugins: [],
}
