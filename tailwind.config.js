/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'filson-soft': ['"Filson Soft"', 'sans-serif'],
        'agora': ['"PF Agora Slab Pro Regular"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

