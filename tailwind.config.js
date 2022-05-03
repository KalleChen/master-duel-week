/* eslint-env node */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
        primary: '#001A2D ',
        secondary: '#0B2941',
        tertiary: '#00051C',
        textPrimary: '#D9D9D9',
      },
      textColor: (theme) => theme('colors'),
    },
  },
  plugins: [],
}
