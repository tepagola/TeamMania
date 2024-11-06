// tailwind.config.js
module.exports = {
  content: ["./public/**/*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'neon-pink': '#FF007F',
      },
      fontFamily: {
        'retro': ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(255, 0, 127, 0.7)',
      },
    },
  },
  plugins: [],
};
