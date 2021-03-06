const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.vue"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          blue: {
            DEFAULT: "#2B3945",
            dark: "#202C37",
          },
        },
        light: {
          "blue-dark": "#111517",
          gray: {
            dark: "#858585",
            "very-light": "#FAFAFA",
          },
        },
      },
      fontFamily: {
        sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
      },
      padding: {
        vw: "10vw",
      },
      maxHeight: {
        112: "28rem",
      },
      gridTemplateColumns: {
        fill: "repeat(auto-fill, minmax(330px, 1fr))", // max-width including margin
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
