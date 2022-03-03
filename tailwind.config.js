module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#166CB4",
          main: "#20639B",
          dark: "#16588F",
        },
        secondary: {
          error: "#F5000F",
          success: "#009E52",
          yellow: "#F69F13",
          other: "#4BC7EA",
          purple: "#9E09E4cccc",
        },
        white: {
          main: "#fff",
          light: "#FAF9F9",
          dim: "#F0F4F9",
          text: "#464F54",
          dark: "#1C1F37",
          border: "#BDBDBD",
        },
        transparent: "transparent",
      },
      spacing: {
        55: "55%",
        40: "40%",
        48: "48%",
      },
      borderWidth: {
        0.98: "0.98px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
