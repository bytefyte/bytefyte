/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'custom-pattern': `repeating-linear-gradient(45deg, ${theme(
          'colors.primary',
        )} 10px, ${theme('colors.default')} 20px)`,
      }),
      backgroundColor: {
        animated:
          'linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%)',
      },
      animation: {
        'move-background': 'move-background 10s linear infinite',
      },
    },
  },
  daisyui: {
    themes: ['luxury', 'cupcake'],
  },
  plugins: [require('daisyui')],
};
