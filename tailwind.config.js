const { join } = require("path");

module.exports = {
  purge: [
    join(__dirname, "pages/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "/components/**/*.{js,ts,jsx,tsx}"),
  ], //['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: '-apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        primary: "#143640",
        "primary-light": "#3f606b",
        "primary-dark": "#00101a",
        "on-primary-text-color": "#ffffff",
        "on-primary-light-text-color": "#ffffff",
        "on-primary-dark-text-color": "#ffffff",
        secondary: "#bb7551",
        "secondary-light": "#F0A47E",
        "secondary-dark": "#884927",
        "on-secondary-text-color": "#000000",
        "on-secondary-light-text-color": "#000000",
        "on-secondary-dark-text-color": "#ffffff",
        third: "#40b2b6",
        "third-light": "#78E4E8",
        "third-dark": "#008286",
        "on-third-text-color": "#000000",
        "on-third-light-text-color": "#000000",
        "on-third-dark-text-color": "#ffffff",
        "midnight-green-eagle-green": "#104657",

        "error-color": "#f44336",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      maxHeight: {
        90: "90%",
      },
      keyframes: {
        unfoldIn: {
          "0%": { transform: "scaleY(.005) scaleX(0)" },
          "50%": { transform: "scaleY(.005) scaleX(1)" },
          "100%": { transform: "scaleY(1) scaleX(1)" },
        },
        unfoldOut: {
          "0%": { transform: "scaleY(1) scaleX(1)" },
          "50%": { transform: "scaleY(.005) scaleX(1)" },
          "100%": { transform: "scaleY(.005) scaleX(0)" },
        },
        zoomIn: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        zoomOut: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
      animation: {
        unfoldingIn:
          "unfoldIn 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards",
        unfoldingOut:
          "unfoldOut 1s .3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards",
        zoomingIn:
          "zoomIn 1s .8s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards",
        zoomingOut:
          "zoomOut 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards",
      },
      outline: {
        'third-color': '2px solid #78E4E8',
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ["last", "first"],
    },
  },
};
