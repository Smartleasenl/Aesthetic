/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Aesthetic Social Haus brandkleuren
        ash: {
          cream:   '#F0EDE6', // pagina achtergrond
          white:   '#FAFAF7', // lichte secties
          brown:   '#3D3426', // navbar, footer, donkere accenten
          dark:    '#2C2416', // body tekst
          mid:     '#7A6A52', // subtekst / muted
          light:   '#C4B9A8', // borders, dividers
          sage:    '#C5D4C0', // subtiele groen accent (top bar)
          sageDark:'#8FA887', // hover staat sage
        },
      },
      fontFamily: {
        serif:  ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"Jost"', '"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'ash-gradient': 'linear-gradient(135deg, #F0EDE6 0%, #E8E2D9 100%)',
      },
    },
  },
  plugins: [],
};