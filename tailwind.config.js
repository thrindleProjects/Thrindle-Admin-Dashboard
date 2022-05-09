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
          dark2: "#155489",
          light2: "#035efc",
          borderColor: "#CED0DA",
          grey6: "#787C90",
        },
        secondary: {
          error: "#F5000F",
          success: "#009E52",
          yellow: "#F69F13",
          orange: "#FFA91F",
          other: "#4BC7EA",
          purple: "#9E09E4",
          header: "#232F3F",
        },
        white: {
          main: "#fff",
          light: "#FAF9F9",
          dim: "#F0F4F9",
          text: "#464F54",
          dark: "#1C1F37",
          border: "#BDBDBD",
          lightGrey: "#B2ACAC",
          lightGrey2: "#F4F4F4",
          lightGrey3: "#C2C2C2",
          lightGrey4: "#CDCCCC",
          borderGrey: "#E1E1E1",
          tableHeader: "#2F3133",
        },
        transparent: "transparent",
        "inventory-gray": "#C2C2C2",
      },
      transparent: "transparent",
      spacing: {
        55: "55%",
        40: "40%",
        48: "48%",
        49: "49.5%",
        65: "65%",
        85: "85%",
      },
      borderWidth: {
        0.98: "0.98px",
      },
      height: {
        vh80: "80vh",
        vh90: "90vh",
        59.26: "59.26px",
        vh40: "50vh",
      },
      margin: {
        5: "5px",
      },
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
      },
      fontSize: {
        small: "12px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
