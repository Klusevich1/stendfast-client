/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        stroke: "#D8E3EC",
        backstroke: "#F6F8FA",
        gray_stroke: "#A6B0B9",
        gray_back: "#F6F6F7",
        black: "#000000",
        white: "#FAFAFA",
        red: "#FD2D30",
        green: "#16E042",
        dark_blue: "#242E43",

        black_80: "#464646",
        black_60: "#747474",
        black_40: "#A2A2A2",
        black_20: "#D1D1D1",
        black_10: "#E8E8E8",
        black_5: "#F3F3F3",

        blue_main: "#345CFF",
        blue_90: "#486CFF",
        blue_80: "#5D7DFF",
        blue_60: "#859DFF",
        blue_40: "#AEBEFF",
        blue_20: "#D6DEFF",
        blue_10: "#EBEFFF",
      },
      screens: {
        xlg: "1080px",
        smlg: "750px",
        xs: "450px",
      },
      boxShadow: {
        custom:
          "4px 4px 8px rgba(161, 172, 182, 0.2), -4px 0px 8px rgba(161, 172, 182, 0.2)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
