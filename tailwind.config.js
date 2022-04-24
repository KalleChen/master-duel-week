/* eslint-env node */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
        primary: '#98D9C2',
        secondary: '#F19A3E',
        textPrimary: '#403233',
      },
      textColor: (theme) => theme('colors'),
    },
  },
  plugins: [],
}
