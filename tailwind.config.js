const { join } = require('path');

module.exports = {
  purge: [join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'), join(__dirname, '/components/**/*.{js,ts,jsx,tsx}')],//['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans:
          '-apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'primary': '#143640',
        'primary-light': '#3f606b',
        'primary-dark': '#00101a',
        "on-primary-text-color": "#ffffff",
        'secondary': '#bb7551',
        'secondary-light': '#F0A47E',
        'secondary-dark': '#884927',
        "on-secondary-text-color": "#000000",
        "on-secondary-dark-text-color": "#ffffff",
        "error-color": "#f44336",
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      maxHeight: {
        '90': '90%'
      }
    },
  },
  // plugins: {
  //   tailwindcss: {},
  //   autoprefixer: {},
  // },
}
